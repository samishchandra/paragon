import { jsxs as R, jsx as f, Fragment as He } from "react/jsx-runtime";
import { ReactNodeViewRenderer as No, NodeViewWrapper as zn, NodeViewContent as aa, useEditorState as Mc, useEditor as ju, EditorContent as Ku } from "@tiptap/react";
import Vu from "@tiptap/starter-kit";
import Gu from "@tiptap/extension-placeholder";
import qu from "@tiptap/extension-text-align";
import Xu from "@tiptap/extension-highlight";
import Zu from "@tiptap/extension-link";
import { Table as Qu } from "@tiptap/extension-table";
import Ju from "@tiptap/extension-table-row";
import ef from "@tiptap/extension-table-cell";
import tf from "@tiptap/extension-table-header";
import { Plugin as je, PluginKey as Ke, TextSelection as mn, AllSelection as nf } from "@tiptap/pm/state";
import { DecorationSet as Xe, Decoration as st } from "@tiptap/pm/view";
import { Extension as ut, Node as Ao, mergeAttributes as Yn, InputRule as Qe, Mark as Sc } from "@tiptap/core";
import rf from "@tiptap/extension-bullet-list";
import of from "@tiptap/extension-ordered-list";
import sf from "@tiptap/extension-list-item";
import af from "@tiptap/extension-task-list";
import cf from "@tiptap/extension-task-item";
import { findWrapping as li, canJoin as lf } from "@tiptap/pm/transform";
import df from "@tiptap/extension-underline";
import uf from "@tiptap/extension-subscript";
import ff from "@tiptap/extension-superscript";
import mf from "@tiptap/extension-typography";
import pf from "@tiptap/extension-code-block-lowlight";
import { createLowlight as hf } from "lowlight";
import * as S from "react";
import J, { useState as K, useRef as V, useEffect as Q, useCallback as Y, memo as jn, createContext as Ec, useContext as Tc, useLayoutEffect as Ro, useMemo as Rn, Component as gf, useReducer as yf, forwardRef as vf, useImperativeHandle as bf } from "react";
import { ChevronDown as Qt, Check as Kn, Copy as Vn, Link2 as ia, ExternalLink as wf, Pencil as xf, Unlink as kf, Bold as ca, Italic as la, Underline as da, Strikethrough as ua, Code as Dc, Highlighter as Nc, Link as fa, Quote as ma, List as pa, ListOrdered as ha, CheckSquare as ga, FileCode as Cf, Sparkles as Lo, ListTodo as ya, BookOpen as va, MessageSquareText as Ac, StickyNote as Rc, Info as vo, ChevronRight as Lc, ChevronLeftIcon as Mf, ChevronRightIcon as Sf, ChevronDownIcon as Ef, Calendar as Ic, Hash as di, Image as ba, X as Ot, Type as Io, Heading1 as Tf, Heading2 as Df, Heading3 as Nf, Heading4 as Af, Heading5 as Rf, Code2 as Pc, Table as $s, Minus as Oc, FileText as wa, Plus as xa, Undo as Lf, Redo as If, IndentIncrease as Pf, IndentDecrease as Of, PenLine as _f, Library as $f, Columns as ui, Trash2 as Ln, Rows as fi, ToggleLeft as mi, ArrowUpDown as Hf, Search as Wf, ChevronUp as zf, MousePointerClick as Bf, CaseSensitive as Ff, WholeWord as Uf, Regex as Yf, Replace as Hs, ReplaceAll as jf, Cloud as Kf, Loader2 as _c, CloudOff as Vf, AlertCircle as Gf, RotateCcw as ka, ImagePlus as qf, Activity as Xf, Maximize2 as $c, Minimize2 as Hc, AlertTriangle as Zf, CheckCircle2 as Qf, MessageSquare as Wc, RefreshCw as Jf, SpellCheck as em, PanelRightClose as tm, PanelRightOpen as nm, Eye as rm } from "lucide-react";
import Ca from "highlight.js/lib/languages/javascript";
import Ma from "highlight.js/lib/languages/typescript";
import zc from "highlight.js/lib/languages/python";
import Sa from "highlight.js/lib/languages/xml";
import om from "highlight.js/lib/languages/css";
import sm from "highlight.js/lib/languages/json";
import Po from "highlight.js/lib/languages/bash";
import * as Bc from "react-dom";
import am, { createPortal as im } from "react-dom";
import cm from "@tiptap/extension-image";
import { createRoot as lm } from "react-dom/client";
import { Fragment as dm } from "@tiptap/pm/model";
import { liftListItem as pi, sinkListItem as hi } from "@tiptap/pm/schema-list";
import { undo as um, redo as fm } from "@tiptap/pm/history";
import mm from "@tiptap/extension-horizontal-rule";
const pm = new Ke("tableCellMenu");
let gi = !1, Gr = null;
function hm() {
  gi || (gi = !0, document.addEventListener("mouseover", (e) => {
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
function gm(e) {
  return hm(), new je({
    key: pm,
    state: {
      init() {
        return Xe.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && Gr ? Gr.map(t.mapping, t.doc) : (Gr = ym(o.doc, e), Gr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function ym(e, t) {
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
          t.chain().focus().setTextSelection(o + 1).run(), vm(h, t, o, g);
        }), a.appendChild(c), a;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), Xe.create(e, n);
}
function vm(e, t, n, r) {
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
    { label: "Copy Table", icon: "copy", action: () => bm(t) }
  ], M = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, x = p ? "#2a2a2a" : "#f5f5f5", k = p ? "#ff6b6b" : "#dc2626", D = p ? "#999999" : "#666666", C = p ? "#333333" : "#e5e5e5";
  w.forEach((N) => {
    if (N.label === "divider") {
      const A = document.createElement("div");
      A.style.cssText = "height:1px;background:" + C + ";margin:4px 0;", s.appendChild(A);
    } else {
      const A = document.createElement("button");
      A.type = "button";
      const P = N.destructive ? k : y;
      A.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + P + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const O = M[N.icon || ""] || "", H = N.destructive ? k : D;
      A.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + H + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + N.label + "</span>", A.addEventListener("mouseenter", () => {
        A.style.background = N.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : x;
      }), A.addEventListener("mouseleave", () => {
        A.style.background = "transparent";
      }), A.addEventListener("click", (B) => {
        B.preventDefault(), B.stopPropagation(), N.action && N.action(), s.remove();
      }), s.appendChild(A);
    }
  }), document.body.appendChild(s);
  const E = (N) => {
    const A = N.target;
    if (s.contains(A) || A.classList.contains("table-cell-menu-btn"))
      return;
    const P = A.closest('[role="dialog"]');
    P && P.contains(s) || (s.remove(), document.removeEventListener("mousedown", E), document.removeEventListener("keydown", T));
  }, T = (N) => {
    N.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", E), document.removeEventListener("keydown", T));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", E), document.addEventListener("keydown", T);
  }, 0);
}
function bm(e) {
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
const wm = ef.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      gm(this.editor)
    ];
  }
}), xm = tf.extend({}), gr = new Ke("tableSorting");
let dn = null, fr = null;
function km(e) {
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
function Cm(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function Mm(e, t, n) {
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
  dn = { tablePos: t, columnIndex: n, direction: i }, fr = null;
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
    yi(n, i), o.dispatch(r.tr.setMeta(gr, { updated: !0 }));
    return;
  }
  const d = l.map((h) => {
    let g = "", y = 0;
    return h.node.forEach((b) => {
      y === n && (g = b.textContent || ""), y++;
    }), { ...h, sortValue: km(g) };
  }), u = d.map((h, g) => g);
  d.sort((h, g) => Cm(h.sortValue, g.sortValue, i));
  const m = d.map((h, g) => l.indexOf(h));
  if (u.some((h, g) => h !== m[g])) {
    const h = [];
    c.forEach((b) => h.push(b.node)), d.forEach((b) => h.push(b.node));
    const g = s.type.create(s.attrs, h), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(gr, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(gr, { updated: !0 }));
  yi(n, i);
}
function yi(e, t) {
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
function Sm(e, t, n, r) {
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
    d.preventDefault(), d.stopPropagation(), Mm(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function Em(e) {
  return new je({
    key: gr,
    state: {
      init() {
        return Xe.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(gr);
        return !t.docChanged && !s?.updated && fr ? fr.map(t.mapping, t.doc) : (fr = Tm(o.doc, e), fr);
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
              const g = dn?.tablePos === s && dn?.columnIndex === c ? dn.direction : null, y = c, b = s, v = st.widget(p, () => Sm(g, b, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(v);
            }
            l += d.nodeSize, c++;
          });
        }
      });
    }
  }), Xe.create(e, n);
}
const Dm = ut.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Em(this.editor)];
  }
});
function Ea(e, t, n, r, o, s = {}) {
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
const Nm = rf.extend({
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
          if (Ea(n, m, i, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Am = of.extend({
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
          if (Ea(n, m, c, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Rm = af.extend({
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
          const k = c.node(x);
          if (k.type === h || k.type === g) {
            b = k, v = c.before(x);
            break;
          }
        }
        if (b) {
          if (!o) return !0;
          const x = v, k = r.doc.nodeAt(x);
          if (!k) return !1;
          r.setNodeMarkup(x, u, k.attrs);
          const D = r.doc.nodeAt(x);
          if (!D) return !1;
          const C = [];
          D.forEach((E, T) => {
            E.type === y && C.push(x + 1 + T);
          });
          for (let E = C.length - 1; E >= 0; E--) {
            const T = C[E], N = r.doc.nodeAt(T);
            N && N.type === y && r.setNodeMarkup(T, m, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const w = li(d, u);
        if (w) {
          r.wrap(d, w);
          const { $from: x } = r.selection;
          let k = -1;
          for (let D = x.depth; D > 0; D--)
            if (x.node(D).type === u) {
              k = x.before(D);
              break;
            }
          if (k >= 0) {
            const D = r.doc.nodeAt(k);
            if (D) {
              const C = [];
              D.forEach((E, T) => {
                E.type === y && C.push(k + 1 + T);
              });
              for (let E = C.length - 1; E >= 0; E--) {
                const T = C[E], N = r.doc.nodeAt(T);
                N && N.type === y && r.setNodeMarkup(T, m, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const M = li(d, h);
        if (M) {
          r.wrap(d, M);
          const { $from: x } = r.selection;
          let k = -1;
          for (let D = x.depth; D > 0; D--)
            if (x.node(D).type === h) {
              k = x.before(D);
              break;
            }
          return k >= 0 && Ea(r, k, u, m, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Lm = cf.extend({
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
      new je({
        key: new Ke("taskItemInputRule"),
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
              v && v.type === t && lf(h.doc, m - 1) && h.join(m - 1);
            }
            return n.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), Im = sf.extend({
  content: "paragraph block*"
}), vi = new Ke("collapsibleList");
function Ws(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function zs(e) {
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
function ms(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !zs(o))
      return !0;
    const i = Ws(o, s), a = t.collapsedItems.has(i);
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
const Om = ut.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !zs(o))
          return !1;
        const s = Ws(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && zs(o) && n.collapsedItems.add(Ws(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new je({
        key: vi,
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
              decorations: ms(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: ms(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = vi.getState(n);
            return r?.decorations ? r.decorations : ms(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Ae = hf();
Ae.register("javascript", Ca);
Ae.register("js", Ca);
Ae.register("jsx", Ca);
Ae.register("typescript", Ma);
Ae.register("ts", Ma);
Ae.register("tsx", Ma);
Ae.register("python", zc);
Ae.register("py", zc);
Ae.register("xml", Sa);
Ae.register("html", Sa);
Ae.register("svg", Sa);
Ae.register("css", om);
Ae.register("json", sm);
Ae.register("bash", Po);
Ae.register("sh", Po);
Ae.register("shell", Po);
Ae.register("zsh", Po);
const Bs = {
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
}, qr = /* @__PURE__ */ new Set(), Xr = /* @__PURE__ */ new Set();
async function _m(e) {
  if (Ae.registered(e)) return !0;
  const t = Bs[e];
  if (!t) return !1;
  if (Xr.has(e)) return !0;
  if (qr.has(e))
    return new Promise((n) => {
      const r = () => {
        Xr.has(e) ? n(!0) : qr.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  qr.add(e);
  try {
    const r = (await t()).default;
    Ae.register(e, r), Xr.add(e);
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
          i !== e && !Ae.registered(i) && (Ae.register(i, r), Xr.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    qr.delete(e);
  }
}
function $m({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = K(!1), [s, i] = K(!1), [a, c] = K(!0), l = V(null), d = e.attrs.language || "plaintext";
  Q(() => {
    const g = l.current;
    if (!g || s) return;
    const y = new IntersectionObserver(
      (b) => {
        for (const v of b)
          v.isIntersecting && (i(!0), y.unobserve(g));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return y.observe(g), () => {
      y.disconnect();
    };
  }, [s]), Q(() => {
    if (s && d !== "plaintext") {
      if (Ae.registered(d)) {
        c(!0);
        return;
      }
      Bs[d] && (c(!1), _m(d).then((g) => {
        c(g);
      }));
    }
  }, [s, d]);
  const u = Y(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (g) {
      console.error("Failed to copy:", g);
    }
  }, [e.textContent]), m = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...m, ...Object.keys(Bs)])).sort(), h = d === "plaintext" ? "Plain Text" : d.charAt(0).toUpperCase() + d.slice(1);
  return /* @__PURE__ */ R(zn, { className: "code-block-wrapper", ref: l, children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ R(
          "select",
          {
            value: d,
            onChange: (g) => t({ language: g.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ f("option", { value: "plaintext", children: "Plain Text" }),
              p.map((g) => /* @__PURE__ */ f("option", { value: g, children: g.charAt(0).toUpperCase() + g.slice(1) }, g))
            ]
          }
        ),
        /* @__PURE__ */ f("span", { className: "code-block-language-label", children: h }),
        /* @__PURE__ */ f(Qt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          onClick: u,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ f(Kn, { size: 14 }) : /* @__PURE__ */ f(Vn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("pre", { className: `code-block-pre ${!s || !a ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ f(aa, { className: s && a ? `language-${d}` : "language-plaintext" }) })
  ] });
}
const Hm = pf.extend({
  addNodeView() {
    return No($m);
  }
}).configure({
  lowlight: Ae,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function Wt({
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
  return im(
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
function Wm({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = K(""), s = V(null), i = V(null), [a, c] = K({ top: 0, left: 0 });
  Q(() => {
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
  }, [t, e]), Q(() => {
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
      children: /* @__PURE__ */ R("form", { onSubmit: l, className: "link-popover-form", children: [
        /* @__PURE__ */ R("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ f(ia, { className: "link-popover-icon", size: 16 }),
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
  return /* @__PURE__ */ f(Wt, { children: p });
}
function zm({ editor: e, onEditLink: t }) {
  const [n, r] = K({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = V(null), s = V(null), i = Y((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const M = w.getAttribute("href") || "", x = w.getBoundingClientRect(), k = x.bottom + 8, D = Math.max(16, Math.min(x.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: M,
          position: { top: k, left: D },
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
  Q(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const M = (k) => {
      const C = k.target.closest("a");
      C && w.contains(C) && i(C);
    }, x = (k) => {
      const D = k.target, C = k.relatedTarget;
      if (D.closest("a")) {
        if (C && o.current?.contains(C))
          return;
        a();
      }
    };
    return w.addEventListener("mouseover", M), w.addEventListener("mouseout", x), () => {
      w.removeEventListener("mouseover", M), w.removeEventListener("mouseout", x), s.current && clearTimeout(s.current);
    };
  }, [e, i, a]), Q(() => {
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
      let x = null, k = null;
      M.descendants((D, C) => {
        if (D.isText && D.marks.some((E) => E.type.name === "link")) {
          const E = w.nodeDOM(C);
          if (E && (E === n.linkElement || E.parentElement === n.linkElement))
            return x = C, k = C + D.nodeSize, !1;
        }
        return !0;
      }), x !== null && k !== null ? e.chain().focus().setTextSelection({ from: x, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), h = Y(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: M } = w.state;
      M.descendants((x, k) => {
        if (x.isText && x.marks.some((D) => D.type.name === "link")) {
          const D = w.nodeDOM(k);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + x.nodeSize }).run(), !1;
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
      children: /* @__PURE__ */ R("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ R(
          "button",
          {
            onClick: m,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ f(wf, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ f("span", { className: "link-hover-tooltip-url", children: g || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ R("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ f(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ f(xf, { size: 14 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: u,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: l ? /* @__PURE__ */ f(Kn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ f(Vn, { size: 14 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ f(kf, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ f(Wt, { children: v });
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
), bi = () => /* @__PURE__ */ f("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), wi = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Bm = jn(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = K(!1), d = V(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", m = wi.find((h) => h.value === u)?.shortLabel || "P";
  Q(() => {
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
  return /* @__PURE__ */ R("div", { ref: d, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ R(
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
          /* @__PURE__ */ f(Qt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
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
        children: wi.map((h) => {
          const g = h.value === u;
          return /* @__PURE__ */ R(
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
}), Fm = jn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const i = V(null), a = Mc({
    editor: t,
    selector: ({ editor: E }) => ({
      isBold: E.isActive("bold"),
      isItalic: E.isActive("italic"),
      isUnderline: E.isActive("underline"),
      isStrike: E.isActive("strike"),
      isCode: E.isActive("code"),
      isHighlight: E.isActive("highlight"),
      isLink: E.isActive("link"),
      isH1: E.isActive("heading", { level: 1 }),
      isH2: E.isActive("heading", { level: 2 }),
      isH3: E.isActive("heading", { level: 3 }),
      isH4: E.isActive("heading", { level: 4 }),
      isH5: E.isActive("heading", { level: 5 }),
      isBulletList: E.isActive("bulletList"),
      isOrderedList: E.isActive("orderedList"),
      isTaskList: E.isActive("taskList"),
      isBlockquote: E.isActive("blockquote"),
      isCodeBlock: E.isActive("codeBlock")
    })
  }), [c, l] = K(!1), [d, u] = K(""), [m, p] = K(!1), [h, g] = K({ top: 0, left: 0 }), y = V(null), b = V(null), v = V(null), w = Y(() => {
    if (d) {
      let E = d.trim();
      !/^https?:\/\//i.test(E) && !E.startsWith("mailto:") && (E = "https://" + E), t.chain().focus().extendMarkRange("link").setLink({ href: E }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    l(!1), u("");
  }, [t, d]), M = (E) => {
    E.preventDefault(), E.stopPropagation();
    const T = t.getAttributes("link").href;
    u(T || ""), l(!0);
  }, x = Y((E, T) => {
    E.preventDefault(), E.stopPropagation(), T();
  }, []);
  Q(() => {
    if (!t || t.isDestroyed) return;
    const E = () => {
      if (!t.isDestroyed)
        try {
          const { selection: T } = t.state, { empty: N, from: A, to: P } = T, B = ("node" in T && T.node ? T.node : null)?.type?.name === "resizableImage";
          if (N || B || t.isActive("codeBlock")) {
            v.current && (clearTimeout(v.current), v.current = null), b.current && clearTimeout(b.current), b.current = setTimeout(() => {
              p(!1), l(!1);
            }, 150);
            return;
          }
          b.current && (clearTimeout(b.current), b.current = null);
          const q = t.view.coordsAtPos(A), I = t.view.coordsAtPos(P), L = y.current?.offsetWidth || 500, U = y.current?.offsetHeight || 40, X = 8, G = window.innerWidth;
          let Z = 0, te = 0;
          if (y.current) {
            const ge = y.current.closest('[data-slot="dialog-content"]');
            if (ge) {
              const ye = ge.getBoundingClientRect();
              Z = ye.left, te = ye.top;
            }
          }
          let z = (q.left + I.left) / 2 - L / 2 - Z;
          const j = Z ? G - Z : G;
          z = Math.max(X, Math.min(j - L - X, z));
          let ee = q.top - U - 10 - te;
          ee < X && (ee = I.bottom + 10 - te), m ? g({ top: Math.max(X, ee), left: z }) : (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
            g({ top: Math.max(X, ee), left: z }), p(!0);
          }, 50));
        } catch (T) {
          console.warn("FloatingToolbar: Error updating position", T);
        }
    };
    return t.on("selectionUpdate", E), () => {
      t.off("selectionUpdate", E), b.current && clearTimeout(b.current), v.current && clearTimeout(v.current);
    };
  }, [t, m]);
  const k = (E) => {
    b.current && (clearTimeout(b.current), b.current = null);
  };
  if (!m || r)
    return null;
  const D = 15, C = c ? /* @__PURE__ */ f(
    "div",
    {
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: k,
      children: /* @__PURE__ */ R("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ f(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: d,
            onChange: (E) => u(E.target.value),
            onKeyDown: (E) => {
              E.key === "Enter" && (E.preventDefault(), w()), E.key === "Escape" && (l(!1), u(""));
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
          /* @__PURE__ */ f(
            "button",
            {
              onMouseDown: (E) => {
                E.preventDefault(), w();
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
              onMouseDown: (E) => {
                E.preventDefault(), l(!1), u("");
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
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: k,
      children: [
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleBold().run()),
            isActive: a?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ f(ca, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleItalic().run()),
            isActive: a?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ f(la, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleUnderline().run()),
            isActive: a?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ f(da, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleStrike().run()),
            isActive: a?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ f(ua, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleCode().run()),
            isActive: a?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ f(Dc, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleHighlight().run()),
            isActive: a?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ f(Nc, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: M,
            isActive: a?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ f(fa, { size: D })
          }
        ),
        /* @__PURE__ */ f(bi, {}),
        /* @__PURE__ */ f(
          Bm,
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
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleBlockquote().run()),
            isActive: a?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ f(ma, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleBulletList().run()),
            isActive: a?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ f(pa, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleOrderedList().run()),
            isActive: a?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ f(ha, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleTaskList().run()),
            isActive: a?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ f(ga, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          ot,
          {
            onMouseDown: (E) => x(E, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: a?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ f(Cf, { size: D })
          }
        ),
        o && /* @__PURE__ */ R(He, { children: [
          /* @__PURE__ */ f(bi, {}),
          /* @__PURE__ */ f(
            "button",
            {
              ref: i,
              onMouseDown: (E) => {
                E.preventDefault(), E.stopPropagation(), i.current && s?.(i.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ f(Lo, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ f(Wt, { onMouseDown: k, children: C });
}), Zr = {
  info: { icon: vo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: Rc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: Ac, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: va, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: ya, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function Um({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = K(!1), [s, i] = K(!1), [a, c] = K(null), l = V(null), d = V(null), u = e.attrs.type || "info", m = Zr[u] || Zr.info, p = m.icon, h = Y(() => {
    if (d.current) {
      const v = d.current.getBoundingClientRect();
      c({
        top: v.bottom + 4,
        left: v.left
      });
    }
  }, []);
  Q(() => {
    if (!r) return;
    const v = (w) => {
      l.current && !l.current.contains(w.target) && d.current && !d.current.contains(w.target) && o(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [r]), Q(() => {
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
  return /* @__PURE__ */ R(zn, { className: `callout callout-${u}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": u, children: [
    /* @__PURE__ */ R(
      "div",
      {
        className: "callout-header",
        contentEditable: !1,
        onClick: b,
        style: { cursor: "pointer" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ R(
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
                n.isEditable && /* @__PURE__ */ f(Qt, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ f(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: m.borderColor },
              children: s ? /* @__PURE__ */ f(Lc, { size: 16 }) : /* @__PURE__ */ f(Qt, { size: 16 })
            }
          ),
          r && n.isEditable && a && /* @__PURE__ */ f(Wt, { children: /* @__PURE__ */ f(
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
              children: Object.keys(Zr).map((v) => {
                const w = Zr[v], M = w.icon;
                return /* @__PURE__ */ R(
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
    /* @__PURE__ */ f("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ f(aa, {}) })
  ] });
}
const Ym = Ao.create({
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
      Yn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return No(Um);
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
}), jm = cm.extend({
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
        Yn(this.options.HTMLAttributes, e)
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
          Z.preventDefault(), Z.stopPropagation(), X(), m.style.display = "none", E = !1;
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
      ], k = [], D = (L) => {
        k.forEach((U) => {
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
        }), k.push(G), M.appendChild(G);
      }), m.appendChild(M);
      const C = () => {
        const L = o.attrs.align || "left";
        D(L);
      };
      let E = !1;
      u.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), E)
          m.style.display = "none", E = !1;
        else {
          const U = u.getBoundingClientRect(), X = 200, G = m.closest('[role="dialog"]');
          let Z = 0, te = 0;
          if (G) {
            const ye = G.getBoundingClientRect();
            Z = ye.left, te = ye.top;
          }
          let $ = U.bottom + 4 - te, z = U.right - X - Z;
          const j = window.innerHeight, ee = window.innerWidth, ge = 200;
          U.bottom + 4 + ge > j && ($ = U.top - ge - 4 - te), z + Z < 8 && (z = 8 - Z), z + X + Z > ee - 8 && (z = ee - X - 8 - Z), m.style.top = `${$}px`, m.style.left = `${z}px`, m.style.display = "flex", E = !0, C();
        }
      });
      const T = (L) => {
        !m.contains(L.target) && !u.contains(L.target) && (m.style.display = "none", E = !1);
      };
      document.addEventListener("click", T);
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
      const A = s.closest('[role="dialog"]');
      A ? A.appendChild(m) : document.body.appendChild(m), s.addEventListener("mouseenter", () => {
        d.style.opacity = "1", u.style.opacity = "1", N.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        d.style.opacity = "0", N.style.opacity = "0", E || (u.style.opacity = "0");
      }), u.addEventListener("mouseenter", () => {
        u.style.background = "oklch(0.95 0 0)";
      }), u.addEventListener("mouseleave", () => {
        u.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const P = (L) => {
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
      N.addEventListener("click", P);
      let O, H;
      const B = (L) => {
        L.preventDefault(), O = L.clientX, H = a.offsetWidth, document.addEventListener("mousemove", q), document.addEventListener("mouseup", I);
      }, q = (L) => {
        const U = L.clientX - O, X = Math.max(100, H + U);
        a.style.width = `${X}px`;
      }, I = () => {
        document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", I), setTimeout(() => {
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
          d.removeEventListener("mousedown", B), N.removeEventListener("click", P), document.removeEventListener("click", T), m.remove();
        }
      };
    };
  }
});
function Km(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Vm = {}, mr = {};
function un(e, t) {
  try {
    const r = (Vm[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in mr ? mr[r] : xi(r, r.split(":"));
  } catch {
    if (e in mr) return mr[e];
    const n = e?.match(Gm);
    return n ? xi(e, n.slice(1)) : NaN;
  }
}
const Gm = /([+-]\d\d):?(\d\d)?/;
function xi(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return mr[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class gt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(un(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Fc(this), Fs(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new gt(...n, t) : new gt(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new gt(+this, t);
  }
  getTimezoneOffset() {
    const t = -un(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Fs(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new gt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const ki = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!ki.test(e)) return;
  const t = e.replace(ki, "$1UTC");
  gt.prototype[t] && (e.startsWith("get") ? gt.prototype[e] = function() {
    return this.internal[t]();
  } : (gt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), qm(this), +this;
  }, gt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Fs(this), +this;
  }));
});
function Fs(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-un(e.timeZone, e) * 60));
}
function qm(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Fc(e);
}
function Fc(e) {
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
class Ue extends gt {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ue(...n, t) : new Ue(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Km(this.timeZone, this)})`;
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
    return new Ue(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ue(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Uc = 6048e5, Xm = 864e5, Ci = Symbol.for("constructDateFrom");
function Oe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ci in e ? e[Ci](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Ce(e, t) {
  return Oe(t || e, e);
}
function Yc(e, t, n) {
  const r = Ce(e, n?.in);
  return isNaN(t) ? Oe(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function jc(e, t, n) {
  const r = Ce(e, n?.in);
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
let Zm = {};
function Tr() {
  return Zm;
}
function Bn(e, t) {
  const n = Tr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Ce(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function br(e, t) {
  return Bn(e, { ...t, weekStartsOn: 1 });
}
function Kc(e, t) {
  const n = Ce(e, t?.in), r = n.getFullYear(), o = Oe(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = br(o), i = Oe(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = br(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function Mi(e) {
  const t = Ce(e), n = new Date(
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
function Gn(e, ...t) {
  const n = Oe.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function wr(e, t) {
  const n = Ce(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Vc(e, t, n) {
  const [r, o] = Gn(
    n?.in,
    e,
    t
  ), s = wr(r), i = wr(o), a = +s - Mi(s), c = +i - Mi(i);
  return Math.round((a - c) / Xm);
}
function Qm(e, t) {
  const n = Kc(e, t), r = Oe(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), br(r);
}
function Jm(e, t, n) {
  return Yc(e, t * 7, n);
}
function ep(e, t, n) {
  return jc(e, t * 12, n);
}
function tp(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Oe.bind(null, o));
    const s = Ce(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Oe(r, n || NaN);
}
function np(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Oe.bind(null, o));
    const s = Ce(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Oe(r, n || NaN);
}
function rp(e, t, n) {
  const [r, o] = Gn(
    n?.in,
    e,
    t
  );
  return +wr(r) == +wr(o);
}
function Gc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function op(e) {
  return !(!Gc(e) && typeof e != "number" || isNaN(+Ce(e)));
}
function sp(e, t, n) {
  const [r, o] = Gn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function ap(e, t) {
  const n = Ce(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function qc(e, t) {
  const [n, r] = Gn(e, t.start, t.end);
  return { start: n, end: r };
}
function ip(e, t) {
  const { start: n, end: r } = qc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Oe(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function cp(e, t) {
  const n = Ce(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function lp(e, t) {
  const n = Ce(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Xc(e, t) {
  const n = Ce(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function dp(e, t) {
  const { start: n, end: r } = qc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Oe(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function Zc(e, t) {
  const n = Tr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Ce(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function up(e, t) {
  return Zc(e, { ...t, weekStartsOn: 1 });
}
const fp = {
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
}, mp = (e, t, n) => {
  let r;
  const o = fp[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ps(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const pp = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, hp = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, gp = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, yp = {
  date: ps({
    formats: pp,
    defaultWidth: "full"
  }),
  time: ps({
    formats: hp,
    defaultWidth: "full"
  }),
  dateTime: ps({
    formats: gp,
    defaultWidth: "full"
  })
}, vp = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, bp = (e, t, n, r) => vp[e];
function lr(e) {
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
const wp = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, xp = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, kp = {
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
}, Cp = {
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
}, Mp = {
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
}, Sp = {
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
}, Ep = (e, t) => {
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
}, Tp = {
  ordinalNumber: Ep,
  era: lr({
    values: wp,
    defaultWidth: "wide"
  }),
  quarter: lr({
    values: xp,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: lr({
    values: kp,
    defaultWidth: "wide"
  }),
  day: lr({
    values: Cp,
    defaultWidth: "wide"
  }),
  dayPeriod: lr({
    values: Mp,
    defaultWidth: "wide",
    formattingValues: Sp,
    defaultFormattingWidth: "wide"
  })
};
function dr(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? Np(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Dp(a, (u) => u.test(i))
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
function Dp(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Np(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Ap(e) {
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
const Rp = /^(\d+)(th|st|nd|rd)?/i, Lp = /\d+/i, Ip = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Pp = {
  any: [/^b/i, /^(a|c)/i]
}, Op = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, _p = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, $p = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Hp = {
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
}, Wp = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, zp = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Bp = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Fp = {
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
}, Up = {
  ordinalNumber: Ap({
    matchPattern: Rp,
    parsePattern: Lp,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: dr({
    matchPatterns: Ip,
    defaultMatchWidth: "wide",
    parsePatterns: Pp,
    defaultParseWidth: "any"
  }),
  quarter: dr({
    matchPatterns: Op,
    defaultMatchWidth: "wide",
    parsePatterns: _p,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: dr({
    matchPatterns: $p,
    defaultMatchWidth: "wide",
    parsePatterns: Hp,
    defaultParseWidth: "any"
  }),
  day: dr({
    matchPatterns: Wp,
    defaultMatchWidth: "wide",
    parsePatterns: zp,
    defaultParseWidth: "any"
  }),
  dayPeriod: dr({
    matchPatterns: Bp,
    defaultMatchWidth: "any",
    parsePatterns: Fp,
    defaultParseWidth: "any"
  })
}, Ta = {
  code: "en-US",
  formatDistance: mp,
  formatLong: yp,
  formatRelative: bp,
  localize: Tp,
  match: Up,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Yp(e, t) {
  const n = Ce(e, t?.in);
  return Vc(n, Xc(n)) + 1;
}
function Qc(e, t) {
  const n = Ce(e, t?.in), r = +br(n) - +Qm(n);
  return Math.round(r / Uc) + 1;
}
function Jc(e, t) {
  const n = Ce(e, t?.in), r = n.getFullYear(), o = Tr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Oe(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = Bn(i, t), c = Oe(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = Bn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function jp(e, t) {
  const n = Tr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Jc(e, t), s = Oe(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Bn(s, t);
}
function el(e, t) {
  const n = Ce(e, t?.in), r = +Bn(n, t) - +jp(n, t);
  return Math.round(r / Uc) + 1;
}
function xe(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Vt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return xe(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : xe(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return xe(e.getDate(), t.length);
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
    return xe(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return xe(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return xe(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return xe(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return xe(o, t.length);
  }
}, Cn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Si = {
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
    return Vt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Jc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return xe(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : xe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Kc(e);
    return xe(n, t.length);
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
    return xe(n, t.length);
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
        return xe(r, 2);
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
        return xe(r, 2);
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
        return Vt.M(e, t);
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
        return xe(r + 1, 2);
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
    const o = el(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : xe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Qc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : xe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Vt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Yp(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : xe(r, t.length);
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
        return xe(s, 2);
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
        return xe(s, t.length);
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
        return xe(o, t.length);
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
    switch (r === 12 ? o = Cn.noon : r === 0 ? o = Cn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Cn.evening : r >= 12 ? o = Cn.afternoon : r >= 4 ? o = Cn.morning : o = Cn.night, t) {
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
    return Vt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Vt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : xe(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : xe(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Vt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Vt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Vt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Ti(r);
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
        return Ti(r);
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
        return "GMT" + Ei(r, ":");
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
        return "GMT" + Ei(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + cn(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return xe(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return xe(+e, t.length);
  }
};
function Ei(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + xe(s, 2);
}
function Ti(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + xe(Math.abs(e) / 60, 2) : cn(e, t);
}
function cn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = xe(Math.trunc(r / 60), 2), s = xe(r % 60, 2);
  return n + o + t + s;
}
const Di = (e, t) => {
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
}, tl = (e, t) => {
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
}, Kp = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Di(e, t);
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
  return s.replace("{{date}}", Di(r, t)).replace("{{time}}", tl(o, t));
}, Vp = {
  p: tl,
  P: Kp
}, Gp = /^D+$/, qp = /^Y+$/, Xp = ["D", "DD", "YY", "YYYY"];
function Zp(e) {
  return Gp.test(e);
}
function Qp(e) {
  return qp.test(e);
}
function Jp(e, t, n) {
  const r = eh(e, t, n);
  if (console.warn(r), Xp.includes(e)) throw new RangeError(r);
}
function eh(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const th = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, nh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, rh = /^'([^]*?)'?$/, oh = /''/g, sh = /[a-zA-Z]/;
function ah(e, t, n) {
  const r = Tr(), o = n?.locale ?? r.locale ?? Ta, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = Ce(e, n?.in);
  if (!op(a))
    throw new RangeError("Invalid time value");
  let c = t.match(nh).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const m = Vp[u];
      return m(d, o.formatLong);
    }
    return d;
  }).join("").match(th).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: ih(d) };
    if (Si[u])
      return { isToken: !0, value: d };
    if (u.match(sh))
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
    (!n?.useAdditionalWeekYearTokens && Qp(u) || !n?.useAdditionalDayOfYearTokens && Zp(u)) && Jp(u, t, String(e));
    const m = Si[u[0]];
    return m(a, u, o.localize, l);
  }).join("");
}
function ih(e) {
  const t = e.match(rh);
  return t ? t[1].replace(oh, "'") : e;
}
function ch(e, t) {
  const n = Ce(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Oe(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function lh(e, t) {
  return Ce(e, t?.in).getMonth();
}
function dh(e, t) {
  return Ce(e, t?.in).getFullYear();
}
function uh(e, t) {
  return +Ce(e) > +Ce(t);
}
function fh(e, t) {
  return +Ce(e) < +Ce(t);
}
function mh(e, t, n) {
  const [r, o] = Gn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function ph(e, t, n) {
  const [r, o] = Gn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function hh(e, t, n) {
  const r = Ce(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Oe(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = ch(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function gh(e, t, n) {
  const r = Ce(e, n?.in);
  return isNaN(+r) ? Oe(e, NaN) : (r.setFullYear(t), r);
}
const Ni = 5, yh = 4;
function vh(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Ni * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Ni : yh;
}
function nl(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function bh(e, t) {
  const n = nl(e, t), r = vh(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ue.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Ue(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Yc(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : jc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Jm(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : ep(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Vc(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : sp(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : ip(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : dp(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : bh(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : up(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : ap(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Zc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : lp(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : ah(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Qc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : lh(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : dh(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : el(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : uh(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : fh(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Gc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : rp(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : mh(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : ph(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : tp(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : np(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : hh(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : gh(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : nl(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : wr(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : br(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : cp(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Bn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Xc(r), this.options = { locale: Ta, ...t }, this.overrides = n;
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
const wt = new nt();
class rl {
  constructor(t, n, r = wt) {
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
class wh {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class xh {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function kh(e) {
  return J.createElement("button", { ...e });
}
function Ch(e) {
  return J.createElement("span", { ...e });
}
function Mh(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    J.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && J.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && J.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && J.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && J.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Sh(e) {
  const { day: t, modifiers: n, ...r } = e;
  return J.createElement("td", { ...r });
}
function Eh(e) {
  const { day: t, modifiers: n, ...r } = e, o = J.useRef(null);
  return J.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), J.createElement("button", { ref: o, ...r });
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
function Th(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[oe.Dropdown], n].join(" "), a = t?.find(({ value: c }) => c === s.value);
  return J.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[oe.DropdownRoot] },
    J.createElement(r.Select, { className: i, ...s }, t?.map(({ value: c, label: l, disabled: d }) => J.createElement(r.Option, { key: c, value: c, disabled: d }, l))),
    J.createElement(
      "span",
      { className: o[oe.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      J.createElement(r.Chevron, { orientation: "down", size: 18, className: o[oe.Chevron] })
    )
  );
}
function Dh(e) {
  return J.createElement("div", { ...e });
}
function Nh(e) {
  return J.createElement("div", { ...e });
}
function Ah(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return J.createElement("div", { ...r }, e.children);
}
function Rh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return J.createElement("div", { ...r });
}
function Lh(e) {
  return J.createElement("table", { ...e });
}
function Ih(e) {
  return J.createElement("div", { ...e });
}
const ol = Ec(void 0);
function Dr() {
  const e = Tc(ol);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Ph(e) {
  const { components: t } = Dr();
  return J.createElement(t.Dropdown, { ...e });
}
function Oh(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = Dr(), d = Y((m) => {
    o && n?.(m);
  }, [o, n]), u = Y((m) => {
    r && t?.(m);
  }, [r, t]);
  return J.createElement(
    "nav",
    { ...s },
    J.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[oe.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      J.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[oe.Chevron], orientation: "left" })
    ),
    J.createElement(
      i.NextMonthButton,
      { type: "button", className: a[oe.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      J.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[oe.Chevron] })
    )
  );
}
function _h(e) {
  const { components: t } = Dr();
  return J.createElement(t.Button, { ...e });
}
function $h(e) {
  return J.createElement("option", { ...e });
}
function Hh(e) {
  const { components: t } = Dr();
  return J.createElement(t.Button, { ...e });
}
function Wh(e) {
  const { rootRef: t, ...n } = e;
  return J.createElement("div", { ...n, ref: t });
}
function zh(e) {
  return J.createElement("select", { ...e });
}
function Bh(e) {
  const { week: t, ...n } = e;
  return J.createElement("tr", { ...n });
}
function Fh(e) {
  return J.createElement("th", { ...e });
}
function Uh(e) {
  return J.createElement(
    "thead",
    { "aria-hidden": !0 },
    J.createElement("tr", { ...e })
  );
}
function Yh(e) {
  const { week: t, ...n } = e;
  return J.createElement("th", { ...n });
}
function jh(e) {
  return J.createElement("th", { ...e });
}
function Kh(e) {
  return J.createElement("tbody", { ...e });
}
function Vh(e) {
  const { components: t } = Dr();
  return J.createElement(t.Dropdown, { ...e });
}
const Gh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: kh,
  CaptionLabel: Ch,
  Chevron: Mh,
  Day: Sh,
  DayButton: Eh,
  Dropdown: Th,
  DropdownNav: Dh,
  Footer: Nh,
  Month: Ah,
  MonthCaption: Rh,
  MonthGrid: Lh,
  Months: Ih,
  MonthsDropdown: Ph,
  Nav: Oh,
  NextMonthButton: _h,
  Option: $h,
  PreviousMonthButton: Hh,
  Root: Wh,
  Select: zh,
  Week: Bh,
  WeekNumber: Yh,
  WeekNumberHeader: jh,
  Weekday: Fh,
  Weekdays: Uh,
  Weeks: Kh,
  YearsDropdown: Vh
}, Symbol.toStringTag, { value: "Module" }));
function Lt(e, t, n = !1, r = wt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function sl(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Da(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function al(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function il(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function cl(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ll(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function It(e, t, n = wt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (ll(a, n))
      return a.includes(e);
    if (Da(a))
      return Lt(a, e, !1, n);
    if (cl(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (sl(a)) {
      const c = s(a.before, e), l = s(a.after, e), d = c > 0, u = l < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return al(a) ? s(e, a.after) > 0 : il(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function qh(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: d } = t, { isSameDay: u, isSameMonth: m, startOfMonth: p, isBefore: h, endOfMonth: g, isAfter: y } = o, b = n && p(n), v = r && g(r), w = {
    [Ne.focused]: [],
    [Ne.outside]: [],
    [Ne.disabled]: [],
    [Ne.hidden]: [],
    [Ne.today]: []
  }, M = {};
  for (const x of e) {
    const { date: k, displayMonth: D } = x, C = !!(D && !m(k, D)), E = !!(b && h(k, b)), T = !!(v && y(k, v)), N = !!(s && It(k, s, o)), A = !!(i && It(k, i, o)) || E || T || // Broadcast calendar will show outside days as default
    !l && !c && C || l && c === !1 && C, P = u(k, d ?? o.today());
    C && w.outside.push(x), N && w.disabled.push(x), A && w.hidden.push(x), P && w.today.push(x), a && Object.keys(a).forEach((O) => {
      const H = a?.[O];
      H && It(k, H, o) && (M[O] ? M[O].push(x) : M[O] = [x]);
    });
  }
  return (x) => {
    const k = {
      [Ne.focused]: !1,
      [Ne.disabled]: !1,
      [Ne.hidden]: !1,
      [Ne.outside]: !1,
      [Ne.today]: !1
    }, D = {};
    for (const C in w) {
      const E = w[C];
      k[C] = E.some((T) => T === x);
    }
    for (const C in M)
      D[C] = M[C].some((E) => E === x);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function Xh(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[Ne[s]] ? o.push(t[Ne[s]]) : t[ct[s]] && o.push(t[ct[s]]), o), [t[oe.Day]]);
}
function Zh(e) {
  return {
    ...Gh,
    ...e
  };
}
function Qh(e) {
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
function dl(e, t, n) {
  return (n ?? new nt(t)).formatMonthYear(e);
}
const Jh = dl;
function eg(e, t, n) {
  return (n ?? new nt(t)).format(e, "d");
}
function tg(e, t = wt) {
  return t.format(e, "LLLL");
}
function ng(e, t, n) {
  return (n ?? new nt(t)).format(e, "cccccc");
}
function rg(e, t = wt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function og() {
  return "";
}
function ul(e, t = wt) {
  return t.format(e, "yyyy");
}
const sg = ul, ag = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: dl,
  formatDay: eg,
  formatMonthCaption: Jh,
  formatMonthDropdown: tg,
  formatWeekNumber: rg,
  formatWeekNumberHeader: og,
  formatWeekdayName: ng,
  formatYearCaption: sg,
  formatYearDropdown: ul
}, Symbol.toStringTag, { value: "Module" }));
function ig(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...ag,
    ...e
  };
}
function cg(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((m) => {
    const p = r.formatMonthDropdown(m, o), h = l(m), g = t && m < s(t) || n && m > s(n) || !1;
    return { value: h, label: p, disabled: g };
  });
}
function lg(e, t = {}, n = {}) {
  let r = { ...t?.[oe.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function dg(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function ug(e, t, n, r, o = !1) {
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
function fl(e, t, n, r) {
  let o = (r ?? new nt(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const fg = fl;
function ml(e, t, n) {
  return (n ?? new nt(t)).formatMonthYear(e);
}
const mg = ml;
function pg(e, t, n, r) {
  let o = (r ?? new nt(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function hg(e) {
  return "Choose the Month";
}
function gg() {
  return "";
}
function yg(e) {
  return "Go to the Next Month";
}
function vg(e) {
  return "Go to the Previous Month";
}
function bg(e, t, n) {
  return (n ?? new nt(t)).format(e, "cccc");
}
function wg(e, t) {
  return `Week ${e}`;
}
function xg(e) {
  return "Week Number";
}
function kg(e) {
  return "Choose the Year";
}
const Cg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: mg,
  labelDay: fg,
  labelDayButton: fl,
  labelGrid: ml,
  labelGridcell: pg,
  labelMonthDropdown: hg,
  labelNav: gg,
  labelNext: yg,
  labelPrevious: vg,
  labelWeekNumber: wg,
  labelWeekNumberHeader: xg,
  labelWeekday: bg,
  labelYearDropdown: kg
}, Symbol.toStringTag, { value: "Module" })), Nr = (e) => e instanceof HTMLElement ? e : null, hs = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Mg = (e) => Nr(e.querySelector("[data-animated-month]")), gs = (e) => Nr(e.querySelector("[data-animated-caption]")), ys = (e) => Nr(e.querySelector("[data-animated-weeks]")), Sg = (e) => Nr(e.querySelector("[data-animated-nav]")), Eg = (e) => Nr(e.querySelector("[data-animated-weekdays]"));
function Tg(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = V(null), a = V(r), c = V(!1);
  Ro(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const d = s.isSameMonth(r[0].date, l[0].date), u = s.isAfter(r[0].date, l[0].date), m = u ? n[Je.caption_after_enter] : n[Je.caption_before_enter], p = u ? n[Je.weeks_after_enter] : n[Je.weeks_before_enter], h = i.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (hs(g).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const M = Mg(w);
      M && w.contains(M) && w.removeChild(M);
      const x = gs(w);
      x && x.classList.remove(m);
      const k = ys(w);
      k && k.classList.remove(p);
    }), i.current = g) : i.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = h instanceof HTMLElement ? hs(h) : [], b = hs(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && y && y.every((v) => v instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const v = Sg(e.current);
      v && (v.style.zIndex = "1"), b.forEach((w, M) => {
        const x = y[M];
        if (!x)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const k = gs(w);
        k && k.classList.add(m);
        const D = ys(w);
        D && D.classList.add(p);
        const C = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), k && k.classList.remove(m), D && D.classList.remove(p), w.style.position = "", w.style.overflow = "", w.contains(x) && w.removeChild(x);
        };
        x.style.pointerEvents = "none", x.style.position = "absolute", x.style.overflow = "hidden", x.setAttribute("aria-hidden", "true");
        const E = Eg(x);
        E && (E.style.opacity = "0");
        const T = gs(x);
        T && (T.classList.add(u ? n[Je.caption_before_exit] : n[Je.caption_after_exit]), T.addEventListener("animationend", C));
        const N = ys(x);
        N && N.classList.add(u ? n[Je.weeks_before_exit] : n[Je.weeks_after_exit]), w.insertBefore(x, w.firstChild);
      });
    }
  });
}
function Dg(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: m, endOfISOWeek: p, endOfMonth: h, endOfWeek: g, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: w } = r, M = c ? b(o, r) : i ? v(o) : w(o), x = c ? m(s) : i ? p(h(s)) : g(h(s)), k = d(x, M), D = u(s, o) + 1, C = [];
  for (let N = 0; N <= k; N++) {
    const A = l(M, N);
    if (t && y(A, t))
      break;
    C.push(A);
  }
  const T = (c ? 35 : 42) * D;
  if (a && C.length < T) {
    const N = T - C.length;
    for (let A = 0; A < N; A++) {
      const P = l(C[C.length - 1], 1);
      C.push(P);
    }
  }
  return C;
}
function Ng(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Ag(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function Ai(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: d, startOfMonth: u } = r;
  if (n && l(n, c) < a - 1) {
    const m = -1 * (a - 1);
    c = d(n, m);
  }
  return t && l(c, t) < 0 && (c = t), u(c);
}
function Rg(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: m, startOfWeek: p } = r, h = e.reduce((g, y) => {
    const b = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? m(y) : p(y), v = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), w = t.filter((D) => D >= b && D <= v), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < M) {
      const D = t.filter((C) => {
        const E = M - w.length;
        return C > v && C <= o(v, E);
      });
      w.push(...D);
    }
    const x = w.reduce((D, C) => {
      const E = n.ISOWeek ? l(C) : d(C), T = D.find((A) => A.weekNumber === E), N = new rl(C, y, r);
      return T ? T.days.push(N) : D.push(new xh(E, [N])), D;
    }, []), k = new wh(y, x);
    return g.push(k), g;
  }, []);
  return n.reverseMonths ? h.reverse() : h;
}
function Lg(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: d, today: u } = t, { fromYear: m, toYear: p, fromMonth: h, toMonth: g } = e;
  !n && h && (n = h), !n && m && (n = t.newDate(m, 0, 1)), !r && g && (r = g), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : m ? n = d(m, 0, 1) : !n && y && (n = o(c(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = l(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function Ig(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, d = i(e);
  if (!t)
    return a(d, l);
  if (!(c(t, e) < s))
    return a(d, l);
}
function Pg(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -l);
  if (!(c(d, t) <= 0))
    return a(d, -l);
}
function Og(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Oo(e, t) {
  const [n, r] = K(e);
  return [t === void 0 ? n : t, r];
}
function _g(e, t) {
  const [n, r] = Lg(e, t), { startOfMonth: o, endOfMonth: s } = t, i = Ai(e, n, r, t), [a, c] = Oo(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Q(() => {
    const k = Ai(e, n, r, t);
    c(k);
  }, [e.timeZone]);
  const l = Ag(a, r, e, t), d = Dg(l, e.endMonth ? s(e.endMonth) : void 0, e, t), u = Rg(l, d, e, t), m = Og(u), p = Ng(u), h = Pg(a, n, e, t), g = Ig(a, r, e, t), { disableNavigation: y, onMonthChange: b } = e, v = (k) => m.some((D) => D.days.some((C) => C.isEqualTo(k))), w = (k) => {
    if (y)
      return;
    let D = o(k);
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
    goToDay: (k) => {
      v(k) || w(k.date);
    }
  };
}
var pt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(pt || (pt = {}));
function Ri(e) {
  return !e[Ne.disabled] && !e[Ne.hidden] && !e[Ne.outside];
}
function $g(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    Ri(a) && (a[Ne.focused] && s < pt.FocusedModifier ? (o = i, s = pt.FocusedModifier) : r?.isEqualTo(i) && s < pt.LastFocused ? (o = i, s = pt.LastFocused) : n(i.date) && s < pt.Selected ? (o = i, s = pt.Selected) : a[Ne.today] && s < pt.Today && (o = i, s = pt.Today));
  }
  return o || (o = e.find((i) => Ri(t(i)))), o;
}
function Hg(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: d, addWeeks: u, addYears: m, endOfBroadcastWeek: p, endOfISOWeek: h, endOfWeek: g, max: y, min: b, startOfBroadcastWeek: v, startOfISOWeek: w, startOfWeek: M } = i;
  let k = {
    day: l,
    week: u,
    month: d,
    year: m,
    startOfWeek: (D) => c ? v(D, i) : a ? w(D) : M(D),
    endOfWeek: (D) => c ? p(D) : a ? h(D) : g(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = y([r, k]) : t === "after" && o && (k = b([o, k])), k;
}
function pl(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = Hg(e, t, n.date, r, o, s, i), l = !!(s.disabled && It(c, s.disabled, i)), d = !!(s.hidden && It(c, s.hidden, i)), u = c, m = new rl(c, u, i);
  return !l && !d ? m : pl(e, t, m, r, o, s, i, a + 1);
}
function Wg(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = K(), c = $g(t.days, n, r || (() => !1), i), [l, d] = K(s ? c : void 0);
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
      const b = pl(g, y, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(b)) || (t.goToDay(b), d(b)));
    }
  };
}
function zg(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Oo(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((h) => c(h, p)) ?? !1, { min: d, max: u } = e;
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
function Bg(e, t, n = 0, r = 0, o = !1, s = wt) {
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
function Fg(e, t, n = wt) {
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
function Li(e, t, n = wt) {
  return Lt(e, t.from, !1, n) || Lt(e, t.to, !1, n) || Lt(t, e.from, !1, n) || Lt(t, e.to, !1, n);
}
function Ug(e, t, n = wt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? Lt(e, a, !1, n) : ll(a, n) ? a.some((c) => Lt(e, c, !1, n)) : Da(a) ? a.from && a.to ? Li(e, { from: a.from, to: a.to }, n) : !1 : cl(a) ? Fg(e, a.dayOfWeek, n) : sl(a) ? n.isAfter(a.before, a.after) ? Li(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : It(e.from, a, n) || It(e.to, a, n) : al(a) || il(a) ? It(e.from, a, n) || It(e.to, a, n) : !1))
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
function Yg(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = Oo(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (m, p, h) => {
      const { min: g, max: y } = e, b = m ? Bg(m, l, g, y, s, t) : void 0;
      return r && n && b?.from && b.to && Ug({ from: b.from, to: b.to }, n, t) && (b.from = m, b.to = void 0), i || c(b), i?.(b, m, p, h), b;
    },
    isSelected: (m) => l && Lt(l, m, !1, t)
  };
}
function jg(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Oo(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (u, m, p) => {
      let h = u;
      return !r && a && a && c(u, a) && (h = void 0), o || i(h), o?.(h, u, m, p), h;
    },
    isSelected: (u) => a ? c(a, u) : !1
  };
}
function Kg(e, t) {
  const n = jg(e, t), r = zg(e, t), o = Yg(e, t);
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
function Vg(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ue(t.today, t.timeZone)), t.month && (t.month = new Ue(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ue(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ue(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ue(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ue(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((le) => new Ue(le, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ue(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ue(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Rn(() => {
    const le = { ...Ta, ...t.locale };
    return {
      dateLib: new nt({
        locale: le,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Zh(t.components),
      formatters: ig(t.formatters),
      labels: { ...Cg, ...t.labels },
      locale: le,
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
  ]), { captionLayout: c, mode: l, navLayout: d, numberOfMonths: u = 1, onDayBlur: m, onDayClick: p, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: v, onPrevClick: w, showWeekNumber: M, styles: x } = t, { formatCaption: k, formatDay: D, formatMonthDropdown: C, formatWeekNumber: E, formatWeekNumberHeader: T, formatWeekdayName: N, formatYearDropdown: A } = r, P = _g(t, s), { days: O, months: H, navStart: B, navEnd: q, previousMonth: I, nextMonth: L, goToMonth: U } = P, X = qh(O, t, B, q, s), { isSelected: G, select: Z, selected: te } = Kg(t, s) ?? {}, { blur: $, focused: z, isFocusTarget: j, moveFocus: ee, setFocused: ge } = Wg(t, P, X, G ?? (() => !1), s), { labelDayButton: ye, labelGridcell: Re, labelGrid: We, labelMonthDropdown: rt, labelNav: zt, labelPrevious: er, labelNext: tr, labelWeekday: Or, labelWeekNumber: _r, labelWeekNumberHeader: $r, labelYearDropdown: Hr } = o, vn = Rn(() => dg(s, t.ISOWeek), [s, t.ISOWeek]), nr = l !== void 0 || p !== void 0, bn = Y(() => {
    I && (U(I), w?.(I));
  }, [I, U, w]), wn = Y(() => {
    L && (U(L), v?.(L));
  }, [U, L, v]), Wr = Y((le, Me) => (ae) => {
    ae.preventDefault(), ae.stopPropagation(), ge(le), Z?.(le.date, Me, ae), p?.(le.date, Me, ae);
  }, [Z, p, ge]), qo = Y((le, Me) => (ae) => {
    ge(le), h?.(le.date, Me, ae);
  }, [h, ge]), Xo = Y((le, Me) => (ae) => {
    $(), m?.(le.date, Me, ae);
  }, [$, m]), Zo = Y((le, Me) => (ae) => {
    const be = {
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
    if (be[ae.key]) {
      ae.preventDefault(), ae.stopPropagation();
      const [Ve, ve] = be[ae.key];
      ee(Ve, ve);
    }
    g?.(le.date, Me, ae);
  }, [ee, g, t.dir]), Qo = Y((le, Me) => (ae) => {
    y?.(le.date, Me, ae);
  }, [y]), zr = Y((le, Me) => (ae) => {
    b?.(le.date, Me, ae);
  }, [b]), Br = Y((le) => (Me) => {
    const ae = Number(Me.target.value), be = s.setMonth(s.startOfMonth(le), ae);
    U(be);
  }, [s, U]), Jo = Y((le) => (Me) => {
    const ae = Number(Me.target.value), be = s.setYear(s.startOfMonth(le), ae);
    U(be);
  }, [s, U]), { className: Fr, style: rr } = Rn(() => ({
    className: [a[oe.Root], t.className].filter(Boolean).join(" "),
    style: { ...x?.[oe.Root], ...t.style }
  }), [a, t.className, t.style, x]), es = Qh(t), ft = V(null);
  Tg(ft, !!t.animate, {
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
    previousMonth: I,
    goToMonth: U,
    getModifiers: X,
    components: n,
    classNames: a,
    styles: x,
    labels: o,
    formatters: r
  };
  return J.createElement(
    ol.Provider,
    { value: xn },
    J.createElement(
      n.Root,
      { rootRef: t.animate ? ft : void 0, className: Fr, style: rr, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...es },
      J.createElement(
        n.Months,
        { className: a[oe.Months], style: x?.[oe.Months] },
        !t.hideNavigation && !d && J.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: x?.[oe.Nav], "aria-label": zt(), onPreviousClick: bn, onNextClick: wn, previousMonth: I, nextMonth: L }),
        H.map((le, Me) => J.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[oe.Month],
            style: x?.[oe.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: Me,
            displayIndex: Me,
            calendarMonth: le
          },
          d === "around" && !t.hideNavigation && Me === 0 && J.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[oe.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": er(I), onClick: bn, "data-animated-button": t.animate ? "true" : void 0 },
            J.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          J.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[oe.MonthCaption], style: x?.[oe.MonthCaption], calendarMonth: le, displayIndex: Me }, c?.startsWith("dropdown") ? J.createElement(
            n.DropdownNav,
            { className: a[oe.Dropdowns], style: x?.[oe.Dropdowns] },
            (() => {
              const ae = c === "dropdown" || c === "dropdown-months" ? J.createElement(n.MonthsDropdown, { key: "month", className: a[oe.MonthsDropdown], "aria-label": rt(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Br(le.date), options: cg(le.date, B, q, r, s), style: x?.[oe.Dropdown], value: s.getMonth(le.date) }) : J.createElement("span", { key: "month" }, C(le.date, s)), be = c === "dropdown" || c === "dropdown-years" ? J.createElement(n.YearsDropdown, { key: "year", className: a[oe.YearsDropdown], "aria-label": Hr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Jo(le.date), options: ug(B, q, r, s, !!t.reverseYears), style: x?.[oe.Dropdown], value: s.getYear(le.date) }) : J.createElement("span", { key: "year" }, A(le.date, s));
              return s.getMonthYearOrder() === "year-first" ? [be, ae] : [ae, be];
            })(),
            J.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, k(le.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            J.createElement(n.CaptionLabel, { className: a[oe.CaptionLabel], role: "status", "aria-live": "polite" }, k(le.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && Me === u - 1 && J.createElement(
            n.NextMonthButton,
            { type: "button", className: a[oe.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": tr(L), onClick: wn, "data-animated-button": t.animate ? "true" : void 0 },
            J.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          Me === u - 1 && d === "after" && !t.hideNavigation && J.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: x?.[oe.Nav], "aria-label": zt(), onPreviousClick: bn, onNextClick: wn, previousMonth: I, nextMonth: L }),
          J.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": We(le.date, s.options, s) || void 0, className: a[oe.MonthGrid], style: x?.[oe.MonthGrid] },
            !t.hideWeekdays && J.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[oe.Weekdays], style: x?.[oe.Weekdays] },
              M && J.createElement(n.WeekNumberHeader, { "aria-label": $r(s.options), className: a[oe.WeekNumberHeader], style: x?.[oe.WeekNumberHeader], scope: "col" }, T()),
              vn.map((ae) => J.createElement(n.Weekday, { "aria-label": Or(ae, s.options, s), className: a[oe.Weekday], key: String(ae), style: x?.[oe.Weekday], scope: "col" }, N(ae, s.options, s)))
            ),
            J.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[oe.Weeks], style: x?.[oe.Weeks] }, le.weeks.map((ae) => J.createElement(
              n.Week,
              { className: a[oe.Week], key: ae.weekNumber, style: x?.[oe.Week], week: ae },
              M && // biome-ignore lint/a11y/useSemanticElements: react component
              J.createElement(n.WeekNumber, { week: ae, style: x?.[oe.WeekNumber], "aria-label": _r(ae.weekNumber, {
                locale: i
              }), className: a[oe.WeekNumber], scope: "row", role: "rowheader" }, E(ae.weekNumber, s)),
              ae.days.map((be) => {
                const { date: Ve } = be, ve = X(be);
                if (ve[Ne.focused] = !ve.hidden && !!z?.isEqualTo(be), ve[ct.selected] = G?.(Ve) || ve.selected, Da(te)) {
                  const { from: Ct, to: sr } = te;
                  ve[ct.range_start] = !!(Ct && sr && s.isSameDay(Ve, Ct)), ve[ct.range_end] = !!(Ct && sr && s.isSameDay(Ve, sr)), ve[ct.range_middle] = Lt(te, Ve, !0, s);
                }
                const or = lg(ve, x, t.modifiersStyles), qe = Xh(ve, a, t.modifiersClassNames), kt = !nr && !ve.hidden ? Re(Ve, ve, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  J.createElement(n.Day, { key: `${s.format(Ve, "yyyy-MM-dd")}_${s.format(be.displayMonth, "yyyy-MM")}`, day: be, modifiers: ve, className: qe.join(" "), style: or, role: "gridcell", "aria-selected": ve.selected || void 0, "aria-label": kt, "data-day": s.format(Ve, "yyyy-MM-dd"), "data-month": be.outside ? s.format(Ve, "yyyy-MM") : void 0, "data-selected": ve.selected || void 0, "data-disabled": ve.disabled || void 0, "data-hidden": ve.hidden || void 0, "data-outside": be.outside || void 0, "data-focused": ve.focused || void 0, "data-today": ve.today || void 0 }, !ve.hidden && nr ? J.createElement(n.DayButton, { className: a[oe.DayButton], style: x?.[oe.DayButton], type: "button", day: be, modifiers: ve, disabled: ve.disabled || void 0, tabIndex: j(be) ? 0 : -1, "aria-label": ye(Ve, ve, s.options, s), onClick: Wr(be, ve), onBlur: Xo(be, ve), onFocus: qo(be, ve), onKeyDown: Zo(be, ve), onMouseEnter: Qo(be, ve), onMouseLeave: zr(be, ve) }, D(Ve, s.options, s)) : !ve.hidden && D(be.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      J.createElement(n.Footer, { className: a[oe.Footer], style: x?.[oe.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function hl(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = hl(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function gl() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = hl(e)) && (r && (r += " "), r += t);
  return r;
}
const Aa = "-", Gg = (e) => {
  const t = Xg(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(Aa);
      return a[0] === "" && a.length !== 1 && a.shift(), yl(a, t) || qg(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, yl = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? yl(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Aa);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Ii = /^\[(.+)\]$/, qg = (e) => {
  if (Ii.test(e)) {
    const t = Ii.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Xg = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Us(n[o], r, o, t);
  return r;
}, Us = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Pi(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Zg(o)) {
        Us(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Us(i, Pi(t, s), n, r);
    });
  });
}, Pi = (e, t) => {
  let n = e;
  return t.split(Aa).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Zg = (e) => e.isThemeGetter, Qg = (e) => {
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
}, Ys = "!", js = ":", Jg = js.length, ey = (e) => {
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
        if (g === js) {
          s.push(o.slice(c, h)), c = h + Jg;
          continue;
        }
        if (g === "/") {
          l = h;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? a++ : g === ")" && a--;
    }
    const d = s.length === 0 ? o : o.substring(c), u = ty(d), m = u !== d, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: m,
      baseClassName: u,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + js, s = r;
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
}, ty = (e) => e.endsWith(Ys) ? e.substring(0, e.length - 1) : e.startsWith(Ys) ? e.substring(1) : e, ny = (e) => {
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
}, ry = (e) => ({
  cache: Qg(e.cacheSize),
  parseClassName: ey(e),
  sortModifiers: ny(e),
  ...Gg(e)
}), oy = /\s+/, sy = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(oy);
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
    const v = s(m).join(":"), w = p ? v + Ys : v, M = w + b;
    if (i.includes(M))
      continue;
    i.push(M);
    const x = o(b, y);
    for (let k = 0; k < x.length; ++k) {
      const D = x[k];
      i.push(w + D);
    }
    c = d + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function ay() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = vl(t)) && (r && (r += " "), r += n);
  return r;
}
const vl = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = vl(e[r])) && (n && (n += " "), n += t);
  return n;
};
function iy(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((d, u) => u(d), e());
    return n = ry(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const d = sy(c, n);
    return o(c, d), d;
  }
  return function() {
    return s(ay.apply(null, arguments));
  };
}
const _e = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, bl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, wl = /^\((?:(\w[\w-]*):)?(.+)\)$/i, cy = /^\d+\/\d+$/, ly = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, dy = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, uy = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, fy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, my = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Mn = (e) => cy.test(e), pe = (e) => !!e && !Number.isNaN(Number(e)), Gt = (e) => !!e && Number.isInteger(Number(e)), vs = (e) => e.endsWith("%") && pe(e.slice(0, -1)), Nt = (e) => ly.test(e), py = () => !0, hy = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  dy.test(e) && !uy.test(e)
), xl = () => !1, gy = (e) => fy.test(e), yy = (e) => my.test(e), vy = (e) => !ne(e) && !re(e), by = (e) => qn(e, Ml, xl), ne = (e) => bl.test(e), an = (e) => qn(e, Sl, hy), bs = (e) => qn(e, My, pe), Oi = (e) => qn(e, kl, xl), wy = (e) => qn(e, Cl, yy), Qr = (e) => qn(e, El, gy), re = (e) => wl.test(e), ur = (e) => Xn(e, Sl), xy = (e) => Xn(e, Sy), _i = (e) => Xn(e, kl), ky = (e) => Xn(e, Ml), Cy = (e) => Xn(e, Cl), Jr = (e) => Xn(e, El, !0), qn = (e, t, n) => {
  const r = bl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Xn = (e, t, n = !1) => {
  const r = wl.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, kl = (e) => e === "position" || e === "percentage", Cl = (e) => e === "image" || e === "url", Ml = (e) => e === "length" || e === "size" || e === "bg-size", Sl = (e) => e === "length", My = (e) => e === "number", Sy = (e) => e === "family-name", El = (e) => e === "shadow", Ey = () => {
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
  ], x = () => [...M(), re, ne], k = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], C = () => [re, ne, c], E = () => [Mn, "full", "auto", ...C()], T = () => [Gt, "none", "subgrid", re, ne], N = () => ["auto", {
    span: ["full", Gt, re, ne]
  }, Gt, re, ne], A = () => [Gt, "auto", re, ne], P = () => ["auto", "min", "max", "fr", re, ne], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], B = () => ["auto", ...C()], q = () => [Mn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], I = () => [e, re, ne], L = () => [...M(), _i, Oi, {
    position: [re, ne]
  }], U = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], X = () => ["auto", "cover", "contain", ky, by, {
    size: [re, ne]
  }], G = () => [vs, ur, an], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    re,
    ne
  ], te = () => ["", pe, ur, an], $ = () => ["solid", "dashed", "dotted", "double"], z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => [pe, vs, _i, Oi], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    re,
    ne
  ], ge = () => ["none", pe, re, ne], ye = () => ["none", pe, re, ne], Re = () => [pe, re, ne], We = () => [Mn, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Nt],
      breakpoint: [Nt],
      color: [py],
      container: [Nt],
      "drop-shadow": [Nt],
      ease: ["in", "out", "in-out"],
      font: [vy],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Nt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Nt],
      shadow: [Nt],
      spacing: ["px", pe],
      text: [Nt],
      "text-shadow": [Nt],
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
        aspect: ["auto", "square", Mn, ne, re, y]
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
        inset: E()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": E()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": E()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: E()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: E()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: E()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: E()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: E()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: E()
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
        z: [Gt, "auto", re, ne]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Mn, "full", "auto", a, ...C()]
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
        flex: [pe, Mn, "auto", "initial", "none", ne]
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
        order: [Gt, "first", "last", "none", re, ne]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": T()
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
        "grid-rows": T()
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
        gap: C()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": C()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": C()
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
        p: C()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: C()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: C()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: C()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: C()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: C()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: C()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: C()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: C()
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
        "space-x": C()
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
        "space-y": C()
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
        text: ["base", n, ur, an]
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
        font: [r, re, bs]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", vs, ne]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [xy, ne, t]
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
        "line-clamp": [pe, "none", re, bs]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...C()
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
        decoration: [pe, "from-font", "auto", re, an]
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
        indent: C()
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
          }, Gt, re, ne],
          radial: ["", re, ne],
          conic: [Gt, re, ne]
        }, Cy, wy]
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
        "outline-offset": [pe, re, ne]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", pe, ur, an]
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
          Jr,
          Qr
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
        "inset-shadow": ["none", u, Jr, Qr]
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
        ring: I()
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
        "ring-offset": I()
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
        "inset-ring": I()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", m, Jr, Qr]
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
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": j()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": j()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": j()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": j()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": j()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": j()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": j()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": j()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": j()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": j()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": j()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": j()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": I()
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
          Jr,
          Qr
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
        "border-spacing": C()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": C()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": C()
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
        rotate: ge()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ge()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ge()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ge()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ye()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ye()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ye()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ye()
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
        "scroll-m": C()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": C()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": C()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": C()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": C()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": C()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": C()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": C()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": C()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": C()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": C()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": C()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": C()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": C()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": C()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": C()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": C()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": C()
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
        fill: ["none", ...I()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [pe, ur, an, bs]
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
}, Ty = /* @__PURE__ */ iy(Ey);
function fe(...e) {
  return Ty(gl(e));
}
function $i(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function _o(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = $i(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : $i(e[o], null);
        }
      };
  };
}
function Ye(...e) {
  return S.useCallback(_o(...e), e);
}
// @__NO_SIDE_EFFECTS__
function xr(e) {
  const t = /* @__PURE__ */ Ny(e), n = S.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = S.Children.toArray(s), c = a.find(Ry);
    if (c) {
      const l = c.props.children, d = a.map((u) => u === c ? S.Children.count(l) > 1 ? S.Children.only(null) : S.isValidElement(l) ? l.props.children : null : u);
      return /* @__PURE__ */ f(t, { ...i, ref: o, children: S.isValidElement(l) ? S.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ f(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Dy = /* @__PURE__ */ xr("Slot");
// @__NO_SIDE_EFFECTS__
function Ny(e) {
  const t = S.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (S.isValidElement(o)) {
      const i = Iy(o), a = Ly(s, o.props);
      return o.type !== S.Fragment && (a.ref = r ? _o(r, i) : i), S.cloneElement(o, a);
    }
    return S.Children.count(o) > 1 ? S.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Tl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Ay(e) {
  const t = ({ children: n }) => /* @__PURE__ */ f(He, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Tl, t;
}
function Ry(e) {
  return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Tl;
}
function Ly(e, t) {
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
function Iy(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const Hi = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Wi = gl, Py = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Wi(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const d = n?.[l], u = s?.[l];
    if (d === null) return null;
    const m = Hi(d) || Hi(u);
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
  return Wi(e, i, c, n?.class, n?.className);
}, Ks = Py(
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
function Zt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ f(
    r ? Dy : "button",
    {
      "data-slot": "button",
      className: fe(Ks({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function Oy({
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
  return /* @__PURE__ */ f(
    Vg,
    {
      showOutsideDays: n,
      className: fe(
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
        root: fe("w-fit", c.root),
        months: fe(
          "flex gap-4 flex-col md:flex-row relative",
          c.months
        ),
        month: fe("flex flex-col w-full gap-4", c.month),
        nav: fe(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          c.nav
        ),
        button_previous: fe(
          Ks({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: fe(
          Ks({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_next
        ),
        month_caption: fe(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: fe(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          c.dropdowns
        ),
        dropdown_root: fe(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          c.dropdown_root
        ),
        dropdown: fe(
          "absolute bg-popover inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: fe(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: fe("flex", c.weekdays),
        weekday: fe(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          c.weekday
        ),
        week: fe("flex w-full mt-2", c.week),
        week_number_header: fe(
          "select-none w-(--cell-size)",
          c.week_number_header
        ),
        week_number: fe(
          "text-[0.8rem] select-none text-muted-foreground",
          c.week_number
        ),
        day: fe(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          c.day
        ),
        range_start: fe(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: fe("rounded-none", c.range_middle),
        range_end: fe("rounded-r-md bg-accent", c.range_end),
        today: fe(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: fe(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: fe(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: fe("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: l, rootRef: d, ...u }) => /* @__PURE__ */ f(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: fe(l),
            ...u
          }
        ),
        Chevron: ({ className: l, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ f(Mf, { className: fe("size-4", l), ...u }) : d === "right" ? /* @__PURE__ */ f(
          Sf,
          {
            className: fe("size-4", l),
            ...u
          }
        ) : /* @__PURE__ */ f(Ef, { className: fe("size-4", l), ...u }),
        DayButton: _y,
        WeekNumber: ({ children: l, ...d }) => /* @__PURE__ */ f("td", { ...d, children: /* @__PURE__ */ f("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function _y({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Na(), s = S.useRef(null);
  return S.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ f(
    Zt,
    {
      ref: s,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: fe(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let Pn = null;
const Dl = /* @__PURE__ */ new Map(), $y = /* @__PURE__ */ new Map();
function po() {
  if (!Pn) return;
  const e = Pn;
  Pn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Hy(e) {
  return Pn?.pillDate === e;
}
function Wy({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = V(null), i = $o(e);
  Q(() => {
    const v = (w) => {
      w.key === "Escape" && (w.stopPropagation(), w.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), Q(() => {
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
    v && r(_n(v)), o();
  }, [r, o]), c = Y((v) => {
    const w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + v), r(_n(w)), o();
  }, [r, o]), l = Y(() => {
    const w = (/* @__PURE__ */ new Date()).getDay(), M = w === 0 ? 1 : 8 - w, x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + M), r(_n(x)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), m = new Date(d);
  m.setDate(m.getDate() + 1);
  const p = m.toDateString(), h = d.getDay(), g = h === 0 ? 1 : 8 - h, y = new Date(d);
  y.setDate(y.getDate() + g);
  const b = y.toDateString();
  return /* @__PURE__ */ R(
    "div",
    {
      ref: s,
      className: fe("date-picker-portal", t === "dark" ? "dark" : ""),
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
        /* @__PURE__ */ f("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ R("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ f("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ f(
            Oy,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ f("div", { className: "border-t border-border" }),
          /* @__PURE__ */ R("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ f(
              Zt,
              {
                variant: "outline",
                size: "sm",
                className: fe(
                  "rounded-full text-xs",
                  i.toDateString() === u && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ f(
              Zt,
              {
                variant: "outline",
                size: "sm",
                className: fe(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => c(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ f(
              Zt,
              {
                variant: "outline",
                size: "sm",
                className: fe(
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
function zy(e, t, n) {
  if (Hy(t)) {
    po();
    return;
  }
  po();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, d = s - r.bottom - c - l, u = r.top - c - l, m = d >= a ? "below" : u >= a ? "above" : d >= u ? "below" : "above";
  let p;
  m === "below" ? p = r.bottom + c : p = r.top - a - c;
  const h = r.left + r.width / 2;
  let g = h - i / 2;
  g + i > o - l && (g = o - i - l), g < l && (g = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((x) => {
    y.addEventListener(x, (k) => {
      k.stopPropagation();
    }, !1);
  });
  const v = lm(y);
  Pn = { container: y, root: v, pillDate: t };
  const w = () => {
    po();
  }, M = (x) => {
    const k = Dl.get(t);
    k && k(x);
  };
  v.render(
    /* @__PURE__ */ f(
      Wy,
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
function By({ node: e, updateAttributes: t, selected: n }) {
  const r = V(null), o = e.attrs.date || On(), s = Nl(o), i = Ra(o), a = Y(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const d = c.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return Q(() => (Dl.set(o, (c) => {
    t({ date: c });
  }), $y.set(o, a), () => {
  }), [o, t, a]), Q(() => {
    const c = r.current;
    if (!c) return;
    const l = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = c.getAttribute("data-date") || On(), m = a();
      zy(c, u, m);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), Q(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      Pn && po();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ f(zn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ f(Ic, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ f("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function $o(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function On() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function yr(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function _n(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Nl(e) {
  const t = $o(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function Fy(e) {
  return $o(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function ln(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return On();
  if (n === "tomorrow") return yr(1);
  if (n === "yesterday") return yr(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return yr(c);
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
      return _n(d);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return _n(i);
  }
  return null;
}
function Ra(e) {
  const t = $o(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Uy = new Ke("datePillPaste"), Yy = Ao.create({
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
        default: On(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = Nl(n), o = Ra(n);
    return [
      "span",
      Yn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return No(By, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || On();
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
        u().deleteRange(d).insertDatePill(On()).run();
      }
    }), t = new Qe({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(yr(1)).run();
      }
    }), n = new Qe({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(yr(-1)).run();
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
          u().deleteRange(d).insertDatePill(_n(y)).run();
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
      new je({
        key: Uy,
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
                const k = o.slice(h, y.index);
                k && p.push(m.text(k)), p.push(e.create({ date: x })), h = y.index + y[0].length;
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
              for (const k of p)
                M.insert(x, k), x += k.nodeSize;
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
function jy({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = V(null), i = V(null), a = e.attrs.tag || "", c = V(!1), [l, d] = K(() => it.has(a)), [u, m] = K(() => it.get(a)?.value ?? a);
  Q(() => {
    l || m(a);
  }, [a, l]), Q(() => {
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
    const w = v.trim().replace(/^#/, ""), M = vr(w);
    if (it.delete(a), M && it.delete(M), !M || !An(M))
      o();
    else if (M !== a) {
      const x = r();
      if (typeof x == "number" && n) {
        const { tr: k } = n.state, D = e.nodeSize;
        k.delete(x, x + D), k.insert(x, n.schema.nodes.tagPill.create({ tag: M })), n.view.dispatch(k);
      }
    } else
      it.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), h = Y(() => {
    n && !n.isEditable || (it.set(a, { value: a, focusedAt: Date.now() }), m(a), d(!0), c.current = !1);
  }, [n, a]);
  Q(() => {
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
  }, [l, n, r, h]), Q(() => {
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
  return l ? /* @__PURE__ */ f(zn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ f(di, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
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
  ) }) : /* @__PURE__ */ f(zn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ f(di, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ f("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function An(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function vr(e) {
  return e.toLowerCase().trim();
}
const Ky = new Ke("tagPillPaste"), Vy = Ao.create({
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
      Yn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return No(jy, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = vr(e);
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
        const o = vr(r[1]);
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
      new je({
        key: Ky,
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
              const w = vr(y[1]);
              if (An(w)) {
                const M = y[0], x = M.startsWith(" ") || M.startsWith(`
`) ? 1 : 0, k = o.slice(h, y.index + x);
                k && p.push(m.text(k)), p.push(e.create({ tag: w })), h = y.index + M.length;
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
function Al({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = K(""), [i, a] = K(""), [c, l] = K(""), [d, u] = K(!1), m = V(null), p = V(null);
  Q(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      m.current?.focus();
    }, 100));
  }, [e]), Q(() => {
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
            /* @__PURE__ */ f(ba, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ f("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ f(Ot, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ R("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ R("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ f(ia, { size: 12 }),
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
          /* @__PURE__ */ R("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ R("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ f(Io, { size: 12 }),
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
          /* @__PURE__ */ R("div", { className: "image-url-dialog-actions", children: [
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
const Gy = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ f(Io, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ f(Tf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ f(Df, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ f(Nf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ f(Af, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ f(Rf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ f(pa, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ f(ha, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ f(ga, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ f(ma, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ f(Pc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ f($s, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ f(ba, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ f(Oc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ f(vo, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ f(Rc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ f(Ac, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ f(va, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ f(ya, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ f(Ic, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ f(ia, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], qy = 32, Xy = 8, Zy = 320, Qy = 210, eo = 12;
function zi(e) {
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
function Jy({ editor: e }) {
  const [t, n] = K(!1), [r, o] = K(""), [s, i] = K(0), [a, c] = K(null), [l, d] = K(!1), [u, m] = K({ top: 0, left: 0 }), [p, h] = K("below"), g = V(null), y = V(-1), b = V(!1);
  Q(() => {
    b.current = t;
  }, [t]);
  const v = Gy.filter((E) => {
    if (!r) return !0;
    const T = r.toLowerCase();
    return E.title.toLowerCase().includes(T) || E.keywords?.some((N) => N.includes(T));
  }), w = Math.min(
    v.length * qy + Xy,
    Zy
  );
  Ro(() => {
    if (!t || !a) return;
    const { top: E, bottom: T, left: N } = a, A = window.innerHeight, P = window.innerWidth, O = A - T - eo, H = E - eo;
    let B;
    if (O >= w ? B = "below" : H >= w ? B = "above" : B = O >= H ? "below" : "above", h(B), g.current) {
      const q = Math.max(
        eo,
        Math.min(N, P - Qy - eo)
      ), I = B === "below" ? T + 4 : E - w - 4;
      g.current.style.top = `${I}px`, g.current.style.left = `${q}px`;
    }
  }, [t, a, w, v.length]);
  const M = Y(() => {
    const { state: E } = e, { selection: T } = E, N = T.from, A = y.current;
    if (A >= 0 && A <= N)
      e.chain().focus().deleteRange({ from: A, to: N }).run();
    else {
      const { $from: P } = T, H = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if (H !== -1) {
        const B = P.pos - (P.parentOffset - H);
        e.chain().focus().deleteRange({ from: B, to: P.pos }).run();
      }
    }
  }, [e]), x = Y(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), k = Y((E) => {
    const T = v[E];
    if (T) {
      if (M(), T.isImageCommand) {
        const { state: N } = e, A = e.view.coordsAtPos(N.selection.from);
        m({
          top: A.bottom + 8,
          left: A.left
        }), d(!0);
      } else
        T.command(e);
      x();
    }
  }, [e, v, M, x]), D = Y((E, T) => {
    e.chain().focus().setImage({ src: E, alt: T }).run();
  }, [e]);
  return Q(() => {
    if (!e) return;
    const E = () => {
      if (b.current) return;
      const { state: T } = e, { selection: N } = T, { $from: A } = N;
      if (A.parentOffset === 0) return;
      const P = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = A.pos - 1;
      const H = zi(e);
      H && (c(H), n(!0), o(""), i(0));
    };
    return e.on("update", E), () => {
      e.off("update", E);
    };
  }, [e]), Q(() => {
    if (!e || !t) return;
    const E = e.view.dom, T = (N) => {
      b.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A + 1) % v.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A - 1 + v.length) % v.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), k(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), x()));
    };
    return E.addEventListener("keydown", T, !0), () => {
      E.removeEventListener("keydown", T, !0);
    };
  }, [e, t, s, v, k, x]), Q(() => {
    if (!e || !t) return;
    const E = () => {
      if (!b.current || y.current < 0) return;
      const { state: T } = e, { selection: N } = T, A = N.from, P = y.current;
      if (A <= P) {
        x();
        return;
      }
      try {
        const O = T.doc.textBetween(P + 1, A, void 0, "￼");
        if (O.includes(`
`)) {
          x();
          return;
        }
        o(O), i(0);
        const H = zi(e);
        H && c(H);
      } catch {
        x();
      }
    };
    return e.on("update", E), e.on("selectionUpdate", E), () => {
      e.off("update", E), e.off("selectionUpdate", E);
    };
  }, [e, t, x]), Q(() => {
    if (!t) return;
    const E = (T) => {
      g.current && !g.current.contains(T.target) && x();
    };
    return document.addEventListener("mousedown", E), () => document.removeEventListener("mousedown", E);
  }, [t, x]), Q(() => {
    t && v.length === 0 && r.length > 2 && x();
  }, [t, v.length, r, x]), Q(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), Q(() => {
    if (!t || !g.current) return;
    const E = g.current.querySelector(".slash-item.is-selected");
    E && E.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ f(
    Al,
    {
      isOpen: l,
      onClose: () => d(!1),
      onInsert: D,
      position: u
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ f(Wt, { children: /* @__PURE__ */ f(
    "div",
    {
      ref: g,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((E, T) => /* @__PURE__ */ R(
        "div",
        {
          className: `slash-item ${T === s ? "is-selected" : ""}`,
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation(), k(T);
          },
          onMouseEnter: () => i(T),
          children: [
            /* @__PURE__ */ f("span", { className: "slash-icon", children: E.icon }),
            /* @__PURE__ */ f("span", { className: "slash-label", children: E.title })
          ]
        },
        E.title
      ))
    }
  ) });
}
const ev = 340, tv = 36, nv = 8, rv = 240, to = 8;
function Bi(e) {
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
function ov({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = K(!1), [s, i] = K(""), [a, c] = K([]), [l, d] = K(0), [u, m] = K(null), [p, h] = K("below"), [g, y] = K(!1), b = V(!1), v = V(null), w = V(-1), M = V(null);
  Q(() => {
    b.current = r;
  }, [r]);
  const x = Y(() => {
    o(!1), i(""), c([]), d(0), w.current = -1;
  }, []), k = Y((N) => {
    const A = w.current;
    if (A < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const H = P.tr.delete(A, O), B = P.schema.marks.wikiLink;
      if (B) {
        const q = B.create({ pageName: N }), I = P.schema.text(N, [q]);
        H.insert(A, I);
        const L = A + N.length;
        H.setSelection(mn.create(H.doc, L)), H.removeStoredMark(B);
      } else
        H.insertText(`[[${N}]]`, A);
      e.view.dispatch(H), e.view.focus();
    } catch (H) {
      console.warn("WikiLinkAutocomplete: Error inserting link", H);
    }
    x();
  }, [e, x]);
  Q(() => {
    if (!e) return;
    const N = () => {
      if (b.current) return;
      const { state: A } = e, { selection: P } = A, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      w.current = O.pos - 2;
      const B = Bi(e);
      B && (m(B), o(!0), i(""), c([]), d(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), Q(() => {
    if (!e || !r) return;
    const N = e.view.dom, A = (P) => {
      if (b.current) {
        if (P.key === "ArrowDown") {
          P.preventDefault();
          const O = a.length + (s.trim() ? 1 : 0) - 1;
          d((H) => Math.min(H + 1, O));
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), d((O) => Math.max(O - 1, 0));
          return;
        }
        if (P.key === "Enter" || P.key === "Tab") {
          P.preventDefault(), P.stopPropagation(), l < a.length ? k(a[l].title) : s.trim() && n ? (n(s.trim()), x()) : s.trim() && k(s.trim());
          return;
        }
        if (P.key === "Escape") {
          P.preventDefault(), x();
          return;
        }
        P.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: H } = O.selection;
          H.parent.textBetween(0, H.parentOffset, void 0, "￼").endsWith("]]") && x();
        }, 0);
      }
    };
    return N.addEventListener("keydown", A, !0), () => {
      N.removeEventListener("keydown", A, !0);
    };
  }, [e, r, a, l, s, k, x, n]), Q(() => {
    if (!e || !r) return;
    const N = () => {
      const A = w.current;
      if (A < 0) {
        x();
        return;
      }
      const { state: P } = e, O = P.selection.from;
      if (O <= A) {
        x();
        return;
      }
      try {
        const H = P.doc.textBetween(A + 2, O, void 0, "￼");
        if (H.includes(`
`) || H.includes("]]")) {
          x();
          return;
        }
        i(H), d(0);
        const B = Bi(e);
        B && m(B);
      } catch {
        x();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, x]), Q(() => {
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
  }, [r, s, t]), Q(() => {
    if (!r) return;
    const N = (A) => {
      v.current && !v.current.contains(A.target) && x();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, x]), Q(() => {
    if (!r || !v.current) return;
    const N = v.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const D = a.length + (s.trim() ? 1 : 0), C = Math.min(
    Math.max(D, 1) * tv + nv,
    rv
  );
  if (Ro(() => {
    if (!r || !u) return;
    const { top: N, bottom: A, left: P } = u, O = window.innerHeight, H = window.innerWidth, B = O - A - to, q = N - to;
    let I;
    if (B >= C ? I = "below" : q >= C ? I = "above" : I = B >= q ? "below" : "above", h(I), v.current) {
      const L = Math.max(
        to,
        Math.min(P, H - ev - to)
      ), U = I === "below" ? A + 4 : N - C - 4;
      v.current.style.top = `${U}px`, v.current.style.left = `${L}px`;
    }
  }, [r, u, C, D]), !r) return null;
  const E = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ f(Wt, { children: /* @__PURE__ */ R(
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
        a.map((N, A) => /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item ${A === l ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), k(N.title);
            },
            onMouseEnter: () => d(A),
            children: [
              /* @__PURE__ */ f("span", { className: "wikilink-icon", children: /* @__PURE__ */ f(wa, { size: 14 }) }),
              /* @__PURE__ */ f("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ f("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        E && /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), x()) : k(s.trim());
            },
            onMouseEnter: () => d(a.length),
            children: [
              /* @__PURE__ */ f("span", { className: "wikilink-icon", children: /* @__PURE__ */ f(xa, { size: 14 }) }),
              /* @__PURE__ */ R("span", { className: "wikilink-label", children: [
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
function me(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Zn(e, t = []) {
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
  return o.scopeName = e, [r, sv(o, ...t)];
}
function sv(...e) {
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
var Jt = globalThis?.document ? S.useLayoutEffect : () => {
}, av = S[" useInsertionEffect ".trim().toString()] || Jt;
function La({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = iv({
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
        const u = cv(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function iv({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = S.useState(e), o = S.useRef(n), s = S.useRef(t);
  return av(() => {
    s.current = t;
  }, [t]), S.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function cv(e) {
  return typeof e == "function";
}
var lv = [
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
], Fe = lv.reduce((e, t) => {
  const n = /* @__PURE__ */ xr(`Primitive.${t}`), r = S.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ f(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Rl(e, t) {
  e && Bc.flushSync(() => e.dispatchEvent(t));
}
function Ll(e) {
  const t = e + "CollectionProvider", [n, r] = Zn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: y, children: b } = g, v = J.useRef(null), w = J.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ f(o, { scope: y, itemMap: w, collectionRef: v, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ xr(a), l = J.forwardRef(
    (g, y) => {
      const { scope: b, children: v } = g, w = s(a, b), M = Ye(y, w.collectionRef);
      return /* @__PURE__ */ f(c, { ref: M, children: v });
    }
  );
  l.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", m = /* @__PURE__ */ xr(d), p = J.forwardRef(
    (g, y) => {
      const { scope: b, children: v, ...w } = g, M = J.useRef(null), x = Ye(y, M), k = s(d, b);
      return J.useEffect(() => (k.itemMap.set(M, { ref: M, ...w }), () => void k.itemMap.delete(M))), /* @__PURE__ */ f(m, { [u]: "", ref: x, children: v });
    }
  );
  p.displayName = d;
  function h(g) {
    const y = s(e + "CollectionConsumer", g);
    return J.useCallback(() => {
      const v = y.collectionRef.current;
      if (!v) return [];
      const w = Array.from(v.querySelectorAll(`[${u}]`));
      return Array.from(y.itemMap.values()).sort(
        (k, D) => w.indexOf(k.ref.current) - w.indexOf(D.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    h,
    r
  ];
}
var dv = S.createContext(void 0);
function Il(e) {
  const t = S.useContext(dv);
  return e || t || "ltr";
}
function _t(e) {
  const t = S.useRef(e);
  return S.useEffect(() => {
    t.current = e;
  }), S.useMemo(() => (...n) => t.current?.(...n), []);
}
function uv(e, t = globalThis?.document) {
  const n = _t(e);
  S.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var fv = "DismissableLayer", Vs = "dismissableLayer.update", mv = "dismissableLayer.pointerDownOutside", pv = "dismissableLayer.focusOutside", Fi, Pl = S.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ia = S.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = S.useContext(Pl), [d, u] = S.useState(null), m = d?.ownerDocument ?? globalThis?.document, [, p] = S.useState({}), h = Ye(t, (D) => u(D)), g = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = g.indexOf(y), v = d ? g.indexOf(d) : -1, w = l.layersWithOutsidePointerEventsDisabled.size > 0, M = v >= b, x = yv((D) => {
      const C = D.target, E = [...l.branches].some((T) => T.contains(C));
      !M || E || (o?.(D), i?.(D), D.defaultPrevented || a?.());
    }, m), k = vv((D) => {
      const C = D.target;
      [...l.branches].some((T) => T.contains(C)) || (s?.(D), i?.(D), D.defaultPrevented || a?.());
    }, m);
    return uv((D) => {
      v === l.layers.size - 1 && (r?.(D), !D.defaultPrevented && a && (D.preventDefault(), a()));
    }, m), S.useEffect(() => {
      if (d)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Fi = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), Ui(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Fi);
        };
    }, [d, m, n, l]), S.useEffect(() => () => {
      d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), Ui());
    }, [d, l]), S.useEffect(() => {
      const D = () => p({});
      return document.addEventListener(Vs, D), () => document.removeEventListener(Vs, D);
    }, []), /* @__PURE__ */ f(
      Fe.div,
      {
        ...c,
        ref: h,
        style: {
          pointerEvents: w ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: me(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: me(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: me(
          e.onPointerDownCapture,
          x.onPointerDownCapture
        )
      }
    );
  }
);
Ia.displayName = fv;
var hv = "DismissableLayerBranch", gv = S.forwardRef((e, t) => {
  const n = S.useContext(Pl), r = S.useRef(null), o = Ye(t, r);
  return S.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ f(Fe.div, { ...e, ref: o });
});
gv.displayName = hv;
function yv(e, t = globalThis?.document) {
  const n = _t(e), r = S.useRef(!1), o = S.useRef(() => {
  });
  return S.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          Ol(
            mv,
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
function vv(e, t = globalThis?.document) {
  const n = _t(e), r = S.useRef(!1);
  return S.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Ol(pv, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ui() {
  const e = new CustomEvent(Vs);
  document.dispatchEvent(e);
}
function Ol(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Rl(o, s) : o.dispatchEvent(s);
}
var ws = 0;
function bv() {
  S.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Yi()), document.body.insertAdjacentElement("beforeend", e[1] ?? Yi()), ws++, () => {
      ws === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), ws--;
    };
  }, []);
}
function Yi() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var xs = "focusScope.autoFocusOnMount", ks = "focusScope.autoFocusOnUnmount", ji = { bubbles: !1, cancelable: !0 }, wv = "FocusScope", _l = S.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = S.useState(null), l = _t(o), d = _t(s), u = S.useRef(null), m = Ye(t, (g) => c(g)), p = S.useRef({
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
        a.contains(M) ? u.current = M : Xt(u.current, { select: !0 });
      }, y = function(w) {
        if (p.paused || !a) return;
        const M = w.relatedTarget;
        M !== null && (a.contains(M) || Xt(u.current, { select: !0 }));
      }, b = function(w) {
        if (document.activeElement === document.body)
          for (const x of w)
            x.removedNodes.length > 0 && Xt(a);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const v = new MutationObserver(b);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), v.disconnect();
      };
    }
  }, [r, a, p.paused]), S.useEffect(() => {
    if (a) {
      Vi.add(p);
      const g = document.activeElement;
      if (!a.contains(g)) {
        const b = new CustomEvent(xs, ji);
        a.addEventListener(xs, l), a.dispatchEvent(b), b.defaultPrevented || (xv(Ev($l(a)), { select: !0 }), document.activeElement === g && Xt(a));
      }
      return () => {
        a.removeEventListener(xs, l), setTimeout(() => {
          const b = new CustomEvent(ks, ji);
          a.addEventListener(ks, d), a.dispatchEvent(b), b.defaultPrevented || Xt(g ?? document.body, { select: !0 }), a.removeEventListener(ks, d), Vi.remove(p);
        }, 0);
      };
    }
  }, [a, l, d, p]);
  const h = S.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, b = document.activeElement;
      if (y && b) {
        const v = g.currentTarget, [w, M] = kv(v);
        w && M ? !g.shiftKey && b === M ? (g.preventDefault(), n && Xt(w, { select: !0 })) : g.shiftKey && b === w && (g.preventDefault(), n && Xt(M, { select: !0 })) : b === v && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ f(Fe.div, { tabIndex: -1, ...i, ref: m, onKeyDown: h });
});
_l.displayName = wv;
function xv(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Xt(r, { select: t }), document.activeElement !== n) return;
}
function kv(e) {
  const t = $l(e), n = Ki(t, e), r = Ki(t.reverse(), e);
  return [n, r];
}
function $l(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ki(e, t) {
  for (const n of e)
    if (!Cv(n, { upTo: t })) return n;
}
function Cv(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Mv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Xt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Mv(e) && t && e.select();
  }
}
var Vi = Sv();
function Sv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Gi(e, t), e.unshift(t);
    },
    remove(t) {
      e = Gi(e, t), e[0]?.resume();
    }
  };
}
function Gi(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Ev(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Tv = S[" useId ".trim().toString()] || (() => {
}), Dv = 0;
function bo(e) {
  const [t, n] = S.useState(Tv());
  return Jt(() => {
    n((r) => r ?? String(Dv++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Nv = ["top", "right", "bottom", "left"], en = Math.min, et = Math.max, wo = Math.round, no = Math.floor, vt = (e) => ({
  x: e,
  y: e
}), Av = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Rv = {
  start: "end",
  end: "start"
};
function Gs(e, t, n) {
  return et(e, en(t, n));
}
function $t(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ht(e) {
  return e.split("-")[0];
}
function Qn(e) {
  return e.split("-")[1];
}
function Pa(e) {
  return e === "x" ? "y" : "x";
}
function Oa(e) {
  return e === "y" ? "height" : "width";
}
const Lv = /* @__PURE__ */ new Set(["top", "bottom"]);
function yt(e) {
  return Lv.has(Ht(e)) ? "y" : "x";
}
function _a(e) {
  return Pa(yt(e));
}
function Iv(e, t, n) {
  n === void 0 && (n = !1);
  const r = Qn(e), o = _a(e), s = Oa(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = xo(i)), [i, xo(i)];
}
function Pv(e) {
  const t = xo(e);
  return [qs(e), t, qs(t)];
}
function qs(e) {
  return e.replace(/start|end/g, (t) => Rv[t]);
}
const qi = ["left", "right"], Xi = ["right", "left"], Ov = ["top", "bottom"], _v = ["bottom", "top"];
function $v(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Xi : qi : t ? qi : Xi;
    case "left":
    case "right":
      return t ? Ov : _v;
    default:
      return [];
  }
}
function Hv(e, t, n, r) {
  const o = Qn(e);
  let s = $v(Ht(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(qs)))), s;
}
function xo(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Av[t]);
}
function Wv(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Hl(e) {
  return typeof e != "number" ? Wv(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function ko(e) {
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
function Zi(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = yt(t), i = _a(t), a = Oa(i), c = Ht(t), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, m = r[a] / 2 - o[a] / 2;
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
  switch (Qn(t)) {
    case "start":
      p[i] -= m * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += m * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const zv = async (e, t, n) => {
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
  } = Zi(l, r, c), m = r, p = {}, h = 0;
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
    } = Zi(l, m, c)), g = -1);
  }
  return {
    x: d,
    y: u,
    placement: m,
    strategy: o,
    middlewareData: p
  };
};
async function kr(e, t) {
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
  } = $t(t, e), h = Hl(p), y = a[m ? u === "floating" ? "reference" : "floating" : u], b = ko(await s.getClippingRect({
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
  }, x = ko(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
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
const Bv = (e) => ({
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
    } = $t(e, t) || {};
    if (l == null)
      return {};
    const u = Hl(d), m = {
      x: n,
      y: r
    }, p = _a(o), h = Oa(p), g = await i.getDimensions(l), y = p === "y", b = y ? "top" : "left", v = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", M = s.reference[h] + s.reference[p] - m[p] - s.floating[h], x = m[p] - s.reference[p], k = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let D = k ? k[w] : 0;
    (!D || !await (i.isElement == null ? void 0 : i.isElement(k))) && (D = a.floating[w] || s.floating[h]);
    const C = M / 2 - x / 2, E = D / 2 - g[h] / 2 - 1, T = en(u[b], E), N = en(u[v], E), A = T, P = D - g[h] - N, O = D / 2 - g[h] / 2 + C, H = Gs(A, O, P), B = !c.arrow && Qn(o) != null && O !== H && s.reference[h] / 2 - (O < A ? T : N) - g[h] / 2 < 0, q = B ? O < A ? O - A : O - P : 0;
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
}), Fv = function(e) {
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
      } = $t(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = Ht(o), v = yt(a), w = Ht(a) === a, M = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), x = m || (w || !g ? [xo(a)] : Pv(a)), k = h !== "none";
      !m && k && x.push(...Hv(a, g, h, M));
      const D = [a, ...x], C = await kr(t, y), E = [];
      let T = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && E.push(C[b]), u) {
        const O = Iv(o, i, M);
        E.push(C[O[0]], C[O[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: E
      }], !E.every((O) => O <= 0)) {
        var N, A;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, H = D[O];
        if (H && (!(u === "alignment" ? v !== yt(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((I) => yt(I.placement) === v ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: T
            },
            reset: {
              placement: H
            }
          };
        let B = (A = T.filter((q) => q.overflows[0] <= 0).sort((q, I) => q.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!B)
          switch (p) {
            case "bestFit": {
              var P;
              const q = (P = T.filter((I) => {
                if (k) {
                  const L = yt(I.placement);
                  return L === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((L) => L > 0).reduce((L, U) => L + U, 0)]).sort((I, L) => I[1] - L[1])[0]) == null ? void 0 : P[0];
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
function Qi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ji(e) {
  return Nv.some((t) => e[t] >= 0);
}
const Uv = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = $t(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await kr(t, {
            ...o,
            elementContext: "reference"
          }), i = Qi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Ji(i)
            }
          };
        }
        case "escaped": {
          const s = await kr(t, {
            ...o,
            altBoundary: !0
          }), i = Qi(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Ji(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Wl = /* @__PURE__ */ new Set(["left", "top"]);
async function Yv(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Ht(n), a = Qn(n), c = yt(n) === "y", l = Wl.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = $t(t, e);
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
const jv = function(e) {
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
      } = t, c = await Yv(t, e);
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
}, Kv = function(e) {
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
      } = $t(e, t), l = {
        x: n,
        y: r
      }, d = await kr(t, c), u = yt(Ht(o)), m = Pa(u);
      let p = l[m], h = l[u];
      if (s) {
        const y = m === "y" ? "top" : "left", b = m === "y" ? "bottom" : "right", v = p + d[y], w = p - d[b];
        p = Gs(v, p, w);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", b = u === "y" ? "bottom" : "right", v = h + d[y], w = h - d[b];
        h = Gs(v, h, w);
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
}, Vv = function(e) {
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
      } = $t(e, t), d = {
        x: n,
        y: r
      }, u = yt(o), m = Pa(u);
      let p = d[m], h = d[u];
      const g = $t(a, t), y = typeof g == "number" ? {
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
        const w = m === "y" ? "width" : "height", M = Wl.has(Ht(o)), x = s.reference[u] - s.floating[w] + (M && ((b = i.offset) == null ? void 0 : b[u]) || 0) + (M ? 0 : y.crossAxis), k = s.reference[u] + s.reference[w] + (M ? 0 : ((v = i.offset) == null ? void 0 : v[u]) || 0) - (M ? y.crossAxis : 0);
        h < x ? h = x : h > k && (h = k);
      }
      return {
        [m]: p,
        [u]: h
      };
    }
  };
}, Gv = function(e) {
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
      } = $t(e, t), d = await kr(t, l), u = Ht(o), m = Qn(o), p = yt(o) === "y", {
        width: h,
        height: g
      } = s.floating;
      let y, b;
      u === "top" || u === "bottom" ? (y = u, b = m === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = u, y = m === "end" ? "top" : "bottom");
      const v = g - d.top - d.bottom, w = h - d.left - d.right, M = en(g - d[y], v), x = en(h - d[b], w), k = !t.middlewareData.shift;
      let D = M, C = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (C = w), (r = t.middlewareData.shift) != null && r.enabled.y && (D = v), k && !m) {
        const T = et(d.left, 0), N = et(d.right, 0), A = et(d.top, 0), P = et(d.bottom, 0);
        p ? C = h - 2 * (T !== 0 || N !== 0 ? T + N : et(d.left, d.right)) : D = g - 2 * (A !== 0 || P !== 0 ? A + P : et(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: C,
        availableHeight: D
      });
      const E = await i.getDimensions(a.floating);
      return h !== E.width || g !== E.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ho() {
  return typeof window < "u";
}
function Jn(e) {
  return zl(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function tt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function xt(e) {
  var t;
  return (t = (zl(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function zl(e) {
  return Ho() ? e instanceof Node || e instanceof tt(e).Node : !1;
}
function lt(e) {
  return Ho() ? e instanceof Element || e instanceof tt(e).Element : !1;
}
function bt(e) {
  return Ho() ? e instanceof HTMLElement || e instanceof tt(e).HTMLElement : !1;
}
function ec(e) {
  return !Ho() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof tt(e).ShadowRoot;
}
const qv = /* @__PURE__ */ new Set(["inline", "contents"]);
function Ar(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = dt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !qv.has(o);
}
const Xv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Zv(e) {
  return Xv.has(Jn(e));
}
const Qv = [":popover-open", ":modal"];
function Wo(e) {
  return Qv.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Jv = ["transform", "translate", "scale", "rotate", "perspective"], eb = ["transform", "translate", "scale", "rotate", "perspective", "filter"], tb = ["paint", "layout", "strict", "content"];
function $a(e) {
  const t = Ha(), n = lt(e) ? dt(e) : e;
  return Jv.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || eb.some((r) => (n.willChange || "").includes(r)) || tb.some((r) => (n.contain || "").includes(r));
}
function nb(e) {
  let t = tn(e);
  for (; bt(t) && !Fn(t); ) {
    if ($a(t))
      return t;
    if (Wo(t))
      return null;
    t = tn(t);
  }
  return null;
}
function Ha() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const rb = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Fn(e) {
  return rb.has(Jn(e));
}
function dt(e) {
  return tt(e).getComputedStyle(e);
}
function zo(e) {
  return lt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function tn(e) {
  if (Jn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ec(e) && e.host || // Fallback.
    xt(e)
  );
  return ec(t) ? t.host : t;
}
function Bl(e) {
  const t = tn(e);
  return Fn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : bt(t) && Ar(t) ? t : Bl(t);
}
function Cr(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Bl(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = tt(o);
  if (s) {
    const a = Xs(i);
    return t.concat(i, i.visualViewport || [], Ar(o) ? o : [], a && n ? Cr(a) : []);
  }
  return t.concat(o, Cr(o, [], n));
}
function Xs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Fl(e) {
  const t = dt(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = bt(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = wo(n) !== s || wo(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function Wa(e) {
  return lt(e) ? e : e.contextElement;
}
function $n(e) {
  const t = Wa(e);
  if (!bt(t))
    return vt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Fl(t);
  let i = (s ? wo(n.width) : n.width) / r, a = (s ? wo(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const ob = /* @__PURE__ */ vt(0);
function Ul(e) {
  const t = tt(e);
  return !Ha() || !t.visualViewport ? ob : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function sb(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== tt(e) ? !1 : t;
}
function pn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = Wa(e);
  let i = vt(1);
  t && (r ? lt(r) && (i = $n(r)) : i = $n(e));
  const a = sb(s, n, r) ? Ul(s) : vt(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const m = tt(s), p = r && lt(r) ? tt(r) : r;
    let h = m, g = Xs(h);
    for (; g && r && p !== h; ) {
      const y = $n(g), b = g.getBoundingClientRect(), v = dt(g), w = b.left + (g.clientLeft + parseFloat(v.paddingLeft)) * y.x, M = b.top + (g.clientTop + parseFloat(v.paddingTop)) * y.y;
      c *= y.x, l *= y.y, d *= y.x, u *= y.y, c += w, l += M, h = tt(g), g = Xs(h);
    }
  }
  return ko({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function Bo(e, t) {
  const n = zo(e).scrollLeft;
  return t ? t.left + n : pn(xt(e)).left + n;
}
function Yl(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Bo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function ab(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = xt(r), a = t ? Wo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = vt(1);
  const d = vt(0), u = bt(r);
  if ((u || !u && !s) && ((Jn(r) !== "body" || Ar(i)) && (c = zo(r)), bt(r))) {
    const p = pn(r);
    l = $n(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const m = i && !u && !s ? Yl(i, c) : vt(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + m.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + m.y
  };
}
function ib(e) {
  return Array.from(e.getClientRects());
}
function cb(e) {
  const t = xt(e), n = zo(e), r = e.ownerDocument.body, o = et(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = et(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Bo(e);
  const a = -n.scrollTop;
  return dt(r).direction === "rtl" && (i += et(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const tc = 25;
function lb(e, t) {
  const n = tt(e), r = xt(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = Ha();
    (!d || d && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = Bo(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, m = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, h = Math.abs(r.clientWidth - u.clientWidth - p);
    h <= tc && (s -= h);
  } else l <= tc && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const db = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ub(e, t) {
  const n = pn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = bt(e) ? $n(e) : vt(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function nc(e, t, n) {
  let r;
  if (t === "viewport")
    r = lb(e, n);
  else if (t === "document")
    r = cb(xt(e));
  else if (lt(t))
    r = ub(t, n);
  else {
    const o = Ul(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return ko(r);
}
function jl(e, t) {
  const n = tn(e);
  return n === t || !lt(n) || Fn(n) ? !1 : dt(n).position === "fixed" || jl(n, t);
}
function fb(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Cr(e, [], !1).filter((a) => lt(a) && Jn(a) !== "body"), o = null;
  const s = dt(e).position === "fixed";
  let i = s ? tn(e) : e;
  for (; lt(i) && !Fn(i); ) {
    const a = dt(i), c = $a(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && db.has(o.position) || Ar(i) && !c && jl(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = tn(i);
  }
  return t.set(e, r), r;
}
function mb(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? Wo(t) ? [] : fb(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, d) => {
    const u = nc(t, d, o);
    return l.top = et(u.top, l.top), l.right = en(u.right, l.right), l.bottom = en(u.bottom, l.bottom), l.left = et(u.left, l.left), l;
  }, nc(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function pb(e) {
  const {
    width: t,
    height: n
  } = Fl(e);
  return {
    width: t,
    height: n
  };
}
function hb(e, t, n) {
  const r = bt(t), o = xt(t), s = n === "fixed", i = pn(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = vt(0);
  function l() {
    c.x = Bo(o);
  }
  if (r || !r && !s)
    if ((Jn(t) !== "body" || Ar(o)) && (a = zo(t)), r) {
      const p = pn(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? Yl(o, a) : vt(0), u = i.left + a.scrollLeft - c.x - d.x, m = i.top + a.scrollTop - c.y - d.y;
  return {
    x: u,
    y: m,
    width: i.width,
    height: i.height
  };
}
function Cs(e) {
  return dt(e).position === "static";
}
function rc(e, t) {
  if (!bt(e) || dt(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return xt(e) === n && (n = n.ownerDocument.body), n;
}
function Kl(e, t) {
  const n = tt(e);
  if (Wo(e))
    return n;
  if (!bt(e)) {
    let o = tn(e);
    for (; o && !Fn(o); ) {
      if (lt(o) && !Cs(o))
        return o;
      o = tn(o);
    }
    return n;
  }
  let r = rc(e, t);
  for (; r && Zv(r) && Cs(r); )
    r = rc(r, t);
  return r && Fn(r) && Cs(r) && !$a(r) ? n : r || nb(e) || n;
}
const gb = async function(e) {
  const t = this.getOffsetParent || Kl, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: hb(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function yb(e) {
  return dt(e).direction === "rtl";
}
const vb = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ab,
  getDocumentElement: xt,
  getClippingRect: mb,
  getOffsetParent: Kl,
  getElementRects: gb,
  getClientRects: ib,
  getDimensions: pb,
  getScale: $n,
  isElement: lt,
  isRTL: yb
};
function Vl(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function bb(e, t) {
  let n = null, r;
  const o = xt(e);
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
    const h = no(u), g = no(o.clientWidth - (d + m)), y = no(o.clientHeight - (u + p)), b = no(d), w = {
      rootMargin: -h + "px " + -g + "px " + -y + "px " + -b + "px",
      threshold: et(0, en(1, c)) || 1
    };
    let M = !0;
    function x(k) {
      const D = k[0].intersectionRatio;
      if (D !== c) {
        if (!M)
          return i();
        D ? i(!1, D) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !Vl(l, e.getBoundingClientRect()) && i(), M = !1;
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
function wb(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Wa(e), d = o || s ? [...l ? Cr(l) : [], ...Cr(t)] : [];
  d.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const u = l && a ? bb(l, n) : null;
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
    g && !Vl(g, b) && n(), g = b, h = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    d.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), u?.(), (b = p) == null || b.disconnect(), p = null, c && cancelAnimationFrame(h);
  };
}
const xb = jv, kb = Kv, Cb = Fv, Mb = Gv, Sb = Uv, oc = Bv, Eb = Vv, Tb = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: vb,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return zv(e, t, {
    ...o,
    platform: s
  });
};
var Db = typeof document < "u", Nb = function() {
}, ho = Db ? Ro : Nb;
function Co(e, t) {
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
        if (!Co(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !Co(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Gl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function sc(e, t) {
  const n = Gl(e);
  return Math.round(t * n) / n;
}
function Ms(e) {
  const t = S.useRef(e);
  return ho(() => {
    t.current = e;
  }), t;
}
function Ab(e) {
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
  Co(m, r) || p(r);
  const [h, g] = S.useState(null), [y, b] = S.useState(null), v = S.useCallback((I) => {
    I !== k.current && (k.current = I, g(I));
  }, []), w = S.useCallback((I) => {
    I !== D.current && (D.current = I, b(I));
  }, []), M = s || h, x = i || y, k = S.useRef(null), D = S.useRef(null), C = S.useRef(d), E = c != null, T = Ms(c), N = Ms(o), A = Ms(l), P = S.useCallback(() => {
    if (!k.current || !D.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: m
    };
    N.current && (I.platform = N.current), Tb(k.current, D.current, I).then((L) => {
      const U = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      O.current && !Co(C.current, U) && (C.current = U, Bc.flushSync(() => {
        u(U);
      }));
    });
  }, [m, t, n, N, A]);
  ho(() => {
    l === !1 && C.current.isPositioned && (C.current.isPositioned = !1, u((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const O = S.useRef(!1);
  ho(() => (O.current = !0, () => {
    O.current = !1;
  }), []), ho(() => {
    if (M && (k.current = M), x && (D.current = x), M && x) {
      if (T.current)
        return T.current(M, x, P);
      P();
    }
  }, [M, x, P, T, E]);
  const H = S.useMemo(() => ({
    reference: k,
    floating: D,
    setReference: v,
    setFloating: w
  }), [v, w]), B = S.useMemo(() => ({
    reference: M,
    floating: x
  }), [M, x]), q = S.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!B.floating)
      return I;
    const L = sc(B.floating, d.x), U = sc(B.floating, d.y);
    return a ? {
      ...I,
      transform: "translate(" + L + "px, " + U + "px)",
      ...Gl(B.floating) >= 1.5 && {
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
    update: P,
    refs: H,
    elements: B,
    floatingStyles: q
  }), [d, P, H, B, q]);
}
const Rb = (e) => {
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
      return r && t(r) ? r.current != null ? oc({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? oc({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Lb = (e, t) => ({
  ...xb(e),
  options: [e, t]
}), Ib = (e, t) => ({
  ...kb(e),
  options: [e, t]
}), Pb = (e, t) => ({
  ...Eb(e),
  options: [e, t]
}), Ob = (e, t) => ({
  ...Cb(e),
  options: [e, t]
}), _b = (e, t) => ({
  ...Mb(e),
  options: [e, t]
}), $b = (e, t) => ({
  ...Sb(e),
  options: [e, t]
}), Hb = (e, t) => ({
  ...Rb(e),
  options: [e, t]
});
var Wb = "Arrow", ql = S.forwardRef((e, t) => {
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
ql.displayName = Wb;
var zb = ql;
function Bb(e) {
  const [t, n] = S.useState(void 0);
  return Jt(() => {
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
var za = "Popper", [Xl, Fo] = Zn(za), [Fb, Zl] = Xl(za), Ql = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = S.useState(null);
  return /* @__PURE__ */ f(Fb, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Ql.displayName = za;
var Jl = "PopperAnchor", ed = S.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Zl(Jl, n), i = S.useRef(null), a = Ye(t, i), c = S.useRef(null);
    return S.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ f(Fe.div, { ...o, ref: a });
  }
);
ed.displayName = Jl;
var Ba = "PopperContent", [Ub, Yb] = Xl(Ba), td = S.forwardRef(
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
    } = e, y = Zl(Ba, n), [b, v] = S.useState(null), w = Ye(t, (j) => v(j)), [M, x] = S.useState(null), k = Bb(M), D = k?.width ?? 0, C = k?.height ?? 0, E = r + (s !== "center" ? "-" + s : ""), T = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, N = Array.isArray(l) ? l : [l], A = N.length > 0, P = {
      padding: T,
      boundary: N.filter(Kb),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: O, floatingStyles: H, placement: B, isPositioned: q, middlewareData: I } = Ab({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: E,
      whileElementsMounted: (...j) => wb(...j, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Lb({ mainAxis: o + C, alignmentAxis: i }),
        c && Ib({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? Pb() : void 0,
          ...P
        }),
        c && Ob({ ...P }),
        _b({
          ...P,
          apply: ({ elements: j, rects: ee, availableWidth: ge, availableHeight: ye }) => {
            const { width: Re, height: We } = ee.reference, rt = j.floating.style;
            rt.setProperty("--radix-popper-available-width", `${ge}px`), rt.setProperty("--radix-popper-available-height", `${ye}px`), rt.setProperty("--radix-popper-anchor-width", `${Re}px`), rt.setProperty("--radix-popper-anchor-height", `${We}px`);
          }
        }),
        M && Hb({ element: M, padding: a }),
        Vb({ arrowWidth: D, arrowHeight: C }),
        m && $b({ strategy: "referenceHidden", ...P })
      ]
    }), [L, U] = od(B), X = _t(h);
    Jt(() => {
      q && X?.();
    }, [q, X]);
    const G = I.arrow?.x, Z = I.arrow?.y, te = I.arrow?.centerOffset !== 0, [$, z] = S.useState();
    return Jt(() => {
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
        children: /* @__PURE__ */ f(
          Ub,
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
td.displayName = Ba;
var nd = "PopperArrow", jb = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, rd = S.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Yb(nd, r), i = jb[s.placedSide];
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
          zb,
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
rd.displayName = nd;
function Kb(e) {
  return e !== null;
}
var Vb = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, d] = od(n), u = { start: "0%", center: "50%", end: "100%" }[d], m = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let h = "", g = "";
    return l === "bottom" ? (h = i ? u : `${m}px`, g = `${-c}px`) : l === "top" ? (h = i ? u : `${m}px`, g = `${r.floating.height + c}px`) : l === "right" ? (h = `${-c}px`, g = i ? u : `${p}px`) : l === "left" && (h = `${r.floating.width + c}px`, g = i ? u : `${p}px`), { data: { x: h, y: g } };
  }
});
function od(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var sd = Ql, ad = ed, id = td, cd = rd, Gb = "Portal", Fa = S.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = S.useState(!1);
  Jt(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? am.createPortal(/* @__PURE__ */ f(Fe.div, { ...r, ref: t }), i) : null;
});
Fa.displayName = Gb;
function qb(e, t) {
  return S.useReducer((n, r) => t[n][r] ?? n, e);
}
var hn = (e) => {
  const { present: t, children: n } = e, r = Xb(t), o = typeof n == "function" ? n({ present: r.isPresent }) : S.Children.only(n), s = Ye(r.ref, Zb(o));
  return typeof n == "function" || r.isPresent ? S.cloneElement(o, { ref: s }) : null;
};
hn.displayName = "Presence";
function Xb(e) {
  const [t, n] = S.useState(), r = S.useRef(null), o = S.useRef(e), s = S.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = qb(i, {
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
    const l = ro(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), Jt(() => {
    const l = r.current, d = o.current;
    if (d !== e) {
      const m = s.current, p = ro(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(d && m !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Jt(() => {
    if (t) {
      let l;
      const d = t.ownerDocument.defaultView ?? window, u = (p) => {
        const g = ro(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, m = (p) => {
        p.target === t && (s.current = ro(r.current));
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
function ro(e) {
  return e?.animationName || "none";
}
function Zb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Ss = "rovingFocusGroup.onEntryFocus", Qb = { bubbles: !1, cancelable: !0 }, Rr = "RovingFocusGroup", [Zs, ld, Jb] = Ll(Rr), [ew, dd] = Zn(
  Rr,
  [Jb]
), [tw, nw] = ew(Rr), ud = S.forwardRef(
  (e, t) => /* @__PURE__ */ f(Zs.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(Zs.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(rw, { ...e, ref: t }) }) })
);
ud.displayName = Rr;
var rw = S.forwardRef((e, t) => {
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
  } = e, m = S.useRef(null), p = Ye(t, m), h = Il(s), [g, y] = La({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: Rr
  }), [b, v] = S.useState(!1), w = _t(l), M = ld(n), x = S.useRef(!1), [k, D] = S.useState(0);
  return S.useEffect(() => {
    const C = m.current;
    if (C)
      return C.addEventListener(Ss, w), () => C.removeEventListener(Ss, w);
  }, [w]), /* @__PURE__ */ f(
    tw,
    {
      scope: n,
      orientation: r,
      dir: h,
      loop: o,
      currentTabStopId: g,
      onItemFocus: S.useCallback(
        (C) => y(C),
        [y]
      ),
      onItemShiftTab: S.useCallback(() => v(!0), []),
      onFocusableItemAdd: S.useCallback(
        () => D((C) => C + 1),
        []
      ),
      onFocusableItemRemove: S.useCallback(
        () => D((C) => C - 1),
        []
      ),
      children: /* @__PURE__ */ f(
        Fe.div,
        {
          tabIndex: b || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: me(e.onMouseDown, () => {
            x.current = !0;
          }),
          onFocus: me(e.onFocus, (C) => {
            const E = !x.current;
            if (C.target === C.currentTarget && E && !b) {
              const T = new CustomEvent(Ss, Qb);
              if (C.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const N = M().filter((B) => B.focusable), A = N.find((B) => B.active), P = N.find((B) => B.id === g), H = [A, P, ...N].filter(
                  Boolean
                ).map((B) => B.ref.current);
                pd(H, d);
              }
            }
            x.current = !1;
          }),
          onBlur: me(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), fd = "RovingFocusGroupItem", md = S.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = bo(), l = s || c, d = nw(fd, n), u = d.currentTabStopId === l, m = ld(n), { onFocusableItemAdd: p, onFocusableItemRemove: h, currentTabStopId: g } = d;
    return S.useEffect(() => {
      if (r)
        return p(), () => h();
    }, [r, p, h]), /* @__PURE__ */ f(
      Zs.ItemSlot,
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
            onMouseDown: me(e.onMouseDown, (y) => {
              r ? d.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: me(e.onFocus, () => d.onItemFocus(l)),
            onKeyDown: me(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const b = aw(y, d.orientation, d.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = m().filter((M) => M.focusable).map((M) => M.ref.current);
                if (b === "last") w.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && w.reverse();
                  const M = w.indexOf(y.currentTarget);
                  w = d.loop ? iw(w, M + 1) : w.slice(M + 1);
                }
                setTimeout(() => pd(w));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: g != null }) : i
          }
        )
      }
    );
  }
);
md.displayName = fd;
var ow = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function sw(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function aw(e, t, n) {
  const r = sw(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return ow[r];
}
function pd(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function iw(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var cw = ud, lw = md, dw = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Sn = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ new WeakMap(), so = {}, Es = 0, hd = function(e) {
  return e && (e.host || hd(e.parentNode));
}, uw = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = hd(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, fw = function(e, t, n, r) {
  var o = uw(t, Array.isArray(e) ? e : [e]);
  so[n] || (so[n] = /* @__PURE__ */ new WeakMap());
  var s = so[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(u) {
    !u || a.has(u) || (a.add(u), l(u.parentNode));
  };
  o.forEach(l);
  var d = function(u) {
    !u || c.has(u) || Array.prototype.forEach.call(u.children, function(m) {
      if (a.has(m))
        d(m);
      else
        try {
          var p = m.getAttribute(r), h = p !== null && p !== "false", g = (Sn.get(m) || 0) + 1, y = (s.get(m) || 0) + 1;
          Sn.set(m, g), s.set(m, y), i.push(m), g === 1 && h && oo.set(m, !0), y === 1 && m.setAttribute(n, "true"), h || m.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", m, b);
        }
    });
  };
  return d(t), a.clear(), Es++, function() {
    i.forEach(function(u) {
      var m = Sn.get(u) - 1, p = s.get(u) - 1;
      Sn.set(u, m), s.set(u, p), m || (oo.has(u) || u.removeAttribute(r), oo.delete(u)), p || u.removeAttribute(n);
    }), Es--, Es || (Sn = /* @__PURE__ */ new WeakMap(), Sn = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ new WeakMap(), so = {});
  };
}, mw = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = dw(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), fw(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, ht = function() {
  return ht = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, ht.apply(this, arguments);
};
function gd(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function pw(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var go = "right-scroll-bar-position", yo = "width-before-scroll-bar", hw = "with-scroll-bars-hidden", gw = "--removed-body-scroll-bar-size";
function Ts(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function yw(e, t) {
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
var vw = typeof window < "u" ? S.useLayoutEffect : S.useEffect, ac = /* @__PURE__ */ new WeakMap();
function bw(e, t) {
  var n = yw(null, function(r) {
    return e.forEach(function(o) {
      return Ts(o, r);
    });
  });
  return vw(function() {
    var r = ac.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Ts(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Ts(a, i);
      });
    }
    ac.set(n, e);
  }, [e]), n;
}
function ww(e) {
  return e;
}
function xw(e, t) {
  t === void 0 && (t = ww);
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
function kw(e) {
  e === void 0 && (e = {});
  var t = xw(null);
  return t.options = ht({ async: !0, ssr: !1 }, e), t;
}
var yd = function(e) {
  var t = e.sideCar, n = gd(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return S.createElement(r, ht({}, n));
};
yd.isSideCarExport = !0;
function Cw(e, t) {
  return e.useMedium(t), yd;
}
var vd = kw(), Ds = function() {
}, Uo = S.forwardRef(function(e, t) {
  var n = S.useRef(null), r = S.useState({
    onScrollCapture: Ds,
    onWheelCapture: Ds,
    onTouchMoveCapture: Ds
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, u = e.shards, m = e.sideCar, p = e.noRelative, h = e.noIsolation, g = e.inert, y = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, w = e.gapMode, M = gd(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), x = m, k = bw([n, t]), D = ht(ht({}, M), o);
  return S.createElement(
    S.Fragment,
    null,
    d && S.createElement(x, { sideCar: vd, removeScrollBar: l, shards: u, noRelative: p, noIsolation: h, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    i ? S.cloneElement(S.Children.only(a), ht(ht({}, D), { ref: k })) : S.createElement(v, ht({}, D, { className: c, ref: k }), a)
  );
});
Uo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Uo.classNames = {
  fullWidth: yo,
  zeroRight: go
};
var Mw = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Sw() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Mw();
  return t && e.setAttribute("nonce", t), e;
}
function Ew(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Tw(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Dw = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Sw()) && (Ew(t, n), Tw(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Nw = function() {
  var e = Dw();
  return function(t, n) {
    S.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, bd = function() {
  var e = Nw(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Aw = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ns = function(e) {
  return parseInt(e || "", 10) || 0;
}, Rw = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ns(n), Ns(r), Ns(o)];
}, Lw = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Aw;
  var t = Rw(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Iw = bd(), Hn = "data-scroll-locked", Pw = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(hw, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(Hn, `] {
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
  
  .`).concat(go, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(yo, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(go, " .").concat(go, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(yo, " .").concat(yo, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Hn, `] {
    `).concat(gw, ": ").concat(a, `px;
  }
`);
}, ic = function() {
  var e = parseInt(document.body.getAttribute(Hn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ow = function() {
  S.useEffect(function() {
    return document.body.setAttribute(Hn, (ic() + 1).toString()), function() {
      var e = ic() - 1;
      e <= 0 ? document.body.removeAttribute(Hn) : document.body.setAttribute(Hn, e.toString());
    };
  }, []);
}, _w = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Ow();
  var s = S.useMemo(function() {
    return Lw(o);
  }, [o]);
  return S.createElement(Iw, { styles: Pw(s, !t, o, n ? "" : "!important") });
}, Qs = !1;
if (typeof window < "u")
  try {
    var ao = Object.defineProperty({}, "passive", {
      get: function() {
        return Qs = !0, !0;
      }
    });
    window.addEventListener("test", ao, ao), window.removeEventListener("test", ao, ao);
  } catch {
    Qs = !1;
  }
var En = Qs ? { passive: !1 } : !1, $w = function(e) {
  return e.tagName === "TEXTAREA";
}, wd = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !$w(e) && n[t] === "visible")
  );
}, Hw = function(e) {
  return wd(e, "overflowY");
}, Ww = function(e) {
  return wd(e, "overflowX");
}, cc = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = xd(e, r);
    if (o) {
      var s = kd(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, zw = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Bw = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, xd = function(e, t) {
  return e === "v" ? Hw(t) : Ww(t);
}, kd = function(e, t) {
  return e === "v" ? zw(t) : Bw(t);
}, Fw = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Uw = function(e, t, n, r, o) {
  var s = Fw(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, d = i > 0, u = 0, m = 0;
  do {
    if (!a)
      break;
    var p = kd(e, a), h = p[0], g = p[1], y = p[2], b = g - y - s * h;
    (h || b) && xd(e, a) && (u += b, m += h);
    var v = a.parentNode;
    a = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(m) < 1) && (l = !0), l;
}, io = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, lc = function(e) {
  return [e.deltaX, e.deltaY];
}, dc = function(e) {
  return e && "current" in e ? e.current : e;
}, Yw = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, jw = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Kw = 0, Tn = [];
function Vw(e) {
  var t = S.useRef([]), n = S.useRef([0, 0]), r = S.useRef(), o = S.useState(Kw++)[0], s = S.useState(bd)[0], i = S.useRef(e);
  S.useEffect(function() {
    i.current = e;
  }, [e]), S.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = pw([e.lockRef.current], (e.shards || []).map(dc), !0).filter(Boolean);
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
    var b = io(g), v = n.current, w = "deltaX" in g ? g.deltaX : v[0] - b[0], M = "deltaY" in g ? g.deltaY : v[1] - b[1], x, k = g.target, D = Math.abs(w) > Math.abs(M) ? "h" : "v";
    if ("touches" in g && D === "h" && k.type === "range")
      return !1;
    var C = cc(D, k);
    if (!C)
      return !0;
    if (C ? x = D : (x = D === "v" ? "h" : "v", C = cc(D, k)), !C)
      return !1;
    if (!r.current && "changedTouches" in g && (w || M) && (r.current = x), !x)
      return !0;
    var E = r.current || x;
    return Uw(E, y, g, E === "h" ? w : M);
  }, []), c = S.useCallback(function(g) {
    var y = g;
    if (!(!Tn.length || Tn[Tn.length - 1] !== s)) {
      var b = "deltaY" in y ? lc(y) : io(y), v = t.current.filter(function(x) {
        return x.name === y.type && (x.target === y.target || y.target === x.shadowParent) && Yw(x.delta, b);
      })[0];
      if (v && v.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!v) {
        var w = (i.current.shards || []).map(dc).filter(Boolean).filter(function(x) {
          return x.contains(y.target);
        }), M = w.length > 0 ? a(y, w[0]) : !i.current.noIsolation;
        M && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = S.useCallback(function(g, y, b, v) {
    var w = { name: g, delta: y, target: b, should: v, shadowParent: Gw(b) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== w;
      });
    }, 1);
  }, []), d = S.useCallback(function(g) {
    n.current = io(g), r.current = void 0;
  }, []), u = S.useCallback(function(g) {
    l(g.type, lc(g), g.target, a(g, e.lockRef.current));
  }, []), m = S.useCallback(function(g) {
    l(g.type, io(g), g.target, a(g, e.lockRef.current));
  }, []);
  S.useEffect(function() {
    return Tn.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", c, En), document.addEventListener("touchmove", c, En), document.addEventListener("touchstart", d, En), function() {
      Tn = Tn.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", c, En), document.removeEventListener("touchmove", c, En), document.removeEventListener("touchstart", d, En);
    };
  }, []);
  var p = e.removeScrollBar, h = e.inert;
  return S.createElement(
    S.Fragment,
    null,
    h ? S.createElement(s, { styles: jw(o) }) : null,
    p ? S.createElement(_w, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Gw(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const qw = Cw(vd, Vw);
var Cd = S.forwardRef(function(e, t) {
  return S.createElement(Uo, ht({}, e, { ref: t, sideCar: qw }));
});
Cd.classNames = Uo.classNames;
var Js = ["Enter", " "], Xw = ["ArrowDown", "PageUp", "Home"], Md = ["ArrowUp", "PageDown", "End"], Zw = [...Xw, ...Md], Qw = {
  ltr: [...Js, "ArrowRight"],
  rtl: [...Js, "ArrowLeft"]
}, Jw = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Lr = "Menu", [Mr, e0, t0] = Ll(Lr), [gn, Sd] = Zn(Lr, [
  t0,
  Fo,
  dd
]), Yo = Fo(), Ed = dd(), [n0, yn] = gn(Lr), [r0, Ir] = gn(Lr), Td = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Yo(t), [c, l] = S.useState(null), d = S.useRef(!1), u = _t(s), m = Il(o);
  return S.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ f(sd, { ...a, children: /* @__PURE__ */ f(
    n0,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ f(
        r0,
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
Td.displayName = Lr;
var o0 = "MenuAnchor", Ua = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Yo(n);
    return /* @__PURE__ */ f(ad, { ...o, ...r, ref: t });
  }
);
Ua.displayName = o0;
var Ya = "MenuPortal", [s0, Dd] = gn(Ya, {
  forceMount: void 0
}), Nd = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = yn(Ya, t);
  return /* @__PURE__ */ f(s0, { scope: t, forceMount: n, children: /* @__PURE__ */ f(hn, { present: n || s.open, children: /* @__PURE__ */ f(Fa, { asChild: !0, container: o, children: r }) }) });
};
Nd.displayName = Ya;
var at = "MenuContent", [a0, ja] = gn(at), Ad = S.forwardRef(
  (e, t) => {
    const n = Dd(at, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = yn(at, e.__scopeMenu), i = Ir(at, e.__scopeMenu);
    return /* @__PURE__ */ f(Mr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(hn, { present: r || s.open, children: /* @__PURE__ */ f(Mr.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ f(i0, { ...o, ref: t }) : /* @__PURE__ */ f(c0, { ...o, ref: t }) }) }) });
  }
), i0 = S.forwardRef(
  (e, t) => {
    const n = yn(at, e.__scopeMenu), r = S.useRef(null), o = Ye(t, r);
    return S.useEffect(() => {
      const s = r.current;
      if (s) return mw(s);
    }, []), /* @__PURE__ */ f(
      Ka,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: me(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), c0 = S.forwardRef((e, t) => {
  const n = yn(at, e.__scopeMenu);
  return /* @__PURE__ */ f(
    Ka,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), l0 = /* @__PURE__ */ xr("MenuContent.ScrollLock"), Ka = S.forwardRef(
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
    } = e, y = yn(at, n), b = Ir(at, n), v = Yo(n), w = Ed(n), M = e0(n), [x, k] = S.useState(null), D = S.useRef(null), C = Ye(t, D, y.onContentChange), E = S.useRef(0), T = S.useRef(""), N = S.useRef(0), A = S.useRef(null), P = S.useRef("right"), O = S.useRef(0), H = h ? Cd : S.Fragment, B = h ? { as: l0, allowPinchZoom: !0 } : void 0, q = (L) => {
      const U = T.current + L, X = M().filter((j) => !j.disabled), G = document.activeElement, Z = X.find((j) => j.ref.current === G)?.textValue, te = X.map((j) => j.textValue), $ = x0(te, U, Z), z = X.find((j) => j.textValue === $)?.ref.current;
      (function j(ee) {
        T.current = ee, window.clearTimeout(E.current), ee !== "" && (E.current = window.setTimeout(() => j(""), 1e3));
      })(U), z && setTimeout(() => z.focus());
    };
    S.useEffect(() => () => window.clearTimeout(E.current), []), bv();
    const I = S.useCallback((L) => P.current === A.current?.side && C0(L, A.current?.area), []);
    return /* @__PURE__ */ f(
      a0,
      {
        scope: n,
        searchRef: T,
        onItemEnter: S.useCallback(
          (L) => {
            I(L) && L.preventDefault();
          },
          [I]
        ),
        onItemLeave: S.useCallback(
          (L) => {
            I(L) || (D.current?.focus(), k(null));
          },
          [I]
        ),
        onTriggerLeave: S.useCallback(
          (L) => {
            I(L) && L.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: N,
        onPointerGraceIntentChange: S.useCallback((L) => {
          A.current = L;
        }, []),
        children: /* @__PURE__ */ f(H, { ...B, children: /* @__PURE__ */ f(
          _l,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: me(s, (L) => {
              L.preventDefault(), D.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ f(
              Ia,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: d,
                onFocusOutside: u,
                onInteractOutside: m,
                onDismiss: p,
                children: /* @__PURE__ */ f(
                  cw,
                  {
                    asChild: !0,
                    ...w,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: x,
                    onCurrentTabStopIdChange: k,
                    onEntryFocus: me(c, (L) => {
                      b.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ f(
                      id,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Kd(y.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...g,
                        ref: C,
                        style: { outline: "none", ...g.style },
                        onKeyDown: me(g.onKeyDown, (L) => {
                          const X = L.target.closest("[data-radix-menu-content]") === L.currentTarget, G = L.ctrlKey || L.altKey || L.metaKey, Z = L.key.length === 1;
                          X && (L.key === "Tab" && L.preventDefault(), !G && Z && q(L.key));
                          const te = D.current;
                          if (L.target !== te || !Zw.includes(L.key)) return;
                          L.preventDefault();
                          const z = M().filter((j) => !j.disabled).map((j) => j.ref.current);
                          Md.includes(L.key) && z.reverse(), b0(z);
                        }),
                        onBlur: me(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(E.current), T.current = "");
                        }),
                        onPointerMove: me(
                          e.onPointerMove,
                          Sr((L) => {
                            const U = L.target, X = O.current !== L.clientX;
                            if (L.currentTarget.contains(U) && X) {
                              const G = L.clientX > O.current ? "right" : "left";
                              P.current = G, O.current = L.clientX;
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
Ad.displayName = at;
var d0 = "MenuGroup", Va = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(Fe.div, { role: "group", ...r, ref: t });
  }
);
Va.displayName = d0;
var u0 = "MenuLabel", Rd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(Fe.div, { ...r, ref: t });
  }
);
Rd.displayName = u0;
var Mo = "MenuItem", uc = "menu.itemSelect", jo = S.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = S.useRef(null), i = Ir(Mo, e.__scopeMenu), a = ja(Mo, e.__scopeMenu), c = Ye(t, s), l = S.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const m = new CustomEvent(uc, { bubbles: !0, cancelable: !0 });
        u.addEventListener(uc, (p) => r?.(p), { once: !0 }), Rl(u, m), m.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ f(
      Ld,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: me(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), l.current = !0;
        },
        onPointerUp: me(e.onPointerUp, (u) => {
          l.current || u.currentTarget?.click();
        }),
        onKeyDown: me(e.onKeyDown, (u) => {
          const m = a.searchRef.current !== "";
          n || m && u.key === " " || Js.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
jo.displayName = Mo;
var Ld = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = ja(Mo, n), a = Ed(n), c = S.useRef(null), l = Ye(t, c), [d, u] = S.useState(!1), [m, p] = S.useState("");
    return S.useEffect(() => {
      const h = c.current;
      h && p((h.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ f(
      Mr.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? m,
        children: /* @__PURE__ */ f(lw, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ f(
          Fe.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: me(
              e.onPointerMove,
              Sr((h) => {
                r ? i.onItemLeave(h) : (i.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: me(
              e.onPointerLeave,
              Sr((h) => i.onItemLeave(h))
            ),
            onFocus: me(e.onFocus, () => u(!0)),
            onBlur: me(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), f0 = "MenuCheckboxItem", Id = S.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ f(Hd, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ f(
      jo,
      {
        role: "menuitemcheckbox",
        "aria-checked": So(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": qa(n),
        onSelect: me(
          o.onSelect,
          () => r?.(So(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Id.displayName = f0;
var Pd = "MenuRadioGroup", [m0, p0] = gn(
  Pd,
  { value: void 0, onValueChange: () => {
  } }
), Od = S.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = _t(r);
    return /* @__PURE__ */ f(m0, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ f(Va, { ...o, ref: t }) });
  }
);
Od.displayName = Pd;
var _d = "MenuRadioItem", $d = S.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = p0(_d, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ f(Hd, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ f(
      jo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": qa(s),
        onSelect: me(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
$d.displayName = _d;
var Ga = "MenuItemIndicator", [Hd, h0] = gn(
  Ga,
  { checked: !1 }
), Wd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = h0(Ga, n);
    return /* @__PURE__ */ f(
      hn,
      {
        present: r || So(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ f(
          Fe.span,
          {
            ...o,
            ref: t,
            "data-state": qa(s.checked)
          }
        )
      }
    );
  }
);
Wd.displayName = Ga;
var g0 = "MenuSeparator", zd = S.forwardRef(
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
zd.displayName = g0;
var y0 = "MenuArrow", Bd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Yo(n);
    return /* @__PURE__ */ f(cd, { ...o, ...r, ref: t });
  }
);
Bd.displayName = y0;
var v0 = "MenuSub", [cC, Fd] = gn(v0), pr = "MenuSubTrigger", Ud = S.forwardRef(
  (e, t) => {
    const n = yn(pr, e.__scopeMenu), r = Ir(pr, e.__scopeMenu), o = Fd(pr, e.__scopeMenu), s = ja(pr, e.__scopeMenu), i = S.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, d = S.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return S.useEffect(() => d, [d]), S.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), c(null);
      };
    }, [a, c]), /* @__PURE__ */ f(Ua, { asChild: !0, ...l, children: /* @__PURE__ */ f(
      Ld,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Kd(n.open),
        ...e,
        ref: _o(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: me(
          e.onPointerMove,
          Sr((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: me(
          e.onPointerLeave,
          Sr((u) => {
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
        onKeyDown: me(e.onKeyDown, (u) => {
          const m = s.searchRef.current !== "";
          e.disabled || m && u.key === " " || Qw[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Ud.displayName = pr;
var Yd = "MenuSubContent", jd = S.forwardRef(
  (e, t) => {
    const n = Dd(at, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = yn(at, e.__scopeMenu), i = Ir(at, e.__scopeMenu), a = Fd(Yd, e.__scopeMenu), c = S.useRef(null), l = Ye(t, c);
    return /* @__PURE__ */ f(Mr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(hn, { present: r || s.open, children: /* @__PURE__ */ f(Mr.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(
      Ka,
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
        onFocusOutside: me(e.onFocusOutside, (d) => {
          d.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: me(e.onEscapeKeyDown, (d) => {
          i.onClose(), d.preventDefault();
        }),
        onKeyDown: me(e.onKeyDown, (d) => {
          const u = d.currentTarget.contains(d.target), m = Jw[i.dir].includes(d.key);
          u && m && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
jd.displayName = Yd;
function Kd(e) {
  return e ? "open" : "closed";
}
function So(e) {
  return e === "indeterminate";
}
function qa(e) {
  return So(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function b0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function w0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function x0(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = w0(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function k0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, m = c.y;
    d > r != m > r && n < (u - l) * (r - d) / (m - d) + l && (o = !o);
  }
  return o;
}
function C0(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return k0(n, t);
}
function Sr(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var M0 = Td, S0 = Ua, E0 = Nd, T0 = Ad, D0 = Va, N0 = Rd, A0 = jo, R0 = Id, L0 = Od, I0 = $d, P0 = Wd, O0 = zd, _0 = Bd, $0 = Ud, H0 = jd, Ko = "DropdownMenu", [W0] = Zn(
  Ko,
  [Sd]
), Ge = Sd(), [z0, Vd] = W0(Ko), Gd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = Ge(t), l = S.useRef(null), [d, u] = La({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: Ko
  });
  return /* @__PURE__ */ f(
    z0,
    {
      scope: t,
      triggerId: bo(),
      triggerRef: l,
      contentId: bo(),
      open: d,
      onOpenChange: u,
      onOpenToggle: S.useCallback(() => u((m) => !m), [u]),
      modal: a,
      children: /* @__PURE__ */ f(M0, { ...c, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
Gd.displayName = Ko;
var qd = "DropdownMenuTrigger", Xd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = Vd(qd, n), i = Ge(n);
    return /* @__PURE__ */ f(S0, { asChild: !0, ...i, children: /* @__PURE__ */ f(
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
        ref: _o(t, s.triggerRef),
        onPointerDown: me(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: me(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
Xd.displayName = qd;
var B0 = "DropdownMenuPortal", Zd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ge(t);
  return /* @__PURE__ */ f(E0, { ...r, ...n });
};
Zd.displayName = B0;
var Qd = "DropdownMenuContent", Jd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Vd(Qd, n), s = Ge(n), i = S.useRef(!1);
    return /* @__PURE__ */ f(
      T0,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: me(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: me(e.onInteractOutside, (a) => {
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
Jd.displayName = Qd;
var F0 = "DropdownMenuGroup", U0 = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
    return /* @__PURE__ */ f(D0, { ...o, ...r, ref: t });
  }
);
U0.displayName = F0;
var Y0 = "DropdownMenuLabel", j0 = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
    return /* @__PURE__ */ f(N0, { ...o, ...r, ref: t });
  }
);
j0.displayName = Y0;
var K0 = "DropdownMenuItem", eu = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
    return /* @__PURE__ */ f(A0, { ...o, ...r, ref: t });
  }
);
eu.displayName = K0;
var V0 = "DropdownMenuCheckboxItem", G0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(R0, { ...o, ...r, ref: t });
});
G0.displayName = V0;
var q0 = "DropdownMenuRadioGroup", X0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(L0, { ...o, ...r, ref: t });
});
X0.displayName = q0;
var Z0 = "DropdownMenuRadioItem", Q0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(I0, { ...o, ...r, ref: t });
});
Q0.displayName = Z0;
var J0 = "DropdownMenuItemIndicator", ex = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(P0, { ...o, ...r, ref: t });
});
ex.displayName = J0;
var tx = "DropdownMenuSeparator", tu = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(O0, { ...o, ...r, ref: t });
});
tu.displayName = tx;
var nx = "DropdownMenuArrow", rx = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
    return /* @__PURE__ */ f(_0, { ...o, ...r, ref: t });
  }
);
rx.displayName = nx;
var ox = "DropdownMenuSubTrigger", sx = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f($0, { ...o, ...r, ref: t });
});
sx.displayName = ox;
var ax = "DropdownMenuSubContent", ix = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ge(n);
  return /* @__PURE__ */ f(
    H0,
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
ix.displayName = ax;
var cx = Gd, lx = Xd, dx = Zd, ux = Jd, fx = eu, mx = tu;
function As({
  ...e
}) {
  return /* @__PURE__ */ f(cx, { "data-slot": "dropdown-menu", ...e });
}
function Rs({
  ...e
}) {
  return /* @__PURE__ */ f(
    lx,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function Ls({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ f(dx, { children: /* @__PURE__ */ f(
    ux,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: fe(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function Ie({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ f(
    fx,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: fe(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    }
  );
}
function Is({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    mx,
    {
      "data-slot": "dropdown-menu-separator",
      className: fe("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var px = Object.freeze({
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
}), hx = "VisuallyHidden", nu = S.forwardRef(
  (e, t) => /* @__PURE__ */ f(
    Fe.span,
    {
      ...e,
      ref: t,
      style: { ...px, ...e.style }
    }
  )
);
nu.displayName = hx;
var gx = nu, [Vo] = Zn("Tooltip", [
  Fo
]), Go = Fo(), ru = "TooltipProvider", yx = 700, ea = "tooltip.open", [vx, Xa] = Vo(ru), ou = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = yx,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = S.useRef(!0), a = S.useRef(!1), c = S.useRef(0);
  return S.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ f(
    vx,
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
ou.displayName = ru;
var Er = "Tooltip", [bx, Pr] = Vo(Er), su = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = Xa(Er, e.__scopeTooltip), l = Go(t), [d, u] = S.useState(null), m = bo(), p = S.useRef(0), h = i ?? c.disableHoverableContent, g = a ?? c.delayDuration, y = S.useRef(!1), [b, v] = La({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (c.onOpen(), document.dispatchEvent(new CustomEvent(ea))) : c.onClose(), s?.(D);
    },
    caller: Er
  }), w = S.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), M = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, v(!0);
  }, [v]), x = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v(!1);
  }, [v]), k = S.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, v(!0), p.current = 0;
    }, g);
  }, [g, v]);
  return S.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ f(sd, { ...l, children: /* @__PURE__ */ f(
    bx,
    {
      scope: t,
      contentId: m,
      open: b,
      stateAttribute: w,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: S.useCallback(() => {
        c.isOpenDelayedRef.current ? k() : M();
      }, [c.isOpenDelayedRef, k, M]),
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
su.displayName = Er;
var ta = "TooltipTrigger", au = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Pr(ta, n), s = Xa(ta, n), i = Go(n), a = S.useRef(null), c = Ye(t, a, o.onTriggerChange), l = S.useRef(!1), d = S.useRef(!1), u = S.useCallback(() => l.current = !1, []);
    return S.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ f(ad, { asChild: !0, ...i, children: /* @__PURE__ */ f(
      Fe.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: me(e.onPointerMove, (m) => {
          m.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: me(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: me(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", u, { once: !0 });
        }),
        onFocus: me(e.onFocus, () => {
          l.current || o.onOpen();
        }),
        onBlur: me(e.onBlur, o.onClose),
        onClick: me(e.onClick, o.onClose)
      }
    ) });
  }
);
au.displayName = ta;
var Za = "TooltipPortal", [wx, xx] = Vo(Za, {
  forceMount: void 0
}), iu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = Pr(Za, t);
  return /* @__PURE__ */ f(wx, { scope: t, forceMount: n, children: /* @__PURE__ */ f(hn, { present: n || s.open, children: /* @__PURE__ */ f(Fa, { asChild: !0, container: o, children: r }) }) });
};
iu.displayName = Za;
var Un = "TooltipContent", cu = S.forwardRef(
  (e, t) => {
    const n = xx(Un, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = Pr(Un, e.__scopeTooltip);
    return /* @__PURE__ */ f(hn, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ f(lu, { side: o, ...s, ref: t }) : /* @__PURE__ */ f(kx, { side: o, ...s, ref: t }) });
  }
), kx = S.forwardRef((e, t) => {
  const n = Pr(Un, e.__scopeTooltip), r = Xa(Un, e.__scopeTooltip), o = S.useRef(null), s = Ye(t, o), [i, a] = S.useState(null), { trigger: c, onClose: l } = n, d = o.current, { onPointerInTransitChange: u } = r, m = S.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = S.useCallback(
    (h, g) => {
      const y = h.currentTarget, b = { x: h.clientX, y: h.clientY }, v = Ex(b, y.getBoundingClientRect()), w = Tx(b, v), M = Dx(g.getBoundingClientRect()), x = Ax([...w, ...M]);
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
        const y = g.target, b = { x: g.clientX, y: g.clientY }, v = c?.contains(y) || d?.contains(y), w = !Nx(b, i);
        v ? m() : w && (m(), l());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [c, d, i, l, m]), /* @__PURE__ */ f(lu, { ...e, ref: s });
}), [Cx, Mx] = Vo(Er, { isInside: !1 }), Sx = /* @__PURE__ */ Ay("TooltipContent"), lu = S.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = Pr(Un, n), l = Go(n), { onClose: d } = c;
    return S.useEffect(() => (document.addEventListener(ea, d), () => document.removeEventListener(ea, d)), [d]), S.useEffect(() => {
      if (c.trigger) {
        const u = (m) => {
          m.target?.contains(c.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [c.trigger, d]), /* @__PURE__ */ f(
      Ia,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ R(
          id,
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
              /* @__PURE__ */ f(Sx, { children: r }),
              /* @__PURE__ */ f(Cx, { scope: n, isInside: !0, children: /* @__PURE__ */ f(gx, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
cu.displayName = Un;
var du = "TooltipArrow", uu = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Go(n);
    return Mx(
      du,
      n
    ).isInside ? null : /* @__PURE__ */ f(cd, { ...o, ...r, ref: t });
  }
);
uu.displayName = du;
function Ex(e, t) {
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
function Tx(e, t, n = 5) {
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
function Dx(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function Nx(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, m = c.y;
    d > r != m > r && n < (u - l) * (r - d) / (m - d) + l && (o = !o);
  }
  return o;
}
function Ax(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Rx(t);
}
function Rx(e) {
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
var Lx = ou, Ix = su, Px = au, Ox = iu, _x = cu, $x = uu;
function Hx({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ f(
    Lx,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function na({
  ...e
}) {
  return /* @__PURE__ */ f(Hx, { children: /* @__PURE__ */ f(Ix, { "data-slot": "tooltip", ...e }) });
}
function ra({
  ...e
}) {
  return /* @__PURE__ */ f(Px, { "data-slot": "tooltip-trigger", ...e });
}
function oa({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ f(Ox, { children: /* @__PURE__ */ R(
    _x,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: fe(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ f($x, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const Pe = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ R(na, { children: [
    /* @__PURE__ */ f(ra, { asChild: !0, children: s }),
    /* @__PURE__ */ f(oa, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, Dn = () => /* @__PURE__ */ f("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Wx = jn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = V(null), [l, d] = K(!1), [u, m] = K(void 0), p = Mc({
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
  }), h = Y(() => {
    const { view: k } = t, { from: D } = k.state.selection, C = k.coordsAtPos(D);
    m({ top: C.bottom + 8, left: C.left }), d(!0);
  }, [t]), g = Y((k, D) => {
    t.chain().focus().setImage({ src: k, alt: D }).run(), d(!1);
  }, [t]), y = Y(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = Y((k) => {
    t.chain().focus().insertCallout({ type: k }).run();
  }, [t]), v = V(/* @__PURE__ */ new Map()), w = V(/* @__PURE__ */ new Map()), M = Y((k) => {
    const { doc: D, tr: C } = k.state;
    let E = !1;
    const T = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), N.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((B) => {
        const q = B, I = (q.textContent || "").trim().substring(0, 50);
        v.current.set(`${O}-${I}`, q.getBoundingClientRect());
      });
    });
    const A = [];
    D.descendants((P, O, H, B) => {
      if (!T.has(P.type.name)) return !0;
      let q = !1;
      if (P.forEach((L) => {
        L.type.name === "taskItem" && (q = !0);
      }), !q) return !0;
      let I = 0;
      return D.nodesBetween(0, O, (L) => (T.has(L.type.name) && I++, !0)), A.push({ node: P, pos: O, depth: I }), !0;
    }), A.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of A) {
      const H = [];
      let B = 0;
      P.forEach(($) => {
        H.push({
          node: $,
          isTask: $.type.name === "taskItem",
          checked: $.type.name === "taskItem" && $.attrs.checked === !0,
          originalIndex: B++
        });
      });
      const q = H.filter(($) => $.isTask && !$.checked), I = H.filter(($) => $.isTask && $.checked), L = [...H], U = H.map(($, z) => ({ index: z, isTask: $.isTask })).filter(($) => $.isTask).map(($) => $.index), X = [...q, ...I];
      if (U.forEach(($, z) => {
        L[$] = X[z];
      }), !L.some(($, z) => $.node !== H[z].node)) continue;
      const Z = P.type.create(
        P.attrs,
        L.map(($) => $.node)
      ), te = C.mapping.map(O);
      C.replaceWith(te, te + P.nodeSize, Z), E = !0;
    }
    E && (k.view.dispatch(C), requestAnimationFrame(() => {
      k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const H = O.querySelectorAll(":scope > li"), B = /* @__PURE__ */ new Map();
        v.current.forEach((q, I) => {
          const L = I.replace(/^\d+-/, "");
          B.set(L, q);
        }), H.forEach((q) => {
          const I = q, L = (I.textContent || "").trim().substring(0, 50), U = B.get(L);
          if (!U) return;
          const X = I.getBoundingClientRect(), G = U.top - X.top;
          if (Math.abs(G) < 2) return;
          I.style.transform = `translateY(${G}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
          const Z = () => {
            I.style.transform = "", I.style.transition = "", I.style.zIndex = "", I.removeEventListener("transitionend", Z);
          };
          I.addEventListener("transitionend", Z), setTimeout(Z, 400);
        });
      });
    }));
  }, []);
  Q(() => {
    if (!s || !t) return;
    const k = /* @__PURE__ */ new Map();
    t.state.doc.descendants((C, E) => (C.type.name === "taskItem" && k.set(E, C.attrs.checked === !0), !0)), w.current = k;
    const D = ({ transaction: C }) => {
      if (!C.docChanged) return;
      const E = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, P) => (A.type.name === "taskItem" && E.set(P, A.attrs.checked === !0), !0));
      const T = w.current;
      let N = !1;
      if (T.size > 0 && E.size > 0) {
        let A = 0, P = 0;
        T.forEach((O) => {
          O && A++;
        }), E.forEach((O) => {
          O && P++;
        }), A !== P && (N = !0);
      }
      w.current = E, N && setTimeout(() => {
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
  return /* @__PURE__ */ R("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ f(Lf, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ f(If, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Dn, {}),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ f(ca, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ f(la, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ f(da, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ f(ua, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ f(Dc, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ f(Nc, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ f(fa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Dn, {}),
    /* @__PURE__ */ R(As, { children: [
      /* @__PURE__ */ f(Rs, { asChild: !0, children: /* @__PURE__ */ R(
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
            /* @__PURE__ */ f(Qt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(Ls, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
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
    /* @__PURE__ */ f(Dn, {}),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ f(pa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ f(ha, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ f(ga, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ f(ma, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ f(Pc, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ f(Pf, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ f(Of, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Dn, {}),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ f($s, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: h,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ f(ba, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ f(Oc, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(As, { children: [
      /* @__PURE__ */ f(Rs, { asChild: !0, children: /* @__PURE__ */ f(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ f(vo, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ R(Ls, { align: "start", children: [
        /* @__PURE__ */ R(Ie, { onClick: () => b("info"), children: [
          /* @__PURE__ */ f(vo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ R(Ie, { onClick: () => b("note"), children: [
          /* @__PURE__ */ f(va, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ R(Ie, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ f(_f, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ R(Ie, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ f($f, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ R(Ie, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ f(ya, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ R(As, { children: [
      /* @__PURE__ */ f(Rs, { asChild: !0, children: /* @__PURE__ */ R(
        Zt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ f($s, { size: 16 }),
            /* @__PURE__ */ f("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(Ls, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ f(ui, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ f(ui, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ f(Ln, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ f(Is, {}),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ f(fi, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ f(fi, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ f(Ln, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ f(Is, {}),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ f(mi, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ f(mi, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ f(Is, {}),
        /* @__PURE__ */ R(
          Ie,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ f(Ln, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f(
      Al,
      {
        isOpen: l,
        onClose: () => d(!1),
        onInsert: g,
        position: u
      }
    ),
    /* @__PURE__ */ f(Dn, {}),
    /* @__PURE__ */ f(
      Pe,
      {
        onClick: x,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ f(Hf, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ R(He, { children: [
      /* @__PURE__ */ f(Dn, {}),
      /* @__PURE__ */ R(na, { children: [
        /* @__PURE__ */ f(ra, { asChild: !0, children: /* @__PURE__ */ f(
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
            children: /* @__PURE__ */ f(Lo, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ f(oa, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ R(na, { children: [
      /* @__PURE__ */ f(ra, { asChild: !0, children: /* @__PURE__ */ R(
        Zt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ f(Vn, { size: 16 }),
            /* @__PURE__ */ f("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ f(oa, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function zx({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [d, u] = K(""), [m, p] = K(""), [h, g] = K(!1), [y, b] = K(!1), [v, w] = K(!1), [M, x] = K(!1), [k, D] = K([]), [C, E] = K(0), [T, N] = K(null), [A, P] = K(!1), O = V(!1), H = V(null), B = V(null), q = V(!1);
  Q(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const I = Y(() => {
    if (!d || !e) {
      D([]), E(0), N(null);
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
      j.descendants((ee, ge) => {
        if (ee.isText && ee.text) {
          let ye;
          for (; (ye = z.exec(ee.text)) !== null; )
            $.push({
              from: ge + ye.index,
              to: ge + ye.index + ye[0].length,
              text: ye[0]
            });
        }
        return !0;
      });
    }
    D($), $.length > 0 && C >= $.length && E(0);
  }, [d, h, y, v, e, C, l, i]);
  Q(() => {
    I();
  }, [I]), Q(() => {
    l && c && (t && k.length > 0 ? c(k, C) : c([], 0));
  }, [l, t, k, C, c]), Q(() => {
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
      currentMatchIndex: C
    }) : $ && e.commands.clearSearchHighlight();
  }, [e, t, d, h, y, C, l, k, i]), Q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), Q(() => {
    if (k.length > 0 && C < k.length) {
      const $ = k[C];
      if (l) {
        const j = document.querySelector(".syntax-textarea");
        if (j && q.current) {
          const ee = parseInt(getComputedStyle(j).lineHeight) || 22, ye = i.substring(0, $.from).split(`
`).length;
          j.scrollTop = Math.max(0, (ye - 3) * ee);
        }
        q.current && (q.current = !1);
        return;
      }
      const z = e.view.domAtPos($.from);
      z.node && z.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), q.current && (q.current = !1);
    }
  }, [C, k, e, l, i]), Q(() => {
    t && H.current && (H.current.focus(), H.current.select());
  }, [t, r]);
  const L = Y(() => {
    k.length !== 0 && (q.current = !0, E(($) => ($ + 1) % k.length));
  }, [k.length]), U = Y(() => {
    k.length !== 0 && (q.current = !0, E(($) => ($ - 1 + k.length) % k.length));
  }, [k.length]), X = Y(() => {
    if (k.length === 0 || C >= k.length) return;
    const $ = k[C];
    if (l && a) {
      const z = i.substring(0, $.from) + m + i.substring($.to);
      a(z), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(m).run(), setTimeout(I, 10);
  }, [k, C, m, e, I, l, i, a]), G = Y(() => {
    if (k.length === 0) return;
    if (l && a) {
      const z = [...k].sort((ee, ge) => ge.from - ee.from);
      let j = i;
      z.forEach((ee) => {
        j = j.substring(0, ee.from) + m + j.substring(ee.to);
      }), a(j), setTimeout(I, 10);
      return;
    }
    const $ = [...k].sort((z, j) => j.from - z.from);
    e.chain().focus(), $.forEach((z) => {
      e.chain().setTextSelection({ from: z.from, to: z.to }).deleteSelection().insertContent(m).run();
    }), setTimeout(I, 10);
  }, [k, m, e, I, l, i, a]), Z = Y(() => {
    if (k.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: h,
      useRegex: y,
      wholeWord: v
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [k, d, h, y, v, e, n]), te = Y(($) => {
    $.key === "Enter" ? ($.preventDefault(), $.shiftKey ? U() : L(), H.current?.focus()) : $.key === "Escape" ? ($.preventDefault(), n()) : $.key === "h" && ($.ctrlKey || $.metaKey) ? ($.preventDefault(), x((z) => !z)) : $.key === "l" && ($.ctrlKey || $.metaKey) && $.shiftKey && ($.preventDefault(), Z());
  }, [L, U, n, Z]);
  return t ? /* @__PURE__ */ R(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: te,
      children: [
        /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ f(Wf, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: H,
                type: "text",
                placeholder: "Find...",
                value: d,
                onChange: ($) => u($.target.value),
                className: `find-replace-input ${T ? "has-error" : ""}`
              }
            ),
            T && /* @__PURE__ */ f("span", { className: "find-replace-error", title: T, children: "!" })
          ] }),
          /* @__PURE__ */ f("span", { className: "find-replace-count", children: k.length > 0 ? `${C + 1} of ${k.length}` : d ? "No results" : "" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: U,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ f(zf, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: L,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ f(Qt, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: Z,
              disabled: k.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${k.length} matches`,
              children: /* @__PURE__ */ f(Bf, { size: 16 })
            }
          ),
          /* @__PURE__ */ f("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => g(($) => !$),
              className: `find-replace-btn ${h ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ f(Ff, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => w(($) => !$),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ f(Uf, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => b(($) => !$),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ f(Yf, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => x(($) => !$),
              className: `find-replace-btn ${M ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ f(Hs, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ f(Ot, { size: 16 })
            }
          )
        ] }),
        M && /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ f(Hs, { size: 14, className: "find-replace-icon" }),
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
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ R(
            "button",
            {
              onClick: G,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ f(jf, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const Bx = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), At = Bx ? "⌘" : "Ctrl", Fx = ({ editor: e }) => {
  const [t, n] = K(!1), [r, o] = K(0), [s, i] = K(0), [a, c] = K(""), [l, d] = K(""), [u, m] = K(!1), [p, h] = K(!1);
  Q(() => {
    if (!e) return;
    const D = () => {
      const E = e.storage.selectAllOccurrences;
      E ? (n(E.isActive), o(E.ranges.length), i(E.allMatches.length), c(E.searchTerm), d(E.typedBuffer), m(E.isTypingReplace), h(E.isIncremental)) : (n(!1), o(0), i(0));
    }, C = () => {
      D();
    };
    return e.on("transaction", C), D(), () => {
      e.off("transaction", C);
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
  }, [e]), k = Y(() => {
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
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-preview", children: u ? /* @__PURE__ */ R(He, { children: [
        /* @__PURE__ */ f(Io, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ f(He, { children: /* @__PURE__ */ R("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ R(He, { children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: x,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${At}+D)`,
            children: /* @__PURE__ */ f(xa, { size: 14 })
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${At}+Shift+L)`,
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
          title: `Bold all occurrences (${At}+B)`,
          children: /* @__PURE__ */ f(ca, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${At}+I)`,
          children: /* @__PURE__ */ f(la, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${At}+U)`,
          children: /* @__PURE__ */ f(da, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ f(ua, { size: 14 })
        }
      ),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ f(Ln, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: M,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ f(Ot, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ R(He, { children: [
      /* @__PURE__ */ R("kbd", { children: [
        At,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ R("kbd", { children: [
        At,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ f("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ R("kbd", { children: [
        At,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ R(He, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ f("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ f("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ R("kbd", { children: [
        At,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, Ux = jn(Fx), co = "-dismissed";
function Yx(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function jx(e, t = {}) {
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
  Q(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + co);
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
        const b = e.getHTML(), v = Yx(b);
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
  Q(() => {
    if (!e || !o || e.isDestroyed) return;
    const b = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        m();
      }, r));
    };
    return e.on("update", b), () => {
      e.off("update", b), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, m]), Q(() => {
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
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + co), d.current = "", c({
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
            e.commands.setContent(b), d.current = b, localStorage.removeItem(n + co), i?.(b);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), b) : null;
    } catch (b) {
      return console.warn("useAutoSave: Error recovering content", b), null;
    }
  }, [e, n, i]), y = Y(() => {
    try {
      localStorage.setItem(n + co, "true"), c((b) => ({ ...b, hasRecoverableContent: !1 }));
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
const Kx = 200;
function Vx(e, t = {}) {
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
    const b = Math.max(1, Math.ceil(m / Kx));
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
  return Q(() => {
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
function Gx({ status: e, lastSaved: t, className: n = "" }) {
  const r = (o) => {
    if (!o) return "";
    const i = (/* @__PURE__ */ new Date()).getTime() - o.getTime(), a = Math.floor(i / 1e3), c = Math.floor(a / 60), l = Math.floor(c / 60);
    return a < 10 ? "Just now" : a < 60 ? `${a}s ago` : c < 60 ? `${c}m ago` : l < 24 ? `${l}h ago` : o.toLocaleDateString();
  };
  return /* @__PURE__ */ R(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ R(He, { children: [
          /* @__PURE__ */ f(Kf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ R("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ R(He, { children: [
          /* @__PURE__ */ f(_c, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ f("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ R(He, { children: [
          /* @__PURE__ */ f(Kn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ f("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ R(He, { children: [
          /* @__PURE__ */ f(Vf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ f("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function qx({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ R(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ f(Gf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ f("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ R(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ f(ka, { className: "w-4 h-4" }),
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
              children: /* @__PURE__ */ f(Ot, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
const Xx = /\[\[([^\[\]]+)\]\]$/, Zx = Sc.create({
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
      Yn(
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
        find: Xx,
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
}), Rt = {
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
}, Qx = ["info", "note", "prompt", "resources", "todo"];
function Jx(e) {
  return e.length < 3 ? !1 : !!(Rt.header.test(e) || Rt.bold.test(e) || Rt.list.test(e) || Rt.taskList.test(e) || Rt.codeBlock.test(e) || Rt.callout.test(e) || Rt.highlight.test(e) || Rt.link.test(e) || Rt.table.test(e));
}
function ek(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function tk(e, t) {
  const { alt: n, align: r, width: o } = ek(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function Eo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function fc(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${Eo(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(tk(i[1], i[2])) : o.push(`<p>${Eo(s.trim())}</p>`);
  }
  return o.join("");
}
function fu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function mu(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", d = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, u = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const m = e[a];
      if (m.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${m.checked || !1}"><p>${Eo(m.text)}</p>` : i += `<li><p>${Eo(m.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function mc(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return fc(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(mu(s)), s = []);
  };
  for (const a of r) {
    const c = fu(a);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && i();
      }
      s.push(c);
    } else
      i(), o.push(fc(a.trim()));
  }
  return i(), o.join("");
}
function nk(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + mc(a) + "</th>";
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
        i += "<td>" + mc(u) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function rk(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (u) => {
    const m = u.split(`
`);
    if (m.length >= 2) {
      const p = m[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const h = nk(u);
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
  }), Qx.forEach((u) => {
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
    a.length !== 0 && (i.push(mu(a)), a = []);
  };
  for (const u of s) {
    const m = fu(u);
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
const ok = ut.create({
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
      new je({
        key: new Ke("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !Jx(i))
              return !1;
            n.preventDefault();
            const a = rk(i);
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
}), pc = new Ke("collapsibleHeading");
function sk(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function To(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, sk(i, a, l));
    }
  }), n;
}
let Wn = null;
function Ps(e, t, n) {
  const r = [], o = To(e, n.levels), s = [];
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
          b.classList.remove("collapsed", "expanded"), b.classList.add(w ? "expanded" : "collapsed"), b.title = w ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(u) ? t.collapsedHeadings.delete(u) : t.collapsedHeadings.add(u), Wn && Wn.dispatch(Wn.state.tr.setMeta("collapsibleHeading", { toggled: u }));
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
function ak(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = To(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
const ik = ut.create({
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
        const i = To(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return To(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new je({
        key: pc,
        view(n) {
          return Wn = n, {
            update(r) {
              Wn = r;
            },
            destroy() {
              Wn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: Ps(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const i = n.getMeta("collapsibleHeading");
            return i || n.docChanged ? (n.docChanged && !i && ak(o.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Ps(s.doc, e, t),
              docVersion: r.docVersion + 1
            }) : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = pc.getState(n);
            return r?.decorations ? r.decorations : Ps(n.doc, e, t);
          }
        }
      })
    ];
  }
}), ck = /\[([^\]]+)\]\(([^)]+)\)$/, lk = /^(https?:\/\/|www\.)[^\s]+$/i, dk = ut.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Qe({
        find: ck,
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
      new je({
        key: new Ke("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!lk.test(s)) return !1;
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
}), uk = ["info", "note", "prompt", "resources", "todo"], fk = ut.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new je({
        key: new Ke("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const d of uk)
              if (l === `\`\`\`${d}`) {
                n.preventDefault();
                const u = r.tr, m = a + c.indexOf("```");
                u.delete(m, i.pos);
                const p = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                if (p && h) {
                  const g = h.create(), y = p.create({ type: d }, dm.from(g));
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
}), lo = new Ke("searchHighlight"), mk = ut.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(lo, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(lo, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new je({
        key: lo,
        state: {
          init() {
            return Xe.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(lo), d = t.docChanged;
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
}), pk = new Ke("tabIndent");
function hk(e) {
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
const gk = ut.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new je({
        key: pk,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = hk(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!pi(s)(n, r)) {
                const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && pi(l)(n, r);
              }
            } else if (!hi(s)(n, r)) {
              const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && hi(l)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), yk = new Ke("expandSelection");
function Os(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const vk = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), bk = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), wk = "tableRow", xk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function kk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
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
    if (xk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Mk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === wk) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Sk(e, t, n) {
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
function Ek(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    vk.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function Tk(e) {
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
function Dk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Nk(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Ak(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(kk(e, o, s)), Nk(e, t) && (i(Ck(e, o, s)), i(Mk(e, o, s))), i(Ek(e, o, s)), i(Sk(e, o, s));
  const a = Tk(e);
  if (a.length > 0) {
    const c = Dk(a, o, s);
    for (const l of c)
      i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const Rk = ut.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof nf || o === 0 && s === n.content.size)
          return !0;
        const a = Ak(n, o, s);
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
      new je({
        key: yk,
        props: {
          handleClick() {
            return Os(e), !1;
          },
          handleTextInput() {
            return Os(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && Os(e), !1;
          }
        }
      })
    ];
  }
}), Lk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Ik(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Pk = new Ke("hexColorDecoration");
function pu(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Lk.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, d = l + a[0].length;
      if (d >= t && l <= n) {
        const u = a[0], m = Ik(u);
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
function Ok(e) {
  const t = pu(e, 0, e.content.size);
  return Xe.create(e, t);
}
const _k = Sc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new je({
        key: Pk,
        state: {
          init(e, { doc: t }) {
            return Ok(t);
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
              const i = pu(e.doc, s.from, s.to);
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
}), Be = new Ke("selectAllOccurrences");
function hc(e, t, n, r, o) {
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
function qt(e, t) {
  const n = Be.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function $k(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function $e(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Hk = ut.create({
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
        const c = hc(t.state.doc, o, s, i, a);
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
          const c = hc(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = $k(c, s), d = c[l];
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
              const c = qt(a, this.storage);
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
              const s = qt(o, this.storage);
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
      new je({
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
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), um(t.state, t.dispatch), setTimeout(() => {
                  const s = qt(t);
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
                return e.typedBuffer = o, e.isTypingReplace = !0, fm(t.state, t.dispatch), setTimeout(() => {
                  const s = qt(t);
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
                const r = qt(t);
                if (r.length === 0) {
                  $e(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Be, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = qt(t);
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
            const s = qt(t);
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
              const c = qt(t);
              e.ranges = c, c.length === 0 && $e(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function uo(e, t, n) {
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
function Wk() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function zk(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function Bk(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function Fk(e, t) {
  return t.includes(e.type);
}
function Uk(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function Yk(e, t, n) {
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
      const u = e.type === "image/png" || e.type === "image/gif", m = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, h = l.toDataURL(m, p), g = Bk(h, e.name);
      r({ dataUrl: h, file: g, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function jk(e, t, n) {
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
async function gc(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!Fk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = Wk();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const u = await Yk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = u.dataUrl, i = u.file, s = Math.min(u.width, 600);
    } else {
      o = await zk(e), i = e;
      const u = await Uk(o);
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
      return console.warn("Image upload failed, removing placeholder:", u), jk(t, o, e.name), n.onUploadError?.(`Upload failed: ${u instanceof Error ? u.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function yc(e) {
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
const Kk = ut.create({
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
      new je({
        key: new Ke("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = yc(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              gc(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = yc(i);
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
              gc(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function Vk({ containerRef: e, enabled: t = !0 }) {
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
  return Q(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", i), d.addEventListener("dragleave", a), d.addEventListener("dragover", c), d.addEventListener("drop", l), () => {
      d.removeEventListener("dragenter", i), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", c), d.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ f("div", { className: "image-drop-zone", children: /* @__PURE__ */ R("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ f("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ f(qf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ R("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ f("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ f("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function Gk({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = K(e), [c, l] = K(t), d = V(null), u = V(null);
  Q(() => {
    u.current?.focus(), u.current?.select();
  }, []), Q(() => {
    const y = (v) => {
      d.current && !d.current.contains(v.target) && s();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [s]), Q(() => {
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
  })(), g = /* @__PURE__ */ R(
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
        /* @__PURE__ */ R("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ f("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ f(Ot, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ R("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ R("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ f(fa, { className: "w-3.5 h-3.5" }),
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
          /* @__PURE__ */ R("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ R("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ f(Io, { className: "w-3.5 h-3.5" }),
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
        /* @__PURE__ */ R("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ f(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ f(Ln, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ R("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ f(
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
                onClick: m,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !i.trim(),
                children: [
                  /* @__PURE__ */ f(Kn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ f(Wt, { children: g });
}
function fo(e) {
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
function vc(e) {
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
function mo(e, t, n, r) {
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
        p.start > m && (o += fn(e.substring(m, p.start))), o += `<span class="${vc(p.type)}">${fn(p.content)}</span>`, m = p.end;
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
      p.start > m && (o += _s(e, m, p.start, null, a)), o += _s(e, p.start, p.end, vc(p.type), a), m = p.end;
    m < d && (o += _s(e, m, d, null, a)), c < s.length - 1 && (o += `
`), i = d + 1;
  }
  return o;
}
function _s(e, t, n, r, o) {
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
function qk({
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
    const C = fo(e);
    return mo(e, C, i, a);
  }), b = V(null), v = Rn(() => {
    if (e.length <= p) {
      const C = fo(e), E = mo(e, C, i, a);
      return b.current && (clearTimeout(b.current), b.current = null), E;
    }
    return null;
  }, [e, i, a]);
  Q(() => {
    if (e.length <= p) {
      const C = fo(e);
      y(mo(e, C, i, a));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const C = fo(e);
      y(mo(e, C, i, a)), b.current = null;
    }, h), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, i, a]);
  const w = v ?? g, M = Y(() => {
    const C = l.current, E = d.current, T = u.current;
    if (C) {
      const N = T?.parentElement, A = N ? N.clientHeight : 200;
      C.style.height = "auto";
      const P = Math.max(C.scrollHeight, A, 200);
      C.style.height = `${P}px`, E && (E.style.height = `${P}px`);
    }
  }, []);
  Q(() => {
    const C = l.current;
    if (!C) return;
    const E = (T) => {
      const N = C.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: A, scrollHeight: P, clientHeight: O } = N, H = A <= 0, B = A + O >= P - 1;
      (T.deltaY > 0 && !B || T.deltaY < 0 && !H) && (T.preventDefault(), N.scrollTop += T.deltaY);
    };
    return C.addEventListener("wheel", E, { passive: !1 }), () => C.removeEventListener("wheel", E);
  }, []);
  const x = Y(() => {
  }, []);
  Q(() => {
    M();
  }, [e, M]), Q(() => {
    o && l.current && l.current.focus();
  }, [o]), Q(() => {
    if (m.current && l.current) {
      const { start: C, end: E } = m.current;
      l.current.selectionStart = C, l.current.selectionEnd = E, m.current = null;
    }
  }, [e]);
  const k = Y((C) => {
    const E = C.target;
    m.current = {
      start: E.selectionStart,
      end: E.selectionEnd
    }, t(E.value);
  }, [t]), D = Y((C) => {
    const E = C.currentTarget, T = E.selectionStart, N = E.selectionEnd, A = E.value, P = T !== N;
    if (c) {
      if (C.key === "`" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(T, N), H = A.substring(0, T) + "`" + O + "`" + A.substring(N);
          m.current = { start: T + 1, end: N + 1 }, t(H);
        } else if (A[T] === "`")
          m.current = { start: T + 1, end: T + 1 }, t(A), E.selectionStart = E.selectionEnd = T + 1;
        else {
          const O = A.substring(0, T) + "``" + A.substring(N);
          m.current = { start: T + 1, end: T + 1 }, t(O);
        }
        return;
      }
      if (C.key === "*" && !C.ctrlKey && !C.metaKey) {
        if (A[T - 1] === "*" && A[T], P) {
          C.preventDefault();
          const B = A.substring(T, N), q = A.substring(0, T) + "*" + B + "*" + A.substring(N);
          m.current = { start: T + 1, end: N + 1 }, t(q);
          return;
        }
        if (A[T] === "*") {
          C.preventDefault(), m.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const H = A.substring(0, T) + "**" + A.substring(N);
        m.current = { start: T + 1, end: T + 1 }, t(H);
        return;
      }
      if (C.key === "_" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const H = A.substring(T, N), B = A.substring(0, T) + "_" + H + "_" + A.substring(N);
          m.current = { start: T + 1, end: N + 1 }, t(B);
          return;
        }
        if (A[T] === "_") {
          C.preventDefault(), m.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const O = A.substring(0, T) + "__" + A.substring(N);
        m.current = { start: T + 1, end: T + 1 }, t(O);
        return;
      }
      if (C.key === "~" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const H = A.substring(T, N), B = A.substring(0, T) + "~" + H + "~" + A.substring(N);
          m.current = { start: T + 1, end: N + 1 }, t(B);
          return;
        }
        if (A[T] === "~") {
          C.preventDefault(), m.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const O = A.substring(0, T) + "~~" + A.substring(N);
        m.current = { start: T + 1, end: T + 1 }, t(O);
        return;
      }
      if (C.key === "[" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(T, N), H = A.substring(0, T) + "[" + O + "]()" + A.substring(N);
          m.current = { start: N + 3, end: N + 3 }, t(H);
        } else {
          const O = A.substring(0, T) + "[]()" + A.substring(N);
          m.current = { start: T + 1, end: T + 1 }, t(O);
        }
        return;
      }
      if (C.key === "]" && !C.ctrlKey && !C.metaKey && A[T] === "]") {
        C.preventDefault(), m.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
        return;
      }
      if (C.key === ")" && !C.ctrlKey && !C.metaKey && A[T] === ")") {
        C.preventDefault(), m.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
        return;
      }
      if (C.key === "Backspace" && !P && T > 0) {
        const O = A[T - 1], H = A[T], B = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [q, I] of B)
          if (O === q && H === I) {
            C.preventDefault();
            const L = A.substring(0, T - 1) + A.substring(T + 1);
            m.current = { start: T - 1, end: T - 1 }, t(L);
            return;
          }
        if (O === "[" && A.substring(T, T + 3) === "]()") {
          C.preventDefault();
          const q = A.substring(0, T - 1) + A.substring(T + 3);
          m.current = { start: T - 1, end: T - 1 }, t(q);
          return;
        }
      }
    }
    if (C.key === "Tab")
      if (C.preventDefault(), C.shiftKey) {
        const O = A.substring(0, T), H = A.substring(T, N), B = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), U = O.substring(I), X = (U + H).split(`
`), G = X.map(($) => $.startsWith("  ") ? $.substring(2) : $.startsWith("	") ? $.substring(1) : $), Z = L + G.join(`
`) + B, te = (U + H).length - G.join(`
`).length;
        m.current = {
          start: Math.max(I, T - (X[0].length - G[0].length)),
          end: N - te
        }, t(Z);
      } else if (T === N) {
        const O = A.substring(0, T) + "  " + A.substring(N);
        m.current = { start: T + 2, end: T + 2 }, t(O);
      } else {
        const O = A.substring(0, T), H = A.substring(T, N), B = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), X = (O.substring(I) + H).split(`
`), G = X.map((te) => "  " + te), Z = L + G.join(`
`) + B;
        m.current = {
          start: T + 2,
          end: N + X.length * 2
        }, t(Z);
      }
  }, [t, c]);
  return /* @__PURE__ */ R("div", { ref: u, className: `syntax-highlighted-editor ${s}`, children: [
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
        onChange: k,
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
let bc = 0, sa = 0, hu = 0;
function Xk(e) {
  sa++, hu = e;
}
const Zk = jn(function({
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
  Q(() => {
    if (!t || !r) return;
    const D = () => {
      const C = performance.now();
      queueMicrotask(() => {
        const E = performance.now() - C;
        Xk(E);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), Q(() => {
    if (!t) return;
    let D = 0, C = performance.now(), E = 0;
    const T = (N) => {
      const A = N - l.current;
      if (l.current = N, c.current.push({ time: N, duration: A }), c.current.length > 120 && (c.current = c.current.slice(-120)), A > 16.67 && u.current++, D++, N - C >= 1e3) {
        E = D, D = 0, C = N;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((G, Z) => G + Z.duration, 0) / P.length : 0, H = P.length > 0 ? Math.max(...P.map((G) => G.duration)) : 0, B = performance.memory, q = B ? B.usedJSHeapSize / (1024 * 1024) : 0, I = B ? B.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, U = bc - m.current, X = sa - p.current;
        m.current = bc, p.current = sa, a({
          fps: E,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(H * 100) / 100,
          memoryUsed: Math.round(q * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: U,
          transactionCount: X,
          lastTransactionTime: Math.round(hu * 100) / 100,
          domNodes: L,
          longFrames: u.current
        }), g((G) => [...G.slice(1), E]), b((G) => [...G.slice(1), O]), u.current = 0;
      }
      d.current = requestAnimationFrame(T);
    };
    return d.current = requestAnimationFrame(T), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const v = Y(() => {
    n?.();
  }, [n]), w = Y(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const M = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", x = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", k = (D, C, E) => {
    const A = D.map((P, O) => {
      const H = O / (D.length - 1) * 120, B = 24 - Math.min(P, C) / C * 24;
      return `${H},${B}`;
    }).join(" ");
    return /* @__PURE__ */ f("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ f(
      "polyline",
      {
        points: A,
        fill: "none",
        stroke: E,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ R("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ R("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ R("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ f(Xf, { size: 14 }),
        /* @__PURE__ */ f("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ f("button", { onClick: w, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ f($c, { size: 12 }) : /* @__PURE__ */ f(Hc, { size: 12 }) }),
        /* @__PURE__ */ f("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ f(Ot, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ R("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ f("span", { className: "perf-value", style: { color: M(i.fps) }, children: i.fps })
        ] }),
        k(h, 70, M(i.fps))
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ R("span", { className: "perf-value", style: { color: x(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ f("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ R("span", { className: "perf-value-sub", style: { color: x(i.frameTimeMax) }, children: [
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
        k(y, 50, x(i.frameTime))
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: i.renderCount })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: i.transactionCount })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ f("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ R("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: i.domNodes.toLocaleString() })
        ] }),
        i.memoryTotal > 0 && /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Memory" }),
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
class Qk extends gf {
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
      return /* @__PURE__ */ f("div", { className: fe("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ R("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ f("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ f(Zf, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ R("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ f("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ f("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ R(
            Zt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ f(ka, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ R(
            Zt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ f(Ln, { className: "w-4 h-4" }),
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
              className: fe(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ f(Qt, { className: "w-3 h-3" }) : /* @__PURE__ */ f(Lc, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ R("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ R("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ f("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ R(He, { children: [
                    /* @__PURE__ */ f(Qf, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ f("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ R(He, { children: [
                    /* @__PURE__ */ f(Vn, { className: "w-3 h-3" }),
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
function Jk({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function e1(e, t) {
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
function t1(e) {
  const [t, n] = yf(e1, { status: "idle" }), r = V(null), o = Y(async (a, c, l, d, u) => {
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
const n1 = {
  SpellCheck: em,
  RefreshCw: Jf,
  Minimize2: Hc,
  Maximize2: $c,
  FileText: wa,
  MessageSquare: Wc,
  Sparkles: Lo
};
function r1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = K(""), [a, c] = K(!1), l = V(null), d = V(null), u = e.filter((y) => y.scope === t || y.scope === "both");
  Q(() => {
    const y = (v) => {
      l.current && !l.current.contains(v.target) && r();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [r]), Q(() => {
    const y = (b) => {
      b.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), Q(() => {
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
            /* @__PURE__ */ f("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ R("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ f(Wc, { size: 14, className: "text-muted-foreground shrink-0" }),
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
              const b = y.icon ? n1[y.icon] : Lo;
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
  return /* @__PURE__ */ f(Wt, { onMouseDown: (y) => y.preventDefault(), children: g });
}
function o1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = V(null), a = V(null), [c, l] = K(!1), [d, u] = K(0);
  Q(() => {
    if (i.current) {
      const x = new ResizeObserver((k) => {
        for (const D of k)
          u(D.contentRect.height);
      });
      return x.observe(i.current), () => x.disconnect();
    }
  }, []), Q(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), Q(() => {
    const x = (k) => {
      k.key === "Escape" && s();
    };
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [s]);
  const m = Rn(() => {
    const C = window.innerWidth, E = window.innerHeight;
    let T = t.selectionCenterX - 380 / 2;
    T + 380 > C - 8 && (T = C - 380 - 8), T < 8 && (T = 8);
    const N = E - t.selectionBottom - 8, A = t.selectionTop - 8, P = d || 200;
    let O, H = !1;
    return N >= P || N >= A ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, H = !0), O < 8 && (O = 8), O + P > E - 8 && (O = E - P - 8), { top: O, left: T, placedAbove: H };
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
                g && /* @__PURE__ */ f(_c, { size: 12, className: "animate-spin" }),
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
                  children: /* @__PURE__ */ f(Ot, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ f(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: b ? /* @__PURE__ */ f("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ R("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  g && /* @__PURE__ */ f("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ R("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || b) && /* @__PURE__ */ R(He, { children: [
                y && /* @__PURE__ */ R(He, { children: [
                  /* @__PURE__ */ f(
                    Nn,
                    {
                      icon: Hs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ f(
                    Nn,
                    {
                      icon: xa,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ f(
                    Nn,
                    {
                      icon: c ? Kn : Vn,
                      label: c ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ f(
                  Nn,
                  {
                    icon: ka,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ f("div", { className: "flex-1" }),
                /* @__PURE__ */ f(
                  Nn,
                  {
                    icon: Ot,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ R(He, { children: [
                /* @__PURE__ */ f("div", { className: "flex-1" }),
                /* @__PURE__ */ f(
                  Nn,
                  {
                    icon: Ot,
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
  return /* @__PURE__ */ f(Wt, { onMouseDown: (x) => x.preventDefault(), children: M });
}
function Nn({
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
        /* @__PURE__ */ f(e, { size: 12 }),
        /* @__PURE__ */ f("span", { children: t })
      ]
    }
  );
}
const gu = "paragon-editor-toc-width", s1 = 280, yu = 200, vu = 500;
function wc() {
  try {
    const e = localStorage.getItem(gu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= yu && t <= vu)
        return t;
    }
  } catch {
  }
  return s1;
}
function a1(e) {
  try {
    localStorage.setItem(gu, String(e));
  } catch {
  }
}
function i1(e, t, n) {
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
function c1(e) {
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
function xc(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const kc = jn(function({
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
  const [v, w] = K([]), [M, x] = K(null), [k, D] = K(n), [C, E] = K(/* @__PURE__ */ new Set()), [T, N] = K(() => {
    if (u) {
      const z = parseInt(u, 10);
      return isNaN(z) ? wc() : z;
    }
    return wc();
  }), A = V(null), P = V(null), O = V(!1), H = V(0), B = V(0);
  Q(() => {
    D(n);
  }, [n]);
  const q = Y((z) => {
    z.preventDefault(), z.stopPropagation(), O.current = !0, H.current = z.clientX, B.current = T, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [T]);
  Q(() => {
    const z = (ee) => {
      if (!O.current) return;
      const ge = m === "right" ? H.current - ee.clientX : ee.clientX - H.current, ye = Math.min(vu, Math.max(yu, B.current + ge));
      N(ye);
    }, j = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((ee) => (a1(ee), ee)));
    };
    return document.addEventListener("mousemove", z), document.addEventListener("mouseup", j), () => {
      document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", j);
    };
  }, [m]);
  const I = Y(() => {
    if (!t || t.isDestroyed) return;
    const z = i1(t, s, i);
    w(z), M && !z.find((j) => j.id === M) && x(null);
  }, [t, s, i, M]);
  Q(() => {
    if (!t) return;
    const z = () => {
      P.current && clearTimeout(P.current), P.current = setTimeout(() => I(), 300);
    };
    return I(), t.on("update", z), t.on("create", z), () => {
      t.off("update", z), t.off("create", z), P.current && clearTimeout(P.current);
    };
  }, [t, I]), Q(() => {
    if (!t || !c || !k || v.length === 0) return;
    const z = b?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!z) return;
    const j = () => {
      const ye = z.getBoundingClientRect();
      let Re = null;
      for (let We = v.length - 1; We >= 0; We--) {
        const rt = v[We], zt = xc(t, rt.pos);
        if (zt && zt.getBoundingClientRect().top - ye.top <= p + 10) {
          Re = rt.id;
          break;
        }
      }
      !Re && v.length > 0 && (Re = v[0].id), x(Re);
    };
    let ee;
    const ge = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(j);
    };
    return z.addEventListener("scroll", ge, { passive: !0 }), j(), () => {
      z.removeEventListener("scroll", ge), cancelAnimationFrame(ee);
    };
  }, [t, v, c, k, p, b]);
  const L = Y((z) => {
    if (!t || t.isDestroyed) return;
    const j = xc(t, z.pos);
    if (j) {
      const ee = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const ge = ee.getBoundingClientRect(), Re = j.getBoundingClientRect().top - ge.top + ee.scrollTop;
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
    const z = !k;
    D(z), r?.(z);
  }, [k, r]), X = Y((z) => {
    E((j) => {
      const ee = new Set(j);
      return ee.has(z) ? ee.delete(z) : ee.add(z), ee;
    });
  }, []), G = Y((z, j, ee = 0) => {
    if (g)
      return g(z, j, () => L(z));
    const ge = (z.level - s) * 14, ye = l && z.children && z.children.length > 0, Re = C.has(z.id);
    return /* @__PURE__ */ f(
      "div",
      {
        className: `toc-item ${j ? "toc-item-active" : ""} toc-level-${z.level}`,
        style: { paddingLeft: `${ge + 10}px` },
        children: /* @__PURE__ */ R(
          "button",
          {
            className: "toc-item-button",
            onClick: () => L(z),
            title: z.text,
            children: [
              ye && /* @__PURE__ */ f(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (We) => {
                    We.stopPropagation(), X(z.id);
                  },
                  children: /* @__PURE__ */ f("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: Re ? /* @__PURE__ */ f("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ f("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              a && /* @__PURE__ */ R("span", { className: "toc-level-indicator", children: [
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
  }, [g, L, l, s, a, C, X]), Z = Y((z, j = 0) => z.map((ee) => {
    const ge = M === ee.id, ye = C.has(ee.id), Re = ee.children && ee.children.length > 0;
    return /* @__PURE__ */ R("div", { children: [
      G(ee, ge, j),
      Re && !ye && /* @__PURE__ */ f("div", { className: "toc-children", children: Z(ee.children, j + 1) })
    ] }, ee.id);
  }), [M, C, G]), te = Y(() => v.map((z) => {
    const j = M === z.id;
    return G(z, j);
  }), [v, M, G]);
  if (!t) return null;
  const $ = l ? c1(v) : [];
  return /* @__PURE__ */ R(He, { children: [
    y && /* @__PURE__ */ f(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${m}`,
        onClick: U,
        title: k ? "Hide Table of Contents" : "Show Table of Contents",
        children: k ? /* @__PURE__ */ f(tm, { size: 16 }) : /* @__PURE__ */ f(nm, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(
      "div",
      {
        ref: A,
        className: `toc-sidebar ${k ? "toc-visible" : "toc-hidden"} toc-${m} ${d}`,
        style: { width: k ? `${T}px` : "0px" },
        children: [
          k && /* @__PURE__ */ f(
            "div",
            {
              className: `toc-resize-handle toc-resize-${m}`,
              onMouseDown: q
            }
          ),
          /* @__PURE__ */ R("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ f("div", { className: "toc-header", children: /* @__PURE__ */ f("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ f("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ R("div", { className: "toc-empty", children: [
              /* @__PURE__ */ f("p", { children: "No headings yet" }),
              /* @__PURE__ */ f("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ f("div", { className: "toc-list", children: l ? Z($) : te() }) })
          ] })
        ]
      }
    )
  ] });
});
let Pt = null, Do = null;
async function bu() {
  if (Pt) return Pt;
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
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const d = l.querySelector("img");
      if (!d) return c;
      const u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = d.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", w = g && g > 0;
      (v || w) && b.push(v ? y : "left"), w && b.push(String(g));
      const M = `![${b.join(" | ")}](${u})`, x = l.parentNode;
      return x && x.nodeName === "LI" ? `
` + M + `
` : `

` + M + `

`;
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
      return d ? `@${Fy(d)}@` : c;
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
      const d = l.previousElementSibling, u = d && (d.nodeName === "UL" || d.nodeName === "OL");
      return `

` + c.trim() + `

`;
    }
  }), Pt = n, n;
}
function l1() {
  !Do && !Pt && (Do = bu().then((e) => (Pt = e, e)));
}
function d1() {
  return l1(), {
    turndown(e) {
      return Pt ? Pt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return Pt !== null;
    },
    async ready() {
      Pt || (Do ? await Do : await bu());
    }
  };
}
function u1() {
  const e = V(null);
  return e.current || (e.current = d1()), e.current;
}
function f1(e) {
  const t = e.split(`
`), n = [], r = (a) => {
    const c = a.trimStart();
    return /^[-*+]\s+\[[ xX]\]\s/.test(c) ? "task" : /^[-*+]\s+/.test(c) ? "bullet" : /^\d+\.\s+/.test(c) ? "ordered" : null;
  }, o = (a) => /^\s{2,}\S/.test(a), s = (a) => a.trim() === "" || a.trim() === "​";
  let i = !1;
  for (let a = 0; a < t.length; a++) {
    const c = t[a];
    if (/^```/.test(c.trim())) {
      i = !i, n.push(c);
      continue;
    }
    if (i) {
      n.push(c);
      continue;
    }
    if (n.push(c), r(c) !== null || o(c)) {
      let l = a + 1;
      for (; l < t.length && o(t[l]); )
        l++;
      let d = 0;
      const u = l;
      for (; l < t.length && s(t[l]); )
        d++, l++;
      if (d > 0 && l < t.length) {
        const m = r(c), p = r(t[l]);
        if (m !== null && p !== null) {
          for (let h = u; h < l; h++)
            n.push(t[h]);
          n.push("<!-- list-break -->"), a = l - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function m1(e) {
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
            if (x.tagName === "UL" || x.tagName === "OL" || x.tagName === "P")
              w.push(M);
            else if (x.tagName === "IMG" || x.tagName === "FIGURE")
              if (x.tagName === "IMG") {
                const k = n.createElement("figure");
                k.className = "image-resizer";
                const D = x.getAttribute("data-align") || "left", C = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[D] || "margin-right: auto;";
                k.style.cssText = C, k.appendChild(x.cloneNode(!0)), w.push(k);
              } else
                w.push(M);
            else
              v.push(M);
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
function p1(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = Array.from(r.querySelectorAll("li"));
  for (const s of o) {
    if (s.getAttribute("data-type") === "taskItem" || !s.querySelector(":scope > img, :scope > p > img, :scope > figure")) continue;
    const a = Array.from(s.childNodes), c = [], l = [];
    if (a.forEach((d) => {
      if (d.nodeType === Node.ELEMENT_NODE) {
        const u = d, m = u.tagName;
        if (m === "UL" || m === "OL")
          l.push(d);
        else if (m === "FIGURE")
          l.push(d);
        else if (m === "IMG") {
          const p = n.createElement("figure");
          p.className = "image-resizer";
          const h = u.getAttribute("data-align") || "left", g = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = g[h] || "margin-right: auto;", p.appendChild(u.cloneNode(!0)), l.push(p);
        } else if (m === "P")
          if (u.querySelectorAll("img").length === 0)
            l.push(d);
          else {
            const h = Array.from(u.childNodes), g = [];
            if (h.forEach((y) => {
              if (y.nodeType === Node.ELEMENT_NODE && y.tagName === "IMG") {
                if (g.length > 0) {
                  const x = n.createElement("p");
                  g.forEach((k) => x.appendChild(k.cloneNode(!0))), x.textContent?.trim() && l.push(x), g.length = 0;
                }
                const b = y, v = n.createElement("figure");
                v.className = "image-resizer";
                const w = b.getAttribute("data-align") || "left", M = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = M[w] || "margin-right: auto;", v.appendChild(b.cloneNode(!0)), l.push(v);
              } else
                g.push(y);
            }), g.length > 0) {
              const y = n.createElement("p");
              g.forEach((b) => y.appendChild(b.cloneNode(!0))), y.textContent?.trim() && l.push(y);
            }
          }
        else
          c.push(d);
      } else
        c.push(d);
    }), s.innerHTML = "", c.length > 0 && c.some((u) => (u.textContent || "").trim().length > 0)) {
      const u = n.createElement("p");
      c.forEach((m) => u.appendChild(m)), s.appendChild(u);
    }
    l.forEach((d) => s.appendChild(d));
  }
  return r.innerHTML;
}
const h1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, lC = vf(function({
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
  resolveImageSrc: k,
  showModeToggle: D = !0,
  // New props
  initialMode: C = "wysiwyg",
  onModeChange: E,
  onReady: T,
  onFocus: N,
  onBlur: A,
  onSelectionChange: P,
  onDestroy: O,
  onSave: H,
  onRecover: B,
  onWikiLinkClick: q,
  validateWikiLink: I,
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
  headingLevels: ge = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ye = [1, 2, 3],
  // TOC props
  showTableOfContents: Re = !1,
  tocVisible: We = !0,
  onTocVisibilityChange: rt,
  tocTitle: zt = "",
  tocMinLevel: er = 1,
  tocMaxLevel: tr = 4,
  tocShowLevelIndicators: Or = !1,
  tocHighlightActive: _r = !0,
  tocTreeView: $r = !1,
  tocWidth: Hr = "240px",
  tocPosition: vn = "right",
  tocScrollOffset: nr = 20,
  onTocItemClick: bn,
  renderTocItem: wn,
  tocShowToggleButton: Wr = !0,
  // Raw markdown editor
  autoClosePairs: qo = !0,
  // Performance profiler
  showPerformanceProfiler: Xo = !1,
  onPerformanceProfilerClose: Zo,
  // Auto reorder checklist
  autoReorderChecklist: Qo = !1,
  // Expand selection
  progressiveSelectAll: zr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: Br = !1,
  enableHexColorHighlight: Jo = !1,
  enableCollapsibleHeadings: Fr = !1,
  // Performance mode
  performanceMode: rr = "auto",
  // Error boundary
  onEditorError: es,
  // AI writing assistant
  aiActions: ft,
  onAIAction: xn,
  onAISetupRequired: le
}, Me) {
  const [ae] = K(() => h1()), [be, Ve] = K(C), [ve, or] = K(""), qe = V(C), kt = V(""), Ct = V(null), [sr, Qa] = K(0), Ur = !!(ft && ft.length > 0 && xn), { state: Ze, executeAction: Yr, abort: ku, reset: Bt } = t1(xn), [ts, ns] = K(null), [Cu, Mu] = K({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), Su = V(xn);
  Su.current = xn;
  const Ja = V(le);
  Ja.current = le;
  const [Eu, Tu] = K([]), [Du, Nu] = K(0), Au = Y((W, F) => {
    Tu(W), Nu(F);
  }, []), rs = V(v), os = V(w), ss = V(M), as = V(x), is = V(k), ei = V(q), cs = V(I), ls = V(L);
  rs.current = v, os.current = w, ss.current = M, as.current = x, is.current = k, ei.current = q, cs.current = I, ls.current = L;
  const ti = 2e3, [Mt, Ru] = K(() => rr === "lightweight" ? !0 : rr === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > ti : !1), ds = V(0), ni = V(Mt);
  ni.current = Mt;
  const Lu = Rn(() => {
    const W = [
      Vu.configure({
        heading: {
          levels: ge
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
      Nm,
      Am,
      Im,
      Gu.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      qu.configure({
        types: ["heading", "paragraph"]
      }),
      Xu.configure({
        multicolor: !0
      }),
      Zu.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      df,
      uf,
      ff,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...Mt ? [] : [mf],
      dk,
      mk,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...Mt ? [] : [Hk],
      gk,
      // Add HorizontalRule back without its built-in input rules
      // We handle HR creation via our custom space shortcut handler
      mm.extend({
        addInputRules() {
          return [];
        }
      })
    ];
    return $.tables || W.push(
      Qu.configure({
        resizable: !ae,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Ju,
      wm,
      xm,
      ...Mt ? [] : [Dm]
    ), $.taskLists || W.push(
      Rm.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Lm.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !ae && !Mt && W.push(
      Om.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), $.codeBlocks || W.push(Hm), $.callouts || W.push(Ym, fk), Fr && !$.collapsibleHeadings && !Mt && W.push(
      ik.configure({
        levels: ye
      })
    ), $.images || W.push(
      jm.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (F) => {
          Kr({
            isOpen: !0,
            src: F.src,
            alt: F.alt,
            pos: F.pos,
            position: { x: F.rect.left + F.rect.width / 2, y: F.rect.bottom }
          });
        },
        resolveImageSrc: is.current ? ((...F) => is.current(...F)) : void 0
      }),
      Kk.configure({
        maxFileSize: b,
        onUploadStart: rs.current ? ((...F) => rs.current(...F)) : void 0,
        onUploadComplete: os.current ? ((...F) => os.current(...F)) : void 0,
        onUploadError: ss.current ? ((...F) => ss.current(...F)) : void 0,
        onImageUpload: as.current ? ((F, he) => as.current(F, he)) : void 0
      })
    ), $.datePills || W.push(
      Yy.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), $.tagPills || W.push(
      Vy.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: Br
      })
    ), $.wikiLinks || W.push(
      Zx.configure({
        onWikiLinkClick: (F) => {
          console.log("WikiLink clicked:", F), ei.current?.(F);
        },
        validateLink: (F) => cs.current ? cs.current(F) : !0
      })
    ), zr && W.push(Rk), Jo && !Mt && W.push(_k), $.markdownPaste || W.push(
      ok.configure({
        enableMarkdownPaste: !0
      })
    ), W;
  }, [s, ae, b, ge, ye, $, zr, Fr, Mt]), St = V(null), nn = V(n), rn = V(r), us = V(o), ar = V(null);
  nn.current = n, rn.current = r, us.current = o;
  const _ = ju({
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
      window.__tiptapEditor = W, T?.(W);
    },
    onDestroy: () => {
      O?.();
    },
    extensions: Lu,
    content: t,
    editable: i,
    autofocus: a,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: ee ? "true" : "false"
      },
      handleClick: (W, F, he) => {
        if (U) {
          const ke = he.target.closest("a");
          if (ke) {
            const Ee = ke.getAttribute("href");
            if (Ee && U(Ee, he) === !1)
              return he.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: W }) => {
      if (rr === "auto" && (ds.current++, ds.current >= 50)) {
        ds.current = 0;
        const he = W.state.doc.content.childCount > ti;
        he !== ni.current && Ru(he);
      }
      St.current && clearTimeout(St.current), St.current = setTimeout(() => {
        if (W.isDestroyed) return;
        const F = W.getHTML();
        (nn.current || rn.current) && (nn.current?.(F), rn.current?.(F));
      }, 150);
    },
    onFocus: () => {
      N?.();
    },
    onBlur: () => {
      if (St.current && (clearTimeout(St.current), St.current = null, _ && !_.isDestroyed)) {
        const W = _.getHTML();
        if ((nn.current || rn.current) && (nn.current?.(W), rn.current?.(W)), qe.current === "wysiwyg" && ar.current) {
          const F = ar.current.turndown(W);
          kt.current = F, us.current?.(F);
        }
      }
      A?.();
    },
    onSelectionUpdate: ({ editor: W }) => {
      if (P) {
        const { from: F, to: he, empty: de } = W.state.selection;
        P({ from: F, to: he, empty: de });
      }
    }
  });
  Q(() => () => {
    if (St.current && (clearTimeout(St.current), St.current = null, _ && !_.isDestroyed)) {
      const W = _.getHTML();
      if ((nn.current || rn.current) && (nn.current?.(W), rn.current?.(W)), qe.current === "wysiwyg" && ar.current) {
        const F = ar.current.turndown(W);
        kt.current = F, us.current?.(F);
      }
    }
  }, []);
  const [ri, jr] = K(!1), [kn, Kr] = K(null), [Iu, Pu] = K(!1), Ou = X !== void 0 ? X : Iu, Ft = Y((W) => {
    Pu(W), G?.(W);
  }, [G]), [_u, fs] = K(0), [$u, Hu] = K(""), Et = jx(_, {
    storageKey: p,
    debounceMs: h,
    enabled: m,
    onSave: (W) => {
      H?.(W);
    },
    onRecover: (W) => {
      B?.(W);
    }
  }), Ut = u1();
  ar.current = Ut;
  const oi = V(!1);
  Q(() => {
    if (!oi.current && C === "markdown" && _ && !_.isDestroyed && Ut) {
      const W = _.getHTML(), F = Ut.turndown(W);
      or(F), kt.current = F, oi.current = !0;
    }
  }, [_, Ut, C]);
  const mt = Y(async (W) => {
    if (_) {
      if (W === "markdown" && qe.current === "wysiwyg") {
        const F = _.getHTML(), he = Ut.turndown(F);
        or(he), kt.current = he;
      } else if (W === "wysiwyg" && qe.current === "markdown") {
        const { marked: F } = await import("./marked.esm-Tjr8Gfse.js"), he = ["info", "note", "prompt", "resources", "todo"];
        let de = kt.current;
        de = f1(de), he.forEach((ie) => {
          const se = new RegExp(`\`\`\`ad-${ie}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          de = de.replace(se, (we, ue) => {
            const Te = F.parse(ue.trim(), { async: !1 });
            return `<div data-callout="" data-type="${ie}" class="callout callout-${ie}">${Te}</div>`;
          });
        }), he.forEach((ie) => {
          const se = new RegExp(`\`\`\`${ie}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          de = de.replace(se, (we, ue) => {
            const Te = F.parse(ue.trim(), { async: !1 });
            return `<div data-callout="" data-type="${ie}" class="callout callout-${ie}">${Te}</div>`;
          });
        }), de = de.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (ie, se, we) => {
          const ue = se.split("|").map((Tt) => Tt.trim());
          let Te = "", ze = "left", Le = null;
          ue.length === 1 ? Te = ue[0] : ue.length === 2 ? (Te = ue[0], /^\d+$/.test(ue[1]) ? Le = ue[1] : ["left", "center", "right"].includes(ue[1]) ? ze = ue[1] : Te = se) : ue.length === 3 ? (Te = ue[0], ["left", "center", "right"].includes(ue[1]) && (ze = ue[1]), /^\d+$/.test(ue[2]) && (Le = ue[2])) : Te = se;
          const De = Le ? ` width="${Le}" style="width: ${Le}px"` : "", jt = ` data-align="${ze}"`;
          return `<img src="${we.trim()}" alt="${Te}"${jt}${De} />`;
        }), de = de.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), de = de.replace(/@([^@\n]+)@/g, (ie, se) => {
          const we = ln(se);
          if (we) {
            const ue = Ra(we);
            return `<span data-type="date-pill" data-date="${we}" class="date-pill ${ue}"><span class="date-icon">📅</span><span class="date-text">${se.trim()}</span></span>`;
          }
          return ie;
        }), Br && !$.tagPills && (de = de.replace(new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"), (ie, se) => {
          const we = vr(se);
          return An(we) ? `<span data-type="tag-pill" data-tag="${we}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${we}</span></span>` : ie;
        })), de = de.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((ie, se) => se % 2 === 1 ? ie : ie.replace(/\[\[([^\[\]]+)\]\]/g, (we, ue) => `<span data-wiki-link data-page-name="${ue.trim()}" class="wiki-link">${ue.trim()}</span>`)).join("");
        let Ee = F.parse(de, { async: !1 });
        Ee = Ee.replace(
          /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
          '<p class="list-separator" data-list-separator="true">​</p>'
        ), Ee = m1(Ee), Ee = p1(Ee), Ee = Ee.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (ie, se) => se.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (we) => we.replace(/<tr>([\s\S]*?)<\/tr>/gi, (ue, Te) => `<tr>${Te.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
        const ce = (ie) => {
          let se = ie;
          return se = se.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), se = se.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), se = se.replace(/~~(.+?)~~/g, "<s>$1</s>"), se = se.replace(/`([^`]+)`/g, "<code>$1</code>"), se = se.replace(/==(.+?)==/g, "<mark>$1</mark>"), se = se.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), se;
        }, Se = (ie) => {
          const se = ie.match(/data-align="([^"]*)"/), we = se ? se[1] : "left";
          return `<figure class="image-resizer" style="${{
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          }[we] || "margin-right: auto;"}">${ie.trim()}</figure>`;
        }, Yt = (ie) => {
          if (/<img\s/i.test(ie)) {
            const se = /(<img\s[^>]*\/?>)/gi;
            return ie.split(se).filter((ue) => ue.trim()).map((ue) => /^<img\s/i.test(ue) ? Se(ue) : ue.trim() ? `<p>${ce(ue.trim())}</p>` : "").join("");
          }
          if (/^!\[/.test(ie)) {
            const se = ie.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (se)
              return `<figure class="image-resizer" style="margin-right: auto;"><img src="${se[2]}" alt="${se[1]}" data-align="left" /></figure>`;
          }
          return `<p>${ce(ie)}</p>`;
        }, ir = (ie) => {
          const se = ie.match(/^( *)/), we = se ? se[1].length : 0, ue = Math.floor(we / 2), Te = ie.trimStart(), ze = Te.match(/^-\s*\[(x| )\]\s*(.*)$/);
          if (ze)
            return { type: "task", depth: ue, text: ze[2].trim(), checked: ze[1] === "x" };
          const Le = Te.match(/^-\s+(.+)$/);
          if (Le)
            return { type: "ul", depth: ue, text: Le[1].trim() };
          const De = Te.match(/^(\d+)\.\s+(.+)$/);
          return De ? { type: "ol", depth: ue, text: De[2].trim(), index: parseInt(De[1], 10) } : null;
        }, Vr = (ie) => {
          if (ie.length === 0) return "";
          const se = (Te, ze) => {
            let Le = "", De = Te;
            const jt = ie[De]?.type || "ul", Tt = jt === "task", Kt = Tt ? '<ul data-type="taskList">' : `<${jt === "ol" ? "ol" : "ul"}>`, cr = Tt ? "</ul>" : `</${jt === "ol" ? "ol" : "ul"}>`;
            for (Le += Kt; De < ie.length && ie[De].depth >= ze; ) {
              const Dt = ie[De];
              if (Dt.depth === ze) {
                if (Tt ? Le += `<li data-type="taskItem" data-checked="${Dt.checked || !1}"><p>${ce(Dt.text)}</p>` : Le += `<li><p>${ce(Dt.text)}</p>`, De + 1 < ie.length && ie[De + 1].depth > ze) {
                  const sn = se(De + 1, ie[De + 1].depth);
                  Le += sn.html, De = sn.nextIdx;
                } else
                  De++;
                Le += "</li>";
              } else
                De++;
            }
            return Le += cr, { html: Le, nextIdx: De };
          }, we = Math.min(...ie.map((Te) => Te.depth));
          return se(0, we).html;
        };
        Ee = Ee.replace(
          /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
          (ie, se, we, ue) => {
            const Te = /<img\s/i.test(we), ze = /<br\s*\/?>/i.test(we), Le = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(we);
            if (!Te && !ze && !Le) return ie;
            let De = we.trim();
            De = De.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
            const jt = De.split(/<br\s*\/?>/i).filter((Dt) => Dt.trim());
            if (jt.length <= 1 && !Le)
              return Te ? `${se}${Yt(De)}${ue}` : ie;
            const Tt = [];
            let Kt = [];
            const cr = () => {
              Kt.length !== 0 && (Tt.push(Vr(Kt)), Kt = []);
            };
            for (const Dt of jt) {
              const sn = ir(Dt);
              if (sn) {
                if (Kt.length > 0) {
                  const Yu = Kt[0].type;
                  sn.depth === 0 && sn.type !== Yu && cr();
                }
                Kt.push(sn);
              } else
                cr(), Tt.push(Yt(Dt.trim()));
            }
            return cr(), `${se}${Tt.join("")}${ue}`;
          }
        ), queueMicrotask(() => {
          _.isDestroyed || _.commands.setContent(Ee);
        });
      }
      Ve(W), qe.current = W, E?.(W);
    }
  }, [_, Ut, E]), si = Y((W) => {
    or(W), kt.current = W, o?.(W);
  }, [o]), on = Vx(_, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: d
  });
  bf(Me, () => ({
    getEditor: () => _,
    getHTML: () => _?.getHTML() || "",
    getMarkdown: () => _ ? Ut.turndown(_.getHTML()) : "",
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
    setMode: (W) => mt(W),
    toggleMode: () => {
      const W = qe.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return mt(W), W;
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
      _ && uo(_, _.state.selection.from, _.state.selection.from);
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
      Ft(!0), fs((W) => W + 1);
    },
    closeFindReplace: () => Ft(!1),
    save: () => Et.save(),
    clearSavedContent: () => Et.clear(),
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
      return _.state.doc.descendants((F, he) => {
        if (F.type.name === "heading") {
          const de = F.attrs.level, ke = F.textContent.trim();
          ke && W.push({ id: `toc-heading-${he}`, text: ke, level: de, pos: he });
        }
      }), W;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (W) => {
      if (!(!_ || _.isDestroyed))
        try {
          const F = _.state.doc.resolve(W), he = _.view.nodeDOM(F.before(F.depth + 1));
          if (he instanceof HTMLElement) {
            const de = _.view.dom.closest(".editor-content-wrapper");
            if (de) {
              const ke = de.getBoundingClientRect(), ce = he.getBoundingClientRect().top - ke.top + de.scrollTop;
              de.scrollTo({ top: ce - 20, behavior: "smooth" });
            } else
              he.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          _.commands.setTextSelection(W + 1);
        } catch {
        }
    }
  }), [_, Ut, mt, on, Et, Ft]), Q(() => {
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
        mt(F);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const F = qe.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return mt(F), F;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        mt("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        mt("markdown");
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
        const he = (de) => {
          F(de.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", he), () => window.removeEventListener("paragon-editor-mode-change", he);
      }
    };
    return window.__paragonEditorModeAPI = W, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [mt]), Q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: be } }));
  }, [be]), Q(() => {
    if (!_ || _.isDestroyed) return;
    const W = (F) => {
      if (_.isDestroyed) return;
      const he = F.key;
      if (!(!(F.metaKey || F.ctrlKey) && he !== " ")) {
        if ((F.metaKey || F.ctrlKey) && F.key === "k") {
          F.preventDefault(), jr(!0);
          return;
        }
        if (!ae && (F.metaKey || F.ctrlKey) && F.key === "f") {
          if (F.preventDefault(), _) {
            const { state: ke } = _, { from: Ee, to: ce } = ke.selection;
            if (Ee !== ce) {
              const Se = ke.doc.textBetween(Ee, ce, " ");
              Se.trim() && Hu(Se.trim());
            }
          }
          Ft(!0), fs((ke) => ke + 1);
          return;
        }
        if (!ae && (F.metaKey || F.ctrlKey) && F.key === "h") {
          F.preventDefault(), Ft(!0);
          return;
        }
        if (F.key === " ")
          try {
            const { state: ke } = _, { selection: Ee } = ke, { $from: ce } = Ee, Se = ce.nodeBefore?.textContent || "";
            if (Se === "#####") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 5, to: ce.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (Se === "####") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 4, to: ce.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (Se === "###") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 3, to: ce.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (Se === "##") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 2, to: ce.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (Se === "#") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (Se === "-" || Se === "*") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(Se)) {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - Se.length, to: ce.pos }).toggleOrderedList().run();
              return;
            }
            const Yt = /^(-\s*)?\[([ x])?\]$/.exec(Se);
            if (Yt) {
              F.preventDefault();
              const ir = Yt[2] === "x", Vr = ke.schema.nodes.taskList, ie = ke.schema.nodes.taskItem;
              if (Vr && ie) {
                const se = ke.tr, we = ce.pos - Se.length, ue = ce.pos;
                se.delete(we, ue);
                const ze = se.doc.resolve(we).blockRange();
                if (ze) {
                  const Le = [
                    { type: Vr, attrs: {} },
                    { type: ie, attrs: { checked: ir } }
                  ];
                  se.wrap(ze, Le), _.view.dispatch(se);
                  return;
                }
              }
              _.chain().focus().deleteRange({ from: ce.pos - Se.length, to: ce.pos }).toggleTaskList().run();
              return;
            }
            if (Se === ">") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).toggleBlockquote().run();
              return;
            }
            if (Se === "```") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 3, to: ce.pos }).toggleCodeBlock().run();
              return;
            }
            if (Se === "---" || Se === "***") {
              F.preventDefault(), uo(_, ce.pos - 3, ce.pos);
              return;
            }
            if (Se === "—-") {
              F.preventDefault(), uo(_, ce.pos - 2, ce.pos);
              return;
            }
            if (Se === "—") {
              F.preventDefault(), uo(_, ce.pos - 1, ce.pos);
              return;
            }
          } catch (ke) {
            console.warn("Space shortcut error:", ke);
          }
      }
    };
    return document.addEventListener("keydown", W, !0), () => document.removeEventListener("keydown", W, !0);
  }, [_, ae, Ft]);
  const ai = Y((W, F) => {
    if (!Ur) {
      Ja.current?.();
      return;
    }
    if (!_) return;
    let he = { top: 0, left: 0 };
    if (F) {
      const de = F.getBoundingClientRect();
      he = { top: de.bottom + 4, left: de.left };
    } else {
      const { from: de, to: ke } = _.state.selection, Ee = _.view.coordsAtPos(de), ce = _.view.coordsAtPos(ke);
      he = { top: ce.bottom + 8, left: (Ee.left + ce.left) / 2 };
    }
    ns({ scope: W, position: he });
  }, [Ur, _]), Wu = Y((W, F) => {
    if (!_ || !ft) return;
    const he = ft.find((ir) => ir.id === W);
    if (!he) return;
    const { from: de, to: ke } = _.state.selection, Ee = de !== ke ? _.state.doc.textBetween(de, ke, `
`) : "", ce = he.scope === "document" || !Ee ? _.getText() : Ee, Se = _.view.coordsAtPos(de), Yt = _.view.coordsAtPos(ke);
    Mu({
      selectionTop: Se.top,
      selectionBottom: Yt.bottom,
      selectionCenterX: (Se.left + Yt.right) / 2
    }), ns(null), Yr(W, he.label, ce, { from: de, to: ke }, F);
  }, [_, ft, Yr]), zu = Y(() => {
    if (!_ || Ze.status !== "complete") return;
    const { selectionRange: W, result: F } = Ze;
    _.chain().focus().setTextSelection(W).deleteSelection().insertContent(F).run(), Bt();
  }, [_, Ze, Bt]), Bu = Y(() => {
    if (!_ || Ze.status !== "complete") return;
    const { selectionRange: W, result: F } = Ze;
    _.chain().focus().setTextSelection(W.to).insertContent(`
` + F).run(), Bt();
  }, [_, Ze, Bt]), Fu = Y(() => {
    if (!(Ze.status !== "complete" && Ze.status !== "error"))
      if (Ze.status === "complete") {
        const { action: W, actionLabel: F, inputText: he, selectionRange: de } = Ze;
        Bt(), Yr(W, F, he, de);
      } else
        Bt();
  }, [Ze, Bt, Yr]);
  if (!_)
    return /* @__PURE__ */ f("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: /* @__PURE__ */ R("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const ii = /* @__PURE__ */ f(
    Wx,
    {
      editor: _,
      onOpenLinkPopover: () => jr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Ft(!0), fs((W) => W + 1);
      },
      disabledFeatures: $,
      autoReorderChecklist: Qo,
      aiEnabled: Ur || !!le,
      onAISparklesClick: (W) => ai("document", W)
    }
  ), ci = /* @__PURE__ */ R("div", { className: "editor-footer", children: [
    m && /* @__PURE__ */ f(
      Gx,
      {
        status: Et.status,
        lastSaved: Et.lastSaved
      }
    ),
    /* @__PURE__ */ f("div", { className: "word-count", children: /* @__PURE__ */ R("span", { children: [
      on.words,
      " words"
    ] }) })
  ] }), Uu = {
    minHeight: z,
    ...j && { maxHeight: j, overflowY: "auto" }
  };
  return /* @__PURE__ */ R("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: [
    m && g && Et.hasRecoverableContent && /* @__PURE__ */ f(
      qx,
      {
        onRecover: () => {
          Et.recover();
        },
        onDismiss: Et.dismissRecovery
      }
    ),
    l && /* @__PURE__ */ R("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z(_, ii) : ii,
      D && /* @__PURE__ */ R("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => mt("wysiwyg"),
            className: `editor-mode-toggle-btn ${be === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ f(rm, {})
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => mt("markdown"),
            className: `editor-mode-toggle-btn ${be === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ f(wa, {})
          }
        )
      ] })
    ] }),
    !ae && /* @__PURE__ */ f(
      zx,
      {
        editor: _,
        isOpen: Ou,
        onClose: () => Ft(!1),
        focusTrigger: _u,
        initialSearchQuery: $u,
        editorMode: be,
        rawMarkdown: ve,
        onRawMarkdownChange: si,
        onMatchesChange: Au
      }
    ),
    /* @__PURE__ */ f(Ux, { editor: _ }),
    /* @__PURE__ */ R("div", { className: `editor-main-area ${Re ? "editor-with-toc" : ""}`, children: [
      Re && vn === "left" && /* @__PURE__ */ f(
        kc,
        {
          editor: _,
          visible: We,
          onVisibilityChange: rt,
          title: zt,
          minLevel: er,
          maxLevel: tr,
          showLevelIndicators: Or,
          highlightActive: _r,
          treeView: $r,
          width: Hr,
          position: vn,
          scrollOffset: nr,
          onItemClick: bn,
          renderItem: wn,
          showToggleButton: Wr,
          scrollContainerRef: Ct
        }
      ),
      /* @__PURE__ */ R(
        Qk,
        {
          resetKey: `${t}-${sr}`,
          onRetry: () => Qa((W) => W + 1),
          onClearContent: () => {
            _ && _.commands.clearContent(), n?.(""), r?.(""), o?.(""), Qa((W) => W + 1);
          },
          onError: es,
          children: [
            /* @__PURE__ */ f("div", { className: "editor-content-wrapper", ref: Ct, style: Uu, children: be === "wysiwyg" ? /* @__PURE__ */ R(He, { children: [
              /* @__PURE__ */ f(Ku, { editor: _, className: "editor-content" }),
              !$.images && !$.dragAndDrop && /* @__PURE__ */ f(Vk, { containerRef: Ct, enabled: i }),
              !ae && y && /* @__PURE__ */ f(Fm, { editor: _, suppressWhenLinkPopoverOpen: ri, aiEnabled: Ur || !!le, onAISparklesClick: (W) => ai("selection", W) }),
              ts && ft && /* @__PURE__ */ f(
                r1,
                {
                  actions: ft,
                  scope: ts.scope,
                  position: ts.position,
                  onAction: Wu,
                  onClose: () => ns(null)
                }
              ),
              Ze.status !== "idle" && /* @__PURE__ */ f(
                o1,
                {
                  state: Ze,
                  position: Cu,
                  onReplace: zu,
                  onInsert: Bu,
                  onRetry: Fu,
                  onDiscard: () => {
                    ku(), Bt();
                  }
                }
              ),
              !$.slashCommands && /* @__PURE__ */ f(Jy, { editor: _, disabledFeatures: $ }),
              !$.wikiLinks && ls.current && /* @__PURE__ */ f(
                ov,
                {
                  editor: _,
                  onSearch: ls.current
                }
              ),
              /* @__PURE__ */ f(
                Wm,
                {
                  editor: _,
                  isOpen: ri,
                  onClose: () => jr(!1)
                }
              ),
              !ae && /* @__PURE__ */ f(
                zm,
                {
                  editor: _,
                  onEditLink: () => jr(!0)
                }
              ),
              !$.images && kn?.isOpen && /* @__PURE__ */ f(
                Gk,
                {
                  src: kn.src,
                  alt: kn.alt,
                  position: kn.position,
                  onSave: (W, F) => {
                    _.chain().focus().setNodeSelection(kn.pos).updateAttributes("resizableImage", {
                      src: W,
                      alt: F
                    }).run(), Kr(null);
                  },
                  onDelete: () => {
                    _.chain().focus().setNodeSelection(kn.pos).deleteSelection().run(), Kr(null);
                  },
                  onClose: () => Kr(null)
                }
              )
            ] }) : /* @__PURE__ */ f(
              qk,
              {
                content: ve,
                onChange: si,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: Eu,
                currentMatchIndex: Du,
                autoClosePairs: qo
              }
            ) }),
            /* @__PURE__ */ f(Jk, { scrollContainerRef: Ct })
          ]
        }
      ),
      Re && vn === "right" && /* @__PURE__ */ f(
        kc,
        {
          editor: _,
          visible: We,
          onVisibilityChange: rt,
          title: zt,
          minLevel: er,
          maxLevel: tr,
          showLevelIndicators: Or,
          highlightActive: _r,
          treeView: $r,
          width: Hr,
          position: vn,
          scrollOffset: nr,
          onItemClick: bn,
          renderItem: wn,
          showToggleButton: Wr,
          scrollContainerRef: Ct
        }
      )
    ] }),
    d && (te ? te(
      { words: on.words, characters: on.characters },
      Et.status,
      ci
    ) : ci),
    /* @__PURE__ */ f(Zk, { visible: Xo, onClose: Zo, editor: _ })
  ] });
}), dC = Ao.create({
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
      Yn(this.options.HTMLAttributes, t, {
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
}, g1 = {
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
}, y1 = {
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
}, v1 = {
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
}, hr = {
  dark: wu,
  light: g1,
  sepia: y1,
  nord: v1
};
function b1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function uC(e, t, n, r) {
  const o = hr[e] || wu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const xu = Ec(null);
function fC({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = K(t), s = hr[r] || hr.dark, i = Y((c) => {
    hr[c] && o(c);
  }, []);
  Q(() => {
    n?.current && b1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(hr)
  };
  return /* @__PURE__ */ f(xu.Provider, { value: a, children: e });
}
function mC() {
  const e = Tc(xu);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const Cc = [
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
function pC({ node: e, updateAttributes: t }) {
  const [n, r] = K(!1), o = e.attrs.language || "plaintext";
  Cc.find((i) => i.value === o)?.label;
  const s = Y(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ R(zn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ f(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: Cc.map(({ value: i, label: a }) => /* @__PURE__ */ f("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ f(Qt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ f(Kn, { size: 14 }) : /* @__PURE__ */ f(Vn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("pre", { className: "code-block-pre", children: /* @__PURE__ */ f("code", { children: /* @__PURE__ */ f(aa, {}) }) })
  ] });
}
export {
  Gx as AutoSaveIndicator,
  dC as Callout,
  fk as CalloutInputRule,
  pC as CodeBlockComponent,
  ik as CollapsibleHeading,
  Om as CollapsibleList,
  Yy as DatePill,
  fC as EditorThemeProvider,
  Wx as EditorToolbar,
  zx as FindReplace,
  Fm as FloatingToolbar,
  Vk as ImageDropZone,
  Kk as ImageUpload,
  lC as MarkdownEditor,
  dk as MarkdownLinkInputRule,
  ok as MarkdownPasteSafe,
  Nm as MixedBulletList,
  Im as MixedListItem,
  Am as MixedOrderedList,
  Lm as MixedTaskItem,
  Rm as MixedTaskList,
  qx as RecoveryBanner,
  jm as ResizableImage,
  mk as SearchHighlight,
  Ux as SelectAllActionBar,
  Hk as SelectAllOccurrences,
  Jy as SlashCommands,
  gk as TabIndent,
  kc as TableOfContents,
  Vy as TagPill,
  Zx as WikiLinkSafe,
  b1 as applyTheme,
  uC as createCustomTheme,
  wu as darkTheme,
  Ra as getDateVariant,
  An as isValidTag,
  g1 as lightTheme,
  _m as loadLanguageIfNeeded,
  Ae as lowlight,
  v1 as nordTheme,
  vr as normalizeTag,
  ln as parseDateFromMarkdown,
  y1 as sepiaTheme,
  hr as themes,
  jx as useAutoSave,
  mC as useEditorTheme,
  Vx as useWordCount
};
//# sourceMappingURL=paragon.js.map
