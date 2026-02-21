import { jsxs as A, jsx as f, Fragment as He } from "react/jsx-runtime";
import { ReactNodeViewRenderer as To, NodeViewWrapper as Bn, NodeViewContent as ta, useEditorState as gc, useEditor as Fu, EditorContent as Uu } from "@tiptap/react";
import Yu from "@tiptap/starter-kit";
import ju from "@tiptap/extension-placeholder";
import Ku from "@tiptap/extension-text-align";
import Vu from "@tiptap/extension-highlight";
import Gu from "@tiptap/extension-link";
import { Table as qu } from "@tiptap/extension-table";
import Xu from "@tiptap/extension-table-row";
import Zu from "@tiptap/extension-table-cell";
import Qu from "@tiptap/extension-table-header";
import { Plugin as Ke, PluginKey as Ve, TextSelection as mn, AllSelection as Ju } from "@tiptap/pm/state";
import { DecorationSet as Xe, Decoration as st } from "@tiptap/pm/view";
import { Extension as ut, Node as Eo, mergeAttributes as jn, InputRule as Qe, Mark as yc } from "@tiptap/core";
import ef from "@tiptap/extension-bullet-list";
import tf from "@tiptap/extension-ordered-list";
import nf from "@tiptap/extension-list-item";
import rf from "@tiptap/extension-task-list";
import of from "@tiptap/extension-task-item";
import { findWrapping as ti, canJoin as sf } from "@tiptap/pm/transform";
import af from "@tiptap/extension-underline";
import cf from "@tiptap/extension-subscript";
import lf from "@tiptap/extension-superscript";
import df from "@tiptap/extension-typography";
import uf from "@tiptap/extension-code-block-lowlight";
import { createLowlight as ff } from "lowlight";
import * as S from "react";
import Q, { useState as K, useRef as V, useEffect as J, useCallback as Y, memo as Kn, createContext as vc, useContext as bc, useLayoutEffect as Do, useMemo as Ln, Component as mf, useReducer as pf, forwardRef as hf, useImperativeHandle as gf } from "react";
import { ChevronDown as Xt, Check as Vn, Copy as Gn, Link2 as na, ExternalLink as yf, Pencil as vf, Unlink as bf, Bold as ra, Italic as oa, Underline as sa, Strikethrough as aa, Code as wc, Highlighter as xc, Link as ia, Quote as ca, List as la, ListOrdered as da, CheckSquare as ua, FileCode as wf, Sparkles as No, ListTodo as fa, BookOpen as ma, MessageSquareText as kc, StickyNote as Cc, Info as ho, ChevronRight as Mc, ChevronLeftIcon as xf, ChevronRightIcon as kf, ChevronDownIcon as Cf, Calendar as Sc, Hash as ni, Image as pa, X as Pt, Type as Ro, Heading1 as Mf, Heading2 as Sf, Heading3 as Tf, Heading4 as Ef, Heading5 as Df, Code2 as Tc, Table as Ps, Minus as Ec, FileText as ha, Plus as ga, Undo as Nf, Redo as Rf, IndentIncrease as Af, IndentDecrease as Lf, PenLine as Pf, Library as If, Columns as ri, Trash2 as Pn, Rows as oi, ToggleLeft as si, ArrowUpDown as Of, Search as _f, ChevronUp as $f, MousePointerClick as Hf, CaseSensitive as Wf, WholeWord as zf, Regex as Bf, Replace as Is, ReplaceAll as Ff, Cloud as Uf, Loader2 as Dc, CloudOff as Yf, AlertCircle as jf, RotateCcw as ya, ImagePlus as Kf, Activity as Vf, Maximize2 as Nc, Minimize2 as Rc, AlertTriangle as Gf, CheckCircle2 as qf, MessageSquare as Ac, RefreshCw as Xf, SpellCheck as Zf, PanelRightClose as Qf, PanelRightOpen as Jf, Eye as em } from "lucide-react";
import va from "highlight.js/lib/languages/javascript";
import ba from "highlight.js/lib/languages/typescript";
import Lc from "highlight.js/lib/languages/python";
import wa from "highlight.js/lib/languages/xml";
import tm from "highlight.js/lib/languages/css";
import nm from "highlight.js/lib/languages/json";
import Ao from "highlight.js/lib/languages/bash";
import rm from "highlight.js/lib/languages/sql";
import om from "highlight.js/lib/languages/java";
import Pc from "highlight.js/lib/languages/cpp";
import Ic from "highlight.js/lib/languages/go";
import Oc from "highlight.js/lib/languages/rust";
import _c from "highlight.js/lib/languages/markdown";
import $c from "highlight.js/lib/languages/yaml";
import Hc from "highlight.js/lib/languages/diff";
import * as Wc from "react-dom";
import sm, { createPortal as am } from "react-dom";
import im from "@tiptap/extension-image";
import { createRoot as cm } from "react-dom/client";
import { Fragment as lm } from "@tiptap/pm/model";
import { liftListItem as ai, sinkListItem as ii } from "@tiptap/pm/schema-list";
import { undo as dm, redo as um } from "@tiptap/pm/history";
import fm from "@tiptap/extension-horizontal-rule";
const mm = new Ve("tableCellMenu");
let ci = !1, Vr = null;
function pm() {
  ci || (ci = !0, document.addEventListener("mouseover", (e) => {
    const n = e.target.closest("td, th");
    if (n && n.closest(".ProseMirror")) {
      const r = n.querySelector(".table-cell-menu-btn");
      r && (r.style.opacity = "1");
    }
  }, !0), document.addEventListener("mouseout", (e) => {
    const t = e.target, n = e.relatedTarget, r = t.closest("td, th");
    if (r && r.closest(".ProseMirror")) {
      if (n && r.contains(n) || document.querySelector(".table-cell-menu-dropdown")) return;
      const s = r.querySelector(".table-cell-menu-btn");
      s && (s.style.opacity = "0");
    }
  }, !0));
}
function hm(e) {
  return pm(), new Ke({
    key: mm,
    state: {
      init() {
        return Xe.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && Vr ? Vr.map(t.mapping, t.doc) : (Vr = gm(o.doc, e), Vr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function gm(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = st.widget(o + 1, (i) => {
        const a = document.createElement("div");
        a.className = "table-cell-menu-wrapper ProseMirror-widget", a.setAttribute("contenteditable", "false"), a.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const c = document.createElement("button");
        c.className = "table-cell-menu-btn", c.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', c.title = "Table options", c.type = "button";
        const l = document.documentElement.classList.contains("dark"), d = l ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", u = l ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", m = l ? "#999" : "#666", p = l ? "#2a2a2a" : "#f5f5f5";
        return c.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + d + ";border:1px solid " + u + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + m + ";pointer-events:auto;padding:0;", c.addEventListener("mouseenter", () => {
          c.style.opacity = "1", c.style.background = p, c.style.transform = "scale(1.05)";
        }), c.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), c.style.background = d, c.style.transform = "scale(1)";
        }), c.addEventListener("click", (h) => {
          h.preventDefault(), h.stopPropagation();
          const g = c.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), ym(h, t, o, g);
        }), a.appendChild(c), a;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), Xe.create(e, n);
}
function ym(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const i = 170, a = 280;
  let c = Math.max(0, Math.min(r.top, window.innerHeight)), l = Math.max(0, Math.min(r.bottom, window.innerHeight)), d = Math.max(0, Math.min(r.left, window.innerWidth)), u = l + 4, m = d - i + r.width + 8;
  m + i > window.innerWidth - 12 && (m = window.innerWidth - i - 12), m < 12 && (m = 12), u + a > window.innerHeight - 12 && (u = c - a - 4), u < 12 && (u = 12), u + a > window.innerHeight - 12 && (u = window.innerHeight - a - 12);
  const p = document.documentElement.classList.contains("dark"), h = p ? "#1f1f1f" : "#ffffff", g = p ? "#3a3a3a" : "#e5e5e5", y = p ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + u + "px;left:" + m + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + h + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + y + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const b = t.state.doc.resolve(n);
  let v = !1;
  for (let N = b.depth; N >= 0; N--)
    if (b.node(N).type.name === "table") {
      b.node(N).firstChild?.firstChild?.type.name === "tableHeader" && (v = !0);
      break;
    }
  const w = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n + 1).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n + 1).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n + 1).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n + 1).addRowAfter().run() },
    { label: "divider" },
    { label: v ? "✓ Header Row" : "  Header Row", icon: "toggle-header", action: () => t.chain().focus().setTextSelection(n + 1).toggleHeaderRow().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => vm(t) }
  ], M = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, x = p ? "#2a2a2a" : "#f5f5f5", C = p ? "#ff6b6b" : "#dc2626", D = p ? "#999999" : "#666666", k = p ? "#333333" : "#e5e5e5";
  w.forEach((N) => {
    if (N.label === "divider") {
      const R = document.createElement("div");
      R.style.cssText = "height:1px;background:" + k + ";margin:4px 0;", s.appendChild(R);
    } else {
      const R = document.createElement("button");
      R.type = "button";
      const I = N.destructive ? C : y;
      R.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + I + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const O = M[N.icon || ""] || "", H = N.destructive ? C : D;
      R.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + H + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + N.label + "</span>", R.addEventListener("mouseenter", () => {
        R.style.background = N.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : x;
      }), R.addEventListener("mouseleave", () => {
        R.style.background = "transparent";
      }), R.addEventListener("click", (B) => {
        B.preventDefault(), B.stopPropagation(), N.action && N.action(), s.remove();
      }), s.appendChild(R);
    }
  }), document.body.appendChild(s);
  const T = (N) => {
    const R = N.target;
    if (s.contains(R) || R.classList.contains("table-cell-menu-btn"))
      return;
    const I = R.closest('[role="dialog"]');
    I && I.contains(s) || (s.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", E));
  }, E = (N) => {
    N.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", E));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", T), document.addEventListener("keydown", E);
  }, 0);
}
function vm(e) {
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
const bm = Zu.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      hm(this.editor)
    ];
  }
}), wm = Qu.extend({}), hr = new Ve("tableSorting");
let dn = null, ur = null;
function xm(e) {
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
function km(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function Cm(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (h, g) => {
    if (h.type.name === "table" && g === t)
      return s = h, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = dn?.tablePos === t && dn?.columnIndex === n && dn?.direction === "asc" ? "desc" : "asc";
  dn = { tablePos: t, columnIndex: n, direction: i }, ur = null;
  const a = [];
  s.forEach((h) => {
    if (h.type.name === "tableRow") {
      let g = !1;
      h.forEach((y) => {
        y.type.name === "tableHeader" && (g = !0);
      }), a.push({ node: h, isHeader: g });
    }
  });
  const c = a.filter((h) => h.isHeader), l = a.filter((h) => !h.isHeader);
  if (l.length < 2) {
    li(n, i), o.dispatch(r.tr.setMeta(hr, { updated: !0 }));
    return;
  }
  const d = l.map((h) => {
    let g = "", y = 0;
    return h.node.forEach((b) => {
      y === n && (g = b.textContent || ""), y++;
    }), { ...h, sortValue: xm(g) };
  }), u = d.map((h, g) => g);
  d.sort((h, g) => km(h.sortValue, g.sortValue, i));
  const m = d.map((h, g) => l.indexOf(h));
  if (u.some((h, g) => h !== m[g])) {
    const h = [];
    c.forEach((b) => h.push(b.node)), d.forEach((b) => h.push(b.node));
    const g = s.type.create(s.attrs, h), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(hr, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(hr, { updated: !0 }));
  li(n, i);
}
function li(e, t) {
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
function Mm(e, t, n, r) {
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
    d.preventDefault(), d.stopPropagation(), Cm(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function Sm(e) {
  return new Ke({
    key: hr,
    state: {
      init() {
        return Xe.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(hr);
        return !t.docChanged && !s?.updated && ur ? ur.map(t.mapping, t.doc) : (ur = Tm(o.doc, e), ur);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Tm(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "table") {
      const s = o;
      r.forEach((i, a) => {
        if (i.type.name === "tableRow") {
          let c = 0, l = 0;
          i.forEach((d, u) => {
            if (d.type.name === "tableHeader") {
              const m = o + 1 + a + 1 + l;
              let p = m + 1;
              d.forEach((w, M) => {
                w.type.name === "paragraph" && (p = m + 1 + M + w.nodeSize - 1);
              });
              const g = dn?.tablePos === s && dn?.columnIndex === c ? dn.direction : null, y = c, b = s, v = st.widget(p, () => Mm(g, b, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(v);
            }
            l += d.nodeSize, c++;
          });
        }
      });
    }
  }), Xe.create(e, n);
}
const Em = ut.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Sm(this.editor)];
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
const Dm = ef.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, d = t.schema.nodes.taskItem;
        let u = null, m = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === i || h.type === a || h.type === c) {
            u = h.type, m = s.before(p);
            break;
          }
        }
        if (u === i)
          return e.liftListItem("listItem");
        if (u === a || u === c) {
          if (!r) return !0;
          if (xa(n, m, i, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Nm = tf.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, d = t.schema.nodes.taskItem;
        let u = null, m = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === i || h.type === a || h.type === c) {
            u = h.type, m = s.before(p);
            break;
          }
        }
        if (u === c)
          return e.liftListItem("listItem");
        if (u === a || u === i) {
          if (!r) return !0;
          if (xa(n, m, c, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Rm = rf.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: c, $to: l } = a, d = c.blockRange(l);
        if (!d)
          return !1;
        const u = n.schema.nodes.taskList, m = n.schema.nodes.taskItem;
        let p = !1;
        for (let x = c.depth; x > 0; x--)
          if (c.node(x).type === u) {
            p = !0, c.before(x);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const h = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let b = null, v = -1;
        for (let x = c.depth; x > 0; x--) {
          const C = c.node(x);
          if (C.type === h || C.type === g) {
            b = C, v = c.before(x);
            break;
          }
        }
        if (b) {
          if (!o) return !0;
          const x = v, C = r.doc.nodeAt(x);
          if (!C) return !1;
          r.setNodeMarkup(x, u, C.attrs);
          const D = r.doc.nodeAt(x);
          if (!D) return !1;
          const k = [];
          D.forEach((T, E) => {
            T.type === y && k.push(x + 1 + E);
          });
          for (let T = k.length - 1; T >= 0; T--) {
            const E = k[T], N = r.doc.nodeAt(E);
            N && N.type === y && r.setNodeMarkup(E, m, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const w = ti(d, u);
        if (w) {
          r.wrap(d, w);
          const { $from: x } = r.selection;
          let C = -1;
          for (let D = x.depth; D > 0; D--)
            if (x.node(D).type === u) {
              C = x.before(D);
              break;
            }
          if (C >= 0) {
            const D = r.doc.nodeAt(C);
            if (D) {
              const k = [];
              D.forEach((T, E) => {
                T.type === y && k.push(C + 1 + E);
              });
              for (let T = k.length - 1; T >= 0; T--) {
                const E = k[T], N = r.doc.nodeAt(E);
                N && N.type === y && r.setNodeMarkup(E, m, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const M = ti(d, h);
        if (M) {
          r.wrap(d, M);
          const { $from: x } = r.selection;
          let C = -1;
          for (let D = x.depth; D > 0; D--)
            if (x.node(D).type === h) {
              C = x.before(D);
              break;
            }
          return C >= 0 && xa(r, C, u, m, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Am = of.extend({
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
          const u = r.before(s), { tr: m } = n, p = n.schema.nodes.taskItem, h = n.schema.nodes.paragraph, g = p.create(
            { checked: !1 },
            h.create()
          );
          m.insert(u, g);
          const y = u + 1;
          return m.setSelection(mn.create(m.doc, y)), m.scrollIntoView(), t.view.dispatch(m), !0;
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
      new Ke({
        key: new Ve("taskItemInputRule"),
        props: {
          handleTextInput(n, r, o, s) {
            if (s !== " ") return !1;
            const { state: i } = n, a = i.doc.resolve(r), c = a.parent.textBetween(
              0,
              a.parentOffset,
              void 0,
              "￼"
            ), d = /^\s*(-\s*)?\[([( |x])?\]$/.exec(c);
            if (!d) return !1;
            const u = d[2] === "x", m = a.start() + (d.index || 0), p = r, h = i.tr;
            h.delete(m, p);
            const y = h.doc.resolve(m).blockRange();
            if (!y || !t || !e) return !1;
            const b = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: u } }
            ];
            if (h.wrap(y, b), m > 1) {
              const v = h.doc.resolve(m - 1).nodeBefore;
              v && v.type === t && sf(h.doc, m - 1) && h.join(m - 1);
            }
            return n.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), Lm = nf.extend({
  content: "paragraph block*"
}), di = new Ve("collapsibleList");
function Os(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function _s(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function Pm(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let In = null;
function ls(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !_s(o))
      return !0;
    const i = Os(o, s), a = t.collapsedItems.has(i);
    r.push(
      st.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${a ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const c = o.firstChild;
    if (c && c.type.name === "paragraph") {
      const l = s + 1 + c.nodeSize - 1, d = st.widget(
        l,
        () => {
          const u = CSS.escape(i), m = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${u}"]`
          );
          if (m) {
            m.classList.contains("collapsed") !== a && (m.classList.remove("collapsed", "expanded"), m.classList.add(a ? "collapsed" : "expanded"), m.title = a ? "Click to expand" : "Click to collapse");
            const y = m.parentElement;
            if (y) return y;
          }
          const p = document.createElement("span");
          p.className = "collapsible-list-chevron-wrapper", p.setAttribute("contenteditable", "false");
          const h = document.createElement("button");
          return h.className = `collapsible-list-chevron ${a ? "collapsed" : "expanded"}`, h.setAttribute("data-list-item-id", i), h.setAttribute("contenteditable", "false"), h.setAttribute("tabindex", "-1"), h.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', h.title = a ? "Click to expand" : "Click to collapse", h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = h.classList.contains("collapsed");
            h.classList.remove("collapsed", "expanded"), h.classList.add(y ? "expanded" : "collapsed"), h.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), In && In.dispatch(
              In.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), p.appendChild(h), p;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(d);
    }
    if (a && Pm(o, s)) {
      let d = s + 1;
      o.forEach((u) => {
        ["bulletList", "orderedList", "taskList"].includes(u.type.name) && r.push(
          st.node(d, d + u.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), d += u.nodeSize;
      });
    }
    return !0;
  }), Xe.create(e, r);
}
const Im = ut.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !_s(o))
          return !1;
        const s = Os(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && _s(o) && n.collapsedItems.add(Os(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ke({
        key: di,
        view(n) {
          return In = n, {
            update(r) {
              In = r;
            },
            destroy() {
              In = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: ls(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: ls(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = di.getState(n);
            return r?.decorations ? r.decorations : ls(n.doc, e, t);
          }
        }
      })
    ];
  }
}), we = ff();
we.register("javascript", va);
we.register("js", va);
we.register("jsx", va);
we.register("typescript", ba);
we.register("ts", ba);
we.register("tsx", ba);
we.register("python", Lc);
we.register("py", Lc);
we.register("xml", wa);
we.register("html", wa);
we.register("svg", wa);
we.register("css", tm);
we.register("json", nm);
we.register("bash", Ao);
we.register("sh", Ao);
we.register("shell", Ao);
we.register("zsh", Ao);
we.register("sql", rm);
we.register("java", om);
we.register("cpp", Pc);
we.register("c", Pc);
we.register("go", Ic);
we.register("golang", Ic);
we.register("rust", Oc);
we.register("rs", Oc);
we.register("markdown", _c);
we.register("md", _c);
we.register("yaml", $c);
we.register("yml", $c);
we.register("diff", Hc);
we.register("patch", Hc);
function Om({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = K(!1), [s, i] = K(!1), a = V(null);
  J(() => {
    const m = a.current;
    if (!m || s) return;
    const p = new IntersectionObserver(
      (h) => {
        for (const g of h)
          g.isIntersecting && (i(!0), p.unobserve(m));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return p.observe(m), () => {
      p.disconnect();
    };
  }, [s]);
  const c = Y(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (m) {
      console.error("Failed to copy:", m);
    }
  }, [e.textContent]), l = n.options.lowlight?.listLanguages?.() || [], d = e.attrs.language || "plaintext", u = d === "plaintext" ? "Plain Text" : d.charAt(0).toUpperCase() + d.slice(1);
  return /* @__PURE__ */ A(Bn, { className: "code-block-wrapper", ref: a, children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ A(
          "select",
          {
            value: d,
            onChange: (m) => t({ language: m.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ f("option", { value: "plaintext", children: "Plain Text" }),
              l.map((m) => /* @__PURE__ */ f("option", { value: m, children: m.charAt(0).toUpperCase() + m.slice(1) }, m))
            ]
          }
        ),
        /* @__PURE__ */ f("span", { className: "code-block-language-label", children: u }),
        /* @__PURE__ */ f(Xt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          onClick: c,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ f(Vn, { size: 14 }) : /* @__PURE__ */ f(Gn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("pre", { className: `code-block-pre ${s ? "" : "code-block-deferred"}`, children: /* @__PURE__ */ f(ta, { className: s ? `language-${d}` : "language-plaintext" }) })
  ] });
}
const _m = uf.extend({
  addNodeView() {
    return To(Om);
  }
}).configure({
  lowlight: we,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function $t({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: r
}) {
  const o = Y(
    (a) => {
      r?.(a), a.stopPropagation();
    },
    [r]
  ), s = Y((a) => {
    a.stopPropagation();
  }, []), i = Y((a) => {
    a.stopPropagation();
  }, []);
  return am(
    /* @__PURE__ */ f(
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
function $m({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = K(""), s = V(null), i = V(null), [a, c] = K({ top: 0, left: 0 });
  J(() => {
    if (t) {
      const h = e.getAttributes("link").href || "";
      o(h);
      try {
        const { view: g } = e, { from: y } = g.state.selection, b = g.coordsAtPos(y), v = b.bottom + 8, w = Math.max(16, Math.min(b.left, window.innerWidth - 420));
        c({ top: v, left: w });
      } catch {
        c({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), J(() => {
    if (!t) return;
    const h = (v) => {
      i.current && !i.current.contains(v.target) && n();
    }, g = () => {
      n();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", h);
    }, 10), b = e.view.dom.closest(".editor-content-wrapper");
    return b?.addEventListener("scroll", g), () => {
      clearTimeout(y), document.removeEventListener("mousedown", h), b?.removeEventListener("scroll", g);
    };
  }, [t, n, e]);
  const l = Y((h) => {
    if (h?.preventDefault(), r.trim()) {
      let g = r.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), d = Y((h) => {
    h.key === "Escape" ? (h.preventDefault(), n()) : h.key === "Enter" && (h.preventDefault(), l());
  }, [n, l]);
  if (!t) return null;
  const m = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", p = /* @__PURE__ */ f(
    "div",
    {
      ref: i,
      className: "link-popover",
      "data-theme": m,
      style: {
        position: "fixed",
        top: `${a.top}px`,
        left: `${a.left}px`
      },
      children: /* @__PURE__ */ A("form", { onSubmit: l, className: "link-popover-form", children: [
        /* @__PURE__ */ A("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ f(na, { className: "link-popover-icon", size: 16 }),
          /* @__PURE__ */ f(
            "input",
            {
              ref: s,
              type: "text",
              value: r,
              onChange: (h) => o(h.target.value),
              onKeyDown: d,
              placeholder: "Enter URL or paste link",
              className: "link-popover-input",
              autoComplete: "off",
              spellCheck: !1
            }
          )
        ] }),
        /* @__PURE__ */ f("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" })
      ] })
    }
  );
  return /* @__PURE__ */ f($t, { children: p });
}
function Hm({ editor: e, onEditLink: t }) {
  const [n, r] = K({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = V(null), s = V(null), i = Y((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const M = w.getAttribute("href") || "", x = w.getBoundingClientRect(), C = x.bottom + 8, D = Math.max(16, Math.min(x.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: M,
          position: { top: C, left: D },
          linkElement: w
        });
      } catch (M) {
        console.warn("LinkHoverTooltip: Error showing tooltip", M);
      }
    }
  }, [e]), a = Y(() => {
    s.current = setTimeout(() => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = Y(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  J(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const M = (C) => {
      const k = C.target.closest("a");
      k && w.contains(k) && i(k);
    }, x = (C) => {
      const D = C.target, k = C.relatedTarget;
      if (D.closest("a")) {
        if (k && o.current?.contains(k))
          return;
        a();
      }
    };
    return w.addEventListener("mouseover", M), w.addEventListener("mouseout", x), () => {
      w.removeEventListener("mouseover", M), w.removeEventListener("mouseout", x), s.current && clearTimeout(s.current);
    };
  }, [e, i, a]), J(() => {
    if (!n.isVisible) return;
    const w = () => {
      r((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, M = e.view.dom.closest(".editor-content-wrapper");
    return M?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      M?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e]);
  const [l, d] = K(!1), u = Y(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      d(!0), setTimeout(() => d(!1), 1500);
    });
  }, [n.url]), m = Y(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = Y(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: M } = w.state;
      let x = null, C = null;
      M.descendants((D, k) => {
        if (D.isText && D.marks.some((T) => T.type.name === "link")) {
          const T = w.nodeDOM(k);
          if (T && (T === n.linkElement || T.parentElement === n.linkElement))
            return x = k, C = k + D.nodeSize, !1;
        }
        return !0;
      }), x !== null && C !== null ? e.chain().focus().setTextSelection({ from: x, to: C }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), h = Y(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: M } = w.state;
      M.descendants((x, C) => {
        if (x.isText && x.marks.some((D) => D.type.name === "link")) {
          const D = w.nodeDOM(C);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: C, to: C + x.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((w) => ({ ...w, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const g = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, b = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", v = /* @__PURE__ */ f(
    "div",
    {
      ref: o,
      className: "link-hover-tooltip",
      "data-theme": b,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`
      },
      onMouseEnter: c,
      onMouseLeave: a,
      children: /* @__PURE__ */ A("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ A(
          "button",
          {
            onClick: m,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ f(yf, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ f("span", { className: "link-hover-tooltip-url", children: g || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ A("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ f(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ f(vf, { size: 14 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: u,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: l ? /* @__PURE__ */ f(Vn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ f(Gn, { size: 14 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ f(bf, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ f($t, { children: v });
}
const ot = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ f(
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
), ui = () => /* @__PURE__ */ f("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), fi = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Wm = Kn(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = K(!1), d = V(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", m = fi.find((h) => h.value === u)?.shortLabel || "P";
  J(() => {
    if (!c) return;
    const h = (g) => {
      d.current && !d.current.contains(g.target) && l(!1);
    };
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [c]);
  const p = (h, g) => {
    if (h.preventDefault(), h.stopPropagation(), g === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const y = parseInt(g.replace("h", ""));
      t.chain().focus().toggleHeading({ level: y }).run();
    }
    l(!1);
  };
  return /* @__PURE__ */ A("div", { ref: d, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ A(
      "button",
      {
        onMouseDown: (h) => {
          h.preventDefault(), h.stopPropagation(), l(!c);
        },
        title: "Text style",
        className: `
          flex items-center gap-1 h-7 px-2 rounded-md flex-shrink-0
          transition-all duration-100 ease-out touch-manipulation
          text-xs font-normal overflow-visible
          ${u !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ f("span", { className: "min-w-[18px] text-center", children: m }),
          /* @__PURE__ */ f(Xt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
        ]
      }
    ),
    c && /* @__PURE__ */ f(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: fi.map((h) => {
          const g = h.value === u;
          return /* @__PURE__ */ A(
            "button",
            {
              onMouseDown: (y) => p(y, h.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${g ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ f("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: h.shortLabel }),
                /* @__PURE__ */ f("span", { children: h.label })
              ]
            },
            h.value
          );
        })
      }
    )
  ] });
}), zm = Kn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const i = V(null), a = gc({
    editor: t,
    selector: ({ editor: T }) => ({
      isBold: T.isActive("bold"),
      isItalic: T.isActive("italic"),
      isUnderline: T.isActive("underline"),
      isStrike: T.isActive("strike"),
      isCode: T.isActive("code"),
      isHighlight: T.isActive("highlight"),
      isLink: T.isActive("link"),
      isH1: T.isActive("heading", { level: 1 }),
      isH2: T.isActive("heading", { level: 2 }),
      isH3: T.isActive("heading", { level: 3 }),
      isH4: T.isActive("heading", { level: 4 }),
      isH5: T.isActive("heading", { level: 5 }),
      isBulletList: T.isActive("bulletList"),
      isOrderedList: T.isActive("orderedList"),
      isTaskList: T.isActive("taskList"),
      isBlockquote: T.isActive("blockquote"),
      isCodeBlock: T.isActive("codeBlock")
    })
  }), [c, l] = K(!1), [d, u] = K(""), [m, p] = K(!1), [h, g] = K({ top: 0, left: 0 }), y = V(null), b = V(null), v = V(null), w = Y(() => {
    if (d) {
      let T = d.trim();
      !/^https?:\/\//i.test(T) && !T.startsWith("mailto:") && (T = "https://" + T), t.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    l(!1), u("");
  }, [t, d]), M = (T) => {
    T.preventDefault(), T.stopPropagation();
    const E = t.getAttributes("link").href;
    u(E || ""), l(!0);
  }, x = Y((T, E) => {
    T.preventDefault(), T.stopPropagation(), E();
  }, []);
  J(() => {
    if (!t || t.isDestroyed) return;
    const T = () => {
      if (!t.isDestroyed)
        try {
          const { selection: E } = t.state, { empty: N, from: R, to: I } = E, B = ("node" in E && E.node ? E.node : null)?.type?.name === "resizableImage";
          if (N || B || t.isActive("codeBlock")) {
            v.current && (clearTimeout(v.current), v.current = null), b.current && clearTimeout(b.current), b.current = setTimeout(() => {
              p(!1), l(!1);
            }, 150);
            return;
          }
          b.current && (clearTimeout(b.current), b.current = null);
          const q = t.view.coordsAtPos(R), P = t.view.coordsAtPos(I), L = y.current?.offsetWidth || 500, U = y.current?.offsetHeight || 40, X = 8, G = window.innerWidth;
          let Z = 0, te = 0;
          if (y.current) {
            const he = y.current.closest('[data-slot="dialog-content"]');
            if (he) {
              const ve = he.getBoundingClientRect();
              Z = ve.left, te = ve.top;
            }
          }
          let z = (q.left + P.left) / 2 - L / 2 - Z;
          const j = Z ? G - Z : G;
          z = Math.max(X, Math.min(j - L - X, z));
          let ee = q.top - U - 10 - te;
          ee < X && (ee = P.bottom + 10 - te), m ? g({ top: Math.max(X, ee), left: z }) : (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
            g({ top: Math.max(X, ee), left: z }), p(!0);
          }, 50));
        } catch (E) {
          console.warn("FloatingToolbar: Error updating position", E);
        }
    };
    return t.on("selectionUpdate", T), () => {
      t.off("selectionUpdate", T), b.current && clearTimeout(b.current), v.current && clearTimeout(v.current);
    };
  }, [t, m]);
  const C = (T) => {
    b.current && (clearTimeout(b.current), b.current = null);
  };
  if (!m || r)
    return null;
  const D = 15, k = c ? /* @__PURE__ */ f(
    "div",
    {
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: C,
      children: /* @__PURE__ */ A("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ f(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: d,
            onChange: (T) => u(T.target.value),
            onKeyDown: (T) => {
              T.key === "Enter" && (T.preventDefault(), w()), T.key === "Escape" && (l(!1), u(""));
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
          /* @__PURE__ */ f(
            "button",
            {
              onMouseDown: (T) => {
                T.preventDefault(), w();
              },
              className: `
              flex-1 sm:flex-none px-4 sm:px-3 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
              bg-primary text-primary-foreground
              hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation
            `,
              children: "Apply"
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onMouseDown: (T) => {
                T.preventDefault(), l(!1), u("");
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
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: C,
      children: [
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBold().run()),
            isActive: a?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ f(ra, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleItalic().run()),
            isActive: a?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ f(oa, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleUnderline().run()),
            isActive: a?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ f(sa, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleStrike().run()),
            isActive: a?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ f(aa, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleCode().run()),
            isActive: a?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ f(wc, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleHighlight().run()),
            isActive: a?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ f(xc, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: M,
            isActive: a?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ f(ia, { size: D })
          }
        ),
        /* @__PURE__ */ f(ui, {}),
        /* @__PURE__ */ f(
          Wm,
          {
            editor: t,
            isH1: a?.isH1 ?? !1,
            isH2: a?.isH2 ?? !1,
            isH3: a?.isH3 ?? !1,
            isH4: a?.isH4 ?? !1,
            isH5: a?.isH5 ?? !1,
            executeCommand: x
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBlockquote().run()),
            isActive: a?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ f(ca, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBulletList().run()),
            isActive: a?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ f(la, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleOrderedList().run()),
            isActive: a?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ f(da, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleTaskList().run()),
            isActive: a?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ f(ua, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: a?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ f(wf, { size: D })
          }
        ),
        o && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ f(ui, {}),
          /* @__PURE__ */ f(
            "button",
            {
              ref: i,
              onMouseDown: (T) => {
                T.preventDefault(), T.stopPropagation(), i.current && s?.(i.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ f(No, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ f($t, { onMouseDown: C, children: k });
}), Gr = {
  info: { icon: ho, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: Cc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: kc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: ma, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: fa, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function Bm({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = K(!1), [s, i] = K(!1), [a, c] = K(null), l = V(null), d = V(null), u = e.attrs.type || "info", m = Gr[u] || Gr.info, p = m.icon, h = Y(() => {
    if (d.current) {
      const v = d.current.getBoundingClientRect();
      c({
        top: v.bottom + 4,
        left: v.left
      });
    }
  }, []);
  J(() => {
    if (!r) return;
    const v = (w) => {
      l.current && !l.current.contains(w.target) && d.current && !d.current.contains(w.target) && o(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [r]), J(() => {
    if (!r) return;
    const v = () => o(!1);
    return window.addEventListener("scroll", v, !0), () => window.removeEventListener("scroll", v, !0);
  }, [r]);
  const g = Y(() => {
    n.isEditable && (r || h(), o(!r));
  }, [n.isEditable, r, h]), y = (v) => {
    t({ type: v }), o(!1);
  }, b = Y((v) => {
    v.stopPropagation(), i((w) => !w);
  }, []);
  return /* @__PURE__ */ A(Bn, { className: `callout callout-${u}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": u, children: [
    /* @__PURE__ */ A(
      "div",
      {
        className: "callout-header",
        contentEditable: !1,
        onClick: b,
        style: { cursor: "pointer" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ A(
            "button",
            {
              ref: d,
              className: "callout-header-button",
              onClick: (v) => {
                v.stopPropagation(), g();
              },
              title: n.isEditable ? "Click to change callout type" : m.label,
              style: { color: m.borderColor },
              contentEditable: !1,
              children: [
                /* @__PURE__ */ f(p, { size: 18 }),
                /* @__PURE__ */ f("span", { className: "callout-label", children: m.label }),
                n.isEditable && /* @__PURE__ */ f(Xt, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ f(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: m.borderColor },
              children: s ? /* @__PURE__ */ f(Mc, { size: 16 }) : /* @__PURE__ */ f(Xt, { size: 16 })
            }
          ),
          r && n.isEditable && a && /* @__PURE__ */ f($t, { children: /* @__PURE__ */ f(
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
              children: Object.keys(Gr).map((v) => {
                const w = Gr[v], M = w.icon;
                return /* @__PURE__ */ A(
                  "button",
                  {
                    className: `callout-type-option ${v === u ? "active" : ""}`,
                    onClick: (x) => {
                      x.stopPropagation(), y(v);
                    },
                    onMouseDown: (x) => x.stopPropagation(),
                    style: { "--callout-option-color": w.color },
                    children: [
                      /* @__PURE__ */ f(M, { size: 16, style: { color: w.borderColor } }),
                      /* @__PURE__ */ f("span", { children: w.label })
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
    /* @__PURE__ */ f("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ f(ta, {}) })
  ] });
}
const Fm = Eo.create({
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
      jn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return To(Bm);
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
}), Um = im.extend({
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
        jn(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addNodeView() {
    const e = this.options;
    return ({ node: t, editor: n, getPos: r }) => {
      let o = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const i = (L) => {
        const U = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[L] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${U}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (L) => !(!L || L.startsWith("data:") || L.startsWith("blob:") || L.startsWith("http://") || L.startsWith("https://")), l = (L) => {
        c(L) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(L).then((U) => {
          a.src = U, a.style.opacity = "1";
        }).catch(() => {
          a.src = L, a.style.opacity = "1";
        })) : a.src = L;
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
      const m = document.createElement("div");
      m.classList.add("image-menu-dropdown"), m.style.cssText = `
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
      const p = (L, U, X) => {
        const G = document.createElement("button");
        return G.setAttribute("type", "button"), G.style.cssText = `
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
        `, G.innerHTML = `${U}<span>${L}</span>`, G.addEventListener("mouseenter", () => {
          G.style.background = "oklch(0.95 0 0)";
        }), G.addEventListener("mouseleave", () => {
          G.style.background = "transparent";
        }), G.addEventListener("click", (Z) => {
          Z.preventDefault(), Z.stopPropagation(), X(), m.style.display = "none", T = !1;
        }), G;
      }, h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      m.appendChild(p("Edit", h, () => {
        const L = typeof r == "function" ? r() : null;
        if (L != null && e.onImageClick) {
          const U = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: L,
            rect: U
          });
        }
      })), m.appendChild(p("Copy image", g, async () => {
        const L = o.attrs.src;
        try {
          const X = await (await fetch(L)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [X.type]: X })
          ]);
        } catch {
          try {
            const U = new window.Image();
            U.crossOrigin = "anonymous", await new Promise((Z, te) => {
              U.onload = () => Z(), U.onerror = () => te(new Error("Image load failed")), U.src = L;
            });
            const X = document.createElement("canvas");
            X.width = U.naturalWidth, X.height = U.naturalHeight;
            const G = X.getContext("2d");
            if (G) {
              G.drawImage(U, 0, 0);
              const Z = await new Promise(
                (te) => X.toBlob(te, "image/png")
              );
              Z ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": Z })
              ]) : await navigator.clipboard.writeText(L);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(L);
            } catch {
            }
          }
        }
      })), m.appendChild(p("Copy URL", b, async () => {
        const L = o.attrs.src;
        try {
          await navigator.clipboard.writeText(L);
        } catch {
        }
      })), m.appendChild(p("Save image", y, () => {
        const L = o.attrs.src, U = o.attrs.alt || "image", X = document.createElement("a");
        X.href = L, X.download = U, X.target = "_blank", X.rel = "noopener noreferrer", document.body.appendChild(X), X.click(), setTimeout(() => {
          document.body.removeChild(X);
        }, 100);
      }));
      const v = document.createElement("div");
      v.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, m.appendChild(v);
      const w = document.createElement("div");
      w.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, w.textContent = "Alignment", m.appendChild(w);
      const M = document.createElement("div");
      M.style.cssText = `
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
      ], C = [], D = (L) => {
        C.forEach((U) => {
          (U.getAttribute("data-align-value") || "left") === L ? (U.style.background = "oklch(1 0 0)", U.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", U.style.color = "oklch(0.25 0 0)", U.style.fontWeight = "600") : (U.style.background = "transparent", U.style.boxShadow = "none", U.style.color = "oklch(0.5 0 0)", U.style.fontWeight = "400");
        });
      };
      x.forEach(({ value: L, label: U, icon: X }) => {
        const G = document.createElement("button");
        G.setAttribute("type", "button"), G.setAttribute("data-align-value", L), G.setAttribute("title", `Align ${U.toLowerCase()}`), G.style.cssText = `
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
        `, G.innerHTML = `${X}<span>${U}</span>`, G.addEventListener("click", (Z) => {
          Z.preventDefault(), Z.stopPropagation();
          const te = typeof r == "function" ? r() : null;
          if (te != null)
            try {
              const { state: $, dispatch: z } = n.view, j = $.doc.nodeAt(te);
              if (j && j.type.name === "resizableImage") {
                const ee = $.tr.setNodeMarkup(te, void 0, {
                  ...j.attrs,
                  align: L
                });
                z(ee);
              }
            } catch {
              n.chain().focus().setNodeSelection(te).updateAttributes("resizableImage", {
                align: L
              }).run();
            }
          D(L);
        }), C.push(G), M.appendChild(G);
      }), m.appendChild(M);
      const k = () => {
        const L = o.attrs.align || "left";
        D(L);
      };
      let T = !1;
      u.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), T)
          m.style.display = "none", T = !1;
        else {
          const U = u.getBoundingClientRect(), X = 200, G = m.closest('[role="dialog"]');
          let Z = 0, te = 0;
          if (G) {
            const ve = G.getBoundingClientRect();
            Z = ve.left, te = ve.top;
          }
          let $ = U.bottom + 4 - te, z = U.right - X - Z;
          const j = window.innerHeight, ee = window.innerWidth, he = 200;
          U.bottom + 4 + he > j && ($ = U.top - he - 4 - te), z + Z < 8 && (z = 8 - Z), z + X + Z > ee - 8 && (z = ee - X - 8 - Z), m.style.top = `${$}px`, m.style.left = `${z}px`, m.style.display = "flex", T = !0, k();
        }
      });
      const E = (L) => {
        !m.contains(L.target) && !u.contains(L.target) && (m.style.display = "none", T = !1);
      };
      document.addEventListener("click", E);
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
      const R = s.closest('[role="dialog"]');
      R ? R.appendChild(m) : document.body.appendChild(m), s.addEventListener("mouseenter", () => {
        d.style.opacity = "1", u.style.opacity = "1", N.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        d.style.opacity = "0", N.style.opacity = "0", T || (u.style.opacity = "0");
      }), u.addEventListener("mouseenter", () => {
        u.style.background = "oklch(0.95 0 0)";
      }), u.addEventListener("mouseleave", () => {
        u.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const I = (L) => {
        L.preventDefault(), L.stopPropagation();
        const U = document.createElement("div");
        U.style.cssText = `
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
        const X = document.createElement("img");
        X.src = a.src, X.alt = a.alt || "", X.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const G = document.createElement("button");
        G.setAttribute("type", "button"), G.setAttribute("aria-label", "Close"), G.style.cssText = `
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
        `, G.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', G.addEventListener("mouseenter", () => {
          G.style.background = "rgba(255, 255, 255, 0.25)";
        }), G.addEventListener("mouseleave", () => {
          G.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const Z = o.attrs.alt;
        let te = null;
        Z && Z.trim() && (te = document.createElement("div"), te.style.cssText = `
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
          `, te.textContent = Z);
        const $ = () => {
          U.style.opacity = "0", X.style.transform = "scale(0.92)", setTimeout(() => U.remove(), 200);
        };
        U.addEventListener("click", (ee) => {
          ee.target === U && $();
        }), G.addEventListener("click", $);
        const z = (ee) => {
          ee.key === "Escape" && ($(), document.removeEventListener("keydown", z));
        };
        document.addEventListener("keydown", z), U.appendChild(X), U.appendChild(G), te && U.appendChild(te);
        const j = s.closest('[role="dialog"]');
        j ? j.appendChild(U) : document.body.appendChild(U), requestAnimationFrame(() => {
          U.style.opacity = "1", X.style.transform = "scale(1)";
        });
      };
      N.addEventListener("click", I);
      let O, H;
      const B = (L) => {
        L.preventDefault(), O = L.clientX, H = a.offsetWidth, document.addEventListener("mousemove", q), document.addEventListener("mouseup", P);
      }, q = (L) => {
        const U = L.clientX - O, X = Math.max(100, H + U);
        a.style.width = `${X}px`;
      }, P = () => {
        document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", P), setTimeout(() => {
        }, 100);
        const L = typeof r == "function" ? r() : null, U = a.offsetWidth;
        if (L != null)
          try {
            const { state: X, dispatch: G } = n.view, Z = X.doc.nodeAt(L);
            if (Z && Z.type.name === "resizableImage") {
              const te = X.tr.setNodeMarkup(L, void 0, {
                ...Z.attrs,
                width: U
              });
              G(te);
            }
          } catch {
            n.chain().focus().setNodeSelection(L).updateAttributes("resizableImage", {
              width: U
            }).run();
          }
      };
      return d.addEventListener("mousedown", B), {
        dom: s,
        update: (L) => L.type.name !== "resizableImage" ? !1 : (o = L, l(L.attrs.src), a.alt = L.attrs.alt || "", L.attrs.width && (a.style.width = `${L.attrs.width}px`), i(L.attrs.align || "left"), !0),
        destroy: () => {
          d.removeEventListener("mousedown", B), N.removeEventListener("click", I), document.removeEventListener("click", E), m.remove();
        }
      };
    };
  }
});
function Ym(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const jm = {}, fr = {};
function un(e, t) {
  try {
    const r = (jm[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in fr ? fr[r] : mi(r, r.split(":"));
  } catch {
    if (e in fr) return fr[e];
    const n = e?.match(Km);
    return n ? mi(e, n.slice(1)) : NaN;
  }
}
const Km = /([+-]\d\d):?(\d\d)?/;
function mi(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return fr[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class ht extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(un(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), zc(this), $s(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new ht(...n, t) : new ht(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new ht(+this, t);
  }
  getTimezoneOffset() {
    const t = -un(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), $s(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ht(+new Date(t), this.timeZone);
  }
  //#endregion
}
const pi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!pi.test(e)) return;
  const t = e.replace(pi, "$1UTC");
  ht.prototype[t] && (e.startsWith("get") ? ht.prototype[e] = function() {
    return this.internal[t]();
  } : (ht.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Vm(this), +this;
  }, ht.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), $s(this), +this;
  }));
});
function $s(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-un(e.timeZone, e) * 60));
}
function Vm(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), zc(e);
}
function zc(e) {
  const t = un(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const d = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, u = Math.round(-(un(e.timeZone, e) * 60)) % 60;
  (u || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + d));
  const m = un(e.timeZone, e), p = m > 0 ? Math.floor(m) : Math.ceil(m), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, b = g - c;
  if (y && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const v = un(e.timeZone, e), w = v > 0 ? Math.floor(v) : Math.ceil(v), M = p - w;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
  }
}
class Ye extends ht {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ye(...n, t) : new Ye(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Ym(this.timeZone, this)})`;
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
    return new Ye(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ye(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Bc = 6048e5, Gm = 864e5, hi = Symbol.for("constructDateFrom");
function Oe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && hi in e ? e[hi](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Se(e, t) {
  return Oe(t || e, e);
}
function Fc(e, t, n) {
  const r = Se(e, n?.in);
  return isNaN(t) ? Oe(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Uc(e, t, n) {
  const r = Se(e, n?.in);
  if (isNaN(t)) return Oe(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Oe(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const i = s.getDate();
  return o >= i ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let qm = {};
function Tr() {
  return qm;
}
function Fn(e, t) {
  const n = Tr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Se(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function vr(e, t) {
  return Fn(e, { ...t, weekStartsOn: 1 });
}
function Yc(e, t) {
  const n = Se(e, t?.in), r = n.getFullYear(), o = Oe(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = vr(o), i = Oe(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = vr(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function gi(e) {
  const t = Se(e), n = new Date(
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
function qn(e, ...t) {
  const n = Oe.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function br(e, t) {
  const n = Se(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function jc(e, t, n) {
  const [r, o] = qn(
    n?.in,
    e,
    t
  ), s = br(r), i = br(o), a = +s - gi(s), c = +i - gi(i);
  return Math.round((a - c) / Gm);
}
function Xm(e, t) {
  const n = Yc(e, t), r = Oe(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), vr(r);
}
function Zm(e, t, n) {
  return Fc(e, t * 7, n);
}
function Qm(e, t, n) {
  return Uc(e, t * 12, n);
}
function Jm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Oe.bind(null, o));
    const s = Se(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Oe(r, n || NaN);
}
function ep(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Oe.bind(null, o));
    const s = Se(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Oe(r, n || NaN);
}
function tp(e, t, n) {
  const [r, o] = qn(
    n?.in,
    e,
    t
  );
  return +br(r) == +br(o);
}
function Kc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function np(e) {
  return !(!Kc(e) && typeof e != "number" || isNaN(+Se(e)));
}
function rp(e, t, n) {
  const [r, o] = qn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function op(e, t) {
  const n = Se(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Vc(e, t) {
  const [n, r] = qn(e, t.start, t.end);
  return { start: n, end: r };
}
function sp(e, t) {
  const { start: n, end: r } = Vc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Oe(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function ap(e, t) {
  const n = Se(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function ip(e, t) {
  const n = Se(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Gc(e, t) {
  const n = Se(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function cp(e, t) {
  const { start: n, end: r } = Vc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Oe(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function qc(e, t) {
  const n = Tr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Se(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function lp(e, t) {
  return qc(e, { ...t, weekStartsOn: 1 });
}
const dp = {
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
}, up = (e, t, n) => {
  let r;
  const o = dp[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ds(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const fp = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, mp = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, pp = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, hp = {
  date: ds({
    formats: fp,
    defaultWidth: "full"
  }),
  time: ds({
    formats: mp,
    defaultWidth: "full"
  }),
  dateTime: ds({
    formats: pp,
    defaultWidth: "full"
  })
}, gp = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, yp = (e, t, n, r) => gp[e];
function cr(e) {
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
const vp = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, bp = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, wp = {
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
}, xp = {
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
}, kp = {
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
}, Cp = {
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
}, Mp = (e, t) => {
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
}, Sp = {
  ordinalNumber: Mp,
  era: cr({
    values: vp,
    defaultWidth: "wide"
  }),
  quarter: cr({
    values: bp,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: cr({
    values: wp,
    defaultWidth: "wide"
  }),
  day: cr({
    values: xp,
    defaultWidth: "wide"
  }),
  dayPeriod: cr({
    values: kp,
    defaultWidth: "wide",
    formattingValues: Cp,
    defaultFormattingWidth: "wide"
  })
};
function lr(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? Ep(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Tp(a, (u) => u.test(i))
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
function Tp(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Ep(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Dp(e) {
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
const Np = /^(\d+)(th|st|nd|rd)?/i, Rp = /\d+/i, Ap = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Lp = {
  any: [/^b/i, /^(a|c)/i]
}, Pp = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Ip = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Op = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, _p = {
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
}, $p = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Hp = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Wp = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, zp = {
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
}, Bp = {
  ordinalNumber: Dp({
    matchPattern: Np,
    parsePattern: Rp,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: lr({
    matchPatterns: Ap,
    defaultMatchWidth: "wide",
    parsePatterns: Lp,
    defaultParseWidth: "any"
  }),
  quarter: lr({
    matchPatterns: Pp,
    defaultMatchWidth: "wide",
    parsePatterns: Ip,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: lr({
    matchPatterns: Op,
    defaultMatchWidth: "wide",
    parsePatterns: _p,
    defaultParseWidth: "any"
  }),
  day: lr({
    matchPatterns: $p,
    defaultMatchWidth: "wide",
    parsePatterns: Hp,
    defaultParseWidth: "any"
  }),
  dayPeriod: lr({
    matchPatterns: Wp,
    defaultMatchWidth: "any",
    parsePatterns: zp,
    defaultParseWidth: "any"
  })
}, ka = {
  code: "en-US",
  formatDistance: up,
  formatLong: hp,
  formatRelative: yp,
  localize: Sp,
  match: Bp,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Fp(e, t) {
  const n = Se(e, t?.in);
  return jc(n, Gc(n)) + 1;
}
function Xc(e, t) {
  const n = Se(e, t?.in), r = +vr(n) - +Xm(n);
  return Math.round(r / Bc) + 1;
}
function Zc(e, t) {
  const n = Se(e, t?.in), r = n.getFullYear(), o = Tr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Oe(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = Fn(i, t), c = Oe(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = Fn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function Up(e, t) {
  const n = Tr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Zc(e, t), s = Oe(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Fn(s, t);
}
function Qc(e, t) {
  const n = Se(e, t?.in), r = +Fn(n, t) - +Up(n, t);
  return Math.round(r / Bc) + 1;
}
function ke(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const jt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return ke(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ke(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ke(e.getDate(), t.length);
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
    return ke(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ke(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ke(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ke(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return ke(o, t.length);
  }
}, Mn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, yi = {
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
    return jt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Zc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return ke(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : ke(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Yc(e);
    return ke(n, t.length);
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
    return ke(n, t.length);
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
        return ke(r, 2);
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
        return ke(r, 2);
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
        return jt.M(e, t);
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
        return ke(r + 1, 2);
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
    const o = Qc(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ke(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Xc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ke(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : jt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Fp(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : ke(r, t.length);
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
        return ke(s, 2);
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
        return ke(s, t.length);
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
        return ke(o, t.length);
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
    switch (r === 12 ? o = Mn.noon : r === 0 ? o = Mn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Mn.evening : r >= 12 ? o = Mn.afternoon : r >= 4 ? o = Mn.morning : o = Mn.night, t) {
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
    return jt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : jt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : ke(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : ke(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : jt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : jt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return jt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return bi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return cn(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return cn(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return bi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return cn(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return cn(r, ":");
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
        return "GMT" + vi(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + cn(r, ":");
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
        return "GMT" + vi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + cn(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return ke(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ke(+e, t.length);
  }
};
function vi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + ke(s, 2);
}
function bi(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ke(Math.abs(e) / 60, 2) : cn(e, t);
}
function cn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ke(Math.trunc(r / 60), 2), s = ke(r % 60, 2);
  return n + o + t + s;
}
const wi = (e, t) => {
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
}, Jc = (e, t) => {
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
}, Yp = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return wi(e, t);
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
  return s.replace("{{date}}", wi(r, t)).replace("{{time}}", Jc(o, t));
}, jp = {
  p: Jc,
  P: Yp
}, Kp = /^D+$/, Vp = /^Y+$/, Gp = ["D", "DD", "YY", "YYYY"];
function qp(e) {
  return Kp.test(e);
}
function Xp(e) {
  return Vp.test(e);
}
function Zp(e, t, n) {
  const r = Qp(e, t, n);
  if (console.warn(r), Gp.includes(e)) throw new RangeError(r);
}
function Qp(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Jp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, eh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, th = /^'([^]*?)'?$/, nh = /''/g, rh = /[a-zA-Z]/;
function oh(e, t, n) {
  const r = Tr(), o = n?.locale ?? r.locale ?? ka, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = Se(e, n?.in);
  if (!np(a))
    throw new RangeError("Invalid time value");
  let c = t.match(eh).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const m = jp[u];
      return m(d, o.formatLong);
    }
    return d;
  }).join("").match(Jp).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: sh(d) };
    if (yi[u])
      return { isToken: !0, value: d };
    if (u.match(rh))
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
    (!n?.useAdditionalWeekYearTokens && Xp(u) || !n?.useAdditionalDayOfYearTokens && qp(u)) && Zp(u, t, String(e));
    const m = yi[u[0]];
    return m(a, u, o.localize, l);
  }).join("");
}
function sh(e) {
  const t = e.match(th);
  return t ? t[1].replace(nh, "'") : e;
}
function ah(e, t) {
  const n = Se(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Oe(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function ih(e, t) {
  return Se(e, t?.in).getMonth();
}
function ch(e, t) {
  return Se(e, t?.in).getFullYear();
}
function lh(e, t) {
  return +Se(e) > +Se(t);
}
function dh(e, t) {
  return +Se(e) < +Se(t);
}
function uh(e, t, n) {
  const [r, o] = qn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function fh(e, t, n) {
  const [r, o] = qn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function mh(e, t, n) {
  const r = Se(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Oe(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = ah(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function ph(e, t, n) {
  const r = Se(e, n?.in);
  return isNaN(+r) ? Oe(e, NaN) : (r.setFullYear(t), r);
}
const xi = 5, hh = 4;
function gh(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, xi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? xi : hh;
}
function el(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function yh(e, t) {
  const n = el(e, t), r = gh(e, t);
  return t.addDays(n, r * 7 - 1);
}
class nt {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ye.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Ye(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Fc(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Uc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Zm(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : Qm(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : jc(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : rp(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : sp(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : cp(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : yh(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : lp(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : op(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : qc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : ip(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : oh(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Xc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : ih(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : ch(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Qc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : lh(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : dh(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Kc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : tp(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : uh(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : fh(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Jm(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : ep(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : mh(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : ph(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : el(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : br(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : vr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : ap(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Fn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Gc(r), this.options = { locale: ka, ...t }, this.overrides = n;
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
    return t && nt.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && nt.yearFirstLocales.has(s))
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
nt.yearFirstLocales = /* @__PURE__ */ new Set([
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
const bt = new nt();
class tl {
  constructor(t, n, r = bt) {
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
class vh {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class bh {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function wh(e) {
  return Q.createElement("button", { ...e });
}
function xh(e) {
  return Q.createElement("span", { ...e });
}
function kh(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    Q.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && Q.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && Q.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && Q.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && Q.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Ch(e) {
  const { day: t, modifiers: n, ...r } = e;
  return Q.createElement("td", { ...r });
}
function Mh(e) {
  const { day: t, modifiers: n, ...r } = e, o = Q.useRef(null);
  return Q.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), Q.createElement("button", { ref: o, ...r });
}
var oe;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(oe || (oe = {}));
var Ne;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Ne || (Ne = {}));
var ct;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(ct || (ct = {}));
var Je;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Je || (Je = {}));
function Sh(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[oe.Dropdown], n].join(" "), a = t?.find(({ value: c }) => c === s.value);
  return Q.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[oe.DropdownRoot] },
    Q.createElement(r.Select, { className: i, ...s }, t?.map(({ value: c, label: l, disabled: d }) => Q.createElement(r.Option, { key: c, value: c, disabled: d }, l))),
    Q.createElement(
      "span",
      { className: o[oe.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      Q.createElement(r.Chevron, { orientation: "down", size: 18, className: o[oe.Chevron] })
    )
  );
}
function Th(e) {
  return Q.createElement("div", { ...e });
}
function Eh(e) {
  return Q.createElement("div", { ...e });
}
function Dh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return Q.createElement("div", { ...r }, e.children);
}
function Nh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return Q.createElement("div", { ...r });
}
function Rh(e) {
  return Q.createElement("table", { ...e });
}
function Ah(e) {
  return Q.createElement("div", { ...e });
}
const nl = vc(void 0);
function Er() {
  const e = bc(nl);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Lh(e) {
  const { components: t } = Er();
  return Q.createElement(t.Dropdown, { ...e });
}
function Ph(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = Er(), d = Y((m) => {
    o && n?.(m);
  }, [o, n]), u = Y((m) => {
    r && t?.(m);
  }, [r, t]);
  return Q.createElement(
    "nav",
    { ...s },
    Q.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[oe.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      Q.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[oe.Chevron], orientation: "left" })
    ),
    Q.createElement(
      i.NextMonthButton,
      { type: "button", className: a[oe.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      Q.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[oe.Chevron] })
    )
  );
}
function Ih(e) {
  const { components: t } = Er();
  return Q.createElement(t.Button, { ...e });
}
function Oh(e) {
  return Q.createElement("option", { ...e });
}
function _h(e) {
  const { components: t } = Er();
  return Q.createElement(t.Button, { ...e });
}
function $h(e) {
  const { rootRef: t, ...n } = e;
  return Q.createElement("div", { ...n, ref: t });
}
function Hh(e) {
  return Q.createElement("select", { ...e });
}
function Wh(e) {
  const { week: t, ...n } = e;
  return Q.createElement("tr", { ...n });
}
function zh(e) {
  return Q.createElement("th", { ...e });
}
function Bh(e) {
  return Q.createElement(
    "thead",
    { "aria-hidden": !0 },
    Q.createElement("tr", { ...e })
  );
}
function Fh(e) {
  const { week: t, ...n } = e;
  return Q.createElement("th", { ...n });
}
function Uh(e) {
  return Q.createElement("th", { ...e });
}
function Yh(e) {
  return Q.createElement("tbody", { ...e });
}
function jh(e) {
  const { components: t } = Er();
  return Q.createElement(t.Dropdown, { ...e });
}
const Kh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: wh,
  CaptionLabel: xh,
  Chevron: kh,
  Day: Ch,
  DayButton: Mh,
  Dropdown: Sh,
  DropdownNav: Th,
  Footer: Eh,
  Month: Dh,
  MonthCaption: Nh,
  MonthGrid: Rh,
  Months: Ah,
  MonthsDropdown: Lh,
  Nav: Ph,
  NextMonthButton: Ih,
  Option: Oh,
  PreviousMonthButton: _h,
  Root: $h,
  Select: Hh,
  Week: Wh,
  WeekNumber: Fh,
  WeekNumberHeader: Uh,
  Weekday: zh,
  Weekdays: Bh,
  Weeks: Yh,
  YearsDropdown: jh
}, Symbol.toStringTag, { value: "Module" }));
function Rt(e, t, n = !1, r = bt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function rl(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ca(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function ol(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function sl(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function al(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function il(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function At(e, t, n = bt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (il(a, n))
      return a.includes(e);
    if (Ca(a))
      return Rt(a, e, !1, n);
    if (al(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (rl(a)) {
      const c = s(a.before, e), l = s(a.after, e), d = c > 0, u = l < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return ol(a) ? s(e, a.after) > 0 : sl(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function Vh(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: d } = t, { isSameDay: u, isSameMonth: m, startOfMonth: p, isBefore: h, endOfMonth: g, isAfter: y } = o, b = n && p(n), v = r && g(r), w = {
    [Ne.focused]: [],
    [Ne.outside]: [],
    [Ne.disabled]: [],
    [Ne.hidden]: [],
    [Ne.today]: []
  }, M = {};
  for (const x of e) {
    const { date: C, displayMonth: D } = x, k = !!(D && !m(C, D)), T = !!(b && h(C, b)), E = !!(v && y(C, v)), N = !!(s && At(C, s, o)), R = !!(i && At(C, i, o)) || T || E || // Broadcast calendar will show outside days as default
    !l && !c && k || l && c === !1 && k, I = u(C, d ?? o.today());
    k && w.outside.push(x), N && w.disabled.push(x), R && w.hidden.push(x), I && w.today.push(x), a && Object.keys(a).forEach((O) => {
      const H = a?.[O];
      H && At(C, H, o) && (M[O] ? M[O].push(x) : M[O] = [x]);
    });
  }
  return (x) => {
    const C = {
      [Ne.focused]: !1,
      [Ne.disabled]: !1,
      [Ne.hidden]: !1,
      [Ne.outside]: !1,
      [Ne.today]: !1
    }, D = {};
    for (const k in w) {
      const T = w[k];
      C[k] = T.some((E) => E === x);
    }
    for (const k in M)
      D[k] = M[k].some((T) => T === x);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function Gh(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[Ne[s]] ? o.push(t[Ne[s]]) : t[ct[s]] && o.push(t[ct[s]]), o), [t[oe.Day]]);
}
function qh(e) {
  return {
    ...Kh,
    ...e
  };
}
function Xh(e) {
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
  for (const t in oe)
    e[oe[t]] = `rdp-${oe[t]}`;
  for (const t in Ne)
    e[Ne[t]] = `rdp-${Ne[t]}`;
  for (const t in ct)
    e[ct[t]] = `rdp-${ct[t]}`;
  for (const t in Je)
    e[Je[t]] = `rdp-${Je[t]}`;
  return e;
}
function cl(e, t, n) {
  return (n ?? new nt(t)).formatMonthYear(e);
}
const Zh = cl;
function Qh(e, t, n) {
  return (n ?? new nt(t)).format(e, "d");
}
function Jh(e, t = bt) {
  return t.format(e, "LLLL");
}
function eg(e, t, n) {
  return (n ?? new nt(t)).format(e, "cccccc");
}
function tg(e, t = bt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function ng() {
  return "";
}
function ll(e, t = bt) {
  return t.format(e, "yyyy");
}
const rg = ll, og = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: cl,
  formatDay: Qh,
  formatMonthCaption: Zh,
  formatMonthDropdown: Jh,
  formatWeekNumber: tg,
  formatWeekNumberHeader: ng,
  formatWeekdayName: eg,
  formatYearCaption: rg,
  formatYearDropdown: ll
}, Symbol.toStringTag, { value: "Module" }));
function sg(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...og,
    ...e
  };
}
function ag(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((m) => {
    const p = r.formatMonthDropdown(m, o), h = l(m), g = t && m < s(t) || n && m > s(n) || !1;
    return { value: h, label: p, disabled: g };
  });
}
function ig(e, t = {}, n = {}) {
  let r = { ...t?.[oe.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function cg(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function lg(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: i, eachYearOfInterval: a, getYear: c } = r, l = s(e), d = i(t), u = a({ start: l, end: d });
  return o && u.reverse(), u.map((m) => {
    const p = n.formatYearDropdown(m, r);
    return {
      value: c(m),
      label: p,
      disabled: !1
    };
  });
}
function dl(e, t, n, r) {
  let o = (r ?? new nt(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const dg = dl;
function ul(e, t, n) {
  return (n ?? new nt(t)).formatMonthYear(e);
}
const ug = ul;
function fg(e, t, n, r) {
  let o = (r ?? new nt(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function mg(e) {
  return "Choose the Month";
}
function pg() {
  return "";
}
function hg(e) {
  return "Go to the Next Month";
}
function gg(e) {
  return "Go to the Previous Month";
}
function yg(e, t, n) {
  return (n ?? new nt(t)).format(e, "cccc");
}
function vg(e, t) {
  return `Week ${e}`;
}
function bg(e) {
  return "Week Number";
}
function wg(e) {
  return "Choose the Year";
}
const xg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ug,
  labelDay: dg,
  labelDayButton: dl,
  labelGrid: ul,
  labelGridcell: fg,
  labelMonthDropdown: mg,
  labelNav: pg,
  labelNext: hg,
  labelPrevious: gg,
  labelWeekNumber: vg,
  labelWeekNumberHeader: bg,
  labelWeekday: yg,
  labelYearDropdown: wg
}, Symbol.toStringTag, { value: "Module" })), Dr = (e) => e instanceof HTMLElement ? e : null, us = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], kg = (e) => Dr(e.querySelector("[data-animated-month]")), fs = (e) => Dr(e.querySelector("[data-animated-caption]")), ms = (e) => Dr(e.querySelector("[data-animated-weeks]")), Cg = (e) => Dr(e.querySelector("[data-animated-nav]")), Mg = (e) => Dr(e.querySelector("[data-animated-weekdays]"));
function Sg(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = V(null), a = V(r), c = V(!1);
  Do(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const d = s.isSameMonth(r[0].date, l[0].date), u = s.isAfter(r[0].date, l[0].date), m = u ? n[Je.caption_after_enter] : n[Je.caption_before_enter], p = u ? n[Je.weeks_after_enter] : n[Je.weeks_before_enter], h = i.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (us(g).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const M = kg(w);
      M && w.contains(M) && w.removeChild(M);
      const x = fs(w);
      x && x.classList.remove(m);
      const C = ms(w);
      C && C.classList.remove(p);
    }), i.current = g) : i.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = h instanceof HTMLElement ? us(h) : [], b = us(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && y && y.every((v) => v instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const v = Cg(e.current);
      v && (v.style.zIndex = "1"), b.forEach((w, M) => {
        const x = y[M];
        if (!x)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const C = fs(w);
        C && C.classList.add(m);
        const D = ms(w);
        D && D.classList.add(p);
        const k = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), C && C.classList.remove(m), D && D.classList.remove(p), w.style.position = "", w.style.overflow = "", w.contains(x) && w.removeChild(x);
        };
        x.style.pointerEvents = "none", x.style.position = "absolute", x.style.overflow = "hidden", x.setAttribute("aria-hidden", "true");
        const T = Mg(x);
        T && (T.style.opacity = "0");
        const E = fs(x);
        E && (E.classList.add(u ? n[Je.caption_before_exit] : n[Je.caption_after_exit]), E.addEventListener("animationend", k));
        const N = ms(x);
        N && N.classList.add(u ? n[Je.weeks_before_exit] : n[Je.weeks_after_exit]), w.insertBefore(x, w.firstChild);
      });
    }
  });
}
function Tg(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: m, endOfISOWeek: p, endOfMonth: h, endOfWeek: g, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: w } = r, M = c ? b(o, r) : i ? v(o) : w(o), x = c ? m(s) : i ? p(h(s)) : g(h(s)), C = d(x, M), D = u(s, o) + 1, k = [];
  for (let N = 0; N <= C; N++) {
    const R = l(M, N);
    if (t && y(R, t))
      break;
    k.push(R);
  }
  const E = (c ? 35 : 42) * D;
  if (a && k.length < E) {
    const N = E - k.length;
    for (let R = 0; R < N; R++) {
      const I = l(k[k.length - 1], 1);
      k.push(I);
    }
  }
  return k;
}
function Eg(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Dg(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function ki(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: d, startOfMonth: u } = r;
  if (n && l(n, c) < a - 1) {
    const m = -1 * (a - 1);
    c = d(n, m);
  }
  return t && l(c, t) < 0 && (c = t), u(c);
}
function Ng(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: m, startOfWeek: p } = r, h = e.reduce((g, y) => {
    const b = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? m(y) : p(y), v = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), w = t.filter((D) => D >= b && D <= v), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < M) {
      const D = t.filter((k) => {
        const T = M - w.length;
        return k > v && k <= o(v, T);
      });
      w.push(...D);
    }
    const x = w.reduce((D, k) => {
      const T = n.ISOWeek ? l(k) : d(k), E = D.find((R) => R.weekNumber === T), N = new tl(k, y, r);
      return E ? E.days.push(N) : D.push(new bh(T, [N])), D;
    }, []), C = new vh(y, x);
    return g.push(C), g;
  }, []);
  return n.reverseMonths ? h.reverse() : h;
}
function Rg(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: d, today: u } = t, { fromYear: m, toYear: p, fromMonth: h, toMonth: g } = e;
  !n && h && (n = h), !n && m && (n = t.newDate(m, 0, 1)), !r && g && (r = g), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : m ? n = d(m, 0, 1) : !n && y && (n = o(c(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = l(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function Ag(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, d = i(e);
  if (!t)
    return a(d, l);
  if (!(c(t, e) < s))
    return a(d, l);
}
function Lg(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -l);
  if (!(c(d, t) <= 0))
    return a(d, -l);
}
function Pg(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Lo(e, t) {
  const [n, r] = K(e);
  return [t === void 0 ? n : t, r];
}
function Ig(e, t) {
  const [n, r] = Rg(e, t), { startOfMonth: o, endOfMonth: s } = t, i = ki(e, n, r, t), [a, c] = Lo(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  J(() => {
    const C = ki(e, n, r, t);
    c(C);
  }, [e.timeZone]);
  const l = Dg(a, r, e, t), d = Tg(l, e.endMonth ? s(e.endMonth) : void 0, e, t), u = Ng(l, d, e, t), m = Pg(u), p = Eg(u), h = Lg(a, n, e, t), g = Ag(a, r, e, t), { disableNavigation: y, onMonthChange: b } = e, v = (C) => m.some((D) => D.days.some((k) => k.isEqualTo(C))), w = (C) => {
    if (y)
      return;
    let D = o(C);
    n && D < o(n) && (D = o(n)), r && D > o(r) && (D = o(r)), c(D), b?.(D);
  };
  return {
    months: u,
    weeks: m,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: h,
    nextMonth: g,
    goToMonth: w,
    goToDay: (C) => {
      v(C) || w(C.date);
    }
  };
}
var mt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(mt || (mt = {}));
function Ci(e) {
  return !e[Ne.disabled] && !e[Ne.hidden] && !e[Ne.outside];
}
function Og(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    Ci(a) && (a[Ne.focused] && s < mt.FocusedModifier ? (o = i, s = mt.FocusedModifier) : r?.isEqualTo(i) && s < mt.LastFocused ? (o = i, s = mt.LastFocused) : n(i.date) && s < mt.Selected ? (o = i, s = mt.Selected) : a[Ne.today] && s < mt.Today && (o = i, s = mt.Today));
  }
  return o || (o = e.find((i) => Ci(t(i)))), o;
}
function _g(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: d, addWeeks: u, addYears: m, endOfBroadcastWeek: p, endOfISOWeek: h, endOfWeek: g, max: y, min: b, startOfBroadcastWeek: v, startOfISOWeek: w, startOfWeek: M } = i;
  let C = {
    day: l,
    week: u,
    month: d,
    year: m,
    startOfWeek: (D) => c ? v(D, i) : a ? w(D) : M(D),
    endOfWeek: (D) => c ? p(D) : a ? h(D) : g(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = y([r, C]) : t === "after" && o && (C = b([o, C])), C;
}
function fl(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = _g(e, t, n.date, r, o, s, i), l = !!(s.disabled && At(c, s.disabled, i)), d = !!(s.hidden && At(c, s.hidden, i)), u = c, m = new tl(c, u, i);
  return !l && !d ? m : fl(e, t, m, r, o, s, i, a + 1);
}
function $g(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = K(), c = Og(t.days, n, r || (() => !1), i), [l, d] = K(s ? c : void 0);
  return {
    isFocusTarget: (g) => !!c?.isEqualTo(g),
    setFocused: d,
    focused: l,
    blur: () => {
      a(l), d(void 0);
    },
    moveFocus: (g, y) => {
      if (!l)
        return;
      const b = fl(g, y, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(b)) || (t.goToDay(b), d(b)));
    }
  };
}
function Hg(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Lo(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((h) => c(h, p)) ?? !1, { min: d, max: u } = e;
  return {
    selected: a,
    select: (p, h, g) => {
      let y = [...a ?? []];
      if (l(p)) {
        if (a?.length === d || r && a?.length === 1)
          return;
        y = a?.filter((b) => !c(b, p));
      } else
        a?.length === u ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, h, g), y;
    },
    isSelected: l
  };
}
function Wg(e, t, n = 0, r = 0, o = !1, s = bt) {
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
    const m = s.differenceInCalendarDays(u.to, u.from);
    r > 0 && m > r ? u = { from: e, to: void 0 } : n > 1 && m < n && (u = { from: e, to: void 0 });
  }
  return u;
}
function zg(e, t, n = bt) {
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
function Mi(e, t, n = bt) {
  return Rt(e, t.from, !1, n) || Rt(e, t.to, !1, n) || Rt(t, e.from, !1, n) || Rt(t, e.to, !1, n);
}
function Bg(e, t, n = bt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? Rt(e, a, !1, n) : il(a, n) ? a.some((c) => Rt(e, c, !1, n)) : Ca(a) ? a.from && a.to ? Mi(e, { from: a.from, to: a.to }, n) : !1 : al(a) ? zg(e, a.dayOfWeek, n) : rl(a) ? n.isAfter(a.before, a.after) ? Mi(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : At(e.from, a, n) || At(e.to, a, n) : ol(a) || sl(a) ? At(e.from, a, n) || At(e.to, a, n) : !1))
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
function Fg(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = Lo(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (m, p, h) => {
      const { min: g, max: y } = e, b = m ? Wg(m, l, g, y, s, t) : void 0;
      return r && n && b?.from && b.to && Bg({ from: b.from, to: b.to }, n, t) && (b.from = m, b.to = void 0), i || c(b), i?.(b, m, p, h), b;
    },
    isSelected: (m) => l && Rt(l, m, !1, t)
  };
}
function Ug(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Lo(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (u, m, p) => {
      let h = u;
      return !r && a && a && c(u, a) && (h = void 0), o || i(h), o?.(h, u, m, p), h;
    },
    isSelected: (u) => a ? c(a, u) : !1
  };
}
function Yg(e, t) {
  const n = Ug(e, t), r = Hg(e, t), o = Fg(e, t);
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
function jg(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ye(t.today, t.timeZone)), t.month && (t.month = new Ye(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ye(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ye(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ye(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ye(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((me) => new Ye(me, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ye(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ye(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Ln(() => {
    const me = { ...ka, ...t.locale };
    return {
      dateLib: new nt({
        locale: me,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: qh(t.components),
      formatters: sg(t.formatters),
      labels: { ...xg, ...t.labels },
      locale: me,
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
  ]), { captionLayout: c, mode: l, navLayout: d, numberOfMonths: u = 1, onDayBlur: m, onDayClick: p, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: v, onPrevClick: w, showWeekNumber: M, styles: x } = t, { formatCaption: C, formatDay: D, formatMonthDropdown: k, formatWeekNumber: T, formatWeekNumberHeader: E, formatWeekdayName: N, formatYearDropdown: R } = r, I = Ig(t, s), { days: O, months: H, navStart: B, navEnd: q, previousMonth: P, nextMonth: L, goToMonth: U } = I, X = Vh(O, t, B, q, s), { isSelected: G, select: Z, selected: te } = Yg(t, s) ?? {}, { blur: $, focused: z, isFocusTarget: j, moveFocus: ee, setFocused: he } = $g(t, I, X, G ?? (() => !1), s), { labelDayButton: ve, labelGridcell: Re, labelGrid: We, labelMonthDropdown: rt, labelNav: Ht, labelPrevious: tr, labelNext: nr, labelWeekday: Ir, labelWeekNumber: Or, labelWeekNumberHeader: _r, labelYearDropdown: $r } = o, vn = Ln(() => cg(s, t.ISOWeek), [s, t.ISOWeek]), rr = l !== void 0 || p !== void 0, bn = Y(() => {
    P && (U(P), w?.(P));
  }, [P, U, w]), wn = Y(() => {
    L && (U(L), v?.(L));
  }, [U, L, v]), Hr = Y((me, be) => (ae) => {
    ae.preventDefault(), ae.stopPropagation(), he(me), Z?.(me.date, be, ae), p?.(me.date, be, ae);
  }, [Z, p, he]), Ko = Y((me, be) => (ae) => {
    he(me), h?.(me.date, be, ae);
  }, [h, he]), Vo = Y((me, be) => (ae) => {
    $(), m?.(me.date, be, ae);
  }, [$, m]), Go = Y((me, be) => (ae) => {
    const Ce = {
      ArrowLeft: [
        ae.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        ae.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [ae.shiftKey ? "year" : "week", "after"],
      ArrowUp: [ae.shiftKey ? "year" : "week", "before"],
      PageUp: [ae.shiftKey ? "year" : "month", "before"],
      PageDown: [ae.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (Ce[ae.key]) {
      ae.preventDefault(), ae.stopPropagation();
      const [Ue, ge] = Ce[ae.key];
      ee(Ue, ge);
    }
    g?.(me.date, be, ae);
  }, [ee, g, t.dir]), qo = Y((me, be) => (ae) => {
    y?.(me.date, be, ae);
  }, [y]), Wr = Y((me, be) => (ae) => {
    b?.(me.date, be, ae);
  }, [b]), zr = Y((me) => (be) => {
    const ae = Number(be.target.value), Ce = s.setMonth(s.startOfMonth(me), ae);
    U(Ce);
  }, [s, U]), Xo = Y((me) => (be) => {
    const ae = Number(be.target.value), Ce = s.setYear(s.startOfMonth(me), ae);
    U(Ce);
  }, [s, U]), { className: Br, style: Zo } = Ln(() => ({
    className: [a[oe.Root], t.className].filter(Boolean).join(" "),
    style: { ...x?.[oe.Root], ...t.style }
  }), [a, t.className, t.style, x]), xt = Xh(t), en = V(null);
  Sg(en, !!t.animate, {
    classNames: a,
    months: H,
    focused: z,
    dateLib: s
  });
  const xn = {
    dayPickerProps: t,
    selected: te,
    select: Z,
    isSelected: G,
    months: H,
    nextMonth: L,
    previousMonth: P,
    goToMonth: U,
    getModifiers: X,
    components: n,
    classNames: a,
    styles: x,
    labels: o,
    formatters: r
  };
  return Q.createElement(
    nl.Provider,
    { value: xn },
    Q.createElement(
      n.Root,
      { rootRef: t.animate ? en : void 0, className: Br, style: Zo, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...xt },
      Q.createElement(
        n.Months,
        { className: a[oe.Months], style: x?.[oe.Months] },
        !t.hideNavigation && !d && Q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: x?.[oe.Nav], "aria-label": Ht(), onPreviousClick: bn, onNextClick: wn, previousMonth: P, nextMonth: L }),
        H.map((me, be) => Q.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[oe.Month],
            style: x?.[oe.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: be,
            displayIndex: be,
            calendarMonth: me
          },
          d === "around" && !t.hideNavigation && be === 0 && Q.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[oe.PreviousMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": tr(P), onClick: bn, "data-animated-button": t.animate ? "true" : void 0 },
            Q.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          Q.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[oe.MonthCaption], style: x?.[oe.MonthCaption], calendarMonth: me, displayIndex: be }, c?.startsWith("dropdown") ? Q.createElement(
            n.DropdownNav,
            { className: a[oe.Dropdowns], style: x?.[oe.Dropdowns] },
            (() => {
              const ae = c === "dropdown" || c === "dropdown-months" ? Q.createElement(n.MonthsDropdown, { key: "month", className: a[oe.MonthsDropdown], "aria-label": rt(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: zr(me.date), options: ag(me.date, B, q, r, s), style: x?.[oe.Dropdown], value: s.getMonth(me.date) }) : Q.createElement("span", { key: "month" }, k(me.date, s)), Ce = c === "dropdown" || c === "dropdown-years" ? Q.createElement(n.YearsDropdown, { key: "year", className: a[oe.YearsDropdown], "aria-label": $r(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Xo(me.date), options: lg(B, q, r, s, !!t.reverseYears), style: x?.[oe.Dropdown], value: s.getYear(me.date) }) : Q.createElement("span", { key: "year" }, R(me.date, s));
              return s.getMonthYearOrder() === "year-first" ? [Ce, ae] : [ae, Ce];
            })(),
            Q.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, C(me.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            Q.createElement(n.CaptionLabel, { className: a[oe.CaptionLabel], role: "status", "aria-live": "polite" }, C(me.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && be === u - 1 && Q.createElement(
            n.NextMonthButton,
            { type: "button", className: a[oe.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": nr(L), onClick: wn, "data-animated-button": t.animate ? "true" : void 0 },
            Q.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          be === u - 1 && d === "after" && !t.hideNavigation && Q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: x?.[oe.Nav], "aria-label": Ht(), onPreviousClick: bn, onNextClick: wn, previousMonth: P, nextMonth: L }),
          Q.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": We(me.date, s.options, s) || void 0, className: a[oe.MonthGrid], style: x?.[oe.MonthGrid] },
            !t.hideWeekdays && Q.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[oe.Weekdays], style: x?.[oe.Weekdays] },
              M && Q.createElement(n.WeekNumberHeader, { "aria-label": _r(s.options), className: a[oe.WeekNumberHeader], style: x?.[oe.WeekNumberHeader], scope: "col" }, E()),
              vn.map((ae) => Q.createElement(n.Weekday, { "aria-label": Ir(ae, s.options, s), className: a[oe.Weekday], key: String(ae), style: x?.[oe.Weekday], scope: "col" }, N(ae, s.options, s)))
            ),
            Q.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[oe.Weeks], style: x?.[oe.Weeks] }, me.weeks.map((ae) => Q.createElement(
              n.Week,
              { className: a[oe.Week], key: ae.weekNumber, style: x?.[oe.Week], week: ae },
              M && // biome-ignore lint/a11y/useSemanticElements: react component
              Q.createElement(n.WeekNumber, { week: ae, style: x?.[oe.WeekNumber], "aria-label": Or(ae.weekNumber, {
                locale: i
              }), className: a[oe.WeekNumber], scope: "row", role: "rowheader" }, T(ae.weekNumber, s)),
              ae.days.map((Ce) => {
                const { date: Ue } = Ce, ge = X(Ce);
                if (ge[Ne.focused] = !ge.hidden && !!z?.isEqualTo(Ce), ge[ct.selected] = G?.(Ue) || ge.selected, Ca(te)) {
                  const { from: or, to: kn } = te;
                  ge[ct.range_start] = !!(or && kn && s.isSameDay(Ue, or)), ge[ct.range_end] = !!(or && kn && s.isSameDay(Ue, kn)), ge[ct.range_middle] = Rt(te, Ue, !0, s);
                }
                const qe = ig(ge, x, t.modifiersStyles), kt = Gh(ge, a, t.modifiersClassNames), tn = !rr && !ge.hidden ? Re(Ue, ge, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  Q.createElement(n.Day, { key: `${s.format(Ue, "yyyy-MM-dd")}_${s.format(Ce.displayMonth, "yyyy-MM")}`, day: Ce, modifiers: ge, className: kt.join(" "), style: qe, role: "gridcell", "aria-selected": ge.selected || void 0, "aria-label": tn, "data-day": s.format(Ue, "yyyy-MM-dd"), "data-month": Ce.outside ? s.format(Ue, "yyyy-MM") : void 0, "data-selected": ge.selected || void 0, "data-disabled": ge.disabled || void 0, "data-hidden": ge.hidden || void 0, "data-outside": Ce.outside || void 0, "data-focused": ge.focused || void 0, "data-today": ge.today || void 0 }, !ge.hidden && rr ? Q.createElement(n.DayButton, { className: a[oe.DayButton], style: x?.[oe.DayButton], type: "button", day: Ce, modifiers: ge, disabled: ge.disabled || void 0, tabIndex: j(Ce) ? 0 : -1, "aria-label": ve(Ue, ge, s.options, s), onClick: Hr(Ce, ge), onBlur: Vo(Ce, ge), onFocus: Ko(Ce, ge), onKeyDown: Go(Ce, ge), onMouseEnter: qo(Ce, ge), onMouseLeave: Wr(Ce, ge) }, D(Ue, s.options, s)) : !ge.hidden && D(Ce.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      Q.createElement(n.Footer, { className: a[oe.Footer], style: x?.[oe.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function ml(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ml(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function pl() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ml(e)) && (r && (r += " "), r += t);
  return r;
}
const Sa = "-", Kg = (e) => {
  const t = Gg(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(Sa);
      return a[0] === "" && a.length !== 1 && a.shift(), hl(a, t) || Vg(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, hl = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? hl(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Sa);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Si = /^\[(.+)\]$/, Vg = (e) => {
  if (Si.test(e)) {
    const t = Si.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Gg = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Hs(n[o], r, o, t);
  return r;
}, Hs = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Ti(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (qg(o)) {
        Hs(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Hs(i, Ti(t, s), n, r);
    });
  });
}, Ti = (e, t) => {
  let n = e;
  return t.split(Sa).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, qg = (e) => e.isThemeGetter, Xg = (e) => {
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
}, Ws = "!", zs = ":", Zg = zs.length, Qg = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let i = 0, a = 0, c = 0, l;
    for (let h = 0; h < o.length; h++) {
      let g = o[h];
      if (i === 0 && a === 0) {
        if (g === zs) {
          s.push(o.slice(c, h)), c = h + Zg;
          continue;
        }
        if (g === "/") {
          l = h;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? a++ : g === ")" && a--;
    }
    const d = s.length === 0 ? o : o.substring(c), u = Jg(d), m = u !== d, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: m,
      baseClassName: u,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + zs, s = r;
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
}, Jg = (e) => e.endsWith(Ws) ? e.substring(0, e.length - 1) : e.startsWith(Ws) ? e.substring(1) : e, ey = (e) => {
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
}, ty = (e) => ({
  cache: Xg(e.cacheSize),
  parseClassName: Qg(e),
  sortModifiers: ey(e),
  ...Kg(e)
}), ny = /\s+/, ry = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(ny);
  let c = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const d = a[l], {
      isExternal: u,
      modifiers: m,
      hasImportantModifier: p,
      baseClassName: h,
      maybePostfixModifierPosition: g
    } = n(d);
    if (u) {
      c = d + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!g, b = r(y ? h.substring(0, g) : h);
    if (!b) {
      if (!y) {
        c = d + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (b = r(h), !b) {
        c = d + (c.length > 0 ? " " + c : c);
        continue;
      }
      y = !1;
    }
    const v = s(m).join(":"), w = p ? v + Ws : v, M = w + b;
    if (i.includes(M))
      continue;
    i.push(M);
    const x = o(b, y);
    for (let C = 0; C < x.length; ++C) {
      const D = x[C];
      i.push(w + D);
    }
    c = d + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function oy() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = gl(t)) && (r && (r += " "), r += n);
  return r;
}
const gl = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = gl(e[r])) && (n && (n += " "), n += t);
  return n;
};
function sy(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((d, u) => u(d), e());
    return n = ty(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const d = ry(c, n);
    return o(c, d), d;
  }
  return function() {
    return s(oy.apply(null, arguments));
  };
}
const _e = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, yl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, vl = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ay = /^\d+\/\d+$/, iy = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, cy = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ly = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, dy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, uy = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Sn = (e) => ay.test(e), pe = (e) => !!e && !Number.isNaN(Number(e)), Kt = (e) => !!e && Number.isInteger(Number(e)), ps = (e) => e.endsWith("%") && pe(e.slice(0, -1)), Et = (e) => iy.test(e), fy = () => !0, my = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  cy.test(e) && !ly.test(e)
), bl = () => !1, py = (e) => dy.test(e), hy = (e) => uy.test(e), gy = (e) => !ne(e) && !re(e), yy = (e) => Xn(e, kl, bl), ne = (e) => yl.test(e), an = (e) => Xn(e, Cl, my), hs = (e) => Xn(e, ky, pe), Ei = (e) => Xn(e, wl, bl), vy = (e) => Xn(e, xl, hy), qr = (e) => Xn(e, Ml, py), re = (e) => vl.test(e), dr = (e) => Zn(e, Cl), by = (e) => Zn(e, Cy), Di = (e) => Zn(e, wl), wy = (e) => Zn(e, kl), xy = (e) => Zn(e, xl), Xr = (e) => Zn(e, Ml, !0), Xn = (e, t, n) => {
  const r = yl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Zn = (e, t, n = !1) => {
  const r = vl.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, wl = (e) => e === "position" || e === "percentage", xl = (e) => e === "image" || e === "url", kl = (e) => e === "length" || e === "size" || e === "bg-size", Cl = (e) => e === "length", ky = (e) => e === "number", Cy = (e) => e === "family-name", Ml = (e) => e === "shadow", My = () => {
  const e = _e("color"), t = _e("font"), n = _e("text"), r = _e("font-weight"), o = _e("tracking"), s = _e("leading"), i = _e("breakpoint"), a = _e("container"), c = _e("spacing"), l = _e("radius"), d = _e("shadow"), u = _e("inset-shadow"), m = _e("text-shadow"), p = _e("drop-shadow"), h = _e("blur"), g = _e("perspective"), y = _e("aspect"), b = _e("ease"), v = _e("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], M = () => [
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
  ], x = () => [...M(), re, ne], C = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], k = () => [re, ne, c], T = () => [Sn, "full", "auto", ...k()], E = () => [Kt, "none", "subgrid", re, ne], N = () => ["auto", {
    span: ["full", Kt, re, ne]
  }, Kt, re, ne], R = () => [Kt, "auto", re, ne], I = () => ["auto", "min", "max", "fr", re, ne], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], B = () => ["auto", ...k()], q = () => [Sn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], P = () => [e, re, ne], L = () => [...M(), Di, Ei, {
    position: [re, ne]
  }], U = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], X = () => ["auto", "cover", "contain", wy, yy, {
    size: [re, ne]
  }], G = () => [ps, dr, an], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    re,
    ne
  ], te = () => ["", pe, dr, an], $ = () => ["solid", "dashed", "dotted", "double"], z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => [pe, ps, Di, Ei], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    re,
    ne
  ], he = () => ["none", pe, re, ne], ve = () => ["none", pe, re, ne], Re = () => [pe, re, ne], We = () => [Sn, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Et],
      breakpoint: [Et],
      color: [fy],
      container: [Et],
      "drop-shadow": [Et],
      ease: ["in", "out", "in-out"],
      font: [gy],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Et],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Et],
      shadow: [Et],
      spacing: ["px", pe],
      text: [Et],
      "text-shadow": [Et],
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
        aspect: ["auto", "square", Sn, ne, re, y]
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
        columns: [pe, ne, re, a]
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
        object: x()
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
        overscroll: D()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": D()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": D()
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
        inset: T()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": T()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": T()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: T()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: T()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: T()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: T()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: T()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: T()
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
        z: [Kt, "auto", re, ne]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Sn, "full", "auto", a, ...k()]
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
        flex: [pe, Sn, "auto", "initial", "none", ne]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", pe, re, ne]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", pe, re, ne]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Kt, "first", "last", "none", re, ne]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": E()
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
        "col-start": R()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": R()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": E()
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
        "row-start": R()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": R()
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
        "auto-cols": I()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": I()
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
        "justify-items": [...H(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...H()]
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
        items: [...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...H(), {
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
        "place-items": [...H(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...H()]
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
        m: B()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: B()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: B()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: B()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: B()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: B()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: B()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: B()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: B()
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
        size: q()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...q()]
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
          ...q()
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
          ...q()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...q()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...q()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...q()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, dr, an]
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
        font: [r, re, hs]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ps, ne]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [by, ne, t]
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
        tracking: [o, re, ne]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [pe, "none", re, hs]
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
        "list-image": ["none", re, ne]
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
        list: ["disc", "decimal", "none", re, ne]
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
        placeholder: P()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: P()
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
        decoration: [pe, "from-font", "auto", re, an]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: P()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [pe, "auto", re, ne]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", re, ne]
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
        content: ["none", re, ne]
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
        bg: U()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: X()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Kt, re, ne],
          radial: ["", re, ne],
          conic: [Kt, re, ne]
        }, xy, vy]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: P()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: G()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: G()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: G()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: P()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: P()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: P()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: Z()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Z()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Z()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Z()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Z()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Z()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Z()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Z()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Z()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Z()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Z()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Z()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Z()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Z()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Z()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: te()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": te()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": te()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": te()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": te()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": te()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": te()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": te()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": te()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": te()
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
        "divide-y": te()
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
        border: P()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": P()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": P()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": P()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": P()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": P()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": P()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": P()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": P()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: P()
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
        "outline-offset": [pe, re, ne]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", pe, dr, an]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: P()
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
          Xr,
          qr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: P()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", u, Xr, qr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": P()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: te()
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
        ring: P()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [pe, an]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": P()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": te()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": P()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", m, Xr, qr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": P()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [pe, re, ne]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...z(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": z()
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
        "mask-linear": [pe]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": j()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": j()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": j()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": j()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": j()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": j()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": j()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": j()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": j()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": j()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": j()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": j()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": j()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": j()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [re, ne]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": j()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": j()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": P()
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
        "mask-conic": [pe]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": j()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": j()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": P()
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
        mask: U()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: X()
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
        mask: ["none", re, ne]
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
          re,
          ne
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
        brightness: [pe, re, ne]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [pe, re, ne]
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
          Xr,
          qr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": P()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", pe, re, ne]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [pe, re, ne]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", pe, re, ne]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [pe, re, ne]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", pe, re, ne]
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
          re,
          ne
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
        "backdrop-brightness": [pe, re, ne]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [pe, re, ne]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", pe, re, ne]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [pe, re, ne]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", pe, re, ne]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [pe, re, ne]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [pe, re, ne]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", pe, re, ne]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", re, ne]
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
        duration: [pe, "initial", re, ne]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", b, re, ne]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [pe, re, ne]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, re, ne]
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
        perspective: [g, re, ne]
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
        rotate: he()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": he()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": he()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": he()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ve()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ve()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ve()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ve()
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
        skew: Re()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Re()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Re()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [re, ne, "", "none", "gpu", "cpu"]
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
        translate: We()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": We()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": We()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": We()
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
        accent: P()
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
        caret: P()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", re, ne]
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
        "will-change": ["auto", "scroll", "contents", "transform", re, ne]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...P()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [pe, dr, an, hs]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...P()]
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
}, Sy = /* @__PURE__ */ sy(My);
function de(...e) {
  return Sy(pl(e));
}
function Ni(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Po(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Ni(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Ni(e[o], null);
        }
      };
  };
}
function je(...e) {
  return S.useCallback(Po(...e), e);
}
// @__NO_SIDE_EFFECTS__
function wr(e) {
  const t = /* @__PURE__ */ Ey(e), n = S.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = S.Children.toArray(s), c = a.find(Ny);
    if (c) {
      const l = c.props.children, d = a.map((u) => u === c ? S.Children.count(l) > 1 ? S.Children.only(null) : S.isValidElement(l) ? l.props.children : null : u);
      return /* @__PURE__ */ f(t, { ...i, ref: o, children: S.isValidElement(l) ? S.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ f(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Ty = /* @__PURE__ */ wr("Slot");
// @__NO_SIDE_EFFECTS__
function Ey(e) {
  const t = S.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (S.isValidElement(o)) {
      const i = Ay(o), a = Ry(s, o.props);
      return o.type !== S.Fragment && (a.ref = r ? Po(r, i) : i), S.cloneElement(o, a);
    }
    return S.Children.count(o) > 1 ? S.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Sl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Dy(e) {
  const t = ({ children: n }) => /* @__PURE__ */ f(He, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Sl, t;
}
function Ny(e) {
  return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Sl;
}
function Ry(e, t) {
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
function Ay(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const Ri = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ai = pl, Ly = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Ai(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const d = n?.[l], u = s?.[l];
    if (d === null) return null;
    const m = Ri(d) || Ri(u);
    return o[l][m];
  }), a = n && Object.entries(n).reduce((l, d) => {
    let [u, m] = d;
    return m === void 0 || (l[u] = m), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, d) => {
    let { class: u, className: m, ...p } = d;
    return Object.entries(p).every((h) => {
      let [g, y] = h;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...a
      }[g]) : {
        ...s,
        ...a
      }[g] === y;
    }) ? [
      ...l,
      u,
      m
    ] : l;
  }, []);
  return Ai(e, i, c, n?.class, n?.className);
}, Bs = Ly(
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
function qt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ f(
    r ? Ty : "button",
    {
      "data-slot": "button",
      className: de(Bs({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function Py({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const c = Ma();
  return /* @__PURE__ */ f(
    jg,
    {
      showOutsideDays: n,
      className: de(
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
        root: de("w-fit", c.root),
        months: de(
          "flex gap-4 flex-col md:flex-row relative",
          c.months
        ),
        month: de("flex flex-col w-full gap-4", c.month),
        nav: de(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          c.nav
        ),
        button_previous: de(
          Bs({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: de(
          Bs({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_next
        ),
        month_caption: de(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: de(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          c.dropdowns
        ),
        dropdown_root: de(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          c.dropdown_root
        ),
        dropdown: de(
          "absolute bg-popover inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: de(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: de("flex", c.weekdays),
        weekday: de(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          c.weekday
        ),
        week: de("flex w-full mt-2", c.week),
        week_number_header: de(
          "select-none w-(--cell-size)",
          c.week_number_header
        ),
        week_number: de(
          "text-[0.8rem] select-none text-muted-foreground",
          c.week_number
        ),
        day: de(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          c.day
        ),
        range_start: de(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: de("rounded-none", c.range_middle),
        range_end: de("rounded-r-md bg-accent", c.range_end),
        today: de(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: de(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: de(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: de("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: l, rootRef: d, ...u }) => /* @__PURE__ */ f(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: de(l),
            ...u
          }
        ),
        Chevron: ({ className: l, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ f(xf, { className: de("size-4", l), ...u }) : d === "right" ? /* @__PURE__ */ f(
          kf,
          {
            className: de("size-4", l),
            ...u
          }
        ) : /* @__PURE__ */ f(Cf, { className: de("size-4", l), ...u }),
        DayButton: Iy,
        WeekNumber: ({ children: l, ...d }) => /* @__PURE__ */ f("td", { ...d, children: /* @__PURE__ */ f("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function Iy({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ma(), s = S.useRef(null);
  return S.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ f(
    qt,
    {
      ref: s,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: de(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let On = null;
const Tl = /* @__PURE__ */ new Map(), Oy = /* @__PURE__ */ new Map();
function uo() {
  if (!On) return;
  const e = On;
  On = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function _y(e) {
  return On?.pillDate === e;
}
function $y({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = V(null), i = Io(e);
  J(() => {
    const v = (w) => {
      w.key === "Escape" && (w.stopPropagation(), w.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), J(() => {
    const v = (M) => {
      s.current && !s.current.contains(M.target) && (M.target.closest(".date-pill") || o());
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const a = Y((v) => {
    v && r($n(v)), o();
  }, [r, o]), c = Y((v) => {
    const w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + v), r($n(w)), o();
  }, [r, o]), l = Y(() => {
    const w = (/* @__PURE__ */ new Date()).getDay(), M = w === 0 ? 1 : 8 - w, x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + M), r($n(x)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), m = new Date(d);
  m.setDate(m.getDate() + 1);
  const p = m.toDateString(), h = d.getDay(), g = h === 0 ? 1 : 8 - h, y = new Date(d);
  y.setDate(y.getDate() + g);
  const b = y.toDateString();
  return /* @__PURE__ */ A(
    "div",
    {
      ref: s,
      className: de("date-picker-portal", t === "dark" ? "dark" : ""),
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
        /* @__PURE__ */ f(
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
        /* @__PURE__ */ f("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ A("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ f("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ f(
            Py,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ f("div", { className: "border-t border-border" }),
          /* @__PURE__ */ A("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ f(
              qt,
              {
                variant: "outline",
                size: "sm",
                className: de(
                  "rounded-full text-xs",
                  i.toDateString() === u && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ f(
              qt,
              {
                variant: "outline",
                size: "sm",
                className: de(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => c(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ f(
              qt,
              {
                variant: "outline",
                size: "sm",
                className: de(
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
function Hy(e, t, n) {
  if (_y(t)) {
    uo();
    return;
  }
  uo();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, d = s - r.bottom - c - l, u = r.top - c - l, m = d >= a ? "below" : u >= a ? "above" : d >= u ? "below" : "above";
  let p;
  m === "below" ? p = r.bottom + c : p = r.top - a - c;
  const h = r.left + r.width / 2;
  let g = h - i / 2;
  g + i > o - l && (g = o - i - l), g < l && (g = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((x) => {
    y.addEventListener(x, (C) => {
      C.stopPropagation();
    }, !1);
  });
  const v = cm(y);
  On = { container: y, root: v, pillDate: t };
  const w = () => {
    uo();
  }, M = (x) => {
    const C = Tl.get(t);
    C && C(x);
  };
  v.render(
    /* @__PURE__ */ f(
      $y,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: g, direction: m, pillCenter: h },
        onSelectDate: M,
        onClose: w
      }
    )
  );
}
function Wy({ node: e, updateAttributes: t, selected: n }) {
  const r = V(null), o = e.attrs.date || _n(), s = El(o), i = Ta(o), a = Y(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const d = c.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return J(() => (Tl.set(o, (c) => {
    t({ date: c });
  }), Oy.set(o, a), () => {
  }), [o, t, a]), J(() => {
    const c = r.current;
    if (!c) return;
    const l = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = c.getAttribute("data-date") || _n(), m = a();
      Hy(c, u, m);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), J(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      On && uo();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ f(Bn, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ f(Sc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ f("span", { className: "date-text", children: s })
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
function _n() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function gr(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function $n(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function El(e) {
  const t = Io(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function zy(e) {
  return Io(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function ln(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return _n();
  if (n === "tomorrow") return gr(1);
  if (n === "yesterday") return gr(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return gr(c);
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
      return $n(d);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return $n(i);
  }
  return null;
}
function Ta(e) {
  const t = Io(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const By = new Ve("datePillPaste"), Fy = Eo.create({
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
        default: _n(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = El(n), o = Ta(n);
    return [
      "span",
      jn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return To(Wy, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || _n();
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
    const e = new Qe({
      find: /@today\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(_n()).run();
      }
    }), t = new Qe({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(gr(1)).run();
      }
    }), n = new Qe({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(gr(-1)).run();
      }
    }), r = new Qe({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: d, chain: u, match: m }) => {
        u().deleteRange(d).insertDatePill(m[1]).run();
      }
    }), o = new Qe({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: d, chain: u, match: m }) => {
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
        }[m[1].toLowerCase()];
        if (h !== void 0) {
          const g = (/* @__PURE__ */ new Date()).getFullYear(), y = new Date(g, h, parseInt(m[2], 10));
          u().deleteRange(d).insertDatePill($n(y)).run();
        }
      }
    }), s = new Qe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: d, chain: u, match: m }) => {
        const p = ln(m[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), i = new Qe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: d, chain: u, match: m }) => {
        const p = ln(m[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), a = new Qe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: d, chain: u, match: m }) => {
        u().deleteRange(d).insertDatePill(m[1]).run();
      }
    }), c = new Qe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: d, chain: u, match: m }) => {
        const p = ln(m[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), l = new Qe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: d, chain: u, match: m }) => {
        const p = ln(m[1]);
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
      new Ke({
        key: By,
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
              if (ln(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: m } = d, p = [];
            let h = 0;
            const g = new RegExp(i.source, i.flags);
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const M = y[1], x = ln(M);
              if (x) {
                const C = o.slice(h, y.index);
                C && p.push(m.text(C)), p.push(e.create({ date: x })), h = y.index + y[0].length;
              }
            }
            const b = o.slice(h);
            if (b && p.push(m.text(b)), p.length === 0) return !1;
            const v = m.nodes.doc.create(
              null,
              m.nodes.paragraph.create(null, p)
            ), { $from: w } = d.selection;
            if (w.parent.type.name === "paragraph") {
              const M = u;
              let x = d.selection.from;
              for (const C of p)
                M.insert(x, C), x += C.nodeSize;
              M.delete(d.selection.from, d.selection.to), t.dispatch(M);
            } else
              u.replaceSelectionWith(v), t.dispatch(u);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), it = /* @__PURE__ */ new Map();
function Uy({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = V(null), i = V(null), a = e.attrs.tag || "", c = V(!1), [l, d] = K(() => it.has(a)), [u, m] = K(() => it.get(a)?.value ?? a);
  J(() => {
    l || m(a);
  }, [a, l]), J(() => {
    if (l) {
      const v = it.get(a);
      it.set(a, {
        value: u,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [l, u, a]);
  const p = Y((v) => {
    if (c.current) return;
    c.current = !0;
    const w = v.trim().replace(/^#/, ""), M = yr(w);
    if (it.delete(a), M && it.delete(M), !M || !An(M))
      o();
    else if (M !== a) {
      const x = r();
      if (typeof x == "number" && n) {
        const { tr: C } = n.state, D = e.nodeSize;
        C.delete(x, x + D), C.insert(x, n.schema.nodes.tagPill.create({ tag: M })), n.view.dispatch(C);
      }
    } else
      it.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), h = Y(() => {
    n && !n.isEditable || (it.set(a, { value: a, focusedAt: Date.now() }), m(a), d(!0), c.current = !1);
  }, [n, a]);
  J(() => {
    const v = s.current;
    if (!v || l) return;
    const w = (x) => {
      x.preventDefault(), x.stopPropagation(), h();
    }, M = (x) => {
      x.preventDefault(), x.stopPropagation();
    };
    return v.addEventListener("dblclick", w), v.addEventListener("click", M), () => {
      v.removeEventListener("dblclick", w), v.removeEventListener("click", M);
    };
  }, [l, n, r, h]), J(() => {
    if (l) {
      const v = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const w = it.get(a);
          w && (w.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [l, a]);
  const g = Y((v) => {
    v.key === "Enter" ? (v.preventDefault(), p(u)) : v.key === "Escape" && (v.preventDefault(), it.delete(a), d(!1), c.current = !0, n?.commands.focus());
  }, [p, u, a, n]), y = Y(() => {
    const w = it.get(a)?.focusedAt ?? 0;
    Date.now() - w > 300 && p(u);
  }, [p, u, a]), b = Y((v) => {
    m(v.target.value);
  }, []);
  return l ? /* @__PURE__ */ f(Bn, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ f(ni, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ f(
          "input",
          {
            ref: i,
            type: "text",
            className: "tag-pill-input",
            value: u,
            onChange: b,
            onKeyDown: g,
            onBlur: y,
            spellCheck: !1,
            autoComplete: "off"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ f(Bn, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ f(ni, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ f("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function An(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function yr(e) {
  return e.toLowerCase().trim();
}
const Yy = new Ve("tagPillPaste"), jy = Eo.create({
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
      jn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return To(Uy, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = yr(e);
        return An(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new Qe({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = yr(r[1]);
        if (An(o)) {
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
      new Ke({
        key: Yy,
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
              if (An(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: m } = d, p = [];
            let h = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const w = yr(y[1]);
              if (An(w)) {
                const M = y[0], x = M.startsWith(" ") || M.startsWith(`
`) ? 1 : 0, C = o.slice(h, y.index + x);
                C && p.push(m.text(C)), p.push(e.create({ tag: w })), h = y.index + M.length;
              }
            }
            const b = o.slice(h);
            if (b && p.push(m.text(b)), p.length === 0) return !1;
            const { $from: v } = d.selection;
            if (v.parent.type.name === "paragraph") {
              const w = u;
              let M = d.selection.from;
              for (const x of p)
                w.insert(M, x), M += x.nodeSize;
              w.delete(d.selection.from, d.selection.to), t.dispatch(w);
            } else {
              const w = m.nodes.doc.create(
                null,
                m.nodes.paragraph.create(null, p)
              );
              u.replaceSelectionWith(w), t.dispatch(u);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function Dl({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = K(""), [i, a] = K(""), [c, l] = K(""), [d, u] = K(!1), m = V(null), p = V(null);
  J(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      m.current?.focus();
    }, 100));
  }, [e]), J(() => {
    if (!e) return;
    const v = (x) => {
      p.current && !p.current.contains(x.target) && t();
    }, w = (x) => {
      x.key === "Escape" && t();
    }, M = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", w), () => {
      clearTimeout(M), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", w);
    };
  }, [e, t]);
  const h = (v) => {
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
  }, g = async () => {
    if (!h(o)) return;
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
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), g());
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
            /* @__PURE__ */ f(pa, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ f("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ f(Pt, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ f(na, { size: 12 }),
              "Image URL"
            ] }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: m,
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
            c && /* @__PURE__ */ f("span", { className: "image-url-dialog-error", children: c })
          ] }),
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ f(Ro, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ f(
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
            /* @__PURE__ */ f(
              "button",
              {
                onClick: t,
                className: "image-url-dialog-btn image-url-dialog-btn-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ f(
              "button",
              {
                onClick: g,
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
const Ky = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ f(Ro, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ f(Mf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ f(Sf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ f(Tf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ f(Ef, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ f(Df, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ f(la, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ f(da, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ f(ua, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ f(ca, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ f(Tc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ f(Ps, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ f(pa, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ f(Ec, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ f(ho, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ f(Cc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ f(kc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ f(ma, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ f(fa, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ f(Sc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ f(na, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Vy = 32, Gy = 8, qy = 320, Xy = 210, Zr = 12;
function Li(e) {
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
function Zy({ editor: e }) {
  const [t, n] = K(!1), [r, o] = K(""), [s, i] = K(0), [a, c] = K(null), [l, d] = K(!1), [u, m] = K({ top: 0, left: 0 }), [p, h] = K("below"), g = V(null), y = V(-1), b = V(!1);
  J(() => {
    b.current = t;
  }, [t]);
  const v = Ky.filter((T) => {
    if (!r) return !0;
    const E = r.toLowerCase();
    return T.title.toLowerCase().includes(E) || T.keywords?.some((N) => N.includes(E));
  }), w = Math.min(
    v.length * Vy + Gy,
    qy
  );
  Do(() => {
    if (!t || !a) return;
    const { top: T, bottom: E, left: N } = a, R = window.innerHeight, I = window.innerWidth, O = R - E - Zr, H = T - Zr;
    let B;
    if (O >= w ? B = "below" : H >= w ? B = "above" : B = O >= H ? "below" : "above", h(B), g.current) {
      const q = Math.max(
        Zr,
        Math.min(N, I - Xy - Zr)
      ), P = B === "below" ? E + 4 : T - w - 4;
      g.current.style.top = `${P}px`, g.current.style.left = `${q}px`;
    }
  }, [t, a, w, v.length]);
  const M = Y(() => {
    const { state: T } = e, { selection: E } = T, N = E.from, R = y.current;
    if (R >= 0 && R <= N)
      e.chain().focus().deleteRange({ from: R, to: N }).run();
    else {
      const { $from: I } = E, H = I.parent.textBetween(0, I.parentOffset, void 0, "￼").lastIndexOf("/");
      if (H !== -1) {
        const B = I.pos - (I.parentOffset - H);
        e.chain().focus().deleteRange({ from: B, to: I.pos }).run();
      }
    }
  }, [e]), x = Y(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), C = Y((T) => {
    const E = v[T];
    if (E) {
      if (M(), E.isImageCommand) {
        const { state: N } = e, R = e.view.coordsAtPos(N.selection.from);
        m({
          top: R.bottom + 8,
          left: R.left
        }), d(!0);
      } else
        E.command(e);
      x();
    }
  }, [e, v, M, x]), D = Y((T, E) => {
    e.chain().focus().setImage({ src: T, alt: E }).run();
  }, [e]);
  return J(() => {
    if (!e) return;
    const T = () => {
      if (b.current) return;
      const { state: E } = e, { selection: N } = E, { $from: R } = N;
      if (R.parentOffset === 0) return;
      const I = R.parent.textBetween(0, R.parentOffset, void 0, "￼");
      if (!I.endsWith("/")) return;
      const O = I.length > 1 ? I.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = R.pos - 1;
      const H = Li(e);
      H && (c(H), n(!0), o(""), i(0));
    };
    return e.on("update", T), () => {
      e.off("update", T);
    };
  }, [e]), J(() => {
    if (!e || !t) return;
    const T = e.view.dom, E = (N) => {
      b.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((R) => (R + 1) % v.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((R) => (R - 1 + v.length) % v.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), C(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), x()));
    };
    return T.addEventListener("keydown", E, !0), () => {
      T.removeEventListener("keydown", E, !0);
    };
  }, [e, t, s, v, C, x]), J(() => {
    if (!e || !t) return;
    const T = () => {
      if (!b.current || y.current < 0) return;
      const { state: E } = e, { selection: N } = E, R = N.from, I = y.current;
      if (R <= I) {
        x();
        return;
      }
      try {
        const O = E.doc.textBetween(I + 1, R, void 0, "￼");
        if (O.includes(`
`)) {
          x();
          return;
        }
        o(O), i(0);
        const H = Li(e);
        H && c(H);
      } catch {
        x();
      }
    };
    return e.on("update", T), e.on("selectionUpdate", T), () => {
      e.off("update", T), e.off("selectionUpdate", T);
    };
  }, [e, t, x]), J(() => {
    if (!t) return;
    const T = (E) => {
      g.current && !g.current.contains(E.target) && x();
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [t, x]), J(() => {
    t && v.length === 0 && r.length > 2 && x();
  }, [t, v.length, r, x]), J(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), J(() => {
    if (!t || !g.current) return;
    const T = g.current.querySelector(".slash-item.is-selected");
    T && T.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ f(
    Dl,
    {
      isOpen: l,
      onClose: () => d(!1),
      onInsert: D,
      position: u
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ f($t, { children: /* @__PURE__ */ f(
    "div",
    {
      ref: g,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((T, E) => /* @__PURE__ */ A(
        "div",
        {
          className: `slash-item ${E === s ? "is-selected" : ""}`,
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation(), C(E);
          },
          onMouseEnter: () => i(E),
          children: [
            /* @__PURE__ */ f("span", { className: "slash-icon", children: T.icon }),
            /* @__PURE__ */ f("span", { className: "slash-label", children: T.title })
          ]
        },
        T.title
      ))
    }
  ) });
}
const Qy = 340, Jy = 36, ev = 8, tv = 240, Qr = 8;
function Pi(e) {
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
function nv({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = K(!1), [s, i] = K(""), [a, c] = K([]), [l, d] = K(0), [u, m] = K(null), [p, h] = K("below"), [g, y] = K(!1), b = V(!1), v = V(null), w = V(-1), M = V(null);
  J(() => {
    b.current = r;
  }, [r]);
  const x = Y(() => {
    o(!1), i(""), c([]), d(0), w.current = -1;
  }, []), C = Y((N) => {
    const R = w.current;
    if (R < 0) return;
    const { state: I } = e, O = I.selection.from;
    try {
      const H = I.tr.delete(R, O), B = I.schema.marks.wikiLink;
      if (B) {
        const q = B.create({ pageName: N }), P = I.schema.text(N, [q]);
        H.insert(R, P);
        const L = R + N.length;
        H.setSelection(mn.create(H.doc, L)), H.removeStoredMark(B);
      } else
        H.insertText(`[[${N}]]`, R);
      e.view.dispatch(H), e.view.focus();
    } catch (H) {
      console.warn("WikiLinkAutocomplete: Error inserting link", H);
    }
    x();
  }, [e, x]);
  J(() => {
    if (!e) return;
    const N = () => {
      if (b.current) return;
      const { state: R } = e, { selection: I } = R, { $from: O } = I;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      w.current = O.pos - 2;
      const B = Pi(e);
      B && (m(B), o(!0), i(""), c([]), d(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), J(() => {
    if (!e || !r) return;
    const N = e.view.dom, R = (I) => {
      if (b.current) {
        if (I.key === "ArrowDown") {
          I.preventDefault();
          const O = a.length + (s.trim() ? 1 : 0) - 1;
          d((H) => Math.min(H + 1, O));
          return;
        }
        if (I.key === "ArrowUp") {
          I.preventDefault(), d((O) => Math.max(O - 1, 0));
          return;
        }
        if (I.key === "Enter" || I.key === "Tab") {
          I.preventDefault(), I.stopPropagation(), l < a.length ? C(a[l].title) : s.trim() && n ? (n(s.trim()), x()) : s.trim() && C(s.trim());
          return;
        }
        if (I.key === "Escape") {
          I.preventDefault(), x();
          return;
        }
        I.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: H } = O.selection;
          H.parent.textBetween(0, H.parentOffset, void 0, "￼").endsWith("]]") && x();
        }, 0);
      }
    };
    return N.addEventListener("keydown", R, !0), () => {
      N.removeEventListener("keydown", R, !0);
    };
  }, [e, r, a, l, s, C, x, n]), J(() => {
    if (!e || !r) return;
    const N = () => {
      const R = w.current;
      if (R < 0) {
        x();
        return;
      }
      const { state: I } = e, O = I.selection.from;
      if (O <= R) {
        x();
        return;
      }
      try {
        const H = I.doc.textBetween(R + 2, O, void 0, "￼");
        if (H.includes(`
`) || H.includes("]]")) {
          x();
          return;
        }
        i(H), d(0);
        const B = Pi(e);
        B && m(B);
      } catch {
        x();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, x]), J(() => {
    if (r) {
      if (M.current && clearTimeout(M.current), !s.trim()) {
        y(!0), M.current = setTimeout(async () => {
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
      return y(!0), M.current = setTimeout(async () => {
        try {
          const N = await t(s.trim());
          c(N);
        } catch {
          c([]);
        }
        y(!1);
      }, 150), () => {
        M.current && clearTimeout(M.current);
      };
    }
  }, [r, s, t]), J(() => {
    if (!r) return;
    const N = (R) => {
      v.current && !v.current.contains(R.target) && x();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, x]), J(() => {
    if (!r || !v.current) return;
    const N = v.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const D = a.length + (s.trim() ? 1 : 0), k = Math.min(
    Math.max(D, 1) * Jy + ev,
    tv
  );
  if (Do(() => {
    if (!r || !u) return;
    const { top: N, bottom: R, left: I } = u, O = window.innerHeight, H = window.innerWidth, B = O - R - Qr, q = N - Qr;
    let P;
    if (B >= k ? P = "below" : q >= k ? P = "above" : P = B >= q ? "below" : "above", h(P), v.current) {
      const L = Math.max(
        Qr,
        Math.min(I, H - Qy - Qr)
      ), U = P === "below" ? R + 4 : N - k - 4;
      v.current.style.top = `${U}px`, v.current.style.left = `${L}px`;
    }
  }, [r, u, k, D]), !r) return null;
  const T = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ f($t, { children: /* @__PURE__ */ A(
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
        g && a.length === 0 && /* @__PURE__ */ f("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ f("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
        a.map((N, R) => /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item ${R === l ? "is-selected" : ""}`,
            onMouseDown: (I) => {
              I.preventDefault(), C(N.title);
            },
            onMouseEnter: () => d(R),
            children: [
              /* @__PURE__ */ f("span", { className: "wikilink-icon", children: /* @__PURE__ */ f(ha, { size: 14 }) }),
              /* @__PURE__ */ f("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ f("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        T && /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), x()) : C(s.trim());
            },
            onMouseEnter: () => d(a.length),
            children: [
              /* @__PURE__ */ f("span", { className: "wikilink-icon", children: /* @__PURE__ */ f(ga, { size: 14 }) }),
              /* @__PURE__ */ A("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] })
            ]
          }
        ),
        !g && a.length === 0 && !s.trim() && /* @__PURE__ */ f("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ f("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }) })
      ]
    }
  ) });
}
function fe(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Qn(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = S.createContext(i), c = n.length;
    n = [...n, i];
    const l = (u) => {
      const { scope: m, children: p, ...h } = u, g = m?.[e]?.[c] || a, y = S.useMemo(() => h, Object.values(h));
      return /* @__PURE__ */ f(g.Provider, { value: y, children: p });
    };
    l.displayName = s + "Provider";
    function d(u, m) {
      const p = m?.[e]?.[c] || a, h = S.useContext(p);
      if (h) return h;
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
  return o.scopeName = e, [r, rv(o, ...t)];
}
function rv(...e) {
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
var Zt = globalThis?.document ? S.useLayoutEffect : () => {
}, ov = S[" useInsertionEffect ".trim().toString()] || Zt;
function Ea({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = sv({
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
        const u = av(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function sv({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = S.useState(e), o = S.useRef(n), s = S.useRef(t);
  return ov(() => {
    s.current = t;
  }, [t]), S.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function av(e) {
  return typeof e == "function";
}
var iv = [
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
], Fe = iv.reduce((e, t) => {
  const n = /* @__PURE__ */ wr(`Primitive.${t}`), r = S.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ f(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Nl(e, t) {
  e && Wc.flushSync(() => e.dispatchEvent(t));
}
function Rl(e) {
  const t = e + "CollectionProvider", [n, r] = Qn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: y, children: b } = g, v = Q.useRef(null), w = Q.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ f(o, { scope: y, itemMap: w, collectionRef: v, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ wr(a), l = Q.forwardRef(
    (g, y) => {
      const { scope: b, children: v } = g, w = s(a, b), M = je(y, w.collectionRef);
      return /* @__PURE__ */ f(c, { ref: M, children: v });
    }
  );
  l.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", m = /* @__PURE__ */ wr(d), p = Q.forwardRef(
    (g, y) => {
      const { scope: b, children: v, ...w } = g, M = Q.useRef(null), x = je(y, M), C = s(d, b);
      return Q.useEffect(() => (C.itemMap.set(M, { ref: M, ...w }), () => void C.itemMap.delete(M))), /* @__PURE__ */ f(m, { [u]: "", ref: x, children: v });
    }
  );
  p.displayName = d;
  function h(g) {
    const y = s(e + "CollectionConsumer", g);
    return Q.useCallback(() => {
      const v = y.collectionRef.current;
      if (!v) return [];
      const w = Array.from(v.querySelectorAll(`[${u}]`));
      return Array.from(y.itemMap.values()).sort(
        (C, D) => w.indexOf(C.ref.current) - w.indexOf(D.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    h,
    r
  ];
}
var cv = S.createContext(void 0);
function Al(e) {
  const t = S.useContext(cv);
  return e || t || "ltr";
}
function It(e) {
  const t = S.useRef(e);
  return S.useEffect(() => {
    t.current = e;
  }), S.useMemo(() => (...n) => t.current?.(...n), []);
}
function lv(e, t = globalThis?.document) {
  const n = It(e);
  S.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var dv = "DismissableLayer", Fs = "dismissableLayer.update", uv = "dismissableLayer.pointerDownOutside", fv = "dismissableLayer.focusOutside", Ii, Ll = S.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Da = S.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = S.useContext(Ll), [d, u] = S.useState(null), m = d?.ownerDocument ?? globalThis?.document, [, p] = S.useState({}), h = je(t, (D) => u(D)), g = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = g.indexOf(y), v = d ? g.indexOf(d) : -1, w = l.layersWithOutsidePointerEventsDisabled.size > 0, M = v >= b, x = hv((D) => {
      const k = D.target, T = [...l.branches].some((E) => E.contains(k));
      !M || T || (o?.(D), i?.(D), D.defaultPrevented || a?.());
    }, m), C = gv((D) => {
      const k = D.target;
      [...l.branches].some((E) => E.contains(k)) || (s?.(D), i?.(D), D.defaultPrevented || a?.());
    }, m);
    return lv((D) => {
      v === l.layers.size - 1 && (r?.(D), !D.defaultPrevented && a && (D.preventDefault(), a()));
    }, m), S.useEffect(() => {
      if (d)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Ii = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), Oi(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Ii);
        };
    }, [d, m, n, l]), S.useEffect(() => () => {
      d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), Oi());
    }, [d, l]), S.useEffect(() => {
      const D = () => p({});
      return document.addEventListener(Fs, D), () => document.removeEventListener(Fs, D);
    }, []), /* @__PURE__ */ f(
      Fe.div,
      {
        ...c,
        ref: h,
        style: {
          pointerEvents: w ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: fe(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: fe(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: fe(
          e.onPointerDownCapture,
          x.onPointerDownCapture
        )
      }
    );
  }
);
Da.displayName = dv;
var mv = "DismissableLayerBranch", pv = S.forwardRef((e, t) => {
  const n = S.useContext(Ll), r = S.useRef(null), o = je(t, r);
  return S.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ f(Fe.div, { ...e, ref: o });
});
pv.displayName = mv;
function hv(e, t = globalThis?.document) {
  const n = It(e), r = S.useRef(!1), o = S.useRef(() => {
  });
  return S.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          Pl(
            uv,
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
function gv(e, t = globalThis?.document) {
  const n = It(e), r = S.useRef(!1);
  return S.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Pl(fv, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Oi() {
  const e = new CustomEvent(Fs);
  document.dispatchEvent(e);
}
function Pl(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Nl(o, s) : o.dispatchEvent(s);
}
var gs = 0;
function yv() {
  S.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? _i()), document.body.insertAdjacentElement("beforeend", e[1] ?? _i()), gs++, () => {
      gs === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), gs--;
    };
  }, []);
}
function _i() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ys = "focusScope.autoFocusOnMount", vs = "focusScope.autoFocusOnUnmount", $i = { bubbles: !1, cancelable: !0 }, vv = "FocusScope", Il = S.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = S.useState(null), l = It(o), d = It(s), u = S.useRef(null), m = je(t, (g) => c(g)), p = S.useRef({
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
      let g = function(w) {
        if (p.paused || !a) return;
        const M = w.target;
        a.contains(M) ? u.current = M : Gt(u.current, { select: !0 });
      }, y = function(w) {
        if (p.paused || !a) return;
        const M = w.relatedTarget;
        M !== null && (a.contains(M) || Gt(u.current, { select: !0 }));
      }, b = function(w) {
        if (document.activeElement === document.body)
          for (const x of w)
            x.removedNodes.length > 0 && Gt(a);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const v = new MutationObserver(b);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), v.disconnect();
      };
    }
  }, [r, a, p.paused]), S.useEffect(() => {
    if (a) {
      Wi.add(p);
      const g = document.activeElement;
      if (!a.contains(g)) {
        const b = new CustomEvent(ys, $i);
        a.addEventListener(ys, l), a.dispatchEvent(b), b.defaultPrevented || (bv(Mv(Ol(a)), { select: !0 }), document.activeElement === g && Gt(a));
      }
      return () => {
        a.removeEventListener(ys, l), setTimeout(() => {
          const b = new CustomEvent(vs, $i);
          a.addEventListener(vs, d), a.dispatchEvent(b), b.defaultPrevented || Gt(g ?? document.body, { select: !0 }), a.removeEventListener(vs, d), Wi.remove(p);
        }, 0);
      };
    }
  }, [a, l, d, p]);
  const h = S.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, b = document.activeElement;
      if (y && b) {
        const v = g.currentTarget, [w, M] = wv(v);
        w && M ? !g.shiftKey && b === M ? (g.preventDefault(), n && Gt(w, { select: !0 })) : g.shiftKey && b === w && (g.preventDefault(), n && Gt(M, { select: !0 })) : b === v && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ f(Fe.div, { tabIndex: -1, ...i, ref: m, onKeyDown: h });
});
Il.displayName = vv;
function bv(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Gt(r, { select: t }), document.activeElement !== n) return;
}
function wv(e) {
  const t = Ol(e), n = Hi(t, e), r = Hi(t.reverse(), e);
  return [n, r];
}
function Ol(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Hi(e, t) {
  for (const n of e)
    if (!xv(n, { upTo: t })) return n;
}
function xv(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function kv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Gt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && kv(e) && t && e.select();
  }
}
var Wi = Cv();
function Cv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = zi(e, t), e.unshift(t);
    },
    remove(t) {
      e = zi(e, t), e[0]?.resume();
    }
  };
}
function zi(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Mv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Sv = S[" useId ".trim().toString()] || (() => {
}), Tv = 0;
function go(e) {
  const [t, n] = S.useState(Sv());
  return Zt(() => {
    n((r) => r ?? String(Tv++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Ev = ["top", "right", "bottom", "left"], Qt = Math.min, et = Math.max, yo = Math.round, Jr = Math.floor, yt = (e) => ({
  x: e,
  y: e
}), Dv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Nv = {
  start: "end",
  end: "start"
};
function Us(e, t, n) {
  return et(e, Qt(t, n));
}
function Ot(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function _t(e) {
  return e.split("-")[0];
}
function Jn(e) {
  return e.split("-")[1];
}
function Na(e) {
  return e === "x" ? "y" : "x";
}
function Ra(e) {
  return e === "y" ? "height" : "width";
}
const Rv = /* @__PURE__ */ new Set(["top", "bottom"]);
function gt(e) {
  return Rv.has(_t(e)) ? "y" : "x";
}
function Aa(e) {
  return Na(gt(e));
}
function Av(e, t, n) {
  n === void 0 && (n = !1);
  const r = Jn(e), o = Aa(e), s = Ra(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = vo(i)), [i, vo(i)];
}
function Lv(e) {
  const t = vo(e);
  return [Ys(e), t, Ys(t)];
}
function Ys(e) {
  return e.replace(/start|end/g, (t) => Nv[t]);
}
const Bi = ["left", "right"], Fi = ["right", "left"], Pv = ["top", "bottom"], Iv = ["bottom", "top"];
function Ov(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Fi : Bi : t ? Bi : Fi;
    case "left":
    case "right":
      return t ? Pv : Iv;
    default:
      return [];
  }
}
function _v(e, t, n, r) {
  const o = Jn(e);
  let s = Ov(_t(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(Ys)))), s;
}
function vo(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Dv[t]);
}
function $v(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function _l(e) {
  return typeof e != "number" ? $v(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function bo(e) {
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
function Ui(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = gt(t), i = Aa(t), a = Ra(i), c = _t(t), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, m = r[a] / 2 - o[a] / 2;
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
  switch (Jn(t)) {
    case "start":
      p[i] -= m * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += m * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const Hv = async (e, t, n) => {
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
  } = Ui(l, r, c), m = r, p = {}, h = 0;
  for (let g = 0; g < a.length; g++) {
    const {
      name: y,
      fn: b
    } = a[g], {
      x: v,
      y: w,
      data: M,
      reset: x
    } = await b({
      x: d,
      y: u,
      initialPlacement: r,
      placement: m,
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
        ...M
      }
    }, x && h <= 50 && (h++, typeof x == "object" && (x.placement && (m = x.placement), x.rects && (l = x.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : x.rects), {
      x: d,
      y: u
    } = Ui(l, m, c)), g = -1);
  }
  return {
    x: d,
    y: u,
    placement: m,
    strategy: o,
    middlewareData: p
  };
};
async function xr(e, t) {
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
    altBoundary: m = !1,
    padding: p = 0
  } = Ot(t, e), h = _l(p), y = a[m ? u === "floating" ? "reference" : "floating" : u], b = bo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: c
  })), v = u === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), M = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = bo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: v,
    offsetParent: w,
    strategy: c
  }) : v);
  return {
    top: (b.top - x.top + h.top) / M.y,
    bottom: (x.bottom - b.bottom + h.bottom) / M.y,
    left: (b.left - x.left + h.left) / M.x,
    right: (x.right - b.right + h.right) / M.x
  };
}
const Wv = (e) => ({
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
    } = Ot(e, t) || {};
    if (l == null)
      return {};
    const u = _l(d), m = {
      x: n,
      y: r
    }, p = Aa(o), h = Ra(p), g = await i.getDimensions(l), y = p === "y", b = y ? "top" : "left", v = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", M = s.reference[h] + s.reference[p] - m[p] - s.floating[h], x = m[p] - s.reference[p], C = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let D = C ? C[w] : 0;
    (!D || !await (i.isElement == null ? void 0 : i.isElement(C))) && (D = a.floating[w] || s.floating[h]);
    const k = M / 2 - x / 2, T = D / 2 - g[h] / 2 - 1, E = Qt(u[b], T), N = Qt(u[v], T), R = E, I = D - g[h] - N, O = D / 2 - g[h] / 2 + k, H = Us(R, O, I), B = !c.arrow && Jn(o) != null && O !== H && s.reference[h] / 2 - (O < R ? E : N) - g[h] / 2 < 0, q = B ? O < R ? O - R : O - I : 0;
    return {
      [p]: m[p] + q,
      data: {
        [p]: H,
        centerOffset: O - H - q,
        ...B && {
          alignmentOffset: q
        }
      },
      reset: B
    };
  }
}), zv = function(e) {
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
        fallbackPlacements: m,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: g = !0,
        ...y
      } = Ot(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = _t(o), v = gt(a), w = _t(a) === a, M = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), x = m || (w || !g ? [vo(a)] : Lv(a)), C = h !== "none";
      !m && C && x.push(..._v(a, g, h, M));
      const D = [a, ...x], k = await xr(t, y), T = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && T.push(k[b]), u) {
        const O = Av(o, i, M);
        T.push(k[O[0]], k[O[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: T
      }], !T.every((O) => O <= 0)) {
        var N, R;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, H = D[O];
        if (H && (!(u === "alignment" ? v !== gt(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        E.every((P) => gt(P.placement) === v ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: E
            },
            reset: {
              placement: H
            }
          };
        let B = (R = E.filter((q) => q.overflows[0] <= 0).sort((q, P) => q.overflows[1] - P.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!B)
          switch (p) {
            case "bestFit": {
              var I;
              const q = (I = E.filter((P) => {
                if (C) {
                  const L = gt(P.placement);
                  return L === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((L) => L > 0).reduce((L, U) => L + U, 0)]).sort((P, L) => P[1] - L[1])[0]) == null ? void 0 : I[0];
              q && (B = q);
              break;
            }
            case "initialPlacement":
              B = a;
              break;
          }
        if (o !== B)
          return {
            reset: {
              placement: B
            }
          };
      }
      return {};
    }
  };
};
function Yi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ji(e) {
  return Ev.some((t) => e[t] >= 0);
}
const Bv = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Ot(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await xr(t, {
            ...o,
            elementContext: "reference"
          }), i = Yi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: ji(i)
            }
          };
        }
        case "escaped": {
          const s = await xr(t, {
            ...o,
            altBoundary: !0
          }), i = Yi(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: ji(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, $l = /* @__PURE__ */ new Set(["left", "top"]);
async function Fv(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = _t(n), a = Jn(n), c = gt(n) === "y", l = $l.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = Ot(t, e);
  let {
    mainAxis: m,
    crossAxis: p,
    alignmentAxis: h
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return a && typeof h == "number" && (p = a === "end" ? h * -1 : h), c ? {
    x: p * d,
    y: m * l
  } : {
    x: m * l,
    y: p * d
  };
}
const Uv = function(e) {
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
      } = t, c = await Fv(t, e);
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
}, Yv = function(e) {
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
      } = Ot(e, t), l = {
        x: n,
        y: r
      }, d = await xr(t, c), u = gt(_t(o)), m = Na(u);
      let p = l[m], h = l[u];
      if (s) {
        const y = m === "y" ? "top" : "left", b = m === "y" ? "bottom" : "right", v = p + d[y], w = p - d[b];
        p = Us(v, p, w);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", b = u === "y" ? "bottom" : "right", v = h + d[y], w = h - d[b];
        h = Us(v, h, w);
      }
      const g = a.fn({
        ...t,
        [m]: p,
        [u]: h
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [m]: s,
            [u]: i
          }
        }
      };
    }
  };
}, jv = function(e) {
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
      } = Ot(e, t), d = {
        x: n,
        y: r
      }, u = gt(o), m = Na(u);
      let p = d[m], h = d[u];
      const g = Ot(a, t), y = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const w = m === "y" ? "height" : "width", M = s.reference[m] - s.floating[w] + y.mainAxis, x = s.reference[m] + s.reference[w] - y.mainAxis;
        p < M ? p = M : p > x && (p = x);
      }
      if (l) {
        var b, v;
        const w = m === "y" ? "width" : "height", M = $l.has(_t(o)), x = s.reference[u] - s.floating[w] + (M && ((b = i.offset) == null ? void 0 : b[u]) || 0) + (M ? 0 : y.crossAxis), C = s.reference[u] + s.reference[w] + (M ? 0 : ((v = i.offset) == null ? void 0 : v[u]) || 0) - (M ? y.crossAxis : 0);
        h < x ? h = x : h > C && (h = C);
      }
      return {
        [m]: p,
        [u]: h
      };
    }
  };
}, Kv = function(e) {
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
      } = Ot(e, t), d = await xr(t, l), u = _t(o), m = Jn(o), p = gt(o) === "y", {
        width: h,
        height: g
      } = s.floating;
      let y, b;
      u === "top" || u === "bottom" ? (y = u, b = m === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = u, y = m === "end" ? "top" : "bottom");
      const v = g - d.top - d.bottom, w = h - d.left - d.right, M = Qt(g - d[y], v), x = Qt(h - d[b], w), C = !t.middlewareData.shift;
      let D = M, k = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = w), (r = t.middlewareData.shift) != null && r.enabled.y && (D = v), C && !m) {
        const E = et(d.left, 0), N = et(d.right, 0), R = et(d.top, 0), I = et(d.bottom, 0);
        p ? k = h - 2 * (E !== 0 || N !== 0 ? E + N : et(d.left, d.right)) : D = g - 2 * (R !== 0 || I !== 0 ? R + I : et(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: k,
        availableHeight: D
      });
      const T = await i.getDimensions(a.floating);
      return h !== T.width || g !== T.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Oo() {
  return typeof window < "u";
}
function er(e) {
  return Hl(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function tt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function wt(e) {
  var t;
  return (t = (Hl(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Hl(e) {
  return Oo() ? e instanceof Node || e instanceof tt(e).Node : !1;
}
function lt(e) {
  return Oo() ? e instanceof Element || e instanceof tt(e).Element : !1;
}
function vt(e) {
  return Oo() ? e instanceof HTMLElement || e instanceof tt(e).HTMLElement : !1;
}
function Ki(e) {
  return !Oo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof tt(e).ShadowRoot;
}
const Vv = /* @__PURE__ */ new Set(["inline", "contents"]);
function Nr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = dt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Vv.has(o);
}
const Gv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function qv(e) {
  return Gv.has(er(e));
}
const Xv = [":popover-open", ":modal"];
function _o(e) {
  return Xv.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Zv = ["transform", "translate", "scale", "rotate", "perspective"], Qv = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Jv = ["paint", "layout", "strict", "content"];
function La(e) {
  const t = Pa(), n = lt(e) ? dt(e) : e;
  return Zv.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Qv.some((r) => (n.willChange || "").includes(r)) || Jv.some((r) => (n.contain || "").includes(r));
}
function eb(e) {
  let t = Jt(e);
  for (; vt(t) && !Un(t); ) {
    if (La(t))
      return t;
    if (_o(t))
      return null;
    t = Jt(t);
  }
  return null;
}
function Pa() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const tb = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Un(e) {
  return tb.has(er(e));
}
function dt(e) {
  return tt(e).getComputedStyle(e);
}
function $o(e) {
  return lt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Jt(e) {
  if (er(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Ki(e) && e.host || // Fallback.
    wt(e)
  );
  return Ki(t) ? t.host : t;
}
function Wl(e) {
  const t = Jt(e);
  return Un(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : vt(t) && Nr(t) ? t : Wl(t);
}
function kr(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Wl(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = tt(o);
  if (s) {
    const a = js(i);
    return t.concat(i, i.visualViewport || [], Nr(o) ? o : [], a && n ? kr(a) : []);
  }
  return t.concat(o, kr(o, [], n));
}
function js(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function zl(e) {
  const t = dt(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = vt(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = yo(n) !== s || yo(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function Ia(e) {
  return lt(e) ? e : e.contextElement;
}
function Hn(e) {
  const t = Ia(e);
  if (!vt(t))
    return yt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = zl(t);
  let i = (s ? yo(n.width) : n.width) / r, a = (s ? yo(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const nb = /* @__PURE__ */ yt(0);
function Bl(e) {
  const t = tt(e);
  return !Pa() || !t.visualViewport ? nb : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function rb(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== tt(e) ? !1 : t;
}
function pn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = Ia(e);
  let i = yt(1);
  t && (r ? lt(r) && (i = Hn(r)) : i = Hn(e));
  const a = rb(s, n, r) ? Bl(s) : yt(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const m = tt(s), p = r && lt(r) ? tt(r) : r;
    let h = m, g = js(h);
    for (; g && r && p !== h; ) {
      const y = Hn(g), b = g.getBoundingClientRect(), v = dt(g), w = b.left + (g.clientLeft + parseFloat(v.paddingLeft)) * y.x, M = b.top + (g.clientTop + parseFloat(v.paddingTop)) * y.y;
      c *= y.x, l *= y.y, d *= y.x, u *= y.y, c += w, l += M, h = tt(g), g = js(h);
    }
  }
  return bo({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function Ho(e, t) {
  const n = $o(e).scrollLeft;
  return t ? t.left + n : pn(wt(e)).left + n;
}
function Fl(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Ho(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function ob(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = wt(r), a = t ? _o(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = yt(1);
  const d = yt(0), u = vt(r);
  if ((u || !u && !s) && ((er(r) !== "body" || Nr(i)) && (c = $o(r)), vt(r))) {
    const p = pn(r);
    l = Hn(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const m = i && !u && !s ? Fl(i, c) : yt(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + m.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + m.y
  };
}
function sb(e) {
  return Array.from(e.getClientRects());
}
function ab(e) {
  const t = wt(e), n = $o(e), r = e.ownerDocument.body, o = et(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = et(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Ho(e);
  const a = -n.scrollTop;
  return dt(r).direction === "rtl" && (i += et(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const Vi = 25;
function ib(e, t) {
  const n = tt(e), r = wt(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = Pa();
    (!d || d && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = Ho(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, m = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, h = Math.abs(r.clientWidth - u.clientWidth - p);
    h <= Vi && (s -= h);
  } else l <= Vi && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const cb = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function lb(e, t) {
  const n = pn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = vt(e) ? Hn(e) : yt(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function Gi(e, t, n) {
  let r;
  if (t === "viewport")
    r = ib(e, n);
  else if (t === "document")
    r = ab(wt(e));
  else if (lt(t))
    r = lb(t, n);
  else {
    const o = Bl(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return bo(r);
}
function Ul(e, t) {
  const n = Jt(e);
  return n === t || !lt(n) || Un(n) ? !1 : dt(n).position === "fixed" || Ul(n, t);
}
function db(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = kr(e, [], !1).filter((a) => lt(a) && er(a) !== "body"), o = null;
  const s = dt(e).position === "fixed";
  let i = s ? Jt(e) : e;
  for (; lt(i) && !Un(i); ) {
    const a = dt(i), c = La(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && cb.has(o.position) || Nr(i) && !c && Ul(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = Jt(i);
  }
  return t.set(e, r), r;
}
function ub(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? _o(t) ? [] : db(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, d) => {
    const u = Gi(t, d, o);
    return l.top = et(u.top, l.top), l.right = Qt(u.right, l.right), l.bottom = Qt(u.bottom, l.bottom), l.left = et(u.left, l.left), l;
  }, Gi(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function fb(e) {
  const {
    width: t,
    height: n
  } = zl(e);
  return {
    width: t,
    height: n
  };
}
function mb(e, t, n) {
  const r = vt(t), o = wt(t), s = n === "fixed", i = pn(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = yt(0);
  function l() {
    c.x = Ho(o);
  }
  if (r || !r && !s)
    if ((er(t) !== "body" || Nr(o)) && (a = $o(t)), r) {
      const p = pn(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? Fl(o, a) : yt(0), u = i.left + a.scrollLeft - c.x - d.x, m = i.top + a.scrollTop - c.y - d.y;
  return {
    x: u,
    y: m,
    width: i.width,
    height: i.height
  };
}
function bs(e) {
  return dt(e).position === "static";
}
function qi(e, t) {
  if (!vt(e) || dt(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return wt(e) === n && (n = n.ownerDocument.body), n;
}
function Yl(e, t) {
  const n = tt(e);
  if (_o(e))
    return n;
  if (!vt(e)) {
    let o = Jt(e);
    for (; o && !Un(o); ) {
      if (lt(o) && !bs(o))
        return o;
      o = Jt(o);
    }
    return n;
  }
  let r = qi(e, t);
  for (; r && qv(r) && bs(r); )
    r = qi(r, t);
  return r && Un(r) && bs(r) && !La(r) ? n : r || eb(e) || n;
}
const pb = async function(e) {
  const t = this.getOffsetParent || Yl, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: mb(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function hb(e) {
  return dt(e).direction === "rtl";
}
const gb = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ob,
  getDocumentElement: wt,
  getClippingRect: ub,
  getOffsetParent: Yl,
  getElementRects: pb,
  getClientRects: sb,
  getDimensions: fb,
  getScale: Hn,
  isElement: lt,
  isRTL: hb
};
function jl(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function yb(e, t) {
  let n = null, r;
  const o = wt(e);
  function s() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), s();
    const l = e.getBoundingClientRect(), {
      left: d,
      top: u,
      width: m,
      height: p
    } = l;
    if (a || t(), !m || !p)
      return;
    const h = Jr(u), g = Jr(o.clientWidth - (d + m)), y = Jr(o.clientHeight - (u + p)), b = Jr(d), w = {
      rootMargin: -h + "px " + -g + "px " + -y + "px " + -b + "px",
      threshold: et(0, Qt(1, c)) || 1
    };
    let M = !0;
    function x(C) {
      const D = C[0].intersectionRatio;
      if (D !== c) {
        if (!M)
          return i();
        D ? i(!1, D) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !jl(l, e.getBoundingClientRect()) && i(), M = !1;
    }
    try {
      n = new IntersectionObserver(x, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(x, w);
    }
    n.observe(e);
  }
  return i(!0), s;
}
function vb(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Ia(e), d = o || s ? [...l ? kr(l) : [], ...kr(t)] : [];
  d.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const u = l && a ? yb(l, n) : null;
  let m = -1, p = null;
  i && (p = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === l && p && (p.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var w;
      (w = p) == null || w.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let h, g = c ? pn(e) : null;
  c && y();
  function y() {
    const b = pn(e);
    g && !jl(g, b) && n(), g = b, h = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    d.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), u?.(), (b = p) == null || b.disconnect(), p = null, c && cancelAnimationFrame(h);
  };
}
const bb = Uv, wb = Yv, xb = zv, kb = Kv, Cb = Bv, Xi = Wv, Mb = jv, Sb = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: gb,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Hv(e, t, {
    ...o,
    platform: s
  });
};
var Tb = typeof document < "u", Eb = function() {
}, fo = Tb ? Do : Eb;
function wo(e, t) {
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
        if (!wo(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !wo(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Kl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Zi(e, t) {
  const n = Kl(e);
  return Math.round(t * n) / n;
}
function ws(e) {
  const t = S.useRef(e);
  return fo(() => {
    t.current = e;
  }), t;
}
function Db(e) {
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
  }), [m, p] = S.useState(r);
  wo(m, r) || p(r);
  const [h, g] = S.useState(null), [y, b] = S.useState(null), v = S.useCallback((P) => {
    P !== C.current && (C.current = P, g(P));
  }, []), w = S.useCallback((P) => {
    P !== D.current && (D.current = P, b(P));
  }, []), M = s || h, x = i || y, C = S.useRef(null), D = S.useRef(null), k = S.useRef(d), T = c != null, E = ws(c), N = ws(o), R = ws(l), I = S.useCallback(() => {
    if (!C.current || !D.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: m
    };
    N.current && (P.platform = N.current), Sb(C.current, D.current, P).then((L) => {
      const U = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      O.current && !wo(k.current, U) && (k.current = U, Wc.flushSync(() => {
        u(U);
      }));
    });
  }, [m, t, n, N, R]);
  fo(() => {
    l === !1 && k.current.isPositioned && (k.current.isPositioned = !1, u((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [l]);
  const O = S.useRef(!1);
  fo(() => (O.current = !0, () => {
    O.current = !1;
  }), []), fo(() => {
    if (M && (C.current = M), x && (D.current = x), M && x) {
      if (E.current)
        return E.current(M, x, I);
      I();
    }
  }, [M, x, I, E, T]);
  const H = S.useMemo(() => ({
    reference: C,
    floating: D,
    setReference: v,
    setFloating: w
  }), [v, w]), B = S.useMemo(() => ({
    reference: M,
    floating: x
  }), [M, x]), q = S.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!B.floating)
      return P;
    const L = Zi(B.floating, d.x), U = Zi(B.floating, d.y);
    return a ? {
      ...P,
      transform: "translate(" + L + "px, " + U + "px)",
      ...Kl(B.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: U
    };
  }, [n, a, B.floating, d.x, d.y]);
  return S.useMemo(() => ({
    ...d,
    update: I,
    refs: H,
    elements: B,
    floatingStyles: q
  }), [d, I, H, B, q]);
}
const Nb = (e) => {
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
      return r && t(r) ? r.current != null ? Xi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Xi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Rb = (e, t) => ({
  ...bb(e),
  options: [e, t]
}), Ab = (e, t) => ({
  ...wb(e),
  options: [e, t]
}), Lb = (e, t) => ({
  ...Mb(e),
  options: [e, t]
}), Pb = (e, t) => ({
  ...xb(e),
  options: [e, t]
}), Ib = (e, t) => ({
  ...kb(e),
  options: [e, t]
}), Ob = (e, t) => ({
  ...Cb(e),
  options: [e, t]
}), _b = (e, t) => ({
  ...Nb(e),
  options: [e, t]
});
var $b = "Arrow", Vl = S.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ f(
    Fe.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ f("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Vl.displayName = $b;
var Hb = Vl;
function Wb(e) {
  const [t, n] = S.useState(void 0);
  return Zt(() => {
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
var Oa = "Popper", [Gl, Wo] = Qn(Oa), [zb, ql] = Gl(Oa), Xl = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = S.useState(null);
  return /* @__PURE__ */ f(zb, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Xl.displayName = Oa;
var Zl = "PopperAnchor", Ql = S.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = ql(Zl, n), i = S.useRef(null), a = je(t, i), c = S.useRef(null);
    return S.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ f(Fe.div, { ...o, ref: a });
  }
);
Ql.displayName = Zl;
var _a = "PopperContent", [Bb, Fb] = Gl(_a), Jl = S.forwardRef(
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
      hideWhenDetached: m = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: h,
      ...g
    } = e, y = ql(_a, n), [b, v] = S.useState(null), w = je(t, (j) => v(j)), [M, x] = S.useState(null), C = Wb(M), D = C?.width ?? 0, k = C?.height ?? 0, T = r + (s !== "center" ? "-" + s : ""), E = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, N = Array.isArray(l) ? l : [l], R = N.length > 0, I = {
      padding: E,
      boundary: N.filter(Yb),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: O, floatingStyles: H, placement: B, isPositioned: q, middlewareData: P } = Db({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: T,
      whileElementsMounted: (...j) => vb(...j, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Rb({ mainAxis: o + k, alignmentAxis: i }),
        c && Ab({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? Lb() : void 0,
          ...I
        }),
        c && Pb({ ...I }),
        Ib({
          ...I,
          apply: ({ elements: j, rects: ee, availableWidth: he, availableHeight: ve }) => {
            const { width: Re, height: We } = ee.reference, rt = j.floating.style;
            rt.setProperty("--radix-popper-available-width", `${he}px`), rt.setProperty("--radix-popper-available-height", `${ve}px`), rt.setProperty("--radix-popper-anchor-width", `${Re}px`), rt.setProperty("--radix-popper-anchor-height", `${We}px`);
          }
        }),
        M && _b({ element: M, padding: a }),
        jb({ arrowWidth: D, arrowHeight: k }),
        m && Ob({ strategy: "referenceHidden", ...I })
      ]
    }), [L, U] = nd(B), X = It(h);
    Zt(() => {
      q && X?.();
    }, [q, X]);
    const G = P.arrow?.x, Z = P.arrow?.y, te = P.arrow?.centerOffset !== 0, [$, z] = S.useState();
    return Zt(() => {
      b && z(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ f(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...H,
          transform: q ? H.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: $,
          "--radix-popper-transform-origin": [
            P.transformOrigin?.x,
            P.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...P.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ f(
          Bb,
          {
            scope: n,
            placedSide: L,
            onArrowChange: x,
            arrowX: G,
            arrowY: Z,
            shouldHideArrow: te,
            children: /* @__PURE__ */ f(
              Fe.div,
              {
                "data-side": L,
                "data-align": U,
                ...g,
                ref: w,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: q ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Jl.displayName = _a;
var ed = "PopperArrow", Ub = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, td = S.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Fb(ed, r), i = Ub[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ f(
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
        children: /* @__PURE__ */ f(
          Hb,
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
td.displayName = ed;
function Yb(e) {
  return e !== null;
}
var jb = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, d] = nd(n), u = { start: "0%", center: "50%", end: "100%" }[d], m = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let h = "", g = "";
    return l === "bottom" ? (h = i ? u : `${m}px`, g = `${-c}px`) : l === "top" ? (h = i ? u : `${m}px`, g = `${r.floating.height + c}px`) : l === "right" ? (h = `${-c}px`, g = i ? u : `${p}px`) : l === "left" && (h = `${r.floating.width + c}px`, g = i ? u : `${p}px`), { data: { x: h, y: g } };
  }
});
function nd(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var rd = Xl, od = Ql, sd = Jl, ad = td, Kb = "Portal", $a = S.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = S.useState(!1);
  Zt(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? sm.createPortal(/* @__PURE__ */ f(Fe.div, { ...r, ref: t }), i) : null;
});
$a.displayName = Kb;
function Vb(e, t) {
  return S.useReducer((n, r) => t[n][r] ?? n, e);
}
var hn = (e) => {
  const { present: t, children: n } = e, r = Gb(t), o = typeof n == "function" ? n({ present: r.isPresent }) : S.Children.only(n), s = je(r.ref, qb(o));
  return typeof n == "function" || r.isPresent ? S.cloneElement(o, { ref: s }) : null;
};
hn.displayName = "Presence";
function Gb(e) {
  const [t, n] = S.useState(), r = S.useRef(null), o = S.useRef(e), s = S.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = Vb(i, {
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
    const l = eo(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), Zt(() => {
    const l = r.current, d = o.current;
    if (d !== e) {
      const m = s.current, p = eo(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(d && m !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Zt(() => {
    if (t) {
      let l;
      const d = t.ownerDocument.defaultView ?? window, u = (p) => {
        const g = eo(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, m = (p) => {
        p.target === t && (s.current = eo(r.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        d.clearTimeout(l), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
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
function eo(e) {
  return e?.animationName || "none";
}
function qb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var xs = "rovingFocusGroup.onEntryFocus", Xb = { bubbles: !1, cancelable: !0 }, Rr = "RovingFocusGroup", [Ks, id, Zb] = Rl(Rr), [Qb, cd] = Qn(
  Rr,
  [Zb]
), [Jb, ew] = Qb(Rr), ld = S.forwardRef(
  (e, t) => /* @__PURE__ */ f(Ks.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(Ks.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(tw, { ...e, ref: t }) }) })
);
ld.displayName = Rr;
var tw = S.forwardRef((e, t) => {
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
  } = e, m = S.useRef(null), p = je(t, m), h = Al(s), [g, y] = Ea({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: Rr
  }), [b, v] = S.useState(!1), w = It(l), M = id(n), x = S.useRef(!1), [C, D] = S.useState(0);
  return S.useEffect(() => {
    const k = m.current;
    if (k)
      return k.addEventListener(xs, w), () => k.removeEventListener(xs, w);
  }, [w]), /* @__PURE__ */ f(
    Jb,
    {
      scope: n,
      orientation: r,
      dir: h,
      loop: o,
      currentTabStopId: g,
      onItemFocus: S.useCallback(
        (k) => y(k),
        [y]
      ),
      onItemShiftTab: S.useCallback(() => v(!0), []),
      onFocusableItemAdd: S.useCallback(
        () => D((k) => k + 1),
        []
      ),
      onFocusableItemRemove: S.useCallback(
        () => D((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ f(
        Fe.div,
        {
          tabIndex: b || C === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: fe(e.onMouseDown, () => {
            x.current = !0;
          }),
          onFocus: fe(e.onFocus, (k) => {
            const T = !x.current;
            if (k.target === k.currentTarget && T && !b) {
              const E = new CustomEvent(xs, Xb);
              if (k.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
                const N = M().filter((B) => B.focusable), R = N.find((B) => B.active), I = N.find((B) => B.id === g), H = [R, I, ...N].filter(
                  Boolean
                ).map((B) => B.ref.current);
                fd(H, d);
              }
            }
            x.current = !1;
          }),
          onBlur: fe(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), dd = "RovingFocusGroupItem", ud = S.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = go(), l = s || c, d = ew(dd, n), u = d.currentTabStopId === l, m = id(n), { onFocusableItemAdd: p, onFocusableItemRemove: h, currentTabStopId: g } = d;
    return S.useEffect(() => {
      if (r)
        return p(), () => h();
    }, [r, p, h]), /* @__PURE__ */ f(
      Ks.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ f(
          Fe.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...a,
            ref: t,
            onMouseDown: fe(e.onMouseDown, (y) => {
              r ? d.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: fe(e.onFocus, () => d.onItemFocus(l)),
            onKeyDown: fe(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const b = ow(y, d.orientation, d.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = m().filter((M) => M.focusable).map((M) => M.ref.current);
                if (b === "last") w.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && w.reverse();
                  const M = w.indexOf(y.currentTarget);
                  w = d.loop ? sw(w, M + 1) : w.slice(M + 1);
                }
                setTimeout(() => fd(w));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: g != null }) : i
          }
        )
      }
    );
  }
);
ud.displayName = dd;
var nw = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function rw(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function ow(e, t, n) {
  const r = rw(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return nw[r];
}
function fd(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function sw(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var aw = ld, iw = ud, cw = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Tn = /* @__PURE__ */ new WeakMap(), to = /* @__PURE__ */ new WeakMap(), no = {}, ks = 0, md = function(e) {
  return e && (e.host || md(e.parentNode));
}, lw = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = md(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, dw = function(e, t, n, r) {
  var o = lw(t, Array.isArray(e) ? e : [e]);
  no[n] || (no[n] = /* @__PURE__ */ new WeakMap());
  var s = no[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(u) {
    !u || a.has(u) || (a.add(u), l(u.parentNode));
  };
  o.forEach(l);
  var d = function(u) {
    !u || c.has(u) || Array.prototype.forEach.call(u.children, function(m) {
      if (a.has(m))
        d(m);
      else
        try {
          var p = m.getAttribute(r), h = p !== null && p !== "false", g = (Tn.get(m) || 0) + 1, y = (s.get(m) || 0) + 1;
          Tn.set(m, g), s.set(m, y), i.push(m), g === 1 && h && to.set(m, !0), y === 1 && m.setAttribute(n, "true"), h || m.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", m, b);
        }
    });
  };
  return d(t), a.clear(), ks++, function() {
    i.forEach(function(u) {
      var m = Tn.get(u) - 1, p = s.get(u) - 1;
      Tn.set(u, m), s.set(u, p), m || (to.has(u) || u.removeAttribute(r), to.delete(u)), p || u.removeAttribute(n);
    }), ks--, ks || (Tn = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), to = /* @__PURE__ */ new WeakMap(), no = {});
  };
}, uw = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = cw(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), dw(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, pt = function() {
  return pt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, pt.apply(this, arguments);
};
function pd(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function fw(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var mo = "right-scroll-bar-position", po = "width-before-scroll-bar", mw = "with-scroll-bars-hidden", pw = "--removed-body-scroll-bar-size";
function Cs(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function hw(e, t) {
  var n = K(function() {
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
var gw = typeof window < "u" ? S.useLayoutEffect : S.useEffect, Qi = /* @__PURE__ */ new WeakMap();
function yw(e, t) {
  var n = hw(null, function(r) {
    return e.forEach(function(o) {
      return Cs(o, r);
    });
  });
  return gw(function() {
    var r = Qi.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Cs(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Cs(a, i);
      });
    }
    Qi.set(n, e);
  }, [e]), n;
}
function vw(e) {
  return e;
}
function bw(e, t) {
  t === void 0 && (t = vw);
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
function ww(e) {
  e === void 0 && (e = {});
  var t = bw(null);
  return t.options = pt({ async: !0, ssr: !1 }, e), t;
}
var hd = function(e) {
  var t = e.sideCar, n = pd(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return S.createElement(r, pt({}, n));
};
hd.isSideCarExport = !0;
function xw(e, t) {
  return e.useMedium(t), hd;
}
var gd = ww(), Ms = function() {
}, zo = S.forwardRef(function(e, t) {
  var n = S.useRef(null), r = S.useState({
    onScrollCapture: Ms,
    onWheelCapture: Ms,
    onTouchMoveCapture: Ms
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, u = e.shards, m = e.sideCar, p = e.noRelative, h = e.noIsolation, g = e.inert, y = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, w = e.gapMode, M = pd(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), x = m, C = yw([n, t]), D = pt(pt({}, M), o);
  return S.createElement(
    S.Fragment,
    null,
    d && S.createElement(x, { sideCar: gd, removeScrollBar: l, shards: u, noRelative: p, noIsolation: h, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    i ? S.cloneElement(S.Children.only(a), pt(pt({}, D), { ref: C })) : S.createElement(v, pt({}, D, { className: c, ref: C }), a)
  );
});
zo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
zo.classNames = {
  fullWidth: po,
  zeroRight: mo
};
var kw = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Cw() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = kw();
  return t && e.setAttribute("nonce", t), e;
}
function Mw(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Sw(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Tw = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Cw()) && (Mw(t, n), Sw(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Ew = function() {
  var e = Tw();
  return function(t, n) {
    S.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, yd = function() {
  var e = Ew(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Dw = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ss = function(e) {
  return parseInt(e || "", 10) || 0;
}, Nw = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ss(n), Ss(r), Ss(o)];
}, Rw = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Dw;
  var t = Nw(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Aw = yd(), Wn = "data-scroll-locked", Lw = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(mw, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(Wn, `] {
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
  
  .`).concat(mo, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(po, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(mo, " .").concat(mo, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(po, " .").concat(po, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Wn, `] {
    `).concat(pw, ": ").concat(a, `px;
  }
`);
}, Ji = function() {
  var e = parseInt(document.body.getAttribute(Wn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Pw = function() {
  S.useEffect(function() {
    return document.body.setAttribute(Wn, (Ji() + 1).toString()), function() {
      var e = Ji() - 1;
      e <= 0 ? document.body.removeAttribute(Wn) : document.body.setAttribute(Wn, e.toString());
    };
  }, []);
}, Iw = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Pw();
  var s = S.useMemo(function() {
    return Rw(o);
  }, [o]);
  return S.createElement(Aw, { styles: Lw(s, !t, o, n ? "" : "!important") });
}, Vs = !1;
if (typeof window < "u")
  try {
    var ro = Object.defineProperty({}, "passive", {
      get: function() {
        return Vs = !0, !0;
      }
    });
    window.addEventListener("test", ro, ro), window.removeEventListener("test", ro, ro);
  } catch {
    Vs = !1;
  }
var En = Vs ? { passive: !1 } : !1, Ow = function(e) {
  return e.tagName === "TEXTAREA";
}, vd = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Ow(e) && n[t] === "visible")
  );
}, _w = function(e) {
  return vd(e, "overflowY");
}, $w = function(e) {
  return vd(e, "overflowX");
}, ec = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = bd(e, r);
    if (o) {
      var s = wd(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Hw = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Ww = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, bd = function(e, t) {
  return e === "v" ? _w(t) : $w(t);
}, wd = function(e, t) {
  return e === "v" ? Hw(t) : Ww(t);
}, zw = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Bw = function(e, t, n, r, o) {
  var s = zw(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, d = i > 0, u = 0, m = 0;
  do {
    if (!a)
      break;
    var p = wd(e, a), h = p[0], g = p[1], y = p[2], b = g - y - s * h;
    (h || b) && bd(e, a) && (u += b, m += h);
    var v = a.parentNode;
    a = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(m) < 1) && (l = !0), l;
}, oo = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, tc = function(e) {
  return [e.deltaX, e.deltaY];
}, nc = function(e) {
  return e && "current" in e ? e.current : e;
}, Fw = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Uw = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Yw = 0, Dn = [];
function jw(e) {
  var t = S.useRef([]), n = S.useRef([0, 0]), r = S.useRef(), o = S.useState(Yw++)[0], s = S.useState(yd)[0], i = S.useRef(e);
  S.useEffect(function() {
    i.current = e;
  }, [e]), S.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = fw([e.lockRef.current], (e.shards || []).map(nc), !0).filter(Boolean);
      return g.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = S.useCallback(function(g, y) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !i.current.allowPinchZoom;
    var b = oo(g), v = n.current, w = "deltaX" in g ? g.deltaX : v[0] - b[0], M = "deltaY" in g ? g.deltaY : v[1] - b[1], x, C = g.target, D = Math.abs(w) > Math.abs(M) ? "h" : "v";
    if ("touches" in g && D === "h" && C.type === "range")
      return !1;
    var k = ec(D, C);
    if (!k)
      return !0;
    if (k ? x = D : (x = D === "v" ? "h" : "v", k = ec(D, C)), !k)
      return !1;
    if (!r.current && "changedTouches" in g && (w || M) && (r.current = x), !x)
      return !0;
    var T = r.current || x;
    return Bw(T, y, g, T === "h" ? w : M);
  }, []), c = S.useCallback(function(g) {
    var y = g;
    if (!(!Dn.length || Dn[Dn.length - 1] !== s)) {
      var b = "deltaY" in y ? tc(y) : oo(y), v = t.current.filter(function(x) {
        return x.name === y.type && (x.target === y.target || y.target === x.shadowParent) && Fw(x.delta, b);
      })[0];
      if (v && v.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!v) {
        var w = (i.current.shards || []).map(nc).filter(Boolean).filter(function(x) {
          return x.contains(y.target);
        }), M = w.length > 0 ? a(y, w[0]) : !i.current.noIsolation;
        M && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = S.useCallback(function(g, y, b, v) {
    var w = { name: g, delta: y, target: b, should: v, shadowParent: Kw(b) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== w;
      });
    }, 1);
  }, []), d = S.useCallback(function(g) {
    n.current = oo(g), r.current = void 0;
  }, []), u = S.useCallback(function(g) {
    l(g.type, tc(g), g.target, a(g, e.lockRef.current));
  }, []), m = S.useCallback(function(g) {
    l(g.type, oo(g), g.target, a(g, e.lockRef.current));
  }, []);
  S.useEffect(function() {
    return Dn.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", c, En), document.addEventListener("touchmove", c, En), document.addEventListener("touchstart", d, En), function() {
      Dn = Dn.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", c, En), document.removeEventListener("touchmove", c, En), document.removeEventListener("touchstart", d, En);
    };
  }, []);
  var p = e.removeScrollBar, h = e.inert;
  return S.createElement(
    S.Fragment,
    null,
    h ? S.createElement(s, { styles: Uw(o) }) : null,
    p ? S.createElement(Iw, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Kw(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Vw = xw(gd, jw);
var xd = S.forwardRef(function(e, t) {
  return S.createElement(zo, pt({}, e, { ref: t, sideCar: Vw }));
});
xd.classNames = zo.classNames;
var Gs = ["Enter", " "], Gw = ["ArrowDown", "PageUp", "Home"], kd = ["ArrowUp", "PageDown", "End"], qw = [...Gw, ...kd], Xw = {
  ltr: [...Gs, "ArrowRight"],
  rtl: [...Gs, "ArrowLeft"]
}, Zw = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Ar = "Menu", [Cr, Qw, Jw] = Rl(Ar), [gn, Cd] = Qn(Ar, [
  Jw,
  Wo,
  cd
]), Bo = Wo(), Md = cd(), [e0, yn] = gn(Ar), [t0, Lr] = gn(Ar), Sd = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Bo(t), [c, l] = S.useState(null), d = S.useRef(!1), u = It(s), m = Al(o);
  return S.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ f(rd, { ...a, children: /* @__PURE__ */ f(
    e0,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ f(
        t0,
        {
          scope: t,
          onClose: S.useCallback(() => u(!1), [u]),
          isUsingKeyboardRef: d,
          dir: m,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
Sd.displayName = Ar;
var n0 = "MenuAnchor", Ha = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Bo(n);
    return /* @__PURE__ */ f(od, { ...o, ...r, ref: t });
  }
);
Ha.displayName = n0;
var Wa = "MenuPortal", [r0, Td] = gn(Wa, {
  forceMount: void 0
}), Ed = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = yn(Wa, t);
  return /* @__PURE__ */ f(r0, { scope: t, forceMount: n, children: /* @__PURE__ */ f(hn, { present: n || s.open, children: /* @__PURE__ */ f($a, { asChild: !0, container: o, children: r }) }) });
};
Ed.displayName = Wa;
var at = "MenuContent", [o0, za] = gn(at), Dd = S.forwardRef(
  (e, t) => {
    const n = Td(at, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = yn(at, e.__scopeMenu), i = Lr(at, e.__scopeMenu);
    return /* @__PURE__ */ f(Cr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(hn, { present: r || s.open, children: /* @__PURE__ */ f(Cr.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ f(s0, { ...o, ref: t }) : /* @__PURE__ */ f(a0, { ...o, ref: t }) }) }) });
  }
), s0 = S.forwardRef(
  (e, t) => {
    const n = yn(at, e.__scopeMenu), r = S.useRef(null), o = je(t, r);
    return S.useEffect(() => {
      const s = r.current;
      if (s) return uw(s);
    }, []), /* @__PURE__ */ f(
      Ba,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: fe(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), a0 = S.forwardRef((e, t) => {
  const n = yn(at, e.__scopeMenu);
  return /* @__PURE__ */ f(
    Ba,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), i0 = /* @__PURE__ */ wr("MenuContent.ScrollLock"), Ba = S.forwardRef(
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
      onInteractOutside: m,
      onDismiss: p,
      disableOutsideScroll: h,
      ...g
    } = e, y = yn(at, n), b = Lr(at, n), v = Bo(n), w = Md(n), M = Qw(n), [x, C] = S.useState(null), D = S.useRef(null), k = je(t, D, y.onContentChange), T = S.useRef(0), E = S.useRef(""), N = S.useRef(0), R = S.useRef(null), I = S.useRef("right"), O = S.useRef(0), H = h ? xd : S.Fragment, B = h ? { as: i0, allowPinchZoom: !0 } : void 0, q = (L) => {
      const U = E.current + L, X = M().filter((j) => !j.disabled), G = document.activeElement, Z = X.find((j) => j.ref.current === G)?.textValue, te = X.map((j) => j.textValue), $ = b0(te, U, Z), z = X.find((j) => j.textValue === $)?.ref.current;
      (function j(ee) {
        E.current = ee, window.clearTimeout(T.current), ee !== "" && (T.current = window.setTimeout(() => j(""), 1e3));
      })(U), z && setTimeout(() => z.focus());
    };
    S.useEffect(() => () => window.clearTimeout(T.current), []), yv();
    const P = S.useCallback((L) => I.current === R.current?.side && x0(L, R.current?.area), []);
    return /* @__PURE__ */ f(
      o0,
      {
        scope: n,
        searchRef: E,
        onItemEnter: S.useCallback(
          (L) => {
            P(L) && L.preventDefault();
          },
          [P]
        ),
        onItemLeave: S.useCallback(
          (L) => {
            P(L) || (D.current?.focus(), C(null));
          },
          [P]
        ),
        onTriggerLeave: S.useCallback(
          (L) => {
            P(L) && L.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: N,
        onPointerGraceIntentChange: S.useCallback((L) => {
          R.current = L;
        }, []),
        children: /* @__PURE__ */ f(H, { ...B, children: /* @__PURE__ */ f(
          Il,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: fe(s, (L) => {
              L.preventDefault(), D.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ f(
              Da,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: d,
                onFocusOutside: u,
                onInteractOutside: m,
                onDismiss: p,
                children: /* @__PURE__ */ f(
                  aw,
                  {
                    asChild: !0,
                    ...w,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: x,
                    onCurrentTabStopIdChange: C,
                    onEntryFocus: fe(c, (L) => {
                      b.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ f(
                      sd,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Yd(y.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...g,
                        ref: k,
                        style: { outline: "none", ...g.style },
                        onKeyDown: fe(g.onKeyDown, (L) => {
                          const X = L.target.closest("[data-radix-menu-content]") === L.currentTarget, G = L.ctrlKey || L.altKey || L.metaKey, Z = L.key.length === 1;
                          X && (L.key === "Tab" && L.preventDefault(), !G && Z && q(L.key));
                          const te = D.current;
                          if (L.target !== te || !qw.includes(L.key)) return;
                          L.preventDefault();
                          const z = M().filter((j) => !j.disabled).map((j) => j.ref.current);
                          kd.includes(L.key) && z.reverse(), y0(z);
                        }),
                        onBlur: fe(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(T.current), E.current = "");
                        }),
                        onPointerMove: fe(
                          e.onPointerMove,
                          Mr((L) => {
                            const U = L.target, X = O.current !== L.clientX;
                            if (L.currentTarget.contains(U) && X) {
                              const G = L.clientX > O.current ? "right" : "left";
                              I.current = G, O.current = L.clientX;
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
Dd.displayName = at;
var c0 = "MenuGroup", Fa = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(Fe.div, { role: "group", ...r, ref: t });
  }
);
Fa.displayName = c0;
var l0 = "MenuLabel", Nd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(Fe.div, { ...r, ref: t });
  }
);
Nd.displayName = l0;
var xo = "MenuItem", rc = "menu.itemSelect", Fo = S.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = S.useRef(null), i = Lr(xo, e.__scopeMenu), a = za(xo, e.__scopeMenu), c = je(t, s), l = S.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const m = new CustomEvent(rc, { bubbles: !0, cancelable: !0 });
        u.addEventListener(rc, (p) => r?.(p), { once: !0 }), Nl(u, m), m.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ f(
      Rd,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: fe(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), l.current = !0;
        },
        onPointerUp: fe(e.onPointerUp, (u) => {
          l.current || u.currentTarget?.click();
        }),
        onKeyDown: fe(e.onKeyDown, (u) => {
          const m = a.searchRef.current !== "";
          n || m && u.key === " " || Gs.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
Fo.displayName = xo;
var Rd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = za(xo, n), a = Md(n), c = S.useRef(null), l = je(t, c), [d, u] = S.useState(!1), [m, p] = S.useState("");
    return S.useEffect(() => {
      const h = c.current;
      h && p((h.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ f(
      Cr.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? m,
        children: /* @__PURE__ */ f(iw, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ f(
          Fe.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: fe(
              e.onPointerMove,
              Mr((h) => {
                r ? i.onItemLeave(h) : (i.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: fe(
              e.onPointerLeave,
              Mr((h) => i.onItemLeave(h))
            ),
            onFocus: fe(e.onFocus, () => u(!0)),
            onBlur: fe(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), d0 = "MenuCheckboxItem", Ad = S.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ f(_d, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ f(
      Fo,
      {
        role: "menuitemcheckbox",
        "aria-checked": ko(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": Ya(n),
        onSelect: fe(
          o.onSelect,
          () => r?.(ko(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Ad.displayName = d0;
var Ld = "MenuRadioGroup", [u0, f0] = gn(
  Ld,
  { value: void 0, onValueChange: () => {
  } }
), Pd = S.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = It(r);
    return /* @__PURE__ */ f(u0, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ f(Fa, { ...o, ref: t }) });
  }
);
Pd.displayName = Ld;
var Id = "MenuRadioItem", Od = S.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = f0(Id, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ f(_d, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ f(
      Fo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": Ya(s),
        onSelect: fe(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Od.displayName = Id;
var Ua = "MenuItemIndicator", [_d, m0] = gn(
  Ua,
  { checked: !1 }
), $d = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = m0(Ua, n);
    return /* @__PURE__ */ f(
      hn,
      {
        present: r || ko(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ f(
          Fe.span,
          {
            ...o,
            ref: t,
            "data-state": Ya(s.checked)
          }
        )
      }
    );
  }
);
$d.displayName = Ua;
var p0 = "MenuSeparator", Hd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(
      Fe.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Hd.displayName = p0;
var h0 = "MenuArrow", Wd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Bo(n);
    return /* @__PURE__ */ f(ad, { ...o, ...r, ref: t });
  }
);
Wd.displayName = h0;
var g0 = "MenuSub", [fC, zd] = gn(g0), mr = "MenuSubTrigger", Bd = S.forwardRef(
  (e, t) => {
    const n = yn(mr, e.__scopeMenu), r = Lr(mr, e.__scopeMenu), o = zd(mr, e.__scopeMenu), s = za(mr, e.__scopeMenu), i = S.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, d = S.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return S.useEffect(() => d, [d]), S.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), c(null);
      };
    }, [a, c]), /* @__PURE__ */ f(Ha, { asChild: !0, ...l, children: /* @__PURE__ */ f(
      Rd,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Yd(n.open),
        ...e,
        ref: Po(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: fe(
          e.onPointerMove,
          Mr((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: fe(
          e.onPointerLeave,
          Mr((u) => {
            d();
            const m = n.content?.getBoundingClientRect();
            if (m) {
              const p = n.content?.dataset.side, h = p === "right", g = h ? -5 : 5, y = m[h ? "left" : "right"], b = m[h ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: u.clientX + g, y: u.clientY },
                  { x: y, y: m.top },
                  { x: b, y: m.top },
                  { x: b, y: m.bottom },
                  { x: y, y: m.bottom }
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
        onKeyDown: fe(e.onKeyDown, (u) => {
          const m = s.searchRef.current !== "";
          e.disabled || m && u.key === " " || Xw[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Bd.displayName = mr;
var Fd = "MenuSubContent", Ud = S.forwardRef(
  (e, t) => {
    const n = Td(at, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = yn(at, e.__scopeMenu), i = Lr(at, e.__scopeMenu), a = zd(Fd, e.__scopeMenu), c = S.useRef(null), l = je(t, c);
    return /* @__PURE__ */ f(Cr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(hn, { present: r || s.open, children: /* @__PURE__ */ f(Cr.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(
      Ba,
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
        onFocusOutside: fe(e.onFocusOutside, (d) => {
          d.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: fe(e.onEscapeKeyDown, (d) => {
          i.onClose(), d.preventDefault();
        }),
        onKeyDown: fe(e.onKeyDown, (d) => {
          const u = d.currentTarget.contains(d.target), m = Zw[i.dir].includes(d.key);
          u && m && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
Ud.displayName = Fd;
function Yd(e) {
  return e ? "open" : "closed";
}
function ko(e) {
  return e === "indeterminate";
}
function Ya(e) {
  return ko(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function y0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function v0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function b0(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = v0(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function w0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, m = c.y;
    d > r != m > r && n < (u - l) * (r - d) / (m - d) + l && (o = !o);
  }
  return o;
}
function x0(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return w0(n, t);
}
function Mr(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var k0 = Sd, C0 = Ha, M0 = Ed, S0 = Dd, T0 = Fa, E0 = Nd, D0 = Fo, N0 = Ad, R0 = Pd, A0 = Od, L0 = $d, P0 = Hd, I0 = Wd, O0 = Bd, _0 = Ud, Uo = "DropdownMenu", [$0] = Qn(
  Uo,
  [Cd]
), Ge = Cd(), [H0, jd] = $0(Uo), Kd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = Ge(t), l = S.useRef(null), [d, u] = Ea({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: Uo
  });
  return /* @__PURE__ */ f(
    H0,
    {
      scope: t,
      triggerId: go(),
      triggerRef: l,
      contentId: go(),
      open: d,
      onOpenChange: u,
      onOpenToggle: S.useCallback(() => u((m) => !m), [u]),
      modal: a,
      children: /* @__PURE__ */ f(k0, { ...c, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
Kd.displayName = Uo;
var Vd = "DropdownMenuTrigger", Gd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = jd(Vd, n), i = Ge(n);
    return /* @__PURE__ */ f(C0, { asChild: !0, ...i, children: /* @__PURE__ */ f(
      Fe.button,
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
        ref: Po(t, s.triggerRef),
        onPointerDown: fe(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: fe(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
Gd.displayName = Vd;
var W0 = "DropdownMenuPortal", qd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ge(t);
  return /* @__PURE__ */ f(M0, { ...r, ...n });
};
qd.displayName = W0;
var Xd = "DropdownMenuContent", Zd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = jd(Xd, n), s = Ge(n), i = S.useRef(!1);
    return /* @__PURE__ */ f(
      S0,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: fe(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: fe(e.onInteractOutside, (a) => {
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
Zd.displayName = Xd;
var z0 = "DropdownMenuGroup", B0 = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
    return /* @__PURE__ */ f(T0, { ...o, ...r, ref: t });
  }
);
B0.displayName = z0;
var F0 = "DropdownMenuLabel", U0 = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
    return /* @__PURE__ */ f(E0, { ...o, ...r, ref: t });
  }
);
U0.displayName = F0;
var Y0 = "DropdownMenuItem", Qd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
    return /* @__PURE__ */ f(D0, { ...o, ...r, ref: t });
  }
);
Qd.displayName = Y0;
var j0 = "DropdownMenuCheckboxItem", K0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(N0, { ...o, ...r, ref: t });
});
K0.displayName = j0;
var V0 = "DropdownMenuRadioGroup", G0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(R0, { ...o, ...r, ref: t });
});
G0.displayName = V0;
var q0 = "DropdownMenuRadioItem", X0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(A0, { ...o, ...r, ref: t });
});
X0.displayName = q0;
var Z0 = "DropdownMenuItemIndicator", Q0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(L0, { ...o, ...r, ref: t });
});
Q0.displayName = Z0;
var J0 = "DropdownMenuSeparator", Jd = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(P0, { ...o, ...r, ref: t });
});
Jd.displayName = J0;
var ex = "DropdownMenuArrow", tx = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
    return /* @__PURE__ */ f(I0, { ...o, ...r, ref: t });
  }
);
tx.displayName = ex;
var nx = "DropdownMenuSubTrigger", rx = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(O0, { ...o, ...r, ref: t });
});
rx.displayName = nx;
var ox = "DropdownMenuSubContent", sx = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(
    _0,
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
sx.displayName = ox;
var ax = Kd, ix = Gd, cx = qd, lx = Zd, dx = Qd, ux = Jd;
function Ts({
  ...e
}) {
  return /* @__PURE__ */ f(ax, { "data-slot": "dropdown-menu", ...e });
}
function Es({
  ...e
}) {
  return /* @__PURE__ */ f(
    ix,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function Ds({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ f(cx, { children: /* @__PURE__ */ f(
    lx,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: de(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function Pe({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ f(
    dx,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: de(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    }
  );
}
function Ns({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    ux,
    {
      "data-slot": "dropdown-menu-separator",
      className: de("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var fx = Object.freeze({
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
}), mx = "VisuallyHidden", eu = S.forwardRef(
  (e, t) => /* @__PURE__ */ f(
    Fe.span,
    {
      ...e,
      ref: t,
      style: { ...fx, ...e.style }
    }
  )
);
eu.displayName = mx;
var px = eu, [Yo] = Qn("Tooltip", [
  Wo
]), jo = Wo(), tu = "TooltipProvider", hx = 700, qs = "tooltip.open", [gx, ja] = Yo(tu), nu = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = hx,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = S.useRef(!0), a = S.useRef(!1), c = S.useRef(0);
  return S.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ f(
    gx,
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
nu.displayName = tu;
var Sr = "Tooltip", [yx, Pr] = Yo(Sr), ru = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = ja(Sr, e.__scopeTooltip), l = jo(t), [d, u] = S.useState(null), m = go(), p = S.useRef(0), h = i ?? c.disableHoverableContent, g = a ?? c.delayDuration, y = S.useRef(!1), [b, v] = Ea({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (c.onOpen(), document.dispatchEvent(new CustomEvent(qs))) : c.onClose(), s?.(D);
    },
    caller: Sr
  }), w = S.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), M = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, v(!0);
  }, [v]), x = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v(!1);
  }, [v]), C = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, v(!0), p.current = 0;
    }, g);
  }, [g, v]);
  return S.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ f(rd, { ...l, children: /* @__PURE__ */ f(
    yx,
    {
      scope: t,
      contentId: m,
      open: b,
      stateAttribute: w,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: S.useCallback(() => {
        c.isOpenDelayedRef.current ? C() : M();
      }, [c.isOpenDelayedRef, C, M]),
      onTriggerLeave: S.useCallback(() => {
        h ? x() : (window.clearTimeout(p.current), p.current = 0);
      }, [x, h]),
      onOpen: M,
      onClose: x,
      disableHoverableContent: h,
      children: n
    }
  ) });
};
ru.displayName = Sr;
var Xs = "TooltipTrigger", ou = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Pr(Xs, n), s = ja(Xs, n), i = jo(n), a = S.useRef(null), c = je(t, a, o.onTriggerChange), l = S.useRef(!1), d = S.useRef(!1), u = S.useCallback(() => l.current = !1, []);
    return S.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ f(od, { asChild: !0, ...i, children: /* @__PURE__ */ f(
      Fe.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: fe(e.onPointerMove, (m) => {
          m.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: fe(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: fe(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", u, { once: !0 });
        }),
        onFocus: fe(e.onFocus, () => {
          l.current || o.onOpen();
        }),
        onBlur: fe(e.onBlur, o.onClose),
        onClick: fe(e.onClick, o.onClose)
      }
    ) });
  }
);
ou.displayName = Xs;
var Ka = "TooltipPortal", [vx, bx] = Yo(Ka, {
  forceMount: void 0
}), su = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = Pr(Ka, t);
  return /* @__PURE__ */ f(vx, { scope: t, forceMount: n, children: /* @__PURE__ */ f(hn, { present: n || s.open, children: /* @__PURE__ */ f($a, { asChild: !0, container: o, children: r }) }) });
};
su.displayName = Ka;
var Yn = "TooltipContent", au = S.forwardRef(
  (e, t) => {
    const n = bx(Yn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = Pr(Yn, e.__scopeTooltip);
    return /* @__PURE__ */ f(hn, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ f(iu, { side: o, ...s, ref: t }) : /* @__PURE__ */ f(wx, { side: o, ...s, ref: t }) });
  }
), wx = S.forwardRef((e, t) => {
  const n = Pr(Yn, e.__scopeTooltip), r = ja(Yn, e.__scopeTooltip), o = S.useRef(null), s = je(t, o), [i, a] = S.useState(null), { trigger: c, onClose: l } = n, d = o.current, { onPointerInTransitChange: u } = r, m = S.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = S.useCallback(
    (h, g) => {
      const y = h.currentTarget, b = { x: h.clientX, y: h.clientY }, v = Mx(b, y.getBoundingClientRect()), w = Sx(b, v), M = Tx(g.getBoundingClientRect()), x = Dx([...w, ...M]);
      a(x), u(!0);
    },
    [u]
  );
  return S.useEffect(() => () => m(), [m]), S.useEffect(() => {
    if (c && d) {
      const h = (y) => p(y, d), g = (y) => p(y, c);
      return c.addEventListener("pointerleave", h), d.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", h), d.removeEventListener("pointerleave", g);
      };
    }
  }, [c, d, p, m]), S.useEffect(() => {
    if (i) {
      const h = (g) => {
        const y = g.target, b = { x: g.clientX, y: g.clientY }, v = c?.contains(y) || d?.contains(y), w = !Ex(b, i);
        v ? m() : w && (m(), l());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [c, d, i, l, m]), /* @__PURE__ */ f(iu, { ...e, ref: s });
}), [xx, kx] = Yo(Sr, { isInside: !1 }), Cx = /* @__PURE__ */ Dy("TooltipContent"), iu = S.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = Pr(Yn, n), l = jo(n), { onClose: d } = c;
    return S.useEffect(() => (document.addEventListener(qs, d), () => document.removeEventListener(qs, d)), [d]), S.useEffect(() => {
      if (c.trigger) {
        const u = (m) => {
          m.target?.contains(c.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [c.trigger, d]), /* @__PURE__ */ f(
      Da,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ A(
          sd,
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
              /* @__PURE__ */ f(Cx, { children: r }),
              /* @__PURE__ */ f(xx, { scope: n, isInside: !0, children: /* @__PURE__ */ f(px, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
au.displayName = Yn;
var cu = "TooltipArrow", lu = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = jo(n);
    return kx(
      cu,
      n
    ).isInside ? null : /* @__PURE__ */ f(ad, { ...o, ...r, ref: t });
  }
);
lu.displayName = cu;
function Mx(e, t) {
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
function Sx(e, t, n = 5) {
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
function Tx(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function Ex(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, m = c.y;
    d > r != m > r && n < (u - l) * (r - d) / (m - d) + l && (o = !o);
  }
  return o;
}
function Dx(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Nx(t);
}
function Nx(e) {
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
var Rx = nu, Ax = ru, Lx = ou, Px = su, Ix = au, Ox = lu;
function _x({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ f(
    Rx,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Zs({
  ...e
}) {
  return /* @__PURE__ */ f(_x, { children: /* @__PURE__ */ f(Ax, { "data-slot": "tooltip", ...e }) });
}
function Qs({
  ...e
}) {
  return /* @__PURE__ */ f(Lx, { "data-slot": "tooltip-trigger", ...e });
}
function Js({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ f(Px, { children: /* @__PURE__ */ A(
    Ix,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: de(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ f(Ox, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const Ie = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
  const s = /* @__PURE__ */ f(
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
      children: r
    }
  );
  return o ? /* @__PURE__ */ A(Zs, { children: [
    /* @__PURE__ */ f(Qs, { asChild: !0, children: s }),
    /* @__PURE__ */ f(Js, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, Nn = () => /* @__PURE__ */ f("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), $x = Kn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = V(null), [l, d] = K(!1), [u, m] = K(void 0), p = gc({
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
  }), h = Y(() => {
    const { view: C } = t, { from: D } = C.state.selection, k = C.coordsAtPos(D);
    m({ top: k.bottom + 8, left: k.left }), d(!0);
  }, [t]), g = Y((C, D) => {
    t.chain().focus().setImage({ src: C, alt: D }).run(), d(!1);
  }, [t]), y = Y(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = Y((C) => {
    t.chain().focus().insertCallout({ type: C }).run();
  }, [t]), v = V(/* @__PURE__ */ new Map()), w = V(/* @__PURE__ */ new Map()), M = Y((C) => {
    const { doc: D, tr: k } = C.state;
    let T = !1;
    const E = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = C.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), N.forEach((I, O) => {
      I.querySelectorAll(":scope > li").forEach((B) => {
        const q = B, P = (q.textContent || "").trim().substring(0, 50);
        v.current.set(`${O}-${P}`, q.getBoundingClientRect());
      });
    });
    const R = [];
    D.descendants((I, O, H, B) => {
      if (!E.has(I.type.name)) return !0;
      let q = !1;
      if (I.forEach((L) => {
        L.type.name === "taskItem" && (q = !0);
      }), !q) return !0;
      let P = 0;
      return D.nodesBetween(0, O, (L) => (E.has(L.type.name) && P++, !0)), R.push({ node: I, pos: O, depth: P }), !0;
    }), R.sort((I, O) => O.depth - I.depth);
    for (const { node: I, pos: O } of R) {
      const H = [];
      let B = 0;
      I.forEach(($) => {
        H.push({
          node: $,
          isTask: $.type.name === "taskItem",
          checked: $.type.name === "taskItem" && $.attrs.checked === !0,
          originalIndex: B++
        });
      });
      const q = H.filter(($) => $.isTask && !$.checked), P = H.filter(($) => $.isTask && $.checked), L = [...H], U = H.map(($, z) => ({ index: z, isTask: $.isTask })).filter(($) => $.isTask).map(($) => $.index), X = [...q, ...P];
      if (U.forEach(($, z) => {
        L[$] = X[z];
      }), !L.some(($, z) => $.node !== H[z].node)) continue;
      const Z = I.type.create(
        I.attrs,
        L.map(($) => $.node)
      ), te = k.mapping.map(O);
      k.replaceWith(te, te + I.nodeSize, Z), T = !0;
    }
    T && (C.view.dispatch(k), requestAnimationFrame(() => {
      C.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const H = O.querySelectorAll(":scope > li"), B = /* @__PURE__ */ new Map();
        v.current.forEach((q, P) => {
          const L = P.replace(/^\d+-/, "");
          B.set(L, q);
        }), H.forEach((q) => {
          const P = q, L = (P.textContent || "").trim().substring(0, 50), U = B.get(L);
          if (!U) return;
          const X = P.getBoundingClientRect(), G = U.top - X.top;
          if (Math.abs(G) < 2) return;
          P.style.transform = `translateY(${G}px)`, P.style.transition = "none", P.style.zIndex = "1", P.offsetHeight, P.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", P.style.transform = "translateY(0)";
          const Z = () => {
            P.style.transform = "", P.style.transition = "", P.style.zIndex = "", P.removeEventListener("transitionend", Z);
          };
          P.addEventListener("transitionend", Z), setTimeout(Z, 400);
        });
      });
    }));
  }, []);
  J(() => {
    if (!s || !t) return;
    const C = /* @__PURE__ */ new Map();
    t.state.doc.descendants((k, T) => (k.type.name === "taskItem" && C.set(T, k.attrs.checked === !0), !0)), w.current = C;
    const D = ({ transaction: k }) => {
      if (!k.docChanged) return;
      const T = /* @__PURE__ */ new Map();
      t.state.doc.descendants((R, I) => (R.type.name === "taskItem" && T.set(I, R.attrs.checked === !0), !0));
      const E = w.current;
      let N = !1;
      if (E.size > 0 && T.size > 0) {
        let R = 0, I = 0;
        E.forEach((O) => {
          O && R++;
        }), T.forEach((O) => {
          O && I++;
        }), R !== I && (N = !0);
      }
      w.current = T, N && setTimeout(() => {
        M(t);
      }, 150);
    };
    return t.on("transaction", D), () => {
      t.off("transaction", D);
    };
  }, [t, s, M]);
  const x = Y(() => {
    M(t);
  }, [t, M]);
  return /* @__PURE__ */ A("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ f(Nf, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ f(Rf, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Nn, {}),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ f(ra, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ f(oa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ f(sa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ f(aa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ f(wc, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ f(xc, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ f(ia, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Nn, {}),
    /* @__PURE__ */ A(Ts, { children: [
      /* @__PURE__ */ f(Es, { asChild: !0, children: /* @__PURE__ */ A(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${p?.isH1 || p?.isH2 || p?.isH3 || p?.isH4 || p?.isH5 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ f("span", { className: "min-w-[18px] text-center", children: p?.isH1 ? "H1" : p?.isH2 ? "H2" : p?.isH3 ? "H3" : p?.isH4 ? "H4" : p?.isH5 ? "H5" : "P" }),
            /* @__PURE__ */ f(Xt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(Ds, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f(Nn, {}),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ f(la, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ f(da, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ f(ua, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ f(ca, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ f(Tc, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ f(Af, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ f(Lf, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Nn, {}),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ f(Ps, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: h,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ f(pa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ f(Ec, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(Ts, { children: [
      /* @__PURE__ */ f(Es, { asChild: !0, children: /* @__PURE__ */ f(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ f(ho, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ A(Ds, { align: "start", children: [
        /* @__PURE__ */ A(Pe, { onClick: () => b("info"), children: [
          /* @__PURE__ */ f(ho, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ A(Pe, { onClick: () => b("note"), children: [
          /* @__PURE__ */ f(ma, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ A(Pe, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ f(Pf, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ A(Pe, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ f(If, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ A(Pe, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ f(fa, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ A(Ts, { children: [
      /* @__PURE__ */ f(Es, { asChild: !0, children: /* @__PURE__ */ A(
        qt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ f(Ps, { size: 16 }),
            /* @__PURE__ */ f("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(Ds, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ f(ri, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ f(ri, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ f(Pn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ f(Ns, {}),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ f(oi, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ f(oi, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ f(Pn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ f(Ns, {}),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ f(si, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ f(si, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ f(Ns, {}),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ f(Pn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f(
      Dl,
      {
        isOpen: l,
        onClose: () => d(!1),
        onInsert: g,
        position: u
      }
    ),
    /* @__PURE__ */ f(Nn, {}),
    /* @__PURE__ */ f(
      Ie,
      {
        onClick: x,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ f(Of, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ A(He, { children: [
      /* @__PURE__ */ f(Nn, {}),
      /* @__PURE__ */ A(Zs, { children: [
        /* @__PURE__ */ f(Qs, { asChild: !0, children: /* @__PURE__ */ f(
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
            children: /* @__PURE__ */ f(No, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ f(Js, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ A(Zs, { children: [
      /* @__PURE__ */ f(Qs, { asChild: !0, children: /* @__PURE__ */ A(
        qt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ f(Gn, { size: 16 }),
            /* @__PURE__ */ f("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ f(Js, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function Hx({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [d, u] = K(""), [m, p] = K(""), [h, g] = K(!1), [y, b] = K(!1), [v, w] = K(!1), [M, x] = K(!1), [C, D] = K([]), [k, T] = K(0), [E, N] = K(null), [R, I] = K(!1), O = V(!1), H = V(null), B = V(null), q = V(!1);
  J(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const P = Y(() => {
    if (!d || !e) {
      D([]), T(0), N(null);
      return;
    }
    const $ = [];
    let z;
    try {
      if (y)
        z = new RegExp(d, h ? "g" : "gi");
      else {
        let j = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (j = `\\b${j}\\b`), z = new RegExp(j, h ? "g" : "gi");
      }
      N(null);
    } catch (j) {
      N(j.message), D([]);
      return;
    }
    if (l) {
      let j;
      for (; (j = z.exec(i)) !== null; )
        $.push({
          from: j.index,
          to: j.index + j[0].length,
          text: j[0]
        });
    } else {
      const { doc: j } = e.state;
      j.descendants((ee, he) => {
        if (ee.isText && ee.text) {
          let ve;
          for (; (ve = z.exec(ee.text)) !== null; )
            $.push({
              from: he + ve.index,
              to: he + ve.index + ve[0].length,
              text: ve[0]
            });
        }
        return !0;
      });
    }
    D($), $.length > 0 && k >= $.length && T(0);
  }, [d, h, y, v, e, k, l, i]);
  J(() => {
    P();
  }, [P]), J(() => {
    l && c && (t && C.length > 0 ? c(C, k) : c([], 0));
  }, [l, t, C, k, c]), J(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const $ = typeof e.commands.setSearchHighlight == "function";
    t && d && $ ? e.commands.setSearchHighlight({
      searchTerm: d,
      caseSensitive: h,
      useRegex: y,
      currentMatchIndex: k
    }) : $ && e.commands.clearSearchHighlight();
  }, [e, t, d, h, y, k, l, C, i]), J(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), I(!1)), O.current = !1);
  }, [t, e, c]), J(() => {
    if (C.length > 0 && k < C.length) {
      const $ = C[k];
      if (l) {
        const j = document.querySelector(".syntax-textarea");
        if (j && q.current) {
          const ee = parseInt(getComputedStyle(j).lineHeight) || 22, ve = i.substring(0, $.from).split(`
`).length;
          j.scrollTop = Math.max(0, (ve - 3) * ee);
        }
        q.current && (q.current = !1);
        return;
      }
      const z = e.view.domAtPos($.from);
      z.node && z.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), q.current && (q.current = !1);
    }
  }, [k, C, e, l, i]), J(() => {
    t && H.current && (H.current.focus(), H.current.select());
  }, [t, r]);
  const L = Y(() => {
    C.length !== 0 && (q.current = !0, T(($) => ($ + 1) % C.length));
  }, [C.length]), U = Y(() => {
    C.length !== 0 && (q.current = !0, T(($) => ($ - 1 + C.length) % C.length));
  }, [C.length]), X = Y(() => {
    if (C.length === 0 || k >= C.length) return;
    const $ = C[k];
    if (l && a) {
      const z = i.substring(0, $.from) + m + i.substring($.to);
      a(z), setTimeout(P, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(m).run(), setTimeout(P, 10);
  }, [C, k, m, e, P, l, i, a]), G = Y(() => {
    if (C.length === 0) return;
    if (l && a) {
      const z = [...C].sort((ee, he) => he.from - ee.from);
      let j = i;
      z.forEach((ee) => {
        j = j.substring(0, ee.from) + m + j.substring(ee.to);
      }), a(j), setTimeout(P, 10);
      return;
    }
    const $ = [...C].sort((z, j) => j.from - z.from);
    e.chain().focus(), $.forEach((z) => {
      e.chain().setTextSelection({ from: z.from, to: z.to }).deleteSelection().insertContent(m).run();
    }), setTimeout(P, 10);
  }, [C, m, e, P, l, i, a]), Z = Y(() => {
    if (C.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: h,
      useRegex: y,
      wholeWord: v
    }) && (I(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [C, d, h, y, v, e, n]), te = Y(($) => {
    $.key === "Enter" ? ($.preventDefault(), $.shiftKey ? U() : L(), H.current?.focus()) : $.key === "Escape" ? ($.preventDefault(), n()) : $.key === "h" && ($.ctrlKey || $.metaKey) ? ($.preventDefault(), x((z) => !z)) : $.key === "l" && ($.ctrlKey || $.metaKey) && $.shiftKey && ($.preventDefault(), Z());
  }, [L, U, n, Z]);
  return t ? /* @__PURE__ */ A(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: te,
      children: [
        /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ f(_f, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: H,
                type: "text",
                placeholder: "Find...",
                value: d,
                onChange: ($) => u($.target.value),
                className: `find-replace-input ${E ? "has-error" : ""}`
              }
            ),
            E && /* @__PURE__ */ f("span", { className: "find-replace-error", title: E, children: "!" })
          ] }),
          /* @__PURE__ */ f("span", { className: "find-replace-count", children: C.length > 0 ? `${k + 1} of ${C.length}` : d ? "No results" : "" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: U,
              disabled: C.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ f($f, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: L,
              disabled: C.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ f(Xt, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: Z,
              disabled: C.length === 0,
              className: `find-replace-btn ${R ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${C.length} matches`,
              children: /* @__PURE__ */ f(Hf, { size: 16 })
            }
          ),
          /* @__PURE__ */ f("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => g(($) => !$),
              className: `find-replace-btn ${h ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ f(Wf, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => w(($) => !$),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ f(zf, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => b(($) => !$),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ f(Bf, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => x(($) => !$),
              className: `find-replace-btn ${M ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ f(Is, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ f(Pt, { size: 16 })
            }
          )
        ] }),
        M && /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ f(Is, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: B,
                type: "text",
                placeholder: "Replace with...",
                value: m,
                onChange: ($) => p($.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: X,
              disabled: C.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ A(
            "button",
            {
              onClick: G,
              disabled: C.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ f(Ff, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const Wx = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), Dt = Wx ? "⌘" : "Ctrl", zx = ({ editor: e }) => {
  const [t, n] = K(!1), [r, o] = K(0), [s, i] = K(0), [a, c] = K(""), [l, d] = K(""), [u, m] = K(!1), [p, h] = K(!1);
  J(() => {
    if (!e) return;
    const D = () => {
      const T = e.storage.selectAllOccurrences;
      T ? (n(T.isActive), o(T.ranges.length), i(T.allMatches.length), c(T.searchTerm), d(T.typedBuffer), m(T.isTypingReplace), h(T.isIncremental)) : (n(!1), o(0), i(0));
    }, k = () => {
      D();
    };
    return e.on("transaction", k), D(), () => {
      e.off("transaction", k);
    };
  }, [e]);
  const g = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), b = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), w = Y(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), M = Y(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), x = Y(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), C = Y(() => {
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
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-preview", children: u ? /* @__PURE__ */ A(He, { children: [
        /* @__PURE__ */ f(Ro, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ f(He, { children: /* @__PURE__ */ A("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ A(He, { children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: x,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${Dt}+D)`,
            children: /* @__PURE__ */ f(ga, { size: 14 })
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: C,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${Dt}+Shift+L)`,
            children: "All"
          }
        ),
        /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${Dt}+B)`,
          children: /* @__PURE__ */ f(ra, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${Dt}+I)`,
          children: /* @__PURE__ */ f(oa, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${Dt}+U)`,
          children: /* @__PURE__ */ f(sa, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ f(aa, { size: 14 })
        }
      ),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ f(Pn, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: M,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ f(Pt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ A(He, { children: [
      /* @__PURE__ */ A("kbd", { children: [
        Dt,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ A("kbd", { children: [
        Dt,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ f("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ A("kbd", { children: [
        Dt,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ A(He, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ f("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ f("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ A("kbd", { children: [
        Dt,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, Bx = Kn(zx), so = "-dismissed";
function Fx(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Ux(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, c] = K({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = V(null), d = V(""), u = V(0);
  J(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + so);
        if (b && !v) {
          let w = "";
          try {
            w = e.getHTML() || "";
          } catch {
            return;
          }
          b !== w && b.length > 50 && c((M) => ({ ...M, hasRecoverableContent: !0 }));
        }
      } catch (b) {
        console.warn("useAutoSave: Error checking for recoverable content", b);
      }
  }, [e, n, o]);
  const m = Y(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const b = e.getHTML(), v = Fx(b);
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
  J(() => {
    if (!e || !o || e.isDestroyed) return;
    const b = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        m();
      }, r));
    };
    return e.on("update", b), () => {
      e.off("update", b), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, m]), J(() => {
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
  const p = Y(() => {
    l.current && clearTimeout(l.current), m();
  }, [m]), h = Y(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + so), d.current = "", c({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (b) {
      console.warn("useAutoSave: Error clearing content", b);
    }
  }, [n]), g = Y(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const b = localStorage.getItem(n);
      return b && e && !e.isDestroyed ? (c((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(b), d.current = b, localStorage.removeItem(n + so), i?.(b);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), b) : null;
    } catch (b) {
      return console.warn("useAutoSave: Error recovering content", b), null;
    }
  }, [e, n, i]), y = Y(() => {
    try {
      localStorage.setItem(n + so, "true"), c((b) => ({ ...b, hasRecoverableContent: !1 }));
    } catch (b) {
      console.warn("useAutoSave: Error dismissing recovery", b);
    }
  }, [n]);
  return {
    ...a,
    save: p,
    clear: h,
    recover: g,
    dismissRecovery: y
  };
}
const Yx = 200;
function jx(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: r = !1,
    enabled: o = !0
  } = t, [s, i] = K({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), a = V(null), c = V(""), l = Y((d) => {
    const u = d.trim(), m = u.length > 0 ? u.split(/\s+/).filter((v) => v.length > 0).length : 0, p = u.replace(/\s/g, "").length, h = d.length;
    let g = 0, y = 0;
    r && (g = u.length > 0 ? u.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, y = u.length > 0 ? (u.match(/[.!?]+/g) || []).length : 0);
    const b = Math.max(1, Math.ceil(m / Yx));
    return {
      words: m,
      characters: p,
      charactersWithSpaces: h,
      paragraphs: g,
      sentences: y,
      readingTime: b,
      isCalculating: !1
    };
  }, [r]);
  return J(() => {
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
          const m = l(u);
          i(m);
        } catch (u) {
          console.warn("useWordCount: Error calculating word count", u), i((m) => ({ ...m, isCalculating: !1 }));
        }
      }, n);
    };
    return d(), e.on("update", d), () => {
      e.off("update", d), a.current && clearTimeout(a.current);
    };
  }, [e, n, o, l]), s;
}
function Kx({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ f(Uf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ A("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ f(Dc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ f("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ f(Vn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ f("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ f(Yf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ f("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function Vx({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ A(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ f(jf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ f("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ f(ya, { className: "w-4 h-4" }),
                "Recover"
              ]
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: t,
              className: "recovery-banner-dismiss p-2 rounded-md transition-colors duration-150",
              title: "Dismiss",
              "aria-label": "Dismiss recovery banner",
              children: /* @__PURE__ */ f(Pt, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
const Gx = /\[\[([^\[\]]+)\]\]$/, qx = yc.create({
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
      jn(
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
      new Qe({
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
}), Nt = {
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
}, Xx = ["info", "note", "prompt", "resources", "todo"];
function Zx(e) {
  return e.length < 3 ? !1 : !!(Nt.header.test(e) || Nt.bold.test(e) || Nt.list.test(e) || Nt.taskList.test(e) || Nt.codeBlock.test(e) || Nt.callout.test(e) || Nt.highlight.test(e) || Nt.link.test(e) || Nt.table.test(e));
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
function Co(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function oc(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${Co(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(Jx(i[1], i[2])) : o.push(`<p>${Co(s.trim())}</p>`);
  }
  return o.join("");
}
function du(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
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
      const m = e[a];
      if (m.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${m.checked || !1}"><p>${Co(m.text)}</p>` : i += `<li><p>${Co(m.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function sc(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return oc(e);
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
      i(), o.push(oc(a.trim()));
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
    i += "<th>" + sc(a) + "</th>";
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
        i += "<td>" + sc(u) + "</td>";
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
    const m = u.split(`
`);
    if (m.length >= 2) {
      const p = m[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const h = ek(u);
        if (h) {
          const g = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(h), g;
        }
      }
    }
    return u;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (u, m, p) => {
    let h = p.trim();
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), h = h.replace(/__([^_]+)__/g, "<strong>$1</strong>"), h = h.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), h = h.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
    const g = "info";
    h.startsWith("<") || (h = `<p>${h}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${h}</div>`), y;
  }), Xx.forEach((u) => {
    const m = new RegExp(`\`\`\`${u}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(m, (p, h) => {
      let g = h.trim();
      g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>"), g.startsWith("<") || (g = `<p>${g}</p>`);
      const y = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${u}" class="callout callout-${u}">${g}</div>`), y;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (u, m, p) => {
    const h = m || "plaintext", g = p.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${h}">${g}</code></pre>`), y;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), i = [];
  let a = [];
  const c = () => {
    a.length !== 0 && (i.push(uu(a)), a = []);
  };
  for (const u of s) {
    const m = du(u);
    if (m) {
      if (a.length > 0) {
        const h = a[0].type, g = Math.min(...a.map((y) => y.depth));
        m.depth === g && m.type !== h && c();
      }
      a.push(m);
      continue;
    }
    c();
    let p = u;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (h, g, y) => {
      const b = g.length;
      return `<h${b}>${y}</h${b}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), i.push(p);
  }
  c(), t = i.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (u, m, p) => {
    const h = m.split("|").map((w) => w.trim());
    let g = "", y = "left", b = null;
    h.length === 1 ? g = h[0] : h.length === 2 ? (g = h[0], /^\d+$/.test(h[1]) ? b = h[1] : ["left", "center", "right"].includes(h[1]) ? y = h[1] : g = m) : h.length === 3 ? (g = h[0], ["left", "center", "right"].includes(h[1]) && (y = h[1]), /^\d+$/.test(h[2]) && (b = h[2])) : g = m;
    const v = b ? ` width="${b}" style="width: ${b}px"` : "";
    return `<img src="${p.trim()}" alt="${g}" data-align="${y}"${v}>`;
  }), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((u) => {
    const m = u.trim();
    return m ? /^<[a-z]/.test(m) || /^<\//.test(m) || m.startsWith("MANUSTABLEPLACEHOLDER") || m.startsWith("MANUSCODEPLACEHOLDER") ? u : `<p>${m}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let u = 0; u < r.length; u++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${u}END`, r[u]);
  for (let u = 0; u < o.length; u++)
    t = t.replace(`MANUSCODEPLACEHOLDER${u}END`, o[u]);
  return t;
}
const nk = ut.create({
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
      new Ke({
        key: new Ve("markdownPaste"),
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
}), ac = new Ve("collapsibleHeading");
function rk(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function Mo(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, rk(i, a, l));
    }
  }), n;
}
let zn = null;
function Rs(e, t, n) {
  const r = [], o = Mo(e, n.levels), s = [];
  e.descendants((l, d) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const u = o.get(d) ?? "";
      s.push({
        pos: d,
        level: l.attrs.level,
        id: u,
        isCollapsed: t.collapsedHeadings.has(u),
        nodeSize: l.nodeSize
      });
    }
  });
  const i = [];
  for (let l = 0; l < s.length; l++) {
    const d = s[l];
    if (d.isCollapsed) {
      const u = d.pos + d.nodeSize;
      let m = e.content.size;
      for (let p = l + 1; p < s.length; p++)
        if (s[p].level <= d.level) {
          m = s[p].pos;
          break;
        }
      u < m && i.push({ start: u, end: m });
    }
  }
  const a = [];
  for (const l of i)
    if (a.length === 0)
      a.push(l);
    else {
      const d = a[a.length - 1];
      l.start <= d.end ? d.end = Math.max(d.end, l.end) : a.push(l);
    }
  function c(l) {
    for (const d of a)
      if (l >= d.start && l < d.end) return !0;
    return !1;
  }
  return e.descendants((l, d) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const u = o.get(d) ?? "", m = t.collapsedHeadings.has(u), p = c(d);
      r.push(
        st.node(d, d + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${m ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": u,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const h = st.widget(d + l.nodeSize - 1, () => {
        const g = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${u}"]`);
        if (g) {
          g.classList.contains("collapsed") !== m && (g.classList.remove("collapsed", "expanded"), g.classList.add(m ? "collapsed" : "expanded"), g.title = m ? "Click to expand" : "Click to collapse");
          const w = g.parentElement;
          if (w) return w;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const b = document.createElement("button");
        return b.className = `collapsible-heading-chevron ${m ? "collapsed" : "expanded"}`, b.setAttribute("data-heading-id", u), b.setAttribute("data-heading-level", String(l.attrs.level)), b.setAttribute("contenteditable", "false"), b.setAttribute("tabindex", "-1"), b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', b.title = m ? "Click to expand" : "Click to collapse", b.addEventListener("click", (v) => {
          v.preventDefault(), v.stopPropagation();
          const w = b.classList.contains("collapsed");
          b.classList.remove("collapsed", "expanded"), b.classList.add(w ? "expanded" : "collapsed"), b.title = w ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(u) ? t.collapsedHeadings.delete(u) : t.collapsedHeadings.add(u), zn && zn.dispatch(zn.state.tr.setMeta("collapsibleHeading", { toggled: u }));
        }), y.appendChild(b), y;
      }, { side: 1, key: `chevron-${u}` });
      r.push(h);
    } else l.isBlock && c(d) && r.push(
      st.node(d, d + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Xe.create(e, r);
}
function ok(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = Mo(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
const sk = ut.create({
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
        const i = Mo(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return Mo(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ke({
        key: ac,
        view(n) {
          return zn = n, {
            update(r) {
              zn = r;
            },
            destroy() {
              zn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: Rs(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const i = n.getMeta("collapsibleHeading");
            return i || n.docChanged ? (n.docChanged && !i && ok(o.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Rs(s.doc, e, t),
              docVersion: r.docVersion + 1
            }) : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = ac.getState(n);
            return r?.decorations ? r.decorations : Rs(n.doc, e, t);
          }
        }
      })
    ];
  }
}), ak = /\[([^\]]+)\]\(([^)]+)\)$/, ik = /^(https?:\/\/|www\.)[^\s]+$/i, ck = ut.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Qe({
        find: ak,
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
      new Ke({
        key: new Ve("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!ik.test(s)) return !1;
            const { state: i } = t, { selection: a } = i, { from: c, to: l, empty: d } = a;
            let u = s;
            if (!u.startsWith("http://") && !u.startsWith("https://") && (u.startsWith("www."), u = "https://" + u), !d && i.doc.textBetween(c, l))
              return e.chain().focus().extendMarkRange("link").setLink({ href: u }).run(), !0;
            const m = i.schema.marks.link.create({ href: u }), p = i.tr;
            return p.insertText(u, c, l), p.addMark(c, c + u.length, m), t.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), lk = ["info", "note", "prompt", "resources", "todo"], dk = ut.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ke({
        key: new Ve("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const d of lk)
              if (l === `\`\`\`${d}`) {
                n.preventDefault();
                const u = r.tr, m = a + c.indexOf("```");
                u.delete(m, i.pos);
                const p = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                if (p && h) {
                  const g = h.create(), y = p.create({ type: d }, lm.from(g));
                  u.insert(m, y);
                  const b = u.doc.resolve(m + 2);
                  u.setSelection(mn.near(b)), t.dispatch(u);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), ao = new Ve("searchHighlight"), uk = ut.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(ao, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(ao, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ke({
        key: ao,
        state: {
          init() {
            return Xe.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(ao), d = t.docChanged;
            if (!s)
              return Xe.empty;
            if (!d && !l)
              return n.map(t.mapping, o.doc);
            const u = [];
            let m = 0;
            try {
              let p;
              if (a)
                p = new RegExp(s, i ? "g" : "gi");
              else {
                const h = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                p = new RegExp(h, i ? "g" : "gi");
              }
              o.doc.descendants((h, g) => {
                if (h.isText && h.text) {
                  let y;
                  for (; (y = p.exec(h.text)) !== null; ) {
                    const b = g + y.index, v = g + y.index + y[0].length, w = m === c;
                    u.push(
                      st.inline(b, v, {
                        class: w ? "search-highlight-current" : "search-highlight"
                      })
                    ), m++;
                  }
                }
                return !0;
              });
            } catch {
              return Xe.empty;
            }
            return Xe.create(o.doc, u);
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
}), fk = new Ve("tabIndent");
function mk(e) {
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
const pk = ut.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Ke({
        key: fk,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = mk(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!ai(s)(n, r)) {
                const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && ai(l)(n, r);
              }
            } else if (!ii(s)(n, r)) {
              const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && ii(l)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), hk = new Ve("expandSelection");
function As(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const gk = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), yk = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), vk = "tableRow", bk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function wk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function xk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (bk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function kk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === vk) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Ck(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (yk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Mk(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    gk.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function Sk(e) {
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
function Tk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Ek(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Dk(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(wk(e, o, s)), Ek(e, t) && (i(xk(e, o, s)), i(kk(e, o, s))), i(Mk(e, o, s)), i(Ck(e, o, s));
  const a = Sk(e);
  if (a.length > 0) {
    const c = Tk(a, o, s);
    for (const l of c)
      i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const Nk = ut.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof Ju || o === 0 && s === n.content.size)
          return !0;
        const a = Dk(n, o, s);
        let c = null;
        for (const l of a)
          if (l.from < o || l.to > s) {
            c = l;
            break;
          }
        return c ? (t.lastExpandedFrom = c.from, t.lastExpandedTo = c.to, t.expansionDepth++, t.isExpanding = !0, c.from === 0 && c.to === n.content.size ? e.commands.selectAll() : e.commands.setTextSelection({
          from: c.from,
          to: c.to
        }), t.isExpanding = !1, !0) : (t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size, t.expansionDepth++, t.isExpanding = !0, e.commands.selectAll(), t.isExpanding = !1, !0);
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ke({
        key: hk,
        props: {
          handleClick() {
            return As(e), !1;
          },
          handleTextInput() {
            return As(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && As(e), !1;
          }
        }
      })
    ];
  }
}), Rk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Ak(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Lk = new Ve("hexColorDecoration");
function fu(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Rk.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, d = l + a[0].length;
      if (d >= t && l <= n) {
        const u = a[0], m = Ak(u);
        r.push(
          st.inline(l, d, {
            class: "hex-color-swatch",
            style: `background-color: ${u}; color: ${m ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function Pk(e) {
  const t = fu(e, 0, e.content.size);
  return Xe.create(e, t);
}
const Ik = yc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Ke({
        key: Lk,
        state: {
          init(e, { doc: t }) {
            return Pk(t);
          },
          apply(e, t) {
            if (!e.docChanged)
              return t;
            let n = t.map(e.mapping, e.doc);
            const r = [];
            if (e.mapping.maps.forEach((s, i) => {
              s.forEach((a, c, l, d) => {
                const u = Math.max(0, l - 10), m = Math.min(e.doc.content.size, d + 10);
                r.push({ from: u, to: m });
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
              const i = fu(e.doc, s.from, s.to);
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
}), Be = new Ve("selectAllOccurrences");
function ic(e, t, n, r, o) {
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
function Vt(e, t) {
  const n = Be.getState(e.state);
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
function $e(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const _k = ut.create({
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
        const c = ic(t.state.doc, o, s, i, a);
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Be, { activate: !0 })), !0);
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
            const u = o.doc.resolve(s), m = u.parent;
            if (m.isTextblock) {
              const p = m.textContent, h = u.parentOffset;
              let g = h, y = h;
              for (; g > 0 && /\w/.test(p[g - 1]); ) g--;
              for (; y < p.length && /\w/.test(p[y]); ) y++;
              g < y && (a = p.slice(g, y));
            }
          }
          if (!a) return !1;
          const c = ic(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = Ok(c, s), d = c[l];
          return r.isActive = !0, r.ranges = [d], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = c, r.nextMatchIndex = (l + 1) % c.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Be, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Be, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => ($e(this.storage), t && t(e.setMeta(Be, { deactivate: !0 })), !0),
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
              const c = Vt(a, this.storage);
              this.storage.ranges = c, c.length === 0 && $e(this.storage);
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
        return $e(this.storage), !0;
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
              const s = Vt(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && $e(this.storage);
            }
          } catch {
          }
        }, 10) : $e(this.storage), !0;
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
      new Ke({
        key: Be,
        state: {
          init() {
            return Xe.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Be);
            if (s?.deactivate || !e.isActive)
              return Xe.empty;
            if (s?.activate || s?.refresh) {
              const i = [];
              for (const a of e.ranges) {
                i.push(
                  st.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const c = document.createElement("span");
                c.className = "select-all-multi-cursor", c.setAttribute("aria-hidden", "true"), i.push(
                  st.widget(a.to, c, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return Xe.create(o.doc, i);
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
              $e(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Be, { deactivate: !0 }));
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
              $e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Be, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), dm(t.state, t.dispatch), setTimeout(() => {
                  const s = Vt(t);
                  e.ranges = s, s.length === 0 && $e(e);
                }, 10), !0;
              }
              $e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Be, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, um(t.state, t.dispatch), setTimeout(() => {
                  const s = Vt(t);
                  e.ranges = s, s.length === 0 && $e(e);
                }, 10), !0;
              }
              $e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Be, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Vt(t);
                if (r.length === 0) {
                  $e(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Be, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Vt(t);
                  e.ranges = a, a.length === 0 && $e(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), $e(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Be, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), $e(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Be, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              $e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Be, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              $e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Be, { deactivate: !0 })), !1;
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
            const s = Vt(t);
            if (s.length === 0) {
              $e(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Be, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = Vt(t);
              e.ranges = c, c.length === 0 && $e(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function io(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), c = s.after(s.depth);
  o.replaceWith(a, c, i);
  const l = a + i.nodeSize;
  if (l < o.doc.content.size) {
    const d = o.doc.resolve(l);
    d.nodeAfter && d.nodeAfter.isTextblock ? o.setSelection(mn.create(o.doc, l + 1)) : d.nodeAfter && o.setSelection(mn.near(o.doc.resolve(l)));
  } else {
    const u = r.schema.nodes.paragraph.create();
    o.insert(l, u), o.setSelection(mn.create(o.doc, l + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function $k() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Hk(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function Wk(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function zk(e, t) {
  return t.includes(e.type);
}
function Bk(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function Fk(e, t, n) {
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
      const u = e.type === "image/png" || e.type === "image/gif", m = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, h = l.toDataURL(m, p), g = Wk(h, e.name);
      r({ dataUrl: h, file: g, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function Uk(e, t, n) {
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
async function cc(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!zk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = $k();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const u = await Fk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = u.dataUrl, i = u.file, s = Math.min(u.width, 600);
    } else {
      o = await Hk(e), i = e;
      const u = await Bk(o);
      s = Math.min(u.width, 600);
    }
    t.chain().focus().setImage({
      src: o,
      alt: e.name,
      width: s
    }).run();
    const { state: c } = t.view, l = c.selection.from - 1, d = c.doc.nodeAt(l);
    if (d && d.type.name === "resizableImage") {
      const u = t.view.nodeDOM(l);
      if (u) {
        const m = u instanceof HTMLElement ? u : u.dom;
        m && m.classList.add("image-uploading");
      }
    }
    try {
      const u = await n.onImageUpload(i, {
        fileName: e.name,
        mimeType: i.type,
        fileSize: i.size,
        uploadId: r
      });
      let m = !1;
      return t.view.state.doc.descendants((p, h) => {
        if (m) return !1;
        if (p.type.name === "resizableImage" && p.attrs.src === o && p.attrs.alt === e.name) {
          try {
            const { state: g, dispatch: y } = t.view, b = g.doc.nodeAt(h);
            if (b) {
              const v = g.tr.setNodeMarkup(h, void 0, {
                ...b.attrs,
                src: u
              });
              y(v);
            }
          } catch (g) {
            console.warn("Failed to replace placeholder with uploaded reference:", g);
          }
          return m = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((p, h) => {
        if (p.type.name === "resizableImage" && p.attrs.src === u) {
          const g = t.view.nodeDOM(h);
          if (g) {
            const y = g instanceof HTMLElement ? g : g.dom;
            y && y.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (u) {
      return console.warn("Image upload failed, removing placeholder:", u), Uk(t, o, e.name), n.onUploadError?.(`Upload failed: ${u instanceof Error ? u.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function lc(e) {
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
const Yk = ut.create({
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
      new Ke({
        key: new Ve("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = lc(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              cc(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = lc(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const c = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (c) {
              const l = n.state.tr.setSelection(
                mn.near(n.state.doc.resolve(c.pos))
              );
              n.dispatch(l);
            }
            return a.forEach((l) => {
              cc(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function jk({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = K(!1), [o, s] = K(0), i = Y((d) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer?.types.includes("Files") && (s((u) => u + 1), r(!0));
  }, []), a = Y((d) => {
    d.preventDefault(), d.stopPropagation(), s((u) => {
      const m = u - 1;
      return m === 0 && r(!1), m;
    });
  }, []), c = Y((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), l = Y((d) => {
    d.preventDefault(), d.stopPropagation(), r(!1), s(0);
  }, []);
  return J(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", i), d.addEventListener("dragleave", a), d.addEventListener("dragover", c), d.addEventListener("drop", l), () => {
      d.removeEventListener("dragenter", i), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", c), d.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ f("div", { className: "image-drop-zone", children: /* @__PURE__ */ A("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ f("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ f(Kf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ A("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ f("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ f("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function Kk({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = K(e), [c, l] = K(t), d = V(null), u = V(null);
  J(() => {
    u.current?.focus(), u.current?.select();
  }, []), J(() => {
    const y = (v) => {
      d.current && !d.current.contains(v.target) && s();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [s]), J(() => {
    const y = (b) => {
      b.key === "Escape" ? s() : b.key === "Enter" && (b.metaKey || b.ctrlKey) && m();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i, c, s]);
  const m = () => {
    i.trim() && r(i.trim(), c.trim());
  }, h = (() => {
    let w = n.x - 160, M = n.y + 10;
    return w + 320 > window.innerWidth - 16 && (w = window.innerWidth - 320 - 16), w < 16 && (w = 16), M + 280 > window.innerHeight - 16 && (M = n.y - 280 - 10), M < 16 && (M = 16), { left: w, top: M };
  })(), g = /* @__PURE__ */ A(
    "div",
    {
      ref: d,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: h.left,
        top: h.top
      },
      children: [
        /* @__PURE__ */ A("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ f("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ f(Pt, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ A("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ A("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ f(ia, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ f("span", { children: "Image URL" })
            ] }),
            /* @__PURE__ */ f(
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
              /* @__PURE__ */ f(Ro, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ f("span", { children: "Alt Text" })
            ] }),
            /* @__PURE__ */ f(
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
          /* @__PURE__ */ f(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ f(Pn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ A("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ f(
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
                onClick: m,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !i.trim(),
                children: [
                  /* @__PURE__ */ f(Vn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ f($t, { children: g });
}
function co(e) {
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
    for (const v of h) {
      let w;
      for (v.regex.lastIndex = 0; (w = v.regex.exec(a)) !== null; )
        g.push({
          start: c + w.index,
          end: c + w.index + w[0].length,
          type: v.type,
          content: w[0]
        });
    }
    g.sort((v, w) => v.start - w.start);
    const y = [];
    let b = c;
    for (const v of g)
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
function dc(e) {
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
function fn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function lo(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return fn(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], d = i + l.length, u = t.filter((p) => p.start >= i && p.start < d);
      let m = i;
      for (const p of u)
        p.start > m && (o += fn(e.substring(m, p.start))), o += `<span class="${dc(p.type)}">${fn(p.content)}</span>`, m = p.end;
      m < d && (o += fn(e.substring(m, d))), c < s.length - 1 && (o += `
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
    let m = i;
    for (const p of u)
      p.start > m && (o += Ls(e, m, p.start, null, a)), o += Ls(e, p.start, p.end, dc(p.type), a), m = p.end;
    m < d && (o += Ls(e, m, d, null, a)), c < s.length - 1 && (o += `
`), i = d + 1;
  }
  return o;
}
function Ls(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const c = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const l = fn(e.substring(c, i)), d = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${d}">${l}</mark></span>` : s += `<mark class="${d}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = fn(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function Vk({
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
  const l = V(null), d = V(null), u = V(null), m = V(null), p = 5e3, h = 80, [g, y] = K(() => {
    const k = co(e);
    return lo(e, k, i, a);
  }), b = V(null), v = Ln(() => {
    if (e.length <= p) {
      const k = co(e), T = lo(e, k, i, a);
      return b.current && (clearTimeout(b.current), b.current = null), T;
    }
    return null;
  }, [e, i, a]);
  J(() => {
    if (e.length <= p) {
      const k = co(e);
      y(lo(e, k, i, a));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const k = co(e);
      y(lo(e, k, i, a)), b.current = null;
    }, h), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, i, a]);
  const w = v ?? g, M = Y(() => {
    const k = l.current, T = d.current, E = u.current;
    if (k) {
      const N = E?.parentElement, R = N ? N.clientHeight : 200;
      k.style.height = "auto";
      const I = Math.max(k.scrollHeight, R, 200);
      k.style.height = `${I}px`, T && (T.style.height = `${I}px`);
    }
  }, []);
  J(() => {
    const k = l.current;
    if (!k) return;
    const T = (E) => {
      const N = k.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: R, scrollHeight: I, clientHeight: O } = N, H = R <= 0, B = R + O >= I - 1;
      (E.deltaY > 0 && !B || E.deltaY < 0 && !H) && (E.preventDefault(), N.scrollTop += E.deltaY);
    };
    return k.addEventListener("wheel", T, { passive: !1 }), () => k.removeEventListener("wheel", T);
  }, []);
  const x = Y(() => {
  }, []);
  J(() => {
    M();
  }, [e, M]), J(() => {
    o && l.current && l.current.focus();
  }, [o]), J(() => {
    if (m.current && l.current) {
      const { start: k, end: T } = m.current;
      l.current.selectionStart = k, l.current.selectionEnd = T, m.current = null;
    }
  }, [e]);
  const C = Y((k) => {
    const T = k.target;
    m.current = {
      start: T.selectionStart,
      end: T.selectionEnd
    }, t(T.value);
  }, [t]), D = Y((k) => {
    const T = k.currentTarget, E = T.selectionStart, N = T.selectionEnd, R = T.value, I = E !== N;
    if (c) {
      if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), I) {
          const O = R.substring(E, N), H = R.substring(0, E) + "`" + O + "`" + R.substring(N);
          m.current = { start: E + 1, end: N + 1 }, t(H);
        } else if (R[E] === "`")
          m.current = { start: E + 1, end: E + 1 }, t(R), T.selectionStart = T.selectionEnd = E + 1;
        else {
          const O = R.substring(0, E) + "``" + R.substring(N);
          m.current = { start: E + 1, end: E + 1 }, t(O);
        }
        return;
      }
      if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
        if (R[E - 1] === "*" && R[E], I) {
          k.preventDefault();
          const B = R.substring(E, N), q = R.substring(0, E) + "*" + B + "*" + R.substring(N);
          m.current = { start: E + 1, end: N + 1 }, t(q);
          return;
        }
        if (R[E] === "*") {
          k.preventDefault(), m.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        k.preventDefault();
        const H = R.substring(0, E) + "**" + R.substring(N);
        m.current = { start: E + 1, end: E + 1 }, t(H);
        return;
      }
      if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
        if (I) {
          k.preventDefault();
          const H = R.substring(E, N), B = R.substring(0, E) + "_" + H + "_" + R.substring(N);
          m.current = { start: E + 1, end: N + 1 }, t(B);
          return;
        }
        if (R[E] === "_") {
          k.preventDefault(), m.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        k.preventDefault();
        const O = R.substring(0, E) + "__" + R.substring(N);
        m.current = { start: E + 1, end: E + 1 }, t(O);
        return;
      }
      if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
        if (I) {
          k.preventDefault();
          const H = R.substring(E, N), B = R.substring(0, E) + "~" + H + "~" + R.substring(N);
          m.current = { start: E + 1, end: N + 1 }, t(B);
          return;
        }
        if (R[E] === "~") {
          k.preventDefault(), m.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        k.preventDefault();
        const O = R.substring(0, E) + "~~" + R.substring(N);
        m.current = { start: E + 1, end: E + 1 }, t(O);
        return;
      }
      if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), I) {
          const O = R.substring(E, N), H = R.substring(0, E) + "[" + O + "]()" + R.substring(N);
          m.current = { start: N + 3, end: N + 3 }, t(H);
        } else {
          const O = R.substring(0, E) + "[]()" + R.substring(N);
          m.current = { start: E + 1, end: E + 1 }, t(O);
        }
        return;
      }
      if (k.key === "]" && !k.ctrlKey && !k.metaKey && R[E] === "]") {
        k.preventDefault(), m.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
        return;
      }
      if (k.key === ")" && !k.ctrlKey && !k.metaKey && R[E] === ")") {
        k.preventDefault(), m.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
        return;
      }
      if (k.key === "Backspace" && !I && E > 0) {
        const O = R[E - 1], H = R[E], B = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [q, P] of B)
          if (O === q && H === P) {
            k.preventDefault();
            const L = R.substring(0, E - 1) + R.substring(E + 1);
            m.current = { start: E - 1, end: E - 1 }, t(L);
            return;
          }
        if (O === "[" && R.substring(E, E + 3) === "]()") {
          k.preventDefault();
          const q = R.substring(0, E - 1) + R.substring(E + 3);
          m.current = { start: E - 1, end: E - 1 }, t(q);
          return;
        }
      }
    }
    if (k.key === "Tab")
      if (k.preventDefault(), k.shiftKey) {
        const O = R.substring(0, E), H = R.substring(E, N), B = R.substring(N), P = O.lastIndexOf(`
`) + 1, L = O.substring(0, P), U = O.substring(P), X = (U + H).split(`
`), G = X.map(($) => $.startsWith("  ") ? $.substring(2) : $.startsWith("	") ? $.substring(1) : $), Z = L + G.join(`
`) + B, te = (U + H).length - G.join(`
`).length;
        m.current = {
          start: Math.max(P, E - (X[0].length - G[0].length)),
          end: N - te
        }, t(Z);
      } else if (E === N) {
        const O = R.substring(0, E) + "  " + R.substring(N);
        m.current = { start: E + 2, end: E + 2 }, t(O);
      } else {
        const O = R.substring(0, E), H = R.substring(E, N), B = R.substring(N), P = O.lastIndexOf(`
`) + 1, L = O.substring(0, P), X = (O.substring(P) + H).split(`
`), G = X.map((te) => "  " + te), Z = L + G.join(`
`) + B;
        m.current = {
          start: E + 2,
          end: N + X.length * 2
        }, t(Z);
      }
  }, [t, c]);
  return /* @__PURE__ */ A("div", { ref: u, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ f(
      "div",
      {
        ref: d,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: w || `<span class="md-placeholder">${fn(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ f(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: C,
        onKeyDown: D,
        onScroll: x,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let uc = 0, ea = 0, mu = 0;
function Gk(e) {
  ea++, mu = e;
}
const qk = Kn(function({
  visible: t,
  onClose: n,
  editor: r
}) {
  const [o, s] = K(!1), [i, a] = K({
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
  }), c = V([]), l = V(performance.now()), d = V(0), u = V(0), m = V(0), p = V(0), [h, g] = K(new Array(60).fill(0)), [y, b] = K(new Array(60).fill(0));
  J(() => {
    if (!t || !r) return;
    const D = () => {
      const k = performance.now();
      queueMicrotask(() => {
        const T = performance.now() - k;
        Gk(T);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), J(() => {
    if (!t) return;
    let D = 0, k = performance.now(), T = 0;
    const E = (N) => {
      const R = N - l.current;
      if (l.current = N, c.current.push({ time: N, duration: R }), c.current.length > 120 && (c.current = c.current.slice(-120)), R > 16.67 && u.current++, D++, N - k >= 1e3) {
        T = D, D = 0, k = N;
        const I = c.current.slice(-60), O = I.length > 0 ? I.reduce((G, Z) => G + Z.duration, 0) / I.length : 0, H = I.length > 0 ? Math.max(...I.map((G) => G.duration)) : 0, B = performance.memory, q = B ? B.usedJSHeapSize / (1024 * 1024) : 0, P = B ? B.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, U = uc - m.current, X = ea - p.current;
        m.current = uc, p.current = ea, a({
          fps: T,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(H * 100) / 100,
          memoryUsed: Math.round(q * 10) / 10,
          memoryTotal: Math.round(P),
          renderCount: U,
          transactionCount: X,
          lastTransactionTime: Math.round(mu * 100) / 100,
          domNodes: L,
          longFrames: u.current
        }), g((G) => [...G.slice(1), T]), b((G) => [...G.slice(1), O]), u.current = 0;
      }
      d.current = requestAnimationFrame(E);
    };
    return d.current = requestAnimationFrame(E), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const v = Y(() => {
    n?.();
  }, [n]), w = Y(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const M = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", x = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", C = (D, k, T) => {
    const R = D.map((I, O) => {
      const H = O / (D.length - 1) * 120, B = 24 - Math.min(I, k) / k * 24;
      return `${H},${B}`;
    }).join(" ");
    return /* @__PURE__ */ f("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ f(
      "polyline",
      {
        points: R,
        fill: "none",
        stroke: T,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ A("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ A("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ A("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ f(Vf, { size: 14 }),
        /* @__PURE__ */ f("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ f("button", { onClick: w, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ f(Nc, { size: 12 }) : /* @__PURE__ */ f(Rc, { size: 12 }) }),
        /* @__PURE__ */ f("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ f(Pt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ A("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ f("span", { className: "perf-value", style: { color: M(i.fps) }, children: i.fps })
        ] }),
        C(h, 70, M(i.fps))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ A("span", { className: "perf-value", style: { color: x(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ f("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", style: { color: x(i.frameTimeMax) }, children: [
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
        C(y, 50, x(i.frameTime))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: i.renderCount })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: i.transactionCount })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ f("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: i.domNodes.toLocaleString() })
        ] }),
        i.memoryTotal > 0 && /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Memory" }),
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
class Xk extends mf {
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
      return /* @__PURE__ */ f("div", { className: de("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ A("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ f("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ f(Gf, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ A("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ f("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ f("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ A(
            qt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ f(ya, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ A(
            qt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ f(Pn, { className: "w-4 h-4" }),
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
              className: de(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ f(Xt, { className: "w-3 h-3" }) : /* @__PURE__ */ f(Mc, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ A("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ f("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ A(He, { children: [
                    /* @__PURE__ */ f(qf, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ f("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ A(He, { children: [
                    /* @__PURE__ */ f(Gn, { className: "w-3 h-3" }),
                    /* @__PURE__ */ f("span", { children: "Copy" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ f("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }),
            t.stack && /* @__PURE__ */ f("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) })
          ] })
        ] })
      ] }) });
    }
    return this.props.children;
  }
}
function Zk({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function Qk(e, t) {
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
function Jk(e) {
  const [t, n] = pf(Qk, { status: "idle" }), r = V(null), o = Y(async (a, c, l, d, u) => {
    if (e) {
      n({
        type: "start-streaming",
        action: a,
        actionLabel: c,
        inputText: l,
        selectionRange: d
      });
      try {
        const m = e(a, l, u);
        if (Symbol.asyncIterator in Object(m))
          for await (const p of m)
            n({ type: "append-chunk", text: p });
        else {
          const p = await m;
          n({ type: "append-chunk", text: p });
        }
        n({ type: "complete" });
      } catch (m) {
        if (m instanceof DOMException && m.name === "AbortError") {
          n({ type: "reset" });
          return;
        }
        const p = m instanceof Error ? m.message : "AI action failed";
        n({ type: "error", message: p });
      }
    }
  }, [e]), s = Y(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = Y(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const e1 = {
  SpellCheck: Zf,
  RefreshCw: Xf,
  Minimize2: Rc,
  Maximize2: Nc,
  FileText: ha,
  MessageSquare: Ac,
  Sparkles: No
};
function t1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = K(""), [a, c] = K(!1), l = V(null), d = V(null), u = e.filter((y) => y.scope === t || y.scope === "both");
  J(() => {
    const y = (v) => {
      l.current && !l.current.contains(v.target) && r();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [r]), J(() => {
    const y = (b) => {
      b.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), J(() => {
    a && d.current && d.current.focus();
  }, [a]);
  const p = Y(() => {
    const b = u.length * 40 + (a ? 56 : 0) + 16, v = window.innerWidth, w = window.innerHeight;
    let M = o.top, x = o.left;
    return x + 260 > v - 8 && (x = v - 260 - 8), x < 8 && (x = 8), M + b > w - 8 && (M = o.top - b - 8), M < 8 && (M = 8), { top: M, left: x };
  }, [o, u.length, a])(), h = () => {
    s.trim() && (n("custom", s.trim()), i(""), c(!1));
  }, g = /* @__PURE__ */ f(
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
            /* @__PURE__ */ f("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ A("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ f(Ac, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ f(
                "input",
                {
                  ref: d,
                  type: "text",
                  placeholder: "Modify with prompt…",
                  value: s,
                  onChange: (y) => i(y.target.value),
                  onKeyDown: (y) => {
                    y.key === "Enter" && (y.preventDefault(), h()), y.stopPropagation();
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
            /* @__PURE__ */ f("div", { className: "h-px bg-border mx-2 my-0.5" }),
            u.filter((y) => !y.showCustomPrompt).map((y) => {
              const b = y.icon ? e1[y.icon] : No;
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
                    b && /* @__PURE__ */ f(b, { size: 15, className: "text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ f("span", { children: y.label })
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
  return /* @__PURE__ */ f($t, { onMouseDown: (y) => y.preventDefault(), children: g });
}
function n1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = V(null), a = V(null), [c, l] = K(!1), [d, u] = K(0);
  J(() => {
    if (i.current) {
      const x = new ResizeObserver((C) => {
        for (const D of C)
          u(D.contentRect.height);
      });
      return x.observe(i.current), () => x.disconnect();
    }
  }, []), J(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), J(() => {
    const x = (C) => {
      C.key === "Escape" && s();
    };
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [s]);
  const m = Ln(() => {
    const k = window.innerWidth, T = window.innerHeight;
    let E = t.selectionCenterX - 380 / 2;
    E + 380 > k - 8 && (E = k - 380 - 8), E < 8 && (E = 8);
    const N = T - t.selectionBottom - 8, R = t.selectionTop - 8, I = d || 200;
    let O, H = !1;
    return N >= I || N >= R ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - I, H = !0), O < 8 && (O = 8), O + I > T - 8 && (O = T - I - 8), { top: O, left: E, placedAbove: H };
  }, [t, d]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", h = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", y = e.status === "complete", b = e.status === "error", v = Y(() => {
    navigator.clipboard.writeText(p), l(!0), setTimeout(() => l(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const w = m.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", M = /* @__PURE__ */ f(
    "div",
    {
      ref: i,
      className: "ai-result-popover",
      style: {
        position: "fixed",
        top: m.top,
        left: m.left
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
                g && /* @__PURE__ */ f(Dc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ f("span", { className: "font-medium", children: b ? "Error" : h }),
                g && /* @__PURE__ */ f("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ f(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (x) => {
                    x.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ f(Pt, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ f(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: b ? /* @__PURE__ */ f("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ A("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  g && /* @__PURE__ */ f("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ A("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || b) && /* @__PURE__ */ A(He, { children: [
                y && /* @__PURE__ */ A(He, { children: [
                  /* @__PURE__ */ f(
                    Rn,
                    {
                      icon: Is,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ f(
                    Rn,
                    {
                      icon: ga,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ f(
                    Rn,
                    {
                      icon: c ? Vn : Gn,
                      label: c ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ f(
                  Rn,
                  {
                    icon: ya,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ f("div", { className: "flex-1" }),
                /* @__PURE__ */ f(
                  Rn,
                  {
                    icon: Pt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ A(He, { children: [
                /* @__PURE__ */ f("div", { className: "flex-1" }),
                /* @__PURE__ */ f(
                  Rn,
                  {
                    icon: Pt,
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
  return /* @__PURE__ */ f($t, { onMouseDown: (x) => x.preventDefault(), children: M });
}
function Rn({
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
        /* @__PURE__ */ f(e, { size: 12 }),
        /* @__PURE__ */ f("span", { children: t })
      ]
    }
  );
}
const pu = "paragon-editor-toc-width", r1 = 280, hu = 200, gu = 500;
function fc() {
  try {
    const e = localStorage.getItem(pu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= hu && t <= gu)
        return t;
    }
  } catch {
  }
  return r1;
}
function o1(e) {
  try {
    localStorage.setItem(pu, String(e));
  } catch {
  }
}
function s1(e, t, n) {
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
function mc(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const pc = Kn(function({
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
  position: m = "right",
  scrollOffset: p = 20,
  onItemClick: h,
  renderItem: g,
  showToggleButton: y = !0,
  scrollContainerRef: b
}) {
  const [v, w] = K([]), [M, x] = K(null), [C, D] = K(n), [k, T] = K(/* @__PURE__ */ new Set()), [E, N] = K(() => {
    if (u) {
      const z = parseInt(u, 10);
      return isNaN(z) ? fc() : z;
    }
    return fc();
  }), R = V(null), I = V(null), O = V(!1), H = V(0), B = V(0);
  J(() => {
    D(n);
  }, [n]);
  const q = Y((z) => {
    z.preventDefault(), z.stopPropagation(), O.current = !0, H.current = z.clientX, B.current = E, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [E]);
  J(() => {
    const z = (ee) => {
      if (!O.current) return;
      const he = m === "right" ? H.current - ee.clientX : ee.clientX - H.current, ve = Math.min(gu, Math.max(hu, B.current + he));
      N(ve);
    }, j = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((ee) => (o1(ee), ee)));
    };
    return document.addEventListener("mousemove", z), document.addEventListener("mouseup", j), () => {
      document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", j);
    };
  }, [m]);
  const P = Y(() => {
    if (!t || t.isDestroyed) return;
    const z = s1(t, s, i);
    w(z), M && !z.find((j) => j.id === M) && x(null);
  }, [t, s, i, M]);
  J(() => {
    if (!t) return;
    const z = () => {
      I.current && clearTimeout(I.current), I.current = setTimeout(() => P(), 300);
    };
    return P(), t.on("update", z), t.on("create", z), () => {
      t.off("update", z), t.off("create", z), I.current && clearTimeout(I.current);
    };
  }, [t, P]), J(() => {
    if (!t || !c || !C || v.length === 0) return;
    const z = b?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!z) return;
    const j = () => {
      const ve = z.getBoundingClientRect();
      let Re = null;
      for (let We = v.length - 1; We >= 0; We--) {
        const rt = v[We], Ht = mc(t, rt.pos);
        if (Ht && Ht.getBoundingClientRect().top - ve.top <= p + 10) {
          Re = rt.id;
          break;
        }
      }
      !Re && v.length > 0 && (Re = v[0].id), x(Re);
    };
    let ee;
    const he = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(j);
    };
    return z.addEventListener("scroll", he, { passive: !0 }), j(), () => {
      z.removeEventListener("scroll", he), cancelAnimationFrame(ee);
    };
  }, [t, v, c, C, p, b]);
  const L = Y((z) => {
    if (!t || t.isDestroyed) return;
    const j = mc(t, z.pos);
    if (j) {
      const ee = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const he = ee.getBoundingClientRect(), Re = j.getBoundingClientRect().top - he.top + ee.scrollTop;
        ee.scrollTo({ top: Re - p, behavior: "smooth" });
      } else
        j.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(z.pos + 1);
    } catch {
    }
    x(z.id), h?.(z);
  }, [t, p, h, b]), U = Y(() => {
    const z = !C;
    D(z), r?.(z);
  }, [C, r]), X = Y((z) => {
    T((j) => {
      const ee = new Set(j);
      return ee.has(z) ? ee.delete(z) : ee.add(z), ee;
    });
  }, []), G = Y((z, j, ee = 0) => {
    if (g)
      return g(z, j, () => L(z));
    const he = (z.level - s) * 14, ve = l && z.children && z.children.length > 0, Re = k.has(z.id);
    return /* @__PURE__ */ f(
      "div",
      {
        className: `toc-item ${j ? "toc-item-active" : ""} toc-level-${z.level}`,
        style: { paddingLeft: `${he + 10}px` },
        children: /* @__PURE__ */ A(
          "button",
          {
            className: "toc-item-button",
            onClick: () => L(z),
            title: z.text,
            children: [
              ve && /* @__PURE__ */ f(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (We) => {
                    We.stopPropagation(), X(z.id);
                  },
                  children: /* @__PURE__ */ f("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: Re ? /* @__PURE__ */ f("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ f("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              a && /* @__PURE__ */ A("span", { className: "toc-level-indicator", children: [
                "H",
                z.level
              ] }),
              /* @__PURE__ */ f("span", { className: "toc-item-text", children: z.text })
            ]
          }
        )
      },
      z.id
    );
  }, [g, L, l, s, a, k, X]), Z = Y((z, j = 0) => z.map((ee) => {
    const he = M === ee.id, ve = k.has(ee.id), Re = ee.children && ee.children.length > 0;
    return /* @__PURE__ */ A("div", { children: [
      G(ee, he, j),
      Re && !ve && /* @__PURE__ */ f("div", { className: "toc-children", children: Z(ee.children, j + 1) })
    ] }, ee.id);
  }), [M, k, G]), te = Y(() => v.map((z) => {
    const j = M === z.id;
    return G(z, j);
  }), [v, M, G]);
  if (!t) return null;
  const $ = l ? a1(v) : [];
  return /* @__PURE__ */ A(He, { children: [
    y && /* @__PURE__ */ f(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${m}`,
        onClick: U,
        title: C ? "Hide Table of Contents" : "Show Table of Contents",
        children: C ? /* @__PURE__ */ f(Qf, { size: 16 }) : /* @__PURE__ */ f(Jf, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(
      "div",
      {
        ref: R,
        className: `toc-sidebar ${C ? "toc-visible" : "toc-hidden"} toc-${m} ${d}`,
        style: { width: C ? `${E}px` : "0px" },
        children: [
          C && /* @__PURE__ */ f(
            "div",
            {
              className: `toc-resize-handle toc-resize-${m}`,
              onMouseDown: q
            }
          ),
          /* @__PURE__ */ A("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ f("div", { className: "toc-header", children: /* @__PURE__ */ f("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ f("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ A("div", { className: "toc-empty", children: [
              /* @__PURE__ */ f("p", { children: "No headings yet" }),
              /* @__PURE__ */ f("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ f("div", { className: "toc-list", children: l ? Z($) : te() }) })
          ] })
        ]
      }
    )
  ] });
});
let Lt = null, So = null;
async function yu() {
  if (Lt) return Lt;
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
      const d = l, u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = d.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", w = g && g > 0;
      return (v || w) && b.push(v ? y : "left"), w && b.push(String(g)), `![${b.join(" | ")}](${u})`;
    }
  }), n.addRule("taskListItem", {
    filter: (c) => c.nodeName === "LI" && c.getAttribute("data-type") === "taskItem",
    replacement: (c, l) => {
      const d = l, u = d.querySelector('input[type="checkbox"]'), m = u?.hasAttribute("checked") || u?.checked || d.getAttribute("data-checked") === "true";
      return c = c.replace(/^\n+/, "").replace(/\n+$/, "").replace(/\n\n+/g, `

`), c = c.replace(/\n\n(- |\d+\. )/g, `
$1`), c = c.replace(/\u200B/g, "").trim(), `- [${m ? "x" : " "}] ` + (c || "​").replace(/\n/gm, `
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
  function r(c) {
    const l = c.getAttribute("src") || "", u = (c.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), m = c.getAttribute("width"), p = m ? parseInt(m, 10) : null, h = c.getAttribute("data-align") || "left", g = [u], y = h !== "left", b = p && p > 0;
    return (y || b) && g.push(y ? h : "left"), b && g.push(String(p)), `![${g.join(" \\| ")}](${l})`;
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
        const u = d, m = u.nodeName;
        if (m === "UL" || m === "OL" || m === "LABEL" || m === "INPUT") continue;
        l += o(u);
      } else
        l += o(d);
    return l.trim();
  }
  function i(c, l, d = 0) {
    const u = "  ".repeat(d), m = c.nodeName;
    Array.from(c.childNodes).filter(
      (h) => h.nodeType === Node.ELEMENT_NODE && h.nodeName === "LI"
    ).forEach((h, g) => {
      const y = h.getAttribute("data-type") === "taskItem", b = h.getAttribute("data-checked") === "true", v = s(h);
      y ? l.push(`${u}- [${b ? "x" : " "}] ${v}`) : m === "OL" ? l.push(`${u}${g + 1}. ${v}`) : l.push(`${u}- ${v}`);
      const w = Array.from(h.childNodes).filter(
        (M) => M.nodeType === Node.ELEMENT_NODE && (M.nodeName === "UL" || M.nodeName === "OL")
      );
      for (const M of w)
        i(M, l, d + 1);
    });
  }
  function a(c) {
    const l = [];
    for (const d of Array.from(c.childNodes)) {
      if (d.nodeType !== Node.ELEMENT_NODE) {
        const h = (d.textContent || "").trim();
        h && l.push(h.replace(/\|/g, "\\|"));
        continue;
      }
      const u = d, m = u.nodeName;
      if (m === "UL" || m === "OL") {
        i(u, l, 0);
        continue;
      }
      if (m === "FIGURE") {
        const h = u.querySelector("img");
        h && l.push(r(h));
        continue;
      }
      if (m === "IMG") {
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
      const m = [];
      let p = !1;
      u.forEach((g, y) => {
        const b = Array.from(g.querySelectorAll("th, td")), v = b.map((w) => a(w));
        if (y > 0 && b.length > 0 && b[0].nodeName === "TH" && (p = !0), m.push("| " + v.join(" | ") + " |"), y === 0) {
          const w = b.map(() => "---").join(" | ");
          m.push("| " + w + " |");
        }
      });
      const h = p ? `
<!-- header-column -->` : "";
      return `

` + m.join(`
`) + h + `

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
      return d ? `@${zy(d)}@` : c;
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
  }), Lt = n, n;
}
function i1() {
  !So && !Lt && (So = yu().then((e) => (Lt = e, e)));
}
function c1() {
  return i1(), {
    turndown(e) {
      return Lt ? Lt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return Lt !== null;
    },
    async ready() {
      Lt || (So ? await So : await yu());
    }
  };
}
function l1() {
  const e = V(null);
  return e.current || (e.current = c1()), e.current;
}
function d1(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (i) => {
    Array.from(i.querySelectorAll("ul")).forEach(o);
    const c = Array.from(i.children).filter((m) => m.tagName === "LI");
    let l = !1, d = !1;
    const u = (m) => {
      const p = m.querySelector(':scope > input[type="checkbox"]');
      if (p) return p;
      const h = m.querySelector(":scope > p");
      if (h) {
        const g = h.querySelector(':scope > input[type="checkbox"]');
        if (g) return g;
      }
      return null;
    };
    c.forEach((m) => {
      u(m) ? l = !0 : d = !0;
    }), l && (c.forEach((m) => {
      const p = u(m);
      if (p) {
        const h = p.hasAttribute("checked");
        m.setAttribute("data-type", "taskItem"), m.setAttribute("data-checked", String(h));
        const g = p.parentElement, y = g && g.tagName === "P" && g.parentElement === m;
        p.remove(), y && g.firstChild && g.firstChild.nodeType === Node.TEXT_NODE && (g.firstChild.textContent = (g.firstChild.textContent || "").replace(/^\s+/, ""));
        const b = Array.from(m.childNodes), v = [], w = [];
        if (b.forEach((M) => {
          if (M.nodeType === Node.ELEMENT_NODE) {
            const x = M;
            x.tagName === "UL" || x.tagName === "OL" || x.tagName === "P" ? w.push(M) : v.push(M);
          } else
            v.push(M);
        }), m.innerHTML = "", v.length > 0) {
          const M = n.createElement("p");
          v.forEach((x) => M.appendChild(x)), M.firstChild && M.firstChild.nodeType === Node.TEXT_NODE && (M.firstChild.textContent = (M.firstChild.textContent || "").replace(/^\s+/, "")), m.appendChild(M);
        }
        w.forEach((M) => m.appendChild(M));
      }
    }), l && !d && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
const u1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, mC = hf(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  placeholder: s = 'Start writing... Use "/" for commands',
  editable: i = !0,
  autofocus: a = !1,
  className: c = "",
  showToolbar: l = !0,
  showWordCount: d = !0,
  theme: u,
  autoSave: m = !0,
  autoSaveKey: p = "paragon-editor-content",
  autoSaveDelay: h = 1e3,
  showRecoveryBanner: g = !0,
  showFloatingToolbar: y = !0,
  maxImageSize: b = 5 * 1024 * 1024,
  onImageUploadStart: v,
  onImageUploadComplete: w,
  onImageUploadError: M,
  onImageUpload: x,
  resolveImageSrc: C,
  showModeToggle: D = !0,
  // New props
  initialMode: k = "wysiwyg",
  onModeChange: T,
  onReady: E,
  onFocus: N,
  onBlur: R,
  onSelectionChange: I,
  onDestroy: O,
  onSave: H,
  onRecover: B,
  onWikiLinkClick: q,
  validateWikiLink: P,
  onWikiLinkSearch: L,
  onLinkClick: U,
  findReplaceOpen: X,
  onFindReplaceChange: G,
  renderToolbar: Z,
  renderFooter: te,
  disabledFeatures: $ = {},
  minHeight: z = "200px",
  maxHeight: j,
  spellCheck: ee = !0,
  headingLevels: he = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ve = [1, 2, 3],
  // TOC props
  showTableOfContents: Re = !1,
  tocVisible: We = !0,
  onTocVisibilityChange: rt,
  tocTitle: Ht = "",
  tocMinLevel: tr = 1,
  tocMaxLevel: nr = 4,
  tocShowLevelIndicators: Ir = !1,
  tocHighlightActive: Or = !0,
  tocTreeView: _r = !1,
  tocWidth: $r = "240px",
  tocPosition: vn = "right",
  tocScrollOffset: rr = 20,
  onTocItemClick: bn,
  renderTocItem: wn,
  tocShowToggleButton: Hr = !0,
  // Raw markdown editor
  autoClosePairs: Ko = !0,
  // Performance profiler
  showPerformanceProfiler: Vo = !1,
  onPerformanceProfilerClose: Go,
  // Auto reorder checklist
  autoReorderChecklist: qo = !1,
  // Expand selection
  progressiveSelectAll: Wr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: zr = !1,
  enableHexColorHighlight: Xo = !1,
  enableCollapsibleHeadings: Br = !1,
  // Error boundary
  onEditorError: Zo,
  // AI writing assistant
  aiActions: xt,
  onAIAction: en,
  onAISetupRequired: xn
}, me) {
  const [be] = K(() => u1()), [ae, Ce] = K(k), [Ue, ge] = K(""), qe = V(k), kt = V(""), tn = V(null), [or, kn] = K(0), Fr = !!(xt && xt.length > 0 && en), { state: Ze, executeAction: Ur, abort: wu, reset: Wt } = Jk(en), [Qo, Jo] = K(null), [xu, ku] = K({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), Cu = V(en);
  Cu.current = en;
  const Va = V(xn);
  Va.current = xn;
  const [Mu, Su] = K([]), [Tu, Eu] = K(0), Du = Y((W, F) => {
    Su(W), Eu(F);
  }, []), es = V(v), ts = V(w), ns = V(M), rs = V(x), os = V(C), Ga = V(q), ss = V(P), as = V(L);
  es.current = v, ts.current = w, ns.current = M, rs.current = x, os.current = C, Ga.current = q, ss.current = P, as.current = L;
  const Nu = Ln(() => {
    const W = [
      Yu.configure({
        heading: {
          levels: he
        },
        codeBlock: !1,
        // We use CodeBlockLowlight instead
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
      Dm,
      Nm,
      Lm,
      ju.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      Ku.configure({
        types: ["heading", "paragraph"]
      }),
      Vu.configure({
        multicolor: !0
      }),
      Gu.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      af,
      cf,
      lf,
      df,
      ck,
      uk,
      _k,
      pk,
      // Add HorizontalRule back without its built-in input rules
      // We handle HR creation via our custom space shortcut handler
      fm.extend({
        addInputRules() {
          return [];
        }
      })
    ];
    return $.tables || W.push(
      qu.configure({
        resizable: !be,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Xu,
      bm,
      wm,
      Em
    ), $.taskLists || W.push(
      Rm.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Am.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), be || W.push(
      Im.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), $.codeBlocks || W.push(_m), $.callouts || W.push(Fm, dk), Br && !$.collapsibleHeadings && W.push(
      sk.configure({
        levels: ve
      })
    ), $.images || W.push(
      Um.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (F) => {
          jr({
            isOpen: !0,
            src: F.src,
            alt: F.alt,
            pos: F.pos,
            position: { x: F.rect.left + F.rect.width / 2, y: F.rect.bottom }
          });
        },
        resolveImageSrc: os.current ? ((...F) => os.current(...F)) : void 0
      }),
      Yk.configure({
        maxFileSize: b,
        onUploadStart: es.current ? ((...F) => es.current(...F)) : void 0,
        onUploadComplete: ts.current ? ((...F) => ts.current(...F)) : void 0,
        onUploadError: ns.current ? ((...F) => ns.current(...F)) : void 0,
        onImageUpload: rs.current ? ((F, ye) => rs.current(F, ye)) : void 0
      })
    ), $.datePills || W.push(
      Fy.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), $.tagPills || W.push(
      jy.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: zr
      })
    ), $.wikiLinks || W.push(
      qx.configure({
        onWikiLinkClick: (F) => {
          console.log("WikiLink clicked:", F), Ga.current?.(F);
        },
        validateLink: (F) => ss.current ? ss.current(F) : !0
      })
    ), Wr && W.push(Nk), Xo && W.push(Ik), $.markdownPaste || W.push(
      nk.configure({
        enableMarkdownPaste: !0
      })
    ), W;
  }, [s, be, b, he, ve, $, Wr, Br]), Ct = V(null), nn = V(n), rn = V(r), is = V(o), sr = V(null);
  nn.current = n, rn.current = r, is.current = o;
  const _ = Fu({
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
    onCreate: ({ editor: W }) => {
      window.__tiptapEditor = W, E?.(W);
    },
    onDestroy: () => {
      O?.();
    },
    extensions: Nu,
    content: t,
    editable: i,
    autofocus: a,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: ee ? "true" : "false"
      },
      handleClick: (W, F, ye) => {
        if (U) {
          const Me = ye.target.closest("a");
          if (Me) {
            const Ae = Me.getAttribute("href");
            if (Ae && U(Ae, ye) === !1)
              return ye.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: W }) => {
      Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        if (W.isDestroyed) return;
        const F = W.getHTML();
        (nn.current || rn.current) && (nn.current?.(F), rn.current?.(F));
      }, 150);
    },
    onFocus: () => {
      N?.();
    },
    onBlur: () => {
      if (Ct.current && (clearTimeout(Ct.current), Ct.current = null, _ && !_.isDestroyed)) {
        const W = _.getHTML();
        if ((nn.current || rn.current) && (nn.current?.(W), rn.current?.(W)), qe.current === "wysiwyg" && sr.current) {
          const F = sr.current.turndown(W);
          kt.current = F, is.current?.(F);
        }
      }
      R?.();
    },
    onSelectionUpdate: ({ editor: W }) => {
      if (I) {
        const { from: F, to: ye, empty: ue } = W.state.selection;
        I({ from: F, to: ye, empty: ue });
      }
    }
  });
  J(() => () => {
    if (Ct.current && (clearTimeout(Ct.current), Ct.current = null, _ && !_.isDestroyed)) {
      const W = _.getHTML();
      if ((nn.current || rn.current) && (nn.current?.(W), rn.current?.(W)), qe.current === "wysiwyg" && sr.current) {
        const F = sr.current.turndown(W);
        kt.current = F, is.current?.(F);
      }
    }
  }, []);
  const [qa, Yr] = K(!1), [Cn, jr] = K(null), [Ru, Au] = K(!1), Lu = X !== void 0 ? X : Ru, zt = Y((W) => {
    Au(W), G?.(W);
  }, [G]), [Pu, cs] = K(0), [Iu, Ou] = K(""), Mt = Ux(_, {
    storageKey: p,
    debounceMs: h,
    enabled: m,
    onSave: (W) => {
      H?.(W);
    },
    onRecover: (W) => {
      B?.(W);
    }
  }), Bt = l1();
  sr.current = Bt;
  const Xa = V(!1);
  J(() => {
    if (!Xa.current && k === "markdown" && _ && !_.isDestroyed && Bt) {
      const W = _.getHTML(), F = Bt.turndown(W);
      ge(F), kt.current = F, Xa.current = !0;
    }
  }, [_, Bt, k]);
  const ft = Y(async (W) => {
    if (_) {
      if (W === "markdown" && qe.current === "wysiwyg") {
        const F = _.getHTML(), ye = Bt.turndown(F);
        ge(ye), kt.current = ye;
      } else if (W === "wysiwyg" && qe.current === "markdown") {
        const { marked: F } = await import("./marked.esm-Tjr8Gfse.js"), ye = ["info", "note", "prompt", "resources", "todo"];
        let ue = kt.current;
        ye.forEach((ie) => {
          const se = new RegExp(`\`\`\`ad-${ie}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          ue = ue.replace(se, (xe, le) => {
            const Ee = F.parse(le.trim(), { async: !1 });
            return `<div data-callout="" data-type="${ie}" class="callout callout-${ie}">${Ee}</div>`;
          });
        }), ye.forEach((ie) => {
          const se = new RegExp(`\`\`\`${ie}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          ue = ue.replace(se, (xe, le) => {
            const Ee = F.parse(le.trim(), { async: !1 });
            return `<div data-callout="" data-type="${ie}" class="callout callout-${ie}">${Ee}</div>`;
          });
        }), ue = ue.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (ie, se, xe) => {
          const le = se.split("|").map((St) => St.trim());
          let Ee = "", ze = "left", Le = null;
          le.length === 1 ? Ee = le[0] : le.length === 2 ? (Ee = le[0], /^\d+$/.test(le[1]) ? Le = le[1] : ["left", "center", "right"].includes(le[1]) ? ze = le[1] : Ee = se) : le.length === 3 ? (Ee = le[0], ["left", "center", "right"].includes(le[1]) && (ze = le[1]), /^\d+$/.test(le[2]) && (Le = le[2])) : Ee = se;
          const De = Le ? ` width="${Le}" style="width: ${Le}px"` : "", Ut = ` data-align="${ze}"`;
          return `<img src="${xe.trim()}" alt="${Ee}"${Ut}${De} />`;
        }), ue = ue.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), ue = ue.replace(/@([^@\n]+)@/g, (ie, se) => {
          const xe = ln(se);
          if (xe) {
            const le = Ta(xe);
            return `<span data-type="date-pill" data-date="${xe}" class="date-pill ${le}"><span class="date-icon">📅</span><span class="date-text">${se.trim()}</span></span>`;
          }
          return ie;
        }), zr && !$.tagPills && (ue = ue.replace(new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"), (ie, se) => {
          const xe = yr(se);
          return An(xe) ? `<span data-type="tag-pill" data-tag="${xe}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${xe}</span></span>` : ie;
        })), ue = ue.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((ie, se) => se % 2 === 1 ? ie : ie.replace(/\[\[([^\[\]]+)\]\]/g, (xe, le) => `<span data-wiki-link data-page-name="${le.trim()}" class="wiki-link">${le.trim()}</span>`)).join("");
        let Ae = F.parse(ue, { async: !1 });
        Ae = d1(Ae), Ae = Ae.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (ie, se) => se.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (xe) => xe.replace(/<tr>([\s\S]*?)<\/tr>/gi, (le, Ee) => `<tr>${Ee.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
        const ce = (ie) => {
          let se = ie;
          return se = se.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), se = se.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), se = se.replace(/~~(.+?)~~/g, "<s>$1</s>"), se = se.replace(/`([^`]+)`/g, "<code>$1</code>"), se = se.replace(/==(.+?)==/g, "<mark>$1</mark>"), se = se.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), se;
        }, Te = (ie) => {
          const se = ie.match(/data-align="([^"]*)"/), xe = se ? se[1] : "left";
          return `<figure class="image-resizer" style="${{
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          }[xe] || "margin-right: auto;"}">${ie.trim()}</figure>`;
        }, Ft = (ie) => {
          if (/<img\s/i.test(ie)) {
            const se = /(<img\s[^>]*\/?>)/gi;
            return ie.split(se).filter((le) => le.trim()).map((le) => /^<img\s/i.test(le) ? Te(le) : le.trim() ? `<p>${ce(le.trim())}</p>` : "").join("");
          }
          if (/^!\[/.test(ie)) {
            const se = ie.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (se)
              return `<figure class="image-resizer" style="margin-right: auto;"><img src="${se[2]}" alt="${se[1]}" data-align="left" /></figure>`;
          }
          return `<p>${ce(ie)}</p>`;
        }, ar = (ie) => {
          const se = ie.match(/^( *)/), xe = se ? se[1].length : 0, le = Math.floor(xe / 2), Ee = ie.trimStart(), ze = Ee.match(/^-\s*\[(x| )\]\s*(.*)$/);
          if (ze)
            return { type: "task", depth: le, text: ze[2].trim(), checked: ze[1] === "x" };
          const Le = Ee.match(/^-\s+(.+)$/);
          if (Le)
            return { type: "ul", depth: le, text: Le[1].trim() };
          const De = Ee.match(/^(\d+)\.\s+(.+)$/);
          return De ? { type: "ol", depth: le, text: De[2].trim(), index: parseInt(De[1], 10) } : null;
        }, Kr = (ie) => {
          if (ie.length === 0) return "";
          const se = (Ee, ze) => {
            let Le = "", De = Ee;
            const Ut = ie[De]?.type || "ul", St = Ut === "task", Yt = St ? '<ul data-type="taskList">' : `<${Ut === "ol" ? "ol" : "ul"}>`, ir = St ? "</ul>" : `</${Ut === "ol" ? "ol" : "ul"}>`;
            for (Le += Yt; De < ie.length && ie[De].depth >= ze; ) {
              const Tt = ie[De];
              if (Tt.depth === ze) {
                if (St ? Le += `<li data-type="taskItem" data-checked="${Tt.checked || !1}"><p>${ce(Tt.text)}</p>` : Le += `<li><p>${ce(Tt.text)}</p>`, De + 1 < ie.length && ie[De + 1].depth > ze) {
                  const sn = se(De + 1, ie[De + 1].depth);
                  Le += sn.html, De = sn.nextIdx;
                } else
                  De++;
                Le += "</li>";
              } else
                De++;
            }
            return Le += ir, { html: Le, nextIdx: De };
          }, xe = Math.min(...ie.map((Ee) => Ee.depth));
          return se(0, xe).html;
        };
        Ae = Ae.replace(
          /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
          (ie, se, xe, le) => {
            const Ee = /<img\s/i.test(xe), ze = /<br\s*\/?>/i.test(xe), Le = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(xe);
            if (!Ee && !ze && !Le) return ie;
            let De = xe.trim();
            De = De.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
            const Ut = De.split(/<br\s*\/?>/i).filter((Tt) => Tt.trim());
            if (Ut.length <= 1 && !Le)
              return Ee ? `${se}${Ft(De)}${le}` : ie;
            const St = [];
            let Yt = [];
            const ir = () => {
              Yt.length !== 0 && (St.push(Kr(Yt)), Yt = []);
            };
            for (const Tt of Ut) {
              const sn = ar(Tt);
              if (sn) {
                if (Yt.length > 0) {
                  const Bu = Yt[0].type;
                  sn.depth === 0 && sn.type !== Bu && ir();
                }
                Yt.push(sn);
              } else
                ir(), St.push(Ft(Tt.trim()));
            }
            return ir(), `${se}${St.join("")}${le}`;
          }
        ), queueMicrotask(() => {
          _.isDestroyed || _.commands.setContent(Ae);
        });
      }
      Ce(W), qe.current = W, T?.(W);
    }
  }, [_, Bt, T]), Za = Y((W) => {
    ge(W), kt.current = W, o?.(W);
  }, [o]), on = jx(_, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: d
  });
  gf(me, () => ({
    getEditor: () => _,
    getHTML: () => _?.getHTML() || "",
    getMarkdown: () => _ ? Bt.turndown(_.getHTML()) : "",
    getText: () => _?.getText() || "",
    setContent: (W) => {
      _ && !_.isDestroyed && queueMicrotask(() => {
        _.commands.setContent(W);
      });
    },
    clearContent: () => {
      _ && !_.isDestroyed && _.commands.clearContent();
    },
    focus: (W) => {
      _ && !_.isDestroyed && _.commands.focus(W);
    },
    blur: () => {
      _ && !_.isDestroyed && _.commands.blur();
    },
    isEmpty: () => _?.isEmpty || !0,
    isFocused: () => _?.isFocused || !1,
    getMode: () => qe.current,
    setMode: (W) => ft(W),
    toggleMode: () => {
      const W = qe.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return ft(W), W;
    },
    getWordCount: () => ({
      words: on.words,
      characters: on.characters,
      charactersWithSpaces: on.charactersWithSpaces
    }),
    undo: () => _?.commands.undo(),
    redo: () => _?.commands.redo(),
    canUndo: () => _?.can().undo() || !1,
    canRedo: () => _?.can().redo() || !1,
    insertContent: (W) => _?.commands.insertContent(W),
    insertImage: (W, F = "") => _?.commands.setImage({ src: W, alt: F }),
    insertTable: (W = 3, F = 3) => _?.commands.insertTable({ rows: W, cols: F, withHeaderRow: !0 }),
    insertCodeBlock: (W) => {
      W ? _?.commands.setCodeBlock({ language: W }) : _?.commands.setCodeBlock();
    },
    insertCallout: (W = "info") => _?.commands.insertCallout?.({ type: W }),
    insertHorizontalRule: () => {
      _ && io(_, _.state.selection.from, _.state.selection.from);
    },
    toggleBold: () => _?.commands.toggleBold(),
    toggleItalic: () => _?.commands.toggleItalic(),
    toggleUnderline: () => _?.commands.toggleUnderline(),
    toggleStrike: () => _?.commands.toggleStrike(),
    toggleCode: () => _?.commands.toggleCode(),
    toggleHighlight: () => _?.commands.toggleHighlight(),
    setHeading: (W) => {
      W === 0 ? _?.commands.setParagraph() : _?.commands.setHeading({ level: W });
    },
    toggleBulletList: () => _?.commands.toggleBulletList(),
    toggleOrderedList: () => _?.commands.toggleOrderedList(),
    toggleTaskList: () => _?.commands.toggleTaskList(),
    toggleBlockquote: () => _?.commands.toggleBlockquote(),
    setLink: (W) => _?.commands.setLink({ href: W }),
    unsetLink: () => _?.commands.unsetLink(),
    openFindReplace: () => {
      zt(!0), cs((W) => W + 1);
    },
    closeFindReplace: () => zt(!1),
    save: () => Mt.save(),
    clearSavedContent: () => Mt.clear(),
    getSelectedText: () => {
      if (!_) return "";
      const { from: W, to: F } = _.state.selection;
      return _.state.doc.textBetween(W, F, " ");
    },
    isEditable: () => _?.isEditable || !1,
    setEditable: (W) => _?.setEditable(W),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!_) return [];
      const W = [];
      return _.state.doc.descendants((F, ye) => {
        if (F.type.name === "heading") {
          const ue = F.attrs.level, Me = F.textContent.trim();
          Me && W.push({ id: `toc-heading-${ye}`, text: Me, level: ue, pos: ye });
        }
      }), W;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (W) => {
      if (!(!_ || _.isDestroyed))
        try {
          const F = _.state.doc.resolve(W), ye = _.view.nodeDOM(F.before(F.depth + 1));
          if (ye instanceof HTMLElement) {
            const ue = _.view.dom.closest(".editor-content-wrapper");
            if (ue) {
              const Me = ue.getBoundingClientRect(), ce = ye.getBoundingClientRect().top - Me.top + ue.scrollTop;
              ue.scrollTo({ top: ce - 20, behavior: "smooth" });
            } else
              ye.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          _.commands.setTextSelection(W + 1);
        } catch {
        }
    }
  }), [_, Bt, ft, on, Mt, zt]), J(() => {
    const W = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => qe.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (F) => {
        if (F !== "wysiwyg" && F !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        ft(F);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const F = qe.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return ft(F), F;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        ft("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        ft("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => qe.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => qe.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => qe.current === "markdown" ? kt.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (F) => {
        const ye = (ue) => {
          F(ue.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", ye), () => window.removeEventListener("paragon-editor-mode-change", ye);
      }
    };
    return window.__paragonEditorModeAPI = W, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [ft]), J(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: ae } }));
  }, [ae]), J(() => {
    if (!_ || _.isDestroyed) return;
    const W = (F) => {
      if (_.isDestroyed) return;
      const ye = F.key;
      if (!(!(F.metaKey || F.ctrlKey) && ye !== " ")) {
        if ((F.metaKey || F.ctrlKey) && F.key === "k") {
          F.preventDefault(), Yr(!0);
          return;
        }
        if (!be && (F.metaKey || F.ctrlKey) && F.key === "f") {
          if (F.preventDefault(), _) {
            const { state: Me } = _, { from: Ae, to: ce } = Me.selection;
            if (Ae !== ce) {
              const Te = Me.doc.textBetween(Ae, ce, " ");
              Te.trim() && Ou(Te.trim());
            }
          }
          zt(!0), cs((Me) => Me + 1);
          return;
        }
        if (!be && (F.metaKey || F.ctrlKey) && F.key === "h") {
          F.preventDefault(), zt(!0);
          return;
        }
        if (F.key === " ")
          try {
            const { state: Me } = _, { selection: Ae } = Me, { $from: ce } = Ae, Te = ce.nodeBefore?.textContent || "";
            if (Te === "#####") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 5, to: ce.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (Te === "####") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 4, to: ce.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (Te === "###") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 3, to: ce.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (Te === "##") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 2, to: ce.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (Te === "#") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (Te === "-" || Te === "*") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(Te)) {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - Te.length, to: ce.pos }).toggleOrderedList().run();
              return;
            }
            const Ft = /^(-\s*)?\[([ x])?\]$/.exec(Te);
            if (Ft) {
              F.preventDefault();
              const ar = Ft[2] === "x", Kr = Me.schema.nodes.taskList, ie = Me.schema.nodes.taskItem;
              if (Kr && ie) {
                const se = Me.tr, xe = ce.pos - Te.length, le = ce.pos;
                se.delete(xe, le);
                const ze = se.doc.resolve(xe).blockRange();
                if (ze) {
                  const Le = [
                    { type: Kr, attrs: {} },
                    { type: ie, attrs: { checked: ar } }
                  ];
                  se.wrap(ze, Le), _.view.dispatch(se);
                  return;
                }
              }
              _.chain().focus().deleteRange({ from: ce.pos - Te.length, to: ce.pos }).toggleTaskList().run();
              return;
            }
            if (Te === ">") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).toggleBlockquote().run();
              return;
            }
            if (Te === "```") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 3, to: ce.pos }).toggleCodeBlock().run();
              return;
            }
            if (Te === "---" || Te === "***") {
              F.preventDefault(), io(_, ce.pos - 3, ce.pos);
              return;
            }
            if (Te === "—-") {
              F.preventDefault(), io(_, ce.pos - 2, ce.pos);
              return;
            }
            if (Te === "—") {
              F.preventDefault(), io(_, ce.pos - 1, ce.pos);
              return;
            }
          } catch (Me) {
            console.warn("Space shortcut error:", Me);
          }
      }
    };
    return document.addEventListener("keydown", W, !0), () => document.removeEventListener("keydown", W, !0);
  }, [_, be, zt]);
  const Qa = Y((W, F) => {
    if (!Fr) {
      Va.current?.();
      return;
    }
    if (!_) return;
    let ye = { top: 0, left: 0 };
    if (F) {
      const ue = F.getBoundingClientRect();
      ye = { top: ue.bottom + 4, left: ue.left };
    } else {
      const { from: ue, to: Me } = _.state.selection, Ae = _.view.coordsAtPos(ue), ce = _.view.coordsAtPos(Me);
      ye = { top: ce.bottom + 8, left: (Ae.left + ce.left) / 2 };
    }
    Jo({ scope: W, position: ye });
  }, [Fr, _]), _u = Y((W, F) => {
    if (!_ || !xt) return;
    const ye = xt.find((ar) => ar.id === W);
    if (!ye) return;
    const { from: ue, to: Me } = _.state.selection, Ae = ue !== Me ? _.state.doc.textBetween(ue, Me, `
`) : "", ce = ye.scope === "document" || !Ae ? _.getText() : Ae, Te = _.view.coordsAtPos(ue), Ft = _.view.coordsAtPos(Me);
    ku({
      selectionTop: Te.top,
      selectionBottom: Ft.bottom,
      selectionCenterX: (Te.left + Ft.right) / 2
    }), Jo(null), Ur(W, ye.label, ce, { from: ue, to: Me }, F);
  }, [_, xt, Ur]), $u = Y(() => {
    if (!_ || Ze.status !== "complete") return;
    const { selectionRange: W, result: F } = Ze;
    _.chain().focus().setTextSelection(W).deleteSelection().insertContent(F).run(), Wt();
  }, [_, Ze, Wt]), Hu = Y(() => {
    if (!_ || Ze.status !== "complete") return;
    const { selectionRange: W, result: F } = Ze;
    _.chain().focus().setTextSelection(W.to).insertContent(`
` + F).run(), Wt();
  }, [_, Ze, Wt]), Wu = Y(() => {
    if (!(Ze.status !== "complete" && Ze.status !== "error"))
      if (Ze.status === "complete") {
        const { action: W, actionLabel: F, inputText: ye, selectionRange: ue } = Ze;
        Wt(), Ur(W, F, ye, ue);
      } else
        Wt();
  }, [Ze, Wt, Ur]);
  if (!_)
    return /* @__PURE__ */ f("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: /* @__PURE__ */ A("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const Ja = /* @__PURE__ */ f(
    $x,
    {
      editor: _,
      onOpenLinkPopover: () => Yr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        zt(!0), cs((W) => W + 1);
      },
      disabledFeatures: $,
      autoReorderChecklist: qo,
      aiEnabled: Fr || !!xn,
      onAISparklesClick: (W) => Qa("document", W)
    }
  ), ei = /* @__PURE__ */ A("div", { className: "editor-footer", children: [
    m && /* @__PURE__ */ f(
      Kx,
      {
        status: Mt.status,
        lastSaved: Mt.lastSaved
      }
    ),
    /* @__PURE__ */ f("div", { className: "word-count", children: /* @__PURE__ */ A("span", { children: [
      on.words,
      " words"
    ] }) })
  ] }), zu = {
    minHeight: z,
    ...j && { maxHeight: j, overflowY: "auto" }
  };
  return /* @__PURE__ */ A("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: [
    m && g && Mt.hasRecoverableContent && /* @__PURE__ */ f(
      Vx,
      {
        onRecover: () => {
          Mt.recover();
        },
        onDismiss: Mt.dismissRecovery
      }
    ),
    l && /* @__PURE__ */ A("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z(_, Ja) : Ja,
      D && /* @__PURE__ */ A("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => ft("wysiwyg"),
            className: `editor-mode-toggle-btn ${ae === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ f(em, {})
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => ft("markdown"),
            className: `editor-mode-toggle-btn ${ae === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ f(ha, {})
          }
        )
      ] })
    ] }),
    !be && /* @__PURE__ */ f(
      Hx,
      {
        editor: _,
        isOpen: Lu,
        onClose: () => zt(!1),
        focusTrigger: Pu,
        initialSearchQuery: Iu,
        editorMode: ae,
        rawMarkdown: Ue,
        onRawMarkdownChange: Za,
        onMatchesChange: Du
      }
    ),
    /* @__PURE__ */ f(Bx, { editor: _ }),
    /* @__PURE__ */ A("div", { className: `editor-main-area ${Re ? "editor-with-toc" : ""}`, children: [
      Re && vn === "left" && /* @__PURE__ */ f(
        pc,
        {
          editor: _,
          visible: We,
          onVisibilityChange: rt,
          title: Ht,
          minLevel: tr,
          maxLevel: nr,
          showLevelIndicators: Ir,
          highlightActive: Or,
          treeView: _r,
          width: $r,
          position: vn,
          scrollOffset: rr,
          onItemClick: bn,
          renderItem: wn,
          showToggleButton: Hr,
          scrollContainerRef: tn
        }
      ),
      /* @__PURE__ */ A(
        Xk,
        {
          resetKey: `${t}-${or}`,
          onRetry: () => kn((W) => W + 1),
          onClearContent: () => {
            _ && _.commands.clearContent(), n?.(""), r?.(""), o?.(""), kn((W) => W + 1);
          },
          onError: Zo,
          children: [
            /* @__PURE__ */ f("div", { className: "editor-content-wrapper", ref: tn, style: zu, children: ae === "wysiwyg" ? /* @__PURE__ */ A(He, { children: [
              /* @__PURE__ */ f(Uu, { editor: _, className: "editor-content" }),
              !$.images && !$.dragAndDrop && /* @__PURE__ */ f(jk, { containerRef: tn, enabled: i }),
              !be && y && /* @__PURE__ */ f(zm, { editor: _, suppressWhenLinkPopoverOpen: qa, aiEnabled: Fr || !!xn, onAISparklesClick: (W) => Qa("selection", W) }),
              Qo && xt && /* @__PURE__ */ f(
                t1,
                {
                  actions: xt,
                  scope: Qo.scope,
                  position: Qo.position,
                  onAction: _u,
                  onClose: () => Jo(null)
                }
              ),
              Ze.status !== "idle" && /* @__PURE__ */ f(
                n1,
                {
                  state: Ze,
                  position: xu,
                  onReplace: $u,
                  onInsert: Hu,
                  onRetry: Wu,
                  onDiscard: () => {
                    wu(), Wt();
                  }
                }
              ),
              !$.slashCommands && /* @__PURE__ */ f(Zy, { editor: _, disabledFeatures: $ }),
              !$.wikiLinks && as.current && /* @__PURE__ */ f(
                nv,
                {
                  editor: _,
                  onSearch: as.current
                }
              ),
              /* @__PURE__ */ f(
                $m,
                {
                  editor: _,
                  isOpen: qa,
                  onClose: () => Yr(!1)
                }
              ),
              !be && /* @__PURE__ */ f(
                Hm,
                {
                  editor: _,
                  onEditLink: () => Yr(!0)
                }
              ),
              !$.images && Cn?.isOpen && /* @__PURE__ */ f(
                Kk,
                {
                  src: Cn.src,
                  alt: Cn.alt,
                  position: Cn.position,
                  onSave: (W, F) => {
                    _.chain().focus().setNodeSelection(Cn.pos).updateAttributes("resizableImage", {
                      src: W,
                      alt: F
                    }).run(), jr(null);
                  },
                  onDelete: () => {
                    _.chain().focus().setNodeSelection(Cn.pos).deleteSelection().run(), jr(null);
                  },
                  onClose: () => jr(null)
                }
              )
            ] }) : /* @__PURE__ */ f(
              Vk,
              {
                content: Ue,
                onChange: Za,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: Mu,
                currentMatchIndex: Tu,
                autoClosePairs: Ko
              }
            ) }),
            /* @__PURE__ */ f(Zk, { scrollContainerRef: tn })
          ]
        }
      ),
      Re && vn === "right" && /* @__PURE__ */ f(
        pc,
        {
          editor: _,
          visible: We,
          onVisibilityChange: rt,
          title: Ht,
          minLevel: tr,
          maxLevel: nr,
          showLevelIndicators: Ir,
          highlightActive: Or,
          treeView: _r,
          width: $r,
          position: vn,
          scrollOffset: rr,
          onItemClick: bn,
          renderItem: wn,
          showToggleButton: Hr,
          scrollContainerRef: tn
        }
      )
    ] }),
    d && (te ? te(
      { words: on.words, characters: on.characters },
      Mt.status,
      ei
    ) : ei),
    /* @__PURE__ */ f(qk, { visible: Vo, onClose: Go, editor: _ })
  ] });
}), pC = Eo.create({
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
      jn(this.options.HTMLAttributes, t, {
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
}, f1 = {
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
}, m1 = {
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
}, p1 = {
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
}, pr = {
  dark: vu,
  light: f1,
  sepia: m1,
  nord: p1
};
function h1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function hC(e, t, n, r) {
  const o = pr[e] || vu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const bu = vc(null);
function gC({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = K(t), s = pr[r] || pr.dark, i = Y((c) => {
    pr[c] && o(c);
  }, []);
  J(() => {
    n?.current && h1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(pr)
  };
  return /* @__PURE__ */ f(bu.Provider, { value: a, children: e });
}
function yC() {
  const e = bc(bu);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const hc = [
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
function vC({ node: e, updateAttributes: t }) {
  const [n, r] = K(!1), o = e.attrs.language || "plaintext";
  hc.find((i) => i.value === o)?.label;
  const s = Y(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ A(Bn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ f(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: hc.map(({ value: i, label: a }) => /* @__PURE__ */ f("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ f(Xt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ f(Vn, { size: 14 }) : /* @__PURE__ */ f(Gn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("pre", { className: "code-block-pre", children: /* @__PURE__ */ f("code", { children: /* @__PURE__ */ f(ta, {}) }) })
  ] });
}
export {
  Kx as AutoSaveIndicator,
  pC as Callout,
  dk as CalloutInputRule,
  vC as CodeBlockComponent,
  sk as CollapsibleHeading,
  Im as CollapsibleList,
  Fy as DatePill,
  gC as EditorThemeProvider,
  $x as EditorToolbar,
  Hx as FindReplace,
  zm as FloatingToolbar,
  jk as ImageDropZone,
  Yk as ImageUpload,
  mC as MarkdownEditor,
  ck as MarkdownLinkInputRule,
  nk as MarkdownPasteSafe,
  Dm as MixedBulletList,
  Lm as MixedListItem,
  Nm as MixedOrderedList,
  Am as MixedTaskItem,
  Rm as MixedTaskList,
  Vx as RecoveryBanner,
  Um as ResizableImage,
  uk as SearchHighlight,
  Bx as SelectAllActionBar,
  _k as SelectAllOccurrences,
  Zy as SlashCommands,
  pk as TabIndent,
  pc as TableOfContents,
  jy as TagPill,
  qx as WikiLinkSafe,
  h1 as applyTheme,
  hC as createCustomTheme,
  vu as darkTheme,
  Ta as getDateVariant,
  An as isValidTag,
  f1 as lightTheme,
  we as lowlight,
  p1 as nordTheme,
  yr as normalizeTag,
  ln as parseDateFromMarkdown,
  m1 as sepiaTheme,
  pr as themes,
  Ux as useAutoSave,
  yC as useEditorTheme,
  jx as useWordCount
};
//# sourceMappingURL=paragon.js.map
