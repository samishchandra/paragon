import { jsxs as A, jsx as p, Fragment as He } from "react/jsx-runtime";
import { ReactNodeViewRenderer as Wo, NodeViewWrapper as Xn, NodeViewContent as Ea, useEditorState as dc, useEditor as op, EditorContent as sp } from "@tiptap/react";
import ap from "@tiptap/starter-kit";
import ip from "@tiptap/extension-placeholder";
import lp from "@tiptap/extension-text-align";
import cp from "@tiptap/extension-highlight";
import up from "@tiptap/extension-link";
import { Table as dp } from "@tiptap/extension-table";
import fp from "@tiptap/extension-table-row";
import pp from "@tiptap/extension-table-cell";
import hp from "@tiptap/extension-table-header";
import { Plugin as Ve, PluginKey as Ke, TextSelection as vn, AllSelection as mp } from "@tiptap/pm/state";
import { DecorationSet as Ze, Decoration as it } from "@tiptap/pm/view";
import { Extension as mt, Node as Fo, mergeAttributes as tr, InputRule as Je, Mark as fc } from "@tiptap/core";
import gp from "@tiptap/extension-bullet-list";
import yp from "@tiptap/extension-ordered-list";
import bp from "@tiptap/extension-list-item";
import vp from "@tiptap/extension-task-list";
import wp from "@tiptap/extension-task-item";
import { findWrapping as Bi, canJoin as kp } from "@tiptap/pm/transform";
import xp from "@tiptap/extension-underline";
import Cp from "@tiptap/extension-subscript";
import Sp from "@tiptap/extension-superscript";
import Tp from "@tiptap/extension-typography";
import Mp from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Ep } from "lowlight";
import * as T from "react";
import Q, { useState as V, useRef as q, useEffect as J, useCallback as U, memo as nr, createContext as pc, useContext as hc, useLayoutEffect as Uo, useMemo as wn, Component as Np, useReducer as Dp, forwardRef as Rp, useImperativeHandle as Ap } from "react";
import { ChevronDown as en, Check as rr, Copy as or, Link2 as Na, ExternalLink as Lp, Pencil as Pp, Unlink as Ip, Bold as Da, Italic as Ra, Underline as Aa, Strikethrough as La, Code as mc, Highlighter as gc, Link as Pa, Quote as Ia, List as Oa, ListOrdered as $a, CheckSquare as _a, FileCode as Op, Sparkles as Yo, ListTodo as Ha, BookOpen as za, MessageSquareText as yc, StickyNote as bc, Info as Mo, ChevronRight as vc, ChevronLeftIcon as $p, ChevronRightIcon as _p, ChevronDownIcon as Hp, Calendar as wc, Hash as Wi, Image as Ba, X as _t, Type as jo, Heading1 as zp, Heading2 as Bp, Heading3 as Wp, Heading4 as Fp, Heading5 as Up, Code2 as kc, Table as ta, Minus as xc, FileText as Wa, Plus as Fa, Undo as Yp, Redo as jp, IndentIncrease as Vp, IndentDecrease as Kp, PenLine as qp, Library as Gp, Columns as Fi, Trash2 as Fn, Rows as Ui, ToggleLeft as Yi, ArrowUpDown as Xp, Search as Zp, ChevronUp as Qp, MousePointerClick as Jp, CaseSensitive as eh, WholeWord as th, Regex as nh, Replace as na, ReplaceAll as rh, Cloud as oh, Loader2 as Cc, CloudOff as sh, AlertCircle as ah, RotateCcw as Ua, ImagePlus as ih, Activity as lh, Maximize2 as Sc, Minimize2 as Tc, AlertTriangle as ch, CheckCircle2 as uh, MessageSquare as Mc, RefreshCw as dh, SpellCheck as fh, PanelRightClose as ph, PanelRightOpen as hh, Eye as mh } from "lucide-react";
import Ya from "highlight.js/lib/languages/javascript";
import ja from "highlight.js/lib/languages/typescript";
import Ec from "highlight.js/lib/languages/python";
import Va from "highlight.js/lib/languages/xml";
import gh from "highlight.js/lib/languages/css";
import yh from "highlight.js/lib/languages/json";
import Vo from "highlight.js/lib/languages/bash";
import bh from "highlight.js/lib/languages/sql";
import vh from "highlight.js/lib/languages/java";
import Nc from "highlight.js/lib/languages/cpp";
import Dc from "highlight.js/lib/languages/go";
import Rc from "highlight.js/lib/languages/rust";
import Ac from "highlight.js/lib/languages/markdown";
import Lc from "highlight.js/lib/languages/yaml";
import Pc from "highlight.js/lib/languages/diff";
import * as Ic from "react-dom";
import wh, { createPortal as kh } from "react-dom";
import xh from "@tiptap/extension-image";
import { createRoot as Ch } from "react-dom/client";
import { Fragment as Sh } from "@tiptap/pm/model";
import { liftListItem as ji, sinkListItem as Vi } from "@tiptap/pm/schema-list";
import { undo as Th, redo as Mh } from "@tiptap/pm/history";
import Eh from "@tiptap/extension-horizontal-rule";
const Nh = new Ke("tableCellMenu");
let Ki = !1, ro = null;
function Dh() {
  Ki || (Ki = !0, document.addEventListener("mouseover", (e) => {
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
function Rh(e) {
  return Dh(), new Ve({
    key: Nh,
    state: {
      init() {
        return Ze.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && ro ? ro.map(t.mapping, t.doc) : (ro = Ah(o.doc, e), ro);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Ah(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = it.widget(o + 1, (a) => {
        const i = document.createElement("div");
        i.className = "table-cell-menu-wrapper ProseMirror-widget", i.setAttribute("contenteditable", "false"), i.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const l = document.createElement("button");
        l.className = "table-cell-menu-btn", l.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', l.title = "Table options", l.type = "button";
        const u = document.documentElement.classList.contains("dark"), c = u ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", d = u ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", f = u ? "#999" : "#666", h = u ? "#2a2a2a" : "#f5f5f5";
        return l.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + c + ";border:1px solid " + d + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + f + ";pointer-events:auto;padding:0;", l.addEventListener("mouseenter", () => {
          l.style.opacity = "1", l.style.background = h, l.style.transform = "scale(1.05)";
        }), l.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), l.style.background = c, l.style.transform = "scale(1)";
        }), l.addEventListener("click", (m) => {
          m.preventDefault(), m.stopPropagation();
          const g = l.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), Lh(m, t, o, g);
        }), i.appendChild(l), i;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), Ze.create(e, n);
}
function Lh(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const a = 170, i = 280;
  let l = Math.max(0, Math.min(r.top, window.innerHeight)), u = Math.max(0, Math.min(r.bottom, window.innerHeight)), c = Math.max(0, Math.min(r.left, window.innerWidth)), d = u + 4, f = c - a + r.width + 8;
  f + a > window.innerWidth - 12 && (f = window.innerWidth - a - 12), f < 12 && (f = 12), d + i > window.innerHeight - 12 && (d = l - i - 4), d < 12 && (d = 12), d + i > window.innerHeight - 12 && (d = window.innerHeight - i - 12);
  const h = document.documentElement.classList.contains("dark"), m = h ? "#1f1f1f" : "#ffffff", g = h ? "#3a3a3a" : "#e5e5e5", y = h ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + d + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + m + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + y + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const v = t.state.doc.resolve(n);
  let b = !1;
  for (let D = v.depth; D >= 0; D--)
    if (v.node(D).type.name === "table") {
      v.node(D).firstChild?.firstChild?.type.name === "tableHeader" && (b = !0);
      break;
    }
  const w = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n + 1).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n + 1).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n + 1).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n + 1).addRowAfter().run() },
    { label: "divider" },
    { label: b ? "✓ Header Row" : "  Header Row", icon: "toggle-header", action: () => t.chain().focus().setTextSelection(n + 1).toggleHeaderRow().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => Ph(t) }
  ], S = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, k = h ? "#2a2a2a" : "#f5f5f5", C = h ? "#ff6b6b" : "#dc2626", N = h ? "#999999" : "#666666", x = h ? "#333333" : "#e5e5e5";
  w.forEach((D) => {
    if (D.label === "divider") {
      const R = document.createElement("div");
      R.style.cssText = "height:1px;background:" + x + ";margin:4px 0;", s.appendChild(R);
    } else {
      const R = document.createElement("button");
      R.type = "button";
      const I = D.destructive ? C : y;
      R.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + I + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const O = S[D.icon || ""] || "", H = D.destructive ? C : N;
      R.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + H + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + D.label + "</span>", R.addEventListener("mouseenter", () => {
        R.style.background = D.destructive ? h ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : k;
      }), R.addEventListener("mouseleave", () => {
        R.style.background = "transparent";
      }), R.addEventListener("click", (W) => {
        W.preventDefault(), W.stopPropagation(), D.action && D.action(), s.remove();
      }), s.appendChild(R);
    }
  }), document.body.appendChild(s);
  const M = (D) => {
    const R = D.target;
    if (s.contains(R) || R.classList.contains("table-cell-menu-btn"))
      return;
    const I = R.closest('[role="dialog"]');
    I && I.contains(s) || (s.remove(), document.removeEventListener("mousedown", M), document.removeEventListener("keydown", E));
  }, E = (D) => {
    D.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", M), document.removeEventListener("keydown", E));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", M), document.addEventListener("keydown", E);
  }, 0);
}
function Ph(e) {
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
const Ih = pp.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Rh(this.editor)
    ];
  }
}), Oh = hp.extend({}), Mr = new Ke("tableSorting");
let gn = null, kr = null;
function $h(e) {
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
function _h(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function Hh(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (m, g) => {
    if (m.type.name === "table" && g === t)
      return s = m, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = gn?.tablePos === t && gn?.columnIndex === n && gn?.direction === "asc" ? "desc" : "asc";
  gn = { tablePos: t, columnIndex: n, direction: a }, kr = null;
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
    qi(n, a), o.dispatch(r.tr.setMeta(Mr, { updated: !0 }));
    return;
  }
  const c = u.map((m) => {
    let g = "", y = 0;
    return m.node.forEach((v) => {
      y === n && (g = v.textContent || ""), y++;
    }), { ...m, sortValue: $h(g) };
  }), d = c.map((m, g) => g);
  c.sort((m, g) => _h(m.sortValue, g.sortValue, a));
  const f = c.map((m, g) => u.indexOf(m));
  if (d.some((m, g) => m !== f[g])) {
    const m = [];
    l.forEach((v) => m.push(v.node)), c.forEach((v) => m.push(v.node));
    const g = s.type.create(s.attrs, m), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(Mr, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Mr, { updated: !0 }));
  qi(n, a);
}
function qi(e, t) {
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
function zh(e, t, n, r) {
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
    c.preventDefault(), c.stopPropagation(), Hh(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function Bh(e) {
  return new Ve({
    key: Mr,
    state: {
      init() {
        return Ze.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Mr);
        return !t.docChanged && !s?.updated && kr ? kr.map(t.mapping, t.doc) : (kr = Wh(o.doc, e), kr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Wh(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "table") {
      const s = o;
      r.forEach((a, i) => {
        if (a.type.name === "tableRow") {
          let l = 0, u = 0;
          a.forEach((c, d) => {
            if (c.type.name === "tableHeader") {
              const f = o + 1 + i + 1 + u;
              let h = f + 1;
              c.forEach((w, S) => {
                w.type.name === "paragraph" && (h = f + 1 + S + w.nodeSize - 1);
              });
              const g = gn?.tablePos === s && gn?.columnIndex === l ? gn.direction : null, y = l, v = s, b = it.widget(h, () => zh(g, v, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(b);
            }
            u += c.nodeSize, l++;
          });
        }
      });
    }
  }), Ze.create(e, n);
}
const Fh = mt.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Bh(this.editor)];
  }
});
function Ka(e, t, n, r, o, s = {}) {
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
const Uh = gp.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, u = t.schema.nodes.listItem, c = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let h = s.depth; h > 0; h--) {
          const m = s.node(h);
          if (m.type === a || m.type === i || m.type === l) {
            d = m.type, f = s.before(h);
            break;
          }
        }
        if (d === a)
          return e.liftListItem("listItem");
        if (d === i || d === l) {
          if (!r) return !0;
          if (Ka(n, f, a, u, c, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Yh = yp.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, u = t.schema.nodes.listItem, c = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let h = s.depth; h > 0; h--) {
          const m = s.node(h);
          if (m.type === a || m.type === i || m.type === l) {
            d = m.type, f = s.before(h);
            break;
          }
        }
        if (d === l)
          return e.liftListItem("listItem");
        if (d === i || d === a) {
          if (!r) return !0;
          if (Ka(n, f, l, u, c, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), jh = vp.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: a }) => {
        const { selection: i } = n, { $from: l, $to: u } = i, c = l.blockRange(u);
        if (!c)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let h = !1;
        for (let k = l.depth; k > 0; k--)
          if (l.node(k).type === d) {
            h = !0, l.before(k);
            break;
          }
        if (h)
          return t.liftListItem("taskItem");
        const m = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let v = null, b = -1;
        for (let k = l.depth; k > 0; k--) {
          const C = l.node(k);
          if (C.type === m || C.type === g) {
            v = C, b = l.before(k);
            break;
          }
        }
        if (v) {
          if (!o) return !0;
          const k = b, C = r.doc.nodeAt(k);
          if (!C) return !1;
          r.setNodeMarkup(k, d, C.attrs);
          const N = r.doc.nodeAt(k);
          if (!N) return !1;
          const x = [];
          N.forEach((M, E) => {
            M.type === y && x.push(k + 1 + E);
          });
          for (let M = x.length - 1; M >= 0; M--) {
            const E = x[M], D = r.doc.nodeAt(E);
            D && D.type === y && r.setNodeMarkup(E, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const w = Bi(c, d);
        if (w) {
          r.wrap(c, w);
          const { $from: k } = r.selection;
          let C = -1;
          for (let N = k.depth; N > 0; N--)
            if (k.node(N).type === d) {
              C = k.before(N);
              break;
            }
          if (C >= 0) {
            const N = r.doc.nodeAt(C);
            if (N) {
              const x = [];
              N.forEach((M, E) => {
                M.type === y && x.push(C + 1 + E);
              });
              for (let M = x.length - 1; M >= 0; M--) {
                const E = x[M], D = r.doc.nodeAt(E);
                D && D.type === y && r.setNodeMarkup(E, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const S = Bi(c, m);
        if (S) {
          r.wrap(c, S);
          const { $from: k } = r.selection;
          let C = -1;
          for (let N = k.depth; N > 0; N--)
            if (k.node(N).type === m) {
              C = k.before(N);
              break;
            }
          return C >= 0 && Ka(r, C, d, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Vh = wp.extend({
  content: "paragraph block*",
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() || {},
      Enter: () => {
        const { editor: t } = this, { state: n } = t, { $from: r, $to: o } = n.selection;
        if (!r.sameParent(o) || r.pos !== o.pos)
          return t.commands.splitListItem(this.name);
        let s = -1;
        for (let d = r.depth; d >= 1; d--)
          if (r.node(d).type.name === "taskItem") {
            s = d;
            break;
          }
        if (s === -1)
          return t.commands.splitListItem(this.name);
        const a = r.node(s);
        if (!a.attrs.checked)
          return t.commands.splitListItem(this.name);
        const l = r.start(s), u = a.firstChild;
        if (!u || !u.isTextblock)
          return t.commands.splitListItem(this.name);
        if (r.pos - l <= 1) {
          const d = r.before(s), { tr: f } = n, h = n.schema.nodes.taskItem, m = n.schema.nodes.paragraph, g = h.create(
            { checked: !1 },
            m.create()
          );
          f.insert(d, g);
          const y = d + 1;
          return f.setSelection(vn.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
      new Ve({
        key: new Ke("taskItemInputRule"),
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
            const d = c[2] === "x", f = i.start() + (c.index || 0), h = r, m = a.tr;
            m.delete(f, h);
            const y = m.doc.resolve(f).blockRange();
            if (!y || !t || !e) return !1;
            const v = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (m.wrap(y, v), f > 1) {
              const b = m.doc.resolve(f - 1).nodeBefore;
              b && b.type === t && kp(m.doc, f - 1) && m.join(f - 1);
            }
            return n.dispatch(m), !0;
          }
        }
      })
    ];
  }
}), Kh = bp.extend({
  content: "paragraph block*"
}), Gi = new Ke("collapsibleList");
function ra(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function oa(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function qh(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (r === -1 && (r = s), o = s + a.nodeSize), s += a.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let Un = null;
function Ns(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !oa(o))
      return !0;
    const a = ra(o, s), i = t.collapsedItems.has(a);
    r.push(
      it.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${i ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const l = o.firstChild;
    if (l && l.type.name === "paragraph") {
      const u = s + 1 + l.nodeSize - 1, c = it.widget(
        u,
        () => {
          const d = CSS.escape(a), f = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${d}"]`
          );
          if (f) {
            f.classList.contains("collapsed") !== i && (f.classList.remove("collapsed", "expanded"), f.classList.add(i ? "collapsed" : "expanded"), f.title = i ? "Click to expand" : "Click to collapse");
            const y = f.parentElement;
            if (y) return y;
          }
          const h = document.createElement("span");
          h.className = "collapsible-list-chevron-wrapper", h.setAttribute("contenteditable", "false");
          const m = document.createElement("button");
          return m.className = `collapsible-list-chevron ${i ? "collapsed" : "expanded"}`, m.setAttribute("data-list-item-id", a), m.setAttribute("contenteditable", "false"), m.setAttribute("tabindex", "-1"), m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', m.title = i ? "Click to expand" : "Click to collapse", m.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = m.classList.contains("collapsed");
            m.classList.remove("collapsed", "expanded"), m.classList.add(y ? "expanded" : "collapsed"), m.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), Un && Un.dispatch(
              Un.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), h.appendChild(m), h;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      r.push(c);
    }
    if (i && qh(o, s)) {
      let c = s + 1;
      o.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && r.push(
          it.node(c, c + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), c += d.nodeSize;
      });
    }
    return !0;
  }), Ze.create(e, r);
}
const Gh = mt.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !oa(o))
          return !1;
        const s = ra(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && oa(o) && n.collapsedItems.add(ra(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ve({
        key: Gi,
        view(n) {
          return Un = n, {
            update(r) {
              Un = r;
            },
            destroy() {
              Un = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Ns(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Ns(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Gi.getState(n);
            return r?.decorations ? r.decorations : Ns(n.doc, e, t);
          }
        }
      })
    ];
  }
}), we = Ep();
we.register("javascript", Ya);
we.register("js", Ya);
we.register("jsx", Ya);
we.register("typescript", ja);
we.register("ts", ja);
we.register("tsx", ja);
we.register("python", Ec);
we.register("py", Ec);
we.register("xml", Va);
we.register("html", Va);
we.register("svg", Va);
we.register("css", gh);
we.register("json", yh);
we.register("bash", Vo);
we.register("sh", Vo);
we.register("shell", Vo);
we.register("zsh", Vo);
we.register("sql", bh);
we.register("java", vh);
we.register("cpp", Nc);
we.register("c", Nc);
we.register("go", Dc);
we.register("golang", Dc);
we.register("rust", Rc);
we.register("rs", Rc);
we.register("markdown", Ac);
we.register("md", Ac);
we.register("yaml", Lc);
we.register("yml", Lc);
we.register("diff", Pc);
we.register("patch", Pc);
function Xh({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = V(!1), [s, a] = V(!1), i = q(null);
  J(() => {
    const f = i.current;
    if (!f || s) return;
    const h = new IntersectionObserver(
      (m) => {
        for (const g of m)
          g.isIntersecting && (a(!0), h.unobserve(f));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return h.observe(f), () => {
      h.disconnect();
    };
  }, [s]);
  const l = U(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (f) {
      console.error("Failed to copy:", f);
    }
  }, [e.textContent]), u = n.options.lowlight?.listLanguages?.() || [], c = e.attrs.language || "plaintext", d = c === "plaintext" ? "Plain Text" : c.charAt(0).toUpperCase() + c.slice(1);
  return /* @__PURE__ */ A(Xn, { className: "code-block-wrapper", ref: i, children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ A(
          "select",
          {
            value: c,
            onChange: (f) => t({ language: f.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ p("option", { value: "plaintext", children: "Plain Text" }),
              u.map((f) => /* @__PURE__ */ p("option", { value: f, children: f.charAt(0).toUpperCase() + f.slice(1) }, f))
            ]
          }
        ),
        /* @__PURE__ */ p("span", { className: "code-block-language-label", children: d }),
        /* @__PURE__ */ p(en, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: l,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ p(rr, { size: 14 }) : /* @__PURE__ */ p(or, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ p("pre", { className: `code-block-pre ${s ? "" : "code-block-deferred"}`, children: /* @__PURE__ */ p(Ea, { className: s ? `language-${c}` : "language-plaintext" }) })
  ] });
}
const Zh = Mp.extend({
  addNodeView() {
    return Wo(Xh);
  }
}).configure({
  lowlight: we,
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
  const o = U(
    (i) => {
      r?.(i), i.stopPropagation();
    },
    [r]
  ), s = U((i) => {
    i.stopPropagation();
  }, []), a = U((i) => {
    i.stopPropagation();
  }, []);
  return kh(
    /* @__PURE__ */ p(
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
        onClick: a,
        children: e
      }
    ),
    document.body
  );
}
function Qh({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = V(""), s = q(null), a = q(null), [i, l] = V({ top: 0, left: 0 });
  J(() => {
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
  }, [t, e]), J(() => {
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
  const u = U((m) => {
    if (m?.preventDefault(), r.trim()) {
      let g = r.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), c = U((m) => {
    m.key === "Escape" ? (m.preventDefault(), n()) : m.key === "Enter" && (m.preventDefault(), u());
  }, [n, u]);
  if (!t) return null;
  const f = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", h = /* @__PURE__ */ p(
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
      children: /* @__PURE__ */ A("form", { onSubmit: u, className: "link-popover-form", children: [
        /* @__PURE__ */ A("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ p(Na, { className: "link-popover-icon", size: 16 }),
          /* @__PURE__ */ p(
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
        /* @__PURE__ */ p("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" })
      ] })
    }
  );
  return /* @__PURE__ */ p(Wt, { children: h });
}
function Jh({ editor: e, onEditLink: t }) {
  const [n, r] = V({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = q(null), s = q(null), a = U((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const S = w.getAttribute("href") || "", k = w.getBoundingClientRect(), C = k.bottom + 8, N = Math.max(16, Math.min(k.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: S,
          position: { top: C, left: N },
          linkElement: w
        });
      } catch (S) {
        console.warn("LinkHoverTooltip: Error showing tooltip", S);
      }
    }
  }, [e]), i = U(() => {
    s.current = setTimeout(() => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = U(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  J(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const S = (C) => {
      const x = C.target.closest("a");
      x && w.contains(x) && a(x);
    }, k = (C) => {
      const N = C.target, x = C.relatedTarget;
      if (N.closest("a")) {
        if (x && o.current?.contains(x))
          return;
        i();
      }
    };
    return w.addEventListener("mouseover", S), w.addEventListener("mouseout", k), () => {
      w.removeEventListener("mouseover", S), w.removeEventListener("mouseout", k), s.current && clearTimeout(s.current);
    };
  }, [e, a, i]), J(() => {
    if (!n.isVisible) return;
    const w = () => {
      r((k) => ({ ...k, isVisible: !1, linkElement: null }));
    }, S = e.view.dom.closest(".editor-content-wrapper");
    return S?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      S?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e]);
  const [u, c] = V(!1), d = U(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      c(!0), setTimeout(() => c(!1), 1500);
    });
  }, [n.url]), f = U(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), h = U(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: S } = w.state;
      let k = null, C = null;
      S.descendants((N, x) => {
        if (N.isText && N.marks.some((M) => M.type.name === "link")) {
          const M = w.nodeDOM(x);
          if (M && (M === n.linkElement || M.parentElement === n.linkElement))
            return k = x, C = x + N.nodeSize, !1;
        }
        return !0;
      }), k !== null && C !== null ? e.chain().focus().setTextSelection({ from: k, to: C }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), m = U(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: S } = w.state;
      S.descendants((k, C) => {
        if (k.isText && k.marks.some((N) => N.type.name === "link")) {
          const N = w.nodeDOM(C);
          if (N && (N === n.linkElement || N.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: C, to: C + k.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((w) => ({ ...w, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const g = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, v = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", b = /* @__PURE__ */ p(
    "div",
    {
      ref: o,
      className: "link-hover-tooltip",
      "data-theme": v,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`
      },
      onMouseEnter: l,
      onMouseLeave: i,
      children: /* @__PURE__ */ A("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ A(
          "button",
          {
            onClick: f,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ p(Lp, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ p("span", { className: "link-hover-tooltip-url", children: g || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ A("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: m,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ p(Pp, { size: 14 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: d,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: u ? /* @__PURE__ */ p(rr, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ p(or, { size: 14 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ p(Ip, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ p(Wt, { children: b });
}
const at = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ p(
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
), Xi = () => /* @__PURE__ */ p("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), Zi = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], em = nr(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: a, executeCommand: i }) {
  const [l, u] = V(!1), c = q(null), d = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : a ? "h5" : "paragraph", f = Zi.find((m) => m.value === d)?.shortLabel || "P";
  J(() => {
    if (!l) return;
    const m = (g) => {
      c.current && !c.current.contains(g.target) && u(!1);
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [l]);
  const h = (m, g) => {
    if (m.preventDefault(), m.stopPropagation(), g === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const y = parseInt(g.replace("h", ""));
      t.chain().focus().toggleHeading({ level: y }).run();
    }
    u(!1);
  };
  return /* @__PURE__ */ A("div", { ref: c, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ A(
      "button",
      {
        onMouseDown: (m) => {
          m.preventDefault(), m.stopPropagation(), u(!l);
        },
        title: "Text style",
        className: `
          flex items-center gap-1 h-7 px-2 rounded-md flex-shrink-0
          transition-all duration-100 ease-out touch-manipulation
          text-xs font-normal overflow-visible
          ${d !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ p("span", { className: "min-w-[18px] text-center", children: f }),
          /* @__PURE__ */ p(en, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` })
        ]
      }
    ),
    l && /* @__PURE__ */ p(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: Zi.map((m) => {
          const g = m.value === d;
          return /* @__PURE__ */ A(
            "button",
            {
              onMouseDown: (y) => h(y, m.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${g ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ p("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: m.shortLabel }),
                /* @__PURE__ */ p("span", { children: m.label })
              ]
            },
            m.value
          );
        })
      }
    )
  ] });
}), tm = nr(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const a = q(null), i = dc({
    editor: t,
    selector: ({ editor: M }) => ({
      isBold: M.isActive("bold"),
      isItalic: M.isActive("italic"),
      isUnderline: M.isActive("underline"),
      isStrike: M.isActive("strike"),
      isCode: M.isActive("code"),
      isHighlight: M.isActive("highlight"),
      isLink: M.isActive("link"),
      isH1: M.isActive("heading", { level: 1 }),
      isH2: M.isActive("heading", { level: 2 }),
      isH3: M.isActive("heading", { level: 3 }),
      isH4: M.isActive("heading", { level: 4 }),
      isH5: M.isActive("heading", { level: 5 }),
      isBulletList: M.isActive("bulletList"),
      isOrderedList: M.isActive("orderedList"),
      isTaskList: M.isActive("taskList"),
      isBlockquote: M.isActive("blockquote"),
      isCodeBlock: M.isActive("codeBlock")
    })
  }), [l, u] = V(!1), [c, d] = V(""), [f, h] = V(!1), [m, g] = V({ top: 0, left: 0 }), y = q(null), v = q(null), b = q(null), w = U(() => {
    if (c) {
      let M = c.trim();
      !/^https?:\/\//i.test(M) && !M.startsWith("mailto:") && (M = "https://" + M), t.chain().focus().extendMarkRange("link").setLink({ href: M }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    u(!1), d("");
  }, [t, c]), S = (M) => {
    M.preventDefault(), M.stopPropagation();
    const E = t.getAttributes("link").href;
    d(E || ""), u(!0);
  }, k = U((M, E) => {
    M.preventDefault(), M.stopPropagation(), E();
  }, []);
  J(() => {
    if (!t || t.isDestroyed) return;
    const M = () => {
      if (!t.isDestroyed)
        try {
          const { selection: E } = t.state, { empty: D, from: R, to: I } = E, W = ("node" in E && E.node ? E.node : null)?.type?.name === "resizableImage";
          if (D || W || t.isActive("codeBlock")) {
            b.current && (clearTimeout(b.current), b.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              h(!1), u(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const G = t.view.coordsAtPos(R), P = t.view.coordsAtPos(I), L = y.current?.offsetWidth || 500, F = y.current?.offsetHeight || 40, X = 8, K = window.innerWidth;
          let Z = 0, te = 0;
          if (y.current) {
            const ge = y.current.closest('[data-slot="dialog-content"]');
            if (ge) {
              const be = ge.getBoundingClientRect();
              Z = be.left, te = be.top;
            }
          }
          let B = (G.left + P.left) / 2 - L / 2 - Z;
          const j = Z ? K - Z : K;
          B = Math.max(X, Math.min(j - L - X, B));
          let ee = G.top - F - 10 - te;
          ee < X && (ee = P.bottom + 10 - te), f ? g({ top: Math.max(X, ee), left: B }) : (b.current && clearTimeout(b.current), b.current = setTimeout(() => {
            g({ top: Math.max(X, ee), left: B }), h(!0);
          }, 50));
        } catch (E) {
          console.warn("FloatingToolbar: Error updating position", E);
        }
    };
    return t.on("selectionUpdate", M), () => {
      t.off("selectionUpdate", M), v.current && clearTimeout(v.current), b.current && clearTimeout(b.current);
    };
  }, [t, f]);
  const C = (M) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!f || r)
    return null;
  const N = 15, x = l ? /* @__PURE__ */ p(
    "div",
    {
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: m.top,
        left: m.left
      },
      onMouseDown: C,
      children: /* @__PURE__ */ A("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ p(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: c,
            onChange: (M) => d(M.target.value),
            onKeyDown: (M) => {
              M.key === "Enter" && (M.preventDefault(), w()), M.key === "Escape" && (u(!1), d(""));
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
          /* @__PURE__ */ p(
            "button",
            {
              onMouseDown: (M) => {
                M.preventDefault(), w();
              },
              className: `
              flex-1 sm:flex-none px-4 sm:px-3 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
              bg-primary text-primary-foreground
              hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation
            `,
              children: "Apply"
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onMouseDown: (M) => {
                M.preventDefault(), u(!1), d("");
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
        left: m.left
      },
      onMouseDown: C,
      children: [
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleBold().run()),
            isActive: i?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ p(Da, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleItalic().run()),
            isActive: i?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ p(Ra, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleUnderline().run()),
            isActive: i?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ p(Aa, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleStrike().run()),
            isActive: i?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ p(La, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleCode().run()),
            isActive: i?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ p(mc, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleHighlight().run()),
            isActive: i?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ p(gc, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: S,
            isActive: i?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ p(Pa, { size: N })
          }
        ),
        /* @__PURE__ */ p(Xi, {}),
        /* @__PURE__ */ p(
          em,
          {
            editor: t,
            isH1: i?.isH1 ?? !1,
            isH2: i?.isH2 ?? !1,
            isH3: i?.isH3 ?? !1,
            isH4: i?.isH4 ?? !1,
            isH5: i?.isH5 ?? !1,
            executeCommand: k
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleBlockquote().run()),
            isActive: i?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ p(Ia, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleBulletList().run()),
            isActive: i?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ p(Oa, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleOrderedList().run()),
            isActive: i?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ p($a, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleTaskList().run()),
            isActive: i?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ p(_a, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          at,
          {
            onMouseDown: (M) => k(M, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: i?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ p(Op, { size: N })
          }
        ),
        o && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ p(Xi, {}),
          /* @__PURE__ */ p(
            "button",
            {
              ref: a,
              onMouseDown: (M) => {
                M.preventDefault(), M.stopPropagation(), a.current && s?.(a.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ p(Yo, { size: N })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ p(Wt, { onMouseDown: C, children: x });
}), oo = {
  info: { icon: Mo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: bc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: yc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: za, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Ha, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function nm({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = V(!1), [s, a] = V(!1), [i, l] = V(null), u = q(null), c = q(null), d = e.attrs.type || "info", f = oo[d] || oo.info, h = f.icon, m = U(() => {
    if (c.current) {
      const b = c.current.getBoundingClientRect();
      l({
        top: b.bottom + 4,
        left: b.left
      });
    }
  }, []);
  J(() => {
    if (!r) return;
    const b = (w) => {
      u.current && !u.current.contains(w.target) && c.current && !c.current.contains(w.target) && o(!1);
    };
    return document.addEventListener("mousedown", b), document.addEventListener("touchstart", b, { passive: !0 }), () => {
      document.removeEventListener("mousedown", b), document.removeEventListener("touchstart", b);
    };
  }, [r]), J(() => {
    if (!r) return;
    const b = () => o(!1);
    return window.addEventListener("scroll", b, !0), () => window.removeEventListener("scroll", b, !0);
  }, [r]);
  const g = U(() => {
    n.isEditable && (r || m(), o(!r));
  }, [n.isEditable, r, m]), y = (b) => {
    t({ type: b }), o(!1);
  }, v = U((b) => {
    b.stopPropagation(), a((w) => !w);
  }, []);
  return /* @__PURE__ */ A(Xn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ A(
      "div",
      {
        className: "callout-header",
        contentEditable: !1,
        onClick: v,
        style: { cursor: "pointer" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ A(
            "button",
            {
              ref: c,
              className: "callout-header-button",
              onClick: (b) => {
                b.stopPropagation(), g();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor },
              contentEditable: !1,
              children: [
                /* @__PURE__ */ p(h, { size: 18 }),
                /* @__PURE__ */ p("span", { className: "callout-label", children: f.label }),
                n.isEditable && /* @__PURE__ */ p(en, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ p(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ p(vc, { size: 16 }) : /* @__PURE__ */ p(en, { size: 16 })
            }
          ),
          r && n.isEditable && i && /* @__PURE__ */ p(Wt, { children: /* @__PURE__ */ p(
            "div",
            {
              ref: u,
              className: "callout-type-dropdown",
              contentEditable: !1,
              style: {
                position: "fixed",
                top: i.top,
                left: i.left
              },
              children: Object.keys(oo).map((b) => {
                const w = oo[b], S = w.icon;
                return /* @__PURE__ */ A(
                  "button",
                  {
                    className: `callout-type-option ${b === d ? "active" : ""}`,
                    onClick: (k) => {
                      k.stopPropagation(), y(b);
                    },
                    onMouseDown: (k) => k.stopPropagation(),
                    style: { "--callout-option-color": w.color },
                    children: [
                      /* @__PURE__ */ p(S, { size: 16, style: { color: w.borderColor } }),
                      /* @__PURE__ */ p("span", { children: w.label })
                    ]
                  },
                  b
                );
              })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ p("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ p(Ea, {}) })
  ] });
}
const rm = Fo.create({
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
      tr(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return Wo(nm);
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
}), om = xh.extend({
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
        tr(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addNodeView() {
    const e = this.options;
    return ({ node: t, editor: n, getPos: r }) => {
      let o = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const a = (L) => {
        const F = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[L] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${F}`;
      };
      a(t.attrs.align || "left");
      const i = document.createElement("img");
      i.alt = t.attrs.alt || "", t.attrs.width && (i.style.width = `${t.attrs.width}px`);
      const l = (L) => !(!L || L.startsWith("data:") || L.startsWith("blob:") || L.startsWith("http://") || L.startsWith("https://")), u = (L) => {
        l(L) && e.resolveImageSrc ? (i.style.opacity = "0.5", i.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(L).then((F) => {
          i.src = F, i.style.opacity = "1";
        }).catch(() => {
          i.src = L, i.style.opacity = "1";
        })) : i.src = L;
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
      const h = (L, F, X) => {
        const K = document.createElement("button");
        return K.setAttribute("type", "button"), K.style.cssText = `
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
        `, K.innerHTML = `${F}<span>${L}</span>`, K.addEventListener("mouseenter", () => {
          K.style.background = "oklch(0.95 0 0)";
        }), K.addEventListener("mouseleave", () => {
          K.style.background = "transparent";
        }), K.addEventListener("click", (Z) => {
          Z.preventDefault(), Z.stopPropagation(), X(), f.style.display = "none", M = !1;
        }), K;
      }, m = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(h("Edit", m, () => {
        const L = typeof r == "function" ? r() : null;
        if (L != null && e.onImageClick) {
          const F = i.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: L,
            rect: F
          });
        }
      })), f.appendChild(h("Copy image", g, async () => {
        const L = o.attrs.src;
        try {
          const X = await (await fetch(L)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [X.type]: X })
          ]);
        } catch {
          try {
            const F = new window.Image();
            F.crossOrigin = "anonymous", await new Promise((Z, te) => {
              F.onload = () => Z(), F.onerror = () => te(new Error("Image load failed")), F.src = L;
            });
            const X = document.createElement("canvas");
            X.width = F.naturalWidth, X.height = F.naturalHeight;
            const K = X.getContext("2d");
            if (K) {
              K.drawImage(F, 0, 0);
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
      })), f.appendChild(h("Copy URL", v, async () => {
        const L = o.attrs.src;
        try {
          await navigator.clipboard.writeText(L);
        } catch {
        }
      })), f.appendChild(h("Save image", y, () => {
        const L = o.attrs.src, F = o.attrs.alt || "image", X = document.createElement("a");
        X.href = L, X.download = F, X.target = "_blank", X.rel = "noopener noreferrer", document.body.appendChild(X), X.click(), setTimeout(() => {
          document.body.removeChild(X);
        }, 100);
      }));
      const b = document.createElement("div");
      b.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(b);
      const w = document.createElement("div");
      w.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, w.textContent = "Alignment", f.appendChild(w);
      const S = document.createElement("div");
      S.style.cssText = `
        display: flex;
        margin: 4px 8px 4px;
        background: oklch(0.94 0 0);
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
      `;
      const k = [
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
      ], C = [], N = (L) => {
        C.forEach((F) => {
          (F.getAttribute("data-align-value") || "left") === L ? (F.style.background = "oklch(1 0 0)", F.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", F.style.color = "oklch(0.25 0 0)", F.style.fontWeight = "600") : (F.style.background = "transparent", F.style.boxShadow = "none", F.style.color = "oklch(0.5 0 0)", F.style.fontWeight = "400");
        });
      };
      k.forEach(({ value: L, label: F, icon: X }) => {
        const K = document.createElement("button");
        K.setAttribute("type", "button"), K.setAttribute("data-align-value", L), K.setAttribute("title", `Align ${F.toLowerCase()}`), K.style.cssText = `
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
        `, K.innerHTML = `${X}<span>${F}</span>`, K.addEventListener("click", (Z) => {
          Z.preventDefault(), Z.stopPropagation();
          const te = typeof r == "function" ? r() : null;
          if (te != null)
            try {
              const { state: _, dispatch: B } = n.view, j = _.doc.nodeAt(te);
              if (j && j.type.name === "resizableImage") {
                const ee = _.tr.setNodeMarkup(te, void 0, {
                  ...j.attrs,
                  align: L
                });
                B(ee);
              }
            } catch {
              n.chain().focus().setNodeSelection(te).updateAttributes("resizableImage", {
                align: L
              }).run();
            }
          N(L);
        }), C.push(K), S.appendChild(K);
      }), f.appendChild(S);
      const x = () => {
        const L = o.attrs.align || "left";
        N(L);
      };
      let M = !1;
      d.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), M)
          f.style.display = "none", M = !1;
        else {
          const F = d.getBoundingClientRect(), X = 200, K = f.closest('[role="dialog"]');
          let Z = 0, te = 0;
          if (K) {
            const be = K.getBoundingClientRect();
            Z = be.left, te = be.top;
          }
          let _ = F.bottom + 4 - te, B = F.right - X - Z;
          const j = window.innerHeight, ee = window.innerWidth, ge = 200;
          F.bottom + 4 + ge > j && (_ = F.top - ge - 4 - te), B + Z < 8 && (B = 8 - Z), B + X + Z > ee - 8 && (B = ee - X - 8 - Z), f.style.top = `${_}px`, f.style.left = `${B}px`, f.style.display = "flex", M = !0, x();
        }
      });
      const E = (L) => {
        !f.contains(L.target) && !d.contains(L.target) && (f.style.display = "none", M = !1);
      };
      document.addEventListener("click", E);
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
      }), s.appendChild(i), s.appendChild(D), s.appendChild(c), s.appendChild(d);
      const R = s.closest('[role="dialog"]');
      R ? R.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        c.style.opacity = "1", d.style.opacity = "1", D.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        c.style.opacity = "0", D.style.opacity = "0", M || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const I = (L) => {
        L.preventDefault(), L.stopPropagation();
        const F = document.createElement("div");
        F.style.cssText = `
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
        const _ = () => {
          F.style.opacity = "0", X.style.transform = "scale(0.92)", setTimeout(() => F.remove(), 200);
        };
        F.addEventListener("click", (ee) => {
          ee.target === F && _();
        }), K.addEventListener("click", _);
        const B = (ee) => {
          ee.key === "Escape" && (_(), document.removeEventListener("keydown", B));
        };
        document.addEventListener("keydown", B), F.appendChild(X), F.appendChild(K), te && F.appendChild(te);
        const j = s.closest('[role="dialog"]');
        j ? j.appendChild(F) : document.body.appendChild(F), requestAnimationFrame(() => {
          F.style.opacity = "1", X.style.transform = "scale(1)";
        });
      };
      D.addEventListener("click", I);
      let O, H;
      const W = (L) => {
        L.preventDefault(), O = L.clientX, H = i.offsetWidth, document.addEventListener("mousemove", G), document.addEventListener("mouseup", P);
      }, G = (L) => {
        const F = L.clientX - O, X = Math.max(100, H + F);
        i.style.width = `${X}px`;
      }, P = () => {
        document.removeEventListener("mousemove", G), document.removeEventListener("mouseup", P), setTimeout(() => {
        }, 100);
        const L = typeof r == "function" ? r() : null, F = i.offsetWidth;
        if (L != null)
          try {
            const { state: X, dispatch: K } = n.view, Z = X.doc.nodeAt(L);
            if (Z && Z.type.name === "resizableImage") {
              const te = X.tr.setNodeMarkup(L, void 0, {
                ...Z.attrs,
                width: F
              });
              K(te);
            }
          } catch {
            n.chain().focus().setNodeSelection(L).updateAttributes("resizableImage", {
              width: F
            }).run();
          }
      };
      return c.addEventListener("mousedown", W), {
        dom: s,
        update: (L) => L.type.name !== "resizableImage" ? !1 : (o = L, u(L.attrs.src), i.alt = L.attrs.alt || "", L.attrs.width && (i.style.width = `${L.attrs.width}px`), a(L.attrs.align || "left"), !0),
        destroy: () => {
          c.removeEventListener("mousedown", W), D.removeEventListener("click", I), document.removeEventListener("click", E), f.remove();
        }
      };
    };
  }
});
function sm(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const am = {}, xr = {};
function yn(e, t) {
  try {
    const r = (am[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in xr ? xr[r] : Qi(r, r.split(":"));
  } catch {
    if (e in xr) return xr[e];
    const n = e?.match(im);
    return n ? Qi(e, n.slice(1)) : NaN;
  }
}
const im = /([+-]\d\d):?(\d\d)?/;
function Qi(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return xr[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class vt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(yn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Oc(this), sa(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new vt(...n, t) : new vt(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new vt(+this, t);
  }
  getTimezoneOffset() {
    const t = -yn(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), sa(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new vt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ji = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ji.test(e)) return;
  const t = e.replace(Ji, "$1UTC");
  vt.prototype[t] && (e.startsWith("get") ? vt.prototype[e] = function() {
    return this.internal[t]();
  } : (vt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), lm(this), +this;
  }, vt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), sa(this), +this;
  }));
});
function sa(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-yn(e.timeZone, e) * 60));
}
function lm(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Oc(e);
}
function Oc(e) {
  const t = yn(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), a = o - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const c = o > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, d = Math.round(-(yn(e.timeZone, e) * 60)) % 60;
  (d || c) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + c));
  const f = yn(e.timeZone, e), h = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, y = h !== n, v = g - l;
  if (y && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const b = yn(e.timeZone, e), w = b > 0 ? Math.floor(b) : Math.ceil(b), S = h - w;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class Ye extends vt {
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
    return `${t} GMT${n}${r}${o} (${sm(this.timeZone, this)})`;
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
const $c = 6048e5, cm = 864e5, el = Symbol.for("constructDateFrom");
function Ie(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && el in e ? e[el](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Ee(e, t) {
  return Ie(t || e, e);
}
function _c(e, t, n) {
  const r = Ee(e, n?.in);
  return isNaN(t) ? Ie(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Hc(e, t, n) {
  const r = Ee(e, n?.in);
  if (isNaN(t)) return Ie(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Ie(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const a = s.getDate();
  return o >= a ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let um = {};
function Hr() {
  return um;
}
function Zn(e, t) {
  const n = Hr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Ee(e, t?.in), s = o.getDay(), a = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - a), o.setHours(0, 0, 0, 0), o;
}
function Rr(e, t) {
  return Zn(e, { ...t, weekStartsOn: 1 });
}
function zc(e, t) {
  const n = Ee(e, t?.in), r = n.getFullYear(), o = Ie(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Rr(o), a = Ie(n, 0);
  a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Rr(a);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function tl(e) {
  const t = Ee(e), n = new Date(
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
function sr(e, ...t) {
  const n = Ie.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Ar(e, t) {
  const n = Ee(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Bc(e, t, n) {
  const [r, o] = sr(
    n?.in,
    e,
    t
  ), s = Ar(r), a = Ar(o), i = +s - tl(s), l = +a - tl(a);
  return Math.round((i - l) / cm);
}
function dm(e, t) {
  const n = zc(e, t), r = Ie(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Rr(r);
}
function fm(e, t, n) {
  return _c(e, t * 7, n);
}
function pm(e, t, n) {
  return Hc(e, t * 12, n);
}
function hm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ie.bind(null, o));
    const s = Ee(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Ie(r, n || NaN);
}
function mm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ie.bind(null, o));
    const s = Ee(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Ie(r, n || NaN);
}
function gm(e, t, n) {
  const [r, o] = sr(
    n?.in,
    e,
    t
  );
  return +Ar(r) == +Ar(o);
}
function Wc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ym(e) {
  return !(!Wc(e) && typeof e != "number" || isNaN(+Ee(e)));
}
function bm(e, t, n) {
  const [r, o] = sr(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), a = r.getMonth() - o.getMonth();
  return s * 12 + a;
}
function vm(e, t) {
  const n = Ee(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Fc(e, t) {
  const [n, r] = sr(e, t.start, t.end);
  return { start: n, end: r };
}
function wm(e, t) {
  const { start: n, end: r } = Fc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(Ie(n, a)), a.setMonth(a.getMonth() + i);
  return o ? l.reverse() : l;
}
function km(e, t) {
  const n = Ee(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function xm(e, t) {
  const n = Ee(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Uc(e, t) {
  const n = Ee(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Cm(e, t) {
  const { start: n, end: r } = Fc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(Ie(n, a)), a.setFullYear(a.getFullYear() + i);
  return o ? l.reverse() : l;
}
function Yc(e, t) {
  const n = Hr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Ee(e, t?.in), s = o.getDay(), a = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + a), o.setHours(23, 59, 59, 999), o;
}
function Sm(e, t) {
  return Yc(e, { ...t, weekStartsOn: 1 });
}
const Tm = {
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
}, Mm = (e, t, n) => {
  let r;
  const o = Tm[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Ds(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Em = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Nm = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Dm = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Rm = {
  date: Ds({
    formats: Em,
    defaultWidth: "full"
  }),
  time: Ds({
    formats: Nm,
    defaultWidth: "full"
  }),
  dateTime: Ds({
    formats: Dm,
    defaultWidth: "full"
  })
}, Am = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Lm = (e, t, n, r) => Am[e];
function gr(e) {
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
const Pm = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Im = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Om = {
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
}, $m = {
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
}, _m = {
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
}, Hm = {
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
}, zm = (e, t) => {
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
}, Bm = {
  ordinalNumber: zm,
  era: gr({
    values: Pm,
    defaultWidth: "wide"
  }),
  quarter: gr({
    values: Im,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: gr({
    values: Om,
    defaultWidth: "wide"
  }),
  day: gr({
    values: $m,
    defaultWidth: "wide"
  }),
  dayPeriod: gr({
    values: _m,
    defaultWidth: "wide",
    formattingValues: Hm,
    defaultFormattingWidth: "wide"
  })
};
function yr(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const a = s[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? Fm(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      Wm(i, (d) => d.test(a))
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
function Wm(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Fm(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Um(e) {
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
const Ym = /^(\d+)(th|st|nd|rd)?/i, jm = /\d+/i, Vm = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Km = {
  any: [/^b/i, /^(a|c)/i]
}, qm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Gm = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Xm = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Zm = {
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
}, Qm = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Jm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, eg = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, tg = {
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
}, ng = {
  ordinalNumber: Um({
    matchPattern: Ym,
    parsePattern: jm,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: yr({
    matchPatterns: Vm,
    defaultMatchWidth: "wide",
    parsePatterns: Km,
    defaultParseWidth: "any"
  }),
  quarter: yr({
    matchPatterns: qm,
    defaultMatchWidth: "wide",
    parsePatterns: Gm,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: yr({
    matchPatterns: Xm,
    defaultMatchWidth: "wide",
    parsePatterns: Zm,
    defaultParseWidth: "any"
  }),
  day: yr({
    matchPatterns: Qm,
    defaultMatchWidth: "wide",
    parsePatterns: Jm,
    defaultParseWidth: "any"
  }),
  dayPeriod: yr({
    matchPatterns: eg,
    defaultMatchWidth: "any",
    parsePatterns: tg,
    defaultParseWidth: "any"
  })
}, qa = {
  code: "en-US",
  formatDistance: Mm,
  formatLong: Rm,
  formatRelative: Lm,
  localize: Bm,
  match: ng,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function rg(e, t) {
  const n = Ee(e, t?.in);
  return Bc(n, Uc(n)) + 1;
}
function jc(e, t) {
  const n = Ee(e, t?.in), r = +Rr(n) - +dm(n);
  return Math.round(r / $c) + 1;
}
function Vc(e, t) {
  const n = Ee(e, t?.in), r = n.getFullYear(), o = Hr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = Ie(t?.in || e, 0);
  a.setFullYear(r + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = Zn(a, t), l = Ie(t?.in || e, 0);
  l.setFullYear(r, 0, s), l.setHours(0, 0, 0, 0);
  const u = Zn(l, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function og(e, t) {
  const n = Hr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Vc(e, t), s = Ie(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Zn(s, t);
}
function Kc(e, t) {
  const n = Ee(e, t?.in), r = +Zn(n, t) - +og(n, t);
  return Math.round(r / $c) + 1;
}
function Te(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Gt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return Te(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : Te(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return Te(e.getDate(), t.length);
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
    return Te(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return Te(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return Te(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return Te(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return Te(o, t.length);
  }
}, In = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, nl = {
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
    return Gt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Vc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const a = s % 100;
      return Te(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : Te(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = zc(e);
    return Te(n, t.length);
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
    return Te(n, t.length);
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
        return Te(r, 2);
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
        return Te(r, 2);
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
        return Gt.M(e, t);
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
        return Te(r + 1, 2);
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
    const o = Kc(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : Te(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = jc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Te(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Gt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = rg(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Te(r, t.length);
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
        return Te(s, 2);
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
        return Te(s, t.length);
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
        return Te(o, t.length);
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
    switch (r === 12 ? o = In.noon : r === 0 ? o = In.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = In.evening : r >= 12 ? o = In.afternoon : r >= 4 ? o = In.morning : o = In.night, t) {
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
    return Gt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Gt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Te(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Te(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Gt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Gt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Gt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return ol(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return hn(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return hn(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return ol(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return hn(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return hn(r, ":");
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
        return "GMT" + rl(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + hn(r, ":");
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
        return "GMT" + rl(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + hn(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return Te(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return Te(+e, t.length);
  }
};
function rl(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + Te(s, 2);
}
function ol(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + Te(Math.abs(e) / 60, 2) : hn(e, t);
}
function hn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Te(Math.trunc(r / 60), 2), s = Te(r % 60, 2);
  return n + o + t + s;
}
const sl = (e, t) => {
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
}, qc = (e, t) => {
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
}, sg = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return sl(e, t);
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
  return s.replace("{{date}}", sl(r, t)).replace("{{time}}", qc(o, t));
}, ag = {
  p: qc,
  P: sg
}, ig = /^D+$/, lg = /^Y+$/, cg = ["D", "DD", "YY", "YYYY"];
function ug(e) {
  return ig.test(e);
}
function dg(e) {
  return lg.test(e);
}
function fg(e, t, n) {
  const r = pg(e, t, n);
  if (console.warn(r), cg.includes(e)) throw new RangeError(r);
}
function pg(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const hg = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, mg = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, gg = /^'([^]*?)'?$/, yg = /''/g, bg = /[a-zA-Z]/;
function vg(e, t, n) {
  const r = Hr(), o = n?.locale ?? r.locale ?? qa, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = Ee(e, n?.in);
  if (!ym(i))
    throw new RangeError("Invalid time value");
  let l = t.match(mg).map((c) => {
    const d = c[0];
    if (d === "p" || d === "P") {
      const f = ag[d];
      return f(c, o.formatLong);
    }
    return c;
  }).join("").match(hg).map((c) => {
    if (c === "''")
      return { isToken: !1, value: "'" };
    const d = c[0];
    if (d === "'")
      return { isToken: !1, value: wg(c) };
    if (nl[d])
      return { isToken: !0, value: c };
    if (d.match(bg))
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
    (!n?.useAdditionalWeekYearTokens && dg(d) || !n?.useAdditionalDayOfYearTokens && ug(d)) && fg(d, t, String(e));
    const f = nl[d[0]];
    return f(i, d, o.localize, u);
  }).join("");
}
function wg(e) {
  const t = e.match(gg);
  return t ? t[1].replace(yg, "'") : e;
}
function kg(e, t) {
  const n = Ee(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Ie(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function xg(e, t) {
  return Ee(e, t?.in).getMonth();
}
function Cg(e, t) {
  return Ee(e, t?.in).getFullYear();
}
function Sg(e, t) {
  return +Ee(e) > +Ee(t);
}
function Tg(e, t) {
  return +Ee(e) < +Ee(t);
}
function Mg(e, t, n) {
  const [r, o] = sr(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Eg(e, t, n) {
  const [r, o] = sr(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Ng(e, t, n) {
  const r = Ee(e, n?.in), o = r.getFullYear(), s = r.getDate(), a = Ie(e, 0);
  a.setFullYear(o, t, 15), a.setHours(0, 0, 0, 0);
  const i = kg(a);
  return r.setMonth(t, Math.min(s, i)), r;
}
function Dg(e, t, n) {
  const r = Ee(e, n?.in);
  return isNaN(+r) ? Ie(e, NaN) : (r.setFullYear(t), r);
}
const al = 5, Rg = 4;
function Ag(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, al * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? al : Rg;
}
function Gc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Lg(e, t) {
  const n = Gc(e, t), r = Ag(e, t);
  return t.addDays(n, r * 7 - 1);
}
class rt {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ye.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Ye(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : _c(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Hc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : fm(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : pm(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Bc(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : bm(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : wm(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Cm(r), s = new Set(o.map((i) => this.getYear(i)));
      if (s.size === o.length)
        return o;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Lg(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Sm(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : vm(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Yc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : xm(r), this.format = (r, o, s) => {
      const a = this.overrides?.format ? this.overrides.format(r, o, this.options) : vg(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : jc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : xg(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : Cg(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Kc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Sg(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Tg(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Wc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : gm(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : Mg(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Eg(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : hm(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : mm(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : Ng(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : Dg(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Gc(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : Ar(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Rr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : km(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Zn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Uc(r), this.options = { locale: qa, ...t }, this.overrides = n;
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
    return t && rt.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && rt.yearFirstLocales.has(s))
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
rt.yearFirstLocales = /* @__PURE__ */ new Set([
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
const Ct = new rt();
class Xc {
  constructor(t, n, r = Ct) {
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
class Pg {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Ig {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Og(e) {
  return Q.createElement("button", { ...e });
}
function $g(e) {
  return Q.createElement("span", { ...e });
}
function _g(e) {
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
function Hg(e) {
  const { day: t, modifiers: n, ...r } = e;
  return Q.createElement("td", { ...r });
}
function zg(e) {
  const { day: t, modifiers: n, ...r } = e, o = Q.useRef(null);
  return Q.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), Q.createElement("button", { ref: o, ...r });
}
var ae;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(ae || (ae = {}));
var Re;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Re || (Re = {}));
var ft;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(ft || (ft = {}));
var et;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(et || (et = {}));
function Bg(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, a = [o[ae.Dropdown], n].join(" "), i = t?.find(({ value: l }) => l === s.value);
  return Q.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[ae.DropdownRoot] },
    Q.createElement(r.Select, { className: a, ...s }, t?.map(({ value: l, label: u, disabled: c }) => Q.createElement(r.Option, { key: l, value: l, disabled: c }, u))),
    Q.createElement(
      "span",
      { className: o[ae.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      Q.createElement(r.Chevron, { orientation: "down", size: 18, className: o[ae.Chevron] })
    )
  );
}
function Wg(e) {
  return Q.createElement("div", { ...e });
}
function Fg(e) {
  return Q.createElement("div", { ...e });
}
function Ug(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return Q.createElement("div", { ...r }, e.children);
}
function Yg(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return Q.createElement("div", { ...r });
}
function jg(e) {
  return Q.createElement("table", { ...e });
}
function Vg(e) {
  return Q.createElement("div", { ...e });
}
const Zc = pc(void 0);
function zr() {
  const e = hc(Zc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Kg(e) {
  const { components: t } = zr();
  return Q.createElement(t.Dropdown, { ...e });
}
function qg(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: u } } = zr(), c = U((f) => {
    o && n?.(f);
  }, [o, n]), d = U((f) => {
    r && t?.(f);
  }, [r, t]);
  return Q.createElement(
    "nav",
    { ...s },
    Q.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[ae.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: d },
      Q.createElement(a.Chevron, { disabled: r ? void 0 : !0, className: i[ae.Chevron], orientation: "left" })
    ),
    Q.createElement(
      a.NextMonthButton,
      { type: "button", className: i[ae.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": u(o), onClick: c },
      Q.createElement(a.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[ae.Chevron] })
    )
  );
}
function Gg(e) {
  const { components: t } = zr();
  return Q.createElement(t.Button, { ...e });
}
function Xg(e) {
  return Q.createElement("option", { ...e });
}
function Zg(e) {
  const { components: t } = zr();
  return Q.createElement(t.Button, { ...e });
}
function Qg(e) {
  const { rootRef: t, ...n } = e;
  return Q.createElement("div", { ...n, ref: t });
}
function Jg(e) {
  return Q.createElement("select", { ...e });
}
function ey(e) {
  const { week: t, ...n } = e;
  return Q.createElement("tr", { ...n });
}
function ty(e) {
  return Q.createElement("th", { ...e });
}
function ny(e) {
  return Q.createElement(
    "thead",
    { "aria-hidden": !0 },
    Q.createElement("tr", { ...e })
  );
}
function ry(e) {
  const { week: t, ...n } = e;
  return Q.createElement("th", { ...n });
}
function oy(e) {
  return Q.createElement("th", { ...e });
}
function sy(e) {
  return Q.createElement("tbody", { ...e });
}
function ay(e) {
  const { components: t } = zr();
  return Q.createElement(t.Dropdown, { ...e });
}
const iy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Og,
  CaptionLabel: $g,
  Chevron: _g,
  Day: Hg,
  DayButton: zg,
  Dropdown: Bg,
  DropdownNav: Wg,
  Footer: Fg,
  Month: Ug,
  MonthCaption: Yg,
  MonthGrid: jg,
  Months: Vg,
  MonthsDropdown: Kg,
  Nav: qg,
  NextMonthButton: Gg,
  Option: Xg,
  PreviousMonthButton: Zg,
  Root: Qg,
  Select: Jg,
  Week: ey,
  WeekNumber: ry,
  WeekNumberHeader: oy,
  Weekday: ty,
  Weekdays: ny,
  Weeks: sy,
  YearsDropdown: ay
}, Symbol.toStringTag, { value: "Module" }));
function Ot(e, t, n = !1, r = Ct) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = r;
  return o && s ? (a(s, o) < 0 && ([o, s] = [s, o]), a(t, o) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && o ? i(o, t) : !1;
}
function Qc(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ga(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Jc(e) {
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
function $t(e, t, n = Ct) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: a } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (nu(i, n))
      return i.includes(e);
    if (Ga(i))
      return Ot(i, e, !1, n);
    if (tu(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Qc(i)) {
      const l = s(i.before, e), u = s(i.after, e), c = l > 0, d = u < 0;
      return a(i.before, i.after) ? d && c : c || d;
    }
    return Jc(i) ? s(e, i.after) > 0 : eu(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function ly(e, t, n, r, o) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: u, today: c } = t, { isSameDay: d, isSameMonth: f, startOfMonth: h, isBefore: m, endOfMonth: g, isAfter: y } = o, v = n && h(n), b = r && g(r), w = {
    [Re.focused]: [],
    [Re.outside]: [],
    [Re.disabled]: [],
    [Re.hidden]: [],
    [Re.today]: []
  }, S = {};
  for (const k of e) {
    const { date: C, displayMonth: N } = k, x = !!(N && !f(C, N)), M = !!(v && m(C, v)), E = !!(b && y(C, b)), D = !!(s && $t(C, s, o)), R = !!(a && $t(C, a, o)) || M || E || // Broadcast calendar will show outside days as default
    !u && !l && x || u && l === !1 && x, I = d(C, c ?? o.today());
    x && w.outside.push(k), D && w.disabled.push(k), R && w.hidden.push(k), I && w.today.push(k), i && Object.keys(i).forEach((O) => {
      const H = i?.[O];
      H && $t(C, H, o) && (S[O] ? S[O].push(k) : S[O] = [k]);
    });
  }
  return (k) => {
    const C = {
      [Re.focused]: !1,
      [Re.disabled]: !1,
      [Re.hidden]: !1,
      [Re.outside]: !1,
      [Re.today]: !1
    }, N = {};
    for (const x in w) {
      const M = w[x];
      C[x] = M.some((E) => E === k);
    }
    for (const x in S)
      N[x] = S[x].some((M) => M === k);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...N
    };
  };
}
function cy(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[Re[s]] ? o.push(t[Re[s]]) : t[ft[s]] && o.push(t[ft[s]]), o), [t[ae.Day]]);
}
function uy(e) {
  return {
    ...iy,
    ...e
  };
}
function dy(e) {
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
function Xa() {
  const e = {};
  for (const t in ae)
    e[ae[t]] = `rdp-${ae[t]}`;
  for (const t in Re)
    e[Re[t]] = `rdp-${Re[t]}`;
  for (const t in ft)
    e[ft[t]] = `rdp-${ft[t]}`;
  for (const t in et)
    e[et[t]] = `rdp-${et[t]}`;
  return e;
}
function ru(e, t, n) {
  return (n ?? new rt(t)).formatMonthYear(e);
}
const fy = ru;
function py(e, t, n) {
  return (n ?? new rt(t)).format(e, "d");
}
function hy(e, t = Ct) {
  return t.format(e, "LLLL");
}
function my(e, t, n) {
  return (n ?? new rt(t)).format(e, "cccccc");
}
function gy(e, t = Ct) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function yy() {
  return "";
}
function ou(e, t = Ct) {
  return t.format(e, "yyyy");
}
const by = ou, vy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: ru,
  formatDay: py,
  formatMonthCaption: fy,
  formatMonthDropdown: hy,
  formatWeekNumber: gy,
  formatWeekNumberHeader: yy,
  formatWeekdayName: my,
  formatYearCaption: by,
  formatYearDropdown: ou
}, Symbol.toStringTag, { value: "Module" }));
function wy(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...vy,
    ...e
  };
}
function ky(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: u } = o;
  return l({
    start: a(e),
    end: i(e)
  }).map((f) => {
    const h = r.formatMonthDropdown(f, o), m = u(f), g = t && f < s(t) || n && f > s(n) || !1;
    return { value: m, label: h, disabled: g };
  });
}
function xy(e, t = {}, n = {}) {
  let r = { ...t?.[ae.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function Cy(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(o, a);
    s.push(i);
  }
  return s;
}
function Sy(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: a, eachYearOfInterval: i, getYear: l } = r, u = s(e), c = a(t), d = i({ start: u, end: c });
  return o && d.reverse(), d.map((f) => {
    const h = n.formatYearDropdown(f, r);
    return {
      value: l(f),
      label: h,
      disabled: !1
    };
  });
}
function su(e, t, n, r) {
  let o = (r ?? new rt(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Ty = su;
function au(e, t, n) {
  return (n ?? new rt(t)).formatMonthYear(e);
}
const My = au;
function Ey(e, t, n, r) {
  let o = (r ?? new rt(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function Ny(e) {
  return "Choose the Month";
}
function Dy() {
  return "";
}
function Ry(e) {
  return "Go to the Next Month";
}
function Ay(e) {
  return "Go to the Previous Month";
}
function Ly(e, t, n) {
  return (n ?? new rt(t)).format(e, "cccc");
}
function Py(e, t) {
  return `Week ${e}`;
}
function Iy(e) {
  return "Week Number";
}
function Oy(e) {
  return "Choose the Year";
}
const $y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: My,
  labelDay: Ty,
  labelDayButton: su,
  labelGrid: au,
  labelGridcell: Ey,
  labelMonthDropdown: Ny,
  labelNav: Dy,
  labelNext: Ry,
  labelPrevious: Ay,
  labelWeekNumber: Py,
  labelWeekNumberHeader: Iy,
  labelWeekday: Ly,
  labelYearDropdown: Oy
}, Symbol.toStringTag, { value: "Module" })), Br = (e) => e instanceof HTMLElement ? e : null, Rs = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], _y = (e) => Br(e.querySelector("[data-animated-month]")), As = (e) => Br(e.querySelector("[data-animated-caption]")), Ls = (e) => Br(e.querySelector("[data-animated-weeks]")), Hy = (e) => Br(e.querySelector("[data-animated-nav]")), zy = (e) => Br(e.querySelector("[data-animated-weekdays]"));
function By(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const a = q(null), i = q(r), l = q(!1);
  Uo(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const c = s.isSameMonth(r[0].date, u[0].date), d = s.isAfter(r[0].date, u[0].date), f = d ? n[et.caption_after_enter] : n[et.caption_before_enter], h = d ? n[et.weeks_after_enter] : n[et.weeks_before_enter], m = a.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Rs(g).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const S = _y(w);
      S && w.contains(S) && w.removeChild(S);
      const k = As(w);
      k && k.classList.remove(f);
      const C = Ls(w);
      C && C.classList.remove(h);
    }), a.current = g) : a.current = null, l.current || c || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = m instanceof HTMLElement ? Rs(m) : [], v = Rs(e.current);
    if (v?.every((b) => b instanceof HTMLElement) && y && y.every((b) => b instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const b = Hy(e.current);
      b && (b.style.zIndex = "1"), v.forEach((w, S) => {
        const k = y[S];
        if (!k)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const C = As(w);
        C && C.classList.add(f);
        const N = Ls(w);
        N && N.classList.add(h);
        const x = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), C && C.classList.remove(f), N && N.classList.remove(h), w.style.position = "", w.style.overflow = "", w.contains(k) && w.removeChild(k);
        };
        k.style.pointerEvents = "none", k.style.position = "absolute", k.style.overflow = "hidden", k.setAttribute("aria-hidden", "true");
        const M = zy(k);
        M && (M.style.opacity = "0");
        const E = As(k);
        E && (E.classList.add(d ? n[et.caption_before_exit] : n[et.caption_after_exit]), E.addEventListener("animationend", x));
        const D = Ls(k);
        D && D.classList.add(d ? n[et.weeks_before_exit] : n[et.weeks_after_exit]), w.insertBefore(k, w.firstChild);
      });
    }
  });
}
function Wy(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: c, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: h, endOfMonth: m, endOfWeek: g, isAfter: y, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: w } = r, S = l ? v(o, r) : a ? b(o) : w(o), k = l ? f(s) : a ? h(m(s)) : g(m(s)), C = c(k, S), N = d(s, o) + 1, x = [];
  for (let D = 0; D <= C; D++) {
    const R = u(S, D);
    if (t && y(R, t))
      break;
    x.push(R);
  }
  const E = (l ? 35 : 42) * N;
  if (i && x.length < E) {
    const D = E - x.length;
    for (let R = 0; R < D; R++) {
      const I = u(x[x.length - 1], 1);
      x.push(I);
    }
  }
  return x;
}
function Fy(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Uy(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let a = 0; a < o; a++) {
    const i = r.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function il(e, t, n, r) {
  const { month: o, defaultMonth: s, today: a = r.today(), numberOfMonths: i = 1 } = e;
  let l = o || s || a;
  const { differenceInCalendarMonths: u, addMonths: c, startOfMonth: d } = r;
  if (n && u(n, l) < i - 1) {
    const f = -1 * (i - 1);
    l = c(n, f);
  }
  return t && u(l, t) < 0 && (l = t), d(l);
}
function Yy(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: u, getWeek: c, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: h } = r, m = e.reduce((g, y) => {
    const v = n.broadcastCalendar ? d(y, r) : n.ISOWeek ? f(y) : h(y), b = n.broadcastCalendar ? s(y) : n.ISOWeek ? a(i(y)) : l(i(y)), w = t.filter((N) => N >= v && N <= b), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < S) {
      const N = t.filter((x) => {
        const M = S - w.length;
        return x > b && x <= o(b, M);
      });
      w.push(...N);
    }
    const k = w.reduce((N, x) => {
      const M = n.ISOWeek ? u(x) : c(x), E = N.find((R) => R.weekNumber === M), D = new Xc(x, y, r);
      return E ? E.days.push(D) : N.push(new Ig(M, [D])), N;
    }, []), C = new Pg(y, k);
    return g.push(C), g;
  }, []);
  return n.reverseMonths ? m.reverse() : m;
}
function jy(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: u, newDate: c, today: d } = t, { fromYear: f, toYear: h, fromMonth: m, toMonth: g } = e;
  !n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && g && (r = g), !r && h && (r = c(h, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : f ? n = c(f, 0, 1) : !n && y && (n = o(l(e.today ?? d(), -100))), r ? r = i(r) : h ? r = c(h, 11, 31) : !r && y && (r = u(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function Vy(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? s : 1, c = a(e);
  if (!t)
    return i(c, u);
  if (!(l(t, e) < s))
    return i(c, u);
}
function Ky(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? s ?? 1 : 1, c = a(e);
  if (!t)
    return i(c, -u);
  if (!(l(c, t) <= 0))
    return i(c, -u);
}
function qy(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Ko(e, t) {
  const [n, r] = V(e);
  return [t === void 0 ? n : t, r];
}
function Gy(e, t) {
  const [n, r] = jy(e, t), { startOfMonth: o, endOfMonth: s } = t, a = il(e, n, r, t), [i, l] = Ko(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  J(() => {
    const C = il(e, n, r, t);
    l(C);
  }, [e.timeZone]);
  const u = Uy(i, r, e, t), c = Wy(u, e.endMonth ? s(e.endMonth) : void 0, e, t), d = Yy(u, c, e, t), f = qy(d), h = Fy(d), m = Ky(i, n, e, t), g = Vy(i, r, e, t), { disableNavigation: y, onMonthChange: v } = e, b = (C) => f.some((N) => N.days.some((x) => x.isEqualTo(C))), w = (C) => {
    if (y)
      return;
    let N = o(C);
    n && N < o(n) && (N = o(n)), r && N > o(r) && (N = o(r)), l(N), v?.(N);
  };
  return {
    months: d,
    weeks: f,
    days: h,
    navStart: n,
    navEnd: r,
    previousMonth: m,
    nextMonth: g,
    goToMonth: w,
    goToDay: (C) => {
      b(C) || w(C.date);
    }
  };
}
var yt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(yt || (yt = {}));
function ll(e) {
  return !e[Re.disabled] && !e[Re.hidden] && !e[Re.outside];
}
function Xy(e, t, n, r) {
  let o, s = -1;
  for (const a of e) {
    const i = t(a);
    ll(i) && (i[Re.focused] && s < yt.FocusedModifier ? (o = a, s = yt.FocusedModifier) : r?.isEqualTo(a) && s < yt.LastFocused ? (o = a, s = yt.LastFocused) : n(a.date) && s < yt.Selected ? (o = a, s = yt.Selected) : i[Re.today] && s < yt.Today && (o = a, s = yt.Today));
  }
  return o || (o = e.find((a) => ll(t(a)))), o;
}
function Zy(e, t, n, r, o, s, a) {
  const { ISOWeek: i, broadcastCalendar: l } = s, { addDays: u, addMonths: c, addWeeks: d, addYears: f, endOfBroadcastWeek: h, endOfISOWeek: m, endOfWeek: g, max: y, min: v, startOfBroadcastWeek: b, startOfISOWeek: w, startOfWeek: S } = a;
  let C = {
    day: u,
    week: d,
    month: c,
    year: f,
    startOfWeek: (N) => l ? b(N, a) : i ? w(N) : S(N),
    endOfWeek: (N) => l ? h(N) : i ? m(N) : g(N)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = y([r, C]) : t === "after" && o && (C = v([o, C])), C;
}
function iu(e, t, n, r, o, s, a, i = 0) {
  if (i > 365)
    return;
  const l = Zy(e, t, n.date, r, o, s, a), u = !!(s.disabled && $t(l, s.disabled, a)), c = !!(s.hidden && $t(l, s.hidden, a)), d = l, f = new Xc(l, d, a);
  return !u && !c ? f : iu(e, t, f, r, o, s, a, i + 1);
}
function Qy(e, t, n, r, o) {
  const { autoFocus: s } = e, [a, i] = V(), l = Xy(t.days, n, r || (() => !1), a), [u, c] = V(s ? l : void 0);
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
      const v = iu(g, y, u, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(v)) || (t.goToDay(v), c(v)));
    }
  };
}
function Jy(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = Ko(n, o ? n : void 0), i = o ? n : s, { isSameDay: l } = t, u = (h) => i?.some((m) => l(m, h)) ?? !1, { min: c, max: d } = e;
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
function eb(e, t, n = 0, r = 0, o = !1, s = Ct) {
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
    const f = s.differenceInCalendarDays(d.to, d.from);
    r > 0 && f > r ? d = { from: e, to: void 0 } : n > 1 && f < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function tb(e, t, n = Ct) {
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
function cl(e, t, n = Ct) {
  return Ot(e, t.from, !1, n) || Ot(e, t.to, !1, n) || Ot(t, e.from, !1, n) || Ot(t, e.to, !1, n);
}
function nb(e, t, n = Ct) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Ot(e, i, !1, n) : nu(i, n) ? i.some((l) => Ot(e, l, !1, n)) : Ga(i) ? i.from && i.to ? cl(e, { from: i.from, to: i.to }, n) : !1 : tu(i) ? tb(e, i.dayOfWeek, n) : Qc(i) ? n.isAfter(i.before, i.after) ? cl(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : $t(e.from, i, n) || $t(e.to, i, n) : Jc(i) || eu(i) ? $t(e.from, i, n) || $t(e.to, i, n) : !1))
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
function rb(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: a } = e, [i, l] = Ko(o, a ? o : void 0), u = a ? o : i;
  return {
    selected: u,
    select: (f, h, m) => {
      const { min: g, max: y } = e, v = f ? eb(f, u, g, y, s, t) : void 0;
      return r && n && v?.from && v.to && nb({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), a || l(v), a?.(v, f, h, m), v;
    },
    isSelected: (f) => u && Ot(u, f, !1, t)
  };
}
function ob(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = Ko(n, o ? n : void 0), i = o ? n : s, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, f, h) => {
      let m = d;
      return !r && i && i && l(d, i) && (m = void 0), o || a(m), o?.(m, d, f, h), m;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function sb(e, t) {
  const n = ob(e, t), r = Jy(e, t), o = rb(e, t);
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
function ab(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ye(t.today, t.timeZone)), t.month && (t.month = new Ye(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ye(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ye(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ye(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ye(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ce) => new Ye(ce, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ye(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ye(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: a, classNames: i } = wn(() => {
    const ce = { ...qa, ...t.locale };
    return {
      dateLib: new rt({
        locale: ce,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: uy(t.components),
      formatters: wy(t.formatters),
      labels: { ...$y, ...t.labels },
      locale: ce,
      classNames: { ...Xa(), ...t.classNames }
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
  ]), { captionLayout: l, mode: u, navLayout: c, numberOfMonths: d = 1, onDayBlur: f, onDayClick: h, onDayFocus: m, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: v, onNextClick: b, onPrevClick: w, showWeekNumber: S, styles: k } = t, { formatCaption: C, formatDay: N, formatMonthDropdown: x, formatWeekNumber: M, formatWeekNumberHeader: E, formatWeekdayName: D, formatYearDropdown: R } = r, I = Gy(t, s), { days: O, months: H, navStart: W, navEnd: G, previousMonth: P, nextMonth: L, goToMonth: F } = I, X = ly(O, t, W, G, s), { isSelected: K, select: Z, selected: te } = sb(t, s) ?? {}, { blur: _, focused: B, isFocusTarget: j, moveFocus: ee, setFocused: ge } = Qy(t, I, X, K ?? (() => !1), s), { labelDayButton: be, labelGridcell: Ae, labelGrid: ze, labelMonthDropdown: ot, labelNav: Ft, labelPrevious: dr, labelNext: fr, labelWeekday: Kr, labelWeekNumber: qr, labelWeekNumberHeader: Gr, labelYearDropdown: Xr } = o, En = wn(() => Cy(s, t.ISOWeek), [s, t.ISOWeek]), pr = u !== void 0 || h !== void 0, Nn = U(() => {
    P && (F(P), w?.(P));
  }, [P, F, w]), Dn = U(() => {
    L && (F(L), b?.(L));
  }, [F, L, b]), Zr = U((ce, ke) => (ue) => {
    ue.preventDefault(), ue.stopPropagation(), ge(ce), Z?.(ce.date, ke, ue), h?.(ce.date, ke, ue);
  }, [Z, h, ge]), cs = U((ce, ke) => (ue) => {
    ge(ce), m?.(ce.date, ke, ue);
  }, [m, ge]), us = U((ce, ke) => (ue) => {
    _(), f?.(ce.date, ke, ue);
  }, [_, f]), ds = U((ce, ke) => (ue) => {
    const Ce = {
      ArrowLeft: [
        ue.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        ue.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [ue.shiftKey ? "year" : "week", "after"],
      ArrowUp: [ue.shiftKey ? "year" : "week", "before"],
      PageUp: [ue.shiftKey ? "year" : "month", "before"],
      PageDown: [ue.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (Ce[ue.key]) {
      ue.preventDefault(), ue.stopPropagation();
      const [Be, de] = Ce[ue.key];
      ee(Be, de);
    }
    g?.(ce.date, ke, ue);
  }, [ee, g, t.dir]), fs = U((ce, ke) => (ue) => {
    y?.(ce.date, ke, ue);
  }, [y]), Qr = U((ce, ke) => (ue) => {
    v?.(ce.date, ke, ue);
  }, [v]), Jr = U((ce) => (ke) => {
    const ue = Number(ke.target.value), Ce = s.setMonth(s.startOfMonth(ce), ue);
    F(Ce);
  }, [s, F]), ps = U((ce) => (ke) => {
    const ue = Number(ke.target.value), Ce = s.setYear(s.startOfMonth(ce), ue);
    F(Ce);
  }, [s, F]), { className: hs, style: Tt } = wn(() => ({
    className: [i[ae.Root], t.className].filter(Boolean).join(" "),
    style: { ...k?.[ae.Root], ...t.style }
  }), [i, t.className, t.style, k]), Rn = dy(t), on = q(null);
  By(on, !!t.animate, {
    classNames: i,
    months: H,
    focused: B,
    dateLib: s
  });
  const ms = {
    dayPickerProps: t,
    selected: te,
    select: Z,
    isSelected: K,
    months: H,
    nextMonth: L,
    previousMonth: P,
    goToMonth: F,
    getModifiers: X,
    components: n,
    classNames: i,
    styles: k,
    labels: o,
    formatters: r
  };
  return Q.createElement(
    Zc.Provider,
    { value: ms },
    Q.createElement(
      n.Root,
      { rootRef: t.animate ? on : void 0, className: hs, style: Tt, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Rn },
      Q.createElement(
        n.Months,
        { className: i[ae.Months], style: k?.[ae.Months] },
        !t.hideNavigation && !c && Q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[ae.Nav], style: k?.[ae.Nav], "aria-label": Ft(), onPreviousClick: Nn, onNextClick: Dn, previousMonth: P, nextMonth: L }),
        H.map((ce, ke) => Q.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[ae.Month],
            style: k?.[ae.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ke,
            displayIndex: ke,
            calendarMonth: ce
          },
          c === "around" && !t.hideNavigation && ke === 0 && Q.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[ae.PreviousMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": dr(P), onClick: Nn, "data-animated-button": t.animate ? "true" : void 0 },
            Q.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[ae.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          Q.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[ae.MonthCaption], style: k?.[ae.MonthCaption], calendarMonth: ce, displayIndex: ke }, l?.startsWith("dropdown") ? Q.createElement(
            n.DropdownNav,
            { className: i[ae.Dropdowns], style: k?.[ae.Dropdowns] },
            (() => {
              const ue = l === "dropdown" || l === "dropdown-months" ? Q.createElement(n.MonthsDropdown, { key: "month", className: i[ae.MonthsDropdown], "aria-label": ot(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Jr(ce.date), options: ky(ce.date, W, G, r, s), style: k?.[ae.Dropdown], value: s.getMonth(ce.date) }) : Q.createElement("span", { key: "month" }, x(ce.date, s)), Ce = l === "dropdown" || l === "dropdown-years" ? Q.createElement(n.YearsDropdown, { key: "year", className: i[ae.YearsDropdown], "aria-label": Xr(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: ps(ce.date), options: Sy(W, G, r, s, !!t.reverseYears), style: k?.[ae.Dropdown], value: s.getYear(ce.date) }) : Q.createElement("span", { key: "year" }, R(ce.date, s));
              return s.getMonthYearOrder() === "year-first" ? [Ce, ue] : [ue, Ce];
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
            } }, C(ce.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            Q.createElement(n.CaptionLabel, { className: i[ae.CaptionLabel], role: "status", "aria-live": "polite" }, C(ce.date, s.options, s))
          )),
          c === "around" && !t.hideNavigation && ke === d - 1 && Q.createElement(
            n.NextMonthButton,
            { type: "button", className: i[ae.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": fr(L), onClick: Dn, "data-animated-button": t.animate ? "true" : void 0 },
            Q.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: i[ae.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ke === d - 1 && c === "after" && !t.hideNavigation && Q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[ae.Nav], style: k?.[ae.Nav], "aria-label": Ft(), onPreviousClick: Nn, onNextClick: Dn, previousMonth: P, nextMonth: L }),
          Q.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": ze(ce.date, s.options, s) || void 0, className: i[ae.MonthGrid], style: k?.[ae.MonthGrid] },
            !t.hideWeekdays && Q.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[ae.Weekdays], style: k?.[ae.Weekdays] },
              S && Q.createElement(n.WeekNumberHeader, { "aria-label": Gr(s.options), className: i[ae.WeekNumberHeader], style: k?.[ae.WeekNumberHeader], scope: "col" }, E()),
              En.map((ue) => Q.createElement(n.Weekday, { "aria-label": Kr(ue, s.options, s), className: i[ae.Weekday], key: String(ue), style: k?.[ae.Weekday], scope: "col" }, D(ue, s.options, s)))
            ),
            Q.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[ae.Weeks], style: k?.[ae.Weeks] }, ce.weeks.map((ue) => Q.createElement(
              n.Week,
              { className: i[ae.Week], key: ue.weekNumber, style: k?.[ae.Week], week: ue },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              Q.createElement(n.WeekNumber, { week: ue, style: k?.[ae.WeekNumber], "aria-label": qr(ue.weekNumber, {
                locale: a
              }), className: i[ae.WeekNumber], scope: "row", role: "rowheader" }, M(ue.weekNumber, s)),
              ue.days.map((Ce) => {
                const { date: Be } = Ce, de = X(Ce);
                if (de[Re.focused] = !de.hidden && !!B?.isEqualTo(Ce), de[ft.selected] = K?.(Be) || de.selected, Ga(te)) {
                  const { from: An, to: Ut } = te;
                  de[ft.range_start] = !!(An && Ut && s.isSameDay(Be, An)), de[ft.range_end] = !!(An && Ut && s.isSameDay(Be, Ut)), de[ft.range_middle] = Ot(te, Be, !0, s);
                }
                const Mt = xy(de, k, t.modifiersStyles), sn = cy(de, i, t.modifiersClassNames), gs = !pr && !de.hidden ? Ae(Be, de, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  Q.createElement(n.Day, { key: `${s.format(Be, "yyyy-MM-dd")}_${s.format(Ce.displayMonth, "yyyy-MM")}`, day: Ce, modifiers: de, className: sn.join(" "), style: Mt, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": gs, "data-day": s.format(Be, "yyyy-MM-dd"), "data-month": Ce.outside ? s.format(Be, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": Ce.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && pr ? Q.createElement(n.DayButton, { className: i[ae.DayButton], style: k?.[ae.DayButton], type: "button", day: Ce, modifiers: de, disabled: de.disabled || void 0, tabIndex: j(Ce) ? 0 : -1, "aria-label": be(Be, de, s.options, s), onClick: Zr(Ce, de), onBlur: us(Ce, de), onFocus: cs(Ce, de), onKeyDown: ds(Ce, de), onMouseEnter: fs(Ce, de), onMouseLeave: Qr(Ce, de) }, N(Be, s.options, s)) : !de.hidden && N(Ce.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      Q.createElement(n.Footer, { className: i[ae.Footer], style: k?.[ae.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function lu(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = lu(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function cu() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = lu(e)) && (r && (r += " "), r += t);
  return r;
}
const Za = "-", ib = (e) => {
  const t = cb(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(Za);
      return i[0] === "" && i.length !== 1 && i.shift(), uu(i, t) || lb(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && r[a] ? [...l, ...r[a]] : l;
    }
  };
}, uu = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? uu(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Za);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, ul = /^\[(.+)\]$/, lb = (e) => {
  if (ul.test(e)) {
    const t = ul.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, cb = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    aa(n[o], r, o, t);
  return r;
}, aa = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : dl(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (ub(o)) {
        aa(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      aa(a, dl(t, s), n, r);
    });
  });
}, dl = (e, t) => {
  let n = e;
  return t.split(Za).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, ub = (e) => e.isThemeGetter, db = (e) => {
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
}, ia = "!", la = ":", fb = la.length, pb = (e) => {
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
        if (g === la) {
          s.push(o.slice(l, m)), l = m + fb;
          continue;
        }
        if (g === "/") {
          u = m;
          continue;
        }
      }
      g === "[" ? a++ : g === "]" ? a-- : g === "(" ? i++ : g === ")" && i--;
    }
    const c = s.length === 0 ? o : o.substring(l), d = hb(c), f = d !== c, h = u && u > l ? u - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + la, s = r;
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
}, hb = (e) => e.endsWith(ia) ? e.substring(0, e.length - 1) : e.startsWith(ia) ? e.substring(1) : e, mb = (e) => {
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
}, gb = (e) => ({
  cache: db(e.cacheSize),
  parseClassName: pb(e),
  sortModifiers: mb(e),
  ...ib(e)
}), yb = /\s+/, bb = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(yb);
  let l = "";
  for (let u = i.length - 1; u >= 0; u -= 1) {
    const c = i[u], {
      isExternal: d,
      modifiers: f,
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
    const b = s(f).join(":"), w = h ? b + ia : b, S = w + v;
    if (a.includes(S))
      continue;
    a.push(S);
    const k = o(v, y);
    for (let C = 0; C < k.length; ++C) {
      const N = k[C];
      a.push(w + N);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function vb() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = du(t)) && (r && (r += " "), r += n);
  return r;
}
const du = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = du(e[r])) && (n && (n += " "), n += t);
  return n;
};
function wb(e, ...t) {
  let n, r, o, s = a;
  function a(l) {
    const u = t.reduce((c, d) => d(c), e());
    return n = gb(u), r = n.cache.get, o = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const u = r(l);
    if (u)
      return u;
    const c = bb(l, n);
    return o(l, c), c;
  }
  return function() {
    return s(vb.apply(null, arguments));
  };
}
const $e = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, fu = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, pu = /^\((?:(\w[\w-]*):)?(.+)\)$/i, kb = /^\d+\/\d+$/, xb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Cb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Sb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Tb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Mb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, On = (e) => kb.test(e), me = (e) => !!e && !Number.isNaN(Number(e)), Xt = (e) => !!e && Number.isInteger(Number(e)), Ps = (e) => e.endsWith("%") && me(e.slice(0, -1)), At = (e) => xb.test(e), Eb = () => !0, Nb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Cb.test(e) && !Sb.test(e)
), hu = () => !1, Db = (e) => Tb.test(e), Rb = (e) => Mb.test(e), Ab = (e) => !ne(e) && !re(e), Lb = (e) => ar(e, yu, hu), ne = (e) => fu.test(e), pn = (e) => ar(e, bu, Nb), Is = (e) => ar(e, _b, me), fl = (e) => ar(e, mu, hu), Pb = (e) => ar(e, gu, Rb), so = (e) => ar(e, vu, Db), re = (e) => pu.test(e), br = (e) => ir(e, bu), Ib = (e) => ir(e, Hb), pl = (e) => ir(e, mu), Ob = (e) => ir(e, yu), $b = (e) => ir(e, gu), ao = (e) => ir(e, vu, !0), ar = (e, t, n) => {
  const r = fu.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, ir = (e, t, n = !1) => {
  const r = pu.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, mu = (e) => e === "position" || e === "percentage", gu = (e) => e === "image" || e === "url", yu = (e) => e === "length" || e === "size" || e === "bg-size", bu = (e) => e === "length", _b = (e) => e === "number", Hb = (e) => e === "family-name", vu = (e) => e === "shadow", zb = () => {
  const e = $e("color"), t = $e("font"), n = $e("text"), r = $e("font-weight"), o = $e("tracking"), s = $e("leading"), a = $e("breakpoint"), i = $e("container"), l = $e("spacing"), u = $e("radius"), c = $e("shadow"), d = $e("inset-shadow"), f = $e("text-shadow"), h = $e("drop-shadow"), m = $e("blur"), g = $e("perspective"), y = $e("aspect"), v = $e("ease"), b = $e("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], k = () => [...S(), re, ne], C = () => ["auto", "hidden", "clip", "visible", "scroll"], N = () => ["auto", "contain", "none"], x = () => [re, ne, l], M = () => [On, "full", "auto", ...x()], E = () => [Xt, "none", "subgrid", re, ne], D = () => ["auto", {
    span: ["full", Xt, re, ne]
  }, Xt, re, ne], R = () => [Xt, "auto", re, ne], I = () => ["auto", "min", "max", "fr", re, ne], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...x()], G = () => [On, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], P = () => [e, re, ne], L = () => [...S(), pl, fl, {
    position: [re, ne]
  }], F = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], X = () => ["auto", "cover", "contain", Ob, Lb, {
    size: [re, ne]
  }], K = () => [Ps, br, pn], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    re,
    ne
  ], te = () => ["", me, br, pn], _ = () => ["solid", "dashed", "dotted", "double"], B = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => [me, Ps, pl, fl], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    re,
    ne
  ], ge = () => ["none", me, re, ne], be = () => ["none", me, re, ne], Ae = () => [me, re, ne], ze = () => [On, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [At],
      breakpoint: [At],
      color: [Eb],
      container: [At],
      "drop-shadow": [At],
      ease: ["in", "out", "in-out"],
      font: [Ab],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [At],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [At],
      shadow: [At],
      spacing: ["px", me],
      text: [At],
      "text-shadow": [At],
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
        aspect: ["auto", "square", On, ne, re, y]
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
        columns: [me, ne, re, i]
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
        overscroll: N()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": N()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": N()
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
        inset: M()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": M()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": M()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: M()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: M()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: M()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: M()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: M()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: M()
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
        z: [Xt, "auto", re, ne]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [On, "full", "auto", i, ...x()]
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
        flex: [me, On, "auto", "initial", "none", ne]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", me, re, ne]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", me, re, ne]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Xt, "first", "last", "none", re, ne]
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
        col: D()
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
        row: D()
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
        size: G()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [i, "screen", ...G()]
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
          ...G()
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
          ...G()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...G()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...G()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...G()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, br, pn]
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
        font: [r, re, Is]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ps, ne]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ib, ne, t]
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
        "line-clamp": [me, "none", re, Is]
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
        decoration: [..._(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [me, "from-font", "auto", re, pn]
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
        "underline-offset": [me, "auto", re, ne]
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
        bg: F()
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
          }, Xt, re, ne],
          radial: ["", re, ne],
          conic: [Xt, re, ne]
        }, $b, Pb]
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
        from: K()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: K()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: K()
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
        outline: [..._(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [me, re, ne]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", me, br, pn]
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
          ao,
          so
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
        "inset-shadow": ["none", d, ao, so]
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
        "ring-offset": [me, pn]
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
        "text-shadow": ["none", f, ao, so]
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
        opacity: [me, re, ne]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...B(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": B()
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
        "mask-linear": [me]
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
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [me]
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
        mask: F()
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
        brightness: [me, re, ne]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [me, re, ne]
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
          ao,
          so
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
        grayscale: ["", me, re, ne]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [me, re, ne]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", me, re, ne]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [me, re, ne]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", me, re, ne]
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
        "backdrop-brightness": [me, re, ne]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [me, re, ne]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", me, re, ne]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [me, re, ne]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", me, re, ne]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [me, re, ne]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [me, re, ne]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", me, re, ne]
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
        duration: [me, "initial", re, ne]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", v, re, ne]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [me, re, ne]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, re, ne]
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
        "perspective-origin": k()
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
        skew: Ae()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ae()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ae()
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
        translate: ze()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ze()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ze()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ze()
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
        stroke: [me, br, pn, Is]
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
}, Bb = /* @__PURE__ */ wb(zb);
function pe(...e) {
  return Bb(cu(e));
}
function hl(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function qo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = hl(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : hl(e[o], null);
        }
      };
  };
}
function je(...e) {
  return T.useCallback(qo(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Lr(e) {
  const t = /* @__PURE__ */ Fb(e), n = T.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = T.Children.toArray(s), l = i.find(Yb);
    if (l) {
      const u = l.props.children, c = i.map((d) => d === l ? T.Children.count(u) > 1 ? T.Children.only(null) : T.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ p(t, { ...a, ref: o, children: T.isValidElement(u) ? T.cloneElement(u, void 0, c) : null });
    }
    return /* @__PURE__ */ p(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Wb = /* @__PURE__ */ Lr("Slot");
// @__NO_SIDE_EFFECTS__
function Fb(e) {
  const t = T.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (T.isValidElement(o)) {
      const a = Vb(o), i = jb(s, o.props);
      return o.type !== T.Fragment && (i.ref = r ? qo(r, a) : a), T.cloneElement(o, i);
    }
    return T.Children.count(o) > 1 ? T.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var wu = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Ub(e) {
  const t = ({ children: n }) => /* @__PURE__ */ p(He, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = wu, t;
}
function Yb(e) {
  return T.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === wu;
}
function jb(e, t) {
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
function Vb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const ml = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, gl = cu, Kb = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return gl(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((u) => {
    const c = n?.[u], d = s?.[u];
    if (c === null) return null;
    const f = ml(c) || ml(d);
    return o[u][f];
  }), i = n && Object.entries(n).reduce((u, c) => {
    let [d, f] = c;
    return f === void 0 || (u[d] = f), u;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
    let { class: d, className: f, ...h } = c;
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
      f
    ] : u;
  }, []);
  return gl(e, a, l, n?.class, n?.className);
}, ca = Kb(
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
function Jt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ p(
    r ? Wb : "button",
    {
      "data-slot": "button",
      className: pe(ca({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function qb({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const l = Xa();
  return /* @__PURE__ */ p(
    ab,
    {
      showOutsideDays: n,
      className: pe(
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
        root: pe("w-fit", l.root),
        months: pe(
          "flex gap-4 flex-col md:flex-row relative",
          l.months
        ),
        month: pe("flex flex-col w-full gap-4", l.month),
        nav: pe(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          l.nav
        ),
        button_previous: pe(
          ca({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: pe(
          ca({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_next
        ),
        month_caption: pe(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: pe(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          l.dropdowns
        ),
        dropdown_root: pe(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          l.dropdown_root
        ),
        dropdown: pe(
          "absolute bg-popover inset-0 opacity-0",
          l.dropdown
        ),
        caption_label: pe(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: pe("flex", l.weekdays),
        weekday: pe(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          l.weekday
        ),
        week: pe("flex w-full mt-2", l.week),
        week_number_header: pe(
          "select-none w-(--cell-size)",
          l.week_number_header
        ),
        week_number: pe(
          "text-[0.8rem] select-none text-muted-foreground",
          l.week_number
        ),
        day: pe(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          l.day
        ),
        range_start: pe(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: pe("rounded-none", l.range_middle),
        range_end: pe("rounded-r-md bg-accent", l.range_end),
        today: pe(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          l.today
        ),
        outside: pe(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: pe(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: pe("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: u, rootRef: c, ...d }) => /* @__PURE__ */ p(
          "div",
          {
            "data-slot": "calendar",
            ref: c,
            className: pe(u),
            ...d
          }
        ),
        Chevron: ({ className: u, orientation: c, ...d }) => c === "left" ? /* @__PURE__ */ p($p, { className: pe("size-4", u), ...d }) : c === "right" ? /* @__PURE__ */ p(
          _p,
          {
            className: pe("size-4", u),
            ...d
          }
        ) : /* @__PURE__ */ p(Hp, { className: pe("size-4", u), ...d }),
        DayButton: Gb,
        WeekNumber: ({ children: u, ...c }) => /* @__PURE__ */ p("td", { ...c, children: /* @__PURE__ */ p("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: u }) }),
        ...a
      },
      ...i
    }
  );
}
function Gb({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Xa(), s = T.useRef(null);
  return T.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ p(
    Jt,
    {
      ref: s,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: pe(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let Yn = null;
const ku = /* @__PURE__ */ new Map(), Xb = /* @__PURE__ */ new Map();
function xo() {
  if (!Yn) return;
  const e = Yn;
  Yn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Zb(e) {
  return Yn?.pillDate === e;
}
function Qb({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = q(null), a = Go(e);
  J(() => {
    const b = (w) => {
      w.key === "Escape" && (w.stopPropagation(), w.preventDefault(), o());
    };
    return document.addEventListener("keydown", b, !0), () => document.removeEventListener("keydown", b, !0);
  }, [o]), J(() => {
    const b = (S) => {
      s.current && !s.current.contains(S.target) && (S.target.closest(".date-pill") || o());
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b, !0);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b, !0);
    };
  }, [o]);
  const i = U((b) => {
    b && r(Vn(b)), o();
  }, [r, o]), l = U((b) => {
    const w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + b), r(Vn(w)), o();
  }, [r, o]), u = U(() => {
    const w = (/* @__PURE__ */ new Date()).getDay(), S = w === 0 ? 1 : 8 - w, k = /* @__PURE__ */ new Date();
    k.setDate(k.getDate() + S), r(Vn(k)), o();
  }, [r, o]), c = /* @__PURE__ */ new Date(), d = c.toDateString(), f = new Date(c);
  f.setDate(f.getDate() + 1);
  const h = f.toDateString(), m = c.getDay(), g = m === 0 ? 1 : 8 - m, y = new Date(c);
  y.setDate(y.getDate() + g);
  const v = y.toDateString();
  return /* @__PURE__ */ A(
    "div",
    {
      ref: s,
      className: pe("date-picker-portal", t === "dark" ? "dark" : ""),
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
        /* @__PURE__ */ p(
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
        /* @__PURE__ */ p("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ A("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ p("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ p(
            qb,
            {
              mode: "single",
              selected: a,
              onSelect: i
            }
          ) }),
          /* @__PURE__ */ p("div", { className: "border-t border-border" }),
          /* @__PURE__ */ A("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ p(
              Jt,
              {
                variant: "outline",
                size: "sm",
                className: pe(
                  "rounded-full text-xs",
                  a.toDateString() === d && "ring-2 ring-primary"
                ),
                onClick: () => l(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ p(
              Jt,
              {
                variant: "outline",
                size: "sm",
                className: pe(
                  "rounded-full text-xs",
                  a.toDateString() === h && "ring-2 ring-primary"
                ),
                onClick: () => l(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ p(
              Jt,
              {
                variant: "outline",
                size: "sm",
                className: pe(
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
function Jb(e, t, n) {
  if (Zb(t)) {
    xo();
    return;
  }
  xo();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, a = 320, i = 420, l = 10, u = 16, c = s - r.bottom - l - u, d = r.top - l - u, f = c >= i ? "below" : d >= i ? "above" : c >= d ? "below" : "above";
  let h;
  f === "below" ? h = r.bottom + l : h = r.top - i - l;
  const m = r.left + r.width / 2;
  let g = m - a / 2;
  g + a > o - u && (g = o - a - u), g < u && (g = u);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((k) => {
    y.addEventListener(k, (C) => {
      C.stopPropagation();
    }, !1);
  });
  const b = Ch(y);
  Yn = { container: y, root: b, pillDate: t };
  const w = () => {
    xo();
  }, S = (k) => {
    const C = ku.get(t);
    C && C(k);
  };
  b.render(
    /* @__PURE__ */ p(
      Qb,
      {
        currentDate: t,
        theme: n,
        position: { top: h, left: g, direction: f, pillCenter: m },
        onSelectDate: S,
        onClose: w
      }
    )
  );
}
function ev({ node: e, updateAttributes: t, selected: n }) {
  const r = q(null), o = e.attrs.date || jn(), s = xu(o), a = Qa(o), i = U(() => {
    if (!r.current) return "";
    const l = r.current.closest(".markdown-editor-container");
    if (l) {
      const c = l.getAttribute("data-theme");
      if (c) return c;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return J(() => (ku.set(o, (l) => {
    t({ date: l });
  }), Xb.set(o, i), () => {
  }), [o, t, i]), J(() => {
    const l = r.current;
    if (!l) return;
    const u = (c) => {
      c.preventDefault(), c.stopPropagation();
      const d = l.getAttribute("data-date") || jn(), f = i();
      Jb(l, d, f);
    };
    return l.addEventListener("click", u), () => l.removeEventListener("click", u);
  }, [i]), J(() => {
    const l = r.current?.closest(".ProseMirror") || document, u = () => {
      Yn && xo();
    };
    return l.addEventListener("scroll", u, { passive: !0 }), () => {
      l.removeEventListener("scroll", u);
    };
  }, []), /* @__PURE__ */ p(Xn, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: r,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ p(wc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ p("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Go(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function jn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Er(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function Vn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function xu(e) {
  const t = Go(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function tv(e) {
  return Go(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function mn(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return jn();
  if (n === "tomorrow") return Er(1);
  if (n === "yesterday") return Er(-1);
  if (n === "next monday") {
    const i = (/* @__PURE__ */ new Date()).getDay(), l = i === 0 ? 1 : 8 - i;
    return Er(l);
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
      return Vn(c);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const a = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return Vn(a);
  }
  return null;
}
function Qa(e) {
  const t = Go(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const nv = new Ke("datePillPaste"), rv = Fo.create({
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
        default: jn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = xu(n), o = Qa(n);
    return [
      "span",
      tr(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return Wo(ev, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || jn();
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
    const e = new Je({
      find: /@today\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(jn()).run();
      }
    }), t = new Je({
      find: /@tomorrow\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(Er(1)).run();
      }
    }), n = new Je({
      find: /@yesterday\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(Er(-1)).run();
      }
    }), r = new Je({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: c, chain: d, match: f }) => {
        d().deleteRange(c).insertDatePill(f[1]).run();
      }
    }), o = new Je({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: c, chain: d, match: f }) => {
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
        }[f[1].toLowerCase()];
        if (m !== void 0) {
          const g = (/* @__PURE__ */ new Date()).getFullYear(), y = new Date(g, m, parseInt(f[2], 10));
          d().deleteRange(c).insertDatePill(Vn(y)).run();
        }
      }
    }), s = new Je({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: c, chain: d, match: f }) => {
        const h = mn(f[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), a = new Je({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: c, chain: d, match: f }) => {
        const h = mn(f[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), i = new Je({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: c, chain: d, match: f }) => {
        d().deleteRange(c).insertDatePill(f[1]).run();
      }
    }), l = new Je({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: c, chain: d, match: f }) => {
        const h = mn(f[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), u = new Je({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: c, chain: d, match: f }) => {
        const h = mn(f[1]);
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
      new Ve({
        key: nv,
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
              if (mn(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: c } = t, { tr: d, schema: f } = c, h = [];
            let m = 0;
            const g = new RegExp(a.source, a.flags);
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const S = y[1], k = mn(S);
              if (k) {
                const C = o.slice(m, y.index);
                C && h.push(f.text(C)), h.push(e.create({ date: k })), m = y.index + y[0].length;
              }
            }
            const v = o.slice(m);
            if (v && h.push(f.text(v)), h.length === 0) return !1;
            const b = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, h)
            ), { $from: w } = c.selection;
            if (w.parent.type.name === "paragraph") {
              const S = d;
              let k = c.selection.from;
              for (const C of h)
                S.insert(k, C), k += C.nodeSize;
              S.delete(c.selection.from, c.selection.to), t.dispatch(S);
            } else
              d.replaceSelectionWith(b), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), ct = /* @__PURE__ */ new Map();
function ov({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = q(null), a = q(null), i = e.attrs.tag || "", l = q(!1), [u, c] = V(() => ct.has(i)), [d, f] = V(() => ct.get(i)?.value ?? i);
  J(() => {
    u || f(i);
  }, [i, u]), J(() => {
    if (u) {
      const b = ct.get(i);
      ct.set(i, {
        value: d,
        focusedAt: b?.focusedAt ?? Date.now()
      });
    }
  }, [u, d, i]);
  const h = U((b) => {
    if (l.current) return;
    l.current = !0;
    const w = b.trim().replace(/^#/, ""), S = Nr(w);
    if (ct.delete(i), S && ct.delete(S), !S || !Wn(S))
      o();
    else if (S !== i) {
      const k = r();
      if (typeof k == "number" && n) {
        const { tr: C } = n.state, N = e.nodeSize;
        C.delete(k, k + N), C.insert(k, n.schema.nodes.tagPill.create({ tag: S })), n.view.dispatch(C);
      }
    } else
      ct.delete(i);
    c(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [i, n, r, o, e.nodeSize]), m = U(() => {
    n && !n.isEditable || (ct.set(i, { value: i, focusedAt: Date.now() }), f(i), c(!0), l.current = !1);
  }, [n, i]);
  J(() => {
    const b = s.current;
    if (!b || u) return;
    const w = (k) => {
      k.preventDefault(), k.stopPropagation(), m();
    }, S = (k) => {
      k.preventDefault(), k.stopPropagation();
    };
    return b.addEventListener("dblclick", w), b.addEventListener("click", S), () => {
      b.removeEventListener("dblclick", w), b.removeEventListener("click", S);
    };
  }, [u, n, r, m]), J(() => {
    if (u) {
      const b = requestAnimationFrame(() => {
        if (a.current) {
          a.current.focus(), a.current.select();
          const w = ct.get(i);
          w && (w.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(b);
    }
  }, [u, i]);
  const g = U((b) => {
    b.key === "Enter" ? (b.preventDefault(), h(d)) : b.key === "Escape" && (b.preventDefault(), ct.delete(i), c(!1), l.current = !0, n?.commands.focus());
  }, [h, d, i, n]), y = U(() => {
    const w = ct.get(i)?.focusedAt ?? 0;
    Date.now() - w > 300 && h(d);
  }, [h, d, i]), v = U((b) => {
    f(b.target.value);
  }, []);
  return u ? /* @__PURE__ */ p(Xn, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ p(Wi, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ p(
          "input",
          {
            ref: a,
            type: "text",
            className: "tag-pill-input",
            value: d,
            onChange: v,
            onKeyDown: g,
            onBlur: y,
            spellCheck: !1,
            autoComplete: "off"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ p(Xn, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ p(Wi, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ p("span", { className: "tag-text", children: i })
      ]
    }
  ) });
}
function Wn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Nr(e) {
  return e.toLowerCase().trim();
}
const sv = new Ke("tagPillPaste"), av = Fo.create({
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
      tr(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return Wo(ov, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Nr(e);
        return Wn(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new Je({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = Nr(r[1]);
        if (Wn(o)) {
          const a = r[0].startsWith(" ") ? 1 : 0, i = t.from + a;
          n().deleteRange({ from: i, to: t.to }).insertTagPill(o).run();
        }
      }
    })] : [];
  },
  addProseMirrorPlugins() {
    if (!this.options.enableAutoDetect) return [];
    const e = this.type;
    return [
      new Ve({
        key: sv,
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
              if (Wn(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: c } = t, { tr: d, schema: f } = c, h = [];
            let m = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const w = Nr(y[1]);
              if (Wn(w)) {
                const S = y[0], k = S.startsWith(" ") || S.startsWith(`
`) ? 1 : 0, C = o.slice(m, y.index + k);
                C && h.push(f.text(C)), h.push(e.create({ tag: w })), m = y.index + S.length;
              }
            }
            const v = o.slice(m);
            if (v && h.push(f.text(v)), h.length === 0) return !1;
            const { $from: b } = c.selection;
            if (b.parent.type.name === "paragraph") {
              const w = d;
              let S = c.selection.from;
              for (const k of h)
                w.insert(S, k), S += k.nodeSize;
              w.delete(c.selection.from, c.selection.to), t.dispatch(w);
            } else {
              const w = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, h)
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
function Cu({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = V(""), [a, i] = V(""), [l, u] = V(""), [c, d] = V(!1), f = q(null), h = q(null);
  J(() => {
    e && (s(""), i(""), u(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), J(() => {
    if (!e) return;
    const b = (k) => {
      h.current && !h.current.contains(k.target) && t();
    }, w = (k) => {
      k.key === "Escape" && t();
    }, S = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return document.addEventListener("keydown", w), () => {
      clearTimeout(S), document.removeEventListener("mousedown", b), document.removeEventListener("keydown", w);
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
            /* @__PURE__ */ p(Ba, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ p("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ p(_t, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ p(Na, { size: 12 }),
              "Image URL"
            ] }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: f,
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
            l && /* @__PURE__ */ p("span", { className: "image-url-dialog-error", children: l })
          ] }),
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ p(jo, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ p(
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
            /* @__PURE__ */ p(
              "button",
              {
                onClick: t,
                className: "image-url-dialog-btn image-url-dialog-btn-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ p(
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
const iv = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ p(jo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ p(zp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ p(Bp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ p(Wp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ p(Fp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ p(Up, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ p(Oa, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ p($a, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ p(_a, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ p(Ia, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ p(kc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ p(ta, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ p(Ba, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ p(xc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ p(Mo, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ p(bc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ p(yc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ p(za, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ p(Ha, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ p(wc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ p(Na, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], lv = 32, cv = 8, uv = 320, dv = 210, io = 12;
function yl(e) {
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
function fv({ editor: e }) {
  const [t, n] = V(!1), [r, o] = V(""), [s, a] = V(0), [i, l] = V(null), [u, c] = V(!1), [d, f] = V({ top: 0, left: 0 }), [h, m] = V("below"), g = q(null), y = q(-1), v = q(!1);
  J(() => {
    v.current = t;
  }, [t]);
  const b = iv.filter((M) => {
    if (!r) return !0;
    const E = r.toLowerCase();
    return M.title.toLowerCase().includes(E) || M.keywords?.some((D) => D.includes(E));
  }), w = Math.min(
    b.length * lv + cv,
    uv
  );
  Uo(() => {
    if (!t || !i) return;
    const { top: M, bottom: E, left: D } = i, R = window.innerHeight, I = window.innerWidth, O = R - E - io, H = M - io;
    let W;
    if (O >= w ? W = "below" : H >= w ? W = "above" : W = O >= H ? "below" : "above", m(W), g.current) {
      const G = Math.max(
        io,
        Math.min(D, I - dv - io)
      ), P = W === "below" ? E + 4 : M - w - 4;
      g.current.style.top = `${P}px`, g.current.style.left = `${G}px`;
    }
  }, [t, i, w, b.length]);
  const S = U(() => {
    const { state: M } = e, { selection: E } = M, D = E.from, R = y.current;
    if (R >= 0 && R <= D)
      e.chain().focus().deleteRange({ from: R, to: D }).run();
    else {
      const { $from: I } = E, H = I.parent.textBetween(0, I.parentOffset, void 0, "￼").lastIndexOf("/");
      if (H !== -1) {
        const W = I.pos - (I.parentOffset - H);
        e.chain().focus().deleteRange({ from: W, to: I.pos }).run();
      }
    }
  }, [e]), k = U(() => {
    n(!1), o(""), a(0), y.current = -1, l(null);
  }, []), C = U((M) => {
    const E = b[M];
    if (E) {
      if (S(), E.isImageCommand) {
        const { state: D } = e, R = e.view.coordsAtPos(D.selection.from);
        f({
          top: R.bottom + 8,
          left: R.left
        }), c(!0);
      } else
        E.command(e);
      k();
    }
  }, [e, b, S, k]), N = U((M, E) => {
    e.chain().focus().setImage({ src: M, alt: E }).run();
  }, [e]);
  return J(() => {
    if (!e) return;
    const M = () => {
      if (v.current) return;
      const { state: E } = e, { selection: D } = E, { $from: R } = D;
      if (R.parentOffset === 0) return;
      const I = R.parent.textBetween(0, R.parentOffset, void 0, "￼");
      if (!I.endsWith("/")) return;
      const O = I.length > 1 ? I.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = R.pos - 1;
      const H = yl(e);
      H && (l(H), n(!0), o(""), a(0));
    };
    return e.on("update", M), () => {
      e.off("update", M);
    };
  }, [e]), J(() => {
    if (!e || !t) return;
    const M = e.view.dom, E = (D) => {
      v.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), a((R) => (R + 1) % b.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), a((R) => (R - 1 + b.length) % b.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), C(s)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), k()));
    };
    return M.addEventListener("keydown", E, !0), () => {
      M.removeEventListener("keydown", E, !0);
    };
  }, [e, t, s, b, C, k]), J(() => {
    if (!e || !t) return;
    const M = () => {
      if (!v.current || y.current < 0) return;
      const { state: E } = e, { selection: D } = E, R = D.from, I = y.current;
      if (R <= I) {
        k();
        return;
      }
      try {
        const O = E.doc.textBetween(I + 1, R, void 0, "￼");
        if (O.includes(`
`)) {
          k();
          return;
        }
        o(O), a(0);
        const H = yl(e);
        H && l(H);
      } catch {
        k();
      }
    };
    return e.on("update", M), e.on("selectionUpdate", M), () => {
      e.off("update", M), e.off("selectionUpdate", M);
    };
  }, [e, t, k]), J(() => {
    if (!t) return;
    const M = (E) => {
      g.current && !g.current.contains(E.target) && k();
    };
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, [t, k]), J(() => {
    t && b.length === 0 && r.length > 2 && k();
  }, [t, b.length, r, k]), J(() => {
    s >= b.length && a(Math.max(0, b.length - 1));
  }, [b.length, s]), J(() => {
    if (!t || !g.current) return;
    const M = g.current.querySelector(".slash-item.is-selected");
    M && M.scrollIntoView({ block: "nearest" });
  }, [t, s]), u ? /* @__PURE__ */ p(
    Cu,
    {
      isOpen: u,
      onClose: () => c(!1),
      onInsert: N,
      position: d
    }
  ) : !t || b.length === 0 ? null : /* @__PURE__ */ p(Wt, { children: /* @__PURE__ */ p(
    "div",
    {
      ref: g,
      className: `slash-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: b.map((M, E) => /* @__PURE__ */ A(
        "div",
        {
          className: `slash-item ${E === s ? "is-selected" : ""}`,
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation(), C(E);
          },
          onMouseEnter: () => a(E),
          children: [
            /* @__PURE__ */ p("span", { className: "slash-icon", children: M.icon }),
            /* @__PURE__ */ p("span", { className: "slash-label", children: M.title })
          ]
        },
        M.title
      ))
    }
  ) });
}
const pv = 340, hv = 36, mv = 8, gv = 240, lo = 8;
function bl(e) {
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
function yv({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = V(!1), [s, a] = V(""), [i, l] = V([]), [u, c] = V(0), [d, f] = V(null), [h, m] = V("below"), [g, y] = V(!1), v = q(!1), b = q(null), w = q(-1), S = q(null);
  J(() => {
    v.current = r;
  }, [r]);
  const k = U(() => {
    o(!1), a(""), l([]), c(0), w.current = -1;
  }, []), C = U((D) => {
    const R = w.current;
    if (R < 0) return;
    const { state: I } = e, O = I.selection.from;
    try {
      const H = I.tr.delete(R, O), W = I.schema.marks.wikiLink;
      if (W) {
        const G = W.create({ pageName: D }), P = I.schema.text(D, [G]);
        H.insert(R, P);
        const L = R + D.length;
        H.setSelection(vn.create(H.doc, L)), H.removeStoredMark(W);
      } else
        H.insertText(`[[${D}]]`, R);
      e.view.dispatch(H), e.view.focus();
    } catch (H) {
      console.warn("WikiLinkAutocomplete: Error inserting link", H);
    }
    k();
  }, [e, k]);
  J(() => {
    if (!e) return;
    const D = () => {
      if (v.current) return;
      const { state: R } = e, { selection: I } = R, { $from: O } = I;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      w.current = O.pos - 2;
      const W = bl(e);
      W && (f(W), o(!0), a(""), l([]), c(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), J(() => {
    if (!e || !r) return;
    const D = e.view.dom, R = (I) => {
      if (v.current) {
        if (I.key === "ArrowDown") {
          I.preventDefault();
          const O = i.length + (s.trim() ? 1 : 0) - 1;
          c((H) => Math.min(H + 1, O));
          return;
        }
        if (I.key === "ArrowUp") {
          I.preventDefault(), c((O) => Math.max(O - 1, 0));
          return;
        }
        if (I.key === "Enter" || I.key === "Tab") {
          I.preventDefault(), I.stopPropagation(), u < i.length ? C(i[u].title) : s.trim() && n ? (n(s.trim()), k()) : s.trim() && C(s.trim());
          return;
        }
        if (I.key === "Escape") {
          I.preventDefault(), k();
          return;
        }
        I.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: H } = O.selection;
          H.parent.textBetween(0, H.parentOffset, void 0, "￼").endsWith("]]") && k();
        }, 0);
      }
    };
    return D.addEventListener("keydown", R, !0), () => {
      D.removeEventListener("keydown", R, !0);
    };
  }, [e, r, i, u, s, C, k, n]), J(() => {
    if (!e || !r) return;
    const D = () => {
      const R = w.current;
      if (R < 0) {
        k();
        return;
      }
      const { state: I } = e, O = I.selection.from;
      if (O <= R) {
        k();
        return;
      }
      try {
        const H = I.doc.textBetween(R + 2, O, void 0, "￼");
        if (H.includes(`
`) || H.includes("]]")) {
          k();
          return;
        }
        a(H), c(0);
        const W = bl(e);
        W && f(W);
      } catch {
        k();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, r, k]), J(() => {
    if (r) {
      if (S.current && clearTimeout(S.current), !s.trim()) {
        y(!0), S.current = setTimeout(async () => {
          try {
            const D = await t("");
            l(D);
          } catch {
            l([]);
          }
          y(!1);
        }, 100);
        return;
      }
      return y(!0), S.current = setTimeout(async () => {
        try {
          const D = await t(s.trim());
          l(D);
        } catch {
          l([]);
        }
        y(!1);
      }, 150), () => {
        S.current && clearTimeout(S.current);
      };
    }
  }, [r, s, t]), J(() => {
    if (!r) return;
    const D = (R) => {
      b.current && !b.current.contains(R.target) && k();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [r, k]), J(() => {
    if (!r || !b.current) return;
    const D = b.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [r, u]);
  const N = i.length + (s.trim() ? 1 : 0), x = Math.min(
    Math.max(N, 1) * hv + mv,
    gv
  );
  if (Uo(() => {
    if (!r || !d) return;
    const { top: D, bottom: R, left: I } = d, O = window.innerHeight, H = window.innerWidth, W = O - R - lo, G = D - lo;
    let P;
    if (W >= x ? P = "below" : G >= x ? P = "above" : P = W >= G ? "below" : "above", m(P), b.current) {
      const L = Math.max(
        lo,
        Math.min(I, H - pv - lo)
      ), F = P === "below" ? R + 4 : D - x - 4;
      b.current.style.top = `${F}px`, b.current.style.left = `${L}px`;
    }
  }, [r, d, x, N]), !r) return null;
  const M = s.trim() && !i.some((D) => D.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ p(Wt, { children: /* @__PURE__ */ A(
    "div",
    {
      ref: b,
      className: `wikilink-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: [
        g && i.length === 0 && /* @__PURE__ */ p("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ p("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
        i.map((D, R) => /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item ${R === u ? "is-selected" : ""}`,
            onMouseDown: (I) => {
              I.preventDefault(), C(D.title);
            },
            onMouseEnter: () => c(R),
            children: [
              /* @__PURE__ */ p("span", { className: "wikilink-icon", children: /* @__PURE__ */ p(Wa, { size: 14 }) }),
              /* @__PURE__ */ p("span", { className: "wikilink-label", children: D.title }),
              /* @__PURE__ */ p("span", { className: "wikilink-type", children: D.type })
            ]
          },
          D.id
        )),
        M && /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item wikilink-create ${i.length === u ? "is-selected" : ""}`,
            onMouseDown: (D) => {
              D.preventDefault(), n ? (n(s.trim()), k()) : C(s.trim());
            },
            onMouseEnter: () => c(i.length),
            children: [
              /* @__PURE__ */ p("span", { className: "wikilink-icon", children: /* @__PURE__ */ p(Fa, { size: 14 }) }),
              /* @__PURE__ */ A("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] })
            ]
          }
        ),
        !g && i.length === 0 && !s.trim() && /* @__PURE__ */ p("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ p("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }) })
      ]
    }
  ) });
}
function he(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function lr(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = T.createContext(a), l = n.length;
    n = [...n, a];
    const u = (d) => {
      const { scope: f, children: h, ...m } = d, g = f?.[e]?.[l] || i, y = T.useMemo(() => m, Object.values(m));
      return /* @__PURE__ */ p(g.Provider, { value: y, children: h });
    };
    u.displayName = s + "Provider";
    function c(d, f) {
      const h = f?.[e]?.[l] || i, m = T.useContext(h);
      if (m) return m;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [u, c];
  }
  const o = () => {
    const s = n.map((a) => T.createContext(a));
    return function(i) {
      const l = i?.[e] || s;
      return T.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, bv(o, ...t)];
}
function bv(...e) {
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
      return T.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var tn = globalThis?.document ? T.useLayoutEffect : () => {
}, vv = T[" useInsertionEffect ".trim().toString()] || tn;
function Ja({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = wv({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const c = T.useRef(e !== void 0);
    T.useEffect(() => {
      const d = c.current;
      d !== i && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), c.current = i;
    }, [i, r]);
  }
  const u = T.useCallback(
    (c) => {
      if (i) {
        const d = kv(c) ? c(e) : c;
        d !== e && a.current?.(d);
      } else
        s(c);
    },
    [i, e, s, a]
  );
  return [l, u];
}
function wv({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = T.useState(e), o = T.useRef(n), s = T.useRef(t);
  return vv(() => {
    s.current = t;
  }, [t]), T.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function kv(e) {
  return typeof e == "function";
}
var xv = [
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
], Fe = xv.reduce((e, t) => {
  const n = /* @__PURE__ */ Lr(`Primitive.${t}`), r = T.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p(l, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Su(e, t) {
  e && Ic.flushSync(() => e.dispatchEvent(t));
}
function Tu(e) {
  const t = e + "CollectionProvider", [n, r] = lr(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: y, children: v } = g, b = Q.useRef(null), w = Q.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ p(o, { scope: y, itemMap: w, collectionRef: b, children: v });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ Lr(i), u = Q.forwardRef(
    (g, y) => {
      const { scope: v, children: b } = g, w = s(i, v), S = je(y, w.collectionRef);
      return /* @__PURE__ */ p(l, { ref: S, children: b });
    }
  );
  u.displayName = i;
  const c = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ Lr(c), h = Q.forwardRef(
    (g, y) => {
      const { scope: v, children: b, ...w } = g, S = Q.useRef(null), k = je(y, S), C = s(c, v);
      return Q.useEffect(() => (C.itemMap.set(S, { ref: S, ...w }), () => void C.itemMap.delete(S))), /* @__PURE__ */ p(f, { [d]: "", ref: k, children: b });
    }
  );
  h.displayName = c;
  function m(g) {
    const y = s(e + "CollectionConsumer", g);
    return Q.useCallback(() => {
      const b = y.collectionRef.current;
      if (!b) return [];
      const w = Array.from(b.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (C, N) => w.indexOf(C.ref.current) - w.indexOf(N.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    m,
    r
  ];
}
var Cv = T.createContext(void 0);
function Mu(e) {
  const t = T.useContext(Cv);
  return e || t || "ltr";
}
function Ht(e) {
  const t = T.useRef(e);
  return T.useEffect(() => {
    t.current = e;
  }), T.useMemo(() => (...n) => t.current?.(...n), []);
}
function Sv(e, t = globalThis?.document) {
  const n = Ht(e);
  T.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Tv = "DismissableLayer", ua = "dismissableLayer.update", Mv = "dismissableLayer.pointerDownOutside", Ev = "dismissableLayer.focusOutside", vl, Eu = T.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ei = T.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, u = T.useContext(Eu), [c, d] = T.useState(null), f = c?.ownerDocument ?? globalThis?.document, [, h] = T.useState({}), m = je(t, (N) => d(N)), g = Array.from(u.layers), [y] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(y), b = c ? g.indexOf(c) : -1, w = u.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= v, k = Rv((N) => {
      const x = N.target, M = [...u.branches].some((E) => E.contains(x));
      !S || M || (o?.(N), a?.(N), N.defaultPrevented || i?.());
    }, f), C = Av((N) => {
      const x = N.target;
      [...u.branches].some((E) => E.contains(x)) || (s?.(N), a?.(N), N.defaultPrevented || i?.());
    }, f);
    return Sv((N) => {
      b === u.layers.size - 1 && (r?.(N), !N.defaultPrevented && i && (N.preventDefault(), i()));
    }, f), T.useEffect(() => {
      if (c)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (vl = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(c)), u.layers.add(c), wl(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = vl);
        };
    }, [c, f, n, u]), T.useEffect(() => () => {
      c && (u.layers.delete(c), u.layersWithOutsidePointerEventsDisabled.delete(c), wl());
    }, [c, u]), T.useEffect(() => {
      const N = () => h({});
      return document.addEventListener(ua, N), () => document.removeEventListener(ua, N);
    }, []), /* @__PURE__ */ p(
      Fe.div,
      {
        ...l,
        ref: m,
        style: {
          pointerEvents: w ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: he(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: he(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: he(
          e.onPointerDownCapture,
          k.onPointerDownCapture
        )
      }
    );
  }
);
ei.displayName = Tv;
var Nv = "DismissableLayerBranch", Dv = T.forwardRef((e, t) => {
  const n = T.useContext(Eu), r = T.useRef(null), o = je(t, r);
  return T.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ p(Fe.div, { ...e, ref: o });
});
Dv.displayName = Nv;
function Rv(e, t = globalThis?.document) {
  const n = Ht(e), r = T.useRef(!1), o = T.useRef(() => {
  });
  return T.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          Nu(
            Mv,
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
function Av(e, t = globalThis?.document) {
  const n = Ht(e), r = T.useRef(!1);
  return T.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Nu(Ev, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function wl() {
  const e = new CustomEvent(ua);
  document.dispatchEvent(e);
}
function Nu(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Su(o, s) : o.dispatchEvent(s);
}
var Os = 0;
function Lv() {
  T.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? kl()), document.body.insertAdjacentElement("beforeend", e[1] ?? kl()), Os++, () => {
      Os === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Os--;
    };
  }, []);
}
function kl() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var $s = "focusScope.autoFocusOnMount", _s = "focusScope.autoFocusOnUnmount", xl = { bubbles: !1, cancelable: !0 }, Pv = "FocusScope", Du = T.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = T.useState(null), u = Ht(o), c = Ht(s), d = T.useRef(null), f = je(t, (g) => l(g)), h = T.useRef({
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
      let g = function(w) {
        if (h.paused || !i) return;
        const S = w.target;
        i.contains(S) ? d.current = S : Qt(d.current, { select: !0 });
      }, y = function(w) {
        if (h.paused || !i) return;
        const S = w.relatedTarget;
        S !== null && (i.contains(S) || Qt(d.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const k of w)
            k.removedNodes.length > 0 && Qt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const b = new MutationObserver(v);
      return i && b.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), b.disconnect();
      };
    }
  }, [r, i, h.paused]), T.useEffect(() => {
    if (i) {
      Sl.add(h);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const v = new CustomEvent($s, xl);
        i.addEventListener($s, u), i.dispatchEvent(v), v.defaultPrevented || (Iv(zv(Ru(i)), { select: !0 }), document.activeElement === g && Qt(i));
      }
      return () => {
        i.removeEventListener($s, u), setTimeout(() => {
          const v = new CustomEvent(_s, xl);
          i.addEventListener(_s, c), i.dispatchEvent(v), v.defaultPrevented || Qt(g ?? document.body, { select: !0 }), i.removeEventListener(_s, c), Sl.remove(h);
        }, 0);
      };
    }
  }, [i, u, c, h]);
  const m = T.useCallback(
    (g) => {
      if (!n && !r || h.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (y && v) {
        const b = g.currentTarget, [w, S] = Ov(b);
        w && S ? !g.shiftKey && v === S ? (g.preventDefault(), n && Qt(w, { select: !0 })) : g.shiftKey && v === w && (g.preventDefault(), n && Qt(S, { select: !0 })) : v === b && g.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ p(Fe.div, { tabIndex: -1, ...a, ref: f, onKeyDown: m });
});
Du.displayName = Pv;
function Iv(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Qt(r, { select: t }), document.activeElement !== n) return;
}
function Ov(e) {
  const t = Ru(e), n = Cl(t, e), r = Cl(t.reverse(), e);
  return [n, r];
}
function Ru(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Cl(e, t) {
  for (const n of e)
    if (!$v(n, { upTo: t })) return n;
}
function $v(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function _v(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Qt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && _v(e) && t && e.select();
  }
}
var Sl = Hv();
function Hv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Tl(e, t), e.unshift(t);
    },
    remove(t) {
      e = Tl(e, t), e[0]?.resume();
    }
  };
}
function Tl(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function zv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Bv = T[" useId ".trim().toString()] || (() => {
}), Wv = 0;
function Eo(e) {
  const [t, n] = T.useState(Bv());
  return tn(() => {
    n((r) => r ?? String(Wv++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Fv = ["top", "right", "bottom", "left"], nn = Math.min, tt = Math.max, No = Math.round, co = Math.floor, kt = (e) => ({
  x: e,
  y: e
}), Uv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Yv = {
  start: "end",
  end: "start"
};
function da(e, t, n) {
  return tt(e, nn(t, n));
}
function zt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Bt(e) {
  return e.split("-")[0];
}
function cr(e) {
  return e.split("-")[1];
}
function ti(e) {
  return e === "x" ? "y" : "x";
}
function ni(e) {
  return e === "y" ? "height" : "width";
}
const jv = /* @__PURE__ */ new Set(["top", "bottom"]);
function wt(e) {
  return jv.has(Bt(e)) ? "y" : "x";
}
function ri(e) {
  return ti(wt(e));
}
function Vv(e, t, n) {
  n === void 0 && (n = !1);
  const r = cr(e), o = ri(e), s = ni(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Do(a)), [a, Do(a)];
}
function Kv(e) {
  const t = Do(e);
  return [fa(e), t, fa(t)];
}
function fa(e) {
  return e.replace(/start|end/g, (t) => Yv[t]);
}
const Ml = ["left", "right"], El = ["right", "left"], qv = ["top", "bottom"], Gv = ["bottom", "top"];
function Xv(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? El : Ml : t ? Ml : El;
    case "left":
    case "right":
      return t ? qv : Gv;
    default:
      return [];
  }
}
function Zv(e, t, n, r) {
  const o = cr(e);
  let s = Xv(Bt(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(fa)))), s;
}
function Do(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Uv[t]);
}
function Qv(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Au(e) {
  return typeof e != "number" ? Qv(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ro(e) {
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
function Nl(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = wt(t), a = ri(t), i = ni(a), l = Bt(t), u = s === "y", c = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
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
  switch (cr(t)) {
    case "start":
      h[a] -= f * (n && u ? -1 : 1);
      break;
    case "end":
      h[a] += f * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const Jv = async (e, t, n) => {
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
  } = Nl(u, r, l), f = r, h = {}, m = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: y,
      fn: v
    } = i[g], {
      x: b,
      y: w,
      data: S,
      reset: k
    } = await v({
      x: c,
      y: d,
      initialPlacement: r,
      placement: f,
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
        ...S
      }
    }, k && m <= 50 && (m++, typeof k == "object" && (k.placement && (f = k.placement), k.rects && (u = k.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : k.rects), {
      x: c,
      y: d
    } = Nl(u, f, l)), g = -1);
  }
  return {
    x: c,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: h
  };
};
async function Pr(e, t) {
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
    altBoundary: f = !1,
    padding: h = 0
  } = zt(t, e), m = Au(h), y = i[f ? d === "floating" ? "reference" : "floating" : d], v = Ro(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: l
  })), b = d === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), S = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, k = Ro(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: b,
    offsetParent: w,
    strategy: l
  }) : b);
  return {
    top: (v.top - k.top + m.top) / S.y,
    bottom: (k.bottom - v.bottom + m.bottom) / S.y,
    left: (v.left - k.left + m.left) / S.x,
    right: (k.right - v.right + m.right) / S.x
  };
}
const ew = (e) => ({
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
    } = zt(e, t) || {};
    if (u == null)
      return {};
    const d = Au(c), f = {
      x: n,
      y: r
    }, h = ri(o), m = ni(h), g = await a.getDimensions(u), y = h === "y", v = y ? "top" : "left", b = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", S = s.reference[m] + s.reference[h] - f[h] - s.floating[m], k = f[h] - s.reference[h], C = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let N = C ? C[w] : 0;
    (!N || !await (a.isElement == null ? void 0 : a.isElement(C))) && (N = i.floating[w] || s.floating[m]);
    const x = S / 2 - k / 2, M = N / 2 - g[m] / 2 - 1, E = nn(d[v], M), D = nn(d[b], M), R = E, I = N - g[m] - D, O = N / 2 - g[m] / 2 + x, H = da(R, O, I), W = !l.arrow && cr(o) != null && O !== H && s.reference[m] / 2 - (O < R ? E : D) - g[m] / 2 < 0, G = W ? O < R ? O - R : O - I : 0;
    return {
      [h]: f[h] + G,
      data: {
        [h]: H,
        centerOffset: O - H - G,
        ...W && {
          alignmentOffset: G
        }
      },
      reset: W
    };
  }
}), tw = function(e) {
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
        fallbackPlacements: f,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: g = !0,
        ...y
      } = zt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = Bt(o), b = wt(i), w = Bt(i) === i, S = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), k = f || (w || !g ? [Do(i)] : Kv(i)), C = m !== "none";
      !f && C && k.push(...Zv(i, g, m, S));
      const N = [i, ...k], x = await Pr(t, y), M = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (c && M.push(x[v]), d) {
        const O = Vv(o, a, S);
        M.push(x[O[0]], x[O[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: M
      }], !M.every((O) => O <= 0)) {
        var D, R;
        const O = (((D = s.flip) == null ? void 0 : D.index) || 0) + 1, H = N[O];
        if (H && (!(d === "alignment" ? b !== wt(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        E.every((P) => wt(P.placement) === b ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: E
            },
            reset: {
              placement: H
            }
          };
        let W = (R = E.filter((G) => G.overflows[0] <= 0).sort((G, P) => G.overflows[1] - P.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!W)
          switch (h) {
            case "bestFit": {
              var I;
              const G = (I = E.filter((P) => {
                if (C) {
                  const L = wt(P.placement);
                  return L === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((L) => L > 0).reduce((L, F) => L + F, 0)]).sort((P, L) => P[1] - L[1])[0]) == null ? void 0 : I[0];
              G && (W = G);
              break;
            }
            case "initialPlacement":
              W = i;
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
function Dl(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Rl(e) {
  return Fv.some((t) => e[t] >= 0);
}
const nw = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = zt(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Pr(t, {
            ...o,
            elementContext: "reference"
          }), a = Dl(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Rl(a)
            }
          };
        }
        case "escaped": {
          const s = await Pr(t, {
            ...o,
            altBoundary: !0
          }), a = Dl(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Rl(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Lu = /* @__PURE__ */ new Set(["left", "top"]);
async function rw(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Bt(n), i = cr(n), l = wt(n) === "y", u = Lu.has(a) ? -1 : 1, c = s && l ? -1 : 1, d = zt(t, e);
  let {
    mainAxis: f,
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
    y: f * u
  } : {
    x: f * u,
    y: h * c
  };
}
const ow = function(e) {
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
      } = t, l = await rw(t, e);
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
}, sw = function(e) {
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
      } = zt(e, t), u = {
        x: n,
        y: r
      }, c = await Pr(t, l), d = wt(Bt(o)), f = ti(d);
      let h = u[f], m = u[d];
      if (s) {
        const y = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", b = h + c[y], w = h - c[v];
        h = da(b, h, w);
      }
      if (a) {
        const y = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", b = m + c[y], w = m - c[v];
        m = da(b, m, w);
      }
      const g = i.fn({
        ...t,
        [f]: h,
        [d]: m
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [f]: s,
            [d]: a
          }
        }
      };
    }
  };
}, aw = function(e) {
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
      } = zt(e, t), c = {
        x: n,
        y: r
      }, d = wt(o), f = ti(d);
      let h = c[f], m = c[d];
      const g = zt(i, t), y = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const w = f === "y" ? "height" : "width", S = s.reference[f] - s.floating[w] + y.mainAxis, k = s.reference[f] + s.reference[w] - y.mainAxis;
        h < S ? h = S : h > k && (h = k);
      }
      if (u) {
        var v, b;
        const w = f === "y" ? "width" : "height", S = Lu.has(Bt(o)), k = s.reference[d] - s.floating[w] + (S && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (S ? 0 : y.crossAxis), C = s.reference[d] + s.reference[w] + (S ? 0 : ((b = a.offset) == null ? void 0 : b[d]) || 0) - (S ? y.crossAxis : 0);
        m < k ? m = k : m > C && (m = C);
      }
      return {
        [f]: h,
        [d]: m
      };
    }
  };
}, iw = function(e) {
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
      } = zt(e, t), c = await Pr(t, u), d = Bt(o), f = cr(o), h = wt(o) === "y", {
        width: m,
        height: g
      } = s.floating;
      let y, v;
      d === "top" || d === "bottom" ? (y = d, v = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, y = f === "end" ? "top" : "bottom");
      const b = g - c.top - c.bottom, w = m - c.left - c.right, S = nn(g - c[y], b), k = nn(m - c[v], w), C = !t.middlewareData.shift;
      let N = S, x = k;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = w), (r = t.middlewareData.shift) != null && r.enabled.y && (N = b), C && !f) {
        const E = tt(c.left, 0), D = tt(c.right, 0), R = tt(c.top, 0), I = tt(c.bottom, 0);
        h ? x = m - 2 * (E !== 0 || D !== 0 ? E + D : tt(c.left, c.right)) : N = g - 2 * (R !== 0 || I !== 0 ? R + I : tt(c.top, c.bottom));
      }
      await l({
        ...t,
        availableWidth: x,
        availableHeight: N
      });
      const M = await a.getDimensions(i.floating);
      return m !== M.width || g !== M.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Xo() {
  return typeof window < "u";
}
function ur(e) {
  return Pu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function nt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function St(e) {
  var t;
  return (t = (Pu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Pu(e) {
  return Xo() ? e instanceof Node || e instanceof nt(e).Node : !1;
}
function pt(e) {
  return Xo() ? e instanceof Element || e instanceof nt(e).Element : !1;
}
function xt(e) {
  return Xo() ? e instanceof HTMLElement || e instanceof nt(e).HTMLElement : !1;
}
function Al(e) {
  return !Xo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof nt(e).ShadowRoot;
}
const lw = /* @__PURE__ */ new Set(["inline", "contents"]);
function Wr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = ht(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !lw.has(o);
}
const cw = /* @__PURE__ */ new Set(["table", "td", "th"]);
function uw(e) {
  return cw.has(ur(e));
}
const dw = [":popover-open", ":modal"];
function Zo(e) {
  return dw.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const fw = ["transform", "translate", "scale", "rotate", "perspective"], pw = ["transform", "translate", "scale", "rotate", "perspective", "filter"], hw = ["paint", "layout", "strict", "content"];
function oi(e) {
  const t = si(), n = pt(e) ? ht(e) : e;
  return fw.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || pw.some((r) => (n.willChange || "").includes(r)) || hw.some((r) => (n.contain || "").includes(r));
}
function mw(e) {
  let t = rn(e);
  for (; xt(t) && !Qn(t); ) {
    if (oi(t))
      return t;
    if (Zo(t))
      return null;
    t = rn(t);
  }
  return null;
}
function si() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const gw = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Qn(e) {
  return gw.has(ur(e));
}
function ht(e) {
  return nt(e).getComputedStyle(e);
}
function Qo(e) {
  return pt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function rn(e) {
  if (ur(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Al(e) && e.host || // Fallback.
    St(e)
  );
  return Al(t) ? t.host : t;
}
function Iu(e) {
  const t = rn(e);
  return Qn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : xt(t) && Wr(t) ? t : Iu(t);
}
function Ir(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Iu(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = nt(o);
  if (s) {
    const i = pa(a);
    return t.concat(a, a.visualViewport || [], Wr(o) ? o : [], i && n ? Ir(i) : []);
  }
  return t.concat(o, Ir(o, [], n));
}
function pa(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ou(e) {
  const t = ht(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = xt(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = No(n) !== s || No(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function ai(e) {
  return pt(e) ? e : e.contextElement;
}
function Kn(e) {
  const t = ai(e);
  if (!xt(t))
    return kt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Ou(t);
  let a = (s ? No(n.width) : n.width) / r, i = (s ? No(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const yw = /* @__PURE__ */ kt(0);
function $u(e) {
  const t = nt(e);
  return !si() || !t.visualViewport ? yw : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function bw(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== nt(e) ? !1 : t;
}
function kn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ai(e);
  let a = kt(1);
  t && (r ? pt(r) && (a = Kn(r)) : a = Kn(e));
  const i = bw(s, n, r) ? $u(s) : kt(0);
  let l = (o.left + i.x) / a.x, u = (o.top + i.y) / a.y, c = o.width / a.x, d = o.height / a.y;
  if (s) {
    const f = nt(s), h = r && pt(r) ? nt(r) : r;
    let m = f, g = pa(m);
    for (; g && r && h !== m; ) {
      const y = Kn(g), v = g.getBoundingClientRect(), b = ht(g), w = v.left + (g.clientLeft + parseFloat(b.paddingLeft)) * y.x, S = v.top + (g.clientTop + parseFloat(b.paddingTop)) * y.y;
      l *= y.x, u *= y.y, c *= y.x, d *= y.y, l += w, u += S, m = nt(g), g = pa(m);
    }
  }
  return Ro({
    width: c,
    height: d,
    x: l,
    y: u
  });
}
function Jo(e, t) {
  const n = Qo(e).scrollLeft;
  return t ? t.left + n : kn(St(e)).left + n;
}
function _u(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Jo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function vw(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = St(r), i = t ? Zo(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = kt(1);
  const c = kt(0), d = xt(r);
  if ((d || !d && !s) && ((ur(r) !== "body" || Wr(a)) && (l = Qo(r)), xt(r))) {
    const h = kn(r);
    u = Kn(r), c.x = h.x + r.clientLeft, c.y = h.y + r.clientTop;
  }
  const f = a && !d && !s ? _u(a, l) : kt(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + c.x + f.x,
    y: n.y * u.y - l.scrollTop * u.y + c.y + f.y
  };
}
function ww(e) {
  return Array.from(e.getClientRects());
}
function kw(e) {
  const t = St(e), n = Qo(e), r = e.ownerDocument.body, o = tt(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = tt(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Jo(e);
  const i = -n.scrollTop;
  return ht(r).direction === "rtl" && (a += tt(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
const Ll = 25;
function xw(e, t) {
  const n = nt(e), r = St(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, l = 0;
  if (o) {
    s = o.width, a = o.height;
    const c = si();
    (!c || c && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const u = Jo(r);
  if (u <= 0) {
    const c = r.ownerDocument, d = c.body, f = getComputedStyle(d), h = c.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, m = Math.abs(r.clientWidth - d.clientWidth - h);
    m <= Ll && (s -= m);
  } else u <= Ll && (s += u);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const Cw = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Sw(e, t) {
  const n = kn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = xt(e) ? Kn(e) : kt(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = o * s.x, u = r * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: u
  };
}
function Pl(e, t, n) {
  let r;
  if (t === "viewport")
    r = xw(e, n);
  else if (t === "document")
    r = kw(St(e));
  else if (pt(t))
    r = Sw(t, n);
  else {
    const o = $u(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Ro(r);
}
function Hu(e, t) {
  const n = rn(e);
  return n === t || !pt(n) || Qn(n) ? !1 : ht(n).position === "fixed" || Hu(n, t);
}
function Tw(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Ir(e, [], !1).filter((i) => pt(i) && ur(i) !== "body"), o = null;
  const s = ht(e).position === "fixed";
  let a = s ? rn(e) : e;
  for (; pt(a) && !Qn(a); ) {
    const i = ht(a), l = oi(a);
    !l && i.position === "fixed" && (o = null), (s ? !l && !o : !l && i.position === "static" && !!o && Cw.has(o.position) || Wr(a) && !l && Hu(e, a)) ? r = r.filter((c) => c !== a) : o = i, a = rn(a);
  }
  return t.set(e, r), r;
}
function Mw(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? Zo(t) ? [] : Tw(t, this._c) : [].concat(n), r], i = a[0], l = a.reduce((u, c) => {
    const d = Pl(t, c, o);
    return u.top = tt(d.top, u.top), u.right = nn(d.right, u.right), u.bottom = nn(d.bottom, u.bottom), u.left = tt(d.left, u.left), u;
  }, Pl(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Ew(e) {
  const {
    width: t,
    height: n
  } = Ou(e);
  return {
    width: t,
    height: n
  };
}
function Nw(e, t, n) {
  const r = xt(t), o = St(t), s = n === "fixed", a = kn(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = kt(0);
  function u() {
    l.x = Jo(o);
  }
  if (r || !r && !s)
    if ((ur(t) !== "body" || Wr(o)) && (i = Qo(t)), r) {
      const h = kn(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else o && u();
  s && !r && o && u();
  const c = o && !r && !s ? _u(o, i) : kt(0), d = a.left + i.scrollLeft - l.x - c.x, f = a.top + i.scrollTop - l.y - c.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function Hs(e) {
  return ht(e).position === "static";
}
function Il(e, t) {
  if (!xt(e) || ht(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return St(e) === n && (n = n.ownerDocument.body), n;
}
function zu(e, t) {
  const n = nt(e);
  if (Zo(e))
    return n;
  if (!xt(e)) {
    let o = rn(e);
    for (; o && !Qn(o); ) {
      if (pt(o) && !Hs(o))
        return o;
      o = rn(o);
    }
    return n;
  }
  let r = Il(e, t);
  for (; r && uw(r) && Hs(r); )
    r = Il(r, t);
  return r && Qn(r) && Hs(r) && !oi(r) ? n : r || mw(e) || n;
}
const Dw = async function(e) {
  const t = this.getOffsetParent || zu, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Nw(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Rw(e) {
  return ht(e).direction === "rtl";
}
const Aw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: vw,
  getDocumentElement: St,
  getClippingRect: Mw,
  getOffsetParent: zu,
  getElementRects: Dw,
  getClientRects: ww,
  getDimensions: Ew,
  getScale: Kn,
  isElement: pt,
  isRTL: Rw
};
function Bu(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Lw(e, t) {
  let n = null, r;
  const o = St(e);
  function s() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), s();
    const u = e.getBoundingClientRect(), {
      left: c,
      top: d,
      width: f,
      height: h
    } = u;
    if (i || t(), !f || !h)
      return;
    const m = co(d), g = co(o.clientWidth - (c + f)), y = co(o.clientHeight - (d + h)), v = co(c), w = {
      rootMargin: -m + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: tt(0, nn(1, l)) || 1
    };
    let S = !0;
    function k(C) {
      const N = C[0].intersectionRatio;
      if (N !== l) {
        if (!S)
          return a();
        N ? a(!1, N) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      N === 1 && !Bu(u, e.getBoundingClientRect()) && a(), S = !1;
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
  return a(!0), s;
}
function Pw(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = ai(e), c = o || s ? [...u ? Ir(u) : [], ...Ir(t)] : [];
  c.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = u && i ? Lw(u, n) : null;
  let f = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [b] = v;
    b && b.target === u && h && (h.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = h) == null || w.observe(t);
    })), n();
  }), u && !l && h.observe(u), h.observe(t));
  let m, g = l ? kn(e) : null;
  l && y();
  function y() {
    const v = kn(e);
    g && !Bu(g, v) && n(), g = v, m = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    c.forEach((b) => {
      o && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), d?.(), (v = h) == null || v.disconnect(), h = null, l && cancelAnimationFrame(m);
  };
}
const Iw = ow, Ow = sw, $w = tw, _w = iw, Hw = nw, Ol = ew, zw = aw, Bw = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Aw,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Jv(e, t, {
    ...o,
    platform: s
  });
};
var Ww = typeof document < "u", Fw = function() {
}, Co = Ww ? Uo : Fw;
function Ao(e, t) {
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
        if (!Ao(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !Ao(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Wu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function $l(e, t) {
  const n = Wu(e);
  return Math.round(t * n) / n;
}
function zs(e) {
  const t = T.useRef(e);
  return Co(() => {
    t.current = e;
  }), t;
}
function Uw(e) {
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
  } = e, [c, d] = T.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, h] = T.useState(r);
  Ao(f, r) || h(r);
  const [m, g] = T.useState(null), [y, v] = T.useState(null), b = T.useCallback((P) => {
    P !== C.current && (C.current = P, g(P));
  }, []), w = T.useCallback((P) => {
    P !== N.current && (N.current = P, v(P));
  }, []), S = s || m, k = a || y, C = T.useRef(null), N = T.useRef(null), x = T.useRef(c), M = l != null, E = zs(l), D = zs(o), R = zs(u), I = T.useCallback(() => {
    if (!C.current || !N.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (P.platform = D.current), Bw(C.current, N.current, P).then((L) => {
      const F = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      O.current && !Ao(x.current, F) && (x.current = F, Ic.flushSync(() => {
        d(F);
      }));
    });
  }, [f, t, n, D, R]);
  Co(() => {
    u === !1 && x.current.isPositioned && (x.current.isPositioned = !1, d((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [u]);
  const O = T.useRef(!1);
  Co(() => (O.current = !0, () => {
    O.current = !1;
  }), []), Co(() => {
    if (S && (C.current = S), k && (N.current = k), S && k) {
      if (E.current)
        return E.current(S, k, I);
      I();
    }
  }, [S, k, I, E, M]);
  const H = T.useMemo(() => ({
    reference: C,
    floating: N,
    setReference: b,
    setFloating: w
  }), [b, w]), W = T.useMemo(() => ({
    reference: S,
    floating: k
  }), [S, k]), G = T.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return P;
    const L = $l(W.floating, c.x), F = $l(W.floating, c.y);
    return i ? {
      ...P,
      transform: "translate(" + L + "px, " + F + "px)",
      ...Wu(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: F
    };
  }, [n, i, W.floating, c.x, c.y]);
  return T.useMemo(() => ({
    ...c,
    update: I,
    refs: H,
    elements: W,
    floatingStyles: G
  }), [c, I, H, W, G]);
}
const Yw = (e) => {
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
      return r && t(r) ? r.current != null ? Ol({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Ol({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, jw = (e, t) => ({
  ...Iw(e),
  options: [e, t]
}), Vw = (e, t) => ({
  ...Ow(e),
  options: [e, t]
}), Kw = (e, t) => ({
  ...zw(e),
  options: [e, t]
}), qw = (e, t) => ({
  ...$w(e),
  options: [e, t]
}), Gw = (e, t) => ({
  ..._w(e),
  options: [e, t]
}), Xw = (e, t) => ({
  ...Hw(e),
  options: [e, t]
}), Zw = (e, t) => ({
  ...Yw(e),
  options: [e, t]
});
var Qw = "Arrow", Fu = T.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ p(
    Fe.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ p("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Fu.displayName = Qw;
var Jw = Fu;
function ek(e) {
  const [t, n] = T.useState(void 0);
  return tn(() => {
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
var ii = "Popper", [Uu, es] = lr(ii), [tk, Yu] = Uu(ii), ju = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = T.useState(null);
  return /* @__PURE__ */ p(tk, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
ju.displayName = ii;
var Vu = "PopperAnchor", Ku = T.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Yu(Vu, n), a = T.useRef(null), i = je(t, a), l = T.useRef(null);
    return T.useEffect(() => {
      const u = l.current;
      l.current = r?.current || a.current, u !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ p(Fe.div, { ...o, ref: i });
  }
);
Ku.displayName = Vu;
var li = "PopperContent", [nk, rk] = Uu(li), qu = T.forwardRef(
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
      hideWhenDetached: f = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: m,
      ...g
    } = e, y = Yu(li, n), [v, b] = T.useState(null), w = je(t, (j) => b(j)), [S, k] = T.useState(null), C = ek(S), N = C?.width ?? 0, x = C?.height ?? 0, M = r + (s !== "center" ? "-" + s : ""), E = typeof c == "number" ? c : { top: 0, right: 0, bottom: 0, left: 0, ...c }, D = Array.isArray(u) ? u : [u], R = D.length > 0, I = {
      padding: E,
      boundary: D.filter(sk),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: O, floatingStyles: H, placement: W, isPositioned: G, middlewareData: P } = Uw({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: M,
      whileElementsMounted: (...j) => Pw(...j, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        jw({ mainAxis: o + x, alignmentAxis: a }),
        l && Vw({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Kw() : void 0,
          ...I
        }),
        l && qw({ ...I }),
        Gw({
          ...I,
          apply: ({ elements: j, rects: ee, availableWidth: ge, availableHeight: be }) => {
            const { width: Ae, height: ze } = ee.reference, ot = j.floating.style;
            ot.setProperty("--radix-popper-available-width", `${ge}px`), ot.setProperty("--radix-popper-available-height", `${be}px`), ot.setProperty("--radix-popper-anchor-width", `${Ae}px`), ot.setProperty("--radix-popper-anchor-height", `${ze}px`);
          }
        }),
        S && Zw({ element: S, padding: i }),
        ak({ arrowWidth: N, arrowHeight: x }),
        f && Xw({ strategy: "referenceHidden", ...I })
      ]
    }), [L, F] = Zu(W), X = Ht(m);
    tn(() => {
      G && X?.();
    }, [G, X]);
    const K = P.arrow?.x, Z = P.arrow?.y, te = P.arrow?.centerOffset !== 0, [_, B] = T.useState();
    return tn(() => {
      v && B(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ p(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...H,
          transform: G ? H.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: _,
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
        children: /* @__PURE__ */ p(
          nk,
          {
            scope: n,
            placedSide: L,
            onArrowChange: k,
            arrowX: K,
            arrowY: Z,
            shouldHideArrow: te,
            children: /* @__PURE__ */ p(
              Fe.div,
              {
                "data-side": L,
                "data-align": F,
                ...g,
                ref: w,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: G ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
qu.displayName = li;
var Gu = "PopperArrow", ok = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Xu = T.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = rk(Gu, r), a = ok[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ p(
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
        children: /* @__PURE__ */ p(
          Jw,
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
Xu.displayName = Gu;
function sk(e) {
  return e !== null;
}
var ak = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, a = o.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [u, c] = Zu(n), d = { start: "0%", center: "50%", end: "100%" }[c], f = (o.arrow?.x ?? 0) + i / 2, h = (o.arrow?.y ?? 0) + l / 2;
    let m = "", g = "";
    return u === "bottom" ? (m = a ? d : `${f}px`, g = `${-l}px`) : u === "top" ? (m = a ? d : `${f}px`, g = `${r.floating.height + l}px`) : u === "right" ? (m = `${-l}px`, g = a ? d : `${h}px`) : u === "left" && (m = `${r.floating.width + l}px`, g = a ? d : `${h}px`), { data: { x: m, y: g } };
  }
});
function Zu(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Qu = ju, Ju = Ku, ed = qu, td = Xu, ik = "Portal", ci = T.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = T.useState(!1);
  tn(() => s(!0), []);
  const a = n || o && globalThis?.document?.body;
  return a ? wh.createPortal(/* @__PURE__ */ p(Fe.div, { ...r, ref: t }), a) : null;
});
ci.displayName = ik;
function lk(e, t) {
  return T.useReducer((n, r) => t[n][r] ?? n, e);
}
var Cn = (e) => {
  const { present: t, children: n } = e, r = ck(t), o = typeof n == "function" ? n({ present: r.isPresent }) : T.Children.only(n), s = je(r.ref, uk(o));
  return typeof n == "function" || r.isPresent ? T.cloneElement(o, { ref: s }) : null;
};
Cn.displayName = "Presence";
function ck(e) {
  const [t, n] = T.useState(), r = T.useRef(null), o = T.useRef(e), s = T.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = lk(a, {
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
    const u = uo(r.current);
    s.current = i === "mounted" ? u : "none";
  }, [i]), tn(() => {
    const u = r.current, c = o.current;
    if (c !== e) {
      const f = s.current, h = uo(u);
      e ? l("MOUNT") : h === "none" || u?.display === "none" ? l("UNMOUNT") : l(c && f !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), tn(() => {
    if (t) {
      let u;
      const c = t.ownerDocument.defaultView ?? window, d = (h) => {
        const g = uo(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (l("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = c.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (h) => {
        h.target === t && (s.current = uo(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        c.clearTimeout(u), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: T.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function uo(e) {
  return e?.animationName || "none";
}
function uk(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Bs = "rovingFocusGroup.onEntryFocus", dk = { bubbles: !1, cancelable: !0 }, Fr = "RovingFocusGroup", [ha, nd, fk] = Tu(Fr), [pk, rd] = lr(
  Fr,
  [fk]
), [hk, mk] = pk(Fr), od = T.forwardRef(
  (e, t) => /* @__PURE__ */ p(ha.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(ha.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(gk, { ...e, ref: t }) }) })
);
od.displayName = Fr;
var gk = T.forwardRef((e, t) => {
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
  } = e, f = T.useRef(null), h = je(t, f), m = Mu(s), [g, y] = Ja({
    prop: a,
    defaultProp: i ?? null,
    onChange: l,
    caller: Fr
  }), [v, b] = T.useState(!1), w = Ht(u), S = nd(n), k = T.useRef(!1), [C, N] = T.useState(0);
  return T.useEffect(() => {
    const x = f.current;
    if (x)
      return x.addEventListener(Bs, w), () => x.removeEventListener(Bs, w);
  }, [w]), /* @__PURE__ */ p(
    hk,
    {
      scope: n,
      orientation: r,
      dir: m,
      loop: o,
      currentTabStopId: g,
      onItemFocus: T.useCallback(
        (x) => y(x),
        [y]
      ),
      onItemShiftTab: T.useCallback(() => b(!0), []),
      onFocusableItemAdd: T.useCallback(
        () => N((x) => x + 1),
        []
      ),
      onFocusableItemRemove: T.useCallback(
        () => N((x) => x - 1),
        []
      ),
      children: /* @__PURE__ */ p(
        Fe.div,
        {
          tabIndex: v || C === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: he(e.onMouseDown, () => {
            k.current = !0;
          }),
          onFocus: he(e.onFocus, (x) => {
            const M = !k.current;
            if (x.target === x.currentTarget && M && !v) {
              const E = new CustomEvent(Bs, dk);
              if (x.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
                const D = S().filter((W) => W.focusable), R = D.find((W) => W.active), I = D.find((W) => W.id === g), H = [R, I, ...D].filter(
                  Boolean
                ).map((W) => W.ref.current);
                id(H, c);
              }
            }
            k.current = !1;
          }),
          onBlur: he(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), sd = "RovingFocusGroupItem", ad = T.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, l = Eo(), u = s || l, c = mk(sd, n), d = c.currentTabStopId === u, f = nd(n), { onFocusableItemAdd: h, onFocusableItemRemove: m, currentTabStopId: g } = c;
    return T.useEffect(() => {
      if (r)
        return h(), () => m();
    }, [r, h, m]), /* @__PURE__ */ p(
      ha.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ p(
          Fe.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": c.orientation,
            ...i,
            ref: t,
            onMouseDown: he(e.onMouseDown, (y) => {
              r ? c.onItemFocus(u) : y.preventDefault();
            }),
            onFocus: he(e.onFocus, () => c.onItemFocus(u)),
            onKeyDown: he(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                c.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const v = vk(y, c.orientation, c.dir);
              if (v !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = f().filter((S) => S.focusable).map((S) => S.ref.current);
                if (v === "last") w.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && w.reverse();
                  const S = w.indexOf(y.currentTarget);
                  w = c.loop ? wk(w, S + 1) : w.slice(S + 1);
                }
                setTimeout(() => id(w));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: g != null }) : a
          }
        )
      }
    );
  }
);
ad.displayName = sd;
var yk = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function bk(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function vk(e, t, n) {
  const r = bk(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return yk[r];
}
function id(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function wk(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var kk = od, xk = ad, Ck = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, $n = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), po = {}, Ws = 0, ld = function(e) {
  return e && (e.host || ld(e.parentNode));
}, Sk = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ld(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Tk = function(e, t, n, r) {
  var o = Sk(t, Array.isArray(e) ? e : [e]);
  po[n] || (po[n] = /* @__PURE__ */ new WeakMap());
  var s = po[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(o), u = function(d) {
    !d || i.has(d) || (i.add(d), u(d.parentNode));
  };
  o.forEach(u);
  var c = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        c(f);
      else
        try {
          var h = f.getAttribute(r), m = h !== null && h !== "false", g = ($n.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          $n.set(f, g), s.set(f, y), a.push(f), g === 1 && m && fo.set(f, !0), y === 1 && f.setAttribute(n, "true"), m || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return c(t), i.clear(), Ws++, function() {
    a.forEach(function(d) {
      var f = $n.get(d) - 1, h = s.get(d) - 1;
      $n.set(d, f), s.set(d, h), f || (fo.has(d) || d.removeAttribute(r), fo.delete(d)), h || d.removeAttribute(n);
    }), Ws--, Ws || ($n = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), po = {});
  };
}, Mk = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Ck(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Tk(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, bt = function() {
  return bt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, bt.apply(this, arguments);
};
function cd(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Ek(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var So = "right-scroll-bar-position", To = "width-before-scroll-bar", Nk = "with-scroll-bars-hidden", Dk = "--removed-body-scroll-bar-size";
function Fs(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Rk(e, t) {
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
var Ak = typeof window < "u" ? T.useLayoutEffect : T.useEffect, _l = /* @__PURE__ */ new WeakMap();
function Lk(e, t) {
  var n = Rk(null, function(r) {
    return e.forEach(function(o) {
      return Fs(o, r);
    });
  });
  return Ak(function() {
    var r = _l.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || Fs(i, null);
      }), s.forEach(function(i) {
        o.has(i) || Fs(i, a);
      });
    }
    _l.set(n, e);
  }, [e]), n;
}
function Pk(e) {
  return e;
}
function Ik(e, t) {
  t === void 0 && (t = Pk);
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
function Ok(e) {
  e === void 0 && (e = {});
  var t = Ik(null);
  return t.options = bt({ async: !0, ssr: !1 }, e), t;
}
var ud = function(e) {
  var t = e.sideCar, n = cd(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return T.createElement(r, bt({}, n));
};
ud.isSideCarExport = !0;
function $k(e, t) {
  return e.useMedium(t), ud;
}
var dd = Ok(), Us = function() {
}, ts = T.forwardRef(function(e, t) {
  var n = T.useRef(null), r = T.useState({
    onScrollCapture: Us,
    onWheelCapture: Us,
    onTouchMoveCapture: Us
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, l = e.className, u = e.removeScrollBar, c = e.enabled, d = e.shards, f = e.sideCar, h = e.noRelative, m = e.noIsolation, g = e.inert, y = e.allowPinchZoom, v = e.as, b = v === void 0 ? "div" : v, w = e.gapMode, S = cd(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), k = f, C = Lk([n, t]), N = bt(bt({}, S), o);
  return T.createElement(
    T.Fragment,
    null,
    c && T.createElement(k, { sideCar: dd, removeScrollBar: u, shards: d, noRelative: h, noIsolation: m, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    a ? T.cloneElement(T.Children.only(i), bt(bt({}, N), { ref: C })) : T.createElement(b, bt({}, N, { className: l, ref: C }), i)
  );
});
ts.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
ts.classNames = {
  fullWidth: To,
  zeroRight: So
};
var _k = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Hk() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = _k();
  return t && e.setAttribute("nonce", t), e;
}
function zk(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Bk(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Wk = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Hk()) && (zk(t, n), Bk(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Fk = function() {
  var e = Wk();
  return function(t, n) {
    T.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, fd = function() {
  var e = Fk(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Uk = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ys = function(e) {
  return parseInt(e || "", 10) || 0;
}, Yk = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ys(n), Ys(r), Ys(o)];
}, jk = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Uk;
  var t = Yk(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Vk = fd(), qn = "data-scroll-locked", Kk = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Nk, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(qn, `] {
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
  
  .`).concat(So, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(To, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(So, " .").concat(So, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(To, " .").concat(To, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(qn, `] {
    `).concat(Dk, ": ").concat(i, `px;
  }
`);
}, Hl = function() {
  var e = parseInt(document.body.getAttribute(qn) || "0", 10);
  return isFinite(e) ? e : 0;
}, qk = function() {
  T.useEffect(function() {
    return document.body.setAttribute(qn, (Hl() + 1).toString()), function() {
      var e = Hl() - 1;
      e <= 0 ? document.body.removeAttribute(qn) : document.body.setAttribute(qn, e.toString());
    };
  }, []);
}, Gk = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  qk();
  var s = T.useMemo(function() {
    return jk(o);
  }, [o]);
  return T.createElement(Vk, { styles: Kk(s, !t, o, n ? "" : "!important") });
}, ma = !1;
if (typeof window < "u")
  try {
    var ho = Object.defineProperty({}, "passive", {
      get: function() {
        return ma = !0, !0;
      }
    });
    window.addEventListener("test", ho, ho), window.removeEventListener("test", ho, ho);
  } catch {
    ma = !1;
  }
var _n = ma ? { passive: !1 } : !1, Xk = function(e) {
  return e.tagName === "TEXTAREA";
}, pd = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Xk(e) && n[t] === "visible")
  );
}, Zk = function(e) {
  return pd(e, "overflowY");
}, Qk = function(e) {
  return pd(e, "overflowX");
}, zl = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = hd(e, r);
    if (o) {
      var s = md(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Jk = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, ex = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, hd = function(e, t) {
  return e === "v" ? Zk(t) : Qk(t);
}, md = function(e, t) {
  return e === "v" ? Jk(t) : ex(t);
}, tx = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, nx = function(e, t, n, r, o) {
  var s = tx(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, l = t.contains(i), u = !1, c = a > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var h = md(e, i), m = h[0], g = h[1], y = h[2], v = g - y - s * m;
    (m || v) && hd(e, i) && (d += v, f += m);
    var b = i.parentNode;
    i = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (c && Math.abs(d) < 1 || !c && Math.abs(f) < 1) && (u = !0), u;
}, mo = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Bl = function(e) {
  return [e.deltaX, e.deltaY];
}, Wl = function(e) {
  return e && "current" in e ? e.current : e;
}, rx = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, ox = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, sx = 0, Hn = [];
function ax(e) {
  var t = T.useRef([]), n = T.useRef([0, 0]), r = T.useRef(), o = T.useState(sx++)[0], s = T.useState(fd)[0], a = T.useRef(e);
  T.useEffect(function() {
    a.current = e;
  }, [e]), T.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Ek([e.lockRef.current], (e.shards || []).map(Wl), !0).filter(Boolean);
      return g.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = T.useCallback(function(g, y) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = mo(g), b = n.current, w = "deltaX" in g ? g.deltaX : b[0] - v[0], S = "deltaY" in g ? g.deltaY : b[1] - v[1], k, C = g.target, N = Math.abs(w) > Math.abs(S) ? "h" : "v";
    if ("touches" in g && N === "h" && C.type === "range")
      return !1;
    var x = zl(N, C);
    if (!x)
      return !0;
    if (x ? k = N : (k = N === "v" ? "h" : "v", x = zl(N, C)), !x)
      return !1;
    if (!r.current && "changedTouches" in g && (w || S) && (r.current = k), !k)
      return !0;
    var M = r.current || k;
    return nx(M, y, g, M === "h" ? w : S);
  }, []), l = T.useCallback(function(g) {
    var y = g;
    if (!(!Hn.length || Hn[Hn.length - 1] !== s)) {
      var v = "deltaY" in y ? Bl(y) : mo(y), b = t.current.filter(function(k) {
        return k.name === y.type && (k.target === y.target || y.target === k.shadowParent) && rx(k.delta, v);
      })[0];
      if (b && b.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!b) {
        var w = (a.current.shards || []).map(Wl).filter(Boolean).filter(function(k) {
          return k.contains(y.target);
        }), S = w.length > 0 ? i(y, w[0]) : !a.current.noIsolation;
        S && y.cancelable && y.preventDefault();
      }
    }
  }, []), u = T.useCallback(function(g, y, v, b) {
    var w = { name: g, delta: y, target: v, should: b, shadowParent: ix(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== w;
      });
    }, 1);
  }, []), c = T.useCallback(function(g) {
    n.current = mo(g), r.current = void 0;
  }, []), d = T.useCallback(function(g) {
    u(g.type, Bl(g), g.target, i(g, e.lockRef.current));
  }, []), f = T.useCallback(function(g) {
    u(g.type, mo(g), g.target, i(g, e.lockRef.current));
  }, []);
  T.useEffect(function() {
    return Hn.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, _n), document.addEventListener("touchmove", l, _n), document.addEventListener("touchstart", c, _n), function() {
      Hn = Hn.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", l, _n), document.removeEventListener("touchmove", l, _n), document.removeEventListener("touchstart", c, _n);
    };
  }, []);
  var h = e.removeScrollBar, m = e.inert;
  return T.createElement(
    T.Fragment,
    null,
    m ? T.createElement(s, { styles: ox(o) }) : null,
    h ? T.createElement(Gk, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function ix(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const lx = $k(dd, ax);
var gd = T.forwardRef(function(e, t) {
  return T.createElement(ts, bt({}, e, { ref: t, sideCar: lx }));
});
gd.classNames = ts.classNames;
var ga = ["Enter", " "], cx = ["ArrowDown", "PageUp", "Home"], yd = ["ArrowUp", "PageDown", "End"], ux = [...cx, ...yd], dx = {
  ltr: [...ga, "ArrowRight"],
  rtl: [...ga, "ArrowLeft"]
}, fx = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Ur = "Menu", [Or, px, hx] = Tu(Ur), [Sn, bd] = lr(Ur, [
  hx,
  es,
  rd
]), ns = es(), vd = rd(), [mx, Tn] = Sn(Ur), [gx, Yr] = Sn(Ur), wd = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: a = !0 } = e, i = ns(t), [l, u] = T.useState(null), c = T.useRef(!1), d = Ht(s), f = Mu(o);
  return T.useEffect(() => {
    const h = () => {
      c.current = !0, document.addEventListener("pointerdown", m, { capture: !0, once: !0 }), document.addEventListener("pointermove", m, { capture: !0, once: !0 });
    }, m = () => c.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", m, { capture: !0 }), document.removeEventListener("pointermove", m, { capture: !0 });
    };
  }, []), /* @__PURE__ */ p(Qu, { ...i, children: /* @__PURE__ */ p(
    mx,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: u,
      children: /* @__PURE__ */ p(
        gx,
        {
          scope: t,
          onClose: T.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: c,
          dir: f,
          modal: a,
          children: r
        }
      )
    }
  ) });
};
wd.displayName = Ur;
var yx = "MenuAnchor", ui = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = ns(n);
    return /* @__PURE__ */ p(Ju, { ...o, ...r, ref: t });
  }
);
ui.displayName = yx;
var di = "MenuPortal", [bx, kd] = Sn(di, {
  forceMount: void 0
}), xd = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = Tn(di, t);
  return /* @__PURE__ */ p(bx, { scope: t, forceMount: n, children: /* @__PURE__ */ p(Cn, { present: n || s.open, children: /* @__PURE__ */ p(ci, { asChild: !0, container: o, children: r }) }) });
};
xd.displayName = di;
var lt = "MenuContent", [vx, fi] = Sn(lt), Cd = T.forwardRef(
  (e, t) => {
    const n = kd(lt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Tn(lt, e.__scopeMenu), a = Yr(lt, e.__scopeMenu);
    return /* @__PURE__ */ p(Or.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ p(Cn, { present: r || s.open, children: /* @__PURE__ */ p(Or.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ p(wx, { ...o, ref: t }) : /* @__PURE__ */ p(kx, { ...o, ref: t }) }) }) });
  }
), wx = T.forwardRef(
  (e, t) => {
    const n = Tn(lt, e.__scopeMenu), r = T.useRef(null), o = je(t, r);
    return T.useEffect(() => {
      const s = r.current;
      if (s) return Mk(s);
    }, []), /* @__PURE__ */ p(
      pi,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: he(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), kx = T.forwardRef((e, t) => {
  const n = Tn(lt, e.__scopeMenu);
  return /* @__PURE__ */ p(
    pi,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), xx = /* @__PURE__ */ Lr("MenuContent.ScrollLock"), pi = T.forwardRef(
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
      onInteractOutside: f,
      onDismiss: h,
      disableOutsideScroll: m,
      ...g
    } = e, y = Tn(lt, n), v = Yr(lt, n), b = ns(n), w = vd(n), S = px(n), [k, C] = T.useState(null), N = T.useRef(null), x = je(t, N, y.onContentChange), M = T.useRef(0), E = T.useRef(""), D = T.useRef(0), R = T.useRef(null), I = T.useRef("right"), O = T.useRef(0), H = m ? gd : T.Fragment, W = m ? { as: xx, allowPinchZoom: !0 } : void 0, G = (L) => {
      const F = E.current + L, X = S().filter((j) => !j.disabled), K = document.activeElement, Z = X.find((j) => j.ref.current === K)?.textValue, te = X.map((j) => j.textValue), _ = Ix(te, F, Z), B = X.find((j) => j.textValue === _)?.ref.current;
      (function j(ee) {
        E.current = ee, window.clearTimeout(M.current), ee !== "" && (M.current = window.setTimeout(() => j(""), 1e3));
      })(F), B && setTimeout(() => B.focus());
    };
    T.useEffect(() => () => window.clearTimeout(M.current), []), Lv();
    const P = T.useCallback((L) => I.current === R.current?.side && $x(L, R.current?.area), []);
    return /* @__PURE__ */ p(
      vx,
      {
        scope: n,
        searchRef: E,
        onItemEnter: T.useCallback(
          (L) => {
            P(L) && L.preventDefault();
          },
          [P]
        ),
        onItemLeave: T.useCallback(
          (L) => {
            P(L) || (N.current?.focus(), C(null));
          },
          [P]
        ),
        onTriggerLeave: T.useCallback(
          (L) => {
            P(L) && L.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: D,
        onPointerGraceIntentChange: T.useCallback((L) => {
          R.current = L;
        }, []),
        children: /* @__PURE__ */ p(H, { ...W, children: /* @__PURE__ */ p(
          Du,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: he(s, (L) => {
              L.preventDefault(), N.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ p(
              ei,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: u,
                onPointerDownOutside: c,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: h,
                children: /* @__PURE__ */ p(
                  kk,
                  {
                    asChild: !0,
                    ...w,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: k,
                    onCurrentTabStopIdChange: C,
                    onEntryFocus: he(l, (L) => {
                      v.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ p(
                      ed,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": zd(y.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...b,
                        ...g,
                        ref: x,
                        style: { outline: "none", ...g.style },
                        onKeyDown: he(g.onKeyDown, (L) => {
                          const X = L.target.closest("[data-radix-menu-content]") === L.currentTarget, K = L.ctrlKey || L.altKey || L.metaKey, Z = L.key.length === 1;
                          X && (L.key === "Tab" && L.preventDefault(), !K && Z && G(L.key));
                          const te = N.current;
                          if (L.target !== te || !ux.includes(L.key)) return;
                          L.preventDefault();
                          const B = S().filter((j) => !j.disabled).map((j) => j.ref.current);
                          yd.includes(L.key) && B.reverse(), Lx(B);
                        }),
                        onBlur: he(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(M.current), E.current = "");
                        }),
                        onPointerMove: he(
                          e.onPointerMove,
                          $r((L) => {
                            const F = L.target, X = O.current !== L.clientX;
                            if (L.currentTarget.contains(F) && X) {
                              const K = L.clientX > O.current ? "right" : "left";
                              I.current = K, O.current = L.clientX;
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
Cd.displayName = lt;
var Cx = "MenuGroup", hi = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ p(Fe.div, { role: "group", ...r, ref: t });
  }
);
hi.displayName = Cx;
var Sx = "MenuLabel", Sd = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ p(Fe.div, { ...r, ref: t });
  }
);
Sd.displayName = Sx;
var Lo = "MenuItem", Fl = "menu.itemSelect", rs = T.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = T.useRef(null), a = Yr(Lo, e.__scopeMenu), i = fi(Lo, e.__scopeMenu), l = je(t, s), u = T.useRef(!1), c = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(Fl, { bubbles: !0, cancelable: !0 });
        d.addEventListener(Fl, (h) => r?.(h), { once: !0 }), Su(d, f), f.defaultPrevented ? u.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ p(
      Td,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: he(e.onClick, c),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), u.current = !0;
        },
        onPointerUp: he(e.onPointerUp, (d) => {
          u.current || d.currentTarget?.click();
        }),
        onKeyDown: he(e.onKeyDown, (d) => {
          const f = i.searchRef.current !== "";
          n || f && d.key === " " || ga.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
rs.displayName = Lo;
var Td = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, a = fi(Lo, n), i = vd(n), l = T.useRef(null), u = je(t, l), [c, d] = T.useState(!1), [f, h] = T.useState("");
    return T.useEffect(() => {
      const m = l.current;
      m && h((m.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ p(
      Or.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ p(xk, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ p(
          Fe.div,
          {
            role: "menuitem",
            "data-highlighted": c ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: u,
            onPointerMove: he(
              e.onPointerMove,
              $r((m) => {
                r ? a.onItemLeave(m) : (a.onItemEnter(m), m.defaultPrevented || m.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: he(
              e.onPointerLeave,
              $r((m) => a.onItemLeave(m))
            ),
            onFocus: he(e.onFocus, () => d(!0)),
            onBlur: he(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), Tx = "MenuCheckboxItem", Md = T.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ p(Ad, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ p(
      rs,
      {
        role: "menuitemcheckbox",
        "aria-checked": Po(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": gi(n),
        onSelect: he(
          o.onSelect,
          () => r?.(Po(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Md.displayName = Tx;
var Ed = "MenuRadioGroup", [Mx, Ex] = Sn(
  Ed,
  { value: void 0, onValueChange: () => {
  } }
), Nd = T.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = Ht(r);
    return /* @__PURE__ */ p(Mx, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ p(hi, { ...o, ref: t }) });
  }
);
Nd.displayName = Ed;
var Dd = "MenuRadioItem", Rd = T.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Ex(Dd, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ p(Ad, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ p(
      rs,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": gi(s),
        onSelect: he(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Rd.displayName = Dd;
var mi = "MenuItemIndicator", [Ad, Nx] = Sn(
  mi,
  { checked: !1 }
), Ld = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = Nx(mi, n);
    return /* @__PURE__ */ p(
      Cn,
      {
        present: r || Po(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ p(
          Fe.span,
          {
            ...o,
            ref: t,
            "data-state": gi(s.checked)
          }
        )
      }
    );
  }
);
Ld.displayName = mi;
var Dx = "MenuSeparator", Pd = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ p(
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
Pd.displayName = Dx;
var Rx = "MenuArrow", Id = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = ns(n);
    return /* @__PURE__ */ p(td, { ...o, ...r, ref: t });
  }
);
Id.displayName = Rx;
var Ax = "MenuSub", [HT, Od] = Sn(Ax), Cr = "MenuSubTrigger", $d = T.forwardRef(
  (e, t) => {
    const n = Tn(Cr, e.__scopeMenu), r = Yr(Cr, e.__scopeMenu), o = Od(Cr, e.__scopeMenu), s = fi(Cr, e.__scopeMenu), a = T.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, u = { __scopeMenu: e.__scopeMenu }, c = T.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return T.useEffect(() => c, [c]), T.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [i, l]), /* @__PURE__ */ p(ui, { asChild: !0, ...u, children: /* @__PURE__ */ p(
      Td,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": zd(n.open),
        ...e,
        ref: qo(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: he(
          e.onPointerMove,
          $r((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (s.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), c();
            }, 100));
          })
        ),
        onPointerLeave: he(
          e.onPointerLeave,
          $r((d) => {
            c();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const h = n.content?.dataset.side, m = h === "right", g = m ? -5 : 5, y = f[m ? "left" : "right"], v = f[m ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + g, y: d.clientY },
                  { x: y, y: f.top },
                  { x: v, y: f.top },
                  { x: v, y: f.bottom },
                  { x: y, y: f.bottom }
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
        onKeyDown: he(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && d.key === " " || dx[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
$d.displayName = Cr;
var _d = "MenuSubContent", Hd = T.forwardRef(
  (e, t) => {
    const n = kd(lt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Tn(lt, e.__scopeMenu), a = Yr(lt, e.__scopeMenu), i = Od(_d, e.__scopeMenu), l = T.useRef(null), u = je(t, l);
    return /* @__PURE__ */ p(Or.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ p(Cn, { present: r || s.open, children: /* @__PURE__ */ p(Or.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ p(
      pi,
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
        onFocusOutside: he(e.onFocusOutside, (c) => {
          c.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: he(e.onEscapeKeyDown, (c) => {
          a.onClose(), c.preventDefault();
        }),
        onKeyDown: he(e.onKeyDown, (c) => {
          const d = c.currentTarget.contains(c.target), f = fx[a.dir].includes(c.key);
          d && f && (s.onOpenChange(!1), i.trigger?.focus(), c.preventDefault());
        })
      }
    ) }) }) });
  }
);
Hd.displayName = _d;
function zd(e) {
  return e ? "open" : "closed";
}
function Po(e) {
  return e === "indeterminate";
}
function gi(e) {
  return Po(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Lx(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Px(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Ix(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = Px(e, Math.max(s, 0));
  o.length === 1 && (a = a.filter((u) => u !== n));
  const l = a.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Ox(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], u = i.x, c = i.y, d = l.x, f = l.y;
    c > r != f > r && n < (d - u) * (r - c) / (f - c) + u && (o = !o);
  }
  return o;
}
function $x(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Ox(n, t);
}
function $r(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var _x = wd, Hx = ui, zx = xd, Bx = Cd, Wx = hi, Fx = Sd, Ux = rs, Yx = Md, jx = Nd, Vx = Rd, Kx = Ld, qx = Pd, Gx = Id, Xx = $d, Zx = Hd, os = "DropdownMenu", [Qx] = lr(
  os,
  [bd]
), Xe = bd(), [Jx, Bd] = Qx(os), Wd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, l = Xe(t), u = T.useRef(null), [c, d] = Ja({
    prop: o,
    defaultProp: s ?? !1,
    onChange: a,
    caller: os
  });
  return /* @__PURE__ */ p(
    Jx,
    {
      scope: t,
      triggerId: Eo(),
      triggerRef: u,
      contentId: Eo(),
      open: c,
      onOpenChange: d,
      onOpenToggle: T.useCallback(() => d((f) => !f), [d]),
      modal: i,
      children: /* @__PURE__ */ p(_x, { ...l, open: c, onOpenChange: d, dir: r, modal: i, children: n })
    }
  );
};
Wd.displayName = os;
var Fd = "DropdownMenuTrigger", Ud = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = Bd(Fd, n), a = Xe(n);
    return /* @__PURE__ */ p(Hx, { asChild: !0, ...a, children: /* @__PURE__ */ p(
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
        ref: qo(t, s.triggerRef),
        onPointerDown: he(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: he(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Ud.displayName = Fd;
var e0 = "DropdownMenuPortal", Yd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Xe(t);
  return /* @__PURE__ */ p(zx, { ...r, ...n });
};
Yd.displayName = e0;
var jd = "DropdownMenuContent", Vd = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Bd(jd, n), s = Xe(n), a = T.useRef(!1);
    return /* @__PURE__ */ p(
      Bx,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: he(e.onCloseAutoFocus, (i) => {
          a.current || o.triggerRef.current?.focus(), a.current = !1, i.preventDefault();
        }),
        onInteractOutside: he(e.onInteractOutside, (i) => {
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
Vd.displayName = jd;
var t0 = "DropdownMenuGroup", n0 = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
    return /* @__PURE__ */ p(Wx, { ...o, ...r, ref: t });
  }
);
n0.displayName = t0;
var r0 = "DropdownMenuLabel", o0 = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
    return /* @__PURE__ */ p(Fx, { ...o, ...r, ref: t });
  }
);
o0.displayName = r0;
var s0 = "DropdownMenuItem", Kd = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
    return /* @__PURE__ */ p(Ux, { ...o, ...r, ref: t });
  }
);
Kd.displayName = s0;
var a0 = "DropdownMenuCheckboxItem", i0 = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
  return /* @__PURE__ */ p(Yx, { ...o, ...r, ref: t });
});
i0.displayName = a0;
var l0 = "DropdownMenuRadioGroup", c0 = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
  return /* @__PURE__ */ p(jx, { ...o, ...r, ref: t });
});
c0.displayName = l0;
var u0 = "DropdownMenuRadioItem", d0 = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
  return /* @__PURE__ */ p(Vx, { ...o, ...r, ref: t });
});
d0.displayName = u0;
var f0 = "DropdownMenuItemIndicator", p0 = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
  return /* @__PURE__ */ p(Kx, { ...o, ...r, ref: t });
});
p0.displayName = f0;
var h0 = "DropdownMenuSeparator", qd = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
  return /* @__PURE__ */ p(qx, { ...o, ...r, ref: t });
});
qd.displayName = h0;
var m0 = "DropdownMenuArrow", g0 = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
    return /* @__PURE__ */ p(Gx, { ...o, ...r, ref: t });
  }
);
g0.displayName = m0;
var y0 = "DropdownMenuSubTrigger", b0 = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
  return /* @__PURE__ */ p(Xx, { ...o, ...r, ref: t });
});
b0.displayName = y0;
var v0 = "DropdownMenuSubContent", w0 = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Xe(n);
  return /* @__PURE__ */ p(
    Zx,
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
w0.displayName = v0;
var k0 = Wd, x0 = Ud, C0 = Yd, S0 = Vd, T0 = Kd, M0 = qd;
function js({
  ...e
}) {
  return /* @__PURE__ */ p(k0, { "data-slot": "dropdown-menu", ...e });
}
function Vs({
  ...e
}) {
  return /* @__PURE__ */ p(
    x0,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function Ks({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ p(C0, { children: /* @__PURE__ */ p(
    S0,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: pe(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function Le({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ p(
    T0,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: pe(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    }
  );
}
function qs({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ p(
    M0,
    {
      "data-slot": "dropdown-menu-separator",
      className: pe("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var E0 = Object.freeze({
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
}), N0 = "VisuallyHidden", Gd = T.forwardRef(
  (e, t) => /* @__PURE__ */ p(
    Fe.span,
    {
      ...e,
      ref: t,
      style: { ...E0, ...e.style }
    }
  )
);
Gd.displayName = N0;
var D0 = Gd, [ss] = lr("Tooltip", [
  es
]), as = es(), Xd = "TooltipProvider", R0 = 700, ya = "tooltip.open", [A0, yi] = ss(Xd), Zd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = R0,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, a = T.useRef(!0), i = T.useRef(!1), l = T.useRef(0);
  return T.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ p(
    A0,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: T.useCallback(() => {
        window.clearTimeout(l.current), a.current = !1;
      }, []),
      onClose: T.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => a.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: T.useCallback((u) => {
        i.current = u;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
Zd.displayName = Xd;
var _r = "Tooltip", [L0, jr] = ss(_r), Qd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, l = yi(_r, e.__scopeTooltip), u = as(t), [c, d] = T.useState(null), f = Eo(), h = T.useRef(0), m = a ?? l.disableHoverableContent, g = i ?? l.delayDuration, y = T.useRef(!1), [v, b] = Ja({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (N) => {
      N ? (l.onOpen(), document.dispatchEvent(new CustomEvent(ya))) : l.onClose(), s?.(N);
    },
    caller: _r
  }), w = T.useMemo(() => v ? y.current ? "delayed-open" : "instant-open" : "closed", [v]), S = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, y.current = !1, b(!0);
  }, [b]), k = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b(!1);
  }, [b]), C = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      y.current = !0, b(!0), h.current = 0;
    }, g);
  }, [g, b]);
  return T.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ p(Qu, { ...u, children: /* @__PURE__ */ p(
    L0,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: w,
      trigger: c,
      onTriggerChange: d,
      onTriggerEnter: T.useCallback(() => {
        l.isOpenDelayedRef.current ? C() : S();
      }, [l.isOpenDelayedRef, C, S]),
      onTriggerLeave: T.useCallback(() => {
        m ? k() : (window.clearTimeout(h.current), h.current = 0);
      }, [k, m]),
      onOpen: S,
      onClose: k,
      disableHoverableContent: m,
      children: n
    }
  ) });
};
Qd.displayName = _r;
var ba = "TooltipTrigger", Jd = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = jr(ba, n), s = yi(ba, n), a = as(n), i = T.useRef(null), l = je(t, i, o.onTriggerChange), u = T.useRef(!1), c = T.useRef(!1), d = T.useCallback(() => u.current = !1, []);
    return T.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ p(Ju, { asChild: !0, ...a, children: /* @__PURE__ */ p(
      Fe.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: he(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !c.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: he(e.onPointerLeave, () => {
          o.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: he(e.onPointerDown, () => {
          o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: he(e.onFocus, () => {
          u.current || o.onOpen();
        }),
        onBlur: he(e.onBlur, o.onClose),
        onClick: he(e.onClick, o.onClose)
      }
    ) });
  }
);
Jd.displayName = ba;
var bi = "TooltipPortal", [P0, I0] = ss(bi, {
  forceMount: void 0
}), ef = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = jr(bi, t);
  return /* @__PURE__ */ p(P0, { scope: t, forceMount: n, children: /* @__PURE__ */ p(Cn, { present: n || s.open, children: /* @__PURE__ */ p(ci, { asChild: !0, container: o, children: r }) }) });
};
ef.displayName = bi;
var Jn = "TooltipContent", tf = T.forwardRef(
  (e, t) => {
    const n = I0(Jn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, a = jr(Jn, e.__scopeTooltip);
    return /* @__PURE__ */ p(Cn, { present: r || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ p(nf, { side: o, ...s, ref: t }) : /* @__PURE__ */ p(O0, { side: o, ...s, ref: t }) });
  }
), O0 = T.forwardRef((e, t) => {
  const n = jr(Jn, e.__scopeTooltip), r = yi(Jn, e.__scopeTooltip), o = T.useRef(null), s = je(t, o), [a, i] = T.useState(null), { trigger: l, onClose: u } = n, c = o.current, { onPointerInTransitChange: d } = r, f = T.useCallback(() => {
    i(null), d(!1);
  }, [d]), h = T.useCallback(
    (m, g) => {
      const y = m.currentTarget, v = { x: m.clientX, y: m.clientY }, b = z0(v, y.getBoundingClientRect()), w = B0(v, b), S = W0(g.getBoundingClientRect()), k = U0([...w, ...S]);
      i(k), d(!0);
    },
    [d]
  );
  return T.useEffect(() => () => f(), [f]), T.useEffect(() => {
    if (l && c) {
      const m = (y) => h(y, c), g = (y) => h(y, l);
      return l.addEventListener("pointerleave", m), c.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", m), c.removeEventListener("pointerleave", g);
      };
    }
  }, [l, c, h, f]), T.useEffect(() => {
    if (a) {
      const m = (g) => {
        const y = g.target, v = { x: g.clientX, y: g.clientY }, b = l?.contains(y) || c?.contains(y), w = !F0(v, a);
        b ? f() : w && (f(), u());
      };
      return document.addEventListener("pointermove", m), () => document.removeEventListener("pointermove", m);
    }
  }, [l, c, a, u, f]), /* @__PURE__ */ p(nf, { ...e, ref: s });
}), [$0, _0] = ss(_r, { isInside: !1 }), H0 = /* @__PURE__ */ Ub("TooltipContent"), nf = T.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, l = jr(Jn, n), u = as(n), { onClose: c } = l;
    return T.useEffect(() => (document.addEventListener(ya, c), () => document.removeEventListener(ya, c)), [c]), T.useEffect(() => {
      if (l.trigger) {
        const d = (f) => {
          f.target?.contains(l.trigger) && c();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, c]), /* @__PURE__ */ p(
      ei,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ A(
          ed,
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
              /* @__PURE__ */ p(H0, { children: r }),
              /* @__PURE__ */ p($0, { scope: n, isInside: !0, children: /* @__PURE__ */ p(D0, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
tf.displayName = Jn;
var rf = "TooltipArrow", of = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = as(n);
    return _0(
      rf,
      n
    ).isInside ? null : /* @__PURE__ */ p(td, { ...o, ...r, ref: t });
  }
);
of.displayName = rf;
function z0(e, t) {
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
function B0(e, t, n = 5) {
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
function W0(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function F0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], u = i.x, c = i.y, d = l.x, f = l.y;
    c > r != f > r && n < (d - u) * (r - c) / (f - c) + u && (o = !o);
  }
  return o;
}
function U0(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Y0(t);
}
function Y0(e) {
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
var j0 = Zd, V0 = Qd, K0 = Jd, q0 = ef, G0 = tf, X0 = of;
function Z0({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ p(
    j0,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function va({
  ...e
}) {
  return /* @__PURE__ */ p(Z0, { children: /* @__PURE__ */ p(V0, { "data-slot": "tooltip", ...e }) });
}
function wa({
  ...e
}) {
  return /* @__PURE__ */ p(K0, { "data-slot": "tooltip-trigger", ...e });
}
function ka({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ p(q0, { children: /* @__PURE__ */ A(
    G0,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: pe(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ p(X0, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const Pe = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
  const s = /* @__PURE__ */ p(
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
  return o ? /* @__PURE__ */ A(va, { children: [
    /* @__PURE__ */ p(wa, { asChild: !0, children: s }),
    /* @__PURE__ */ p(ka, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, zn = () => /* @__PURE__ */ p("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Q0 = nr(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const l = q(null), [u, c] = V(!1), [d, f] = V(void 0), h = dc({
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
  }), m = U(() => {
    const { view: C } = t, { from: N } = C.state.selection, x = C.coordsAtPos(N);
    f({ top: x.bottom + 8, left: x.left }), c(!0);
  }, [t]), g = U((C, N) => {
    t.chain().focus().setImage({ src: C, alt: N }).run(), c(!1);
  }, [t]), y = U(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = U((C) => {
    t.chain().focus().insertCallout({ type: C }).run();
  }, [t]), b = q(/* @__PURE__ */ new Map()), w = q(/* @__PURE__ */ new Map()), S = U((C) => {
    const { doc: N, tr: x } = C.state;
    let M = !1;
    const E = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = C.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    b.current.clear(), D.forEach((I, O) => {
      I.querySelectorAll(":scope > li").forEach((W) => {
        const G = W, P = (G.textContent || "").trim().substring(0, 50);
        b.current.set(`${O}-${P}`, G.getBoundingClientRect());
      });
    });
    const R = [];
    N.descendants((I, O, H, W) => {
      if (!E.has(I.type.name)) return !0;
      let G = !1;
      if (I.forEach((L) => {
        L.type.name === "taskItem" && (G = !0);
      }), !G) return !0;
      let P = 0;
      return N.nodesBetween(0, O, (L) => (E.has(L.type.name) && P++, !0)), R.push({ node: I, pos: O, depth: P }), !0;
    }), R.sort((I, O) => O.depth - I.depth);
    for (const { node: I, pos: O } of R) {
      const H = [];
      let W = 0;
      I.forEach((_) => {
        H.push({
          node: _,
          isTask: _.type.name === "taskItem",
          checked: _.type.name === "taskItem" && _.attrs.checked === !0,
          originalIndex: W++
        });
      });
      const G = H.filter((_) => _.isTask && !_.checked), P = H.filter((_) => _.isTask && _.checked), L = [...H], F = H.map((_, B) => ({ index: B, isTask: _.isTask })).filter((_) => _.isTask).map((_) => _.index), X = [...G, ...P];
      if (F.forEach((_, B) => {
        L[_] = X[B];
      }), !L.some((_, B) => _.node !== H[B].node)) continue;
      const Z = I.type.create(
        I.attrs,
        L.map((_) => _.node)
      ), te = x.mapping.map(O);
      x.replaceWith(te, te + I.nodeSize, Z), M = !0;
    }
    M && (C.view.dispatch(x), requestAnimationFrame(() => {
      C.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const H = O.querySelectorAll(":scope > li"), W = /* @__PURE__ */ new Map();
        b.current.forEach((G, P) => {
          const L = P.replace(/^\d+-/, "");
          W.set(L, G);
        }), H.forEach((G) => {
          const P = G, L = (P.textContent || "").trim().substring(0, 50), F = W.get(L);
          if (!F) return;
          const X = P.getBoundingClientRect(), K = F.top - X.top;
          if (Math.abs(K) < 2) return;
          P.style.transform = `translateY(${K}px)`, P.style.transition = "none", P.style.zIndex = "1", P.offsetHeight, P.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", P.style.transform = "translateY(0)";
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
    t.state.doc.descendants((x, M) => (x.type.name === "taskItem" && C.set(M, x.attrs.checked === !0), !0)), w.current = C;
    const N = ({ transaction: x }) => {
      if (!x.docChanged) return;
      const M = /* @__PURE__ */ new Map();
      t.state.doc.descendants((R, I) => (R.type.name === "taskItem" && M.set(I, R.attrs.checked === !0), !0));
      const E = w.current;
      let D = !1;
      if (E.size > 0 && M.size > 0) {
        let R = 0, I = 0;
        E.forEach((O) => {
          O && R++;
        }), M.forEach((O) => {
          O && I++;
        }), R !== I && (D = !0);
      }
      w.current = M, D && setTimeout(() => {
        S(t);
      }, 150);
    };
    return t.on("transaction", N), () => {
      t.off("transaction", N);
    };
  }, [t, s, S]);
  const k = U(() => {
    S(t);
  }, [t, S]);
  return /* @__PURE__ */ A("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !h?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ p(Yp, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !h?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ p(jp, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(zn, {}),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: h?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ p(Da, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: h?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ p(Ra, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: h?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ p(Aa, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: h?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ p(La, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: h?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ p(mc, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: h?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ p(gc, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => r?.(),
        isActive: h?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ p(Pa, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(zn, {}),
    /* @__PURE__ */ A(js, { children: [
      /* @__PURE__ */ p(Vs, { asChild: !0, children: /* @__PURE__ */ A(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${h?.isH1 || h?.isH2 || h?.isH3 || h?.isH4 || h?.isH5 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ p("span", { className: "min-w-[18px] text-center", children: h?.isH1 ? "H1" : h?.isH2 ? "H2" : h?.isH3 ? "H3" : h?.isH4 ? "H4" : h?.isH5 ? "H5" : "P" }),
            /* @__PURE__ */ p(en, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(Ks, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !h?.isH1 && !h?.isH2 && !h?.isH3 && !h?.isH4 && !h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ p("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: h?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ p("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ p("span", { className: "font-semibold", children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: h?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ p("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ p("span", { className: "font-semibold", children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: h?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ p("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ p("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: h?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ p("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ p("span", { className: "font-semibold", children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ p("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }),
              /* @__PURE__ */ p("span", { className: "font-semibold", children: "Heading 5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ p(zn, {}),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: h?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ p(Oa, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: h?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ p($a, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: h?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ p(_a, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: h?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ p(Ia, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: h?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ p(kc, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ p(Vp, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ p(Kp, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(zn, {}),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ p(ta, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: m,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ p(Ba, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ p(xc, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(js, { children: [
      /* @__PURE__ */ p(Vs, { asChild: !0, children: /* @__PURE__ */ p(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ p(Mo, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ A(Ks, { align: "start", children: [
        /* @__PURE__ */ A(Le, { onClick: () => v("info"), children: [
          /* @__PURE__ */ p(Mo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ A(Le, { onClick: () => v("note"), children: [
          /* @__PURE__ */ p(za, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ A(Le, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ p(qp, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ A(Le, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ p(Gp, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ A(Le, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ p(Ha, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ A(js, { children: [
      /* @__PURE__ */ p(Vs, { asChild: !0, children: /* @__PURE__ */ A(
        Jt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ p(ta, { size: 16 }),
            /* @__PURE__ */ p("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(Ks, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ p(Fi, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ p(Fi, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ p(Fn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ p(qs, {}),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ p(Ui, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ p(Ui, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ p(Fn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ p(qs, {}),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ p(Yi, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ p(Yi, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ p(qs, {}),
        /* @__PURE__ */ A(
          Le,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ p(Fn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ p(
      Cu,
      {
        isOpen: u,
        onClose: () => c(!1),
        onInsert: g,
        position: d
      }
    ),
    /* @__PURE__ */ p(zn, {}),
    /* @__PURE__ */ p(
      Pe,
      {
        onClick: k,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ p(Xp, { size: 16 })
      }
    ),
    a && /* @__PURE__ */ A(He, { children: [
      /* @__PURE__ */ p(zn, {}),
      /* @__PURE__ */ A(va, { children: [
        /* @__PURE__ */ p(wa, { asChild: !0, children: /* @__PURE__ */ p(
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
            children: /* @__PURE__ */ p(Yo, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ p(ka, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ A(va, { children: [
      /* @__PURE__ */ p(wa, { asChild: !0, children: /* @__PURE__ */ A(
        Jt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ p(or, { size: 16 }),
            /* @__PURE__ */ p("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ p(ka, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function J0({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: l }) {
  const u = s === "markdown", [c, d] = V(""), [f, h] = V(""), [m, g] = V(!1), [y, v] = V(!1), [b, w] = V(!1), [S, k] = V(!1), [C, N] = V([]), [x, M] = V(0), [E, D] = V(null), [R, I] = V(!1), O = q(!1), H = q(null), W = q(null), G = q(!1);
  J(() => {
    t && o && o.trim() && d(o);
  }, [t, o, r]);
  const P = U(() => {
    if (!c || !e) {
      N([]), M(0), D(null);
      return;
    }
    const _ = [];
    let B;
    try {
      if (y)
        B = new RegExp(c, m ? "g" : "gi");
      else {
        let j = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        b && (j = `\\b${j}\\b`), B = new RegExp(j, m ? "g" : "gi");
      }
      D(null);
    } catch (j) {
      D(j.message), N([]);
      return;
    }
    if (u) {
      let j;
      for (; (j = B.exec(a)) !== null; )
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
          for (; (be = B.exec(ee.text)) !== null; )
            _.push({
              from: ge + be.index,
              to: ge + be.index + be[0].length,
              text: be[0]
            });
        }
        return !0;
      });
    }
    N(_), _.length > 0 && x >= _.length && M(0);
  }, [c, m, y, b, e, x, u, a]);
  J(() => {
    P();
  }, [P]), J(() => {
    u && l && (t && C.length > 0 ? l(C, x) : l([], 0));
  }, [u, t, C, x, l]), J(() => {
    if (!e) return;
    if (u) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const _ = typeof e.commands.setSearchHighlight == "function";
    t && c && _ ? e.commands.setSearchHighlight({
      searchTerm: c,
      caseSensitive: m,
      useRegex: y,
      currentMatchIndex: x
    }) : _ && e.commands.clearSearchHighlight();
  }, [e, t, c, m, y, x, u, C, a]), J(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), I(!1)), O.current = !1);
  }, [t, e, l]), J(() => {
    if (C.length > 0 && x < C.length) {
      const _ = C[x];
      if (u) {
        const j = document.querySelector(".syntax-textarea");
        if (j && G.current) {
          const ee = parseInt(getComputedStyle(j).lineHeight) || 22, be = a.substring(0, _.from).split(`
`).length;
          j.scrollTop = Math.max(0, (be - 3) * ee);
        }
        G.current && (G.current = !1);
        return;
      }
      const B = e.view.domAtPos(_.from);
      B.node && B.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), G.current && (G.current = !1);
    }
  }, [x, C, e, u, a]), J(() => {
    t && H.current && (H.current.focus(), H.current.select());
  }, [t, r]);
  const L = U(() => {
    C.length !== 0 && (G.current = !0, M((_) => (_ + 1) % C.length));
  }, [C.length]), F = U(() => {
    C.length !== 0 && (G.current = !0, M((_) => (_ - 1 + C.length) % C.length));
  }, [C.length]), X = U(() => {
    if (C.length === 0 || x >= C.length) return;
    const _ = C[x];
    if (u && i) {
      const B = a.substring(0, _.from) + f + a.substring(_.to);
      i(B), setTimeout(P, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: _.from, to: _.to }).deleteSelection().insertContent(f).run(), setTimeout(P, 10);
  }, [C, x, f, e, P, u, a, i]), K = U(() => {
    if (C.length === 0) return;
    if (u && i) {
      const B = [...C].sort((ee, ge) => ge.from - ee.from);
      let j = a;
      B.forEach((ee) => {
        j = j.substring(0, ee.from) + f + j.substring(ee.to);
      }), i(j), setTimeout(P, 10);
      return;
    }
    const _ = [...C].sort((B, j) => j.from - B.from);
    e.chain().focus(), _.forEach((B) => {
      e.chain().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(P, 10);
  }, [C, f, e, P, u, a, i]), Z = U(() => {
    if (C.length === 0 || !c || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: c,
      caseSensitive: m,
      useRegex: y,
      wholeWord: b
    }) && (I(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [C, c, m, y, b, e, n]), te = U((_) => {
    _.key === "Enter" ? (_.preventDefault(), _.shiftKey ? F() : L(), H.current?.focus()) : _.key === "Escape" ? (_.preventDefault(), n()) : _.key === "h" && (_.ctrlKey || _.metaKey) ? (_.preventDefault(), k((B) => !B)) : _.key === "l" && (_.ctrlKey || _.metaKey) && _.shiftKey && (_.preventDefault(), Z());
  }, [L, F, n, Z]);
  return t ? /* @__PURE__ */ A(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: te,
      children: [
        /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ p(Zp, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: H,
                type: "text",
                placeholder: "Find...",
                value: c,
                onChange: (_) => d(_.target.value),
                className: `find-replace-input ${E ? "has-error" : ""}`
              }
            ),
            E && /* @__PURE__ */ p("span", { className: "find-replace-error", title: E, children: "!" })
          ] }),
          /* @__PURE__ */ p("span", { className: "find-replace-count", children: C.length > 0 ? `${x + 1} of ${C.length}` : c ? "No results" : "" }),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: F,
              disabled: C.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ p(Qp, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: L,
              disabled: C.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ p(en, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: Z,
              disabled: C.length === 0,
              className: `find-replace-btn ${R ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${C.length} matches`,
              children: /* @__PURE__ */ p(Jp, { size: 16 })
            }
          ),
          /* @__PURE__ */ p("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => g((_) => !_),
              className: `find-replace-btn ${m ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ p(eh, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => w((_) => !_),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ p(th, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => v((_) => !_),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ p(nh, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => k((_) => !_),
              className: `find-replace-btn ${S ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ p(na, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ p(_t, { size: 16 })
            }
          )
        ] }),
        S && /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ p(na, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: W,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (_) => h(_.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ p(
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
              onClick: K,
              disabled: C.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ p(rh, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const e1 = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), Lt = e1 ? "⌘" : "Ctrl", t1 = ({ editor: e }) => {
  const [t, n] = V(!1), [r, o] = V(0), [s, a] = V(0), [i, l] = V(""), [u, c] = V(""), [d, f] = V(!1), [h, m] = V(!1);
  J(() => {
    if (!e) return;
    const N = () => {
      const M = e.storage.selectAllOccurrences;
      M ? (n(M.isActive), o(M.ranges.length), a(M.allMatches.length), l(M.searchTerm), c(M.typedBuffer), f(M.isTypingReplace), m(M.isIncremental)) : (n(!1), o(0), a(0));
    }, x = () => {
      N();
    };
    return e.on("transaction", x), N(), () => {
      e.off("transaction", x);
    };
  }, [e]);
  const g = U(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = U(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), v = U(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), b = U(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), w = U(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), S = U(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), k = U(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), C = U(() => {
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
        /* @__PURE__ */ p("span", { className: "select-all-action-bar-count-number", children: h && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ p("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ p("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ A(He, { children: [
        /* @__PURE__ */ p(jo, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ p("span", { className: "select-all-action-bar-preview-old", children: i }),
        /* @__PURE__ */ p("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ p("span", { className: "select-all-action-bar-preview-new", children: u || "∅" })
      ] }) : /* @__PURE__ */ p(He, { children: /* @__PURE__ */ A("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        i,
        '"'
      ] }) }) }),
      /* @__PURE__ */ p("div", { className: "select-all-action-bar-separator" }),
      h && r < s && /* @__PURE__ */ A(He, { children: [
        /* @__PURE__ */ p(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${Lt}+D)`,
            children: /* @__PURE__ */ p(Fa, { size: 14 })
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            onClick: C,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${Lt}+Shift+L)`,
            children: "All"
          }
        ),
        /* @__PURE__ */ p("div", { className: "select-all-action-bar-separator" })
      ] }),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${Lt}+B)`,
          children: /* @__PURE__ */ p(Da, { size: 14 })
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${Lt}+I)`,
          children: /* @__PURE__ */ p(Ra, { size: 14 })
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${Lt}+U)`,
          children: /* @__PURE__ */ p(Aa, { size: 14 })
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ p(La, { size: 14 })
        }
      ),
      /* @__PURE__ */ p("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ p(Fn, { size: 14 })
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: S,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ p(_t, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "select-all-action-bar-hint", children: h && r < s ? /* @__PURE__ */ A(He, { children: [
      /* @__PURE__ */ A("kbd", { children: [
        Lt,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ A("kbd", { children: [
        Lt,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ p("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ A("kbd", { children: [
        Lt,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ A(He, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ p("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ p("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ A("kbd", { children: [
        Lt,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, n1 = nr(t1), go = "-dismissed";
function r1(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function o1(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: a
  } = t, [i, l] = V({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), u = q(null), c = q(""), d = q(0);
  J(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const v = localStorage.getItem(n), b = localStorage.getItem(n + go);
        if (v && !b) {
          let w = "";
          try {
            w = e.getHTML() || "";
          } catch {
            return;
          }
          v !== w && v.length > 50 && l((S) => ({ ...S, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, o]);
  const f = U(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const v = e.getHTML(), b = r1(v);
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
  J(() => {
    if (!e || !o || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", v), () => {
      e.off("update", v), u.current && clearTimeout(u.current);
    };
  }, [e, r, o, f]), J(() => {
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
  const h = U(() => {
    u.current && clearTimeout(u.current), f();
  }, [f]), m = U(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + go), c.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (v) {
      console.warn("useAutoSave: Error clearing content", v);
    }
  }, [n]), g = U(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const v = localStorage.getItem(n);
      return v && e && !e.isDestroyed ? (l((b) => ({ ...b, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), c.current = v, localStorage.removeItem(n + go), a?.(v);
          } catch (b) {
            console.warn("useAutoSave: Error setting content during recovery", b);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, a]), y = U(() => {
    try {
      localStorage.setItem(n + go, "true"), l((v) => ({ ...v, hasRecoverableContent: !1 }));
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
const s1 = 200;
function a1(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: r = !1,
    enabled: o = !0
  } = t, [s, a] = V({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), i = q(null), l = q(""), u = U((c) => {
    const d = c.trim(), f = d.length > 0 ? d.split(/\s+/).filter((b) => b.length > 0).length : 0, h = d.replace(/\s/g, "").length, m = c.length;
    let g = 0, y = 0;
    r && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((b) => b.trim().length > 0).length : 0, y = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / s1));
    return {
      words: f,
      characters: h,
      charactersWithSpaces: m,
      paragraphs: g,
      sentences: y,
      readingTime: v,
      isCalculating: !1
    };
  }, [r]);
  return J(() => {
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
          const f = u(d);
          a(f);
        } catch (d) {
          console.warn("useWordCount: Error calculating word count", d), a((f) => ({ ...f, isCalculating: !1 }));
        }
      }, n);
    };
    return c(), e.on("update", c), () => {
      e.off("update", c), i.current && clearTimeout(i.current);
    };
  }, [e, n, o, u]), s;
}
function i1({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ p(oh, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ A("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ p(Cc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ p("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ p(rr, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ p("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ A(He, { children: [
          /* @__PURE__ */ p(sh, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ p("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function l1({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ A(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ p(ah, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ p("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ p(Ua, { className: "w-4 h-4" }),
                "Recover"
              ]
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: t,
              className: "recovery-banner-dismiss p-2 rounded-md transition-colors duration-150",
              title: "Dismiss",
              "aria-label": "Dismiss recovery banner",
              children: /* @__PURE__ */ p(_t, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
const c1 = /\[\[([^\[\]]+)\]\]$/, u1 = fc.create({
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
      tr(
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
      new Je({
        find: c1,
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
}, d1 = ["info", "note", "prompt", "resources", "todo"];
function f1(e) {
  return e.length < 3 ? !1 : !!(Pt.header.test(e) || Pt.bold.test(e) || Pt.list.test(e) || Pt.taskList.test(e) || Pt.codeBlock.test(e) || Pt.callout.test(e) || Pt.highlight.test(e) || Pt.link.test(e) || Pt.table.test(e));
}
function p1(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function h1(e, t) {
  const { alt: n, align: r, width: o } = p1(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", a = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${a} /></figure>`;
}
function Io(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Ul(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${Io(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const a = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    a ? o.push(h1(a[1], a[2])) : o.push(`<p>${Io(s.trim())}</p>`);
  }
  return o.join("");
}
function sf(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const a = o.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: r, text: a[1].trim() };
  const i = o.match(/^\d+\.\s+(.+)$/);
  return i ? { type: "ol", depth: r, text: i[1].trim() } : null;
}
function af(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let a = "", i = o;
    const l = e[i]?.type || "ul", u = l === "task", c = u ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = u ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += c; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (u ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${Io(f.text)}</p>` : a += `<li><p>${Io(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
          const h = t(i + 1, e[i + 1].depth);
          a += h.html, i = h.nextIdx;
        } else
          i++;
        a += "</li>";
      } else
        i++;
    }
    return a += d, { html: a, nextIdx: i };
  }, n = Math.min(...e.map((o) => o.depth));
  return t(0, n).html;
}
function Yl(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return Ul(e);
  const r = e.split(/<br\s*\/?>/i).filter((i) => i.trim()), o = [];
  let s = [];
  const a = () => {
    s.length !== 0 && (o.push(af(s)), s = []);
  };
  for (const i of r) {
    const l = sf(i);
    if (l) {
      if (s.length > 0) {
        const u = s[0].type;
        l.depth === 0 && l.type !== u && a();
      }
      s.push(l);
    } else
      a(), o.push(Ul(i.trim()));
  }
  return a(), o.join("");
}
function m1(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((i) => i.trim()).filter((i) => i.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let a = "<table><thead><tr>";
  for (const i of r)
    a += "<th>" + Yl(i) + "</th>";
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
        a += "<td>" + Yl(d) + "</td>";
      }
      a += "</tr>";
    }
  }
  return a += "</tbody></table>", a;
}
function g1(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const h = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(h) && h.includes("-")) {
        const m = m1(d);
        if (m) {
          const g = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(m), g;
        }
      }
    }
    return d;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (d, f, h) => {
    let m = h.trim();
    m = m.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), m = m.replace(/__([^_]+)__/g, "<strong>$1</strong>"), m = m.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), m = m.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), m = m.replace(/`([^`]+)`/g, "<code>$1</code>");
    const g = "info";
    m.startsWith("<") || (m = `<p>${m}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${m}</div>`), y;
  }), d1.forEach((d) => {
    const f = new RegExp(`\`\`\`${d}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (h, m) => {
      let g = m.trim();
      g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>"), g.startsWith("<") || (g = `<p>${g}</p>`);
      const y = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${d}" class="callout callout-${d}">${g}</div>`), y;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (d, f, h) => {
    const m = f || "plaintext", g = h.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${m}">${g}</code></pre>`), y;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), a = [];
  let i = [];
  const l = () => {
    i.length !== 0 && (a.push(af(i)), i = []);
  };
  for (const d of s) {
    const f = sf(d);
    if (f) {
      if (i.length > 0) {
        const m = i[0].type, g = Math.min(...i.map((y) => y.depth));
        f.depth === g && f.type !== m && l();
      }
      i.push(f);
      continue;
    }
    l();
    let h = d;
    h = h.replace(/^(#{1,6})\s+(.+)$/, (m, g, y) => {
      const v = g.length;
      return `<h${v}>${y}</h${v}>`;
    }), h = h.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), h = h.replace(/^[-*_]{3,}$/, "<hr>"), a.push(h);
  }
  l(), t = a.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, f, h) => {
    const m = f.split("|").map((w) => w.trim());
    let g = "", y = "left", v = null;
    m.length === 1 ? g = m[0] : m.length === 2 ? (g = m[0], /^\d+$/.test(m[1]) ? v = m[1] : ["left", "center", "right"].includes(m[1]) ? y = m[1] : g = f) : m.length === 3 ? (g = m[0], ["left", "center", "right"].includes(m[1]) && (y = m[1]), /^\d+$/.test(m[2]) && (v = m[2])) : g = f;
    const b = v ? ` width="${v}" style="width: ${v}px"` : "";
    return `<img src="${h.trim()}" alt="${g}" data-align="${y}"${b}>`;
  }), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((d) => {
    const f = d.trim();
    return f ? /^<[a-z]/.test(f) || /^<\//.test(f) || f.startsWith("MANUSTABLEPLACEHOLDER") || f.startsWith("MANUSCODEPLACEHOLDER") ? d : `<p>${f}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let d = 0; d < r.length; d++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${d}END`, r[d]);
  for (let d = 0; d < o.length; d++)
    t = t.replace(`MANUSCODEPLACEHOLDER${d}END`, o[d]);
  return t;
}
const y1 = mt.create({
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
      new Ve({
        key: new Ke("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const a = o.getData("text/plain");
            if (!a || !f1(a))
              return !1;
            n.preventDefault();
            const i = g1(a);
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
}), jl = new Ke("collapsibleHeading");
function b1(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function Oo(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const a = o.attrs.level, i = o.textContent.slice(0, 50), l = `h${a}-${i}`, u = r.get(l) ?? 0;
      r.set(l, u + 1), n.set(s, b1(a, i, u));
    }
  }), n;
}
let Gn = null;
function Gs(e, t, n) {
  const r = [], o = Oo(e, n.levels), s = [];
  e.descendants((u, c) => {
    if (u.type.name === "heading" && n.levels.includes(u.attrs.level)) {
      const d = o.get(c) ?? "";
      s.push({
        pos: c,
        level: u.attrs.level,
        id: d,
        isCollapsed: t.collapsedHeadings.has(d),
        nodeSize: u.nodeSize
      });
    }
  });
  const a = [];
  for (let u = 0; u < s.length; u++) {
    const c = s[u];
    if (c.isCollapsed) {
      const d = c.pos + c.nodeSize;
      let f = e.content.size;
      for (let h = u + 1; h < s.length; h++)
        if (s[h].level <= c.level) {
          f = s[h].pos;
          break;
        }
      d < f && a.push({ start: d, end: f });
    }
  }
  const i = [];
  for (const u of a)
    if (i.length === 0)
      i.push(u);
    else {
      const c = i[i.length - 1];
      u.start <= c.end ? c.end = Math.max(c.end, u.end) : i.push(u);
    }
  function l(u) {
    for (const c of i)
      if (u >= c.start && u < c.end) return !0;
    return !1;
  }
  return e.descendants((u, c) => {
    if (u.type.name === "heading" && n.levels.includes(u.attrs.level)) {
      const d = o.get(c) ?? "", f = t.collapsedHeadings.has(d), h = l(c);
      r.push(
        it.node(c, c + u.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${u.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${h ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(u.attrs.level)
        })
      );
      const m = it.widget(c + u.nodeSize - 1, () => {
        const g = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (g) {
          g.classList.contains("collapsed") !== f && (g.classList.remove("collapsed", "expanded"), g.classList.add(f ? "collapsed" : "expanded"), g.title = f ? "Click to expand" : "Click to collapse");
          const w = g.parentElement;
          if (w) return w;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", d), v.setAttribute("data-heading-level", String(u.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = f ? "Click to expand" : "Click to collapse", v.addEventListener("click", (b) => {
          b.preventDefault(), b.stopPropagation();
          const w = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(w ? "expanded" : "collapsed"), v.title = w ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), Gn && Gn.dispatch(Gn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), y.appendChild(v), y;
      }, { side: 1, key: `chevron-${d}` });
      r.push(m);
    } else u.isBlock && l(c) && r.push(
      it.node(c, c + u.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Ze.create(e, r);
}
function v1(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = Oo(t, r), s = new Set(o.values()), a = [];
  n.collapsedHeadings.forEach((i) => {
    s.has(i) || a.push(i);
  });
  for (const i of a)
    n.collapsedHeadings.delete(i);
}
const w1 = mt.create({
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
        const a = Oo(n.doc, this.options.levels).get(e);
        return a ? (r.collapsedHeadings.has(a) ? r.collapsedHeadings.delete(a) : r.collapsedHeadings.add(a), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: a })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return Oo(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ve({
        key: jl,
        view(n) {
          return Gn = n, {
            update(r) {
              Gn = r;
            },
            destroy() {
              Gn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: Gs(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const a = n.getMeta("collapsibleHeading");
            return a || n.docChanged ? (n.docChanged && !a && v1(o.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Gs(s.doc, e, t),
              docVersion: r.docVersion + 1
            }) : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = jl.getState(n);
            return r?.decorations ? r.decorations : Gs(n.doc, e, t);
          }
        }
      })
    ];
  }
}), k1 = /\[([^\]]+)\]\(([^)]+)\)$/, x1 = /^(https?:\/\/|www\.)[^\s]+$/i, C1 = mt.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Je({
        find: k1,
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
      new Ve({
        key: new Ke("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!x1.test(s)) return !1;
            const { state: a } = t, { selection: i } = a, { from: l, to: u, empty: c } = i;
            let d = s;
            if (!d.startsWith("http://") && !d.startsWith("https://") && (d.startsWith("www."), d = "https://" + d), !c && a.doc.textBetween(l, u))
              return e.chain().focus().extendMarkRange("link").setLink({ href: d }).run(), !0;
            const f = a.schema.marks.link.create({ href: d }), h = a.tr;
            return h.insertText(d, l, u), h.addMark(l, l + d.length, f), t.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), S1 = ["info", "note", "prompt", "resources", "todo"], T1 = mt.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ve({
        key: new Ke("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: a } = o, i = a.start();
            a.end();
            const l = s.textBetween(i, a.pos, ""), u = l.trim();
            for (const c of S1)
              if (u === `\`\`\`${c}`) {
                n.preventDefault();
                const d = r.tr, f = i + l.indexOf("```");
                d.delete(f, a.pos);
                const h = e.schema.nodes.callout, m = e.schema.nodes.paragraph;
                if (h && m) {
                  const g = m.create(), y = h.create({ type: c }, Sh.from(g));
                  d.insert(f, y);
                  const v = d.doc.resolve(f + 2);
                  d.setSelection(vn.near(v)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), yo = new Ke("searchHighlight"), M1 = mt.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(yo, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(yo, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ve({
        key: yo,
        state: {
          init() {
            return Ze.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: l } = e, u = t.getMeta(yo), c = t.docChanged;
            if (!s)
              return Ze.empty;
            if (!c && !u)
              return n.map(t.mapping, o.doc);
            const d = [];
            let f = 0;
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
                    const v = g + y.index, b = g + y.index + y[0].length, w = f === l;
                    d.push(
                      it.inline(v, b, {
                        class: w ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
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
}), E1 = new Ke("tabIndent");
function N1(e) {
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
const D1 = mt.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Ve({
        key: E1,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = N1(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!ji(s)(n, r)) {
                const l = o === "taskItem" ? "listItem" : "taskItem", u = n.schema.nodes[l];
                u && ji(u)(n, r);
              }
            } else if (!Vi(s)(n, r)) {
              const l = o === "taskItem" ? "listItem" : "taskItem", u = n.schema.nodes[l];
              u && Vi(u)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), R1 = new Ke("expandSelection");
function Xs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const A1 = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), L1 = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), P1 = "tableRow", I1 = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function O1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function $1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (I1.has(s.type.name)) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function _1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === P1) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function H1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (L1.has(s.type.name)) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function z1(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let i = r.depth; i >= 1; i--) {
    const l = r.node(i);
    A1.has(l.type.name) && (o = i);
  }
  if (o === -1) return null;
  const s = r.start(o), a = r.end(o);
  return s < t || a > n ? { from: s, to: a } : null;
}
function B1(e) {
  const t = [];
  if (e.forEach((r, o) => {
    r.type.name === "heading" && t.push({ level: r.attrs.level, from: o });
  }), t.length === 0) return [];
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    let s = e.content.size;
    for (let a = r + 1; a < t.length; a++)
      if (t[a].level <= o.level) {
        s = t[a].from;
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
function W1(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function F1(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function U1(e, t, n) {
  const r = [];
  let o = t, s = n;
  const a = (l) => l && (l.from < o || l.to > s) ? (r.push(l), o = l.from, s = l.to, !0) : !1;
  a(O1(e, o, s)), F1(e, t) && (a($1(e, o, s)), a(_1(e, o, s))), a(z1(e, o, s)), a(H1(e, o, s));
  const i = B1(e);
  if (i.length > 0) {
    const l = W1(i, o, s);
    for (const u of l)
      a({ from: u.from, to: u.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const Y1 = mt.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof mp || o === 0 && s === n.content.size)
          return !0;
        const i = U1(n, o, s);
        let l = null;
        for (const u of i)
          if (u.from < o || u.to > s) {
            l = u;
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
      new Ve({
        key: R1,
        props: {
          handleClick() {
            return Xs(e), !1;
          },
          handleTextInput() {
            return Xs(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && Xs(e), !1;
          }
        }
      })
    ];
  }
}), j1 = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function V1(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (i) => i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const K1 = new Ke("hexColorDecoration"), q1 = fc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Ve({
        key: K1,
        state: {
          init(e, { doc: t }) {
            return Vl(t);
          },
          apply(e, t) {
            return e.docChanged ? Vl(e.doc) : t;
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
});
function Vl(e) {
  const t = [];
  return e.descendants((n, r) => {
    if (!n.isText) return;
    const o = n.text || "";
    let s;
    const a = new RegExp(j1.source, "g");
    for (; (s = a.exec(o)) !== null; ) {
      const i = r + s.index, l = i + s[0].length, u = s[0], c = V1(u);
      t.push(
        it.inline(i, l, {
          class: "hex-color-swatch",
          style: `background-color: ${u}; color: ${c ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
        })
      );
    }
  }), Ze.create(e, t);
}
const We = new Ke("selectAllOccurrences");
function Kl(e, t, n, r, o) {
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
function Zt(e, t) {
  const n = We.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function G1(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function _e(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const X1 = mt.create({
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
        const l = Kl(t.state.doc, o, s, a, i);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = a, this.storage.wholeWord = i, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(We, { activate: !0 })), !0);
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
            const d = o.doc.resolve(s), f = d.parent;
            if (f.isTextblock) {
              const h = f.textContent, m = d.parentOffset;
              let g = m, y = m;
              for (; g > 0 && /\w/.test(h[g - 1]); ) g--;
              for (; y < h.length && /\w/.test(h[y]); ) y++;
              g < y && (i = h.slice(g, y));
            }
          }
          if (!i) return !1;
          const l = Kl(o.doc, i, !1, !1, !1);
          if (l.length === 0) return !1;
          const u = G1(l, s), c = l[u];
          return r.isActive = !0, r.ranges = [c], r.searchTerm = i, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = i.length, r.allMatches = l, r.nextMatchIndex = (u + 1) % l.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(We, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(We, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (_e(this.storage), t && t(e.setMeta(We, { deactivate: !0 })), !0),
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
              const l = Zt(i, this.storage);
              this.storage.ranges = l, l.length === 0 && _e(this.storage);
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
        return _e(this.storage), !0;
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
              const s = Zt(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && _e(this.storage);
            }
          } catch {
          }
        }, 10) : _e(this.storage), !0;
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
      new Ve({
        key: We,
        state: {
          init() {
            return Ze.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(We);
            if (s?.deactivate || !e.isActive)
              return Ze.empty;
            if (s?.activate || s?.refresh) {
              const a = [];
              for (const i of e.ranges) {
                a.push(
                  it.inline(i.from, i.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), a.push(
                  it.widget(i.to, l, {
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
              _e(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(We, { deactivate: !0 }));
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
              _e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(We, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), Th(t.state, t.dispatch), setTimeout(() => {
                  const s = Zt(t);
                  e.ranges = s, s.length === 0 && _e(e);
                }, 10), !0;
              }
              _e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(We, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, Mh(t.state, t.dispatch), setTimeout(() => {
                  const s = Zt(t);
                  e.ranges = s, s.length === 0 && _e(e);
                }, 10), !0;
              }
              _e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(We, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Zt(t);
                if (r.length === 0) {
                  _e(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(We, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((i, l) => l.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(o));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = Zt(t);
                  e.ranges = i, i.length === 0 && _e(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((a, i) => i.from - a.from), { tr: o } = t.state;
                for (const a of r)
                  o.delete(a.from, a.to);
                t.dispatch(o), _e(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(We, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((a, i) => i.from - a.from), { tr: o } = t.state;
              for (const a of r)
                o.delete(a.from, a.to);
              t.dispatch(o), _e(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(We, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              _e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(We, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              _e(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(We, { deactivate: !0 })), !1;
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
            const s = Zt(t);
            if (s.length === 0) {
              _e(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(We, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const a = [...s].sort((l, u) => u.from - l.from), { tr: i } = t.state;
            for (const l of a)
              i.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const l = Zt(t);
              e.ranges = l, l.length === 0 && _e(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function bo(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), a = r.schema.nodes.horizontalRule.create(), i = s.before(s.depth), l = s.after(s.depth);
  o.replaceWith(i, l, a);
  const u = i + a.nodeSize;
  if (u < o.doc.content.size) {
    const c = o.doc.resolve(u);
    c.nodeAfter && c.nodeAfter.isTextblock ? o.setSelection(vn.create(o.doc, u + 1)) : c.nodeAfter && o.setSelection(vn.near(o.doc.resolve(u)));
  } else {
    const d = r.schema.nodes.paragraph.create();
    o.insert(u, d), o.setSelection(vn.create(o.doc, u + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function Z1() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Q1(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function J1(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", a = atob(r), i = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    i[l] = a.charCodeAt(l);
  return new File([i], t, { type: s });
}
function eC(e, t) {
  return t.includes(e.type);
}
function tC(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function nC(e, t, n) {
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
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", h = d ? void 0 : n, m = u.toDataURL(f, h), g = J1(m, e.name);
      r({ dataUrl: m, file: g, width: i, height: l });
    }, s.onerror = () => o(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function rC(e, t, n) {
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
async function ql(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!eC(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = Z1();
  try {
    n.onUploadStart?.();
    let o, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const d = await nC(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = d.dataUrl, a = d.file, s = Math.min(d.width, 600);
    } else {
      o = await Q1(e), a = e;
      const d = await tC(o);
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
        const f = d instanceof HTMLElement ? d : d.dom;
        f && f.classList.add("image-uploading");
      }
    }
    try {
      const d = await n.onImageUpload(a, {
        fileName: e.name,
        mimeType: a.type,
        fileSize: a.size,
        uploadId: r
      });
      let f = !1;
      return t.view.state.doc.descendants((h, m) => {
        if (f) return !1;
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
          return f = !0, !1;
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
      return console.warn("Image upload failed, removing placeholder:", d), rC(t, o, e.name), n.onUploadError?.(`Upload failed: ${d instanceof Error ? d.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function Gl(e) {
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
const oC = mt.create({
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
      new Ve({
        key: new Ke("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = Gl(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((a) => {
              ql(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const a = r.dataTransfer;
            if (!a) return !1;
            const i = Gl(a);
            if (i.length === 0)
              return !1;
            r.preventDefault();
            const l = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (l) {
              const u = n.state.tr.setSelection(
                vn.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(u);
            }
            return i.forEach((u) => {
              ql(u, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function sC({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = V(!1), [o, s] = V(0), a = U((c) => {
    c.preventDefault(), c.stopPropagation(), c.dataTransfer?.types.includes("Files") && (s((d) => d + 1), r(!0));
  }, []), i = U((c) => {
    c.preventDefault(), c.stopPropagation(), s((d) => {
      const f = d - 1;
      return f === 0 && r(!1), f;
    });
  }, []), l = U((c) => {
    c.preventDefault(), c.stopPropagation();
  }, []), u = U((c) => {
    c.preventDefault(), c.stopPropagation(), r(!1), s(0);
  }, []);
  return J(() => {
    if (!t || !e.current) return;
    const c = e.current;
    return c.addEventListener("dragenter", a), c.addEventListener("dragleave", i), c.addEventListener("dragover", l), c.addEventListener("drop", u), () => {
      c.removeEventListener("dragenter", a), c.removeEventListener("dragleave", i), c.removeEventListener("dragover", l), c.removeEventListener("drop", u);
    };
  }, [t, e, a, i, l, u]), n ? /* @__PURE__ */ p("div", { className: "image-drop-zone", children: /* @__PURE__ */ A("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ p("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ p(ih, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ A("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ p("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ p("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function aC({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [a, i] = V(e), [l, u] = V(t), c = q(null), d = q(null);
  J(() => {
    d.current?.focus(), d.current?.select();
  }, []), J(() => {
    const y = (b) => {
      c.current && !c.current.contains(b.target) && s();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [s]), J(() => {
    const y = (v) => {
      v.key === "Escape" ? s() : v.key === "Enter" && (v.metaKey || v.ctrlKey) && f();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [a, l, s]);
  const f = () => {
    a.trim() && r(a.trim(), l.trim());
  }, m = (() => {
    let w = n.x - 160, S = n.y + 10;
    return w + 320 > window.innerWidth - 16 && (w = window.innerWidth - 320 - 16), w < 16 && (w = 16), S + 280 > window.innerHeight - 16 && (S = n.y - 280 - 10), S < 16 && (S = 16), { left: w, top: S };
  })(), g = /* @__PURE__ */ A(
    "div",
    {
      ref: c,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: m.left,
        top: m.top
      },
      children: [
        /* @__PURE__ */ A("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ p("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ p(_t, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ A("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ A("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ p(Pa, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ p("span", { children: "Image URL" })
            ] }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: d,
                type: "text",
                value: a,
                onChange: (y) => i(y.target.value),
                placeholder: "https://example.com/image.jpg",
                className: "image-edit-popover-input"
              }
            )
          ] }),
          /* @__PURE__ */ A("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ A("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ p(jo, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ p("span", { children: "Alt Text" })
            ] }),
            /* @__PURE__ */ p(
              "input",
              {
                type: "text",
                value: l,
                onChange: (y) => u(y.target.value),
                placeholder: "Describe the image...",
                className: "image-edit-popover-input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ p(Fn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ A("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ p(
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
                disabled: !a.trim(),
                children: [
                  /* @__PURE__ */ p(rr, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ p(Wt, { children: g });
}
function vo(e) {
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
function Xl(e) {
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
function bn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function wo(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return bn(e);
  let o = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const u = s[l], c = a + u.length, d = t.filter((h) => h.start >= a && h.start < c);
      let f = a;
      for (const h of d)
        h.start > f && (o += bn(e.substring(f, h.start))), o += `<span class="${Xl(h.type)}">${bn(h.content)}</span>`, f = h.end;
      f < c && (o += bn(e.substring(f, c))), l < s.length - 1 && (o += `
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
    let f = a;
    for (const h of d)
      h.start > f && (o += Zs(e, f, h.start, null, i)), o += Zs(e, h.start, h.end, Xl(h.type), i), f = h.end;
    f < c && (o += Zs(e, f, c, null, i)), l < s.length - 1 && (o += `
`), a = c + 1;
  }
  return o;
}
function Zs(e, t, n, r, o) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = o.get(a);
    if (i) {
      const l = a;
      for (; a < n && o.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const u = bn(e.substring(l, a)), c = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${c}">${u}</mark></span>` : s += `<mark class="${c}">${u}</mark>`;
    } else {
      const l = a;
      for (; a < n && !o.has(a); )
        a++;
      const u = bn(e.substring(l, a));
      r ? s += `<span class="${r}">${u}</span>` : s += u;
    }
  }
  return s;
}
function iC({
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
  const u = q(null), c = q(null), d = q(null), f = q(null), h = 5e3, m = 80, [g, y] = V(() => {
    const x = vo(e);
    return wo(e, x, a, i);
  }), v = q(null), b = wn(() => {
    if (e.length <= h) {
      const x = vo(e), M = wo(e, x, a, i);
      return v.current && (clearTimeout(v.current), v.current = null), M;
    }
    return null;
  }, [e, a, i]);
  J(() => {
    if (e.length <= h) {
      const x = vo(e);
      y(wo(e, x, a, i));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const x = vo(e);
      y(wo(e, x, a, i)), v.current = null;
    }, m), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, a, i]);
  const w = b ?? g, S = U(() => {
    const x = u.current, M = c.current, E = d.current;
    if (x) {
      const D = E?.parentElement, R = D ? D.clientHeight : 200;
      x.style.height = "auto";
      const I = Math.max(x.scrollHeight, R, 200);
      x.style.height = `${I}px`, M && (M.style.height = `${I}px`);
    }
  }, []);
  J(() => {
    const x = u.current;
    if (!x) return;
    const M = (E) => {
      const D = x.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: R, scrollHeight: I, clientHeight: O } = D, H = R <= 0, W = R + O >= I - 1;
      (E.deltaY > 0 && !W || E.deltaY < 0 && !H) && (E.preventDefault(), D.scrollTop += E.deltaY);
    };
    return x.addEventListener("wheel", M, { passive: !1 }), () => x.removeEventListener("wheel", M);
  }, []);
  const k = U(() => {
  }, []);
  J(() => {
    S();
  }, [e, S]), J(() => {
    o && u.current && u.current.focus();
  }, [o]), J(() => {
    if (f.current && u.current) {
      const { start: x, end: M } = f.current;
      u.current.selectionStart = x, u.current.selectionEnd = M, f.current = null;
    }
  }, [e]);
  const C = U((x) => {
    const M = x.target;
    f.current = {
      start: M.selectionStart,
      end: M.selectionEnd
    }, t(M.value);
  }, [t]), N = U((x) => {
    const M = x.currentTarget, E = M.selectionStart, D = M.selectionEnd, R = M.value, I = E !== D;
    if (l) {
      if (x.key === "`" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), I) {
          const O = R.substring(E, D), H = R.substring(0, E) + "`" + O + "`" + R.substring(D);
          f.current = { start: E + 1, end: D + 1 }, t(H);
        } else if (R[E] === "`")
          f.current = { start: E + 1, end: E + 1 }, t(R), M.selectionStart = M.selectionEnd = E + 1;
        else {
          const O = R.substring(0, E) + "``" + R.substring(D);
          f.current = { start: E + 1, end: E + 1 }, t(O);
        }
        return;
      }
      if (x.key === "*" && !x.ctrlKey && !x.metaKey) {
        if (R[E - 1] === "*" && R[E], I) {
          x.preventDefault();
          const W = R.substring(E, D), G = R.substring(0, E) + "*" + W + "*" + R.substring(D);
          f.current = { start: E + 1, end: D + 1 }, t(G);
          return;
        }
        if (R[E] === "*") {
          x.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        x.preventDefault();
        const H = R.substring(0, E) + "**" + R.substring(D);
        f.current = { start: E + 1, end: E + 1 }, t(H);
        return;
      }
      if (x.key === "_" && !x.ctrlKey && !x.metaKey) {
        if (I) {
          x.preventDefault();
          const H = R.substring(E, D), W = R.substring(0, E) + "_" + H + "_" + R.substring(D);
          f.current = { start: E + 1, end: D + 1 }, t(W);
          return;
        }
        if (R[E] === "_") {
          x.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        x.preventDefault();
        const O = R.substring(0, E) + "__" + R.substring(D);
        f.current = { start: E + 1, end: E + 1 }, t(O);
        return;
      }
      if (x.key === "~" && !x.ctrlKey && !x.metaKey) {
        if (I) {
          x.preventDefault();
          const H = R.substring(E, D), W = R.substring(0, E) + "~" + H + "~" + R.substring(D);
          f.current = { start: E + 1, end: D + 1 }, t(W);
          return;
        }
        if (R[E] === "~") {
          x.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        x.preventDefault();
        const O = R.substring(0, E) + "~~" + R.substring(D);
        f.current = { start: E + 1, end: E + 1 }, t(O);
        return;
      }
      if (x.key === "[" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), I) {
          const O = R.substring(E, D), H = R.substring(0, E) + "[" + O + "]()" + R.substring(D);
          f.current = { start: D + 3, end: D + 3 }, t(H);
        } else {
          const O = R.substring(0, E) + "[]()" + R.substring(D);
          f.current = { start: E + 1, end: E + 1 }, t(O);
        }
        return;
      }
      if (x.key === "]" && !x.ctrlKey && !x.metaKey && R[E] === "]") {
        x.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
        return;
      }
      if (x.key === ")" && !x.ctrlKey && !x.metaKey && R[E] === ")") {
        x.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
        return;
      }
      if (x.key === "Backspace" && !I && E > 0) {
        const O = R[E - 1], H = R[E], W = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [G, P] of W)
          if (O === G && H === P) {
            x.preventDefault();
            const L = R.substring(0, E - 1) + R.substring(E + 1);
            f.current = { start: E - 1, end: E - 1 }, t(L);
            return;
          }
        if (O === "[" && R.substring(E, E + 3) === "]()") {
          x.preventDefault();
          const G = R.substring(0, E - 1) + R.substring(E + 3);
          f.current = { start: E - 1, end: E - 1 }, t(G);
          return;
        }
      }
    }
    if (x.key === "Tab")
      if (x.preventDefault(), x.shiftKey) {
        const O = R.substring(0, E), H = R.substring(E, D), W = R.substring(D), P = O.lastIndexOf(`
`) + 1, L = O.substring(0, P), F = O.substring(P), X = (F + H).split(`
`), K = X.map((_) => _.startsWith("  ") ? _.substring(2) : _.startsWith("	") ? _.substring(1) : _), Z = L + K.join(`
`) + W, te = (F + H).length - K.join(`
`).length;
        f.current = {
          start: Math.max(P, E - (X[0].length - K[0].length)),
          end: D - te
        }, t(Z);
      } else if (E === D) {
        const O = R.substring(0, E) + "  " + R.substring(D);
        f.current = { start: E + 2, end: E + 2 }, t(O);
      } else {
        const O = R.substring(0, E), H = R.substring(E, D), W = R.substring(D), P = O.lastIndexOf(`
`) + 1, L = O.substring(0, P), X = (O.substring(P) + H).split(`
`), K = X.map((te) => "  " + te), Z = L + K.join(`
`) + W;
        f.current = {
          start: E + 2,
          end: D + X.length * 2
        }, t(Z);
      }
  }, [t, l]);
  return /* @__PURE__ */ A("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ p(
      "div",
      {
        ref: c,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: w || `<span class="md-placeholder">${bn(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ p(
      "textarea",
      {
        ref: u,
        value: e,
        onChange: C,
        onKeyDown: N,
        onScroll: k,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let Zl = 0, xa = 0, lf = 0;
function lC(e) {
  xa++, lf = e;
}
const cC = nr(function({
  visible: t,
  onClose: n,
  editor: r
}) {
  const [o, s] = V(!1), [a, i] = V({
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
  }), l = q([]), u = q(performance.now()), c = q(0), d = q(0), f = q(0), h = q(0), [m, g] = V(new Array(60).fill(0)), [y, v] = V(new Array(60).fill(0));
  J(() => {
    if (!t || !r) return;
    const N = () => {
      const x = performance.now();
      queueMicrotask(() => {
        const M = performance.now() - x;
        lC(M);
      });
    };
    return r.on("transaction", N), () => {
      r.off("transaction", N);
    };
  }, [t, r]), J(() => {
    if (!t) return;
    let N = 0, x = performance.now(), M = 0;
    const E = (D) => {
      const R = D - u.current;
      if (u.current = D, l.current.push({ time: D, duration: R }), l.current.length > 120 && (l.current = l.current.slice(-120)), R > 16.67 && d.current++, N++, D - x >= 1e3) {
        M = N, N = 0, x = D;
        const I = l.current.slice(-60), O = I.length > 0 ? I.reduce((K, Z) => K + Z.duration, 0) / I.length : 0, H = I.length > 0 ? Math.max(...I.map((K) => K.duration)) : 0, W = performance.memory, G = W ? W.usedJSHeapSize / (1024 * 1024) : 0, P = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, F = Zl - f.current, X = xa - h.current;
        f.current = Zl, h.current = xa, i({
          fps: M,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(H * 100) / 100,
          memoryUsed: Math.round(G * 10) / 10,
          memoryTotal: Math.round(P),
          renderCount: F,
          transactionCount: X,
          lastTransactionTime: Math.round(lf * 100) / 100,
          domNodes: L,
          longFrames: d.current
        }), g((K) => [...K.slice(1), M]), v((K) => [...K.slice(1), O]), d.current = 0;
      }
      c.current = requestAnimationFrame(E);
    };
    return c.current = requestAnimationFrame(E), () => {
      cancelAnimationFrame(c.current);
    };
  }, [t]);
  const b = U(() => {
    n?.();
  }, [n]), w = U(() => {
    s((N) => !N);
  }, []);
  if (!t) return null;
  const S = (N) => N >= 55 ? "#4ade80" : N >= 30 ? "#fbbf24" : "#f87171", k = (N) => N <= 16.67 ? "#4ade80" : N <= 33.33 ? "#fbbf24" : "#f87171", C = (N, x, M) => {
    const R = N.map((I, O) => {
      const H = O / (N.length - 1) * 120, W = 24 - Math.min(I, x) / x * 24;
      return `${H},${W}`;
    }).join(" ");
    return /* @__PURE__ */ p("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ p(
      "polyline",
      {
        points: R,
        fill: "none",
        stroke: M,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ A("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ A("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ A("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ p(lh, { size: 14 }),
        /* @__PURE__ */ p("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ p("button", { onClick: w, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ p(Sc, { size: 12 }) : /* @__PURE__ */ p(Tc, { size: 12 }) }),
        /* @__PURE__ */ p("button", { onClick: b, title: "Close profiler", children: /* @__PURE__ */ p(_t, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ A("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ p("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ p("span", { className: "perf-value", style: { color: S(a.fps) }, children: a.fps })
        ] }),
        C(m, 70, S(a.fps))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ p("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ A("span", { className: "perf-value", style: { color: k(a.frameTime) }, children: [
            a.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ p("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", style: { color: k(a.frameTimeMax) }, children: [
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
        C(y, 50, k(a.frameTime))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ p("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ p("span", { className: "perf-value", children: a.renderCount })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ p("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ p("span", { className: "perf-value", children: a.transactionCount })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ p("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", children: [
            a.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ p("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ p("span", { className: "perf-value", children: a.domNodes.toLocaleString() })
        ] }),
        a.memoryTotal > 0 && /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ p("span", { className: "perf-label", children: "Memory" }),
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
class uC extends Np {
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
      return /* @__PURE__ */ p("div", { className: pe("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ A("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ p("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ p(ch, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ A("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ p("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ p("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ A(
            Jt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ p(Ua, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ A(
            Jt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ p(Fn, { className: "w-4 h-4" }),
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
              className: pe(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ p(en, { className: "w-3 h-3" }) : /* @__PURE__ */ p(vc, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ A("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ p("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ p(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ A(He, { children: [
                    /* @__PURE__ */ p(uh, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ p("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ A(He, { children: [
                    /* @__PURE__ */ p(or, { className: "w-3 h-3" }),
                    /* @__PURE__ */ p("span", { children: "Copy" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ p("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }),
            t.stack && /* @__PURE__ */ p("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) })
          ] })
        ] })
      ] }) });
    }
    return this.props.children;
  }
}
function dC({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function fC(e, t) {
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
function pC(e) {
  const [t, n] = Dp(fC, { status: "idle" }), r = q(null), o = U(async (i, l, u, c, d) => {
    if (e) {
      n({
        type: "start-streaming",
        action: i,
        actionLabel: l,
        inputText: u,
        selectionRange: c
      });
      try {
        const f = e(i, u, d);
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
    r.current?.(), n({ type: "reset" });
  }, []), a = U(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: a };
}
const hC = {
  SpellCheck: fh,
  RefreshCw: dh,
  Minimize2: Tc,
  Maximize2: Sc,
  FileText: Wa,
  MessageSquare: Mc,
  Sparkles: Yo
};
function mC({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, a] = V(""), [i, l] = V(!1), u = q(null), c = q(null), d = e.filter((y) => y.scope === t || y.scope === "both");
  J(() => {
    const y = (b) => {
      u.current && !u.current.contains(b.target) && r();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [r]), J(() => {
    const y = (v) => {
      v.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), J(() => {
    i && c.current && c.current.focus();
  }, [i]);
  const h = U(() => {
    const v = d.length * 40 + (i ? 56 : 0) + 16, b = window.innerWidth, w = window.innerHeight;
    let S = o.top, k = o.left;
    return k + 260 > b - 8 && (k = b - 260 - 8), k < 8 && (k = 8), S + v > w - 8 && (S = o.top - v - 8), S < 8 && (S = 8), { top: S, left: k };
  }, [o, d.length, i])(), m = () => {
    s.trim() && (n("custom", s.trim()), a(""), l(!1));
  }, g = /* @__PURE__ */ p(
    "div",
    {
      ref: u,
      className: "ai-dropdown-menu",
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
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
            /* @__PURE__ */ p("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ A("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ p(Mc, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ p(
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
            /* @__PURE__ */ p("div", { className: "h-px bg-border mx-2 my-0.5" }),
            d.filter((y) => !y.showCustomPrompt).map((y) => {
              const v = y.icon ? hC[y.icon] : Yo;
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
                    v && /* @__PURE__ */ p(v, { size: 15, className: "text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ p("span", { children: y.label })
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
  return /* @__PURE__ */ p(Wt, { onMouseDown: (y) => y.preventDefault(), children: g });
}
function gC({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const a = q(null), i = q(null), [l, u] = V(!1), [c, d] = V(0);
  J(() => {
    if (a.current) {
      const k = new ResizeObserver((C) => {
        for (const N of C)
          d(N.contentRect.height);
      });
      return k.observe(a.current), () => k.disconnect();
    }
  }, []), J(() => {
    i.current && e.status === "streaming" && (i.current.scrollTop = i.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), J(() => {
    const k = (C) => {
      C.key === "Escape" && s();
    };
    return document.addEventListener("keydown", k), () => document.removeEventListener("keydown", k);
  }, [s]);
  const f = wn(() => {
    const x = window.innerWidth, M = window.innerHeight;
    let E = t.selectionCenterX - 380 / 2;
    E + 380 > x - 8 && (E = x - 380 - 8), E < 8 && (E = 8);
    const D = M - t.selectionBottom - 8, R = t.selectionTop - 8, I = c || 200;
    let O, H = !1;
    return D >= I || D >= R ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - I, H = !0), O < 8 && (O = 8), O + I > M - 8 && (O = M - I - 8), { top: O, left: E, placedAbove: H };
  }, [t, c]), h = e.status === "streaming" || e.status === "complete" ? e.result : "", m = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", y = e.status === "complete", v = e.status === "error", b = U(() => {
    navigator.clipboard.writeText(h), u(!0), setTimeout(() => u(!1), 1500);
  }, [h]);
  if (e.status === "idle") return null;
  const w = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", S = /* @__PURE__ */ p(
    "div",
    {
      ref: a,
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
                g && /* @__PURE__ */ p(Cc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ p("span", { className: "font-medium", children: v ? "Error" : m }),
                g && /* @__PURE__ */ p("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ p(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (k) => {
                    k.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ p(_t, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ p(
              "div",
              {
                ref: i,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: v ? /* @__PURE__ */ p("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ A("div", { className: "whitespace-pre-wrap", children: [
                  h,
                  g && /* @__PURE__ */ p("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ A("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || v) && /* @__PURE__ */ A(He, { children: [
                y && /* @__PURE__ */ A(He, { children: [
                  /* @__PURE__ */ p(
                    Bn,
                    {
                      icon: na,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ p(
                    Bn,
                    {
                      icon: Fa,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ p(
                    Bn,
                    {
                      icon: l ? rr : or,
                      label: l ? "Copied" : "Copy",
                      onClick: b
                    }
                  )
                ] }),
                /* @__PURE__ */ p(
                  Bn,
                  {
                    icon: Ua,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ p("div", { className: "flex-1" }),
                /* @__PURE__ */ p(
                  Bn,
                  {
                    icon: _t,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ A(He, { children: [
                /* @__PURE__ */ p("div", { className: "flex-1" }),
                /* @__PURE__ */ p(
                  Bn,
                  {
                    icon: _t,
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
  return /* @__PURE__ */ p(Wt, { onMouseDown: (k) => k.preventDefault(), children: S });
}
function Bn({
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
        /* @__PURE__ */ p(e, { size: 12 }),
        /* @__PURE__ */ p("span", { children: t })
      ]
    }
  );
}
const cf = "paragon-editor-toc-width", yC = 280, uf = 200, df = 500;
function Ql() {
  try {
    const e = localStorage.getItem(cf);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= uf && t <= df)
        return t;
    }
  } catch {
  }
  return yC;
}
function bC(e) {
  try {
    localStorage.setItem(cf, String(e));
  } catch {
  }
}
function vC(e, t, n) {
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
function wC(e) {
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
function Jl(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const ec = nr(function({
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
  position: f = "right",
  scrollOffset: h = 20,
  onItemClick: m,
  renderItem: g,
  showToggleButton: y = !0,
  scrollContainerRef: v
}) {
  const [b, w] = V([]), [S, k] = V(null), [C, N] = V(n), [x, M] = V(/* @__PURE__ */ new Set()), [E, D] = V(() => {
    if (d) {
      const B = parseInt(d, 10);
      return isNaN(B) ? Ql() : B;
    }
    return Ql();
  }), R = q(null), I = q(null), O = q(!1), H = q(0), W = q(0);
  J(() => {
    N(n);
  }, [n]);
  const G = U((B) => {
    B.preventDefault(), B.stopPropagation(), O.current = !0, H.current = B.clientX, W.current = E, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [E]);
  J(() => {
    const B = (ee) => {
      if (!O.current) return;
      const ge = f === "right" ? H.current - ee.clientX : ee.clientX - H.current, be = Math.min(df, Math.max(uf, W.current + ge));
      D(be);
    }, j = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((ee) => (bC(ee), ee)));
    };
    return document.addEventListener("mousemove", B), document.addEventListener("mouseup", j), () => {
      document.removeEventListener("mousemove", B), document.removeEventListener("mouseup", j);
    };
  }, [f]);
  const P = U(() => {
    if (!t || t.isDestroyed) return;
    const B = vC(t, s, a);
    w(B), S && !B.find((j) => j.id === S) && k(null);
  }, [t, s, a, S]);
  J(() => {
    if (!t) return;
    const B = () => {
      I.current && clearTimeout(I.current), I.current = setTimeout(() => P(), 300);
    };
    return P(), t.on("update", B), t.on("create", B), () => {
      t.off("update", B), t.off("create", B), I.current && clearTimeout(I.current);
    };
  }, [t, P]), J(() => {
    if (!t || !l || !C || b.length === 0) return;
    const B = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!B) return;
    const j = () => {
      const be = B.getBoundingClientRect();
      let Ae = null;
      for (let ze = b.length - 1; ze >= 0; ze--) {
        const ot = b[ze], Ft = Jl(t, ot.pos);
        if (Ft && Ft.getBoundingClientRect().top - be.top <= h + 10) {
          Ae = ot.id;
          break;
        }
      }
      !Ae && b.length > 0 && (Ae = b[0].id), k(Ae);
    };
    let ee;
    const ge = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(j);
    };
    return B.addEventListener("scroll", ge, { passive: !0 }), j(), () => {
      B.removeEventListener("scroll", ge), cancelAnimationFrame(ee);
    };
  }, [t, b, l, C, h, v]);
  const L = U((B) => {
    if (!t || t.isDestroyed) return;
    const j = Jl(t, B.pos);
    if (j) {
      const ee = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const ge = ee.getBoundingClientRect(), Ae = j.getBoundingClientRect().top - ge.top + ee.scrollTop;
        ee.scrollTo({ top: Ae - h, behavior: "smooth" });
      } else
        j.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(B.pos + 1);
    } catch {
    }
    k(B.id), m?.(B);
  }, [t, h, m, v]), F = U(() => {
    const B = !C;
    N(B), r?.(B);
  }, [C, r]), X = U((B) => {
    M((j) => {
      const ee = new Set(j);
      return ee.has(B) ? ee.delete(B) : ee.add(B), ee;
    });
  }, []), K = U((B, j, ee = 0) => {
    if (g)
      return g(B, j, () => L(B));
    const ge = (B.level - s) * 14, be = u && B.children && B.children.length > 0, Ae = x.has(B.id);
    return /* @__PURE__ */ p(
      "div",
      {
        className: `toc-item ${j ? "toc-item-active" : ""} toc-level-${B.level}`,
        style: { paddingLeft: `${ge + 10}px` },
        children: /* @__PURE__ */ A(
          "button",
          {
            className: "toc-item-button",
            onClick: () => L(B),
            title: B.text,
            children: [
              be && /* @__PURE__ */ p(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (ze) => {
                    ze.stopPropagation(), X(B.id);
                  },
                  children: /* @__PURE__ */ p("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: Ae ? /* @__PURE__ */ p("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ p("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              i && /* @__PURE__ */ A("span", { className: "toc-level-indicator", children: [
                "H",
                B.level
              ] }),
              /* @__PURE__ */ p("span", { className: "toc-item-text", children: B.text })
            ]
          }
        )
      },
      B.id
    );
  }, [g, L, u, s, i, x, X]), Z = U((B, j = 0) => B.map((ee) => {
    const ge = S === ee.id, be = x.has(ee.id), Ae = ee.children && ee.children.length > 0;
    return /* @__PURE__ */ A("div", { children: [
      K(ee, ge, j),
      Ae && !be && /* @__PURE__ */ p("div", { className: "toc-children", children: Z(ee.children, j + 1) })
    ] }, ee.id);
  }), [S, x, K]), te = U(() => b.map((B) => {
    const j = S === B.id;
    return K(B, j);
  }), [b, S, K]);
  if (!t) return null;
  const _ = u ? wC(b) : [];
  return /* @__PURE__ */ A(He, { children: [
    y && /* @__PURE__ */ p(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: F,
        title: C ? "Hide Table of Contents" : "Show Table of Contents",
        children: C ? /* @__PURE__ */ p(ph, { size: 16 }) : /* @__PURE__ */ p(hh, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(
      "div",
      {
        ref: R,
        className: `toc-sidebar ${C ? "toc-visible" : "toc-hidden"} toc-${f} ${c}`,
        style: { width: C ? `${E}px` : "0px" },
        children: [
          C && /* @__PURE__ */ p(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: G
            }
          ),
          /* @__PURE__ */ A("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ p("div", { className: "toc-header", children: /* @__PURE__ */ p("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ p("div", { className: "toc-content toc-content-with-toggle", children: b.length === 0 ? /* @__PURE__ */ A("div", { className: "toc-empty", children: [
              /* @__PURE__ */ p("p", { children: "No headings yet" }),
              /* @__PURE__ */ p("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ p("div", { className: "toc-list", children: u ? Z(_) : te() }) })
          ] })
        ]
      }
    )
  ] });
});
function kC(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n)
      n.hasOwnProperty(r) && (e[r] = n[r]);
  }
  return e;
}
function Ca(e, t) {
  return Array(t + 1).join(e);
}
function ff(e) {
  return e.replace(/^\n*/, "");
}
function pf(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function hf(e) {
  return pf(ff(e));
}
var xC = [
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
function vi(e) {
  return wi(e, xC);
}
var mf = [
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
function gf(e) {
  return wi(e, mf);
}
function CC(e) {
  return bf(e, mf);
}
var yf = [
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
function SC(e) {
  return wi(e, yf);
}
function TC(e) {
  return bf(e, yf);
}
function wi(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function bf(e, t) {
  return e.getElementsByTagName && t.some(function(n) {
    return e.getElementsByTagName(n).length;
  });
}
var qe = {};
qe.paragraph = {
  filter: "p",
  replacement: function(e) {
    return `

` + e + `

`;
  }
};
qe.lineBreak = {
  filter: "br",
  replacement: function(e, t, n) {
    return n.br + `
`;
  }
};
qe.heading = {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: function(e, t, n) {
    var r = Number(t.nodeName.charAt(1));
    if (n.headingStyle === "setext" && r < 3) {
      var o = Ca(r === 1 ? "=" : "-", e.length);
      return `

` + e + `
` + o + `

`;
    } else
      return `

` + Ca("#", r) + " " + e + `

`;
  }
};
qe.blockquote = {
  filter: "blockquote",
  replacement: function(e) {
    return e = hf(e).replace(/^/gm, "> "), `

` + e + `

`;
  }
};
qe.list = {
  filter: ["ul", "ol"],
  replacement: function(e, t) {
    var n = t.parentNode;
    return n.nodeName === "LI" && n.lastElementChild === t ? `
` + e : `

` + e + `

`;
  }
};
qe.listItem = {
  filter: "li",
  replacement: function(e, t, n) {
    var r = n.bulletListMarker + "   ", o = t.parentNode;
    if (o.nodeName === "OL") {
      var s = o.getAttribute("start"), a = Array.prototype.indexOf.call(o.children, t);
      r = (s ? Number(s) + a : a + 1) + ".  ";
    }
    var i = /\n$/.test(e);
    return e = hf(e) + (i ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(r.length)), r + e + (t.nextSibling ? `
` : "");
  }
};
qe.indentedCodeBlock = {
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
qe.fencedCodeBlock = {
  filter: function(e, t) {
    return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
  },
  replacement: function(e, t, n) {
    for (var r = t.firstChild.getAttribute("class") || "", o = (r.match(/language-(\S+)/) || [null, ""])[1], s = t.firstChild.textContent, a = n.fence.charAt(0), i = 3, l = new RegExp("^" + a + "{3,}", "gm"), u; u = l.exec(s); )
      u[0].length >= i && (i = u[0].length + 1);
    var c = Ca(a, i);
    return `

` + c + o + `
` + s.replace(/\n$/, "") + `
` + c + `

`;
  }
};
qe.horizontalRule = {
  filter: "hr",
  replacement: function(e, t, n) {
    return `

` + n.hr + `

`;
  }
};
qe.inlineLink = {
  filter: function(e, t) {
    return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t) {
    var n = t.getAttribute("href");
    n && (n = n.replace(/([()])/g, "\\$1"));
    var r = $o(t.getAttribute("title"));
    return r && (r = ' "' + r.replace(/"/g, '\\"') + '"'), "[" + e + "](" + n + r + ")";
  }
};
qe.referenceLink = {
  filter: function(e, t) {
    return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t, n) {
    var r = t.getAttribute("href"), o = $o(t.getAttribute("title"));
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
qe.emphasis = {
  filter: ["em", "i"],
  replacement: function(e, t, n) {
    return e.trim() ? n.emDelimiter + e + n.emDelimiter : "";
  }
};
qe.strong = {
  filter: ["strong", "b"],
  replacement: function(e, t, n) {
    return e.trim() ? n.strongDelimiter + e + n.strongDelimiter : "";
  }
};
qe.code = {
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
qe.image = {
  filter: "img",
  replacement: function(e, t) {
    var n = $o(t.getAttribute("alt")), r = t.getAttribute("src") || "", o = $o(t.getAttribute("title")), s = o ? ' "' + o + '"' : "";
    return r ? "![" + n + "](" + r + s + ")" : "";
  }
};
function $o(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function vf(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = {
    replacement: e.blankReplacement
  }, this.keepReplacement = e.keepReplacement, this.defaultRule = {
    replacement: e.defaultReplacement
  }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
vf.prototype = {
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
    return (t = Qs(this.array, e, this.options)) || (t = Qs(this._keep, e, this.options)) || (t = Qs(this._remove, e, this.options)) ? t : this.defaultRule;
  },
  forEach: function(e) {
    for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
  }
};
function Qs(e, t, n) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r];
    if (MC(o, t, n)) return o;
  }
}
function MC(e, t, n) {
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
function EC(e) {
  var t = e.element, n = e.isBlock, r = e.isVoid, o = e.isPre || function(d) {
    return d.nodeName === "PRE";
  };
  if (!(!t.firstChild || o(t))) {
    for (var s = null, a = !1, i = null, l = tc(i, t, o); l !== t; ) {
      if (l.nodeType === 3 || l.nodeType === 4) {
        var u = l.data.replace(/[ \r\n\t]+/g, " ");
        if ((!s || / $/.test(s.data)) && !a && u[0] === " " && (u = u.substr(1)), !u) {
          l = Js(l);
          continue;
        }
        l.data = u, s = l;
      } else if (l.nodeType === 1)
        n(l) || l.nodeName === "BR" ? (s && (s.data = s.data.replace(/ $/, "")), s = null, a = !1) : r(l) || o(l) ? (s = null, a = !0) : s && (a = !1);
      else {
        l = Js(l);
        continue;
      }
      var c = tc(i, l, o);
      i = l, l = c;
    }
    s && (s.data = s.data.replace(/ $/, ""), s.data || Js(s));
  }
}
function Js(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function tc(e, t, n) {
  return e && e.parentNode === t || n(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var ki = typeof window < "u" ? window : {};
function NC() {
  var e = ki.DOMParser, t = !1;
  try {
    new e().parseFromString("", "text/html") && (t = !0);
  } catch {
  }
  return t;
}
function DC() {
  var e = function() {
  };
  return RC() ? e.prototype.parseFromString = function(t) {
    var n = new window.ActiveXObject("htmlfile");
    return n.designMode = "on", n.open(), n.write(t), n.close(), n;
  } : e.prototype.parseFromString = function(t) {
    var n = document.implementation.createHTMLDocument("");
    return n.open(), n.write(t), n.close(), n;
  }, e;
}
function RC() {
  var e = !1;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    ki.ActiveXObject && (e = !0);
  }
  return e;
}
var AC = NC() ? ki.DOMParser : DC();
function LC(e, t) {
  var n;
  if (typeof e == "string") {
    var r = PC().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + e + "</x-turndown>",
      "text/html"
    );
    n = r.getElementById("turndown-root");
  } else
    n = e.cloneNode(!0);
  return EC({
    element: n,
    isBlock: vi,
    isVoid: gf,
    isPre: t.preformattedCode ? IC : null
  }), n;
}
var ea;
function PC() {
  return ea = ea || new AC(), ea;
}
function IC(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function OC(e, t) {
  return e.isBlock = vi(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = $C(e), e.flankingWhitespace = _C(e, t), e;
}
function $C(e) {
  return !gf(e) && !SC(e) && /^\s*$/i.test(e.textContent) && !CC(e) && !TC(e);
}
function _C(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode)
    return { leading: "", trailing: "" };
  var n = HC(e.textContent);
  return n.leadingAscii && nc("left", e, t) && (n.leading = n.leadingNonAscii), n.trailingAscii && nc("right", e, t) && (n.trailing = n.trailingNonAscii), { leading: n.leading, trailing: n.trailing };
}
function HC(e) {
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
function nc(e, t, n) {
  var r, o, s;
  return e === "left" ? (r = t.previousSibling, o = / $/) : (r = t.nextSibling, o = /^ /), r && (r.nodeType === 3 ? s = o.test(r.nodeValue) : n.preformattedCode && r.nodeName === "CODE" ? s = !1 : r.nodeType === 1 && !vi(r) && (s = o.test(r.textContent))), s;
}
var zC = Array.prototype.reduce, BC = [
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
function _o(e) {
  if (!(this instanceof _o)) return new _o(e);
  var t = {
    rules: qe,
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
  this.options = kC({}, t, e), this.rules = new vf(this.options);
}
_o.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */
  turndown: function(e) {
    if (!UC(e))
      throw new TypeError(
        e + " is not a string, or an element/document/fragment node."
      );
    if (e === "") return "";
    var t = wf.call(this, new LC(e, this.options));
    return WC.call(this, t);
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
    return BC.reduce(function(t, n) {
      return t.replace(n[0], n[1]);
    }, e);
  }
};
function wf(e) {
  var t = this;
  return zC.call(e.childNodes, function(n, r) {
    r = new OC(r, t.options);
    var o = "";
    return r.nodeType === 3 ? o = r.isCode ? r.nodeValue : t.escape(r.nodeValue) : r.nodeType === 1 && (o = FC.call(t, r)), kf(n, o);
  }, "");
}
function WC(e) {
  var t = this;
  return this.rules.forEach(function(n) {
    typeof n.append == "function" && (e = kf(e, n.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function FC(e) {
  var t = this.rules.forNode(e), n = wf.call(this, e), r = e.flankingWhitespace;
  return (r.leading || r.trailing) && (n = n.trim()), r.leading + t.replacement(n, e, this.options) + r.trailing;
}
function kf(e, t) {
  var n = pf(e), r = ff(t), o = Math.max(e.length - n.length, t.length - r.length), s = `

`.substring(0, o);
  return n + s + r;
}
function UC(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
var rc = /highlight-(?:text|source)-([a-z0-9]+)/;
function YC(e) {
  e.addRule("highlightedCodeBlock", {
    filter: function(t) {
      var n = t.firstChild;
      return t.nodeName === "DIV" && rc.test(t.className) && n && n.nodeName === "PRE";
    },
    replacement: function(t, n, r) {
      var o = n.className || "", s = (o.match(rc) || [null, ""])[1];
      return `

` + r.fence + s + `
` + n.firstChild.textContent + `
` + r.fence + `

`;
    }
  });
}
function jC(e) {
  e.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: function(t) {
      return "~" + t + "~";
    }
  });
}
var VC = Array.prototype.indexOf, KC = Array.prototype.every, er = {};
er.tableCell = {
  filter: ["th", "td"],
  replacement: function(e, t) {
    return xf(e, t);
  }
};
er.tableRow = {
  filter: "tr",
  replacement: function(e, t) {
    var n = "", r = { left: ":--", right: "--:", center: ":-:" };
    if (xi(t))
      for (var o = 0; o < t.childNodes.length; o++) {
        var s = "---", a = (t.childNodes[o].getAttribute("align") || "").toLowerCase();
        a && (s = r[a] || s), n += xf(s, t.childNodes[o]);
      }
    return `
` + e + (n ? `
` + n : "");
  }
};
er.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function(e) {
    return e.nodeName === "TABLE" && xi(e.rows[0]);
  },
  replacement: function(e) {
    return e = e.replace(`

`, `
`), `

` + e + `

`;
  }
};
er.tableSection = {
  filter: ["thead", "tbody", "tfoot"],
  replacement: function(e) {
    return e;
  }
};
function xi(e) {
  var t = e.parentNode;
  return t.nodeName === "THEAD" || t.firstChild === e && (t.nodeName === "TABLE" || qC(t)) && KC.call(e.childNodes, function(n) {
    return n.nodeName === "TH";
  });
}
function qC(e) {
  var t = e.previousSibling;
  return e.nodeName === "TBODY" && (!t || t.nodeName === "THEAD" && /^\s*$/i.test(t.textContent));
}
function xf(e, t) {
  var n = VC.call(t.parentNode.childNodes, t), r = " ";
  return n === 0 && (r = "| "), r + e + " |";
}
function GC(e) {
  e.keep(function(n) {
    return n.nodeName === "TABLE" && !xi(n.rows[0]);
  });
  for (var t in er) e.addRule(t, er[t]);
}
function XC(e) {
  e.addRule("taskListItems", {
    filter: function(t) {
      return t.type === "checkbox" && t.parentNode.nodeName === "LI";
    },
    replacement: function(t, n) {
      return (n.checked ? "[x]" : "[ ]") + " ";
    }
  });
}
function ZC(e) {
  e.use([
    YC,
    jC,
    GC,
    XC
  ]);
}
function QC() {
  return wn(() => {
    const e = new _o({
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
      blankReplacement: (a, i) => i.nodeName === "P" ? `

​

` : i.isBlock ? `

` : ""
    });
    e.use(ZC), e.addRule("highlight", {
      filter: (a) => a.nodeName === "MARK",
      replacement: (a) => `==${a}==`
    }), e.addRule("resizableImage", {
      filter: "img",
      replacement: (a, i) => {
        const l = i, u = l.getAttribute("src") || "", d = (l.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = l.getAttribute("width"), h = f ? parseInt(f, 10) : null, m = l.getAttribute("data-align") || "left", g = [d], y = m !== "left", v = h && h > 0;
        return (y || v) && g.push(y ? m : "left"), v && g.push(String(h)), `![${g.join(" | ")}](${u})`;
      }
    }), e.addRule("taskListItem", {
      filter: (a) => a.nodeName === "LI" && a.getAttribute("data-type") === "taskItem",
      replacement: (a, i) => {
        const l = i, u = l.querySelector('input[type="checkbox"]'), c = u?.hasAttribute("checked") || u?.checked || l.getAttribute("data-checked") === "true";
        return a = a.replace(/^\n+/, "").replace(/\n+$/, "").replace(/\n\n+/g, `

`), a = a.replace(/\n\n(- |\d+\. )/g, `
$1`), a = a.replace(/\u200B/g, "").trim(), `- [${c ? "x" : " "}] ` + (a || "​").replace(/\n/gm, `
    `) + `
`;
      }
    }), e.addRule("tightListParagraph", {
      filter: (a) => a.nodeName === "P" && a.parentNode !== null && a.parentNode.nodeName === "LI",
      replacement: (a) => a
    }), e.addRule("blankLinePreservation", {
      filter: (a) => a.nodeName === "P" && (a.textContent === "" || a.textContent === "​") && a.parentNode !== null && a.parentNode.nodeName !== "LI",
      replacement: () => `

​

`
    });
    function t(a) {
      const i = a.getAttribute("src") || "", u = (a.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), c = a.getAttribute("width"), d = c ? parseInt(c, 10) : null, f = a.getAttribute("data-align") || "left", h = [u], m = f !== "left", g = d && d > 0;
      return (m || g) && h.push(m ? f : "left"), g && h.push(String(d)), `![${h.join(" \\| ")}](${i})`;
    }
    function n(a) {
      if (a.nodeType === Node.TEXT_NODE)
        return (a.textContent || "").replace(/\|/g, "\\|");
      if (a.nodeType === Node.ELEMENT_NODE) {
        const i = a;
        if (i.nodeName === "IMG") return t(i);
        if (i.nodeName === "BR") return "";
        let l = "";
        for (const u of Array.from(i.childNodes))
          l += n(u);
        if (i.nodeName === "STRONG" || i.nodeName === "B") return `**${l}**`;
        if (i.nodeName === "EM" || i.nodeName === "I") return `*${l}*`;
        if (i.nodeName === "S" || i.nodeName === "DEL") return `~~${l}~~`;
        if (i.nodeName === "CODE") return `\`${l}\``;
        if (i.nodeName === "MARK") return `==${l}==`;
        if (i.nodeName === "A") {
          const u = i.getAttribute("href") || "";
          return `[${l}](${u})`;
        }
        return l;
      }
      return "";
    }
    function r(a) {
      let i = "";
      for (const l of Array.from(a.childNodes))
        if (l.nodeType === Node.ELEMENT_NODE) {
          const u = l, c = u.nodeName;
          if (c === "UL" || c === "OL" || c === "LABEL" || c === "INPUT") continue;
          i += n(u);
        } else
          i += n(l);
      return i.trim();
    }
    function o(a, i, l = 0) {
      const u = "  ".repeat(l), c = a.nodeName;
      Array.from(a.childNodes).filter(
        (f) => f.nodeType === Node.ELEMENT_NODE && f.nodeName === "LI"
      ).forEach((f, h) => {
        const m = f.getAttribute("data-type") === "taskItem", g = f.getAttribute("data-checked") === "true", y = r(f);
        m ? i.push(`${u}- [${g ? "x" : " "}] ${y}`) : c === "OL" ? i.push(`${u}${h + 1}. ${y}`) : i.push(`${u}- ${y}`);
        const v = Array.from(f.childNodes).filter(
          (b) => b.nodeType === Node.ELEMENT_NODE && (b.nodeName === "UL" || b.nodeName === "OL")
        );
        for (const b of v)
          o(b, i, l + 1);
      });
    }
    function s(a) {
      const i = [];
      for (const l of Array.from(a.childNodes)) {
        if (l.nodeType !== Node.ELEMENT_NODE) {
          const f = (l.textContent || "").trim();
          f && i.push(f.replace(/\|/g, "\\|"));
          continue;
        }
        const u = l, c = u.nodeName;
        if (c === "UL" || c === "OL") {
          o(u, i, 0);
          continue;
        }
        if (c === "FIGURE") {
          const f = u.querySelector("img");
          f && i.push(t(f));
          continue;
        }
        if (c === "IMG") {
          i.push(t(u));
          continue;
        }
        const d = n(u).trim();
        d && i.push(d);
      }
      return i.join(" <br> ") || "";
    }
    return e.addRule("table", {
      filter: "table",
      replacement: function(a, i) {
        const l = i, u = Array.from(l.querySelectorAll("tr"));
        if (u.length === 0) return "";
        const c = [];
        let d = !1;
        u.forEach((h, m) => {
          const g = Array.from(h.querySelectorAll("th, td")), y = g.map((v) => s(v));
          if (m > 0 && g.length > 0 && g[0].nodeName === "TH" && (d = !0), c.push("| " + y.join(" | ") + " |"), m === 0) {
            const v = g.map(() => "---").join(" | ");
            c.push("| " + v + " |");
          }
        });
        const f = d ? `
<!-- header-column -->` : "";
        return `

` + c.join(`
`) + f + `

`;
      }
    }), e.addRule("tableCell", {
      filter: ["th", "td"],
      replacement: function(a) {
        return a;
      }
    }), e.addRule("datePill", {
      filter: (a) => a.nodeName === "SPAN" && a.getAttribute("data-type") === "date-pill",
      replacement: (a, i) => {
        const l = i.getAttribute("data-date");
        return l ? `@${tv(l)}@` : a;
      }
    }), e.addRule("tagPill", {
      filter: (a) => a.nodeName === "SPAN" && a.getAttribute("data-type") === "tag-pill",
      replacement: (a, i) => {
        const l = i.getAttribute("data-tag");
        return l ? `#${l}` : a;
      }
    }), e.addRule("wikiLink", {
      filter: (a) => a.nodeName === "SPAN" && a.hasAttribute("data-wiki-link"),
      replacement: (a, i) => {
        const l = i.getAttribute("data-page-name");
        return l ? `[[${l}]]` : a;
      }
    }), e.addRule("callout", {
      filter: (a) => a.nodeName === "DIV" && a.hasAttribute("data-callout"),
      replacement: (a, i) => {
        const l = i.getAttribute("data-type") || "info", u = a.trim().replace(/\n{3,}/g, `

`);
        return `

\`\`\`ad-${l}
${u}
\`\`\`

`;
      }
    }), e;
  }, []);
}
function Ci() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var Mn = Ci();
function Cf(e) {
  Mn = e;
}
var Dr = { exec: () => null };
function ve(e, t = "") {
  let n = typeof e == "string" ? e : e.source, r = { replace: (o, s) => {
    let a = typeof s == "string" ? s : s.source;
    return a = a.replace(Ge.caret, "$1"), n = n.replace(o, a), r;
  }, getRegex: () => new RegExp(n, t) };
  return r;
}
var JC = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), Ge = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`), htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i") }, eS = /^(?:[ \t]*(?:\n|$))+/, tS = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, nS = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Vr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, rS = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Si = /(?:[*+-]|\d{1,9}[.)])/, Sf = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Tf = ve(Sf).replace(/bull/g, Si).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), oS = ve(Sf).replace(/bull/g, Si).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Ti = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, sS = /^[^\n]+/, Mi = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, aS = ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Mi).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), iS = ve(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Si).getRegex(), is = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ei = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, lS = ve("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ei).replace("tag", is).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Mf = ve(Ti).replace("hr", Vr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", is).getRegex(), cS = ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Mf).getRegex(), Ni = { blockquote: cS, code: tS, def: aS, fences: nS, heading: rS, hr: Vr, html: lS, lheading: Tf, list: iS, newline: eS, paragraph: Mf, table: Dr, text: sS }, oc = ve("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Vr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", is).getRegex(), uS = { ...Ni, lheading: oS, table: oc, paragraph: ve(Ti).replace("hr", Vr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", oc).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", is).getRegex() }, dS = { ...Ni, html: ve(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ei).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Dr, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: ve(Ti).replace("hr", Vr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Tf).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, fS = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, pS = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Ef = /^( {2,}|\\)\n(?!\s*$)/, hS = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ls = /[\p{P}\p{S}]/u, Di = /[\s\p{P}\p{S}]/u, Nf = /[^\s\p{P}\p{S}]/u, mS = ve(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Di).getRegex(), Df = /(?!~)[\p{P}\p{S}]/u, gS = /(?!~)[\s\p{P}\p{S}]/u, yS = /(?:[^\s\p{P}\p{S}]|~)/u, bS = ve(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", JC ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Rf = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, vS = ve(Rf, "u").replace(/punct/g, ls).getRegex(), wS = ve(Rf, "u").replace(/punct/g, Df).getRegex(), Af = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", kS = ve(Af, "gu").replace(/notPunctSpace/g, Nf).replace(/punctSpace/g, Di).replace(/punct/g, ls).getRegex(), xS = ve(Af, "gu").replace(/notPunctSpace/g, yS).replace(/punctSpace/g, gS).replace(/punct/g, Df).getRegex(), CS = ve("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Nf).replace(/punctSpace/g, Di).replace(/punct/g, ls).getRegex(), SS = ve(/\\(punct)/, "gu").replace(/punct/g, ls).getRegex(), TS = ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), MS = ve(Ei).replace("(?:-->|$)", "-->").getRegex(), ES = ve("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", MS).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ho = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, NS = ve(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Ho).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Lf = ve(/^!?\[(label)\]\[(ref)\]/).replace("label", Ho).replace("ref", Mi).getRegex(), Pf = ve(/^!?\[(ref)\](?:\[\])?/).replace("ref", Mi).getRegex(), DS = ve("reflink|nolink(?!\\()", "g").replace("reflink", Lf).replace("nolink", Pf).getRegex(), sc = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Ri = { _backpedal: Dr, anyPunctuation: SS, autolink: TS, blockSkip: bS, br: Ef, code: pS, del: Dr, emStrongLDelim: vS, emStrongRDelimAst: kS, emStrongRDelimUnd: CS, escape: fS, link: NS, nolink: Pf, punctuation: mS, reflink: Lf, reflinkSearch: DS, tag: ES, text: hS, url: Dr }, RS = { ...Ri, link: ve(/^!?\[(label)\]\((.*?)\)/).replace("label", Ho).getRegex(), reflink: ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ho).getRegex() }, Sa = { ...Ri, emStrongRDelimAst: xS, emStrongLDelim: wS, url: ve(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", sc).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: ve(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", sc).getRegex() }, AS = { ...Sa, br: ve(Ef).replace("{2,}", "*").getRegex(), text: ve(Sa.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, ko = { normal: Ni, gfm: uS, pedantic: dS }, vr = { normal: Ri, gfm: Sa, breaks: AS, pedantic: RS }, LS = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, ac = (e) => LS[e];
function It(e, t) {
  if (t) {
    if (Ge.escapeTest.test(e)) return e.replace(Ge.escapeReplace, ac);
  } else if (Ge.escapeTestNoEncode.test(e)) return e.replace(Ge.escapeReplaceNoEncode, ac);
  return e;
}
function ic(e) {
  try {
    e = encodeURI(e).replace(Ge.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function lc(e, t) {
  let n = e.replace(Ge.findPipe, (s, a, i) => {
    let l = !1, u = a;
    for (; --u >= 0 && i[u] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), r = n.split(Ge.splitPipe), o = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !r.at(-1)?.trim() && r.pop(), t) if (r.length > t) r.splice(t);
  else for (; r.length < t; ) r.push("");
  for (; o < r.length; o++) r[o] = r[o].trim().replace(Ge.slashPipe, "|");
  return r;
}
function wr(e, t, n) {
  let r = e.length;
  if (r === 0) return "";
  let o = 0;
  for (; o < r && e.charAt(r - o - 1) === t; )
    o++;
  return e.slice(0, r - o);
}
function PS(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
  else if (e[r] === t[0]) n++;
  else if (e[r] === t[1] && (n--, n < 0)) return r;
  return n > 0 ? -2 : -1;
}
function cc(e, t, n, r, o) {
  let s = t.href, a = t.title || null, i = e[1].replace(o.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let l = { type: e[0].charAt(0) === "!" ? "image" : "link", raw: n, href: s, title: a, text: i, tokens: r.inlineTokens(i) };
  return r.state.inLink = !1, l;
}
function IS(e, t, n) {
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
var zo = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || Mn;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : wr(n, `
`) };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], r = IS(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: r };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let r = wr(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: wr(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = wr(t[0], `
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
        let f = s.at(-1);
        if (f?.type === "code") break;
        if (f?.type === "blockquote") {
          let h = f, m = h.raw + `
` + n.join(`
`), g = this.blockquote(m);
          s[s.length - 1] = g, r = r.substring(0, r.length - h.raw.length) + g.raw, o = o.substring(0, o.length - h.text.length) + g.text;
          break;
        } else if (f?.type === "list") {
          let h = f, m = h.raw + `
` + n.join(`
`), g = this.list(m);
          s[s.length - 1] = g, r = r.substring(0, r.length - f.raw.length) + g.raw, o = o.substring(0, o.length - h.raw.length) + g.raw, n = m.substring(s.at(-1).raw.length).split(`
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
`, 1)[0].replace(this.rules.other.listReplaceTabs, (g) => " ".repeat(3 * g.length)), f = e.split(`
`, 1)[0], h = !d.trim(), m = 0;
        if (this.options.pedantic ? (m = 2, c = d.trimStart()) : h ? m = t[1].length + 1 : (m = t[2].search(this.rules.other.nonSpaceChar), m = m > 4 ? 1 : m, c = d.slice(m), m += t[1].length), h && this.rules.other.blankLine.test(f) && (u += f + `
`, e = e.substring(f.length + 1), l = !0), !l) {
          let g = this.rules.other.nextBulletRegex(m), y = this.rules.other.hrRegex(m), v = this.rules.other.fencesBeginRegex(m), b = this.rules.other.headingBeginRegex(m), w = this.rules.other.htmlBeginRegex(m);
          for (; e; ) {
            let S = e.split(`
`, 1)[0], k;
            if (f = S, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), k = f) : k = f.replace(this.rules.other.tabCharGlobal, "    "), v.test(f) || b.test(f) || w.test(f) || g.test(f) || y.test(f)) break;
            if (k.search(this.rules.other.nonSpaceChar) >= m || !f.trim()) c += `
` + k.slice(m);
            else {
              if (h || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || v.test(d) || b.test(d) || y.test(d)) break;
              c += `
` + f;
            }
            !h && !f.trim() && (h = !0), u += S + `
`, e = e.substring(S.length + 1), d = k.slice(m);
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
    let n = lc(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), o = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let a of r) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
      for (let a = 0; a < n.length; a++) s.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: !0, align: s.align[a] });
      for (let a of o) s.rows.push(lc(a, s.header.length).map((i, l) => ({ text: i, tokens: this.lexer.inline(i), header: !1, align: s.align[l] })));
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
        let s = wr(n.slice(0, -1), "\\");
        if ((n.length - s.length) % 2 === 0) return;
      } else {
        let s = PS(t[2], "()");
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
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), cc(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
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
      return cc(n, o, n[0], this.lexer, this.rules);
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
        let f = d.slice(2, -2);
        return { type: "strong", raw: d, text: f, tokens: this.lexer.inlineTokens(f) };
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
}, ut = class Ta {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || Mn, this.options.tokenizer = this.options.tokenizer || new zo(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: Ge, block: ko.normal, inline: vr.normal };
    this.options.pedantic ? (n.block = ko.pedantic, n.inline = vr.pedantic) : this.options.gfm && (n.block = ko.gfm, this.options.breaks ? n.inline = vr.breaks : n.inline = vr.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: ko, inline: vr };
  }
  static lex(t, n) {
    return new Ta(n).lex(t);
  }
  static lexInline(t, n) {
    return new Ta(n).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(Ge.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], r = !1) {
    for (this.options.pedantic && (t = t.replace(Ge.tabCharGlobal, "    ").replace(Ge.spaceLine, "")); t; ) {
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
        let c = 1 / 0, d = t.slice(1), f;
        this.options.extensions.startInline.forEach((h) => {
          f = h.call({ lexer: this }, d), typeof f == "number" && f >= 0 && (c = Math.min(c, f));
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
}, Bo = class {
  options;
  parser;
  constructor(e) {
    this.options = e || Mn;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let r = (t || "").match(Ge.notSpaceStart)?.[0], o = e.replace(Ge.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + It(r) + '">' + (n ? o : It(o, !0)) + `</code></pre>
` : "<pre><code>" + (n ? o : It(o, !0)) + `</code></pre>
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
    return `<code>${It(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    let r = this.parser.parseInline(n), o = ic(e);
    if (o === null) return r;
    e = o;
    let s = '<a href="' + e + '"';
    return t && (s += ' title="' + It(t) + '"'), s += ">" + r + "</a>", s;
  }
  image({ href: e, title: t, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let o = ic(e);
    if (o === null) return It(n);
    e = o;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${It(t)}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : It(e.text);
  }
}, Ai = class {
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
}, dt = class Ma {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || Mn, this.options.renderer = this.options.renderer || new Bo(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ai();
  }
  static parse(t, n) {
    return new Ma(n).parse(t);
  }
  static parseInline(t, n) {
    return new Ma(n).parseInline(t);
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
}, Sr = class {
  options;
  block;
  constructor(e) {
    this.options = e || Mn;
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
    return this.block ? ut.lex : ut.lexInline;
  }
  provideParser() {
    return this.block ? dt.parse : dt.parseInline;
  }
}, OS = class {
  defaults = Ci();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = dt;
  Renderer = Bo;
  TextRenderer = Ai;
  Lexer = ut;
  Tokenizer = zo;
  Hooks = Sr;
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
        let o = this.defaults.renderer || new Bo(this.defaults);
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
        let o = this.defaults.tokenizer || new zo(this.defaults);
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
        let o = this.defaults.hooks || new Sr();
        for (let s in n.hooks) {
          if (!(s in o)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let a = s, i = n.hooks[a], l = o[a];
          Sr.passThroughHooks.has(s) ? o[a] = (u) => {
            if (this.defaults.async && Sr.passThroughHooksRespectAsync.has(s)) return (async () => {
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
    return ut.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return dt.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (t, n) => {
      let r = { ...n }, o = { ...this.defaults, ...r }, s = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && r.async === !1) return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof t > "u" || t === null) return s(new Error("marked(): input parameter is undefined or null"));
      if (typeof t != "string") return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
      if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
        let a = o.hooks ? await o.hooks.preprocess(t) : t, i = await (o.hooks ? await o.hooks.provideLexer() : e ? ut.lex : ut.lexInline)(a, o), l = o.hooks ? await o.hooks.processAllTokens(i) : i;
        o.walkTokens && await Promise.all(this.walkTokens(l, o.walkTokens));
        let u = await (o.hooks ? await o.hooks.provideParser() : e ? dt.parse : dt.parseInline)(l, o);
        return o.hooks ? await o.hooks.postprocess(u) : u;
      })().catch(s);
      try {
        o.hooks && (t = o.hooks.preprocess(t));
        let a = (o.hooks ? o.hooks.provideLexer() : e ? ut.lex : ut.lexInline)(t, o);
        o.hooks && (a = o.hooks.processAllTokens(a)), o.walkTokens && this.walkTokens(a, o.walkTokens);
        let i = (o.hooks ? o.hooks.provideParser() : e ? dt.parse : dt.parseInline)(a, o);
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
        let r = "<p>An error occurred:</p><pre>" + It(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
}, xn = new OS();
function xe(e, t) {
  return xn.parse(e, t);
}
xe.options = xe.setOptions = function(e) {
  return xn.setOptions(e), xe.defaults = xn.defaults, Cf(xe.defaults), xe;
};
xe.getDefaults = Ci;
xe.defaults = Mn;
xe.use = function(...e) {
  return xn.use(...e), xe.defaults = xn.defaults, Cf(xe.defaults), xe;
};
xe.walkTokens = function(e, t) {
  return xn.walkTokens(e, t);
};
xe.parseInline = xn.parseInline;
xe.Parser = dt;
xe.parser = dt.parse;
xe.Renderer = Bo;
xe.TextRenderer = Ai;
xe.Lexer = ut;
xe.lexer = ut.lex;
xe.Tokenizer = zo;
xe.Hooks = Sr;
xe.parse = xe;
xe.options;
xe.setOptions;
xe.use;
xe.walkTokens;
xe.parseInline;
dt.parse;
ut.lex;
function $S(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (a) => {
    Array.from(a.querySelectorAll("ul")).forEach(o);
    const l = Array.from(a.children).filter((f) => f.tagName === "LI");
    let u = !1, c = !1;
    const d = (f) => {
      const h = f.querySelector(':scope > input[type="checkbox"]');
      if (h) return h;
      const m = f.querySelector(":scope > p");
      if (m) {
        const g = m.querySelector(':scope > input[type="checkbox"]');
        if (g) return g;
      }
      return null;
    };
    l.forEach((f) => {
      d(f) ? u = !0 : c = !0;
    }), u && (l.forEach((f) => {
      const h = d(f);
      if (h) {
        const m = h.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(m));
        const g = h.parentElement, y = g && g.tagName === "P" && g.parentElement === f;
        h.remove(), y && g.firstChild && g.firstChild.nodeType === Node.TEXT_NODE && (g.firstChild.textContent = (g.firstChild.textContent || "").replace(/^\s+/, ""));
        const v = Array.from(f.childNodes), b = [], w = [];
        if (v.forEach((S) => {
          if (S.nodeType === Node.ELEMENT_NODE) {
            const k = S;
            k.tagName === "UL" || k.tagName === "OL" || k.tagName === "P" ? w.push(S) : b.push(S);
          } else
            b.push(S);
        }), f.innerHTML = "", b.length > 0) {
          const S = n.createElement("p");
          b.forEach((k) => S.appendChild(k)), S.firstChild && S.firstChild.nodeType === Node.TEXT_NODE && (S.firstChild.textContent = (S.firstChild.textContent || "").replace(/^\s+/, "")), f.appendChild(S);
        }
        w.forEach((S) => f.appendChild(S));
      }
    }), u && !c && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
const _S = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, zT = Rp(function({
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
  autoSave: f = !0,
  autoSaveKey: h = "paragon-editor-content",
  autoSaveDelay: m = 1e3,
  showRecoveryBanner: g = !0,
  showFloatingToolbar: y = !0,
  maxImageSize: v = 5 * 1024 * 1024,
  onImageUploadStart: b,
  onImageUploadComplete: w,
  onImageUploadError: S,
  onImageUpload: k,
  resolveImageSrc: C,
  showModeToggle: N = !0,
  // New props
  initialMode: x = "wysiwyg",
  onModeChange: M,
  onReady: E,
  onFocus: D,
  onBlur: R,
  onSelectionChange: I,
  onDestroy: O,
  onSave: H,
  onRecover: W,
  onWikiLinkClick: G,
  validateWikiLink: P,
  onWikiLinkSearch: L,
  onLinkClick: F,
  findReplaceOpen: X,
  onFindReplaceChange: K,
  renderToolbar: Z,
  renderFooter: te,
  disabledFeatures: _ = {},
  minHeight: B = "200px",
  maxHeight: j,
  spellCheck: ee = !0,
  headingLevels: ge = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: be = [1, 2, 3],
  // TOC props
  showTableOfContents: Ae = !1,
  tocVisible: ze = !0,
  onTocVisibilityChange: ot,
  tocTitle: Ft = "",
  tocMinLevel: dr = 1,
  tocMaxLevel: fr = 4,
  tocShowLevelIndicators: Kr = !1,
  tocHighlightActive: qr = !0,
  tocTreeView: Gr = !1,
  tocWidth: Xr = "240px",
  tocPosition: En = "right",
  tocScrollOffset: pr = 20,
  onTocItemClick: Nn,
  renderTocItem: Dn,
  tocShowToggleButton: Zr = !0,
  // Raw markdown editor
  autoClosePairs: cs = !0,
  // Performance profiler
  showPerformanceProfiler: us = !1,
  onPerformanceProfilerClose: ds,
  // Auto reorder checklist
  autoReorderChecklist: fs = !1,
  // Expand selection
  progressiveSelectAll: Qr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: Jr = !0,
  enableHexColorHighlight: ps = !0,
  // Error boundary
  onEditorError: hs,
  // AI writing assistant
  aiActions: Tt,
  onAIAction: Rn,
  onAISetupRequired: on
}, ms) {
  const [ce] = V(() => _S()), [ke, ue] = V(x), [Ce, Be] = V(""), de = q(x), Mt = q(""), sn = q(null), [gs, An] = V(0), Ut = !!(Tt && Tt.length > 0 && Rn), { state: Qe, executeAction: eo, abort: $f, reset: Yt } = pC(Rn), [ys, bs] = V(null), [_f, Hf] = V({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), zf = q(Rn);
  zf.current = Rn;
  const Li = q(on);
  Li.current = on;
  const [Bf, Wf] = V([]), [Ff, Uf] = V(0), Yf = U((z, Y) => {
    Wf(z), Uf(Y);
  }, []), vs = q(b), ws = q(w), ks = q(S), xs = q(k), Cs = q(C), Pi = q(G), Ss = q(P), Ts = q(L);
  vs.current = b, ws.current = w, ks.current = S, xs.current = k, Cs.current = C, Pi.current = G, Ss.current = P, Ts.current = L;
  const jf = wn(() => {
    const z = [
      ap.configure({
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
      Uh,
      Yh,
      Kh,
      ip.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      lp.configure({
        types: ["heading", "paragraph"]
      }),
      cp.configure({
        multicolor: !0
      }),
      up.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      xp,
      Cp,
      Sp,
      Tp,
      C1,
      M1,
      X1,
      D1,
      // Add HorizontalRule back without its built-in input rules
      // We handle HR creation via our custom space shortcut handler
      Eh.extend({
        addInputRules() {
          return [];
        }
      })
    ];
    return _.tables || z.push(
      dp.configure({
        resizable: !ce,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      fp,
      Ih,
      Oh,
      Fh
    ), _.taskLists || z.push(
      jh.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Vh.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), ce || z.push(
      Gh.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), _.codeBlocks || z.push(Zh), _.callouts || z.push(rm, T1), _.collapsibleHeadings || z.push(
      w1.configure({
        levels: be
      })
    ), _.images || z.push(
      om.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (Y) => {
          no({
            isOpen: !0,
            src: Y.src,
            alt: Y.alt,
            pos: Y.pos,
            position: { x: Y.rect.left + Y.rect.width / 2, y: Y.rect.bottom }
          });
        },
        resolveImageSrc: Cs.current ? ((...Y) => Cs.current(...Y)) : void 0
      }),
      oC.configure({
        maxFileSize: v,
        onUploadStart: vs.current ? ((...Y) => vs.current(...Y)) : void 0,
        onUploadComplete: ws.current ? ((...Y) => ws.current(...Y)) : void 0,
        onUploadError: ks.current ? ((...Y) => ks.current(...Y)) : void 0,
        onImageUpload: xs.current ? ((Y, oe) => xs.current(Y, oe)) : void 0
      })
    ), _.datePills || z.push(
      rv.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), _.tagPills || z.push(
      av.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: Jr
      })
    ), _.wikiLinks || z.push(
      u1.configure({
        onWikiLinkClick: (Y) => {
          console.log("WikiLink clicked:", Y), Pi.current?.(Y);
        },
        validateLink: (Y) => Ss.current ? Ss.current(Y) : !0
      })
    ), Qr && z.push(Y1), ps && z.push(q1), _.markdownPaste || z.push(
      y1.configure({
        enableMarkdownPaste: !0
      })
    ), z;
  }, [s, ce, v, ge, be, _, Qr]), Et = q(null), an = q(n), ln = q(r), Ms = q(o), hr = q(null);
  an.current = n, ln.current = r, Ms.current = o;
  const $ = op({
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
      window.__tiptapEditor = z, E?.(z);
    },
    onDestroy: () => {
      O?.();
    },
    extensions: jf,
    content: t,
    editable: a,
    autofocus: i,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: ee ? "true" : "false"
      },
      handleClick: (z, Y, oe) => {
        if (F) {
          const se = oe.target.closest("a");
          if (se) {
            const ye = se.getAttribute("href");
            if (ye && F(ye, oe) === !1)
              return oe.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: z }) => {
      Et.current && clearTimeout(Et.current), Et.current = setTimeout(() => {
        if (z.isDestroyed) return;
        const Y = z.getHTML();
        (an.current || ln.current) && (an.current?.(Y), ln.current?.(Y));
      }, 150);
    },
    onFocus: () => {
      D?.();
    },
    onBlur: () => {
      if (Et.current && (clearTimeout(Et.current), Et.current = null, $ && !$.isDestroyed)) {
        const z = $.getHTML();
        if ((an.current || ln.current) && (an.current?.(z), ln.current?.(z)), de.current === "wysiwyg" && hr.current) {
          const Y = hr.current.turndown(z);
          Mt.current = Y, Ms.current?.(Y);
        }
      }
      R?.();
    },
    onSelectionUpdate: ({ editor: z }) => {
      if (I) {
        const { from: Y, to: oe, empty: Se } = z.state.selection;
        I({ from: Y, to: oe, empty: Se });
      }
    }
  });
  J(() => () => {
    if (Et.current && (clearTimeout(Et.current), Et.current = null, $ && !$.isDestroyed)) {
      const z = $.getHTML();
      if ((an.current || ln.current) && (an.current?.(z), ln.current?.(z)), de.current === "wysiwyg" && hr.current) {
        const Y = hr.current.turndown(z);
        Mt.current = Y, Ms.current?.(Y);
      }
    }
  }, []);
  const [Ii, to] = V(!1), [Ln, no] = V(null), [Vf, Kf] = V(!1), qf = X !== void 0 ? X : Vf, jt = U((z) => {
    Kf(z), K?.(z);
  }, [K]), [Gf, Es] = V(0), [Xf, Zf] = V(""), Nt = o1($, {
    storageKey: h,
    debounceMs: m,
    enabled: f,
    onSave: (z) => {
      H?.(z);
    },
    onRecover: (z) => {
      W?.(z);
    }
  }), Vt = QC();
  hr.current = Vt;
  const Oi = q(!1);
  J(() => {
    if (!Oi.current && x === "markdown" && $ && !$.isDestroyed && Vt) {
      const z = $.getHTML(), Y = Vt.turndown(z);
      Be(Y), Mt.current = Y, Oi.current = !0;
    }
  }, [$, Vt, x]);
  const gt = U((z) => {
    if ($) {
      if (z === "markdown" && de.current === "wysiwyg") {
        const Y = $.getHTML(), oe = Vt.turndown(Y);
        Be(oe), Mt.current = oe;
      } else if (z === "wysiwyg" && de.current === "markdown") {
        const Y = ["info", "note", "prompt", "resources", "todo"];
        let oe = Mt.current;
        Y.forEach((le) => {
          const ie = new RegExp(`\`\`\`ad-${le}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          oe = oe.replace(ie, (Me, fe) => {
            const Ne = xe.parse(fe.trim(), { async: !1 });
            return `<div data-callout="" data-type="${le}" class="callout callout-${le}">${Ne}</div>`;
          });
        }), Y.forEach((le) => {
          const ie = new RegExp(`\`\`\`${le}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          oe = oe.replace(ie, (Me, fe) => {
            const Ne = xe.parse(fe.trim(), { async: !1 });
            return `<div data-callout="" data-type="${le}" class="callout callout-${le}">${Ne}</div>`;
          });
        }), oe = oe.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (le, ie, Me) => {
          const fe = ie.split("|").map((Dt) => Dt.trim());
          let Ne = "", Ue = "left", Oe = null;
          fe.length === 1 ? Ne = fe[0] : fe.length === 2 ? (Ne = fe[0], /^\d+$/.test(fe[1]) ? Oe = fe[1] : ["left", "center", "right"].includes(fe[1]) ? Ue = fe[1] : Ne = ie) : fe.length === 3 ? (Ne = fe[0], ["left", "center", "right"].includes(fe[1]) && (Ue = fe[1]), /^\d+$/.test(fe[2]) && (Oe = fe[2])) : Ne = ie;
          const De = Oe ? ` width="${Oe}" style="width: ${Oe}px"` : "", Kt = ` data-align="${Ue}"`;
          return `<img src="${Me.trim()}" alt="${Ne}"${Kt}${De} />`;
        }), oe = oe.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), oe = oe.replace(/@([^@\n]+)@/g, (le, ie) => {
          const Me = mn(ie);
          if (Me) {
            const fe = Qa(Me);
            return `<span data-type="date-pill" data-date="${Me}" class="date-pill ${fe}"><span class="date-icon">📅</span><span class="date-text">${ie.trim()}</span></span>`;
          }
          return le;
        }), Jr && !_.tagPills && (oe = oe.replace(new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"), (le, ie) => {
          const Me = Nr(ie);
          return Wn(Me) ? `<span data-type="tag-pill" data-tag="${Me}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${Me}</span></span>` : le;
        })), oe = oe.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((le, ie) => ie % 2 === 1 ? le : le.replace(/\[\[([^\[\]]+)\]\]/g, (Me, fe) => `<span data-wiki-link data-page-name="${fe.trim()}" class="wiki-link">${fe.trim()}</span>`)).join("");
        let se = xe.parse(oe, { async: !1 });
        se = $S(se), se = se.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (le, ie) => ie.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (Me) => Me.replace(/<tr>([\s\S]*?)<\/tr>/gi, (fe, Ne) => `<tr>${Ne.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
        const ye = (le) => {
          let ie = le;
          return ie = ie.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), ie = ie.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), ie = ie.replace(/~~(.+?)~~/g, "<s>$1</s>"), ie = ie.replace(/`([^`]+)`/g, "<code>$1</code>"), ie = ie.replace(/==(.+?)==/g, "<mark>$1</mark>"), ie = ie.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), ie;
        }, st = (le) => {
          const ie = le.match(/data-align="([^"]*)"/), Me = ie ? ie[1] : "left";
          return `<figure class="image-resizer" style="${{
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          }[Me] || "margin-right: auto;"}">${le.trim()}</figure>`;
        }, un = (le) => {
          if (/<img\s/i.test(le)) {
            const ie = /(<img\s[^>]*\/?>)/gi;
            return le.split(ie).filter((fe) => fe.trim()).map((fe) => /^<img\s/i.test(fe) ? st(fe) : fe.trim() ? `<p>${ye(fe.trim())}</p>` : "").join("");
          }
          if (/^!\[/.test(le)) {
            const ie = le.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (ie)
              return `<figure class="image-resizer" style="margin-right: auto;"><img src="${ie[2]}" alt="${ie[1]}" data-align="left" /></figure>`;
          }
          return `<p>${ye(le)}</p>`;
        }, dn = (le) => {
          const ie = le.match(/^( *)/), Me = ie ? ie[1].length : 0, fe = Math.floor(Me / 2), Ne = le.trimStart(), Ue = Ne.match(/^-\s*\[(x| )\]\s*(.*)$/);
          if (Ue)
            return { type: "task", depth: fe, text: Ue[2].trim(), checked: Ue[1] === "x" };
          const Oe = Ne.match(/^-\s+(.+)$/);
          if (Oe)
            return { type: "ul", depth: fe, text: Oe[1].trim() };
          const De = Ne.match(/^(\d+)\.\s+(.+)$/);
          return De ? { type: "ol", depth: fe, text: De[2].trim(), index: parseInt(De[1], 10) } : null;
        }, Pn = (le) => {
          if (le.length === 0) return "";
          const ie = (Ne, Ue) => {
            let Oe = "", De = Ne;
            const Kt = le[De]?.type || "ul", Dt = Kt === "task", qt = Dt ? '<ul data-type="taskList">' : `<${Kt === "ol" ? "ol" : "ul"}>`, mr = Dt ? "</ul>" : `</${Kt === "ol" ? "ol" : "ul"}>`;
            for (Oe += qt; De < le.length && le[De].depth >= Ue; ) {
              const Rt = le[De];
              if (Rt.depth === Ue) {
                if (Dt ? Oe += `<li data-type="taskItem" data-checked="${Rt.checked || !1}"><p>${ye(Rt.text)}</p>` : Oe += `<li><p>${ye(Rt.text)}</p>`, De + 1 < le.length && le[De + 1].depth > Ue) {
                  const fn = ie(De + 1, le[De + 1].depth);
                  Oe += fn.html, De = fn.nextIdx;
                } else
                  De++;
                Oe += "</li>";
              } else
                De++;
            }
            return Oe += mr, { html: Oe, nextIdx: De };
          }, Me = Math.min(...le.map((Ne) => Ne.depth));
          return ie(0, Me).html;
        };
        se = se.replace(
          /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
          (le, ie, Me, fe) => {
            const Ne = /<img\s/i.test(Me), Ue = /<br\s*\/?>/i.test(Me), Oe = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(Me);
            if (!Ne && !Ue && !Oe) return le;
            let De = Me.trim();
            De = De.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
            const Kt = De.split(/<br\s*\/?>/i).filter((Rt) => Rt.trim());
            if (Kt.length <= 1 && !Oe)
              return Ne ? `${ie}${un(De)}${fe}` : le;
            const Dt = [];
            let qt = [];
            const mr = () => {
              qt.length !== 0 && (Dt.push(Pn(qt)), qt = []);
            };
            for (const Rt of Kt) {
              const fn = dn(Rt);
              if (fn) {
                if (qt.length > 0) {
                  const rp = qt[0].type;
                  fn.depth === 0 && fn.type !== rp && mr();
                }
                qt.push(fn);
              } else
                mr(), Dt.push(un(Rt.trim()));
            }
            return mr(), `${ie}${Dt.join("")}${fe}`;
          }
        ), queueMicrotask(() => {
          $.isDestroyed || $.commands.setContent(se);
        });
      }
      ue(z), de.current = z, M?.(z);
    }
  }, [$, Vt, M]), $i = U((z) => {
    Be(z), Mt.current = z, o?.(z);
  }, [o]), cn = a1($, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: c
  });
  Ap(ms, () => ({
    getEditor: () => $,
    getHTML: () => $?.getHTML() || "",
    getMarkdown: () => $ ? Vt.turndown($.getHTML()) : "",
    getText: () => $?.getText() || "",
    setContent: (z) => {
      $ && !$.isDestroyed && queueMicrotask(() => {
        $.commands.setContent(z);
      });
    },
    clearContent: () => {
      $ && !$.isDestroyed && $.commands.clearContent();
    },
    focus: (z) => {
      $ && !$.isDestroyed && $.commands.focus(z);
    },
    blur: () => {
      $ && !$.isDestroyed && $.commands.blur();
    },
    isEmpty: () => $?.isEmpty || !0,
    isFocused: () => $?.isFocused || !1,
    getMode: () => de.current,
    setMode: (z) => gt(z),
    toggleMode: () => {
      const z = de.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return gt(z), z;
    },
    getWordCount: () => ({
      words: cn.words,
      characters: cn.characters,
      charactersWithSpaces: cn.charactersWithSpaces
    }),
    undo: () => $?.commands.undo(),
    redo: () => $?.commands.redo(),
    canUndo: () => $?.can().undo() || !1,
    canRedo: () => $?.can().redo() || !1,
    insertContent: (z) => $?.commands.insertContent(z),
    insertImage: (z, Y = "") => $?.commands.setImage({ src: z, alt: Y }),
    insertTable: (z = 3, Y = 3) => $?.commands.insertTable({ rows: z, cols: Y, withHeaderRow: !0 }),
    insertCodeBlock: (z) => {
      z ? $?.commands.setCodeBlock({ language: z }) : $?.commands.setCodeBlock();
    },
    insertCallout: (z = "info") => $?.commands.insertCallout?.({ type: z }),
    insertHorizontalRule: () => {
      $ && bo($, $.state.selection.from, $.state.selection.from);
    },
    toggleBold: () => $?.commands.toggleBold(),
    toggleItalic: () => $?.commands.toggleItalic(),
    toggleUnderline: () => $?.commands.toggleUnderline(),
    toggleStrike: () => $?.commands.toggleStrike(),
    toggleCode: () => $?.commands.toggleCode(),
    toggleHighlight: () => $?.commands.toggleHighlight(),
    setHeading: (z) => {
      z === 0 ? $?.commands.setParagraph() : $?.commands.setHeading({ level: z });
    },
    toggleBulletList: () => $?.commands.toggleBulletList(),
    toggleOrderedList: () => $?.commands.toggleOrderedList(),
    toggleTaskList: () => $?.commands.toggleTaskList(),
    toggleBlockquote: () => $?.commands.toggleBlockquote(),
    setLink: (z) => $?.commands.setLink({ href: z }),
    unsetLink: () => $?.commands.unsetLink(),
    openFindReplace: () => {
      jt(!0), Es((z) => z + 1);
    },
    closeFindReplace: () => jt(!1),
    save: () => Nt.save(),
    clearSavedContent: () => Nt.clear(),
    getSelectedText: () => {
      if (!$) return "";
      const { from: z, to: Y } = $.state.selection;
      return $.state.doc.textBetween(z, Y, " ");
    },
    isEditable: () => $?.isEditable || !1,
    setEditable: (z) => $?.setEditable(z),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!$) return [];
      const z = [];
      return $.state.doc.descendants((Y, oe) => {
        if (Y.type.name === "heading") {
          const Se = Y.attrs.level, se = Y.textContent.trim();
          se && z.push({ id: `toc-heading-${oe}`, text: se, level: Se, pos: oe });
        }
      }), z;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (z) => {
      if (!(!$ || $.isDestroyed))
        try {
          const Y = $.state.doc.resolve(z), oe = $.view.nodeDOM(Y.before(Y.depth + 1));
          if (oe instanceof HTMLElement) {
            const Se = $.view.dom.closest(".editor-content-wrapper");
            if (Se) {
              const se = Se.getBoundingClientRect(), st = oe.getBoundingClientRect().top - se.top + Se.scrollTop;
              Se.scrollTo({ top: st - 20, behavior: "smooth" });
            } else
              oe.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          $.commands.setTextSelection(z + 1);
        } catch {
        }
    }
  }), [$, Vt, gt, cn, Nt, jt]), J(() => {
    const z = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => de.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (Y) => {
        if (Y !== "wysiwyg" && Y !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        gt(Y);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const Y = de.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return gt(Y), Y;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        gt("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        gt("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => de.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => de.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => de.current === "markdown" ? Mt.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (Y) => {
        const oe = (Se) => {
          Y(Se.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", oe), () => window.removeEventListener("paragon-editor-mode-change", oe);
      }
    };
    return window.__paragonEditorModeAPI = z, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [gt]), J(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: ke } }));
  }, [ke]), J(() => {
    if (!$ || $.isDestroyed) return;
    const z = (Y) => {
      if (!$.isDestroyed) {
        if ((Y.metaKey || Y.ctrlKey) && Y.key === "k") {
          Y.preventDefault(), to(!0);
          return;
        }
        if (!ce && (Y.metaKey || Y.ctrlKey) && Y.key === "f") {
          if (Y.preventDefault(), $) {
            const { state: oe } = $, { from: Se, to: se } = oe.selection;
            if (Se !== se) {
              const ye = oe.doc.textBetween(Se, se, " ");
              ye.trim() && Zf(ye.trim());
            }
          }
          jt(!0), Es((oe) => oe + 1);
          return;
        }
        if (!ce && (Y.metaKey || Y.ctrlKey) && Y.key === "h") {
          Y.preventDefault(), jt(!0);
          return;
        }
        if (Y.key === " ")
          try {
            const { state: oe } = $, { selection: Se } = oe, { $from: se } = Se, ye = se.nodeBefore?.textContent || "";
            if (ye === "#####") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - 5, to: se.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (ye === "####") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - 4, to: se.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (ye === "###") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - 3, to: se.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (ye === "##") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - 2, to: se.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (ye === "#") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - 1, to: se.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (ye === "-" || ye === "*") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - 1, to: se.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(ye)) {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - ye.length, to: se.pos }).toggleOrderedList().run();
              return;
            }
            const st = /^(-\s*)?\[([ x])?\]$/.exec(ye);
            if (st) {
              Y.preventDefault();
              const un = st[2] === "x", dn = oe.schema.nodes.taskList, Pn = oe.schema.nodes.taskItem;
              if (dn && Pn) {
                const le = oe.tr, ie = se.pos - ye.length, Me = se.pos;
                le.delete(ie, Me);
                const Ne = le.doc.resolve(ie).blockRange();
                if (Ne) {
                  const Ue = [
                    { type: dn, attrs: {} },
                    { type: Pn, attrs: { checked: un } }
                  ];
                  le.wrap(Ne, Ue), $.view.dispatch(le);
                  return;
                }
              }
              $.chain().focus().deleteRange({ from: se.pos - ye.length, to: se.pos }).toggleTaskList().run();
              return;
            }
            if (ye === ">") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - 1, to: se.pos }).toggleBlockquote().run();
              return;
            }
            if (ye === "```") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: se.pos - 3, to: se.pos }).toggleCodeBlock().run();
              return;
            }
            if (ye === "---" || ye === "***") {
              Y.preventDefault(), bo($, se.pos - 3, se.pos);
              return;
            }
            if (ye === "—-") {
              Y.preventDefault(), bo($, se.pos - 2, se.pos);
              return;
            }
            if (ye === "—") {
              Y.preventDefault(), bo($, se.pos - 1, se.pos);
              return;
            }
          } catch (oe) {
            console.warn("Space shortcut error:", oe);
          }
      }
    };
    return document.addEventListener("keydown", z, !0), () => document.removeEventListener("keydown", z, !0);
  }, [$, ce, jt]);
  const _i = U((z, Y) => {
    if (!Ut) {
      Li.current?.();
      return;
    }
    if (!$) return;
    let oe = { top: 0, left: 0 };
    if (Y) {
      const Se = Y.getBoundingClientRect();
      oe = { top: Se.bottom + 4, left: Se.left };
    } else {
      const { from: Se, to: se } = $.state.selection, ye = $.view.coordsAtPos(Se), st = $.view.coordsAtPos(se);
      oe = { top: st.bottom + 8, left: (ye.left + st.left) / 2 };
    }
    bs({ scope: z, position: oe });
  }, [Ut, $]), Qf = U((z, Y) => {
    if (!$ || !Tt) return;
    const oe = Tt.find((Pn) => Pn.id === z);
    if (!oe) return;
    const { from: Se, to: se } = $.state.selection, ye = Se !== se ? $.state.doc.textBetween(Se, se, `
`) : "", st = oe.scope === "document" || !ye ? $.getText() : ye, un = $.view.coordsAtPos(Se), dn = $.view.coordsAtPos(se);
    Hf({
      selectionTop: un.top,
      selectionBottom: dn.bottom,
      selectionCenterX: (un.left + dn.right) / 2
    }), bs(null), eo(z, oe.label, st, { from: Se, to: se }, Y);
  }, [$, Tt, eo]), Jf = U(() => {
    if (!$ || Qe.status !== "complete") return;
    const { selectionRange: z, result: Y } = Qe;
    $.chain().focus().setTextSelection(z).deleteSelection().insertContent(Y).run(), Yt();
  }, [$, Qe, Yt]), ep = U(() => {
    if (!$ || Qe.status !== "complete") return;
    const { selectionRange: z, result: Y } = Qe;
    $.chain().focus().setTextSelection(z.to).insertContent(`
` + Y).run(), Yt();
  }, [$, Qe, Yt]), tp = U(() => {
    if (!(Qe.status !== "complete" && Qe.status !== "error"))
      if (Qe.status === "complete") {
        const { action: z, actionLabel: Y, inputText: oe, selectionRange: Se } = Qe;
        Yt(), eo(z, Y, oe, Se);
      } else
        Yt();
  }, [Qe, Yt, eo]);
  if (!$)
    return /* @__PURE__ */ p("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: /* @__PURE__ */ A("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ p("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const Hi = /* @__PURE__ */ p(
    Q0,
    {
      editor: $,
      onOpenLinkPopover: () => to(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        jt(!0), Es((z) => z + 1);
      },
      disabledFeatures: _,
      autoReorderChecklist: fs,
      aiEnabled: Ut || !!on,
      onAISparklesClick: (z) => _i("document", z)
    }
  ), zi = /* @__PURE__ */ A("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ p(
      i1,
      {
        status: Nt.status,
        lastSaved: Nt.lastSaved
      }
    ),
    /* @__PURE__ */ p("div", { className: "word-count", children: /* @__PURE__ */ A("span", { children: [
      cn.words,
      " words"
    ] }) })
  ] }), np = {
    minHeight: B,
    ...j && { maxHeight: j, overflowY: "auto" }
  };
  return /* @__PURE__ */ A("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: [
    f && g && Nt.hasRecoverableContent && /* @__PURE__ */ p(
      l1,
      {
        onRecover: () => {
          Nt.recover();
        },
        onDismiss: Nt.dismissRecovery
      }
    ),
    u && /* @__PURE__ */ A("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z($, Hi) : Hi,
      N && /* @__PURE__ */ A("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ p(
          "button",
          {
            onClick: () => gt("wysiwyg"),
            className: `editor-mode-toggle-btn ${ke === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ p(mh, {})
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            onClick: () => gt("markdown"),
            className: `editor-mode-toggle-btn ${ke === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ p(Wa, {})
          }
        )
      ] })
    ] }),
    !ce && /* @__PURE__ */ p(
      J0,
      {
        editor: $,
        isOpen: qf,
        onClose: () => jt(!1),
        focusTrigger: Gf,
        initialSearchQuery: Xf,
        editorMode: ke,
        rawMarkdown: Ce,
        onRawMarkdownChange: $i,
        onMatchesChange: Yf
      }
    ),
    /* @__PURE__ */ p(n1, { editor: $ }),
    /* @__PURE__ */ A("div", { className: `editor-main-area ${Ae ? "editor-with-toc" : ""}`, children: [
      Ae && En === "left" && /* @__PURE__ */ p(
        ec,
        {
          editor: $,
          visible: ze,
          onVisibilityChange: ot,
          title: Ft,
          minLevel: dr,
          maxLevel: fr,
          showLevelIndicators: Kr,
          highlightActive: qr,
          treeView: Gr,
          width: Xr,
          position: En,
          scrollOffset: pr,
          onItemClick: Nn,
          renderItem: Dn,
          showToggleButton: Zr,
          scrollContainerRef: sn
        }
      ),
      /* @__PURE__ */ A(
        uC,
        {
          resetKey: `${t}-${gs}`,
          onRetry: () => An((z) => z + 1),
          onClearContent: () => {
            $ && $.commands.clearContent(), n?.(""), r?.(""), o?.(""), An((z) => z + 1);
          },
          onError: hs,
          children: [
            /* @__PURE__ */ p("div", { className: "editor-content-wrapper", ref: sn, style: np, children: ke === "wysiwyg" ? /* @__PURE__ */ A(He, { children: [
              /* @__PURE__ */ p(sp, { editor: $, className: "editor-content" }),
              !_.images && !_.dragAndDrop && /* @__PURE__ */ p(sC, { containerRef: sn, enabled: a }),
              !ce && y && /* @__PURE__ */ p(tm, { editor: $, suppressWhenLinkPopoverOpen: Ii, aiEnabled: Ut || !!on, onAISparklesClick: (z) => _i("selection", z) }),
              ys && Tt && /* @__PURE__ */ p(
                mC,
                {
                  actions: Tt,
                  scope: ys.scope,
                  position: ys.position,
                  onAction: Qf,
                  onClose: () => bs(null)
                }
              ),
              Qe.status !== "idle" && /* @__PURE__ */ p(
                gC,
                {
                  state: Qe,
                  position: _f,
                  onReplace: Jf,
                  onInsert: ep,
                  onRetry: tp,
                  onDiscard: () => {
                    $f(), Yt();
                  }
                }
              ),
              !_.slashCommands && /* @__PURE__ */ p(fv, { editor: $, disabledFeatures: _ }),
              !_.wikiLinks && Ts.current && /* @__PURE__ */ p(
                yv,
                {
                  editor: $,
                  onSearch: Ts.current
                }
              ),
              /* @__PURE__ */ p(
                Qh,
                {
                  editor: $,
                  isOpen: Ii,
                  onClose: () => to(!1)
                }
              ),
              !ce && /* @__PURE__ */ p(
                Jh,
                {
                  editor: $,
                  onEditLink: () => to(!0)
                }
              ),
              !_.images && Ln?.isOpen && /* @__PURE__ */ p(
                aC,
                {
                  src: Ln.src,
                  alt: Ln.alt,
                  position: Ln.position,
                  onSave: (z, Y) => {
                    $.chain().focus().setNodeSelection(Ln.pos).updateAttributes("resizableImage", {
                      src: z,
                      alt: Y
                    }).run(), no(null);
                  },
                  onDelete: () => {
                    $.chain().focus().setNodeSelection(Ln.pos).deleteSelection().run(), no(null);
                  },
                  onClose: () => no(null)
                }
              )
            ] }) : /* @__PURE__ */ p(
              iC,
              {
                content: Ce,
                onChange: $i,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: Bf,
                currentMatchIndex: Ff,
                autoClosePairs: cs
              }
            ) }),
            /* @__PURE__ */ p(dC, { scrollContainerRef: sn })
          ]
        }
      ),
      Ae && En === "right" && /* @__PURE__ */ p(
        ec,
        {
          editor: $,
          visible: ze,
          onVisibilityChange: ot,
          title: Ft,
          minLevel: dr,
          maxLevel: fr,
          showLevelIndicators: Kr,
          highlightActive: qr,
          treeView: Gr,
          width: Xr,
          position: En,
          scrollOffset: pr,
          onItemClick: Nn,
          renderItem: Dn,
          showToggleButton: Zr,
          scrollContainerRef: sn
        }
      )
    ] }),
    c && (te ? te(
      { words: cn.words, characters: cn.characters },
      Nt.status,
      zi
    ) : zi),
    /* @__PURE__ */ p(cC, { visible: us, onClose: ds, editor: $ })
  ] });
}), BT = Fo.create({
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
      tr(this.options.HTMLAttributes, t, {
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
}), If = {
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
}, HS = {
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
}, zS = {
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
}, BS = {
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
}, Tr = {
  dark: If,
  light: HS,
  sepia: zS,
  nord: BS
};
function WS(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function WT(e, t, n, r) {
  const o = Tr[e] || If;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const Of = pc(null);
function FT({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = V(t), s = Tr[r] || Tr.dark, a = U((l) => {
    Tr[l] && o(l);
  }, []);
  J(() => {
    n?.current && WS(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: r,
    setTheme: a,
    availableThemes: Object.keys(Tr)
  };
  return /* @__PURE__ */ p(Of.Provider, { value: i, children: e });
}
function UT() {
  const e = hc(Of);
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
function YT({ node: e, updateAttributes: t }) {
  const [n, r] = V(!1), o = e.attrs.language || "plaintext";
  uc.find((a) => a.value === o)?.label;
  const s = U(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ A(Xn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ p(
          "select",
          {
            value: o,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: uc.map(({ value: a, label: i }) => /* @__PURE__ */ p("option", { value: a, children: i }, a))
          }
        ),
        /* @__PURE__ */ p(en, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ p(rr, { size: 14 }) : /* @__PURE__ */ p(or, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ p("pre", { className: "code-block-pre", children: /* @__PURE__ */ p("code", { children: /* @__PURE__ */ p(Ea, {}) }) })
  ] });
}
export {
  i1 as AutoSaveIndicator,
  BT as Callout,
  T1 as CalloutInputRule,
  YT as CodeBlockComponent,
  w1 as CollapsibleHeading,
  Gh as CollapsibleList,
  rv as DatePill,
  FT as EditorThemeProvider,
  Q0 as EditorToolbar,
  J0 as FindReplace,
  tm as FloatingToolbar,
  sC as ImageDropZone,
  oC as ImageUpload,
  zT as MarkdownEditor,
  C1 as MarkdownLinkInputRule,
  y1 as MarkdownPasteSafe,
  Uh as MixedBulletList,
  Kh as MixedListItem,
  Yh as MixedOrderedList,
  Vh as MixedTaskItem,
  jh as MixedTaskList,
  l1 as RecoveryBanner,
  om as ResizableImage,
  M1 as SearchHighlight,
  n1 as SelectAllActionBar,
  X1 as SelectAllOccurrences,
  fv as SlashCommands,
  D1 as TabIndent,
  ec as TableOfContents,
  av as TagPill,
  u1 as WikiLinkSafe,
  WS as applyTheme,
  WT as createCustomTheme,
  If as darkTheme,
  Qa as getDateVariant,
  Wn as isValidTag,
  HS as lightTheme,
  we as lowlight,
  BS as nordTheme,
  Nr as normalizeTag,
  mn as parseDateFromMarkdown,
  zS as sepiaTheme,
  Tr as themes,
  o1 as useAutoSave,
  UT as useEditorTheme,
  a1 as useWordCount
};
//# sourceMappingURL=paragon.js.map
