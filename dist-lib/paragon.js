import { jsxs as I, jsx as h, Fragment as ye } from "react/jsx-runtime";
import { useEditorState as hc, NodeViewWrapper as eo, ReactNodeViewRenderer as mc, useEditor as Xu, EditorContent as Zu, NodeViewContent as Qu } from "@tiptap/react";
import * as M from "react";
import X, { useState as j, useRef as Y, useEffect as q, useLayoutEffect as ho, memo as bt, useCallback as F, useImperativeHandle as Ju, createContext as gc, useContext as yc, useMemo as St, Component as ef, useReducer as tf, lazy as nf, forwardRef as rf, Suspense as Ua } from "react";
import of from "@tiptap/extension-code-block-lowlight";
import { createLowlight as sf } from "lowlight";
import { Image as Bs, X as mt, Link2 as Ws, Type as mo, Copy as wn, Undo as af, Redo as cf, Bold as zs, Italic as Fs, Underline as Us, Strikethrough as Ys, Code as vc, Highlighter as bc, Link as js, ChevronDown as tr, List as Vs, ListOrdered as Ks, CheckSquare as Gs, Quote as qs, FileCode as wc, IndentIncrease as lf, IndentDecrease as df, Table as ys, Minus as xc, Info as vs, BookOpen as kc, PenLine as uf, Library as ff, ListTodo as Cc, Columns as Ya, Trash2 as un, Rows as ja, ToggleLeft as Va, ArrowUpDown as pf, Sparkles as go, Search as hf, ChevronUp as mf, MousePointerClick as gf, CaseSensitive as yf, WholeWord as vf, Regex as bf, Replace as bs, ReplaceAll as wf, Plus as Xs, ChevronLeftIcon as xf, ChevronRightIcon as kf, ChevronDownIcon as Cf, Calendar as Ec, Hash as Ka, Cloud as Ef, Loader2 as Mc, Check as xn, CloudOff as Mf, AlertCircle as Tf, RotateCcw as Zs, Activity as Sf, Maximize2 as Tc, Minimize2 as Sc, AlertTriangle as Df, ChevronRight as Nf, CheckCircle2 as Lf, Eye as Af, FileText as Qs, ExternalLink as If, Pencil as Rf, Unlink as Pf, Heading1 as Of, Heading2 as _f, Heading3 as $f, Heading4 as Hf, Heading5 as Bf, Code2 as Wf, StickyNote as zf, MessageSquareText as Ff, ImagePlus as Uf, MessageSquare as Dc, RefreshCw as Yf, SpellCheck as jf, PanelRightClose as Vf, PanelRightOpen as Kf } from "lucide-react";
import * as Nc from "react-dom";
import Gf, { createPortal as qf } from "react-dom";
import { TextSelection as Ke, Plugin as De, PluginKey as Ne, NodeSelection as Xf, AllSelection as Zf } from "@tiptap/pm/state";
import { DOMSerializer as Lc, Fragment as Ac, Slice as jo } from "@tiptap/pm/model";
import Qf from "@tiptap/starter-kit";
import Jf from "@tiptap/extension-placeholder";
import ep from "@tiptap/extension-text-align";
import tp from "@tiptap/extension-highlight";
import np from "@tiptap/extension-link";
import { Table as rp } from "@tiptap/extension-table";
import op from "@tiptap/extension-table-row";
import sp from "@tiptap/extension-table-cell";
import ap from "@tiptap/extension-table-header";
import { Extension as $e, Node as yo, mergeAttributes as kn, InputRule as _e, Mark as Ic } from "@tiptap/core";
import { DecorationSet as Ve, Decoration as Ze } from "@tiptap/pm/view";
import ip from "@tiptap/extension-bullet-list";
import cp from "@tiptap/extension-ordered-list";
import lp from "@tiptap/extension-list-item";
import dp from "@tiptap/extension-task-list";
import up from "@tiptap/extension-task-item";
import { findWrapping as Ga, canJoin as fp } from "@tiptap/pm/transform";
import pp from "@tiptap/extension-underline";
import hp from "@tiptap/extension-subscript";
import mp from "@tiptap/extension-superscript";
import gp from "@tiptap/extension-typography";
import yp from "@tiptap/extension-image";
import { createRoot as vp } from "react-dom/client";
import { liftListItem as qa, sinkListItem as Xa } from "@tiptap/pm/schema-list";
import { undo as bp, redo as wp } from "@tiptap/pm/history";
import xp from "@tiptap/extension-horizontal-rule";
import kp from "@tiptap/extension-code";
import Cp from "@tiptap/extension-bold";
import Ep from "@tiptap/extension-italic";
import Mp from "@tiptap/extension-strike";
const je = sf(), Rc = {
  javascript: () => import("highlight.js/lib/languages/javascript"),
  typescript: () => import("highlight.js/lib/languages/typescript"),
  python: () => import("highlight.js/lib/languages/python"),
  xml: () => import("highlight.js/lib/languages/xml"),
  css: () => import("highlight.js/lib/languages/css"),
  json: () => import("highlight.js/lib/languages/json"),
  bash: () => import("highlight.js/lib/languages/bash")
}, Pc = {
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
}, Tp = {
  sql: () => import("highlight.js/lib/languages/sql"),
  java: () => import("highlight.js/lib/languages/java"),
  cpp: () => import("highlight.js/lib/languages/cpp"),
  c: () => import("highlight.js/lib/languages/cpp"),
  csharp: () => import("highlight.js/lib/languages/csharp"),
  go: () => import("highlight.js/lib/languages/go"),
  golang: () => import("highlight.js/lib/languages/go"),
  rust: () => import("highlight.js/lib/languages/rust"),
  rs: () => import("highlight.js/lib/languages/rust"),
  ruby: () => import("highlight.js/lib/languages/ruby"),
  php: () => import("highlight.js/lib/languages/php"),
  swift: () => import("highlight.js/lib/languages/swift"),
  kotlin: () => import("highlight.js/lib/languages/kotlin"),
  scss: () => import("highlight.js/lib/languages/scss"),
  markdown: () => import("highlight.js/lib/languages/markdown"),
  md: () => import("highlight.js/lib/languages/markdown"),
  yaml: () => import("highlight.js/lib/languages/yaml"),
  yml: () => import("highlight.js/lib/languages/yaml"),
  diff: () => import("highlight.js/lib/languages/diff"),
  patch: () => import("highlight.js/lib/languages/diff")
}, Lr = /* @__PURE__ */ new Set(), Ar = /* @__PURE__ */ new Set();
let Za = !1, On = null;
async function Oc() {
  if (!Za)
    return On || (On = (async () => {
      try {
        const e = Object.entries(Rc), t = await Promise.all(
          e.map(async ([n, r]) => {
            const o = await r();
            return [n, o.default];
          })
        );
        for (const [n, r] of t)
          je.registered(n) || je.register(n, r);
        for (const [n, r] of Object.entries(Pc))
          if (!je.registered(n)) {
            const o = t.find(([s]) => s === r);
            o && je.register(n, o[1]);
          }
        Za = !0;
      } catch (e) {
        console.warn("Failed to load core highlight.js languages:", e), On = null;
      }
    })(), On);
}
async function Qa(e) {
  if (je.registered(e)) return !0;
  if (Rc[e] || Pc[e])
    return await Oc(), je.registered(e);
  const t = Tp[e];
  if (!t) return !1;
  if (Ar.has(e)) return !0;
  if (Lr.has(e))
    return new Promise((n) => {
      const r = () => {
        Ar.has(e) ? n(!0) : Lr.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  Lr.add(e);
  try {
    const r = (await t()).default;
    je.register(e, r), Ar.add(e);
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
          i !== e && !je.registered(i) && (je.register(i, r), Ar.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Lr.delete(e);
  }
}
const Ja = "http://www.w3.org/2000/svg";
function Ir(e, t, n) {
  const r = document.createElementNS(Ja, "svg");
  r.setAttribute("width", String(t)), r.setAttribute("height", String(t)), r.setAttribute("viewBox", "0 0 24 24"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-linejoin", "round"), n && r.setAttribute("class", n);
  for (const o of e) {
    const s = document.createElementNS(Ja, "path");
    s.setAttribute("d", o), r.appendChild(s);
  }
  return r;
}
const ei = [
  "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z",
  "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
], Sp = ["M20 6 9 17l-5-5"], Dp = ["m6 9 6 6 6-6"], Np = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  html: "HTML",
  xml: "XML",
  css: "CSS",
  scss: "SCSS",
  json: "JSON",
  yaml: "YAML",
  markdown: "Markdown",
  sql: "SQL",
  bash: "Bash",
  shell: "Shell",
  diff: "Diff"
}, _c = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  golang: "go",
  rs: "rust",
  md: "markdown",
  yml: "yaml",
  patch: "diff",
  sh: "bash",
  zsh: "bash",
  svg: "xml"
}, Lp = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "csharp",
  "go",
  "rust",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "html",
  "xml",
  "css",
  "scss",
  "json",
  "yaml",
  "markdown",
  "sql",
  "bash",
  "shell",
  "diff"
];
function Ap() {
  return Lp;
}
function ti(e) {
  if (e === "plaintext") return "Plain Text";
  const t = _c[e] || e;
  return Np[t] || e.charAt(0).toUpperCase() + e.slice(1);
}
class Ip {
  constructor(t, n, r) {
    this.isVisible = !1, this.languageReady = !1, this.copied = !1, this.copiedTimeout = null, this.highlightForced = !1, this.handleMouseEnter = () => {
      this.controlsEl.style.setProperty("opacity", "1", "important"), this.controlsEl.style.setProperty("transition", "none", "important");
    }, this.handleMouseLeave = () => {
      this.controlsEl.style.removeProperty("opacity"), this.controlsEl.style.removeProperty("transition");
    }, this.handleLanguageChange = () => {
      const a = this.selectEl.value, c = this.getPos();
      c != null && (this.labelEl.textContent = this.formatLanguageLabel(a), this.view.dispatch(
        this.view.state.tr.setNodeMarkup(c, void 0, {
          ...this.node.attrs,
          language: a
        })
      ));
    }, this.handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(this.node.textContent), this.setCopiedState(!0), this.copiedTimeout && clearTimeout(this.copiedTimeout), this.copiedTimeout = setTimeout(() => this.setCopiedState(!1), 2e3);
      } catch (a) {
        console.error("Failed to copy:", a);
      }
    }, this.node = t, this.view = n, this.getPos = r;
    const o = t.attrs.language || "plaintext";
    this.dom = document.createElement("div"), this.dom.className = "code-block-wrapper", this.dom.setAttribute("data-node-view-wrapper", ""), this.controlsEl = document.createElement("div"), this.controlsEl.className = "code-block-controls", this.controlsEl.contentEditable = "false";
    const s = document.createElement("div");
    s.className = "code-block-language-wrapper", this.selectEl = document.createElement("select"), this.selectEl.className = "code-block-language-select", this.selectEl.value = o, this.populateLanguageOptions(o), this.selectEl.addEventListener("change", this.handleLanguageChange), this.labelEl = document.createElement("span"), this.labelEl.className = "code-block-language-label", this.labelEl.textContent = this.formatLanguageLabel(o);
    const i = Ir(Dp, 12, "code-block-language-chevron");
    s.appendChild(this.selectEl), s.appendChild(this.labelEl), s.appendChild(i), this.copyBtn = document.createElement("button"), this.copyBtn.type = "button", this.copyBtn.className = "code-block-copy-btn", this.copyBtn.title = "Copy code", this.copyBtn.appendChild(Ir(ei, 14)), this.copyBtn.addEventListener("click", this.handleCopy), this.controlsEl.appendChild(s), this.controlsEl.appendChild(this.copyBtn), this.preEl = document.createElement("pre"), this.preEl.className = "code-block-pre", this.codeEl = document.createElement("code"), this.codeEl.className = `language-${o}`, this.preEl.appendChild(this.codeEl), this.contentDOM = this.codeEl, this.dom.appendChild(this.controlsEl), this.dom.appendChild(this.preEl), this.dom.addEventListener("mouseenter", this.handleMouseEnter), this.dom.addEventListener("mouseleave", this.handleMouseLeave), setTimeout(() => {
      this.isVisible = !0, this.onBecameVisible().catch(() => {
      });
    }, 0);
  }
  // ── Language select ──
  populateLanguageOptions(t) {
    this.selectEl.innerHTML = "";
    const n = document.createElement("option");
    n.value = "plaintext", n.textContent = "Plain Text", this.selectEl.appendChild(n);
    const r = Ap();
    for (const s of r) {
      const i = document.createElement("option");
      i.value = s, i.textContent = ti(s), this.selectEl.appendChild(i);
    }
    const o = _c[t] || t;
    this.selectEl.value = o;
  }
  formatLanguageLabel(t) {
    return ti(t);
  }
  setCopiedState(t) {
    this.copied = t, this.copyBtn.className = `code-block-copy-btn${t ? " copied" : ""}`, this.copyBtn.title = t ? "Copied!" : "Copy code", this.copyBtn.innerHTML = "", this.copyBtn.appendChild(
      Ir(t ? Sp : ei, 14)
    );
  }
  // ── Language loading ──
  async onBecameVisible() {
    const t = this.node.attrs.language || "plaintext";
    if (await Oc(), t === "plaintext") {
      this.setLanguageReady(!0);
      return;
    }
    if (je.registered(t)) {
      this.setLanguageReady(!0);
      return;
    }
    const n = await Qa(t);
    this.setLanguageReady(n || t === "plaintext"), n && !this.highlightForced && (this.highlightForced = !0, this.forceRehighlight(t));
  }
  /**
   * Force the lowlight ProseMirror plugin to recompute syntax highlighting
   * decorations by dispatching a setNodeMarkup transaction that "touches"
   * the language attribute. This is needed after lazy-loading a language
   * because the lowlight plugin may have already run and cached empty
   * decorations for this code block.
   */
  forceRehighlight(t) {
    const n = this.getPos();
    if (n != null)
      try {
        const { tr: r } = this.view.state;
        r.setNodeMarkup(n, void 0, {
          ...this.node.attrs,
          language: t
        }), r.setMeta("addToHistory", !1), this.view.dispatch(r);
      } catch {
      }
  }
  setLanguageReady(t) {
    this.languageReady = t;
    const r = `language-${this.node.attrs.language || "plaintext"}`;
    this.codeEl.className !== r && (this.codeEl.className = r);
  }
  // ── ProseMirror NodeView interface ──
  update(t) {
    if (t.type !== this.node.type) return !1;
    const n = this.node.attrs.language || "plaintext", r = t.attrs.language || "plaintext";
    return this.node = t, n !== r && (this.labelEl.textContent = this.formatLanguageLabel(r), this.selectEl.value = r, r === "plaintext" ? this.setLanguageReady(!0) : je.registered(r) ? this.setLanguageReady(!0) : this.isVisible && (this.setLanguageReady(!1), Qa(r).then((o) => {
      (this.node.attrs.language || "plaintext") === r && (this.setLanguageReady(o || r === "plaintext"), this.populateLanguageOptions(r));
    }))), !0;
  }
  selectNode() {
    this.dom.classList.add("ProseMirror-selectednode");
  }
  deselectNode() {
    this.dom.classList.remove("ProseMirror-selectednode");
  }
  destroy() {
    this.copiedTimeout && (clearTimeout(this.copiedTimeout), this.copiedTimeout = null), this.selectEl.removeEventListener("change", this.handleLanguageChange), this.copyBtn.removeEventListener("click", this.handleCopy), this.dom.removeEventListener("mouseenter", this.handleMouseEnter), this.dom.removeEventListener("mouseleave", this.handleMouseLeave);
  }
  // Let ProseMirror handle mutations inside the <code> contentDOM
  ignoreMutation(t) {
    return !this.contentDOM.contains(t.target);
  }
  stopEvent(t) {
    const n = t.target;
    return !!(n && !this.contentDOM.contains(n) && this.dom.contains(n));
  }
}
const Rp = of.configure({
  lowlight: je,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
}).extend({
  addNodeView() {
    return ({ node: e, view: t, getPos: n }) => new Ip(e, t, n);
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
  const { state: t } = e, { from: n, to: r, empty: o } = t.selection;
  if (e.isActive("codeBlock") || o)
    return e.chain().focus().toggleCodeBlock().run();
  let s = 0;
  const i = [];
  if (t.doc.nodesBetween(n, r, (m) => m.isTextblock ? (s++, i.push(m.textContent), !1) : !0), s <= 1)
    return e.chain().focus().toggleCodeBlock().run();
  const a = i.join(`
`), c = t.schema.nodes.codeBlock, l = t.doc.resolve(n), d = t.doc.resolve(r), u = Math.max(1, l.depth), f = Math.max(1, d.depth), p = l.before(u), g = d.after(f);
  return e.chain().focus().command(({ tr: m }) => {
    const y = c.create(
      { language: null },
      a ? t.schema.text(a) : void 0
    );
    return m.replaceWith(p, g, y), !0;
  }).run();
}
function $c({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = j(""), [i, a] = j(""), [c, l] = j(""), [d, u] = j(!1), f = Y(null), p = Y(null);
  q(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), q(() => {
    if (!e) return;
    const v = (w) => {
      p.current && !p.current.contains(w.target) && t();
    }, x = (w) => {
      w.key === "Escape" && t();
    }, T = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", x), () => {
      clearTimeout(T), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", x);
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
  }, m = async () => {
    if (!g(o)) return;
    u(!0);
    const v = new window.Image();
    v.onload = () => {
      u(!1), n(o.trim(), i.trim()), t();
    }, v.onerror = () => {
      u(!1), n(o.trim(), i.trim()), t();
    }, setTimeout(() => {
      d && (u(!1), n(o.trim(), i.trim()), t());
    }, 3e3), v.src = o.trim();
  }, y = (v) => {
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), m());
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
            /* @__PURE__ */ h(Bs, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ h("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ h(mt, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ I("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ I("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ h(Ws, { size: 12 }),
              "Image URL"
            ] }),
            /* @__PURE__ */ h(
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
            c && /* @__PURE__ */ h("span", { className: "image-url-dialog-error", children: c })
          ] }),
          /* @__PURE__ */ I("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ I("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ h(mo, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ h(
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
            /* @__PURE__ */ h(
              "button",
              {
                onClick: t,
                className: "image-url-dialog-btn image-url-dialog-btn-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: m,
                disabled: d || !o.trim(),
                className: "image-url-dialog-btn image-url-dialog-btn-insert",
                children: d ? "Validating..." : "Insert Image"
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
function ni(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function vo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = ni(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : ni(e[o], null);
        }
      };
  };
}
function Ie(...e) {
  return M.useCallback(vo(...e), e);
}
function Cn(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = M.createContext(i), c = n.length;
    n = [...n, i];
    const l = (u) => {
      const { scope: f, children: p, ...g } = u, m = f?.[e]?.[c] || a, y = M.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ h(m.Provider, { value: y, children: p });
    };
    l.displayName = s + "Provider";
    function d(u, f) {
      const p = f?.[e]?.[c] || a, g = M.useContext(p);
      if (g) return g;
      if (i !== void 0) return i;
      throw new Error(`\`${u}\` must be used within \`${s}\``);
    }
    return [l, d];
  }
  const o = () => {
    const s = n.map((i) => M.createContext(i));
    return function(a) {
      const c = a?.[e] || s;
      return M.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return o.scopeName = e, [r, Pp(o, ...t)];
}
function Pp(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const i = r.reduce((a, { useScope: c, scopeName: l }) => {
        const u = c(s)[`__scope${l}`];
        return { ...a, ...u };
      }, {});
      return M.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Dt = globalThis?.document ? M.useLayoutEffect : () => {
}, Op = M[" useInsertionEffect ".trim().toString()] || Dt;
function ea({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = _p({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : o;
  {
    const d = M.useRef(e !== void 0);
    M.useEffect(() => {
      const u = d.current;
      u !== a && console.warn(
        `${r} is changing from ${u ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = a;
    }, [a, r]);
  }
  const l = M.useCallback(
    (d) => {
      if (a) {
        const u = $p(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function _p({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = M.useState(e), o = M.useRef(n), s = M.useRef(t);
  return Op(() => {
    s.current = t;
  }, [t]), M.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function $p(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function Kn(e) {
  const t = /* @__PURE__ */ Bp(e), n = M.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = M.Children.toArray(s), c = a.find(zp);
    if (c) {
      const l = c.props.children, d = a.map((u) => u === c ? M.Children.count(l) > 1 ? M.Children.only(null) : M.isValidElement(l) ? l.props.children : null : u);
      return /* @__PURE__ */ h(t, { ...i, ref: o, children: M.isValidElement(l) ? M.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ h(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Hp = /* @__PURE__ */ Kn("Slot");
// @__NO_SIDE_EFFECTS__
function Bp(e) {
  const t = M.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (M.isValidElement(o)) {
      const i = Up(o), a = Fp(s, o.props);
      return o.type !== M.Fragment && (a.ref = r ? vo(r, i) : i), M.cloneElement(o, a);
    }
    return M.Children.count(o) > 1 ? M.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Hc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Wp(e) {
  const t = ({ children: n }) => /* @__PURE__ */ h(ye, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Hc, t;
}
function zp(e) {
  return M.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Hc;
}
function Fp(e, t) {
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
function Up(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Yp = [
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
], Le = Yp.reduce((e, t) => {
  const n = /* @__PURE__ */ Kn(`Primitive.${t}`), r = M.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Bc(e, t) {
  e && Nc.flushSync(() => e.dispatchEvent(t));
}
function Wc(e) {
  const t = e + "CollectionProvider", [n, r] = Cn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (m) => {
    const { scope: y, children: b } = m, v = X.useRef(null), x = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ h(o, { scope: y, itemMap: x, collectionRef: v, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ Kn(a), l = X.forwardRef(
    (m, y) => {
      const { scope: b, children: v } = m, x = s(a, b), T = Ie(y, x.collectionRef);
      return /* @__PURE__ */ h(c, { ref: T, children: v });
    }
  );
  l.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = /* @__PURE__ */ Kn(d), p = X.forwardRef(
    (m, y) => {
      const { scope: b, children: v, ...x } = m, T = X.useRef(null), w = Ie(y, T), E = s(d, b);
      return X.useEffect(() => (E.itemMap.set(T, { ref: T, ...x }), () => void E.itemMap.delete(T))), /* @__PURE__ */ h(f, { [u]: "", ref: w, children: v });
    }
  );
  p.displayName = d;
  function g(m) {
    const y = s(e + "CollectionConsumer", m);
    return X.useCallback(() => {
      const v = y.collectionRef.current;
      if (!v) return [];
      const x = Array.from(v.querySelectorAll(`[${u}]`));
      return Array.from(y.itemMap.values()).sort(
        (E, S) => x.indexOf(E.ref.current) - x.indexOf(S.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    g,
    r
  ];
}
var jp = M.createContext(void 0);
function zc(e) {
  const t = M.useContext(jp);
  return e || t || "ltr";
}
function gt(e) {
  const t = M.useRef(e);
  return M.useEffect(() => {
    t.current = e;
  }), M.useMemo(() => (...n) => t.current?.(...n), []);
}
function Vp(e, t = globalThis?.document) {
  const n = gt(e);
  M.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Kp = "DismissableLayer", ws = "dismissableLayer.update", Gp = "dismissableLayer.pointerDownOutside", qp = "dismissableLayer.focusOutside", ri, Fc = M.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ta = M.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = M.useContext(Fc), [d, u] = M.useState(null), f = d?.ownerDocument ?? globalThis?.document, [, p] = M.useState({}), g = Ie(t, (S) => u(S)), m = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = m.indexOf(y), v = d ? m.indexOf(d) : -1, x = l.layersWithOutsidePointerEventsDisabled.size > 0, T = v >= b, w = Qp((S) => {
      const k = S.target, N = [...l.branches].some((C) => C.contains(k));
      !T || N || (o?.(S), i?.(S), S.defaultPrevented || a?.());
    }, f), E = Jp((S) => {
      const k = S.target;
      [...l.branches].some((C) => C.contains(k)) || (s?.(S), i?.(S), S.defaultPrevented || a?.());
    }, f);
    return Vp((S) => {
      v === l.layers.size - 1 && (r?.(S), !S.defaultPrevented && a && (S.preventDefault(), a()));
    }, f), M.useEffect(() => {
      if (d)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (ri = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), oi(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = ri);
        };
    }, [d, f, n, l]), M.useEffect(() => () => {
      d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), oi());
    }, [d, l]), M.useEffect(() => {
      const S = () => p({});
      return document.addEventListener(ws, S), () => document.removeEventListener(ws, S);
    }, []), /* @__PURE__ */ h(
      Le.div,
      {
        ...c,
        ref: g,
        style: {
          pointerEvents: x ? T ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ie(e.onFocusCapture, E.onFocusCapture),
        onBlurCapture: ie(e.onBlurCapture, E.onBlurCapture),
        onPointerDownCapture: ie(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
ta.displayName = Kp;
var Xp = "DismissableLayerBranch", Zp = M.forwardRef((e, t) => {
  const n = M.useContext(Fc), r = M.useRef(null), o = Ie(t, r);
  return M.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ h(Le.div, { ...e, ref: o });
});
Zp.displayName = Xp;
function Qp(e, t = globalThis?.document) {
  const n = gt(e), r = M.useRef(!1), o = M.useRef(() => {
  });
  return M.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          Uc(
            Gp,
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
function Jp(e, t = globalThis?.document) {
  const n = gt(e), r = M.useRef(!1);
  return M.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Uc(qp, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function oi() {
  const e = new CustomEvent(ws);
  document.dispatchEvent(e);
}
function Uc(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Bc(o, s) : o.dispatchEvent(s);
}
var Vo = 0;
function eh() {
  M.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? si()), document.body.insertAdjacentElement("beforeend", e[1] ?? si()), Vo++, () => {
      Vo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Vo--;
    };
  }, []);
}
function si() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ko = "focusScope.autoFocusOnMount", Go = "focusScope.autoFocusOnUnmount", ai = { bubbles: !1, cancelable: !0 }, th = "FocusScope", Yc = M.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = M.useState(null), l = gt(o), d = gt(s), u = M.useRef(null), f = Ie(t, (m) => c(m)), p = M.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  M.useEffect(() => {
    if (r) {
      let m = function(x) {
        if (p.paused || !a) return;
        const T = x.target;
        a.contains(T) ? u.current = T : Tt(u.current, { select: !0 });
      }, y = function(x) {
        if (p.paused || !a) return;
        const T = x.relatedTarget;
        T !== null && (a.contains(T) || Tt(u.current, { select: !0 }));
      }, b = function(x) {
        if (document.activeElement === document.body)
          for (const w of x)
            w.removedNodes.length > 0 && Tt(a);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", y);
      const v = new MutationObserver(b);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", y), v.disconnect();
      };
    }
  }, [r, a, p.paused]), M.useEffect(() => {
    if (a) {
      ci.add(p);
      const m = document.activeElement;
      if (!a.contains(m)) {
        const b = new CustomEvent(Ko, ai);
        a.addEventListener(Ko, l), a.dispatchEvent(b), b.defaultPrevented || (nh(ih(jc(a)), { select: !0 }), document.activeElement === m && Tt(a));
      }
      return () => {
        a.removeEventListener(Ko, l), setTimeout(() => {
          const b = new CustomEvent(Go, ai);
          a.addEventListener(Go, d), a.dispatchEvent(b), b.defaultPrevented || Tt(m ?? document.body, { select: !0 }), a.removeEventListener(Go, d), ci.remove(p);
        }, 0);
      };
    }
  }, [a, l, d, p]);
  const g = M.useCallback(
    (m) => {
      if (!n && !r || p.paused) return;
      const y = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, b = document.activeElement;
      if (y && b) {
        const v = m.currentTarget, [x, T] = rh(v);
        x && T ? !m.shiftKey && b === T ? (m.preventDefault(), n && Tt(x, { select: !0 })) : m.shiftKey && b === x && (m.preventDefault(), n && Tt(T, { select: !0 })) : b === v && m.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ h(Le.div, { tabIndex: -1, ...i, ref: f, onKeyDown: g });
});
Yc.displayName = th;
function nh(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Tt(r, { select: t }), document.activeElement !== n) return;
}
function rh(e) {
  const t = jc(e), n = ii(t, e), r = ii(t.reverse(), e);
  return [n, r];
}
function jc(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function ii(e, t) {
  for (const n of e)
    if (!oh(n, { upTo: t })) return n;
}
function oh(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function sh(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Tt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && sh(e) && t && e.select();
  }
}
var ci = ah();
function ah() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = li(e, t), e.unshift(t);
    },
    remove(t) {
      e = li(e, t), e[0]?.resume();
    }
  };
}
function li(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function ih(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ch = M[" useId ".trim().toString()] || (() => {
}), lh = 0;
function to(e) {
  const [t, n] = M.useState(ch());
  return Dt(() => {
    n((r) => r ?? String(lh++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const dh = ["top", "right", "bottom", "left"], Nt = Math.min, We = Math.max, no = Math.round, Rr = Math.floor, st = (e) => ({
  x: e,
  y: e
}), uh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, fh = {
  start: "end",
  end: "start"
};
function xs(e, t, n) {
  return We(e, Nt(t, n));
}
function yt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  return e.split("-")[0];
}
function En(e) {
  return e.split("-")[1];
}
function na(e) {
  return e === "x" ? "y" : "x";
}
function ra(e) {
  return e === "y" ? "height" : "width";
}
const ph = /* @__PURE__ */ new Set(["top", "bottom"]);
function rt(e) {
  return ph.has(vt(e)) ? "y" : "x";
}
function oa(e) {
  return na(rt(e));
}
function hh(e, t, n) {
  n === void 0 && (n = !1);
  const r = En(e), o = oa(e), s = ra(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = ro(i)), [i, ro(i)];
}
function mh(e) {
  const t = ro(e);
  return [ks(e), t, ks(t)];
}
function ks(e) {
  return e.replace(/start|end/g, (t) => fh[t]);
}
const di = ["left", "right"], ui = ["right", "left"], gh = ["top", "bottom"], yh = ["bottom", "top"];
function vh(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ui : di : t ? di : ui;
    case "left":
    case "right":
      return t ? gh : yh;
    default:
      return [];
  }
}
function bh(e, t, n, r) {
  const o = En(e);
  let s = vh(vt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(ks)))), s;
}
function ro(e) {
  return e.replace(/left|right|bottom|top/g, (t) => uh[t]);
}
function wh(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Vc(e) {
  return typeof e != "number" ? wh(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function oo(e) {
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
function fi(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = rt(t), i = oa(t), a = ra(i), c = vt(t), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
  let p;
  switch (c) {
    case "top":
      p = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: u
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: u
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (En(t)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const xh = async (e, t, n) => {
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
    x: d,
    y: u
  } = fi(l, r, c), f = r, p = {}, g = 0;
  for (let m = 0; m < a.length; m++) {
    const {
      name: y,
      fn: b
    } = a[m], {
      x: v,
      y: x,
      data: T,
      reset: w
    } = await b({
      x: d,
      y: u,
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
    d = v ?? d, u = x ?? u, p = {
      ...p,
      [y]: {
        ...p[y],
        ...T
      }
    }, w && g <= 50 && (g++, typeof w == "object" && (w.placement && (f = w.placement), w.rects && (l = w.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : w.rects), {
      x: d,
      y: u
    } = fi(l, f, c)), m = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function Gn(e, t) {
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
    rootBoundary: d = "viewport",
    elementContext: u = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = yt(t, e), g = Vc(p), y = a[f ? u === "floating" ? "reference" : "floating" : u], b = oo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: c
  })), v = u === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, x = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), T = await (s.isElement == null ? void 0 : s.isElement(x)) ? await (s.getScale == null ? void 0 : s.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = oo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: v,
    offsetParent: x,
    strategy: c
  }) : v);
  return {
    top: (b.top - w.top + g.top) / T.y,
    bottom: (w.bottom - b.bottom + g.bottom) / T.y,
    left: (b.left - w.left + g.left) / T.x,
    right: (w.right - b.right + g.right) / T.x
  };
}
const kh = (e) => ({
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
      padding: d = 0
    } = yt(e, t) || {};
    if (l == null)
      return {};
    const u = Vc(d), f = {
      x: n,
      y: r
    }, p = oa(o), g = ra(p), m = await i.getDimensions(l), y = p === "y", b = y ? "top" : "left", v = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", T = s.reference[g] + s.reference[p] - f[p] - s.floating[g], w = f[p] - s.reference[p], E = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let S = E ? E[x] : 0;
    (!S || !await (i.isElement == null ? void 0 : i.isElement(E))) && (S = a.floating[x] || s.floating[g]);
    const k = T / 2 - w / 2, N = S / 2 - m[g] / 2 - 1, C = Nt(u[b], N), D = Nt(u[v], N), L = C, P = S - m[g] - D, O = S / 2 - m[g] / 2 + k, $ = xs(L, O, P), W = !c.arrow && En(o) != null && O !== $ && s.reference[g] / 2 - (O < L ? C : D) - m[g] / 2 < 0, V = W ? O < L ? O - L : O - P : 0;
    return {
      [p]: f[p] + V,
      data: {
        [p]: $,
        centerOffset: O - $ - V,
        ...W && {
          alignmentOffset: V
        }
      },
      reset: W
    };
  }
}), Ch = function(e) {
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
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: m = !0,
        ...y
      } = yt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = vt(o), v = rt(a), x = vt(a) === a, T = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), w = f || (x || !m ? [ro(a)] : mh(a)), E = g !== "none";
      !f && E && w.push(...bh(a, m, g, T));
      const S = [a, ...w], k = await Gn(t, y), N = [];
      let C = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && N.push(k[b]), u) {
        const O = hh(o, i, T);
        N.push(k[O[0]], k[O[1]]);
      }
      if (C = [...C, {
        placement: o,
        overflows: N
      }], !N.every((O) => O <= 0)) {
        var D, L;
        const O = (((D = s.flip) == null ? void 0 : D.index) || 0) + 1, $ = S[O];
        if ($ && (!(u === "alignment" ? v !== rt($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        C.every((R) => rt(R.placement) === v ? R.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: C
            },
            reset: {
              placement: $
            }
          };
        let W = (L = C.filter((V) => V.overflows[0] <= 0).sort((V, R) => V.overflows[1] - R.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!W)
          switch (p) {
            case "bestFit": {
              var P;
              const V = (P = C.filter((R) => {
                if (E) {
                  const A = rt(R.placement);
                  return A === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  A === "y";
                }
                return !0;
              }).map((R) => [R.placement, R.overflows.filter((A) => A > 0).reduce((A, H) => A + H, 0)]).sort((R, A) => R[1] - A[1])[0]) == null ? void 0 : P[0];
              V && (W = V);
              break;
            }
            case "initialPlacement":
              W = a;
              break;
          }
        if (o !== W)
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
function pi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function hi(e) {
  return dh.some((t) => e[t] >= 0);
}
const Eh = function(e) {
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
          const s = await Gn(t, {
            ...o,
            elementContext: "reference"
          }), i = pi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: hi(i)
            }
          };
        }
        case "escaped": {
          const s = await Gn(t, {
            ...o,
            altBoundary: !0
          }), i = pi(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: hi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Kc = /* @__PURE__ */ new Set(["left", "top"]);
async function Mh(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = vt(n), a = En(n), c = rt(n) === "y", l = Kc.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = yt(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: g
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return a && typeof g == "number" && (p = a === "end" ? g * -1 : g), c ? {
    x: p * d,
    y: f * l
  } : {
    x: f * l,
    y: p * d
  };
}
const Th = function(e) {
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
      } = t, c = await Mh(t, e);
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
}, Sh = function(e) {
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
      } = yt(e, t), l = {
        x: n,
        y: r
      }, d = await Gn(t, c), u = rt(vt(o)), f = na(u);
      let p = l[f], g = l[u];
      if (s) {
        const y = f === "y" ? "top" : "left", b = f === "y" ? "bottom" : "right", v = p + d[y], x = p - d[b];
        p = xs(v, p, x);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", b = u === "y" ? "bottom" : "right", v = g + d[y], x = g - d[b];
        g = xs(v, g, x);
      }
      const m = a.fn({
        ...t,
        [f]: p,
        [u]: g
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r,
          enabled: {
            [f]: s,
            [u]: i
          }
        }
      };
    }
  };
}, Dh = function(e) {
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
      } = yt(e, t), d = {
        x: n,
        y: r
      }, u = rt(o), f = na(u);
      let p = d[f], g = d[u];
      const m = yt(a, t), y = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (c) {
        const x = f === "y" ? "height" : "width", T = s.reference[f] - s.floating[x] + y.mainAxis, w = s.reference[f] + s.reference[x] - y.mainAxis;
        p < T ? p = T : p > w && (p = w);
      }
      if (l) {
        var b, v;
        const x = f === "y" ? "width" : "height", T = Kc.has(vt(o)), w = s.reference[u] - s.floating[x] + (T && ((b = i.offset) == null ? void 0 : b[u]) || 0) + (T ? 0 : y.crossAxis), E = s.reference[u] + s.reference[x] + (T ? 0 : ((v = i.offset) == null ? void 0 : v[u]) || 0) - (T ? y.crossAxis : 0);
        g < w ? g = w : g > E && (g = E);
      }
      return {
        [f]: p,
        [u]: g
      };
    }
  };
}, Nh = function(e) {
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
      } = yt(e, t), d = await Gn(t, l), u = vt(o), f = En(o), p = rt(o) === "y", {
        width: g,
        height: m
      } = s.floating;
      let y, b;
      u === "top" || u === "bottom" ? (y = u, b = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = u, y = f === "end" ? "top" : "bottom");
      const v = m - d.top - d.bottom, x = g - d.left - d.right, T = Nt(m - d[y], v), w = Nt(g - d[b], x), E = !t.middlewareData.shift;
      let S = T, k = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = x), (r = t.middlewareData.shift) != null && r.enabled.y && (S = v), E && !f) {
        const C = We(d.left, 0), D = We(d.right, 0), L = We(d.top, 0), P = We(d.bottom, 0);
        p ? k = g - 2 * (C !== 0 || D !== 0 ? C + D : We(d.left, d.right)) : S = m - 2 * (L !== 0 || P !== 0 ? L + P : We(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: k,
        availableHeight: S
      });
      const N = await i.getDimensions(a.floating);
      return g !== N.width || m !== N.height ? {
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
function Mn(e) {
  return Gc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ze(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function it(e) {
  var t;
  return (t = (Gc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Gc(e) {
  return bo() ? e instanceof Node || e instanceof ze(e).Node : !1;
}
function Qe(e) {
  return bo() ? e instanceof Element || e instanceof ze(e).Element : !1;
}
function at(e) {
  return bo() ? e instanceof HTMLElement || e instanceof ze(e).HTMLElement : !1;
}
function mi(e) {
  return !bo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ze(e).ShadowRoot;
}
const Lh = /* @__PURE__ */ new Set(["inline", "contents"]);
function nr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Lh.has(o);
}
const Ah = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Ih(e) {
  return Ah.has(Mn(e));
}
const Rh = [":popover-open", ":modal"];
function wo(e) {
  return Rh.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Ph = ["transform", "translate", "scale", "rotate", "perspective"], Oh = ["transform", "translate", "scale", "rotate", "perspective", "filter"], _h = ["paint", "layout", "strict", "content"];
function sa(e) {
  const t = aa(), n = Qe(e) ? Je(e) : e;
  return Ph.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Oh.some((r) => (n.willChange || "").includes(r)) || _h.some((r) => (n.contain || "").includes(r));
}
function $h(e) {
  let t = Lt(e);
  for (; at(t) && !yn(t); ) {
    if (sa(t))
      return t;
    if (wo(t))
      return null;
    t = Lt(t);
  }
  return null;
}
function aa() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Hh = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function yn(e) {
  return Hh.has(Mn(e));
}
function Je(e) {
  return ze(e).getComputedStyle(e);
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
function Lt(e) {
  if (Mn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    mi(e) && e.host || // Fallback.
    it(e)
  );
  return mi(t) ? t.host : t;
}
function qc(e) {
  const t = Lt(e);
  return yn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : at(t) && nr(t) ? t : qc(t);
}
function qn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = qc(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = ze(o);
  if (s) {
    const a = Cs(i);
    return t.concat(i, i.visualViewport || [], nr(o) ? o : [], a && n ? qn(a) : []);
  }
  return t.concat(o, qn(o, [], n));
}
function Cs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Xc(e) {
  const t = Je(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = at(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = no(n) !== s || no(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function ia(e) {
  return Qe(e) ? e : e.contextElement;
}
function fn(e) {
  const t = ia(e);
  if (!at(t))
    return st(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Xc(t);
  let i = (s ? no(n.width) : n.width) / r, a = (s ? no(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Bh = /* @__PURE__ */ st(0);
function Zc(e) {
  const t = ze(e);
  return !aa() || !t.visualViewport ? Bh : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Wh(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ze(e) ? !1 : t;
}
function jt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ia(e);
  let i = st(1);
  t && (r ? Qe(r) && (i = fn(r)) : i = fn(e));
  const a = Wh(s, n, r) ? Zc(s) : st(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = ze(s), p = r && Qe(r) ? ze(r) : r;
    let g = f, m = Cs(g);
    for (; m && r && p !== g; ) {
      const y = fn(m), b = m.getBoundingClientRect(), v = Je(m), x = b.left + (m.clientLeft + parseFloat(v.paddingLeft)) * y.x, T = b.top + (m.clientTop + parseFloat(v.paddingTop)) * y.y;
      c *= y.x, l *= y.y, d *= y.x, u *= y.y, c += x, l += T, g = ze(m), m = Cs(g);
    }
  }
  return oo({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function ko(e, t) {
  const n = xo(e).scrollLeft;
  return t ? t.left + n : jt(it(e)).left + n;
}
function Qc(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - ko(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function zh(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = it(r), a = t ? wo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = st(1);
  const d = st(0), u = at(r);
  if ((u || !u && !s) && ((Mn(r) !== "body" || nr(i)) && (c = xo(r)), at(r))) {
    const p = jt(r);
    l = fn(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? Qc(i, c) : st(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + f.y
  };
}
function Fh(e) {
  return Array.from(e.getClientRects());
}
function Uh(e) {
  const t = it(e), n = xo(e), r = e.ownerDocument.body, o = We(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = We(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + ko(e);
  const a = -n.scrollTop;
  return Je(r).direction === "rtl" && (i += We(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const gi = 25;
function Yh(e, t) {
  const n = ze(e), r = it(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = aa();
    (!d || d && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = ko(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(r.clientWidth - u.clientWidth - p);
    g <= gi && (s -= g);
  } else l <= gi && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const jh = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Vh(e, t) {
  const n = jt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = at(e) ? fn(e) : st(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function yi(e, t, n) {
  let r;
  if (t === "viewport")
    r = Yh(e, n);
  else if (t === "document")
    r = Uh(it(e));
  else if (Qe(t))
    r = Vh(t, n);
  else {
    const o = Zc(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return oo(r);
}
function Jc(e, t) {
  const n = Lt(e);
  return n === t || !Qe(n) || yn(n) ? !1 : Je(n).position === "fixed" || Jc(n, t);
}
function Kh(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = qn(e, [], !1).filter((a) => Qe(a) && Mn(a) !== "body"), o = null;
  const s = Je(e).position === "fixed";
  let i = s ? Lt(e) : e;
  for (; Qe(i) && !yn(i); ) {
    const a = Je(i), c = sa(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && jh.has(o.position) || nr(i) && !c && Jc(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = Lt(i);
  }
  return t.set(e, r), r;
}
function Gh(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? wo(t) ? [] : Kh(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, d) => {
    const u = yi(t, d, o);
    return l.top = We(u.top, l.top), l.right = Nt(u.right, l.right), l.bottom = Nt(u.bottom, l.bottom), l.left = We(u.left, l.left), l;
  }, yi(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function qh(e) {
  const {
    width: t,
    height: n
  } = Xc(e);
  return {
    width: t,
    height: n
  };
}
function Xh(e, t, n) {
  const r = at(t), o = it(t), s = n === "fixed", i = jt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = st(0);
  function l() {
    c.x = ko(o);
  }
  if (r || !r && !s)
    if ((Mn(t) !== "body" || nr(o)) && (a = xo(t)), r) {
      const p = jt(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? Qc(o, a) : st(0), u = i.left + a.scrollLeft - c.x - d.x, f = i.top + a.scrollTop - c.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function qo(e) {
  return Je(e).position === "static";
}
function vi(e, t) {
  if (!at(e) || Je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return it(e) === n && (n = n.ownerDocument.body), n;
}
function el(e, t) {
  const n = ze(e);
  if (wo(e))
    return n;
  if (!at(e)) {
    let o = Lt(e);
    for (; o && !yn(o); ) {
      if (Qe(o) && !qo(o))
        return o;
      o = Lt(o);
    }
    return n;
  }
  let r = vi(e, t);
  for (; r && Ih(r) && qo(r); )
    r = vi(r, t);
  return r && yn(r) && qo(r) && !sa(r) ? n : r || $h(e) || n;
}
const Zh = async function(e) {
  const t = this.getOffsetParent || el, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Xh(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Qh(e) {
  return Je(e).direction === "rtl";
}
const Jh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: zh,
  getDocumentElement: it,
  getClippingRect: Gh,
  getOffsetParent: el,
  getElementRects: Zh,
  getClientRects: Fh,
  getDimensions: qh,
  getScale: fn,
  isElement: Qe,
  isRTL: Qh
};
function tl(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function em(e, t) {
  let n = null, r;
  const o = it(e);
  function s() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), s();
    const l = e.getBoundingClientRect(), {
      left: d,
      top: u,
      width: f,
      height: p
    } = l;
    if (a || t(), !f || !p)
      return;
    const g = Rr(u), m = Rr(o.clientWidth - (d + f)), y = Rr(o.clientHeight - (u + p)), b = Rr(d), x = {
      rootMargin: -g + "px " + -m + "px " + -y + "px " + -b + "px",
      threshold: We(0, Nt(1, c)) || 1
    };
    let T = !0;
    function w(E) {
      const S = E[0].intersectionRatio;
      if (S !== c) {
        if (!T)
          return i();
        S ? i(!1, S) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !tl(l, e.getBoundingClientRect()) && i(), T = !1;
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
function tm(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = ia(e), d = o || s ? [...l ? qn(l) : [], ...qn(t)] : [];
  d.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const u = l && a ? em(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = p) == null || x.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let g, m = c ? jt(e) : null;
  c && y();
  function y() {
    const b = jt(e);
    m && !tl(m, b) && n(), m = b, g = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    d.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), u?.(), (b = p) == null || b.disconnect(), p = null, c && cancelAnimationFrame(g);
  };
}
const nm = Th, rm = Sh, om = Ch, sm = Nh, am = Eh, bi = kh, im = Dh, cm = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Jh,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return xh(e, t, {
    ...o,
    platform: s
  });
};
var lm = typeof document < "u", dm = function() {
}, qr = lm ? ho : dm;
function so(e, t) {
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
        if (!so(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !so(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function nl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function wi(e, t) {
  const n = nl(e);
  return Math.round(t * n) / n;
}
function Xo(e) {
  const t = M.useRef(e);
  return qr(() => {
    t.current = e;
  }), t;
}
function um(e) {
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
  } = e, [d, u] = M.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = M.useState(r);
  so(f, r) || p(r);
  const [g, m] = M.useState(null), [y, b] = M.useState(null), v = M.useCallback((R) => {
    R !== E.current && (E.current = R, m(R));
  }, []), x = M.useCallback((R) => {
    R !== S.current && (S.current = R, b(R));
  }, []), T = s || g, w = i || y, E = M.useRef(null), S = M.useRef(null), k = M.useRef(d), N = c != null, C = Xo(c), D = Xo(o), L = Xo(l), P = M.useCallback(() => {
    if (!E.current || !S.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (R.platform = D.current), cm(E.current, S.current, R).then((A) => {
      const H = {
        ...A,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      O.current && !so(k.current, H) && (k.current = H, Nc.flushSync(() => {
        u(H);
      }));
    });
  }, [f, t, n, D, L]);
  qr(() => {
    l === !1 && k.current.isPositioned && (k.current.isPositioned = !1, u((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [l]);
  const O = M.useRef(!1);
  qr(() => (O.current = !0, () => {
    O.current = !1;
  }), []), qr(() => {
    if (T && (E.current = T), w && (S.current = w), T && w) {
      if (C.current)
        return C.current(T, w, P);
      P();
    }
  }, [T, w, P, C, N]);
  const $ = M.useMemo(() => ({
    reference: E,
    floating: S,
    setReference: v,
    setFloating: x
  }), [v, x]), W = M.useMemo(() => ({
    reference: T,
    floating: w
  }), [T, w]), V = M.useMemo(() => {
    const R = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return R;
    const A = wi(W.floating, d.x), H = wi(W.floating, d.y);
    return a ? {
      ...R,
      transform: "translate(" + A + "px, " + H + "px)",
      ...nl(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: A,
      top: H
    };
  }, [n, a, W.floating, d.x, d.y]);
  return M.useMemo(() => ({
    ...d,
    update: P,
    refs: $,
    elements: W,
    floatingStyles: V
  }), [d, P, $, W, V]);
}
const fm = (e) => {
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
      return r && t(r) ? r.current != null ? bi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? bi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, pm = (e, t) => ({
  ...nm(e),
  options: [e, t]
}), hm = (e, t) => ({
  ...rm(e),
  options: [e, t]
}), mm = (e, t) => ({
  ...im(e),
  options: [e, t]
}), gm = (e, t) => ({
  ...om(e),
  options: [e, t]
}), ym = (e, t) => ({
  ...sm(e),
  options: [e, t]
}), vm = (e, t) => ({
  ...am(e),
  options: [e, t]
}), bm = (e, t) => ({
  ...fm(e),
  options: [e, t]
});
var wm = "Arrow", rl = M.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ h(
    Le.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ h("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
rl.displayName = wm;
var xm = rl;
function km(e) {
  const [t, n] = M.useState(void 0);
  return Dt(() => {
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
var ca = "Popper", [ol, Co] = Cn(ca), [Cm, sl] = ol(ca), al = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = M.useState(null);
  return /* @__PURE__ */ h(Cm, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
al.displayName = ca;
var il = "PopperAnchor", cl = M.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = sl(il, n), i = M.useRef(null), a = Ie(t, i), c = M.useRef(null);
    return M.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ h(Le.div, { ...o, ref: a });
  }
);
cl.displayName = il;
var la = "PopperContent", [Em, Mm] = ol(la), ll = M.forwardRef(
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
      collisionPadding: d = 0,
      sticky: u = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: g,
      ...m
    } = e, y = sl(la, n), [b, v] = M.useState(null), x = Ie(t, (_) => v(_)), [T, w] = M.useState(null), E = km(T), S = E?.width ?? 0, k = E?.height ?? 0, N = r + (s !== "center" ? "-" + s : ""), C = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, D = Array.isArray(l) ? l : [l], L = D.length > 0, P = {
      padding: C,
      boundary: D.filter(Sm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: O, floatingStyles: $, placement: W, isPositioned: V, middlewareData: R } = um({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: N,
      whileElementsMounted: (..._) => tm(..._, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        pm({ mainAxis: o + k, alignmentAxis: i }),
        c && hm({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? mm() : void 0,
          ...P
        }),
        c && gm({ ...P }),
        ym({
          ...P,
          apply: ({ elements: _, rects: ee, availableWidth: ne, availableHeight: ue }) => {
            const { width: ve, height: be } = ee.reference, Ue = _.floating.style;
            Ue.setProperty("--radix-popper-available-width", `${ne}px`), Ue.setProperty("--radix-popper-available-height", `${ue}px`), Ue.setProperty("--radix-popper-anchor-width", `${ve}px`), Ue.setProperty("--radix-popper-anchor-height", `${be}px`);
          }
        }),
        T && bm({ element: T, padding: a }),
        Dm({ arrowWidth: S, arrowHeight: k }),
        f && vm({ strategy: "referenceHidden", ...P })
      ]
    }), [A, H] = fl(W), G = gt(g);
    Dt(() => {
      V && G?.();
    }, [V, G]);
    const z = R.arrow?.x, U = R.arrow?.y, K = R.arrow?.centerOffset !== 0, [B, J] = M.useState();
    return Dt(() => {
      b && J(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ h(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: V ? $.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: B,
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
        children: /* @__PURE__ */ h(
          Em,
          {
            scope: n,
            placedSide: A,
            onArrowChange: w,
            arrowX: z,
            arrowY: U,
            shouldHideArrow: K,
            children: /* @__PURE__ */ h(
              Le.div,
              {
                "data-side": A,
                "data-align": H,
                ...m,
                ref: x,
                style: {
                  ...m.style,
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
ll.displayName = la;
var dl = "PopperArrow", Tm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ul = M.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Mm(dl, r), i = Tm[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ h(
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
        children: /* @__PURE__ */ h(
          xm,
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
ul.displayName = dl;
function Sm(e) {
  return e !== null;
}
var Dm = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, d] = fl(n), u = { start: "0%", center: "50%", end: "100%" }[d], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let g = "", m = "";
    return l === "bottom" ? (g = i ? u : `${f}px`, m = `${-c}px`) : l === "top" ? (g = i ? u : `${f}px`, m = `${r.floating.height + c}px`) : l === "right" ? (g = `${-c}px`, m = i ? u : `${p}px`) : l === "left" && (g = `${r.floating.width + c}px`, m = i ? u : `${p}px`), { data: { x: g, y: m } };
  }
});
function fl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var pl = al, hl = cl, ml = ll, gl = ul, Nm = "Portal", da = M.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = M.useState(!1);
  Dt(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? Gf.createPortal(/* @__PURE__ */ h(Le.div, { ...r, ref: t }), i) : null;
});
da.displayName = Nm;
function Lm(e, t) {
  return M.useReducer((n, r) => t[n][r] ?? n, e);
}
var Vt = (e) => {
  const { present: t, children: n } = e, r = Am(t), o = typeof n == "function" ? n({ present: r.isPresent }) : M.Children.only(n), s = Ie(r.ref, Im(o));
  return typeof n == "function" || r.isPresent ? M.cloneElement(o, { ref: s }) : null;
};
Vt.displayName = "Presence";
function Am(e) {
  const [t, n] = M.useState(), r = M.useRef(null), o = M.useRef(e), s = M.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = Lm(i, {
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
  return M.useEffect(() => {
    const l = Pr(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), Dt(() => {
    const l = r.current, d = o.current;
    if (d !== e) {
      const f = s.current, p = Pr(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(d && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Dt(() => {
    if (t) {
      let l;
      const d = t.ownerDocument.defaultView ?? window, u = (p) => {
        const m = Pr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && m && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Pr(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        d.clearTimeout(l), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: M.useCallback((l) => {
      r.current = l ? getComputedStyle(l) : null, n(l);
    }, [])
  };
}
function Pr(e) {
  return e?.animationName || "none";
}
function Im(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Zo = "rovingFocusGroup.onEntryFocus", Rm = { bubbles: !1, cancelable: !0 }, rr = "RovingFocusGroup", [Es, yl, Pm] = Wc(rr), [Om, vl] = Cn(
  rr,
  [Pm]
), [_m, $m] = Om(rr), bl = M.forwardRef(
  (e, t) => /* @__PURE__ */ h(Es.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(Es.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(Hm, { ...e, ref: t }) }) })
);
bl.displayName = rr;
var Hm = M.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: i,
    defaultCurrentTabStopId: a,
    onCurrentTabStopIdChange: c,
    onEntryFocus: l,
    preventScrollOnEntryFocus: d = !1,
    ...u
  } = e, f = M.useRef(null), p = Ie(t, f), g = zc(s), [m, y] = ea({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: rr
  }), [b, v] = M.useState(!1), x = gt(l), T = yl(n), w = M.useRef(!1), [E, S] = M.useState(0);
  return M.useEffect(() => {
    const k = f.current;
    if (k)
      return k.addEventListener(Zo, x), () => k.removeEventListener(Zo, x);
  }, [x]), /* @__PURE__ */ h(
    _m,
    {
      scope: n,
      orientation: r,
      dir: g,
      loop: o,
      currentTabStopId: m,
      onItemFocus: M.useCallback(
        (k) => y(k),
        [y]
      ),
      onItemShiftTab: M.useCallback(() => v(!0), []),
      onFocusableItemAdd: M.useCallback(
        () => S((k) => k + 1),
        []
      ),
      onFocusableItemRemove: M.useCallback(
        () => S((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ h(
        Le.div,
        {
          tabIndex: b || E === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: ie(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: ie(e.onFocus, (k) => {
            const N = !w.current;
            if (k.target === k.currentTarget && N && !b) {
              const C = new CustomEvent(Zo, Rm);
              if (k.currentTarget.dispatchEvent(C), !C.defaultPrevented) {
                const D = T().filter((W) => W.focusable), L = D.find((W) => W.active), P = D.find((W) => W.id === m), $ = [L, P, ...D].filter(
                  Boolean
                ).map((W) => W.ref.current);
                kl($, d);
              }
            }
            w.current = !1;
          }),
          onBlur: ie(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), wl = "RovingFocusGroupItem", xl = M.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = to(), l = s || c, d = $m(wl, n), u = d.currentTabStopId === l, f = yl(n), { onFocusableItemAdd: p, onFocusableItemRemove: g, currentTabStopId: m } = d;
    return M.useEffect(() => {
      if (r)
        return p(), () => g();
    }, [r, p, g]), /* @__PURE__ */ h(
      Es.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ h(
          Le.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...a,
            ref: t,
            onMouseDown: ie(e.onMouseDown, (y) => {
              r ? d.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: ie(e.onFocus, () => d.onItemFocus(l)),
            onKeyDown: ie(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const b = zm(y, d.orientation, d.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let x = f().filter((T) => T.focusable).map((T) => T.ref.current);
                if (b === "last") x.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && x.reverse();
                  const T = x.indexOf(y.currentTarget);
                  x = d.loop ? Fm(x, T + 1) : x.slice(T + 1);
                }
                setTimeout(() => kl(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: m != null }) : i
          }
        )
      }
    );
  }
);
xl.displayName = wl;
var Bm = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Wm(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function zm(e, t, n) {
  const r = Wm(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Bm[r];
}
function kl(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Fm(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Um = bl, Ym = xl, jm = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, nn = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap(), _r = {}, Qo = 0, Cl = function(e) {
  return e && (e.host || Cl(e.parentNode));
}, Vm = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Cl(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Km = function(e, t, n, r) {
  var o = Vm(t, Array.isArray(e) ? e : [e]);
  _r[n] || (_r[n] = /* @__PURE__ */ new WeakMap());
  var s = _r[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(u) {
    !u || a.has(u) || (a.add(u), l(u.parentNode));
  };
  o.forEach(l);
  var d = function(u) {
    !u || c.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (a.has(f))
        d(f);
      else
        try {
          var p = f.getAttribute(r), g = p !== null && p !== "false", m = (nn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          nn.set(f, m), s.set(f, y), i.push(f), m === 1 && g && Or.set(f, !0), y === 1 && f.setAttribute(n, "true"), g || f.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(t), a.clear(), Qo++, function() {
    i.forEach(function(u) {
      var f = nn.get(u) - 1, p = s.get(u) - 1;
      nn.set(u, f), s.set(u, p), f || (Or.has(u) || u.removeAttribute(r), Or.delete(u)), p || u.removeAttribute(n);
    }), Qo--, Qo || (nn = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap(), _r = {});
  };
}, Gm = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = jm(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Km(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, nt = function() {
  return nt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, nt.apply(this, arguments);
};
function El(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function qm(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Xr = "right-scroll-bar-position", Zr = "width-before-scroll-bar", Xm = "with-scroll-bars-hidden", Zm = "--removed-body-scroll-bar-size";
function Jo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Qm(e, t) {
  var n = j(function() {
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
var Jm = typeof window < "u" ? M.useLayoutEffect : M.useEffect, xi = /* @__PURE__ */ new WeakMap();
function eg(e, t) {
  var n = Qm(null, function(r) {
    return e.forEach(function(o) {
      return Jo(o, r);
    });
  });
  return Jm(function() {
    var r = xi.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Jo(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Jo(a, i);
      });
    }
    xi.set(n, e);
  }, [e]), n;
}
function tg(e) {
  return e;
}
function ng(e, t) {
  t === void 0 && (t = tg);
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
        var d = i;
        i = [], d.forEach(s);
      }, l = function() {
        return Promise.resolve().then(c);
      };
      l(), n = {
        push: function(d) {
          i.push(d), l();
        },
        filter: function(d) {
          return i = i.filter(d), n;
        }
      };
    }
  };
  return o;
}
function rg(e) {
  e === void 0 && (e = {});
  var t = ng(null);
  return t.options = nt({ async: !0, ssr: !1 }, e), t;
}
var Ml = function(e) {
  var t = e.sideCar, n = El(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return M.createElement(r, nt({}, n));
};
Ml.isSideCarExport = !0;
function og(e, t) {
  return e.useMedium(t), Ml;
}
var Tl = rg(), es = function() {
}, Eo = M.forwardRef(function(e, t) {
  var n = M.useRef(null), r = M.useState({
    onScrollCapture: es,
    onWheelCapture: es,
    onTouchMoveCapture: es
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, u = e.shards, f = e.sideCar, p = e.noRelative, g = e.noIsolation, m = e.inert, y = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, x = e.gapMode, T = El(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, E = eg([n, t]), S = nt(nt({}, T), o);
  return M.createElement(
    M.Fragment,
    null,
    d && M.createElement(w, { sideCar: Tl, removeScrollBar: l, shards: u, noRelative: p, noIsolation: g, inert: m, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: x }),
    i ? M.cloneElement(M.Children.only(a), nt(nt({}, S), { ref: E })) : M.createElement(v, nt({}, S, { className: c, ref: E }), a)
  );
});
Eo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Eo.classNames = {
  fullWidth: Zr,
  zeroRight: Xr
};
var sg = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function ag() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = sg();
  return t && e.setAttribute("nonce", t), e;
}
function ig(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function cg(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var lg = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = ag()) && (ig(t, n), cg(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, dg = function() {
  var e = lg();
  return function(t, n) {
    M.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Sl = function() {
  var e = dg(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, ug = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ts = function(e) {
  return parseInt(e || "", 10) || 0;
}, fg = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ts(n), ts(r), ts(o)];
}, pg = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return ug;
  var t = fg(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, hg = Sl(), pn = "data-scroll-locked", mg = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Xm, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(pn, `] {
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
  
  .`).concat(Xr, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Zr, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Xr, " .").concat(Xr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Zr, " .").concat(Zr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(pn, `] {
    `).concat(Zm, ": ").concat(a, `px;
  }
`);
}, ki = function() {
  var e = parseInt(document.body.getAttribute(pn) || "0", 10);
  return isFinite(e) ? e : 0;
}, gg = function() {
  M.useEffect(function() {
    return document.body.setAttribute(pn, (ki() + 1).toString()), function() {
      var e = ki() - 1;
      e <= 0 ? document.body.removeAttribute(pn) : document.body.setAttribute(pn, e.toString());
    };
  }, []);
}, yg = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  gg();
  var s = M.useMemo(function() {
    return pg(o);
  }, [o]);
  return M.createElement(hg, { styles: mg(s, !t, o, n ? "" : "!important") });
}, Ms = !1;
if (typeof window < "u")
  try {
    var $r = Object.defineProperty({}, "passive", {
      get: function() {
        return Ms = !0, !0;
      }
    });
    window.addEventListener("test", $r, $r), window.removeEventListener("test", $r, $r);
  } catch {
    Ms = !1;
  }
var rn = Ms ? { passive: !1 } : !1, vg = function(e) {
  return e.tagName === "TEXTAREA";
}, Dl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !vg(e) && n[t] === "visible")
  );
}, bg = function(e) {
  return Dl(e, "overflowY");
}, wg = function(e) {
  return Dl(e, "overflowX");
}, Ci = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Nl(e, r);
    if (o) {
      var s = Ll(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, xg = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, kg = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Nl = function(e, t) {
  return e === "v" ? bg(t) : wg(t);
}, Ll = function(e, t) {
  return e === "v" ? xg(t) : kg(t);
}, Cg = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Eg = function(e, t, n, r, o) {
  var s = Cg(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, d = i > 0, u = 0, f = 0;
  do {
    if (!a)
      break;
    var p = Ll(e, a), g = p[0], m = p[1], y = p[2], b = m - y - s * g;
    (g || b) && Nl(e, a) && (u += b, f += g);
    var v = a.parentNode;
    a = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(f) < 1) && (l = !0), l;
}, Hr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ei = function(e) {
  return [e.deltaX, e.deltaY];
}, Mi = function(e) {
  return e && "current" in e ? e.current : e;
}, Mg = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Tg = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Sg = 0, on = [];
function Dg(e) {
  var t = M.useRef([]), n = M.useRef([0, 0]), r = M.useRef(), o = M.useState(Sg++)[0], s = M.useState(Sl)[0], i = M.useRef(e);
  M.useEffect(function() {
    i.current = e;
  }, [e]), M.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = qm([e.lockRef.current], (e.shards || []).map(Mi), !0).filter(Boolean);
      return m.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = M.useCallback(function(m, y) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !i.current.allowPinchZoom;
    var b = Hr(m), v = n.current, x = "deltaX" in m ? m.deltaX : v[0] - b[0], T = "deltaY" in m ? m.deltaY : v[1] - b[1], w, E = m.target, S = Math.abs(x) > Math.abs(T) ? "h" : "v";
    if ("touches" in m && S === "h" && E.type === "range")
      return !1;
    var k = Ci(S, E);
    if (!k)
      return !0;
    if (k ? w = S : (w = S === "v" ? "h" : "v", k = Ci(S, E)), !k)
      return !1;
    if (!r.current && "changedTouches" in m && (x || T) && (r.current = w), !w)
      return !0;
    var N = r.current || w;
    return Eg(N, y, m, N === "h" ? x : T);
  }, []), c = M.useCallback(function(m) {
    var y = m;
    if (!(!on.length || on[on.length - 1] !== s)) {
      var b = "deltaY" in y ? Ei(y) : Hr(y), v = t.current.filter(function(w) {
        return w.name === y.type && (w.target === y.target || y.target === w.shadowParent) && Mg(w.delta, b);
      })[0];
      if (v && v.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!v) {
        var x = (i.current.shards || []).map(Mi).filter(Boolean).filter(function(w) {
          return w.contains(y.target);
        }), T = x.length > 0 ? a(y, x[0]) : !i.current.noIsolation;
        T && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = M.useCallback(function(m, y, b, v) {
    var x = { name: m, delta: y, target: b, should: v, shadowParent: Ng(b) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(T) {
        return T !== x;
      });
    }, 1);
  }, []), d = M.useCallback(function(m) {
    n.current = Hr(m), r.current = void 0;
  }, []), u = M.useCallback(function(m) {
    l(m.type, Ei(m), m.target, a(m, e.lockRef.current));
  }, []), f = M.useCallback(function(m) {
    l(m.type, Hr(m), m.target, a(m, e.lockRef.current));
  }, []);
  M.useEffect(function() {
    return on.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, rn), document.addEventListener("touchmove", c, rn), document.addEventListener("touchstart", d, rn), function() {
      on = on.filter(function(m) {
        return m !== s;
      }), document.removeEventListener("wheel", c, rn), document.removeEventListener("touchmove", c, rn), document.removeEventListener("touchstart", d, rn);
    };
  }, []);
  var p = e.removeScrollBar, g = e.inert;
  return M.createElement(
    M.Fragment,
    null,
    g ? M.createElement(s, { styles: Tg(o) }) : null,
    p ? M.createElement(yg, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Ng(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Lg = og(Tl, Dg);
var Al = M.forwardRef(function(e, t) {
  return M.createElement(Eo, nt({}, e, { ref: t, sideCar: Lg }));
});
Al.classNames = Eo.classNames;
var Ts = ["Enter", " "], Ag = ["ArrowDown", "PageUp", "Home"], Il = ["ArrowUp", "PageDown", "End"], Ig = [...Ag, ...Il], Rg = {
  ltr: [...Ts, "ArrowRight"],
  rtl: [...Ts, "ArrowLeft"]
}, Pg = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, or = "Menu", [Xn, Og, _g] = Wc(or), [Kt, Rl] = Cn(or, [
  _g,
  Co,
  vl
]), Mo = Co(), Pl = vl(), [$g, Gt] = Kt(or), [Hg, sr] = Kt(or), Ol = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Mo(t), [c, l] = M.useState(null), d = M.useRef(!1), u = gt(s), f = zc(o);
  return M.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ h(pl, { ...a, children: /* @__PURE__ */ h(
    $g,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ h(
        Hg,
        {
          scope: t,
          onClose: M.useCallback(() => u(!1), [u]),
          isUsingKeyboardRef: d,
          dir: f,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
Ol.displayName = or;
var Bg = "MenuAnchor", ua = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Mo(n);
    return /* @__PURE__ */ h(hl, { ...o, ...r, ref: t });
  }
);
ua.displayName = Bg;
var fa = "MenuPortal", [Wg, _l] = Kt(fa, {
  forceMount: void 0
}), $l = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = Gt(fa, t);
  return /* @__PURE__ */ h(Wg, { scope: t, forceMount: n, children: /* @__PURE__ */ h(Vt, { present: n || s.open, children: /* @__PURE__ */ h(da, { asChild: !0, container: o, children: r }) }) });
};
$l.displayName = fa;
var Ge = "MenuContent", [zg, pa] = Kt(Ge), Hl = M.forwardRef(
  (e, t) => {
    const n = _l(Ge, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Gt(Ge, e.__scopeMenu), i = sr(Ge, e.__scopeMenu);
    return /* @__PURE__ */ h(Xn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(Vt, { present: r || s.open, children: /* @__PURE__ */ h(Xn.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ h(Fg, { ...o, ref: t }) : /* @__PURE__ */ h(Ug, { ...o, ref: t }) }) }) });
  }
), Fg = M.forwardRef(
  (e, t) => {
    const n = Gt(Ge, e.__scopeMenu), r = M.useRef(null), o = Ie(t, r);
    return M.useEffect(() => {
      const s = r.current;
      if (s) return Gm(s);
    }, []), /* @__PURE__ */ h(
      ha,
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
), Ug = M.forwardRef((e, t) => {
  const n = Gt(Ge, e.__scopeMenu);
  return /* @__PURE__ */ h(
    ha,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Yg = /* @__PURE__ */ Kn("MenuContent.ScrollLock"), ha = M.forwardRef(
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
      onPointerDownOutside: d,
      onFocusOutside: u,
      onInteractOutside: f,
      onDismiss: p,
      disableOutsideScroll: g,
      ...m
    } = e, y = Gt(Ge, n), b = sr(Ge, n), v = Mo(n), x = Pl(n), T = Og(n), [w, E] = M.useState(null), S = M.useRef(null), k = Ie(t, S, y.onContentChange), N = M.useRef(0), C = M.useRef(""), D = M.useRef(0), L = M.useRef(null), P = M.useRef("right"), O = M.useRef(0), $ = g ? Al : M.Fragment, W = g ? { as: Yg, allowPinchZoom: !0 } : void 0, V = (A) => {
      const H = C.current + A, G = T().filter((_) => !_.disabled), z = document.activeElement, U = G.find((_) => _.ref.current === z)?.textValue, K = G.map((_) => _.textValue), B = ny(K, H, U), J = G.find((_) => _.textValue === B)?.ref.current;
      (function _(ee) {
        C.current = ee, window.clearTimeout(N.current), ee !== "" && (N.current = window.setTimeout(() => _(""), 1e3));
      })(H), J && setTimeout(() => J.focus());
    };
    M.useEffect(() => () => window.clearTimeout(N.current), []), eh();
    const R = M.useCallback((A) => P.current === L.current?.side && oy(A, L.current?.area), []);
    return /* @__PURE__ */ h(
      zg,
      {
        scope: n,
        searchRef: C,
        onItemEnter: M.useCallback(
          (A) => {
            R(A) && A.preventDefault();
          },
          [R]
        ),
        onItemLeave: M.useCallback(
          (A) => {
            R(A) || (S.current?.focus(), E(null));
          },
          [R]
        ),
        onTriggerLeave: M.useCallback(
          (A) => {
            R(A) && A.preventDefault();
          },
          [R]
        ),
        pointerGraceTimerRef: D,
        onPointerGraceIntentChange: M.useCallback((A) => {
          L.current = A;
        }, []),
        children: /* @__PURE__ */ h($, { ...W, children: /* @__PURE__ */ h(
          Yc,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: ie(s, (A) => {
              A.preventDefault(), S.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ h(
              ta,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: d,
                onFocusOutside: u,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ h(
                  Um,
                  {
                    asChild: !0,
                    ...x,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: E,
                    onEntryFocus: ie(c, (A) => {
                      b.isUsingKeyboardRef.current || A.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ h(
                      ml,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": ed(y.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...m,
                        ref: k,
                        style: { outline: "none", ...m.style },
                        onKeyDown: ie(m.onKeyDown, (A) => {
                          const G = A.target.closest("[data-radix-menu-content]") === A.currentTarget, z = A.ctrlKey || A.altKey || A.metaKey, U = A.key.length === 1;
                          G && (A.key === "Tab" && A.preventDefault(), !z && U && V(A.key));
                          const K = S.current;
                          if (A.target !== K || !Ig.includes(A.key)) return;
                          A.preventDefault();
                          const J = T().filter((_) => !_.disabled).map((_) => _.ref.current);
                          Il.includes(A.key) && J.reverse(), ey(J);
                        }),
                        onBlur: ie(e.onBlur, (A) => {
                          A.currentTarget.contains(A.target) || (window.clearTimeout(N.current), C.current = "");
                        }),
                        onPointerMove: ie(
                          e.onPointerMove,
                          Zn((A) => {
                            const H = A.target, G = O.current !== A.clientX;
                            if (A.currentTarget.contains(H) && G) {
                              const z = A.clientX > O.current ? "right" : "left";
                              P.current = z, O.current = A.clientX;
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
Hl.displayName = Ge;
var jg = "MenuGroup", ma = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(Le.div, { role: "group", ...r, ref: t });
  }
);
ma.displayName = jg;
var Vg = "MenuLabel", Bl = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(Le.div, { ...r, ref: t });
  }
);
Bl.displayName = Vg;
var ao = "MenuItem", Ti = "menu.itemSelect", To = M.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = M.useRef(null), i = sr(ao, e.__scopeMenu), a = pa(ao, e.__scopeMenu), c = Ie(t, s), l = M.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const f = new CustomEvent(Ti, { bubbles: !0, cancelable: !0 });
        u.addEventListener(Ti, (p) => r?.(p), { once: !0 }), Bc(u, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ h(
      Wl,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: ie(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), l.current = !0;
        },
        onPointerUp: ie(e.onPointerUp, (u) => {
          l.current || u.currentTarget?.click();
        }),
        onKeyDown: ie(e.onKeyDown, (u) => {
          const f = a.searchRef.current !== "";
          n || f && u.key === " " || Ts.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
To.displayName = ao;
var Wl = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = pa(ao, n), a = Pl(n), c = M.useRef(null), l = Ie(t, c), [d, u] = M.useState(!1), [f, p] = M.useState("");
    return M.useEffect(() => {
      const g = c.current;
      g && p((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ h(
      Xn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ h(Ym, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ h(
          Le.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: ie(
              e.onPointerMove,
              Zn((g) => {
                r ? i.onItemLeave(g) : (i.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ie(
              e.onPointerLeave,
              Zn((g) => i.onItemLeave(g))
            ),
            onFocus: ie(e.onFocus, () => u(!0)),
            onBlur: ie(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), Kg = "MenuCheckboxItem", zl = M.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ h(Vl, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ h(
      To,
      {
        role: "menuitemcheckbox",
        "aria-checked": io(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ya(n),
        onSelect: ie(
          o.onSelect,
          () => r?.(io(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
zl.displayName = Kg;
var Fl = "MenuRadioGroup", [Gg, qg] = Kt(
  Fl,
  { value: void 0, onValueChange: () => {
  } }
), Ul = M.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = gt(r);
    return /* @__PURE__ */ h(Gg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ h(ma, { ...o, ref: t }) });
  }
);
Ul.displayName = Fl;
var Yl = "MenuRadioItem", jl = M.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = qg(Yl, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ h(Vl, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ h(
      To,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": ya(s),
        onSelect: ie(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
jl.displayName = Yl;
var ga = "MenuItemIndicator", [Vl, Xg] = Kt(
  ga,
  { checked: !1 }
), Kl = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = Xg(ga, n);
    return /* @__PURE__ */ h(
      Vt,
      {
        present: r || io(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ h(
          Le.span,
          {
            ...o,
            ref: t,
            "data-state": ya(s.checked)
          }
        )
      }
    );
  }
);
Kl.displayName = ga;
var Zg = "MenuSeparator", Gl = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(
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
Gl.displayName = Zg;
var Qg = "MenuArrow", ql = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Mo(n);
    return /* @__PURE__ */ h(gl, { ...o, ...r, ref: t });
  }
);
ql.displayName = Qg;
var Jg = "MenuSub", [rE, Xl] = Kt(Jg), Wn = "MenuSubTrigger", Zl = M.forwardRef(
  (e, t) => {
    const n = Gt(Wn, e.__scopeMenu), r = sr(Wn, e.__scopeMenu), o = Xl(Wn, e.__scopeMenu), s = pa(Wn, e.__scopeMenu), i = M.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, d = M.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return M.useEffect(() => d, [d]), M.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), c(null);
      };
    }, [a, c]), /* @__PURE__ */ h(ua, { asChild: !0, ...l, children: /* @__PURE__ */ h(
      Wl,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": ed(n.open),
        ...e,
        ref: vo(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ie(
          e.onPointerMove,
          Zn((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: ie(
          e.onPointerLeave,
          Zn((u) => {
            d();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, g = p === "right", m = g ? -5 : 5, y = f[g ? "left" : "right"], b = f[g ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: u.clientX + m, y: u.clientY },
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
              if (s.onTriggerLeave(u), u.defaultPrevented) return;
              s.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: ie(e.onKeyDown, (u) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && u.key === " " || Rg[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Zl.displayName = Wn;
var Ql = "MenuSubContent", Jl = M.forwardRef(
  (e, t) => {
    const n = _l(Ge, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Gt(Ge, e.__scopeMenu), i = sr(Ge, e.__scopeMenu), a = Xl(Ql, e.__scopeMenu), c = M.useRef(null), l = Ie(t, c);
    return /* @__PURE__ */ h(Xn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(Vt, { present: r || s.open, children: /* @__PURE__ */ h(Xn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(
      ha,
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
        onOpenAutoFocus: (d) => {
          i.isUsingKeyboardRef.current && c.current?.focus(), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: ie(e.onFocusOutside, (d) => {
          d.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: ie(e.onEscapeKeyDown, (d) => {
          i.onClose(), d.preventDefault();
        }),
        onKeyDown: ie(e.onKeyDown, (d) => {
          const u = d.currentTarget.contains(d.target), f = Pg[i.dir].includes(d.key);
          u && f && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
Jl.displayName = Ql;
function ed(e) {
  return e ? "open" : "closed";
}
function io(e) {
  return e === "indeterminate";
}
function ya(e) {
  return io(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function ey(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function ty(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function ny(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = ty(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function ry(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function oy(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return ry(n, t);
}
function Zn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var sy = Ol, ay = ua, iy = $l, cy = Hl, ly = ma, dy = Bl, uy = To, fy = zl, py = Ul, hy = jl, my = Kl, gy = Gl, yy = ql, vy = Zl, by = Jl, So = "DropdownMenu", [wy] = Cn(
  So,
  [Rl]
), Pe = Rl(), [xy, td] = wy(So), nd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = Pe(t), l = M.useRef(null), [d, u] = ea({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: So
  });
  return /* @__PURE__ */ h(
    xy,
    {
      scope: t,
      triggerId: to(),
      triggerRef: l,
      contentId: to(),
      open: d,
      onOpenChange: u,
      onOpenToggle: M.useCallback(() => u((f) => !f), [u]),
      modal: a,
      children: /* @__PURE__ */ h(sy, { ...c, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
nd.displayName = So;
var rd = "DropdownMenuTrigger", od = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = td(rd, n), i = Pe(n);
    return /* @__PURE__ */ h(ay, { asChild: !0, ...i, children: /* @__PURE__ */ h(
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
od.displayName = rd;
var ky = "DropdownMenuPortal", sd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Pe(t);
  return /* @__PURE__ */ h(iy, { ...r, ...n });
};
sd.displayName = ky;
var ad = "DropdownMenuContent", id = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = td(ad, n), s = Pe(n), i = M.useRef(!1);
    return /* @__PURE__ */ h(
      cy,
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
          const c = a.detail.originalEvent, l = c.button === 0 && c.ctrlKey === !0, d = c.button === 2 || l;
          (!o.modal || d) && (i.current = !0);
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
id.displayName = ad;
var Cy = "DropdownMenuGroup", Ey = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ h(ly, { ...o, ...r, ref: t });
  }
);
Ey.displayName = Cy;
var My = "DropdownMenuLabel", Ty = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ h(dy, { ...o, ...r, ref: t });
  }
);
Ty.displayName = My;
var Sy = "DropdownMenuItem", cd = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ h(uy, { ...o, ...r, ref: t });
  }
);
cd.displayName = Sy;
var Dy = "DropdownMenuCheckboxItem", Ny = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ h(fy, { ...o, ...r, ref: t });
});
Ny.displayName = Dy;
var Ly = "DropdownMenuRadioGroup", Ay = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ h(py, { ...o, ...r, ref: t });
});
Ay.displayName = Ly;
var Iy = "DropdownMenuRadioItem", Ry = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ h(hy, { ...o, ...r, ref: t });
});
Ry.displayName = Iy;
var Py = "DropdownMenuItemIndicator", Oy = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ h(my, { ...o, ...r, ref: t });
});
Oy.displayName = Py;
var _y = "DropdownMenuSeparator", ld = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ h(gy, { ...o, ...r, ref: t });
});
ld.displayName = _y;
var $y = "DropdownMenuArrow", Hy = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ h(yy, { ...o, ...r, ref: t });
  }
);
Hy.displayName = $y;
var By = "DropdownMenuSubTrigger", Wy = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ h(vy, { ...o, ...r, ref: t });
});
Wy.displayName = By;
var zy = "DropdownMenuSubContent", Fy = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ h(
    by,
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
Fy.displayName = zy;
var Uy = nd, Yy = od, jy = sd, Vy = id, Ky = cd, Gy = ld;
function dd(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = dd(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function ud() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = dd(e)) && (r && (r += " "), r += t);
  return r;
}
const va = "-", qy = (e) => {
  const t = Zy(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(va);
      return a[0] === "" && a.length !== 1 && a.shift(), fd(a, t) || Xy(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, fd = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? fd(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(va);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Si = /^\[(.+)\]$/, Xy = (e) => {
  if (Si.test(e)) {
    const t = Si.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Zy = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Ss(n[o], r, o, t);
  return r;
}, Ss = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Di(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Qy(o)) {
        Ss(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Ss(i, Di(t, s), n, r);
    });
  });
}, Di = (e, t) => {
  let n = e;
  return t.split(va).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Qy = (e) => e.isThemeGetter, Jy = (e) => {
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
}, Ds = "!", Ns = ":", ev = Ns.length, tv = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let i = 0, a = 0, c = 0, l;
    for (let g = 0; g < o.length; g++) {
      let m = o[g];
      if (i === 0 && a === 0) {
        if (m === Ns) {
          s.push(o.slice(c, g)), c = g + ev;
          continue;
        }
        if (m === "/") {
          l = g;
          continue;
        }
      }
      m === "[" ? i++ : m === "]" ? i-- : m === "(" ? a++ : m === ")" && a--;
    }
    const d = s.length === 0 ? o : o.substring(c), u = nv(d), f = u !== d, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: u,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + Ns, s = r;
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
}, nv = (e) => e.endsWith(Ds) ? e.substring(0, e.length - 1) : e.startsWith(Ds) ? e.substring(1) : e, rv = (e) => {
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
}, ov = (e) => ({
  cache: Jy(e.cacheSize),
  parseClassName: tv(e),
  sortModifiers: rv(e),
  ...qy(e)
}), sv = /\s+/, av = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(sv);
  let c = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const d = a[l], {
      isExternal: u,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: g,
      maybePostfixModifierPosition: m
    } = n(d);
    if (u) {
      c = d + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!m, b = r(y ? g.substring(0, m) : g);
    if (!b) {
      if (!y) {
        c = d + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (b = r(g), !b) {
        c = d + (c.length > 0 ? " " + c : c);
        continue;
      }
      y = !1;
    }
    const v = s(f).join(":"), x = p ? v + Ds : v, T = x + b;
    if (i.includes(T))
      continue;
    i.push(T);
    const w = o(b, y);
    for (let E = 0; E < w.length; ++E) {
      const S = w[E];
      i.push(x + S);
    }
    c = d + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function iv() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = pd(t)) && (r && (r += " "), r += n);
  return r;
}
const pd = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = pd(e[r])) && (n && (n += " "), n += t);
  return n;
};
function cv(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((d, u) => u(d), e());
    return n = ov(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const d = av(c, n);
    return o(c, d), d;
  }
  return function() {
    return s(iv.apply(null, arguments));
  };
}
const Ee = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, hd = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, md = /^\((?:(\w[\w-]*):)?(.+)\)$/i, lv = /^\d+\/\d+$/, dv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, uv = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, fv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, pv = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, hv = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, sn = (e) => lv.test(e), le = (e) => !!e && !Number.isNaN(Number(e)), Ct = (e) => !!e && Number.isInteger(Number(e)), ns = (e) => e.endsWith("%") && le(e.slice(0, -1)), lt = (e) => dv.test(e), mv = () => !0, gv = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  uv.test(e) && !fv.test(e)
), gd = () => !1, yv = (e) => pv.test(e), vv = (e) => hv.test(e), bv = (e) => !Z(e) && !Q(e), wv = (e) => Tn(e, bd, gd), Z = (e) => hd.test(e), Ot = (e) => Tn(e, wd, gv), rs = (e) => Tn(e, Mv, le), Ni = (e) => Tn(e, yd, gd), xv = (e) => Tn(e, vd, vv), Br = (e) => Tn(e, xd, yv), Q = (e) => md.test(e), _n = (e) => Sn(e, wd), kv = (e) => Sn(e, Tv), Li = (e) => Sn(e, yd), Cv = (e) => Sn(e, bd), Ev = (e) => Sn(e, vd), Wr = (e) => Sn(e, xd, !0), Tn = (e, t, n) => {
  const r = hd.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Sn = (e, t, n = !1) => {
  const r = md.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, yd = (e) => e === "position" || e === "percentage", vd = (e) => e === "image" || e === "url", bd = (e) => e === "length" || e === "size" || e === "bg-size", wd = (e) => e === "length", Mv = (e) => e === "number", Tv = (e) => e === "family-name", xd = (e) => e === "shadow", Sv = () => {
  const e = Ee("color"), t = Ee("font"), n = Ee("text"), r = Ee("font-weight"), o = Ee("tracking"), s = Ee("leading"), i = Ee("breakpoint"), a = Ee("container"), c = Ee("spacing"), l = Ee("radius"), d = Ee("shadow"), u = Ee("inset-shadow"), f = Ee("text-shadow"), p = Ee("drop-shadow"), g = Ee("blur"), m = Ee("perspective"), y = Ee("aspect"), b = Ee("ease"), v = Ee("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => [
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
  ], w = () => [...T(), Q, Z], E = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], k = () => [Q, Z, c], N = () => [sn, "full", "auto", ...k()], C = () => [Ct, "none", "subgrid", Q, Z], D = () => ["auto", {
    span: ["full", Ct, Q, Z]
  }, Ct, Q, Z], L = () => [Ct, "auto", Q, Z], P = () => ["auto", "min", "max", "fr", Q, Z], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...k()], V = () => [sn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], R = () => [e, Q, Z], A = () => [...T(), Li, Ni, {
    position: [Q, Z]
  }], H = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], G = () => ["auto", "cover", "contain", Cv, wv, {
    size: [Q, Z]
  }], z = () => [ns, _n, Ot], U = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    Q,
    Z
  ], K = () => ["", le, _n, Ot], B = () => ["solid", "dashed", "dotted", "double"], J = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], _ = () => [le, ns, Li, Ni], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    Q,
    Z
  ], ne = () => ["none", le, Q, Z], ue = () => ["none", le, Q, Z], ve = () => [le, Q, Z], be = () => [sn, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [lt],
      breakpoint: [lt],
      color: [mv],
      container: [lt],
      "drop-shadow": [lt],
      ease: ["in", "out", "in-out"],
      font: [bv],
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
        aspect: ["auto", "square", sn, Z, Q, y]
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
        overflow: E()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": E()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": E()
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
        z: [Ct, "auto", Q, Z]
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
        flex: [le, sn, "auto", "initial", "none", Z]
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
        order: [Ct, "first", "last", "none", Q, Z]
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
        text: ["base", n, _n, Ot]
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
        font: [kv, Z, t]
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
        decoration: [...B(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [le, "from-font", "auto", Q, Ot]
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
        bg: A()
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
        bg: G()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ct, Q, Z],
          radial: ["", Q, Z],
          conic: [Ct, Q, Z]
        }, Ev, xv]
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
        from: z()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: z()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: z()
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
        rounded: U()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": U()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": U()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": U()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": U()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": U()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": U()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": U()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": U()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": U()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": U()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": U()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": U()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": U()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": U()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: K()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": K()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": K()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": K()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": K()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": K()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": K()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": K()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": K()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": K()
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
        "divide-y": K()
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
        outline: [...B(), "none", "hidden"]
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
        outline: ["", le, _n, Ot]
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
          d,
          Wr,
          Br
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
        "inset-shadow": ["none", u, Wr, Br]
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
        ring: K()
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
        "ring-offset": [le, Ot]
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
        "inset-ring": K()
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
        "text-shadow": ["none", f, Wr, Br]
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
        "mask-radial-at": T()
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
        mask: A()
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
        mask: G()
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
          Wr,
          Br
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
        perspective: [m, Q, Z]
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
        stroke: [le, _n, Ot, rs]
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
}, Dv = /* @__PURE__ */ cv(Sv);
function ae(...e) {
  return Dv(ud(e));
}
function os({
  ...e
}) {
  return /* @__PURE__ */ h(Uy, { "data-slot": "dropdown-menu", ...e });
}
function ss({
  ...e
}) {
  return /* @__PURE__ */ h(
    Yy,
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
  return /* @__PURE__ */ h(jy, { children: /* @__PURE__ */ h(
    Vy,
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
  return /* @__PURE__ */ h(
    Ky,
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
  return /* @__PURE__ */ h(
    Gy,
    {
      "data-slot": "dropdown-menu-separator",
      className: ae("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
const Ai = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ii = ud, Nv = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Ii(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const d = n?.[l], u = s?.[l];
    if (d === null) return null;
    const f = Ai(d) || Ai(u);
    return o[l][f];
  }), a = n && Object.entries(n).reduce((l, d) => {
    let [u, f] = d;
    return f === void 0 || (l[u] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, d) => {
    let { class: u, className: f, ...p } = d;
    return Object.entries(p).every((g) => {
      let [m, y] = g;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...a
      }[m]) : {
        ...s,
        ...a
      }[m] === y;
    }) ? [
      ...l,
      u,
      f
    ] : l;
  }, []);
  return Ii(e, i, c, n?.class, n?.className);
}, Ls = Nv(
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
function Ut({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ h(
    r ? Hp : "button",
    {
      "data-slot": "button",
      className: ae(Ls({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
var Lv = Object.freeze({
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
}), Av = "VisuallyHidden", kd = M.forwardRef(
  (e, t) => /* @__PURE__ */ h(
    Le.span,
    {
      ...e,
      ref: t,
      style: { ...Lv, ...e.style }
    }
  )
);
kd.displayName = Av;
var Iv = kd, [Do] = Cn("Tooltip", [
  Co
]), No = Co(), Cd = "TooltipProvider", Rv = 700, As = "tooltip.open", [Pv, ba] = Do(Cd), Ed = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Rv,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = M.useRef(!0), a = M.useRef(!1), c = M.useRef(0);
  return M.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ h(
    Pv,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: n,
      onOpen: M.useCallback(() => {
        window.clearTimeout(c.current), i.current = !1;
      }, []),
      onClose: M.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => i.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: M.useCallback((l) => {
        a.current = l;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
Ed.displayName = Cd;
var Qn = "Tooltip", [Ov, ar] = Do(Qn), Md = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = ba(Qn, e.__scopeTooltip), l = No(t), [d, u] = M.useState(null), f = to(), p = M.useRef(0), g = i ?? c.disableHoverableContent, m = a ?? c.delayDuration, y = M.useRef(!1), [b, v] = ea({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (S) => {
      S ? (c.onOpen(), document.dispatchEvent(new CustomEvent(As))) : c.onClose(), s?.(S);
    },
    caller: Qn
  }), x = M.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), T = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, v(!0);
  }, [v]), w = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v(!1);
  }, [v]), E = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, v(!0), p.current = 0;
    }, m);
  }, [m, v]);
  return M.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ h(pl, { ...l, children: /* @__PURE__ */ h(
    Ov,
    {
      scope: t,
      contentId: f,
      open: b,
      stateAttribute: x,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: M.useCallback(() => {
        c.isOpenDelayedRef.current ? E() : T();
      }, [c.isOpenDelayedRef, E, T]),
      onTriggerLeave: M.useCallback(() => {
        g ? w() : (window.clearTimeout(p.current), p.current = 0);
      }, [w, g]),
      onOpen: T,
      onClose: w,
      disableHoverableContent: g,
      children: n
    }
  ) });
};
Md.displayName = Qn;
var Is = "TooltipTrigger", Td = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = ar(Is, n), s = ba(Is, n), i = No(n), a = M.useRef(null), c = Ie(t, a, o.onTriggerChange), l = M.useRef(!1), d = M.useRef(!1), u = M.useCallback(() => l.current = !1, []);
    return M.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ h(hl, { asChild: !0, ...i, children: /* @__PURE__ */ h(
      Le.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: ie(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: ie(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: ie(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", u, { once: !0 });
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
Td.displayName = Is;
var wa = "TooltipPortal", [_v, $v] = Do(wa, {
  forceMount: void 0
}), Sd = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = ar(wa, t);
  return /* @__PURE__ */ h(_v, { scope: t, forceMount: n, children: /* @__PURE__ */ h(Vt, { present: n || s.open, children: /* @__PURE__ */ h(da, { asChild: !0, container: o, children: r }) }) });
};
Sd.displayName = wa;
var vn = "TooltipContent", Dd = M.forwardRef(
  (e, t) => {
    const n = $v(vn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = ar(vn, e.__scopeTooltip);
    return /* @__PURE__ */ h(Vt, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ h(Nd, { side: o, ...s, ref: t }) : /* @__PURE__ */ h(Hv, { side: o, ...s, ref: t }) });
  }
), Hv = M.forwardRef((e, t) => {
  const n = ar(vn, e.__scopeTooltip), r = ba(vn, e.__scopeTooltip), o = M.useRef(null), s = Ie(t, o), [i, a] = M.useState(null), { trigger: c, onClose: l } = n, d = o.current, { onPointerInTransitChange: u } = r, f = M.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = M.useCallback(
    (g, m) => {
      const y = g.currentTarget, b = { x: g.clientX, y: g.clientY }, v = Fv(b, y.getBoundingClientRect()), x = Uv(b, v), T = Yv(m.getBoundingClientRect()), w = Vv([...x, ...T]);
      a(w), u(!0);
    },
    [u]
  );
  return M.useEffect(() => () => f(), [f]), M.useEffect(() => {
    if (c && d) {
      const g = (y) => p(y, d), m = (y) => p(y, c);
      return c.addEventListener("pointerleave", g), d.addEventListener("pointerleave", m), () => {
        c.removeEventListener("pointerleave", g), d.removeEventListener("pointerleave", m);
      };
    }
  }, [c, d, p, f]), M.useEffect(() => {
    if (i) {
      const g = (m) => {
        const y = m.target, b = { x: m.clientX, y: m.clientY }, v = c?.contains(y) || d?.contains(y), x = !jv(b, i);
        v ? f() : x && (f(), l());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [c, d, i, l, f]), /* @__PURE__ */ h(Nd, { ...e, ref: s });
}), [Bv, Wv] = Do(Qn, { isInside: !1 }), zv = /* @__PURE__ */ Wp("TooltipContent"), Nd = M.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = ar(vn, n), l = No(n), { onClose: d } = c;
    return M.useEffect(() => (document.addEventListener(As, d), () => document.removeEventListener(As, d)), [d]), M.useEffect(() => {
      if (c.trigger) {
        const u = (f) => {
          f.target?.contains(c.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [c.trigger, d]), /* @__PURE__ */ h(
      ta,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ I(
          ml,
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
              /* @__PURE__ */ h(zv, { children: r }),
              /* @__PURE__ */ h(Bv, { scope: n, isInside: !0, children: /* @__PURE__ */ h(Iv, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Dd.displayName = vn;
var Ld = "TooltipArrow", Ad = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = No(n);
    return Wv(
      Ld,
      n
    ).isInside ? null : /* @__PURE__ */ h(gl, { ...o, ...r, ref: t });
  }
);
Ad.displayName = Ld;
function Fv(e, t) {
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
function Uv(e, t, n = 5) {
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
function Yv(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function jv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function Vv(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Kv(t);
}
function Kv(e) {
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
var Gv = Ed, qv = Md, Xv = Td, Zv = Sd, Qv = Dd, Jv = Ad;
function eb({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ h(
    Gv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Id({
  ...e
}) {
  return /* @__PURE__ */ h(eb, { children: /* @__PURE__ */ h(qv, { "data-slot": "tooltip", ...e }) });
}
function Rd({
  ...e
}) {
  return /* @__PURE__ */ h(Xv, { "data-slot": "tooltip-trigger", ...e });
}
function Pd({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ h(Zv, { children: /* @__PURE__ */ I(
    Qv,
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
        /* @__PURE__ */ h(Jv, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const we = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
  const s = /* @__PURE__ */ h(
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
  return o ? /* @__PURE__ */ I(Id, { children: [
    /* @__PURE__ */ h(Rd, { asChild: !0, children: s }),
    /* @__PURE__ */ h(Pd, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, _t = () => /* @__PURE__ */ h("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), tb = bt(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = Y(null), [l, d] = j(!1), [u, f] = j(void 0), p = hc({
    editor: t,
    selector: ({ editor: E }) => ({
      canUndo: E.can().undo(),
      canRedo: E.can().redo(),
      isBold: E.isActive("bold"),
      isItalic: E.isActive("italic"),
      isUnderline: E.isActive("underline"),
      isStrike: E.isActive("strike"),
      isCode: E.isActive("code"),
      isHighlight: E.isActive("highlight"),
      isH1: E.isActive("heading", { level: 1 }),
      isH2: E.isActive("heading", { level: 2 }),
      isH3: E.isActive("heading", { level: 3 }),
      isH4: E.isActive("heading", { level: 4 }),
      isH5: E.isActive("heading", { level: 5 }),
      isBlockquote: E.isActive("blockquote"),
      isBulletList: E.isActive("bulletList"),
      isOrderedList: E.isActive("orderedList"),
      isTaskList: E.isActive("taskList"),
      isCodeBlock: E.isActive("codeBlock"),
      isLink: E.isActive("link")
    })
  }), g = F(() => {
    const { view: E } = t, { from: S } = E.state.selection, k = E.coordsAtPos(S);
    f({ top: k.bottom + 8, left: k.left }), d(!0);
  }, [t]), m = F((E, S) => {
    t.chain().focus().setImage({ src: E, alt: S }).run(), d(!1);
  }, [t]), y = F(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = F((E) => {
    t.chain().focus().insertCallout({ type: E }).run();
  }, [t]), v = Y(/* @__PURE__ */ new Map()), x = Y(/* @__PURE__ */ new Map()), T = F((E) => {
    const { doc: S, tr: k } = E.state;
    let N = !1;
    const C = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = E.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), D.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((W) => {
        const V = W, R = (V.textContent || "").trim().substring(0, 50);
        v.current.set(`${O}-${R}`, V.getBoundingClientRect());
      });
    });
    const L = [];
    S.descendants((P, O, $, W) => {
      if (!C.has(P.type.name)) return !0;
      let V = !1;
      if (P.forEach((A) => {
        A.type.name === "taskItem" && (V = !0);
      }), !V) return !0;
      let R = 0;
      return S.nodesBetween(0, O, (A) => (C.has(A.type.name) && R++, !0)), L.push({ node: P, pos: O, depth: R }), !0;
    }), L.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of L) {
      const $ = [];
      let W = 0;
      P.forEach((B) => {
        $.push({
          node: B,
          isTask: B.type.name === "taskItem",
          checked: B.type.name === "taskItem" && B.attrs.checked === !0,
          originalIndex: W++
        });
      });
      const V = $.filter((B) => B.isTask && !B.checked), R = $.filter((B) => B.isTask && B.checked), A = [...$], H = $.map((B, J) => ({ index: J, isTask: B.isTask })).filter((B) => B.isTask).map((B) => B.index), G = [...V, ...R];
      if (H.forEach((B, J) => {
        A[B] = G[J];
      }), !A.some((B, J) => B.node !== $[J].node)) continue;
      const U = P.type.create(
        P.attrs,
        A.map((B) => B.node)
      ), K = k.mapping.map(O);
      k.replaceWith(K, K + P.nodeSize, U), N = !0;
    }
    N && (E.view.dispatch(k), requestAnimationFrame(() => {
      E.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const $ = O.querySelectorAll(":scope > li"), W = /* @__PURE__ */ new Map();
        v.current.forEach((V, R) => {
          const A = R.replace(/^\d+-/, "");
          W.set(A, V);
        }), $.forEach((V) => {
          const R = V, A = (R.textContent || "").trim().substring(0, 50), H = W.get(A);
          if (!H) return;
          const G = R.getBoundingClientRect(), z = H.top - G.top;
          if (Math.abs(z) < 2) return;
          R.style.transform = `translateY(${z}px)`, R.style.transition = "none", R.style.zIndex = "1", R.offsetHeight, R.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", R.style.transform = "translateY(0)";
          const U = () => {
            R.style.transform = "", R.style.transition = "", R.style.zIndex = "", R.removeEventListener("transitionend", U);
          };
          R.addEventListener("transitionend", U), setTimeout(U, 400);
        });
      });
    }));
  }, []);
  q(() => {
    if (!s || !t) return;
    const E = /* @__PURE__ */ new Map();
    t.state.doc.descendants((k, N) => (k.type.name === "taskItem" && E.set(N, k.attrs.checked === !0), !0)), x.current = E;
    const S = ({ transaction: k }) => {
      if (!k.docChanged) return;
      const N = /* @__PURE__ */ new Map();
      t.state.doc.descendants((L, P) => (L.type.name === "taskItem" && N.set(P, L.attrs.checked === !0), !0));
      const C = x.current;
      let D = !1;
      if (C.size > 0 && N.size > 0) {
        let L = 0, P = 0;
        C.forEach((O) => {
          O && L++;
        }), N.forEach((O) => {
          O && P++;
        }), L !== P && (D = !0);
      }
      x.current = N, D && setTimeout(() => {
        T(t);
      }, 150);
    };
    return t.on("transaction", S), () => {
      t.off("transaction", S);
    };
  }, [t, s, T]);
  const w = F(() => {
    T(t);
  }, [t, T]);
  return /* @__PURE__ */ I("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    n && /* @__PURE__ */ h(
      we,
      {
        onClick: n,
        tooltip: "Copy as Markdown",
        children: /* @__PURE__ */ h(wn, { size: 16 })
      }
    ),
    n && /* @__PURE__ */ h(_t, {}),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ h(af, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ h(cf, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(_t, {}),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ h(zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ h(Fs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ h(Us, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ h(Ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ h(vc, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ h(bc, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ h(js, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(_t, {}),
    /* @__PURE__ */ I(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ I(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-normal
              ${p?.isH1 || p?.isH2 || p?.isH3 || p?.isH4 || p?.isH5 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ h("span", { className: "min-w-[18px] text-center", children: p?.isH1 ? "H1" : p?.isH2 ? "H2" : p?.isH3 ? "H3" : p?.isH4 ? "H4" : p?.isH5 ? "H5" : "P" }),
            /* @__PURE__ */ h(tr, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
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
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "P" }),
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
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ h("span", { children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ h("span", { children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ h("span", { children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ h("span", { children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H5" }),
              /* @__PURE__ */ h("span", { children: "Heading 5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ h(_t, {}),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ h(Vs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ h(Ks, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ h(Gs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ h(qs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => Js(t),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ h(wc, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => {
          if (p?.isTaskList)
            t.chain().focus().sinkListItem("taskItem").run();
          else if ((p?.isBulletList || p?.isOrderedList) && (t.chain().focus().sinkListItem("listItem").run(), p?.isOrderedList)) {
            const { state: E, view: S } = t, { $from: k } = E.selection, N = E.schema.nodes.orderedList, C = E.schema.nodes.bulletList;
            if (N && C)
              for (let D = k.depth; D >= 0; D--) {
                const L = k.node(D);
                if (L.type === N && D >= 2) {
                  const P = k.node(D - 1);
                  if (P.type.name === "listItem" || P.type.name === "taskItem") {
                    const O = k.before(D);
                    S.dispatch(E.tr.setNodeMarkup(O, C, L.attrs));
                    break;
                  }
                }
                if (L.type.name === "bulletList" || L.type.name === "taskList") break;
              }
          }
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ h(lf, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ h(df, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(_t, {}),
    /* @__PURE__ */ h(
      we,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ h(ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ h(Bs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ h(xc, { size: 16 })
      }
    ),
    /* @__PURE__ */ I(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ h(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ h(vs, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ I(as, { align: "start", children: [
        /* @__PURE__ */ I(xe, { onClick: () => b("info"), children: [
          /* @__PURE__ */ h(vs, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ I(xe, { onClick: () => b("note"), children: [
          /* @__PURE__ */ h(kc, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ I(xe, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ h(uf, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ I(xe, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ h(ff, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ I(xe, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ h(Cc, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ I(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ I(
        Ut,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ h(ys, { size: 16 }),
            /* @__PURE__ */ h("span", { className: "text-xs hidden sm:inline", children: "Table" })
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
              /* @__PURE__ */ h(Ya, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ h(Ya, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ h(un, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ h(ja, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ h(ja, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ h(un, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ h(Va, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ h(Va, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ h(un, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ h(
      $c,
      {
        isOpen: l,
        onClose: () => d(!1),
        onInsert: m,
        position: u
      }
    ),
    /* @__PURE__ */ h(_t, {}),
    /* @__PURE__ */ h(
      we,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ h(pf, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ I(ye, { children: [
      /* @__PURE__ */ h(_t, {}),
      /* @__PURE__ */ I(Id, { children: [
        /* @__PURE__ */ h(Rd, { asChild: !0, children: /* @__PURE__ */ h(
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
            children: /* @__PURE__ */ h(go, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ h(Pd, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ h("div", { className: "flex-1 min-w-2" })
  ] });
});
function nb({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [d, u] = j(""), [f, p] = j(""), [g, m] = j(!1), [y, b] = j(!1), [v, x] = j(!1), [T, w] = j(!1), [E, S] = j([]), [k, N] = j(0), [C, D] = j(null), [L, P] = j(!1), O = Y(!1), $ = Y(null), W = Y(null), V = Y(!1);
  q(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const R = F(() => {
    if (!d || !e) {
      S([]), N(0), D(null);
      return;
    }
    const B = [];
    let J;
    try {
      if (y)
        J = new RegExp(d, g ? "g" : "gi");
      else {
        let _ = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (_ = `\\b${_}\\b`), J = new RegExp(_, g ? "g" : "gi");
      }
      D(null);
    } catch (_) {
      D(_.message), S([]);
      return;
    }
    if (l) {
      let _;
      for (; (_ = J.exec(i)) !== null; )
        B.push({
          from: _.index,
          to: _.index + _[0].length,
          text: _[0]
        });
    } else {
      const { doc: _ } = e.state;
      _.descendants((ee, ne) => {
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
    S(B), B.length > 0 && k >= B.length && N(0);
  }, [d, g, y, v, e, k, l, i]);
  q(() => {
    R();
  }, [R]), q(() => {
    l && c && (t && E.length > 0 ? c(E, k) : c([], 0));
  }, [l, t, E, k, c]), q(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const B = typeof e.commands.setSearchHighlight == "function";
    t && d && B ? e.commands.setSearchHighlight({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      currentMatchIndex: k
    }) : B && e.commands.clearSearchHighlight();
  }, [e, t, d, g, y, k, l, E, i]), q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), q(() => {
    if (E.length > 0 && k < E.length) {
      const B = E[k];
      if (l) {
        const _ = document.querySelector(".syntax-textarea");
        if (_ && V.current) {
          const ee = parseInt(getComputedStyle(_).lineHeight) || 22, ue = i.substring(0, B.from).split(`
`).length;
          _.scrollTop = Math.max(0, (ue - 3) * ee);
        }
        V.current && (V.current = !1);
        return;
      }
      const J = e.view.domAtPos(B.from);
      J.node && J.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), V.current && (V.current = !1);
    }
  }, [k, E, e, l, i]), q(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, r]);
  const A = F(() => {
    E.length !== 0 && (V.current = !0, N((B) => (B + 1) % E.length));
  }, [E.length]), H = F(() => {
    E.length !== 0 && (V.current = !0, N((B) => (B - 1 + E.length) % E.length));
  }, [E.length]), G = F(() => {
    if (E.length === 0 || k >= E.length) return;
    const B = E[k];
    if (l && a) {
      const J = i.substring(0, B.from) + f + i.substring(B.to);
      a(J), setTimeout(R, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(f).run(), setTimeout(R, 10);
  }, [E, k, f, e, R, l, i, a]), z = F(() => {
    if (E.length === 0) return;
    if (l && a) {
      const J = [...E].sort((ee, ne) => ne.from - ee.from);
      let _ = i;
      J.forEach((ee) => {
        _ = _.substring(0, ee.from) + f + _.substring(ee.to);
      }), a(_), setTimeout(R, 10);
      return;
    }
    const B = [...E].sort((J, _) => _.from - J.from);
    e.chain().focus(), B.forEach((J) => {
      e.chain().setTextSelection({ from: J.from, to: J.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(R, 10);
  }, [E, f, e, R, l, i, a]), U = F(() => {
    if (E.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      wholeWord: v
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [E, d, g, y, v, e, n]), K = F((B) => {
    B.key === "Enter" ? (B.preventDefault(), B.shiftKey ? H() : A(), $.current?.focus()) : B.key === "Escape" ? (B.preventDefault(), n()) : B.key === "h" && (B.ctrlKey || B.metaKey) ? (B.preventDefault(), w((J) => !J)) : B.key === "l" && (B.ctrlKey || B.metaKey) && B.shiftKey && (B.preventDefault(), U());
  }, [A, H, n, U]);
  return t ? /* @__PURE__ */ I(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: K,
      children: [
        /* @__PURE__ */ I("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ I("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ h(hf, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: $,
                type: "text",
                placeholder: "Find...",
                value: d,
                onChange: (B) => u(B.target.value),
                className: `find-replace-input ${C ? "has-error" : ""}`
              }
            ),
            C && /* @__PURE__ */ h("span", { className: "find-replace-error", title: C, children: "!" })
          ] }),
          /* @__PURE__ */ h("span", { className: "find-replace-count", children: E.length > 0 ? `${k + 1} of ${E.length}` : d ? "No results" : "" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: H,
              disabled: E.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ h(mf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: A,
              disabled: E.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ h(tr, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: U,
              disabled: E.length === 0,
              className: `find-replace-btn ${L ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${E.length} matches`,
              children: /* @__PURE__ */ h(gf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => m((B) => !B),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ h(yf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => x((B) => !B),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ h(vf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => b((B) => !B),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ h(bf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => w((B) => !B),
              className: `find-replace-btn ${T ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ h(bs, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ h(mt, { size: 16 })
            }
          )
        ] }),
        T && /* @__PURE__ */ I("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ I("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ h(bs, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: W,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (B) => p(B.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: G,
              disabled: E.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ I(
            "button",
            {
              onClick: z,
              disabled: E.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ h(wf, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const rb = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), dt = rb ? "⌘" : "Ctrl", ob = ({ editor: e }) => {
  const [t, n] = j(!1), [r, o] = j(0), [s, i] = j(0), [a, c] = j(""), [l, d] = j(""), [u, f] = j(!1), [p, g] = j(!1);
  q(() => {
    if (!e) return;
    const S = () => {
      const N = e.storage.selectAllOccurrences;
      N ? (n(N.isActive), o(N.ranges.length), i(N.allMatches.length), c(N.searchTerm), d(N.typedBuffer), f(N.isTypingReplace), g(N.isIncremental)) : (n(!1), o(0), i(0));
    }, k = () => {
      S();
    };
    return e.on("transaction", k), S(), () => {
      e.off("transaction", k);
    };
  }, [e]);
  const m = F(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = F(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), b = F(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = F(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), x = F(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), T = F(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = F(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), E = F(() => {
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
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ h("div", { className: "select-all-action-bar-preview", children: u ? /* @__PURE__ */ I(ye, { children: [
        /* @__PURE__ */ h(mo, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ h(ye, { children: /* @__PURE__ */ I("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ h("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ I(ye, { children: [
        /* @__PURE__ */ h(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${dt}+D)`,
            children: /* @__PURE__ */ h(Xs, { size: 14 })
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: E,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${dt}+Shift+L)`,
            children: "All"
          }
        ),
        /* @__PURE__ */ h("div", { className: "select-all-action-bar-separator" })
      ] }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: m,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${dt}+B)`,
          children: /* @__PURE__ */ h(zs, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${dt}+I)`,
          children: /* @__PURE__ */ h(Fs, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${dt}+U)`,
          children: /* @__PURE__ */ h(Us, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ h(Ys, { size: 14 })
        }
      ),
      /* @__PURE__ */ h("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: x,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ h(un, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: T,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ h(mt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ I(ye, { children: [
      /* @__PURE__ */ I("kbd", { children: [
        dt,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ I("kbd", { children: [
        dt,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ h("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ I("kbd", { children: [
        dt,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ I(ye, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ h("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ h("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ I("kbd", { children: [
        dt,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, sb = bt(ob), zr = "-dismissed";
function ab(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function ib(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, c] = j({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = Y(null), d = Y(""), u = Y(0);
  q(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + zr);
        if (b && !v) {
          let x = "";
          try {
            x = e.getHTML() || "";
          } catch {
            return;
          }
          b !== x && b.length > 50 && c((T) => ({ ...T, hasRecoverableContent: !0 }));
        }
      } catch (b) {
        console.warn("useAutoSave: Error checking for recoverable content", b);
      }
  }, [e, n, o]);
  const f = F(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const b = e.getHTML(), v = ab(b);
        if (v === u.current && b.length === d.current.length) {
          c((x) => ({ ...x, status: "saved" }));
          return;
        }
        if (b.length < 20)
          return;
        c((x) => ({ ...x, status: "saving" })), localStorage.setItem(n, b), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), d.current = b, u.current = v, c((x) => ({
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
  q(() => {
    if (!e || !o || e.isDestroyed) return;
    const b = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", b), () => {
      e.off("update", b), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, f]), q(() => {
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
  const p = F(() => {
    l.current && clearTimeout(l.current), f();
  }, [f]), g = F(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + zr), d.current = "", c({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (b) {
      console.warn("useAutoSave: Error clearing content", b);
    }
  }, [n]), m = F(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const b = localStorage.getItem(n);
      return b && e && !e.isDestroyed ? (c((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(b), d.current = b, localStorage.removeItem(n + zr), i?.(b);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), b) : null;
    } catch (b) {
      return console.warn("useAutoSave: Error recovering content", b), null;
    }
  }, [e, n, i]), y = F(() => {
    try {
      localStorage.setItem(n + zr, "true"), c((b) => ({ ...b, hasRecoverableContent: !1 }));
    } catch (b) {
      console.warn("useAutoSave: Error dismissing recovery", b);
    }
  }, [n]);
  return {
    ...a,
    save: p,
    clear: g,
    recover: m,
    dismissRecovery: y
  };
}
function Qr(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), c = s.after(s.depth);
  o.replaceWith(a, c, i);
  const l = a + i.nodeSize;
  if (l < o.doc.content.size) {
    const d = o.doc.resolve(l);
    d.nodeAfter && d.nodeAfter.isTextblock ? o.setSelection(Ke.create(o.doc, l + 1)) : d.nodeAfter && o.setSelection(Ke.near(o.doc.resolve(l)));
  } else {
    const u = r.schema.nodes.paragraph.create();
    o.insert(l, u), o.setSelection(Ke.create(o.doc, l + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function Yt(e) {
  return e.replace(/^[ \t]*\u200B[ \t]*$/gm, "").replace(/\u200B/g, "");
}
const cb = {
  info: "Info",
  note: "Note",
  prompt: "Prompt",
  resources: "Resources",
  todo: "Todo",
  summary: "Summary"
};
function Rs(e) {
  return e.replace(
    /```ad-(\w+)\n([\s\S]*?)```/g,
    (t, n, r) => {
      const o = cb[n] || n.charAt(0).toUpperCase() + n.slice(1), s = r.trim();
      return `#### ${o}

${s}`;
    }
  );
}
function co(e) {
  const t = document.querySelector(".copy-md-toast");
  t && t.remove();
  const n = document.createElement("div");
  n.className = "copy-md-toast", n.textContent = e;
  const r = document.documentElement.classList.contains("dark");
  n.style.cssText = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:${r ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)"};color:${r ? "#e5e5e5" : "#333"};padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid ${r ? "#3a3a3a" : "#e5e5e5"};animation:sortToastIn 0.2s ease;`, document.body.appendChild(n), setTimeout(() => {
    n.style.animation = "sortToastOut 0.2s ease forwards", setTimeout(() => n.remove(), 200);
  }, 1500);
}
function lb(e, {
  editor: t,
  turndownService: n,
  editorModeRef: r,
  handleModeSwitch: o,
  wordCount: s,
  autoSaveState: i,
  setIsFindReplaceOpen: a,
  setFindReplaceFocusTrigger: c
}) {
  Ju(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? Yt(n.turndown(t.getHTML())) : "",
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
    insertImage: (l, d = "") => t?.commands.setImage({ src: l, alt: d }),
    insertTable: (l = 3, d = 3) => t?.commands.insertTable({ rows: l, cols: d, withHeaderRow: !0 }),
    insertCodeBlock: (l) => {
      l ? t?.commands.setCodeBlock({ language: l }) : t?.commands.setCodeBlock();
    },
    insertCallout: (l = "info") => t?.commands.insertCallout?.({ type: l }),
    insertHorizontalRule: () => {
      t && Qr(t, t.state.selection.from, t.state.selection.from);
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
      const { from: l, to: d } = t.state.selection;
      return t.state.doc.textBetween(l, d, " ");
    },
    isEditable: () => t?.isEditable || !1,
    setEditable: (l) => t?.setEditable(l),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!t) return [];
      const l = [];
      return t.state.doc.descendants((d, u) => {
        if (d.type.name === "heading") {
          const f = d.attrs.level, p = d.textContent.trim();
          p && l.push({ id: `toc-heading-${u}`, text: p, level: f, pos: u });
        }
      }), l;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (l) => {
      if (!(!t || t.isDestroyed))
        try {
          const d = t.state.doc.resolve(l), u = t.view.nodeDOM(d.before(d.depth + 1));
          if (u instanceof HTMLElement) {
            const f = t.view.dom.closest(".editor-content-wrapper");
            if (f) {
              const p = f.getBoundingClientRect(), m = u.getBoundingClientRect().top - p.top + f.scrollTop;
              f.scrollTo({ top: m - 20, behavior: "smooth" });
            } else
              u.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          t.commands.setTextSelection(l + 1);
        } catch {
        }
    },
    copyAsMarkdown: async () => {
      if (!t) return "";
      const { from: l, to: d, empty: u } = t.state.selection;
      let f, p;
      if (u)
        f = t.getHTML(), p = t.getText();
      else {
        const m = t.state.doc.slice(l, d), y = Lc.fromSchema(t.schema), b = document.createElement("div"), v = y.serializeFragment(m.content);
        b.appendChild(v), f = b.innerHTML, p = t.state.doc.textBetween(l, d, `
`);
      }
      let g = Yt(n.turndown(f));
      u && (g = Rs(g));
      try {
        await navigator.clipboard.writeText(g), co(u ? "Document copied as Markdown" : "Selection copied as Markdown");
      } catch {
        try {
          await navigator.clipboard.writeText(p), co(u ? "Document copied" : "Selection copied");
        } catch {
        }
      }
      return g;
    },
    getMarkdownForExport: () => {
      if (!t) return "";
      const l = Yt(n.turndown(t.getHTML()));
      return Rs(l);
    }
  }), [t, n, o, s, i, a]);
}
const db = new Ne("tableCellMenu");
function ub(e) {
  return new De({
    key: db,
    props: {
      handleDOMEvents: {
        contextmenu(t, n) {
          const o = n.target.closest("td, th");
          if (o && o.closest(".ProseMirror")) {
            const { selection: s } = t.state;
            if (!s.empty)
              return !1;
            n.preventDefault();
            const a = t.posAtDOM(o, 0);
            return e.chain().focus().setTextSelection(a).run(), fb(n, e, a), !0;
          }
          return !1;
        }
      }
    }
  });
}
function fb(e, t, n) {
  const r = document.querySelector(".table-cell-menu-dropdown");
  r && r.remove();
  const o = document.createElement("div");
  o.className = "table-cell-menu-dropdown";
  const s = 170, i = 280;
  let a = e.clientY, c = e.clientX;
  c + s > window.innerWidth - 12 && (c = window.innerWidth - s - 12), c < 12 && (c = 12), a + i > window.innerHeight - 12 && (a = e.clientY - i), a < 12 && (a = 12);
  const l = document.documentElement.classList.contains("dark"), d = l ? "#1f1f1f" : "#ffffff", u = l ? "#3a3a3a" : "#e5e5e5", f = l ? "#e5e5e5" : "#333333";
  o.style.cssText = "position:fixed;top:" + a + "px;left:" + c + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + d + ";border:1px solid " + u + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + f + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const p = t.state.doc.resolve(n);
  let g = !1;
  for (let S = p.depth; S >= 0; S--)
    if (p.node(S).type.name === "table") {
      p.node(S).firstChild?.firstChild?.type.name === "tableHeader" && (g = !0);
      break;
    }
  const m = [
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
    { label: "Copy Table", icon: "copy", action: () => pb(t) }
  ], y = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, b = l ? "#2a2a2a" : "#f5f5f5", v = l ? "#ff6b6b" : "#dc2626", x = l ? "#999999" : "#666666", T = l ? "#333333" : "#e5e5e5";
  m.forEach((S) => {
    if (S.label === "divider") {
      const k = document.createElement("div");
      k.style.cssText = "height:1px;background:" + T + ";margin:4px 0;", o.appendChild(k);
    } else {
      const k = document.createElement("button");
      k.type = "button";
      const N = S.destructive ? v : f;
      k.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + N + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const C = y[S.icon || ""] || "", D = S.destructive ? v : x;
      k.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + D + ';">' + C + '</span><span style="flex:1;white-space:nowrap;">' + S.label + "</span>", k.addEventListener("mouseenter", () => {
        k.style.background = S.destructive ? l ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : b;
      }), k.addEventListener("mouseleave", () => {
        k.style.background = "transparent";
      }), k.addEventListener("click", (L) => {
        L.preventDefault(), L.stopPropagation(), S.action && S.action(), o.remove();
      }), o.appendChild(k);
    }
  }), document.body.appendChild(o);
  const w = (S) => {
    const k = S.target;
    o.contains(k) || (o.remove(), document.removeEventListener("mousedown", w), document.removeEventListener("keydown", E));
  }, E = (S) => {
    S.key === "Escape" && (o.remove(), document.removeEventListener("mousedown", w), document.removeEventListener("keydown", E));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", w), document.addEventListener("keydown", E);
  }, 0);
}
function pb(e) {
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
const hb = sp.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      ub(this.editor)
    ];
  }
}), mb = ap.extend({}), Yn = new Ne("tableSorting");
let Wt = null, zn = null;
function gb(e) {
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
function yb(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function vb(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (g, m) => {
    if (g.type.name === "table" && m === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Wt?.tablePos === t && Wt?.columnIndex === n && Wt?.direction === "asc" ? "desc" : "asc";
  Wt = { tablePos: t, columnIndex: n, direction: i }, zn = null;
  const a = [];
  s.forEach((g) => {
    if (g.type.name === "tableRow") {
      let m = !1;
      g.forEach((y) => {
        y.type.name === "tableHeader" && (m = !0);
      }), a.push({ node: g, isHeader: m });
    }
  });
  const c = a.filter((g) => g.isHeader), l = a.filter((g) => !g.isHeader);
  if (l.length < 2) {
    Ri(n, i), o.dispatch(r.tr.setMeta(Yn, { updated: !0 }));
    return;
  }
  const d = l.map((g) => {
    let m = "", y = 0;
    return g.node.forEach((b) => {
      y === n && (m = b.textContent || ""), y++;
    }), { ...g, sortValue: gb(m) };
  }), u = d.map((g, m) => m);
  d.sort((g, m) => yb(g.sortValue, m.sortValue, i));
  const f = d.map((g, m) => l.indexOf(g));
  if (u.some((g, m) => g !== f[m])) {
    const g = [];
    c.forEach((b) => g.push(b.node)), d.forEach((b) => g.push(b.node));
    const m = s.type.create(s.attrs, g), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, m), y.setMeta(Yn, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Yn, { updated: !0 }));
  Ri(n, i);
}
function Ri(e, t) {
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
function bb(e, t, n, r) {
  const o = document.createElement("span");
  o.className = "table-sort-btn-inline", o.setAttribute("contenteditable", "false"), o.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const s = document.createElement("button");
  s.className = "table-sort-btn", s.setAttribute("contenteditable", "false"), s.type = "button";
  const i = document.documentElement.classList.contains("dark"), a = i ? "#60a5fa" : "#3b82f6", c = i ? "#666" : "#aaa", l = i ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return s.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? a : c) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", s.addEventListener("mouseenter", () => {
    s.style.background = l, s.style.opacity = "1", s.style.color = a;
  }), s.addEventListener("mouseleave", () => {
    s.style.background = "transparent", s.style.opacity = e ? "1" : "0.5", s.style.color = e ? a : c;
  }), s.addEventListener("click", (d) => {
    d.preventDefault(), d.stopPropagation(), vb(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function wb(e) {
  return new De({
    key: Yn,
    state: {
      init() {
        return Ve.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Yn);
        return !t.docChanged && !s?.updated && zn ? zn.map(t.mapping, t.doc) : (zn = xb(o.doc, e), zn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function xb(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "table") {
      const s = o;
      r.forEach((i, a) => {
        if (i.type.name === "tableRow") {
          let c = 0, l = 0;
          i.forEach((d, u) => {
            if (d.type.name === "tableHeader") {
              const f = o + 1 + a + 1 + l;
              let p = f + 1;
              d.forEach((x, T) => {
                x.type.name === "paragraph" && (p = f + 1 + T + x.nodeSize - 1);
              });
              const m = Wt?.tablePos === s && Wt?.columnIndex === c ? Wt.direction : null, y = c, b = s, v = Ze.widget(p, () => bb(m, b, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(v);
            }
            l += d.nodeSize, c++;
          });
        }
      });
    }
  }), Ve.create(e, n);
}
const kb = $e.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [wb(this.editor)];
  }
});
function xa(e, t, n, r, o, s = {}) {
  const i = e.doc.nodeAt(t);
  if (!i) return !1;
  e.setNodeMarkup(t, n, i.attrs);
  const a = e.doc.nodeAt(t);
  if (!a) return !1;
  const c = [];
  a.forEach((l, d) => {
    l.type === o && c.push(t + 1 + d);
  });
  for (let l = c.length - 1; l >= 0; l--) {
    const d = c[l], u = e.doc.nodeAt(d);
    u && u.type === o && e.setNodeMarkup(d, r, s);
  }
  return !0;
}
const Cb = ip.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, d = t.schema.nodes.taskItem;
        let u = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const g = s.node(p);
          if (g.type === i || g.type === a || g.type === c) {
            u = g.type, f = s.before(p);
            break;
          }
        }
        if (u === i)
          return e.liftListItem("listItem");
        if (u === a || u === c) {
          if (!r) return !0;
          if (xa(n, f, i, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Eb = cp.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, d = t.schema.nodes.taskItem;
        let u = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const g = s.node(p);
          if (g.type === i || g.type === a || g.type === c) {
            u = g.type, f = s.before(p);
            break;
          }
        }
        if (u === c)
          return e.liftListItem("listItem");
        if (u === a || u === i) {
          if (!r) return !0;
          if (xa(n, f, c, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Mb = dp.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: c, $to: l } = a, d = c.blockRange(l);
        if (!d)
          return !1;
        const u = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let w = c.depth; w > 0; w--)
          if (c.node(w).type === u) {
            p = !0, c.before(w);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const g = n.schema.nodes.bulletList, m = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let b = null, v = -1;
        for (let w = c.depth; w > 0; w--) {
          const E = c.node(w);
          if (E.type === g || E.type === m) {
            b = E, v = c.before(w);
            break;
          }
        }
        if (b) {
          if (!o) return !0;
          const w = v, E = r.doc.nodeAt(w);
          if (!E) return !1;
          r.setNodeMarkup(w, u, E.attrs);
          const S = r.doc.nodeAt(w);
          if (!S) return !1;
          const k = [];
          S.forEach((N, C) => {
            N.type === y && k.push(w + 1 + C);
          });
          for (let N = k.length - 1; N >= 0; N--) {
            const C = k[N], D = r.doc.nodeAt(C);
            D && D.type === y && r.setNodeMarkup(C, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const x = Ga(d, u);
        if (x) {
          r.wrap(d, x);
          const { $from: w } = r.selection;
          let E = -1;
          for (let S = w.depth; S > 0; S--)
            if (w.node(S).type === u) {
              E = w.before(S);
              break;
            }
          if (E >= 0) {
            const S = r.doc.nodeAt(E);
            if (S) {
              const k = [];
              S.forEach((N, C) => {
                N.type === y && k.push(E + 1 + C);
              });
              for (let N = k.length - 1; N >= 0; N--) {
                const C = k[N], D = r.doc.nodeAt(C);
                D && D.type === y && r.setNodeMarkup(C, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const T = Ga(d, g);
        if (T) {
          r.wrap(d, T);
          const { $from: w } = r.selection;
          let E = -1;
          for (let S = w.depth; S > 0; S--)
            if (w.node(S).type === g) {
              E = w.before(S);
              break;
            }
          return E >= 0 && xa(r, E, u, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Tb = up.extend({
  content: "paragraph block*",
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() || {},
      Enter: () => {
        const { editor: t } = this, { state: n } = t, { $from: r, $to: o } = n.selection;
        if (!r.sameParent(o) || r.pos !== o.pos)
          return t.commands.splitListItem(this.name);
        let s = -1;
        for (let u = r.depth; u >= 1; u--)
          if (r.node(u).type.name === "taskItem") {
            s = u;
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
          const u = r.before(s), { tr: f } = n, p = n.schema.nodes.taskItem, g = n.schema.nodes.paragraph, m = p.create(
            { checked: !1 },
            g.create()
          );
          f.insert(u, m);
          const y = u + 1;
          return f.setSelection(Ke.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
}), Sb = lp.extend({
  content: "paragraph block*"
}), Pi = new Ne("collapsibleList");
function Ps(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function lo(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function Db(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
function cs(e, t) {
  const n = [];
  return e.descendants((r) => {
    if (t.includes(r.type.name)) {
      const o = lo(r) ? "1" : "0", s = r.firstChild?.textContent.slice(0, 50) ?? "";
      n.push(`${o}:${s}`);
    }
  }), n.join("|");
}
function Fr(e, t, n, r) {
  const o = [];
  return e.descendants((s, i) => {
    if (!n.listItemTypes.includes(s.type.name) || !lo(s))
      return !0;
    const a = Ps(s, i), c = t.collapsedItems.has(a);
    o.push(
      Ze.node(i, i + s.nodeSize, {
        class: `collapsible-list-item ${c ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const l = s.firstChild;
    if (l && l.type.name === "paragraph") {
      const d = i + 1 + l.nodeSize - 1, u = Ze.widget(
        d,
        () => {
          const f = CSS.escape(a), p = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${f}"]`
          );
          if (p) {
            p.classList.contains("collapsed") !== c && (p.classList.remove("collapsed", "expanded"), p.classList.add(c ? "collapsed" : "expanded"), p.title = c ? "Click to expand" : "Click to collapse");
            const b = p.parentElement;
            if (b) return b;
          }
          const g = document.createElement("span");
          g.className = "collapsible-list-chevron-wrapper", g.setAttribute("contenteditable", "false");
          const m = document.createElement("button");
          return m.className = `collapsible-list-chevron ${c ? "collapsed" : "expanded"}`, m.setAttribute("data-list-item-id", a), m.setAttribute("contenteditable", "false"), m.setAttribute("tabindex", "-1"), m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', m.title = c ? "Click to expand" : "Click to collapse", m.addEventListener("click", (y) => {
            y.preventDefault(), y.stopPropagation();
            const b = m.classList.contains("collapsed");
            m.classList.remove("collapsed", "expanded"), m.classList.add(b ? "expanded" : "collapsed"), m.title = b ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), r.current && r.current.dispatch(
              r.current.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), g.appendChild(m), g;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      o.push(u);
    }
    if (c && Db(s, i)) {
      let u = i + 1;
      s.forEach((f) => {
        ["bulletList", "orderedList", "taskList"].includes(f.type.name) && o.push(
          Ze.node(u, u + f.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += f.nodeSize;
      });
    }
    return !0;
  }), Ve.create(e, o);
}
const Nb = $e.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !lo(o))
          return !1;
        const s = Ps(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && lo(o) && n.collapsedItems.add(Ps(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options, n = { current: null };
    return [
      new De({
        key: Pi,
        view(r) {
          return n.current = r, {
            update(o) {
              n.current = o;
            },
            destroy() {
              n.current = null;
            }
          };
        },
        state: {
          init(r, o) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Fr(o.doc, e, t, n),
              docVersion: 0,
              listFingerprint: cs(o.doc, t.listItemTypes)
            };
          },
          apply(r, o, s, i) {
            if (r.getMeta("collapsibleList"))
              return {
                collapsedItems: new Set(e.collapsedItems),
                decorations: Fr(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                listFingerprint: cs(i.doc, t.listItemTypes)
              };
            if (r.docChanged) {
              const c = cs(i.doc, t.listItemTypes);
              return c !== o.listFingerprint ? {
                collapsedItems: new Set(e.collapsedItems),
                decorations: Fr(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                listFingerprint: c
              } : {
                ...o,
                listFingerprint: c,
                decorations: o.decorations.map(r.mapping, r.doc)
              };
            }
            return {
              ...o,
              decorations: o.decorations.map(r.mapping, r.doc)
            };
          }
        },
        props: {
          decorations(r) {
            const o = Pi.getState(r);
            return o?.decorations ? o.decorations : Fr(r.doc, e, t, n);
          }
        }
      })
    ];
  }
}), Oi = "http://www.w3.org/2000/svg";
function $t(e, t, n) {
  const r = document.createElementNS(Oi, "svg");
  r.setAttribute("width", String(t)), r.setAttribute("height", String(t)), r.setAttribute("viewBox", "0 0 24 24"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-linejoin", "round"), n && r.setAttribute("class", n);
  for (const o of e) {
    const s = document.createElementNS(Oi, o.tag);
    for (const [i, a] of Object.entries(o.attrs))
      s.setAttribute(i, a);
    r.appendChild(s);
  }
  return r;
}
const Lb = [
  { tag: "circle", attrs: { cx: "12", cy: "12", r: "10" } },
  { tag: "path", attrs: { d: "M12 16v-4" } },
  { tag: "path", attrs: { d: "M12 8h.01" } }
], Ab = [
  { tag: "path", attrs: { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" } },
  { tag: "path", attrs: { d: "M15 3v4a2 2 0 0 0 2 2h4" } }
], Ib = [
  { tag: "path", attrs: { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" } },
  { tag: "path", attrs: { d: "M13 8H7" } },
  { tag: "path", attrs: { d: "M17 12H7" } }
], Rb = [
  { tag: "path", attrs: { d: "M12 7v14" } },
  { tag: "path", attrs: { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" } }
], Pb = [
  { tag: "rect", attrs: { x: "3", y: "5", width: "6", height: "6", rx: "1" } },
  { tag: "path", attrs: { d: "m3 17 2 2 4-4" } },
  { tag: "path", attrs: { d: "M13 6h8" } },
  { tag: "path", attrs: { d: "M13 12h8" } },
  { tag: "path", attrs: { d: "M13 18h8" } }
], Ob = [
  { tag: "rect", attrs: { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" } },
  { tag: "path", attrs: { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" } },
  { tag: "path", attrs: { d: "M12 11h4" } },
  { tag: "path", attrs: { d: "M12 16h4" } },
  { tag: "path", attrs: { d: "M8 11h.01" } },
  { tag: "path", attrs: { d: "M8 16h.01" } }
], ls = [
  { tag: "path", attrs: { d: "m6 9 6 6 6-6" } }
], _b = [
  { tag: "path", attrs: { d: "m9 18 6-6-6-6" } }
], ln = {
  info: { iconElements: Lb, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { iconElements: Ab, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { iconElements: Ib, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { iconElements: Rb, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { iconElements: Pb, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { iconElements: Ob, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
}, $b = Object.keys(ln);
class Hb {
  constructor(t, n, r) {
    this.collapsed = !1, this.showDropdown = !1, this.portalContainer = null, this.dropdownEl = null, this.handleHeaderClick = (i) => {
      this.toggleCollapse();
    }, this.handleButtonClick = (i) => {
      i.stopPropagation(), this.view.editable && this.toggleDropdown();
    }, this.node = t, this.view = n, this.getPos = r;
    const o = t.attrs.type || "info", s = ln[o] || ln.info;
    this.boundHandleClickOutside = this.handleClickOutside.bind(this), this.boundHandleScroll = this.closeDropdown.bind(this), this.dom = document.createElement("div"), this.dom.className = `callout callout-${o}`, this.dom.setAttribute("data-callout", ""), this.dom.setAttribute("data-type", o), this.dom.setAttribute("data-node-view-wrapper", ""), this.headerEl = document.createElement("div"), this.headerEl.className = "callout-header", this.headerEl.style.cursor = "pointer", this.headerEl.style.userSelect = "none", this.headerEl.style.webkitUserSelect = "none", this.headerEl.title = "Click to collapse", this.headerEl.addEventListener("click", this.handleHeaderClick), this.headerButton = document.createElement("button"), this.headerButton.className = "callout-header-button", this.headerButton.title = n.editable ? "Click to change callout type" : s.label, this.headerButton.style.color = s.borderColor, this.headerButton.style.userSelect = "none", this.headerButton.style.webkitUserSelect = "none", this.headerButton.addEventListener("click", this.handleButtonClick), this.headerIconContainer = document.createElement("span"), this.headerIconContainer.style.display = "flex", this.headerIconContainer.appendChild($t(s.iconElements, 18)), this.labelEl = document.createElement("span"), this.labelEl.className = "callout-label", this.labelEl.textContent = s.label, this.typeChevronEl = $t(ls, 12, "callout-type-chevron"), n.editable || (this.typeChevronEl.style.display = "none"), this.headerButton.appendChild(this.headerIconContainer), this.headerButton.appendChild(this.labelEl), this.headerButton.appendChild(this.typeChevronEl), this.collapseIndicator = document.createElement("div"), this.collapseIndicator.className = "callout-collapse-indicator", this.collapseIndicator.style.color = s.borderColor, this.collapseIndicator.appendChild($t(ls, 16)), this.headerEl.appendChild(this.headerButton), this.headerEl.appendChild(this.collapseIndicator), this.contentWrapper = document.createElement("div"), this.contentWrapper.className = "callout-content", this.contentDOM = document.createElement("div"), this.contentWrapper.appendChild(this.contentDOM), this.dom.appendChild(this.headerEl), this.dom.appendChild(this.contentWrapper);
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed, this.collapsed ? (this.dom.classList.add("callout-collapsed"), this.contentWrapper.classList.add("callout-content-hidden"), this.headerEl.title = "Click to expand") : (this.dom.classList.remove("callout-collapsed"), this.contentWrapper.classList.remove("callout-content-hidden"), this.headerEl.title = "Click to collapse"), this.collapseIndicator.innerHTML = "", this.collapseIndicator.appendChild(
      this.collapsed ? $t(_b, 16) : $t(ls, 16)
    );
  }
  // ── Dropdown Portal ──
  toggleDropdown() {
    this.showDropdown ? this.closeDropdown() : this.openDropdown();
  }
  openDropdown() {
    this.showDropdown = !0;
    const t = this.headerButton.getBoundingClientRect();
    this.portalContainer = document.createElement("div"), this.portalContainer.style.position = "fixed", this.portalContainer.style.top = "0", this.portalContainer.style.left = "0", this.portalContainer.style.width = "0", this.portalContainer.style.height = "0", this.portalContainer.style.overflow = "visible", this.portalContainer.style.zIndex = "99999", this.portalContainer.style.pointerEvents = "auto", this.portalContainer.addEventListener("mousedown", (o) => o.stopPropagation()), this.portalContainer.addEventListener("pointerdown", (o) => o.stopPropagation()), this.portalContainer.addEventListener("click", (o) => o.stopPropagation());
    const n = document.documentElement.classList.contains("dark") || document.documentElement.getAttribute("data-theme") === "dark";
    this.dropdownEl = document.createElement("div"), this.dropdownEl.className = `callout-type-dropdown-portal ${n ? "dark-theme" : "light-theme"}`, this.dropdownEl.contentEditable = "false", this.dropdownEl.style.position = "fixed", this.dropdownEl.style.top = `${t.bottom + 4}px`, this.dropdownEl.style.left = `${t.left}px`;
    const r = this.node.attrs.type || "info";
    for (const o of $b) {
      const s = ln[o], i = document.createElement("button");
      i.className = `callout-type-option${o === r ? " active" : ""}`, i.addEventListener("click", (l) => {
        l.stopPropagation(), this.handleTypeChange(o);
      }), i.addEventListener("mousedown", (l) => l.stopPropagation());
      const a = $t(s.iconElements, 16);
      a.style.color = s.borderColor;
      const c = document.createElement("span");
      c.textContent = s.label, i.appendChild(a), i.appendChild(c), this.dropdownEl.appendChild(i);
    }
    this.portalContainer.appendChild(this.dropdownEl), document.body.appendChild(this.portalContainer), setTimeout(() => {
      document.addEventListener("mousedown", this.boundHandleClickOutside), document.addEventListener("touchstart", this.boundHandleClickOutside, { passive: !0 }), window.addEventListener("scroll", this.boundHandleScroll, !0);
    }, 0);
  }
  closeDropdown() {
    this.showDropdown && (this.showDropdown = !1, this.portalContainer && this.portalContainer.parentNode && this.portalContainer.parentNode.removeChild(this.portalContainer), this.portalContainer = null, this.dropdownEl = null, document.removeEventListener("mousedown", this.boundHandleClickOutside), document.removeEventListener("touchstart", this.boundHandleClickOutside), window.removeEventListener("scroll", this.boundHandleScroll, !0));
  }
  handleClickOutside(t) {
    const n = t.target;
    this.dropdownEl && !this.dropdownEl.contains(n) && !this.headerButton.contains(n) && this.closeDropdown();
  }
  handleTypeChange(t) {
    const n = this.getPos();
    n != null && (this.view.dispatch(
      this.view.state.tr.setNodeMarkup(n, void 0, {
        ...this.node.attrs,
        type: t
      })
    ), this.closeDropdown());
  }
  // ── Update DOM for type change ──
  applyType(t) {
    const n = ln[t] || ln.info;
    this.dom.className = `callout callout-${t}${this.collapsed ? " callout-collapsed" : ""}`, this.dom.setAttribute("data-type", t), this.headerButton.style.color = n.borderColor, this.headerButton.title = this.view.editable ? "Click to change callout type" : n.label, this.headerIconContainer.innerHTML = "", this.headerIconContainer.appendChild($t(n.iconElements, 18)), this.labelEl.textContent = n.label, this.collapseIndicator.style.color = n.borderColor;
  }
  // ── ProseMirror NodeView interface ──
  update(t) {
    if (t.type !== this.node.type) return !1;
    const n = this.node.attrs.type || "info", r = t.attrs.type || "info";
    return this.node = t, n !== r && this.applyType(r), !0;
  }
  selectNode() {
    this.dom.classList.add("ProseMirror-selectednode");
  }
  deselectNode() {
    this.dom.classList.remove("ProseMirror-selectednode");
  }
  destroy() {
    this.closeDropdown(), this.headerEl.removeEventListener("click", this.handleHeaderClick), this.headerButton.removeEventListener("click", this.handleButtonClick);
  }
  ignoreMutation(t) {
    return !this.contentDOM.contains(t.target);
  }
  stopEvent(t) {
    const n = t.target;
    return !!(n && this.headerEl.contains(n) || n && this.portalContainer && this.portalContainer.contains(n));
  }
}
const Bb = yo.create({
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
    return ({ node: e, view: t, getPos: n }) => new Hb(e, t, n);
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
}), Wb = yp.extend({
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
      new De({
        key: new Ne("resizableImageCopy"),
        props: {
          handleDOMEvents: {
            copy(e, t) {
              const { state: n } = e;
              if (!(n.selection instanceof Xf)) return !1;
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
                    a.crossOrigin = "anonymous", await new Promise((d, u) => {
                      a.onload = () => d(), a.onerror = () => u(new Error("Image load failed")), a.src = o;
                    });
                    const c = document.createElement("canvas");
                    c.width = a.naturalWidth, c.height = a.naturalHeight;
                    const l = c.getContext("2d");
                    if (l) {
                      l.drawImage(a, 0, 0);
                      const d = await new Promise(
                        (u) => c.toBlob(u, "image/png")
                      );
                      if (d) {
                        await navigator.clipboard.write([
                          new ClipboardItem({
                            "image/png": d,
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
        const H = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[A] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${H}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (A) => !(!A || A.startsWith("data:") || A.startsWith("blob:") || A.startsWith("http://") || A.startsWith("https://")), l = (A) => {
        c(A) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(A).then((H) => {
          a.src = H, a.style.opacity = "1";
        }).catch(() => {
          a.src = A, a.style.opacity = "1";
        })) : a.src = A;
      };
      l(t.attrs.src);
      const d = document.createElement("div");
      d.classList.add("resize-handle"), d.style.cssText = `
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
      `, d.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(90deg);">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      `;
      const u = document.createElement("button");
      u.classList.add("image-menu-btn"), u.setAttribute("type", "button"), u.setAttribute("title", "Image options"), u.style.cssText = `
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
      `, u.innerHTML = `
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
      const p = (A, H, G) => {
        const z = document.createElement("button");
        return z.setAttribute("type", "button"), z.style.cssText = `
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
        `, z.innerHTML = `${H}<span>${A}</span>`, z.addEventListener("mouseenter", () => {
          z.style.background = "oklch(0.95 0 0)";
        }), z.addEventListener("mouseleave", () => {
          z.style.background = "transparent";
        }), z.addEventListener("click", (U) => {
          U.preventDefault(), U.stopPropagation(), G(), f.style.display = "none", N = !1;
        }), z;
      }, g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', m = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", g, () => {
        const A = typeof r == "function" ? r() : null;
        if (A != null && e.onImageClick) {
          const H = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: A,
            rect: H
          });
        }
      })), f.appendChild(p("Copy image", m, async () => {
        const A = o.attrs.src;
        try {
          const G = await (await fetch(A)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [G.type]: G })
          ]);
        } catch {
          try {
            const H = new window.Image();
            H.crossOrigin = "anonymous", await new Promise((U, K) => {
              H.onload = () => U(), H.onerror = () => K(new Error("Image load failed")), H.src = A;
            });
            const G = document.createElement("canvas");
            G.width = H.naturalWidth, G.height = H.naturalHeight;
            const z = G.getContext("2d");
            if (z) {
              z.drawImage(H, 0, 0);
              const U = await new Promise(
                (K) => G.toBlob(K, "image/png")
              );
              U ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": U })
              ]) : await navigator.clipboard.writeText(A);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(A);
            } catch {
            }
          }
        }
      })), f.appendChild(p("Copy URL", b, async () => {
        const A = o.attrs.src;
        try {
          await navigator.clipboard.writeText(A);
        } catch {
        }
      })), f.appendChild(p("Save image", y, () => {
        const A = o.attrs.src, H = o.attrs.alt || "image", G = document.createElement("a");
        G.href = A, G.download = H, G.target = "_blank", G.rel = "noopener noreferrer", document.body.appendChild(G), G.click(), setTimeout(() => {
          document.body.removeChild(G);
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
      const T = document.createElement("div");
      T.style.cssText = `
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
      ], E = [], S = (A) => {
        E.forEach((H) => {
          (H.getAttribute("data-align-value") || "left") === A ? (H.style.background = "oklch(1 0 0)", H.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", H.style.color = "oklch(0.25 0 0)", H.style.fontWeight = "600") : (H.style.background = "transparent", H.style.boxShadow = "none", H.style.color = "oklch(0.5 0 0)", H.style.fontWeight = "400");
        });
      };
      w.forEach(({ value: A, label: H, icon: G }) => {
        const z = document.createElement("button");
        z.setAttribute("type", "button"), z.setAttribute("data-align-value", A), z.setAttribute("title", `Align ${H.toLowerCase()}`), z.style.cssText = `
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
        `, z.innerHTML = `${G}<span>${H}</span>`, z.addEventListener("click", (U) => {
          U.preventDefault(), U.stopPropagation();
          const K = typeof r == "function" ? r() : null;
          if (K != null)
            try {
              const { state: B, dispatch: J } = n.view, _ = B.doc.nodeAt(K);
              if (_ && _.type.name === "resizableImage") {
                const ee = B.tr.setNodeMarkup(K, void 0, {
                  ..._.attrs,
                  align: A
                });
                J(ee);
              }
            } catch {
              n.chain().focus().setNodeSelection(K).updateAttributes("resizableImage", {
                align: A
              }).run();
            }
          S(A);
        }), E.push(z), T.appendChild(z);
      }), f.appendChild(T);
      const k = () => {
        const A = o.attrs.align || "left";
        S(A);
      };
      let N = !1;
      u.addEventListener("click", (A) => {
        if (A.preventDefault(), A.stopPropagation(), N)
          f.style.display = "none", N = !1;
        else {
          const H = u.getBoundingClientRect(), G = 200, z = f.closest('[role="dialog"]');
          let U = 0, K = 0;
          if (z) {
            const ue = z.getBoundingClientRect();
            U = ue.left, K = ue.top;
          }
          let B = H.bottom + 4 - K, J = H.right - G - U;
          const _ = window.innerHeight, ee = window.innerWidth, ne = 200;
          H.bottom + 4 + ne > _ && (B = H.top - ne - 4 - K), J + U < 8 && (J = 8 - U), J + G + U > ee - 8 && (J = ee - G - 8 - U), f.style.top = `${B}px`, f.style.left = `${J}px`, f.style.display = "flex", N = !0, k();
        }
      });
      const C = (A) => {
        !f.contains(A.target) && !u.contains(A.target) && (f.style.display = "none", N = !1);
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
      }), s.appendChild(a), s.appendChild(D), s.appendChild(d), s.appendChild(u);
      const L = s.closest('[role="dialog"]');
      L ? L.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        d.style.opacity = "1", u.style.opacity = "1", D.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        d.style.opacity = "0", D.style.opacity = "0", N || (u.style.opacity = "0");
      }), u.addEventListener("mouseenter", () => {
        u.style.background = "oklch(0.95 0 0)";
      }), u.addEventListener("mouseleave", () => {
        u.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const P = (A) => {
        A.preventDefault(), A.stopPropagation();
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
        const G = document.createElement("img");
        G.src = a.src, G.alt = a.alt || "", G.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const z = document.createElement("button");
        z.setAttribute("type", "button"), z.setAttribute("aria-label", "Close"), z.style.cssText = `
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
        `, z.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', z.addEventListener("mouseenter", () => {
          z.style.background = "rgba(255, 255, 255, 0.25)";
        }), z.addEventListener("mouseleave", () => {
          z.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const U = o.attrs.alt;
        let K = null;
        U && U.trim() && (K = document.createElement("div"), K.style.cssText = `
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
          `, K.textContent = U);
        const B = () => {
          H.style.opacity = "0", G.style.transform = "scale(0.92)", setTimeout(() => H.remove(), 200);
        };
        H.addEventListener("click", (ee) => {
          ee.target === H && B();
        }), z.addEventListener("click", B);
        const J = (ee) => {
          ee.key === "Escape" && (B(), document.removeEventListener("keydown", J));
        };
        document.addEventListener("keydown", J), H.appendChild(G), H.appendChild(z), K && H.appendChild(K);
        const _ = s.closest('[role="dialog"]');
        _ ? _.appendChild(H) : document.body.appendChild(H), requestAnimationFrame(() => {
          H.style.opacity = "1", G.style.transform = "scale(1)";
        });
      };
      D.addEventListener("click", P);
      let O, $;
      const W = (A) => {
        A.preventDefault(), O = A.clientX, $ = a.offsetWidth, document.addEventListener("mousemove", V), document.addEventListener("mouseup", R);
      }, V = (A) => {
        const H = A.clientX - O, G = Math.max(100, $ + H);
        a.style.width = `${G}px`;
      }, R = () => {
        document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", R), setTimeout(() => {
        }, 100);
        const A = typeof r == "function" ? r() : null, H = a.offsetWidth;
        if (A != null)
          try {
            const { state: G, dispatch: z } = n.view, U = G.doc.nodeAt(A);
            if (U && U.type.name === "resizableImage") {
              const K = G.tr.setNodeMarkup(A, void 0, {
                ...U.attrs,
                width: H
              });
              z(K);
            }
          } catch {
            n.chain().focus().setNodeSelection(A).updateAttributes("resizableImage", {
              width: H
            }).run();
          }
      };
      return d.addEventListener("mousedown", W), {
        dom: s,
        update: (A) => A.type.name !== "resizableImage" ? !1 : (o = A, l(A.attrs.src), a.alt = A.attrs.alt || "", A.attrs.width && (a.style.width = `${A.attrs.width}px`), i(A.attrs.align || "left"), !0),
        destroy: () => {
          d.removeEventListener("mousedown", W), D.removeEventListener("click", P), document.removeEventListener("click", C), f.remove();
        }
      };
    };
  }
});
function zb(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Fb = {}, Fn = {};
function zt(e, t) {
  try {
    const r = (Fb[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in Fn ? Fn[r] : _i(r, r.split(":"));
  } catch {
    if (e in Fn) return Fn[e];
    const n = e?.match(Ub);
    return n ? _i(e, n.slice(1)) : NaN;
  }
}
const Ub = /([+-]\d\d):?(\d\d)?/;
function _i(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Fn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class ot extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(zt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Od(this), Os(this)) : this.setTime(Date.now());
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
    const t = -zt(this.timeZone, this);
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
    return new ot(+new Date(t), this.timeZone);
  }
  //#endregion
}
const $i = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!$i.test(e)) return;
  const t = e.replace($i, "$1UTC");
  ot.prototype[t] && (e.startsWith("get") ? ot.prototype[e] = function() {
    return this.internal[t]();
  } : (ot.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Yb(this), +this;
  }, ot.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Os(this), +this;
  }));
});
function Os(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-zt(e.timeZone, e) * 60));
}
function Yb(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Od(e);
}
function Od(e) {
  const t = zt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const d = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, u = Math.round(-(zt(e.timeZone, e) * 60)) % 60;
  (u || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + d));
  const f = zt(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), m = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, b = m - c;
  if (y && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const v = zt(e.timeZone, e), x = v > 0 ? Math.floor(v) : Math.ceil(v), T = p - x;
    T && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + T), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + T));
  }
}
class Ae extends ot {
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
    return `${t} GMT${n}${r}${o} (${zb(this.timeZone, this)})`;
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
const _d = 6048e5, jb = 864e5, Hi = Symbol.for("constructDateFrom");
function ke(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Hi in e ? e[Hi](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function me(e, t) {
  return ke(t || e, e);
}
function $d(e, t, n) {
  const r = me(e, n?.in);
  return isNaN(t) ? ke(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Hd(e, t, n) {
  const r = me(e, n?.in);
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
let Vb = {};
function ir() {
  return Vb;
}
function bn(e, t) {
  const n = ir(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = me(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function Jn(e, t) {
  return bn(e, { ...t, weekStartsOn: 1 });
}
function Bd(e, t) {
  const n = me(e, t?.in), r = n.getFullYear(), o = ke(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Jn(o), i = ke(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = Jn(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function Bi(e) {
  const t = me(e), n = new Date(
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
  const n = ke.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function er(e, t) {
  const n = me(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Wd(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  ), s = er(r), i = er(o), a = +s - Bi(s), c = +i - Bi(i);
  return Math.round((a - c) / jb);
}
function Kb(e, t) {
  const n = Bd(e, t), r = ke(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Jn(r);
}
function Gb(e, t, n) {
  return $d(e, t * 7, n);
}
function qb(e, t, n) {
  return Hd(e, t * 12, n);
}
function Xb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ke.bind(null, o));
    const s = me(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), ke(r, n || NaN);
}
function Zb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ke.bind(null, o));
    const s = me(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), ke(r, n || NaN);
}
function Qb(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  );
  return +er(r) == +er(o);
}
function zd(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Jb(e) {
  return !(!zd(e) && typeof e != "number" || isNaN(+me(e)));
}
function ew(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function tw(e, t) {
  const n = me(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Fd(e, t) {
  const [n, r] = Dn(e, t.start, t.end);
  return { start: n, end: r };
}
function nw(e, t) {
  const { start: n, end: r } = Fd(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(ke(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function rw(e, t) {
  const n = me(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function ow(e, t) {
  const n = me(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Ud(e, t) {
  const n = me(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function sw(e, t) {
  const { start: n, end: r } = Fd(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(ke(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function Yd(e, t) {
  const n = ir(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = me(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function aw(e, t) {
  return Yd(e, { ...t, weekStartsOn: 1 });
}
const iw = {
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
}, cw = (e, t, n) => {
  let r;
  const o = iw[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ds(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const lw = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, dw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, uw = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, fw = {
  date: ds({
    formats: lw,
    defaultWidth: "full"
  }),
  time: ds({
    formats: dw,
    defaultWidth: "full"
  }),
  dateTime: ds({
    formats: uw,
    defaultWidth: "full"
  })
}, pw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, hw = (e, t, n, r) => pw[e];
function $n(e) {
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
const mw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, gw = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, yw = {
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
}, vw = {
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
}, bw = {
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
}, ww = {
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
}, xw = (e, t) => {
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
}, kw = {
  ordinalNumber: xw,
  era: $n({
    values: mw,
    defaultWidth: "wide"
  }),
  quarter: $n({
    values: gw,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: $n({
    values: yw,
    defaultWidth: "wide"
  }),
  day: $n({
    values: vw,
    defaultWidth: "wide"
  }),
  dayPeriod: $n({
    values: bw,
    defaultWidth: "wide",
    formattingValues: ww,
    defaultFormattingWidth: "wide"
  })
};
function Hn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? Ew(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Cw(a, (u) => u.test(i))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const d = t.slice(i.length);
    return { value: l, rest: d };
  };
}
function Cw(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Ew(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Mw(e) {
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
const Tw = /^(\d+)(th|st|nd|rd)?/i, Sw = /\d+/i, Dw = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Nw = {
  any: [/^b/i, /^(a|c)/i]
}, Lw = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Aw = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Iw = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Rw = {
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
}, Pw = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ow = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, _w = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, $w = {
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
}, Hw = {
  ordinalNumber: Mw({
    matchPattern: Tw,
    parsePattern: Sw,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Hn({
    matchPatterns: Dw,
    defaultMatchWidth: "wide",
    parsePatterns: Nw,
    defaultParseWidth: "any"
  }),
  quarter: Hn({
    matchPatterns: Lw,
    defaultMatchWidth: "wide",
    parsePatterns: Aw,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Hn({
    matchPatterns: Iw,
    defaultMatchWidth: "wide",
    parsePatterns: Rw,
    defaultParseWidth: "any"
  }),
  day: Hn({
    matchPatterns: Pw,
    defaultMatchWidth: "wide",
    parsePatterns: Ow,
    defaultParseWidth: "any"
  }),
  dayPeriod: Hn({
    matchPatterns: _w,
    defaultMatchWidth: "any",
    parsePatterns: $w,
    defaultParseWidth: "any"
  })
}, ka = {
  code: "en-US",
  formatDistance: cw,
  formatLong: fw,
  formatRelative: hw,
  localize: kw,
  match: Hw,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Bw(e, t) {
  const n = me(e, t?.in);
  return Wd(n, Ud(n)) + 1;
}
function jd(e, t) {
  const n = me(e, t?.in), r = +Jn(n) - +Kb(n);
  return Math.round(r / _d) + 1;
}
function Vd(e, t) {
  const n = me(e, t?.in), r = n.getFullYear(), o = ir(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = ke(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = bn(i, t), c = ke(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = bn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function Ww(e, t) {
  const n = ir(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Vd(e, t), s = ke(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), bn(s, t);
}
function Kd(e, t) {
  const n = me(e, t?.in), r = +bn(n, t) - +Ww(n, t);
  return Math.round(r / _d) + 1;
}
function pe(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Et = {
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
    return Et.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Vd(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return pe(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : pe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Bd(e);
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
        return Et.M(e, t);
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
    const o = Kd(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : pe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = jd(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : pe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Et.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Bw(e);
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
    return Et.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Et.H(e, t);
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
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Fi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Ht(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Ht(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Fi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Ht(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Ht(r, ":");
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
        return "GMT" + Ht(r, ":");
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
        return "GMT" + Ht(r, ":");
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
function Fi(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + pe(Math.abs(e) / 60, 2) : Ht(e, t);
}
function Ht(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = pe(Math.trunc(r / 60), 2), s = pe(r % 60, 2);
  return n + o + t + s;
}
const Ui = (e, t) => {
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
}, Gd = (e, t) => {
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
}, zw = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Ui(e, t);
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
  return s.replace("{{date}}", Ui(r, t)).replace("{{time}}", Gd(o, t));
}, Fw = {
  p: Gd,
  P: zw
}, Uw = /^D+$/, Yw = /^Y+$/, jw = ["D", "DD", "YY", "YYYY"];
function Vw(e) {
  return Uw.test(e);
}
function Kw(e) {
  return Yw.test(e);
}
function Gw(e, t, n) {
  const r = qw(e, t, n);
  if (console.warn(r), jw.includes(e)) throw new RangeError(r);
}
function qw(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Xw = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Zw = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Qw = /^'([^]*?)'?$/, Jw = /''/g, e0 = /[a-zA-Z]/;
function t0(e, t, n) {
  const r = ir(), o = n?.locale ?? r.locale ?? ka, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = me(e, n?.in);
  if (!Jb(a))
    throw new RangeError("Invalid time value");
  let c = t.match(Zw).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const f = Fw[u];
      return f(d, o.formatLong);
    }
    return d;
  }).join("").match(Xw).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: n0(d) };
    if (Wi[u])
      return { isToken: !0, value: d };
    if (u.match(e0))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + u + "`"
      );
    return { isToken: !1, value: d };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(a, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: o
  };
  return c.map((d) => {
    if (!d.isToken) return d.value;
    const u = d.value;
    (!n?.useAdditionalWeekYearTokens && Kw(u) || !n?.useAdditionalDayOfYearTokens && Vw(u)) && Gw(u, t, String(e));
    const f = Wi[u[0]];
    return f(a, u, o.localize, l);
  }).join("");
}
function n0(e) {
  const t = e.match(Qw);
  return t ? t[1].replace(Jw, "'") : e;
}
function r0(e, t) {
  const n = me(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = ke(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function o0(e, t) {
  return me(e, t?.in).getMonth();
}
function s0(e, t) {
  return me(e, t?.in).getFullYear();
}
function a0(e, t) {
  return +me(e) > +me(t);
}
function i0(e, t) {
  return +me(e) < +me(t);
}
function c0(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function l0(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function d0(e, t, n) {
  const r = me(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = ke(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = r0(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function u0(e, t, n) {
  const r = me(e, n?.in);
  return isNaN(+r) ? ke(e, NaN) : (r.setFullYear(t), r);
}
const Yi = 5, f0 = 4;
function p0(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Yi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Yi : f0;
}
function qd(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function h0(e, t) {
  const n = qd(e, t), r = p0(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ae.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Ae(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : $d(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Hd(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Gb(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : qb(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Wd(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : ew(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : nw(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : sw(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : h0(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : aw(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : tw(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Yd(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : ow(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : t0(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : jd(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : o0(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : s0(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Kd(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : a0(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : i0(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : zd(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Qb(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : c0(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : l0(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Xb(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Zb(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : d0(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : u0(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : qd(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : er(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Jn(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : rw(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : bn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Ud(r), this.options = { locale: ka, ...t }, this.overrides = n;
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
const ct = new Fe();
class Xd {
  constructor(t, n, r = ct) {
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
class m0 {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class g0 {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function y0(e) {
  return X.createElement("button", { ...e });
}
function v0(e) {
  return X.createElement("span", { ...e });
}
function b0(e) {
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
function w0(e) {
  const { day: t, modifiers: n, ...r } = e;
  return X.createElement("td", { ...r });
}
function x0(e) {
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
var Be;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Be || (Be = {}));
function k0(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[te.Dropdown], n].join(" "), a = t?.find(({ value: c }) => c === s.value);
  return X.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[te.DropdownRoot] },
    X.createElement(r.Select, { className: i, ...s }, t?.map(({ value: c, label: l, disabled: d }) => X.createElement(r.Option, { key: c, value: c, disabled: d }, l))),
    X.createElement(
      "span",
      { className: o[te.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      X.createElement(r.Chevron, { orientation: "down", size: 18, className: o[te.Chevron] })
    )
  );
}
function C0(e) {
  return X.createElement("div", { ...e });
}
function E0(e) {
  return X.createElement("div", { ...e });
}
function M0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r }, e.children);
}
function T0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r });
}
function S0(e) {
  return X.createElement("table", { ...e });
}
function D0(e) {
  return X.createElement("div", { ...e });
}
const Zd = gc(void 0);
function cr() {
  const e = yc(Zd);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function N0(e) {
  const { components: t } = cr();
  return X.createElement(t.Dropdown, { ...e });
}
function L0(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = cr(), d = F((f) => {
    o && n?.(f);
  }, [o, n]), u = F((f) => {
    r && t?.(f);
  }, [r, t]);
  return X.createElement(
    "nav",
    { ...s },
    X.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[te.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      X.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[te.Chevron], orientation: "left" })
    ),
    X.createElement(
      i.NextMonthButton,
      { type: "button", className: a[te.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      X.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[te.Chevron] })
    )
  );
}
function A0(e) {
  const { components: t } = cr();
  return X.createElement(t.Button, { ...e });
}
function I0(e) {
  return X.createElement("option", { ...e });
}
function R0(e) {
  const { components: t } = cr();
  return X.createElement(t.Button, { ...e });
}
function P0(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function O0(e) {
  return X.createElement("select", { ...e });
}
function _0(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function $0(e) {
  return X.createElement("th", { ...e });
}
function H0(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function B0(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function W0(e) {
  return X.createElement("th", { ...e });
}
function z0(e) {
  return X.createElement("tbody", { ...e });
}
function F0(e) {
  const { components: t } = cr();
  return X.createElement(t.Dropdown, { ...e });
}
const U0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: y0,
  CaptionLabel: v0,
  Chevron: b0,
  Day: w0,
  DayButton: x0,
  Dropdown: k0,
  DropdownNav: C0,
  Footer: E0,
  Month: M0,
  MonthCaption: T0,
  MonthGrid: S0,
  Months: D0,
  MonthsDropdown: N0,
  Nav: L0,
  NextMonthButton: A0,
  Option: I0,
  PreviousMonthButton: R0,
  Root: P0,
  Select: O0,
  Week: _0,
  WeekNumber: B0,
  WeekNumberHeader: W0,
  Weekday: $0,
  Weekdays: H0,
  Weeks: z0,
  YearsDropdown: F0
}, Symbol.toStringTag, { value: "Module" }));
function ft(e, t, n = !1, r = ct) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function Qd(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ca(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Jd(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function eu(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function tu(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function nu(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function pt(e, t, n = ct) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (nu(a, n))
      return a.includes(e);
    if (Ca(a))
      return ft(a, e, !1, n);
    if (tu(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (Qd(a)) {
      const c = s(a.before, e), l = s(a.after, e), d = c > 0, u = l < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return Jd(a) ? s(e, a.after) > 0 : eu(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function Y0(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: d } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: g, endOfMonth: m, isAfter: y } = o, b = n && p(n), v = r && m(r), x = {
    [ge.focused]: [],
    [ge.outside]: [],
    [ge.disabled]: [],
    [ge.hidden]: [],
    [ge.today]: []
  }, T = {};
  for (const w of e) {
    const { date: E, displayMonth: S } = w, k = !!(S && !f(E, S)), N = !!(b && g(E, b)), C = !!(v && y(E, v)), D = !!(s && pt(E, s, o)), L = !!(i && pt(E, i, o)) || N || C || // Broadcast calendar will show outside days as default
    !l && !c && k || l && c === !1 && k, P = u(E, d ?? o.today());
    k && x.outside.push(w), D && x.disabled.push(w), L && x.hidden.push(w), P && x.today.push(w), a && Object.keys(a).forEach((O) => {
      const $ = a?.[O];
      $ && pt(E, $, o) && (T[O] ? T[O].push(w) : T[O] = [w]);
    });
  }
  return (w) => {
    const E = {
      [ge.focused]: !1,
      [ge.disabled]: !1,
      [ge.hidden]: !1,
      [ge.outside]: !1,
      [ge.today]: !1
    }, S = {};
    for (const k in x) {
      const N = x[k];
      E[k] = N.some((C) => C === w);
    }
    for (const k in T)
      S[k] = T[k].some((N) => N === w);
    return {
      ...E,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function j0(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ge[s]] ? o.push(t[ge[s]]) : t[Xe[s]] && o.push(t[Xe[s]]), o), [t[te.Day]]);
}
function V0(e) {
  return {
    ...U0,
    ...e
  };
}
function K0(e) {
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
function Ea() {
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
function ru(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const G0 = ru;
function q0(e, t, n) {
  return (n ?? new Fe(t)).format(e, "d");
}
function X0(e, t = ct) {
  return t.format(e, "LLLL");
}
function Z0(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccccc");
}
function Q0(e, t = ct) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function J0() {
  return "";
}
function ou(e, t = ct) {
  return t.format(e, "yyyy");
}
const ex = ou, tx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: ru,
  formatDay: q0,
  formatMonthCaption: G0,
  formatMonthDropdown: X0,
  formatWeekNumber: Q0,
  formatWeekNumberHeader: J0,
  formatWeekdayName: Z0,
  formatYearCaption: ex,
  formatYearDropdown: ou
}, Symbol.toStringTag, { value: "Module" }));
function nx(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...tx,
    ...e
  };
}
function rx(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), g = l(f), m = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: p, disabled: m };
  });
}
function ox(e, t = {}, n = {}) {
  let r = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function sx(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function ax(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: i, eachYearOfInterval: a, getYear: c } = r, l = s(e), d = i(t), u = a({ start: l, end: d });
  return o && u.reverse(), u.map((f) => {
    const p = n.formatYearDropdown(f, r);
    return {
      value: c(f),
      label: p,
      disabled: !1
    };
  });
}
function su(e, t, n, r) {
  let o = (r ?? new Fe(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const ix = su;
function au(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const cx = au;
function lx(e, t, n, r) {
  let o = (r ?? new Fe(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function dx(e) {
  return "Choose the Month";
}
function ux() {
  return "";
}
function fx(e) {
  return "Go to the Next Month";
}
function px(e) {
  return "Go to the Previous Month";
}
function hx(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccc");
}
function mx(e, t) {
  return `Week ${e}`;
}
function gx(e) {
  return "Week Number";
}
function yx(e) {
  return "Choose the Year";
}
const vx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: cx,
  labelDay: ix,
  labelDayButton: su,
  labelGrid: au,
  labelGridcell: lx,
  labelMonthDropdown: dx,
  labelNav: ux,
  labelNext: fx,
  labelPrevious: px,
  labelWeekNumber: mx,
  labelWeekNumberHeader: gx,
  labelWeekday: hx,
  labelYearDropdown: yx
}, Symbol.toStringTag, { value: "Module" })), lr = (e) => e instanceof HTMLElement ? e : null, us = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], bx = (e) => lr(e.querySelector("[data-animated-month]")), fs = (e) => lr(e.querySelector("[data-animated-caption]")), ps = (e) => lr(e.querySelector("[data-animated-weeks]")), wx = (e) => lr(e.querySelector("[data-animated-nav]")), xx = (e) => lr(e.querySelector("[data-animated-weekdays]"));
function kx(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = Y(null), a = Y(r), c = Y(!1);
  ho(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const d = s.isSameMonth(r[0].date, l[0].date), u = s.isAfter(r[0].date, l[0].date), f = u ? n[Be.caption_after_enter] : n[Be.caption_before_enter], p = u ? n[Be.weeks_after_enter] : n[Be.weeks_before_enter], g = i.current, m = e.current.cloneNode(!0);
    if (m instanceof HTMLElement ? (us(m).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const T = bx(x);
      T && x.contains(T) && x.removeChild(T);
      const w = fs(x);
      w && w.classList.remove(f);
      const E = ps(x);
      E && E.classList.remove(p);
    }), i.current = m) : i.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = g instanceof HTMLElement ? us(g) : [], b = us(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && y && y.every((v) => v instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const v = wx(e.current);
      v && (v.style.zIndex = "1"), b.forEach((x, T) => {
        const w = y[T];
        if (!w)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const E = fs(x);
        E && E.classList.add(f);
        const S = ps(x);
        S && S.classList.add(p);
        const k = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), E && E.classList.remove(f), S && S.classList.remove(p), x.style.position = "", x.style.overflow = "", x.contains(w) && x.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const N = xx(w);
        N && (N.style.opacity = "0");
        const C = fs(w);
        C && (C.classList.add(u ? n[Be.caption_before_exit] : n[Be.caption_after_exit]), C.addEventListener("animationend", k));
        const D = ps(w);
        D && D.classList.add(u ? n[Be.weeks_before_exit] : n[Be.weeks_after_exit]), x.insertBefore(w, x.firstChild);
      });
    }
  });
}
function Cx(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: g, endOfWeek: m, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: x } = r, T = c ? b(o, r) : i ? v(o) : x(o), w = c ? f(s) : i ? p(g(s)) : m(g(s)), E = d(w, T), S = u(s, o) + 1, k = [];
  for (let D = 0; D <= E; D++) {
    const L = l(T, D);
    if (t && y(L, t))
      break;
    k.push(L);
  }
  const C = (c ? 35 : 42) * S;
  if (a && k.length < C) {
    const D = C - k.length;
    for (let L = 0; L < D; L++) {
      const P = l(k[k.length - 1], 1);
      k.push(P);
    }
  }
  return k;
}
function Ex(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Mx(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function ji(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: d, startOfMonth: u } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = d(n, f);
  }
  return t && l(c, t) < 0 && (c = t), u(c);
}
function Tx(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, g = e.reduce((m, y) => {
    const b = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? f(y) : p(y), v = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), x = t.filter((S) => S >= b && S <= v), T = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < T) {
      const S = t.filter((k) => {
        const N = T - x.length;
        return k > v && k <= o(v, N);
      });
      x.push(...S);
    }
    const w = x.reduce((S, k) => {
      const N = n.ISOWeek ? l(k) : d(k), C = S.find((L) => L.weekNumber === N), D = new Xd(k, y, r);
      return C ? C.days.push(D) : S.push(new g0(N, [D])), S;
    }, []), E = new m0(y, w);
    return m.push(E), m;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function Sx(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: d, today: u } = t, { fromYear: f, toYear: p, fromMonth: g, toMonth: m } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !r && m && (r = m), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = d(f, 0, 1) : !n && y && (n = o(c(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = l(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function Dx(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, d = i(e);
  if (!t)
    return a(d, l);
  if (!(c(t, e) < s))
    return a(d, l);
}
function Nx(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -l);
  if (!(c(d, t) <= 0))
    return a(d, -l);
}
function Lx(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Lo(e, t) {
  const [n, r] = j(e);
  return [t === void 0 ? n : t, r];
}
function Ax(e, t) {
  const [n, r] = Sx(e, t), { startOfMonth: o, endOfMonth: s } = t, i = ji(e, n, r, t), [a, c] = Lo(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  q(() => {
    const E = ji(e, n, r, t);
    c(E);
  }, [e.timeZone]);
  const l = Mx(a, r, e, t), d = Cx(l, e.endMonth ? s(e.endMonth) : void 0, e, t), u = Tx(l, d, e, t), f = Lx(u), p = Ex(u), g = Nx(a, n, e, t), m = Dx(a, r, e, t), { disableNavigation: y, onMonthChange: b } = e, v = (E) => f.some((S) => S.days.some((k) => k.isEqualTo(E))), x = (E) => {
    if (y)
      return;
    let S = o(E);
    n && S < o(n) && (S = o(n)), r && S > o(r) && (S = o(r)), c(S), b?.(S);
  };
  return {
    months: u,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: g,
    nextMonth: m,
    goToMonth: x,
    goToDay: (E) => {
      v(E) || x(E.date);
    }
  };
}
var tt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(tt || (tt = {}));
function Vi(e) {
  return !e[ge.disabled] && !e[ge.hidden] && !e[ge.outside];
}
function Ix(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    Vi(a) && (a[ge.focused] && s < tt.FocusedModifier ? (o = i, s = tt.FocusedModifier) : r?.isEqualTo(i) && s < tt.LastFocused ? (o = i, s = tt.LastFocused) : n(i.date) && s < tt.Selected ? (o = i, s = tt.Selected) : a[ge.today] && s < tt.Today && (o = i, s = tt.Today));
  }
  return o || (o = e.find((i) => Vi(t(i)))), o;
}
function Rx(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: d, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: g, endOfWeek: m, max: y, min: b, startOfBroadcastWeek: v, startOfISOWeek: x, startOfWeek: T } = i;
  let E = {
    day: l,
    week: u,
    month: d,
    year: f,
    startOfWeek: (S) => c ? v(S, i) : a ? x(S) : T(S),
    endOfWeek: (S) => c ? p(S) : a ? g(S) : m(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? E = y([r, E]) : t === "after" && o && (E = b([o, E])), E;
}
function iu(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = Rx(e, t, n.date, r, o, s, i), l = !!(s.disabled && pt(c, s.disabled, i)), d = !!(s.hidden && pt(c, s.hidden, i)), u = c, f = new Xd(c, u, i);
  return !l && !d ? f : iu(e, t, f, r, o, s, i, a + 1);
}
function Px(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = j(), c = Ix(t.days, n, r || (() => !1), i), [l, d] = j(s ? c : void 0);
  return {
    isFocusTarget: (m) => !!c?.isEqualTo(m),
    setFocused: d,
    focused: l,
    blur: () => {
      a(l), d(void 0);
    },
    moveFocus: (m, y) => {
      if (!l)
        return;
      const b = iu(m, y, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(b)) || (t.goToDay(b), d(b)));
    }
  };
}
function Ox(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Lo(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((g) => c(g, p)) ?? !1, { min: d, max: u } = e;
  return {
    selected: a,
    select: (p, g, m) => {
      let y = [...a ?? []];
      if (l(p)) {
        if (a?.length === d || r && a?.length === 1)
          return;
        y = a?.filter((b) => !c(b, p));
      } else
        a?.length === u ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, g, m), y;
    },
    isSelected: l
  };
}
function _x(e, t, n = 0, r = 0, o = !1, s = ct) {
  const { from: i, to: a } = t || {}, { isSameDay: c, isAfter: l, isBefore: d } = s;
  let u;
  if (!i && !a)
    u = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !a)
    c(i, e) ? n === 0 ? u = { from: i, to: e } : o ? u = { from: i, to: void 0 } : u = void 0 : d(e, i) ? u = { from: e, to: i } : u = { from: i, to: e };
  else if (i && a)
    if (c(i, e) && c(a, e))
      o ? u = { from: i, to: a } : u = void 0;
    else if (c(i, e))
      u = { from: i, to: n > 0 ? void 0 : e };
    else if (c(a, e))
      u = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, i))
      u = { from: e, to: a };
    else if (l(e, i))
      u = { from: i, to: e };
    else if (l(e, a))
      u = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (u?.from && u?.to) {
    const f = s.differenceInCalendarDays(u.to, u.from);
    r > 0 && f > r ? u = { from: e, to: void 0 } : n > 1 && f < n && (u = { from: e, to: void 0 });
  }
  return u;
}
function $x(e, t, n = ct) {
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
function Ki(e, t, n = ct) {
  return ft(e, t.from, !1, n) || ft(e, t.to, !1, n) || ft(t, e.from, !1, n) || ft(t, e.to, !1, n);
}
function Hx(e, t, n = ct) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? ft(e, a, !1, n) : nu(a, n) ? a.some((c) => ft(e, c, !1, n)) : Ca(a) ? a.from && a.to ? Ki(e, { from: a.from, to: a.to }, n) : !1 : tu(a) ? $x(e, a.dayOfWeek, n) : Qd(a) ? n.isAfter(a.before, a.after) ? Ki(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : pt(e.from, a, n) || pt(e.to, a, n) : Jd(a) || eu(a) ? pt(e.from, a, n) || pt(e.to, a, n) : !1))
    return !0;
  const i = r.filter((a) => typeof a == "function");
  if (i.length) {
    let a = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (i.some((d) => d(a)))
        return !0;
      a = n.addDays(a, 1);
    }
  }
  return !1;
}
function Bx(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = Lo(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, g) => {
      const { min: m, max: y } = e, b = f ? _x(f, l, m, y, s, t) : void 0;
      return r && n && b?.from && b.to && Hx({ from: b.from, to: b.to }, n, t) && (b.from = f, b.to = void 0), i || c(b), i?.(b, f, p, g), b;
    },
    isSelected: (f) => l && ft(l, f, !1, t)
  };
}
function Wx(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Lo(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (u, f, p) => {
      let g = u;
      return !r && a && a && c(u, a) && (g = void 0), o || i(g), o?.(g, u, f, p), g;
    },
    isSelected: (u) => a ? c(a, u) : !1
  };
}
function zx(e, t) {
  const n = Wx(e, t), r = Ox(e, t), o = Bx(e, t);
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
function Fx(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ae(t.today, t.timeZone)), t.month && (t.month = new Ae(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ae(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ae(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ae(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ae(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ce) => new Ae(ce, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ae(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ae(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = St(() => {
    const ce = { ...ka, ...t.locale };
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
      components: V0(t.components),
      formatters: nx(t.formatters),
      labels: { ...vx, ...t.labels },
      locale: ce,
      classNames: { ...Ea(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: d, numberOfMonths: u = 1, onDayBlur: f, onDayClick: p, onDayFocus: g, onDayKeyDown: m, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: v, onPrevClick: x, showWeekNumber: T, styles: w } = t, { formatCaption: E, formatDay: S, formatMonthDropdown: k, formatWeekNumber: N, formatWeekNumberHeader: C, formatWeekdayName: D, formatYearDropdown: L } = r, P = Ax(t, s), { days: O, months: $, navStart: W, navEnd: V, previousMonth: R, nextMonth: A, goToMonth: H } = P, G = Y0(O, t, W, V, s), { isSelected: z, select: U, selected: K } = zx(t, s) ?? {}, { blur: B, focused: J, isFocusTarget: _, moveFocus: ee, setFocused: ne } = Px(t, P, G, z ?? (() => !1), s), { labelDayButton: ue, labelGridcell: ve, labelGrid: be, labelMonthDropdown: Ue, labelNav: It, labelPrevious: wt, labelNext: Nn, labelWeekday: Ln, labelWeekNumber: dr, labelWeekNumberHeader: ur, labelYearDropdown: fr } = o, pr = St(() => sx(s, t.ISOWeek), [s, t.ISOWeek]), An = l !== void 0 || p !== void 0, qt = F(() => {
    R && (H(R), x?.(R));
  }, [R, H, x]), Xt = F(() => {
    A && (H(A), v?.(A));
  }, [H, A, v]), Zt = F((ce, he) => (oe) => {
    oe.preventDefault(), oe.stopPropagation(), ne(ce), U?.(ce.date, he, oe), p?.(ce.date, he, oe);
  }, [U, p, ne]), hr = F((ce, he) => (oe) => {
    ne(ce), g?.(ce.date, he, oe);
  }, [g, ne]), mr = F((ce, he) => (oe) => {
    B(), f?.(ce.date, he, oe);
  }, [B, f]), gr = F((ce, he) => (oe) => {
    const fe = {
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
    if (fe[oe.key]) {
      oe.preventDefault(), oe.stopPropagation();
      const [Te, de] = fe[oe.key];
      ee(Te, de);
    }
    m?.(ce.date, he, oe);
  }, [ee, m, t.dir]), yr = F((ce, he) => (oe) => {
    y?.(ce.date, he, oe);
  }, [y]), Io = F((ce, he) => (oe) => {
    b?.(ce.date, he, oe);
  }, [b]), Ro = F((ce) => (he) => {
    const oe = Number(he.target.value), fe = s.setMonth(s.startOfMonth(ce), oe);
    H(fe);
  }, [s, H]), Po = F((ce) => (he) => {
    const oe = Number(he.target.value), fe = s.setYear(s.startOfMonth(ce), oe);
    H(fe);
  }, [s, H]), { className: Oo, style: _o } = St(() => ({
    className: [a[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[te.Root], ...t.style }
  }), [a, t.className, t.style, w]), vr = K0(t), br = Y(null);
  kx(br, !!t.animate, {
    classNames: a,
    months: $,
    focused: J,
    dateLib: s
  });
  const $o = {
    dayPickerProps: t,
    selected: K,
    select: U,
    isSelected: z,
    months: $,
    nextMonth: A,
    previousMonth: R,
    goToMonth: H,
    getModifiers: G,
    components: n,
    classNames: a,
    styles: w,
    labels: o,
    formatters: r
  };
  return X.createElement(
    Zd.Provider,
    { value: $o },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? br : void 0, className: Oo, style: _o, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...vr },
      X.createElement(
        n.Months,
        { className: a[te.Months], style: w?.[te.Months] },
        !t.hideNavigation && !d && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: w?.[te.Nav], "aria-label": It(), onPreviousClick: qt, onNextClick: Xt, previousMonth: R, nextMonth: A }),
        $.map((ce, he) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[te.Month],
            style: w?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: he,
            displayIndex: he,
            calendarMonth: ce
          },
          d === "around" && !t.hideNavigation && he === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[te.PreviousMonthButton], tabIndex: R ? void 0 : -1, "aria-disabled": R ? void 0 : !0, "aria-label": wt(R), onClick: qt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: R ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[te.MonthCaption], style: w?.[te.MonthCaption], calendarMonth: ce, displayIndex: he }, c?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: a[te.Dropdowns], style: w?.[te.Dropdowns] },
            (() => {
              const oe = c === "dropdown" || c === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: a[te.MonthsDropdown], "aria-label": Ue(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Ro(ce.date), options: rx(ce.date, W, V, r, s), style: w?.[te.Dropdown], value: s.getMonth(ce.date) }) : X.createElement("span", { key: "month" }, k(ce.date, s)), fe = c === "dropdown" || c === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: a[te.YearsDropdown], "aria-label": fr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Po(ce.date), options: ax(W, V, r, s, !!t.reverseYears), style: w?.[te.Dropdown], value: s.getYear(ce.date) }) : X.createElement("span", { key: "year" }, L(ce.date, s));
              return s.getMonthYearOrder() === "year-first" ? [fe, oe] : [oe, fe];
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
            } }, E(ce.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: a[te.CaptionLabel], role: "status", "aria-live": "polite" }, E(ce.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && he === u - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: a[te.NextMonthButton], tabIndex: A ? void 0 : -1, "aria-disabled": A ? void 0 : !0, "aria-label": Nn(A), onClick: Xt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: A ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          he === u - 1 && d === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: w?.[te.Nav], "aria-label": It(), onPreviousClick: qt, onNextClick: Xt, previousMonth: R, nextMonth: A }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": be(ce.date, s.options, s) || void 0, className: a[te.MonthGrid], style: w?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[te.Weekdays], style: w?.[te.Weekdays] },
              T && X.createElement(n.WeekNumberHeader, { "aria-label": ur(s.options), className: a[te.WeekNumberHeader], style: w?.[te.WeekNumberHeader], scope: "col" }, C()),
              pr.map((oe) => X.createElement(n.Weekday, { "aria-label": Ln(oe, s.options, s), className: a[te.Weekday], key: String(oe), style: w?.[te.Weekday], scope: "col" }, D(oe, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[te.Weeks], style: w?.[te.Weeks] }, ce.weeks.map((oe) => X.createElement(
              n.Week,
              { className: a[te.Week], key: oe.weekNumber, style: w?.[te.Week], week: oe },
              T && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: oe, style: w?.[te.WeekNumber], "aria-label": dr(oe.weekNumber, {
                locale: i
              }), className: a[te.WeekNumber], scope: "row", role: "rowheader" }, N(oe.weekNumber, s)),
              oe.days.map((fe) => {
                const { date: Te } = fe, de = G(fe);
                if (de[ge.focused] = !de.hidden && !!J?.isEqualTo(fe), de[Xe.selected] = z?.(Te) || de.selected, Ca(K)) {
                  const { from: In, to: en } = K;
                  de[Xe.range_start] = !!(In && en && s.isSameDay(Te, In)), de[Xe.range_end] = !!(In && en && s.isSameDay(Te, en)), de[Xe.range_middle] = ft(K, Te, !0, s);
                }
                const Ho = ox(de, w, t.modifiersStyles), Qt = j0(de, a, t.modifiersClassNames), Jt = !An && !de.hidden ? ve(Te, de, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Te, "yyyy-MM-dd")}_${s.format(fe.displayMonth, "yyyy-MM")}`, day: fe, modifiers: de, className: Qt.join(" "), style: Ho, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": Jt, "data-day": s.format(Te, "yyyy-MM-dd"), "data-month": fe.outside ? s.format(Te, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": fe.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && An ? X.createElement(n.DayButton, { className: a[te.DayButton], style: w?.[te.DayButton], type: "button", day: fe, modifiers: de, disabled: de.disabled || void 0, tabIndex: _(fe) ? 0 : -1, "aria-label": ue(Te, de, s.options, s), onClick: Zt(fe, de), onBlur: mr(fe, de), onFocus: hr(fe, de), onKeyDown: gr(fe, de), onMouseEnter: yr(fe, de), onMouseLeave: Io(fe, de) }, S(Te, s.options, s)) : !de.hidden && S(fe.date, s.options, s))
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
function Ux({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const c = Ea();
  return /* @__PURE__ */ h(
    Fx,
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
          Ls({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: ae(
          Ls({ variant: o }),
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
        Root: ({ className: l, rootRef: d, ...u }) => /* @__PURE__ */ h(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: ae(l),
            ...u
          }
        ),
        Chevron: ({ className: l, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ h(xf, { className: ae("size-4", l), ...u }) : d === "right" ? /* @__PURE__ */ h(
          kf,
          {
            className: ae("size-4", l),
            ...u
          }
        ) : /* @__PURE__ */ h(Cf, { className: ae("size-4", l), ...u }),
        DayButton: Yx,
        WeekNumber: ({ children: l, ...d }) => /* @__PURE__ */ h("td", { ...d, children: /* @__PURE__ */ h("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function Yx({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ea(), s = M.useRef(null);
  return M.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ h(
    Ut,
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
const cu = /* @__PURE__ */ new Map(), jx = /* @__PURE__ */ new Map();
function Jr() {
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
function Vx(e) {
  return hn?.pillDate === e;
}
function Kx({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = Y(null), i = Ao(e);
  q(() => {
    const v = (x) => {
      x.key === "Escape" && (x.stopPropagation(), x.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), q(() => {
    const v = (T) => {
      s.current && !s.current.contains(T.target) && (T.target.closest(".date-pill") || o());
    }, x = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(x), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const a = F((v) => {
    v && r(gn(v)), o();
  }, [r, o]), c = F((v) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + v), r(gn(x)), o();
  }, [r, o]), l = F(() => {
    const x = (/* @__PURE__ */ new Date()).getDay(), T = x === 0 ? 1 : 8 - x, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + T), r(gn(w)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), f = new Date(d);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), g = d.getDay(), m = g === 0 ? 1 : 8 - g, y = new Date(d);
  y.setDate(y.getDate() + m);
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
        /* @__PURE__ */ h(
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
        /* @__PURE__ */ h("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ I("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ h("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ h(
            Ux,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ h("div", { className: "border-t border-border" }),
          /* @__PURE__ */ I("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ h(
              Ut,
              {
                variant: "outline",
                size: "sm",
                className: ae(
                  "rounded-full text-xs",
                  i.toDateString() === u && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ h(
              Ut,
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
            /* @__PURE__ */ h(
              Ut,
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
function Gx(e, t, n) {
  if (Vx(t)) {
    Jr();
    return;
  }
  Jr();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, d = s - r.bottom - c - l, u = r.top - c - l, f = d >= a ? "below" : u >= a ? "above" : d >= u ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + c : p = r.top - a - c;
  const g = r.left + r.width / 2;
  let m = g - i / 2;
  m + i > o - l && (m = o - i - l), m < l && (m = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    y.addEventListener(w, (E) => {
      E.stopPropagation();
    }, !1);
  });
  const v = vp(y);
  hn = { container: y, root: v, pillDate: t };
  const x = () => {
    Jr();
  }, T = (w) => {
    const E = cu.get(t);
    E && E(w);
  };
  v.render(
    /* @__PURE__ */ h(
      Kx,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: m, direction: f, pillCenter: g },
        onSelectDate: T,
        onClose: x
      }
    )
  );
}
function qx({ node: e, updateAttributes: t, selected: n }) {
  const r = Y(null), o = e.attrs.date || mn(), s = lu(o), i = Ma(o), a = F(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const d = c.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return q(() => (cu.set(o, (c) => {
    t({ date: c });
  }), jx.set(o, a), () => {
  }), [o, t, a]), q(() => {
    const c = r.current;
    if (!c) return;
    const l = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = c.getAttribute("data-date") || mn(), f = a();
      Gx(c, u, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), q(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      hn && Jr();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ h(eo, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ h(Ec, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ h("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Ao(e) {
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
function jn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function gn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function lu(e) {
  const t = Ao(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function Xx(e) {
  return Ao(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Bt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return mn();
  if (n === "tomorrow") return jn(1);
  if (n === "yesterday") return jn(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return jn(c);
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
      const c = parseInt(r[2], 10), l = r[3] ? parseInt(r[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), d = new Date(l, a, c);
      return gn(d);
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
function Ma(e) {
  const t = Ao(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Zx = new Ne("datePillPaste"), Qx = yo.create({
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
    const n = e.attrs.date, r = lu(n), o = Ma(n);
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
    return mc(qx, {
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
    const e = new _e({
      find: /@today\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(mn()).run();
      }
    }), t = new _e({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(jn(1)).run();
      }
    }), n = new _e({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(jn(-1)).run();
      }
    }), r = new _e({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), o = new _e({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: d, chain: u, match: f }) => {
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
          const m = (/* @__PURE__ */ new Date()).getFullYear(), y = new Date(m, g, parseInt(f[2], 10));
          u().deleteRange(d).insertDatePill(gn(y)).run();
        }
      }
    }), s = new _e({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Bt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), i = new _e({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Bt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), a = new _e({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), c = new _e({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Bt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), l = new _e({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Bt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
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
      new De({
        key: Zx,
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
              if (Bt(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const m = new RegExp(i.source, i.flags);
            let y;
            for (; (y = m.exec(o)) !== null; ) {
              const T = y[1], w = Bt(T);
              if (w) {
                const E = o.slice(g, y.index);
                E && p.push(f.text(E)), p.push(e.create({ date: w })), g = y.index + y[0].length;
              }
            }
            const b = o.slice(g);
            if (b && p.push(f.text(b)), p.length === 0) return !1;
            const v = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: x } = d.selection;
            if (x.parent.type.name === "paragraph") {
              const T = u;
              let w = d.selection.from;
              for (const E of p)
                T.insert(w, E), w += E.nodeSize;
              T.delete(d.selection.from, d.selection.to), t.dispatch(T);
            } else
              u.replaceSelectionWith(v), t.dispatch(u);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), qe = /* @__PURE__ */ new Map();
function Jx({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = Y(null), i = Y(null), a = e.attrs.tag || "", c = Y(!1), [l, d] = j(() => qe.has(a)), [u, f] = j(() => qe.get(a)?.value ?? a);
  q(() => {
    l || f(a);
  }, [a, l]), q(() => {
    if (l) {
      const v = qe.get(a);
      qe.set(a, {
        value: u,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [l, u, a]);
  const p = F((v) => {
    if (c.current) return;
    c.current = !0;
    const x = v.trim().replace(/^#/, ""), T = Vn(x);
    if (qe.delete(a), T && qe.delete(T), !T || !dn(T))
      o();
    else if (T !== a) {
      const w = r();
      if (typeof w == "number" && n) {
        const { tr: E } = n.state, S = e.nodeSize;
        E.delete(w, w + S), E.insert(w, n.schema.nodes.tagPill.create({ tag: T })), n.view.dispatch(E);
      }
    } else
      qe.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), g = F(() => {
    n && !n.isEditable || (qe.set(a, { value: a, focusedAt: Date.now() }), f(a), d(!0), c.current = !1);
  }, [n, a]);
  q(() => {
    const v = s.current;
    if (!v || l) return;
    const x = (w) => {
      w.preventDefault(), w.stopPropagation(), g();
    }, T = (w) => {
      w.preventDefault(), w.stopPropagation();
    };
    return v.addEventListener("dblclick", x), v.addEventListener("click", T), () => {
      v.removeEventListener("dblclick", x), v.removeEventListener("click", T);
    };
  }, [l, n, r, g]), q(() => {
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
  const m = F((v) => {
    v.key === "Enter" ? (v.preventDefault(), p(u)) : v.key === "Escape" && (v.preventDefault(), qe.delete(a), d(!1), c.current = !0, n?.commands.focus());
  }, [p, u, a, n]), y = F(() => {
    const x = qe.get(a)?.focusedAt ?? 0;
    Date.now() - x > 300 && p(u);
  }, [p, u, a]), b = F((v) => {
    f(v.target.value);
  }, []);
  return l ? /* @__PURE__ */ h(eo, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ h(Ka, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ h(
          "input",
          {
            ref: i,
            type: "text",
            className: "tag-pill-input",
            value: u,
            onChange: b,
            onKeyDown: m,
            onBlur: y,
            spellCheck: !1,
            autoComplete: "off"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ h(eo, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ h(Ka, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ h("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function dn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Vn(e) {
  return e.toLowerCase().trim();
}
const ek = new Ne("tagPillPaste"), tk = yo.create({
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
    return mc(Jx, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Vn(e);
        return dn(n) ? t.insertContent({
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
        const o = Vn(r[1]);
        if (dn(o)) {
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
      new De({
        key: ek,
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
              if (dn(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const m = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = m.exec(o)) !== null; ) {
              const x = Vn(y[1]);
              if (dn(x)) {
                const T = y[0], w = T.startsWith(" ") || T.startsWith(`
`) ? 1 : 0, E = o.slice(g, y.index + w);
                E && p.push(f.text(E)), p.push(e.create({ tag: x })), g = y.index + T.length;
              }
            }
            const b = o.slice(g);
            if (b && p.push(f.text(b)), p.length === 0) return !1;
            const { $from: v } = d.selection;
            if (v.parent.type.name === "paragraph") {
              const x = u;
              let T = d.selection.from;
              for (const w of p)
                x.insert(T, w), T += w.nodeSize;
              x.delete(d.selection.from, d.selection.to), t.dispatch(x);
            } else {
              const x = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
              );
              u.replaceSelectionWith(x), t.dispatch(u);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), nk = /\[\[([^\[\]]+)\]\]$/, rk = Ic.create({
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
        find: nk,
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
}, ok = ["info", "note", "prompt", "resources", "todo", "summary"];
function sk(e) {
  return e.length < 3 ? !1 : !!(ut.header.test(e) || ut.bold.test(e) || ut.list.test(e) || ut.taskList.test(e) || ut.codeBlock.test(e) || ut.callout.test(e) || ut.highlight.test(e) || ut.link.test(e) || ut.table.test(e));
}
function ak(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function ik(e, t) {
  const { alt: n, align: r, width: o } = ak(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function uo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Gi(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${uo(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(ik(i[1], i[2])) : o.push(`<p>${uo(s.trim())}</p>`);
  }
  return o.join("");
}
function du(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^[-*+]\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function uu(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", d = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, u = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
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
    return i += u, { html: i, nextIdx: a };
  }, n = Math.min(...e.map((o) => o.depth));
  return t(0, n).html;
}
function qi(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return Gi(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(uu(s)), s = []);
  };
  for (const a of r) {
    const c = du(a);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && i();
      }
      s.push(c);
    } else
      i(), o.push(Gi(a.trim()));
  }
  return i(), o.join("");
}
function ck(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + qi(a) + "</th>";
  i += "</tr></thead><tbody>";
  for (const a of s) {
    if (!a.trim()) continue;
    const c = a.split("|"), l = [];
    for (let d = 0; d < c.length; d++) {
      const u = c[d].trim();
      d === 0 && u === "" && a.trim().startsWith("|") || d === c.length - 1 && u === "" && a.trim().endsWith("|") || l.push(u);
    }
    if (l.length !== 0) {
      i += "<tr>";
      for (let d = 0; d < r.length; d++) {
        const u = l[d] || "";
        i += "<td>" + qi(u) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function lk(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (u) => {
    const f = u.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const g = ck(u);
        if (g) {
          const m = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(g), m;
        }
      }
    }
    return u;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (u, f, p) => {
    const g = f.replace("ad-", "");
    let m = p.trim();
    m = m.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), m = m.replace(/__([^_]+)__/g, "<strong>$1</strong>"), m = m.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), m = m.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), m = m.replace(/`([^`]+)`/g, "<code>$1</code>"), m.startsWith("<") || (m = `<p>${m}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${m}</div>`), y;
  }), ok.forEach((u) => {
    const f = new RegExp(`\`\`\`${u}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (p, g) => {
      let m = g.trim();
      m = m.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), m = m.replace(/__([^_]+)__/g, "<strong>$1</strong>"), m = m.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), m = m.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), m = m.replace(/`([^`]+)`/g, "<code>$1</code>"), m.startsWith("<") || (m = `<p>${m}</p>`);
      const y = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${u}" class="callout callout-${u}">${m}</div>`), y;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (u, f, p) => {
    const g = f || "plaintext", m = p.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${g}">${m}</code></pre>`), y;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), i = [];
  let a = [];
  const c = () => {
    a.length !== 0 && (i.push(uu(a)), a = []);
  };
  for (const u of s) {
    const f = du(u);
    if (f) {
      if (a.length > 0) {
        const g = a[0].type, m = Math.min(...a.map((y) => y.depth));
        f.depth === m && f.type !== g && c();
      }
      a.push(f);
      continue;
    }
    c();
    let p = u;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (g, m, y) => {
      const b = m.length;
      return `<h${b}>${y}</h${b}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), i.push(p);
  }
  c(), t = i.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (u, f, p) => {
    const g = f.split("|").map((x) => x.trim());
    let m = "", y = "left", b = null;
    g.length === 1 ? m = g[0] : g.length === 2 ? (m = g[0], /^\d+$/.test(g[1]) ? b = g[1] : ["left", "center", "right"].includes(g[1]) ? y = g[1] : m = f) : g.length === 3 ? (m = g[0], ["left", "center", "right"].includes(g[1]) && (y = g[1]), /^\d+$/.test(g[2]) && (b = g[2])) : m = f;
    const v = b ? ` width="${b}" style="width: ${b}px"` : "";
    return `<img src="${p.trim()}" alt="${m}" data-align="${y}"${v}>`;
  }), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((u) => {
    const f = u.trim();
    return f ? /^<[a-z]/.test(f) || /^<\//.test(f) || f.startsWith("MANUSTABLEPLACEHOLDER") || f.startsWith("MANUSCODEPLACEHOLDER") ? u : `<p>${f}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let u = 0; u < r.length; u++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${u}END`, r[u]);
  for (let u = 0; u < o.length; u++)
    t = t.replace(`MANUSCODEPLACEHOLDER${u}END`, o[u]);
  return t;
}
const dk = $e.create({
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
      new De({
        key: new Ne("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !sk(i))
              return !1;
            n.preventDefault();
            const a = lk(i);
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
}), Xi = new Ne("collapsibleHeading");
function fu(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function _s(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, fu(i, a, l));
    }
  }), n;
}
function Ur(e, t, n, r) {
  const o = [], s = _s(e, n.levels), i = [];
  e.descendants((d, u) => {
    if (d.type.name === "heading" && n.levels.includes(d.attrs.level)) {
      const f = s.get(u) ?? "";
      i.push({
        pos: u,
        level: d.attrs.level,
        id: f,
        isCollapsed: t.collapsedHeadings.has(f),
        nodeSize: d.nodeSize
      });
    }
  });
  const a = [];
  for (let d = 0; d < i.length; d++) {
    const u = i[d];
    if (u.isCollapsed) {
      const f = u.pos + u.nodeSize;
      let p = e.content.size;
      for (let g = d + 1; g < i.length; g++)
        if (i[g].level <= u.level) {
          p = i[g].pos;
          break;
        }
      f < p && a.push({ start: f, end: p });
    }
  }
  const c = [];
  for (const d of a)
    if (c.length === 0)
      c.push(d);
    else {
      const u = c[c.length - 1];
      d.start <= u.end ? u.end = Math.max(u.end, d.end) : c.push(d);
    }
  function l(d) {
    for (const u of c)
      if (d >= u.start && d < u.end) return !0;
    return !1;
  }
  return e.descendants((d, u) => {
    if (d.type.name === "heading" && n.levels.includes(d.attrs.level)) {
      const f = s.get(u) ?? "", p = t.collapsedHeadings.has(f), g = l(u);
      o.push(
        Ze.node(u, u + d.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${d.attrs.level} ${p ? "is-collapsed" : "is-expanded"}${g ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": f,
          "data-heading-level": String(d.attrs.level)
        })
      );
      const m = Ze.widget(u + d.nodeSize - 1, () => {
        const y = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${f}"]`);
        if (y) {
          y.classList.contains("collapsed") !== p && (y.classList.remove("collapsed", "expanded"), y.classList.add(p ? "collapsed" : "expanded"), y.title = p ? "Click to expand" : "Click to collapse");
          const T = y.parentElement;
          if (T) return T;
        }
        const b = document.createElement("span");
        b.className = "collapsible-heading-chevron-wrapper", b.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${p ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", f), v.setAttribute("data-heading-level", String(d.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = p ? "Click to expand" : "Click to collapse", v.addEventListener("click", (x) => {
          x.preventDefault(), x.stopPropagation();
          const T = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(T ? "expanded" : "collapsed"), v.title = T ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(f) ? t.collapsedHeadings.delete(f) : t.collapsedHeadings.add(f), r.current && r.current.dispatch(r.current.state.tr.setMeta("collapsibleHeading", { toggled: f }));
        }), b.appendChild(v), b;
      }, { side: 1, key: `chevron-${f}` });
      o.push(m);
    } else d.isBlock && l(u) && o.push(
      Ze.node(u, u + d.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Ve.create(e, o);
}
function Zi(e, t) {
  const n = [];
  return e.descendants((r) => {
    r.type.name === "heading" && t.includes(r.attrs.level) && n.push(`${r.attrs.level}:${r.textContent.slice(0, 50)}`);
  }), n.join("|");
}
function uk(e, t, n, r) {
  const o = [], s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  e.descendants((l) => {
    if (l.type.name === "heading" && n.includes(l.attrs.level)) {
      const d = l.attrs.level, u = l.textContent.slice(0, 50);
      o.push(`${d}:${u}`);
      const f = `h${d}-${u}`, p = i.get(f) ?? 0;
      i.set(f, p + 1), s.add(fu(d, u, p));
    }
  });
  const a = o.join("|"), c = a !== r;
  if (t.collapsedHeadings.size > 0) {
    const l = [];
    t.collapsedHeadings.forEach((d) => {
      s.has(d) || l.push(d);
    });
    for (const d of l)
      t.collapsedHeadings.delete(d);
  }
  return { structureChanged: c, newFingerprint: a };
}
const fk = $e.create({
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
        const i = _s(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return _s(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options, n = { current: null };
    return [
      new De({
        key: Xi,
        view(r) {
          return n.current = r, {
            update(o) {
              n.current = o;
            },
            destroy() {
              n.current = null;
            }
          };
        },
        state: {
          init(r, o) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: Ur(o.doc, e, t, n),
              docVersion: 0,
              headingFingerprint: Zi(o.doc, t.levels)
            };
          },
          apply(r, o, s, i) {
            if (r.getMeta("collapsibleHeading"))
              return {
                collapsedHeadings: new Set(e.collapsedHeadings),
                decorations: Ur(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                headingFingerprint: Zi(i.doc, t.levels)
              };
            if (r.docChanged) {
              const { structureChanged: c, newFingerprint: l } = uk(
                i.doc,
                e,
                t.levels,
                o.headingFingerprint
              );
              return c ? {
                collapsedHeadings: new Set(e.collapsedHeadings),
                decorations: Ur(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                headingFingerprint: l
              } : {
                ...o,
                headingFingerprint: l,
                decorations: o.decorations.map(r.mapping, r.doc)
              };
            }
            return {
              ...o,
              decorations: o.decorations.map(r.mapping, r.doc)
            };
          }
        },
        props: {
          decorations(r) {
            const o = Xi.getState(r);
            return o?.decorations ? o.decorations : Ur(r.doc, e, t, n);
          }
        }
      })
    ];
  }
}), pk = /\[([^\]]+)\]\(([^)]+)\)$/, hk = /^(https?:\/\/|www\.)[^\s]+$/i, mk = $e.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new _e({
        find: pk,
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
      new De({
        key: new Ne("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!hk.test(s)) return !1;
            const { state: i } = t, { selection: a } = i, { from: c, to: l, empty: d } = a;
            let u = s;
            if (!u.startsWith("http://") && !u.startsWith("https://") && (u.startsWith("www."), u = "https://" + u), !d && i.doc.textBetween(c, l))
              return e.chain().focus().extendMarkRange("link").setLink({ href: u }).run(), !0;
            const f = i.schema.marks.link.create({ href: u }), p = i.tr;
            return p.insertText(u, c, l), p.addMark(c, c + u.length, f), t.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), gk = $e.create({
  name: "calloutInputRule"
  // No plugins — logic moved to InputDispatcher
}), Yr = new Ne("searchHighlight"), yk = $e.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Yr, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Yr, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new De({
        key: Yr,
        state: {
          init() {
            return Ve.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(Yr), d = t.docChanged;
            if (!s)
              return Ve.empty;
            if (!d && !l)
              return n.map(t.mapping, o.doc);
            const u = [];
            let f = 0;
            try {
              let p;
              if (a)
                p = new RegExp(s, i ? "g" : "gi");
              else {
                const g = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                p = new RegExp(g, i ? "g" : "gi");
              }
              o.doc.descendants((g, m) => {
                if (g.isText && g.text) {
                  let y;
                  for (; (y = p.exec(g.text)) !== null; ) {
                    const b = m + y.index, v = m + y.index + y[0].length, x = f === c;
                    u.push(
                      Ze.inline(b, v, {
                        class: x ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return Ve.empty;
            }
            return Ve.create(o.doc, u);
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
}), vk = $e.create({
  name: "tabIndent"
  // No plugins — logic moved to InputDispatcher
}), bk = new Ne("inputDispatcher"), wk = ["info", "note", "prompt", "resources", "todo"];
function xk(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n >= 0; n--) {
    const r = t.node(n);
    if (r.type.name === "taskItem") return "taskItem";
    if (r.type.name === "listItem") return "listItem";
  }
  return null;
}
function Qi(e, t) {
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
const kk = $e.create({
  name: "inputDispatcher",
  // Higher priority to ensure Tab handling runs before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new De({
        key: bk,
        props: {
          // ─── Consolidated handleTextInput ───────────────────────────
          // Replaces the separate MixedLists/taskItemInputRule plugin.
          // Runs once per character typed instead of through multiple plugins.
          handleTextInput(t, n, r, o) {
            if (o !== " ") return !1;
            const { state: s } = t, i = s.doc.resolve(n), a = i.parent.textBetween(
              0,
              i.parentOffset,
              void 0,
              "￼"
            ), l = /^\s*(-\s*)?\[([( |x])?\]$/.exec(a);
            if (!l) return !1;
            const d = s.schema.nodes.taskItem, u = s.schema.nodes.taskList;
            if (!d || !u) return !1;
            const f = l[2] === "x", p = i.start() + (l.index || 0), g = n, m = s.tr;
            m.delete(p, g);
            const b = m.doc.resolve(p).blockRange();
            if (!b) return !1;
            const v = [
              { type: u, attrs: {} },
              { type: d, attrs: { checked: f } }
            ];
            if (m.wrap(b, v), p > 1) {
              const x = m.doc.resolve(p - 1).nodeBefore;
              x && x.type === u && fp(m.doc, p - 1) && m.join(p - 1);
            }
            return t.dispatch(m), !0;
          },
          // ─── Consolidated handleKeyDown ─────────────────────────────
          // Replaces TabIndent, CalloutInputRule, and CodeBlockEnterShortcut plugins.
          // Runs once per key press instead of through multiple plugins.
          handleKeyDown(t, n) {
            if (n.key === "Tab") {
              const { state: r, dispatch: o } = t, s = xk(r);
              if (!s)
                return n.preventDefault(), !0;
              n.preventDefault();
              const i = r.schema.nodes[s];
              if (!i) return !0;
              if (n.shiftKey) {
                if (!qa(i)(r, o)) {
                  const l = s === "taskItem" ? "listItem" : "taskItem", d = r.schema.nodes[l];
                  d && qa(d)(r, o);
                }
              } else if (Xa(i)(r, o))
                Qi(t.state, o);
              else {
                const l = s === "taskItem" ? "listItem" : "taskItem", d = r.schema.nodes[l];
                d && Xa(d)(r, o) && Qi(t.state, o);
              }
              return !0;
            }
            if (n.key === "Enter") {
              const { state: r } = t, { $from: o } = r.selection, s = o.start(), i = r.doc.textBetween(s, o.pos, ""), a = i.trim();
              for (const l of wk)
                if (a === `\`\`\`${l}`) {
                  n.preventDefault();
                  const d = r.tr, u = s + i.indexOf("```");
                  d.delete(u, o.pos);
                  const f = e.schema.nodes.callout, p = e.schema.nodes.paragraph;
                  if (f && p) {
                    const g = p.create(), m = f.create({ type: l }, Ac.from(g));
                    d.insert(u, m);
                    const y = d.doc.resolve(u + 2);
                    d.setSelection(Ke.near(y)), t.dispatch(d);
                  }
                  return !0;
                }
              const { empty: c } = r.selection;
              if (c && !o.parent.type.spec.code) {
                const d = o.parent.textBetween(
                  0,
                  o.parentOffset,
                  void 0,
                  "￼"
                ).match(/^```([a-zA-Z]*)$/);
                if (d) {
                  n.preventDefault();
                  const u = d[1] || null, f = r.schema.nodes.codeBlock, p = r.schema.nodes.paragraph;
                  if (f && p) {
                    const g = r.tr, m = f.create({ language: u }, void 0), y = o.before(o.depth), b = o.after(o.depth), v = p.create();
                    g.replaceWith(y, b, [m, v]);
                    const x = y + 1;
                    g.setSelection(Ke.create(g.doc, x)), t.dispatch(g);
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
}), Ck = new Ne("expandSelection");
function hs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const Ek = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), pu = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), Mk = "tableRow", Tk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function Sk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Dk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (Tk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Nk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === Mk) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Lk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (pu.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Ak(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    Ek.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function Ik(e) {
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
function Rk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Pk(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Ok(e, t, n) {
  let r = !1;
  return e.nodesBetween(t, n, (o) => pu.has(o.type.name) ? (r = !0, !1) : !0), r;
}
function _k(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(Sk(e, o, s)), Pk(e, t) && (i(Dk(e, o, s)), i(Nk(e, o, s))), i(Ak(e, o, s)), i(Lk(e, o, s));
  const a = Ik(e);
  if (a.length > 0) {
    const c = Rk(a, o, s);
    for (const l of c)
      Ok(e, l.from, l.to) ? l.from === 0 && l.to === e.content.size ? i({ from: 0, to: e.content.size, useSelectAll: !0 }) : i({ from: l.from, to: l.to, useSelectAll: !0 }) : i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size, useSelectAll: !0 }), r;
}
const $k = $e.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof Zf || o === 0 && s === n.content.size)
          return !0;
        const a = _k(n, o, s);
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
              const l = n.resolve(c.from), d = n.resolve(c.to), u = e.state.tr, f = Ke.between(l, d);
              e.view.dispatch(u.setSelection(f).scrollIntoView());
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
      new De({
        key: Ck,
        props: {
          handleClick() {
            return hs(e), !1;
          },
          handleTextInput() {
            return hs(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && hs(e), !1;
          }
        }
      })
    ];
  }
}), Hk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Bk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Wk = new Ne("hexColorDecoration");
function hu(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Hk.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, d = l + a[0].length;
      if (d >= t && l <= n) {
        const u = a[0], f = Bk(u);
        r.push(
          Ze.inline(l, d, {
            class: "hex-color-swatch",
            style: `background-color: ${u}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function zk(e) {
  const t = hu(e, 0, e.content.size);
  return Ve.create(e, t);
}
const Fk = Ic.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new De({
        key: Wk,
        state: {
          init(e, { doc: t }) {
            return zk(t);
          },
          apply(e, t) {
            if (!e.docChanged)
              return t;
            let n = t.map(e.mapping, e.doc);
            const r = [];
            if (e.mapping.maps.forEach((s, i) => {
              s.forEach((a, c, l, d) => {
                const u = Math.max(0, l - 10), f = Math.min(e.doc.content.size, d + 10);
                r.push({ from: u, to: f });
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
              const i = hu(e.doc, s.from, s.to);
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
}), Se = new Ne("selectAllOccurrences");
function Ji(e, t, n, r, o) {
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
function Mt(e, t) {
  const n = Se.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function Uk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Me(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Yk = $e.create({
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
        const c = Ji(t.state.doc, o, s, i, a);
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Se, { activate: !0 })), !0);
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
            const u = o.doc.resolve(s), f = u.parent;
            if (f.isTextblock) {
              const p = f.textContent, g = u.parentOffset;
              let m = g, y = g;
              for (; m > 0 && /\w/.test(p[m - 1]); ) m--;
              for (; y < p.length && /\w/.test(p[y]); ) y++;
              m < y && (a = p.slice(m, y));
            }
          }
          if (!a) return !1;
          const c = Ji(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = Uk(c, s), d = c[l];
          return r.isActive = !0, r.ranges = [d], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = c, r.nextMatchIndex = (l + 1) % c.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Se, { activate: !0 })), setTimeout(() => {
            try {
              const u = e.view.domAtPos(d.from);
              u.node && u.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0;
        }
        if (r.isIncremental && r.allMatches.length > 0) {
          const o = r.nextMatchIndex, s = r.allMatches[o];
          return r.ranges.some(
            (a) => a.from === s.from && a.to === s.to
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Se, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Me(this.storage), t && t(e.setMeta(Se, { deactivate: !0 })), !0),
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
              const c = Mt(a, this.storage);
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
              const s = Mt(o, this.storage);
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
      new De({
        key: Se,
        state: {
          init() {
            return Ve.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Se);
            if (s?.deactivate || !e.isActive)
              return Ve.empty;
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
              return Ve.create(o.doc, i);
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
              t.dispatch(o.setMeta(Se, { deactivate: !0 }));
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
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), bp(t.state, t.dispatch), setTimeout(() => {
                  const s = Mt(t);
                  e.ranges = s, s.length === 0 && Me(e);
                }, 10), !0;
              }
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, wp(t.state, t.dispatch), setTimeout(() => {
                  const s = Mt(t);
                  e.ranges = s, s.length === 0 && Me(e);
                }, 10), !0;
              }
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Mt(t);
                if (r.length === 0) {
                  Me(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Se, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Mt(t);
                  e.ranges = a, a.length === 0 && Me(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Me(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Se, { deactivate: !0 }));
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
              return t.dispatch(s.setMeta(Se, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !1;
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
            const s = Mt(t);
            if (s.length === 0) {
              Me(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Se, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = Mt(t);
              e.ranges = c, c.length === 0 && Me(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
}), jk = new Ne("linkBoundary"), Vk = $e.create({
  name: "linkBoundary",
  addProseMirrorPlugins() {
    return [
      new De({
        key: jk,
        appendTransaction(e, t, n) {
          const { selection: r, schema: o } = n, s = o.marks.link;
          if (!s || !r.empty) return null;
          const { $from: i } = r;
          if (i.parentOffset !== 0 || !i.parent.isTextblock) return null;
          const a = i.parent.firstChild;
          if (!a || !a.isText || !s.isInSet(a.marks)) return null;
          const l = n.storedMarks || i.marks(), d = l.filter(
            (p) => p.type !== s
          );
          if (!l.some(
            (p) => p.type === s
          )) return null;
          const { tr: f } = n;
          return f.setStoredMarks(d), f;
        }
      })
    ];
  }
}), Kk = new Ne("smartCopyPaste"), mu = /* @__PURE__ */ new Set(["codeBlock", "callout"]);
function ec(e) {
  const { state: t } = e, { selection: n } = t, { $from: r, $to: o } = n;
  for (let s = r.depth; s > 0; s--) {
    const i = r.node(s);
    if (!mu.has(i.type.name)) continue;
    const a = r.start(s), c = r.end(s), l = o.depth;
    let d = !1;
    for (let g = l; g > 0; g--)
      if (o.start(g) === a && o.node(g) === i) {
        d = !0;
        break;
      }
    if (!d)
      return { isFullContainer: !1, containerType: null };
    const u = n.from, f = n.to;
    let p;
    if (i.type.name === "codeBlock")
      p = u <= a && f >= c;
    else {
      const g = i.firstChild, m = i.lastChild;
      !g || !m ? p = !1 : p = u <= a + 1 && f >= c - 1;
    }
    return {
      isFullContainer: p,
      containerType: i.type.name
    };
  }
  return { isFullContainer: !1, containerType: null };
}
const Gk = $e.create({
  name: "smartCopyPaste",
  addProseMirrorPlugins() {
    const e = this.editor;
    let t = {
      isFullContainer: !1,
      containerType: null
    };
    return [
      new De({
        key: Kk,
        props: {
          handleDOMEvents: {
            // Analyze the selection right before copy/cut happens
            copy(n) {
              return t = ec(n), !1;
            },
            cut(n) {
              return t = ec(n), !1;
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
            if (!c || !mu.has(c.type.name))
              return n;
            if (r === "codeBlock") {
              const l = e.schema, d = l.nodes.paragraph;
              if (!d) {
                const m = c.content;
                return new jo(m, Math.max(0, i - 1), Math.max(0, a - 1));
              }
              let u = "";
              c.content.forEach((m) => {
                u += m.text || "";
              });
              const f = u.split(`
`);
              f.length > 1 && f[f.length - 1] === "" && f.pop();
              const p = f.map((m) => m === "" ? d.create() : d.create(null, l.text(m))), g = Ac.from(p);
              return new jo(g, 0, 0);
            } else {
              const l = c.content, d = Math.max(0, i - 1), u = Math.max(0, a - 1);
              return new jo(l, d, u);
            }
          }
        }
      })
    ];
  }
});
function qk() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Xk(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function Zk(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function Qk(e, t) {
  return t.includes(e.type);
}
function Jk(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function eC(e, t, n) {
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
      const d = l.getContext("2d");
      if (!d) {
        o(new Error("Failed to get canvas context"));
        return;
      }
      d.imageSmoothingEnabled = !0, d.imageSmoothingQuality = "high", d.drawImage(s, 0, 0, a, c);
      const u = e.type === "image/png" || e.type === "image/gif", f = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, g = l.toDataURL(f, p), m = Zk(g, e.name);
      r({ dataUrl: g, file: m, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function tC(e, t, n) {
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
async function tc(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!Qk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = qk();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const f = await eC(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = f.dataUrl, i = f.file, s = Math.min(f.width, 600);
    } else {
      o = await Xk(e), i = e;
      const f = await Jk(o);
      s = Math.min(f.width, 600);
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
    const { state: d } = t.view, u = d.selection.from - 1;
    if (u >= 0) {
      const f = d.doc.nodeAt(u);
      if (f && f.type.name === "resizableImage") {
        const p = t.view.nodeDOM(u);
        if (p) {
          const g = p instanceof HTMLElement ? p : p.dom;
          g && g.classList.add("image-uploading");
        }
      }
    }
    try {
      const f = await n.onImageUpload(i, {
        fileName: e.name,
        mimeType: i.type,
        fileSize: i.size,
        uploadId: r
      });
      let p = !1;
      return t.view.state.doc.descendants((g, m) => {
        if (p) return !1;
        if (g.type.name === "resizableImage" && g.attrs.src === o && g.attrs.alt === e.name) {
          try {
            const { state: y, dispatch: b } = t.view, v = y.doc.nodeAt(m);
            if (v) {
              const x = y.tr.setNodeMarkup(m, void 0, {
                ...v.attrs,
                src: f
              });
              b(x);
            }
          } catch (y) {
            console.warn("Failed to replace placeholder with uploaded reference:", y);
          }
          return p = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((g, m) => {
        if (g.type.name === "resizableImage" && g.attrs.src === f) {
          const y = t.view.nodeDOM(m);
          if (y) {
            const b = y instanceof HTMLElement ? y : y.dom;
            b && b.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (f) {
      return console.warn("Image upload failed, removing placeholder:", f), tC(t, o, e.name), n.onUploadError?.(`Upload failed: ${f instanceof Error ? f.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    try {
      t.view.state.doc.descendants((s, i) => {
        if (s.type.name === "resizableImage" && s.attrs.src?.startsWith("data:") && s.attrs.alt === e.name) {
          try {
            const { state: a, dispatch: c } = t.view, l = a.tr.delete(i, i + s.nodeSize);
            c(l);
          } catch {
          }
          return !1;
        }
        return !0;
      });
    } catch {
    }
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function nc(e) {
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
const nC = $e.create({
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
      new De({
        key: new Ne("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = nc(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              tc(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = nc(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const c = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (c) {
              const l = n.state.tr.setSelection(
                Ke.near(n.state.doc.resolve(c.pos))
              );
              n.dispatch(l);
            }
            return a.forEach((l) => {
              tc(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function rC({
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
  enableHexColorHighlight: d,
  isLightweight: u,
  setImageEditState: f,
  callbackRefs: p
}) {
  return St(() => {
    const g = [
      Qf.configure({
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
      Cp.configure({ HTMLAttributes: { class: "font-bold" } }).extend({ keepOnSplit: !1 }),
      Ep.configure({ HTMLAttributes: { class: "italic" } }).extend({ keepOnSplit: !1 }),
      Mp.configure({}).extend({ keepOnSplit: !1 }),
      kp.configure({}).extend({ keepOnSplit: !1 }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      Cb,
      Eb,
      Sb,
      Jf.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      ep.configure({
        types: ["heading", "paragraph"]
      }),
      tp.configure({
        multicolor: !0
      }),
      np.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      // Prevent typed text from being absorbed into a link mark at the start of a textblock
      Vk,
      // Smart copy-paste: partial selection inside code block/callout unwraps the container
      Gk,
      pp,
      hp,
      mp,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [gp],
      mk,
      yk,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [Yk],
      vk,
      kk,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      xp.extend({
        addInputRules() {
          const m = this.type;
          return [
            new _e({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: y, range: b }) => {
                const { tr: v } = y, x = b.from, T = b.to;
                v.delete(x, T);
                const w = v.doc.resolve(x), E = m.create(), S = w.before(w.depth), k = w.after(w.depth);
                v.replaceWith(S, k, E);
                const N = S + E.nodeSize;
                if (N < v.doc.content.size) {
                  const C = v.doc.resolve(N);
                  C.nodeAfter && C.nodeAfter.isTextblock ? v.setSelection(Ke.create(v.doc, N + 1)) : C.nodeAfter && v.setSelection(Ke.near(v.doc.resolve(N)));
                } else {
                  const D = y.schema.nodes.paragraph.create();
                  v.insert(N, D), v.setSelection(Ke.create(v.doc, N + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || g.push(
      rp.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      op,
      hb,
      mb,
      ...u ? [] : [kb]
    ), s.taskLists || g.push(
      Mb.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Tb.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), c && !t && !u && g.push(
      Nb.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || g.push(Rp), s.callouts || g.push(Bb, gk), a && !s.collapsibleHeadings && !u && g.push(
      fk.configure({
        levels: o
      })
    ), s.images || g.push(
      Wb.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (m) => {
          f({
            isOpen: !0,
            src: m.src,
            alt: m.alt,
            pos: m.pos,
            position: { x: m.rect.left + m.rect.width / 2, y: m.rect.bottom }
          });
        },
        resolveImageSrc: p.resolveImageSrc.current ? ((...m) => p.resolveImageSrc.current(...m)) : void 0
      }),
      nC.configure({
        maxFileSize: n,
        onUploadStart: p.onImageUploadStart.current ? ((...m) => p.onImageUploadStart.current(...m)) : void 0,
        onUploadComplete: p.onImageUploadComplete.current ? ((...m) => p.onImageUploadComplete.current(...m)) : void 0,
        onUploadError: p.onImageUploadError.current ? ((...m) => p.onImageUploadError.current(...m)) : void 0,
        onImageUpload: p.onImageUpload.current ? ((m, y) => p.onImageUpload.current(m, y)) : void 0
      })
    ), s.datePills || g.push(
      Qx.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || g.push(
      tk.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: l
      })
    ), s.wikiLinks || g.push(
      rk.configure({
        onWikiLinkClick: (m) => {
          console.log("WikiLink clicked:", m), p.onWikiLinkClick.current?.(m);
        },
        validateLink: (m) => p.validateWikiLink.current ? p.validateWikiLink.current(m) : !0
      })
    ), i && g.push($k), d && !u && g.push(Fk), s.markdownPaste || g.push(
      dk.configure({
        enableMarkdownPaste: !0
      })
    ), g;
  }, [e, t, n, r, o, s, i, a, c, l, d, u]);
}
let ht = null, fo = null;
async function gu() {
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
      const d = l, u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), m = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", x = m && m > 0;
      return (v || x) && b.push(v ? y : "left"), x && b.push(String(m)), `![${b.join(" | ")}](${u})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const d = l.querySelector("img");
      if (!d) return c;
      const u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), m = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", x = m && m > 0;
      (v || x) && b.push(v ? y : "left"), x && b.push(String(m));
      const T = `![${b.join(" | ")}](${u})`, w = l.parentNode;
      return w && w.nodeName === "LI" ? `
` + T + `
` : `

` + T + `

`;
    }
  }), n.addRule("taskListItem", {
    filter: (c) => c.nodeName === "LI" && c.getAttribute("data-type") === "taskItem",
    replacement: (c, l) => {
      const d = l, u = d.querySelector('input[type="checkbox"]'), f = u?.hasAttribute("checked") || u?.checked || d.getAttribute("data-checked") === "true";
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
      const d = c || "​", u = l.parentNode;
      let f;
      if (u && u.nodeName === "OL") {
        const m = Array.from(u.children).filter((b) => b.nodeName === "LI").indexOf(l);
        f = `${parseInt(u.getAttribute("start") || "1", 10) + m}. `;
      } else
        f = "-   ";
      const p = " ".repeat(f.length);
      return f + d.replace(/\n/gm, `
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
    const l = c.getAttribute("src") || "", u = (c.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = c.getAttribute("width"), p = f ? parseInt(f, 10) : null, g = c.getAttribute("data-align") || "left", m = [u], y = g !== "left", b = p && p > 0;
    return (y || b) && m.push(y ? g : "left"), b && m.push(String(p)), `![${m.join(" \\| ")}](${l})`;
  }
  function o(c) {
    if (c.nodeType === Node.TEXT_NODE)
      return (c.textContent || "").replace(/\|/g, "\\|");
    if (c.nodeType === Node.ELEMENT_NODE) {
      const l = c;
      if (l.nodeName === "IMG") return r(l);
      if (l.nodeName === "BR") return "";
      let d = "";
      for (const u of Array.from(l.childNodes))
        d += o(u);
      if (l.nodeName === "STRONG" || l.nodeName === "B") return `**${d}**`;
      if (l.nodeName === "EM" || l.nodeName === "I") return `*${d}*`;
      if (l.nodeName === "S" || l.nodeName === "DEL") return `~~${d}~~`;
      if (l.nodeName === "CODE") return `\`${d}\``;
      if (l.nodeName === "MARK") return `==${d}==`;
      if (l.nodeName === "A") {
        const u = l.getAttribute("href") || "";
        return `[${d}](${u})`;
      }
      return d;
    }
    return "";
  }
  function s(c) {
    let l = "";
    for (const d of Array.from(c.childNodes))
      if (d.nodeType === Node.ELEMENT_NODE) {
        const u = d, f = u.nodeName;
        if (f === "UL" || f === "OL" || f === "LABEL" || f === "INPUT") continue;
        l += o(u);
      } else
        l += o(d);
    return l.trim();
  }
  function i(c, l, d = 0) {
    const u = "  ".repeat(d), f = c.nodeName, p = Array.from(c.childNodes).filter(
      (m) => m.nodeType === Node.ELEMENT_NODE && m.nodeName === "LI"
    ), g = f === "OL" ? parseInt(c.getAttribute("start") || "1", 10) : 1;
    p.forEach((m, y) => {
      const b = m.getAttribute("data-type") === "taskItem", v = m.getAttribute("data-checked") === "true", x = s(m);
      b ? l.push(`${u}- [${v ? "x" : " "}] ${x}`) : f === "OL" ? l.push(`${u}${g + y}. ${x}`) : l.push(`${u}- ${x}`);
      const T = Array.from(m.childNodes).filter(
        (w) => w.nodeType === Node.ELEMENT_NODE && (w.nodeName === "UL" || w.nodeName === "OL")
      );
      for (const w of T)
        i(w, l, d + 1);
    });
  }
  function a(c) {
    const l = [];
    for (const d of Array.from(c.childNodes)) {
      if (d.nodeType !== Node.ELEMENT_NODE) {
        const g = (d.textContent || "").trim();
        g && l.push(g.replace(/\|/g, "\\|"));
        continue;
      }
      const u = d, f = u.nodeName;
      if (f === "UL" || f === "OL") {
        i(u, l, 0);
        continue;
      }
      if (f === "FIGURE") {
        const g = u.querySelector("img");
        g && l.push(r(g));
        continue;
      }
      if (f === "IMG") {
        l.push(r(u));
        continue;
      }
      const p = o(u).trim();
      p && l.push(p);
    }
    return l.join(" <br> ") || "";
  }
  return n.addRule("table", {
    filter: "table",
    replacement: function(c, l) {
      const d = l, u = Array.from(d.querySelectorAll("tr"));
      if (u.length === 0) return "";
      const f = [];
      let p = !1;
      u.forEach((m, y) => {
        const b = Array.from(m.querySelectorAll("th, td")), v = b.map((x) => a(x));
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
      const d = l.getAttribute("data-date");
      return d ? `@${Xx(d)}@` : c;
    }
  }), n.addRule("tagPill", {
    filter: (c) => c.nodeName === "SPAN" && c.getAttribute("data-type") === "tag-pill",
    replacement: (c, l) => {
      const d = l.getAttribute("data-tag");
      return d ? `#${d}` : c;
    }
  }), n.addRule("wikiLink", {
    filter: (c) => c.nodeName === "SPAN" && c.hasAttribute("data-wiki-link"),
    replacement: (c, l) => {
      const d = l.getAttribute("data-page-name");
      return d ? `[[${d}]]` : c;
    }
  }), n.addRule("callout", {
    filter: (c) => c.nodeName === "DIV" && c.hasAttribute("data-callout"),
    replacement: (c, l) => {
      const d = l.getAttribute("data-type") || "info", u = c.trim().replace(/\n{3,}/g, `

`);
      return `

\`\`\`ad-${d}
${u}
\`\`\`

`;
    }
  }), n.addRule("listSeparation", {
    filter: (c) => c.nodeName === "UL" || c.nodeName === "OL",
    replacement: (c, l) => {
      const d = l.parentNode;
      if (d && d.nodeName === "LI")
        return `
` + c.trimEnd() + `
`;
      const f = l.previousElementSibling, p = f && (f.nodeName === "UL" || f.nodeName === "OL");
      return `

` + c.trim() + `

`;
    }
  }), ht = n, n;
}
function oC() {
  !fo && !ht && (fo = gu().then((e) => (ht = e, e)));
}
function sC() {
  return oC(), {
    turndown(e) {
      return ht ? ht.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return ht !== null;
    },
    async ready() {
      ht || (fo ? await fo : await gu());
    }
  };
}
function aC() {
  const e = Y(null);
  return e.current || (e.current = sC()), e.current;
}
const iC = 2e3;
function cC(e) {
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
    onHTMLChange: d,
    onMarkdownChange: u,
    markdownChangeDebounceMs: f,
    onReady: p,
    onDestroy: g,
    onFocus: m,
    onBlur: y,
    onSelectionChange: b,
    onLinkClick: v,
    editorModeRef: x,
    rawMarkdownRef: T,
    setRawMarkdown: w,
    setIsLightweight: E,
    lightweightCheckCounterRef: S,
    isLightweightRef: k
  } = e, N = n && n.length > iC, C = Y(N ? n : null), D = N ? "" : n, L = Y(null), P = Y(null), O = Y(l), $ = Y(d), W = Y(u), V = Y(f), R = Y(null);
  O.current = l, $.current = d, W.current = u, V.current = f;
  const A = Xu({
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
    onCreate: ({ editor: z }) => {
      window.__tiptapEditor = z, p?.(z);
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
      handleClick: (z, U, K) => {
        if (v) {
          const J = K.target.closest("a");
          if (J) {
            const _ = J.getAttribute("href");
            if (_ && v(_, K) === !1)
              return K.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: z }) => {
      if (a === "auto" && (S.current++, S.current >= 50)) {
        S.current = 0;
        const K = z.state.doc.content.childCount > c;
        K !== k.current && E(K);
      }
      L.current && clearTimeout(L.current), L.current = setTimeout(() => {
        if (z.isDestroyed) return;
        const U = z.getHTML();
        (O.current || $.current) && (O.current?.(U), $.current?.(U)), V.current > 0 && W.current && (P.current && clearTimeout(P.current), P.current = setTimeout(() => {
          if (!z.isDestroyed && x.current === "wysiwyg" && R.current) {
            const K = z.getHTML(), B = R.current.turndown(K);
            T.current = B, W.current?.(Yt(B));
          }
        }, V.current));
      }, 150);
    },
    onFocus: () => {
      m?.();
    },
    onBlur: () => {
      if (P.current && (clearTimeout(P.current), P.current = null), L.current && (clearTimeout(L.current), L.current = null, A && !A.isDestroyed)) {
        const z = A.getHTML();
        if ((O.current || $.current) && (O.current?.(z), $.current?.(z)), x.current === "wysiwyg" && R.current) {
          const U = R.current.turndown(z);
          T.current = U, W.current?.(Yt(U));
        }
      }
      y?.();
    },
    onSelectionUpdate: ({ editor: z }) => {
      if (b) {
        const { from: U, to: K, empty: B } = z.state.selection;
        b({ from: U, to: K, empty: B });
      }
    }
  });
  q(() => {
    if (!C.current || !A || A.isDestroyed) return;
    const z = C.current;
    C.current = null;
    const U = requestAnimationFrame(() => {
      const K = setTimeout(() => {
        A.isDestroyed || A.commands.setContent(z);
      }, 0);
      A.__deferredTimerId = K;
    });
    return () => {
      cancelAnimationFrame(U);
      const K = A.__deferredTimerId;
      K && clearTimeout(K);
    };
  }, [A]), q(() => () => {
    if (P.current && (clearTimeout(P.current), P.current = null), L.current && (clearTimeout(L.current), L.current = null, A && !A.isDestroyed)) {
      const z = A.getHTML();
      if ((O.current || $.current) && (O.current?.(z), $.current?.(z)), x.current === "wysiwyg" && R.current) {
        const U = R.current.turndown(z);
        T.current = U, W.current?.(Yt(U));
      }
    }
  }, []);
  const H = aC();
  R.current = H;
  const G = Y(!1);
  return q(() => {
    if (!G.current && i === "markdown" && A && !A.isDestroyed && H) {
      const z = A.getHTML(), U = H.turndown(z);
      w(U), T.current = U, G.current = !0;
    }
  }, [A, H, i]), { editor: A, turndownService: H };
}
function lC(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (i) => {
    Array.from(i.querySelectorAll("ul")).forEach(o);
    const c = Array.from(i.children).filter((f) => f.tagName === "LI");
    let l = !1, d = !1;
    const u = (f) => {
      const p = f.querySelector(':scope > input[type="checkbox"]');
      if (p) return p;
      const g = f.querySelector(":scope > p");
      if (g) {
        const m = g.querySelector(':scope > input[type="checkbox"]');
        if (m) return m;
      }
      return null;
    };
    c.forEach((f) => {
      u(f) ? l = !0 : d = !0;
    }), l && (c.forEach((f) => {
      const p = u(f);
      if (p) {
        const g = p.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(g));
        const m = p.parentElement, y = m && m.tagName === "P" && m.parentElement === f;
        p.remove(), y && m.firstChild && m.firstChild.nodeType === Node.TEXT_NODE && (m.firstChild.textContent = (m.firstChild.textContent || "").replace(/^\s+/, ""));
        const b = Array.from(f.childNodes), v = [], x = [];
        b.forEach((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const E = w;
            if (E.tagName === "UL" || E.tagName === "OL" || E.tagName === "P")
              x.push(w);
            else if (E.tagName === "IMG" || E.tagName === "FIGURE")
              if (E.tagName === "IMG") {
                const S = n.createElement("figure");
                S.className = "image-resizer";
                const k = E.getAttribute("data-align") || "left", N = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[k] || "margin-right: auto;";
                S.style.cssText = N, S.appendChild(E.cloneNode(!0)), x.push(S);
              } else
                x.push(w);
            else
              v.push(w);
          } else
            v.push(w);
        });
        const T = x.filter((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const E = w;
            if (E.tagName === "P" && !E.textContent?.trim() && !E.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", v.length > 0) {
          const w = n.createElement("p");
          v.forEach((E) => w.appendChild(E)), w.firstChild && w.firstChild.nodeType === Node.TEXT_NODE && (w.firstChild.textContent = (w.firstChild.textContent || "").replace(/^\s+/, "")), (w.textContent?.trim() || w.querySelector("img, figure, code, br")) && f.appendChild(w);
        }
        T.forEach((w) => f.appendChild(w));
      }
    }), l && !d && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function dC(e) {
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
      let d = c + 1;
      for (; d < t.length && s(t[d]); )
        d++;
      let u = 0;
      const f = d;
      for (; d < t.length && i(t[d]); )
        u++, d++;
      if (u > 0 && d < t.length) {
        const p = r(l), g = r(t[d]);
        if (p !== null && g !== null) {
          const m = o(l);
          if (o(t[d]) > m) {
            for (let b = f; b < d; b++)
              n.push(t[b]);
            c = d - 1;
            continue;
          }
          for (let b = f; b < d; b++)
            n.push(t[b]);
          n.push("<!-- list-break -->"), c = d - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function uC(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = Array.from(r.querySelectorAll("li"));
  for (const s of o) {
    if (s.getAttribute("data-type") === "taskItem" || !s.querySelector(":scope > img, :scope > p > img, :scope > figure")) continue;
    const a = Array.from(s.childNodes), c = [], l = [];
    if (a.forEach((d) => {
      if (d.nodeType === Node.ELEMENT_NODE) {
        const u = d, f = u.tagName;
        if (f === "UL" || f === "OL")
          l.push(d);
        else if (f === "FIGURE")
          l.push(d);
        else if (f === "IMG") {
          const p = n.createElement("figure");
          p.className = "image-resizer";
          const g = u.getAttribute("data-align") || "left", m = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = m[g] || "margin-right: auto;", p.appendChild(u.cloneNode(!0)), l.push(p);
        } else if (f === "P")
          if (u.querySelectorAll("img").length === 0)
            l.push(d);
          else {
            const g = Array.from(u.childNodes), m = [];
            if (g.forEach((y) => {
              if (y.nodeType === Node.ELEMENT_NODE && y.tagName === "IMG") {
                if (m.length > 0) {
                  const w = n.createElement("p");
                  m.forEach((E) => w.appendChild(E.cloneNode(!0))), w.textContent?.trim() && l.push(w), m.length = 0;
                }
                const b = y, v = n.createElement("figure");
                v.className = "image-resizer";
                const x = b.getAttribute("data-align") || "left", T = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = T[x] || "margin-right: auto;", v.appendChild(b.cloneNode(!0)), l.push(v);
              } else
                m.push(y);
            }), m.length > 0) {
              const y = n.createElement("p");
              m.forEach((b) => y.appendChild(b.cloneNode(!0))), y.textContent?.trim() && l.push(y);
            }
          }
        else
          c.push(d);
      } else
        c.push(d);
    }), s.innerHTML = "", c.length > 0 && c.some((u) => (u.textContent || "").trim().length > 0)) {
      const u = n.createElement("p");
      c.forEach((f) => u.appendChild(f)), s.appendChild(u);
    }
    l.forEach((d) => s.appendChild(d));
  }
  return r.innerHTML;
}
function fC(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function po(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function pC(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function rc(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? pC(r) : r.trim() ? `<p>${po(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${po(e)}</p>`;
}
function hC(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function mC(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", d = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, u = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${po(f.text)}</p>` : i += `<li><p>${po(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
          const p = t(a + 1, e[a + 1].depth);
          i += p.html, a = p.nextIdx;
        } else
          a++;
        i += "</li>";
      } else
        a++;
    }
    return i += u, { html: i, nextIdx: a };
  }, n = Math.min(...e.map((o) => o.depth));
  return t(0, n).html;
}
function gC(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let c = r.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (l.length <= 1 && !a)
        return s ? `${n}${rc(c)}${o}` : t;
      const d = [];
      let u = [];
      const f = () => {
        u.length !== 0 && (d.push(mC(u)), u = []);
      };
      for (const p of l) {
        const g = hC(p);
        if (g) {
          if (u.length > 0) {
            const m = u[0].type;
            g.depth === 0 && g.type !== m && f();
          }
          u.push(g);
        } else
          f(), d.push(rc(p.trim()));
      }
      return f(), `${n}${d.join("")}${o}`;
    }
  );
}
function yC(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: c
  } = n;
  let l = e;
  l = dC(l);
  const d = /* @__PURE__ */ new Set(["info", "note", "prompt", "resources", "todo", "summary"]), u = l.split(`
`), f = [];
  let p = null, g = [];
  for (let y = 0; y < u.length; y++) {
    const b = u[y];
    if (p !== null)
      if (b.trimEnd() === "```") {
        const v = g.join(`
`).trim(), x = v ? t(v) : "";
        f.push(`<div data-callout="" data-type="${p}" class="callout callout-${p}">${x}</div>`), p = null, g = [];
      } else
        g.push(b);
    else {
      const v = b.match(/^```(?:ad-)?(\w+)\s*$/);
      v && d.has(v[1]) ? (p = v[1], g = []) : f.push(b);
    }
  }
  return p !== null && (f.push(`\`\`\`ad-${p}`), f.push(...g)), l = f.join(`
`), l = l.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (y, b, v) => {
    const x = b.split("|").map((N) => N.trim());
    let T = "", w = "left", E = null;
    x.length === 1 ? T = x[0] : x.length === 2 ? (T = x[0], /^\d+$/.test(x[1]) ? E = x[1] : ["left", "center", "right"].includes(x[1]) ? w = x[1] : T = b) : x.length === 3 ? (T = x[0], ["left", "center", "right"].includes(x[1]) && (w = x[1]), /^\d+$/.test(x[2]) && (E = x[2])) : T = b;
    const S = E ? ` width="${E}" style="width: ${E}px"` : "", k = ` data-align="${w}"`;
    return `<img src="${v.trim()}" alt="${T}"${k}${S} />`;
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
function vC(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = lC(t), t = uC(t), t = fC(t), t = gC(t), t = t.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
    (n, r, o, s) => r + o.replace(/\n+$/, "") + s
  ), t;
}
function bC(e, t, n = {}) {
  const r = yC(e, t, n), o = t(r);
  return vC(o);
}
function wC(e, t, n) {
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
            const d = a.doc.textBetween(c, l, " ");
            if (d.trim()) {
              n.openFindReplace(d.trim());
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
            const { state: a } = e, { selection: c } = a, { $from: l } = c, d = l.nodeBefore?.textContent || "";
            if (d === "#####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 5, to: l.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (d === "####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 4, to: l.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (d === "###") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (d === "##") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 2, to: l.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (d === "#") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (d === "-" || d === "*") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(d)) {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - d.length, to: l.pos }).toggleOrderedList().run();
              return;
            }
            const u = /^(-\s*)?\[([ x])?\]$/.exec(d);
            if (u) {
              o.preventDefault();
              const f = u[2] === "x", p = a.schema.nodes.taskList, g = a.schema.nodes.taskItem;
              if (p && g) {
                const m = a.tr, y = l.pos - d.length, b = l.pos;
                m.delete(y, b);
                const x = m.doc.resolve(y).blockRange();
                if (x) {
                  const T = [
                    { type: p, attrs: {} },
                    { type: g, attrs: { checked: f } }
                  ];
                  m.wrap(x, T), e.view.dispatch(m);
                  return;
                }
              }
              e.chain().focus().deleteRange({ from: l.pos - d.length, to: l.pos }).toggleTaskList().run();
              return;
            }
            if (d === ">") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBlockquote().run();
              return;
            }
            if (d === "```") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).toggleCodeBlock().run();
              return;
            }
            if (d === "---" || d === "***") {
              o.preventDefault(), Qr(e, l.pos - 3, l.pos);
              return;
            }
            if (d === "—-") {
              o.preventDefault(), Qr(e, l.pos - 2, l.pos);
              return;
            }
            if (d === "—") {
              o.preventDefault(), Qr(e, l.pos - 1, l.pos);
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
function xC({
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
function kC({
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
  return F(async (d) => {
    if (e) {
      if (d === "markdown" && n.current === "wysiwyg") {
        const u = e.getHTML(), f = t.turndown(u);
        s(f), r.current = f;
      } else if (d === "wysiwyg" && n.current === "markdown") {
        const { marked: u } = await import("./marked.esm-Tjr8Gfse.js"), f = (m) => u.parse(m, { async: !1, breaks: !0 }), p = {
          enableTagAutoDetect: a,
          disableTagPills: !!c.tagPills,
          isValidTag: dn,
          normalizeTag: Vn,
          parseDateFromMarkdown: Bt,
          getDateVariant: Ma
        }, g = bC(r.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(g);
        });
      }
      o(d), n.current = d, i?.(d);
    }
  }, [e, t, i]);
}
const CC = 200;
function EC(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: r = !1,
    enabled: o = !0
  } = t, [s, i] = j({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), a = Y(null), c = Y(""), l = F((d) => {
    const u = d.trim(), f = u.length > 0 ? u.split(/\s+/).filter((v) => v.length > 0).length : 0, p = u.replace(/\s/g, "").length, g = d.length;
    let m = 0, y = 0;
    r && (m = u.length > 0 ? u.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, y = u.length > 0 ? (u.match(/[.!?]+/g) || []).length : 0);
    const b = Math.max(1, Math.ceil(f / CC));
    return {
      words: f,
      characters: p,
      charactersWithSpaces: g,
      paragraphs: m,
      sentences: y,
      readingTime: b,
      isCalculating: !1
    };
  }, [r]);
  return q(() => {
    if (!e || !o) return;
    const d = () => {
      a.current && clearTimeout(a.current), i((u) => ({ ...u, isCalculating: !0 })), a.current = setTimeout(() => {
        try {
          const u = e.getText();
          if (u === c.current) {
            i((p) => ({ ...p, isCalculating: !1 }));
            return;
          }
          c.current = u;
          const f = l(u);
          i(f);
        } catch (u) {
          console.warn("useWordCount: Error calculating word count", u), i((f) => ({ ...f, isCalculating: !1 }));
        }
      }, n);
    };
    return d(), e.on("update", d), () => {
      e.off("update", d), a.current && clearTimeout(a.current);
    };
  }, [e, n, o, l]), s;
}
function MC({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(Ef, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ I("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(Mc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ h("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(xn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ h("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(Mf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ h("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function TC({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ I(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ I("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ h(Tf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ h("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ I("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ I(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ h(Zs, { className: "w-4 h-4" }),
                "Recover"
              ]
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: t,
              className: "recovery-banner-dismiss p-2 rounded-md transition-colors duration-150",
              title: "Dismiss",
              "aria-label": "Dismiss recovery banner",
              children: /* @__PURE__ */ h(mt, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
function jr(e) {
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
    const d = a.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (d) {
      const v = d[2].toLowerCase() === "x";
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
    ], m = [];
    for (const v of g) {
      let x;
      for (v.regex.lastIndex = 0; (x = v.regex.exec(a)) !== null; )
        m.push({
          start: c + x.index,
          end: c + x.index + x[0].length,
          type: v.type,
          content: x[0]
        });
    }
    m.sort((v, x) => v.start - x.start);
    const y = [];
    let b = c;
    for (const v of m)
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
function oc(e) {
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
function Vr(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return Ft(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], d = i + l.length, u = t.filter((p) => p.start >= i && p.start < d);
      let f = i;
      for (const p of u)
        p.start > f && (o += Ft(e.substring(f, p.start))), o += `<span class="${oc(p.type)}">${Ft(p.content)}</span>`, f = p.end;
      f < d && (o += Ft(e.substring(f, d))), c < s.length - 1 && (o += `
`), i = d + 1;
    }
    return o;
  }
  const a = /* @__PURE__ */ new Map();
  n.forEach((c, l) => {
    for (let d = c.from; d < c.to; d++)
      a.set(d, { matchIdx: l, isCurrent: l === r });
  }), i = 0;
  for (let c = 0; c < s.length; c++) {
    const l = s[c], d = i + l.length, u = t.filter((p) => p.start >= i && p.start < d);
    let f = i;
    for (const p of u)
      p.start > f && (o += ms(e, f, p.start, null, a)), o += ms(e, p.start, p.end, oc(p.type), a), f = p.end;
    f < d && (o += ms(e, f, d, null, a)), c < s.length - 1 && (o += `
`), i = d + 1;
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
      const l = Ft(e.substring(c, i)), d = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${d}">${l}</mark></span>` : s += `<mark class="${d}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = Ft(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function SC({
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
  const l = Y(null), d = Y(null), u = Y(null), f = Y(null), p = 5e3, g = 80, [m, y] = j(() => {
    const k = jr(e);
    return Vr(e, k, i, a);
  }), b = Y(null), v = St(() => {
    if (e.length <= p) {
      const k = jr(e), N = Vr(e, k, i, a);
      return b.current && (clearTimeout(b.current), b.current = null), N;
    }
    return null;
  }, [e, i, a]);
  q(() => {
    if (e.length <= p) {
      const k = jr(e);
      y(Vr(e, k, i, a));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const k = jr(e);
      y(Vr(e, k, i, a)), b.current = null;
    }, g), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, i, a]);
  const x = v ?? m, T = F(() => {
    const k = l.current, N = d.current, C = u.current;
    if (k) {
      const D = C?.parentElement, L = D ? D.clientHeight : 200;
      k.style.height = "auto";
      const P = Math.max(k.scrollHeight, L, 200);
      k.style.height = `${P}px`, N && (N.style.height = `${P}px`);
    }
  }, []);
  q(() => {
    const k = l.current;
    if (!k) return;
    const N = (C) => {
      const D = k.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: L, scrollHeight: P, clientHeight: O } = D, $ = L <= 0, W = L + O >= P - 1;
      (C.deltaY > 0 && !W || C.deltaY < 0 && !$) && (C.preventDefault(), D.scrollTop += C.deltaY);
    };
    return k.addEventListener("wheel", N, { passive: !1 }), () => k.removeEventListener("wheel", N);
  }, []);
  const w = F(() => {
  }, []);
  q(() => {
    T();
  }, [e, T]), q(() => {
    o && l.current && l.current.focus();
  }, [o]), q(() => {
    if (f.current && l.current) {
      const { start: k, end: N } = f.current;
      l.current.selectionStart = k, l.current.selectionEnd = N, f.current = null;
    }
  }, [e]);
  const E = F((k) => {
    const N = k.target;
    f.current = {
      start: N.selectionStart,
      end: N.selectionEnd
    }, t(N.value);
  }, [t]), S = F((k) => {
    const N = k.currentTarget, C = N.selectionStart, D = N.selectionEnd, L = N.value, P = C !== D;
    if (c) {
      if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), P) {
          const O = L.substring(C, D), $ = L.substring(0, C) + "`" + O + "`" + L.substring(D);
          f.current = { start: C + 1, end: D + 1 }, t($);
        } else if (L[C] === "`")
          f.current = { start: C + 1, end: C + 1 }, t(L), N.selectionStart = N.selectionEnd = C + 1;
        else {
          const O = L.substring(0, C) + "``" + L.substring(D);
          f.current = { start: C + 1, end: C + 1 }, t(O);
        }
        return;
      }
      if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
        if (L[C - 1] === "*" && L[C], P) {
          k.preventDefault();
          const W = L.substring(C, D), V = L.substring(0, C) + "*" + W + "*" + L.substring(D);
          f.current = { start: C + 1, end: D + 1 }, t(V);
          return;
        }
        if (L[C] === "*") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        k.preventDefault();
        const $ = L.substring(0, C) + "**" + L.substring(D);
        f.current = { start: C + 1, end: C + 1 }, t($);
        return;
      }
      if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
        if (P) {
          k.preventDefault();
          const $ = L.substring(C, D), W = L.substring(0, C) + "_" + $ + "_" + L.substring(D);
          f.current = { start: C + 1, end: D + 1 }, t(W);
          return;
        }
        if (L[C] === "_") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        k.preventDefault();
        const O = L.substring(0, C) + "__" + L.substring(D);
        f.current = { start: C + 1, end: C + 1 }, t(O);
        return;
      }
      if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
        if (P) {
          k.preventDefault();
          const $ = L.substring(C, D), W = L.substring(0, C) + "~" + $ + "~" + L.substring(D);
          f.current = { start: C + 1, end: D + 1 }, t(W);
          return;
        }
        if (L[C] === "~") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        k.preventDefault();
        const O = L.substring(0, C) + "~~" + L.substring(D);
        f.current = { start: C + 1, end: C + 1 }, t(O);
        return;
      }
      if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), P) {
          const O = L.substring(C, D), $ = L.substring(0, C) + "[" + O + "]()" + L.substring(D);
          f.current = { start: D + 3, end: D + 3 }, t($);
        } else {
          const O = L.substring(0, C) + "[]()" + L.substring(D);
          f.current = { start: C + 1, end: C + 1 }, t(O);
        }
        return;
      }
      if (k.key === "]" && !k.ctrlKey && !k.metaKey && L[C] === "]") {
        k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
        return;
      }
      if (k.key === ")" && !k.ctrlKey && !k.metaKey && L[C] === ")") {
        k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
        return;
      }
      if (k.key === "Backspace" && !P && C > 0) {
        const O = L[C - 1], $ = L[C], W = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [V, R] of W)
          if (O === V && $ === R) {
            k.preventDefault();
            const A = L.substring(0, C - 1) + L.substring(C + 1);
            f.current = { start: C - 1, end: C - 1 }, t(A);
            return;
          }
        if (O === "[" && L.substring(C, C + 3) === "]()") {
          k.preventDefault();
          const V = L.substring(0, C - 1) + L.substring(C + 3);
          f.current = { start: C - 1, end: C - 1 }, t(V);
          return;
        }
      }
    }
    if (k.key === "Tab")
      if (k.preventDefault(), k.shiftKey) {
        const O = L.substring(0, C), $ = L.substring(C, D), W = L.substring(D), R = O.lastIndexOf(`
`) + 1, A = O.substring(0, R), H = O.substring(R), G = (H + $).split(`
`), z = G.map((B) => B.startsWith("  ") ? B.substring(2) : B.startsWith("	") ? B.substring(1) : B), U = A + z.join(`
`) + W, K = (H + $).length - z.join(`
`).length;
        f.current = {
          start: Math.max(R, C - (G[0].length - z[0].length)),
          end: D - K
        }, t(U);
      } else if (C === D) {
        const O = L.substring(0, C) + "  " + L.substring(D);
        f.current = { start: C + 2, end: C + 2 }, t(O);
      } else {
        const O = L.substring(0, C), $ = L.substring(C, D), W = L.substring(D), R = O.lastIndexOf(`
`) + 1, A = O.substring(0, R), G = (O.substring(R) + $).split(`
`), z = G.map((K) => "  " + K), U = A + z.join(`
`) + W;
        f.current = {
          start: C + 2,
          end: D + G.length * 2
        }, t(U);
      }
  }, [t, c]);
  return /* @__PURE__ */ I("div", { ref: u, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ h(
      "div",
      {
        ref: d,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: x || `<span class="md-placeholder">${Ft(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ h(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: E,
        onKeyDown: S,
        onScroll: w,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let sc = 0, $s = 0, yu = 0;
function DC(e) {
  $s++, yu = e;
}
const NC = bt(function({
  visible: t,
  onClose: n,
  editor: r
}) {
  const [o, s] = j(!1), [i, a] = j({
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
  }), c = Y([]), l = Y(performance.now()), d = Y(0), u = Y(0), f = Y(0), p = Y(0), [g, m] = j(new Array(60).fill(0)), [y, b] = j(new Array(60).fill(0));
  q(() => {
    if (!t || !r) return;
    const S = () => {
      const k = performance.now();
      queueMicrotask(() => {
        const N = performance.now() - k;
        DC(N);
      });
    };
    return r.on("transaction", S), () => {
      r.off("transaction", S);
    };
  }, [t, r]), q(() => {
    if (!t) return;
    let S = 0, k = performance.now(), N = 0;
    const C = (D) => {
      const L = D - l.current;
      if (l.current = D, c.current.push({ time: D, duration: L }), c.current.length > 120 && (c.current = c.current.slice(-120)), L > 16.67 && u.current++, S++, D - k >= 1e3) {
        N = S, S = 0, k = D;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((z, U) => z + U.duration, 0) / P.length : 0, $ = P.length > 0 ? Math.max(...P.map((z) => z.duration)) : 0, W = performance.memory, V = W ? W.usedJSHeapSize / (1024 * 1024) : 0, R = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, A = document.querySelectorAll("*").length, H = sc - f.current, G = $s - p.current;
        f.current = sc, p.current = $s, a({
          fps: N,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(V * 10) / 10,
          memoryTotal: Math.round(R),
          renderCount: H,
          transactionCount: G,
          lastTransactionTime: Math.round(yu * 100) / 100,
          domNodes: A,
          longFrames: u.current
        }), m((z) => [...z.slice(1), N]), b((z) => [...z.slice(1), O]), u.current = 0;
      }
      d.current = requestAnimationFrame(C);
    };
    return d.current = requestAnimationFrame(C), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const v = F(() => {
    n?.();
  }, [n]), x = F(() => {
    s((S) => !S);
  }, []);
  if (!t) return null;
  const T = (S) => S >= 55 ? "#4ade80" : S >= 30 ? "#fbbf24" : "#f87171", w = (S) => S <= 16.67 ? "#4ade80" : S <= 33.33 ? "#fbbf24" : "#f87171", E = (S, k, N) => {
    const L = S.map((P, O) => {
      const $ = O / (S.length - 1) * 120, W = 24 - Math.min(P, k) / k * 24;
      return `${$},${W}`;
    }).join(" ");
    return /* @__PURE__ */ h("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ h(
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
        /* @__PURE__ */ h(Sf, { size: 14 }),
        /* @__PURE__ */ h("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ h("button", { onClick: x, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ h(Tc, { size: 12 }) : /* @__PURE__ */ h(Sc, { size: 12 }) }),
        /* @__PURE__ */ h("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ h(mt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ I("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ h("span", { className: "perf-value", style: { color: T(i.fps) }, children: i.fps })
        ] }),
        E(g, 70, T(i.fps))
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ I("span", { className: "perf-value", style: { color: w(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ I("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ h("span", { className: "perf-label-sub", children: "Max" }),
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
        E(y, 50, w(i.frameTime))
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.renderCount })
        ] }),
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.transactionCount })
        ] }),
        /* @__PURE__ */ I("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ h("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ I("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.domNodes.toLocaleString() })
        ] }),
        i.memoryTotal > 0 && /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Memory" }),
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
class LC extends ef {
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
      return /* @__PURE__ */ h("div", { className: ae("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ I("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ h("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ h(Df, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ I("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ h("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ h("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ I("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ I(
            Ut,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ h(Zs, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ I(
            Ut,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ h(un, { className: "w-4 h-4" }),
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
                n ? /* @__PURE__ */ h(tr, { className: "w-3 h-3" }) : /* @__PURE__ */ h(Nf, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ I("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ I("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ h("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ I(ye, { children: [
                    /* @__PURE__ */ h(Lf, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ h("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ I(ye, { children: [
                    /* @__PURE__ */ h(wn, { className: "w-3 h-3" }),
                    /* @__PURE__ */ h("span", { children: "Copy" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ h("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }),
            t.stack && /* @__PURE__ */ h("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) })
          ] })
        ] })
      ] }) });
    }
    return this.props.children;
  }
}
function AC({ className: e = "", theme: t }) {
  const n = (r) => ({
    height: "1rem",
    width: r,
    borderRadius: "0.25rem",
    background: "var(--color-muted, #e5e7eb)",
    opacity: 0.5,
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  });
  return /* @__PURE__ */ h("div", { className: `markdown-editor-container ${e}`, "data-theme": t, children: /* @__PURE__ */ I(
    "div",
    {
      className: "editor-loading",
      style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" },
      children: [
        /* @__PURE__ */ h("div", { style: n("100%") }),
        /* @__PURE__ */ h("div", { style: n("83%") }),
        /* @__PURE__ */ h("div", { style: n("66%") }),
        /* @__PURE__ */ h("div", { style: { height: "0.75rem" } }),
        /* @__PURE__ */ h("div", { style: n("100%") }),
        /* @__PURE__ */ h("div", { style: n("75%") })
      ]
    }
  ) });
}
function IC({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ I("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ h(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ h(Af, {})
      }
    ),
    /* @__PURE__ */ h(
      "button",
      {
        onClick: () => t("markdown"),
        className: `editor-mode-toggle-btn ${e === "markdown" ? "active" : ""}`,
        title: "Raw Markdown",
        children: /* @__PURE__ */ h(Qs, {})
      }
    )
  ] });
}
function At({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: r
}) {
  const o = F(
    (a) => {
      r?.(a), a.stopPropagation();
    },
    [r]
  ), s = F((a) => {
    a.stopPropagation();
  }, []), i = F((a) => {
    a.stopPropagation();
  }, []);
  return qf(
    /* @__PURE__ */ h(
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
const He = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ h(
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
), gs = () => /* @__PURE__ */ h("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), ac = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], RC = bt(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = j(!1), d = Y(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = ac.find((g) => g.value === u)?.shortLabel || "P";
  q(() => {
    if (!c) return;
    const g = (m) => {
      d.current && !d.current.contains(m.target) && l(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [c]);
  const p = (g, m) => {
    if (g.preventDefault(), g.stopPropagation(), m === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const y = parseInt(m.replace("h", ""));
      t.chain().focus().toggleHeading({ level: y }).run();
    }
    l(!1);
  };
  return /* @__PURE__ */ I("div", { ref: d, className: "relative flex-shrink-0", children: [
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
          ${u !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ h("span", { className: "min-w-[18px] text-center", children: f }),
          /* @__PURE__ */ h(tr, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
        ]
      }
    ),
    c && /* @__PURE__ */ h(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: ac.map((g) => {
          const m = g.value === u;
          return /* @__PURE__ */ I(
            "button",
            {
              onMouseDown: (y) => p(y, g.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${m ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: g.shortLabel }),
                /* @__PURE__ */ h("span", { children: g.label })
              ]
            },
            g.value
          );
        })
      }
    )
  ] });
}), PC = bt(function({ onCopy: t, iconSize: n }) {
  const [r, o] = j(!1), s = Y(null);
  q(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const i = F((a) => {
    a.preventDefault(), a.stopPropagation(), t(), o(!0), s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 1500);
  }, [t]);
  return /* @__PURE__ */ h(
    He,
    {
      onMouseDown: i,
      title: r ? "Copied!" : "Copy as Markdown",
      children: r ? /* @__PURE__ */ h(xn, { size: n, className: "text-green-500" }) : /* @__PURE__ */ h(wn, { size: n })
    }
  );
}), OC = bt(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s, onCopySelectionAsMarkdown: i }) {
  const a = Y(null), c = hc({
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
  }), [l, d] = j(!1), [u, f] = j(""), [p, g] = j(!1), [m, y] = j({ top: 0, left: 0 }), b = Y(null), v = Y(null), x = Y(null), T = F(() => {
    if (u) {
      let C = u.trim();
      !/^https?:\/\//i.test(C) && !C.startsWith("mailto:") && (C = "https://" + C), t.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    d(!1), f("");
  }, [t, u]), w = (C) => {
    C.preventDefault(), C.stopPropagation();
    const D = t.getAttributes("link").href;
    f(D || ""), d(!0);
  }, E = F((C, D) => {
    C.preventDefault(), C.stopPropagation(), D();
  }, []);
  q(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: D } = t.state, { empty: L, from: P, to: O } = D, V = ("node" in D && D.node ? D.node : null)?.type?.name === "resizableImage";
          if (L || V || t.isActive("codeBlock")) {
            x.current && (clearTimeout(x.current), x.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              g(!1), d(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const R = t.view.coordsAtPos(P), A = t.view.coordsAtPos(O), H = b.current?.offsetWidth || 500, G = b.current?.offsetHeight || 40, z = 8, U = window.innerWidth;
          let K = 0, B = 0;
          if (b.current) {
            const ue = b.current.closest('[data-slot="dialog-content"]');
            if (ue) {
              const ve = ue.getBoundingClientRect();
              K = ve.left, B = ve.top;
            }
          }
          let _ = (R.left + A.left) / 2 - H / 2 - K;
          const ee = K ? U - K : U;
          _ = Math.max(z, Math.min(ee - H - z, _));
          let ne = R.top - G - 10 - B;
          ne < z && (ne = A.bottom + 10 - B), p ? y({ top: Math.max(z, ne), left: _ }) : (x.current && clearTimeout(x.current), x.current = setTimeout(() => {
            y({ top: Math.max(z, ne), left: _ }), g(!0);
          }, 50));
        } catch (D) {
          console.warn("FloatingToolbar: Error updating position", D);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), v.current && clearTimeout(v.current), x.current && clearTimeout(x.current);
    };
  }, [t, p]), q(() => {
    if (!p || !t || t.isDestroyed) return;
    const C = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!C) return;
    const D = () => {
      g(!1), d(!1);
    };
    return C.addEventListener("scroll", D, { passive: !0 }), window.addEventListener("scroll", D, { passive: !0 }), () => {
      C.removeEventListener("scroll", D), window.removeEventListener("scroll", D);
    };
  }, [p, t]);
  const S = (C) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!p || r)
    return null;
  const k = 15, N = l ? /* @__PURE__ */ h(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: m.top,
        left: m.left
      },
      onMouseDown: S,
      children: /* @__PURE__ */ I("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: u,
            onChange: (C) => f(C.target.value),
            onKeyDown: (C) => {
              C.key === "Enter" && (C.preventDefault(), T()), C.key === "Escape" && (d(!1), f(""));
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
          /* @__PURE__ */ h(
            "button",
            {
              onMouseDown: (C) => {
                C.preventDefault(), T();
              },
              className: `
              flex-1 sm:flex-none px-4 sm:px-3 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
              bg-primary text-primary-foreground
              hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation
            `,
              children: "Apply"
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onMouseDown: (C) => {
                C.preventDefault(), d(!1), f("");
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
        top: m.top,
        left: m.left
      },
      onMouseDown: S,
      children: [
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBold().run()),
            isActive: c?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ h(zs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleItalic().run()),
            isActive: c?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ h(Fs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: c?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ h(Us, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleStrike().run()),
            isActive: c?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ h(Ys, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleCode().run()),
            isActive: c?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ h(vc, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: c?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ h(bc, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: w,
            isActive: c?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ h(js, { size: k })
          }
        ),
        /* @__PURE__ */ h(gs, {}),
        /* @__PURE__ */ h(
          RC,
          {
            editor: t,
            isH1: c?.isH1 ?? !1,
            isH2: c?.isH2 ?? !1,
            isH3: c?.isH3 ?? !1,
            isH4: c?.isH4 ?? !1,
            isH5: c?.isH5 ?? !1,
            executeCommand: E
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: c?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ h(qs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: c?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ h(Vs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: c?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ h(Ks, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: c?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ h(Gs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          He,
          {
            onMouseDown: (C) => E(C, () => Js(t)),
            isActive: c?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ h(wc, { size: k })
          }
        ),
        i && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(gs, {}),
          /* @__PURE__ */ h(PC, { onCopy: i, iconSize: k })
        ] }),
        o && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(gs, {}),
          /* @__PURE__ */ h(
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
              children: /* @__PURE__ */ h(go, { size: k })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ h(At, { onMouseDown: S, children: N });
});
function _C({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = j(""), s = Y(null), i = Y(null), [a, c] = j({ top: 0, left: 0 });
  q(() => {
    if (t) {
      const g = e.getAttributes("link").href || "";
      o(g);
      try {
        const { view: m } = e, { from: y } = m.state.selection, b = m.coordsAtPos(y), v = b.bottom + 8, x = Math.max(16, Math.min(b.left, window.innerWidth - 420));
        c({ top: v, left: x });
      } catch {
        c({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), q(() => {
    if (!t) return;
    const g = (v) => {
      i.current && !i.current.contains(v.target) && n();
    }, m = () => {
      n();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 10), b = e.view.dom.closest(".editor-content-wrapper");
    return b?.addEventListener("scroll", m), () => {
      clearTimeout(y), document.removeEventListener("mousedown", g), b?.removeEventListener("scroll", m);
    };
  }, [t, n, e]);
  const l = F((g) => {
    if (g?.preventDefault(), r.trim()) {
      let m = r.trim();
      !/^https?:\/\//i.test(m) && !m.startsWith("mailto:") && (m = "https://" + m), e.chain().focus().extendMarkRange("link").setLink({ href: m }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), d = F((g) => {
    g.key === "Escape" ? (g.preventDefault(), n()) : g.key === "Enter" && (g.preventDefault(), l());
  }, [n, l]);
  if (!t) return null;
  const f = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", p = /* @__PURE__ */ h(
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
          /* @__PURE__ */ h(Ws, { className: "link-popover-icon", size: 16 }),
          /* @__PURE__ */ h(
            "input",
            {
              ref: s,
              type: "text",
              value: r,
              onChange: (g) => o(g.target.value),
              onKeyDown: d,
              placeholder: "Enter URL or paste link",
              className: "link-popover-input",
              autoComplete: "off",
              spellCheck: !1
            }
          )
        ] }),
        /* @__PURE__ */ h("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" })
      ] })
    }
  );
  return /* @__PURE__ */ h(At, { children: p });
}
function $C() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function HC({ editor: e, onEditLink: t }) {
  const [n, r] = j({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = Y(null), s = Y(null), i = Y(null), a = F((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const E = w.getAttribute("href") || "", S = w.getBoundingClientRect(), k = 44, N = 8, L = S.top >= k + N ? S.top - k - N : S.bottom + N, P = Math.max(16, Math.min(S.left, window.innerWidth - 340));
        i.current = w, r({
          isVisible: !0,
          url: E,
          position: { top: L, left: P },
          linkElement: w
        });
      } catch (E) {
        console.warn("LinkHoverTooltip: Error showing tooltip", E);
      }
    }
  }, [e]), c = F(() => {
    s.current = setTimeout(() => {
      i.current = null, r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = F(() => {
    s.current && (clearTimeout(s.current), s.current = null), i.current = null, r((w) => ({ ...w, isVisible: !1, linkElement: null }));
  }, []), d = F(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  q(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const E = (k) => {
      const C = k.target.closest("a");
      C && w.contains(C) && a(C);
    }, S = (k) => {
      const N = k.target, C = k.relatedTarget;
      if (N.closest("a")) {
        if (C && o.current?.contains(C))
          return;
        c();
      }
    };
    return w.addEventListener("mouseover", E), w.addEventListener("mouseout", S), () => {
      w.removeEventListener("mouseover", E), w.removeEventListener("mouseout", S), s.current && clearTimeout(s.current);
    };
  }, [e, a, c]), q(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const E = (S) => {
      const N = S.target.closest("a");
      if (N && w.contains(N)) {
        if (i.current === N && n.isVisible)
          return;
        S.preventDefault(), S.stopPropagation(), a(N);
      }
    };
    return w.addEventListener("touchend", E, { capture: !0 }), () => {
      w.removeEventListener("touchend", E, { capture: !0 });
    };
  }, [e, a, n.isVisible]), q(() => {
    if (!n.isVisible || !$C()) return;
    const w = (S) => {
      const k = S.target;
      o.current?.contains(k) || i.current && i.current.contains(k) || l();
    }, E = setTimeout(() => {
      document.addEventListener("touchstart", w, { passive: !0 });
    }, 100);
    return () => {
      clearTimeout(E), document.removeEventListener("touchstart", w);
    };
  }, [n.isVisible, l]), q(() => {
    if (!n.isVisible) return;
    const w = () => {
      l();
    }, E = e.view.dom.closest(".editor-content-wrapper");
    return E?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      E?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e, l]);
  const [u, f] = j(!1), p = F(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      f(!0), setTimeout(() => f(!1), 1500);
    });
  }, [n.url]), g = F(() => {
    if (n.url) {
      const w = document.createElement("a");
      w.href = n.url, w.target = "_blank", w.rel = "noopener noreferrer", w.click();
    }
  }, [n.url]), m = F(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: E } = w.state;
      let S = null, k = null;
      E.descendants((N, C) => {
        if (N.isText && N.marks.some((D) => D.type.name === "link")) {
          const D = w.nodeDOM(C);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return S = C, k = C + N.nodeSize, !1;
        }
        return !0;
      }), S !== null && k !== null ? e.chain().focus().setTextSelection({ from: S, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), y = F(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: E } = w.state;
      E.descendants((S, k) => {
        if (S.isText && S.marks.some((N) => N.type.name === "link")) {
          const N = w.nodeDOM(k);
          if (N && (N === n.linkElement || N.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + S.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((w) => ({ ...w, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const b = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, x = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", T = /* @__PURE__ */ h(
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
      onMouseEnter: d,
      onMouseLeave: c,
      children: /* @__PURE__ */ I("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ I(
          "button",
          {
            onClick: g,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ h(If, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ h("span", { className: "link-hover-tooltip-url", children: b || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ I("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: y,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ h(Rf, { size: 14 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: u ? /* @__PURE__ */ h(xn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ h(wn, { size: 14 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: m,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ h(Pf, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ h(At, { children: T });
}
const BC = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ h(mo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ h(Of, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ h(_f, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ h($f, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ h(Hf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ h(Bf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ h(Vs, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ h(Ks, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ h(Gs, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ h(qs, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ h(Wf, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ h(ys, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ h(Bs, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ h(xc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ h(vs, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ h(zf, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ h(Ff, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ h(kc, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ h(Cc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ h(Ec, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ h(Ws, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], WC = 32, zC = 8, FC = 320, UC = 210, Kr = 12;
function ic(e) {
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
function YC({ editor: e }) {
  const [t, n] = j(!1), [r, o] = j(""), [s, i] = j(0), [a, c] = j(null), [l, d] = j(!1), [u, f] = j({ top: 0, left: 0 }), [p, g] = j("below"), m = Y(null), y = Y(-1), b = Y(!1);
  q(() => {
    b.current = t;
  }, [t]);
  const v = BC.filter((N) => {
    if (!r) return !0;
    const C = r.toLowerCase();
    return N.title.toLowerCase().includes(C) || N.keywords?.some((D) => D.includes(C));
  }), x = Math.min(
    v.length * WC + zC,
    FC
  );
  ho(() => {
    if (!t || !a) return;
    const { top: N, bottom: C, left: D } = a, L = window.innerHeight, P = window.innerWidth, O = L - C - Kr, $ = N - Kr;
    let W;
    if (O >= x ? W = "below" : $ >= x ? W = "above" : W = O >= $ ? "below" : "above", g(W), m.current) {
      const V = Math.max(
        Kr,
        Math.min(D, P - UC - Kr)
      ), R = W === "below" ? C + 4 : N - x - 4;
      m.current.style.top = `${R}px`, m.current.style.left = `${V}px`;
    }
  }, [t, a, x, v.length]);
  const T = F(() => {
    const { state: N } = e, { selection: C } = N, D = C.from, L = y.current;
    if (L >= 0 && L <= D)
      e.chain().focus().deleteRange({ from: L, to: D }).run();
    else {
      const { $from: P } = C, $ = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const W = P.pos - (P.parentOffset - $);
        e.chain().focus().deleteRange({ from: W, to: P.pos }).run();
      }
    }
  }, [e]), w = F(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), E = F((N) => {
    const C = v[N];
    if (C) {
      if (T(), C.isImageCommand) {
        const { state: D } = e, L = e.view.coordsAtPos(D.selection.from);
        f({
          top: L.bottom + 8,
          left: L.left
        }), d(!0);
      } else
        C.command(e);
      w();
    }
  }, [e, v, T, w]), S = F((N, C) => {
    e.chain().focus().setImage({ src: N, alt: C }).run();
  }, [e]);
  return q(() => {
    if (!e) return;
    const N = () => {
      if (b.current) return;
      const { state: C } = e, { selection: D } = C, { $from: L } = D;
      if (L.parentOffset === 0) return;
      const P = L.parent.textBetween(0, L.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = L.pos - 1;
      const $ = ic(e);
      $ && (c($), n(!0), o(""), i(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), q(() => {
    if (!e || !t) return;
    const N = e.view.dom, C = (D) => {
      b.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), i((L) => (L + 1) % v.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), i((L) => (L - 1 + v.length) % v.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), E(s)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), w()));
    };
    return N.addEventListener("keydown", C, !0), () => {
      N.removeEventListener("keydown", C, !0);
    };
  }, [e, t, s, v, E, w]), q(() => {
    if (!e || !t) return;
    const N = () => {
      if (!b.current || y.current < 0) return;
      const { state: C } = e, { selection: D } = C, L = D.from, P = y.current;
      if (L <= P) {
        w();
        return;
      }
      try {
        const O = C.doc.textBetween(P + 1, L, void 0, "￼");
        if (O.includes(`
`)) {
          w();
          return;
        }
        o(O), i(0);
        const $ = ic(e);
        $ && c($);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, t, w]), q(() => {
    if (!t) return;
    const N = (C) => {
      m.current && !m.current.contains(C.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [t, w]), q(() => {
    t && v.length === 0 && r.length > 2 && w();
  }, [t, v.length, r, w]), q(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), q(() => {
    if (!t || !m.current) return;
    const N = m.current.querySelector(".slash-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ h(
    $c,
    {
      isOpen: l,
      onClose: () => d(!1),
      onInsert: S,
      position: u
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ h(At, { children: /* @__PURE__ */ h(
    "div",
    {
      ref: m,
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
            D.preventDefault(), D.stopPropagation(), E(C);
          },
          onMouseEnter: () => i(C),
          children: [
            /* @__PURE__ */ h("span", { className: "slash-icon", children: N.icon }),
            /* @__PURE__ */ h("span", { className: "slash-label", children: N.title })
          ]
        },
        N.title
      ))
    }
  ) });
}
const jC = 340, VC = 36, KC = 8, GC = 240, Gr = 8;
function cc(e) {
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
function qC({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = j(!1), [s, i] = j(""), [a, c] = j([]), [l, d] = j(0), [u, f] = j(null), [p, g] = j("below"), [m, y] = j(!1), b = Y(!1), v = Y(null), x = Y(-1), T = Y(null);
  q(() => {
    b.current = r;
  }, [r]);
  const w = F(() => {
    o(!1), i(""), c([]), d(0), x.current = -1;
  }, []), E = F((D) => {
    const L = x.current;
    if (L < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const $ = P.tr.delete(L, O), W = P.schema.marks.wikiLink;
      if (W) {
        const V = W.create({ pageName: D }), R = P.schema.text(D, [V]);
        $.insert(L, R);
        const A = L + D.length;
        $.setSelection(Ke.create($.doc, A)), $.removeStoredMark(W);
      } else
        $.insertText(`[[${D}]]`, L);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
    }
    w();
  }, [e, w]);
  q(() => {
    if (!e) return;
    const D = () => {
      if (b.current) return;
      const { state: L } = e, { selection: P } = L, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      x.current = O.pos - 2;
      const W = cc(e);
      W && (f(W), o(!0), i(""), c([]), d(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), q(() => {
    if (!e || !r) return;
    const D = e.view.dom, L = (P) => {
      if (b.current) {
        if (P.key === "ArrowDown") {
          P.preventDefault();
          const O = a.length + (s.trim() ? 1 : 0) - 1;
          d(($) => Math.min($ + 1, O));
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), d((O) => Math.max(O - 1, 0));
          return;
        }
        if (P.key === "Enter" || P.key === "Tab") {
          P.preventDefault(), P.stopPropagation(), l < a.length ? E(a[l].title) : s.trim() && n ? (n(s.trim()), w()) : s.trim() && E(s.trim());
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
    return D.addEventListener("keydown", L, !0), () => {
      D.removeEventListener("keydown", L, !0);
    };
  }, [e, r, a, l, s, E, w, n]), q(() => {
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
        const $ = P.doc.textBetween(L + 2, O, void 0, "￼");
        if ($.includes(`
`) || $.includes("]]")) {
          w();
          return;
        }
        i($), d(0);
        const W = cc(e);
        W && f(W);
      } catch {
        w();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, r, w]), q(() => {
    if (r) {
      if (T.current && clearTimeout(T.current), !s.trim()) {
        y(!0), T.current = setTimeout(async () => {
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
      return y(!0), T.current = setTimeout(async () => {
        try {
          const D = await t(s.trim());
          c(D);
        } catch {
          c([]);
        }
        y(!1);
      }, 150), () => {
        T.current && clearTimeout(T.current);
      };
    }
  }, [r, s, t]), q(() => {
    if (!r) return;
    const D = (L) => {
      v.current && !v.current.contains(L.target) && w();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [r, w]), q(() => {
    if (!r || !v.current) return;
    const D = v.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const S = a.length + (s.trim() ? 1 : 0), k = Math.min(
    Math.max(S, 1) * VC + KC,
    GC
  );
  if (ho(() => {
    if (!r || !u) return;
    const { top: D, bottom: L, left: P } = u, O = window.innerHeight, $ = window.innerWidth, W = O - L - Gr, V = D - Gr;
    let R;
    if (W >= k ? R = "below" : V >= k ? R = "above" : R = W >= V ? "below" : "above", g(R), v.current) {
      const A = Math.max(
        Gr,
        Math.min(P, $ - jC - Gr)
      ), H = R === "below" ? L + 4 : D - k - 4;
      v.current.style.top = `${H}px`, v.current.style.left = `${A}px`;
    }
  }, [r, u, k, S]), !r) return null;
  const N = s.trim() && !a.some((D) => D.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ h(At, { children: /* @__PURE__ */ I(
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
        m && a.length === 0 && /* @__PURE__ */ h("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ h("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
        a.map((D, L) => /* @__PURE__ */ I(
          "div",
          {
            className: `wikilink-item ${L === l ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), E(D.title);
            },
            onMouseEnter: () => d(L),
            children: [
              /* @__PURE__ */ h("span", { className: "wikilink-icon", children: /* @__PURE__ */ h(Qs, { size: 14 }) }),
              /* @__PURE__ */ h("span", { className: "wikilink-label", children: D.title }),
              /* @__PURE__ */ h("span", { className: "wikilink-type", children: D.type })
            ]
          },
          D.id
        )),
        N && /* @__PURE__ */ I(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (D) => {
              D.preventDefault(), n ? (n(s.trim()), w()) : E(s.trim());
            },
            onMouseEnter: () => d(a.length),
            children: [
              /* @__PURE__ */ h("span", { className: "wikilink-icon", children: /* @__PURE__ */ h(Xs, { size: 14 }) }),
              /* @__PURE__ */ I("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] })
            ]
          }
        ),
        !m && a.length === 0 && !s.trim() && /* @__PURE__ */ h("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ h("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }) })
      ]
    }
  ) });
}
function XC({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = j(e), [c, l] = j(t), d = Y(null), u = Y(null);
  q(() => {
    u.current?.focus(), u.current?.select();
  }, []), q(() => {
    const y = (v) => {
      d.current && !d.current.contains(v.target) && s();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [s]), q(() => {
    const y = (b) => {
      b.key === "Escape" ? s() : b.key === "Enter" && (b.metaKey || b.ctrlKey) && f();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i, c, s]);
  const f = () => {
    i.trim() && r(i.trim(), c.trim());
  }, g = (() => {
    let x = n.x - 160, T = n.y + 10;
    return x + 320 > window.innerWidth - 16 && (x = window.innerWidth - 320 - 16), x < 16 && (x = 16), T + 280 > window.innerHeight - 16 && (T = n.y - 280 - 10), T < 16 && (T = 16), { left: x, top: T };
  })(), m = /* @__PURE__ */ I(
    "div",
    {
      ref: d,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: g.left,
        top: g.top
      },
      children: [
        /* @__PURE__ */ I("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ h("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ h(mt, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ I("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ I("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ h(js, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ h("span", { children: "Image URL" })
            ] }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: u,
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
              /* @__PURE__ */ h(mo, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ h("span", { children: "Alt Text" })
            ] }),
            /* @__PURE__ */ h(
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
          /* @__PURE__ */ h(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ h(un, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ I("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ h(
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
                  /* @__PURE__ */ h(xn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ h(At, { children: m });
}
function ZC({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = j(!1), [o, s] = j(0), i = F((d) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer?.types.includes("Files") && (s((u) => u + 1), r(!0));
  }, []), a = F((d) => {
    d.preventDefault(), d.stopPropagation(), s((u) => {
      const f = u - 1;
      return f === 0 && r(!1), f;
    });
  }, []), c = F((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), l = F((d) => {
    d.preventDefault(), d.stopPropagation(), r(!1), s(0);
  }, []);
  return q(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", i), d.addEventListener("dragleave", a), d.addEventListener("dragover", c), d.addEventListener("drop", l), () => {
      d.removeEventListener("dragenter", i), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", c), d.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ h("div", { className: "image-drop-zone", children: /* @__PURE__ */ I("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ h("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ h(Uf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ I("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ h("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ h("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
const QC = {
  SpellCheck: jf,
  RefreshCw: Yf,
  Minimize2: Sc,
  Maximize2: Tc,
  FileText: Qs,
  MessageSquare: Dc,
  Sparkles: go
};
function JC({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = j(""), [a, c] = j(!1), l = Y(null), d = Y(null), u = e.filter((y) => y.scope === t || y.scope === "both");
  q(() => {
    const y = (v) => {
      l.current && !l.current.contains(v.target) && r();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [r]), q(() => {
    const y = (b) => {
      b.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), q(() => {
    a && d.current && d.current.focus();
  }, [a]);
  const p = F(() => {
    const b = u.length * 40 + (a ? 56 : 0) + 16, v = window.innerWidth, x = window.innerHeight;
    let T = o.top, w = o.left;
    return w + 260 > v - 8 && (w = v - 260 - 8), w < 8 && (w = 8), T + b > x - 8 && (T = o.top - b - 8), T < 8 && (T = 8), { top: T, left: w };
  }, [o, u.length, a])(), g = () => {
    s.trim() && (n("custom", s.trim()), i(""), c(!1));
  }, m = /* @__PURE__ */ h(
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
            /* @__PURE__ */ h("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ I("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ h(Dc, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ h(
                "input",
                {
                  ref: d,
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
            /* @__PURE__ */ h("div", { className: "h-px bg-border mx-2 my-0.5" }),
            u.filter((y) => !y.showCustomPrompt).map((y) => {
              const b = y.icon ? QC[y.icon] : go;
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
                    b && /* @__PURE__ */ h(b, { size: 15, className: "text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ h("span", { children: y.label })
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
  return /* @__PURE__ */ h(At, { onMouseDown: (y) => y.preventDefault(), children: m });
}
function e1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = Y(null), a = Y(null), [c, l] = j(!1), [d, u] = j(0);
  q(() => {
    if (i.current) {
      const w = new ResizeObserver((E) => {
        for (const S of E)
          u(S.contentRect.height);
      });
      return w.observe(i.current), () => w.disconnect();
    }
  }, []), q(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), q(() => {
    const w = (E) => {
      E.key === "Escape" && s();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [s]);
  const f = St(() => {
    const k = window.innerWidth, N = window.innerHeight;
    let C = t.selectionCenterX - 380 / 2;
    C + 380 > k - 8 && (C = k - 380 - 8), C < 8 && (C = 8);
    const D = N - t.selectionBottom - 8, L = t.selectionTop - 8, P = d || 200;
    let O, $ = !1;
    return D >= P || D >= L ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, $ = !0), O < 8 && (O = 8), O + P > N - 8 && (O = N - P - 8), { top: O, left: C, placedAbove: $ };
  }, [t, d]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", m = e.status === "streaming", y = e.status === "complete", b = e.status === "error", v = F(() => {
    navigator.clipboard.writeText(p), l(!0), setTimeout(() => l(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const x = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", T = /* @__PURE__ */ h(
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
                m && /* @__PURE__ */ h(Mc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ h("span", { className: "font-medium", children: b ? "Error" : g }),
                m && /* @__PURE__ */ h("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ h(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (w) => {
                    w.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ h(mt, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ h(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: b ? /* @__PURE__ */ h("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ I("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  m && /* @__PURE__ */ h("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ I("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || b) && /* @__PURE__ */ I(ye, { children: [
                y && /* @__PURE__ */ I(ye, { children: [
                  /* @__PURE__ */ h(
                    cn,
                    {
                      icon: bs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ h(
                    cn,
                    {
                      icon: Xs,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ h(
                    cn,
                    {
                      icon: c ? xn : wn,
                      label: c ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ h(
                  cn,
                  {
                    icon: Zs,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ h("div", { className: "flex-1" }),
                /* @__PURE__ */ h(
                  cn,
                  {
                    icon: mt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              m && /* @__PURE__ */ I(ye, { children: [
                /* @__PURE__ */ h("div", { className: "flex-1" }),
                /* @__PURE__ */ h(
                  cn,
                  {
                    icon: mt,
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
  return /* @__PURE__ */ h(At, { onMouseDown: (w) => w.preventDefault(), children: T });
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
        /* @__PURE__ */ h(e, { size: 12 }),
        /* @__PURE__ */ h("span", { children: t })
      ]
    }
  );
}
function t1({
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
  onCopySelectionAsMarkdown: d,
  aiDropdown: u,
  aiActions: f,
  onAIActionSelect: p,
  onAIDropdownClose: g,
  aiState: m,
  aiPopoverPosition: y,
  onAIReplace: b,
  onAIInsert: v,
  onAIRetry: x,
  onAIDiscard: T,
  onLinkPopoverClose: w,
  onEditLink: E,
  onWikiLinkSearch: S,
  imageEditState: k,
  onImageSave: N,
  onImageDelete: C,
  onImageEditClose: D
}) {
  return /* @__PURE__ */ I(ye, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ h(ZC, { containerRef: r, enabled: o }),
    !t && s && /* @__PURE__ */ h(
      OC,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: i,
        aiEnabled: a || !!c,
        onAISparklesClick: (L) => l(L),
        onCopySelectionAsMarkdown: d
      }
    ),
    u && f && /* @__PURE__ */ h(
      JC,
      {
        actions: f,
        scope: u.scope,
        position: u.position,
        onAction: p,
        onClose: g
      }
    ),
    m.status !== "idle" && /* @__PURE__ */ h(
      e1,
      {
        state: m,
        position: y,
        onReplace: b,
        onInsert: v,
        onRetry: x,
        onDiscard: T
      }
    ),
    !n.slashCommands && /* @__PURE__ */ h(YC, { editor: e, disabledFeatures: n }),
    !n.wikiLinks && S && /* @__PURE__ */ h(qC, { editor: e, onSearch: S }),
    /* @__PURE__ */ h(
      _C,
      {
        editor: e,
        isOpen: i,
        onClose: w
      }
    ),
    /* @__PURE__ */ h(HC, { editor: e, onEditLink: E }),
    !n.images && k?.isOpen && /* @__PURE__ */ h(
      XC,
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
function n1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function r1(e, t) {
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
function o1(e) {
  const [t, n] = tf(r1, { status: "idle" }), r = Y(null), o = F(async (a, c, l, d, u) => {
    if (e) {
      n({
        type: "start-streaming",
        action: a,
        actionLabel: c,
        inputText: l,
        selectionRange: d
      });
      try {
        const f = e(a, l, u);
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
  }, [e]), s = F(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = F(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const lc = nf(
  () => Promise.resolve().then(() => y1).then((e) => ({ default: e.TableOfContents }))
), s1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, oE = rf(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  markdownChangeDebounceMs: s = 0,
  placeholder: i = 'Start writing... Use "/" for commands',
  editable: a = !0,
  autofocus: c = !1,
  className: l = "",
  showToolbar: d = !0,
  showWordCount: u = !0,
  wordCountDebounceMs: f = 1e3,
  theme: p,
  colorTheme: g = "colorful",
  autoSave: m = !0,
  autoSaveKey: y = "paragon-editor-content",
  autoSaveDelay: b = 1e3,
  showRecoveryBanner: v = !0,
  showFloatingToolbar: x = !0,
  maxImageSize: T = 5 * 1024 * 1024,
  onImageUploadStart: w,
  onImageUploadComplete: E,
  onImageUploadError: S,
  onImageUpload: k,
  resolveImageSrc: N,
  showModeToggle: C = !0,
  // New props
  initialMode: D = "wysiwyg",
  onModeChange: L,
  onReady: P,
  onFocus: O,
  onBlur: $,
  onSelectionChange: W,
  onDestroy: V,
  onSave: R,
  onRecover: A,
  onWikiLinkClick: H,
  validateWikiLink: G,
  onWikiLinkSearch: z,
  onLinkClick: U,
  findReplaceOpen: K,
  onFindReplaceChange: B,
  showCopyButton: J = !0,
  renderToolbar: _,
  renderFooter: ee,
  disabledFeatures: ne = {},
  minHeight: ue = "200px",
  maxHeight: ve,
  spellCheck: be = !0,
  headingLevels: Ue = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: It = [1, 2, 3],
  // TOC props
  showTableOfContents: wt = !1,
  tocVisible: Nn = !0,
  onTocVisibilityChange: Ln,
  tocTitle: dr = "",
  tocMinLevel: ur = 1,
  tocMaxLevel: fr = 4,
  tocShowLevelIndicators: pr = !1,
  tocHighlightActive: An = !0,
  tocTreeView: qt = !1,
  tocWidth: Xt = "240px",
  tocPosition: Zt = "right",
  tocScrollOffset: hr = 20,
  onTocItemClick: mr,
  renderTocItem: gr,
  tocShowToggleButton: yr = !0,
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
  enableTagAutoDetect: vr = !1,
  enableHexColorHighlight: br = !1,
  enableCollapsibleHeadings: $o = !1,
  enableCollapsibleLists: ce = !1,
  // Performance mode
  performanceMode: he = "auto",
  // Error boundary
  onEditorError: oe,
  // AI writing assistant
  aiActions: fe,
  onAIAction: Te,
  onAISetupRequired: de
}, Ho) {
  const [Qt] = j(() => s1()), [Jt, In] = j(D), [en, Bo] = j(""), wr = Y(D), xr = Y(""), Rn = Y(null), [Cu, Ta] = j(0), kr = !!(fe && fe.length > 0 && Te), { state: Ye, executeAction: Cr, abort: Eu, reset: xt } = o1(Te), [Mu, Wo] = j(null), [Tu, Su] = j({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), Du = Y(Te);
  Du.current = Te;
  const Sa = Y(de);
  Sa.current = de;
  const [Nu, Lu] = j([]), [Au, Iu] = j(0), Ru = F((se, Ce) => {
    Lu(se), Iu(Ce);
  }, []), Da = Y(w), Na = Y(E), La = Y(S), Aa = Y(k), Ia = Y(N), Ra = Y(H), Pa = Y(G), Oa = Y(z);
  Da.current = w, Na.current = E, La.current = S, Aa.current = k, Ia.current = N, Ra.current = H, Pa.current = G, Oa.current = z;
  const _a = 2e3, [zo, Pu] = j(() => he === "lightweight" ? !0 : he === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > _a : !1), Ou = Y(0), $a = Y(zo);
  $a.current = zo;
  const [Fo, Er] = j(null), _u = rC({
    placeholder: i,
    isMobile: Qt,
    maxImageSize: T,
    headingLevels: Ue,
    collapsibleHeadingLevels: It,
    disabledFeatures: ne,
    progressiveSelectAll: _o,
    enableCollapsibleHeadings: $o,
    enableCollapsibleLists: ce,
    enableTagAutoDetect: vr,
    enableHexColorHighlight: br,
    isLightweight: zo,
    setImageEditState: Er,
    callbackRefs: {
      onImageUploadStart: Da,
      onImageUploadComplete: Na,
      onImageUploadError: La,
      onImageUpload: Aa,
      resolveImageSrc: Ia,
      onWikiLinkClick: Ra,
      validateWikiLink: Pa
    }
  }), { editor: re, turndownService: Mr } = cC({
    extensions: _u,
    content: t,
    editable: a,
    autofocus: c,
    spellCheck: be,
    initialMode: D,
    performanceMode: he,
    lightweightThreshold: _a,
    onChange: n,
    onHTMLChange: r,
    onMarkdownChange: o,
    markdownChangeDebounceMs: s,
    onReady: P,
    onDestroy: V,
    onFocus: O,
    onBlur: $,
    onSelectionChange: W,
    onLinkClick: U,
    editorModeRef: wr,
    rawMarkdownRef: xr,
    setRawMarkdown: Bo,
    setIsLightweight: Pu,
    lightweightCheckCounterRef: Ou,
    isLightweightRef: $a
  }), [$u, Tr] = j(!1), [Hu, Bu] = j(!1), Wu = K !== void 0 ? K : Hu, Rt = F((se) => {
    Bu(se), B?.(se);
  }, [B]), [zu, Sr] = j(0), [Fu, Uu] = j(""), Pt = ib(re, {
    storageKey: y,
    debounceMs: b,
    enabled: m,
    onSave: (se) => {
      R?.(se);
    },
    onRecover: (se) => {
      A?.(se);
    }
  }), Uo = kC({
    editor: re,
    turndownService: Mr,
    editorModeRef: wr,
    rawMarkdownRef: xr,
    setEditorMode: In,
    setRawMarkdown: Bo,
    onModeChange: L,
    enableTagAutoDetect: vr,
    disabledFeatures: ne
  }), Ha = F((se) => {
    Bo(se), xr.current = se, o?.(se);
  }, [o]), Dr = EC(re, {
    debounceMs: f,
    extendedStats: !1,
    enabled: u
  });
  lb(Ho, {
    editor: re,
    turndownService: Mr,
    editorModeRef: wr,
    handleModeSwitch: Uo,
    wordCount: Dr,
    autoSaveState: Pt,
    setIsFindReplaceOpen: Rt,
    setFindReplaceFocusTrigger: Sr
  }), xC({
    editorModeRef: wr,
    rawMarkdownRef: xr,
    editorMode: Jt,
    handleModeSwitch: Uo,
    setIsFindReplaceOpen: Rt,
    setFindReplaceFocusTrigger: Sr
  });
  const Yu = St(() => ({
    openLinkPopover: () => Tr(!0),
    openFindReplace: (se) => {
      se && Uu(se), Rt(!0), Sr((Ce) => Ce + 1);
    },
    openFindReplaceWithReplace: () => {
      Rt(!0);
    }
  }), [Rt]);
  wC(re, Qt, Yu);
  const Ba = F((se, Ce) => {
    if (!kr) {
      Sa.current?.();
      return;
    }
    if (!re) return;
    let Oe = { top: 0, left: 0 };
    if (Ce) {
      const Re = Ce.getBoundingClientRect();
      Oe = { top: Re.bottom + 4, left: Re.left };
    } else {
      const { from: Re, to: et } = re.state.selection, kt = re.view.coordsAtPos(Re), tn = re.view.coordsAtPos(et);
      Oe = { top: tn.bottom + 8, left: (kt.left + tn.left) / 2 };
    }
    Wo({ scope: se, position: Oe });
  }, [kr, re]), ju = F((se, Ce) => {
    if (!re || !fe) return;
    const Oe = fe.find((Yo) => Yo.id === se);
    if (!Oe) return;
    const { from: Re, to: et } = re.state.selection, kt = Re !== et ? re.state.doc.textBetween(Re, et, `
`) : "", tn = Oe.scope === "document" || !kt ? re.getText() : kt, Nr = re.view.coordsAtPos(Re), Pn = re.view.coordsAtPos(et);
    Su({
      selectionTop: Nr.top,
      selectionBottom: Pn.bottom,
      selectionCenterX: (Nr.left + Pn.right) / 2
    }), Wo(null), Cr(se, Oe.label, tn, { from: Re, to: et }, Ce);
  }, [re, fe, Cr]), Vu = F(() => {
    if (!re || Ye.status !== "complete") return;
    const { selectionRange: se, result: Ce } = Ye;
    re.chain().focus().setTextSelection(se).deleteSelection().insertContent(Ce).run(), xt();
  }, [re, Ye, xt]), Ku = F(() => {
    if (!re || Ye.status !== "complete") return;
    const { selectionRange: se, result: Ce } = Ye;
    re.chain().focus().setTextSelection(se.to).insertContent(`
` + Ce).run(), xt();
  }, [re, Ye, xt]), Gu = F(() => {
    if (!(Ye.status !== "complete" && Ye.status !== "error"))
      if (Ye.status === "complete") {
        const { action: se, actionLabel: Ce, inputText: Oe, selectionRange: Re } = Ye;
        xt(), Cr(se, Ce, Oe, Re);
      } else
        xt();
  }, [Ye, xt, Cr]), Wa = F(() => {
    if (!re) return;
    const { from: se, to: Ce, empty: Oe } = re.state.selection;
    let Re, et;
    if (Oe)
      Re = re.getHTML(), et = re.getText();
    else {
      const tn = re.state.doc.slice(se, Ce), Nr = Lc.fromSchema(re.schema), Pn = document.createElement("div"), Yo = Nr.serializeFragment(tn.content);
      Pn.appendChild(Yo), Re = Pn.innerHTML, et = re.state.doc.textBetween(se, Ce, `
`);
    }
    let kt = Yt(Mr.turndown(Re));
    Oe && (kt = Rs(kt)), navigator.clipboard.writeText(kt).then(() => {
      co(Oe ? "Document copied as Markdown" : "Selection copied as Markdown");
    }).catch(() => {
      navigator.clipboard.writeText(et).then(() => {
        co(Oe ? "Document copied" : "Selection copied");
      });
    });
  }, [re, Mr]);
  if (!re)
    return /* @__PURE__ */ h(AC, { className: l, theme: p });
  const za = /* @__PURE__ */ h(
    tb,
    {
      editor: re,
      onCopyMarkdown: J ? Wa : void 0,
      onOpenLinkPopover: () => Tr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Rt(!0), Sr((se) => se + 1);
      },
      disabledFeatures: ne,
      autoReorderChecklist: Oo,
      aiEnabled: kr || !!de,
      onAISparklesClick: (se) => Ba("document", se)
    }
  ), Fa = /* @__PURE__ */ I("div", { className: "editor-footer", children: [
    m && /* @__PURE__ */ h(
      MC,
      {
        status: Pt.status,
        lastSaved: Pt.lastSaved
      }
    ),
    /* @__PURE__ */ h("div", { className: "word-count", children: /* @__PURE__ */ I("span", { children: [
      Dr.words,
      " words"
    ] }) })
  ] }), qu = {
    minHeight: ue,
    ...ve && { maxHeight: ve, overflowY: "auto" }
  };
  return /* @__PURE__ */ I("div", { className: `markdown-editor-container ${g === "neutral" ? "color-theme-neutral" : ""} ${l}`, "data-theme": p, children: [
    m && v && Pt.hasRecoverableContent && /* @__PURE__ */ h(
      TC,
      {
        onRecover: () => {
          Pt.recover();
        },
        onDismiss: Pt.dismissRecovery
      }
    ),
    d && /* @__PURE__ */ I("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      _ ? _(re, za) : za,
      C && /* @__PURE__ */ h(IC, { editorMode: Jt, onModeSwitch: Uo })
    ] }),
    !Qt && /* @__PURE__ */ h(
      nb,
      {
        editor: re,
        isOpen: Wu,
        onClose: () => Rt(!1),
        focusTrigger: zu,
        initialSearchQuery: Fu,
        editorMode: Jt,
        rawMarkdown: en,
        onRawMarkdownChange: Ha,
        onMatchesChange: Ru
      }
    ),
    /* @__PURE__ */ h(sb, { editor: re }),
    /* @__PURE__ */ I("div", { className: `editor-main-area ${wt ? "editor-with-toc" : ""}`, children: [
      wt && Zt === "left" && /* @__PURE__ */ h(Ua, { fallback: null, children: /* @__PURE__ */ h(
        lc,
        {
          editor: re,
          visible: Nn,
          onVisibilityChange: Ln,
          title: dr,
          minLevel: ur,
          maxLevel: fr,
          showLevelIndicators: pr,
          highlightActive: An,
          treeView: qt,
          width: Xt,
          position: Zt,
          scrollOffset: hr,
          onItemClick: mr,
          renderItem: gr,
          showToggleButton: yr,
          scrollContainerRef: Rn
        }
      ) }),
      /* @__PURE__ */ I(
        LC,
        {
          resetKey: `${t}-${Cu}`,
          onRetry: () => Ta((se) => se + 1),
          onClearContent: () => {
            re && re.commands.clearContent(), n?.(""), r?.(""), o?.(""), Ta((se) => se + 1);
          },
          onError: oe,
          children: [
            /* @__PURE__ */ h("div", { className: "editor-content-wrapper", ref: Rn, style: qu, children: Jt === "wysiwyg" ? /* @__PURE__ */ I(ye, { children: [
              /* @__PURE__ */ h(Zu, { editor: re, className: "editor-content" }),
              /* @__PURE__ */ h(
                t1,
                {
                  editor: re,
                  isMobile: Qt,
                  disabledFeatures: ne,
                  containerRef: Rn,
                  editable: a,
                  showFloatingToolbar: x,
                  isLinkPopoverOpen: $u,
                  aiEnabled: kr,
                  onAISetupRequired: de,
                  onAISparklesClick: (se) => Ba("selection", se),
                  onCopySelectionAsMarkdown: Wa,
                  aiDropdown: Mu,
                  aiActions: fe,
                  onAIActionSelect: ju,
                  onAIDropdownClose: () => Wo(null),
                  aiState: Ye,
                  aiPopoverPosition: Tu,
                  onAIReplace: Vu,
                  onAIInsert: Ku,
                  onAIRetry: Gu,
                  onAIDiscard: () => {
                    Eu(), xt();
                  },
                  onLinkPopoverClose: () => Tr(!1),
                  onEditLink: () => Tr(!0),
                  onWikiLinkSearch: Oa.current,
                  imageEditState: Fo,
                  onImageSave: (se, Ce) => {
                    re.chain().focus().setNodeSelection(Fo.pos).updateAttributes("resizableImage", {
                      src: se,
                      alt: Ce
                    }).run(), Er(null);
                  },
                  onImageDelete: () => {
                    re.chain().focus().setNodeSelection(Fo.pos).deleteSelection().run(), Er(null);
                  },
                  onImageEditClose: () => Er(null)
                }
              )
            ] }) : /* @__PURE__ */ h(
              SC,
              {
                content: en,
                onChange: Ha,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: Nu,
                currentMatchIndex: Au,
                autoClosePairs: Io
              }
            ) }),
            /* @__PURE__ */ h(n1, { scrollContainerRef: Rn })
          ]
        }
      ),
      wt && Zt === "right" && /* @__PURE__ */ h(Ua, { fallback: null, children: /* @__PURE__ */ h(
        lc,
        {
          editor: re,
          visible: Nn,
          onVisibilityChange: Ln,
          title: dr,
          minLevel: ur,
          maxLevel: fr,
          showLevelIndicators: pr,
          highlightActive: An,
          treeView: qt,
          width: Xt,
          position: Zt,
          scrollOffset: hr,
          onItemClick: mr,
          renderItem: gr,
          showToggleButton: yr,
          scrollContainerRef: Rn
        }
      ) })
    ] }),
    u && (ee ? ee(
      { words: Dr.words, characters: Dr.characters },
      Pt.status,
      Fa
    ) : Fa),
    /* @__PURE__ */ h(NC, { visible: Ro, onClose: Po, editor: re })
  ] });
}), sE = yo.create({
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
}), vu = {
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
}, a1 = {
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
}, i1 = {
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
}, c1 = {
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
}, Un = {
  dark: vu,
  light: a1,
  sepia: i1,
  nord: c1
};
function l1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function aE(e, t, n, r) {
  const o = Un[e] || vu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const bu = gc(null);
function iE({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = j(t), s = Un[r] || Un.dark, i = F((c) => {
    Un[c] && o(c);
  }, []);
  q(() => {
    n?.current && l1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(Un)
  };
  return /* @__PURE__ */ h(bu.Provider, { value: a, children: e });
}
function cE() {
  const e = yc(bu);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const dc = [
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
function lE({ node: e, updateAttributes: t }) {
  const [n, r] = j(!1), o = e.attrs.language || "plaintext";
  dc.find((i) => i.value === o)?.label;
  const s = F(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ I(eo, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ I("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ I("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ h(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: dc.map(({ value: i, label: a }) => /* @__PURE__ */ h("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ h(tr, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ h(xn, { size: 14 }) : /* @__PURE__ */ h(wn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ h("pre", { className: "code-block-pre", children: /* @__PURE__ */ h("code", { children: /* @__PURE__ */ h(Qu, {}) }) })
  ] });
}
const wu = "paragon-editor-toc-width", d1 = 280, xu = 200, ku = 500, Bn = 30, uc = 5;
function fc() {
  try {
    const e = localStorage.getItem(wu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= xu && t <= ku)
        return t;
    }
  } catch {
  }
  return d1;
}
function u1(e) {
  try {
    localStorage.setItem(wu, String(e));
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
function p1(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t += `${r.pos}:${r.level}:${r.text};`;
  }
  return t;
}
function h1(e) {
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
function pc(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const Hs = bt(function({
  item: t,
  isActive: n,
  minLevel: r,
  showLevelIndicators: o,
  hasChildren: s,
  isCollapsed: i,
  treeView: a,
  onItemClick: c,
  onToggleCollapse: l,
  style: d
}) {
  const u = (t.level - r) * 14;
  return /* @__PURE__ */ h(
    "div",
    {
      className: `toc-item ${n ? "toc-item-active" : ""} toc-level-${t.level}`,
      style: { paddingLeft: `${u + 10}px`, ...d },
      children: /* @__PURE__ */ I(
        "button",
        {
          className: "toc-item-button",
          onClick: () => c(t),
          title: t.text,
          children: [
            a && s && /* @__PURE__ */ h(
              "span",
              {
                className: "toc-collapse-toggle",
                onClick: (f) => {
                  f.stopPropagation(), l(t.id);
                },
                children: /* @__PURE__ */ h("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: i ? /* @__PURE__ */ h("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ h("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
              }
            ),
            o && /* @__PURE__ */ I("span", { className: "toc-level-indicator", children: [
              "H",
              t.level
            ] }),
            /* @__PURE__ */ h("span", { className: "toc-item-text", children: t.text })
          ]
        }
      )
    }
  );
}), m1 = bt(function({
  headings: t,
  activeId: n,
  minLevel: r,
  showLevelIndicators: o,
  onItemClick: s,
  onToggleCollapse: i
}) {
  const a = Y(null), [c, l] = j(0), [d, u] = j(0);
  q(() => {
    const b = a.current;
    if (!b) return;
    const v = () => {
      u(b.clientHeight);
    };
    v();
    let x = null;
    return typeof ResizeObserver < "u" && (x = new ResizeObserver(v), x.observe(b)), () => {
      x?.disconnect();
    };
  }, []);
  const f = F((b) => {
    l(b.currentTarget.scrollTop);
  }, []), p = t.length * Bn, g = Math.max(0, Math.floor(c / Bn) - uc), m = Math.min(
    t.length,
    Math.ceil((c + d) / Bn) + uc
  ), y = St(() => {
    const b = [];
    for (let v = g; v < m; v++) {
      const x = t[v];
      b.push(
        /* @__PURE__ */ h(
          Hs,
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
              top: `${v * Bn}px`,
              left: 0,
              right: 0,
              height: `${Bn}px`
            }
          },
          x.id
        )
      );
    }
    return b;
  }, [t, g, m, n, r, o, s, i]);
  return t.length < 30 ? /* @__PURE__ */ h(ye, { children: t.map((b) => /* @__PURE__ */ h(
    Hs,
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
  )) }) : /* @__PURE__ */ h(
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
      children: /* @__PURE__ */ h(
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
}), g1 = bt(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: r,
  title: o = "",
  minLevel: s = 1,
  maxLevel: i = 4,
  showLevelIndicators: a = !1,
  highlightActive: c = !0,
  treeView: l = !1,
  className: d = "",
  width: u,
  position: f = "right",
  scrollOffset: p = 20,
  onItemClick: g,
  renderItem: m,
  showToggleButton: y = !0,
  scrollContainerRef: b
}) {
  const [v, x] = j([]), [T, w] = j(null), [E, S] = j(n), [k, N] = j(/* @__PURE__ */ new Set()), [C, D] = j(() => {
    if (u) {
      const _ = parseInt(u, 10);
      return isNaN(_) ? fc() : _;
    }
    return fc();
  }), L = Y(null), P = Y(null), O = Y(!1), $ = Y(0), W = Y(0), V = Y("");
  q(() => {
    S(n);
  }, [n]);
  const R = F((_) => {
    _.preventDefault(), _.stopPropagation(), O.current = !0, $.current = _.clientX, W.current = C, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [C]);
  q(() => {
    const _ = (ne) => {
      if (!O.current) return;
      const ue = f === "right" ? $.current - ne.clientX : ne.clientX - $.current, ve = Math.min(ku, Math.max(xu, W.current + ue));
      D(ve);
    }, ee = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((ne) => (u1(ne), ne)));
    };
    return document.addEventListener("mousemove", _), document.addEventListener("mouseup", ee), () => {
      document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", ee);
    };
  }, [f]);
  const A = F(() => {
    if (!t || t.isDestroyed) return;
    const _ = f1(t, s, i), ee = p1(_);
    ee !== V.current && (V.current = ee, x(_));
  }, [t, s, i]);
  q(() => {
    if (!t) return;
    const _ = () => {
      P.current && clearTimeout(P.current), P.current = setTimeout(() => A(), 300);
    };
    return A(), t.on("update", _), t.on("create", _), () => {
      t.off("update", _), t.off("create", _), P.current && clearTimeout(P.current);
    };
  }, [t, A]), q(() => {
    if (!t || !c || !E || v.length === 0) return;
    const _ = b?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!_) return;
    const ee = () => {
      const ve = _.getBoundingClientRect();
      let be = null;
      for (let Ue = v.length - 1; Ue >= 0; Ue--) {
        const It = v[Ue], wt = pc(t, It.pos);
        if (wt && wt.getBoundingClientRect().top - ve.top <= p + 10) {
          be = It.id;
          break;
        }
      }
      !be && v.length > 0 && (be = v[0].id), w(be);
    };
    let ne;
    const ue = () => {
      cancelAnimationFrame(ne), ne = requestAnimationFrame(ee);
    };
    return _.addEventListener("scroll", ue, { passive: !0 }), ee(), () => {
      _.removeEventListener("scroll", ue), cancelAnimationFrame(ne);
    };
  }, [t, v, c, E, p, b]);
  const H = F((_) => {
    if (!t || t.isDestroyed) return;
    const ee = pc(t, _.pos);
    if (ee) {
      const ne = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ne) {
        const ue = ne.getBoundingClientRect(), be = ee.getBoundingClientRect().top - ue.top + ne.scrollTop;
        ne.scrollTo({ top: be - p, behavior: "smooth" });
      } else
        ee.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(_.pos + 1);
    } catch {
    }
    w(_.id), g?.(_);
  }, [t, p, g, b]), G = F(() => {
    const _ = !E;
    S(_), r?.(_);
  }, [E, r]), z = F((_) => {
    N((ee) => {
      const ne = new Set(ee);
      return ne.has(_) ? ne.delete(_) : ne.add(_), ne;
    });
  }, []), U = F((_, ee = 0) => {
    if (m) {
      const be = T === _.id;
      return m(_, be, () => H(_));
    }
    const ne = T === _.id, ue = _.children && _.children.length > 0, ve = k.has(_.id);
    return /* @__PURE__ */ I("div", { children: [
      /* @__PURE__ */ h(
        Hs,
        {
          item: _,
          isActive: ne,
          minLevel: s,
          showLevelIndicators: a,
          hasChildren: !!ue,
          isCollapsed: ve,
          treeView: !0,
          onItemClick: H,
          onToggleCollapse: z
        }
      ),
      ue && !ve && /* @__PURE__ */ h("div", { className: "toc-children", children: _.children.map((be) => U(be, ee + 1)) })
    ] }, _.id);
  }, [T, k, H, z, s, a, m]), K = F((_) => _.map((ee) => U(ee)), [U]), B = F(() => m ? v.map((_) => {
    const ee = T === _.id;
    return /* @__PURE__ */ h("div", { children: m(_, ee, () => H(_)) }, _.id);
  }) : null, [v, T, m, H]);
  if (!t) return null;
  const J = l ? h1(v) : [];
  return /* @__PURE__ */ I(ye, { children: [
    y && /* @__PURE__ */ h(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: G,
        title: E ? "Hide Table of Contents" : "Show Table of Contents",
        children: E ? /* @__PURE__ */ h(Vf, { size: 16 }) : /* @__PURE__ */ h(Kf, { size: 16 })
      }
    ),
    /* @__PURE__ */ I(
      "div",
      {
        ref: L,
        className: `toc-sidebar ${E ? "toc-visible" : "toc-hidden"} toc-${f} ${d}`,
        style: { width: E ? `${C}px` : "0px" },
        children: [
          E && /* @__PURE__ */ h(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: R
            }
          ),
          /* @__PURE__ */ I("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ h("div", { className: "toc-header", children: /* @__PURE__ */ h("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ h("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ I("div", { className: "toc-empty", children: [
              /* @__PURE__ */ h("p", { children: "No headings yet" }),
              /* @__PURE__ */ h("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ h("div", { className: "toc-list", children: l ? K(J) : m ? B() : /* @__PURE__ */ h(
              m1,
              {
                headings: v,
                activeId: T,
                minLevel: s,
                showLevelIndicators: a,
                onItemClick: H,
                onToggleCollapse: z
              }
            ) }) })
          ] })
        ]
      }
    )
  ] });
}), y1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TableOfContents: g1
}, Symbol.toStringTag, { value: "Module" }));
export {
  MC as AutoSaveIndicator,
  sE as Callout,
  gk as CalloutInputRule,
  lE as CodeBlockComponent,
  fk as CollapsibleHeading,
  Nb as CollapsibleList,
  Qx as DatePill,
  iE as EditorThemeProvider,
  tb as EditorToolbar,
  nb as FindReplace,
  OC as FloatingToolbar,
  ZC as ImageDropZone,
  nC as ImageUpload,
  oE as MarkdownEditor,
  mk as MarkdownLinkInputRule,
  dk as MarkdownPasteSafe,
  Cb as MixedBulletList,
  Sb as MixedListItem,
  Eb as MixedOrderedList,
  Tb as MixedTaskItem,
  Mb as MixedTaskList,
  TC as RecoveryBanner,
  Wb as ResizableImage,
  yk as SearchHighlight,
  sb as SelectAllActionBar,
  Yk as SelectAllOccurrences,
  YC as SlashCommands,
  vk as TabIndent,
  g1 as TableOfContents,
  tk as TagPill,
  rk as WikiLinkSafe,
  l1 as applyTheme,
  aE as createCustomTheme,
  vu as darkTheme,
  Ma as getDateVariant,
  dn as isValidTag,
  a1 as lightTheme,
  Oc as loadCoreLanguages,
  Qa as loadLanguageIfNeeded,
  je as lowlight,
  c1 as nordTheme,
  Vn as normalizeTag,
  Bt as parseDateFromMarkdown,
  i1 as sepiaTheme,
  Un as themes,
  ib as useAutoSave,
  cE as useEditorTheme,
  EC as useWordCount
};
//# sourceMappingURL=paragon.js.map
