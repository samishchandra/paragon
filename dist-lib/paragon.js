import { jsxs as A, jsx as h, Fragment as be } from "react/jsx-runtime";
import { useEditorState as mc, NodeViewWrapper as eo, ReactNodeViewRenderer as gc, useEditor as Zu, EditorContent as Qu, NodeViewContent as Ju } from "@tiptap/react";
import * as S from "react";
import G, { useState as Y, useRef as j, useEffect as K, useLayoutEffect as ho, memo as wt, useCallback as F, useImperativeHandle as ef, createContext as yc, useContext as vc, useMemo as Nt, Component as tf, useReducer as nf, lazy as rf, forwardRef as of, Suspense as ja } from "react";
import sf from "@tiptap/extension-code-block-lowlight";
import { createLowlight as af } from "lowlight";
import { Image as Bs, X as gt, Link2 as Ws, Type as mo, Copy as xn, Undo as cf, Redo as lf, Bold as zs, Italic as Fs, Underline as Us, Strikethrough as js, Code as bc, Highlighter as wc, Link as Ys, ChevronDown as vn, List as Vs, ListOrdered as Ks, CheckSquare as Gs, Quote as qs, FileCode as kc, IndentIncrease as df, IndentDecrease as uf, Table as ys, Minus as xc, Info as vs, BookOpen as Cc, PenLine as ff, Library as pf, ListTodo as Ec, Columns as Ya, Trash2 as fn, Rows as Va, ToggleLeft as Ka, ArrowUpDown as hf, Sparkles as go, Search as mf, ChevronUp as gf, MousePointerClick as yf, CaseSensitive as vf, WholeWord as bf, Regex as wf, Replace as bs, ReplaceAll as kf, Plus as Xs, ChevronLeftIcon as xf, ChevronRightIcon as Cf, ChevronDownIcon as Ef, Calendar as Mc, Hash as Ga, Cloud as Mf, Loader2 as Tc, Check as Cn, CloudOff as Tf, AlertCircle as Sf, RotateCcw as Zs, Activity as Nf, Maximize2 as Sc, Minimize2 as Nc, AlertTriangle as Df, ChevronRight as Lf, CheckCircle2 as Af, Eye as If, FileText as Qs, ExternalLink as Rf, Pencil as Pf, Unlink as Of, Heading1 as _f, Heading2 as $f, Heading3 as Hf, Heading4 as Bf, Heading5 as Wf, Code2 as zf, StickyNote as Ff, MessageSquareText as Uf, ImagePlus as jf, MessageSquare as Dc, RefreshCw as Yf, SpellCheck as Vf, PanelRightClose as Kf, PanelRightOpen as Gf } from "lucide-react";
import * as Lc from "react-dom";
import qf, { createPortal as Xf } from "react-dom";
import { TextSelection as Ke, Plugin as Ne, PluginKey as De, NodeSelection as Zf, AllSelection as Qf } from "@tiptap/pm/state";
import { DOMSerializer as Ac, Fragment as Ic, Slice as Yo } from "@tiptap/pm/model";
import Jf from "@tiptap/starter-kit";
import ep from "@tiptap/extension-placeholder";
import tp from "@tiptap/extension-text-align";
import np from "@tiptap/extension-highlight";
import rp from "@tiptap/extension-link";
import { Table as op } from "@tiptap/extension-table";
import sp from "@tiptap/extension-table-row";
import ap from "@tiptap/extension-table-cell";
import ip from "@tiptap/extension-table-header";
import { Extension as He, Node as yo, mergeAttributes as En, InputRule as $e, Mark as Rc } from "@tiptap/core";
import { DecorationSet as Ve, Decoration as Ze } from "@tiptap/pm/view";
import cp from "@tiptap/extension-bullet-list";
import lp from "@tiptap/extension-ordered-list";
import dp from "@tiptap/extension-list-item";
import up from "@tiptap/extension-task-list";
import fp from "@tiptap/extension-task-item";
import { findWrapping as qa, canJoin as pp } from "@tiptap/pm/transform";
import hp from "@tiptap/extension-underline";
import mp from "@tiptap/extension-subscript";
import gp from "@tiptap/extension-superscript";
import yp from "@tiptap/extension-typography";
import vp from "@tiptap/extension-image";
import { createRoot as bp } from "react-dom/client";
import { liftListItem as Xa, sinkListItem as Za } from "@tiptap/pm/schema-list";
import { undo as wp, redo as kp } from "@tiptap/pm/history";
import xp from "@tiptap/extension-horizontal-rule";
import Cp from "@tiptap/extension-code";
import Ep from "@tiptap/extension-bold";
import Mp from "@tiptap/extension-italic";
import Tp from "@tiptap/extension-strike";
const Ye = af(), Pc = {
  javascript: () => import("highlight.js/lib/languages/javascript"),
  typescript: () => import("highlight.js/lib/languages/typescript"),
  python: () => import("highlight.js/lib/languages/python"),
  xml: () => import("highlight.js/lib/languages/xml"),
  css: () => import("highlight.js/lib/languages/css"),
  json: () => import("highlight.js/lib/languages/json"),
  bash: () => import("highlight.js/lib/languages/bash")
}, Oc = {
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
}, Sp = {
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
let Qa = !1, $n = null;
async function _c() {
  if (!Qa)
    return $n || ($n = (async () => {
      try {
        const e = Object.entries(Pc), t = await Promise.all(
          e.map(async ([n, r]) => {
            const o = await r();
            return [n, o.default];
          })
        );
        for (const [n, r] of t)
          Ye.registered(n) || Ye.register(n, r);
        for (const [n, r] of Object.entries(Oc))
          if (!Ye.registered(n)) {
            const o = t.find(([s]) => s === r);
            o && Ye.register(n, o[1]);
          }
        Qa = !0;
      } catch (e) {
        console.warn("Failed to load core highlight.js languages:", e), $n = null;
      }
    })(), $n);
}
async function Ja(e) {
  if (Ye.registered(e)) return !0;
  if (Pc[e] || Oc[e])
    return await _c(), Ye.registered(e);
  const t = Sp[e];
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
    Ye.register(e, r), Ar.add(e);
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
          i !== e && !Ye.registered(i) && (Ye.register(i, r), Ar.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Lr.delete(e);
  }
}
const ei = "http://www.w3.org/2000/svg";
function Ir(e, t, n) {
  const r = document.createElementNS(ei, "svg");
  r.setAttribute("width", String(t)), r.setAttribute("height", String(t)), r.setAttribute("viewBox", "0 0 24 24"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-linejoin", "round"), n && r.setAttribute("class", n);
  for (const o of e) {
    const s = document.createElementNS(ei, "path");
    s.setAttribute("d", o), r.appendChild(s);
  }
  return r;
}
const ti = [
  "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z",
  "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
], Np = ["M20 6 9 17l-5-5"], Dp = ["m6 9 6 6 6-6"], Lp = {
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
}, $c = {
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
}, Ap = [
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
function Ip() {
  return Ap;
}
function ni(e) {
  if (e === "plaintext") return "Plain Text";
  const t = $c[e] || e;
  return Lp[t] || e.charAt(0).toUpperCase() + e.slice(1);
}
class Rp {
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
    s.appendChild(this.selectEl), s.appendChild(this.labelEl), s.appendChild(i), this.copyBtn = document.createElement("button"), this.copyBtn.type = "button", this.copyBtn.className = "code-block-copy-btn", this.copyBtn.title = "Copy code", this.copyBtn.appendChild(Ir(ti, 14)), this.copyBtn.addEventListener("click", this.handleCopy), this.controlsEl.appendChild(s), this.controlsEl.appendChild(this.copyBtn), this.preEl = document.createElement("pre"), this.preEl.className = "code-block-pre", this.codeEl = document.createElement("code"), this.codeEl.className = `language-${o}`, this.preEl.appendChild(this.codeEl), this.contentDOM = this.codeEl, this.dom.appendChild(this.controlsEl), this.dom.appendChild(this.preEl), this.dom.addEventListener("mouseenter", this.handleMouseEnter), this.dom.addEventListener("mouseleave", this.handleMouseLeave), setTimeout(() => {
      this.isVisible = !0, this.onBecameVisible().catch(() => {
      });
    }, 0);
  }
  // ── Language select ──
  populateLanguageOptions(t) {
    this.selectEl.innerHTML = "";
    const n = document.createElement("option");
    n.value = "plaintext", n.textContent = "Plain Text", this.selectEl.appendChild(n);
    const r = Ip();
    for (const s of r) {
      const i = document.createElement("option");
      i.value = s, i.textContent = ni(s), this.selectEl.appendChild(i);
    }
    const o = $c[t] || t;
    this.selectEl.value = o;
  }
  formatLanguageLabel(t) {
    return ni(t);
  }
  setCopiedState(t) {
    this.copied = t, this.copyBtn.className = `code-block-copy-btn${t ? " copied" : ""}`, this.copyBtn.title = t ? "Copied!" : "Copy code", this.copyBtn.innerHTML = "", this.copyBtn.appendChild(
      Ir(t ? Np : ti, 14)
    );
  }
  // ── Language loading ──
  async onBecameVisible() {
    const t = this.node.attrs.language || "plaintext";
    if (await _c(), t === "plaintext") {
      this.setLanguageReady(!0);
      return;
    }
    if (Ye.registered(t)) {
      this.setLanguageReady(!0);
      return;
    }
    const n = await Ja(t);
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
    return this.node = t, n !== r && (this.labelEl.textContent = this.formatLanguageLabel(r), this.selectEl.value = r, r === "plaintext" ? this.setLanguageReady(!0) : Ye.registered(r) ? this.setLanguageReady(!0) : this.isVisible && (this.setLanguageReady(!1), Ja(r).then((o) => {
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
const Pp = sf.configure({
  lowlight: Ye,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
}).extend({
  addNodeView() {
    return ({ node: e, view: t, getPos: n }) => new Rp(e, t, n);
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
function Hc({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = Y(""), [i, a] = Y(""), [c, l] = Y(""), [d, u] = Y(!1), f = j(null), p = j(null);
  K(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), K(() => {
    if (!e) return;
    const v = (k) => {
      p.current && !p.current.contains(k.target) && t();
    }, w = (k) => {
      k.key === "Escape" && t();
    }, T = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", w), () => {
      clearTimeout(T), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", w);
    };
  }, [e, t]);
  const g = (v) => {
    if (!v.trim())
      return l("Please enter an image URL"), !1;
    try {
      const w = new URL(v);
      if (!["http:", "https:", "data:"].includes(w.protocol))
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
  return /* @__PURE__ */ A(
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
        /* @__PURE__ */ A("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ h(Bs, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ h("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ h(gt, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
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
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
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
          /* @__PURE__ */ A("div", { className: "image-url-dialog-actions", children: [
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
function ce(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function ri(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function vo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = ri(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : ri(e[o], null);
        }
      };
  };
}
function Ie(...e) {
  return S.useCallback(vo(...e), e);
}
function Mn(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = S.createContext(i), c = n.length;
    n = [...n, i];
    const l = (u) => {
      const { scope: f, children: p, ...g } = u, m = f?.[e]?.[c] || a, y = S.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ h(m.Provider, { value: y, children: p });
    };
    l.displayName = s + "Provider";
    function d(u, f) {
      const p = f?.[e]?.[c] || a, g = S.useContext(p);
      if (g) return g;
      if (i !== void 0) return i;
      throw new Error(`\`${u}\` must be used within \`${s}\``);
    }
    return [l, d];
  }
  const o = () => {
    const s = n.map((i) => S.createContext(i));
    return function(a) {
      const c = a?.[e] || s;
      return S.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return o.scopeName = e, [r, Op(o, ...t)];
}
function Op(...e) {
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
      return S.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Dt = globalThis?.document ? S.useLayoutEffect : () => {
}, _p = S[" useInsertionEffect ".trim().toString()] || Dt;
function ea({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = $p({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : o;
  {
    const d = S.useRef(e !== void 0);
    S.useEffect(() => {
      const u = d.current;
      u !== a && console.warn(
        `${r} is changing from ${u ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = a;
    }, [a, r]);
  }
  const l = S.useCallback(
    (d) => {
      if (a) {
        const u = Hp(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function $p({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = S.useState(e), o = S.useRef(n), s = S.useRef(t);
  return _p(() => {
    s.current = t;
  }, [t]), S.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Hp(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function qn(e) {
  const t = /* @__PURE__ */ Wp(e), n = S.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = S.Children.toArray(s), c = a.find(Fp);
    if (c) {
      const l = c.props.children, d = a.map((u) => u === c ? S.Children.count(l) > 1 ? S.Children.only(null) : S.isValidElement(l) ? l.props.children : null : u);
      return /* @__PURE__ */ h(t, { ...i, ref: o, children: S.isValidElement(l) ? S.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ h(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Bp = /* @__PURE__ */ qn("Slot");
// @__NO_SIDE_EFFECTS__
function Wp(e) {
  const t = S.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (S.isValidElement(o)) {
      const i = jp(o), a = Up(s, o.props);
      return o.type !== S.Fragment && (a.ref = r ? vo(r, i) : i), S.cloneElement(o, a);
    }
    return S.Children.count(o) > 1 ? S.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Bc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function zp(e) {
  const t = ({ children: n }) => /* @__PURE__ */ h(be, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Bc, t;
}
function Fp(e) {
  return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Bc;
}
function Up(e, t) {
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
function jp(e) {
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
  const n = /* @__PURE__ */ qn(`Primitive.${t}`), r = S.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Wc(e, t) {
  e && Lc.flushSync(() => e.dispatchEvent(t));
}
function zc(e) {
  const t = e + "CollectionProvider", [n, r] = Mn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (m) => {
    const { scope: y, children: b } = m, v = G.useRef(null), w = G.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ h(o, { scope: y, itemMap: w, collectionRef: v, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ qn(a), l = G.forwardRef(
    (m, y) => {
      const { scope: b, children: v } = m, w = s(a, b), T = Ie(y, w.collectionRef);
      return /* @__PURE__ */ h(c, { ref: T, children: v });
    }
  );
  l.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = /* @__PURE__ */ qn(d), p = G.forwardRef(
    (m, y) => {
      const { scope: b, children: v, ...w } = m, T = G.useRef(null), k = Ie(y, T), E = s(d, b);
      return G.useEffect(() => (E.itemMap.set(T, { ref: T, ...w }), () => void E.itemMap.delete(T))), /* @__PURE__ */ h(f, { [u]: "", ref: k, children: v });
    }
  );
  p.displayName = d;
  function g(m) {
    const y = s(e + "CollectionConsumer", m);
    return G.useCallback(() => {
      const v = y.collectionRef.current;
      if (!v) return [];
      const w = Array.from(v.querySelectorAll(`[${u}]`));
      return Array.from(y.itemMap.values()).sort(
        (E, M) => w.indexOf(E.ref.current) - w.indexOf(M.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    g,
    r
  ];
}
var Vp = S.createContext(void 0);
function Fc(e) {
  const t = S.useContext(Vp);
  return e || t || "ltr";
}
function yt(e) {
  const t = S.useRef(e);
  return S.useEffect(() => {
    t.current = e;
  }), S.useMemo(() => (...n) => t.current?.(...n), []);
}
function Kp(e, t = globalThis?.document) {
  const n = yt(e);
  S.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Gp = "DismissableLayer", ws = "dismissableLayer.update", qp = "dismissableLayer.pointerDownOutside", Xp = "dismissableLayer.focusOutside", oi, Uc = S.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ta = S.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = S.useContext(Uc), [d, u] = S.useState(null), f = d?.ownerDocument ?? globalThis?.document, [, p] = S.useState({}), g = Ie(t, (M) => u(M)), m = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = m.indexOf(y), v = d ? m.indexOf(d) : -1, w = l.layersWithOutsidePointerEventsDisabled.size > 0, T = v >= b, k = Jp((M) => {
      const x = M.target, D = [...l.branches].some((C) => C.contains(x));
      !T || D || (o?.(M), i?.(M), M.defaultPrevented || a?.());
    }, f), E = eh((M) => {
      const x = M.target;
      [...l.branches].some((C) => C.contains(x)) || (s?.(M), i?.(M), M.defaultPrevented || a?.());
    }, f);
    return Kp((M) => {
      v === l.layers.size - 1 && (r?.(M), !M.defaultPrevented && a && (M.preventDefault(), a()));
    }, f), S.useEffect(() => {
      if (d)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (oi = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), si(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = oi);
        };
    }, [d, f, n, l]), S.useEffect(() => () => {
      d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), si());
    }, [d, l]), S.useEffect(() => {
      const M = () => p({});
      return document.addEventListener(ws, M), () => document.removeEventListener(ws, M);
    }, []), /* @__PURE__ */ h(
      Le.div,
      {
        ...c,
        ref: g,
        style: {
          pointerEvents: w ? T ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ce(e.onFocusCapture, E.onFocusCapture),
        onBlurCapture: ce(e.onBlurCapture, E.onBlurCapture),
        onPointerDownCapture: ce(
          e.onPointerDownCapture,
          k.onPointerDownCapture
        )
      }
    );
  }
);
ta.displayName = Gp;
var Zp = "DismissableLayerBranch", Qp = S.forwardRef((e, t) => {
  const n = S.useContext(Uc), r = S.useRef(null), o = Ie(t, r);
  return S.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ h(Le.div, { ...e, ref: o });
});
Qp.displayName = Zp;
function Jp(e, t = globalThis?.document) {
  const n = yt(e), r = S.useRef(!1), o = S.useRef(() => {
  });
  return S.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          jc(
            qp,
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
function eh(e, t = globalThis?.document) {
  const n = yt(e), r = S.useRef(!1);
  return S.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && jc(Xp, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function si() {
  const e = new CustomEvent(ws);
  document.dispatchEvent(e);
}
function jc(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Wc(o, s) : o.dispatchEvent(s);
}
var Vo = 0;
function th() {
  S.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ai()), document.body.insertAdjacentElement("beforeend", e[1] ?? ai()), Vo++, () => {
      Vo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Vo--;
    };
  }, []);
}
function ai() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ko = "focusScope.autoFocusOnMount", Go = "focusScope.autoFocusOnUnmount", ii = { bubbles: !1, cancelable: !0 }, nh = "FocusScope", Yc = S.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = S.useState(null), l = yt(o), d = yt(s), u = S.useRef(null), f = Ie(t, (m) => c(m)), p = S.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  S.useEffect(() => {
    if (r) {
      let m = function(w) {
        if (p.paused || !a) return;
        const T = w.target;
        a.contains(T) ? u.current = T : St(u.current, { select: !0 });
      }, y = function(w) {
        if (p.paused || !a) return;
        const T = w.relatedTarget;
        T !== null && (a.contains(T) || St(u.current, { select: !0 }));
      }, b = function(w) {
        if (document.activeElement === document.body)
          for (const k of w)
            k.removedNodes.length > 0 && St(a);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", y);
      const v = new MutationObserver(b);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", y), v.disconnect();
      };
    }
  }, [r, a, p.paused]), S.useEffect(() => {
    if (a) {
      li.add(p);
      const m = document.activeElement;
      if (!a.contains(m)) {
        const b = new CustomEvent(Ko, ii);
        a.addEventListener(Ko, l), a.dispatchEvent(b), b.defaultPrevented || (rh(ch(Vc(a)), { select: !0 }), document.activeElement === m && St(a));
      }
      return () => {
        a.removeEventListener(Ko, l), setTimeout(() => {
          const b = new CustomEvent(Go, ii);
          a.addEventListener(Go, d), a.dispatchEvent(b), b.defaultPrevented || St(m ?? document.body, { select: !0 }), a.removeEventListener(Go, d), li.remove(p);
        }, 0);
      };
    }
  }, [a, l, d, p]);
  const g = S.useCallback(
    (m) => {
      if (!n && !r || p.paused) return;
      const y = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, b = document.activeElement;
      if (y && b) {
        const v = m.currentTarget, [w, T] = oh(v);
        w && T ? !m.shiftKey && b === T ? (m.preventDefault(), n && St(w, { select: !0 })) : m.shiftKey && b === w && (m.preventDefault(), n && St(T, { select: !0 })) : b === v && m.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ h(Le.div, { tabIndex: -1, ...i, ref: f, onKeyDown: g });
});
Yc.displayName = nh;
function rh(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (St(r, { select: t }), document.activeElement !== n) return;
}
function oh(e) {
  const t = Vc(e), n = ci(t, e), r = ci(t.reverse(), e);
  return [n, r];
}
function Vc(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function ci(e, t) {
  for (const n of e)
    if (!sh(n, { upTo: t })) return n;
}
function sh(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ah(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function St(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && ah(e) && t && e.select();
  }
}
var li = ih();
function ih() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = di(e, t), e.unshift(t);
    },
    remove(t) {
      e = di(e, t), e[0]?.resume();
    }
  };
}
function di(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function ch(e) {
  return e.filter((t) => t.tagName !== "A");
}
var lh = S[" useId ".trim().toString()] || (() => {
}), dh = 0;
function to(e) {
  const [t, n] = S.useState(lh());
  return Dt(() => {
    n((r) => r ?? String(dh++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const uh = ["top", "right", "bottom", "left"], Lt = Math.min, ze = Math.max, no = Math.round, Rr = Math.floor, at = (e) => ({
  x: e,
  y: e
}), fh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ph = {
  start: "end",
  end: "start"
};
function ks(e, t, n) {
  return ze(e, Lt(t, n));
}
function vt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function bt(e) {
  return e.split("-")[0];
}
function Tn(e) {
  return e.split("-")[1];
}
function na(e) {
  return e === "x" ? "y" : "x";
}
function ra(e) {
  return e === "y" ? "height" : "width";
}
const hh = /* @__PURE__ */ new Set(["top", "bottom"]);
function ot(e) {
  return hh.has(bt(e)) ? "y" : "x";
}
function oa(e) {
  return na(ot(e));
}
function mh(e, t, n) {
  n === void 0 && (n = !1);
  const r = Tn(e), o = oa(e), s = ra(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = ro(i)), [i, ro(i)];
}
function gh(e) {
  const t = ro(e);
  return [xs(e), t, xs(t)];
}
function xs(e) {
  return e.replace(/start|end/g, (t) => ph[t]);
}
const ui = ["left", "right"], fi = ["right", "left"], yh = ["top", "bottom"], vh = ["bottom", "top"];
function bh(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? fi : ui : t ? ui : fi;
    case "left":
    case "right":
      return t ? yh : vh;
    default:
      return [];
  }
}
function wh(e, t, n, r) {
  const o = Tn(e);
  let s = bh(bt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(xs)))), s;
}
function ro(e) {
  return e.replace(/left|right|bottom|top/g, (t) => fh[t]);
}
function kh(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Kc(e) {
  return typeof e != "number" ? kh(e) : {
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
function pi(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = ot(t), i = oa(t), a = ra(i), c = bt(t), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
  } = pi(l, r, c), f = r, p = {}, g = 0;
  for (let m = 0; m < a.length; m++) {
    const {
      name: y,
      fn: b
    } = a[m], {
      x: v,
      y: w,
      data: T,
      reset: k
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
    d = v ?? d, u = w ?? u, p = {
      ...p,
      [y]: {
        ...p[y],
        ...T
      }
    }, k && g <= 50 && (g++, typeof k == "object" && (k.placement && (f = k.placement), k.rects && (l = k.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : k.rects), {
      x: d,
      y: u
    } = pi(l, f, c)), m = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function Xn(e, t) {
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
  } = vt(t, e), g = Kc(p), y = a[f ? u === "floating" ? "reference" : "floating" : u], b = oo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: c
  })), v = u === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), T = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, k = oo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: v,
    offsetParent: w,
    strategy: c
  }) : v);
  return {
    top: (b.top - k.top + g.top) / T.y,
    bottom: (k.bottom - b.bottom + g.bottom) / T.y,
    left: (b.left - k.left + g.left) / T.x,
    right: (k.right - b.right + g.right) / T.x
  };
}
const Ch = (e) => ({
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
    } = vt(e, t) || {};
    if (l == null)
      return {};
    const u = Kc(d), f = {
      x: n,
      y: r
    }, p = oa(o), g = ra(p), m = await i.getDimensions(l), y = p === "y", b = y ? "top" : "left", v = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", T = s.reference[g] + s.reference[p] - f[p] - s.floating[g], k = f[p] - s.reference[p], E = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let M = E ? E[w] : 0;
    (!M || !await (i.isElement == null ? void 0 : i.isElement(E))) && (M = a.floating[w] || s.floating[g]);
    const x = T / 2 - k / 2, D = M / 2 - m[g] / 2 - 1, C = Lt(u[b], D), N = Lt(u[v], D), L = C, O = M - m[g] - N, _ = M / 2 - m[g] / 2 + x, $ = ks(L, _, O), z = !c.arrow && Tn(o) != null && _ !== $ && s.reference[g] / 2 - (_ < L ? C : N) - m[g] / 2 < 0, V = z ? _ < L ? _ - L : _ - O : 0;
    return {
      [p]: f[p] + V,
      data: {
        [p]: $,
        centerOffset: _ - $ - V,
        ...z && {
          alignmentOffset: V
        }
      },
      reset: z
    };
  }
}), Eh = function(e) {
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
      } = vt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = bt(o), v = ot(a), w = bt(a) === a, T = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), k = f || (w || !m ? [ro(a)] : gh(a)), E = g !== "none";
      !f && E && k.push(...wh(a, m, g, T));
      const M = [a, ...k], x = await Xn(t, y), D = [];
      let C = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && D.push(x[b]), u) {
        const _ = mh(o, i, T);
        D.push(x[_[0]], x[_[1]]);
      }
      if (C = [...C, {
        placement: o,
        overflows: D
      }], !D.every((_) => _ <= 0)) {
        var N, L;
        const _ = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, $ = M[_];
        if ($ && (!(u === "alignment" ? v !== ot($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        C.every((I) => ot(I.placement) === v ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: _,
              overflows: C
            },
            reset: {
              placement: $
            }
          };
        let z = (L = C.filter((V) => V.overflows[0] <= 0).sort((V, I) => V.overflows[1] - I.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!z)
          switch (p) {
            case "bestFit": {
              var O;
              const V = (O = C.filter((I) => {
                if (E) {
                  const W = ot(I.placement);
                  return W === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  W === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((W) => W > 0).reduce((W, q) => W + q, 0)]).sort((I, W) => I[1] - W[1])[0]) == null ? void 0 : O[0];
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
function hi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function mi(e) {
  return uh.some((t) => e[t] >= 0);
}
const Mh = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = vt(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Xn(t, {
            ...o,
            elementContext: "reference"
          }), i = hi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: mi(i)
            }
          };
        }
        case "escaped": {
          const s = await Xn(t, {
            ...o,
            altBoundary: !0
          }), i = hi(s, n.floating);
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
}, Gc = /* @__PURE__ */ new Set(["left", "top"]);
async function Th(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = bt(n), a = Tn(n), c = ot(n) === "y", l = Gc.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = vt(t, e);
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
const Sh = function(e) {
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
      } = t, c = await Th(t, e);
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
}, Nh = function(e) {
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
      } = vt(e, t), l = {
        x: n,
        y: r
      }, d = await Xn(t, c), u = ot(bt(o)), f = na(u);
      let p = l[f], g = l[u];
      if (s) {
        const y = f === "y" ? "top" : "left", b = f === "y" ? "bottom" : "right", v = p + d[y], w = p - d[b];
        p = ks(v, p, w);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", b = u === "y" ? "bottom" : "right", v = g + d[y], w = g - d[b];
        g = ks(v, g, w);
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
      } = vt(e, t), d = {
        x: n,
        y: r
      }, u = ot(o), f = na(u);
      let p = d[f], g = d[u];
      const m = vt(a, t), y = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (c) {
        const w = f === "y" ? "height" : "width", T = s.reference[f] - s.floating[w] + y.mainAxis, k = s.reference[f] + s.reference[w] - y.mainAxis;
        p < T ? p = T : p > k && (p = k);
      }
      if (l) {
        var b, v;
        const w = f === "y" ? "width" : "height", T = Gc.has(bt(o)), k = s.reference[u] - s.floating[w] + (T && ((b = i.offset) == null ? void 0 : b[u]) || 0) + (T ? 0 : y.crossAxis), E = s.reference[u] + s.reference[w] + (T ? 0 : ((v = i.offset) == null ? void 0 : v[u]) || 0) - (T ? y.crossAxis : 0);
        g < k ? g = k : g > E && (g = E);
      }
      return {
        [f]: p,
        [u]: g
      };
    }
  };
}, Lh = function(e) {
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
      } = vt(e, t), d = await Xn(t, l), u = bt(o), f = Tn(o), p = ot(o) === "y", {
        width: g,
        height: m
      } = s.floating;
      let y, b;
      u === "top" || u === "bottom" ? (y = u, b = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = u, y = f === "end" ? "top" : "bottom");
      const v = m - d.top - d.bottom, w = g - d.left - d.right, T = Lt(m - d[y], v), k = Lt(g - d[b], w), E = !t.middlewareData.shift;
      let M = T, x = k;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = w), (r = t.middlewareData.shift) != null && r.enabled.y && (M = v), E && !f) {
        const C = ze(d.left, 0), N = ze(d.right, 0), L = ze(d.top, 0), O = ze(d.bottom, 0);
        p ? x = g - 2 * (C !== 0 || N !== 0 ? C + N : ze(d.left, d.right)) : M = m - 2 * (L !== 0 || O !== 0 ? L + O : ze(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: x,
        availableHeight: M
      });
      const D = await i.getDimensions(a.floating);
      return g !== D.width || m !== D.height ? {
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
function Sn(e) {
  return qc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Fe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ct(e) {
  var t;
  return (t = (qc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function qc(e) {
  return bo() ? e instanceof Node || e instanceof Fe(e).Node : !1;
}
function Qe(e) {
  return bo() ? e instanceof Element || e instanceof Fe(e).Element : !1;
}
function it(e) {
  return bo() ? e instanceof HTMLElement || e instanceof Fe(e).HTMLElement : !1;
}
function gi(e) {
  return !bo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Fe(e).ShadowRoot;
}
const Ah = /* @__PURE__ */ new Set(["inline", "contents"]);
function rr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Ah.has(o);
}
const Ih = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Rh(e) {
  return Ih.has(Sn(e));
}
const Ph = [":popover-open", ":modal"];
function wo(e) {
  return Ph.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Oh = ["transform", "translate", "scale", "rotate", "perspective"], _h = ["transform", "translate", "scale", "rotate", "perspective", "filter"], $h = ["paint", "layout", "strict", "content"];
function sa(e) {
  const t = aa(), n = Qe(e) ? Je(e) : e;
  return Oh.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || _h.some((r) => (n.willChange || "").includes(r)) || $h.some((r) => (n.contain || "").includes(r));
}
function Hh(e) {
  let t = At(e);
  for (; it(t) && !bn(t); ) {
    if (sa(t))
      return t;
    if (wo(t))
      return null;
    t = At(t);
  }
  return null;
}
function aa() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Bh = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function bn(e) {
  return Bh.has(Sn(e));
}
function Je(e) {
  return Fe(e).getComputedStyle(e);
}
function ko(e) {
  return Qe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function At(e) {
  if (Sn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    gi(e) && e.host || // Fallback.
    ct(e)
  );
  return gi(t) ? t.host : t;
}
function Xc(e) {
  const t = At(e);
  return bn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : it(t) && rr(t) ? t : Xc(t);
}
function Zn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Xc(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Fe(o);
  if (s) {
    const a = Cs(i);
    return t.concat(i, i.visualViewport || [], rr(o) ? o : [], a && n ? Zn(a) : []);
  }
  return t.concat(o, Zn(o, [], n));
}
function Cs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Zc(e) {
  const t = Je(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = it(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = no(n) !== s || no(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function ia(e) {
  return Qe(e) ? e : e.contextElement;
}
function pn(e) {
  const t = ia(e);
  if (!it(t))
    return at(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Zc(t);
  let i = (s ? no(n.width) : n.width) / r, a = (s ? no(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Wh = /* @__PURE__ */ at(0);
function Qc(e) {
  const t = Fe(e);
  return !aa() || !t.visualViewport ? Wh : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function zh(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Fe(e) ? !1 : t;
}
function Yt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ia(e);
  let i = at(1);
  t && (r ? Qe(r) && (i = pn(r)) : i = pn(e));
  const a = zh(s, n, r) ? Qc(s) : at(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = Fe(s), p = r && Qe(r) ? Fe(r) : r;
    let g = f, m = Cs(g);
    for (; m && r && p !== g; ) {
      const y = pn(m), b = m.getBoundingClientRect(), v = Je(m), w = b.left + (m.clientLeft + parseFloat(v.paddingLeft)) * y.x, T = b.top + (m.clientTop + parseFloat(v.paddingTop)) * y.y;
      c *= y.x, l *= y.y, d *= y.x, u *= y.y, c += w, l += T, g = Fe(m), m = Cs(g);
    }
  }
  return oo({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function xo(e, t) {
  const n = ko(e).scrollLeft;
  return t ? t.left + n : Yt(ct(e)).left + n;
}
function Jc(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - xo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Fh(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = ct(r), a = t ? wo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = at(1);
  const d = at(0), u = it(r);
  if ((u || !u && !s) && ((Sn(r) !== "body" || rr(i)) && (c = ko(r)), it(r))) {
    const p = Yt(r);
    l = pn(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? Jc(i, c) : at(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + f.y
  };
}
function Uh(e) {
  return Array.from(e.getClientRects());
}
function jh(e) {
  const t = ct(e), n = ko(e), r = e.ownerDocument.body, o = ze(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = ze(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + xo(e);
  const a = -n.scrollTop;
  return Je(r).direction === "rtl" && (i += ze(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const yi = 25;
function Yh(e, t) {
  const n = Fe(e), r = ct(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = aa();
    (!d || d && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = xo(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(r.clientWidth - u.clientWidth - p);
    g <= yi && (s -= g);
  } else l <= yi && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const Vh = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Kh(e, t) {
  const n = Yt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = it(e) ? pn(e) : at(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function vi(e, t, n) {
  let r;
  if (t === "viewport")
    r = Yh(e, n);
  else if (t === "document")
    r = jh(ct(e));
  else if (Qe(t))
    r = Kh(t, n);
  else {
    const o = Qc(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return oo(r);
}
function el(e, t) {
  const n = At(e);
  return n === t || !Qe(n) || bn(n) ? !1 : Je(n).position === "fixed" || el(n, t);
}
function Gh(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Zn(e, [], !1).filter((a) => Qe(a) && Sn(a) !== "body"), o = null;
  const s = Je(e).position === "fixed";
  let i = s ? At(e) : e;
  for (; Qe(i) && !bn(i); ) {
    const a = Je(i), c = sa(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && Vh.has(o.position) || rr(i) && !c && el(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = At(i);
  }
  return t.set(e, r), r;
}
function qh(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? wo(t) ? [] : Gh(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, d) => {
    const u = vi(t, d, o);
    return l.top = ze(u.top, l.top), l.right = Lt(u.right, l.right), l.bottom = Lt(u.bottom, l.bottom), l.left = ze(u.left, l.left), l;
  }, vi(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Xh(e) {
  const {
    width: t,
    height: n
  } = Zc(e);
  return {
    width: t,
    height: n
  };
}
function Zh(e, t, n) {
  const r = it(t), o = ct(t), s = n === "fixed", i = Yt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = at(0);
  function l() {
    c.x = xo(o);
  }
  if (r || !r && !s)
    if ((Sn(t) !== "body" || rr(o)) && (a = ko(t)), r) {
      const p = Yt(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? Jc(o, a) : at(0), u = i.left + a.scrollLeft - c.x - d.x, f = i.top + a.scrollTop - c.y - d.y;
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
function bi(e, t) {
  if (!it(e) || Je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return ct(e) === n && (n = n.ownerDocument.body), n;
}
function tl(e, t) {
  const n = Fe(e);
  if (wo(e))
    return n;
  if (!it(e)) {
    let o = At(e);
    for (; o && !bn(o); ) {
      if (Qe(o) && !qo(o))
        return o;
      o = At(o);
    }
    return n;
  }
  let r = bi(e, t);
  for (; r && Rh(r) && qo(r); )
    r = bi(r, t);
  return r && bn(r) && qo(r) && !sa(r) ? n : r || Hh(e) || n;
}
const Qh = async function(e) {
  const t = this.getOffsetParent || tl, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Zh(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Jh(e) {
  return Je(e).direction === "rtl";
}
const em = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Fh,
  getDocumentElement: ct,
  getClippingRect: qh,
  getOffsetParent: tl,
  getElementRects: Qh,
  getClientRects: Uh,
  getDimensions: Xh,
  getScale: pn,
  isElement: Qe,
  isRTL: Jh
};
function nl(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function tm(e, t) {
  let n = null, r;
  const o = ct(e);
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
    const g = Rr(u), m = Rr(o.clientWidth - (d + f)), y = Rr(o.clientHeight - (u + p)), b = Rr(d), w = {
      rootMargin: -g + "px " + -m + "px " + -y + "px " + -b + "px",
      threshold: ze(0, Lt(1, c)) || 1
    };
    let T = !0;
    function k(E) {
      const M = E[0].intersectionRatio;
      if (M !== c) {
        if (!T)
          return i();
        M ? i(!1, M) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      M === 1 && !nl(l, e.getBoundingClientRect()) && i(), T = !1;
    }
    try {
      n = new IntersectionObserver(k, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(k, w);
    }
    n.observe(e);
  }
  return i(!0), s;
}
function nm(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = ia(e), d = o || s ? [...l ? Zn(l) : [], ...Zn(t)] : [];
  d.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const u = l && a ? tm(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = p) == null || w.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let g, m = c ? Yt(e) : null;
  c && y();
  function y() {
    const b = Yt(e);
    m && !nl(m, b) && n(), m = b, g = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    d.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), u?.(), (b = p) == null || b.disconnect(), p = null, c && cancelAnimationFrame(g);
  };
}
const rm = Sh, om = Nh, sm = Eh, am = Lh, im = Mh, wi = Ch, cm = Dh, lm = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: em,
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
var dm = typeof document < "u", um = function() {
}, qr = dm ? ho : um;
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
function rl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ki(e, t) {
  const n = rl(e);
  return Math.round(t * n) / n;
}
function Xo(e) {
  const t = S.useRef(e);
  return qr(() => {
    t.current = e;
  }), t;
}
function fm(e) {
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
  } = e, [d, u] = S.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = S.useState(r);
  so(f, r) || p(r);
  const [g, m] = S.useState(null), [y, b] = S.useState(null), v = S.useCallback((I) => {
    I !== E.current && (E.current = I, m(I));
  }, []), w = S.useCallback((I) => {
    I !== M.current && (M.current = I, b(I));
  }, []), T = s || g, k = i || y, E = S.useRef(null), M = S.useRef(null), x = S.useRef(d), D = c != null, C = Xo(c), N = Xo(o), L = Xo(l), O = S.useCallback(() => {
    if (!E.current || !M.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    N.current && (I.platform = N.current), lm(E.current, M.current, I).then((W) => {
      const q = {
        ...W,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      _.current && !so(x.current, q) && (x.current = q, Lc.flushSync(() => {
        u(q);
      }));
    });
  }, [f, t, n, N, L]);
  qr(() => {
    l === !1 && x.current.isPositioned && (x.current.isPositioned = !1, u((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const _ = S.useRef(!1);
  qr(() => (_.current = !0, () => {
    _.current = !1;
  }), []), qr(() => {
    if (T && (E.current = T), k && (M.current = k), T && k) {
      if (C.current)
        return C.current(T, k, O);
      O();
    }
  }, [T, k, O, C, D]);
  const $ = S.useMemo(() => ({
    reference: E,
    floating: M,
    setReference: v,
    setFloating: w
  }), [v, w]), z = S.useMemo(() => ({
    reference: T,
    floating: k
  }), [T, k]), V = S.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!z.floating)
      return I;
    const W = ki(z.floating, d.x), q = ki(z.floating, d.y);
    return a ? {
      ...I,
      transform: "translate(" + W + "px, " + q + "px)",
      ...rl(z.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: W,
      top: q
    };
  }, [n, a, z.floating, d.x, d.y]);
  return S.useMemo(() => ({
    ...d,
    update: O,
    refs: $,
    elements: z,
    floatingStyles: V
  }), [d, O, $, z, V]);
}
const pm = (e) => {
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
      return r && t(r) ? r.current != null ? wi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? wi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, hm = (e, t) => ({
  ...rm(e),
  options: [e, t]
}), mm = (e, t) => ({
  ...om(e),
  options: [e, t]
}), gm = (e, t) => ({
  ...cm(e),
  options: [e, t]
}), ym = (e, t) => ({
  ...sm(e),
  options: [e, t]
}), vm = (e, t) => ({
  ...am(e),
  options: [e, t]
}), bm = (e, t) => ({
  ...im(e),
  options: [e, t]
}), wm = (e, t) => ({
  ...pm(e),
  options: [e, t]
});
var km = "Arrow", ol = S.forwardRef((e, t) => {
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
ol.displayName = km;
var xm = ol;
function Cm(e) {
  const [t, n] = S.useState(void 0);
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
var ca = "Popper", [sl, Co] = Mn(ca), [Em, al] = sl(ca), il = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = S.useState(null);
  return /* @__PURE__ */ h(Em, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
il.displayName = ca;
var cl = "PopperAnchor", ll = S.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = al(cl, n), i = S.useRef(null), a = Ie(t, i), c = S.useRef(null);
    return S.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ h(Le.div, { ...o, ref: a });
  }
);
ll.displayName = cl;
var la = "PopperContent", [Mm, Tm] = sl(la), dl = S.forwardRef(
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
    } = e, y = al(la, n), [b, v] = S.useState(null), w = Ie(t, (P) => v(P)), [T, k] = S.useState(null), E = Cm(T), M = E?.width ?? 0, x = E?.height ?? 0, D = r + (s !== "center" ? "-" + s : ""), C = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, N = Array.isArray(l) ? l : [l], L = N.length > 0, O = {
      padding: C,
      boundary: N.filter(Nm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: _, floatingStyles: $, placement: z, isPositioned: V, middlewareData: I } = fm({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: D,
      whileElementsMounted: (...P) => nm(...P, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        hm({ mainAxis: o + x, alignmentAxis: i }),
        c && mm({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? gm() : void 0,
          ...O
        }),
        c && ym({ ...O }),
        vm({
          ...O,
          apply: ({ elements: P, rects: X, availableWidth: ee, availableHeight: re }) => {
            const { width: fe, height: pe } = X.reference, Re = P.floating.style;
            Re.setProperty("--radix-popper-available-width", `${ee}px`), Re.setProperty("--radix-popper-available-height", `${re}px`), Re.setProperty("--radix-popper-anchor-width", `${fe}px`), Re.setProperty("--radix-popper-anchor-height", `${pe}px`);
          }
        }),
        T && wm({ element: T, padding: a }),
        Dm({ arrowWidth: M, arrowHeight: x }),
        f && bm({ strategy: "referenceHidden", ...O })
      ]
    }), [W, q] = pl(z), J = yt(g);
    Dt(() => {
      V && J?.();
    }, [V, J]);
    const te = I.arrow?.x, B = I.arrow?.y, H = I.arrow?.centerOffset !== 0, [R, U] = S.useState();
    return Dt(() => {
      b && U(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ h(
      "div",
      {
        ref: _.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: V ? $.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: R,
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
        children: /* @__PURE__ */ h(
          Mm,
          {
            scope: n,
            placedSide: W,
            onArrowChange: k,
            arrowX: te,
            arrowY: B,
            shouldHideArrow: H,
            children: /* @__PURE__ */ h(
              Le.div,
              {
                "data-side": W,
                "data-align": q,
                ...m,
                ref: w,
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
dl.displayName = la;
var ul = "PopperArrow", Sm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, fl = S.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Tm(ul, r), i = Sm[s.placedSide];
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
fl.displayName = ul;
function Nm(e) {
  return e !== null;
}
var Dm = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, d] = pl(n), u = { start: "0%", center: "50%", end: "100%" }[d], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let g = "", m = "";
    return l === "bottom" ? (g = i ? u : `${f}px`, m = `${-c}px`) : l === "top" ? (g = i ? u : `${f}px`, m = `${r.floating.height + c}px`) : l === "right" ? (g = `${-c}px`, m = i ? u : `${p}px`) : l === "left" && (g = `${r.floating.width + c}px`, m = i ? u : `${p}px`), { data: { x: g, y: m } };
  }
});
function pl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var hl = il, ml = ll, gl = dl, yl = fl, Lm = "Portal", da = S.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = S.useState(!1);
  Dt(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? qf.createPortal(/* @__PURE__ */ h(Le.div, { ...r, ref: t }), i) : null;
});
da.displayName = Lm;
function Am(e, t) {
  return S.useReducer((n, r) => t[n][r] ?? n, e);
}
var Vt = (e) => {
  const { present: t, children: n } = e, r = Im(t), o = typeof n == "function" ? n({ present: r.isPresent }) : S.Children.only(n), s = Ie(r.ref, Rm(o));
  return typeof n == "function" || r.isPresent ? S.cloneElement(o, { ref: s }) : null;
};
Vt.displayName = "Presence";
function Im(e) {
  const [t, n] = S.useState(), r = S.useRef(null), o = S.useRef(e), s = S.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = Am(i, {
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
  return S.useEffect(() => {
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
    ref: S.useCallback((l) => {
      r.current = l ? getComputedStyle(l) : null, n(l);
    }, [])
  };
}
function Pr(e) {
  return e?.animationName || "none";
}
function Rm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Zo = "rovingFocusGroup.onEntryFocus", Pm = { bubbles: !1, cancelable: !0 }, or = "RovingFocusGroup", [Es, vl, Om] = zc(or), [_m, bl] = Mn(
  or,
  [Om]
), [$m, Hm] = _m(or), wl = S.forwardRef(
  (e, t) => /* @__PURE__ */ h(Es.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(Es.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(Bm, { ...e, ref: t }) }) })
);
wl.displayName = or;
var Bm = S.forwardRef((e, t) => {
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
  } = e, f = S.useRef(null), p = Ie(t, f), g = Fc(s), [m, y] = ea({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: or
  }), [b, v] = S.useState(!1), w = yt(l), T = vl(n), k = S.useRef(!1), [E, M] = S.useState(0);
  return S.useEffect(() => {
    const x = f.current;
    if (x)
      return x.addEventListener(Zo, w), () => x.removeEventListener(Zo, w);
  }, [w]), /* @__PURE__ */ h(
    $m,
    {
      scope: n,
      orientation: r,
      dir: g,
      loop: o,
      currentTabStopId: m,
      onItemFocus: S.useCallback(
        (x) => y(x),
        [y]
      ),
      onItemShiftTab: S.useCallback(() => v(!0), []),
      onFocusableItemAdd: S.useCallback(
        () => M((x) => x + 1),
        []
      ),
      onFocusableItemRemove: S.useCallback(
        () => M((x) => x - 1),
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
          onMouseDown: ce(e.onMouseDown, () => {
            k.current = !0;
          }),
          onFocus: ce(e.onFocus, (x) => {
            const D = !k.current;
            if (x.target === x.currentTarget && D && !b) {
              const C = new CustomEvent(Zo, Pm);
              if (x.currentTarget.dispatchEvent(C), !C.defaultPrevented) {
                const N = T().filter((z) => z.focusable), L = N.find((z) => z.active), O = N.find((z) => z.id === m), $ = [L, O, ...N].filter(
                  Boolean
                ).map((z) => z.ref.current);
                Cl($, d);
              }
            }
            k.current = !1;
          }),
          onBlur: ce(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), kl = "RovingFocusGroupItem", xl = S.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = to(), l = s || c, d = Hm(kl, n), u = d.currentTabStopId === l, f = vl(n), { onFocusableItemAdd: p, onFocusableItemRemove: g, currentTabStopId: m } = d;
    return S.useEffect(() => {
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
            onMouseDown: ce(e.onMouseDown, (y) => {
              r ? d.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: ce(e.onFocus, () => d.onItemFocus(l)),
            onKeyDown: ce(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const b = Fm(y, d.orientation, d.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = f().filter((T) => T.focusable).map((T) => T.ref.current);
                if (b === "last") w.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && w.reverse();
                  const T = w.indexOf(y.currentTarget);
                  w = d.loop ? Um(w, T + 1) : w.slice(T + 1);
                }
                setTimeout(() => Cl(w));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: m != null }) : i
          }
        )
      }
    );
  }
);
xl.displayName = kl;
var Wm = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function zm(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Fm(e, t, n) {
  const r = zm(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Wm[r];
}
function Cl(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Um(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var jm = wl, Ym = xl, Vm = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, rn = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap(), _r = {}, Qo = 0, El = function(e) {
  return e && (e.host || El(e.parentNode));
}, Km = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = El(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Gm = function(e, t, n, r) {
  var o = Km(t, Array.isArray(e) ? e : [e]);
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
          var p = f.getAttribute(r), g = p !== null && p !== "false", m = (rn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          rn.set(f, m), s.set(f, y), i.push(f), m === 1 && g && Or.set(f, !0), y === 1 && f.setAttribute(n, "true"), g || f.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(t), a.clear(), Qo++, function() {
    i.forEach(function(u) {
      var f = rn.get(u) - 1, p = s.get(u) - 1;
      rn.set(u, f), s.set(u, p), f || (Or.has(u) || u.removeAttribute(r), Or.delete(u)), p || u.removeAttribute(n);
    }), Qo--, Qo || (rn = /* @__PURE__ */ new WeakMap(), rn = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap(), _r = {});
  };
}, qm = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Vm(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Gm(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, rt = function() {
  return rt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, rt.apply(this, arguments);
};
function Ml(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Xm(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Xr = "right-scroll-bar-position", Zr = "width-before-scroll-bar", Zm = "with-scroll-bars-hidden", Qm = "--removed-body-scroll-bar-size";
function Jo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Jm(e, t) {
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
var eg = typeof window < "u" ? S.useLayoutEffect : S.useEffect, xi = /* @__PURE__ */ new WeakMap();
function tg(e, t) {
  var n = Jm(null, function(r) {
    return e.forEach(function(o) {
      return Jo(o, r);
    });
  });
  return eg(function() {
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
function ng(e) {
  return e;
}
function rg(e, t) {
  t === void 0 && (t = ng);
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
function og(e) {
  e === void 0 && (e = {});
  var t = rg(null);
  return t.options = rt({ async: !0, ssr: !1 }, e), t;
}
var Tl = function(e) {
  var t = e.sideCar, n = Ml(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return S.createElement(r, rt({}, n));
};
Tl.isSideCarExport = !0;
function sg(e, t) {
  return e.useMedium(t), Tl;
}
var Sl = og(), es = function() {
}, Eo = S.forwardRef(function(e, t) {
  var n = S.useRef(null), r = S.useState({
    onScrollCapture: es,
    onWheelCapture: es,
    onTouchMoveCapture: es
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, u = e.shards, f = e.sideCar, p = e.noRelative, g = e.noIsolation, m = e.inert, y = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, w = e.gapMode, T = Ml(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), k = f, E = tg([n, t]), M = rt(rt({}, T), o);
  return S.createElement(
    S.Fragment,
    null,
    d && S.createElement(k, { sideCar: Sl, removeScrollBar: l, shards: u, noRelative: p, noIsolation: g, inert: m, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    i ? S.cloneElement(S.Children.only(a), rt(rt({}, M), { ref: E })) : S.createElement(v, rt({}, M, { className: c, ref: E }), a)
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
var ag = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function ig() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = ag();
  return t && e.setAttribute("nonce", t), e;
}
function cg(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function lg(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var dg = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = ig()) && (cg(t, n), lg(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, ug = function() {
  var e = dg();
  return function(t, n) {
    S.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Nl = function() {
  var e = ug(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, fg = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ts = function(e) {
  return parseInt(e || "", 10) || 0;
}, pg = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ts(n), ts(r), ts(o)];
}, hg = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return fg;
  var t = pg(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, mg = Nl(), hn = "data-scroll-locked", gg = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Zm, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(hn, `] {
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
  
  body[`).concat(hn, `] {
    `).concat(Qm, ": ").concat(a, `px;
  }
`);
}, Ci = function() {
  var e = parseInt(document.body.getAttribute(hn) || "0", 10);
  return isFinite(e) ? e : 0;
}, yg = function() {
  S.useEffect(function() {
    return document.body.setAttribute(hn, (Ci() + 1).toString()), function() {
      var e = Ci() - 1;
      e <= 0 ? document.body.removeAttribute(hn) : document.body.setAttribute(hn, e.toString());
    };
  }, []);
}, vg = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  yg();
  var s = S.useMemo(function() {
    return hg(o);
  }, [o]);
  return S.createElement(mg, { styles: gg(s, !t, o, n ? "" : "!important") });
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
var on = Ms ? { passive: !1 } : !1, bg = function(e) {
  return e.tagName === "TEXTAREA";
}, Dl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !bg(e) && n[t] === "visible")
  );
}, wg = function(e) {
  return Dl(e, "overflowY");
}, kg = function(e) {
  return Dl(e, "overflowX");
}, Ei = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ll(e, r);
    if (o) {
      var s = Al(e, r), i = s[1], a = s[2];
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
}, Cg = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ll = function(e, t) {
  return e === "v" ? wg(t) : kg(t);
}, Al = function(e, t) {
  return e === "v" ? xg(t) : Cg(t);
}, Eg = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Mg = function(e, t, n, r, o) {
  var s = Eg(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, d = i > 0, u = 0, f = 0;
  do {
    if (!a)
      break;
    var p = Al(e, a), g = p[0], m = p[1], y = p[2], b = m - y - s * g;
    (g || b) && Ll(e, a) && (u += b, f += g);
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
}, Mi = function(e) {
  return [e.deltaX, e.deltaY];
}, Ti = function(e) {
  return e && "current" in e ? e.current : e;
}, Tg = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Sg = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Ng = 0, sn = [];
function Dg(e) {
  var t = S.useRef([]), n = S.useRef([0, 0]), r = S.useRef(), o = S.useState(Ng++)[0], s = S.useState(Nl)[0], i = S.useRef(e);
  S.useEffect(function() {
    i.current = e;
  }, [e]), S.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = Xm([e.lockRef.current], (e.shards || []).map(Ti), !0).filter(Boolean);
      return m.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = S.useCallback(function(m, y) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !i.current.allowPinchZoom;
    var b = Hr(m), v = n.current, w = "deltaX" in m ? m.deltaX : v[0] - b[0], T = "deltaY" in m ? m.deltaY : v[1] - b[1], k, E = m.target, M = Math.abs(w) > Math.abs(T) ? "h" : "v";
    if ("touches" in m && M === "h" && E.type === "range")
      return !1;
    var x = Ei(M, E);
    if (!x)
      return !0;
    if (x ? k = M : (k = M === "v" ? "h" : "v", x = Ei(M, E)), !x)
      return !1;
    if (!r.current && "changedTouches" in m && (w || T) && (r.current = k), !k)
      return !0;
    var D = r.current || k;
    return Mg(D, y, m, D === "h" ? w : T);
  }, []), c = S.useCallback(function(m) {
    var y = m;
    if (!(!sn.length || sn[sn.length - 1] !== s)) {
      var b = "deltaY" in y ? Mi(y) : Hr(y), v = t.current.filter(function(k) {
        return k.name === y.type && (k.target === y.target || y.target === k.shadowParent) && Tg(k.delta, b);
      })[0];
      if (v && v.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!v) {
        var w = (i.current.shards || []).map(Ti).filter(Boolean).filter(function(k) {
          return k.contains(y.target);
        }), T = w.length > 0 ? a(y, w[0]) : !i.current.noIsolation;
        T && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = S.useCallback(function(m, y, b, v) {
    var w = { name: m, delta: y, target: b, should: v, shadowParent: Lg(b) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(T) {
        return T !== w;
      });
    }, 1);
  }, []), d = S.useCallback(function(m) {
    n.current = Hr(m), r.current = void 0;
  }, []), u = S.useCallback(function(m) {
    l(m.type, Mi(m), m.target, a(m, e.lockRef.current));
  }, []), f = S.useCallback(function(m) {
    l(m.type, Hr(m), m.target, a(m, e.lockRef.current));
  }, []);
  S.useEffect(function() {
    return sn.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, on), document.addEventListener("touchmove", c, on), document.addEventListener("touchstart", d, on), function() {
      sn = sn.filter(function(m) {
        return m !== s;
      }), document.removeEventListener("wheel", c, on), document.removeEventListener("touchmove", c, on), document.removeEventListener("touchstart", d, on);
    };
  }, []);
  var p = e.removeScrollBar, g = e.inert;
  return S.createElement(
    S.Fragment,
    null,
    g ? S.createElement(s, { styles: Sg(o) }) : null,
    p ? S.createElement(vg, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Lg(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Ag = sg(Sl, Dg);
var Il = S.forwardRef(function(e, t) {
  return S.createElement(Eo, rt({}, e, { ref: t, sideCar: Ag }));
});
Il.classNames = Eo.classNames;
var Ts = ["Enter", " "], Ig = ["ArrowDown", "PageUp", "Home"], Rl = ["ArrowUp", "PageDown", "End"], Rg = [...Ig, ...Rl], Pg = {
  ltr: [...Ts, "ArrowRight"],
  rtl: [...Ts, "ArrowLeft"]
}, Og = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, sr = "Menu", [Qn, _g, $g] = zc(sr), [Kt, Pl] = Mn(sr, [
  $g,
  Co,
  bl
]), Mo = Co(), Ol = bl(), [Hg, Gt] = Kt(sr), [Bg, ar] = Kt(sr), _l = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Mo(t), [c, l] = S.useState(null), d = S.useRef(!1), u = yt(s), f = Fc(o);
  return S.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ h(hl, { ...a, children: /* @__PURE__ */ h(
    Hg,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ h(
        Bg,
        {
          scope: t,
          onClose: S.useCallback(() => u(!1), [u]),
          isUsingKeyboardRef: d,
          dir: f,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
_l.displayName = sr;
var Wg = "MenuAnchor", ua = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Mo(n);
    return /* @__PURE__ */ h(ml, { ...o, ...r, ref: t });
  }
);
ua.displayName = Wg;
var fa = "MenuPortal", [zg, $l] = Kt(fa, {
  forceMount: void 0
}), Hl = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = Gt(fa, t);
  return /* @__PURE__ */ h(zg, { scope: t, forceMount: n, children: /* @__PURE__ */ h(Vt, { present: n || s.open, children: /* @__PURE__ */ h(da, { asChild: !0, container: o, children: r }) }) });
};
Hl.displayName = fa;
var Ge = "MenuContent", [Fg, pa] = Kt(Ge), Bl = S.forwardRef(
  (e, t) => {
    const n = $l(Ge, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Gt(Ge, e.__scopeMenu), i = ar(Ge, e.__scopeMenu);
    return /* @__PURE__ */ h(Qn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(Vt, { present: r || s.open, children: /* @__PURE__ */ h(Qn.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ h(Ug, { ...o, ref: t }) : /* @__PURE__ */ h(jg, { ...o, ref: t }) }) }) });
  }
), Ug = S.forwardRef(
  (e, t) => {
    const n = Gt(Ge, e.__scopeMenu), r = S.useRef(null), o = Ie(t, r);
    return S.useEffect(() => {
      const s = r.current;
      if (s) return qm(s);
    }, []), /* @__PURE__ */ h(
      ha,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: ce(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), jg = S.forwardRef((e, t) => {
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
}), Yg = /* @__PURE__ */ qn("MenuContent.ScrollLock"), ha = S.forwardRef(
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
    } = e, y = Gt(Ge, n), b = ar(Ge, n), v = Mo(n), w = Ol(n), T = _g(n), [k, E] = S.useState(null), M = S.useRef(null), x = Ie(t, M, y.onContentChange), D = S.useRef(0), C = S.useRef(""), N = S.useRef(0), L = S.useRef(null), O = S.useRef("right"), _ = S.useRef(0), $ = g ? Il : S.Fragment, z = g ? { as: Yg, allowPinchZoom: !0 } : void 0, V = (W) => {
      const q = C.current + W, J = T().filter((P) => !P.disabled), te = document.activeElement, B = J.find((P) => P.ref.current === te)?.textValue, H = J.map((P) => P.textValue), R = ry(H, q, B), U = J.find((P) => P.textValue === R)?.ref.current;
      (function P(X) {
        C.current = X, window.clearTimeout(D.current), X !== "" && (D.current = window.setTimeout(() => P(""), 1e3));
      })(q), U && setTimeout(() => U.focus());
    };
    S.useEffect(() => () => window.clearTimeout(D.current), []), th();
    const I = S.useCallback((W) => O.current === L.current?.side && sy(W, L.current?.area), []);
    return /* @__PURE__ */ h(
      Fg,
      {
        scope: n,
        searchRef: C,
        onItemEnter: S.useCallback(
          (W) => {
            I(W) && W.preventDefault();
          },
          [I]
        ),
        onItemLeave: S.useCallback(
          (W) => {
            I(W) || (M.current?.focus(), E(null));
          },
          [I]
        ),
        onTriggerLeave: S.useCallback(
          (W) => {
            I(W) && W.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: N,
        onPointerGraceIntentChange: S.useCallback((W) => {
          L.current = W;
        }, []),
        children: /* @__PURE__ */ h($, { ...z, children: /* @__PURE__ */ h(
          Yc,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: ce(s, (W) => {
              W.preventDefault(), M.current?.focus({ preventScroll: !0 });
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
                  jm,
                  {
                    asChild: !0,
                    ...w,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: k,
                    onCurrentTabStopIdChange: E,
                    onEntryFocus: ce(c, (W) => {
                      b.isUsingKeyboardRef.current || W.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ h(
                      gl,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": td(y.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...m,
                        ref: x,
                        style: { outline: "none", ...m.style },
                        onKeyDown: ce(m.onKeyDown, (W) => {
                          const J = W.target.closest("[data-radix-menu-content]") === W.currentTarget, te = W.ctrlKey || W.altKey || W.metaKey, B = W.key.length === 1;
                          J && (W.key === "Tab" && W.preventDefault(), !te && B && V(W.key));
                          const H = M.current;
                          if (W.target !== H || !Rg.includes(W.key)) return;
                          W.preventDefault();
                          const U = T().filter((P) => !P.disabled).map((P) => P.ref.current);
                          Rl.includes(W.key) && U.reverse(), ty(U);
                        }),
                        onBlur: ce(e.onBlur, (W) => {
                          W.currentTarget.contains(W.target) || (window.clearTimeout(D.current), C.current = "");
                        }),
                        onPointerMove: ce(
                          e.onPointerMove,
                          Jn((W) => {
                            const q = W.target, J = _.current !== W.clientX;
                            if (W.currentTarget.contains(q) && J) {
                              const te = W.clientX > _.current ? "right" : "left";
                              O.current = te, _.current = W.clientX;
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
Bl.displayName = Ge;
var Vg = "MenuGroup", ma = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(Le.div, { role: "group", ...r, ref: t });
  }
);
ma.displayName = Vg;
var Kg = "MenuLabel", Wl = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(Le.div, { ...r, ref: t });
  }
);
Wl.displayName = Kg;
var ao = "MenuItem", Si = "menu.itemSelect", To = S.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = S.useRef(null), i = ar(ao, e.__scopeMenu), a = pa(ao, e.__scopeMenu), c = Ie(t, s), l = S.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const f = new CustomEvent(Si, { bubbles: !0, cancelable: !0 });
        u.addEventListener(Si, (p) => r?.(p), { once: !0 }), Wc(u, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ h(
      zl,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: ce(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), l.current = !0;
        },
        onPointerUp: ce(e.onPointerUp, (u) => {
          l.current || u.currentTarget?.click();
        }),
        onKeyDown: ce(e.onKeyDown, (u) => {
          const f = a.searchRef.current !== "";
          n || f && u.key === " " || Ts.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
To.displayName = ao;
var zl = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = pa(ao, n), a = Ol(n), c = S.useRef(null), l = Ie(t, c), [d, u] = S.useState(!1), [f, p] = S.useState("");
    return S.useEffect(() => {
      const g = c.current;
      g && p((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ h(
      Qn.ItemSlot,
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
            onPointerMove: ce(
              e.onPointerMove,
              Jn((g) => {
                r ? i.onItemLeave(g) : (i.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ce(
              e.onPointerLeave,
              Jn((g) => i.onItemLeave(g))
            ),
            onFocus: ce(e.onFocus, () => u(!0)),
            onBlur: ce(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), Gg = "MenuCheckboxItem", Fl = S.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ h(Kl, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ h(
      To,
      {
        role: "menuitemcheckbox",
        "aria-checked": io(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ya(n),
        onSelect: ce(
          o.onSelect,
          () => r?.(io(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Fl.displayName = Gg;
var Ul = "MenuRadioGroup", [qg, Xg] = Kt(
  Ul,
  { value: void 0, onValueChange: () => {
  } }
), jl = S.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = yt(r);
    return /* @__PURE__ */ h(qg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ h(ma, { ...o, ref: t }) });
  }
);
jl.displayName = Ul;
var Yl = "MenuRadioItem", Vl = S.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Xg(Yl, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ h(Kl, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ h(
      To,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": ya(s),
        onSelect: ce(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Vl.displayName = Yl;
var ga = "MenuItemIndicator", [Kl, Zg] = Kt(
  ga,
  { checked: !1 }
), Gl = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = Zg(ga, n);
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
Gl.displayName = ga;
var Qg = "MenuSeparator", ql = S.forwardRef(
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
ql.displayName = Qg;
var Jg = "MenuArrow", Xl = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Mo(n);
    return /* @__PURE__ */ h(yl, { ...o, ...r, ref: t });
  }
);
Xl.displayName = Jg;
var ey = "MenuSub", [oE, Zl] = Kt(ey), Fn = "MenuSubTrigger", Ql = S.forwardRef(
  (e, t) => {
    const n = Gt(Fn, e.__scopeMenu), r = ar(Fn, e.__scopeMenu), o = Zl(Fn, e.__scopeMenu), s = pa(Fn, e.__scopeMenu), i = S.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, d = S.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return S.useEffect(() => d, [d]), S.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), c(null);
      };
    }, [a, c]), /* @__PURE__ */ h(ua, { asChild: !0, ...l, children: /* @__PURE__ */ h(
      zl,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": td(n.open),
        ...e,
        ref: vo(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ce(
          e.onPointerMove,
          Jn((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: ce(
          e.onPointerLeave,
          Jn((u) => {
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
        onKeyDown: ce(e.onKeyDown, (u) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && u.key === " " || Pg[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Ql.displayName = Fn;
var Jl = "MenuSubContent", ed = S.forwardRef(
  (e, t) => {
    const n = $l(Ge, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Gt(Ge, e.__scopeMenu), i = ar(Ge, e.__scopeMenu), a = Zl(Jl, e.__scopeMenu), c = S.useRef(null), l = Ie(t, c);
    return /* @__PURE__ */ h(Qn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(Vt, { present: r || s.open, children: /* @__PURE__ */ h(Qn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(
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
        onFocusOutside: ce(e.onFocusOutside, (d) => {
          d.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: ce(e.onEscapeKeyDown, (d) => {
          i.onClose(), d.preventDefault();
        }),
        onKeyDown: ce(e.onKeyDown, (d) => {
          const u = d.currentTarget.contains(d.target), f = Og[i.dir].includes(d.key);
          u && f && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
ed.displayName = Jl;
function td(e) {
  return e ? "open" : "closed";
}
function io(e) {
  return e === "indeterminate";
}
function ya(e) {
  return io(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function ty(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function ny(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function ry(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = ny(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function oy(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function sy(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return oy(n, t);
}
function Jn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var ay = _l, iy = ua, cy = Hl, ly = Bl, dy = ma, uy = Wl, fy = To, py = Fl, hy = jl, my = Vl, gy = Gl, yy = ql, vy = Xl, by = Ql, wy = ed, So = "DropdownMenu", [ky] = Mn(
  So,
  [Pl]
), Oe = Pl(), [xy, nd] = ky(So), rd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = Oe(t), l = S.useRef(null), [d, u] = ea({
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
      onOpenToggle: S.useCallback(() => u((f) => !f), [u]),
      modal: a,
      children: /* @__PURE__ */ h(ay, { ...c, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
rd.displayName = So;
var od = "DropdownMenuTrigger", sd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = nd(od, n), i = Oe(n);
    return /* @__PURE__ */ h(iy, { asChild: !0, ...i, children: /* @__PURE__ */ h(
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
        onPointerDown: ce(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: ce(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
sd.displayName = od;
var Cy = "DropdownMenuPortal", ad = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Oe(t);
  return /* @__PURE__ */ h(cy, { ...r, ...n });
};
ad.displayName = Cy;
var id = "DropdownMenuContent", cd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = nd(id, n), s = Oe(n), i = S.useRef(!1);
    return /* @__PURE__ */ h(
      ly,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: ce(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: ce(e.onInteractOutside, (a) => {
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
cd.displayName = id;
var Ey = "DropdownMenuGroup", My = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
    return /* @__PURE__ */ h(dy, { ...o, ...r, ref: t });
  }
);
My.displayName = Ey;
var Ty = "DropdownMenuLabel", Sy = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
    return /* @__PURE__ */ h(uy, { ...o, ...r, ref: t });
  }
);
Sy.displayName = Ty;
var Ny = "DropdownMenuItem", ld = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
    return /* @__PURE__ */ h(fy, { ...o, ...r, ref: t });
  }
);
ld.displayName = Ny;
var Dy = "DropdownMenuCheckboxItem", Ly = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
  return /* @__PURE__ */ h(py, { ...o, ...r, ref: t });
});
Ly.displayName = Dy;
var Ay = "DropdownMenuRadioGroup", Iy = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
  return /* @__PURE__ */ h(hy, { ...o, ...r, ref: t });
});
Iy.displayName = Ay;
var Ry = "DropdownMenuRadioItem", Py = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
  return /* @__PURE__ */ h(my, { ...o, ...r, ref: t });
});
Py.displayName = Ry;
var Oy = "DropdownMenuItemIndicator", _y = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
  return /* @__PURE__ */ h(gy, { ...o, ...r, ref: t });
});
_y.displayName = Oy;
var $y = "DropdownMenuSeparator", dd = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
  return /* @__PURE__ */ h(yy, { ...o, ...r, ref: t });
});
dd.displayName = $y;
var Hy = "DropdownMenuArrow", By = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
    return /* @__PURE__ */ h(vy, { ...o, ...r, ref: t });
  }
);
By.displayName = Hy;
var Wy = "DropdownMenuSubTrigger", zy = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
  return /* @__PURE__ */ h(by, { ...o, ...r, ref: t });
});
zy.displayName = Wy;
var Fy = "DropdownMenuSubContent", Uy = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Oe(n);
  return /* @__PURE__ */ h(
    wy,
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
Uy.displayName = Fy;
var jy = rd, Yy = sd, Vy = ad, Ky = cd, Gy = ld, qy = dd;
function ud(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ud(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function fd() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ud(e)) && (r && (r += " "), r += t);
  return r;
}
const va = "-", Xy = (e) => {
  const t = Qy(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(va);
      return a[0] === "" && a.length !== 1 && a.shift(), pd(a, t) || Zy(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, pd = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? pd(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(va);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Ni = /^\[(.+)\]$/, Zy = (e) => {
  if (Ni.test(e)) {
    const t = Ni.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Qy = (e) => {
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
      if (Jy(o)) {
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
}, Jy = (e) => e.isThemeGetter, ev = (e) => {
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
}, Ns = "!", Ds = ":", tv = Ds.length, nv = (e) => {
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
        if (m === Ds) {
          s.push(o.slice(c, g)), c = g + tv;
          continue;
        }
        if (m === "/") {
          l = g;
          continue;
        }
      }
      m === "[" ? i++ : m === "]" ? i-- : m === "(" ? a++ : m === ")" && a--;
    }
    const d = s.length === 0 ? o : o.substring(c), u = rv(d), f = u !== d, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: u,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + Ds, s = r;
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
}, rv = (e) => e.endsWith(Ns) ? e.substring(0, e.length - 1) : e.startsWith(Ns) ? e.substring(1) : e, ov = (e) => {
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
}, sv = (e) => ({
  cache: ev(e.cacheSize),
  parseClassName: nv(e),
  sortModifiers: ov(e),
  ...Xy(e)
}), av = /\s+/, iv = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(av);
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
    const v = s(f).join(":"), w = p ? v + Ns : v, T = w + b;
    if (i.includes(T))
      continue;
    i.push(T);
    const k = o(b, y);
    for (let E = 0; E < k.length; ++E) {
      const M = k[E];
      i.push(w + M);
    }
    c = d + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function cv() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = hd(t)) && (r && (r += " "), r += n);
  return r;
}
const hd = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = hd(e[r])) && (n && (n += " "), n += t);
  return n;
};
function lv(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((d, u) => u(d), e());
    return n = sv(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const d = iv(c, n);
    return o(c, d), d;
  }
  return function() {
    return s(cv.apply(null, arguments));
  };
}
const Me = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, md = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, gd = /^\((?:(\w[\w-]*):)?(.+)\)$/i, dv = /^\d+\/\d+$/, uv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, fv = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, pv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, hv = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, mv = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, an = (e) => dv.test(e), de = (e) => !!e && !Number.isNaN(Number(e)), Et = (e) => !!e && Number.isInteger(Number(e)), ns = (e) => e.endsWith("%") && de(e.slice(0, -1)), dt = (e) => uv.test(e), gv = () => !0, yv = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  fv.test(e) && !pv.test(e)
), yd = () => !1, vv = (e) => hv.test(e), bv = (e) => mv.test(e), wv = (e) => !Z(e) && !Q(e), kv = (e) => Nn(e, wd, yd), Z = (e) => md.test(e), Ot = (e) => Nn(e, kd, yv), rs = (e) => Nn(e, Tv, de), Li = (e) => Nn(e, vd, yd), xv = (e) => Nn(e, bd, bv), Br = (e) => Nn(e, xd, vv), Q = (e) => gd.test(e), Hn = (e) => Dn(e, kd), Cv = (e) => Dn(e, Sv), Ai = (e) => Dn(e, vd), Ev = (e) => Dn(e, wd), Mv = (e) => Dn(e, bd), Wr = (e) => Dn(e, xd, !0), Nn = (e, t, n) => {
  const r = md.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Dn = (e, t, n = !1) => {
  const r = gd.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, vd = (e) => e === "position" || e === "percentage", bd = (e) => e === "image" || e === "url", wd = (e) => e === "length" || e === "size" || e === "bg-size", kd = (e) => e === "length", Tv = (e) => e === "number", Sv = (e) => e === "family-name", xd = (e) => e === "shadow", Nv = () => {
  const e = Me("color"), t = Me("font"), n = Me("text"), r = Me("font-weight"), o = Me("tracking"), s = Me("leading"), i = Me("breakpoint"), a = Me("container"), c = Me("spacing"), l = Me("radius"), d = Me("shadow"), u = Me("inset-shadow"), f = Me("text-shadow"), p = Me("drop-shadow"), g = Me("blur"), m = Me("perspective"), y = Me("aspect"), b = Me("ease"), v = Me("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => [
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
  ], k = () => [...T(), Q, Z], E = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], x = () => [Q, Z, c], D = () => [an, "full", "auto", ...x()], C = () => [Et, "none", "subgrid", Q, Z], N = () => ["auto", {
    span: ["full", Et, Q, Z]
  }, Et, Q, Z], L = () => [Et, "auto", Q, Z], O = () => ["auto", "min", "max", "fr", Q, Z], _ = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], z = () => ["auto", ...x()], V = () => [an, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], I = () => [e, Q, Z], W = () => [...T(), Ai, Li, {
    position: [Q, Z]
  }], q = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], J = () => ["auto", "cover", "contain", Ev, kv, {
    size: [Q, Z]
  }], te = () => [ns, Hn, Ot], B = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    Q,
    Z
  ], H = () => ["", de, Hn, Ot], R = () => ["solid", "dashed", "dotted", "double"], U = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], P = () => [de, ns, Ai, Li], X = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    Q,
    Z
  ], ee = () => ["none", de, Q, Z], re = () => ["none", de, Q, Z], fe = () => [de, Q, Z], pe = () => [an, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [dt],
      breakpoint: [dt],
      color: [gv],
      container: [dt],
      "drop-shadow": [dt],
      ease: ["in", "out", "in-out"],
      font: [wv],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [dt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [dt],
      shadow: [dt],
      spacing: ["px", de],
      text: [dt],
      "text-shadow": [dt],
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
        aspect: ["auto", "square", an, Z, Q, y]
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
        columns: [de, Z, Q, a]
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
        object: k()
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
        z: [Et, "auto", Q, Z]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [an, "full", "auto", a, ...x()]
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
        flex: [de, an, "auto", "initial", "none", Z]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", de, Q, Z]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", de, Q, Z]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Et, "first", "last", "none", Q, Z]
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
        col: N()
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
        row: N()
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
        "auto-cols": O()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": O()
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
        justify: [..._(), "normal"]
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
        content: ["normal", ..._()]
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
        "place-content": _()
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
        text: ["base", n, Hn, Ot]
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
        font: [Cv, Z, t]
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
        "line-clamp": [de, "none", Q, rs]
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
        decoration: [...R(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [de, "from-font", "auto", Q, Ot]
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
        "underline-offset": [de, "auto", Q, Z]
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
        bg: W()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: q()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: J()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Et, Q, Z],
          radial: ["", Q, Z],
          conic: [Et, Q, Z]
        }, Mv, xv]
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
        from: te()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: te()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: te()
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
        rounded: B()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": B()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": B()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": B()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": B()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": B()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": B()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": B()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": B()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": B()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": B()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": B()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": B()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": B()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": B()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: H()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": H()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": H()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": H()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": H()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": H()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": H()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": H()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": H()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": H()
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
        "divide-y": H()
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
        border: [...R(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...R(), "hidden", "none"]
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
        outline: [...R(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [de, Q, Z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", de, Hn, Ot]
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
        shadow: I()
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
        "inset-shadow": I()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: H()
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
        "ring-offset": [de, Ot]
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
        "inset-ring": H()
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
        "text-shadow": ["none", f, Wr, Br]
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
        opacity: [de, Q, Z]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...U(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": U()
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
        "mask-linear": [de]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": P()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": P()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": P()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": P()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": P()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": P()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": P()
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
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": P()
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
        "mask-conic": [de]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": P()
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
        mask: W()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: q()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: J()
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
        blur: X()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [de, Q, Z]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [de, Q, Z]
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
        "drop-shadow": I()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", de, Q, Z]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [de, Q, Z]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", de, Q, Z]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [de, Q, Z]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", de, Q, Z]
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
        "backdrop-blur": X()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [de, Q, Z]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [de, Q, Z]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", de, Q, Z]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [de, Q, Z]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", de, Q, Z]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [de, Q, Z]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [de, Q, Z]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", de, Q, Z]
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
        duration: [de, "initial", Q, Z]
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
        delay: [de, Q, Z]
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
        "perspective-origin": k()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ee()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ee()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ee()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ee()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: re()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": re()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": re()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": re()
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
        skew: fe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": fe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": fe()
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
        translate: pe()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": pe()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": pe()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": pe()
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
        stroke: [de, Hn, Ot, rs]
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
}, Dv = /* @__PURE__ */ lv(Nv);
function ie(...e) {
  return Dv(fd(e));
}
function os({
  ...e
}) {
  return /* @__PURE__ */ h(jy, { "data-slot": "dropdown-menu", ...e });
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
  return /* @__PURE__ */ h(Vy, { children: /* @__PURE__ */ h(
    Ky,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: ie(
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
    Gy,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: ie(
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
    qy,
    {
      "data-slot": "dropdown-menu-separator",
      className: ie("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
const Ii = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ri = fd, Lv = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Ri(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const d = n?.[l], u = s?.[l];
    if (d === null) return null;
    const f = Ii(d) || Ii(u);
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
  return Ri(e, i, c, n?.class, n?.className);
}, Ls = Lv(
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
    r ? Bp : "button",
    {
      "data-slot": "button",
      className: ie(Ls({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
var Av = Object.freeze({
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
}), Iv = "VisuallyHidden", Cd = S.forwardRef(
  (e, t) => /* @__PURE__ */ h(
    Le.span,
    {
      ...e,
      ref: t,
      style: { ...Av, ...e.style }
    }
  )
);
Cd.displayName = Iv;
var Rv = Cd, [No] = Mn("Tooltip", [
  Co
]), Do = Co(), Ed = "TooltipProvider", Pv = 700, As = "tooltip.open", [Ov, ba] = No(Ed), Md = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Pv,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = S.useRef(!0), a = S.useRef(!1), c = S.useRef(0);
  return S.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ h(
    Ov,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: n,
      onOpen: S.useCallback(() => {
        window.clearTimeout(c.current), i.current = !1;
      }, []),
      onClose: S.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => i.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: S.useCallback((l) => {
        a.current = l;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
Md.displayName = Ed;
var er = "Tooltip", [_v, ir] = No(er), Td = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = ba(er, e.__scopeTooltip), l = Do(t), [d, u] = S.useState(null), f = to(), p = S.useRef(0), g = i ?? c.disableHoverableContent, m = a ?? c.delayDuration, y = S.useRef(!1), [b, v] = ea({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (M) => {
      M ? (c.onOpen(), document.dispatchEvent(new CustomEvent(As))) : c.onClose(), s?.(M);
    },
    caller: er
  }), w = S.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), T = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, v(!0);
  }, [v]), k = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v(!1);
  }, [v]), E = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, v(!0), p.current = 0;
    }, m);
  }, [m, v]);
  return S.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ h(hl, { ...l, children: /* @__PURE__ */ h(
    _v,
    {
      scope: t,
      contentId: f,
      open: b,
      stateAttribute: w,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: S.useCallback(() => {
        c.isOpenDelayedRef.current ? E() : T();
      }, [c.isOpenDelayedRef, E, T]),
      onTriggerLeave: S.useCallback(() => {
        g ? k() : (window.clearTimeout(p.current), p.current = 0);
      }, [k, g]),
      onOpen: T,
      onClose: k,
      disableHoverableContent: g,
      children: n
    }
  ) });
};
Td.displayName = er;
var Is = "TooltipTrigger", Sd = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = ir(Is, n), s = ba(Is, n), i = Do(n), a = S.useRef(null), c = Ie(t, a, o.onTriggerChange), l = S.useRef(!1), d = S.useRef(!1), u = S.useCallback(() => l.current = !1, []);
    return S.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ h(ml, { asChild: !0, ...i, children: /* @__PURE__ */ h(
      Le.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: ce(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: ce(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: ce(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", u, { once: !0 });
        }),
        onFocus: ce(e.onFocus, () => {
          l.current || o.onOpen();
        }),
        onBlur: ce(e.onBlur, o.onClose),
        onClick: ce(e.onClick, o.onClose)
      }
    ) });
  }
);
Sd.displayName = Is;
var wa = "TooltipPortal", [$v, Hv] = No(wa, {
  forceMount: void 0
}), Nd = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = ir(wa, t);
  return /* @__PURE__ */ h($v, { scope: t, forceMount: n, children: /* @__PURE__ */ h(Vt, { present: n || s.open, children: /* @__PURE__ */ h(da, { asChild: !0, container: o, children: r }) }) });
};
Nd.displayName = wa;
var wn = "TooltipContent", Dd = S.forwardRef(
  (e, t) => {
    const n = Hv(wn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = ir(wn, e.__scopeTooltip);
    return /* @__PURE__ */ h(Vt, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ h(Ld, { side: o, ...s, ref: t }) : /* @__PURE__ */ h(Bv, { side: o, ...s, ref: t }) });
  }
), Bv = S.forwardRef((e, t) => {
  const n = ir(wn, e.__scopeTooltip), r = ba(wn, e.__scopeTooltip), o = S.useRef(null), s = Ie(t, o), [i, a] = S.useState(null), { trigger: c, onClose: l } = n, d = o.current, { onPointerInTransitChange: u } = r, f = S.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = S.useCallback(
    (g, m) => {
      const y = g.currentTarget, b = { x: g.clientX, y: g.clientY }, v = Uv(b, y.getBoundingClientRect()), w = jv(b, v), T = Yv(m.getBoundingClientRect()), k = Kv([...w, ...T]);
      a(k), u(!0);
    },
    [u]
  );
  return S.useEffect(() => () => f(), [f]), S.useEffect(() => {
    if (c && d) {
      const g = (y) => p(y, d), m = (y) => p(y, c);
      return c.addEventListener("pointerleave", g), d.addEventListener("pointerleave", m), () => {
        c.removeEventListener("pointerleave", g), d.removeEventListener("pointerleave", m);
      };
    }
  }, [c, d, p, f]), S.useEffect(() => {
    if (i) {
      const g = (m) => {
        const y = m.target, b = { x: m.clientX, y: m.clientY }, v = c?.contains(y) || d?.contains(y), w = !Vv(b, i);
        v ? f() : w && (f(), l());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [c, d, i, l, f]), /* @__PURE__ */ h(Ld, { ...e, ref: s });
}), [Wv, zv] = No(er, { isInside: !1 }), Fv = /* @__PURE__ */ zp("TooltipContent"), Ld = S.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = ir(wn, n), l = Do(n), { onClose: d } = c;
    return S.useEffect(() => (document.addEventListener(As, d), () => document.removeEventListener(As, d)), [d]), S.useEffect(() => {
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
        children: /* @__PURE__ */ A(
          gl,
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
              /* @__PURE__ */ h(Fv, { children: r }),
              /* @__PURE__ */ h(Wv, { scope: n, isInside: !0, children: /* @__PURE__ */ h(Rv, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Dd.displayName = wn;
var Ad = "TooltipArrow", Id = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Do(n);
    return zv(
      Ad,
      n
    ).isInside ? null : /* @__PURE__ */ h(yl, { ...o, ...r, ref: t });
  }
);
Id.displayName = Ad;
function Uv(e, t) {
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
function jv(e, t, n = 5) {
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
function Vv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function Kv(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Gv(t);
}
function Gv(e) {
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
var qv = Md, Xv = Td, Zv = Sd, Qv = Nd, Jv = Dd, eb = Id;
function tb({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ h(
    qv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Rd({
  ...e
}) {
  return /* @__PURE__ */ h(tb, { children: /* @__PURE__ */ h(Xv, { "data-slot": "tooltip", ...e }) });
}
function Pd({
  ...e
}) {
  return /* @__PURE__ */ h(Zv, { "data-slot": "tooltip-trigger", ...e });
}
function Od({
  className: e,
  sideOffset: t = 4,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ h(Qv, { children: /* @__PURE__ */ A(
    Jv,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: ie(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-4 py-2 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ h("span", { className: "relative z-10", children: n }),
        /* @__PURE__ */ h(eb, { className: "bg-foreground fill-foreground z-0 size-4 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
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
  return o ? /* @__PURE__ */ A(Rd, { children: [
    /* @__PURE__ */ h(Pd, { asChild: !0, children: s }),
    /* @__PURE__ */ h(Od, { side: "bottom", sideOffset: 4, className: "text-xs", children: o })
  ] }) : s;
}, _t = () => /* @__PURE__ */ h("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), nb = wt(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = j(null), [l, d] = Y(!1), [u, f] = Y(void 0), p = mc({
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
    const { view: E } = t, { from: M } = E.state.selection, x = E.coordsAtPos(M);
    f({ top: x.bottom + 8, left: x.left }), d(!0);
  }, [t]), m = F((E, M) => {
    t.chain().focus().setImage({ src: E, alt: M }).run(), d(!1);
  }, [t]), y = F(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = F((E) => {
    t.chain().focus().insertCallout({ type: E }).run();
  }, [t]), v = j(/* @__PURE__ */ new Map()), w = j(/* @__PURE__ */ new Map()), T = F((E) => {
    const { doc: M, tr: x } = E.state;
    let D = !1;
    const C = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = E.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), N.forEach((O, _) => {
      O.querySelectorAll(":scope > li").forEach((z) => {
        const V = z, I = (V.textContent || "").trim().substring(0, 50);
        v.current.set(`${_}-${I}`, V.getBoundingClientRect());
      });
    });
    const L = [];
    M.descendants((O, _, $, z) => {
      if (!C.has(O.type.name)) return !0;
      let V = !1;
      if (O.forEach((W) => {
        W.type.name === "taskItem" && (V = !0);
      }), !V) return !0;
      let I = 0;
      return M.nodesBetween(0, _, (W) => (C.has(W.type.name) && I++, !0)), L.push({ node: O, pos: _, depth: I }), !0;
    }), L.sort((O, _) => _.depth - O.depth);
    for (const { node: O, pos: _ } of L) {
      const $ = [];
      let z = 0;
      O.forEach((R) => {
        $.push({
          node: R,
          isTask: R.type.name === "taskItem",
          checked: R.type.name === "taskItem" && R.attrs.checked === !0,
          originalIndex: z++
        });
      });
      const V = $.filter((R) => R.isTask && !R.checked), I = $.filter((R) => R.isTask && R.checked), W = [...$], q = $.map((R, U) => ({ index: U, isTask: R.isTask })).filter((R) => R.isTask).map((R) => R.index), J = [...V, ...I];
      if (q.forEach((R, U) => {
        W[R] = J[U];
      }), !W.some((R, U) => R.node !== $[U].node)) continue;
      const B = O.type.create(
        O.attrs,
        W.map((R) => R.node)
      ), H = x.mapping.map(_);
      x.replaceWith(H, H + O.nodeSize, B), D = !0;
    }
    D && (E.view.dispatch(x), requestAnimationFrame(() => {
      E.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((_) => {
        const $ = _.querySelectorAll(":scope > li"), z = /* @__PURE__ */ new Map();
        v.current.forEach((V, I) => {
          const W = I.replace(/^\d+-/, "");
          z.set(W, V);
        }), $.forEach((V) => {
          const I = V, W = (I.textContent || "").trim().substring(0, 50), q = z.get(W);
          if (!q) return;
          const J = I.getBoundingClientRect(), te = q.top - J.top;
          if (Math.abs(te) < 2) return;
          I.style.transform = `translateY(${te}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
          const B = () => {
            I.style.transform = "", I.style.transition = "", I.style.zIndex = "", I.removeEventListener("transitionend", B);
          };
          I.addEventListener("transitionend", B), setTimeout(B, 400);
        });
      });
    }));
  }, []);
  K(() => {
    if (!s || !t) return;
    const E = /* @__PURE__ */ new Map();
    t.state.doc.descendants((x, D) => (x.type.name === "taskItem" && E.set(D, x.attrs.checked === !0), !0)), w.current = E;
    const M = ({ transaction: x }) => {
      if (!x.docChanged) return;
      const D = /* @__PURE__ */ new Map();
      t.state.doc.descendants((L, O) => (L.type.name === "taskItem" && D.set(O, L.attrs.checked === !0), !0));
      const C = w.current;
      let N = !1;
      if (C.size > 0 && D.size > 0) {
        let L = 0, O = 0;
        C.forEach((_) => {
          _ && L++;
        }), D.forEach((_) => {
          _ && O++;
        }), L !== O && (N = !0);
      }
      w.current = D, N && setTimeout(() => {
        T(t);
      }, 150);
    };
    return t.on("transaction", M), () => {
      t.off("transaction", M);
    };
  }, [t, s, T]);
  const k = F(() => {
    T(t);
  }, [t, T]);
  return /* @__PURE__ */ A("div", { className: `flex items-center gap-0.5 px-2 py-1.5 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    n && /* @__PURE__ */ h(
      we,
      {
        onClick: n,
        tooltip: "Copy as Markdown",
        children: /* @__PURE__ */ h(xn, { size: 16 })
      }
    ),
    n && /* @__PURE__ */ h(_t, {}),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ h(cf, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ h(lf, { size: 16 })
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
        children: /* @__PURE__ */ h(js, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ h(bc, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ h(wc, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ h(Ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(_t, {}),
    /* @__PURE__ */ A(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ A(
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
            /* @__PURE__ */ h(vn, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(as, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ A(
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
        /* @__PURE__ */ A(
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
        /* @__PURE__ */ A(
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
        /* @__PURE__ */ A(
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
        /* @__PURE__ */ A(
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
        /* @__PURE__ */ A(
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
        children: /* @__PURE__ */ h(kc, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      we,
      {
        onClick: () => {
          if (p?.isTaskList)
            t.chain().focus().sinkListItem("taskItem").run();
          else if ((p?.isBulletList || p?.isOrderedList) && (t.chain().focus().sinkListItem("listItem").run(), p?.isOrderedList)) {
            const { state: E, view: M } = t, { $from: x } = E.selection, D = E.schema.nodes.orderedList, C = E.schema.nodes.bulletList;
            if (D && C)
              for (let N = x.depth; N >= 0; N--) {
                const L = x.node(N);
                if (L.type === D && N >= 2) {
                  const O = x.node(N - 1);
                  if (O.type.name === "listItem" || O.type.name === "taskItem") {
                    const _ = x.before(N);
                    M.dispatch(E.tr.setNodeMarkup(_, C, L.attrs));
                    break;
                  }
                }
                if (L.type.name === "bulletList" || L.type.name === "taskList") break;
              }
          }
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ h(df, { size: 16 })
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
        children: /* @__PURE__ */ h(uf, { size: 16 })
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
    /* @__PURE__ */ A(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ A(
        "button",
        {
          className: "flex items-center justify-center gap-0.5 h-8 px-1.5 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: [
            /* @__PURE__ */ h(vs, { size: 16 }),
            /* @__PURE__ */ h(vn, { size: 12, strokeWidth: 2.5 })
          ]
        }
      ) }),
      /* @__PURE__ */ A(as, { align: "start", children: [
        /* @__PURE__ */ A(xe, { onClick: () => b("info"), children: [
          /* @__PURE__ */ h(vs, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ A(xe, { onClick: () => b("note"), children: [
          /* @__PURE__ */ h(Cc, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ A(xe, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ h(ff, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ A(xe, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ h(pf, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ A(xe, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ h(Ec, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ A(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ A(
        Ut,
        {
          variant: "ghost",
          size: "sm",
          style: { paddingLeft: 12, paddingRight: 12 },
          className: "h-8 gap-1.5 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ h(ys, { size: 16 }),
            /* @__PURE__ */ h("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(as, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ A(
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
        /* @__PURE__ */ A(
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
        /* @__PURE__ */ A(
          xe,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ h(fn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ A(
          xe,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ h(Va, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          xe,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ h(Va, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          xe,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ h(fn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ A(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ h(Ka, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ A(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ h(Ka, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ A(
          xe,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ h(fn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ h(
      Hc,
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
        onClick: k,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ h(hf, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ A(be, { children: [
      /* @__PURE__ */ h(_t, {}),
      /* @__PURE__ */ A(Rd, { children: [
        /* @__PURE__ */ h(Pd, { asChild: !0, children: /* @__PURE__ */ h(
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
        /* @__PURE__ */ h(Od, { side: "bottom", sideOffset: 4, className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ h("div", { className: "flex-1 min-w-2" })
  ] });
});
function rb({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [d, u] = Y(""), [f, p] = Y(""), [g, m] = Y(!1), [y, b] = Y(!1), [v, w] = Y(!1), [T, k] = Y(!1), [E, M] = Y([]), [x, D] = Y(0), [C, N] = Y(null), [L, O] = Y(!1), _ = j(!1), $ = j(null), z = j(null), V = j(!1);
  K(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const I = F(() => {
    if (!d || !e) {
      M([]), D(0), N(null);
      return;
    }
    const R = [];
    let U;
    try {
      if (y)
        U = new RegExp(d, g ? "g" : "gi");
      else {
        let P = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (P = `\\b${P}\\b`), U = new RegExp(P, g ? "g" : "gi");
      }
      N(null);
    } catch (P) {
      N(P.message), M([]);
      return;
    }
    if (l) {
      let P;
      for (; (P = U.exec(i)) !== null; )
        R.push({
          from: P.index,
          to: P.index + P[0].length,
          text: P[0]
        });
    } else {
      const { doc: P } = e.state;
      P.descendants((X, ee) => {
        if (X.isText && X.text) {
          let re;
          for (; (re = U.exec(X.text)) !== null; )
            R.push({
              from: ee + re.index,
              to: ee + re.index + re[0].length,
              text: re[0]
            });
        }
        return !0;
      });
    }
    M(R), R.length > 0 && x >= R.length && D(0);
  }, [d, g, y, v, e, x, l, i]);
  K(() => {
    I();
  }, [I]), K(() => {
    l && c && (t && E.length > 0 ? c(E, x) : c([], 0));
  }, [l, t, E, x, c]), K(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const R = typeof e.commands.setSearchHighlight == "function";
    t && d && R ? e.commands.setSearchHighlight({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      currentMatchIndex: x
    }) : R && e.commands.clearSearchHighlight();
  }, [e, t, d, g, y, x, l, E, i]), K(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), _.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), O(!1)), _.current = !1);
  }, [t, e, c]), K(() => {
    if (E.length > 0 && x < E.length) {
      const R = E[x];
      if (l) {
        const P = document.querySelector(".syntax-textarea");
        if (P && V.current) {
          const X = parseInt(getComputedStyle(P).lineHeight) || 22, re = i.substring(0, R.from).split(`
`).length;
          P.scrollTop = Math.max(0, (re - 3) * X);
        }
        V.current && (V.current = !1);
        return;
      }
      const U = e.view.domAtPos(R.from);
      U.node && U.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), V.current && (V.current = !1);
    }
  }, [x, E, e, l, i]), K(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, r]);
  const W = F(() => {
    E.length !== 0 && (V.current = !0, D((R) => (R + 1) % E.length));
  }, [E.length]), q = F(() => {
    E.length !== 0 && (V.current = !0, D((R) => (R - 1 + E.length) % E.length));
  }, [E.length]), J = F(() => {
    if (E.length === 0 || x >= E.length) return;
    const R = E[x];
    if (l && a) {
      const U = i.substring(0, R.from) + f + i.substring(R.to);
      a(U), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: R.from, to: R.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [E, x, f, e, I, l, i, a]), te = F(() => {
    if (E.length === 0) return;
    if (l && a) {
      const U = [...E].sort((X, ee) => ee.from - X.from);
      let P = i;
      U.forEach((X) => {
        P = P.substring(0, X.from) + f + P.substring(X.to);
      }), a(P), setTimeout(I, 10);
      return;
    }
    const R = [...E].sort((U, P) => P.from - U.from);
    e.chain().focus(), R.forEach((U) => {
      e.chain().setTextSelection({ from: U.from, to: U.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [E, f, e, I, l, i, a]), B = F(() => {
    if (E.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      wholeWord: v
    }) && (O(!0), _.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [E, d, g, y, v, e, n]), H = F((R) => {
    R.key === "Enter" ? (R.preventDefault(), R.shiftKey ? q() : W(), $.current?.focus()) : R.key === "Escape" ? (R.preventDefault(), n()) : R.key === "h" && (R.ctrlKey || R.metaKey) ? (R.preventDefault(), k((U) => !U)) : R.key === "l" && (R.ctrlKey || R.metaKey) && R.shiftKey && (R.preventDefault(), B());
  }, [W, q, n, B]);
  return t ? /* @__PURE__ */ A(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: H,
      children: [
        /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ h(mf, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: $,
                type: "text",
                placeholder: "Find...",
                value: d,
                onChange: (R) => u(R.target.value),
                className: `find-replace-input ${C ? "has-error" : ""}`
              }
            ),
            C && /* @__PURE__ */ h("span", { className: "find-replace-error", title: C, children: "!" })
          ] }),
          /* @__PURE__ */ h("span", { className: "find-replace-count", children: E.length > 0 ? `${x + 1} of ${E.length}` : d ? "No results" : "" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: q,
              disabled: E.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ h(gf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: W,
              disabled: E.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ h(vn, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: B,
              disabled: E.length === 0,
              className: `find-replace-btn ${L ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${E.length} matches`,
              children: /* @__PURE__ */ h(yf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => m((R) => !R),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ h(vf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => w((R) => !R),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ h(bf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => b((R) => !R),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ h(wf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => k((R) => !R),
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
              children: /* @__PURE__ */ h(gt, { size: 16 })
            }
          )
        ] }),
        T && /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ h(bs, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: z,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (R) => p(R.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: J,
              disabled: E.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ A(
            "button",
            {
              onClick: te,
              disabled: E.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ h(kf, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const ob = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), ut = ob ? "⌘" : "Ctrl", sb = ({ editor: e }) => {
  const [t, n] = Y(!1), [r, o] = Y(0), [s, i] = Y(0), [a, c] = Y(""), [l, d] = Y(""), [u, f] = Y(!1), [p, g] = Y(!1);
  K(() => {
    if (!e) return;
    const M = () => {
      const D = e.storage.selectAllOccurrences;
      D ? (n(D.isActive), o(D.ranges.length), i(D.allMatches.length), c(D.searchTerm), d(D.typedBuffer), f(D.isTypingReplace), g(D.isIncremental)) : (n(!1), o(0), i(0));
    }, x = () => {
      M();
    };
    return e.on("transaction", x), M(), () => {
      e.off("transaction", x);
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
  }, [e]), w = F(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), T = F(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), k = F(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), E = F(() => {
    a && (e.commands.selectAllOccurrences({
      searchTerm: a,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, a]);
  return !t || r === 0 ? null : /* @__PURE__ */ A("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ A("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ A("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ h("div", { className: "select-all-action-bar-preview", children: u ? /* @__PURE__ */ A(be, { children: [
        /* @__PURE__ */ h(mo, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ h(be, { children: /* @__PURE__ */ A("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ h("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ A(be, { children: [
        /* @__PURE__ */ h(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${ut}+D)`,
            children: /* @__PURE__ */ h(Xs, { size: 14 })
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: E,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${ut}+Shift+L)`,
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
          title: `Bold all occurrences (${ut}+B)`,
          children: /* @__PURE__ */ h(zs, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${ut}+I)`,
          children: /* @__PURE__ */ h(Fs, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${ut}+U)`,
          children: /* @__PURE__ */ h(Us, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ h(js, { size: 14 })
        }
      ),
      /* @__PURE__ */ h("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ h(fn, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: T,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ h(gt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ A(be, { children: [
      /* @__PURE__ */ A("kbd", { children: [
        ut,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ A("kbd", { children: [
        ut,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ h("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ A("kbd", { children: [
        ut,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ A(be, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ h("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ h("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ A("kbd", { children: [
        ut,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, ab = wt(sb), zr = "-dismissed";
function ib(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function cb(e, t = {}) {
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
  }), l = j(null), d = j(""), u = j(0);
  K(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + zr);
        if (b && !v) {
          let w = "";
          try {
            w = e.getHTML() || "";
          } catch {
            return;
          }
          b !== w && b.length > 50 && c((T) => ({ ...T, hasRecoverableContent: !0 }));
        }
      } catch (b) {
        console.warn("useAutoSave: Error checking for recoverable content", b);
      }
  }, [e, n, o]);
  const f = F(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const b = e.getHTML(), v = ib(b);
        if (v === u.current && b.length === d.current.length) {
          c((w) => ({ ...w, status: "saved" }));
          return;
        }
        if (b.length < 20)
          return;
        c((w) => ({ ...w, status: "saving" })), localStorage.setItem(n, b), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), d.current = b, u.current = v, c((w) => ({
          ...w,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(b), setTimeout(() => {
          c((w) => w.status === "saved" ? { ...w, status: "idle" } : w);
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
function jt(e) {
  return e.replace(/^[ \t]*\u200B[ \t]*$/gm, "").replace(/\u200B/g, "");
}
const lb = {
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
      const o = lb[n] || n.charAt(0).toUpperCase() + n.slice(1), s = r.trim();
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
function db(e, {
  editor: t,
  turndownService: n,
  editorModeRef: r,
  handleModeSwitch: o,
  wordCount: s,
  autoSaveState: i,
  setIsFindReplaceOpen: a,
  setFindReplaceFocusTrigger: c
}) {
  ef(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? jt(n.turndown(t.getHTML())) : "",
    getText: () => t?.getText() || "",
    getJSON: () => t ? t.getJSON() : { type: "doc", content: [] },
    setContent: (l) => {
      t && !t.isDestroyed && queueMicrotask(() => {
        t.commands.setContent(l);
      });
    },
    setContentJSON: (l) => {
      t && !t.isDestroyed && queueMicrotask(() => {
        t.commands.blur(), t.commands.setContent(l);
      });
    },
    clearContent: () => {
      t && !t.isDestroyed && t.commands.clearContent();
    },
    insertAtEnd: (l) => {
      t && !t.isDestroyed && t.chain().focus("end").insertContent(l).run();
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
        const m = t.state.doc.slice(l, d), y = Ac.fromSchema(t.schema), b = document.createElement("div"), v = y.serializeFragment(m.content);
        b.appendChild(v), f = b.innerHTML, p = t.state.doc.textBetween(l, d, `
`);
      }
      let g = jt(n.turndown(f));
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
      const l = jt(n.turndown(t.getHTML()));
      return Rs(l);
    }
  }), [t, n, o, s, i, a]);
}
const ub = new De("tableCellMenu");
function fb(e) {
  return new Ne({
    key: ub,
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
            return e.chain().focus().setTextSelection(a).run(), pb(n, e, a), !0;
          }
          return !1;
        }
      }
    }
  });
}
function pb(e, t, n) {
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
  for (let M = p.depth; M >= 0; M--)
    if (p.node(M).type.name === "table") {
      p.node(M).firstChild?.firstChild?.type.name === "tableHeader" && (g = !0);
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
    { label: "Copy Table", icon: "copy", action: () => hb(t) }
  ], y = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, b = l ? "#2a2a2a" : "#f5f5f5", v = l ? "#ff6b6b" : "#dc2626", w = l ? "#999999" : "#666666", T = l ? "#333333" : "#e5e5e5";
  m.forEach((M) => {
    if (M.label === "divider") {
      const x = document.createElement("div");
      x.style.cssText = "height:1px;background:" + T + ";margin:4px 0;", o.appendChild(x);
    } else {
      const x = document.createElement("button");
      x.type = "button";
      const D = M.destructive ? v : f;
      x.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + D + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const C = y[M.icon || ""] || "", N = M.destructive ? v : w;
      x.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + N + ';">' + C + '</span><span style="flex:1;white-space:nowrap;">' + M.label + "</span>", x.addEventListener("mouseenter", () => {
        x.style.background = M.destructive ? l ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : b;
      }), x.addEventListener("mouseleave", () => {
        x.style.background = "transparent";
      }), x.addEventListener("click", (L) => {
        L.preventDefault(), L.stopPropagation(), M.action && M.action(), o.remove();
      }), o.appendChild(x);
    }
  }), document.body.appendChild(o);
  const k = (M) => {
    const x = M.target;
    o.contains(x) || (o.remove(), document.removeEventListener("mousedown", k), document.removeEventListener("keydown", E));
  }, E = (M) => {
    M.key === "Escape" && (o.remove(), document.removeEventListener("mousedown", k), document.removeEventListener("keydown", E));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", k), document.addEventListener("keydown", E);
  }, 0);
}
function hb(e) {
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
const mb = ap.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      fb(this.editor)
    ];
  }
}), gb = ip.extend({}), Vn = new De("tableSorting");
let Wt = null, Un = null;
function yb(e) {
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
function vb(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function bb(e, t, n) {
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
  Wt = { tablePos: t, columnIndex: n, direction: i }, Un = null;
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
    Pi(n, i), o.dispatch(r.tr.setMeta(Vn, { updated: !0 }));
    return;
  }
  const d = l.map((g) => {
    let m = "", y = 0;
    return g.node.forEach((b) => {
      y === n && (m = b.textContent || ""), y++;
    }), { ...g, sortValue: yb(m) };
  }), u = d.map((g, m) => m);
  d.sort((g, m) => vb(g.sortValue, m.sortValue, i));
  const f = d.map((g, m) => l.indexOf(g));
  if (u.some((g, m) => g !== f[m])) {
    const g = [];
    c.forEach((b) => g.push(b.node)), d.forEach((b) => g.push(b.node));
    const m = s.type.create(s.attrs, g), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, m), y.setMeta(Vn, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Vn, { updated: !0 }));
  Pi(n, i);
}
function Pi(e, t) {
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
function wb(e, t, n, r) {
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
    d.preventDefault(), d.stopPropagation(), bb(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function kb(e) {
  return new Ne({
    key: Vn,
    state: {
      init() {
        return Ve.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Vn);
        return !t.docChanged && !s?.updated && Un ? Un.map(t.mapping, t.doc) : (Un = xb(o.doc, e), Un);
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
              d.forEach((w, T) => {
                w.type.name === "paragraph" && (p = f + 1 + T + w.nodeSize - 1);
              });
              const m = Wt?.tablePos === s && Wt?.columnIndex === c ? Wt.direction : null, y = c, b = s, v = Ze.widget(p, () => wb(m, b, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(v);
            }
            l += d.nodeSize, c++;
          });
        }
      });
    }
  }), Ve.create(e, n);
}
const Cb = He.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [kb(this.editor)];
  }
});
function ka(e, t, n, r, o, s = {}) {
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
const Eb = cp.extend({
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
          if (ka(n, f, i, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Mb = lp.extend({
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
          if (ka(n, f, c, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Tb = up.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: c, $to: l } = a, d = c.blockRange(l);
        if (!d)
          return !1;
        const u = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let k = c.depth; k > 0; k--)
          if (c.node(k).type === u) {
            p = !0, c.before(k);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const g = n.schema.nodes.bulletList, m = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let b = null, v = -1;
        for (let k = c.depth; k > 0; k--) {
          const E = c.node(k);
          if (E.type === g || E.type === m) {
            b = E, v = c.before(k);
            break;
          }
        }
        if (b) {
          if (!o) return !0;
          const k = v, E = r.doc.nodeAt(k);
          if (!E) return !1;
          r.setNodeMarkup(k, u, E.attrs);
          const M = r.doc.nodeAt(k);
          if (!M) return !1;
          const x = [];
          M.forEach((D, C) => {
            D.type === y && x.push(k + 1 + C);
          });
          for (let D = x.length - 1; D >= 0; D--) {
            const C = x[D], N = r.doc.nodeAt(C);
            N && N.type === y && r.setNodeMarkup(C, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const w = qa(d, u);
        if (w) {
          r.wrap(d, w);
          const { $from: k } = r.selection;
          let E = -1;
          for (let M = k.depth; M > 0; M--)
            if (k.node(M).type === u) {
              E = k.before(M);
              break;
            }
          if (E >= 0) {
            const M = r.doc.nodeAt(E);
            if (M) {
              const x = [];
              M.forEach((D, C) => {
                D.type === y && x.push(E + 1 + C);
              });
              for (let D = x.length - 1; D >= 0; D--) {
                const C = x[D], N = r.doc.nodeAt(C);
                N && N.type === y && r.setNodeMarkup(C, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const T = qa(d, g);
        if (T) {
          r.wrap(d, T);
          const { $from: k } = r.selection;
          let E = -1;
          for (let M = k.depth; M > 0; M--)
            if (k.node(M).type === g) {
              E = k.before(M);
              break;
            }
          return E >= 0 && ka(r, E, u, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Sb = fp.extend({
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
}), Nb = dp.extend({
  content: "paragraph block*"
}), Oi = new De("collapsibleList");
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
const Lb = He.create({
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
      new Ne({
        key: Oi,
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
            const o = Oi.getState(r);
            return o?.decorations ? o.decorations : Fr(r.doc, e, t, n);
          }
        }
      })
    ];
  }
}), _i = "http://www.w3.org/2000/svg";
function $t(e, t, n) {
  const r = document.createElementNS(_i, "svg");
  r.setAttribute("width", String(t)), r.setAttribute("height", String(t)), r.setAttribute("viewBox", "0 0 24 24"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-linejoin", "round"), n && r.setAttribute("class", n);
  for (const o of e) {
    const s = document.createElementNS(_i, o.tag);
    for (const [i, a] of Object.entries(o.attrs))
      s.setAttribute(i, a);
    r.appendChild(s);
  }
  return r;
}
const Ab = [
  { tag: "circle", attrs: { cx: "12", cy: "12", r: "10" } },
  { tag: "path", attrs: { d: "M12 16v-4" } },
  { tag: "path", attrs: { d: "M12 8h.01" } }
], Ib = [
  { tag: "path", attrs: { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" } },
  { tag: "path", attrs: { d: "M15 3v4a2 2 0 0 0 2 2h4" } }
], Rb = [
  { tag: "path", attrs: { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" } },
  { tag: "path", attrs: { d: "M13 8H7" } },
  { tag: "path", attrs: { d: "M17 12H7" } }
], Pb = [
  { tag: "path", attrs: { d: "M12 7v14" } },
  { tag: "path", attrs: { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" } }
], Ob = [
  { tag: "rect", attrs: { x: "3", y: "5", width: "6", height: "6", rx: "1" } },
  { tag: "path", attrs: { d: "m3 17 2 2 4-4" } },
  { tag: "path", attrs: { d: "M13 6h8" } },
  { tag: "path", attrs: { d: "M13 12h8" } },
  { tag: "path", attrs: { d: "M13 18h8" } }
], _b = [
  { tag: "rect", attrs: { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" } },
  { tag: "path", attrs: { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" } },
  { tag: "path", attrs: { d: "M12 11h4" } },
  { tag: "path", attrs: { d: "M12 16h4" } },
  { tag: "path", attrs: { d: "M8 11h.01" } },
  { tag: "path", attrs: { d: "M8 16h.01" } }
], ls = [
  { tag: "path", attrs: { d: "m6 9 6 6 6-6" } }
], $b = [
  { tag: "path", attrs: { d: "m9 18 6-6-6-6" } }
], dn = {
  info: { iconElements: Ab, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { iconElements: Ib, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { iconElements: Rb, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { iconElements: Pb, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { iconElements: Ob, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { iconElements: _b, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
}, Hb = Object.keys(dn);
class Bb {
  constructor(t, n, r) {
    this.collapsed = !1, this.showDropdown = !1, this.portalContainer = null, this.dropdownEl = null, this.handleHeaderClick = (i) => {
      this.toggleCollapse();
    }, this.handleButtonClick = (i) => {
      i.stopPropagation(), this.view.editable && this.toggleDropdown();
    }, this.node = t, this.view = n, this.getPos = r;
    const o = t.attrs.type || "info", s = dn[o] || dn.info;
    this.boundHandleClickOutside = this.handleClickOutside.bind(this), this.boundHandleScroll = this.closeDropdown.bind(this), this.dom = document.createElement("div"), this.dom.className = `callout callout-${o}`, this.dom.setAttribute("data-callout", ""), this.dom.setAttribute("data-type", o), this.dom.setAttribute("data-node-view-wrapper", ""), this.headerEl = document.createElement("div"), this.headerEl.className = "callout-header", this.headerEl.style.cursor = "pointer", this.headerEl.style.userSelect = "none", this.headerEl.style.webkitUserSelect = "none", this.headerEl.title = "Click to collapse", this.headerEl.addEventListener("click", this.handleHeaderClick), this.headerButton = document.createElement("button"), this.headerButton.className = "callout-header-button", this.headerButton.title = n.editable ? "Click to change callout type" : s.label, this.headerButton.style.color = s.borderColor, this.headerButton.style.userSelect = "none", this.headerButton.style.webkitUserSelect = "none", this.headerButton.addEventListener("click", this.handleButtonClick), this.headerIconContainer = document.createElement("span"), this.headerIconContainer.style.display = "flex", this.headerIconContainer.appendChild($t(s.iconElements, 18)), this.labelEl = document.createElement("span"), this.labelEl.className = "callout-label", this.labelEl.textContent = s.label, this.typeChevronEl = $t(ls, 12, "callout-type-chevron"), n.editable || (this.typeChevronEl.style.display = "none"), this.headerButton.appendChild(this.headerIconContainer), this.headerButton.appendChild(this.labelEl), this.headerButton.appendChild(this.typeChevronEl), this.collapseIndicator = document.createElement("div"), this.collapseIndicator.className = "callout-collapse-indicator", this.collapseIndicator.style.color = s.borderColor, this.collapseIndicator.appendChild($t(ls, 16)), this.headerEl.appendChild(this.headerButton), this.headerEl.appendChild(this.collapseIndicator), this.contentWrapper = document.createElement("div"), this.contentWrapper.className = "callout-content", this.contentDOM = document.createElement("div"), this.contentWrapper.appendChild(this.contentDOM), this.dom.appendChild(this.headerEl), this.dom.appendChild(this.contentWrapper);
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed, this.collapsed ? (this.dom.classList.add("callout-collapsed"), this.contentWrapper.classList.add("callout-content-hidden"), this.headerEl.title = "Click to expand") : (this.dom.classList.remove("callout-collapsed"), this.contentWrapper.classList.remove("callout-content-hidden"), this.headerEl.title = "Click to collapse"), this.collapseIndicator.innerHTML = "", this.collapseIndicator.appendChild(
      this.collapsed ? $t($b, 16) : $t(ls, 16)
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
    for (const o of Hb) {
      const s = dn[o], i = document.createElement("button");
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
    const n = dn[t] || dn.info;
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
const Wb = yo.create({
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
      En(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return ({ node: e, view: t, getPos: n }) => new Bb(e, t, n);
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
}), zb = vp.extend({
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
        En(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: new De("resizableImageCopy"),
        props: {
          handleDOMEvents: {
            copy(e, t) {
              const { state: n } = e;
              if (!(n.selection instanceof Zf)) return !1;
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
      const i = (B) => {
        const H = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[B] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${H}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (B) => !(!B || B.startsWith("data:") || B.startsWith("blob:") || B.startsWith("http://") || B.startsWith("https://"));
      let l = 0;
      const d = (B) => {
        const H = ++l;
        if (c(B) && e.resolveImageSrc) {
          const R = a.getAttribute("src") || "";
          R.startsWith("data:") || R.startsWith("blob:") || R.startsWith("http://") || R.startsWith("https://") || (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E'), e.resolveImageSrc(B).then((P) => {
            H === l && (P && P !== B && (a.src = P), a.style.opacity = "1", a.offsetHeight);
          }).catch(() => {
            H === l && (a.style.opacity = "1");
          });
        } else
          a.src = B;
      };
      a.addEventListener("error", () => {
        const B = a.getAttribute("src") || "";
        s.style.borderRadius = "8px", s.style.border = `1px solid ${g ? "rgba(255,255,255,0.1)" : "oklch(0.9 0 0)"}`, s.style.background = g ? "rgba(255,255,255,0.03)" : "#f8f8f8", s.style.padding = "12px", s.style.minHeight = "60px", a.style.display = "none";
        const H = document.createElement("div");
        H.style.cssText = `font-size: 12px; color: ${g ? "#999" : "#888"}; word-break: break-all;`, H.textContent = `Image not found: ${B}`, s.insertBefore(H, s.firstChild);
      }), d(t.attrs.src);
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
      const f = document.createElement("button");
      f.classList.add("image-menu-btn"), f.setAttribute("type", "button"), f.setAttribute("title", "Image options"), f.style.cssText = `
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
      `, f.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      `;
      const p = document.createElement("div");
      p.classList.add("image-menu-dropdown");
      const g = document.documentElement.classList.contains("dark") || document.documentElement.getAttribute("data-theme")?.match(/midnight|carbon|ocean|forest|sunset|lavender|rose|slate/);
      p.style.cssText = `
        position: fixed;
        display: none;
        flex-direction: column;
        min-width: 200px;
        padding: 4px;
        background: ${g ? "var(--bg-tertiary, #2c313c)" : "oklch(0.99 0 0)"};
        border: 1px solid ${g ? "var(--border, rgba(255,255,255,0.1))" : "oklch(0.9 0 0)"};
        border-radius: 8px;
        box-shadow: 0 4px 16px oklch(0 0 0 / ${g ? "0.4" : "0.15"});
        z-index: 9999;
        pointer-events: auto;
        color: ${g ? "#dadada" : "inherit"};
      `;
      const m = (B, H, R) => {
        const U = document.createElement("button");
        return U.setAttribute("type", "button"), U.style.cssText = `
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 12px;
          font-size: 13px;
          color: ${g ? "#dadada" : "oklch(0.3 0 0)"};
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        `, U.innerHTML = `${H}<span>${B}</span>`, U.addEventListener("mouseenter", () => {
          U.style.background = g ? "rgba(255,255,255,0.06)" : "oklch(0.95 0 0)";
        }), U.addEventListener("mouseleave", () => {
          U.style.background = "transparent";
        }), U.addEventListener("click", (P) => {
          P.preventDefault(), P.stopPropagation(), R(), p.style.display = "none", O = !1;
        }), U;
      }, y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', w = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      p.appendChild(m("Edit", y, () => {
        const B = typeof r == "function" ? r() : null;
        if (B != null && e.onImageClick) {
          const H = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: B,
            rect: H
          });
        }
      })), p.appendChild(m("Copy image", b, async () => {
        const B = o.attrs.src;
        try {
          const R = await (await fetch(B)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [R.type]: R })
          ]);
        } catch {
          try {
            const H = new window.Image();
            H.crossOrigin = "anonymous", await new Promise((P, X) => {
              H.onload = () => P(), H.onerror = () => X(new Error("Image load failed")), H.src = B;
            });
            const R = document.createElement("canvas");
            R.width = H.naturalWidth, R.height = H.naturalHeight;
            const U = R.getContext("2d");
            if (U) {
              U.drawImage(H, 0, 0);
              const P = await new Promise(
                (X) => R.toBlob(X, "image/png")
              );
              P ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": P })
              ]) : await navigator.clipboard.writeText(B);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(B);
            } catch {
            }
          }
        }
      })), p.appendChild(m("Copy URL", w, async () => {
        const B = o.attrs.src;
        try {
          await navigator.clipboard.writeText(B);
        } catch {
        }
      })), p.appendChild(m("Save image", v, () => {
        const B = o.attrs.src, H = o.attrs.alt || "image", R = document.createElement("a");
        R.href = B, R.download = H, R.target = "_blank", R.rel = "noopener noreferrer", document.body.appendChild(R), R.click(), setTimeout(() => {
          document.body.removeChild(R);
        }, 100);
      }));
      const k = m("Delete image", '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>', () => {
        const B = n.view.state.selection.from;
        n.chain().focus().deleteRange({ from: B, to: B + 1 }).run();
      });
      k.style.color = "#e04674", p.appendChild(k);
      const E = document.createElement("div");
      E.style.cssText = `
        height: 1px;
        background: var(--border, oklch(0.92 0 0));
        margin: 4px 8px;
      `, p.appendChild(E);
      const M = document.createElement("div");
      M.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: ${g ? "#999" : "oklch(0.55 0 0)"};
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, M.textContent = "Alignment", p.appendChild(M);
      const x = document.createElement("div");
      x.style.cssText = `
        display: flex;
        margin: 4px 8px 4px;
        background: oklch(0.94 0 0);
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
      `;
      const D = [
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
      ], C = [], N = (B) => {
        C.forEach((H) => {
          (H.getAttribute("data-align-value") || "left") === B ? (H.style.background = "oklch(1 0 0)", H.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", H.style.color = "oklch(0.25 0 0)", H.style.fontWeight = "600") : (H.style.background = "transparent", H.style.boxShadow = "none", H.style.color = "oklch(0.5 0 0)", H.style.fontWeight = "400");
        });
      };
      D.forEach(({ value: B, label: H, icon: R }) => {
        const U = document.createElement("button");
        U.setAttribute("type", "button"), U.setAttribute("data-align-value", B), U.setAttribute("title", `Align ${H.toLowerCase()}`), U.style.cssText = `
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
        `, U.innerHTML = `${R}<span>${H}</span>`, U.addEventListener("click", (P) => {
          P.preventDefault(), P.stopPropagation();
          const X = typeof r == "function" ? r() : null;
          X != null && n.commands.command(({ tr: ee, dispatch: re }) => {
            const fe = ee.doc.nodeAt(X);
            return !fe || fe.type.name !== "resizableImage" ? !1 : (re && ee.setNodeMarkup(X, void 0, { ...fe.attrs, align: B }), !0);
          }), N(B);
        }), C.push(U), x.appendChild(U);
      }), p.appendChild(x);
      const L = () => {
        const B = o.attrs.align || "left";
        N(B);
      };
      let O = !1;
      f.addEventListener("click", (B) => {
        if (B.preventDefault(), B.stopPropagation(), O)
          p.style.display = "none", O = !1;
        else {
          const H = f.getBoundingClientRect(), R = 200, U = p.closest('[role="dialog"]');
          let P = 0, X = 0;
          if (U) {
            const et = U.getBoundingClientRect();
            P = et.left, X = et.top;
          }
          let ee = H.bottom + 4 - X, re = H.right - R - P;
          const fe = window.innerHeight, pe = window.innerWidth, Re = 200;
          H.bottom + 4 + Re > fe && (ee = H.top - Re - 4 - X), re + P < 8 && (re = 8 - P), re + R + P > pe - 8 && (re = pe - R - 8 - P), p.style.top = `${ee}px`, p.style.left = `${re}px`, p.style.display = "flex", O = !0, L();
        }
      });
      const _ = (B) => {
        !p.contains(B.target) && !f.contains(B.target) && (p.style.display = "none", O = !1);
      };
      document.addEventListener("click", _);
      const $ = document.createElement("button");
      $.setAttribute("type", "button"), $.setAttribute("title", "View full size"), $.style.cssText = `
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
      `, $.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      `, $.addEventListener("mouseenter", () => {
        $.style.background = "oklch(0.95 0 0)";
      }), $.addEventListener("mouseleave", () => {
        $.style.background = "oklch(0.98 0 0 / 0.95)";
      }), s.appendChild(a), s.appendChild($), s.appendChild(u), s.appendChild(f);
      const z = s.closest('[role="dialog"]');
      z ? z.appendChild(p) : document.body.appendChild(p), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", f.style.opacity = "1", $.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", $.style.opacity = "0", O || (f.style.opacity = "0");
      }), f.addEventListener("mouseenter", () => {
        f.style.background = "oklch(0.95 0 0)";
      }), f.addEventListener("mouseleave", () => {
        f.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const V = (B) => {
        B.preventDefault(), B.stopPropagation();
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
        const R = document.createElement("img");
        R.src = a.src, R.alt = a.alt || "", R.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const U = document.createElement("button");
        U.setAttribute("type", "button"), U.setAttribute("aria-label", "Close"), U.style.cssText = `
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
        `, U.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', U.addEventListener("mouseenter", () => {
          U.style.background = "rgba(255, 255, 255, 0.25)";
        }), U.addEventListener("mouseleave", () => {
          U.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const P = o.attrs.alt;
        let X = null;
        P && P.trim() && (X = document.createElement("div"), X.style.cssText = `
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
          `, X.textContent = P);
        const ee = () => {
          H.style.opacity = "0", R.style.transform = "scale(0.92)", setTimeout(() => H.remove(), 200);
        };
        H.addEventListener("click", (pe) => {
          pe.target === H && ee();
        }), U.addEventListener("click", ee);
        const re = (pe) => {
          pe.key === "Escape" && (ee(), document.removeEventListener("keydown", re));
        };
        document.addEventListener("keydown", re), H.appendChild(R), H.appendChild(U), X && H.appendChild(X);
        const fe = s.closest('[role="dialog"]');
        fe ? fe.appendChild(H) : document.body.appendChild(H), requestAnimationFrame(() => {
          H.style.opacity = "1", R.style.transform = "scale(1)";
        });
      };
      $.addEventListener("click", V);
      let I, W;
      const q = (B) => {
        B.preventDefault(), I = B.clientX, W = a.offsetWidth, document.addEventListener("mousemove", J), document.addEventListener("mouseup", te);
      }, J = (B) => {
        const H = B.clientX - I, R = Math.max(100, W + H);
        a.style.width = `${R}px`;
      }, te = () => {
        document.removeEventListener("mousemove", J), document.removeEventListener("mouseup", te), setTimeout(() => {
        }, 100);
        const B = typeof r == "function" ? r() : null, H = a.offsetWidth;
        B != null && H > 0 && n.commands.command(({ tr: R, dispatch: U }) => {
          const P = R.doc.nodeAt(B);
          return !P || P.type.name !== "resizableImage" || P.attrs.width === H ? !1 : (U && R.setNodeMarkup(B, void 0, { ...P.attrs, width: H }), !0);
        });
      };
      return u.addEventListener("mousedown", q), {
        dom: s,
        update: (B) => B.type.name !== "resizableImage" ? !1 : (o = B, d(B.attrs.src), a.alt = B.attrs.alt || "", B.attrs.width && (a.style.width = `${B.attrs.width}px`), i(B.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", q), $.removeEventListener("click", V), document.removeEventListener("click", _), p.remove();
        }
      };
    };
  }
});
function Fb(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Ub = {}, jn = {};
function zt(e, t) {
  try {
    const r = (Ub[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in jn ? jn[r] : $i(r, r.split(":"));
  } catch {
    if (e in jn) return jn[e];
    const n = e?.match(jb);
    return n ? $i(e, n.slice(1)) : NaN;
  }
}
const jb = /([+-]\d\d):?(\d\d)?/;
function $i(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return jn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class st extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(zt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), _d(this), Os(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new st(...n, t) : new st(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new st(+this, t);
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
    return new st(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Hi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Hi.test(e)) return;
  const t = e.replace(Hi, "$1UTC");
  st.prototype[t] && (e.startsWith("get") ? st.prototype[e] = function() {
    return this.internal[t]();
  } : (st.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Yb(this), +this;
  }, st.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Os(this), +this;
  }));
});
function Os(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-zt(e.timeZone, e) * 60));
}
function Yb(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), _d(e);
}
function _d(e) {
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
    const v = zt(e.timeZone, e), w = v > 0 ? Math.floor(v) : Math.ceil(v), T = p - w;
    T && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + T), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + T));
  }
}
class Ae extends st {
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
    return `${t} GMT${n}${r}${o} (${Fb(this.timeZone, this)})`;
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
const $d = 6048e5, Vb = 864e5, Bi = Symbol.for("constructDateFrom");
function Ce(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Bi in e ? e[Bi](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ge(e, t) {
  return Ce(t || e, e);
}
function Hd(e, t, n) {
  const r = ge(e, n?.in);
  return isNaN(t) ? Ce(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Bd(e, t, n) {
  const r = ge(e, n?.in);
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
let Kb = {};
function cr() {
  return Kb;
}
function kn(e, t) {
  const n = cr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ge(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function tr(e, t) {
  return kn(e, { ...t, weekStartsOn: 1 });
}
function Wd(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = Ce(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = tr(o), i = Ce(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = tr(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function Wi(e) {
  const t = ge(e), n = new Date(
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
function Ln(e, ...t) {
  const n = Ce.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function nr(e, t) {
  const n = ge(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function zd(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  ), s = nr(r), i = nr(o), a = +s - Wi(s), c = +i - Wi(i);
  return Math.round((a - c) / Vb);
}
function Gb(e, t) {
  const n = Wd(e, t), r = Ce(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), tr(r);
}
function qb(e, t, n) {
  return Hd(e, t * 7, n);
}
function Xb(e, t, n) {
  return Bd(e, t * 12, n);
}
function Zb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ce.bind(null, o));
    const s = ge(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Ce(r, n || NaN);
}
function Qb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ce.bind(null, o));
    const s = ge(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Ce(r, n || NaN);
}
function Jb(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  );
  return +nr(r) == +nr(o);
}
function Fd(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ew(e) {
  return !(!Fd(e) && typeof e != "number" || isNaN(+ge(e)));
}
function tw(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function nw(e, t) {
  const n = ge(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Ud(e, t) {
  const [n, r] = Ln(e, t.start, t.end);
  return { start: n, end: r };
}
function rw(e, t) {
  const { start: n, end: r } = Ud(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Ce(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function ow(e, t) {
  const n = ge(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function sw(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function jd(e, t) {
  const n = ge(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function aw(e, t) {
  const { start: n, end: r } = Ud(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Ce(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function Yd(e, t) {
  const n = cr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ge(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function iw(e, t) {
  return Yd(e, { ...t, weekStartsOn: 1 });
}
const cw = {
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
}, lw = (e, t, n) => {
  let r;
  const o = cw[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ds(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const dw = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, uw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, fw = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, pw = {
  date: ds({
    formats: dw,
    defaultWidth: "full"
  }),
  time: ds({
    formats: uw,
    defaultWidth: "full"
  }),
  dateTime: ds({
    formats: fw,
    defaultWidth: "full"
  })
}, hw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, mw = (e, t, n, r) => hw[e];
function Bn(e) {
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
const gw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, yw = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, vw = {
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
}, bw = {
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
}, ww = {
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
}, kw = {
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
}, Cw = {
  ordinalNumber: xw,
  era: Bn({
    values: gw,
    defaultWidth: "wide"
  }),
  quarter: Bn({
    values: yw,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Bn({
    values: vw,
    defaultWidth: "wide"
  }),
  day: Bn({
    values: bw,
    defaultWidth: "wide"
  }),
  dayPeriod: Bn({
    values: ww,
    defaultWidth: "wide",
    formattingValues: kw,
    defaultFormattingWidth: "wide"
  })
};
function Wn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? Mw(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Ew(a, (u) => u.test(i))
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
function Ew(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Mw(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Tw(e) {
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
const Sw = /^(\d+)(th|st|nd|rd)?/i, Nw = /\d+/i, Dw = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Lw = {
  any: [/^b/i, /^(a|c)/i]
}, Aw = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Iw = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Rw = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Pw = {
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
}, Ow = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, _w = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, $w = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Hw = {
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
}, Bw = {
  ordinalNumber: Tw({
    matchPattern: Sw,
    parsePattern: Nw,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Wn({
    matchPatterns: Dw,
    defaultMatchWidth: "wide",
    parsePatterns: Lw,
    defaultParseWidth: "any"
  }),
  quarter: Wn({
    matchPatterns: Aw,
    defaultMatchWidth: "wide",
    parsePatterns: Iw,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Wn({
    matchPatterns: Rw,
    defaultMatchWidth: "wide",
    parsePatterns: Pw,
    defaultParseWidth: "any"
  }),
  day: Wn({
    matchPatterns: Ow,
    defaultMatchWidth: "wide",
    parsePatterns: _w,
    defaultParseWidth: "any"
  }),
  dayPeriod: Wn({
    matchPatterns: $w,
    defaultMatchWidth: "any",
    parsePatterns: Hw,
    defaultParseWidth: "any"
  })
}, xa = {
  code: "en-US",
  formatDistance: lw,
  formatLong: pw,
  formatRelative: mw,
  localize: Cw,
  match: Bw,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ww(e, t) {
  const n = ge(e, t?.in);
  return zd(n, jd(n)) + 1;
}
function Vd(e, t) {
  const n = ge(e, t?.in), r = +tr(n) - +Gb(n);
  return Math.round(r / $d) + 1;
}
function Kd(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = cr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Ce(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = kn(i, t), c = Ce(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = kn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function zw(e, t) {
  const n = cr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Kd(e, t), s = Ce(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), kn(s, t);
}
function Gd(e, t) {
  const n = ge(e, t?.in), r = +kn(n, t) - +zw(n, t);
  return Math.round(r / $d) + 1;
}
function he(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Mt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return he(t === "yy" ? r % 100 : r, t.length);
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
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return he(o, t.length);
  }
}, cn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, zi = {
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
    return Mt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Kd(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return he(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : he(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Wd(e);
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
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(r);
      // 01, 02, 03, 04
      case "QQ":
        return he(r, 2);
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
        return he(r, 2);
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
        return Mt.M(e, t);
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
        return he(r + 1, 2);
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
    const o = Gd(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : he(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Vd(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : he(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Mt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Ww(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : he(r, t.length);
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
        return he(s, 2);
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
        return he(s, t.length);
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
        return he(o, t.length);
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
    return Mt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Mt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : he(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : he(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Mt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Mt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Mt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Ui(r);
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
        return Ui(r);
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
        return "GMT" + Fi(r, ":");
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
        return "GMT" + Fi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Ht(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return he(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return he(+e, t.length);
  }
};
function Fi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + he(s, 2);
}
function Ui(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + he(Math.abs(e) / 60, 2) : Ht(e, t);
}
function Ht(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = he(Math.trunc(r / 60), 2), s = he(r % 60, 2);
  return n + o + t + s;
}
const ji = (e, t) => {
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
}, qd = (e, t) => {
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
}, Fw = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return ji(e, t);
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
  return s.replace("{{date}}", ji(r, t)).replace("{{time}}", qd(o, t));
}, Uw = {
  p: qd,
  P: Fw
}, jw = /^D+$/, Yw = /^Y+$/, Vw = ["D", "DD", "YY", "YYYY"];
function Kw(e) {
  return jw.test(e);
}
function Gw(e) {
  return Yw.test(e);
}
function qw(e, t, n) {
  const r = Xw(e, t, n);
  if (console.warn(r), Vw.includes(e)) throw new RangeError(r);
}
function Xw(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Zw = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Qw = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Jw = /^'([^]*?)'?$/, e0 = /''/g, t0 = /[a-zA-Z]/;
function n0(e, t, n) {
  const r = cr(), o = n?.locale ?? r.locale ?? xa, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = ge(e, n?.in);
  if (!ew(a))
    throw new RangeError("Invalid time value");
  let c = t.match(Qw).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const f = Uw[u];
      return f(d, o.formatLong);
    }
    return d;
  }).join("").match(Zw).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: r0(d) };
    if (zi[u])
      return { isToken: !0, value: d };
    if (u.match(t0))
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
    (!n?.useAdditionalWeekYearTokens && Gw(u) || !n?.useAdditionalDayOfYearTokens && Kw(u)) && qw(u, t, String(e));
    const f = zi[u[0]];
    return f(a, u, o.localize, l);
  }).join("");
}
function r0(e) {
  const t = e.match(Jw);
  return t ? t[1].replace(e0, "'") : e;
}
function o0(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Ce(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function s0(e, t) {
  return ge(e, t?.in).getMonth();
}
function a0(e, t) {
  return ge(e, t?.in).getFullYear();
}
function i0(e, t) {
  return +ge(e) > +ge(t);
}
function c0(e, t) {
  return +ge(e) < +ge(t);
}
function l0(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function d0(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function u0(e, t, n) {
  const r = ge(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Ce(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = o0(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function f0(e, t, n) {
  const r = ge(e, n?.in);
  return isNaN(+r) ? Ce(e, NaN) : (r.setFullYear(t), r);
}
const Yi = 5, p0 = 4;
function h0(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Yi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Yi : p0;
}
function Xd(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function m0(e, t) {
  const n = Xd(e, t), r = h0(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Ue {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ae.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Ae(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Hd(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Bd(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : qb(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : Xb(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : zd(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : tw(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : rw(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : aw(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : m0(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : iw(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : nw(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Yd(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : sw(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : n0(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Vd(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : s0(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : a0(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Gd(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : i0(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : c0(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Fd(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Jb(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : l0(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : d0(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Zb(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Qb(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : u0(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : f0(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Xd(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : nr(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : tr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : ow(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : kn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : jd(r), this.options = { locale: xa, ...t }, this.overrides = n;
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
    return t && Ue.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Ue.yearFirstLocales.has(s))
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
Ue.yearFirstLocales = /* @__PURE__ */ new Set([
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
const lt = new Ue();
class Zd {
  constructor(t, n, r = lt) {
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
class g0 {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class y0 {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function v0(e) {
  return G.createElement("button", { ...e });
}
function b0(e) {
  return G.createElement("span", { ...e });
}
function w0(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    G.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && G.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && G.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && G.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && G.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function k0(e) {
  const { day: t, modifiers: n, ...r } = e;
  return G.createElement("td", { ...r });
}
function x0(e) {
  const { day: t, modifiers: n, ...r } = e, o = G.useRef(null);
  return G.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), G.createElement("button", { ref: o, ...r });
}
var ne;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(ne || (ne = {}));
var ve;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ve || (ve = {}));
var Xe;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Xe || (Xe = {}));
var We;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(We || (We = {}));
function C0(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[ne.Dropdown], n].join(" "), a = t?.find(({ value: c }) => c === s.value);
  return G.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[ne.DropdownRoot] },
    G.createElement(r.Select, { className: i, ...s }, t?.map(({ value: c, label: l, disabled: d }) => G.createElement(r.Option, { key: c, value: c, disabled: d }, l))),
    G.createElement(
      "span",
      { className: o[ne.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      G.createElement(r.Chevron, { orientation: "down", size: 18, className: o[ne.Chevron] })
    )
  );
}
function E0(e) {
  return G.createElement("div", { ...e });
}
function M0(e) {
  return G.createElement("div", { ...e });
}
function T0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return G.createElement("div", { ...r }, e.children);
}
function S0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return G.createElement("div", { ...r });
}
function N0(e) {
  return G.createElement("table", { ...e });
}
function D0(e) {
  return G.createElement("div", { ...e });
}
const Qd = yc(void 0);
function lr() {
  const e = vc(Qd);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function L0(e) {
  const { components: t } = lr();
  return G.createElement(t.Dropdown, { ...e });
}
function A0(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = lr(), d = F((f) => {
    o && n?.(f);
  }, [o, n]), u = F((f) => {
    r && t?.(f);
  }, [r, t]);
  return G.createElement(
    "nav",
    { ...s },
    G.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[ne.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      G.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[ne.Chevron], orientation: "left" })
    ),
    G.createElement(
      i.NextMonthButton,
      { type: "button", className: a[ne.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      G.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[ne.Chevron] })
    )
  );
}
function I0(e) {
  const { components: t } = lr();
  return G.createElement(t.Button, { ...e });
}
function R0(e) {
  return G.createElement("option", { ...e });
}
function P0(e) {
  const { components: t } = lr();
  return G.createElement(t.Button, { ...e });
}
function O0(e) {
  const { rootRef: t, ...n } = e;
  return G.createElement("div", { ...n, ref: t });
}
function _0(e) {
  return G.createElement("select", { ...e });
}
function $0(e) {
  const { week: t, ...n } = e;
  return G.createElement("tr", { ...n });
}
function H0(e) {
  return G.createElement("th", { ...e });
}
function B0(e) {
  return G.createElement(
    "thead",
    { "aria-hidden": !0 },
    G.createElement("tr", { ...e })
  );
}
function W0(e) {
  const { week: t, ...n } = e;
  return G.createElement("th", { ...n });
}
function z0(e) {
  return G.createElement("th", { ...e });
}
function F0(e) {
  return G.createElement("tbody", { ...e });
}
function U0(e) {
  const { components: t } = lr();
  return G.createElement(t.Dropdown, { ...e });
}
const j0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: v0,
  CaptionLabel: b0,
  Chevron: w0,
  Day: k0,
  DayButton: x0,
  Dropdown: C0,
  DropdownNav: E0,
  Footer: M0,
  Month: T0,
  MonthCaption: S0,
  MonthGrid: N0,
  Months: D0,
  MonthsDropdown: L0,
  Nav: A0,
  NextMonthButton: I0,
  Option: R0,
  PreviousMonthButton: P0,
  Root: O0,
  Select: _0,
  Week: $0,
  WeekNumber: W0,
  WeekNumberHeader: z0,
  Weekday: H0,
  Weekdays: B0,
  Weeks: F0,
  YearsDropdown: U0
}, Symbol.toStringTag, { value: "Module" }));
function pt(e, t, n = !1, r = lt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function Jd(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ca(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function eu(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function tu(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function nu(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ru(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function ht(e, t, n = lt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (ru(a, n))
      return a.includes(e);
    if (Ca(a))
      return pt(a, e, !1, n);
    if (nu(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (Jd(a)) {
      const c = s(a.before, e), l = s(a.after, e), d = c > 0, u = l < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return eu(a) ? s(e, a.after) > 0 : tu(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function Y0(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: d } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: g, endOfMonth: m, isAfter: y } = o, b = n && p(n), v = r && m(r), w = {
    [ve.focused]: [],
    [ve.outside]: [],
    [ve.disabled]: [],
    [ve.hidden]: [],
    [ve.today]: []
  }, T = {};
  for (const k of e) {
    const { date: E, displayMonth: M } = k, x = !!(M && !f(E, M)), D = !!(b && g(E, b)), C = !!(v && y(E, v)), N = !!(s && ht(E, s, o)), L = !!(i && ht(E, i, o)) || D || C || // Broadcast calendar will show outside days as default
    !l && !c && x || l && c === !1 && x, O = u(E, d ?? o.today());
    x && w.outside.push(k), N && w.disabled.push(k), L && w.hidden.push(k), O && w.today.push(k), a && Object.keys(a).forEach((_) => {
      const $ = a?.[_];
      $ && ht(E, $, o) && (T[_] ? T[_].push(k) : T[_] = [k]);
    });
  }
  return (k) => {
    const E = {
      [ve.focused]: !1,
      [ve.disabled]: !1,
      [ve.hidden]: !1,
      [ve.outside]: !1,
      [ve.today]: !1
    }, M = {};
    for (const x in w) {
      const D = w[x];
      E[x] = D.some((C) => C === k);
    }
    for (const x in T)
      M[x] = T[x].some((D) => D === k);
    return {
      ...E,
      // custom modifiers should override all the previous ones
      ...M
    };
  };
}
function V0(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ve[s]] ? o.push(t[ve[s]]) : t[Xe[s]] && o.push(t[Xe[s]]), o), [t[ne.Day]]);
}
function K0(e) {
  return {
    ...j0,
    ...e
  };
}
function G0(e) {
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
  for (const t in ne)
    e[ne[t]] = `rdp-${ne[t]}`;
  for (const t in ve)
    e[ve[t]] = `rdp-${ve[t]}`;
  for (const t in Xe)
    e[Xe[t]] = `rdp-${Xe[t]}`;
  for (const t in We)
    e[We[t]] = `rdp-${We[t]}`;
  return e;
}
function ou(e, t, n) {
  return (n ?? new Ue(t)).formatMonthYear(e);
}
const q0 = ou;
function X0(e, t, n) {
  return (n ?? new Ue(t)).format(e, "d");
}
function Z0(e, t = lt) {
  return t.format(e, "LLLL");
}
function Q0(e, t, n) {
  return (n ?? new Ue(t)).format(e, "cccccc");
}
function J0(e, t = lt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function ek() {
  return "";
}
function su(e, t = lt) {
  return t.format(e, "yyyy");
}
const tk = su, nk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: ou,
  formatDay: X0,
  formatMonthCaption: q0,
  formatMonthDropdown: Z0,
  formatWeekNumber: J0,
  formatWeekNumberHeader: ek,
  formatWeekdayName: Q0,
  formatYearCaption: tk,
  formatYearDropdown: su
}, Symbol.toStringTag, { value: "Module" }));
function rk(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...nk,
    ...e
  };
}
function ok(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), g = l(f), m = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: p, disabled: m };
  });
}
function sk(e, t = {}, n = {}) {
  let r = { ...t?.[ne.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function ak(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function ik(e, t, n, r, o = !1) {
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
function au(e, t, n, r) {
  let o = (r ?? new Ue(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const ck = au;
function iu(e, t, n) {
  return (n ?? new Ue(t)).formatMonthYear(e);
}
const lk = iu;
function dk(e, t, n, r) {
  let o = (r ?? new Ue(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function uk(e) {
  return "Choose the Month";
}
function fk() {
  return "";
}
function pk(e) {
  return "Go to the Next Month";
}
function hk(e) {
  return "Go to the Previous Month";
}
function mk(e, t, n) {
  return (n ?? new Ue(t)).format(e, "cccc");
}
function gk(e, t) {
  return `Week ${e}`;
}
function yk(e) {
  return "Week Number";
}
function vk(e) {
  return "Choose the Year";
}
const bk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: lk,
  labelDay: ck,
  labelDayButton: au,
  labelGrid: iu,
  labelGridcell: dk,
  labelMonthDropdown: uk,
  labelNav: fk,
  labelNext: pk,
  labelPrevious: hk,
  labelWeekNumber: gk,
  labelWeekNumberHeader: yk,
  labelWeekday: mk,
  labelYearDropdown: vk
}, Symbol.toStringTag, { value: "Module" })), dr = (e) => e instanceof HTMLElement ? e : null, us = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], wk = (e) => dr(e.querySelector("[data-animated-month]")), fs = (e) => dr(e.querySelector("[data-animated-caption]")), ps = (e) => dr(e.querySelector("[data-animated-weeks]")), kk = (e) => dr(e.querySelector("[data-animated-nav]")), xk = (e) => dr(e.querySelector("[data-animated-weekdays]"));
function Ck(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = j(null), a = j(r), c = j(!1);
  ho(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const d = s.isSameMonth(r[0].date, l[0].date), u = s.isAfter(r[0].date, l[0].date), f = u ? n[We.caption_after_enter] : n[We.caption_before_enter], p = u ? n[We.weeks_after_enter] : n[We.weeks_before_enter], g = i.current, m = e.current.cloneNode(!0);
    if (m instanceof HTMLElement ? (us(m).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const T = wk(w);
      T && w.contains(T) && w.removeChild(T);
      const k = fs(w);
      k && k.classList.remove(f);
      const E = ps(w);
      E && E.classList.remove(p);
    }), i.current = m) : i.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = g instanceof HTMLElement ? us(g) : [], b = us(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && y && y.every((v) => v instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const v = kk(e.current);
      v && (v.style.zIndex = "1"), b.forEach((w, T) => {
        const k = y[T];
        if (!k)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const E = fs(w);
        E && E.classList.add(f);
        const M = ps(w);
        M && M.classList.add(p);
        const x = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), E && E.classList.remove(f), M && M.classList.remove(p), w.style.position = "", w.style.overflow = "", w.contains(k) && w.removeChild(k);
        };
        k.style.pointerEvents = "none", k.style.position = "absolute", k.style.overflow = "hidden", k.setAttribute("aria-hidden", "true");
        const D = xk(k);
        D && (D.style.opacity = "0");
        const C = fs(k);
        C && (C.classList.add(u ? n[We.caption_before_exit] : n[We.caption_after_exit]), C.addEventListener("animationend", x));
        const N = ps(k);
        N && N.classList.add(u ? n[We.weeks_before_exit] : n[We.weeks_after_exit]), w.insertBefore(k, w.firstChild);
      });
    }
  });
}
function Ek(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: g, endOfWeek: m, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: w } = r, T = c ? b(o, r) : i ? v(o) : w(o), k = c ? f(s) : i ? p(g(s)) : m(g(s)), E = d(k, T), M = u(s, o) + 1, x = [];
  for (let N = 0; N <= E; N++) {
    const L = l(T, N);
    if (t && y(L, t))
      break;
    x.push(L);
  }
  const C = (c ? 35 : 42) * M;
  if (a && x.length < C) {
    const N = C - x.length;
    for (let L = 0; L < N; L++) {
      const O = l(x[x.length - 1], 1);
      x.push(O);
    }
  }
  return x;
}
function Mk(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Tk(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function Vi(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: d, startOfMonth: u } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = d(n, f);
  }
  return t && l(c, t) < 0 && (c = t), u(c);
}
function Sk(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, g = e.reduce((m, y) => {
    const b = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? f(y) : p(y), v = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), w = t.filter((M) => M >= b && M <= v), T = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < T) {
      const M = t.filter((x) => {
        const D = T - w.length;
        return x > v && x <= o(v, D);
      });
      w.push(...M);
    }
    const k = w.reduce((M, x) => {
      const D = n.ISOWeek ? l(x) : d(x), C = M.find((L) => L.weekNumber === D), N = new Zd(x, y, r);
      return C ? C.days.push(N) : M.push(new y0(D, [N])), M;
    }, []), E = new g0(y, k);
    return m.push(E), m;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function Nk(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: d, today: u } = t, { fromYear: f, toYear: p, fromMonth: g, toMonth: m } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !r && m && (r = m), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = d(f, 0, 1) : !n && y && (n = o(c(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = l(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function Dk(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, d = i(e);
  if (!t)
    return a(d, l);
  if (!(c(t, e) < s))
    return a(d, l);
}
function Lk(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -l);
  if (!(c(d, t) <= 0))
    return a(d, -l);
}
function Ak(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Lo(e, t) {
  const [n, r] = Y(e);
  return [t === void 0 ? n : t, r];
}
function Ik(e, t) {
  const [n, r] = Nk(e, t), { startOfMonth: o, endOfMonth: s } = t, i = Vi(e, n, r, t), [a, c] = Lo(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  K(() => {
    const E = Vi(e, n, r, t);
    c(E);
  }, [e.timeZone]);
  const l = Tk(a, r, e, t), d = Ek(l, e.endMonth ? s(e.endMonth) : void 0, e, t), u = Sk(l, d, e, t), f = Ak(u), p = Mk(u), g = Lk(a, n, e, t), m = Dk(a, r, e, t), { disableNavigation: y, onMonthChange: b } = e, v = (E) => f.some((M) => M.days.some((x) => x.isEqualTo(E))), w = (E) => {
    if (y)
      return;
    let M = o(E);
    n && M < o(n) && (M = o(n)), r && M > o(r) && (M = o(r)), c(M), b?.(M);
  };
  return {
    months: u,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: g,
    nextMonth: m,
    goToMonth: w,
    goToDay: (E) => {
      v(E) || w(E.date);
    }
  };
}
var nt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(nt || (nt = {}));
function Ki(e) {
  return !e[ve.disabled] && !e[ve.hidden] && !e[ve.outside];
}
function Rk(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    Ki(a) && (a[ve.focused] && s < nt.FocusedModifier ? (o = i, s = nt.FocusedModifier) : r?.isEqualTo(i) && s < nt.LastFocused ? (o = i, s = nt.LastFocused) : n(i.date) && s < nt.Selected ? (o = i, s = nt.Selected) : a[ve.today] && s < nt.Today && (o = i, s = nt.Today));
  }
  return o || (o = e.find((i) => Ki(t(i)))), o;
}
function Pk(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: d, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: g, endOfWeek: m, max: y, min: b, startOfBroadcastWeek: v, startOfISOWeek: w, startOfWeek: T } = i;
  let E = {
    day: l,
    week: u,
    month: d,
    year: f,
    startOfWeek: (M) => c ? v(M, i) : a ? w(M) : T(M),
    endOfWeek: (M) => c ? p(M) : a ? g(M) : m(M)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? E = y([r, E]) : t === "after" && o && (E = b([o, E])), E;
}
function cu(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = Pk(e, t, n.date, r, o, s, i), l = !!(s.disabled && ht(c, s.disabled, i)), d = !!(s.hidden && ht(c, s.hidden, i)), u = c, f = new Zd(c, u, i);
  return !l && !d ? f : cu(e, t, f, r, o, s, i, a + 1);
}
function Ok(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = Y(), c = Rk(t.days, n, r || (() => !1), i), [l, d] = Y(s ? c : void 0);
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
      const b = cu(m, y, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(b)) || (t.goToDay(b), d(b)));
    }
  };
}
function _k(e, t) {
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
function $k(e, t, n = 0, r = 0, o = !1, s = lt) {
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
function Hk(e, t, n = lt) {
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
function Gi(e, t, n = lt) {
  return pt(e, t.from, !1, n) || pt(e, t.to, !1, n) || pt(t, e.from, !1, n) || pt(t, e.to, !1, n);
}
function Bk(e, t, n = lt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? pt(e, a, !1, n) : ru(a, n) ? a.some((c) => pt(e, c, !1, n)) : Ca(a) ? a.from && a.to ? Gi(e, { from: a.from, to: a.to }, n) : !1 : nu(a) ? Hk(e, a.dayOfWeek, n) : Jd(a) ? n.isAfter(a.before, a.after) ? Gi(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : ht(e.from, a, n) || ht(e.to, a, n) : eu(a) || tu(a) ? ht(e.from, a, n) || ht(e.to, a, n) : !1))
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
function Wk(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = Lo(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, g) => {
      const { min: m, max: y } = e, b = f ? $k(f, l, m, y, s, t) : void 0;
      return r && n && b?.from && b.to && Bk({ from: b.from, to: b.to }, n, t) && (b.from = f, b.to = void 0), i || c(b), i?.(b, f, p, g), b;
    },
    isSelected: (f) => l && pt(l, f, !1, t)
  };
}
function zk(e, t) {
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
function Fk(e, t) {
  const n = zk(e, t), r = _k(e, t), o = Wk(e, t);
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
function Uk(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ae(t.today, t.timeZone)), t.month && (t.month = new Ae(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ae(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ae(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ae(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ae(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((le) => new Ae(le, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ae(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ae(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Nt(() => {
    const le = { ...xa, ...t.locale };
    return {
      dateLib: new Ue({
        locale: le,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: K0(t.components),
      formatters: rk(t.formatters),
      labels: { ...bk, ...t.labels },
      locale: le,
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
  ]), { captionLayout: c, mode: l, navLayout: d, numberOfMonths: u = 1, onDayBlur: f, onDayClick: p, onDayFocus: g, onDayKeyDown: m, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: v, onPrevClick: w, showWeekNumber: T, styles: k } = t, { formatCaption: E, formatDay: M, formatMonthDropdown: x, formatWeekNumber: D, formatWeekNumberHeader: C, formatWeekdayName: N, formatYearDropdown: L } = r, O = Ik(t, s), { days: _, months: $, navStart: z, navEnd: V, previousMonth: I, nextMonth: W, goToMonth: q } = O, J = Y0(_, t, z, V, s), { isSelected: te, select: B, selected: H } = Fk(t, s) ?? {}, { blur: R, focused: U, isFocusTarget: P, moveFocus: X, setFocused: ee } = Ok(t, O, J, te ?? (() => !1), s), { labelDayButton: re, labelGridcell: fe, labelGrid: pe, labelMonthDropdown: Re, labelNav: et, labelPrevious: qt, labelNext: Xt, labelWeekday: An, labelWeekNumber: ur, labelWeekNumberHeader: fr, labelYearDropdown: pr } = o, hr = Nt(() => ak(s, t.ISOWeek), [s, t.ISOWeek]), In = l !== void 0 || p !== void 0, Zt = F(() => {
    I && (q(I), w?.(I));
  }, [I, q, w]), Qt = F(() => {
    W && (q(W), v?.(W));
  }, [q, W, v]), mr = F((le, ye) => (oe) => {
    oe.preventDefault(), oe.stopPropagation(), ee(le), B?.(le.date, ye, oe), p?.(le.date, ye, oe);
  }, [B, p, ee]), Jt = F((le, ye) => (oe) => {
    ee(le), g?.(le.date, ye, oe);
  }, [g, ee]), gr = F((le, ye) => (oe) => {
    R(), f?.(le.date, ye, oe);
  }, [R, f]), yr = F((le, ye) => (oe) => {
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
      const [ke, ue] = me[oe.key];
      X(ke, ue);
    }
    m?.(le.date, ye, oe);
  }, [X, m, t.dir]), vr = F((le, ye) => (oe) => {
    y?.(le.date, ye, oe);
  }, [y]), br = F((le, ye) => (oe) => {
    b?.(le.date, ye, oe);
  }, [b]), Io = F((le) => (ye) => {
    const oe = Number(ye.target.value), me = s.setMonth(s.startOfMonth(le), oe);
    q(me);
  }, [s, q]), Ro = F((le) => (ye) => {
    const oe = Number(ye.target.value), me = s.setYear(s.startOfMonth(le), oe);
    q(me);
  }, [s, q]), { className: Po, style: Oo } = Nt(() => ({
    className: [a[ne.Root], t.className].filter(Boolean).join(" "),
    style: { ...k?.[ne.Root], ...t.style }
  }), [a, t.className, t.style, k]), _o = G0(t), Rn = j(null);
  Ck(Rn, !!t.animate, {
    classNames: a,
    months: $,
    focused: U,
    dateLib: s
  });
  const $o = {
    dayPickerProps: t,
    selected: H,
    select: B,
    isSelected: te,
    months: $,
    nextMonth: W,
    previousMonth: I,
    goToMonth: q,
    getModifiers: J,
    components: n,
    classNames: a,
    styles: k,
    labels: o,
    formatters: r
  };
  return G.createElement(
    Qd.Provider,
    { value: $o },
    G.createElement(
      n.Root,
      { rootRef: t.animate ? Rn : void 0, className: Po, style: Oo, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ..._o },
      G.createElement(
        n.Months,
        { className: a[ne.Months], style: k?.[ne.Months] },
        !t.hideNavigation && !d && G.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[ne.Nav], style: k?.[ne.Nav], "aria-label": et(), onPreviousClick: Zt, onNextClick: Qt, previousMonth: I, nextMonth: W }),
        $.map((le, ye) => G.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[ne.Month],
            style: k?.[ne.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ye,
            displayIndex: ye,
            calendarMonth: le
          },
          d === "around" && !t.hideNavigation && ye === 0 && G.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[ne.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": qt(I), onClick: Zt, "data-animated-button": t.animate ? "true" : void 0 },
            G.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: a[ne.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          G.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[ne.MonthCaption], style: k?.[ne.MonthCaption], calendarMonth: le, displayIndex: ye }, c?.startsWith("dropdown") ? G.createElement(
            n.DropdownNav,
            { className: a[ne.Dropdowns], style: k?.[ne.Dropdowns] },
            (() => {
              const oe = c === "dropdown" || c === "dropdown-months" ? G.createElement(n.MonthsDropdown, { key: "month", className: a[ne.MonthsDropdown], "aria-label": Re(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Io(le.date), options: ok(le.date, z, V, r, s), style: k?.[ne.Dropdown], value: s.getMonth(le.date) }) : G.createElement("span", { key: "month" }, x(le.date, s)), me = c === "dropdown" || c === "dropdown-years" ? G.createElement(n.YearsDropdown, { key: "year", className: a[ne.YearsDropdown], "aria-label": pr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Ro(le.date), options: ik(z, V, r, s, !!t.reverseYears), style: k?.[ne.Dropdown], value: s.getYear(le.date) }) : G.createElement("span", { key: "year" }, L(le.date, s));
              return s.getMonthYearOrder() === "year-first" ? [me, oe] : [oe, me];
            })(),
            G.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, E(le.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            G.createElement(n.CaptionLabel, { className: a[ne.CaptionLabel], role: "status", "aria-live": "polite" }, E(le.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && ye === u - 1 && G.createElement(
            n.NextMonthButton,
            { type: "button", className: a[ne.NextMonthButton], tabIndex: W ? void 0 : -1, "aria-disabled": W ? void 0 : !0, "aria-label": Xt(W), onClick: Qt, "data-animated-button": t.animate ? "true" : void 0 },
            G.createElement(n.Chevron, { disabled: W ? void 0 : !0, className: a[ne.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ye === u - 1 && d === "after" && !t.hideNavigation && G.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[ne.Nav], style: k?.[ne.Nav], "aria-label": et(), onPreviousClick: Zt, onNextClick: Qt, previousMonth: I, nextMonth: W }),
          G.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": pe(le.date, s.options, s) || void 0, className: a[ne.MonthGrid], style: k?.[ne.MonthGrid] },
            !t.hideWeekdays && G.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[ne.Weekdays], style: k?.[ne.Weekdays] },
              T && G.createElement(n.WeekNumberHeader, { "aria-label": fr(s.options), className: a[ne.WeekNumberHeader], style: k?.[ne.WeekNumberHeader], scope: "col" }, C()),
              hr.map((oe) => G.createElement(n.Weekday, { "aria-label": An(oe, s.options, s), className: a[ne.Weekday], key: String(oe), style: k?.[ne.Weekday], scope: "col" }, N(oe, s.options, s)))
            ),
            G.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[ne.Weeks], style: k?.[ne.Weeks] }, le.weeks.map((oe) => G.createElement(
              n.Week,
              { className: a[ne.Week], key: oe.weekNumber, style: k?.[ne.Week], week: oe },
              T && // biome-ignore lint/a11y/useSemanticElements: react component
              G.createElement(n.WeekNumber, { week: oe, style: k?.[ne.WeekNumber], "aria-label": ur(oe.weekNumber, {
                locale: i
              }), className: a[ne.WeekNumber], scope: "row", role: "rowheader" }, D(oe.weekNumber, s)),
              oe.days.map((me) => {
                const { date: ke } = me, ue = J(me);
                if (ue[ve.focused] = !ue.hidden && !!U?.isEqualTo(me), ue[Xe.selected] = te?.(ke) || ue.selected, Ca(H)) {
                  const { from: kt, to: Pn } = H;
                  ue[Xe.range_start] = !!(kt && Pn && s.isSameDay(ke, kt)), ue[Xe.range_end] = !!(kt && Pn && s.isSameDay(ke, Pn)), ue[Xe.range_middle] = pt(H, ke, !0, s);
                }
                const en = sk(ue, k, t.modifiersStyles), Ho = V0(ue, a, t.modifiersClassNames), tn = !In && !ue.hidden ? fe(ke, ue, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  G.createElement(n.Day, { key: `${s.format(ke, "yyyy-MM-dd")}_${s.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: ue, className: Ho.join(" "), style: en, role: "gridcell", "aria-selected": ue.selected || void 0, "aria-label": tn, "data-day": s.format(ke, "yyyy-MM-dd"), "data-month": me.outside ? s.format(ke, "yyyy-MM") : void 0, "data-selected": ue.selected || void 0, "data-disabled": ue.disabled || void 0, "data-hidden": ue.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": ue.focused || void 0, "data-today": ue.today || void 0 }, !ue.hidden && In ? G.createElement(n.DayButton, { className: a[ne.DayButton], style: k?.[ne.DayButton], type: "button", day: me, modifiers: ue, disabled: ue.disabled || void 0, tabIndex: P(me) ? 0 : -1, "aria-label": re(ke, ue, s.options, s), onClick: mr(me, ue), onBlur: gr(me, ue), onFocus: Jt(me, ue), onKeyDown: yr(me, ue), onMouseEnter: vr(me, ue), onMouseLeave: br(me, ue) }, M(ke, s.options, s)) : !ue.hidden && M(me.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      G.createElement(n.Footer, { className: a[ne.Footer], style: k?.[ne.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function jk({
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
    Uk,
    {
      showOutsideDays: n,
      className: ie(
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
        root: ie("w-fit", c.root),
        months: ie(
          "flex gap-4 flex-col md:flex-row relative",
          c.months
        ),
        month: ie("flex flex-col w-full gap-4", c.month),
        nav: ie(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          c.nav
        ),
        button_previous: ie(
          Ls({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: ie(
          Ls({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_next
        ),
        month_caption: ie(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: ie(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          c.dropdowns
        ),
        dropdown_root: ie(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          c.dropdown_root
        ),
        dropdown: ie(
          "absolute bg-popover inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: ie(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: ie("flex", c.weekdays),
        weekday: ie(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          c.weekday
        ),
        week: ie("flex w-full mt-2", c.week),
        week_number_header: ie(
          "select-none w-(--cell-size)",
          c.week_number_header
        ),
        week_number: ie(
          "text-[0.8rem] select-none text-muted-foreground",
          c.week_number
        ),
        day: ie(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          c.day
        ),
        range_start: ie(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: ie("rounded-none", c.range_middle),
        range_end: ie("rounded-r-md bg-accent", c.range_end),
        today: ie(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: ie(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: ie(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: ie("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: l, rootRef: d, ...u }) => /* @__PURE__ */ h(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: ie(l),
            ...u
          }
        ),
        Chevron: ({ className: l, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ h(xf, { className: ie("size-4", l), ...u }) : d === "right" ? /* @__PURE__ */ h(
          Cf,
          {
            className: ie("size-4", l),
            ...u
          }
        ) : /* @__PURE__ */ h(Ef, { className: ie("size-4", l), ...u }),
        DayButton: Yk,
        WeekNumber: ({ children: l, ...d }) => /* @__PURE__ */ h("td", { ...d, children: /* @__PURE__ */ h("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function Yk({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ea(), s = S.useRef(null);
  return S.useEffect(() => {
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
      className: ie(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let mn = null;
const lu = /* @__PURE__ */ new Map(), Vk = /* @__PURE__ */ new Map();
function Jr() {
  if (!mn) return;
  const e = mn;
  mn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Kk(e) {
  return mn?.pillDate === e;
}
function Gk({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = j(null), i = Ao(e);
  K(() => {
    const v = (w) => {
      w.key === "Escape" && (w.stopPropagation(), w.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), K(() => {
    const v = (T) => {
      s.current && !s.current.contains(T.target) && (T.target.closest(".date-pill") || o());
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const a = F((v) => {
    v && r(yn(v)), o();
  }, [r, o]), c = F((v) => {
    const w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + v), r(yn(w)), o();
  }, [r, o]), l = F(() => {
    const w = (/* @__PURE__ */ new Date()).getDay(), T = w === 0 ? 1 : 8 - w, k = /* @__PURE__ */ new Date();
    k.setDate(k.getDate() + T), r(yn(k)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), f = new Date(d);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), g = d.getDay(), m = g === 0 ? 1 : 8 - g, y = new Date(d);
  y.setDate(y.getDate() + m);
  const b = y.toDateString();
  return /* @__PURE__ */ A(
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
        /* @__PURE__ */ h("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ A("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ h("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ h(
            jk,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ h("div", { className: "border-t border-border" }),
          /* @__PURE__ */ A("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ h(
              Ut,
              {
                variant: "outline",
                size: "sm",
                className: ie(
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
                className: ie(
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
                className: ie(
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
function qk(e, t, n) {
  if (Kk(t)) {
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
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((k) => {
    y.addEventListener(k, (E) => {
      E.stopPropagation();
    }, !1);
  });
  const v = bp(y);
  mn = { container: y, root: v, pillDate: t };
  const w = () => {
    Jr();
  }, T = (k) => {
    const E = lu.get(t);
    E && E(k);
  };
  v.render(
    /* @__PURE__ */ h(
      Gk,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: m, direction: f, pillCenter: g },
        onSelectDate: T,
        onClose: w
      }
    )
  );
}
function Xk({ node: e, updateAttributes: t, selected: n }) {
  const r = j(null), o = e.attrs.date || gn(), s = du(o), i = Ma(o), a = F(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const d = c.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return K(() => (lu.set(o, (c) => {
    t({ date: c });
  }), Vk.set(o, a), () => {
  }), [o, t, a]), K(() => {
    const c = r.current;
    if (!c) return;
    const l = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = c.getAttribute("data-date") || gn(), f = a();
      qk(c, u, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), K(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      mn && Jr();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ h(eo, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ h(Mc, { size: 14, className: "date-icon" }),
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
function gn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Kn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function yn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function du(e) {
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
function Zk(e) {
  return Ao(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Bt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return gn();
  if (n === "tomorrow") return Kn(1);
  if (n === "yesterday") return Kn(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return Kn(c);
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
      return yn(d);
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
  const t = Ao(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Qk = new De("datePillPaste"), Jk = yo.create({
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
    const n = e.attrs.date, r = du(n), o = Ma(n);
    return [
      "span",
      En(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return gc(Xk, {
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
    const e = new $e({
      find: /@today\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(gn()).run();
      }
    }), t = new $e({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Kn(1)).run();
      }
    }), n = new $e({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Kn(-1)).run();
      }
    }), r = new $e({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), o = new $e({
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
          u().deleteRange(d).insertDatePill(yn(y)).run();
        }
      }
    }), s = new $e({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Bt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), i = new $e({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Bt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), a = new $e({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), c = new $e({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Bt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), l = new $e({
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
      new Ne({
        key: Qk,
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
              const T = y[1], k = Bt(T);
              if (k) {
                const E = o.slice(g, y.index);
                E && p.push(f.text(E)), p.push(e.create({ date: k })), g = y.index + y[0].length;
              }
            }
            const b = o.slice(g);
            if (b && p.push(f.text(b)), p.length === 0) return !1;
            const v = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: w } = d.selection;
            if (w.parent.type.name === "paragraph") {
              const T = u;
              let k = d.selection.from;
              for (const E of p)
                T.insert(k, E), k += E.nodeSize;
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
function ex({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = j(null), i = j(null), a = e.attrs.tag || "", c = j(!1), [l, d] = Y(() => qe.has(a)), [u, f] = Y(() => qe.get(a)?.value ?? a);
  K(() => {
    l || f(a);
  }, [a, l]), K(() => {
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
    const w = v.trim().replace(/^#/, ""), T = Gn(w);
    if (qe.delete(a), T && qe.delete(T), !T || !un(T))
      o();
    else if (T !== a) {
      const k = r();
      if (typeof k == "number" && n) {
        const { tr: E } = n.state, M = e.nodeSize;
        E.delete(k, k + M), E.insert(k, n.schema.nodes.tagPill.create({ tag: T })), n.view.dispatch(E);
      }
    } else
      qe.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), g = F(() => {
    n && !n.isEditable || (qe.set(a, { value: a, focusedAt: Date.now() }), f(a), d(!0), c.current = !1);
  }, [n, a]);
  K(() => {
    const v = s.current;
    if (!v || l) return;
    const w = (k) => {
      k.preventDefault(), k.stopPropagation(), g();
    }, T = (k) => {
      k.preventDefault(), k.stopPropagation();
    };
    return v.addEventListener("dblclick", w), v.addEventListener("click", T), () => {
      v.removeEventListener("dblclick", w), v.removeEventListener("click", T);
    };
  }, [l, n, r, g]), K(() => {
    if (l) {
      const v = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const w = qe.get(a);
          w && (w.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [l, a]);
  const m = F((v) => {
    v.key === "Enter" ? (v.preventDefault(), p(u)) : v.key === "Escape" && (v.preventDefault(), qe.delete(a), d(!1), c.current = !0, n?.commands.focus());
  }, [p, u, a, n]), y = F(() => {
    const w = qe.get(a)?.focusedAt ?? 0;
    Date.now() - w > 300 && p(u);
  }, [p, u, a]), b = F((v) => {
    f(v.target.value);
  }, []);
  return l ? /* @__PURE__ */ h(eo, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ h(Ga, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
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
  ) }) : /* @__PURE__ */ h(eo, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ h(Ga, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ h("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function un(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Gn(e) {
  return e.toLowerCase().trim();
}
const tx = new De("tagPillPaste"), nx = yo.create({
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
      En(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return gc(ex, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Gn(e);
        return un(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new $e({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = Gn(r[1]);
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
        key: tx,
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
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const m = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = m.exec(o)) !== null; ) {
              const w = Gn(y[1]);
              if (un(w)) {
                const T = y[0], k = T.startsWith(" ") || T.startsWith(`
`) ? 1 : 0, E = o.slice(g, y.index + k);
                E && p.push(f.text(E)), p.push(e.create({ tag: w })), g = y.index + T.length;
              }
            }
            const b = o.slice(g);
            if (b && p.push(f.text(b)), p.length === 0) return !1;
            const { $from: v } = d.selection;
            if (v.parent.type.name === "paragraph") {
              const w = u;
              let T = d.selection.from;
              for (const k of p)
                w.insert(T, k), T += k.nodeSize;
              w.delete(d.selection.from, d.selection.to), t.dispatch(w);
            } else {
              const w = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
              );
              u.replaceSelectionWith(w), t.dispatch(u);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), rx = /\[\[([^\[\]]+)\]\]$/, ox = Rc.create({
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
      En(
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
      new $e({
        find: rx,
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
}), ft = {
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
}, sx = ["info", "note", "prompt", "resources", "todo", "summary"];
function ax(e) {
  return e.length < 3 ? !1 : !!(ft.header.test(e) || ft.bold.test(e) || ft.list.test(e) || ft.taskList.test(e) || ft.codeBlock.test(e) || ft.callout.test(e) || ft.highlight.test(e) || ft.link.test(e) || ft.table.test(e));
}
function ix(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function cx(e, t) {
  const { alt: n, align: r, width: o } = ix(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function uo(e) {
  let t = e;
  const n = [];
  t = t.replace(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\(([^)]+)\)/g, (r, o, s) => {
    const i = `MANUSINLINELINKPH${n.length}END`;
    return n.push(`<a href="${s}">${o}</a>`), i;
  }), t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>");
  for (let r = 0; r < n.length; r++)
    t = t.replace(`MANUSINLINELINKPH${r}END`, n[r]);
  return t;
}
function qi(e) {
  if (!/!\[(?:[^\[\]]|\[[^\]]*\])*\]\([^)]+\)/.test(e)) return `<p>${uo(e)}</p>`;
  const n = /(!\[(?:[^\[\]]|\[[^\]]*\])*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)]+)\)$/);
    i ? o.push(cx(i[1], i[2])) : o.push(`<p>${uo(s.trim())}</p>`);
  }
  return o.join("");
}
function uu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^[-*+]\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function fu(e) {
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
function Xi(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return qi(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(fu(s)), s = []);
  };
  for (const a of r) {
    const c = uu(a);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && i();
      }
      s.push(c);
    } else
      i(), o.push(qi(a.trim()));
  }
  return i(), o.join("");
}
function lx(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + Xi(a) + "</th>";
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
        i += "<td>" + Xi(u) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function dx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (f) => {
    const p = f.split(`
`);
    if (p.length >= 2) {
      const g = p[1];
      if (/^\|?[\s\-:|]+\|?$/.test(g) && g.includes("-")) {
        const m = lx(f);
        if (m) {
          const y = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(m), y;
        }
      }
    }
    return f;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (f, p, g) => {
    const m = p.replace("ad-", "");
    let y = g.trim();
    y = y.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), y = y.replace(/__([^_]+)__/g, "<strong>$1</strong>"), y = y.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), y = y.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), y = y.replace(/`([^`]+)`/g, "<code>$1</code>"), y.startsWith("<") || (y = `<p>${y}</p>`);
    const b = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${m}" class="callout callout-${m}">${y}</div>`), b;
  }), sx.forEach((f) => {
    const p = new RegExp(`\`\`\`${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(p, (g, m) => {
      let y = m.trim();
      y = y.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), y = y.replace(/__([^_]+)__/g, "<strong>$1</strong>"), y = y.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), y = y.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), y = y.replace(/`([^`]+)`/g, "<code>$1</code>"), y.startsWith("<") || (y = `<p>${y}</p>`);
      const b = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${f}" class="callout callout-${f}">${y}</div>`), b;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (f, p, g) => {
    const m = p || "plaintext", y = g.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), b = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${m}">${y}</code></pre>`), b;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), i = [];
  let a = [];
  const c = () => {
    a.length !== 0 && (i.push(fu(a)), a = []);
  };
  for (const f of s) {
    const p = uu(f);
    if (p) {
      if (a.length > 0) {
        const m = a[0].type, y = Math.min(...a.map((b) => b.depth));
        p.depth === y && p.type !== m && c();
      }
      a.push(p);
      continue;
    }
    c();
    let g = f;
    g = g.replace(/^(#{1,6})\s+(.+)$/, (m, y, b) => {
      const v = y.length;
      return `<h${v}>${b}</h${v}>`;
    }), g = g.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), g = g.replace(/^[-*_]{3,}$/, "<hr>"), i.push(g);
  }
  c(), t = i.join(`
`);
  const l = [];
  t = t.replace(/!\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)]+)\)/g, (f, p, g) => {
    const m = p.split("|").map((E) => E.trim());
    let y = "", b = "left", v = null;
    m.length === 1 ? y = m[0] : m.length === 2 ? (y = m[0], /^\d+$/.test(m[1]) ? v = m[1] : ["left", "center", "right"].includes(m[1]) ? b = m[1] : y = p) : m.length === 3 ? (y = m[0], ["left", "center", "right"].includes(m[1]) && (b = m[1]), /^\d+$/.test(m[2]) && (v = m[2])) : y = p;
    const w = v ? ` width="${v}" style="width: ${v}px"` : "", T = `<img src="${g.trim()}" alt="${y}" data-align="${b}"${w}>`, k = `MANUSLINKPLACEHOLDER${l.length}END`;
    return l.push(T), k;
  }), t = t.replace(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\(([^)]+)\)/g, (f, p, g) => {
    const m = `<a href="${g}">${p}</a>`, y = `MANUSLINKPLACEHOLDER${l.length}END`;
    return l.push(m), y;
  }), t = t.replace(/<a\s[^>]*>.*?<\/a>/g, (f) => {
    const p = `MANUSLINKPLACEHOLDER${l.length}END`;
    return l.push(f), p;
  }), t = t.replace(/<img\s[^>]*\/?>/g, (f) => {
    const p = `MANUSLINKPLACEHOLDER${l.length}END`;
    return l.push(f), p;
  }), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>");
  for (let f = 0; f < l.length; f++)
    t = t.replace(`MANUSLINKPLACEHOLDER${f}END`, l[f]);
  t = t.split(`
`).map((f) => {
    const p = f.trim();
    return p ? /^<[a-z]/.test(p) || /^<\//.test(p) || p.startsWith("MANUSTABLEPLACEHOLDER") || p.startsWith("MANUSCODEPLACEHOLDER") ? f : `<p>${p}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let f = 0; f < r.length; f++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${f}END`, r[f]);
  for (let f = 0; f < o.length; f++)
    t = t.replace(`MANUSCODEPLACEHOLDER${f}END`, o[f]);
  return t;
}
const ux = He.create({
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
        key: new De("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !ax(i))
              return !1;
            n.preventDefault();
            const a = dx(i);
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
}), Zi = new De("collapsibleHeading");
function pu(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function _s(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, pu(i, a, l));
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
        return v.className = `collapsible-heading-chevron ${p ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", f), v.setAttribute("data-heading-level", String(d.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = p ? "Click to expand" : "Click to collapse", v.addEventListener("click", (w) => {
          w.preventDefault(), w.stopPropagation();
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
function Qi(e, t) {
  const n = [];
  return e.descendants((r) => {
    r.type.name === "heading" && t.includes(r.attrs.level) && n.push(`${r.attrs.level}:${r.textContent.slice(0, 50)}`);
  }), n.join("|");
}
function fx(e, t, n, r) {
  const o = [], s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  e.descendants((l) => {
    if (l.type.name === "heading" && n.includes(l.attrs.level)) {
      const d = l.attrs.level, u = l.textContent.slice(0, 50);
      o.push(`${d}:${u}`);
      const f = `h${d}-${u}`, p = i.get(f) ?? 0;
      i.set(f, p + 1), s.add(pu(d, u, p));
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
const px = He.create({
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
      new Ne({
        key: Zi,
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
              headingFingerprint: Qi(o.doc, t.levels)
            };
          },
          apply(r, o, s, i) {
            if (r.getMeta("collapsibleHeading"))
              return {
                collapsedHeadings: new Set(e.collapsedHeadings),
                decorations: Ur(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                headingFingerprint: Qi(i.doc, t.levels)
              };
            if (r.docChanged) {
              const { structureChanged: c, newFingerprint: l } = fx(
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
            const o = Zi.getState(r);
            return o?.decorations ? o.decorations : Ur(r.doc, e, t, n);
          }
        }
      })
    ];
  }
}), hx = /\[((?:[^\[\]]|\[[^\]]*\])+)\]\(([^)]+)\)$/, mx = /^(https?:\/\/|www\.)[^\s]+$/i, gx = He.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new $e({
        find: hx,
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
        key: new De("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!mx.test(s)) return !1;
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
}), yx = He.create({
  name: "calloutInputRule"
  // No plugins — logic moved to InputDispatcher
}), jr = new De("searchHighlight"), vx = He.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(jr, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(jr, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ne({
        key: jr,
        state: {
          init() {
            return Ve.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(jr), d = t.docChanged;
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
                    const b = m + y.index, v = m + y.index + y[0].length, w = f === c;
                    u.push(
                      Ze.inline(b, v, {
                        class: w ? "search-highlight-current" : "search-highlight"
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
}), bx = He.create({
  name: "tabIndent"
  // No plugins — logic moved to InputDispatcher
}), wx = new De("inputDispatcher"), kx = ["info", "note", "prompt", "resources", "todo"];
function xx(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n >= 0; n--) {
    const r = t.node(n);
    if (r.type.name === "taskItem") return "taskItem";
    if (r.type.name === "listItem") return "listItem";
  }
  return null;
}
function Ji(e, t) {
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
const Cx = He.create({
  name: "inputDispatcher",
  // Higher priority to ensure Tab handling runs before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ne({
        key: wx,
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
              const w = m.doc.resolve(p - 1).nodeBefore;
              w && w.type === u && pp(m.doc, p - 1) && m.join(p - 1);
            }
            return t.dispatch(m), !0;
          },
          // ─── Consolidated handleKeyDown ─────────────────────────────
          // Replaces TabIndent, CalloutInputRule, and CodeBlockEnterShortcut plugins.
          // Runs once per key press instead of through multiple plugins.
          handleKeyDown(t, n) {
            if (n.key === "Tab") {
              const { state: r, dispatch: o } = t, s = xx(r);
              if (!s)
                return n.preventDefault(), !0;
              n.preventDefault();
              const i = r.schema.nodes[s];
              if (!i) return !0;
              if (n.shiftKey) {
                if (!Xa(i)(r, o)) {
                  const l = s === "taskItem" ? "listItem" : "taskItem", d = r.schema.nodes[l];
                  d && Xa(d)(r, o);
                }
              } else if (Za(i)(r, o))
                Ji(t.state, o);
              else {
                const l = s === "taskItem" ? "listItem" : "taskItem", d = r.schema.nodes[l];
                d && Za(d)(r, o) && Ji(t.state, o);
              }
              return !0;
            }
            if (n.key === "Enter") {
              const { state: r } = t, { $from: o } = r.selection, s = o.start(), i = r.doc.textBetween(s, o.pos, ""), a = i.trim();
              for (const l of kx)
                if (a === `\`\`\`${l}`) {
                  n.preventDefault();
                  const d = r.tr, u = s + i.indexOf("```");
                  d.delete(u, o.pos);
                  const f = e.schema.nodes.callout, p = e.schema.nodes.paragraph;
                  if (f && p) {
                    const g = p.create(), m = f.create({ type: l }, Ic.from(g));
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
                    const w = y + 1;
                    g.setSelection(Ke.create(g.doc, w)), t.dispatch(g);
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
}), Ex = new De("expandSelection");
function hs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const Mx = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), hu = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), Tx = "tableRow", Sx = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function Nx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Dx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (Sx.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Lx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === Tx) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Ax(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (hu.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Ix(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    Mx.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function Rx(e) {
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
function Px(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Ox(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function _x(e, t, n) {
  let r = !1;
  return e.nodesBetween(t, n, (o) => hu.has(o.type.name) ? (r = !0, !1) : !0), r;
}
function $x(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(Nx(e, o, s)), Ox(e, t) && (i(Dx(e, o, s)), i(Lx(e, o, s))), i(Ix(e, o, s)), i(Ax(e, o, s));
  const a = Rx(e);
  if (a.length > 0) {
    const c = Px(a, o, s);
    for (const l of c)
      _x(e, l.from, l.to) ? l.from === 0 && l.to === e.content.size ? i({ from: 0, to: e.content.size, useSelectAll: !0 }) : i({ from: l.from, to: l.to, useSelectAll: !0 }) : i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size, useSelectAll: !0 }), r;
}
const Hx = He.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof Qf || o === 0 && s === n.content.size)
          return !0;
        const a = $x(n, o, s);
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
      new Ne({
        key: Ex,
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
}), Bx = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Wx(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const zx = new De("hexColorDecoration");
function mu(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Bx.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, d = l + a[0].length;
      if (d >= t && l <= n) {
        const u = a[0], f = Wx(u);
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
function Fx(e) {
  const t = mu(e, 0, e.content.size);
  return Ve.create(e, t);
}
const Ux = Rc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: zx,
        state: {
          init(e, { doc: t }) {
            return Fx(t);
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
              const i = mu(e.doc, s.from, s.to);
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
}), Se = new De("selectAllOccurrences");
function ec(e, t, n, r, o) {
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
function Tt(e, t) {
  const n = Se.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function jx(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Te(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Yx = He.create({
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
        const c = ec(t.state.doc, o, s, i, a);
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
          const c = ec(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = jx(c, s), d = c[l];
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Te(this.storage), t && t(e.setMeta(Se, { deactivate: !0 })), !0),
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
              const c = Tt(a, this.storage);
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
              const s = Tt(o, this.storage);
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
              Te(e);
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
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), wp(t.state, t.dispatch), setTimeout(() => {
                  const s = Tt(t);
                  e.ranges = s, s.length === 0 && Te(e);
                }, 10), !0;
              }
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, kp(t.state, t.dispatch), setTimeout(() => {
                  const s = Tt(t);
                  e.ranges = s, s.length === 0 && Te(e);
                }, 10), !0;
              }
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Tt(t);
                if (r.length === 0) {
                  Te(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Se, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Tt(t);
                  e.ranges = a, a.length === 0 && Te(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Te(e);
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
              t.dispatch(o), Te(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Se, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Te(e);
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
            const s = Tt(t);
            if (s.length === 0) {
              Te(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Se, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = Tt(t);
              e.ranges = c, c.length === 0 && Te(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
}), Vx = new De("linkBoundary"), Kx = He.create({
  name: "linkBoundary",
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: Vx,
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
}), Gx = new De("smartCopyPaste"), gu = /* @__PURE__ */ new Set(["codeBlock", "callout"]);
function tc(e) {
  const { state: t } = e, { selection: n } = t, { $from: r, $to: o } = n;
  for (let s = r.depth; s > 0; s--) {
    const i = r.node(s);
    if (!gu.has(i.type.name)) continue;
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
const qx = He.create({
  name: "smartCopyPaste",
  addProseMirrorPlugins() {
    const e = this.editor;
    let t = {
      isFullContainer: !1,
      containerType: null
    };
    return [
      new Ne({
        key: Gx,
        props: {
          handleDOMEvents: {
            // Analyze the selection right before copy/cut happens
            copy(n) {
              return t = tc(n), !1;
            },
            cut(n) {
              return t = tc(n), !1;
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
            if (!c || !gu.has(c.type.name))
              return n;
            if (r === "codeBlock") {
              const l = e.schema, d = l.nodes.paragraph;
              if (!d) {
                const m = c.content;
                return new Yo(m, Math.max(0, i - 1), Math.max(0, a - 1));
              }
              let u = "";
              c.content.forEach((m) => {
                u += m.text || "";
              });
              const f = u.split(`
`);
              f.length > 1 && f[f.length - 1] === "" && f.pop();
              const p = f.map((m) => m === "" ? d.create() : d.create(null, l.text(m))), g = Ic.from(p);
              return new Yo(g, 0, 0);
            } else {
              const l = c.content, d = Math.max(0, i - 1), u = Math.max(0, a - 1);
              return new Yo(l, d, u);
            }
          }
        }
      })
    ];
  }
});
function Xx() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Zx(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function Qx(e) {
  return new Promise((t) => {
    const n = URL.createObjectURL(e), r = new window.Image();
    r.onload = () => {
      URL.revokeObjectURL(n), t({ width: r.width, height: r.height });
    }, r.onerror = () => {
      URL.revokeObjectURL(n), t({ width: 400, height: 300 });
    }, r.src = n;
  });
}
function Jx(e, t) {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${t}'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E`;
}
function eC(e, t) {
  return t.includes(e.type);
}
async function tC(e, t, n) {
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
      const u = e.type === "image/png" || e.type === "image/gif", f = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, g = l.toDataURL(f, p), m = Zx(g, e.name);
      r({ dataUrl: g, file: m, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function nC(e, t, n) {
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
async function nc(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!eC(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const s = (n.maxFileSize / 1048576).toFixed(1), i = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${i}MB. Maximum size: ${s}MB`), !1;
  }
  const r = Xx(), o = `placeholder://${r}`;
  try {
    n.onUploadStart?.();
    const s = await Qx(e), a = Math.min(s.width, 600), c = Math.round(s.height * (a / s.width)), l = Jx(a, c), { doc: d } = t.view.state;
    d.content.size === 0 || d.childCount === 1 && d.firstChild?.isTextblock && d.firstChild.content.size === 0 ? t.chain().focus().insertContent({
      type: "resizableImage",
      attrs: {
        src: l,
        alt: o,
        width: a
      }
    }).run() : t.chain().focus().setImage({
      src: l,
      alt: o,
      width: a
    }).run();
    const { state: f } = t.view, p = f.selection.from - 1;
    if (p >= 0) {
      const y = f.doc.nodeAt(p);
      if (y && y.type.name === "resizableImage") {
        const b = t.view.nodeDOM(p);
        if (b) {
          const v = b instanceof HTMLElement ? b : b.dom;
          v && v.classList.add("image-uploading");
        }
      }
    }
    let g;
    const m = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    n.enableCompression && m ? g = (await tC(
      e,
      n.maxCompressedWidth,
      n.compressionQuality
    )).file : g = e;
    try {
      const y = await n.onImageUpload(g, {
        fileName: e.name,
        mimeType: g.type,
        fileSize: g.size,
        uploadId: r
      });
      let b = !1;
      return t.view.state.doc.descendants((v, w) => {
        if (b) return !1;
        if (v.type.name === "resizableImage" && v.attrs.alt === o) {
          try {
            const { state: T, dispatch: k } = t.view, E = T.doc.nodeAt(w);
            if (E) {
              const M = T.tr.setNodeMarkup(w, void 0, {
                ...E.attrs,
                src: y,
                alt: e.name
              });
              k(M);
            }
          } catch (T) {
            console.warn("Failed to replace placeholder with uploaded reference:", T);
          }
          return b = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((v, w) => {
        if (v.type.name === "resizableImage" && v.attrs.src === y) {
          const T = t.view.nodeDOM(w);
          if (T) {
            const k = T instanceof HTMLElement ? T : T.dom;
            k && k.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (y) {
      return console.warn("Image upload failed, removing placeholder:", y), nC(t, l, o), n.onUploadError?.(`Upload failed: ${y instanceof Error ? y.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (s) {
    try {
      t.view.state.doc.descendants((i, a) => {
        if (i.type.name === "resizableImage" && i.attrs.alt === o) {
          try {
            const { state: c, dispatch: l } = t.view, d = c.tr.delete(a, a + i.nodeSize);
            l(d);
          } catch {
          }
          return !1;
        }
        return !0;
      });
    } catch {
    }
    return n.onUploadError?.(`Failed to process image: ${s instanceof Error ? s.message : "Unknown error"}`), !1;
  }
}
function rc(e) {
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
const rC = He.create({
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
        key: new De("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = rc(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              nc(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = rc(i);
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
              nc(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function oC({
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
  return Nt(() => {
    const g = [
      Jf.configure({
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
      Ep.configure({ HTMLAttributes: { class: "font-bold" } }).extend({ keepOnSplit: !1 }),
      Mp.configure({ HTMLAttributes: { class: "italic" } }).extend({ keepOnSplit: !1 }),
      Tp.configure({}).extend({ keepOnSplit: !1 }),
      Cp.configure({}).extend({ keepOnSplit: !1 }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      Eb,
      Mb,
      Nb,
      ep.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      tp.configure({
        types: ["heading", "paragraph"]
      }),
      np.configure({
        multicolor: !0
      }),
      rp.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      // Prevent typed text from being absorbed into a link mark at the start of a textblock
      Kx,
      // Smart copy-paste: partial selection inside code block/callout unwraps the container
      qx,
      hp,
      mp,
      gp,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [yp],
      gx,
      vx,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [Yx],
      bx,
      Cx,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      xp.extend({
        addInputRules() {
          const m = this.type;
          return [
            new $e({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: y, range: b }) => {
                const { tr: v } = y, w = b.from, T = b.to;
                v.delete(w, T);
                const k = v.doc.resolve(w), E = m.create(), M = k.before(k.depth), x = k.after(k.depth);
                v.replaceWith(M, x, E);
                const D = M + E.nodeSize;
                if (D < v.doc.content.size) {
                  const C = v.doc.resolve(D);
                  C.nodeAfter && C.nodeAfter.isTextblock ? v.setSelection(Ke.create(v.doc, D + 1)) : C.nodeAfter && v.setSelection(Ke.near(v.doc.resolve(D)));
                } else {
                  const N = y.schema.nodes.paragraph.create();
                  v.insert(D, N), v.setSelection(Ke.create(v.doc, D + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || g.push(
      op.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      sp,
      mb,
      gb,
      ...u ? [] : [Cb]
    ), s.taskLists || g.push(
      Tb.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Sb.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), c && !t && !u && g.push(
      Lb.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || g.push(Pp), s.callouts || g.push(Wb, yx), a && !s.collapsibleHeadings && !u && g.push(
      px.configure({
        levels: o
      })
    ), s.images || g.push(
      zb.configure({
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
        resolveImageSrc: (...m) => p.resolveImageSrc.current?.(...m)
      }),
      rC.configure({
        maxFileSize: n,
        onUploadStart: (...m) => p.onImageUploadStart.current?.(...m),
        onUploadComplete: (...m) => p.onImageUploadComplete.current?.(...m),
        onUploadError: (...m) => p.onImageUploadError.current?.(...m),
        onImageUpload: (m, y) => p.onImageUpload.current ? p.onImageUpload.current(m, y) : Promise.reject(new Error("Image upload is not available. Please configure an image storage adapter."))
      })
    ), s.datePills || g.push(
      Jk.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || g.push(
      nx.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: l
      })
    ), s.wikiLinks || g.push(
      ox.configure({
        onWikiLinkClick: (m) => {
          console.log("WikiLink clicked:", m), p.onWikiLinkClick.current?.(m);
        },
        validateLink: (m) => p.validateWikiLink.current ? p.validateWikiLink.current(m) : !0
      })
    ), i && g.push(Hx), d && !u && g.push(Ux), s.markdownPaste || g.push(
      ux.configure({
        enableMarkdownPaste: !0
      })
    ), g;
  }, [e, t, n, r, o, s, i, a, c, l, d, u]);
}
let mt = null, fo = null;
async function yu() {
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
      const d = l, u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), m = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", w = m && m > 0;
      return (v || w) && b.push(v ? y : "left"), w && b.push(String(m)), `![${b.join(" | ")}](${u})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const d = l.querySelector("img");
      if (!d) return c;
      const u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), m = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", w = m && m > 0;
      (v || w) && b.push(v ? y : "left"), w && b.push(String(m));
      const T = `![${b.join(" | ")}](${u})`, k = l.parentNode;
      return k && k.nodeName === "LI" ? `
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
      const b = m.getAttribute("data-type") === "taskItem", v = m.getAttribute("data-checked") === "true", w = s(m);
      b ? l.push(`${u}- [${v ? "x" : " "}] ${w}`) : f === "OL" ? l.push(`${u}${g + y}. ${w}`) : l.push(`${u}- ${w}`);
      const T = Array.from(m.childNodes).filter(
        (k) => k.nodeType === Node.ELEMENT_NODE && (k.nodeName === "UL" || k.nodeName === "OL")
      );
      for (const k of T)
        i(k, l, d + 1);
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
        const b = Array.from(m.querySelectorAll("th, td")), v = b.map((w) => a(w));
        if (y > 0 && b.length > 0 && b[0].nodeName === "TH" && (p = !0), f.push("| " + v.join(" | ") + " |"), y === 0) {
          const w = b.map(() => "---").join(" | ");
          f.push("| " + w + " |");
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
      return d ? `@${Zk(d)}@` : c;
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
  }), mt = n, n;
}
function sC() {
  !fo && !mt && (fo = yu().then((e) => (mt = e, e)));
}
function aC() {
  return sC(), {
    turndown(e) {
      return mt ? mt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return mt !== null;
    },
    async ready() {
      mt || (fo ? await fo : await yu());
    }
  };
}
function iC() {
  const e = j(null);
  return e.current || (e.current = aC()), e.current;
}
const cC = 2e3;
function lC(e) {
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
    onDocUpdate: f,
    markdownChangeDebounceMs: p,
    onReady: g,
    onDestroy: m,
    onFocus: y,
    onBlur: b,
    onSelectionChange: v,
    onLinkClick: w,
    editorModeRef: T,
    rawMarkdownRef: k,
    setRawMarkdown: E,
    setIsLightweight: M,
    lightweightCheckCounterRef: x,
    isLightweightRef: D
  } = e, C = n && n.length > cC, N = j(C ? n : null), L = C ? "" : n, O = j(null), _ = j(null), $ = j(l), z = j(d), V = j(u), I = j(f), W = j(p), q = j(null);
  $.current = l, z.current = d, V.current = u, I.current = f, W.current = p;
  const J = Zu({
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
      window.__tiptapEditor = H, g?.(H);
    },
    onDestroy: () => {
      m?.();
    },
    extensions: t,
    content: L,
    editable: r,
    autofocus: o,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      handleClick: (H, R, U) => {
        if (w) {
          const X = U.target.closest("a");
          if (X) {
            const ee = X.getAttribute("href");
            if (ee && w(ee, U) === !1)
              return U.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: H }) => {
      if (I.current?.(), a === "auto" && (x.current++, x.current >= 50)) {
        x.current = 0;
        const U = H.state.doc.content.childCount > c;
        U !== D.current && M(U);
      }
      ($.current || z.current) && (O.current && clearTimeout(O.current), O.current = setTimeout(() => {
        if (H.isDestroyed) return;
        const R = H.getHTML();
        $.current?.(R), z.current?.(R);
      }, 300)), W.current > 0 && V.current && (_.current && clearTimeout(_.current), _.current = setTimeout(() => {
        if (!H.isDestroyed && T.current === "wysiwyg" && q.current) {
          const R = H.getHTML(), U = q.current.turndown(R);
          k.current = U, V.current?.(jt(U));
        }
      }, W.current));
    },
    onFocus: () => {
      y?.();
    },
    onBlur: () => {
      if (_.current && (clearTimeout(_.current), _.current = null), O.current && (clearTimeout(O.current), O.current = null, J && !J.isDestroyed)) {
        const H = J.getHTML();
        if (($.current || z.current) && ($.current?.(H), z.current?.(H)), T.current === "wysiwyg" && q.current) {
          const R = q.current.turndown(H);
          k.current = R, V.current?.(jt(R));
        }
      }
      b?.();
    },
    onSelectionUpdate: ({ editor: H }) => {
      if (v) {
        const { from: R, to: U, empty: P } = H.state.selection;
        v({ from: R, to: U, empty: P });
      }
    }
  });
  K(() => {
    if (!N.current || !J || J.isDestroyed) return;
    const H = N.current;
    N.current = null;
    const R = requestAnimationFrame(() => {
      const U = setTimeout(() => {
        J.isDestroyed || J.commands.setContent(H);
      }, 0);
      J.__deferredTimerId = U;
    });
    return () => {
      cancelAnimationFrame(R);
      const U = J.__deferredTimerId;
      U && clearTimeout(U);
    };
  }, [J]), K(() => () => {
    if (_.current && (clearTimeout(_.current), _.current = null), O.current && (clearTimeout(O.current), O.current = null, J && !J.isDestroyed)) {
      const H = J.getHTML();
      if (($.current || z.current) && ($.current?.(H), z.current?.(H)), T.current === "wysiwyg" && q.current) {
        const R = q.current.turndown(H);
        k.current = R, V.current?.(jt(R));
      }
    }
  }, []);
  const te = iC();
  q.current = te;
  const B = j(!1);
  return K(() => {
    if (!B.current && i === "markdown" && J && !J.isDestroyed && te) {
      const H = J.getHTML(), R = te.turndown(H);
      E(R), k.current = R, B.current = !0;
    }
  }, [J, te, i]), { editor: J, turndownService: te };
}
function dC(e) {
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
        const b = Array.from(f.childNodes), v = [], w = [];
        b.forEach((k) => {
          if (k.nodeType === Node.ELEMENT_NODE) {
            const E = k;
            if (E.tagName === "UL" || E.tagName === "OL" || E.tagName === "P")
              w.push(k);
            else if (E.tagName === "IMG" || E.tagName === "FIGURE")
              if (E.tagName === "IMG") {
                const M = n.createElement("figure");
                M.className = "image-resizer";
                const x = E.getAttribute("data-align") || "left", D = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[x] || "margin-right: auto;";
                M.style.cssText = D, M.appendChild(E.cloneNode(!0)), w.push(M);
              } else
                w.push(k);
            else
              v.push(k);
          } else
            v.push(k);
        });
        const T = w.filter((k) => {
          if (k.nodeType === Node.ELEMENT_NODE) {
            const E = k;
            if (E.tagName === "P" && !E.textContent?.trim() && !E.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", v.length > 0) {
          const k = n.createElement("p");
          v.forEach((E) => k.appendChild(E)), k.firstChild && k.firstChild.nodeType === Node.TEXT_NODE && (k.firstChild.textContent = (k.firstChild.textContent || "").replace(/^\s+/, "")), (k.textContent?.trim() || k.querySelector("img, figure, code, br")) && f.appendChild(k);
        }
        T.forEach((k) => f.appendChild(k));
      }
    }), l && !d && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function uC(e) {
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
function fC(e) {
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
                  const k = n.createElement("p");
                  m.forEach((E) => k.appendChild(E.cloneNode(!0))), k.textContent?.trim() && l.push(k), m.length = 0;
                }
                const b = y, v = n.createElement("figure");
                v.className = "image-resizer";
                const w = b.getAttribute("data-align") || "left", T = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = T[w] || "margin-right: auto;", v.appendChild(b.cloneNode(!0)), l.push(v);
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
function pC(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function po(e) {
  let t = e;
  const n = [];
  t = t.replace(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\(([^)]+)\)/g, (r, o, s) => {
    const i = `MANUSINLINELINKPH${n.length}END`;
    return n.push(`<a href="${s}">${o}</a>`), i;
  }), t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>");
  for (let r = 0; r < n.length; r++)
    t = t.replace(`MANUSINLINELINKPH${r}END`, n[r]);
  return t;
}
function hC(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function oc(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? hC(r) : r.trim() ? `<p>${po(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${po(e)}</p>`;
}
function mC(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function gC(e) {
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
function yC(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let c = r.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (l.length <= 1 && !a)
        return s ? `${n}${oc(c)}${o}` : t;
      const d = [];
      let u = [];
      const f = () => {
        u.length !== 0 && (d.push(gC(u)), u = []);
      };
      for (const p of l) {
        const g = mC(p);
        if (g) {
          if (u.length > 0) {
            const m = u[0].type;
            g.depth === 0 && g.type !== m && f();
          }
          u.push(g);
        } else
          f(), d.push(oc(p.trim()));
      }
      return f(), `${n}${d.join("")}${o}`;
    }
  );
}
function vC(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: c
  } = n;
  let l = e;
  l = uC(l);
  const d = /* @__PURE__ */ new Set(["info", "note", "prompt", "resources", "todo", "summary"]), u = l.split(`
`), f = [];
  let p = null, g = [];
  for (let y = 0; y < u.length; y++) {
    const b = u[y];
    if (p !== null)
      if (b.trimEnd() === "```") {
        const v = g.join(`
`).trim(), w = v ? t(v) : "";
        f.push(`<div data-callout="" data-type="${p}" class="callout callout-${p}">${w}</div>`), p = null, g = [];
      } else
        g.push(b);
    else {
      const v = b.match(/^```(?:ad-)?(\w+)\s*$/);
      v && d.has(v[1]) ? (p = v[1], g = []) : f.push(b);
    }
  }
  return p !== null && (f.push(`\`\`\`ad-${p}`), f.push(...g)), l = f.join(`
`), l = l.replace(/!\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)]+)\)/g, (y, b, v) => {
    const w = b.split("|").map((D) => D.trim());
    let T = "", k = "left", E = null;
    w.length === 1 ? T = w[0] : w.length === 2 ? (T = w[0], /^\d+$/.test(w[1]) ? E = w[1] : ["left", "center", "right"].includes(w[1]) ? k = w[1] : T = b) : w.length === 3 ? (T = w[0], ["left", "center", "right"].includes(w[1]) && (k = w[1]), /^\d+$/.test(w[2]) && (E = w[2])) : T = b;
    const M = E ? ` width="${E}" style="width: ${E}px"` : "", x = ` data-align="${k}"`;
    return `<img src="${v.trim()}" alt="${T}"${x}${M} />`;
  }), l = l.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), a && c && (l = l.replace(/@([^@\n]+)@/g, (y, b) => {
    const v = a(b);
    if (v) {
      const w = c(v);
      return `<span data-type="date-pill" data-date="${v}" class="date-pill ${w}"><span class="date-icon">📅</span><span class="date-text">${b.trim()}</span></span>`;
    }
    return y;
  })), r && !o && s && i && (l = l.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (y, b) => {
      const v = i(b);
      return s(v) ? `<span data-type="tag-pill" data-tag="${v}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${v}</span></span>` : y;
    }
  )), l = l.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((y, b) => b % 2 === 1 ? y : y.replace(/\[\[([^\[\]]+)\]\]/g, (v, w) => `<span data-wiki-link data-page-name="${w.trim()}" class="wiki-link">${w.trim()}</span>`)).join(""), l;
}
function bC(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = dC(t), t = fC(t), t = pC(t), t = yC(t), t = t.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
    (n, r, o, s) => r + o.replace(/\n+$/, "") + s
  ), t;
}
function wC(e, t, n = {}) {
  const r = vC(e, t, n), o = t(r);
  return bC(o);
}
function kC(e, t, n) {
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
                const w = m.doc.resolve(y).blockRange();
                if (w) {
                  const T = [
                    { type: p, attrs: {} },
                    { type: g, attrs: { checked: f } }
                  ];
                  m.wrap(w, T), e.view.dispatch(m);
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
function CC({
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
          isValidTag: un,
          normalizeTag: Gn,
          parseDateFromMarkdown: Bt,
          getDateVariant: Ma
        }, g = wC(r.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(g);
        });
      }
      o(d), n.current = d, i?.(d);
    }
  }, [e, t, i]);
}
const EC = 200;
function MC(e, t = {}) {
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
  }), a = j(null), c = j(""), l = F((d) => {
    const u = d.trim(), f = u.length > 0 ? u.split(/\s+/).filter((v) => v.length > 0).length : 0, p = u.replace(/\s/g, "").length, g = d.length;
    let m = 0, y = 0;
    r && (m = u.length > 0 ? u.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, y = u.length > 0 ? (u.match(/[.!?]+/g) || []).length : 0);
    const b = Math.max(1, Math.ceil(f / EC));
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
  return K(() => {
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
function TC({ status: e, lastSaved: t, className: n = "" }) {
  const r = (o) => {
    if (!o) return "";
    const i = (/* @__PURE__ */ new Date()).getTime() - o.getTime(), a = Math.floor(i / 1e3), c = Math.floor(a / 60), l = Math.floor(c / 60);
    return a < 10 ? "Just now" : a < 60 ? `${a}s ago` : c < 60 ? `${c}m ago` : l < 24 ? `${l}h ago` : o.toLocaleDateString();
  };
  return /* @__PURE__ */ A(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ A(be, { children: [
          /* @__PURE__ */ h(Mf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ A("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ A(be, { children: [
          /* @__PURE__ */ h(Tc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ h("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ A(be, { children: [
          /* @__PURE__ */ h(Cn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ h("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ A(be, { children: [
          /* @__PURE__ */ h(Tf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ h("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function SC({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ A(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ h(Sf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ h("span", { className: "text-sm recovery-banner-text", children: "Found unsaved content from the last session." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-6 py-2 text-sm font-medium rounded-md transition-colors duration-150",
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
              children: /* @__PURE__ */ h(gt, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
function Yr(e) {
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
      let w;
      for (v.regex.lastIndex = 0; (w = v.regex.exec(a)) !== null; )
        m.push({
          start: c + w.index,
          end: c + w.index + w[0].length,
          type: v.type,
          content: w[0]
        });
    }
    m.sort((v, w) => v.start - w.start);
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
function sc(e) {
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
        p.start > f && (o += Ft(e.substring(f, p.start))), o += `<span class="${sc(p.type)}">${Ft(p.content)}</span>`, f = p.end;
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
      p.start > f && (o += ms(e, f, p.start, null, a)), o += ms(e, p.start, p.end, sc(p.type), a), f = p.end;
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
function NC({
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
  const l = j(null), d = j(null), u = j(null), f = j(null), p = 5e3, g = 80, [m, y] = Y(() => {
    const x = Yr(e);
    return Vr(e, x, i, a);
  }), b = j(null), v = Nt(() => {
    if (e.length <= p) {
      const x = Yr(e), D = Vr(e, x, i, a);
      return b.current && (clearTimeout(b.current), b.current = null), D;
    }
    return null;
  }, [e, i, a]);
  K(() => {
    if (e.length <= p) {
      const x = Yr(e);
      y(Vr(e, x, i, a));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const x = Yr(e);
      y(Vr(e, x, i, a)), b.current = null;
    }, g), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, i, a]);
  const w = v ?? m, T = F(() => {
    const x = l.current, D = d.current, C = u.current;
    if (x) {
      const N = C?.parentElement, L = N ? N.clientHeight : 200;
      x.style.height = "auto";
      const O = Math.max(x.scrollHeight, L, 200);
      x.style.height = `${O}px`, D && (D.style.height = `${O}px`);
    }
  }, []);
  K(() => {
    const x = l.current;
    if (!x) return;
    const D = (C) => {
      const N = x.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: L, scrollHeight: O, clientHeight: _ } = N, $ = L <= 0, z = L + _ >= O - 1;
      (C.deltaY > 0 && !z || C.deltaY < 0 && !$) && (C.preventDefault(), N.scrollTop += C.deltaY);
    };
    return x.addEventListener("wheel", D, { passive: !1 }), () => x.removeEventListener("wheel", D);
  }, []);
  const k = F(() => {
  }, []);
  K(() => {
    T();
  }, [e, T]), K(() => {
    o && l.current && l.current.focus();
  }, [o]), K(() => {
    if (f.current && l.current) {
      const { start: x, end: D } = f.current;
      l.current.selectionStart = x, l.current.selectionEnd = D, f.current = null;
    }
  }, [e]);
  const E = F((x) => {
    const D = x.target;
    f.current = {
      start: D.selectionStart,
      end: D.selectionEnd
    }, t(D.value);
  }, [t]), M = F((x) => {
    const D = x.currentTarget, C = D.selectionStart, N = D.selectionEnd, L = D.value, O = C !== N;
    if (c) {
      if (x.key === "`" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), O) {
          const _ = L.substring(C, N), $ = L.substring(0, C) + "`" + _ + "`" + L.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t($);
        } else if (L[C] === "`")
          f.current = { start: C + 1, end: C + 1 }, t(L), D.selectionStart = D.selectionEnd = C + 1;
        else {
          const _ = L.substring(0, C) + "``" + L.substring(N);
          f.current = { start: C + 1, end: C + 1 }, t(_);
        }
        return;
      }
      if (x.key === "*" && !x.ctrlKey && !x.metaKey) {
        if (L[C - 1] === "*" && L[C], O) {
          x.preventDefault();
          const z = L.substring(C, N), V = L.substring(0, C) + "*" + z + "*" + L.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(V);
          return;
        }
        if (L[C] === "*") {
          x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        x.preventDefault();
        const $ = L.substring(0, C) + "**" + L.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t($);
        return;
      }
      if (x.key === "_" && !x.ctrlKey && !x.metaKey) {
        if (O) {
          x.preventDefault();
          const $ = L.substring(C, N), z = L.substring(0, C) + "_" + $ + "_" + L.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(z);
          return;
        }
        if (L[C] === "_") {
          x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        x.preventDefault();
        const _ = L.substring(0, C) + "__" + L.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t(_);
        return;
      }
      if (x.key === "~" && !x.ctrlKey && !x.metaKey) {
        if (O) {
          x.preventDefault();
          const $ = L.substring(C, N), z = L.substring(0, C) + "~" + $ + "~" + L.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(z);
          return;
        }
        if (L[C] === "~") {
          x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        x.preventDefault();
        const _ = L.substring(0, C) + "~~" + L.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t(_);
        return;
      }
      if (x.key === "[" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), O) {
          const _ = L.substring(C, N), $ = L.substring(0, C) + "[" + _ + "]()" + L.substring(N);
          f.current = { start: N + 3, end: N + 3 }, t($);
        } else {
          const _ = L.substring(0, C) + "[]()" + L.substring(N);
          f.current = { start: C + 1, end: C + 1 }, t(_);
        }
        return;
      }
      if (x.key === "]" && !x.ctrlKey && !x.metaKey && L[C] === "]") {
        x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
        return;
      }
      if (x.key === ")" && !x.ctrlKey && !x.metaKey && L[C] === ")") {
        x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
        return;
      }
      if (x.key === "Backspace" && !O && C > 0) {
        const _ = L[C - 1], $ = L[C], z = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [V, I] of z)
          if (_ === V && $ === I) {
            x.preventDefault();
            const W = L.substring(0, C - 1) + L.substring(C + 1);
            f.current = { start: C - 1, end: C - 1 }, t(W);
            return;
          }
        if (_ === "[" && L.substring(C, C + 3) === "]()") {
          x.preventDefault();
          const V = L.substring(0, C - 1) + L.substring(C + 3);
          f.current = { start: C - 1, end: C - 1 }, t(V);
          return;
        }
      }
    }
    if (x.key === "Tab")
      if (x.preventDefault(), x.shiftKey) {
        const _ = L.substring(0, C), $ = L.substring(C, N), z = L.substring(N), I = _.lastIndexOf(`
`) + 1, W = _.substring(0, I), q = _.substring(I), J = (q + $).split(`
`), te = J.map((R) => R.startsWith("  ") ? R.substring(2) : R.startsWith("	") ? R.substring(1) : R), B = W + te.join(`
`) + z, H = (q + $).length - te.join(`
`).length;
        f.current = {
          start: Math.max(I, C - (J[0].length - te[0].length)),
          end: N - H
        }, t(B);
      } else if (C === N) {
        const _ = L.substring(0, C) + "  " + L.substring(N);
        f.current = { start: C + 2, end: C + 2 }, t(_);
      } else {
        const _ = L.substring(0, C), $ = L.substring(C, N), z = L.substring(N), I = _.lastIndexOf(`
`) + 1, W = _.substring(0, I), J = (_.substring(I) + $).split(`
`), te = J.map((H) => "  " + H), B = W + te.join(`
`) + z;
        f.current = {
          start: C + 2,
          end: N + J.length * 2
        }, t(B);
      }
  }, [t, c]);
  return /* @__PURE__ */ A("div", { ref: u, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ h(
      "div",
      {
        ref: d,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: w || `<span class="md-placeholder">${Ft(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ h(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: E,
        onKeyDown: M,
        onScroll: k,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let ac = 0, $s = 0, vu = 0;
function DC(e) {
  $s++, vu = e;
}
const LC = wt(function({
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
  }), c = j([]), l = j(performance.now()), d = j(0), u = j(0), f = j(0), p = j(0), [g, m] = Y(new Array(60).fill(0)), [y, b] = Y(new Array(60).fill(0));
  K(() => {
    if (!t || !r) return;
    const M = () => {
      const x = performance.now();
      queueMicrotask(() => {
        const D = performance.now() - x;
        DC(D);
      });
    };
    return r.on("transaction", M), () => {
      r.off("transaction", M);
    };
  }, [t, r]), K(() => {
    if (!t) return;
    let M = 0, x = performance.now(), D = 0;
    const C = (N) => {
      const L = N - l.current;
      if (l.current = N, c.current.push({ time: N, duration: L }), c.current.length > 120 && (c.current = c.current.slice(-120)), L > 16.67 && u.current++, M++, N - x >= 1e3) {
        D = M, M = 0, x = N;
        const O = c.current.slice(-60), _ = O.length > 0 ? O.reduce((te, B) => te + B.duration, 0) / O.length : 0, $ = O.length > 0 ? Math.max(...O.map((te) => te.duration)) : 0, z = performance.memory, V = z ? z.usedJSHeapSize / (1024 * 1024) : 0, I = z ? z.jsHeapSizeLimit / (1024 * 1024) : 0, W = document.querySelectorAll("*").length, q = ac - f.current, J = $s - p.current;
        f.current = ac, p.current = $s, a({
          fps: D,
          frameTime: Math.round(_ * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(V * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: q,
          transactionCount: J,
          lastTransactionTime: Math.round(vu * 100) / 100,
          domNodes: W,
          longFrames: u.current
        }), m((te) => [...te.slice(1), D]), b((te) => [...te.slice(1), _]), u.current = 0;
      }
      d.current = requestAnimationFrame(C);
    };
    return d.current = requestAnimationFrame(C), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const v = F(() => {
    n?.();
  }, [n]), w = F(() => {
    s((M) => !M);
  }, []);
  if (!t) return null;
  const T = (M) => M >= 55 ? "#4ade80" : M >= 30 ? "#fbbf24" : "#f87171", k = (M) => M <= 16.67 ? "#4ade80" : M <= 33.33 ? "#fbbf24" : "#f87171", E = (M, x, D) => {
    const L = M.map((O, _) => {
      const $ = _ / (M.length - 1) * 120, z = 24 - Math.min(O, x) / x * 24;
      return `${$},${z}`;
    }).join(" ");
    return /* @__PURE__ */ h("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ h(
      "polyline",
      {
        points: L,
        fill: "none",
        stroke: D,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ A("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ A("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ A("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ h(Nf, { size: 14 }),
        /* @__PURE__ */ h("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ h("button", { onClick: w, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ h(Sc, { size: 12 }) : /* @__PURE__ */ h(Nc, { size: 12 }) }),
        /* @__PURE__ */ h("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ h(gt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ A("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ h("span", { className: "perf-value", style: { color: T(i.fps) }, children: i.fps })
        ] }),
        E(g, 70, T(i.fps))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ A("span", { className: "perf-value", style: { color: k(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ h("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", style: { color: k(i.frameTimeMax) }, children: [
            i.frameTimeMax,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ A("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", style: { color: i.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            i.longFrames,
            "/s"
          ] })
        ] }),
        E(y, 50, k(i.frameTime))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.renderCount })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.transactionCount })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ h("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.domNodes.toLocaleString() })
        ] }),
        i.memoryTotal > 0 && /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Memory" }),
          /* @__PURE__ */ A("span", { className: "perf-value", children: [
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
class AC extends tf {
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
      return /* @__PURE__ */ h("div", { className: ie("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ A("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ h("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ h(Df, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ A("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ h("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ h("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ A(
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
          s && this.props.onClearContent && /* @__PURE__ */ A(
            Ut,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ h(fn, { className: "w-4 h-4" }),
                "Clear Content & Retry"
              ]
            }
          )
        ] }),
        t && /* @__PURE__ */ A("div", { className: "w-full max-w-xs", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: this.toggleDetails,
              className: ie(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ h(vn, { className: "w-3 h-3" }) : /* @__PURE__ */ h(Lf, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ A("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ h("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ A(be, { children: [
                    /* @__PURE__ */ h(Af, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ h("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ A(be, { children: [
                    /* @__PURE__ */ h(xn, { className: "w-3 h-3" }),
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
function IC({ className: e = "", theme: t }) {
  const n = (r) => ({
    height: "1rem",
    width: r,
    borderRadius: "0.25rem",
    background: "var(--color-muted, #e5e7eb)",
    opacity: 0.5,
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  });
  return /* @__PURE__ */ h("div", { className: `markdown-editor-container ${e}`, "data-theme": t, children: /* @__PURE__ */ A(
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
function RC({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ A("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ h(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ h(If, {})
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
function It({
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
  return Xf(
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
const Be = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ h(
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
), gs = () => /* @__PURE__ */ h("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), ic = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], PC = wt(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = Y(!1), d = j(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = ic.find((g) => g.value === u)?.shortLabel || "P";
  K(() => {
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
  return /* @__PURE__ */ A("div", { ref: d, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ A(
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
          /* @__PURE__ */ h(vn, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
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
        children: ic.map((g) => {
          const m = g.value === u;
          return /* @__PURE__ */ A(
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
}), OC = wt(function({ onCopy: t, iconSize: n }) {
  const [r, o] = Y(!1), s = j(null);
  K(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const i = F((a) => {
    a.preventDefault(), a.stopPropagation(), t(), o(!0), s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 1500);
  }, [t]);
  return /* @__PURE__ */ h(
    Be,
    {
      onMouseDown: i,
      title: r ? "Copied!" : "Copy as Markdown",
      children: r ? /* @__PURE__ */ h(Cn, { size: n, className: "text-green-500" }) : /* @__PURE__ */ h(xn, { size: n })
    }
  );
}), _C = wt(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s, onCopySelectionAsMarkdown: i }) {
  const a = j(null), c = mc({
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
  }), [l, d] = Y(!1), [u, f] = Y(""), [p, g] = Y(!1), [m, y] = Y({ top: 0, left: 0 }), b = j(null), v = j(null), w = j(null), T = F(() => {
    if (u) {
      let C = u.trim();
      !/^https?:\/\//i.test(C) && !C.startsWith("mailto:") && (C = "https://" + C), t.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    d(!1), f("");
  }, [t, u]), k = (C) => {
    C.preventDefault(), C.stopPropagation();
    const N = t.getAttributes("link").href;
    f(N || ""), d(!0);
  }, E = F((C, N) => {
    C.preventDefault(), C.stopPropagation(), N();
  }, []);
  K(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: N } = t.state, { empty: L, from: O, to: _ } = N, V = ("node" in N && N.node ? N.node : null)?.type?.name === "resizableImage";
          if (L || V || t.isActive("codeBlock")) {
            w.current && (clearTimeout(w.current), w.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              g(!1), d(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const I = t.view.coordsAtPos(O), W = t.view.coordsAtPos(_), q = b.current?.offsetWidth || 500, J = b.current?.offsetHeight || 40, te = 8, B = window.innerWidth;
          let H = 0, R = 0;
          if (b.current) {
            const re = b.current.closest('[data-slot="dialog-content"]');
            if (re) {
              const fe = re.getBoundingClientRect();
              H = fe.left, R = fe.top;
            }
          }
          let P = (I.left + W.left) / 2 - q / 2 - H;
          const X = H ? B - H : B;
          P = Math.max(te, Math.min(X - q - te, P));
          let ee = I.top - J - 10 - R;
          ee < te && (ee = W.bottom + 10 - R), p ? y({ top: Math.max(te, ee), left: P }) : (w.current && clearTimeout(w.current), w.current = setTimeout(() => {
            y({ top: Math.max(te, ee), left: P }), g(!0);
          }, 50));
        } catch (N) {
          console.warn("FloatingToolbar: Error updating position", N);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), v.current && clearTimeout(v.current), w.current && clearTimeout(w.current);
    };
  }, [t, p]), K(() => {
    if (!p || !t || t.isDestroyed) return;
    const C = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!C) return;
    const N = () => {
      g(!1), d(!1);
    };
    return C.addEventListener("scroll", N, { passive: !0 }), window.addEventListener("scroll", N, { passive: !0 }), () => {
      C.removeEventListener("scroll", N), window.removeEventListener("scroll", N);
    };
  }, [p, t]);
  const M = (C) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!p || r)
    return null;
  const x = 15, D = l ? /* @__PURE__ */ h(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: m.top,
        left: m.left
      },
      onMouseDown: M,
      children: /* @__PURE__ */ A("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
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
        /* @__PURE__ */ A("div", { className: "flex gap-2", children: [
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
  ) : /* @__PURE__ */ A(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: m.top,
        left: m.left
      },
      onMouseDown: M,
      children: [
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBold().run()),
            isActive: c?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ h(zs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleItalic().run()),
            isActive: c?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ h(Fs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: c?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ h(Us, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleStrike().run()),
            isActive: c?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ h(js, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleCode().run()),
            isActive: c?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ h(bc, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: c?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ h(wc, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: k,
            isActive: c?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ h(Ys, { size: x })
          }
        ),
        /* @__PURE__ */ h(gs, {}),
        /* @__PURE__ */ h(
          PC,
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
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: c?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ h(qs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: c?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ h(Vs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: c?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ h(Ks, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: c?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ h(Gs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Be,
          {
            onMouseDown: (C) => E(C, () => Js(t)),
            isActive: c?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ h(kc, { size: x })
          }
        ),
        i && /* @__PURE__ */ A(be, { children: [
          /* @__PURE__ */ h(gs, {}),
          /* @__PURE__ */ h(OC, { onCopy: i, iconSize: x })
        ] }),
        o && /* @__PURE__ */ A(be, { children: [
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
              children: /* @__PURE__ */ h(go, { size: x })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ h(It, { onMouseDown: M, children: D });
});
function $C({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = Y(""), s = j(null), i = j(null), [a, c] = Y({ top: 0, left: 0 });
  K(() => {
    if (t) {
      const g = e.getAttributes("link").href || "";
      o(g);
      try {
        const { view: m } = e, { from: y } = m.state.selection, b = m.coordsAtPos(y), v = b.bottom + 8, w = Math.max(16, Math.min(b.left, window.innerWidth - 420));
        c({ top: v, left: w });
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
      children: /* @__PURE__ */ A("form", { onSubmit: l, className: "link-popover-form", children: [
        /* @__PURE__ */ A("div", { className: "link-popover-input-wrapper", children: [
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
  return /* @__PURE__ */ h(It, { children: p });
}
function HC() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function BC({ editor: e, onEditLink: t }) {
  const [n, r] = Y({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = j(null), s = j(null), i = j(null), a = j(null), c = F((M) => {
    if (!(!e || e.isDestroyed))
      try {
        const x = M.getAttribute("href") || "", D = M.getBoundingClientRect(), C = 44, N = 8, _ = D.top >= C + N ? D.top - C - N : D.bottom + N, $ = Math.max(16, Math.min(D.left, window.innerWidth - 340));
        a.current = M, r({
          isVisible: !0,
          url: x,
          position: { top: _, left: $ },
          linkElement: M
        });
      } catch (x) {
        console.warn("LinkHoverTooltip: Error showing tooltip", x);
      }
  }, [e]), l = F((M) => {
    if (!(!e || e.isDestroyed)) {
      if (s.current && (clearTimeout(s.current), s.current = null), i.current && (clearTimeout(i.current), i.current = null), a.current && a.current !== M && n.isVisible) {
        i.current = setTimeout(() => {
          i.current = null, c(M);
        }, 200);
        return;
      }
      c(M);
    }
  }, [e, n.isVisible, c]), d = F(() => {
    s.current = setTimeout(() => {
      a.current = null, r((M) => ({ ...M, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), u = F(() => {
    s.current && (clearTimeout(s.current), s.current = null), i.current && (clearTimeout(i.current), i.current = null), a.current = null, r((M) => ({ ...M, isVisible: !1, linkElement: null }));
  }, []), f = F(() => {
    s.current && (clearTimeout(s.current), s.current = null), i.current && (clearTimeout(i.current), i.current = null);
  }, []);
  K(() => {
    if (!e || e.isDestroyed) return;
    const M = e.view.dom;
    if (!M) return;
    const x = (C) => {
      const L = C.target.closest("a");
      L && M.contains(L) && l(L);
    }, D = (C) => {
      const N = C.target, L = C.relatedTarget;
      if (N.closest("a")) {
        if (L && o.current?.contains(L))
          return;
        d();
      }
    };
    return M.addEventListener("mouseover", x), M.addEventListener("mouseout", D), () => {
      M.removeEventListener("mouseover", x), M.removeEventListener("mouseout", D), s.current && clearTimeout(s.current), i.current && clearTimeout(i.current);
    };
  }, [e, l, d]), K(() => {
    if (!e || e.isDestroyed) return;
    const M = e.view.dom;
    if (!M) return;
    const x = (D) => {
      const N = D.target.closest("a");
      if (N && M.contains(N)) {
        if (a.current === N && n.isVisible)
          return;
        D.preventDefault(), D.stopPropagation(), l(N);
      }
    };
    return M.addEventListener("touchend", x, { capture: !0 }), () => {
      M.removeEventListener("touchend", x, { capture: !0 });
    };
  }, [e, l, n.isVisible]), K(() => {
    if (!n.isVisible || !HC()) return;
    const M = (D) => {
      const C = D.target;
      o.current?.contains(C) || a.current && a.current.contains(C) || u();
    }, x = setTimeout(() => {
      document.addEventListener("touchstart", M, { passive: !0 });
    }, 100);
    return () => {
      clearTimeout(x), document.removeEventListener("touchstart", M);
    };
  }, [n.isVisible, u]), K(() => {
    if (!n.isVisible) return;
    const M = () => {
      u();
    }, x = e.view.dom.closest(".editor-content-wrapper");
    return x?.addEventListener("scroll", M), window.addEventListener("scroll", M, !0), () => {
      x?.removeEventListener("scroll", M), window.removeEventListener("scroll", M, !0);
    };
  }, [n.isVisible, e, u]);
  const [p, g] = Y(!1), m = F(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      g(!0), setTimeout(() => g(!1), 1500);
    });
  }, [n.url]), y = F(() => {
    if (n.url) {
      const M = window.webkit?.messageHandlers?.openURL;
      if (M)
        M.postMessage(n.url);
      else {
        const x = document.createElement("a");
        x.href = n.url, x.target = "_blank", x.rel = "noopener noreferrer", x.click();
      }
    }
  }, [n.url]), b = F(() => {
    if (n.linkElement) {
      const { view: M } = e, { doc: x } = M.state;
      let D = null, C = null;
      x.descendants((N, L) => {
        if (N.isText && N.marks.some((O) => O.type.name === "link")) {
          const O = M.nodeDOM(L);
          if (O && (O === n.linkElement || O.parentElement === n.linkElement))
            return D = L, C = L + N.nodeSize, !1;
        }
        return !0;
      }), D !== null && C !== null ? e.chain().focus().setTextSelection({ from: D, to: C }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((M) => ({ ...M, isVisible: !1 }));
  }, [e, n.linkElement]), v = F(() => {
    if (n.linkElement) {
      const { view: M } = e, { doc: x } = M.state;
      x.descendants((D, C) => {
        if (D.isText && D.marks.some((N) => N.type.name === "link")) {
          const N = M.nodeDOM(C);
          if (N && (N === n.linkElement || N.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: C, to: C + D.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((M) => ({ ...M, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const w = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, k = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", E = /* @__PURE__ */ h(
    "div",
    {
      ref: o,
      className: "link-hover-tooltip",
      "data-theme": k,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`
      },
      onMouseEnter: f,
      onMouseLeave: d,
      children: /* @__PURE__ */ A("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ A(
          "button",
          {
            onClick: y,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ h(Rf, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ h("span", { className: "link-hover-tooltip-url", children: w || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ A("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: v,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ h(Pf, { size: 14 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: m,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: p ? /* @__PURE__ */ h(Cn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ h(xn, { size: 14 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: b,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ h(Of, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ h(It, { children: E });
}
const WC = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ h(mo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ h(_f, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ h($f, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ h(Hf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ h(Bf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ h(Wf, { size: 16 }),
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
    icon: /* @__PURE__ */ h(zf, { size: 16 }),
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
    icon: /* @__PURE__ */ h(Ff, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ h(Uf, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ h(Cc, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ h(Ec, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ h(Mc, { size: 16, className: "text-cyan-400" }),
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
], zC = 32, FC = 8, UC = 320, jC = 210, Kr = 12;
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
function YC({ editor: e }) {
  const [t, n] = Y(!1), [r, o] = Y(""), [s, i] = Y(0), [a, c] = Y(null), [l, d] = Y(!1), [u, f] = Y({ top: 0, left: 0 }), [p, g] = Y("below"), m = j(null), y = j(-1), b = j(!1);
  K(() => {
    b.current = t;
  }, [t]);
  const v = WC.filter((D) => {
    if (!r) return !0;
    const C = r.toLowerCase();
    return D.title.toLowerCase().includes(C) || D.keywords?.some((N) => N.includes(C));
  }), w = Math.min(
    v.length * zC + FC,
    UC
  );
  ho(() => {
    if (!t || !a) return;
    const { top: D, bottom: C, left: N } = a, L = window.innerHeight, O = window.innerWidth, _ = L - C - Kr, $ = D - Kr;
    let z;
    if (_ >= w ? z = "below" : $ >= w ? z = "above" : z = _ >= $ ? "below" : "above", g(z), m.current) {
      const V = Math.max(
        Kr,
        Math.min(N, O - jC - Kr)
      ), I = z === "below" ? C + 4 : D - w - 4;
      m.current.style.top = `${I}px`, m.current.style.left = `${V}px`;
    }
  }, [t, a, w, v.length]);
  const T = F(() => {
    const { state: D } = e, { selection: C } = D, N = C.from, L = y.current;
    if (L >= 0 && L <= N)
      e.chain().focus().deleteRange({ from: L, to: N }).run();
    else {
      const { $from: O } = C, $ = O.parent.textBetween(0, O.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const z = O.pos - (O.parentOffset - $);
        e.chain().focus().deleteRange({ from: z, to: O.pos }).run();
      }
    }
  }, [e]), k = F(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), E = F((D) => {
    const C = v[D];
    if (C) {
      if (T(), C.isImageCommand) {
        const { state: N } = e, L = e.view.coordsAtPos(N.selection.from);
        f({
          top: L.bottom + 8,
          left: L.left
        }), d(!0);
      } else
        C.command(e);
      k();
    }
  }, [e, v, T, k]), M = F((D, C) => {
    e.chain().focus().setImage({ src: D, alt: C }).run();
  }, [e]);
  return K(() => {
    if (!e) return;
    const D = () => {
      if (b.current) return;
      const { state: C } = e, { selection: N } = C, { $from: L } = N;
      if (L.parentOffset === 0) return;
      const O = L.parent.textBetween(0, L.parentOffset, void 0, "￼");
      if (!O.endsWith("/")) return;
      const _ = O.length > 1 ? O.slice(-2, -1) : "";
      if (_ && _ !== " " && _ !== `
`) return;
      y.current = L.pos - 1;
      const $ = cc(e);
      $ && (c($), n(!0), o(""), i(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), K(() => {
    if (!e || !t) return;
    const D = e.view.dom, C = (N) => {
      b.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((L) => (L + 1) % v.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((L) => (L - 1 + v.length) % v.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), E(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), k()));
    };
    return D.addEventListener("keydown", C, !0), () => {
      D.removeEventListener("keydown", C, !0);
    };
  }, [e, t, s, v, E, k]), K(() => {
    if (!e || !t) return;
    const D = () => {
      if (!b.current || y.current < 0) return;
      const { state: C } = e, { selection: N } = C, L = N.from, O = y.current;
      if (L <= O) {
        k();
        return;
      }
      try {
        const _ = C.doc.textBetween(O + 1, L, void 0, "￼");
        if (_.includes(`
`)) {
          k();
          return;
        }
        o(_), i(0);
        const $ = cc(e);
        $ && c($);
      } catch {
        k();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, t, k]), K(() => {
    if (!t) return;
    const D = (C) => {
      m.current && !m.current.contains(C.target) && k();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [t, k]), K(() => {
    t && v.length === 0 && r.length > 2 && k();
  }, [t, v.length, r, k]), K(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), K(() => {
    if (!t || !m.current) return;
    const D = m.current.querySelector(".slash-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ h(
    Hc,
    {
      isOpen: l,
      onClose: () => d(!1),
      onInsert: M,
      position: u
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ h(It, { children: /* @__PURE__ */ h(
    "div",
    {
      ref: m,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((D, C) => /* @__PURE__ */ A(
        "div",
        {
          className: `slash-item ${C === s ? "is-selected" : ""}`,
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation(), E(C);
          },
          onMouseEnter: () => i(C),
          children: [
            /* @__PURE__ */ h("span", { className: "slash-icon", children: D.icon }),
            /* @__PURE__ */ h("span", { className: "slash-label", children: D.title })
          ]
        },
        D.title
      ))
    }
  ) });
}
const VC = 340, KC = 36, GC = 8, qC = 240, Gr = 8;
function lc(e) {
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
function XC({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = Y(!1), [s, i] = Y(""), [a, c] = Y([]), [l, d] = Y(0), [u, f] = Y(null), [p, g] = Y("below"), [m, y] = Y(!1), b = j(!1), v = j(null), w = j(-1), T = j(null);
  K(() => {
    b.current = r;
  }, [r]);
  const k = F(() => {
    o(!1), i(""), c([]), d(0), w.current = -1;
  }, []), E = F((N) => {
    const L = w.current;
    if (L < 0) return;
    const { state: O } = e, _ = O.selection.from;
    try {
      const $ = O.tr.delete(L, _), z = O.schema.marks.wikiLink;
      if (z) {
        const V = z.create({ pageName: N }), I = O.schema.text(N, [V]);
        $.insert(L, I);
        const W = L + N.length;
        $.setSelection(Ke.create($.doc, W)), $.removeStoredMark(z);
      } else
        $.insertText(`[[${N}]]`, L);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
    }
    k();
  }, [e, k]);
  K(() => {
    if (!e) return;
    const N = () => {
      if (b.current) return;
      const { state: L } = e, { selection: O } = L, { $from: _ } = O;
      if (_.parentOffset < 2 || !_.parent.textBetween(0, _.parentOffset, void 0, "￼").endsWith("[[")) return;
      w.current = _.pos - 2;
      const z = lc(e);
      z && (f(z), o(!0), i(""), c([]), d(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), K(() => {
    if (!e || !r) return;
    const N = e.view.dom, L = (O) => {
      if (b.current) {
        if (O.key === "ArrowDown") {
          O.preventDefault();
          const _ = a.length + (s.trim() ? 1 : 0) - 1;
          d(($) => Math.min($ + 1, _));
          return;
        }
        if (O.key === "ArrowUp") {
          O.preventDefault(), d((_) => Math.max(_ - 1, 0));
          return;
        }
        if (O.key === "Enter" || O.key === "Tab") {
          O.preventDefault(), O.stopPropagation(), l < a.length ? E(a[l].title) : s.trim() && n ? (n(s.trim()), k()) : s.trim() && E(s.trim());
          return;
        }
        if (O.key === "Escape") {
          O.preventDefault(), k();
          return;
        }
        O.key === "]" && setTimeout(() => {
          const { state: _ } = e, { $from: $ } = _.selection;
          $.parent.textBetween(0, $.parentOffset, void 0, "￼").endsWith("]]") && k();
        }, 0);
      }
    };
    return N.addEventListener("keydown", L, !0), () => {
      N.removeEventListener("keydown", L, !0);
    };
  }, [e, r, a, l, s, E, k, n]), K(() => {
    if (!e || !r) return;
    const N = () => {
      const L = w.current;
      if (L < 0) {
        k();
        return;
      }
      const { state: O } = e, _ = O.selection.from;
      if (_ <= L) {
        k();
        return;
      }
      try {
        const $ = O.doc.textBetween(L + 2, _, void 0, "￼");
        if ($.includes(`
`) || $.includes("]]")) {
          k();
          return;
        }
        i($), d(0);
        const z = lc(e);
        z && f(z);
      } catch {
        k();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, k]), K(() => {
    if (r) {
      if (T.current && clearTimeout(T.current), !s.trim()) {
        y(!0), T.current = setTimeout(async () => {
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
      return y(!0), T.current = setTimeout(async () => {
        try {
          const N = await t(s.trim());
          c(N);
        } catch {
          c([]);
        }
        y(!1);
      }, 150), () => {
        T.current && clearTimeout(T.current);
      };
    }
  }, [r, s, t]), K(() => {
    if (!r) return;
    const N = (L) => {
      v.current && !v.current.contains(L.target) && k();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, k]), K(() => {
    if (!r || !v.current) return;
    const N = v.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const M = a.length + (s.trim() ? 1 : 0), x = Math.min(
    Math.max(M, 1) * KC + GC,
    qC
  );
  if (ho(() => {
    if (!r || !u) return;
    const { top: N, bottom: L, left: O } = u, _ = window.innerHeight, $ = window.innerWidth, z = _ - L - Gr, V = N - Gr;
    let I;
    if (z >= x ? I = "below" : V >= x ? I = "above" : I = z >= V ? "below" : "above", g(I), v.current) {
      const W = Math.max(
        Gr,
        Math.min(O, $ - VC - Gr)
      ), q = I === "below" ? L + 4 : N - x - 4;
      v.current.style.top = `${q}px`, v.current.style.left = `${W}px`;
    }
  }, [r, u, x, M]), !r) return null;
  const D = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ h(It, { children: /* @__PURE__ */ A(
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
        a.map((N, L) => /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item ${L === l ? "is-selected" : ""}`,
            onMouseDown: (O) => {
              O.preventDefault(), E(N.title);
            },
            onMouseEnter: () => d(L),
            children: [
              /* @__PURE__ */ h("span", { className: "wikilink-icon", children: /* @__PURE__ */ h(Qs, { size: 14 }) }),
              /* @__PURE__ */ h("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ h("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        D && /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), k()) : E(s.trim());
            },
            onMouseEnter: () => d(a.length),
            children: [
              /* @__PURE__ */ h("span", { className: "wikilink-icon", children: /* @__PURE__ */ h(Xs, { size: 14 }) }),
              /* @__PURE__ */ A("span", { className: "wikilink-label", children: [
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
function ZC({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = Y(e), [c, l] = Y(t), d = j(null), u = j(null);
  K(() => {
    u.current?.focus(), u.current?.select();
  }, []), K(() => {
    const y = (v) => {
      d.current && !d.current.contains(v.target) && s();
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
    let w = n.x - 160, T = n.y + 10;
    return w + 320 > window.innerWidth - 16 && (w = window.innerWidth - 320 - 16), w < 16 && (w = 16), T + 280 > window.innerHeight - 16 && (T = n.y - 280 - 10), T < 16 && (T = 16), { left: w, top: T };
  })(), m = /* @__PURE__ */ A(
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
        /* @__PURE__ */ A("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ h("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ h(gt, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ A("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ A("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ h(Ys, { className: "w-3.5 h-3.5" }),
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
          /* @__PURE__ */ A("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ A("label", { className: "image-edit-popover-label", children: [
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
        /* @__PURE__ */ A("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ h(fn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ A("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ h(
              "button",
              {
                onClick: s,
                className: "image-edit-popover-btn image-edit-popover-btn-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ A(
              "button",
              {
                onClick: f,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !i.trim(),
                children: [
                  /* @__PURE__ */ h(Cn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ h(It, { children: m });
}
function QC({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = Y(!1), [o, s] = Y(0), i = F((d) => {
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
  return K(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", i), d.addEventListener("dragleave", a), d.addEventListener("dragover", c), d.addEventListener("drop", l), () => {
      d.removeEventListener("dragenter", i), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", c), d.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ h("div", { className: "image-drop-zone", children: /* @__PURE__ */ A("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ h("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ h(jf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ A("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ h("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ h("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
const JC = {
  SpellCheck: Vf,
  RefreshCw: Yf,
  Minimize2: Nc,
  Maximize2: Sc,
  FileText: Qs,
  MessageSquare: Dc,
  Sparkles: go
};
function e1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = Y(""), [a, c] = Y(!1), l = j(null), d = j(null), u = e.filter((y) => y.scope === t || y.scope === "both");
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
    a && d.current && d.current.focus();
  }, [a]);
  const p = F(() => {
    const b = u.length * 40 + (a ? 56 : 0) + 16, v = window.innerWidth, w = window.innerHeight;
    let T = o.top, k = o.left;
    return k + 260 > v - 8 && (k = v - 260 - 8), k < 8 && (k = 8), T + b > w - 8 && (T = o.top - b - 8), T < 8 && (T = 8), { top: T, left: k };
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
      children: /* @__PURE__ */ A(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-lg overflow-hidden
          w-[260px] py-1
          animate-in fade-in-0 zoom-in-95 duration-100
        `,
          children: [
            /* @__PURE__ */ h("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ A("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
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
              const b = y.icon ? JC[y.icon] : go;
              return /* @__PURE__ */ A(
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
  return /* @__PURE__ */ h(It, { onMouseDown: (y) => y.preventDefault(), children: m });
}
function t1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = j(null), a = j(null), [c, l] = Y(!1), [d, u] = Y(0);
  K(() => {
    if (i.current) {
      const k = new ResizeObserver((E) => {
        for (const M of E)
          u(M.contentRect.height);
      });
      return k.observe(i.current), () => k.disconnect();
    }
  }, []), K(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), K(() => {
    const k = (E) => {
      E.key === "Escape" && s();
    };
    return document.addEventListener("keydown", k), () => document.removeEventListener("keydown", k);
  }, [s]);
  const f = Nt(() => {
    const x = window.innerWidth, D = window.innerHeight;
    let C = t.selectionCenterX - 380 / 2;
    C + 380 > x - 8 && (C = x - 380 - 8), C < 8 && (C = 8);
    const N = D - t.selectionBottom - 8, L = t.selectionTop - 8, O = d || 200;
    let _, $ = !1;
    return N >= O || N >= L ? _ = t.selectionBottom + 8 : (_ = t.selectionTop - 8 - O, $ = !0), _ < 8 && (_ = 8), _ + O > D - 8 && (_ = D - O - 8), { top: _, left: C, placedAbove: $ };
  }, [t, d]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", m = e.status === "streaming", y = e.status === "complete", b = e.status === "error", v = F(() => {
    navigator.clipboard.writeText(p), l(!0), setTimeout(() => l(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const w = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", T = /* @__PURE__ */ h(
    "div",
    {
      ref: i,
      className: "ai-result-popover",
      style: {
        position: "fixed",
        top: f.top,
        left: f.left
      },
      children: /* @__PURE__ */ A(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-xl overflow-hidden
          w-[380px] max-w-[calc(100vw-16px)]
          ${w}
        `,
          children: [
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ A("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                m && /* @__PURE__ */ h(Tc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ h("span", { className: "font-medium", children: b ? "Error" : g }),
                m && /* @__PURE__ */ h("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ h(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (k) => {
                    k.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ h(gt, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ h(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: b ? /* @__PURE__ */ h("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ A("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  m && /* @__PURE__ */ h("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ A("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || b) && /* @__PURE__ */ A(be, { children: [
                y && /* @__PURE__ */ A(be, { children: [
                  /* @__PURE__ */ h(
                    ln,
                    {
                      icon: bs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ h(
                    ln,
                    {
                      icon: Xs,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ h(
                    ln,
                    {
                      icon: c ? Cn : xn,
                      label: c ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ h(
                  ln,
                  {
                    icon: Zs,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ h("div", { className: "flex-1" }),
                /* @__PURE__ */ h(
                  ln,
                  {
                    icon: gt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              m && /* @__PURE__ */ A(be, { children: [
                /* @__PURE__ */ h("div", { className: "flex-1" }),
                /* @__PURE__ */ h(
                  ln,
                  {
                    icon: gt,
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
  return /* @__PURE__ */ h(It, { onMouseDown: (k) => k.preventDefault(), children: T });
}
function ln({
  icon: e,
  label: t,
  onClick: n,
  primary: r = !1
}) {
  return /* @__PURE__ */ A(
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
function n1({
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
  onAIRetry: w,
  onAIDiscard: T,
  onLinkPopoverClose: k,
  onEditLink: E,
  onWikiLinkSearch: M,
  imageEditState: x,
  onImageSave: D,
  onImageDelete: C,
  onImageEditClose: N
}) {
  return /* @__PURE__ */ A(be, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ h(QC, { containerRef: r, enabled: o }),
    !t && s && /* @__PURE__ */ h(
      _C,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: i,
        aiEnabled: a || !!c,
        onAISparklesClick: (L) => l(L),
        onCopySelectionAsMarkdown: d
      }
    ),
    u && f && /* @__PURE__ */ h(
      e1,
      {
        actions: f,
        scope: u.scope,
        position: u.position,
        onAction: p,
        onClose: g
      }
    ),
    m.status !== "idle" && /* @__PURE__ */ h(
      t1,
      {
        state: m,
        position: y,
        onReplace: b,
        onInsert: v,
        onRetry: w,
        onDiscard: T
      }
    ),
    !n.slashCommands && /* @__PURE__ */ h(YC, { editor: e, disabledFeatures: n }),
    !n.wikiLinks && M && /* @__PURE__ */ h(XC, { editor: e, onSearch: M }),
    /* @__PURE__ */ h(
      $C,
      {
        editor: e,
        isOpen: i,
        onClose: k
      }
    ),
    /* @__PURE__ */ h(BC, { editor: e, onEditLink: E }),
    !n.images && x?.isOpen && /* @__PURE__ */ h(
      ZC,
      {
        src: x.src,
        alt: x.alt,
        position: x.position,
        onSave: D,
        onDelete: C,
        onClose: N
      }
    )
  ] });
}
function r1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function o1(e, t) {
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
function s1(e) {
  const [t, n] = nf(o1, { status: "idle" }), r = j(null), o = F(async (a, c, l, d, u) => {
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
const dc = rf(
  () => Promise.resolve().then(() => v1).then((e) => ({ default: e.TableOfContents }))
), a1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, sE = of(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  onDocUpdate: s,
  markdownChangeDebounceMs: i = 0,
  placeholder: a = 'Start writing... Use "/" for commands',
  editable: c = !0,
  autofocus: l = !1,
  className: d = "",
  showToolbar: u = !0,
  showWordCount: f = !0,
  wordCountDebounceMs: p = 1e3,
  theme: g,
  colorTheme: m = "colorful",
  autoSave: y = !0,
  autoSaveKey: b = "paragon-editor-content",
  autoSaveDelay: v = 1e3,
  showRecoveryBanner: w = !0,
  showFloatingToolbar: T = !0,
  maxImageSize: k = 5 * 1024 * 1024,
  onImageUploadStart: E,
  onImageUploadComplete: M,
  onImageUploadError: x,
  onImageUpload: D,
  resolveImageSrc: C,
  showModeToggle: N = !0,
  // New props
  initialMode: L = "wysiwyg",
  onModeChange: O,
  onReady: _,
  onFocus: $,
  onBlur: z,
  onSelectionChange: V,
  onDestroy: I,
  onSave: W,
  onRecover: q,
  onWikiLinkClick: J,
  validateWikiLink: te,
  onWikiLinkSearch: B,
  onLinkClick: H,
  findReplaceOpen: R,
  onFindReplaceChange: U,
  showCopyButton: P = !0,
  renderToolbar: X,
  renderFooter: ee,
  disabledFeatures: re = {},
  minHeight: fe = "200px",
  maxHeight: pe,
  spellCheck: Re = !0,
  headingLevels: et = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: qt = [1, 2, 3],
  // TOC props
  showTableOfContents: Xt = !1,
  tocVisible: An = !0,
  onTocVisibilityChange: ur,
  tocTitle: fr = "",
  tocMinLevel: pr = 1,
  tocMaxLevel: hr = 4,
  tocShowLevelIndicators: In = !1,
  tocHighlightActive: Zt = !0,
  tocTreeView: Qt = !1,
  tocWidth: mr = "240px",
  tocPosition: Jt = "right",
  tocScrollOffset: gr = 20,
  onTocItemClick: yr,
  renderTocItem: vr,
  tocShowToggleButton: br = !0,
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
  enableTagAutoDetect: Rn = !1,
  enableHexColorHighlight: $o = !1,
  enableCollapsibleHeadings: le = !1,
  enableCollapsibleLists: ye = !1,
  // Performance mode
  performanceMode: oe = "auto",
  // Error boundary
  onEditorError: me,
  // AI writing assistant
  aiActions: ke,
  onAIAction: ue,
  onAISetupRequired: en
}, Ho) {
  const [tn] = Y(() => a1()), [kt, Pn] = Y(L), [Ta, Bo] = Y(""), wr = j(L), kr = j(""), On = j(null), [Eu, Sa] = Y(0), xr = !!(ke && ke.length > 0 && ue), { state: je, executeAction: Cr, abort: Mu, reset: xt } = s1(ue), [Tu, Wo] = Y(null), [Su, Nu] = Y({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), Du = j(ue);
  Du.current = ue;
  const Na = j(en);
  Na.current = en;
  const [Lu, Au] = Y([]), [Iu, Ru] = Y(0), Pu = F((ae, Ee) => {
    Au(ae), Ru(Ee);
  }, []), Da = j(E), La = j(M), Aa = j(x), Ia = j(D), Ra = j(C), Pa = j(J), Oa = j(te), _a = j(B);
  Da.current = E, La.current = M, Aa.current = x, Ia.current = D, Ra.current = C, Pa.current = J, Oa.current = te, _a.current = B;
  const $a = 2e3, [zo, Ou] = Y(() => oe === "lightweight" ? !0 : oe === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > $a : !1), _u = j(0), Ha = j(zo);
  Ha.current = zo;
  const [Fo, Er] = Y(null), $u = oC({
    placeholder: a,
    isMobile: tn,
    maxImageSize: k,
    headingLevels: et,
    collapsibleHeadingLevels: qt,
    disabledFeatures: re,
    progressiveSelectAll: _o,
    enableCollapsibleHeadings: le,
    enableCollapsibleLists: ye,
    enableTagAutoDetect: Rn,
    enableHexColorHighlight: $o,
    isLightweight: zo,
    setImageEditState: Er,
    callbackRefs: {
      onImageUploadStart: Da,
      onImageUploadComplete: La,
      onImageUploadError: Aa,
      onImageUpload: Ia,
      resolveImageSrc: Ra,
      onWikiLinkClick: Pa,
      validateWikiLink: Oa
    }
  }), { editor: se, turndownService: Mr } = lC({
    extensions: $u,
    content: t,
    editable: c,
    autofocus: l,
    spellCheck: Re,
    initialMode: L,
    performanceMode: oe,
    lightweightThreshold: $a,
    onChange: n,
    onHTMLChange: r,
    onMarkdownChange: o,
    onDocUpdate: s,
    markdownChangeDebounceMs: i,
    onReady: _,
    onDestroy: I,
    onFocus: $,
    onBlur: z,
    onSelectionChange: V,
    onLinkClick: H,
    editorModeRef: wr,
    rawMarkdownRef: kr,
    setRawMarkdown: Bo,
    setIsLightweight: Ou,
    lightweightCheckCounterRef: _u,
    isLightweightRef: Ha
  }), [Hu, Tr] = Y(!1), [Bu, Wu] = Y(!1), zu = R !== void 0 ? R : Bu, Rt = F((ae) => {
    Wu(ae), U?.(ae);
  }, [U]), [Fu, Sr] = Y(0), [Uu, ju] = Y(""), Pt = cb(se, {
    storageKey: b,
    debounceMs: v,
    enabled: y,
    onSave: (ae) => {
      W?.(ae);
    },
    onRecover: (ae) => {
      q?.(ae);
    }
  }), Uo = CC({
    editor: se,
    turndownService: Mr,
    editorModeRef: wr,
    rawMarkdownRef: kr,
    setEditorMode: Pn,
    setRawMarkdown: Bo,
    onModeChange: O,
    enableTagAutoDetect: Rn,
    disabledFeatures: re
  }), Ba = F((ae) => {
    Bo(ae), kr.current = ae, o?.(ae);
  }, [o]), Nr = MC(se, {
    debounceMs: p,
    extendedStats: !1,
    enabled: f
  });
  db(Ho, {
    editor: se,
    turndownService: Mr,
    editorModeRef: wr,
    handleModeSwitch: Uo,
    wordCount: Nr,
    autoSaveState: Pt,
    setIsFindReplaceOpen: Rt,
    setFindReplaceFocusTrigger: Sr
  }), xC({
    editorModeRef: wr,
    rawMarkdownRef: kr,
    editorMode: kt,
    handleModeSwitch: Uo,
    setIsFindReplaceOpen: Rt,
    setFindReplaceFocusTrigger: Sr
  });
  const Yu = Nt(() => ({
    openLinkPopover: () => Tr(!0),
    openFindReplace: (ae) => {
      ae && ju(ae), Rt(!0), Sr((Ee) => Ee + 1);
    },
    openFindReplaceWithReplace: () => {
      Rt(!0);
    }
  }), [Rt]);
  kC(se, tn, Yu);
  const Wa = F((ae, Ee) => {
    if (!xr) {
      Na.current?.();
      return;
    }
    if (!se) return;
    let _e = { top: 0, left: 0 };
    if (Ee) {
      const Pe = Ee.getBoundingClientRect();
      _e = { top: Pe.bottom + 4, left: Pe.left };
    } else {
      const { from: Pe, to: tt } = se.state.selection, Ct = se.view.coordsAtPos(Pe), nn = se.view.coordsAtPos(tt);
      _e = { top: nn.bottom + 8, left: (Ct.left + nn.left) / 2 };
    }
    Wo({ scope: ae, position: _e });
  }, [xr, se]), Vu = F((ae, Ee) => {
    if (!se || !ke) return;
    const _e = ke.find((jo) => jo.id === ae);
    if (!_e) return;
    const { from: Pe, to: tt } = se.state.selection, Ct = Pe !== tt ? se.state.doc.textBetween(Pe, tt, `
`) : "", nn = _e.scope === "document" || !Ct ? se.getText() : Ct, Dr = se.view.coordsAtPos(Pe), _n = se.view.coordsAtPos(tt);
    Nu({
      selectionTop: Dr.top,
      selectionBottom: _n.bottom,
      selectionCenterX: (Dr.left + _n.right) / 2
    }), Wo(null), Cr(ae, _e.label, nn, { from: Pe, to: tt }, Ee);
  }, [se, ke, Cr]), Ku = F(() => {
    if (!se || je.status !== "complete") return;
    const { selectionRange: ae, result: Ee } = je;
    se.chain().focus().setTextSelection(ae).deleteSelection().insertContent(Ee).run(), xt();
  }, [se, je, xt]), Gu = F(() => {
    if (!se || je.status !== "complete") return;
    const { selectionRange: ae, result: Ee } = je;
    se.chain().focus().setTextSelection(ae.to).insertContent(`
` + Ee).run(), xt();
  }, [se, je, xt]), qu = F(() => {
    if (!(je.status !== "complete" && je.status !== "error"))
      if (je.status === "complete") {
        const { action: ae, actionLabel: Ee, inputText: _e, selectionRange: Pe } = je;
        xt(), Cr(ae, Ee, _e, Pe);
      } else
        xt();
  }, [je, xt, Cr]), za = F(() => {
    if (!se) return;
    const { from: ae, to: Ee, empty: _e } = se.state.selection;
    let Pe, tt;
    if (_e)
      Pe = se.getHTML(), tt = se.getText();
    else {
      const nn = se.state.doc.slice(ae, Ee), Dr = Ac.fromSchema(se.schema), _n = document.createElement("div"), jo = Dr.serializeFragment(nn.content);
      _n.appendChild(jo), Pe = _n.innerHTML, tt = se.state.doc.textBetween(ae, Ee, `
`);
    }
    let Ct = jt(Mr.turndown(Pe));
    _e && (Ct = Rs(Ct)), navigator.clipboard.writeText(Ct).then(() => {
      co(_e ? "Document copied as Markdown" : "Selection copied as Markdown");
    }).catch(() => {
      navigator.clipboard.writeText(tt).then(() => {
        co(_e ? "Document copied" : "Selection copied");
      });
    });
  }, [se, Mr]);
  if (K(() => {
    if (!g) return;
    const ae = document.documentElement;
    ae.setAttribute("data-theme", g), ae.classList.toggle("dark", g === "dark");
  }, [g]), !se)
    return /* @__PURE__ */ h(IC, { className: d, theme: g });
  const Fa = /* @__PURE__ */ h(
    nb,
    {
      editor: se,
      onCopyMarkdown: P ? za : void 0,
      onOpenLinkPopover: () => Tr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Rt(!0), Sr((ae) => ae + 1);
      },
      disabledFeatures: re,
      autoReorderChecklist: Oo,
      aiEnabled: xr || !!en,
      onAISparklesClick: (ae) => Wa("document", ae)
    }
  ), Ua = /* @__PURE__ */ A("div", { className: "editor-footer", children: [
    y && /* @__PURE__ */ h(
      TC,
      {
        status: Pt.status,
        lastSaved: Pt.lastSaved
      }
    ),
    /* @__PURE__ */ h("div", { className: "word-count", children: /* @__PURE__ */ A("span", { children: [
      Nr.words,
      " words"
    ] }) })
  ] }), Xu = {
    minHeight: fe,
    ...pe && { maxHeight: pe, overflowY: "auto" }
  };
  return /* @__PURE__ */ A("div", { className: `markdown-editor-container ${m === "neutral" ? "color-theme-neutral" : ""} ${d}`, "data-theme": g, children: [
    y && w && Pt.hasRecoverableContent && /* @__PURE__ */ h(
      SC,
      {
        onRecover: () => {
          Pt.recover();
        },
        onDismiss: Pt.dismissRecovery
      }
    ),
    u && /* @__PURE__ */ A("div", { className: "flex items-center bg-card/50 border-b border-border/30 editor-toolbar-wrapper", children: [
      X ? X(se, Fa) : Fa,
      N && /* @__PURE__ */ h(RC, { editorMode: kt, onModeSwitch: Uo })
    ] }),
    !tn && /* @__PURE__ */ h(
      rb,
      {
        editor: se,
        isOpen: zu,
        onClose: () => Rt(!1),
        focusTrigger: Fu,
        initialSearchQuery: Uu,
        editorMode: kt,
        rawMarkdown: Ta,
        onRawMarkdownChange: Ba,
        onMatchesChange: Pu
      }
    ),
    /* @__PURE__ */ h(ab, { editor: se }),
    /* @__PURE__ */ A("div", { className: `editor-main-area ${Xt ? "editor-with-toc" : ""}`, children: [
      Xt && Jt === "left" && /* @__PURE__ */ h(ja, { fallback: null, children: /* @__PURE__ */ h(
        dc,
        {
          editor: se,
          visible: An,
          onVisibilityChange: ur,
          title: fr,
          minLevel: pr,
          maxLevel: hr,
          showLevelIndicators: In,
          highlightActive: Zt,
          treeView: Qt,
          width: mr,
          position: Jt,
          scrollOffset: gr,
          onItemClick: yr,
          renderItem: vr,
          showToggleButton: br,
          scrollContainerRef: On
        }
      ) }),
      /* @__PURE__ */ A(
        AC,
        {
          resetKey: `${t}-${Eu}`,
          onRetry: () => Sa((ae) => ae + 1),
          onClearContent: () => {
            se && se.commands.clearContent(), n?.(""), r?.(""), o?.(""), Sa((ae) => ae + 1);
          },
          onError: me,
          children: [
            /* @__PURE__ */ h("div", { className: "editor-content-wrapper", ref: On, style: Xu, children: kt === "wysiwyg" ? /* @__PURE__ */ A(be, { children: [
              /* @__PURE__ */ h(Qu, { editor: se, className: "editor-content" }),
              /* @__PURE__ */ h(
                n1,
                {
                  editor: se,
                  isMobile: tn,
                  disabledFeatures: re,
                  containerRef: On,
                  editable: c,
                  showFloatingToolbar: T,
                  isLinkPopoverOpen: Hu,
                  aiEnabled: xr,
                  onAISetupRequired: en,
                  onAISparklesClick: (ae) => Wa("selection", ae),
                  onCopySelectionAsMarkdown: za,
                  aiDropdown: Tu,
                  aiActions: ke,
                  onAIActionSelect: Vu,
                  onAIDropdownClose: () => Wo(null),
                  aiState: je,
                  aiPopoverPosition: Su,
                  onAIReplace: Ku,
                  onAIInsert: Gu,
                  onAIRetry: qu,
                  onAIDiscard: () => {
                    Mu(), xt();
                  },
                  onLinkPopoverClose: () => Tr(!1),
                  onEditLink: () => Tr(!0),
                  onWikiLinkSearch: _a.current,
                  imageEditState: Fo,
                  onImageSave: (ae, Ee) => {
                    se.chain().focus().setNodeSelection(Fo.pos).updateAttributes("resizableImage", {
                      src: ae,
                      alt: Ee
                    }).run(), Er(null);
                  },
                  onImageDelete: () => {
                    se.chain().focus().setNodeSelection(Fo.pos).deleteSelection().run(), Er(null);
                  },
                  onImageEditClose: () => Er(null)
                }
              )
            ] }) : /* @__PURE__ */ h(
              NC,
              {
                content: Ta,
                onChange: Ba,
                placeholder: "Write your markdown here...",
                editable: c,
                autofocus: !0,
                searchMatches: Lu,
                currentMatchIndex: Iu,
                autoClosePairs: Io
              }
            ) }),
            /* @__PURE__ */ h(r1, { scrollContainerRef: On })
          ]
        }
      ),
      Xt && Jt === "right" && /* @__PURE__ */ h(ja, { fallback: null, children: /* @__PURE__ */ h(
        dc,
        {
          editor: se,
          visible: An,
          onVisibilityChange: ur,
          title: fr,
          minLevel: pr,
          maxLevel: hr,
          showLevelIndicators: In,
          highlightActive: Zt,
          treeView: Qt,
          width: mr,
          position: Jt,
          scrollOffset: gr,
          onItemClick: yr,
          renderItem: vr,
          showToggleButton: br,
          scrollContainerRef: On
        }
      ) })
    ] }),
    f && (ee ? ee(
      { words: Nr.words, characters: Nr.characters },
      Pt.status,
      Ua
    ) : Ua),
    /* @__PURE__ */ h(LC, { visible: Ro, onClose: Po, editor: se })
  ] });
}), aE = yo.create({
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
      En(this.options.HTMLAttributes, t, {
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
}), bu = {
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
}, i1 = {
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
}, c1 = {
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
}, l1 = {
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
}, Yn = {
  dark: bu,
  light: i1,
  sepia: c1,
  nord: l1
};
function d1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function iE(e, t, n, r) {
  const o = Yn[e] || bu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const wu = yc(null);
function cE({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = Y(t), s = Yn[r] || Yn.dark, i = F((c) => {
    Yn[c] && o(c);
  }, []);
  K(() => {
    n?.current && d1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(Yn)
  };
  return /* @__PURE__ */ h(wu.Provider, { value: a, children: e });
}
function lE() {
  const e = vc(wu);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const uc = [
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
function dE({ node: e, updateAttributes: t }) {
  const [n, r] = Y(!1), o = e.attrs.language || "plaintext";
  uc.find((i) => i.value === o)?.label;
  const s = F(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ A(eo, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ h(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: uc.map(({ value: i, label: a }) => /* @__PURE__ */ h("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ h(vn, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ h(Cn, { size: 14 }) : /* @__PURE__ */ h(xn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ h("pre", { className: "code-block-pre", children: /* @__PURE__ */ h("code", { children: /* @__PURE__ */ h(Ju, {}) }) })
  ] });
}
const ku = "paragon-editor-toc-width", u1 = 280, xu = 200, Cu = 500, zn = 30, fc = 5;
function pc() {
  try {
    const e = localStorage.getItem(ku);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= xu && t <= Cu)
        return t;
    }
  } catch {
  }
  return u1;
}
function f1(e) {
  try {
    localStorage.setItem(ku, String(e));
  } catch {
  }
}
function p1(e, t, n) {
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
function h1(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t += `${r.pos}:${r.level}:${r.text};`;
  }
  return t;
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
function hc(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const Hs = wt(function({
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
      children: /* @__PURE__ */ A(
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
            o && /* @__PURE__ */ A("span", { className: "toc-level-indicator", children: [
              "H",
              t.level
            ] }),
            /* @__PURE__ */ h("span", { className: "toc-item-text", children: t.text })
          ]
        }
      )
    }
  );
}), g1 = wt(function({
  headings: t,
  activeId: n,
  minLevel: r,
  showLevelIndicators: o,
  onItemClick: s,
  onToggleCollapse: i
}) {
  const a = j(null), [c, l] = Y(0), [d, u] = Y(0);
  K(() => {
    const b = a.current;
    if (!b) return;
    const v = () => {
      u(b.clientHeight);
    };
    v();
    let w = null;
    return typeof ResizeObserver < "u" && (w = new ResizeObserver(v), w.observe(b)), () => {
      w?.disconnect();
    };
  }, []);
  const f = F((b) => {
    l(b.currentTarget.scrollTop);
  }, []), p = t.length * zn, g = Math.max(0, Math.floor(c / zn) - fc), m = Math.min(
    t.length,
    Math.ceil((c + d) / zn) + fc
  ), y = Nt(() => {
    const b = [];
    for (let v = g; v < m; v++) {
      const w = t[v];
      b.push(
        /* @__PURE__ */ h(
          Hs,
          {
            item: w,
            isActive: n === w.id,
            minLevel: r,
            showLevelIndicators: o,
            hasChildren: !1,
            isCollapsed: !1,
            treeView: !1,
            onItemClick: s,
            onToggleCollapse: i,
            style: {
              position: "absolute",
              top: `${v * zn}px`,
              left: 0,
              right: 0,
              height: `${zn}px`
            }
          },
          w.id
        )
      );
    }
    return b;
  }, [t, g, m, n, r, o, s, i]);
  return t.length < 30 ? /* @__PURE__ */ h(be, { children: t.map((b) => /* @__PURE__ */ h(
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
}), y1 = wt(function({
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
  const [v, w] = Y([]), [T, k] = Y(null), [E, M] = Y(n), [x, D] = Y(/* @__PURE__ */ new Set()), [C, N] = Y(() => {
    if (u) {
      const P = parseInt(u, 10);
      return isNaN(P) ? pc() : P;
    }
    return pc();
  }), L = j(null), O = j(null), _ = j(!1), $ = j(0), z = j(0), V = j("");
  K(() => {
    M(n);
  }, [n]);
  const I = F((P) => {
    P.preventDefault(), P.stopPropagation(), _.current = !0, $.current = P.clientX, z.current = C, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [C]);
  K(() => {
    const P = (ee) => {
      if (!_.current) return;
      const re = f === "right" ? $.current - ee.clientX : ee.clientX - $.current, fe = Math.min(Cu, Math.max(xu, z.current + re));
      N(fe);
    }, X = () => {
      _.current && (_.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((ee) => (f1(ee), ee)));
    };
    return document.addEventListener("mousemove", P), document.addEventListener("mouseup", X), () => {
      document.removeEventListener("mousemove", P), document.removeEventListener("mouseup", X);
    };
  }, [f]);
  const W = F(() => {
    if (!t || t.isDestroyed) return;
    const P = p1(t, s, i), X = h1(P);
    X !== V.current && (V.current = X, w(P));
  }, [t, s, i]);
  K(() => {
    if (!t) return;
    const P = () => {
      O.current && clearTimeout(O.current), O.current = setTimeout(() => W(), 300);
    };
    return W(), t.on("update", P), t.on("create", P), () => {
      t.off("update", P), t.off("create", P), O.current && clearTimeout(O.current);
    };
  }, [t, W]), K(() => {
    if (!t || !c || !E || v.length === 0) return;
    const P = b?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!P) return;
    const X = () => {
      const fe = P.getBoundingClientRect();
      let pe = null;
      for (let Re = v.length - 1; Re >= 0; Re--) {
        const et = v[Re], qt = hc(t, et.pos);
        if (qt && qt.getBoundingClientRect().top - fe.top <= p + 10) {
          pe = et.id;
          break;
        }
      }
      !pe && v.length > 0 && (pe = v[0].id), k(pe);
    };
    let ee;
    const re = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(X);
    };
    return P.addEventListener("scroll", re, { passive: !0 }), X(), () => {
      P.removeEventListener("scroll", re), cancelAnimationFrame(ee);
    };
  }, [t, v, c, E, p, b]);
  const q = F((P) => {
    if (!t || t.isDestroyed) return;
    const X = hc(t, P.pos);
    if (X) {
      const ee = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const re = ee.getBoundingClientRect(), pe = X.getBoundingClientRect().top - re.top + ee.scrollTop;
        ee.scrollTo({ top: pe - p, behavior: "smooth" });
      } else
        X.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(P.pos + 1);
    } catch {
    }
    k(P.id), g?.(P);
  }, [t, p, g, b]), J = F(() => {
    const P = !E;
    M(P), r?.(P);
  }, [E, r]), te = F((P) => {
    D((X) => {
      const ee = new Set(X);
      return ee.has(P) ? ee.delete(P) : ee.add(P), ee;
    });
  }, []), B = F((P, X = 0) => {
    if (m) {
      const pe = T === P.id;
      return m(P, pe, () => q(P));
    }
    const ee = T === P.id, re = P.children && P.children.length > 0, fe = x.has(P.id);
    return /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ h(
        Hs,
        {
          item: P,
          isActive: ee,
          minLevel: s,
          showLevelIndicators: a,
          hasChildren: !!re,
          isCollapsed: fe,
          treeView: !0,
          onItemClick: q,
          onToggleCollapse: te
        }
      ),
      re && !fe && /* @__PURE__ */ h("div", { className: "toc-children", children: P.children.map((pe) => B(pe, X + 1)) })
    ] }, P.id);
  }, [T, x, q, te, s, a, m]), H = F((P) => P.map((X) => B(X)), [B]), R = F(() => m ? v.map((P) => {
    const X = T === P.id;
    return /* @__PURE__ */ h("div", { children: m(P, X, () => q(P)) }, P.id);
  }) : null, [v, T, m, q]);
  if (!t) return null;
  const U = l ? m1(v) : [];
  return /* @__PURE__ */ A(be, { children: [
    y && /* @__PURE__ */ h(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: J,
        title: E ? "Hide Table of Contents" : "Show Table of Contents",
        children: E ? /* @__PURE__ */ h(Kf, { size: 16 }) : /* @__PURE__ */ h(Gf, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(
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
              onMouseDown: I
            }
          ),
          /* @__PURE__ */ A("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ h("div", { className: "toc-header", children: /* @__PURE__ */ h("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ h("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ A("div", { className: "toc-empty", children: [
              /* @__PURE__ */ h("p", { children: "No headings yet" }),
              /* @__PURE__ */ h("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ h("div", { className: "toc-list", children: l ? H(U) : m ? R() : /* @__PURE__ */ h(
              g1,
              {
                headings: v,
                activeId: T,
                minLevel: s,
                showLevelIndicators: a,
                onItemClick: q,
                onToggleCollapse: te
              }
            ) }) })
          ] })
        ]
      }
    )
  ] });
}), v1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TableOfContents: y1
}, Symbol.toStringTag, { value: "Module" }));
export {
  TC as AutoSaveIndicator,
  aE as Callout,
  yx as CalloutInputRule,
  dE as CodeBlockComponent,
  px as CollapsibleHeading,
  Lb as CollapsibleList,
  Jk as DatePill,
  cE as EditorThemeProvider,
  nb as EditorToolbar,
  rb as FindReplace,
  _C as FloatingToolbar,
  QC as ImageDropZone,
  rC as ImageUpload,
  sE as MarkdownEditor,
  gx as MarkdownLinkInputRule,
  ux as MarkdownPasteSafe,
  Eb as MixedBulletList,
  Nb as MixedListItem,
  Mb as MixedOrderedList,
  Sb as MixedTaskItem,
  Tb as MixedTaskList,
  SC as RecoveryBanner,
  zb as ResizableImage,
  vx as SearchHighlight,
  ab as SelectAllActionBar,
  Yx as SelectAllOccurrences,
  YC as SlashCommands,
  bx as TabIndent,
  y1 as TableOfContents,
  nx as TagPill,
  ox as WikiLinkSafe,
  d1 as applyTheme,
  iE as createCustomTheme,
  bu as darkTheme,
  Ma as getDateVariant,
  un as isValidTag,
  i1 as lightTheme,
  _c as loadCoreLanguages,
  Ja as loadLanguageIfNeeded,
  Ye as lowlight,
  l1 as nordTheme,
  Gn as normalizeTag,
  Bt as parseDateFromMarkdown,
  c1 as sepiaTheme,
  Yn as themes,
  cb as useAutoSave,
  lE as useEditorTheme,
  MC as useWordCount
};
//# sourceMappingURL=paragon.js.map
