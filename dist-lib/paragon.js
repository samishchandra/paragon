import { jsxs as A, jsx as f, Fragment as Pe } from "react/jsx-runtime";
import { ReactNodeViewRenderer as Co, NodeViewWrapper as kr, NodeViewContent as ia, useEditorState as Fl, useEditor as Lf, EditorContent as If } from "@tiptap/react";
import Of from "@tiptap/starter-kit";
import _f from "@tiptap/extension-placeholder";
import $f from "@tiptap/extension-text-align";
import zf from "@tiptap/extension-highlight";
import Bf from "@tiptap/extension-link";
import { Table as Hf } from "@tiptap/extension-table";
import Wf from "@tiptap/extension-table-row";
import Ff from "@tiptap/extension-table-cell";
import Uf from "@tiptap/extension-table-header";
import { Plugin as je, PluginKey as Ve, TextSelection as la } from "@tiptap/pm/state";
import { DecorationSet as Ze, Decoration as at } from "@tiptap/pm/view";
import { Extension as gt, Node as So, mergeAttributes as $n, InputRule as Ke, Mark as Yf } from "@tiptap/core";
import jf from "@tiptap/extension-bullet-list";
import Vf from "@tiptap/extension-ordered-list";
import Kf from "@tiptap/extension-list-item";
import qf from "@tiptap/extension-task-list";
import Gf from "@tiptap/extension-task-item";
import { canJoin as Zf } from "@tiptap/pm/transform";
import Xf from "@tiptap/extension-underline";
import Qf from "@tiptap/extension-subscript";
import Jf from "@tiptap/extension-superscript";
import ep from "@tiptap/extension-typography";
import tp from "@tiptap/extension-code-block-lowlight";
import { createLowlight as np } from "lowlight";
import * as S from "react";
import q, { useState as j, useRef as V, useEffect as G, useCallback as F, memo as zn, createContext as Ul, useContext as Yl, useLayoutEffect as To, useMemo as rn, Component as rp, useReducer as op, forwardRef as sp, useImperativeHandle as ap } from "react";
import { ChevronDown as Ut, Check as Bn, Copy as Hn, Link2 as ca, ExternalLink as ip, Pencil as lp, Unlink as cp, Bold as ua, Italic as da, Underline as fa, Strikethrough as pa, Code as jl, Highlighter as Vl, Link as ha, Quote as ma, List as ga, ListOrdered as ya, CheckSquare as ba, FileCode as up, Sparkles as Mo, ListTodo as va, BookOpen as wa, MessageSquareText as Kl, StickyNote as ql, Info as lo, ChevronRight as Gl, ChevronLeftIcon as dp, ChevronRightIcon as fp, ChevronDownIcon as pp, Calendar as Zl, Hash as hp, Image as ka, X as Nt, Type as Eo, Heading1 as mp, Heading2 as gp, Heading3 as yp, Code2 as Xl, Table as Os, Minus as Ql, FileText as xa, Plus as Ca, Undo as bp, Redo as vp, IndentIncrease as wp, IndentDecrease as kp, PenLine as xp, Library as Cp, Columns as ki, Trash2 as Tn, Rows as xi, ToggleLeft as Ci, ArrowUpDown as Sp, Search as Tp, ChevronUp as Mp, MousePointerClick as Ep, CaseSensitive as Dp, WholeWord as Np, Regex as Rp, Replace as _s, ReplaceAll as Ap, Cloud as Pp, Loader2 as Jl, CloudOff as Lp, AlertCircle as Ip, RotateCcw as Sa, ImagePlus as Op, Activity as _p, Maximize2 as ec, Minimize2 as tc, AlertTriangle as $p, CheckCircle2 as zp, MessageSquare as nc, RefreshCw as Bp, SpellCheck as Hp, PanelRightClose as Wp, PanelRightOpen as Fp, Eye as Up } from "lucide-react";
import Ta from "highlight.js/lib/languages/javascript";
import Ma from "highlight.js/lib/languages/typescript";
import rc from "highlight.js/lib/languages/python";
import Ea from "highlight.js/lib/languages/xml";
import Yp from "highlight.js/lib/languages/css";
import jp from "highlight.js/lib/languages/json";
import Do from "highlight.js/lib/languages/bash";
import Vp from "highlight.js/lib/languages/sql";
import Kp from "highlight.js/lib/languages/java";
import oc from "highlight.js/lib/languages/cpp";
import sc from "highlight.js/lib/languages/go";
import ac from "highlight.js/lib/languages/rust";
import ic from "highlight.js/lib/languages/markdown";
import lc from "highlight.js/lib/languages/yaml";
import cc from "highlight.js/lib/languages/diff";
import * as uc from "react-dom";
import qp, { createPortal as Kt } from "react-dom";
import Gp from "@tiptap/extension-image";
import { createRoot as Zp } from "react-dom/client";
import { Fragment as Xp } from "@tiptap/pm/model";
import { liftListItem as Si, sinkListItem as Ti } from "@tiptap/pm/schema-list";
import { undo as Qp, redo as Jp } from "@tiptap/pm/history";
const eh = new Ve("tableCellMenu");
let Mi = !1, Hr = null;
function th() {
  Mi || (Mi = !0, document.addEventListener("mouseover", (e) => {
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
function nh(e) {
  return th(), new je({
    key: eh,
    state: {
      init() {
        return Ze.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && Hr ? Hr.map(t.mapping, t.doc) : (Hr = rh(o.doc, e), Hr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function rh(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = at.widget(o + 1, (a) => {
        const i = document.createElement("div");
        i.className = "table-cell-menu-wrapper ProseMirror-widget", i.setAttribute("contenteditable", "false"), i.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const l = document.createElement("button");
        l.className = "table-cell-menu-btn", l.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', l.title = "Table options", l.type = "button";
        const u = document.documentElement.classList.contains("dark"), c = u ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", d = u ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", p = u ? "#999" : "#666", h = u ? "#2a2a2a" : "#f5f5f5";
        return l.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + c + ";border:1px solid " + d + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + p + ";pointer-events:auto;padding:0;", l.addEventListener("mouseenter", () => {
          l.style.opacity = "1", l.style.background = h, l.style.transform = "scale(1.05)";
        }), l.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), l.style.background = c, l.style.transform = "scale(1)";
        }), l.addEventListener("click", (m) => {
          m.preventDefault(), m.stopPropagation();
          const g = l.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), oh(m, t, o, g);
        }), i.appendChild(l), i;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), Ze.create(e, n);
}
function oh(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const a = 170, i = 280;
  let l = Math.max(0, Math.min(r.top, window.innerHeight)), u = Math.max(0, Math.min(r.bottom, window.innerHeight)), c = Math.max(0, Math.min(r.left, window.innerWidth)), d = u + 4, p = c - a + r.width + 8;
  p + a > window.innerWidth - 12 && (p = window.innerWidth - a - 12), p < 12 && (p = 12), d + i > window.innerHeight - 12 && (d = l - i - 4), d < 12 && (d = 12), d + i > window.innerHeight - 12 && (d = window.innerHeight - i - 12);
  const h = document.documentElement.classList.contains("dark"), m = h ? "#1f1f1f" : "#ffffff", g = h ? "#3a3a3a" : "#e5e5e5", y = h ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + d + "px;left:" + p + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + m + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + y + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const v = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n + 1).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n + 1).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n + 1).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n + 1).addRowAfter().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => sh(t) }
  ], b = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
  }, w = h ? "#2a2a2a" : "#f5f5f5", E = h ? "#ff6b6b" : "#dc2626", x = h ? "#999999" : "#666666", M = h ? "#333333" : "#e5e5e5";
  v.forEach((T) => {
    if (T.label === "divider") {
      const k = document.createElement("div");
      k.style.cssText = "height:1px;background:" + M + ";margin:4px 0;", s.appendChild(k);
    } else {
      const k = document.createElement("button");
      k.type = "button";
      const R = T.destructive ? E : y;
      k.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + R + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const N = b[T.icon || ""] || "", L = T.destructive ? E : x;
      k.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + L + ';">' + N + '</span><span style="flex:1;white-space:nowrap;">' + T.label + "</span>", k.addEventListener("mouseenter", () => {
        k.style.background = T.destructive ? h ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : w;
      }), k.addEventListener("mouseleave", () => {
        k.style.background = "transparent";
      }), k.addEventListener("click", (I) => {
        I.preventDefault(), I.stopPropagation(), T.action && T.action(), s.remove();
      }), s.appendChild(k);
    }
  }), document.body.appendChild(s);
  const D = (T) => {
    const k = T.target;
    if (s.contains(k) || k.classList.contains("table-cell-menu-btn"))
      return;
    const R = k.closest('[role="dialog"]');
    R && R.contains(s) || (s.remove(), document.removeEventListener("mousedown", D), document.removeEventListener("keydown", C));
  }, C = (T) => {
    T.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", D), document.removeEventListener("keydown", C));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", D), document.addEventListener("keydown", C);
  }, 0);
}
function sh(e) {
  const { state: t } = e, { selection: n } = t;
  let r = null;
  if (t.doc.descendants((o, s) => {
    if (o.type.name === "table" && s <= n.from && s + o.nodeSize >= n.to)
      return r = o, !1;
  }), r) {
    const o = (a) => {
      if (a.type.name === "table") return "<table>" + a.content.content.map(o).join("") + "</table>";
      if (a.type.name === "tableRow") return "<tr>" + a.content.content.map(o).join("") + "</tr>";
      if (a.type.name === "tableCell") {
        const i = a.attrs, l = i.colspan > 1 ? ' colspan="' + i.colspan + '"' : "", u = i.rowspan > 1 ? ' rowspan="' + i.rowspan + '"' : "";
        return "<td" + l + u + ">" + a.textContent + "</td>";
      }
      if (a.type.name === "tableHeader") {
        const i = a.attrs, l = i.colspan > 1 ? ' colspan="' + i.colspan + '"' : "", u = i.rowspan > 1 ? ' rowspan="' + i.rowspan + '"' : "";
        return "<th" + l + u + ">" + a.textContent + "</th>";
      }
      return a.textContent || "";
    }, s = o(r);
    navigator.clipboard.writeText(s).then(() => {
      const a = document.createElement("div");
      a.className = "tcm-toast", a.textContent = "Table copied to clipboard", a.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;", document.body.appendChild(a), setTimeout(() => a.remove(), 2e3);
    });
  }
}
const ah = Ff.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      nh(this.editor)
    ];
  }
}), ih = Uf.extend({}), ur = new Ve("tableSorting");
let en = null, or = null;
function lh(e) {
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
function ch(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function uh(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (m, g) => {
    if (m.type.name === "table" && g === t)
      return s = m, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = en?.tablePos === t && en?.columnIndex === n && en?.direction === "asc" ? "desc" : "asc";
  en = { tablePos: t, columnIndex: n, direction: a }, or = null;
  const i = [];
  s.forEach((m) => {
    if (m.type.name === "tableRow") {
      let g = !1;
      m.forEach((y) => {
        y.type.name === "tableHeader" && (g = !0);
      }), i.push({ node: m, isHeader: g });
    }
  });
  const l = i.filter((m) => m.isHeader), u = i.filter((m) => !m.isHeader);
  if (u.length < 2) {
    Ei(n, a), o.dispatch(r.tr.setMeta(ur, { updated: !0 }));
    return;
  }
  const c = u.map((m) => {
    let g = "", y = 0;
    return m.node.forEach((v) => {
      y === n && (g = v.textContent || ""), y++;
    }), { ...m, sortValue: lh(g) };
  }), d = c.map((m, g) => g);
  c.sort((m, g) => ch(m.sortValue, g.sortValue, a));
  const p = c.map((m, g) => u.indexOf(m));
  if (d.some((m, g) => m !== p[g])) {
    const m = [];
    l.forEach((v) => m.push(v.node)), c.forEach((v) => m.push(v.node));
    const g = s.type.create(s.attrs, m), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(ur, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(ur, { updated: !0 }));
  Ei(n, a);
}
function Ei(e, t) {
  const n = document.querySelector(".table-sort-toast");
  n && n.remove();
  const r = document.createElement("div");
  r.className = "table-sort-toast";
  const o = t === "asc" ? "ascending" : "descending", s = t === "asc" ? "↑" : "↓";
  r.innerHTML = '<span style="margin-right:6px;">' + s + "</span> Sorted column " + (e + 1) + " " + o;
  const a = document.documentElement.classList.contains("dark");
  r.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:" + (a ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)") + ";color:" + (a ? "#e5e5e5" : "#333") + ";padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid " + (a ? "#3a3a3a" : "#e5e5e5") + ";animation:sortToastIn 0.2s ease;", document.body.appendChild(r), setTimeout(() => {
    r.style.animation = "sortToastOut 0.2s ease forwards", setTimeout(() => r.remove(), 200);
  }, 1500);
}
function dh(e, t, n, r) {
  const o = document.createElement("span");
  o.className = "table-sort-btn-inline", o.setAttribute("contenteditable", "false"), o.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const s = document.createElement("button");
  s.className = "table-sort-btn", s.setAttribute("contenteditable", "false"), s.type = "button";
  const a = document.documentElement.classList.contains("dark"), i = a ? "#60a5fa" : "#3b82f6", l = a ? "#666" : "#aaa", u = a ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return s.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? i : l) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", s.addEventListener("mouseenter", () => {
    s.style.background = u, s.style.opacity = "1", s.style.color = i;
  }), s.addEventListener("mouseleave", () => {
    s.style.background = "transparent", s.style.opacity = e ? "1" : "0.5", s.style.color = e ? i : l;
  }), s.addEventListener("click", (c) => {
    c.preventDefault(), c.stopPropagation(), uh(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function fh(e) {
  return new je({
    key: ur,
    state: {
      init() {
        return Ze.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(ur);
        return !t.docChanged && !s?.updated && or ? or.map(t.mapping, t.doc) : (or = ph(o.doc, e), or);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function ph(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "table") {
      const s = o;
      r.forEach((a, i) => {
        if (a.type.name === "tableRow") {
          let l = 0, u = 0;
          a.forEach((c, d) => {
            if (c.type.name === "tableHeader") {
              const p = o + 1 + i + 1 + u;
              let h = p + 1;
              c.forEach((w, E) => {
                w.type.name === "paragraph" && (h = p + 1 + E + w.nodeSize - 1);
              });
              const g = en?.tablePos === s && en?.columnIndex === l ? en.direction : null, y = l, v = s, b = at.widget(h, () => dh(g, v, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(b);
            }
            u += c.nodeSize, l++;
          });
        }
      });
    }
  }), Ze.create(e, n);
}
const hh = gt.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [fh(this.editor)];
  }
});
function dc(e, t, n, r, o, s = {}) {
  const a = e.doc.nodeAt(t);
  if (!a) return !1;
  e.setNodeMarkup(t, n, a.attrs);
  const i = e.doc.nodeAt(t);
  if (!i) return !1;
  const l = [];
  i.forEach((u, c) => {
    u.type === o && l.push(t + 1 + c);
  });
  for (let u = l.length - 1; u >= 0; u--) {
    const c = l[u], d = e.doc.nodeAt(c);
    d && d.type === o && e.setNodeMarkup(c, r, s);
  }
  return !0;
}
const mh = jf.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, u = t.schema.nodes.listItem, c = t.schema.nodes.taskItem;
        let d = null, p = -1;
        for (let h = s.depth; h > 0; h--) {
          const m = s.node(h);
          if (m.type === a || m.type === i || m.type === l) {
            d = m.type, p = s.before(h);
            break;
          }
        }
        if (d === a)
          return e.liftListItem("listItem");
        if (d === i || d === l) {
          if (!r) return !0;
          if (dc(n, p, a, u, c, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), gh = Vf.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, u = t.schema.nodes.listItem, c = t.schema.nodes.taskItem;
        let d = null, p = -1;
        for (let h = s.depth; h > 0; h--) {
          const m = s.node(h);
          if (m.type === a || m.type === i || m.type === l) {
            d = m.type, p = s.before(h);
            break;
          }
        }
        if (d === l)
          return e.liftListItem("listItem");
        if (d === i || d === a) {
          if (!r) return !0;
          if (dc(n, p, l, u, c, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), yh = qf.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: a }) => {
        const { selection: i } = n, { $from: l, $to: u } = i;
        if (!l.blockRange(u))
          return !1;
        const d = n.schema.nodes.taskList, p = n.schema.nodes.taskItem;
        let h = !1;
        for (let E = l.depth; E > 0; E--)
          if (l.node(E).type === d) {
            h = !0, l.before(E);
            break;
          }
        if (h)
          return t.liftListItem("taskItem");
        const m = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let v = null, b = -1;
        for (let E = l.depth; E > 0; E--) {
          const x = l.node(E);
          if (x.type === m || x.type === g) {
            v = x, b = l.before(E);
            break;
          }
        }
        if (v) {
          if (!o) return !0;
          const E = b, x = r.doc.nodeAt(E);
          if (!x) return !1;
          r.setNodeMarkup(E, d, x.attrs);
          const M = r.doc.nodeAt(E);
          if (!M) return !1;
          const D = [];
          M.forEach((C, T) => {
            C.type === y && D.push(E + 1 + T);
          });
          for (let C = D.length - 1; C >= 0; C--) {
            const T = D[C], k = r.doc.nodeAt(T);
            k && k.type === y && r.setNodeMarkup(T, p, { checked: !1 });
          }
          return o(r), !0;
        }
        if (a().toggleBulletList()) {
          if (!s().toggleBulletList().run()) return !1;
          const x = e.state, M = x.tr, { $from: D } = x.selection;
          let C = -1;
          for (let T = D.depth; T > 0; T--)
            if (D.node(T).type === m) {
              C = D.before(T);
              break;
            }
          if (C >= 0) {
            const T = M.doc.nodeAt(C);
            if (T) {
              M.setNodeMarkup(C, d, T.attrs);
              const k = M.doc.nodeAt(C);
              if (k) {
                const R = [];
                k.forEach((N, L) => {
                  N.type === y && R.push(C + 1 + L);
                });
                for (let N = R.length - 1; N >= 0; N--) {
                  const L = R[N], I = M.doc.nodeAt(L);
                  I && I.type === y && M.setNodeMarkup(L, p, { checked: !1 });
                }
              }
              e.view.dispatch(M);
            }
          }
          return !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), bh = Gf.extend({
  content: "paragraph block*",
  addInputRules() {
    return [];
  },
  addProseMirrorPlugins() {
    const e = this.type, t = this.editor.schema.nodes.taskList;
    return [
      new je({
        key: new Ve("taskItemInputRule"),
        props: {
          handleTextInput(n, r, o, s) {
            if (s !== " ") return !1;
            const { state: a } = n, i = a.doc.resolve(r), l = i.parent.textBetween(
              0,
              i.parentOffset,
              void 0,
              "￼"
            ), c = /^\s*(-\s*)?\[([( |x])?\]$/.exec(l);
            if (!c) return !1;
            const d = c[2] === "x", p = i.start() + (c.index || 0), h = r, m = a.tr;
            m.delete(p, h);
            const y = m.doc.resolve(p).blockRange();
            if (!y || !t || !e) return !1;
            const v = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (m.wrap(y, v), p > 1) {
              const b = m.doc.resolve(p - 1).nodeBefore;
              b && b.type === t && Zf(m.doc, p - 1) && m.join(p - 1);
            }
            return n.dispatch(m), !0;
          }
        }
      })
    ];
  }
}), vh = Kf.extend({
  content: "paragraph block*"
}), Di = new Ve("collapsibleList");
function $s(e, t) {
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
function wh(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (r === -1 && (r = s), o = s + a.nodeSize), s += a.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let Mn = null;
function cs(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !zs(o))
      return !0;
    const a = $s(o, s), i = t.collapsedItems.has(a);
    r.push(
      at.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${i ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const l = o.firstChild;
    if (l && l.type.name === "paragraph") {
      const u = s + 1 + l.nodeSize - 1, c = at.widget(
        u,
        () => {
          const d = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${a}"]`
          );
          if (d) {
            d.classList.contains("collapsed") !== i && (d.classList.remove("collapsed", "expanded"), d.classList.add(i ? "collapsed" : "expanded"), d.title = i ? "Click to expand" : "Click to collapse");
            const g = d.parentElement;
            if (g) return g;
          }
          const p = document.createElement("span");
          p.className = "collapsible-list-chevron-wrapper", p.setAttribute("contenteditable", "false");
          const h = document.createElement("button");
          return h.className = `collapsible-list-chevron ${i ? "collapsed" : "expanded"}`, h.setAttribute("data-list-item-id", a), h.setAttribute("contenteditable", "false"), h.setAttribute("tabindex", "-1"), h.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', h.title = i ? "Click to expand" : "Click to collapse", h.addEventListener("click", (m) => {
            m.preventDefault(), m.stopPropagation();
            const g = h.classList.contains("collapsed");
            h.classList.remove("collapsed", "expanded"), h.classList.add(g ? "expanded" : "collapsed"), h.title = g ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), Mn && Mn.dispatch(
              Mn.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), p.appendChild(h), p;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      r.push(c);
    }
    if (i && wh(o, s)) {
      let c = s + 1;
      o.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && r.push(
          at.node(c, c + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), c += d.nodeSize;
      });
    }
    return !0;
  }), Ze.create(e, r);
}
const kh = gt.create({
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
        const s = $s(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && zs(o) && n.collapsedItems.add($s(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new je({
        key: Di,
        view(n) {
          return Mn = n, {
            update(r) {
              Mn = r;
            },
            destroy() {
              Mn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: cs(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: cs(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Di.getState(n);
            return r?.decorations ? r.decorations : cs(n.doc, e, t);
          }
        }
      })
    ];
  }
}), ye = np();
ye.register("javascript", Ta);
ye.register("js", Ta);
ye.register("jsx", Ta);
ye.register("typescript", Ma);
ye.register("ts", Ma);
ye.register("tsx", Ma);
ye.register("python", rc);
ye.register("py", rc);
ye.register("xml", Ea);
ye.register("html", Ea);
ye.register("svg", Ea);
ye.register("css", Yp);
ye.register("json", jp);
ye.register("bash", Do);
ye.register("sh", Do);
ye.register("shell", Do);
ye.register("zsh", Do);
ye.register("sql", Vp);
ye.register("java", Kp);
ye.register("cpp", oc);
ye.register("c", oc);
ye.register("go", sc);
ye.register("golang", sc);
ye.register("rust", ac);
ye.register("rs", ac);
ye.register("markdown", ic);
ye.register("md", ic);
ye.register("yaml", lc);
ye.register("yml", lc);
ye.register("diff", cc);
ye.register("patch", cc);
function xh({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = j(!1), [s, a] = j(!1), i = V(null);
  G(() => {
    const p = i.current;
    if (!p || s) return;
    const h = new IntersectionObserver(
      (m) => {
        for (const g of m)
          g.isIntersecting && (a(!0), h.unobserve(p));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return h.observe(p), () => {
      h.disconnect();
    };
  }, [s]);
  const l = F(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (p) {
      console.error("Failed to copy:", p);
    }
  }, [e.textContent]), u = n.options.lowlight?.listLanguages?.() || [], c = e.attrs.language || "plaintext", d = c === "plaintext" ? "Plain Text" : c.charAt(0).toUpperCase() + c.slice(1);
  return /* @__PURE__ */ A(kr, { className: "code-block-wrapper", ref: i, children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ A(
          "select",
          {
            value: c,
            onChange: (p) => t({ language: p.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ f("option", { value: "plaintext", children: "Plain Text" }),
              u.map((p) => /* @__PURE__ */ f("option", { value: p, children: p.charAt(0).toUpperCase() + p.slice(1) }, p))
            ]
          }
        ),
        /* @__PURE__ */ f("span", { className: "code-block-language-label", children: d }),
        /* @__PURE__ */ f(Ut, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          onClick: l,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ f(Bn, { size: 14 }) : /* @__PURE__ */ f(Hn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("pre", { className: `code-block-pre ${s ? "" : "code-block-deferred"}`, children: /* @__PURE__ */ f(ia, { className: s ? `language-${c}` : "language-plaintext" }) })
  ] });
}
const Ch = tp.extend({
  addNodeView() {
    return Co(xh);
  }
}).configure({
  lowlight: ye,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function Sh({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = j(""), s = V(null), a = V(null), [i, l] = j({ top: 0, left: 0 });
  G(() => {
    if (t) {
      const m = e.getAttributes("link").href || "";
      o(m);
      try {
        const { view: g } = e, { from: y } = g.state.selection, v = g.coordsAtPos(y), b = v.bottom + 8, w = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        l({ top: b, left: w });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), G(() => {
    if (!t) return;
    const m = (b) => {
      a.current && !a.current.contains(b.target) && n();
    }, g = () => {
      n();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", m);
    }, 10), v = e.view.dom.closest(".editor-content-wrapper");
    return v?.addEventListener("scroll", g), () => {
      clearTimeout(y), document.removeEventListener("mousedown", m), v?.removeEventListener("scroll", g);
    };
  }, [t, n, e]);
  const u = F((m) => {
    if (m?.preventDefault(), r.trim()) {
      let g = r.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), c = F((m) => {
    m.key === "Escape" ? (m.preventDefault(), n()) : m.key === "Enter" && (m.preventDefault(), u());
  }, [n, u]);
  if (!t) return null;
  const p = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", h = /* @__PURE__ */ f(
    "div",
    {
      ref: a,
      className: "link-popover",
      "data-theme": p,
      style: {
        position: "fixed",
        top: `${i.top}px`,
        left: `${i.left}px`,
        zIndex: 9999
      },
      children: /* @__PURE__ */ A("form", { onSubmit: u, className: "link-popover-form", children: [
        /* @__PURE__ */ A("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ f(ca, { className: "link-popover-icon", size: 16 }),
          /* @__PURE__ */ f(
            "input",
            {
              ref: s,
              type: "text",
              value: r,
              onChange: (m) => o(m.target.value),
              onKeyDown: c,
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
  return Kt(h, document.body);
}
function Th({ editor: e, onEditLink: t }) {
  const [n, r] = j({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = V(null), s = V(null), a = F((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const E = w.getAttribute("href") || "", x = w.getBoundingClientRect(), M = x.bottom + 8, D = Math.max(16, Math.min(x.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: E,
          position: { top: M, left: D },
          linkElement: w
        });
      } catch (E) {
        console.warn("LinkHoverTooltip: Error showing tooltip", E);
      }
    }
  }, [e]), i = F(() => {
    s.current = setTimeout(() => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = F(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  G(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const E = (M) => {
      const C = M.target.closest("a");
      C && w.contains(C) && a(C);
    }, x = (M) => {
      const D = M.target, C = M.relatedTarget;
      if (D.closest("a")) {
        if (C && o.current?.contains(C))
          return;
        i();
      }
    };
    return w.addEventListener("mouseover", E), w.addEventListener("mouseout", x), () => {
      w.removeEventListener("mouseover", E), w.removeEventListener("mouseout", x), s.current && clearTimeout(s.current);
    };
  }, [e, a, i]), G(() => {
    if (!n.isVisible) return;
    const w = () => {
      r((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, E = e.view.dom.closest(".editor-content-wrapper");
    return E?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      E?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e]);
  const [u, c] = j(!1), d = F(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      c(!0), setTimeout(() => c(!1), 1500);
    });
  }, [n.url]), p = F(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), h = F(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: E } = w.state;
      let x = null, M = null;
      E.descendants((D, C) => {
        if (D.isText && D.marks.some((T) => T.type.name === "link")) {
          const T = w.nodeDOM(C);
          if (T && (T === n.linkElement || T.parentElement === n.linkElement))
            return x = C, M = C + D.nodeSize, !1;
        }
        return !0;
      }), x !== null && M !== null ? e.chain().focus().setTextSelection({ from: x, to: M }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), m = F(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: E } = w.state;
      E.descendants((x, M) => {
        if (x.isText && x.marks.some((D) => D.type.name === "link")) {
          const D = w.nodeDOM(M);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: M, to: M + x.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((w) => ({ ...w, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const g = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, v = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", b = /* @__PURE__ */ f(
    "div",
    {
      ref: o,
      className: "link-hover-tooltip",
      "data-theme": v,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`,
        zIndex: 9999
      },
      onMouseEnter: l,
      onMouseLeave: i,
      children: /* @__PURE__ */ A("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ A(
          "button",
          {
            onClick: p,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ f(ip, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ f("span", { className: "link-hover-tooltip-url", children: g || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ A("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ f(
            "button",
            {
              onClick: m,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ f(lp, { size: 14 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: d,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: u ? /* @__PURE__ */ f(Bn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ f(Hn, { size: 14 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ f(cp, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return Kt(b, document.body);
}
const tt = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ f(
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
), Ni = () => /* @__PURE__ */ f("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), Ri = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" }
], Mh = zn(function({ editor: t, isH1: n, isH2: r, isH3: o, executeCommand: s }) {
  const [a, i] = j(!1), l = V(null), u = n ? "h1" : r ? "h2" : o ? "h3" : "paragraph", c = Ri.find((p) => p.value === u)?.shortLabel || "P";
  G(() => {
    if (!a) return;
    const p = (h) => {
      l.current && !l.current.contains(h.target) && i(!1);
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [a]);
  const d = (p, h) => {
    if (p.preventDefault(), p.stopPropagation(), h === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const m = parseInt(h.replace("h", ""));
      t.chain().focus().toggleHeading({ level: m }).run();
    }
    i(!1);
  };
  return /* @__PURE__ */ A("div", { ref: l, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ A(
      "button",
      {
        onMouseDown: (p) => {
          p.preventDefault(), p.stopPropagation(), i(!a);
        },
        title: "Text style",
        className: `
          flex items-center gap-1 h-7 px-2 rounded-md flex-shrink-0
          transition-all duration-100 ease-out touch-manipulation
          text-xs font-normal overflow-visible
          ${u !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ f("span", { className: "min-w-[18px] text-center", children: c }),
          /* @__PURE__ */ f(Ut, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${a ? "rotate-180" : ""}` })
        ]
      }
    ),
    a && /* @__PURE__ */ f(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: Ri.map((p) => {
          const h = p.value === u;
          return /* @__PURE__ */ A(
            "button",
            {
              onMouseDown: (m) => d(m, p.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${h ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ f("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: p.shortLabel }),
                /* @__PURE__ */ f("span", { children: p.label })
              ]
            },
            p.value
          );
        })
      }
    )
  ] });
}), Eh = zn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const a = V(null), i = Fl({
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
      isBulletList: T.isActive("bulletList"),
      isOrderedList: T.isActive("orderedList"),
      isTaskList: T.isActive("taskList"),
      isBlockquote: T.isActive("blockquote"),
      isCodeBlock: T.isActive("codeBlock")
    })
  }), [l, u] = j(!1), [c, d] = j(""), [p, h] = j(!1), [m, g] = j({ top: 0, left: 0 }), y = V(null), v = V(null), b = V(null), w = F(() => {
    if (c) {
      let T = c.trim();
      !/^https?:\/\//i.test(T) && !T.startsWith("mailto:") && (T = "https://" + T), t.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    u(!1), d("");
  }, [t, c]), E = (T) => {
    T.preventDefault(), T.stopPropagation();
    const k = t.getAttributes("link").href;
    d(k || ""), u(!0);
  }, x = F((T, k) => {
    T.preventDefault(), T.stopPropagation(), k();
  }, []);
  G(() => {
    if (!t || t.isDestroyed) return;
    const T = () => {
      if (!t.isDestroyed)
        try {
          const { selection: k } = t.state, { empty: R, from: N, to: L } = k, H = ("node" in k && k.node ? k.node : t.state.doc.nodeAt(N))?.type?.name === "resizableImage";
          if (R && !H || t.isActive("codeBlock")) {
            b.current && (clearTimeout(b.current), b.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              h(!1), u(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const K = t.view.coordsAtPos(N), P = t.view.coordsAtPos(L), B = y.current?.offsetWidth || 500, ne = y.current?.offsetHeight || 40, ae = 8, oe = window.innerWidth;
          let re = 0, ie = 0;
          if (y.current) {
            const pe = y.current.closest('[data-slot="dialog-content"]');
            if (pe) {
              const be = pe.getBoundingClientRect();
              re = be.left, ie = be.top;
            }
          }
          let W = (K.left + P.left) / 2 - B / 2 - re;
          const Y = re ? oe - re : oe;
          W = Math.max(ae, Math.min(Y - B - ae, W));
          let Q = K.top - ne - 10 - ie;
          Q < ae && (Q = P.bottom + 10 - ie), p ? g({ top: Math.max(ae, Q), left: W }) : (b.current && clearTimeout(b.current), b.current = setTimeout(() => {
            g({ top: Math.max(ae, Q), left: W }), h(!0);
          }, 50));
        } catch (k) {
          console.warn("FloatingToolbar: Error updating position", k);
        }
    };
    return t.on("selectionUpdate", T), () => {
      t.off("selectionUpdate", T), v.current && clearTimeout(v.current), b.current && clearTimeout(b.current);
    };
  }, [t, p]);
  const M = (T) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!p || r)
    return null;
  const D = 15, C = l ? /* @__PURE__ */ f(
    "div",
    {
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: m.top,
        left: m.left,
        zIndex: 9999
      },
      onMouseDown: M,
      children: /* @__PURE__ */ A("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ f(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: c,
            onChange: (T) => d(T.target.value),
            onKeyDown: (T) => {
              T.key === "Enter" && (T.preventDefault(), w()), T.key === "Escape" && (u(!1), d(""));
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
                T.preventDefault(), u(!1), d("");
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
        top: m.top,
        left: m.left,
        zIndex: 9999
      },
      onMouseDown: M,
      children: [
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBold().run()),
            isActive: i?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ f(ua, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleItalic().run()),
            isActive: i?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ f(da, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleUnderline().run()),
            isActive: i?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ f(fa, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleStrike().run()),
            isActive: i?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ f(pa, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleCode().run()),
            isActive: i?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ f(jl, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleHighlight().run()),
            isActive: i?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ f(Vl, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: E,
            isActive: i?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ f(ha, { size: D })
          }
        ),
        /* @__PURE__ */ f(Ni, {}),
        /* @__PURE__ */ f(
          Mh,
          {
            editor: t,
            isH1: i?.isH1 ?? !1,
            isH2: i?.isH2 ?? !1,
            isH3: i?.isH3 ?? !1,
            executeCommand: x
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBlockquote().run()),
            isActive: i?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ f(ma, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBulletList().run()),
            isActive: i?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ f(ga, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleOrderedList().run()),
            isActive: i?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ f(ya, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleTaskList().run()),
            isActive: i?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ f(ba, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          tt,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: i?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ f(up, { size: D })
          }
        ),
        o && /* @__PURE__ */ A(Pe, { children: [
          /* @__PURE__ */ f(Ni, {}),
          /* @__PURE__ */ f(
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
              children: /* @__PURE__ */ f(Mo, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return Kt(C, document.body);
}), Wr = {
  info: { icon: lo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: ql, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: Kl, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: wa, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: va, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function Dh({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = j(!1), [s, a] = j(!1), [i, l] = j(null), u = V(null), c = V(null), d = e.attrs.type || "info", p = Wr[d] || Wr.info, h = p.icon, m = F(() => {
    if (c.current) {
      const b = c.current.getBoundingClientRect();
      l({
        top: b.bottom + 4,
        left: b.left
      });
    }
  }, []);
  G(() => {
    if (!r) return;
    const b = (w) => {
      u.current && !u.current.contains(w.target) && c.current && !c.current.contains(w.target) && o(!1);
    };
    return document.addEventListener("mousedown", b), document.addEventListener("touchstart", b, { passive: !0 }), () => {
      document.removeEventListener("mousedown", b), document.removeEventListener("touchstart", b);
    };
  }, [r]), G(() => {
    if (!r) return;
    const b = () => o(!1);
    return window.addEventListener("scroll", b, !0), () => window.removeEventListener("scroll", b, !0);
  }, [r]);
  const g = F(() => {
    n.isEditable && (r || m(), o(!r));
  }, [n.isEditable, r, m]), y = (b) => {
    t({ type: b }), o(!1);
  }, v = F((b) => {
    b.stopPropagation(), a((w) => !w);
  }, []);
  return /* @__PURE__ */ A(kr, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ A("div", { className: "callout-header", contentEditable: !1, children: [
      /* @__PURE__ */ A(
        "button",
        {
          ref: c,
          className: "callout-header-button",
          onClick: g,
          title: n.isEditable ? "Click to change callout type" : p.label,
          style: { color: p.borderColor },
          contentEditable: !1,
          children: [
            /* @__PURE__ */ f(h, { size: 18 }),
            /* @__PURE__ */ f("span", { className: "callout-label", children: p.label }),
            n.isEditable && /* @__PURE__ */ f(Ut, { size: 12, className: "callout-type-chevron" })
          ]
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          className: "callout-collapse-toggle",
          onClick: v,
          title: s ? "Expand callout" : "Collapse callout",
          contentEditable: !1,
          style: { color: p.borderColor },
          children: s ? /* @__PURE__ */ f(Gl, { size: 16 }) : /* @__PURE__ */ f(Ut, { size: 16 })
        }
      ),
      r && n.isEditable && i && Kt(
        /* @__PURE__ */ f(
          "div",
          {
            ref: u,
            className: "callout-type-dropdown",
            contentEditable: !1,
            style: {
              position: "fixed",
              top: i.top,
              left: i.left,
              zIndex: 9999
            },
            children: Object.keys(Wr).map((b) => {
              const w = Wr[b], E = w.icon;
              return /* @__PURE__ */ A(
                "button",
                {
                  className: `callout-type-option ${b === d ? "active" : ""}`,
                  onClick: () => y(b),
                  style: { "--callout-option-color": w.color },
                  children: [
                    /* @__PURE__ */ f(E, { size: 16, style: { color: w.borderColor } }),
                    /* @__PURE__ */ f("span", { children: w.label })
                  ]
                },
                b
              );
            })
          }
        ),
        document.body
      )
    ] }),
    /* @__PURE__ */ f("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ f(ia, {}) })
  ] });
}
const Nh = So.create({
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
      $n(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return Co(Dh);
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
}), Rh = Gp.extend({
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
        $n(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addNodeView() {
    const e = this.options;
    return ({ node: t, editor: n, getPos: r }) => {
      let o = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const a = (k) => {
        const R = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[k] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${R}`;
      };
      a(t.attrs.align || "left");
      const i = document.createElement("img");
      i.alt = t.attrs.alt || "", t.attrs.width && (i.style.width = `${t.attrs.width}px`);
      const l = (k) => !(!k || k.startsWith("data:") || k.startsWith("blob:") || k.startsWith("http://") || k.startsWith("https://")), u = (k) => {
        l(k) && e.resolveImageSrc ? (i.style.opacity = "0.5", i.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(k).then((R) => {
          i.src = R, i.style.opacity = "1";
        }).catch(() => {
          i.src = k, i.style.opacity = "1";
        })) : i.src = k;
      };
      u(t.attrs.src);
      const c = document.createElement("div");
      c.classList.add("resize-handle"), c.style.cssText = `
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
      `, c.innerHTML = `
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
      const p = document.createElement("div");
      p.classList.add("image-menu-dropdown"), p.style.cssText = `
        position: fixed;
        display: none;
        flex-direction: column;
        min-width: 140px;
        padding: 4px;
        background: oklch(0.99 0 0);
        border: 1px solid oklch(0.9 0 0);
        border-radius: 8px;
        box-shadow: 0 4px 16px oklch(0 0 0 / 0.15);
        z-index: 9999;
        pointer-events: auto;
      `;
      const h = (k, R, N) => {
        const L = document.createElement("button");
        return L.setAttribute("type", "button"), L.style.cssText = `
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
        `, L.innerHTML = `${R}<span>${k}</span>`, L.addEventListener("mouseenter", () => {
          L.style.background = "oklch(0.95 0 0)";
        }), L.addEventListener("mouseleave", () => {
          L.style.background = "transparent";
        }), L.addEventListener("click", (I) => {
          I.preventDefault(), I.stopPropagation(), N(), p.style.display = "none", b = !1;
        }), L;
      }, m = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      p.appendChild(h("Edit", m, () => {
        const k = typeof r == "function" ? r() : null;
        if (k != null && e.onImageClick) {
          const R = i.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: k,
            rect: R
          });
        }
      })), p.appendChild(h("Copy image", g, async () => {
        const k = o.attrs.src;
        try {
          const N = await (await fetch(k)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [N.type]: N })
          ]);
        } catch {
          try {
            await navigator.clipboard.writeText(k);
          } catch {
          }
        }
      })), p.appendChild(h("Copy URL", v, async () => {
        const k = o.attrs.src;
        try {
          await navigator.clipboard.writeText(k);
        } catch {
        }
      })), p.appendChild(h("Save image", y, () => {
        const k = o.attrs.src, R = o.attrs.alt || "image", N = document.createElement("a");
        N.href = k, N.download = R, N.target = "_blank", N.rel = "noopener noreferrer", document.body.appendChild(N), N.click(), setTimeout(() => {
          document.body.removeChild(N);
        }, 100);
      }));
      let b = !1;
      d.addEventListener("click", (k) => {
        if (k.preventDefault(), k.stopPropagation(), b)
          p.style.display = "none", b = !1;
        else {
          const R = d.getBoundingClientRect();
          p.style.top = `${R.bottom + 4}px`, p.style.left = `${R.right - 140}px`, p.style.display = "flex", b = !0;
        }
      });
      const w = (k) => {
        !p.contains(k.target) && !d.contains(k.target) && (p.style.display = "none", b = !1);
      };
      document.addEventListener("click", w), s.appendChild(i), s.appendChild(c), s.appendChild(d);
      const E = s.closest('[role="dialog"]');
      E ? E.appendChild(p) : document.body.appendChild(p), s.addEventListener("mouseenter", () => {
        c.style.opacity = "1", d.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        c.style.opacity = "0", b || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      let x, M;
      const D = (k) => {
        k.preventDefault(), x = k.clientX, M = i.offsetWidth, document.addEventListener("mousemove", C), document.addEventListener("mouseup", T);
      }, C = (k) => {
        const R = k.clientX - x, N = Math.max(100, M + R);
        i.style.width = `${N}px`;
      }, T = () => {
        document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", T);
        const k = typeof r == "function" ? r() : null, R = i.offsetWidth;
        if (k != null)
          try {
            const { state: N, dispatch: L } = n.view, I = N.doc.nodeAt(k);
            if (I && I.type.name === "resizableImage") {
              const _ = N.tr.setNodeMarkup(k, void 0, {
                ...I.attrs,
                width: R
              });
              L(_);
            }
          } catch {
            n.chain().focus().setNodeSelection(k).updateAttributes("resizableImage", {
              width: R
            }).run();
          }
      };
      return c.addEventListener("mousedown", D), {
        dom: s,
        update: (k) => k.type.name !== "resizableImage" ? !1 : (o = k, u(k.attrs.src), i.alt = k.attrs.alt || "", k.attrs.width && (i.style.width = `${k.attrs.width}px`), a(k.attrs.align || "left"), !0),
        destroy: () => {
          c.removeEventListener("mousedown", D), document.removeEventListener("click", w), p.remove();
        }
      };
    };
  }
});
function Ah(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Ph = {}, sr = {};
function tn(e, t) {
  try {
    const r = (Ph[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in sr ? sr[r] : Ai(r, r.split(":"));
  } catch {
    if (e in sr) return sr[e];
    const n = e?.match(Lh);
    return n ? Ai(e, n.slice(1)) : NaN;
  }
}
const Lh = /([+-]\d\d):?(\d\d)?/;
function Ai(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return sr[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class ft extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(tn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), fc(this), Bs(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new ft(...n, t) : new ft(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new ft(+this, t);
  }
  getTimezoneOffset() {
    const t = -tn(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Bs(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ft(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Pi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Pi.test(e)) return;
  const t = e.replace(Pi, "$1UTC");
  ft.prototype[t] && (e.startsWith("get") ? ft.prototype[e] = function() {
    return this.internal[t]();
  } : (ft.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Ih(this), +this;
  }, ft.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Bs(this), +this;
  }));
});
function Bs(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-tn(e.timeZone, e) * 60));
}
function Ih(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), fc(e);
}
function fc(e) {
  const t = tn(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), a = o - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const c = o > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, d = Math.round(-(tn(e.timeZone, e) * 60)) % 60;
  (d || c) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + c));
  const p = tn(e.timeZone, e), h = p > 0 ? Math.floor(p) : Math.ceil(p), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, y = h !== n, v = g - l;
  if (y && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const b = tn(e.timeZone, e), w = b > 0 ? Math.floor(b) : Math.ceil(b), E = h - w;
    E && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + E), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + E));
  }
}
class Be extends ft {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Be(...n, t) : new Be(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Ah(this.timeZone, this)})`;
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
    return new Be(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Be(+new Date(t), this.timeZone);
  }
  //#endregion
}
const pc = 6048e5, Oh = 864e5, Li = Symbol.for("constructDateFrom");
function De(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Li in e ? e[Li](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function xe(e, t) {
  return De(t || e, e);
}
function hc(e, t, n) {
  const r = xe(e, n?.in);
  return isNaN(t) ? De(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function mc(e, t, n) {
  const r = xe(e, n?.in);
  if (isNaN(t)) return De(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = De(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const a = s.getDate();
  return o >= a ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let _h = {};
function xr() {
  return _h;
}
function Ln(e, t) {
  const n = xr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = xe(e, t?.in), s = o.getDay(), a = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - a), o.setHours(0, 0, 0, 0), o;
}
function pr(e, t) {
  return Ln(e, { ...t, weekStartsOn: 1 });
}
function gc(e, t) {
  const n = xe(e, t?.in), r = n.getFullYear(), o = De(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = pr(o), a = De(n, 0);
  a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0);
  const i = pr(a);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function Ii(e) {
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
function Wn(e, ...t) {
  const n = De.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function hr(e, t) {
  const n = xe(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function yc(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  ), s = hr(r), a = hr(o), i = +s - Ii(s), l = +a - Ii(a);
  return Math.round((i - l) / Oh);
}
function $h(e, t) {
  const n = gc(e, t), r = De(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), pr(r);
}
function zh(e, t, n) {
  return hc(e, t * 7, n);
}
function Bh(e, t, n) {
  return mc(e, t * 12, n);
}
function Hh(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = De.bind(null, o));
    const s = xe(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), De(r, n || NaN);
}
function Wh(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = De.bind(null, o));
    const s = xe(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), De(r, n || NaN);
}
function Fh(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  );
  return +hr(r) == +hr(o);
}
function bc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Uh(e) {
  return !(!bc(e) && typeof e != "number" || isNaN(+xe(e)));
}
function Yh(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), a = r.getMonth() - o.getMonth();
  return s * 12 + a;
}
function jh(e, t) {
  const n = xe(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function vc(e, t) {
  const [n, r] = Wn(e, t.start, t.end);
  return { start: n, end: r };
}
function Vh(e, t) {
  const { start: n, end: r } = vc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(De(n, a)), a.setMonth(a.getMonth() + i);
  return o ? l.reverse() : l;
}
function Kh(e, t) {
  const n = xe(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function qh(e, t) {
  const n = xe(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function wc(e, t) {
  const n = xe(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Gh(e, t) {
  const { start: n, end: r } = vc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(De(n, a)), a.setFullYear(a.getFullYear() + i);
  return o ? l.reverse() : l;
}
function kc(e, t) {
  const n = xr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = xe(e, t?.in), s = o.getDay(), a = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + a), o.setHours(23, 59, 59, 999), o;
}
function Zh(e, t) {
  return kc(e, { ...t, weekStartsOn: 1 });
}
const Xh = {
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
}, Qh = (e, t, n) => {
  let r;
  const o = Xh[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function us(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Jh = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, em = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, tm = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, nm = {
  date: us({
    formats: Jh,
    defaultWidth: "full"
  }),
  time: us({
    formats: em,
    defaultWidth: "full"
  }),
  dateTime: us({
    formats: tm,
    defaultWidth: "full"
  })
}, rm = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, om = (e, t, n, r) => rm[e];
function Jn(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const a = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : a;
      o = e.formattingValues[i] || e.formattingValues[a];
    } else {
      const a = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
      o = e.values[i] || e.values[a];
    }
    const s = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[s];
  };
}
const sm = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, am = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, im = {
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
}, lm = {
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
}, cm = {
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
}, um = {
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
}, dm = (e, t) => {
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
}, fm = {
  ordinalNumber: dm,
  era: Jn({
    values: sm,
    defaultWidth: "wide"
  }),
  quarter: Jn({
    values: am,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Jn({
    values: im,
    defaultWidth: "wide"
  }),
  day: Jn({
    values: lm,
    defaultWidth: "wide"
  }),
  dayPeriod: Jn({
    values: cm,
    defaultWidth: "wide",
    formattingValues: um,
    defaultFormattingWidth: "wide"
  })
};
function er(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const a = s[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? hm(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      pm(i, (d) => d.test(a))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(l) : l, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const c = t.slice(a.length);
    return { value: u, rest: c };
  };
}
function pm(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function hm(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function mm(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], s = t.match(e.parsePattern);
    if (!s) return null;
    let a = e.valueCallback ? e.valueCallback(s[0]) : s[0];
    a = n.valueCallback ? n.valueCallback(a) : a;
    const i = t.slice(o.length);
    return { value: a, rest: i };
  };
}
const gm = /^(\d+)(th|st|nd|rd)?/i, ym = /\d+/i, bm = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, vm = {
  any: [/^b/i, /^(a|c)/i]
}, wm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, km = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, xm = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Cm = {
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
}, Sm = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Tm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Mm = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Em = {
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
}, Dm = {
  ordinalNumber: mm({
    matchPattern: gm,
    parsePattern: ym,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: er({
    matchPatterns: bm,
    defaultMatchWidth: "wide",
    parsePatterns: vm,
    defaultParseWidth: "any"
  }),
  quarter: er({
    matchPatterns: wm,
    defaultMatchWidth: "wide",
    parsePatterns: km,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: er({
    matchPatterns: xm,
    defaultMatchWidth: "wide",
    parsePatterns: Cm,
    defaultParseWidth: "any"
  }),
  day: er({
    matchPatterns: Sm,
    defaultMatchWidth: "wide",
    parsePatterns: Tm,
    defaultParseWidth: "any"
  }),
  dayPeriod: er({
    matchPatterns: Mm,
    defaultMatchWidth: "any",
    parsePatterns: Em,
    defaultParseWidth: "any"
  })
}, Da = {
  code: "en-US",
  formatDistance: Qh,
  formatLong: nm,
  formatRelative: om,
  localize: fm,
  match: Dm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Nm(e, t) {
  const n = xe(e, t?.in);
  return yc(n, wc(n)) + 1;
}
function xc(e, t) {
  const n = xe(e, t?.in), r = +pr(n) - +$h(n);
  return Math.round(r / pc) + 1;
}
function Cc(e, t) {
  const n = xe(e, t?.in), r = n.getFullYear(), o = xr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = De(t?.in || e, 0);
  a.setFullYear(r + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = Ln(a, t), l = De(t?.in || e, 0);
  l.setFullYear(r, 0, s), l.setHours(0, 0, 0, 0);
  const u = Ln(l, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function Rm(e, t) {
  const n = xr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Cc(e, t), s = De(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Ln(s, t);
}
function Sc(e, t) {
  const n = xe(e, t?.in), r = +Ln(n, t) - +Rm(n, t);
  return Math.round(r / pc) + 1;
}
function ke(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const zt = {
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
}, bn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Oi = {
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
    return zt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Cc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const a = s % 100;
      return ke(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : ke(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = gc(e);
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
        return zt.M(e, t);
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
    const o = Sc(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ke(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = xc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ke(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : zt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Nm(e);
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
    switch (r === 12 ? o = bn.noon : r === 0 ? o = bn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = bn.evening : r >= 12 ? o = bn.afternoon : r >= 4 ? o = bn.morning : o = bn.night, t) {
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
    return zt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : zt.H(e, t);
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
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : zt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : zt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return zt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return $i(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Qt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Qt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return $i(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Qt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Qt(r, ":");
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
        return "GMT" + _i(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Qt(r, ":");
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
        return "GMT" + _i(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Qt(r, ":");
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
function _i(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + ke(s, 2);
}
function $i(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ke(Math.abs(e) / 60, 2) : Qt(e, t);
}
function Qt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ke(Math.trunc(r / 60), 2), s = ke(r % 60, 2);
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
}, Tc = (e, t) => {
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
}, Am = (e, t) => {
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
  return s.replace("{{date}}", zi(r, t)).replace("{{time}}", Tc(o, t));
}, Pm = {
  p: Tc,
  P: Am
}, Lm = /^D+$/, Im = /^Y+$/, Om = ["D", "DD", "YY", "YYYY"];
function _m(e) {
  return Lm.test(e);
}
function $m(e) {
  return Im.test(e);
}
function zm(e, t, n) {
  const r = Bm(e, t, n);
  if (console.warn(r), Om.includes(e)) throw new RangeError(r);
}
function Bm(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Hm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Wm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Fm = /^'([^]*?)'?$/, Um = /''/g, Ym = /[a-zA-Z]/;
function jm(e, t, n) {
  const r = xr(), o = n?.locale ?? r.locale ?? Da, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = xe(e, n?.in);
  if (!Uh(i))
    throw new RangeError("Invalid time value");
  let l = t.match(Wm).map((c) => {
    const d = c[0];
    if (d === "p" || d === "P") {
      const p = Pm[d];
      return p(c, o.formatLong);
    }
    return c;
  }).join("").match(Hm).map((c) => {
    if (c === "''")
      return { isToken: !1, value: "'" };
    const d = c[0];
    if (d === "'")
      return { isToken: !1, value: Vm(c) };
    if (Oi[d])
      return { isToken: !0, value: c };
    if (d.match(Ym))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: c };
  });
  o.localize.preprocessor && (l = o.localize.preprocessor(i, l));
  const u = {
    firstWeekContainsDate: s,
    weekStartsOn: a,
    locale: o
  };
  return l.map((c) => {
    if (!c.isToken) return c.value;
    const d = c.value;
    (!n?.useAdditionalWeekYearTokens && $m(d) || !n?.useAdditionalDayOfYearTokens && _m(d)) && zm(d, t, String(e));
    const p = Oi[d[0]];
    return p(i, d, o.localize, u);
  }).join("");
}
function Vm(e) {
  const t = e.match(Fm);
  return t ? t[1].replace(Um, "'") : e;
}
function Km(e, t) {
  const n = xe(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = De(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function qm(e, t) {
  return xe(e, t?.in).getMonth();
}
function Gm(e, t) {
  return xe(e, t?.in).getFullYear();
}
function Zm(e, t) {
  return +xe(e) > +xe(t);
}
function Xm(e, t) {
  return +xe(e) < +xe(t);
}
function Qm(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Jm(e, t, n) {
  const [r, o] = Wn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function eg(e, t, n) {
  const r = xe(e, n?.in), o = r.getFullYear(), s = r.getDate(), a = De(e, 0);
  a.setFullYear(o, t, 15), a.setHours(0, 0, 0, 0);
  const i = Km(a);
  return r.setMonth(t, Math.min(s, i)), r;
}
function tg(e, t, n) {
  const r = xe(e, n?.in);
  return isNaN(+r) ? De(e, NaN) : (r.setFullYear(t), r);
}
const Bi = 5, ng = 4;
function rg(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Bi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Bi : ng;
}
function Mc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function og(e, t) {
  const n = Mc(e, t), r = rg(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Qe {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Be.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Be(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : hc(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : mc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : zh(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : Bh(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : yc(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Yh(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Vh(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Gh(r), s = new Set(o.map((i) => this.getYear(i)));
      if (s.size === o.length)
        return o;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : og(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Zh(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : jh(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : kc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : qh(r), this.format = (r, o, s) => {
      const a = this.overrides?.format ? this.overrides.format(r, o, this.options) : jm(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : xc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : qm(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : Gm(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Sc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Zm(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Xm(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : bc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Fh(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : Qm(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Jm(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Hh(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Wh(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : eg(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : tg(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Mc(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : hr(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : pr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Kh(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Ln(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : wc(r), this.options = { locale: Da, ...t }, this.overrides = n;
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
    return t && Qe.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Qe.yearFirstLocales.has(s))
      try {
        return new Intl.DateTimeFormat(s, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: o
        }).format(t);
      } catch {
      }
    const a = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, a);
  }
}
Qe.yearFirstLocales = /* @__PURE__ */ new Set([
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
const yt = new Qe();
class Ec {
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
class sg {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class ag {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function ig(e) {
  return q.createElement("button", { ...e });
}
function lg(e) {
  return q.createElement("span", { ...e });
}
function cg(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    q.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && q.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && q.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && q.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && q.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function ug(e) {
  const { day: t, modifiers: n, ...r } = e;
  return q.createElement("td", { ...r });
}
function dg(e) {
  const { day: t, modifiers: n, ...r } = e, o = q.useRef(null);
  return q.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), q.createElement("button", { ref: o, ...r });
}
var ee;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(ee || (ee = {}));
var Te;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Te || (Te = {}));
var st;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(st || (st = {}));
var qe;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(qe || (qe = {}));
function fg(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, a = [o[ee.Dropdown], n].join(" "), i = t?.find(({ value: l }) => l === s.value);
  return q.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[ee.DropdownRoot] },
    q.createElement(r.Select, { className: a, ...s }, t?.map(({ value: l, label: u, disabled: c }) => q.createElement(r.Option, { key: l, value: l, disabled: c }, u))),
    q.createElement(
      "span",
      { className: o[ee.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      q.createElement(r.Chevron, { orientation: "down", size: 18, className: o[ee.Chevron] })
    )
  );
}
function pg(e) {
  return q.createElement("div", { ...e });
}
function hg(e) {
  return q.createElement("div", { ...e });
}
function mg(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return q.createElement("div", { ...r }, e.children);
}
function gg(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return q.createElement("div", { ...r });
}
function yg(e) {
  return q.createElement("table", { ...e });
}
function bg(e) {
  return q.createElement("div", { ...e });
}
const Dc = Ul(void 0);
function Cr() {
  const e = Yl(Dc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function vg(e) {
  const { components: t } = Cr();
  return q.createElement(t.Dropdown, { ...e });
}
function wg(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: u } } = Cr(), c = F((p) => {
    o && n?.(p);
  }, [o, n]), d = F((p) => {
    r && t?.(p);
  }, [r, t]);
  return q.createElement(
    "nav",
    { ...s },
    q.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[ee.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: d },
      q.createElement(a.Chevron, { disabled: r ? void 0 : !0, className: i[ee.Chevron], orientation: "left" })
    ),
    q.createElement(
      a.NextMonthButton,
      { type: "button", className: i[ee.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": u(o), onClick: c },
      q.createElement(a.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[ee.Chevron] })
    )
  );
}
function kg(e) {
  const { components: t } = Cr();
  return q.createElement(t.Button, { ...e });
}
function xg(e) {
  return q.createElement("option", { ...e });
}
function Cg(e) {
  const { components: t } = Cr();
  return q.createElement(t.Button, { ...e });
}
function Sg(e) {
  const { rootRef: t, ...n } = e;
  return q.createElement("div", { ...n, ref: t });
}
function Tg(e) {
  return q.createElement("select", { ...e });
}
function Mg(e) {
  const { week: t, ...n } = e;
  return q.createElement("tr", { ...n });
}
function Eg(e) {
  return q.createElement("th", { ...e });
}
function Dg(e) {
  return q.createElement(
    "thead",
    { "aria-hidden": !0 },
    q.createElement("tr", { ...e })
  );
}
function Ng(e) {
  const { week: t, ...n } = e;
  return q.createElement("th", { ...n });
}
function Rg(e) {
  return q.createElement("th", { ...e });
}
function Ag(e) {
  return q.createElement("tbody", { ...e });
}
function Pg(e) {
  const { components: t } = Cr();
  return q.createElement(t.Dropdown, { ...e });
}
const Lg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: ig,
  CaptionLabel: lg,
  Chevron: cg,
  Day: ug,
  DayButton: dg,
  Dropdown: fg,
  DropdownNav: pg,
  Footer: hg,
  Month: mg,
  MonthCaption: gg,
  MonthGrid: yg,
  Months: bg,
  MonthsDropdown: vg,
  Nav: wg,
  NextMonthButton: kg,
  Option: xg,
  PreviousMonthButton: Cg,
  Root: Sg,
  Select: Tg,
  Week: Mg,
  WeekNumber: Ng,
  WeekNumberHeader: Rg,
  Weekday: Eg,
  Weekdays: Dg,
  Weeks: Ag,
  YearsDropdown: Pg
}, Symbol.toStringTag, { value: "Module" }));
function Et(e, t, n = !1, r = yt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = r;
  return o && s ? (a(s, o) < 0 && ([o, s] = [s, o]), a(t, o) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && o ? i(o, t) : !1;
}
function Nc(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Na(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Rc(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Ac(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Pc(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Lc(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Dt(e, t, n = yt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: a } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Lc(i, n))
      return i.includes(e);
    if (Na(i))
      return Et(i, e, !1, n);
    if (Pc(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Nc(i)) {
      const l = s(i.before, e), u = s(i.after, e), c = l > 0, d = u < 0;
      return a(i.before, i.after) ? d && c : c || d;
    }
    return Rc(i) ? s(e, i.after) > 0 : Ac(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Ig(e, t, n, r, o) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: u, today: c } = t, { isSameDay: d, isSameMonth: p, startOfMonth: h, isBefore: m, endOfMonth: g, isAfter: y } = o, v = n && h(n), b = r && g(r), w = {
    [Te.focused]: [],
    [Te.outside]: [],
    [Te.disabled]: [],
    [Te.hidden]: [],
    [Te.today]: []
  }, E = {};
  for (const x of e) {
    const { date: M, displayMonth: D } = x, C = !!(D && !p(M, D)), T = !!(v && m(M, v)), k = !!(b && y(M, b)), R = !!(s && Dt(M, s, o)), N = !!(a && Dt(M, a, o)) || T || k || // Broadcast calendar will show outside days as default
    !u && !l && C || u && l === !1 && C, L = d(M, c ?? o.today());
    C && w.outside.push(x), R && w.disabled.push(x), N && w.hidden.push(x), L && w.today.push(x), i && Object.keys(i).forEach((I) => {
      const _ = i?.[I];
      _ && Dt(M, _, o) && (E[I] ? E[I].push(x) : E[I] = [x]);
    });
  }
  return (x) => {
    const M = {
      [Te.focused]: !1,
      [Te.disabled]: !1,
      [Te.hidden]: !1,
      [Te.outside]: !1,
      [Te.today]: !1
    }, D = {};
    for (const C in w) {
      const T = w[C];
      M[C] = T.some((k) => k === x);
    }
    for (const C in E)
      D[C] = E[C].some((T) => T === x);
    return {
      ...M,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function Og(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[Te[s]] ? o.push(t[Te[s]]) : t[st[s]] && o.push(t[st[s]]), o), [t[ee.Day]]);
}
function _g(e) {
  return {
    ...Lg,
    ...e
  };
}
function $g(e) {
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
function Ra() {
  const e = {};
  for (const t in ee)
    e[ee[t]] = `rdp-${ee[t]}`;
  for (const t in Te)
    e[Te[t]] = `rdp-${Te[t]}`;
  for (const t in st)
    e[st[t]] = `rdp-${st[t]}`;
  for (const t in qe)
    e[qe[t]] = `rdp-${qe[t]}`;
  return e;
}
function Ic(e, t, n) {
  return (n ?? new Qe(t)).formatMonthYear(e);
}
const zg = Ic;
function Bg(e, t, n) {
  return (n ?? new Qe(t)).format(e, "d");
}
function Hg(e, t = yt) {
  return t.format(e, "LLLL");
}
function Wg(e, t, n) {
  return (n ?? new Qe(t)).format(e, "cccccc");
}
function Fg(e, t = yt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Ug() {
  return "";
}
function Oc(e, t = yt) {
  return t.format(e, "yyyy");
}
const Yg = Oc, jg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Ic,
  formatDay: Bg,
  formatMonthCaption: zg,
  formatMonthDropdown: Hg,
  formatWeekNumber: Fg,
  formatWeekNumberHeader: Ug,
  formatWeekdayName: Wg,
  formatYearCaption: Yg,
  formatYearDropdown: Oc
}, Symbol.toStringTag, { value: "Module" }));
function Vg(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...jg,
    ...e
  };
}
function Kg(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: u } = o;
  return l({
    start: a(e),
    end: i(e)
  }).map((p) => {
    const h = r.formatMonthDropdown(p, o), m = u(p), g = t && p < s(t) || n && p > s(n) || !1;
    return { value: m, label: h, disabled: g };
  });
}
function qg(e, t = {}, n = {}) {
  let r = { ...t?.[ee.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function Gg(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(o, a);
    s.push(i);
  }
  return s;
}
function Zg(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: a, eachYearOfInterval: i, getYear: l } = r, u = s(e), c = a(t), d = i({ start: u, end: c });
  return o && d.reverse(), d.map((p) => {
    const h = n.formatYearDropdown(p, r);
    return {
      value: l(p),
      label: h,
      disabled: !1
    };
  });
}
function _c(e, t, n, r) {
  let o = (r ?? new Qe(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Xg = _c;
function $c(e, t, n) {
  return (n ?? new Qe(t)).formatMonthYear(e);
}
const Qg = $c;
function Jg(e, t, n, r) {
  let o = (r ?? new Qe(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function ey(e) {
  return "Choose the Month";
}
function ty() {
  return "";
}
function ny(e) {
  return "Go to the Next Month";
}
function ry(e) {
  return "Go to the Previous Month";
}
function oy(e, t, n) {
  return (n ?? new Qe(t)).format(e, "cccc");
}
function sy(e, t) {
  return `Week ${e}`;
}
function ay(e) {
  return "Week Number";
}
function iy(e) {
  return "Choose the Year";
}
const ly = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Qg,
  labelDay: Xg,
  labelDayButton: _c,
  labelGrid: $c,
  labelGridcell: Jg,
  labelMonthDropdown: ey,
  labelNav: ty,
  labelNext: ny,
  labelPrevious: ry,
  labelWeekNumber: sy,
  labelWeekNumberHeader: ay,
  labelWeekday: oy,
  labelYearDropdown: iy
}, Symbol.toStringTag, { value: "Module" })), Sr = (e) => e instanceof HTMLElement ? e : null, ds = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], cy = (e) => Sr(e.querySelector("[data-animated-month]")), fs = (e) => Sr(e.querySelector("[data-animated-caption]")), ps = (e) => Sr(e.querySelector("[data-animated-weeks]")), uy = (e) => Sr(e.querySelector("[data-animated-nav]")), dy = (e) => Sr(e.querySelector("[data-animated-weekdays]"));
function fy(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const a = V(null), i = V(r), l = V(!1);
  To(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const c = s.isSameMonth(r[0].date, u[0].date), d = s.isAfter(r[0].date, u[0].date), p = d ? n[qe.caption_after_enter] : n[qe.caption_before_enter], h = d ? n[qe.weeks_after_enter] : n[qe.weeks_before_enter], m = a.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (ds(g).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const E = cy(w);
      E && w.contains(E) && w.removeChild(E);
      const x = fs(w);
      x && x.classList.remove(p);
      const M = ps(w);
      M && M.classList.remove(h);
    }), a.current = g) : a.current = null, l.current || c || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = m instanceof HTMLElement ? ds(m) : [], v = ds(e.current);
    if (v?.every((b) => b instanceof HTMLElement) && y && y.every((b) => b instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const b = uy(e.current);
      b && (b.style.zIndex = "1"), v.forEach((w, E) => {
        const x = y[E];
        if (!x)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const M = fs(w);
        M && M.classList.add(p);
        const D = ps(w);
        D && D.classList.add(h);
        const C = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), M && M.classList.remove(p), D && D.classList.remove(h), w.style.position = "", w.style.overflow = "", w.contains(x) && w.removeChild(x);
        };
        x.style.pointerEvents = "none", x.style.position = "absolute", x.style.overflow = "hidden", x.setAttribute("aria-hidden", "true");
        const T = dy(x);
        T && (T.style.opacity = "0");
        const k = fs(x);
        k && (k.classList.add(d ? n[qe.caption_before_exit] : n[qe.caption_after_exit]), k.addEventListener("animationend", C));
        const R = ps(x);
        R && R.classList.add(d ? n[qe.weeks_before_exit] : n[qe.weeks_after_exit]), w.insertBefore(x, w.firstChild);
      });
    }
  });
}
function py(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: c, differenceInCalendarMonths: d, endOfBroadcastWeek: p, endOfISOWeek: h, endOfMonth: m, endOfWeek: g, isAfter: y, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: w } = r, E = l ? v(o, r) : a ? b(o) : w(o), x = l ? p(s) : a ? h(m(s)) : g(m(s)), M = c(x, E), D = d(s, o) + 1, C = [];
  for (let R = 0; R <= M; R++) {
    const N = u(E, R);
    if (t && y(N, t))
      break;
    C.push(N);
  }
  const k = (l ? 35 : 42) * D;
  if (i && C.length < k) {
    const R = k - C.length;
    for (let N = 0; N < R; N++) {
      const L = u(C[C.length - 1], 1);
      C.push(L);
    }
  }
  return C;
}
function hy(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function my(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let a = 0; a < o; a++) {
    const i = r.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function Hi(e, t, n, r) {
  const { month: o, defaultMonth: s, today: a = r.today(), numberOfMonths: i = 1 } = e;
  let l = o || s || a;
  const { differenceInCalendarMonths: u, addMonths: c, startOfMonth: d } = r;
  if (n && u(n, l) < i - 1) {
    const p = -1 * (i - 1);
    l = c(n, p);
  }
  return t && u(l, t) < 0 && (l = t), d(l);
}
function gy(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: u, getWeek: c, startOfBroadcastWeek: d, startOfISOWeek: p, startOfWeek: h } = r, m = e.reduce((g, y) => {
    const v = n.broadcastCalendar ? d(y, r) : n.ISOWeek ? p(y) : h(y), b = n.broadcastCalendar ? s(y) : n.ISOWeek ? a(i(y)) : l(i(y)), w = t.filter((D) => D >= v && D <= b), E = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < E) {
      const D = t.filter((C) => {
        const T = E - w.length;
        return C > b && C <= o(b, T);
      });
      w.push(...D);
    }
    const x = w.reduce((D, C) => {
      const T = n.ISOWeek ? u(C) : c(C), k = D.find((N) => N.weekNumber === T), R = new Ec(C, y, r);
      return k ? k.days.push(R) : D.push(new ag(T, [R])), D;
    }, []), M = new sg(y, x);
    return g.push(M), g;
  }, []);
  return n.reverseMonths ? m.reverse() : m;
}
function yy(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: u, newDate: c, today: d } = t, { fromYear: p, toYear: h, fromMonth: m, toMonth: g } = e;
  !n && m && (n = m), !n && p && (n = t.newDate(p, 0, 1)), !r && g && (r = g), !r && h && (r = c(h, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : p ? n = c(p, 0, 1) : !n && y && (n = o(l(e.today ?? d(), -100))), r ? r = i(r) : h ? r = c(h, 11, 31) : !r && y && (r = u(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function by(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? s : 1, c = a(e);
  if (!t)
    return i(c, u);
  if (!(l(t, e) < s))
    return i(c, u);
}
function vy(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? s ?? 1 : 1, c = a(e);
  if (!t)
    return i(c, -u);
  if (!(l(c, t) <= 0))
    return i(c, -u);
}
function wy(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function No(e, t) {
  const [n, r] = j(e);
  return [t === void 0 ? n : t, r];
}
function ky(e, t) {
  const [n, r] = yy(e, t), { startOfMonth: o, endOfMonth: s } = t, a = Hi(e, n, r, t), [i, l] = No(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  G(() => {
    const M = Hi(e, n, r, t);
    l(M);
  }, [e.timeZone]);
  const u = my(i, r, e, t), c = py(u, e.endMonth ? s(e.endMonth) : void 0, e, t), d = gy(u, c, e, t), p = wy(d), h = hy(d), m = vy(i, n, e, t), g = by(i, r, e, t), { disableNavigation: y, onMonthChange: v } = e, b = (M) => p.some((D) => D.days.some((C) => C.isEqualTo(M))), w = (M) => {
    if (y)
      return;
    let D = o(M);
    n && D < o(n) && (D = o(n)), r && D > o(r) && (D = o(r)), l(D), v?.(D);
  };
  return {
    months: d,
    weeks: p,
    days: h,
    navStart: n,
    navEnd: r,
    previousMonth: m,
    nextMonth: g,
    goToMonth: w,
    goToDay: (M) => {
      b(M) || w(M.date);
    }
  };
}
var ut;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ut || (ut = {}));
function Wi(e) {
  return !e[Te.disabled] && !e[Te.hidden] && !e[Te.outside];
}
function xy(e, t, n, r) {
  let o, s = -1;
  for (const a of e) {
    const i = t(a);
    Wi(i) && (i[Te.focused] && s < ut.FocusedModifier ? (o = a, s = ut.FocusedModifier) : r?.isEqualTo(a) && s < ut.LastFocused ? (o = a, s = ut.LastFocused) : n(a.date) && s < ut.Selected ? (o = a, s = ut.Selected) : i[Te.today] && s < ut.Today && (o = a, s = ut.Today));
  }
  return o || (o = e.find((a) => Wi(t(a)))), o;
}
function Cy(e, t, n, r, o, s, a) {
  const { ISOWeek: i, broadcastCalendar: l } = s, { addDays: u, addMonths: c, addWeeks: d, addYears: p, endOfBroadcastWeek: h, endOfISOWeek: m, endOfWeek: g, max: y, min: v, startOfBroadcastWeek: b, startOfISOWeek: w, startOfWeek: E } = a;
  let M = {
    day: u,
    week: d,
    month: c,
    year: p,
    startOfWeek: (D) => l ? b(D, a) : i ? w(D) : E(D),
    endOfWeek: (D) => l ? h(D) : i ? m(D) : g(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? M = y([r, M]) : t === "after" && o && (M = v([o, M])), M;
}
function zc(e, t, n, r, o, s, a, i = 0) {
  if (i > 365)
    return;
  const l = Cy(e, t, n.date, r, o, s, a), u = !!(s.disabled && Dt(l, s.disabled, a)), c = !!(s.hidden && Dt(l, s.hidden, a)), d = l, p = new Ec(l, d, a);
  return !u && !c ? p : zc(e, t, p, r, o, s, a, i + 1);
}
function Sy(e, t, n, r, o) {
  const { autoFocus: s } = e, [a, i] = j(), l = xy(t.days, n, r || (() => !1), a), [u, c] = j(s ? l : void 0);
  return {
    isFocusTarget: (g) => !!l?.isEqualTo(g),
    setFocused: c,
    focused: u,
    blur: () => {
      i(u), c(void 0);
    },
    moveFocus: (g, y) => {
      if (!u)
        return;
      const v = zc(g, y, u, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(v)) || (t.goToDay(v), c(v)));
    }
  };
}
function Ty(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = No(n, o ? n : void 0), i = o ? n : s, { isSameDay: l } = t, u = (h) => i?.some((m) => l(m, h)) ?? !1, { min: c, max: d } = e;
  return {
    selected: i,
    select: (h, m, g) => {
      let y = [...i ?? []];
      if (u(h)) {
        if (i?.length === c || r && i?.length === 1)
          return;
        y = i?.filter((v) => !l(v, h));
      } else
        i?.length === d ? y = [h] : y = [...y, h];
      return o || a(y), o?.(y, h, m, g), y;
    },
    isSelected: u
  };
}
function My(e, t, n = 0, r = 0, o = !1, s = yt) {
  const { from: a, to: i } = t || {}, { isSameDay: l, isAfter: u, isBefore: c } = s;
  let d;
  if (!a && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (a && !i)
    l(a, e) ? n === 0 ? d = { from: a, to: e } : o ? d = { from: a, to: void 0 } : d = void 0 : c(e, a) ? d = { from: e, to: a } : d = { from: a, to: e };
  else if (a && i)
    if (l(a, e) && l(i, e))
      o ? d = { from: a, to: i } : d = void 0;
    else if (l(a, e))
      d = { from: a, to: n > 0 ? void 0 : e };
    else if (l(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (c(e, a))
      d = { from: e, to: i };
    else if (u(e, a))
      d = { from: a, to: e };
    else if (u(e, i))
      d = { from: a, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const p = s.differenceInCalendarDays(d.to, d.from);
    r > 0 && p > r ? d = { from: e, to: void 0 } : n > 1 && p < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function Ey(e, t, n = yt) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const s = n.differenceInCalendarDays(e.to, e.from), a = Math.min(s, 6);
  for (let i = 0; i <= a; i++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function Fi(e, t, n = yt) {
  return Et(e, t.from, !1, n) || Et(e, t.to, !1, n) || Et(t, e.from, !1, n) || Et(t, e.to, !1, n);
}
function Dy(e, t, n = yt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Et(e, i, !1, n) : Lc(i, n) ? i.some((l) => Et(e, l, !1, n)) : Na(i) ? i.from && i.to ? Fi(e, { from: i.from, to: i.to }, n) : !1 : Pc(i) ? Ey(e, i.dayOfWeek, n) : Nc(i) ? n.isAfter(i.before, i.after) ? Fi(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : Dt(e.from, i, n) || Dt(e.to, i, n) : Rc(i) || Ac(i) ? Dt(e.from, i, n) || Dt(e.to, i, n) : !1))
    return !0;
  const a = r.filter((i) => typeof i == "function");
  if (a.length) {
    let i = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= l; u++) {
      if (a.some((c) => c(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Ny(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: a } = e, [i, l] = No(o, a ? o : void 0), u = a ? o : i;
  return {
    selected: u,
    select: (p, h, m) => {
      const { min: g, max: y } = e, v = p ? My(p, u, g, y, s, t) : void 0;
      return r && n && v?.from && v.to && Dy({ from: v.from, to: v.to }, n, t) && (v.from = p, v.to = void 0), a || l(v), a?.(v, p, h, m), v;
    },
    isSelected: (p) => u && Et(u, p, !1, t)
  };
}
function Ry(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = No(n, o ? n : void 0), i = o ? n : s, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, p, h) => {
      let m = d;
      return !r && i && i && l(d, i) && (m = void 0), o || a(m), o?.(m, d, p, h), m;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function Ay(e, t) {
  const n = Ry(e, t), r = Ty(e, t), o = Ny(e, t);
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
function Py(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Be(t.today, t.timeZone)), t.month && (t.month = new Be(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Be(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Be(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Be(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Be(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ue) => new Be(ue, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Be(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Be(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: a, classNames: i } = rn(() => {
    const ue = { ...Da, ...t.locale };
    return {
      dateLib: new Qe({
        locale: ue,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: _g(t.components),
      formatters: Vg(t.formatters),
      labels: { ...ly, ...t.labels },
      locale: ue,
      classNames: { ...Ra(), ...t.classNames }
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
  ]), { captionLayout: l, mode: u, navLayout: c, numberOfMonths: d = 1, onDayBlur: p, onDayClick: h, onDayFocus: m, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: v, onNextClick: b, onPrevClick: w, showWeekNumber: E, styles: x } = t, { formatCaption: M, formatDay: D, formatMonthDropdown: C, formatWeekNumber: T, formatWeekNumberHeader: k, formatWeekdayName: R, formatYearDropdown: N } = r, L = ky(t, s), { days: I, months: _, navStart: H, navEnd: K, previousMonth: P, nextMonth: B, goToMonth: ne } = L, ae = Ig(I, t, H, K, s), { isSelected: oe, select: re, selected: ie } = Ay(t, s) ?? {}, { blur: $, focused: W, isFocusTarget: Y, moveFocus: Q, setFocused: pe } = Sy(t, L, ae, oe ?? (() => !1), s), { labelDayButton: be, labelGridcell: Me, labelGrid: Oe, labelMonthDropdown: Je, labelNav: Lt, labelPrevious: Kn, labelNext: qn, labelWeekday: Ar, labelWeekNumber: Pr, labelWeekNumberHeader: Lr, labelYearDropdown: Ir } = o, dn = rn(() => Gg(s, t.ISOWeek), [s, t.ISOWeek]), Gn = u !== void 0 || h !== void 0, fn = F(() => {
    P && (ne(P), w?.(P));
  }, [P, ne, w]), pn = F(() => {
    B && (ne(B), b?.(B));
  }, [ne, B, b]), Or = F((ue, Ce) => (te) => {
    te.preventDefault(), te.stopPropagation(), pe(ue), re?.(ue.date, Ce, te), h?.(ue.date, Ce, te);
  }, [re, h, pe]), jo = F((ue, Ce) => (te) => {
    pe(ue), m?.(ue.date, Ce, te);
  }, [m, pe]), Vo = F((ue, Ce) => (te) => {
    $(), p?.(ue.date, Ce, te);
  }, [$, p]), Ko = F((ue, Ce) => (te) => {
    const he = {
      ArrowLeft: [
        te.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        te.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [te.shiftKey ? "year" : "week", "after"],
      ArrowUp: [te.shiftKey ? "year" : "week", "before"],
      PageUp: [te.shiftKey ? "year" : "month", "before"],
      PageDown: [te.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (he[te.key]) {
      te.preventDefault(), te.stopPropagation();
      const [Ne, me] = he[te.key];
      Q(Ne, me);
    }
    g?.(ue.date, Ce, te);
  }, [Q, g, t.dir]), qo = F((ue, Ce) => (te) => {
    y?.(ue.date, Ce, te);
  }, [y]), Go = F((ue, Ce) => (te) => {
    v?.(ue.date, Ce, te);
  }, [v]), vt = F((ue) => (Ce) => {
    const te = Number(Ce.target.value), he = s.setMonth(s.startOfMonth(ue), te);
    ne(he);
  }, [s, ne]), hn = F((ue) => (Ce) => {
    const te = Number(Ce.target.value), he = s.setYear(s.startOfMonth(ue), te);
    ne(he);
  }, [s, ne]), { className: mn, style: Zo } = rn(() => ({
    className: [i[ee.Root], t.className].filter(Boolean).join(" "),
    style: { ...x?.[ee.Root], ...t.style }
  }), [i, t.className, t.style, x]), et = $g(t), wt = V(null);
  fy(wt, !!t.animate, {
    classNames: i,
    months: _,
    focused: W,
    dateLib: s
  });
  const Xo = {
    dayPickerProps: t,
    selected: ie,
    select: re,
    isSelected: oe,
    months: _,
    nextMonth: B,
    previousMonth: P,
    goToMonth: ne,
    getModifiers: ae,
    components: n,
    classNames: i,
    styles: x,
    labels: o,
    formatters: r
  };
  return q.createElement(
    Dc.Provider,
    { value: Xo },
    q.createElement(
      n.Root,
      { rootRef: t.animate ? wt : void 0, className: mn, style: Zo, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...et },
      q.createElement(
        n.Months,
        { className: i[ee.Months], style: x?.[ee.Months] },
        !t.hideNavigation && !c && q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[ee.Nav], style: x?.[ee.Nav], "aria-label": Lt(), onPreviousClick: fn, onNextClick: pn, previousMonth: P, nextMonth: B }),
        _.map((ue, Ce) => q.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[ee.Month],
            style: x?.[ee.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: Ce,
            displayIndex: Ce,
            calendarMonth: ue
          },
          c === "around" && !t.hideNavigation && Ce === 0 && q.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[ee.PreviousMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": Kn(P), onClick: fn, "data-animated-button": t.animate ? "true" : void 0 },
            q.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[ee.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          q.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[ee.MonthCaption], style: x?.[ee.MonthCaption], calendarMonth: ue, displayIndex: Ce }, l?.startsWith("dropdown") ? q.createElement(
            n.DropdownNav,
            { className: i[ee.Dropdowns], style: x?.[ee.Dropdowns] },
            (() => {
              const te = l === "dropdown" || l === "dropdown-months" ? q.createElement(n.MonthsDropdown, { key: "month", className: i[ee.MonthsDropdown], "aria-label": Je(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: vt(ue.date), options: Kg(ue.date, H, K, r, s), style: x?.[ee.Dropdown], value: s.getMonth(ue.date) }) : q.createElement("span", { key: "month" }, C(ue.date, s)), he = l === "dropdown" || l === "dropdown-years" ? q.createElement(n.YearsDropdown, { key: "year", className: i[ee.YearsDropdown], "aria-label": Ir(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: hn(ue.date), options: Zg(H, K, r, s, !!t.reverseYears), style: x?.[ee.Dropdown], value: s.getYear(ue.date) }) : q.createElement("span", { key: "year" }, N(ue.date, s));
              return s.getMonthYearOrder() === "year-first" ? [he, te] : [te, he];
            })(),
            q.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, M(ue.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            q.createElement(n.CaptionLabel, { className: i[ee.CaptionLabel], role: "status", "aria-live": "polite" }, M(ue.date, s.options, s))
          )),
          c === "around" && !t.hideNavigation && Ce === d - 1 && q.createElement(
            n.NextMonthButton,
            { type: "button", className: i[ee.NextMonthButton], tabIndex: B ? void 0 : -1, "aria-disabled": B ? void 0 : !0, "aria-label": qn(B), onClick: pn, "data-animated-button": t.animate ? "true" : void 0 },
            q.createElement(n.Chevron, { disabled: B ? void 0 : !0, className: i[ee.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          Ce === d - 1 && c === "after" && !t.hideNavigation && q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[ee.Nav], style: x?.[ee.Nav], "aria-label": Lt(), onPreviousClick: fn, onNextClick: pn, previousMonth: P, nextMonth: B }),
          q.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": Oe(ue.date, s.options, s) || void 0, className: i[ee.MonthGrid], style: x?.[ee.MonthGrid] },
            !t.hideWeekdays && q.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[ee.Weekdays], style: x?.[ee.Weekdays] },
              E && q.createElement(n.WeekNumberHeader, { "aria-label": Lr(s.options), className: i[ee.WeekNumberHeader], style: x?.[ee.WeekNumberHeader], scope: "col" }, k()),
              dn.map((te) => q.createElement(n.Weekday, { "aria-label": Ar(te, s.options, s), className: i[ee.Weekday], key: String(te), style: x?.[ee.Weekday], scope: "col" }, R(te, s.options, s)))
            ),
            q.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[ee.Weeks], style: x?.[ee.Weeks] }, ue.weeks.map((te) => q.createElement(
              n.Week,
              { className: i[ee.Week], key: te.weekNumber, style: x?.[ee.Week], week: te },
              E && // biome-ignore lint/a11y/useSemanticElements: react component
              q.createElement(n.WeekNumber, { week: te, style: x?.[ee.WeekNumber], "aria-label": Pr(te.weekNumber, {
                locale: a
              }), className: i[ee.WeekNumber], scope: "row", role: "rowheader" }, T(te.weekNumber, s)),
              te.days.map((he) => {
                const { date: Ne } = he, me = ae(he);
                if (me[Te.focused] = !me.hidden && !!W?.isEqualTo(he), me[st.selected] = oe?.(Ne) || me.selected, Na(ie)) {
                  const { from: It, to: Zn } = ie;
                  me[st.range_start] = !!(It && Zn && s.isSameDay(Ne, It)), me[st.range_end] = !!(It && Zn && s.isSameDay(Ne, Zn)), me[st.range_middle] = Et(ie, Ne, !0, s);
                }
                const _r = qg(me, x, t.modifiersStyles), gn = Og(me, i, t.modifiersClassNames), Fe = !Gn && !me.hidden ? Me(Ne, me, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  q.createElement(n.Day, { key: `${s.format(Ne, "yyyy-MM-dd")}_${s.format(he.displayMonth, "yyyy-MM")}`, day: he, modifiers: me, className: gn.join(" "), style: _r, role: "gridcell", "aria-selected": me.selected || void 0, "aria-label": Fe, "data-day": s.format(Ne, "yyyy-MM-dd"), "data-month": he.outside ? s.format(Ne, "yyyy-MM") : void 0, "data-selected": me.selected || void 0, "data-disabled": me.disabled || void 0, "data-hidden": me.hidden || void 0, "data-outside": he.outside || void 0, "data-focused": me.focused || void 0, "data-today": me.today || void 0 }, !me.hidden && Gn ? q.createElement(n.DayButton, { className: i[ee.DayButton], style: x?.[ee.DayButton], type: "button", day: he, modifiers: me, disabled: me.disabled || void 0, tabIndex: Y(he) ? 0 : -1, "aria-label": be(Ne, me, s.options, s), onClick: Or(he, me), onBlur: Vo(he, me), onFocus: jo(he, me), onKeyDown: Ko(he, me), onMouseEnter: qo(he, me), onMouseLeave: Go(he, me) }, D(Ne, s.options, s)) : !me.hidden && D(he.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      q.createElement(n.Footer, { className: i[ee.Footer], style: x?.[ee.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Bc(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Bc(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Hc() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Bc(e)) && (r && (r += " "), r += t);
  return r;
}
const Aa = "-", Ly = (e) => {
  const t = Oy(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(Aa);
      return i[0] === "" && i.length !== 1 && i.shift(), Wc(i, t) || Iy(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && r[a] ? [...l, ...r[a]] : l;
    }
  };
}, Wc = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Wc(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Aa);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, Ui = /^\[(.+)\]$/, Iy = (e) => {
  if (Ui.test(e)) {
    const t = Ui.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Oy = (e) => {
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
      const s = o === "" ? t : Yi(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (_y(o)) {
        Hs(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      Hs(a, Yi(t, s), n, r);
    });
  });
}, Yi = (e, t) => {
  let n = e;
  return t.split(Aa).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, _y = (e) => e.isThemeGetter, $y = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (s, a) => {
    n.set(s, a), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = n.get(s);
      if (a !== void 0)
        return a;
      if ((a = r.get(s)) !== void 0)
        return o(s, a), a;
    },
    set(s, a) {
      n.has(s) ? n.set(s, a) : o(s, a);
    }
  };
}, Ws = "!", Fs = ":", zy = Fs.length, By = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let a = 0, i = 0, l = 0, u;
    for (let m = 0; m < o.length; m++) {
      let g = o[m];
      if (a === 0 && i === 0) {
        if (g === Fs) {
          s.push(o.slice(l, m)), l = m + zy;
          continue;
        }
        if (g === "/") {
          u = m;
          continue;
        }
      }
      g === "[" ? a++ : g === "]" ? a-- : g === "(" ? i++ : g === ")" && i--;
    }
    const c = s.length === 0 ? o : o.substring(l), d = Hy(c), p = d !== c, h = u && u > l ? u - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: p,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + Fs, s = r;
    r = (a) => a.startsWith(o) ? s(a.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: a,
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
}, Hy = (e) => e.endsWith(Ws) ? e.substring(0, e.length - 1) : e.startsWith(Ws) ? e.substring(1) : e, Wy = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const o = [];
    let s = [];
    return r.forEach((a) => {
      a[0] === "[" || t[a] ? (o.push(...s.sort(), a), s = []) : s.push(a);
    }), o.push(...s.sort()), o;
  };
}, Fy = (e) => ({
  cache: $y(e.cacheSize),
  parseClassName: By(e),
  sortModifiers: Wy(e),
  ...Ly(e)
}), Uy = /\s+/, Yy = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(Uy);
  let l = "";
  for (let u = i.length - 1; u >= 0; u -= 1) {
    const c = i[u], {
      isExternal: d,
      modifiers: p,
      hasImportantModifier: h,
      baseClassName: m,
      maybePostfixModifierPosition: g
    } = n(c);
    if (d) {
      l = c + (l.length > 0 ? " " + l : l);
      continue;
    }
    let y = !!g, v = r(y ? m.substring(0, g) : m);
    if (!v) {
      if (!y) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (v = r(m), !v) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      y = !1;
    }
    const b = s(p).join(":"), w = h ? b + Ws : b, E = w + v;
    if (a.includes(E))
      continue;
    a.push(E);
    const x = o(v, y);
    for (let M = 0; M < x.length; ++M) {
      const D = x[M];
      a.push(w + D);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function jy() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Fc(t)) && (r && (r += " "), r += n);
  return r;
}
const Fc = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Fc(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Vy(e, ...t) {
  let n, r, o, s = a;
  function a(l) {
    const u = t.reduce((c, d) => d(c), e());
    return n = Fy(u), r = n.cache.get, o = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const u = r(l);
    if (u)
      return u;
    const c = Yy(l, n);
    return o(l, c), c;
  }
  return function() {
    return s(jy.apply(null, arguments));
  };
}
const Re = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Uc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Yc = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ky = /^\d+\/\d+$/, qy = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Gy = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Zy = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Xy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Qy = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, vn = (e) => Ky.test(e), fe = (e) => !!e && !Number.isNaN(Number(e)), Bt = (e) => !!e && Number.isInteger(Number(e)), hs = (e) => e.endsWith("%") && fe(e.slice(0, -1)), Ct = (e) => qy.test(e), Jy = () => !0, eb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Gy.test(e) && !Zy.test(e)
), jc = () => !1, tb = (e) => Xy.test(e), nb = (e) => Qy.test(e), rb = (e) => !Z(e) && !X(e), ob = (e) => Fn(e, qc, jc), Z = (e) => Uc.test(e), Xt = (e) => Fn(e, Gc, eb), ms = (e) => Fn(e, cb, fe), ji = (e) => Fn(e, Vc, jc), sb = (e) => Fn(e, Kc, nb), Fr = (e) => Fn(e, Zc, tb), X = (e) => Yc.test(e), tr = (e) => Un(e, Gc), ab = (e) => Un(e, ub), Vi = (e) => Un(e, Vc), ib = (e) => Un(e, qc), lb = (e) => Un(e, Kc), Ur = (e) => Un(e, Zc, !0), Fn = (e, t, n) => {
  const r = Uc.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Un = (e, t, n = !1) => {
  const r = Yc.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Vc = (e) => e === "position" || e === "percentage", Kc = (e) => e === "image" || e === "url", qc = (e) => e === "length" || e === "size" || e === "bg-size", Gc = (e) => e === "length", cb = (e) => e === "number", ub = (e) => e === "family-name", Zc = (e) => e === "shadow", db = () => {
  const e = Re("color"), t = Re("font"), n = Re("text"), r = Re("font-weight"), o = Re("tracking"), s = Re("leading"), a = Re("breakpoint"), i = Re("container"), l = Re("spacing"), u = Re("radius"), c = Re("shadow"), d = Re("inset-shadow"), p = Re("text-shadow"), h = Re("drop-shadow"), m = Re("blur"), g = Re("perspective"), y = Re("aspect"), v = Re("ease"), b = Re("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], E = () => [
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
  ], x = () => [...E(), X, Z], M = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], C = () => [X, Z, l], T = () => [vn, "full", "auto", ...C()], k = () => [Bt, "none", "subgrid", X, Z], R = () => ["auto", {
    span: ["full", Bt, X, Z]
  }, Bt, X, Z], N = () => [Bt, "auto", X, Z], L = () => ["auto", "min", "max", "fr", X, Z], I = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], _ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], H = () => ["auto", ...C()], K = () => [vn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], P = () => [e, X, Z], B = () => [...E(), Vi, ji, {
    position: [X, Z]
  }], ne = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ae = () => ["auto", "cover", "contain", ib, ob, {
    size: [X, Z]
  }], oe = () => [hs, tr, Xt], re = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    X,
    Z
  ], ie = () => ["", fe, tr, Xt], $ = () => ["solid", "dashed", "dotted", "double"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => [fe, hs, Vi, ji], Q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    X,
    Z
  ], pe = () => ["none", fe, X, Z], be = () => ["none", fe, X, Z], Me = () => [fe, X, Z], Oe = () => [vn, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ct],
      breakpoint: [Ct],
      color: [Jy],
      container: [Ct],
      "drop-shadow": [Ct],
      ease: ["in", "out", "in-out"],
      font: [rb],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ct],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ct],
      shadow: [Ct],
      spacing: ["px", fe],
      text: [Ct],
      "text-shadow": [Ct],
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
        aspect: ["auto", "square", vn, Z, X, y]
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
        columns: [fe, Z, X, i]
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
        overflow: M()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": M()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": M()
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
        z: [Bt, "auto", X, Z]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [vn, "full", "auto", i, ...C()]
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
        flex: [fe, vn, "auto", "initial", "none", Z]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", fe, X, Z]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", fe, X, Z]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Bt, "first", "last", "none", X, Z]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": k()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: R()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": N()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": N()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": k()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: R()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": N()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": N()
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
        "auto-cols": L()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": L()
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
        justify: [...I(), "normal"]
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
        content: ["normal", ...I()]
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
        "place-content": I()
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
        m: H()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: H()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: H()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: H()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: H()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: H()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: H()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: H()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: H()
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
        text: ["base", n, tr, Xt]
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
        font: [r, X, ms]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", hs, Z]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ab, Z, t]
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
        tracking: [o, X, Z]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [fe, "none", X, ms]
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
        "list-image": ["none", X, Z]
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
        list: ["disc", "decimal", "none", X, Z]
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
        decoration: [fe, "from-font", "auto", X, Xt]
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
        "underline-offset": [fe, "auto", X, Z]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", X, Z]
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
        content: ["none", X, Z]
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
        bg: B()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ne()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ae()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Bt, X, Z],
          radial: ["", X, Z],
          conic: [Bt, X, Z]
        }, lb, sb]
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
        from: oe()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: oe()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: oe()
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
        rounded: re()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": re()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": re()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": re()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": re()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": re()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": re()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": re()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": re()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": re()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": re()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": re()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": re()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": re()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": re()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ie()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ie()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ie()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ie()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ie()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ie()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ie()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ie()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ie()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ie()
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
        "divide-y": ie()
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
        "outline-offset": [fe, X, Z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", fe, tr, Xt]
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
          c,
          Ur,
          Fr
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
        "inset-shadow": ["none", d, Ur, Fr]
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
        ring: ie()
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
        "ring-offset": [fe, Xt]
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
        "inset-ring": ie()
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
        "text-shadow": ["none", p, Ur, Fr]
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
        opacity: [fe, X, Z]
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
        "mask-linear": [fe]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Y()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Y()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Y()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Y()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Y()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Y()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Y()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Y()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Y()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Y()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Y()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Y()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Y()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Y()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [X, Z]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Y()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Y()
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
        "mask-radial-at": E()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [fe]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Y()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Y()
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
        mask: B()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: ne()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ae()
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
        mask: ["none", X, Z]
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
          X,
          Z
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
        brightness: [fe, X, Z]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [fe, X, Z]
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
          Ur,
          Fr
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
        grayscale: ["", fe, X, Z]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [fe, X, Z]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", fe, X, Z]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [fe, X, Z]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", fe, X, Z]
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
          X,
          Z
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
        "backdrop-brightness": [fe, X, Z]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [fe, X, Z]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", fe, X, Z]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [fe, X, Z]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", fe, X, Z]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [fe, X, Z]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [fe, X, Z]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", fe, X, Z]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", X, Z]
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
        duration: [fe, "initial", X, Z]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", v, X, Z]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [fe, X, Z]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, X, Z]
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
        perspective: [g, X, Z]
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
        rotate: pe()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": pe()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": pe()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": pe()
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
        transform: [X, Z, "", "none", "gpu", "cpu"]
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
        translate: Oe()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Oe()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Oe()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Oe()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", X, Z]
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
        "will-change": ["auto", "scroll", "contents", "transform", X, Z]
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
        stroke: [fe, tr, Xt, ms]
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
}, fb = /* @__PURE__ */ Vy(db);
function ce(...e) {
  return fb(Hc(e));
}
function Ki(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Ro(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Ki(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Ki(e[o], null);
        }
      };
  };
}
function He(...e) {
  return S.useCallback(Ro(...e), e);
}
// @__NO_SIDE_EFFECTS__
function mr(e) {
  const t = /* @__PURE__ */ hb(e), n = S.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = S.Children.toArray(s), l = i.find(gb);
    if (l) {
      const u = l.props.children, c = i.map((d) => d === l ? S.Children.count(u) > 1 ? S.Children.only(null) : S.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ f(t, { ...a, ref: o, children: S.isValidElement(u) ? S.cloneElement(u, void 0, c) : null });
    }
    return /* @__PURE__ */ f(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var pb = /* @__PURE__ */ mr("Slot");
// @__NO_SIDE_EFFECTS__
function hb(e) {
  const t = S.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (S.isValidElement(o)) {
      const a = bb(o), i = yb(s, o.props);
      return o.type !== S.Fragment && (i.ref = r ? Ro(r, a) : a), S.cloneElement(o, i);
    }
    return S.Children.count(o) > 1 ? S.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Xc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function mb(e) {
  const t = ({ children: n }) => /* @__PURE__ */ f(Pe, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Xc, t;
}
function gb(e) {
  return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Xc;
}
function yb(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...i) => {
      const l = s(...i);
      return o(...i), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function bb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const qi = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Gi = Hc, vb = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Gi(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((u) => {
    const c = n?.[u], d = s?.[u];
    if (c === null) return null;
    const p = qi(c) || qi(d);
    return o[u][p];
  }), i = n && Object.entries(n).reduce((u, c) => {
    let [d, p] = c;
    return p === void 0 || (u[d] = p), u;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
    let { class: d, className: p, ...h } = c;
    return Object.entries(h).every((m) => {
      let [g, y] = m;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...i
      }[g]) : {
        ...s,
        ...i
      }[g] === y;
    }) ? [
      ...u,
      d,
      p
    ] : u;
  }, []);
  return Gi(e, a, l, n?.class, n?.className);
}, Us = vb(
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
  return /* @__PURE__ */ f(
    r ? pb : "button",
    {
      "data-slot": "button",
      className: ce(Us({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function wb({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const l = Ra();
  return /* @__PURE__ */ f(
    Py,
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
        formatMonthDropdown: (u) => u.toLocaleString("default", { month: "short" }),
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
          Us({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: ce(
          Us({ variant: o }),
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
        Root: ({ className: u, rootRef: c, ...d }) => /* @__PURE__ */ f(
          "div",
          {
            "data-slot": "calendar",
            ref: c,
            className: ce(u),
            ...d
          }
        ),
        Chevron: ({ className: u, orientation: c, ...d }) => c === "left" ? /* @__PURE__ */ f(dp, { className: ce("size-4", u), ...d }) : c === "right" ? /* @__PURE__ */ f(
          fp,
          {
            className: ce("size-4", u),
            ...d
          }
        ) : /* @__PURE__ */ f(pp, { className: ce("size-4", u), ...d }),
        DayButton: kb,
        WeekNumber: ({ children: u, ...c }) => /* @__PURE__ */ f("td", { ...c, children: /* @__PURE__ */ f("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: u }) }),
        ...a
      },
      ...i
    }
  );
}
function kb({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ra(), s = S.useRef(null);
  return S.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ f(
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
      className: ce(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let En = null;
const Qc = /* @__PURE__ */ new Map(), xb = /* @__PURE__ */ new Map();
function ro() {
  if (!En) return;
  const e = En;
  En = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Cb(e) {
  return En?.pillDate === e;
}
function Sb({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = V(null), a = Ao(e);
  G(() => {
    const b = (w) => {
      w.key === "Escape" && (w.stopPropagation(), w.preventDefault(), o());
    };
    return document.addEventListener("keydown", b, !0), () => document.removeEventListener("keydown", b, !0);
  }, [o]), G(() => {
    const b = (E) => {
      s.current && !s.current.contains(E.target) && (E.target.closest(".date-pill") || o());
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b, !0);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b, !0);
    };
  }, [o]);
  const i = F((b) => {
    b && r(Nn(b)), o();
  }, [r, o]), l = F((b) => {
    const w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + b), r(Nn(w)), o();
  }, [r, o]), u = F(() => {
    const w = (/* @__PURE__ */ new Date()).getDay(), E = w === 0 ? 1 : 8 - w, x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + E), r(Nn(x)), o();
  }, [r, o]), c = /* @__PURE__ */ new Date(), d = c.toDateString(), p = new Date(c);
  p.setDate(p.getDate() + 1);
  const h = p.toDateString(), m = c.getDay(), g = m === 0 ? 1 : 8 - m, y = new Date(c);
  y.setDate(y.getDate() + g);
  const v = y.toDateString();
  return /* @__PURE__ */ A(
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
            wb,
            {
              mode: "single",
              selected: a,
              onSelect: i
            }
          ) }),
          /* @__PURE__ */ f("div", { className: "border-t border-border" }),
          /* @__PURE__ */ A("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ f(
              Ft,
              {
                variant: "outline",
                size: "sm",
                className: ce(
                  "rounded-full text-xs",
                  a.toDateString() === d && "ring-2 ring-primary"
                ),
                onClick: () => l(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ f(
              Ft,
              {
                variant: "outline",
                size: "sm",
                className: ce(
                  "rounded-full text-xs",
                  a.toDateString() === h && "ring-2 ring-primary"
                ),
                onClick: () => l(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ f(
              Ft,
              {
                variant: "outline",
                size: "sm",
                className: ce(
                  "rounded-full text-xs",
                  a.toDateString() === v && "ring-2 ring-primary"
                ),
                onClick: u,
                children: "Next Monday"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function Tb(e, t, n) {
  if (Cb(t)) {
    ro();
    return;
  }
  ro();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, a = 320, i = 420, l = 10, u = 16, c = s - r.bottom - l - u, d = r.top - l - u, p = c >= i ? "below" : d >= i ? "above" : c >= d ? "below" : "above";
  let h;
  p === "below" ? h = r.bottom + l : h = r.top - i - l;
  const m = r.left + r.width / 2;
  let g = m - a / 2;
  g + a > o - u && (g = o - a - u), g < u && (g = u);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((x) => {
    y.addEventListener(x, (M) => {
      M.stopPropagation();
    }, !1);
  });
  const b = Zp(y);
  En = { container: y, root: b, pillDate: t };
  const w = () => {
    ro();
  }, E = (x) => {
    const M = Qc.get(t);
    M && M(x);
  };
  b.render(
    /* @__PURE__ */ f(
      Sb,
      {
        currentDate: t,
        theme: n,
        position: { top: h, left: g, direction: p, pillCenter: m },
        onSelectDate: E,
        onClose: w
      }
    )
  );
}
function Mb({ node: e, updateAttributes: t, selected: n }) {
  const r = V(null), o = e.attrs.date || Dn(), s = Jc(o), a = Pa(o), i = F(() => {
    if (!r.current) return "";
    const l = r.current.closest(".markdown-editor-container");
    if (l) {
      const c = l.getAttribute("data-theme");
      if (c) return c;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return G(() => (Qc.set(o, (l) => {
    t({ date: l });
  }), xb.set(o, i), () => {
  }), [o, t, i]), G(() => {
    const l = r.current;
    if (!l) return;
    const u = (c) => {
      c.preventDefault(), c.stopPropagation();
      const d = l.getAttribute("data-date") || Dn(), p = i();
      Tb(l, d, p);
    };
    return l.addEventListener("click", u), () => l.removeEventListener("click", u);
  }, [i]), G(() => {
    const l = r.current?.closest(".ProseMirror") || document, u = () => {
      En && ro();
    };
    return l.addEventListener("scroll", u, { passive: !0 }), () => {
      l.removeEventListener("scroll", u);
    };
  }, []), /* @__PURE__ */ f(kr, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: r,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ f(Zl, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ f("span", { className: "date-text", children: s })
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
function Dn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function dr(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function Nn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Jc(e) {
  const t = Ao(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  o.setDate(o.getDate() + 1);
  const s = new Date(r);
  s.setDate(s.getDate() - 1);
  const a = r.getDay(), i = a === 0 ? 1 : 8 - a, l = new Date(r);
  if (l.setDate(l.getDate() + i), t.getTime() === r.getTime()) return "Today";
  if (t.getTime() === o.getTime()) return "Tomorrow";
  if (t.getTime() === s.getTime()) return "Yesterday";
  if (t.getTime() === l.getTime()) return "Next Monday";
  const u = { month: "short", day: "numeric" };
  return t.getFullYear() !== r.getFullYear() && (u.year = "numeric"), t.toLocaleDateString("en-US", u);
}
function Eb(e) {
  return Ao(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Jt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return Dn();
  if (n === "tomorrow") return dr(1);
  if (n === "yesterday") return dr(-1);
  if (n === "next monday") {
    const i = (/* @__PURE__ */ new Date()).getDay(), l = i === 0 ? 1 : 8 - i;
    return dr(l);
  }
  const r = t.match(/^([A-Za-z]+)\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
  if (r) {
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
    }[r[1].toLowerCase()];
    if (i !== void 0) {
      const l = parseInt(r[2], 10), u = r[3] ? parseInt(r[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), c = new Date(u, i, l);
      return Nn(c);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const a = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return Nn(a);
  }
  return null;
}
function Pa(e) {
  const t = Ao(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Db = new Ve("datePillPaste"), Nb = So.create({
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
        default: Dn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = Jc(n), o = Pa(n);
    return [
      "span",
      $n(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return Co(Mb, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || Dn();
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
    const e = new Ke({
      find: /@today\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(Dn()).run();
      }
    }), t = new Ke({
      find: /@tomorrow\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(dr(1)).run();
      }
    }), n = new Ke({
      find: /@yesterday\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(dr(-1)).run();
      }
    }), r = new Ke({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: c, chain: d, match: p }) => {
        d().deleteRange(c).insertDatePill(p[1]).run();
      }
    }), o = new Ke({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: c, chain: d, match: p }) => {
        const m = {
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
        }[p[1].toLowerCase()];
        if (m !== void 0) {
          const g = (/* @__PURE__ */ new Date()).getFullYear(), y = new Date(g, m, parseInt(p[2], 10));
          d().deleteRange(c).insertDatePill(Nn(y)).run();
        }
      }
    }), s = new Ke({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: c, chain: d, match: p }) => {
        const h = Jt(p[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), a = new Ke({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: c, chain: d, match: p }) => {
        const h = Jt(p[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), i = new Ke({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: c, chain: d, match: p }) => {
        d().deleteRange(c).insertDatePill(p[1]).run();
      }
    }), l = new Ke({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: c, chain: d, match: p }) => {
        const h = Jt(p[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), u = new Ke({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: c, chain: d, match: p }) => {
        const h = Jt(p[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    });
    return [
      e,
      t,
      n,
      r,
      o,
      s,
      a,
      i,
      l,
      u
    ];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new je({
        key: Db,
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain"), s = r.getData("text/html");
            if (s && s.includes('data-type="date-pill"')) return !1;
            const a = /@([^@\n]+)@/g;
            let i = !1, l;
            const u = new RegExp(a.source, a.flags);
            for (; (l = u.exec(o)) !== null; )
              if (Jt(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: c } = t, { tr: d, schema: p } = c, h = [];
            let m = 0;
            const g = new RegExp(a.source, a.flags);
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const E = y[1], x = Jt(E);
              if (x) {
                const M = o.slice(m, y.index);
                M && h.push(p.text(M)), h.push(e.create({ date: x })), m = y.index + y[0].length;
              }
            }
            const v = o.slice(m);
            if (v && h.push(p.text(v)), h.length === 0) return !1;
            const b = p.nodes.doc.create(
              null,
              p.nodes.paragraph.create(null, h)
            ), { $from: w } = c.selection;
            if (w.parent.type.name === "paragraph") {
              const E = d;
              let x = c.selection.from;
              for (const M of h)
                E.insert(x, M), x += M.nodeSize;
              E.delete(c.selection.from, c.selection.to), t.dispatch(E);
            } else
              d.replaceSelectionWith(b), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function Rb({ node: e, selected: t }) {
  const n = V(null), r = e.attrs.tag || "", o = F((s) => {
    s.preventDefault(), s.stopPropagation();
  }, []);
  return /* @__PURE__ */ f(kr, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: n,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": r,
      onClick: o,
      children: [
        /* @__PURE__ */ f(hp, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ f("span", { className: "tag-text", children: r })
      ]
    }
  ) });
}
function ar(e) {
  return /[a-zA-Z]/.test(e) && /^[a-zA-Z0-9_-]+$/.test(e);
}
function oo(e) {
  return e.toLowerCase().trim();
}
const Ab = new Ve("tagPillPaste"), Pb = So.create({
  name: "tagPill",
  group: "inline",
  inline: !0,
  atom: !0,
  addOptions() {
    return {
      HTMLAttributes: {},
      onTagClick: void 0
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
      $n(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return Co(Rb, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = oo(e);
        return ar(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return [new Ke({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = oo(r[1]);
        if (ar(o)) {
          const a = r[0].startsWith(" ") ? 1 : 0, i = t.from + a;
          n().deleteRange({ from: i, to: t.to }).insertTagPill(o).run();
        }
      }
    })];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new je({
        key: Ab,
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain"), s = r.getData("text/html");
            if (s && s.includes('data-type="tag-pill"')) return !1;
            const a = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let i = !1, l;
            const u = new RegExp(a.source, a.flags);
            for (; (l = u.exec(o)) !== null; )
              if (ar(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: c } = t, { tr: d, schema: p } = c, h = [];
            let m = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const w = oo(y[1]);
              if (ar(w)) {
                const E = y[0], x = E.startsWith(" ") || E.startsWith(`
`) ? 1 : 0, M = o.slice(m, y.index + x);
                M && h.push(p.text(M)), h.push(e.create({ tag: w })), m = y.index + E.length;
              }
            }
            const v = o.slice(m);
            if (v && h.push(p.text(v)), h.length === 0) return !1;
            const { $from: b } = c.selection;
            if (b.parent.type.name === "paragraph") {
              const w = d;
              let E = c.selection.from;
              for (const x of h)
                w.insert(E, x), E += x.nodeSize;
              w.delete(c.selection.from, c.selection.to), t.dispatch(w);
            } else {
              const w = p.nodes.doc.create(
                null,
                p.nodes.paragraph.create(null, h)
              );
              d.replaceSelectionWith(w), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function eu({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = j(""), [a, i] = j(""), [l, u] = j(""), [c, d] = j(!1), p = V(null), h = V(null);
  G(() => {
    e && (s(""), i(""), u(""), setTimeout(() => {
      p.current?.focus();
    }, 100));
  }, [e]), G(() => {
    if (!e) return;
    const b = (x) => {
      h.current && !h.current.contains(x.target) && t();
    }, w = (x) => {
      x.key === "Escape" && t();
    }, E = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return document.addEventListener("keydown", w), () => {
      clearTimeout(E), document.removeEventListener("mousedown", b), document.removeEventListener("keydown", w);
    };
  }, [e, t]);
  const m = (b) => {
    if (!b.trim())
      return u("Please enter an image URL"), !1;
    try {
      const w = new URL(b);
      if (!["http:", "https:", "data:"].includes(w.protocol))
        return u("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return u("Please enter a valid URL"), !1;
    }
    return u(""), !0;
  }, g = async () => {
    if (!m(o)) return;
    d(!0);
    const b = new window.Image();
    b.onload = () => {
      d(!1), n(o.trim(), a.trim()), t();
    }, b.onerror = () => {
      d(!1), n(o.trim(), a.trim()), t();
    }, setTimeout(() => {
      c && (d(!1), n(o.trim(), a.trim()), t());
    }, 3e3), b.src = o.trim();
  }, y = (b) => {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), g());
  };
  if (!e) return null;
  const v = r ? {
    top: r.top,
    left: Math.min(r.left, typeof window < "u" ? window.innerWidth - 340 : r.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ A(
    "div",
    {
      ref: h,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof v.top == "number", v.top),
        left: typeof v.left == "number" ? Math.max(8, v.left) : v.left,
        transform: r ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ A("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ f(ka, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ f("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ f(Nt, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ f(ca, { size: 12 }),
              "Image URL"
            ] }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: p,
                type: "url",
                value: o,
                onChange: (b) => {
                  s(b.target.value), l && u("");
                },
                onKeyDown: y,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              }
            ),
            l && /* @__PURE__ */ f("span", { className: "image-url-dialog-error", children: l })
          ] }),
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ f(Eo, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ f(
              "input",
              {
                type: "text",
                value: a,
                onChange: (b) => i(b.target.value),
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
                disabled: c || !o.trim(),
                className: "image-url-dialog-btn image-url-dialog-btn-insert",
                children: c ? "Validating..." : "Insert Image"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const Lb = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ f(Eo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ f(mp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ f(gp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ f(yp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ f(ga, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ f(ya, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ f(ba, { size: 16 }),
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
    icon: /* @__PURE__ */ f(Xl, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ f(Os, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ f(ka, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ f(Ql, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ f(lo, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ f(ql, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ f(Kl, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ f(wa, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ f(va, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ f(Zl, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ f(ca, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Ib = 32, Ob = 8, _b = 320, $b = 210, Yr = 12;
function Zi(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const o = t.getRangeAt(0), s = o.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const a = document.createElement("span");
        a.textContent = "​", o.cloneRange().insertNode(a);
        const l = a.getBoundingClientRect(), u = { top: l.top, bottom: l.bottom, left: l.left };
        return a.parentNode?.removeChild(a), t.removeAllRanges(), t.addRange(o), u;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, r = e.view.coordsAtPos(n);
    return { top: r.top, bottom: r.bottom, left: r.left };
  } catch {
    return null;
  }
}
function zb({ editor: e }) {
  const [t, n] = j(!1), [r, o] = j(""), [s, a] = j(0), [i, l] = j(null), [u, c] = j(!1), [d, p] = j({ top: 0, left: 0 }), [h, m] = j("below"), g = V(null), y = V(-1), v = V(!1);
  G(() => {
    v.current = t;
  }, [t]);
  const b = Lb.filter((T) => {
    if (!r) return !0;
    const k = r.toLowerCase();
    return T.title.toLowerCase().includes(k) || T.keywords?.some((R) => R.includes(k));
  }), w = Math.min(
    b.length * Ib + Ob,
    _b
  );
  To(() => {
    if (!t || !i) return;
    const { top: T, bottom: k, left: R } = i, N = window.innerHeight, L = window.innerWidth, I = N - k - Yr, _ = T - Yr;
    let H;
    if (I >= w ? H = "below" : _ >= w ? H = "above" : H = I >= _ ? "below" : "above", m(H), g.current) {
      const K = Math.max(
        Yr,
        Math.min(R, L - $b - Yr)
      ), P = H === "below" ? k + 4 : T - w - 4;
      g.current.style.top = `${P}px`, g.current.style.left = `${K}px`;
    }
  }, [t, i, w, b.length]);
  const E = F(() => {
    const { state: T } = e, { selection: k } = T, R = k.from, N = y.current;
    if (N >= 0 && N <= R)
      e.chain().focus().deleteRange({ from: N, to: R }).run();
    else {
      const { $from: L } = k, _ = L.parent.textBetween(0, L.parentOffset, void 0, "￼").lastIndexOf("/");
      if (_ !== -1) {
        const H = L.pos - (L.parentOffset - _);
        e.chain().focus().deleteRange({ from: H, to: L.pos }).run();
      }
    }
  }, [e]), x = F(() => {
    n(!1), o(""), a(0), y.current = -1, l(null);
  }, []), M = F((T) => {
    const k = b[T];
    if (k) {
      if (E(), k.isImageCommand) {
        const { state: R } = e, N = e.view.coordsAtPos(R.selection.from);
        p({
          top: N.bottom + 8,
          left: N.left
        }), c(!0);
      } else
        k.command(e);
      x();
    }
  }, [e, b, E, x]), D = F((T, k) => {
    e.chain().focus().setImage({ src: T, alt: k }).run();
  }, [e]);
  return G(() => {
    if (!e) return;
    const T = () => {
      if (v.current) return;
      const { state: k } = e, { selection: R } = k, { $from: N } = R;
      if (N.parentOffset === 0) return;
      const L = N.parent.textBetween(0, N.parentOffset, void 0, "￼");
      if (!L.endsWith("/")) return;
      const I = L.length > 1 ? L.slice(-2, -1) : "";
      if (I && I !== " " && I !== `
`) return;
      y.current = N.pos - 1;
      const _ = Zi(e);
      _ && (l(_), n(!0), o(""), a(0));
    };
    return e.on("update", T), () => {
      e.off("update", T);
    };
  }, [e]), G(() => {
    if (!e || !t) return;
    const T = e.view.dom, k = (R) => {
      v.current && (R.key === "ArrowDown" ? (R.preventDefault(), R.stopPropagation(), a((N) => (N + 1) % b.length)) : R.key === "ArrowUp" ? (R.preventDefault(), R.stopPropagation(), a((N) => (N - 1 + b.length) % b.length)) : R.key === "Enter" ? (R.preventDefault(), R.stopPropagation(), M(s)) : R.key === "Escape" && (R.preventDefault(), R.stopPropagation(), x()));
    };
    return T.addEventListener("keydown", k, !0), () => {
      T.removeEventListener("keydown", k, !0);
    };
  }, [e, t, s, b, M, x]), G(() => {
    if (!e || !t) return;
    const T = () => {
      if (!v.current || y.current < 0) return;
      const { state: k } = e, { selection: R } = k, N = R.from, L = y.current;
      if (N <= L) {
        x();
        return;
      }
      try {
        const I = k.doc.textBetween(L + 1, N, void 0, "￼");
        if (I.includes(`
`)) {
          x();
          return;
        }
        o(I), a(0);
        const _ = Zi(e);
        _ && l(_);
      } catch {
        x();
      }
    };
    return e.on("update", T), e.on("selectionUpdate", T), () => {
      e.off("update", T), e.off("selectionUpdate", T);
    };
  }, [e, t, x]), G(() => {
    if (!t) return;
    const T = (k) => {
      g.current && !g.current.contains(k.target) && x();
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [t, x]), G(() => {
    t && b.length === 0 && r.length > 2 && x();
  }, [t, b.length, r, x]), G(() => {
    s >= b.length && a(Math.max(0, b.length - 1));
  }, [b.length, s]), G(() => {
    if (!t || !g.current) return;
    const T = g.current.querySelector(".slash-item.is-selected");
    T && T.scrollIntoView({ block: "nearest" });
  }, [t, s]), u ? /* @__PURE__ */ f(
    eu,
    {
      isOpen: u,
      onClose: () => c(!1),
      onInsert: D,
      position: d
    }
  ) : !t || b.length === 0 ? null : Kt(
    /* @__PURE__ */ f(
      "div",
      {
        ref: g,
        className: `slash-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "auto"
        },
        children: b.map((T, k) => /* @__PURE__ */ A(
          "div",
          {
            className: `slash-item ${k === s ? "is-selected" : ""}`,
            onClick: (R) => {
              R.preventDefault(), R.stopPropagation(), M(k);
            },
            onMouseEnter: () => a(k),
            children: [
              /* @__PURE__ */ f("span", { className: "slash-icon", children: T.icon }),
              /* @__PURE__ */ f("span", { className: "slash-label", children: T.title })
            ]
          },
          T.title
        ))
      }
    ),
    document.body
  );
}
const Bb = 340, Hb = 36, Wb = 8, Fb = 240, jr = 8;
function Xi(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const o = t.getRangeAt(0), s = o.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const a = document.createElement("span");
        a.textContent = "​", o.cloneRange().insertNode(a);
        const l = a.getBoundingClientRect(), u = { top: l.top, bottom: l.bottom, left: l.left };
        return a.parentNode?.removeChild(a), t.removeAllRanges(), t.addRange(o), u;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, r = e.view.coordsAtPos(n);
    return { top: r.top, bottom: r.bottom, left: r.left };
  } catch {
    return null;
  }
}
function Ub({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = j(!1), [s, a] = j(""), [i, l] = j([]), [u, c] = j(0), [d, p] = j(null), [h, m] = j("below"), [g, y] = j(!1), v = V(!1), b = V(null), w = V(-1), E = V(null);
  G(() => {
    v.current = r;
  }, [r]);
  const x = F(() => {
    o(!1), a(""), l([]), c(0), w.current = -1;
  }, []), M = F((R) => {
    const N = w.current;
    if (N < 0) return;
    const { state: L } = e, I = L.selection.from;
    try {
      const _ = L.tr.delete(N, I), H = L.schema.marks.wikiLink;
      if (H) {
        const K = H.create({ pageName: R }), P = L.schema.text(R, [K]);
        _.insert(N, P);
        const B = N + R.length;
        _.setSelection(la.create(_.doc, B)), _.removeStoredMark(H);
      } else
        _.insertText(`[[${R}]]`, N);
      e.view.dispatch(_), e.view.focus();
    } catch (_) {
      console.warn("WikiLinkAutocomplete: Error inserting link", _);
    }
    x();
  }, [e, x]);
  G(() => {
    if (!e) return;
    const R = () => {
      if (v.current) return;
      const { state: N } = e, { selection: L } = N, { $from: I } = L;
      if (I.parentOffset < 2 || !I.parent.textBetween(0, I.parentOffset, void 0, "￼").endsWith("[[")) return;
      w.current = I.pos - 2;
      const H = Xi(e);
      H && (p(H), o(!0), a(""), l([]), c(0));
    };
    return e.on("update", R), () => {
      e.off("update", R);
    };
  }, [e]), G(() => {
    if (!e || !r) return;
    const R = e.view.dom, N = (L) => {
      if (v.current) {
        if (L.key === "ArrowDown") {
          L.preventDefault();
          const I = i.length + (s.trim() ? 1 : 0) - 1;
          c((_) => Math.min(_ + 1, I));
          return;
        }
        if (L.key === "ArrowUp") {
          L.preventDefault(), c((I) => Math.max(I - 1, 0));
          return;
        }
        if (L.key === "Enter" || L.key === "Tab") {
          L.preventDefault(), L.stopPropagation(), u < i.length ? M(i[u].title) : s.trim() && n ? (n(s.trim()), x()) : s.trim() && M(s.trim());
          return;
        }
        if (L.key === "Escape") {
          L.preventDefault(), x();
          return;
        }
        L.key === "]" && setTimeout(() => {
          const { state: I } = e, { $from: _ } = I.selection;
          _.parent.textBetween(0, _.parentOffset, void 0, "￼").endsWith("]]") && x();
        }, 0);
      }
    };
    return R.addEventListener("keydown", N, !0), () => {
      R.removeEventListener("keydown", N, !0);
    };
  }, [e, r, i, u, s, M, x, n]), G(() => {
    if (!e || !r) return;
    const R = () => {
      const N = w.current;
      if (N < 0) {
        x();
        return;
      }
      const { state: L } = e, I = L.selection.from;
      if (I <= N) {
        x();
        return;
      }
      try {
        const _ = L.doc.textBetween(N + 2, I, void 0, "￼");
        if (_.includes(`
`) || _.includes("]]")) {
          x();
          return;
        }
        a(_), c(0);
        const H = Xi(e);
        H && p(H);
      } catch {
        x();
      }
    };
    return e.on("update", R), e.on("selectionUpdate", R), () => {
      e.off("update", R), e.off("selectionUpdate", R);
    };
  }, [e, r, x]), G(() => {
    if (r) {
      if (E.current && clearTimeout(E.current), !s.trim()) {
        y(!0), E.current = setTimeout(async () => {
          try {
            const R = await t("");
            l(R);
          } catch {
            l([]);
          }
          y(!1);
        }, 100);
        return;
      }
      return y(!0), E.current = setTimeout(async () => {
        try {
          const R = await t(s.trim());
          l(R);
        } catch {
          l([]);
        }
        y(!1);
      }, 150), () => {
        E.current && clearTimeout(E.current);
      };
    }
  }, [r, s, t]), G(() => {
    if (!r) return;
    const R = (N) => {
      b.current && !b.current.contains(N.target) && x();
    };
    return document.addEventListener("mousedown", R), () => document.removeEventListener("mousedown", R);
  }, [r, x]), G(() => {
    if (!r || !b.current) return;
    const R = b.current.querySelector(".wikilink-item.is-selected");
    R && R.scrollIntoView({ block: "nearest" });
  }, [r, u]);
  const D = i.length + (s.trim() ? 1 : 0), C = Math.min(
    Math.max(D, 1) * Hb + Wb,
    Fb
  );
  if (To(() => {
    if (!r || !d) return;
    const { top: R, bottom: N, left: L } = d, I = window.innerHeight, _ = window.innerWidth, H = I - N - jr, K = R - jr;
    let P;
    if (H >= C ? P = "below" : K >= C ? P = "above" : P = H >= K ? "below" : "above", m(P), b.current) {
      const B = Math.max(
        jr,
        Math.min(L, _ - Bb - jr)
      ), ne = P === "below" ? N + 4 : R - C - 4;
      b.current.style.top = `${ne}px`, b.current.style.left = `${B}px`;
    }
  }, [r, d, C, D]), !r) return null;
  const T = s.trim() && !i.some((R) => R.title.toLowerCase() === s.trim().toLowerCase());
  return Kt(
    /* @__PURE__ */ A(
      "div",
      {
        ref: b,
        className: `wikilink-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "auto"
        },
        children: [
          g && i.length === 0 && /* @__PURE__ */ f("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ f("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
          i.map((R, N) => /* @__PURE__ */ A(
            "div",
            {
              className: `wikilink-item ${N === u ? "is-selected" : ""}`,
              onMouseDown: (L) => {
                L.preventDefault(), M(R.title);
              },
              onMouseEnter: () => c(N),
              children: [
                /* @__PURE__ */ f("span", { className: "wikilink-icon", children: /* @__PURE__ */ f(xa, { size: 14 }) }),
                /* @__PURE__ */ f("span", { className: "wikilink-label", children: R.title }),
                /* @__PURE__ */ f("span", { className: "wikilink-type", children: R.type })
              ]
            },
            R.id
          )),
          T && /* @__PURE__ */ A(
            "div",
            {
              className: `wikilink-item wikilink-create ${i.length === u ? "is-selected" : ""}`,
              onMouseDown: (R) => {
                R.preventDefault(), n ? (n(s.trim()), x()) : M(s.trim());
              },
              onMouseEnter: () => c(i.length),
              children: [
                /* @__PURE__ */ f("span", { className: "wikilink-icon", children: /* @__PURE__ */ f(Ca, { size: 14 }) }),
                /* @__PURE__ */ A("span", { className: "wikilink-label", children: [
                  "Create “",
                  s.trim(),
                  "”"
                ] })
              ]
            }
          ),
          !g && i.length === 0 && !s.trim() && /* @__PURE__ */ f("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ f("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }) })
        ]
      }
    ),
    document.body
  );
}
function de(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Yn(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = S.createContext(a), l = n.length;
    n = [...n, a];
    const u = (d) => {
      const { scope: p, children: h, ...m } = d, g = p?.[e]?.[l] || i, y = S.useMemo(() => m, Object.values(m));
      return /* @__PURE__ */ f(g.Provider, { value: y, children: h });
    };
    u.displayName = s + "Provider";
    function c(d, p) {
      const h = p?.[e]?.[l] || i, m = S.useContext(h);
      if (m) return m;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [u, c];
  }
  const o = () => {
    const s = n.map((a) => S.createContext(a));
    return function(i) {
      const l = i?.[e] || s;
      return S.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, Yb(o, ...t)];
}
function Yb(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = r.reduce((i, { useScope: l, scopeName: u }) => {
        const d = l(s)[`__scope${u}`];
        return { ...i, ...d };
      }, {});
      return S.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Yt = globalThis?.document ? S.useLayoutEffect : () => {
}, jb = S[" useInsertionEffect ".trim().toString()] || Yt;
function La({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = Vb({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const c = S.useRef(e !== void 0);
    S.useEffect(() => {
      const d = c.current;
      d !== i && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), c.current = i;
    }, [i, r]);
  }
  const u = S.useCallback(
    (c) => {
      if (i) {
        const d = Kb(c) ? c(e) : c;
        d !== e && a.current?.(d);
      } else
        s(c);
    },
    [i, e, s, a]
  );
  return [l, u];
}
function Vb({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = S.useState(e), o = S.useRef(n), s = S.useRef(t);
  return jb(() => {
    s.current = t;
  }, [t]), S.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Kb(e) {
  return typeof e == "function";
}
var qb = [
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
], $e = qb.reduce((e, t) => {
  const n = /* @__PURE__ */ mr(`Primitive.${t}`), r = S.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ f(l, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function tu(e, t) {
  e && uc.flushSync(() => e.dispatchEvent(t));
}
function nu(e) {
  const t = e + "CollectionProvider", [n, r] = Yn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: y, children: v } = g, b = q.useRef(null), w = q.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ f(o, { scope: y, itemMap: w, collectionRef: b, children: v });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ mr(i), u = q.forwardRef(
    (g, y) => {
      const { scope: v, children: b } = g, w = s(i, v), E = He(y, w.collectionRef);
      return /* @__PURE__ */ f(l, { ref: E, children: b });
    }
  );
  u.displayName = i;
  const c = e + "CollectionItemSlot", d = "data-radix-collection-item", p = /* @__PURE__ */ mr(c), h = q.forwardRef(
    (g, y) => {
      const { scope: v, children: b, ...w } = g, E = q.useRef(null), x = He(y, E), M = s(c, v);
      return q.useEffect(() => (M.itemMap.set(E, { ref: E, ...w }), () => void M.itemMap.delete(E))), /* @__PURE__ */ f(p, { [d]: "", ref: x, children: b });
    }
  );
  h.displayName = c;
  function m(g) {
    const y = s(e + "CollectionConsumer", g);
    return q.useCallback(() => {
      const b = y.collectionRef.current;
      if (!b) return [];
      const w = Array.from(b.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (M, D) => w.indexOf(M.ref.current) - w.indexOf(D.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    m,
    r
  ];
}
var Gb = S.createContext(void 0);
function ru(e) {
  const t = S.useContext(Gb);
  return e || t || "ltr";
}
function Rt(e) {
  const t = S.useRef(e);
  return S.useEffect(() => {
    t.current = e;
  }), S.useMemo(() => (...n) => t.current?.(...n), []);
}
function Zb(e, t = globalThis?.document) {
  const n = Rt(e);
  S.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Xb = "DismissableLayer", Ys = "dismissableLayer.update", Qb = "dismissableLayer.pointerDownOutside", Jb = "dismissableLayer.focusOutside", Qi, ou = S.createContext({
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
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, u = S.useContext(ou), [c, d] = S.useState(null), p = c?.ownerDocument ?? globalThis?.document, [, h] = S.useState({}), m = He(t, (D) => d(D)), g = Array.from(u.layers), [y] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(y), b = c ? g.indexOf(c) : -1, w = u.layersWithOutsidePointerEventsDisabled.size > 0, E = b >= v, x = nv((D) => {
      const C = D.target, T = [...u.branches].some((k) => k.contains(C));
      !E || T || (o?.(D), a?.(D), D.defaultPrevented || i?.());
    }, p), M = rv((D) => {
      const C = D.target;
      [...u.branches].some((k) => k.contains(C)) || (s?.(D), a?.(D), D.defaultPrevented || i?.());
    }, p);
    return Zb((D) => {
      b === u.layers.size - 1 && (r?.(D), !D.defaultPrevented && i && (D.preventDefault(), i()));
    }, p), S.useEffect(() => {
      if (c)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Qi = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(c)), u.layers.add(c), Ji(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = Qi);
        };
    }, [c, p, n, u]), S.useEffect(() => () => {
      c && (u.layers.delete(c), u.layersWithOutsidePointerEventsDisabled.delete(c), Ji());
    }, [c, u]), S.useEffect(() => {
      const D = () => h({});
      return document.addEventListener(Ys, D), () => document.removeEventListener(Ys, D);
    }, []), /* @__PURE__ */ f(
      $e.div,
      {
        ...l,
        ref: m,
        style: {
          pointerEvents: w ? E ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: de(e.onFocusCapture, M.onFocusCapture),
        onBlurCapture: de(e.onBlurCapture, M.onBlurCapture),
        onPointerDownCapture: de(
          e.onPointerDownCapture,
          x.onPointerDownCapture
        )
      }
    );
  }
);
Ia.displayName = Xb;
var ev = "DismissableLayerBranch", tv = S.forwardRef((e, t) => {
  const n = S.useContext(ou), r = S.useRef(null), o = He(t, r);
  return S.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ f($e.div, { ...e, ref: o });
});
tv.displayName = ev;
function nv(e, t = globalThis?.document) {
  const n = Rt(e), r = S.useRef(!1), o = S.useRef(() => {
  });
  return S.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          su(
            Qb,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function rv(e, t = globalThis?.document) {
  const n = Rt(e), r = S.useRef(!1);
  return S.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && su(Jb, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ji() {
  const e = new CustomEvent(Ys);
  document.dispatchEvent(e);
}
function su(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? tu(o, s) : o.dispatchEvent(s);
}
var gs = 0;
function ov() {
  S.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? el()), document.body.insertAdjacentElement("beforeend", e[1] ?? el()), gs++, () => {
      gs === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), gs--;
    };
  }, []);
}
function el() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ys = "focusScope.autoFocusOnMount", bs = "focusScope.autoFocusOnUnmount", tl = { bubbles: !1, cancelable: !0 }, sv = "FocusScope", au = S.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = S.useState(null), u = Rt(o), c = Rt(s), d = S.useRef(null), p = He(t, (g) => l(g)), h = S.useRef({
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
        if (h.paused || !i) return;
        const E = w.target;
        i.contains(E) ? d.current = E : Wt(d.current, { select: !0 });
      }, y = function(w) {
        if (h.paused || !i) return;
        const E = w.relatedTarget;
        E !== null && (i.contains(E) || Wt(d.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const x of w)
            x.removedNodes.length > 0 && Wt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const b = new MutationObserver(v);
      return i && b.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), b.disconnect();
      };
    }
  }, [r, i, h.paused]), S.useEffect(() => {
    if (i) {
      rl.add(h);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const v = new CustomEvent(ys, tl);
        i.addEventListener(ys, u), i.dispatchEvent(v), v.defaultPrevented || (av(dv(iu(i)), { select: !0 }), document.activeElement === g && Wt(i));
      }
      return () => {
        i.removeEventListener(ys, u), setTimeout(() => {
          const v = new CustomEvent(bs, tl);
          i.addEventListener(bs, c), i.dispatchEvent(v), v.defaultPrevented || Wt(g ?? document.body, { select: !0 }), i.removeEventListener(bs, c), rl.remove(h);
        }, 0);
      };
    }
  }, [i, u, c, h]);
  const m = S.useCallback(
    (g) => {
      if (!n && !r || h.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (y && v) {
        const b = g.currentTarget, [w, E] = iv(b);
        w && E ? !g.shiftKey && v === E ? (g.preventDefault(), n && Wt(w, { select: !0 })) : g.shiftKey && v === w && (g.preventDefault(), n && Wt(E, { select: !0 })) : v === b && g.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ f($e.div, { tabIndex: -1, ...a, ref: p, onKeyDown: m });
});
au.displayName = sv;
function av(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Wt(r, { select: t }), document.activeElement !== n) return;
}
function iv(e) {
  const t = iu(e), n = nl(t, e), r = nl(t.reverse(), e);
  return [n, r];
}
function iu(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function nl(e, t) {
  for (const n of e)
    if (!lv(n, { upTo: t })) return n;
}
function lv(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function cv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Wt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && cv(e) && t && e.select();
  }
}
var rl = uv();
function uv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ol(e, t), e.unshift(t);
    },
    remove(t) {
      e = ol(e, t), e[0]?.resume();
    }
  };
}
function ol(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function dv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var fv = S[" useId ".trim().toString()] || (() => {
}), pv = 0;
function co(e) {
  const [t, n] = S.useState(fv());
  return Yt(() => {
    n((r) => r ?? String(pv++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const hv = ["top", "right", "bottom", "left"], jt = Math.min, Ge = Math.max, uo = Math.round, Vr = Math.floor, ht = (e) => ({
  x: e,
  y: e
}), mv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, gv = {
  start: "end",
  end: "start"
};
function js(e, t, n) {
  return Ge(e, jt(t, n));
}
function At(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Pt(e) {
  return e.split("-")[0];
}
function jn(e) {
  return e.split("-")[1];
}
function Oa(e) {
  return e === "x" ? "y" : "x";
}
function _a(e) {
  return e === "y" ? "height" : "width";
}
const yv = /* @__PURE__ */ new Set(["top", "bottom"]);
function pt(e) {
  return yv.has(Pt(e)) ? "y" : "x";
}
function $a(e) {
  return Oa(pt(e));
}
function bv(e, t, n) {
  n === void 0 && (n = !1);
  const r = jn(e), o = $a(e), s = _a(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = fo(a)), [a, fo(a)];
}
function vv(e) {
  const t = fo(e);
  return [Vs(e), t, Vs(t)];
}
function Vs(e) {
  return e.replace(/start|end/g, (t) => gv[t]);
}
const sl = ["left", "right"], al = ["right", "left"], wv = ["top", "bottom"], kv = ["bottom", "top"];
function xv(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? al : sl : t ? sl : al;
    case "left":
    case "right":
      return t ? wv : kv;
    default:
      return [];
  }
}
function Cv(e, t, n, r) {
  const o = jn(e);
  let s = xv(Pt(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(Vs)))), s;
}
function fo(e) {
  return e.replace(/left|right|bottom|top/g, (t) => mv[t]);
}
function Sv(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function lu(e) {
  return typeof e != "number" ? Sv(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function po(e) {
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
function il(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = pt(t), a = $a(t), i = _a(a), l = Pt(t), u = s === "y", c = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, p = r[i] / 2 - o[i] / 2;
  let h;
  switch (l) {
    case "top":
      h = {
        x: c,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      h = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (jn(t)) {
    case "start":
      h[a] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      h[a] += p * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const Tv = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: a
  } = n, i = s.filter(Boolean), l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let u = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: c,
    y: d
  } = il(u, r, l), p = r, h = {}, m = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: y,
      fn: v
    } = i[g], {
      x: b,
      y: w,
      data: E,
      reset: x
    } = await v({
      x: c,
      y: d,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: h,
      rects: u,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = b ?? c, d = w ?? d, h = {
      ...h,
      [y]: {
        ...h[y],
        ...E
      }
    }, x && m <= 50 && (m++, typeof x == "object" && (x.placement && (p = x.placement), x.rects && (u = x.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : x.rects), {
      x: c,
      y: d
    } = il(u, p, l)), g = -1);
  }
  return {
    x: c,
    y: d,
    placement: p,
    strategy: o,
    middlewareData: h
  };
};
async function gr(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: a,
    elements: i,
    strategy: l
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: d = "floating",
    altBoundary: p = !1,
    padding: h = 0
  } = At(t, e), m = lu(h), y = i[p ? d === "floating" ? "reference" : "floating" : d], v = po(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: l
  })), b = d === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), E = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = po(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: b,
    offsetParent: w,
    strategy: l
  }) : b);
  return {
    top: (v.top - x.top + m.top) / E.y,
    bottom: (x.bottom - v.bottom + m.bottom) / E.y,
    left: (v.left - x.left + m.left) / E.x,
    right: (x.right - v.right + m.right) / E.x
  };
}
const Mv = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: a,
      elements: i,
      middlewareData: l
    } = t, {
      element: u,
      padding: c = 0
    } = At(e, t) || {};
    if (u == null)
      return {};
    const d = lu(c), p = {
      x: n,
      y: r
    }, h = $a(o), m = _a(h), g = await a.getDimensions(u), y = h === "y", v = y ? "top" : "left", b = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", E = s.reference[m] + s.reference[h] - p[h] - s.floating[m], x = p[h] - s.reference[h], M = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let D = M ? M[w] : 0;
    (!D || !await (a.isElement == null ? void 0 : a.isElement(M))) && (D = i.floating[w] || s.floating[m]);
    const C = E / 2 - x / 2, T = D / 2 - g[m] / 2 - 1, k = jt(d[v], T), R = jt(d[b], T), N = k, L = D - g[m] - R, I = D / 2 - g[m] / 2 + C, _ = js(N, I, L), H = !l.arrow && jn(o) != null && I !== _ && s.reference[m] / 2 - (I < N ? k : R) - g[m] / 2 < 0, K = H ? I < N ? I - N : I - L : 0;
    return {
      [h]: p[h] + K,
      data: {
        [h]: _,
        centerOffset: I - _ - K,
        ...H && {
          alignmentOffset: K
        }
      },
      reset: H
    };
  }
}), Ev = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: a,
        initialPlacement: i,
        platform: l,
        elements: u
      } = t, {
        mainAxis: c = !0,
        crossAxis: d = !0,
        fallbackPlacements: p,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: g = !0,
        ...y
      } = At(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = Pt(o), b = pt(i), w = Pt(i) === i, E = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), x = p || (w || !g ? [fo(i)] : vv(i)), M = m !== "none";
      !p && M && x.push(...Cv(i, g, m, E));
      const D = [i, ...x], C = await gr(t, y), T = [];
      let k = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (c && T.push(C[v]), d) {
        const I = bv(o, a, E);
        T.push(C[I[0]], C[I[1]]);
      }
      if (k = [...k, {
        placement: o,
        overflows: T
      }], !T.every((I) => I <= 0)) {
        var R, N;
        const I = (((R = s.flip) == null ? void 0 : R.index) || 0) + 1, _ = D[I];
        if (_ && (!(d === "alignment" ? b !== pt(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        k.every((P) => pt(P.placement) === b ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: I,
              overflows: k
            },
            reset: {
              placement: _
            }
          };
        let H = (N = k.filter((K) => K.overflows[0] <= 0).sort((K, P) => K.overflows[1] - P.overflows[1])[0]) == null ? void 0 : N.placement;
        if (!H)
          switch (h) {
            case "bestFit": {
              var L;
              const K = (L = k.filter((P) => {
                if (M) {
                  const B = pt(P.placement);
                  return B === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  B === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((B) => B > 0).reduce((B, ne) => B + ne, 0)]).sort((P, B) => P[1] - B[1])[0]) == null ? void 0 : L[0];
              K && (H = K);
              break;
            }
            case "initialPlacement":
              H = i;
              break;
          }
        if (o !== H)
          return {
            reset: {
              placement: H
            }
          };
      }
      return {};
    }
  };
};
function ll(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function cl(e) {
  return hv.some((t) => e[t] >= 0);
}
const Dv = function(e) {
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
          const s = await gr(t, {
            ...o,
            elementContext: "reference"
          }), a = ll(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: cl(a)
            }
          };
        }
        case "escaped": {
          const s = await gr(t, {
            ...o,
            altBoundary: !0
          }), a = ll(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: cl(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, cu = /* @__PURE__ */ new Set(["left", "top"]);
async function Nv(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Pt(n), i = jn(n), l = pt(n) === "y", u = cu.has(a) ? -1 : 1, c = s && l ? -1 : 1, d = At(t, e);
  let {
    mainAxis: p,
    crossAxis: h,
    alignmentAxis: m
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return i && typeof m == "number" && (h = i === "end" ? m * -1 : m), l ? {
    x: h * c,
    y: p * u
  } : {
    x: p * u,
    y: h * c
  };
}
const Rv = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: a,
        middlewareData: i
      } = t, l = await Nv(t, e);
      return a === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, Av = function(e) {
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
        crossAxis: a = !1,
        limiter: i = {
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
      } = At(e, t), u = {
        x: n,
        y: r
      }, c = await gr(t, l), d = pt(Pt(o)), p = Oa(d);
      let h = u[p], m = u[d];
      if (s) {
        const y = p === "y" ? "top" : "left", v = p === "y" ? "bottom" : "right", b = h + c[y], w = h - c[v];
        h = js(b, h, w);
      }
      if (a) {
        const y = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", b = m + c[y], w = m - c[v];
        m = js(b, m, w);
      }
      const g = i.fn({
        ...t,
        [p]: h,
        [d]: m
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [p]: s,
            [d]: a
          }
        }
      };
    }
  };
}, Pv = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: a
      } = t, {
        offset: i = 0,
        mainAxis: l = !0,
        crossAxis: u = !0
      } = At(e, t), c = {
        x: n,
        y: r
      }, d = pt(o), p = Oa(d);
      let h = c[p], m = c[d];
      const g = At(i, t), y = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const w = p === "y" ? "height" : "width", E = s.reference[p] - s.floating[w] + y.mainAxis, x = s.reference[p] + s.reference[w] - y.mainAxis;
        h < E ? h = E : h > x && (h = x);
      }
      if (u) {
        var v, b;
        const w = p === "y" ? "width" : "height", E = cu.has(Pt(o)), x = s.reference[d] - s.floating[w] + (E && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (E ? 0 : y.crossAxis), M = s.reference[d] + s.reference[w] + (E ? 0 : ((b = a.offset) == null ? void 0 : b[d]) || 0) - (E ? y.crossAxis : 0);
        m < x ? m = x : m > M && (m = M);
      }
      return {
        [p]: h,
        [d]: m
      };
    }
  };
}, Lv = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: s,
        platform: a,
        elements: i
      } = t, {
        apply: l = () => {
        },
        ...u
      } = At(e, t), c = await gr(t, u), d = Pt(o), p = jn(o), h = pt(o) === "y", {
        width: m,
        height: g
      } = s.floating;
      let y, v;
      d === "top" || d === "bottom" ? (y = d, v = p === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, y = p === "end" ? "top" : "bottom");
      const b = g - c.top - c.bottom, w = m - c.left - c.right, E = jt(g - c[y], b), x = jt(m - c[v], w), M = !t.middlewareData.shift;
      let D = E, C = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (C = w), (r = t.middlewareData.shift) != null && r.enabled.y && (D = b), M && !p) {
        const k = Ge(c.left, 0), R = Ge(c.right, 0), N = Ge(c.top, 0), L = Ge(c.bottom, 0);
        h ? C = m - 2 * (k !== 0 || R !== 0 ? k + R : Ge(c.left, c.right)) : D = g - 2 * (N !== 0 || L !== 0 ? N + L : Ge(c.top, c.bottom));
      }
      await l({
        ...t,
        availableWidth: C,
        availableHeight: D
      });
      const T = await a.getDimensions(i.floating);
      return m !== T.width || g !== T.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Po() {
  return typeof window < "u";
}
function Vn(e) {
  return uu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Xe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function bt(e) {
  var t;
  return (t = (uu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function uu(e) {
  return Po() ? e instanceof Node || e instanceof Xe(e).Node : !1;
}
function it(e) {
  return Po() ? e instanceof Element || e instanceof Xe(e).Element : !1;
}
function mt(e) {
  return Po() ? e instanceof HTMLElement || e instanceof Xe(e).HTMLElement : !1;
}
function ul(e) {
  return !Po() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Xe(e).ShadowRoot;
}
const Iv = /* @__PURE__ */ new Set(["inline", "contents"]);
function Tr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = lt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Iv.has(o);
}
const Ov = /* @__PURE__ */ new Set(["table", "td", "th"]);
function _v(e) {
  return Ov.has(Vn(e));
}
const $v = [":popover-open", ":modal"];
function Lo(e) {
  return $v.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const zv = ["transform", "translate", "scale", "rotate", "perspective"], Bv = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Hv = ["paint", "layout", "strict", "content"];
function za(e) {
  const t = Ba(), n = it(e) ? lt(e) : e;
  return zv.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Bv.some((r) => (n.willChange || "").includes(r)) || Hv.some((r) => (n.contain || "").includes(r));
}
function Wv(e) {
  let t = Vt(e);
  for (; mt(t) && !In(t); ) {
    if (za(t))
      return t;
    if (Lo(t))
      return null;
    t = Vt(t);
  }
  return null;
}
function Ba() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Fv = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function In(e) {
  return Fv.has(Vn(e));
}
function lt(e) {
  return Xe(e).getComputedStyle(e);
}
function Io(e) {
  return it(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Vt(e) {
  if (Vn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ul(e) && e.host || // Fallback.
    bt(e)
  );
  return ul(t) ? t.host : t;
}
function du(e) {
  const t = Vt(e);
  return In(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : mt(t) && Tr(t) ? t : du(t);
}
function yr(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = du(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Xe(o);
  if (s) {
    const i = Ks(a);
    return t.concat(a, a.visualViewport || [], Tr(o) ? o : [], i && n ? yr(i) : []);
  }
  return t.concat(o, yr(o, [], n));
}
function Ks(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function fu(e) {
  const t = lt(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = mt(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = uo(n) !== s || uo(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function Ha(e) {
  return it(e) ? e : e.contextElement;
}
function Rn(e) {
  const t = Ha(e);
  if (!mt(t))
    return ht(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = fu(t);
  let a = (s ? uo(n.width) : n.width) / r, i = (s ? uo(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const Uv = /* @__PURE__ */ ht(0);
function pu(e) {
  const t = Xe(e);
  return !Ba() || !t.visualViewport ? Uv : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Yv(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Xe(e) ? !1 : t;
}
function on(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = Ha(e);
  let a = ht(1);
  t && (r ? it(r) && (a = Rn(r)) : a = Rn(e));
  const i = Yv(s, n, r) ? pu(s) : ht(0);
  let l = (o.left + i.x) / a.x, u = (o.top + i.y) / a.y, c = o.width / a.x, d = o.height / a.y;
  if (s) {
    const p = Xe(s), h = r && it(r) ? Xe(r) : r;
    let m = p, g = Ks(m);
    for (; g && r && h !== m; ) {
      const y = Rn(g), v = g.getBoundingClientRect(), b = lt(g), w = v.left + (g.clientLeft + parseFloat(b.paddingLeft)) * y.x, E = v.top + (g.clientTop + parseFloat(b.paddingTop)) * y.y;
      l *= y.x, u *= y.y, c *= y.x, d *= y.y, l += w, u += E, m = Xe(g), g = Ks(m);
    }
  }
  return po({
    width: c,
    height: d,
    x: l,
    y: u
  });
}
function Oo(e, t) {
  const n = Io(e).scrollLeft;
  return t ? t.left + n : on(bt(e)).left + n;
}
function hu(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Oo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function jv(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = bt(r), i = t ? Lo(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = ht(1);
  const c = ht(0), d = mt(r);
  if ((d || !d && !s) && ((Vn(r) !== "body" || Tr(a)) && (l = Io(r)), mt(r))) {
    const h = on(r);
    u = Rn(r), c.x = h.x + r.clientLeft, c.y = h.y + r.clientTop;
  }
  const p = a && !d && !s ? hu(a, l) : ht(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + c.x + p.x,
    y: n.y * u.y - l.scrollTop * u.y + c.y + p.y
  };
}
function Vv(e) {
  return Array.from(e.getClientRects());
}
function Kv(e) {
  const t = bt(e), n = Io(e), r = e.ownerDocument.body, o = Ge(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Ge(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Oo(e);
  const i = -n.scrollTop;
  return lt(r).direction === "rtl" && (a += Ge(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
const dl = 25;
function qv(e, t) {
  const n = Xe(e), r = bt(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, l = 0;
  if (o) {
    s = o.width, a = o.height;
    const c = Ba();
    (!c || c && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const u = Oo(r);
  if (u <= 0) {
    const c = r.ownerDocument, d = c.body, p = getComputedStyle(d), h = c.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, m = Math.abs(r.clientWidth - d.clientWidth - h);
    m <= dl && (s -= m);
  } else u <= dl && (s += u);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const Gv = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Zv(e, t) {
  const n = on(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = mt(e) ? Rn(e) : ht(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = o * s.x, u = r * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: u
  };
}
function fl(e, t, n) {
  let r;
  if (t === "viewport")
    r = qv(e, n);
  else if (t === "document")
    r = Kv(bt(e));
  else if (it(t))
    r = Zv(t, n);
  else {
    const o = pu(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return po(r);
}
function mu(e, t) {
  const n = Vt(e);
  return n === t || !it(n) || In(n) ? !1 : lt(n).position === "fixed" || mu(n, t);
}
function Xv(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = yr(e, [], !1).filter((i) => it(i) && Vn(i) !== "body"), o = null;
  const s = lt(e).position === "fixed";
  let a = s ? Vt(e) : e;
  for (; it(a) && !In(a); ) {
    const i = lt(a), l = za(a);
    !l && i.position === "fixed" && (o = null), (s ? !l && !o : !l && i.position === "static" && !!o && Gv.has(o.position) || Tr(a) && !l && mu(e, a)) ? r = r.filter((c) => c !== a) : o = i, a = Vt(a);
  }
  return t.set(e, r), r;
}
function Qv(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? Lo(t) ? [] : Xv(t, this._c) : [].concat(n), r], i = a[0], l = a.reduce((u, c) => {
    const d = fl(t, c, o);
    return u.top = Ge(d.top, u.top), u.right = jt(d.right, u.right), u.bottom = jt(d.bottom, u.bottom), u.left = Ge(d.left, u.left), u;
  }, fl(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Jv(e) {
  const {
    width: t,
    height: n
  } = fu(e);
  return {
    width: t,
    height: n
  };
}
function ew(e, t, n) {
  const r = mt(t), o = bt(t), s = n === "fixed", a = on(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ht(0);
  function u() {
    l.x = Oo(o);
  }
  if (r || !r && !s)
    if ((Vn(t) !== "body" || Tr(o)) && (i = Io(t)), r) {
      const h = on(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else o && u();
  s && !r && o && u();
  const c = o && !r && !s ? hu(o, i) : ht(0), d = a.left + i.scrollLeft - l.x - c.x, p = a.top + i.scrollTop - l.y - c.y;
  return {
    x: d,
    y: p,
    width: a.width,
    height: a.height
  };
}
function vs(e) {
  return lt(e).position === "static";
}
function pl(e, t) {
  if (!mt(e) || lt(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return bt(e) === n && (n = n.ownerDocument.body), n;
}
function gu(e, t) {
  const n = Xe(e);
  if (Lo(e))
    return n;
  if (!mt(e)) {
    let o = Vt(e);
    for (; o && !In(o); ) {
      if (it(o) && !vs(o))
        return o;
      o = Vt(o);
    }
    return n;
  }
  let r = pl(e, t);
  for (; r && _v(r) && vs(r); )
    r = pl(r, t);
  return r && In(r) && vs(r) && !za(r) ? n : r || Wv(e) || n;
}
const tw = async function(e) {
  const t = this.getOffsetParent || gu, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: ew(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function nw(e) {
  return lt(e).direction === "rtl";
}
const rw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: jv,
  getDocumentElement: bt,
  getClippingRect: Qv,
  getOffsetParent: gu,
  getElementRects: tw,
  getClientRects: Vv,
  getDimensions: Jv,
  getScale: Rn,
  isElement: it,
  isRTL: nw
};
function yu(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ow(e, t) {
  let n = null, r;
  const o = bt(e);
  function s() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), s();
    const u = e.getBoundingClientRect(), {
      left: c,
      top: d,
      width: p,
      height: h
    } = u;
    if (i || t(), !p || !h)
      return;
    const m = Vr(d), g = Vr(o.clientWidth - (c + p)), y = Vr(o.clientHeight - (d + h)), v = Vr(c), w = {
      rootMargin: -m + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: Ge(0, jt(1, l)) || 1
    };
    let E = !0;
    function x(M) {
      const D = M[0].intersectionRatio;
      if (D !== l) {
        if (!E)
          return a();
        D ? a(!1, D) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !yu(u, e.getBoundingClientRect()) && a(), E = !1;
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
  return a(!0), s;
}
function sw(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = Ha(e), c = o || s ? [...u ? yr(u) : [], ...yr(t)] : [];
  c.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = u && i ? ow(u, n) : null;
  let p = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [b] = v;
    b && b.target === u && h && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var w;
      (w = h) == null || w.observe(t);
    })), n();
  }), u && !l && h.observe(u), h.observe(t));
  let m, g = l ? on(e) : null;
  l && y();
  function y() {
    const v = on(e);
    g && !yu(g, v) && n(), g = v, m = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    c.forEach((b) => {
      o && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), d?.(), (v = h) == null || v.disconnect(), h = null, l && cancelAnimationFrame(m);
  };
}
const aw = Rv, iw = Av, lw = Ev, cw = Lv, uw = Dv, hl = Mv, dw = Pv, fw = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: rw,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Tv(e, t, {
    ...o,
    platform: s
  });
};
var pw = typeof document < "u", hw = function() {
}, so = pw ? To : hw;
function ho(e, t) {
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
        if (!ho(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !ho(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function bu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ml(e, t) {
  const n = bu(e);
  return Math.round(t * n) / n;
}
function ws(e) {
  const t = S.useRef(e);
  return so(() => {
    t.current = e;
  }), t;
}
function mw(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: s,
      floating: a
    } = {},
    transform: i = !0,
    whileElementsMounted: l,
    open: u
  } = e, [c, d] = S.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = S.useState(r);
  ho(p, r) || h(r);
  const [m, g] = S.useState(null), [y, v] = S.useState(null), b = S.useCallback((P) => {
    P !== M.current && (M.current = P, g(P));
  }, []), w = S.useCallback((P) => {
    P !== D.current && (D.current = P, v(P));
  }, []), E = s || m, x = a || y, M = S.useRef(null), D = S.useRef(null), C = S.useRef(c), T = l != null, k = ws(l), R = ws(o), N = ws(u), L = S.useCallback(() => {
    if (!M.current || !D.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: p
    };
    R.current && (P.platform = R.current), fw(M.current, D.current, P).then((B) => {
      const ne = {
        ...B,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: N.current !== !1
      };
      I.current && !ho(C.current, ne) && (C.current = ne, uc.flushSync(() => {
        d(ne);
      }));
    });
  }, [p, t, n, R, N]);
  so(() => {
    u === !1 && C.current.isPositioned && (C.current.isPositioned = !1, d((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [u]);
  const I = S.useRef(!1);
  so(() => (I.current = !0, () => {
    I.current = !1;
  }), []), so(() => {
    if (E && (M.current = E), x && (D.current = x), E && x) {
      if (k.current)
        return k.current(E, x, L);
      L();
    }
  }, [E, x, L, k, T]);
  const _ = S.useMemo(() => ({
    reference: M,
    floating: D,
    setReference: b,
    setFloating: w
  }), [b, w]), H = S.useMemo(() => ({
    reference: E,
    floating: x
  }), [E, x]), K = S.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!H.floating)
      return P;
    const B = ml(H.floating, c.x), ne = ml(H.floating, c.y);
    return i ? {
      ...P,
      transform: "translate(" + B + "px, " + ne + "px)",
      ...bu(H.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: B,
      top: ne
    };
  }, [n, i, H.floating, c.x, c.y]);
  return S.useMemo(() => ({
    ...c,
    update: L,
    refs: _,
    elements: H,
    floatingStyles: K
  }), [c, L, _, H, K]);
}
const gw = (e) => {
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
      return r && t(r) ? r.current != null ? hl({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? hl({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, yw = (e, t) => ({
  ...aw(e),
  options: [e, t]
}), bw = (e, t) => ({
  ...iw(e),
  options: [e, t]
}), vw = (e, t) => ({
  ...dw(e),
  options: [e, t]
}), ww = (e, t) => ({
  ...lw(e),
  options: [e, t]
}), kw = (e, t) => ({
  ...cw(e),
  options: [e, t]
}), xw = (e, t) => ({
  ...uw(e),
  options: [e, t]
}), Cw = (e, t) => ({
  ...gw(e),
  options: [e, t]
});
var Sw = "Arrow", vu = S.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ f(
    $e.svg,
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
vu.displayName = Sw;
var Tw = vu;
function Mw(e) {
  const [t, n] = S.useState(void 0);
  return Yt(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let a, i;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          a = u.inlineSize, i = u.blockSize;
        } else
          a = e.offsetWidth, i = e.offsetHeight;
        n({ width: a, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Wa = "Popper", [wu, _o] = Yn(Wa), [Ew, ku] = wu(Wa), xu = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = S.useState(null);
  return /* @__PURE__ */ f(Ew, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
xu.displayName = Wa;
var Cu = "PopperAnchor", Su = S.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = ku(Cu, n), a = S.useRef(null), i = He(t, a), l = S.useRef(null);
    return S.useEffect(() => {
      const u = l.current;
      l.current = r?.current || a.current, u !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ f($e.div, { ...o, ref: i });
  }
);
Su.displayName = Cu;
var Fa = "PopperContent", [Dw, Nw] = wu(Fa), Tu = S.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: u = [],
      collisionPadding: c = 0,
      sticky: d = "partial",
      hideWhenDetached: p = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: m,
      ...g
    } = e, y = ku(Fa, n), [v, b] = S.useState(null), w = He(t, (Y) => b(Y)), [E, x] = S.useState(null), M = Mw(E), D = M?.width ?? 0, C = M?.height ?? 0, T = r + (s !== "center" ? "-" + s : ""), k = typeof c == "number" ? c : { top: 0, right: 0, bottom: 0, left: 0, ...c }, R = Array.isArray(u) ? u : [u], N = R.length > 0, L = {
      padding: k,
      boundary: R.filter(Aw),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: N
    }, { refs: I, floatingStyles: _, placement: H, isPositioned: K, middlewareData: P } = mw({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: T,
      whileElementsMounted: (...Y) => sw(...Y, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        yw({ mainAxis: o + C, alignmentAxis: a }),
        l && bw({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? vw() : void 0,
          ...L
        }),
        l && ww({ ...L }),
        kw({
          ...L,
          apply: ({ elements: Y, rects: Q, availableWidth: pe, availableHeight: be }) => {
            const { width: Me, height: Oe } = Q.reference, Je = Y.floating.style;
            Je.setProperty("--radix-popper-available-width", `${pe}px`), Je.setProperty("--radix-popper-available-height", `${be}px`), Je.setProperty("--radix-popper-anchor-width", `${Me}px`), Je.setProperty("--radix-popper-anchor-height", `${Oe}px`);
          }
        }),
        E && Cw({ element: E, padding: i }),
        Pw({ arrowWidth: D, arrowHeight: C }),
        p && xw({ strategy: "referenceHidden", ...L })
      ]
    }), [B, ne] = Du(H), ae = Rt(m);
    Yt(() => {
      K && ae?.();
    }, [K, ae]);
    const oe = P.arrow?.x, re = P.arrow?.y, ie = P.arrow?.centerOffset !== 0, [$, W] = S.useState();
    return Yt(() => {
      v && W(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ f(
      "div",
      {
        ref: I.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ..._,
          transform: K ? _.transform : "translate(0, -200%)",
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
          Dw,
          {
            scope: n,
            placedSide: B,
            onArrowChange: x,
            arrowX: oe,
            arrowY: re,
            shouldHideArrow: ie,
            children: /* @__PURE__ */ f(
              $e.div,
              {
                "data-side": B,
                "data-align": ne,
                ...g,
                ref: w,
                style: {
                  ...g.style,
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
Tu.displayName = Fa;
var Mu = "PopperArrow", Rw = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Eu = S.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Nw(Mu, r), a = Rw[s.placedSide];
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
        children: /* @__PURE__ */ f(
          Tw,
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
Eu.displayName = Mu;
function Aw(e) {
  return e !== null;
}
var Pw = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, a = o.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [u, c] = Du(n), d = { start: "0%", center: "50%", end: "100%" }[c], p = (o.arrow?.x ?? 0) + i / 2, h = (o.arrow?.y ?? 0) + l / 2;
    let m = "", g = "";
    return u === "bottom" ? (m = a ? d : `${p}px`, g = `${-l}px`) : u === "top" ? (m = a ? d : `${p}px`, g = `${r.floating.height + l}px`) : u === "right" ? (m = `${-l}px`, g = a ? d : `${h}px`) : u === "left" && (m = `${r.floating.width + l}px`, g = a ? d : `${h}px`), { data: { x: m, y: g } };
  }
});
function Du(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Nu = xu, Ru = Su, Au = Tu, Pu = Eu, Lw = "Portal", Ua = S.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = S.useState(!1);
  Yt(() => s(!0), []);
  const a = n || o && globalThis?.document?.body;
  return a ? qp.createPortal(/* @__PURE__ */ f($e.div, { ...r, ref: t }), a) : null;
});
Ua.displayName = Lw;
function Iw(e, t) {
  return S.useReducer((n, r) => t[n][r] ?? n, e);
}
var an = (e) => {
  const { present: t, children: n } = e, r = Ow(t), o = typeof n == "function" ? n({ present: r.isPresent }) : S.Children.only(n), s = He(r.ref, _w(o));
  return typeof n == "function" || r.isPresent ? S.cloneElement(o, { ref: s }) : null;
};
an.displayName = "Presence";
function Ow(e) {
  const [t, n] = S.useState(), r = S.useRef(null), o = S.useRef(e), s = S.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = Iw(a, {
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
    const u = Kr(r.current);
    s.current = i === "mounted" ? u : "none";
  }, [i]), Yt(() => {
    const u = r.current, c = o.current;
    if (c !== e) {
      const p = s.current, h = Kr(u);
      e ? l("MOUNT") : h === "none" || u?.display === "none" ? l("UNMOUNT") : l(c && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), Yt(() => {
    if (t) {
      let u;
      const c = t.ownerDocument.defaultView ?? window, d = (h) => {
        const g = Kr(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (l("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = c.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, p = (h) => {
        h.target === t && (s.current = Kr(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        c.clearTimeout(u), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: S.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Kr(e) {
  return e?.animationName || "none";
}
function _w(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ks = "rovingFocusGroup.onEntryFocus", $w = { bubbles: !1, cancelable: !0 }, Mr = "RovingFocusGroup", [qs, Lu, zw] = nu(Mr), [Bw, Iu] = Yn(
  Mr,
  [zw]
), [Hw, Ww] = Bw(Mr), Ou = S.forwardRef(
  (e, t) => /* @__PURE__ */ f(qs.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(qs.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(Fw, { ...e, ref: t }) }) })
);
Ou.displayName = Mr;
var Fw = S.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: a,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: l,
    onEntryFocus: u,
    preventScrollOnEntryFocus: c = !1,
    ...d
  } = e, p = S.useRef(null), h = He(t, p), m = ru(s), [g, y] = La({
    prop: a,
    defaultProp: i ?? null,
    onChange: l,
    caller: Mr
  }), [v, b] = S.useState(!1), w = Rt(u), E = Lu(n), x = S.useRef(!1), [M, D] = S.useState(0);
  return S.useEffect(() => {
    const C = p.current;
    if (C)
      return C.addEventListener(ks, w), () => C.removeEventListener(ks, w);
  }, [w]), /* @__PURE__ */ f(
    Hw,
    {
      scope: n,
      orientation: r,
      dir: m,
      loop: o,
      currentTabStopId: g,
      onItemFocus: S.useCallback(
        (C) => y(C),
        [y]
      ),
      onItemShiftTab: S.useCallback(() => b(!0), []),
      onFocusableItemAdd: S.useCallback(
        () => D((C) => C + 1),
        []
      ),
      onFocusableItemRemove: S.useCallback(
        () => D((C) => C - 1),
        []
      ),
      children: /* @__PURE__ */ f(
        $e.div,
        {
          tabIndex: v || M === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: de(e.onMouseDown, () => {
            x.current = !0;
          }),
          onFocus: de(e.onFocus, (C) => {
            const T = !x.current;
            if (C.target === C.currentTarget && T && !v) {
              const k = new CustomEvent(ks, $w);
              if (C.currentTarget.dispatchEvent(k), !k.defaultPrevented) {
                const R = E().filter((H) => H.focusable), N = R.find((H) => H.active), L = R.find((H) => H.id === g), _ = [N, L, ...R].filter(
                  Boolean
                ).map((H) => H.ref.current);
                zu(_, c);
              }
            }
            x.current = !1;
          }),
          onBlur: de(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), _u = "RovingFocusGroupItem", $u = S.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, l = co(), u = s || l, c = Ww(_u, n), d = c.currentTabStopId === u, p = Lu(n), { onFocusableItemAdd: h, onFocusableItemRemove: m, currentTabStopId: g } = c;
    return S.useEffect(() => {
      if (r)
        return h(), () => m();
    }, [r, h, m]), /* @__PURE__ */ f(
      qs.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ f(
          $e.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": c.orientation,
            ...i,
            ref: t,
            onMouseDown: de(e.onMouseDown, (y) => {
              r ? c.onItemFocus(u) : y.preventDefault();
            }),
            onFocus: de(e.onFocus, () => c.onItemFocus(u)),
            onKeyDown: de(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                c.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const v = jw(y, c.orientation, c.dir);
              if (v !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = p().filter((E) => E.focusable).map((E) => E.ref.current);
                if (v === "last") w.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && w.reverse();
                  const E = w.indexOf(y.currentTarget);
                  w = c.loop ? Vw(w, E + 1) : w.slice(E + 1);
                }
                setTimeout(() => zu(w));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: g != null }) : a
          }
        )
      }
    );
  }
);
$u.displayName = _u;
var Uw = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Yw(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function jw(e, t, n) {
  const r = Yw(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Uw[r];
}
function zu(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Vw(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Kw = Ou, qw = $u, Gw = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, wn = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new WeakMap(), Gr = {}, xs = 0, Bu = function(e) {
  return e && (e.host || Bu(e.parentNode));
}, Zw = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Bu(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Xw = function(e, t, n, r) {
  var o = Zw(t, Array.isArray(e) ? e : [e]);
  Gr[n] || (Gr[n] = /* @__PURE__ */ new WeakMap());
  var s = Gr[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(o), u = function(d) {
    !d || i.has(d) || (i.add(d), u(d.parentNode));
  };
  o.forEach(u);
  var c = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(p) {
      if (i.has(p))
        c(p);
      else
        try {
          var h = p.getAttribute(r), m = h !== null && h !== "false", g = (wn.get(p) || 0) + 1, y = (s.get(p) || 0) + 1;
          wn.set(p, g), s.set(p, y), a.push(p), g === 1 && m && qr.set(p, !0), y === 1 && p.setAttribute(n, "true"), m || p.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", p, v);
        }
    });
  };
  return c(t), i.clear(), xs++, function() {
    a.forEach(function(d) {
      var p = wn.get(d) - 1, h = s.get(d) - 1;
      wn.set(d, p), s.set(d, h), p || (qr.has(d) || d.removeAttribute(r), qr.delete(d)), h || d.removeAttribute(n);
    }), xs--, xs || (wn = /* @__PURE__ */ new WeakMap(), wn = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new WeakMap(), Gr = {});
  };
}, Qw = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Gw(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Xw(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, dt = function() {
  return dt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, dt.apply(this, arguments);
};
function Hu(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Jw(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var ao = "right-scroll-bar-position", io = "width-before-scroll-bar", ek = "with-scroll-bars-hidden", tk = "--removed-body-scroll-bar-size";
function Cs(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function nk(e, t) {
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
var rk = typeof window < "u" ? S.useLayoutEffect : S.useEffect, gl = /* @__PURE__ */ new WeakMap();
function ok(e, t) {
  var n = nk(null, function(r) {
    return e.forEach(function(o) {
      return Cs(o, r);
    });
  });
  return rk(function() {
    var r = gl.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || Cs(i, null);
      }), s.forEach(function(i) {
        o.has(i) || Cs(i, a);
      });
    }
    gl.set(n, e);
  }, [e]), n;
}
function sk(e) {
  return e;
}
function ak(e, t) {
  t === void 0 && (t = sk);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var a = t(s, r);
      return n.push(a), function() {
        n = n.filter(function(i) {
          return i !== a;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (r = !0; n.length; ) {
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
      r = !0;
      var a = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(s), a = n;
      }
      var l = function() {
        var c = a;
        a = [], c.forEach(s);
      }, u = function() {
        return Promise.resolve().then(l);
      };
      u(), n = {
        push: function(c) {
          a.push(c), u();
        },
        filter: function(c) {
          return a = a.filter(c), n;
        }
      };
    }
  };
  return o;
}
function ik(e) {
  e === void 0 && (e = {});
  var t = ak(null);
  return t.options = dt({ async: !0, ssr: !1 }, e), t;
}
var Wu = function(e) {
  var t = e.sideCar, n = Hu(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return S.createElement(r, dt({}, n));
};
Wu.isSideCarExport = !0;
function lk(e, t) {
  return e.useMedium(t), Wu;
}
var Fu = ik(), Ss = function() {
}, $o = S.forwardRef(function(e, t) {
  var n = S.useRef(null), r = S.useState({
    onScrollCapture: Ss,
    onWheelCapture: Ss,
    onTouchMoveCapture: Ss
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, l = e.className, u = e.removeScrollBar, c = e.enabled, d = e.shards, p = e.sideCar, h = e.noRelative, m = e.noIsolation, g = e.inert, y = e.allowPinchZoom, v = e.as, b = v === void 0 ? "div" : v, w = e.gapMode, E = Hu(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), x = p, M = ok([n, t]), D = dt(dt({}, E), o);
  return S.createElement(
    S.Fragment,
    null,
    c && S.createElement(x, { sideCar: Fu, removeScrollBar: u, shards: d, noRelative: h, noIsolation: m, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    a ? S.cloneElement(S.Children.only(i), dt(dt({}, D), { ref: M })) : S.createElement(b, dt({}, D, { className: l, ref: M }), i)
  );
});
$o.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
$o.classNames = {
  fullWidth: io,
  zeroRight: ao
};
var ck = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function uk() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = ck();
  return t && e.setAttribute("nonce", t), e;
}
function dk(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function fk(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var pk = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = uk()) && (dk(t, n), fk(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, hk = function() {
  var e = pk();
  return function(t, n) {
    S.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Uu = function() {
  var e = hk(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, mk = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ts = function(e) {
  return parseInt(e || "", 10) || 0;
}, gk = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ts(n), Ts(r), Ts(o)];
}, yk = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return mk;
  var t = gk(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, bk = Uu(), An = "data-scroll-locked", vk = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(ek, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(An, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(ao, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(io, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(ao, " .").concat(ao, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(io, " .").concat(io, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(An, `] {
    `).concat(tk, ": ").concat(i, `px;
  }
`);
}, yl = function() {
  var e = parseInt(document.body.getAttribute(An) || "0", 10);
  return isFinite(e) ? e : 0;
}, wk = function() {
  S.useEffect(function() {
    return document.body.setAttribute(An, (yl() + 1).toString()), function() {
      var e = yl() - 1;
      e <= 0 ? document.body.removeAttribute(An) : document.body.setAttribute(An, e.toString());
    };
  }, []);
}, kk = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  wk();
  var s = S.useMemo(function() {
    return yk(o);
  }, [o]);
  return S.createElement(bk, { styles: vk(s, !t, o, n ? "" : "!important") });
}, Gs = !1;
if (typeof window < "u")
  try {
    var Zr = Object.defineProperty({}, "passive", {
      get: function() {
        return Gs = !0, !0;
      }
    });
    window.addEventListener("test", Zr, Zr), window.removeEventListener("test", Zr, Zr);
  } catch {
    Gs = !1;
  }
var kn = Gs ? { passive: !1 } : !1, xk = function(e) {
  return e.tagName === "TEXTAREA";
}, Yu = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !xk(e) && n[t] === "visible")
  );
}, Ck = function(e) {
  return Yu(e, "overflowY");
}, Sk = function(e) {
  return Yu(e, "overflowX");
}, bl = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = ju(e, r);
    if (o) {
      var s = Vu(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Tk = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Mk = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, ju = function(e, t) {
  return e === "v" ? Ck(t) : Sk(t);
}, Vu = function(e, t) {
  return e === "v" ? Tk(t) : Mk(t);
}, Ek = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Dk = function(e, t, n, r, o) {
  var s = Ek(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, l = t.contains(i), u = !1, c = a > 0, d = 0, p = 0;
  do {
    if (!i)
      break;
    var h = Vu(e, i), m = h[0], g = h[1], y = h[2], v = g - y - s * m;
    (m || v) && ju(e, i) && (d += v, p += m);
    var b = i.parentNode;
    i = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (c && Math.abs(d) < 1 || !c && Math.abs(p) < 1) && (u = !0), u;
}, Xr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, vl = function(e) {
  return [e.deltaX, e.deltaY];
}, wl = function(e) {
  return e && "current" in e ? e.current : e;
}, Nk = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Rk = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Ak = 0, xn = [];
function Pk(e) {
  var t = S.useRef([]), n = S.useRef([0, 0]), r = S.useRef(), o = S.useState(Ak++)[0], s = S.useState(Uu)[0], a = S.useRef(e);
  S.useEffect(function() {
    a.current = e;
  }, [e]), S.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Jw([e.lockRef.current], (e.shards || []).map(wl), !0).filter(Boolean);
      return g.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = S.useCallback(function(g, y) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = Xr(g), b = n.current, w = "deltaX" in g ? g.deltaX : b[0] - v[0], E = "deltaY" in g ? g.deltaY : b[1] - v[1], x, M = g.target, D = Math.abs(w) > Math.abs(E) ? "h" : "v";
    if ("touches" in g && D === "h" && M.type === "range")
      return !1;
    var C = bl(D, M);
    if (!C)
      return !0;
    if (C ? x = D : (x = D === "v" ? "h" : "v", C = bl(D, M)), !C)
      return !1;
    if (!r.current && "changedTouches" in g && (w || E) && (r.current = x), !x)
      return !0;
    var T = r.current || x;
    return Dk(T, y, g, T === "h" ? w : E);
  }, []), l = S.useCallback(function(g) {
    var y = g;
    if (!(!xn.length || xn[xn.length - 1] !== s)) {
      var v = "deltaY" in y ? vl(y) : Xr(y), b = t.current.filter(function(x) {
        return x.name === y.type && (x.target === y.target || y.target === x.shadowParent) && Nk(x.delta, v);
      })[0];
      if (b && b.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!b) {
        var w = (a.current.shards || []).map(wl).filter(Boolean).filter(function(x) {
          return x.contains(y.target);
        }), E = w.length > 0 ? i(y, w[0]) : !a.current.noIsolation;
        E && y.cancelable && y.preventDefault();
      }
    }
  }, []), u = S.useCallback(function(g, y, v, b) {
    var w = { name: g, delta: y, target: v, should: b, shadowParent: Lk(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(E) {
        return E !== w;
      });
    }, 1);
  }, []), c = S.useCallback(function(g) {
    n.current = Xr(g), r.current = void 0;
  }, []), d = S.useCallback(function(g) {
    u(g.type, vl(g), g.target, i(g, e.lockRef.current));
  }, []), p = S.useCallback(function(g) {
    u(g.type, Xr(g), g.target, i(g, e.lockRef.current));
  }, []);
  S.useEffect(function() {
    return xn.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", l, kn), document.addEventListener("touchmove", l, kn), document.addEventListener("touchstart", c, kn), function() {
      xn = xn.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", l, kn), document.removeEventListener("touchmove", l, kn), document.removeEventListener("touchstart", c, kn);
    };
  }, []);
  var h = e.removeScrollBar, m = e.inert;
  return S.createElement(
    S.Fragment,
    null,
    m ? S.createElement(s, { styles: Rk(o) }) : null,
    h ? S.createElement(kk, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Lk(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Ik = lk(Fu, Pk);
var Ku = S.forwardRef(function(e, t) {
  return S.createElement($o, dt({}, e, { ref: t, sideCar: Ik }));
});
Ku.classNames = $o.classNames;
var Zs = ["Enter", " "], Ok = ["ArrowDown", "PageUp", "Home"], qu = ["ArrowUp", "PageDown", "End"], _k = [...Ok, ...qu], $k = {
  ltr: [...Zs, "ArrowRight"],
  rtl: [...Zs, "ArrowLeft"]
}, zk = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Er = "Menu", [br, Bk, Hk] = nu(Er), [ln, Gu] = Yn(Er, [
  Hk,
  _o,
  Iu
]), zo = _o(), Zu = Iu(), [Wk, cn] = ln(Er), [Fk, Dr] = ln(Er), Xu = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: a = !0 } = e, i = zo(t), [l, u] = S.useState(null), c = S.useRef(!1), d = Rt(s), p = ru(o);
  return S.useEffect(() => {
    const h = () => {
      c.current = !0, document.addEventListener("pointerdown", m, { capture: !0, once: !0 }), document.addEventListener("pointermove", m, { capture: !0, once: !0 });
    }, m = () => c.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", m, { capture: !0 }), document.removeEventListener("pointermove", m, { capture: !0 });
    };
  }, []), /* @__PURE__ */ f(Nu, { ...i, children: /* @__PURE__ */ f(
    Wk,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: u,
      children: /* @__PURE__ */ f(
        Fk,
        {
          scope: t,
          onClose: S.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: c,
          dir: p,
          modal: a,
          children: r
        }
      )
    }
  ) });
};
Xu.displayName = Er;
var Uk = "MenuAnchor", Ya = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = zo(n);
    return /* @__PURE__ */ f(Ru, { ...o, ...r, ref: t });
  }
);
Ya.displayName = Uk;
var ja = "MenuPortal", [Yk, Qu] = ln(ja, {
  forceMount: void 0
}), Ju = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = cn(ja, t);
  return /* @__PURE__ */ f(Yk, { scope: t, forceMount: n, children: /* @__PURE__ */ f(an, { present: n || s.open, children: /* @__PURE__ */ f(Ua, { asChild: !0, container: o, children: r }) }) });
};
Ju.displayName = ja;
var nt = "MenuContent", [jk, Va] = ln(nt), ed = S.forwardRef(
  (e, t) => {
    const n = Qu(nt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = cn(nt, e.__scopeMenu), a = Dr(nt, e.__scopeMenu);
    return /* @__PURE__ */ f(br.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(an, { present: r || s.open, children: /* @__PURE__ */ f(br.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ f(Vk, { ...o, ref: t }) : /* @__PURE__ */ f(Kk, { ...o, ref: t }) }) }) });
  }
), Vk = S.forwardRef(
  (e, t) => {
    const n = cn(nt, e.__scopeMenu), r = S.useRef(null), o = He(t, r);
    return S.useEffect(() => {
      const s = r.current;
      if (s) return Qw(s);
    }, []), /* @__PURE__ */ f(
      Ka,
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
), Kk = S.forwardRef((e, t) => {
  const n = cn(nt, e.__scopeMenu);
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
}), qk = /* @__PURE__ */ mr("MenuContent.ScrollLock"), Ka = S.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: s,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: i,
      onEntryFocus: l,
      onEscapeKeyDown: u,
      onPointerDownOutside: c,
      onFocusOutside: d,
      onInteractOutside: p,
      onDismiss: h,
      disableOutsideScroll: m,
      ...g
    } = e, y = cn(nt, n), v = Dr(nt, n), b = zo(n), w = Zu(n), E = Bk(n), [x, M] = S.useState(null), D = S.useRef(null), C = He(t, D, y.onContentChange), T = S.useRef(0), k = S.useRef(""), R = S.useRef(0), N = S.useRef(null), L = S.useRef("right"), I = S.useRef(0), _ = m ? Ku : S.Fragment, H = m ? { as: qk, allowPinchZoom: !0 } : void 0, K = (B) => {
      const ne = k.current + B, ae = E().filter((Y) => !Y.disabled), oe = document.activeElement, re = ae.find((Y) => Y.ref.current === oe)?.textValue, ie = ae.map((Y) => Y.textValue), $ = a0(ie, ne, re), W = ae.find((Y) => Y.textValue === $)?.ref.current;
      (function Y(Q) {
        k.current = Q, window.clearTimeout(T.current), Q !== "" && (T.current = window.setTimeout(() => Y(""), 1e3));
      })(ne), W && setTimeout(() => W.focus());
    };
    S.useEffect(() => () => window.clearTimeout(T.current), []), ov();
    const P = S.useCallback((B) => L.current === N.current?.side && l0(B, N.current?.area), []);
    return /* @__PURE__ */ f(
      jk,
      {
        scope: n,
        searchRef: k,
        onItemEnter: S.useCallback(
          (B) => {
            P(B) && B.preventDefault();
          },
          [P]
        ),
        onItemLeave: S.useCallback(
          (B) => {
            P(B) || (D.current?.focus(), M(null));
          },
          [P]
        ),
        onTriggerLeave: S.useCallback(
          (B) => {
            P(B) && B.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: R,
        onPointerGraceIntentChange: S.useCallback((B) => {
          N.current = B;
        }, []),
        children: /* @__PURE__ */ f(_, { ...H, children: /* @__PURE__ */ f(
          au,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: de(s, (B) => {
              B.preventDefault(), D.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ f(
              Ia,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: u,
                onPointerDownOutside: c,
                onFocusOutside: d,
                onInteractOutside: p,
                onDismiss: h,
                children: /* @__PURE__ */ f(
                  Kw,
                  {
                    asChild: !0,
                    ...w,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: x,
                    onCurrentTabStopIdChange: M,
                    onEntryFocus: de(l, (B) => {
                      v.isUsingKeyboardRef.current || B.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ f(
                      Au,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": gd(y.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...b,
                        ...g,
                        ref: C,
                        style: { outline: "none", ...g.style },
                        onKeyDown: de(g.onKeyDown, (B) => {
                          const ae = B.target.closest("[data-radix-menu-content]") === B.currentTarget, oe = B.ctrlKey || B.altKey || B.metaKey, re = B.key.length === 1;
                          ae && (B.key === "Tab" && B.preventDefault(), !oe && re && K(B.key));
                          const ie = D.current;
                          if (B.target !== ie || !_k.includes(B.key)) return;
                          B.preventDefault();
                          const W = E().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
                          qu.includes(B.key) && W.reverse(), o0(W);
                        }),
                        onBlur: de(e.onBlur, (B) => {
                          B.currentTarget.contains(B.target) || (window.clearTimeout(T.current), k.current = "");
                        }),
                        onPointerMove: de(
                          e.onPointerMove,
                          vr((B) => {
                            const ne = B.target, ae = I.current !== B.clientX;
                            if (B.currentTarget.contains(ne) && ae) {
                              const oe = B.clientX > I.current ? "right" : "left";
                              L.current = oe, I.current = B.clientX;
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
ed.displayName = nt;
var Gk = "MenuGroup", qa = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f($e.div, { role: "group", ...r, ref: t });
  }
);
qa.displayName = Gk;
var Zk = "MenuLabel", td = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f($e.div, { ...r, ref: t });
  }
);
td.displayName = Zk;
var mo = "MenuItem", kl = "menu.itemSelect", Bo = S.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = S.useRef(null), a = Dr(mo, e.__scopeMenu), i = Va(mo, e.__scopeMenu), l = He(t, s), u = S.useRef(!1), c = () => {
      const d = s.current;
      if (!n && d) {
        const p = new CustomEvent(kl, { bubbles: !0, cancelable: !0 });
        d.addEventListener(kl, (h) => r?.(h), { once: !0 }), tu(d, p), p.defaultPrevented ? u.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ f(
      nd,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: de(e.onClick, c),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), u.current = !0;
        },
        onPointerUp: de(e.onPointerUp, (d) => {
          u.current || d.currentTarget?.click();
        }),
        onKeyDown: de(e.onKeyDown, (d) => {
          const p = i.searchRef.current !== "";
          n || p && d.key === " " || Zs.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
Bo.displayName = mo;
var nd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, a = Va(mo, n), i = Zu(n), l = S.useRef(null), u = He(t, l), [c, d] = S.useState(!1), [p, h] = S.useState("");
    return S.useEffect(() => {
      const m = l.current;
      m && h((m.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ f(
      br.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: /* @__PURE__ */ f(qw, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ f(
          $e.div,
          {
            role: "menuitem",
            "data-highlighted": c ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: u,
            onPointerMove: de(
              e.onPointerMove,
              vr((m) => {
                r ? a.onItemLeave(m) : (a.onItemEnter(m), m.defaultPrevented || m.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: de(
              e.onPointerLeave,
              vr((m) => a.onItemLeave(m))
            ),
            onFocus: de(e.onFocus, () => d(!0)),
            onBlur: de(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), Xk = "MenuCheckboxItem", rd = S.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ f(ld, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ f(
      Bo,
      {
        role: "menuitemcheckbox",
        "aria-checked": go(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": Za(n),
        onSelect: de(
          o.onSelect,
          () => r?.(go(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
rd.displayName = Xk;
var od = "MenuRadioGroup", [Qk, Jk] = ln(
  od,
  { value: void 0, onValueChange: () => {
  } }
), sd = S.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = Rt(r);
    return /* @__PURE__ */ f(Qk, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ f(qa, { ...o, ref: t }) });
  }
);
sd.displayName = od;
var ad = "MenuRadioItem", id = S.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Jk(ad, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ f(ld, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ f(
      Bo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": Za(s),
        onSelect: de(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
id.displayName = ad;
var Ga = "MenuItemIndicator", [ld, e0] = ln(
  Ga,
  { checked: !1 }
), cd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = e0(Ga, n);
    return /* @__PURE__ */ f(
      an,
      {
        present: r || go(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ f(
          $e.span,
          {
            ...o,
            ref: t,
            "data-state": Za(s.checked)
          }
        )
      }
    );
  }
);
cd.displayName = Ga;
var t0 = "MenuSeparator", ud = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(
      $e.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
ud.displayName = t0;
var n0 = "MenuArrow", dd = S.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = zo(n);
    return /* @__PURE__ */ f(Pu, { ...o, ...r, ref: t });
  }
);
dd.displayName = n0;
var r0 = "MenuSub", [HS, fd] = ln(r0), ir = "MenuSubTrigger", pd = S.forwardRef(
  (e, t) => {
    const n = cn(ir, e.__scopeMenu), r = Dr(ir, e.__scopeMenu), o = fd(ir, e.__scopeMenu), s = Va(ir, e.__scopeMenu), a = S.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, u = { __scopeMenu: e.__scopeMenu }, c = S.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return S.useEffect(() => c, [c]), S.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [i, l]), /* @__PURE__ */ f(Ya, { asChild: !0, ...u, children: /* @__PURE__ */ f(
      nd,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": gd(n.open),
        ...e,
        ref: Ro(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: de(
          e.onPointerMove,
          vr((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (s.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), c();
            }, 100));
          })
        ),
        onPointerLeave: de(
          e.onPointerLeave,
          vr((d) => {
            c();
            const p = n.content?.getBoundingClientRect();
            if (p) {
              const h = n.content?.dataset.side, m = h === "right", g = m ? -5 : 5, y = p[m ? "left" : "right"], v = p[m ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + g, y: d.clientY },
                  { x: y, y: p.top },
                  { x: v, y: p.top },
                  { x: v, y: p.bottom },
                  { x: y, y: p.bottom }
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
        onKeyDown: de(e.onKeyDown, (d) => {
          const p = s.searchRef.current !== "";
          e.disabled || p && d.key === " " || $k[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
pd.displayName = ir;
var hd = "MenuSubContent", md = S.forwardRef(
  (e, t) => {
    const n = Qu(nt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = cn(nt, e.__scopeMenu), a = Dr(nt, e.__scopeMenu), i = fd(hd, e.__scopeMenu), l = S.useRef(null), u = He(t, l);
    return /* @__PURE__ */ f(br.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(an, { present: r || s.open, children: /* @__PURE__ */ f(br.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(
      Ka,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...o,
        ref: u,
        align: "start",
        side: a.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (c) => {
          a.isUsingKeyboardRef.current && l.current?.focus(), c.preventDefault();
        },
        onCloseAutoFocus: (c) => c.preventDefault(),
        onFocusOutside: de(e.onFocusOutside, (c) => {
          c.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: de(e.onEscapeKeyDown, (c) => {
          a.onClose(), c.preventDefault();
        }),
        onKeyDown: de(e.onKeyDown, (c) => {
          const d = c.currentTarget.contains(c.target), p = zk[a.dir].includes(c.key);
          d && p && (s.onOpenChange(!1), i.trigger?.focus(), c.preventDefault());
        })
      }
    ) }) }) });
  }
);
md.displayName = hd;
function gd(e) {
  return e ? "open" : "closed";
}
function go(e) {
  return e === "indeterminate";
}
function Za(e) {
  return go(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function o0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function s0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function a0(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = s0(e, Math.max(s, 0));
  o.length === 1 && (a = a.filter((u) => u !== n));
  const l = a.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function i0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], u = i.x, c = i.y, d = l.x, p = l.y;
    c > r != p > r && n < (d - u) * (r - c) / (p - c) + u && (o = !o);
  }
  return o;
}
function l0(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return i0(n, t);
}
function vr(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var c0 = Xu, u0 = Ya, d0 = Ju, f0 = ed, p0 = qa, h0 = td, m0 = Bo, g0 = rd, y0 = sd, b0 = id, v0 = cd, w0 = ud, k0 = dd, x0 = pd, C0 = md, Ho = "DropdownMenu", [S0] = Yn(
  Ho,
  [Gu]
), Ye = Gu(), [T0, yd] = S0(Ho), bd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, l = Ye(t), u = S.useRef(null), [c, d] = La({
    prop: o,
    defaultProp: s ?? !1,
    onChange: a,
    caller: Ho
  });
  return /* @__PURE__ */ f(
    T0,
    {
      scope: t,
      triggerId: co(),
      triggerRef: u,
      contentId: co(),
      open: c,
      onOpenChange: d,
      onOpenToggle: S.useCallback(() => d((p) => !p), [d]),
      modal: i,
      children: /* @__PURE__ */ f(c0, { ...l, open: c, onOpenChange: d, dir: r, modal: i, children: n })
    }
  );
};
bd.displayName = Ho;
var vd = "DropdownMenuTrigger", wd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = yd(vd, n), a = Ye(n);
    return /* @__PURE__ */ f(u0, { asChild: !0, ...a, children: /* @__PURE__ */ f(
      $e.button,
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
        ref: Ro(t, s.triggerRef),
        onPointerDown: de(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: de(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
wd.displayName = vd;
var M0 = "DropdownMenuPortal", kd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ye(t);
  return /* @__PURE__ */ f(d0, { ...r, ...n });
};
kd.displayName = M0;
var xd = "DropdownMenuContent", Cd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = yd(xd, n), s = Ye(n), a = S.useRef(!1);
    return /* @__PURE__ */ f(
      f0,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: de(e.onCloseAutoFocus, (i) => {
          a.current || o.triggerRef.current?.focus(), a.current = !1, i.preventDefault();
        }),
        onInteractOutside: de(e.onInteractOutside, (i) => {
          const l = i.detail.originalEvent, u = l.button === 0 && l.ctrlKey === !0, c = l.button === 2 || u;
          (!o.modal || c) && (a.current = !0);
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
Cd.displayName = xd;
var E0 = "DropdownMenuGroup", D0 = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
    return /* @__PURE__ */ f(p0, { ...o, ...r, ref: t });
  }
);
D0.displayName = E0;
var N0 = "DropdownMenuLabel", R0 = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
    return /* @__PURE__ */ f(h0, { ...o, ...r, ref: t });
  }
);
R0.displayName = N0;
var A0 = "DropdownMenuItem", Sd = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
    return /* @__PURE__ */ f(m0, { ...o, ...r, ref: t });
  }
);
Sd.displayName = A0;
var P0 = "DropdownMenuCheckboxItem", L0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
  return /* @__PURE__ */ f(g0, { ...o, ...r, ref: t });
});
L0.displayName = P0;
var I0 = "DropdownMenuRadioGroup", O0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
  return /* @__PURE__ */ f(y0, { ...o, ...r, ref: t });
});
O0.displayName = I0;
var _0 = "DropdownMenuRadioItem", $0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
  return /* @__PURE__ */ f(b0, { ...o, ...r, ref: t });
});
$0.displayName = _0;
var z0 = "DropdownMenuItemIndicator", B0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
  return /* @__PURE__ */ f(v0, { ...o, ...r, ref: t });
});
B0.displayName = z0;
var H0 = "DropdownMenuSeparator", Td = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
  return /* @__PURE__ */ f(w0, { ...o, ...r, ref: t });
});
Td.displayName = H0;
var W0 = "DropdownMenuArrow", F0 = S.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
    return /* @__PURE__ */ f(k0, { ...o, ...r, ref: t });
  }
);
F0.displayName = W0;
var U0 = "DropdownMenuSubTrigger", Y0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
  return /* @__PURE__ */ f(x0, { ...o, ...r, ref: t });
});
Y0.displayName = U0;
var j0 = "DropdownMenuSubContent", V0 = S.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ye(n);
  return /* @__PURE__ */ f(
    C0,
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
V0.displayName = j0;
var K0 = bd, q0 = wd, G0 = kd, Z0 = Cd, X0 = Sd, Q0 = Td;
function Ms({
  ...e
}) {
  return /* @__PURE__ */ f(K0, { "data-slot": "dropdown-menu", ...e });
}
function Es({
  ...e
}) {
  return /* @__PURE__ */ f(
    q0,
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
  return /* @__PURE__ */ f(G0, { children: /* @__PURE__ */ f(
    Z0,
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
function Ie({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ f(
    X0,
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
function Ns({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    Q0,
    {
      "data-slot": "dropdown-menu-separator",
      className: ce("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var J0 = Object.freeze({
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
}), ex = "VisuallyHidden", Md = S.forwardRef(
  (e, t) => /* @__PURE__ */ f(
    $e.span,
    {
      ...e,
      ref: t,
      style: { ...J0, ...e.style }
    }
  )
);
Md.displayName = ex;
var tx = Md, [Wo] = Yn("Tooltip", [
  _o
]), Fo = _o(), Ed = "TooltipProvider", nx = 700, Xs = "tooltip.open", [rx, Xa] = Wo(Ed), Dd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = nx,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, a = S.useRef(!0), i = S.useRef(!1), l = S.useRef(0);
  return S.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ f(
    rx,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: S.useCallback(() => {
        window.clearTimeout(l.current), a.current = !1;
      }, []),
      onClose: S.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => a.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: S.useCallback((u) => {
        i.current = u;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
Dd.displayName = Ed;
var wr = "Tooltip", [ox, Nr] = Wo(wr), Nd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, l = Xa(wr, e.__scopeTooltip), u = Fo(t), [c, d] = S.useState(null), p = co(), h = S.useRef(0), m = a ?? l.disableHoverableContent, g = i ?? l.delayDuration, y = S.useRef(!1), [v, b] = La({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Xs))) : l.onClose(), s?.(D);
    },
    caller: wr
  }), w = S.useMemo(() => v ? y.current ? "delayed-open" : "instant-open" : "closed", [v]), E = S.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, y.current = !1, b(!0);
  }, [b]), x = S.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b(!1);
  }, [b]), M = S.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      y.current = !0, b(!0), h.current = 0;
    }, g);
  }, [g, b]);
  return S.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ f(Nu, { ...u, children: /* @__PURE__ */ f(
    ox,
    {
      scope: t,
      contentId: p,
      open: v,
      stateAttribute: w,
      trigger: c,
      onTriggerChange: d,
      onTriggerEnter: S.useCallback(() => {
        l.isOpenDelayedRef.current ? M() : E();
      }, [l.isOpenDelayedRef, M, E]),
      onTriggerLeave: S.useCallback(() => {
        m ? x() : (window.clearTimeout(h.current), h.current = 0);
      }, [x, m]),
      onOpen: E,
      onClose: x,
      disableHoverableContent: m,
      children: n
    }
  ) });
};
Nd.displayName = wr;
var Qs = "TooltipTrigger", Rd = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Nr(Qs, n), s = Xa(Qs, n), a = Fo(n), i = S.useRef(null), l = He(t, i, o.onTriggerChange), u = S.useRef(!1), c = S.useRef(!1), d = S.useCallback(() => u.current = !1, []);
    return S.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ f(Ru, { asChild: !0, ...a, children: /* @__PURE__ */ f(
      $e.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: de(e.onPointerMove, (p) => {
          p.pointerType !== "touch" && !c.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: de(e.onPointerLeave, () => {
          o.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: de(e.onPointerDown, () => {
          o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: de(e.onFocus, () => {
          u.current || o.onOpen();
        }),
        onBlur: de(e.onBlur, o.onClose),
        onClick: de(e.onClick, o.onClose)
      }
    ) });
  }
);
Rd.displayName = Qs;
var Qa = "TooltipPortal", [sx, ax] = Wo(Qa, {
  forceMount: void 0
}), Ad = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = Nr(Qa, t);
  return /* @__PURE__ */ f(sx, { scope: t, forceMount: n, children: /* @__PURE__ */ f(an, { present: n || s.open, children: /* @__PURE__ */ f(Ua, { asChild: !0, container: o, children: r }) }) });
};
Ad.displayName = Qa;
var On = "TooltipContent", Pd = S.forwardRef(
  (e, t) => {
    const n = ax(On, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, a = Nr(On, e.__scopeTooltip);
    return /* @__PURE__ */ f(an, { present: r || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ f(Ld, { side: o, ...s, ref: t }) : /* @__PURE__ */ f(ix, { side: o, ...s, ref: t }) });
  }
), ix = S.forwardRef((e, t) => {
  const n = Nr(On, e.__scopeTooltip), r = Xa(On, e.__scopeTooltip), o = S.useRef(null), s = He(t, o), [a, i] = S.useState(null), { trigger: l, onClose: u } = n, c = o.current, { onPointerInTransitChange: d } = r, p = S.useCallback(() => {
    i(null), d(!1);
  }, [d]), h = S.useCallback(
    (m, g) => {
      const y = m.currentTarget, v = { x: m.clientX, y: m.clientY }, b = dx(v, y.getBoundingClientRect()), w = fx(v, b), E = px(g.getBoundingClientRect()), x = mx([...w, ...E]);
      i(x), d(!0);
    },
    [d]
  );
  return S.useEffect(() => () => p(), [p]), S.useEffect(() => {
    if (l && c) {
      const m = (y) => h(y, c), g = (y) => h(y, l);
      return l.addEventListener("pointerleave", m), c.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", m), c.removeEventListener("pointerleave", g);
      };
    }
  }, [l, c, h, p]), S.useEffect(() => {
    if (a) {
      const m = (g) => {
        const y = g.target, v = { x: g.clientX, y: g.clientY }, b = l?.contains(y) || c?.contains(y), w = !hx(v, a);
        b ? p() : w && (p(), u());
      };
      return document.addEventListener("pointermove", m), () => document.removeEventListener("pointermove", m);
    }
  }, [l, c, a, u, p]), /* @__PURE__ */ f(Ld, { ...e, ref: s });
}), [lx, cx] = Wo(wr, { isInside: !1 }), ux = /* @__PURE__ */ mb("TooltipContent"), Ld = S.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, l = Nr(On, n), u = Fo(n), { onClose: c } = l;
    return S.useEffect(() => (document.addEventListener(Xs, c), () => document.removeEventListener(Xs, c)), [c]), S.useEffect(() => {
      if (l.trigger) {
        const d = (p) => {
          p.target?.contains(l.trigger) && c();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, c]), /* @__PURE__ */ f(
      Ia,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ A(
          Au,
          {
            "data-state": l.stateAttribute,
            ...u,
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
              /* @__PURE__ */ f(ux, { children: r }),
              /* @__PURE__ */ f(lx, { scope: n, isInside: !0, children: /* @__PURE__ */ f(tx, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Pd.displayName = On;
var Id = "TooltipArrow", Od = S.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Fo(n);
    return cx(
      Id,
      n
    ).isInside ? null : /* @__PURE__ */ f(Pu, { ...o, ...r, ref: t });
  }
);
Od.displayName = Id;
function dx(e, t) {
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
function fx(e, t, n = 5) {
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
function px(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function hx(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], u = i.x, c = i.y, d = l.x, p = l.y;
    c > r != p > r && n < (d - u) * (r - c) / (p - c) + u && (o = !o);
  }
  return o;
}
function mx(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), gx(t);
}
function gx(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], a = t[t.length - 2];
      if ((s.x - a.x) * (o.y - a.y) >= (s.y - a.y) * (o.x - a.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1], a = n[n.length - 2];
      if ((s.x - a.x) * (o.y - a.y) >= (s.y - a.y) * (o.x - a.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var yx = Dd, bx = Nd, vx = Rd, wx = Ad, kx = Pd, xx = Od;
function Cx({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ f(
    yx,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Js({
  ...e
}) {
  return /* @__PURE__ */ f(Cx, { children: /* @__PURE__ */ f(bx, { "data-slot": "tooltip", ...e }) });
}
function ea({
  ...e
}) {
  return /* @__PURE__ */ f(vx, { "data-slot": "tooltip-trigger", ...e });
}
function ta({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ f(wx, { children: /* @__PURE__ */ A(
    kx,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: ce(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ f(xx, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const Ee = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ A(Js, { children: [
    /* @__PURE__ */ f(ea, { asChild: !0, children: s }),
    /* @__PURE__ */ f(ta, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, Cn = () => /* @__PURE__ */ f("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Sx = zn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const l = V(null), [u, c] = j(!1), [d, p] = j(void 0), h = Fl({
    editor: t,
    selector: ({ editor: M }) => ({
      canUndo: M.can().undo(),
      canRedo: M.can().redo(),
      isBold: M.isActive("bold"),
      isItalic: M.isActive("italic"),
      isUnderline: M.isActive("underline"),
      isStrike: M.isActive("strike"),
      isCode: M.isActive("code"),
      isHighlight: M.isActive("highlight"),
      isH1: M.isActive("heading", { level: 1 }),
      isH2: M.isActive("heading", { level: 2 }),
      isH3: M.isActive("heading", { level: 3 }),
      isBlockquote: M.isActive("blockquote"),
      isBulletList: M.isActive("bulletList"),
      isOrderedList: M.isActive("orderedList"),
      isTaskList: M.isActive("taskList"),
      isCodeBlock: M.isActive("codeBlock"),
      isLink: M.isActive("link")
    })
  }), m = F(() => {
    const { view: M } = t, { from: D } = M.state.selection, C = M.coordsAtPos(D);
    p({ top: C.bottom + 8, left: C.left }), c(!0);
  }, [t]), g = F((M, D) => {
    t.chain().focus().setImage({ src: M, alt: D }).run(), c(!1);
  }, [t]), y = F(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = F((M) => {
    t.chain().focus().insertCallout({ type: M }).run();
  }, [t]), b = V(/* @__PURE__ */ new Map()), w = V(/* @__PURE__ */ new Map()), E = F((M) => {
    const { doc: D, tr: C } = M.state;
    let T = !1;
    const k = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), R = M.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    b.current.clear(), R.forEach((L, I) => {
      L.querySelectorAll(":scope > li").forEach((H) => {
        const K = H, P = (K.textContent || "").trim().substring(0, 50);
        b.current.set(`${I}-${P}`, K.getBoundingClientRect());
      });
    });
    const N = [];
    D.descendants((L, I, _, H) => {
      if (!k.has(L.type.name)) return !0;
      let K = !1;
      if (L.forEach((B) => {
        B.type.name === "taskItem" && (K = !0);
      }), !K) return !0;
      let P = 0;
      return D.nodesBetween(0, I, (B) => (k.has(B.type.name) && P++, !0)), N.push({ node: L, pos: I, depth: P }), !0;
    }), N.sort((L, I) => I.depth - L.depth);
    for (const { node: L, pos: I } of N) {
      const _ = [];
      let H = 0;
      L.forEach(($) => {
        _.push({
          node: $,
          isTask: $.type.name === "taskItem",
          checked: $.type.name === "taskItem" && $.attrs.checked === !0,
          originalIndex: H++
        });
      });
      const K = _.filter(($) => $.isTask && !$.checked), P = _.filter(($) => $.isTask && $.checked), B = [..._], ne = _.map(($, W) => ({ index: W, isTask: $.isTask })).filter(($) => $.isTask).map(($) => $.index), ae = [...K, ...P];
      if (ne.forEach(($, W) => {
        B[$] = ae[W];
      }), !B.some(($, W) => $.node !== _[W].node)) continue;
      const re = L.type.create(
        L.attrs,
        B.map(($) => $.node)
      ), ie = C.mapping.map(I);
      C.replaceWith(ie, ie + L.nodeSize, re), T = !0;
    }
    T && (M.view.dispatch(C), requestAnimationFrame(() => {
      M.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((I) => {
        const _ = I.querySelectorAll(":scope > li"), H = /* @__PURE__ */ new Map();
        b.current.forEach((K, P) => {
          const B = P.replace(/^\d+-/, "");
          H.set(B, K);
        }), _.forEach((K) => {
          const P = K, B = (P.textContent || "").trim().substring(0, 50), ne = H.get(B);
          if (!ne) return;
          const ae = P.getBoundingClientRect(), oe = ne.top - ae.top;
          if (Math.abs(oe) < 2) return;
          P.style.transform = `translateY(${oe}px)`, P.style.transition = "none", P.style.zIndex = "1", P.offsetHeight, P.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", P.style.transform = "translateY(0)";
          const re = () => {
            P.style.transform = "", P.style.transition = "", P.style.zIndex = "", P.removeEventListener("transitionend", re);
          };
          P.addEventListener("transitionend", re), setTimeout(re, 400);
        });
      });
    }));
  }, []);
  G(() => {
    if (!s || !t) return;
    const M = /* @__PURE__ */ new Map();
    t.state.doc.descendants((C, T) => (C.type.name === "taskItem" && M.set(T, C.attrs.checked === !0), !0)), w.current = M;
    const D = ({ transaction: C }) => {
      if (!C.docChanged) return;
      const T = /* @__PURE__ */ new Map();
      t.state.doc.descendants((N, L) => (N.type.name === "taskItem" && T.set(L, N.attrs.checked === !0), !0));
      const k = w.current;
      let R = !1;
      if (k.size > 0 && T.size > 0) {
        let N = 0, L = 0;
        k.forEach((I) => {
          I && N++;
        }), T.forEach((I) => {
          I && L++;
        }), N !== L && (R = !0);
      }
      w.current = T, R && setTimeout(() => {
        E(t);
      }, 150);
    };
    return t.on("transaction", D), () => {
      t.off("transaction", D);
    };
  }, [t, s, E]);
  const x = F(() => {
    E(t);
  }, [t, E]);
  return /* @__PURE__ */ A("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide ${o}`, children: [
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !h?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ f(bp, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !h?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ f(vp, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Cn, {}),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: h?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ f(ua, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: h?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ f(da, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: h?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ f(fa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: h?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ f(pa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: h?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ f(jl, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: h?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ f(Vl, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => r?.(),
        isActive: h?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ f(ha, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Cn, {}),
    /* @__PURE__ */ A(Ms, { children: [
      /* @__PURE__ */ f(Es, { asChild: !0, children: /* @__PURE__ */ A(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${h?.isH1 || h?.isH2 || h?.isH3 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ f("span", { className: "min-w-[18px] text-center", children: h?.isH1 ? "H1" : h?.isH2 ? "H2" : h?.isH3 ? "H3" : "P" }),
            /* @__PURE__ */ f(Ut, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(Ds, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !h?.isH1 && !h?.isH2 && !h?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: h?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: h?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: h?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f(Cn, {}),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: h?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ f(ga, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: h?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ f(ya, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: h?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ f(ba, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: h?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ f(ma, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: h?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ f(Xl, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ f(wp, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ f(kp, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Cn, {}),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ f(Os, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: m,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ f(ka, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ f(Ql, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(Ms, { children: [
      /* @__PURE__ */ f(Es, { asChild: !0, children: /* @__PURE__ */ f(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ f(lo, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ A(Ds, { align: "start", children: [
        /* @__PURE__ */ A(Ie, { onClick: () => v("info"), children: [
          /* @__PURE__ */ f(lo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ A(Ie, { onClick: () => v("note"), children: [
          /* @__PURE__ */ f(wa, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ A(Ie, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ f(xp, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ A(Ie, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ f(Cp, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ A(Ie, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ f(va, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ A(Ms, { children: [
      /* @__PURE__ */ f(Es, { asChild: !0, children: /* @__PURE__ */ A(
        Ft,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ f(Os, { size: 16 }),
            /* @__PURE__ */ f("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(Ds, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ f(ki, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ f(ki, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ f(Tn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ f(Ns, {}),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ f(xi, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ f(xi, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ f(Tn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ f(Ns, {}),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ f(Ci, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ f(Ci, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ f(Ns, {}),
        /* @__PURE__ */ A(
          Ie,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ f(Tn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f(
      eu,
      {
        isOpen: u,
        onClose: () => c(!1),
        onInsert: g,
        position: d
      }
    ),
    /* @__PURE__ */ f(Cn, {}),
    /* @__PURE__ */ f(
      Ee,
      {
        onClick: x,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ f(Sp, { size: 16 })
      }
    ),
    a && /* @__PURE__ */ A(Pe, { children: [
      /* @__PURE__ */ f(Cn, {}),
      /* @__PURE__ */ A(Js, { children: [
        /* @__PURE__ */ f(ea, { asChild: !0, children: /* @__PURE__ */ f(
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
            children: /* @__PURE__ */ f(Mo, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ f(ta, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ A(Js, { children: [
      /* @__PURE__ */ f(ea, { asChild: !0, children: /* @__PURE__ */ A(
        Ft,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ f(Hn, { size: 16 }),
            /* @__PURE__ */ f("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ f(ta, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function Tx({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: l }) {
  const u = s === "markdown", [c, d] = j(""), [p, h] = j(""), [m, g] = j(!1), [y, v] = j(!1), [b, w] = j(!1), [E, x] = j(!1), [M, D] = j([]), [C, T] = j(0), [k, R] = j(null), [N, L] = j(!1), I = V(!1), _ = V(null), H = V(null), K = V(!1);
  G(() => {
    t && o && o.trim() && d(o);
  }, [t, o, r]);
  const P = F(() => {
    if (!c || !e) {
      D([]), T(0), R(null);
      return;
    }
    const $ = [];
    let W;
    try {
      if (y)
        W = new RegExp(c, m ? "g" : "gi");
      else {
        let Y = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        b && (Y = `\\b${Y}\\b`), W = new RegExp(Y, m ? "g" : "gi");
      }
      R(null);
    } catch (Y) {
      R(Y.message), D([]);
      return;
    }
    if (u) {
      let Y;
      for (; (Y = W.exec(a)) !== null; )
        $.push({
          from: Y.index,
          to: Y.index + Y[0].length,
          text: Y[0]
        });
    } else {
      const { doc: Y } = e.state;
      Y.descendants((Q, pe) => {
        if (Q.isText && Q.text) {
          let be;
          for (; (be = W.exec(Q.text)) !== null; )
            $.push({
              from: pe + be.index,
              to: pe + be.index + be[0].length,
              text: be[0]
            });
        }
        return !0;
      });
    }
    D($), $.length > 0 && C >= $.length && T(0);
  }, [c, m, y, b, e, C, u, a]);
  G(() => {
    P();
  }, [P]), G(() => {
    u && l && (t && M.length > 0 ? l(M, C) : l([], 0));
  }, [u, t, M, C, l]), G(() => {
    if (!e) return;
    if (u) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const $ = typeof e.commands.setSearchHighlight == "function";
    t && c && $ ? e.commands.setSearchHighlight({
      searchTerm: c,
      caseSensitive: m,
      useRegex: y,
      currentMatchIndex: C
    }) : $ && e.commands.clearSearchHighlight();
  }, [e, t, c, m, y, C, u, M, a]), G(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), I.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), L(!1)), I.current = !1);
  }, [t, e, l]), G(() => {
    if (M.length > 0 && C < M.length) {
      const $ = M[C];
      if (u) {
        const Y = document.querySelector(".syntax-textarea");
        if (Y && K.current) {
          const Q = parseInt(getComputedStyle(Y).lineHeight) || 22, be = a.substring(0, $.from).split(`
`).length;
          Y.scrollTop = Math.max(0, (be - 3) * Q);
        }
        K.current && (K.current = !1);
        return;
      }
      const W = e.view.domAtPos($.from);
      W.node && W.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), K.current && (K.current = !1);
    }
  }, [C, M, e, u, a]), G(() => {
    t && _.current && (_.current.focus(), _.current.select());
  }, [t, r]);
  const B = F(() => {
    M.length !== 0 && (K.current = !0, T(($) => ($ + 1) % M.length));
  }, [M.length]), ne = F(() => {
    M.length !== 0 && (K.current = !0, T(($) => ($ - 1 + M.length) % M.length));
  }, [M.length]), ae = F(() => {
    if (M.length === 0 || C >= M.length) return;
    const $ = M[C];
    if (u && i) {
      const W = a.substring(0, $.from) + p + a.substring($.to);
      i(W), setTimeout(P, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(p).run(), setTimeout(P, 10);
  }, [M, C, p, e, P, u, a, i]), oe = F(() => {
    if (M.length === 0) return;
    if (u && i) {
      const W = [...M].sort((Q, pe) => pe.from - Q.from);
      let Y = a;
      W.forEach((Q) => {
        Y = Y.substring(0, Q.from) + p + Y.substring(Q.to);
      }), i(Y), setTimeout(P, 10);
      return;
    }
    const $ = [...M].sort((W, Y) => Y.from - W.from);
    e.chain().focus(), $.forEach((W) => {
      e.chain().setTextSelection({ from: W.from, to: W.to }).deleteSelection().insertContent(p).run();
    }), setTimeout(P, 10);
  }, [M, p, e, P, u, a, i]), re = F(() => {
    if (M.length === 0 || !c || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: c,
      caseSensitive: m,
      useRegex: y,
      wholeWord: b
    }) && (L(!0), I.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [M, c, m, y, b, e, n]), ie = F(($) => {
    $.key === "Enter" ? ($.preventDefault(), $.shiftKey ? ne() : B(), _.current?.focus()) : $.key === "Escape" ? ($.preventDefault(), n()) : $.key === "h" && ($.ctrlKey || $.metaKey) ? ($.preventDefault(), x((W) => !W)) : $.key === "l" && ($.ctrlKey || $.metaKey) && $.shiftKey && ($.preventDefault(), re());
  }, [B, ne, n, re]);
  return t ? /* @__PURE__ */ A(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: ie,
      children: [
        /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ f(Tp, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: _,
                type: "text",
                placeholder: "Find...",
                value: c,
                onChange: ($) => d($.target.value),
                className: `find-replace-input ${k ? "has-error" : ""}`
              }
            ),
            k && /* @__PURE__ */ f("span", { className: "find-replace-error", title: k, children: "!" })
          ] }),
          /* @__PURE__ */ f("span", { className: "find-replace-count", children: M.length > 0 ? `${C + 1} of ${M.length}` : c ? "No results" : "" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: ne,
              disabled: M.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ f(Mp, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: B,
              disabled: M.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ f(Ut, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: re,
              disabled: M.length === 0,
              className: `find-replace-btn ${N ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${M.length} matches`,
              children: /* @__PURE__ */ f(Ep, { size: 16 })
            }
          ),
          /* @__PURE__ */ f("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => g(($) => !$),
              className: `find-replace-btn ${m ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ f(Dp, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => w(($) => !$),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ f(Np, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => v(($) => !$),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ f(Rp, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => x(($) => !$),
              className: `find-replace-btn ${E ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ f(_s, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ f(Nt, { size: 16 })
            }
          )
        ] }),
        E && /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ f(_s, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: H,
                type: "text",
                placeholder: "Replace with...",
                value: p,
                onChange: ($) => h($.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: ae,
              disabled: M.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ A(
            "button",
            {
              onClick: oe,
              disabled: M.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ f(Ap, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const Mx = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), St = Mx ? "⌘" : "Ctrl", Ex = ({ editor: e }) => {
  const [t, n] = j(!1), [r, o] = j(0), [s, a] = j(0), [i, l] = j(""), [u, c] = j(""), [d, p] = j(!1), [h, m] = j(!1);
  G(() => {
    if (!e) return;
    const D = () => {
      const T = e.storage.selectAllOccurrences;
      T ? (n(T.isActive), o(T.ranges.length), a(T.allMatches.length), l(T.searchTerm), c(T.typedBuffer), p(T.isTypingReplace), m(T.isIncremental)) : (n(!1), o(0), a(0));
    }, C = () => {
      D();
    };
    return e.on("transaction", C), D(), () => {
      e.off("transaction", C);
    };
  }, [e]);
  const g = F(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = F(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), v = F(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), b = F(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), w = F(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), E = F(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), x = F(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), M = F(() => {
    i && (e.commands.selectAllOccurrences({
      searchTerm: i,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, i]);
  return !t || r === 0 ? null : /* @__PURE__ */ A("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ A("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ A("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-count-number", children: h && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ A(Pe, { children: [
        /* @__PURE__ */ f(Eo, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-old", children: i }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-new", children: u || "∅" })
      ] }) : /* @__PURE__ */ f(Pe, { children: /* @__PURE__ */ A("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        i,
        '"'
      ] }) }) }),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" }),
      h && r < s && /* @__PURE__ */ A(Pe, { children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: x,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${St}+D)`,
            children: /* @__PURE__ */ f(Ca, { size: 14 })
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: M,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${St}+Shift+L)`,
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
          title: `Bold all occurrences (${St}+B)`,
          children: /* @__PURE__ */ f(ua, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${St}+I)`,
          children: /* @__PURE__ */ f(da, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${St}+U)`,
          children: /* @__PURE__ */ f(fa, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ f(pa, { size: 14 })
        }
      ),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ f(Tn, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: E,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ f(Nt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "select-all-action-bar-hint", children: h && r < s ? /* @__PURE__ */ A(Pe, { children: [
      /* @__PURE__ */ A("kbd", { children: [
        St,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ A("kbd", { children: [
        St,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ f("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ A("kbd", { children: [
        St,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ A(Pe, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ f("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ f("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ A("kbd", { children: [
        St,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, Dx = zn(Ex), Qr = "-dismissed";
function Nx(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Rx(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: a
  } = t, [i, l] = j({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), u = V(null), c = V(""), d = V(0);
  G(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const v = localStorage.getItem(n), b = localStorage.getItem(n + Qr);
        if (v && !b) {
          let w = "";
          try {
            w = e.getHTML() || "";
          } catch {
            return;
          }
          v !== w && v.length > 50 && l((E) => ({ ...E, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, o]);
  const p = F(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const v = e.getHTML(), b = Nx(v);
        if (b === d.current && v.length === c.current.length) {
          l((w) => ({ ...w, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        l((w) => ({ ...w, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), c.current = v, d.current = b, l((w) => ({
          ...w,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(v), setTimeout(() => {
          l((w) => w.status === "saved" ? { ...w, status: "idle" } : w);
        }, 2e3);
      } catch (v) {
        console.error("useAutoSave: Error saving content", v), l((b) => ({
          ...b,
          status: "error",
          error: v instanceof Error ? v.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  G(() => {
    if (!e || !o || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        p();
      }, r));
    };
    return e.on("update", v), () => {
      e.off("update", v), u.current && clearTimeout(u.current);
    };
  }, [e, r, o, p]), G(() => {
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
  const h = F(() => {
    u.current && clearTimeout(u.current), p();
  }, [p]), m = F(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Qr), c.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (v) {
      console.warn("useAutoSave: Error clearing content", v);
    }
  }, [n]), g = F(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const v = localStorage.getItem(n);
      return v && e && !e.isDestroyed ? (l((b) => ({ ...b, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), c.current = v, localStorage.removeItem(n + Qr), a?.(v);
          } catch (b) {
            console.warn("useAutoSave: Error setting content during recovery", b);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, a]), y = F(() => {
    try {
      localStorage.setItem(n + Qr, "true"), l((v) => ({ ...v, hasRecoverableContent: !1 }));
    } catch (v) {
      console.warn("useAutoSave: Error dismissing recovery", v);
    }
  }, [n]);
  return {
    ...i,
    save: h,
    clear: m,
    recover: g,
    dismissRecovery: y
  };
}
const Ax = 200;
function Px(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: r = !1,
    enabled: o = !0
  } = t, [s, a] = j({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), i = V(null), l = V(""), u = F((c) => {
    const d = c.trim(), p = d.length > 0 ? d.split(/\s+/).filter((b) => b.length > 0).length : 0, h = d.replace(/\s/g, "").length, m = c.length;
    let g = 0, y = 0;
    r && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((b) => b.trim().length > 0).length : 0, y = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(p / Ax));
    return {
      words: p,
      characters: h,
      charactersWithSpaces: m,
      paragraphs: g,
      sentences: y,
      readingTime: v,
      isCalculating: !1
    };
  }, [r]);
  return G(() => {
    if (!e || !o) return;
    const c = () => {
      i.current && clearTimeout(i.current), a((d) => ({ ...d, isCalculating: !0 })), i.current = setTimeout(() => {
        try {
          const d = e.getText();
          if (d === l.current) {
            a((h) => ({ ...h, isCalculating: !1 }));
            return;
          }
          l.current = d;
          const p = u(d);
          a(p);
        } catch (d) {
          console.warn("useWordCount: Error calculating word count", d), a((p) => ({ ...p, isCalculating: !1 }));
        }
      }, n);
    };
    return c(), e.on("update", c), () => {
      e.off("update", c), i.current && clearTimeout(i.current);
    };
  }, [e, n, o, u]), s;
}
function Lx({ status: e, lastSaved: t, className: n = "" }) {
  const r = (o) => {
    if (!o) return "";
    const a = (/* @__PURE__ */ new Date()).getTime() - o.getTime(), i = Math.floor(a / 1e3), l = Math.floor(i / 60), u = Math.floor(l / 60);
    return i < 10 ? "Just now" : i < 60 ? `${i}s ago` : l < 60 ? `${l}m ago` : u < 24 ? `${u}h ago` : o.toLocaleDateString();
  };
  return /* @__PURE__ */ A(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ A(Pe, { children: [
          /* @__PURE__ */ f(Pp, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ A("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ A(Pe, { children: [
          /* @__PURE__ */ f(Jl, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ f("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ A(Pe, { children: [
          /* @__PURE__ */ f(Bn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ f("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ A(Pe, { children: [
          /* @__PURE__ */ f(Lp, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ f("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function Ix({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ A(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ f(Ip, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ f("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ f(Sa, { className: "w-4 h-4" }),
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
              children: /* @__PURE__ */ f(Nt, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
const Ox = /\[\[([^\[\]]+)\]\]$/, _x = Yf.create({
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
      $n(
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
      new Ke({
        find: Ox,
        handler: ({ state: e, range: t, match: n, chain: r }) => {
          try {
            const o = n[1];
            if (!o) return;
            const s = t.from, a = t.to;
            r().deleteRange({ from: s, to: a }).insertContentAt(s, {
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
}), Tt = {
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
  // Callout pattern: ```info, ```note, ```prompt, ```resources, ```todo
  callout: /```(?:info|note|prompt|resources|todo)\s*\n[\s\S]*?```/
}, xl = ["info", "note", "prompt", "resources", "todo"];
function $x(e) {
  return e.length < 3 ? !1 : !!(Tt.header.test(e) || Tt.bold.test(e) || Tt.list.test(e) || Tt.taskList.test(e) || Tt.codeBlock.test(e) || Tt.callout.test(e) || Tt.highlight.test(e) || Tt.link.test(e) || Tt.table.test(e));
}
function zx(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((i) => i.trim()).filter((i) => i.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let a = "<table><thead><tr>";
  for (const i of r)
    a += "<th><p>" + i + "</p></th>";
  a += "</tr></thead><tbody>";
  for (const i of s) {
    if (!i.trim()) continue;
    const l = i.split("|"), u = [];
    for (let c = 0; c < l.length; c++) {
      const d = l[c].trim();
      c === 0 && d === "" && i.trim().startsWith("|") || c === l.length - 1 && d === "" && i.trim().endsWith("|") || u.push(d);
    }
    if (u.length !== 0) {
      a += "<tr>";
      for (let c = 0; c < r.length; c++) {
        const d = u[c] || "";
        a += "<td><p>" + d + "</p></td>";
      }
      a += "</tr>";
    }
  }
  return a += "</tbody></table>", a;
}
function Bx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (a) => {
    const i = a.split(`
`);
    if (i.length >= 2) {
      const l = i[1];
      if (/^\|?[\s\-:|]+\|?$/.test(l) && l.includes("-")) {
        const u = zx(a);
        if (u) {
          const c = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(u), c;
        }
      }
    }
    return a;
  }), xl.forEach((a) => {
    const i = new RegExp(`\`\`\`${a}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(i, (l, u) => {
      let c = u.trim();
      return c = c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), c = c.replace(/__([^_]+)__/g, "<strong>$1</strong>"), c = c.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), c = c.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), c = c.replace(/`([^`]+)`/g, "<code>$1</code>"), c.startsWith("<") || (c = `<p>${c}</p>`), `<div data-callout="" data-type="${a}" class="callout callout-${a}">${c}</div>`;
    });
  }), t = t.replace(/```(\w*)\n([\s\S]*?)```/g, (a, i, l) => {
    if (xl.includes(i))
      return `<div data-callout="" data-type="${i}" class="callout callout-${i}"><p>${l.trim()}</p></div>`;
    const u = i || "plaintext", c = l.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<pre><code class="language-${u}">${c}</code></pre>`;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/^(#{1,6})\s+(.+)$/gm, (a, i, l) => {
    const u = i.length;
    return `<h${u}>${l}</h${u}>`;
  }), t = t.replace(/^(\s*)[-*]\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s+(?!\[)(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/^(\s*)\d+\.\s+(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/(<li data-type="taskItem"[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul data-type="taskList">$&</ul>'), t = t.replace(/(<li><p>[\s\S]*?<\/p><\/li>\n?)+/g, "<ul>$&</ul>"), t = t.replace(/^>\s+(.+)$/gm, "<blockquote><p>$1</p></blockquote>"), t = t.replace(/^[-*_]{3,}$/gm, "<hr>"), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*?)\s*\|\s*(\d+)\]\(([^)]+)\)/g, '<img src="$3" alt="$1" width="$2" style="width: $2px">'), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">'), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((a) => {
    const i = a.trim();
    return i ? /^<[a-z]/.test(i) || /^<\//.test(i) || i.startsWith("MANUSTABLEPLACEHOLDER") ? a : `<p>${i}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let a = 0; a < r.length; a++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${a}END`, r[a]);
  return t;
}
const Hx = gt.create({
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
        key: new Ve("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const a = o.getData("text/plain");
            if (!a || !$x(a))
              return !1;
            n.preventDefault();
            const i = Bx(a);
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
}), Cl = new Ve("collapsibleHeading");
function yo(e, t, n) {
  return `h${t}-${n}-${e.textContent.slice(0, 50)}`;
}
let Pn = null;
function Rs(e, t, n) {
  const r = [], o = [];
  e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const c = yo(l, l.attrs.level, u);
      o.push({
        pos: u,
        level: l.attrs.level,
        id: c,
        isCollapsed: t.collapsedHeadings.has(c),
        nodeSize: l.nodeSize
      });
    }
  });
  const s = [];
  for (let l = 0; l < o.length; l++) {
    const u = o[l];
    if (u.isCollapsed) {
      const c = u.pos + u.nodeSize;
      let d = e.content.size;
      for (let p = l + 1; p < o.length; p++)
        if (o[p].level <= u.level) {
          d = o[p].pos;
          break;
        }
      c < d && s.push({ start: c, end: d });
    }
  }
  const a = [];
  for (const l of s)
    if (a.length === 0)
      a.push(l);
    else {
      const u = a[a.length - 1];
      l.start <= u.end ? u.end = Math.max(u.end, l.end) : a.push(l);
    }
  function i(l) {
    for (const u of a)
      if (l >= u.start && l < u.end) return !0;
    return !1;
  }
  return e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const c = yo(l, l.attrs.level, u), d = t.collapsedHeadings.has(c), p = i(u);
      r.push(
        at.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${d ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": c,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const h = at.widget(u + l.nodeSize - 1, () => {
        const m = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${c}"]`);
        if (m) {
          m.classList.contains("collapsed") !== d && (m.classList.remove("collapsed", "expanded"), m.classList.add(d ? "collapsed" : "expanded"), m.title = d ? "Click to expand" : "Click to collapse");
          const b = m.parentElement;
          if (b) return b;
        }
        const g = document.createElement("span");
        g.className = "collapsible-heading-chevron-wrapper", g.setAttribute("contenteditable", "false");
        const y = document.createElement("button");
        return y.className = `collapsible-heading-chevron ${d ? "collapsed" : "expanded"}`, y.setAttribute("data-heading-id", c), y.setAttribute("data-heading-level", String(l.attrs.level)), y.setAttribute("contenteditable", "false"), y.setAttribute("tabindex", "-1"), y.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', y.title = d ? "Click to expand" : "Click to collapse", y.addEventListener("click", (v) => {
          v.preventDefault(), v.stopPropagation();
          const b = y.classList.contains("collapsed");
          y.classList.remove("collapsed", "expanded"), y.classList.add(b ? "expanded" : "collapsed"), y.title = b ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(c) ? t.collapsedHeadings.delete(c) : t.collapsedHeadings.add(c), Pn && Pn.dispatch(Pn.state.tr.setMeta("collapsibleHeading", { toggled: c }));
        }), g.appendChild(y), g;
      }, { side: 1, key: `chevron-${c}` });
      r.push(h);
    } else l.isBlock && i(u) && r.push(
      at.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Ze.create(e, r);
}
const Wx = gt.create({
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
        const s = yo(o, o.attrs.level, e);
        return r.collapsedHeadings.has(s) ? r.collapsedHeadings.delete(s) : r.collapsedHeadings.add(s), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: s })), !0;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          o.type.name === "heading" && n.collapsedHeadings.add(yo(o, o.attrs.level, s));
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new je({
        key: Cl,
        view(n) {
          return Pn = n, {
            update(r) {
              Pn = r;
            },
            destroy() {
              Pn = null;
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
            return n.getMeta("collapsibleHeading") || n.docChanged ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Rs(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Cl.getState(n);
            return r?.decorations ? r.decorations : Rs(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Fx = /\[([^\]]+)\]\(([^)]+)\)$/, Ux = /^(https?:\/\/|www\.)[^\s]+$/i, Yx = gt.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Ke({
        find: Fx,
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
        key: new Ve("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!Ux.test(s)) return !1;
            const { state: a } = t, { selection: i } = a, { from: l, to: u, empty: c } = i;
            let d = s;
            if (!d.startsWith("http://") && !d.startsWith("https://") && (d.startsWith("www."), d = "https://" + d), !c && a.doc.textBetween(l, u))
              return e.chain().focus().extendMarkRange("link").setLink({ href: d }).run(), !0;
            const p = a.schema.marks.link.create({ href: d }), h = a.tr;
            return h.insertText(d, l, u), h.addMark(l, l + d.length, p), t.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), jx = ["info", "note", "prompt", "resources", "todo"], Vx = gt.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new je({
        key: new Ve("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: a } = o, i = a.start();
            a.end();
            const l = s.textBetween(i, a.pos, ""), u = l.trim();
            for (const c of jx)
              if (u === `\`\`\`${c}`) {
                n.preventDefault();
                const d = r.tr, p = i + l.indexOf("```");
                d.delete(p, a.pos);
                const h = e.schema.nodes.callout, m = e.schema.nodes.paragraph;
                if (h && m) {
                  const g = m.create(), y = h.create({ type: c }, Xp.from(g));
                  d.insert(p, y);
                  const v = d.doc.resolve(p + 2);
                  d.setSelection(la.near(v)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Jr = new Ve("searchHighlight"), Kx = gt.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Jr, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Jr, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new je({
        key: Jr,
        state: {
          init() {
            return Ze.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: l } = e, u = t.getMeta(Jr), c = t.docChanged;
            if (!s)
              return Ze.empty;
            if (!c && !u)
              return n.map(t.mapping, o.doc);
            const d = [];
            let p = 0;
            try {
              let h;
              if (i)
                h = new RegExp(s, a ? "g" : "gi");
              else {
                const m = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                h = new RegExp(m, a ? "g" : "gi");
              }
              o.doc.descendants((m, g) => {
                if (m.isText && m.text) {
                  let y;
                  for (; (y = h.exec(m.text)) !== null; ) {
                    const v = g + y.index, b = g + y.index + y[0].length, w = p === l;
                    d.push(
                      at.inline(v, b, {
                        class: w ? "search-highlight-current" : "search-highlight"
                      })
                    ), p++;
                  }
                }
                return !0;
              });
            } catch {
              return Ze.empty;
            }
            return Ze.create(o.doc, d);
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
}), qx = new Ve("tabIndent");
function Gx(e) {
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
const Zx = gt.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new je({
        key: qx,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = Gx(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Si(s)(n, r)) {
                const l = o === "taskItem" ? "listItem" : "taskItem", u = n.schema.nodes[l];
                u && Si(u)(n, r);
              }
            } else if (!Ti(s)(n, r)) {
              const l = o === "taskItem" ? "listItem" : "taskItem", u = n.schema.nodes[l];
              u && Ti(u)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), _e = new Ve("selectAllOccurrences");
function Sl(e, t, n, r, o) {
  const s = [];
  if (!t) return s;
  let a;
  try {
    if (r)
      a = new RegExp(t, n ? "g" : "gi");
    else {
      let i = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      o && (i = `\\b${i}\\b`), a = new RegExp(i, n ? "g" : "gi");
    }
  } catch {
    return s;
  }
  return e.descendants((i, l) => {
    if (i.isText && i.text) {
      let u;
      for (; (u = a.exec(i.text)) !== null; )
        s.push({
          from: l + u.index,
          to: l + u.index + u[0].length,
          text: u[0]
        });
    }
    return !0;
  }), s;
}
function Ht(e, t) {
  const n = _e.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function Xx(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Ae(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Qx = gt.create({
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
          useRegex: a = !1,
          wholeWord: i = !1
        } = e;
        if (!o) return !1;
        const l = Sl(t.state.doc, o, s, a, i);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = a, this.storage.wholeWord = i, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(_e, { activate: !0 })), !0);
      },
      /**
       * Select the next occurrence incrementally (Cmd+D behavior).
       * First call: selects the word under cursor or current selection.
       * Subsequent calls: add the next match to the selection.
       */
      selectNextOccurrence: () => ({ editor: e, tr: t, dispatch: n }) => {
        const r = this.storage;
        if (!r.isActive) {
          const { state: o } = e, { from: s, to: a } = o.selection;
          let i = "";
          if (s !== a)
            i = o.doc.textBetween(s, a, "");
          else {
            const d = o.doc.resolve(s), p = d.parent;
            if (p.isTextblock) {
              const h = p.textContent, m = d.parentOffset;
              let g = m, y = m;
              for (; g > 0 && /\w/.test(h[g - 1]); ) g--;
              for (; y < h.length && /\w/.test(h[y]); ) y++;
              g < y && (i = h.slice(g, y));
            }
          }
          if (!i) return !1;
          const l = Sl(o.doc, i, !1, !1, !1);
          if (l.length === 0) return !1;
          const u = Xx(l, s), c = l[u];
          return r.isActive = !0, r.ranges = [c], r.searchTerm = i, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = i.length, r.allMatches = l, r.nextMatchIndex = (u + 1) % l.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(_e, { activate: !0 })), setTimeout(() => {
            try {
              const d = e.view.domAtPos(c.from);
              d.node && d.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0;
        }
        if (r.isIncremental && r.allMatches.length > 0) {
          const o = r.nextMatchIndex, s = r.allMatches[o];
          return r.ranges.some(
            (i) => i.from === s.from && i.to === s.to
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(_e, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Ae(this.storage), t && t(e.setMeta(_e, { deactivate: !0 })), !0),
      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       * All changes are in a single transaction for proper undo/redo.
       */
      toggleMarkOnAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: r }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        const o = t.schema.marks[e];
        if (!o) return !1;
        const { ranges: s } = this.storage, a = s.every((i) => {
          let l = !0;
          return t.state.doc.nodesBetween(i.from, i.to, (u) => {
            u.isText && !o.isInSet(u.marks) && (l = !1);
          }), l;
        });
        if (r) {
          for (const i of s)
            a ? n.removeMark(i.from, i.to, o) : n.addMark(i.from, i.to, o.create());
          r(n);
        }
        return setTimeout(() => {
          try {
            const i = t.view;
            if (i) {
              const l = Ht(i, this.storage);
              this.storage.ranges = l, l.length === 0 && Ae(this.storage);
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
        return Ae(this.storage), !0;
      },
      /**
       * Replace all selected occurrences with new text in a single transaction.
       */
      replaceAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: r }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        if (r) {
          const o = [...this.storage.ranges].sort((s, a) => a.from - s.from);
          for (const s of o)
            n.replaceWith(s.from, s.to, t.schema.text(e));
          r(n);
        }
        return e ? setTimeout(() => {
          try {
            const o = t.view;
            if (o) {
              const s = Ht(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Ae(this.storage);
            }
          } catch {
          }
        }, 10) : Ae(this.storage), !0;
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
        key: _e,
        state: {
          init() {
            return Ze.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(_e);
            if (s?.deactivate || !e.isActive)
              return Ze.empty;
            if (s?.activate || s?.refresh) {
              const a = [];
              for (const i of e.ranges) {
                a.push(
                  at.inline(i.from, i.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), a.push(
                  at.widget(i.to, l, {
                    side: 1,
                    key: `cursor-${i.from}-${i.to}`
                  })
                );
              }
              return Ze.create(o.doc, a);
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
              Ae(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(_e, { deactivate: !0 }));
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
              Ae(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(_e, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), Qp(t.state, t.dispatch), setTimeout(() => {
                  const s = Ht(t);
                  e.ranges = s, s.length === 0 && Ae(e);
                }, 10), !0;
              }
              Ae(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(_e, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, Jp(t.state, t.dispatch), setTimeout(() => {
                  const s = Ht(t);
                  e.ranges = s, s.length === 0 && Ae(e);
                }, 10), !0;
              }
              Ae(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(_e, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Ht(t);
                if (r.length === 0) {
                  Ae(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(_e, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((i, l) => l.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(o));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = Ht(t);
                  e.ranges = i, i.length === 0 && Ae(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((a, i) => i.from - a.from), { tr: o } = t.state;
                for (const a of r)
                  o.delete(a.from, a.to);
                t.dispatch(o), Ae(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(_e, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((a, i) => i.from - a.from), { tr: o } = t.state;
              for (const a of r)
                o.delete(a.from, a.to);
              t.dispatch(o), Ae(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(_e, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Ae(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(_e, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Ae(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(_e, { deactivate: !0 })), !1;
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
              Ae(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(_e, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const a = [...s].sort((l, u) => u.from - l.from), { tr: i } = t.state;
            for (const l of a)
              i.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const l = Ht(t);
              e.ranges = l, l.length === 0 && Ae(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function Jx() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function e1(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function t1(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", a = atob(r), i = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    i[l] = a.charCodeAt(l);
  return new File([i], t, { type: s });
}
function n1(e, t) {
  return t.includes(e.type);
}
function r1(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function o1(e, t, n) {
  return new Promise((r, o) => {
    const s = new window.Image(), a = new FileReader();
    a.onload = (i) => {
      s.src = i.target?.result;
    }, a.onerror = () => o(new Error("Failed to read file")), s.onload = () => {
      let i = s.width, l = s.height;
      if (i > t) {
        const y = t / i;
        i = t, l = Math.round(l * y);
      }
      const u = document.createElement("canvas");
      u.width = i, u.height = l;
      const c = u.getContext("2d");
      if (!c) {
        o(new Error("Failed to get canvas context"));
        return;
      }
      c.imageSmoothingEnabled = !0, c.imageSmoothingQuality = "high", c.drawImage(s, 0, 0, i, l);
      const d = e.type === "image/png" || e.type === "image/gif", p = d ? "image/png" : "image/jpeg", h = d ? void 0 : n, m = u.toDataURL(p, h), g = t1(m, e.name);
      r({ dataUrl: m, file: g, width: i, height: l });
    }, s.onerror = () => o(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function s1(e, t, n) {
  e.view.state.doc.descendants((r, o) => {
    if (r.type.name === "resizableImage" && r.attrs.src === t && r.attrs.alt === n) {
      try {
        const { state: s, dispatch: a } = e.view, i = s.tr.delete(o, o + r.nodeSize);
        a(i);
      } catch {
      }
      return !1;
    }
    return !0;
  });
}
async function Tl(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!n1(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = Jx();
  try {
    n.onUploadStart?.();
    let o, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const d = await o1(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = d.dataUrl, a = d.file, s = Math.min(d.width, 600);
    } else {
      o = await e1(e), a = e;
      const d = await r1(o);
      s = Math.min(d.width, 600);
    }
    t.chain().focus().setImage({
      src: o,
      alt: e.name,
      width: s
    }).run();
    const { state: l } = t.view, u = l.selection.from - 1, c = l.doc.nodeAt(u);
    if (c && c.type.name === "resizableImage") {
      const d = t.view.nodeDOM(u);
      if (d) {
        const p = d instanceof HTMLElement ? d : d.dom;
        p && p.classList.add("image-uploading");
      }
    }
    try {
      const d = await n.onImageUpload(a, {
        fileName: e.name,
        mimeType: a.type,
        fileSize: a.size,
        uploadId: r
      });
      let p = !1;
      return t.view.state.doc.descendants((h, m) => {
        if (p) return !1;
        if (h.type.name === "resizableImage" && h.attrs.src === o && h.attrs.alt === e.name) {
          try {
            const { state: g, dispatch: y } = t.view, v = g.doc.nodeAt(m);
            if (v) {
              const b = g.tr.setNodeMarkup(m, void 0, {
                ...v.attrs,
                src: d
              });
              y(b);
            }
          } catch (g) {
            console.warn("Failed to replace placeholder with uploaded reference:", g);
          }
          return p = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((h, m) => {
        if (h.type.name === "resizableImage" && h.attrs.src === d) {
          const g = t.view.nodeDOM(m);
          if (g) {
            const y = g instanceof HTMLElement ? g : g.dom;
            y && y.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (d) {
      return console.warn("Image upload failed, removing placeholder:", d), s1(t, o, e.name), n.onUploadError?.(`Upload failed: ${d instanceof Error ? d.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function Ml(e) {
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
const a1 = gt.create({
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
        key: new Ve("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = Ml(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((a) => {
              Tl(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const a = r.dataTransfer;
            if (!a) return !1;
            const i = Ml(a);
            if (i.length === 0)
              return !1;
            r.preventDefault();
            const l = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (l) {
              const u = n.state.tr.setSelection(
                la.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(u);
            }
            return i.forEach((u) => {
              Tl(u, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function i1({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = j(!1), [o, s] = j(0), a = F((c) => {
    c.preventDefault(), c.stopPropagation(), c.dataTransfer?.types.includes("Files") && (s((d) => d + 1), r(!0));
  }, []), i = F((c) => {
    c.preventDefault(), c.stopPropagation(), s((d) => {
      const p = d - 1;
      return p === 0 && r(!1), p;
    });
  }, []), l = F((c) => {
    c.preventDefault(), c.stopPropagation();
  }, []), u = F((c) => {
    c.preventDefault(), c.stopPropagation(), r(!1), s(0);
  }, []);
  return G(() => {
    if (!t || !e.current) return;
    const c = e.current;
    return c.addEventListener("dragenter", a), c.addEventListener("dragleave", i), c.addEventListener("dragover", l), c.addEventListener("drop", u), () => {
      c.removeEventListener("dragenter", a), c.removeEventListener("dragleave", i), c.removeEventListener("dragover", l), c.removeEventListener("drop", u);
    };
  }, [t, e, a, i, l, u]), n ? /* @__PURE__ */ f("div", { className: "image-drop-zone", children: /* @__PURE__ */ A("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ f("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ f(Op, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ A("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ f("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ f("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function l1({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [a, i] = j(e), [l, u] = j(t), c = V(null), d = V(null);
  G(() => {
    d.current?.focus(), d.current?.select();
  }, []), G(() => {
    const g = (v) => {
      c.current && !c.current.contains(v.target) && s();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 100);
    return () => {
      clearTimeout(y), document.removeEventListener("mousedown", g);
    };
  }, [s]), G(() => {
    const g = (y) => {
      y.key === "Escape" ? s() : y.key === "Enter" && (y.metaKey || y.ctrlKey) && p();
    };
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [a, l, s]);
  const p = () => {
    a.trim() && r(a.trim(), l.trim());
  }, m = (() => {
    let b = n.x, w = n.y + 10;
    return b + 320 > window.innerWidth - 16 && (b = window.innerWidth - 320 - 16), b < 16 && (b = 16), w + 200 > window.innerHeight - 16 && (w = n.y - 200 - 10), { left: b, top: w };
  })();
  return /* @__PURE__ */ A(
    "div",
    {
      ref: c,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: m.left,
        top: m.top,
        zIndex: 1e3
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
              children: /* @__PURE__ */ f(Nt, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ A("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ A("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ f(ha, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ f("span", { children: "Image URL" })
            ] }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: d,
                type: "text",
                value: a,
                onChange: (g) => i(g.target.value),
                placeholder: "https://example.com/image.jpg",
                className: "image-edit-popover-input"
              }
            )
          ] }),
          /* @__PURE__ */ A("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ A("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ f(Eo, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ f("span", { children: "Alt Text" })
            ] }),
            /* @__PURE__ */ f(
              "input",
              {
                type: "text",
                value: l,
                onChange: (g) => u(g.target.value),
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
              children: /* @__PURE__ */ f(Tn, { className: "w-4 h-4" })
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
                onClick: p,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !a.trim(),
                children: [
                  /* @__PURE__ */ f(Bn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function eo(e) {
  const t = [], n = e.split(`
`);
  let r = 0, o = !1, s = "";
  for (let a = 0; a < n.length; a++) {
    const i = n[a], l = r;
    if (i.startsWith("```")) {
      o ? (o = !1, t.push({
        type: "code-block",
        content: i,
        start: l,
        end: l + i.length
      })) : (o = !0, s = i.slice(3).trim(), t.push({
        type: "code-block",
        content: "```",
        start: l,
        end: l + 3
      }), s && t.push({
        type: "code-block-lang",
        content: s,
        start: l + 3,
        end: l + 3 + s.length
      })), r += i.length + 1;
      continue;
    }
    if (o) {
      t.push({
        type: "code-block",
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    const u = i.match(/^(#{1,6})\s+(.*)$/);
    if (u) {
      const b = u[1].length;
      t.push({
        type: `heading${b}`,
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(i.trim())) {
      t.push({
        type: "horizontal-rule",
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    if (i.startsWith(">")) {
      t.push({
        type: "blockquote",
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    if (/^\|?[\s-:|]+\|?$/.test(i) && i.includes("-")) {
      t.push({
        type: "table-separator",
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    if (i.includes("|") && (i.startsWith("|") || i.trim().includes(" | "))) {
      t.push({
        type: "table-cell",
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    const c = i.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (c) {
      const b = c[2].toLowerCase() === "x";
      t.push({
        type: b ? "task-checked" : "task-list",
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    if (i.match(/^(\s*[-*+])\s+(.*)$/)) {
      t.push({
        type: "list-bullet",
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    if (i.match(/^(\s*\d+\.)\s+(.*)$/)) {
      t.push({
        type: "list-number",
        content: i,
        start: l,
        end: l + i.length
      }), r += i.length + 1;
      continue;
    }
    let h = 0;
    const m = [
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
    for (const b of m) {
      let w;
      for (b.regex.lastIndex = 0; (w = b.regex.exec(i)) !== null; )
        g.push({
          start: l + w.index,
          end: l + w.index + w[0].length,
          type: b.type,
          content: w[0]
        });
    }
    g.sort((b, w) => b.start - w.start);
    const y = [];
    let v = l;
    for (const b of g)
      b.start >= v && (y.push(b), v = b.end);
    for (const b of y)
      b.start > l + h && t.push({
        type: "text",
        content: i.substring(h, b.start - l),
        start: l + h,
        end: b.start
      }), t.push({
        type: b.type,
        content: b.content,
        start: b.start,
        end: b.end
      }), h = b.end - l;
    h < i.length && t.push({
      type: "text",
      content: i.substring(h),
      start: l + h,
      end: l + i.length
    }), r += i.length + 1;
  }
  return t;
}
function El(e) {
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
function nn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function to(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return nn(e);
  let o = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const u = s[l], c = a + u.length, d = t.filter((h) => h.start >= a && h.start < c);
      let p = a;
      for (const h of d)
        h.start > p && (o += nn(e.substring(p, h.start))), o += `<span class="${El(h.type)}">${nn(h.content)}</span>`, p = h.end;
      p < c && (o += nn(e.substring(p, c))), l < s.length - 1 && (o += `
`), a = c + 1;
    }
    return o;
  }
  const i = /* @__PURE__ */ new Map();
  n.forEach((l, u) => {
    for (let c = l.from; c < l.to; c++)
      i.set(c, { matchIdx: u, isCurrent: u === r });
  }), a = 0;
  for (let l = 0; l < s.length; l++) {
    const u = s[l], c = a + u.length, d = t.filter((h) => h.start >= a && h.start < c);
    let p = a;
    for (const h of d)
      h.start > p && (o += As(e, p, h.start, null, i)), o += As(e, h.start, h.end, El(h.type), i), p = h.end;
    p < c && (o += As(e, p, c, null, i)), l < s.length - 1 && (o += `
`), a = c + 1;
  }
  return o;
}
function As(e, t, n, r, o) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = o.get(a);
    if (i) {
      const l = a;
      for (; a < n && o.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const u = nn(e.substring(l, a)), c = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${c}">${u}</mark></span>` : s += `<mark class="${c}">${u}</mark>`;
    } else {
      const l = a;
      for (; a < n && !o.has(a); )
        a++;
      const u = nn(e.substring(l, a));
      r ? s += `<span class="${r}">${u}</span>` : s += u;
    }
  }
  return s;
}
function c1({
  content: e,
  onChange: t,
  placeholder: n = "Write your markdown here...",
  editable: r = !0,
  autofocus: o = !1,
  className: s = "",
  searchMatches: a,
  currentMatchIndex: i,
  autoClosePairs: l = !0
}) {
  const u = V(null), c = V(null), d = V(null), p = V(null), h = 5e3, m = 80, [g, y] = j(() => {
    const C = eo(e);
    return to(e, C, a, i);
  }), v = V(null), b = rn(() => {
    if (e.length <= h) {
      const C = eo(e), T = to(e, C, a, i);
      return v.current && (clearTimeout(v.current), v.current = null), T;
    }
    return null;
  }, [e, a, i]);
  G(() => {
    if (e.length <= h) {
      const C = eo(e);
      y(to(e, C, a, i));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const C = eo(e);
      y(to(e, C, a, i)), v.current = null;
    }, m), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, a, i]);
  const w = b ?? g, E = F(() => {
    const C = u.current, T = c.current, k = d.current;
    if (C) {
      const R = k?.parentElement, N = R ? R.clientHeight : 200;
      C.style.height = "auto";
      const L = Math.max(C.scrollHeight, N, 200);
      C.style.height = `${L}px`, T && (T.style.height = `${L}px`);
    }
  }, []);
  G(() => {
    const C = u.current;
    if (!C) return;
    const T = (k) => {
      const R = C.closest(".editor-content-wrapper");
      if (!R) return;
      const { scrollTop: N, scrollHeight: L, clientHeight: I } = R, _ = N <= 0, H = N + I >= L - 1;
      (k.deltaY > 0 && !H || k.deltaY < 0 && !_) && (k.preventDefault(), R.scrollTop += k.deltaY);
    };
    return C.addEventListener("wheel", T, { passive: !1 }), () => C.removeEventListener("wheel", T);
  }, []);
  const x = F(() => {
  }, []);
  G(() => {
    E();
  }, [e, E]), G(() => {
    o && u.current && u.current.focus();
  }, [o]), G(() => {
    if (p.current && u.current) {
      const { start: C, end: T } = p.current;
      u.current.selectionStart = C, u.current.selectionEnd = T, p.current = null;
    }
  }, [e]);
  const M = F((C) => {
    const T = C.target;
    p.current = {
      start: T.selectionStart,
      end: T.selectionEnd
    }, t(T.value);
  }, [t]), D = F((C) => {
    const T = C.currentTarget, k = T.selectionStart, R = T.selectionEnd, N = T.value, L = k !== R;
    if (l) {
      if (C.key === "`" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), L) {
          const I = N.substring(k, R), _ = N.substring(0, k) + "`" + I + "`" + N.substring(R);
          p.current = { start: k + 1, end: R + 1 }, t(_);
        } else if (N[k] === "`")
          p.current = { start: k + 1, end: k + 1 }, t(N), T.selectionStart = T.selectionEnd = k + 1;
        else {
          const I = N.substring(0, k) + "``" + N.substring(R);
          p.current = { start: k + 1, end: k + 1 }, t(I);
        }
        return;
      }
      if (C.key === "*" && !C.ctrlKey && !C.metaKey) {
        if (N[k - 1] === "*" && N[k], L) {
          C.preventDefault();
          const H = N.substring(k, R), K = N.substring(0, k) + "*" + H + "*" + N.substring(R);
          p.current = { start: k + 1, end: R + 1 }, t(K);
          return;
        }
        if (N[k] === "*") {
          C.preventDefault(), p.current = { start: k + 1, end: k + 1 }, t(N.substring(0, k) + N.substring(k));
          return;
        }
        C.preventDefault();
        const _ = N.substring(0, k) + "**" + N.substring(R);
        p.current = { start: k + 1, end: k + 1 }, t(_);
        return;
      }
      if (C.key === "_" && !C.ctrlKey && !C.metaKey) {
        if (L) {
          C.preventDefault();
          const _ = N.substring(k, R), H = N.substring(0, k) + "_" + _ + "_" + N.substring(R);
          p.current = { start: k + 1, end: R + 1 }, t(H);
          return;
        }
        if (N[k] === "_") {
          C.preventDefault(), p.current = { start: k + 1, end: k + 1 }, t(N.substring(0, k) + N.substring(k));
          return;
        }
        C.preventDefault();
        const I = N.substring(0, k) + "__" + N.substring(R);
        p.current = { start: k + 1, end: k + 1 }, t(I);
        return;
      }
      if (C.key === "~" && !C.ctrlKey && !C.metaKey) {
        if (L) {
          C.preventDefault();
          const _ = N.substring(k, R), H = N.substring(0, k) + "~" + _ + "~" + N.substring(R);
          p.current = { start: k + 1, end: R + 1 }, t(H);
          return;
        }
        if (N[k] === "~") {
          C.preventDefault(), p.current = { start: k + 1, end: k + 1 }, t(N.substring(0, k) + N.substring(k));
          return;
        }
        C.preventDefault();
        const I = N.substring(0, k) + "~~" + N.substring(R);
        p.current = { start: k + 1, end: k + 1 }, t(I);
        return;
      }
      if (C.key === "[" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), L) {
          const I = N.substring(k, R), _ = N.substring(0, k) + "[" + I + "]()" + N.substring(R);
          p.current = { start: R + 3, end: R + 3 }, t(_);
        } else {
          const I = N.substring(0, k) + "[]()" + N.substring(R);
          p.current = { start: k + 1, end: k + 1 }, t(I);
        }
        return;
      }
      if (C.key === "]" && !C.ctrlKey && !C.metaKey && N[k] === "]") {
        C.preventDefault(), p.current = { start: k + 1, end: k + 1 }, t(N.substring(0, k) + N.substring(k));
        return;
      }
      if (C.key === ")" && !C.ctrlKey && !C.metaKey && N[k] === ")") {
        C.preventDefault(), p.current = { start: k + 1, end: k + 1 }, t(N.substring(0, k) + N.substring(k));
        return;
      }
      if (C.key === "Backspace" && !L && k > 0) {
        const I = N[k - 1], _ = N[k], H = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [K, P] of H)
          if (I === K && _ === P) {
            C.preventDefault();
            const B = N.substring(0, k - 1) + N.substring(k + 1);
            p.current = { start: k - 1, end: k - 1 }, t(B);
            return;
          }
        if (I === "[" && N.substring(k, k + 3) === "]()") {
          C.preventDefault();
          const K = N.substring(0, k - 1) + N.substring(k + 3);
          p.current = { start: k - 1, end: k - 1 }, t(K);
          return;
        }
      }
    }
    if (C.key === "Tab")
      if (C.preventDefault(), C.shiftKey) {
        const I = N.substring(0, k), _ = N.substring(k, R), H = N.substring(R), P = I.lastIndexOf(`
`) + 1, B = I.substring(0, P), ne = I.substring(P), ae = (ne + _).split(`
`), oe = ae.map(($) => $.startsWith("  ") ? $.substring(2) : $.startsWith("	") ? $.substring(1) : $), re = B + oe.join(`
`) + H, ie = (ne + _).length - oe.join(`
`).length;
        p.current = {
          start: Math.max(P, k - (ae[0].length - oe[0].length)),
          end: R - ie
        }, t(re);
      } else if (k === R) {
        const I = N.substring(0, k) + "  " + N.substring(R);
        p.current = { start: k + 2, end: k + 2 }, t(I);
      } else {
        const I = N.substring(0, k), _ = N.substring(k, R), H = N.substring(R), P = I.lastIndexOf(`
`) + 1, B = I.substring(0, P), ae = (I.substring(P) + _).split(`
`), oe = ae.map((ie) => "  " + ie), re = B + oe.join(`
`) + H;
        p.current = {
          start: k + 2,
          end: R + ae.length * 2
        }, t(re);
      }
  }, [t, l]);
  return /* @__PURE__ */ A("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ f(
      "div",
      {
        ref: c,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: w || `<span class="md-placeholder">${nn(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ f(
      "textarea",
      {
        ref: u,
        value: e,
        onChange: M,
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
let Dl = 0, na = 0, _d = 0;
function u1(e) {
  na++, _d = e;
}
const d1 = zn(function({
  visible: t,
  onClose: n,
  editor: r
}) {
  const [o, s] = j(!1), [a, i] = j({
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
  }), l = V([]), u = V(performance.now()), c = V(0), d = V(0), p = V(0), h = V(0), [m, g] = j(new Array(60).fill(0)), [y, v] = j(new Array(60).fill(0));
  G(() => {
    if (!t || !r) return;
    const D = () => {
      const C = performance.now();
      queueMicrotask(() => {
        const T = performance.now() - C;
        u1(T);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), G(() => {
    if (!t) return;
    let D = 0, C = performance.now(), T = 0;
    const k = (R) => {
      const N = R - u.current;
      if (u.current = R, l.current.push({ time: R, duration: N }), l.current.length > 120 && (l.current = l.current.slice(-120)), N > 16.67 && d.current++, D++, R - C >= 1e3) {
        T = D, D = 0, C = R;
        const L = l.current.slice(-60), I = L.length > 0 ? L.reduce((oe, re) => oe + re.duration, 0) / L.length : 0, _ = L.length > 0 ? Math.max(...L.map((oe) => oe.duration)) : 0, H = performance.memory, K = H ? H.usedJSHeapSize / (1024 * 1024) : 0, P = H ? H.jsHeapSizeLimit / (1024 * 1024) : 0, B = document.querySelectorAll("*").length, ne = Dl - p.current, ae = na - h.current;
        p.current = Dl, h.current = na, i({
          fps: T,
          frameTime: Math.round(I * 100) / 100,
          frameTimeMax: Math.round(_ * 100) / 100,
          memoryUsed: Math.round(K * 10) / 10,
          memoryTotal: Math.round(P),
          renderCount: ne,
          transactionCount: ae,
          lastTransactionTime: Math.round(_d * 100) / 100,
          domNodes: B,
          longFrames: d.current
        }), g((oe) => [...oe.slice(1), T]), v((oe) => [...oe.slice(1), I]), d.current = 0;
      }
      c.current = requestAnimationFrame(k);
    };
    return c.current = requestAnimationFrame(k), () => {
      cancelAnimationFrame(c.current);
    };
  }, [t]);
  const b = F(() => {
    n?.();
  }, [n]), w = F(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const E = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", x = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", M = (D, C, T) => {
    const N = D.map((L, I) => {
      const _ = I / (D.length - 1) * 120, H = 24 - Math.min(L, C) / C * 24;
      return `${_},${H}`;
    }).join(" ");
    return /* @__PURE__ */ f("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ f(
      "polyline",
      {
        points: N,
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
        /* @__PURE__ */ f(_p, { size: 14 }),
        /* @__PURE__ */ f("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ f("button", { onClick: w, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ f(ec, { size: 12 }) : /* @__PURE__ */ f(tc, { size: 12 }) }),
        /* @__PURE__ */ f("button", { onClick: b, title: "Close profiler", children: /* @__PURE__ */ f(Nt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ A("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ f("span", { className: "perf-value", style: { color: E(a.fps) }, children: a.fps })
        ] }),
        M(m, 70, E(a.fps))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ A("span", { className: "perf-value", style: { color: x(a.frameTime) }, children: [
            a.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ f("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", style: { color: x(a.frameTimeMax) }, children: [
            a.frameTimeMax,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ A("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", style: { color: a.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            a.longFrames,
            "/s"
          ] })
        ] }),
        M(y, 50, x(a.frameTime))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: a.renderCount })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: a.transactionCount })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ f("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", children: [
            a.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ f("span", { className: "perf-value", children: a.domNodes.toLocaleString() })
        ] }),
        a.memoryTotal > 0 && /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Memory" }),
          /* @__PURE__ */ A("span", { className: "perf-value", children: [
            a.memoryUsed,
            "MB / ",
            a.memoryTotal,
            "MB"
          ] })
        ] })
      ] })
    ] })
  ] });
});
class f1 extends rp {
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
      return /* @__PURE__ */ f("div", { className: ce("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ A("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ f("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ f($p, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ A("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ f("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ f("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ A(
            Ft,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ f(Sa, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ A(
            Ft,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ f(Tn, { className: "w-4 h-4" }),
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
              className: ce(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ f(Ut, { className: "w-3 h-3" }) : /* @__PURE__ */ f(Gl, { className: "w-3 h-3" }),
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
                  children: o ? /* @__PURE__ */ A(Pe, { children: [
                    /* @__PURE__ */ f(zp, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ f("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ A(Pe, { children: [
                    /* @__PURE__ */ f(Hn, { className: "w-3 h-3" }),
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
function p1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function h1(e, t) {
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
function m1(e) {
  const [t, n] = op(h1, { status: "idle" }), r = V(null), o = F(async (i, l, u, c, d) => {
    if (e) {
      n({
        type: "start-streaming",
        action: i,
        actionLabel: l,
        inputText: u,
        selectionRange: c
      });
      try {
        const p = e(i, u, d);
        if (Symbol.asyncIterator in Object(p))
          for await (const h of p)
            n({ type: "append-chunk", text: h });
        else {
          const h = await p;
          n({ type: "append-chunk", text: h });
        }
        n({ type: "complete" });
      } catch (p) {
        if (p instanceof DOMException && p.name === "AbortError") {
          n({ type: "reset" });
          return;
        }
        const h = p instanceof Error ? p.message : "AI action failed";
        n({ type: "error", message: h });
      }
    }
  }, [e]), s = F(() => {
    r.current?.(), n({ type: "reset" });
  }, []), a = F(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: a };
}
const g1 = {
  SpellCheck: Hp,
  RefreshCw: Bp,
  Minimize2: tc,
  Maximize2: ec,
  FileText: xa,
  MessageSquare: nc,
  Sparkles: Mo
};
function y1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, a] = j(""), [i, l] = j(!1), u = V(null), c = V(null), d = e.filter((y) => y.scope === t || y.scope === "both");
  G(() => {
    const y = (b) => {
      u.current && !u.current.contains(b.target) && r();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [r]), G(() => {
    const y = (v) => {
      v.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), G(() => {
    i && c.current && c.current.focus();
  }, [i]);
  const h = F(() => {
    const v = d.length * 40 + (i ? 56 : 0) + 16, b = window.innerWidth, w = window.innerHeight;
    let E = o.top, x = o.left;
    return x + 260 > b - 8 && (x = b - 260 - 8), x < 8 && (x = 8), E + v > w - 8 && (E = o.top - v - 8), E < 8 && (E = 8), { top: E, left: x };
  }, [o, d.length, i])(), m = () => {
    s.trim() && (n("custom", s.trim()), a(""), l(!1));
  }, g = /* @__PURE__ */ f(
    "div",
    {
      ref: u,
      className: "ai-dropdown-menu",
      style: {
        position: "fixed",
        top: h.top,
        left: h.left,
        zIndex: 1e4
      },
      onMouseDown: (y) => y.preventDefault(),
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
              /* @__PURE__ */ f(nc, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ f(
                "input",
                {
                  ref: c,
                  type: "text",
                  placeholder: "Modify with prompt…",
                  value: s,
                  onChange: (y) => a(y.target.value),
                  onKeyDown: (y) => {
                    y.key === "Enter" && (y.preventDefault(), m()), y.stopPropagation();
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
            /* @__PURE__ */ f("div", { className: "h-px bg-border mx-2 my-0.5" }),
            d.filter((y) => !y.showCustomPrompt).map((y) => {
              const v = y.icon ? g1[y.icon] : Mo;
              return /* @__PURE__ */ A(
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
                    v && /* @__PURE__ */ f(v, { size: 15, className: "text-muted-foreground shrink-0" }),
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
  return Kt(g, document.body);
}
function b1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const a = V(null), i = V(null), [l, u] = j(!1), [c, d] = j(0);
  G(() => {
    if (a.current) {
      const x = new ResizeObserver((M) => {
        for (const D of M)
          d(D.contentRect.height);
      });
      return x.observe(a.current), () => x.disconnect();
    }
  }, []), G(() => {
    i.current && e.status === "streaming" && (i.current.scrollTop = i.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), G(() => {
    const x = (M) => {
      M.key === "Escape" && s();
    };
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [s]);
  const p = rn(() => {
    const C = window.innerWidth, T = window.innerHeight;
    let k = t.selectionCenterX - 380 / 2;
    k + 380 > C - 8 && (k = C - 380 - 8), k < 8 && (k = 8);
    const R = T - t.selectionBottom - 8, N = t.selectionTop - 8, L = c || 200;
    let I, _ = !1;
    return R >= L || R >= N ? I = t.selectionBottom + 8 : (I = t.selectionTop - 8 - L, _ = !0), I < 8 && (I = 8), I + L > T - 8 && (I = T - L - 8), { top: I, left: k, placedAbove: _ };
  }, [t, c]), h = e.status === "streaming" || e.status === "complete" ? e.result : "", m = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", y = e.status === "complete", v = e.status === "error", b = F(() => {
    navigator.clipboard.writeText(h), u(!0), setTimeout(() => u(!1), 1500);
  }, [h]);
  if (e.status === "idle") return null;
  const w = p.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", E = /* @__PURE__ */ f(
    "div",
    {
      ref: a,
      className: "ai-result-popover",
      style: {
        position: "fixed",
        top: p.top,
        left: p.left,
        zIndex: 10001
      },
      onMouseDown: (x) => x.preventDefault(),
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
                g && /* @__PURE__ */ f(Jl, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ f("span", { className: "font-medium", children: v ? "Error" : m }),
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
                  children: /* @__PURE__ */ f(Nt, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ f(
              "div",
              {
                ref: i,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: v ? /* @__PURE__ */ f("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ A("div", { className: "whitespace-pre-wrap", children: [
                  h,
                  g && /* @__PURE__ */ f("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ A("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || v) && /* @__PURE__ */ A(Pe, { children: [
                y && /* @__PURE__ */ A(Pe, { children: [
                  /* @__PURE__ */ f(
                    Sn,
                    {
                      icon: _s,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ f(
                    Sn,
                    {
                      icon: Ca,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ f(
                    Sn,
                    {
                      icon: l ? Bn : Hn,
                      label: l ? "Copied" : "Copy",
                      onClick: b
                    }
                  )
                ] }),
                /* @__PURE__ */ f(
                  Sn,
                  {
                    icon: Sa,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ f("div", { className: "flex-1" }),
                /* @__PURE__ */ f(
                  Sn,
                  {
                    icon: Nt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ A(Pe, { children: [
                /* @__PURE__ */ f("div", { className: "flex-1" }),
                /* @__PURE__ */ f(
                  Sn,
                  {
                    icon: Nt,
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
  return Kt(E, document.body);
}
function Sn({
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
const $d = "paragon-editor-toc-width", v1 = 280, zd = 200, Bd = 500;
function Nl() {
  try {
    const e = localStorage.getItem($d);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= zd && t <= Bd)
        return t;
    }
  } catch {
  }
  return v1;
}
function w1(e) {
  try {
    localStorage.setItem($d, String(e));
  } catch {
  }
}
function k1(e, t, n) {
  const r = [];
  return e.state.doc.descendants((s, a) => {
    if (s.type.name === "heading") {
      const i = s.attrs.level;
      if (i >= t && i <= n) {
        const l = s.textContent;
        l.trim() && r.push({ id: `toc-heading-${a}`, text: l.trim(), level: i, pos: a });
      }
    }
  }), r;
}
function x1(e) {
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
function Rl(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const Al = zn(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: r,
  title: o = "",
  minLevel: s = 1,
  maxLevel: a = 4,
  showLevelIndicators: i = !1,
  highlightActive: l = !0,
  treeView: u = !1,
  className: c = "",
  width: d,
  position: p = "right",
  scrollOffset: h = 20,
  onItemClick: m,
  renderItem: g,
  showToggleButton: y = !0,
  scrollContainerRef: v
}) {
  const [b, w] = j([]), [E, x] = j(null), [M, D] = j(n), [C, T] = j(/* @__PURE__ */ new Set()), [k, R] = j(() => {
    if (d) {
      const W = parseInt(d, 10);
      return isNaN(W) ? Nl() : W;
    }
    return Nl();
  }), N = V(null), L = V(null), I = V(!1), _ = V(0), H = V(0);
  G(() => {
    D(n);
  }, [n]);
  const K = F((W) => {
    W.preventDefault(), W.stopPropagation(), I.current = !0, _.current = W.clientX, H.current = k, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [k]);
  G(() => {
    const W = (Q) => {
      if (!I.current) return;
      const pe = p === "right" ? _.current - Q.clientX : Q.clientX - _.current, be = Math.min(Bd, Math.max(zd, H.current + pe));
      R(be);
    }, Y = () => {
      I.current && (I.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", R((Q) => (w1(Q), Q)));
    };
    return document.addEventListener("mousemove", W), document.addEventListener("mouseup", Y), () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", Y);
    };
  }, [p]);
  const P = F(() => {
    if (!t || t.isDestroyed) return;
    const W = k1(t, s, a);
    w(W), E && !W.find((Y) => Y.id === E) && x(null);
  }, [t, s, a, E]);
  G(() => {
    if (!t) return;
    const W = () => {
      L.current && clearTimeout(L.current), L.current = setTimeout(() => P(), 300);
    };
    return P(), t.on("update", W), t.on("create", W), () => {
      t.off("update", W), t.off("create", W), L.current && clearTimeout(L.current);
    };
  }, [t, P]), G(() => {
    if (!t || !l || !M || b.length === 0) return;
    const W = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!W) return;
    const Y = () => {
      const be = W.getBoundingClientRect();
      let Me = null;
      for (let Oe = b.length - 1; Oe >= 0; Oe--) {
        const Je = b[Oe], Lt = Rl(t, Je.pos);
        if (Lt && Lt.getBoundingClientRect().top - be.top <= h + 10) {
          Me = Je.id;
          break;
        }
      }
      !Me && b.length > 0 && (Me = b[0].id), x(Me);
    };
    let Q;
    const pe = () => {
      cancelAnimationFrame(Q), Q = requestAnimationFrame(Y);
    };
    return W.addEventListener("scroll", pe, { passive: !0 }), Y(), () => {
      W.removeEventListener("scroll", pe), cancelAnimationFrame(Q);
    };
  }, [t, b, l, M, h, v]);
  const B = F((W) => {
    if (!t || t.isDestroyed) return;
    const Y = Rl(t, W.pos);
    if (Y) {
      const Q = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (Q) {
        const pe = Q.getBoundingClientRect(), Me = Y.getBoundingClientRect().top - pe.top + Q.scrollTop;
        Q.scrollTo({ top: Me - h, behavior: "smooth" });
      } else
        Y.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(W.pos + 1);
    } catch {
    }
    x(W.id), m?.(W);
  }, [t, h, m, v]), ne = F(() => {
    const W = !M;
    D(W), r?.(W);
  }, [M, r]), ae = F((W) => {
    T((Y) => {
      const Q = new Set(Y);
      return Q.has(W) ? Q.delete(W) : Q.add(W), Q;
    });
  }, []), oe = F((W, Y, Q = 0) => {
    if (g)
      return g(W, Y, () => B(W));
    const pe = (W.level - s) * 14, be = u && W.children && W.children.length > 0, Me = C.has(W.id);
    return /* @__PURE__ */ f(
      "div",
      {
        className: `toc-item ${Y ? "toc-item-active" : ""} toc-level-${W.level}`,
        style: { paddingLeft: `${pe + 10}px` },
        children: /* @__PURE__ */ A(
          "button",
          {
            className: "toc-item-button",
            onClick: () => B(W),
            title: W.text,
            children: [
              be && /* @__PURE__ */ f(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Oe) => {
                    Oe.stopPropagation(), ae(W.id);
                  },
                  children: /* @__PURE__ */ f("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: Me ? /* @__PURE__ */ f("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ f("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              i && /* @__PURE__ */ A("span", { className: "toc-level-indicator", children: [
                "H",
                W.level
              ] }),
              /* @__PURE__ */ f("span", { className: "toc-item-text", children: W.text })
            ]
          }
        )
      },
      W.id
    );
  }, [g, B, u, s, i, C, ae]), re = F((W, Y = 0) => W.map((Q) => {
    const pe = E === Q.id, be = C.has(Q.id), Me = Q.children && Q.children.length > 0;
    return /* @__PURE__ */ A("div", { children: [
      oe(Q, pe, Y),
      Me && !be && /* @__PURE__ */ f("div", { className: "toc-children", children: re(Q.children, Y + 1) })
    ] }, Q.id);
  }), [E, C, oe]), ie = F(() => b.map((W) => {
    const Y = E === W.id;
    return oe(W, Y);
  }), [b, E, oe]);
  if (!t) return null;
  const $ = u ? x1(b) : [];
  return /* @__PURE__ */ A(Pe, { children: [
    y && /* @__PURE__ */ f(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${p}`,
        onClick: ne,
        title: M ? "Hide Table of Contents" : "Show Table of Contents",
        children: M ? /* @__PURE__ */ f(Wp, { size: 16 }) : /* @__PURE__ */ f(Fp, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(
      "div",
      {
        ref: N,
        className: `toc-sidebar ${M ? "toc-visible" : "toc-hidden"} toc-${p} ${c}`,
        style: { width: M ? `${k}px` : "0px" },
        children: [
          M && /* @__PURE__ */ f(
            "div",
            {
              className: `toc-resize-handle toc-resize-${p}`,
              onMouseDown: K
            }
          ),
          /* @__PURE__ */ A("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ f("div", { className: "toc-header", children: /* @__PURE__ */ f("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ f("div", { className: "toc-content toc-content-with-toggle", children: b.length === 0 ? /* @__PURE__ */ A("div", { className: "toc-empty", children: [
              /* @__PURE__ */ f("p", { children: "No headings yet" }),
              /* @__PURE__ */ f("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ f("div", { className: "toc-list", children: u ? re($) : ie() }) })
          ] })
        ]
      }
    )
  ] });
});
function C1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n)
      n.hasOwnProperty(r) && (e[r] = n[r]);
  }
  return e;
}
function ra(e, t) {
  return Array(t + 1).join(e);
}
function Hd(e) {
  return e.replace(/^\n*/, "");
}
function Wd(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function Fd(e) {
  return Wd(Hd(e));
}
var S1 = [
  "ADDRESS",
  "ARTICLE",
  "ASIDE",
  "AUDIO",
  "BLOCKQUOTE",
  "BODY",
  "CANVAS",
  "CENTER",
  "DD",
  "DIR",
  "DIV",
  "DL",
  "DT",
  "FIELDSET",
  "FIGCAPTION",
  "FIGURE",
  "FOOTER",
  "FORM",
  "FRAMESET",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "HEADER",
  "HGROUP",
  "HR",
  "HTML",
  "ISINDEX",
  "LI",
  "MAIN",
  "MENU",
  "NAV",
  "NOFRAMES",
  "NOSCRIPT",
  "OL",
  "OUTPUT",
  "P",
  "PRE",
  "SECTION",
  "TABLE",
  "TBODY",
  "TD",
  "TFOOT",
  "TH",
  "THEAD",
  "TR",
  "UL"
];
function Ja(e) {
  return ei(e, S1);
}
var Ud = [
  "AREA",
  "BASE",
  "BR",
  "COL",
  "COMMAND",
  "EMBED",
  "HR",
  "IMG",
  "INPUT",
  "KEYGEN",
  "LINK",
  "META",
  "PARAM",
  "SOURCE",
  "TRACK",
  "WBR"
];
function Yd(e) {
  return ei(e, Ud);
}
function T1(e) {
  return Vd(e, Ud);
}
var jd = [
  "A",
  "TABLE",
  "THEAD",
  "TBODY",
  "TFOOT",
  "TH",
  "TD",
  "IFRAME",
  "SCRIPT",
  "AUDIO",
  "VIDEO"
];
function M1(e) {
  return ei(e, jd);
}
function E1(e) {
  return Vd(e, jd);
}
function ei(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function Vd(e, t) {
  return e.getElementsByTagName && t.some(function(n) {
    return e.getElementsByTagName(n).length;
  });
}
var We = {};
We.paragraph = {
  filter: "p",
  replacement: function(e) {
    return `

` + e + `

`;
  }
};
We.lineBreak = {
  filter: "br",
  replacement: function(e, t, n) {
    return n.br + `
`;
  }
};
We.heading = {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: function(e, t, n) {
    var r = Number(t.nodeName.charAt(1));
    if (n.headingStyle === "setext" && r < 3) {
      var o = ra(r === 1 ? "=" : "-", e.length);
      return `

` + e + `
` + o + `

`;
    } else
      return `

` + ra("#", r) + " " + e + `

`;
  }
};
We.blockquote = {
  filter: "blockquote",
  replacement: function(e) {
    return e = Fd(e).replace(/^/gm, "> "), `

` + e + `

`;
  }
};
We.list = {
  filter: ["ul", "ol"],
  replacement: function(e, t) {
    var n = t.parentNode;
    return n.nodeName === "LI" && n.lastElementChild === t ? `
` + e : `

` + e + `

`;
  }
};
We.listItem = {
  filter: "li",
  replacement: function(e, t, n) {
    var r = n.bulletListMarker + "   ", o = t.parentNode;
    if (o.nodeName === "OL") {
      var s = o.getAttribute("start"), a = Array.prototype.indexOf.call(o.children, t);
      r = (s ? Number(s) + a : a + 1) + ".  ";
    }
    var i = /\n$/.test(e);
    return e = Fd(e) + (i ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(r.length)), r + e + (t.nextSibling ? `
` : "");
  }
};
We.indentedCodeBlock = {
  filter: function(e, t) {
    return t.codeBlockStyle === "indented" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
  },
  replacement: function(e, t, n) {
    return `

    ` + t.firstChild.textContent.replace(/\n/g, `
    `) + `

`;
  }
};
We.fencedCodeBlock = {
  filter: function(e, t) {
    return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
  },
  replacement: function(e, t, n) {
    for (var r = t.firstChild.getAttribute("class") || "", o = (r.match(/language-(\S+)/) || [null, ""])[1], s = t.firstChild.textContent, a = n.fence.charAt(0), i = 3, l = new RegExp("^" + a + "{3,}", "gm"), u; u = l.exec(s); )
      u[0].length >= i && (i = u[0].length + 1);
    var c = ra(a, i);
    return `

` + c + o + `
` + s.replace(/\n$/, "") + `
` + c + `

`;
  }
};
We.horizontalRule = {
  filter: "hr",
  replacement: function(e, t, n) {
    return `

` + n.hr + `

`;
  }
};
We.inlineLink = {
  filter: function(e, t) {
    return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t) {
    var n = t.getAttribute("href");
    n && (n = n.replace(/([()])/g, "\\$1"));
    var r = bo(t.getAttribute("title"));
    return r && (r = ' "' + r.replace(/"/g, '\\"') + '"'), "[" + e + "](" + n + r + ")";
  }
};
We.referenceLink = {
  filter: function(e, t) {
    return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t, n) {
    var r = t.getAttribute("href"), o = bo(t.getAttribute("title"));
    o && (o = ' "' + o + '"');
    var s, a;
    switch (n.linkReferenceStyle) {
      case "collapsed":
        s = "[" + e + "][]", a = "[" + e + "]: " + r + o;
        break;
      case "shortcut":
        s = "[" + e + "]", a = "[" + e + "]: " + r + o;
        break;
      default:
        var i = this.references.length + 1;
        s = "[" + e + "][" + i + "]", a = "[" + i + "]: " + r + o;
    }
    return this.references.push(a), s;
  },
  references: [],
  append: function(e) {
    var t = "";
    return this.references.length && (t = `

` + this.references.join(`
`) + `

`, this.references = []), t;
  }
};
We.emphasis = {
  filter: ["em", "i"],
  replacement: function(e, t, n) {
    return e.trim() ? n.emDelimiter + e + n.emDelimiter : "";
  }
};
We.strong = {
  filter: ["strong", "b"],
  replacement: function(e, t, n) {
    return e.trim() ? n.strongDelimiter + e + n.strongDelimiter : "";
  }
};
We.code = {
  filter: function(e) {
    var t = e.previousSibling || e.nextSibling, n = e.parentNode.nodeName === "PRE" && !t;
    return e.nodeName === "CODE" && !n;
  },
  replacement: function(e) {
    if (!e) return "";
    e = e.replace(/\r?\n|\r/g, " ");
    for (var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "", n = "`", r = e.match(/`+/gm) || []; r.indexOf(n) !== -1; ) n = n + "`";
    return n + t + e + t + n;
  }
};
We.image = {
  filter: "img",
  replacement: function(e, t) {
    var n = bo(t.getAttribute("alt")), r = t.getAttribute("src") || "", o = bo(t.getAttribute("title")), s = o ? ' "' + o + '"' : "";
    return r ? "![" + n + "](" + r + s + ")" : "";
  }
};
function bo(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function Kd(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = {
    replacement: e.blankReplacement
  }, this.keepReplacement = e.keepReplacement, this.defaultRule = {
    replacement: e.defaultReplacement
  }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
Kd.prototype = {
  add: function(e, t) {
    this.array.unshift(t);
  },
  keep: function(e) {
    this._keep.unshift({
      filter: e,
      replacement: this.keepReplacement
    });
  },
  remove: function(e) {
    this._remove.unshift({
      filter: e,
      replacement: function() {
        return "";
      }
    });
  },
  forNode: function(e) {
    if (e.isBlank) return this.blankRule;
    var t;
    return (t = Ps(this.array, e, this.options)) || (t = Ps(this._keep, e, this.options)) || (t = Ps(this._remove, e, this.options)) ? t : this.defaultRule;
  },
  forEach: function(e) {
    for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
  }
};
function Ps(e, t, n) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r];
    if (D1(o, t, n)) return o;
  }
}
function D1(e, t, n) {
  var r = e.filter;
  if (typeof r == "string") {
    if (r === t.nodeName.toLowerCase()) return !0;
  } else if (Array.isArray(r)) {
    if (r.indexOf(t.nodeName.toLowerCase()) > -1) return !0;
  } else if (typeof r == "function") {
    if (r.call(e, t, n)) return !0;
  } else
    throw new TypeError("`filter` needs to be a string, array, or function");
}
function N1(e) {
  var t = e.element, n = e.isBlock, r = e.isVoid, o = e.isPre || function(d) {
    return d.nodeName === "PRE";
  };
  if (!(!t.firstChild || o(t))) {
    for (var s = null, a = !1, i = null, l = Pl(i, t, o); l !== t; ) {
      if (l.nodeType === 3 || l.nodeType === 4) {
        var u = l.data.replace(/[ \r\n\t]+/g, " ");
        if ((!s || / $/.test(s.data)) && !a && u[0] === " " && (u = u.substr(1)), !u) {
          l = Ls(l);
          continue;
        }
        l.data = u, s = l;
      } else if (l.nodeType === 1)
        n(l) || l.nodeName === "BR" ? (s && (s.data = s.data.replace(/ $/, "")), s = null, a = !1) : r(l) || o(l) ? (s = null, a = !0) : s && (a = !1);
      else {
        l = Ls(l);
        continue;
      }
      var c = Pl(i, l, o);
      i = l, l = c;
    }
    s && (s.data = s.data.replace(/ $/, ""), s.data || Ls(s));
  }
}
function Ls(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function Pl(e, t, n) {
  return e && e.parentNode === t || n(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var ti = typeof window < "u" ? window : {};
function R1() {
  var e = ti.DOMParser, t = !1;
  try {
    new e().parseFromString("", "text/html") && (t = !0);
  } catch {
  }
  return t;
}
function A1() {
  var e = function() {
  };
  return P1() ? e.prototype.parseFromString = function(t) {
    var n = new window.ActiveXObject("htmlfile");
    return n.designMode = "on", n.open(), n.write(t), n.close(), n;
  } : e.prototype.parseFromString = function(t) {
    var n = document.implementation.createHTMLDocument("");
    return n.open(), n.write(t), n.close(), n;
  }, e;
}
function P1() {
  var e = !1;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    ti.ActiveXObject && (e = !0);
  }
  return e;
}
var L1 = R1() ? ti.DOMParser : A1();
function I1(e, t) {
  var n;
  if (typeof e == "string") {
    var r = O1().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + e + "</x-turndown>",
      "text/html"
    );
    n = r.getElementById("turndown-root");
  } else
    n = e.cloneNode(!0);
  return N1({
    element: n,
    isBlock: Ja,
    isVoid: Yd,
    isPre: t.preformattedCode ? _1 : null
  }), n;
}
var Is;
function O1() {
  return Is = Is || new L1(), Is;
}
function _1(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function $1(e, t) {
  return e.isBlock = Ja(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = z1(e), e.flankingWhitespace = B1(e, t), e;
}
function z1(e) {
  return !Yd(e) && !M1(e) && /^\s*$/i.test(e.textContent) && !T1(e) && !E1(e);
}
function B1(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode)
    return { leading: "", trailing: "" };
  var n = H1(e.textContent);
  return n.leadingAscii && Ll("left", e, t) && (n.leading = n.leadingNonAscii), n.trailingAscii && Ll("right", e, t) && (n.trailing = n.trailingNonAscii), { leading: n.leading, trailing: n.trailing };
}
function H1(e) {
  var t = e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return {
    leading: t[1],
    // whole string for whitespace-only strings
    leadingAscii: t[2],
    leadingNonAscii: t[3],
    trailing: t[4],
    // empty for whitespace-only strings
    trailingNonAscii: t[5],
    trailingAscii: t[6]
  };
}
function Ll(e, t, n) {
  var r, o, s;
  return e === "left" ? (r = t.previousSibling, o = / $/) : (r = t.nextSibling, o = /^ /), r && (r.nodeType === 3 ? s = o.test(r.nodeValue) : n.preformattedCode && r.nodeName === "CODE" ? s = !1 : r.nodeType === 1 && !Ja(r) && (s = o.test(r.textContent))), s;
}
var W1 = Array.prototype.reduce, F1 = [
  [/\\/g, "\\\\"],
  [/\*/g, "\\*"],
  [/^-/g, "\\-"],
  [/^\+ /g, "\\+ "],
  [/^(=+)/g, "\\$1"],
  [/^(#{1,6}) /g, "\\$1 "],
  [/`/g, "\\`"],
  [/^~~~/g, "\\~~~"],
  [/\[/g, "\\["],
  [/\]/g, "\\]"],
  [/^>/g, "\\>"],
  [/_/g, "\\_"],
  [/^(\d+)\. /g, "$1\\. "]
];
function vo(e) {
  if (!(this instanceof vo)) return new vo(e);
  var t = {
    rules: We,
    headingStyle: "setext",
    hr: "* * *",
    bulletListMarker: "*",
    codeBlockStyle: "indented",
    fence: "```",
    emDelimiter: "_",
    strongDelimiter: "**",
    linkStyle: "inlined",
    linkReferenceStyle: "full",
    br: "  ",
    preformattedCode: !1,
    blankReplacement: function(n, r) {
      return r.isBlock ? `

` : "";
    },
    keepReplacement: function(n, r) {
      return r.isBlock ? `

` + r.outerHTML + `

` : r.outerHTML;
    },
    defaultReplacement: function(n, r) {
      return r.isBlock ? `

` + n + `

` : n;
    }
  };
  this.options = C1({}, t, e), this.rules = new Kd(this.options);
}
vo.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */
  turndown: function(e) {
    if (!j1(e))
      throw new TypeError(
        e + " is not a string, or an element/document/fragment node."
      );
    if (e === "") return "";
    var t = qd.call(this, new I1(e, this.options));
    return U1.call(this, t);
  },
  /**
   * Add one or more plugins
   * @public
   * @param {Function|Array} plugin The plugin or array of plugins to add
   * @returns The Turndown instance for chaining
   * @type Object
   */
  use: function(e) {
    if (Array.isArray(e))
      for (var t = 0; t < e.length; t++) this.use(e[t]);
    else if (typeof e == "function")
      e(this);
    else
      throw new TypeError("plugin must be a Function or an Array of Functions");
    return this;
  },
  /**
   * Adds a rule
   * @public
   * @param {String} key The unique key of the rule
   * @param {Object} rule The rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  addRule: function(e, t) {
    return this.rules.add(e, t), this;
  },
  /**
   * Keep a node (as HTML) that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  keep: function(e) {
    return this.rules.keep(e), this;
  },
  /**
   * Remove a node that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  remove: function(e) {
    return this.rules.remove(e), this;
  },
  /**
   * Escapes Markdown syntax
   * @public
   * @param {String} string The string to escape
   * @returns A string with Markdown syntax escaped
   * @type String
   */
  escape: function(e) {
    return F1.reduce(function(t, n) {
      return t.replace(n[0], n[1]);
    }, e);
  }
};
function qd(e) {
  var t = this;
  return W1.call(e.childNodes, function(n, r) {
    r = new $1(r, t.options);
    var o = "";
    return r.nodeType === 3 ? o = r.isCode ? r.nodeValue : t.escape(r.nodeValue) : r.nodeType === 1 && (o = Y1.call(t, r)), Gd(n, o);
  }, "");
}
function U1(e) {
  var t = this;
  return this.rules.forEach(function(n) {
    typeof n.append == "function" && (e = Gd(e, n.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function Y1(e) {
  var t = this.rules.forNode(e), n = qd.call(this, e), r = e.flankingWhitespace;
  return (r.leading || r.trailing) && (n = n.trim()), r.leading + t.replacement(n, e, this.options) + r.trailing;
}
function Gd(e, t) {
  var n = Wd(e), r = Hd(t), o = Math.max(e.length - n.length, t.length - r.length), s = `

`.substring(0, o);
  return n + s + r;
}
function j1(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
var Il = /highlight-(?:text|source)-([a-z0-9]+)/;
function V1(e) {
  e.addRule("highlightedCodeBlock", {
    filter: function(t) {
      var n = t.firstChild;
      return t.nodeName === "DIV" && Il.test(t.className) && n && n.nodeName === "PRE";
    },
    replacement: function(t, n, r) {
      var o = n.className || "", s = (o.match(Il) || [null, ""])[1];
      return `

` + r.fence + s + `
` + n.firstChild.textContent + `
` + r.fence + `

`;
    }
  });
}
function K1(e) {
  e.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: function(t) {
      return "~" + t + "~";
    }
  });
}
var q1 = Array.prototype.indexOf, G1 = Array.prototype.every, _n = {};
_n.tableCell = {
  filter: ["th", "td"],
  replacement: function(e, t) {
    return Zd(e, t);
  }
};
_n.tableRow = {
  filter: "tr",
  replacement: function(e, t) {
    var n = "", r = { left: ":--", right: "--:", center: ":-:" };
    if (ni(t))
      for (var o = 0; o < t.childNodes.length; o++) {
        var s = "---", a = (t.childNodes[o].getAttribute("align") || "").toLowerCase();
        a && (s = r[a] || s), n += Zd(s, t.childNodes[o]);
      }
    return `
` + e + (n ? `
` + n : "");
  }
};
_n.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function(e) {
    return e.nodeName === "TABLE" && ni(e.rows[0]);
  },
  replacement: function(e) {
    return e = e.replace(`

`, `
`), `

` + e + `

`;
  }
};
_n.tableSection = {
  filter: ["thead", "tbody", "tfoot"],
  replacement: function(e) {
    return e;
  }
};
function ni(e) {
  var t = e.parentNode;
  return t.nodeName === "THEAD" || t.firstChild === e && (t.nodeName === "TABLE" || Z1(t)) && G1.call(e.childNodes, function(n) {
    return n.nodeName === "TH";
  });
}
function Z1(e) {
  var t = e.previousSibling;
  return e.nodeName === "TBODY" && (!t || t.nodeName === "THEAD" && /^\s*$/i.test(t.textContent));
}
function Zd(e, t) {
  var n = q1.call(t.parentNode.childNodes, t), r = " ";
  return n === 0 && (r = "| "), r + e + " |";
}
function X1(e) {
  e.keep(function(n) {
    return n.nodeName === "TABLE" && !ni(n.rows[0]);
  });
  for (var t in _n) e.addRule(t, _n[t]);
}
function Q1(e) {
  e.addRule("taskListItems", {
    filter: function(t) {
      return t.type === "checkbox" && t.parentNode.nodeName === "LI";
    },
    replacement: function(t, n) {
      return (n.checked ? "[x]" : "[ ]") + " ";
    }
  });
}
function J1(e) {
  e.use([
    V1,
    K1,
    X1,
    Q1
  ]);
}
function eC() {
  return rn(() => {
    const e = new vo({
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
      blankReplacement: (t, n) => n.nodeName === "P" ? `

​

` : n.isBlock ? `

` : ""
    });
    return e.use(J1), e.addRule("highlight", {
      filter: (t) => t.nodeName === "MARK",
      replacement: (t) => `==${t}==`
    }), e.addRule("resizableImage", {
      filter: "img",
      replacement: (t, n) => {
        const r = n, o = r.getAttribute("src") || "", a = (r.getAttribute("alt") || "").replace(/\s*\|\s*\d+\s*$/, "").trim(), i = r.getAttribute("width"), l = i ? parseInt(i, 10) : null;
        return l && l > 0 ? `![${a}|${l}](${o})` : `![${a}](${o})`;
      }
    }), e.addRule("taskListItem", {
      filter: (t) => t.nodeName === "LI" && t.getAttribute("data-type") === "taskItem",
      replacement: (t, n) => {
        const r = n, o = r.querySelector('input[type="checkbox"]'), s = o?.hasAttribute("checked") || o?.checked || r.getAttribute("data-checked") === "true";
        return t = t.replace(/^\n+/, "").replace(/\n+$/, "").replace(/\n\n+/g, `

`), t = t.replace(/\n\n(- |\d+\. )/g, `
$1`), t = t.replace(/\u200B/g, "").trim(), `- [${s ? "x" : " "}] ` + (t || "​").replace(/\n/gm, `
    `) + `
`;
      }
    }), e.addRule("tightListParagraph", {
      filter: (t) => t.nodeName === "P" && t.parentNode !== null && t.parentNode.nodeName === "LI",
      replacement: (t) => t
    }), e.addRule("blankLinePreservation", {
      filter: (t) => t.nodeName === "P" && (t.textContent === "" || t.textContent === "​") && t.parentNode !== null && t.parentNode.nodeName !== "LI",
      replacement: () => `

​

`
    }), e.addRule("table", {
      filter: "table",
      replacement: function(t, n) {
        const r = n, o = Array.from(r.querySelectorAll("tr"));
        if (o.length === 0) return "";
        const s = [];
        return o.forEach((a, i) => {
          const l = Array.from(a.querySelectorAll("th, td")), u = l.map((c) => (c.textContent?.trim() || "").replace(/\|/g, "\\|"));
          if (s.push("| " + u.join(" | ") + " |"), i === 0) {
            const c = l.map(() => "---").join(" | ");
            s.push("| " + c + " |");
          }
        }), `

` + s.join(`
`) + `

`;
      }
    }), e.addRule("tableCell", {
      filter: ["th", "td"],
      replacement: function(t) {
        return t;
      }
    }), e.addRule("datePill", {
      filter: (t) => t.nodeName === "SPAN" && t.getAttribute("data-type") === "date-pill",
      replacement: (t, n) => {
        const r = n.getAttribute("data-date");
        return r ? `@${Eb(r)}@` : t;
      }
    }), e.addRule("tagPill", {
      filter: (t) => t.nodeName === "SPAN" && t.getAttribute("data-type") === "tag-pill",
      replacement: (t, n) => {
        const r = n.getAttribute("data-tag");
        return r ? `#${r}` : t;
      }
    }), e.addRule("wikiLink", {
      filter: (t) => t.nodeName === "SPAN" && t.hasAttribute("data-wiki-link"),
      replacement: (t, n) => {
        const r = n.getAttribute("data-page-name");
        return r ? `[[${r}]]` : t;
      }
    }), e.addRule("callout", {
      filter: (t) => t.nodeName === "DIV" && t.hasAttribute("data-callout"),
      replacement: (t, n) => {
        const r = n.getAttribute("data-type") || "info", o = t.trim().replace(/\n{3,}/g, `

`);
        return `

\`\`\`ad-${r}
${o}
\`\`\`

`;
      }
    }), e;
  }, []);
}
function ri() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var un = ri();
function Xd(e) {
  un = e;
}
var fr = { exec: () => null };
function ge(e, t = "") {
  let n = typeof e == "string" ? e : e.source, r = { replace: (o, s) => {
    let a = typeof s == "string" ? s : s.source;
    return a = a.replace(Ue.caret, "$1"), n = n.replace(o, a), r;
  }, getRegex: () => new RegExp(n, t) };
  return r;
}
var tC = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), Ue = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`), htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i") }, nC = /^(?:[ \t]*(?:\n|$))+/, rC = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, oC = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Rr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, sC = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, oi = /(?:[*+-]|\d{1,9}[.)])/, Qd = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Jd = ge(Qd).replace(/bull/g, oi).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), aC = ge(Qd).replace(/bull/g, oi).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), si = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, iC = /^[^\n]+/, ai = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, lC = ge(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ai).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), cC = ge(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, oi).getRegex(), Uo = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ii = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, uC = ge("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ii).replace("tag", Uo).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ef = ge(si).replace("hr", Rr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Uo).getRegex(), dC = ge(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ef).getRegex(), li = { blockquote: dC, code: rC, def: lC, fences: oC, heading: sC, hr: Rr, html: uC, lheading: Jd, list: cC, newline: nC, paragraph: ef, table: fr, text: iC }, Ol = ge("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Rr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Uo).getRegex(), fC = { ...li, lheading: aC, table: Ol, paragraph: ge(si).replace("hr", Rr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ol).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Uo).getRegex() }, pC = { ...li, html: ge(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ii).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: fr, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: ge(si).replace("hr", Rr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Jd).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, hC = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, mC = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, tf = /^( {2,}|\\)\n(?!\s*$)/, gC = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Yo = /[\p{P}\p{S}]/u, ci = /[\s\p{P}\p{S}]/u, nf = /[^\s\p{P}\p{S}]/u, yC = ge(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ci).getRegex(), rf = /(?!~)[\p{P}\p{S}]/u, bC = /(?!~)[\s\p{P}\p{S}]/u, vC = /(?:[^\s\p{P}\p{S}]|~)/u, wC = ge(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", tC ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), of = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, kC = ge(of, "u").replace(/punct/g, Yo).getRegex(), xC = ge(of, "u").replace(/punct/g, rf).getRegex(), sf = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", CC = ge(sf, "gu").replace(/notPunctSpace/g, nf).replace(/punctSpace/g, ci).replace(/punct/g, Yo).getRegex(), SC = ge(sf, "gu").replace(/notPunctSpace/g, vC).replace(/punctSpace/g, bC).replace(/punct/g, rf).getRegex(), TC = ge("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, nf).replace(/punctSpace/g, ci).replace(/punct/g, Yo).getRegex(), MC = ge(/\\(punct)/, "gu").replace(/punct/g, Yo).getRegex(), EC = ge(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), DC = ge(ii).replace("(?:-->|$)", "-->").getRegex(), NC = ge("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", DC).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), wo = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, RC = ge(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", wo).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), af = ge(/^!?\[(label)\]\[(ref)\]/).replace("label", wo).replace("ref", ai).getRegex(), lf = ge(/^!?\[(ref)\](?:\[\])?/).replace("ref", ai).getRegex(), AC = ge("reflink|nolink(?!\\()", "g").replace("reflink", af).replace("nolink", lf).getRegex(), _l = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, ui = { _backpedal: fr, anyPunctuation: MC, autolink: EC, blockSkip: wC, br: tf, code: mC, del: fr, emStrongLDelim: kC, emStrongRDelimAst: CC, emStrongRDelimUnd: TC, escape: hC, link: RC, nolink: lf, punctuation: yC, reflink: af, reflinkSearch: AC, tag: NC, text: gC, url: fr }, PC = { ...ui, link: ge(/^!?\[(label)\]\((.*?)\)/).replace("label", wo).getRegex(), reflink: ge(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", wo).getRegex() }, oa = { ...ui, emStrongRDelimAst: SC, emStrongLDelim: xC, url: ge(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", _l).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: ge(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", _l).getRegex() }, LC = { ...oa, br: ge(tf).replace("{2,}", "*").getRegex(), text: ge(oa.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, no = { normal: li, gfm: fC, pedantic: pC }, nr = { normal: ui, gfm: oa, breaks: LC, pedantic: PC }, IC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, $l = (e) => IC[e];
function Mt(e, t) {
  if (t) {
    if (Ue.escapeTest.test(e)) return e.replace(Ue.escapeReplace, $l);
  } else if (Ue.escapeTestNoEncode.test(e)) return e.replace(Ue.escapeReplaceNoEncode, $l);
  return e;
}
function zl(e) {
  try {
    e = encodeURI(e).replace(Ue.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Bl(e, t) {
  let n = e.replace(Ue.findPipe, (s, a, i) => {
    let l = !1, u = a;
    for (; --u >= 0 && i[u] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), r = n.split(Ue.splitPipe), o = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !r.at(-1)?.trim() && r.pop(), t) if (r.length > t) r.splice(t);
  else for (; r.length < t; ) r.push("");
  for (; o < r.length; o++) r[o] = r[o].trim().replace(Ue.slashPipe, "|");
  return r;
}
function rr(e, t, n) {
  let r = e.length;
  if (r === 0) return "";
  let o = 0;
  for (; o < r && e.charAt(r - o - 1) === t; )
    o++;
  return e.slice(0, r - o);
}
function OC(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
  else if (e[r] === t[0]) n++;
  else if (e[r] === t[1] && (n--, n < 0)) return r;
  return n > 0 ? -2 : -1;
}
function Hl(e, t, n, r, o) {
  let s = t.href, a = t.title || null, i = e[1].replace(o.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let l = { type: e[0].charAt(0) === "!" ? "image" : "link", raw: n, href: s, title: a, text: i, tokens: r.inlineTokens(i) };
  return r.state.inLink = !1, l;
}
function _C(e, t, n) {
  let r = e.match(n.other.indentCodeCompensation);
  if (r === null) return t;
  let o = r[1];
  return t.split(`
`).map((s) => {
    let a = s.match(n.other.beginningSpace);
    if (a === null) return s;
    let [i] = a;
    return i.length >= o.length ? s.slice(o.length) : s;
  }).join(`
`);
}
var ko = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || un;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : rr(n, `
`) };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], r = _C(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: r };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let r = rr(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: rr(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = rr(t[0], `
`).split(`
`), r = "", o = "", s = [];
      for (; n.length > 0; ) {
        let a = !1, i = [], l;
        for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) i.push(n[l]), a = !0;
        else if (!a) i.push(n[l]);
        else break;
        n = n.slice(l);
        let u = i.join(`
`), c = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${u}` : u, o = o ? `${o}
${c}` : c;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, s, !0), this.lexer.state.top = d, n.length === 0) break;
        let p = s.at(-1);
        if (p?.type === "code") break;
        if (p?.type === "blockquote") {
          let h = p, m = h.raw + `
` + n.join(`
`), g = this.blockquote(m);
          s[s.length - 1] = g, r = r.substring(0, r.length - h.raw.length) + g.raw, o = o.substring(0, o.length - h.text.length) + g.text;
          break;
        } else if (p?.type === "list") {
          let h = p, m = h.raw + `
` + n.join(`
`), g = this.list(m);
          s[s.length - 1] = g, r = r.substring(0, r.length - p.raw.length) + g.raw, o = o.substring(0, o.length - h.raw.length) + g.raw, n = m.substring(s.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r, tokens: s, text: o };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim(), r = n.length > 1, o = { type: "list", raw: "", ordered: r, start: r ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
      let s = this.rules.other.listItemRegex(n), a = !1;
      for (; e; ) {
        let l = !1, u = "", c = "";
        if (!(t = s.exec(e)) || this.rules.block.hr.test(e)) break;
        u = t[0], e = e.substring(u.length);
        let d = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (g) => " ".repeat(3 * g.length)), p = e.split(`
`, 1)[0], h = !d.trim(), m = 0;
        if (this.options.pedantic ? (m = 2, c = d.trimStart()) : h ? m = t[1].length + 1 : (m = t[2].search(this.rules.other.nonSpaceChar), m = m > 4 ? 1 : m, c = d.slice(m), m += t[1].length), h && this.rules.other.blankLine.test(p) && (u += p + `
`, e = e.substring(p.length + 1), l = !0), !l) {
          let g = this.rules.other.nextBulletRegex(m), y = this.rules.other.hrRegex(m), v = this.rules.other.fencesBeginRegex(m), b = this.rules.other.headingBeginRegex(m), w = this.rules.other.htmlBeginRegex(m);
          for (; e; ) {
            let E = e.split(`
`, 1)[0], x;
            if (p = E, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), x = p) : x = p.replace(this.rules.other.tabCharGlobal, "    "), v.test(p) || b.test(p) || w.test(p) || g.test(p) || y.test(p)) break;
            if (x.search(this.rules.other.nonSpaceChar) >= m || !p.trim()) c += `
` + x.slice(m);
            else {
              if (h || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || v.test(d) || b.test(d) || y.test(d)) break;
              c += `
` + p;
            }
            !h && !p.trim() && (h = !0), u += E + `
`, e = e.substring(E.length + 1), d = x.slice(m);
          }
        }
        o.loose || (a ? o.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (a = !0)), o.items.push({ type: "list_item", raw: u, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: !1, text: c, tokens: [] }), o.raw += u;
      }
      let i = o.items.at(-1);
      if (i) i.raw = i.raw.trimEnd(), i.text = i.text.trimEnd();
      else return;
      o.raw = o.raw.trimEnd();
      for (let l of o.items) {
        if (this.lexer.state.top = !1, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
          if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
            l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let c = this.lexer.inlineQueue.length - 1; c >= 0; c--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)) {
              this.lexer.inlineQueue[c].src = this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let u = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (u) {
            let c = { type: "checkbox", raw: u[0] + " ", checked: u[0] !== "[ ]" };
            l.checked = c.checked, o.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c.raw + l.tokens[0].raw, l.tokens[0].text = c.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c)) : l.tokens.unshift({ type: "paragraph", raw: c.raw, text: c.raw, tokens: [c] }) : l.tokens.unshift(c);
          }
        }
        if (!o.loose) {
          let u = l.tokens.filter((d) => d.type === "space"), c = u.length > 0 && u.some((d) => this.rules.other.anyLine.test(d.raw));
          o.loose = c;
        }
      }
      if (o.loose) for (let l of o.items) {
        l.loose = !0;
        for (let u of l.tokens) u.type === "text" && (u.type = "paragraph");
      }
      return o;
    }
  }
  html(e) {
    let t = this.rules.block.html.exec(e);
    if (t) return { type: "html", block: !0, raw: t[0], pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: t[0] };
  }
  def(e) {
    let t = this.rules.block.def.exec(e);
    if (t) {
      let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", o = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return { type: "def", tag: n, raw: t[0], href: r, title: o };
    }
  }
  table(e) {
    let t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let n = Bl(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), o = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let a of r) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
      for (let a = 0; a < n.length; a++) s.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: !0, align: s.align[a] });
      for (let a of o) s.rows.push(Bl(a, s.header.length).map((i, l) => ({ text: i, tokens: this.lexer.inline(i), header: !1, align: s.align[l] })));
      return s;
    }
  }
  lheading(e) {
    let t = this.rules.block.lheading.exec(e);
    if (t) return { type: "heading", raw: t[0], depth: t[2].charAt(0) === "=" ? 1 : 2, text: t[1], tokens: this.lexer.inline(t[1]) };
  }
  paragraph(e) {
    let t = this.rules.block.paragraph.exec(e);
    if (t) {
      let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
    }
  }
  text(e) {
    let t = this.rules.block.text.exec(e);
    if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
  }
  escape(e) {
    let t = this.rules.inline.escape.exec(e);
    if (t) return { type: "escape", raw: t[0], text: t[1] };
  }
  tag(e) {
    let t = this.rules.inline.tag.exec(e);
    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: t[0] };
  }
  link(e) {
    let t = this.rules.inline.link.exec(e);
    if (t) {
      let n = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n)) return;
        let s = rr(n.slice(0, -1), "\\");
        if ((n.length - s.length) % 2 === 0) return;
      } else {
        let s = OC(t[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
          t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let r = t[2], o = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(r);
        s && (r = s[1], o = s[3]);
      } else o = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), Hl(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), o = t[r.toLowerCase()];
      if (!o) {
        let s = n[0].charAt(0);
        return { type: "text", raw: s, text: s };
      }
      return Hl(n, o, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!(!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[2]) || !n || this.rules.inline.punctuation.exec(n))) {
      let o = [...r[0]].length - 1, s, a, i = o, l = 0, u = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (u.lastIndex = 0, t = t.slice(-1 * e.length + o); (r = u.exec(t)) != null; ) {
        if (s = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !s) continue;
        if (a = [...s].length, r[3] || r[4]) {
          i += a;
          continue;
        } else if ((r[5] || r[6]) && o % 3 && !((o + a) % 3)) {
          l += a;
          continue;
        }
        if (i -= a, i > 0) continue;
        a = Math.min(a, a + i + l);
        let c = [...r[0]][0].length, d = e.slice(0, o + r.index + c + a);
        if (Math.min(o, a) % 2) {
          let h = d.slice(1, -1);
          return { type: "em", raw: d, text: h, tokens: this.lexer.inlineTokens(h) };
        }
        let p = d.slice(2, -2);
        return { type: "strong", raw: d, text: p, tokens: this.lexer.inlineTokens(p) };
      }
    }
  }
  codespan(e) {
    let t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(n), o = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return r && o && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
    }
  }
  br(e) {
    let t = this.rules.inline.br.exec(e);
    if (t) return { type: "br", raw: t[0] };
  }
  del(e) {
    let t = this.rules.inline.del.exec(e);
    if (t) return { type: "del", raw: t[0], text: t[2], tokens: this.lexer.inlineTokens(t[2]) };
  }
  autolink(e) {
    let t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, r;
      return t[2] === "@" ? (n = t[1], r = "mailto:" + n) : (n = t[1], r = n), { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, r;
      if (t[2] === "@") n = t[0], r = "mailto:" + n;
      else {
        let o;
        do
          o = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (o !== t[0]);
        n = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(e) {
    let t = this.rules.inline.text.exec(e);
    if (t) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: t[0], escaped: n };
    }
  }
}, rt = class sa {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || un, this.options.tokenizer = this.options.tokenizer || new ko(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: Ue, block: no.normal, inline: nr.normal };
    this.options.pedantic ? (n.block = no.pedantic, n.inline = nr.pedantic) : this.options.gfm && (n.block = no.gfm, this.options.breaks ? n.inline = nr.breaks : n.inline = nr.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: no, inline: nr };
  }
  static lex(t, n) {
    return new sa(n).lex(t);
  }
  static lexInline(t, n) {
    return new sa(n).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(Ue.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], r = !1) {
    for (this.options.pedantic && (t = t.replace(Ue.tabCharGlobal, "    ").replace(Ue.spaceLine, "")); t; ) {
      let o;
      if (this.options.extensions?.block?.some((a) => (o = a.call({ lexer: this }, t, n)) ? (t = t.substring(o.raw.length), n.push(o), !0) : !1)) continue;
      if (o = this.tokenizer.space(t)) {
        t = t.substring(o.raw.length);
        let a = n.at(-1);
        o.raw.length === 1 && a !== void 0 ? a.raw += `
` : n.push(o);
        continue;
      }
      if (o = this.tokenizer.code(t)) {
        t = t.substring(o.raw.length);
        let a = n.at(-1);
        a?.type === "paragraph" || a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + o.raw, a.text += `
` + o.text, this.inlineQueue.at(-1).src = a.text) : n.push(o);
        continue;
      }
      if (o = this.tokenizer.fences(t)) {
        t = t.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.heading(t)) {
        t = t.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.hr(t)) {
        t = t.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.blockquote(t)) {
        t = t.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.list(t)) {
        t = t.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.html(t)) {
        t = t.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.def(t)) {
        t = t.substring(o.raw.length);
        let a = n.at(-1);
        a?.type === "paragraph" || a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + o.raw, a.text += `
` + o.raw, this.inlineQueue.at(-1).src = a.text) : this.tokens.links[o.tag] || (this.tokens.links[o.tag] = { href: o.href, title: o.title }, n.push(o));
        continue;
      }
      if (o = this.tokenizer.table(t)) {
        t = t.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.lheading(t)) {
        t = t.substring(o.raw.length), n.push(o);
        continue;
      }
      let s = t;
      if (this.options.extensions?.startBlock) {
        let a = 1 / 0, i = t.slice(1), l;
        this.options.extensions.startBlock.forEach((u) => {
          l = u.call({ lexer: this }, i), typeof l == "number" && l >= 0 && (a = Math.min(a, l));
        }), a < 1 / 0 && a >= 0 && (s = t.substring(0, a + 1));
      }
      if (this.state.top && (o = this.tokenizer.paragraph(s))) {
        let a = n.at(-1);
        r && a?.type === "paragraph" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + o.raw, a.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : n.push(o), r = s.length !== t.length, t = t.substring(o.raw.length);
        continue;
      }
      if (o = this.tokenizer.text(t)) {
        t = t.substring(o.raw.length);
        let a = n.at(-1);
        a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + o.raw, a.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : n.push(o);
        continue;
      }
      if (t) {
        let a = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(a);
          break;
        } else throw new Error(a);
      }
    }
    return this.state.top = !0, n;
  }
  inline(t, n = []) {
    return this.inlineQueue.push({ src: t, tokens: n }), n;
  }
  inlineTokens(t, n = []) {
    let r = t, o = null;
    if (this.tokens.links) {
      let l = Object.keys(this.tokens.links);
      if (l.length > 0) for (; (o = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; ) l.includes(o[0].slice(o[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, o.index) + "[" + "a".repeat(o[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (o = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; ) r = r.slice(0, o.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let s;
    for (; (o = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; ) s = o[2] ? o[2].length : 0, r = r.slice(0, o.index + s) + "[" + "a".repeat(o[0].length - s - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    r = this.options.hooks?.emStrongMask?.call({ lexer: this }, r) ?? r;
    let a = !1, i = "";
    for (; t; ) {
      a || (i = ""), a = !1;
      let l;
      if (this.options.extensions?.inline?.some((c) => (l = c.call({ lexer: this }, t, n)) ? (t = t.substring(l.raw.length), n.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.escape(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.tag(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.link(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(l.raw.length);
        let c = n.at(-1);
        l.type === "text" && c?.type === "text" ? (c.raw += l.raw, c.text += l.text) : n.push(l);
        continue;
      }
      if (l = this.tokenizer.emStrong(t, r, i)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.codespan(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.br(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.del(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.autolink(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (!this.state.inLink && (l = this.tokenizer.url(t))) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      let u = t;
      if (this.options.extensions?.startInline) {
        let c = 1 / 0, d = t.slice(1), p;
        this.options.extensions.startInline.forEach((h) => {
          p = h.call({ lexer: this }, d), typeof p == "number" && p >= 0 && (c = Math.min(c, p));
        }), c < 1 / 0 && c >= 0 && (u = t.substring(0, c + 1));
      }
      if (l = this.tokenizer.inlineText(u)) {
        t = t.substring(l.raw.length), l.raw.slice(-1) !== "_" && (i = l.raw.slice(-1)), a = !0;
        let c = n.at(-1);
        c?.type === "text" ? (c.raw += l.raw, c.text += l.text) : n.push(l);
        continue;
      }
      if (t) {
        let c = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(c);
          break;
        } else throw new Error(c);
      }
    }
    return n;
  }
}, xo = class {
  options;
  parser;
  constructor(e) {
    this.options = e || un;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let r = (t || "").match(Ue.notSpaceStart)?.[0], o = e.replace(Ue.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + Mt(r) + '">' + (n ? o : Mt(o, !0)) + `</code></pre>
` : "<pre><code>" + (n ? o : Mt(o, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  def(e) {
    return "";
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    let t = e.ordered, n = e.start, r = "";
    for (let a = 0; a < e.items.length; a++) {
      let i = e.items[a];
      r += this.listitem(i);
    }
    let o = t ? "ol" : "ul", s = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + o + s + `>
` + r + "</" + o + `>
`;
  }
  listitem(e) {
    return `<li>${this.parser.parse(e.tokens)}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let o = 0; o < e.header.length; o++) n += this.tablecell(e.header[o]);
    t += this.tablerow({ text: n });
    let r = "";
    for (let o = 0; o < e.rows.length; o++) {
      let s = e.rows[o];
      n = "";
      for (let a = 0; a < s.length; a++) n += this.tablecell(s[a]);
      r += this.tablerow({ text: n });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${Mt(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    let r = this.parser.parseInline(n), o = zl(e);
    if (o === null) return r;
    e = o;
    let s = '<a href="' + e + '"';
    return t && (s += ' title="' + Mt(t) + '"'), s += ">" + r + "</a>", s;
  }
  image({ href: e, title: t, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let o = zl(e);
    if (o === null) return Mt(n);
    e = o;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${Mt(t)}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Mt(e.text);
  }
}, di = class {
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
  checkbox({ raw: e }) {
    return e;
  }
}, ot = class aa {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || un, this.options.renderer = this.options.renderer || new xo(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new di();
  }
  static parse(t, n) {
    return new aa(n).parse(t);
  }
  static parseInline(t, n) {
    return new aa(n).parseInline(t);
  }
  parse(t) {
    let n = "";
    for (let r = 0; r < t.length; r++) {
      let o = t[r];
      if (this.options.extensions?.renderers?.[o.type]) {
        let a = o, i = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (i !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(a.type)) {
          n += i || "";
          continue;
        }
      }
      let s = o;
      switch (s.type) {
        case "space": {
          n += this.renderer.space(s);
          break;
        }
        case "hr": {
          n += this.renderer.hr(s);
          break;
        }
        case "heading": {
          n += this.renderer.heading(s);
          break;
        }
        case "code": {
          n += this.renderer.code(s);
          break;
        }
        case "table": {
          n += this.renderer.table(s);
          break;
        }
        case "blockquote": {
          n += this.renderer.blockquote(s);
          break;
        }
        case "list": {
          n += this.renderer.list(s);
          break;
        }
        case "checkbox": {
          n += this.renderer.checkbox(s);
          break;
        }
        case "html": {
          n += this.renderer.html(s);
          break;
        }
        case "def": {
          n += this.renderer.def(s);
          break;
        }
        case "paragraph": {
          n += this.renderer.paragraph(s);
          break;
        }
        case "text": {
          n += this.renderer.text(s);
          break;
        }
        default: {
          let a = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return n;
  }
  parseInline(t, n = this.renderer) {
    let r = "";
    for (let o = 0; o < t.length; o++) {
      let s = t[o];
      if (this.options.extensions?.renderers?.[s.type]) {
        let i = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (i !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          r += i || "";
          continue;
        }
      }
      let a = s;
      switch (a.type) {
        case "escape": {
          r += n.text(a);
          break;
        }
        case "html": {
          r += n.html(a);
          break;
        }
        case "link": {
          r += n.link(a);
          break;
        }
        case "image": {
          r += n.image(a);
          break;
        }
        case "checkbox": {
          r += n.checkbox(a);
          break;
        }
        case "strong": {
          r += n.strong(a);
          break;
        }
        case "em": {
          r += n.em(a);
          break;
        }
        case "codespan": {
          r += n.codespan(a);
          break;
        }
        case "br": {
          r += n.br(a);
          break;
        }
        case "del": {
          r += n.del(a);
          break;
        }
        case "text": {
          r += n.text(a);
          break;
        }
        default: {
          let i = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return r;
  }
}, lr = class {
  options;
  block;
  constructor(e) {
    this.options = e || un;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
  processAllTokens(e) {
    return e;
  }
  emStrongMask(e) {
    return e;
  }
  provideLexer() {
    return this.block ? rt.lex : rt.lexInline;
  }
  provideParser() {
    return this.block ? ot.parse : ot.parseInline;
  }
}, $C = class {
  defaults = ri();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = ot;
  Renderer = xo;
  TextRenderer = di;
  Lexer = rt;
  Tokenizer = ko;
  Hooks = lr;
  constructor(...e) {
    this.use(...e);
  }
  walkTokens(e, t) {
    let n = [];
    for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
      case "table": {
        let o = r;
        for (let s of o.header) n = n.concat(this.walkTokens(s.tokens, t));
        for (let s of o.rows) for (let a of s) n = n.concat(this.walkTokens(a.tokens, t));
        break;
      }
      case "list": {
        let o = r;
        n = n.concat(this.walkTokens(o.items, t));
        break;
      }
      default: {
        let o = r;
        this.defaults.extensions?.childTokens?.[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((s) => {
          let a = o[s].flat(1 / 0);
          n = n.concat(this.walkTokens(a, t));
        }) : o.tokens && (n = n.concat(this.walkTokens(o.tokens, t)));
      }
    }
    return n;
  }
  use(...e) {
    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      let r = { ...n };
      if (r.async = this.defaults.async || r.async || !1, n.extensions && (n.extensions.forEach((o) => {
        if (!o.name) throw new Error("extension name required");
        if ("renderer" in o) {
          let s = t.renderers[o.name];
          s ? t.renderers[o.name] = function(...a) {
            let i = o.renderer.apply(this, a);
            return i === !1 && (i = s.apply(this, a)), i;
          } : t.renderers[o.name] = o.renderer;
        }
        if ("tokenizer" in o) {
          if (!o.level || o.level !== "block" && o.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s = t[o.level];
          s ? s.unshift(o.tokenizer) : t[o.level] = [o.tokenizer], o.start && (o.level === "block" ? t.startBlock ? t.startBlock.push(o.start) : t.startBlock = [o.start] : o.level === "inline" && (t.startInline ? t.startInline.push(o.start) : t.startInline = [o.start]));
        }
        "childTokens" in o && o.childTokens && (t.childTokens[o.name] = o.childTokens);
      }), r.extensions = t), n.renderer) {
        let o = this.defaults.renderer || new xo(this.defaults);
        for (let s in n.renderer) {
          if (!(s in o)) throw new Error(`renderer '${s}' does not exist`);
          if (["options", "parser"].includes(s)) continue;
          let a = s, i = n.renderer[a], l = o[a];
          o[a] = (...u) => {
            let c = i.apply(o, u);
            return c === !1 && (c = l.apply(o, u)), c || "";
          };
        }
        r.renderer = o;
      }
      if (n.tokenizer) {
        let o = this.defaults.tokenizer || new ko(this.defaults);
        for (let s in n.tokenizer) {
          if (!(s in o)) throw new Error(`tokenizer '${s}' does not exist`);
          if (["options", "rules", "lexer"].includes(s)) continue;
          let a = s, i = n.tokenizer[a], l = o[a];
          o[a] = (...u) => {
            let c = i.apply(o, u);
            return c === !1 && (c = l.apply(o, u)), c;
          };
        }
        r.tokenizer = o;
      }
      if (n.hooks) {
        let o = this.defaults.hooks || new lr();
        for (let s in n.hooks) {
          if (!(s in o)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let a = s, i = n.hooks[a], l = o[a];
          lr.passThroughHooks.has(s) ? o[a] = (u) => {
            if (this.defaults.async && lr.passThroughHooksRespectAsync.has(s)) return (async () => {
              let d = await i.call(o, u);
              return l.call(o, d);
            })();
            let c = i.call(o, u);
            return l.call(o, c);
          } : o[a] = (...u) => {
            if (this.defaults.async) return (async () => {
              let d = await i.apply(o, u);
              return d === !1 && (d = await l.apply(o, u)), d;
            })();
            let c = i.apply(o, u);
            return c === !1 && (c = l.apply(o, u)), c;
          };
        }
        r.hooks = o;
      }
      if (n.walkTokens) {
        let o = this.defaults.walkTokens, s = n.walkTokens;
        r.walkTokens = function(a) {
          let i = [];
          return i.push(s.call(this, a)), o && (i = i.concat(o.call(this, a))), i;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return rt.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return ot.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (t, n) => {
      let r = { ...n }, o = { ...this.defaults, ...r }, s = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && r.async === !1) return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof t > "u" || t === null) return s(new Error("marked(): input parameter is undefined or null"));
      if (typeof t != "string") return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
      if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
        let a = o.hooks ? await o.hooks.preprocess(t) : t, i = await (o.hooks ? await o.hooks.provideLexer() : e ? rt.lex : rt.lexInline)(a, o), l = o.hooks ? await o.hooks.processAllTokens(i) : i;
        o.walkTokens && await Promise.all(this.walkTokens(l, o.walkTokens));
        let u = await (o.hooks ? await o.hooks.provideParser() : e ? ot.parse : ot.parseInline)(l, o);
        return o.hooks ? await o.hooks.postprocess(u) : u;
      })().catch(s);
      try {
        o.hooks && (t = o.hooks.preprocess(t));
        let a = (o.hooks ? o.hooks.provideLexer() : e ? rt.lex : rt.lexInline)(t, o);
        o.hooks && (a = o.hooks.processAllTokens(a)), o.walkTokens && this.walkTokens(a, o.walkTokens);
        let i = (o.hooks ? o.hooks.provideParser() : e ? ot.parse : ot.parseInline)(a, o);
        return o.hooks && (i = o.hooks.postprocess(i)), i;
      } catch (a) {
        return s(a);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        let r = "<p>An error occurred:</p><pre>" + Mt(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
}, sn = new $C();
function ve(e, t) {
  return sn.parse(e, t);
}
ve.options = ve.setOptions = function(e) {
  return sn.setOptions(e), ve.defaults = sn.defaults, Xd(ve.defaults), ve;
};
ve.getDefaults = ri;
ve.defaults = un;
ve.use = function(...e) {
  return sn.use(...e), ve.defaults = sn.defaults, Xd(ve.defaults), ve;
};
ve.walkTokens = function(e, t) {
  return sn.walkTokens(e, t);
};
ve.parseInline = sn.parseInline;
ve.Parser = ot;
ve.parser = ot.parse;
ve.Renderer = xo;
ve.TextRenderer = di;
ve.Lexer = rt;
ve.lexer = rt.lex;
ve.Tokenizer = ko;
ve.Hooks = lr;
ve.parse = ve;
ve.options;
ve.setOptions;
ve.use;
ve.walkTokens;
ve.parseInline;
ot.parse;
rt.lex;
function zC(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (a) => {
    Array.from(a.querySelectorAll("ul")).forEach(o);
    const l = Array.from(a.children).filter((d) => d.tagName === "LI");
    let u = !1, c = !1;
    l.forEach((d) => {
      d.querySelector(':scope > input[type="checkbox"]') ? u = !0 : c = !0;
    }), u && (l.forEach((d) => {
      const p = d.querySelector(':scope > input[type="checkbox"]');
      if (p) {
        const h = p.hasAttribute("checked");
        d.setAttribute("data-type", "taskItem"), d.setAttribute("data-checked", String(h)), p.remove();
        const m = Array.from(d.childNodes), g = [], y = [];
        if (m.forEach((v) => {
          if (v.nodeType === Node.ELEMENT_NODE) {
            const b = v;
            b.tagName === "UL" || b.tagName === "OL" || b.tagName === "P" ? y.push(v) : g.push(v);
          } else
            g.push(v);
        }), d.innerHTML = "", g.length > 0) {
          const v = n.createElement("p");
          g.forEach((b) => v.appendChild(b)), v.firstChild && v.firstChild.nodeType === Node.TEXT_NODE && (v.firstChild.textContent = (v.firstChild.textContent || "").replace(/^\s+/, "")), d.appendChild(v);
        }
        y.forEach((v) => d.appendChild(v));
      }
    }), u && !c && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
const BC = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, WS = sp(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  placeholder: s = 'Start writing... Use "/" for commands',
  editable: a = !0,
  autofocus: i = !1,
  className: l = "",
  showToolbar: u = !0,
  showWordCount: c = !0,
  theme: d,
  autoSave: p = !0,
  autoSaveKey: h = "paragon-editor-content",
  autoSaveDelay: m = 1e3,
  showRecoveryBanner: g = !0,
  showFloatingToolbar: y = !0,
  maxImageSize: v = 5 * 1024 * 1024,
  onImageUploadStart: b,
  onImageUploadComplete: w,
  onImageUploadError: E,
  onImageUpload: x,
  resolveImageSrc: M,
  showModeToggle: D = !0,
  // New props
  initialMode: C = "wysiwyg",
  onModeChange: T,
  onReady: k,
  onFocus: R,
  onBlur: N,
  onSelectionChange: L,
  onDestroy: I,
  onSave: _,
  onRecover: H,
  onWikiLinkClick: K,
  validateWikiLink: P,
  onWikiLinkSearch: B,
  onLinkClick: ne,
  findReplaceOpen: ae,
  onFindReplaceChange: oe,
  renderToolbar: re,
  renderFooter: ie,
  disabledFeatures: $ = {},
  minHeight: W = "200px",
  maxHeight: Y,
  spellCheck: Q = !0,
  headingLevels: pe = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: be = [1, 2, 3],
  // TOC props
  showTableOfContents: Me = !1,
  tocVisible: Oe = !0,
  onTocVisibilityChange: Je,
  tocTitle: Lt = "",
  tocMinLevel: Kn = 1,
  tocMaxLevel: qn = 4,
  tocShowLevelIndicators: Ar = !1,
  tocHighlightActive: Pr = !0,
  tocTreeView: Lr = !1,
  tocWidth: Ir = "240px",
  tocPosition: dn = "right",
  tocScrollOffset: Gn = 20,
  onTocItemClick: fn,
  renderTocItem: pn,
  tocShowToggleButton: Or = !0,
  // Raw markdown editor
  autoClosePairs: jo = !0,
  // Performance profiler
  showPerformanceProfiler: Vo = !1,
  onPerformanceProfilerClose: Ko,
  // Auto reorder checklist
  autoReorderChecklist: qo = !1,
  // Error boundary
  onEditorError: Go,
  // AI writing assistant
  aiActions: vt,
  onAIAction: hn,
  onAISetupRequired: mn
}, Zo) {
  const [et] = j(() => BC()), [wt, Xo] = j(C), [ue, Ce] = j(""), te = V(C), he = V(""), Ne = V(null), [me, _r] = j(0), gn = !!(vt && vt.length > 0 && hn), { state: Fe, executeAction: It, abort: Zn, reset: Ot } = m1(hn), [Qo, Jo] = j(null), [df, ff] = j({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), pf = V(hn);
  pf.current = hn;
  const fi = V(mn);
  fi.current = mn;
  const [hf, mf] = j([]), [gf, yf] = j(0), bf = F((z, U) => {
    mf(z), yf(U);
  }, []), es = V(b), ts = V(w), ns = V(E), rs = V(x), os = V(M), pi = V(K), ss = V(P), as = V(B);
  es.current = b, ts.current = w, ns.current = E, rs.current = x, os.current = M, pi.current = K, ss.current = P, as.current = B;
  const vf = rn(() => {
    const z = [
      Of.configure({
        heading: {
          levels: pe
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
      mh,
      gh,
      vh,
      _f.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      $f.configure({
        types: ["heading", "paragraph"]
      }),
      zf.configure({
        multicolor: !0
      }),
      Bf.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      Xf,
      Qf,
      Jf,
      ep,
      Yx,
      Kx,
      Qx,
      Zx
    ];
    return $.tables || z.push(
      Hf.configure({
        resizable: !et,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Wf,
      ah,
      ih,
      hh
    ), $.taskLists || z.push(
      yh.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      bh.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), et || z.push(
      kh.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), $.codeBlocks || z.push(Ch), $.callouts || z.push(Nh, Vx), $.collapsibleHeadings || z.push(
      Wx.configure({
        levels: be
      })
    ), $.images || z.push(
      Rh.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (U) => {
          zr({
            isOpen: !0,
            src: U.src,
            alt: U.alt,
            pos: U.pos,
            position: { x: U.rect.left + U.rect.width / 2, y: U.rect.bottom }
          });
        },
        resolveImageSrc: os.current ? ((...U) => os.current(...U)) : void 0
      }),
      a1.configure({
        maxFileSize: v,
        onUploadStart: es.current ? ((...U) => es.current(...U)) : void 0,
        onUploadComplete: ts.current ? ((...U) => ts.current(...U)) : void 0,
        onUploadError: ns.current ? ((...U) => ns.current(...U)) : void 0,
        onImageUpload: rs.current ? ((U, J) => rs.current(U, J)) : void 0
      })
    ), !et && !$.datePills && z.push(
      Nb.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), $.tagPills || z.push(
      Pb.configure({
        HTMLAttributes: {
          class: "tag-pill"
        }
      })
    ), $.wikiLinks || z.push(
      _x.configure({
        onWikiLinkClick: (U) => {
          console.log("WikiLink clicked:", U), pi.current?.(U);
        },
        validateLink: (U) => ss.current ? ss.current(U) : !0
      })
    ), $.markdownPaste || z.push(
      Hx.configure({
        enableMarkdownPaste: !0
      })
    ), z;
  }, [s, et, v, pe, be, $]), kt = V(null), qt = V(n), Gt = V(r), is = V(o), Xn = V(null);
  qt.current = n, Gt.current = r, is.current = o;
  const O = Lf({
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
      window.__tiptapEditor = z, k?.(z);
    },
    onDestroy: () => {
      I?.();
    },
    extensions: vf,
    content: t,
    editable: a,
    autofocus: i,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: Q ? "true" : "false"
      },
      handleClick: (z, U, J) => {
        if (ne) {
          const se = J.target.closest("a");
          if (se) {
            const le = se.getAttribute("href");
            if (le && ne(le, J) === !1)
              return J.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: z }) => {
      kt.current && clearTimeout(kt.current), kt.current = setTimeout(() => {
        if (z.isDestroyed) return;
        const U = z.getHTML();
        (qt.current || Gt.current) && (qt.current?.(U), Gt.current?.(U));
      }, 150);
    },
    onFocus: () => {
      R?.();
    },
    onBlur: () => {
      if (kt.current && (clearTimeout(kt.current), kt.current = null, O && !O.isDestroyed)) {
        const z = O.getHTML();
        if ((qt.current || Gt.current) && (qt.current?.(z), Gt.current?.(z)), te.current === "wysiwyg" && Xn.current) {
          const U = Xn.current.turndown(z);
          he.current = U, is.current?.(U);
        }
      }
      N?.();
    },
    onSelectionUpdate: ({ editor: z }) => {
      if (L) {
        const { from: U, to: J, empty: we } = z.state.selection;
        L({ from: U, to: J, empty: we });
      }
    }
  });
  G(() => () => {
    if (kt.current && (clearTimeout(kt.current), kt.current = null, O && !O.isDestroyed)) {
      const z = O.getHTML();
      if ((qt.current || Gt.current) && (qt.current?.(z), Gt.current?.(z)), te.current === "wysiwyg" && Xn.current) {
        const U = Xn.current.turndown(z);
        he.current = U, is.current?.(U);
      }
    }
  }, []);
  const [hi, $r] = j(!1), [yn, zr] = j(null), [wf, kf] = j(!1), xf = ae !== void 0 ? ae : wf, _t = F((z) => {
    kf(z), oe?.(z);
  }, [oe]), [Cf, ls] = j(0), [Sf, Tf] = j(""), xt = Rx(O, {
    storageKey: h,
    debounceMs: m,
    enabled: p,
    onSave: (z) => {
      _?.(z);
    },
    onRecover: (z) => {
      H?.(z);
    }
  }), Qn = eC();
  Xn.current = Qn;
  const ct = F((z) => {
    if (O) {
      if (z === "markdown" && te.current === "wysiwyg") {
        const U = O.getHTML(), J = Qn.turndown(U);
        Ce(J), he.current = J;
      } else if (z === "wysiwyg" && te.current === "markdown") {
        const U = ["info", "note", "prompt", "resources", "todo"];
        let J = he.current;
        U.forEach((le) => {
          const Se = new RegExp(`\`\`\`ad-${le}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          J = J.replace(Se, (Le, ze) => {
            const $t = ve.parse(ze.trim(), { async: !1 });
            return `<div data-callout="" data-type="${le}" class="callout callout-${le}">${$t}</div>`;
          });
        }), U.forEach((le) => {
          const Se = new RegExp(`\`\`\`${le}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          J = J.replace(Se, (Le, ze) => {
            const $t = ve.parse(ze.trim(), { async: !1 });
            return `<div data-callout="" data-type="${le}" class="callout callout-${le}">${$t}</div>`;
          });
        }), J = J.replace(/!\[([^\]]*?)\s*\|\s*(\d+)\]\(([^)]+)\)/g, (le, Se, Le, ze) => `<img src="${ze.trim()}" alt="${Se.trim()}" width="${Le.trim()}" style="width: ${Le.trim()}px" />`), J = J.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), J = J.replace(/@([^@\n]+)@/g, (le, Se) => {
          const Le = Jt(Se);
          if (Le) {
            const ze = Pa(Le);
            return `<span data-type="date-pill" data-date="${Le}" class="date-pill ${ze}"><span class="date-icon">📅</span><span class="date-text">${Se.trim()}</span></span>`;
          }
          return le;
        }), J = J.replace(new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"), (le, Se) => {
          const Le = oo(Se);
          return ar(Le) ? `<span data-type="tag-pill" data-tag="${Le}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${Le}</span></span>` : le;
        }), J = J.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((le, Se) => Se % 2 === 1 ? le : le.replace(/\[\[([^\[\]]+)\]\]/g, (Le, ze) => `<span data-wiki-link data-page-name="${ze.trim()}" class="wiki-link">${ze.trim()}</span>`)).join("");
        let se = ve.parse(J, { async: !1 });
        se = zC(se), queueMicrotask(() => {
          O.isDestroyed || O.commands.setContent(se);
        });
      }
      Xo(z), te.current = z, T?.(z);
    }
  }, [O, Qn, T]), mi = F((z) => {
    Ce(z), he.current = z, o?.(z);
  }, [o]), Zt = Px(O, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: c
  });
  ap(Zo, () => ({
    getEditor: () => O,
    getHTML: () => O?.getHTML() || "",
    getMarkdown: () => O ? Qn.turndown(O.getHTML()) : "",
    getText: () => O?.getText() || "",
    setContent: (z) => {
      O && !O.isDestroyed && queueMicrotask(() => {
        O.commands.setContent(z);
      });
    },
    clearContent: () => {
      O && !O.isDestroyed && O.commands.clearContent();
    },
    focus: (z) => {
      O && !O.isDestroyed && O.commands.focus(z);
    },
    blur: () => {
      O && !O.isDestroyed && O.commands.blur();
    },
    isEmpty: () => O?.isEmpty || !0,
    isFocused: () => O?.isFocused || !1,
    getMode: () => te.current,
    setMode: (z) => ct(z),
    toggleMode: () => {
      const z = te.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return ct(z), z;
    },
    getWordCount: () => ({
      words: Zt.words,
      characters: Zt.characters,
      charactersWithSpaces: Zt.charactersWithSpaces
    }),
    undo: () => O?.commands.undo(),
    redo: () => O?.commands.redo(),
    canUndo: () => O?.can().undo() || !1,
    canRedo: () => O?.can().redo() || !1,
    insertContent: (z) => O?.commands.insertContent(z),
    insertImage: (z, U = "") => O?.commands.setImage({ src: z, alt: U }),
    insertTable: (z = 3, U = 3) => O?.commands.insertTable({ rows: z, cols: U, withHeaderRow: !0 }),
    insertCodeBlock: (z) => {
      z ? O?.commands.setCodeBlock({ language: z }) : O?.commands.setCodeBlock();
    },
    insertCallout: (z = "info") => O?.commands.insertCallout?.({ type: z }),
    insertHorizontalRule: () => O?.commands.setHorizontalRule(),
    toggleBold: () => O?.commands.toggleBold(),
    toggleItalic: () => O?.commands.toggleItalic(),
    toggleUnderline: () => O?.commands.toggleUnderline(),
    toggleStrike: () => O?.commands.toggleStrike(),
    toggleCode: () => O?.commands.toggleCode(),
    toggleHighlight: () => O?.commands.toggleHighlight(),
    setHeading: (z) => {
      z === 0 ? O?.commands.setParagraph() : O?.commands.setHeading({ level: z });
    },
    toggleBulletList: () => O?.commands.toggleBulletList(),
    toggleOrderedList: () => O?.commands.toggleOrderedList(),
    toggleTaskList: () => O?.commands.toggleTaskList(),
    toggleBlockquote: () => O?.commands.toggleBlockquote(),
    setLink: (z) => O?.commands.setLink({ href: z }),
    unsetLink: () => O?.commands.unsetLink(),
    openFindReplace: () => {
      _t(!0), ls((z) => z + 1);
    },
    closeFindReplace: () => _t(!1),
    save: () => xt.save(),
    clearSavedContent: () => xt.clear(),
    getSelectedText: () => {
      if (!O) return "";
      const { from: z, to: U } = O.state.selection;
      return O.state.doc.textBetween(z, U, " ");
    },
    isEditable: () => O?.isEditable || !1,
    setEditable: (z) => O?.setEditable(z),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!O) return [];
      const z = [];
      return O.state.doc.descendants((U, J) => {
        if (U.type.name === "heading") {
          const we = U.attrs.level, se = U.textContent.trim();
          se && z.push({ id: `toc-heading-${J}`, text: se, level: we, pos: J });
        }
      }), z;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (z) => {
      if (!(!O || O.isDestroyed))
        try {
          const U = O.state.doc.resolve(z), J = O.view.nodeDOM(U.before(U.depth + 1));
          if (J instanceof HTMLElement) {
            const we = O.view.dom.closest(".editor-content-wrapper");
            if (we) {
              const se = we.getBoundingClientRect(), Se = J.getBoundingClientRect().top - se.top + we.scrollTop;
              we.scrollTo({ top: Se - 20, behavior: "smooth" });
            } else
              J.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          O.commands.setTextSelection(z + 1);
        } catch {
        }
    }
  }), [O, Qn, ct, Zt, xt, _t]), G(() => {
    const z = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => te.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (U) => {
        if (U !== "wysiwyg" && U !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        ct(U);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const U = te.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return ct(U), U;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        ct("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        ct("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => te.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => te.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => te.current === "markdown" ? he.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (U) => {
        const J = (we) => {
          U(we.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", J), () => window.removeEventListener("paragon-editor-mode-change", J);
      }
    };
    return window.__paragonEditorModeAPI = z, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [ct]), G(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: wt } }));
  }, [wt]), G(() => {
    if (!O || O.isDestroyed) return;
    const z = (U) => {
      if (!O.isDestroyed) {
        if ((U.metaKey || U.ctrlKey) && U.key === "k") {
          U.preventDefault(), $r(!0);
          return;
        }
        if (!et && (U.metaKey || U.ctrlKey) && U.key === "f") {
          if (U.preventDefault(), O) {
            const { state: J } = O, { from: we, to: se } = J.selection;
            if (we !== se) {
              const le = J.doc.textBetween(we, se, " ");
              le.trim() && Tf(le.trim());
            }
          }
          _t(!0), ls((J) => J + 1);
          return;
        }
        if (!et && (U.metaKey || U.ctrlKey) && U.key === "h") {
          U.preventDefault(), _t(!0);
          return;
        }
        if (U.key === " ")
          try {
            const { state: J } = O, { selection: we } = J, { $from: se } = we, le = se.nodeBefore?.textContent || "";
            if (le === "#") {
              U.preventDefault(), O.chain().focus().deleteRange({ from: se.pos - 1, to: se.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (le === "##") {
              U.preventDefault(), O.chain().focus().deleteRange({ from: se.pos - 2, to: se.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (le === "###") {
              U.preventDefault(), O.chain().focus().deleteRange({ from: se.pos - 3, to: se.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (le === "-" || le === "*") {
              U.preventDefault(), O.chain().focus().deleteRange({ from: se.pos - 1, to: se.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(le)) {
              U.preventDefault(), O.chain().focus().deleteRange({ from: se.pos - le.length, to: se.pos }).toggleOrderedList().run();
              return;
            }
            const Se = /^(-\s*)?\[([ x])?\]$/.exec(le);
            if (Se) {
              U.preventDefault();
              const Le = Se[2] === "x", ze = J.schema.nodes.taskList, $t = J.schema.nodes.taskItem;
              if (ze && $t) {
                const Br = J.tr, vi = se.pos - le.length, Af = se.pos;
                Br.delete(vi, Af);
                const wi = Br.doc.resolve(vi).blockRange();
                if (wi) {
                  const Pf = [
                    { type: ze, attrs: {} },
                    { type: $t, attrs: { checked: Le } }
                  ];
                  Br.wrap(wi, Pf), O.view.dispatch(Br);
                  return;
                }
              }
              O.chain().focus().deleteRange({ from: se.pos - le.length, to: se.pos }).toggleTaskList().run();
              return;
            }
            if (le === ">") {
              U.preventDefault(), O.chain().focus().deleteRange({ from: se.pos - 1, to: se.pos }).toggleBlockquote().run();
              return;
            }
            if (le === "```") {
              U.preventDefault(), O.chain().focus().deleteRange({ from: se.pos - 3, to: se.pos }).toggleCodeBlock().run();
              return;
            }
            if (le === "---" || le === "***") {
              U.preventDefault(), O.chain().focus().deleteRange({ from: se.pos - 3, to: se.pos }).setHorizontalRule().run();
              return;
            }
          } catch (J) {
            console.warn("Space shortcut error:", J);
          }
      }
    };
    return document.addEventListener("keydown", z, !0), () => document.removeEventListener("keydown", z, !0);
  }, [O, et, _t]);
  const gi = F((z, U) => {
    if (!gn) {
      fi.current?.();
      return;
    }
    if (!O) return;
    let J = { top: 0, left: 0 };
    if (U) {
      const we = U.getBoundingClientRect();
      J = { top: we.bottom + 4, left: we.left };
    } else {
      const { from: we, to: se } = O.state.selection, le = O.view.coordsAtPos(we), Se = O.view.coordsAtPos(se);
      J = { top: Se.bottom + 8, left: (le.left + Se.left) / 2 };
    }
    Jo({ scope: z, position: J });
  }, [gn, O]), Mf = F((z, U) => {
    if (!O || !vt) return;
    const J = vt.find(($t) => $t.id === z);
    if (!J) return;
    const { from: we, to: se } = O.state.selection, le = we !== se ? O.state.doc.textBetween(we, se, `
`) : "", Se = J.scope === "document" || !le ? O.getText() : le, Le = O.view.coordsAtPos(we), ze = O.view.coordsAtPos(se);
    ff({
      selectionTop: Le.top,
      selectionBottom: ze.bottom,
      selectionCenterX: (Le.left + ze.right) / 2
    }), Jo(null), It(z, J.label, Se, { from: we, to: se }, U);
  }, [O, vt, It]), Ef = F(() => {
    if (!O || Fe.status !== "complete") return;
    const { selectionRange: z, result: U } = Fe;
    O.chain().focus().setTextSelection(z).deleteSelection().insertContent(U).run(), Ot();
  }, [O, Fe, Ot]), Df = F(() => {
    if (!O || Fe.status !== "complete") return;
    const { selectionRange: z, result: U } = Fe;
    O.chain().focus().setTextSelection(z.to).insertContent(`
` + U).run(), Ot();
  }, [O, Fe, Ot]), Nf = F(() => {
    if (!(Fe.status !== "complete" && Fe.status !== "error"))
      if (Fe.status === "complete") {
        const { action: z, actionLabel: U, inputText: J, selectionRange: we } = Fe;
        Ot(), It(z, U, J, we);
      } else
        Ot();
  }, [Fe, Ot, It]);
  if (!O)
    return /* @__PURE__ */ f("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: /* @__PURE__ */ A("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const yi = /* @__PURE__ */ f(
    Sx,
    {
      editor: O,
      onOpenLinkPopover: () => $r(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        _t(!0), ls((z) => z + 1);
      },
      disabledFeatures: $,
      autoReorderChecklist: qo,
      aiEnabled: gn || !!mn,
      onAISparklesClick: (z) => gi("document", z)
    }
  ), bi = /* @__PURE__ */ A("div", { className: "editor-footer", children: [
    p && /* @__PURE__ */ f(
      Lx,
      {
        status: xt.status,
        lastSaved: xt.lastSaved
      }
    ),
    /* @__PURE__ */ f("div", { className: "word-count", children: /* @__PURE__ */ A("span", { children: [
      Zt.words,
      " words"
    ] }) })
  ] }), Rf = {
    minHeight: W,
    ...Y && { maxHeight: Y, overflowY: "auto" }
  };
  return /* @__PURE__ */ A("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: [
    p && g && xt.hasRecoverableContent && /* @__PURE__ */ f(
      Ix,
      {
        onRecover: () => {
          xt.recover();
        },
        onDismiss: xt.dismissRecovery
      }
    ),
    u && /* @__PURE__ */ A("div", { className: "flex items-center bg-card/50", children: [
      re ? re(O, yi) : yi,
      D && /* @__PURE__ */ A("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => ct("wysiwyg"),
            className: `editor-mode-toggle-btn ${wt === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ f(Up, {})
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => ct("markdown"),
            className: `editor-mode-toggle-btn ${wt === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ f(xa, {})
          }
        )
      ] })
    ] }),
    !et && /* @__PURE__ */ f(
      Tx,
      {
        editor: O,
        isOpen: xf,
        onClose: () => _t(!1),
        focusTrigger: Cf,
        initialSearchQuery: Sf,
        editorMode: wt,
        rawMarkdown: ue,
        onRawMarkdownChange: mi,
        onMatchesChange: bf
      }
    ),
    /* @__PURE__ */ f(Dx, { editor: O }),
    /* @__PURE__ */ A("div", { className: `editor-main-area ${Me ? "editor-with-toc" : ""}`, children: [
      Me && dn === "left" && /* @__PURE__ */ f(
        Al,
        {
          editor: O,
          visible: Oe,
          onVisibilityChange: Je,
          title: Lt,
          minLevel: Kn,
          maxLevel: qn,
          showLevelIndicators: Ar,
          highlightActive: Pr,
          treeView: Lr,
          width: Ir,
          position: dn,
          scrollOffset: Gn,
          onItemClick: fn,
          renderItem: pn,
          showToggleButton: Or,
          scrollContainerRef: Ne
        }
      ),
      /* @__PURE__ */ A(
        f1,
        {
          resetKey: `${t}-${me}`,
          onRetry: () => _r((z) => z + 1),
          onClearContent: () => {
            O && O.commands.clearContent(), n?.(""), r?.(""), o?.(""), _r((z) => z + 1);
          },
          onError: Go,
          children: [
            /* @__PURE__ */ f("div", { className: "editor-content-wrapper", ref: Ne, style: Rf, children: wt === "wysiwyg" ? /* @__PURE__ */ A(Pe, { children: [
              /* @__PURE__ */ f(If, { editor: O, className: "editor-content" }),
              !$.images && !$.dragAndDrop && /* @__PURE__ */ f(i1, { containerRef: Ne, enabled: a }),
              !et && y && /* @__PURE__ */ f(Eh, { editor: O, suppressWhenLinkPopoverOpen: hi, aiEnabled: gn || !!mn, onAISparklesClick: (z) => gi("selection", z) }),
              Qo && vt && /* @__PURE__ */ f(
                y1,
                {
                  actions: vt,
                  scope: Qo.scope,
                  position: Qo.position,
                  onAction: Mf,
                  onClose: () => Jo(null)
                }
              ),
              Fe.status !== "idle" && /* @__PURE__ */ f(
                b1,
                {
                  state: Fe,
                  position: df,
                  onReplace: Ef,
                  onInsert: Df,
                  onRetry: Nf,
                  onDiscard: () => {
                    Zn(), Ot();
                  }
                }
              ),
              !$.slashCommands && /* @__PURE__ */ f(zb, { editor: O, disabledFeatures: $ }),
              !$.wikiLinks && as.current && /* @__PURE__ */ f(
                Ub,
                {
                  editor: O,
                  onSearch: as.current
                }
              ),
              /* @__PURE__ */ f(
                Sh,
                {
                  editor: O,
                  isOpen: hi,
                  onClose: () => $r(!1)
                }
              ),
              !et && /* @__PURE__ */ f(
                Th,
                {
                  editor: O,
                  onEditLink: () => $r(!0)
                }
              ),
              !$.images && yn?.isOpen && /* @__PURE__ */ f(
                l1,
                {
                  src: yn.src,
                  alt: yn.alt,
                  position: yn.position,
                  onSave: (z, U) => {
                    O.chain().focus().setNodeSelection(yn.pos).updateAttributes("resizableImage", {
                      src: z,
                      alt: U
                    }).run(), zr(null);
                  },
                  onDelete: () => {
                    O.chain().focus().setNodeSelection(yn.pos).deleteSelection().run(), zr(null);
                  },
                  onClose: () => zr(null)
                }
              )
            ] }) : /* @__PURE__ */ f(
              c1,
              {
                content: ue,
                onChange: mi,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: hf,
                currentMatchIndex: gf,
                autoClosePairs: jo
              }
            ) }),
            /* @__PURE__ */ f(p1, { scrollContainerRef: Ne })
          ]
        }
      ),
      Me && dn === "right" && /* @__PURE__ */ f(
        Al,
        {
          editor: O,
          visible: Oe,
          onVisibilityChange: Je,
          title: Lt,
          minLevel: Kn,
          maxLevel: qn,
          showLevelIndicators: Ar,
          highlightActive: Pr,
          treeView: Lr,
          width: Ir,
          position: dn,
          scrollOffset: Gn,
          onItemClick: fn,
          renderItem: pn,
          showToggleButton: Or,
          scrollContainerRef: Ne
        }
      )
    ] }),
    c && (ie ? ie(
      { words: Zt.words, characters: Zt.characters },
      xt.status,
      bi
    ) : bi),
    /* @__PURE__ */ f(d1, { visible: Vo, onClose: Ko, editor: O })
  ] });
}), FS = So.create({
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
      $n(this.options.HTMLAttributes, t, {
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
}), cf = {
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
}, HC = {
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
}, WC = {
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
}, FC = {
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
}, cr = {
  dark: cf,
  light: HC,
  sepia: WC,
  nord: FC
};
function UC(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function US(e, t, n, r) {
  const o = cr[e] || cf;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const uf = Ul(null);
function YS({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = j(t), s = cr[r] || cr.dark, a = F((l) => {
    cr[l] && o(l);
  }, []);
  G(() => {
    n?.current && UC(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: r,
    setTheme: a,
    availableThemes: Object.keys(cr)
  };
  return /* @__PURE__ */ f(uf.Provider, { value: i, children: e });
}
function jS() {
  const e = Yl(uf);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const Wl = [
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
function VS({ node: e, updateAttributes: t }) {
  const [n, r] = j(!1), o = e.attrs.language || "plaintext";
  Wl.find((a) => a.value === o)?.label;
  const s = F(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ A(kr, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ f(
          "select",
          {
            value: o,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: Wl.map(({ value: a, label: i }) => /* @__PURE__ */ f("option", { value: a, children: i }, a))
          }
        ),
        /* @__PURE__ */ f(Ut, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ f(Bn, { size: 14 }) : /* @__PURE__ */ f(Hn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("pre", { className: "code-block-pre", children: /* @__PURE__ */ f("code", { children: /* @__PURE__ */ f(ia, {}) }) })
  ] });
}
export {
  Lx as AutoSaveIndicator,
  FS as Callout,
  Vx as CalloutInputRule,
  VS as CodeBlockComponent,
  Wx as CollapsibleHeading,
  kh as CollapsibleList,
  Nb as DatePill,
  YS as EditorThemeProvider,
  Sx as EditorToolbar,
  Tx as FindReplace,
  Eh as FloatingToolbar,
  i1 as ImageDropZone,
  a1 as ImageUpload,
  WS as MarkdownEditor,
  Yx as MarkdownLinkInputRule,
  Hx as MarkdownPasteSafe,
  mh as MixedBulletList,
  vh as MixedListItem,
  gh as MixedOrderedList,
  bh as MixedTaskItem,
  yh as MixedTaskList,
  Ix as RecoveryBanner,
  Rh as ResizableImage,
  Kx as SearchHighlight,
  Dx as SelectAllActionBar,
  Qx as SelectAllOccurrences,
  zb as SlashCommands,
  Zx as TabIndent,
  Al as TableOfContents,
  Pb as TagPill,
  _x as WikiLinkSafe,
  UC as applyTheme,
  US as createCustomTheme,
  cf as darkTheme,
  Pa as getDateVariant,
  ar as isValidTag,
  HC as lightTheme,
  ye as lowlight,
  FC as nordTheme,
  oo as normalizeTag,
  Jt as parseDateFromMarkdown,
  WC as sepiaTheme,
  cr as themes,
  Rx as useAutoSave,
  jS as useEditorTheme,
  Px as useWordCount
};
//# sourceMappingURL=paragon.js.map
