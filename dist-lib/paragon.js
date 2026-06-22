import { jsxs as R, jsx as h, Fragment as we } from "react/jsx-runtime";
import { useEditorState as yl, NodeViewWrapper as no, ReactNodeViewRenderer as vl, useEditor as Ju, EditorContent as ef, NodeViewContent as tf } from "@tiptap/react";
import * as S from "react";
import G, { useState as Y, useRef as j, useEffect as V, useLayoutEffect as go, memo as Dt, useCallback as z, useImperativeHandle as nf, createContext as bl, useContext as wl, useMemo as zt, Component as rf, useReducer as of, lazy as sf, forwardRef as af, Suspense as Ya } from "react";
import lf from "@tiptap/extension-code-block-lowlight";
import { createLowlight as cf } from "lowlight";
import { Image as Bs, X as Mt, Link2 as Ws, Type as yo, Copy as Rn, Undo as df, Redo as uf, Bold as zs, Italic as Fs, Underline as Us, Strikethrough as js, Code as kl, Highlighter as xl, Link as Ys, ChevronDown as Nn, List as Vs, ListOrdered as Ks, CheckSquare as Gs, Quote as qs, FileCode as Cl, IndentIncrease as ff, IndentDecrease as pf, Table as ys, Minus as El, Info as vs, BookOpen as Ml, PenLine as hf, Library as mf, ListTodo as Tl, Columns as Va, Trash2 as xn, Rows as Ka, ToggleLeft as Ga, ArrowUpDown as gf, Sparkles as vo, Search as yf, ChevronUp as vf, MousePointerClick as bf, CaseSensitive as wf, WholeWord as kf, Regex as xf, Replace as bs, ReplaceAll as Cf, Plus as Xs, ChevronLeftIcon as Ef, ChevronRightIcon as Mf, ChevronDownIcon as Tf, Calendar as Sl, Hash as qa, Cloud as Sf, Loader2 as Nl, Check as In, CloudOff as Nf, AlertCircle as Df, RotateCcw as Zs, Activity as Lf, Maximize2 as Dl, Minimize2 as Ll, AlertTriangle as Af, ChevronRight as Rf, CheckCircle2 as If, Eye as Pf, FileText as Qs, ExternalLink as Of, Pencil as _f, Unlink as $f, Heading1 as Hf, Heading2 as Bf, Heading3 as Wf, Heading4 as zf, Heading5 as Ff, Code2 as Uf, StickyNote as jf, MessageSquareText as Yf, ImagePlus as Vf, MessageSquare as Al, RefreshCw as Kf, SpellCheck as Gf, PanelRightClose as qf, PanelRightOpen as Xf } from "lucide-react";
import * as Rl from "react-dom";
import Zf, { createPortal as Qf } from "react-dom";
import { TextSelection as et, Plugin as Re, PluginKey as Ie, NodeSelection as Jf, AllSelection as ep } from "@tiptap/pm/state";
import { DOMSerializer as Js, Fragment as Il, Slice as Yo } from "@tiptap/pm/model";
import tp from "@tiptap/starter-kit";
import np from "@tiptap/extension-placeholder";
import rp from "@tiptap/extension-text-align";
import op from "@tiptap/extension-highlight";
import sp from "@tiptap/extension-link";
import { Table as ap } from "@tiptap/extension-table";
import ip from "@tiptap/extension-table-row";
import lp from "@tiptap/extension-table-cell";
import cp from "@tiptap/extension-table-header";
import { Extension as Ue, Node as bo, mergeAttributes as Pn, InputRule as Fe, Mark as Pl } from "@tiptap/core";
import { DecorationSet as Je, Decoration as ot } from "@tiptap/pm/view";
import dp from "@tiptap/extension-bullet-list";
import up from "@tiptap/extension-ordered-list";
import fp from "@tiptap/extension-list-item";
import pp from "@tiptap/extension-task-list";
import hp from "@tiptap/extension-task-item";
import { findWrapping as Xa, canJoin as mp } from "@tiptap/pm/transform";
import gp from "@tiptap/extension-underline";
import yp from "@tiptap/extension-subscript";
import vp from "@tiptap/extension-superscript";
import bp from "@tiptap/extension-typography";
import wp from "@tiptap/extension-image";
import { createRoot as kp } from "react-dom/client";
import { liftListItem as Za, sinkListItem as Qa } from "@tiptap/pm/schema-list";
import { undo as xp, redo as Cp } from "@tiptap/pm/history";
import Ep from "@tiptap/extension-horizontal-rule";
import Mp from "@tiptap/extension-code";
import Tp from "@tiptap/extension-bold";
import Sp from "@tiptap/extension-italic";
import Np from "@tiptap/extension-strike";
const Qe = cf(), Ol = {
  javascript: () => import("highlight.js/lib/languages/javascript"),
  typescript: () => import("highlight.js/lib/languages/typescript"),
  python: () => import("highlight.js/lib/languages/python"),
  xml: () => import("highlight.js/lib/languages/xml"),
  css: () => import("highlight.js/lib/languages/css"),
  json: () => import("highlight.js/lib/languages/json"),
  bash: () => import("highlight.js/lib/languages/bash")
}, _l = {
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
}, Dp = {
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
}, Rr = /* @__PURE__ */ new Set(), Ir = /* @__PURE__ */ new Set();
let Ja = !1, Fn = null;
async function $l() {
  if (!Ja)
    return Fn || (Fn = (async () => {
      try {
        const e = Object.entries(Ol), t = await Promise.all(
          e.map(async ([n, r]) => {
            const o = await r();
            return [n, o.default];
          })
        );
        for (const [n, r] of t)
          Qe.registered(n) || Qe.register(n, r);
        for (const [n, r] of Object.entries(_l))
          if (!Qe.registered(n)) {
            const o = t.find(([s]) => s === r);
            o && Qe.register(n, o[1]);
          }
        Ja = !0;
      } catch (e) {
        console.warn("Failed to load core highlight.js languages:", e), Fn = null;
      }
    })(), Fn);
}
async function ei(e) {
  if (Qe.registered(e)) return !0;
  if (Ol[e] || _l[e])
    return await $l(), Qe.registered(e);
  const t = Dp[e];
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
    Qe.register(e, r), Ir.add(e);
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
          i !== e && !Qe.registered(i) && (Qe.register(i, r), Ir.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Rr.delete(e);
  }
}
const ti = "http://www.w3.org/2000/svg";
function Pr(e, t, n) {
  const r = document.createElementNS(ti, "svg");
  r.setAttribute("width", String(t)), r.setAttribute("height", String(t)), r.setAttribute("viewBox", "0 0 24 24"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-linejoin", "round"), n && r.setAttribute("class", n);
  for (const o of e) {
    const s = document.createElementNS(ti, "path");
    s.setAttribute("d", o), r.appendChild(s);
  }
  return r;
}
const ni = [
  "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z",
  "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
], Lp = ["M20 6 9 17l-5-5"], Ap = ["m6 9 6 6 6-6"], Rp = {
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
}, Hl = {
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
}, Ip = [
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
function Pp() {
  return Ip;
}
function ri(e) {
  if (e === "plaintext") return "Plain Text";
  const t = Hl[e] || e;
  return Rp[t] || e.charAt(0).toUpperCase() + e.slice(1);
}
class Op {
  constructor(t, n, r) {
    this.isVisible = !1, this.languageReady = !1, this.copied = !1, this.copiedTimeout = null, this.highlightForced = !1, this.handleMouseEnter = () => {
      this.controlsEl.style.setProperty("opacity", "1", "important"), this.controlsEl.style.setProperty("transition", "none", "important");
    }, this.handleMouseLeave = () => {
      this.controlsEl.style.removeProperty("opacity"), this.controlsEl.style.removeProperty("transition");
    }, this.handleLanguageChange = () => {
      const a = this.selectEl.value, l = this.getPos();
      l != null && (this.labelEl.textContent = this.formatLanguageLabel(a), this.view.dispatch(
        this.view.state.tr.setNodeMarkup(l, void 0, {
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
    const i = Pr(Ap, 12, "code-block-language-chevron");
    s.appendChild(this.selectEl), s.appendChild(this.labelEl), s.appendChild(i), this.copyBtn = document.createElement("button"), this.copyBtn.type = "button", this.copyBtn.className = "code-block-copy-btn", this.copyBtn.title = "Copy code", this.copyBtn.appendChild(Pr(ni, 14)), this.copyBtn.addEventListener("click", this.handleCopy), this.controlsEl.appendChild(s), this.controlsEl.appendChild(this.copyBtn), this.preEl = document.createElement("pre"), this.preEl.className = "code-block-pre", this.codeEl = document.createElement("code"), this.codeEl.className = `language-${o}`, this.preEl.appendChild(this.codeEl), this.contentDOM = this.codeEl, this.dom.appendChild(this.controlsEl), this.dom.appendChild(this.preEl), this.dom.addEventListener("mouseenter", this.handleMouseEnter), this.dom.addEventListener("mouseleave", this.handleMouseLeave), setTimeout(() => {
      this.isVisible = !0, this.onBecameVisible().catch(() => {
      });
    }, 0);
  }
  // ── Language select ──
  populateLanguageOptions(t) {
    this.selectEl.innerHTML = "";
    const n = document.createElement("option");
    n.value = "plaintext", n.textContent = "Plain Text", this.selectEl.appendChild(n);
    const r = Pp();
    for (const s of r) {
      const i = document.createElement("option");
      i.value = s, i.textContent = ri(s), this.selectEl.appendChild(i);
    }
    const o = Hl[t] || t;
    this.selectEl.value = o;
  }
  formatLanguageLabel(t) {
    return ri(t);
  }
  setCopiedState(t) {
    this.copied = t, this.copyBtn.className = `code-block-copy-btn${t ? " copied" : ""}`, this.copyBtn.title = t ? "Copied!" : "Copy code", this.copyBtn.innerHTML = "", this.copyBtn.appendChild(
      Pr(t ? Lp : ni, 14)
    );
  }
  // ── Language loading ──
  async onBecameVisible() {
    const t = this.node.attrs.language || "plaintext";
    if (await $l(), t === "plaintext") {
      this.setLanguageReady(!0);
      return;
    }
    if (Qe.registered(t)) {
      this.setLanguageReady(!0);
      return;
    }
    const n = await ei(t);
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
    return this.node = t, n !== r && (this.labelEl.textContent = this.formatLanguageLabel(r), this.selectEl.value = r, r === "plaintext" ? this.setLanguageReady(!0) : Qe.registered(r) ? this.setLanguageReady(!0) : this.isVisible && (this.setLanguageReady(!1), ei(r).then((o) => {
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
const _p = lf.configure({
  lowlight: Qe,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
}).extend({
  addNodeView() {
    return ({ node: e, view: t, getPos: n }) => new Op(e, t, n);
  },
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() ?? {},
      "Mod-Alt-c": () => ea(this.editor)
    };
  },
  addProseMirrorPlugins() {
    return [...this.parent?.() ?? []];
  }
});
function ea(e) {
  const { state: t } = e, { from: n, to: r, empty: o } = t.selection;
  if (e.isActive("codeBlock") || o)
    return e.chain().focus().toggleCodeBlock().run();
  let s = 0;
  const i = [];
  if (t.doc.nodesBetween(n, r, (m) => m.isTextblock ? (s++, i.push(m.textContent), !1) : !0), s <= 1)
    return e.chain().focus().toggleCodeBlock().run();
  const a = i.join(`
`), l = t.schema.nodes.codeBlock, c = t.doc.resolve(n), d = t.doc.resolve(r), u = Math.max(1, c.depth), f = Math.max(1, d.depth), p = c.before(u), g = d.after(f);
  return e.chain().focus().command(({ tr: m }) => {
    const y = l.create(
      { language: null },
      a ? t.schema.text(a) : void 0
    );
    return m.replaceWith(p, g, y), !0;
  }).run();
}
function Bl({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = Y(""), [i, a] = Y(""), [l, c] = Y(""), [d, u] = Y(!1), f = j(null), p = j(null);
  V(() => {
    e && (s(""), a(""), c(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), V(() => {
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
      return c("Please enter an image URL"), !1;
    try {
      const w = new URL(v);
      if (!["http:", "https:", "data:"].includes(w.protocol))
        return c("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return c("Please enter a valid URL"), !1;
    }
    return c(""), !0;
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
  return /* @__PURE__ */ R(
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
        /* @__PURE__ */ R("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ h(Bs, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ h("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ h(Mt, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ R("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ R("label", { className: "image-url-dialog-label", children: [
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
                  s(v.target.value), l && c("");
                },
                onKeyDown: y,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              }
            ),
            l && /* @__PURE__ */ h("span", { className: "image-url-dialog-error", children: l })
          ] }),
          /* @__PURE__ */ R("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ R("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ h(yo, { size: 12 }),
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
          /* @__PURE__ */ R("div", { className: "image-url-dialog-actions", children: [
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
function de(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function oi(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function wo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = oi(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : oi(e[o], null);
        }
      };
  };
}
function _e(...e) {
  return S.useCallback(wo(...e), e);
}
function On(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = S.createContext(i), l = n.length;
    n = [...n, i];
    const c = (u) => {
      const { scope: f, children: p, ...g } = u, m = f?.[e]?.[l] || a, y = S.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ h(m.Provider, { value: y, children: p });
    };
    c.displayName = s + "Provider";
    function d(u, f) {
      const p = f?.[e]?.[l] || a, g = S.useContext(p);
      if (g) return g;
      if (i !== void 0) return i;
      throw new Error(`\`${u}\` must be used within \`${s}\``);
    }
    return [c, d];
  }
  const o = () => {
    const s = n.map((i) => S.createContext(i));
    return function(a) {
      const l = a?.[e] || s;
      return S.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: l } }),
        [a, l]
      );
    };
  };
  return o.scopeName = e, [r, $p(o, ...t)];
}
function $p(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const i = r.reduce((a, { useScope: l, scopeName: c }) => {
        const u = l(s)[`__scope${c}`];
        return { ...a, ...u };
      }, {});
      return S.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Ft = globalThis?.document ? S.useLayoutEffect : () => {
}, Hp = S[" useInsertionEffect ".trim().toString()] || Ft;
function ta({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = Bp({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, l = a ? e : o;
  {
    const d = S.useRef(e !== void 0);
    S.useEffect(() => {
      const u = d.current;
      u !== a && console.warn(
        `${r} is changing from ${u ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = a;
    }, [a, r]);
  }
  const c = S.useCallback(
    (d) => {
      if (a) {
        const u = Wp(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
    },
    [a, e, s, i]
  );
  return [l, c];
}
function Bp({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = S.useState(e), o = S.useRef(n), s = S.useRef(t);
  return Hp(() => {
    s.current = t;
  }, [t]), S.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Wp(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function er(e) {
  const t = /* @__PURE__ */ Fp(e), n = S.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = S.Children.toArray(s), l = a.find(jp);
    if (l) {
      const c = l.props.children, d = a.map((u) => u === l ? S.Children.count(c) > 1 ? S.Children.only(null) : S.isValidElement(c) ? c.props.children : null : u);
      return /* @__PURE__ */ h(t, { ...i, ref: o, children: S.isValidElement(c) ? S.cloneElement(c, void 0, d) : null });
    }
    return /* @__PURE__ */ h(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var zp = /* @__PURE__ */ er("Slot");
// @__NO_SIDE_EFFECTS__
function Fp(e) {
  const t = S.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (S.isValidElement(o)) {
      const i = Vp(o), a = Yp(s, o.props);
      return o.type !== S.Fragment && (a.ref = r ? wo(r, i) : i), S.cloneElement(o, a);
    }
    return S.Children.count(o) > 1 ? S.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Wl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Up(e) {
  const t = ({ children: n }) => /* @__PURE__ */ h(we, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Wl, t;
}
function jp(e) {
  return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Wl;
}
function Yp(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...a) => {
      const l = s(...a);
      return o(...a), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Vp(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Kp = [
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
], Pe = Kp.reduce((e, t) => {
  const n = /* @__PURE__ */ er(`Primitive.${t}`), r = S.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, l = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h(l, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function zl(e, t) {
  e && Rl.flushSync(() => e.dispatchEvent(t));
}
function Fl(e) {
  const t = e + "CollectionProvider", [n, r] = On(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (m) => {
    const { scope: y, children: b } = m, v = G.useRef(null), w = G.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ h(o, { scope: y, itemMap: w, collectionRef: v, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", l = /* @__PURE__ */ er(a), c = G.forwardRef(
    (m, y) => {
      const { scope: b, children: v } = m, w = s(a, b), T = _e(y, w.collectionRef);
      return /* @__PURE__ */ h(l, { ref: T, children: v });
    }
  );
  c.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = /* @__PURE__ */ er(d), p = G.forwardRef(
    (m, y) => {
      const { scope: b, children: v, ...w } = m, T = G.useRef(null), k = _e(y, T), E = s(d, b);
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
    { Provider: i, Slot: c, ItemSlot: p },
    g,
    r
  ];
}
var Gp = S.createContext(void 0);
function Ul(e) {
  const t = S.useContext(Gp);
  return e || t || "ltr";
}
function Tt(e) {
  const t = S.useRef(e);
  return S.useEffect(() => {
    t.current = e;
  }), S.useMemo(() => (...n) => t.current?.(...n), []);
}
function qp(e, t = globalThis?.document) {
  const n = Tt(e);
  S.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Xp = "DismissableLayer", ws = "dismissableLayer.update", Zp = "dismissableLayer.pointerDownOutside", Qp = "dismissableLayer.focusOutside", si, jl = S.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), na = S.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...l
    } = e, c = S.useContext(jl), [d, u] = S.useState(null), f = d?.ownerDocument ?? globalThis?.document, [, p] = S.useState({}), g = _e(t, (M) => u(M)), m = Array.from(c.layers), [y] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), b = m.indexOf(y), v = d ? m.indexOf(d) : -1, w = c.layersWithOutsidePointerEventsDisabled.size > 0, T = v >= b, k = th((M) => {
      const x = M.target, D = [...c.branches].some((C) => C.contains(x));
      !T || D || (o?.(M), i?.(M), M.defaultPrevented || a?.());
    }, f), E = nh((M) => {
      const x = M.target;
      [...c.branches].some((C) => C.contains(x)) || (s?.(M), i?.(M), M.defaultPrevented || a?.());
    }, f);
    return qp((M) => {
      v === c.layers.size - 1 && (r?.(M), !M.defaultPrevented && a && (M.preventDefault(), a()));
    }, f), S.useEffect(() => {
      if (d)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (si = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(d)), c.layers.add(d), ai(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = si);
        };
    }, [d, f, n, c]), S.useEffect(() => () => {
      d && (c.layers.delete(d), c.layersWithOutsidePointerEventsDisabled.delete(d), ai());
    }, [d, c]), S.useEffect(() => {
      const M = () => p({});
      return document.addEventListener(ws, M), () => document.removeEventListener(ws, M);
    }, []), /* @__PURE__ */ h(
      Pe.div,
      {
        ...l,
        ref: g,
        style: {
          pointerEvents: w ? T ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: de(e.onFocusCapture, E.onFocusCapture),
        onBlurCapture: de(e.onBlurCapture, E.onBlurCapture),
        onPointerDownCapture: de(
          e.onPointerDownCapture,
          k.onPointerDownCapture
        )
      }
    );
  }
);
na.displayName = Xp;
var Jp = "DismissableLayerBranch", eh = S.forwardRef((e, t) => {
  const n = S.useContext(jl), r = S.useRef(null), o = _e(t, r);
  return S.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ h(Pe.div, { ...e, ref: o });
});
eh.displayName = Jp;
function th(e, t = globalThis?.document) {
  const n = Tt(e), r = S.useRef(!1), o = S.useRef(() => {
  });
  return S.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let l = function() {
          Yl(
            Zp,
            n,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
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
function nh(e, t = globalThis?.document) {
  const n = Tt(e), r = S.useRef(!1);
  return S.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Yl(Qp, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function ai() {
  const e = new CustomEvent(ws);
  document.dispatchEvent(e);
}
function Yl(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? zl(o, s) : o.dispatchEvent(s);
}
var Vo = 0;
function rh() {
  S.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ii()), document.body.insertAdjacentElement("beforeend", e[1] ?? ii()), Vo++, () => {
      Vo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Vo--;
    };
  }, []);
}
function ii() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ko = "focusScope.autoFocusOnMount", Go = "focusScope.autoFocusOnUnmount", li = { bubbles: !1, cancelable: !0 }, oh = "FocusScope", Vl = S.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, l] = S.useState(null), c = Tt(o), d = Tt(s), u = S.useRef(null), f = _e(t, (m) => l(m)), p = S.useRef({
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
        a.contains(T) ? u.current = T : Bt(u.current, { select: !0 });
      }, y = function(w) {
        if (p.paused || !a) return;
        const T = w.relatedTarget;
        T !== null && (a.contains(T) || Bt(u.current, { select: !0 }));
      }, b = function(w) {
        if (document.activeElement === document.body)
          for (const k of w)
            k.removedNodes.length > 0 && Bt(a);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", y);
      const v = new MutationObserver(b);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", y), v.disconnect();
      };
    }
  }, [r, a, p.paused]), S.useEffect(() => {
    if (a) {
      di.add(p);
      const m = document.activeElement;
      if (!a.contains(m)) {
        const b = new CustomEvent(Ko, li);
        a.addEventListener(Ko, c), a.dispatchEvent(b), b.defaultPrevented || (sh(dh(Kl(a)), { select: !0 }), document.activeElement === m && Bt(a));
      }
      return () => {
        a.removeEventListener(Ko, c), setTimeout(() => {
          const b = new CustomEvent(Go, li);
          a.addEventListener(Go, d), a.dispatchEvent(b), b.defaultPrevented || Bt(m ?? document.body, { select: !0 }), a.removeEventListener(Go, d), di.remove(p);
        }, 0);
      };
    }
  }, [a, c, d, p]);
  const g = S.useCallback(
    (m) => {
      if (!n && !r || p.paused) return;
      const y = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, b = document.activeElement;
      if (y && b) {
        const v = m.currentTarget, [w, T] = ah(v);
        w && T ? !m.shiftKey && b === T ? (m.preventDefault(), n && Bt(w, { select: !0 })) : m.shiftKey && b === w && (m.preventDefault(), n && Bt(T, { select: !0 })) : b === v && m.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ h(Pe.div, { tabIndex: -1, ...i, ref: f, onKeyDown: g });
});
Vl.displayName = oh;
function sh(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Bt(r, { select: t }), document.activeElement !== n) return;
}
function ah(e) {
  const t = Kl(e), n = ci(t, e), r = ci(t.reverse(), e);
  return [n, r];
}
function Kl(e) {
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
    if (!ih(n, { upTo: t })) return n;
}
function ih(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function lh(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Bt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && lh(e) && t && e.select();
  }
}
var di = ch();
function ch() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ui(e, t), e.unshift(t);
    },
    remove(t) {
      e = ui(e, t), e[0]?.resume();
    }
  };
}
function ui(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function dh(e) {
  return e.filter((t) => t.tagName !== "A");
}
var uh = S[" useId ".trim().toString()] || (() => {
}), fh = 0;
function ro(e) {
  const [t, n] = S.useState(uh());
  return Ft(() => {
    n((r) => r ?? String(fh++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const ph = ["top", "right", "bottom", "left"], Ut = Math.min, Ke = Math.max, oo = Math.round, Or = Math.floor, ht = (e) => ({
  x: e,
  y: e
}), hh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, mh = {
  start: "end",
  end: "start"
};
function ks(e, t, n) {
  return Ke(e, Ut(t, n));
}
function St(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Nt(e) {
  return e.split("-")[0];
}
function _n(e) {
  return e.split("-")[1];
}
function ra(e) {
  return e === "x" ? "y" : "x";
}
function oa(e) {
  return e === "y" ? "height" : "width";
}
const gh = /* @__PURE__ */ new Set(["top", "bottom"]);
function ft(e) {
  return gh.has(Nt(e)) ? "y" : "x";
}
function sa(e) {
  return ra(ft(e));
}
function yh(e, t, n) {
  n === void 0 && (n = !1);
  const r = _n(e), o = sa(e), s = oa(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = so(i)), [i, so(i)];
}
function vh(e) {
  const t = so(e);
  return [xs(e), t, xs(t)];
}
function xs(e) {
  return e.replace(/start|end/g, (t) => mh[t]);
}
const fi = ["left", "right"], pi = ["right", "left"], bh = ["top", "bottom"], wh = ["bottom", "top"];
function kh(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? pi : fi : t ? fi : pi;
    case "left":
    case "right":
      return t ? bh : wh;
    default:
      return [];
  }
}
function xh(e, t, n, r) {
  const o = _n(e);
  let s = kh(Nt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(xs)))), s;
}
function so(e) {
  return e.replace(/left|right|bottom|top/g, (t) => hh[t]);
}
function Ch(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Gl(e) {
  return typeof e != "number" ? Ch(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function ao(e) {
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
function hi(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = ft(t), i = sa(t), a = oa(i), l = Nt(t), c = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
  let p;
  switch (l) {
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
  switch (_n(t)) {
    case "start":
      p[i] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const Eh = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: i
  } = n, a = s.filter(Boolean), l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let c = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: d,
    y: u
  } = hi(c, r, l), f = r, p = {}, g = 0;
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
      rects: c,
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
    }, k && g <= 50 && (g++, typeof k == "object" && (k.placement && (f = k.placement), k.rects && (c = k.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : k.rects), {
      x: d,
      y: u
    } = hi(c, f, l)), m = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function tr(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: i,
    elements: a,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: u = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = St(t, e), g = Gl(p), y = a[f ? u === "floating" ? "reference" : "floating" : u], b = ao(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: l
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
  }, k = ao(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: v,
    offsetParent: w,
    strategy: l
  }) : v);
  return {
    top: (b.top - k.top + g.top) / T.y,
    bottom: (k.bottom - b.bottom + g.bottom) / T.y,
    left: (b.left - k.left + g.left) / T.x,
    right: (k.right - b.right + g.right) / T.x
  };
}
const Mh = (e) => ({
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
      middlewareData: l
    } = t, {
      element: c,
      padding: d = 0
    } = St(e, t) || {};
    if (c == null)
      return {};
    const u = Gl(d), f = {
      x: n,
      y: r
    }, p = sa(o), g = oa(p), m = await i.getDimensions(c), y = p === "y", b = y ? "top" : "left", v = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", T = s.reference[g] + s.reference[p] - f[p] - s.floating[g], k = f[p] - s.reference[p], E = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c));
    let M = E ? E[w] : 0;
    (!M || !await (i.isElement == null ? void 0 : i.isElement(E))) && (M = a.floating[w] || s.floating[g]);
    const x = T / 2 - k / 2, D = M / 2 - m[g] / 2 - 1, C = Ut(u[b], D), N = Ut(u[v], D), A = C, P = M - m[g] - N, O = M / 2 - m[g] / 2 + x, _ = ks(A, O, P), W = !l.arrow && _n(o) != null && O !== _ && s.reference[g] / 2 - (O < A ? C : N) - m[g] / 2 < 0, F = W ? O < A ? O - A : O - P : 0;
    return {
      [p]: f[p] + F,
      data: {
        [p]: _,
        centerOffset: O - _ - F,
        ...W && {
          alignmentOffset: F
        }
      },
      reset: W
    };
  }
}), Th = function(e) {
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
        platform: l,
        elements: c
      } = t, {
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: m = !0,
        ...y
      } = St(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = Nt(o), v = ft(a), w = Nt(a) === a, T = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), k = f || (w || !m ? [so(a)] : vh(a)), E = g !== "none";
      !f && E && k.push(...xh(a, m, g, T));
      const M = [a, ...k], x = await tr(t, y), D = [];
      let C = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && D.push(x[b]), u) {
        const O = yh(o, i, T);
        D.push(x[O[0]], x[O[1]]);
      }
      if (C = [...C, {
        placement: o,
        overflows: D
      }], !D.every((O) => O <= 0)) {
        var N, A;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, _ = M[O];
        if (_ && (!(u === "alignment" ? v !== ft(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        C.every((I) => ft(I.placement) === v ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: C
            },
            reset: {
              placement: _
            }
          };
        let W = (A = C.filter((F) => F.overflows[0] <= 0).sort((F, I) => F.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!W)
          switch (p) {
            case "bestFit": {
              var P;
              const F = (P = C.filter((I) => {
                if (E) {
                  const H = ft(I.placement);
                  return H === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  H === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((H) => H > 0).reduce((H, q) => H + q, 0)]).sort((I, H) => I[1] - H[1])[0]) == null ? void 0 : P[0];
              F && (W = F);
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
function mi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function gi(e) {
  return ph.some((t) => e[t] >= 0);
}
const Sh = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = St(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await tr(t, {
            ...o,
            elementContext: "reference"
          }), i = mi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: gi(i)
            }
          };
        }
        case "escaped": {
          const s = await tr(t, {
            ...o,
            altBoundary: !0
          }), i = mi(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: gi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ql = /* @__PURE__ */ new Set(["left", "top"]);
async function Nh(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Nt(n), a = _n(n), l = ft(n) === "y", c = ql.has(i) ? -1 : 1, d = s && l ? -1 : 1, u = St(t, e);
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
  return a && typeof g == "number" && (p = a === "end" ? g * -1 : g), l ? {
    x: p * d,
    y: f * c
  } : {
    x: f * c,
    y: p * d
  };
}
const Dh = function(e) {
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
      } = t, l = await Nh(t, e);
      return i === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: i
        }
      };
    }
  };
}, Lh = function(e) {
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
        ...l
      } = St(e, t), c = {
        x: n,
        y: r
      }, d = await tr(t, l), u = ft(Nt(o)), f = ra(u);
      let p = c[f], g = c[u];
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
}, Ah = function(e) {
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
        mainAxis: l = !0,
        crossAxis: c = !0
      } = St(e, t), d = {
        x: n,
        y: r
      }, u = ft(o), f = ra(u);
      let p = d[f], g = d[u];
      const m = St(a, t), y = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (l) {
        const w = f === "y" ? "height" : "width", T = s.reference[f] - s.floating[w] + y.mainAxis, k = s.reference[f] + s.reference[w] - y.mainAxis;
        p < T ? p = T : p > k && (p = k);
      }
      if (c) {
        var b, v;
        const w = f === "y" ? "width" : "height", T = ql.has(Nt(o)), k = s.reference[u] - s.floating[w] + (T && ((b = i.offset) == null ? void 0 : b[u]) || 0) + (T ? 0 : y.crossAxis), E = s.reference[u] + s.reference[w] + (T ? 0 : ((v = i.offset) == null ? void 0 : v[u]) || 0) - (T ? y.crossAxis : 0);
        g < k ? g = k : g > E && (g = E);
      }
      return {
        [f]: p,
        [u]: g
      };
    }
  };
}, Rh = function(e) {
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
        apply: l = () => {
        },
        ...c
      } = St(e, t), d = await tr(t, c), u = Nt(o), f = _n(o), p = ft(o) === "y", {
        width: g,
        height: m
      } = s.floating;
      let y, b;
      u === "top" || u === "bottom" ? (y = u, b = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = u, y = f === "end" ? "top" : "bottom");
      const v = m - d.top - d.bottom, w = g - d.left - d.right, T = Ut(m - d[y], v), k = Ut(g - d[b], w), E = !t.middlewareData.shift;
      let M = T, x = k;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = w), (r = t.middlewareData.shift) != null && r.enabled.y && (M = v), E && !f) {
        const C = Ke(d.left, 0), N = Ke(d.right, 0), A = Ke(d.top, 0), P = Ke(d.bottom, 0);
        p ? x = g - 2 * (C !== 0 || N !== 0 ? C + N : Ke(d.left, d.right)) : M = m - 2 * (A !== 0 || P !== 0 ? A + P : Ke(d.top, d.bottom));
      }
      await l({
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
function ko() {
  return typeof window < "u";
}
function $n(e) {
  return Xl(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ge(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function gt(e) {
  var t;
  return (t = (Xl(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Xl(e) {
  return ko() ? e instanceof Node || e instanceof Ge(e).Node : !1;
}
function st(e) {
  return ko() ? e instanceof Element || e instanceof Ge(e).Element : !1;
}
function mt(e) {
  return ko() ? e instanceof HTMLElement || e instanceof Ge(e).HTMLElement : !1;
}
function yi(e) {
  return !ko() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ge(e).ShadowRoot;
}
const Ih = /* @__PURE__ */ new Set(["inline", "contents"]);
function lr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = at(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Ih.has(o);
}
const Ph = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Oh(e) {
  return Ph.has($n(e));
}
const _h = [":popover-open", ":modal"];
function xo(e) {
  return _h.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const $h = ["transform", "translate", "scale", "rotate", "perspective"], Hh = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Bh = ["paint", "layout", "strict", "content"];
function aa(e) {
  const t = ia(), n = st(e) ? at(e) : e;
  return $h.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Hh.some((r) => (n.willChange || "").includes(r)) || Bh.some((r) => (n.contain || "").includes(r));
}
function Wh(e) {
  let t = jt(e);
  for (; mt(t) && !Dn(t); ) {
    if (aa(t))
      return t;
    if (xo(t))
      return null;
    t = jt(t);
  }
  return null;
}
function ia() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const zh = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Dn(e) {
  return zh.has($n(e));
}
function at(e) {
  return Ge(e).getComputedStyle(e);
}
function Co(e) {
  return st(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function jt(e) {
  if ($n(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    yi(e) && e.host || // Fallback.
    gt(e)
  );
  return yi(t) ? t.host : t;
}
function Zl(e) {
  const t = jt(e);
  return Dn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : mt(t) && lr(t) ? t : Zl(t);
}
function nr(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Zl(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Ge(o);
  if (s) {
    const a = Cs(i);
    return t.concat(i, i.visualViewport || [], lr(o) ? o : [], a && n ? nr(a) : []);
  }
  return t.concat(o, nr(o, [], n));
}
function Cs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ql(e) {
  const t = at(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = mt(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = oo(n) !== s || oo(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function la(e) {
  return st(e) ? e : e.contextElement;
}
function Cn(e) {
  const t = la(e);
  if (!mt(t))
    return ht(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Ql(t);
  let i = (s ? oo(n.width) : n.width) / r, a = (s ? oo(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Fh = /* @__PURE__ */ ht(0);
function Jl(e) {
  const t = Ge(e);
  return !ia() || !t.visualViewport ? Fh : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Uh(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ge(e) ? !1 : t;
}
function sn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = la(e);
  let i = ht(1);
  t && (r ? st(r) && (i = Cn(r)) : i = Cn(e));
  const a = Uh(s, n, r) ? Jl(s) : ht(0);
  let l = (o.left + a.x) / i.x, c = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = Ge(s), p = r && st(r) ? Ge(r) : r;
    let g = f, m = Cs(g);
    for (; m && r && p !== g; ) {
      const y = Cn(m), b = m.getBoundingClientRect(), v = at(m), w = b.left + (m.clientLeft + parseFloat(v.paddingLeft)) * y.x, T = b.top + (m.clientTop + parseFloat(v.paddingTop)) * y.y;
      l *= y.x, c *= y.y, d *= y.x, u *= y.y, l += w, c += T, g = Ge(m), m = Cs(g);
    }
  }
  return ao({
    width: d,
    height: u,
    x: l,
    y: c
  });
}
function Eo(e, t) {
  const n = Co(e).scrollLeft;
  return t ? t.left + n : sn(gt(e)).left + n;
}
function ec(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Eo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function jh(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = gt(r), a = t ? xo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ht(1);
  const d = ht(0), u = mt(r);
  if ((u || !u && !s) && (($n(r) !== "body" || lr(i)) && (l = Co(r)), mt(r))) {
    const p = sn(r);
    c = Cn(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? ec(i, l) : ht(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + d.x + f.x,
    y: n.y * c.y - l.scrollTop * c.y + d.y + f.y
  };
}
function Yh(e) {
  return Array.from(e.getClientRects());
}
function Vh(e) {
  const t = gt(e), n = Co(e), r = e.ownerDocument.body, o = Ke(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Ke(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Eo(e);
  const a = -n.scrollTop;
  return at(r).direction === "rtl" && (i += Ke(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const vi = 25;
function Kh(e, t) {
  const n = Ge(e), r = gt(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, l = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = ia();
    (!d || d && t === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  const c = Eo(r);
  if (c <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(r.clientWidth - u.clientWidth - p);
    g <= vi && (s -= g);
  } else c <= vi && (s += c);
  return {
    width: s,
    height: i,
    x: a,
    y: l
  };
}
const Gh = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function qh(e, t) {
  const n = sn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = mt(e) ? Cn(e) : ht(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, l = o * s.x, c = r * s.y;
  return {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function bi(e, t, n) {
  let r;
  if (t === "viewport")
    r = Kh(e, n);
  else if (t === "document")
    r = Vh(gt(e));
  else if (st(t))
    r = qh(t, n);
  else {
    const o = Jl(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return ao(r);
}
function tc(e, t) {
  const n = jt(e);
  return n === t || !st(n) || Dn(n) ? !1 : at(n).position === "fixed" || tc(n, t);
}
function Xh(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = nr(e, [], !1).filter((a) => st(a) && $n(a) !== "body"), o = null;
  const s = at(e).position === "fixed";
  let i = s ? jt(e) : e;
  for (; st(i) && !Dn(i); ) {
    const a = at(i), l = aa(i);
    !l && a.position === "fixed" && (o = null), (s ? !l && !o : !l && a.position === "static" && !!o && Gh.has(o.position) || lr(i) && !l && tc(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = jt(i);
  }
  return t.set(e, r), r;
}
function Zh(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? xo(t) ? [] : Xh(t, this._c) : [].concat(n), r], a = i[0], l = i.reduce((c, d) => {
    const u = bi(t, d, o);
    return c.top = Ke(u.top, c.top), c.right = Ut(u.right, c.right), c.bottom = Ut(u.bottom, c.bottom), c.left = Ke(u.left, c.left), c;
  }, bi(t, a, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Qh(e) {
  const {
    width: t,
    height: n
  } = Ql(e);
  return {
    width: t,
    height: n
  };
}
function Jh(e, t, n) {
  const r = mt(t), o = gt(t), s = n === "fixed", i = sn(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ht(0);
  function c() {
    l.x = Eo(o);
  }
  if (r || !r && !s)
    if (($n(t) !== "body" || lr(o)) && (a = Co(t)), r) {
      const p = sn(t, !0, s, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else o && c();
  s && !r && o && c();
  const d = o && !r && !s ? ec(o, a) : ht(0), u = i.left + a.scrollLeft - l.x - d.x, f = i.top + a.scrollTop - l.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function qo(e) {
  return at(e).position === "static";
}
function wi(e, t) {
  if (!mt(e) || at(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return gt(e) === n && (n = n.ownerDocument.body), n;
}
function nc(e, t) {
  const n = Ge(e);
  if (xo(e))
    return n;
  if (!mt(e)) {
    let o = jt(e);
    for (; o && !Dn(o); ) {
      if (st(o) && !qo(o))
        return o;
      o = jt(o);
    }
    return n;
  }
  let r = wi(e, t);
  for (; r && Oh(r) && qo(r); )
    r = wi(r, t);
  return r && Dn(r) && qo(r) && !aa(r) ? n : r || Wh(e) || n;
}
const em = async function(e) {
  const t = this.getOffsetParent || nc, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Jh(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function tm(e) {
  return at(e).direction === "rtl";
}
const nm = {
  convertOffsetParentRelativeRectToViewportRelativeRect: jh,
  getDocumentElement: gt,
  getClippingRect: Zh,
  getOffsetParent: nc,
  getElementRects: em,
  getClientRects: Yh,
  getDimensions: Qh,
  getScale: Cn,
  isElement: st,
  isRTL: tm
};
function rc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function rm(e, t) {
  let n = null, r;
  const o = gt(e);
  function s() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), s();
    const c = e.getBoundingClientRect(), {
      left: d,
      top: u,
      width: f,
      height: p
    } = c;
    if (a || t(), !f || !p)
      return;
    const g = Or(u), m = Or(o.clientWidth - (d + f)), y = Or(o.clientHeight - (u + p)), b = Or(d), w = {
      rootMargin: -g + "px " + -m + "px " + -y + "px " + -b + "px",
      threshold: Ke(0, Ut(1, l)) || 1
    };
    let T = !0;
    function k(E) {
      const M = E[0].intersectionRatio;
      if (M !== l) {
        if (!T)
          return i();
        M ? i(!1, M) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      M === 1 && !rc(c, e.getBoundingClientRect()) && i(), T = !1;
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
function om(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, c = la(e), d = o || s ? [...c ? nr(c) : [], ...nr(t)] : [];
  d.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const u = c && a ? rm(c, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === c && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = p) == null || w.observe(t);
    })), n();
  }), c && !l && p.observe(c), p.observe(t));
  let g, m = l ? sn(e) : null;
  l && y();
  function y() {
    const b = sn(e);
    m && !rc(m, b) && n(), m = b, g = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    d.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), u?.(), (b = p) == null || b.disconnect(), p = null, l && cancelAnimationFrame(g);
  };
}
const sm = Dh, am = Lh, im = Th, lm = Rh, cm = Sh, ki = Mh, dm = Ah, um = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: nm,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Eh(e, t, {
    ...o,
    platform: s
  });
};
var fm = typeof document < "u", pm = function() {
}, Zr = fm ? go : pm;
function io(e, t) {
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
        if (!io(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !io(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function oc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function xi(e, t) {
  const n = oc(e);
  return Math.round(t * n) / n;
}
function Xo(e) {
  const t = S.useRef(e);
  return Zr(() => {
    t.current = e;
  }), t;
}
function hm(e) {
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
    whileElementsMounted: l,
    open: c
  } = e, [d, u] = S.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = S.useState(r);
  io(f, r) || p(r);
  const [g, m] = S.useState(null), [y, b] = S.useState(null), v = S.useCallback((I) => {
    I !== E.current && (E.current = I, m(I));
  }, []), w = S.useCallback((I) => {
    I !== M.current && (M.current = I, b(I));
  }, []), T = s || g, k = i || y, E = S.useRef(null), M = S.useRef(null), x = S.useRef(d), D = l != null, C = Xo(l), N = Xo(o), A = Xo(c), P = S.useCallback(() => {
    if (!E.current || !M.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    N.current && (I.platform = N.current), um(E.current, M.current, I).then((H) => {
      const q = {
        ...H,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      O.current && !io(x.current, q) && (x.current = q, Rl.flushSync(() => {
        u(q);
      }));
    });
  }, [f, t, n, N, A]);
  Zr(() => {
    c === !1 && x.current.isPositioned && (x.current.isPositioned = !1, u((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [c]);
  const O = S.useRef(!1);
  Zr(() => (O.current = !0, () => {
    O.current = !1;
  }), []), Zr(() => {
    if (T && (E.current = T), k && (M.current = k), T && k) {
      if (C.current)
        return C.current(T, k, P);
      P();
    }
  }, [T, k, P, C, D]);
  const _ = S.useMemo(() => ({
    reference: E,
    floating: M,
    setReference: v,
    setFloating: w
  }), [v, w]), W = S.useMemo(() => ({
    reference: T,
    floating: k
  }), [T, k]), F = S.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return I;
    const H = xi(W.floating, d.x), q = xi(W.floating, d.y);
    return a ? {
      ...I,
      transform: "translate(" + H + "px, " + q + "px)",
      ...oc(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: H,
      top: q
    };
  }, [n, a, W.floating, d.x, d.y]);
  return S.useMemo(() => ({
    ...d,
    update: P,
    refs: _,
    elements: W,
    floatingStyles: F
  }), [d, P, _, W, F]);
}
const mm = (e) => {
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
      return r && t(r) ? r.current != null ? ki({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? ki({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, gm = (e, t) => ({
  ...sm(e),
  options: [e, t]
}), ym = (e, t) => ({
  ...am(e),
  options: [e, t]
}), vm = (e, t) => ({
  ...dm(e),
  options: [e, t]
}), bm = (e, t) => ({
  ...im(e),
  options: [e, t]
}), wm = (e, t) => ({
  ...lm(e),
  options: [e, t]
}), km = (e, t) => ({
  ...cm(e),
  options: [e, t]
}), xm = (e, t) => ({
  ...mm(e),
  options: [e, t]
});
var Cm = "Arrow", sc = S.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ h(
    Pe.svg,
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
sc.displayName = Cm;
var Em = sc;
function Mm(e) {
  const [t, n] = S.useState(void 0);
  return Ft(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let i, a;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, c = Array.isArray(l) ? l[0] : l;
          i = c.inlineSize, a = c.blockSize;
        } else
          i = e.offsetWidth, a = e.offsetHeight;
        n({ width: i, height: a });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var ca = "Popper", [ac, Mo] = On(ca), [Tm, ic] = ac(ca), lc = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = S.useState(null);
  return /* @__PURE__ */ h(Tm, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
lc.displayName = ca;
var cc = "PopperAnchor", dc = S.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = ic(cc, n), i = S.useRef(null), a = _e(t, i), l = S.useRef(null);
    return S.useEffect(() => {
      const c = l.current;
      l.current = r?.current || i.current, c !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ h(Pe.div, { ...o, ref: a });
  }
);
dc.displayName = cc;
var da = "PopperContent", [Sm, Nm] = ac(da), uc = S.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: i = 0,
      arrowPadding: a = 0,
      avoidCollisions: l = !0,
      collisionBoundary: c = [],
      collisionPadding: d = 0,
      sticky: u = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: g,
      ...m
    } = e, y = ic(da, n), [b, v] = S.useState(null), w = _e(t, (L) => v(L)), [T, k] = S.useState(null), E = Mm(T), M = E?.width ?? 0, x = E?.height ?? 0, D = r + (s !== "center" ? "-" + s : ""), C = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, N = Array.isArray(c) ? c : [c], A = N.length > 0, P = {
      padding: C,
      boundary: N.filter(Lm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: O, floatingStyles: _, placement: W, isPositioned: F, middlewareData: I } = hm({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: D,
      whileElementsMounted: (...L) => om(...L, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        gm({ mainAxis: o + x, alignmentAxis: i }),
        l && ym({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? vm() : void 0,
          ...P
        }),
        l && bm({ ...P }),
        wm({
          ...P,
          apply: ({ elements: L, rects: B, availableWidth: U, availableHeight: K }) => {
            const { width: oe, height: ae } = B.reference, ve = L.floating.style;
            ve.setProperty("--radix-popper-available-width", `${U}px`), ve.setProperty("--radix-popper-available-height", `${K}px`), ve.setProperty("--radix-popper-anchor-width", `${oe}px`), ve.setProperty("--radix-popper-anchor-height", `${ae}px`);
          }
        }),
        T && xm({ element: T, padding: a }),
        Am({ arrowWidth: M, arrowHeight: x }),
        f && km({ strategy: "referenceHidden", ...P })
      ]
    }), [H, q] = hc(W), ee = Tt(g);
    Ft(() => {
      F && ee?.();
    }, [F, ee]);
    const te = I.arrow?.x, ne = I.arrow?.y, X = I.arrow?.centerOffset !== 0, [$, Z] = S.useState();
    return Ft(() => {
      b && Z(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ h(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ..._,
          transform: F ? _.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: $,
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
          Sm,
          {
            scope: n,
            placedSide: H,
            onArrowChange: k,
            arrowX: te,
            arrowY: ne,
            shouldHideArrow: X,
            children: /* @__PURE__ */ h(
              Pe.div,
              {
                "data-side": H,
                "data-align": q,
                ...m,
                ref: w,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: F ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
uc.displayName = da;
var fc = "PopperArrow", Dm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, pc = S.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Nm(fc, r), i = Dm[s.placedSide];
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
          Em,
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
pc.displayName = fc;
function Lm(e) {
  return e !== null;
}
var Am = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, l = i ? 0 : e.arrowHeight, [c, d] = hc(n), u = { start: "0%", center: "50%", end: "100%" }[d], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + l / 2;
    let g = "", m = "";
    return c === "bottom" ? (g = i ? u : `${f}px`, m = `${-l}px`) : c === "top" ? (g = i ? u : `${f}px`, m = `${r.floating.height + l}px`) : c === "right" ? (g = `${-l}px`, m = i ? u : `${p}px`) : c === "left" && (g = `${r.floating.width + l}px`, m = i ? u : `${p}px`), { data: { x: g, y: m } };
  }
});
function hc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var mc = lc, gc = dc, yc = uc, vc = pc, Rm = "Portal", ua = S.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = S.useState(!1);
  Ft(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? Zf.createPortal(/* @__PURE__ */ h(Pe.div, { ...r, ref: t }), i) : null;
});
ua.displayName = Rm;
function Im(e, t) {
  return S.useReducer((n, r) => t[n][r] ?? n, e);
}
var an = (e) => {
  const { present: t, children: n } = e, r = Pm(t), o = typeof n == "function" ? n({ present: r.isPresent }) : S.Children.only(n), s = _e(r.ref, Om(o));
  return typeof n == "function" || r.isPresent ? S.cloneElement(o, { ref: s }) : null;
};
an.displayName = "Presence";
function Pm(e) {
  const [t, n] = S.useState(), r = S.useRef(null), o = S.useRef(e), s = S.useRef("none"), i = e ? "mounted" : "unmounted", [a, l] = Im(i, {
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
    const c = _r(r.current);
    s.current = a === "mounted" ? c : "none";
  }, [a]), Ft(() => {
    const c = r.current, d = o.current;
    if (d !== e) {
      const f = s.current, p = _r(c);
      e ? l("MOUNT") : p === "none" || c?.display === "none" ? l("UNMOUNT") : l(d && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), Ft(() => {
    if (t) {
      let c;
      const d = t.ownerDocument.defaultView ?? window, u = (p) => {
        const m = _r(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && m && (l("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = _r(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        d.clearTimeout(c), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: S.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function _r(e) {
  return e?.animationName || "none";
}
function Om(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Zo = "rovingFocusGroup.onEntryFocus", _m = { bubbles: !1, cancelable: !0 }, cr = "RovingFocusGroup", [Es, bc, $m] = Fl(cr), [Hm, wc] = On(
  cr,
  [$m]
), [Bm, Wm] = Hm(cr), kc = S.forwardRef(
  (e, t) => /* @__PURE__ */ h(Es.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(Es.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(zm, { ...e, ref: t }) }) })
);
kc.displayName = cr;
var zm = S.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: i,
    defaultCurrentTabStopId: a,
    onCurrentTabStopIdChange: l,
    onEntryFocus: c,
    preventScrollOnEntryFocus: d = !1,
    ...u
  } = e, f = S.useRef(null), p = _e(t, f), g = Ul(s), [m, y] = ta({
    prop: i,
    defaultProp: a ?? null,
    onChange: l,
    caller: cr
  }), [b, v] = S.useState(!1), w = Tt(c), T = bc(n), k = S.useRef(!1), [E, M] = S.useState(0);
  return S.useEffect(() => {
    const x = f.current;
    if (x)
      return x.addEventListener(Zo, w), () => x.removeEventListener(Zo, w);
  }, [w]), /* @__PURE__ */ h(
    Bm,
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
        Pe.div,
        {
          tabIndex: b || E === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: de(e.onMouseDown, () => {
            k.current = !0;
          }),
          onFocus: de(e.onFocus, (x) => {
            const D = !k.current;
            if (x.target === x.currentTarget && D && !b) {
              const C = new CustomEvent(Zo, _m);
              if (x.currentTarget.dispatchEvent(C), !C.defaultPrevented) {
                const N = T().filter((W) => W.focusable), A = N.find((W) => W.active), P = N.find((W) => W.id === m), _ = [A, P, ...N].filter(
                  Boolean
                ).map((W) => W.ref.current);
                Ec(_, d);
              }
            }
            k.current = !1;
          }),
          onBlur: de(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), xc = "RovingFocusGroupItem", Cc = S.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, l = ro(), c = s || l, d = Wm(xc, n), u = d.currentTabStopId === c, f = bc(n), { onFocusableItemAdd: p, onFocusableItemRemove: g, currentTabStopId: m } = d;
    return S.useEffect(() => {
      if (r)
        return p(), () => g();
    }, [r, p, g]), /* @__PURE__ */ h(
      Es.ItemSlot,
      {
        scope: n,
        id: c,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ h(
          Pe.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...a,
            ref: t,
            onMouseDown: de(e.onMouseDown, (y) => {
              r ? d.onItemFocus(c) : y.preventDefault();
            }),
            onFocus: de(e.onFocus, () => d.onItemFocus(c)),
            onKeyDown: de(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const b = jm(y, d.orientation, d.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = f().filter((T) => T.focusable).map((T) => T.ref.current);
                if (b === "last") w.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && w.reverse();
                  const T = w.indexOf(y.currentTarget);
                  w = d.loop ? Ym(w, T + 1) : w.slice(T + 1);
                }
                setTimeout(() => Ec(w));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: m != null }) : i
          }
        )
      }
    );
  }
);
Cc.displayName = xc;
var Fm = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Um(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function jm(e, t, n) {
  const r = Um(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Fm[r];
}
function Ec(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Ym(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Vm = kc, Km = Cc, Gm = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, hn = /* @__PURE__ */ new WeakMap(), $r = /* @__PURE__ */ new WeakMap(), Hr = {}, Qo = 0, Mc = function(e) {
  return e && (e.host || Mc(e.parentNode));
}, qm = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Mc(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Xm = function(e, t, n, r) {
  var o = qm(t, Array.isArray(e) ? e : [e]);
  Hr[n] || (Hr[n] = /* @__PURE__ */ new WeakMap());
  var s = Hr[n], i = [], a = /* @__PURE__ */ new Set(), l = new Set(o), c = function(u) {
    !u || a.has(u) || (a.add(u), c(u.parentNode));
  };
  o.forEach(c);
  var d = function(u) {
    !u || l.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (a.has(f))
        d(f);
      else
        try {
          var p = f.getAttribute(r), g = p !== null && p !== "false", m = (hn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          hn.set(f, m), s.set(f, y), i.push(f), m === 1 && g && $r.set(f, !0), y === 1 && f.setAttribute(n, "true"), g || f.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(t), a.clear(), Qo++, function() {
    i.forEach(function(u) {
      var f = hn.get(u) - 1, p = s.get(u) - 1;
      hn.set(u, f), s.set(u, p), f || ($r.has(u) || u.removeAttribute(r), $r.delete(u)), p || u.removeAttribute(n);
    }), Qo--, Qo || (hn = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap(), $r = /* @__PURE__ */ new WeakMap(), Hr = {});
  };
}, Zm = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Gm(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Xm(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, ut = function() {
  return ut = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, ut.apply(this, arguments);
};
function Tc(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Qm(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Qr = "right-scroll-bar-position", Jr = "width-before-scroll-bar", Jm = "with-scroll-bars-hidden", eg = "--removed-body-scroll-bar-size";
function Jo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function tg(e, t) {
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
var ng = typeof window < "u" ? S.useLayoutEffect : S.useEffect, Ci = /* @__PURE__ */ new WeakMap();
function rg(e, t) {
  var n = tg(null, function(r) {
    return e.forEach(function(o) {
      return Jo(o, r);
    });
  });
  return ng(function() {
    var r = Ci.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Jo(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Jo(a, i);
      });
    }
    Ci.set(n, e);
  }, [e]), n;
}
function og(e) {
  return e;
}
function sg(e, t) {
  t === void 0 && (t = og);
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
      var l = function() {
        var d = i;
        i = [], d.forEach(s);
      }, c = function() {
        return Promise.resolve().then(l);
      };
      c(), n = {
        push: function(d) {
          i.push(d), c();
        },
        filter: function(d) {
          return i = i.filter(d), n;
        }
      };
    }
  };
  return o;
}
function ag(e) {
  e === void 0 && (e = {});
  var t = sg(null);
  return t.options = ut({ async: !0, ssr: !1 }, e), t;
}
var Sc = function(e) {
  var t = e.sideCar, n = Tc(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return S.createElement(r, ut({}, n));
};
Sc.isSideCarExport = !0;
function ig(e, t) {
  return e.useMedium(t), Sc;
}
var Nc = ag(), es = function() {
}, To = S.forwardRef(function(e, t) {
  var n = S.useRef(null), r = S.useState({
    onScrollCapture: es,
    onWheelCapture: es,
    onTouchMoveCapture: es
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, l = e.className, c = e.removeScrollBar, d = e.enabled, u = e.shards, f = e.sideCar, p = e.noRelative, g = e.noIsolation, m = e.inert, y = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, w = e.gapMode, T = Tc(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), k = f, E = rg([n, t]), M = ut(ut({}, T), o);
  return S.createElement(
    S.Fragment,
    null,
    d && S.createElement(k, { sideCar: Nc, removeScrollBar: c, shards: u, noRelative: p, noIsolation: g, inert: m, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    i ? S.cloneElement(S.Children.only(a), ut(ut({}, M), { ref: E })) : S.createElement(v, ut({}, M, { className: l, ref: E }), a)
  );
});
To.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
To.classNames = {
  fullWidth: Jr,
  zeroRight: Qr
};
var lg = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function cg() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = lg();
  return t && e.setAttribute("nonce", t), e;
}
function dg(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ug(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var fg = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = cg()) && (dg(t, n), ug(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, pg = function() {
  var e = fg();
  return function(t, n) {
    S.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Dc = function() {
  var e = pg(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, hg = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ts = function(e) {
  return parseInt(e || "", 10) || 0;
}, mg = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ts(n), ts(r), ts(o)];
}, gg = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return hg;
  var t = mg(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, yg = Dc(), En = "data-scroll-locked", vg = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Jm, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(En, `] {
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
  
  .`).concat(Qr, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Jr, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Qr, " .").concat(Qr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Jr, " .").concat(Jr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(En, `] {
    `).concat(eg, ": ").concat(a, `px;
  }
`);
}, Ei = function() {
  var e = parseInt(document.body.getAttribute(En) || "0", 10);
  return isFinite(e) ? e : 0;
}, bg = function() {
  S.useEffect(function() {
    return document.body.setAttribute(En, (Ei() + 1).toString()), function() {
      var e = Ei() - 1;
      e <= 0 ? document.body.removeAttribute(En) : document.body.setAttribute(En, e.toString());
    };
  }, []);
}, wg = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  bg();
  var s = S.useMemo(function() {
    return gg(o);
  }, [o]);
  return S.createElement(yg, { styles: vg(s, !t, o, n ? "" : "!important") });
}, Ms = !1;
if (typeof window < "u")
  try {
    var Br = Object.defineProperty({}, "passive", {
      get: function() {
        return Ms = !0, !0;
      }
    });
    window.addEventListener("test", Br, Br), window.removeEventListener("test", Br, Br);
  } catch {
    Ms = !1;
  }
var mn = Ms ? { passive: !1 } : !1, kg = function(e) {
  return e.tagName === "TEXTAREA";
}, Lc = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !kg(e) && n[t] === "visible")
  );
}, xg = function(e) {
  return Lc(e, "overflowY");
}, Cg = function(e) {
  return Lc(e, "overflowX");
}, Mi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ac(e, r);
    if (o) {
      var s = Rc(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Eg = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Mg = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ac = function(e, t) {
  return e === "v" ? xg(t) : Cg(t);
}, Rc = function(e, t) {
  return e === "v" ? Eg(t) : Mg(t);
}, Tg = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Sg = function(e, t, n, r, o) {
  var s = Tg(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, l = t.contains(a), c = !1, d = i > 0, u = 0, f = 0;
  do {
    if (!a)
      break;
    var p = Rc(e, a), g = p[0], m = p[1], y = p[2], b = m - y - s * g;
    (g || b) && Ac(e, a) && (u += b, f += g);
    var v = a.parentNode;
    a = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !l && a !== document.body || // self content
    l && (t.contains(a) || t === a)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(f) < 1) && (c = !0), c;
}, Wr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ti = function(e) {
  return [e.deltaX, e.deltaY];
}, Si = function(e) {
  return e && "current" in e ? e.current : e;
}, Ng = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Dg = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Lg = 0, gn = [];
function Ag(e) {
  var t = S.useRef([]), n = S.useRef([0, 0]), r = S.useRef(), o = S.useState(Lg++)[0], s = S.useState(Dc)[0], i = S.useRef(e);
  S.useEffect(function() {
    i.current = e;
  }, [e]), S.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = Qm([e.lockRef.current], (e.shards || []).map(Si), !0).filter(Boolean);
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
    var b = Wr(m), v = n.current, w = "deltaX" in m ? m.deltaX : v[0] - b[0], T = "deltaY" in m ? m.deltaY : v[1] - b[1], k, E = m.target, M = Math.abs(w) > Math.abs(T) ? "h" : "v";
    if ("touches" in m && M === "h" && E.type === "range")
      return !1;
    var x = Mi(M, E);
    if (!x)
      return !0;
    if (x ? k = M : (k = M === "v" ? "h" : "v", x = Mi(M, E)), !x)
      return !1;
    if (!r.current && "changedTouches" in m && (w || T) && (r.current = k), !k)
      return !0;
    var D = r.current || k;
    return Sg(D, y, m, D === "h" ? w : T);
  }, []), l = S.useCallback(function(m) {
    var y = m;
    if (!(!gn.length || gn[gn.length - 1] !== s)) {
      var b = "deltaY" in y ? Ti(y) : Wr(y), v = t.current.filter(function(k) {
        return k.name === y.type && (k.target === y.target || y.target === k.shadowParent) && Ng(k.delta, b);
      })[0];
      if (v && v.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!v) {
        var w = (i.current.shards || []).map(Si).filter(Boolean).filter(function(k) {
          return k.contains(y.target);
        }), T = w.length > 0 ? a(y, w[0]) : !i.current.noIsolation;
        T && y.cancelable && y.preventDefault();
      }
    }
  }, []), c = S.useCallback(function(m, y, b, v) {
    var w = { name: m, delta: y, target: b, should: v, shadowParent: Rg(b) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(T) {
        return T !== w;
      });
    }, 1);
  }, []), d = S.useCallback(function(m) {
    n.current = Wr(m), r.current = void 0;
  }, []), u = S.useCallback(function(m) {
    c(m.type, Ti(m), m.target, a(m, e.lockRef.current));
  }, []), f = S.useCallback(function(m) {
    c(m.type, Wr(m), m.target, a(m, e.lockRef.current));
  }, []);
  S.useEffect(function() {
    return gn.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, mn), document.addEventListener("touchmove", l, mn), document.addEventListener("touchstart", d, mn), function() {
      gn = gn.filter(function(m) {
        return m !== s;
      }), document.removeEventListener("wheel", l, mn), document.removeEventListener("touchmove", l, mn), document.removeEventListener("touchstart", d, mn);
    };
  }, []);
  var p = e.removeScrollBar, g = e.inert;
  return S.createElement(
    S.Fragment,
    null,
    g ? S.createElement(s, { styles: Dg(o) }) : null,
    p ? S.createElement(wg, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Rg(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Ig = ig(Nc, Ag);
var Ic = S.forwardRef(function(e, t) {
  return S.createElement(To, ut({}, e, { ref: t, sideCar: Ig }));
});
Ic.classNames = To.classNames;
var Ts = ["Enter", " "], Pg = ["ArrowDown", "PageUp", "Home"], Pc = ["ArrowUp", "PageDown", "End"], Og = [...Pg, ...Pc], _g = {
  ltr: [...Ts, "ArrowRight"],
  rtl: [...Ts, "ArrowLeft"]
}, $g = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, dr = "Menu", [rr, Hg, Bg] = Fl(dr), [ln, Oc] = On(dr, [
  Bg,
  Mo,
  wc
]), So = Mo(), _c = wc(), [Wg, cn] = ln(dr), [zg, ur] = ln(dr), $c = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = So(t), [l, c] = S.useState(null), d = S.useRef(!1), u = Tt(s), f = Ul(o);
  return S.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ h(mc, { ...a, children: /* @__PURE__ */ h(
    Wg,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: l,
      onContentChange: c,
      children: /* @__PURE__ */ h(
        zg,
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
$c.displayName = dr;
var Fg = "MenuAnchor", fa = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = So(n);
    return /* @__PURE__ */ h(gc, { ...o, ...r, ref: t });
  }
);
fa.displayName = Fg;
var pa = "MenuPortal", [Ug, Hc] = ln(pa, {
  forceMount: void 0
}), Bc = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = cn(pa, t);
  return /* @__PURE__ */ h(Ug, { scope: t, forceMount: n, children: /* @__PURE__ */ h(an, { present: n || s.open, children: /* @__PURE__ */ h(ua, { asChild: !0, container: o, children: r }) }) });
};
Bc.displayName = pa;
var tt = "MenuContent", [jg, ha] = ln(tt), Wc = S.forwardRef(
  (e, t) => {
    const n = Hc(tt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = cn(tt, e.__scopeMenu), i = ur(tt, e.__scopeMenu);
    return /* @__PURE__ */ h(rr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(an, { present: r || s.open, children: /* @__PURE__ */ h(rr.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ h(Yg, { ...o, ref: t }) : /* @__PURE__ */ h(Vg, { ...o, ref: t }) }) }) });
  }
), Yg = S.forwardRef(
  (e, t) => {
    const n = cn(tt, e.__scopeMenu), r = S.useRef(null), o = _e(t, r);
    return S.useEffect(() => {
      const s = r.current;
      if (s) return Zm(s);
    }, []), /* @__PURE__ */ h(
      ma,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: de(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Vg = S.forwardRef((e, t) => {
  const n = cn(tt, e.__scopeMenu);
  return /* @__PURE__ */ h(
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
}), Kg = /* @__PURE__ */ er("MenuContent.ScrollLock"), ma = S.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: s,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: a,
      onEntryFocus: l,
      onEscapeKeyDown: c,
      onPointerDownOutside: d,
      onFocusOutside: u,
      onInteractOutside: f,
      onDismiss: p,
      disableOutsideScroll: g,
      ...m
    } = e, y = cn(tt, n), b = ur(tt, n), v = So(n), w = _c(n), T = Hg(n), [k, E] = S.useState(null), M = S.useRef(null), x = _e(t, M, y.onContentChange), D = S.useRef(0), C = S.useRef(""), N = S.useRef(0), A = S.useRef(null), P = S.useRef("right"), O = S.useRef(0), _ = g ? Ic : S.Fragment, W = g ? { as: Kg, allowPinchZoom: !0 } : void 0, F = (H) => {
      const q = C.current + H, ee = T().filter((L) => !L.disabled), te = document.activeElement, ne = ee.find((L) => L.ref.current === te)?.textValue, X = ee.map((L) => L.textValue), $ = sy(X, q, ne), Z = ee.find((L) => L.textValue === $)?.ref.current;
      (function L(B) {
        C.current = B, window.clearTimeout(D.current), B !== "" && (D.current = window.setTimeout(() => L(""), 1e3));
      })(q), Z && setTimeout(() => Z.focus());
    };
    S.useEffect(() => () => window.clearTimeout(D.current), []), rh();
    const I = S.useCallback((H) => P.current === A.current?.side && iy(H, A.current?.area), []);
    return /* @__PURE__ */ h(
      jg,
      {
        scope: n,
        searchRef: C,
        onItemEnter: S.useCallback(
          (H) => {
            I(H) && H.preventDefault();
          },
          [I]
        ),
        onItemLeave: S.useCallback(
          (H) => {
            I(H) || (M.current?.focus(), E(null));
          },
          [I]
        ),
        onTriggerLeave: S.useCallback(
          (H) => {
            I(H) && H.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: N,
        onPointerGraceIntentChange: S.useCallback((H) => {
          A.current = H;
        }, []),
        children: /* @__PURE__ */ h(_, { ...W, children: /* @__PURE__ */ h(
          Vl,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: de(s, (H) => {
              H.preventDefault(), M.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ h(
              na,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: c,
                onPointerDownOutside: d,
                onFocusOutside: u,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ h(
                  Vm,
                  {
                    asChild: !0,
                    ...w,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: k,
                    onCurrentTabStopIdChange: E,
                    onEntryFocus: de(l, (H) => {
                      b.isUsingKeyboardRef.current || H.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ h(
                      yc,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": nd(y.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...m,
                        ref: x,
                        style: { outline: "none", ...m.style },
                        onKeyDown: de(m.onKeyDown, (H) => {
                          const ee = H.target.closest("[data-radix-menu-content]") === H.currentTarget, te = H.ctrlKey || H.altKey || H.metaKey, ne = H.key.length === 1;
                          ee && (H.key === "Tab" && H.preventDefault(), !te && ne && F(H.key));
                          const X = M.current;
                          if (H.target !== X || !Og.includes(H.key)) return;
                          H.preventDefault();
                          const Z = T().filter((L) => !L.disabled).map((L) => L.ref.current);
                          Pc.includes(H.key) && Z.reverse(), ry(Z);
                        }),
                        onBlur: de(e.onBlur, (H) => {
                          H.currentTarget.contains(H.target) || (window.clearTimeout(D.current), C.current = "");
                        }),
                        onPointerMove: de(
                          e.onPointerMove,
                          or((H) => {
                            const q = H.target, ee = O.current !== H.clientX;
                            if (H.currentTarget.contains(q) && ee) {
                              const te = H.clientX > O.current ? "right" : "left";
                              P.current = te, O.current = H.clientX;
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
Wc.displayName = tt;
var Gg = "MenuGroup", ga = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(Pe.div, { role: "group", ...r, ref: t });
  }
);
ga.displayName = Gg;
var qg = "MenuLabel", zc = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(Pe.div, { ...r, ref: t });
  }
);
zc.displayName = qg;
var lo = "MenuItem", Ni = "menu.itemSelect", No = S.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = S.useRef(null), i = ur(lo, e.__scopeMenu), a = ha(lo, e.__scopeMenu), l = _e(t, s), c = S.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const f = new CustomEvent(Ni, { bubbles: !0, cancelable: !0 });
        u.addEventListener(Ni, (p) => r?.(p), { once: !0 }), zl(u, f), f.defaultPrevented ? c.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ h(
      Fc,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: de(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), c.current = !0;
        },
        onPointerUp: de(e.onPointerUp, (u) => {
          c.current || u.currentTarget?.click();
        }),
        onKeyDown: de(e.onKeyDown, (u) => {
          const f = a.searchRef.current !== "";
          n || f && u.key === " " || Ts.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
No.displayName = lo;
var Fc = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = ha(lo, n), a = _c(n), l = S.useRef(null), c = _e(t, l), [d, u] = S.useState(!1), [f, p] = S.useState("");
    return S.useEffect(() => {
      const g = l.current;
      g && p((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ h(
      rr.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ h(Km, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ h(
          Pe.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: c,
            onPointerMove: de(
              e.onPointerMove,
              or((g) => {
                r ? i.onItemLeave(g) : (i.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: de(
              e.onPointerLeave,
              or((g) => i.onItemLeave(g))
            ),
            onFocus: de(e.onFocus, () => u(!0)),
            onBlur: de(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), Xg = "MenuCheckboxItem", Uc = S.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ h(Gc, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ h(
      No,
      {
        role: "menuitemcheckbox",
        "aria-checked": co(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": va(n),
        onSelect: de(
          o.onSelect,
          () => r?.(co(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Uc.displayName = Xg;
var jc = "MenuRadioGroup", [Zg, Qg] = ln(
  jc,
  { value: void 0, onValueChange: () => {
  } }
), Yc = S.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = Tt(r);
    return /* @__PURE__ */ h(Zg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ h(ga, { ...o, ref: t }) });
  }
);
Yc.displayName = jc;
var Vc = "MenuRadioItem", Kc = S.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Qg(Vc, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ h(Gc, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ h(
      No,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": va(s),
        onSelect: de(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Kc.displayName = Vc;
var ya = "MenuItemIndicator", [Gc, Jg] = ln(
  ya,
  { checked: !1 }
), qc = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = Jg(ya, n);
    return /* @__PURE__ */ h(
      an,
      {
        present: r || co(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ h(
          Pe.span,
          {
            ...o,
            ref: t,
            "data-state": va(s.checked)
          }
        )
      }
    );
  }
);
qc.displayName = ya;
var ey = "MenuSeparator", Xc = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(
      Pe.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Xc.displayName = ey;
var ty = "MenuArrow", Zc = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = So(n);
    return /* @__PURE__ */ h(vc, { ...o, ...r, ref: t });
  }
);
Zc.displayName = ty;
var ny = "MenuSub", [dE, Qc] = ln(ny), Kn = "MenuSubTrigger", Jc = S.forwardRef(
  (e, t) => {
    const n = cn(Kn, e.__scopeMenu), r = ur(Kn, e.__scopeMenu), o = Qc(Kn, e.__scopeMenu), s = ha(Kn, e.__scopeMenu), i = S.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: l } = s, c = { __scopeMenu: e.__scopeMenu }, d = S.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return S.useEffect(() => d, [d]), S.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), l(null);
      };
    }, [a, l]), /* @__PURE__ */ h(fa, { asChild: !0, ...c, children: /* @__PURE__ */ h(
      Fc,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": nd(n.open),
        ...e,
        ref: wo(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: de(
          e.onPointerMove,
          or((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: de(
          e.onPointerLeave,
          or((u) => {
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
        onKeyDown: de(e.onKeyDown, (u) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && u.key === " " || _g[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Jc.displayName = Kn;
var ed = "MenuSubContent", td = S.forwardRef(
  (e, t) => {
    const n = Hc(tt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = cn(tt, e.__scopeMenu), i = ur(tt, e.__scopeMenu), a = Qc(ed, e.__scopeMenu), l = S.useRef(null), c = _e(t, l);
    return /* @__PURE__ */ h(rr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(an, { present: r || s.open, children: /* @__PURE__ */ h(rr.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(
      ma,
      {
        id: a.contentId,
        "aria-labelledby": a.triggerId,
        ...o,
        ref: c,
        align: "start",
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (d) => {
          i.isUsingKeyboardRef.current && l.current?.focus(), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: de(e.onFocusOutside, (d) => {
          d.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: de(e.onEscapeKeyDown, (d) => {
          i.onClose(), d.preventDefault();
        }),
        onKeyDown: de(e.onKeyDown, (d) => {
          const u = d.currentTarget.contains(d.target), f = $g[i.dir].includes(d.key);
          u && f && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
td.displayName = ed;
function nd(e) {
  return e ? "open" : "closed";
}
function co(e) {
  return e === "indeterminate";
}
function va(e) {
  return co(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function ry(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function oy(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function sy(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = oy(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((c) => c !== n));
  const l = i.find(
    (c) => c.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function ay(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], l = t[i], c = a.x, d = a.y, u = l.x, f = l.y;
    d > r != f > r && n < (u - c) * (r - d) / (f - d) + c && (o = !o);
  }
  return o;
}
function iy(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return ay(n, t);
}
function or(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var ly = $c, cy = fa, dy = Bc, uy = Wc, fy = ga, py = zc, hy = No, my = Uc, gy = Yc, yy = Kc, vy = qc, by = Xc, wy = Zc, ky = Jc, xy = td, Do = "DropdownMenu", [Cy] = On(
  Do,
  [Oc]
), We = Oc(), [Ey, rd] = Cy(Do), od = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, l = We(t), c = S.useRef(null), [d, u] = ta({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: Do
  });
  return /* @__PURE__ */ h(
    Ey,
    {
      scope: t,
      triggerId: ro(),
      triggerRef: c,
      contentId: ro(),
      open: d,
      onOpenChange: u,
      onOpenToggle: S.useCallback(() => u((f) => !f), [u]),
      modal: a,
      children: /* @__PURE__ */ h(ly, { ...l, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
od.displayName = Do;
var sd = "DropdownMenuTrigger", ad = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = rd(sd, n), i = We(n);
    return /* @__PURE__ */ h(cy, { asChild: !0, ...i, children: /* @__PURE__ */ h(
      Pe.button,
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
        ref: wo(t, s.triggerRef),
        onPointerDown: de(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: de(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
ad.displayName = sd;
var My = "DropdownMenuPortal", id = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = We(t);
  return /* @__PURE__ */ h(dy, { ...r, ...n });
};
id.displayName = My;
var ld = "DropdownMenuContent", cd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = rd(ld, n), s = We(n), i = S.useRef(!1);
    return /* @__PURE__ */ h(
      uy,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: de(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: de(e.onInteractOutside, (a) => {
          const l = a.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0, d = l.button === 2 || c;
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
cd.displayName = ld;
var Ty = "DropdownMenuGroup", Sy = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
    return /* @__PURE__ */ h(fy, { ...o, ...r, ref: t });
  }
);
Sy.displayName = Ty;
var Ny = "DropdownMenuLabel", Dy = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
    return /* @__PURE__ */ h(py, { ...o, ...r, ref: t });
  }
);
Dy.displayName = Ny;
var Ly = "DropdownMenuItem", dd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
    return /* @__PURE__ */ h(hy, { ...o, ...r, ref: t });
  }
);
dd.displayName = Ly;
var Ay = "DropdownMenuCheckboxItem", Ry = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
  return /* @__PURE__ */ h(my, { ...o, ...r, ref: t });
});
Ry.displayName = Ay;
var Iy = "DropdownMenuRadioGroup", Py = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
  return /* @__PURE__ */ h(gy, { ...o, ...r, ref: t });
});
Py.displayName = Iy;
var Oy = "DropdownMenuRadioItem", _y = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
  return /* @__PURE__ */ h(yy, { ...o, ...r, ref: t });
});
_y.displayName = Oy;
var $y = "DropdownMenuItemIndicator", Hy = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
  return /* @__PURE__ */ h(vy, { ...o, ...r, ref: t });
});
Hy.displayName = $y;
var By = "DropdownMenuSeparator", ud = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
  return /* @__PURE__ */ h(by, { ...o, ...r, ref: t });
});
ud.displayName = By;
var Wy = "DropdownMenuArrow", zy = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
    return /* @__PURE__ */ h(wy, { ...o, ...r, ref: t });
  }
);
zy.displayName = Wy;
var Fy = "DropdownMenuSubTrigger", Uy = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
  return /* @__PURE__ */ h(ky, { ...o, ...r, ref: t });
});
Uy.displayName = Fy;
var jy = "DropdownMenuSubContent", Yy = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = We(n);
  return /* @__PURE__ */ h(
    xy,
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
Yy.displayName = jy;
var Vy = od, Ky = ad, Gy = id, qy = cd, Xy = dd, Zy = ud;
function fd(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = fd(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function pd() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = fd(e)) && (r && (r += " "), r += t);
  return r;
}
const ba = "-", Qy = (e) => {
  const t = ev(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(ba);
      return a[0] === "" && a.length !== 1 && a.shift(), hd(a, t) || Jy(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const l = n[i] || [];
      return a && r[i] ? [...l, ...r[i]] : l;
    }
  };
}, hd = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? hd(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(ba);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Di = /^\[(.+)\]$/, Jy = (e) => {
  if (Di.test(e)) {
    const t = Di.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, ev = (e) => {
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
      const s = o === "" ? t : Li(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (tv(o)) {
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
      Ss(i, Li(t, s), n, r);
    });
  });
}, Li = (e, t) => {
  let n = e;
  return t.split(ba).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, tv = (e) => e.isThemeGetter, nv = (e) => {
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
}, Ns = "!", Ds = ":", rv = Ds.length, ov = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let i = 0, a = 0, l = 0, c;
    for (let g = 0; g < o.length; g++) {
      let m = o[g];
      if (i === 0 && a === 0) {
        if (m === Ds) {
          s.push(o.slice(l, g)), l = g + rv;
          continue;
        }
        if (m === "/") {
          c = g;
          continue;
        }
      }
      m === "[" ? i++ : m === "]" ? i-- : m === "(" ? a++ : m === ")" && a--;
    }
    const d = s.length === 0 ? o : o.substring(l), u = sv(d), f = u !== d, p = c && c > l ? c - l : void 0;
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
}, sv = (e) => e.endsWith(Ns) ? e.substring(0, e.length - 1) : e.startsWith(Ns) ? e.substring(1) : e, av = (e) => {
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
}, iv = (e) => ({
  cache: nv(e.cacheSize),
  parseClassName: ov(e),
  sortModifiers: av(e),
  ...Qy(e)
}), lv = /\s+/, cv = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(lv);
  let l = "";
  for (let c = a.length - 1; c >= 0; c -= 1) {
    const d = a[c], {
      isExternal: u,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: g,
      maybePostfixModifierPosition: m
    } = n(d);
    if (u) {
      l = d + (l.length > 0 ? " " + l : l);
      continue;
    }
    let y = !!m, b = r(y ? g.substring(0, m) : g);
    if (!b) {
      if (!y) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (b = r(g), !b) {
        l = d + (l.length > 0 ? " " + l : l);
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
    l = d + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function dv() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = md(t)) && (r && (r += " "), r += n);
  return r;
}
const md = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = md(e[r])) && (n && (n += " "), n += t);
  return n;
};
function uv(e, ...t) {
  let n, r, o, s = i;
  function i(l) {
    const c = t.reduce((d, u) => u(d), e());
    return n = iv(c), r = n.cache.get, o = n.cache.set, s = a, a(l);
  }
  function a(l) {
    const c = r(l);
    if (c)
      return c;
    const d = cv(l, n);
    return o(l, d), d;
  }
  return function() {
    return s(dv.apply(null, arguments));
  };
}
const Te = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, gd = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, yd = /^\((?:(\w[\w-]*):)?(.+)\)$/i, fv = /^\d+\/\d+$/, pv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, hv = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, mv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, gv = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, yv = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, yn = (e) => fv.test(e), fe = (e) => !!e && !Number.isNaN(Number(e)), _t = (e) => !!e && Number.isInteger(Number(e)), ns = (e) => e.endsWith("%") && fe(e.slice(0, -1)), bt = (e) => pv.test(e), vv = () => !0, bv = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  hv.test(e) && !mv.test(e)
), vd = () => !1, wv = (e) => gv.test(e), kv = (e) => yv.test(e), xv = (e) => !Q(e) && !J(e), Cv = (e) => Hn(e, kd, vd), Q = (e) => gd.test(e), Xt = (e) => Hn(e, xd, bv), rs = (e) => Hn(e, Nv, fe), Ai = (e) => Hn(e, bd, vd), Ev = (e) => Hn(e, wd, kv), zr = (e) => Hn(e, Cd, wv), J = (e) => yd.test(e), Un = (e) => Bn(e, xd), Mv = (e) => Bn(e, Dv), Ri = (e) => Bn(e, bd), Tv = (e) => Bn(e, kd), Sv = (e) => Bn(e, wd), Fr = (e) => Bn(e, Cd, !0), Hn = (e, t, n) => {
  const r = gd.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Bn = (e, t, n = !1) => {
  const r = yd.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, bd = (e) => e === "position" || e === "percentage", wd = (e) => e === "image" || e === "url", kd = (e) => e === "length" || e === "size" || e === "bg-size", xd = (e) => e === "length", Nv = (e) => e === "number", Dv = (e) => e === "family-name", Cd = (e) => e === "shadow", Lv = () => {
  const e = Te("color"), t = Te("font"), n = Te("text"), r = Te("font-weight"), o = Te("tracking"), s = Te("leading"), i = Te("breakpoint"), a = Te("container"), l = Te("spacing"), c = Te("radius"), d = Te("shadow"), u = Te("inset-shadow"), f = Te("text-shadow"), p = Te("drop-shadow"), g = Te("blur"), m = Te("perspective"), y = Te("aspect"), b = Te("ease"), v = Te("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => [
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
  ], k = () => [...T(), J, Q], E = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], x = () => [J, Q, l], D = () => [yn, "full", "auto", ...x()], C = () => [_t, "none", "subgrid", J, Q], N = () => ["auto", {
    span: ["full", _t, J, Q]
  }, _t, J, Q], A = () => [_t, "auto", J, Q], P = () => ["auto", "min", "max", "fr", J, Q], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], _ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...x()], F = () => [yn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], I = () => [e, J, Q], H = () => [...T(), Ri, Ai, {
    position: [J, Q]
  }], q = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ee = () => ["auto", "cover", "contain", Tv, Cv, {
    size: [J, Q]
  }], te = () => [ns, Un, Xt], ne = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    J,
    Q
  ], X = () => ["", fe, Un, Xt], $ = () => ["solid", "dashed", "dotted", "double"], Z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], L = () => [fe, ns, Ri, Ai], B = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    J,
    Q
  ], U = () => ["none", fe, J, Q], K = () => ["none", fe, J, Q], oe = () => [fe, J, Q], ae = () => [yn, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [bt],
      breakpoint: [bt],
      color: [vv],
      container: [bt],
      "drop-shadow": [bt],
      ease: ["in", "out", "in-out"],
      font: [xv],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [bt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [bt],
      shadow: [bt],
      spacing: ["px", fe],
      text: [bt],
      "text-shadow": [bt],
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
        aspect: ["auto", "square", yn, Q, J, y]
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
        columns: [fe, Q, J, a]
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
        z: [_t, "auto", J, Q]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [yn, "full", "auto", a, ...x()]
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
        flex: [fe, yn, "auto", "initial", "none", Q]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", fe, J, Q]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", fe, J, Q]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [_t, "first", "last", "none", J, Q]
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
        justify: [...O(), "normal"]
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
        content: ["normal", ...O()]
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
        "place-content": O()
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
        size: F()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...F()]
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
          ...F()
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
          ...F()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...F()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...F()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...F()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Un, Xt]
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
        font: [r, J, rs]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ns, Q]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Mv, Q, t]
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
        tracking: [o, J, Q]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [fe, "none", J, rs]
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
        "list-image": ["none", J, Q]
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
        list: ["disc", "decimal", "none", J, Q]
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
        decoration: [...$(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [fe, "from-font", "auto", J, Xt]
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
        "underline-offset": [fe, "auto", J, Q]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", J, Q]
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
        content: ["none", J, Q]
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
        bg: H()
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
        bg: ee()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, _t, J, Q],
          radial: ["", J, Q],
          conic: [_t, J, Q]
        }, Sv, Ev]
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
        rounded: ne()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ne()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ne()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ne()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ne()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ne()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ne()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ne()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ne()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ne()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ne()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ne()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ne()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ne()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ne()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: X()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": X()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": X()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": X()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": X()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": X()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": X()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": X()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": X()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": X()
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
        "divide-y": X()
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
        border: [...$(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...$(), "hidden", "none"]
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
        outline: [...$(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [fe, J, Q]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", fe, Un, Xt]
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
          Fr,
          zr
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
        "inset-shadow": ["none", u, Fr, zr]
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
        ring: X()
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
        "ring-offset": [fe, Xt]
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
        "inset-ring": X()
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
        "text-shadow": ["none", f, Fr, zr]
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
        opacity: [fe, J, Q]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Z(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Z()
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
        "mask-linear": [fe]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": L()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": L()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": L()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": L()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": L()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": L()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": L()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": L()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": L()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": L()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": L()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": L()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": L()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": L()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": I()
      }],
      "mask-image-radial": [{
        "mask-radial": [J, Q]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": L()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": L()
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
        "mask-conic": [fe]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": L()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": L()
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
        mask: H()
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
        mask: ee()
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
        mask: ["none", J, Q]
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
          J,
          Q
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: B()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [fe, J, Q]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [fe, J, Q]
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
          Fr,
          zr
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
        grayscale: ["", fe, J, Q]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [fe, J, Q]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", fe, J, Q]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [fe, J, Q]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", fe, J, Q]
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
          J,
          Q
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": B()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [fe, J, Q]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [fe, J, Q]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", fe, J, Q]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [fe, J, Q]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", fe, J, Q]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [fe, J, Q]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [fe, J, Q]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", fe, J, Q]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", J, Q]
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
        duration: [fe, "initial", J, Q]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", b, J, Q]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [fe, J, Q]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, J, Q]
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
        perspective: [m, J, Q]
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
        rotate: U()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": U()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": U()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": U()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: K()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": K()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": K()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": K()
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
        skew: oe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": oe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": oe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [J, Q, "", "none", "gpu", "cpu"]
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
        translate: ae()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ae()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ae()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ae()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", J, Q]
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
        "will-change": ["auto", "scroll", "contents", "transform", J, Q]
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
        stroke: [fe, Un, Xt, rs]
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
}, Av = /* @__PURE__ */ uv(Lv);
function ce(...e) {
  return Av(pd(e));
}
function os({
  ...e
}) {
  return /* @__PURE__ */ h(Vy, { "data-slot": "dropdown-menu", ...e });
}
function ss({
  ...e
}) {
  return /* @__PURE__ */ h(
    Ky,
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
  return /* @__PURE__ */ h(Gy, { children: /* @__PURE__ */ h(
    qy,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: ce(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function Ce({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ h(
    Xy,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: ce(
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
    Zy,
    {
      "data-slot": "dropdown-menu-separator",
      className: ce("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
const Ii = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Pi = pd, Rv = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Pi(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((c) => {
    const d = n?.[c], u = s?.[c];
    if (d === null) return null;
    const f = Ii(d) || Ii(u);
    return o[c][f];
  }), a = n && Object.entries(n).reduce((c, d) => {
    let [u, f] = d;
    return f === void 0 || (c[u] = f), c;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, d) => {
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
      ...c,
      u,
      f
    ] : c;
  }, []);
  return Pi(e, i, l, n?.class, n?.className);
}, Ls = Rv(
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
function on({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ h(
    r ? zp : "button",
    {
      "data-slot": "button",
      className: ce(Ls({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
var Iv = Object.freeze({
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
}), Pv = "VisuallyHidden", Ed = S.forwardRef(
  (e, t) => /* @__PURE__ */ h(
    Pe.span,
    {
      ...e,
      ref: t,
      style: { ...Iv, ...e.style }
    }
  )
);
Ed.displayName = Pv;
var Ov = Ed, [Lo] = On("Tooltip", [
  Mo
]), Ao = Mo(), Md = "TooltipProvider", _v = 700, As = "tooltip.open", [$v, wa] = Lo(Md), Td = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = _v,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = S.useRef(!0), a = S.useRef(!1), l = S.useRef(0);
  return S.useEffect(() => {
    const c = l.current;
    return () => window.clearTimeout(c);
  }, []), /* @__PURE__ */ h(
    $v,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: n,
      onOpen: S.useCallback(() => {
        window.clearTimeout(l.current), i.current = !1;
      }, []),
      onClose: S.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => i.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: S.useCallback((c) => {
        a.current = c;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
Td.displayName = Md;
var sr = "Tooltip", [Hv, fr] = Lo(sr), Sd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, l = wa(sr, e.__scopeTooltip), c = Ao(t), [d, u] = S.useState(null), f = ro(), p = S.useRef(0), g = i ?? l.disableHoverableContent, m = a ?? l.delayDuration, y = S.useRef(!1), [b, v] = ta({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (M) => {
      M ? (l.onOpen(), document.dispatchEvent(new CustomEvent(As))) : l.onClose(), s?.(M);
    },
    caller: sr
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
  }, []), /* @__PURE__ */ h(mc, { ...c, children: /* @__PURE__ */ h(
    Hv,
    {
      scope: t,
      contentId: f,
      open: b,
      stateAttribute: w,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: S.useCallback(() => {
        l.isOpenDelayedRef.current ? E() : T();
      }, [l.isOpenDelayedRef, E, T]),
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
Sd.displayName = sr;
var Rs = "TooltipTrigger", Nd = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = fr(Rs, n), s = wa(Rs, n), i = Ao(n), a = S.useRef(null), l = _e(t, a, o.onTriggerChange), c = S.useRef(!1), d = S.useRef(!1), u = S.useCallback(() => c.current = !1, []);
    return S.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ h(gc, { asChild: !0, ...i, children: /* @__PURE__ */ h(
      Pe.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: de(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: de(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: de(e.onPointerDown, () => {
          o.open && o.onClose(), c.current = !0, document.addEventListener("pointerup", u, { once: !0 });
        }),
        onFocus: de(e.onFocus, () => {
          c.current || o.onOpen();
        }),
        onBlur: de(e.onBlur, o.onClose),
        onClick: de(e.onClick, o.onClose)
      }
    ) });
  }
);
Nd.displayName = Rs;
var ka = "TooltipPortal", [Bv, Wv] = Lo(ka, {
  forceMount: void 0
}), Dd = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = fr(ka, t);
  return /* @__PURE__ */ h(Bv, { scope: t, forceMount: n, children: /* @__PURE__ */ h(an, { present: n || s.open, children: /* @__PURE__ */ h(ua, { asChild: !0, container: o, children: r }) }) });
};
Dd.displayName = ka;
var Ln = "TooltipContent", Ld = S.forwardRef(
  (e, t) => {
    const n = Wv(Ln, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = fr(Ln, e.__scopeTooltip);
    return /* @__PURE__ */ h(an, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ h(Ad, { side: o, ...s, ref: t }) : /* @__PURE__ */ h(zv, { side: o, ...s, ref: t }) });
  }
), zv = S.forwardRef((e, t) => {
  const n = fr(Ln, e.__scopeTooltip), r = wa(Ln, e.__scopeTooltip), o = S.useRef(null), s = _e(t, o), [i, a] = S.useState(null), { trigger: l, onClose: c } = n, d = o.current, { onPointerInTransitChange: u } = r, f = S.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = S.useCallback(
    (g, m) => {
      const y = g.currentTarget, b = { x: g.clientX, y: g.clientY }, v = Yv(b, y.getBoundingClientRect()), w = Vv(b, v), T = Kv(m.getBoundingClientRect()), k = qv([...w, ...T]);
      a(k), u(!0);
    },
    [u]
  );
  return S.useEffect(() => () => f(), [f]), S.useEffect(() => {
    if (l && d) {
      const g = (y) => p(y, d), m = (y) => p(y, l);
      return l.addEventListener("pointerleave", g), d.addEventListener("pointerleave", m), () => {
        l.removeEventListener("pointerleave", g), d.removeEventListener("pointerleave", m);
      };
    }
  }, [l, d, p, f]), S.useEffect(() => {
    if (i) {
      const g = (m) => {
        const y = m.target, b = { x: m.clientX, y: m.clientY }, v = l?.contains(y) || d?.contains(y), w = !Gv(b, i);
        v ? f() : w && (f(), c());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [l, d, i, c, f]), /* @__PURE__ */ h(Ad, { ...e, ref: s });
}), [Fv, Uv] = Lo(sr, { isInside: !1 }), jv = /* @__PURE__ */ Up("TooltipContent"), Ad = S.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, l = fr(Ln, n), c = Ao(n), { onClose: d } = l;
    return S.useEffect(() => (document.addEventListener(As, d), () => document.removeEventListener(As, d)), [d]), S.useEffect(() => {
      if (l.trigger) {
        const u = (f) => {
          f.target?.contains(l.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [l.trigger, d]), /* @__PURE__ */ h(
      na,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ R(
          yc,
          {
            "data-state": l.stateAttribute,
            ...c,
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
              /* @__PURE__ */ h(jv, { children: r }),
              /* @__PURE__ */ h(Fv, { scope: n, isInside: !0, children: /* @__PURE__ */ h(Ov, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Ld.displayName = Ln;
var Rd = "TooltipArrow", Id = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Ao(n);
    return Uv(
      Rd,
      n
    ).isInside ? null : /* @__PURE__ */ h(vc, { ...o, ...r, ref: t });
  }
);
Id.displayName = Rd;
function Yv(e, t) {
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
function Vv(e, t, n = 5) {
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
function Kv(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function Gv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], l = t[i], c = a.x, d = a.y, u = l.x, f = l.y;
    d > r != f > r && n < (u - c) * (r - d) / (f - d) + c && (o = !o);
  }
  return o;
}
function qv(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Xv(t);
}
function Xv(e) {
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
var Zv = Td, Qv = Sd, Jv = Nd, eb = Dd, tb = Ld, nb = Id;
function rb({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ h(
    Zv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Pd({
  ...e
}) {
  return /* @__PURE__ */ h(rb, { children: /* @__PURE__ */ h(Qv, { "data-slot": "tooltip", ...e }) });
}
function Od({
  ...e
}) {
  return /* @__PURE__ */ h(Jv, { "data-slot": "tooltip-trigger", ...e });
}
function _d({
  className: e,
  sideOffset: t = 4,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ h(eb, { children: /* @__PURE__ */ R(
    tb,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: ce(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-4 py-2 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ h("span", { className: "relative z-10", children: n }),
        /* @__PURE__ */ h(nb, { className: "bg-foreground fill-foreground z-0 size-4 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const ke = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ R(Pd, { children: [
    /* @__PURE__ */ h(Od, { asChild: !0, children: s }),
    /* @__PURE__ */ h(_d, { side: "bottom", sideOffset: 4, className: "text-xs", children: o })
  ] }) : s;
}, Zt = () => /* @__PURE__ */ h("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), ob = Dt(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const l = j(null), [c, d] = Y(!1), [u, f] = Y(void 0), p = yl({
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
  }), g = z(() => {
    const { view: E } = t, { from: M } = E.state.selection, x = E.coordsAtPos(M);
    f({ top: x.bottom + 8, left: x.left }), d(!0);
  }, [t]), m = z((E, M) => {
    t.chain().focus().setImage({ src: E, alt: M }).run(), d(!1);
  }, [t]), y = z(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = z((E) => {
    t.chain().focus().insertCallout({ type: E }).run();
  }, [t]), v = j(/* @__PURE__ */ new Map()), w = j(/* @__PURE__ */ new Map()), T = z((E) => {
    const { doc: M, tr: x } = E.state;
    let D = !1;
    const C = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = E.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), N.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((W) => {
        const F = W, I = (F.textContent || "").trim().substring(0, 50);
        v.current.set(`${O}-${I}`, F.getBoundingClientRect());
      });
    });
    const A = [];
    M.descendants((P, O, _, W) => {
      if (!C.has(P.type.name)) return !0;
      let F = !1;
      if (P.forEach((H) => {
        H.type.name === "taskItem" && (F = !0);
      }), !F) return !0;
      let I = 0;
      return M.nodesBetween(0, O, (H) => (C.has(H.type.name) && I++, !0)), A.push({ node: P, pos: O, depth: I }), !0;
    }), A.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of A) {
      const _ = [];
      let W = 0;
      P.forEach(($) => {
        _.push({
          node: $,
          isTask: $.type.name === "taskItem",
          checked: $.type.name === "taskItem" && $.attrs.checked === !0,
          originalIndex: W++
        });
      });
      const F = _.filter(($) => $.isTask && !$.checked), I = _.filter(($) => $.isTask && $.checked), H = [..._], q = _.map(($, Z) => ({ index: Z, isTask: $.isTask })).filter(($) => $.isTask).map(($) => $.index), ee = [...F, ...I];
      if (q.forEach(($, Z) => {
        H[$] = ee[Z];
      }), !H.some(($, Z) => $.node !== _[Z].node)) continue;
      const ne = P.type.create(
        P.attrs,
        H.map(($) => $.node)
      ), X = x.mapping.map(O);
      x.replaceWith(X, X + P.nodeSize, ne), D = !0;
    }
    D && (E.view.dispatch(x), requestAnimationFrame(() => {
      E.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const _ = O.querySelectorAll(":scope > li"), W = /* @__PURE__ */ new Map();
        v.current.forEach((F, I) => {
          const H = I.replace(/^\d+-/, "");
          W.set(H, F);
        }), _.forEach((F) => {
          const I = F, H = (I.textContent || "").trim().substring(0, 50), q = W.get(H);
          if (!q) return;
          const ee = I.getBoundingClientRect(), te = q.top - ee.top;
          if (Math.abs(te) < 2) return;
          I.style.transform = `translateY(${te}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
          const ne = () => {
            I.style.transform = "", I.style.transition = "", I.style.zIndex = "", I.removeEventListener("transitionend", ne);
          };
          I.addEventListener("transitionend", ne), setTimeout(ne, 400);
        });
      });
    }));
  }, []);
  V(() => {
    if (!s || !t) return;
    const E = /* @__PURE__ */ new Map();
    t.state.doc.descendants((x, D) => (x.type.name === "taskItem" && E.set(D, x.attrs.checked === !0), !0)), w.current = E;
    const M = ({ transaction: x }) => {
      if (!x.docChanged) return;
      const D = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, P) => (A.type.name === "taskItem" && D.set(P, A.attrs.checked === !0), !0));
      const C = w.current;
      let N = !1;
      if (C.size > 0 && D.size > 0) {
        let A = 0, P = 0;
        C.forEach((O) => {
          O && A++;
        }), D.forEach((O) => {
          O && P++;
        }), A !== P && (N = !0);
      }
      w.current = D, N && setTimeout(() => {
        T(t);
      }, 150);
    };
    return t.on("transaction", M), () => {
      t.off("transaction", M);
    };
  }, [t, s, T]);
  const k = z(() => {
    T(t);
  }, [t, T]);
  return /* @__PURE__ */ R("div", { className: `flex items-center gap-0.5 px-2 py-1.5 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    n && /* @__PURE__ */ h(
      ke,
      {
        onClick: n,
        tooltip: "Copy as Markdown",
        children: /* @__PURE__ */ h(Rn, { size: 16 })
      }
    ),
    n && /* @__PURE__ */ h(Zt, {}),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ h(df, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ h(uf, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(Zt, {}),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ h(zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ h(Fs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ h(Us, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ h(js, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ h(kl, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ h(xl, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ h(Ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(Zt, {}),
    /* @__PURE__ */ R(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ R(
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
            /* @__PURE__ */ h(Nn, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(as, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ h("span", { children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ h("span", { children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ h("span", { children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ h("span", { children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
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
    /* @__PURE__ */ h(Zt, {}),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ h(Vs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ h(Ks, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ h(Gs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ h(qs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => ea(t),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ h(Cl, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => {
          if (p?.isTaskList)
            t.chain().focus().sinkListItem("taskItem").run();
          else if ((p?.isBulletList || p?.isOrderedList) && (t.chain().focus().sinkListItem("listItem").run(), p?.isOrderedList)) {
            const { state: E, view: M } = t, { $from: x } = E.selection, D = E.schema.nodes.orderedList, C = E.schema.nodes.bulletList;
            if (D && C)
              for (let N = x.depth; N >= 0; N--) {
                const A = x.node(N);
                if (A.type === D && N >= 2) {
                  const P = x.node(N - 1);
                  if (P.type.name === "listItem" || P.type.name === "taskItem") {
                    const O = x.before(N);
                    M.dispatch(E.tr.setNodeMarkup(O, C, A.attrs));
                    break;
                  }
                }
                if (A.type.name === "bulletList" || A.type.name === "taskList") break;
              }
          }
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ h(ff, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ h(pf, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(Zt, {}),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ h(ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ h(Bs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ h(El, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ R(
        "button",
        {
          className: "flex items-center justify-center gap-0.5 h-8 px-1.5 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: [
            /* @__PURE__ */ h(vs, { size: 16 }),
            /* @__PURE__ */ h(Nn, { size: 12, strokeWidth: 2.5 })
          ]
        }
      ) }),
      /* @__PURE__ */ R(as, { align: "start", children: [
        /* @__PURE__ */ R(Ce, { onClick: () => b("info"), children: [
          /* @__PURE__ */ h(vs, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ R(Ce, { onClick: () => b("note"), children: [
          /* @__PURE__ */ h(Ml, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ R(Ce, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ h(hf, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ R(Ce, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ h(mf, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ R(Ce, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ h(Tl, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ R(os, { children: [
      /* @__PURE__ */ h(ss, { asChild: !0, children: /* @__PURE__ */ R(
        on,
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
      /* @__PURE__ */ R(as, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ h(Va, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ h(Va, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ h(xn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ h(Ka, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ h(Ka, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ h(xn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ h(Ga, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ h(Ga, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ h(is, {}),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ h(xn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ h(
      Bl,
      {
        isOpen: c,
        onClose: () => d(!1),
        onInsert: m,
        position: u
      }
    ),
    /* @__PURE__ */ h(Zt, {}),
    /* @__PURE__ */ h(
      ke,
      {
        onClick: k,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ h(gf, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ R(we, { children: [
      /* @__PURE__ */ h(Zt, {}),
      /* @__PURE__ */ R(Pd, { children: [
        /* @__PURE__ */ h(Od, { asChild: !0, children: /* @__PURE__ */ h(
          "button",
          {
            ref: l,
            onClick: () => {
              l.current && a?.(l.current);
            },
            className: `
                  flex items-center justify-center w-8 h-8 rounded-md shrink-0
                  transition-all duration-100 ease-out touch-manipulation
                  bg-transparent text-muted-foreground hover:bg-secondary active:bg-secondary/80
                  hover:text-foreground
                `,
            children: /* @__PURE__ */ h(vo, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ h(_d, { side: "bottom", sideOffset: 4, className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ h("div", { className: "flex-1 min-w-2" })
  ] });
});
function sb({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: l }) {
  const c = s === "markdown", [d, u] = Y(""), [f, p] = Y(""), [g, m] = Y(!1), [y, b] = Y(!1), [v, w] = Y(!1), [T, k] = Y(!1), [E, M] = Y([]), [x, D] = Y(0), [C, N] = Y(null), [A, P] = Y(!1), O = j(!1), _ = j(null), W = j(null), F = j(!1);
  V(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const I = z(() => {
    if (!d || !e) {
      M([]), D(0), N(null);
      return;
    }
    const $ = [];
    let Z;
    try {
      if (y)
        Z = new RegExp(d, g ? "g" : "gi");
      else {
        let L = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (L = `\\b${L}\\b`), Z = new RegExp(L, g ? "g" : "gi");
      }
      N(null);
    } catch (L) {
      N(L.message), M([]);
      return;
    }
    if (c) {
      let L;
      for (; (L = Z.exec(i)) !== null; )
        $.push({
          from: L.index,
          to: L.index + L[0].length,
          text: L[0]
        });
    } else {
      const { doc: L } = e.state;
      L.descendants((B, U) => {
        if (B.isText && B.text) {
          let K;
          for (; (K = Z.exec(B.text)) !== null; )
            $.push({
              from: U + K.index,
              to: U + K.index + K[0].length,
              text: K[0]
            });
        }
        return !0;
      });
    }
    M($), $.length > 0 && x >= $.length && D(0);
  }, [d, g, y, v, e, x, c, i]);
  V(() => {
    I();
  }, [I]), V(() => {
    c && l && (t && E.length > 0 ? l(E, x) : l([], 0));
  }, [c, t, E, x, l]), V(() => {
    if (!e) return;
    if (c) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const $ = typeof e.commands.setSearchHighlight == "function";
    t && d && $ ? e.commands.setSearchHighlight({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      currentMatchIndex: x
    }) : $ && e.commands.clearSearchHighlight();
  }, [e, t, d, g, y, x, c, E, i]), V(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, l]), V(() => {
    if (E.length > 0 && x < E.length) {
      const $ = E[x];
      if (c) {
        const L = document.querySelector(".syntax-textarea");
        if (L && F.current) {
          const B = parseInt(getComputedStyle(L).lineHeight) || 22, K = i.substring(0, $.from).split(`
`).length;
          L.scrollTop = Math.max(0, (K - 3) * B);
        }
        F.current && (F.current = !1);
        return;
      }
      const Z = e.view.domAtPos($.from);
      Z.node && Z.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), F.current && (F.current = !1);
    }
  }, [x, E, e, c, i]), V(() => {
    t && _.current && (_.current.focus(), _.current.select());
  }, [t, r]);
  const H = z(() => {
    E.length !== 0 && (F.current = !0, D(($) => ($ + 1) % E.length));
  }, [E.length]), q = z(() => {
    E.length !== 0 && (F.current = !0, D(($) => ($ - 1 + E.length) % E.length));
  }, [E.length]), ee = z(() => {
    if (E.length === 0 || x >= E.length) return;
    const $ = E[x];
    if (c && a) {
      const Z = i.substring(0, $.from) + f + i.substring($.to);
      a(Z), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [E, x, f, e, I, c, i, a]), te = z(() => {
    if (E.length === 0) return;
    if (c && a) {
      const Z = [...E].sort((B, U) => U.from - B.from);
      let L = i;
      Z.forEach((B) => {
        L = L.substring(0, B.from) + f + L.substring(B.to);
      }), a(L), setTimeout(I, 10);
      return;
    }
    const $ = [...E].sort((Z, L) => L.from - Z.from);
    e.chain().focus(), $.forEach((Z) => {
      e.chain().setTextSelection({ from: Z.from, to: Z.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [E, f, e, I, c, i, a]), ne = z(() => {
    if (E.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      wholeWord: v
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [E, d, g, y, v, e, n]), X = z(($) => {
    $.key === "Enter" ? ($.preventDefault(), $.shiftKey ? q() : H(), _.current?.focus()) : $.key === "Escape" ? ($.preventDefault(), n()) : $.key === "h" && ($.ctrlKey || $.metaKey) ? ($.preventDefault(), k((Z) => !Z)) : $.key === "l" && ($.ctrlKey || $.metaKey) && $.shiftKey && ($.preventDefault(), ne());
  }, [H, q, n, ne]);
  return t ? /* @__PURE__ */ R(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: X,
      children: [
        /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ h(yf, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: _,
                type: "text",
                placeholder: "Find...",
                value: d,
                onChange: ($) => u($.target.value),
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
              children: /* @__PURE__ */ h(vf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: H,
              disabled: E.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ h(Nn, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: ne,
              disabled: E.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${E.length} matches`,
              children: /* @__PURE__ */ h(bf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => m(($) => !$),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ h(wf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => w(($) => !$),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ h(kf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => b(($) => !$),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ h(xf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => k(($) => !$),
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
              children: /* @__PURE__ */ h(Mt, { size: 16 })
            }
          )
        ] }),
        T && /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ h(bs, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: W,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: ($) => p($.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: ee,
              disabled: E.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ R(
            "button",
            {
              onClick: te,
              disabled: E.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ h(Cf, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const ab = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), wt = ab ? "⌘" : "Ctrl", ib = ({ editor: e }) => {
  const [t, n] = Y(!1), [r, o] = Y(0), [s, i] = Y(0), [a, l] = Y(""), [c, d] = Y(""), [u, f] = Y(!1), [p, g] = Y(!1);
  V(() => {
    if (!e) return;
    const M = () => {
      const D = e.storage.selectAllOccurrences;
      D ? (n(D.isActive), o(D.ranges.length), i(D.allMatches.length), l(D.searchTerm), d(D.typedBuffer), f(D.isTypingReplace), g(D.isIncremental)) : (n(!1), o(0), i(0));
    }, x = () => {
      M();
    };
    return e.on("transaction", x), M(), () => {
      e.off("transaction", x);
    };
  }, [e]);
  const m = z(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = z(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), b = z(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = z(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), w = z(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), T = z(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), k = z(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), E = z(() => {
    a && (e.commands.selectAllOccurrences({
      searchTerm: a,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, a]);
  return !t || r === 0 ? null : /* @__PURE__ */ R("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ R("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ R("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ h("div", { className: "select-all-action-bar-preview", children: u ? /* @__PURE__ */ R(we, { children: [
        /* @__PURE__ */ h(yo, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-new", children: c || "∅" })
      ] }) : /* @__PURE__ */ h(we, { children: /* @__PURE__ */ R("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ h("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ R(we, { children: [
        /* @__PURE__ */ h(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${wt}+D)`,
            children: /* @__PURE__ */ h(Xs, { size: 14 })
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: E,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${wt}+Shift+L)`,
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
          title: `Bold all occurrences (${wt}+B)`,
          children: /* @__PURE__ */ h(zs, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${wt}+I)`,
          children: /* @__PURE__ */ h(Fs, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${wt}+U)`,
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
          children: /* @__PURE__ */ h(xn, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: T,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ h(Mt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ R(we, { children: [
      /* @__PURE__ */ R("kbd", { children: [
        wt,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ R("kbd", { children: [
        wt,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ h("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ R("kbd", { children: [
        wt,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ R(we, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ h("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ h("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ R("kbd", { children: [
        wt,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, lb = Dt(ib), Ur = "-dismissed";
function cb(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function db(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, l] = Y({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), c = j(null), d = j(""), u = j(0);
  V(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + Ur);
        if (b && !v) {
          let w = "";
          try {
            w = e.getHTML() || "";
          } catch {
            return;
          }
          b !== w && b.length > 50 && l((T) => ({ ...T, hasRecoverableContent: !0 }));
        }
      } catch (b) {
        console.warn("useAutoSave: Error checking for recoverable content", b);
      }
  }, [e, n, o]);
  const f = z(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const b = e.getHTML(), v = cb(b);
        if (v === u.current && b.length === d.current.length) {
          l((w) => ({ ...w, status: "saved" }));
          return;
        }
        if (b.length < 20)
          return;
        l((w) => ({ ...w, status: "saving" })), localStorage.setItem(n, b), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), d.current = b, u.current = v, l((w) => ({
          ...w,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(b), setTimeout(() => {
          l((w) => w.status === "saved" ? { ...w, status: "idle" } : w);
        }, 2e3);
      } catch (b) {
        console.error("useAutoSave: Error saving content", b), l((v) => ({
          ...v,
          status: "error",
          error: b instanceof Error ? b.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  V(() => {
    if (!e || !o || e.isDestroyed) return;
    const b = () => {
      e.isDestroyed || (c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", b), () => {
      e.off("update", b), c.current && clearTimeout(c.current);
    };
  }, [e, r, o, f]), V(() => {
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
  const p = z(() => {
    c.current && clearTimeout(c.current), f();
  }, [f]), g = z(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Ur), d.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (b) {
      console.warn("useAutoSave: Error clearing content", b);
    }
  }, [n]), m = z(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const b = localStorage.getItem(n);
      return b && e && !e.isDestroyed ? (l((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(b), d.current = b, localStorage.removeItem(n + Ur), i?.(b);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), b) : null;
    } catch (b) {
      return console.warn("useAutoSave: Error recovering content", b), null;
    }
  }, [e, n, i]), y = z(() => {
    try {
      localStorage.setItem(n + Ur, "true"), l((b) => ({ ...b, hasRecoverableContent: !1 }));
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
function eo(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), l = s.after(s.depth);
  o.replaceWith(a, l, i);
  const c = a + i.nodeSize;
  if (c < o.doc.content.size) {
    const d = o.doc.resolve(c);
    d.nodeAfter && d.nodeAfter.isTextblock ? o.setSelection(et.create(o.doc, c + 1)) : d.nodeAfter && o.setSelection(et.near(o.doc.resolve(c)));
  } else {
    const u = r.schema.nodes.paragraph.create();
    o.insert(c, u), o.setSelection(et.create(o.doc, c + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function Wt(e) {
  return e.replace(/^[ \t]*\u200B[ \t]*$/gm, "").replace(/\u200B/g, "");
}
const ub = {
  info: "Info",
  note: "Note",
  prompt: "Prompt",
  resources: "Resources",
  todo: "Todo",
  summary: "Summary"
};
function Is(e) {
  return e.replace(
    /```ad-(\w+)\n([\s\S]*?)```/g,
    (t, n, r) => {
      const o = ub[n] || n.charAt(0).toUpperCase() + n.slice(1), s = r.trim();
      return `#### ${o}

${s}`;
    }
  );
}
function uo(e) {
  const t = document.querySelector(".copy-md-toast");
  t && t.remove();
  const n = document.createElement("div");
  n.className = "copy-md-toast", n.textContent = e;
  const r = document.documentElement.classList.contains("dark");
  n.style.cssText = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:${r ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)"};color:${r ? "#e5e5e5" : "#333"};padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid ${r ? "#3a3a3a" : "#e5e5e5"};animation:sortToastIn 0.2s ease;`, document.body.appendChild(n), setTimeout(() => {
    n.style.animation = "sortToastOut 0.2s ease forwards", setTimeout(() => n.remove(), 200);
  }, 1500);
}
function fb(e, {
  editor: t,
  turndownService: n,
  editorModeRef: r,
  handleModeSwitch: o,
  wordCount: s,
  autoSaveState: i,
  setIsFindReplaceOpen: a,
  setFindReplaceFocusTrigger: l
}) {
  nf(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? Wt(n.turndown(t.getHTML())) : "",
    getText: () => t?.getText() || "",
    getJSON: () => t ? t.getJSON() : { type: "doc", content: [] },
    setContent: (c) => {
      t && !t.isDestroyed && queueMicrotask(() => {
        t.commands.setContent(c);
      });
    },
    setContentJSON: (c) => {
      t && !t.isDestroyed && queueMicrotask(() => {
        t.commands.blur(), t.commands.setContent(c);
      });
    },
    clearContent: () => {
      t && !t.isDestroyed && t.commands.clearContent();
    },
    insertAtEnd: (c) => {
      t && !t.isDestroyed && t.chain().focus("end").insertContent(c).run();
    },
    focus: (c) => {
      t && !t.isDestroyed && t.commands.focus(c);
    },
    blur: () => {
      t && !t.isDestroyed && t.commands.blur();
    },
    isEmpty: () => t?.isEmpty || !0,
    isFocused: () => t?.isFocused || !1,
    getMode: () => r.current,
    setMode: (c) => o(c),
    toggleMode: () => {
      const c = r.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return o(c), c;
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
    insertImage: (c, d = "") => t?.commands.setImage({ src: c, alt: d }),
    insertTable: (c = 3, d = 3) => t?.commands.insertTable({ rows: c, cols: d, withHeaderRow: !0 }),
    insertCodeBlock: (c) => {
      c ? t?.commands.setCodeBlock({ language: c }) : t?.commands.setCodeBlock();
    },
    insertCallout: (c = "info") => t?.commands.insertCallout?.({ type: c }),
    insertHorizontalRule: () => {
      t && eo(t, t.state.selection.from, t.state.selection.from);
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
      a(!0), l((c) => c + 1);
    },
    closeFindReplace: () => a(!1),
    save: () => i.save(),
    clearSavedContent: () => i.clear(),
    getSelectedText: () => {
      if (!t) return "";
      const { from: c, to: d } = t.state.selection;
      return t.state.doc.textBetween(c, d, " ");
    },
    isEditable: () => t?.isEditable || !1,
    setEditable: (c) => t?.setEditable(c),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!t) return [];
      const c = [];
      return t.state.doc.descendants((d, u) => {
        if (d.type.name === "heading") {
          const f = d.attrs.level, p = d.textContent.trim();
          p && c.push({ id: `toc-heading-${u}`, text: p, level: f, pos: u });
        }
      }), c;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (c) => {
      if (!(!t || t.isDestroyed))
        try {
          const d = t.state.doc.resolve(c), u = t.view.nodeDOM(d.before(d.depth + 1));
          if (u instanceof HTMLElement) {
            const f = t.view.dom.closest(".editor-content-wrapper");
            if (f) {
              const p = f.getBoundingClientRect(), m = u.getBoundingClientRect().top - p.top + f.scrollTop;
              f.scrollTo({ top: m - 20, behavior: "smooth" });
            } else
              u.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          t.commands.setTextSelection(c + 1);
        } catch {
        }
    },
    copyAsMarkdown: async () => {
      if (!t) return "";
      const { from: c, to: d, empty: u } = t.state.selection;
      let f, p;
      if (u)
        f = t.getHTML(), p = t.getText();
      else {
        const m = t.state.doc.slice(c, d), y = Js.fromSchema(t.schema), b = document.createElement("div"), v = y.serializeFragment(m.content);
        b.appendChild(v), f = b.innerHTML, p = t.state.doc.textBetween(c, d, `
`);
      }
      let g = Wt(n.turndown(f));
      u && (g = Is(g));
      try {
        await navigator.clipboard.writeText(g), uo(u ? "Document copied as Markdown" : "Selection copied as Markdown");
      } catch {
        try {
          await navigator.clipboard.writeText(p), uo(u ? "Document copied" : "Selection copied");
        } catch {
        }
      }
      return g;
    },
    getMarkdownForExport: () => {
      if (!t) return "";
      const c = Wt(n.turndown(t.getHTML()));
      return Is(c);
    }
  }), [t, n, o, s, i, a]);
}
const pb = new Ie("tableCellMenu");
function hb(e) {
  return new Re({
    key: pb,
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
            return e.chain().focus().setTextSelection(a).run(), mb(n, e, a), !0;
          }
          return !1;
        }
      }
    }
  });
}
function mb(e, t, n) {
  const r = document.querySelector(".table-cell-menu-dropdown");
  r && r.remove();
  const o = document.createElement("div");
  o.className = "table-cell-menu-dropdown";
  const s = 170, i = 280;
  let a = e.clientY, l = e.clientX;
  l + s > window.innerWidth - 12 && (l = window.innerWidth - s - 12), l < 12 && (l = 12), a + i > window.innerHeight - 12 && (a = e.clientY - i), a < 12 && (a = 12);
  const c = document.documentElement.classList.contains("dark"), d = c ? "#1f1f1f" : "#ffffff", u = c ? "#3a3a3a" : "#e5e5e5", f = c ? "#e5e5e5" : "#333333";
  o.style.cssText = "position:fixed;top:" + a + "px;left:" + l + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + d + ";border:1px solid " + u + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + f + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
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
    { label: "Copy Table", icon: "copy", action: () => gb(t) }
  ], y = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, b = c ? "#2a2a2a" : "#f5f5f5", v = c ? "#ff6b6b" : "#dc2626", w = c ? "#999999" : "#666666", T = c ? "#333333" : "#e5e5e5";
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
        x.style.background = M.destructive ? c ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : b;
      }), x.addEventListener("mouseleave", () => {
        x.style.background = "transparent";
      }), x.addEventListener("click", (A) => {
        A.preventDefault(), A.stopPropagation(), M.action && M.action(), o.remove();
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
function gb(e) {
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
        const a = i.attrs, l = a.colspan > 1 ? ' colspan="' + a.colspan + '"' : "", c = a.rowspan > 1 ? ' rowspan="' + a.rowspan + '"' : "";
        return "<td" + l + c + ">" + i.textContent + "</td>";
      }
      if (i.type.name === "tableHeader") {
        const a = i.attrs, l = a.colspan > 1 ? ' colspan="' + a.colspan + '"' : "", c = a.rowspan > 1 ? ' rowspan="' + a.rowspan + '"' : "";
        return "<th" + l + c + ">" + i.textContent + "</th>";
      }
      return i.textContent || "";
    }, s = o(r);
    navigator.clipboard.writeText(s).then(() => {
      const i = document.createElement("div");
      i.className = "tcm-toast", i.textContent = "Table copied to clipboard", i.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;", document.body.appendChild(i), setTimeout(() => i.remove(), 2e3);
    });
  }
}
const yb = lp.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      hb(this.editor)
    ];
  }
}), vb = cp.extend({}), Zn = new Ie("tableSorting");
let tn = null, Gn = null;
function bb(e) {
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
function wb(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function kb(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (g, m) => {
    if (g.type.name === "table" && m === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = tn?.tablePos === t && tn?.columnIndex === n && tn?.direction === "asc" ? "desc" : "asc";
  tn = { tablePos: t, columnIndex: n, direction: i }, Gn = null;
  const a = [];
  s.forEach((g) => {
    if (g.type.name === "tableRow") {
      let m = !1;
      g.forEach((y) => {
        y.type.name === "tableHeader" && (m = !0);
      }), a.push({ node: g, isHeader: m });
    }
  });
  const l = a.filter((g) => g.isHeader), c = a.filter((g) => !g.isHeader);
  if (c.length < 2) {
    Oi(n, i), o.dispatch(r.tr.setMeta(Zn, { updated: !0 }));
    return;
  }
  const d = c.map((g) => {
    let m = "", y = 0;
    return g.node.forEach((b) => {
      y === n && (m = b.textContent || ""), y++;
    }), { ...g, sortValue: bb(m) };
  }), u = d.map((g, m) => m);
  d.sort((g, m) => wb(g.sortValue, m.sortValue, i));
  const f = d.map((g, m) => c.indexOf(g));
  if (u.some((g, m) => g !== f[m])) {
    const g = [];
    l.forEach((b) => g.push(b.node)), d.forEach((b) => g.push(b.node));
    const m = s.type.create(s.attrs, g), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, m), y.setMeta(Zn, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Zn, { updated: !0 }));
  Oi(n, i);
}
function Oi(e, t) {
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
function xb(e, t, n, r) {
  const o = document.createElement("span");
  o.className = "table-sort-btn-inline", o.setAttribute("contenteditable", "false"), o.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const s = document.createElement("button");
  s.className = "table-sort-btn", s.setAttribute("contenteditable", "false"), s.type = "button";
  const i = document.documentElement.classList.contains("dark"), a = i ? "#60a5fa" : "#3b82f6", l = i ? "#666" : "#aaa", c = i ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return s.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? a : l) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", s.addEventListener("mouseenter", () => {
    s.style.background = c, s.style.opacity = "1", s.style.color = a;
  }), s.addEventListener("mouseleave", () => {
    s.style.background = "transparent", s.style.opacity = e ? "1" : "0.5", s.style.color = e ? a : l;
  }), s.addEventListener("click", (d) => {
    d.preventDefault(), d.stopPropagation(), kb(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function Cb(e) {
  return new Re({
    key: Zn,
    state: {
      init() {
        return Je.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Zn);
        return !t.docChanged && !s?.updated && Gn ? Gn.map(t.mapping, t.doc) : (Gn = Eb(o.doc, e), Gn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Eb(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "table") {
      const s = o;
      r.forEach((i, a) => {
        if (i.type.name === "tableRow") {
          let l = 0, c = 0;
          i.forEach((d, u) => {
            if (d.type.name === "tableHeader") {
              const f = o + 1 + a + 1 + c;
              let p = f + 1;
              d.forEach((w, T) => {
                w.type.name === "paragraph" && (p = f + 1 + T + w.nodeSize - 1);
              });
              const m = tn?.tablePos === s && tn?.columnIndex === l ? tn.direction : null, y = l, b = s, v = ot.widget(p, () => xb(m, b, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(v);
            }
            c += d.nodeSize, l++;
          });
        }
      });
    }
  }), Je.create(e, n);
}
const Mb = Ue.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Cb(this.editor)];
  }
});
function xa(e, t, n, r, o, s = {}) {
  const i = e.doc.nodeAt(t);
  if (!i) return !1;
  e.setNodeMarkup(t, n, i.attrs);
  const a = e.doc.nodeAt(t);
  if (!a) return !1;
  const l = [];
  a.forEach((c, d) => {
    c.type === o && l.push(t + 1 + d);
  });
  for (let c = l.length - 1; c >= 0; c--) {
    const d = l[c], u = e.doc.nodeAt(d);
    u && u.type === o && e.setNodeMarkup(d, r, s);
  }
  return !0;
}
const Tb = dp.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, d = t.schema.nodes.taskItem;
        let u = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const g = s.node(p);
          if (g.type === i || g.type === a || g.type === l) {
            u = g.type, f = s.before(p);
            break;
          }
        }
        if (u === i)
          return e.liftListItem("listItem");
        if (u === a || u === l) {
          if (!r) return !0;
          if (xa(n, f, i, c, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Sb = up.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, d = t.schema.nodes.taskItem;
        let u = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const g = s.node(p);
          if (g.type === i || g.type === a || g.type === l) {
            u = g.type, f = s.before(p);
            break;
          }
        }
        if (u === l)
          return e.liftListItem("listItem");
        if (u === a || u === i) {
          if (!r) return !0;
          if (xa(n, f, l, c, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Nb = pp.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: l, $to: c } = a, d = l.blockRange(c);
        if (!d)
          return !1;
        const u = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let k = l.depth; k > 0; k--)
          if (l.node(k).type === u) {
            p = !0, l.before(k);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const g = n.schema.nodes.bulletList, m = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let b = null, v = -1;
        for (let k = l.depth; k > 0; k--) {
          const E = l.node(k);
          if (E.type === g || E.type === m) {
            b = E, v = l.before(k);
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
        const w = Xa(d, u);
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
        const T = Xa(d, g);
        if (T) {
          r.wrap(d, T);
          const { $from: k } = r.selection;
          let E = -1;
          for (let M = k.depth; M > 0; M--)
            if (k.node(M).type === g) {
              E = k.before(M);
              break;
            }
          return E >= 0 && xa(r, E, u, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Db = hp.extend({
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
        const l = r.start(s), c = i.firstChild;
        if (!c || !c.isTextblock)
          return t.commands.splitListItem(this.name);
        if (r.pos - l <= 1) {
          const u = r.before(s), { tr: f } = n, p = n.schema.nodes.taskItem, g = n.schema.nodes.paragraph, m = p.create(
            { checked: !1 },
            g.create()
          );
          f.insert(u, m);
          const y = u + 1;
          return f.setSelection(et.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
}), Lb = fp.extend({
  content: "paragraph block*"
}), _i = new Ie("collapsibleList");
function Ps(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function fo(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function Ab(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
function ls(e, t) {
  const n = [];
  return e.descendants((r) => {
    if (t.includes(r.type.name)) {
      const o = fo(r) ? "1" : "0", s = r.firstChild?.textContent.slice(0, 50) ?? "";
      n.push(`${o}:${s}`);
    }
  }), n.join("|");
}
function jr(e, t, n, r) {
  const o = [];
  return e.descendants((s, i) => {
    if (!n.listItemTypes.includes(s.type.name) || !fo(s))
      return !0;
    const a = Ps(s, i), l = t.collapsedItems.has(a);
    o.push(
      ot.node(i, i + s.nodeSize, {
        class: `collapsible-list-item ${l ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const c = s.firstChild;
    if (c && c.type.name === "paragraph") {
      const d = i + 1 + c.nodeSize - 1, u = ot.widget(
        d,
        () => {
          const f = CSS.escape(a), p = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${f}"]`
          );
          if (p) {
            p.classList.contains("collapsed") !== l && (p.classList.remove("collapsed", "expanded"), p.classList.add(l ? "collapsed" : "expanded"), p.title = l ? "Click to expand" : "Click to collapse");
            const b = p.parentElement;
            if (b) return b;
          }
          const g = document.createElement("span");
          g.className = "collapsible-list-chevron-wrapper", g.setAttribute("contenteditable", "false");
          const m = document.createElement("button");
          return m.className = `collapsible-list-chevron ${l ? "collapsed" : "expanded"}`, m.setAttribute("data-list-item-id", a), m.setAttribute("contenteditable", "false"), m.setAttribute("tabindex", "-1"), m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', m.title = l ? "Click to expand" : "Click to collapse", m.addEventListener("click", (y) => {
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
    if (l && Ab(s, i)) {
      let u = i + 1;
      s.forEach((f) => {
        ["bulletList", "orderedList", "taskList"].includes(f.type.name) && o.push(
          ot.node(u, u + f.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += f.nodeSize;
      });
    }
    return !0;
  }), Je.create(e, o);
}
const Rb = Ue.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !fo(o))
          return !1;
        const s = Ps(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && fo(o) && n.collapsedItems.add(Ps(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options, n = { current: null };
    return [
      new Re({
        key: _i,
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
              decorations: jr(o.doc, e, t, n),
              docVersion: 0,
              listFingerprint: ls(o.doc, t.listItemTypes)
            };
          },
          apply(r, o, s, i) {
            if (r.getMeta("collapsibleList"))
              return {
                collapsedItems: new Set(e.collapsedItems),
                decorations: jr(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                listFingerprint: ls(i.doc, t.listItemTypes)
              };
            if (r.docChanged) {
              const l = ls(i.doc, t.listItemTypes);
              return l !== o.listFingerprint ? {
                collapsedItems: new Set(e.collapsedItems),
                decorations: jr(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                listFingerprint: l
              } : {
                ...o,
                listFingerprint: l,
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
            const o = _i.getState(r);
            return o?.decorations ? o.decorations : jr(r.doc, e, t, n);
          }
        }
      })
    ];
  }
}), $i = "http://www.w3.org/2000/svg";
function Qt(e, t, n) {
  const r = document.createElementNS($i, "svg");
  r.setAttribute("width", String(t)), r.setAttribute("height", String(t)), r.setAttribute("viewBox", "0 0 24 24"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-linejoin", "round"), n && r.setAttribute("class", n);
  for (const o of e) {
    const s = document.createElementNS($i, o.tag);
    for (const [i, a] of Object.entries(o.attrs))
      s.setAttribute(i, a);
    r.appendChild(s);
  }
  return r;
}
const Ib = [
  { tag: "circle", attrs: { cx: "12", cy: "12", r: "10" } },
  { tag: "path", attrs: { d: "M12 16v-4" } },
  { tag: "path", attrs: { d: "M12 8h.01" } }
], Pb = [
  { tag: "path", attrs: { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" } },
  { tag: "path", attrs: { d: "M15 3v4a2 2 0 0 0 2 2h4" } }
], Ob = [
  { tag: "path", attrs: { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" } },
  { tag: "path", attrs: { d: "M13 8H7" } },
  { tag: "path", attrs: { d: "M17 12H7" } }
], _b = [
  { tag: "path", attrs: { d: "M12 7v14" } },
  { tag: "path", attrs: { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" } }
], $b = [
  { tag: "rect", attrs: { x: "3", y: "5", width: "6", height: "6", rx: "1" } },
  { tag: "path", attrs: { d: "m3 17 2 2 4-4" } },
  { tag: "path", attrs: { d: "M13 6h8" } },
  { tag: "path", attrs: { d: "M13 12h8" } },
  { tag: "path", attrs: { d: "M13 18h8" } }
], Hb = [
  { tag: "rect", attrs: { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" } },
  { tag: "path", attrs: { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" } },
  { tag: "path", attrs: { d: "M12 11h4" } },
  { tag: "path", attrs: { d: "M12 16h4" } },
  { tag: "path", attrs: { d: "M8 11h.01" } },
  { tag: "path", attrs: { d: "M8 16h.01" } }
], cs = [
  { tag: "path", attrs: { d: "m6 9 6 6 6-6" } }
], Bb = [
  { tag: "path", attrs: { d: "m9 18 6-6-6-6" } }
], wn = {
  info: { iconElements: Ib, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { iconElements: Pb, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { iconElements: Ob, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { iconElements: _b, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { iconElements: $b, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { iconElements: Hb, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
}, Wb = Object.keys(wn);
class zb {
  constructor(t, n, r) {
    this.collapsed = !1, this.showDropdown = !1, this.portalContainer = null, this.dropdownEl = null, this.handleHeaderClick = (i) => {
      this.toggleCollapse();
    }, this.handleButtonClick = (i) => {
      i.stopPropagation(), this.view.editable && this.toggleDropdown();
    }, this.node = t, this.view = n, this.getPos = r;
    const o = t.attrs.type || "info", s = wn[o] || wn.info;
    this.boundHandleClickOutside = this.handleClickOutside.bind(this), this.boundHandleScroll = this.closeDropdown.bind(this), this.dom = document.createElement("div"), this.dom.className = `callout callout-${o}`, this.dom.setAttribute("data-callout", ""), this.dom.setAttribute("data-type", o), this.dom.setAttribute("data-node-view-wrapper", ""), this.headerEl = document.createElement("div"), this.headerEl.className = "callout-header", this.headerEl.style.cursor = "pointer", this.headerEl.style.userSelect = "none", this.headerEl.style.webkitUserSelect = "none", this.headerEl.title = "Click to collapse", this.headerEl.addEventListener("click", this.handleHeaderClick), this.headerButton = document.createElement("button"), this.headerButton.className = "callout-header-button", this.headerButton.title = n.editable ? "Click to change callout type" : s.label, this.headerButton.style.color = s.borderColor, this.headerButton.style.userSelect = "none", this.headerButton.style.webkitUserSelect = "none", this.headerButton.addEventListener("click", this.handleButtonClick), this.headerIconContainer = document.createElement("span"), this.headerIconContainer.style.display = "flex", this.headerIconContainer.appendChild(Qt(s.iconElements, 18)), this.labelEl = document.createElement("span"), this.labelEl.className = "callout-label", this.labelEl.textContent = s.label, this.typeChevronEl = Qt(cs, 12, "callout-type-chevron"), n.editable || (this.typeChevronEl.style.display = "none"), this.headerButton.appendChild(this.headerIconContainer), this.headerButton.appendChild(this.labelEl), this.headerButton.appendChild(this.typeChevronEl), this.collapseIndicator = document.createElement("div"), this.collapseIndicator.className = "callout-collapse-indicator", this.collapseIndicator.style.color = s.borderColor, this.collapseIndicator.appendChild(Qt(cs, 16)), this.headerEl.appendChild(this.headerButton), this.headerEl.appendChild(this.collapseIndicator), this.contentWrapper = document.createElement("div"), this.contentWrapper.className = "callout-content", this.contentDOM = document.createElement("div"), this.contentWrapper.appendChild(this.contentDOM), this.dom.appendChild(this.headerEl), this.dom.appendChild(this.contentWrapper);
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed, this.collapsed ? (this.dom.classList.add("callout-collapsed"), this.contentWrapper.classList.add("callout-content-hidden"), this.headerEl.title = "Click to expand") : (this.dom.classList.remove("callout-collapsed"), this.contentWrapper.classList.remove("callout-content-hidden"), this.headerEl.title = "Click to collapse"), this.collapseIndicator.innerHTML = "", this.collapseIndicator.appendChild(
      this.collapsed ? Qt(Bb, 16) : Qt(cs, 16)
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
    for (const o of Wb) {
      const s = wn[o], i = document.createElement("button");
      i.className = `callout-type-option${o === r ? " active" : ""}`, i.addEventListener("click", (c) => {
        c.stopPropagation(), this.handleTypeChange(o);
      }), i.addEventListener("mousedown", (c) => c.stopPropagation());
      const a = Qt(s.iconElements, 16);
      a.style.color = s.borderColor;
      const l = document.createElement("span");
      l.textContent = s.label, i.appendChild(a), i.appendChild(l), this.dropdownEl.appendChild(i);
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
    const n = wn[t] || wn.info;
    this.dom.className = `callout callout-${t}${this.collapsed ? " callout-collapsed" : ""}`, this.dom.setAttribute("data-type", t), this.headerButton.style.color = n.borderColor, this.headerButton.title = this.view.editable ? "Click to change callout type" : n.label, this.headerIconContainer.innerHTML = "", this.headerIconContainer.appendChild(Qt(n.iconElements, 18)), this.labelEl.textContent = n.label, this.collapseIndicator.style.color = n.borderColor;
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
const Fb = bo.create({
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
      Pn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return ({ node: e, view: t, getPos: n }) => new zb(e, t, n);
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
}), Ub = wp.extend({
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
        Pn(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addProseMirrorPlugins() {
    return [
      new Re({
        key: new Ie("resizableImageCopy"),
        props: {
          handleDOMEvents: {
            copy(e, t) {
              const { state: n } = e;
              if (!(n.selection instanceof Jf)) return !1;
              const r = n.selection.node;
              if (r.type.name !== "resizableImage") return !1;
              const o = r.attrs.src;
              if (!o) return !1;
              t.preventDefault();
              const i = `![${r.attrs.alt || ""}](${o})`;
              return (async () => {
                try {
                  const l = await (await fetch(o)).blob();
                  await navigator.clipboard.write([
                    new ClipboardItem({
                      [l.type]: l,
                      "text/plain": new Blob([i], { type: "text/plain" })
                    })
                  ]);
                } catch {
                  try {
                    const a = new window.Image();
                    a.crossOrigin = "anonymous", await new Promise((d, u) => {
                      a.onload = () => d(), a.onerror = () => u(new Error("Image load failed")), a.src = o;
                    });
                    const l = document.createElement("canvas");
                    l.width = a.naturalWidth, l.height = a.naturalHeight;
                    const c = l.getContext("2d");
                    if (c) {
                      c.drawImage(a, 0, 0);
                      const d = await new Promise(
                        (u) => l.toBlob(u, "image/png")
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
      const i = (L) => {
        const B = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[L] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${B}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const l = (L) => !(!L || L.startsWith("data:") || L.startsWith("blob:") || L.startsWith("http://") || L.startsWith("https://"));
      let c = 0, d = null;
      const u = (L) => {
        const B = ++c;
        if (d = L, l(L) && e.resolveImageSrc) {
          const U = a.getAttribute("src") || "";
          U.startsWith("data:") || U.startsWith("blob:") || U.startsWith("http://") || U.startsWith("https://") || (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E'), e.resolveImageSrc(L).then((oe) => {
            B === c && (oe && oe !== L && (a.src = oe), a.style.opacity = "1", a.offsetHeight);
          }).catch(() => {
            B === c && (a.style.opacity = "1");
          });
        } else
          a.src = L;
      };
      a.addEventListener("error", () => {
        const L = a.getAttribute("src") || "";
        s.style.borderRadius = "8px", s.style.border = `1px solid ${y ? "rgba(255,255,255,0.1)" : "oklch(0.9 0 0)"}`, s.style.background = y ? "rgba(255,255,255,0.03)" : "#f8f8f8", s.style.padding = "12px", s.style.minHeight = "60px", a.style.display = "none";
        const B = document.createElement("div");
        B.style.cssText = `font-size: 12px; color: ${y ? "#999" : "#888"}; word-break: break-all;`, B.textContent = `Image not found: ${L}`, s.insertBefore(B, s.firstChild);
      });
      const f = (L) => {
        L && L.startsWith("placeholder://") ? s.classList.add("image-uploading") : s.classList.remove("image-uploading");
      };
      f(t.attrs.alt), u(t.attrs.src);
      const p = document.createElement("div");
      p.classList.add("resize-handle"), p.style.cssText = `
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
      `, p.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(90deg);">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      `;
      const g = document.createElement("button");
      g.classList.add("image-menu-btn"), g.setAttribute("type", "button"), g.setAttribute("title", "Image options"), g.style.cssText = `
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
      `, g.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      `;
      const m = document.createElement("div");
      m.classList.add("image-menu-dropdown");
      const y = document.documentElement.classList.contains("dark") || document.documentElement.getAttribute("data-theme")?.match(/midnight|carbon|ocean|forest|sunset|lavender|rose|slate/);
      m.style.cssText = `
        position: fixed;
        display: none;
        flex-direction: column;
        min-width: 200px;
        padding: 4px;
        background: ${y ? "var(--bg-tertiary, #2c313c)" : "oklch(0.99 0 0)"};
        border: 1px solid ${y ? "var(--border, rgba(255,255,255,0.1))" : "oklch(0.9 0 0)"};
        border-radius: 8px;
        box-shadow: 0 4px 16px oklch(0 0 0 / ${y ? "0.4" : "0.15"});
        z-index: 9999;
        pointer-events: auto;
        color: ${y ? "#dadada" : "inherit"};
      `;
      const b = (L, B, U) => {
        const K = document.createElement("button");
        return K.setAttribute("type", "button"), K.style.cssText = `
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 12px;
          font-size: 13px;
          color: ${y ? "#dadada" : "oklch(0.3 0 0)"};
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        `, K.innerHTML = `${B}<span>${L}</span>`, K.addEventListener("mouseenter", () => {
          K.style.background = y ? "rgba(255,255,255,0.06)" : "oklch(0.95 0 0)";
        }), K.addEventListener("mouseleave", () => {
          K.style.background = "transparent";
        }), K.addEventListener("click", (oe) => {
          oe.preventDefault(), oe.stopPropagation(), U(), m.style.display = "none", _ = !1;
        }), K;
      }, v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', w = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', T = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', k = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      m.appendChild(b("Edit", v, () => {
        const L = typeof r == "function" ? r() : null;
        if (L != null && e.onImageClick) {
          const B = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: L,
            rect: B
          });
        }
      })), m.appendChild(b("Copy image", w, async () => {
        const L = o.attrs.src;
        try {
          const U = await (await fetch(L)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [U.type]: U })
          ]);
        } catch {
          try {
            const B = new window.Image();
            B.crossOrigin = "anonymous", await new Promise((oe, ae) => {
              B.onload = () => oe(), B.onerror = () => ae(new Error("Image load failed")), B.src = L;
            });
            const U = document.createElement("canvas");
            U.width = B.naturalWidth, U.height = B.naturalHeight;
            const K = U.getContext("2d");
            if (K) {
              K.drawImage(B, 0, 0);
              const oe = await new Promise(
                (ae) => U.toBlob(ae, "image/png")
              );
              oe ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": oe })
              ]) : await navigator.clipboard.writeText(L);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(L);
            } catch {
            }
          }
        }
      })), m.appendChild(b("Copy URL", k, async () => {
        const L = o.attrs.src;
        try {
          await navigator.clipboard.writeText(L);
        } catch {
        }
      })), m.appendChild(b("Save image", T, () => {
        const L = o.attrs.src, B = o.attrs.alt || "image", U = document.createElement("a");
        U.href = L, U.download = B, U.target = "_blank", U.rel = "noopener noreferrer", document.body.appendChild(U), U.click(), setTimeout(() => {
          document.body.removeChild(U);
        }, 100);
      }));
      const M = b("Delete image", '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>', () => {
        const L = n.view.state.selection.from;
        n.chain().focus().deleteRange({ from: L, to: L + 1 }).run();
      });
      M.style.color = "#e04674", m.appendChild(M);
      const x = document.createElement("div");
      x.style.cssText = `
        height: 1px;
        background: var(--border, oklch(0.92 0 0));
        margin: 4px 8px;
      `, m.appendChild(x);
      const D = document.createElement("div");
      D.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: ${y ? "#999" : "oklch(0.55 0 0)"};
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, D.textContent = "Alignment", m.appendChild(D);
      const C = document.createElement("div");
      C.style.cssText = `
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
      ], A = [], P = (L) => {
        A.forEach((B) => {
          (B.getAttribute("data-align-value") || "left") === L ? (B.style.background = "oklch(1 0 0)", B.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", B.style.color = "oklch(0.25 0 0)", B.style.fontWeight = "600") : (B.style.background = "transparent", B.style.boxShadow = "none", B.style.color = "oklch(0.5 0 0)", B.style.fontWeight = "400");
        });
      };
      N.forEach(({ value: L, label: B, icon: U }) => {
        const K = document.createElement("button");
        K.setAttribute("type", "button"), K.setAttribute("data-align-value", L), K.setAttribute("title", `Align ${B.toLowerCase()}`), K.style.cssText = `
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
        `, K.innerHTML = `${U}<span>${B}</span>`, K.addEventListener("click", (oe) => {
          oe.preventDefault(), oe.stopPropagation();
          const ae = typeof r == "function" ? r() : null;
          ae != null && n.commands.command(({ tr: ve, dispatch: xe }) => {
            const Ne = ve.doc.nodeAt(ae);
            return !Ne || Ne.type.name !== "resizableImage" ? !1 : (xe && ve.setNodeMarkup(ae, void 0, { ...Ne.attrs, align: L }), !0);
          }), P(L);
        }), A.push(K), C.appendChild(K);
      }), m.appendChild(C);
      const O = () => {
        const L = o.attrs.align || "left";
        P(L);
      };
      let _ = !1;
      g.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), _)
          m.style.display = "none", _ = !1;
        else {
          const B = g.getBoundingClientRect(), U = 200, K = m.closest('[role="dialog"]');
          let oe = 0, ae = 0;
          if (K) {
            const lt = K.getBoundingClientRect();
            oe = lt.left, ae = lt.top;
          }
          let ve = B.bottom + 4 - ae, xe = B.right - U - oe;
          const Ne = window.innerHeight, it = window.innerWidth, Xe = 200;
          B.bottom + 4 + Xe > Ne && (ve = B.top - Xe - 4 - ae), xe + oe < 8 && (xe = 8 - oe), xe + U + oe > it - 8 && (xe = it - U - 8 - oe), m.style.top = `${ve}px`, m.style.left = `${xe}px`, m.style.display = "flex", _ = !0, O();
        }
      });
      const W = (L) => {
        !m.contains(L.target) && !g.contains(L.target) && (m.style.display = "none", _ = !1);
      };
      document.addEventListener("click", W);
      const F = document.createElement("button");
      F.setAttribute("type", "button"), F.setAttribute("title", "View full size"), F.style.cssText = `
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
      `, F.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      `, F.addEventListener("mouseenter", () => {
        F.style.background = "oklch(0.95 0 0)";
      }), F.addEventListener("mouseleave", () => {
        F.style.background = "oklch(0.98 0 0 / 0.95)";
      }), s.appendChild(a), s.appendChild(F), s.appendChild(p), s.appendChild(g);
      const I = s.closest('[role="dialog"]');
      I ? I.appendChild(m) : document.body.appendChild(m), s.addEventListener("mouseenter", () => {
        p.style.opacity = "1", g.style.opacity = "1", F.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        p.style.opacity = "0", F.style.opacity = "0", _ || (g.style.opacity = "0");
      }), g.addEventListener("mouseenter", () => {
        g.style.background = "oklch(0.95 0 0)";
      }), g.addEventListener("mouseleave", () => {
        g.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      let H = !1;
      const q = (L) => {
        L.preventDefault(), L.stopPropagation();
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
        const U = document.createElement("img");
        U.src = a.src, U.alt = a.alt || "", U.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const K = document.createElement("button");
        K.setAttribute("type", "button"), K.setAttribute("aria-label", "Close"), K.style.cssText = `
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
        `, K.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', K.addEventListener("mouseenter", () => {
          K.style.background = "rgba(255, 255, 255, 0.25)";
        }), K.addEventListener("mouseleave", () => {
          K.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const oe = Array.from(
          n.view.dom.querySelectorAll("figure.image-resizer img")
        );
        let ae = oe.indexOf(a);
        ae < 0 && (ae = 0);
        const ve = oe.length > 1, xe = document.createElement("div");
        xe.style.cssText = `
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
        `;
        const Ne = (De) => {
          const $e = oe.length;
          if ($e === 0) return;
          ae = (De % $e + $e) % $e;
          const je = oe[ae];
          U.src = je.src, U.alt = je.alt || "";
          const Le = (je.alt || "").trim(), At = $e > 1 ? `${ae + 1} / ${$e}` : "", vt = [Le, At].filter(Boolean).join("   ·   ");
          xe.textContent = vt, xe.style.display = vt ? "block" : "none";
        }, it = (De, $e, je) => {
          const Le = document.createElement("button");
          return Le.setAttribute("type", "button"), Le.setAttribute("aria-label", je < 0 ? "Previous image" : "Next image"), Le.style.cssText = `
            position: absolute;
            ${De}: 16px;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.15);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s ease;
            z-index: 1;
          `, Le.innerHTML = $e, Le.addEventListener("mouseenter", () => {
            Le.style.background = "rgba(255, 255, 255, 0.25)";
          }), Le.addEventListener("mouseleave", () => {
            Le.style.background = "rgba(255, 255, 255, 0.15)";
          }), Le.addEventListener("click", (At) => {
            At.stopPropagation(), Ne(ae + je);
          }), Le;
        }, Xe = ve ? it("left", '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>', -1) : null, lt = ve ? it("right", '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', 1) : null, Lt = () => {
          document.removeEventListener("keydown", Vt), B.style.opacity = "0", U.style.transform = "scale(0.92)", setTimeout(() => B.remove(), 200);
        };
        B.addEventListener("click", (De) => {
          De.target === B && Lt();
        }), K.addEventListener("click", Lt);
        const Vt = (De) => {
          De.key === "Escape" ? Lt() : ve && De.key === "ArrowLeft" ? (De.preventDefault(), Ne(ae - 1)) : ve && De.key === "ArrowRight" && (De.preventDefault(), Ne(ae + 1));
        };
        document.addEventListener("keydown", Vt), B.appendChild(U), B.appendChild(K), Xe && B.appendChild(Xe), lt && B.appendChild(lt), B.appendChild(xe), Ne(ae);
        const Kt = s.closest('[role="dialog"]');
        Kt ? Kt.appendChild(B) : document.body.appendChild(B), requestAnimationFrame(() => {
          B.style.opacity = "1", U.style.transform = "scale(1)";
        });
      };
      F.addEventListener("click", q);
      const ee = (L) => {
        H || q(L);
      };
      a.addEventListener("dblclick", ee);
      let te, ne;
      const X = (L) => {
        L.preventDefault(), H = !0, te = L.clientX, ne = a.offsetWidth, document.addEventListener("mousemove", $), document.addEventListener("mouseup", Z);
      }, $ = (L) => {
        const B = L.clientX - te, U = Math.max(100, ne + B);
        a.style.width = `${U}px`;
      }, Z = () => {
        document.removeEventListener("mousemove", $), document.removeEventListener("mouseup", Z), setTimeout(() => {
          H = !1;
        }, 100);
        const L = typeof r == "function" ? r() : null, B = a.offsetWidth;
        L != null && B > 0 && n.commands.command(({ tr: U, dispatch: K }) => {
          const oe = U.doc.nodeAt(L);
          return !oe || oe.type.name !== "resizableImage" || oe.attrs.width === B ? !1 : (K && U.setNodeMarkup(L, void 0, { ...oe.attrs, width: B }), !0);
        });
      };
      return p.addEventListener("mousedown", X), {
        dom: s,
        update: (L) => L.type.name !== "resizableImage" ? !1 : (o = L, L.attrs.src !== d && u(L.attrs.src), a.alt = L.attrs.alt || "", f(L.attrs.alt), L.attrs.width && (a.style.width = `${L.attrs.width}px`), i(L.attrs.align || "left"), !0),
        destroy: () => {
          p.removeEventListener("mousedown", X), F.removeEventListener("click", q), a.removeEventListener("dblclick", ee), document.removeEventListener("click", W), m.remove();
        }
      };
    };
  }
});
function jb(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Yb = {}, qn = {};
function nn(e, t) {
  try {
    const r = (Yb[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in qn ? qn[r] : Hi(r, r.split(":"));
  } catch {
    if (e in qn) return qn[e];
    const n = e?.match(Vb);
    return n ? Hi(e, n.slice(1)) : NaN;
  }
}
const Vb = /([+-]\d\d):?(\d\d)?/;
function Hi(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return qn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class pt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(nn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), $d(this), Os(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new pt(...n, t) : new pt(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new pt(+this, t);
  }
  getTimezoneOffset() {
    const t = -nn(this.timeZone, this);
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
    return new pt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Bi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Bi.test(e)) return;
  const t = e.replace(Bi, "$1UTC");
  pt.prototype[t] && (e.startsWith("get") ? pt.prototype[e] = function() {
    return this.internal[t]();
  } : (pt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Kb(this), +this;
  }, pt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Os(this), +this;
  }));
});
function Os(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-nn(e.timeZone, e) * 60));
}
function Kb(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), $d(e);
}
function $d(e) {
  const t = nn(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const c = /* @__PURE__ */ new Date(+e);
  c.setUTCSeconds(0);
  const d = o > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(nn(e.timeZone, e) * 60)) % 60;
  (u || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + d));
  const f = nn(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), m = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, b = m - l;
  if (y && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const v = nn(e.timeZone, e), w = v > 0 ? Math.floor(v) : Math.ceil(v), T = p - w;
    T && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + T), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + T));
  }
}
class Oe extends pt {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Oe(...n, t) : new Oe(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${jb(this.timeZone, this)})`;
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
    return new Oe(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Oe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Hd = 6048e5, Gb = 864e5, Wi = Symbol.for("constructDateFrom");
function Ee(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Wi in e ? e[Wi](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ge(e, t) {
  return Ee(t || e, e);
}
function Bd(e, t, n) {
  const r = ge(e, n?.in);
  return isNaN(t) ? Ee(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Wd(e, t, n) {
  const r = ge(e, n?.in);
  if (isNaN(t)) return Ee(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Ee(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const i = s.getDate();
  return o >= i ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let qb = {};
function pr() {
  return qb;
}
function An(e, t) {
  const n = pr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ge(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function ar(e, t) {
  return An(e, { ...t, weekStartsOn: 1 });
}
function zd(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = Ee(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = ar(o), i = Ee(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = ar(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function zi(e) {
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
function Wn(e, ...t) {
  const n = Ee.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function ir(e, t) {
  const n = ge(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Fd(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  ), s = ir(r), i = ir(o), a = +s - zi(s), l = +i - zi(i);
  return Math.round((a - l) / Gb);
}
function Xb(e, t) {
  const n = zd(e, t), r = Ee(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), ar(r);
}
function Zb(e, t, n) {
  return Bd(e, t * 7, n);
}
function Qb(e, t, n) {
  return Wd(e, t * 12, n);
}
function Jb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ee.bind(null, o));
    const s = ge(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Ee(r, n || NaN);
}
function ew(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ee.bind(null, o));
    const s = ge(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Ee(r, n || NaN);
}
function tw(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  );
  return +ir(r) == +ir(o);
}
function Ud(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function nw(e) {
  return !(!Ud(e) && typeof e != "number" || isNaN(+ge(e)));
}
function rw(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function ow(e, t) {
  const n = ge(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function jd(e, t) {
  const [n, r] = Wn(e, t.start, t.end);
  return { start: n, end: r };
}
function sw(e, t) {
  const { start: n, end: r } = jd(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const l = [];
  for (; +i <= s; )
    l.push(Ee(n, i)), i.setMonth(i.getMonth() + a);
  return o ? l.reverse() : l;
}
function aw(e, t) {
  const n = ge(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function iw(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Yd(e, t) {
  const n = ge(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function lw(e, t) {
  const { start: n, end: r } = jd(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const l = [];
  for (; +i <= s; )
    l.push(Ee(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? l.reverse() : l;
}
function Vd(e, t) {
  const n = pr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ge(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function cw(e, t) {
  return Vd(e, { ...t, weekStartsOn: 1 });
}
const dw = {
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
}, uw = (e, t, n) => {
  let r;
  const o = dw[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ds(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const fw = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, pw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, hw = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, mw = {
  date: ds({
    formats: fw,
    defaultWidth: "full"
  }),
  time: ds({
    formats: pw,
    defaultWidth: "full"
  }),
  dateTime: ds({
    formats: hw,
    defaultWidth: "full"
  })
}, gw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, yw = (e, t, n, r) => gw[e];
function jn(e) {
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
const vw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, bw = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ww = {
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
}, kw = {
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
}, xw = {
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
}, Cw = {
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
}, Ew = (e, t) => {
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
}, Mw = {
  ordinalNumber: Ew,
  era: jn({
    values: vw,
    defaultWidth: "wide"
  }),
  quarter: jn({
    values: bw,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: jn({
    values: ww,
    defaultWidth: "wide"
  }),
  day: jn({
    values: kw,
    defaultWidth: "wide"
  }),
  dayPeriod: jn({
    values: xw,
    defaultWidth: "wide",
    formattingValues: Cw,
    defaultFormattingWidth: "wide"
  })
};
function Yn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(a) ? Sw(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Tw(a, (u) => u.test(i))
    );
    let c;
    c = e.valueCallback ? e.valueCallback(l) : l, c = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(c)
    ) : c;
    const d = t.slice(i.length);
    return { value: c, rest: d };
  };
}
function Tw(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Sw(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Nw(e) {
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
const Dw = /^(\d+)(th|st|nd|rd)?/i, Lw = /\d+/i, Aw = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Rw = {
  any: [/^b/i, /^(a|c)/i]
}, Iw = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Pw = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ow = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, _w = {
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
}, $w = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Hw = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Bw = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Ww = {
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
}, zw = {
  ordinalNumber: Nw({
    matchPattern: Dw,
    parsePattern: Lw,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Yn({
    matchPatterns: Aw,
    defaultMatchWidth: "wide",
    parsePatterns: Rw,
    defaultParseWidth: "any"
  }),
  quarter: Yn({
    matchPatterns: Iw,
    defaultMatchWidth: "wide",
    parsePatterns: Pw,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Yn({
    matchPatterns: Ow,
    defaultMatchWidth: "wide",
    parsePatterns: _w,
    defaultParseWidth: "any"
  }),
  day: Yn({
    matchPatterns: $w,
    defaultMatchWidth: "wide",
    parsePatterns: Hw,
    defaultParseWidth: "any"
  }),
  dayPeriod: Yn({
    matchPatterns: Bw,
    defaultMatchWidth: "any",
    parsePatterns: Ww,
    defaultParseWidth: "any"
  })
}, Ca = {
  code: "en-US",
  formatDistance: uw,
  formatLong: mw,
  formatRelative: yw,
  localize: Mw,
  match: zw,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Fw(e, t) {
  const n = ge(e, t?.in);
  return Fd(n, Yd(n)) + 1;
}
function Kd(e, t) {
  const n = ge(e, t?.in), r = +ar(n) - +Xb(n);
  return Math.round(r / Hd) + 1;
}
function Gd(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = pr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Ee(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = An(i, t), l = Ee(t?.in || e, 0);
  l.setFullYear(r, 0, s), l.setHours(0, 0, 0, 0);
  const c = An(l, t);
  return +n >= +a ? r + 1 : +n >= +c ? r : r - 1;
}
function Uw(e, t) {
  const n = pr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Gd(e, t), s = Ee(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), An(s, t);
}
function qd(e, t) {
  const n = ge(e, t?.in), r = +An(n, t) - +Uw(n, t);
  return Math.round(r / Hd) + 1;
}
function me(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const $t = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return me(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : me(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return me(e.getDate(), t.length);
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
    return me(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return me(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return me(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return me(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return me(o, t.length);
  }
}, vn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Fi = {
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
    return $t.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Gd(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return me(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : me(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = zd(e);
    return me(n, t.length);
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
    return me(n, t.length);
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
        return me(r, 2);
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
        return me(r, 2);
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
        return $t.M(e, t);
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
        return me(r + 1, 2);
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
    const o = qd(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : me(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Kd(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : me(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : $t.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Fw(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : me(r, t.length);
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
        return me(s, 2);
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
        return me(s, t.length);
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
        return me(o, t.length);
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
    switch (r === 12 ? o = vn.noon : r === 0 ? o = vn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = vn.evening : r >= 12 ? o = vn.afternoon : r >= 4 ? o = vn.morning : o = vn.night, t) {
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
    return $t.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : $t.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : me(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : me(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : $t.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : $t.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return $t.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return ji(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Jt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Jt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return ji(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Jt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Jt(r, ":");
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
        return "GMT" + Ui(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Jt(r, ":");
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
        return "GMT" + Ui(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Jt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return me(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return me(+e, t.length);
  }
};
function Ui(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + me(s, 2);
}
function ji(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + me(Math.abs(e) / 60, 2) : Jt(e, t);
}
function Jt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = me(Math.trunc(r / 60), 2), s = me(r % 60, 2);
  return n + o + t + s;
}
const Yi = (e, t) => {
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
}, Xd = (e, t) => {
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
}, jw = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Yi(e, t);
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
  return s.replace("{{date}}", Yi(r, t)).replace("{{time}}", Xd(o, t));
}, Yw = {
  p: Xd,
  P: jw
}, Vw = /^D+$/, Kw = /^Y+$/, Gw = ["D", "DD", "YY", "YYYY"];
function qw(e) {
  return Vw.test(e);
}
function Xw(e) {
  return Kw.test(e);
}
function Zw(e, t, n) {
  const r = Qw(e, t, n);
  if (console.warn(r), Gw.includes(e)) throw new RangeError(r);
}
function Qw(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Jw = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, e0 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, t0 = /^'([^]*?)'?$/, n0 = /''/g, r0 = /[a-zA-Z]/;
function o0(e, t, n) {
  const r = pr(), o = n?.locale ?? r.locale ?? Ca, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = ge(e, n?.in);
  if (!nw(a))
    throw new RangeError("Invalid time value");
  let l = t.match(e0).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const f = Yw[u];
      return f(d, o.formatLong);
    }
    return d;
  }).join("").match(Jw).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: s0(d) };
    if (Fi[u])
      return { isToken: !0, value: d };
    if (u.match(r0))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + u + "`"
      );
    return { isToken: !1, value: d };
  });
  o.localize.preprocessor && (l = o.localize.preprocessor(a, l));
  const c = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: o
  };
  return l.map((d) => {
    if (!d.isToken) return d.value;
    const u = d.value;
    (!n?.useAdditionalWeekYearTokens && Xw(u) || !n?.useAdditionalDayOfYearTokens && qw(u)) && Zw(u, t, String(e));
    const f = Fi[u[0]];
    return f(a, u, o.localize, c);
  }).join("");
}
function s0(e) {
  const t = e.match(t0);
  return t ? t[1].replace(n0, "'") : e;
}
function a0(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Ee(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function i0(e, t) {
  return ge(e, t?.in).getMonth();
}
function l0(e, t) {
  return ge(e, t?.in).getFullYear();
}
function c0(e, t) {
  return +ge(e) > +ge(t);
}
function d0(e, t) {
  return +ge(e) < +ge(t);
}
function u0(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function f0(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function p0(e, t, n) {
  const r = ge(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Ee(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = a0(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function h0(e, t, n) {
  const r = ge(e, n?.in);
  return isNaN(+r) ? Ee(e, NaN) : (r.setFullYear(t), r);
}
const Vi = 5, m0 = 4;
function g0(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Vi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Vi : m0;
}
function Zd(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function y0(e, t) {
  const n = Zd(e, t), r = g0(e, t);
  return t.addDays(n, r * 7 - 1);
}
class qe {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Oe.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Oe(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Bd(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Wd(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Zb(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : Qb(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Fd(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : rw(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : sw(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : lw(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : y0(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : cw(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : ow(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Vd(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : iw(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : o0(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Kd(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : i0(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : l0(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : qd(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : c0(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : d0(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Ud(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : tw(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : u0(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : f0(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Jb(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : ew(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : p0(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : h0(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Zd(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : ir(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : ar(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : aw(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : An(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Yd(r), this.options = { locale: Ca, ...t }, this.overrides = n;
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
    return t && qe.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && qe.yearFirstLocales.has(s))
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
qe.yearFirstLocales = /* @__PURE__ */ new Set([
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
const yt = new qe();
class Qd {
  constructor(t, n, r = yt) {
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
class v0 {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class b0 {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function w0(e) {
  return G.createElement("button", { ...e });
}
function k0(e) {
  return G.createElement("span", { ...e });
}
function x0(e) {
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
function C0(e) {
  const { day: t, modifiers: n, ...r } = e;
  return G.createElement("td", { ...r });
}
function E0(e) {
  const { day: t, modifiers: n, ...r } = e, o = G.useRef(null);
  return G.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), G.createElement("button", { ref: o, ...r });
}
var re;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(re || (re = {}));
var be;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(be || (be = {}));
var rt;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(rt || (rt = {}));
var Ve;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Ve || (Ve = {}));
function M0(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[re.Dropdown], n].join(" "), a = t?.find(({ value: l }) => l === s.value);
  return G.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[re.DropdownRoot] },
    G.createElement(r.Select, { className: i, ...s }, t?.map(({ value: l, label: c, disabled: d }) => G.createElement(r.Option, { key: l, value: l, disabled: d }, c))),
    G.createElement(
      "span",
      { className: o[re.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      G.createElement(r.Chevron, { orientation: "down", size: 18, className: o[re.Chevron] })
    )
  );
}
function T0(e) {
  return G.createElement("div", { ...e });
}
function S0(e) {
  return G.createElement("div", { ...e });
}
function N0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return G.createElement("div", { ...r }, e.children);
}
function D0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return G.createElement("div", { ...r });
}
function L0(e) {
  return G.createElement("table", { ...e });
}
function A0(e) {
  return G.createElement("div", { ...e });
}
const Jd = bl(void 0);
function hr() {
  const e = wl(Jd);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function R0(e) {
  const { components: t } = hr();
  return G.createElement(t.Dropdown, { ...e });
}
function I0(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: l, labelNext: c } } = hr(), d = z((f) => {
    o && n?.(f);
  }, [o, n]), u = z((f) => {
    r && t?.(f);
  }, [r, t]);
  return G.createElement(
    "nav",
    { ...s },
    G.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[re.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: u },
      G.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[re.Chevron], orientation: "left" })
    ),
    G.createElement(
      i.NextMonthButton,
      { type: "button", className: a[re.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": c(o), onClick: d },
      G.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[re.Chevron] })
    )
  );
}
function P0(e) {
  const { components: t } = hr();
  return G.createElement(t.Button, { ...e });
}
function O0(e) {
  return G.createElement("option", { ...e });
}
function _0(e) {
  const { components: t } = hr();
  return G.createElement(t.Button, { ...e });
}
function $0(e) {
  const { rootRef: t, ...n } = e;
  return G.createElement("div", { ...n, ref: t });
}
function H0(e) {
  return G.createElement("select", { ...e });
}
function B0(e) {
  const { week: t, ...n } = e;
  return G.createElement("tr", { ...n });
}
function W0(e) {
  return G.createElement("th", { ...e });
}
function z0(e) {
  return G.createElement(
    "thead",
    { "aria-hidden": !0 },
    G.createElement("tr", { ...e })
  );
}
function F0(e) {
  const { week: t, ...n } = e;
  return G.createElement("th", { ...n });
}
function U0(e) {
  return G.createElement("th", { ...e });
}
function j0(e) {
  return G.createElement("tbody", { ...e });
}
function Y0(e) {
  const { components: t } = hr();
  return G.createElement(t.Dropdown, { ...e });
}
const V0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: w0,
  CaptionLabel: k0,
  Chevron: x0,
  Day: C0,
  DayButton: E0,
  Dropdown: M0,
  DropdownNav: T0,
  Footer: S0,
  Month: N0,
  MonthCaption: D0,
  MonthGrid: L0,
  Months: A0,
  MonthsDropdown: R0,
  Nav: I0,
  NextMonthButton: P0,
  Option: O0,
  PreviousMonthButton: _0,
  Root: $0,
  Select: H0,
  Week: B0,
  WeekNumber: F0,
  WeekNumberHeader: U0,
  Weekday: W0,
  Weekdays: z0,
  Weeks: j0,
  YearsDropdown: Y0
}, Symbol.toStringTag, { value: "Module" }));
function xt(e, t, n = !1, r = yt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function eu(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ea(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function tu(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function nu(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function ru(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ou(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Ct(e, t, n = yt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (ou(a, n))
      return a.includes(e);
    if (Ea(a))
      return xt(a, e, !1, n);
    if (ru(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (eu(a)) {
      const l = s(a.before, e), c = s(a.after, e), d = l > 0, u = c < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return tu(a) ? s(e, a.after) > 0 : nu(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function K0(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: l, broadcastCalendar: c, today: d } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: g, endOfMonth: m, isAfter: y } = o, b = n && p(n), v = r && m(r), w = {
    [be.focused]: [],
    [be.outside]: [],
    [be.disabled]: [],
    [be.hidden]: [],
    [be.today]: []
  }, T = {};
  for (const k of e) {
    const { date: E, displayMonth: M } = k, x = !!(M && !f(E, M)), D = !!(b && g(E, b)), C = !!(v && y(E, v)), N = !!(s && Ct(E, s, o)), A = !!(i && Ct(E, i, o)) || D || C || // Broadcast calendar will show outside days as default
    !c && !l && x || c && l === !1 && x, P = u(E, d ?? o.today());
    x && w.outside.push(k), N && w.disabled.push(k), A && w.hidden.push(k), P && w.today.push(k), a && Object.keys(a).forEach((O) => {
      const _ = a?.[O];
      _ && Ct(E, _, o) && (T[O] ? T[O].push(k) : T[O] = [k]);
    });
  }
  return (k) => {
    const E = {
      [be.focused]: !1,
      [be.disabled]: !1,
      [be.hidden]: !1,
      [be.outside]: !1,
      [be.today]: !1
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
function G0(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[be[s]] ? o.push(t[be[s]]) : t[rt[s]] && o.push(t[rt[s]]), o), [t[re.Day]]);
}
function q0(e) {
  return {
    ...V0,
    ...e
  };
}
function X0(e) {
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
function Ma() {
  const e = {};
  for (const t in re)
    e[re[t]] = `rdp-${re[t]}`;
  for (const t in be)
    e[be[t]] = `rdp-${be[t]}`;
  for (const t in rt)
    e[rt[t]] = `rdp-${rt[t]}`;
  for (const t in Ve)
    e[Ve[t]] = `rdp-${Ve[t]}`;
  return e;
}
function su(e, t, n) {
  return (n ?? new qe(t)).formatMonthYear(e);
}
const Z0 = su;
function Q0(e, t, n) {
  return (n ?? new qe(t)).format(e, "d");
}
function J0(e, t = yt) {
  return t.format(e, "LLLL");
}
function ek(e, t, n) {
  return (n ?? new qe(t)).format(e, "cccccc");
}
function tk(e, t = yt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function nk() {
  return "";
}
function au(e, t = yt) {
  return t.format(e, "yyyy");
}
const rk = au, ok = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: su,
  formatDay: Q0,
  formatMonthCaption: Z0,
  formatMonthDropdown: J0,
  formatWeekNumber: tk,
  formatWeekNumberHeader: nk,
  formatWeekdayName: ek,
  formatYearCaption: rk,
  formatYearDropdown: au
}, Symbol.toStringTag, { value: "Module" }));
function sk(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...ok,
    ...e
  };
}
function ak(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: l, getMonth: c } = o;
  return l({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), g = c(f), m = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: p, disabled: m };
  });
}
function ik(e, t = {}, n = {}) {
  let r = { ...t?.[re.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function lk(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function ck(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: i, eachYearOfInterval: a, getYear: l } = r, c = s(e), d = i(t), u = a({ start: c, end: d });
  return o && u.reverse(), u.map((f) => {
    const p = n.formatYearDropdown(f, r);
    return {
      value: l(f),
      label: p,
      disabled: !1
    };
  });
}
function iu(e, t, n, r) {
  let o = (r ?? new qe(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const dk = iu;
function lu(e, t, n) {
  return (n ?? new qe(t)).formatMonthYear(e);
}
const uk = lu;
function fk(e, t, n, r) {
  let o = (r ?? new qe(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function pk(e) {
  return "Choose the Month";
}
function hk() {
  return "";
}
function mk(e) {
  return "Go to the Next Month";
}
function gk(e) {
  return "Go to the Previous Month";
}
function yk(e, t, n) {
  return (n ?? new qe(t)).format(e, "cccc");
}
function vk(e, t) {
  return `Week ${e}`;
}
function bk(e) {
  return "Week Number";
}
function wk(e) {
  return "Choose the Year";
}
const kk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: uk,
  labelDay: dk,
  labelDayButton: iu,
  labelGrid: lu,
  labelGridcell: fk,
  labelMonthDropdown: pk,
  labelNav: hk,
  labelNext: mk,
  labelPrevious: gk,
  labelWeekNumber: vk,
  labelWeekNumberHeader: bk,
  labelWeekday: yk,
  labelYearDropdown: wk
}, Symbol.toStringTag, { value: "Module" })), mr = (e) => e instanceof HTMLElement ? e : null, us = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], xk = (e) => mr(e.querySelector("[data-animated-month]")), fs = (e) => mr(e.querySelector("[data-animated-caption]")), ps = (e) => mr(e.querySelector("[data-animated-weeks]")), Ck = (e) => mr(e.querySelector("[data-animated-nav]")), Ek = (e) => mr(e.querySelector("[data-animated-weekdays]"));
function Mk(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = j(null), a = j(r), l = j(!1);
  go(() => {
    const c = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || c.length === 0 || r.length !== c.length)
      return;
    const d = s.isSameMonth(r[0].date, c[0].date), u = s.isAfter(r[0].date, c[0].date), f = u ? n[Ve.caption_after_enter] : n[Ve.caption_before_enter], p = u ? n[Ve.weeks_after_enter] : n[Ve.weeks_before_enter], g = i.current, m = e.current.cloneNode(!0);
    if (m instanceof HTMLElement ? (us(m).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const T = xk(w);
      T && w.contains(T) && w.removeChild(T);
      const k = fs(w);
      k && k.classList.remove(f);
      const E = ps(w);
      E && E.classList.remove(p);
    }), i.current = m) : i.current = null, l.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = g instanceof HTMLElement ? us(g) : [], b = us(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && y && y.every((v) => v instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const v = Ck(e.current);
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
          l.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), E && E.classList.remove(f), M && M.classList.remove(p), w.style.position = "", w.style.overflow = "", w.contains(k) && w.removeChild(k);
        };
        k.style.pointerEvents = "none", k.style.position = "absolute", k.style.overflow = "hidden", k.setAttribute("aria-hidden", "true");
        const D = Ek(k);
        D && (D.style.opacity = "0");
        const C = fs(k);
        C && (C.classList.add(u ? n[Ve.caption_before_exit] : n[Ve.caption_after_exit]), C.addEventListener("animationend", x));
        const N = ps(k);
        N && N.classList.add(u ? n[Ve.weeks_before_exit] : n[Ve.weeks_after_exit]), w.insertBefore(k, w.firstChild);
      });
    }
  });
}
function Tk(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: l } = n ?? {}, { addDays: c, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: g, endOfWeek: m, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: w } = r, T = l ? b(o, r) : i ? v(o) : w(o), k = l ? f(s) : i ? p(g(s)) : m(g(s)), E = d(k, T), M = u(s, o) + 1, x = [];
  for (let N = 0; N <= E; N++) {
    const A = c(T, N);
    if (t && y(A, t))
      break;
    x.push(A);
  }
  const C = (l ? 35 : 42) * M;
  if (a && x.length < C) {
    const N = C - x.length;
    for (let A = 0; A < N; A++) {
      const P = c(x[x.length - 1], 1);
      x.push(P);
    }
  }
  return x;
}
function Sk(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Nk(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function Ki(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let l = o || s || i;
  const { differenceInCalendarMonths: c, addMonths: d, startOfMonth: u } = r;
  if (n && c(n, l) < a - 1) {
    const f = -1 * (a - 1);
    l = d(n, f);
  }
  return t && c(l, t) < 0 && (l = t), u(l);
}
function Dk(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: l, getISOWeek: c, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, g = e.reduce((m, y) => {
    const b = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? f(y) : p(y), v = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : l(a(y)), w = t.filter((M) => M >= b && M <= v), T = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < T) {
      const M = t.filter((x) => {
        const D = T - w.length;
        return x > v && x <= o(v, D);
      });
      w.push(...M);
    }
    const k = w.reduce((M, x) => {
      const D = n.ISOWeek ? c(x) : d(x), C = M.find((A) => A.weekNumber === D), N = new Qd(x, y, r);
      return C ? C.days.push(N) : M.push(new b0(D, [N])), M;
    }, []), E = new v0(y, k);
    return m.push(E), m;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function Lk(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: l, endOfYear: c, newDate: d, today: u } = t, { fromYear: f, toYear: p, fromMonth: g, toMonth: m } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !r && m && (r = m), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = d(f, 0, 1) : !n && y && (n = o(l(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = c(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function Ak(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, c = o ? s : 1, d = i(e);
  if (!t)
    return a(d, c);
  if (!(l(t, e) < s))
    return a(d, c);
}
function Rk(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, c = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -c);
  if (!(l(d, t) <= 0))
    return a(d, -c);
}
function Ik(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Ro(e, t) {
  const [n, r] = Y(e);
  return [t === void 0 ? n : t, r];
}
function Pk(e, t) {
  const [n, r] = Lk(e, t), { startOfMonth: o, endOfMonth: s } = t, i = Ki(e, n, r, t), [a, l] = Ro(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  V(() => {
    const E = Ki(e, n, r, t);
    l(E);
  }, [e.timeZone]);
  const c = Nk(a, r, e, t), d = Tk(c, e.endMonth ? s(e.endMonth) : void 0, e, t), u = Dk(c, d, e, t), f = Ik(u), p = Sk(u), g = Rk(a, n, e, t), m = Ak(a, r, e, t), { disableNavigation: y, onMonthChange: b } = e, v = (E) => f.some((M) => M.days.some((x) => x.isEqualTo(E))), w = (E) => {
    if (y)
      return;
    let M = o(E);
    n && M < o(n) && (M = o(n)), r && M > o(r) && (M = o(r)), l(M), b?.(M);
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
var dt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(dt || (dt = {}));
function Gi(e) {
  return !e[be.disabled] && !e[be.hidden] && !e[be.outside];
}
function Ok(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    Gi(a) && (a[be.focused] && s < dt.FocusedModifier ? (o = i, s = dt.FocusedModifier) : r?.isEqualTo(i) && s < dt.LastFocused ? (o = i, s = dt.LastFocused) : n(i.date) && s < dt.Selected ? (o = i, s = dt.Selected) : a[be.today] && s < dt.Today && (o = i, s = dt.Today));
  }
  return o || (o = e.find((i) => Gi(t(i)))), o;
}
function _k(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: l } = s, { addDays: c, addMonths: d, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: g, endOfWeek: m, max: y, min: b, startOfBroadcastWeek: v, startOfISOWeek: w, startOfWeek: T } = i;
  let E = {
    day: c,
    week: u,
    month: d,
    year: f,
    startOfWeek: (M) => l ? v(M, i) : a ? w(M) : T(M),
    endOfWeek: (M) => l ? p(M) : a ? g(M) : m(M)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? E = y([r, E]) : t === "after" && o && (E = b([o, E])), E;
}
function cu(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const l = _k(e, t, n.date, r, o, s, i), c = !!(s.disabled && Ct(l, s.disabled, i)), d = !!(s.hidden && Ct(l, s.hidden, i)), u = l, f = new Qd(l, u, i);
  return !c && !d ? f : cu(e, t, f, r, o, s, i, a + 1);
}
function $k(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = Y(), l = Ok(t.days, n, r || (() => !1), i), [c, d] = Y(s ? l : void 0);
  return {
    isFocusTarget: (m) => !!l?.isEqualTo(m),
    setFocused: d,
    focused: c,
    blur: () => {
      a(c), d(void 0);
    },
    moveFocus: (m, y) => {
      if (!c)
        return;
      const b = cu(m, y, c, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(b)) || (t.goToDay(b), d(b)));
    }
  };
}
function Hk(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Ro(n, o ? n : void 0), a = o ? n : s, { isSameDay: l } = t, c = (p) => a?.some((g) => l(g, p)) ?? !1, { min: d, max: u } = e;
  return {
    selected: a,
    select: (p, g, m) => {
      let y = [...a ?? []];
      if (c(p)) {
        if (a?.length === d || r && a?.length === 1)
          return;
        y = a?.filter((b) => !l(b, p));
      } else
        a?.length === u ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, g, m), y;
    },
    isSelected: c
  };
}
function Bk(e, t, n = 0, r = 0, o = !1, s = yt) {
  const { from: i, to: a } = t || {}, { isSameDay: l, isAfter: c, isBefore: d } = s;
  let u;
  if (!i && !a)
    u = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !a)
    l(i, e) ? n === 0 ? u = { from: i, to: e } : o ? u = { from: i, to: void 0 } : u = void 0 : d(e, i) ? u = { from: e, to: i } : u = { from: i, to: e };
  else if (i && a)
    if (l(i, e) && l(a, e))
      o ? u = { from: i, to: a } : u = void 0;
    else if (l(i, e))
      u = { from: i, to: n > 0 ? void 0 : e };
    else if (l(a, e))
      u = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, i))
      u = { from: e, to: a };
    else if (c(e, i))
      u = { from: i, to: e };
    else if (c(e, a))
      u = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (u?.from && u?.to) {
    const f = s.differenceInCalendarDays(u.to, u.from);
    r > 0 && f > r ? u = { from: e, to: void 0 } : n > 1 && f < n && (u = { from: e, to: void 0 });
  }
  return u;
}
function Wk(e, t, n = yt) {
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
function qi(e, t, n = yt) {
  return xt(e, t.from, !1, n) || xt(e, t.to, !1, n) || xt(t, e.from, !1, n) || xt(t, e.to, !1, n);
}
function zk(e, t, n = yt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? xt(e, a, !1, n) : ou(a, n) ? a.some((l) => xt(e, l, !1, n)) : Ea(a) ? a.from && a.to ? qi(e, { from: a.from, to: a.to }, n) : !1 : ru(a) ? Wk(e, a.dayOfWeek, n) : eu(a) ? n.isAfter(a.before, a.after) ? qi(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : Ct(e.from, a, n) || Ct(e.to, a, n) : tu(a) || nu(a) ? Ct(e.from, a, n) || Ct(e.to, a, n) : !1))
    return !0;
  const i = r.filter((a) => typeof a == "function");
  if (i.length) {
    let a = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let c = 0; c <= l; c++) {
      if (i.some((d) => d(a)))
        return !0;
      a = n.addDays(a, 1);
    }
  }
  return !1;
}
function Fk(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, l] = Ro(o, i ? o : void 0), c = i ? o : a;
  return {
    selected: c,
    select: (f, p, g) => {
      const { min: m, max: y } = e, b = f ? Bk(f, c, m, y, s, t) : void 0;
      return r && n && b?.from && b.to && zk({ from: b.from, to: b.to }, n, t) && (b.from = f, b.to = void 0), i || l(b), i?.(b, f, p, g), b;
    },
    isSelected: (f) => c && xt(c, f, !1, t)
  };
}
function Uk(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Ro(n, o ? n : void 0), a = o ? n : s, { isSameDay: l } = t;
  return {
    selected: a,
    select: (u, f, p) => {
      let g = u;
      return !r && a && a && l(u, a) && (g = void 0), o || i(g), o?.(g, u, f, p), g;
    },
    isSelected: (u) => a ? l(a, u) : !1
  };
}
function jk(e, t) {
  const n = Uk(e, t), r = Hk(e, t), o = Fk(e, t);
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
function Yk(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Oe(t.today, t.timeZone)), t.month && (t.month = new Oe(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Oe(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Oe(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Oe(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Oe(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ue) => new Oe(ue, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Oe(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Oe(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = zt(() => {
    const ue = { ...Ca, ...t.locale };
    return {
      dateLib: new qe({
        locale: ue,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: q0(t.components),
      formatters: sk(t.formatters),
      labels: { ...kk, ...t.labels },
      locale: ue,
      classNames: { ...Ma(), ...t.classNames }
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
  ]), { captionLayout: l, mode: c, navLayout: d, numberOfMonths: u = 1, onDayBlur: f, onDayClick: p, onDayFocus: g, onDayKeyDown: m, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: v, onPrevClick: w, showWeekNumber: T, styles: k } = t, { formatCaption: E, formatDay: M, formatMonthDropdown: x, formatWeekNumber: D, formatWeekNumberHeader: C, formatWeekdayName: N, formatYearDropdown: A } = r, P = Pk(t, s), { days: O, months: _, navStart: W, navEnd: F, previousMonth: I, nextMonth: H, goToMonth: q } = P, ee = K0(O, t, W, F, s), { isSelected: te, select: ne, selected: X } = jk(t, s) ?? {}, { blur: $, focused: Z, isFocusTarget: L, moveFocus: B, setFocused: U } = $k(t, P, ee, te ?? (() => !1), s), { labelDayButton: K, labelGridcell: oe, labelGrid: ae, labelMonthDropdown: ve, labelNav: xe, labelPrevious: Ne, labelNext: it, labelWeekday: Xe, labelWeekNumber: lt, labelWeekNumberHeader: Lt, labelYearDropdown: Vt } = o, Kt = zt(() => lk(s, t.ISOWeek), [s, t.ISOWeek]), De = c !== void 0 || p !== void 0, $e = z(() => {
    I && (q(I), w?.(I));
  }, [I, q, w]), je = z(() => {
    H && (q(H), v?.(H));
  }, [q, H, v]), Le = z((ue, ye) => (le) => {
    le.preventDefault(), le.stopPropagation(), U(ue), ne?.(ue.date, ye, le), p?.(ue.date, ye, le);
  }, [ne, p, U]), At = z((ue, ye) => (le) => {
    U(ue), g?.(ue.date, ye, le);
  }, [g, U]), vt = z((ue, ye) => (le) => {
    $(), f?.(ue.date, ye, le);
  }, [$, f]), gr = z((ue, ye) => (le) => {
    const he = {
      ArrowLeft: [
        le.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        le.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [le.shiftKey ? "year" : "week", "after"],
      ArrowUp: [le.shiftKey ? "year" : "week", "before"],
      PageUp: [le.shiftKey ? "year" : "month", "before"],
      PageDown: [le.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (he[le.key]) {
      le.preventDefault(), le.stopPropagation();
      const [He, pe] = he[le.key];
      B(He, pe);
    }
    m?.(ue.date, ye, le);
  }, [B, m, t.dir]), yr = z((ue, ye) => (le) => {
    y?.(ue.date, ye, le);
  }, [y]), vr = z((ue, ye) => (le) => {
    b?.(ue.date, ye, le);
  }, [b]), br = z((ue) => (ye) => {
    const le = Number(ye.target.value), he = s.setMonth(s.startOfMonth(ue), le);
    q(he);
  }, [s, q]), Po = z((ue) => (ye) => {
    const le = Number(ye.target.value), he = s.setYear(s.startOfMonth(ue), le);
    q(he);
  }, [s, q]), { className: Oo, style: _o } = zt(() => ({
    className: [a[re.Root], t.className].filter(Boolean).join(" "),
    style: { ...k?.[re.Root], ...t.style }
  }), [a, t.className, t.style, k]), $o = X0(t), wr = j(null);
  Mk(wr, !!t.animate, {
    classNames: a,
    months: _,
    focused: Z,
    dateLib: s
  });
  const kr = {
    dayPickerProps: t,
    selected: X,
    select: ne,
    isSelected: te,
    months: _,
    nextMonth: H,
    previousMonth: I,
    goToMonth: q,
    getModifiers: ee,
    components: n,
    classNames: a,
    styles: k,
    labels: o,
    formatters: r
  };
  return G.createElement(
    Jd.Provider,
    { value: kr },
    G.createElement(
      n.Root,
      { rootRef: t.animate ? wr : void 0, className: Oo, style: _o, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...$o },
      G.createElement(
        n.Months,
        { className: a[re.Months], style: k?.[re.Months] },
        !t.hideNavigation && !d && G.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[re.Nav], style: k?.[re.Nav], "aria-label": xe(), onPreviousClick: $e, onNextClick: je, previousMonth: I, nextMonth: H }),
        _.map((ue, ye) => G.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[re.Month],
            style: k?.[re.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ye,
            displayIndex: ye,
            calendarMonth: ue
          },
          d === "around" && !t.hideNavigation && ye === 0 && G.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[re.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Ne(I), onClick: $e, "data-animated-button": t.animate ? "true" : void 0 },
            G.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: a[re.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          G.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[re.MonthCaption], style: k?.[re.MonthCaption], calendarMonth: ue, displayIndex: ye }, l?.startsWith("dropdown") ? G.createElement(
            n.DropdownNav,
            { className: a[re.Dropdowns], style: k?.[re.Dropdowns] },
            (() => {
              const le = l === "dropdown" || l === "dropdown-months" ? G.createElement(n.MonthsDropdown, { key: "month", className: a[re.MonthsDropdown], "aria-label": ve(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: br(ue.date), options: ak(ue.date, W, F, r, s), style: k?.[re.Dropdown], value: s.getMonth(ue.date) }) : G.createElement("span", { key: "month" }, x(ue.date, s)), he = l === "dropdown" || l === "dropdown-years" ? G.createElement(n.YearsDropdown, { key: "year", className: a[re.YearsDropdown], "aria-label": Vt(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Po(ue.date), options: ck(W, F, r, s, !!t.reverseYears), style: k?.[re.Dropdown], value: s.getYear(ue.date) }) : G.createElement("span", { key: "year" }, A(ue.date, s));
              return s.getMonthYearOrder() === "year-first" ? [he, le] : [le, he];
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
            } }, E(ue.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            G.createElement(n.CaptionLabel, { className: a[re.CaptionLabel], role: "status", "aria-live": "polite" }, E(ue.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && ye === u - 1 && G.createElement(
            n.NextMonthButton,
            { type: "button", className: a[re.NextMonthButton], tabIndex: H ? void 0 : -1, "aria-disabled": H ? void 0 : !0, "aria-label": it(H), onClick: je, "data-animated-button": t.animate ? "true" : void 0 },
            G.createElement(n.Chevron, { disabled: H ? void 0 : !0, className: a[re.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ye === u - 1 && d === "after" && !t.hideNavigation && G.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[re.Nav], style: k?.[re.Nav], "aria-label": xe(), onPreviousClick: $e, onNextClick: je, previousMonth: I, nextMonth: H }),
          G.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": ae(ue.date, s.options, s) || void 0, className: a[re.MonthGrid], style: k?.[re.MonthGrid] },
            !t.hideWeekdays && G.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[re.Weekdays], style: k?.[re.Weekdays] },
              T && G.createElement(n.WeekNumberHeader, { "aria-label": Lt(s.options), className: a[re.WeekNumberHeader], style: k?.[re.WeekNumberHeader], scope: "col" }, C()),
              Kt.map((le) => G.createElement(n.Weekday, { "aria-label": Xe(le, s.options, s), className: a[re.Weekday], key: String(le), style: k?.[re.Weekday], scope: "col" }, N(le, s.options, s)))
            ),
            G.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[re.Weeks], style: k?.[re.Weeks] }, ue.weeks.map((le) => G.createElement(
              n.Week,
              { className: a[re.Week], key: le.weekNumber, style: k?.[re.Week], week: le },
              T && // biome-ignore lint/a11y/useSemanticElements: react component
              G.createElement(n.WeekNumber, { week: le, style: k?.[re.WeekNumber], "aria-label": lt(le.weekNumber, {
                locale: i
              }), className: a[re.WeekNumber], scope: "row", role: "rowheader" }, D(le.weekNumber, s)),
              le.days.map((he) => {
                const { date: He } = he, pe = ee(he);
                if (pe[be.focused] = !pe.hidden && !!Z?.isEqualTo(he), pe[rt.selected] = te?.(He) || pe.selected, Ea(X)) {
                  const { from: Rt, to: It } = X;
                  pe[rt.range_start] = !!(Rt && It && s.isSameDay(He, Rt)), pe[rt.range_end] = !!(Rt && It && s.isSameDay(He, It)), pe[rt.range_middle] = xt(X, He, !0, s);
                }
                const dn = ik(pe, k, t.modifiersStyles), un = G0(pe, a, t.modifiersClassNames), Ho = !De && !pe.hidden ? oe(He, pe, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  G.createElement(n.Day, { key: `${s.format(He, "yyyy-MM-dd")}_${s.format(he.displayMonth, "yyyy-MM")}`, day: he, modifiers: pe, className: un.join(" "), style: dn, role: "gridcell", "aria-selected": pe.selected || void 0, "aria-label": Ho, "data-day": s.format(He, "yyyy-MM-dd"), "data-month": he.outside ? s.format(He, "yyyy-MM") : void 0, "data-selected": pe.selected || void 0, "data-disabled": pe.disabled || void 0, "data-hidden": pe.hidden || void 0, "data-outside": he.outside || void 0, "data-focused": pe.focused || void 0, "data-today": pe.today || void 0 }, !pe.hidden && De ? G.createElement(n.DayButton, { className: a[re.DayButton], style: k?.[re.DayButton], type: "button", day: he, modifiers: pe, disabled: pe.disabled || void 0, tabIndex: L(he) ? 0 : -1, "aria-label": K(He, pe, s.options, s), onClick: Le(he, pe), onBlur: vt(he, pe), onFocus: At(he, pe), onKeyDown: gr(he, pe), onMouseEnter: yr(he, pe), onMouseLeave: vr(he, pe) }, M(He, s.options, s)) : !pe.hidden && M(he.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      G.createElement(n.Footer, { className: a[re.Footer], style: k?.[re.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Vk({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const l = Ma();
  return /* @__PURE__ */ h(
    Yk,
    {
      showOutsideDays: n,
      className: ce(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (c) => c.toLocaleString("default", { month: "short" }),
        ...s
      },
      classNames: {
        root: ce("w-fit", l.root),
        months: ce(
          "flex gap-4 flex-col md:flex-row relative",
          l.months
        ),
        month: ce("flex flex-col w-full gap-4", l.month),
        nav: ce(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          l.nav
        ),
        button_previous: ce(
          Ls({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: ce(
          Ls({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_next
        ),
        month_caption: ce(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: ce(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          l.dropdowns
        ),
        dropdown_root: ce(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          l.dropdown_root
        ),
        dropdown: ce(
          "absolute bg-popover inset-0 opacity-0",
          l.dropdown
        ),
        caption_label: ce(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: ce("flex", l.weekdays),
        weekday: ce(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          l.weekday
        ),
        week: ce("flex w-full mt-2", l.week),
        week_number_header: ce(
          "select-none w-(--cell-size)",
          l.week_number_header
        ),
        week_number: ce(
          "text-[0.8rem] select-none text-muted-foreground",
          l.week_number
        ),
        day: ce(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          l.day
        ),
        range_start: ce(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: ce("rounded-none", l.range_middle),
        range_end: ce("rounded-r-md bg-accent", l.range_end),
        today: ce(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          l.today
        ),
        outside: ce(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: ce(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: ce("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: c, rootRef: d, ...u }) => /* @__PURE__ */ h(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: ce(c),
            ...u
          }
        ),
        Chevron: ({ className: c, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ h(Ef, { className: ce("size-4", c), ...u }) : d === "right" ? /* @__PURE__ */ h(
          Mf,
          {
            className: ce("size-4", c),
            ...u
          }
        ) : /* @__PURE__ */ h(Tf, { className: ce("size-4", c), ...u }),
        DayButton: Kk,
        WeekNumber: ({ children: c, ...d }) => /* @__PURE__ */ h("td", { ...d, children: /* @__PURE__ */ h("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: c }) }),
        ...i
      },
      ...a
    }
  );
}
function Kk({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ma(), s = S.useRef(null);
  return S.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ h(
    on,
    {
      ref: s,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: ce(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let Mn = null;
const du = /* @__PURE__ */ new Map(), Gk = /* @__PURE__ */ new Map();
function to() {
  if (!Mn) return;
  const e = Mn;
  Mn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function qk(e) {
  return Mn?.pillDate === e;
}
function Xk({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = j(null), i = Io(e);
  V(() => {
    const v = (w) => {
      w.key === "Escape" && (w.stopPropagation(), w.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), V(() => {
    const v = (T) => {
      s.current && !s.current.contains(T.target) && (T.target.closest(".date-pill") || o());
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const a = z((v) => {
    v && r(Sn(v)), o();
  }, [r, o]), l = z((v) => {
    const w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + v), r(Sn(w)), o();
  }, [r, o]), c = z(() => {
    const w = (/* @__PURE__ */ new Date()).getDay(), T = w === 0 ? 1 : 8 - w, k = /* @__PURE__ */ new Date();
    k.setDate(k.getDate() + T), r(Sn(k)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), f = new Date(d);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), g = d.getDay(), m = g === 0 ? 1 : 8 - g, y = new Date(d);
  y.setDate(y.getDate() + m);
  const b = y.toDateString();
  return /* @__PURE__ */ R(
    "div",
    {
      ref: s,
      className: ce("date-picker-portal", t === "dark" ? "dark" : ""),
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
        /* @__PURE__ */ h("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ R("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ h("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ h(
            Vk,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ h("div", { className: "border-t border-border" }),
          /* @__PURE__ */ R("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ h(
              on,
              {
                variant: "outline",
                size: "sm",
                className: ce(
                  "rounded-full text-xs",
                  i.toDateString() === u && "ring-2 ring-primary"
                ),
                onClick: () => l(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ h(
              on,
              {
                variant: "outline",
                size: "sm",
                className: ce(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => l(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ h(
              on,
              {
                variant: "outline",
                size: "sm",
                className: ce(
                  "rounded-full text-xs",
                  i.toDateString() === b && "ring-2 ring-primary"
                ),
                onClick: c,
                children: "Next Monday"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function Zk(e, t, n) {
  if (qk(t)) {
    to();
    return;
  }
  to();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, l = 10, c = 16, d = s - r.bottom - l - c, u = r.top - l - c, f = d >= a ? "below" : u >= a ? "above" : d >= u ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + l : p = r.top - a - l;
  const g = r.left + r.width / 2;
  let m = g - i / 2;
  m + i > o - c && (m = o - i - c), m < c && (m = c);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((k) => {
    y.addEventListener(k, (E) => {
      E.stopPropagation();
    }, !1);
  });
  const v = kp(y);
  Mn = { container: y, root: v, pillDate: t };
  const w = () => {
    to();
  }, T = (k) => {
    const E = du.get(t);
    E && E(k);
  };
  v.render(
    /* @__PURE__ */ h(
      Xk,
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
function Qk({ node: e, updateAttributes: t, selected: n }) {
  const r = j(null), o = e.attrs.date || Tn(), s = uu(o), i = Ta(o), a = z(() => {
    if (!r.current) return "";
    const l = r.current.closest(".markdown-editor-container");
    if (l) {
      const d = l.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return V(() => (du.set(o, (l) => {
    t({ date: l });
  }), Gk.set(o, a), () => {
  }), [o, t, a]), V(() => {
    const l = r.current;
    if (!l) return;
    const c = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = l.getAttribute("data-date") || Tn(), f = a();
      Zk(l, u, f);
    };
    return l.addEventListener("click", c), () => l.removeEventListener("click", c);
  }, [a]), V(() => {
    const l = r.current?.closest(".ProseMirror") || document, c = () => {
      Mn && to();
    };
    return l.addEventListener("scroll", c, { passive: !0 }), () => {
      l.removeEventListener("scroll", c);
    };
  }, []), /* @__PURE__ */ h(no, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ h(Sl, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ h("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Io(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function Tn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Qn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function Sn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function uu(e) {
  const t = Io(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  o.setDate(o.getDate() + 1);
  const s = new Date(r);
  s.setDate(s.getDate() - 1);
  const i = r.getDay(), a = i === 0 ? 1 : 8 - i, l = new Date(r);
  if (l.setDate(l.getDate() + a), t.getTime() === r.getTime()) return "Today";
  if (t.getTime() === o.getTime()) return "Tomorrow";
  if (t.getTime() === s.getTime()) return "Yesterday";
  if (t.getTime() === l.getTime()) return "Next Monday";
  const c = { month: "short", day: "numeric" };
  return t.getFullYear() !== r.getFullYear() && (c.year = "numeric"), t.toLocaleDateString("en-US", c);
}
function Jk(e) {
  return Io(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function en(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return Tn();
  if (n === "tomorrow") return Qn(1);
  if (n === "yesterday") return Qn(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), l = a === 0 ? 1 : 8 - a;
    return Qn(l);
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
      const l = parseInt(r[2], 10), c = r[3] ? parseInt(r[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), d = new Date(c, a, l);
      return Sn(d);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return Sn(i);
  }
  return null;
}
function Ta(e) {
  const t = Io(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const ex = new Ie("datePillPaste"), tx = bo.create({
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
        default: Tn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = uu(n), o = Ta(n);
    return [
      "span",
      Pn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return vl(Qk, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || Tn();
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
    const e = new Fe({
      find: /@today\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Tn()).run();
      }
    }), t = new Fe({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Qn(1)).run();
      }
    }), n = new Fe({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Qn(-1)).run();
      }
    }), r = new Fe({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), o = new Fe({
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
          u().deleteRange(d).insertDatePill(Sn(y)).run();
        }
      }
    }), s = new Fe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = en(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), i = new Fe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = en(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), a = new Fe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), l = new Fe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = en(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), c = new Fe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = en(f[1]);
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
      l,
      c
    ];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new Re({
        key: ex,
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain"), s = r.getData("text/html");
            if (s && s.includes('data-type="date-pill"')) return !1;
            const i = /@([^@\n]+)@/g;
            let a = !1, l;
            const c = new RegExp(i.source, i.flags);
            for (; (l = c.exec(o)) !== null; )
              if (en(l[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const m = new RegExp(i.source, i.flags);
            let y;
            for (; (y = m.exec(o)) !== null; ) {
              const T = y[1], k = en(T);
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
}), nt = /* @__PURE__ */ new Map();
function nx({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = j(null), i = j(null), a = e.attrs.tag || "", l = j(!1), [c, d] = Y(() => nt.has(a)), [u, f] = Y(() => nt.get(a)?.value ?? a);
  V(() => {
    c || f(a);
  }, [a, c]), V(() => {
    if (c) {
      const v = nt.get(a);
      nt.set(a, {
        value: u,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [c, u, a]);
  const p = z((v) => {
    if (l.current) return;
    l.current = !0;
    const w = v.trim().replace(/^#/, ""), T = Jn(w);
    if (nt.delete(a), T && nt.delete(T), !T || !kn(T))
      o();
    else if (T !== a) {
      const k = r();
      if (typeof k == "number" && n) {
        const { tr: E } = n.state, M = e.nodeSize;
        E.delete(k, k + M), E.insert(k, n.schema.nodes.tagPill.create({ tag: T })), n.view.dispatch(E);
      }
    } else
      nt.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), g = z(() => {
    n && !n.isEditable || (nt.set(a, { value: a, focusedAt: Date.now() }), f(a), d(!0), l.current = !1);
  }, [n, a]);
  V(() => {
    const v = s.current;
    if (!v || c) return;
    const w = (k) => {
      k.preventDefault(), k.stopPropagation(), g();
    }, T = (k) => {
      k.preventDefault(), k.stopPropagation();
    };
    return v.addEventListener("dblclick", w), v.addEventListener("click", T), () => {
      v.removeEventListener("dblclick", w), v.removeEventListener("click", T);
    };
  }, [c, n, r, g]), V(() => {
    if (c) {
      const v = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const w = nt.get(a);
          w && (w.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [c, a]);
  const m = z((v) => {
    v.key === "Enter" ? (v.preventDefault(), p(u)) : v.key === "Escape" && (v.preventDefault(), nt.delete(a), d(!1), l.current = !0, n?.commands.focus());
  }, [p, u, a, n]), y = z(() => {
    const w = nt.get(a)?.focusedAt ?? 0;
    Date.now() - w > 300 && p(u);
  }, [p, u, a]), b = z((v) => {
    f(v.target.value);
  }, []);
  return c ? /* @__PURE__ */ h(no, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ h(qa, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
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
  ) }) : /* @__PURE__ */ h(no, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ h(qa, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ h("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function kn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Jn(e) {
  return e.toLowerCase().trim();
}
const rx = new Ie("tagPillPaste"), ox = bo.create({
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
      Pn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return vl(nx, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Jn(e);
        return kn(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new Fe({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = Jn(r[1]);
        if (kn(o)) {
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
        key: rx,
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain"), s = r.getData("text/html");
            if (s && s.includes('data-type="tag-pill"')) return !1;
            const i = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let a = !1, l;
            const c = new RegExp(i.source, i.flags);
            for (; (l = c.exec(o)) !== null; )
              if (kn(l[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const m = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = m.exec(o)) !== null; ) {
              const w = Jn(y[1]);
              if (kn(w)) {
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
}), sx = /\[\[([^\[\]]+)\]\]$/, ax = Pl.create({
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
      Pn(
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
      new Fe({
        find: sx,
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
}), kt = {
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
}, ix = ["info", "note", "prompt", "resources", "todo", "summary"];
function lx(e) {
  return e.length < 3 ? !1 : !!(kt.header.test(e) || kt.bold.test(e) || kt.list.test(e) || kt.taskList.test(e) || kt.codeBlock.test(e) || kt.callout.test(e) || kt.highlight.test(e) || kt.link.test(e) || kt.table.test(e));
}
function cx(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function dx(e, t) {
  const { alt: n, align: r, width: o } = cx(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
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
function Xi(e) {
  if (!/!\[(?:[^\[\]]|\[[^\]]*\])*\]\([^)]+\)/.test(e)) return `<p>${po(e)}</p>`;
  const n = /(!\[(?:[^\[\]]|\[[^\]]*\])*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)]+)\)$/);
    i ? o.push(dx(i[1], i[2])) : o.push(`<p>${po(s.trim())}</p>`);
  }
  return o.join("");
}
function fu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^[-*+]\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function pu(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const l = e[a]?.type || "ul", c = l === "task", d = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, u = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (c ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${po(f.text)}</p>` : i += `<li><p>${po(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function Zi(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return Xi(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(pu(s)), s = []);
  };
  for (const a of r) {
    const l = fu(a);
    if (l) {
      if (s.length > 0) {
        const c = s[0].type;
        l.depth === 0 && l.type !== c && i();
      }
      s.push(l);
    } else
      i(), o.push(Xi(a.trim()));
  }
  return i(), o.join("");
}
function ux(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + Zi(a) + "</th>";
  i += "</tr></thead><tbody>";
  for (const a of s) {
    if (!a.trim()) continue;
    const l = a.split("|"), c = [];
    for (let d = 0; d < l.length; d++) {
      const u = l[d].trim();
      d === 0 && u === "" && a.trim().startsWith("|") || d === l.length - 1 && u === "" && a.trim().endsWith("|") || c.push(u);
    }
    if (c.length !== 0) {
      i += "<tr>";
      for (let d = 0; d < r.length; d++) {
        const u = c[d] || "";
        i += "<td>" + Zi(u) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function fx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (f) => {
    const p = f.split(`
`);
    if (p.length >= 2) {
      const g = p[1];
      if (/^\|?[\s\-:|]+\|?$/.test(g) && g.includes("-")) {
        const m = ux(f);
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
  }), ix.forEach((f) => {
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
  const l = () => {
    a.length !== 0 && (i.push(pu(a)), a = []);
  };
  for (const f of s) {
    const p = fu(f);
    if (p) {
      if (a.length > 0) {
        const m = a[0].type, y = Math.min(...a.map((b) => b.depth));
        p.depth === y && p.type !== m && l();
      }
      a.push(p);
      continue;
    }
    l();
    let g = f;
    g = g.replace(/^(#{1,6})\s+(.+)$/, (m, y, b) => {
      const v = y.length;
      return `<h${v}>${b}</h${v}>`;
    }), g = g.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), g = g.replace(/^[-*_]{3,}$/, "<hr>"), i.push(g);
  }
  l(), t = i.join(`
`);
  const c = [];
  t = t.replace(/!\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)]+)\)/g, (f, p, g) => {
    const m = p.split("|").map((E) => E.trim());
    let y = "", b = "left", v = null;
    m.length === 1 ? y = m[0] : m.length === 2 ? (y = m[0], /^\d+$/.test(m[1]) ? v = m[1] : ["left", "center", "right"].includes(m[1]) ? b = m[1] : y = p) : m.length === 3 ? (y = m[0], ["left", "center", "right"].includes(m[1]) && (b = m[1]), /^\d+$/.test(m[2]) && (v = m[2])) : y = p;
    const w = v ? ` width="${v}" style="width: ${v}px"` : "", T = `<img src="${g.trim()}" alt="${y}" data-align="${b}"${w}>`, k = `MANUSLINKPLACEHOLDER${c.length}END`;
    return c.push(T), k;
  }), t = t.replace(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\(([^)]+)\)/g, (f, p, g) => {
    const m = `<a href="${g}">${p}</a>`, y = `MANUSLINKPLACEHOLDER${c.length}END`;
    return c.push(m), y;
  }), t = t.replace(/<a\s[^>]*>.*?<\/a>/g, (f) => {
    const p = `MANUSLINKPLACEHOLDER${c.length}END`;
    return c.push(f), p;
  }), t = t.replace(/<img\s[^>]*\/?>/g, (f) => {
    const p = `MANUSLINKPLACEHOLDER${c.length}END`;
    return c.push(f), p;
  }), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>");
  for (let f = 0; f < c.length; f++)
    t = t.replace(`MANUSLINKPLACEHOLDER${f}END`, c[f]);
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
const px = Ue.create({
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
            if (!i || !lx(i))
              return !1;
            n.preventDefault();
            const a = fx(i);
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
}), Qi = new Ie("collapsibleHeading");
function hu(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function _s(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), l = `h${i}-${a}`, c = r.get(l) ?? 0;
      r.set(l, c + 1), n.set(s, hu(i, a, c));
    }
  }), n;
}
function Yr(e, t, n, r) {
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
  const l = [];
  for (const d of a)
    if (l.length === 0)
      l.push(d);
    else {
      const u = l[l.length - 1];
      d.start <= u.end ? u.end = Math.max(u.end, d.end) : l.push(d);
    }
  function c(d) {
    for (const u of l)
      if (d >= u.start && d < u.end) return !0;
    return !1;
  }
  return e.descendants((d, u) => {
    if (d.type.name === "heading" && n.levels.includes(d.attrs.level)) {
      const f = s.get(u) ?? "", p = t.collapsedHeadings.has(f), g = c(u);
      o.push(
        ot.node(u, u + d.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${d.attrs.level} ${p ? "is-collapsed" : "is-expanded"}${g ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": f,
          "data-heading-level": String(d.attrs.level)
        })
      );
      const m = ot.widget(u + d.nodeSize - 1, () => {
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
    } else d.isBlock && c(u) && o.push(
      ot.node(u, u + d.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Je.create(e, o);
}
function Ji(e, t) {
  const n = [];
  return e.descendants((r) => {
    r.type.name === "heading" && t.includes(r.attrs.level) && n.push(`${r.attrs.level}:${r.textContent.slice(0, 50)}`);
  }), n.join("|");
}
function hx(e, t, n, r) {
  const o = [], s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  e.descendants((c) => {
    if (c.type.name === "heading" && n.includes(c.attrs.level)) {
      const d = c.attrs.level, u = c.textContent.slice(0, 50);
      o.push(`${d}:${u}`);
      const f = `h${d}-${u}`, p = i.get(f) ?? 0;
      i.set(f, p + 1), s.add(hu(d, u, p));
    }
  });
  const a = o.join("|"), l = a !== r;
  if (t.collapsedHeadings.size > 0) {
    const c = [];
    t.collapsedHeadings.forEach((d) => {
      s.has(d) || c.push(d);
    });
    for (const d of c)
      t.collapsedHeadings.delete(d);
  }
  return { structureChanged: l, newFingerprint: a };
}
const mx = Ue.create({
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
      new Re({
        key: Qi,
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
              decorations: Yr(o.doc, e, t, n),
              docVersion: 0,
              headingFingerprint: Ji(o.doc, t.levels)
            };
          },
          apply(r, o, s, i) {
            if (r.getMeta("collapsibleHeading"))
              return {
                collapsedHeadings: new Set(e.collapsedHeadings),
                decorations: Yr(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                headingFingerprint: Ji(i.doc, t.levels)
              };
            if (r.docChanged) {
              const { structureChanged: l, newFingerprint: c } = hx(
                i.doc,
                e,
                t.levels,
                o.headingFingerprint
              );
              return l ? {
                collapsedHeadings: new Set(e.collapsedHeadings),
                decorations: Yr(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                headingFingerprint: c
              } : {
                ...o,
                headingFingerprint: c,
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
            const o = Qi.getState(r);
            return o?.decorations ? o.decorations : Yr(r.doc, e, t, n);
          }
        }
      })
    ];
  }
}), gx = /\[((?:[^\[\]]|\[[^\]]*\])+)\]\(([^)]+)\)$/, yx = /^(https?:\/\/|www\.)[^\s]+$/i, vx = Ue.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Fe({
        find: gx,
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
            if (!yx.test(s)) return !1;
            const { state: i } = t, { selection: a } = i, { from: l, to: c, empty: d } = a;
            let u = s;
            if (!u.startsWith("http://") && !u.startsWith("https://") && (u.startsWith("www."), u = "https://" + u), !d && i.doc.textBetween(l, c))
              return e.chain().focus().extendMarkRange("link").setLink({ href: u }).run(), !0;
            const f = i.schema.marks.link.create({ href: u }), p = i.tr;
            return p.insertText(u, l, c), p.addMark(l, l + u.length, f), t.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), bx = Ue.create({
  name: "calloutInputRule"
  // No plugins — logic moved to InputDispatcher
}), Vr = new Ie("searchHighlight"), wx = Ue.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Vr, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Vr, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Re({
        key: Vr,
        state: {
          init() {
            return Je.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: l } = e, c = t.getMeta(Vr), d = t.docChanged;
            if (!s)
              return Je.empty;
            if (!d && !c)
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
                    const b = m + y.index, v = m + y.index + y[0].length, w = f === l;
                    u.push(
                      ot.inline(b, v, {
                        class: w ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return Je.empty;
            }
            return Je.create(o.doc, u);
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
}), kx = Ue.create({
  name: "tabIndent"
  // No plugins — logic moved to InputDispatcher
}), xx = new Ie("inputDispatcher"), Cx = ["info", "note", "prompt", "resources", "todo"];
function Ex(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n >= 0; n--) {
    const r = t.node(n);
    if (r.type.name === "taskItem") return "taskItem";
    if (r.type.name === "listItem") return "listItem";
  }
  return null;
}
function el(e, t) {
  const { $from: n } = e.selection, r = e.schema.nodes.orderedList, o = e.schema.nodes.bulletList;
  if (!r || !o) return !1;
  for (let s = n.depth; s >= 0; s--) {
    const i = n.node(s);
    if (i.type === r) {
      if (s >= 2) {
        const a = n.node(s - 1);
        if (a.type.name === "listItem" || a.type.name === "taskItem") {
          if (t) {
            const l = n.before(s), c = e.tr.setNodeMarkup(l, o, i.attrs);
            t(c);
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
const Mx = Ue.create({
  name: "inputDispatcher",
  // Higher priority to ensure Tab handling runs before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Re({
        key: xx,
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
            ), c = /^\s*(-\s*)?\[([( |x])?\]$/.exec(a);
            if (!c) return !1;
            const d = s.schema.nodes.taskItem, u = s.schema.nodes.taskList;
            if (!d || !u) return !1;
            const f = c[2] === "x", p = i.start() + (c.index || 0), g = n, m = s.tr;
            m.delete(p, g);
            const b = m.doc.resolve(p).blockRange();
            if (!b) return !1;
            const v = [
              { type: u, attrs: {} },
              { type: d, attrs: { checked: f } }
            ];
            if (m.wrap(b, v), p > 1) {
              const w = m.doc.resolve(p - 1).nodeBefore;
              w && w.type === u && mp(m.doc, p - 1) && m.join(p - 1);
            }
            return t.dispatch(m), !0;
          },
          // ─── Consolidated handleKeyDown ─────────────────────────────
          // Replaces TabIndent, CalloutInputRule, and CodeBlockEnterShortcut plugins.
          // Runs once per key press instead of through multiple plugins.
          handleKeyDown(t, n) {
            if (n.key === "Tab") {
              const { state: r, dispatch: o } = t, s = Ex(r);
              if (!s)
                return n.preventDefault(), !0;
              n.preventDefault();
              const i = r.schema.nodes[s];
              if (!i) return !0;
              if (n.shiftKey) {
                if (!Za(i)(r, o)) {
                  const c = s === "taskItem" ? "listItem" : "taskItem", d = r.schema.nodes[c];
                  d && Za(d)(r, o);
                }
              } else if (Qa(i)(r, o))
                el(t.state, o);
              else {
                const c = s === "taskItem" ? "listItem" : "taskItem", d = r.schema.nodes[c];
                d && Qa(d)(r, o) && el(t.state, o);
              }
              return !0;
            }
            if (n.key === "Enter") {
              const { state: r } = t, { $from: o } = r.selection, s = o.start(), i = r.doc.textBetween(s, o.pos, ""), a = i.trim();
              for (const c of Cx)
                if (a === `\`\`\`${c}`) {
                  n.preventDefault();
                  const d = r.tr, u = s + i.indexOf("```");
                  d.delete(u, o.pos);
                  const f = e.schema.nodes.callout, p = e.schema.nodes.paragraph;
                  if (f && p) {
                    const g = p.create(), m = f.create({ type: c }, Il.from(g));
                    d.insert(u, m);
                    const y = d.doc.resolve(u + 2);
                    d.setSelection(et.near(y)), t.dispatch(d);
                  }
                  return !0;
                }
              const { empty: l } = r.selection;
              if (l && !o.parent.type.spec.code) {
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
                    g.setSelection(et.create(g.doc, w)), t.dispatch(g);
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
}), Tx = new Ie("expandSelection");
function hs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const Sx = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), mu = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), Nx = "tableRow", Dx = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function Lx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
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
    if (Dx.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Rx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === Nx) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Ix(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (mu.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Px(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const l = r.node(a);
    Sx.has(l.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function Ox(e) {
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
function _x(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function $x(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Hx(e, t, n) {
  let r = !1;
  return e.nodesBetween(t, n, (o) => mu.has(o.type.name) ? (r = !0, !1) : !0), r;
}
function Bx(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (l) => l && (l.from < o || l.to > s) ? (r.push(l), o = l.from, s = l.to, !0) : !1;
  i(Lx(e, o, s)), $x(e, t) && (i(Ax(e, o, s)), i(Rx(e, o, s))), i(Px(e, o, s)), i(Ix(e, o, s));
  const a = Ox(e);
  if (a.length > 0) {
    const l = _x(a, o, s);
    for (const c of l)
      Hx(e, c.from, c.to) ? c.from === 0 && c.to === e.content.size ? i({ from: 0, to: e.content.size, useSelectAll: !0 }) : i({ from: c.from, to: c.to, useSelectAll: !0 }) : i({ from: c.from, to: c.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size, useSelectAll: !0 }), r;
}
const Wx = Ue.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof ep || o === 0 && s === n.content.size)
          return !0;
        const a = Bx(n, o, s);
        let l = null;
        for (const c of a)
          if (c.from < o || c.to > s) {
            l = c;
            break;
          }
        if (l) {
          if (t.isExpanding = !0, l.from === 0 && l.to === n.content.size)
            e.commands.selectAll(), t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size;
          else if (l.useSelectAll)
            try {
              const c = n.resolve(l.from), d = n.resolve(l.to), u = e.state.tr, f = et.between(c, d);
              e.view.dispatch(u.setSelection(f).scrollIntoView());
              const p = e.state.selection;
              t.lastExpandedFrom = p.from, t.lastExpandedTo = p.to;
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
      new Re({
        key: Tx,
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
}), zx = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Fx(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Ux = new Ie("hexColorDecoration");
function gu(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const l = new RegExp(zx.source, "g");
    for (; (a = l.exec(i)) !== null; ) {
      const c = s + a.index, d = c + a[0].length;
      if (d >= t && c <= n) {
        const u = a[0], f = Fx(u);
        r.push(
          ot.inline(c, d, {
            class: "hex-color-swatch",
            style: `background-color: ${u}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function jx(e) {
  const t = gu(e, 0, e.content.size);
  return Je.create(e, t);
}
const Yx = Pl.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Re({
        key: Ux,
        state: {
          init(e, { doc: t }) {
            return jx(t);
          },
          apply(e, t) {
            if (!e.docChanged)
              return t;
            let n = t.map(e.mapping, e.doc);
            const r = [];
            if (e.mapping.maps.forEach((s, i) => {
              s.forEach((a, l, c, d) => {
                const u = Math.max(0, c - 10), f = Math.min(e.doc.content.size, d + 10);
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
              const i = gu(e.doc, s.from, s.to);
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
}), Ae = new Ie("selectAllOccurrences");
function tl(e, t, n, r, o) {
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
  return e.descendants((a, l) => {
    if (a.isText && a.text) {
      let c;
      for (; (c = i.exec(a.text)) !== null; )
        s.push({
          from: l + c.index,
          to: l + c.index + c[0].length,
          text: c[0]
        });
    }
    return !0;
  }), s;
}
function Ht(e, t) {
  const n = Ae.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function Vx(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Se(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Kx = Ue.create({
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
        const l = tl(t.state.doc, o, s, i, a);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Ae, { activate: !0 })), !0);
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
          const l = tl(o.doc, a, !1, !1, !1);
          if (l.length === 0) return !1;
          const c = Vx(l, s), d = l[c];
          return r.isActive = !0, r.ranges = [d], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = l, r.nextMatchIndex = (c + 1) % l.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Ae, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Ae, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Se(this.storage), t && t(e.setMeta(Ae, { deactivate: !0 })), !0),
      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       * All changes are in a single transaction for proper undo/redo.
       */
      toggleMarkOnAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: r }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        const o = t.schema.marks[e];
        if (!o) return !1;
        const { ranges: s } = this.storage, i = s.every((a) => {
          let l = !0;
          return t.state.doc.nodesBetween(a.from, a.to, (c) => {
            c.isText && !o.isInSet(c.marks) && (l = !1);
          }), l;
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
              const l = Ht(a, this.storage);
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
          const r = [...this.storage.ranges].sort((o, s) => s.from - o.from);
          for (const o of r)
            t.delete(o.from, o.to);
          n(t);
        }
        return Se(this.storage), !0;
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
              const s = Ht(o, this.storage);
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
      new Re({
        key: Ae,
        state: {
          init() {
            return Je.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Ae);
            if (s?.deactivate || !e.isActive)
              return Je.empty;
            if (s?.activate || s?.refresh) {
              const i = [];
              for (const a of e.ranges) {
                i.push(
                  ot.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), i.push(
                  ot.widget(a.to, l, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return Je.create(o.doc, i);
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
              Se(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Ae, { deactivate: !0 }));
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
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), xp(t.state, t.dispatch), setTimeout(() => {
                  const s = Ht(t);
                  e.ranges = s, s.length === 0 && Se(e);
                }, 10), !0;
              }
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, Cp(t.state, t.dispatch), setTimeout(() => {
                  const s = Ht(t);
                  e.ranges = s, s.length === 0 && Se(e);
                }, 10), !0;
              }
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Ht(t);
                if (r.length === 0) {
                  Se(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Ae, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, l) => l.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Ht(t);
                  e.ranges = a, a.length === 0 && Se(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Se(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Ae, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), Se(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Ae, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
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
            const s = Ht(t);
            if (s.length === 0) {
              Se(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Ae, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((l, c) => c.from - l.from), { tr: a } = t.state;
            for (const l of i)
              a.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const l = Ht(t);
              e.ranges = l, l.length === 0 && Se(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
}), Gx = new Ie("linkBoundary"), qx = Ue.create({
  name: "linkBoundary",
  addProseMirrorPlugins() {
    return [
      new Re({
        key: Gx,
        appendTransaction(e, t, n) {
          const { selection: r, schema: o } = n, s = o.marks.link;
          if (!s || !r.empty) return null;
          const { $from: i } = r;
          if (i.parentOffset !== 0 || !i.parent.isTextblock) return null;
          const a = i.parent.firstChild;
          if (!a || !a.isText || !s.isInSet(a.marks)) return null;
          const c = n.storedMarks || i.marks(), d = c.filter(
            (p) => p.type !== s
          );
          if (!c.some(
            (p) => p.type === s
          )) return null;
          const { tr: f } = n;
          return f.setStoredMarks(d), f;
        }
      })
    ];
  }
}), Xx = new Ie("smartCopyPaste"), yu = /* @__PURE__ */ new Set(["codeBlock", "callout"]);
function nl(e) {
  const { state: t } = e, { selection: n } = t, { $from: r, $to: o } = n;
  for (let s = r.depth; s > 0; s--) {
    const i = r.node(s);
    if (!yu.has(i.type.name)) continue;
    const a = r.start(s), l = r.end(s), c = o.depth;
    let d = !1;
    for (let g = c; g > 0; g--)
      if (o.start(g) === a && o.node(g) === i) {
        d = !0;
        break;
      }
    if (!d)
      return { isFullContainer: !1, containerType: null };
    const u = n.from, f = n.to;
    let p;
    if (i.type.name === "codeBlock")
      p = u <= a && f >= l;
    else {
      const g = i.firstChild, m = i.lastChild;
      !g || !m ? p = !1 : p = u <= a + 1 && f >= l - 1;
    }
    return {
      isFullContainer: p,
      containerType: i.type.name
    };
  }
  return { isFullContainer: !1, containerType: null };
}
const Zx = Ue.create({
  name: "smartCopyPaste",
  addProseMirrorPlugins() {
    const e = this.editor;
    let t = {
      isFullContainer: !1,
      containerType: null
    };
    return [
      new Re({
        key: Xx,
        props: {
          handleDOMEvents: {
            // Analyze the selection right before copy/cut happens
            copy(n) {
              return t = nl(n), !1;
            },
            cut(n) {
              return t = nl(n), !1;
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
            const l = s.firstChild;
            if (!l || !yu.has(l.type.name))
              return n;
            if (r === "codeBlock") {
              const c = e.schema, d = c.nodes.paragraph;
              if (!d) {
                const m = l.content;
                return new Yo(m, Math.max(0, i - 1), Math.max(0, a - 1));
              }
              let u = "";
              l.content.forEach((m) => {
                u += m.text || "";
              });
              const f = u.split(`
`);
              f.length > 1 && f[f.length - 1] === "" && f.pop();
              const p = f.map((m) => m === "" ? d.create() : d.create(null, c.text(m))), g = Il.from(p);
              return new Yo(g, 0, 0);
            } else {
              const c = l.content, d = Math.max(0, i - 1), u = Math.max(0, a - 1);
              return new Yo(c, d, u);
            }
          }
        }
      })
    ];
  }
});
function Qx() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Jx(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let l = 0; l < i.length; l++)
    a[l] = i.charCodeAt(l);
  return new File([a], t, { type: s });
}
function eC(e) {
  return new Promise((t) => {
    const n = URL.createObjectURL(e), r = new window.Image();
    r.onload = () => {
      URL.revokeObjectURL(n), t({ width: r.width, height: r.height });
    }, r.onerror = () => {
      URL.revokeObjectURL(n), t({ width: 400, height: 300 });
    }, r.src = n;
  });
}
function tC(e, t) {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${t}'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E`;
}
function nC(e, t) {
  return t.includes(e.type);
}
async function rC(e, t, n) {
  return new Promise((r, o) => {
    const s = new window.Image(), i = new FileReader();
    i.onload = (a) => {
      s.src = a.target?.result;
    }, i.onerror = () => o(new Error("Failed to read file")), s.onload = () => {
      let a = s.width, l = s.height;
      if (a > t) {
        const y = t / a;
        a = t, l = Math.round(l * y);
      }
      const c = document.createElement("canvas");
      c.width = a, c.height = l;
      const d = c.getContext("2d");
      if (!d) {
        o(new Error("Failed to get canvas context"));
        return;
      }
      d.imageSmoothingEnabled = !0, d.imageSmoothingQuality = "high", d.drawImage(s, 0, 0, a, l);
      const u = e.type === "image/png" || e.type === "image/gif", f = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, g = c.toDataURL(f, p), m = Jx(g, e.name);
      r({ dataUrl: g, file: m, width: a, height: l });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function oC(e, t, n) {
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
async function rl(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!nC(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const s = (n.maxFileSize / 1048576).toFixed(1), i = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${i}MB. Maximum size: ${s}MB`), !1;
  }
  const r = Qx(), o = `placeholder://${r}`;
  try {
    n.onUploadStart?.();
    const s = await eC(e), a = Math.min(s.width, 600), l = Math.round(s.height * (a / s.width)), c = tC(a, l), { doc: d } = t.view.state;
    d.content.size === 0 || d.childCount === 1 && d.firstChild?.isTextblock && d.firstChild.content.size === 0 ? t.chain().focus().insertContent({
      type: "resizableImage",
      attrs: {
        src: c,
        alt: o,
        width: a
      }
    }).run() : t.chain().focus().setImage({
      src: c,
      alt: o,
      width: a
    }).run();
    let f;
    const p = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    n.enableCompression && p ? f = (await rC(
      e,
      n.maxCompressedWidth,
      n.compressionQuality
    )).file : f = e;
    try {
      const g = await n.onImageUpload(f, {
        fileName: e.name,
        mimeType: f.type,
        fileSize: f.size,
        uploadId: r
      });
      let m = !1;
      return t.view.state.doc.descendants((y, b) => {
        if (m) return !1;
        if (y.type.name === "resizableImage" && y.attrs.alt === o) {
          try {
            const { state: v, dispatch: w } = t.view, T = v.doc.nodeAt(b);
            if (T) {
              const k = v.tr.setNodeMarkup(b, void 0, {
                ...T.attrs,
                src: g,
                alt: e.name
              });
              w(k);
            }
          } catch (v) {
            console.warn("Failed to replace placeholder with uploaded reference:", v);
          }
          return m = !0, !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (g) {
      return console.warn("Image upload failed, removing placeholder:", g), oC(t, c, o), n.onUploadError?.(`Upload failed: ${g instanceof Error ? g.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (s) {
    try {
      t.view.state.doc.descendants((i, a) => {
        if (i.type.name === "resizableImage" && i.attrs.alt === o) {
          try {
            const { state: l, dispatch: c } = t.view, d = l.tr.delete(a, a + i.nodeSize);
            c(d);
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
function ol(e) {
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
const sC = Ue.create({
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
            const s = ol(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              rl(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = ol(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const l = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (l) {
              const c = n.state.tr.setSelection(
                et.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(c);
            }
            return a.forEach((c) => {
              rl(c, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function aC({
  placeholder: e,
  isMobile: t,
  maxImageSize: n,
  headingLevels: r,
  collapsibleHeadingLevels: o,
  disabledFeatures: s,
  progressiveSelectAll: i,
  enableCollapsibleHeadings: a,
  enableCollapsibleLists: l,
  enableTagAutoDetect: c,
  enableHexColorHighlight: d,
  isLightweight: u,
  setImageEditState: f,
  callbackRefs: p
}) {
  return zt(() => {
    const g = [
      tp.configure({
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
      Tp.configure({ HTMLAttributes: { class: "font-bold" } }).extend({ keepOnSplit: !1 }),
      Sp.configure({ HTMLAttributes: { class: "italic" } }).extend({ keepOnSplit: !1 }),
      Np.configure({}).extend({ keepOnSplit: !1 }),
      Mp.configure({}).extend({ keepOnSplit: !1 }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      Tb,
      Sb,
      Lb,
      np.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      rp.configure({
        types: ["heading", "paragraph"]
      }),
      op.configure({
        multicolor: !0
      }),
      sp.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      // Prevent typed text from being absorbed into a link mark at the start of a textblock
      qx,
      // Smart copy-paste: partial selection inside code block/callout unwraps the container
      Zx,
      gp,
      yp,
      vp,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [bp],
      vx,
      wx,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [Kx],
      kx,
      Mx,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      Ep.extend({
        addInputRules() {
          const m = this.type;
          return [
            new Fe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: y, range: b }) => {
                const { tr: v } = y, w = b.from, T = b.to;
                v.delete(w, T);
                const k = v.doc.resolve(w), E = m.create(), M = k.before(k.depth), x = k.after(k.depth);
                v.replaceWith(M, x, E);
                const D = M + E.nodeSize;
                if (D < v.doc.content.size) {
                  const C = v.doc.resolve(D);
                  C.nodeAfter && C.nodeAfter.isTextblock ? v.setSelection(et.create(v.doc, D + 1)) : C.nodeAfter && v.setSelection(et.near(v.doc.resolve(D)));
                } else {
                  const N = y.schema.nodes.paragraph.create();
                  v.insert(D, N), v.setSelection(et.create(v.doc, D + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || g.push(
      ap.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      ip,
      yb,
      vb,
      ...u ? [] : [Mb]
    ), s.taskLists || g.push(
      Nb.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Db.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), l && !t && !u && g.push(
      Rb.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || g.push(_p), s.callouts || g.push(Fb, bx), a && !s.collapsibleHeadings && !u && g.push(
      mx.configure({
        levels: o
      })
    ), s.images || g.push(
      Ub.configure({
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
      sC.configure({
        maxFileSize: n,
        onUploadStart: (...m) => p.onImageUploadStart.current?.(...m),
        onUploadComplete: (...m) => p.onImageUploadComplete.current?.(...m),
        onUploadError: (...m) => p.onImageUploadError.current?.(...m),
        onImageUpload: (m, y) => p.onImageUpload.current ? p.onImageUpload.current(m, y) : Promise.reject(new Error("Image upload is not available. Please configure an image storage adapter."))
      })
    ), s.datePills || g.push(
      tx.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || g.push(
      ox.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: c
      })
    ), s.wikiLinks || g.push(
      ax.configure({
        onWikiLinkClick: (m) => {
          console.log("WikiLink clicked:", m), p.onWikiLinkClick.current?.(m);
        },
        validateLink: (m) => p.validateWikiLink.current ? p.validateWikiLink.current(m) : !0
      })
    ), i && g.push(Wx), d && !u && g.push(Yx), s.markdownPaste || g.push(
      px.configure({
        enableMarkdownPaste: !0
      })
    ), g;
  }, [e, t, n, r, o, s, i, a, l, c, d, u]);
}
let Et = null, ho = null;
async function vu() {
  if (Et) return Et;
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
      const d = c, u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), m = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", w = m && m > 0;
      return (v || w) && b.push(v ? y : "left"), w && b.push(String(m)), `![${b.join(" | ")}](${u})`;
    }
  }), n.addRule("imageResizer", {
    filter: (l) => l.nodeName === "FIGURE" && l.classList.contains("image-resizer"),
    replacement: (l, c) => {
      const d = c.querySelector("img");
      if (!d) return l;
      const u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), m = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", w = m && m > 0;
      (v || w) && b.push(v ? y : "left"), w && b.push(String(m));
      const T = `![${b.join(" | ")}](${u})`, k = c.parentNode;
      return k && k.nodeName === "LI" ? `
` + T + `
` : `

` + T + `

`;
    }
  }), n.addRule("taskListItem", {
    filter: (l) => l.nodeName === "LI" && l.getAttribute("data-type") === "taskItem",
    replacement: (l, c) => {
      const d = c, u = d.querySelector('input[type="checkbox"]'), f = u?.hasAttribute("checked") || u?.checked || d.getAttribute("data-checked") === "true";
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
      const d = l || "​", u = c.parentNode;
      let f;
      if (u && u.nodeName === "OL") {
        const m = Array.from(u.children).filter((b) => b.nodeName === "LI").indexOf(c);
        f = `${parseInt(u.getAttribute("start") || "1", 10) + m}. `;
      } else
        f = "-   ";
      const p = " ".repeat(f.length);
      return f + d.replace(/\n/gm, `
` + p) + `
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
  function r(l) {
    const c = l.getAttribute("src") || "", u = (l.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = l.getAttribute("width"), p = f ? parseInt(f, 10) : null, g = l.getAttribute("data-align") || "left", m = [u], y = g !== "left", b = p && p > 0;
    return (y || b) && m.push(y ? g : "left"), b && m.push(String(p)), `![${m.join(" \\| ")}](${c})`;
  }
  function o(l) {
    if (l.nodeType === Node.TEXT_NODE)
      return (l.textContent || "").replace(/\|/g, "\\|");
    if (l.nodeType === Node.ELEMENT_NODE) {
      const c = l;
      if (c.nodeName === "IMG") return r(c);
      if (c.nodeName === "BR") return "";
      let d = "";
      for (const u of Array.from(c.childNodes))
        d += o(u);
      if (c.nodeName === "STRONG" || c.nodeName === "B") return `**${d}**`;
      if (c.nodeName === "EM" || c.nodeName === "I") return `*${d}*`;
      if (c.nodeName === "S" || c.nodeName === "DEL") return `~~${d}~~`;
      if (c.nodeName === "CODE") return `\`${d}\``;
      if (c.nodeName === "MARK") return `==${d}==`;
      if (c.nodeName === "A") {
        const u = c.getAttribute("href") || "";
        return `[${d}](${u})`;
      }
      return d;
    }
    return "";
  }
  function s(l) {
    let c = "";
    for (const d of Array.from(l.childNodes))
      if (d.nodeType === Node.ELEMENT_NODE) {
        const u = d, f = u.nodeName;
        if (f === "UL" || f === "OL" || f === "LABEL" || f === "INPUT") continue;
        c += o(u);
      } else
        c += o(d);
    return c.trim();
  }
  function i(l, c, d = 0) {
    const u = "  ".repeat(d), f = l.nodeName, p = Array.from(l.childNodes).filter(
      (m) => m.nodeType === Node.ELEMENT_NODE && m.nodeName === "LI"
    ), g = f === "OL" ? parseInt(l.getAttribute("start") || "1", 10) : 1;
    p.forEach((m, y) => {
      const b = m.getAttribute("data-type") === "taskItem", v = m.getAttribute("data-checked") === "true", w = s(m);
      b ? c.push(`${u}- [${v ? "x" : " "}] ${w}`) : f === "OL" ? c.push(`${u}${g + y}. ${w}`) : c.push(`${u}- ${w}`);
      const T = Array.from(m.childNodes).filter(
        (k) => k.nodeType === Node.ELEMENT_NODE && (k.nodeName === "UL" || k.nodeName === "OL")
      );
      for (const k of T)
        i(k, c, d + 1);
    });
  }
  function a(l) {
    const c = [];
    for (const d of Array.from(l.childNodes)) {
      if (d.nodeType !== Node.ELEMENT_NODE) {
        const g = (d.textContent || "").trim();
        g && c.push(g.replace(/\|/g, "\\|"));
        continue;
      }
      const u = d, f = u.nodeName;
      if (f === "UL" || f === "OL") {
        i(u, c, 0);
        continue;
      }
      if (f === "FIGURE") {
        const g = u.querySelector("img");
        g && c.push(r(g));
        continue;
      }
      if (f === "IMG") {
        c.push(r(u));
        continue;
      }
      const p = o(u).trim();
      p && c.push(p);
    }
    return c.join(" <br> ") || "";
  }
  return n.addRule("table", {
    filter: "table",
    replacement: function(l, c) {
      const d = c, u = Array.from(d.querySelectorAll("tr"));
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
    replacement: function(l) {
      return l;
    }
  }), n.addRule("datePill", {
    filter: (l) => l.nodeName === "SPAN" && l.getAttribute("data-type") === "date-pill",
    replacement: (l, c) => {
      const d = c.getAttribute("data-date");
      return d ? `@${Jk(d)}@` : l;
    }
  }), n.addRule("tagPill", {
    filter: (l) => l.nodeName === "SPAN" && l.getAttribute("data-type") === "tag-pill",
    replacement: (l, c) => {
      const d = c.getAttribute("data-tag");
      return d ? `#${d}` : l;
    }
  }), n.addRule("wikiLink", {
    filter: (l) => l.nodeName === "SPAN" && l.hasAttribute("data-wiki-link"),
    replacement: (l, c) => {
      const d = c.getAttribute("data-page-name");
      return d ? `[[${d}]]` : l;
    }
  }), n.addRule("callout", {
    filter: (l) => l.nodeName === "DIV" && l.hasAttribute("data-callout"),
    replacement: (l, c) => {
      const d = c.getAttribute("data-type") || "info", u = l.trim().replace(/\n{3,}/g, `

`);
      return `

\`\`\`ad-${d}
${u}
\`\`\`

`;
    }
  }), n.addRule("listSeparation", {
    filter: (l) => l.nodeName === "UL" || l.nodeName === "OL",
    replacement: (l, c) => {
      const d = c.parentNode;
      if (d && d.nodeName === "LI")
        return `
` + l.trimEnd() + `
`;
      const f = c.previousElementSibling, p = f && (f.nodeName === "UL" || f.nodeName === "OL");
      return `

` + l.trim() + `

`;
    }
  }), Et = n, n;
}
function iC() {
  !ho && !Et && (ho = vu().then((e) => (Et = e, e)));
}
function lC() {
  return iC(), {
    turndown(e) {
      return Et ? Et.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return Et !== null;
    },
    async ready() {
      Et || (ho ? await ho : await vu());
    }
  };
}
function cC() {
  const e = j(null);
  return e.current || (e.current = lC()), e.current;
}
const dC = 2e3;
function uC(e) {
  const {
    extensions: t,
    content: n,
    editable: r,
    autofocus: o,
    spellCheck: s,
    initialMode: i,
    performanceMode: a,
    lightweightThreshold: l,
    onChange: c,
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
  } = e, C = n && n.length > dC, N = j(C ? n : null), A = C ? "" : n, P = j(null), O = j(null), _ = j(c), W = j(d), F = j(u), I = j(f), H = j(p), q = j(null);
  _.current = c, W.current = d, F.current = u, I.current = f, H.current = p;
  const ee = Ju({
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
    onCreate: ({ editor: X }) => {
      window.__tiptapEditor = X, g?.(X);
    },
    onDestroy: () => {
      m?.();
    },
    extensions: t,
    content: A,
    editable: r,
    autofocus: o,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      // Serialize copied content to clean markdown for the text/plain clipboard
      // flavor. ProseMirror's default joins every block with a blank line, so
      // copying a list and pasting into a plain-text field or code block yields
      // blank lines between items. Routing through the same turndown service used
      // for getMarkdown() produces tight, single-newline output instead.
      clipboardTextSerializer: (X) => {
        const $ = X.content;
        try {
          const Z = $.firstChild?.type.schema, L = q.current;
          if (Z && L) {
            const B = Js.fromSchema(Z).serializeFragment($), U = document.createElement("div");
            U.appendChild(B);
            const K = Wt(L.turndown(U.innerHTML)).replace(/^\n+|\n+$/g, "");
            if (K) return K;
          }
        } catch {
        }
        return $.textBetween(0, $.size, `
`, `
`);
      },
      handleClick: (X, $, Z) => {
        if (w) {
          const B = Z.target.closest("a");
          if (B) {
            const U = B.getAttribute("href");
            if (U && w(U, Z) === !1)
              return Z.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: X }) => {
      if (I.current?.(), a === "auto" && (x.current++, x.current >= 50)) {
        x.current = 0;
        const Z = X.state.doc.content.childCount > l;
        Z !== D.current && M(Z);
      }
      (_.current || W.current) && (P.current && clearTimeout(P.current), P.current = setTimeout(() => {
        if (X.isDestroyed) return;
        const $ = X.getHTML();
        _.current?.($), W.current?.($);
      }, 300)), H.current > 0 && F.current && (O.current && clearTimeout(O.current), O.current = setTimeout(() => {
        if (!X.isDestroyed && T.current === "wysiwyg" && q.current) {
          const $ = X.getHTML(), Z = q.current.turndown($);
          k.current = Z, F.current?.(Wt(Z));
        }
      }, H.current));
    },
    onFocus: () => {
      y?.();
    },
    onBlur: () => {
      if (O.current && (clearTimeout(O.current), O.current = null), P.current && (clearTimeout(P.current), P.current = null, ee && !ee.isDestroyed)) {
        const X = ee.getHTML();
        if ((_.current || W.current) && (_.current?.(X), W.current?.(X)), T.current === "wysiwyg" && q.current) {
          const $ = q.current.turndown(X);
          k.current = $, F.current?.(Wt($));
        }
      }
      b?.();
    },
    onSelectionUpdate: ({ editor: X }) => {
      if (v) {
        const { from: $, to: Z, empty: L } = X.state.selection;
        v({ from: $, to: Z, empty: L });
      }
    }
  });
  V(() => {
    if (!N.current || !ee || ee.isDestroyed) return;
    const X = N.current;
    N.current = null;
    const $ = requestAnimationFrame(() => {
      const Z = setTimeout(() => {
        ee.isDestroyed || ee.commands.setContent(X);
      }, 0);
      ee.__deferredTimerId = Z;
    });
    return () => {
      cancelAnimationFrame($);
      const Z = ee.__deferredTimerId;
      Z && clearTimeout(Z);
    };
  }, [ee]), V(() => () => {
    if (O.current && (clearTimeout(O.current), O.current = null), P.current && (clearTimeout(P.current), P.current = null, ee && !ee.isDestroyed)) {
      const X = ee.getHTML();
      if ((_.current || W.current) && (_.current?.(X), W.current?.(X)), T.current === "wysiwyg" && q.current) {
        const $ = q.current.turndown(X);
        k.current = $, F.current?.(Wt($));
      }
    }
  }, []);
  const te = cC();
  q.current = te;
  const ne = j(!1);
  return V(() => {
    if (!ne.current && i === "markdown" && ee && !ee.isDestroyed && te) {
      const X = ee.getHTML(), $ = te.turndown(X);
      E($), k.current = $, ne.current = !0;
    }
  }, [ee, te, i]), { editor: ee, turndownService: te };
}
function fC(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (i) => {
    Array.from(i.querySelectorAll("ul")).forEach(o);
    const l = Array.from(i.children).filter((f) => f.tagName === "LI");
    let c = !1, d = !1;
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
    l.forEach((f) => {
      u(f) ? c = !0 : d = !0;
    }), c && (l.forEach((f) => {
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
    }), c && !d && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function pC(e) {
  const t = e.split(`
`), n = [], r = (l) => {
    const c = l.trimStart();
    return /^[-*+]\s+\[[ xX]\]\s/.test(c) ? "task" : /^[-*+]\s+/.test(c) ? "bullet" : /^\d+\.\s+/.test(c) ? "ordered" : null;
  }, o = (l) => {
    const c = l.match(/^( *)/);
    return c ? c[1].length : 0;
  }, s = (l) => /^\s{2,}\S/.test(l), i = (l) => l.trim() === "" || l.trim() === "​";
  let a = !1;
  for (let l = 0; l < t.length; l++) {
    const c = t[l];
    if (/^```/.test(c.trim())) {
      a = !a, n.push(c);
      continue;
    }
    if (a) {
      n.push(c);
      continue;
    }
    if (n.push(c), r(c) !== null || s(c)) {
      let d = l + 1;
      for (; d < t.length && s(t[d]); )
        d++;
      let u = 0;
      const f = d;
      for (; d < t.length && i(t[d]); )
        u++, d++;
      if (u > 0 && d < t.length) {
        const p = r(c), g = r(t[d]);
        if (p !== null && g !== null) {
          const m = o(c);
          if (o(t[d]) > m) {
            for (let b = f; b < d; b++)
              n.push(t[b]);
            l = d - 1;
            continue;
          }
          for (let b = f; b < d; b++)
            n.push(t[b]);
          n.push("<!-- list-break -->"), l = d - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function hC(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = Array.from(r.querySelectorAll("li"));
  for (const s of o) {
    if (s.getAttribute("data-type") === "taskItem" || !s.querySelector(":scope > img, :scope > p > img, :scope > figure")) continue;
    const a = Array.from(s.childNodes), l = [], c = [];
    if (a.forEach((d) => {
      if (d.nodeType === Node.ELEMENT_NODE) {
        const u = d, f = u.tagName;
        if (f === "UL" || f === "OL")
          c.push(d);
        else if (f === "FIGURE")
          c.push(d);
        else if (f === "IMG") {
          const p = n.createElement("figure");
          p.className = "image-resizer";
          const g = u.getAttribute("data-align") || "left", m = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = m[g] || "margin-right: auto;", p.appendChild(u.cloneNode(!0)), c.push(p);
        } else if (f === "P")
          if (u.querySelectorAll("img").length === 0)
            c.push(d);
          else {
            const g = Array.from(u.childNodes), m = [];
            if (g.forEach((y) => {
              if (y.nodeType === Node.ELEMENT_NODE && y.tagName === "IMG") {
                if (m.length > 0) {
                  const k = n.createElement("p");
                  m.forEach((E) => k.appendChild(E.cloneNode(!0))), k.textContent?.trim() && c.push(k), m.length = 0;
                }
                const b = y, v = n.createElement("figure");
                v.className = "image-resizer";
                const w = b.getAttribute("data-align") || "left", T = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = T[w] || "margin-right: auto;", v.appendChild(b.cloneNode(!0)), c.push(v);
              } else
                m.push(y);
            }), m.length > 0) {
              const y = n.createElement("p");
              m.forEach((b) => y.appendChild(b.cloneNode(!0))), y.textContent?.trim() && c.push(y);
            }
          }
        else
          l.push(d);
      } else
        l.push(d);
    }), s.innerHTML = "", l.length > 0 && l.some((u) => (u.textContent || "").trim().length > 0)) {
      const u = n.createElement("p");
      l.forEach((f) => u.appendChild(f)), s.appendChild(u);
    }
    c.forEach((d) => s.appendChild(d));
  }
  return r.innerHTML;
}
function mC(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function mo(e) {
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
function gC(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function sl(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? gC(r) : r.trim() ? `<p>${mo(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${mo(e)}</p>`;
}
function yC(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function vC(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const l = e[a]?.type || "ul", c = l === "task", d = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, u = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (c ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${mo(f.text)}</p>` : i += `<li><p>${mo(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function bC(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let l = r.trim();
      l = l.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const c = l.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (c.length <= 1 && !a)
        return s ? `${n}${sl(l)}${o}` : t;
      const d = [];
      let u = [];
      const f = () => {
        u.length !== 0 && (d.push(vC(u)), u = []);
      };
      for (const p of c) {
        const g = yC(p);
        if (g) {
          if (u.length > 0) {
            const m = u[0].type;
            g.depth === 0 && g.type !== m && f();
          }
          u.push(g);
        } else
          f(), d.push(sl(p.trim()));
      }
      return f(), `${n}${d.join("")}${o}`;
    }
  );
}
function wC(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: l
  } = n;
  let c = e;
  c = pC(c);
  const d = /* @__PURE__ */ new Set(["info", "note", "prompt", "resources", "todo", "summary"]), u = c.split(`
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
  return p !== null && (f.push(`\`\`\`ad-${p}`), f.push(...g)), c = f.join(`
`), c = c.replace(/!\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)]+)\)/g, (y, b, v) => {
    const w = b.split("|").map((D) => D.trim());
    let T = "", k = "left", E = null;
    w.length === 1 ? T = w[0] : w.length === 2 ? (T = w[0], /^\d+$/.test(w[1]) ? E = w[1] : ["left", "center", "right"].includes(w[1]) ? k = w[1] : T = b) : w.length === 3 ? (T = w[0], ["left", "center", "right"].includes(w[1]) && (k = w[1]), /^\d+$/.test(w[2]) && (E = w[2])) : T = b;
    const M = E ? ` width="${E}" style="width: ${E}px"` : "", x = ` data-align="${k}"`;
    return `<img src="${v.trim()}" alt="${T}"${x}${M} />`;
  }), c = c.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), a && l && (c = c.replace(/@([^@\n]+)@/g, (y, b) => {
    const v = a(b);
    if (v) {
      const w = l(v);
      return `<span data-type="date-pill" data-date="${v}" class="date-pill ${w}"><span class="date-icon">📅</span><span class="date-text">${b.trim()}</span></span>`;
    }
    return y;
  })), r && !o && s && i && (c = c.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (y, b) => {
      const v = i(b);
      return s(v) ? `<span data-type="tag-pill" data-tag="${v}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${v}</span></span>` : y;
    }
  )), c = c.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((y, b) => b % 2 === 1 ? y : y.replace(/\[\[([^\[\]]+)\]\]/g, (v, w) => `<span data-wiki-link data-page-name="${w.trim()}" class="wiki-link">${w.trim()}</span>`)).join(""), c;
}
function kC(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = fC(t), t = hC(t), t = mC(t), t = bC(t), t = t.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
    (n, r, o, s) => r + o.replace(/\n+$/, "") + s
  ), t;
}
function xC(e, t, n = {}) {
  const r = wC(e, t, n), o = t(r);
  return kC(o);
}
function CC(e, t, n) {
  V(() => {
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
          const { state: a } = e, { from: l, to: c } = a.selection;
          if (l !== c) {
            const d = a.doc.textBetween(l, c, " ");
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
            const { state: a } = e, { selection: l } = a, { $from: c } = l;
            if (c.parent.type.spec.code) return;
            const d = a.schema.marks.code;
            if (d && (d.isInSet(c.marks()) || c.nodeBefore && d.isInSet(c.nodeBefore.marks)))
              return;
            const u = c.nodeBefore?.textContent || "";
            if (u === "#####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 5, to: c.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (u === "####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 4, to: c.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (u === "###") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 3, to: c.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (u === "##") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 2, to: c.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (u === "#") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (u === "-" || u === "*") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(u)) {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - u.length, to: c.pos }).toggleOrderedList().run();
              return;
            }
            const f = /^(-\s*)?\[([ x])?\]$/.exec(u);
            if (f) {
              o.preventDefault();
              const p = f[2] === "x", g = a.schema.nodes.taskList, m = a.schema.nodes.taskItem;
              if (g && m) {
                const y = a.tr, b = c.pos - u.length, v = c.pos;
                y.delete(b, v);
                const T = y.doc.resolve(b).blockRange();
                if (T) {
                  const k = [
                    { type: g, attrs: {} },
                    { type: m, attrs: { checked: p } }
                  ];
                  y.wrap(T, k), e.view.dispatch(y);
                  return;
                }
              }
              e.chain().focus().deleteRange({ from: c.pos - u.length, to: c.pos }).toggleTaskList().run();
              return;
            }
            if (u === ">") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).toggleBlockquote().run();
              return;
            }
            if (u === "```") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 3, to: c.pos }).toggleCodeBlock().run();
              return;
            }
            if (u === "---" || u === "***") {
              o.preventDefault(), eo(e, c.pos - 3, c.pos);
              return;
            }
            if (u === "—-") {
              o.preventDefault(), eo(e, c.pos - 2, c.pos);
              return;
            }
            if (u === "—") {
              o.preventDefault(), eo(e, c.pos - 1, c.pos);
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
function EC({
  editorModeRef: e,
  rawMarkdownRef: t,
  editorMode: n,
  handleModeSwitch: r,
  setIsFindReplaceOpen: o,
  setFindReplaceFocusTrigger: s
}) {
  V(() => {
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
        const l = (c) => {
          a(c.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", l), () => window.removeEventListener("paragon-editor-mode-change", l);
      }
    };
    return window.__paragonEditorModeAPI = i, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [r]), V(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function MC({
  editor: e,
  turndownService: t,
  editorModeRef: n,
  rawMarkdownRef: r,
  setEditorMode: o,
  setRawMarkdown: s,
  onModeChange: i,
  enableTagAutoDetect: a,
  disabledFeatures: l
}) {
  return z(async (d) => {
    if (e) {
      if (d === "markdown" && n.current === "wysiwyg") {
        const u = e.getHTML(), f = t.turndown(u);
        s(f), r.current = f;
      } else if (d === "wysiwyg" && n.current === "markdown") {
        const { marked: u } = await import("./marked.esm-Tjr8Gfse.js"), f = (m) => u.parse(m, { async: !1, breaks: !0 }), p = {
          enableTagAutoDetect: a,
          disableTagPills: !!l.tagPills,
          isValidTag: kn,
          normalizeTag: Jn,
          parseDateFromMarkdown: en,
          getDateVariant: Ta
        }, g = xC(r.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(g);
        });
      }
      o(d), n.current = d, i?.(d);
    }
  }, [e, t, i]);
}
const TC = 200;
function SC(e, t = {}) {
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
  }), a = j(null), l = j(""), c = z((d) => {
    const u = d.trim(), f = u.length > 0 ? u.split(/\s+/).filter((v) => v.length > 0).length : 0, p = u.replace(/\s/g, "").length, g = d.length;
    let m = 0, y = 0;
    r && (m = u.length > 0 ? u.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, y = u.length > 0 ? (u.match(/[.!?]+/g) || []).length : 0);
    const b = Math.max(1, Math.ceil(f / TC));
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
  return V(() => {
    if (!e || !o) return;
    const d = () => {
      a.current && clearTimeout(a.current), i((u) => ({ ...u, isCalculating: !0 })), a.current = setTimeout(() => {
        try {
          const u = e.getText();
          if (u === l.current) {
            i((p) => ({ ...p, isCalculating: !1 }));
            return;
          }
          l.current = u;
          const f = c(u);
          i(f);
        } catch (u) {
          console.warn("useWordCount: Error calculating word count", u), i((f) => ({ ...f, isCalculating: !1 }));
        }
      }, n);
    };
    return d(), e.on("update", d), () => {
      e.off("update", d), a.current && clearTimeout(a.current);
    };
  }, [e, n, o, c]), s;
}
function NC({ status: e, lastSaved: t, className: n = "" }) {
  const r = (o) => {
    if (!o) return "";
    const i = (/* @__PURE__ */ new Date()).getTime() - o.getTime(), a = Math.floor(i / 1e3), l = Math.floor(a / 60), c = Math.floor(l / 60);
    return a < 10 ? "Just now" : a < 60 ? `${a}s ago` : l < 60 ? `${l}m ago` : c < 24 ? `${c}h ago` : o.toLocaleDateString();
  };
  return /* @__PURE__ */ R(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ R(we, { children: [
          /* @__PURE__ */ h(Sf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ R("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ R(we, { children: [
          /* @__PURE__ */ h(Nl, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ h("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ R(we, { children: [
          /* @__PURE__ */ h(In, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ h("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ R(we, { children: [
          /* @__PURE__ */ h(Nf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ h("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function DC({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ R(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ h(Df, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ h("span", { className: "text-sm recovery-banner-text", children: "Found unsaved content from the last session." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ R(
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
              children: /* @__PURE__ */ h(Mt, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
function Kr(e) {
  const t = [], n = e.split(`
`);
  let r = 0, o = !1, s = "";
  for (let i = 0; i < n.length; i++) {
    const a = n[i], l = r;
    if (a.startsWith("```")) {
      o ? (o = !1, t.push({
        type: "code-block",
        content: a,
        start: l,
        end: l + a.length
      })) : (o = !0, s = a.slice(3).trim(), t.push({
        type: "code-block",
        content: "```",
        start: l,
        end: l + 3
      }), s && t.push({
        type: "code-block-lang",
        content: s,
        start: l + 3,
        end: l + 3 + s.length
      })), r += a.length + 1;
      continue;
    }
    if (o) {
      t.push({
        type: "code-block",
        content: a,
        start: l,
        end: l + a.length
      }), r += a.length + 1;
      continue;
    }
    const c = a.match(/^(#{1,6})\s+(.*)$/);
    if (c) {
      const v = c[1].length;
      t.push({
        type: `heading${v}`,
        content: a,
        start: l,
        end: l + a.length
      }), r += a.length + 1;
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(a.trim())) {
      t.push({
        type: "horizontal-rule",
        content: a,
        start: l,
        end: l + a.length
      }), r += a.length + 1;
      continue;
    }
    if (a.startsWith(">")) {
      t.push({
        type: "blockquote",
        content: a,
        start: l,
        end: l + a.length
      }), r += a.length + 1;
      continue;
    }
    if (/^\|?[\s-:|]+\|?$/.test(a) && a.includes("-")) {
      t.push({
        type: "table-separator",
        content: a,
        start: l,
        end: l + a.length
      }), r += a.length + 1;
      continue;
    }
    if (a.includes("|") && (a.startsWith("|") || a.trim().includes(" | "))) {
      t.push({
        type: "table-cell",
        content: a,
        start: l,
        end: l + a.length
      }), r += a.length + 1;
      continue;
    }
    const d = a.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (d) {
      const v = d[2].toLowerCase() === "x";
      t.push({
        type: v ? "task-checked" : "task-list",
        content: a,
        start: l,
        end: l + a.length
      }), r += a.length + 1;
      continue;
    }
    if (a.match(/^(\s*[-*+])\s+(.*)$/)) {
      t.push({
        type: "list-bullet",
        content: a,
        start: l,
        end: l + a.length
      }), r += a.length + 1;
      continue;
    }
    if (a.match(/^(\s*\d+\.)\s+(.*)$/)) {
      t.push({
        type: "list-number",
        content: a,
        start: l,
        end: l + a.length
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
          start: l + w.index,
          end: l + w.index + w[0].length,
          type: v.type,
          content: w[0]
        });
    }
    m.sort((v, w) => v.start - w.start);
    const y = [];
    let b = l;
    for (const v of m)
      v.start >= b && (y.push(v), b = v.end);
    for (const v of y)
      v.start > l + p && t.push({
        type: "text",
        content: a.substring(p, v.start - l),
        start: l + p,
        end: v.start
      }), t.push({
        type: v.type,
        content: v.content,
        start: v.start,
        end: v.end
      }), p = v.end - l;
    p < a.length && t.push({
      type: "text",
      content: a.substring(p),
      start: l + p,
      end: l + a.length
    }), r += a.length + 1;
  }
  return t;
}
function al(e) {
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
function rn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function Gr(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return rn(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const c = s[l], d = i + c.length, u = t.filter((p) => p.start >= i && p.start < d);
      let f = i;
      for (const p of u)
        p.start > f && (o += rn(e.substring(f, p.start))), o += `<span class="${al(p.type)}">${rn(p.content)}</span>`, f = p.end;
      f < d && (o += rn(e.substring(f, d))), l < s.length - 1 && (o += `
`), i = d + 1;
    }
    return o;
  }
  const a = /* @__PURE__ */ new Map();
  n.forEach((l, c) => {
    for (let d = l.from; d < l.to; d++)
      a.set(d, { matchIdx: c, isCurrent: c === r });
  }), i = 0;
  for (let l = 0; l < s.length; l++) {
    const c = s[l], d = i + c.length, u = t.filter((p) => p.start >= i && p.start < d);
    let f = i;
    for (const p of u)
      p.start > f && (o += ms(e, f, p.start, null, a)), o += ms(e, p.start, p.end, al(p.type), a), f = p.end;
    f < d && (o += ms(e, f, d, null, a)), l < s.length - 1 && (o += `
`), i = d + 1;
  }
  return o;
}
function ms(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const l = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const c = rn(e.substring(l, i)), d = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${d}">${c}</mark></span>` : s += `<mark class="${d}">${c}</mark>`;
    } else {
      const l = i;
      for (; i < n && !o.has(i); )
        i++;
      const c = rn(e.substring(l, i));
      r ? s += `<span class="${r}">${c}</span>` : s += c;
    }
  }
  return s;
}
function LC({
  content: e,
  onChange: t,
  placeholder: n = "Write your markdown here...",
  editable: r = !0,
  autofocus: o = !1,
  className: s = "",
  searchMatches: i,
  currentMatchIndex: a,
  autoClosePairs: l = !0
}) {
  const c = j(null), d = j(null), u = j(null), f = j(null), p = 5e3, g = 80, [m, y] = Y(() => {
    const x = Kr(e);
    return Gr(e, x, i, a);
  }), b = j(null), v = zt(() => {
    if (e.length <= p) {
      const x = Kr(e), D = Gr(e, x, i, a);
      return b.current && (clearTimeout(b.current), b.current = null), D;
    }
    return null;
  }, [e, i, a]);
  V(() => {
    if (e.length <= p) {
      const x = Kr(e);
      y(Gr(e, x, i, a));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const x = Kr(e);
      y(Gr(e, x, i, a)), b.current = null;
    }, g), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, i, a]);
  const w = v ?? m, T = z(() => {
    const x = c.current, D = d.current, C = u.current;
    if (x) {
      const N = C?.parentElement, A = N ? N.clientHeight : 200;
      x.style.height = "auto";
      const P = Math.max(x.scrollHeight, A, 200);
      x.style.height = `${P}px`, D && (D.style.height = `${P}px`);
    }
  }, []);
  V(() => {
    const x = c.current;
    if (!x) return;
    const D = (C) => {
      const N = x.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: A, scrollHeight: P, clientHeight: O } = N, _ = A <= 0, W = A + O >= P - 1;
      (C.deltaY > 0 && !W || C.deltaY < 0 && !_) && (C.preventDefault(), N.scrollTop += C.deltaY);
    };
    return x.addEventListener("wheel", D, { passive: !1 }), () => x.removeEventListener("wheel", D);
  }, []);
  const k = z(() => {
  }, []);
  V(() => {
    T();
  }, [e, T]), V(() => {
    o && c.current && c.current.focus();
  }, [o]), V(() => {
    if (f.current && c.current) {
      const { start: x, end: D } = f.current;
      c.current.selectionStart = x, c.current.selectionEnd = D, f.current = null;
    }
  }, [e]);
  const E = z((x) => {
    const D = x.target;
    f.current = {
      start: D.selectionStart,
      end: D.selectionEnd
    }, t(D.value);
  }, [t]), M = z((x) => {
    const D = x.currentTarget, C = D.selectionStart, N = D.selectionEnd, A = D.value, P = C !== N;
    if (l) {
      if (x.key === "`" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), P) {
          const O = A.substring(C, N), _ = A.substring(0, C) + "`" + O + "`" + A.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(_);
        } else if (A[C] === "`")
          f.current = { start: C + 1, end: C + 1 }, t(A), D.selectionStart = D.selectionEnd = C + 1;
        else {
          const O = A.substring(0, C) + "``" + A.substring(N);
          f.current = { start: C + 1, end: C + 1 }, t(O);
        }
        return;
      }
      if (x.key === "*" && !x.ctrlKey && !x.metaKey) {
        if (A[C - 1] === "*" && A[C], P) {
          x.preventDefault();
          const W = A.substring(C, N), F = A.substring(0, C) + "*" + W + "*" + A.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(F);
          return;
        }
        if (A[C] === "*") {
          x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
          return;
        }
        x.preventDefault();
        const _ = A.substring(0, C) + "**" + A.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t(_);
        return;
      }
      if (x.key === "_" && !x.ctrlKey && !x.metaKey) {
        if (P) {
          x.preventDefault();
          const _ = A.substring(C, N), W = A.substring(0, C) + "_" + _ + "_" + A.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(W);
          return;
        }
        if (A[C] === "_") {
          x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
          return;
        }
        x.preventDefault();
        const O = A.substring(0, C) + "__" + A.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t(O);
        return;
      }
      if (x.key === "~" && !x.ctrlKey && !x.metaKey) {
        if (P) {
          x.preventDefault();
          const _ = A.substring(C, N), W = A.substring(0, C) + "~" + _ + "~" + A.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(W);
          return;
        }
        if (A[C] === "~") {
          x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
          return;
        }
        x.preventDefault();
        const O = A.substring(0, C) + "~~" + A.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t(O);
        return;
      }
      if (x.key === "[" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), P) {
          const O = A.substring(C, N), _ = A.substring(0, C) + "[" + O + "]()" + A.substring(N);
          f.current = { start: N + 3, end: N + 3 }, t(_);
        } else {
          const O = A.substring(0, C) + "[]()" + A.substring(N);
          f.current = { start: C + 1, end: C + 1 }, t(O);
        }
        return;
      }
      if (x.key === "]" && !x.ctrlKey && !x.metaKey && A[C] === "]") {
        x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
        return;
      }
      if (x.key === ")" && !x.ctrlKey && !x.metaKey && A[C] === ")") {
        x.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
        return;
      }
      if (x.key === "Backspace" && !P && C > 0) {
        const O = A[C - 1], _ = A[C], W = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [F, I] of W)
          if (O === F && _ === I) {
            x.preventDefault();
            const H = A.substring(0, C - 1) + A.substring(C + 1);
            f.current = { start: C - 1, end: C - 1 }, t(H);
            return;
          }
        if (O === "[" && A.substring(C, C + 3) === "]()") {
          x.preventDefault();
          const F = A.substring(0, C - 1) + A.substring(C + 3);
          f.current = { start: C - 1, end: C - 1 }, t(F);
          return;
        }
      }
    }
    if (x.key === "Tab")
      if (x.preventDefault(), x.shiftKey) {
        const O = A.substring(0, C), _ = A.substring(C, N), W = A.substring(N), I = O.lastIndexOf(`
`) + 1, H = O.substring(0, I), q = O.substring(I), ee = (q + _).split(`
`), te = ee.map(($) => $.startsWith("  ") ? $.substring(2) : $.startsWith("	") ? $.substring(1) : $), ne = H + te.join(`
`) + W, X = (q + _).length - te.join(`
`).length;
        f.current = {
          start: Math.max(I, C - (ee[0].length - te[0].length)),
          end: N - X
        }, t(ne);
      } else if (C === N) {
        const O = A.substring(0, C) + "  " + A.substring(N);
        f.current = { start: C + 2, end: C + 2 }, t(O);
      } else {
        const O = A.substring(0, C), _ = A.substring(C, N), W = A.substring(N), I = O.lastIndexOf(`
`) + 1, H = O.substring(0, I), ee = (O.substring(I) + _).split(`
`), te = ee.map((X) => "  " + X), ne = H + te.join(`
`) + W;
        f.current = {
          start: C + 2,
          end: N + ee.length * 2
        }, t(ne);
      }
  }, [t, l]);
  return /* @__PURE__ */ R("div", { ref: u, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ h(
      "div",
      {
        ref: d,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: w || `<span class="md-placeholder">${rn(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ h(
      "textarea",
      {
        ref: c,
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
let il = 0, $s = 0, bu = 0;
function AC(e) {
  $s++, bu = e;
}
const RC = Dt(function({
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
  }), l = j([]), c = j(performance.now()), d = j(0), u = j(0), f = j(0), p = j(0), [g, m] = Y(new Array(60).fill(0)), [y, b] = Y(new Array(60).fill(0));
  V(() => {
    if (!t || !r) return;
    const M = () => {
      const x = performance.now();
      queueMicrotask(() => {
        const D = performance.now() - x;
        AC(D);
      });
    };
    return r.on("transaction", M), () => {
      r.off("transaction", M);
    };
  }, [t, r]), V(() => {
    if (!t) return;
    let M = 0, x = performance.now(), D = 0;
    const C = (N) => {
      const A = N - c.current;
      if (c.current = N, l.current.push({ time: N, duration: A }), l.current.length > 120 && (l.current = l.current.slice(-120)), A > 16.67 && u.current++, M++, N - x >= 1e3) {
        D = M, M = 0, x = N;
        const P = l.current.slice(-60), O = P.length > 0 ? P.reduce((te, ne) => te + ne.duration, 0) / P.length : 0, _ = P.length > 0 ? Math.max(...P.map((te) => te.duration)) : 0, W = performance.memory, F = W ? W.usedJSHeapSize / (1024 * 1024) : 0, I = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, H = document.querySelectorAll("*").length, q = il - f.current, ee = $s - p.current;
        f.current = il, p.current = $s, a({
          fps: D,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(_ * 100) / 100,
          memoryUsed: Math.round(F * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: q,
          transactionCount: ee,
          lastTransactionTime: Math.round(bu * 100) / 100,
          domNodes: H,
          longFrames: u.current
        }), m((te) => [...te.slice(1), D]), b((te) => [...te.slice(1), O]), u.current = 0;
      }
      d.current = requestAnimationFrame(C);
    };
    return d.current = requestAnimationFrame(C), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const v = z(() => {
    n?.();
  }, [n]), w = z(() => {
    s((M) => !M);
  }, []);
  if (!t) return null;
  const T = (M) => M >= 55 ? "#4ade80" : M >= 30 ? "#fbbf24" : "#f87171", k = (M) => M <= 16.67 ? "#4ade80" : M <= 33.33 ? "#fbbf24" : "#f87171", E = (M, x, D) => {
    const A = M.map((P, O) => {
      const _ = O / (M.length - 1) * 120, W = 24 - Math.min(P, x) / x * 24;
      return `${_},${W}`;
    }).join(" ");
    return /* @__PURE__ */ h("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ h(
      "polyline",
      {
        points: A,
        fill: "none",
        stroke: D,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ R("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ R("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ R("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ h(Lf, { size: 14 }),
        /* @__PURE__ */ h("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ h("button", { onClick: w, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ h(Dl, { size: 12 }) : /* @__PURE__ */ h(Ll, { size: 12 }) }),
        /* @__PURE__ */ h("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ h(Mt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ R("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ h("span", { className: "perf-value", style: { color: T(i.fps) }, children: i.fps })
        ] }),
        E(g, 70, T(i.fps))
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ R("span", { className: "perf-value", style: { color: k(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ h("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ R("span", { className: "perf-value-sub", style: { color: k(i.frameTimeMax) }, children: [
            i.frameTimeMax,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ R("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }),
          /* @__PURE__ */ R("span", { className: "perf-value-sub", style: { color: i.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            i.longFrames,
            "/s"
          ] })
        ] }),
        E(y, 50, k(i.frameTime))
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.renderCount })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.transactionCount })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ h("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ R("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ h("span", { className: "perf-value", children: i.domNodes.toLocaleString() })
        ] }),
        i.memoryTotal > 0 && /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "Memory" }),
          /* @__PURE__ */ R("span", { className: "perf-value", children: [
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
class IC extends rf {
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
      return /* @__PURE__ */ h("div", { className: ce("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ R("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ h("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ h(Af, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ R("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ h("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ h("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ R(
            on,
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
          s && this.props.onClearContent && /* @__PURE__ */ R(
            on,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ h(xn, { className: "w-4 h-4" }),
                "Clear Content & Retry"
              ]
            }
          )
        ] }),
        t && /* @__PURE__ */ R("div", { className: "w-full max-w-xs", children: [
          /* @__PURE__ */ R(
            "button",
            {
              onClick: this.toggleDetails,
              className: ce(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ h(Nn, { className: "w-3 h-3" }) : /* @__PURE__ */ h(Rf, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ R("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ R("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ h("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ R(we, { children: [
                    /* @__PURE__ */ h(If, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ h("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ R(we, { children: [
                    /* @__PURE__ */ h(Rn, { className: "w-3 h-3" }),
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
function PC({ className: e = "", theme: t }) {
  const n = (r) => ({
    height: "1rem",
    width: r,
    borderRadius: "0.25rem",
    background: "var(--color-muted, #e5e7eb)",
    opacity: 0.5,
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  });
  return /* @__PURE__ */ h("div", { className: `markdown-editor-container ${e}`, "data-theme": t, children: /* @__PURE__ */ R(
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
function OC({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ R("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ h(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ h(Pf, {})
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
const ll = 2, _C = 1.15, $C = 14, HC = 1.5;
function BC({ editor: e, containerRef: t }) {
  const n = j(null);
  return V(() => {
    const r = e.view.dom, o = n.current, s = t.current;
    if (!r || !o || !s) return;
    const i = r.style.caretColor;
    r.style.caretColor = "transparent";
    let a = 0;
    const l = () => {
      a = 0;
      const u = document.activeElement === r, f = window.getSelection();
      if (!e.isEditable || !u || !f || f.rangeCount === 0 || !f.isCollapsed || !r.contains(f.anchorNode)) {
        o.style.opacity = "0";
        return;
      }
      const p = f.getRangeAt(0), g = p.getClientRects(), m = g.length > 0 ? g[g.length - 1] : p.getBoundingClientRect(), y = s.getBoundingClientRect(), b = parseFloat(r.style.fontSize) || parseFloat(getComputedStyle(r).fontSize) || $C, v = parseFloat(r.style.zoom) || 1, w = Math.max(2, Math.round(b * v * _C)), T = getComputedStyle(r), k = (parseFloat(T.lineHeight) || b * HC) * v;
      let E = m.top, M = m.left, x = m.height || k;
      if (!m.height && m.top === 0 && m.left === 0) {
        const C = r.getBoundingClientRect();
        E = C.top + parseFloat(T.paddingTop) * v, M = C.left + parseFloat(T.paddingLeft) * v;
      }
      const D = E + (x - w) / 2;
      o.style.width = `${ll}px`, o.style.height = `${w}px`, o.style.opacity = "1", o.style.transform = `translate(${M - y.left}px, ${D - y.top}px)`;
    }, c = () => {
      a === 0 && (a = window.requestAnimationFrame(l));
    };
    e.on("transaction", c), e.on("selectionUpdate", c), e.on("focus", c), e.on("blur", c), document.addEventListener("selectionchange", c), s.addEventListener("scroll", c, { passive: !0 }), window.addEventListener("resize", c);
    const d = new ResizeObserver(c);
    return d.observe(r), c(), () => {
      a !== 0 && window.cancelAnimationFrame(a), e.off("transaction", c), e.off("selectionUpdate", c), e.off("focus", c), e.off("blur", c), document.removeEventListener("selectionchange", c), s.removeEventListener("scroll", c), window.removeEventListener("resize", c), d.disconnect(), r.style.caretColor = i;
    };
  }, [e, t]), /* @__PURE__ */ h(
    "div",
    {
      ref: n,
      "aria-hidden": !0,
      className: "steady-caret",
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: ll,
        opacity: 0,
        pointerEvents: "none",
        background: "var(--foreground, currentColor)",
        borderRadius: 1,
        willChange: "transform",
        zIndex: 1
      }
    }
  );
}
function Yt({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: r
}) {
  const o = z(
    (a) => {
      r?.(a), a.stopPropagation();
    },
    [r]
  ), s = z((a) => {
    a.stopPropagation();
  }, []), i = z((a) => {
    a.stopPropagation();
  }, []);
  return Qf(
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
const Ye = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ h(
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
), gs = () => /* @__PURE__ */ h("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), cl = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], WC = Dt(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [l, c] = Y(!1), d = j(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = cl.find((g) => g.value === u)?.shortLabel || "P";
  V(() => {
    if (!l) return;
    const g = (m) => {
      d.current && !d.current.contains(m.target) && c(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [l]);
  const p = (g, m) => {
    if (g.preventDefault(), g.stopPropagation(), m === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const y = parseInt(m.replace("h", ""));
      t.chain().focus().toggleHeading({ level: y }).run();
    }
    c(!1);
  };
  return /* @__PURE__ */ R("div", { ref: d, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ R(
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
          ${u !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ h("span", { className: "min-w-[18px] text-center", children: f }),
          /* @__PURE__ */ h(Nn, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` })
        ]
      }
    ),
    l && /* @__PURE__ */ h(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: cl.map((g) => {
          const m = g.value === u;
          return /* @__PURE__ */ R(
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
}), zC = Dt(function({ onCopy: t, iconSize: n }) {
  const [r, o] = Y(!1), s = j(null);
  V(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const i = z((a) => {
    a.preventDefault(), a.stopPropagation(), t(), o(!0), s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 1500);
  }, [t]);
  return /* @__PURE__ */ h(
    Ye,
    {
      onMouseDown: i,
      title: r ? "Copied!" : "Copy as Markdown",
      children: r ? /* @__PURE__ */ h(In, { size: n, className: "text-green-500" }) : /* @__PURE__ */ h(Rn, { size: n })
    }
  );
}), FC = Dt(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s, onCopySelectionAsMarkdown: i }) {
  const a = j(null), l = yl({
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
  }), [c, d] = Y(!1), [u, f] = Y(""), [p, g] = Y(!1), [m, y] = Y({ top: 0, left: 0 }), b = j(null), v = j(null), w = j(null), T = z(() => {
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
  }, E = z((C, N) => {
    C.preventDefault(), C.stopPropagation(), N();
  }, []);
  V(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: N } = t.state, { empty: A, from: P, to: O } = N, F = ("node" in N && N.node ? N.node : null)?.type?.name === "resizableImage";
          if (A || F || t.isActive("codeBlock")) {
            w.current && (clearTimeout(w.current), w.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              g(!1), d(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const I = t.view.coordsAtPos(P), H = t.view.coordsAtPos(O), q = b.current?.offsetWidth || 500, ee = b.current?.offsetHeight || 40, te = 8, ne = window.innerWidth;
          let X = 0, $ = 0;
          if (b.current) {
            const K = b.current.closest('[data-slot="dialog-content"]');
            if (K) {
              const oe = K.getBoundingClientRect();
              X = oe.left, $ = oe.top;
            }
          }
          let L = (I.left + H.left) / 2 - q / 2 - X;
          const B = X ? ne - X : ne;
          L = Math.max(te, Math.min(B - q - te, L));
          let U = I.top - ee - 10 - $;
          U < te && (U = H.bottom + 10 - $), p ? y({ top: Math.max(te, U), left: L }) : (w.current && clearTimeout(w.current), w.current = setTimeout(() => {
            y({ top: Math.max(te, U), left: L }), g(!0);
          }, 50));
        } catch (N) {
          console.warn("FloatingToolbar: Error updating position", N);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), v.current && clearTimeout(v.current), w.current && clearTimeout(w.current);
    };
  }, [t, p]), V(() => {
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
  const x = 15, D = c ? /* @__PURE__ */ h(
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
      children: /* @__PURE__ */ R("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
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
        /* @__PURE__ */ R("div", { className: "flex gap-2", children: [
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
  ) : /* @__PURE__ */ R(
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
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBold().run()),
            isActive: l?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ h(zs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleItalic().run()),
            isActive: l?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ h(Fs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: l?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ h(Us, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleStrike().run()),
            isActive: l?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ h(js, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleCode().run()),
            isActive: l?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ h(kl, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: l?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ h(xl, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: k,
            isActive: l?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ h(Ys, { size: x })
          }
        ),
        /* @__PURE__ */ h(gs, {}),
        /* @__PURE__ */ h(
          WC,
          {
            editor: t,
            isH1: l?.isH1 ?? !1,
            isH2: l?.isH2 ?? !1,
            isH3: l?.isH3 ?? !1,
            isH4: l?.isH4 ?? !1,
            isH5: l?.isH5 ?? !1,
            executeCommand: E
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: l?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ h(qs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: l?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ h(Vs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: l?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ h(Ks, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: l?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ h(Gs, { size: x })
          }
        ),
        /* @__PURE__ */ h(
          Ye,
          {
            onMouseDown: (C) => E(C, () => ea(t)),
            isActive: l?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ h(Cl, { size: x })
          }
        ),
        i && /* @__PURE__ */ R(we, { children: [
          /* @__PURE__ */ h(gs, {}),
          /* @__PURE__ */ h(zC, { onCopy: i, iconSize: x })
        ] }),
        o && /* @__PURE__ */ R(we, { children: [
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
              children: /* @__PURE__ */ h(vo, { size: x })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ h(Yt, { onMouseDown: M, children: D });
});
function UC({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = Y(""), s = j(null), i = j(null), [a, l] = Y({ top: 0, left: 0 });
  V(() => {
    if (t) {
      const g = e.getAttributes("link").href || "";
      o(g);
      try {
        const { view: m } = e, { from: y } = m.state.selection, b = m.coordsAtPos(y), v = b.bottom + 8, w = Math.max(16, Math.min(b.left, window.innerWidth - 420));
        l({ top: v, left: w });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), V(() => {
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
  const c = z((g) => {
    if (g?.preventDefault(), r.trim()) {
      let m = r.trim();
      !/^https?:\/\//i.test(m) && !m.startsWith("mailto:") && (m = "https://" + m), e.chain().focus().extendMarkRange("link").setLink({ href: m }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), d = z((g) => {
    g.key === "Escape" ? (g.preventDefault(), n()) : g.key === "Enter" && (g.preventDefault(), c());
  }, [n, c]);
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
      children: /* @__PURE__ */ R("form", { onSubmit: c, className: "link-popover-form", children: [
        /* @__PURE__ */ R("div", { className: "link-popover-input-wrapper", children: [
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
  return /* @__PURE__ */ h(Yt, { children: p });
}
function jC() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function YC({ editor: e, onEditLink: t }) {
  const [n, r] = Y({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = j(null), s = j(null), i = j(null), a = j(null), l = z((M) => {
    if (!(!e || e.isDestroyed))
      try {
        const x = M.getAttribute("href") || "", D = M.getBoundingClientRect(), C = 44, N = 8, O = D.top >= C + N ? D.top - C - N : D.bottom + N, _ = Math.max(16, Math.min(D.left, window.innerWidth - 340));
        a.current = M, r({
          isVisible: !0,
          url: x,
          position: { top: O, left: _ },
          linkElement: M
        });
      } catch (x) {
        console.warn("LinkHoverTooltip: Error showing tooltip", x);
      }
  }, [e]), c = z((M) => {
    if (!(!e || e.isDestroyed)) {
      if (s.current && (clearTimeout(s.current), s.current = null), i.current && (clearTimeout(i.current), i.current = null), a.current && a.current !== M && n.isVisible) {
        i.current = setTimeout(() => {
          i.current = null, l(M);
        }, 200);
        return;
      }
      l(M);
    }
  }, [e, n.isVisible, l]), d = z(() => {
    s.current = setTimeout(() => {
      a.current = null, r((M) => ({ ...M, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), u = z(() => {
    s.current && (clearTimeout(s.current), s.current = null), i.current && (clearTimeout(i.current), i.current = null), a.current = null, r((M) => ({ ...M, isVisible: !1, linkElement: null }));
  }, []), f = z(() => {
    s.current && (clearTimeout(s.current), s.current = null), i.current && (clearTimeout(i.current), i.current = null);
  }, []);
  V(() => {
    if (!e || e.isDestroyed) return;
    const M = e.view.dom;
    if (!M) return;
    const x = (C) => {
      const A = C.target.closest("a");
      A && M.contains(A) && c(A);
    }, D = (C) => {
      const N = C.target, A = C.relatedTarget;
      if (N.closest("a")) {
        if (A && o.current?.contains(A))
          return;
        d();
      }
    };
    return M.addEventListener("mouseover", x), M.addEventListener("mouseout", D), () => {
      M.removeEventListener("mouseover", x), M.removeEventListener("mouseout", D), s.current && clearTimeout(s.current), i.current && clearTimeout(i.current);
    };
  }, [e, c, d]), V(() => {
    if (!e || e.isDestroyed) return;
    const M = e.view.dom;
    if (!M) return;
    const x = (D) => {
      const N = D.target.closest("a");
      if (N && M.contains(N)) {
        if (a.current === N && n.isVisible)
          return;
        D.preventDefault(), D.stopPropagation(), c(N);
      }
    };
    return M.addEventListener("touchend", x, { capture: !0 }), () => {
      M.removeEventListener("touchend", x, { capture: !0 });
    };
  }, [e, c, n.isVisible]), V(() => {
    if (!n.isVisible || !jC()) return;
    const M = (D) => {
      const C = D.target;
      o.current?.contains(C) || a.current && a.current.contains(C) || u();
    }, x = setTimeout(() => {
      document.addEventListener("touchstart", M, { passive: !0 });
    }, 100);
    return () => {
      clearTimeout(x), document.removeEventListener("touchstart", M);
    };
  }, [n.isVisible, u]), V(() => {
    if (!n.isVisible) return;
    const M = () => {
      u();
    }, x = e.view.dom.closest(".editor-content-wrapper");
    return x?.addEventListener("scroll", M), window.addEventListener("scroll", M, !0), () => {
      x?.removeEventListener("scroll", M), window.removeEventListener("scroll", M, !0);
    };
  }, [n.isVisible, e, u]);
  const [p, g] = Y(!1), m = z(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      g(!0), setTimeout(() => g(!1), 1500);
    });
  }, [n.url]), y = z(() => {
    if (n.url) {
      const M = window.webkit?.messageHandlers?.openURL;
      if (M)
        M.postMessage(n.url);
      else {
        const x = document.createElement("a");
        x.href = n.url, x.target = "_blank", x.rel = "noopener noreferrer", x.click();
      }
    }
  }, [n.url]), b = z(() => {
    if (n.linkElement) {
      const { view: M } = e, { doc: x } = M.state;
      let D = null, C = null;
      x.descendants((N, A) => {
        if (N.isText && N.marks.some((P) => P.type.name === "link")) {
          const P = M.nodeDOM(A);
          if (P && (P === n.linkElement || P.parentElement === n.linkElement))
            return D = A, C = A + N.nodeSize, !1;
        }
        return !0;
      }), D !== null && C !== null ? e.chain().focus().setTextSelection({ from: D, to: C }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((M) => ({ ...M, isVisible: !1 }));
  }, [e, n.linkElement]), v = z(() => {
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
      children: /* @__PURE__ */ R("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ R(
          "button",
          {
            onClick: y,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ h(Of, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ h("span", { className: "link-hover-tooltip-url", children: w || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ R("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: v,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ h(_f, { size: 14 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: m,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: p ? /* @__PURE__ */ h(In, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ h(Rn, { size: 14 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: b,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ h($f, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ h(Yt, { children: E });
}
const VC = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ h(yo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ h(Hf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ h(Bf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ h(Wf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ h(zf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ h(Ff, { size: 16 }),
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
    icon: /* @__PURE__ */ h(Uf, { size: 16 }),
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
    icon: /* @__PURE__ */ h(El, { size: 16 }),
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
    icon: /* @__PURE__ */ h(jf, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ h(Yf, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ h(Ml, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ h(Tl, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ h(Sl, { size: 16, className: "text-cyan-400" }),
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
], KC = 32, GC = 8, qC = 320, XC = 210, qr = 12;
function dl(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const o = t.getRangeAt(0), s = o.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const i = document.createElement("span");
        i.textContent = "​", o.cloneRange().insertNode(i);
        const l = i.getBoundingClientRect(), c = { top: l.top, bottom: l.bottom, left: l.left };
        return i.parentNode?.removeChild(i), t.removeAllRanges(), t.addRange(o), c;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, r = e.view.coordsAtPos(n);
    return { top: r.top, bottom: r.bottom, left: r.left };
  } catch {
    return null;
  }
}
function ZC({ editor: e }) {
  const [t, n] = Y(!1), [r, o] = Y(""), [s, i] = Y(0), [a, l] = Y(null), [c, d] = Y(!1), [u, f] = Y({ top: 0, left: 0 }), [p, g] = Y("below"), m = j(null), y = j(-1), b = j(!1);
  V(() => {
    b.current = t;
  }, [t]);
  const v = VC.filter((D) => {
    if (!r) return !0;
    const C = r.toLowerCase();
    return D.title.toLowerCase().includes(C) || D.keywords?.some((N) => N.includes(C));
  }), w = Math.min(
    v.length * KC + GC,
    qC
  );
  go(() => {
    if (!t || !a) return;
    const { top: D, bottom: C, left: N } = a, A = window.innerHeight, P = window.innerWidth, O = A - C - qr, _ = D - qr;
    let W;
    if (O >= w ? W = "below" : _ >= w ? W = "above" : W = O >= _ ? "below" : "above", g(W), m.current) {
      const F = Math.max(
        qr,
        Math.min(N, P - XC - qr)
      ), I = W === "below" ? C + 4 : D - w - 4;
      m.current.style.top = `${I}px`, m.current.style.left = `${F}px`;
    }
  }, [t, a, w, v.length]);
  const T = z(() => {
    const { state: D } = e, { selection: C } = D, N = C.from, A = y.current;
    if (A >= 0 && A <= N)
      e.chain().focus().deleteRange({ from: A, to: N }).run();
    else {
      const { $from: P } = C, _ = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if (_ !== -1) {
        const W = P.pos - (P.parentOffset - _);
        e.chain().focus().deleteRange({ from: W, to: P.pos }).run();
      }
    }
  }, [e]), k = z(() => {
    n(!1), o(""), i(0), y.current = -1, l(null);
  }, []), E = z((D) => {
    const C = v[D];
    if (C) {
      if (T(), C.isImageCommand) {
        const { state: N } = e, A = e.view.coordsAtPos(N.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), d(!0);
      } else
        C.command(e);
      k();
    }
  }, [e, v, T, k]), M = z((D, C) => {
    e.chain().focus().setImage({ src: D, alt: C }).run();
  }, [e]);
  return V(() => {
    if (!e) return;
    const D = () => {
      if (b.current) return;
      const { state: C } = e, { selection: N } = C, { $from: A } = N;
      if (A.parentOffset === 0) return;
      const P = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = A.pos - 1;
      const _ = dl(e);
      _ && (l(_), n(!0), o(""), i(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), V(() => {
    if (!e || !t) return;
    const D = e.view.dom, C = (N) => {
      b.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A + 1) % v.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A - 1 + v.length) % v.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), E(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), k()));
    };
    return D.addEventListener("keydown", C, !0), () => {
      D.removeEventListener("keydown", C, !0);
    };
  }, [e, t, s, v, E, k]), V(() => {
    if (!e || !t) return;
    const D = () => {
      if (!b.current || y.current < 0) return;
      const { state: C } = e, { selection: N } = C, A = N.from, P = y.current;
      if (A <= P) {
        k();
        return;
      }
      try {
        const O = C.doc.textBetween(P + 1, A, void 0, "￼");
        if (O.includes(`
`)) {
          k();
          return;
        }
        o(O), i(0);
        const _ = dl(e);
        _ && l(_);
      } catch {
        k();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, t, k]), V(() => {
    if (!t) return;
    const D = (C) => {
      m.current && !m.current.contains(C.target) && k();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [t, k]), V(() => {
    t && v.length === 0 && r.length > 2 && k();
  }, [t, v.length, r, k]), V(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), V(() => {
    if (!t || !m.current) return;
    const D = m.current.querySelector(".slash-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [t, s]), c ? /* @__PURE__ */ h(
    Bl,
    {
      isOpen: c,
      onClose: () => d(!1),
      onInsert: M,
      position: u
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ h(Yt, { children: /* @__PURE__ */ h(
    "div",
    {
      ref: m,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((D, C) => /* @__PURE__ */ R(
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
const QC = 340, JC = 36, e1 = 8, t1 = 240, Xr = 8;
function ul(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const o = t.getRangeAt(0), s = o.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const i = document.createElement("span");
        i.textContent = "​", o.cloneRange().insertNode(i);
        const l = i.getBoundingClientRect(), c = { top: l.top, bottom: l.bottom, left: l.left };
        return i.parentNode?.removeChild(i), t.removeAllRanges(), t.addRange(o), c;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, r = e.view.coordsAtPos(n);
    return { top: r.top, bottom: r.bottom, left: r.left };
  } catch {
    return null;
  }
}
function n1({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = Y(!1), [s, i] = Y(""), [a, l] = Y([]), [c, d] = Y(0), [u, f] = Y(null), [p, g] = Y("below"), [m, y] = Y(!1), b = j(!1), v = j(null), w = j(-1), T = j(null);
  V(() => {
    b.current = r;
  }, [r]);
  const k = z(() => {
    o(!1), i(""), l([]), d(0), w.current = -1;
  }, []), E = z((N) => {
    const A = w.current;
    if (A < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const _ = P.tr.delete(A, O), W = P.schema.marks.wikiLink;
      if (W) {
        const F = W.create({ pageName: N }), I = P.schema.text(N, [F]);
        _.insert(A, I);
        const H = A + N.length;
        _.setSelection(et.create(_.doc, H)), _.removeStoredMark(W);
      } else
        _.insertText(`[[${N}]]`, A);
      e.view.dispatch(_), e.view.focus();
    } catch (_) {
      console.warn("WikiLinkAutocomplete: Error inserting link", _);
    }
    k();
  }, [e, k]);
  V(() => {
    if (!e) return;
    const N = () => {
      if (b.current) return;
      const { state: A } = e, { selection: P } = A, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      w.current = O.pos - 2;
      const W = ul(e);
      W && (f(W), o(!0), i(""), l([]), d(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), V(() => {
    if (!e || !r) return;
    const N = e.view.dom, A = (P) => {
      if (b.current) {
        if (P.key === "ArrowDown") {
          P.preventDefault();
          const O = a.length + (s.trim() ? 1 : 0) - 1;
          d((_) => Math.min(_ + 1, O));
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), d((O) => Math.max(O - 1, 0));
          return;
        }
        if (P.key === "Enter" || P.key === "Tab") {
          P.preventDefault(), P.stopPropagation(), c < a.length ? E(a[c].title) : s.trim() && n ? (n(s.trim()), k()) : s.trim() && E(s.trim());
          return;
        }
        if (P.key === "Escape") {
          P.preventDefault(), k();
          return;
        }
        P.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: _ } = O.selection;
          _.parent.textBetween(0, _.parentOffset, void 0, "￼").endsWith("]]") && k();
        }, 0);
      }
    };
    return N.addEventListener("keydown", A, !0), () => {
      N.removeEventListener("keydown", A, !0);
    };
  }, [e, r, a, c, s, E, k, n]), V(() => {
    if (!e || !r) return;
    const N = () => {
      const A = w.current;
      if (A < 0) {
        k();
        return;
      }
      const { state: P } = e, O = P.selection.from;
      if (O <= A) {
        k();
        return;
      }
      try {
        const _ = P.doc.textBetween(A + 2, O, void 0, "￼");
        if (_.includes(`
`) || _.includes("]]")) {
          k();
          return;
        }
        i(_), d(0);
        const W = ul(e);
        W && f(W);
      } catch {
        k();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, k]), V(() => {
    if (r) {
      if (T.current && clearTimeout(T.current), !s.trim()) {
        y(!0), T.current = setTimeout(async () => {
          try {
            const N = await t("");
            l(N);
          } catch {
            l([]);
          }
          y(!1);
        }, 100);
        return;
      }
      return y(!0), T.current = setTimeout(async () => {
        try {
          const N = await t(s.trim());
          l(N);
        } catch {
          l([]);
        }
        y(!1);
      }, 150), () => {
        T.current && clearTimeout(T.current);
      };
    }
  }, [r, s, t]), V(() => {
    if (!r) return;
    const N = (A) => {
      v.current && !v.current.contains(A.target) && k();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, k]), V(() => {
    if (!r || !v.current) return;
    const N = v.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, c]);
  const M = a.length + (s.trim() ? 1 : 0), x = Math.min(
    Math.max(M, 1) * JC + e1,
    t1
  );
  if (go(() => {
    if (!r || !u) return;
    const { top: N, bottom: A, left: P } = u, O = window.innerHeight, _ = window.innerWidth, W = O - A - Xr, F = N - Xr;
    let I;
    if (W >= x ? I = "below" : F >= x ? I = "above" : I = W >= F ? "below" : "above", g(I), v.current) {
      const H = Math.max(
        Xr,
        Math.min(P, _ - QC - Xr)
      ), q = I === "below" ? A + 4 : N - x - 4;
      v.current.style.top = `${q}px`, v.current.style.left = `${H}px`;
    }
  }, [r, u, x, M]), !r) return null;
  const D = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ h(Yt, { children: /* @__PURE__ */ R(
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
        a.map((N, A) => /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item ${A === c ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), E(N.title);
            },
            onMouseEnter: () => d(A),
            children: [
              /* @__PURE__ */ h("span", { className: "wikilink-icon", children: /* @__PURE__ */ h(Qs, { size: 14 }) }),
              /* @__PURE__ */ h("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ h("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        D && /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === c ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), k()) : E(s.trim());
            },
            onMouseEnter: () => d(a.length),
            children: [
              /* @__PURE__ */ h("span", { className: "wikilink-icon", children: /* @__PURE__ */ h(Xs, { size: 14 }) }),
              /* @__PURE__ */ R("span", { className: "wikilink-label", children: [
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
function r1({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = Y(e), [l, c] = Y(t), d = j(null), u = j(null);
  V(() => {
    u.current?.focus(), u.current?.select();
  }, []), V(() => {
    const y = (v) => {
      d.current && !d.current.contains(v.target) && s();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [s]), V(() => {
    const y = (b) => {
      b.key === "Escape" ? s() : b.key === "Enter" && (b.metaKey || b.ctrlKey) && f();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i, l, s]);
  const f = () => {
    i.trim() && r(i.trim(), l.trim());
  }, g = (() => {
    let w = n.x - 160, T = n.y + 10;
    return w + 320 > window.innerWidth - 16 && (w = window.innerWidth - 320 - 16), w < 16 && (w = 16), T + 280 > window.innerHeight - 16 && (T = n.y - 280 - 10), T < 16 && (T = 16), { left: w, top: T };
  })(), m = /* @__PURE__ */ R(
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
        /* @__PURE__ */ R("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ h("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ h(Mt, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ R("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ R("label", { className: "image-edit-popover-label", children: [
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
          /* @__PURE__ */ R("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ R("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ h(yo, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ h("span", { children: "Alt Text" })
            ] }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: l,
                onChange: (y) => c(y.target.value),
                placeholder: "Describe the image...",
                className: "image-edit-popover-input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ R("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ h(xn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ R("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ h(
              "button",
              {
                onClick: s,
                className: "image-edit-popover-btn image-edit-popover-btn-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ R(
              "button",
              {
                onClick: f,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !i.trim(),
                children: [
                  /* @__PURE__ */ h(In, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ h(Yt, { children: m });
}
function o1({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = Y(!1), [o, s] = Y(0), i = z((d) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer?.types.includes("Files") && (s((u) => u + 1), r(!0));
  }, []), a = z((d) => {
    d.preventDefault(), d.stopPropagation(), s((u) => {
      const f = u - 1;
      return f === 0 && r(!1), f;
    });
  }, []), l = z((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), c = z((d) => {
    d.preventDefault(), d.stopPropagation(), r(!1), s(0);
  }, []);
  return V(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", i), d.addEventListener("dragleave", a), d.addEventListener("dragover", l), d.addEventListener("drop", c), () => {
      d.removeEventListener("dragenter", i), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", l), d.removeEventListener("drop", c);
    };
  }, [t, e, i, a, l, c]), n ? /* @__PURE__ */ h("div", { className: "image-drop-zone", children: /* @__PURE__ */ R("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ h("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ h(Vf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ R("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ h("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ h("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
const s1 = {
  SpellCheck: Gf,
  RefreshCw: Kf,
  Minimize2: Ll,
  Maximize2: Dl,
  FileText: Qs,
  MessageSquare: Al,
  Sparkles: vo
};
function a1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = Y(""), [a, l] = Y(!1), c = j(null), d = j(null), u = e.filter((y) => y.scope === t || y.scope === "both");
  V(() => {
    const y = (v) => {
      c.current && !c.current.contains(v.target) && r();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [r]), V(() => {
    const y = (b) => {
      b.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), V(() => {
    a && d.current && d.current.focus();
  }, [a]);
  const p = z(() => {
    const b = u.length * 40 + (a ? 56 : 0) + 16, v = window.innerWidth, w = window.innerHeight;
    let T = o.top, k = o.left;
    return k + 260 > v - 8 && (k = v - 260 - 8), k < 8 && (k = 8), T + b > w - 8 && (T = o.top - b - 8), T < 8 && (T = 8), { top: T, left: k };
  }, [o, u.length, a])(), g = () => {
    s.trim() && (n("custom", s.trim()), i(""), l(!1));
  }, m = /* @__PURE__ */ h(
    "div",
    {
      ref: c,
      className: "ai-dropdown-menu",
      style: {
        position: "fixed",
        top: p.top,
        left: p.left
      },
      children: /* @__PURE__ */ R(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-lg overflow-hidden
          w-[260px] py-1
          animate-in fade-in-0 zoom-in-95 duration-100
        `,
          children: [
            /* @__PURE__ */ h("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ R("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ h(Al, { size: 14, className: "text-muted-foreground shrink-0" }),
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
                  onFocus: () => l(!0),
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
              const b = y.icon ? s1[y.icon] : vo;
              return /* @__PURE__ */ R(
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
  return /* @__PURE__ */ h(Yt, { onMouseDown: (y) => y.preventDefault(), children: m });
}
function i1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = j(null), a = j(null), [l, c] = Y(!1), [d, u] = Y(0);
  V(() => {
    if (i.current) {
      const k = new ResizeObserver((E) => {
        for (const M of E)
          u(M.contentRect.height);
      });
      return k.observe(i.current), () => k.disconnect();
    }
  }, []), V(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), V(() => {
    const k = (E) => {
      E.key === "Escape" && s();
    };
    return document.addEventListener("keydown", k), () => document.removeEventListener("keydown", k);
  }, [s]);
  const f = zt(() => {
    const x = window.innerWidth, D = window.innerHeight;
    let C = t.selectionCenterX - 380 / 2;
    C + 380 > x - 8 && (C = x - 380 - 8), C < 8 && (C = 8);
    const N = D - t.selectionBottom - 8, A = t.selectionTop - 8, P = d || 200;
    let O, _ = !1;
    return N >= P || N >= A ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, _ = !0), O < 8 && (O = 8), O + P > D - 8 && (O = D - P - 8), { top: O, left: C, placedAbove: _ };
  }, [t, d]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", m = e.status === "streaming", y = e.status === "complete", b = e.status === "error", v = z(() => {
    navigator.clipboard.writeText(p), c(!0), setTimeout(() => c(!1), 1500);
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
      children: /* @__PURE__ */ R(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-xl overflow-hidden
          w-[380px] max-w-[calc(100vw-16px)]
          ${w}
        `,
          children: [
            /* @__PURE__ */ R("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ R("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                m && /* @__PURE__ */ h(Nl, { size: 12, className: "animate-spin" }),
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
                  children: /* @__PURE__ */ h(Mt, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ h(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: b ? /* @__PURE__ */ h("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ R("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  m && /* @__PURE__ */ h("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ R("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || b) && /* @__PURE__ */ R(we, { children: [
                y && /* @__PURE__ */ R(we, { children: [
                  /* @__PURE__ */ h(
                    bn,
                    {
                      icon: bs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ h(
                    bn,
                    {
                      icon: Xs,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ h(
                    bn,
                    {
                      icon: l ? In : Rn,
                      label: l ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ h(
                  bn,
                  {
                    icon: Zs,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ h("div", { className: "flex-1" }),
                /* @__PURE__ */ h(
                  bn,
                  {
                    icon: Mt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              m && /* @__PURE__ */ R(we, { children: [
                /* @__PURE__ */ h("div", { className: "flex-1" }),
                /* @__PURE__ */ h(
                  bn,
                  {
                    icon: Mt,
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
  return /* @__PURE__ */ h(Yt, { onMouseDown: (k) => k.preventDefault(), children: T });
}
function bn({
  icon: e,
  label: t,
  onClick: n,
  primary: r = !1
}) {
  return /* @__PURE__ */ R(
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
function l1({
  editor: e,
  isMobile: t,
  disabledFeatures: n,
  containerRef: r,
  editable: o,
  showFloatingToolbar: s,
  isLinkPopoverOpen: i,
  aiEnabled: a,
  onAISetupRequired: l,
  onAISparklesClick: c,
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
  return /* @__PURE__ */ R(we, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ h(o1, { containerRef: r, enabled: o }),
    !t && s && /* @__PURE__ */ h(
      FC,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: i,
        aiEnabled: a || !!l,
        onAISparklesClick: (A) => c(A),
        onCopySelectionAsMarkdown: d
      }
    ),
    u && f && /* @__PURE__ */ h(
      a1,
      {
        actions: f,
        scope: u.scope,
        position: u.position,
        onAction: p,
        onClose: g
      }
    ),
    m.status !== "idle" && /* @__PURE__ */ h(
      i1,
      {
        state: m,
        position: y,
        onReplace: b,
        onInsert: v,
        onRetry: w,
        onDiscard: T
      }
    ),
    !n.slashCommands && /* @__PURE__ */ h(ZC, { editor: e, disabledFeatures: n }),
    !n.wikiLinks && M && /* @__PURE__ */ h(n1, { editor: e, onSearch: M }),
    /* @__PURE__ */ h(
      UC,
      {
        editor: e,
        isOpen: i,
        onClose: k
      }
    ),
    /* @__PURE__ */ h(YC, { editor: e, onEditLink: E }),
    !n.images && x?.isOpen && /* @__PURE__ */ h(
      r1,
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
function c1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function d1(e, t) {
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
function u1(e) {
  const [t, n] = of(d1, { status: "idle" }), r = j(null), o = z(async (a, l, c, d, u) => {
    if (e) {
      n({
        type: "start-streaming",
        action: a,
        actionLabel: l,
        inputText: c,
        selectionRange: d
      });
      try {
        const f = e(a, c, u);
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
  }, [e]), s = z(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = z(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const fl = sf(
  () => Promise.resolve().then(() => E1).then((e) => ({ default: e.TableOfContents }))
), f1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, uE = af(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  onDocUpdate: s,
  markdownChangeDebounceMs: i = 0,
  placeholder: a = 'Start writing... Use "/" for commands',
  editable: l = !0,
  autofocus: c = !1,
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
  initialMode: A = "wysiwyg",
  onModeChange: P,
  onReady: O,
  onFocus: _,
  onBlur: W,
  onSelectionChange: F,
  onDestroy: I,
  onSave: H,
  onRecover: q,
  onWikiLinkClick: ee,
  validateWikiLink: te,
  onWikiLinkSearch: ne,
  onLinkClick: X,
  findReplaceOpen: $,
  onFindReplaceChange: Z,
  showCopyButton: L = !0,
  renderToolbar: B,
  renderFooter: U,
  disabledFeatures: K = {},
  minHeight: oe = "200px",
  maxHeight: ae,
  spellCheck: ve = !0,
  steadyCaret: xe = !1,
  headingLevels: Ne = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: it = [1, 2, 3],
  // TOC props
  showTableOfContents: Xe = !1,
  tocVisible: lt = !0,
  onTocVisibilityChange: Lt,
  tocTitle: Vt = "",
  tocMinLevel: Kt = 1,
  tocMaxLevel: De = 4,
  tocShowLevelIndicators: $e = !1,
  tocHighlightActive: je = !0,
  tocTreeView: Le = !1,
  tocWidth: At = "240px",
  tocPosition: vt = "right",
  tocScrollOffset: gr = 20,
  onTocItemClick: yr,
  renderTocItem: vr,
  tocShowToggleButton: br = !0,
  // Raw markdown editor
  autoClosePairs: Po = !0,
  // Performance profiler
  showPerformanceProfiler: Oo = !1,
  onPerformanceProfilerClose: _o,
  // Auto reorder checklist
  autoReorderChecklist: $o = !1,
  // Expand selection
  progressiveSelectAll: wr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: kr = !1,
  enableHexColorHighlight: ue = !1,
  enableCollapsibleHeadings: ye = !1,
  enableCollapsibleLists: le = !1,
  // Performance mode
  performanceMode: he = "auto",
  // Error boundary
  onEditorError: He,
  // AI writing assistant
  aiActions: pe,
  onAIAction: dn,
  onAISetupRequired: un
}, Ho) {
  const [Rt] = Y(() => f1()), [It, Mu] = Y(A), [Sa, Bo] = Y(""), xr = j(A), Cr = j(""), fn = j(null), [Tu, Na] = Y(0), Er = !!(pe && pe.length > 0 && dn), { state: Ze, executeAction: Mr, abort: Su, reset: Pt } = u1(dn), [Nu, Wo] = Y(null), [Du, Lu] = Y({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), Au = j(dn);
  Au.current = dn;
  const Da = j(un);
  Da.current = un;
  const [Ru, Iu] = Y([]), [Pu, Ou] = Y(0), _u = z((ie, Me) => {
    Iu(ie), Ou(Me);
  }, []), La = j(E), Aa = j(M), Ra = j(x), Ia = j(D), Pa = j(C), Oa = j(ee), _a = j(te), $a = j(ne);
  La.current = E, Aa.current = M, Ra.current = x, Ia.current = D, Pa.current = C, Oa.current = ee, _a.current = te, $a.current = ne;
  const Ha = 2e3, [zo, $u] = Y(() => he === "lightweight" ? !0 : he === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Ha : !1), Hu = j(0), Ba = j(zo);
  Ba.current = zo;
  const [Fo, Tr] = Y(null), Bu = aC({
    placeholder: a,
    isMobile: Rt,
    maxImageSize: k,
    headingLevels: Ne,
    collapsibleHeadingLevels: it,
    disabledFeatures: K,
    progressiveSelectAll: wr,
    enableCollapsibleHeadings: ye,
    enableCollapsibleLists: le,
    enableTagAutoDetect: kr,
    enableHexColorHighlight: ue,
    isLightweight: zo,
    setImageEditState: Tr,
    callbackRefs: {
      onImageUploadStart: La,
      onImageUploadComplete: Aa,
      onImageUploadError: Ra,
      onImageUpload: Ia,
      resolveImageSrc: Pa,
      onWikiLinkClick: Oa,
      validateWikiLink: _a
    }
  }), { editor: se, turndownService: Sr } = uC({
    extensions: Bu,
    content: t,
    editable: l,
    autofocus: c,
    spellCheck: ve,
    initialMode: A,
    performanceMode: he,
    lightweightThreshold: Ha,
    onChange: n,
    onHTMLChange: r,
    onMarkdownChange: o,
    onDocUpdate: s,
    markdownChangeDebounceMs: i,
    onReady: O,
    onDestroy: I,
    onFocus: _,
    onBlur: W,
    onSelectionChange: F,
    onLinkClick: X,
    editorModeRef: xr,
    rawMarkdownRef: Cr,
    setRawMarkdown: Bo,
    setIsLightweight: $u,
    lightweightCheckCounterRef: Hu,
    isLightweightRef: Ba
  }), [Wu, Nr] = Y(!1), [zu, Fu] = Y(!1), Uu = $ !== void 0 ? $ : zu, Gt = z((ie) => {
    Fu(ie), Z?.(ie);
  }, [Z]), [ju, Dr] = Y(0), [Yu, Vu] = Y(""), qt = db(se, {
    storageKey: b,
    debounceMs: v,
    enabled: y,
    onSave: (ie) => {
      H?.(ie);
    },
    onRecover: (ie) => {
      q?.(ie);
    }
  }), Uo = MC({
    editor: se,
    turndownService: Sr,
    editorModeRef: xr,
    rawMarkdownRef: Cr,
    setEditorMode: Mu,
    setRawMarkdown: Bo,
    onModeChange: P,
    enableTagAutoDetect: kr,
    disabledFeatures: K
  }), Wa = z((ie) => {
    Bo(ie), Cr.current = ie, o?.(ie);
  }, [o]), Lr = SC(se, {
    debounceMs: p,
    extendedStats: !1,
    enabled: f
  });
  fb(Ho, {
    editor: se,
    turndownService: Sr,
    editorModeRef: xr,
    handleModeSwitch: Uo,
    wordCount: Lr,
    autoSaveState: qt,
    setIsFindReplaceOpen: Gt,
    setFindReplaceFocusTrigger: Dr
  }), EC({
    editorModeRef: xr,
    rawMarkdownRef: Cr,
    editorMode: It,
    handleModeSwitch: Uo,
    setIsFindReplaceOpen: Gt,
    setFindReplaceFocusTrigger: Dr
  });
  const Ku = zt(() => ({
    openLinkPopover: () => Nr(!0),
    openFindReplace: (ie) => {
      ie && Vu(ie), Gt(!0), Dr((Me) => Me + 1);
    },
    openFindReplaceWithReplace: () => {
      Gt(!0);
    }
  }), [Gt]);
  CC(se, Rt, Ku);
  const za = z((ie, Me) => {
    if (!Er) {
      Da.current?.();
      return;
    }
    if (!se) return;
    let ze = { top: 0, left: 0 };
    if (Me) {
      const Be = Me.getBoundingClientRect();
      ze = { top: Be.bottom + 4, left: Be.left };
    } else {
      const { from: Be, to: ct } = se.state.selection, Ot = se.view.coordsAtPos(Be), pn = se.view.coordsAtPos(ct);
      ze = { top: pn.bottom + 8, left: (Ot.left + pn.left) / 2 };
    }
    Wo({ scope: ie, position: ze });
  }, [Er, se]), Gu = z((ie, Me) => {
    if (!se || !pe) return;
    const ze = pe.find((jo) => jo.id === ie);
    if (!ze) return;
    const { from: Be, to: ct } = se.state.selection, Ot = Be !== ct ? se.state.doc.textBetween(Be, ct, `
`) : "", pn = ze.scope === "document" || !Ot ? se.getText() : Ot, Ar = se.view.coordsAtPos(Be), zn = se.view.coordsAtPos(ct);
    Lu({
      selectionTop: Ar.top,
      selectionBottom: zn.bottom,
      selectionCenterX: (Ar.left + zn.right) / 2
    }), Wo(null), Mr(ie, ze.label, pn, { from: Be, to: ct }, Me);
  }, [se, pe, Mr]), qu = z(() => {
    if (!se || Ze.status !== "complete") return;
    const { selectionRange: ie, result: Me } = Ze;
    se.chain().focus().setTextSelection(ie).deleteSelection().insertContent(Me).run(), Pt();
  }, [se, Ze, Pt]), Xu = z(() => {
    if (!se || Ze.status !== "complete") return;
    const { selectionRange: ie, result: Me } = Ze;
    se.chain().focus().setTextSelection(ie.to).insertContent(`
` + Me).run(), Pt();
  }, [se, Ze, Pt]), Zu = z(() => {
    if (!(Ze.status !== "complete" && Ze.status !== "error"))
      if (Ze.status === "complete") {
        const { action: ie, actionLabel: Me, inputText: ze, selectionRange: Be } = Ze;
        Pt(), Mr(ie, Me, ze, Be);
      } else
        Pt();
  }, [Ze, Pt, Mr]), Fa = z(() => {
    if (!se) return;
    const { from: ie, to: Me, empty: ze } = se.state.selection;
    let Be, ct;
    if (ze)
      Be = se.getHTML(), ct = se.getText();
    else {
      const pn = se.state.doc.slice(ie, Me), Ar = Js.fromSchema(se.schema), zn = document.createElement("div"), jo = Ar.serializeFragment(pn.content);
      zn.appendChild(jo), Be = zn.innerHTML, ct = se.state.doc.textBetween(ie, Me, `
`);
    }
    let Ot = Wt(Sr.turndown(Be));
    ze && (Ot = Is(Ot)), navigator.clipboard.writeText(Ot).then(() => {
      uo(ze ? "Document copied as Markdown" : "Selection copied as Markdown");
    }).catch(() => {
      navigator.clipboard.writeText(ct).then(() => {
        uo(ze ? "Document copied" : "Selection copied");
      });
    });
  }, [se, Sr]);
  if (V(() => {
    if (!g) return;
    const ie = document.documentElement;
    ie.setAttribute("data-theme", g), ie.classList.toggle("dark", g === "dark");
  }, [g]), !se)
    return /* @__PURE__ */ h(PC, { className: d, theme: g });
  const Ua = /* @__PURE__ */ h(
    ob,
    {
      editor: se,
      onCopyMarkdown: L ? Fa : void 0,
      onOpenLinkPopover: () => Nr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Gt(!0), Dr((ie) => ie + 1);
      },
      disabledFeatures: K,
      autoReorderChecklist: $o,
      aiEnabled: Er || !!un,
      onAISparklesClick: (ie) => za("document", ie)
    }
  ), ja = /* @__PURE__ */ R("div", { className: "editor-footer", children: [
    y && /* @__PURE__ */ h(
      NC,
      {
        status: qt.status,
        lastSaved: qt.lastSaved
      }
    ),
    /* @__PURE__ */ h("div", { className: "word-count", children: /* @__PURE__ */ R("span", { children: [
      Lr.words,
      " words"
    ] }) })
  ] }), Qu = {
    minHeight: oe,
    ...ae && { maxHeight: ae, overflowY: "auto" }
  };
  return /* @__PURE__ */ R("div", { className: `markdown-editor-container ${m === "neutral" ? "color-theme-neutral" : ""} ${d}`, "data-theme": g, children: [
    y && w && qt.hasRecoverableContent && /* @__PURE__ */ h(
      DC,
      {
        onRecover: () => {
          qt.recover();
        },
        onDismiss: qt.dismissRecovery
      }
    ),
    u && /* @__PURE__ */ R("div", { className: "flex items-center bg-card/50 border-b border-border/30 editor-toolbar-wrapper", children: [
      B ? B(se, Ua) : Ua,
      N && /* @__PURE__ */ h(OC, { editorMode: It, onModeSwitch: Uo })
    ] }),
    !Rt && /* @__PURE__ */ h(
      sb,
      {
        editor: se,
        isOpen: Uu,
        onClose: () => Gt(!1),
        focusTrigger: ju,
        initialSearchQuery: Yu,
        editorMode: It,
        rawMarkdown: Sa,
        onRawMarkdownChange: Wa,
        onMatchesChange: _u
      }
    ),
    /* @__PURE__ */ h(lb, { editor: se }),
    /* @__PURE__ */ R("div", { className: `editor-main-area ${Xe ? "editor-with-toc" : ""}`, children: [
      Xe && vt === "left" && /* @__PURE__ */ h(Ya, { fallback: null, children: /* @__PURE__ */ h(
        fl,
        {
          editor: se,
          visible: lt,
          onVisibilityChange: Lt,
          title: Vt,
          minLevel: Kt,
          maxLevel: De,
          showLevelIndicators: $e,
          highlightActive: je,
          treeView: Le,
          width: At,
          position: vt,
          scrollOffset: gr,
          onItemClick: yr,
          renderItem: vr,
          showToggleButton: br,
          scrollContainerRef: fn
        }
      ) }),
      /* @__PURE__ */ R(
        IC,
        {
          resetKey: `${t}-${Tu}`,
          onRetry: () => Na((ie) => ie + 1),
          onClearContent: () => {
            se && se.commands.clearContent(), n?.(""), r?.(""), o?.(""), Na((ie) => ie + 1);
          },
          onError: He,
          children: [
            /* @__PURE__ */ h("div", { className: "editor-content-wrapper", ref: fn, style: Qu, children: It === "wysiwyg" ? /* @__PURE__ */ R(we, { children: [
              /* @__PURE__ */ h(ef, { editor: se, className: "editor-content" }),
              xe && se && /* @__PURE__ */ h(BC, { editor: se, containerRef: fn }),
              /* @__PURE__ */ h(
                l1,
                {
                  editor: se,
                  isMobile: Rt,
                  disabledFeatures: K,
                  containerRef: fn,
                  editable: l,
                  showFloatingToolbar: T,
                  isLinkPopoverOpen: Wu,
                  aiEnabled: Er,
                  onAISetupRequired: un,
                  onAISparklesClick: (ie) => za("selection", ie),
                  onCopySelectionAsMarkdown: Fa,
                  aiDropdown: Nu,
                  aiActions: pe,
                  onAIActionSelect: Gu,
                  onAIDropdownClose: () => Wo(null),
                  aiState: Ze,
                  aiPopoverPosition: Du,
                  onAIReplace: qu,
                  onAIInsert: Xu,
                  onAIRetry: Zu,
                  onAIDiscard: () => {
                    Su(), Pt();
                  },
                  onLinkPopoverClose: () => Nr(!1),
                  onEditLink: () => Nr(!0),
                  onWikiLinkSearch: $a.current,
                  imageEditState: Fo,
                  onImageSave: (ie, Me) => {
                    se.chain().focus().setNodeSelection(Fo.pos).updateAttributes("resizableImage", {
                      src: ie,
                      alt: Me
                    }).run(), Tr(null);
                  },
                  onImageDelete: () => {
                    se.chain().focus().setNodeSelection(Fo.pos).deleteSelection().run(), Tr(null);
                  },
                  onImageEditClose: () => Tr(null)
                }
              )
            ] }) : /* @__PURE__ */ h(
              LC,
              {
                content: Sa,
                onChange: Wa,
                placeholder: "Write your markdown here...",
                editable: l,
                autofocus: !0,
                searchMatches: Ru,
                currentMatchIndex: Pu,
                autoClosePairs: Po
              }
            ) }),
            /* @__PURE__ */ h(c1, { scrollContainerRef: fn })
          ]
        }
      ),
      Xe && vt === "right" && /* @__PURE__ */ h(Ya, { fallback: null, children: /* @__PURE__ */ h(
        fl,
        {
          editor: se,
          visible: lt,
          onVisibilityChange: Lt,
          title: Vt,
          minLevel: Kt,
          maxLevel: De,
          showLevelIndicators: $e,
          highlightActive: je,
          treeView: Le,
          width: At,
          position: vt,
          scrollOffset: gr,
          onItemClick: yr,
          renderItem: vr,
          showToggleButton: br,
          scrollContainerRef: fn
        }
      ) })
    ] }),
    f && (U ? U(
      { words: Lr.words, characters: Lr.characters },
      qt.status,
      ja
    ) : ja),
    /* @__PURE__ */ h(RC, { visible: Oo, onClose: _o, editor: se })
  ] });
}), fE = bo.create({
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
      Pn(this.options.HTMLAttributes, t, {
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
}), wu = {
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
}, p1 = {
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
}, h1 = {
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
}, m1 = {
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
}, Xn = {
  dark: wu,
  light: p1,
  sepia: h1,
  nord: m1
};
function g1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function pE(e, t, n, r) {
  const o = Xn[e] || wu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const ku = bl(null);
function hE({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = Y(t), s = Xn[r] || Xn.dark, i = z((l) => {
    Xn[l] && o(l);
  }, []);
  V(() => {
    n?.current && g1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(Xn)
  };
  return /* @__PURE__ */ h(ku.Provider, { value: a, children: e });
}
function mE() {
  const e = wl(ku);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const pl = [
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
function gE({ node: e, updateAttributes: t }) {
  const [n, r] = Y(!1), o = e.attrs.language || "plaintext";
  pl.find((i) => i.value === o)?.label;
  const s = z(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ R(no, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ h(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: pl.map(({ value: i, label: a }) => /* @__PURE__ */ h("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ h(Nn, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ h(In, { size: 14 }) : /* @__PURE__ */ h(Rn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ h("pre", { className: "code-block-pre", children: /* @__PURE__ */ h("code", { children: /* @__PURE__ */ h(tf, {}) }) })
  ] });
}
const xu = "paragon-editor-toc-width", y1 = 280, Cu = 200, Eu = 500, Vn = 30, hl = 5;
function ml() {
  try {
    const e = localStorage.getItem(xu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= Cu && t <= Eu)
        return t;
    }
  } catch {
  }
  return y1;
}
function v1(e) {
  try {
    localStorage.setItem(xu, String(e));
  } catch {
  }
}
function b1(e, t, n) {
  const r = [];
  return e.state.doc.descendants((s, i) => {
    if (s.type.name === "heading") {
      const a = s.attrs.level;
      if (a >= t && a <= n) {
        const l = s.textContent;
        l.trim() && r.push({ id: `toc-heading-${i}`, text: l.trim(), level: a, pos: i });
      }
    }
  }), r;
}
function w1(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t += `${r.pos}:${r.level}:${r.text};`;
  }
  return t;
}
function k1(e) {
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
function gl(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const Hs = Dt(function({
  item: t,
  isActive: n,
  minLevel: r,
  showLevelIndicators: o,
  hasChildren: s,
  isCollapsed: i,
  treeView: a,
  onItemClick: l,
  onToggleCollapse: c,
  style: d
}) {
  const u = (t.level - r) * 14;
  return /* @__PURE__ */ h(
    "div",
    {
      className: `toc-item ${n ? "toc-item-active" : ""} toc-level-${t.level}`,
      style: { paddingLeft: `${u + 10}px`, ...d },
      children: /* @__PURE__ */ R(
        "button",
        {
          className: "toc-item-button",
          onClick: () => l(t),
          title: t.text,
          children: [
            a && s && /* @__PURE__ */ h(
              "span",
              {
                className: "toc-collapse-toggle",
                onClick: (f) => {
                  f.stopPropagation(), c(t.id);
                },
                children: /* @__PURE__ */ h("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: i ? /* @__PURE__ */ h("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ h("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
              }
            ),
            o && /* @__PURE__ */ R("span", { className: "toc-level-indicator", children: [
              "H",
              t.level
            ] }),
            /* @__PURE__ */ h("span", { className: "toc-item-text", children: t.text })
          ]
        }
      )
    }
  );
}), x1 = Dt(function({
  headings: t,
  activeId: n,
  minLevel: r,
  showLevelIndicators: o,
  onItemClick: s,
  onToggleCollapse: i
}) {
  const a = j(null), [l, c] = Y(0), [d, u] = Y(0);
  V(() => {
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
  const f = z((b) => {
    c(b.currentTarget.scrollTop);
  }, []), p = t.length * Vn, g = Math.max(0, Math.floor(l / Vn) - hl), m = Math.min(
    t.length,
    Math.ceil((l + d) / Vn) + hl
  ), y = zt(() => {
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
              top: `${v * Vn}px`,
              left: 0,
              right: 0,
              height: `${Vn}px`
            }
          },
          w.id
        )
      );
    }
    return b;
  }, [t, g, m, n, r, o, s, i]);
  return t.length < 30 ? /* @__PURE__ */ h(we, { children: t.map((b) => /* @__PURE__ */ h(
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
}), C1 = Dt(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: r,
  title: o = "",
  minLevel: s = 1,
  maxLevel: i = 4,
  showLevelIndicators: a = !1,
  highlightActive: l = !0,
  treeView: c = !1,
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
      const L = parseInt(u, 10);
      return isNaN(L) ? ml() : L;
    }
    return ml();
  }), A = j(null), P = j(null), O = j(!1), _ = j(0), W = j(0), F = j("");
  V(() => {
    M(n);
  }, [n]);
  const I = z((L) => {
    L.preventDefault(), L.stopPropagation(), O.current = !0, _.current = L.clientX, W.current = C, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [C]);
  V(() => {
    const L = (U) => {
      if (!O.current) return;
      const K = f === "right" ? _.current - U.clientX : U.clientX - _.current, oe = Math.min(Eu, Math.max(Cu, W.current + K));
      N(oe);
    }, B = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((U) => (v1(U), U)));
    };
    return document.addEventListener("mousemove", L), document.addEventListener("mouseup", B), () => {
      document.removeEventListener("mousemove", L), document.removeEventListener("mouseup", B);
    };
  }, [f]);
  const H = z(() => {
    if (!t || t.isDestroyed) return;
    const L = b1(t, s, i), B = w1(L);
    B !== F.current && (F.current = B, w(L));
  }, [t, s, i]);
  V(() => {
    if (!t) return;
    const L = () => {
      P.current && clearTimeout(P.current), P.current = setTimeout(() => H(), 300);
    };
    return H(), t.on("update", L), t.on("create", L), () => {
      t.off("update", L), t.off("create", L), P.current && clearTimeout(P.current);
    };
  }, [t, H]), V(() => {
    if (!t || !l || !E || v.length === 0) return;
    const L = b?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!L) return;
    const B = () => {
      const oe = L.getBoundingClientRect();
      let ae = null;
      for (let ve = v.length - 1; ve >= 0; ve--) {
        const xe = v[ve], Ne = gl(t, xe.pos);
        if (Ne && Ne.getBoundingClientRect().top - oe.top <= p + 10) {
          ae = xe.id;
          break;
        }
      }
      !ae && v.length > 0 && (ae = v[0].id), k(ae);
    };
    let U;
    const K = () => {
      cancelAnimationFrame(U), U = requestAnimationFrame(B);
    };
    return L.addEventListener("scroll", K, { passive: !0 }), B(), () => {
      L.removeEventListener("scroll", K), cancelAnimationFrame(U);
    };
  }, [t, v, l, E, p, b]);
  const q = z((L) => {
    if (!t || t.isDestroyed) return;
    const B = gl(t, L.pos);
    if (B) {
      const U = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (U) {
        const K = U.getBoundingClientRect(), ae = B.getBoundingClientRect().top - K.top + U.scrollTop;
        U.scrollTo({ top: ae - p, behavior: "smooth" });
      } else
        B.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(L.pos + 1);
    } catch {
    }
    k(L.id), g?.(L);
  }, [t, p, g, b]), ee = z(() => {
    const L = !E;
    M(L), r?.(L);
  }, [E, r]), te = z((L) => {
    D((B) => {
      const U = new Set(B);
      return U.has(L) ? U.delete(L) : U.add(L), U;
    });
  }, []), ne = z((L, B = 0) => {
    if (m) {
      const ae = T === L.id;
      return m(L, ae, () => q(L));
    }
    const U = T === L.id, K = L.children && L.children.length > 0, oe = x.has(L.id);
    return /* @__PURE__ */ R("div", { children: [
      /* @__PURE__ */ h(
        Hs,
        {
          item: L,
          isActive: U,
          minLevel: s,
          showLevelIndicators: a,
          hasChildren: !!K,
          isCollapsed: oe,
          treeView: !0,
          onItemClick: q,
          onToggleCollapse: te
        }
      ),
      K && !oe && /* @__PURE__ */ h("div", { className: "toc-children", children: L.children.map((ae) => ne(ae, B + 1)) })
    ] }, L.id);
  }, [T, x, q, te, s, a, m]), X = z((L) => L.map((B) => ne(B)), [ne]), $ = z(() => m ? v.map((L) => {
    const B = T === L.id;
    return /* @__PURE__ */ h("div", { children: m(L, B, () => q(L)) }, L.id);
  }) : null, [v, T, m, q]);
  if (!t) return null;
  const Z = c ? k1(v) : [];
  return /* @__PURE__ */ R(we, { children: [
    y && /* @__PURE__ */ h(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: ee,
        title: E ? "Hide Table of Contents" : "Show Table of Contents",
        children: E ? /* @__PURE__ */ h(qf, { size: 16 }) : /* @__PURE__ */ h(Xf, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(
      "div",
      {
        ref: A,
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
          /* @__PURE__ */ R("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ h("div", { className: "toc-header", children: /* @__PURE__ */ h("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ h("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ R("div", { className: "toc-empty", children: [
              /* @__PURE__ */ h("p", { children: "No headings yet" }),
              /* @__PURE__ */ h("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ h("div", { className: "toc-list", children: c ? X(Z) : m ? $() : /* @__PURE__ */ h(
              x1,
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
}), E1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TableOfContents: C1
}, Symbol.toStringTag, { value: "Module" }));
export {
  NC as AutoSaveIndicator,
  fE as Callout,
  bx as CalloutInputRule,
  gE as CodeBlockComponent,
  mx as CollapsibleHeading,
  Rb as CollapsibleList,
  tx as DatePill,
  hE as EditorThemeProvider,
  ob as EditorToolbar,
  sb as FindReplace,
  FC as FloatingToolbar,
  o1 as ImageDropZone,
  sC as ImageUpload,
  uE as MarkdownEditor,
  vx as MarkdownLinkInputRule,
  px as MarkdownPasteSafe,
  Tb as MixedBulletList,
  Lb as MixedListItem,
  Sb as MixedOrderedList,
  Db as MixedTaskItem,
  Nb as MixedTaskList,
  DC as RecoveryBanner,
  Ub as ResizableImage,
  wx as SearchHighlight,
  lb as SelectAllActionBar,
  Kx as SelectAllOccurrences,
  ZC as SlashCommands,
  kx as TabIndent,
  C1 as TableOfContents,
  ox as TagPill,
  ax as WikiLinkSafe,
  g1 as applyTheme,
  pE as createCustomTheme,
  wu as darkTheme,
  Ta as getDateVariant,
  kn as isValidTag,
  p1 as lightTheme,
  $l as loadCoreLanguages,
  ei as loadLanguageIfNeeded,
  Qe as lowlight,
  m1 as nordTheme,
  Jn as normalizeTag,
  en as parseDateFromMarkdown,
  h1 as sepiaTheme,
  Xn as themes,
  db as useAutoSave,
  mE as useEditorTheme,
  SC as useWordCount
};
//# sourceMappingURL=paragon.js.map
