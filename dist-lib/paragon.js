import { jsxs as R, jsx as m, Fragment as Ae } from "react/jsx-runtime";
import { ReactNodeViewRenderer as bo, NodeViewWrapper as An, NodeViewContent as Xs, useEditorState as gc, useEditor as Hu, EditorContent as Wu } from "@tiptap/react";
import zu from "@tiptap/starter-kit";
import Bu from "@tiptap/extension-placeholder";
import Fu from "@tiptap/extension-text-align";
import Uu from "@tiptap/extension-highlight";
import Yu from "@tiptap/extension-link";
import { Table as ju } from "@tiptap/extension-table";
import Vu from "@tiptap/extension-table-row";
import Ku from "@tiptap/extension-table-cell";
import Gu from "@tiptap/extension-table-header";
import { Plugin as $e, PluginKey as He, TextSelection as dt, AllSelection as qu } from "@tiptap/pm/state";
import { DecorationSet as Ue, Decoration as Ze } from "@tiptap/pm/view";
import { Extension as rt, Node as wo, mergeAttributes as Pn, InputRule as Fe, Mark as yc } from "@tiptap/core";
import Xu from "@tiptap/extension-bullet-list";
import Zu from "@tiptap/extension-ordered-list";
import Qu from "@tiptap/extension-list-item";
import Ju from "@tiptap/extension-task-list";
import ef from "@tiptap/extension-task-item";
import { findWrapping as ei, canJoin as tf } from "@tiptap/pm/transform";
import nf from "@tiptap/extension-underline";
import rf from "@tiptap/extension-subscript";
import of from "@tiptap/extension-superscript";
import sf from "@tiptap/extension-typography";
import af from "@tiptap/extension-code-block-lowlight";
import { createLowlight as cf } from "lowlight";
import * as M from "react";
import J, { useState as V, useRef as K, useEffect as Q, useCallback as Y, memo as On, createContext as vc, useContext as bc, useLayoutEffect as xo, useMemo as xn, Component as lf, useReducer as df, forwardRef as uf, useImperativeHandle as ff } from "react";
import { ChevronDown as Ut, Check as _n, Copy as $n, Link2 as Zs, ExternalLink as mf, Pencil as pf, Unlink as hf, Bold as Qs, Italic as Js, Underline as ea, Strikethrough as ta, Code as wc, Highlighter as xc, Link as na, Quote as ra, List as oa, ListOrdered as sa, CheckSquare as aa, FileCode as gf, Sparkles as ko, ListTodo as ia, BookOpen as ca, MessageSquareText as kc, StickyNote as Cc, Info as ao, ChevronRight as Mc, ChevronLeftIcon as yf, ChevronRightIcon as vf, ChevronDownIcon as bf, Calendar as Sc, Hash as ti, Image as la, X as Dt, Type as Co, Heading1 as wf, Heading2 as xf, Heading3 as kf, Heading4 as Cf, Heading5 as Mf, Code2 as Tc, Table as Es, Minus as Ec, FileText as da, Plus as ua, Undo as Sf, Redo as Tf, IndentIncrease as Ef, IndentDecrease as Df, PenLine as Nf, Library as Af, Columns as ni, Trash2 as kn, Rows as ri, ToggleLeft as oi, ArrowUpDown as Rf, Search as Lf, ChevronUp as If, MousePointerClick as Pf, CaseSensitive as Of, WholeWord as _f, Regex as $f, Replace as Ds, ReplaceAll as Hf, Cloud as Wf, Loader2 as Dc, CloudOff as zf, AlertCircle as Bf, RotateCcw as fa, ImagePlus as Ff, Activity as Uf, Maximize2 as Nc, Minimize2 as Ac, AlertTriangle as Yf, CheckCircle2 as jf, MessageSquare as Rc, RefreshCw as Vf, SpellCheck as Kf, PanelRightClose as Gf, PanelRightOpen as qf, Eye as Xf } from "lucide-react";
import ma from "highlight.js/lib/languages/javascript";
import pa from "highlight.js/lib/languages/typescript";
import Lc from "highlight.js/lib/languages/python";
import ha from "highlight.js/lib/languages/xml";
import Zf from "highlight.js/lib/languages/css";
import Qf from "highlight.js/lib/languages/json";
import Mo from "highlight.js/lib/languages/bash";
import * as Ic from "react-dom";
import Jf, { createPortal as em } from "react-dom";
import tm from "@tiptap/extension-image";
import { createRoot as nm } from "react-dom/client";
import { Fragment as rm } from "@tiptap/pm/model";
import { liftListItem as si, sinkListItem as ai } from "@tiptap/pm/schema-list";
import { undo as om, redo as sm } from "@tiptap/pm/history";
import am from "@tiptap/extension-horizontal-rule";
const im = new He("tableCellMenu");
let ii = !1, $r = null;
function cm() {
  ii || (ii = !0, document.addEventListener("mouseover", (e) => {
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
function lm(e) {
  return cm(), new $e({
    key: im,
    state: {
      init() {
        return Ue.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && $r ? $r.map(t.mapping, t.doc) : ($r = dm(o.doc, e), $r);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function dm(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = Ze.widget(o + 1, (i) => {
        const a = document.createElement("div");
        a.className = "table-cell-menu-wrapper ProseMirror-widget", a.setAttribute("contenteditable", "false"), a.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const c = document.createElement("button");
        c.className = "table-cell-menu-btn", c.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', c.title = "Table options", c.type = "button";
        const l = document.documentElement.classList.contains("dark"), d = l ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", u = l ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", f = l ? "#999" : "#666", p = l ? "#2a2a2a" : "#f5f5f5";
        return c.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + d + ";border:1px solid " + u + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + f + ";pointer-events:auto;padding:0;", c.addEventListener("mouseenter", () => {
          c.style.opacity = "1", c.style.background = p, c.style.transform = "scale(1.05)";
        }), c.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), c.style.background = d, c.style.transform = "scale(1)";
        }), c.addEventListener("click", (g) => {
          g.preventDefault(), g.stopPropagation();
          const h = c.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), um(g, t, o, h);
        }), a.appendChild(c), a;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), Ue.create(e, n);
}
function um(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const i = 170, a = 280;
  let c = Math.max(0, Math.min(r.top, window.innerHeight)), l = Math.max(0, Math.min(r.bottom, window.innerHeight)), d = Math.max(0, Math.min(r.left, window.innerWidth)), u = l + 4, f = d - i + r.width + 8;
  f + i > window.innerWidth - 12 && (f = window.innerWidth - i - 12), f < 12 && (f = 12), u + a > window.innerHeight - 12 && (u = c - a - 4), u < 12 && (u = 12), u + a > window.innerHeight - 12 && (u = window.innerHeight - a - 12);
  const p = document.documentElement.classList.contains("dark"), g = p ? "#1f1f1f" : "#ffffff", h = p ? "#3a3a3a" : "#e5e5e5", y = p ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + u + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + g + ";border:1px solid " + h + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + y + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const b = t.state.doc.resolve(n);
  let v = !1;
  for (let N = b.depth; N >= 0; N--)
    if (b.node(N).type.name === "table") {
      b.node(N).firstChild?.firstChild?.type.name === "tableHeader" && (v = !0);
      break;
    }
  const x = [
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
    { label: "Copy Table", icon: "copy", action: () => fm(t) }
  ], T = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, w = p ? "#2a2a2a" : "#f5f5f5", k = p ? "#ff6b6b" : "#dc2626", D = p ? "#999999" : "#666666", C = p ? "#333333" : "#e5e5e5";
  x.forEach((N) => {
    if (N.label === "divider") {
      const A = document.createElement("div");
      A.style.cssText = "height:1px;background:" + C + ";margin:4px 0;", s.appendChild(A);
    } else {
      const A = document.createElement("button");
      A.type = "button";
      const P = N.destructive ? k : y;
      A.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + P + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const O = T[N.icon || ""] || "", H = N.destructive ? k : D;
      A.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + H + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + N.label + "</span>", A.addEventListener("mouseenter", () => {
        A.style.background = N.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : w;
      }), A.addEventListener("mouseleave", () => {
        A.style.background = "transparent";
      }), A.addEventListener("click", (B) => {
        B.preventDefault(), B.stopPropagation(), N.action && N.action(), s.remove();
      }), s.appendChild(A);
    }
  }), document.body.appendChild(s);
  const S = (N) => {
    const A = N.target;
    if (s.contains(A) || A.classList.contains("table-cell-menu-btn"))
      return;
    const P = A.closest('[role="dialog"]');
    P && P.contains(s) || (s.remove(), document.removeEventListener("mousedown", S), document.removeEventListener("keydown", E));
  }, E = (N) => {
    N.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", S), document.removeEventListener("keydown", E));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", S), document.addEventListener("keydown", E);
  }, 0);
}
function fm(e) {
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
const mm = Ku.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      lm(this.editor)
    ];
  }
}), pm = Gu.extend({}), or = new He("tableSorting");
let Jt = null, er = null;
function hm(e) {
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
function gm(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function ym(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (g, h) => {
    if (g.type.name === "table" && h === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Jt?.tablePos === t && Jt?.columnIndex === n && Jt?.direction === "asc" ? "desc" : "asc";
  Jt = { tablePos: t, columnIndex: n, direction: i }, er = null;
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
    ci(n, i), o.dispatch(r.tr.setMeta(or, { updated: !0 }));
    return;
  }
  const d = l.map((g) => {
    let h = "", y = 0;
    return g.node.forEach((b) => {
      y === n && (h = b.textContent || ""), y++;
    }), { ...g, sortValue: hm(h) };
  }), u = d.map((g, h) => h);
  d.sort((g, h) => gm(g.sortValue, h.sortValue, i));
  const f = d.map((g, h) => l.indexOf(g));
  if (u.some((g, h) => g !== f[h])) {
    const g = [];
    c.forEach((b) => g.push(b.node)), d.forEach((b) => g.push(b.node));
    const h = s.type.create(s.attrs, g), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, h), y.setMeta(or, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(or, { updated: !0 }));
  ci(n, i);
}
function ci(e, t) {
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
function vm(e, t, n, r) {
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
    d.preventDefault(), d.stopPropagation(), ym(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function bm(e) {
  return new $e({
    key: or,
    state: {
      init() {
        return Ue.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(or);
        return !t.docChanged && !s?.updated && er ? er.map(t.mapping, t.doc) : (er = wm(o.doc, e), er);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function wm(e, t) {
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
              const h = Jt?.tablePos === s && Jt?.columnIndex === c ? Jt.direction : null, y = c, b = s, v = Ze.widget(p, () => vm(h, b, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(v);
            }
            l += d.nodeSize, c++;
          });
        }
      });
    }
  }), Ue.create(e, n);
}
const xm = rt.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [bm(this.editor)];
  }
});
function ga(e, t, n, r, o, s = {}) {
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
const km = Xu.extend({
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
          if (ga(n, f, i, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Cm = Zu.extend({
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
          if (ga(n, f, c, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Mm = Ju.extend({
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
        const g = n.schema.nodes.bulletList, h = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let b = null, v = -1;
        for (let w = c.depth; w > 0; w--) {
          const k = c.node(w);
          if (k.type === g || k.type === h) {
            b = k, v = c.before(w);
            break;
          }
        }
        if (b) {
          if (!o) return !0;
          const w = v, k = r.doc.nodeAt(w);
          if (!k) return !1;
          r.setNodeMarkup(w, u, k.attrs);
          const D = r.doc.nodeAt(w);
          if (!D) return !1;
          const C = [];
          D.forEach((S, E) => {
            S.type === y && C.push(w + 1 + E);
          });
          for (let S = C.length - 1; S >= 0; S--) {
            const E = C[S], N = r.doc.nodeAt(E);
            N && N.type === y && r.setNodeMarkup(E, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const x = ei(d, u);
        if (x) {
          r.wrap(d, x);
          const { $from: w } = r.selection;
          let k = -1;
          for (let D = w.depth; D > 0; D--)
            if (w.node(D).type === u) {
              k = w.before(D);
              break;
            }
          if (k >= 0) {
            const D = r.doc.nodeAt(k);
            if (D) {
              const C = [];
              D.forEach((S, E) => {
                S.type === y && C.push(k + 1 + E);
              });
              for (let S = C.length - 1; S >= 0; S--) {
                const E = C[S], N = r.doc.nodeAt(E);
                N && N.type === y && r.setNodeMarkup(E, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const T = ei(d, g);
        if (T) {
          r.wrap(d, T);
          const { $from: w } = r.selection;
          let k = -1;
          for (let D = w.depth; D > 0; D--)
            if (w.node(D).type === g) {
              k = w.before(D);
              break;
            }
          return k >= 0 && ga(r, k, u, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Sm = ef.extend({
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
          const u = r.before(s), { tr: f } = n, p = n.schema.nodes.taskItem, g = n.schema.nodes.paragraph, h = p.create(
            { checked: !1 },
            g.create()
          );
          f.insert(u, h);
          const y = u + 1;
          return f.setSelection(dt.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
      new $e({
        key: new He("taskItemInputRule"),
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
            const u = d[2] === "x", f = a.start() + (d.index || 0), p = r, g = i.tr;
            g.delete(f, p);
            const y = g.doc.resolve(f).blockRange();
            if (!y || !t || !e) return !1;
            const b = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: u } }
            ];
            if (g.wrap(y, b), f > 1) {
              const v = g.doc.resolve(f - 1).nodeBefore;
              v && v.type === t && tf(g.doc, f - 1) && g.join(f - 1);
            }
            return n.dispatch(g), !0;
          }
        }
      })
    ];
  }
}), Tm = Qu.extend({
  content: "paragraph block*"
}), li = new He("collapsibleList");
function Ns(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function As(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function Em(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let Cn = null;
function rs(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !As(o))
      return !0;
    const i = Ns(o, s), a = t.collapsedItems.has(i);
    r.push(
      Ze.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${a ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const c = o.firstChild;
    if (c && c.type.name === "paragraph") {
      const l = s + 1 + c.nodeSize - 1, d = Ze.widget(
        l,
        () => {
          const u = CSS.escape(i), f = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${u}"]`
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
            g.classList.remove("collapsed", "expanded"), g.classList.add(y ? "expanded" : "collapsed"), g.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), Cn && Cn.dispatch(
              Cn.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), p.appendChild(g), p;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(d);
    }
    if (a && Em(o, s)) {
      let d = s + 1;
      o.forEach((u) => {
        ["bulletList", "orderedList", "taskList"].includes(u.type.name) && r.push(
          Ze.node(d, d + u.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), d += u.nodeSize;
      });
    }
    return !0;
  }), Ue.create(e, r);
}
const Dm = rt.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !As(o))
          return !1;
        const s = Ns(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && As(o) && n.collapsedItems.add(Ns(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new $e({
        key: li,
        view(n) {
          return Cn = n, {
            update(r) {
              Cn = r;
            },
            destroy() {
              Cn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: rs(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: rs(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = li.getState(n);
            return r?.decorations ? r.decorations : rs(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Ce = cf();
Ce.register("javascript", ma);
Ce.register("js", ma);
Ce.register("jsx", ma);
Ce.register("typescript", pa);
Ce.register("ts", pa);
Ce.register("tsx", pa);
Ce.register("python", Lc);
Ce.register("py", Lc);
Ce.register("xml", ha);
Ce.register("html", ha);
Ce.register("svg", ha);
Ce.register("css", Zf);
Ce.register("json", Qf);
Ce.register("bash", Mo);
Ce.register("sh", Mo);
Ce.register("shell", Mo);
Ce.register("zsh", Mo);
const Rs = {
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
}, Hr = /* @__PURE__ */ new Set(), Wr = /* @__PURE__ */ new Set();
async function Nm(e) {
  if (Ce.registered(e)) return !0;
  const t = Rs[e];
  if (!t) return !1;
  if (Wr.has(e)) return !0;
  if (Hr.has(e))
    return new Promise((n) => {
      const r = () => {
        Wr.has(e) ? n(!0) : Hr.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  Hr.add(e);
  try {
    const r = (await t()).default;
    Ce.register(e, r), Wr.add(e);
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
          i !== e && !Ce.registered(i) && (Ce.register(i, r), Wr.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Hr.delete(e);
  }
}
function Am({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = V(!1), [s, i] = V(!1), [a, c] = V(!0), l = K(null), d = e.attrs.language || "plaintext";
  Q(() => {
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
  }, [s]), Q(() => {
    if (s && d !== "plaintext") {
      if (Ce.registered(d)) {
        c(!0);
        return;
      }
      Rs[d] && (c(!1), Nm(d).then((h) => {
        c(h);
      }));
    }
  }, [s, d]);
  const u = Y(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (h) {
      console.error("Failed to copy:", h);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(Rs)])).sort(), g = d === "plaintext" ? "Plain Text" : d.charAt(0).toUpperCase() + d.slice(1);
  return /* @__PURE__ */ R(An, { className: "code-block-wrapper", ref: l, children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ R(
          "select",
          {
            value: d,
            onChange: (h) => t({ language: h.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ m("option", { value: "plaintext", children: "Plain Text" }),
              p.map((h) => /* @__PURE__ */ m("option", { value: h, children: h.charAt(0).toUpperCase() + h.slice(1) }, h))
            ]
          }
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: g }),
        /* @__PURE__ */ m(Ut, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: u,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ m(_n, { size: 14 }) : /* @__PURE__ */ m($n, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !a ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Xs, { className: s && a ? `language-${d}` : "language-plaintext" }) })
  ] });
}
const Rm = af.extend({
  addNodeView() {
    return bo(Am);
  }
}).configure({
  lowlight: Ce,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function Lt({
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
  return em(
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
function Lm({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = V(""), s = K(null), i = K(null), [a, c] = V({ top: 0, left: 0 });
  Q(() => {
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
  }, [t, e]), Q(() => {
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
  const l = Y((g) => {
    if (g?.preventDefault(), r.trim()) {
      let h = r.trim();
      !/^https?:\/\//i.test(h) && !h.startsWith("mailto:") && (h = "https://" + h), e.chain().focus().extendMarkRange("link").setLink({ href: h }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), d = Y((g) => {
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
      children: /* @__PURE__ */ R("form", { onSubmit: l, className: "link-popover-form", children: [
        /* @__PURE__ */ R("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ m(Zs, { className: "link-popover-icon", size: 16 }),
          /* @__PURE__ */ m(
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
        /* @__PURE__ */ m("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" })
      ] })
    }
  );
  return /* @__PURE__ */ m(Lt, { children: p });
}
function Im({ editor: e, onEditLink: t }) {
  const [n, r] = V({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = K(null), s = K(null), i = Y((x) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const T = x.getAttribute("href") || "", w = x.getBoundingClientRect(), k = w.bottom + 8, D = Math.max(16, Math.min(w.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: T,
          position: { top: k, left: D },
          linkElement: x
        });
      } catch (T) {
        console.warn("LinkHoverTooltip: Error showing tooltip", T);
      }
    }
  }, [e]), a = Y(() => {
    s.current = setTimeout(() => {
      r((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = Y(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  Q(() => {
    if (!e || e.isDestroyed) return;
    const x = e.view.dom;
    if (!x) return;
    const T = (k) => {
      const C = k.target.closest("a");
      C && x.contains(C) && i(C);
    }, w = (k) => {
      const D = k.target, C = k.relatedTarget;
      if (D.closest("a")) {
        if (C && o.current?.contains(C))
          return;
        a();
      }
    };
    return x.addEventListener("mouseover", T), x.addEventListener("mouseout", w), () => {
      x.removeEventListener("mouseover", T), x.removeEventListener("mouseout", w), s.current && clearTimeout(s.current);
    };
  }, [e, i, a]), Q(() => {
    if (!n.isVisible) return;
    const x = () => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, T = e.view.dom.closest(".editor-content-wrapper");
    return T?.addEventListener("scroll", x), window.addEventListener("scroll", x, !0), () => {
      T?.removeEventListener("scroll", x), window.removeEventListener("scroll", x, !0);
    };
  }, [n.isVisible, e]);
  const [l, d] = V(!1), u = Y(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      d(!0), setTimeout(() => d(!1), 1500);
    });
  }, [n.url]), f = Y(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = Y(() => {
    if (n.linkElement) {
      const { view: x } = e, { doc: T } = x.state;
      let w = null, k = null;
      T.descendants((D, C) => {
        if (D.isText && D.marks.some((S) => S.type.name === "link")) {
          const S = x.nodeDOM(C);
          if (S && (S === n.linkElement || S.parentElement === n.linkElement))
            return w = C, k = C + D.nodeSize, !1;
        }
        return !0;
      }), w !== null && k !== null ? e.chain().focus().setTextSelection({ from: w, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((x) => ({ ...x, isVisible: !1 }));
  }, [e, n.linkElement]), g = Y(() => {
    if (n.linkElement) {
      const { view: x } = e, { doc: T } = x.state;
      T.descendants((w, k) => {
        if (w.isText && w.marks.some((D) => D.type.name === "link")) {
          const D = x.nodeDOM(k);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + w.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((x) => ({ ...x, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const h = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, b = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", v = /* @__PURE__ */ m(
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
            onClick: f,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ m(mf, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: h || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ R("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: g,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ m(pf, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: u,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: l ? /* @__PURE__ */ m(_n, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ m($n, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(hf, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ m(Lt, { children: v });
}
const Xe = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ m(
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
), di = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), ui = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Pm = On(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = V(!1), d = K(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = ui.find((g) => g.value === u)?.shortLabel || "P";
  Q(() => {
    if (!c) return;
    const g = (h) => {
      d.current && !d.current.contains(h.target) && l(!1);
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
  return /* @__PURE__ */ R("div", { ref: d, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ R(
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
          /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: f }),
          /* @__PURE__ */ m(Ut, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
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
        children: ui.map((g) => {
          const h = g.value === u;
          return /* @__PURE__ */ R(
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
}), Om = On(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const i = K(null), a = gc({
    editor: t,
    selector: ({ editor: S }) => ({
      isBold: S.isActive("bold"),
      isItalic: S.isActive("italic"),
      isUnderline: S.isActive("underline"),
      isStrike: S.isActive("strike"),
      isCode: S.isActive("code"),
      isHighlight: S.isActive("highlight"),
      isLink: S.isActive("link"),
      isH1: S.isActive("heading", { level: 1 }),
      isH2: S.isActive("heading", { level: 2 }),
      isH3: S.isActive("heading", { level: 3 }),
      isH4: S.isActive("heading", { level: 4 }),
      isH5: S.isActive("heading", { level: 5 }),
      isBulletList: S.isActive("bulletList"),
      isOrderedList: S.isActive("orderedList"),
      isTaskList: S.isActive("taskList"),
      isBlockquote: S.isActive("blockquote"),
      isCodeBlock: S.isActive("codeBlock")
    })
  }), [c, l] = V(!1), [d, u] = V(""), [f, p] = V(!1), [g, h] = V({ top: 0, left: 0 }), y = K(null), b = K(null), v = K(null), x = Y(() => {
    if (d) {
      let S = d.trim();
      !/^https?:\/\//i.test(S) && !S.startsWith("mailto:") && (S = "https://" + S), t.chain().focus().extendMarkRange("link").setLink({ href: S }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    l(!1), u("");
  }, [t, d]), T = (S) => {
    S.preventDefault(), S.stopPropagation();
    const E = t.getAttributes("link").href;
    u(E || ""), l(!0);
  }, w = Y((S, E) => {
    S.preventDefault(), S.stopPropagation(), E();
  }, []);
  Q(() => {
    if (!t || t.isDestroyed) return;
    const S = () => {
      if (!t.isDestroyed)
        try {
          const { selection: E } = t.state, { empty: N, from: A, to: P } = E, B = ("node" in E && E.node ? E.node : null)?.type?.name === "resizableImage";
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
            const me = y.current.closest('[data-slot="dialog-content"]');
            if (me) {
              const pe = me.getBoundingClientRect();
              Z = pe.left, te = pe.top;
            }
          }
          let z = (q.left + I.left) / 2 - L / 2 - Z;
          const j = Z ? G - Z : G;
          z = Math.max(X, Math.min(j - L - X, z));
          let ee = q.top - U - 10 - te;
          ee < X && (ee = I.bottom + 10 - te), f ? h({ top: Math.max(X, ee), left: z }) : (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
            h({ top: Math.max(X, ee), left: z }), p(!0);
          }, 50));
        } catch (E) {
          console.warn("FloatingToolbar: Error updating position", E);
        }
    };
    return t.on("selectionUpdate", S), () => {
      t.off("selectionUpdate", S), b.current && clearTimeout(b.current), v.current && clearTimeout(v.current);
    };
  }, [t, f]);
  const k = (S) => {
    b.current && (clearTimeout(b.current), b.current = null);
  };
  if (!f || r)
    return null;
  const D = 15, C = c ? /* @__PURE__ */ m(
    "div",
    {
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: g.top,
        left: g.left
      },
      onMouseDown: k,
      children: /* @__PURE__ */ R("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: d,
            onChange: (S) => u(S.target.value),
            onKeyDown: (S) => {
              S.key === "Enter" && (S.preventDefault(), x()), S.key === "Escape" && (l(!1), u(""));
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
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (S) => {
                S.preventDefault(), x();
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
              onMouseDown: (S) => {
                S.preventDefault(), l(!1), u("");
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
        top: g.top,
        left: g.left
      },
      onMouseDown: k,
      children: [
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleBold().run()),
            isActive: a?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Qs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleItalic().run()),
            isActive: a?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Js, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleUnderline().run()),
            isActive: a?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(ea, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleStrike().run()),
            isActive: a?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(ta, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleCode().run()),
            isActive: a?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(wc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleHighlight().run()),
            isActive: a?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(xc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: T,
            isActive: a?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(na, { size: D })
          }
        ),
        /* @__PURE__ */ m(di, {}),
        /* @__PURE__ */ m(
          Pm,
          {
            editor: t,
            isH1: a?.isH1 ?? !1,
            isH2: a?.isH2 ?? !1,
            isH3: a?.isH3 ?? !1,
            isH4: a?.isH4 ?? !1,
            isH5: a?.isH5 ?? !1,
            executeCommand: w
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleBlockquote().run()),
            isActive: a?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(ra, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleBulletList().run()),
            isActive: a?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(oa, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleOrderedList().run()),
            isActive: a?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(sa, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleTaskList().run()),
            isActive: a?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(aa, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Xe,
          {
            onMouseDown: (S) => w(S, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: a?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(gf, { size: D })
          }
        ),
        o && /* @__PURE__ */ R(Ae, { children: [
          /* @__PURE__ */ m(di, {}),
          /* @__PURE__ */ m(
            "button",
            {
              ref: i,
              onMouseDown: (S) => {
                S.preventDefault(), S.stopPropagation(), i.current && s?.(i.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ m(ko, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(Lt, { onMouseDown: k, children: C });
}), zr = {
  info: { icon: ao, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: Cc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: kc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: ca, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: ia, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function _m({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = V(!1), [s, i] = V(!1), [a, c] = V(null), l = K(null), d = K(null), u = e.attrs.type || "info", f = zr[u] || zr.info, p = f.icon, g = Y(() => {
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
    const v = (x) => {
      l.current && !l.current.contains(x.target) && d.current && !d.current.contains(x.target) && o(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [r]), Q(() => {
    if (!r) return;
    const v = () => o(!1);
    return window.addEventListener("scroll", v, !0), () => window.removeEventListener("scroll", v, !0);
  }, [r]);
  const h = Y(() => {
    n.isEditable && (r || g(), o(!r));
  }, [n.isEditable, r, g]), y = (v) => {
    t({ type: v }), o(!1);
  }, b = Y((v) => {
    v.stopPropagation(), i((x) => !x);
  }, []);
  return /* @__PURE__ */ R(An, { className: `callout callout-${u}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": u, children: [
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
                v.stopPropagation(), h();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor },
              contentEditable: !1,
              children: [
                /* @__PURE__ */ m(p, { size: 18 }),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }),
                n.isEditable && /* @__PURE__ */ m(Ut, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(Mc, { size: 16 }) : /* @__PURE__ */ m(Ut, { size: 16 })
            }
          ),
          r && n.isEditable && a && /* @__PURE__ */ m(Lt, { children: /* @__PURE__ */ m(
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
                const x = zr[v], T = x.icon;
                return /* @__PURE__ */ R(
                  "button",
                  {
                    className: `callout-type-option ${v === u ? "active" : ""}`,
                    onClick: (w) => {
                      w.stopPropagation(), y(v);
                    },
                    onMouseDown: (w) => w.stopPropagation(),
                    style: { "--callout-option-color": x.color },
                    children: [
                      /* @__PURE__ */ m(T, { size: 16, style: { color: x.borderColor } }),
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
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Xs, {}) })
  ] });
}
const $m = wo.create({
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
      Pn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return bo(_m);
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
}), Hm = tm.extend({
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
          Z.preventDefault(), Z.stopPropagation(), X(), f.style.display = "none", S = !1;
        }), G;
      }, g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", g, () => {
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
      })), f.appendChild(p("Copy image", h, async () => {
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
      })), f.appendChild(p("Copy URL", b, async () => {
        const L = o.attrs.src;
        try {
          await navigator.clipboard.writeText(L);
        } catch {
        }
      })), f.appendChild(p("Save image", y, () => {
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
      ], k = [], D = (L) => {
        k.forEach((U) => {
          (U.getAttribute("data-align-value") || "left") === L ? (U.style.background = "oklch(1 0 0)", U.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", U.style.color = "oklch(0.25 0 0)", U.style.fontWeight = "600") : (U.style.background = "transparent", U.style.boxShadow = "none", U.style.color = "oklch(0.5 0 0)", U.style.fontWeight = "400");
        });
      };
      w.forEach(({ value: L, label: U, icon: X }) => {
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
        }), k.push(G), T.appendChild(G);
      }), f.appendChild(T);
      const C = () => {
        const L = o.attrs.align || "left";
        D(L);
      };
      let S = !1;
      u.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), S)
          f.style.display = "none", S = !1;
        else {
          const U = u.getBoundingClientRect(), X = 200, G = f.closest('[role="dialog"]');
          let Z = 0, te = 0;
          if (G) {
            const pe = G.getBoundingClientRect();
            Z = pe.left, te = pe.top;
          }
          let $ = U.bottom + 4 - te, z = U.right - X - Z;
          const j = window.innerHeight, ee = window.innerWidth, me = 200;
          U.bottom + 4 + me > j && ($ = U.top - me - 4 - te), z + Z < 8 && (z = 8 - Z), z + X + Z > ee - 8 && (z = ee - X - 8 - Z), f.style.top = `${$}px`, f.style.left = `${z}px`, f.style.display = "flex", S = !0, C();
        }
      });
      const E = (L) => {
        !f.contains(L.target) && !u.contains(L.target) && (f.style.display = "none", S = !1);
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
      const A = s.closest('[role="dialog"]');
      A ? A.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        d.style.opacity = "1", u.style.opacity = "1", N.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        d.style.opacity = "0", N.style.opacity = "0", S || (u.style.opacity = "0");
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
          d.removeEventListener("mousedown", B), N.removeEventListener("click", P), document.removeEventListener("click", E), f.remove();
        }
      };
    };
  }
});
function Wm(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const zm = {}, tr = {};
function en(e, t) {
  try {
    const r = (zm[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in tr ? tr[r] : fi(r, r.split(":"));
  } catch {
    if (e in tr) return tr[e];
    const n = e?.match(Bm);
    return n ? fi(e, n.slice(1)) : NaN;
  }
}
const Bm = /([+-]\d\d):?(\d\d)?/;
function fi(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return tr[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class ct extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(en(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Pc(this), Ls(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new ct(...n, t) : new ct(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new ct(+this, t);
  }
  getTimezoneOffset() {
    const t = -en(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Ls(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ct(+new Date(t), this.timeZone);
  }
  //#endregion
}
const mi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!mi.test(e)) return;
  const t = e.replace(mi, "$1UTC");
  ct.prototype[t] && (e.startsWith("get") ? ct.prototype[e] = function() {
    return this.internal[t]();
  } : (ct.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Fm(this), +this;
  }, ct.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Ls(this), +this;
  }));
});
function Ls(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-en(e.timeZone, e) * 60));
}
function Fm(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Pc(e);
}
function Pc(e) {
  const t = en(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const d = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, u = Math.round(-(en(e.timeZone, e) * 60)) % 60;
  (u || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + d));
  const f = en(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), h = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, b = h - c;
  if (y && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const v = en(e.timeZone, e), x = v > 0 ? Math.floor(v) : Math.ceil(v), T = p - x;
    T && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + T), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + T));
  }
}
class Oe extends ct {
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
    return `${t} GMT${n}${r}${o} (${Wm(this.timeZone, this)})`;
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
const Oc = 6048e5, Um = 864e5, pi = Symbol.for("constructDateFrom");
function Ee(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && pi in e ? e[pi](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function we(e, t) {
  return Ee(t || e, e);
}
function _c(e, t, n) {
  const r = we(e, n?.in);
  return isNaN(t) ? Ee(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function $c(e, t, n) {
  const r = we(e, n?.in);
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
let Ym = {};
function hr() {
  return Ym;
}
function Rn(e, t) {
  const n = hr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = we(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function ir(e, t) {
  return Rn(e, { ...t, weekStartsOn: 1 });
}
function Hc(e, t) {
  const n = we(e, t?.in), r = n.getFullYear(), o = Ee(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = ir(o), i = Ee(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = ir(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function hi(e) {
  const t = we(e), n = new Date(
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
function Hn(e, ...t) {
  const n = Ee.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function cr(e, t) {
  const n = we(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Wc(e, t, n) {
  const [r, o] = Hn(
    n?.in,
    e,
    t
  ), s = cr(r), i = cr(o), a = +s - hi(s), c = +i - hi(i);
  return Math.round((a - c) / Um);
}
function jm(e, t) {
  const n = Hc(e, t), r = Ee(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), ir(r);
}
function Vm(e, t, n) {
  return _c(e, t * 7, n);
}
function Km(e, t, n) {
  return $c(e, t * 12, n);
}
function Gm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ee.bind(null, o));
    const s = we(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Ee(r, n || NaN);
}
function qm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ee.bind(null, o));
    const s = we(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Ee(r, n || NaN);
}
function Xm(e, t, n) {
  const [r, o] = Hn(
    n?.in,
    e,
    t
  );
  return +cr(r) == +cr(o);
}
function zc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Zm(e) {
  return !(!zc(e) && typeof e != "number" || isNaN(+we(e)));
}
function Qm(e, t, n) {
  const [r, o] = Hn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function Jm(e, t) {
  const n = we(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Bc(e, t) {
  const [n, r] = Hn(e, t.start, t.end);
  return { start: n, end: r };
}
function ep(e, t) {
  const { start: n, end: r } = Bc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Ee(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function tp(e, t) {
  const n = we(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function np(e, t) {
  const n = we(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Fc(e, t) {
  const n = we(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function rp(e, t) {
  const { start: n, end: r } = Bc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Ee(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function Uc(e, t) {
  const n = hr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = we(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function op(e, t) {
  return Uc(e, { ...t, weekStartsOn: 1 });
}
const sp = {
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
}, ap = (e, t, n) => {
  let r;
  const o = sp[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function os(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const ip = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, cp = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, lp = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, dp = {
  date: os({
    formats: ip,
    defaultWidth: "full"
  }),
  time: os({
    formats: cp,
    defaultWidth: "full"
  }),
  dateTime: os({
    formats: lp,
    defaultWidth: "full"
  })
}, up = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, fp = (e, t, n, r) => up[e];
function Zn(e) {
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
const mp = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, pp = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, hp = {
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
}, gp = {
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
}, yp = {
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
}, vp = {
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
}, bp = (e, t) => {
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
}, wp = {
  ordinalNumber: bp,
  era: Zn({
    values: mp,
    defaultWidth: "wide"
  }),
  quarter: Zn({
    values: pp,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Zn({
    values: hp,
    defaultWidth: "wide"
  }),
  day: Zn({
    values: gp,
    defaultWidth: "wide"
  }),
  dayPeriod: Zn({
    values: yp,
    defaultWidth: "wide",
    formattingValues: vp,
    defaultFormattingWidth: "wide"
  })
};
function Qn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? kp(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      xp(a, (u) => u.test(i))
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
function xp(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function kp(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Cp(e) {
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
const Mp = /^(\d+)(th|st|nd|rd)?/i, Sp = /\d+/i, Tp = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ep = {
  any: [/^b/i, /^(a|c)/i]
}, Dp = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Np = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ap = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Rp = {
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
}, Lp = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ip = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Pp = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Op = {
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
}, _p = {
  ordinalNumber: Cp({
    matchPattern: Mp,
    parsePattern: Sp,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Qn({
    matchPatterns: Tp,
    defaultMatchWidth: "wide",
    parsePatterns: Ep,
    defaultParseWidth: "any"
  }),
  quarter: Qn({
    matchPatterns: Dp,
    defaultMatchWidth: "wide",
    parsePatterns: Np,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Qn({
    matchPatterns: Ap,
    defaultMatchWidth: "wide",
    parsePatterns: Rp,
    defaultParseWidth: "any"
  }),
  day: Qn({
    matchPatterns: Lp,
    defaultMatchWidth: "wide",
    parsePatterns: Ip,
    defaultParseWidth: "any"
  }),
  dayPeriod: Qn({
    matchPatterns: Pp,
    defaultMatchWidth: "any",
    parsePatterns: Op,
    defaultParseWidth: "any"
  })
}, ya = {
  code: "en-US",
  formatDistance: ap,
  formatLong: dp,
  formatRelative: fp,
  localize: wp,
  match: _p,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function $p(e, t) {
  const n = we(e, t?.in);
  return Wc(n, Fc(n)) + 1;
}
function Yc(e, t) {
  const n = we(e, t?.in), r = +ir(n) - +jm(n);
  return Math.round(r / Oc) + 1;
}
function jc(e, t) {
  const n = we(e, t?.in), r = n.getFullYear(), o = hr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Ee(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = Rn(i, t), c = Ee(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = Rn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function Hp(e, t) {
  const n = hr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = jc(e, t), s = Ee(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Rn(s, t);
}
function Vc(e, t) {
  const n = we(e, t?.in), r = +Rn(n, t) - +Hp(n, t);
  return Math.round(r / Oc) + 1;
}
function be(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Ht = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return be(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : be(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return be(e.getDate(), t.length);
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
    return be(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return be(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return be(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return be(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return be(o, t.length);
  }
}, mn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, gi = {
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
    return Ht.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = jc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return be(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : be(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Hc(e);
    return be(n, t.length);
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
    return be(n, t.length);
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
        return be(r, 2);
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
        return be(r, 2);
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
        return Ht.M(e, t);
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
        return be(r + 1, 2);
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
    const o = Vc(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : be(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Yc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : be(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ht.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = $p(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : be(r, t.length);
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
        return be(s, 2);
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
        return be(s, t.length);
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
        return be(o, t.length);
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
    switch (r === 12 ? o = mn.noon : r === 0 ? o = mn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = mn.evening : r >= 12 ? o = mn.afternoon : r >= 4 ? o = mn.morning : o = mn.night, t) {
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
    return Ht.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Ht.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : be(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : be(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ht.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ht.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Ht.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return vi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Zt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Zt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return vi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Zt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Zt(r, ":");
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
        return "GMT" + yi(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Zt(r, ":");
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
        return "GMT" + yi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Zt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return be(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return be(+e, t.length);
  }
};
function yi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + be(s, 2);
}
function vi(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + be(Math.abs(e) / 60, 2) : Zt(e, t);
}
function Zt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = be(Math.trunc(r / 60), 2), s = be(r % 60, 2);
  return n + o + t + s;
}
const bi = (e, t) => {
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
}, Kc = (e, t) => {
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
}, Wp = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return bi(e, t);
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
  return s.replace("{{date}}", bi(r, t)).replace("{{time}}", Kc(o, t));
}, zp = {
  p: Kc,
  P: Wp
}, Bp = /^D+$/, Fp = /^Y+$/, Up = ["D", "DD", "YY", "YYYY"];
function Yp(e) {
  return Bp.test(e);
}
function jp(e) {
  return Fp.test(e);
}
function Vp(e, t, n) {
  const r = Kp(e, t, n);
  if (console.warn(r), Up.includes(e)) throw new RangeError(r);
}
function Kp(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Gp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, qp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Xp = /^'([^]*?)'?$/, Zp = /''/g, Qp = /[a-zA-Z]/;
function Jp(e, t, n) {
  const r = hr(), o = n?.locale ?? r.locale ?? ya, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = we(e, n?.in);
  if (!Zm(a))
    throw new RangeError("Invalid time value");
  let c = t.match(qp).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const f = zp[u];
      return f(d, o.formatLong);
    }
    return d;
  }).join("").match(Gp).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: eh(d) };
    if (gi[u])
      return { isToken: !0, value: d };
    if (u.match(Qp))
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
    (!n?.useAdditionalWeekYearTokens && jp(u) || !n?.useAdditionalDayOfYearTokens && Yp(u)) && Vp(u, t, String(e));
    const f = gi[u[0]];
    return f(a, u, o.localize, l);
  }).join("");
}
function eh(e) {
  const t = e.match(Xp);
  return t ? t[1].replace(Zp, "'") : e;
}
function th(e, t) {
  const n = we(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Ee(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function nh(e, t) {
  return we(e, t?.in).getMonth();
}
function rh(e, t) {
  return we(e, t?.in).getFullYear();
}
function oh(e, t) {
  return +we(e) > +we(t);
}
function sh(e, t) {
  return +we(e) < +we(t);
}
function ah(e, t, n) {
  const [r, o] = Hn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function ih(e, t, n) {
  const [r, o] = Hn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function ch(e, t, n) {
  const r = we(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Ee(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = th(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function lh(e, t, n) {
  const r = we(e, n?.in);
  return isNaN(+r) ? Ee(e, NaN) : (r.setFullYear(t), r);
}
const wi = 5, dh = 4;
function uh(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, wi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? wi : dh;
}
function Gc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function fh(e, t) {
  const n = Gc(e, t), r = uh(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Ge {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Oe.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Oe(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : _c(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : $c(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Vm(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : Km(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Wc(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Qm(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : ep(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : rp(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : fh(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : op(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Jm(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Uc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : np(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : Jp(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Yc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : nh(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : rh(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Vc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : oh(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : sh(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : zc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Xm(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : ah(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : ih(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Gm(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : qm(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : ch(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : lh(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Gc(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : cr(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : ir(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : tp(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Rn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Fc(r), this.options = { locale: ya, ...t }, this.overrides = n;
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
    return t && Ge.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Ge.yearFirstLocales.has(s))
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
Ge.yearFirstLocales = /* @__PURE__ */ new Set([
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
const mt = new Ge();
class qc {
  constructor(t, n, r = mt) {
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
class mh {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class ph {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function hh(e) {
  return J.createElement("button", { ...e });
}
function gh(e) {
  return J.createElement("span", { ...e });
}
function yh(e) {
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
function vh(e) {
  const { day: t, modifiers: n, ...r } = e;
  return J.createElement("td", { ...r });
}
function bh(e) {
  const { day: t, modifiers: n, ...r } = e, o = J.useRef(null);
  return J.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), J.createElement("button", { ref: o, ...r });
}
var oe;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(oe || (oe = {}));
var ke;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ke || (ke = {}));
var et;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(et || (et = {}));
var je;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(je || (je = {}));
function wh(e) {
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
function xh(e) {
  return J.createElement("div", { ...e });
}
function kh(e) {
  return J.createElement("div", { ...e });
}
function Ch(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return J.createElement("div", { ...r }, e.children);
}
function Mh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return J.createElement("div", { ...r });
}
function Sh(e) {
  return J.createElement("table", { ...e });
}
function Th(e) {
  return J.createElement("div", { ...e });
}
const Xc = vc(void 0);
function gr() {
  const e = bc(Xc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Eh(e) {
  const { components: t } = gr();
  return J.createElement(t.Dropdown, { ...e });
}
function Dh(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = gr(), d = Y((f) => {
    o && n?.(f);
  }, [o, n]), u = Y((f) => {
    r && t?.(f);
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
function Nh(e) {
  const { components: t } = gr();
  return J.createElement(t.Button, { ...e });
}
function Ah(e) {
  return J.createElement("option", { ...e });
}
function Rh(e) {
  const { components: t } = gr();
  return J.createElement(t.Button, { ...e });
}
function Lh(e) {
  const { rootRef: t, ...n } = e;
  return J.createElement("div", { ...n, ref: t });
}
function Ih(e) {
  return J.createElement("select", { ...e });
}
function Ph(e) {
  const { week: t, ...n } = e;
  return J.createElement("tr", { ...n });
}
function Oh(e) {
  return J.createElement("th", { ...e });
}
function _h(e) {
  return J.createElement(
    "thead",
    { "aria-hidden": !0 },
    J.createElement("tr", { ...e })
  );
}
function $h(e) {
  const { week: t, ...n } = e;
  return J.createElement("th", { ...n });
}
function Hh(e) {
  return J.createElement("th", { ...e });
}
function Wh(e) {
  return J.createElement("tbody", { ...e });
}
function zh(e) {
  const { components: t } = gr();
  return J.createElement(t.Dropdown, { ...e });
}
const Bh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: hh,
  CaptionLabel: gh,
  Chevron: yh,
  Day: vh,
  DayButton: bh,
  Dropdown: wh,
  DropdownNav: xh,
  Footer: kh,
  Month: Ch,
  MonthCaption: Mh,
  MonthGrid: Sh,
  Months: Th,
  MonthsDropdown: Eh,
  Nav: Dh,
  NextMonthButton: Nh,
  Option: Ah,
  PreviousMonthButton: Rh,
  Root: Lh,
  Select: Ih,
  Week: Ph,
  WeekNumber: $h,
  WeekNumberHeader: Hh,
  Weekday: Oh,
  Weekdays: _h,
  Weeks: Wh,
  YearsDropdown: zh
}, Symbol.toStringTag, { value: "Module" }));
function St(e, t, n = !1, r = mt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function Zc(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function va(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Qc(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Jc(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function el(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function tl(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Tt(e, t, n = mt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (tl(a, n))
      return a.includes(e);
    if (va(a))
      return St(a, e, !1, n);
    if (el(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (Zc(a)) {
      const c = s(a.before, e), l = s(a.after, e), d = c > 0, u = l < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return Qc(a) ? s(e, a.after) > 0 : Jc(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function Fh(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: d } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: g, endOfMonth: h, isAfter: y } = o, b = n && p(n), v = r && h(r), x = {
    [ke.focused]: [],
    [ke.outside]: [],
    [ke.disabled]: [],
    [ke.hidden]: [],
    [ke.today]: []
  }, T = {};
  for (const w of e) {
    const { date: k, displayMonth: D } = w, C = !!(D && !f(k, D)), S = !!(b && g(k, b)), E = !!(v && y(k, v)), N = !!(s && Tt(k, s, o)), A = !!(i && Tt(k, i, o)) || S || E || // Broadcast calendar will show outside days as default
    !l && !c && C || l && c === !1 && C, P = u(k, d ?? o.today());
    C && x.outside.push(w), N && x.disabled.push(w), A && x.hidden.push(w), P && x.today.push(w), a && Object.keys(a).forEach((O) => {
      const H = a?.[O];
      H && Tt(k, H, o) && (T[O] ? T[O].push(w) : T[O] = [w]);
    });
  }
  return (w) => {
    const k = {
      [ke.focused]: !1,
      [ke.disabled]: !1,
      [ke.hidden]: !1,
      [ke.outside]: !1,
      [ke.today]: !1
    }, D = {};
    for (const C in x) {
      const S = x[C];
      k[C] = S.some((E) => E === w);
    }
    for (const C in T)
      D[C] = T[C].some((S) => S === w);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function Uh(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ke[s]] ? o.push(t[ke[s]]) : t[et[s]] && o.push(t[et[s]]), o), [t[oe.Day]]);
}
function Yh(e) {
  return {
    ...Bh,
    ...e
  };
}
function jh(e) {
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
function ba() {
  const e = {};
  for (const t in oe)
    e[oe[t]] = `rdp-${oe[t]}`;
  for (const t in ke)
    e[ke[t]] = `rdp-${ke[t]}`;
  for (const t in et)
    e[et[t]] = `rdp-${et[t]}`;
  for (const t in je)
    e[je[t]] = `rdp-${je[t]}`;
  return e;
}
function nl(e, t, n) {
  return (n ?? new Ge(t)).formatMonthYear(e);
}
const Vh = nl;
function Kh(e, t, n) {
  return (n ?? new Ge(t)).format(e, "d");
}
function Gh(e, t = mt) {
  return t.format(e, "LLLL");
}
function qh(e, t, n) {
  return (n ?? new Ge(t)).format(e, "cccccc");
}
function Xh(e, t = mt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Zh() {
  return "";
}
function rl(e, t = mt) {
  return t.format(e, "yyyy");
}
const Qh = rl, Jh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: nl,
  formatDay: Kh,
  formatMonthCaption: Vh,
  formatMonthDropdown: Gh,
  formatWeekNumber: Xh,
  formatWeekNumberHeader: Zh,
  formatWeekdayName: qh,
  formatYearCaption: Qh,
  formatYearDropdown: rl
}, Symbol.toStringTag, { value: "Module" }));
function eg(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Jh,
    ...e
  };
}
function tg(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), g = l(f), h = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: p, disabled: h };
  });
}
function ng(e, t = {}, n = {}) {
  let r = { ...t?.[oe.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function rg(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function og(e, t, n, r, o = !1) {
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
function ol(e, t, n, r) {
  let o = (r ?? new Ge(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const sg = ol;
function sl(e, t, n) {
  return (n ?? new Ge(t)).formatMonthYear(e);
}
const ag = sl;
function ig(e, t, n, r) {
  let o = (r ?? new Ge(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function cg(e) {
  return "Choose the Month";
}
function lg() {
  return "";
}
function dg(e) {
  return "Go to the Next Month";
}
function ug(e) {
  return "Go to the Previous Month";
}
function fg(e, t, n) {
  return (n ?? new Ge(t)).format(e, "cccc");
}
function mg(e, t) {
  return `Week ${e}`;
}
function pg(e) {
  return "Week Number";
}
function hg(e) {
  return "Choose the Year";
}
const gg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ag,
  labelDay: sg,
  labelDayButton: ol,
  labelGrid: sl,
  labelGridcell: ig,
  labelMonthDropdown: cg,
  labelNav: lg,
  labelNext: dg,
  labelPrevious: ug,
  labelWeekNumber: mg,
  labelWeekNumberHeader: pg,
  labelWeekday: fg,
  labelYearDropdown: hg
}, Symbol.toStringTag, { value: "Module" })), yr = (e) => e instanceof HTMLElement ? e : null, ss = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], yg = (e) => yr(e.querySelector("[data-animated-month]")), as = (e) => yr(e.querySelector("[data-animated-caption]")), is = (e) => yr(e.querySelector("[data-animated-weeks]")), vg = (e) => yr(e.querySelector("[data-animated-nav]")), bg = (e) => yr(e.querySelector("[data-animated-weekdays]"));
function wg(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = K(null), a = K(r), c = K(!1);
  xo(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const d = s.isSameMonth(r[0].date, l[0].date), u = s.isAfter(r[0].date, l[0].date), f = u ? n[je.caption_after_enter] : n[je.caption_before_enter], p = u ? n[je.weeks_after_enter] : n[je.weeks_before_enter], g = i.current, h = e.current.cloneNode(!0);
    if (h instanceof HTMLElement ? (ss(h).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const T = yg(x);
      T && x.contains(T) && x.removeChild(T);
      const w = as(x);
      w && w.classList.remove(f);
      const k = is(x);
      k && k.classList.remove(p);
    }), i.current = h) : i.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = g instanceof HTMLElement ? ss(g) : [], b = ss(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && y && y.every((v) => v instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const v = vg(e.current);
      v && (v.style.zIndex = "1"), b.forEach((x, T) => {
        const w = y[T];
        if (!w)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const k = as(x);
        k && k.classList.add(f);
        const D = is(x);
        D && D.classList.add(p);
        const C = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), k && k.classList.remove(f), D && D.classList.remove(p), x.style.position = "", x.style.overflow = "", x.contains(w) && x.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const S = bg(w);
        S && (S.style.opacity = "0");
        const E = as(w);
        E && (E.classList.add(u ? n[je.caption_before_exit] : n[je.caption_after_exit]), E.addEventListener("animationend", C));
        const N = is(w);
        N && N.classList.add(u ? n[je.weeks_before_exit] : n[je.weeks_after_exit]), x.insertBefore(w, x.firstChild);
      });
    }
  });
}
function xg(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: g, endOfWeek: h, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: x } = r, T = c ? b(o, r) : i ? v(o) : x(o), w = c ? f(s) : i ? p(g(s)) : h(g(s)), k = d(w, T), D = u(s, o) + 1, C = [];
  for (let N = 0; N <= k; N++) {
    const A = l(T, N);
    if (t && y(A, t))
      break;
    C.push(A);
  }
  const E = (c ? 35 : 42) * D;
  if (a && C.length < E) {
    const N = E - C.length;
    for (let A = 0; A < N; A++) {
      const P = l(C[C.length - 1], 1);
      C.push(P);
    }
  }
  return C;
}
function kg(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Cg(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function xi(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: d, startOfMonth: u } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = d(n, f);
  }
  return t && l(c, t) < 0 && (c = t), u(c);
}
function Mg(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, g = e.reduce((h, y) => {
    const b = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? f(y) : p(y), v = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), x = t.filter((D) => D >= b && D <= v), T = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < T) {
      const D = t.filter((C) => {
        const S = T - x.length;
        return C > v && C <= o(v, S);
      });
      x.push(...D);
    }
    const w = x.reduce((D, C) => {
      const S = n.ISOWeek ? l(C) : d(C), E = D.find((A) => A.weekNumber === S), N = new qc(C, y, r);
      return E ? E.days.push(N) : D.push(new ph(S, [N])), D;
    }, []), k = new mh(y, w);
    return h.push(k), h;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function Sg(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: d, today: u } = t, { fromYear: f, toYear: p, fromMonth: g, toMonth: h } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = d(f, 0, 1) : !n && y && (n = o(c(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = l(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function Tg(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, d = i(e);
  if (!t)
    return a(d, l);
  if (!(c(t, e) < s))
    return a(d, l);
}
function Eg(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -l);
  if (!(c(d, t) <= 0))
    return a(d, -l);
}
function Dg(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function So(e, t) {
  const [n, r] = V(e);
  return [t === void 0 ? n : t, r];
}
function Ng(e, t) {
  const [n, r] = Sg(e, t), { startOfMonth: o, endOfMonth: s } = t, i = xi(e, n, r, t), [a, c] = So(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Q(() => {
    const k = xi(e, n, r, t);
    c(k);
  }, [e.timeZone]);
  const l = Cg(a, r, e, t), d = xg(l, e.endMonth ? s(e.endMonth) : void 0, e, t), u = Mg(l, d, e, t), f = Dg(u), p = kg(u), g = Eg(a, n, e, t), h = Tg(a, r, e, t), { disableNavigation: y, onMonthChange: b } = e, v = (k) => f.some((D) => D.days.some((C) => C.isEqualTo(k))), x = (k) => {
    if (y)
      return;
    let D = o(k);
    n && D < o(n) && (D = o(n)), r && D > o(r) && (D = o(r)), c(D), b?.(D);
  };
  return {
    months: u,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: g,
    nextMonth: h,
    goToMonth: x,
    goToDay: (k) => {
      v(k) || x(k.date);
    }
  };
}
var at;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(at || (at = {}));
function ki(e) {
  return !e[ke.disabled] && !e[ke.hidden] && !e[ke.outside];
}
function Ag(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    ki(a) && (a[ke.focused] && s < at.FocusedModifier ? (o = i, s = at.FocusedModifier) : r?.isEqualTo(i) && s < at.LastFocused ? (o = i, s = at.LastFocused) : n(i.date) && s < at.Selected ? (o = i, s = at.Selected) : a[ke.today] && s < at.Today && (o = i, s = at.Today));
  }
  return o || (o = e.find((i) => ki(t(i)))), o;
}
function Rg(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: d, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: g, endOfWeek: h, max: y, min: b, startOfBroadcastWeek: v, startOfISOWeek: x, startOfWeek: T } = i;
  let k = {
    day: l,
    week: u,
    month: d,
    year: f,
    startOfWeek: (D) => c ? v(D, i) : a ? x(D) : T(D),
    endOfWeek: (D) => c ? p(D) : a ? g(D) : h(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = y([r, k]) : t === "after" && o && (k = b([o, k])), k;
}
function al(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = Rg(e, t, n.date, r, o, s, i), l = !!(s.disabled && Tt(c, s.disabled, i)), d = !!(s.hidden && Tt(c, s.hidden, i)), u = c, f = new qc(c, u, i);
  return !l && !d ? f : al(e, t, f, r, o, s, i, a + 1);
}
function Lg(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = V(), c = Ag(t.days, n, r || (() => !1), i), [l, d] = V(s ? c : void 0);
  return {
    isFocusTarget: (h) => !!c?.isEqualTo(h),
    setFocused: d,
    focused: l,
    blur: () => {
      a(l), d(void 0);
    },
    moveFocus: (h, y) => {
      if (!l)
        return;
      const b = al(h, y, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(b)) || (t.goToDay(b), d(b)));
    }
  };
}
function Ig(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = So(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((g) => c(g, p)) ?? !1, { min: d, max: u } = e;
  return {
    selected: a,
    select: (p, g, h) => {
      let y = [...a ?? []];
      if (l(p)) {
        if (a?.length === d || r && a?.length === 1)
          return;
        y = a?.filter((b) => !c(b, p));
      } else
        a?.length === u ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, g, h), y;
    },
    isSelected: l
  };
}
function Pg(e, t, n = 0, r = 0, o = !1, s = mt) {
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
function Og(e, t, n = mt) {
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
function Ci(e, t, n = mt) {
  return St(e, t.from, !1, n) || St(e, t.to, !1, n) || St(t, e.from, !1, n) || St(t, e.to, !1, n);
}
function _g(e, t, n = mt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? St(e, a, !1, n) : tl(a, n) ? a.some((c) => St(e, c, !1, n)) : va(a) ? a.from && a.to ? Ci(e, { from: a.from, to: a.to }, n) : !1 : el(a) ? Og(e, a.dayOfWeek, n) : Zc(a) ? n.isAfter(a.before, a.after) ? Ci(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : Tt(e.from, a, n) || Tt(e.to, a, n) : Qc(a) || Jc(a) ? Tt(e.from, a, n) || Tt(e.to, a, n) : !1))
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
function $g(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = So(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, g) => {
      const { min: h, max: y } = e, b = f ? Pg(f, l, h, y, s, t) : void 0;
      return r && n && b?.from && b.to && _g({ from: b.from, to: b.to }, n, t) && (b.from = f, b.to = void 0), i || c(b), i?.(b, f, p, g), b;
    },
    isSelected: (f) => l && St(l, f, !1, t)
  };
}
function Hg(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = So(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (u, f, p) => {
      let g = u;
      return !r && a && a && c(u, a) && (g = void 0), o || i(g), o?.(g, u, f, p), g;
    },
    isSelected: (u) => a ? c(a, u) : !1
  };
}
function Wg(e, t) {
  const n = Hg(e, t), r = Ig(e, t), o = $g(e, t);
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
function zg(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Oe(t.today, t.timeZone)), t.month && (t.month = new Oe(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Oe(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Oe(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Oe(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Oe(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ie) => new Oe(ie, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Oe(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Oe(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = xn(() => {
    const ie = { ...ya, ...t.locale };
    return {
      dateLib: new Ge({
        locale: ie,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Yh(t.components),
      formatters: eg(t.formatters),
      labels: { ...gg, ...t.labels },
      locale: ie,
      classNames: { ...ba(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: d, numberOfMonths: u = 1, onDayBlur: f, onDayClick: p, onDayFocus: g, onDayKeyDown: h, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: v, onPrevClick: x, showWeekNumber: T, styles: w } = t, { formatCaption: k, formatDay: D, formatMonthDropdown: C, formatWeekNumber: S, formatWeekNumberHeader: E, formatWeekdayName: N, formatYearDropdown: A } = r, P = Ng(t, s), { days: O, months: H, navStart: B, navEnd: q, previousMonth: I, nextMonth: L, goToMonth: U } = P, X = Fh(O, t, B, q, s), { isSelected: G, select: Z, selected: te } = Wg(t, s) ?? {}, { blur: $, focused: z, isFocusTarget: j, moveFocus: ee, setFocused: me } = Lg(t, P, X, G ?? (() => !1), s), { labelDayButton: pe, labelGridcell: Me, labelGrid: Le, labelMonthDropdown: qe, labelNav: It, labelPrevious: Yn, labelNext: jn, labelWeekday: Cr, labelWeekNumber: Mr, labelWeekNumberHeader: Sr, labelYearDropdown: Tr } = o, an = xn(() => rg(s, t.ISOWeek), [s, t.ISOWeek]), Vn = l !== void 0 || p !== void 0, cn = Y(() => {
    I && (U(I), x?.(I));
  }, [I, U, x]), ln = Y(() => {
    L && (U(L), v?.(L));
  }, [U, L, v]), Er = Y((ie, xe) => (se) => {
    se.preventDefault(), se.stopPropagation(), me(ie), Z?.(ie.date, xe, se), p?.(ie.date, xe, se);
  }, [Z, p, me]), Wo = Y((ie, xe) => (se) => {
    me(ie), g?.(ie.date, xe, se);
  }, [g, me]), zo = Y((ie, xe) => (se) => {
    $(), f?.(ie.date, xe, se);
  }, [$, f]), Bo = Y((ie, xe) => (se) => {
    const ge = {
      ArrowLeft: [
        se.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        se.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [se.shiftKey ? "year" : "week", "after"],
      ArrowUp: [se.shiftKey ? "year" : "week", "before"],
      PageUp: [se.shiftKey ? "year" : "month", "before"],
      PageDown: [se.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (ge[se.key]) {
      se.preventDefault(), se.stopPropagation();
      const [We, he] = ge[se.key];
      ee(We, he);
    }
    h?.(ie.date, xe, se);
  }, [ee, h, t.dir]), Fo = Y((ie, xe) => (se) => {
    y?.(ie.date, xe, se);
  }, [y]), Dr = Y((ie, xe) => (se) => {
    b?.(ie.date, xe, se);
  }, [b]), Nr = Y((ie) => (xe) => {
    const se = Number(xe.target.value), ge = s.setMonth(s.startOfMonth(ie), se);
    U(ge);
  }, [s, U]), Uo = Y((ie) => (xe) => {
    const se = Number(xe.target.value), ge = s.setYear(s.startOfMonth(ie), se);
    U(ge);
  }, [s, U]), { className: Ar, style: Kn } = xn(() => ({
    className: [a[oe.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[oe.Root], ...t.style }
  }), [a, t.className, t.style, w]), Yo = jh(t), ot = K(null);
  wg(ot, !!t.animate, {
    classNames: a,
    months: H,
    focused: z,
    dateLib: s
  });
  const dn = {
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
    styles: w,
    labels: o,
    formatters: r
  };
  return J.createElement(
    Xc.Provider,
    { value: dn },
    J.createElement(
      n.Root,
      { rootRef: t.animate ? ot : void 0, className: Ar, style: Kn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Yo },
      J.createElement(
        n.Months,
        { className: a[oe.Months], style: w?.[oe.Months] },
        !t.hideNavigation && !d && J.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: w?.[oe.Nav], "aria-label": It(), onPreviousClick: cn, onNextClick: ln, previousMonth: I, nextMonth: L }),
        H.map((ie, xe) => J.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[oe.Month],
            style: w?.[oe.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: xe,
            displayIndex: xe,
            calendarMonth: ie
          },
          d === "around" && !t.hideNavigation && xe === 0 && J.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[oe.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Yn(I), onClick: cn, "data-animated-button": t.animate ? "true" : void 0 },
            J.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          J.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[oe.MonthCaption], style: w?.[oe.MonthCaption], calendarMonth: ie, displayIndex: xe }, c?.startsWith("dropdown") ? J.createElement(
            n.DropdownNav,
            { className: a[oe.Dropdowns], style: w?.[oe.Dropdowns] },
            (() => {
              const se = c === "dropdown" || c === "dropdown-months" ? J.createElement(n.MonthsDropdown, { key: "month", className: a[oe.MonthsDropdown], "aria-label": qe(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Nr(ie.date), options: tg(ie.date, B, q, r, s), style: w?.[oe.Dropdown], value: s.getMonth(ie.date) }) : J.createElement("span", { key: "month" }, C(ie.date, s)), ge = c === "dropdown" || c === "dropdown-years" ? J.createElement(n.YearsDropdown, { key: "year", className: a[oe.YearsDropdown], "aria-label": Tr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Uo(ie.date), options: og(B, q, r, s, !!t.reverseYears), style: w?.[oe.Dropdown], value: s.getYear(ie.date) }) : J.createElement("span", { key: "year" }, A(ie.date, s));
              return s.getMonthYearOrder() === "year-first" ? [ge, se] : [se, ge];
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
            } }, k(ie.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            J.createElement(n.CaptionLabel, { className: a[oe.CaptionLabel], role: "status", "aria-live": "polite" }, k(ie.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && xe === u - 1 && J.createElement(
            n.NextMonthButton,
            { type: "button", className: a[oe.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": jn(L), onClick: ln, "data-animated-button": t.animate ? "true" : void 0 },
            J.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          xe === u - 1 && d === "after" && !t.hideNavigation && J.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: w?.[oe.Nav], "aria-label": It(), onPreviousClick: cn, onNextClick: ln, previousMonth: I, nextMonth: L }),
          J.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": Le(ie.date, s.options, s) || void 0, className: a[oe.MonthGrid], style: w?.[oe.MonthGrid] },
            !t.hideWeekdays && J.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[oe.Weekdays], style: w?.[oe.Weekdays] },
              T && J.createElement(n.WeekNumberHeader, { "aria-label": Sr(s.options), className: a[oe.WeekNumberHeader], style: w?.[oe.WeekNumberHeader], scope: "col" }, E()),
              an.map((se) => J.createElement(n.Weekday, { "aria-label": Cr(se, s.options, s), className: a[oe.Weekday], key: String(se), style: w?.[oe.Weekday], scope: "col" }, N(se, s.options, s)))
            ),
            J.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[oe.Weeks], style: w?.[oe.Weeks] }, ie.weeks.map((se) => J.createElement(
              n.Week,
              { className: a[oe.Week], key: se.weekNumber, style: w?.[oe.Week], week: se },
              T && // biome-ignore lint/a11y/useSemanticElements: react component
              J.createElement(n.WeekNumber, { week: se, style: w?.[oe.WeekNumber], "aria-label": Mr(se.weekNumber, {
                locale: i
              }), className: a[oe.WeekNumber], scope: "row", role: "rowheader" }, S(se.weekNumber, s)),
              se.days.map((ge) => {
                const { date: We } = ge, he = X(ge);
                if (he[ke.focused] = !he.hidden && !!z?.isEqualTo(ge), he[et.selected] = G?.(We) || he.selected, va(te)) {
                  const { from: gt, to: qn } = te;
                  he[et.range_start] = !!(gt && qn && s.isSameDay(We, gt)), he[et.range_end] = !!(gt && qn && s.isSameDay(We, qn)), he[et.range_middle] = St(te, We, !0, s);
                }
                const Gn = ng(he, w, t.modifiersStyles), Be = Uh(he, a, t.modifiersClassNames), ht = !Vn && !he.hidden ? Me(We, he, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  J.createElement(n.Day, { key: `${s.format(We, "yyyy-MM-dd")}_${s.format(ge.displayMonth, "yyyy-MM")}`, day: ge, modifiers: he, className: Be.join(" "), style: Gn, role: "gridcell", "aria-selected": he.selected || void 0, "aria-label": ht, "data-day": s.format(We, "yyyy-MM-dd"), "data-month": ge.outside ? s.format(We, "yyyy-MM") : void 0, "data-selected": he.selected || void 0, "data-disabled": he.disabled || void 0, "data-hidden": he.hidden || void 0, "data-outside": ge.outside || void 0, "data-focused": he.focused || void 0, "data-today": he.today || void 0 }, !he.hidden && Vn ? J.createElement(n.DayButton, { className: a[oe.DayButton], style: w?.[oe.DayButton], type: "button", day: ge, modifiers: he, disabled: he.disabled || void 0, tabIndex: j(ge) ? 0 : -1, "aria-label": pe(We, he, s.options, s), onClick: Er(ge, he), onBlur: zo(ge, he), onFocus: Wo(ge, he), onKeyDown: Bo(ge, he), onMouseEnter: Fo(ge, he), onMouseLeave: Dr(ge, he) }, D(We, s.options, s)) : !he.hidden && D(ge.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      J.createElement(n.Footer, { className: a[oe.Footer], style: w?.[oe.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function il(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = il(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function cl() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = il(e)) && (r && (r += " "), r += t);
  return r;
}
const wa = "-", Bg = (e) => {
  const t = Ug(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(wa);
      return a[0] === "" && a.length !== 1 && a.shift(), ll(a, t) || Fg(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, ll = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? ll(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(wa);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Mi = /^\[(.+)\]$/, Fg = (e) => {
  if (Mi.test(e)) {
    const t = Mi.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Ug = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Is(n[o], r, o, t);
  return r;
}, Is = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Si(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Yg(o)) {
        Is(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Is(i, Si(t, s), n, r);
    });
  });
}, Si = (e, t) => {
  let n = e;
  return t.split(wa).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Yg = (e) => e.isThemeGetter, jg = (e) => {
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
}, Ps = "!", Os = ":", Vg = Os.length, Kg = (e) => {
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
        if (h === Os) {
          s.push(o.slice(c, g)), c = g + Vg;
          continue;
        }
        if (h === "/") {
          l = g;
          continue;
        }
      }
      h === "[" ? i++ : h === "]" ? i-- : h === "(" ? a++ : h === ")" && a--;
    }
    const d = s.length === 0 ? o : o.substring(c), u = Gg(d), f = u !== d, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: u,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + Os, s = r;
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
}, Gg = (e) => e.endsWith(Ps) ? e.substring(0, e.length - 1) : e.startsWith(Ps) ? e.substring(1) : e, qg = (e) => {
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
}, Xg = (e) => ({
  cache: jg(e.cacheSize),
  parseClassName: Kg(e),
  sortModifiers: qg(e),
  ...Bg(e)
}), Zg = /\s+/, Qg = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(Zg);
  let c = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const d = a[l], {
      isExternal: u,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: g,
      maybePostfixModifierPosition: h
    } = n(d);
    if (u) {
      c = d + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!h, b = r(y ? g.substring(0, h) : g);
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
    const v = s(f).join(":"), x = p ? v + Ps : v, T = x + b;
    if (i.includes(T))
      continue;
    i.push(T);
    const w = o(b, y);
    for (let k = 0; k < w.length; ++k) {
      const D = w[k];
      i.push(x + D);
    }
    c = d + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Jg() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = dl(t)) && (r && (r += " "), r += n);
  return r;
}
const dl = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = dl(e[r])) && (n && (n += " "), n += t);
  return n;
};
function ey(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((d, u) => u(d), e());
    return n = Xg(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const d = Qg(c, n);
    return o(c, d), d;
  }
  return function() {
    return s(Jg.apply(null, arguments));
  };
}
const De = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, ul = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, fl = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ty = /^\d+\/\d+$/, ny = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ry = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, oy = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, sy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ay = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, pn = (e) => ty.test(e), fe = (e) => !!e && !Number.isNaN(Number(e)), Wt = (e) => !!e && Number.isInteger(Number(e)), cs = (e) => e.endsWith("%") && fe(e.slice(0, -1)), kt = (e) => ny.test(e), iy = () => !0, cy = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ry.test(e) && !oy.test(e)
), ml = () => !1, ly = (e) => sy.test(e), dy = (e) => ay.test(e), uy = (e) => !ne(e) && !re(e), fy = (e) => Wn(e, gl, ml), ne = (e) => ul.test(e), Xt = (e) => Wn(e, yl, cy), ls = (e) => Wn(e, yy, fe), Ti = (e) => Wn(e, pl, ml), my = (e) => Wn(e, hl, dy), Br = (e) => Wn(e, vl, ly), re = (e) => fl.test(e), Jn = (e) => zn(e, yl), py = (e) => zn(e, vy), Ei = (e) => zn(e, pl), hy = (e) => zn(e, gl), gy = (e) => zn(e, hl), Fr = (e) => zn(e, vl, !0), Wn = (e, t, n) => {
  const r = ul.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, zn = (e, t, n = !1) => {
  const r = fl.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, pl = (e) => e === "position" || e === "percentage", hl = (e) => e === "image" || e === "url", gl = (e) => e === "length" || e === "size" || e === "bg-size", yl = (e) => e === "length", yy = (e) => e === "number", vy = (e) => e === "family-name", vl = (e) => e === "shadow", by = () => {
  const e = De("color"), t = De("font"), n = De("text"), r = De("font-weight"), o = De("tracking"), s = De("leading"), i = De("breakpoint"), a = De("container"), c = De("spacing"), l = De("radius"), d = De("shadow"), u = De("inset-shadow"), f = De("text-shadow"), p = De("drop-shadow"), g = De("blur"), h = De("perspective"), y = De("aspect"), b = De("ease"), v = De("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => [
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
  ], w = () => [...T(), re, ne], k = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], C = () => [re, ne, c], S = () => [pn, "full", "auto", ...C()], E = () => [Wt, "none", "subgrid", re, ne], N = () => ["auto", {
    span: ["full", Wt, re, ne]
  }, Wt, re, ne], A = () => [Wt, "auto", re, ne], P = () => ["auto", "min", "max", "fr", re, ne], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], B = () => ["auto", ...C()], q = () => [pn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], I = () => [e, re, ne], L = () => [...T(), Ei, Ti, {
    position: [re, ne]
  }], U = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], X = () => ["auto", "cover", "contain", hy, fy, {
    size: [re, ne]
  }], G = () => [cs, Jn, Xt], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    re,
    ne
  ], te = () => ["", fe, Jn, Xt], $ = () => ["solid", "dashed", "dotted", "double"], z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => [fe, cs, Ei, Ti], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    re,
    ne
  ], me = () => ["none", fe, re, ne], pe = () => ["none", fe, re, ne], Me = () => [fe, re, ne], Le = () => [pn, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [kt],
      breakpoint: [kt],
      color: [iy],
      container: [kt],
      "drop-shadow": [kt],
      ease: ["in", "out", "in-out"],
      font: [uy],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [kt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [kt],
      shadow: [kt],
      spacing: ["px", fe],
      text: [kt],
      "text-shadow": [kt],
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
        aspect: ["auto", "square", pn, ne, re, y]
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
        columns: [fe, ne, re, a]
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
        inset: S()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": S()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": S()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: S()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: S()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: S()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: S()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: S()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: S()
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
        z: [Wt, "auto", re, ne]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [pn, "full", "auto", a, ...C()]
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
        flex: [fe, pn, "auto", "initial", "none", ne]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", fe, re, ne]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", fe, re, ne]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Wt, "first", "last", "none", re, ne]
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
        text: ["base", n, Jn, Xt]
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
        font: [r, re, ls]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", cs, ne]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [py, ne, t]
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
        "line-clamp": [fe, "none", re, ls]
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
        decoration: [fe, "from-font", "auto", re, Xt]
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
        "underline-offset": [fe, "auto", re, ne]
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
          }, Wt, re, ne],
          radial: ["", re, ne],
          conic: [Wt, re, ne]
        }, gy, my]
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
        "outline-offset": [fe, re, ne]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", fe, Jn, Xt]
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
        "inset-shadow": ["none", u, Fr, Br]
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
        "text-shadow": ["none", f, Fr, Br]
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
        opacity: [fe, re, ne]
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
        "mask-linear": [fe]
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
        "mask-radial-at": T()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [fe]
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
        brightness: [fe, re, ne]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [fe, re, ne]
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
        grayscale: ["", fe, re, ne]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [fe, re, ne]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", fe, re, ne]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [fe, re, ne]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", fe, re, ne]
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
        "backdrop-brightness": [fe, re, ne]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [fe, re, ne]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", fe, re, ne]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [fe, re, ne]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", fe, re, ne]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [fe, re, ne]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [fe, re, ne]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", fe, re, ne]
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
        duration: [fe, "initial", re, ne]
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
        delay: [fe, re, ne]
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
        perspective: [h, re, ne]
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
        rotate: me()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": me()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": me()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": me()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: pe()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": pe()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": pe()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": pe()
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
        skew: Me()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Me()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Me()
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
        translate: Le()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Le()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Le()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Le()
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
        stroke: [fe, Jn, Xt, ls]
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
}, wy = /* @__PURE__ */ ey(by);
function le(...e) {
  return wy(cl(e));
}
function Di(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function To(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Di(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Di(e[o], null);
        }
      };
  };
}
function _e(...e) {
  return M.useCallback(To(...e), e);
}
// @__NO_SIDE_EFFECTS__
function lr(e) {
  const t = /* @__PURE__ */ ky(e), n = M.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = M.Children.toArray(s), c = a.find(My);
    if (c) {
      const l = c.props.children, d = a.map((u) => u === c ? M.Children.count(l) > 1 ? M.Children.only(null) : M.isValidElement(l) ? l.props.children : null : u);
      return /* @__PURE__ */ m(t, { ...i, ref: o, children: M.isValidElement(l) ? M.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var xy = /* @__PURE__ */ lr("Slot");
// @__NO_SIDE_EFFECTS__
function ky(e) {
  const t = M.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (M.isValidElement(o)) {
      const i = Ty(o), a = Sy(s, o.props);
      return o.type !== M.Fragment && (a.ref = r ? To(r, i) : i), M.cloneElement(o, a);
    }
    return M.Children.count(o) > 1 ? M.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var bl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Cy(e) {
  const t = ({ children: n }) => /* @__PURE__ */ m(Ae, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = bl, t;
}
function My(e) {
  return M.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === bl;
}
function Sy(e, t) {
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
function Ty(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const Ni = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ai = cl, Ey = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Ai(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const d = n?.[l], u = s?.[l];
    if (d === null) return null;
    const f = Ni(d) || Ni(u);
    return o[l][f];
  }), a = n && Object.entries(n).reduce((l, d) => {
    let [u, f] = d;
    return f === void 0 || (l[u] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, d) => {
    let { class: u, className: f, ...p } = d;
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
      u,
      f
    ] : l;
  }, []);
  return Ai(e, i, c, n?.class, n?.className);
}, _s = Ey(
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
function Ft({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ m(
    r ? xy : "button",
    {
      "data-slot": "button",
      className: le(_s({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function Dy({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const c = ba();
  return /* @__PURE__ */ m(
    zg,
    {
      showOutsideDays: n,
      className: le(
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
        root: le("w-fit", c.root),
        months: le(
          "flex gap-4 flex-col md:flex-row relative",
          c.months
        ),
        month: le("flex flex-col w-full gap-4", c.month),
        nav: le(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          c.nav
        ),
        button_previous: le(
          _s({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: le(
          _s({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_next
        ),
        month_caption: le(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: le(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          c.dropdowns
        ),
        dropdown_root: le(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          c.dropdown_root
        ),
        dropdown: le(
          "absolute bg-popover inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: le(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: le("flex", c.weekdays),
        weekday: le(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          c.weekday
        ),
        week: le("flex w-full mt-2", c.week),
        week_number_header: le(
          "select-none w-(--cell-size)",
          c.week_number_header
        ),
        week_number: le(
          "text-[0.8rem] select-none text-muted-foreground",
          c.week_number
        ),
        day: le(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          c.day
        ),
        range_start: le(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: le("rounded-none", c.range_middle),
        range_end: le("rounded-r-md bg-accent", c.range_end),
        today: le(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: le(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: le(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: le("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: l, rootRef: d, ...u }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: le(l),
            ...u
          }
        ),
        Chevron: ({ className: l, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ m(yf, { className: le("size-4", l), ...u }) : d === "right" ? /* @__PURE__ */ m(
          vf,
          {
            className: le("size-4", l),
            ...u
          }
        ) : /* @__PURE__ */ m(bf, { className: le("size-4", l), ...u }),
        DayButton: Ny,
        WeekNumber: ({ children: l, ...d }) => /* @__PURE__ */ m("td", { ...d, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function Ny({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = ba(), s = M.useRef(null);
  return M.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
    Ft,
    {
      ref: s,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: le(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let Mn = null;
const wl = /* @__PURE__ */ new Map(), Ay = /* @__PURE__ */ new Map();
function no() {
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
function Ry(e) {
  return Mn?.pillDate === e;
}
function Ly({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = K(null), i = Eo(e);
  Q(() => {
    const v = (x) => {
      x.key === "Escape" && (x.stopPropagation(), x.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), Q(() => {
    const v = (T) => {
      s.current && !s.current.contains(T.target) && (T.target.closest(".date-pill") || o());
    }, x = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(x), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const a = Y((v) => {
    v && r(Tn(v)), o();
  }, [r, o]), c = Y((v) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + v), r(Tn(x)), o();
  }, [r, o]), l = Y(() => {
    const x = (/* @__PURE__ */ new Date()).getDay(), T = x === 0 ? 1 : 8 - x, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + T), r(Tn(w)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), f = new Date(d);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), g = d.getDay(), h = g === 0 ? 1 : 8 - g, y = new Date(d);
  y.setDate(y.getDate() + h);
  const b = y.toDateString();
  return /* @__PURE__ */ R(
    "div",
    {
      ref: s,
      className: le("date-picker-portal", t === "dark" ? "dark" : ""),
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
        /* @__PURE__ */ m("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ R("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ m("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ m(
            Dy,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }),
          /* @__PURE__ */ R("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              Ft,
              {
                variant: "outline",
                size: "sm",
                className: le(
                  "rounded-full text-xs",
                  i.toDateString() === u && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ m(
              Ft,
              {
                variant: "outline",
                size: "sm",
                className: le(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => c(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ m(
              Ft,
              {
                variant: "outline",
                size: "sm",
                className: le(
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
function Iy(e, t, n) {
  if (Ry(t)) {
    no();
    return;
  }
  no();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, d = s - r.bottom - c - l, u = r.top - c - l, f = d >= a ? "below" : u >= a ? "above" : d >= u ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + c : p = r.top - a - c;
  const g = r.left + r.width / 2;
  let h = g - i / 2;
  h + i > o - l && (h = o - i - l), h < l && (h = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    y.addEventListener(w, (k) => {
      k.stopPropagation();
    }, !1);
  });
  const v = nm(y);
  Mn = { container: y, root: v, pillDate: t };
  const x = () => {
    no();
  }, T = (w) => {
    const k = wl.get(t);
    k && k(w);
  };
  v.render(
    /* @__PURE__ */ m(
      Ly,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: h, direction: f, pillCenter: g },
        onSelectDate: T,
        onClose: x
      }
    )
  );
}
function Py({ node: e, updateAttributes: t, selected: n }) {
  const r = K(null), o = e.attrs.date || Sn(), s = xl(o), i = xa(o), a = Y(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const d = c.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return Q(() => (wl.set(o, (c) => {
    t({ date: c });
  }), Ay.set(o, a), () => {
  }), [o, t, a]), Q(() => {
    const c = r.current;
    if (!c) return;
    const l = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = c.getAttribute("data-date") || Sn(), f = a();
      Iy(c, u, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), Q(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      Mn && no();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ m(An, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ m(Sc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ m("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Eo(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function Sn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function sr(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function Tn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function xl(e) {
  const t = Eo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function Oy(e) {
  return Eo(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Qt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return Sn();
  if (n === "tomorrow") return sr(1);
  if (n === "yesterday") return sr(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return sr(c);
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
      return Tn(d);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return Tn(i);
  }
  return null;
}
function xa(e) {
  const t = Eo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const _y = new He("datePillPaste"), $y = wo.create({
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
        default: Sn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = xl(n), o = xa(n);
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
    return bo(Py, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || Sn();
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
        u().deleteRange(d).insertDatePill(Sn()).run();
      }
    }), t = new Fe({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(sr(1)).run();
      }
    }), n = new Fe({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(sr(-1)).run();
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
          const h = (/* @__PURE__ */ new Date()).getFullYear(), y = new Date(h, g, parseInt(f[2], 10));
          u().deleteRange(d).insertDatePill(Tn(y)).run();
        }
      }
    }), s = new Fe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Qt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), i = new Fe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Qt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), a = new Fe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), c = new Fe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Qt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), l = new Fe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Qt(f[1]);
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
      new $e({
        key: _y,
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
              if (Qt(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const h = new RegExp(i.source, i.flags);
            let y;
            for (; (y = h.exec(o)) !== null; ) {
              const T = y[1], w = Qt(T);
              if (w) {
                const k = o.slice(g, y.index);
                k && p.push(f.text(k)), p.push(e.create({ date: w })), g = y.index + y[0].length;
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
              for (const k of p)
                T.insert(w, k), w += k.nodeSize;
              T.delete(d.selection.from, d.selection.to), t.dispatch(T);
            } else
              u.replaceSelectionWith(v), t.dispatch(u);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Je = /* @__PURE__ */ new Map();
function Hy({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = K(null), i = K(null), a = e.attrs.tag || "", c = K(!1), [l, d] = V(() => Je.has(a)), [u, f] = V(() => Je.get(a)?.value ?? a);
  Q(() => {
    l || f(a);
  }, [a, l]), Q(() => {
    if (l) {
      const v = Je.get(a);
      Je.set(a, {
        value: u,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [l, u, a]);
  const p = Y((v) => {
    if (c.current) return;
    c.current = !0;
    const x = v.trim().replace(/^#/, ""), T = ar(x);
    if (Je.delete(a), T && Je.delete(T), !T || !wn(T))
      o();
    else if (T !== a) {
      const w = r();
      if (typeof w == "number" && n) {
        const { tr: k } = n.state, D = e.nodeSize;
        k.delete(w, w + D), k.insert(w, n.schema.nodes.tagPill.create({ tag: T })), n.view.dispatch(k);
      }
    } else
      Je.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), g = Y(() => {
    n && !n.isEditable || (Je.set(a, { value: a, focusedAt: Date.now() }), f(a), d(!0), c.current = !1);
  }, [n, a]);
  Q(() => {
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
  }, [l, n, r, g]), Q(() => {
    if (l) {
      const v = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const x = Je.get(a);
          x && (x.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [l, a]);
  const h = Y((v) => {
    v.key === "Enter" ? (v.preventDefault(), p(u)) : v.key === "Escape" && (v.preventDefault(), Je.delete(a), d(!1), c.current = !0, n?.commands.focus());
  }, [p, u, a, n]), y = Y(() => {
    const x = Je.get(a)?.focusedAt ?? 0;
    Date.now() - x > 300 && p(u);
  }, [p, u, a]), b = Y((v) => {
    f(v.target.value);
  }, []);
  return l ? /* @__PURE__ */ m(An, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(ti, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m(
          "input",
          {
            ref: i,
            type: "text",
            className: "tag-pill-input",
            value: u,
            onChange: b,
            onKeyDown: h,
            onBlur: y,
            spellCheck: !1,
            autoComplete: "off"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ m(An, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(ti, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function wn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function ar(e) {
  return e.toLowerCase().trim();
}
const Wy = new He("tagPillPaste"), zy = wo.create({
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
    return bo(Hy, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = ar(e);
        return wn(n) ? t.insertContent({
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
        const o = ar(r[1]);
        if (wn(o)) {
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
      new $e({
        key: Wy,
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
              if (wn(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const h = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = h.exec(o)) !== null; ) {
              const x = ar(y[1]);
              if (wn(x)) {
                const T = y[0], w = T.startsWith(" ") || T.startsWith(`
`) ? 1 : 0, k = o.slice(g, y.index + w);
                k && p.push(f.text(k)), p.push(e.create({ tag: x })), g = y.index + T.length;
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
});
function kl({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = V(""), [i, a] = V(""), [c, l] = V(""), [d, u] = V(!1), f = K(null), p = K(null);
  Q(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), Q(() => {
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
  }, h = async () => {
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
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), h());
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
            /* @__PURE__ */ m(la, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(Dt, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ R("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ R("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(Zs, { size: 12 }),
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
          /* @__PURE__ */ R("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ R("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(Co, { size: 12 }),
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
          /* @__PURE__ */ R("div", { className: "image-url-dialog-actions", children: [
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
const By = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(Co, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(wf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(xf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(kf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(Cf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(Mf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(oa, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(sa, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(aa, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(ra, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(Tc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(Es, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(la, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ m(Ec, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(ao, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(Cc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(kc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(ca, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(ia, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(Sc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(Zs, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Fy = 32, Uy = 8, Yy = 320, jy = 210, Ur = 12;
function Ri(e) {
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
function Vy({ editor: e }) {
  const [t, n] = V(!1), [r, o] = V(""), [s, i] = V(0), [a, c] = V(null), [l, d] = V(!1), [u, f] = V({ top: 0, left: 0 }), [p, g] = V("below"), h = K(null), y = K(-1), b = K(!1);
  Q(() => {
    b.current = t;
  }, [t]);
  const v = By.filter((S) => {
    if (!r) return !0;
    const E = r.toLowerCase();
    return S.title.toLowerCase().includes(E) || S.keywords?.some((N) => N.includes(E));
  }), x = Math.min(
    v.length * Fy + Uy,
    Yy
  );
  xo(() => {
    if (!t || !a) return;
    const { top: S, bottom: E, left: N } = a, A = window.innerHeight, P = window.innerWidth, O = A - E - Ur, H = S - Ur;
    let B;
    if (O >= x ? B = "below" : H >= x ? B = "above" : B = O >= H ? "below" : "above", g(B), h.current) {
      const q = Math.max(
        Ur,
        Math.min(N, P - jy - Ur)
      ), I = B === "below" ? E + 4 : S - x - 4;
      h.current.style.top = `${I}px`, h.current.style.left = `${q}px`;
    }
  }, [t, a, x, v.length]);
  const T = Y(() => {
    const { state: S } = e, { selection: E } = S, N = E.from, A = y.current;
    if (A >= 0 && A <= N)
      e.chain().focus().deleteRange({ from: A, to: N }).run();
    else {
      const { $from: P } = E, H = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if (H !== -1) {
        const B = P.pos - (P.parentOffset - H);
        e.chain().focus().deleteRange({ from: B, to: P.pos }).run();
      }
    }
  }, [e]), w = Y(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), k = Y((S) => {
    const E = v[S];
    if (E) {
      if (T(), E.isImageCommand) {
        const { state: N } = e, A = e.view.coordsAtPos(N.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), d(!0);
      } else
        E.command(e);
      w();
    }
  }, [e, v, T, w]), D = Y((S, E) => {
    e.chain().focus().setImage({ src: S, alt: E }).run();
  }, [e]);
  return Q(() => {
    if (!e) return;
    const S = () => {
      if (b.current) return;
      const { state: E } = e, { selection: N } = E, { $from: A } = N;
      if (A.parentOffset === 0) return;
      const P = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = A.pos - 1;
      const H = Ri(e);
      H && (c(H), n(!0), o(""), i(0));
    };
    return e.on("update", S), () => {
      e.off("update", S);
    };
  }, [e]), Q(() => {
    if (!e || !t) return;
    const S = e.view.dom, E = (N) => {
      b.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A + 1) % v.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A - 1 + v.length) % v.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), k(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), w()));
    };
    return S.addEventListener("keydown", E, !0), () => {
      S.removeEventListener("keydown", E, !0);
    };
  }, [e, t, s, v, k, w]), Q(() => {
    if (!e || !t) return;
    const S = () => {
      if (!b.current || y.current < 0) return;
      const { state: E } = e, { selection: N } = E, A = N.from, P = y.current;
      if (A <= P) {
        w();
        return;
      }
      try {
        const O = E.doc.textBetween(P + 1, A, void 0, "￼");
        if (O.includes(`
`)) {
          w();
          return;
        }
        o(O), i(0);
        const H = Ri(e);
        H && c(H);
      } catch {
        w();
      }
    };
    return e.on("update", S), e.on("selectionUpdate", S), () => {
      e.off("update", S), e.off("selectionUpdate", S);
    };
  }, [e, t, w]), Q(() => {
    if (!t) return;
    const S = (E) => {
      h.current && !h.current.contains(E.target) && w();
    };
    return document.addEventListener("mousedown", S), () => document.removeEventListener("mousedown", S);
  }, [t, w]), Q(() => {
    t && v.length === 0 && r.length > 2 && w();
  }, [t, v.length, r, w]), Q(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), Q(() => {
    if (!t || !h.current) return;
    const S = h.current.querySelector(".slash-item.is-selected");
    S && S.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ m(
    kl,
    {
      isOpen: l,
      onClose: () => d(!1),
      onInsert: D,
      position: u
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ m(Lt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: h,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((S, E) => /* @__PURE__ */ R(
        "div",
        {
          className: `slash-item ${E === s ? "is-selected" : ""}`,
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation(), k(E);
          },
          onMouseEnter: () => i(E),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: S.icon }),
            /* @__PURE__ */ m("span", { className: "slash-label", children: S.title })
          ]
        },
        S.title
      ))
    }
  ) });
}
const Ky = 340, Gy = 36, qy = 8, Xy = 240, Yr = 8;
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
function Zy({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = V(!1), [s, i] = V(""), [a, c] = V([]), [l, d] = V(0), [u, f] = V(null), [p, g] = V("below"), [h, y] = V(!1), b = K(!1), v = K(null), x = K(-1), T = K(null);
  Q(() => {
    b.current = r;
  }, [r]);
  const w = Y(() => {
    o(!1), i(""), c([]), d(0), x.current = -1;
  }, []), k = Y((N) => {
    const A = x.current;
    if (A < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const H = P.tr.delete(A, O), B = P.schema.marks.wikiLink;
      if (B) {
        const q = B.create({ pageName: N }), I = P.schema.text(N, [q]);
        H.insert(A, I);
        const L = A + N.length;
        H.setSelection(dt.create(H.doc, L)), H.removeStoredMark(B);
      } else
        H.insertText(`[[${N}]]`, A);
      e.view.dispatch(H), e.view.focus();
    } catch (H) {
      console.warn("WikiLinkAutocomplete: Error inserting link", H);
    }
    w();
  }, [e, w]);
  Q(() => {
    if (!e) return;
    const N = () => {
      if (b.current) return;
      const { state: A } = e, { selection: P } = A, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      x.current = O.pos - 2;
      const B = Li(e);
      B && (f(B), o(!0), i(""), c([]), d(0));
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
          P.preventDefault(), P.stopPropagation(), l < a.length ? k(a[l].title) : s.trim() && n ? (n(s.trim()), w()) : s.trim() && k(s.trim());
          return;
        }
        if (P.key === "Escape") {
          P.preventDefault(), w();
          return;
        }
        P.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: H } = O.selection;
          H.parent.textBetween(0, H.parentOffset, void 0, "￼").endsWith("]]") && w();
        }, 0);
      }
    };
    return N.addEventListener("keydown", A, !0), () => {
      N.removeEventListener("keydown", A, !0);
    };
  }, [e, r, a, l, s, k, w, n]), Q(() => {
    if (!e || !r) return;
    const N = () => {
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
        const H = P.doc.textBetween(A + 2, O, void 0, "￼");
        if (H.includes(`
`) || H.includes("]]")) {
          w();
          return;
        }
        i(H), d(0);
        const B = Li(e);
        B && f(B);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, w]), Q(() => {
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
  }, [r, s, t]), Q(() => {
    if (!r) return;
    const N = (A) => {
      v.current && !v.current.contains(A.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, w]), Q(() => {
    if (!r || !v.current) return;
    const N = v.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const D = a.length + (s.trim() ? 1 : 0), C = Math.min(
    Math.max(D, 1) * Gy + qy,
    Xy
  );
  if (xo(() => {
    if (!r || !u) return;
    const { top: N, bottom: A, left: P } = u, O = window.innerHeight, H = window.innerWidth, B = O - A - Yr, q = N - Yr;
    let I;
    if (B >= C ? I = "below" : q >= C ? I = "above" : I = B >= q ? "below" : "above", g(I), v.current) {
      const L = Math.max(
        Yr,
        Math.min(P, H - Ky - Yr)
      ), U = I === "below" ? A + 4 : N - C - 4;
      v.current.style.top = `${U}px`, v.current.style.left = `${L}px`;
    }
  }, [r, u, C, D]), !r) return null;
  const S = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(Lt, { children: /* @__PURE__ */ R(
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
        a.map((N, A) => /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item ${A === l ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), k(N.title);
            },
            onMouseEnter: () => d(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(da, { size: 14 }) }),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        S && /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), w()) : k(s.trim());
            },
            onMouseEnter: () => d(a.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(ua, { size: 14 }) }),
              /* @__PURE__ */ R("span", { className: "wikilink-label", children: [
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
function ue(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Bn(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = M.createContext(i), c = n.length;
    n = [...n, i];
    const l = (u) => {
      const { scope: f, children: p, ...g } = u, h = f?.[e]?.[c] || a, y = M.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ m(h.Provider, { value: y, children: p });
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
  return o.scopeName = e, [r, Qy(o, ...t)];
}
function Qy(...e) {
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
var Yt = globalThis?.document ? M.useLayoutEffect : () => {
}, Jy = M[" useInsertionEffect ".trim().toString()] || Yt;
function ka({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = ev({
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
        const u = tv(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function ev({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = M.useState(e), o = M.useRef(n), s = M.useRef(t);
  return Jy(() => {
    s.current = t;
  }, [t]), M.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function tv(e) {
  return typeof e == "function";
}
var nv = [
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
], Pe = nv.reduce((e, t) => {
  const n = /* @__PURE__ */ lr(`Primitive.${t}`), r = M.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Cl(e, t) {
  e && Ic.flushSync(() => e.dispatchEvent(t));
}
function Ml(e) {
  const t = e + "CollectionProvider", [n, r] = Bn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (h) => {
    const { scope: y, children: b } = h, v = J.useRef(null), x = J.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: y, itemMap: x, collectionRef: v, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ lr(a), l = J.forwardRef(
    (h, y) => {
      const { scope: b, children: v } = h, x = s(a, b), T = _e(y, x.collectionRef);
      return /* @__PURE__ */ m(c, { ref: T, children: v });
    }
  );
  l.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = /* @__PURE__ */ lr(d), p = J.forwardRef(
    (h, y) => {
      const { scope: b, children: v, ...x } = h, T = J.useRef(null), w = _e(y, T), k = s(d, b);
      return J.useEffect(() => (k.itemMap.set(T, { ref: T, ...x }), () => void k.itemMap.delete(T))), /* @__PURE__ */ m(f, { [u]: "", ref: w, children: v });
    }
  );
  p.displayName = d;
  function g(h) {
    const y = s(e + "CollectionConsumer", h);
    return J.useCallback(() => {
      const v = y.collectionRef.current;
      if (!v) return [];
      const x = Array.from(v.querySelectorAll(`[${u}]`));
      return Array.from(y.itemMap.values()).sort(
        (k, D) => x.indexOf(k.ref.current) - x.indexOf(D.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    g,
    r
  ];
}
var rv = M.createContext(void 0);
function Sl(e) {
  const t = M.useContext(rv);
  return e || t || "ltr";
}
function Nt(e) {
  const t = M.useRef(e);
  return M.useEffect(() => {
    t.current = e;
  }), M.useMemo(() => (...n) => t.current?.(...n), []);
}
function ov(e, t = globalThis?.document) {
  const n = Nt(e);
  M.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var sv = "DismissableLayer", $s = "dismissableLayer.update", av = "dismissableLayer.pointerDownOutside", iv = "dismissableLayer.focusOutside", Ii, Tl = M.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ca = M.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = M.useContext(Tl), [d, u] = M.useState(null), f = d?.ownerDocument ?? globalThis?.document, [, p] = M.useState({}), g = _e(t, (D) => u(D)), h = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = h.indexOf(y), v = d ? h.indexOf(d) : -1, x = l.layersWithOutsidePointerEventsDisabled.size > 0, T = v >= b, w = dv((D) => {
      const C = D.target, S = [...l.branches].some((E) => E.contains(C));
      !T || S || (o?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f), k = uv((D) => {
      const C = D.target;
      [...l.branches].some((E) => E.contains(C)) || (s?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f);
    return ov((D) => {
      v === l.layers.size - 1 && (r?.(D), !D.defaultPrevented && a && (D.preventDefault(), a()));
    }, f), M.useEffect(() => {
      if (d)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Ii = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), Pi(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Ii);
        };
    }, [d, f, n, l]), M.useEffect(() => () => {
      d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), Pi());
    }, [d, l]), M.useEffect(() => {
      const D = () => p({});
      return document.addEventListener($s, D), () => document.removeEventListener($s, D);
    }, []), /* @__PURE__ */ m(
      Pe.div,
      {
        ...c,
        ref: g,
        style: {
          pointerEvents: x ? T ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ue(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: ue(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: ue(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
Ca.displayName = sv;
var cv = "DismissableLayerBranch", lv = M.forwardRef((e, t) => {
  const n = M.useContext(Tl), r = M.useRef(null), o = _e(t, r);
  return M.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ m(Pe.div, { ...e, ref: o });
});
lv.displayName = cv;
function dv(e, t = globalThis?.document) {
  const n = Nt(e), r = M.useRef(!1), o = M.useRef(() => {
  });
  return M.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          El(
            av,
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
function uv(e, t = globalThis?.document) {
  const n = Nt(e), r = M.useRef(!1);
  return M.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && El(iv, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Pi() {
  const e = new CustomEvent($s);
  document.dispatchEvent(e);
}
function El(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Cl(o, s) : o.dispatchEvent(s);
}
var ds = 0;
function fv() {
  M.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Oi()), document.body.insertAdjacentElement("beforeend", e[1] ?? Oi()), ds++, () => {
      ds === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), ds--;
    };
  }, []);
}
function Oi() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var us = "focusScope.autoFocusOnMount", fs = "focusScope.autoFocusOnUnmount", _i = { bubbles: !1, cancelable: !0 }, mv = "FocusScope", Dl = M.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = M.useState(null), l = Nt(o), d = Nt(s), u = M.useRef(null), f = _e(t, (h) => c(h)), p = M.useRef({
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
      let h = function(x) {
        if (p.paused || !a) return;
        const T = x.target;
        a.contains(T) ? u.current = T : Bt(u.current, { select: !0 });
      }, y = function(x) {
        if (p.paused || !a) return;
        const T = x.relatedTarget;
        T !== null && (a.contains(T) || Bt(u.current, { select: !0 }));
      }, b = function(x) {
        if (document.activeElement === document.body)
          for (const w of x)
            w.removedNodes.length > 0 && Bt(a);
      };
      document.addEventListener("focusin", h), document.addEventListener("focusout", y);
      const v = new MutationObserver(b);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", h), document.removeEventListener("focusout", y), v.disconnect();
      };
    }
  }, [r, a, p.paused]), M.useEffect(() => {
    if (a) {
      Hi.add(p);
      const h = document.activeElement;
      if (!a.contains(h)) {
        const b = new CustomEvent(us, _i);
        a.addEventListener(us, l), a.dispatchEvent(b), b.defaultPrevented || (pv(bv(Nl(a)), { select: !0 }), document.activeElement === h && Bt(a));
      }
      return () => {
        a.removeEventListener(us, l), setTimeout(() => {
          const b = new CustomEvent(fs, _i);
          a.addEventListener(fs, d), a.dispatchEvent(b), b.defaultPrevented || Bt(h ?? document.body, { select: !0 }), a.removeEventListener(fs, d), Hi.remove(p);
        }, 0);
      };
    }
  }, [a, l, d, p]);
  const g = M.useCallback(
    (h) => {
      if (!n && !r || p.paused) return;
      const y = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey, b = document.activeElement;
      if (y && b) {
        const v = h.currentTarget, [x, T] = hv(v);
        x && T ? !h.shiftKey && b === T ? (h.preventDefault(), n && Bt(x, { select: !0 })) : h.shiftKey && b === x && (h.preventDefault(), n && Bt(T, { select: !0 })) : b === v && h.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ m(Pe.div, { tabIndex: -1, ...i, ref: f, onKeyDown: g });
});
Dl.displayName = mv;
function pv(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Bt(r, { select: t }), document.activeElement !== n) return;
}
function hv(e) {
  const t = Nl(e), n = $i(t, e), r = $i(t.reverse(), e);
  return [n, r];
}
function Nl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function $i(e, t) {
  for (const n of e)
    if (!gv(n, { upTo: t })) return n;
}
function gv(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function yv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Bt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && yv(e) && t && e.select();
  }
}
var Hi = vv();
function vv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Wi(e, t), e.unshift(t);
    },
    remove(t) {
      e = Wi(e, t), e[0]?.resume();
    }
  };
}
function Wi(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function bv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var wv = M[" useId ".trim().toString()] || (() => {
}), xv = 0;
function io(e) {
  const [t, n] = M.useState(wv());
  return Yt(() => {
    n((r) => r ?? String(xv++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const kv = ["top", "right", "bottom", "left"], jt = Math.min, Ve = Math.max, co = Math.round, jr = Math.floor, ut = (e) => ({
  x: e,
  y: e
}), Cv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Mv = {
  start: "end",
  end: "start"
};
function Hs(e, t, n) {
  return Ve(e, jt(t, n));
}
function At(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Rt(e) {
  return e.split("-")[0];
}
function Fn(e) {
  return e.split("-")[1];
}
function Ma(e) {
  return e === "x" ? "y" : "x";
}
function Sa(e) {
  return e === "y" ? "height" : "width";
}
const Sv = /* @__PURE__ */ new Set(["top", "bottom"]);
function lt(e) {
  return Sv.has(Rt(e)) ? "y" : "x";
}
function Ta(e) {
  return Ma(lt(e));
}
function Tv(e, t, n) {
  n === void 0 && (n = !1);
  const r = Fn(e), o = Ta(e), s = Sa(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = lo(i)), [i, lo(i)];
}
function Ev(e) {
  const t = lo(e);
  return [Ws(e), t, Ws(t)];
}
function Ws(e) {
  return e.replace(/start|end/g, (t) => Mv[t]);
}
const zi = ["left", "right"], Bi = ["right", "left"], Dv = ["top", "bottom"], Nv = ["bottom", "top"];
function Av(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Bi : zi : t ? zi : Bi;
    case "left":
    case "right":
      return t ? Dv : Nv;
    default:
      return [];
  }
}
function Rv(e, t, n, r) {
  const o = Fn(e);
  let s = Av(Rt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(Ws)))), s;
}
function lo(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Cv[t]);
}
function Lv(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Al(e) {
  return typeof e != "number" ? Lv(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function uo(e) {
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
function Fi(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = lt(t), i = Ta(t), a = Sa(i), c = Rt(t), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
  switch (Fn(t)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const Iv = async (e, t, n) => {
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
  } = Fi(l, r, c), f = r, p = {}, g = 0;
  for (let h = 0; h < a.length; h++) {
    const {
      name: y,
      fn: b
    } = a[h], {
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
    } = Fi(l, f, c)), h = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function dr(e, t) {
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
  } = At(t, e), g = Al(p), y = a[f ? u === "floating" ? "reference" : "floating" : u], b = uo(await s.getClippingRect({
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
  }, w = uo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
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
const Pv = (e) => ({
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
    } = At(e, t) || {};
    if (l == null)
      return {};
    const u = Al(d), f = {
      x: n,
      y: r
    }, p = Ta(o), g = Sa(p), h = await i.getDimensions(l), y = p === "y", b = y ? "top" : "left", v = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", T = s.reference[g] + s.reference[p] - f[p] - s.floating[g], w = f[p] - s.reference[p], k = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let D = k ? k[x] : 0;
    (!D || !await (i.isElement == null ? void 0 : i.isElement(k))) && (D = a.floating[x] || s.floating[g]);
    const C = T / 2 - w / 2, S = D / 2 - h[g] / 2 - 1, E = jt(u[b], S), N = jt(u[v], S), A = E, P = D - h[g] - N, O = D / 2 - h[g] / 2 + C, H = Hs(A, O, P), B = !c.arrow && Fn(o) != null && O !== H && s.reference[g] / 2 - (O < A ? E : N) - h[g] / 2 < 0, q = B ? O < A ? O - A : O - P : 0;
    return {
      [p]: f[p] + q,
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
}), Ov = function(e) {
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
        flipAlignment: h = !0,
        ...y
      } = At(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = Rt(o), v = lt(a), x = Rt(a) === a, T = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), w = f || (x || !h ? [lo(a)] : Ev(a)), k = g !== "none";
      !f && k && w.push(...Rv(a, h, g, T));
      const D = [a, ...w], C = await dr(t, y), S = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && S.push(C[b]), u) {
        const O = Tv(o, i, T);
        S.push(C[O[0]], C[O[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: S
      }], !S.every((O) => O <= 0)) {
        var N, A;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, H = D[O];
        if (H && (!(u === "alignment" ? v !== lt(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        E.every((I) => lt(I.placement) === v ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: E
            },
            reset: {
              placement: H
            }
          };
        let B = (A = E.filter((q) => q.overflows[0] <= 0).sort((q, I) => q.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!B)
          switch (p) {
            case "bestFit": {
              var P;
              const q = (P = E.filter((I) => {
                if (k) {
                  const L = lt(I.placement);
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
function Ui(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Yi(e) {
  return kv.some((t) => e[t] >= 0);
}
const _v = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = At(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await dr(t, {
            ...o,
            elementContext: "reference"
          }), i = Ui(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Yi(i)
            }
          };
        }
        case "escaped": {
          const s = await dr(t, {
            ...o,
            altBoundary: !0
          }), i = Ui(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Yi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Rl = /* @__PURE__ */ new Set(["left", "top"]);
async function $v(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Rt(n), a = Fn(n), c = lt(n) === "y", l = Rl.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = At(t, e);
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
const Hv = function(e) {
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
      } = t, c = await $v(t, e);
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
}, Wv = function(e) {
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
      } = At(e, t), l = {
        x: n,
        y: r
      }, d = await dr(t, c), u = lt(Rt(o)), f = Ma(u);
      let p = l[f], g = l[u];
      if (s) {
        const y = f === "y" ? "top" : "left", b = f === "y" ? "bottom" : "right", v = p + d[y], x = p - d[b];
        p = Hs(v, p, x);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", b = u === "y" ? "bottom" : "right", v = g + d[y], x = g - d[b];
        g = Hs(v, g, x);
      }
      const h = a.fn({
        ...t,
        [f]: p,
        [u]: g
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - r,
          enabled: {
            [f]: s,
            [u]: i
          }
        }
      };
    }
  };
}, zv = function(e) {
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
      } = At(e, t), d = {
        x: n,
        y: r
      }, u = lt(o), f = Ma(u);
      let p = d[f], g = d[u];
      const h = At(a, t), y = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const x = f === "y" ? "height" : "width", T = s.reference[f] - s.floating[x] + y.mainAxis, w = s.reference[f] + s.reference[x] - y.mainAxis;
        p < T ? p = T : p > w && (p = w);
      }
      if (l) {
        var b, v;
        const x = f === "y" ? "width" : "height", T = Rl.has(Rt(o)), w = s.reference[u] - s.floating[x] + (T && ((b = i.offset) == null ? void 0 : b[u]) || 0) + (T ? 0 : y.crossAxis), k = s.reference[u] + s.reference[x] + (T ? 0 : ((v = i.offset) == null ? void 0 : v[u]) || 0) - (T ? y.crossAxis : 0);
        g < w ? g = w : g > k && (g = k);
      }
      return {
        [f]: p,
        [u]: g
      };
    }
  };
}, Bv = function(e) {
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
      } = At(e, t), d = await dr(t, l), u = Rt(o), f = Fn(o), p = lt(o) === "y", {
        width: g,
        height: h
      } = s.floating;
      let y, b;
      u === "top" || u === "bottom" ? (y = u, b = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = u, y = f === "end" ? "top" : "bottom");
      const v = h - d.top - d.bottom, x = g - d.left - d.right, T = jt(h - d[y], v), w = jt(g - d[b], x), k = !t.middlewareData.shift;
      let D = T, C = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (C = x), (r = t.middlewareData.shift) != null && r.enabled.y && (D = v), k && !f) {
        const E = Ve(d.left, 0), N = Ve(d.right, 0), A = Ve(d.top, 0), P = Ve(d.bottom, 0);
        p ? C = g - 2 * (E !== 0 || N !== 0 ? E + N : Ve(d.left, d.right)) : D = h - 2 * (A !== 0 || P !== 0 ? A + P : Ve(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: C,
        availableHeight: D
      });
      const S = await i.getDimensions(a.floating);
      return g !== S.width || h !== S.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Do() {
  return typeof window < "u";
}
function Un(e) {
  return Ll(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ke(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function pt(e) {
  var t;
  return (t = (Ll(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ll(e) {
  return Do() ? e instanceof Node || e instanceof Ke(e).Node : !1;
}
function tt(e) {
  return Do() ? e instanceof Element || e instanceof Ke(e).Element : !1;
}
function ft(e) {
  return Do() ? e instanceof HTMLElement || e instanceof Ke(e).HTMLElement : !1;
}
function ji(e) {
  return !Do() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ke(e).ShadowRoot;
}
const Fv = /* @__PURE__ */ new Set(["inline", "contents"]);
function vr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = nt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Fv.has(o);
}
const Uv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Yv(e) {
  return Uv.has(Un(e));
}
const jv = [":popover-open", ":modal"];
function No(e) {
  return jv.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Vv = ["transform", "translate", "scale", "rotate", "perspective"], Kv = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Gv = ["paint", "layout", "strict", "content"];
function Ea(e) {
  const t = Da(), n = tt(e) ? nt(e) : e;
  return Vv.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Kv.some((r) => (n.willChange || "").includes(r)) || Gv.some((r) => (n.contain || "").includes(r));
}
function qv(e) {
  let t = Vt(e);
  for (; ft(t) && !Ln(t); ) {
    if (Ea(t))
      return t;
    if (No(t))
      return null;
    t = Vt(t);
  }
  return null;
}
function Da() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Xv = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Ln(e) {
  return Xv.has(Un(e));
}
function nt(e) {
  return Ke(e).getComputedStyle(e);
}
function Ao(e) {
  return tt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Vt(e) {
  if (Un(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ji(e) && e.host || // Fallback.
    pt(e)
  );
  return ji(t) ? t.host : t;
}
function Il(e) {
  const t = Vt(e);
  return Ln(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ft(t) && vr(t) ? t : Il(t);
}
function ur(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Il(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Ke(o);
  if (s) {
    const a = zs(i);
    return t.concat(i, i.visualViewport || [], vr(o) ? o : [], a && n ? ur(a) : []);
  }
  return t.concat(o, ur(o, [], n));
}
function zs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Pl(e) {
  const t = nt(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ft(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = co(n) !== s || co(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function Na(e) {
  return tt(e) ? e : e.contextElement;
}
function En(e) {
  const t = Na(e);
  if (!ft(t))
    return ut(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Pl(t);
  let i = (s ? co(n.width) : n.width) / r, a = (s ? co(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Zv = /* @__PURE__ */ ut(0);
function Ol(e) {
  const t = Ke(e);
  return !Da() || !t.visualViewport ? Zv : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Qv(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ke(e) ? !1 : t;
}
function nn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = Na(e);
  let i = ut(1);
  t && (r ? tt(r) && (i = En(r)) : i = En(e));
  const a = Qv(s, n, r) ? Ol(s) : ut(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = Ke(s), p = r && tt(r) ? Ke(r) : r;
    let g = f, h = zs(g);
    for (; h && r && p !== g; ) {
      const y = En(h), b = h.getBoundingClientRect(), v = nt(h), x = b.left + (h.clientLeft + parseFloat(v.paddingLeft)) * y.x, T = b.top + (h.clientTop + parseFloat(v.paddingTop)) * y.y;
      c *= y.x, l *= y.y, d *= y.x, u *= y.y, c += x, l += T, g = Ke(h), h = zs(g);
    }
  }
  return uo({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function Ro(e, t) {
  const n = Ao(e).scrollLeft;
  return t ? t.left + n : nn(pt(e)).left + n;
}
function _l(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Ro(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Jv(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = pt(r), a = t ? No(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = ut(1);
  const d = ut(0), u = ft(r);
  if ((u || !u && !s) && ((Un(r) !== "body" || vr(i)) && (c = Ao(r)), ft(r))) {
    const p = nn(r);
    l = En(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? _l(i, c) : ut(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + f.y
  };
}
function eb(e) {
  return Array.from(e.getClientRects());
}
function tb(e) {
  const t = pt(e), n = Ao(e), r = e.ownerDocument.body, o = Ve(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Ve(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Ro(e);
  const a = -n.scrollTop;
  return nt(r).direction === "rtl" && (i += Ve(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const Vi = 25;
function nb(e, t) {
  const n = Ke(e), r = pt(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = Da();
    (!d || d && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = Ro(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(r.clientWidth - u.clientWidth - p);
    g <= Vi && (s -= g);
  } else l <= Vi && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const rb = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ob(e, t) {
  const n = nn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = ft(e) ? En(e) : ut(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function Ki(e, t, n) {
  let r;
  if (t === "viewport")
    r = nb(e, n);
  else if (t === "document")
    r = tb(pt(e));
  else if (tt(t))
    r = ob(t, n);
  else {
    const o = Ol(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return uo(r);
}
function $l(e, t) {
  const n = Vt(e);
  return n === t || !tt(n) || Ln(n) ? !1 : nt(n).position === "fixed" || $l(n, t);
}
function sb(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = ur(e, [], !1).filter((a) => tt(a) && Un(a) !== "body"), o = null;
  const s = nt(e).position === "fixed";
  let i = s ? Vt(e) : e;
  for (; tt(i) && !Ln(i); ) {
    const a = nt(i), c = Ea(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && rb.has(o.position) || vr(i) && !c && $l(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = Vt(i);
  }
  return t.set(e, r), r;
}
function ab(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? No(t) ? [] : sb(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, d) => {
    const u = Ki(t, d, o);
    return l.top = Ve(u.top, l.top), l.right = jt(u.right, l.right), l.bottom = jt(u.bottom, l.bottom), l.left = Ve(u.left, l.left), l;
  }, Ki(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function ib(e) {
  const {
    width: t,
    height: n
  } = Pl(e);
  return {
    width: t,
    height: n
  };
}
function cb(e, t, n) {
  const r = ft(t), o = pt(t), s = n === "fixed", i = nn(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = ut(0);
  function l() {
    c.x = Ro(o);
  }
  if (r || !r && !s)
    if ((Un(t) !== "body" || vr(o)) && (a = Ao(t)), r) {
      const p = nn(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? _l(o, a) : ut(0), u = i.left + a.scrollLeft - c.x - d.x, f = i.top + a.scrollTop - c.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function ms(e) {
  return nt(e).position === "static";
}
function Gi(e, t) {
  if (!ft(e) || nt(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return pt(e) === n && (n = n.ownerDocument.body), n;
}
function Hl(e, t) {
  const n = Ke(e);
  if (No(e))
    return n;
  if (!ft(e)) {
    let o = Vt(e);
    for (; o && !Ln(o); ) {
      if (tt(o) && !ms(o))
        return o;
      o = Vt(o);
    }
    return n;
  }
  let r = Gi(e, t);
  for (; r && Yv(r) && ms(r); )
    r = Gi(r, t);
  return r && Ln(r) && ms(r) && !Ea(r) ? n : r || qv(e) || n;
}
const lb = async function(e) {
  const t = this.getOffsetParent || Hl, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: cb(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function db(e) {
  return nt(e).direction === "rtl";
}
const ub = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Jv,
  getDocumentElement: pt,
  getClippingRect: ab,
  getOffsetParent: Hl,
  getElementRects: lb,
  getClientRects: eb,
  getDimensions: ib,
  getScale: En,
  isElement: tt,
  isRTL: db
};
function Wl(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function fb(e, t) {
  let n = null, r;
  const o = pt(e);
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
    const g = jr(u), h = jr(o.clientWidth - (d + f)), y = jr(o.clientHeight - (u + p)), b = jr(d), x = {
      rootMargin: -g + "px " + -h + "px " + -y + "px " + -b + "px",
      threshold: Ve(0, jt(1, c)) || 1
    };
    let T = !0;
    function w(k) {
      const D = k[0].intersectionRatio;
      if (D !== c) {
        if (!T)
          return i();
        D ? i(!1, D) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !Wl(l, e.getBoundingClientRect()) && i(), T = !1;
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
function mb(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Na(e), d = o || s ? [...l ? ur(l) : [], ...ur(t)] : [];
  d.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const u = l && a ? fb(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = p) == null || x.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let g, h = c ? nn(e) : null;
  c && y();
  function y() {
    const b = nn(e);
    h && !Wl(h, b) && n(), h = b, g = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    d.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), u?.(), (b = p) == null || b.disconnect(), p = null, c && cancelAnimationFrame(g);
  };
}
const pb = Hv, hb = Wv, gb = Ov, yb = Bv, vb = _v, qi = Pv, bb = zv, wb = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: ub,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Iv(e, t, {
    ...o,
    platform: s
  });
};
var xb = typeof document < "u", kb = function() {
}, ro = xb ? xo : kb;
function fo(e, t) {
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
        if (!fo(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !fo(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function zl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Xi(e, t) {
  const n = zl(e);
  return Math.round(t * n) / n;
}
function ps(e) {
  const t = M.useRef(e);
  return ro(() => {
    t.current = e;
  }), t;
}
function Cb(e) {
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
  fo(f, r) || p(r);
  const [g, h] = M.useState(null), [y, b] = M.useState(null), v = M.useCallback((I) => {
    I !== k.current && (k.current = I, h(I));
  }, []), x = M.useCallback((I) => {
    I !== D.current && (D.current = I, b(I));
  }, []), T = s || g, w = i || y, k = M.useRef(null), D = M.useRef(null), C = M.useRef(d), S = c != null, E = ps(c), N = ps(o), A = ps(l), P = M.useCallback(() => {
    if (!k.current || !D.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    N.current && (I.platform = N.current), wb(k.current, D.current, I).then((L) => {
      const U = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      O.current && !fo(C.current, U) && (C.current = U, Ic.flushSync(() => {
        u(U);
      }));
    });
  }, [f, t, n, N, A]);
  ro(() => {
    l === !1 && C.current.isPositioned && (C.current.isPositioned = !1, u((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const O = M.useRef(!1);
  ro(() => (O.current = !0, () => {
    O.current = !1;
  }), []), ro(() => {
    if (T && (k.current = T), w && (D.current = w), T && w) {
      if (E.current)
        return E.current(T, w, P);
      P();
    }
  }, [T, w, P, E, S]);
  const H = M.useMemo(() => ({
    reference: k,
    floating: D,
    setReference: v,
    setFloating: x
  }), [v, x]), B = M.useMemo(() => ({
    reference: T,
    floating: w
  }), [T, w]), q = M.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!B.floating)
      return I;
    const L = Xi(B.floating, d.x), U = Xi(B.floating, d.y);
    return a ? {
      ...I,
      transform: "translate(" + L + "px, " + U + "px)",
      ...zl(B.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: U
    };
  }, [n, a, B.floating, d.x, d.y]);
  return M.useMemo(() => ({
    ...d,
    update: P,
    refs: H,
    elements: B,
    floatingStyles: q
  }), [d, P, H, B, q]);
}
const Mb = (e) => {
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
      return r && t(r) ? r.current != null ? qi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? qi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Sb = (e, t) => ({
  ...pb(e),
  options: [e, t]
}), Tb = (e, t) => ({
  ...hb(e),
  options: [e, t]
}), Eb = (e, t) => ({
  ...bb(e),
  options: [e, t]
}), Db = (e, t) => ({
  ...gb(e),
  options: [e, t]
}), Nb = (e, t) => ({
  ...yb(e),
  options: [e, t]
}), Ab = (e, t) => ({
  ...vb(e),
  options: [e, t]
}), Rb = (e, t) => ({
  ...Mb(e),
  options: [e, t]
});
var Lb = "Arrow", Bl = M.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ m(
    Pe.svg,
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
Bl.displayName = Lb;
var Ib = Bl;
function Pb(e) {
  const [t, n] = M.useState(void 0);
  return Yt(() => {
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
var Aa = "Popper", [Fl, Lo] = Bn(Aa), [Ob, Ul] = Fl(Aa), Yl = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = M.useState(null);
  return /* @__PURE__ */ m(Ob, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Yl.displayName = Aa;
var jl = "PopperAnchor", Vl = M.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Ul(jl, n), i = M.useRef(null), a = _e(t, i), c = M.useRef(null);
    return M.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ m(Pe.div, { ...o, ref: a });
  }
);
Vl.displayName = jl;
var Ra = "PopperContent", [_b, $b] = Fl(Ra), Kl = M.forwardRef(
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
      ...h
    } = e, y = Ul(Ra, n), [b, v] = M.useState(null), x = _e(t, (j) => v(j)), [T, w] = M.useState(null), k = Pb(T), D = k?.width ?? 0, C = k?.height ?? 0, S = r + (s !== "center" ? "-" + s : ""), E = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, N = Array.isArray(l) ? l : [l], A = N.length > 0, P = {
      padding: E,
      boundary: N.filter(Wb),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: O, floatingStyles: H, placement: B, isPositioned: q, middlewareData: I } = Cb({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: S,
      whileElementsMounted: (...j) => mb(...j, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Sb({ mainAxis: o + C, alignmentAxis: i }),
        c && Tb({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? Eb() : void 0,
          ...P
        }),
        c && Db({ ...P }),
        Nb({
          ...P,
          apply: ({ elements: j, rects: ee, availableWidth: me, availableHeight: pe }) => {
            const { width: Me, height: Le } = ee.reference, qe = j.floating.style;
            qe.setProperty("--radix-popper-available-width", `${me}px`), qe.setProperty("--radix-popper-available-height", `${pe}px`), qe.setProperty("--radix-popper-anchor-width", `${Me}px`), qe.setProperty("--radix-popper-anchor-height", `${Le}px`);
          }
        }),
        T && Rb({ element: T, padding: a }),
        zb({ arrowWidth: D, arrowHeight: C }),
        f && Ab({ strategy: "referenceHidden", ...P })
      ]
    }), [L, U] = Xl(B), X = Nt(g);
    Yt(() => {
      q && X?.();
    }, [q, X]);
    const G = I.arrow?.x, Z = I.arrow?.y, te = I.arrow?.centerOffset !== 0, [$, z] = M.useState();
    return Yt(() => {
      b && z(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ m(
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
        children: /* @__PURE__ */ m(
          _b,
          {
            scope: n,
            placedSide: L,
            onArrowChange: w,
            arrowX: G,
            arrowY: Z,
            shouldHideArrow: te,
            children: /* @__PURE__ */ m(
              Pe.div,
              {
                "data-side": L,
                "data-align": U,
                ...h,
                ref: x,
                style: {
                  ...h.style,
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
Kl.displayName = Ra;
var Gl = "PopperArrow", Hb = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ql = M.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = $b(Gl, r), i = Hb[s.placedSide];
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
          Ib,
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
ql.displayName = Gl;
function Wb(e) {
  return e !== null;
}
var zb = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, d] = Xl(n), u = { start: "0%", center: "50%", end: "100%" }[d], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let g = "", h = "";
    return l === "bottom" ? (g = i ? u : `${f}px`, h = `${-c}px`) : l === "top" ? (g = i ? u : `${f}px`, h = `${r.floating.height + c}px`) : l === "right" ? (g = `${-c}px`, h = i ? u : `${p}px`) : l === "left" && (g = `${r.floating.width + c}px`, h = i ? u : `${p}px`), { data: { x: g, y: h } };
  }
});
function Xl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Zl = Yl, Ql = Vl, Jl = Kl, ed = ql, Bb = "Portal", La = M.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = M.useState(!1);
  Yt(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? Jf.createPortal(/* @__PURE__ */ m(Pe.div, { ...r, ref: t }), i) : null;
});
La.displayName = Bb;
function Fb(e, t) {
  return M.useReducer((n, r) => t[n][r] ?? n, e);
}
var rn = (e) => {
  const { present: t, children: n } = e, r = Ub(t), o = typeof n == "function" ? n({ present: r.isPresent }) : M.Children.only(n), s = _e(r.ref, Yb(o));
  return typeof n == "function" || r.isPresent ? M.cloneElement(o, { ref: s }) : null;
};
rn.displayName = "Presence";
function Ub(e) {
  const [t, n] = M.useState(), r = M.useRef(null), o = M.useRef(e), s = M.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = Fb(i, {
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
    const l = Vr(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), Yt(() => {
    const l = r.current, d = o.current;
    if (d !== e) {
      const f = s.current, p = Vr(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(d && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Yt(() => {
    if (t) {
      let l;
      const d = t.ownerDocument.defaultView ?? window, u = (p) => {
        const h = Vr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && h && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Vr(r.current));
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
function Vr(e) {
  return e?.animationName || "none";
}
function Yb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var hs = "rovingFocusGroup.onEntryFocus", jb = { bubbles: !1, cancelable: !0 }, br = "RovingFocusGroup", [Bs, td, Vb] = Ml(br), [Kb, nd] = Bn(
  br,
  [Vb]
), [Gb, qb] = Kb(br), rd = M.forwardRef(
  (e, t) => /* @__PURE__ */ m(Bs.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(Bs.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(Xb, { ...e, ref: t }) }) })
);
rd.displayName = br;
var Xb = M.forwardRef((e, t) => {
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
  } = e, f = M.useRef(null), p = _e(t, f), g = Sl(s), [h, y] = ka({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: br
  }), [b, v] = M.useState(!1), x = Nt(l), T = td(n), w = M.useRef(!1), [k, D] = M.useState(0);
  return M.useEffect(() => {
    const C = f.current;
    if (C)
      return C.addEventListener(hs, x), () => C.removeEventListener(hs, x);
  }, [x]), /* @__PURE__ */ m(
    Gb,
    {
      scope: n,
      orientation: r,
      dir: g,
      loop: o,
      currentTabStopId: h,
      onItemFocus: M.useCallback(
        (C) => y(C),
        [y]
      ),
      onItemShiftTab: M.useCallback(() => v(!0), []),
      onFocusableItemAdd: M.useCallback(
        () => D((C) => C + 1),
        []
      ),
      onFocusableItemRemove: M.useCallback(
        () => D((C) => C - 1),
        []
      ),
      children: /* @__PURE__ */ m(
        Pe.div,
        {
          tabIndex: b || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: ue(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: ue(e.onFocus, (C) => {
            const S = !w.current;
            if (C.target === C.currentTarget && S && !b) {
              const E = new CustomEvent(hs, jb);
              if (C.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
                const N = T().filter((B) => B.focusable), A = N.find((B) => B.active), P = N.find((B) => B.id === h), H = [A, P, ...N].filter(
                  Boolean
                ).map((B) => B.ref.current);
                ad(H, d);
              }
            }
            w.current = !1;
          }),
          onBlur: ue(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), od = "RovingFocusGroupItem", sd = M.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = io(), l = s || c, d = qb(od, n), u = d.currentTabStopId === l, f = td(n), { onFocusableItemAdd: p, onFocusableItemRemove: g, currentTabStopId: h } = d;
    return M.useEffect(() => {
      if (r)
        return p(), () => g();
    }, [r, p, g]), /* @__PURE__ */ m(
      Bs.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ m(
          Pe.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...a,
            ref: t,
            onMouseDown: ue(e.onMouseDown, (y) => {
              r ? d.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: ue(e.onFocus, () => d.onItemFocus(l)),
            onKeyDown: ue(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const b = Jb(y, d.orientation, d.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let x = f().filter((T) => T.focusable).map((T) => T.ref.current);
                if (b === "last") x.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && x.reverse();
                  const T = x.indexOf(y.currentTarget);
                  x = d.loop ? ew(x, T + 1) : x.slice(T + 1);
                }
                setTimeout(() => ad(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: h != null }) : i
          }
        )
      }
    );
  }
);
sd.displayName = od;
var Zb = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Qb(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Jb(e, t, n) {
  const r = Qb(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Zb[r];
}
function ad(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function ew(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var tw = rd, nw = sd, rw = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, hn = /* @__PURE__ */ new WeakMap(), Kr = /* @__PURE__ */ new WeakMap(), Gr = {}, gs = 0, id = function(e) {
  return e && (e.host || id(e.parentNode));
}, ow = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = id(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, sw = function(e, t, n, r) {
  var o = ow(t, Array.isArray(e) ? e : [e]);
  Gr[n] || (Gr[n] = /* @__PURE__ */ new WeakMap());
  var s = Gr[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(u) {
    !u || a.has(u) || (a.add(u), l(u.parentNode));
  };
  o.forEach(l);
  var d = function(u) {
    !u || c.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (a.has(f))
        d(f);
      else
        try {
          var p = f.getAttribute(r), g = p !== null && p !== "false", h = (hn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          hn.set(f, h), s.set(f, y), i.push(f), h === 1 && g && Kr.set(f, !0), y === 1 && f.setAttribute(n, "true"), g || f.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(t), a.clear(), gs++, function() {
    i.forEach(function(u) {
      var f = hn.get(u) - 1, p = s.get(u) - 1;
      hn.set(u, f), s.set(u, p), f || (Kr.has(u) || u.removeAttribute(r), Kr.delete(u)), p || u.removeAttribute(n);
    }), gs--, gs || (hn = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap(), Kr = /* @__PURE__ */ new WeakMap(), Gr = {});
  };
}, aw = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = rw(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), sw(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, it = function() {
  return it = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, it.apply(this, arguments);
};
function cd(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function iw(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var oo = "right-scroll-bar-position", so = "width-before-scroll-bar", cw = "with-scroll-bars-hidden", lw = "--removed-body-scroll-bar-size";
function ys(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function dw(e, t) {
  var n = V(function() {
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
var uw = typeof window < "u" ? M.useLayoutEffect : M.useEffect, Zi = /* @__PURE__ */ new WeakMap();
function fw(e, t) {
  var n = dw(null, function(r) {
    return e.forEach(function(o) {
      return ys(o, r);
    });
  });
  return uw(function() {
    var r = Zi.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || ys(a, null);
      }), s.forEach(function(a) {
        o.has(a) || ys(a, i);
      });
    }
    Zi.set(n, e);
  }, [e]), n;
}
function mw(e) {
  return e;
}
function pw(e, t) {
  t === void 0 && (t = mw);
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
function hw(e) {
  e === void 0 && (e = {});
  var t = pw(null);
  return t.options = it({ async: !0, ssr: !1 }, e), t;
}
var ld = function(e) {
  var t = e.sideCar, n = cd(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return M.createElement(r, it({}, n));
};
ld.isSideCarExport = !0;
function gw(e, t) {
  return e.useMedium(t), ld;
}
var dd = hw(), vs = function() {
}, Io = M.forwardRef(function(e, t) {
  var n = M.useRef(null), r = M.useState({
    onScrollCapture: vs,
    onWheelCapture: vs,
    onTouchMoveCapture: vs
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, u = e.shards, f = e.sideCar, p = e.noRelative, g = e.noIsolation, h = e.inert, y = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, x = e.gapMode, T = cd(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, k = fw([n, t]), D = it(it({}, T), o);
  return M.createElement(
    M.Fragment,
    null,
    d && M.createElement(w, { sideCar: dd, removeScrollBar: l, shards: u, noRelative: p, noIsolation: g, inert: h, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: x }),
    i ? M.cloneElement(M.Children.only(a), it(it({}, D), { ref: k })) : M.createElement(v, it({}, D, { className: c, ref: k }), a)
  );
});
Io.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Io.classNames = {
  fullWidth: so,
  zeroRight: oo
};
var yw = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function vw() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = yw();
  return t && e.setAttribute("nonce", t), e;
}
function bw(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ww(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var xw = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = vw()) && (bw(t, n), ww(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, kw = function() {
  var e = xw();
  return function(t, n) {
    M.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, ud = function() {
  var e = kw(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Cw = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, bs = function(e) {
  return parseInt(e || "", 10) || 0;
}, Mw = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [bs(n), bs(r), bs(o)];
}, Sw = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Cw;
  var t = Mw(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Tw = ud(), Dn = "data-scroll-locked", Ew = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(cw, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(Dn, `] {
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
  
  .`).concat(oo, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(so, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(oo, " .").concat(oo, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(so, " .").concat(so, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Dn, `] {
    `).concat(lw, ": ").concat(a, `px;
  }
`);
}, Qi = function() {
  var e = parseInt(document.body.getAttribute(Dn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Dw = function() {
  M.useEffect(function() {
    return document.body.setAttribute(Dn, (Qi() + 1).toString()), function() {
      var e = Qi() - 1;
      e <= 0 ? document.body.removeAttribute(Dn) : document.body.setAttribute(Dn, e.toString());
    };
  }, []);
}, Nw = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Dw();
  var s = M.useMemo(function() {
    return Sw(o);
  }, [o]);
  return M.createElement(Tw, { styles: Ew(s, !t, o, n ? "" : "!important") });
}, Fs = !1;
if (typeof window < "u")
  try {
    var qr = Object.defineProperty({}, "passive", {
      get: function() {
        return Fs = !0, !0;
      }
    });
    window.addEventListener("test", qr, qr), window.removeEventListener("test", qr, qr);
  } catch {
    Fs = !1;
  }
var gn = Fs ? { passive: !1 } : !1, Aw = function(e) {
  return e.tagName === "TEXTAREA";
}, fd = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Aw(e) && n[t] === "visible")
  );
}, Rw = function(e) {
  return fd(e, "overflowY");
}, Lw = function(e) {
  return fd(e, "overflowX");
}, Ji = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = md(e, r);
    if (o) {
      var s = pd(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Iw = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Pw = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, md = function(e, t) {
  return e === "v" ? Rw(t) : Lw(t);
}, pd = function(e, t) {
  return e === "v" ? Iw(t) : Pw(t);
}, Ow = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, _w = function(e, t, n, r, o) {
  var s = Ow(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, d = i > 0, u = 0, f = 0;
  do {
    if (!a)
      break;
    var p = pd(e, a), g = p[0], h = p[1], y = p[2], b = h - y - s * g;
    (g || b) && md(e, a) && (u += b, f += g);
    var v = a.parentNode;
    a = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(f) < 1) && (l = !0), l;
}, Xr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ec = function(e) {
  return [e.deltaX, e.deltaY];
}, tc = function(e) {
  return e && "current" in e ? e.current : e;
}, $w = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Hw = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Ww = 0, yn = [];
function zw(e) {
  var t = M.useRef([]), n = M.useRef([0, 0]), r = M.useRef(), o = M.useState(Ww++)[0], s = M.useState(ud)[0], i = M.useRef(e);
  M.useEffect(function() {
    i.current = e;
  }, [e]), M.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var h = iw([e.lockRef.current], (e.shards || []).map(tc), !0).filter(Boolean);
      return h.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), h.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = M.useCallback(function(h, y) {
    if ("touches" in h && h.touches.length === 2 || h.type === "wheel" && h.ctrlKey)
      return !i.current.allowPinchZoom;
    var b = Xr(h), v = n.current, x = "deltaX" in h ? h.deltaX : v[0] - b[0], T = "deltaY" in h ? h.deltaY : v[1] - b[1], w, k = h.target, D = Math.abs(x) > Math.abs(T) ? "h" : "v";
    if ("touches" in h && D === "h" && k.type === "range")
      return !1;
    var C = Ji(D, k);
    if (!C)
      return !0;
    if (C ? w = D : (w = D === "v" ? "h" : "v", C = Ji(D, k)), !C)
      return !1;
    if (!r.current && "changedTouches" in h && (x || T) && (r.current = w), !w)
      return !0;
    var S = r.current || w;
    return _w(S, y, h, S === "h" ? x : T);
  }, []), c = M.useCallback(function(h) {
    var y = h;
    if (!(!yn.length || yn[yn.length - 1] !== s)) {
      var b = "deltaY" in y ? ec(y) : Xr(y), v = t.current.filter(function(w) {
        return w.name === y.type && (w.target === y.target || y.target === w.shadowParent) && $w(w.delta, b);
      })[0];
      if (v && v.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!v) {
        var x = (i.current.shards || []).map(tc).filter(Boolean).filter(function(w) {
          return w.contains(y.target);
        }), T = x.length > 0 ? a(y, x[0]) : !i.current.noIsolation;
        T && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = M.useCallback(function(h, y, b, v) {
    var x = { name: h, delta: y, target: b, should: v, shadowParent: Bw(b) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(T) {
        return T !== x;
      });
    }, 1);
  }, []), d = M.useCallback(function(h) {
    n.current = Xr(h), r.current = void 0;
  }, []), u = M.useCallback(function(h) {
    l(h.type, ec(h), h.target, a(h, e.lockRef.current));
  }, []), f = M.useCallback(function(h) {
    l(h.type, Xr(h), h.target, a(h, e.lockRef.current));
  }, []);
  M.useEffect(function() {
    return yn.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, gn), document.addEventListener("touchmove", c, gn), document.addEventListener("touchstart", d, gn), function() {
      yn = yn.filter(function(h) {
        return h !== s;
      }), document.removeEventListener("wheel", c, gn), document.removeEventListener("touchmove", c, gn), document.removeEventListener("touchstart", d, gn);
    };
  }, []);
  var p = e.removeScrollBar, g = e.inert;
  return M.createElement(
    M.Fragment,
    null,
    g ? M.createElement(s, { styles: Hw(o) }) : null,
    p ? M.createElement(Nw, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Bw(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Fw = gw(dd, zw);
var hd = M.forwardRef(function(e, t) {
  return M.createElement(Io, it({}, e, { ref: t, sideCar: Fw }));
});
hd.classNames = Io.classNames;
var Us = ["Enter", " "], Uw = ["ArrowDown", "PageUp", "Home"], gd = ["ArrowUp", "PageDown", "End"], Yw = [...Uw, ...gd], jw = {
  ltr: [...Us, "ArrowRight"],
  rtl: [...Us, "ArrowLeft"]
}, Vw = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, wr = "Menu", [fr, Kw, Gw] = Ml(wr), [on, yd] = Bn(wr, [
  Gw,
  Lo,
  nd
]), Po = Lo(), vd = nd(), [qw, sn] = on(wr), [Xw, xr] = on(wr), bd = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Po(t), [c, l] = M.useState(null), d = M.useRef(!1), u = Nt(s), f = Sl(o);
  return M.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(Zl, { ...a, children: /* @__PURE__ */ m(
    qw,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ m(
        Xw,
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
bd.displayName = wr;
var Zw = "MenuAnchor", Ia = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Po(n);
    return /* @__PURE__ */ m(Ql, { ...o, ...r, ref: t });
  }
);
Ia.displayName = Zw;
var Pa = "MenuPortal", [Qw, wd] = on(Pa, {
  forceMount: void 0
}), xd = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = sn(Pa, t);
  return /* @__PURE__ */ m(Qw, { scope: t, forceMount: n, children: /* @__PURE__ */ m(rn, { present: n || s.open, children: /* @__PURE__ */ m(La, { asChild: !0, container: o, children: r }) }) });
};
xd.displayName = Pa;
var Qe = "MenuContent", [Jw, Oa] = on(Qe), kd = M.forwardRef(
  (e, t) => {
    const n = wd(Qe, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = sn(Qe, e.__scopeMenu), i = xr(Qe, e.__scopeMenu);
    return /* @__PURE__ */ m(fr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(rn, { present: r || s.open, children: /* @__PURE__ */ m(fr.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ m(e0, { ...o, ref: t }) : /* @__PURE__ */ m(t0, { ...o, ref: t }) }) }) });
  }
), e0 = M.forwardRef(
  (e, t) => {
    const n = sn(Qe, e.__scopeMenu), r = M.useRef(null), o = _e(t, r);
    return M.useEffect(() => {
      const s = r.current;
      if (s) return aw(s);
    }, []), /* @__PURE__ */ m(
      _a,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: ue(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), t0 = M.forwardRef((e, t) => {
  const n = sn(Qe, e.__scopeMenu);
  return /* @__PURE__ */ m(
    _a,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), n0 = /* @__PURE__ */ lr("MenuContent.ScrollLock"), _a = M.forwardRef(
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
      ...h
    } = e, y = sn(Qe, n), b = xr(Qe, n), v = Po(n), x = vd(n), T = Kw(n), [w, k] = M.useState(null), D = M.useRef(null), C = _e(t, D, y.onContentChange), S = M.useRef(0), E = M.useRef(""), N = M.useRef(0), A = M.useRef(null), P = M.useRef("right"), O = M.useRef(0), H = g ? hd : M.Fragment, B = g ? { as: n0, allowPinchZoom: !0 } : void 0, q = (L) => {
      const U = E.current + L, X = T().filter((j) => !j.disabled), G = document.activeElement, Z = X.find((j) => j.ref.current === G)?.textValue, te = X.map((j) => j.textValue), $ = p0(te, U, Z), z = X.find((j) => j.textValue === $)?.ref.current;
      (function j(ee) {
        E.current = ee, window.clearTimeout(S.current), ee !== "" && (S.current = window.setTimeout(() => j(""), 1e3));
      })(U), z && setTimeout(() => z.focus());
    };
    M.useEffect(() => () => window.clearTimeout(S.current), []), fv();
    const I = M.useCallback((L) => P.current === A.current?.side && g0(L, A.current?.area), []);
    return /* @__PURE__ */ m(
      Jw,
      {
        scope: n,
        searchRef: E,
        onItemEnter: M.useCallback(
          (L) => {
            I(L) && L.preventDefault();
          },
          [I]
        ),
        onItemLeave: M.useCallback(
          (L) => {
            I(L) || (D.current?.focus(), k(null));
          },
          [I]
        ),
        onTriggerLeave: M.useCallback(
          (L) => {
            I(L) && L.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: N,
        onPointerGraceIntentChange: M.useCallback((L) => {
          A.current = L;
        }, []),
        children: /* @__PURE__ */ m(H, { ...B, children: /* @__PURE__ */ m(
          Dl,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: ue(s, (L) => {
              L.preventDefault(), D.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ m(
              Ca,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: d,
                onFocusOutside: u,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ m(
                  tw,
                  {
                    asChild: !0,
                    ...x,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: k,
                    onEntryFocus: ue(c, (L) => {
                      b.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ m(
                      Jl,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Hd(y.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...h,
                        ref: C,
                        style: { outline: "none", ...h.style },
                        onKeyDown: ue(h.onKeyDown, (L) => {
                          const X = L.target.closest("[data-radix-menu-content]") === L.currentTarget, G = L.ctrlKey || L.altKey || L.metaKey, Z = L.key.length === 1;
                          X && (L.key === "Tab" && L.preventDefault(), !G && Z && q(L.key));
                          const te = D.current;
                          if (L.target !== te || !Yw.includes(L.key)) return;
                          L.preventDefault();
                          const z = T().filter((j) => !j.disabled).map((j) => j.ref.current);
                          gd.includes(L.key) && z.reverse(), f0(z);
                        }),
                        onBlur: ue(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(S.current), E.current = "");
                        }),
                        onPointerMove: ue(
                          e.onPointerMove,
                          mr((L) => {
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
kd.displayName = Qe;
var r0 = "MenuGroup", $a = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Pe.div, { role: "group", ...r, ref: t });
  }
);
$a.displayName = r0;
var o0 = "MenuLabel", Cd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Pe.div, { ...r, ref: t });
  }
);
Cd.displayName = o0;
var mo = "MenuItem", nc = "menu.itemSelect", Oo = M.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = M.useRef(null), i = xr(mo, e.__scopeMenu), a = Oa(mo, e.__scopeMenu), c = _e(t, s), l = M.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const f = new CustomEvent(nc, { bubbles: !0, cancelable: !0 });
        u.addEventListener(nc, (p) => r?.(p), { once: !0 }), Cl(u, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ m(
      Md,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: ue(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), l.current = !0;
        },
        onPointerUp: ue(e.onPointerUp, (u) => {
          l.current || u.currentTarget?.click();
        }),
        onKeyDown: ue(e.onKeyDown, (u) => {
          const f = a.searchRef.current !== "";
          n || f && u.key === " " || Us.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
Oo.displayName = mo;
var Md = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = Oa(mo, n), a = vd(n), c = M.useRef(null), l = _e(t, c), [d, u] = M.useState(!1), [f, p] = M.useState("");
    return M.useEffect(() => {
      const g = c.current;
      g && p((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ m(
      fr.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ m(nw, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ m(
          Pe.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: ue(
              e.onPointerMove,
              mr((g) => {
                r ? i.onItemLeave(g) : (i.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ue(
              e.onPointerLeave,
              mr((g) => i.onItemLeave(g))
            ),
            onFocus: ue(e.onFocus, () => u(!0)),
            onBlur: ue(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), s0 = "MenuCheckboxItem", Sd = M.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(Ad, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
      Oo,
      {
        role: "menuitemcheckbox",
        "aria-checked": po(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": Wa(n),
        onSelect: ue(
          o.onSelect,
          () => r?.(po(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Sd.displayName = s0;
var Td = "MenuRadioGroup", [a0, i0] = on(
  Td,
  { value: void 0, onValueChange: () => {
  } }
), Ed = M.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = Nt(r);
    return /* @__PURE__ */ m(a0, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ m($a, { ...o, ref: t }) });
  }
);
Ed.displayName = Td;
var Dd = "MenuRadioItem", Nd = M.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = i0(Dd, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ m(Ad, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ m(
      Oo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": Wa(s),
        onSelect: ue(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Nd.displayName = Dd;
var Ha = "MenuItemIndicator", [Ad, c0] = on(
  Ha,
  { checked: !1 }
), Rd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = c0(Ha, n);
    return /* @__PURE__ */ m(
      rn,
      {
        present: r || po(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ m(
          Pe.span,
          {
            ...o,
            ref: t,
            "data-state": Wa(s.checked)
          }
        )
      }
    );
  }
);
Rd.displayName = Ha;
var l0 = "MenuSeparator", Ld = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(
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
Ld.displayName = l0;
var d0 = "MenuArrow", Id = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Po(n);
    return /* @__PURE__ */ m(ed, { ...o, ...r, ref: t });
  }
);
Id.displayName = d0;
var u0 = "MenuSub", [dC, Pd] = on(u0), nr = "MenuSubTrigger", Od = M.forwardRef(
  (e, t) => {
    const n = sn(nr, e.__scopeMenu), r = xr(nr, e.__scopeMenu), o = Pd(nr, e.__scopeMenu), s = Oa(nr, e.__scopeMenu), i = M.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, d = M.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return M.useEffect(() => d, [d]), M.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), c(null);
      };
    }, [a, c]), /* @__PURE__ */ m(Ia, { asChild: !0, ...l, children: /* @__PURE__ */ m(
      Md,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Hd(n.open),
        ...e,
        ref: To(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ue(
          e.onPointerMove,
          mr((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: ue(
          e.onPointerLeave,
          mr((u) => {
            d();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, g = p === "right", h = g ? -5 : 5, y = f[g ? "left" : "right"], b = f[g ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: u.clientX + h, y: u.clientY },
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
        onKeyDown: ue(e.onKeyDown, (u) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && u.key === " " || jw[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Od.displayName = nr;
var _d = "MenuSubContent", $d = M.forwardRef(
  (e, t) => {
    const n = wd(Qe, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = sn(Qe, e.__scopeMenu), i = xr(Qe, e.__scopeMenu), a = Pd(_d, e.__scopeMenu), c = M.useRef(null), l = _e(t, c);
    return /* @__PURE__ */ m(fr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(rn, { present: r || s.open, children: /* @__PURE__ */ m(fr.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
      _a,
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
        onFocusOutside: ue(e.onFocusOutside, (d) => {
          d.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: ue(e.onEscapeKeyDown, (d) => {
          i.onClose(), d.preventDefault();
        }),
        onKeyDown: ue(e.onKeyDown, (d) => {
          const u = d.currentTarget.contains(d.target), f = Vw[i.dir].includes(d.key);
          u && f && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
$d.displayName = _d;
function Hd(e) {
  return e ? "open" : "closed";
}
function po(e) {
  return e === "indeterminate";
}
function Wa(e) {
  return po(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function f0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function m0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function p0(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = m0(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function h0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function g0(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return h0(n, t);
}
function mr(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var y0 = bd, v0 = Ia, b0 = xd, w0 = kd, x0 = $a, k0 = Cd, C0 = Oo, M0 = Sd, S0 = Ed, T0 = Nd, E0 = Rd, D0 = Ld, N0 = Id, A0 = Od, R0 = $d, _o = "DropdownMenu", [L0] = Bn(
  _o,
  [yd]
), ze = yd(), [I0, Wd] = L0(_o), zd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = ze(t), l = M.useRef(null), [d, u] = ka({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: _o
  });
  return /* @__PURE__ */ m(
    I0,
    {
      scope: t,
      triggerId: io(),
      triggerRef: l,
      contentId: io(),
      open: d,
      onOpenChange: u,
      onOpenToggle: M.useCallback(() => u((f) => !f), [u]),
      modal: a,
      children: /* @__PURE__ */ m(y0, { ...c, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
zd.displayName = _o;
var Bd = "DropdownMenuTrigger", Fd = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = Wd(Bd, n), i = ze(n);
    return /* @__PURE__ */ m(v0, { asChild: !0, ...i, children: /* @__PURE__ */ m(
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
        ref: To(t, s.triggerRef),
        onPointerDown: ue(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: ue(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
Fd.displayName = Bd;
var P0 = "DropdownMenuPortal", Ud = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = ze(t);
  return /* @__PURE__ */ m(b0, { ...r, ...n });
};
Ud.displayName = P0;
var Yd = "DropdownMenuContent", jd = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Wd(Yd, n), s = ze(n), i = M.useRef(!1);
    return /* @__PURE__ */ m(
      w0,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: ue(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: ue(e.onInteractOutside, (a) => {
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
jd.displayName = Yd;
var O0 = "DropdownMenuGroup", _0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
    return /* @__PURE__ */ m(x0, { ...o, ...r, ref: t });
  }
);
_0.displayName = O0;
var $0 = "DropdownMenuLabel", H0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
    return /* @__PURE__ */ m(k0, { ...o, ...r, ref: t });
  }
);
H0.displayName = $0;
var W0 = "DropdownMenuItem", Vd = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
    return /* @__PURE__ */ m(C0, { ...o, ...r, ref: t });
  }
);
Vd.displayName = W0;
var z0 = "DropdownMenuCheckboxItem", B0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ m(M0, { ...o, ...r, ref: t });
});
B0.displayName = z0;
var F0 = "DropdownMenuRadioGroup", U0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ m(S0, { ...o, ...r, ref: t });
});
U0.displayName = F0;
var Y0 = "DropdownMenuRadioItem", j0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ m(T0, { ...o, ...r, ref: t });
});
j0.displayName = Y0;
var V0 = "DropdownMenuItemIndicator", K0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ m(E0, { ...o, ...r, ref: t });
});
K0.displayName = V0;
var G0 = "DropdownMenuSeparator", Kd = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ m(D0, { ...o, ...r, ref: t });
});
Kd.displayName = G0;
var q0 = "DropdownMenuArrow", X0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
    return /* @__PURE__ */ m(N0, { ...o, ...r, ref: t });
  }
);
X0.displayName = q0;
var Z0 = "DropdownMenuSubTrigger", Q0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ m(A0, { ...o, ...r, ref: t });
});
Q0.displayName = Z0;
var J0 = "DropdownMenuSubContent", ex = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ m(
    R0,
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
ex.displayName = J0;
var tx = zd, nx = Fd, rx = Ud, ox = jd, sx = Vd, ax = Kd;
function ws({
  ...e
}) {
  return /* @__PURE__ */ m(tx, { "data-slot": "dropdown-menu", ...e });
}
function xs({
  ...e
}) {
  return /* @__PURE__ */ m(
    nx,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function ks({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(rx, { children: /* @__PURE__ */ m(
    ox,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: le(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function Se({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ m(
    sx,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: le(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    }
  );
}
function Cs({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    ax,
    {
      "data-slot": "dropdown-menu-separator",
      className: le("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var ix = Object.freeze({
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
}), cx = "VisuallyHidden", Gd = M.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    Pe.span,
    {
      ...e,
      ref: t,
      style: { ...ix, ...e.style }
    }
  )
);
Gd.displayName = cx;
var lx = Gd, [$o] = Bn("Tooltip", [
  Lo
]), Ho = Lo(), qd = "TooltipProvider", dx = 700, Ys = "tooltip.open", [ux, za] = $o(qd), Xd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = dx,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = M.useRef(!0), a = M.useRef(!1), c = M.useRef(0);
  return M.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ m(
    ux,
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
Xd.displayName = qd;
var pr = "Tooltip", [fx, kr] = $o(pr), Zd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = za(pr, e.__scopeTooltip), l = Ho(t), [d, u] = M.useState(null), f = io(), p = M.useRef(0), g = i ?? c.disableHoverableContent, h = a ?? c.delayDuration, y = M.useRef(!1), [b, v] = ka({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Ys))) : c.onClose(), s?.(D);
    },
    caller: pr
  }), x = M.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), T = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, v(!0);
  }, [v]), w = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v(!1);
  }, [v]), k = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, v(!0), p.current = 0;
    }, h);
  }, [h, v]);
  return M.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ m(Zl, { ...l, children: /* @__PURE__ */ m(
    fx,
    {
      scope: t,
      contentId: f,
      open: b,
      stateAttribute: x,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: M.useCallback(() => {
        c.isOpenDelayedRef.current ? k() : T();
      }, [c.isOpenDelayedRef, k, T]),
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
Zd.displayName = pr;
var js = "TooltipTrigger", Qd = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = kr(js, n), s = za(js, n), i = Ho(n), a = M.useRef(null), c = _e(t, a, o.onTriggerChange), l = M.useRef(!1), d = M.useRef(!1), u = M.useCallback(() => l.current = !1, []);
    return M.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ m(Ql, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Pe.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: ue(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: ue(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: ue(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", u, { once: !0 });
        }),
        onFocus: ue(e.onFocus, () => {
          l.current || o.onOpen();
        }),
        onBlur: ue(e.onBlur, o.onClose),
        onClick: ue(e.onClick, o.onClose)
      }
    ) });
  }
);
Qd.displayName = js;
var Ba = "TooltipPortal", [mx, px] = $o(Ba, {
  forceMount: void 0
}), Jd = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = kr(Ba, t);
  return /* @__PURE__ */ m(mx, { scope: t, forceMount: n, children: /* @__PURE__ */ m(rn, { present: n || s.open, children: /* @__PURE__ */ m(La, { asChild: !0, container: o, children: r }) }) });
};
Jd.displayName = Ba;
var In = "TooltipContent", eu = M.forwardRef(
  (e, t) => {
    const n = px(In, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = kr(In, e.__scopeTooltip);
    return /* @__PURE__ */ m(rn, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ m(tu, { side: o, ...s, ref: t }) : /* @__PURE__ */ m(hx, { side: o, ...s, ref: t }) });
  }
), hx = M.forwardRef((e, t) => {
  const n = kr(In, e.__scopeTooltip), r = za(In, e.__scopeTooltip), o = M.useRef(null), s = _e(t, o), [i, a] = M.useState(null), { trigger: c, onClose: l } = n, d = o.current, { onPointerInTransitChange: u } = r, f = M.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = M.useCallback(
    (g, h) => {
      const y = g.currentTarget, b = { x: g.clientX, y: g.clientY }, v = bx(b, y.getBoundingClientRect()), x = wx(b, v), T = xx(h.getBoundingClientRect()), w = Cx([...x, ...T]);
      a(w), u(!0);
    },
    [u]
  );
  return M.useEffect(() => () => f(), [f]), M.useEffect(() => {
    if (c && d) {
      const g = (y) => p(y, d), h = (y) => p(y, c);
      return c.addEventListener("pointerleave", g), d.addEventListener("pointerleave", h), () => {
        c.removeEventListener("pointerleave", g), d.removeEventListener("pointerleave", h);
      };
    }
  }, [c, d, p, f]), M.useEffect(() => {
    if (i) {
      const g = (h) => {
        const y = h.target, b = { x: h.clientX, y: h.clientY }, v = c?.contains(y) || d?.contains(y), x = !kx(b, i);
        v ? f() : x && (f(), l());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [c, d, i, l, f]), /* @__PURE__ */ m(tu, { ...e, ref: s });
}), [gx, yx] = $o(pr, { isInside: !1 }), vx = /* @__PURE__ */ Cy("TooltipContent"), tu = M.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = kr(In, n), l = Ho(n), { onClose: d } = c;
    return M.useEffect(() => (document.addEventListener(Ys, d), () => document.removeEventListener(Ys, d)), [d]), M.useEffect(() => {
      if (c.trigger) {
        const u = (f) => {
          f.target?.contains(c.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [c.trigger, d]), /* @__PURE__ */ m(
      Ca,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ R(
          Jl,
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
              /* @__PURE__ */ m(vx, { children: r }),
              /* @__PURE__ */ m(gx, { scope: n, isInside: !0, children: /* @__PURE__ */ m(lx, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
eu.displayName = In;
var nu = "TooltipArrow", ru = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Ho(n);
    return yx(
      nu,
      n
    ).isInside ? null : /* @__PURE__ */ m(ed, { ...o, ...r, ref: t });
  }
);
ru.displayName = nu;
function bx(e, t) {
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
function wx(e, t, n = 5) {
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
function xx(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function kx(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function Cx(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Mx(t);
}
function Mx(e) {
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
var Sx = Xd, Tx = Zd, Ex = Qd, Dx = Jd, Nx = eu, Ax = ru;
function Rx({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    Sx,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Vs({
  ...e
}) {
  return /* @__PURE__ */ m(Rx, { children: /* @__PURE__ */ m(Tx, { "data-slot": "tooltip", ...e }) });
}
function Ks({
  ...e
}) {
  return /* @__PURE__ */ m(Ex, { "data-slot": "tooltip-trigger", ...e });
}
function Gs({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ m(Dx, { children: /* @__PURE__ */ R(
    Nx,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: le(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ m(Ax, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const Te = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
  const s = /* @__PURE__ */ m(
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
  return o ? /* @__PURE__ */ R(Vs, { children: [
    /* @__PURE__ */ m(Ks, { asChild: !0, children: s }),
    /* @__PURE__ */ m(Gs, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, vn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Lx = On(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = K(null), [l, d] = V(!1), [u, f] = V(void 0), p = gc({
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
  }), g = Y(() => {
    const { view: k } = t, { from: D } = k.state.selection, C = k.coordsAtPos(D);
    f({ top: C.bottom + 8, left: C.left }), d(!0);
  }, [t]), h = Y((k, D) => {
    t.chain().focus().setImage({ src: k, alt: D }).run(), d(!1);
  }, [t]), y = Y(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = Y((k) => {
    t.chain().focus().insertCallout({ type: k }).run();
  }, [t]), v = K(/* @__PURE__ */ new Map()), x = K(/* @__PURE__ */ new Map()), T = Y((k) => {
    const { doc: D, tr: C } = k.state;
    let S = !1;
    const E = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), N.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((B) => {
        const q = B, I = (q.textContent || "").trim().substring(0, 50);
        v.current.set(`${O}-${I}`, q.getBoundingClientRect());
      });
    });
    const A = [];
    D.descendants((P, O, H, B) => {
      if (!E.has(P.type.name)) return !0;
      let q = !1;
      if (P.forEach((L) => {
        L.type.name === "taskItem" && (q = !0);
      }), !q) return !0;
      let I = 0;
      return D.nodesBetween(0, O, (L) => (E.has(L.type.name) && I++, !0)), A.push({ node: P, pos: O, depth: I }), !0;
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
      C.replaceWith(te, te + P.nodeSize, Z), S = !0;
    }
    S && (k.view.dispatch(C), requestAnimationFrame(() => {
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
    t.state.doc.descendants((C, S) => (C.type.name === "taskItem" && k.set(S, C.attrs.checked === !0), !0)), x.current = k;
    const D = ({ transaction: C }) => {
      if (!C.docChanged) return;
      const S = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, P) => (A.type.name === "taskItem" && S.set(P, A.attrs.checked === !0), !0));
      const E = x.current;
      let N = !1;
      if (E.size > 0 && S.size > 0) {
        let A = 0, P = 0;
        E.forEach((O) => {
          O && A++;
        }), S.forEach((O) => {
          O && P++;
        }), A !== P && (N = !0);
      }
      x.current = S, N && setTimeout(() => {
        T(t);
      }, 150);
    };
    return t.on("transaction", D), () => {
      t.off("transaction", D);
    };
  }, [t, s, T]);
  const w = Y(() => {
    T(t);
  }, [t, T]);
  return /* @__PURE__ */ R("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Sf, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Tf, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(vn, {}),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Qs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Js, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(ea, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(ta, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(wc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(xc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(na, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(vn, {}),
    /* @__PURE__ */ R(ws, { children: [
      /* @__PURE__ */ m(xs, { asChild: !0, children: /* @__PURE__ */ R(
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
            /* @__PURE__ */ m(Ut, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(ks, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
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
    /* @__PURE__ */ m(vn, {}),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(oa, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(sa, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(aa, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(ra, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(Tc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Ef, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Df, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(vn, {}),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(Es, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(la, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(Ec, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(ws, { children: [
      /* @__PURE__ */ m(xs, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(ao, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ R(ks, { align: "start", children: [
        /* @__PURE__ */ R(Se, { onClick: () => b("info"), children: [
          /* @__PURE__ */ m(ao, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ R(Se, { onClick: () => b("note"), children: [
          /* @__PURE__ */ m(ca, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ R(Se, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ m(Nf, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ R(Se, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ m(Af, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ R(Se, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ m(ia, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ R(ws, { children: [
      /* @__PURE__ */ m(xs, { asChild: !0, children: /* @__PURE__ */ R(
        Ft,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(Es, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(ks, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(ni, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(ni, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(kn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ m(Cs, {}),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(ri, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(ri, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(kn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ m(Cs, {}),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(oi, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(oi, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ m(Cs, {}),
        /* @__PURE__ */ R(
          Se,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(kn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m(
      kl,
      {
        isOpen: l,
        onClose: () => d(!1),
        onInsert: h,
        position: u
      }
    ),
    /* @__PURE__ */ m(vn, {}),
    /* @__PURE__ */ m(
      Te,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(Rf, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ R(Ae, { children: [
      /* @__PURE__ */ m(vn, {}),
      /* @__PURE__ */ R(Vs, { children: [
        /* @__PURE__ */ m(Ks, { asChild: !0, children: /* @__PURE__ */ m(
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
            children: /* @__PURE__ */ m(ko, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ m(Gs, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ R(Vs, { children: [
      /* @__PURE__ */ m(Ks, { asChild: !0, children: /* @__PURE__ */ R(
        Ft,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m($n, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ m(Gs, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function Ix({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [d, u] = V(""), [f, p] = V(""), [g, h] = V(!1), [y, b] = V(!1), [v, x] = V(!1), [T, w] = V(!1), [k, D] = V([]), [C, S] = V(0), [E, N] = V(null), [A, P] = V(!1), O = K(!1), H = K(null), B = K(null), q = K(!1);
  Q(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const I = Y(() => {
    if (!d || !e) {
      D([]), S(0), N(null);
      return;
    }
    const $ = [];
    let z;
    try {
      if (y)
        z = new RegExp(d, g ? "g" : "gi");
      else {
        let j = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (j = `\\b${j}\\b`), z = new RegExp(j, g ? "g" : "gi");
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
      j.descendants((ee, me) => {
        if (ee.isText && ee.text) {
          let pe;
          for (; (pe = z.exec(ee.text)) !== null; )
            $.push({
              from: me + pe.index,
              to: me + pe.index + pe[0].length,
              text: pe[0]
            });
        }
        return !0;
      });
    }
    D($), $.length > 0 && C >= $.length && S(0);
  }, [d, g, y, v, e, C, l, i]);
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
      caseSensitive: g,
      useRegex: y,
      currentMatchIndex: C
    }) : $ && e.commands.clearSearchHighlight();
  }, [e, t, d, g, y, C, l, k, i]), Q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), Q(() => {
    if (k.length > 0 && C < k.length) {
      const $ = k[C];
      if (l) {
        const j = document.querySelector(".syntax-textarea");
        if (j && q.current) {
          const ee = parseInt(getComputedStyle(j).lineHeight) || 22, pe = i.substring(0, $.from).split(`
`).length;
          j.scrollTop = Math.max(0, (pe - 3) * ee);
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
    k.length !== 0 && (q.current = !0, S(($) => ($ + 1) % k.length));
  }, [k.length]), U = Y(() => {
    k.length !== 0 && (q.current = !0, S(($) => ($ - 1 + k.length) % k.length));
  }, [k.length]), X = Y(() => {
    if (k.length === 0 || C >= k.length) return;
    const $ = k[C];
    if (l && a) {
      const z = i.substring(0, $.from) + f + i.substring($.to);
      a(z), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [k, C, f, e, I, l, i, a]), G = Y(() => {
    if (k.length === 0) return;
    if (l && a) {
      const z = [...k].sort((ee, me) => me.from - ee.from);
      let j = i;
      z.forEach((ee) => {
        j = j.substring(0, ee.from) + f + j.substring(ee.to);
      }), a(j), setTimeout(I, 10);
      return;
    }
    const $ = [...k].sort((z, j) => j.from - z.from);
    e.chain().focus(), $.forEach((z) => {
      e.chain().setTextSelection({ from: z.from, to: z.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [k, f, e, I, l, i, a]), Z = Y(() => {
    if (k.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      wholeWord: v
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [k, d, g, y, v, e, n]), te = Y(($) => {
    $.key === "Enter" ? ($.preventDefault(), $.shiftKey ? U() : L(), H.current?.focus()) : $.key === "Escape" ? ($.preventDefault(), n()) : $.key === "h" && ($.ctrlKey || $.metaKey) ? ($.preventDefault(), w((z) => !z)) : $.key === "l" && ($.ctrlKey || $.metaKey) && $.shiftKey && ($.preventDefault(), Z());
  }, [L, U, n, Z]);
  return t ? /* @__PURE__ */ R(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: te,
      children: [
        /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Lf, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
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
            E && /* @__PURE__ */ m("span", { className: "find-replace-error", title: E, children: "!" })
          ] }),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: k.length > 0 ? `${C + 1} of ${k.length}` : d ? "No results" : "" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: U,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(If, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: L,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Ut, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: Z,
              disabled: k.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${k.length} matches`,
              children: /* @__PURE__ */ m(Pf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => h(($) => !$),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(Of, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => x(($) => !$),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(_f, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => b(($) => !$),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m($f, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => w(($) => !$),
              className: `find-replace-btn ${T ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(Ds, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ m(Dt, { size: 16 })
            }
          )
        ] }),
        T && /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Ds, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: B,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: ($) => p($.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ m(
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
                /* @__PURE__ */ m(Hf, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const Px = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), Ct = Px ? "⌘" : "Ctrl", Ox = ({ editor: e }) => {
  const [t, n] = V(!1), [r, o] = V(0), [s, i] = V(0), [a, c] = V(""), [l, d] = V(""), [u, f] = V(!1), [p, g] = V(!1);
  Q(() => {
    if (!e) return;
    const D = () => {
      const S = e.storage.selectAllOccurrences;
      S ? (n(S.isActive), o(S.ranges.length), i(S.allMatches.length), c(S.searchTerm), d(S.typedBuffer), f(S.isTypingReplace), g(S.isIncremental)) : (n(!1), o(0), i(0));
    }, C = () => {
      D();
    };
    return e.on("transaction", C), D(), () => {
      e.off("transaction", C);
    };
  }, [e]);
  const h = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), b = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), x = Y(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), T = Y(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = Y(() => {
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
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: u ? /* @__PURE__ */ R(Ae, { children: [
        /* @__PURE__ */ m(Co, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ m(Ae, { children: /* @__PURE__ */ R("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ R(Ae, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${Ct}+D)`,
            children: /* @__PURE__ */ m(ua, { size: 14 })
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${Ct}+Shift+L)`,
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
          title: `Bold all occurrences (${Ct}+B)`,
          children: /* @__PURE__ */ m(Qs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${Ct}+I)`,
          children: /* @__PURE__ */ m(Js, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${Ct}+U)`,
          children: /* @__PURE__ */ m(ea, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(ta, { size: 14 })
        }
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: x,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(kn, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: T,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(Dt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ R(Ae, { children: [
      /* @__PURE__ */ R("kbd", { children: [
        Ct,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ R("kbd", { children: [
        Ct,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ R("kbd", { children: [
        Ct,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ R(Ae, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ R("kbd", { children: [
        Ct,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, _x = On(Ox), Zr = "-dismissed";
function $x(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Hx(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, c] = V({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = K(null), d = K(""), u = K(0);
  Q(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + Zr);
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
  const f = Y(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const b = e.getHTML(), v = $x(b);
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
  Q(() => {
    if (!e || !o || e.isDestroyed) return;
    const b = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", b), () => {
      e.off("update", b), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, f]), Q(() => {
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
    l.current && clearTimeout(l.current), f();
  }, [f]), g = Y(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Zr), d.current = "", c({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (b) {
      console.warn("useAutoSave: Error clearing content", b);
    }
  }, [n]), h = Y(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const b = localStorage.getItem(n);
      return b && e && !e.isDestroyed ? (c((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(b), d.current = b, localStorage.removeItem(n + Zr), i?.(b);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), b) : null;
    } catch (b) {
      return console.warn("useAutoSave: Error recovering content", b), null;
    }
  }, [e, n, i]), y = Y(() => {
    try {
      localStorage.setItem(n + Zr, "true"), c((b) => ({ ...b, hasRecoverableContent: !1 }));
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
const Wx = 200;
function zx(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: r = !1,
    enabled: o = !0
  } = t, [s, i] = V({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), a = K(null), c = K(""), l = Y((d) => {
    const u = d.trim(), f = u.length > 0 ? u.split(/\s+/).filter((v) => v.length > 0).length : 0, p = u.replace(/\s/g, "").length, g = d.length;
    let h = 0, y = 0;
    r && (h = u.length > 0 ? u.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, y = u.length > 0 ? (u.match(/[.!?]+/g) || []).length : 0);
    const b = Math.max(1, Math.ceil(f / Wx));
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
function Bx({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ R(Ae, { children: [
          /* @__PURE__ */ m(Wf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ R("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ R(Ae, { children: [
          /* @__PURE__ */ m(Dc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ R(Ae, { children: [
          /* @__PURE__ */ m(_n, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ R(Ae, { children: [
          /* @__PURE__ */ m(zf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function Fx({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ R(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(Bf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ R(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ m(fa, { className: "w-4 h-4" }),
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
              children: /* @__PURE__ */ m(Dt, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
const Ux = /\[\[([^\[\]]+)\]\]$/, Yx = yc.create({
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
        find: Ux,
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
}), Mt = {
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
}, jx = ["info", "note", "prompt", "resources", "todo"];
function Vx(e) {
  return e.length < 3 ? !1 : !!(Mt.header.test(e) || Mt.bold.test(e) || Mt.list.test(e) || Mt.taskList.test(e) || Mt.codeBlock.test(e) || Mt.callout.test(e) || Mt.highlight.test(e) || Mt.link.test(e) || Mt.table.test(e));
}
function Kx(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function Gx(e, t) {
  const { alt: n, align: r, width: o } = Kx(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function ho(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function rc(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${ho(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(Gx(i[1], i[2])) : o.push(`<p>${ho(s.trim())}</p>`);
  }
  return o.join("");
}
function ou(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function su(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", d = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, u = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${ho(f.text)}</p>` : i += `<li><p>${ho(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function oc(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return rc(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(su(s)), s = []);
  };
  for (const a of r) {
    const c = ou(a);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && i();
      }
      s.push(c);
    } else
      i(), o.push(rc(a.trim()));
  }
  return i(), o.join("");
}
function qx(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + oc(a) + "</th>";
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
        i += "<td>" + oc(u) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function Xx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (u) => {
    const f = u.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const g = qx(u);
        if (g) {
          const h = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(g), h;
        }
      }
    }
    return u;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (u, f, p) => {
    let g = p.trim();
    g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>");
    const h = "info";
    g.startsWith("<") || (g = `<p>${g}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${h}" class="callout callout-${h}">${g}</div>`), y;
  }), jx.forEach((u) => {
    const f = new RegExp(`\`\`\`${u}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (p, g) => {
      let h = g.trim();
      h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), h = h.replace(/__([^_]+)__/g, "<strong>$1</strong>"), h = h.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), h = h.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), h = h.replace(/`([^`]+)`/g, "<code>$1</code>"), h.startsWith("<") || (h = `<p>${h}</p>`);
      const y = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${u}" class="callout callout-${u}">${h}</div>`), y;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (u, f, p) => {
    const g = f || "plaintext", h = p.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${g}">${h}</code></pre>`), y;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), i = [];
  let a = [];
  const c = () => {
    a.length !== 0 && (i.push(su(a)), a = []);
  };
  for (const u of s) {
    const f = ou(u);
    if (f) {
      if (a.length > 0) {
        const g = a[0].type, h = Math.min(...a.map((y) => y.depth));
        f.depth === h && f.type !== g && c();
      }
      a.push(f);
      continue;
    }
    c();
    let p = u;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (g, h, y) => {
      const b = h.length;
      return `<h${b}>${y}</h${b}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), i.push(p);
  }
  c(), t = i.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (u, f, p) => {
    const g = f.split("|").map((x) => x.trim());
    let h = "", y = "left", b = null;
    g.length === 1 ? h = g[0] : g.length === 2 ? (h = g[0], /^\d+$/.test(g[1]) ? b = g[1] : ["left", "center", "right"].includes(g[1]) ? y = g[1] : h = f) : g.length === 3 ? (h = g[0], ["left", "center", "right"].includes(g[1]) && (y = g[1]), /^\d+$/.test(g[2]) && (b = g[2])) : h = f;
    const v = b ? ` width="${b}" style="width: ${b}px"` : "";
    return `<img src="${p.trim()}" alt="${h}" data-align="${y}"${v}>`;
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
const Zx = rt.create({
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
      new $e({
        key: new He("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !Vx(i))
              return !1;
            n.preventDefault();
            const a = Xx(i);
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
}), sc = new He("collapsibleHeading");
function Qx(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function go(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, Qx(i, a, l));
    }
  }), n;
}
let Nn = null;
function Ms(e, t, n) {
  const r = [], o = go(e, n.levels), s = [];
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
      let f = e.content.size;
      for (let p = l + 1; p < s.length; p++)
        if (s[p].level <= d.level) {
          f = s[p].pos;
          break;
        }
      u < f && i.push({ start: u, end: f });
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
      const u = o.get(d) ?? "", f = t.collapsedHeadings.has(u), p = c(d);
      r.push(
        Ze.node(d, d + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": u,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const g = Ze.widget(d + l.nodeSize - 1, () => {
        const h = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${u}"]`);
        if (h) {
          h.classList.contains("collapsed") !== f && (h.classList.remove("collapsed", "expanded"), h.classList.add(f ? "collapsed" : "expanded"), h.title = f ? "Click to expand" : "Click to collapse");
          const x = h.parentElement;
          if (x) return x;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const b = document.createElement("button");
        return b.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, b.setAttribute("data-heading-id", u), b.setAttribute("data-heading-level", String(l.attrs.level)), b.setAttribute("contenteditable", "false"), b.setAttribute("tabindex", "-1"), b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', b.title = f ? "Click to expand" : "Click to collapse", b.addEventListener("click", (v) => {
          v.preventDefault(), v.stopPropagation();
          const x = b.classList.contains("collapsed");
          b.classList.remove("collapsed", "expanded"), b.classList.add(x ? "expanded" : "collapsed"), b.title = x ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(u) ? t.collapsedHeadings.delete(u) : t.collapsedHeadings.add(u), Nn && Nn.dispatch(Nn.state.tr.setMeta("collapsibleHeading", { toggled: u }));
        }), y.appendChild(b), y;
      }, { side: 1, key: `chevron-${u}` });
      r.push(g);
    } else l.isBlock && c(d) && r.push(
      Ze.node(d, d + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Ue.create(e, r);
}
function Jx(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = go(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
const ek = rt.create({
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
        const i = go(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return go(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new $e({
        key: sc,
        view(n) {
          return Nn = n, {
            update(r) {
              Nn = r;
            },
            destroy() {
              Nn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: Ms(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const i = n.getMeta("collapsibleHeading");
            return i || n.docChanged ? (n.docChanged && !i && Jx(o.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Ms(s.doc, e, t),
              docVersion: r.docVersion + 1
            }) : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = sc.getState(n);
            return r?.decorations ? r.decorations : Ms(n.doc, e, t);
          }
        }
      })
    ];
  }
}), tk = /\[([^\]]+)\]\(([^)]+)\)$/, nk = /^(https?:\/\/|www\.)[^\s]+$/i, rk = rt.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Fe({
        find: tk,
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
      new $e({
        key: new He("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!nk.test(s)) return !1;
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
}), ok = ["info", "note", "prompt", "resources", "todo"], sk = rt.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new $e({
        key: new He("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const d of ok)
              if (l === `\`\`\`${d}`) {
                n.preventDefault();
                const u = r.tr, f = a + c.indexOf("```");
                u.delete(f, i.pos);
                const p = e.schema.nodes.callout, g = e.schema.nodes.paragraph;
                if (p && g) {
                  const h = g.create(), y = p.create({ type: d }, rm.from(h));
                  u.insert(f, y);
                  const b = u.doc.resolve(f + 2);
                  u.setSelection(dt.near(b)), t.dispatch(u);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Qr = new He("searchHighlight"), ak = rt.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Qr, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Qr, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new $e({
        key: Qr,
        state: {
          init() {
            return Ue.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(Qr), d = t.docChanged;
            if (!s)
              return Ue.empty;
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
              o.doc.descendants((g, h) => {
                if (g.isText && g.text) {
                  let y;
                  for (; (y = p.exec(g.text)) !== null; ) {
                    const b = h + y.index, v = h + y.index + y[0].length, x = f === c;
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
              return Ue.empty;
            }
            return Ue.create(o.doc, u);
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
}), ik = new He("tabIndent");
function ck(e) {
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
const lk = rt.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new $e({
        key: ik,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = ck(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!si(s)(n, r)) {
                const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && si(l)(n, r);
              }
            } else if (!ai(s)(n, r)) {
              const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && ai(l)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), dk = new He("expandSelection");
function Ss(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const uk = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), fk = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), mk = "tableRow", pk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function hk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function gk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (pk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function yk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === mk) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function vk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (fk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function bk(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    uk.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function wk(e) {
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
function xk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function kk(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Ck(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(hk(e, o, s)), kk(e, t) && (i(gk(e, o, s)), i(yk(e, o, s))), i(bk(e, o, s)), i(vk(e, o, s));
  const a = wk(e);
  if (a.length > 0) {
    const c = xk(a, o, s);
    for (const l of c)
      i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const Mk = rt.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof qu || o === 0 && s === n.content.size)
          return !0;
        const a = Ck(n, o, s);
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
      new $e({
        key: dk,
        props: {
          handleClick() {
            return Ss(e), !1;
          },
          handleTextInput() {
            return Ss(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && Ss(e), !1;
          }
        }
      })
    ];
  }
}), Sk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Tk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Ek = new He("hexColorDecoration");
function au(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Sk.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, d = l + a[0].length;
      if (d >= t && l <= n) {
        const u = a[0], f = Tk(u);
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
function Dk(e) {
  const t = au(e, 0, e.content.size);
  return Ue.create(e, t);
}
const Nk = yc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new $e({
        key: Ek,
        state: {
          init(e, { doc: t }) {
            return Dk(t);
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
              const i = au(e.doc, s.from, s.to);
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
}), Ie = new He("selectAllOccurrences");
function ac(e, t, n, r, o) {
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
function zt(e, t) {
  const n = Ie.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function Ak(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Ne(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Rk = rt.create({
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
        const c = ac(t.state.doc, o, s, i, a);
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Ie, { activate: !0 })), !0);
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
              let h = g, y = g;
              for (; h > 0 && /\w/.test(p[h - 1]); ) h--;
              for (; y < p.length && /\w/.test(p[y]); ) y++;
              h < y && (a = p.slice(h, y));
            }
          }
          if (!a) return !1;
          const c = ac(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = Ak(c, s), d = c[l];
          return r.isActive = !0, r.ranges = [d], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = c, r.nextMatchIndex = (l + 1) % c.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Ie, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Ie, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Ne(this.storage), t && t(e.setMeta(Ie, { deactivate: !0 })), !0),
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
              const c = zt(a, this.storage);
              this.storage.ranges = c, c.length === 0 && Ne(this.storage);
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
        return Ne(this.storage), !0;
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
              const s = zt(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Ne(this.storage);
            }
          } catch {
          }
        }, 10) : Ne(this.storage), !0;
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
      new $e({
        key: Ie,
        state: {
          init() {
            return Ue.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Ie);
            if (s?.deactivate || !e.isActive)
              return Ue.empty;
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
              return Ue.create(o.doc, i);
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
              Ne(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Ie, { deactivate: !0 }));
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
              Ne(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ie, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), om(t.state, t.dispatch), setTimeout(() => {
                  const s = zt(t);
                  e.ranges = s, s.length === 0 && Ne(e);
                }, 10), !0;
              }
              Ne(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ie, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, sm(t.state, t.dispatch), setTimeout(() => {
                  const s = zt(t);
                  e.ranges = s, s.length === 0 && Ne(e);
                }, 10), !0;
              }
              Ne(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ie, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = zt(t);
                if (r.length === 0) {
                  Ne(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Ie, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = zt(t);
                  e.ranges = a, a.length === 0 && Ne(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Ne(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Ie, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), Ne(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Ie, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Ne(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ie, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Ne(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ie, { deactivate: !0 })), !1;
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
            const s = zt(t);
            if (s.length === 0) {
              Ne(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Ie, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = zt(t);
              e.ranges = c, c.length === 0 && Ne(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function Lk(e) {
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
        const h = g.querySelector(':scope > input[type="checkbox"]');
        if (h) return h;
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
        const h = p.parentElement, y = h && h.tagName === "P" && h.parentElement === f;
        p.remove(), y && h.firstChild && h.firstChild.nodeType === Node.TEXT_NODE && (h.firstChild.textContent = (h.firstChild.textContent || "").replace(/^\s+/, ""));
        const b = Array.from(f.childNodes), v = [], x = [];
        b.forEach((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const k = w;
            if (k.tagName === "UL" || k.tagName === "OL" || k.tagName === "P")
              x.push(w);
            else if (k.tagName === "IMG" || k.tagName === "FIGURE")
              if (k.tagName === "IMG") {
                const D = n.createElement("figure");
                D.className = "image-resizer";
                const C = k.getAttribute("data-align") || "left", S = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[C] || "margin-right: auto;";
                D.style.cssText = S, D.appendChild(k.cloneNode(!0)), x.push(D);
              } else
                x.push(w);
            else
              v.push(w);
          } else
            v.push(w);
        });
        const T = x.filter((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const k = w;
            if (k.tagName === "P" && !k.textContent?.trim() && !k.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", v.length > 0) {
          const w = n.createElement("p");
          v.forEach((k) => w.appendChild(k)), w.firstChild && w.firstChild.nodeType === Node.TEXT_NODE && (w.firstChild.textContent = (w.firstChild.textContent || "").replace(/^\s+/, "")), (w.textContent?.trim() || w.querySelector("img, figure, code, br")) && f.appendChild(w);
        }
        T.forEach((w) => f.appendChild(w));
      }
    }), l && !d && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function Ik(e) {
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
        const f = r(c), p = r(t[l]);
        if (f !== null && p !== null) {
          for (let g = u; g < l; g++)
            n.push(t[g]);
          n.push("<!-- list-break -->"), a = l - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function Pk(e) {
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
          const g = u.getAttribute("data-align") || "left", h = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = h[g] || "margin-right: auto;", p.appendChild(u.cloneNode(!0)), l.push(p);
        } else if (f === "P")
          if (u.querySelectorAll("img").length === 0)
            l.push(d);
          else {
            const g = Array.from(u.childNodes), h = [];
            if (g.forEach((y) => {
              if (y.nodeType === Node.ELEMENT_NODE && y.tagName === "IMG") {
                if (h.length > 0) {
                  const w = n.createElement("p");
                  h.forEach((k) => w.appendChild(k.cloneNode(!0))), w.textContent?.trim() && l.push(w), h.length = 0;
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
                h.push(y);
            }), h.length > 0) {
              const y = n.createElement("p");
              h.forEach((b) => y.appendChild(b.cloneNode(!0))), y.textContent?.trim() && l.push(y);
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
function Ok(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function Jr(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), c = s.after(s.depth);
  o.replaceWith(a, c, i);
  const l = a + i.nodeSize;
  if (l < o.doc.content.size) {
    const d = o.doc.resolve(l);
    d.nodeAfter && d.nodeAfter.isTextblock ? o.setSelection(dt.create(o.doc, l + 1)) : d.nodeAfter && o.setSelection(dt.near(o.doc.resolve(l)));
  } else {
    const u = r.schema.nodes.paragraph.create();
    o.insert(l, u), o.setSelection(dt.create(o.doc, l + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function yo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function _k(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function ic(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? _k(r) : r.trim() ? `<p>${yo(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${yo(e)}</p>`;
}
function $k(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function Hk(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", d = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, u = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${yo(f.text)}</p>` : i += `<li><p>${yo(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function Wk(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let c = r.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (l.length <= 1 && !a)
        return s ? `${n}${ic(c)}${o}` : t;
      const d = [];
      let u = [];
      const f = () => {
        u.length !== 0 && (d.push(Hk(u)), u = []);
      };
      for (const p of l) {
        const g = $k(p);
        if (g) {
          if (u.length > 0) {
            const h = u[0].type;
            g.depth === 0 && g.type !== h && f();
          }
          u.push(g);
        } else
          f(), d.push(ic(p.trim()));
      }
      return f(), `${n}${d.join("")}${o}`;
    }
  );
}
function zk(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: c
  } = n;
  let l = e;
  l = Ik(l);
  const d = ["info", "note", "prompt", "resources", "todo"];
  return d.forEach((f) => {
    const p = new RegExp(`\`\`\`ad-${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(p, (g, h) => {
      const y = t(h.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${y}</div>`;
    });
  }), d.forEach((f) => {
    const p = new RegExp(`\`\`\`${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(p, (g, h) => {
      const y = t(h.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${y}</div>`;
    });
  }), l = l.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (f, p, g) => {
    const h = p.split("|").map((w) => w.trim());
    let y = "", b = "left", v = null;
    h.length === 1 ? y = h[0] : h.length === 2 ? (y = h[0], /^\d+$/.test(h[1]) ? v = h[1] : ["left", "center", "right"].includes(h[1]) ? b = h[1] : y = p) : h.length === 3 ? (y = h[0], ["left", "center", "right"].includes(h[1]) && (b = h[1]), /^\d+$/.test(h[2]) && (v = h[2])) : y = p;
    const x = v ? ` width="${v}" style="width: ${v}px"` : "", T = ` data-align="${b}"`;
    return `<img src="${g.trim()}" alt="${y}"${T}${x} />`;
  }), l = l.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), a && c && (l = l.replace(/@([^@\n]+)@/g, (f, p) => {
    const g = a(p);
    if (g) {
      const h = c(g);
      return `<span data-type="date-pill" data-date="${g}" class="date-pill ${h}"><span class="date-icon">📅</span><span class="date-text">${p.trim()}</span></span>`;
    }
    return f;
  })), r && !o && s && i && (l = l.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (f, p) => {
      const g = i(p);
      return s(g) ? `<span data-type="tag-pill" data-tag="${g}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${g}</span></span>` : f;
    }
  )), l = l.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((f, p) => p % 2 === 1 ? f : f.replace(/\[\[([^\[\]]+)\]\]/g, (g, h) => `<span data-wiki-link data-page-name="${h.trim()}" class="wiki-link">${h.trim()}</span>`)).join(""), l;
}
function Bk(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = Lk(t), t = Pk(t), t = Ok(t), t = Wk(t), t;
}
function Fk(e, t, n = {}) {
  const r = zk(e, t, n), o = t(r);
  return Bk(o);
}
function Uk() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Yk(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function jk(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function Vk(e, t) {
  return t.includes(e.type);
}
function Kk(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function Gk(e, t, n) {
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
      const u = e.type === "image/png" || e.type === "image/gif", f = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, g = l.toDataURL(f, p), h = jk(g, e.name);
      r({ dataUrl: g, file: h, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function qk(e, t, n) {
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
  if (!Vk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = Uk();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const u = await Gk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = u.dataUrl, i = u.file, s = Math.min(u.width, 600);
    } else {
      o = await Yk(e), i = e;
      const u = await Kk(o);
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
        const f = u instanceof HTMLElement ? u : u.dom;
        f && f.classList.add("image-uploading");
      }
    }
    try {
      const u = await n.onImageUpload(i, {
        fileName: e.name,
        mimeType: i.type,
        fileSize: i.size,
        uploadId: r
      });
      let f = !1;
      return t.view.state.doc.descendants((p, g) => {
        if (f) return !1;
        if (p.type.name === "resizableImage" && p.attrs.src === o && p.attrs.alt === e.name) {
          try {
            const { state: h, dispatch: y } = t.view, b = h.doc.nodeAt(g);
            if (b) {
              const v = h.tr.setNodeMarkup(g, void 0, {
                ...b.attrs,
                src: u
              });
              y(v);
            }
          } catch (h) {
            console.warn("Failed to replace placeholder with uploaded reference:", h);
          }
          return f = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((p, g) => {
        if (p.type.name === "resizableImage" && p.attrs.src === u) {
          const h = t.view.nodeDOM(g);
          if (h) {
            const y = h instanceof HTMLElement ? h : h.dom;
            y && y.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (u) {
      return console.warn("Image upload failed, removing placeholder:", u), qk(t, o, e.name), n.onUploadError?.(`Upload failed: ${u instanceof Error ? u.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
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
const Xk = rt.create({
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
      new $e({
        key: new He("imageUpload"),
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
                dt.near(n.state.doc.resolve(c.pos))
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
function Zk({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = V(!1), [o, s] = V(0), i = Y((d) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer?.types.includes("Files") && (s((u) => u + 1), r(!0));
  }, []), a = Y((d) => {
    d.preventDefault(), d.stopPropagation(), s((u) => {
      const f = u - 1;
      return f === 0 && r(!1), f;
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
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ R("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(Ff, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ R("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function Qk({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = V(e), [c, l] = V(t), d = K(null), u = K(null);
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
      b.key === "Escape" ? s() : b.key === "Enter" && (b.metaKey || b.ctrlKey) && f();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i, c, s]);
  const f = () => {
    i.trim() && r(i.trim(), c.trim());
  }, g = (() => {
    let x = n.x - 160, T = n.y + 10;
    return x + 320 > window.innerWidth - 16 && (x = window.innerWidth - 320 - 16), x < 16 && (x = 16), T + 280 > window.innerHeight - 16 && (T = n.y - 280 - 10), T < 16 && (T = 16), { left: x, top: T };
  })(), h = /* @__PURE__ */ R(
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
          /* @__PURE__ */ m("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(Dt, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ R("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ R("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(na, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ m("span", { children: "Image URL" })
            ] }),
            /* @__PURE__ */ m(
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
              /* @__PURE__ */ m(Co, { className: "w-3.5 h-3.5" }),
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
        /* @__PURE__ */ R("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ m(kn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ R("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ m(
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
                  /* @__PURE__ */ m(_n, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(Lt, { children: h });
}
function eo(e) {
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
function tn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function to(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return tn(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], d = i + l.length, u = t.filter((p) => p.start >= i && p.start < d);
      let f = i;
      for (const p of u)
        p.start > f && (o += tn(e.substring(f, p.start))), o += `<span class="${dc(p.type)}">${tn(p.content)}</span>`, f = p.end;
      f < d && (o += tn(e.substring(f, d))), c < s.length - 1 && (o += `
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
      p.start > f && (o += Ts(e, f, p.start, null, a)), o += Ts(e, p.start, p.end, dc(p.type), a), f = p.end;
    f < d && (o += Ts(e, f, d, null, a)), c < s.length - 1 && (o += `
`), i = d + 1;
  }
  return o;
}
function Ts(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const c = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const l = tn(e.substring(c, i)), d = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${d}">${l}</mark></span>` : s += `<mark class="${d}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = tn(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function Jk({
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
  const l = K(null), d = K(null), u = K(null), f = K(null), p = 5e3, g = 80, [h, y] = V(() => {
    const C = eo(e);
    return to(e, C, i, a);
  }), b = K(null), v = xn(() => {
    if (e.length <= p) {
      const C = eo(e), S = to(e, C, i, a);
      return b.current && (clearTimeout(b.current), b.current = null), S;
    }
    return null;
  }, [e, i, a]);
  Q(() => {
    if (e.length <= p) {
      const C = eo(e);
      y(to(e, C, i, a));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const C = eo(e);
      y(to(e, C, i, a)), b.current = null;
    }, g), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, i, a]);
  const x = v ?? h, T = Y(() => {
    const C = l.current, S = d.current, E = u.current;
    if (C) {
      const N = E?.parentElement, A = N ? N.clientHeight : 200;
      C.style.height = "auto";
      const P = Math.max(C.scrollHeight, A, 200);
      C.style.height = `${P}px`, S && (S.style.height = `${P}px`);
    }
  }, []);
  Q(() => {
    const C = l.current;
    if (!C) return;
    const S = (E) => {
      const N = C.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: A, scrollHeight: P, clientHeight: O } = N, H = A <= 0, B = A + O >= P - 1;
      (E.deltaY > 0 && !B || E.deltaY < 0 && !H) && (E.preventDefault(), N.scrollTop += E.deltaY);
    };
    return C.addEventListener("wheel", S, { passive: !1 }), () => C.removeEventListener("wheel", S);
  }, []);
  const w = Y(() => {
  }, []);
  Q(() => {
    T();
  }, [e, T]), Q(() => {
    o && l.current && l.current.focus();
  }, [o]), Q(() => {
    if (f.current && l.current) {
      const { start: C, end: S } = f.current;
      l.current.selectionStart = C, l.current.selectionEnd = S, f.current = null;
    }
  }, [e]);
  const k = Y((C) => {
    const S = C.target;
    f.current = {
      start: S.selectionStart,
      end: S.selectionEnd
    }, t(S.value);
  }, [t]), D = Y((C) => {
    const S = C.currentTarget, E = S.selectionStart, N = S.selectionEnd, A = S.value, P = E !== N;
    if (c) {
      if (C.key === "`" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(E, N), H = A.substring(0, E) + "`" + O + "`" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t(H);
        } else if (A[E] === "`")
          f.current = { start: E + 1, end: E + 1 }, t(A), S.selectionStart = S.selectionEnd = E + 1;
        else {
          const O = A.substring(0, E) + "``" + A.substring(N);
          f.current = { start: E + 1, end: E + 1 }, t(O);
        }
        return;
      }
      if (C.key === "*" && !C.ctrlKey && !C.metaKey) {
        if (A[E - 1] === "*" && A[E], P) {
          C.preventDefault();
          const B = A.substring(E, N), q = A.substring(0, E) + "*" + B + "*" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t(q);
          return;
        }
        if (A[E] === "*") {
          C.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(A.substring(0, E) + A.substring(E));
          return;
        }
        C.preventDefault();
        const H = A.substring(0, E) + "**" + A.substring(N);
        f.current = { start: E + 1, end: E + 1 }, t(H);
        return;
      }
      if (C.key === "_" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const H = A.substring(E, N), B = A.substring(0, E) + "_" + H + "_" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t(B);
          return;
        }
        if (A[E] === "_") {
          C.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(A.substring(0, E) + A.substring(E));
          return;
        }
        C.preventDefault();
        const O = A.substring(0, E) + "__" + A.substring(N);
        f.current = { start: E + 1, end: E + 1 }, t(O);
        return;
      }
      if (C.key === "~" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const H = A.substring(E, N), B = A.substring(0, E) + "~" + H + "~" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t(B);
          return;
        }
        if (A[E] === "~") {
          C.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(A.substring(0, E) + A.substring(E));
          return;
        }
        C.preventDefault();
        const O = A.substring(0, E) + "~~" + A.substring(N);
        f.current = { start: E + 1, end: E + 1 }, t(O);
        return;
      }
      if (C.key === "[" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(E, N), H = A.substring(0, E) + "[" + O + "]()" + A.substring(N);
          f.current = { start: N + 3, end: N + 3 }, t(H);
        } else {
          const O = A.substring(0, E) + "[]()" + A.substring(N);
          f.current = { start: E + 1, end: E + 1 }, t(O);
        }
        return;
      }
      if (C.key === "]" && !C.ctrlKey && !C.metaKey && A[E] === "]") {
        C.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(A.substring(0, E) + A.substring(E));
        return;
      }
      if (C.key === ")" && !C.ctrlKey && !C.metaKey && A[E] === ")") {
        C.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(A.substring(0, E) + A.substring(E));
        return;
      }
      if (C.key === "Backspace" && !P && E > 0) {
        const O = A[E - 1], H = A[E], B = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [q, I] of B)
          if (O === q && H === I) {
            C.preventDefault();
            const L = A.substring(0, E - 1) + A.substring(E + 1);
            f.current = { start: E - 1, end: E - 1 }, t(L);
            return;
          }
        if (O === "[" && A.substring(E, E + 3) === "]()") {
          C.preventDefault();
          const q = A.substring(0, E - 1) + A.substring(E + 3);
          f.current = { start: E - 1, end: E - 1 }, t(q);
          return;
        }
      }
    }
    if (C.key === "Tab")
      if (C.preventDefault(), C.shiftKey) {
        const O = A.substring(0, E), H = A.substring(E, N), B = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), U = O.substring(I), X = (U + H).split(`
`), G = X.map(($) => $.startsWith("  ") ? $.substring(2) : $.startsWith("	") ? $.substring(1) : $), Z = L + G.join(`
`) + B, te = (U + H).length - G.join(`
`).length;
        f.current = {
          start: Math.max(I, E - (X[0].length - G[0].length)),
          end: N - te
        }, t(Z);
      } else if (E === N) {
        const O = A.substring(0, E) + "  " + A.substring(N);
        f.current = { start: E + 2, end: E + 2 }, t(O);
      } else {
        const O = A.substring(0, E), H = A.substring(E, N), B = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), X = (O.substring(I) + H).split(`
`), G = X.map((te) => "  " + te), Z = L + G.join(`
`) + B;
        f.current = {
          start: E + 2,
          end: N + X.length * 2
        }, t(Z);
      }
  }, [t, c]);
  return /* @__PURE__ */ R("div", { ref: u, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: d,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: x || `<span class="md-placeholder">${tn(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ m(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: k,
        onKeyDown: D,
        onScroll: w,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let uc = 0, qs = 0, iu = 0;
function e1(e) {
  qs++, iu = e;
}
const t1 = On(function({
  visible: t,
  onClose: n,
  editor: r
}) {
  const [o, s] = V(!1), [i, a] = V({
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
  }), c = K([]), l = K(performance.now()), d = K(0), u = K(0), f = K(0), p = K(0), [g, h] = V(new Array(60).fill(0)), [y, b] = V(new Array(60).fill(0));
  Q(() => {
    if (!t || !r) return;
    const D = () => {
      const C = performance.now();
      queueMicrotask(() => {
        const S = performance.now() - C;
        e1(S);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), Q(() => {
    if (!t) return;
    let D = 0, C = performance.now(), S = 0;
    const E = (N) => {
      const A = N - l.current;
      if (l.current = N, c.current.push({ time: N, duration: A }), c.current.length > 120 && (c.current = c.current.slice(-120)), A > 16.67 && u.current++, D++, N - C >= 1e3) {
        S = D, D = 0, C = N;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((G, Z) => G + Z.duration, 0) / P.length : 0, H = P.length > 0 ? Math.max(...P.map((G) => G.duration)) : 0, B = performance.memory, q = B ? B.usedJSHeapSize / (1024 * 1024) : 0, I = B ? B.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, U = uc - f.current, X = qs - p.current;
        f.current = uc, p.current = qs, a({
          fps: S,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(H * 100) / 100,
          memoryUsed: Math.round(q * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: U,
          transactionCount: X,
          lastTransactionTime: Math.round(iu * 100) / 100,
          domNodes: L,
          longFrames: u.current
        }), h((G) => [...G.slice(1), S]), b((G) => [...G.slice(1), O]), u.current = 0;
      }
      d.current = requestAnimationFrame(E);
    };
    return d.current = requestAnimationFrame(E), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const v = Y(() => {
    n?.();
  }, [n]), x = Y(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const T = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", w = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", k = (D, C, S) => {
    const A = D.map((P, O) => {
      const H = O / (D.length - 1) * 120, B = 24 - Math.min(P, C) / C * 24;
      return `${H},${B}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: A,
        fill: "none",
        stroke: S,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ R("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ R("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ R("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ m(Uf, { size: 14 }),
        /* @__PURE__ */ m("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: x, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ m(Nc, { size: 12 }) : /* @__PURE__ */ m(Ac, { size: 12 }) }),
        /* @__PURE__ */ m("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ m(Dt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ R("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: T(i.fps) }, children: i.fps })
        ] }),
        k(g, 70, T(i.fps))
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ R("span", { className: "perf-value", style: { color: w(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ R("span", { className: "perf-value-sub", style: { color: w(i.frameTimeMax) }, children: [
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
        k(y, 50, w(i.frameTime))
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.renderCount })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.transactionCount })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ R("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.domNodes.toLocaleString() })
        ] }),
        i.memoryTotal > 0 && /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Memory" }),
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
class n1 extends lf {
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
      return /* @__PURE__ */ m("div", { className: le("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ R("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(Yf, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ R("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ R(
            Ft,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(fa, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ R(
            Ft,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(kn, { className: "w-4 h-4" }),
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
              className: le(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ m(Ut, { className: "w-3 h-3" }) : /* @__PURE__ */ m(Mc, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ R("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ R("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ m("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ R(Ae, { children: [
                    /* @__PURE__ */ m(jf, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ R(Ae, { children: [
                    /* @__PURE__ */ m($n, { className: "w-3 h-3" }),
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
  const [t, n] = df(o1, { status: "idle" }), r = K(null), o = Y(async (a, c, l, d, u) => {
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
  }, [e]), s = Y(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = Y(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const a1 = {
  SpellCheck: Kf,
  RefreshCw: Vf,
  Minimize2: Ac,
  Maximize2: Nc,
  FileText: da,
  MessageSquare: Rc,
  Sparkles: ko
};
function i1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = V(""), [a, c] = V(!1), l = K(null), d = K(null), u = e.filter((y) => y.scope === t || y.scope === "both");
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
    const b = u.length * 40 + (a ? 56 : 0) + 16, v = window.innerWidth, x = window.innerHeight;
    let T = o.top, w = o.left;
    return w + 260 > v - 8 && (w = v - 260 - 8), w < 8 && (w = 8), T + b > x - 8 && (T = o.top - b - 8), T < 8 && (T = 8), { top: T, left: w };
  }, [o, u.length, a])(), g = () => {
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
            /* @__PURE__ */ m("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ R("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ m(Rc, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ m(
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
            /* @__PURE__ */ m("div", { className: "h-px bg-border mx-2 my-0.5" }),
            u.filter((y) => !y.showCustomPrompt).map((y) => {
              const b = y.icon ? a1[y.icon] : ko;
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
  return /* @__PURE__ */ m(Lt, { onMouseDown: (y) => y.preventDefault(), children: h });
}
function c1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = K(null), a = K(null), [c, l] = V(!1), [d, u] = V(0);
  Q(() => {
    if (i.current) {
      const w = new ResizeObserver((k) => {
        for (const D of k)
          u(D.contentRect.height);
      });
      return w.observe(i.current), () => w.disconnect();
    }
  }, []), Q(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), Q(() => {
    const w = (k) => {
      k.key === "Escape" && s();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [s]);
  const f = xn(() => {
    const C = window.innerWidth, S = window.innerHeight;
    let E = t.selectionCenterX - 380 / 2;
    E + 380 > C - 8 && (E = C - 380 - 8), E < 8 && (E = 8);
    const N = S - t.selectionBottom - 8, A = t.selectionTop - 8, P = d || 200;
    let O, H = !1;
    return N >= P || N >= A ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, H = !0), O < 8 && (O = 8), O + P > S - 8 && (O = S - P - 8), { top: O, left: E, placedAbove: H };
  }, [t, d]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", h = e.status === "streaming", y = e.status === "complete", b = e.status === "error", v = Y(() => {
    navigator.clipboard.writeText(p), l(!0), setTimeout(() => l(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const x = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", T = /* @__PURE__ */ m(
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
          ${x}
        `,
          children: [
            /* @__PURE__ */ R("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ R("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                h && /* @__PURE__ */ m(Dc, { size: 12, className: "animate-spin" }),
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
                  children: /* @__PURE__ */ m(Dt, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ m(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: b ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ R("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  h && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ R("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || b) && /* @__PURE__ */ R(Ae, { children: [
                y && /* @__PURE__ */ R(Ae, { children: [
                  /* @__PURE__ */ m(
                    bn,
                    {
                      icon: Ds,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ m(
                    bn,
                    {
                      icon: ua,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ m(
                    bn,
                    {
                      icon: c ? _n : $n,
                      label: c ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ m(
                  bn,
                  {
                    icon: fa,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  bn,
                  {
                    icon: Dt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              h && /* @__PURE__ */ R(Ae, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  bn,
                  {
                    icon: Dt,
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
  return /* @__PURE__ */ m(Lt, { onMouseDown: (w) => w.preventDefault(), children: T });
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
        /* @__PURE__ */ m(e, { size: 12 }),
        /* @__PURE__ */ m("span", { children: t })
      ]
    }
  );
}
const cu = "paragon-editor-toc-width", l1 = 280, lu = 200, du = 500;
function fc() {
  try {
    const e = localStorage.getItem(cu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= lu && t <= du)
        return t;
    }
  } catch {
  }
  return l1;
}
function d1(e) {
  try {
    localStorage.setItem(cu, String(e));
  } catch {
  }
}
function u1(e, t, n) {
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
function f1(e) {
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
const pc = On(function({
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
  renderItem: h,
  showToggleButton: y = !0,
  scrollContainerRef: b
}) {
  const [v, x] = V([]), [T, w] = V(null), [k, D] = V(n), [C, S] = V(/* @__PURE__ */ new Set()), [E, N] = V(() => {
    if (u) {
      const z = parseInt(u, 10);
      return isNaN(z) ? fc() : z;
    }
    return fc();
  }), A = K(null), P = K(null), O = K(!1), H = K(0), B = K(0);
  Q(() => {
    D(n);
  }, [n]);
  const q = Y((z) => {
    z.preventDefault(), z.stopPropagation(), O.current = !0, H.current = z.clientX, B.current = E, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [E]);
  Q(() => {
    const z = (ee) => {
      if (!O.current) return;
      const me = f === "right" ? H.current - ee.clientX : ee.clientX - H.current, pe = Math.min(du, Math.max(lu, B.current + me));
      N(pe);
    }, j = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((ee) => (d1(ee), ee)));
    };
    return document.addEventListener("mousemove", z), document.addEventListener("mouseup", j), () => {
      document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", j);
    };
  }, [f]);
  const I = Y(() => {
    if (!t || t.isDestroyed) return;
    const z = u1(t, s, i);
    x(z), T && !z.find((j) => j.id === T) && w(null);
  }, [t, s, i, T]);
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
      const pe = z.getBoundingClientRect();
      let Me = null;
      for (let Le = v.length - 1; Le >= 0; Le--) {
        const qe = v[Le], It = mc(t, qe.pos);
        if (It && It.getBoundingClientRect().top - pe.top <= p + 10) {
          Me = qe.id;
          break;
        }
      }
      !Me && v.length > 0 && (Me = v[0].id), w(Me);
    };
    let ee;
    const me = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(j);
    };
    return z.addEventListener("scroll", me, { passive: !0 }), j(), () => {
      z.removeEventListener("scroll", me), cancelAnimationFrame(ee);
    };
  }, [t, v, c, k, p, b]);
  const L = Y((z) => {
    if (!t || t.isDestroyed) return;
    const j = mc(t, z.pos);
    if (j) {
      const ee = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const me = ee.getBoundingClientRect(), Me = j.getBoundingClientRect().top - me.top + ee.scrollTop;
        ee.scrollTo({ top: Me - p, behavior: "smooth" });
      } else
        j.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(z.pos + 1);
    } catch {
    }
    w(z.id), g?.(z);
  }, [t, p, g, b]), U = Y(() => {
    const z = !k;
    D(z), r?.(z);
  }, [k, r]), X = Y((z) => {
    S((j) => {
      const ee = new Set(j);
      return ee.has(z) ? ee.delete(z) : ee.add(z), ee;
    });
  }, []), G = Y((z, j, ee = 0) => {
    if (h)
      return h(z, j, () => L(z));
    const me = (z.level - s) * 14, pe = l && z.children && z.children.length > 0, Me = C.has(z.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${j ? "toc-item-active" : ""} toc-level-${z.level}`,
        style: { paddingLeft: `${me + 10}px` },
        children: /* @__PURE__ */ R(
          "button",
          {
            className: "toc-item-button",
            onClick: () => L(z),
            title: z.text,
            children: [
              pe && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Le) => {
                    Le.stopPropagation(), X(z.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: Me ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              a && /* @__PURE__ */ R("span", { className: "toc-level-indicator", children: [
                "H",
                z.level
              ] }),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: z.text })
            ]
          }
        )
      },
      z.id
    );
  }, [h, L, l, s, a, C, X]), Z = Y((z, j = 0) => z.map((ee) => {
    const me = T === ee.id, pe = C.has(ee.id), Me = ee.children && ee.children.length > 0;
    return /* @__PURE__ */ R("div", { children: [
      G(ee, me, j),
      Me && !pe && /* @__PURE__ */ m("div", { className: "toc-children", children: Z(ee.children, j + 1) })
    ] }, ee.id);
  }), [T, C, G]), te = Y(() => v.map((z) => {
    const j = T === z.id;
    return G(z, j);
  }), [v, T, G]);
  if (!t) return null;
  const $ = l ? f1(v) : [];
  return /* @__PURE__ */ R(Ae, { children: [
    y && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: U,
        title: k ? "Hide Table of Contents" : "Show Table of Contents",
        children: k ? /* @__PURE__ */ m(Gf, { size: 16 }) : /* @__PURE__ */ m(qf, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(
      "div",
      {
        ref: A,
        className: `toc-sidebar ${k ? "toc-visible" : "toc-hidden"} toc-${f} ${d}`,
        style: { width: k ? `${E}px` : "0px" },
        children: [
          k && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: q
            }
          ),
          /* @__PURE__ */ R("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ R("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ m("div", { className: "toc-list", children: l ? Z($) : te() }) })
          ] })
        ]
      }
    )
  ] });
});
let Et = null, vo = null;
async function uu() {
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
      const d = l, u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), h = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", x = h && h > 0;
      return (v || x) && b.push(v ? y : "left"), x && b.push(String(h)), `![${b.join(" | ")}](${u})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const d = l.querySelector("img");
      if (!d) return c;
      const u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), h = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", x = h && h > 0;
      (v || x) && b.push(v ? y : "left"), x && b.push(String(h));
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
    const l = c.getAttribute("src") || "", u = (c.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = c.getAttribute("width"), p = f ? parseInt(f, 10) : null, g = c.getAttribute("data-align") || "left", h = [u], y = g !== "left", b = p && p > 0;
    return (y || b) && h.push(y ? g : "left"), b && h.push(String(p)), `![${h.join(" \\| ")}](${l})`;
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
      (h) => h.nodeType === Node.ELEMENT_NODE && h.nodeName === "LI"
    ), g = f === "OL" ? parseInt(c.getAttribute("start") || "1", 10) : 1;
    p.forEach((h, y) => {
      const b = h.getAttribute("data-type") === "taskItem", v = h.getAttribute("data-checked") === "true", x = s(h);
      b ? l.push(`${u}- [${v ? "x" : " "}] ${x}`) : f === "OL" ? l.push(`${u}${g + y}. ${x}`) : l.push(`${u}- ${x}`);
      const T = Array.from(h.childNodes).filter(
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
      u.forEach((h, y) => {
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
      const d = l.getAttribute("data-date");
      return d ? `@${Oy(d)}@` : c;
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
  }), Et = n, n;
}
function m1() {
  !vo && !Et && (vo = uu().then((e) => (Et = e, e)));
}
function p1() {
  return m1(), {
    turndown(e) {
      return Et ? Et.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return Et !== null;
    },
    async ready() {
      Et || (vo ? await vo : await uu());
    }
  };
}
function h1() {
  const e = K(null);
  return e.current || (e.current = p1()), e.current;
}
const g1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, uC = uf(function({
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
  autoSave: f = !0,
  autoSaveKey: p = "paragon-editor-content",
  autoSaveDelay: g = 1e3,
  showRecoveryBanner: h = !0,
  showFloatingToolbar: y = !0,
  maxImageSize: b = 5 * 1024 * 1024,
  onImageUploadStart: v,
  onImageUploadComplete: x,
  onImageUploadError: T,
  onImageUpload: w,
  resolveImageSrc: k,
  showModeToggle: D = !0,
  // New props
  initialMode: C = "wysiwyg",
  onModeChange: S,
  onReady: E,
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
  headingLevels: me = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: pe = [1, 2, 3],
  // TOC props
  showTableOfContents: Me = !1,
  tocVisible: Le = !0,
  onTocVisibilityChange: qe,
  tocTitle: It = "",
  tocMinLevel: Yn = 1,
  tocMaxLevel: jn = 4,
  tocShowLevelIndicators: Cr = !1,
  tocHighlightActive: Mr = !0,
  tocTreeView: Sr = !1,
  tocWidth: Tr = "240px",
  tocPosition: an = "right",
  tocScrollOffset: Vn = 20,
  onTocItemClick: cn,
  renderTocItem: ln,
  tocShowToggleButton: Er = !0,
  // Raw markdown editor
  autoClosePairs: Wo = !0,
  // Performance profiler
  showPerformanceProfiler: zo = !1,
  onPerformanceProfilerClose: Bo,
  // Auto reorder checklist
  autoReorderChecklist: Fo = !1,
  // Expand selection
  progressiveSelectAll: Dr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: Nr = !1,
  enableHexColorHighlight: Uo = !1,
  enableCollapsibleHeadings: Ar = !1,
  // Performance mode
  performanceMode: Kn = "auto",
  // Error boundary
  onEditorError: Yo,
  // AI writing assistant
  aiActions: ot,
  onAIAction: dn,
  onAISetupRequired: ie
}, xe) {
  const [se] = V(() => g1()), [ge, We] = V(C), [he, Gn] = V(""), Be = K(C), ht = K(""), gt = K(null), [qn, Fa] = V(0), Rr = !!(ot && ot.length > 0 && dn), { state: Ye, executeAction: Lr, abort: pu, reset: Pt } = s1(dn), [jo, Vo] = V(null), [hu, gu] = V({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), yu = K(dn);
  yu.current = dn;
  const Ua = K(ie);
  Ua.current = ie;
  const [vu, bu] = V([]), [wu, xu] = V(0), ku = Y((W, F) => {
    bu(W), xu(F);
  }, []), Ko = K(v), Go = K(x), qo = K(T), Xo = K(w), Zo = K(k), Ya = K(q), Qo = K(I), Jo = K(L);
  Ko.current = v, Go.current = x, qo.current = T, Xo.current = w, Zo.current = k, Ya.current = q, Qo.current = I, Jo.current = L;
  const ja = 2e3, [yt, Cu] = V(() => Kn === "lightweight" ? !0 : Kn === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > ja : !1), es = K(0), Va = K(yt);
  Va.current = yt;
  const Mu = xn(() => {
    const W = [
      zu.configure({
        heading: {
          levels: me
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
      km,
      Cm,
      Tm,
      Bu.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      Fu.configure({
        types: ["heading", "paragraph"]
      }),
      Uu.configure({
        multicolor: !0
      }),
      Yu.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      nf,
      rf,
      of,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...yt ? [] : [sf],
      rk,
      ak,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...yt ? [] : [Rk],
      lk,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      am.extend({
        addInputRules() {
          const F = this.type;
          return [
            new Fe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: de, range: ye }) => {
                const { tr: ae } = de, Re = ye.from, ce = ye.to;
                ae.delete(Re, ce);
                const ve = ae.doc.resolve(Re), $t = F.create(), fn = ve.before(ve.depth), Or = ve.after(ve.depth);
                ae.replaceWith(fn, Or, $t);
                const wt = fn + $t.nodeSize;
                if (wt < ae.doc.content.size) {
                  const xt = ae.doc.resolve(wt);
                  xt.nodeAfter && xt.nodeAfter.isTextblock ? ae.setSelection(dt.create(ae.doc, wt + 1)) : xt.nodeAfter && ae.setSelection(dt.near(ae.doc.resolve(wt)));
                } else {
                  const _r = de.schema.nodes.paragraph.create();
                  ae.insert(wt, _r), ae.setSelection(dt.create(ae.doc, wt + 1));
                }
                ae.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return $.tables || W.push(
      ju.configure({
        resizable: !se,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Vu,
      mm,
      pm,
      ...yt ? [] : [xm]
    ), $.taskLists || W.push(
      Mm.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Sm.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !se && !yt && W.push(
      Dm.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), $.codeBlocks || W.push(Rm), $.callouts || W.push($m, sk), Ar && !$.collapsibleHeadings && !yt && W.push(
      ek.configure({
        levels: pe
      })
    ), $.images || W.push(
      Hm.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (F) => {
          Pr({
            isOpen: !0,
            src: F.src,
            alt: F.alt,
            pos: F.pos,
            position: { x: F.rect.left + F.rect.width / 2, y: F.rect.bottom }
          });
        },
        resolveImageSrc: Zo.current ? ((...F) => Zo.current(...F)) : void 0
      }),
      Xk.configure({
        maxFileSize: b,
        onUploadStart: Ko.current ? ((...F) => Ko.current(...F)) : void 0,
        onUploadComplete: Go.current ? ((...F) => Go.current(...F)) : void 0,
        onUploadError: qo.current ? ((...F) => qo.current(...F)) : void 0,
        onImageUpload: Xo.current ? ((F, de) => Xo.current(F, de)) : void 0
      })
    ), $.datePills || W.push(
      $y.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), $.tagPills || W.push(
      zy.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: Nr
      })
    ), $.wikiLinks || W.push(
      Yx.configure({
        onWikiLinkClick: (F) => {
          console.log("WikiLink clicked:", F), Ya.current?.(F);
        },
        validateLink: (F) => Qo.current ? Qo.current(F) : !0
      })
    ), Dr && W.push(Mk), Uo && !yt && W.push(Nk), $.markdownPaste || W.push(
      Zx.configure({
        enableMarkdownPaste: !0
      })
    ), W;
  }, [s, se, b, me, pe, $, Dr, Ar, yt]), vt = K(null), Kt = K(n), Gt = K(r), ts = K(o), Xn = K(null);
  Kt.current = n, Gt.current = r, ts.current = o;
  const _ = Hu({
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
    extensions: Mu,
    content: t,
    editable: i,
    autofocus: a,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: ee ? "true" : "false"
      },
      handleClick: (W, F, de) => {
        if (U) {
          const ae = de.target.closest("a");
          if (ae) {
            const Re = ae.getAttribute("href");
            if (Re && U(Re, de) === !1)
              return de.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: W }) => {
      if (Kn === "auto" && (es.current++, es.current >= 50)) {
        es.current = 0;
        const de = W.state.doc.content.childCount > ja;
        de !== Va.current && Cu(de);
      }
      vt.current && clearTimeout(vt.current), vt.current = setTimeout(() => {
        if (W.isDestroyed) return;
        const F = W.getHTML();
        (Kt.current || Gt.current) && (Kt.current?.(F), Gt.current?.(F));
      }, 150);
    },
    onFocus: () => {
      N?.();
    },
    onBlur: () => {
      if (vt.current && (clearTimeout(vt.current), vt.current = null, _ && !_.isDestroyed)) {
        const W = _.getHTML();
        if ((Kt.current || Gt.current) && (Kt.current?.(W), Gt.current?.(W)), Be.current === "wysiwyg" && Xn.current) {
          const F = Xn.current.turndown(W);
          ht.current = F, ts.current?.(F);
        }
      }
      A?.();
    },
    onSelectionUpdate: ({ editor: W }) => {
      if (P) {
        const { from: F, to: de, empty: ye } = W.state.selection;
        P({ from: F, to: de, empty: ye });
      }
    }
  });
  Q(() => () => {
    if (vt.current && (clearTimeout(vt.current), vt.current = null, _ && !_.isDestroyed)) {
      const W = _.getHTML();
      if ((Kt.current || Gt.current) && (Kt.current?.(W), Gt.current?.(W)), Be.current === "wysiwyg" && Xn.current) {
        const F = Xn.current.turndown(W);
        ht.current = F, ts.current?.(F);
      }
    }
  }, []);
  const [Ka, Ir] = V(!1), [un, Pr] = V(null), [Su, Tu] = V(!1), Eu = X !== void 0 ? X : Su, Ot = Y((W) => {
    Tu(W), G?.(W);
  }, [G]), [Du, ns] = V(0), [Nu, Au] = V(""), bt = Hx(_, {
    storageKey: p,
    debounceMs: g,
    enabled: f,
    onSave: (W) => {
      H?.(W);
    },
    onRecover: (W) => {
      B?.(W);
    }
  }), _t = h1();
  Xn.current = _t;
  const Ga = K(!1);
  Q(() => {
    if (!Ga.current && C === "markdown" && _ && !_.isDestroyed && _t) {
      const W = _.getHTML(), F = _t.turndown(W);
      Gn(F), ht.current = F, Ga.current = !0;
    }
  }, [_, _t, C]);
  const st = Y(async (W) => {
    if (_) {
      if (W === "markdown" && Be.current === "wysiwyg") {
        const F = _.getHTML(), de = _t.turndown(F);
        Gn(de), ht.current = de;
      } else if (W === "wysiwyg" && Be.current === "markdown") {
        const { marked: F } = await import("./marked.esm-Tjr8Gfse.js"), de = (Re) => F.parse(Re, { async: !1, breaks: !0 }), ye = {
          enableTagAutoDetect: Nr,
          disableTagPills: !!$.tagPills,
          isValidTag: wn,
          normalizeTag: ar,
          parseDateFromMarkdown: Qt,
          getDateVariant: xa
        }, ae = Fk(ht.current, de, ye);
        queueMicrotask(() => {
          _.isDestroyed || _.commands.setContent(ae);
        });
      }
      We(W), Be.current = W, S?.(W);
    }
  }, [_, _t, S]), qa = Y((W) => {
    Gn(W), ht.current = W, o?.(W);
  }, [o]), qt = zx(_, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: d
  });
  ff(xe, () => ({
    getEditor: () => _,
    getHTML: () => _?.getHTML() || "",
    getMarkdown: () => _ ? _t.turndown(_.getHTML()) : "",
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
    getMode: () => Be.current,
    setMode: (W) => st(W),
    toggleMode: () => {
      const W = Be.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return st(W), W;
    },
    getWordCount: () => ({
      words: qt.words,
      characters: qt.characters,
      charactersWithSpaces: qt.charactersWithSpaces
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
      _ && Jr(_, _.state.selection.from, _.state.selection.from);
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
      Ot(!0), ns((W) => W + 1);
    },
    closeFindReplace: () => Ot(!1),
    save: () => bt.save(),
    clearSavedContent: () => bt.clear(),
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
      return _.state.doc.descendants((F, de) => {
        if (F.type.name === "heading") {
          const ye = F.attrs.level, ae = F.textContent.trim();
          ae && W.push({ id: `toc-heading-${de}`, text: ae, level: ye, pos: de });
        }
      }), W;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (W) => {
      if (!(!_ || _.isDestroyed))
        try {
          const F = _.state.doc.resolve(W), de = _.view.nodeDOM(F.before(F.depth + 1));
          if (de instanceof HTMLElement) {
            const ye = _.view.dom.closest(".editor-content-wrapper");
            if (ye) {
              const ae = ye.getBoundingClientRect(), ce = de.getBoundingClientRect().top - ae.top + ye.scrollTop;
              ye.scrollTo({ top: ce - 20, behavior: "smooth" });
            } else
              de.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          _.commands.setTextSelection(W + 1);
        } catch {
        }
    }
  }), [_, _t, st, qt, bt, Ot]), Q(() => {
    const W = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => Be.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (F) => {
        if (F !== "wysiwyg" && F !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        st(F);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const F = Be.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return st(F), F;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        st("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        st("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => Be.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => Be.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => Be.current === "markdown" ? ht.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (F) => {
        const de = (ye) => {
          F(ye.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", de), () => window.removeEventListener("paragon-editor-mode-change", de);
      }
    };
    return window.__paragonEditorModeAPI = W, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [st]), Q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: ge } }));
  }, [ge]), Q(() => {
    if (!_ || _.isDestroyed) return;
    const W = (F) => {
      if (_.isDestroyed) return;
      const de = F.key;
      if (!(!(F.metaKey || F.ctrlKey) && de !== " ")) {
        if ((F.metaKey || F.ctrlKey) && F.key === "k") {
          F.preventDefault(), Ir(!0);
          return;
        }
        if (!se && (F.metaKey || F.ctrlKey) && F.key === "f") {
          if (F.preventDefault(), _) {
            const { state: ae } = _, { from: Re, to: ce } = ae.selection;
            if (Re !== ce) {
              const ve = ae.doc.textBetween(Re, ce, " ");
              ve.trim() && Au(ve.trim());
            }
          }
          Ot(!0), ns((ae) => ae + 1);
          return;
        }
        if (!se && (F.metaKey || F.ctrlKey) && F.key === "h") {
          F.preventDefault(), Ot(!0);
          return;
        }
        if (F.key === " ")
          try {
            const { state: ae } = _, { selection: Re } = ae, { $from: ce } = Re, ve = ce.nodeBefore?.textContent || "";
            if (ve === "#####") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 5, to: ce.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (ve === "####") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 4, to: ce.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (ve === "###") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 3, to: ce.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (ve === "##") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 2, to: ce.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (ve === "#") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (ve === "-" || ve === "*") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(ve)) {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - ve.length, to: ce.pos }).toggleOrderedList().run();
              return;
            }
            const $t = /^(-\s*)?\[([ x])?\]$/.exec(ve);
            if ($t) {
              F.preventDefault();
              const fn = $t[2] === "x", Or = ae.schema.nodes.taskList, wt = ae.schema.nodes.taskItem;
              if (Or && wt) {
                const xt = ae.tr, _r = ce.pos - ve.length, _u = ce.pos;
                xt.delete(_r, _u);
                const Ja = xt.doc.resolve(_r).blockRange();
                if (Ja) {
                  const $u = [
                    { type: Or, attrs: {} },
                    { type: wt, attrs: { checked: fn } }
                  ];
                  xt.wrap(Ja, $u), _.view.dispatch(xt);
                  return;
                }
              }
              _.chain().focus().deleteRange({ from: ce.pos - ve.length, to: ce.pos }).toggleTaskList().run();
              return;
            }
            if (ve === ">") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 1, to: ce.pos }).toggleBlockquote().run();
              return;
            }
            if (ve === "```") {
              F.preventDefault(), _.chain().focus().deleteRange({ from: ce.pos - 3, to: ce.pos }).toggleCodeBlock().run();
              return;
            }
            if (ve === "---" || ve === "***") {
              F.preventDefault(), Jr(_, ce.pos - 3, ce.pos);
              return;
            }
            if (ve === "—-") {
              F.preventDefault(), Jr(_, ce.pos - 2, ce.pos);
              return;
            }
            if (ve === "—") {
              F.preventDefault(), Jr(_, ce.pos - 1, ce.pos);
              return;
            }
          } catch (ae) {
            console.warn("Space shortcut error:", ae);
          }
      }
    };
    return document.addEventListener("keydown", W, !0), () => document.removeEventListener("keydown", W, !0);
  }, [_, se, Ot]);
  const Xa = Y((W, F) => {
    if (!Rr) {
      Ua.current?.();
      return;
    }
    if (!_) return;
    let de = { top: 0, left: 0 };
    if (F) {
      const ye = F.getBoundingClientRect();
      de = { top: ye.bottom + 4, left: ye.left };
    } else {
      const { from: ye, to: ae } = _.state.selection, Re = _.view.coordsAtPos(ye), ce = _.view.coordsAtPos(ae);
      de = { top: ce.bottom + 8, left: (Re.left + ce.left) / 2 };
    }
    Vo({ scope: W, position: de });
  }, [Rr, _]), Ru = Y((W, F) => {
    if (!_ || !ot) return;
    const de = ot.find((fn) => fn.id === W);
    if (!de) return;
    const { from: ye, to: ae } = _.state.selection, Re = ye !== ae ? _.state.doc.textBetween(ye, ae, `
`) : "", ce = de.scope === "document" || !Re ? _.getText() : Re, ve = _.view.coordsAtPos(ye), $t = _.view.coordsAtPos(ae);
    gu({
      selectionTop: ve.top,
      selectionBottom: $t.bottom,
      selectionCenterX: (ve.left + $t.right) / 2
    }), Vo(null), Lr(W, de.label, ce, { from: ye, to: ae }, F);
  }, [_, ot, Lr]), Lu = Y(() => {
    if (!_ || Ye.status !== "complete") return;
    const { selectionRange: W, result: F } = Ye;
    _.chain().focus().setTextSelection(W).deleteSelection().insertContent(F).run(), Pt();
  }, [_, Ye, Pt]), Iu = Y(() => {
    if (!_ || Ye.status !== "complete") return;
    const { selectionRange: W, result: F } = Ye;
    _.chain().focus().setTextSelection(W.to).insertContent(`
` + F).run(), Pt();
  }, [_, Ye, Pt]), Pu = Y(() => {
    if (!(Ye.status !== "complete" && Ye.status !== "error"))
      if (Ye.status === "complete") {
        const { action: W, actionLabel: F, inputText: de, selectionRange: ye } = Ye;
        Pt(), Lr(W, F, de, ye);
      } else
        Pt();
  }, [Ye, Pt, Lr]);
  if (!_)
    return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: /* @__PURE__ */ R("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const Za = /* @__PURE__ */ m(
    Lx,
    {
      editor: _,
      onOpenLinkPopover: () => Ir(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Ot(!0), ns((W) => W + 1);
      },
      disabledFeatures: $,
      autoReorderChecklist: Fo,
      aiEnabled: Rr || !!ie,
      onAISparklesClick: (W) => Xa("document", W)
    }
  ), Qa = /* @__PURE__ */ R("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ m(
      Bx,
      {
        status: bt.status,
        lastSaved: bt.lastSaved
      }
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ R("span", { children: [
      qt.words,
      " words"
    ] }) })
  ] }), Ou = {
    minHeight: z,
    ...j && { maxHeight: j, overflowY: "auto" }
  };
  return /* @__PURE__ */ R("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: [
    f && h && bt.hasRecoverableContent && /* @__PURE__ */ m(
      Fx,
      {
        onRecover: () => {
          bt.recover();
        },
        onDismiss: bt.dismissRecovery
      }
    ),
    l && /* @__PURE__ */ R("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z(_, Za) : Za,
      D && /* @__PURE__ */ R("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => st("wysiwyg"),
            className: `editor-mode-toggle-btn ${ge === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ m(Xf, {})
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => st("markdown"),
            className: `editor-mode-toggle-btn ${ge === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ m(da, {})
          }
        )
      ] })
    ] }),
    !se && /* @__PURE__ */ m(
      Ix,
      {
        editor: _,
        isOpen: Eu,
        onClose: () => Ot(!1),
        focusTrigger: Du,
        initialSearchQuery: Nu,
        editorMode: ge,
        rawMarkdown: he,
        onRawMarkdownChange: qa,
        onMatchesChange: ku
      }
    ),
    /* @__PURE__ */ m(_x, { editor: _ }),
    /* @__PURE__ */ R("div", { className: `editor-main-area ${Me ? "editor-with-toc" : ""}`, children: [
      Me && an === "left" && /* @__PURE__ */ m(
        pc,
        {
          editor: _,
          visible: Le,
          onVisibilityChange: qe,
          title: It,
          minLevel: Yn,
          maxLevel: jn,
          showLevelIndicators: Cr,
          highlightActive: Mr,
          treeView: Sr,
          width: Tr,
          position: an,
          scrollOffset: Vn,
          onItemClick: cn,
          renderItem: ln,
          showToggleButton: Er,
          scrollContainerRef: gt
        }
      ),
      /* @__PURE__ */ R(
        n1,
        {
          resetKey: `${t}-${qn}`,
          onRetry: () => Fa((W) => W + 1),
          onClearContent: () => {
            _ && _.commands.clearContent(), n?.(""), r?.(""), o?.(""), Fa((W) => W + 1);
          },
          onError: Yo,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: gt, style: Ou, children: ge === "wysiwyg" ? /* @__PURE__ */ R(Ae, { children: [
              /* @__PURE__ */ m(Wu, { editor: _, className: "editor-content" }),
              !$.images && !$.dragAndDrop && /* @__PURE__ */ m(Zk, { containerRef: gt, enabled: i }),
              !se && y && /* @__PURE__ */ m(Om, { editor: _, suppressWhenLinkPopoverOpen: Ka, aiEnabled: Rr || !!ie, onAISparklesClick: (W) => Xa("selection", W) }),
              jo && ot && /* @__PURE__ */ m(
                i1,
                {
                  actions: ot,
                  scope: jo.scope,
                  position: jo.position,
                  onAction: Ru,
                  onClose: () => Vo(null)
                }
              ),
              Ye.status !== "idle" && /* @__PURE__ */ m(
                c1,
                {
                  state: Ye,
                  position: hu,
                  onReplace: Lu,
                  onInsert: Iu,
                  onRetry: Pu,
                  onDiscard: () => {
                    pu(), Pt();
                  }
                }
              ),
              !$.slashCommands && /* @__PURE__ */ m(Vy, { editor: _, disabledFeatures: $ }),
              !$.wikiLinks && Jo.current && /* @__PURE__ */ m(
                Zy,
                {
                  editor: _,
                  onSearch: Jo.current
                }
              ),
              /* @__PURE__ */ m(
                Lm,
                {
                  editor: _,
                  isOpen: Ka,
                  onClose: () => Ir(!1)
                }
              ),
              !se && /* @__PURE__ */ m(
                Im,
                {
                  editor: _,
                  onEditLink: () => Ir(!0)
                }
              ),
              !$.images && un?.isOpen && /* @__PURE__ */ m(
                Qk,
                {
                  src: un.src,
                  alt: un.alt,
                  position: un.position,
                  onSave: (W, F) => {
                    _.chain().focus().setNodeSelection(un.pos).updateAttributes("resizableImage", {
                      src: W,
                      alt: F
                    }).run(), Pr(null);
                  },
                  onDelete: () => {
                    _.chain().focus().setNodeSelection(un.pos).deleteSelection().run(), Pr(null);
                  },
                  onClose: () => Pr(null)
                }
              )
            ] }) : /* @__PURE__ */ m(
              Jk,
              {
                content: he,
                onChange: qa,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: vu,
                currentMatchIndex: wu,
                autoClosePairs: Wo
              }
            ) }),
            /* @__PURE__ */ m(r1, { scrollContainerRef: gt })
          ]
        }
      ),
      Me && an === "right" && /* @__PURE__ */ m(
        pc,
        {
          editor: _,
          visible: Le,
          onVisibilityChange: qe,
          title: It,
          minLevel: Yn,
          maxLevel: jn,
          showLevelIndicators: Cr,
          highlightActive: Mr,
          treeView: Sr,
          width: Tr,
          position: an,
          scrollOffset: Vn,
          onItemClick: cn,
          renderItem: ln,
          showToggleButton: Er,
          scrollContainerRef: gt
        }
      )
    ] }),
    d && (te ? te(
      { words: qt.words, characters: qt.characters },
      bt.status,
      Qa
    ) : Qa),
    /* @__PURE__ */ m(t1, { visible: zo, onClose: Bo, editor: _ })
  ] });
}), fC = wo.create({
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
}), fu = {
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
}, y1 = {
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
}, v1 = {
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
}, b1 = {
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
}, rr = {
  dark: fu,
  light: y1,
  sepia: v1,
  nord: b1
};
function w1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function mC(e, t, n, r) {
  const o = rr[e] || fu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const mu = vc(null);
function pC({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = V(t), s = rr[r] || rr.dark, i = Y((c) => {
    rr[c] && o(c);
  }, []);
  Q(() => {
    n?.current && w1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(rr)
  };
  return /* @__PURE__ */ m(mu.Provider, { value: a, children: e });
}
function hC() {
  const e = bc(mu);
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
function gC({ node: e, updateAttributes: t }) {
  const [n, r] = V(!1), o = e.attrs.language || "plaintext";
  hc.find((i) => i.value === o)?.label;
  const s = Y(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ R(An, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: hc.map(({ value: i, label: a }) => /* @__PURE__ */ m("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ m(Ut, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(_n, { size: 14 }) : /* @__PURE__ */ m($n, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Xs, {}) }) })
  ] });
}
export {
  Bx as AutoSaveIndicator,
  fC as Callout,
  sk as CalloutInputRule,
  gC as CodeBlockComponent,
  ek as CollapsibleHeading,
  Dm as CollapsibleList,
  $y as DatePill,
  pC as EditorThemeProvider,
  Lx as EditorToolbar,
  Ix as FindReplace,
  Om as FloatingToolbar,
  Zk as ImageDropZone,
  Xk as ImageUpload,
  uC as MarkdownEditor,
  rk as MarkdownLinkInputRule,
  Zx as MarkdownPasteSafe,
  km as MixedBulletList,
  Tm as MixedListItem,
  Cm as MixedOrderedList,
  Sm as MixedTaskItem,
  Mm as MixedTaskList,
  Fx as RecoveryBanner,
  Hm as ResizableImage,
  ak as SearchHighlight,
  _x as SelectAllActionBar,
  Rk as SelectAllOccurrences,
  Vy as SlashCommands,
  lk as TabIndent,
  pc as TableOfContents,
  zy as TagPill,
  Yx as WikiLinkSafe,
  w1 as applyTheme,
  mC as createCustomTheme,
  fu as darkTheme,
  xa as getDateVariant,
  wn as isValidTag,
  y1 as lightTheme,
  Nm as loadLanguageIfNeeded,
  Ce as lowlight,
  b1 as nordTheme,
  ar as normalizeTag,
  Qt as parseDateFromMarkdown,
  v1 as sepiaTheme,
  rr as themes,
  Hx as useAutoSave,
  hC as useEditorTheme,
  zx as useWordCount
};
//# sourceMappingURL=paragon.js.map
