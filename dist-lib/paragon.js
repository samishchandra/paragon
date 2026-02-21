import { jsxDEV as m, Fragment as Be } from "react/jsx-dev-runtime";
import { ReactNodeViewRenderer as Dr, NodeViewWrapper as Wn, NodeViewContent as ii, useEditorState as Cl, useEditor as jd, EditorContent as Kd } from "@tiptap/react";
import Vd from "@tiptap/starter-kit";
import Gd from "@tiptap/extension-placeholder";
import qd from "@tiptap/extension-text-align";
import Xd from "@tiptap/extension-highlight";
import Zd from "@tiptap/extension-link";
import { Table as Qd } from "@tiptap/extension-table";
import Jd from "@tiptap/extension-table-row";
import em from "@tiptap/extension-table-cell";
import tm from "@tiptap/extension-table-header";
import { Plugin as je, PluginKey as Ke, TextSelection as fn, AllSelection as nm } from "@tiptap/pm/state";
import { DecorationSet as Xe, Decoration as st } from "@tiptap/pm/view";
import { Extension as dt, Node as Ar, mergeAttributes as Yn, InputRule as Qe, Mark as El } from "@tiptap/core";
import om from "@tiptap/extension-bullet-list";
import rm from "@tiptap/extension-ordered-list";
import sm from "@tiptap/extension-list-item";
import im from "@tiptap/extension-task-list";
import am from "@tiptap/extension-task-item";
import { findWrapping as ca, canJoin as lm } from "@tiptap/pm/transform";
import cm from "@tiptap/extension-underline";
import um from "@tiptap/extension-subscript";
import dm from "@tiptap/extension-superscript";
import mm from "@tiptap/extension-typography";
import fm from "@tiptap/extension-code-block-lowlight";
import { createLowlight as hm } from "lowlight";
import * as E from "react";
import J, { useState as K, useRef as V, useEffect as Q, useCallback as U, memo as jn, createContext as Tl, useContext as Ml, useLayoutEffect as Pr, useMemo as Pn, Component as pm, useReducer as gm, forwardRef as bm, useImperativeHandle as vm } from "react";
import { ChevronDown as Qt, Check as Kn, Copy as Vn, Link2 as ai, ExternalLink as wm, Pencil as Nm, Unlink as ym, Bold as li, Italic as ci, Underline as ui, Strikethrough as di, Code as Sl, Highlighter as Dl, Link as mi, Quote as fi, List as hi, ListOrdered as pi, CheckSquare as gi, FileCode as km, Sparkles as Rr, ListTodo as bi, BookOpen as vi, MessageSquareText as Al, StickyNote as Pl, Info as vr, ChevronRight as Rl, ChevronLeftIcon as xm, ChevronRightIcon as Cm, ChevronDownIcon as Em, Calendar as Il, Hash as ua, Image as wi, X as Ot, Type as Ir, Heading1 as Tm, Heading2 as Mm, Heading3 as Sm, Heading4 as Dm, Heading5 as Am, Code2 as Ll, Table as $s, Minus as Ol, FileText as Ni, Plus as yi, Undo as Pm, Redo as Rm, IndentIncrease as Im, IndentDecrease as Lm, PenLine as Om, Library as _m, Columns as da, Trash2 as Rn, Rows as ma, ToggleLeft as fa, ArrowUpDown as $m, Search as Bm, ChevronUp as Hm, MousePointerClick as Wm, CaseSensitive as Fm, WholeWord as zm, Regex as Um, Replace as Bs, ReplaceAll as Ym, Cloud as jm, Loader2 as _l, CloudOff as Km, AlertCircle as Vm, RotateCcw as ki, ImagePlus as Gm, Activity as qm, Maximize2 as $l, Minimize2 as Bl, AlertTriangle as Xm, CheckCircle2 as Zm, MessageSquare as Hl, RefreshCw as Qm, SpellCheck as Jm, PanelRightClose as ef, PanelRightOpen as tf, Eye as nf } from "lucide-react";
import xi from "highlight.js/lib/languages/javascript";
import Ci from "highlight.js/lib/languages/typescript";
import Wl from "highlight.js/lib/languages/python";
import Ei from "highlight.js/lib/languages/xml";
import of from "highlight.js/lib/languages/css";
import rf from "highlight.js/lib/languages/json";
import Lr from "highlight.js/lib/languages/bash";
import * as Fl from "react-dom";
import sf, { createPortal as af } from "react-dom";
import lf from "@tiptap/extension-image";
import { createRoot as cf } from "react-dom/client";
import { jsx as Y, Fragment as uf, jsxs as df } from "react/jsx-runtime";
import { Fragment as mf } from "@tiptap/pm/model";
import { liftListItem as ha, sinkListItem as pa } from "@tiptap/pm/schema-list";
import { undo as ff, redo as hf } from "@tiptap/pm/history";
import pf from "@tiptap/extension-horizontal-rule";
const gf = new Ke("tableCellMenu");
let ga = !1, qo = null;
function bf() {
  ga || (ga = !0, document.addEventListener("mouseover", (e) => {
    const n = e.target.closest("td, th");
    if (n && n.closest(".ProseMirror")) {
      const o = n.querySelector(".table-cell-menu-btn");
      o && (o.style.opacity = "1");
    }
  }, !0), document.addEventListener("mouseout", (e) => {
    const t = e.target, n = e.relatedTarget, o = t.closest("td, th");
    if (o && o.closest(".ProseMirror")) {
      if (n && o.contains(n) || document.querySelector(".table-cell-menu-dropdown")) return;
      const s = o.querySelector(".table-cell-menu-btn");
      s && (s.style.opacity = "0");
    }
  }, !0));
}
function vf(e) {
  return bf(), new je({
    key: gf,
    state: {
      init() {
        return Xe.empty;
      },
      apply(t, n, o, r) {
        return !t.docChanged && qo ? qo.map(t.mapping, t.doc) : (qo = wf(r.doc, e), qo);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function wf(e, t) {
  const n = [];
  return e.descendants((o, r) => {
    if (o.type.name === "tableCell" || o.type.name === "tableHeader") {
      const s = st.widget(r + 1, (a) => {
        const i = document.createElement("div");
        i.className = "table-cell-menu-wrapper ProseMirror-widget", i.setAttribute("contenteditable", "false"), i.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const l = document.createElement("button");
        l.className = "table-cell-menu-btn", l.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', l.title = "Table options", l.type = "button";
        const c = document.documentElement.classList.contains("dark"), u = c ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", d = c ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", f = c ? "#999" : "#666", h = c ? "#2a2a2a" : "#f5f5f5";
        return l.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + u + ";border:1px solid " + d + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + f + ";pointer-events:auto;padding:0;", l.addEventListener("mouseenter", () => {
          l.style.opacity = "1", l.style.background = h, l.style.transform = "scale(1.05)";
        }), l.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), l.style.background = u, l.style.transform = "scale(1)";
        }), l.addEventListener("click", (p) => {
          p.preventDefault(), p.stopPropagation();
          const g = l.getBoundingClientRect();
          t.chain().focus().setTextSelection(r + 1).run(), Nf(p, t, r, g);
        }), i.appendChild(l), i;
      }, { side: -1, key: "menu-" + r });
      n.push(s);
    }
  }), Xe.create(e, n);
}
function Nf(e, t, n, o) {
  const r = document.querySelector(".table-cell-menu-dropdown");
  r && r.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const a = 170, i = 280;
  let l = Math.max(0, Math.min(o.top, window.innerHeight)), c = Math.max(0, Math.min(o.bottom, window.innerHeight)), u = Math.max(0, Math.min(o.left, window.innerWidth)), d = c + 4, f = u - a + o.width + 8;
  f + a > window.innerWidth - 12 && (f = window.innerWidth - a - 12), f < 12 && (f = 12), d + i > window.innerHeight - 12 && (d = l - i - 4), d < 12 && (d = 12), d + i > window.innerHeight - 12 && (d = window.innerHeight - i - 12);
  const h = document.documentElement.classList.contains("dark"), p = h ? "#1f1f1f" : "#ffffff", g = h ? "#3a3a3a" : "#e5e5e5", b = h ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + d + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + p + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + b + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const w = t.state.doc.resolve(n);
  let v = !1;
  for (let D = w.depth; D >= 0; D--)
    if (w.node(D).type.name === "table") {
      w.node(D).firstChild?.firstChild?.type.name === "tableHeader" && (v = !0);
      break;
    }
  const N = [
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
    { label: "Copy Table", icon: "copy", action: () => yf(t) }
  ], C = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, y = h ? "#2a2a2a" : "#f5f5f5", k = h ? "#ff6b6b" : "#dc2626", S = h ? "#999999" : "#666666", x = h ? "#333333" : "#e5e5e5";
  N.forEach((D) => {
    if (D.label === "divider") {
      const A = document.createElement("div");
      A.style.cssText = "height:1px;background:" + x + ";margin:4px 0;", s.appendChild(A);
    } else {
      const A = document.createElement("button");
      A.type = "button";
      const I = D.destructive ? k : b;
      A.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + I + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const L = C[D.icon || ""] || "", $ = D.destructive ? k : S;
      A.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + $ + ';">' + L + '</span><span style="flex:1;white-space:nowrap;">' + D.label + "</span>", A.addEventListener("mouseenter", () => {
        A.style.background = D.destructive ? h ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : y;
      }), A.addEventListener("mouseleave", () => {
        A.style.background = "transparent";
      }), A.addEventListener("click", (W) => {
        W.preventDefault(), W.stopPropagation(), D.action && D.action(), s.remove();
      }), s.appendChild(A);
    }
  }), document.body.appendChild(s);
  const T = (D) => {
    const A = D.target;
    if (s.contains(A) || A.classList.contains("table-cell-menu-btn"))
      return;
    const I = A.closest('[role="dialog"]');
    I && I.contains(s) || (s.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", M));
  }, M = (D) => {
    D.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", M));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", T), document.addEventListener("keydown", M);
  }, 0);
}
function yf(e) {
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
const kf = em.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      vf(this.editor)
    ];
  }
}), xf = tm.extend({}), bo = new Ke("tableSorting");
let un = null, fo = null;
function Cf(e) {
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
function Ef(e, t, n) {
  let o = 0;
  return e.type === "number" && t.type === "number" ? o = e.value - t.value : e.type === "date" && t.type === "date" ? o = e.value.getTime() - t.value.getTime() : o = String(e.value).localeCompare(String(t.value)), n === "asc" ? o : -o;
}
function Tf(e, t, n) {
  const { state: o, view: r } = e;
  let s = null;
  if (o.doc.nodesBetween(t, t + 1, (p, g) => {
    if (p.type.name === "table" && g === t)
      return s = p, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = un?.tablePos === t && un?.columnIndex === n && un?.direction === "asc" ? "desc" : "asc";
  un = { tablePos: t, columnIndex: n, direction: a }, fo = null;
  const i = [];
  s.forEach((p) => {
    if (p.type.name === "tableRow") {
      let g = !1;
      p.forEach((b) => {
        b.type.name === "tableHeader" && (g = !0);
      }), i.push({ node: p, isHeader: g });
    }
  });
  const l = i.filter((p) => p.isHeader), c = i.filter((p) => !p.isHeader);
  if (c.length < 2) {
    ba(n, a), r.dispatch(o.tr.setMeta(bo, { updated: !0 }));
    return;
  }
  const u = c.map((p) => {
    let g = "", b = 0;
    return p.node.forEach((w) => {
      b === n && (g = w.textContent || ""), b++;
    }), { ...p, sortValue: Cf(g) };
  }), d = u.map((p, g) => g);
  u.sort((p, g) => Ef(p.sortValue, g.sortValue, a));
  const f = u.map((p, g) => c.indexOf(p));
  if (d.some((p, g) => p !== f[g])) {
    const p = [];
    l.forEach((w) => p.push(w.node)), u.forEach((w) => p.push(w.node));
    const g = s.type.create(s.attrs, p), { tr: b } = o;
    b.replaceWith(t, t + s.nodeSize, g), b.setMeta(bo, { updated: !0 }), r.dispatch(b);
  } else
    r.dispatch(o.tr.setMeta(bo, { updated: !0 }));
  ba(n, a);
}
function ba(e, t) {
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
function Mf(e, t, n, o) {
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
    u.preventDefault(), u.stopPropagation(), Tf(o, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), r.appendChild(s), r;
}
function Sf(e) {
  return new je({
    key: bo,
    state: {
      init() {
        return Xe.empty;
      },
      apply(t, n, o, r) {
        const s = t.getMeta(bo);
        return !t.docChanged && !s?.updated && fo ? fo.map(t.mapping, t.doc) : (fo = Df(r.doc, e), fo);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Df(e, t) {
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
              u.forEach((N, C) => {
                N.type.name === "paragraph" && (h = f + 1 + C + N.nodeSize - 1);
              });
              const g = un?.tablePos === s && un?.columnIndex === l ? un.direction : null, b = l, w = s, v = st.widget(h, () => Mf(g, w, b, t), { side: 1, key: "sort-" + s + "-" + b });
              n.push(v);
            }
            c += u.nodeSize, l++;
          });
        }
      });
    }
  }), Xe.create(e, n);
}
const Af = dt.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Sf(this.editor)];
  }
});
function Ti(e, t, n, o, r, s = {}) {
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
const Pf = om.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: s } = r, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let h = s.depth; h > 0; h--) {
          const p = s.node(h);
          if (p.type === a || p.type === i || p.type === l) {
            d = p.type, f = s.before(h);
            break;
          }
        }
        if (d === a)
          return e.liftListItem("listItem");
        if (d === i || d === l) {
          if (!o) return !0;
          if (Ti(n, f, a, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Rf = rm.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: s } = r, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let h = s.depth; h > 0; h--) {
          const p = s.node(h);
          if (p.type === a || p.type === i || p.type === l) {
            d = p.type, f = s.before(h);
            break;
          }
        }
        if (d === l)
          return e.liftListItem("listItem");
        if (d === i || d === a) {
          if (!o) return !0;
          if (Ti(n, f, l, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), If = im.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: o, dispatch: r, chain: s, can: a }) => {
        const { selection: i } = n, { $from: l, $to: c } = i, u = l.blockRange(c);
        if (!u)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let h = !1;
        for (let y = l.depth; y > 0; y--)
          if (l.node(y).type === d) {
            h = !0, l.before(y);
            break;
          }
        if (h)
          return t.liftListItem("taskItem");
        const p = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, b = n.schema.nodes.listItem;
        let w = null, v = -1;
        for (let y = l.depth; y > 0; y--) {
          const k = l.node(y);
          if (k.type === p || k.type === g) {
            w = k, v = l.before(y);
            break;
          }
        }
        if (w) {
          if (!r) return !0;
          const y = v, k = o.doc.nodeAt(y);
          if (!k) return !1;
          o.setNodeMarkup(y, d, k.attrs);
          const S = o.doc.nodeAt(y);
          if (!S) return !1;
          const x = [];
          S.forEach((T, M) => {
            T.type === b && x.push(y + 1 + M);
          });
          for (let T = x.length - 1; T >= 0; T--) {
            const M = x[T], D = o.doc.nodeAt(M);
            D && D.type === b && o.setNodeMarkup(M, f, { checked: !1 });
          }
          return r(o), !0;
        }
        if (!r) return !0;
        const N = ca(u, d);
        if (N) {
          o.wrap(u, N);
          const { $from: y } = o.selection;
          let k = -1;
          for (let S = y.depth; S > 0; S--)
            if (y.node(S).type === d) {
              k = y.before(S);
              break;
            }
          if (k >= 0) {
            const S = o.doc.nodeAt(k);
            if (S) {
              const x = [];
              S.forEach((T, M) => {
                T.type === b && x.push(k + 1 + M);
              });
              for (let T = x.length - 1; T >= 0; T--) {
                const M = x[T], D = o.doc.nodeAt(M);
                D && D.type === b && o.setNodeMarkup(M, f, { checked: !1 });
              }
            }
          }
          return r(o), !0;
        }
        const C = ca(u, p);
        if (C) {
          o.wrap(u, C);
          const { $from: y } = o.selection;
          let k = -1;
          for (let S = y.depth; S > 0; S--)
            if (y.node(S).type === p) {
              k = y.before(S);
              break;
            }
          return k >= 0 && Ti(o, k, d, f, b, { checked: !1 }), r(o), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Lf = am.extend({
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
          const d = o.before(s), { tr: f } = n, h = n.schema.nodes.taskItem, p = n.schema.nodes.paragraph, g = h.create(
            { checked: !1 },
            p.create()
          );
          f.insert(d, g);
          const b = d + 1;
          return f.setSelection(fn.create(f.doc, b)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
          handleTextInput(n, o, r, s) {
            if (s !== " ") return !1;
            const { state: a } = n, i = a.doc.resolve(o), l = i.parent.textBetween(
              0,
              i.parentOffset,
              void 0,
              "￼"
            ), u = /^\s*(-\s*)?\[([( |x])?\]$/.exec(l);
            if (!u) return !1;
            const d = u[2] === "x", f = i.start() + (u.index || 0), h = o, p = a.tr;
            p.delete(f, h);
            const b = p.doc.resolve(f).blockRange();
            if (!b || !t || !e) return !1;
            const w = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (p.wrap(b, w), f > 1) {
              const v = p.doc.resolve(f - 1).nodeBefore;
              v && v.type === t && lm(p.doc, f - 1) && p.join(f - 1);
            }
            return n.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), Of = sm.extend({
  content: "paragraph block*"
}), va = new Ke("collapsibleList");
function Hs(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function Ws(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((o) => {
    t.includes(o.type.name) && (n = !0);
  }), n;
}
function _f(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let o = -1, r = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (o === -1 && (o = s), r = s + a.nodeSize), s += a.nodeSize;
  }), o === -1 ? null : { start: o, end: r };
}
let In = null;
function fs(e, t, n) {
  const o = [];
  return e.descendants((r, s) => {
    if (!n.listItemTypes.includes(r.type.name) || !Ws(r))
      return !0;
    const a = Hs(r, s), i = t.collapsedItems.has(a);
    o.push(
      st.node(s, s + r.nodeSize, {
        class: `collapsible-list-item ${i ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const l = r.firstChild;
    if (l && l.type.name === "paragraph") {
      const c = s + 1 + l.nodeSize - 1, u = st.widget(
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
          const p = document.createElement("button");
          return p.className = `collapsible-list-chevron ${i ? "collapsed" : "expanded"}`, p.setAttribute("data-list-item-id", a), p.setAttribute("contenteditable", "false"), p.setAttribute("tabindex", "-1"), p.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', p.title = i ? "Click to expand" : "Click to collapse", p.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const b = p.classList.contains("collapsed");
            p.classList.remove("collapsed", "expanded"), p.classList.add(b ? "expanded" : "collapsed"), p.title = b ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), In && In.dispatch(
              In.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), h.appendChild(p), h;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      o.push(u);
    }
    if (i && _f(r, s)) {
      let u = s + 1;
      r.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && o.push(
          st.node(u, u + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += d.nodeSize;
      });
    }
    return !0;
  }), Xe.create(e, o);
}
const $f = dt.create({
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
        if (!r || !this.options.listItemTypes.includes(r.type.name) || !Ws(r))
          return !1;
        const s = Hs(r, e);
        return o.collapsedItems.has(s) ? o.collapsedItems.delete(s) : o.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((r, s) => {
          this.options.listItemTypes.includes(r.type.name) && Ws(r) && n.collapsedItems.add(Hs(r, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new je({
        key: va,
        view(n) {
          return In = n, {
            update(o) {
              In = o;
            },
            destroy() {
              In = null;
            }
          };
        },
        state: {
          init(n, o) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: fs(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: fs(s.doc, e, t),
              docVersion: o.docVersion + 1
            } : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = va.getState(n);
            return o?.decorations ? o.decorations : fs(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Ae = hm();
Ae.register("javascript", xi);
Ae.register("js", xi);
Ae.register("jsx", xi);
Ae.register("typescript", Ci);
Ae.register("ts", Ci);
Ae.register("tsx", Ci);
Ae.register("python", Wl);
Ae.register("py", Wl);
Ae.register("xml", Ei);
Ae.register("html", Ei);
Ae.register("svg", Ei);
Ae.register("css", of);
Ae.register("json", rf);
Ae.register("bash", Lr);
Ae.register("sh", Lr);
Ae.register("shell", Lr);
Ae.register("zsh", Lr);
const Fs = {
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
}, Xo = /* @__PURE__ */ new Set(), Zo = /* @__PURE__ */ new Set();
async function Bf(e) {
  if (Ae.registered(e)) return !0;
  const t = Fs[e];
  if (!t) return !1;
  if (Zo.has(e)) return !0;
  if (Xo.has(e))
    return new Promise((n) => {
      const o = () => {
        Zo.has(e) ? n(!0) : Xo.has(e) ? setTimeout(o, 50) : n(!1);
      };
      setTimeout(o, 50);
    });
  Xo.add(e);
  try {
    const o = (await t()).default;
    Ae.register(e, o), Zo.add(e);
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
          a !== e && !Ae.registered(a) && (Ae.register(a, o), Zo.add(a));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Xo.delete(e);
  }
}
function Hf({ node: e, updateAttributes: t, extension: n }) {
  const [o, r] = K(!1), [s, a] = K(!1), [i, l] = K(!0), c = V(null), u = e.attrs.language || "plaintext";
  Q(() => {
    const g = c.current;
    if (!g || s) return;
    const b = new IntersectionObserver(
      (w) => {
        for (const v of w)
          v.isIntersecting && (a(!0), b.unobserve(g));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return b.observe(g), () => {
      b.disconnect();
    };
  }, [s]), Q(() => {
    if (s && u !== "plaintext") {
      if (Ae.registered(u)) {
        l(!0);
        return;
      }
      Fs[u] && (l(!1), Bf(u).then((g) => {
        l(g);
      }));
    }
  }, [s, u]);
  const d = U(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), r(!0), setTimeout(() => r(!1), 2e3);
    } catch (g) {
      console.error("Failed to copy:", g);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], h = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(Fs)])).sort(), p = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ m(Wn, { className: "code-block-wrapper", ref: c, children: [
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
                lineNumber: 265,
                columnNumber: 13
              }, this),
              h.map((g) => /* @__PURE__ */ m("option", { value: g, children: g.charAt(0).toUpperCase() + g.slice(1) }, g, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 267,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 260,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: p }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Qt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 273,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
        lineNumber: 259,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: d,
          className: `code-block-copy-btn ${o ? "copied" : ""}`,
          title: o ? "Copied!" : "Copy code",
          children: o ? /* @__PURE__ */ m(Kn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 281,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Vn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 281,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 275,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 258,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !i ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(ii, { className: s && i ? `language-${u}` : "language-plaintext" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 288,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 287,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
    lineNumber: 256,
    columnNumber: 5
  }, this);
}
const Wf = fm.extend({
  addNodeView() {
    return Dr(Hf);
  }
}).configure({
  lowlight: Ae,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function Ht({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: o
}) {
  const r = U(
    (i) => {
      o?.(i), i.stopPropagation();
    },
    [o]
  ), s = U((i) => {
    i.stopPropagation();
  }, []), a = U((i) => {
    i.stopPropagation();
  }, []);
  return af(
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
function Ff({ editor: e, isOpen: t, onClose: n }) {
  const [o, r] = K(""), s = V(null), a = V(null), [i, l] = K({ top: 0, left: 0 });
  Q(() => {
    if (t) {
      const p = e.getAttributes("link").href || "";
      r(p);
      try {
        const { view: g } = e, { from: b } = g.state.selection, w = g.coordsAtPos(b), v = w.bottom + 8, N = Math.max(16, Math.min(w.left, window.innerWidth - 420));
        l({ top: v, left: N });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), Q(() => {
    if (!t) return;
    const p = (v) => {
      a.current && !a.current.contains(v.target) && n();
    }, g = () => {
      n();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", p);
    }, 10), w = e.view.dom.closest(".editor-content-wrapper");
    return w?.addEventListener("scroll", g), () => {
      clearTimeout(b), document.removeEventListener("mousedown", p), w?.removeEventListener("scroll", g);
    };
  }, [t, n, e]);
  const c = U((p) => {
    if (p?.preventDefault(), o.trim()) {
      let g = o.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [o, e, n]), u = U((p) => {
    p.key === "Escape" ? (p.preventDefault(), n()) : p.key === "Enter" && (p.preventDefault(), c());
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
          /* @__PURE__ */ m(ai, { className: "link-popover-icon", size: 16 }, void 0, !1, {
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
              onChange: (p) => r(p.target.value),
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
  return /* @__PURE__ */ m(Ht, { children: h }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
    lineNumber: 161,
    columnNumber: 10
  }, this);
}
function zf({ editor: e, onEditLink: t }) {
  const [n, o] = K({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), r = V(null), s = V(null), a = U((N) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const C = N.getAttribute("href") || "", y = N.getBoundingClientRect(), k = y.bottom + 8, S = Math.max(16, Math.min(y.left, window.innerWidth - 340));
        o({
          isVisible: !0,
          url: C,
          position: { top: k, left: S },
          linkElement: N
        });
      } catch (C) {
        console.warn("LinkHoverTooltip: Error showing tooltip", C);
      }
    }
  }, [e]), i = U(() => {
    s.current = setTimeout(() => {
      o((N) => ({ ...N, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = U(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  Q(() => {
    if (!e || e.isDestroyed) return;
    const N = e.view.dom;
    if (!N) return;
    const C = (k) => {
      const x = k.target.closest("a");
      x && N.contains(x) && a(x);
    }, y = (k) => {
      const S = k.target, x = k.relatedTarget;
      if (S.closest("a")) {
        if (x && r.current?.contains(x))
          return;
        i();
      }
    };
    return N.addEventListener("mouseover", C), N.addEventListener("mouseout", y), () => {
      N.removeEventListener("mouseover", C), N.removeEventListener("mouseout", y), s.current && clearTimeout(s.current);
    };
  }, [e, a, i]), Q(() => {
    if (!n.isVisible) return;
    const N = () => {
      o((y) => ({ ...y, isVisible: !1, linkElement: null }));
    }, C = e.view.dom.closest(".editor-content-wrapper");
    return C?.addEventListener("scroll", N), window.addEventListener("scroll", N, !0), () => {
      C?.removeEventListener("scroll", N), window.removeEventListener("scroll", N, !0);
    };
  }, [n.isVisible, e]);
  const [c, u] = K(!1), d = U(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      u(!0), setTimeout(() => u(!1), 1500);
    });
  }, [n.url]), f = U(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), h = U(() => {
    if (n.linkElement) {
      const { view: N } = e, { doc: C } = N.state;
      let y = null, k = null;
      C.descendants((S, x) => {
        if (S.isText && S.marks.some((T) => T.type.name === "link")) {
          const T = N.nodeDOM(x);
          if (T && (T === n.linkElement || T.parentElement === n.linkElement))
            return y = x, k = x + S.nodeSize, !1;
        }
        return !0;
      }), y !== null && k !== null ? e.chain().focus().setTextSelection({ from: y, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    o((N) => ({ ...N, isVisible: !1 }));
  }, [e, n.linkElement]), p = U(() => {
    if (n.linkElement) {
      const { view: N } = e, { doc: C } = N.state;
      C.descendants((y, k) => {
        if (y.isText && y.marks.some((S) => S.type.name === "link")) {
          const S = N.nodeDOM(k);
          if (S && (S === n.linkElement || S.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + y.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    o((N) => ({ ...N, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const g = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, w = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", v = /* @__PURE__ */ m(
    "div",
    {
      ref: r,
      className: "link-hover-tooltip",
      "data-theme": w,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`
      },
      onMouseEnter: l,
      onMouseLeave: i,
      children: /* @__PURE__ */ m("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: f,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ m(wm, { size: 13, className: "link-hover-tooltip-link-icon" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 247,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: g || "No URL" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 248,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
            lineNumber: 242,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ m(Nm, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 259,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 254,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: d,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: c ? /* @__PURE__ */ m(Kn, { size: 14, style: { color: "var(--primary)" } }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 268,
                columnNumber: 23
              }, this) : /* @__PURE__ */ m(Vn, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 268,
                columnNumber: 81
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 263,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(ym, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 277,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 272,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
          lineNumber: 252,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
        lineNumber: 240,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
      lineNumber: 228,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Ht, { children: v }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
    lineNumber: 285,
    columnNumber: 10
  }, this);
}
const rt = ({ onMouseDown: e, isActive: t, disabled: n, children: o, title: r }) => /* @__PURE__ */ m(
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
    lineNumber: 50,
    columnNumber: 3
  },
  void 0
), wa = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
  lineNumber: 69,
  columnNumber: 3
}, void 0), Na = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Uf = jn(function({ editor: t, isH1: n, isH2: o, isH3: r, isH4: s, isH5: a, executeCommand: i }) {
  const [l, c] = K(!1), u = V(null), d = n ? "h1" : o ? "h2" : r ? "h3" : s ? "h4" : a ? "h5" : "paragraph", f = Na.find((p) => p.value === d)?.shortLabel || "P";
  Q(() => {
    if (!l) return;
    const p = (g) => {
      u.current && !u.current.contains(g.target) && c(!1);
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [l]);
  const h = (p, g) => {
    if (p.preventDefault(), p.stopPropagation(), g === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const b = parseInt(g.replace("h", ""));
      t.chain().focus().toggleHeading({ level: b }).run();
    }
    c(!1);
  };
  return /* @__PURE__ */ m("div", { ref: u, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onMouseDown: (p) => {
          p.preventDefault(), p.stopPropagation(), c(!l);
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
            lineNumber: 143,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(Qt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 144,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 126,
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
        children: Na.map((p) => {
          const g = p.value === d;
          return /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (b) => h(b, p.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${g ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ m("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: p.shortLabel }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 172,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m("span", { children: p.label }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 173,
                  columnNumber: 17
                }, this)
              ]
            },
            p.value,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 160,
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
        lineNumber: 148,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 125,
    columnNumber: 5
  }, this);
}), Yf = jn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: o = !1, aiEnabled: r = !1, onAISparklesClick: s }) {
  const a = V(null), i = Cl({
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
  }), [l, c] = K(!1), [u, d] = K(""), [f, h] = K(!1), [p, g] = K({ top: 0, left: 0 }), b = V(null), w = V(null), v = V(null), N = U(() => {
    if (u) {
      let T = u.trim();
      !/^https?:\/\//i.test(T) && !T.startsWith("mailto:") && (T = "https://" + T), t.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    c(!1), d("");
  }, [t, u]), C = (T) => {
    T.preventDefault(), T.stopPropagation();
    const M = t.getAttributes("link").href;
    d(M || ""), c(!0);
  }, y = U((T, M) => {
    T.preventDefault(), T.stopPropagation(), M();
  }, []);
  Q(() => {
    if (!t || t.isDestroyed) return;
    const T = () => {
      if (!t.isDestroyed)
        try {
          const { selection: M } = t.state, { empty: D, from: A, to: I } = M, W = ("node" in M && M.node ? M.node : null)?.type?.name === "resizableImage";
          if (D || W || t.isActive("codeBlock")) {
            v.current && (clearTimeout(v.current), v.current = null), w.current && clearTimeout(w.current), w.current = setTimeout(() => {
              h(!1), c(!1);
            }, 150);
            return;
          }
          w.current && (clearTimeout(w.current), w.current = null);
          const q = t.view.coordsAtPos(A), R = t.view.coordsAtPos(I), P = b.current?.offsetWidth || 500, z = b.current?.offsetHeight || 40, X = 8, G = window.innerWidth;
          let Z = 0, te = 0;
          if (b.current) {
            const ge = b.current.closest('[data-slot="dialog-content"]');
            if (ge) {
              const be = ge.getBoundingClientRect();
              Z = be.left, te = be.top;
            }
          }
          let H = (q.left + R.left) / 2 - P / 2 - Z;
          const j = Z ? G - Z : G;
          H = Math.max(X, Math.min(j - P - X, H));
          let ee = q.top - z - 10 - te;
          ee < X && (ee = R.bottom + 10 - te), f ? g({ top: Math.max(X, ee), left: H }) : (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
            g({ top: Math.max(X, ee), left: H }), h(!0);
          }, 50));
        } catch (M) {
          console.warn("FloatingToolbar: Error updating position", M);
        }
    };
    return t.on("selectionUpdate", T), () => {
      t.off("selectionUpdate", T), w.current && clearTimeout(w.current), v.current && clearTimeout(v.current);
    };
  }, [t, f]);
  const k = (T) => {
    w.current && (clearTimeout(w.current), w.current = null);
  };
  if (!f || o)
    return null;
  const S = 15, x = l ? /* @__PURE__ */ m(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: p.top,
        left: p.left
      },
      onMouseDown: k,
      children: /* @__PURE__ */ m("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: u,
            onChange: (T) => d(T.target.value),
            onKeyDown: (T) => {
              T.key === "Enter" && (T.preventDefault(), N()), T.key === "Escape" && (c(!1), d(""));
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
            lineNumber: 384,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (T) => {
                T.preventDefault(), N();
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
              lineNumber: 408,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (T) => {
                T.preventDefault(), c(!1), d("");
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
              lineNumber: 421,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 407,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 383,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 373,
      columnNumber: 5
    },
    this
  ) : /* @__PURE__ */ m(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: p.top,
        left: p.left
      },
      onMouseDown: k,
      children: [
        /* @__PURE__ */ m(
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleBold().run()),
            isActive: i?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(li, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 455,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 450,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleItalic().run()),
            isActive: i?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(ci, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 462,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 457,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleUnderline().run()),
            isActive: i?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(ui, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 469,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 464,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleStrike().run()),
            isActive: i?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(di, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 476,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 471,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleCode().run()),
            isActive: i?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(Sl, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 483,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 478,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleHighlight().run()),
            isActive: i?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(Dl, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 490,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 485,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          rt,
          {
            onMouseDown: C,
            isActive: i?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(mi, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 498,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 493,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(wa, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 501,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m(
          Uf,
          {
            editor: t,
            isH1: i?.isH1 ?? !1,
            isH2: i?.isH2 ?? !1,
            isH3: i?.isH3 ?? !1,
            isH4: i?.isH4 ?? !1,
            isH5: i?.isH5 ?? !1,
            executeCommand: y
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 504,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleBlockquote().run()),
            isActive: i?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(fi, { size: S }, void 0, !1, {
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
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleBulletList().run()),
            isActive: i?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(hi, { size: S }, void 0, !1, {
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
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleOrderedList().run()),
            isActive: i?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(pi, { size: S }, void 0, !1, {
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
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleTaskList().run()),
            isActive: i?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(gi, { size: S }, void 0, !1, {
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
          rt,
          {
            onMouseDown: (T) => y(T, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: i?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(km, { size: S }, void 0, !1, {
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
        r && /* @__PURE__ */ m(Be, { children: [
          /* @__PURE__ */ m(wa, {}, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 552,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              ref: a,
              onMouseDown: (T) => {
                T.preventDefault(), T.stopPropagation(), a.current && s?.(a.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ m(Rr, { size: S }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
                lineNumber: 570,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 553,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 551,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 439,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Ht, { onMouseDown: k, children: x }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 578,
    columnNumber: 5
  }, this);
}), Qo = {
  info: { icon: vr, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: Pl, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: Al, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: vi, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: bi, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function jf({ node: e, updateAttributes: t, editor: n }) {
  const [o, r] = K(!1), [s, a] = K(!1), [i, l] = K(null), c = V(null), u = V(null), d = e.attrs.type || "info", f = Qo[d] || Qo.info, h = f.icon, p = U(() => {
    if (u.current) {
      const v = u.current.getBoundingClientRect();
      l({
        top: v.bottom + 4,
        left: v.left
      });
    }
  }, []);
  Q(() => {
    if (!o) return;
    const v = (N) => {
      c.current && !c.current.contains(N.target) && u.current && !u.current.contains(N.target) && r(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [o]), Q(() => {
    if (!o) return;
    const v = () => r(!1);
    return window.addEventListener("scroll", v, !0), () => window.removeEventListener("scroll", v, !0);
  }, [o]);
  const g = U(() => {
    n.isEditable && (o || p(), r(!o));
  }, [n.isEditable, o, p]), b = (v) => {
    t({ type: v }), r(!1);
  }, w = U((v) => {
    v.stopPropagation(), a((N) => !N);
  }, []);
  return /* @__PURE__ */ m(Wn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ m(
      "div",
      {
        className: "callout-header",
        contentEditable: !1,
        onClick: w,
        style: { cursor: "pointer" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ m(
            "button",
            {
              ref: u,
              className: "callout-header-button",
              onClick: (v) => {
                v.stopPropagation(), g();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor },
              contentEditable: !1,
              children: [
                /* @__PURE__ */ m(h, { size: 18 }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 126,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 127,
                  columnNumber: 11
                }, this),
                n.isEditable && /* @__PURE__ */ m(Qt, { size: 12, className: "callout-type-chevron" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 128,
                  columnNumber: 33
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 115,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(Rl, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 134,
                columnNumber: 24
              }, this) : /* @__PURE__ */ m(Qt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 134,
                columnNumber: 53
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 130,
              columnNumber: 9
            },
            this
          ),
          o && n.isEditable && i && /* @__PURE__ */ m(Ht, { children: /* @__PURE__ */ m(
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
              children: Object.keys(Qo).map((v) => {
                const N = Qo[v], C = N.icon;
                return /* @__PURE__ */ m(
                  "button",
                  {
                    className: `callout-type-option ${v === d ? "active" : ""}`,
                    onClick: (y) => {
                      y.stopPropagation(), b(v);
                    },
                    onMouseDown: (y) => y.stopPropagation(),
                    style: { "--callout-option-color": N.color },
                    children: [
                      /* @__PURE__ */ m(C, { size: 16, style: { color: N.borderColor } }, void 0, !1, {
                        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 163,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ m("span", { children: N.label }, void 0, !1, {
                        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 164,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  v,
                  !0,
                  {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                    lineNumber: 153,
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
              lineNumber: 139,
              columnNumber: 11
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 138,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
        lineNumber: 108,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(ii, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 175,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 174,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
    lineNumber: 106,
    columnNumber: 5
  }, this);
}
const Kf = Ar.create({
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
    return Dr(jf);
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
}), Vf = lf.extend({
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
    return ({ node: t, editor: n, getPos: o }) => {
      let r = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const a = (P) => {
        const z = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[P] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${z}`;
      };
      a(t.attrs.align || "left");
      const i = document.createElement("img");
      i.alt = t.attrs.alt || "", t.attrs.width && (i.style.width = `${t.attrs.width}px`);
      const l = (P) => !(!P || P.startsWith("data:") || P.startsWith("blob:") || P.startsWith("http://") || P.startsWith("https://")), c = (P) => {
        l(P) && e.resolveImageSrc ? (i.style.opacity = "0.5", i.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(P).then((z) => {
          i.src = z, i.style.opacity = "1";
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
      const h = (P, z, X) => {
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
        `, G.innerHTML = `${z}<span>${P}</span>`, G.addEventListener("mouseenter", () => {
          G.style.background = "oklch(0.95 0 0)";
        }), G.addEventListener("mouseleave", () => {
          G.style.background = "transparent";
        }), G.addEventListener("click", (Z) => {
          Z.preventDefault(), Z.stopPropagation(), X(), f.style.display = "none", T = !1;
        }), G;
      }, p = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', w = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(h("Edit", p, () => {
        const P = typeof o == "function" ? o() : null;
        if (P != null && e.onImageClick) {
          const z = i.getBoundingClientRect();
          e.onImageClick({
            src: r.attrs.src,
            alt: r.attrs.alt || "",
            pos: P,
            rect: z
          });
        }
      })), f.appendChild(h("Copy image", g, async () => {
        const P = r.attrs.src;
        try {
          const X = await (await fetch(P)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [X.type]: X })
          ]);
        } catch {
          try {
            const z = new window.Image();
            z.crossOrigin = "anonymous", await new Promise((Z, te) => {
              z.onload = () => Z(), z.onerror = () => te(new Error("Image load failed")), z.src = P;
            });
            const X = document.createElement("canvas");
            X.width = z.naturalWidth, X.height = z.naturalHeight;
            const G = X.getContext("2d");
            if (G) {
              G.drawImage(z, 0, 0);
              const Z = await new Promise(
                (te) => X.toBlob(te, "image/png")
              );
              Z ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": Z })
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
        const P = r.attrs.src, z = r.attrs.alt || "image", X = document.createElement("a");
        X.href = P, X.download = z, X.target = "_blank", X.rel = "noopener noreferrer", document.body.appendChild(X), X.click(), setTimeout(() => {
          document.body.removeChild(X);
        }, 100);
      }));
      const v = document.createElement("div");
      v.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(v);
      const N = document.createElement("div");
      N.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, N.textContent = "Alignment", f.appendChild(N);
      const C = document.createElement("div");
      C.style.cssText = `
        display: flex;
        margin: 4px 8px 4px;
        background: oklch(0.94 0 0);
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
      `;
      const y = [
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
      ], k = [], S = (P) => {
        k.forEach((z) => {
          (z.getAttribute("data-align-value") || "left") === P ? (z.style.background = "oklch(1 0 0)", z.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", z.style.color = "oklch(0.25 0 0)", z.style.fontWeight = "600") : (z.style.background = "transparent", z.style.boxShadow = "none", z.style.color = "oklch(0.5 0 0)", z.style.fontWeight = "400");
        });
      };
      y.forEach(({ value: P, label: z, icon: X }) => {
        const G = document.createElement("button");
        G.setAttribute("type", "button"), G.setAttribute("data-align-value", P), G.setAttribute("title", `Align ${z.toLowerCase()}`), G.style.cssText = `
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
        `, G.innerHTML = `${X}<span>${z}</span>`, G.addEventListener("click", (Z) => {
          Z.preventDefault(), Z.stopPropagation();
          const te = typeof o == "function" ? o() : null;
          if (te != null)
            try {
              const { state: _, dispatch: H } = n.view, j = _.doc.nodeAt(te);
              if (j && j.type.name === "resizableImage") {
                const ee = _.tr.setNodeMarkup(te, void 0, {
                  ...j.attrs,
                  align: P
                });
                H(ee);
              }
            } catch {
              n.chain().focus().setNodeSelection(te).updateAttributes("resizableImage", {
                align: P
              }).run();
            }
          S(P);
        }), k.push(G), C.appendChild(G);
      }), f.appendChild(C);
      const x = () => {
        const P = r.attrs.align || "left";
        S(P);
      };
      let T = !1;
      d.addEventListener("click", (P) => {
        if (P.preventDefault(), P.stopPropagation(), T)
          f.style.display = "none", T = !1;
        else {
          const z = d.getBoundingClientRect(), X = 200, G = f.closest('[role="dialog"]');
          let Z = 0, te = 0;
          if (G) {
            const be = G.getBoundingClientRect();
            Z = be.left, te = be.top;
          }
          let _ = z.bottom + 4 - te, H = z.right - X - Z;
          const j = window.innerHeight, ee = window.innerWidth, ge = 200;
          z.bottom + 4 + ge > j && (_ = z.top - ge - 4 - te), H + Z < 8 && (H = 8 - Z), H + X + Z > ee - 8 && (H = ee - X - 8 - Z), f.style.top = `${_}px`, f.style.left = `${H}px`, f.style.display = "flex", T = !0, x();
        }
      });
      const M = (P) => {
        !f.contains(P.target) && !d.contains(P.target) && (f.style.display = "none", T = !1);
      };
      document.addEventListener("click", M);
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
      }), s.appendChild(i), s.appendChild(D), s.appendChild(u), s.appendChild(d);
      const A = s.closest('[role="dialog"]');
      A ? A.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", D.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", D.style.opacity = "0", T || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const I = (P) => {
        P.preventDefault(), P.stopPropagation();
        const z = document.createElement("div");
        z.style.cssText = `
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
        X.src = i.src, X.alt = i.alt || "", X.style.cssText = `
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
        const Z = r.attrs.alt;
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
        const _ = () => {
          z.style.opacity = "0", X.style.transform = "scale(0.92)", setTimeout(() => z.remove(), 200);
        };
        z.addEventListener("click", (ee) => {
          ee.target === z && _();
        }), G.addEventListener("click", _);
        const H = (ee) => {
          ee.key === "Escape" && (_(), document.removeEventListener("keydown", H));
        };
        document.addEventListener("keydown", H), z.appendChild(X), z.appendChild(G), te && z.appendChild(te);
        const j = s.closest('[role="dialog"]');
        j ? j.appendChild(z) : document.body.appendChild(z), requestAnimationFrame(() => {
          z.style.opacity = "1", X.style.transform = "scale(1)";
        });
      };
      D.addEventListener("click", I);
      let L, $;
      const W = (P) => {
        P.preventDefault(), L = P.clientX, $ = i.offsetWidth, document.addEventListener("mousemove", q), document.addEventListener("mouseup", R);
      }, q = (P) => {
        const z = P.clientX - L, X = Math.max(100, $ + z);
        i.style.width = `${X}px`;
      }, R = () => {
        document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", R), setTimeout(() => {
        }, 100);
        const P = typeof o == "function" ? o() : null, z = i.offsetWidth;
        if (P != null)
          try {
            const { state: X, dispatch: G } = n.view, Z = X.doc.nodeAt(P);
            if (Z && Z.type.name === "resizableImage") {
              const te = X.tr.setNodeMarkup(P, void 0, {
                ...Z.attrs,
                width: z
              });
              G(te);
            }
          } catch {
            n.chain().focus().setNodeSelection(P).updateAttributes("resizableImage", {
              width: z
            }).run();
          }
      };
      return u.addEventListener("mousedown", W), {
        dom: s,
        update: (P) => P.type.name !== "resizableImage" ? !1 : (r = P, c(P.attrs.src), i.alt = P.attrs.alt || "", P.attrs.width && (i.style.width = `${P.attrs.width}px`), a(P.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", W), D.removeEventListener("click", I), document.removeEventListener("click", M), f.remove();
        }
      };
    };
  }
});
function Gf(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const qf = {}, ho = {};
function dn(e, t) {
  try {
    const o = (qf[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return o in ho ? ho[o] : ya(o, o.split(":"));
  } catch {
    if (e in ho) return ho[e];
    const n = e?.match(Xf);
    return n ? ya(e, n.slice(1)) : NaN;
  }
}
const Xf = /([+-]\d\d):?(\d\d)?/;
function ya(e, t) {
  const n = +(t[0] || 0), o = +(t[1] || 0), r = +(t[2] || 0) / 60;
  return ho[e] = n * 60 + o > 0 ? n * 60 + o + r : n * 60 - o - r;
}
class gt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(dn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), zl(this), zs(this)) : this.setTime(Date.now());
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
    const t = -dn(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), zs(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new gt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const ka = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!ka.test(e)) return;
  const t = e.replace(ka, "$1UTC");
  gt.prototype[t] && (e.startsWith("get") ? gt.prototype[e] = function() {
    return this.internal[t]();
  } : (gt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Zf(this), +this;
  }, gt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), zs(this), +this;
  }));
});
function zs(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-dn(e.timeZone, e) * 60));
}
function Zf(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), zl(e);
}
function zl(e) {
  const t = dn(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), o = /* @__PURE__ */ new Date(+e);
  o.setUTCHours(o.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), a = r - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = r - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const c = /* @__PURE__ */ new Date(+e);
  c.setUTCSeconds(0);
  const u = r > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, d = Math.round(-(dn(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = dn(e.timeZone, e), h = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, b = h !== n, w = g - l;
  if (b && w) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + w);
    const v = dn(e.timeZone, e), N = v > 0 ? Math.floor(v) : Math.ceil(v), C = h - N;
    C && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + C), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + C));
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
    return `${t} GMT${n}${o}${r} (${Gf(this.timeZone, this)})`;
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
    return new Ue(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ue(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ul = 6048e5, Qf = 864e5, xa = Symbol.for("constructDateFrom");
function Oe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && xa in e ? e[xa](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function xe(e, t) {
  return Oe(t || e, e);
}
function Yl(e, t, n) {
  const o = xe(e, n?.in);
  return isNaN(t) ? Oe(e, NaN) : (t && o.setDate(o.getDate() + t), o);
}
function jl(e, t, n) {
  const o = xe(e, n?.in);
  if (isNaN(t)) return Oe(e, NaN);
  if (!t)
    return o;
  const r = o.getDate(), s = Oe(e, o.getTime());
  s.setMonth(o.getMonth() + t + 1, 0);
  const a = s.getDate();
  return r >= a ? s : (o.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    r
  ), o);
}
let Jf = {};
function So() {
  return Jf;
}
function Fn(e, t) {
  const n = So(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = xe(e, t?.in), s = r.getDay(), a = (s < o ? 7 : 0) + s - o;
  return r.setDate(r.getDate() - a), r.setHours(0, 0, 0, 0), r;
}
function No(e, t) {
  return Fn(e, { ...t, weekStartsOn: 1 });
}
function Kl(e, t) {
  const n = xe(e, t?.in), o = n.getFullYear(), r = Oe(n, 0);
  r.setFullYear(o + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = No(r), a = Oe(n, 0);
  a.setFullYear(o, 0, 4), a.setHours(0, 0, 0, 0);
  const i = No(a);
  return n.getTime() >= s.getTime() ? o + 1 : n.getTime() >= i.getTime() ? o : o - 1;
}
function Ca(e) {
  const t = xe(e), n = new Date(
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
    t.find((o) => typeof o == "object")
  );
  return t.map(n);
}
function yo(e, t) {
  const n = xe(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Vl(e, t, n) {
  const [o, r] = Gn(
    n?.in,
    e,
    t
  ), s = yo(o), a = yo(r), i = +s - Ca(s), l = +a - Ca(a);
  return Math.round((i - l) / Qf);
}
function eh(e, t) {
  const n = Kl(e, t), o = Oe(e, 0);
  return o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0), No(o);
}
function th(e, t, n) {
  return Yl(e, t * 7, n);
}
function nh(e, t, n) {
  return jl(e, t * 12, n);
}
function oh(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = Oe.bind(null, r));
    const s = xe(r, o);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Oe(o, n || NaN);
}
function rh(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = Oe.bind(null, r));
    const s = xe(r, o);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Oe(o, n || NaN);
}
function sh(e, t, n) {
  const [o, r] = Gn(
    n?.in,
    e,
    t
  );
  return +yo(o) == +yo(r);
}
function Gl(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ih(e) {
  return !(!Gl(e) && typeof e != "number" || isNaN(+xe(e)));
}
function ah(e, t, n) {
  const [o, r] = Gn(
    n?.in,
    e,
    t
  ), s = o.getFullYear() - r.getFullYear(), a = o.getMonth() - r.getMonth();
  return s * 12 + a;
}
function lh(e, t) {
  const n = xe(e, t?.in), o = n.getMonth();
  return n.setFullYear(n.getFullYear(), o + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function ql(e, t) {
  const [n, o] = Gn(e, t.start, t.end);
  return { start: n, end: o };
}
function ch(e, t) {
  const { start: n, end: o } = ql(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(Oe(n, a)), a.setMonth(a.getMonth() + i);
  return r ? l.reverse() : l;
}
function uh(e, t) {
  const n = xe(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function dh(e, t) {
  const n = xe(e, t?.in), o = n.getFullYear();
  return n.setFullYear(o + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Xl(e, t) {
  const n = xe(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function mh(e, t) {
  const { start: n, end: o } = ql(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(Oe(n, a)), a.setFullYear(a.getFullYear() + i);
  return r ? l.reverse() : l;
}
function Zl(e, t) {
  const n = So(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = xe(e, t?.in), s = r.getDay(), a = (s < o ? -7 : 0) + 6 - (s - o);
  return r.setDate(r.getDate() + a), r.setHours(23, 59, 59, 999), r;
}
function fh(e, t) {
  return Zl(e, { ...t, weekStartsOn: 1 });
}
const hh = {
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
}, ph = (e, t, n) => {
  let o;
  const r = hh[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
};
function hs(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const gh = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, bh = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, vh = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, wh = {
  date: hs({
    formats: gh,
    defaultWidth: "full"
  }),
  time: hs({
    formats: bh,
    defaultWidth: "full"
  }),
  dateTime: hs({
    formats: vh,
    defaultWidth: "full"
  })
}, Nh = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, yh = (e, t, n, o) => Nh[e];
function co(e) {
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
const kh = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, xh = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Ch = {
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
}, Eh = {
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
}, Th = {
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
}, Mh = {
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
}, Sh = (e, t) => {
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
}, Dh = {
  ordinalNumber: Sh,
  era: co({
    values: kh,
    defaultWidth: "wide"
  }),
  quarter: co({
    values: xh,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: co({
    values: Ch,
    defaultWidth: "wide"
  }),
  day: co({
    values: Eh,
    defaultWidth: "wide"
  }),
  dayPeriod: co({
    values: Th,
    defaultWidth: "wide",
    formattingValues: Mh,
    defaultFormattingWidth: "wide"
  })
};
function uo(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], s = t.match(r);
    if (!s)
      return null;
    const a = s[0], i = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? Ph(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      Ah(i, (d) => d.test(a))
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
function Ah(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Ph(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Rh(e) {
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
const Ih = /^(\d+)(th|st|nd|rd)?/i, Lh = /\d+/i, Oh = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, _h = {
  any: [/^b/i, /^(a|c)/i]
}, $h = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Bh = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Hh = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Wh = {
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
}, Fh = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, zh = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Uh = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Yh = {
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
}, jh = {
  ordinalNumber: Rh({
    matchPattern: Ih,
    parsePattern: Lh,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: uo({
    matchPatterns: Oh,
    defaultMatchWidth: "wide",
    parsePatterns: _h,
    defaultParseWidth: "any"
  }),
  quarter: uo({
    matchPatterns: $h,
    defaultMatchWidth: "wide",
    parsePatterns: Bh,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: uo({
    matchPatterns: Hh,
    defaultMatchWidth: "wide",
    parsePatterns: Wh,
    defaultParseWidth: "any"
  }),
  day: uo({
    matchPatterns: Fh,
    defaultMatchWidth: "wide",
    parsePatterns: zh,
    defaultParseWidth: "any"
  }),
  dayPeriod: uo({
    matchPatterns: Uh,
    defaultMatchWidth: "any",
    parsePatterns: Yh,
    defaultParseWidth: "any"
  })
}, Mi = {
  code: "en-US",
  formatDistance: ph,
  formatLong: wh,
  formatRelative: yh,
  localize: Dh,
  match: jh,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Kh(e, t) {
  const n = xe(e, t?.in);
  return Vl(n, Xl(n)) + 1;
}
function Ql(e, t) {
  const n = xe(e, t?.in), o = +No(n) - +eh(n);
  return Math.round(o / Ul) + 1;
}
function Jl(e, t) {
  const n = xe(e, t?.in), o = n.getFullYear(), r = So(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = Oe(t?.in || e, 0);
  a.setFullYear(o + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = Fn(a, t), l = Oe(t?.in || e, 0);
  l.setFullYear(o, 0, s), l.setHours(0, 0, 0, 0);
  const c = Fn(l, t);
  return +n >= +i ? o + 1 : +n >= +c ? o : o - 1;
}
function Vh(e, t) {
  const n = So(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = Jl(e, t), s = Oe(t?.in || e, 0);
  return s.setFullYear(r, 0, o), s.setHours(0, 0, 0, 0), Fn(s, t);
}
function ec(e, t) {
  const n = xe(e, t?.in), o = +Fn(n, t) - +Vh(n, t);
  return Math.round(o / Ul) + 1;
}
function ye(e, t) {
  const n = e < 0 ? "-" : "", o = Math.abs(e).toString().padStart(t, "0");
  return n + o;
}
const Vt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), o = n > 0 ? n : 1 - n;
    return ye(t === "yy" ? o % 100 : o, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ye(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ye(e.getDate(), t.length);
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
    return ye(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ye(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ye(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ye(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, o = e.getMilliseconds(), r = Math.trunc(
      o * Math.pow(10, n - 3)
    );
    return ye(r, t.length);
  }
}, xn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Ea = {
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
    return Vt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, o) {
    const r = Jl(e, o), s = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const a = s % 100;
      return ye(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : ye(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Kl(e);
    return ye(n, t.length);
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
    return ye(n, t.length);
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
        return ye(o, 2);
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
        return ye(o, 2);
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
        return Vt.M(e, t);
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
        return ye(o + 1, 2);
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
    const r = ec(e, o);
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : ye(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const o = Ql(e);
    return t === "Io" ? n.ordinalNumber(o, { unit: "week" }) : ye(o, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Vt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const o = Kh(e);
    return t === "Do" ? n.ordinalNumber(o, { unit: "dayOfYear" }) : ye(o, t.length);
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
        return ye(s, 2);
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
        return ye(s, t.length);
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
        return ye(r, t.length);
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
    switch (o === 12 ? r = xn.noon : o === 0 ? r = xn.midnight : r = o / 12 >= 1 ? "pm" : "am", t) {
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
    switch (o >= 17 ? r = xn.evening : o >= 12 ? r = xn.afternoon : o >= 4 ? r = xn.morning : r = xn.night, t) {
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
    return Vt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Vt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const o = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(o, { unit: "hour" }) : ye(o, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let o = e.getHours();
    return o === 0 && (o = 24), t === "ko" ? n.ordinalNumber(o, { unit: "hour" }) : ye(o, t.length);
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
    const o = e.getTimezoneOffset();
    if (o === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Ma(o);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return ln(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return ln(o, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const o = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Ma(o);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return ln(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return ln(o, ":");
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
        return "GMT" + Ta(o, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + ln(o, ":");
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
        return "GMT" + Ta(o, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + ln(o, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const o = Math.trunc(+e / 1e3);
    return ye(o, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ye(+e, t.length);
  }
};
function Ta(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = Math.trunc(o / 60), s = o % 60;
  return s === 0 ? n + String(r) : n + String(r) + t + ye(s, 2);
}
function Ma(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ye(Math.abs(e) / 60, 2) : ln(e, t);
}
function ln(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = ye(Math.trunc(o / 60), 2), s = ye(o % 60, 2);
  return n + r + t + s;
}
const Sa = (e, t) => {
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
}, tc = (e, t) => {
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
}, Gh = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], o = n[1], r = n[2];
  if (!r)
    return Sa(e, t);
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
  return s.replace("{{date}}", Sa(o, t)).replace("{{time}}", tc(r, t));
}, qh = {
  p: tc,
  P: Gh
}, Xh = /^D+$/, Zh = /^Y+$/, Qh = ["D", "DD", "YY", "YYYY"];
function Jh(e) {
  return Xh.test(e);
}
function ep(e) {
  return Zh.test(e);
}
function tp(e, t, n) {
  const o = np(e, t, n);
  if (console.warn(o), Qh.includes(e)) throw new RangeError(o);
}
function np(e, t, n) {
  const o = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${o} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const op = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, rp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, sp = /^'([^]*?)'?$/, ip = /''/g, ap = /[a-zA-Z]/;
function lp(e, t, n) {
  const o = So(), r = n?.locale ?? o.locale ?? Mi, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0, i = xe(e, n?.in);
  if (!ih(i))
    throw new RangeError("Invalid time value");
  let l = t.match(rp).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = qh[d];
      return f(u, r.formatLong);
    }
    return u;
  }).join("").match(op).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: cp(u) };
    if (Ea[d])
      return { isToken: !0, value: u };
    if (d.match(ap))
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
    (!n?.useAdditionalWeekYearTokens && ep(d) || !n?.useAdditionalDayOfYearTokens && Jh(d)) && tp(d, t, String(e));
    const f = Ea[d[0]];
    return f(i, d, r.localize, c);
  }).join("");
}
function cp(e) {
  const t = e.match(sp);
  return t ? t[1].replace(ip, "'") : e;
}
function up(e, t) {
  const n = xe(e, t?.in), o = n.getFullYear(), r = n.getMonth(), s = Oe(n, 0);
  return s.setFullYear(o, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function dp(e, t) {
  return xe(e, t?.in).getMonth();
}
function mp(e, t) {
  return xe(e, t?.in).getFullYear();
}
function fp(e, t) {
  return +xe(e) > +xe(t);
}
function hp(e, t) {
  return +xe(e) < +xe(t);
}
function pp(e, t, n) {
  const [o, r] = Gn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear() && o.getMonth() === r.getMonth();
}
function gp(e, t, n) {
  const [o, r] = Gn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear();
}
function bp(e, t, n) {
  const o = xe(e, n?.in), r = o.getFullYear(), s = o.getDate(), a = Oe(e, 0);
  a.setFullYear(r, t, 15), a.setHours(0, 0, 0, 0);
  const i = up(a);
  return o.setMonth(t, Math.min(s, i)), o;
}
function vp(e, t, n) {
  const o = xe(e, n?.in);
  return isNaN(+o) ? Oe(e, NaN) : (o.setFullYear(t), o);
}
const Da = 5, wp = 4;
function Np(e, t) {
  const n = t.startOfMonth(e), o = n.getDay() > 0 ? n.getDay() : 7, r = t.addDays(e, -o + 1), s = t.addDays(r, Da * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Da : wp;
}
function nc(e, t) {
  const n = t.startOfMonth(e), o = n.getDay();
  return o === 1 ? n : o === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (o - 1));
}
function yp(e, t) {
  const n = nc(e, t), o = Np(e, t);
  return t.addDays(n, o * 7 - 1);
}
class nt {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ue.tz(this.options.timeZone) : new this.Date(), this.newDate = (o, r, s) => this.overrides?.newDate ? this.overrides.newDate(o, r, s) : this.options.timeZone ? new Ue(o, r, s, this.options.timeZone) : new Date(o, r, s), this.addDays = (o, r) => this.overrides?.addDays ? this.overrides.addDays(o, r) : Yl(o, r), this.addMonths = (o, r) => this.overrides?.addMonths ? this.overrides.addMonths(o, r) : jl(o, r), this.addWeeks = (o, r) => this.overrides?.addWeeks ? this.overrides.addWeeks(o, r) : th(o, r), this.addYears = (o, r) => this.overrides?.addYears ? this.overrides.addYears(o, r) : nh(o, r), this.differenceInCalendarDays = (o, r) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(o, r) : Vl(o, r), this.differenceInCalendarMonths = (o, r) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(o, r) : ah(o, r), this.eachMonthOfInterval = (o) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(o) : ch(o), this.eachYearOfInterval = (o) => {
      const r = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(o) : mh(o), s = new Set(r.map((i) => this.getYear(i)));
      if (s.size === r.length)
        return r;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (o) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(o) : yp(o, this), this.endOfISOWeek = (o) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(o) : fh(o), this.endOfMonth = (o) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(o) : lh(o), this.endOfWeek = (o, r) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(o, r) : Zl(o, this.options), this.endOfYear = (o) => this.overrides?.endOfYear ? this.overrides.endOfYear(o) : dh(o), this.format = (o, r, s) => {
      const a = this.overrides?.format ? this.overrides.format(o, r, this.options) : lp(o, r, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (o) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(o) : Ql(o), this.getMonth = (o, r) => this.overrides?.getMonth ? this.overrides.getMonth(o, this.options) : dp(o, this.options), this.getYear = (o, r) => this.overrides?.getYear ? this.overrides.getYear(o, this.options) : mp(o, this.options), this.getWeek = (o, r) => this.overrides?.getWeek ? this.overrides.getWeek(o, this.options) : ec(o, this.options), this.isAfter = (o, r) => this.overrides?.isAfter ? this.overrides.isAfter(o, r) : fp(o, r), this.isBefore = (o, r) => this.overrides?.isBefore ? this.overrides.isBefore(o, r) : hp(o, r), this.isDate = (o) => this.overrides?.isDate ? this.overrides.isDate(o) : Gl(o), this.isSameDay = (o, r) => this.overrides?.isSameDay ? this.overrides.isSameDay(o, r) : sh(o, r), this.isSameMonth = (o, r) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(o, r) : pp(o, r), this.isSameYear = (o, r) => this.overrides?.isSameYear ? this.overrides.isSameYear(o, r) : gp(o, r), this.max = (o) => this.overrides?.max ? this.overrides.max(o) : oh(o), this.min = (o) => this.overrides?.min ? this.overrides.min(o) : rh(o), this.setMonth = (o, r) => this.overrides?.setMonth ? this.overrides.setMonth(o, r) : bp(o, r), this.setYear = (o, r) => this.overrides?.setYear ? this.overrides.setYear(o, r) : vp(o, r), this.startOfBroadcastWeek = (o, r) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(o, this) : nc(o, this), this.startOfDay = (o) => this.overrides?.startOfDay ? this.overrides.startOfDay(o) : yo(o), this.startOfISOWeek = (o) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(o) : No(o), this.startOfMonth = (o) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(o) : uh(o), this.startOfWeek = (o, r) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(o, this.options) : Fn(o, this.options), this.startOfYear = (o) => this.overrides?.startOfYear ? this.overrides.startOfYear(o) : Xl(o), this.options = { locale: Mi, ...t }, this.overrides = n;
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
    return t && nt.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: o, numerals: r } = this.options, s = n?.code;
    if (s && nt.yearFirstLocales.has(s))
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
const Nt = new nt();
class oc {
  constructor(t, n, o = Nt) {
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
class kp {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class xp {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Cp(e) {
  return J.createElement("button", { ...e });
}
function Ep(e) {
  return J.createElement("span", { ...e });
}
function Tp(e) {
  const { size: t = 24, orientation: n = "left", className: o } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    J.createElement(
      "svg",
      { className: o, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && J.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && J.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && J.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && J.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Mp(e) {
  const { day: t, modifiers: n, ...o } = e;
  return J.createElement("td", { ...o });
}
function Sp(e) {
  const { day: t, modifiers: n, ...o } = e, r = J.useRef(null);
  return J.useEffect(() => {
    n.focused && r.current?.focus();
  }, [n.focused]), J.createElement("button", { ref: r, ...o });
}
var re;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(re || (re = {}));
var De;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(De || (De = {}));
var lt;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(lt || (lt = {}));
var Je;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Je || (Je = {}));
function Dp(e) {
  const { options: t, className: n, components: o, classNames: r, ...s } = e, a = [r[re.Dropdown], n].join(" "), i = t?.find(({ value: l }) => l === s.value);
  return J.createElement(
    "span",
    { "data-disabled": s.disabled, className: r[re.DropdownRoot] },
    J.createElement(o.Select, { className: a, ...s }, t?.map(({ value: l, label: c, disabled: u }) => J.createElement(o.Option, { key: l, value: l, disabled: u }, c))),
    J.createElement(
      "span",
      { className: r[re.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      J.createElement(o.Chevron, { orientation: "down", size: 18, className: r[re.Chevron] })
    )
  );
}
function Ap(e) {
  return J.createElement("div", { ...e });
}
function Pp(e) {
  return J.createElement("div", { ...e });
}
function Rp(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return J.createElement("div", { ...o }, e.children);
}
function Ip(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return J.createElement("div", { ...o });
}
function Lp(e) {
  return J.createElement("table", { ...e });
}
function Op(e) {
  return J.createElement("div", { ...e });
}
const rc = Tl(void 0);
function Do() {
  const e = Ml(rc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function _p(e) {
  const { components: t } = Do();
  return J.createElement(t.Dropdown, { ...e });
}
function $p(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: o, nextMonth: r, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: c } } = Do(), u = U((f) => {
    r && n?.(f);
  }, [r, n]), d = U((f) => {
    o && t?.(f);
  }, [o, t]);
  return J.createElement(
    "nav",
    { ...s },
    J.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[re.PreviousMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      J.createElement(a.Chevron, { disabled: o ? void 0 : !0, className: i[re.Chevron], orientation: "left" })
    ),
    J.createElement(
      a.NextMonthButton,
      { type: "button", className: i[re.NextMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      J.createElement(a.Chevron, { disabled: r ? void 0 : !0, orientation: "right", className: i[re.Chevron] })
    )
  );
}
function Bp(e) {
  const { components: t } = Do();
  return J.createElement(t.Button, { ...e });
}
function Hp(e) {
  return J.createElement("option", { ...e });
}
function Wp(e) {
  const { components: t } = Do();
  return J.createElement(t.Button, { ...e });
}
function Fp(e) {
  const { rootRef: t, ...n } = e;
  return J.createElement("div", { ...n, ref: t });
}
function zp(e) {
  return J.createElement("select", { ...e });
}
function Up(e) {
  const { week: t, ...n } = e;
  return J.createElement("tr", { ...n });
}
function Yp(e) {
  return J.createElement("th", { ...e });
}
function jp(e) {
  return J.createElement(
    "thead",
    { "aria-hidden": !0 },
    J.createElement("tr", { ...e })
  );
}
function Kp(e) {
  const { week: t, ...n } = e;
  return J.createElement("th", { ...n });
}
function Vp(e) {
  return J.createElement("th", { ...e });
}
function Gp(e) {
  return J.createElement("tbody", { ...e });
}
function qp(e) {
  const { components: t } = Do();
  return J.createElement(t.Dropdown, { ...e });
}
const Xp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Cp,
  CaptionLabel: Ep,
  Chevron: Tp,
  Day: Mp,
  DayButton: Sp,
  Dropdown: Dp,
  DropdownNav: Ap,
  Footer: Pp,
  Month: Rp,
  MonthCaption: Ip,
  MonthGrid: Lp,
  Months: Op,
  MonthsDropdown: _p,
  Nav: $p,
  NextMonthButton: Bp,
  Option: Hp,
  PreviousMonthButton: Wp,
  Root: Fp,
  Select: zp,
  Week: Up,
  WeekNumber: Kp,
  WeekNumberHeader: Vp,
  Weekday: Yp,
  Weekdays: jp,
  Weeks: Gp,
  YearsDropdown: qp
}, Symbol.toStringTag, { value: "Module" }));
function Rt(e, t, n = !1, o = Nt) {
  let { from: r, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = o;
  return r && s ? (a(s, r) < 0 && ([r, s] = [s, r]), a(t, r) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && r ? i(r, t) : !1;
}
function sc(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Si(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function ic(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function ac(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function lc(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function cc(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function It(e, t, n = Nt) {
  const o = Array.isArray(t) ? t : [t], { isSameDay: r, differenceInCalendarDays: s, isAfter: a } = n;
  return o.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return r(e, i);
    if (cc(i, n))
      return i.includes(e);
    if (Si(i))
      return Rt(i, e, !1, n);
    if (lc(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (sc(i)) {
      const l = s(i.before, e), c = s(i.after, e), u = l > 0, d = c < 0;
      return a(i.before, i.after) ? d && u : u || d;
    }
    return ic(i) ? s(e, i.after) > 0 : ac(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Zp(e, t, n, o, r) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: c, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: h, isBefore: p, endOfMonth: g, isAfter: b } = r, w = n && h(n), v = o && g(o), N = {
    [De.focused]: [],
    [De.outside]: [],
    [De.disabled]: [],
    [De.hidden]: [],
    [De.today]: []
  }, C = {};
  for (const y of e) {
    const { date: k, displayMonth: S } = y, x = !!(S && !f(k, S)), T = !!(w && p(k, w)), M = !!(v && b(k, v)), D = !!(s && It(k, s, r)), A = !!(a && It(k, a, r)) || T || M || // Broadcast calendar will show outside days as default
    !c && !l && x || c && l === !1 && x, I = d(k, u ?? r.today());
    x && N.outside.push(y), D && N.disabled.push(y), A && N.hidden.push(y), I && N.today.push(y), i && Object.keys(i).forEach((L) => {
      const $ = i?.[L];
      $ && It(k, $, r) && (C[L] ? C[L].push(y) : C[L] = [y]);
    });
  }
  return (y) => {
    const k = {
      [De.focused]: !1,
      [De.disabled]: !1,
      [De.hidden]: !1,
      [De.outside]: !1,
      [De.today]: !1
    }, S = {};
    for (const x in N) {
      const T = N[x];
      k[x] = T.some((M) => M === y);
    }
    for (const x in C)
      S[x] = C[x].some((T) => T === y);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function Qp(e, t, n = {}) {
  return Object.entries(e).filter(([, r]) => r === !0).reduce((r, [s]) => (n[s] ? r.push(n[s]) : t[De[s]] ? r.push(t[De[s]]) : t[lt[s]] && r.push(t[lt[s]]), r), [t[re.Day]]);
}
function Jp(e) {
  return {
    ...Xp,
    ...e
  };
}
function eg(e) {
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
function Di() {
  const e = {};
  for (const t in re)
    e[re[t]] = `rdp-${re[t]}`;
  for (const t in De)
    e[De[t]] = `rdp-${De[t]}`;
  for (const t in lt)
    e[lt[t]] = `rdp-${lt[t]}`;
  for (const t in Je)
    e[Je[t]] = `rdp-${Je[t]}`;
  return e;
}
function uc(e, t, n) {
  return (n ?? new nt(t)).formatMonthYear(e);
}
const tg = uc;
function ng(e, t, n) {
  return (n ?? new nt(t)).format(e, "d");
}
function og(e, t = Nt) {
  return t.format(e, "LLLL");
}
function rg(e, t, n) {
  return (n ?? new nt(t)).format(e, "cccccc");
}
function sg(e, t = Nt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function ig() {
  return "";
}
function dc(e, t = Nt) {
  return t.format(e, "yyyy");
}
const ag = dc, lg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: uc,
  formatDay: ng,
  formatMonthCaption: tg,
  formatMonthDropdown: og,
  formatWeekNumber: sg,
  formatWeekNumberHeader: ig,
  formatWeekdayName: rg,
  formatYearCaption: ag,
  formatYearDropdown: dc
}, Symbol.toStringTag, { value: "Module" }));
function cg(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...lg,
    ...e
  };
}
function ug(e, t, n, o, r) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: c } = r;
  return l({
    start: a(e),
    end: i(e)
  }).map((f) => {
    const h = o.formatMonthDropdown(f, r), p = c(f), g = t && f < s(t) || n && f > s(n) || !1;
    return { value: p, label: h, disabled: g };
  });
}
function dg(e, t = {}, n = {}) {
  let o = { ...t?.[re.Day] };
  return Object.entries(e).filter(([, r]) => r === !0).forEach(([r]) => {
    o = {
      ...o,
      ...n?.[r]
    };
  }), o;
}
function mg(e, t, n) {
  const o = e.today(), r = t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(r, a);
    s.push(i);
  }
  return s;
}
function fg(e, t, n, o, r = !1) {
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
function mc(e, t, n, o) {
  let r = (o ?? new nt(n)).format(e, "PPPP");
  return t.today && (r = `Today, ${r}`), t.selected && (r = `${r}, selected`), r;
}
const hg = mc;
function fc(e, t, n) {
  return (n ?? new nt(t)).formatMonthYear(e);
}
const pg = fc;
function gg(e, t, n, o) {
  let r = (o ?? new nt(n)).format(e, "PPPP");
  return t?.today && (r = `Today, ${r}`), r;
}
function bg(e) {
  return "Choose the Month";
}
function vg() {
  return "";
}
function wg(e) {
  return "Go to the Next Month";
}
function Ng(e) {
  return "Go to the Previous Month";
}
function yg(e, t, n) {
  return (n ?? new nt(t)).format(e, "cccc");
}
function kg(e, t) {
  return `Week ${e}`;
}
function xg(e) {
  return "Week Number";
}
function Cg(e) {
  return "Choose the Year";
}
const Eg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: pg,
  labelDay: hg,
  labelDayButton: mc,
  labelGrid: fc,
  labelGridcell: gg,
  labelMonthDropdown: bg,
  labelNav: vg,
  labelNext: wg,
  labelPrevious: Ng,
  labelWeekNumber: kg,
  labelWeekNumberHeader: xg,
  labelWeekday: yg,
  labelYearDropdown: Cg
}, Symbol.toStringTag, { value: "Module" })), Ao = (e) => e instanceof HTMLElement ? e : null, ps = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Tg = (e) => Ao(e.querySelector("[data-animated-month]")), gs = (e) => Ao(e.querySelector("[data-animated-caption]")), bs = (e) => Ao(e.querySelector("[data-animated-weeks]")), Mg = (e) => Ao(e.querySelector("[data-animated-nav]")), Sg = (e) => Ao(e.querySelector("[data-animated-weekdays]"));
function Dg(e, t, { classNames: n, months: o, focused: r, dateLib: s }) {
  const a = V(null), i = V(o), l = V(!1);
  Pr(() => {
    const c = i.current;
    if (i.current = o, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    o.length === 0 || c.length === 0 || o.length !== c.length)
      return;
    const u = s.isSameMonth(o[0].date, c[0].date), d = s.isAfter(o[0].date, c[0].date), f = d ? n[Je.caption_after_enter] : n[Je.caption_before_enter], h = d ? n[Je.weeks_after_enter] : n[Je.weeks_before_enter], p = a.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (ps(g).forEach((N) => {
      if (!(N instanceof HTMLElement))
        return;
      const C = Tg(N);
      C && N.contains(C) && N.removeChild(C);
      const y = gs(N);
      y && y.classList.remove(f);
      const k = bs(N);
      k && k.classList.remove(h);
    }), a.current = g) : a.current = null, l.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    r)
      return;
    const b = p instanceof HTMLElement ? ps(p) : [], w = ps(e.current);
    if (w?.every((v) => v instanceof HTMLElement) && b && b.every((v) => v instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const v = Mg(e.current);
      v && (v.style.zIndex = "1"), w.forEach((N, C) => {
        const y = b[C];
        if (!y)
          return;
        N.style.position = "relative", N.style.overflow = "hidden";
        const k = gs(N);
        k && k.classList.add(f);
        const S = bs(N);
        S && S.classList.add(h);
        const x = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), k && k.classList.remove(f), S && S.classList.remove(h), N.style.position = "", N.style.overflow = "", N.contains(y) && N.removeChild(y);
        };
        y.style.pointerEvents = "none", y.style.position = "absolute", y.style.overflow = "hidden", y.setAttribute("aria-hidden", "true");
        const T = Sg(y);
        T && (T.style.opacity = "0");
        const M = gs(y);
        M && (M.classList.add(d ? n[Je.caption_before_exit] : n[Je.caption_after_exit]), M.addEventListener("animationend", x));
        const D = bs(y);
        D && D.classList.add(d ? n[Je.weeks_before_exit] : n[Je.weeks_after_exit]), N.insertBefore(y, N.firstChild);
      });
    }
  });
}
function Ag(e, t, n, o) {
  const r = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: c, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: h, endOfMonth: p, endOfWeek: g, isAfter: b, startOfBroadcastWeek: w, startOfISOWeek: v, startOfWeek: N } = o, C = l ? w(r, o) : a ? v(r) : N(r), y = l ? f(s) : a ? h(p(s)) : g(p(s)), k = u(y, C), S = d(s, r) + 1, x = [];
  for (let D = 0; D <= k; D++) {
    const A = c(C, D);
    if (t && b(A, t))
      break;
    x.push(A);
  }
  const M = (l ? 35 : 42) * S;
  if (i && x.length < M) {
    const D = M - x.length;
    for (let A = 0; A < D; A++) {
      const I = c(x[x.length - 1], 1);
      x.push(I);
    }
  }
  return x;
}
function Pg(e) {
  const t = [];
  return e.reduce((n, o) => {
    const r = o.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(r.slice());
  }, t.slice());
}
function Rg(e, t, n, o) {
  const { numberOfMonths: r = 1 } = n, s = [];
  for (let a = 0; a < r; a++) {
    const i = o.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function Aa(e, t, n, o) {
  const { month: r, defaultMonth: s, today: a = o.today(), numberOfMonths: i = 1 } = e;
  let l = r || s || a;
  const { differenceInCalendarMonths: c, addMonths: u, startOfMonth: d } = o;
  if (n && c(n, l) < i - 1) {
    const f = -1 * (i - 1);
    l = u(n, f);
  }
  return t && c(l, t) < 0 && (l = t), d(l);
}
function Ig(e, t, n, o) {
  const { addDays: r, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: c, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: h } = o, p = e.reduce((g, b) => {
    const w = n.broadcastCalendar ? d(b, o) : n.ISOWeek ? f(b) : h(b), v = n.broadcastCalendar ? s(b) : n.ISOWeek ? a(i(b)) : l(i(b)), N = t.filter((S) => S >= w && S <= v), C = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && N.length < C) {
      const S = t.filter((x) => {
        const T = C - N.length;
        return x > v && x <= r(v, T);
      });
      N.push(...S);
    }
    const y = N.reduce((S, x) => {
      const T = n.ISOWeek ? c(x) : u(x), M = S.find((A) => A.weekNumber === T), D = new oc(x, b, o);
      return M ? M.days.push(D) : S.push(new xp(T, [D])), S;
    }, []), k = new kp(b, y);
    return g.push(k), g;
  }, []);
  return n.reverseMonths ? p.reverse() : p;
}
function Lg(e, t) {
  let { startMonth: n, endMonth: o } = e;
  const { startOfYear: r, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: c, newDate: u, today: d } = t, { fromYear: f, toYear: h, fromMonth: p, toMonth: g } = e;
  !n && p && (n = p), !n && f && (n = t.newDate(f, 0, 1)), !o && g && (o = g), !o && h && (o = u(h, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : f ? n = u(f, 0, 1) : !n && b && (n = r(l(e.today ?? d(), -100))), o ? o = i(o) : h ? o = u(h, 11, 31) : !o && b && (o = c(e.today ?? d())), [
    n && s(n),
    o && s(o)
  ];
}
function Og(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = o, c = r ? s : 1, u = a(e);
  if (!t)
    return i(u, c);
  if (!(l(t, e) < s))
    return i(u, c);
}
function _g(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = o, c = r ? s ?? 1 : 1, u = a(e);
  if (!t)
    return i(u, -c);
  if (!(l(u, t) <= 0))
    return i(u, -c);
}
function $g(e) {
  const t = [];
  return e.reduce((n, o) => n.concat(o.weeks.slice()), t.slice());
}
function Or(e, t) {
  const [n, o] = K(e);
  return [t === void 0 ? n : t, o];
}
function Bg(e, t) {
  const [n, o] = Lg(e, t), { startOfMonth: r, endOfMonth: s } = t, a = Aa(e, n, o, t), [i, l] = Or(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  Q(() => {
    const k = Aa(e, n, o, t);
    l(k);
  }, [e.timeZone]);
  const c = Rg(i, o, e, t), u = Ag(c, e.endMonth ? s(e.endMonth) : void 0, e, t), d = Ig(c, u, e, t), f = $g(d), h = Pg(d), p = _g(i, n, e, t), g = Og(i, o, e, t), { disableNavigation: b, onMonthChange: w } = e, v = (k) => f.some((S) => S.days.some((x) => x.isEqualTo(k))), N = (k) => {
    if (b)
      return;
    let S = r(k);
    n && S < r(n) && (S = r(n)), o && S > r(o) && (S = r(o)), l(S), w?.(S);
  };
  return {
    months: d,
    weeks: f,
    days: h,
    navStart: n,
    navEnd: o,
    previousMonth: p,
    nextMonth: g,
    goToMonth: N,
    goToDay: (k) => {
      v(k) || N(k.date);
    }
  };
}
var ht;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ht || (ht = {}));
function Pa(e) {
  return !e[De.disabled] && !e[De.hidden] && !e[De.outside];
}
function Hg(e, t, n, o) {
  let r, s = -1;
  for (const a of e) {
    const i = t(a);
    Pa(i) && (i[De.focused] && s < ht.FocusedModifier ? (r = a, s = ht.FocusedModifier) : o?.isEqualTo(a) && s < ht.LastFocused ? (r = a, s = ht.LastFocused) : n(a.date) && s < ht.Selected ? (r = a, s = ht.Selected) : i[De.today] && s < ht.Today && (r = a, s = ht.Today));
  }
  return r || (r = e.find((a) => Pa(t(a)))), r;
}
function Wg(e, t, n, o, r, s, a) {
  const { ISOWeek: i, broadcastCalendar: l } = s, { addDays: c, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: h, endOfISOWeek: p, endOfWeek: g, max: b, min: w, startOfBroadcastWeek: v, startOfISOWeek: N, startOfWeek: C } = a;
  let k = {
    day: c,
    week: d,
    month: u,
    year: f,
    startOfWeek: (S) => l ? v(S, a) : i ? N(S) : C(S),
    endOfWeek: (S) => l ? h(S) : i ? p(S) : g(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && o ? k = b([o, k]) : t === "after" && r && (k = w([r, k])), k;
}
function hc(e, t, n, o, r, s, a, i = 0) {
  if (i > 365)
    return;
  const l = Wg(e, t, n.date, o, r, s, a), c = !!(s.disabled && It(l, s.disabled, a)), u = !!(s.hidden && It(l, s.hidden, a)), d = l, f = new oc(l, d, a);
  return !c && !u ? f : hc(e, t, f, o, r, s, a, i + 1);
}
function Fg(e, t, n, o, r) {
  const { autoFocus: s } = e, [a, i] = K(), l = Hg(t.days, n, o || (() => !1), a), [c, u] = K(s ? l : void 0);
  return {
    isFocusTarget: (g) => !!l?.isEqualTo(g),
    setFocused: u,
    focused: c,
    blur: () => {
      i(c), u(void 0);
    },
    moveFocus: (g, b) => {
      if (!c)
        return;
      const w = hc(g, b, c, t.navStart, t.navEnd, e, r);
      w && (e.disableNavigation && !t.days.some((N) => N.isEqualTo(w)) || (t.goToDay(w), u(w)));
    }
  };
}
function zg(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = Or(n, r ? n : void 0), i = r ? n : s, { isSameDay: l } = t, c = (h) => i?.some((p) => l(p, h)) ?? !1, { min: u, max: d } = e;
  return {
    selected: i,
    select: (h, p, g) => {
      let b = [...i ?? []];
      if (c(h)) {
        if (i?.length === u || o && i?.length === 1)
          return;
        b = i?.filter((w) => !l(w, h));
      } else
        i?.length === d ? b = [h] : b = [...b, h];
      return r || a(b), r?.(b, h, p, g), b;
    },
    isSelected: c
  };
}
function Ug(e, t, n = 0, o = 0, r = !1, s = Nt) {
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
function Yg(e, t, n = Nt) {
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
function Ra(e, t, n = Nt) {
  return Rt(e, t.from, !1, n) || Rt(e, t.to, !1, n) || Rt(t, e.from, !1, n) || Rt(t, e.to, !1, n);
}
function jg(e, t, n = Nt) {
  const o = Array.isArray(t) ? t : [t];
  if (o.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Rt(e, i, !1, n) : cc(i, n) ? i.some((l) => Rt(e, l, !1, n)) : Si(i) ? i.from && i.to ? Ra(e, { from: i.from, to: i.to }, n) : !1 : lc(i) ? Yg(e, i.dayOfWeek, n) : sc(i) ? n.isAfter(i.before, i.after) ? Ra(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : It(e.from, i, n) || It(e.to, i, n) : ic(i) || ac(i) ? It(e.from, i, n) || It(e.to, i, n) : !1))
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
function Kg(e, t) {
  const { disabled: n, excludeDisabled: o, selected: r, required: s, onSelect: a } = e, [i, l] = Or(r, a ? r : void 0), c = a ? r : i;
  return {
    selected: c,
    select: (f, h, p) => {
      const { min: g, max: b } = e, w = f ? Ug(f, c, g, b, s, t) : void 0;
      return o && n && w?.from && w.to && jg({ from: w.from, to: w.to }, n, t) && (w.from = f, w.to = void 0), a || l(w), a?.(w, f, h, p), w;
    },
    isSelected: (f) => c && Rt(c, f, !1, t)
  };
}
function Vg(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = Or(n, r ? n : void 0), i = r ? n : s, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, f, h) => {
      let p = d;
      return !o && i && i && l(d, i) && (p = void 0), r || a(p), r?.(p, d, f, h), p;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function Gg(e, t) {
  const n = Vg(e, t), o = zg(e, t), r = Kg(e, t);
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
function qg(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ue(t.today, t.timeZone)), t.month && (t.month = new Ue(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ue(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ue(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ue(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ue(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ce) => new Ue(ce, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ue(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ue(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: o, labels: r, dateLib: s, locale: a, classNames: i } = Pn(() => {
    const ce = { ...Mi, ...t.locale };
    return {
      dateLib: new nt({
        locale: ce,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Jp(t.components),
      formatters: cg(t.formatters),
      labels: { ...Eg, ...t.labels },
      locale: ce,
      classNames: { ...Di(), ...t.classNames }
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
  ]), { captionLayout: l, mode: c, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: h, onDayFocus: p, onDayKeyDown: g, onDayMouseEnter: b, onDayMouseLeave: w, onNextClick: v, onPrevClick: N, showWeekNumber: C, styles: y } = t, { formatCaption: k, formatDay: S, formatMonthDropdown: x, formatWeekNumber: T, formatWeekNumberHeader: M, formatWeekdayName: D, formatYearDropdown: A } = o, I = Bg(t, s), { days: L, months: $, navStart: W, navEnd: q, previousMonth: R, nextMonth: P, goToMonth: z } = I, X = Zp(L, t, W, q, s), { isSelected: G, select: Z, selected: te } = Gg(t, s) ?? {}, { blur: _, focused: H, isFocusTarget: j, moveFocus: ee, setFocused: ge } = Fg(t, I, X, G ?? (() => !1), s), { labelDayButton: be, labelGridcell: Pe, labelGrid: He, labelMonthDropdown: ot, labelNav: Wt, labelPrevious: eo, labelNext: to, labelWeekday: _o, labelWeekNumber: $o, labelWeekNumberHeader: Bo, labelYearDropdown: Ho } = r, vn = Pn(() => mg(s, t.ISOWeek), [s, t.ISOWeek]), no = c !== void 0 || h !== void 0, wn = U(() => {
    R && (z(R), N?.(R));
  }, [R, z, N]), Nn = U(() => {
    P && (z(P), v?.(P));
  }, [z, P, v]), Wo = U((ce, Ce) => (ie) => {
    ie.preventDefault(), ie.stopPropagation(), ge(ce), Z?.(ce.date, Ce, ie), h?.(ce.date, Ce, ie);
  }, [Z, h, ge]), qr = U((ce, Ce) => (ie) => {
    ge(ce), p?.(ce.date, Ce, ie);
  }, [p, ge]), Xr = U((ce, Ce) => (ie) => {
    _(), f?.(ce.date, Ce, ie);
  }, [_, f]), Zr = U((ce, Ce) => (ie) => {
    const we = {
      ArrowLeft: [
        ie.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        ie.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [ie.shiftKey ? "year" : "week", "after"],
      ArrowUp: [ie.shiftKey ? "year" : "week", "before"],
      PageUp: [ie.shiftKey ? "year" : "month", "before"],
      PageDown: [ie.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (we[ie.key]) {
      ie.preventDefault(), ie.stopPropagation();
      const [Ve, ve] = we[ie.key];
      ee(Ve, ve);
    }
    g?.(ce.date, Ce, ie);
  }, [ee, g, t.dir]), Qr = U((ce, Ce) => (ie) => {
    b?.(ce.date, Ce, ie);
  }, [b]), Fo = U((ce, Ce) => (ie) => {
    w?.(ce.date, Ce, ie);
  }, [w]), zo = U((ce) => (Ce) => {
    const ie = Number(Ce.target.value), we = s.setMonth(s.startOfMonth(ce), ie);
    z(we);
  }, [s, z]), Jr = U((ce) => (Ce) => {
    const ie = Number(Ce.target.value), we = s.setYear(s.startOfMonth(ce), ie);
    z(we);
  }, [s, z]), { className: Uo, style: oo } = Pn(() => ({
    className: [i[re.Root], t.className].filter(Boolean).join(" "),
    style: { ...y?.[re.Root], ...t.style }
  }), [i, t.className, t.style, y]), es = eg(t), mt = V(null);
  Dg(mt, !!t.animate, {
    classNames: i,
    months: $,
    focused: H,
    dateLib: s
  });
  const yn = {
    dayPickerProps: t,
    selected: te,
    select: Z,
    isSelected: G,
    months: $,
    nextMonth: P,
    previousMonth: R,
    goToMonth: z,
    getModifiers: X,
    components: n,
    classNames: i,
    styles: y,
    labels: r,
    formatters: o
  };
  return J.createElement(
    rc.Provider,
    { value: yn },
    J.createElement(
      n.Root,
      { rootRef: t.animate ? mt : void 0, className: Uo, style: oo, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...es },
      J.createElement(
        n.Months,
        { className: i[re.Months], style: y?.[re.Months] },
        !t.hideNavigation && !u && J.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[re.Nav], style: y?.[re.Nav], "aria-label": Wt(), onPreviousClick: wn, onNextClick: Nn, previousMonth: R, nextMonth: P }),
        $.map((ce, Ce) => J.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[re.Month],
            style: y?.[re.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: Ce,
            displayIndex: Ce,
            calendarMonth: ce
          },
          u === "around" && !t.hideNavigation && Ce === 0 && J.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[re.PreviousMonthButton], tabIndex: R ? void 0 : -1, "aria-disabled": R ? void 0 : !0, "aria-label": eo(R), onClick: wn, "data-animated-button": t.animate ? "true" : void 0 },
            J.createElement(n.Chevron, { disabled: R ? void 0 : !0, className: i[re.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          J.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[re.MonthCaption], style: y?.[re.MonthCaption], calendarMonth: ce, displayIndex: Ce }, l?.startsWith("dropdown") ? J.createElement(
            n.DropdownNav,
            { className: i[re.Dropdowns], style: y?.[re.Dropdowns] },
            (() => {
              const ie = l === "dropdown" || l === "dropdown-months" ? J.createElement(n.MonthsDropdown, { key: "month", className: i[re.MonthsDropdown], "aria-label": ot(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: zo(ce.date), options: ug(ce.date, W, q, o, s), style: y?.[re.Dropdown], value: s.getMonth(ce.date) }) : J.createElement("span", { key: "month" }, x(ce.date, s)), we = l === "dropdown" || l === "dropdown-years" ? J.createElement(n.YearsDropdown, { key: "year", className: i[re.YearsDropdown], "aria-label": Ho(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Jr(ce.date), options: fg(W, q, o, s, !!t.reverseYears), style: y?.[re.Dropdown], value: s.getYear(ce.date) }) : J.createElement("span", { key: "year" }, A(ce.date, s));
              return s.getMonthYearOrder() === "year-first" ? [we, ie] : [ie, we];
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
            } }, k(ce.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            J.createElement(n.CaptionLabel, { className: i[re.CaptionLabel], role: "status", "aria-live": "polite" }, k(ce.date, s.options, s))
          )),
          u === "around" && !t.hideNavigation && Ce === d - 1 && J.createElement(
            n.NextMonthButton,
            { type: "button", className: i[re.NextMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": to(P), onClick: Nn, "data-animated-button": t.animate ? "true" : void 0 },
            J.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[re.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          Ce === d - 1 && u === "after" && !t.hideNavigation && J.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[re.Nav], style: y?.[re.Nav], "aria-label": Wt(), onPreviousClick: wn, onNextClick: Nn, previousMonth: R, nextMonth: P }),
          J.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": He(ce.date, s.options, s) || void 0, className: i[re.MonthGrid], style: y?.[re.MonthGrid] },
            !t.hideWeekdays && J.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[re.Weekdays], style: y?.[re.Weekdays] },
              C && J.createElement(n.WeekNumberHeader, { "aria-label": Bo(s.options), className: i[re.WeekNumberHeader], style: y?.[re.WeekNumberHeader], scope: "col" }, M()),
              vn.map((ie) => J.createElement(n.Weekday, { "aria-label": _o(ie, s.options, s), className: i[re.Weekday], key: String(ie), style: y?.[re.Weekday], scope: "col" }, D(ie, s.options, s)))
            ),
            J.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[re.Weeks], style: y?.[re.Weeks] }, ce.weeks.map((ie) => J.createElement(
              n.Week,
              { className: i[re.Week], key: ie.weekNumber, style: y?.[re.Week], week: ie },
              C && // biome-ignore lint/a11y/useSemanticElements: react component
              J.createElement(n.WeekNumber, { week: ie, style: y?.[re.WeekNumber], "aria-label": $o(ie.weekNumber, {
                locale: a
              }), className: i[re.WeekNumber], scope: "row", role: "rowheader" }, T(ie.weekNumber, s)),
              ie.days.map((we) => {
                const { date: Ve } = we, ve = X(we);
                if (ve[De.focused] = !ve.hidden && !!H?.isEqualTo(we), ve[lt.selected] = G?.(Ve) || ve.selected, Si(te)) {
                  const { from: xt, to: so } = te;
                  ve[lt.range_start] = !!(xt && so && s.isSameDay(Ve, xt)), ve[lt.range_end] = !!(xt && so && s.isSameDay(Ve, so)), ve[lt.range_middle] = Rt(te, Ve, !0, s);
                }
                const ro = dg(ve, y, t.modifiersStyles), qe = Qp(ve, i, t.modifiersClassNames), kt = !no && !ve.hidden ? Pe(Ve, ve, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  J.createElement(n.Day, { key: `${s.format(Ve, "yyyy-MM-dd")}_${s.format(we.displayMonth, "yyyy-MM")}`, day: we, modifiers: ve, className: qe.join(" "), style: ro, role: "gridcell", "aria-selected": ve.selected || void 0, "aria-label": kt, "data-day": s.format(Ve, "yyyy-MM-dd"), "data-month": we.outside ? s.format(Ve, "yyyy-MM") : void 0, "data-selected": ve.selected || void 0, "data-disabled": ve.disabled || void 0, "data-hidden": ve.hidden || void 0, "data-outside": we.outside || void 0, "data-focused": ve.focused || void 0, "data-today": ve.today || void 0 }, !ve.hidden && no ? J.createElement(n.DayButton, { className: i[re.DayButton], style: y?.[re.DayButton], type: "button", day: we, modifiers: ve, disabled: ve.disabled || void 0, tabIndex: j(we) ? 0 : -1, "aria-label": be(Ve, ve, s.options, s), onClick: Wo(we, ve), onBlur: Xr(we, ve), onFocus: qr(we, ve), onKeyDown: Zr(we, ve), onMouseEnter: Qr(we, ve), onMouseLeave: Fo(we, ve) }, S(Ve, s.options, s)) : !ve.hidden && S(we.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      J.createElement(n.Footer, { className: i[re.Footer], style: y?.[re.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function pc(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = pc(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function gc() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = pc(e)) && (o && (o += " "), o += t);
  return o;
}
const Ai = "-", Xg = (e) => {
  const t = Qg(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(Ai);
      return i[0] === "" && i.length !== 1 && i.shift(), bc(i, t) || Zg(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && o[a] ? [...l, ...o[a]] : l;
    }
  };
}, bc = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? bc(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const s = e.join(Ai);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, Ia = /^\[(.+)\]$/, Zg = (e) => {
  if (Ia.test(e)) {
    const t = Ia.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Qg = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in n)
    Us(n[r], o, r, t);
  return o;
}, Us = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const s = r === "" ? t : La(t, r);
      s.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (Jg(r)) {
        Us(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([s, a]) => {
      Us(a, La(t, s), n, o);
    });
  });
}, La = (e, t) => {
  let n = e;
  return t.split(Ai).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, Jg = (e) => e.isThemeGetter, eb = (e) => {
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
}, Ys = "!", js = ":", tb = js.length, nb = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const s = [];
    let a = 0, i = 0, l = 0, c;
    for (let p = 0; p < r.length; p++) {
      let g = r[p];
      if (a === 0 && i === 0) {
        if (g === js) {
          s.push(r.slice(l, p)), l = p + tb;
          continue;
        }
        if (g === "/") {
          c = p;
          continue;
        }
      }
      g === "[" ? a++ : g === "]" ? a-- : g === "(" ? i++ : g === ")" && i--;
    }
    const u = s.length === 0 ? r : r.substring(l), d = ob(u), f = d !== u, h = c && c > l ? c - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const r = t + js, s = o;
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
}, ob = (e) => e.endsWith(Ys) ? e.substring(0, e.length - 1) : e.startsWith(Ys) ? e.substring(1) : e, rb = (e) => {
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
}, sb = (e) => ({
  cache: eb(e.cacheSize),
  parseClassName: nb(e),
  sortModifiers: rb(e),
  ...Xg(e)
}), ib = /\s+/, ab = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(ib);
  let l = "";
  for (let c = i.length - 1; c >= 0; c -= 1) {
    const u = i[c], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: h,
      baseClassName: p,
      maybePostfixModifierPosition: g
    } = n(u);
    if (d) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let b = !!g, w = o(b ? p.substring(0, g) : p);
    if (!w) {
      if (!b) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (w = o(p), !w) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      b = !1;
    }
    const v = s(f).join(":"), N = h ? v + Ys : v, C = N + w;
    if (a.includes(C))
      continue;
    a.push(C);
    const y = r(w, b);
    for (let k = 0; k < y.length; ++k) {
      const S = y[k];
      a.push(N + S);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function lb() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = vc(t)) && (o && (o += " "), o += n);
  return o;
}
const vc = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = vc(e[o])) && (n && (n += " "), n += t);
  return n;
};
function cb(e, ...t) {
  let n, o, r, s = a;
  function a(l) {
    const c = t.reduce((u, d) => d(u), e());
    return n = sb(c), o = n.cache.get, r = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const c = o(l);
    if (c)
      return c;
    const u = ab(l, n);
    return r(l, u), u;
  }
  return function() {
    return s(lb.apply(null, arguments));
  };
}
const _e = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, wc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Nc = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ub = /^\d+\/\d+$/, db = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, mb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, fb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, hb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, pb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Cn = (e) => ub.test(e), he = (e) => !!e && !Number.isNaN(Number(e)), Gt = (e) => !!e && Number.isInteger(Number(e)), vs = (e) => e.endsWith("%") && he(e.slice(0, -1)), Dt = (e) => db.test(e), gb = () => !0, bb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  mb.test(e) && !fb.test(e)
), yc = () => !1, vb = (e) => hb.test(e), wb = (e) => pb.test(e), Nb = (e) => !ne(e) && !oe(e), yb = (e) => qn(e, Cc, yc), ne = (e) => wc.test(e), an = (e) => qn(e, Ec, bb), ws = (e) => qn(e, Tb, he), Oa = (e) => qn(e, kc, yc), kb = (e) => qn(e, xc, wb), Jo = (e) => qn(e, Tc, vb), oe = (e) => Nc.test(e), mo = (e) => Xn(e, Ec), xb = (e) => Xn(e, Mb), _a = (e) => Xn(e, kc), Cb = (e) => Xn(e, Cc), Eb = (e) => Xn(e, xc), er = (e) => Xn(e, Tc, !0), qn = (e, t, n) => {
  const o = wc.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Xn = (e, t, n = !1) => {
  const o = Nc.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, kc = (e) => e === "position" || e === "percentage", xc = (e) => e === "image" || e === "url", Cc = (e) => e === "length" || e === "size" || e === "bg-size", Ec = (e) => e === "length", Tb = (e) => e === "number", Mb = (e) => e === "family-name", Tc = (e) => e === "shadow", Sb = () => {
  const e = _e("color"), t = _e("font"), n = _e("text"), o = _e("font-weight"), r = _e("tracking"), s = _e("leading"), a = _e("breakpoint"), i = _e("container"), l = _e("spacing"), c = _e("radius"), u = _e("shadow"), d = _e("inset-shadow"), f = _e("text-shadow"), h = _e("drop-shadow"), p = _e("blur"), g = _e("perspective"), b = _e("aspect"), w = _e("ease"), v = _e("animate"), N = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
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
  ], y = () => [...C(), oe, ne], k = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], x = () => [oe, ne, l], T = () => [Cn, "full", "auto", ...x()], M = () => [Gt, "none", "subgrid", oe, ne], D = () => ["auto", {
    span: ["full", Gt, oe, ne]
  }, Gt, oe, ne], A = () => [Gt, "auto", oe, ne], I = () => ["auto", "min", "max", "fr", oe, ne], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...x()], q = () => [Cn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], R = () => [e, oe, ne], P = () => [...C(), _a, Oa, {
    position: [oe, ne]
  }], z = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], X = () => ["auto", "cover", "contain", Cb, yb, {
    size: [oe, ne]
  }], G = () => [vs, mo, an], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    oe,
    ne
  ], te = () => ["", he, mo, an], _ = () => ["solid", "dashed", "dotted", "double"], H = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => [he, vs, _a, Oa], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    p,
    oe,
    ne
  ], ge = () => ["none", he, oe, ne], be = () => ["none", he, oe, ne], Pe = () => [he, oe, ne], He = () => [Cn, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Dt],
      breakpoint: [Dt],
      color: [gb],
      container: [Dt],
      "drop-shadow": [Dt],
      ease: ["in", "out", "in-out"],
      font: [Nb],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Dt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Dt],
      shadow: [Dt],
      spacing: ["px", he],
      text: [Dt],
      "text-shadow": [Dt],
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
        aspect: ["auto", "square", Cn, ne, oe, b]
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
        columns: [he, ne, oe, i]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": N()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": N()
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
        object: y()
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
        z: [Gt, "auto", oe, ne]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Cn, "full", "auto", i, ...x()]
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
        flex: [he, Cn, "auto", "initial", "none", ne]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", he, oe, ne]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", he, oe, ne]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Gt, "first", "last", "none", oe, ne]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": M()
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
        "grid-rows": M()
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
        size: q()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [i, "screen", ...q()]
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
          ...q()
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
        text: ["base", n, mo, an]
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
        font: [o, oe, ws]
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
        font: [xb, ne, t]
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
        tracking: [r, oe, ne]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [he, "none", oe, ws]
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
        "list-image": ["none", oe, ne]
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
        list: ["disc", "decimal", "none", oe, ne]
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
        decoration: [..._(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [he, "from-font", "auto", oe, an]
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
        "underline-offset": [he, "auto", oe, ne]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", oe, ne]
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
        content: ["none", oe, ne]
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
        bg: z()
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
          }, Gt, oe, ne],
          radial: ["", oe, ne],
          conic: [Gt, oe, ne]
        }, Eb, kb]
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
        border: [..._(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [..._(), "hidden", "none"]
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
        outline: [..._(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [he, oe, ne]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", he, mo, an]
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
          er,
          Jo
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
        "inset-shadow": ["none", d, er, Jo]
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
        ring: R()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [he, an]
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
        "inset-ring": te()
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
        "text-shadow": ["none", f, er, Jo]
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
        opacity: [he, oe, ne]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...H(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": H()
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
        "mask-linear": [he]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": j()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": j()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": R()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": R()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": j()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": j()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": R()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": R()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": j()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": j()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": R()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": R()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": j()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": j()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": R()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": R()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": j()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": j()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": R()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": R()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": j()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": j()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": R()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": R()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": j()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": j()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": R()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": R()
      }],
      "mask-image-radial": [{
        "mask-radial": [oe, ne]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": j()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": j()
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
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [he]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": j()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": j()
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
        mask: P()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: z()
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
        mask: ["none", oe, ne]
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
          oe,
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
        brightness: [he, oe, ne]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [he, oe, ne]
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
          er,
          Jo
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
        grayscale: ["", he, oe, ne]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [he, oe, ne]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", he, oe, ne]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [he, oe, ne]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", he, oe, ne]
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
          oe,
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
        "backdrop-brightness": [he, oe, ne]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [he, oe, ne]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", he, oe, ne]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [he, oe, ne]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", he, oe, ne]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [he, oe, ne]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [he, oe, ne]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", he, oe, ne]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", oe, ne]
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
        duration: [he, "initial", oe, ne]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, oe, ne]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [he, oe, ne]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, oe, ne]
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
        perspective: [g, oe, ne]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": y()
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
        scale: be()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": be()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": be()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": be()
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
        skew: Pe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Pe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Pe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [oe, ne, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: y()
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
        translate: He()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": He()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": He()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": He()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", oe, ne]
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
        "will-change": ["auto", "scroll", "contents", "transform", oe, ne]
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
        stroke: [he, mo, an, ws]
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
}, Db = /* @__PURE__ */ cb(Sb);
function de(...e) {
  return Db(gc(e));
}
function $a(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function _r(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = $a(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : $a(e[r], null);
        }
      };
  };
}
function Ye(...e) {
  return E.useCallback(_r(...e), e);
}
// @__NO_SIDE_EFFECTS__
function ko(e) {
  const t = /* @__PURE__ */ Pb(e), n = E.forwardRef((o, r) => {
    const { children: s, ...a } = o, i = E.Children.toArray(s), l = i.find(Ib);
    if (l) {
      const c = l.props.children, u = i.map((d) => d === l ? E.Children.count(c) > 1 ? E.Children.only(null) : E.isValidElement(c) ? c.props.children : null : d);
      return /* @__PURE__ */ Y(t, { ...a, ref: r, children: E.isValidElement(c) ? E.cloneElement(c, void 0, u) : null });
    }
    return /* @__PURE__ */ Y(t, { ...a, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Ab = /* @__PURE__ */ ko("Slot");
// @__NO_SIDE_EFFECTS__
function Pb(e) {
  const t = E.forwardRef((n, o) => {
    const { children: r, ...s } = n;
    if (E.isValidElement(r)) {
      const a = Ob(r), i = Lb(s, r.props);
      return r.type !== E.Fragment && (i.ref = o ? _r(o, a) : a), E.cloneElement(r, i);
    }
    return E.Children.count(r) > 1 ? E.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Mc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Rb(e) {
  const t = ({ children: n }) => /* @__PURE__ */ Y(uf, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Mc, t;
}
function Ib(e) {
  return E.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Mc;
}
function Lb(e, t) {
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
function Ob(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const Ba = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ha = gc, _b = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return Ha(e, n?.class, n?.className);
  const { variants: r, defaultVariants: s } = t, a = Object.keys(r).map((c) => {
    const u = n?.[c], d = s?.[c];
    if (u === null) return null;
    const f = Ba(u) || Ba(d);
    return r[c][f];
  }), i = n && Object.entries(n).reduce((c, u) => {
    let [d, f] = u;
    return f === void 0 || (c[d] = f), c;
  }, {}), l = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((c, u) => {
    let { class: d, className: f, ...h } = u;
    return Object.entries(h).every((p) => {
      let [g, b] = p;
      return Array.isArray(b) ? b.includes({
        ...s,
        ...i
      }[g]) : {
        ...s,
        ...i
      }[g] === b;
    }) ? [
      ...c,
      d,
      f
    ] : c;
  }, []);
  return Ha(e, a, l, n?.class, n?.className);
}, Ks = _b(
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
  asChild: o = !1,
  ...r
}) {
  return /* @__PURE__ */ m(
    o ? Ab : "button",
    {
      "data-slot": "button",
      className: de(Ks({ variant: t, size: n, className: e })),
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
function $b({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: o = "label",
  buttonVariant: r = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const l = Di();
  return /* @__PURE__ */ m(
    qg,
    {
      showOutsideDays: n,
      className: de(
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
        root: de("w-fit", l.root),
        months: de(
          "flex gap-4 flex-col md:flex-row relative",
          l.months
        ),
        month: de("flex flex-col w-full gap-4", l.month),
        nav: de(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          l.nav
        ),
        button_previous: de(
          Ks({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: de(
          Ks({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_next
        ),
        month_caption: de(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: de(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          l.dropdowns
        ),
        dropdown_root: de(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          l.dropdown_root
        ),
        dropdown: de(
          "absolute bg-popover inset-0 opacity-0",
          l.dropdown
        ),
        caption_label: de(
          "select-none font-medium",
          o === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: de("flex", l.weekdays),
        weekday: de(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          l.weekday
        ),
        week: de("flex w-full mt-2", l.week),
        week_number_header: de(
          "select-none w-(--cell-size)",
          l.week_number_header
        ),
        week_number: de(
          "text-[0.8rem] select-none text-muted-foreground",
          l.week_number
        ),
        day: de(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          l.day
        ),
        range_start: de(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: de("rounded-none", l.range_middle),
        range_end: de("rounded-r-md bg-accent", l.range_end),
        today: de(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          l.today
        ),
        outside: de(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: de(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: de("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: c, rootRef: u, ...d }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: de(c),
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
        Chevron: ({ className: c, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(xm, { className: de("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this) : u === "right" ? /* @__PURE__ */ m(
          Cm,
          {
            className: de("size-4", c),
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
        ) : /* @__PURE__ */ m(Em, { className: de("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this),
        DayButton: Bb,
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
function Bb({
  className: e,
  day: t,
  modifiers: n,
  ...o
}) {
  const r = Di(), s = E.useRef(null);
  return E.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
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
      className: de(
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
let Ln = null;
const Sc = /* @__PURE__ */ new Map(), Hb = /* @__PURE__ */ new Map();
function hr() {
  if (!Ln) return;
  const e = Ln;
  Ln = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Wb(e) {
  return Ln?.pillDate === e;
}
function Fb({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: o,
  onClose: r
}) {
  const s = V(null), a = $r(e);
  Q(() => {
    const v = (N) => {
      N.key === "Escape" && (N.stopPropagation(), N.preventDefault(), r());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [r]), Q(() => {
    const v = (C) => {
      s.current && !s.current.contains(C.target) && (C.target.closest(".date-pill") || r());
    }, N = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(N), document.removeEventListener("mousedown", v, !0);
    };
  }, [r]);
  const i = U((v) => {
    v && o(_n(v)), r();
  }, [o, r]), l = U((v) => {
    const N = /* @__PURE__ */ new Date();
    N.setDate(N.getDate() + v), o(_n(N)), r();
  }, [o, r]), c = U(() => {
    const N = (/* @__PURE__ */ new Date()).getDay(), C = N === 0 ? 1 : 8 - N, y = /* @__PURE__ */ new Date();
    y.setDate(y.getDate() + C), o(_n(y)), r();
  }, [o, r]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const h = f.toDateString(), p = u.getDay(), g = p === 0 ? 1 : 8 - p, b = new Date(u);
  b.setDate(b.getDate() + g);
  const w = b.toDateString();
  return /* @__PURE__ */ m(
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
            $b,
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
              Zt,
              {
                variant: "outline",
                size: "sm",
                className: de(
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
              Zt,
              {
                variant: "outline",
                size: "sm",
                className: de(
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
              Zt,
              {
                variant: "outline",
                size: "sm",
                className: de(
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
function zb(e, t, n) {
  if (Wb(t)) {
    hr();
    return;
  }
  hr();
  const o = e.getBoundingClientRect(), r = window.innerWidth, s = window.innerHeight, a = 320, i = 420, l = 10, c = 16, u = s - o.bottom - l - c, d = o.top - l - c, f = u >= i ? "below" : d >= i ? "above" : u >= d ? "below" : "above";
  let h;
  f === "below" ? h = o.bottom + l : h = o.top - i - l;
  const p = o.left + o.width / 2;
  let g = p - a / 2;
  g + a > r - c && (g = r - a - c), g < c && (g = c);
  const b = document.createElement("div");
  b.setAttribute("data-date-picker-standalone", t), b.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(b), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((y) => {
    b.addEventListener(y, (k) => {
      k.stopPropagation();
    }, !1);
  });
  const v = cf(b);
  Ln = { container: b, root: v, pillDate: t };
  const N = () => {
    hr();
  }, C = (y) => {
    const k = Sc.get(t);
    k && k(y);
  };
  v.render(
    /* @__PURE__ */ m(
      Fb,
      {
        currentDate: t,
        theme: n,
        position: { top: h, left: g, direction: f, pillCenter: p },
        onSelectDate: C,
        onClose: N
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
function Ub({ node: e, updateAttributes: t, selected: n }) {
  const o = V(null), r = e.attrs.date || On(), s = Dc(r), a = Pi(r), i = U(() => {
    if (!o.current) return "";
    const l = o.current.closest(".markdown-editor-container");
    if (l) {
      const u = l.getAttribute("data-theme");
      if (u) return u;
    }
    return o.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return Q(() => (Sc.set(r, (l) => {
    t({ date: l });
  }), Hb.set(r, i), () => {
  }), [r, t, i]), Q(() => {
    const l = o.current;
    if (!l) return;
    const c = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = l.getAttribute("data-date") || On(), f = i();
      zb(l, d, f);
    };
    return l.addEventListener("click", c), () => l.removeEventListener("click", c);
  }, [i]), Q(() => {
    const l = o.current?.closest(".ProseMirror") || document, c = () => {
      Ln && hr();
    };
    return l.addEventListener("scroll", c, { passive: !0 }), () => {
      l.removeEventListener("scroll", c);
    };
  }, []), /* @__PURE__ */ m(Wn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: o,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": r,
      children: [
        /* @__PURE__ */ m(Il, { size: 14, className: "date-icon" }, void 0, !1, {
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
function $r(e) {
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
function vo(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function _n(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Dc(e) {
  const t = $r(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
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
function Yb(e) {
  return $r(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function cn(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return On();
  if (n === "tomorrow") return vo(1);
  if (n === "yesterday") return vo(-1);
  if (n === "next monday") {
    const i = (/* @__PURE__ */ new Date()).getDay(), l = i === 0 ? 1 : 8 - i;
    return vo(l);
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
      return _n(u);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const a = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return _n(a);
  }
  return null;
}
function Pi(e) {
  const t = $r(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  return r.setDate(r.getDate() + 7), t.getTime() === o.getTime() ? "date-today" : t < o ? "date-overdue" : t <= r ? "date-upcoming" : "";
}
const jb = new Ke("datePillPaste"), Kb = Ar.create({
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
    const n = e.attrs.date, o = Dc(n), r = Pi(n);
    return [
      "span",
      Yn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${r}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, o]
    ];
  },
  addNodeView() {
    return Dr(Ub, {
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
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(On()).run();
      }
    }), t = new Qe({
      find: /@tomorrow\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(vo(1)).run();
      }
    }), n = new Qe({
      find: /@yesterday\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(vo(-1)).run();
      }
    }), o = new Qe({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), r = new Qe({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = {
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
        if (p !== void 0) {
          const g = (/* @__PURE__ */ new Date()).getFullYear(), b = new Date(g, p, parseInt(f[2], 10));
          d().deleteRange(u).insertDatePill(_n(b)).run();
        }
      }
    }), s = new Qe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = cn(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), a = new Qe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = cn(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), i = new Qe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), l = new Qe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = cn(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), c = new Qe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = cn(f[1]);
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
      new je({
        key: jb,
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
              if (cn(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, h = [];
            let p = 0;
            const g = new RegExp(a.source, a.flags);
            let b;
            for (; (b = g.exec(r)) !== null; ) {
              const C = b[1], y = cn(C);
              if (y) {
                const k = r.slice(p, b.index);
                k && h.push(f.text(k)), h.push(e.create({ date: y })), p = b.index + b[0].length;
              }
            }
            const w = r.slice(p);
            if (w && h.push(f.text(w)), h.length === 0) return !1;
            const v = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, h)
            ), { $from: N } = u.selection;
            if (N.parent.type.name === "paragraph") {
              const C = d;
              let y = u.selection.from;
              for (const k of h)
                C.insert(y, k), y += k.nodeSize;
              C.delete(u.selection.from, u.selection.to), t.dispatch(C);
            } else
              d.replaceSelectionWith(v), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), at = /* @__PURE__ */ new Map();
function Vb({ node: e, selected: t, editor: n, getPos: o, deleteNode: r }) {
  const s = V(null), a = V(null), i = e.attrs.tag || "", l = V(!1), [c, u] = K(() => at.has(i)), [d, f] = K(() => at.get(i)?.value ?? i);
  Q(() => {
    c || f(i);
  }, [i, c]), Q(() => {
    if (c) {
      const v = at.get(i);
      at.set(i, {
        value: d,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [c, d, i]);
  const h = U((v) => {
    if (l.current) return;
    l.current = !0;
    const N = v.trim().replace(/^#/, ""), C = wo(N);
    if (at.delete(i), C && at.delete(C), !C || !An(C))
      r();
    else if (C !== i) {
      const y = o();
      if (typeof y == "number" && n) {
        const { tr: k } = n.state, S = e.nodeSize;
        k.delete(y, y + S), k.insert(y, n.schema.nodes.tagPill.create({ tag: C })), n.view.dispatch(k);
      }
    } else
      at.delete(i);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [i, n, o, r, e.nodeSize]), p = U(() => {
    n && !n.isEditable || (at.set(i, { value: i, focusedAt: Date.now() }), f(i), u(!0), l.current = !1);
  }, [n, i]);
  Q(() => {
    const v = s.current;
    if (!v || c) return;
    const N = (y) => {
      y.preventDefault(), y.stopPropagation(), p();
    }, C = (y) => {
      y.preventDefault(), y.stopPropagation();
    };
    return v.addEventListener("dblclick", N), v.addEventListener("click", C), () => {
      v.removeEventListener("dblclick", N), v.removeEventListener("click", C);
    };
  }, [c, n, o, p]), Q(() => {
    if (c) {
      const v = requestAnimationFrame(() => {
        if (a.current) {
          a.current.focus(), a.current.select();
          const N = at.get(i);
          N && (N.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [c, i]);
  const g = U((v) => {
    v.key === "Enter" ? (v.preventDefault(), h(d)) : v.key === "Escape" && (v.preventDefault(), at.delete(i), u(!1), l.current = !0, n?.commands.focus());
  }, [h, d, i, n]), b = U(() => {
    const N = at.get(i)?.focusedAt ?? 0;
    Date.now() - N > 300 && h(d);
  }, [h, d, i]), w = U((v) => {
    f(v.target.value);
  }, []);
  return c ? /* @__PURE__ */ m(Wn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(ua, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
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
            onKeyDown: g,
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
  }, this) : /* @__PURE__ */ m(Wn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(ua, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
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
function An(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function wo(e) {
  return e.toLowerCase().trim();
}
const Gb = new Ke("tagPillPaste"), qb = Ar.create({
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
    return Dr(Vb, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = wo(e);
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
      handler: ({ range: t, chain: n, match: o }) => {
        const r = wo(o[1]);
        if (An(r)) {
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
      new je({
        key: Gb,
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
              if (An(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, h = [];
            let p = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let b;
            for (; (b = g.exec(r)) !== null; ) {
              const N = wo(b[1]);
              if (An(N)) {
                const C = b[0], y = C.startsWith(" ") || C.startsWith(`
`) ? 1 : 0, k = r.slice(p, b.index + y);
                k && h.push(f.text(k)), h.push(e.create({ tag: N })), p = b.index + C.length;
              }
            }
            const w = r.slice(p);
            if (w && h.push(f.text(w)), h.length === 0) return !1;
            const { $from: v } = u.selection;
            if (v.parent.type.name === "paragraph") {
              const N = d;
              let C = u.selection.from;
              for (const y of h)
                N.insert(C, y), C += y.nodeSize;
              N.delete(u.selection.from, u.selection.to), t.dispatch(N);
            } else {
              const N = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, h)
              );
              d.replaceSelectionWith(N), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function Ac({ isOpen: e, onClose: t, onInsert: n, position: o }) {
  const [r, s] = K(""), [a, i] = K(""), [l, c] = K(""), [u, d] = K(!1), f = V(null), h = V(null);
  Q(() => {
    e && (s(""), i(""), c(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), Q(() => {
    if (!e) return;
    const v = (y) => {
      h.current && !h.current.contains(y.target) && t();
    }, N = (y) => {
      y.key === "Escape" && t();
    }, C = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", N), () => {
      clearTimeout(C), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", N);
    };
  }, [e, t]);
  const p = (v) => {
    if (!v.trim())
      return c("Please enter an image URL"), !1;
    try {
      const N = new URL(v);
      if (!["http:", "https:", "data:"].includes(N.protocol))
        return c("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return c("Please enter a valid URL"), !1;
    }
    return c(""), !0;
  }, g = async () => {
    if (!p(r)) return;
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
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), g());
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
            /* @__PURE__ */ m(wi, { size: 16, className: "text-primary" }, void 0, !1, {
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
              children: /* @__PURE__ */ m(Ot, { size: 16 }, void 0, !1, {
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
              /* @__PURE__ */ m(ai, { size: 12 }, void 0, !1, {
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
              /* @__PURE__ */ m(Ir, { size: 12 }, void 0, !1, {
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
                onClick: g,
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
const Xb = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(Ir, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(Tm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(Mm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(Sm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 82,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(Dm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(Am, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 94,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(hi, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 100,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(pi, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(gi, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(fi, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(Ll, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 124,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(wi, { size: 16 }, void 0, !1, {
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
    icon: /* @__PURE__ */ m(Ol, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 143,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(vr, { size: 16, className: "text-blue-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 149,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(Pl, { size: 16, className: "text-purple-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 155,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(Al, { size: 16, className: "text-amber-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 161,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(vi, { size: 16, className: "text-green-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 167,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(bi, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 173,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(Il, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 179,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(ai, { size: 16, className: "text-cyan-400" }, void 0, !1, {
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
], Zb = 32, Qb = 8, Jb = 320, ev = 210, tr = 12;
function Wa(e) {
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
function tv({ editor: e }) {
  const [t, n] = K(!1), [o, r] = K(""), [s, a] = K(0), [i, l] = K(null), [c, u] = K(!1), [d, f] = K({ top: 0, left: 0 }), [h, p] = K("below"), g = V(null), b = V(-1), w = V(!1);
  Q(() => {
    w.current = t;
  }, [t]);
  const v = Xb.filter((T) => {
    if (!o) return !0;
    const M = o.toLowerCase();
    return T.title.toLowerCase().includes(M) || T.keywords?.some((D) => D.includes(M));
  }), N = Math.min(
    v.length * Zb + Qb,
    Jb
  );
  Pr(() => {
    if (!t || !i) return;
    const { top: T, bottom: M, left: D } = i, A = window.innerHeight, I = window.innerWidth, L = A - M - tr, $ = T - tr;
    let W;
    if (L >= N ? W = "below" : $ >= N ? W = "above" : W = L >= $ ? "below" : "above", p(W), g.current) {
      const q = Math.max(
        tr,
        Math.min(D, I - ev - tr)
      ), R = W === "below" ? M + 4 : T - N - 4;
      g.current.style.top = `${R}px`, g.current.style.left = `${q}px`;
    }
  }, [t, i, N, v.length]);
  const C = U(() => {
    const { state: T } = e, { selection: M } = T, D = M.from, A = b.current;
    if (A >= 0 && A <= D)
      e.chain().focus().deleteRange({ from: A, to: D }).run();
    else {
      const { $from: I } = M, $ = I.parent.textBetween(0, I.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const W = I.pos - (I.parentOffset - $);
        e.chain().focus().deleteRange({ from: W, to: I.pos }).run();
      }
    }
  }, [e]), y = U(() => {
    n(!1), r(""), a(0), b.current = -1, l(null);
  }, []), k = U((T) => {
    const M = v[T];
    if (M) {
      if (C(), M.isImageCommand) {
        const { state: D } = e, A = e.view.coordsAtPos(D.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), u(!0);
      } else
        M.command(e);
      y();
    }
  }, [e, v, C, y]), S = U((T, M) => {
    e.chain().focus().setImage({ src: T, alt: M }).run();
  }, [e]);
  return Q(() => {
    if (!e) return;
    const T = () => {
      if (w.current) return;
      const { state: M } = e, { selection: D } = M, { $from: A } = D;
      if (A.parentOffset === 0) return;
      const I = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!I.endsWith("/")) return;
      const L = I.length > 1 ? I.slice(-2, -1) : "";
      if (L && L !== " " && L !== `
`) return;
      b.current = A.pos - 1;
      const $ = Wa(e);
      $ && (l($), n(!0), r(""), a(0));
    };
    return e.on("update", T), () => {
      e.off("update", T);
    };
  }, [e]), Q(() => {
    if (!e || !t) return;
    const T = e.view.dom, M = (D) => {
      w.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), a((A) => (A + 1) % v.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), a((A) => (A - 1 + v.length) % v.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), k(s)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), y()));
    };
    return T.addEventListener("keydown", M, !0), () => {
      T.removeEventListener("keydown", M, !0);
    };
  }, [e, t, s, v, k, y]), Q(() => {
    if (!e || !t) return;
    const T = () => {
      if (!w.current || b.current < 0) return;
      const { state: M } = e, { selection: D } = M, A = D.from, I = b.current;
      if (A <= I) {
        y();
        return;
      }
      try {
        const L = M.doc.textBetween(I + 1, A, void 0, "￼");
        if (L.includes(`
`)) {
          y();
          return;
        }
        r(L), a(0);
        const $ = Wa(e);
        $ && l($);
      } catch {
        y();
      }
    };
    return e.on("update", T), e.on("selectionUpdate", T), () => {
      e.off("update", T), e.off("selectionUpdate", T);
    };
  }, [e, t, y]), Q(() => {
    if (!t) return;
    const T = (M) => {
      g.current && !g.current.contains(M.target) && y();
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [t, y]), Q(() => {
    t && v.length === 0 && o.length > 2 && y();
  }, [t, v.length, o, y]), Q(() => {
    s >= v.length && a(Math.max(0, v.length - 1));
  }, [v.length, s]), Q(() => {
    if (!t || !g.current) return;
    const T = g.current.querySelector(".slash-item.is-selected");
    T && T.scrollIntoView({ block: "nearest" });
  }, [t, s]), c ? /* @__PURE__ */ m(
    Ac,
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
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ m(Ht, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: g,
      className: `slash-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((T, M) => /* @__PURE__ */ m(
        "div",
        {
          className: `slash-item ${M === s ? "is-selected" : ""}`,
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation(), k(M);
          },
          onMouseEnter: () => a(M),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: T.icon }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 569,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "slash-label", children: T.title }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 570,
              columnNumber: 11
            }, this)
          ]
        },
        T.title,
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
const nv = 340, ov = 36, rv = 8, sv = 240, nr = 8;
function Fa(e) {
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
function iv({ editor: e, onSearch: t, onCreateItem: n }) {
  const [o, r] = K(!1), [s, a] = K(""), [i, l] = K([]), [c, u] = K(0), [d, f] = K(null), [h, p] = K("below"), [g, b] = K(!1), w = V(!1), v = V(null), N = V(-1), C = V(null);
  Q(() => {
    w.current = o;
  }, [o]);
  const y = U(() => {
    r(!1), a(""), l([]), u(0), N.current = -1;
  }, []), k = U((D) => {
    const A = N.current;
    if (A < 0) return;
    const { state: I } = e, L = I.selection.from;
    try {
      const $ = I.tr.delete(A, L), W = I.schema.marks.wikiLink;
      if (W) {
        const q = W.create({ pageName: D }), R = I.schema.text(D, [q]);
        $.insert(A, R);
        const P = A + D.length;
        $.setSelection(fn.create($.doc, P)), $.removeStoredMark(W);
      } else
        $.insertText(`[[${D}]]`, A);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
    }
    y();
  }, [e, y]);
  Q(() => {
    if (!e) return;
    const D = () => {
      if (w.current) return;
      const { state: A } = e, { selection: I } = A, { $from: L } = I;
      if (L.parentOffset < 2 || !L.parent.textBetween(0, L.parentOffset, void 0, "￼").endsWith("[[")) return;
      N.current = L.pos - 2;
      const W = Fa(e);
      W && (f(W), r(!0), a(""), l([]), u(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), Q(() => {
    if (!e || !o) return;
    const D = e.view.dom, A = (I) => {
      if (w.current) {
        if (I.key === "ArrowDown") {
          I.preventDefault();
          const L = i.length + (s.trim() ? 1 : 0) - 1;
          u(($) => Math.min($ + 1, L));
          return;
        }
        if (I.key === "ArrowUp") {
          I.preventDefault(), u((L) => Math.max(L - 1, 0));
          return;
        }
        if (I.key === "Enter" || I.key === "Tab") {
          I.preventDefault(), I.stopPropagation(), c < i.length ? k(i[c].title) : s.trim() && n ? (n(s.trim()), y()) : s.trim() && k(s.trim());
          return;
        }
        if (I.key === "Escape") {
          I.preventDefault(), y();
          return;
        }
        I.key === "]" && setTimeout(() => {
          const { state: L } = e, { $from: $ } = L.selection;
          $.parent.textBetween(0, $.parentOffset, void 0, "￼").endsWith("]]") && y();
        }, 0);
      }
    };
    return D.addEventListener("keydown", A, !0), () => {
      D.removeEventListener("keydown", A, !0);
    };
  }, [e, o, i, c, s, k, y, n]), Q(() => {
    if (!e || !o) return;
    const D = () => {
      const A = N.current;
      if (A < 0) {
        y();
        return;
      }
      const { state: I } = e, L = I.selection.from;
      if (L <= A) {
        y();
        return;
      }
      try {
        const $ = I.doc.textBetween(A + 2, L, void 0, "￼");
        if ($.includes(`
`) || $.includes("]]")) {
          y();
          return;
        }
        a($), u(0);
        const W = Fa(e);
        W && f(W);
      } catch {
        y();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, o, y]), Q(() => {
    if (o) {
      if (C.current && clearTimeout(C.current), !s.trim()) {
        b(!0), C.current = setTimeout(async () => {
          try {
            const D = await t("");
            l(D);
          } catch {
            l([]);
          }
          b(!1);
        }, 100);
        return;
      }
      return b(!0), C.current = setTimeout(async () => {
        try {
          const D = await t(s.trim());
          l(D);
        } catch {
          l([]);
        }
        b(!1);
      }, 150), () => {
        C.current && clearTimeout(C.current);
      };
    }
  }, [o, s, t]), Q(() => {
    if (!o) return;
    const D = (A) => {
      v.current && !v.current.contains(A.target) && y();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [o, y]), Q(() => {
    if (!o || !v.current) return;
    const D = v.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [o, c]);
  const S = i.length + (s.trim() ? 1 : 0), x = Math.min(
    Math.max(S, 1) * ov + rv,
    sv
  );
  if (Pr(() => {
    if (!o || !d) return;
    const { top: D, bottom: A, left: I } = d, L = window.innerHeight, $ = window.innerWidth, W = L - A - nr, q = D - nr;
    let R;
    if (W >= x ? R = "below" : q >= x ? R = "above" : R = W >= q ? "below" : "above", p(R), v.current) {
      const P = Math.max(
        nr,
        Math.min(I, $ - nv - nr)
      ), z = R === "below" ? A + 4 : D - x - 4;
      v.current.style.top = `${z}px`, v.current.style.left = `${P}px`;
    }
  }, [o, d, x, S]), !o) return null;
  const T = s.trim() && !i.some((D) => D.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(Ht, { children: /* @__PURE__ */ m(
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
        g && i.length === 0 && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 366,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 365,
          columnNumber: 9
        }, this),
        i.map((D, A) => /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item ${A === c ? "is-selected" : ""}`,
            onMouseDown: (I) => {
              I.preventDefault(), k(D.title);
            },
            onMouseEnter: () => u(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Ni, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 380,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 379,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: D.title }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 382,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: D.type }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 383,
                columnNumber: 11
              }, this)
            ]
          },
          D.id,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 370,
            columnNumber: 9
          },
          this
        )),
        T && /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item wikilink-create ${i.length === c ? "is-selected" : ""}`,
            onMouseDown: (D) => {
              D.preventDefault(), n ? (n(s.trim()), y()) : k(s.trim());
            },
            onMouseEnter: () => u(i.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(yi, { size: 14 }, void 0, !1, {
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
        !g && i.length === 0 && !s.trim() && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }, void 0, !1, {
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
function fe(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Zn(e, t = []) {
  let n = [];
  function o(s, a) {
    const i = E.createContext(a), l = n.length;
    n = [...n, a];
    const c = (d) => {
      const { scope: f, children: h, ...p } = d, g = f?.[e]?.[l] || i, b = E.useMemo(() => p, Object.values(p));
      return /* @__PURE__ */ Y(g.Provider, { value: b, children: h });
    };
    c.displayName = s + "Provider";
    function u(d, f) {
      const h = f?.[e]?.[l] || i, p = E.useContext(h);
      if (p) return p;
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
  return r.scopeName = e, [o, av(r, ...t)];
}
function av(...e) {
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
var Jt = globalThis?.document ? E.useLayoutEffect : () => {
}, lv = E[" useInsertionEffect ".trim().toString()] || Jt;
function Ri({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = cv({
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
        const d = uv(u) ? u(e) : u;
        d !== e && a.current?.(d);
      } else
        s(u);
    },
    [i, e, s, a]
  );
  return [l, c];
}
function cv({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = E.useState(e), r = E.useRef(n), s = E.useRef(t);
  return lv(() => {
    s.current = t;
  }, [t]), E.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function uv(e) {
  return typeof e == "function";
}
var dv = [
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
], ze = dv.reduce((e, t) => {
  const n = /* @__PURE__ */ ko(`Primitive.${t}`), o = E.forwardRef((r, s) => {
    const { asChild: a, ...i } = r, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ Y(l, { ...i, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Pc(e, t) {
  e && Fl.flushSync(() => e.dispatchEvent(t));
}
function Rc(e) {
  const t = e + "CollectionProvider", [n, o] = Zn(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: b, children: w } = g, v = J.useRef(null), N = J.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ Y(r, { scope: b, itemMap: N, collectionRef: v, children: w });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ ko(i), c = J.forwardRef(
    (g, b) => {
      const { scope: w, children: v } = g, N = s(i, w), C = Ye(b, N.collectionRef);
      return /* @__PURE__ */ Y(l, { ref: C, children: v });
    }
  );
  c.displayName = i;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ ko(u), h = J.forwardRef(
    (g, b) => {
      const { scope: w, children: v, ...N } = g, C = J.useRef(null), y = Ye(b, C), k = s(u, w);
      return J.useEffect(() => (k.itemMap.set(C, { ref: C, ...N }), () => void k.itemMap.delete(C))), /* @__PURE__ */ Y(f, { [d]: "", ref: y, children: v });
    }
  );
  h.displayName = u;
  function p(g) {
    const b = s(e + "CollectionConsumer", g);
    return J.useCallback(() => {
      const v = b.collectionRef.current;
      if (!v) return [];
      const N = Array.from(v.querySelectorAll(`[${d}]`));
      return Array.from(b.itemMap.values()).sort(
        (k, S) => N.indexOf(k.ref.current) - N.indexOf(S.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: a, Slot: c, ItemSlot: h },
    p,
    o
  ];
}
var mv = E.createContext(void 0);
function Ic(e) {
  const t = E.useContext(mv);
  return e || t || "ltr";
}
function _t(e) {
  const t = E.useRef(e);
  return E.useEffect(() => {
    t.current = e;
  }), E.useMemo(() => (...n) => t.current?.(...n), []);
}
function fv(e, t = globalThis?.document) {
  const n = _t(e);
  E.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var hv = "DismissableLayer", Vs = "dismissableLayer.update", pv = "dismissableLayer.pointerDownOutside", gv = "dismissableLayer.focusOutside", za, Lc = E.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ii = E.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, c = E.useContext(Lc), [u, d] = E.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, h] = E.useState({}), p = Ye(t, (S) => d(S)), g = Array.from(c.layers), [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), w = g.indexOf(b), v = u ? g.indexOf(u) : -1, N = c.layersWithOutsidePointerEventsDisabled.size > 0, C = v >= w, y = wv((S) => {
      const x = S.target, T = [...c.branches].some((M) => M.contains(x));
      !C || T || (r?.(S), a?.(S), S.defaultPrevented || i?.());
    }, f), k = Nv((S) => {
      const x = S.target;
      [...c.branches].some((M) => M.contains(x)) || (s?.(S), a?.(S), S.defaultPrevented || i?.());
    }, f);
    return fv((S) => {
      v === c.layers.size - 1 && (o?.(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, f), E.useEffect(() => {
      if (u)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (za = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(u)), c.layers.add(u), Ua(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = za);
        };
    }, [u, f, n, c]), E.useEffect(() => () => {
      u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), Ua());
    }, [u, c]), E.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(Vs, S), () => document.removeEventListener(Vs, S);
    }, []), /* @__PURE__ */ Y(
      ze.div,
      {
        ...l,
        ref: p,
        style: {
          pointerEvents: N ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: fe(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: fe(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: fe(
          e.onPointerDownCapture,
          y.onPointerDownCapture
        )
      }
    );
  }
);
Ii.displayName = hv;
var bv = "DismissableLayerBranch", vv = E.forwardRef((e, t) => {
  const n = E.useContext(Lc), o = E.useRef(null), r = Ye(t, o);
  return E.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ Y(ze.div, { ...e, ref: r });
});
vv.displayName = bv;
function wv(e, t = globalThis?.document) {
  const n = _t(e), o = E.useRef(!1), r = E.useRef(() => {
  });
  return E.useEffect(() => {
    const s = (i) => {
      if (i.target && !o.current) {
        let l = function() {
          Oc(
            pv,
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
function Nv(e, t = globalThis?.document) {
  const n = _t(e), o = E.useRef(!1);
  return E.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && Oc(gv, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Ua() {
  const e = new CustomEvent(Vs);
  document.dispatchEvent(e);
}
function Oc(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Pc(r, s) : r.dispatchEvent(s);
}
var Ns = 0;
function yv() {
  E.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ya()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ya()), Ns++, () => {
      Ns === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Ns--;
    };
  }, []);
}
function Ya() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ys = "focusScope.autoFocusOnMount", ks = "focusScope.autoFocusOnUnmount", ja = { bubbles: !1, cancelable: !0 }, kv = "FocusScope", _c = E.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = E.useState(null), c = _t(r), u = _t(s), d = E.useRef(null), f = Ye(t, (g) => l(g)), h = E.useRef({
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
      let g = function(N) {
        if (h.paused || !i) return;
        const C = N.target;
        i.contains(C) ? d.current = C : Xt(d.current, { select: !0 });
      }, b = function(N) {
        if (h.paused || !i) return;
        const C = N.relatedTarget;
        C !== null && (i.contains(C) || Xt(d.current, { select: !0 }));
      }, w = function(N) {
        if (document.activeElement === document.body)
          for (const y of N)
            y.removedNodes.length > 0 && Xt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const v = new MutationObserver(w);
      return i && v.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), v.disconnect();
      };
    }
  }, [o, i, h.paused]), E.useEffect(() => {
    if (i) {
      Va.add(h);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const w = new CustomEvent(ys, ja);
        i.addEventListener(ys, c), i.dispatchEvent(w), w.defaultPrevented || (xv(Sv($c(i)), { select: !0 }), document.activeElement === g && Xt(i));
      }
      return () => {
        i.removeEventListener(ys, c), setTimeout(() => {
          const w = new CustomEvent(ks, ja);
          i.addEventListener(ks, u), i.dispatchEvent(w), w.defaultPrevented || Xt(g ?? document.body, { select: !0 }), i.removeEventListener(ks, u), Va.remove(h);
        }, 0);
      };
    }
  }, [i, c, u, h]);
  const p = E.useCallback(
    (g) => {
      if (!n && !o || h.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, w = document.activeElement;
      if (b && w) {
        const v = g.currentTarget, [N, C] = Cv(v);
        N && C ? !g.shiftKey && w === C ? (g.preventDefault(), n && Xt(N, { select: !0 })) : g.shiftKey && w === N && (g.preventDefault(), n && Xt(C, { select: !0 })) : w === v && g.preventDefault();
      }
    },
    [n, o, h.paused]
  );
  return /* @__PURE__ */ Y(ze.div, { tabIndex: -1, ...a, ref: f, onKeyDown: p });
});
_c.displayName = kv;
function xv(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (Xt(o, { select: t }), document.activeElement !== n) return;
}
function Cv(e) {
  const t = $c(e), n = Ka(t, e), o = Ka(t.reverse(), e);
  return [n, o];
}
function $c(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ka(e, t) {
  for (const n of e)
    if (!Ev(n, { upTo: t })) return n;
}
function Ev(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Tv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Xt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Tv(e) && t && e.select();
  }
}
var Va = Mv();
function Mv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Ga(e, t), e.unshift(t);
    },
    remove(t) {
      e = Ga(e, t), e[0]?.resume();
    }
  };
}
function Ga(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Sv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Dv = E[" useId ".trim().toString()] || (() => {
}), Av = 0;
function wr(e) {
  const [t, n] = E.useState(Dv());
  return Jt(() => {
    n((o) => o ?? String(Av++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Pv = ["top", "right", "bottom", "left"], en = Math.min, et = Math.max, Nr = Math.round, or = Math.floor, vt = (e) => ({
  x: e,
  y: e
}), Rv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Iv = {
  start: "end",
  end: "start"
};
function Gs(e, t, n) {
  return et(e, en(t, n));
}
function $t(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Bt(e) {
  return e.split("-")[0];
}
function Qn(e) {
  return e.split("-")[1];
}
function Li(e) {
  return e === "x" ? "y" : "x";
}
function Oi(e) {
  return e === "y" ? "height" : "width";
}
const Lv = /* @__PURE__ */ new Set(["top", "bottom"]);
function bt(e) {
  return Lv.has(Bt(e)) ? "y" : "x";
}
function _i(e) {
  return Li(bt(e));
}
function Ov(e, t, n) {
  n === void 0 && (n = !1);
  const o = Qn(e), r = _i(e), s = Oi(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = yr(a)), [a, yr(a)];
}
function _v(e) {
  const t = yr(e);
  return [qs(e), t, qs(t)];
}
function qs(e) {
  return e.replace(/start|end/g, (t) => Iv[t]);
}
const qa = ["left", "right"], Xa = ["right", "left"], $v = ["top", "bottom"], Bv = ["bottom", "top"];
function Hv(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Xa : qa : t ? qa : Xa;
    case "left":
    case "right":
      return t ? $v : Bv;
    default:
      return [];
  }
}
function Wv(e, t, n, o) {
  const r = Qn(e);
  let s = Hv(Bt(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(qs)))), s;
}
function yr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Rv[t]);
}
function Fv(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Bc(e) {
  return typeof e != "number" ? Fv(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function kr(e) {
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
function Za(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = bt(t), a = _i(t), i = Oi(a), l = Bt(t), c = s === "y", u = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[i] / 2 - r[i] / 2;
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
  switch (Qn(t)) {
    case "start":
      h[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      h[a] += f * (n && c ? -1 : 1);
      break;
  }
  return h;
}
const zv = async (e, t, n) => {
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
  } = Za(c, o, l), f = o, h = {}, p = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: b,
      fn: w
    } = i[g], {
      x: v,
      y: N,
      data: C,
      reset: y
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
    u = v ?? u, d = N ?? d, h = {
      ...h,
      [b]: {
        ...h[b],
        ...C
      }
    }, y && p <= 50 && (p++, typeof y == "object" && (y.placement && (f = y.placement), y.rects && (c = y.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : y.rects), {
      x: u,
      y: d
    } = Za(c, f, l)), g = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: r,
    middlewareData: h
  };
};
async function xo(e, t) {
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
  } = $t(t, e), p = Bc(h), b = i[f ? d === "floating" ? "reference" : "floating" : d], w = kr(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(b))) == null || n ? b : b.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), v = d === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, N = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), C = await (s.isElement == null ? void 0 : s.isElement(N)) ? await (s.getScale == null ? void 0 : s.getScale(N)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, y = kr(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: v,
    offsetParent: N,
    strategy: l
  }) : v);
  return {
    top: (w.top - y.top + p.top) / C.y,
    bottom: (y.bottom - w.bottom + p.bottom) / C.y,
    left: (w.left - y.left + p.left) / C.x,
    right: (y.right - w.right + p.right) / C.x
  };
}
const Uv = (e) => ({
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
    } = $t(e, t) || {};
    if (c == null)
      return {};
    const d = Bc(u), f = {
      x: n,
      y: o
    }, h = _i(r), p = Oi(h), g = await a.getDimensions(c), b = h === "y", w = b ? "top" : "left", v = b ? "bottom" : "right", N = b ? "clientHeight" : "clientWidth", C = s.reference[p] + s.reference[h] - f[h] - s.floating[p], y = f[h] - s.reference[h], k = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let S = k ? k[N] : 0;
    (!S || !await (a.isElement == null ? void 0 : a.isElement(k))) && (S = i.floating[N] || s.floating[p]);
    const x = C / 2 - y / 2, T = S / 2 - g[p] / 2 - 1, M = en(d[w], T), D = en(d[v], T), A = M, I = S - g[p] - D, L = S / 2 - g[p] / 2 + x, $ = Gs(A, L, I), W = !l.arrow && Qn(r) != null && L !== $ && s.reference[p] / 2 - (L < A ? M : D) - g[p] / 2 < 0, q = W ? L < A ? L - A : L - I : 0;
    return {
      [h]: f[h] + q,
      data: {
        [h]: $,
        centerOffset: L - $ - q,
        ...W && {
          alignmentOffset: q
        }
      },
      reset: W
    };
  }
}), Yv = function(e) {
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
        fallbackAxisSideDirection: p = "none",
        flipAlignment: g = !0,
        ...b
      } = $t(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const w = Bt(r), v = bt(i), N = Bt(i) === i, C = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), y = f || (N || !g ? [yr(i)] : _v(i)), k = p !== "none";
      !f && k && y.push(...Wv(i, g, p, C));
      const S = [i, ...y], x = await xo(t, b), T = [];
      let M = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (u && T.push(x[w]), d) {
        const L = Ov(r, a, C);
        T.push(x[L[0]], x[L[1]]);
      }
      if (M = [...M, {
        placement: r,
        overflows: T
      }], !T.every((L) => L <= 0)) {
        var D, A;
        const L = (((D = s.flip) == null ? void 0 : D.index) || 0) + 1, $ = S[L];
        if ($ && (!(d === "alignment" ? v !== bt($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        M.every((R) => bt(R.placement) === v ? R.overflows[0] > 0 : !0)))
          return {
            data: {
              index: L,
              overflows: M
            },
            reset: {
              placement: $
            }
          };
        let W = (A = M.filter((q) => q.overflows[0] <= 0).sort((q, R) => q.overflows[1] - R.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!W)
          switch (h) {
            case "bestFit": {
              var I;
              const q = (I = M.filter((R) => {
                if (k) {
                  const P = bt(R.placement);
                  return P === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map((R) => [R.placement, R.overflows.filter((P) => P > 0).reduce((P, z) => P + z, 0)]).sort((R, P) => R[1] - P[1])[0]) == null ? void 0 : I[0];
              q && (W = q);
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
function Qa(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ja(e) {
  return Pv.some((t) => e[t] >= 0);
}
const jv = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = $t(e, t);
      switch (o) {
        case "referenceHidden": {
          const s = await xo(t, {
            ...r,
            elementContext: "reference"
          }), a = Qa(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Ja(a)
            }
          };
        }
        case "escaped": {
          const s = await xo(t, {
            ...r,
            altBoundary: !0
          }), a = Qa(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Ja(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Hc = /* @__PURE__ */ new Set(["left", "top"]);
async function Kv(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = Bt(n), i = Qn(n), l = bt(n) === "y", c = Hc.has(a) ? -1 : 1, u = s && l ? -1 : 1, d = $t(t, e);
  let {
    mainAxis: f,
    crossAxis: h,
    alignmentAxis: p
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return i && typeof p == "number" && (h = i === "end" ? p * -1 : p), l ? {
    x: h * u,
    y: f * c
  } : {
    x: f * c,
    y: h * u
  };
}
const Vv = function(e) {
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
      } = t, l = await Kv(t, e);
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
}, Gv = function(e) {
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
      } = $t(e, t), c = {
        x: n,
        y: o
      }, u = await xo(t, l), d = bt(Bt(r)), f = Li(d);
      let h = c[f], p = c[d];
      if (s) {
        const b = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", v = h + u[b], N = h - u[w];
        h = Gs(v, h, N);
      }
      if (a) {
        const b = d === "y" ? "top" : "left", w = d === "y" ? "bottom" : "right", v = p + u[b], N = p - u[w];
        p = Gs(v, p, N);
      }
      const g = i.fn({
        ...t,
        [f]: h,
        [d]: p
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - o,
          enabled: {
            [f]: s,
            [d]: a
          }
        }
      };
    }
  };
}, qv = function(e) {
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
      } = $t(e, t), u = {
        x: n,
        y: o
      }, d = bt(r), f = Li(d);
      let h = u[f], p = u[d];
      const g = $t(i, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const N = f === "y" ? "height" : "width", C = s.reference[f] - s.floating[N] + b.mainAxis, y = s.reference[f] + s.reference[N] - b.mainAxis;
        h < C ? h = C : h > y && (h = y);
      }
      if (c) {
        var w, v;
        const N = f === "y" ? "width" : "height", C = Hc.has(Bt(r)), y = s.reference[d] - s.floating[N] + (C && ((w = a.offset) == null ? void 0 : w[d]) || 0) + (C ? 0 : b.crossAxis), k = s.reference[d] + s.reference[N] + (C ? 0 : ((v = a.offset) == null ? void 0 : v[d]) || 0) - (C ? b.crossAxis : 0);
        p < y ? p = y : p > k && (p = k);
      }
      return {
        [f]: h,
        [d]: p
      };
    }
  };
}, Xv = function(e) {
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
      } = $t(e, t), u = await xo(t, c), d = Bt(r), f = Qn(r), h = bt(r) === "y", {
        width: p,
        height: g
      } = s.floating;
      let b, w;
      d === "top" || d === "bottom" ? (b = d, w = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = d, b = f === "end" ? "top" : "bottom");
      const v = g - u.top - u.bottom, N = p - u.left - u.right, C = en(g - u[b], v), y = en(p - u[w], N), k = !t.middlewareData.shift;
      let S = C, x = y;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = N), (o = t.middlewareData.shift) != null && o.enabled.y && (S = v), k && !f) {
        const M = et(u.left, 0), D = et(u.right, 0), A = et(u.top, 0), I = et(u.bottom, 0);
        h ? x = p - 2 * (M !== 0 || D !== 0 ? M + D : et(u.left, u.right)) : S = g - 2 * (A !== 0 || I !== 0 ? A + I : et(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: x,
        availableHeight: S
      });
      const T = await a.getDimensions(i.floating);
      return p !== T.width || g !== T.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Br() {
  return typeof window < "u";
}
function Jn(e) {
  return Wc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function tt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function yt(e) {
  var t;
  return (t = (Wc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Wc(e) {
  return Br() ? e instanceof Node || e instanceof tt(e).Node : !1;
}
function ct(e) {
  return Br() ? e instanceof Element || e instanceof tt(e).Element : !1;
}
function wt(e) {
  return Br() ? e instanceof HTMLElement || e instanceof tt(e).HTMLElement : !1;
}
function el(e) {
  return !Br() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof tt(e).ShadowRoot;
}
const Zv = /* @__PURE__ */ new Set(["inline", "contents"]);
function Po(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = ut(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !Zv.has(r);
}
const Qv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Jv(e) {
  return Qv.has(Jn(e));
}
const ew = [":popover-open", ":modal"];
function Hr(e) {
  return ew.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const tw = ["transform", "translate", "scale", "rotate", "perspective"], nw = ["transform", "translate", "scale", "rotate", "perspective", "filter"], ow = ["paint", "layout", "strict", "content"];
function $i(e) {
  const t = Bi(), n = ct(e) ? ut(e) : e;
  return tw.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || nw.some((o) => (n.willChange || "").includes(o)) || ow.some((o) => (n.contain || "").includes(o));
}
function rw(e) {
  let t = tn(e);
  for (; wt(t) && !zn(t); ) {
    if ($i(t))
      return t;
    if (Hr(t))
      return null;
    t = tn(t);
  }
  return null;
}
function Bi() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const sw = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function zn(e) {
  return sw.has(Jn(e));
}
function ut(e) {
  return tt(e).getComputedStyle(e);
}
function Wr(e) {
  return ct(e) ? {
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
    el(e) && e.host || // Fallback.
    yt(e)
  );
  return el(t) ? t.host : t;
}
function Fc(e) {
  const t = tn(e);
  return zn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : wt(t) && Po(t) ? t : Fc(t);
}
function Co(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Fc(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = tt(r);
  if (s) {
    const i = Xs(a);
    return t.concat(a, a.visualViewport || [], Po(r) ? r : [], i && n ? Co(i) : []);
  }
  return t.concat(r, Co(r, [], n));
}
function Xs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function zc(e) {
  const t = ut(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = wt(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, i = Nr(n) !== s || Nr(o) !== a;
  return i && (n = s, o = a), {
    width: n,
    height: o,
    $: i
  };
}
function Hi(e) {
  return ct(e) ? e : e.contextElement;
}
function $n(e) {
  const t = Hi(e);
  if (!wt(t))
    return vt(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = zc(t);
  let a = (s ? Nr(n.width) : n.width) / o, i = (s ? Nr(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const iw = /* @__PURE__ */ vt(0);
function Uc(e) {
  const t = tt(e);
  return !Bi() || !t.visualViewport ? iw : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function aw(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== tt(e) ? !1 : t;
}
function hn(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = Hi(e);
  let a = vt(1);
  t && (o ? ct(o) && (a = $n(o)) : a = $n(e));
  const i = aw(s, n, o) ? Uc(s) : vt(0);
  let l = (r.left + i.x) / a.x, c = (r.top + i.y) / a.y, u = r.width / a.x, d = r.height / a.y;
  if (s) {
    const f = tt(s), h = o && ct(o) ? tt(o) : o;
    let p = f, g = Xs(p);
    for (; g && o && h !== p; ) {
      const b = $n(g), w = g.getBoundingClientRect(), v = ut(g), N = w.left + (g.clientLeft + parseFloat(v.paddingLeft)) * b.x, C = w.top + (g.clientTop + parseFloat(v.paddingTop)) * b.y;
      l *= b.x, c *= b.y, u *= b.x, d *= b.y, l += N, c += C, p = tt(g), g = Xs(p);
    }
  }
  return kr({
    width: u,
    height: d,
    x: l,
    y: c
  });
}
function Fr(e, t) {
  const n = Wr(e).scrollLeft;
  return t ? t.left + n : hn(yt(e)).left + n;
}
function Yc(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - Fr(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function lw(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = yt(o), i = t ? Hr(t.floating) : !1;
  if (o === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = vt(1);
  const u = vt(0), d = wt(o);
  if ((d || !d && !s) && ((Jn(o) !== "body" || Po(a)) && (l = Wr(o)), wt(o))) {
    const h = hn(o);
    c = $n(o), u.x = h.x + o.clientLeft, u.y = h.y + o.clientTop;
  }
  const f = a && !d && !s ? Yc(a, l) : vt(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + u.x + f.x,
    y: n.y * c.y - l.scrollTop * c.y + u.y + f.y
  };
}
function cw(e) {
  return Array.from(e.getClientRects());
}
function uw(e) {
  const t = yt(e), n = Wr(e), o = e.ownerDocument.body, r = et(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = et(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + Fr(e);
  const i = -n.scrollTop;
  return ut(o).direction === "rtl" && (a += et(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: i
  };
}
const tl = 25;
function dw(e, t) {
  const n = tt(e), o = yt(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, i = 0, l = 0;
  if (r) {
    s = r.width, a = r.height;
    const u = Bi();
    (!u || u && t === "fixed") && (i = r.offsetLeft, l = r.offsetTop);
  }
  const c = Fr(o);
  if (c <= 0) {
    const u = o.ownerDocument, d = u.body, f = getComputedStyle(d), h = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, p = Math.abs(o.clientWidth - d.clientWidth - h);
    p <= tl && (s -= p);
  } else c <= tl && (s += c);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const mw = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function fw(e, t) {
  const n = hn(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = wt(e) ? $n(e) : vt(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = r * s.x, c = o * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function nl(e, t, n) {
  let o;
  if (t === "viewport")
    o = dw(e, n);
  else if (t === "document")
    o = uw(yt(e));
  else if (ct(t))
    o = fw(t, n);
  else {
    const r = Uc(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return kr(o);
}
function jc(e, t) {
  const n = tn(e);
  return n === t || !ct(n) || zn(n) ? !1 : ut(n).position === "fixed" || jc(n, t);
}
function hw(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Co(e, [], !1).filter((i) => ct(i) && Jn(i) !== "body"), r = null;
  const s = ut(e).position === "fixed";
  let a = s ? tn(e) : e;
  for (; ct(a) && !zn(a); ) {
    const i = ut(a), l = $i(a);
    !l && i.position === "fixed" && (r = null), (s ? !l && !r : !l && i.position === "static" && !!r && mw.has(r.position) || Po(a) && !l && jc(e, a)) ? o = o.filter((u) => u !== a) : r = i, a = tn(a);
  }
  return t.set(e, o), o;
}
function pw(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? Hr(t) ? [] : hw(t, this._c) : [].concat(n), o], i = a[0], l = a.reduce((c, u) => {
    const d = nl(t, u, r);
    return c.top = et(d.top, c.top), c.right = en(d.right, c.right), c.bottom = en(d.bottom, c.bottom), c.left = et(d.left, c.left), c;
  }, nl(t, i, r));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function gw(e) {
  const {
    width: t,
    height: n
  } = zc(e);
  return {
    width: t,
    height: n
  };
}
function bw(e, t, n) {
  const o = wt(t), r = yt(t), s = n === "fixed", a = hn(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = vt(0);
  function c() {
    l.x = Fr(r);
  }
  if (o || !o && !s)
    if ((Jn(t) !== "body" || Po(r)) && (i = Wr(t)), o) {
      const h = hn(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else r && c();
  s && !o && r && c();
  const u = r && !o && !s ? Yc(r, i) : vt(0), d = a.left + i.scrollLeft - l.x - u.x, f = a.top + i.scrollTop - l.y - u.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function xs(e) {
  return ut(e).position === "static";
}
function ol(e, t) {
  if (!wt(e) || ut(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return yt(e) === n && (n = n.ownerDocument.body), n;
}
function Kc(e, t) {
  const n = tt(e);
  if (Hr(e))
    return n;
  if (!wt(e)) {
    let r = tn(e);
    for (; r && !zn(r); ) {
      if (ct(r) && !xs(r))
        return r;
      r = tn(r);
    }
    return n;
  }
  let o = ol(e, t);
  for (; o && Jv(o) && xs(o); )
    o = ol(o, t);
  return o && zn(o) && xs(o) && !$i(o) ? n : o || rw(e) || n;
}
const vw = async function(e) {
  const t = this.getOffsetParent || Kc, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: bw(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function ww(e) {
  return ut(e).direction === "rtl";
}
const Nw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: lw,
  getDocumentElement: yt,
  getClippingRect: pw,
  getOffsetParent: Kc,
  getElementRects: vw,
  getClientRects: cw,
  getDimensions: gw,
  getScale: $n,
  isElement: ct,
  isRTL: ww
};
function Vc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function yw(e, t) {
  let n = null, o;
  const r = yt(e);
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
    const p = or(d), g = or(r.clientWidth - (u + f)), b = or(r.clientHeight - (d + h)), w = or(u), N = {
      rootMargin: -p + "px " + -g + "px " + -b + "px " + -w + "px",
      threshold: et(0, en(1, l)) || 1
    };
    let C = !0;
    function y(k) {
      const S = k[0].intersectionRatio;
      if (S !== l) {
        if (!C)
          return a();
        S ? a(!1, S) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Vc(c, e.getBoundingClientRect()) && a(), C = !1;
    }
    try {
      n = new IntersectionObserver(y, {
        ...N,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(y, N);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function kw(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, c = Hi(e), u = r || s ? [...c ? Co(c) : [], ...Co(t)] : [];
  u.forEach((w) => {
    r && w.addEventListener("scroll", n, {
      passive: !0
    }), s && w.addEventListener("resize", n);
  });
  const d = c && i ? yw(c, n) : null;
  let f = -1, h = null;
  a && (h = new ResizeObserver((w) => {
    let [v] = w;
    v && v.target === c && h && (h.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var N;
      (N = h) == null || N.observe(t);
    })), n();
  }), c && !l && h.observe(c), h.observe(t));
  let p, g = l ? hn(e) : null;
  l && b();
  function b() {
    const w = hn(e);
    g && !Vc(g, w) && n(), g = w, p = requestAnimationFrame(b);
  }
  return n(), () => {
    var w;
    u.forEach((v) => {
      r && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), d?.(), (w = h) == null || w.disconnect(), h = null, l && cancelAnimationFrame(p);
  };
}
const xw = Vv, Cw = Gv, Ew = Yv, Tw = Xv, Mw = jv, rl = Uv, Sw = qv, Dw = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Nw,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return zv(e, t, {
    ...r,
    platform: s
  });
};
var Aw = typeof document < "u", Pw = function() {
}, pr = Aw ? Pr : Pw;
function xr(e, t) {
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
        if (!xr(e[o], t[o]))
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
      if (!(s === "_owner" && e.$$typeof) && !xr(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Gc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function sl(e, t) {
  const n = Gc(e);
  return Math.round(t * n) / n;
}
function Cs(e) {
  const t = E.useRef(e);
  return pr(() => {
    t.current = e;
  }), t;
}
function Rw(e) {
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
  xr(f, o) || h(o);
  const [p, g] = E.useState(null), [b, w] = E.useState(null), v = E.useCallback((R) => {
    R !== k.current && (k.current = R, g(R));
  }, []), N = E.useCallback((R) => {
    R !== S.current && (S.current = R, w(R));
  }, []), C = s || p, y = a || b, k = E.useRef(null), S = E.useRef(null), x = E.useRef(u), T = l != null, M = Cs(l), D = Cs(r), A = Cs(c), I = E.useCallback(() => {
    if (!k.current || !S.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (R.platform = D.current), Dw(k.current, S.current, R).then((P) => {
      const z = {
        ...P,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      L.current && !xr(x.current, z) && (x.current = z, Fl.flushSync(() => {
        d(z);
      }));
    });
  }, [f, t, n, D, A]);
  pr(() => {
    c === !1 && x.current.isPositioned && (x.current.isPositioned = !1, d((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [c]);
  const L = E.useRef(!1);
  pr(() => (L.current = !0, () => {
    L.current = !1;
  }), []), pr(() => {
    if (C && (k.current = C), y && (S.current = y), C && y) {
      if (M.current)
        return M.current(C, y, I);
      I();
    }
  }, [C, y, I, M, T]);
  const $ = E.useMemo(() => ({
    reference: k,
    floating: S,
    setReference: v,
    setFloating: N
  }), [v, N]), W = E.useMemo(() => ({
    reference: C,
    floating: y
  }), [C, y]), q = E.useMemo(() => {
    const R = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return R;
    const P = sl(W.floating, u.x), z = sl(W.floating, u.y);
    return i ? {
      ...R,
      transform: "translate(" + P + "px, " + z + "px)",
      ...Gc(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: P,
      top: z
    };
  }, [n, i, W.floating, u.x, u.y]);
  return E.useMemo(() => ({
    ...u,
    update: I,
    refs: $,
    elements: W,
    floatingStyles: q
  }), [u, I, $, W, q]);
}
const Iw = (e) => {
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
      return o && t(o) ? o.current != null ? rl({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? rl({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, Lw = (e, t) => ({
  ...xw(e),
  options: [e, t]
}), Ow = (e, t) => ({
  ...Cw(e),
  options: [e, t]
}), _w = (e, t) => ({
  ...Sw(e),
  options: [e, t]
}), $w = (e, t) => ({
  ...Ew(e),
  options: [e, t]
}), Bw = (e, t) => ({
  ...Tw(e),
  options: [e, t]
}), Hw = (e, t) => ({
  ...Mw(e),
  options: [e, t]
}), Ww = (e, t) => ({
  ...Iw(e),
  options: [e, t]
});
var Fw = "Arrow", qc = E.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ Y(
    ze.svg,
    {
      ...s,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ Y("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
qc.displayName = Fw;
var zw = qc;
function Uw(e) {
  const [t, n] = E.useState(void 0);
  return Jt(() => {
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
var Wi = "Popper", [Xc, zr] = Zn(Wi), [Yw, Zc] = Xc(Wi), Qc = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = E.useState(null);
  return /* @__PURE__ */ Y(Yw, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
Qc.displayName = Wi;
var Jc = "PopperAnchor", eu = E.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Zc(Jc, n), a = E.useRef(null), i = Ye(t, a), l = E.useRef(null);
    return E.useEffect(() => {
      const c = l.current;
      l.current = o?.current || a.current, c !== l.current && s.onAnchorChange(l.current);
    }), o ? null : /* @__PURE__ */ Y(ze.div, { ...r, ref: i });
  }
);
eu.displayName = Jc;
var Fi = "PopperContent", [jw, Kw] = Xc(Fi), tu = E.forwardRef(
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
      onPlaced: p,
      ...g
    } = e, b = Zc(Fi, n), [w, v] = E.useState(null), N = Ye(t, (j) => v(j)), [C, y] = E.useState(null), k = Uw(C), S = k?.width ?? 0, x = k?.height ?? 0, T = o + (s !== "center" ? "-" + s : ""), M = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, D = Array.isArray(c) ? c : [c], A = D.length > 0, I = {
      padding: M,
      boundary: D.filter(Gw),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: L, floatingStyles: $, placement: W, isPositioned: q, middlewareData: R } = Rw({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: T,
      whileElementsMounted: (...j) => kw(...j, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Lw({ mainAxis: r + x, alignmentAxis: a }),
        l && Ow({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? _w() : void 0,
          ...I
        }),
        l && $w({ ...I }),
        Bw({
          ...I,
          apply: ({ elements: j, rects: ee, availableWidth: ge, availableHeight: be }) => {
            const { width: Pe, height: He } = ee.reference, ot = j.floating.style;
            ot.setProperty("--radix-popper-available-width", `${ge}px`), ot.setProperty("--radix-popper-available-height", `${be}px`), ot.setProperty("--radix-popper-anchor-width", `${Pe}px`), ot.setProperty("--radix-popper-anchor-height", `${He}px`);
          }
        }),
        C && Ww({ element: C, padding: i }),
        qw({ arrowWidth: S, arrowHeight: x }),
        f && Hw({ strategy: "referenceHidden", ...I })
      ]
    }), [P, z] = ru(W), X = _t(p);
    Jt(() => {
      q && X?.();
    }, [q, X]);
    const G = R.arrow?.x, Z = R.arrow?.y, te = R.arrow?.centerOffset !== 0, [_, H] = E.useState();
    return Jt(() => {
      w && H(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ Y(
      "div",
      {
        ref: L.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: q ? $.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: _,
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
        children: /* @__PURE__ */ Y(
          jw,
          {
            scope: n,
            placedSide: P,
            onArrowChange: y,
            arrowX: G,
            arrowY: Z,
            shouldHideArrow: te,
            children: /* @__PURE__ */ Y(
              ze.div,
              {
                "data-side": P,
                "data-align": z,
                ...g,
                ref: N,
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
tu.displayName = Fi;
var nu = "PopperArrow", Vw = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ou = E.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Kw(nu, o), a = Vw[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ Y(
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
        children: /* @__PURE__ */ Y(
          zw,
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
ou.displayName = nu;
function Gw(e) {
  return e !== null;
}
var qw = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [c, u] = ru(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (r.arrow?.x ?? 0) + i / 2, h = (r.arrow?.y ?? 0) + l / 2;
    let p = "", g = "";
    return c === "bottom" ? (p = a ? d : `${f}px`, g = `${-l}px`) : c === "top" ? (p = a ? d : `${f}px`, g = `${o.floating.height + l}px`) : c === "right" ? (p = `${-l}px`, g = a ? d : `${h}px`) : c === "left" && (p = `${o.floating.width + l}px`, g = a ? d : `${h}px`), { data: { x: p, y: g } };
  }
});
function ru(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var su = Qc, iu = eu, au = tu, lu = ou, Xw = "Portal", zi = E.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = E.useState(!1);
  Jt(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? sf.createPortal(/* @__PURE__ */ Y(ze.div, { ...o, ref: t }), a) : null;
});
zi.displayName = Xw;
function Zw(e, t) {
  return E.useReducer((n, o) => t[n][o] ?? n, e);
}
var pn = (e) => {
  const { present: t, children: n } = e, o = Qw(t), r = typeof n == "function" ? n({ present: o.isPresent }) : E.Children.only(n), s = Ye(o.ref, Jw(r));
  return typeof n == "function" || o.isPresent ? E.cloneElement(r, { ref: s }) : null;
};
pn.displayName = "Presence";
function Qw(e) {
  const [t, n] = E.useState(), o = E.useRef(null), r = E.useRef(e), s = E.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = Zw(a, {
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
    const c = rr(o.current);
    s.current = i === "mounted" ? c : "none";
  }, [i]), Jt(() => {
    const c = o.current, u = r.current;
    if (u !== e) {
      const f = s.current, h = rr(c);
      e ? l("MOUNT") : h === "none" || c?.display === "none" ? l("UNMOUNT") : l(u && f !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), Jt(() => {
    if (t) {
      let c;
      const u = t.ownerDocument.defaultView ?? window, d = (h) => {
        const g = rr(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, f = (h) => {
        h.target === t && (s.current = rr(o.current));
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
function rr(e) {
  return e?.animationName || "none";
}
function Jw(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Es = "rovingFocusGroup.onEntryFocus", eN = { bubbles: !1, cancelable: !0 }, Ro = "RovingFocusGroup", [Zs, cu, tN] = Rc(Ro), [nN, uu] = Zn(
  Ro,
  [tN]
), [oN, rN] = nN(Ro), du = E.forwardRef(
  (e, t) => /* @__PURE__ */ Y(Zs.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ Y(Zs.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ Y(sN, { ...e, ref: t }) }) })
);
du.displayName = Ro;
var sN = E.forwardRef((e, t) => {
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
  } = e, f = E.useRef(null), h = Ye(t, f), p = Ic(s), [g, b] = Ri({
    prop: a,
    defaultProp: i ?? null,
    onChange: l,
    caller: Ro
  }), [w, v] = E.useState(!1), N = _t(c), C = cu(n), y = E.useRef(!1), [k, S] = E.useState(0);
  return E.useEffect(() => {
    const x = f.current;
    if (x)
      return x.addEventListener(Es, N), () => x.removeEventListener(Es, N);
  }, [N]), /* @__PURE__ */ Y(
    oN,
    {
      scope: n,
      orientation: o,
      dir: p,
      loop: r,
      currentTabStopId: g,
      onItemFocus: E.useCallback(
        (x) => b(x),
        [b]
      ),
      onItemShiftTab: E.useCallback(() => v(!0), []),
      onFocusableItemAdd: E.useCallback(
        () => S((x) => x + 1),
        []
      ),
      onFocusableItemRemove: E.useCallback(
        () => S((x) => x - 1),
        []
      ),
      children: /* @__PURE__ */ Y(
        ze.div,
        {
          tabIndex: w || k === 0 ? -1 : 0,
          "data-orientation": o,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: fe(e.onMouseDown, () => {
            y.current = !0;
          }),
          onFocus: fe(e.onFocus, (x) => {
            const T = !y.current;
            if (x.target === x.currentTarget && T && !w) {
              const M = new CustomEvent(Es, eN);
              if (x.currentTarget.dispatchEvent(M), !M.defaultPrevented) {
                const D = C().filter((W) => W.focusable), A = D.find((W) => W.active), I = D.find((W) => W.id === g), $ = [A, I, ...D].filter(
                  Boolean
                ).map((W) => W.ref.current);
                hu($, u);
              }
            }
            y.current = !1;
          }),
          onBlur: fe(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), mu = "RovingFocusGroupItem", fu = E.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, l = wr(), c = s || l, u = rN(mu, n), d = u.currentTabStopId === c, f = cu(n), { onFocusableItemAdd: h, onFocusableItemRemove: p, currentTabStopId: g } = u;
    return E.useEffect(() => {
      if (o)
        return h(), () => p();
    }, [o, h, p]), /* @__PURE__ */ Y(
      Zs.ItemSlot,
      {
        scope: n,
        id: c,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ Y(
          ze.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: fe(e.onMouseDown, (b) => {
              o ? u.onItemFocus(c) : b.preventDefault();
            }),
            onFocus: fe(e.onFocus, () => u.onItemFocus(c)),
            onKeyDown: fe(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const w = lN(b, u.orientation, u.dir);
              if (w !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let N = f().filter((C) => C.focusable).map((C) => C.ref.current);
                if (w === "last") N.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && N.reverse();
                  const C = N.indexOf(b.currentTarget);
                  N = u.loop ? cN(N, C + 1) : N.slice(C + 1);
                }
                setTimeout(() => hu(N));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: g != null }) : a
          }
        )
      }
    );
  }
);
fu.displayName = mu;
var iN = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function aN(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function lN(e, t, n) {
  const o = aN(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return iN[o];
}
function hu(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function cN(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var uN = du, dN = fu, mN = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, En = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), ir = {}, Ts = 0, pu = function(e) {
  return e && (e.host || pu(e.parentNode));
}, fN = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = pu(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, hN = function(e, t, n, o) {
  var r = fN(t, Array.isArray(e) ? e : [e]);
  ir[n] || (ir[n] = /* @__PURE__ */ new WeakMap());
  var s = ir[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(r), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  r.forEach(c);
  var u = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var h = f.getAttribute(o), p = h !== null && h !== "false", g = (En.get(f) || 0) + 1, b = (s.get(f) || 0) + 1;
          En.set(f, g), s.set(f, b), a.push(f), g === 1 && p && sr.set(f, !0), b === 1 && f.setAttribute(n, "true"), p || f.setAttribute(o, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", f, w);
        }
    });
  };
  return u(t), i.clear(), Ts++, function() {
    a.forEach(function(d) {
      var f = En.get(d) - 1, h = s.get(d) - 1;
      En.set(d, f), s.set(d, h), f || (sr.has(d) || d.removeAttribute(o), sr.delete(d)), h || d.removeAttribute(n);
    }), Ts--, Ts || (En = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), ir = {});
  };
}, pN = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = mN(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), hN(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, pt = function() {
  return pt = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, pt.apply(this, arguments);
};
function gu(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function gN(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, s; o < r; o++)
    (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var gr = "right-scroll-bar-position", br = "width-before-scroll-bar", bN = "with-scroll-bars-hidden", vN = "--removed-body-scroll-bar-size";
function Ms(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function wN(e, t) {
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
        set current(o) {
          var r = n.value;
          r !== o && (n.value = o, n.callback(o, r));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var NN = typeof window < "u" ? E.useLayoutEffect : E.useEffect, il = /* @__PURE__ */ new WeakMap();
function yN(e, t) {
  var n = wN(null, function(o) {
    return e.forEach(function(r) {
      return Ms(r, o);
    });
  });
  return NN(function() {
    var o = il.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), a = n.current;
      r.forEach(function(i) {
        s.has(i) || Ms(i, null);
      }), s.forEach(function(i) {
        r.has(i) || Ms(i, a);
      });
    }
    il.set(n, e);
  }, [e]), n;
}
function kN(e) {
  return e;
}
function xN(e, t) {
  t === void 0 && (t = kN);
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
function CN(e) {
  e === void 0 && (e = {});
  var t = xN(null);
  return t.options = pt({ async: !0, ssr: !1 }, e), t;
}
var bu = function(e) {
  var t = e.sideCar, n = gu(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return E.createElement(o, pt({}, n));
};
bu.isSideCarExport = !0;
function EN(e, t) {
  return e.useMedium(t), bu;
}
var vu = CN(), Ss = function() {
}, Ur = E.forwardRef(function(e, t) {
  var n = E.useRef(null), o = E.useState({
    onScrollCapture: Ss,
    onWheelCapture: Ss,
    onTouchMoveCapture: Ss
  }), r = o[0], s = o[1], a = e.forwardProps, i = e.children, l = e.className, c = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, h = e.noRelative, p = e.noIsolation, g = e.inert, b = e.allowPinchZoom, w = e.as, v = w === void 0 ? "div" : w, N = e.gapMode, C = gu(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), y = f, k = yN([n, t]), S = pt(pt({}, C), r);
  return E.createElement(
    E.Fragment,
    null,
    u && E.createElement(y, { sideCar: vu, removeScrollBar: c, shards: d, noRelative: h, noIsolation: p, inert: g, setCallbacks: s, allowPinchZoom: !!b, lockRef: n, gapMode: N }),
    a ? E.cloneElement(E.Children.only(i), pt(pt({}, S), { ref: k })) : E.createElement(v, pt({}, S, { className: l, ref: k }), i)
  );
});
Ur.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Ur.classNames = {
  fullWidth: br,
  zeroRight: gr
};
var TN = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function MN() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = TN();
  return t && e.setAttribute("nonce", t), e;
}
function SN(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function DN(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var AN = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = MN()) && (SN(t, n), DN(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, PN = function() {
  var e = AN();
  return function(t, n) {
    E.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, wu = function() {
  var e = PN(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, RN = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ds = function(e) {
  return parseInt(e || "", 10) || 0;
}, IN = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ds(n), Ds(o), Ds(r)];
}, LN = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return RN;
  var t = IN(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, ON = wu(), Bn = "data-scroll-locked", _N = function(e, t, n, o) {
  var r = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(bN, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(i, "px ").concat(o, `;
  }
  body[`).concat(Bn, `] {
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
  
  .`).concat(gr, ` {
    right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(br, ` {
    margin-right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(gr, " .").concat(gr, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(br, " .").concat(br, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(Bn, `] {
    `).concat(vN, ": ").concat(i, `px;
  }
`);
}, al = function() {
  var e = parseInt(document.body.getAttribute(Bn) || "0", 10);
  return isFinite(e) ? e : 0;
}, $N = function() {
  E.useEffect(function() {
    return document.body.setAttribute(Bn, (al() + 1).toString()), function() {
      var e = al() - 1;
      e <= 0 ? document.body.removeAttribute(Bn) : document.body.setAttribute(Bn, e.toString());
    };
  }, []);
}, BN = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  $N();
  var s = E.useMemo(function() {
    return LN(r);
  }, [r]);
  return E.createElement(ON, { styles: _N(s, !t, r, n ? "" : "!important") });
}, Qs = !1;
if (typeof window < "u")
  try {
    var ar = Object.defineProperty({}, "passive", {
      get: function() {
        return Qs = !0, !0;
      }
    });
    window.addEventListener("test", ar, ar), window.removeEventListener("test", ar, ar);
  } catch {
    Qs = !1;
  }
var Tn = Qs ? { passive: !1 } : !1, HN = function(e) {
  return e.tagName === "TEXTAREA";
}, Nu = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !HN(e) && n[t] === "visible")
  );
}, WN = function(e) {
  return Nu(e, "overflowY");
}, FN = function(e) {
  return Nu(e, "overflowX");
}, ll = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = yu(e, o);
    if (r) {
      var s = ku(e, o), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, zN = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, UN = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, yu = function(e, t) {
  return e === "v" ? WN(t) : FN(t);
}, ku = function(e, t) {
  return e === "v" ? zN(t) : UN(t);
}, YN = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, jN = function(e, t, n, o, r) {
  var s = YN(e, window.getComputedStyle(t).direction), a = s * o, i = n.target, l = t.contains(i), c = !1, u = a > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var h = ku(e, i), p = h[0], g = h[1], b = h[2], w = g - b - s * p;
    (p || w) && yu(e, i) && (d += w, f += p);
    var v = i.parentNode;
    i = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (c = !0), c;
}, lr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, cl = function(e) {
  return [e.deltaX, e.deltaY];
}, ul = function(e) {
  return e && "current" in e ? e.current : e;
}, KN = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, VN = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, GN = 0, Mn = [];
function qN(e) {
  var t = E.useRef([]), n = E.useRef([0, 0]), o = E.useRef(), r = E.useState(GN++)[0], s = E.useState(wu)[0], a = E.useRef(e);
  E.useEffect(function() {
    a.current = e;
  }, [e]), E.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var g = gN([e.lockRef.current], (e.shards || []).map(ul), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = E.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var w = lr(g), v = n.current, N = "deltaX" in g ? g.deltaX : v[0] - w[0], C = "deltaY" in g ? g.deltaY : v[1] - w[1], y, k = g.target, S = Math.abs(N) > Math.abs(C) ? "h" : "v";
    if ("touches" in g && S === "h" && k.type === "range")
      return !1;
    var x = ll(S, k);
    if (!x)
      return !0;
    if (x ? y = S : (y = S === "v" ? "h" : "v", x = ll(S, k)), !x)
      return !1;
    if (!o.current && "changedTouches" in g && (N || C) && (o.current = y), !y)
      return !0;
    var T = o.current || y;
    return jN(T, b, g, T === "h" ? N : C);
  }, []), l = E.useCallback(function(g) {
    var b = g;
    if (!(!Mn.length || Mn[Mn.length - 1] !== s)) {
      var w = "deltaY" in b ? cl(b) : lr(b), v = t.current.filter(function(y) {
        return y.name === b.type && (y.target === b.target || b.target === y.shadowParent) && KN(y.delta, w);
      })[0];
      if (v && v.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!v) {
        var N = (a.current.shards || []).map(ul).filter(Boolean).filter(function(y) {
          return y.contains(b.target);
        }), C = N.length > 0 ? i(b, N[0]) : !a.current.noIsolation;
        C && b.cancelable && b.preventDefault();
      }
    }
  }, []), c = E.useCallback(function(g, b, w, v) {
    var N = { name: g, delta: b, target: w, should: v, shadowParent: XN(w) };
    t.current.push(N), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== N;
      });
    }, 1);
  }, []), u = E.useCallback(function(g) {
    n.current = lr(g), o.current = void 0;
  }, []), d = E.useCallback(function(g) {
    c(g.type, cl(g), g.target, i(g, e.lockRef.current));
  }, []), f = E.useCallback(function(g) {
    c(g.type, lr(g), g.target, i(g, e.lockRef.current));
  }, []);
  E.useEffect(function() {
    return Mn.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, Tn), document.addEventListener("touchmove", l, Tn), document.addEventListener("touchstart", u, Tn), function() {
      Mn = Mn.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", l, Tn), document.removeEventListener("touchmove", l, Tn), document.removeEventListener("touchstart", u, Tn);
    };
  }, []);
  var h = e.removeScrollBar, p = e.inert;
  return E.createElement(
    E.Fragment,
    null,
    p ? E.createElement(s, { styles: VN(r) }) : null,
    h ? E.createElement(BN, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function XN(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const ZN = EN(vu, qN);
var xu = E.forwardRef(function(e, t) {
  return E.createElement(Ur, pt({}, e, { ref: t, sideCar: ZN }));
});
xu.classNames = Ur.classNames;
var Js = ["Enter", " "], QN = ["ArrowDown", "PageUp", "Home"], Cu = ["ArrowUp", "PageDown", "End"], JN = [...QN, ...Cu], e0 = {
  ltr: [...Js, "ArrowRight"],
  rtl: [...Js, "ArrowLeft"]
}, t0 = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Io = "Menu", [Eo, n0, o0] = Rc(Io), [gn, Eu] = Zn(Io, [
  o0,
  zr,
  uu
]), Yr = zr(), Tu = uu(), [r0, bn] = gn(Io), [s0, Lo] = gn(Io), Mu = (e) => {
  const { __scopeMenu: t, open: n = !1, children: o, dir: r, onOpenChange: s, modal: a = !0 } = e, i = Yr(t), [l, c] = E.useState(null), u = E.useRef(!1), d = _t(s), f = Ic(r);
  return E.useEffect(() => {
    const h = () => {
      u.current = !0, document.addEventListener("pointerdown", p, { capture: !0, once: !0 }), document.addEventListener("pointermove", p, { capture: !0, once: !0 });
    }, p = () => u.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", p, { capture: !0 }), document.removeEventListener("pointermove", p, { capture: !0 });
    };
  }, []), /* @__PURE__ */ Y(su, { ...i, children: /* @__PURE__ */ Y(
    r0,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: c,
      children: /* @__PURE__ */ Y(
        s0,
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
Mu.displayName = Io;
var i0 = "MenuAnchor", Ui = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = Yr(n);
    return /* @__PURE__ */ Y(iu, { ...r, ...o, ref: t });
  }
);
Ui.displayName = i0;
var Yi = "MenuPortal", [a0, Su] = gn(Yi, {
  forceMount: void 0
}), Du = (e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, s = bn(Yi, t);
  return /* @__PURE__ */ Y(a0, { scope: t, forceMount: n, children: /* @__PURE__ */ Y(pn, { present: n || s.open, children: /* @__PURE__ */ Y(zi, { asChild: !0, container: r, children: o }) }) });
};
Du.displayName = Yi;
var it = "MenuContent", [l0, ji] = gn(it), Au = E.forwardRef(
  (e, t) => {
    const n = Su(it, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = bn(it, e.__scopeMenu), a = Lo(it, e.__scopeMenu);
    return /* @__PURE__ */ Y(Eo.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ Y(pn, { present: o || s.open, children: /* @__PURE__ */ Y(Eo.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ Y(c0, { ...r, ref: t }) : /* @__PURE__ */ Y(u0, { ...r, ref: t }) }) }) });
  }
), c0 = E.forwardRef(
  (e, t) => {
    const n = bn(it, e.__scopeMenu), o = E.useRef(null), r = Ye(t, o);
    return E.useEffect(() => {
      const s = o.current;
      if (s) return pN(s);
    }, []), /* @__PURE__ */ Y(
      Ki,
      {
        ...e,
        ref: r,
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
), u0 = E.forwardRef((e, t) => {
  const n = bn(it, e.__scopeMenu);
  return /* @__PURE__ */ Y(
    Ki,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), d0 = /* @__PURE__ */ ko("MenuContent.ScrollLock"), Ki = E.forwardRef(
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
      disableOutsideScroll: p,
      ...g
    } = e, b = bn(it, n), w = Lo(it, n), v = Yr(n), N = Tu(n), C = n0(n), [y, k] = E.useState(null), S = E.useRef(null), x = Ye(t, S, b.onContentChange), T = E.useRef(0), M = E.useRef(""), D = E.useRef(0), A = E.useRef(null), I = E.useRef("right"), L = E.useRef(0), $ = p ? xu : E.Fragment, W = p ? { as: d0, allowPinchZoom: !0 } : void 0, q = (P) => {
      const z = M.current + P, X = C().filter((j) => !j.disabled), G = document.activeElement, Z = X.find((j) => j.ref.current === G)?.textValue, te = X.map((j) => j.textValue), _ = x0(te, z, Z), H = X.find((j) => j.textValue === _)?.ref.current;
      (function j(ee) {
        M.current = ee, window.clearTimeout(T.current), ee !== "" && (T.current = window.setTimeout(() => j(""), 1e3));
      })(z), H && setTimeout(() => H.focus());
    };
    E.useEffect(() => () => window.clearTimeout(T.current), []), yv();
    const R = E.useCallback((P) => I.current === A.current?.side && E0(P, A.current?.area), []);
    return /* @__PURE__ */ Y(
      l0,
      {
        scope: n,
        searchRef: M,
        onItemEnter: E.useCallback(
          (P) => {
            R(P) && P.preventDefault();
          },
          [R]
        ),
        onItemLeave: E.useCallback(
          (P) => {
            R(P) || (S.current?.focus(), k(null));
          },
          [R]
        ),
        onTriggerLeave: E.useCallback(
          (P) => {
            R(P) && P.preventDefault();
          },
          [R]
        ),
        pointerGraceTimerRef: D,
        onPointerGraceIntentChange: E.useCallback((P) => {
          A.current = P;
        }, []),
        children: /* @__PURE__ */ Y($, { ...W, children: /* @__PURE__ */ Y(
          _c,
          {
            asChild: !0,
            trapped: r,
            onMountAutoFocus: fe(s, (P) => {
              P.preventDefault(), S.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ Y(
              Ii,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: c,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: h,
                children: /* @__PURE__ */ Y(
                  uN,
                  {
                    asChild: !0,
                    ...N,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: y,
                    onCurrentTabStopIdChange: k,
                    onEntryFocus: fe(l, (P) => {
                      w.isUsingKeyboardRef.current || P.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ Y(
                      au,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Ku(b.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...v,
                        ...g,
                        ref: x,
                        style: { outline: "none", ...g.style },
                        onKeyDown: fe(g.onKeyDown, (P) => {
                          const X = P.target.closest("[data-radix-menu-content]") === P.currentTarget, G = P.ctrlKey || P.altKey || P.metaKey, Z = P.key.length === 1;
                          X && (P.key === "Tab" && P.preventDefault(), !G && Z && q(P.key));
                          const te = S.current;
                          if (P.target !== te || !JN.includes(P.key)) return;
                          P.preventDefault();
                          const H = C().filter((j) => !j.disabled).map((j) => j.ref.current);
                          Cu.includes(P.key) && H.reverse(), y0(H);
                        }),
                        onBlur: fe(e.onBlur, (P) => {
                          P.currentTarget.contains(P.target) || (window.clearTimeout(T.current), M.current = "");
                        }),
                        onPointerMove: fe(
                          e.onPointerMove,
                          To((P) => {
                            const z = P.target, X = L.current !== P.clientX;
                            if (P.currentTarget.contains(z) && X) {
                              const G = P.clientX > L.current ? "right" : "left";
                              I.current = G, L.current = P.clientX;
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
Au.displayName = it;
var m0 = "MenuGroup", Vi = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ Y(ze.div, { role: "group", ...o, ref: t });
  }
);
Vi.displayName = m0;
var f0 = "MenuLabel", Pu = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ Y(ze.div, { ...o, ref: t });
  }
);
Pu.displayName = f0;
var Cr = "MenuItem", dl = "menu.itemSelect", jr = E.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e, s = E.useRef(null), a = Lo(Cr, e.__scopeMenu), i = ji(Cr, e.__scopeMenu), l = Ye(t, s), c = E.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(dl, { bubbles: !0, cancelable: !0 });
        d.addEventListener(dl, (h) => o?.(h), { once: !0 }), Pc(d, f), f.defaultPrevented ? c.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ Y(
      Ru,
      {
        ...r,
        ref: l,
        disabled: n,
        onClick: fe(e.onClick, u),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), c.current = !0;
        },
        onPointerUp: fe(e.onPointerUp, (d) => {
          c.current || d.currentTarget?.click();
        }),
        onKeyDown: fe(e.onKeyDown, (d) => {
          const f = i.searchRef.current !== "";
          n || f && d.key === " " || Js.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
jr.displayName = Cr;
var Ru = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...s } = e, a = ji(Cr, n), i = Tu(n), l = E.useRef(null), c = Ye(t, l), [u, d] = E.useState(!1), [f, h] = E.useState("");
    return E.useEffect(() => {
      const p = l.current;
      p && h((p.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ Y(
      Eo.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: r ?? f,
        children: /* @__PURE__ */ Y(dN, { asChild: !0, ...i, focusable: !o, children: /* @__PURE__ */ Y(
          ze.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...s,
            ref: c,
            onPointerMove: fe(
              e.onPointerMove,
              To((p) => {
                o ? a.onItemLeave(p) : (a.onItemEnter(p), p.defaultPrevented || p.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: fe(
              e.onPointerLeave,
              To((p) => a.onItemLeave(p))
            ),
            onFocus: fe(e.onFocus, () => d(!0)),
            onBlur: fe(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), h0 = "MenuCheckboxItem", Iu = E.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return /* @__PURE__ */ Y(Bu, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ Y(
      jr,
      {
        role: "menuitemcheckbox",
        "aria-checked": Er(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": qi(n),
        onSelect: fe(
          r.onSelect,
          () => o?.(Er(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Iu.displayName = h0;
var Lu = "MenuRadioGroup", [p0, g0] = gn(
  Lu,
  { value: void 0, onValueChange: () => {
  } }
), Ou = E.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: o, ...r } = e, s = _t(o);
    return /* @__PURE__ */ Y(p0, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ Y(Vi, { ...r, ref: t }) });
  }
);
Ou.displayName = Lu;
var _u = "MenuRadioItem", $u = E.forwardRef(
  (e, t) => {
    const { value: n, ...o } = e, r = g0(_u, e.__scopeMenu), s = n === r.value;
    return /* @__PURE__ */ Y(Bu, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ Y(
      jr,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...o,
        ref: t,
        "data-state": qi(s),
        onSelect: fe(
          o.onSelect,
          () => r.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
$u.displayName = _u;
var Gi = "MenuItemIndicator", [Bu, b0] = gn(
  Gi,
  { checked: !1 }
), Hu = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e, s = b0(Gi, n);
    return /* @__PURE__ */ Y(
      pn,
      {
        present: o || Er(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ Y(
          ze.span,
          {
            ...r,
            ref: t,
            "data-state": qi(s.checked)
          }
        )
      }
    );
  }
);
Hu.displayName = Gi;
var v0 = "MenuSeparator", Wu = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ Y(
      ze.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: t
      }
    );
  }
);
Wu.displayName = v0;
var w0 = "MenuArrow", Fu = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = Yr(n);
    return /* @__PURE__ */ Y(lu, { ...r, ...o, ref: t });
  }
);
Fu.displayName = w0;
var N0 = "MenuSub", [u1, zu] = gn(N0), po = "MenuSubTrigger", Uu = E.forwardRef(
  (e, t) => {
    const n = bn(po, e.__scopeMenu), o = Lo(po, e.__scopeMenu), r = zu(po, e.__scopeMenu), s = ji(po, e.__scopeMenu), a = E.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, c = { __scopeMenu: e.__scopeMenu }, u = E.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return E.useEffect(() => u, [u]), E.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [i, l]), /* @__PURE__ */ Y(Ui, { asChild: !0, ...c, children: /* @__PURE__ */ Y(
      Ru,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": r.contentId,
        "data-state": Ku(n.open),
        ...e,
        ref: _r(t, r.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: fe(
          e.onPointerMove,
          To((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (s.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: fe(
          e.onPointerLeave,
          To((d) => {
            u();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const h = n.content?.dataset.side, p = h === "right", g = p ? -5 : 5, b = f[p ? "left" : "right"], w = f[p ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + g, y: d.clientY },
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
        onKeyDown: fe(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && d.key === " " || e0[o.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Uu.displayName = po;
var Yu = "MenuSubContent", ju = E.forwardRef(
  (e, t) => {
    const n = Su(it, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = bn(it, e.__scopeMenu), a = Lo(it, e.__scopeMenu), i = zu(Yu, e.__scopeMenu), l = E.useRef(null), c = Ye(t, l);
    return /* @__PURE__ */ Y(Eo.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ Y(pn, { present: o || s.open, children: /* @__PURE__ */ Y(Eo.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ Y(
      Ki,
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
        onFocusOutside: fe(e.onFocusOutside, (u) => {
          u.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: fe(e.onEscapeKeyDown, (u) => {
          a.onClose(), u.preventDefault();
        }),
        onKeyDown: fe(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = t0[a.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), i.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
ju.displayName = Yu;
function Ku(e) {
  return e ? "open" : "closed";
}
function Er(e) {
  return e === "indeterminate";
}
function qi(e) {
  return Er(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function y0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function k0(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function x0(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = k0(e, Math.max(s, 0));
  r.length === 1 && (a = a.filter((c) => c !== n));
  const l = a.find(
    (c) => c.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function C0(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], c = i.x, u = i.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function E0(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return C0(n, t);
}
function To(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var T0 = Mu, M0 = Ui, S0 = Du, D0 = Au, A0 = Vi, P0 = Pu, R0 = jr, I0 = Iu, L0 = Ou, O0 = $u, _0 = Hu, $0 = Wu, B0 = Fu, H0 = Uu, W0 = ju, Kr = "DropdownMenu", [F0] = Zn(
  Kr,
  [Eu]
), Ge = Eu(), [z0, Vu] = F0(Kr), Gu = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: o,
    open: r,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, l = Ge(t), c = E.useRef(null), [u, d] = Ri({
    prop: r,
    defaultProp: s ?? !1,
    onChange: a,
    caller: Kr
  });
  return /* @__PURE__ */ Y(
    z0,
    {
      scope: t,
      triggerId: wr(),
      triggerRef: c,
      contentId: wr(),
      open: u,
      onOpenChange: d,
      onOpenToggle: E.useCallback(() => d((f) => !f), [d]),
      modal: i,
      children: /* @__PURE__ */ Y(T0, { ...l, open: u, onOpenChange: d, dir: o, modal: i, children: n })
    }
  );
};
Gu.displayName = Kr;
var qu = "DropdownMenuTrigger", Xu = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e, s = Vu(qu, n), a = Ge(n);
    return /* @__PURE__ */ Y(M0, { asChild: !0, ...a, children: /* @__PURE__ */ Y(
      ze.button,
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
        ref: _r(t, s.triggerRef),
        onPointerDown: fe(e.onPointerDown, (i) => {
          !o && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: fe(e.onKeyDown, (i) => {
          o || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Xu.displayName = qu;
var U0 = "DropdownMenuPortal", Zu = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Ge(t);
  return /* @__PURE__ */ Y(S0, { ...o, ...n });
};
Zu.displayName = U0;
var Qu = "DropdownMenuContent", Ju = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Vu(Qu, n), s = Ge(n), a = E.useRef(!1);
    return /* @__PURE__ */ Y(
      D0,
      {
        id: r.contentId,
        "aria-labelledby": r.triggerId,
        ...s,
        ...o,
        ref: t,
        onCloseAutoFocus: fe(e.onCloseAutoFocus, (i) => {
          a.current || r.triggerRef.current?.focus(), a.current = !1, i.preventDefault();
        }),
        onInteractOutside: fe(e.onInteractOutside, (i) => {
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
Ju.displayName = Qu;
var Y0 = "DropdownMenuGroup", j0 = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
    return /* @__PURE__ */ Y(A0, { ...r, ...o, ref: t });
  }
);
j0.displayName = Y0;
var K0 = "DropdownMenuLabel", V0 = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
    return /* @__PURE__ */ Y(P0, { ...r, ...o, ref: t });
  }
);
V0.displayName = K0;
var G0 = "DropdownMenuItem", ed = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
    return /* @__PURE__ */ Y(R0, { ...r, ...o, ref: t });
  }
);
ed.displayName = G0;
var q0 = "DropdownMenuCheckboxItem", X0 = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
  return /* @__PURE__ */ Y(I0, { ...r, ...o, ref: t });
});
X0.displayName = q0;
var Z0 = "DropdownMenuRadioGroup", Q0 = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
  return /* @__PURE__ */ Y(L0, { ...r, ...o, ref: t });
});
Q0.displayName = Z0;
var J0 = "DropdownMenuRadioItem", ey = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
  return /* @__PURE__ */ Y(O0, { ...r, ...o, ref: t });
});
ey.displayName = J0;
var ty = "DropdownMenuItemIndicator", ny = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
  return /* @__PURE__ */ Y(_0, { ...r, ...o, ref: t });
});
ny.displayName = ty;
var oy = "DropdownMenuSeparator", td = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
  return /* @__PURE__ */ Y($0, { ...r, ...o, ref: t });
});
td.displayName = oy;
var ry = "DropdownMenuArrow", sy = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
    return /* @__PURE__ */ Y(B0, { ...r, ...o, ref: t });
  }
);
sy.displayName = ry;
var iy = "DropdownMenuSubTrigger", ay = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
  return /* @__PURE__ */ Y(H0, { ...r, ...o, ref: t });
});
ay.displayName = iy;
var ly = "DropdownMenuSubContent", cy = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Ge(n);
  return /* @__PURE__ */ Y(
    W0,
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
cy.displayName = ly;
var uy = Gu, dy = Xu, my = Zu, fy = Ju, hy = ed, py = td;
function As({
  ...e
}) {
  return /* @__PURE__ */ m(uy, { "data-slot": "dropdown-menu", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function Ps({
  ...e
}) {
  return /* @__PURE__ */ m(
    dy,
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
function Rs({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(my, { children: /* @__PURE__ */ m(
    fy,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: de(
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
function Ie({
  className: e,
  inset: t,
  variant: n = "default",
  ...o
}) {
  return /* @__PURE__ */ m(
    hy,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: de(
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
function Is({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    py,
    {
      "data-slot": "dropdown-menu-separator",
      className: de("bg-border -mx-1 my-1 h-px", e),
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
var gy = Object.freeze({
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
}), by = "VisuallyHidden", nd = E.forwardRef(
  (e, t) => /* @__PURE__ */ Y(
    ze.span,
    {
      ...e,
      ref: t,
      style: { ...gy, ...e.style }
    }
  )
);
nd.displayName = by;
var vy = nd, [Vr] = Zn("Tooltip", [
  zr
]), Gr = zr(), od = "TooltipProvider", wy = 700, ei = "tooltip.open", [Ny, Xi] = Vr(od), rd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = wy,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: s
  } = e, a = E.useRef(!0), i = E.useRef(!1), l = E.useRef(0);
  return E.useEffect(() => {
    const c = l.current;
    return () => window.clearTimeout(c);
  }, []), /* @__PURE__ */ Y(
    Ny,
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
rd.displayName = od;
var Mo = "Tooltip", [yy, Oo] = Vr(Mo), sd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, l = Xi(Mo, e.__scopeTooltip), c = Gr(t), [u, d] = E.useState(null), f = wr(), h = E.useRef(0), p = a ?? l.disableHoverableContent, g = i ?? l.delayDuration, b = E.useRef(!1), [w, v] = Ri({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (S) => {
      S ? (l.onOpen(), document.dispatchEvent(new CustomEvent(ei))) : l.onClose(), s?.(S);
    },
    caller: Mo
  }), N = E.useMemo(() => w ? b.current ? "delayed-open" : "instant-open" : "closed", [w]), C = E.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b.current = !1, v(!0);
  }, [v]), y = E.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, v(!1);
  }, [v]), k = E.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      b.current = !0, v(!0), h.current = 0;
    }, g);
  }, [g, v]);
  return E.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ Y(su, { ...c, children: /* @__PURE__ */ Y(
    yy,
    {
      scope: t,
      contentId: f,
      open: w,
      stateAttribute: N,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: E.useCallback(() => {
        l.isOpenDelayedRef.current ? k() : C();
      }, [l.isOpenDelayedRef, k, C]),
      onTriggerLeave: E.useCallback(() => {
        p ? y() : (window.clearTimeout(h.current), h.current = 0);
      }, [y, p]),
      onOpen: C,
      onClose: y,
      disableHoverableContent: p,
      children: n
    }
  ) });
};
sd.displayName = Mo;
var ti = "TooltipTrigger", id = E.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = Oo(ti, n), s = Xi(ti, n), a = Gr(n), i = E.useRef(null), l = Ye(t, i, r.onTriggerChange), c = E.useRef(!1), u = E.useRef(!1), d = E.useCallback(() => c.current = !1, []);
    return E.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ Y(iu, { asChild: !0, ...a, children: /* @__PURE__ */ Y(
      ze.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: l,
        onPointerMove: fe(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !s.isPointerInTransitRef.current && (r.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: fe(e.onPointerLeave, () => {
          r.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: fe(e.onPointerDown, () => {
          r.open && r.onClose(), c.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: fe(e.onFocus, () => {
          c.current || r.onOpen();
        }),
        onBlur: fe(e.onBlur, r.onClose),
        onClick: fe(e.onClick, r.onClose)
      }
    ) });
  }
);
id.displayName = ti;
var Zi = "TooltipPortal", [ky, xy] = Vr(Zi, {
  forceMount: void 0
}), ad = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = Oo(Zi, t);
  return /* @__PURE__ */ Y(ky, { scope: t, forceMount: n, children: /* @__PURE__ */ Y(pn, { present: n || s.open, children: /* @__PURE__ */ Y(zi, { asChild: !0, container: r, children: o }) }) });
};
ad.displayName = Zi;
var Un = "TooltipContent", ld = E.forwardRef(
  (e, t) => {
    const n = xy(Un, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...s } = e, a = Oo(Un, e.__scopeTooltip);
    return /* @__PURE__ */ Y(pn, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ Y(cd, { side: r, ...s, ref: t }) : /* @__PURE__ */ Y(Cy, { side: r, ...s, ref: t }) });
  }
), Cy = E.forwardRef((e, t) => {
  const n = Oo(Un, e.__scopeTooltip), o = Xi(Un, e.__scopeTooltip), r = E.useRef(null), s = Ye(t, r), [a, i] = E.useState(null), { trigger: l, onClose: c } = n, u = r.current, { onPointerInTransitChange: d } = o, f = E.useCallback(() => {
    i(null), d(!1);
  }, [d]), h = E.useCallback(
    (p, g) => {
      const b = p.currentTarget, w = { x: p.clientX, y: p.clientY }, v = Sy(w, b.getBoundingClientRect()), N = Dy(w, v), C = Ay(g.getBoundingClientRect()), y = Ry([...N, ...C]);
      i(y), d(!0);
    },
    [d]
  );
  return E.useEffect(() => () => f(), [f]), E.useEffect(() => {
    if (l && u) {
      const p = (b) => h(b, u), g = (b) => h(b, l);
      return l.addEventListener("pointerleave", p), u.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", p), u.removeEventListener("pointerleave", g);
      };
    }
  }, [l, u, h, f]), E.useEffect(() => {
    if (a) {
      const p = (g) => {
        const b = g.target, w = { x: g.clientX, y: g.clientY }, v = l?.contains(b) || u?.contains(b), N = !Py(w, a);
        v ? f() : N && (f(), c());
      };
      return document.addEventListener("pointermove", p), () => document.removeEventListener("pointermove", p);
    }
  }, [l, u, a, c, f]), /* @__PURE__ */ Y(cd, { ...e, ref: s });
}), [Ey, Ty] = Vr(Mo, { isInside: !1 }), My = /* @__PURE__ */ Rb("TooltipContent"), cd = E.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, l = Oo(Un, n), c = Gr(n), { onClose: u } = l;
    return E.useEffect(() => (document.addEventListener(ei, u), () => document.removeEventListener(ei, u)), [u]), E.useEffect(() => {
      if (l.trigger) {
        const d = (f) => {
          f.target?.contains(l.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, u]), /* @__PURE__ */ Y(
      Ii,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ df(
          au,
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
              /* @__PURE__ */ Y(My, { children: o }),
              /* @__PURE__ */ Y(Ey, { scope: n, isInside: !0, children: /* @__PURE__ */ Y(vy, { id: l.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
ld.displayName = Un;
var ud = "TooltipArrow", dd = E.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = Gr(n);
    return Ty(
      ud,
      n
    ).isInside ? null : /* @__PURE__ */ Y(lu, { ...r, ...o, ref: t });
  }
);
dd.displayName = ud;
function Sy(e, t) {
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
function Dy(e, t, n = 5) {
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
function Ay(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function Py(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], c = i.x, u = i.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function Ry(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), Iy(t);
}
function Iy(e) {
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
var Ly = rd, Oy = sd, _y = id, $y = ad, By = ld, Hy = dd;
function Wy({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    Ly,
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
function ni({
  ...e
}) {
  return /* @__PURE__ */ m(Wy, { children: /* @__PURE__ */ m(Oy, { "data-slot": "tooltip", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function oi({
  ...e
}) {
  return /* @__PURE__ */ m(_y, { "data-slot": "tooltip-trigger", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
function ri({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ m($y, { children: /* @__PURE__ */ m(
    By,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: de(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ m(Hy, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" }, void 0, !1, {
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
const Le = ({ onClick: e, isActive: t, disabled: n, children: o, tooltip: r }) => {
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
      children: o
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 100,
      columnNumber: 5
    },
    void 0
  );
  return r ? /* @__PURE__ */ m(ni, { children: [
    /* @__PURE__ */ m(oi, { asChild: !0, children: s }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 120,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ m(ri, { side: "bottom", className: "text-xs", children: r }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 119,
    columnNumber: 7
  }, void 0) : s;
}, Sn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
  lineNumber: 132,
  columnNumber: 3
}, void 0), Fy = jn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: o, className: r = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const l = V(null), [c, u] = K(!1), [d, f] = K(void 0), h = Cl({
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
  }), p = U(() => {
    const { view: k } = t, { from: S } = k.state.selection, x = k.coordsAtPos(S);
    f({ top: x.bottom + 8, left: x.left }), u(!0);
  }, [t]), g = U((k, S) => {
    t.chain().focus().setImage({ src: k, alt: S }).run(), u(!1);
  }, [t]), b = U(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), w = U((k) => {
    t.chain().focus().insertCallout({ type: k }).run();
  }, [t]), v = V(/* @__PURE__ */ new Map()), N = V(/* @__PURE__ */ new Map()), C = U((k) => {
    const { doc: S, tr: x } = k.state;
    let T = !1;
    const M = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), D.forEach((I, L) => {
      I.querySelectorAll(":scope > li").forEach((W) => {
        const q = W, R = (q.textContent || "").trim().substring(0, 50);
        v.current.set(`${L}-${R}`, q.getBoundingClientRect());
      });
    });
    const A = [];
    S.descendants((I, L, $, W) => {
      if (!M.has(I.type.name)) return !0;
      let q = !1;
      if (I.forEach((P) => {
        P.type.name === "taskItem" && (q = !0);
      }), !q) return !0;
      let R = 0;
      return S.nodesBetween(0, L, (P) => (M.has(P.type.name) && R++, !0)), A.push({ node: I, pos: L, depth: R }), !0;
    }), A.sort((I, L) => L.depth - I.depth);
    for (const { node: I, pos: L } of A) {
      const $ = [];
      let W = 0;
      I.forEach((_) => {
        $.push({
          node: _,
          isTask: _.type.name === "taskItem",
          checked: _.type.name === "taskItem" && _.attrs.checked === !0,
          originalIndex: W++
        });
      });
      const q = $.filter((_) => _.isTask && !_.checked), R = $.filter((_) => _.isTask && _.checked), P = [...$], z = $.map((_, H) => ({ index: H, isTask: _.isTask })).filter((_) => _.isTask).map((_) => _.index), X = [...q, ...R];
      if (z.forEach((_, H) => {
        P[_] = X[H];
      }), !P.some((_, H) => _.node !== $[H].node)) continue;
      const Z = I.type.create(
        I.attrs,
        P.map((_) => _.node)
      ), te = x.mapping.map(L);
      x.replaceWith(te, te + I.nodeSize, Z), T = !0;
    }
    T && (k.view.dispatch(x), requestAnimationFrame(() => {
      k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((L) => {
        const $ = L.querySelectorAll(":scope > li"), W = /* @__PURE__ */ new Map();
        v.current.forEach((q, R) => {
          const P = R.replace(/^\d+-/, "");
          W.set(P, q);
        }), $.forEach((q) => {
          const R = q, P = (R.textContent || "").trim().substring(0, 50), z = W.get(P);
          if (!z) return;
          const X = R.getBoundingClientRect(), G = z.top - X.top;
          if (Math.abs(G) < 2) return;
          R.style.transform = `translateY(${G}px)`, R.style.transition = "none", R.style.zIndex = "1", R.offsetHeight, R.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", R.style.transform = "translateY(0)";
          const Z = () => {
            R.style.transform = "", R.style.transition = "", R.style.zIndex = "", R.removeEventListener("transitionend", Z);
          };
          R.addEventListener("transitionend", Z), setTimeout(Z, 400);
        });
      });
    }));
  }, []);
  Q(() => {
    if (!s || !t) return;
    const k = /* @__PURE__ */ new Map();
    t.state.doc.descendants((x, T) => (x.type.name === "taskItem" && k.set(T, x.attrs.checked === !0), !0)), N.current = k;
    const S = ({ transaction: x }) => {
      if (!x.docChanged) return;
      const T = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, I) => (A.type.name === "taskItem" && T.set(I, A.attrs.checked === !0), !0));
      const M = N.current;
      let D = !1;
      if (M.size > 0 && T.size > 0) {
        let A = 0, I = 0;
        M.forEach((L) => {
          L && A++;
        }), T.forEach((L) => {
          L && I++;
        }), A !== I && (D = !0);
      }
      N.current = T, D && setTimeout(() => {
        C(t);
      }, 150);
    };
    return t.on("transaction", S), () => {
      t.off("transaction", S);
    };
  }, [t, s, C]);
  const y = U(() => {
    C(t);
  }, [t, C]);
  return /* @__PURE__ */ m("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${r}`, children: [
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !h?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Pm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 384,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 379,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !h?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Rm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 391,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 386,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(Sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 394,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: h?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(li, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 402,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 397,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: h?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(ci, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 409,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 404,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: h?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(ui, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 416,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 411,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: h?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(di, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 423,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 418,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: h?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(Sl, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 430,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 425,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: h?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(Dl, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 437,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 432,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => o?.(),
        isActive: h?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(mi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 444,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 439,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(Sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 447,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(As, { children: [
      /* @__PURE__ */ m(Ps, { asChild: !0, children: /* @__PURE__ */ m(
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
              lineNumber: 463,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m(Qt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 466,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 452,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 451,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(Rs, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !h?.isH1 && !h?.isH2 && !h?.isH3 && !h?.isH4 && !h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 474,
                columnNumber: 13
              }, this),
              "Paragraph"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 470,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: h?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 481,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 1" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 482,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 477,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: h?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 488,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 489,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 484,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: h?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 495,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 3" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 496,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 491,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: h?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 502,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 4" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 503,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 498,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 509,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 5" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 510,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 505,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 469,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 450,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(Sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 515,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: h?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(hi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 523,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 518,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: h?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(pi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 530,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 525,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: h?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(gi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 537,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 532,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: h?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(fi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 544,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 539,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: h?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(Ll, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 551,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 546,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Im, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 564,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 553,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Lm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 577,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 566,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(Sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 580,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: b,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 587,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 583,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: p,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(wi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 593,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 589,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(Ol, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 599,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 595,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(As, { children: [
      /* @__PURE__ */ m(Ps, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(vr, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 608,
            columnNumber: 13
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 604,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 603,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(Rs, { align: "start", children: [
        /* @__PURE__ */ m(Ie, { onClick: () => w("info"), children: [
          /* @__PURE__ */ m(vr, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 613,
            columnNumber: 13
          }, this),
          " Info"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 612,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ie, { onClick: () => w("note"), children: [
          /* @__PURE__ */ m(vi, { size: 16, className: "mr-2", style: { color: "#FF8200" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 616,
            columnNumber: 13
          }, this),
          " Note"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 615,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ie, { onClick: () => w("prompt"), children: [
          /* @__PURE__ */ m(Om, { size: 16, className: "mr-2", style: { color: "#B244B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 619,
            columnNumber: 13
          }, this),
          " Prompt"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 618,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ie, { onClick: () => w("resources"), children: [
          /* @__PURE__ */ m(_m, { size: 16, className: "mr-2", style: { color: "#63B148" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 622,
            columnNumber: 13
          }, this),
          " Resources"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 621,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ie, { onClick: () => w("todo"), children: [
          /* @__PURE__ */ m(bi, { size: 16, className: "mr-2", style: { color: "#4479B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 625,
            columnNumber: 13
          }, this),
          " Todo"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 624,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 611,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 602,
      columnNumber: 7
    }, this),
    t.isActive("table") && /* @__PURE__ */ m(As, { children: [
      /* @__PURE__ */ m(Ps, { asChild: !0, children: /* @__PURE__ */ m(
        Zt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 639,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 640,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 634,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 633,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(Rs, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(da, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 648,
                columnNumber: 15
              }, this),
              " Add Column Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 644,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(da, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 654,
                columnNumber: 15
              }, this),
              " Add Column After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 650,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(Rn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 660,
                columnNumber: 15
              }, this),
              " Delete Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 656,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Is, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 662,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(ma, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 667,
                columnNumber: 15
              }, this),
              " Add Row Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 663,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(ma, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 673,
                columnNumber: 15
              }, this),
              " Add Row After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 669,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(Rn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 679,
                columnNumber: 15
              }, this),
              " Delete Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 675,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Is, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 681,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(fa, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 686,
                columnNumber: 15
              }, this),
              " Toggle Header Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 682,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(fa, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 692,
                columnNumber: 15
              }, this),
              " Toggle Header Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 688,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Is, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 695,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ie,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(Rn, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 701,
                columnNumber: 15
              }, this),
              " Delete Table"
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
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 643,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 632,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      Ac,
      {
        isOpen: c,
        onClose: () => u(!1),
        onInsert: g,
        position: d
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 708,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(Sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 716,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Le,
      {
        onClick: y,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m($m, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 721,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 717,
        columnNumber: 7
      },
      this
    ),
    a && /* @__PURE__ */ m(Be, { children: [
      /* @__PURE__ */ m(Sn, {}, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 727,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(ni, { children: [
        /* @__PURE__ */ m(oi, { asChild: !0, children: /* @__PURE__ */ m(
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
            children: /* @__PURE__ */ m(Rr, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 744,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 730,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 729,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(ri, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 747,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 728,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 726,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 755,
      columnNumber: 7
    }, this),
    n && /* @__PURE__ */ m(ni, { children: [
      /* @__PURE__ */ m(oi, { asChild: !0, children: /* @__PURE__ */ m(
        Zt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Vn, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 767,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 768,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 761,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 760,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(ri, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 771,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 759,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 377,
    columnNumber: 5
  }, this);
});
function zy({ editor: e, isOpen: t, onClose: n, focusTrigger: o = 0, initialSearchQuery: r, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: l }) {
  const c = s === "markdown", [u, d] = K(""), [f, h] = K(""), [p, g] = K(!1), [b, w] = K(!1), [v, N] = K(!1), [C, y] = K(!1), [k, S] = K([]), [x, T] = K(0), [M, D] = K(null), [A, I] = K(!1), L = V(!1), $ = V(null), W = V(null), q = V(!1);
  Q(() => {
    t && r && r.trim() && d(r);
  }, [t, r, o]);
  const R = U(() => {
    if (!u || !e) {
      S([]), T(0), D(null);
      return;
    }
    const _ = [];
    let H;
    try {
      if (b)
        H = new RegExp(u, p ? "g" : "gi");
      else {
        let j = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (j = `\\b${j}\\b`), H = new RegExp(j, p ? "g" : "gi");
      }
      D(null);
    } catch (j) {
      D(j.message), S([]);
      return;
    }
    if (c) {
      let j;
      for (; (j = H.exec(a)) !== null; )
        _.push({
          from: j.index,
          to: j.index + j[0].length,
          text: j[0]
        });
    } else {
      const { doc: j } = e.state;
      j.descendants((ee, ge) => {
        if (ee.isText && ee.text) {
          let be;
          for (; (be = H.exec(ee.text)) !== null; )
            _.push({
              from: ge + be.index,
              to: ge + be.index + be[0].length,
              text: be[0]
            });
        }
        return !0;
      });
    }
    S(_), _.length > 0 && x >= _.length && T(0);
  }, [u, p, b, v, e, x, c, a]);
  Q(() => {
    R();
  }, [R]), Q(() => {
    c && l && (t && k.length > 0 ? l(k, x) : l([], 0));
  }, [c, t, k, x, l]), Q(() => {
    if (!e) return;
    if (c) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const _ = typeof e.commands.setSearchHighlight == "function";
    t && u && _ ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: p,
      useRegex: b,
      currentMatchIndex: x
    }) : _ && e.commands.clearSearchHighlight();
  }, [e, t, u, p, b, x, c, k, a]), Q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), L.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), I(!1)), L.current = !1);
  }, [t, e, l]), Q(() => {
    if (k.length > 0 && x < k.length) {
      const _ = k[x];
      if (c) {
        const j = document.querySelector(".syntax-textarea");
        if (j && q.current) {
          const ee = parseInt(getComputedStyle(j).lineHeight) || 22, be = a.substring(0, _.from).split(`
`).length;
          j.scrollTop = Math.max(0, (be - 3) * ee);
        }
        q.current && (q.current = !1);
        return;
      }
      const H = e.view.domAtPos(_.from);
      H.node && H.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), q.current && (q.current = !1);
    }
  }, [x, k, e, c, a]), Q(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, o]);
  const P = U(() => {
    k.length !== 0 && (q.current = !0, T((_) => (_ + 1) % k.length));
  }, [k.length]), z = U(() => {
    k.length !== 0 && (q.current = !0, T((_) => (_ - 1 + k.length) % k.length));
  }, [k.length]), X = U(() => {
    if (k.length === 0 || x >= k.length) return;
    const _ = k[x];
    if (c && i) {
      const H = a.substring(0, _.from) + f + a.substring(_.to);
      i(H), setTimeout(R, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: _.from, to: _.to }).deleteSelection().insertContent(f).run(), setTimeout(R, 10);
  }, [k, x, f, e, R, c, a, i]), G = U(() => {
    if (k.length === 0) return;
    if (c && i) {
      const H = [...k].sort((ee, ge) => ge.from - ee.from);
      let j = a;
      H.forEach((ee) => {
        j = j.substring(0, ee.from) + f + j.substring(ee.to);
      }), i(j), setTimeout(R, 10);
      return;
    }
    const _ = [...k].sort((H, j) => j.from - H.from);
    e.chain().focus(), _.forEach((H) => {
      e.chain().setTextSelection({ from: H.from, to: H.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(R, 10);
  }, [k, f, e, R, c, a, i]), Z = U(() => {
    if (k.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: p,
      useRegex: b,
      wholeWord: v
    }) && (I(!0), L.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [k, u, p, b, v, e, n]), te = U((_) => {
    _.key === "Enter" ? (_.preventDefault(), _.shiftKey ? z() : P(), $.current?.focus()) : _.key === "Escape" ? (_.preventDefault(), n()) : _.key === "h" && (_.ctrlKey || _.metaKey) ? (_.preventDefault(), y((H) => !H)) : _.key === "l" && (_.ctrlKey || _.metaKey) && _.shiftKey && (_.preventDefault(), Z());
  }, [P, z, n, Z]);
  return t ? /* @__PURE__ */ m(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: te,
      children: [
        /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Bm, { size: 14, className: "find-replace-icon" }, void 0, !1, {
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
                onChange: (_) => d(_.target.value),
                className: `find-replace-input ${M ? "has-error" : ""}`
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
            M && /* @__PURE__ */ m("span", { className: "find-replace-error", title: M, children: "!" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 391,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 380,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: k.length > 0 ? `${x + 1} of ${k.length}` : u ? "No results" : "" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 396,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: z,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(Hm, { size: 16 }, void 0, !1, {
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
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Qt, { size: 16 }, void 0, !1, {
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
              onClick: Z,
              disabled: k.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${k.length} matches`,
              children: /* @__PURE__ */ m(Wm, { size: 16 }, void 0, !1, {
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
              onClick: () => g((_) => !_),
              className: `find-replace-btn ${p ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(Fm, { size: 16 }, void 0, !1, {
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
              onClick: () => N((_) => !_),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(zm, { size: 16 }, void 0, !1, {
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
              onClick: () => w((_) => !_),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(Um, { size: 16 }, void 0, !1, {
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
              onClick: () => y((_) => !_),
              className: `find-replace-btn ${C ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(Bs, { size: 16 }, void 0, !1, {
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
              children: /* @__PURE__ */ m(Ot, { size: 16 }, void 0, !1, {
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
        C && /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Bs, { size: 14, className: "find-replace-icon" }, void 0, !1, {
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
                onChange: (_) => h(_.target.value),
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
              onClick: X,
              disabled: k.length === 0,
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
              onClick: G,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(Ym, { size: 14 }, void 0, !1, {
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
const Uy = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), At = Uy ? "⌘" : "Ctrl", Yy = ({ editor: e }) => {
  const [t, n] = K(!1), [o, r] = K(0), [s, a] = K(0), [i, l] = K(""), [c, u] = K(""), [d, f] = K(!1), [h, p] = K(!1);
  Q(() => {
    if (!e) return;
    const S = () => {
      const T = e.storage.selectAllOccurrences;
      T ? (n(T.isActive), r(T.ranges.length), a(T.allMatches.length), l(T.searchTerm), u(T.typedBuffer), f(T.isTypingReplace), p(T.isIncremental)) : (n(!1), r(0), a(0));
    }, x = () => {
      S();
    };
    return e.on("transaction", x), S(), () => {
      e.off("transaction", x);
    };
  }, [e]);
  const g = U(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), b = U(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), w = U(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = U(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), N = U(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), C = U(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), y = U(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), k = U(() => {
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
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ m(Be, { children: [
        /* @__PURE__ */ m(Ir, { size: 12, className: "select-all-action-bar-preview-icon" }, void 0, !1, {
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
      }, void 0) : /* @__PURE__ */ m(Be, { children: /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-term", children: [
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
      h && o < s && /* @__PURE__ */ m(Be, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: y,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${At}+D)`,
            children: /* @__PURE__ */ m(yi, { size: 14 }, void 0, !1, {
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
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${At}+Shift+L)`,
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
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${At}+B)`,
          children: /* @__PURE__ */ m(li, { size: 14 }, void 0, !1, {
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
          title: `Italic all occurrences (${At}+I)`,
          children: /* @__PURE__ */ m(ci, { size: 14 }, void 0, !1, {
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
          title: `Underline all occurrences (${At}+U)`,
          children: /* @__PURE__ */ m(ui, { size: 14 }, void 0, !1, {
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
          children: /* @__PURE__ */ m(di, { size: 14 }, void 0, !1, {
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
          onClick: N,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(Rn, { size: 14 }, void 0, !1, {
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
          onClick: C,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(Ot, { size: 14 }, void 0, !1, {
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
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: h && o < s ? /* @__PURE__ */ m(Be, { children: [
      /* @__PURE__ */ m("kbd", { children: [
        At,
        "+D"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, void 0),
      " next · ",
      /* @__PURE__ */ m("kbd", { children: [
        At,
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
        At,
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
    }, void 0) : /* @__PURE__ */ m(Be, { children: [
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
        At,
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
}, jy = jn(Yy), cr = "-dismissed";
function Ky(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const o = e.charCodeAt(n);
    t = (t << 5) - t + o, t = t & t;
  }
  return t;
}
function Vy(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: o = 1e3,
    enabled: r = !0,
    onSave: s,
    onRecover: a
  } = t, [i, l] = K({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), c = V(null), u = V(""), d = V(0);
  Q(() => {
    if (r && !(!e || e.isDestroyed))
      try {
        const w = localStorage.getItem(n), v = localStorage.getItem(n + cr);
        if (w && !v) {
          let N = "";
          try {
            N = e.getHTML() || "";
          } catch {
            return;
          }
          w !== N && w.length > 50 && l((C) => ({ ...C, hasRecoverableContent: !0 }));
        }
      } catch (w) {
        console.warn("useAutoSave: Error checking for recoverable content", w);
      }
  }, [e, n, r]);
  const f = U(() => {
    if (!(!e || !r || e.isDestroyed))
      try {
        const w = e.getHTML(), v = Ky(w);
        if (v === d.current && w.length === u.current.length) {
          l((N) => ({ ...N, status: "saved" }));
          return;
        }
        if (w.length < 20)
          return;
        l((N) => ({ ...N, status: "saving" })), localStorage.setItem(n, w), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = w, d.current = v, l((N) => ({
          ...N,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(w), setTimeout(() => {
          l((N) => N.status === "saved" ? { ...N, status: "idle" } : N);
        }, 2e3);
      } catch (w) {
        console.error("useAutoSave: Error saving content", w), l((v) => ({
          ...v,
          status: "error",
          error: w instanceof Error ? w.message : "Failed to save"
        }));
      }
  }, [e, n, r, s]);
  Q(() => {
    if (!e || !r || e.isDestroyed) return;
    const w = () => {
      e.isDestroyed || (c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        f();
      }, o));
    };
    return e.on("update", w), () => {
      e.off("update", w), c.current && clearTimeout(c.current);
    };
  }, [e, o, r, f]), Q(() => {
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
  const h = U(() => {
    c.current && clearTimeout(c.current), f();
  }, [f]), p = U(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + cr), u.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (w) {
      console.warn("useAutoSave: Error clearing content", w);
    }
  }, [n]), g = U(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const w = localStorage.getItem(n);
      return w && e && !e.isDestroyed ? (l((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(w), u.current = w, localStorage.removeItem(n + cr), a?.(w);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), w) : null;
    } catch (w) {
      return console.warn("useAutoSave: Error recovering content", w), null;
    }
  }, [e, n, a]), b = U(() => {
    try {
      localStorage.setItem(n + cr, "true"), l((w) => ({ ...w, hasRecoverableContent: !1 }));
    } catch (w) {
      console.warn("useAutoSave: Error dismissing recovery", w);
    }
  }, [n]);
  return {
    ...i,
    save: h,
    clear: p,
    recover: g,
    dismissRecovery: b
  };
}
const Gy = 200;
function qy(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: o = !1,
    enabled: r = !0
  } = t, [s, a] = K({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), i = V(null), l = V(""), c = U((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((v) => v.length > 0).length : 0, h = d.replace(/\s/g, "").length, p = u.length;
    let g = 0, b = 0;
    o && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, b = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const w = Math.max(1, Math.ceil(f / Gy));
    return {
      words: f,
      characters: h,
      charactersWithSpaces: p,
      paragraphs: g,
      sentences: b,
      readingTime: w,
      isCalculating: !1
    };
  }, [o]);
  return Q(() => {
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
function Xy({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ m(Be, { children: [
          /* @__PURE__ */ m(jm, { className: "w-3.5 h-3.5 text-muted-foreground" }, void 0, !1, {
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
        e === "saving" && /* @__PURE__ */ m(Be, { children: [
          /* @__PURE__ */ m(_l, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }, void 0, !1, {
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
        e === "saved" && /* @__PURE__ */ m(Be, { children: [
          /* @__PURE__ */ m(Kn, { className: "w-3.5 h-3.5 text-emerald-500" }, void 0, !1, {
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
        e === "error" && /* @__PURE__ */ m(Be, { children: [
          /* @__PURE__ */ m(Km, { className: "w-3.5 h-3.5 text-red-500" }, void 0, !1, {
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
function Zy({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(Vm, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }, void 0, !1, {
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
                /* @__PURE__ */ m(ki, { className: "w-4 h-4" }, void 0, !1, {
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
              children: /* @__PURE__ */ m(Ot, { className: "w-5 h-5" }, void 0, !1, {
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
const Qy = /\[\[([^\[\]]+)\]\]$/, Jy = El.create({
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
        find: Qy,
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
}), Pt = {
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
}, ek = ["info", "note", "prompt", "resources", "todo"];
function tk(e) {
  return e.length < 3 ? !1 : !!(Pt.header.test(e) || Pt.bold.test(e) || Pt.list.test(e) || Pt.taskList.test(e) || Pt.codeBlock.test(e) || Pt.callout.test(e) || Pt.highlight.test(e) || Pt.link.test(e) || Pt.table.test(e));
}
function nk(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", o = "left", r = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? r = t[1] : ["left", "center", "right"].includes(t[1]) && (o = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (o = t[1]), /^\d+$/.test(t[2]) && (r = t[2])), { alt: n, align: o, width: r };
}
function ok(e, t) {
  const { alt: n, align: o, width: r } = nk(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[o] || "margin-right: auto;", a = r ? ` width="${r}" style="width: ${r}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${o}"${a} /></figure>`;
}
function Tr(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function ml(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${Tr(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, o = e.split(n).filter((s) => s.trim()), r = [];
  for (const s of o) {
    const a = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    a ? r.push(ok(a[1], a[2])) : r.push(`<p>${Tr(s.trim())}</p>`);
  }
  return r.join("");
}
function md(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^\d+\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[1].trim() } : null;
}
function fd(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const l = e[i]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${Tr(f.text)}</p>` : a += `<li><p>${Tr(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
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
function fl(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return ml(e);
  const o = e.split(/<br\s*\/?>/i).filter((i) => i.trim()), r = [];
  let s = [];
  const a = () => {
    s.length !== 0 && (r.push(fd(s)), s = []);
  };
  for (const i of o) {
    const l = md(i);
    if (l) {
      if (s.length > 0) {
        const c = s[0].type;
        l.depth === 0 && l.type !== c && a();
      }
      s.push(l);
    } else
      a(), r.push(ml(i.trim()));
  }
  return a(), r.join("");
}
function rk(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const o = t[0].split("|").map((i) => i.trim()).filter((i) => i.length > 0);
  if (o.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let a = "<table><thead><tr>";
  for (const i of o)
    a += "<th>" + fl(i) + "</th>";
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
        a += "<td>" + fl(d) + "</td>";
      }
      a += "</tr>";
    }
  }
  return a += "</tbody></table>", a;
}
function sk(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, o = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const h = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(h) && h.includes("-")) {
        const p = rk(d);
        if (p) {
          const g = `MANUSTABLEPLACEHOLDER${o.length}END`;
          return o.push(p), g;
        }
      }
    }
    return d;
  });
  const r = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (d, f, h) => {
    let p = h.trim();
    p = p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), p = p.replace(/__([^_]+)__/g, "<strong>$1</strong>"), p = p.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), p = p.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), p = p.replace(/`([^`]+)`/g, "<code>$1</code>");
    const g = "info";
    p.startsWith("<") || (p = `<p>${p}</p>`);
    const b = `MANUSCODEPLACEHOLDER${r.length}END`;
    return r.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${p}</div>`), b;
  }), ek.forEach((d) => {
    const f = new RegExp(`\`\`\`${d}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (h, p) => {
      let g = p.trim();
      g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>"), g.startsWith("<") || (g = `<p>${g}</p>`);
      const b = `MANUSCODEPLACEHOLDER${r.length}END`;
      return r.push(`<div data-callout="" data-type="${d}" class="callout callout-${d}">${g}</div>`), b;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (d, f, h) => {
    const p = f || "plaintext", g = h.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), b = `MANUSCODEPLACEHOLDER${r.length}END`;
    return r.push(`<pre><code class="language-${p}">${g}</code></pre>`), b;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), a = [];
  let i = [];
  const l = () => {
    i.length !== 0 && (a.push(fd(i)), i = []);
  };
  for (const d of s) {
    const f = md(d);
    if (f) {
      if (i.length > 0) {
        const p = i[0].type, g = Math.min(...i.map((b) => b.depth));
        f.depth === g && f.type !== p && l();
      }
      i.push(f);
      continue;
    }
    l();
    let h = d;
    h = h.replace(/^(#{1,6})\s+(.+)$/, (p, g, b) => {
      const w = g.length;
      return `<h${w}>${b}</h${w}>`;
    }), h = h.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), h = h.replace(/^[-*_]{3,}$/, "<hr>"), a.push(h);
  }
  l(), t = a.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, f, h) => {
    const p = f.split("|").map((N) => N.trim());
    let g = "", b = "left", w = null;
    p.length === 1 ? g = p[0] : p.length === 2 ? (g = p[0], /^\d+$/.test(p[1]) ? w = p[1] : ["left", "center", "right"].includes(p[1]) ? b = p[1] : g = f) : p.length === 3 ? (g = p[0], ["left", "center", "right"].includes(p[1]) && (b = p[1]), /^\d+$/.test(p[2]) && (w = p[2])) : g = f;
    const v = w ? ` width="${w}" style="width: ${w}px"` : "";
    return `<img src="${h.trim()}" alt="${g}" data-align="${b}"${v}>`;
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
const ik = dt.create({
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
          handlePaste(t, n, o) {
            const r = n.clipboardData;
            if (!r) return !1;
            const s = r.getData("text/html");
            if (s && s.trim())
              return !1;
            const a = r.getData("text/plain");
            if (!a || !tk(a))
              return !1;
            n.preventDefault();
            const i = sk(a);
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
}), hl = new Ke("collapsibleHeading");
function ak(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function Mr(e, t) {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  return e.descendants((r, s) => {
    if (r.type.name === "heading" && t.includes(r.attrs.level)) {
      const a = r.attrs.level, i = r.textContent.slice(0, 50), l = `h${a}-${i}`, c = o.get(l) ?? 0;
      o.set(l, c + 1), n.set(s, ak(a, i, c));
    }
  }), n;
}
let Hn = null;
function Ls(e, t, n) {
  const o = [], r = Mr(e, n.levels), s = [];
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
        st.node(u, u + c.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${c.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${h ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(c.attrs.level)
        })
      );
      const p = st.widget(u + c.nodeSize - 1, () => {
        const g = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (g) {
          g.classList.contains("collapsed") !== f && (g.classList.remove("collapsed", "expanded"), g.classList.add(f ? "collapsed" : "expanded"), g.title = f ? "Click to expand" : "Click to collapse");
          const N = g.parentElement;
          if (N) return N;
        }
        const b = document.createElement("span");
        b.className = "collapsible-heading-chevron-wrapper", b.setAttribute("contenteditable", "false");
        const w = document.createElement("button");
        return w.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, w.setAttribute("data-heading-id", d), w.setAttribute("data-heading-level", String(c.attrs.level)), w.setAttribute("contenteditable", "false"), w.setAttribute("tabindex", "-1"), w.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', w.title = f ? "Click to expand" : "Click to collapse", w.addEventListener("click", (v) => {
          v.preventDefault(), v.stopPropagation();
          const N = w.classList.contains("collapsed");
          w.classList.remove("collapsed", "expanded"), w.classList.add(N ? "expanded" : "collapsed"), w.title = N ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), Hn && Hn.dispatch(Hn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), b.appendChild(w), b;
      }, { side: 1, key: `chevron-${d}` });
      o.push(p);
    } else c.isBlock && l(u) && o.push(
      st.node(u, u + c.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Xe.create(e, o);
}
function lk(e, t, n, o) {
  if (n.collapsedHeadings.size === 0) return;
  const r = Mr(t, o), s = new Set(r.values()), a = [];
  n.collapsedHeadings.forEach((i) => {
    s.has(i) || a.push(i);
  });
  for (const i of a)
    n.collapsedHeadings.delete(i);
}
const ck = dt.create({
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
        const a = Mr(n.doc, this.options.levels).get(e);
        return a ? (o.collapsedHeadings.has(a) ? o.collapsedHeadings.delete(a) : o.collapsedHeadings.add(a), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: a })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return Mr(t.doc, this.options.levels).forEach((r) => {
          n.collapsedHeadings.add(r);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new je({
        key: hl,
        view(n) {
          return Hn = n, {
            update(o) {
              Hn = o;
            },
            destroy() {
              Hn = null;
            }
          };
        },
        state: {
          init(n, o) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: Ls(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, s) {
            const a = n.getMeta("collapsibleHeading");
            return a || n.docChanged ? (n.docChanged && !a && lk(r.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Ls(s.doc, e, t),
              docVersion: o.docVersion + 1
            }) : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = hl.getState(n);
            return o?.decorations ? o.decorations : Ls(n.doc, e, t);
          }
        }
      })
    ];
  }
}), uk = /\[([^\]]+)\]\(([^)]+)\)$/, dk = /^(https?:\/\/|www\.)[^\s]+$/i, mk = dt.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Qe({
        find: uk,
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
      new je({
        key: new Ke("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain");
            if (!r) return !1;
            const s = r.trim();
            if (!dk.test(s)) return !1;
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
}), fk = ["info", "note", "prompt", "resources", "todo"], hk = dt.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new je({
        key: new Ke("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: o } = t, { selection: r, doc: s } = o, { $from: a } = r, i = a.start();
            a.end();
            const l = s.textBetween(i, a.pos, ""), c = l.trim();
            for (const u of fk)
              if (c === `\`\`\`${u}`) {
                n.preventDefault();
                const d = o.tr, f = i + l.indexOf("```");
                d.delete(f, a.pos);
                const h = e.schema.nodes.callout, p = e.schema.nodes.paragraph;
                if (h && p) {
                  const g = p.create(), b = h.create({ type: u }, mf.from(g));
                  d.insert(f, b);
                  const w = d.doc.resolve(f + 2);
                  d.setSelection(fn.near(w)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), ur = new Ke("searchHighlight"), pk = dt.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: o }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, o && o(n.setMeta(ur, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(ur, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new je({
        key: ur,
        state: {
          init() {
            return Xe.empty;
          },
          apply(t, n, o, r) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: l } = e, c = t.getMeta(ur), u = t.docChanged;
            if (!s)
              return Xe.empty;
            if (!u && !c)
              return n.map(t.mapping, r.doc);
            const d = [];
            let f = 0;
            try {
              let h;
              if (i)
                h = new RegExp(s, a ? "g" : "gi");
              else {
                const p = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                h = new RegExp(p, a ? "g" : "gi");
              }
              r.doc.descendants((p, g) => {
                if (p.isText && p.text) {
                  let b;
                  for (; (b = h.exec(p.text)) !== null; ) {
                    const w = g + b.index, v = g + b.index + b[0].length, N = f === l;
                    d.push(
                      st.inline(w, v, {
                        class: N ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return Xe.empty;
            }
            return Xe.create(r.doc, d);
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
}), gk = new Ke("tabIndent");
function bk(e) {
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
const vk = dt.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new je({
        key: gk,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: o } = e, r = bk(n);
            if (!r)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[r];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!ha(s)(n, o)) {
                const l = r === "taskItem" ? "listItem" : "taskItem", c = n.schema.nodes[l];
                c && ha(c)(n, o);
              }
            } else if (!pa(s)(n, o)) {
              const l = r === "taskItem" ? "listItem" : "taskItem", c = n.schema.nodes[l];
              c && pa(c)(n, o);
            }
            return !0;
          }
        }
      })
    ];
  }
}), wk = new Ke("expandSelection");
function Os(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const Nk = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), yk = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), kk = "tableRow", xk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function Ck(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).isTextblock) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function Ek(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (xk.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function Tk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).type.name === kk) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function Mk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (yk.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function Sk(e, t, n) {
  const o = e.resolve(t);
  let r = -1;
  for (let i = o.depth; i >= 1; i--) {
    const l = o.node(i);
    Nk.has(l.type.name) && (r = i);
  }
  if (r === -1) return null;
  const s = o.start(r), a = o.end(r);
  return s < t || a > n ? { from: s, to: a } : null;
}
function Dk(e) {
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
function Ak(e, t, n) {
  const o = e.filter((r) => r.from <= t && r.to >= n);
  return o.sort((r, s) => r.to - r.from - (s.to - s.from)), o;
}
function Pk(e, t) {
  const n = e.resolve(t);
  for (let o = n.depth; o >= 1; o--)
    if (n.node(o).type.name === "table") return !0;
  return !1;
}
function Rk(e, t, n) {
  const o = [];
  let r = t, s = n;
  const a = (l) => l && (l.from < r || l.to > s) ? (o.push(l), r = l.from, s = l.to, !0) : !1;
  a(Ck(e, r, s)), Pk(e, t) && (a(Ek(e, r, s)), a(Tk(e, r, s))), a(Sk(e, r, s)), a(Mk(e, r, s));
  const i = Dk(e);
  if (i.length > 0) {
    const l = Ak(i, r, s);
    for (const c of l)
      a({ from: c.from, to: c.to });
  }
  return (r > 0 || s < e.content.size) && o.push({ from: 0, to: e.content.size }), o;
}
const Ik = dt.create({
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
        if (t.expansionDepth > 0 && r === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), o instanceof nm || r === 0 && s === n.content.size)
          return !0;
        const i = Rk(n, r, s);
        let l = null;
        for (const c of i)
          if (c.from < r || c.to > s) {
            l = c;
            break;
          }
        return l ? (t.lastExpandedFrom = l.from, t.lastExpandedTo = l.to, t.expansionDepth++, t.isExpanding = !0, l.from === 0 && l.to === n.content.size ? e.commands.selectAll() : e.commands.setTextSelection({
          from: l.from,
          to: l.to
        }), t.isExpanding = !1, !0) : (t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size, t.expansionDepth++, t.isExpanding = !0, e.commands.selectAll(), t.isExpanding = !1, !0);
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new je({
        key: wk,
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
function Ok(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, o = parseInt(t.slice(2, 4), 16) / 255, r = parseInt(t.slice(4, 6), 16) / 255, s = (i) => i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(o) + 0.0722 * s(r) > 0.4;
}
const _k = new Ke("hexColorDecoration");
function hd(e, t, n) {
  const o = [];
  return e.nodesBetween(t, n, (r, s) => {
    if (!r.isText) return;
    const a = r.text || "";
    let i;
    const l = new RegExp(Lk.source, "g");
    for (; (i = l.exec(a)) !== null; ) {
      const c = s + i.index, u = c + i[0].length;
      if (u >= t && c <= n) {
        const d = i[0], f = Ok(d);
        o.push(
          st.inline(c, u, {
            class: "hex-color-swatch",
            style: `background-color: ${d}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), o;
}
function $k(e) {
  const t = hd(e, 0, e.content.size);
  return Xe.create(e, t);
}
const Bk = El.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new je({
        key: _k,
        state: {
          init(e, { doc: t }) {
            return $k(t);
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
              const a = hd(e.doc, s.from, s.to);
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
}), Fe = new Ke("selectAllOccurrences");
function pl(e, t, n, o, r) {
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
function qt(e, t) {
  const n = Fe.getState(e.state);
  if (!n) return [];
  const o = [];
  return n.find().forEach((r) => {
    if (r.from === r.to) return;
    const s = e.state.doc.textBetween(r.from, r.to, "");
    o.push({ from: r.from, to: r.to, text: s });
  }), o;
}
function Hk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function $e(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Wk = dt.create({
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
        const l = pl(t.state.doc, r, s, a, i);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = r, this.storage.caseSensitive = s, this.storage.useRegex = a, this.storage.wholeWord = i, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = r.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], o && o(n.setMeta(Fe, { activate: !0 })), !0);
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
              const h = f.textContent, p = d.parentOffset;
              let g = p, b = p;
              for (; g > 0 && /\w/.test(h[g - 1]); ) g--;
              for (; b < h.length && /\w/.test(h[b]); ) b++;
              g < b && (i = h.slice(g, b));
            }
          }
          if (!i) return !1;
          const l = pl(r.doc, i, !1, !1, !1);
          if (l.length === 0) return !1;
          const c = Hk(l, s), u = l[c];
          return o.isActive = !0, o.ranges = [u], o.searchTerm = i, o.caseSensitive = !1, o.useRegex = !1, o.wholeWord = !1, o.typedBuffer = "", o.isTypingReplace = !1, o.originalTermLength = i.length, o.allMatches = l, o.nextMatchIndex = (c + 1) % l.length, o.isIncremental = !0, o.undoStack = [], o.redoStack = [], n && n(t.setMeta(Fe, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (o.ranges = [...o.ranges, s], o.nextMatchIndex = (r + 1) % o.allMatches.length, o.ranges.length >= o.allMatches.length && (o.isIncremental = !1), n && n(t.setMeta(Fe, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => ($e(this.storage), t && t(e.setMeta(Fe, { deactivate: !0 })), !0),
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
              const l = qt(i, this.storage);
              this.storage.ranges = l, l.length === 0 && $e(this.storage);
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
        return $e(this.storage), !0;
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
              const s = qt(r, this.storage);
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
        key: Fe,
        state: {
          init() {
            return Xe.empty;
          },
          apply(t, n, o, r) {
            const s = t.getMeta(Fe);
            if (s?.deactivate || !e.isActive)
              return Xe.empty;
            if (s?.activate || s?.refresh) {
              const a = [];
              for (const i of e.ranges) {
                a.push(
                  st.inline(i.from, i.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), a.push(
                  st.widget(i.to, l, {
                    side: 1,
                    key: `cursor-${i.from}-${i.to}`
                  })
                );
              }
              return Xe.create(r.doc, a);
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
              $e(e);
              const { tr: r } = t.state;
              t.dispatch(r.setMeta(Fe, { deactivate: !0 }));
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
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Fe, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const r = e.undoStack.pop();
                return e.typedBuffer = r, r === "" && (e.isTypingReplace = !1), ff(t.state, t.dispatch), setTimeout(() => {
                  const s = qt(t);
                  e.ranges = s, s.length === 0 && $e(e);
                }, 10), !0;
              }
              $e(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Fe, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const r = e.redoStack.pop();
                return e.typedBuffer = r, e.isTypingReplace = !0, hf(t.state, t.dispatch), setTimeout(() => {
                  const s = qt(t);
                  e.ranges = s, s.length === 0 && $e(e);
                }, 10), !0;
              }
              $e(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Fe, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const o = qt(t);
                if (o.length === 0) {
                  $e(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(Fe, { deactivate: !0 })), !0;
                }
                const r = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...o].sort((i, l) => l.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(r));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = qt(t);
                  e.ranges = i, i.length === 0 && $e(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const o = [...e.ranges].sort((a, i) => i.from - a.from), { tr: r } = t.state;
                for (const a of o)
                  r.delete(a.from, a.to);
                t.dispatch(r), $e(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Fe, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const o = [...e.ranges].sort((a, i) => i.from - a.from), { tr: r } = t.state;
              for (const a of o)
                r.delete(a.from, a.to);
              t.dispatch(r), $e(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Fe, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              $e(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Fe, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              $e(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Fe, { deactivate: !0 })), !1;
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
            const s = qt(t);
            if (s.length === 0) {
              $e(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Fe, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += r : (e.isTypingReplace = !0, e.typedBuffer = r);
            const a = [...s].sort((l, c) => c.from - l.from), { tr: i } = t.state;
            for (const l of a)
              i.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const l = qt(t);
              e.ranges = l, l.length === 0 && $e(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function dr(e, t, n) {
  const { state: o } = e, { tr: r } = o;
  t !== n && r.delete(t, n);
  const s = r.doc.resolve(t), a = o.schema.nodes.horizontalRule.create(), i = s.before(s.depth), l = s.after(s.depth);
  r.replaceWith(i, l, a);
  const c = i + a.nodeSize;
  if (c < r.doc.content.size) {
    const u = r.doc.resolve(c);
    u.nodeAfter && u.nodeAfter.isTextblock ? r.setSelection(fn.create(r.doc, c + 1)) : u.nodeAfter && r.setSelection(fn.near(r.doc.resolve(c)));
  } else {
    const d = o.schema.nodes.paragraph.create();
    r.insert(c, d), r.setSelection(fn.create(r.doc, c + 1));
  }
  r.scrollIntoView(), e.view.dispatch(r);
}
function Fk() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function zk(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => {
      typeof o.result == "string" ? t(o.result) : n(new Error("Failed to read file"));
    }, o.onerror = () => n(new Error("Failed to read file")), o.readAsDataURL(e);
  });
}
function Uk(e, t) {
  const [n, o] = e.split(","), r = n.match(/:(.*?);/), s = r ? r[1] : "image/jpeg", a = atob(o), i = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    i[l] = a.charCodeAt(l);
  return new File([i], t, { type: s });
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
async function Kk(e, t, n) {
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
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", h = d ? void 0 : n, p = c.toDataURL(f, h), g = Uk(p, e.name);
      o({ dataUrl: p, file: g, width: i, height: l });
    }, s.onerror = () => r(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function Vk(e, t, n) {
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
async function gl(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!Yk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const r = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${r}MB`), !1;
  }
  const o = Fk();
  try {
    n.onUploadStart?.();
    let r, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const d = await Kk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      r = d.dataUrl, a = d.file, s = Math.min(d.width, 600);
    } else {
      r = await zk(e), a = e;
      const d = await jk(r);
      s = Math.min(d.width, 600);
    }
    t.chain().focus().setImage({
      src: r,
      alt: e.name,
      width: s
    }).run();
    const { state: l } = t.view, c = l.selection.from - 1, u = l.doc.nodeAt(c);
    if (u && u.type.name === "resizableImage") {
      const d = t.view.nodeDOM(c);
      if (d) {
        const f = d instanceof HTMLElement ? d : d.dom;
        f && f.classList.add("image-uploading");
      }
    }
    try {
      const d = await n.onImageUpload(a, {
        fileName: e.name,
        mimeType: a.type,
        fileSize: a.size,
        uploadId: o
      });
      let f = !1;
      return t.view.state.doc.descendants((h, p) => {
        if (f) return !1;
        if (h.type.name === "resizableImage" && h.attrs.src === r && h.attrs.alt === e.name) {
          try {
            const { state: g, dispatch: b } = t.view, w = g.doc.nodeAt(p);
            if (w) {
              const v = g.tr.setNodeMarkup(p, void 0, {
                ...w.attrs,
                src: d
              });
              b(v);
            }
          } catch (g) {
            console.warn("Failed to replace placeholder with uploaded reference:", g);
          }
          return f = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((h, p) => {
        if (h.type.name === "resizableImage" && h.attrs.src === d) {
          const g = t.view.nodeDOM(p);
          if (g) {
            const b = g instanceof HTMLElement ? g : g.dom;
            b && b.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (d) {
      return console.warn("Image upload failed, removing placeholder:", d), Vk(t, r, e.name), n.onUploadError?.(`Upload failed: ${d instanceof Error ? d.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (r) {
    return n.onUploadError?.(`Failed to process image: ${r instanceof Error ? r.message : "Unknown error"}`), !1;
  }
}
function bl(e) {
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
const Gk = dt.create({
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
          handlePaste(n, o) {
            const r = o.clipboardData;
            if (!r) return !1;
            const s = bl(r);
            return s.length === 0 ? !1 : (o.preventDefault(), s.forEach((a) => {
              gl(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, o, r, s) {
            if (s) return !1;
            const a = o.dataTransfer;
            if (!a) return !1;
            const i = bl(a);
            if (i.length === 0)
              return !1;
            o.preventDefault();
            const l = n.posAtCoords({
              left: o.clientX,
              top: o.clientY
            });
            if (l) {
              const c = n.state.tr.setSelection(
                fn.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(c);
            }
            return i.forEach((c) => {
              gl(c, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function qk({ containerRef: e, enabled: t = !0 }) {
  const [n, o] = K(!1), [r, s] = K(0), a = U((u) => {
    u.preventDefault(), u.stopPropagation(), u.dataTransfer?.types.includes("Files") && (s((d) => d + 1), o(!0));
  }, []), i = U((u) => {
    u.preventDefault(), u.stopPropagation(), s((d) => {
      const f = d - 1;
      return f === 0 && o(!1), f;
    });
  }, []), l = U((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), c = U((u) => {
    u.preventDefault(), u.stopPropagation(), o(!1), s(0);
  }, []);
  return Q(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", a), u.addEventListener("dragleave", i), u.addEventListener("dragover", l), u.addEventListener("drop", c), () => {
      u.removeEventListener("dragenter", a), u.removeEventListener("dragleave", i), u.removeEventListener("dragover", l), u.removeEventListener("drop", c);
    };
  }, [t, e, a, i, l, c]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ m("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(Gm, { className: "w-12 h-12" }, void 0, !1, {
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
function Xk({
  src: e,
  alt: t,
  position: n,
  onSave: o,
  onDelete: r,
  onClose: s
}) {
  const [a, i] = K(e), [l, c] = K(t), u = V(null), d = V(null);
  Q(() => {
    d.current?.focus(), d.current?.select();
  }, []), Q(() => {
    const b = (v) => {
      u.current && !u.current.contains(v.target) && s();
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b);
    };
  }, [s]), Q(() => {
    const b = (w) => {
      w.key === "Escape" ? s() : w.key === "Enter" && (w.metaKey || w.ctrlKey) && f();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [a, l, s]);
  const f = () => {
    a.trim() && o(a.trim(), l.trim());
  }, p = (() => {
    let N = n.x - 160, C = n.y + 10;
    return N + 320 > window.innerWidth - 16 && (N = window.innerWidth - 320 - 16), N < 16 && (N = 16), C + 280 > window.innerHeight - 16 && (C = n.y - 280 - 10), C < 16 && (C = 16), { left: N, top: C };
  })(), g = /* @__PURE__ */ m(
    "div",
    {
      ref: u,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: p.left,
        top: p.top
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
              children: /* @__PURE__ */ m(Ot, { className: "w-4 h-4" }, void 0, !1, {
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
              /* @__PURE__ */ m(mi, { className: "w-3.5 h-3.5" }, void 0, !1, {
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
              /* @__PURE__ */ m(Ir, { className: "w-3.5 h-3.5" }, void 0, !1, {
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
              children: /* @__PURE__ */ m(Rn, { className: "w-4 h-4" }, void 0, !1, {
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
                  /* @__PURE__ */ m(Kn, { className: "w-4 h-4" }, void 0, !1, {
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
  return /* @__PURE__ */ m(Ht, { children: g }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
    lineNumber: 213,
    columnNumber: 10
  }, this);
}
function mr(e) {
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
    const p = [
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
    for (const v of p) {
      let N;
      for (v.regex.lastIndex = 0; (N = v.regex.exec(i)) !== null; )
        g.push({
          start: l + N.index,
          end: l + N.index + N[0].length,
          type: v.type,
          content: N[0]
        });
    }
    g.sort((v, N) => v.start - N.start);
    const b = [];
    let w = l;
    for (const v of g)
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
function vl(e) {
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
function mn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function fr(e, t, n, o) {
  if (t.length === 0 && (!n || n.length === 0))
    return mn(e);
  let r = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const c = s[l], u = a + c.length, d = t.filter((h) => h.start >= a && h.start < u);
      let f = a;
      for (const h of d)
        h.start > f && (r += mn(e.substring(f, h.start))), r += `<span class="${vl(h.type)}">${mn(h.content)}</span>`, f = h.end;
      f < u && (r += mn(e.substring(f, u))), l < s.length - 1 && (r += `
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
      h.start > f && (r += _s(e, f, h.start, null, i)), r += _s(e, h.start, h.end, vl(h.type), i), f = h.end;
    f < u && (r += _s(e, f, u, null, i)), l < s.length - 1 && (r += `
`), a = u + 1;
  }
  return r;
}
function _s(e, t, n, o, r) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = r.get(a);
    if (i) {
      const l = a;
      for (; a < n && r.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const c = mn(e.substring(l, a)), u = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      o ? s += `<span class="${o}"><mark class="${u}">${c}</mark></span>` : s += `<mark class="${u}">${c}</mark>`;
    } else {
      const l = a;
      for (; a < n && !r.has(a); )
        a++;
      const c = mn(e.substring(l, a));
      o ? s += `<span class="${o}">${c}</span>` : s += c;
    }
  }
  return s;
}
function Zk({
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
  const c = V(null), u = V(null), d = V(null), f = V(null), h = 5e3, p = 80, [g, b] = K(() => {
    const x = mr(e);
    return fr(e, x, a, i);
  }), w = V(null), v = Pn(() => {
    if (e.length <= h) {
      const x = mr(e), T = fr(e, x, a, i);
      return w.current && (clearTimeout(w.current), w.current = null), T;
    }
    return null;
  }, [e, a, i]);
  Q(() => {
    if (e.length <= h) {
      const x = mr(e);
      b(fr(e, x, a, i));
      return;
    }
    return w.current && clearTimeout(w.current), w.current = setTimeout(() => {
      const x = mr(e);
      b(fr(e, x, a, i)), w.current = null;
    }, p), () => {
      w.current && clearTimeout(w.current);
    };
  }, [e, a, i]);
  const N = v ?? g, C = U(() => {
    const x = c.current, T = u.current, M = d.current;
    if (x) {
      const D = M?.parentElement, A = D ? D.clientHeight : 200;
      x.style.height = "auto";
      const I = Math.max(x.scrollHeight, A, 200);
      x.style.height = `${I}px`, T && (T.style.height = `${I}px`);
    }
  }, []);
  Q(() => {
    const x = c.current;
    if (!x) return;
    const T = (M) => {
      const D = x.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: A, scrollHeight: I, clientHeight: L } = D, $ = A <= 0, W = A + L >= I - 1;
      (M.deltaY > 0 && !W || M.deltaY < 0 && !$) && (M.preventDefault(), D.scrollTop += M.deltaY);
    };
    return x.addEventListener("wheel", T, { passive: !1 }), () => x.removeEventListener("wheel", T);
  }, []);
  const y = U(() => {
  }, []);
  Q(() => {
    C();
  }, [e, C]), Q(() => {
    r && c.current && c.current.focus();
  }, [r]), Q(() => {
    if (f.current && c.current) {
      const { start: x, end: T } = f.current;
      c.current.selectionStart = x, c.current.selectionEnd = T, f.current = null;
    }
  }, [e]);
  const k = U((x) => {
    const T = x.target;
    f.current = {
      start: T.selectionStart,
      end: T.selectionEnd
    }, t(T.value);
  }, [t]), S = U((x) => {
    const T = x.currentTarget, M = T.selectionStart, D = T.selectionEnd, A = T.value, I = M !== D;
    if (l) {
      if (x.key === "`" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), I) {
          const L = A.substring(M, D), $ = A.substring(0, M) + "`" + L + "`" + A.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t($);
        } else if (A[M] === "`")
          f.current = { start: M + 1, end: M + 1 }, t(A), T.selectionStart = T.selectionEnd = M + 1;
        else {
          const L = A.substring(0, M) + "``" + A.substring(D);
          f.current = { start: M + 1, end: M + 1 }, t(L);
        }
        return;
      }
      if (x.key === "*" && !x.ctrlKey && !x.metaKey) {
        if (A[M - 1] === "*" && A[M], I) {
          x.preventDefault();
          const W = A.substring(M, D), q = A.substring(0, M) + "*" + W + "*" + A.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t(q);
          return;
        }
        if (A[M] === "*") {
          x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(A.substring(0, M) + A.substring(M));
          return;
        }
        x.preventDefault();
        const $ = A.substring(0, M) + "**" + A.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t($);
        return;
      }
      if (x.key === "_" && !x.ctrlKey && !x.metaKey) {
        if (I) {
          x.preventDefault();
          const $ = A.substring(M, D), W = A.substring(0, M) + "_" + $ + "_" + A.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t(W);
          return;
        }
        if (A[M] === "_") {
          x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(A.substring(0, M) + A.substring(M));
          return;
        }
        x.preventDefault();
        const L = A.substring(0, M) + "__" + A.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t(L);
        return;
      }
      if (x.key === "~" && !x.ctrlKey && !x.metaKey) {
        if (I) {
          x.preventDefault();
          const $ = A.substring(M, D), W = A.substring(0, M) + "~" + $ + "~" + A.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t(W);
          return;
        }
        if (A[M] === "~") {
          x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(A.substring(0, M) + A.substring(M));
          return;
        }
        x.preventDefault();
        const L = A.substring(0, M) + "~~" + A.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t(L);
        return;
      }
      if (x.key === "[" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), I) {
          const L = A.substring(M, D), $ = A.substring(0, M) + "[" + L + "]()" + A.substring(D);
          f.current = { start: D + 3, end: D + 3 }, t($);
        } else {
          const L = A.substring(0, M) + "[]()" + A.substring(D);
          f.current = { start: M + 1, end: M + 1 }, t(L);
        }
        return;
      }
      if (x.key === "]" && !x.ctrlKey && !x.metaKey && A[M] === "]") {
        x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(A.substring(0, M) + A.substring(M));
        return;
      }
      if (x.key === ")" && !x.ctrlKey && !x.metaKey && A[M] === ")") {
        x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(A.substring(0, M) + A.substring(M));
        return;
      }
      if (x.key === "Backspace" && !I && M > 0) {
        const L = A[M - 1], $ = A[M], W = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [q, R] of W)
          if (L === q && $ === R) {
            x.preventDefault();
            const P = A.substring(0, M - 1) + A.substring(M + 1);
            f.current = { start: M - 1, end: M - 1 }, t(P);
            return;
          }
        if (L === "[" && A.substring(M, M + 3) === "]()") {
          x.preventDefault();
          const q = A.substring(0, M - 1) + A.substring(M + 3);
          f.current = { start: M - 1, end: M - 1 }, t(q);
          return;
        }
      }
    }
    if (x.key === "Tab")
      if (x.preventDefault(), x.shiftKey) {
        const L = A.substring(0, M), $ = A.substring(M, D), W = A.substring(D), R = L.lastIndexOf(`
`) + 1, P = L.substring(0, R), z = L.substring(R), X = (z + $).split(`
`), G = X.map((_) => _.startsWith("  ") ? _.substring(2) : _.startsWith("	") ? _.substring(1) : _), Z = P + G.join(`
`) + W, te = (z + $).length - G.join(`
`).length;
        f.current = {
          start: Math.max(R, M - (X[0].length - G[0].length)),
          end: D - te
        }, t(Z);
      } else if (M === D) {
        const L = A.substring(0, M) + "  " + A.substring(D);
        f.current = { start: M + 2, end: M + 2 }, t(L);
      } else {
        const L = A.substring(0, M), $ = A.substring(M, D), W = A.substring(D), R = L.lastIndexOf(`
`) + 1, P = L.substring(0, R), X = (L.substring(R) + $).split(`
`), G = X.map((te) => "  " + te), Z = P + G.join(`
`) + W;
        f.current = {
          start: M + 2,
          end: D + X.length * 2
        }, t(Z);
      }
  }, [t, l]);
  return /* @__PURE__ */ m("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: N || `<span class="md-placeholder">${mn(n)}</span>` },
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
        onChange: k,
        onKeyDown: S,
        onScroll: y,
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
let wl = 0, si = 0, pd = 0;
function Qk(e) {
  si++, pd = e;
}
const Jk = jn(function({
  visible: t,
  onClose: n,
  editor: o
}) {
  const [r, s] = K(!1), [a, i] = K({
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
  }), l = V([]), c = V(performance.now()), u = V(0), d = V(0), f = V(0), h = V(0), [p, g] = K(new Array(60).fill(0)), [b, w] = K(new Array(60).fill(0));
  Q(() => {
    if (!t || !o) return;
    const S = () => {
      const x = performance.now();
      queueMicrotask(() => {
        const T = performance.now() - x;
        Qk(T);
      });
    };
    return o.on("transaction", S), () => {
      o.off("transaction", S);
    };
  }, [t, o]), Q(() => {
    if (!t) return;
    let S = 0, x = performance.now(), T = 0;
    const M = (D) => {
      const A = D - c.current;
      if (c.current = D, l.current.push({ time: D, duration: A }), l.current.length > 120 && (l.current = l.current.slice(-120)), A > 16.67 && d.current++, S++, D - x >= 1e3) {
        T = S, S = 0, x = D;
        const I = l.current.slice(-60), L = I.length > 0 ? I.reduce((G, Z) => G + Z.duration, 0) / I.length : 0, $ = I.length > 0 ? Math.max(...I.map((G) => G.duration)) : 0, W = performance.memory, q = W ? W.usedJSHeapSize / (1024 * 1024) : 0, R = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, P = document.querySelectorAll("*").length, z = wl - f.current, X = si - h.current;
        f.current = wl, h.current = si, i({
          fps: T,
          frameTime: Math.round(L * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(q * 10) / 10,
          memoryTotal: Math.round(R),
          renderCount: z,
          transactionCount: X,
          lastTransactionTime: Math.round(pd * 100) / 100,
          domNodes: P,
          longFrames: d.current
        }), g((G) => [...G.slice(1), T]), w((G) => [...G.slice(1), L]), d.current = 0;
      }
      u.current = requestAnimationFrame(M);
    };
    return u.current = requestAnimationFrame(M), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const v = U(() => {
    n?.();
  }, [n]), N = U(() => {
    s((S) => !S);
  }, []);
  if (!t) return null;
  const C = (S) => S >= 55 ? "#4ade80" : S >= 30 ? "#fbbf24" : "#f87171", y = (S) => S <= 16.67 ? "#4ade80" : S <= 33.33 ? "#fbbf24" : "#f87171", k = (S, x, T) => {
    const A = S.map((I, L) => {
      const $ = L / (S.length - 1) * 120, W = 24 - Math.min(I, x) / x * 24;
      return `${$},${W}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: A,
        fill: "none",
        stroke: T,
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
        /* @__PURE__ */ m(qm, { size: 14 }, void 0, !1, {
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
        /* @__PURE__ */ m("button", { onClick: N, title: r ? "Expand" : "Minimize", children: r ? /* @__PURE__ */ m($l, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 28
        }, this) : /* @__PURE__ */ m(Bl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 54
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 245,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ m(Ot, { size: 12 }, void 0, !1, {
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
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: C(a.fps) }, children: a.fps }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 260,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        k(p, 70, C(a.fps))
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
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: y(a.frameTime) }, children: [
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
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: y(a.frameTimeMax) }, children: [
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
        k(b, 50, y(a.frameTime))
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
class ex extends pm {
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
      return /* @__PURE__ */ m("div", { className: de("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ m("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(Xm, { className: "w-6 h-6 text-destructive" }, void 0, !1, {
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
            Zt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(ki, { className: "w-4 h-4" }, void 0, !1, {
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
            Zt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(Rn, { className: "w-4 h-4" }, void 0, !1, {
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
              className: de(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ m(Qt, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 193,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ m(Rl, { className: "w-3 h-3" }, void 0, !1, {
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
                  children: r ? /* @__PURE__ */ m(Be, { children: [
                    /* @__PURE__ */ m(Zm, { className: "w-3 h-3 text-green-500" }, void 0, !1, {
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
                  }, this) : /* @__PURE__ */ m(Be, { children: [
                    /* @__PURE__ */ m(Vn, { className: "w-3 h-3" }, void 0, !1, {
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
function tx({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function nx(e, t) {
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
function ox(e) {
  const [t, n] = gm(nx, { status: "idle" }), o = V(null), r = U(async (i, l, c, u, d) => {
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
  }, [e]), s = U(() => {
    o.current?.(), n({ type: "reset" });
  }, []), a = U(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: r, abort: s, reset: a };
}
const rx = {
  SpellCheck: Jm,
  RefreshCw: Qm,
  Minimize2: Bl,
  Maximize2: $l,
  FileText: Ni,
  MessageSquare: Hl,
  Sparkles: Rr
};
function sx({ actions: e, scope: t, onAction: n, onClose: o, position: r }) {
  const [s, a] = K(""), [i, l] = K(!1), c = V(null), u = V(null), d = e.filter((b) => b.scope === t || b.scope === "both");
  Q(() => {
    const b = (v) => {
      c.current && !c.current.contains(v.target) && o();
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b);
    };
  }, [o]), Q(() => {
    const b = (w) => {
      w.key === "Escape" && o();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [o]), Q(() => {
    i && u.current && u.current.focus();
  }, [i]);
  const h = U(() => {
    const w = d.length * 40 + (i ? 56 : 0) + 16, v = window.innerWidth, N = window.innerHeight;
    let C = r.top, y = r.left;
    return y + 260 > v - 8 && (y = v - 260 - 8), y < 8 && (y = 8), C + w > N - 8 && (C = r.top - w - 8), C < 8 && (C = 8), { top: C, left: y };
  }, [r, d.length, i])(), p = () => {
    s.trim() && (n("custom", s.trim()), a(""), l(!1));
  }, g = /* @__PURE__ */ m(
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
              /* @__PURE__ */ m(Hl, { size: 14, className: "text-muted-foreground shrink-0" }, void 0, !1, {
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
                    b.key === "Enter" && (b.preventDefault(), p()), b.stopPropagation();
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
              const w = b.icon ? rx[b.icon] : Rr;
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
  return /* @__PURE__ */ m(Ht, { onMouseDown: (b) => b.preventDefault(), children: g }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, this);
}
function ix({
  state: e,
  position: t,
  onReplace: n,
  onInsert: o,
  onRetry: r,
  onDiscard: s
}) {
  const a = V(null), i = V(null), [l, c] = K(!1), [u, d] = K(0);
  Q(() => {
    if (a.current) {
      const y = new ResizeObserver((k) => {
        for (const S of k)
          d(S.contentRect.height);
      });
      return y.observe(a.current), () => y.disconnect();
    }
  }, []), Q(() => {
    i.current && e.status === "streaming" && (i.current.scrollTop = i.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), Q(() => {
    const y = (k) => {
      k.key === "Escape" && s();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [s]);
  const f = Pn(() => {
    const x = window.innerWidth, T = window.innerHeight;
    let M = t.selectionCenterX - 380 / 2;
    M + 380 > x - 8 && (M = x - 380 - 8), M < 8 && (M = 8);
    const D = T - t.selectionBottom - 8, A = t.selectionTop - 8, I = u || 200;
    let L, $ = !1;
    return D >= I || D >= A ? L = t.selectionBottom + 8 : (L = t.selectionTop - 8 - I, $ = !0), L < 8 && (L = 8), L + I > T - 8 && (L = T - I - 8), { top: L, left: M, placedAbove: $ };
  }, [t, u]), h = e.status === "streaming" || e.status === "complete" ? e.result : "", p = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", b = e.status === "complete", w = e.status === "error", v = U(() => {
    navigator.clipboard.writeText(h), c(!0), setTimeout(() => c(!1), 1500);
  }, [h]);
  if (e.status === "idle") return null;
  const N = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", C = /* @__PURE__ */ m(
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
          ${N}
        `,
          children: [
            /* @__PURE__ */ m("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ m("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                g && /* @__PURE__ */ m(_l, { size: 12, className: "animate-spin" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 173,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ m("span", { className: "font-medium", children: w ? "Error" : p }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 174,
                  columnNumber: 13
                }, this),
                g && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" }, void 0, !1, {
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
                  onMouseDown: (y) => {
                    y.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(Ot, { size: 14, className: "text-muted-foreground" }, void 0, !1, {
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
                  g && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" }, void 0, !1, {
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
              (b || w) && /* @__PURE__ */ m(Be, { children: [
                b && /* @__PURE__ */ m(Be, { children: [
                  /* @__PURE__ */ m(
                    Dn,
                    {
                      icon: Bs,
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
                    Dn,
                    {
                      icon: yi,
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
                    Dn,
                    {
                      icon: l ? Kn : Vn,
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
                  Dn,
                  {
                    icon: ki,
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
                  Dn,
                  {
                    icon: Ot,
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
              g && /* @__PURE__ */ m(Be, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 246,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  Dn,
                  {
                    icon: Ot,
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
  return /* @__PURE__ */ m(Ht, { onMouseDown: (y) => y.preventDefault(), children: C }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
    lineNumber: 260,
    columnNumber: 5
  }, this);
}
function Dn({
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
const gd = "paragon-editor-toc-width", ax = 280, bd = 200, vd = 500;
function Nl() {
  try {
    const e = localStorage.getItem(gd);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= bd && t <= vd)
        return t;
    }
  } catch {
  }
  return ax;
}
function lx(e) {
  try {
    localStorage.setItem(gd, String(e));
  } catch {
  }
}
function cx(e, t, n) {
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
function ux(e) {
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
function yl(e, t) {
  try {
    const n = e.state.doc.resolve(t), o = e.view.nodeDOM(n.before(n.depth + 1));
    if (o instanceof HTMLElement) return o;
    const r = e.view.nodeDOM(t);
    if (r instanceof HTMLElement) return r;
  } catch {
  }
  return null;
}
const kl = jn(function({
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
  onItemClick: p,
  renderItem: g,
  showToggleButton: b = !0,
  scrollContainerRef: w
}) {
  const [v, N] = K([]), [C, y] = K(null), [k, S] = K(n), [x, T] = K(/* @__PURE__ */ new Set()), [M, D] = K(() => {
    if (d) {
      const H = parseInt(d, 10);
      return isNaN(H) ? Nl() : H;
    }
    return Nl();
  }), A = V(null), I = V(null), L = V(!1), $ = V(0), W = V(0);
  Q(() => {
    S(n);
  }, [n]);
  const q = U((H) => {
    H.preventDefault(), H.stopPropagation(), L.current = !0, $.current = H.clientX, W.current = M, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [M]);
  Q(() => {
    const H = (ee) => {
      if (!L.current) return;
      const ge = f === "right" ? $.current - ee.clientX : ee.clientX - $.current, be = Math.min(vd, Math.max(bd, W.current + ge));
      D(be);
    }, j = () => {
      L.current && (L.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((ee) => (lx(ee), ee)));
    };
    return document.addEventListener("mousemove", H), document.addEventListener("mouseup", j), () => {
      document.removeEventListener("mousemove", H), document.removeEventListener("mouseup", j);
    };
  }, [f]);
  const R = U(() => {
    if (!t || t.isDestroyed) return;
    const H = cx(t, s, a);
    N(H), C && !H.find((j) => j.id === C) && y(null);
  }, [t, s, a, C]);
  Q(() => {
    if (!t) return;
    const H = () => {
      I.current && clearTimeout(I.current), I.current = setTimeout(() => R(), 300);
    };
    return R(), t.on("update", H), t.on("create", H), () => {
      t.off("update", H), t.off("create", H), I.current && clearTimeout(I.current);
    };
  }, [t, R]), Q(() => {
    if (!t || !l || !k || v.length === 0) return;
    const H = w?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!H) return;
    const j = () => {
      const be = H.getBoundingClientRect();
      let Pe = null;
      for (let He = v.length - 1; He >= 0; He--) {
        const ot = v[He], Wt = yl(t, ot.pos);
        if (Wt && Wt.getBoundingClientRect().top - be.top <= h + 10) {
          Pe = ot.id;
          break;
        }
      }
      !Pe && v.length > 0 && (Pe = v[0].id), y(Pe);
    };
    let ee;
    const ge = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(j);
    };
    return H.addEventListener("scroll", ge, { passive: !0 }), j(), () => {
      H.removeEventListener("scroll", ge), cancelAnimationFrame(ee);
    };
  }, [t, v, l, k, h, w]);
  const P = U((H) => {
    if (!t || t.isDestroyed) return;
    const j = yl(t, H.pos);
    if (j) {
      const ee = w?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const ge = ee.getBoundingClientRect(), Pe = j.getBoundingClientRect().top - ge.top + ee.scrollTop;
        ee.scrollTo({ top: Pe - h, behavior: "smooth" });
      } else
        j.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(H.pos + 1);
    } catch {
    }
    y(H.id), p?.(H);
  }, [t, h, p, w]), z = U(() => {
    const H = !k;
    S(H), o?.(H);
  }, [k, o]), X = U((H) => {
    T((j) => {
      const ee = new Set(j);
      return ee.has(H) ? ee.delete(H) : ee.add(H), ee;
    });
  }, []), G = U((H, j, ee = 0) => {
    if (g)
      return g(H, j, () => P(H));
    const ge = (H.level - s) * 14, be = c && H.children && H.children.length > 0, Pe = x.has(H.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${j ? "toc-item-active" : ""} toc-level-${H.level}`,
        style: { paddingLeft: `${ge + 10}px` },
        children: /* @__PURE__ */ m(
          "button",
          {
            className: "toc-item-button",
            onClick: () => P(H),
            title: H.text,
            children: [
              be && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (He) => {
                    He.stopPropagation(), X(H.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: Pe ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
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
                H.level
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 347,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: H.text }, void 0, !1, {
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
      H.id,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 320,
        columnNumber: 7
      },
      this
    );
  }, [g, P, c, s, i, x, X]), Z = U((H, j = 0) => H.map((ee) => {
    const ge = C === ee.id, be = x.has(ee.id), Pe = ee.children && ee.children.length > 0;
    return /* @__PURE__ */ m("div", { children: [
      G(ee, ge, j),
      Pe && !be && /* @__PURE__ */ m("div", { className: "toc-children", children: Z(ee.children, j + 1) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 364,
        columnNumber: 13
      }, this)
    ] }, ee.id, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 361,
      columnNumber: 9
    }, this);
  }), [C, x, G]), te = U(() => v.map((H) => {
    const j = C === H.id;
    return G(H, j);
  }), [v, C, G]);
  if (!t) return null;
  const _ = c ? ux(v) : [];
  return /* @__PURE__ */ m(Be, { children: [
    b && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: z,
        title: k ? "Hide Table of Contents" : "Show Table of Contents",
        children: k ? /* @__PURE__ */ m(ef, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 24
        }, this) : /* @__PURE__ */ m(tf, { size: 16 }, void 0, !1, {
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
        ref: A,
        className: `toc-sidebar ${k ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: k ? `${M}px` : "0px" },
        children: [
          k && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: q
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
            }, this) : /* @__PURE__ */ m("div", { className: "toc-list", children: c ? Z(_) : te() }, void 0, !1, {
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
});
let Lt = null, Sr = null;
async function wd() {
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
      const u = c, d = u.getAttribute("src") || "", h = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), p = u.getAttribute("width"), g = p ? parseInt(p, 10) : null, b = u.getAttribute("data-align") || "left", w = [h], v = b !== "left", N = g && g > 0;
      return (v || N) && w.push(v ? b : "left"), N && w.push(String(g)), `![${w.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (l) => l.nodeName === "FIGURE" && l.classList.contains("image-resizer"),
    replacement: (l, c) => {
      const u = c.querySelector("img");
      if (!u) return l;
      const d = u.getAttribute("src") || "", h = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), p = u.getAttribute("width"), g = p ? parseInt(p, 10) : null, b = u.getAttribute("data-align") || "left", w = [h], v = b !== "left", N = g && g > 0;
      (v || N) && w.push(v ? b : "left"), N && w.push(String(g));
      const C = `![${w.join(" | ")}](${d})`, y = c.parentNode;
      return y && y.nodeName === "LI" ? `
` + C + `
` : `

` + C + `

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
    const c = l.getAttribute("src") || "", d = (l.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = l.getAttribute("width"), h = f ? parseInt(f, 10) : null, p = l.getAttribute("data-align") || "left", g = [d], b = p !== "left", w = h && h > 0;
    return (b || w) && g.push(b ? p : "left"), w && g.push(String(h)), `![${g.join(" \\| ")}](${c})`;
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
    const d = "  ".repeat(u), f = l.nodeName;
    Array.from(l.childNodes).filter(
      (p) => p.nodeType === Node.ELEMENT_NODE && p.nodeName === "LI"
    ).forEach((p, g) => {
      const b = p.getAttribute("data-type") === "taskItem", w = p.getAttribute("data-checked") === "true", v = s(p);
      b ? c.push(`${d}- [${w ? "x" : " "}] ${v}`) : f === "OL" ? c.push(`${d}${g + 1}. ${v}`) : c.push(`${d}- ${v}`);
      const N = Array.from(p.childNodes).filter(
        (C) => C.nodeType === Node.ELEMENT_NODE && (C.nodeName === "UL" || C.nodeName === "OL")
      );
      for (const C of N)
        a(C, c, u + 1);
    });
  }
  function i(l) {
    const c = [];
    for (const u of Array.from(l.childNodes)) {
      if (u.nodeType !== Node.ELEMENT_NODE) {
        const p = (u.textContent || "").trim();
        p && c.push(p.replace(/\|/g, "\\|"));
        continue;
      }
      const d = u, f = d.nodeName;
      if (f === "UL" || f === "OL") {
        a(d, c, 0);
        continue;
      }
      if (f === "FIGURE") {
        const p = d.querySelector("img");
        p && c.push(o(p));
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
      d.forEach((g, b) => {
        const w = Array.from(g.querySelectorAll("th, td")), v = w.map((N) => i(N));
        if (b > 0 && w.length > 0 && w[0].nodeName === "TH" && (h = !0), f.push("| " + v.join(" | ") + " |"), b === 0) {
          const N = w.map(() => "---").join(" | ");
          f.push("| " + N + " |");
        }
      });
      const p = h ? `
<!-- header-column -->` : "";
      return `

` + f.join(`
`) + p + `

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
      return u ? `@${Yb(u)}@` : l;
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
  }), Lt = n, n;
}
function dx() {
  !Sr && !Lt && (Sr = wd().then((e) => (Lt = e, e)));
}
function mx() {
  return dx(), {
    turndown(e) {
      return Lt ? Lt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return Lt !== null;
    },
    async ready() {
      Lt || (Sr ? await Sr : await wd());
    }
  };
}
function fx() {
  const e = V(null);
  return e.current || (e.current = mx()), e.current;
}
function hx(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), o = n.body.firstElementChild;
  if (!o) return e;
  const r = (a) => {
    Array.from(a.querySelectorAll("ul")).forEach(r);
    const l = Array.from(a.children).filter((f) => f.tagName === "LI");
    let c = !1, u = !1;
    const d = (f) => {
      const h = f.querySelector(':scope > input[type="checkbox"]');
      if (h) return h;
      const p = f.querySelector(":scope > p");
      if (p) {
        const g = p.querySelector(':scope > input[type="checkbox"]');
        if (g) return g;
      }
      return null;
    };
    l.forEach((f) => {
      d(f) ? c = !0 : u = !0;
    }), c && (l.forEach((f) => {
      const h = d(f);
      if (h) {
        const p = h.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(p));
        const g = h.parentElement, b = g && g.tagName === "P" && g.parentElement === f;
        h.remove(), b && g.firstChild && g.firstChild.nodeType === Node.TEXT_NODE && (g.firstChild.textContent = (g.firstChild.textContent || "").replace(/^\s+/, ""));
        const w = Array.from(f.childNodes), v = [], N = [];
        if (w.forEach((C) => {
          if (C.nodeType === Node.ELEMENT_NODE) {
            const y = C;
            if (y.tagName === "UL" || y.tagName === "OL" || y.tagName === "P")
              N.push(C);
            else if (y.tagName === "IMG" || y.tagName === "FIGURE")
              if (y.tagName === "IMG") {
                const k = n.createElement("figure");
                k.className = "image-resizer";
                const S = y.getAttribute("data-align") || "left", x = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[S] || "margin-right: auto;";
                k.style.cssText = x, k.appendChild(y.cloneNode(!0)), N.push(k);
              } else
                N.push(C);
            else
              v.push(C);
          } else
            v.push(C);
        }), f.innerHTML = "", v.length > 0) {
          const C = n.createElement("p");
          v.forEach((y) => C.appendChild(y)), C.firstChild && C.firstChild.nodeType === Node.TEXT_NODE && (C.firstChild.textContent = (C.firstChild.textContent || "").replace(/^\s+/, "")), f.appendChild(C);
        }
        N.forEach((C) => f.appendChild(C));
      }
    }), c && !u && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(o.querySelectorAll(":scope > ul")).forEach(r), o.innerHTML;
}
function px(e) {
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
          const p = d.getAttribute("data-align") || "left", g = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          h.style.cssText = g[p] || "margin-right: auto;", h.appendChild(d.cloneNode(!0)), c.push(h);
        } else if (f === "P")
          if (d.querySelectorAll("img").length === 0)
            c.push(u);
          else {
            const p = Array.from(d.childNodes), g = [];
            if (p.forEach((b) => {
              if (b.nodeType === Node.ELEMENT_NODE && b.tagName === "IMG") {
                if (g.length > 0) {
                  const y = n.createElement("p");
                  g.forEach((k) => y.appendChild(k.cloneNode(!0))), y.textContent?.trim() && c.push(y), g.length = 0;
                }
                const w = b, v = n.createElement("figure");
                v.className = "image-resizer";
                const N = w.getAttribute("data-align") || "left", C = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = C[N] || "margin-right: auto;", v.appendChild(w.cloneNode(!0)), c.push(v);
              } else
                g.push(b);
            }), g.length > 0) {
              const b = n.createElement("p");
              g.forEach((w) => b.appendChild(w.cloneNode(!0))), b.textContent?.trim() && c.push(b);
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
const gx = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, d1 = bm(function({
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
  autoSave: f = !0,
  autoSaveKey: h = "paragon-editor-content",
  autoSaveDelay: p = 1e3,
  showRecoveryBanner: g = !0,
  showFloatingToolbar: b = !0,
  maxImageSize: w = 5 * 1024 * 1024,
  onImageUploadStart: v,
  onImageUploadComplete: N,
  onImageUploadError: C,
  onImageUpload: y,
  resolveImageSrc: k,
  showModeToggle: S = !0,
  // New props
  initialMode: x = "wysiwyg",
  onModeChange: T,
  onReady: M,
  onFocus: D,
  onBlur: A,
  onSelectionChange: I,
  onDestroy: L,
  onSave: $,
  onRecover: W,
  onWikiLinkClick: q,
  validateWikiLink: R,
  onWikiLinkSearch: P,
  onLinkClick: z,
  findReplaceOpen: X,
  onFindReplaceChange: G,
  renderToolbar: Z,
  renderFooter: te,
  disabledFeatures: _ = {},
  minHeight: H = "200px",
  maxHeight: j,
  spellCheck: ee = !0,
  headingLevels: ge = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: be = [1, 2, 3],
  // TOC props
  showTableOfContents: Pe = !1,
  tocVisible: He = !0,
  onTocVisibilityChange: ot,
  tocTitle: Wt = "",
  tocMinLevel: eo = 1,
  tocMaxLevel: to = 4,
  tocShowLevelIndicators: _o = !1,
  tocHighlightActive: $o = !0,
  tocTreeView: Bo = !1,
  tocWidth: Ho = "240px",
  tocPosition: vn = "right",
  tocScrollOffset: no = 20,
  onTocItemClick: wn,
  renderTocItem: Nn,
  tocShowToggleButton: Wo = !0,
  // Raw markdown editor
  autoClosePairs: qr = !0,
  // Performance profiler
  showPerformanceProfiler: Xr = !1,
  onPerformanceProfilerClose: Zr,
  // Auto reorder checklist
  autoReorderChecklist: Qr = !1,
  // Expand selection
  progressiveSelectAll: Fo = !1,
  // Auto-detection toggles
  enableTagAutoDetect: zo = !1,
  enableHexColorHighlight: Jr = !1,
  enableCollapsibleHeadings: Uo = !1,
  // Performance mode
  performanceMode: oo = "auto",
  // Error boundary
  onEditorError: es,
  // AI writing assistant
  aiActions: mt,
  onAIAction: yn,
  onAISetupRequired: ce
}, Ce) {
  const [ie] = K(() => gx()), [we, Ve] = K(x), [ve, ro] = K(""), qe = V(x), kt = V(""), xt = V(null), [so, Qi] = K(0), Yo = !!(mt && mt.length > 0 && yn), { state: Ze, executeAction: jo, abort: kd, reset: Ft } = ox(yn), [ts, ns] = K(null), [xd, Cd] = K({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), Ed = V(yn);
  Ed.current = yn;
  const Ji = V(ce);
  Ji.current = ce;
  const [Td, Md] = K([]), [Sd, Dd] = K(0), Ad = U((B, F) => {
    Md(B), Dd(F);
  }, []), os = V(v), rs = V(N), ss = V(C), is = V(y), as = V(k), ea = V(q), ls = V(R), cs = V(P);
  os.current = v, rs.current = N, ss.current = C, is.current = y, as.current = k, ea.current = q, ls.current = R, cs.current = P;
  const ta = 2e3, [Ct, Pd] = K(() => oo === "lightweight" ? !0 : oo === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > ta : !1), us = V(0), na = V(Ct);
  na.current = Ct;
  const Rd = Pn(() => {
    const B = [
      Vd.configure({
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
      Pf,
      Rf,
      Of,
      Gd.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      qd.configure({
        types: ["heading", "paragraph"]
      }),
      Xd.configure({
        multicolor: !0
      }),
      Zd.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      cm,
      um,
      dm,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...Ct ? [] : [mm],
      mk,
      pk,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...Ct ? [] : [Wk],
      vk,
      // Add HorizontalRule back without its built-in input rules
      // We handle HR creation via our custom space shortcut handler
      pf.extend({
        addInputRules() {
          return [];
        }
      })
    ];
    return _.tables || B.push(
      Qd.configure({
        resizable: !ie,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Jd,
      kf,
      xf,
      ...Ct ? [] : [Af]
    ), _.taskLists || B.push(
      If.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Lf.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !ie && !Ct && B.push(
      $f.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), _.codeBlocks || B.push(Wf), _.callouts || B.push(Kf, hk), Uo && !_.collapsibleHeadings && !Ct && B.push(
      ck.configure({
        levels: be
      })
    ), _.images || B.push(
      Vf.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (F) => {
          Vo({
            isOpen: !0,
            src: F.src,
            alt: F.alt,
            pos: F.pos,
            position: { x: F.rect.left + F.rect.width / 2, y: F.rect.bottom }
          });
        },
        resolveImageSrc: as.current ? ((...F) => as.current(...F)) : void 0
      }),
      Gk.configure({
        maxFileSize: w,
        onUploadStart: os.current ? ((...F) => os.current(...F)) : void 0,
        onUploadComplete: rs.current ? ((...F) => rs.current(...F)) : void 0,
        onUploadError: ss.current ? ((...F) => ss.current(...F)) : void 0,
        onImageUpload: is.current ? ((F, pe) => is.current(F, pe)) : void 0
      })
    ), _.datePills || B.push(
      Kb.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), _.tagPills || B.push(
      qb.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: zo
      })
    ), _.wikiLinks || B.push(
      Jy.configure({
        onWikiLinkClick: (F) => {
          console.log("WikiLink clicked:", F), ea.current?.(F);
        },
        validateLink: (F) => ls.current ? ls.current(F) : !0
      })
    ), Fo && B.push(Ik), Jr && !Ct && B.push(Bk), _.markdownPaste || B.push(
      ik.configure({
        enableMarkdownPaste: !0
      })
    ), B;
  }, [s, ie, w, ge, be, _, Fo, Uo, Ct]), Et = V(null), nn = V(n), on = V(o), ds = V(r), io = V(null);
  nn.current = n, on.current = o, ds.current = r;
  const O = jd({
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
    onCreate: ({ editor: B }) => {
      window.__tiptapEditor = B, M?.(B);
    },
    onDestroy: () => {
      L?.();
    },
    extensions: Rd,
    content: t,
    editable: a,
    autofocus: i,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: ee ? "true" : "false"
      },
      handleClick: (B, F, pe) => {
        if (z) {
          const ke = pe.target.closest("a");
          if (ke) {
            const Me = ke.getAttribute("href");
            if (Me && z(Me, pe) === !1)
              return pe.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: B }) => {
      if (oo === "auto" && (us.current++, us.current >= 50)) {
        us.current = 0;
        const pe = B.state.doc.content.childCount > ta;
        pe !== na.current && Pd(pe);
      }
      Et.current && clearTimeout(Et.current), Et.current = setTimeout(() => {
        if (B.isDestroyed) return;
        const F = B.getHTML();
        (nn.current || on.current) && (nn.current?.(F), on.current?.(F));
      }, 150);
    },
    onFocus: () => {
      D?.();
    },
    onBlur: () => {
      if (Et.current && (clearTimeout(Et.current), Et.current = null, O && !O.isDestroyed)) {
        const B = O.getHTML();
        if ((nn.current || on.current) && (nn.current?.(B), on.current?.(B)), qe.current === "wysiwyg" && io.current) {
          const F = io.current.turndown(B);
          kt.current = F, ds.current?.(F);
        }
      }
      A?.();
    },
    onSelectionUpdate: ({ editor: B }) => {
      if (I) {
        const { from: F, to: pe, empty: me } = B.state.selection;
        I({ from: F, to: pe, empty: me });
      }
    }
  });
  Q(() => () => {
    if (Et.current && (clearTimeout(Et.current), Et.current = null, O && !O.isDestroyed)) {
      const B = O.getHTML();
      if ((nn.current || on.current) && (nn.current?.(B), on.current?.(B)), qe.current === "wysiwyg" && io.current) {
        const F = io.current.turndown(B);
        kt.current = F, ds.current?.(F);
      }
    }
  }, []);
  const [oa, Ko] = K(!1), [kn, Vo] = K(null), [Id, Ld] = K(!1), Od = X !== void 0 ? X : Id, zt = U((B) => {
    Ld(B), G?.(B);
  }, [G]), [_d, ms] = K(0), [$d, Bd] = K(""), Tt = Vy(O, {
    storageKey: h,
    debounceMs: p,
    enabled: f,
    onSave: (B) => {
      $?.(B);
    },
    onRecover: (B) => {
      W?.(B);
    }
  }), Ut = fx();
  io.current = Ut;
  const ra = V(!1);
  Q(() => {
    if (!ra.current && x === "markdown" && O && !O.isDestroyed && Ut) {
      const B = O.getHTML(), F = Ut.turndown(B);
      ro(F), kt.current = F, ra.current = !0;
    }
  }, [O, Ut, x]);
  const ft = U(async (B) => {
    if (O) {
      if (B === "markdown" && qe.current === "wysiwyg") {
        const F = O.getHTML(), pe = Ut.turndown(F);
        ro(pe), kt.current = pe;
      } else if (B === "wysiwyg" && qe.current === "markdown") {
        const { marked: F } = await import("./marked.esm-Tjr8Gfse.js"), pe = ["info", "note", "prompt", "resources", "todo"];
        let me = kt.current;
        pe.forEach((ae) => {
          const se = new RegExp(`\`\`\`ad-${ae}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          me = me.replace(se, (Ne, ue) => {
            const Te = F.parse(ue.trim(), { async: !1 });
            return `<div data-callout="" data-type="${ae}" class="callout callout-${ae}">${Te}</div>`;
          });
        }), pe.forEach((ae) => {
          const se = new RegExp(`\`\`\`${ae}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          me = me.replace(se, (Ne, ue) => {
            const Te = F.parse(ue.trim(), { async: !1 });
            return `<div data-callout="" data-type="${ae}" class="callout callout-${ae}">${Te}</div>`;
          });
        }), me = me.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (ae, se, Ne) => {
          const ue = se.split("|").map((Mt) => Mt.trim());
          let Te = "", We = "left", Re = null;
          ue.length === 1 ? Te = ue[0] : ue.length === 2 ? (Te = ue[0], /^\d+$/.test(ue[1]) ? Re = ue[1] : ["left", "center", "right"].includes(ue[1]) ? We = ue[1] : Te = se) : ue.length === 3 ? (Te = ue[0], ["left", "center", "right"].includes(ue[1]) && (We = ue[1]), /^\d+$/.test(ue[2]) && (Re = ue[2])) : Te = se;
          const Se = Re ? ` width="${Re}" style="width: ${Re}px"` : "", jt = ` data-align="${We}"`;
          return `<img src="${Ne.trim()}" alt="${Te}"${jt}${Se} />`;
        }), me = me.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), me = me.replace(/@([^@\n]+)@/g, (ae, se) => {
          const Ne = cn(se);
          if (Ne) {
            const ue = Pi(Ne);
            return `<span data-type="date-pill" data-date="${Ne}" class="date-pill ${ue}"><span class="date-icon">📅</span><span class="date-text">${se.trim()}</span></span>`;
          }
          return ae;
        }), zo && !_.tagPills && (me = me.replace(new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"), (ae, se) => {
          const Ne = wo(se);
          return An(Ne) ? `<span data-type="tag-pill" data-tag="${Ne}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${Ne}</span></span>` : ae;
        })), me = me.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((ae, se) => se % 2 === 1 ? ae : ae.replace(/\[\[([^\[\]]+)\]\]/g, (Ne, ue) => `<span data-wiki-link data-page-name="${ue.trim()}" class="wiki-link">${ue.trim()}</span>`)).join("");
        let Me = F.parse(me, { async: !1 });
        Me = hx(Me), Me = px(Me), Me = Me.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (ae, se) => se.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (Ne) => Ne.replace(/<tr>([\s\S]*?)<\/tr>/gi, (ue, Te) => `<tr>${Te.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
        const le = (ae) => {
          let se = ae;
          return se = se.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), se = se.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), se = se.replace(/~~(.+?)~~/g, "<s>$1</s>"), se = se.replace(/`([^`]+)`/g, "<code>$1</code>"), se = se.replace(/==(.+?)==/g, "<mark>$1</mark>"), se = se.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), se;
        }, Ee = (ae) => {
          const se = ae.match(/data-align="([^"]*)"/), Ne = se ? se[1] : "left";
          return `<figure class="image-resizer" style="${{
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          }[Ne] || "margin-right: auto;"}">${ae.trim()}</figure>`;
        }, Yt = (ae) => {
          if (/<img\s/i.test(ae)) {
            const se = /(<img\s[^>]*\/?>)/gi;
            return ae.split(se).filter((ue) => ue.trim()).map((ue) => /^<img\s/i.test(ue) ? Ee(ue) : ue.trim() ? `<p>${le(ue.trim())}</p>` : "").join("");
          }
          if (/^!\[/.test(ae)) {
            const se = ae.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (se)
              return `<figure class="image-resizer" style="margin-right: auto;"><img src="${se[2]}" alt="${se[1]}" data-align="left" /></figure>`;
          }
          return `<p>${le(ae)}</p>`;
        }, ao = (ae) => {
          const se = ae.match(/^( *)/), Ne = se ? se[1].length : 0, ue = Math.floor(Ne / 2), Te = ae.trimStart(), We = Te.match(/^-\s*\[(x| )\]\s*(.*)$/);
          if (We)
            return { type: "task", depth: ue, text: We[2].trim(), checked: We[1] === "x" };
          const Re = Te.match(/^-\s+(.+)$/);
          if (Re)
            return { type: "ul", depth: ue, text: Re[1].trim() };
          const Se = Te.match(/^(\d+)\.\s+(.+)$/);
          return Se ? { type: "ol", depth: ue, text: Se[2].trim(), index: parseInt(Se[1], 10) } : null;
        }, Go = (ae) => {
          if (ae.length === 0) return "";
          const se = (Te, We) => {
            let Re = "", Se = Te;
            const jt = ae[Se]?.type || "ul", Mt = jt === "task", Kt = Mt ? '<ul data-type="taskList">' : `<${jt === "ol" ? "ol" : "ul"}>`, lo = Mt ? "</ul>" : `</${jt === "ol" ? "ol" : "ul"}>`;
            for (Re += Kt; Se < ae.length && ae[Se].depth >= We; ) {
              const St = ae[Se];
              if (St.depth === We) {
                if (Mt ? Re += `<li data-type="taskItem" data-checked="${St.checked || !1}"><p>${le(St.text)}</p>` : Re += `<li><p>${le(St.text)}</p>`, Se + 1 < ae.length && ae[Se + 1].depth > We) {
                  const sn = se(Se + 1, ae[Se + 1].depth);
                  Re += sn.html, Se = sn.nextIdx;
                } else
                  Se++;
                Re += "</li>";
              } else
                Se++;
            }
            return Re += lo, { html: Re, nextIdx: Se };
          }, Ne = Math.min(...ae.map((Te) => Te.depth));
          return se(0, Ne).html;
        };
        Me = Me.replace(
          /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
          (ae, se, Ne, ue) => {
            const Te = /<img\s/i.test(Ne), We = /<br\s*\/?>/i.test(Ne), Re = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(Ne);
            if (!Te && !We && !Re) return ae;
            let Se = Ne.trim();
            Se = Se.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
            const jt = Se.split(/<br\s*\/?>/i).filter((St) => St.trim());
            if (jt.length <= 1 && !Re)
              return Te ? `${se}${Yt(Se)}${ue}` : ae;
            const Mt = [];
            let Kt = [];
            const lo = () => {
              Kt.length !== 0 && (Mt.push(Go(Kt)), Kt = []);
            };
            for (const St of jt) {
              const sn = ao(St);
              if (sn) {
                if (Kt.length > 0) {
                  const Yd = Kt[0].type;
                  sn.depth === 0 && sn.type !== Yd && lo();
                }
                Kt.push(sn);
              } else
                lo(), Mt.push(Yt(St.trim()));
            }
            return lo(), `${se}${Mt.join("")}${ue}`;
          }
        ), queueMicrotask(() => {
          O.isDestroyed || O.commands.setContent(Me);
        });
      }
      Ve(B), qe.current = B, T?.(B);
    }
  }, [O, Ut, T]), sa = U((B) => {
    ro(B), kt.current = B, r?.(B);
  }, [r]), rn = qy(O, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: u
  });
  vm(Ce, () => ({
    getEditor: () => O,
    getHTML: () => O?.getHTML() || "",
    getMarkdown: () => O ? Ut.turndown(O.getHTML()) : "",
    getText: () => O?.getText() || "",
    setContent: (B) => {
      O && !O.isDestroyed && queueMicrotask(() => {
        O.commands.setContent(B);
      });
    },
    clearContent: () => {
      O && !O.isDestroyed && O.commands.clearContent();
    },
    focus: (B) => {
      O && !O.isDestroyed && O.commands.focus(B);
    },
    blur: () => {
      O && !O.isDestroyed && O.commands.blur();
    },
    isEmpty: () => O?.isEmpty || !0,
    isFocused: () => O?.isFocused || !1,
    getMode: () => qe.current,
    setMode: (B) => ft(B),
    toggleMode: () => {
      const B = qe.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return ft(B), B;
    },
    getWordCount: () => ({
      words: rn.words,
      characters: rn.characters,
      charactersWithSpaces: rn.charactersWithSpaces
    }),
    undo: () => O?.commands.undo(),
    redo: () => O?.commands.redo(),
    canUndo: () => O?.can().undo() || !1,
    canRedo: () => O?.can().redo() || !1,
    insertContent: (B) => O?.commands.insertContent(B),
    insertImage: (B, F = "") => O?.commands.setImage({ src: B, alt: F }),
    insertTable: (B = 3, F = 3) => O?.commands.insertTable({ rows: B, cols: F, withHeaderRow: !0 }),
    insertCodeBlock: (B) => {
      B ? O?.commands.setCodeBlock({ language: B }) : O?.commands.setCodeBlock();
    },
    insertCallout: (B = "info") => O?.commands.insertCallout?.({ type: B }),
    insertHorizontalRule: () => {
      O && dr(O, O.state.selection.from, O.state.selection.from);
    },
    toggleBold: () => O?.commands.toggleBold(),
    toggleItalic: () => O?.commands.toggleItalic(),
    toggleUnderline: () => O?.commands.toggleUnderline(),
    toggleStrike: () => O?.commands.toggleStrike(),
    toggleCode: () => O?.commands.toggleCode(),
    toggleHighlight: () => O?.commands.toggleHighlight(),
    setHeading: (B) => {
      B === 0 ? O?.commands.setParagraph() : O?.commands.setHeading({ level: B });
    },
    toggleBulletList: () => O?.commands.toggleBulletList(),
    toggleOrderedList: () => O?.commands.toggleOrderedList(),
    toggleTaskList: () => O?.commands.toggleTaskList(),
    toggleBlockquote: () => O?.commands.toggleBlockquote(),
    setLink: (B) => O?.commands.setLink({ href: B }),
    unsetLink: () => O?.commands.unsetLink(),
    openFindReplace: () => {
      zt(!0), ms((B) => B + 1);
    },
    closeFindReplace: () => zt(!1),
    save: () => Tt.save(),
    clearSavedContent: () => Tt.clear(),
    getSelectedText: () => {
      if (!O) return "";
      const { from: B, to: F } = O.state.selection;
      return O.state.doc.textBetween(B, F, " ");
    },
    isEditable: () => O?.isEditable || !1,
    setEditable: (B) => O?.setEditable(B),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!O) return [];
      const B = [];
      return O.state.doc.descendants((F, pe) => {
        if (F.type.name === "heading") {
          const me = F.attrs.level, ke = F.textContent.trim();
          ke && B.push({ id: `toc-heading-${pe}`, text: ke, level: me, pos: pe });
        }
      }), B;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (B) => {
      if (!(!O || O.isDestroyed))
        try {
          const F = O.state.doc.resolve(B), pe = O.view.nodeDOM(F.before(F.depth + 1));
          if (pe instanceof HTMLElement) {
            const me = O.view.dom.closest(".editor-content-wrapper");
            if (me) {
              const ke = me.getBoundingClientRect(), le = pe.getBoundingClientRect().top - ke.top + me.scrollTop;
              me.scrollTo({ top: le - 20, behavior: "smooth" });
            } else
              pe.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          O.commands.setTextSelection(B + 1);
        } catch {
        }
    }
  }), [O, Ut, ft, rn, Tt, zt]), Q(() => {
    const B = {
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
        const pe = (me) => {
          F(me.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", pe), () => window.removeEventListener("paragon-editor-mode-change", pe);
      }
    };
    return window.__paragonEditorModeAPI = B, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [ft]), Q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: we } }));
  }, [we]), Q(() => {
    if (!O || O.isDestroyed) return;
    const B = (F) => {
      if (O.isDestroyed) return;
      const pe = F.key;
      if (!(!(F.metaKey || F.ctrlKey) && pe !== " ")) {
        if ((F.metaKey || F.ctrlKey) && F.key === "k") {
          F.preventDefault(), Ko(!0);
          return;
        }
        if (!ie && (F.metaKey || F.ctrlKey) && F.key === "f") {
          if (F.preventDefault(), O) {
            const { state: ke } = O, { from: Me, to: le } = ke.selection;
            if (Me !== le) {
              const Ee = ke.doc.textBetween(Me, le, " ");
              Ee.trim() && Bd(Ee.trim());
            }
          }
          zt(!0), ms((ke) => ke + 1);
          return;
        }
        if (!ie && (F.metaKey || F.ctrlKey) && F.key === "h") {
          F.preventDefault(), zt(!0);
          return;
        }
        if (F.key === " ")
          try {
            const { state: ke } = O, { selection: Me } = ke, { $from: le } = Me, Ee = le.nodeBefore?.textContent || "";
            if (Ee === "#####") {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - 5, to: le.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (Ee === "####") {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - 4, to: le.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (Ee === "###") {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - 3, to: le.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (Ee === "##") {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - 2, to: le.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (Ee === "#") {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - 1, to: le.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (Ee === "-" || Ee === "*") {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - 1, to: le.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(Ee)) {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - Ee.length, to: le.pos }).toggleOrderedList().run();
              return;
            }
            const Yt = /^(-\s*)?\[([ x])?\]$/.exec(Ee);
            if (Yt) {
              F.preventDefault();
              const ao = Yt[2] === "x", Go = ke.schema.nodes.taskList, ae = ke.schema.nodes.taskItem;
              if (Go && ae) {
                const se = ke.tr, Ne = le.pos - Ee.length, ue = le.pos;
                se.delete(Ne, ue);
                const We = se.doc.resolve(Ne).blockRange();
                if (We) {
                  const Re = [
                    { type: Go, attrs: {} },
                    { type: ae, attrs: { checked: ao } }
                  ];
                  se.wrap(We, Re), O.view.dispatch(se);
                  return;
                }
              }
              O.chain().focus().deleteRange({ from: le.pos - Ee.length, to: le.pos }).toggleTaskList().run();
              return;
            }
            if (Ee === ">") {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - 1, to: le.pos }).toggleBlockquote().run();
              return;
            }
            if (Ee === "```") {
              F.preventDefault(), O.chain().focus().deleteRange({ from: le.pos - 3, to: le.pos }).toggleCodeBlock().run();
              return;
            }
            if (Ee === "---" || Ee === "***") {
              F.preventDefault(), dr(O, le.pos - 3, le.pos);
              return;
            }
            if (Ee === "—-") {
              F.preventDefault(), dr(O, le.pos - 2, le.pos);
              return;
            }
            if (Ee === "—") {
              F.preventDefault(), dr(O, le.pos - 1, le.pos);
              return;
            }
          } catch (ke) {
            console.warn("Space shortcut error:", ke);
          }
      }
    };
    return document.addEventListener("keydown", B, !0), () => document.removeEventListener("keydown", B, !0);
  }, [O, ie, zt]);
  const ia = U((B, F) => {
    if (!Yo) {
      Ji.current?.();
      return;
    }
    if (!O) return;
    let pe = { top: 0, left: 0 };
    if (F) {
      const me = F.getBoundingClientRect();
      pe = { top: me.bottom + 4, left: me.left };
    } else {
      const { from: me, to: ke } = O.state.selection, Me = O.view.coordsAtPos(me), le = O.view.coordsAtPos(ke);
      pe = { top: le.bottom + 8, left: (Me.left + le.left) / 2 };
    }
    ns({ scope: B, position: pe });
  }, [Yo, O]), Hd = U((B, F) => {
    if (!O || !mt) return;
    const pe = mt.find((ao) => ao.id === B);
    if (!pe) return;
    const { from: me, to: ke } = O.state.selection, Me = me !== ke ? O.state.doc.textBetween(me, ke, `
`) : "", le = pe.scope === "document" || !Me ? O.getText() : Me, Ee = O.view.coordsAtPos(me), Yt = O.view.coordsAtPos(ke);
    Cd({
      selectionTop: Ee.top,
      selectionBottom: Yt.bottom,
      selectionCenterX: (Ee.left + Yt.right) / 2
    }), ns(null), jo(B, pe.label, le, { from: me, to: ke }, F);
  }, [O, mt, jo]), Wd = U(() => {
    if (!O || Ze.status !== "complete") return;
    const { selectionRange: B, result: F } = Ze;
    O.chain().focus().setTextSelection(B).deleteSelection().insertContent(F).run(), Ft();
  }, [O, Ze, Ft]), Fd = U(() => {
    if (!O || Ze.status !== "complete") return;
    const { selectionRange: B, result: F } = Ze;
    O.chain().focus().setTextSelection(B.to).insertContent(`
` + F).run(), Ft();
  }, [O, Ze, Ft]), zd = U(() => {
    if (!(Ze.status !== "complete" && Ze.status !== "error"))
      if (Ze.status === "complete") {
        const { action: B, actionLabel: F, inputText: pe, selectionRange: me } = Ze;
        Ft(), jo(B, F, pe, me);
      } else
        Ft();
  }, [Ze, Ft, jo]);
  if (!O)
    return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: /* @__PURE__ */ m("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2203,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2204,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2205,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2206,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2207,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2208,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2202,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2201,
      columnNumber: 7
    }, this);
  const aa = /* @__PURE__ */ m(
    Fy,
    {
      editor: O,
      onOpenLinkPopover: () => Ko(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        zt(!0), ms((B) => B + 1);
      },
      disabledFeatures: _,
      autoReorderChecklist: Qr,
      aiEnabled: Yo || !!ce,
      onAISparklesClick: (B) => ia("document", B)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2216,
      columnNumber: 5
    },
    this
  ), la = /* @__PURE__ */ m("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ m(
      Xy,
      {
        status: Tt.status,
        lastSaved: Tt.lastSaved
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2235,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ m("span", { children: [
      rn.words,
      " words"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2241,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2240,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 2233,
    columnNumber: 5
  }, this), Ud = {
    minHeight: H,
    ...j && { maxHeight: j, overflowY: "auto" }
  };
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: [
    f && g && Tt.hasRecoverableContent && /* @__PURE__ */ m(
      Zy,
      {
        onRecover: () => {
          Tt.recover();
        },
        onDismiss: Tt.dismissRecovery
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2256,
        columnNumber: 9
      },
      this
    ),
    c && /* @__PURE__ */ m("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z(O, aa) : aa,
      S && /* @__PURE__ */ m("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => ft("wysiwyg"),
            className: `editor-mode-toggle-btn ${we === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ m(nf, {}, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 2275,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 2270,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => ft("markdown"),
            className: `editor-mode-toggle-btn ${we === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ m(Ni, {}, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 2282,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 2277,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2269,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2266,
      columnNumber: 9
    }, this),
    !ie && /* @__PURE__ */ m(
      zy,
      {
        editor: O,
        isOpen: Od,
        onClose: () => zt(!1),
        focusTrigger: _d,
        initialSearchQuery: $d,
        editorMode: we,
        rawMarkdown: ve,
        onRawMarkdownChange: sa,
        onMatchesChange: Ad
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 2291,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(jy, { editor: O }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2305,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("div", { className: `editor-main-area ${Pe ? "editor-with-toc" : ""}`, children: [
      Pe && vn === "left" && /* @__PURE__ */ m(
        kl,
        {
          editor: O,
          visible: He,
          onVisibilityChange: ot,
          title: Wt,
          minLevel: eo,
          maxLevel: to,
          showLevelIndicators: _o,
          highlightActive: $o,
          treeView: Bo,
          width: Ho,
          position: vn,
          scrollOffset: no,
          onItemClick: wn,
          renderItem: Nn,
          showToggleButton: Wo,
          scrollContainerRef: xt
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 2311,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ m(
        ex,
        {
          resetKey: `${t}-${so}`,
          onRetry: () => Qi((B) => B + 1),
          onClearContent: () => {
            O && O.commands.clearContent(), n?.(""), o?.(""), r?.(""), Qi((B) => B + 1);
          },
          onError: es,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: xt, style: Ud, children: we === "wysiwyg" ? /* @__PURE__ */ m(Be, { children: [
              /* @__PURE__ */ m(Kd, { editor: O, className: "editor-content" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 2348,
                columnNumber: 13
              }, this),
              !_.images && !_.dragAndDrop && /* @__PURE__ */ m(qk, { containerRef: xt, enabled: a }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 2352,
                columnNumber: 15
              }, this),
              !ie && b && /* @__PURE__ */ m(Yf, { editor: O, suppressWhenLinkPopoverOpen: oa, aiEnabled: Yo || !!ce, onAISparklesClick: (B) => ia("selection", B) }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 2358,
                columnNumber: 50
              }, this),
              ts && mt && /* @__PURE__ */ m(
                sx,
                {
                  actions: mt,
                  scope: ts.scope,
                  position: ts.position,
                  onAction: Hd,
                  onClose: () => ns(null)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 2362,
                  columnNumber: 15
                },
                this
              ),
              Ze.status !== "idle" && /* @__PURE__ */ m(
                ix,
                {
                  state: Ze,
                  position: xd,
                  onReplace: Wd,
                  onInsert: Fd,
                  onRetry: zd,
                  onDiscard: () => {
                    kd(), Ft();
                  }
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 2373,
                  columnNumber: 15
                },
                this
              ),
              !_.slashCommands && /* @__PURE__ */ m(tv, { editor: O, disabledFeatures: _ }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 2384,
                columnNumber: 49
              }, this),
              !_.wikiLinks && cs.current && /* @__PURE__ */ m(
                iv,
                {
                  editor: O,
                  onSearch: cs.current
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 2388,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ m(
                Ff,
                {
                  editor: O,
                  isOpen: oa,
                  onClose: () => Ko(!1)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 2395,
                  columnNumber: 13
                },
                this
              ),
              !ie && /* @__PURE__ */ m(
                zf,
                {
                  editor: O,
                  onEditLink: () => Ko(!0)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 2403,
                  columnNumber: 15
                },
                this
              ),
              !_.images && kn?.isOpen && /* @__PURE__ */ m(
                Xk,
                {
                  src: kn.src,
                  alt: kn.alt,
                  position: kn.position,
                  onSave: (B, F) => {
                    O.chain().focus().setNodeSelection(kn.pos).updateAttributes("resizableImage", {
                      src: B,
                      alt: F
                    }).run(), Vo(null);
                  },
                  onDelete: () => {
                    O.chain().focus().setNodeSelection(kn.pos).deleteSelection().run(), Vo(null);
                  },
                  onClose: () => Vo(null)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 2411,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 2347,
              columnNumber: 11
            }, this) : /* @__PURE__ */ m(
              Zk,
              {
                content: ve,
                onChange: sa,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: Td,
                currentMatchIndex: Sd,
                autoClosePairs: qr
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 2433,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 2345,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ m(tx, { scrollContainerRef: xt }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 2445,
              columnNumber: 7
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 2330,
          columnNumber: 7
        },
        this
      ),
      Pe && vn === "right" && /* @__PURE__ */ m(
        kl,
        {
          editor: O,
          visible: He,
          onVisibilityChange: ot,
          title: Wt,
          minLevel: eo,
          maxLevel: to,
          showLevelIndicators: _o,
          highlightActive: $o,
          treeView: Bo,
          width: Ho,
          position: vn,
          scrollOffset: no,
          onItemClick: wn,
          renderItem: Nn,
          showToggleButton: Wo,
          scrollContainerRef: xt
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 2449,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2308,
      columnNumber: 7
    }, this),
    u && (te ? te(
      { words: rn.words, characters: rn.characters },
      Tt.status,
      la
    ) : la),
    /* @__PURE__ */ m(Jk, { visible: Xr, onClose: Zr, editor: O }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 2482,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 2253,
    columnNumber: 5
  }, this);
}), m1 = Ar.create({
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
}), Nd = {
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
}, bx = {
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
}, vx = {
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
}, wx = {
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
}, go = {
  dark: Nd,
  light: bx,
  sepia: vx,
  nord: wx
};
function Nx(e, t) {
  Object.entries(t.variables).forEach(([n, o]) => {
    e.style.setProperty(n, o);
  });
}
function f1(e, t, n, o) {
  const r = go[e] || Nd;
  return {
    name: t,
    description: n,
    variables: {
      ...r.variables,
      ...o
    }
  };
}
const yd = Tl(null);
function h1({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [o, r] = K(t), s = go[o] || go.dark, a = U((l) => {
    go[l] && r(l);
  }, []);
  Q(() => {
    n?.current && Nx(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: o,
    setTheme: a,
    availableThemes: Object.keys(go)
  };
  return /* @__PURE__ */ m(yd.Provider, { value: i, children: e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ThemeProvider.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function p1() {
  const e = Ml(yd);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const xl = [
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
function g1({ node: e, updateAttributes: t }) {
  const [n, o] = K(!1), r = e.attrs.language || "plaintext";
  xl.find((a) => a.value === r)?.label;
  const s = U(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ m(Wn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ m("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ m("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: r,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: xl.map(({ value: a, label: i }) => /* @__PURE__ */ m("option", { value: a, children: i }, a, !1, {
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
        /* @__PURE__ */ m(Qt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
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
          children: n ? /* @__PURE__ */ m(Kn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Vn, { size: 14 }, void 0, !1, {
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
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(ii, {}, void 0, !1, {
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
  Xy as AutoSaveIndicator,
  m1 as Callout,
  hk as CalloutInputRule,
  g1 as CodeBlockComponent,
  ck as CollapsibleHeading,
  $f as CollapsibleList,
  Kb as DatePill,
  h1 as EditorThemeProvider,
  Fy as EditorToolbar,
  zy as FindReplace,
  Yf as FloatingToolbar,
  qk as ImageDropZone,
  Gk as ImageUpload,
  d1 as MarkdownEditor,
  mk as MarkdownLinkInputRule,
  ik as MarkdownPasteSafe,
  Pf as MixedBulletList,
  Of as MixedListItem,
  Rf as MixedOrderedList,
  Lf as MixedTaskItem,
  If as MixedTaskList,
  Zy as RecoveryBanner,
  Vf as ResizableImage,
  pk as SearchHighlight,
  jy as SelectAllActionBar,
  Wk as SelectAllOccurrences,
  tv as SlashCommands,
  vk as TabIndent,
  kl as TableOfContents,
  qb as TagPill,
  Jy as WikiLinkSafe,
  Nx as applyTheme,
  f1 as createCustomTheme,
  Nd as darkTheme,
  Pi as getDateVariant,
  An as isValidTag,
  bx as lightTheme,
  Bf as loadLanguageIfNeeded,
  Ae as lowlight,
  wx as nordTheme,
  wo as normalizeTag,
  cn as parseDateFromMarkdown,
  vx as sepiaTheme,
  go as themes,
  Vy as useAutoSave,
  p1 as useEditorTheme,
  qy as useWordCount
};
//# sourceMappingURL=paragon.js.map
