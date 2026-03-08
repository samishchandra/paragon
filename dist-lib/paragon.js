import { jsxs as I, jsx as h, Fragment as ye } from "react/jsx-runtime";
import { useEditorState as fl, NodeViewWrapper as Jr, ReactNodeViewRenderer as pl, useEditor as Yu, EditorContent as ju, NodeViewContent as Vu } from "@tiptap/react";
import * as T from "react";
import X, { useState as j, useRef as Y, useEffect as q, useLayoutEffect as fo, memo as bt, useCallback as F, useImperativeHandle as Ku, createContext as hl, useContext as ml, useMemo as St, Component as Gu, useReducer as qu, lazy as Xu, forwardRef as Zu, Suspense as Fa } from "react";
import Qu from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Ju } from "lowlight";
import { Image as Bs, X as mt, Link2 as Ws, Type as po, Undo as ef, Redo as tf, Bold as zs, Italic as Fs, Underline as Us, Strikethrough as Ys, Code as gl, Highlighter as yl, Link as js, ChevronDown as Jn, List as Vs, ListOrdered as Ks, CheckSquare as Gs, Quote as qs, FileCode as vl, IndentIncrease as nf, IndentDecrease as rf, Table as ms, Minus as bl, Info as gs, BookOpen as wl, PenLine as of, Library as sf, ListTodo as xl, Columns as Ua, Trash2 as dn, Rows as Ya, ToggleLeft as ja, ArrowUpDown as af, Sparkles as ho, Copy as bn, Search as lf, ChevronUp as cf, MousePointerClick as df, CaseSensitive as uf, WholeWord as ff, Regex as pf, Replace as ys, ReplaceAll as hf, Plus as Xs, ChevronLeftIcon as mf, ChevronRightIcon as gf, ChevronDownIcon as yf, Calendar as kl, Hash as Va, Cloud as vf, Loader2 as Cl, Check as wn, CloudOff as bf, AlertCircle as wf, RotateCcw as Zs, Activity as xf, Maximize2 as El, Minimize2 as Ml, AlertTriangle as kf, ChevronRight as Cf, CheckCircle2 as Ef, Eye as Mf, FileText as Qs, ExternalLink as Tf, Pencil as Sf, Unlink as Nf, Heading1 as Df, Heading2 as Lf, Heading3 as Af, Heading4 as If, Heading5 as Rf, Code2 as Pf, StickyNote as Of, MessageSquareText as _f, ImagePlus as $f, MessageSquare as Tl, RefreshCw as Hf, SpellCheck as Bf, PanelRightClose as Wf, PanelRightOpen as zf } from "lucide-react";
import * as Sl from "react-dom";
import Ff, { createPortal as Uf } from "react-dom";
import { TextSelection as Ve, Plugin as Ne, PluginKey as De, NodeSelection as Yf, AllSelection as jf } from "@tiptap/pm/state";
import { Fragment as Nl, Slice as Uo, DOMSerializer as Vf } from "@tiptap/pm/model";
import Kf from "@tiptap/starter-kit";
import Gf from "@tiptap/extension-placeholder";
import qf from "@tiptap/extension-text-align";
import Xf from "@tiptap/extension-highlight";
import Zf from "@tiptap/extension-link";
import { Table as Qf } from "@tiptap/extension-table";
import Jf from "@tiptap/extension-table-row";
import ep from "@tiptap/extension-table-cell";
import tp from "@tiptap/extension-table-header";
import { Extension as Oe, Node as mo, mergeAttributes as xn, InputRule as Pe, Mark as Dl } from "@tiptap/core";
import { DecorationSet as je, Decoration as Ze } from "@tiptap/pm/view";
import np from "@tiptap/extension-bullet-list";
import rp from "@tiptap/extension-ordered-list";
import op from "@tiptap/extension-list-item";
import sp from "@tiptap/extension-task-list";
import ap from "@tiptap/extension-task-item";
import { findWrapping as Ka, canJoin as ip } from "@tiptap/pm/transform";
import lp from "@tiptap/extension-underline";
import cp from "@tiptap/extension-subscript";
import dp from "@tiptap/extension-superscript";
import up from "@tiptap/extension-typography";
import fp from "@tiptap/extension-image";
import { createRoot as pp } from "react-dom/client";
import { liftListItem as Ga, sinkListItem as qa } from "@tiptap/pm/schema-list";
import { undo as hp, redo as mp } from "@tiptap/pm/history";
import gp from "@tiptap/extension-horizontal-rule";
import yp from "@tiptap/extension-code";
import vp from "@tiptap/extension-bold";
import bp from "@tiptap/extension-italic";
import wp from "@tiptap/extension-strike";
const We = Ju(), Ll = {
  javascript: () => import("highlight.js/lib/languages/javascript"),
  typescript: () => import("highlight.js/lib/languages/typescript"),
  python: () => import("highlight.js/lib/languages/python"),
  xml: () => import("highlight.js/lib/languages/xml"),
  css: () => import("highlight.js/lib/languages/css"),
  json: () => import("highlight.js/lib/languages/json"),
  bash: () => import("highlight.js/lib/languages/bash")
}, Al = {
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
}, Il = {
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
}, Dr = /* @__PURE__ */ new Set(), Lr = /* @__PURE__ */ new Set();
let Xa = !1, In = null;
async function xp() {
  if (!Xa)
    return In || (In = (async () => {
      try {
        const e = Object.entries(Ll), t = await Promise.all(
          e.map(async ([n, r]) => {
            const o = await r();
            return [n, o.default];
          })
        );
        for (const [n, r] of t)
          We.registered(n) || We.register(n, r);
        for (const [n, r] of Object.entries(Al))
          if (!We.registered(n)) {
            const o = t.find(([s]) => s === r);
            o && We.register(n, o[1]);
          }
        Xa = !0;
      } catch (e) {
        console.warn("Failed to load core highlight.js languages:", e), In = null;
      }
    })(), In);
}
async function Za(e) {
  if (We.registered(e)) return !0;
  if (Ll[e] || Al[e])
    return await xp(), We.registered(e);
  const t = Il[e];
  if (!t) return !1;
  if (Lr.has(e)) return !0;
  if (Dr.has(e))
    return new Promise((n) => {
      const r = () => {
        Lr.has(e) ? n(!0) : Dr.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  Dr.add(e);
  try {
    const r = (await t()).default;
    We.register(e, r), Lr.add(e);
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
          i !== e && !We.registered(i) && (We.register(i, r), Lr.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Dr.delete(e);
  }
}
const Qa = "http://www.w3.org/2000/svg";
function Ar(e, t, n) {
  const r = document.createElementNS(Qa, "svg");
  r.setAttribute("width", String(t)), r.setAttribute("height", String(t)), r.setAttribute("viewBox", "0 0 24 24"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-linejoin", "round"), n && r.setAttribute("class", n);
  for (const o of e) {
    const s = document.createElementNS(Qa, "path");
    s.setAttribute("d", o), r.appendChild(s);
  }
  return r;
}
const Ja = [
  "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z",
  "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
], kp = ["M20 6 9 17l-5-5"], Cp = ["m6 9 6 6 6-6"];
function Ep() {
  const e = We.listLanguages();
  return Array.from(/* @__PURE__ */ new Set([...e, ...Object.keys(Il)])).sort();
}
class Mp {
  constructor(t, n, r) {
    this.isVisible = !1, this.languageReady = !1, this.copied = !1, this.copiedTimeout = null, this.highlightForced = !1, this.handleMouseEnter = () => {
      this.controlsEl.style.setProperty("opacity", "1", "important"), this.controlsEl.style.setProperty("transition", "none", "important");
    }, this.handleMouseLeave = () => {
      this.controlsEl.style.removeProperty("opacity"), this.controlsEl.style.removeProperty("transition");
    }, this.handleLanguageChange = () => {
      const a = this.selectEl.value, l = this.getPos();
      l != null && this.view.dispatch(
        this.view.state.tr.setNodeMarkup(l, void 0, {
          ...this.node.attrs,
          language: a
        })
      );
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
    const i = Ar(Cp, 12, "code-block-language-chevron");
    s.appendChild(this.selectEl), s.appendChild(this.labelEl), s.appendChild(i), this.copyBtn = document.createElement("button"), this.copyBtn.type = "button", this.copyBtn.className = "code-block-copy-btn", this.copyBtn.title = "Copy code", this.copyBtn.appendChild(Ar(Ja, 14)), this.copyBtn.addEventListener("click", this.handleCopy), this.controlsEl.appendChild(s), this.controlsEl.appendChild(this.copyBtn), this.preEl = document.createElement("pre"), this.preEl.className = "code-block-pre", this.codeEl = document.createElement("code"), this.codeEl.className = `language-${o}`, this.preEl.appendChild(this.codeEl), this.contentDOM = this.codeEl, this.dom.appendChild(this.controlsEl), this.dom.appendChild(this.preEl), this.dom.addEventListener("mouseenter", this.handleMouseEnter), this.dom.addEventListener("mouseleave", this.handleMouseLeave), setTimeout(() => {
      this.isVisible = !0, this.onBecameVisible().catch(() => {
      });
    }, 0);
  }
  // ── Language select ──
  populateLanguageOptions(t) {
    this.selectEl.innerHTML = "";
    const n = document.createElement("option");
    n.value = "plaintext", n.textContent = "Plain Text", this.selectEl.appendChild(n);
    const r = Ep();
    for (const o of r) {
      const s = document.createElement("option");
      s.value = o, s.textContent = o.charAt(0).toUpperCase() + o.slice(1), this.selectEl.appendChild(s);
    }
    this.selectEl.value = t;
  }
  formatLanguageLabel(t) {
    return t === "plaintext" ? "Plain Text" : t.charAt(0).toUpperCase() + t.slice(1);
  }
  setCopiedState(t) {
    this.copied = t, this.copyBtn.className = `code-block-copy-btn${t ? " copied" : ""}`, this.copyBtn.title = t ? "Copied!" : "Copy code", this.copyBtn.innerHTML = "", this.copyBtn.appendChild(
      Ar(t ? kp : Ja, 14)
    );
  }
  // ── Language loading ──
  async onBecameVisible() {
    const t = this.node.attrs.language || "plaintext";
    if (t === "plaintext") {
      this.setLanguageReady(!0);
      return;
    }
    if (We.registered(t)) {
      this.setLanguageReady(!0);
      return;
    }
    const n = await Za(t);
    this.setLanguageReady(n || t === "plaintext"), this.populateLanguageOptions(t), n && !this.highlightForced && (this.highlightForced = !0, this.forceRehighlight(t));
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
    return this.node = t, n !== r && (this.labelEl.textContent = this.formatLanguageLabel(r), this.selectEl.value = r, r === "plaintext" ? this.setLanguageReady(!0) : We.registered(r) ? this.setLanguageReady(!0) : this.isVisible && (this.setLanguageReady(!1), Za(r).then((o) => {
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
const Tp = Qu.configure({
  lowlight: We,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
}).extend({
  addNodeView() {
    return ({ node: e, view: t, getPos: n }) => new Mp(e, t, n);
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
`), l = t.schema.nodes.codeBlock, c = t.doc.resolve(n), d = t.doc.resolve(r), u = Math.max(1, c.depth), f = Math.max(1, d.depth), p = c.before(u), g = d.after(f);
  return e.chain().focus().command(({ tr: m }) => {
    const y = l.create(
      { language: null },
      a ? t.schema.text(a) : void 0
    );
    return m.replaceWith(p, g, y), !0;
  }).run();
}
function Rl({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = j(""), [i, a] = j(""), [l, c] = j(""), [d, u] = j(!1), f = Y(null), p = Y(null);
  q(() => {
    e && (s(""), a(""), c(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), q(() => {
    if (!e) return;
    const b = (w) => {
      p.current && !p.current.contains(w.target) && t();
    }, x = (w) => {
      w.key === "Escape" && t();
    }, M = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return document.addEventListener("keydown", x), () => {
      clearTimeout(M), document.removeEventListener("mousedown", b), document.removeEventListener("keydown", x);
    };
  }, [e, t]);
  const g = (b) => {
    if (!b.trim())
      return c("Please enter an image URL"), !1;
    try {
      const x = new URL(b);
      if (!["http:", "https:", "data:"].includes(x.protocol))
        return c("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return c("Please enter a valid URL"), !1;
    }
    return c(""), !0;
  }, m = async () => {
    if (!g(o)) return;
    u(!0);
    const b = new window.Image();
    b.onload = () => {
      u(!1), n(o.trim(), i.trim()), t();
    }, b.onerror = () => {
      u(!1), n(o.trim(), i.trim()), t();
    }, setTimeout(() => {
      d && (u(!1), n(o.trim(), i.trim()), t());
    }, 3e3), b.src = o.trim();
  }, y = (b) => {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), m());
  };
  if (!e) return null;
  const v = r ? {
    top: r.top,
    left: Math.min(r.left, typeof window < "u" ? window.innerWidth - 340 : r.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ I(
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
                onChange: (b) => {
                  s(b.target.value), l && c("");
                },
                onKeyDown: y,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              }
            ),
            l && /* @__PURE__ */ h("span", { className: "image-url-dialog-error", children: l })
          ] }),
          /* @__PURE__ */ I("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ I("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ h(po, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ h(
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
function le(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function ei(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function go(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = ei(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : ei(e[o], null);
        }
      };
  };
}
function Ie(...e) {
  return T.useCallback(go(...e), e);
}
function kn(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = T.createContext(i), l = n.length;
    n = [...n, i];
    const c = (u) => {
      const { scope: f, children: p, ...g } = u, m = f?.[e]?.[l] || a, y = T.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ h(m.Provider, { value: y, children: p });
    };
    c.displayName = s + "Provider";
    function d(u, f) {
      const p = f?.[e]?.[l] || a, g = T.useContext(p);
      if (g) return g;
      if (i !== void 0) return i;
      throw new Error(`\`${u}\` must be used within \`${s}\``);
    }
    return [c, d];
  }
  const o = () => {
    const s = n.map((i) => T.createContext(i));
    return function(a) {
      const l = a?.[e] || s;
      return T.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: l } }),
        [a, l]
      );
    };
  };
  return o.scopeName = e, [r, Sp(o, ...t)];
}
function Sp(...e) {
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
      return T.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Dt = globalThis?.document ? T.useLayoutEffect : () => {
}, Np = T[" useInsertionEffect ".trim().toString()] || Dt;
function ea({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = Dp({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, l = a ? e : o;
  {
    const d = T.useRef(e !== void 0);
    T.useEffect(() => {
      const u = d.current;
      u !== a && console.warn(
        `${r} is changing from ${u ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = a;
    }, [a, r]);
  }
  const c = T.useCallback(
    (d) => {
      if (a) {
        const u = Lp(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
    },
    [a, e, s, i]
  );
  return [l, c];
}
function Dp({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = T.useState(e), o = T.useRef(n), s = T.useRef(t);
  return Np(() => {
    s.current = t;
  }, [t]), T.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Lp(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function jn(e) {
  const t = /* @__PURE__ */ Ip(e), n = T.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = T.Children.toArray(s), l = a.find(Pp);
    if (l) {
      const c = l.props.children, d = a.map((u) => u === l ? T.Children.count(c) > 1 ? T.Children.only(null) : T.isValidElement(c) ? c.props.children : null : u);
      return /* @__PURE__ */ h(t, { ...i, ref: o, children: T.isValidElement(c) ? T.cloneElement(c, void 0, d) : null });
    }
    return /* @__PURE__ */ h(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Ap = /* @__PURE__ */ jn("Slot");
// @__NO_SIDE_EFFECTS__
function Ip(e) {
  const t = T.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (T.isValidElement(o)) {
      const i = _p(o), a = Op(s, o.props);
      return o.type !== T.Fragment && (a.ref = r ? go(r, i) : i), T.cloneElement(o, a);
    }
    return T.Children.count(o) > 1 ? T.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Pl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Rp(e) {
  const t = ({ children: n }) => /* @__PURE__ */ h(ye, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Pl, t;
}
function Pp(e) {
  return T.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Pl;
}
function Op(e, t) {
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
function _p(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var $p = [
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
], Le = $p.reduce((e, t) => {
  const n = /* @__PURE__ */ jn(`Primitive.${t}`), r = T.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, l = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h(l, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Ol(e, t) {
  e && Sl.flushSync(() => e.dispatchEvent(t));
}
function _l(e) {
  const t = e + "CollectionProvider", [n, r] = kn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (m) => {
    const { scope: y, children: v } = m, b = X.useRef(null), x = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ h(o, { scope: y, itemMap: x, collectionRef: b, children: v });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", l = /* @__PURE__ */ jn(a), c = X.forwardRef(
    (m, y) => {
      const { scope: v, children: b } = m, x = s(a, v), M = Ie(y, x.collectionRef);
      return /* @__PURE__ */ h(l, { ref: M, children: b });
    }
  );
  c.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = /* @__PURE__ */ jn(d), p = X.forwardRef(
    (m, y) => {
      const { scope: v, children: b, ...x } = m, M = X.useRef(null), w = Ie(y, M), E = s(d, v);
      return X.useEffect(() => (E.itemMap.set(M, { ref: M, ...x }), () => void E.itemMap.delete(M))), /* @__PURE__ */ h(f, { [u]: "", ref: w, children: b });
    }
  );
  p.displayName = d;
  function g(m) {
    const y = s(e + "CollectionConsumer", m);
    return X.useCallback(() => {
      const b = y.collectionRef.current;
      if (!b) return [];
      const x = Array.from(b.querySelectorAll(`[${u}]`));
      return Array.from(y.itemMap.values()).sort(
        (E, S) => x.indexOf(E.ref.current) - x.indexOf(S.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: c, ItemSlot: p },
    g,
    r
  ];
}
var Hp = T.createContext(void 0);
function $l(e) {
  const t = T.useContext(Hp);
  return e || t || "ltr";
}
function gt(e) {
  const t = T.useRef(e);
  return T.useEffect(() => {
    t.current = e;
  }), T.useMemo(() => (...n) => t.current?.(...n), []);
}
function Bp(e, t = globalThis?.document) {
  const n = gt(e);
  T.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Wp = "DismissableLayer", vs = "dismissableLayer.update", zp = "dismissableLayer.pointerDownOutside", Fp = "dismissableLayer.focusOutside", ti, Hl = T.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ta = T.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...l
    } = e, c = T.useContext(Hl), [d, u] = T.useState(null), f = d?.ownerDocument ?? globalThis?.document, [, p] = T.useState({}), g = Ie(t, (S) => u(S)), m = Array.from(c.layers), [y] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), v = m.indexOf(y), b = d ? m.indexOf(d) : -1, x = c.layersWithOutsidePointerEventsDisabled.size > 0, M = b >= v, w = jp((S) => {
      const k = S.target, D = [...c.branches].some((C) => C.contains(k));
      !M || D || (o?.(S), i?.(S), S.defaultPrevented || a?.());
    }, f), E = Vp((S) => {
      const k = S.target;
      [...c.branches].some((C) => C.contains(k)) || (s?.(S), i?.(S), S.defaultPrevented || a?.());
    }, f);
    return Bp((S) => {
      b === c.layers.size - 1 && (r?.(S), !S.defaultPrevented && a && (S.preventDefault(), a()));
    }, f), T.useEffect(() => {
      if (d)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (ti = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(d)), c.layers.add(d), ni(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = ti);
        };
    }, [d, f, n, c]), T.useEffect(() => () => {
      d && (c.layers.delete(d), c.layersWithOutsidePointerEventsDisabled.delete(d), ni());
    }, [d, c]), T.useEffect(() => {
      const S = () => p({});
      return document.addEventListener(vs, S), () => document.removeEventListener(vs, S);
    }, []), /* @__PURE__ */ h(
      Le.div,
      {
        ...l,
        ref: g,
        style: {
          pointerEvents: x ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: le(e.onFocusCapture, E.onFocusCapture),
        onBlurCapture: le(e.onBlurCapture, E.onBlurCapture),
        onPointerDownCapture: le(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
ta.displayName = Wp;
var Up = "DismissableLayerBranch", Yp = T.forwardRef((e, t) => {
  const n = T.useContext(Hl), r = T.useRef(null), o = Ie(t, r);
  return T.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ h(Le.div, { ...e, ref: o });
});
Yp.displayName = Up;
function jp(e, t = globalThis?.document) {
  const n = gt(e), r = T.useRef(!1), o = T.useRef(() => {
  });
  return T.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let l = function() {
          Bl(
            zp,
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
function Vp(e, t = globalThis?.document) {
  const n = gt(e), r = T.useRef(!1);
  return T.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Bl(Fp, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function ni() {
  const e = new CustomEvent(vs);
  document.dispatchEvent(e);
}
function Bl(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Ol(o, s) : o.dispatchEvent(s);
}
var Yo = 0;
function Kp() {
  T.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ri()), document.body.insertAdjacentElement("beforeend", e[1] ?? ri()), Yo++, () => {
      Yo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Yo--;
    };
  }, []);
}
function ri() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var jo = "focusScope.autoFocusOnMount", Vo = "focusScope.autoFocusOnUnmount", oi = { bubbles: !1, cancelable: !0 }, Gp = "FocusScope", Wl = T.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, l] = T.useState(null), c = gt(o), d = gt(s), u = T.useRef(null), f = Ie(t, (m) => l(m)), p = T.useRef({
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
      let m = function(x) {
        if (p.paused || !a) return;
        const M = x.target;
        a.contains(M) ? u.current = M : Tt(u.current, { select: !0 });
      }, y = function(x) {
        if (p.paused || !a) return;
        const M = x.relatedTarget;
        M !== null && (a.contains(M) || Tt(u.current, { select: !0 }));
      }, v = function(x) {
        if (document.activeElement === document.body)
          for (const w of x)
            w.removedNodes.length > 0 && Tt(a);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", y);
      const b = new MutationObserver(v);
      return a && b.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", y), b.disconnect();
      };
    }
  }, [r, a, p.paused]), T.useEffect(() => {
    if (a) {
      ai.add(p);
      const m = document.activeElement;
      if (!a.contains(m)) {
        const v = new CustomEvent(jo, oi);
        a.addEventListener(jo, c), a.dispatchEvent(v), v.defaultPrevented || (qp(eh(zl(a)), { select: !0 }), document.activeElement === m && Tt(a));
      }
      return () => {
        a.removeEventListener(jo, c), setTimeout(() => {
          const v = new CustomEvent(Vo, oi);
          a.addEventListener(Vo, d), a.dispatchEvent(v), v.defaultPrevented || Tt(m ?? document.body, { select: !0 }), a.removeEventListener(Vo, d), ai.remove(p);
        }, 0);
      };
    }
  }, [a, c, d, p]);
  const g = T.useCallback(
    (m) => {
      if (!n && !r || p.paused) return;
      const y = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, v = document.activeElement;
      if (y && v) {
        const b = m.currentTarget, [x, M] = Xp(b);
        x && M ? !m.shiftKey && v === M ? (m.preventDefault(), n && Tt(x, { select: !0 })) : m.shiftKey && v === x && (m.preventDefault(), n && Tt(M, { select: !0 })) : v === b && m.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ h(Le.div, { tabIndex: -1, ...i, ref: f, onKeyDown: g });
});
Wl.displayName = Gp;
function qp(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Tt(r, { select: t }), document.activeElement !== n) return;
}
function Xp(e) {
  const t = zl(e), n = si(t, e), r = si(t.reverse(), e);
  return [n, r];
}
function zl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function si(e, t) {
  for (const n of e)
    if (!Zp(n, { upTo: t })) return n;
}
function Zp(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Qp(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Tt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Qp(e) && t && e.select();
  }
}
var ai = Jp();
function Jp() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ii(e, t), e.unshift(t);
    },
    remove(t) {
      e = ii(e, t), e[0]?.resume();
    }
  };
}
function ii(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function eh(e) {
  return e.filter((t) => t.tagName !== "A");
}
var th = T[" useId ".trim().toString()] || (() => {
}), nh = 0;
function eo(e) {
  const [t, n] = T.useState(th());
  return Dt(() => {
    n((r) => r ?? String(nh++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const rh = ["top", "right", "bottom", "left"], Lt = Math.min, Be = Math.max, to = Math.round, Ir = Math.floor, ot = (e) => ({
  x: e,
  y: e
}), oh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, sh = {
  start: "end",
  end: "start"
};
function bs(e, t, n) {
  return Be(e, Lt(t, n));
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
function na(e) {
  return e === "x" ? "y" : "x";
}
function ra(e) {
  return e === "y" ? "height" : "width";
}
const ah = /* @__PURE__ */ new Set(["top", "bottom"]);
function nt(e) {
  return ah.has(vt(e)) ? "y" : "x";
}
function oa(e) {
  return na(nt(e));
}
function ih(e, t, n) {
  n === void 0 && (n = !1);
  const r = Cn(e), o = oa(e), s = ra(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = no(i)), [i, no(i)];
}
function lh(e) {
  const t = no(e);
  return [ws(e), t, ws(t)];
}
function ws(e) {
  return e.replace(/start|end/g, (t) => sh[t]);
}
const li = ["left", "right"], ci = ["right", "left"], ch = ["top", "bottom"], dh = ["bottom", "top"];
function uh(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ci : li : t ? li : ci;
    case "left":
    case "right":
      return t ? ch : dh;
    default:
      return [];
  }
}
function fh(e, t, n, r) {
  const o = Cn(e);
  let s = uh(vt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(ws)))), s;
}
function no(e) {
  return e.replace(/left|right|bottom|top/g, (t) => oh[t]);
}
function ph(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Fl(e) {
  return typeof e != "number" ? ph(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function ro(e) {
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
  const s = nt(t), i = oa(t), a = ra(i), l = vt(t), c = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
  switch (Cn(t)) {
    case "start":
      p[i] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const hh = async (e, t, n) => {
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
  } = di(c, r, l), f = r, p = {}, g = 0;
  for (let m = 0; m < a.length; m++) {
    const {
      name: y,
      fn: v
    } = a[m], {
      x: b,
      y: x,
      data: M,
      reset: w
    } = await v({
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
    d = b ?? d, u = x ?? u, p = {
      ...p,
      [y]: {
        ...p[y],
        ...M
      }
    }, w && g <= 50 && (g++, typeof w == "object" && (w.placement && (f = w.placement), w.rects && (c = w.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : w.rects), {
      x: d,
      y: u
    } = di(c, f, l)), m = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function Vn(e, t) {
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
  } = yt(t, e), g = Fl(p), y = a[f ? u === "floating" ? "reference" : "floating" : u], v = ro(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: l
  })), b = u === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, x = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), M = await (s.isElement == null ? void 0 : s.isElement(x)) ? await (s.getScale == null ? void 0 : s.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = ro(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: b,
    offsetParent: x,
    strategy: l
  }) : b);
  return {
    top: (v.top - w.top + g.top) / M.y,
    bottom: (w.bottom - v.bottom + g.bottom) / M.y,
    left: (v.left - w.left + g.left) / M.x,
    right: (w.right - v.right + g.right) / M.x
  };
}
const mh = (e) => ({
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
    } = yt(e, t) || {};
    if (c == null)
      return {};
    const u = Fl(d), f = {
      x: n,
      y: r
    }, p = oa(o), g = ra(p), m = await i.getDimensions(c), y = p === "y", v = y ? "top" : "left", b = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", M = s.reference[g] + s.reference[p] - f[p] - s.floating[g], w = f[p] - s.reference[p], E = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c));
    let S = E ? E[x] : 0;
    (!S || !await (i.isElement == null ? void 0 : i.isElement(E))) && (S = a.floating[x] || s.floating[g]);
    const k = M / 2 - w / 2, D = S / 2 - m[g] / 2 - 1, C = Lt(u[v], D), N = Lt(u[b], D), L = C, P = S - m[g] - N, O = S / 2 - m[g] / 2 + k, $ = bs(L, O, P), W = !l.arrow && Cn(o) != null && O !== $ && s.reference[g] / 2 - (O < L ? C : N) - m[g] / 2 < 0, V = W ? O < L ? O - L : O - P : 0;
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
}), gh = function(e) {
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
      } = yt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = vt(o), b = nt(a), x = vt(a) === a, M = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), w = f || (x || !m ? [no(a)] : lh(a)), E = g !== "none";
      !f && E && w.push(...fh(a, m, g, M));
      const S = [a, ...w], k = await Vn(t, y), D = [];
      let C = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && D.push(k[v]), u) {
        const O = ih(o, i, M);
        D.push(k[O[0]], k[O[1]]);
      }
      if (C = [...C, {
        placement: o,
        overflows: D
      }], !D.every((O) => O <= 0)) {
        var N, L;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, $ = S[O];
        if ($ && (!(u === "alignment" ? b !== nt($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        C.every((R) => nt(R.placement) === b ? R.overflows[0] > 0 : !0)))
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
                  const A = nt(R.placement);
                  return A === b || // Create a bias to the `y` side axis due to horizontal
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
function ui(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function fi(e) {
  return rh.some((t) => e[t] >= 0);
}
const yh = function(e) {
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
          const s = await Vn(t, {
            ...o,
            elementContext: "reference"
          }), i = ui(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: fi(i)
            }
          };
        }
        case "escaped": {
          const s = await Vn(t, {
            ...o,
            altBoundary: !0
          }), i = ui(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: fi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Ul = /* @__PURE__ */ new Set(["left", "top"]);
async function vh(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = vt(n), a = Cn(n), l = nt(n) === "y", c = Ul.has(i) ? -1 : 1, d = s && l ? -1 : 1, u = yt(t, e);
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
const bh = function(e) {
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
      } = t, l = await vh(t, e);
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
}, wh = function(e) {
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
        ...l
      } = yt(e, t), c = {
        x: n,
        y: r
      }, d = await Vn(t, l), u = nt(vt(o)), f = na(u);
      let p = c[f], g = c[u];
      if (s) {
        const y = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", b = p + d[y], x = p - d[v];
        p = bs(b, p, x);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", v = u === "y" ? "bottom" : "right", b = g + d[y], x = g - d[v];
        g = bs(b, g, x);
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
}, xh = function(e) {
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
      } = yt(e, t), d = {
        x: n,
        y: r
      }, u = nt(o), f = na(u);
      let p = d[f], g = d[u];
      const m = yt(a, t), y = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (l) {
        const x = f === "y" ? "height" : "width", M = s.reference[f] - s.floating[x] + y.mainAxis, w = s.reference[f] + s.reference[x] - y.mainAxis;
        p < M ? p = M : p > w && (p = w);
      }
      if (c) {
        var v, b;
        const x = f === "y" ? "width" : "height", M = Ul.has(vt(o)), w = s.reference[u] - s.floating[x] + (M && ((v = i.offset) == null ? void 0 : v[u]) || 0) + (M ? 0 : y.crossAxis), E = s.reference[u] + s.reference[x] + (M ? 0 : ((b = i.offset) == null ? void 0 : b[u]) || 0) - (M ? y.crossAxis : 0);
        g < w ? g = w : g > E && (g = E);
      }
      return {
        [f]: p,
        [u]: g
      };
    }
  };
}, kh = function(e) {
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
      } = yt(e, t), d = await Vn(t, c), u = vt(o), f = Cn(o), p = nt(o) === "y", {
        width: g,
        height: m
      } = s.floating;
      let y, v;
      u === "top" || u === "bottom" ? (y = u, v = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (v = u, y = f === "end" ? "top" : "bottom");
      const b = m - d.top - d.bottom, x = g - d.left - d.right, M = Lt(m - d[y], b), w = Lt(g - d[v], x), E = !t.middlewareData.shift;
      let S = M, k = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = x), (r = t.middlewareData.shift) != null && r.enabled.y && (S = b), E && !f) {
        const C = Be(d.left, 0), N = Be(d.right, 0), L = Be(d.top, 0), P = Be(d.bottom, 0);
        p ? k = g - 2 * (C !== 0 || N !== 0 ? C + N : Be(d.left, d.right)) : S = m - 2 * (L !== 0 || P !== 0 ? L + P : Be(d.top, d.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: S
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
function yo() {
  return typeof window < "u";
}
function En(e) {
  return Yl(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ze(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function at(e) {
  var t;
  return (t = (Yl(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Yl(e) {
  return yo() ? e instanceof Node || e instanceof ze(e).Node : !1;
}
function Qe(e) {
  return yo() ? e instanceof Element || e instanceof ze(e).Element : !1;
}
function st(e) {
  return yo() ? e instanceof HTMLElement || e instanceof ze(e).HTMLElement : !1;
}
function pi(e) {
  return !yo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ze(e).ShadowRoot;
}
const Ch = /* @__PURE__ */ new Set(["inline", "contents"]);
function er(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Ch.has(o);
}
const Eh = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Mh(e) {
  return Eh.has(En(e));
}
const Th = [":popover-open", ":modal"];
function vo(e) {
  return Th.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Sh = ["transform", "translate", "scale", "rotate", "perspective"], Nh = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Dh = ["paint", "layout", "strict", "content"];
function sa(e) {
  const t = aa(), n = Qe(e) ? Je(e) : e;
  return Sh.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Nh.some((r) => (n.willChange || "").includes(r)) || Dh.some((r) => (n.contain || "").includes(r));
}
function Lh(e) {
  let t = At(e);
  for (; st(t) && !gn(t); ) {
    if (sa(t))
      return t;
    if (vo(t))
      return null;
    t = At(t);
  }
  return null;
}
function aa() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Ah = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function gn(e) {
  return Ah.has(En(e));
}
function Je(e) {
  return ze(e).getComputedStyle(e);
}
function bo(e) {
  return Qe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function At(e) {
  if (En(e) === "html")
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
function jl(e) {
  const t = At(e);
  return gn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : st(t) && er(t) ? t : jl(t);
}
function Kn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = jl(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = ze(o);
  if (s) {
    const a = xs(i);
    return t.concat(i, i.visualViewport || [], er(o) ? o : [], a && n ? Kn(a) : []);
  }
  return t.concat(o, Kn(o, [], n));
}
function xs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Vl(e) {
  const t = Je(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = st(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = to(n) !== s || to(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function ia(e) {
  return Qe(e) ? e : e.contextElement;
}
function un(e) {
  const t = ia(e);
  if (!st(t))
    return ot(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Vl(t);
  let i = (s ? to(n.width) : n.width) / r, a = (s ? to(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Ih = /* @__PURE__ */ ot(0);
function Kl(e) {
  const t = ze(e);
  return !aa() || !t.visualViewport ? Ih : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Rh(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ze(e) ? !1 : t;
}
function jt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ia(e);
  let i = ot(1);
  t && (r ? Qe(r) && (i = un(r)) : i = un(e));
  const a = Rh(s, n, r) ? Kl(s) : ot(0);
  let l = (o.left + a.x) / i.x, c = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = ze(s), p = r && Qe(r) ? ze(r) : r;
    let g = f, m = xs(g);
    for (; m && r && p !== g; ) {
      const y = un(m), v = m.getBoundingClientRect(), b = Je(m), x = v.left + (m.clientLeft + parseFloat(b.paddingLeft)) * y.x, M = v.top + (m.clientTop + parseFloat(b.paddingTop)) * y.y;
      l *= y.x, c *= y.y, d *= y.x, u *= y.y, l += x, c += M, g = ze(m), m = xs(g);
    }
  }
  return ro({
    width: d,
    height: u,
    x: l,
    y: c
  });
}
function wo(e, t) {
  const n = bo(e).scrollLeft;
  return t ? t.left + n : jt(at(e)).left + n;
}
function Gl(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - wo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Ph(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = at(r), a = t ? vo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ot(1);
  const d = ot(0), u = st(r);
  if ((u || !u && !s) && ((En(r) !== "body" || er(i)) && (l = bo(r)), st(r))) {
    const p = jt(r);
    c = un(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? Gl(i, l) : ot(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + d.x + f.x,
    y: n.y * c.y - l.scrollTop * c.y + d.y + f.y
  };
}
function Oh(e) {
  return Array.from(e.getClientRects());
}
function _h(e) {
  const t = at(e), n = bo(e), r = e.ownerDocument.body, o = Be(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Be(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + wo(e);
  const a = -n.scrollTop;
  return Je(r).direction === "rtl" && (i += Be(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const hi = 25;
function $h(e, t) {
  const n = ze(e), r = at(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, l = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = aa();
    (!d || d && t === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  const c = wo(r);
  if (c <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(r.clientWidth - u.clientWidth - p);
    g <= hi && (s -= g);
  } else c <= hi && (s += c);
  return {
    width: s,
    height: i,
    x: a,
    y: l
  };
}
const Hh = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Bh(e, t) {
  const n = jt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = st(e) ? un(e) : ot(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, l = o * s.x, c = r * s.y;
  return {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function mi(e, t, n) {
  let r;
  if (t === "viewport")
    r = $h(e, n);
  else if (t === "document")
    r = _h(at(e));
  else if (Qe(t))
    r = Bh(t, n);
  else {
    const o = Kl(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return ro(r);
}
function ql(e, t) {
  const n = At(e);
  return n === t || !Qe(n) || gn(n) ? !1 : Je(n).position === "fixed" || ql(n, t);
}
function Wh(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Kn(e, [], !1).filter((a) => Qe(a) && En(a) !== "body"), o = null;
  const s = Je(e).position === "fixed";
  let i = s ? At(e) : e;
  for (; Qe(i) && !gn(i); ) {
    const a = Je(i), l = sa(i);
    !l && a.position === "fixed" && (o = null), (s ? !l && !o : !l && a.position === "static" && !!o && Hh.has(o.position) || er(i) && !l && ql(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = At(i);
  }
  return t.set(e, r), r;
}
function zh(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? vo(t) ? [] : Wh(t, this._c) : [].concat(n), r], a = i[0], l = i.reduce((c, d) => {
    const u = mi(t, d, o);
    return c.top = Be(u.top, c.top), c.right = Lt(u.right, c.right), c.bottom = Lt(u.bottom, c.bottom), c.left = Be(u.left, c.left), c;
  }, mi(t, a, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Fh(e) {
  const {
    width: t,
    height: n
  } = Vl(e);
  return {
    width: t,
    height: n
  };
}
function Uh(e, t, n) {
  const r = st(t), o = at(t), s = n === "fixed", i = jt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ot(0);
  function c() {
    l.x = wo(o);
  }
  if (r || !r && !s)
    if ((En(t) !== "body" || er(o)) && (a = bo(t)), r) {
      const p = jt(t, !0, s, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else o && c();
  s && !r && o && c();
  const d = o && !r && !s ? Gl(o, a) : ot(0), u = i.left + a.scrollLeft - l.x - d.x, f = i.top + a.scrollTop - l.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function Ko(e) {
  return Je(e).position === "static";
}
function gi(e, t) {
  if (!st(e) || Je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return at(e) === n && (n = n.ownerDocument.body), n;
}
function Xl(e, t) {
  const n = ze(e);
  if (vo(e))
    return n;
  if (!st(e)) {
    let o = At(e);
    for (; o && !gn(o); ) {
      if (Qe(o) && !Ko(o))
        return o;
      o = At(o);
    }
    return n;
  }
  let r = gi(e, t);
  for (; r && Mh(r) && Ko(r); )
    r = gi(r, t);
  return r && gn(r) && Ko(r) && !sa(r) ? n : r || Lh(e) || n;
}
const Yh = async function(e) {
  const t = this.getOffsetParent || Xl, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Uh(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function jh(e) {
  return Je(e).direction === "rtl";
}
const Vh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ph,
  getDocumentElement: at,
  getClippingRect: zh,
  getOffsetParent: Xl,
  getElementRects: Yh,
  getClientRects: Oh,
  getDimensions: Fh,
  getScale: un,
  isElement: Qe,
  isRTL: jh
};
function Zl(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Kh(e, t) {
  let n = null, r;
  const o = at(e);
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
    const g = Ir(u), m = Ir(o.clientWidth - (d + f)), y = Ir(o.clientHeight - (u + p)), v = Ir(d), x = {
      rootMargin: -g + "px " + -m + "px " + -y + "px " + -v + "px",
      threshold: Be(0, Lt(1, l)) || 1
    };
    let M = !0;
    function w(E) {
      const S = E[0].intersectionRatio;
      if (S !== l) {
        if (!M)
          return i();
        S ? i(!1, S) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Zl(c, e.getBoundingClientRect()) && i(), M = !1;
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
function Gh(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, c = ia(e), d = o || s ? [...c ? Kn(c) : [], ...Kn(t)] : [];
  d.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const u = c && a ? Kh(c, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((v) => {
    let [b] = v;
    b && b.target === c && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = p) == null || x.observe(t);
    })), n();
  }), c && !l && p.observe(c), p.observe(t));
  let g, m = l ? jt(e) : null;
  l && y();
  function y() {
    const v = jt(e);
    m && !Zl(m, v) && n(), m = v, g = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    d.forEach((b) => {
      o && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), u?.(), (v = p) == null || v.disconnect(), p = null, l && cancelAnimationFrame(g);
  };
}
const qh = bh, Xh = wh, Zh = gh, Qh = kh, Jh = yh, yi = mh, em = xh, tm = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Vh,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return hh(e, t, {
    ...o,
    platform: s
  });
};
var nm = typeof document < "u", rm = function() {
}, Gr = nm ? fo : rm;
function oo(e, t) {
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
        if (!oo(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !oo(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ql(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function vi(e, t) {
  const n = Ql(e);
  return Math.round(t * n) / n;
}
function Go(e) {
  const t = T.useRef(e);
  return Gr(() => {
    t.current = e;
  }), t;
}
function om(e) {
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
  } = e, [d, u] = T.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = T.useState(r);
  oo(f, r) || p(r);
  const [g, m] = T.useState(null), [y, v] = T.useState(null), b = T.useCallback((R) => {
    R !== E.current && (E.current = R, m(R));
  }, []), x = T.useCallback((R) => {
    R !== S.current && (S.current = R, v(R));
  }, []), M = s || g, w = i || y, E = T.useRef(null), S = T.useRef(null), k = T.useRef(d), D = l != null, C = Go(l), N = Go(o), L = Go(c), P = T.useCallback(() => {
    if (!E.current || !S.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: f
    };
    N.current && (R.platform = N.current), tm(E.current, S.current, R).then((A) => {
      const H = {
        ...A,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      O.current && !oo(k.current, H) && (k.current = H, Sl.flushSync(() => {
        u(H);
      }));
    });
  }, [f, t, n, N, L]);
  Gr(() => {
    c === !1 && k.current.isPositioned && (k.current.isPositioned = !1, u((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [c]);
  const O = T.useRef(!1);
  Gr(() => (O.current = !0, () => {
    O.current = !1;
  }), []), Gr(() => {
    if (M && (E.current = M), w && (S.current = w), M && w) {
      if (C.current)
        return C.current(M, w, P);
      P();
    }
  }, [M, w, P, C, D]);
  const $ = T.useMemo(() => ({
    reference: E,
    floating: S,
    setReference: b,
    setFloating: x
  }), [b, x]), W = T.useMemo(() => ({
    reference: M,
    floating: w
  }), [M, w]), V = T.useMemo(() => {
    const R = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return R;
    const A = vi(W.floating, d.x), H = vi(W.floating, d.y);
    return a ? {
      ...R,
      transform: "translate(" + A + "px, " + H + "px)",
      ...Ql(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: A,
      top: H
    };
  }, [n, a, W.floating, d.x, d.y]);
  return T.useMemo(() => ({
    ...d,
    update: P,
    refs: $,
    elements: W,
    floatingStyles: V
  }), [d, P, $, W, V]);
}
const sm = (e) => {
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
      return r && t(r) ? r.current != null ? yi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? yi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, am = (e, t) => ({
  ...qh(e),
  options: [e, t]
}), im = (e, t) => ({
  ...Xh(e),
  options: [e, t]
}), lm = (e, t) => ({
  ...em(e),
  options: [e, t]
}), cm = (e, t) => ({
  ...Zh(e),
  options: [e, t]
}), dm = (e, t) => ({
  ...Qh(e),
  options: [e, t]
}), um = (e, t) => ({
  ...Jh(e),
  options: [e, t]
}), fm = (e, t) => ({
  ...sm(e),
  options: [e, t]
});
var pm = "Arrow", Jl = T.forwardRef((e, t) => {
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
Jl.displayName = pm;
var hm = Jl;
function mm(e) {
  const [t, n] = T.useState(void 0);
  return Dt(() => {
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
var la = "Popper", [ec, xo] = kn(la), [gm, tc] = ec(la), nc = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = T.useState(null);
  return /* @__PURE__ */ h(gm, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
nc.displayName = la;
var rc = "PopperAnchor", oc = T.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = tc(rc, n), i = T.useRef(null), a = Ie(t, i), l = T.useRef(null);
    return T.useEffect(() => {
      const c = l.current;
      l.current = r?.current || i.current, c !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ h(Le.div, { ...o, ref: a });
  }
);
oc.displayName = rc;
var ca = "PopperContent", [ym, vm] = ec(ca), sc = T.forwardRef(
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
    } = e, y = tc(ca, n), [v, b] = T.useState(null), x = Ie(t, (_) => b(_)), [M, w] = T.useState(null), E = mm(M), S = E?.width ?? 0, k = E?.height ?? 0, D = r + (s !== "center" ? "-" + s : ""), C = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, N = Array.isArray(c) ? c : [c], L = N.length > 0, P = {
      padding: C,
      boundary: N.filter(wm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: O, floatingStyles: $, placement: W, isPositioned: V, middlewareData: R } = om({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: D,
      whileElementsMounted: (..._) => Gh(..._, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        am({ mainAxis: o + k, alignmentAxis: i }),
        l && im({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? lm() : void 0,
          ...P
        }),
        l && cm({ ...P }),
        dm({
          ...P,
          apply: ({ elements: _, rects: ee, availableWidth: ne, availableHeight: de }) => {
            const { width: be, height: ve } = ee.reference, Ue = _.floating.style;
            Ue.setProperty("--radix-popper-available-width", `${ne}px`), Ue.setProperty("--radix-popper-available-height", `${de}px`), Ue.setProperty("--radix-popper-anchor-width", `${be}px`), Ue.setProperty("--radix-popper-anchor-height", `${ve}px`);
          }
        }),
        M && fm({ element: M, padding: a }),
        xm({ arrowWidth: S, arrowHeight: k }),
        f && um({ strategy: "referenceHidden", ...P })
      ]
    }), [A, H] = lc(W), G = gt(g);
    Dt(() => {
      V && G?.();
    }, [V, G]);
    const z = R.arrow?.x, U = R.arrow?.y, K = R.arrow?.centerOffset !== 0, [B, J] = T.useState();
    return Dt(() => {
      v && J(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ h(
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
          ym,
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
sc.displayName = ca;
var ac = "PopperArrow", bm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ic = T.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = vm(ac, r), i = bm[s.placedSide];
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
          hm,
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
ic.displayName = ac;
function wm(e) {
  return e !== null;
}
var xm = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, l = i ? 0 : e.arrowHeight, [c, d] = lc(n), u = { start: "0%", center: "50%", end: "100%" }[d], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + l / 2;
    let g = "", m = "";
    return c === "bottom" ? (g = i ? u : `${f}px`, m = `${-l}px`) : c === "top" ? (g = i ? u : `${f}px`, m = `${r.floating.height + l}px`) : c === "right" ? (g = `${-l}px`, m = i ? u : `${p}px`) : c === "left" && (g = `${r.floating.width + l}px`, m = i ? u : `${p}px`), { data: { x: g, y: m } };
  }
});
function lc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var cc = nc, dc = oc, uc = sc, fc = ic, km = "Portal", da = T.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = T.useState(!1);
  Dt(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? Ff.createPortal(/* @__PURE__ */ h(Le.div, { ...r, ref: t }), i) : null;
});
da.displayName = km;
function Cm(e, t) {
  return T.useReducer((n, r) => t[n][r] ?? n, e);
}
var Vt = (e) => {
  const { present: t, children: n } = e, r = Em(t), o = typeof n == "function" ? n({ present: r.isPresent }) : T.Children.only(n), s = Ie(r.ref, Mm(o));
  return typeof n == "function" || r.isPresent ? T.cloneElement(o, { ref: s }) : null;
};
Vt.displayName = "Presence";
function Em(e) {
  const [t, n] = T.useState(), r = T.useRef(null), o = T.useRef(e), s = T.useRef("none"), i = e ? "mounted" : "unmounted", [a, l] = Cm(i, {
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
    const c = Rr(r.current);
    s.current = a === "mounted" ? c : "none";
  }, [a]), Dt(() => {
    const c = r.current, d = o.current;
    if (d !== e) {
      const f = s.current, p = Rr(c);
      e ? l("MOUNT") : p === "none" || c?.display === "none" ? l("UNMOUNT") : l(d && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), Dt(() => {
    if (t) {
      let c;
      const d = t.ownerDocument.defaultView ?? window, u = (p) => {
        const m = Rr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && m && (l("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Rr(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        d.clearTimeout(c), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: T.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function Rr(e) {
  return e?.animationName || "none";
}
function Mm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var qo = "rovingFocusGroup.onEntryFocus", Tm = { bubbles: !1, cancelable: !0 }, tr = "RovingFocusGroup", [ks, pc, Sm] = _l(tr), [Nm, hc] = kn(
  tr,
  [Sm]
), [Dm, Lm] = Nm(tr), mc = T.forwardRef(
  (e, t) => /* @__PURE__ */ h(ks.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(ks.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(Am, { ...e, ref: t }) }) })
);
mc.displayName = tr;
var Am = T.forwardRef((e, t) => {
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
  } = e, f = T.useRef(null), p = Ie(t, f), g = $l(s), [m, y] = ea({
    prop: i,
    defaultProp: a ?? null,
    onChange: l,
    caller: tr
  }), [v, b] = T.useState(!1), x = gt(c), M = pc(n), w = T.useRef(!1), [E, S] = T.useState(0);
  return T.useEffect(() => {
    const k = f.current;
    if (k)
      return k.addEventListener(qo, x), () => k.removeEventListener(qo, x);
  }, [x]), /* @__PURE__ */ h(
    Dm,
    {
      scope: n,
      orientation: r,
      dir: g,
      loop: o,
      currentTabStopId: m,
      onItemFocus: T.useCallback(
        (k) => y(k),
        [y]
      ),
      onItemShiftTab: T.useCallback(() => b(!0), []),
      onFocusableItemAdd: T.useCallback(
        () => S((k) => k + 1),
        []
      ),
      onFocusableItemRemove: T.useCallback(
        () => S((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ h(
        Le.div,
        {
          tabIndex: v || E === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: le(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: le(e.onFocus, (k) => {
            const D = !w.current;
            if (k.target === k.currentTarget && D && !v) {
              const C = new CustomEvent(qo, Tm);
              if (k.currentTarget.dispatchEvent(C), !C.defaultPrevented) {
                const N = M().filter((W) => W.focusable), L = N.find((W) => W.active), P = N.find((W) => W.id === m), $ = [L, P, ...N].filter(
                  Boolean
                ).map((W) => W.ref.current);
                vc($, d);
              }
            }
            w.current = !1;
          }),
          onBlur: le(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), gc = "RovingFocusGroupItem", yc = T.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, l = eo(), c = s || l, d = Lm(gc, n), u = d.currentTabStopId === c, f = pc(n), { onFocusableItemAdd: p, onFocusableItemRemove: g, currentTabStopId: m } = d;
    return T.useEffect(() => {
      if (r)
        return p(), () => g();
    }, [r, p, g]), /* @__PURE__ */ h(
      ks.ItemSlot,
      {
        scope: n,
        id: c,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ h(
          Le.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...a,
            ref: t,
            onMouseDown: le(e.onMouseDown, (y) => {
              r ? d.onItemFocus(c) : y.preventDefault();
            }),
            onFocus: le(e.onFocus, () => d.onItemFocus(c)),
            onKeyDown: le(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const v = Pm(y, d.orientation, d.dir);
              if (v !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let x = f().filter((M) => M.focusable).map((M) => M.ref.current);
                if (v === "last") x.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && x.reverse();
                  const M = x.indexOf(y.currentTarget);
                  x = d.loop ? Om(x, M + 1) : x.slice(M + 1);
                }
                setTimeout(() => vc(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: m != null }) : i
          }
        )
      }
    );
  }
);
yc.displayName = gc;
var Im = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Rm(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Pm(e, t, n) {
  const r = Rm(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Im[r];
}
function vc(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Om(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var _m = mc, $m = yc, Hm = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, en = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new WeakMap(), Or = {}, Xo = 0, bc = function(e) {
  return e && (e.host || bc(e.parentNode));
}, Bm = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = bc(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Wm = function(e, t, n, r) {
  var o = Bm(t, Array.isArray(e) ? e : [e]);
  Or[n] || (Or[n] = /* @__PURE__ */ new WeakMap());
  var s = Or[n], i = [], a = /* @__PURE__ */ new Set(), l = new Set(o), c = function(u) {
    !u || a.has(u) || (a.add(u), c(u.parentNode));
  };
  o.forEach(c);
  var d = function(u) {
    !u || l.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (a.has(f))
        d(f);
      else
        try {
          var p = f.getAttribute(r), g = p !== null && p !== "false", m = (en.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          en.set(f, m), s.set(f, y), i.push(f), m === 1 && g && Pr.set(f, !0), y === 1 && f.setAttribute(n, "true"), g || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return d(t), a.clear(), Xo++, function() {
    i.forEach(function(u) {
      var f = en.get(u) - 1, p = s.get(u) - 1;
      en.set(u, f), s.set(u, p), f || (Pr.has(u) || u.removeAttribute(r), Pr.delete(u)), p || u.removeAttribute(n);
    }), Xo--, Xo || (en = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new WeakMap(), Or = {});
  };
}, zm = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Hm(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Wm(r, o, n, "aria-hidden")) : function() {
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
function wc(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Fm(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var qr = "right-scroll-bar-position", Xr = "width-before-scroll-bar", Um = "with-scroll-bars-hidden", Ym = "--removed-body-scroll-bar-size";
function Zo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function jm(e, t) {
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
var Vm = typeof window < "u" ? T.useLayoutEffect : T.useEffect, bi = /* @__PURE__ */ new WeakMap();
function Km(e, t) {
  var n = jm(null, function(r) {
    return e.forEach(function(o) {
      return Zo(o, r);
    });
  });
  return Vm(function() {
    var r = bi.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Zo(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Zo(a, i);
      });
    }
    bi.set(n, e);
  }, [e]), n;
}
function Gm(e) {
  return e;
}
function qm(e, t) {
  t === void 0 && (t = Gm);
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
function Xm(e) {
  e === void 0 && (e = {});
  var t = qm(null);
  return t.options = tt({ async: !0, ssr: !1 }, e), t;
}
var xc = function(e) {
  var t = e.sideCar, n = wc(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return T.createElement(r, tt({}, n));
};
xc.isSideCarExport = !0;
function Zm(e, t) {
  return e.useMedium(t), xc;
}
var kc = Xm(), Qo = function() {
}, ko = T.forwardRef(function(e, t) {
  var n = T.useRef(null), r = T.useState({
    onScrollCapture: Qo,
    onWheelCapture: Qo,
    onTouchMoveCapture: Qo
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, l = e.className, c = e.removeScrollBar, d = e.enabled, u = e.shards, f = e.sideCar, p = e.noRelative, g = e.noIsolation, m = e.inert, y = e.allowPinchZoom, v = e.as, b = v === void 0 ? "div" : v, x = e.gapMode, M = wc(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, E = Km([n, t]), S = tt(tt({}, M), o);
  return T.createElement(
    T.Fragment,
    null,
    d && T.createElement(w, { sideCar: kc, removeScrollBar: c, shards: u, noRelative: p, noIsolation: g, inert: m, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: x }),
    i ? T.cloneElement(T.Children.only(a), tt(tt({}, S), { ref: E })) : T.createElement(b, tt({}, S, { className: l, ref: E }), a)
  );
});
ko.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
ko.classNames = {
  fullWidth: Xr,
  zeroRight: qr
};
var Qm = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Jm() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Qm();
  return t && e.setAttribute("nonce", t), e;
}
function eg(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function tg(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var ng = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Jm()) && (eg(t, n), tg(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, rg = function() {
  var e = ng();
  return function(t, n) {
    T.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Cc = function() {
  var e = rg(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, og = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Jo = function(e) {
  return parseInt(e || "", 10) || 0;
}, sg = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Jo(n), Jo(r), Jo(o)];
}, ag = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return og;
  var t = sg(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, ig = Cc(), fn = "data-scroll-locked", lg = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Um, ` {
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
  
  .`).concat(qr, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Xr, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(qr, " .").concat(qr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Xr, " .").concat(Xr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(fn, `] {
    `).concat(Ym, ": ").concat(a, `px;
  }
`);
}, wi = function() {
  var e = parseInt(document.body.getAttribute(fn) || "0", 10);
  return isFinite(e) ? e : 0;
}, cg = function() {
  T.useEffect(function() {
    return document.body.setAttribute(fn, (wi() + 1).toString()), function() {
      var e = wi() - 1;
      e <= 0 ? document.body.removeAttribute(fn) : document.body.setAttribute(fn, e.toString());
    };
  }, []);
}, dg = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  cg();
  var s = T.useMemo(function() {
    return ag(o);
  }, [o]);
  return T.createElement(ig, { styles: lg(s, !t, o, n ? "" : "!important") });
}, Cs = !1;
if (typeof window < "u")
  try {
    var _r = Object.defineProperty({}, "passive", {
      get: function() {
        return Cs = !0, !0;
      }
    });
    window.addEventListener("test", _r, _r), window.removeEventListener("test", _r, _r);
  } catch {
    Cs = !1;
  }
var tn = Cs ? { passive: !1 } : !1, ug = function(e) {
  return e.tagName === "TEXTAREA";
}, Ec = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !ug(e) && n[t] === "visible")
  );
}, fg = function(e) {
  return Ec(e, "overflowY");
}, pg = function(e) {
  return Ec(e, "overflowX");
}, xi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Mc(e, r);
    if (o) {
      var s = Tc(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, hg = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, mg = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Mc = function(e, t) {
  return e === "v" ? fg(t) : pg(t);
}, Tc = function(e, t) {
  return e === "v" ? hg(t) : mg(t);
}, gg = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, yg = function(e, t, n, r, o) {
  var s = gg(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, l = t.contains(a), c = !1, d = i > 0, u = 0, f = 0;
  do {
    if (!a)
      break;
    var p = Tc(e, a), g = p[0], m = p[1], y = p[2], v = m - y - s * g;
    (g || v) && Mc(e, a) && (u += v, f += g);
    var b = a.parentNode;
    a = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !l && a !== document.body || // self content
    l && (t.contains(a) || t === a)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(f) < 1) && (c = !0), c;
}, $r = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ki = function(e) {
  return [e.deltaX, e.deltaY];
}, Ci = function(e) {
  return e && "current" in e ? e.current : e;
}, vg = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, bg = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, wg = 0, nn = [];
function xg(e) {
  var t = T.useRef([]), n = T.useRef([0, 0]), r = T.useRef(), o = T.useState(wg++)[0], s = T.useState(Cc)[0], i = T.useRef(e);
  T.useEffect(function() {
    i.current = e;
  }, [e]), T.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = Fm([e.lockRef.current], (e.shards || []).map(Ci), !0).filter(Boolean);
      return m.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = T.useCallback(function(m, y) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !i.current.allowPinchZoom;
    var v = $r(m), b = n.current, x = "deltaX" in m ? m.deltaX : b[0] - v[0], M = "deltaY" in m ? m.deltaY : b[1] - v[1], w, E = m.target, S = Math.abs(x) > Math.abs(M) ? "h" : "v";
    if ("touches" in m && S === "h" && E.type === "range")
      return !1;
    var k = xi(S, E);
    if (!k)
      return !0;
    if (k ? w = S : (w = S === "v" ? "h" : "v", k = xi(S, E)), !k)
      return !1;
    if (!r.current && "changedTouches" in m && (x || M) && (r.current = w), !w)
      return !0;
    var D = r.current || w;
    return yg(D, y, m, D === "h" ? x : M);
  }, []), l = T.useCallback(function(m) {
    var y = m;
    if (!(!nn.length || nn[nn.length - 1] !== s)) {
      var v = "deltaY" in y ? ki(y) : $r(y), b = t.current.filter(function(w) {
        return w.name === y.type && (w.target === y.target || y.target === w.shadowParent) && vg(w.delta, v);
      })[0];
      if (b && b.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!b) {
        var x = (i.current.shards || []).map(Ci).filter(Boolean).filter(function(w) {
          return w.contains(y.target);
        }), M = x.length > 0 ? a(y, x[0]) : !i.current.noIsolation;
        M && y.cancelable && y.preventDefault();
      }
    }
  }, []), c = T.useCallback(function(m, y, v, b) {
    var x = { name: m, delta: y, target: v, should: b, shadowParent: kg(v) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== x;
      });
    }, 1);
  }, []), d = T.useCallback(function(m) {
    n.current = $r(m), r.current = void 0;
  }, []), u = T.useCallback(function(m) {
    c(m.type, ki(m), m.target, a(m, e.lockRef.current));
  }, []), f = T.useCallback(function(m) {
    c(m.type, $r(m), m.target, a(m, e.lockRef.current));
  }, []);
  T.useEffect(function() {
    return nn.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, tn), document.addEventListener("touchmove", l, tn), document.addEventListener("touchstart", d, tn), function() {
      nn = nn.filter(function(m) {
        return m !== s;
      }), document.removeEventListener("wheel", l, tn), document.removeEventListener("touchmove", l, tn), document.removeEventListener("touchstart", d, tn);
    };
  }, []);
  var p = e.removeScrollBar, g = e.inert;
  return T.createElement(
    T.Fragment,
    null,
    g ? T.createElement(s, { styles: bg(o) }) : null,
    p ? T.createElement(dg, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function kg(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Cg = Zm(kc, xg);
var Sc = T.forwardRef(function(e, t) {
  return T.createElement(ko, tt({}, e, { ref: t, sideCar: Cg }));
});
Sc.classNames = ko.classNames;
var Es = ["Enter", " "], Eg = ["ArrowDown", "PageUp", "Home"], Nc = ["ArrowUp", "PageDown", "End"], Mg = [...Eg, ...Nc], Tg = {
  ltr: [...Es, "ArrowRight"],
  rtl: [...Es, "ArrowLeft"]
}, Sg = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, nr = "Menu", [Gn, Ng, Dg] = _l(nr), [Kt, Dc] = kn(nr, [
  Dg,
  xo,
  hc
]), Co = xo(), Lc = hc(), [Lg, Gt] = Kt(nr), [Ag, rr] = Kt(nr), Ac = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Co(t), [l, c] = T.useState(null), d = T.useRef(!1), u = gt(s), f = $l(o);
  return T.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ h(cc, { ...a, children: /* @__PURE__ */ h(
    Lg,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: l,
      onContentChange: c,
      children: /* @__PURE__ */ h(
        Ag,
        {
          scope: t,
          onClose: T.useCallback(() => u(!1), [u]),
          isUsingKeyboardRef: d,
          dir: f,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
Ac.displayName = nr;
var Ig = "MenuAnchor", ua = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Co(n);
    return /* @__PURE__ */ h(dc, { ...o, ...r, ref: t });
  }
);
ua.displayName = Ig;
var fa = "MenuPortal", [Rg, Ic] = Kt(fa, {
  forceMount: void 0
}), Rc = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = Gt(fa, t);
  return /* @__PURE__ */ h(Rg, { scope: t, forceMount: n, children: /* @__PURE__ */ h(Vt, { present: n || s.open, children: /* @__PURE__ */ h(da, { asChild: !0, container: o, children: r }) }) });
};
Rc.displayName = fa;
var Ke = "MenuContent", [Pg, pa] = Kt(Ke), Pc = T.forwardRef(
  (e, t) => {
    const n = Ic(Ke, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Gt(Ke, e.__scopeMenu), i = rr(Ke, e.__scopeMenu);
    return /* @__PURE__ */ h(Gn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(Vt, { present: r || s.open, children: /* @__PURE__ */ h(Gn.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ h(Og, { ...o, ref: t }) : /* @__PURE__ */ h(_g, { ...o, ref: t }) }) }) });
  }
), Og = T.forwardRef(
  (e, t) => {
    const n = Gt(Ke, e.__scopeMenu), r = T.useRef(null), o = Ie(t, r);
    return T.useEffect(() => {
      const s = r.current;
      if (s) return zm(s);
    }, []), /* @__PURE__ */ h(
      ha,
      {
        ...e,
        ref: o,
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
), _g = T.forwardRef((e, t) => {
  const n = Gt(Ke, e.__scopeMenu);
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
}), $g = /* @__PURE__ */ jn("MenuContent.ScrollLock"), ha = T.forwardRef(
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
    } = e, y = Gt(Ke, n), v = rr(Ke, n), b = Co(n), x = Lc(n), M = Ng(n), [w, E] = T.useState(null), S = T.useRef(null), k = Ie(t, S, y.onContentChange), D = T.useRef(0), C = T.useRef(""), N = T.useRef(0), L = T.useRef(null), P = T.useRef("right"), O = T.useRef(0), $ = g ? Sc : T.Fragment, W = g ? { as: $g, allowPinchZoom: !0 } : void 0, V = (A) => {
      const H = C.current + A, G = M().filter((_) => !_.disabled), z = document.activeElement, U = G.find((_) => _.ref.current === z)?.textValue, K = G.map((_) => _.textValue), B = qg(K, H, U), J = G.find((_) => _.textValue === B)?.ref.current;
      (function _(ee) {
        C.current = ee, window.clearTimeout(D.current), ee !== "" && (D.current = window.setTimeout(() => _(""), 1e3));
      })(H), J && setTimeout(() => J.focus());
    };
    T.useEffect(() => () => window.clearTimeout(D.current), []), Kp();
    const R = T.useCallback((A) => P.current === L.current?.side && Zg(A, L.current?.area), []);
    return /* @__PURE__ */ h(
      Pg,
      {
        scope: n,
        searchRef: C,
        onItemEnter: T.useCallback(
          (A) => {
            R(A) && A.preventDefault();
          },
          [R]
        ),
        onItemLeave: T.useCallback(
          (A) => {
            R(A) || (S.current?.focus(), E(null));
          },
          [R]
        ),
        onTriggerLeave: T.useCallback(
          (A) => {
            R(A) && A.preventDefault();
          },
          [R]
        ),
        pointerGraceTimerRef: N,
        onPointerGraceIntentChange: T.useCallback((A) => {
          L.current = A;
        }, []),
        children: /* @__PURE__ */ h($, { ...W, children: /* @__PURE__ */ h(
          Wl,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: le(s, (A) => {
              A.preventDefault(), S.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ h(
              ta,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: c,
                onPointerDownOutside: d,
                onFocusOutside: u,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ h(
                  _m,
                  {
                    asChild: !0,
                    ...x,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: E,
                    onEntryFocus: le(l, (A) => {
                      v.isUsingKeyboardRef.current || A.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ h(
                      uc,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Xc(y.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...b,
                        ...m,
                        ref: k,
                        style: { outline: "none", ...m.style },
                        onKeyDown: le(m.onKeyDown, (A) => {
                          const G = A.target.closest("[data-radix-menu-content]") === A.currentTarget, z = A.ctrlKey || A.altKey || A.metaKey, U = A.key.length === 1;
                          G && (A.key === "Tab" && A.preventDefault(), !z && U && V(A.key));
                          const K = S.current;
                          if (A.target !== K || !Mg.includes(A.key)) return;
                          A.preventDefault();
                          const J = M().filter((_) => !_.disabled).map((_) => _.ref.current);
                          Nc.includes(A.key) && J.reverse(), Kg(J);
                        }),
                        onBlur: le(e.onBlur, (A) => {
                          A.currentTarget.contains(A.target) || (window.clearTimeout(D.current), C.current = "");
                        }),
                        onPointerMove: le(
                          e.onPointerMove,
                          qn((A) => {
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
Pc.displayName = Ke;
var Hg = "MenuGroup", ma = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(Le.div, { role: "group", ...r, ref: t });
  }
);
ma.displayName = Hg;
var Bg = "MenuLabel", Oc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ h(Le.div, { ...r, ref: t });
  }
);
Oc.displayName = Bg;
var so = "MenuItem", Ei = "menu.itemSelect", Eo = T.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = T.useRef(null), i = rr(so, e.__scopeMenu), a = pa(so, e.__scopeMenu), l = Ie(t, s), c = T.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const f = new CustomEvent(Ei, { bubbles: !0, cancelable: !0 });
        u.addEventListener(Ei, (p) => r?.(p), { once: !0 }), Ol(u, f), f.defaultPrevented ? c.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ h(
      _c,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: le(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), c.current = !0;
        },
        onPointerUp: le(e.onPointerUp, (u) => {
          c.current || u.currentTarget?.click();
        }),
        onKeyDown: le(e.onKeyDown, (u) => {
          const f = a.searchRef.current !== "";
          n || f && u.key === " " || Es.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
Eo.displayName = so;
var _c = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = pa(so, n), a = Lc(n), l = T.useRef(null), c = Ie(t, l), [d, u] = T.useState(!1), [f, p] = T.useState("");
    return T.useEffect(() => {
      const g = l.current;
      g && p((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ h(
      Gn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ h($m, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ h(
          Le.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: c,
            onPointerMove: le(
              e.onPointerMove,
              qn((g) => {
                r ? i.onItemLeave(g) : (i.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: le(
              e.onPointerLeave,
              qn((g) => i.onItemLeave(g))
            ),
            onFocus: le(e.onFocus, () => u(!0)),
            onBlur: le(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), Wg = "MenuCheckboxItem", $c = T.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ h(Fc, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ h(
      Eo,
      {
        role: "menuitemcheckbox",
        "aria-checked": ao(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ya(n),
        onSelect: le(
          o.onSelect,
          () => r?.(ao(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
$c.displayName = Wg;
var Hc = "MenuRadioGroup", [zg, Fg] = Kt(
  Hc,
  { value: void 0, onValueChange: () => {
  } }
), Bc = T.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = gt(r);
    return /* @__PURE__ */ h(zg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ h(ma, { ...o, ref: t }) });
  }
);
Bc.displayName = Hc;
var Wc = "MenuRadioItem", zc = T.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Fg(Wc, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ h(Fc, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ h(
      Eo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": ya(s),
        onSelect: le(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
zc.displayName = Wc;
var ga = "MenuItemIndicator", [Fc, Ug] = Kt(
  ga,
  { checked: !1 }
), Uc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = Ug(ga, n);
    return /* @__PURE__ */ h(
      Vt,
      {
        present: r || ao(s.checked) || s.checked === !0,
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
Uc.displayName = ga;
var Yg = "MenuSeparator", Yc = T.forwardRef(
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
Yc.displayName = Yg;
var jg = "MenuArrow", jc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Co(n);
    return /* @__PURE__ */ h(fc, { ...o, ...r, ref: t });
  }
);
jc.displayName = jg;
var Vg = "MenuSub", [q1, Vc] = Kt(Vg), $n = "MenuSubTrigger", Kc = T.forwardRef(
  (e, t) => {
    const n = Gt($n, e.__scopeMenu), r = rr($n, e.__scopeMenu), o = Vc($n, e.__scopeMenu), s = pa($n, e.__scopeMenu), i = T.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: l } = s, c = { __scopeMenu: e.__scopeMenu }, d = T.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return T.useEffect(() => d, [d]), T.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), l(null);
      };
    }, [a, l]), /* @__PURE__ */ h(ua, { asChild: !0, ...c, children: /* @__PURE__ */ h(
      _c,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Xc(n.open),
        ...e,
        ref: go(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: le(
          e.onPointerMove,
          qn((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: le(
          e.onPointerLeave,
          qn((u) => {
            d();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, g = p === "right", m = g ? -5 : 5, y = f[g ? "left" : "right"], v = f[g ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: u.clientX + m, y: u.clientY },
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
              if (s.onTriggerLeave(u), u.defaultPrevented) return;
              s.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: le(e.onKeyDown, (u) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && u.key === " " || Tg[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Kc.displayName = $n;
var Gc = "MenuSubContent", qc = T.forwardRef(
  (e, t) => {
    const n = Ic(Ke, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Gt(Ke, e.__scopeMenu), i = rr(Ke, e.__scopeMenu), a = Vc(Gc, e.__scopeMenu), l = T.useRef(null), c = Ie(t, l);
    return /* @__PURE__ */ h(Gn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(Vt, { present: r || s.open, children: /* @__PURE__ */ h(Gn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ h(
      ha,
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
        onFocusOutside: le(e.onFocusOutside, (d) => {
          d.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: le(e.onEscapeKeyDown, (d) => {
          i.onClose(), d.preventDefault();
        }),
        onKeyDown: le(e.onKeyDown, (d) => {
          const u = d.currentTarget.contains(d.target), f = Sg[i.dir].includes(d.key);
          u && f && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
qc.displayName = Gc;
function Xc(e) {
  return e ? "open" : "closed";
}
function ao(e) {
  return e === "indeterminate";
}
function ya(e) {
  return ao(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Kg(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Gg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function qg(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = Gg(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((c) => c !== n));
  const l = i.find(
    (c) => c.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Xg(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], l = t[i], c = a.x, d = a.y, u = l.x, f = l.y;
    d > r != f > r && n < (u - c) * (r - d) / (f - d) + c && (o = !o);
  }
  return o;
}
function Zg(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Xg(n, t);
}
function qn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Qg = Ac, Jg = ua, ey = Rc, ty = Pc, ny = ma, ry = Oc, oy = Eo, sy = $c, ay = Bc, iy = zc, ly = Uc, cy = Yc, dy = jc, uy = Kc, fy = qc, Mo = "DropdownMenu", [py] = kn(
  Mo,
  [Dc]
), Re = Dc(), [hy, Zc] = py(Mo), Qc = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, l = Re(t), c = T.useRef(null), [d, u] = ea({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: Mo
  });
  return /* @__PURE__ */ h(
    hy,
    {
      scope: t,
      triggerId: eo(),
      triggerRef: c,
      contentId: eo(),
      open: d,
      onOpenChange: u,
      onOpenToggle: T.useCallback(() => u((f) => !f), [u]),
      modal: a,
      children: /* @__PURE__ */ h(Qg, { ...l, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
Qc.displayName = Mo;
var Jc = "DropdownMenuTrigger", ed = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = Zc(Jc, n), i = Re(n);
    return /* @__PURE__ */ h(Jg, { asChild: !0, ...i, children: /* @__PURE__ */ h(
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
        ref: go(t, s.triggerRef),
        onPointerDown: le(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: le(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
ed.displayName = Jc;
var my = "DropdownMenuPortal", td = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Re(t);
  return /* @__PURE__ */ h(ey, { ...r, ...n });
};
td.displayName = my;
var nd = "DropdownMenuContent", rd = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Zc(nd, n), s = Re(n), i = T.useRef(!1);
    return /* @__PURE__ */ h(
      ty,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: le(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: le(e.onInteractOutside, (a) => {
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
rd.displayName = nd;
var gy = "DropdownMenuGroup", yy = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
    return /* @__PURE__ */ h(ny, { ...o, ...r, ref: t });
  }
);
yy.displayName = gy;
var vy = "DropdownMenuLabel", by = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
    return /* @__PURE__ */ h(ry, { ...o, ...r, ref: t });
  }
);
by.displayName = vy;
var wy = "DropdownMenuItem", od = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
    return /* @__PURE__ */ h(oy, { ...o, ...r, ref: t });
  }
);
od.displayName = wy;
var xy = "DropdownMenuCheckboxItem", ky = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
  return /* @__PURE__ */ h(sy, { ...o, ...r, ref: t });
});
ky.displayName = xy;
var Cy = "DropdownMenuRadioGroup", Ey = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
  return /* @__PURE__ */ h(ay, { ...o, ...r, ref: t });
});
Ey.displayName = Cy;
var My = "DropdownMenuRadioItem", Ty = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
  return /* @__PURE__ */ h(iy, { ...o, ...r, ref: t });
});
Ty.displayName = My;
var Sy = "DropdownMenuItemIndicator", Ny = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
  return /* @__PURE__ */ h(ly, { ...o, ...r, ref: t });
});
Ny.displayName = Sy;
var Dy = "DropdownMenuSeparator", sd = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
  return /* @__PURE__ */ h(cy, { ...o, ...r, ref: t });
});
sd.displayName = Dy;
var Ly = "DropdownMenuArrow", Ay = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
    return /* @__PURE__ */ h(dy, { ...o, ...r, ref: t });
  }
);
Ay.displayName = Ly;
var Iy = "DropdownMenuSubTrigger", Ry = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
  return /* @__PURE__ */ h(uy, { ...o, ...r, ref: t });
});
Ry.displayName = Iy;
var Py = "DropdownMenuSubContent", Oy = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Re(n);
  return /* @__PURE__ */ h(
    fy,
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
Oy.displayName = Py;
var _y = Qc, $y = ed, Hy = td, By = rd, Wy = od, zy = sd;
function ad(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ad(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function id() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ad(e)) && (r && (r += " "), r += t);
  return r;
}
const va = "-", Fy = (e) => {
  const t = Yy(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(va);
      return a[0] === "" && a.length !== 1 && a.shift(), ld(a, t) || Uy(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const l = n[i] || [];
      return a && r[i] ? [...l, ...r[i]] : l;
    }
  };
}, ld = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? ld(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(va);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Mi = /^\[(.+)\]$/, Uy = (e) => {
  if (Mi.test(e)) {
    const t = Mi.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Yy = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Ms(n[o], r, o, t);
  return r;
}, Ms = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Ti(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (jy(o)) {
        Ms(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Ms(i, Ti(t, s), n, r);
    });
  });
}, Ti = (e, t) => {
  let n = e;
  return t.split(va).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, jy = (e) => e.isThemeGetter, Vy = (e) => {
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
}, Ts = "!", Ss = ":", Ky = Ss.length, Gy = (e) => {
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
        if (m === Ss) {
          s.push(o.slice(l, g)), l = g + Ky;
          continue;
        }
        if (m === "/") {
          c = g;
          continue;
        }
      }
      m === "[" ? i++ : m === "]" ? i-- : m === "(" ? a++ : m === ")" && a--;
    }
    const d = s.length === 0 ? o : o.substring(l), u = qy(d), f = u !== d, p = c && c > l ? c - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: u,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + Ss, s = r;
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
}, qy = (e) => e.endsWith(Ts) ? e.substring(0, e.length - 1) : e.startsWith(Ts) ? e.substring(1) : e, Xy = (e) => {
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
}, Zy = (e) => ({
  cache: Vy(e.cacheSize),
  parseClassName: Gy(e),
  sortModifiers: Xy(e),
  ...Fy(e)
}), Qy = /\s+/, Jy = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(Qy);
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
    let y = !!m, v = r(y ? g.substring(0, m) : g);
    if (!v) {
      if (!y) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (v = r(g), !v) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      y = !1;
    }
    const b = s(f).join(":"), x = p ? b + Ts : b, M = x + v;
    if (i.includes(M))
      continue;
    i.push(M);
    const w = o(v, y);
    for (let E = 0; E < w.length; ++E) {
      const S = w[E];
      i.push(x + S);
    }
    l = d + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function ev() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = cd(t)) && (r && (r += " "), r += n);
  return r;
}
const cd = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = cd(e[r])) && (n && (n += " "), n += t);
  return n;
};
function tv(e, ...t) {
  let n, r, o, s = i;
  function i(l) {
    const c = t.reduce((d, u) => u(d), e());
    return n = Zy(c), r = n.cache.get, o = n.cache.set, s = a, a(l);
  }
  function a(l) {
    const c = r(l);
    if (c)
      return c;
    const d = Jy(l, n);
    return o(l, d), d;
  }
  return function() {
    return s(ev.apply(null, arguments));
  };
}
const Ee = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, dd = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ud = /^\((?:(\w[\w-]*):)?(.+)\)$/i, nv = /^\d+\/\d+$/, rv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ov = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, sv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, av = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, iv = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rn = (e) => nv.test(e), ce = (e) => !!e && !Number.isNaN(Number(e)), Ct = (e) => !!e && Number.isInteger(Number(e)), es = (e) => e.endsWith("%") && ce(e.slice(0, -1)), ct = (e) => rv.test(e), lv = () => !0, cv = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ov.test(e) && !sv.test(e)
), fd = () => !1, dv = (e) => av.test(e), uv = (e) => iv.test(e), fv = (e) => !Z(e) && !Q(e), pv = (e) => Mn(e, md, fd), Z = (e) => dd.test(e), Ht = (e) => Mn(e, gd, cv), ts = (e) => Mn(e, vv, ce), Si = (e) => Mn(e, pd, fd), hv = (e) => Mn(e, hd, uv), Hr = (e) => Mn(e, yd, dv), Q = (e) => ud.test(e), Rn = (e) => Tn(e, gd), mv = (e) => Tn(e, bv), Ni = (e) => Tn(e, pd), gv = (e) => Tn(e, md), yv = (e) => Tn(e, hd), Br = (e) => Tn(e, yd, !0), Mn = (e, t, n) => {
  const r = dd.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Tn = (e, t, n = !1) => {
  const r = ud.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, pd = (e) => e === "position" || e === "percentage", hd = (e) => e === "image" || e === "url", md = (e) => e === "length" || e === "size" || e === "bg-size", gd = (e) => e === "length", vv = (e) => e === "number", bv = (e) => e === "family-name", yd = (e) => e === "shadow", wv = () => {
  const e = Ee("color"), t = Ee("font"), n = Ee("text"), r = Ee("font-weight"), o = Ee("tracking"), s = Ee("leading"), i = Ee("breakpoint"), a = Ee("container"), l = Ee("spacing"), c = Ee("radius"), d = Ee("shadow"), u = Ee("inset-shadow"), f = Ee("text-shadow"), p = Ee("drop-shadow"), g = Ee("blur"), m = Ee("perspective"), y = Ee("aspect"), v = Ee("ease"), b = Ee("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], M = () => [
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
  ], w = () => [...M(), Q, Z], E = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], k = () => [Q, Z, l], D = () => [rn, "full", "auto", ...k()], C = () => [Ct, "none", "subgrid", Q, Z], N = () => ["auto", {
    span: ["full", Ct, Q, Z]
  }, Ct, Q, Z], L = () => [Ct, "auto", Q, Z], P = () => ["auto", "min", "max", "fr", Q, Z], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...k()], V = () => [rn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], R = () => [e, Q, Z], A = () => [...M(), Ni, Si, {
    position: [Q, Z]
  }], H = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], G = () => ["auto", "cover", "contain", gv, pv, {
    size: [Q, Z]
  }], z = () => [es, Rn, Ht], U = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    Q,
    Z
  ], K = () => ["", ce, Rn, Ht], B = () => ["solid", "dashed", "dotted", "double"], J = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], _ = () => [ce, es, Ni, Si], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    Q,
    Z
  ], ne = () => ["none", ce, Q, Z], de = () => ["none", ce, Q, Z], be = () => [ce, Q, Z], ve = () => [rn, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ct],
      breakpoint: [ct],
      color: [lv],
      container: [ct],
      "drop-shadow": [ct],
      ease: ["in", "out", "in-out"],
      font: [fv],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ct],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ct],
      shadow: [ct],
      spacing: ["px", ce],
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
        aspect: ["auto", "square", rn, Z, Q, y]
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
        columns: [ce, Z, Q, a]
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
        basis: [rn, "full", "auto", a, ...k()]
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
        flex: [ce, rn, "auto", "initial", "none", Z]
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
        text: ["base", n, Rn, Ht]
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
        font: [r, Q, ts]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", es, Z]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [mv, Z, t]
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
        "line-clamp": [ce, "none", Q, ts]
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
        decoration: [ce, "from-font", "auto", Q, Ht]
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
        }, yv, hv]
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
        "outline-offset": [ce, Q, Z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ce, Rn, Ht]
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
          Br,
          Hr
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
        "inset-shadow": ["none", u, Br, Hr]
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
        "ring-offset": [ce, Ht]
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
        "text-shadow": ["none", f, Br, Hr]
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
        "mask-radial-at": M()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ce]
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
          p,
          Br,
          Hr
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
        ease: ["linear", "initial", v, Q, Z]
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
        animate: ["none", b, Q, Z]
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
        skew: be()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": be()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": be()
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
        translate: ve()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ve()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ve()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ve()
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
        stroke: [ce, Rn, Ht, ts]
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
}, xv = /* @__PURE__ */ tv(wv);
function ie(...e) {
  return xv(id(e));
}
function ns({
  ...e
}) {
  return /* @__PURE__ */ h(_y, { "data-slot": "dropdown-menu", ...e });
}
function rs({
  ...e
}) {
  return /* @__PURE__ */ h(
    $y,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function os({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ h(Hy, { children: /* @__PURE__ */ h(
    By,
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
function we({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ h(
    Wy,
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
function ss({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ h(
    zy,
    {
      "data-slot": "dropdown-menu-separator",
      className: ie("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
const Di = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Li = id, kv = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Li(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((c) => {
    const d = n?.[c], u = s?.[c];
    if (d === null) return null;
    const f = Di(d) || Di(u);
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
  return Li(e, i, l, n?.class, n?.className);
}, Ns = kv(
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
function Nt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ h(
    r ? Ap : "button",
    {
      "data-slot": "button",
      className: ie(Ns({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
var Cv = Object.freeze({
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
}), Ev = "VisuallyHidden", vd = T.forwardRef(
  (e, t) => /* @__PURE__ */ h(
    Le.span,
    {
      ...e,
      ref: t,
      style: { ...Cv, ...e.style }
    }
  )
);
vd.displayName = Ev;
var Mv = vd, [To] = kn("Tooltip", [
  xo
]), So = xo(), bd = "TooltipProvider", Tv = 700, Ds = "tooltip.open", [Sv, ba] = To(bd), wd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Tv,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = T.useRef(!0), a = T.useRef(!1), l = T.useRef(0);
  return T.useEffect(() => {
    const c = l.current;
    return () => window.clearTimeout(c);
  }, []), /* @__PURE__ */ h(
    Sv,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: n,
      onOpen: T.useCallback(() => {
        window.clearTimeout(l.current), i.current = !1;
      }, []),
      onClose: T.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => i.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: T.useCallback((c) => {
        a.current = c;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
wd.displayName = bd;
var Xn = "Tooltip", [Nv, or] = To(Xn), xd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, l = ba(Xn, e.__scopeTooltip), c = So(t), [d, u] = T.useState(null), f = eo(), p = T.useRef(0), g = i ?? l.disableHoverableContent, m = a ?? l.delayDuration, y = T.useRef(!1), [v, b] = ea({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (S) => {
      S ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Ds))) : l.onClose(), s?.(S);
    },
    caller: Xn
  }), x = T.useMemo(() => v ? y.current ? "delayed-open" : "instant-open" : "closed", [v]), M = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, b(!0);
  }, [b]), w = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, b(!1);
  }, [b]), E = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, b(!0), p.current = 0;
    }, m);
  }, [m, b]);
  return T.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ h(cc, { ...c, children: /* @__PURE__ */ h(
    Nv,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: x,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: T.useCallback(() => {
        l.isOpenDelayedRef.current ? E() : M();
      }, [l.isOpenDelayedRef, E, M]),
      onTriggerLeave: T.useCallback(() => {
        g ? w() : (window.clearTimeout(p.current), p.current = 0);
      }, [w, g]),
      onOpen: M,
      onClose: w,
      disableHoverableContent: g,
      children: n
    }
  ) });
};
xd.displayName = Xn;
var Ls = "TooltipTrigger", kd = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = or(Ls, n), s = ba(Ls, n), i = So(n), a = T.useRef(null), l = Ie(t, a, o.onTriggerChange), c = T.useRef(!1), d = T.useRef(!1), u = T.useCallback(() => c.current = !1, []);
    return T.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ h(dc, { asChild: !0, ...i, children: /* @__PURE__ */ h(
      Le.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: le(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: le(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: le(e.onPointerDown, () => {
          o.open && o.onClose(), c.current = !0, document.addEventListener("pointerup", u, { once: !0 });
        }),
        onFocus: le(e.onFocus, () => {
          c.current || o.onOpen();
        }),
        onBlur: le(e.onBlur, o.onClose),
        onClick: le(e.onClick, o.onClose)
      }
    ) });
  }
);
kd.displayName = Ls;
var wa = "TooltipPortal", [Dv, Lv] = To(wa, {
  forceMount: void 0
}), Cd = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = or(wa, t);
  return /* @__PURE__ */ h(Dv, { scope: t, forceMount: n, children: /* @__PURE__ */ h(Vt, { present: n || s.open, children: /* @__PURE__ */ h(da, { asChild: !0, container: o, children: r }) }) });
};
Cd.displayName = wa;
var yn = "TooltipContent", Ed = T.forwardRef(
  (e, t) => {
    const n = Lv(yn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = or(yn, e.__scopeTooltip);
    return /* @__PURE__ */ h(Vt, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ h(Md, { side: o, ...s, ref: t }) : /* @__PURE__ */ h(Av, { side: o, ...s, ref: t }) });
  }
), Av = T.forwardRef((e, t) => {
  const n = or(yn, e.__scopeTooltip), r = ba(yn, e.__scopeTooltip), o = T.useRef(null), s = Ie(t, o), [i, a] = T.useState(null), { trigger: l, onClose: c } = n, d = o.current, { onPointerInTransitChange: u } = r, f = T.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = T.useCallback(
    (g, m) => {
      const y = g.currentTarget, v = { x: g.clientX, y: g.clientY }, b = Ov(v, y.getBoundingClientRect()), x = _v(v, b), M = $v(m.getBoundingClientRect()), w = Bv([...x, ...M]);
      a(w), u(!0);
    },
    [u]
  );
  return T.useEffect(() => () => f(), [f]), T.useEffect(() => {
    if (l && d) {
      const g = (y) => p(y, d), m = (y) => p(y, l);
      return l.addEventListener("pointerleave", g), d.addEventListener("pointerleave", m), () => {
        l.removeEventListener("pointerleave", g), d.removeEventListener("pointerleave", m);
      };
    }
  }, [l, d, p, f]), T.useEffect(() => {
    if (i) {
      const g = (m) => {
        const y = m.target, v = { x: m.clientX, y: m.clientY }, b = l?.contains(y) || d?.contains(y), x = !Hv(v, i);
        b ? f() : x && (f(), c());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [l, d, i, c, f]), /* @__PURE__ */ h(Md, { ...e, ref: s });
}), [Iv, Rv] = To(Xn, { isInside: !1 }), Pv = /* @__PURE__ */ Rp("TooltipContent"), Md = T.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, l = or(yn, n), c = So(n), { onClose: d } = l;
    return T.useEffect(() => (document.addEventListener(Ds, d), () => document.removeEventListener(Ds, d)), [d]), T.useEffect(() => {
      if (l.trigger) {
        const u = (f) => {
          f.target?.contains(l.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [l.trigger, d]), /* @__PURE__ */ h(
      ta,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ I(
          uc,
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
              /* @__PURE__ */ h(Pv, { children: r }),
              /* @__PURE__ */ h(Iv, { scope: n, isInside: !0, children: /* @__PURE__ */ h(Mv, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Ed.displayName = yn;
var Td = "TooltipArrow", Sd = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = So(n);
    return Rv(
      Td,
      n
    ).isInside ? null : /* @__PURE__ */ h(fc, { ...o, ...r, ref: t });
  }
);
Sd.displayName = Td;
function Ov(e, t) {
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
function _v(e, t, n = 5) {
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
function $v(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function Hv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], l = t[i], c = a.x, d = a.y, u = l.x, f = l.y;
    d > r != f > r && n < (u - c) * (r - d) / (f - d) + c && (o = !o);
  }
  return o;
}
function Bv(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Wv(t);
}
function Wv(e) {
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
var zv = wd, Fv = xd, Uv = kd, Yv = Cd, jv = Ed, Vv = Sd;
function Kv({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ h(
    zv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function As({
  ...e
}) {
  return /* @__PURE__ */ h(Kv, { children: /* @__PURE__ */ h(Fv, { "data-slot": "tooltip", ...e }) });
}
function Is({
  ...e
}) {
  return /* @__PURE__ */ h(Uv, { "data-slot": "tooltip-trigger", ...e });
}
function Rs({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ h(Yv, { children: /* @__PURE__ */ I(
    jv,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: ie(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ h(Vv, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const xe = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ I(As, { children: [
    /* @__PURE__ */ h(Is, { asChild: !0, children: s }),
    /* @__PURE__ */ h(Rs, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, on = () => /* @__PURE__ */ h("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Gv = bt(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const l = Y(null), [c, d] = j(!1), [u, f] = j(void 0), p = fl({
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
  }, [t]), v = F((E) => {
    t.chain().focus().insertCallout({ type: E }).run();
  }, [t]), b = Y(/* @__PURE__ */ new Map()), x = Y(/* @__PURE__ */ new Map()), M = F((E) => {
    const { doc: S, tr: k } = E.state;
    let D = !1;
    const C = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = E.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    b.current.clear(), N.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((W) => {
        const V = W, R = (V.textContent || "").trim().substring(0, 50);
        b.current.set(`${O}-${R}`, V.getBoundingClientRect());
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
      k.replaceWith(K, K + P.nodeSize, U), D = !0;
    }
    D && (E.view.dispatch(k), requestAnimationFrame(() => {
      E.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const $ = O.querySelectorAll(":scope > li"), W = /* @__PURE__ */ new Map();
        b.current.forEach((V, R) => {
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
    t.state.doc.descendants((k, D) => (k.type.name === "taskItem" && E.set(D, k.attrs.checked === !0), !0)), x.current = E;
    const S = ({ transaction: k }) => {
      if (!k.docChanged) return;
      const D = /* @__PURE__ */ new Map();
      t.state.doc.descendants((L, P) => (L.type.name === "taskItem" && D.set(P, L.attrs.checked === !0), !0));
      const C = x.current;
      let N = !1;
      if (C.size > 0 && D.size > 0) {
        let L = 0, P = 0;
        C.forEach((O) => {
          O && L++;
        }), D.forEach((O) => {
          O && P++;
        }), L !== P && (N = !0);
      }
      x.current = D, N && setTimeout(() => {
        M(t);
      }, 150);
    };
    return t.on("transaction", S), () => {
      t.off("transaction", S);
    };
  }, [t, s, M]);
  const w = F(() => {
    M(t);
  }, [t, M]);
  return /* @__PURE__ */ I("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ h(ef, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ h(tf, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(on, {}),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ h(zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ h(Fs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ h(Us, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ h(Ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ h(gl, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ h(yl, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ h(js, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(on, {}),
    /* @__PURE__ */ I(ns, { children: [
      /* @__PURE__ */ h(rs, { asChild: !0, children: /* @__PURE__ */ I(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${p?.isH1 || p?.isH2 || p?.isH3 || p?.isH4 || p?.isH5 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ h("span", { className: "min-w-[18px] text-center", children: p?.isH1 ? "H1" : p?.isH2 ? "H2" : p?.isH3 ? "H3" : p?.isH4 ? "H4" : p?.isH5 ? "H5" : "P" }),
            /* @__PURE__ */ h(Jn, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ I(os, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ h("span", { className: "font-semibold", children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ h("span", { className: "font-semibold", children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ h("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ h("span", { className: "font-semibold", children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ h("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }),
              /* @__PURE__ */ h("span", { className: "font-semibold", children: "Heading 5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ h(on, {}),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ h(Vs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ h(Ks, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ h(Gs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ h(qs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => Js(t),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ h(vl, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => {
          if (p?.isTaskList)
            t.chain().focus().sinkListItem("taskItem").run();
          else if ((p?.isBulletList || p?.isOrderedList) && (t.chain().focus().sinkListItem("listItem").run(), p?.isOrderedList)) {
            const { state: E, view: S } = t, { $from: k } = E.selection, D = E.schema.nodes.orderedList, C = E.schema.nodes.bulletList;
            if (D && C)
              for (let N = k.depth; N >= 0; N--) {
                const L = k.node(N);
                if (L.type === D && N >= 2) {
                  const P = k.node(N - 1);
                  if (P.type.name === "listItem" || P.type.name === "taskItem") {
                    const O = k.before(N);
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
        children: /* @__PURE__ */ h(nf, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ h(rf, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(on, {}),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ h(ms, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ h(Bs, { size: 16 })
      }
    ),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ h(bl, { size: 16 })
      }
    ),
    /* @__PURE__ */ I(ns, { children: [
      /* @__PURE__ */ h(rs, { asChild: !0, children: /* @__PURE__ */ h(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ h(gs, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ I(os, { align: "start", children: [
        /* @__PURE__ */ I(we, { onClick: () => v("info"), children: [
          /* @__PURE__ */ h(gs, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ I(we, { onClick: () => v("note"), children: [
          /* @__PURE__ */ h(wl, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ I(we, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ h(of, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ I(we, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ h(sf, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ I(we, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ h(xl, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ I(ns, { children: [
      /* @__PURE__ */ h(rs, { asChild: !0, children: /* @__PURE__ */ I(
        Nt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ h(ms, { size: 16 }),
            /* @__PURE__ */ h("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ I(os, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ h(Ua, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ h(Ua, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ h(dn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ h(ss, {}),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ h(Ya, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ h(Ya, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ h(dn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ h(ss, {}),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ h(ja, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ h(ja, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ h(ss, {}),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ h(dn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ h(
      Rl,
      {
        isOpen: c,
        onClose: () => d(!1),
        onInsert: m,
        position: u
      }
    ),
    /* @__PURE__ */ h(on, {}),
    /* @__PURE__ */ h(
      xe,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ h(af, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ I(ye, { children: [
      /* @__PURE__ */ h(on, {}),
      /* @__PURE__ */ I(As, { children: [
        /* @__PURE__ */ h(Is, { asChild: !0, children: /* @__PURE__ */ h(
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
            children: /* @__PURE__ */ h(ho, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ h(Rs, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ h("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ I(As, { children: [
      /* @__PURE__ */ h(Is, { asChild: !0, children: /* @__PURE__ */ I(
        Nt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ h(bn, { size: 16 }),
            /* @__PURE__ */ h("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ h(Rs, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function qv({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: l }) {
  const c = s === "markdown", [d, u] = j(""), [f, p] = j(""), [g, m] = j(!1), [y, v] = j(!1), [b, x] = j(!1), [M, w] = j(!1), [E, S] = j([]), [k, D] = j(0), [C, N] = j(null), [L, P] = j(!1), O = Y(!1), $ = Y(null), W = Y(null), V = Y(!1);
  q(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const R = F(() => {
    if (!d || !e) {
      S([]), D(0), N(null);
      return;
    }
    const B = [];
    let J;
    try {
      if (y)
        J = new RegExp(d, g ? "g" : "gi");
      else {
        let _ = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        b && (_ = `\\b${_}\\b`), J = new RegExp(_, g ? "g" : "gi");
      }
      N(null);
    } catch (_) {
      N(_.message), S([]);
      return;
    }
    if (c) {
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
          let de;
          for (; (de = J.exec(ee.text)) !== null; )
            B.push({
              from: ne + de.index,
              to: ne + de.index + de[0].length,
              text: de[0]
            });
        }
        return !0;
      });
    }
    S(B), B.length > 0 && k >= B.length && D(0);
  }, [d, g, y, b, e, k, c, i]);
  q(() => {
    R();
  }, [R]), q(() => {
    c && l && (t && E.length > 0 ? l(E, k) : l([], 0));
  }, [c, t, E, k, l]), q(() => {
    if (!e) return;
    if (c) {
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
  }, [e, t, d, g, y, k, c, E, i]), q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, l]), q(() => {
    if (E.length > 0 && k < E.length) {
      const B = E[k];
      if (c) {
        const _ = document.querySelector(".syntax-textarea");
        if (_ && V.current) {
          const ee = parseInt(getComputedStyle(_).lineHeight) || 22, de = i.substring(0, B.from).split(`
`).length;
          _.scrollTop = Math.max(0, (de - 3) * ee);
        }
        V.current && (V.current = !1);
        return;
      }
      const J = e.view.domAtPos(B.from);
      J.node && J.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), V.current && (V.current = !1);
    }
  }, [k, E, e, c, i]), q(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, r]);
  const A = F(() => {
    E.length !== 0 && (V.current = !0, D((B) => (B + 1) % E.length));
  }, [E.length]), H = F(() => {
    E.length !== 0 && (V.current = !0, D((B) => (B - 1 + E.length) % E.length));
  }, [E.length]), G = F(() => {
    if (E.length === 0 || k >= E.length) return;
    const B = E[k];
    if (c && a) {
      const J = i.substring(0, B.from) + f + i.substring(B.to);
      a(J), setTimeout(R, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(f).run(), setTimeout(R, 10);
  }, [E, k, f, e, R, c, i, a]), z = F(() => {
    if (E.length === 0) return;
    if (c && a) {
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
  }, [E, f, e, R, c, i, a]), U = F(() => {
    if (E.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      wholeWord: b
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [E, d, g, y, b, e, n]), K = F((B) => {
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
            /* @__PURE__ */ h(lf, { size: 14, className: "find-replace-icon" }),
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
              children: /* @__PURE__ */ h(cf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: A,
              disabled: E.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ h(Jn, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: U,
              disabled: E.length === 0,
              className: `find-replace-btn ${L ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${E.length} matches`,
              children: /* @__PURE__ */ h(df, { size: 16 })
            }
          ),
          /* @__PURE__ */ h("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => m((B) => !B),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ h(uf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => x((B) => !B),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ h(ff, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => v((B) => !B),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ h(pf, { size: 16 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => w((B) => !B),
              className: `find-replace-btn ${M ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ h(ys, { size: 16 })
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
        M && /* @__PURE__ */ I("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ I("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ h(ys, { size: 14, className: "find-replace-icon" }),
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
                /* @__PURE__ */ h(hf, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const Xv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), dt = Xv ? "⌘" : "Ctrl", Zv = ({ editor: e }) => {
  const [t, n] = j(!1), [r, o] = j(0), [s, i] = j(0), [a, l] = j(""), [c, d] = j(""), [u, f] = j(!1), [p, g] = j(!1);
  q(() => {
    if (!e) return;
    const S = () => {
      const D = e.storage.selectAllOccurrences;
      D ? (n(D.isActive), o(D.ranges.length), i(D.allMatches.length), l(D.searchTerm), d(D.typedBuffer), f(D.isTypingReplace), g(D.isIncremental)) : (n(!1), o(0), i(0));
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
  }, [e]), v = F(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), b = F(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), x = F(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), M = F(() => {
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
        /* @__PURE__ */ h(po, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ h("span", { className: "select-all-action-bar-preview-new", children: c || "∅" })
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
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${dt}+U)`,
          children: /* @__PURE__ */ h(Us, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: b,
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
          children: /* @__PURE__ */ h(dn, { size: 14 })
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: M,
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
}, Qv = bt(Zv), Wr = "-dismissed";
function Jv(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function eb(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, l] = j({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), c = Y(null), d = Y(""), u = Y(0);
  q(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const v = localStorage.getItem(n), b = localStorage.getItem(n + Wr);
        if (v && !b) {
          let x = "";
          try {
            x = e.getHTML() || "";
          } catch {
            return;
          }
          v !== x && v.length > 50 && l((M) => ({ ...M, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, o]);
  const f = F(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const v = e.getHTML(), b = Jv(v);
        if (b === u.current && v.length === d.current.length) {
          l((x) => ({ ...x, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        l((x) => ({ ...x, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), d.current = v, u.current = b, l((x) => ({
          ...x,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(v), setTimeout(() => {
          l((x) => x.status === "saved" ? { ...x, status: "idle" } : x);
        }, 2e3);
      } catch (v) {
        console.error("useAutoSave: Error saving content", v), l((b) => ({
          ...b,
          status: "error",
          error: v instanceof Error ? v.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  q(() => {
    if (!e || !o || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", v), () => {
      e.off("update", v), c.current && clearTimeout(c.current);
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
  const p = F(() => {
    c.current && clearTimeout(c.current), f();
  }, [f]), g = F(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Wr), d.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (v) {
      console.warn("useAutoSave: Error clearing content", v);
    }
  }, [n]), m = F(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const v = localStorage.getItem(n);
      return v && e && !e.isDestroyed ? (l((b) => ({ ...b, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), d.current = v, localStorage.removeItem(n + Wr), i?.(v);
          } catch (b) {
            console.warn("useAutoSave: Error setting content during recovery", b);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, i]), y = F(() => {
    try {
      localStorage.setItem(n + Wr, "true"), l((v) => ({ ...v, hasRecoverableContent: !1 }));
    } catch (v) {
      console.warn("useAutoSave: Error dismissing recovery", v);
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
function Zr(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), l = s.after(s.depth);
  o.replaceWith(a, l, i);
  const c = a + i.nodeSize;
  if (c < o.doc.content.size) {
    const d = o.doc.resolve(c);
    d.nodeAfter && d.nodeAfter.isTextblock ? o.setSelection(Ve.create(o.doc, c + 1)) : d.nodeAfter && o.setSelection(Ve.near(o.doc.resolve(c)));
  } else {
    const u = r.schema.nodes.paragraph.create();
    o.insert(c, u), o.setSelection(Ve.create(o.doc, c + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function zn(e) {
  return e.replace(/^[ \t]*\u200B[ \t]*$/gm, "").replace(/\u200B/g, "");
}
function tb(e, {
  editor: t,
  turndownService: n,
  editorModeRef: r,
  handleModeSwitch: o,
  wordCount: s,
  autoSaveState: i,
  setIsFindReplaceOpen: a,
  setFindReplaceFocusTrigger: l
}) {
  Ku(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? zn(n.turndown(t.getHTML())) : "",
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
      t && Zr(t, t.state.selection.from, t.state.selection.from);
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
    }
  }), [t, n, o, s, i, a]);
}
const nb = new De("tableCellMenu");
function rb(e) {
  return new Ne({
    key: nb,
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
            return e.chain().focus().setTextSelection(a).run(), ob(n, e, a), !0;
          }
          return !1;
        }
      }
    }
  });
}
function ob(e, t, n) {
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
    { label: "Copy Table", icon: "copy", action: () => sb(t) }
  ], y = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, v = c ? "#2a2a2a" : "#f5f5f5", b = c ? "#ff6b6b" : "#dc2626", x = c ? "#999999" : "#666666", M = c ? "#333333" : "#e5e5e5";
  m.forEach((S) => {
    if (S.label === "divider") {
      const k = document.createElement("div");
      k.style.cssText = "height:1px;background:" + M + ";margin:4px 0;", o.appendChild(k);
    } else {
      const k = document.createElement("button");
      k.type = "button";
      const D = S.destructive ? b : f;
      k.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + D + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const C = y[S.icon || ""] || "", N = S.destructive ? b : x;
      k.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + N + ';">' + C + '</span><span style="flex:1;white-space:nowrap;">' + S.label + "</span>", k.addEventListener("mouseenter", () => {
        k.style.background = S.destructive ? c ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : v;
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
function sb(e) {
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
const ab = ep.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      rb(this.editor)
    ];
  }
}), ib = tp.extend({}), Fn = new De("tableSorting");
let Ft = null, Hn = null;
function lb(e) {
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
function cb(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function db(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (g, m) => {
    if (g.type.name === "table" && m === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Ft?.tablePos === t && Ft?.columnIndex === n && Ft?.direction === "asc" ? "desc" : "asc";
  Ft = { tablePos: t, columnIndex: n, direction: i }, Hn = null;
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
    Ai(n, i), o.dispatch(r.tr.setMeta(Fn, { updated: !0 }));
    return;
  }
  const d = c.map((g) => {
    let m = "", y = 0;
    return g.node.forEach((v) => {
      y === n && (m = v.textContent || ""), y++;
    }), { ...g, sortValue: lb(m) };
  }), u = d.map((g, m) => m);
  d.sort((g, m) => cb(g.sortValue, m.sortValue, i));
  const f = d.map((g, m) => c.indexOf(g));
  if (u.some((g, m) => g !== f[m])) {
    const g = [];
    l.forEach((v) => g.push(v.node)), d.forEach((v) => g.push(v.node));
    const m = s.type.create(s.attrs, g), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, m), y.setMeta(Fn, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Fn, { updated: !0 }));
  Ai(n, i);
}
function Ai(e, t) {
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
function ub(e, t, n, r) {
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
    d.preventDefault(), d.stopPropagation(), db(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function fb(e) {
  return new Ne({
    key: Fn,
    state: {
      init() {
        return je.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Fn);
        return !t.docChanged && !s?.updated && Hn ? Hn.map(t.mapping, t.doc) : (Hn = pb(o.doc, e), Hn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function pb(e, t) {
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
              d.forEach((x, M) => {
                x.type.name === "paragraph" && (p = f + 1 + M + x.nodeSize - 1);
              });
              const m = Ft?.tablePos === s && Ft?.columnIndex === l ? Ft.direction : null, y = l, v = s, b = Ze.widget(p, () => ub(m, v, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(b);
            }
            c += d.nodeSize, l++;
          });
        }
      });
    }
  }), je.create(e, n);
}
const hb = Oe.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [fb(this.editor)];
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
const mb = np.extend({
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
}), gb = rp.extend({
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
}), yb = sp.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: l, $to: c } = a, d = l.blockRange(c);
        if (!d)
          return !1;
        const u = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let w = l.depth; w > 0; w--)
          if (l.node(w).type === u) {
            p = !0, l.before(w);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const g = n.schema.nodes.bulletList, m = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let v = null, b = -1;
        for (let w = l.depth; w > 0; w--) {
          const E = l.node(w);
          if (E.type === g || E.type === m) {
            v = E, b = l.before(w);
            break;
          }
        }
        if (v) {
          if (!o) return !0;
          const w = b, E = r.doc.nodeAt(w);
          if (!E) return !1;
          r.setNodeMarkup(w, u, E.attrs);
          const S = r.doc.nodeAt(w);
          if (!S) return !1;
          const k = [];
          S.forEach((D, C) => {
            D.type === y && k.push(w + 1 + C);
          });
          for (let D = k.length - 1; D >= 0; D--) {
            const C = k[D], N = r.doc.nodeAt(C);
            N && N.type === y && r.setNodeMarkup(C, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const x = Ka(d, u);
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
              S.forEach((D, C) => {
                D.type === y && k.push(E + 1 + C);
              });
              for (let D = k.length - 1; D >= 0; D--) {
                const C = k[D], N = r.doc.nodeAt(C);
                N && N.type === y && r.setNodeMarkup(C, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const M = Ka(d, g);
        if (M) {
          r.wrap(d, M);
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
}), vb = ap.extend({
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
          return f.setSelection(Ve.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
}), bb = op.extend({
  content: "paragraph block*"
}), Ii = new De("collapsibleList");
function Ps(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function io(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function wb(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
function as(e, t) {
  const n = [];
  return e.descendants((r) => {
    if (t.includes(r.type.name)) {
      const o = io(r) ? "1" : "0", s = r.firstChild?.textContent.slice(0, 50) ?? "";
      n.push(`${o}:${s}`);
    }
  }), n.join("|");
}
function zr(e, t, n, r) {
  const o = [];
  return e.descendants((s, i) => {
    if (!n.listItemTypes.includes(s.type.name) || !io(s))
      return !0;
    const a = Ps(s, i), l = t.collapsedItems.has(a);
    o.push(
      Ze.node(i, i + s.nodeSize, {
        class: `collapsible-list-item ${l ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const c = s.firstChild;
    if (c && c.type.name === "paragraph") {
      const d = i + 1 + c.nodeSize - 1, u = Ze.widget(
        d,
        () => {
          const f = CSS.escape(a), p = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${f}"]`
          );
          if (p) {
            p.classList.contains("collapsed") !== l && (p.classList.remove("collapsed", "expanded"), p.classList.add(l ? "collapsed" : "expanded"), p.title = l ? "Click to expand" : "Click to collapse");
            const v = p.parentElement;
            if (v) return v;
          }
          const g = document.createElement("span");
          g.className = "collapsible-list-chevron-wrapper", g.setAttribute("contenteditable", "false");
          const m = document.createElement("button");
          return m.className = `collapsible-list-chevron ${l ? "collapsed" : "expanded"}`, m.setAttribute("data-list-item-id", a), m.setAttribute("contenteditable", "false"), m.setAttribute("tabindex", "-1"), m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', m.title = l ? "Click to expand" : "Click to collapse", m.addEventListener("click", (y) => {
            y.preventDefault(), y.stopPropagation();
            const v = m.classList.contains("collapsed");
            m.classList.remove("collapsed", "expanded"), m.classList.add(v ? "expanded" : "collapsed"), m.title = v ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), r.current && r.current.dispatch(
              r.current.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), g.appendChild(m), g;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      o.push(u);
    }
    if (l && wb(s, i)) {
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
  }), je.create(e, o);
}
const xb = Oe.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !io(o))
          return !1;
        const s = Ps(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && io(o) && n.collapsedItems.add(Ps(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options, n = { current: null };
    return [
      new Ne({
        key: Ii,
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
              decorations: zr(o.doc, e, t, n),
              docVersion: 0,
              listFingerprint: as(o.doc, t.listItemTypes)
            };
          },
          apply(r, o, s, i) {
            if (r.getMeta("collapsibleList"))
              return {
                collapsedItems: new Set(e.collapsedItems),
                decorations: zr(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                listFingerprint: as(i.doc, t.listItemTypes)
              };
            if (r.docChanged) {
              const l = as(i.doc, t.listItemTypes);
              return l !== o.listFingerprint ? {
                collapsedItems: new Set(e.collapsedItems),
                decorations: zr(i.doc, e, t, n),
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
            const o = Ii.getState(r);
            return o?.decorations ? o.decorations : zr(r.doc, e, t, n);
          }
        }
      })
    ];
  }
}), Ri = "http://www.w3.org/2000/svg";
function Bt(e, t, n) {
  const r = document.createElementNS(Ri, "svg");
  r.setAttribute("width", String(t)), r.setAttribute("height", String(t)), r.setAttribute("viewBox", "0 0 24 24"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-linejoin", "round"), n && r.setAttribute("class", n);
  for (const o of e) {
    const s = document.createElementNS(Ri, o.tag);
    for (const [i, a] of Object.entries(o.attrs))
      s.setAttribute(i, a);
    r.appendChild(s);
  }
  return r;
}
const kb = [
  { tag: "circle", attrs: { cx: "12", cy: "12", r: "10" } },
  { tag: "path", attrs: { d: "M12 16v-4" } },
  { tag: "path", attrs: { d: "M12 8h.01" } }
], Cb = [
  { tag: "path", attrs: { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" } },
  { tag: "path", attrs: { d: "M15 3v4a2 2 0 0 0 2 2h4" } }
], Eb = [
  { tag: "path", attrs: { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" } },
  { tag: "path", attrs: { d: "M13 8H7" } },
  { tag: "path", attrs: { d: "M17 12H7" } }
], Mb = [
  { tag: "path", attrs: { d: "M12 7v14" } },
  { tag: "path", attrs: { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" } }
], Tb = [
  { tag: "rect", attrs: { x: "3", y: "5", width: "6", height: "6", rx: "1" } },
  { tag: "path", attrs: { d: "m3 17 2 2 4-4" } },
  { tag: "path", attrs: { d: "M13 6h8" } },
  { tag: "path", attrs: { d: "M13 12h8" } },
  { tag: "path", attrs: { d: "M13 18h8" } }
], Sb = [
  { tag: "rect", attrs: { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" } },
  { tag: "path", attrs: { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" } },
  { tag: "path", attrs: { d: "M12 11h4" } },
  { tag: "path", attrs: { d: "M12 16h4" } },
  { tag: "path", attrs: { d: "M8 11h.01" } },
  { tag: "path", attrs: { d: "M8 16h.01" } }
], is = [
  { tag: "path", attrs: { d: "m6 9 6 6 6-6" } }
], Nb = [
  { tag: "path", attrs: { d: "m9 18 6-6-6-6" } }
], ln = {
  info: { iconElements: kb, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { iconElements: Cb, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { iconElements: Eb, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { iconElements: Mb, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { iconElements: Tb, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { iconElements: Sb, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
}, Db = Object.keys(ln);
class Lb {
  constructor(t, n, r) {
    this.collapsed = !1, this.showDropdown = !1, this.portalContainer = null, this.dropdownEl = null, this.handleHeaderClick = (i) => {
      this.toggleCollapse();
    }, this.handleButtonClick = (i) => {
      i.stopPropagation(), this.view.editable && this.toggleDropdown();
    }, this.node = t, this.view = n, this.getPos = r;
    const o = t.attrs.type || "info", s = ln[o] || ln.info;
    this.boundHandleClickOutside = this.handleClickOutside.bind(this), this.boundHandleScroll = this.closeDropdown.bind(this), this.dom = document.createElement("div"), this.dom.className = `callout callout-${o}`, this.dom.setAttribute("data-callout", ""), this.dom.setAttribute("data-type", o), this.dom.setAttribute("data-node-view-wrapper", ""), this.headerEl = document.createElement("div"), this.headerEl.className = "callout-header", this.headerEl.style.cursor = "pointer", this.headerEl.style.userSelect = "none", this.headerEl.style.webkitUserSelect = "none", this.headerEl.title = "Click to collapse", this.headerEl.addEventListener("click", this.handleHeaderClick), this.headerButton = document.createElement("button"), this.headerButton.className = "callout-header-button", this.headerButton.title = n.editable ? "Click to change callout type" : s.label, this.headerButton.style.color = s.borderColor, this.headerButton.style.userSelect = "none", this.headerButton.style.webkitUserSelect = "none", this.headerButton.addEventListener("click", this.handleButtonClick), this.headerIconContainer = document.createElement("span"), this.headerIconContainer.style.display = "flex", this.headerIconContainer.appendChild(Bt(s.iconElements, 18)), this.labelEl = document.createElement("span"), this.labelEl.className = "callout-label", this.labelEl.textContent = s.label, this.typeChevronEl = Bt(is, 12, "callout-type-chevron"), n.editable || (this.typeChevronEl.style.display = "none"), this.headerButton.appendChild(this.headerIconContainer), this.headerButton.appendChild(this.labelEl), this.headerButton.appendChild(this.typeChevronEl), this.collapseIndicator = document.createElement("div"), this.collapseIndicator.className = "callout-collapse-indicator", this.collapseIndicator.style.color = s.borderColor, this.collapseIndicator.appendChild(Bt(is, 16)), this.headerEl.appendChild(this.headerButton), this.headerEl.appendChild(this.collapseIndicator), this.contentWrapper = document.createElement("div"), this.contentWrapper.className = "callout-content", this.contentDOM = document.createElement("div"), this.contentWrapper.appendChild(this.contentDOM), this.dom.appendChild(this.headerEl), this.dom.appendChild(this.contentWrapper);
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed, this.collapsed ? (this.dom.classList.add("callout-collapsed"), this.contentWrapper.classList.add("callout-content-hidden"), this.headerEl.title = "Click to expand") : (this.dom.classList.remove("callout-collapsed"), this.contentWrapper.classList.remove("callout-content-hidden"), this.headerEl.title = "Click to collapse"), this.collapseIndicator.innerHTML = "", this.collapseIndicator.appendChild(
      this.collapsed ? Bt(Nb, 16) : Bt(is, 16)
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
    for (const o of Db) {
      const s = ln[o], i = document.createElement("button");
      i.className = `callout-type-option${o === r ? " active" : ""}`, i.addEventListener("click", (c) => {
        c.stopPropagation(), this.handleTypeChange(o);
      }), i.addEventListener("mousedown", (c) => c.stopPropagation());
      const a = Bt(s.iconElements, 16);
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
    const n = ln[t] || ln.info;
    this.dom.className = `callout callout-${t}${this.collapsed ? " callout-collapsed" : ""}`, this.dom.setAttribute("data-type", t), this.headerButton.style.color = n.borderColor, this.headerButton.title = this.view.editable ? "Click to change callout type" : n.label, this.headerIconContainer.innerHTML = "", this.headerIconContainer.appendChild(Bt(n.iconElements, 18)), this.labelEl.textContent = n.label, this.collapseIndicator.style.color = n.borderColor;
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
const Ab = mo.create({
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
      xn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return ({ node: e, view: t, getPos: n }) => new Lb(e, t, n);
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
}), Ib = fp.extend({
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
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: new De("resizableImageCopy"),
        props: {
          handleDOMEvents: {
            copy(e, t) {
              const { state: n } = e;
              if (!(n.selection instanceof Yf)) return !1;
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
      const l = (A) => !(!A || A.startsWith("data:") || A.startsWith("blob:") || A.startsWith("http://") || A.startsWith("https://")), c = (A) => {
        l(A) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(A).then((H) => {
          a.src = H, a.style.opacity = "1";
        }).catch(() => {
          a.src = A, a.style.opacity = "1";
        })) : a.src = A;
      };
      c(t.attrs.src);
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
          U.preventDefault(), U.stopPropagation(), G(), f.style.display = "none", D = !1;
        }), z;
      }, g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', m = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
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
      })), f.appendChild(p("Copy URL", v, async () => {
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
      const b = document.createElement("div");
      b.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(b);
      const x = document.createElement("div");
      x.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, x.textContent = "Alignment", f.appendChild(x);
      const M = document.createElement("div");
      M.style.cssText = `
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
        }), E.push(z), M.appendChild(z);
      }), f.appendChild(M);
      const k = () => {
        const A = o.attrs.align || "left";
        S(A);
      };
      let D = !1;
      u.addEventListener("click", (A) => {
        if (A.preventDefault(), A.stopPropagation(), D)
          f.style.display = "none", D = !1;
        else {
          const H = u.getBoundingClientRect(), G = 200, z = f.closest('[role="dialog"]');
          let U = 0, K = 0;
          if (z) {
            const de = z.getBoundingClientRect();
            U = de.left, K = de.top;
          }
          let B = H.bottom + 4 - K, J = H.right - G - U;
          const _ = window.innerHeight, ee = window.innerWidth, ne = 200;
          H.bottom + 4 + ne > _ && (B = H.top - ne - 4 - K), J + U < 8 && (J = 8 - U), J + G + U > ee - 8 && (J = ee - G - 8 - U), f.style.top = `${B}px`, f.style.left = `${J}px`, f.style.display = "flex", D = !0, k();
        }
      });
      const C = (A) => {
        !f.contains(A.target) && !u.contains(A.target) && (f.style.display = "none", D = !1);
      };
      document.addEventListener("click", C);
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
      }), s.appendChild(a), s.appendChild(N), s.appendChild(d), s.appendChild(u);
      const L = s.closest('[role="dialog"]');
      L ? L.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        d.style.opacity = "1", u.style.opacity = "1", N.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        d.style.opacity = "0", N.style.opacity = "0", D || (u.style.opacity = "0");
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
      N.addEventListener("click", P);
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
        update: (A) => A.type.name !== "resizableImage" ? !1 : (o = A, c(A.attrs.src), a.alt = A.attrs.alt || "", A.attrs.width && (a.style.width = `${A.attrs.width}px`), i(A.attrs.align || "left"), !0),
        destroy: () => {
          d.removeEventListener("mousedown", W), N.removeEventListener("click", P), document.removeEventListener("click", C), f.remove();
        }
      };
    };
  }
});
function Rb(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Pb = {}, Bn = {};
function Ut(e, t) {
  try {
    const r = (Pb[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in Bn ? Bn[r] : Pi(r, r.split(":"));
  } catch {
    if (e in Bn) return Bn[e];
    const n = e?.match(Ob);
    return n ? Pi(e, n.slice(1)) : NaN;
  }
}
const Ob = /([+-]\d\d):?(\d\d)?/;
function Pi(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Bn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class rt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ut(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Nd(this), Os(this)) : this.setTime(Date.now());
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
    const t = -Ut(this.timeZone, this);
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
const Oi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Oi.test(e)) return;
  const t = e.replace(Oi, "$1UTC");
  rt.prototype[t] && (e.startsWith("get") ? rt.prototype[e] = function() {
    return this.internal[t]();
  } : (rt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), _b(this), +this;
  }, rt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Os(this), +this;
  }));
});
function Os(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ut(e.timeZone, e) * 60));
}
function _b(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Nd(e);
}
function Nd(e) {
  const t = Ut(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const c = /* @__PURE__ */ new Date(+e);
  c.setUTCSeconds(0);
  const d = o > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(Ut(e.timeZone, e) * 60)) % 60;
  (u || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + d));
  const f = Ut(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), m = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, v = m - l;
  if (y && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const b = Ut(e.timeZone, e), x = b > 0 ? Math.floor(b) : Math.ceil(b), M = p - x;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
  }
}
class Ae extends rt {
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
    return `${t} GMT${n}${r}${o} (${Rb(this.timeZone, this)})`;
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
const Dd = 6048e5, $b = 864e5, _i = Symbol.for("constructDateFrom");
function ke(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && _i in e ? e[_i](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function he(e, t) {
  return ke(t || e, e);
}
function Ld(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(t) ? ke(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ad(e, t, n) {
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
let Hb = {};
function sr() {
  return Hb;
}
function vn(e, t) {
  const n = sr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function Zn(e, t) {
  return vn(e, { ...t, weekStartsOn: 1 });
}
function Id(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = ke(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Zn(o), i = ke(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = Zn(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function $i(e) {
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
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Qn(e, t) {
  const n = he(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Rd(e, t, n) {
  const [r, o] = Sn(
    n?.in,
    e,
    t
  ), s = Qn(r), i = Qn(o), a = +s - $i(s), l = +i - $i(i);
  return Math.round((a - l) / $b);
}
function Bb(e, t) {
  const n = Id(e, t), r = ke(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Zn(r);
}
function Wb(e, t, n) {
  return Ld(e, t * 7, n);
}
function zb(e, t, n) {
  return Ad(e, t * 12, n);
}
function Fb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ke.bind(null, o));
    const s = he(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), ke(r, n || NaN);
}
function Ub(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ke.bind(null, o));
    const s = he(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), ke(r, n || NaN);
}
function Yb(e, t, n) {
  const [r, o] = Sn(
    n?.in,
    e,
    t
  );
  return +Qn(r) == +Qn(o);
}
function Pd(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function jb(e) {
  return !(!Pd(e) && typeof e != "number" || isNaN(+he(e)));
}
function Vb(e, t, n) {
  const [r, o] = Sn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function Kb(e, t) {
  const n = he(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Od(e, t) {
  const [n, r] = Sn(e, t.start, t.end);
  return { start: n, end: r };
}
function Gb(e, t) {
  const { start: n, end: r } = Od(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const l = [];
  for (; +i <= s; )
    l.push(ke(n, i)), i.setMonth(i.getMonth() + a);
  return o ? l.reverse() : l;
}
function qb(e, t) {
  const n = he(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Xb(e, t) {
  const n = he(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function _d(e, t) {
  const n = he(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Zb(e, t) {
  const { start: n, end: r } = Od(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const l = [];
  for (; +i <= s; )
    l.push(ke(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? l.reverse() : l;
}
function $d(e, t) {
  const n = sr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function Qb(e, t) {
  return $d(e, { ...t, weekStartsOn: 1 });
}
const Jb = {
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
}, ew = (e, t, n) => {
  let r;
  const o = Jb[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ls(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const tw = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, nw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, rw = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ow = {
  date: ls({
    formats: tw,
    defaultWidth: "full"
  }),
  time: ls({
    formats: nw,
    defaultWidth: "full"
  }),
  dateTime: ls({
    formats: rw,
    defaultWidth: "full"
  })
}, sw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, aw = (e, t, n, r) => sw[e];
function Pn(e) {
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
const iw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, lw = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, cw = {
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
}, dw = {
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
}, uw = {
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
}, fw = {
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
}, pw = (e, t) => {
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
}, hw = {
  ordinalNumber: pw,
  era: Pn({
    values: iw,
    defaultWidth: "wide"
  }),
  quarter: Pn({
    values: lw,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Pn({
    values: cw,
    defaultWidth: "wide"
  }),
  day: Pn({
    values: dw,
    defaultWidth: "wide"
  }),
  dayPeriod: Pn({
    values: uw,
    defaultWidth: "wide",
    formattingValues: fw,
    defaultFormattingWidth: "wide"
  })
};
function On(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(a) ? gw(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      mw(a, (u) => u.test(i))
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
function mw(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function gw(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function yw(e) {
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
const vw = /^(\d+)(th|st|nd|rd)?/i, bw = /\d+/i, ww = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, xw = {
  any: [/^b/i, /^(a|c)/i]
}, kw = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Cw = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ew = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Mw = {
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
}, Tw = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Sw = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Nw = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Dw = {
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
}, Lw = {
  ordinalNumber: yw({
    matchPattern: vw,
    parsePattern: bw,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: On({
    matchPatterns: ww,
    defaultMatchWidth: "wide",
    parsePatterns: xw,
    defaultParseWidth: "any"
  }),
  quarter: On({
    matchPatterns: kw,
    defaultMatchWidth: "wide",
    parsePatterns: Cw,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: On({
    matchPatterns: Ew,
    defaultMatchWidth: "wide",
    parsePatterns: Mw,
    defaultParseWidth: "any"
  }),
  day: On({
    matchPatterns: Tw,
    defaultMatchWidth: "wide",
    parsePatterns: Sw,
    defaultParseWidth: "any"
  }),
  dayPeriod: On({
    matchPatterns: Nw,
    defaultMatchWidth: "any",
    parsePatterns: Dw,
    defaultParseWidth: "any"
  })
}, ka = {
  code: "en-US",
  formatDistance: ew,
  formatLong: ow,
  formatRelative: aw,
  localize: hw,
  match: Lw,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Aw(e, t) {
  const n = he(e, t?.in);
  return Rd(n, _d(n)) + 1;
}
function Hd(e, t) {
  const n = he(e, t?.in), r = +Zn(n) - +Bb(n);
  return Math.round(r / Dd) + 1;
}
function Bd(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = sr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = ke(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = vn(i, t), l = ke(t?.in || e, 0);
  l.setFullYear(r, 0, s), l.setHours(0, 0, 0, 0);
  const c = vn(l, t);
  return +n >= +a ? r + 1 : +n >= +c ? r : r - 1;
}
function Iw(e, t) {
  const n = sr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Bd(e, t), s = ke(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), vn(s, t);
}
function Wd(e, t) {
  const n = he(e, t?.in), r = +vn(n, t) - +Iw(n, t);
  return Math.round(r / Dd) + 1;
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
}, sn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Hi = {
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
    const o = Bd(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return pe(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : pe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Id(e);
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
    const o = Wd(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : pe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Hd(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : pe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Et.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Aw(e);
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
    switch (r === 12 ? o = sn.noon : r === 0 ? o = sn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = sn.evening : r >= 12 ? o = sn.afternoon : r >= 4 ? o = sn.morning : o = sn.night, t) {
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
        return Wi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Wt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Wt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Wi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Wt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Wt(r, ":");
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
        return "GMT" + Bi(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Wt(r, ":");
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
        return "GMT" + Bi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Wt(r, ":");
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
function Bi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + pe(s, 2);
}
function Wi(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + pe(Math.abs(e) / 60, 2) : Wt(e, t);
}
function Wt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = pe(Math.trunc(r / 60), 2), s = pe(r % 60, 2);
  return n + o + t + s;
}
const zi = (e, t) => {
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
}, zd = (e, t) => {
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
}, Rw = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return zi(e, t);
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
  return s.replace("{{date}}", zi(r, t)).replace("{{time}}", zd(o, t));
}, Pw = {
  p: zd,
  P: Rw
}, Ow = /^D+$/, _w = /^Y+$/, $w = ["D", "DD", "YY", "YYYY"];
function Hw(e) {
  return Ow.test(e);
}
function Bw(e) {
  return _w.test(e);
}
function Ww(e, t, n) {
  const r = zw(e, t, n);
  if (console.warn(r), $w.includes(e)) throw new RangeError(r);
}
function zw(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Fw = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Uw = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Yw = /^'([^]*?)'?$/, jw = /''/g, Vw = /[a-zA-Z]/;
function Kw(e, t, n) {
  const r = sr(), o = n?.locale ?? r.locale ?? ka, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = he(e, n?.in);
  if (!jb(a))
    throw new RangeError("Invalid time value");
  let l = t.match(Uw).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const f = Pw[u];
      return f(d, o.formatLong);
    }
    return d;
  }).join("").match(Fw).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: Gw(d) };
    if (Hi[u])
      return { isToken: !0, value: d };
    if (u.match(Vw))
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
    (!n?.useAdditionalWeekYearTokens && Bw(u) || !n?.useAdditionalDayOfYearTokens && Hw(u)) && Ww(u, t, String(e));
    const f = Hi[u[0]];
    return f(a, u, o.localize, c);
  }).join("");
}
function Gw(e) {
  const t = e.match(Yw);
  return t ? t[1].replace(jw, "'") : e;
}
function qw(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = ke(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Xw(e, t) {
  return he(e, t?.in).getMonth();
}
function Zw(e, t) {
  return he(e, t?.in).getFullYear();
}
function Qw(e, t) {
  return +he(e) > +he(t);
}
function Jw(e, t) {
  return +he(e) < +he(t);
}
function e0(e, t, n) {
  const [r, o] = Sn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function t0(e, t, n) {
  const [r, o] = Sn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function n0(e, t, n) {
  const r = he(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = ke(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = qw(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function r0(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(+r) ? ke(e, NaN) : (r.setFullYear(t), r);
}
const Fi = 5, o0 = 4;
function s0(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Fi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Fi : o0;
}
function Fd(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function a0(e, t) {
  const n = Fd(e, t), r = s0(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ae.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Ae(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Ld(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Ad(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Wb(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : zb(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Rd(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Vb(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Gb(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Zb(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : a0(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Qb(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Kb(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : $d(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Xb(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : Kw(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Hd(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Xw(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : Zw(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Wd(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Qw(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Jw(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Pd(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Yb(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : e0(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : t0(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Fb(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Ub(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : n0(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : r0(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Fd(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : Qn(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Zn(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : qb(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : vn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : _d(r), this.options = { locale: ka, ...t }, this.overrides = n;
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
class Ud {
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
class i0 {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class l0 {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function c0(e) {
  return X.createElement("button", { ...e });
}
function d0(e) {
  return X.createElement("span", { ...e });
}
function u0(e) {
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
function f0(e) {
  const { day: t, modifiers: n, ...r } = e;
  return X.createElement("td", { ...r });
}
function p0(e) {
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
var He;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(He || (He = {}));
function h0(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[te.Dropdown], n].join(" "), a = t?.find(({ value: l }) => l === s.value);
  return X.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[te.DropdownRoot] },
    X.createElement(r.Select, { className: i, ...s }, t?.map(({ value: l, label: c, disabled: d }) => X.createElement(r.Option, { key: l, value: l, disabled: d }, c))),
    X.createElement(
      "span",
      { className: o[te.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      X.createElement(r.Chevron, { orientation: "down", size: 18, className: o[te.Chevron] })
    )
  );
}
function m0(e) {
  return X.createElement("div", { ...e });
}
function g0(e) {
  return X.createElement("div", { ...e });
}
function y0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r }, e.children);
}
function v0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r });
}
function b0(e) {
  return X.createElement("table", { ...e });
}
function w0(e) {
  return X.createElement("div", { ...e });
}
const Yd = hl(void 0);
function ar() {
  const e = ml(Yd);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function x0(e) {
  const { components: t } = ar();
  return X.createElement(t.Dropdown, { ...e });
}
function k0(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: l, labelNext: c } } = ar(), d = F((f) => {
    o && n?.(f);
  }, [o, n]), u = F((f) => {
    r && t?.(f);
  }, [r, t]);
  return X.createElement(
    "nav",
    { ...s },
    X.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[te.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: u },
      X.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[te.Chevron], orientation: "left" })
    ),
    X.createElement(
      i.NextMonthButton,
      { type: "button", className: a[te.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": c(o), onClick: d },
      X.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[te.Chevron] })
    )
  );
}
function C0(e) {
  const { components: t } = ar();
  return X.createElement(t.Button, { ...e });
}
function E0(e) {
  return X.createElement("option", { ...e });
}
function M0(e) {
  const { components: t } = ar();
  return X.createElement(t.Button, { ...e });
}
function T0(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function S0(e) {
  return X.createElement("select", { ...e });
}
function N0(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function D0(e) {
  return X.createElement("th", { ...e });
}
function L0(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function A0(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function I0(e) {
  return X.createElement("th", { ...e });
}
function R0(e) {
  return X.createElement("tbody", { ...e });
}
function P0(e) {
  const { components: t } = ar();
  return X.createElement(t.Dropdown, { ...e });
}
const O0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: c0,
  CaptionLabel: d0,
  Chevron: u0,
  Day: f0,
  DayButton: p0,
  Dropdown: h0,
  DropdownNav: m0,
  Footer: g0,
  Month: y0,
  MonthCaption: v0,
  MonthGrid: b0,
  Months: w0,
  MonthsDropdown: x0,
  Nav: k0,
  NextMonthButton: C0,
  Option: E0,
  PreviousMonthButton: M0,
  Root: T0,
  Select: S0,
  Week: N0,
  WeekNumber: A0,
  WeekNumberHeader: I0,
  Weekday: D0,
  Weekdays: L0,
  Weeks: R0,
  YearsDropdown: P0
}, Symbol.toStringTag, { value: "Module" }));
function ft(e, t, n = !1, r = it) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function jd(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ca(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Vd(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Kd(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Gd(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function qd(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function pt(e, t, n = it) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (qd(a, n))
      return a.includes(e);
    if (Ca(a))
      return ft(a, e, !1, n);
    if (Gd(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (jd(a)) {
      const l = s(a.before, e), c = s(a.after, e), d = l > 0, u = c < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return Vd(a) ? s(e, a.after) > 0 : Kd(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function _0(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: l, broadcastCalendar: c, today: d } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: g, endOfMonth: m, isAfter: y } = o, v = n && p(n), b = r && m(r), x = {
    [ge.focused]: [],
    [ge.outside]: [],
    [ge.disabled]: [],
    [ge.hidden]: [],
    [ge.today]: []
  }, M = {};
  for (const w of e) {
    const { date: E, displayMonth: S } = w, k = !!(S && !f(E, S)), D = !!(v && g(E, v)), C = !!(b && y(E, b)), N = !!(s && pt(E, s, o)), L = !!(i && pt(E, i, o)) || D || C || // Broadcast calendar will show outside days as default
    !c && !l && k || c && l === !1 && k, P = u(E, d ?? o.today());
    k && x.outside.push(w), N && x.disabled.push(w), L && x.hidden.push(w), P && x.today.push(w), a && Object.keys(a).forEach((O) => {
      const $ = a?.[O];
      $ && pt(E, $, o) && (M[O] ? M[O].push(w) : M[O] = [w]);
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
      const D = x[k];
      E[k] = D.some((C) => C === w);
    }
    for (const k in M)
      S[k] = M[k].some((D) => D === w);
    return {
      ...E,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function $0(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ge[s]] ? o.push(t[ge[s]]) : t[Xe[s]] && o.push(t[Xe[s]]), o), [t[te.Day]]);
}
function H0(e) {
  return {
    ...O0,
    ...e
  };
}
function B0(e) {
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
  for (const t in He)
    e[He[t]] = `rdp-${He[t]}`;
  return e;
}
function Xd(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const W0 = Xd;
function z0(e, t, n) {
  return (n ?? new Fe(t)).format(e, "d");
}
function F0(e, t = it) {
  return t.format(e, "LLLL");
}
function U0(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccccc");
}
function Y0(e, t = it) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function j0() {
  return "";
}
function Zd(e, t = it) {
  return t.format(e, "yyyy");
}
const V0 = Zd, K0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Xd,
  formatDay: z0,
  formatMonthCaption: W0,
  formatMonthDropdown: F0,
  formatWeekNumber: Y0,
  formatWeekNumberHeader: j0,
  formatWeekdayName: U0,
  formatYearCaption: V0,
  formatYearDropdown: Zd
}, Symbol.toStringTag, { value: "Module" }));
function G0(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...K0,
    ...e
  };
}
function q0(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: l, getMonth: c } = o;
  return l({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), g = c(f), m = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: p, disabled: m };
  });
}
function X0(e, t = {}, n = {}) {
  let r = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function Z0(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function Q0(e, t, n, r, o = !1) {
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
function Qd(e, t, n, r) {
  let o = (r ?? new Fe(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const J0 = Qd;
function Jd(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const ex = Jd;
function tx(e, t, n, r) {
  let o = (r ?? new Fe(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function nx(e) {
  return "Choose the Month";
}
function rx() {
  return "";
}
function ox(e) {
  return "Go to the Next Month";
}
function sx(e) {
  return "Go to the Previous Month";
}
function ax(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccc");
}
function ix(e, t) {
  return `Week ${e}`;
}
function lx(e) {
  return "Week Number";
}
function cx(e) {
  return "Choose the Year";
}
const dx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ex,
  labelDay: J0,
  labelDayButton: Qd,
  labelGrid: Jd,
  labelGridcell: tx,
  labelMonthDropdown: nx,
  labelNav: rx,
  labelNext: ox,
  labelPrevious: sx,
  labelWeekNumber: ix,
  labelWeekNumberHeader: lx,
  labelWeekday: ax,
  labelYearDropdown: cx
}, Symbol.toStringTag, { value: "Module" })), ir = (e) => e instanceof HTMLElement ? e : null, cs = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], ux = (e) => ir(e.querySelector("[data-animated-month]")), ds = (e) => ir(e.querySelector("[data-animated-caption]")), us = (e) => ir(e.querySelector("[data-animated-weeks]")), fx = (e) => ir(e.querySelector("[data-animated-nav]")), px = (e) => ir(e.querySelector("[data-animated-weekdays]"));
function hx(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = Y(null), a = Y(r), l = Y(!1);
  fo(() => {
    const c = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || c.length === 0 || r.length !== c.length)
      return;
    const d = s.isSameMonth(r[0].date, c[0].date), u = s.isAfter(r[0].date, c[0].date), f = u ? n[He.caption_after_enter] : n[He.caption_before_enter], p = u ? n[He.weeks_after_enter] : n[He.weeks_before_enter], g = i.current, m = e.current.cloneNode(!0);
    if (m instanceof HTMLElement ? (cs(m).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const M = ux(x);
      M && x.contains(M) && x.removeChild(M);
      const w = ds(x);
      w && w.classList.remove(f);
      const E = us(x);
      E && E.classList.remove(p);
    }), i.current = m) : i.current = null, l.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = g instanceof HTMLElement ? cs(g) : [], v = cs(e.current);
    if (v?.every((b) => b instanceof HTMLElement) && y && y.every((b) => b instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const b = fx(e.current);
      b && (b.style.zIndex = "1"), v.forEach((x, M) => {
        const w = y[M];
        if (!w)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const E = ds(x);
        E && E.classList.add(f);
        const S = us(x);
        S && S.classList.add(p);
        const k = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), E && E.classList.remove(f), S && S.classList.remove(p), x.style.position = "", x.style.overflow = "", x.contains(w) && x.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const D = px(w);
        D && (D.style.opacity = "0");
        const C = ds(w);
        C && (C.classList.add(u ? n[He.caption_before_exit] : n[He.caption_after_exit]), C.addEventListener("animationend", k));
        const N = us(w);
        N && N.classList.add(u ? n[He.weeks_before_exit] : n[He.weeks_after_exit]), x.insertBefore(w, x.firstChild);
      });
    }
  });
}
function mx(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: l } = n ?? {}, { addDays: c, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: g, endOfWeek: m, isAfter: y, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: x } = r, M = l ? v(o, r) : i ? b(o) : x(o), w = l ? f(s) : i ? p(g(s)) : m(g(s)), E = d(w, M), S = u(s, o) + 1, k = [];
  for (let N = 0; N <= E; N++) {
    const L = c(M, N);
    if (t && y(L, t))
      break;
    k.push(L);
  }
  const C = (l ? 35 : 42) * S;
  if (a && k.length < C) {
    const N = C - k.length;
    for (let L = 0; L < N; L++) {
      const P = c(k[k.length - 1], 1);
      k.push(P);
    }
  }
  return k;
}
function gx(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function yx(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function Ui(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let l = o || s || i;
  const { differenceInCalendarMonths: c, addMonths: d, startOfMonth: u } = r;
  if (n && c(n, l) < a - 1) {
    const f = -1 * (a - 1);
    l = d(n, f);
  }
  return t && c(l, t) < 0 && (l = t), u(l);
}
function vx(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: l, getISOWeek: c, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, g = e.reduce((m, y) => {
    const v = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? f(y) : p(y), b = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : l(a(y)), x = t.filter((S) => S >= v && S <= b), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < M) {
      const S = t.filter((k) => {
        const D = M - x.length;
        return k > b && k <= o(b, D);
      });
      x.push(...S);
    }
    const w = x.reduce((S, k) => {
      const D = n.ISOWeek ? c(k) : d(k), C = S.find((L) => L.weekNumber === D), N = new Ud(k, y, r);
      return C ? C.days.push(N) : S.push(new l0(D, [N])), S;
    }, []), E = new i0(y, w);
    return m.push(E), m;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function bx(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: l, endOfYear: c, newDate: d, today: u } = t, { fromYear: f, toYear: p, fromMonth: g, toMonth: m } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !r && m && (r = m), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = d(f, 0, 1) : !n && y && (n = o(l(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = c(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function wx(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, c = o ? s : 1, d = i(e);
  if (!t)
    return a(d, c);
  if (!(l(t, e) < s))
    return a(d, c);
}
function xx(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, c = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -c);
  if (!(l(d, t) <= 0))
    return a(d, -c);
}
function kx(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function No(e, t) {
  const [n, r] = j(e);
  return [t === void 0 ? n : t, r];
}
function Cx(e, t) {
  const [n, r] = bx(e, t), { startOfMonth: o, endOfMonth: s } = t, i = Ui(e, n, r, t), [a, l] = No(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  q(() => {
    const E = Ui(e, n, r, t);
    l(E);
  }, [e.timeZone]);
  const c = yx(a, r, e, t), d = mx(c, e.endMonth ? s(e.endMonth) : void 0, e, t), u = vx(c, d, e, t), f = kx(u), p = gx(u), g = xx(a, n, e, t), m = wx(a, r, e, t), { disableNavigation: y, onMonthChange: v } = e, b = (E) => f.some((S) => S.days.some((k) => k.isEqualTo(E))), x = (E) => {
    if (y)
      return;
    let S = o(E);
    n && S < o(n) && (S = o(n)), r && S > o(r) && (S = o(r)), l(S), v?.(S);
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
      b(E) || x(E.date);
    }
  };
}
var et;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(et || (et = {}));
function Yi(e) {
  return !e[ge.disabled] && !e[ge.hidden] && !e[ge.outside];
}
function Ex(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    Yi(a) && (a[ge.focused] && s < et.FocusedModifier ? (o = i, s = et.FocusedModifier) : r?.isEqualTo(i) && s < et.LastFocused ? (o = i, s = et.LastFocused) : n(i.date) && s < et.Selected ? (o = i, s = et.Selected) : a[ge.today] && s < et.Today && (o = i, s = et.Today));
  }
  return o || (o = e.find((i) => Yi(t(i)))), o;
}
function Mx(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: l } = s, { addDays: c, addMonths: d, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: g, endOfWeek: m, max: y, min: v, startOfBroadcastWeek: b, startOfISOWeek: x, startOfWeek: M } = i;
  let E = {
    day: c,
    week: u,
    month: d,
    year: f,
    startOfWeek: (S) => l ? b(S, i) : a ? x(S) : M(S),
    endOfWeek: (S) => l ? p(S) : a ? g(S) : m(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? E = y([r, E]) : t === "after" && o && (E = v([o, E])), E;
}
function eu(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const l = Mx(e, t, n.date, r, o, s, i), c = !!(s.disabled && pt(l, s.disabled, i)), d = !!(s.hidden && pt(l, s.hidden, i)), u = l, f = new Ud(l, u, i);
  return !c && !d ? f : eu(e, t, f, r, o, s, i, a + 1);
}
function Tx(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = j(), l = Ex(t.days, n, r || (() => !1), i), [c, d] = j(s ? l : void 0);
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
      const v = eu(m, y, c, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(v)) || (t.goToDay(v), d(v)));
    }
  };
}
function Sx(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = No(n, o ? n : void 0), a = o ? n : s, { isSameDay: l } = t, c = (p) => a?.some((g) => l(g, p)) ?? !1, { min: d, max: u } = e;
  return {
    selected: a,
    select: (p, g, m) => {
      let y = [...a ?? []];
      if (c(p)) {
        if (a?.length === d || r && a?.length === 1)
          return;
        y = a?.filter((v) => !l(v, p));
      } else
        a?.length === u ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, g, m), y;
    },
    isSelected: c
  };
}
function Nx(e, t, n = 0, r = 0, o = !1, s = it) {
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
function Dx(e, t, n = it) {
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
function ji(e, t, n = it) {
  return ft(e, t.from, !1, n) || ft(e, t.to, !1, n) || ft(t, e.from, !1, n) || ft(t, e.to, !1, n);
}
function Lx(e, t, n = it) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? ft(e, a, !1, n) : qd(a, n) ? a.some((l) => ft(e, l, !1, n)) : Ca(a) ? a.from && a.to ? ji(e, { from: a.from, to: a.to }, n) : !1 : Gd(a) ? Dx(e, a.dayOfWeek, n) : jd(a) ? n.isAfter(a.before, a.after) ? ji(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : pt(e.from, a, n) || pt(e.to, a, n) : Vd(a) || Kd(a) ? pt(e.from, a, n) || pt(e.to, a, n) : !1))
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
function Ax(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, l] = No(o, i ? o : void 0), c = i ? o : a;
  return {
    selected: c,
    select: (f, p, g) => {
      const { min: m, max: y } = e, v = f ? Nx(f, c, m, y, s, t) : void 0;
      return r && n && v?.from && v.to && Lx({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), i || l(v), i?.(v, f, p, g), v;
    },
    isSelected: (f) => c && ft(c, f, !1, t)
  };
}
function Ix(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = No(n, o ? n : void 0), a = o ? n : s, { isSameDay: l } = t;
  return {
    selected: a,
    select: (u, f, p) => {
      let g = u;
      return !r && a && a && l(u, a) && (g = void 0), o || i(g), o?.(g, u, f, p), g;
    },
    isSelected: (u) => a ? l(a, u) : !1
  };
}
function Rx(e, t) {
  const n = Ix(e, t), r = Sx(e, t), o = Ax(e, t);
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
function Px(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ae(t.today, t.timeZone)), t.month && (t.month = new Ae(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ae(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ae(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ae(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ae(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ae) => new Ae(ae, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ae(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ae(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = St(() => {
    const ae = { ...ka, ...t.locale };
    return {
      dateLib: new Fe({
        locale: ae,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: H0(t.components),
      formatters: G0(t.formatters),
      labels: { ...dx, ...t.labels },
      locale: ae,
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
  ]), { captionLayout: l, mode: c, navLayout: d, numberOfMonths: u = 1, onDayBlur: f, onDayClick: p, onDayFocus: g, onDayKeyDown: m, onDayMouseEnter: y, onDayMouseLeave: v, onNextClick: b, onPrevClick: x, showWeekNumber: M, styles: w } = t, { formatCaption: E, formatDay: S, formatMonthDropdown: k, formatWeekNumber: D, formatWeekNumberHeader: C, formatWeekdayName: N, formatYearDropdown: L } = r, P = Cx(t, s), { days: O, months: $, navStart: W, navEnd: V, previousMonth: R, nextMonth: A, goToMonth: H } = P, G = _0(O, t, W, V, s), { isSelected: z, select: U, selected: K } = Rx(t, s) ?? {}, { blur: B, focused: J, isFocusTarget: _, moveFocus: ee, setFocused: ne } = Tx(t, P, G, z ?? (() => !1), s), { labelDayButton: de, labelGridcell: be, labelGrid: ve, labelMonthDropdown: Ue, labelNav: lt, labelPrevious: Rt, labelNext: Nn, labelWeekday: Dn, labelWeekNumber: lr, labelWeekNumberHeader: cr, labelYearDropdown: dr } = o, ur = St(() => Z0(s, t.ISOWeek), [s, t.ISOWeek]), Ln = c !== void 0 || p !== void 0, qt = F(() => {
    R && (H(R), x?.(R));
  }, [R, H, x]), wt = F(() => {
    A && (H(A), b?.(A));
  }, [H, A, b]), fr = F((ae, me) => (re) => {
    re.preventDefault(), re.stopPropagation(), ne(ae), U?.(ae.date, me, re), p?.(ae.date, me, re);
  }, [U, p, ne]), pr = F((ae, me) => (re) => {
    ne(ae), g?.(ae.date, me, re);
  }, [g, ne]), hr = F((ae, me) => (re) => {
    B(), f?.(ae.date, me, re);
  }, [B, f]), mr = F((ae, me) => (re) => {
    const fe = {
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
    if (fe[re.key]) {
      re.preventDefault(), re.stopPropagation();
      const [Te, ue] = fe[re.key];
      ee(Te, ue);
    }
    m?.(ae.date, me, re);
  }, [ee, m, t.dir]), Lo = F((ae, me) => (re) => {
    y?.(ae.date, me, re);
  }, [y]), Ao = F((ae, me) => (re) => {
    v?.(ae.date, me, re);
  }, [v]), Io = F((ae) => (me) => {
    const re = Number(me.target.value), fe = s.setMonth(s.startOfMonth(ae), re);
    H(fe);
  }, [s, H]), Ro = F((ae) => (me) => {
    const re = Number(me.target.value), fe = s.setYear(s.startOfMonth(ae), re);
    H(fe);
  }, [s, H]), { className: Po, style: gr } = St(() => ({
    className: [a[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[te.Root], ...t.style }
  }), [a, t.className, t.style, w]), Oo = B0(t), yr = Y(null);
  hx(yr, !!t.animate, {
    classNames: a,
    months: $,
    focused: J,
    dateLib: s
  });
  const _o = {
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
    Yd.Provider,
    { value: _o },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? yr : void 0, className: Po, style: gr, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Oo },
      X.createElement(
        n.Months,
        { className: a[te.Months], style: w?.[te.Months] },
        !t.hideNavigation && !d && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: w?.[te.Nav], "aria-label": lt(), onPreviousClick: qt, onNextClick: wt, previousMonth: R, nextMonth: A }),
        $.map((ae, me) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[te.Month],
            style: w?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: me,
            displayIndex: me,
            calendarMonth: ae
          },
          d === "around" && !t.hideNavigation && me === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[te.PreviousMonthButton], tabIndex: R ? void 0 : -1, "aria-disabled": R ? void 0 : !0, "aria-label": Rt(R), onClick: qt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: R ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[te.MonthCaption], style: w?.[te.MonthCaption], calendarMonth: ae, displayIndex: me }, l?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: a[te.Dropdowns], style: w?.[te.Dropdowns] },
            (() => {
              const re = l === "dropdown" || l === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: a[te.MonthsDropdown], "aria-label": Ue(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Io(ae.date), options: q0(ae.date, W, V, r, s), style: w?.[te.Dropdown], value: s.getMonth(ae.date) }) : X.createElement("span", { key: "month" }, k(ae.date, s)), fe = l === "dropdown" || l === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: a[te.YearsDropdown], "aria-label": dr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Ro(ae.date), options: Q0(W, V, r, s, !!t.reverseYears), style: w?.[te.Dropdown], value: s.getYear(ae.date) }) : X.createElement("span", { key: "year" }, L(ae.date, s));
              return s.getMonthYearOrder() === "year-first" ? [fe, re] : [re, fe];
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
            } }, E(ae.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: a[te.CaptionLabel], role: "status", "aria-live": "polite" }, E(ae.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && me === u - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: a[te.NextMonthButton], tabIndex: A ? void 0 : -1, "aria-disabled": A ? void 0 : !0, "aria-label": Nn(A), onClick: wt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: A ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          me === u - 1 && d === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: w?.[te.Nav], "aria-label": lt(), onPreviousClick: qt, onNextClick: wt, previousMonth: R, nextMonth: A }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": ve(ae.date, s.options, s) || void 0, className: a[te.MonthGrid], style: w?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[te.Weekdays], style: w?.[te.Weekdays] },
              M && X.createElement(n.WeekNumberHeader, { "aria-label": cr(s.options), className: a[te.WeekNumberHeader], style: w?.[te.WeekNumberHeader], scope: "col" }, C()),
              ur.map((re) => X.createElement(n.Weekday, { "aria-label": Dn(re, s.options, s), className: a[te.Weekday], key: String(re), style: w?.[te.Weekday], scope: "col" }, N(re, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[te.Weeks], style: w?.[te.Weeks] }, ae.weeks.map((re) => X.createElement(
              n.Week,
              { className: a[te.Week], key: re.weekNumber, style: w?.[te.Week], week: re },
              M && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: re, style: w?.[te.WeekNumber], "aria-label": lr(re.weekNumber, {
                locale: i
              }), className: a[te.WeekNumber], scope: "row", role: "rowheader" }, D(re.weekNumber, s)),
              re.days.map((fe) => {
                const { date: Te } = fe, ue = G(fe);
                if (ue[ge.focused] = !ue.hidden && !!J?.isEqualTo(fe), ue[Xe.selected] = z?.(Te) || ue.selected, Ca(K)) {
                  const { from: Qt, to: Pt } = K;
                  ue[Xe.range_start] = !!(Qt && Pt && s.isSameDay(Te, Qt)), ue[Xe.range_end] = !!(Qt && Pt && s.isSameDay(Te, Pt)), ue[Xe.range_middle] = ft(K, Te, !0, s);
                }
                const Xt = X0(ue, w, t.modifiersStyles), Zt = $0(ue, a, t.modifiersClassNames), $o = !Ln && !ue.hidden ? be(Te, ue, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Te, "yyyy-MM-dd")}_${s.format(fe.displayMonth, "yyyy-MM")}`, day: fe, modifiers: ue, className: Zt.join(" "), style: Xt, role: "gridcell", "aria-selected": ue.selected || void 0, "aria-label": $o, "data-day": s.format(Te, "yyyy-MM-dd"), "data-month": fe.outside ? s.format(Te, "yyyy-MM") : void 0, "data-selected": ue.selected || void 0, "data-disabled": ue.disabled || void 0, "data-hidden": ue.hidden || void 0, "data-outside": fe.outside || void 0, "data-focused": ue.focused || void 0, "data-today": ue.today || void 0 }, !ue.hidden && Ln ? X.createElement(n.DayButton, { className: a[te.DayButton], style: w?.[te.DayButton], type: "button", day: fe, modifiers: ue, disabled: ue.disabled || void 0, tabIndex: _(fe) ? 0 : -1, "aria-label": de(Te, ue, s.options, s), onClick: fr(fe, ue), onBlur: hr(fe, ue), onFocus: pr(fe, ue), onKeyDown: mr(fe, ue), onMouseEnter: Lo(fe, ue), onMouseLeave: Ao(fe, ue) }, S(Te, s.options, s)) : !ue.hidden && S(fe.date, s.options, s))
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
function Ox({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const l = Ea();
  return /* @__PURE__ */ h(
    Px,
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
          Ns({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: ie(
          Ns({ variant: o }),
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
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
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
        Root: ({ className: c, rootRef: d, ...u }) => /* @__PURE__ */ h(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: ie(c),
            ...u
          }
        ),
        Chevron: ({ className: c, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ h(mf, { className: ie("size-4", c), ...u }) : d === "right" ? /* @__PURE__ */ h(
          gf,
          {
            className: ie("size-4", c),
            ...u
          }
        ) : /* @__PURE__ */ h(yf, { className: ie("size-4", c), ...u }),
        DayButton: _x,
        WeekNumber: ({ children: c, ...d }) => /* @__PURE__ */ h("td", { ...d, children: /* @__PURE__ */ h("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: c }) }),
        ...i
      },
      ...a
    }
  );
}
function _x({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ea(), s = T.useRef(null);
  return T.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ h(
    Nt,
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
let pn = null;
const tu = /* @__PURE__ */ new Map(), $x = /* @__PURE__ */ new Map();
function Qr() {
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
function Hx(e) {
  return pn?.pillDate === e;
}
function Bx({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = Y(null), i = Do(e);
  q(() => {
    const b = (x) => {
      x.key === "Escape" && (x.stopPropagation(), x.preventDefault(), o());
    };
    return document.addEventListener("keydown", b, !0), () => document.removeEventListener("keydown", b, !0);
  }, [o]), q(() => {
    const b = (M) => {
      s.current && !s.current.contains(M.target) && (M.target.closest(".date-pill") || o());
    }, x = setTimeout(() => {
      document.addEventListener("mousedown", b, !0);
    }, 50);
    return () => {
      clearTimeout(x), document.removeEventListener("mousedown", b, !0);
    };
  }, [o]);
  const a = F((b) => {
    b && r(mn(b)), o();
  }, [r, o]), l = F((b) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + b), r(mn(x)), o();
  }, [r, o]), c = F(() => {
    const x = (/* @__PURE__ */ new Date()).getDay(), M = x === 0 ? 1 : 8 - x, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + M), r(mn(w)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), f = new Date(d);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), g = d.getDay(), m = g === 0 ? 1 : 8 - g, y = new Date(d);
  y.setDate(y.getDate() + m);
  const v = y.toDateString();
  return /* @__PURE__ */ I(
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
        /* @__PURE__ */ h("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ I("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ h("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ h(
            Ox,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ h("div", { className: "border-t border-border" }),
          /* @__PURE__ */ I("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ h(
              Nt,
              {
                variant: "outline",
                size: "sm",
                className: ie(
                  "rounded-full text-xs",
                  i.toDateString() === u && "ring-2 ring-primary"
                ),
                onClick: () => l(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ h(
              Nt,
              {
                variant: "outline",
                size: "sm",
                className: ie(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => l(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ h(
              Nt,
              {
                variant: "outline",
                size: "sm",
                className: ie(
                  "rounded-full text-xs",
                  i.toDateString() === v && "ring-2 ring-primary"
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
function Wx(e, t, n) {
  if (Hx(t)) {
    Qr();
    return;
  }
  Qr();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, l = 10, c = 16, d = s - r.bottom - l - c, u = r.top - l - c, f = d >= a ? "below" : u >= a ? "above" : d >= u ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + l : p = r.top - a - l;
  const g = r.left + r.width / 2;
  let m = g - i / 2;
  m + i > o - c && (m = o - i - c), m < c && (m = c);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    y.addEventListener(w, (E) => {
      E.stopPropagation();
    }, !1);
  });
  const b = pp(y);
  pn = { container: y, root: b, pillDate: t };
  const x = () => {
    Qr();
  }, M = (w) => {
    const E = tu.get(t);
    E && E(w);
  };
  b.render(
    /* @__PURE__ */ h(
      Bx,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: m, direction: f, pillCenter: g },
        onSelectDate: M,
        onClose: x
      }
    )
  );
}
function zx({ node: e, updateAttributes: t, selected: n }) {
  const r = Y(null), o = e.attrs.date || hn(), s = nu(o), i = Ma(o), a = F(() => {
    if (!r.current) return "";
    const l = r.current.closest(".markdown-editor-container");
    if (l) {
      const d = l.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return q(() => (tu.set(o, (l) => {
    t({ date: l });
  }), $x.set(o, a), () => {
  }), [o, t, a]), q(() => {
    const l = r.current;
    if (!l) return;
    const c = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = l.getAttribute("data-date") || hn(), f = a();
      Wx(l, u, f);
    };
    return l.addEventListener("click", c), () => l.removeEventListener("click", c);
  }, [a]), q(() => {
    const l = r.current?.closest(".ProseMirror") || document, c = () => {
      pn && Qr();
    };
    return l.addEventListener("scroll", c, { passive: !0 }), () => {
      l.removeEventListener("scroll", c);
    };
  }, []), /* @__PURE__ */ h(Jr, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ h(kl, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ h("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Do(e) {
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
function Un(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function mn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function nu(e) {
  const t = Do(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function Fx(e) {
  return Do(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function zt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return hn();
  if (n === "tomorrow") return Un(1);
  if (n === "yesterday") return Un(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), l = a === 0 ? 1 : 8 - a;
    return Un(l);
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
      return mn(d);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return mn(i);
  }
  return null;
}
function Ma(e) {
  const t = Do(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Ux = new De("datePillPaste"), Yx = mo.create({
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
    const n = e.attrs.date, r = nu(n), o = Ma(n);
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
    return pl(zx, {
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
    const e = new Pe({
      find: /@today\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(hn()).run();
      }
    }), t = new Pe({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Un(1)).run();
      }
    }), n = new Pe({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Un(-1)).run();
      }
    }), r = new Pe({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), o = new Pe({
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
          u().deleteRange(d).insertDatePill(mn(y)).run();
        }
      }
    }), s = new Pe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = zt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), i = new Pe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = zt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), a = new Pe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), l = new Pe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = zt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), c = new Pe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = zt(f[1]);
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
      new Ne({
        key: Ux,
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
              if (zt(l[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const m = new RegExp(i.source, i.flags);
            let y;
            for (; (y = m.exec(o)) !== null; ) {
              const M = y[1], w = zt(M);
              if (w) {
                const E = o.slice(g, y.index);
                E && p.push(f.text(E)), p.push(e.create({ date: w })), g = y.index + y[0].length;
              }
            }
            const v = o.slice(g);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const b = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: x } = d.selection;
            if (x.parent.type.name === "paragraph") {
              const M = u;
              let w = d.selection.from;
              for (const E of p)
                M.insert(w, E), w += E.nodeSize;
              M.delete(d.selection.from, d.selection.to), t.dispatch(M);
            } else
              u.replaceSelectionWith(b), t.dispatch(u);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), qe = /* @__PURE__ */ new Map();
function jx({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = Y(null), i = Y(null), a = e.attrs.tag || "", l = Y(!1), [c, d] = j(() => qe.has(a)), [u, f] = j(() => qe.get(a)?.value ?? a);
  q(() => {
    c || f(a);
  }, [a, c]), q(() => {
    if (c) {
      const b = qe.get(a);
      qe.set(a, {
        value: u,
        focusedAt: b?.focusedAt ?? Date.now()
      });
    }
  }, [c, u, a]);
  const p = F((b) => {
    if (l.current) return;
    l.current = !0;
    const x = b.trim().replace(/^#/, ""), M = Yn(x);
    if (qe.delete(a), M && qe.delete(M), !M || !cn(M))
      o();
    else if (M !== a) {
      const w = r();
      if (typeof w == "number" && n) {
        const { tr: E } = n.state, S = e.nodeSize;
        E.delete(w, w + S), E.insert(w, n.schema.nodes.tagPill.create({ tag: M })), n.view.dispatch(E);
      }
    } else
      qe.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), g = F(() => {
    n && !n.isEditable || (qe.set(a, { value: a, focusedAt: Date.now() }), f(a), d(!0), l.current = !1);
  }, [n, a]);
  q(() => {
    const b = s.current;
    if (!b || c) return;
    const x = (w) => {
      w.preventDefault(), w.stopPropagation(), g();
    }, M = (w) => {
      w.preventDefault(), w.stopPropagation();
    };
    return b.addEventListener("dblclick", x), b.addEventListener("click", M), () => {
      b.removeEventListener("dblclick", x), b.removeEventListener("click", M);
    };
  }, [c, n, r, g]), q(() => {
    if (c) {
      const b = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const x = qe.get(a);
          x && (x.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(b);
    }
  }, [c, a]);
  const m = F((b) => {
    b.key === "Enter" ? (b.preventDefault(), p(u)) : b.key === "Escape" && (b.preventDefault(), qe.delete(a), d(!1), l.current = !0, n?.commands.focus());
  }, [p, u, a, n]), y = F(() => {
    const x = qe.get(a)?.focusedAt ?? 0;
    Date.now() - x > 300 && p(u);
  }, [p, u, a]), v = F((b) => {
    f(b.target.value);
  }, []);
  return c ? /* @__PURE__ */ h(Jr, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ h(Va, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ h(
          "input",
          {
            ref: i,
            type: "text",
            className: "tag-pill-input",
            value: u,
            onChange: v,
            onKeyDown: m,
            onBlur: y,
            spellCheck: !1,
            autoComplete: "off"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ h(Jr, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ h(Va, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ h("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function cn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Yn(e) {
  return e.toLowerCase().trim();
}
const Vx = new De("tagPillPaste"), Kx = mo.create({
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
    return pl(jx, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Yn(e);
        return cn(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new Pe({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = Yn(r[1]);
        if (cn(o)) {
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
        key: Vx,
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
              if (cn(l[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const m = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = m.exec(o)) !== null; ) {
              const x = Yn(y[1]);
              if (cn(x)) {
                const M = y[0], w = M.startsWith(" ") || M.startsWith(`
`) ? 1 : 0, E = o.slice(g, y.index + w);
                E && p.push(f.text(E)), p.push(e.create({ tag: x })), g = y.index + M.length;
              }
            }
            const v = o.slice(g);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const { $from: b } = d.selection;
            if (b.parent.type.name === "paragraph") {
              const x = u;
              let M = d.selection.from;
              for (const w of p)
                x.insert(M, w), M += w.nodeSize;
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
}), Gx = /\[\[([^\[\]]+)\]\]$/, qx = Dl.create({
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
      new Pe({
        find: Gx,
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
}, Xx = ["info", "note", "prompt", "resources", "todo", "summary"];
function Zx(e) {
  return e.length < 3 ? !1 : !!(ut.header.test(e) || ut.bold.test(e) || ut.list.test(e) || ut.taskList.test(e) || ut.codeBlock.test(e) || ut.callout.test(e) || ut.highlight.test(e) || ut.link.test(e) || ut.table.test(e));
}
function Qx(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function Jx(e, t) {
  const { alt: n, align: r, width: o } = Qx(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function lo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Vi(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${lo(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(Jx(i[1], i[2])) : o.push(`<p>${lo(s.trim())}</p>`);
  }
  return o.join("");
}
function ru(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^[-*+]\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function ou(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const l = e[a]?.type || "ul", c = l === "task", d = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, u = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (c ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${lo(f.text)}</p>` : i += `<li><p>${lo(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function Ki(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return Vi(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(ou(s)), s = []);
  };
  for (const a of r) {
    const l = ru(a);
    if (l) {
      if (s.length > 0) {
        const c = s[0].type;
        l.depth === 0 && l.type !== c && i();
      }
      s.push(l);
    } else
      i(), o.push(Vi(a.trim()));
  }
  return i(), o.join("");
}
function ek(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + Ki(a) + "</th>";
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
        i += "<td>" + Ki(u) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function tk(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (u) => {
    const f = u.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const g = ek(u);
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
  }), Xx.forEach((u) => {
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
  const l = () => {
    a.length !== 0 && (i.push(ou(a)), a = []);
  };
  for (const u of s) {
    const f = ru(u);
    if (f) {
      if (a.length > 0) {
        const g = a[0].type, m = Math.min(...a.map((y) => y.depth));
        f.depth === m && f.type !== g && l();
      }
      a.push(f);
      continue;
    }
    l();
    let p = u;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (g, m, y) => {
      const v = m.length;
      return `<h${v}>${y}</h${v}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), i.push(p);
  }
  l(), t = i.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (u, f, p) => {
    const g = f.split("|").map((x) => x.trim());
    let m = "", y = "left", v = null;
    g.length === 1 ? m = g[0] : g.length === 2 ? (m = g[0], /^\d+$/.test(g[1]) ? v = g[1] : ["left", "center", "right"].includes(g[1]) ? y = g[1] : m = f) : g.length === 3 ? (m = g[0], ["left", "center", "right"].includes(g[1]) && (y = g[1]), /^\d+$/.test(g[2]) && (v = g[2])) : m = f;
    const b = v ? ` width="${v}" style="width: ${v}px"` : "";
    return `<img src="${p.trim()}" alt="${m}" data-align="${y}"${b}>`;
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
const nk = Oe.create({
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
            if (!i || !Zx(i))
              return !1;
            n.preventDefault();
            const a = tk(i);
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
}), Gi = new De("collapsibleHeading");
function su(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function _s(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), l = `h${i}-${a}`, c = r.get(l) ?? 0;
      r.set(l, c + 1), n.set(s, su(i, a, c));
    }
  }), n;
}
function Fr(e, t, n, r) {
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
          const M = y.parentElement;
          if (M) return M;
        }
        const v = document.createElement("span");
        v.className = "collapsible-heading-chevron-wrapper", v.setAttribute("contenteditable", "false");
        const b = document.createElement("button");
        return b.className = `collapsible-heading-chevron ${p ? "collapsed" : "expanded"}`, b.setAttribute("data-heading-id", f), b.setAttribute("data-heading-level", String(d.attrs.level)), b.setAttribute("contenteditable", "false"), b.setAttribute("tabindex", "-1"), b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', b.title = p ? "Click to expand" : "Click to collapse", b.addEventListener("click", (x) => {
          x.preventDefault(), x.stopPropagation();
          const M = b.classList.contains("collapsed");
          b.classList.remove("collapsed", "expanded"), b.classList.add(M ? "expanded" : "collapsed"), b.title = M ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(f) ? t.collapsedHeadings.delete(f) : t.collapsedHeadings.add(f), r.current && r.current.dispatch(r.current.state.tr.setMeta("collapsibleHeading", { toggled: f }));
        }), v.appendChild(b), v;
      }, { side: 1, key: `chevron-${f}` });
      o.push(m);
    } else d.isBlock && c(u) && o.push(
      Ze.node(u, u + d.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), je.create(e, o);
}
function qi(e, t) {
  const n = [];
  return e.descendants((r) => {
    r.type.name === "heading" && t.includes(r.attrs.level) && n.push(`${r.attrs.level}:${r.textContent.slice(0, 50)}`);
  }), n.join("|");
}
function rk(e, t, n, r) {
  const o = [], s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  e.descendants((c) => {
    if (c.type.name === "heading" && n.includes(c.attrs.level)) {
      const d = c.attrs.level, u = c.textContent.slice(0, 50);
      o.push(`${d}:${u}`);
      const f = `h${d}-${u}`, p = i.get(f) ?? 0;
      i.set(f, p + 1), s.add(su(d, u, p));
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
const ok = Oe.create({
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
        key: Gi,
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
              decorations: Fr(o.doc, e, t, n),
              docVersion: 0,
              headingFingerprint: qi(o.doc, t.levels)
            };
          },
          apply(r, o, s, i) {
            if (r.getMeta("collapsibleHeading"))
              return {
                collapsedHeadings: new Set(e.collapsedHeadings),
                decorations: Fr(i.doc, e, t, n),
                docVersion: o.docVersion + 1,
                headingFingerprint: qi(i.doc, t.levels)
              };
            if (r.docChanged) {
              const { structureChanged: l, newFingerprint: c } = rk(
                i.doc,
                e,
                t.levels,
                o.headingFingerprint
              );
              return l ? {
                collapsedHeadings: new Set(e.collapsedHeadings),
                decorations: Fr(i.doc, e, t, n),
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
            const o = Gi.getState(r);
            return o?.decorations ? o.decorations : Fr(r.doc, e, t, n);
          }
        }
      })
    ];
  }
}), sk = /\[([^\]]+)\]\(([^)]+)\)$/, ak = /^(https?:\/\/|www\.)[^\s]+$/i, ik = Oe.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Pe({
        find: sk,
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
            if (!ak.test(s)) return !1;
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
}), lk = Oe.create({
  name: "calloutInputRule"
  // No plugins — logic moved to InputDispatcher
}), Ur = new De("searchHighlight"), ck = Oe.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Ur, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Ur, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ne({
        key: Ur,
        state: {
          init() {
            return je.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: l } = e, c = t.getMeta(Ur), d = t.docChanged;
            if (!s)
              return je.empty;
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
                    const v = m + y.index, b = m + y.index + y[0].length, x = f === l;
                    u.push(
                      Ze.inline(v, b, {
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
            return je.create(o.doc, u);
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
}), dk = Oe.create({
  name: "tabIndent"
  // No plugins — logic moved to InputDispatcher
}), uk = new De("inputDispatcher"), fk = ["info", "note", "prompt", "resources", "todo"];
function pk(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n >= 0; n--) {
    const r = t.node(n);
    if (r.type.name === "taskItem") return "taskItem";
    if (r.type.name === "listItem") return "listItem";
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
const hk = Oe.create({
  name: "inputDispatcher",
  // Higher priority to ensure Tab handling runs before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ne({
        key: uk,
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
            const v = m.doc.resolve(p).blockRange();
            if (!v) return !1;
            const b = [
              { type: u, attrs: {} },
              { type: d, attrs: { checked: f } }
            ];
            if (m.wrap(v, b), p > 1) {
              const x = m.doc.resolve(p - 1).nodeBefore;
              x && x.type === u && ip(m.doc, p - 1) && m.join(p - 1);
            }
            return t.dispatch(m), !0;
          },
          // ─── Consolidated handleKeyDown ─────────────────────────────
          // Replaces TabIndent, CalloutInputRule, and CodeBlockEnterShortcut plugins.
          // Runs once per key press instead of through multiple plugins.
          handleKeyDown(t, n) {
            if (n.key === "Tab") {
              const { state: r, dispatch: o } = t, s = pk(r);
              if (!s)
                return n.preventDefault(), !0;
              n.preventDefault();
              const i = r.schema.nodes[s];
              if (!i) return !0;
              if (n.shiftKey) {
                if (!Ga(i)(r, o)) {
                  const c = s === "taskItem" ? "listItem" : "taskItem", d = r.schema.nodes[c];
                  d && Ga(d)(r, o);
                }
              } else if (qa(i)(r, o))
                Xi(t.state, o);
              else {
                const c = s === "taskItem" ? "listItem" : "taskItem", d = r.schema.nodes[c];
                d && qa(d)(r, o) && Xi(t.state, o);
              }
              return !0;
            }
            if (n.key === "Enter") {
              const { state: r } = t, { $from: o } = r.selection, s = o.start(), i = r.doc.textBetween(s, o.pos, ""), a = i.trim();
              for (const c of fk)
                if (a === `\`\`\`${c}`) {
                  n.preventDefault();
                  const d = r.tr, u = s + i.indexOf("```");
                  d.delete(u, o.pos);
                  const f = e.schema.nodes.callout, p = e.schema.nodes.paragraph;
                  if (f && p) {
                    const g = p.create(), m = f.create({ type: c }, Nl.from(g));
                    d.insert(u, m);
                    const y = d.doc.resolve(u + 2);
                    d.setSelection(Ve.near(y)), t.dispatch(d);
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
                    const g = r.tr, m = f.create({ language: u }, void 0), y = o.before(o.depth), v = o.after(o.depth), b = p.create();
                    g.replaceWith(y, v, [m, b]);
                    const x = y + 1;
                    g.setSelection(Ve.create(g.doc, x)), t.dispatch(g);
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
}), mk = new De("expandSelection");
function fs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const gk = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), au = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), yk = "tableRow", vk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function bk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function wk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (vk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function xk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === yk) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function kk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (au.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Ck(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const l = r.node(a);
    gk.has(l.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function Ek(e) {
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
function Mk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Tk(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Sk(e, t, n) {
  let r = !1;
  return e.nodesBetween(t, n, (o) => au.has(o.type.name) ? (r = !0, !1) : !0), r;
}
function Nk(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (l) => l && (l.from < o || l.to > s) ? (r.push(l), o = l.from, s = l.to, !0) : !1;
  i(bk(e, o, s)), Tk(e, t) && (i(wk(e, o, s)), i(xk(e, o, s))), i(Ck(e, o, s)), i(kk(e, o, s));
  const a = Ek(e);
  if (a.length > 0) {
    const l = Mk(a, o, s);
    for (const c of l)
      Sk(e, c.from, c.to) ? c.from === 0 && c.to === e.content.size ? i({ from: 0, to: e.content.size, useSelectAll: !0 }) : i({ from: c.from, to: c.to, useSelectAll: !0 }) : i({ from: c.from, to: c.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size, useSelectAll: !0 }), r;
}
const Dk = Oe.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof jf || o === 0 && s === n.content.size)
          return !0;
        const a = Nk(n, o, s);
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
              const c = n.resolve(l.from), d = n.resolve(l.to), u = e.state.tr, f = Ve.between(c, d);
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
      new Ne({
        key: mk,
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
}), Lk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Ak(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Ik = new De("hexColorDecoration");
function iu(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const l = new RegExp(Lk.source, "g");
    for (; (a = l.exec(i)) !== null; ) {
      const c = s + a.index, d = c + a[0].length;
      if (d >= t && c <= n) {
        const u = a[0], f = Ak(u);
        r.push(
          Ze.inline(c, d, {
            class: "hex-color-swatch",
            style: `background-color: ${u}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function Rk(e) {
  const t = iu(e, 0, e.content.size);
  return je.create(e, t);
}
const Pk = Dl.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: Ik,
        state: {
          init(e, { doc: t }) {
            return Rk(t);
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
              const i = iu(e.doc, s.from, s.to);
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
function Ok(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Me(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const _k = Oe.create({
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
        const l = Zi(t.state.doc, o, s, i, a);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Se, { activate: !0 })), !0);
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
          const l = Zi(o.doc, a, !1, !1, !1);
          if (l.length === 0) return !1;
          const c = Ok(l, s), d = l[c];
          return r.isActive = !0, r.ranges = [d], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = l, r.nextMatchIndex = (c + 1) % l.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Se, { activate: !0 })), setTimeout(() => {
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
              const l = Mt(a, this.storage);
              this.storage.ranges = l, l.length === 0 && Me(this.storage);
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
      new Ne({
        key: Se,
        state: {
          init() {
            return je.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Se);
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
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), i.push(
                  Ze.widget(a.to, l, {
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
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), hp(t.state, t.dispatch), setTimeout(() => {
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
                return e.typedBuffer = o, e.isTypingReplace = !0, mp(t.state, t.dispatch), setTimeout(() => {
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
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, l) => l.from - a.from), { tr: i } = t.state;
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
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Se, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((l, c) => c.from - l.from), { tr: a } = t.state;
            for (const l of i)
              a.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const l = Mt(t);
              e.ranges = l, l.length === 0 && Me(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
}), $k = new De("linkBoundary"), Hk = Oe.create({
  name: "linkBoundary",
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: $k,
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
}), Bk = new De("smartCopyPaste"), lu = /* @__PURE__ */ new Set(["codeBlock", "callout"]);
function Qi(e) {
  const { state: t } = e, { selection: n } = t, { $from: r, $to: o } = n;
  for (let s = r.depth; s > 0; s--) {
    const i = r.node(s);
    if (!lu.has(i.type.name)) continue;
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
const Wk = Oe.create({
  name: "smartCopyPaste",
  addProseMirrorPlugins() {
    const e = this.editor;
    let t = {
      isFullContainer: !1,
      containerType: null
    };
    return [
      new Ne({
        key: Bk,
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
            const l = s.firstChild;
            if (!l || !lu.has(l.type.name))
              return n;
            if (r === "codeBlock") {
              const c = e.schema, d = c.nodes.paragraph;
              if (!d) {
                const m = l.content;
                return new Uo(m, Math.max(0, i - 1), Math.max(0, a - 1));
              }
              let u = "";
              l.content.forEach((m) => {
                u += m.text || "";
              });
              const f = u.split(`
`);
              f.length > 1 && f[f.length - 1] === "" && f.pop();
              const p = f.map((m) => m === "" ? d.create() : d.create(null, c.text(m))), g = Nl.from(p);
              return new Uo(g, 0, 0);
            } else {
              const c = l.content, d = Math.max(0, i - 1), u = Math.max(0, a - 1);
              return new Uo(c, d, u);
            }
          }
        }
      })
    ];
  }
});
function zk() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Fk(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function Uk(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let l = 0; l < i.length; l++)
    a[l] = i.charCodeAt(l);
  return new File([a], t, { type: s });
}
function Yk(e, t) {
  return t.includes(e.type);
}
function jk(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function Vk(e, t, n) {
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
      const u = e.type === "image/png" || e.type === "image/gif", f = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, g = c.toDataURL(f, p), m = Uk(g, e.name);
      r({ dataUrl: g, file: m, width: a, height: l });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function Kk(e, t, n) {
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
  if (!Yk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = zk();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const p = await Vk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = p.dataUrl, i = p.file, s = Math.min(p.width, 600);
    } else {
      o = await Fk(e), i = e;
      const p = await jk(o);
      s = Math.min(p.width, 600);
    }
    const { doc: l } = t.view.state;
    l.content.size === 0 || l.childCount === 1 && l.firstChild?.isTextblock && l.firstChild.content.size === 0 ? t.chain().focus().insertContent({
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
    const { state: d } = t.view, u = d.selection.from - 1, f = d.doc.nodeAt(u);
    if (f && f.type.name === "resizableImage") {
      const p = t.view.nodeDOM(u);
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
      return t.view.state.doc.descendants((m, y) => {
        if (g) return !1;
        if (m.type.name === "resizableImage" && m.attrs.src === o && m.attrs.alt === e.name) {
          try {
            const { state: v, dispatch: b } = t.view, x = v.doc.nodeAt(y);
            if (x) {
              const M = v.tr.setNodeMarkup(y, void 0, {
                ...x.attrs,
                src: p
              });
              b(M);
            }
          } catch (v) {
            console.warn("Failed to replace placeholder with uploaded reference:", v);
          }
          return g = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((m, y) => {
        if (m.type.name === "resizableImage" && m.attrs.src === p) {
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
      return console.warn("Image upload failed, removing placeholder:", p), Kk(t, o, e.name), n.onUploadError?.(`Upload failed: ${p instanceof Error ? p.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function el(e) {
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
const Gk = Oe.create({
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
            const s = el(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              Ji(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = el(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const l = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (l) {
              const c = n.state.tr.setSelection(
                Ve.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(c);
            }
            return a.forEach((c) => {
              Ji(c, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function qk({
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
  return St(() => {
    const g = [
      Kf.configure({
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
      vp.configure({ HTMLAttributes: { class: "font-bold" } }).extend({ keepOnSplit: !1 }),
      bp.configure({ HTMLAttributes: { class: "italic" } }).extend({ keepOnSplit: !1 }),
      wp.configure({}).extend({ keepOnSplit: !1 }),
      yp.configure({}).extend({ keepOnSplit: !1 }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      mb,
      gb,
      bb,
      Gf.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      qf.configure({
        types: ["heading", "paragraph"]
      }),
      Xf.configure({
        multicolor: !0
      }),
      Zf.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      // Prevent typed text from being absorbed into a link mark at the start of a textblock
      Hk,
      // Smart copy-paste: partial selection inside code block/callout unwraps the container
      Wk,
      lp,
      cp,
      dp,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [up],
      ik,
      ck,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [_k],
      dk,
      hk,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      gp.extend({
        addInputRules() {
          const m = this.type;
          return [
            new Pe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: y, range: v }) => {
                const { tr: b } = y, x = v.from, M = v.to;
                b.delete(x, M);
                const w = b.doc.resolve(x), E = m.create(), S = w.before(w.depth), k = w.after(w.depth);
                b.replaceWith(S, k, E);
                const D = S + E.nodeSize;
                if (D < b.doc.content.size) {
                  const C = b.doc.resolve(D);
                  C.nodeAfter && C.nodeAfter.isTextblock ? b.setSelection(Ve.create(b.doc, D + 1)) : C.nodeAfter && b.setSelection(Ve.near(b.doc.resolve(D)));
                } else {
                  const N = y.schema.nodes.paragraph.create();
                  b.insert(D, N), b.setSelection(Ve.create(b.doc, D + 1));
                }
                b.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || g.push(
      Qf.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Jf,
      ab,
      ib,
      ...u ? [] : [hb]
    ), s.taskLists || g.push(
      yb.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      vb.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), l && !t && !u && g.push(
      xb.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || g.push(Tp), s.callouts || g.push(Ab, lk), a && !s.collapsibleHeadings && !u && g.push(
      ok.configure({
        levels: o
      })
    ), s.images || g.push(
      Ib.configure({
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
      Gk.configure({
        maxFileSize: n,
        onUploadStart: p.onImageUploadStart.current ? ((...m) => p.onImageUploadStart.current(...m)) : void 0,
        onUploadComplete: p.onImageUploadComplete.current ? ((...m) => p.onImageUploadComplete.current(...m)) : void 0,
        onUploadError: p.onImageUploadError.current ? ((...m) => p.onImageUploadError.current(...m)) : void 0,
        onImageUpload: p.onImageUpload.current ? ((m, y) => p.onImageUpload.current(m, y)) : void 0
      })
    ), s.datePills || g.push(
      Yx.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || g.push(
      Kx.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: c
      })
    ), s.wikiLinks || g.push(
      qx.configure({
        onWikiLinkClick: (m) => {
          console.log("WikiLink clicked:", m), p.onWikiLinkClick.current?.(m);
        },
        validateLink: (m) => p.validateWikiLink.current ? p.validateWikiLink.current(m) : !0
      })
    ), i && g.push(Dk), d && !u && g.push(Pk), s.markdownPaste || g.push(
      nk.configure({
        enableMarkdownPaste: !0
      })
    ), g;
  }, [e, t, n, r, o, s, i, a, l, c, d, u]);
}
let ht = null, co = null;
async function cu() {
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
      const d = c, u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), m = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", v = [p], b = y !== "left", x = m && m > 0;
      return (b || x) && v.push(b ? y : "left"), x && v.push(String(m)), `![${v.join(" | ")}](${u})`;
    }
  }), n.addRule("imageResizer", {
    filter: (l) => l.nodeName === "FIGURE" && l.classList.contains("image-resizer"),
    replacement: (l, c) => {
      const d = c.querySelector("img");
      if (!d) return l;
      const u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), m = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", v = [p], b = y !== "left", x = m && m > 0;
      (b || x) && v.push(b ? y : "left"), x && v.push(String(m));
      const M = `![${v.join(" | ")}](${u})`, w = c.parentNode;
      return w && w.nodeName === "LI" ? `
` + M + `
` : `

` + M + `

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
        const m = Array.from(u.children).filter((v) => v.nodeName === "LI").indexOf(c);
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
    const c = l.getAttribute("src") || "", u = (l.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = l.getAttribute("width"), p = f ? parseInt(f, 10) : null, g = l.getAttribute("data-align") || "left", m = [u], y = g !== "left", v = p && p > 0;
    return (y || v) && m.push(y ? g : "left"), v && m.push(String(p)), `![${m.join(" \\| ")}](${c})`;
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
      const v = m.getAttribute("data-type") === "taskItem", b = m.getAttribute("data-checked") === "true", x = s(m);
      v ? c.push(`${u}- [${b ? "x" : " "}] ${x}`) : f === "OL" ? c.push(`${u}${g + y}. ${x}`) : c.push(`${u}- ${x}`);
      const M = Array.from(m.childNodes).filter(
        (w) => w.nodeType === Node.ELEMENT_NODE && (w.nodeName === "UL" || w.nodeName === "OL")
      );
      for (const w of M)
        i(w, c, d + 1);
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
        const v = Array.from(m.querySelectorAll("th, td")), b = v.map((x) => a(x));
        if (y > 0 && v.length > 0 && v[0].nodeName === "TH" && (p = !0), f.push("| " + b.join(" | ") + " |"), y === 0) {
          const x = v.map(() => "---").join(" | ");
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
    replacement: function(l) {
      return l;
    }
  }), n.addRule("datePill", {
    filter: (l) => l.nodeName === "SPAN" && l.getAttribute("data-type") === "date-pill",
    replacement: (l, c) => {
      const d = c.getAttribute("data-date");
      return d ? `@${Fx(d)}@` : l;
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
  }), ht = n, n;
}
function Xk() {
  !co && !ht && (co = cu().then((e) => (ht = e, e)));
}
function Zk() {
  return Xk(), {
    turndown(e) {
      return ht ? ht.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return ht !== null;
    },
    async ready() {
      ht || (co ? await co : await cu());
    }
  };
}
function Qk() {
  const e = Y(null);
  return e.current || (e.current = Zk()), e.current;
}
const Jk = 2e3;
function eC(e) {
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
    markdownChangeDebounceMs: f,
    onReady: p,
    onDestroy: g,
    onFocus: m,
    onBlur: y,
    onSelectionChange: v,
    onLinkClick: b,
    editorModeRef: x,
    rawMarkdownRef: M,
    setRawMarkdown: w,
    setIsLightweight: E,
    lightweightCheckCounterRef: S,
    isLightweightRef: k
  } = e, D = n && n.length > Jk, C = Y(D ? n : null), N = D ? "" : n, L = Y(null), P = Y(null), O = Y(c), $ = Y(d), W = Y(u), V = Y(f), R = Y(null);
  O.current = c, $.current = d, W.current = u, V.current = f;
  const A = Yu({
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
    content: N,
    editable: r,
    autofocus: o,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      handleClick: (z, U, K) => {
        if (b) {
          const J = K.target.closest("a");
          if (J) {
            const _ = J.getAttribute("href");
            if (_ && b(_, K) === !1)
              return K.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: z }) => {
      if (a === "auto" && (S.current++, S.current >= 50)) {
        S.current = 0;
        const K = z.state.doc.content.childCount > l;
        K !== k.current && E(K);
      }
      L.current && clearTimeout(L.current), L.current = setTimeout(() => {
        if (z.isDestroyed) return;
        const U = z.getHTML();
        (O.current || $.current) && (O.current?.(U), $.current?.(U)), V.current > 0 && W.current && (P.current && clearTimeout(P.current), P.current = setTimeout(() => {
          if (!z.isDestroyed && x.current === "wysiwyg" && R.current) {
            const K = z.getHTML(), B = R.current.turndown(K);
            M.current = B, W.current?.(zn(B));
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
          M.current = U, W.current?.(zn(U));
        }
      }
      y?.();
    },
    onSelectionUpdate: ({ editor: z }) => {
      if (v) {
        const { from: U, to: K, empty: B } = z.state.selection;
        v({ from: U, to: K, empty: B });
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
        M.current = U, W.current?.(zn(U));
      }
    }
  }, []);
  const H = Qk();
  R.current = H;
  const G = Y(!1);
  return q(() => {
    if (!G.current && i === "markdown" && A && !A.isDestroyed && H) {
      const z = A.getHTML(), U = H.turndown(z);
      w(U), M.current = U, G.current = !0;
    }
  }, [A, H, i]), { editor: A, turndownService: H };
}
function tC(e) {
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
        const v = Array.from(f.childNodes), b = [], x = [];
        v.forEach((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const E = w;
            if (E.tagName === "UL" || E.tagName === "OL" || E.tagName === "P")
              x.push(w);
            else if (E.tagName === "IMG" || E.tagName === "FIGURE")
              if (E.tagName === "IMG") {
                const S = n.createElement("figure");
                S.className = "image-resizer";
                const k = E.getAttribute("data-align") || "left", D = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[k] || "margin-right: auto;";
                S.style.cssText = D, S.appendChild(E.cloneNode(!0)), x.push(S);
              } else
                x.push(w);
            else
              b.push(w);
          } else
            b.push(w);
        });
        const M = x.filter((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const E = w;
            if (E.tagName === "P" && !E.textContent?.trim() && !E.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", b.length > 0) {
          const w = n.createElement("p");
          b.forEach((E) => w.appendChild(E)), w.firstChild && w.firstChild.nodeType === Node.TEXT_NODE && (w.firstChild.textContent = (w.firstChild.textContent || "").replace(/^\s+/, "")), (w.textContent?.trim() || w.querySelector("img, figure, code, br")) && f.appendChild(w);
        }
        M.forEach((w) => f.appendChild(w));
      }
    }), c && !d && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function nC(e) {
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
            for (let v = f; v < d; v++)
              n.push(t[v]);
            l = d - 1;
            continue;
          }
          for (let v = f; v < d; v++)
            n.push(t[v]);
          n.push("<!-- list-break -->"), l = d - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function rC(e) {
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
                  const w = n.createElement("p");
                  m.forEach((E) => w.appendChild(E.cloneNode(!0))), w.textContent?.trim() && c.push(w), m.length = 0;
                }
                const v = y, b = n.createElement("figure");
                b.className = "image-resizer";
                const x = v.getAttribute("data-align") || "left", M = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                b.style.cssText = M[x] || "margin-right: auto;", b.appendChild(v.cloneNode(!0)), c.push(b);
              } else
                m.push(y);
            }), m.length > 0) {
              const y = n.createElement("p");
              m.forEach((v) => y.appendChild(v.cloneNode(!0))), y.textContent?.trim() && c.push(y);
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
function oC(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function uo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function sC(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function tl(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? sC(r) : r.trim() ? `<p>${uo(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${uo(e)}</p>`;
}
function aC(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function iC(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const l = e[a]?.type || "ul", c = l === "task", d = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, u = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (c ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${uo(f.text)}</p>` : i += `<li><p>${uo(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function lC(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let l = r.trim();
      l = l.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const c = l.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (c.length <= 1 && !a)
        return s ? `${n}${tl(l)}${o}` : t;
      const d = [];
      let u = [];
      const f = () => {
        u.length !== 0 && (d.push(iC(u)), u = []);
      };
      for (const p of c) {
        const g = aC(p);
        if (g) {
          if (u.length > 0) {
            const m = u[0].type;
            g.depth === 0 && g.type !== m && f();
          }
          u.push(g);
        } else
          f(), d.push(tl(p.trim()));
      }
      return f(), `${n}${d.join("")}${o}`;
    }
  );
}
function cC(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: l
  } = n;
  let c = e;
  c = nC(c);
  const d = /* @__PURE__ */ new Set(["info", "note", "prompt", "resources", "todo", "summary"]), u = c.split(`
`), f = [];
  let p = null, g = [];
  for (let y = 0; y < u.length; y++) {
    const v = u[y];
    if (p !== null)
      if (v.trimEnd() === "```") {
        const b = g.join(`
`).trim(), x = b ? t(b) : "";
        f.push(`<div data-callout="" data-type="${p}" class="callout callout-${p}">${x}</div>`), p = null, g = [];
      } else
        g.push(v);
    else {
      const b = v.match(/^```(?:ad-)?(\w+)\s*$/);
      b && d.has(b[1]) ? (p = b[1], g = []) : f.push(v);
    }
  }
  return p !== null && (f.push(`\`\`\`ad-${p}`), f.push(...g)), c = f.join(`
`), c = c.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (y, v, b) => {
    const x = v.split("|").map((D) => D.trim());
    let M = "", w = "left", E = null;
    x.length === 1 ? M = x[0] : x.length === 2 ? (M = x[0], /^\d+$/.test(x[1]) ? E = x[1] : ["left", "center", "right"].includes(x[1]) ? w = x[1] : M = v) : x.length === 3 ? (M = x[0], ["left", "center", "right"].includes(x[1]) && (w = x[1]), /^\d+$/.test(x[2]) && (E = x[2])) : M = v;
    const S = E ? ` width="${E}" style="width: ${E}px"` : "", k = ` data-align="${w}"`;
    return `<img src="${b.trim()}" alt="${M}"${k}${S} />`;
  }), c = c.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), a && l && (c = c.replace(/@([^@\n]+)@/g, (y, v) => {
    const b = a(v);
    if (b) {
      const x = l(b);
      return `<span data-type="date-pill" data-date="${b}" class="date-pill ${x}"><span class="date-icon">📅</span><span class="date-text">${v.trim()}</span></span>`;
    }
    return y;
  })), r && !o && s && i && (c = c.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (y, v) => {
      const b = i(v);
      return s(b) ? `<span data-type="tag-pill" data-tag="${b}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${b}</span></span>` : y;
    }
  )), c = c.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((y, v) => v % 2 === 1 ? y : y.replace(/\[\[([^\[\]]+)\]\]/g, (b, x) => `<span data-wiki-link data-page-name="${x.trim()}" class="wiki-link">${x.trim()}</span>`)).join(""), c;
}
function dC(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = tC(t), t = rC(t), t = oC(t), t = lC(t), t = t.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
    (n, r, o, s) => r + o.replace(/\n+$/, "") + s
  ), t;
}
function uC(e, t, n = {}) {
  const r = cC(e, t, n), o = t(r);
  return dC(o);
}
function fC(e, t, n) {
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
            const { state: a } = e, { selection: l } = a, { $from: c } = l, d = c.nodeBefore?.textContent || "";
            if (d === "#####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 5, to: c.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (d === "####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 4, to: c.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (d === "###") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 3, to: c.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (d === "##") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 2, to: c.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (d === "#") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (d === "-" || d === "*") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(d)) {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - d.length, to: c.pos }).toggleOrderedList().run();
              return;
            }
            const u = /^(-\s*)?\[([ x])?\]$/.exec(d);
            if (u) {
              o.preventDefault();
              const f = u[2] === "x", p = a.schema.nodes.taskList, g = a.schema.nodes.taskItem;
              if (p && g) {
                const m = a.tr, y = c.pos - d.length, v = c.pos;
                m.delete(y, v);
                const x = m.doc.resolve(y).blockRange();
                if (x) {
                  const M = [
                    { type: p, attrs: {} },
                    { type: g, attrs: { checked: f } }
                  ];
                  m.wrap(x, M), e.view.dispatch(m);
                  return;
                }
              }
              e.chain().focus().deleteRange({ from: c.pos - d.length, to: c.pos }).toggleTaskList().run();
              return;
            }
            if (d === ">") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).toggleBlockquote().run();
              return;
            }
            if (d === "```") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 3, to: c.pos }).toggleCodeBlock().run();
              return;
            }
            if (d === "---" || d === "***") {
              o.preventDefault(), Zr(e, c.pos - 3, c.pos);
              return;
            }
            if (d === "—-") {
              o.preventDefault(), Zr(e, c.pos - 2, c.pos);
              return;
            }
            if (d === "—") {
              o.preventDefault(), Zr(e, c.pos - 1, c.pos);
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
function pC({
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
        const l = (c) => {
          a(c.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", l), () => window.removeEventListener("paragon-editor-mode-change", l);
      }
    };
    return window.__paragonEditorModeAPI = i, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [r]), q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function hC({
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
  return F(async (d) => {
    if (e) {
      if (d === "markdown" && n.current === "wysiwyg") {
        const u = e.getHTML(), f = t.turndown(u);
        s(f), r.current = f;
      } else if (d === "wysiwyg" && n.current === "markdown") {
        const { marked: u } = await import("./marked.esm-Tjr8Gfse.js"), f = (m) => u.parse(m, { async: !1, breaks: !0 }), p = {
          enableTagAutoDetect: a,
          disableTagPills: !!l.tagPills,
          isValidTag: cn,
          normalizeTag: Yn,
          parseDateFromMarkdown: zt,
          getDateVariant: Ma
        }, g = uC(r.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(g);
        });
      }
      o(d), n.current = d, i?.(d);
    }
  }, [e, t, i]);
}
const mC = 200;
function gC(e, t = {}) {
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
  }), a = Y(null), l = Y(""), c = F((d) => {
    const u = d.trim(), f = u.length > 0 ? u.split(/\s+/).filter((b) => b.length > 0).length : 0, p = u.replace(/\s/g, "").length, g = d.length;
    let m = 0, y = 0;
    r && (m = u.length > 0 ? u.split(/\n\s*\n/).filter((b) => b.trim().length > 0).length : 0, y = u.length > 0 ? (u.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / mC));
    return {
      words: f,
      characters: p,
      charactersWithSpaces: g,
      paragraphs: m,
      sentences: y,
      readingTime: v,
      isCalculating: !1
    };
  }, [r]);
  return q(() => {
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
function yC({ status: e, lastSaved: t, className: n = "" }) {
  const r = (o) => {
    if (!o) return "";
    const i = (/* @__PURE__ */ new Date()).getTime() - o.getTime(), a = Math.floor(i / 1e3), l = Math.floor(a / 60), c = Math.floor(l / 60);
    return a < 10 ? "Just now" : a < 60 ? `${a}s ago` : l < 60 ? `${l}m ago` : c < 24 ? `${c}h ago` : o.toLocaleDateString();
  };
  return /* @__PURE__ */ I(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(vf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ I("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(Cl, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ h("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(wn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ h("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(bf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ h("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function vC({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ I(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ I("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ h(wf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
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
function Yr(e) {
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
      const b = c[1].length;
      t.push({
        type: `heading${b}`,
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
      const b = d[2].toLowerCase() === "x";
      t.push({
        type: b ? "task-checked" : "task-list",
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
    for (const b of g) {
      let x;
      for (b.regex.lastIndex = 0; (x = b.regex.exec(a)) !== null; )
        m.push({
          start: l + x.index,
          end: l + x.index + x[0].length,
          type: b.type,
          content: x[0]
        });
    }
    m.sort((b, x) => b.start - x.start);
    const y = [];
    let v = l;
    for (const b of m)
      b.start >= v && (y.push(b), v = b.end);
    for (const b of y)
      b.start > l + p && t.push({
        type: "text",
        content: a.substring(p, b.start - l),
        start: l + p,
        end: b.start
      }), t.push({
        type: b.type,
        content: b.content,
        start: b.start,
        end: b.end
      }), p = b.end - l;
    p < a.length && t.push({
      type: "text",
      content: a.substring(p),
      start: l + p,
      end: l + a.length
    }), r += a.length + 1;
  }
  return t;
}
function nl(e) {
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
function jr(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return Yt(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const c = s[l], d = i + c.length, u = t.filter((p) => p.start >= i && p.start < d);
      let f = i;
      for (const p of u)
        p.start > f && (o += Yt(e.substring(f, p.start))), o += `<span class="${nl(p.type)}">${Yt(p.content)}</span>`, f = p.end;
      f < d && (o += Yt(e.substring(f, d))), l < s.length - 1 && (o += `
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
      p.start > f && (o += ps(e, f, p.start, null, a)), o += ps(e, p.start, p.end, nl(p.type), a), f = p.end;
    f < d && (o += ps(e, f, d, null, a)), l < s.length - 1 && (o += `
`), i = d + 1;
  }
  return o;
}
function ps(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const l = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const c = Yt(e.substring(l, i)), d = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${d}">${c}</mark></span>` : s += `<mark class="${d}">${c}</mark>`;
    } else {
      const l = i;
      for (; i < n && !o.has(i); )
        i++;
      const c = Yt(e.substring(l, i));
      r ? s += `<span class="${r}">${c}</span>` : s += c;
    }
  }
  return s;
}
function bC({
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
  const c = Y(null), d = Y(null), u = Y(null), f = Y(null), p = 5e3, g = 80, [m, y] = j(() => {
    const k = Yr(e);
    return jr(e, k, i, a);
  }), v = Y(null), b = St(() => {
    if (e.length <= p) {
      const k = Yr(e), D = jr(e, k, i, a);
      return v.current && (clearTimeout(v.current), v.current = null), D;
    }
    return null;
  }, [e, i, a]);
  q(() => {
    if (e.length <= p) {
      const k = Yr(e);
      y(jr(e, k, i, a));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const k = Yr(e);
      y(jr(e, k, i, a)), v.current = null;
    }, g), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, i, a]);
  const x = b ?? m, M = F(() => {
    const k = c.current, D = d.current, C = u.current;
    if (k) {
      const N = C?.parentElement, L = N ? N.clientHeight : 200;
      k.style.height = "auto";
      const P = Math.max(k.scrollHeight, L, 200);
      k.style.height = `${P}px`, D && (D.style.height = `${P}px`);
    }
  }, []);
  q(() => {
    const k = c.current;
    if (!k) return;
    const D = (C) => {
      const N = k.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: L, scrollHeight: P, clientHeight: O } = N, $ = L <= 0, W = L + O >= P - 1;
      (C.deltaY > 0 && !W || C.deltaY < 0 && !$) && (C.preventDefault(), N.scrollTop += C.deltaY);
    };
    return k.addEventListener("wheel", D, { passive: !1 }), () => k.removeEventListener("wheel", D);
  }, []);
  const w = F(() => {
  }, []);
  q(() => {
    M();
  }, [e, M]), q(() => {
    o && c.current && c.current.focus();
  }, [o]), q(() => {
    if (f.current && c.current) {
      const { start: k, end: D } = f.current;
      c.current.selectionStart = k, c.current.selectionEnd = D, f.current = null;
    }
  }, [e]);
  const E = F((k) => {
    const D = k.target;
    f.current = {
      start: D.selectionStart,
      end: D.selectionEnd
    }, t(D.value);
  }, [t]), S = F((k) => {
    const D = k.currentTarget, C = D.selectionStart, N = D.selectionEnd, L = D.value, P = C !== N;
    if (l) {
      if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), P) {
          const O = L.substring(C, N), $ = L.substring(0, C) + "`" + O + "`" + L.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t($);
        } else if (L[C] === "`")
          f.current = { start: C + 1, end: C + 1 }, t(L), D.selectionStart = D.selectionEnd = C + 1;
        else {
          const O = L.substring(0, C) + "``" + L.substring(N);
          f.current = { start: C + 1, end: C + 1 }, t(O);
        }
        return;
      }
      if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
        if (L[C - 1] === "*" && L[C], P) {
          k.preventDefault();
          const W = L.substring(C, N), V = L.substring(0, C) + "*" + W + "*" + L.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(V);
          return;
        }
        if (L[C] === "*") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        k.preventDefault();
        const $ = L.substring(0, C) + "**" + L.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t($);
        return;
      }
      if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
        if (P) {
          k.preventDefault();
          const $ = L.substring(C, N), W = L.substring(0, C) + "_" + $ + "_" + L.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(W);
          return;
        }
        if (L[C] === "_") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        k.preventDefault();
        const O = L.substring(0, C) + "__" + L.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t(O);
        return;
      }
      if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
        if (P) {
          k.preventDefault();
          const $ = L.substring(C, N), W = L.substring(0, C) + "~" + $ + "~" + L.substring(N);
          f.current = { start: C + 1, end: N + 1 }, t(W);
          return;
        }
        if (L[C] === "~") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(L.substring(0, C) + L.substring(C));
          return;
        }
        k.preventDefault();
        const O = L.substring(0, C) + "~~" + L.substring(N);
        f.current = { start: C + 1, end: C + 1 }, t(O);
        return;
      }
      if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), P) {
          const O = L.substring(C, N), $ = L.substring(0, C) + "[" + O + "]()" + L.substring(N);
          f.current = { start: N + 3, end: N + 3 }, t($);
        } else {
          const O = L.substring(0, C) + "[]()" + L.substring(N);
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
        const O = L.substring(0, C), $ = L.substring(C, N), W = L.substring(N), R = O.lastIndexOf(`
`) + 1, A = O.substring(0, R), H = O.substring(R), G = (H + $).split(`
`), z = G.map((B) => B.startsWith("  ") ? B.substring(2) : B.startsWith("	") ? B.substring(1) : B), U = A + z.join(`
`) + W, K = (H + $).length - z.join(`
`).length;
        f.current = {
          start: Math.max(R, C - (G[0].length - z[0].length)),
          end: N - K
        }, t(U);
      } else if (C === N) {
        const O = L.substring(0, C) + "  " + L.substring(N);
        f.current = { start: C + 2, end: C + 2 }, t(O);
      } else {
        const O = L.substring(0, C), $ = L.substring(C, N), W = L.substring(N), R = O.lastIndexOf(`
`) + 1, A = O.substring(0, R), G = (O.substring(R) + $).split(`
`), z = G.map((K) => "  " + K), U = A + z.join(`
`) + W;
        f.current = {
          start: C + 2,
          end: N + G.length * 2
        }, t(U);
      }
  }, [t, l]);
  return /* @__PURE__ */ I("div", { ref: u, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ h(
      "div",
      {
        ref: d,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: x || `<span class="md-placeholder">${Yt(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ h(
      "textarea",
      {
        ref: c,
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
let rl = 0, $s = 0, du = 0;
function wC(e) {
  $s++, du = e;
}
const xC = bt(function({
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
  }), l = Y([]), c = Y(performance.now()), d = Y(0), u = Y(0), f = Y(0), p = Y(0), [g, m] = j(new Array(60).fill(0)), [y, v] = j(new Array(60).fill(0));
  q(() => {
    if (!t || !r) return;
    const S = () => {
      const k = performance.now();
      queueMicrotask(() => {
        const D = performance.now() - k;
        wC(D);
      });
    };
    return r.on("transaction", S), () => {
      r.off("transaction", S);
    };
  }, [t, r]), q(() => {
    if (!t) return;
    let S = 0, k = performance.now(), D = 0;
    const C = (N) => {
      const L = N - c.current;
      if (c.current = N, l.current.push({ time: N, duration: L }), l.current.length > 120 && (l.current = l.current.slice(-120)), L > 16.67 && u.current++, S++, N - k >= 1e3) {
        D = S, S = 0, k = N;
        const P = l.current.slice(-60), O = P.length > 0 ? P.reduce((z, U) => z + U.duration, 0) / P.length : 0, $ = P.length > 0 ? Math.max(...P.map((z) => z.duration)) : 0, W = performance.memory, V = W ? W.usedJSHeapSize / (1024 * 1024) : 0, R = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, A = document.querySelectorAll("*").length, H = rl - f.current, G = $s - p.current;
        f.current = rl, p.current = $s, a({
          fps: D,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(V * 10) / 10,
          memoryTotal: Math.round(R),
          renderCount: H,
          transactionCount: G,
          lastTransactionTime: Math.round(du * 100) / 100,
          domNodes: A,
          longFrames: u.current
        }), m((z) => [...z.slice(1), D]), v((z) => [...z.slice(1), O]), u.current = 0;
      }
      d.current = requestAnimationFrame(C);
    };
    return d.current = requestAnimationFrame(C), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const b = F(() => {
    n?.();
  }, [n]), x = F(() => {
    s((S) => !S);
  }, []);
  if (!t) return null;
  const M = (S) => S >= 55 ? "#4ade80" : S >= 30 ? "#fbbf24" : "#f87171", w = (S) => S <= 16.67 ? "#4ade80" : S <= 33.33 ? "#fbbf24" : "#f87171", E = (S, k, D) => {
    const L = S.map((P, O) => {
      const $ = O / (S.length - 1) * 120, W = 24 - Math.min(P, k) / k * 24;
      return `${$},${W}`;
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
  return /* @__PURE__ */ I("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ I("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ I("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ h(xf, { size: 14 }),
        /* @__PURE__ */ h("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ h("button", { onClick: x, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ h(El, { size: 12 }) : /* @__PURE__ */ h(Ml, { size: 12 }) }),
        /* @__PURE__ */ h("button", { onClick: b, title: "Close profiler", children: /* @__PURE__ */ h(mt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ I("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ h("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ h("span", { className: "perf-value", style: { color: M(i.fps) }, children: i.fps })
        ] }),
        E(g, 70, M(i.fps))
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
class kC extends Gu {
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
      return /* @__PURE__ */ h("div", { className: ie("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ I("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ h("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ h(kf, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ I("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ h("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ h("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ I("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ I(
            Nt,
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
            Nt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ h(dn, { className: "w-4 h-4" }),
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
              className: ie(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ h(Jn, { className: "w-3 h-3" }) : /* @__PURE__ */ h(Cf, { className: "w-3 h-3" }),
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
                    /* @__PURE__ */ h(Ef, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ h("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ I(ye, { children: [
                    /* @__PURE__ */ h(bn, { className: "w-3 h-3" }),
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
function CC({ className: e = "", theme: t }) {
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
function EC({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ I("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ h(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ h(Mf, {})
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
  return Uf(
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
const $e = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ h(
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
), hs = () => /* @__PURE__ */ h("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), ol = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], MC = bt(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [l, c] = j(!1), d = Y(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = ol.find((g) => g.value === u)?.shortLabel || "P";
  q(() => {
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
  return /* @__PURE__ */ I("div", { ref: d, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ I(
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
          /* @__PURE__ */ h(Jn, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` })
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
        children: ol.map((g) => {
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
}), TC = bt(function({ onCopy: t, iconSize: n }) {
  const [r, o] = j(!1), s = Y(null);
  q(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const i = F((a) => {
    a.preventDefault(), a.stopPropagation(), t(), o(!0), s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 1500);
  }, [t]);
  return /* @__PURE__ */ h(
    $e,
    {
      onMouseDown: i,
      title: r ? "Copied!" : "Copy as Markdown",
      children: r ? /* @__PURE__ */ h(wn, { size: n, className: "text-green-500" }) : /* @__PURE__ */ h(bn, { size: n })
    }
  );
}), SC = bt(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s, onCopySelectionAsMarkdown: i }) {
  const a = Y(null), l = fl({
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
  }), [c, d] = j(!1), [u, f] = j(""), [p, g] = j(!1), [m, y] = j({ top: 0, left: 0 }), v = Y(null), b = Y(null), x = Y(null), M = F(() => {
    if (u) {
      let C = u.trim();
      !/^https?:\/\//i.test(C) && !C.startsWith("mailto:") && (C = "https://" + C), t.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    d(!1), f("");
  }, [t, u]), w = (C) => {
    C.preventDefault(), C.stopPropagation();
    const N = t.getAttributes("link").href;
    f(N || ""), d(!0);
  }, E = F((C, N) => {
    C.preventDefault(), C.stopPropagation(), N();
  }, []);
  q(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: N } = t.state, { empty: L, from: P, to: O } = N, V = ("node" in N && N.node ? N.node : null)?.type?.name === "resizableImage";
          if (L || V || t.isActive("codeBlock")) {
            x.current && (clearTimeout(x.current), x.current = null), b.current && clearTimeout(b.current), b.current = setTimeout(() => {
              g(!1), d(!1);
            }, 150);
            return;
          }
          b.current && (clearTimeout(b.current), b.current = null);
          const R = t.view.coordsAtPos(P), A = t.view.coordsAtPos(O), H = v.current?.offsetWidth || 500, G = v.current?.offsetHeight || 40, z = 8, U = window.innerWidth;
          let K = 0, B = 0;
          if (v.current) {
            const de = v.current.closest('[data-slot="dialog-content"]');
            if (de) {
              const be = de.getBoundingClientRect();
              K = be.left, B = be.top;
            }
          }
          let _ = (R.left + A.left) / 2 - H / 2 - K;
          const ee = K ? U - K : U;
          _ = Math.max(z, Math.min(ee - H - z, _));
          let ne = R.top - G - 10 - B;
          ne < z && (ne = A.bottom + 10 - B), p ? y({ top: Math.max(z, ne), left: _ }) : (x.current && clearTimeout(x.current), x.current = setTimeout(() => {
            y({ top: Math.max(z, ne), left: _ }), g(!0);
          }, 50));
        } catch (N) {
          console.warn("FloatingToolbar: Error updating position", N);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), b.current && clearTimeout(b.current), x.current && clearTimeout(x.current);
    };
  }, [t, p]), q(() => {
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
  const S = (C) => {
    b.current && (clearTimeout(b.current), b.current = null);
  };
  if (!p || r)
    return null;
  const k = 15, D = c ? /* @__PURE__ */ h(
    "div",
    {
      ref: v,
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
              C.key === "Enter" && (C.preventDefault(), M()), C.key === "Escape" && (d(!1), f(""));
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
                C.preventDefault(), M();
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
      ref: v,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: m.top,
        left: m.left
      },
      onMouseDown: S,
      children: [
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBold().run()),
            isActive: l?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ h(zs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleItalic().run()),
            isActive: l?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ h(Fs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: l?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ h(Us, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleStrike().run()),
            isActive: l?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ h(Ys, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleCode().run()),
            isActive: l?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ h(gl, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: l?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ h(yl, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: w,
            isActive: l?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ h(js, { size: k })
          }
        ),
        /* @__PURE__ */ h(hs, {}),
        /* @__PURE__ */ h(
          MC,
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
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: l?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ h(qs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: l?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ h(Vs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: l?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ h(Ks, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: l?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ h(Gs, { size: k })
          }
        ),
        /* @__PURE__ */ h(
          $e,
          {
            onMouseDown: (C) => E(C, () => Js(t)),
            isActive: l?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ h(vl, { size: k })
          }
        ),
        i && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(hs, {}),
          /* @__PURE__ */ h(TC, { onCopy: i, iconSize: k })
        ] }),
        o && /* @__PURE__ */ I(ye, { children: [
          /* @__PURE__ */ h(hs, {}),
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
              children: /* @__PURE__ */ h(ho, { size: k })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ h(It, { onMouseDown: S, children: D });
});
function NC({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = j(""), s = Y(null), i = Y(null), [a, l] = j({ top: 0, left: 0 });
  q(() => {
    if (t) {
      const g = e.getAttributes("link").href || "";
      o(g);
      try {
        const { view: m } = e, { from: y } = m.state.selection, v = m.coordsAtPos(y), b = v.bottom + 8, x = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        l({ top: b, left: x });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), q(() => {
    if (!t) return;
    const g = (b) => {
      i.current && !i.current.contains(b.target) && n();
    }, m = () => {
      n();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 10), v = e.view.dom.closest(".editor-content-wrapper");
    return v?.addEventListener("scroll", m), () => {
      clearTimeout(y), document.removeEventListener("mousedown", g), v?.removeEventListener("scroll", m);
    };
  }, [t, n, e]);
  const c = F((g) => {
    if (g?.preventDefault(), r.trim()) {
      let m = r.trim();
      !/^https?:\/\//i.test(m) && !m.startsWith("mailto:") && (m = "https://" + m), e.chain().focus().extendMarkRange("link").setLink({ href: m }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), d = F((g) => {
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
      children: /* @__PURE__ */ I("form", { onSubmit: c, className: "link-popover-form", children: [
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
  return /* @__PURE__ */ h(It, { children: p });
}
function DC() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function LC({ editor: e, onEditLink: t }) {
  const [n, r] = j({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = Y(null), s = Y(null), i = Y(null), a = F((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const E = w.getAttribute("href") || "", S = w.getBoundingClientRect(), k = 44, D = 8, L = S.top >= k + D ? S.top - k - D : S.bottom + D, P = Math.max(16, Math.min(S.left, window.innerWidth - 340));
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
  }, [e]), l = F(() => {
    s.current = setTimeout(() => {
      i.current = null, r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = F(() => {
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
      const D = k.target, C = k.relatedTarget;
      if (D.closest("a")) {
        if (C && o.current?.contains(C))
          return;
        l();
      }
    };
    return w.addEventListener("mouseover", E), w.addEventListener("mouseout", S), () => {
      w.removeEventListener("mouseover", E), w.removeEventListener("mouseout", S), s.current && clearTimeout(s.current);
    };
  }, [e, a, l]), q(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const E = (S) => {
      const D = S.target.closest("a");
      if (D && w.contains(D)) {
        if (i.current === D && n.isVisible)
          return;
        S.preventDefault(), S.stopPropagation(), a(D);
      }
    };
    return w.addEventListener("touchend", E, { capture: !0 }), () => {
      w.removeEventListener("touchend", E, { capture: !0 });
    };
  }, [e, a, n.isVisible]), q(() => {
    if (!n.isVisible || !DC()) return;
    const w = (S) => {
      const k = S.target;
      o.current?.contains(k) || i.current && i.current.contains(k) || c();
    }, E = setTimeout(() => {
      document.addEventListener("touchstart", w, { passive: !0 });
    }, 100);
    return () => {
      clearTimeout(E), document.removeEventListener("touchstart", w);
    };
  }, [n.isVisible, c]), q(() => {
    if (!n.isVisible) return;
    const w = () => {
      c();
    }, E = e.view.dom.closest(".editor-content-wrapper");
    return E?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      E?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e, c]);
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
      E.descendants((D, C) => {
        if (D.isText && D.marks.some((N) => N.type.name === "link")) {
          const N = w.nodeDOM(C);
          if (N && (N === n.linkElement || N.parentElement === n.linkElement))
            return S = C, k = C + D.nodeSize, !1;
        }
        return !0;
      }), S !== null && k !== null ? e.chain().focus().setTextSelection({ from: S, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), y = F(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: E } = w.state;
      E.descendants((S, k) => {
        if (S.isText && S.marks.some((D) => D.type.name === "link")) {
          const D = w.nodeDOM(k);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + S.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((w) => ({ ...w, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const v = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, x = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", M = /* @__PURE__ */ h(
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
      onMouseLeave: l,
      children: /* @__PURE__ */ I("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ I(
          "button",
          {
            onClick: g,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ h(Tf, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ h("span", { className: "link-hover-tooltip-url", children: v || "No URL" })
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
              children: /* @__PURE__ */ h(Sf, { size: 14 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: u ? /* @__PURE__ */ h(wn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ h(bn, { size: 14 })
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: m,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ h(Nf, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ h(It, { children: M });
}
const AC = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ h(po, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ h(Df, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ h(Lf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ h(Af, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ h(If, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ h(Rf, { size: 16 }),
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
    icon: /* @__PURE__ */ h(Pf, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ h(ms, { size: 16 }),
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
    icon: /* @__PURE__ */ h(bl, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ h(gs, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ h(Of, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ h(_f, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ h(wl, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ h(xl, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ h(kl, { size: 16, className: "text-cyan-400" }),
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
], IC = 32, RC = 8, PC = 320, OC = 210, Vr = 12;
function sl(e) {
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
function _C({ editor: e }) {
  const [t, n] = j(!1), [r, o] = j(""), [s, i] = j(0), [a, l] = j(null), [c, d] = j(!1), [u, f] = j({ top: 0, left: 0 }), [p, g] = j("below"), m = Y(null), y = Y(-1), v = Y(!1);
  q(() => {
    v.current = t;
  }, [t]);
  const b = AC.filter((D) => {
    if (!r) return !0;
    const C = r.toLowerCase();
    return D.title.toLowerCase().includes(C) || D.keywords?.some((N) => N.includes(C));
  }), x = Math.min(
    b.length * IC + RC,
    PC
  );
  fo(() => {
    if (!t || !a) return;
    const { top: D, bottom: C, left: N } = a, L = window.innerHeight, P = window.innerWidth, O = L - C - Vr, $ = D - Vr;
    let W;
    if (O >= x ? W = "below" : $ >= x ? W = "above" : W = O >= $ ? "below" : "above", g(W), m.current) {
      const V = Math.max(
        Vr,
        Math.min(N, P - OC - Vr)
      ), R = W === "below" ? C + 4 : D - x - 4;
      m.current.style.top = `${R}px`, m.current.style.left = `${V}px`;
    }
  }, [t, a, x, b.length]);
  const M = F(() => {
    const { state: D } = e, { selection: C } = D, N = C.from, L = y.current;
    if (L >= 0 && L <= N)
      e.chain().focus().deleteRange({ from: L, to: N }).run();
    else {
      const { $from: P } = C, $ = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const W = P.pos - (P.parentOffset - $);
        e.chain().focus().deleteRange({ from: W, to: P.pos }).run();
      }
    }
  }, [e]), w = F(() => {
    n(!1), o(""), i(0), y.current = -1, l(null);
  }, []), E = F((D) => {
    const C = b[D];
    if (C) {
      if (M(), C.isImageCommand) {
        const { state: N } = e, L = e.view.coordsAtPos(N.selection.from);
        f({
          top: L.bottom + 8,
          left: L.left
        }), d(!0);
      } else
        C.command(e);
      w();
    }
  }, [e, b, M, w]), S = F((D, C) => {
    e.chain().focus().setImage({ src: D, alt: C }).run();
  }, [e]);
  return q(() => {
    if (!e) return;
    const D = () => {
      if (v.current) return;
      const { state: C } = e, { selection: N } = C, { $from: L } = N;
      if (L.parentOffset === 0) return;
      const P = L.parent.textBetween(0, L.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = L.pos - 1;
      const $ = sl(e);
      $ && (l($), n(!0), o(""), i(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), q(() => {
    if (!e || !t) return;
    const D = e.view.dom, C = (N) => {
      v.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((L) => (L + 1) % b.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((L) => (L - 1 + b.length) % b.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), E(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), w()));
    };
    return D.addEventListener("keydown", C, !0), () => {
      D.removeEventListener("keydown", C, !0);
    };
  }, [e, t, s, b, E, w]), q(() => {
    if (!e || !t) return;
    const D = () => {
      if (!v.current || y.current < 0) return;
      const { state: C } = e, { selection: N } = C, L = N.from, P = y.current;
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
        const $ = sl(e);
        $ && l($);
      } catch {
        w();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, t, w]), q(() => {
    if (!t) return;
    const D = (C) => {
      m.current && !m.current.contains(C.target) && w();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [t, w]), q(() => {
    t && b.length === 0 && r.length > 2 && w();
  }, [t, b.length, r, w]), q(() => {
    s >= b.length && i(Math.max(0, b.length - 1));
  }, [b.length, s]), q(() => {
    if (!t || !m.current) return;
    const D = m.current.querySelector(".slash-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [t, s]), c ? /* @__PURE__ */ h(
    Rl,
    {
      isOpen: c,
      onClose: () => d(!1),
      onInsert: S,
      position: u
    }
  ) : !t || b.length === 0 ? null : /* @__PURE__ */ h(It, { children: /* @__PURE__ */ h(
    "div",
    {
      ref: m,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: b.map((D, C) => /* @__PURE__ */ I(
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
const $C = 340, HC = 36, BC = 8, WC = 240, Kr = 8;
function al(e) {
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
function zC({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = j(!1), [s, i] = j(""), [a, l] = j([]), [c, d] = j(0), [u, f] = j(null), [p, g] = j("below"), [m, y] = j(!1), v = Y(!1), b = Y(null), x = Y(-1), M = Y(null);
  q(() => {
    v.current = r;
  }, [r]);
  const w = F(() => {
    o(!1), i(""), l([]), d(0), x.current = -1;
  }, []), E = F((N) => {
    const L = x.current;
    if (L < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const $ = P.tr.delete(L, O), W = P.schema.marks.wikiLink;
      if (W) {
        const V = W.create({ pageName: N }), R = P.schema.text(N, [V]);
        $.insert(L, R);
        const A = L + N.length;
        $.setSelection(Ve.create($.doc, A)), $.removeStoredMark(W);
      } else
        $.insertText(`[[${N}]]`, L);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
    }
    w();
  }, [e, w]);
  q(() => {
    if (!e) return;
    const N = () => {
      if (v.current) return;
      const { state: L } = e, { selection: P } = L, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      x.current = O.pos - 2;
      const W = al(e);
      W && (f(W), o(!0), i(""), l([]), d(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), q(() => {
    if (!e || !r) return;
    const N = e.view.dom, L = (P) => {
      if (v.current) {
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
          P.preventDefault(), P.stopPropagation(), c < a.length ? E(a[c].title) : s.trim() && n ? (n(s.trim()), w()) : s.trim() && E(s.trim());
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
    return N.addEventListener("keydown", L, !0), () => {
      N.removeEventListener("keydown", L, !0);
    };
  }, [e, r, a, c, s, E, w, n]), q(() => {
    if (!e || !r) return;
    const N = () => {
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
        const W = al(e);
        W && f(W);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, w]), q(() => {
    if (r) {
      if (M.current && clearTimeout(M.current), !s.trim()) {
        y(!0), M.current = setTimeout(async () => {
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
      return y(!0), M.current = setTimeout(async () => {
        try {
          const N = await t(s.trim());
          l(N);
        } catch {
          l([]);
        }
        y(!1);
      }, 150), () => {
        M.current && clearTimeout(M.current);
      };
    }
  }, [r, s, t]), q(() => {
    if (!r) return;
    const N = (L) => {
      b.current && !b.current.contains(L.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, w]), q(() => {
    if (!r || !b.current) return;
    const N = b.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, c]);
  const S = a.length + (s.trim() ? 1 : 0), k = Math.min(
    Math.max(S, 1) * HC + BC,
    WC
  );
  if (fo(() => {
    if (!r || !u) return;
    const { top: N, bottom: L, left: P } = u, O = window.innerHeight, $ = window.innerWidth, W = O - L - Kr, V = N - Kr;
    let R;
    if (W >= k ? R = "below" : V >= k ? R = "above" : R = W >= V ? "below" : "above", g(R), b.current) {
      const A = Math.max(
        Kr,
        Math.min(P, $ - $C - Kr)
      ), H = R === "below" ? L + 4 : N - k - 4;
      b.current.style.top = `${H}px`, b.current.style.left = `${A}px`;
    }
  }, [r, u, k, S]), !r) return null;
  const D = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ h(It, { children: /* @__PURE__ */ I(
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
        m && a.length === 0 && /* @__PURE__ */ h("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ h("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
        a.map((N, L) => /* @__PURE__ */ I(
          "div",
          {
            className: `wikilink-item ${L === c ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), E(N.title);
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
        D && /* @__PURE__ */ I(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === c ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), w()) : E(s.trim());
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
function FC({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = j(e), [l, c] = j(t), d = Y(null), u = Y(null);
  q(() => {
    u.current?.focus(), u.current?.select();
  }, []), q(() => {
    const y = (b) => {
      d.current && !d.current.contains(b.target) && s();
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
  }, [i, l, s]);
  const f = () => {
    i.trim() && r(i.trim(), l.trim());
  }, g = (() => {
    let x = n.x - 160, M = n.y + 10;
    return x + 320 > window.innerWidth - 16 && (x = window.innerWidth - 320 - 16), x < 16 && (x = 16), M + 280 > window.innerHeight - 16 && (M = n.y - 280 - 10), M < 16 && (M = 16), { left: x, top: M };
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
              /* @__PURE__ */ h(po, { className: "w-3.5 h-3.5" }),
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
        /* @__PURE__ */ I("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ h(dn, { className: "w-4 h-4" })
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
                  /* @__PURE__ */ h(wn, { className: "w-4 h-4" }),
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
function UC({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = j(!1), [o, s] = j(0), i = F((d) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer?.types.includes("Files") && (s((u) => u + 1), r(!0));
  }, []), a = F((d) => {
    d.preventDefault(), d.stopPropagation(), s((u) => {
      const f = u - 1;
      return f === 0 && r(!1), f;
    });
  }, []), l = F((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), c = F((d) => {
    d.preventDefault(), d.stopPropagation(), r(!1), s(0);
  }, []);
  return q(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", i), d.addEventListener("dragleave", a), d.addEventListener("dragover", l), d.addEventListener("drop", c), () => {
      d.removeEventListener("dragenter", i), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", l), d.removeEventListener("drop", c);
    };
  }, [t, e, i, a, l, c]), n ? /* @__PURE__ */ h("div", { className: "image-drop-zone", children: /* @__PURE__ */ I("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ h("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ h($f, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ I("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ h("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ h("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
const YC = {
  SpellCheck: Bf,
  RefreshCw: Hf,
  Minimize2: Ml,
  Maximize2: El,
  FileText: Qs,
  MessageSquare: Tl,
  Sparkles: ho
};
function jC({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = j(""), [a, l] = j(!1), c = Y(null), d = Y(null), u = e.filter((y) => y.scope === t || y.scope === "both");
  q(() => {
    const y = (b) => {
      c.current && !c.current.contains(b.target) && r();
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
    a && d.current && d.current.focus();
  }, [a]);
  const p = F(() => {
    const v = u.length * 40 + (a ? 56 : 0) + 16, b = window.innerWidth, x = window.innerHeight;
    let M = o.top, w = o.left;
    return w + 260 > b - 8 && (w = b - 260 - 8), w < 8 && (w = 8), M + v > x - 8 && (M = o.top - v - 8), M < 8 && (M = 8), { top: M, left: w };
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
              /* @__PURE__ */ h(Tl, { size: 14, className: "text-muted-foreground shrink-0" }),
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
              const v = y.icon ? YC[y.icon] : ho;
              return /* @__PURE__ */ I(
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
                    v && /* @__PURE__ */ h(v, { size: 15, className: "text-muted-foreground shrink-0" }),
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
function VC({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = Y(null), a = Y(null), [l, c] = j(!1), [d, u] = j(0);
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
    const k = window.innerWidth, D = window.innerHeight;
    let C = t.selectionCenterX - 380 / 2;
    C + 380 > k - 8 && (C = k - 380 - 8), C < 8 && (C = 8);
    const N = D - t.selectionBottom - 8, L = t.selectionTop - 8, P = d || 200;
    let O, $ = !1;
    return N >= P || N >= L ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, $ = !0), O < 8 && (O = 8), O + P > D - 8 && (O = D - P - 8), { top: O, left: C, placedAbove: $ };
  }, [t, d]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", m = e.status === "streaming", y = e.status === "complete", v = e.status === "error", b = F(() => {
    navigator.clipboard.writeText(p), c(!0), setTimeout(() => c(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const x = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", M = /* @__PURE__ */ h(
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
                m && /* @__PURE__ */ h(Cl, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ h("span", { className: "font-medium", children: v ? "Error" : g }),
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
                children: v ? /* @__PURE__ */ h("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ I("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  m && /* @__PURE__ */ h("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ I("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || v) && /* @__PURE__ */ I(ye, { children: [
                y && /* @__PURE__ */ I(ye, { children: [
                  /* @__PURE__ */ h(
                    an,
                    {
                      icon: ys,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ h(
                    an,
                    {
                      icon: Xs,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ h(
                    an,
                    {
                      icon: l ? wn : bn,
                      label: l ? "Copied" : "Copy",
                      onClick: b
                    }
                  )
                ] }),
                /* @__PURE__ */ h(
                  an,
                  {
                    icon: Zs,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ h("div", { className: "flex-1" }),
                /* @__PURE__ */ h(
                  an,
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
                  an,
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
  return /* @__PURE__ */ h(It, { onMouseDown: (w) => w.preventDefault(), children: M });
}
function an({
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
function KC({
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
  onAIReplace: v,
  onAIInsert: b,
  onAIRetry: x,
  onAIDiscard: M,
  onLinkPopoverClose: w,
  onEditLink: E,
  onWikiLinkSearch: S,
  imageEditState: k,
  onImageSave: D,
  onImageDelete: C,
  onImageEditClose: N
}) {
  return /* @__PURE__ */ I(ye, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ h(UC, { containerRef: r, enabled: o }),
    !t && s && /* @__PURE__ */ h(
      SC,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: i,
        aiEnabled: a || !!l,
        onAISparklesClick: (L) => c(L),
        onCopySelectionAsMarkdown: d
      }
    ),
    u && f && /* @__PURE__ */ h(
      jC,
      {
        actions: f,
        scope: u.scope,
        position: u.position,
        onAction: p,
        onClose: g
      }
    ),
    m.status !== "idle" && /* @__PURE__ */ h(
      VC,
      {
        state: m,
        position: y,
        onReplace: v,
        onInsert: b,
        onRetry: x,
        onDiscard: M
      }
    ),
    !n.slashCommands && /* @__PURE__ */ h(_C, { editor: e, disabledFeatures: n }),
    !n.wikiLinks && S && /* @__PURE__ */ h(zC, { editor: e, onSearch: S }),
    /* @__PURE__ */ h(
      NC,
      {
        editor: e,
        isOpen: i,
        onClose: w
      }
    ),
    /* @__PURE__ */ h(LC, { editor: e, onEditLink: E }),
    !n.images && k?.isOpen && /* @__PURE__ */ h(
      FC,
      {
        src: k.src,
        alt: k.alt,
        position: k.position,
        onSave: D,
        onDelete: C,
        onClose: N
      }
    )
  ] });
}
function GC({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function qC(e, t) {
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
function XC(e) {
  const [t, n] = qu(qC, { status: "idle" }), r = Y(null), o = F(async (a, l, c, d, u) => {
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
  }, [e]), s = F(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = F(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const il = Xu(
  () => Promise.resolve().then(() => c1).then((e) => ({ default: e.TableOfContents }))
), ZC = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, X1 = Zu(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  markdownChangeDebounceMs: s = 0,
  placeholder: i = 'Start writing... Use "/" for commands',
  editable: a = !0,
  autofocus: l = !1,
  className: c = "",
  showToolbar: d = !0,
  showWordCount: u = !0,
  wordCountDebounceMs: f = 1e3,
  theme: p,
  colorTheme: g = "colorful",
  autoSave: m = !0,
  autoSaveKey: y = "paragon-editor-content",
  autoSaveDelay: v = 1e3,
  showRecoveryBanner: b = !0,
  showFloatingToolbar: x = !0,
  maxImageSize: M = 5 * 1024 * 1024,
  onImageUploadStart: w,
  onImageUploadComplete: E,
  onImageUploadError: S,
  onImageUpload: k,
  resolveImageSrc: D,
  showModeToggle: C = !0,
  // New props
  initialMode: N = "wysiwyg",
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
  renderToolbar: J,
  renderFooter: _,
  disabledFeatures: ee = {},
  minHeight: ne = "200px",
  maxHeight: de,
  spellCheck: be = !0,
  headingLevels: ve = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: Ue = [1, 2, 3],
  // TOC props
  showTableOfContents: lt = !1,
  tocVisible: Rt = !0,
  onTocVisibilityChange: Nn,
  tocTitle: Dn = "",
  tocMinLevel: lr = 1,
  tocMaxLevel: cr = 4,
  tocShowLevelIndicators: dr = !1,
  tocHighlightActive: ur = !0,
  tocTreeView: Ln = !1,
  tocWidth: qt = "240px",
  tocPosition: wt = "right",
  tocScrollOffset: fr = 20,
  onTocItemClick: pr,
  renderTocItem: hr,
  tocShowToggleButton: mr = !0,
  // Raw markdown editor
  autoClosePairs: Lo = !0,
  // Performance profiler
  showPerformanceProfiler: Ao = !1,
  onPerformanceProfilerClose: Io,
  // Auto reorder checklist
  autoReorderChecklist: Ro = !1,
  // Expand selection
  progressiveSelectAll: Po = !1,
  // Auto-detection toggles
  enableTagAutoDetect: gr = !1,
  enableHexColorHighlight: Oo = !1,
  enableCollapsibleHeadings: yr = !1,
  enableCollapsibleLists: _o = !1,
  // Performance mode
  performanceMode: ae = "auto",
  // Error boundary
  onEditorError: me,
  // AI writing assistant
  aiActions: re,
  onAIAction: fe,
  onAISetupRequired: Te
}, ue) {
  const [Xt] = j(() => ZC()), [Zt, $o] = j(N), [Qt, Pt] = j(""), vr = Y(N), br = Y(""), An = Y(null), [gu, Ta] = j(0), wr = !!(re && re.length > 0 && fe), { state: Ye, executeAction: xr, abort: yu, reset: xt } = XC(fe), [vu, Ho] = j(null), [bu, wu] = j({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), xu = Y(fe);
  xu.current = fe;
  const Sa = Y(Te);
  Sa.current = Te;
  const [ku, Cu] = j([]), [Eu, Mu] = j(0), Tu = F((se, Ce) => {
    Cu(se), Mu(Ce);
  }, []), Na = Y(w), Da = Y(E), La = Y(S), Aa = Y(k), Ia = Y(D), Ra = Y(H), Pa = Y(G), Oa = Y(z);
  Na.current = w, Da.current = E, La.current = S, Aa.current = k, Ia.current = D, Ra.current = H, Pa.current = G, Oa.current = z;
  const _a = 2e3, [Bo, Su] = j(() => ae === "lightweight" ? !0 : ae === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > _a : !1), Nu = Y(0), $a = Y(Bo);
  $a.current = Bo;
  const [Wo, kr] = j(null), Du = qk({
    placeholder: i,
    isMobile: Xt,
    maxImageSize: M,
    headingLevels: ve,
    collapsibleHeadingLevels: Ue,
    disabledFeatures: ee,
    progressiveSelectAll: Po,
    enableCollapsibleHeadings: yr,
    enableCollapsibleLists: _o,
    enableTagAutoDetect: gr,
    enableHexColorHighlight: Oo,
    isLightweight: Bo,
    setImageEditState: kr,
    callbackRefs: {
      onImageUploadStart: Na,
      onImageUploadComplete: Da,
      onImageUploadError: La,
      onImageUpload: Aa,
      resolveImageSrc: Ia,
      onWikiLinkClick: Ra,
      validateWikiLink: Pa
    }
  }), { editor: oe, turndownService: Cr } = eC({
    extensions: Du,
    content: t,
    editable: a,
    autofocus: l,
    spellCheck: be,
    initialMode: N,
    performanceMode: ae,
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
    editorModeRef: vr,
    rawMarkdownRef: br,
    setRawMarkdown: Pt,
    setIsLightweight: Su,
    lightweightCheckCounterRef: Nu,
    isLightweightRef: $a
  }), [Lu, Er] = j(!1), [Au, Iu] = j(!1), Ru = K !== void 0 ? K : Au, Ot = F((se) => {
    Iu(se), B?.(se);
  }, [B]), [Pu, Mr] = j(0), [Ou, _u] = j(""), _t = eb(oe, {
    storageKey: y,
    debounceMs: v,
    enabled: m,
    onSave: (se) => {
      R?.(se);
    },
    onRecover: (se) => {
      A?.(se);
    }
  }), zo = hC({
    editor: oe,
    turndownService: Cr,
    editorModeRef: vr,
    rawMarkdownRef: br,
    setEditorMode: $o,
    setRawMarkdown: Pt,
    onModeChange: L,
    enableTagAutoDetect: gr,
    disabledFeatures: ee
  }), Ha = F((se) => {
    Pt(se), br.current = se, o?.(se);
  }, [o]), Tr = gC(oe, {
    debounceMs: f,
    extendedStats: !1,
    enabled: u
  });
  tb(ue, {
    editor: oe,
    turndownService: Cr,
    editorModeRef: vr,
    handleModeSwitch: zo,
    wordCount: Tr,
    autoSaveState: _t,
    setIsFindReplaceOpen: Ot,
    setFindReplaceFocusTrigger: Mr
  }), pC({
    editorModeRef: vr,
    rawMarkdownRef: br,
    editorMode: Zt,
    handleModeSwitch: zo,
    setIsFindReplaceOpen: Ot,
    setFindReplaceFocusTrigger: Mr
  });
  const $u = St(() => ({
    openLinkPopover: () => Er(!0),
    openFindReplace: (se) => {
      se && _u(se), Ot(!0), Mr((Ce) => Ce + 1);
    },
    openFindReplaceWithReplace: () => {
      Ot(!0);
    }
  }), [Ot]);
  fC(oe, Xt, $u);
  const Ba = F((se, Ce) => {
    if (!wr) {
      Sa.current?.();
      return;
    }
    if (!oe) return;
    let Ge = { top: 0, left: 0 };
    if (Ce) {
      const _e = Ce.getBoundingClientRect();
      Ge = { top: _e.bottom + 4, left: _e.left };
    } else {
      const { from: _e, to: kt } = oe.state.selection, $t = oe.view.coordsAtPos(_e), Jt = oe.view.coordsAtPos(kt);
      Ge = { top: Jt.bottom + 8, left: ($t.left + Jt.left) / 2 };
    }
    Ho({ scope: se, position: Ge });
  }, [wr, oe]), Hu = F((se, Ce) => {
    if (!oe || !re) return;
    const Ge = re.find((Fo) => Fo.id === se);
    if (!Ge) return;
    const { from: _e, to: kt } = oe.state.selection, $t = _e !== kt ? oe.state.doc.textBetween(_e, kt, `
`) : "", Jt = Ge.scope === "document" || !$t ? oe.getText() : $t, Sr = oe.view.coordsAtPos(_e), Nr = oe.view.coordsAtPos(kt);
    wu({
      selectionTop: Sr.top,
      selectionBottom: Nr.bottom,
      selectionCenterX: (Sr.left + Nr.right) / 2
    }), Ho(null), xr(se, Ge.label, Jt, { from: _e, to: kt }, Ce);
  }, [oe, re, xr]), Bu = F(() => {
    if (!oe || Ye.status !== "complete") return;
    const { selectionRange: se, result: Ce } = Ye;
    oe.chain().focus().setTextSelection(se).deleteSelection().insertContent(Ce).run(), xt();
  }, [oe, Ye, xt]), Wu = F(() => {
    if (!oe || Ye.status !== "complete") return;
    const { selectionRange: se, result: Ce } = Ye;
    oe.chain().focus().setTextSelection(se.to).insertContent(`
` + Ce).run(), xt();
  }, [oe, Ye, xt]), zu = F(() => {
    if (!(Ye.status !== "complete" && Ye.status !== "error"))
      if (Ye.status === "complete") {
        const { action: se, actionLabel: Ce, inputText: Ge, selectionRange: _e } = Ye;
        xt(), xr(se, Ce, Ge, _e);
      } else
        xt();
  }, [Ye, xt, xr]), Fu = F(() => {
    if (!oe) return;
    const { from: se, to: Ce, empty: Ge } = oe.state.selection;
    if (Ge) return;
    const _e = oe.state.doc.slice(se, Ce), kt = Vf.fromSchema(oe.schema), $t = document.createElement("div"), Jt = kt.serializeFragment(_e.content);
    $t.appendChild(Jt);
    const Sr = $t.innerHTML, Nr = zn(Cr.turndown(Sr));
    navigator.clipboard.writeText(Nr).catch(() => {
      const Fo = oe.state.doc.textBetween(se, Ce, `
`);
      navigator.clipboard.writeText(Fo);
    });
  }, [oe, Cr]);
  if (!oe)
    return /* @__PURE__ */ h(CC, { className: c, theme: p });
  const Wa = /* @__PURE__ */ h(
    Gv,
    {
      editor: oe,
      onOpenLinkPopover: () => Er(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Ot(!0), Mr((se) => se + 1);
      },
      disabledFeatures: ee,
      autoReorderChecklist: Ro,
      aiEnabled: wr || !!Te,
      onAISparklesClick: (se) => Ba("document", se)
    }
  ), za = /* @__PURE__ */ I("div", { className: "editor-footer", children: [
    m && /* @__PURE__ */ h(
      yC,
      {
        status: _t.status,
        lastSaved: _t.lastSaved
      }
    ),
    /* @__PURE__ */ h("div", { className: "word-count", children: /* @__PURE__ */ I("span", { children: [
      Tr.words,
      " words"
    ] }) })
  ] }), Uu = {
    minHeight: ne,
    ...de && { maxHeight: de, overflowY: "auto" }
  };
  return /* @__PURE__ */ I("div", { className: `markdown-editor-container ${g === "neutral" ? "color-theme-neutral" : ""} ${c}`, "data-theme": p, children: [
    m && b && _t.hasRecoverableContent && /* @__PURE__ */ h(
      vC,
      {
        onRecover: () => {
          _t.recover();
        },
        onDismiss: _t.dismissRecovery
      }
    ),
    d && /* @__PURE__ */ I("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      J ? J(oe, Wa) : Wa,
      C && /* @__PURE__ */ h(EC, { editorMode: Zt, onModeSwitch: zo })
    ] }),
    !Xt && /* @__PURE__ */ h(
      qv,
      {
        editor: oe,
        isOpen: Ru,
        onClose: () => Ot(!1),
        focusTrigger: Pu,
        initialSearchQuery: Ou,
        editorMode: Zt,
        rawMarkdown: Qt,
        onRawMarkdownChange: Ha,
        onMatchesChange: Tu
      }
    ),
    /* @__PURE__ */ h(Qv, { editor: oe }),
    /* @__PURE__ */ I("div", { className: `editor-main-area ${lt ? "editor-with-toc" : ""}`, children: [
      lt && wt === "left" && /* @__PURE__ */ h(Fa, { fallback: null, children: /* @__PURE__ */ h(
        il,
        {
          editor: oe,
          visible: Rt,
          onVisibilityChange: Nn,
          title: Dn,
          minLevel: lr,
          maxLevel: cr,
          showLevelIndicators: dr,
          highlightActive: ur,
          treeView: Ln,
          width: qt,
          position: wt,
          scrollOffset: fr,
          onItemClick: pr,
          renderItem: hr,
          showToggleButton: mr,
          scrollContainerRef: An
        }
      ) }),
      /* @__PURE__ */ I(
        kC,
        {
          resetKey: `${t}-${gu}`,
          onRetry: () => Ta((se) => se + 1),
          onClearContent: () => {
            oe && oe.commands.clearContent(), n?.(""), r?.(""), o?.(""), Ta((se) => se + 1);
          },
          onError: me,
          children: [
            /* @__PURE__ */ h("div", { className: "editor-content-wrapper", ref: An, style: Uu, children: Zt === "wysiwyg" ? /* @__PURE__ */ I(ye, { children: [
              /* @__PURE__ */ h(ju, { editor: oe, className: "editor-content" }),
              /* @__PURE__ */ h(
                KC,
                {
                  editor: oe,
                  isMobile: Xt,
                  disabledFeatures: ee,
                  containerRef: An,
                  editable: a,
                  showFloatingToolbar: x,
                  isLinkPopoverOpen: Lu,
                  aiEnabled: wr,
                  onAISetupRequired: Te,
                  onAISparklesClick: (se) => Ba("selection", se),
                  onCopySelectionAsMarkdown: Fu,
                  aiDropdown: vu,
                  aiActions: re,
                  onAIActionSelect: Hu,
                  onAIDropdownClose: () => Ho(null),
                  aiState: Ye,
                  aiPopoverPosition: bu,
                  onAIReplace: Bu,
                  onAIInsert: Wu,
                  onAIRetry: zu,
                  onAIDiscard: () => {
                    yu(), xt();
                  },
                  onLinkPopoverClose: () => Er(!1),
                  onEditLink: () => Er(!0),
                  onWikiLinkSearch: Oa.current,
                  imageEditState: Wo,
                  onImageSave: (se, Ce) => {
                    oe.chain().focus().setNodeSelection(Wo.pos).updateAttributes("resizableImage", {
                      src: se,
                      alt: Ce
                    }).run(), kr(null);
                  },
                  onImageDelete: () => {
                    oe.chain().focus().setNodeSelection(Wo.pos).deleteSelection().run(), kr(null);
                  },
                  onImageEditClose: () => kr(null)
                }
              )
            ] }) : /* @__PURE__ */ h(
              bC,
              {
                content: Qt,
                onChange: Ha,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: ku,
                currentMatchIndex: Eu,
                autoClosePairs: Lo
              }
            ) }),
            /* @__PURE__ */ h(GC, { scrollContainerRef: An })
          ]
        }
      ),
      lt && wt === "right" && /* @__PURE__ */ h(Fa, { fallback: null, children: /* @__PURE__ */ h(
        il,
        {
          editor: oe,
          visible: Rt,
          onVisibilityChange: Nn,
          title: Dn,
          minLevel: lr,
          maxLevel: cr,
          showLevelIndicators: dr,
          highlightActive: ur,
          treeView: Ln,
          width: qt,
          position: wt,
          scrollOffset: fr,
          onItemClick: pr,
          renderItem: hr,
          showToggleButton: mr,
          scrollContainerRef: An
        }
      ) })
    ] }),
    u && (_ ? _(
      { words: Tr.words, characters: Tr.characters },
      _t.status,
      za
    ) : za),
    /* @__PURE__ */ h(xC, { visible: Ao, onClose: Io, editor: oe })
  ] });
}), Z1 = mo.create({
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
}), uu = {
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
}, QC = {
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
}, JC = {
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
}, e1 = {
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
  dark: uu,
  light: QC,
  sepia: JC,
  nord: e1
};
function t1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function Q1(e, t, n, r) {
  const o = Wn[e] || uu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const fu = hl(null);
function J1({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = j(t), s = Wn[r] || Wn.dark, i = F((l) => {
    Wn[l] && o(l);
  }, []);
  q(() => {
    n?.current && t1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(Wn)
  };
  return /* @__PURE__ */ h(fu.Provider, { value: a, children: e });
}
function eE() {
  const e = ml(fu);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const ll = [
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
function tE({ node: e, updateAttributes: t }) {
  const [n, r] = j(!1), o = e.attrs.language || "plaintext";
  ll.find((i) => i.value === o)?.label;
  const s = F(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ I(Jr, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ I("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ I("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ h(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: ll.map(({ value: i, label: a }) => /* @__PURE__ */ h("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ h(Jn, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ h(wn, { size: 14 }) : /* @__PURE__ */ h(bn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ h("pre", { className: "code-block-pre", children: /* @__PURE__ */ h("code", { children: /* @__PURE__ */ h(Vu, {}) }) })
  ] });
}
const pu = "paragon-editor-toc-width", n1 = 280, hu = 200, mu = 500, _n = 30, cl = 5;
function dl() {
  try {
    const e = localStorage.getItem(pu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= hu && t <= mu)
        return t;
    }
  } catch {
  }
  return n1;
}
function r1(e) {
  try {
    localStorage.setItem(pu, String(e));
  } catch {
  }
}
function o1(e, t, n) {
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
function s1(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t += `${r.pos}:${r.level}:${r.text};`;
  }
  return t;
}
function a1(e) {
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
function ul(e, t) {
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
      children: /* @__PURE__ */ I(
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
}), i1 = bt(function({
  headings: t,
  activeId: n,
  minLevel: r,
  showLevelIndicators: o,
  onItemClick: s,
  onToggleCollapse: i
}) {
  const a = Y(null), [l, c] = j(0), [d, u] = j(0);
  q(() => {
    const v = a.current;
    if (!v) return;
    const b = () => {
      u(v.clientHeight);
    };
    b();
    let x = null;
    return typeof ResizeObserver < "u" && (x = new ResizeObserver(b), x.observe(v)), () => {
      x?.disconnect();
    };
  }, []);
  const f = F((v) => {
    c(v.currentTarget.scrollTop);
  }, []), p = t.length * _n, g = Math.max(0, Math.floor(l / _n) - cl), m = Math.min(
    t.length,
    Math.ceil((l + d) / _n) + cl
  ), y = St(() => {
    const v = [];
    for (let b = g; b < m; b++) {
      const x = t[b];
      v.push(
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
              top: `${b * _n}px`,
              left: 0,
              right: 0,
              height: `${_n}px`
            }
          },
          x.id
        )
      );
    }
    return v;
  }, [t, g, m, n, r, o, s, i]);
  return t.length < 30 ? /* @__PURE__ */ h(ye, { children: t.map((v) => /* @__PURE__ */ h(
    Hs,
    {
      item: v,
      isActive: n === v.id,
      minLevel: r,
      showLevelIndicators: o,
      hasChildren: !1,
      isCollapsed: !1,
      treeView: !1,
      onItemClick: s,
      onToggleCollapse: i
    },
    v.id
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
}), l1 = bt(function({
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
  scrollContainerRef: v
}) {
  const [b, x] = j([]), [M, w] = j(null), [E, S] = j(n), [k, D] = j(/* @__PURE__ */ new Set()), [C, N] = j(() => {
    if (u) {
      const _ = parseInt(u, 10);
      return isNaN(_) ? dl() : _;
    }
    return dl();
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
      const de = f === "right" ? $.current - ne.clientX : ne.clientX - $.current, be = Math.min(mu, Math.max(hu, W.current + de));
      N(be);
    }, ee = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((ne) => (r1(ne), ne)));
    };
    return document.addEventListener("mousemove", _), document.addEventListener("mouseup", ee), () => {
      document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", ee);
    };
  }, [f]);
  const A = F(() => {
    if (!t || t.isDestroyed) return;
    const _ = o1(t, s, i), ee = s1(_);
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
    if (!t || !l || !E || b.length === 0) return;
    const _ = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!_) return;
    const ee = () => {
      const be = _.getBoundingClientRect();
      let ve = null;
      for (let Ue = b.length - 1; Ue >= 0; Ue--) {
        const lt = b[Ue], Rt = ul(t, lt.pos);
        if (Rt && Rt.getBoundingClientRect().top - be.top <= p + 10) {
          ve = lt.id;
          break;
        }
      }
      !ve && b.length > 0 && (ve = b[0].id), w(ve);
    };
    let ne;
    const de = () => {
      cancelAnimationFrame(ne), ne = requestAnimationFrame(ee);
    };
    return _.addEventListener("scroll", de, { passive: !0 }), ee(), () => {
      _.removeEventListener("scroll", de), cancelAnimationFrame(ne);
    };
  }, [t, b, l, E, p, v]);
  const H = F((_) => {
    if (!t || t.isDestroyed) return;
    const ee = ul(t, _.pos);
    if (ee) {
      const ne = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ne) {
        const de = ne.getBoundingClientRect(), ve = ee.getBoundingClientRect().top - de.top + ne.scrollTop;
        ne.scrollTo({ top: ve - p, behavior: "smooth" });
      } else
        ee.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(_.pos + 1);
    } catch {
    }
    w(_.id), g?.(_);
  }, [t, p, g, v]), G = F(() => {
    const _ = !E;
    S(_), r?.(_);
  }, [E, r]), z = F((_) => {
    D((ee) => {
      const ne = new Set(ee);
      return ne.has(_) ? ne.delete(_) : ne.add(_), ne;
    });
  }, []), U = F((_, ee = 0) => {
    if (m) {
      const ve = M === _.id;
      return m(_, ve, () => H(_));
    }
    const ne = M === _.id, de = _.children && _.children.length > 0, be = k.has(_.id);
    return /* @__PURE__ */ I("div", { children: [
      /* @__PURE__ */ h(
        Hs,
        {
          item: _,
          isActive: ne,
          minLevel: s,
          showLevelIndicators: a,
          hasChildren: !!de,
          isCollapsed: be,
          treeView: !0,
          onItemClick: H,
          onToggleCollapse: z
        }
      ),
      de && !be && /* @__PURE__ */ h("div", { className: "toc-children", children: _.children.map((ve) => U(ve, ee + 1)) })
    ] }, _.id);
  }, [M, k, H, z, s, a, m]), K = F((_) => _.map((ee) => U(ee)), [U]), B = F(() => m ? b.map((_) => {
    const ee = M === _.id;
    return /* @__PURE__ */ h("div", { children: m(_, ee, () => H(_)) }, _.id);
  }) : null, [b, M, m, H]);
  if (!t) return null;
  const J = c ? a1(b) : [];
  return /* @__PURE__ */ I(ye, { children: [
    y && /* @__PURE__ */ h(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: G,
        title: E ? "Hide Table of Contents" : "Show Table of Contents",
        children: E ? /* @__PURE__ */ h(Wf, { size: 16 }) : /* @__PURE__ */ h(zf, { size: 16 })
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
            /* @__PURE__ */ h("div", { className: "toc-content toc-content-with-toggle", children: b.length === 0 ? /* @__PURE__ */ I("div", { className: "toc-empty", children: [
              /* @__PURE__ */ h("p", { children: "No headings yet" }),
              /* @__PURE__ */ h("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ h("div", { className: "toc-list", children: c ? K(J) : m ? B() : /* @__PURE__ */ h(
              i1,
              {
                headings: b,
                activeId: M,
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
}), c1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TableOfContents: l1
}, Symbol.toStringTag, { value: "Module" }));
export {
  yC as AutoSaveIndicator,
  Z1 as Callout,
  lk as CalloutInputRule,
  tE as CodeBlockComponent,
  ok as CollapsibleHeading,
  xb as CollapsibleList,
  Yx as DatePill,
  J1 as EditorThemeProvider,
  Gv as EditorToolbar,
  qv as FindReplace,
  SC as FloatingToolbar,
  UC as ImageDropZone,
  Gk as ImageUpload,
  X1 as MarkdownEditor,
  ik as MarkdownLinkInputRule,
  nk as MarkdownPasteSafe,
  mb as MixedBulletList,
  bb as MixedListItem,
  gb as MixedOrderedList,
  vb as MixedTaskItem,
  yb as MixedTaskList,
  vC as RecoveryBanner,
  Ib as ResizableImage,
  ck as SearchHighlight,
  Qv as SelectAllActionBar,
  _k as SelectAllOccurrences,
  _C as SlashCommands,
  dk as TabIndent,
  l1 as TableOfContents,
  Kx as TagPill,
  qx as WikiLinkSafe,
  t1 as applyTheme,
  Q1 as createCustomTheme,
  uu as darkTheme,
  Ma as getDateVariant,
  cn as isValidTag,
  QC as lightTheme,
  xp as loadCoreLanguages,
  Za as loadLanguageIfNeeded,
  We as lowlight,
  e1 as nordTheme,
  Yn as normalizeTag,
  zt as parseDateFromMarkdown,
  JC as sepiaTheme,
  Wn as themes,
  eb as useAutoSave,
  eE as useEditorTheme,
  gC as useWordCount
};
//# sourceMappingURL=paragon.js.map
