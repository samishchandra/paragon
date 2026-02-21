import { jsxs as A, jsx as p, Fragment as ze } from "react/jsx-runtime";
import { ReactNodeViewRenderer as _o, NodeViewWrapper as Ir, NodeViewContent as Ca, useEditorState as ac, useEditor as Zf, EditorContent as Qf } from "@tiptap/react";
import Jf from "@tiptap/starter-kit";
import ep from "@tiptap/extension-placeholder";
import tp from "@tiptap/extension-text-align";
import np from "@tiptap/extension-highlight";
import rp from "@tiptap/extension-link";
import { Table as op } from "@tiptap/extension-table";
import sp from "@tiptap/extension-table-row";
import ap from "@tiptap/extension-table-cell";
import ip from "@tiptap/extension-table-header";
import { Plugin as Ke, PluginKey as qe, TextSelection as Ho, AllSelection as lp } from "@tiptap/pm/state";
import { DecorationSet as Qe, Decoration as lt } from "@tiptap/pm/view";
import { Extension as mt, Node as zo, mergeAttributes as Zn, InputRule as Je, Mark as ic } from "@tiptap/core";
import cp from "@tiptap/extension-bullet-list";
import up from "@tiptap/extension-ordered-list";
import dp from "@tiptap/extension-list-item";
import fp from "@tiptap/extension-task-list";
import pp from "@tiptap/extension-task-item";
import { findWrapping as $i, canJoin as hp } from "@tiptap/pm/transform";
import mp from "@tiptap/extension-underline";
import gp from "@tiptap/extension-subscript";
import yp from "@tiptap/extension-superscript";
import bp from "@tiptap/extension-typography";
import vp from "@tiptap/extension-code-block-lowlight";
import { createLowlight as wp } from "lowlight";
import * as C from "react";
import Q, { useState as V, useRef as q, useEffect as J, useCallback as j, memo as Qn, createContext as lc, useContext as cc, useLayoutEffect as Bo, useMemo as yn, Component as kp, useReducer as xp, forwardRef as Cp, useImperativeHandle as Sp } from "react";
import { ChevronDown as en, Check as Jn, Copy as er, Link2 as Sa, ExternalLink as Tp, Pencil as Mp, Unlink as Ep, Bold as Ta, Italic as Ma, Underline as Ea, Strikethrough as Na, Code as uc, Highlighter as dc, Link as Da, Quote as Ra, List as Aa, ListOrdered as La, CheckSquare as Pa, FileCode as Np, Sparkles as Wo, ListTodo as Ia, BookOpen as Oa, MessageSquareText as fc, StickyNote as pc, Info as xo, ChevronRight as hc, ChevronLeftIcon as Dp, ChevronRightIcon as Rp, ChevronDownIcon as Ap, Calendar as mc, Hash as Lp, Image as $a, X as $t, Type as Fo, Heading1 as Pp, Heading2 as Ip, Heading3 as Op, Heading4 as $p, Heading5 as _p, Code2 as gc, Table as Zs, Minus as yc, FileText as _a, Plus as Ha, Undo as Hp, Redo as zp, IndentIncrease as Bp, IndentDecrease as Wp, PenLine as Fp, Library as Up, Columns as _i, Trash2 as zn, Rows as Hi, ToggleLeft as zi, ArrowUpDown as Yp, Search as jp, ChevronUp as Vp, MousePointerClick as Kp, CaseSensitive as qp, WholeWord as Gp, Regex as Xp, Replace as Qs, ReplaceAll as Zp, Cloud as Qp, Loader2 as bc, CloudOff as Jp, AlertCircle as eh, RotateCcw as za, ImagePlus as th, Activity as nh, Maximize2 as vc, Minimize2 as wc, AlertTriangle as rh, CheckCircle2 as oh, MessageSquare as kc, RefreshCw as sh, SpellCheck as ah, PanelRightClose as ih, PanelRightOpen as lh, Eye as ch } from "lucide-react";
import Ba from "highlight.js/lib/languages/javascript";
import Wa from "highlight.js/lib/languages/typescript";
import xc from "highlight.js/lib/languages/python";
import Fa from "highlight.js/lib/languages/xml";
import uh from "highlight.js/lib/languages/css";
import dh from "highlight.js/lib/languages/json";
import Uo from "highlight.js/lib/languages/bash";
import fh from "highlight.js/lib/languages/sql";
import ph from "highlight.js/lib/languages/java";
import Cc from "highlight.js/lib/languages/cpp";
import Sc from "highlight.js/lib/languages/go";
import Tc from "highlight.js/lib/languages/rust";
import Mc from "highlight.js/lib/languages/markdown";
import Ec from "highlight.js/lib/languages/yaml";
import Nc from "highlight.js/lib/languages/diff";
import * as Dc from "react-dom";
import hh, { createPortal as mh } from "react-dom";
import gh from "@tiptap/extension-image";
import { createRoot as yh } from "react-dom/client";
import { Fragment as bh } from "@tiptap/pm/model";
import { liftListItem as Bi, sinkListItem as Wi } from "@tiptap/pm/schema-list";
import { undo as vh, redo as wh } from "@tiptap/pm/history";
const kh = new qe("tableCellMenu");
let Fi = !1, Jr = null;
function xh() {
  Fi || (Fi = !0, document.addEventListener("mouseover", (e) => {
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
function Ch(e) {
  return xh(), new Ke({
    key: kh,
    state: {
      init() {
        return Qe.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && Jr ? Jr.map(t.mapping, t.doc) : (Jr = Sh(o.doc, e), Jr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Sh(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = lt.widget(o + 1, (a) => {
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
          t.chain().focus().setTextSelection(o + 1).run(), Th(m, t, o, g);
        }), i.appendChild(l), i;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), Qe.create(e, n);
}
function Th(e, t, n, r) {
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
  const k = [
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
    { label: "Copy Table", icon: "copy", action: () => Mh(t) }
  ], M = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, w = h ? "#2a2a2a" : "#f5f5f5", S = h ? "#ff6b6b" : "#dc2626", N = h ? "#999999" : "#666666", x = h ? "#333333" : "#e5e5e5";
  k.forEach((D) => {
    if (D.label === "divider") {
      const R = document.createElement("div");
      R.style.cssText = "height:1px;background:" + x + ";margin:4px 0;", s.appendChild(R);
    } else {
      const R = document.createElement("button");
      R.type = "button";
      const I = D.destructive ? S : y;
      R.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + I + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const O = M[D.icon || ""] || "", H = D.destructive ? S : N;
      R.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + H + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + D.label + "</span>", R.addEventListener("mouseenter", () => {
        R.style.background = D.destructive ? h ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : w;
      }), R.addEventListener("mouseleave", () => {
        R.style.background = "transparent";
      }), R.addEventListener("click", (W) => {
        W.preventDefault(), W.stopPropagation(), D.action && D.action(), s.remove();
      }), s.appendChild(R);
    }
  }), document.body.appendChild(s);
  const T = (D) => {
    const R = D.target;
    if (s.contains(R) || R.classList.contains("table-cell-menu-btn"))
      return;
    const I = R.closest('[role="dialog"]');
    I && I.contains(s) || (s.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", E));
  }, E = (D) => {
    D.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", E));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", T), document.addEventListener("keydown", E);
  }, 0);
}
function Mh(e) {
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
const Eh = ap.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Ch(this.editor)
    ];
  }
}), Nh = ip.extend({}), Cr = new qe("tableSorting");
let hn = null, yr = null;
function Dh(e) {
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
function Rh(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function Ah(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (m, g) => {
    if (m.type.name === "table" && g === t)
      return s = m, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = hn?.tablePos === t && hn?.columnIndex === n && hn?.direction === "asc" ? "desc" : "asc";
  hn = { tablePos: t, columnIndex: n, direction: a }, yr = null;
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
    Ui(n, a), o.dispatch(r.tr.setMeta(Cr, { updated: !0 }));
    return;
  }
  const c = u.map((m) => {
    let g = "", y = 0;
    return m.node.forEach((v) => {
      y === n && (g = v.textContent || ""), y++;
    }), { ...m, sortValue: Dh(g) };
  }), d = c.map((m, g) => g);
  c.sort((m, g) => Rh(m.sortValue, g.sortValue, a));
  const f = c.map((m, g) => u.indexOf(m));
  if (d.some((m, g) => m !== f[g])) {
    const m = [];
    l.forEach((v) => m.push(v.node)), c.forEach((v) => m.push(v.node));
    const g = s.type.create(s.attrs, m), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(Cr, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Cr, { updated: !0 }));
  Ui(n, a);
}
function Ui(e, t) {
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
function Lh(e, t, n, r) {
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
    c.preventDefault(), c.stopPropagation(), Ah(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function Ph(e) {
  return new Ke({
    key: Cr,
    state: {
      init() {
        return Qe.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Cr);
        return !t.docChanged && !s?.updated && yr ? yr.map(t.mapping, t.doc) : (yr = Ih(o.doc, e), yr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Ih(e, t) {
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
              c.forEach((k, M) => {
                k.type.name === "paragraph" && (h = f + 1 + M + k.nodeSize - 1);
              });
              const g = hn?.tablePos === s && hn?.columnIndex === l ? hn.direction : null, y = l, v = s, b = lt.widget(h, () => Lh(g, v, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(b);
            }
            u += c.nodeSize, l++;
          });
        }
      });
    }
  }), Qe.create(e, n);
}
const Oh = mt.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Ph(this.editor)];
  }
});
function Ua(e, t, n, r, o, s = {}) {
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
const $h = cp.extend({
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
          if (Ua(n, f, a, u, c, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), _h = up.extend({
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
          if (Ua(n, f, l, u, c, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Hh = fp.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: a }) => {
        const { selection: i } = n, { $from: l, $to: u } = i, c = l.blockRange(u);
        if (!c)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let h = !1;
        for (let w = l.depth; w > 0; w--)
          if (l.node(w).type === d) {
            h = !0, l.before(w);
            break;
          }
        if (h)
          return t.liftListItem("taskItem");
        const m = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let v = null, b = -1;
        for (let w = l.depth; w > 0; w--) {
          const S = l.node(w);
          if (S.type === m || S.type === g) {
            v = S, b = l.before(w);
            break;
          }
        }
        if (v) {
          if (!o) return !0;
          const w = b, S = r.doc.nodeAt(w);
          if (!S) return !1;
          r.setNodeMarkup(w, d, S.attrs);
          const N = r.doc.nodeAt(w);
          if (!N) return !1;
          const x = [];
          N.forEach((T, E) => {
            T.type === y && x.push(w + 1 + E);
          });
          for (let T = x.length - 1; T >= 0; T--) {
            const E = x[T], D = r.doc.nodeAt(E);
            D && D.type === y && r.setNodeMarkup(E, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const k = $i(c, d);
        if (k) {
          r.wrap(c, k);
          const { $from: w } = r.selection;
          let S = -1;
          for (let N = w.depth; N > 0; N--)
            if (w.node(N).type === d) {
              S = w.before(N);
              break;
            }
          if (S >= 0) {
            const N = r.doc.nodeAt(S);
            if (N) {
              const x = [];
              N.forEach((T, E) => {
                T.type === y && x.push(S + 1 + E);
              });
              for (let T = x.length - 1; T >= 0; T--) {
                const E = x[T], D = r.doc.nodeAt(E);
                D && D.type === y && r.setNodeMarkup(E, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const M = $i(c, m);
        if (M) {
          r.wrap(c, M);
          const { $from: w } = r.selection;
          let S = -1;
          for (let N = w.depth; N > 0; N--)
            if (w.node(N).type === m) {
              S = w.before(N);
              break;
            }
          return S >= 0 && Ua(r, S, d, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), zh = pp.extend({
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
          return f.setSelection(Ho.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
        key: new qe("taskItemInputRule"),
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
              b && b.type === t && hp(m.doc, f - 1) && m.join(f - 1);
            }
            return n.dispatch(m), !0;
          }
        }
      })
    ];
  }
}), Bh = dp.extend({
  content: "paragraph block*"
}), Yi = new qe("collapsibleList");
function Js(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function ea(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function Wh(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (r === -1 && (r = s), o = s + a.nodeSize), s += a.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let Bn = null;
function Ss(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !ea(o))
      return !0;
    const a = Js(o, s), i = t.collapsedItems.has(a);
    r.push(
      lt.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${i ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const l = o.firstChild;
    if (l && l.type.name === "paragraph") {
      const u = s + 1 + l.nodeSize - 1, c = lt.widget(
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
            m.classList.remove("collapsed", "expanded"), m.classList.add(y ? "expanded" : "collapsed"), m.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), Bn && Bn.dispatch(
              Bn.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), h.appendChild(m), h;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      r.push(c);
    }
    if (i && Wh(o, s)) {
      let c = s + 1;
      o.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && r.push(
          lt.node(c, c + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), c += d.nodeSize;
      });
    }
    return !0;
  }), Qe.create(e, r);
}
const Fh = mt.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !ea(o))
          return !1;
        const s = Js(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && ea(o) && n.collapsedItems.add(Js(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ke({
        key: Yi,
        view(n) {
          return Bn = n, {
            update(r) {
              Bn = r;
            },
            destroy() {
              Bn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Ss(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Ss(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Yi.getState(n);
            return r?.decorations ? r.decorations : Ss(n.doc, e, t);
          }
        }
      })
    ];
  }
}), ke = wp();
ke.register("javascript", Ba);
ke.register("js", Ba);
ke.register("jsx", Ba);
ke.register("typescript", Wa);
ke.register("ts", Wa);
ke.register("tsx", Wa);
ke.register("python", xc);
ke.register("py", xc);
ke.register("xml", Fa);
ke.register("html", Fa);
ke.register("svg", Fa);
ke.register("css", uh);
ke.register("json", dh);
ke.register("bash", Uo);
ke.register("sh", Uo);
ke.register("shell", Uo);
ke.register("zsh", Uo);
ke.register("sql", fh);
ke.register("java", ph);
ke.register("cpp", Cc);
ke.register("c", Cc);
ke.register("go", Sc);
ke.register("golang", Sc);
ke.register("rust", Tc);
ke.register("rs", Tc);
ke.register("markdown", Mc);
ke.register("md", Mc);
ke.register("yaml", Ec);
ke.register("yml", Ec);
ke.register("diff", Nc);
ke.register("patch", Nc);
function Uh({ node: e, updateAttributes: t, extension: n }) {
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
  const l = j(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (f) {
      console.error("Failed to copy:", f);
    }
  }, [e.textContent]), u = n.options.lowlight?.listLanguages?.() || [], c = e.attrs.language || "plaintext", d = c === "plaintext" ? "Plain Text" : c.charAt(0).toUpperCase() + c.slice(1);
  return /* @__PURE__ */ A(Ir, { className: "code-block-wrapper", ref: i, children: [
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
          children: r ? /* @__PURE__ */ p(Jn, { size: 14 }) : /* @__PURE__ */ p(er, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ p("pre", { className: `code-block-pre ${s ? "" : "code-block-deferred"}`, children: /* @__PURE__ */ p(Ca, { className: s ? `language-${c}` : "language-plaintext" }) })
  ] });
}
const Yh = vp.extend({
  addNodeView() {
    return _o(Uh);
  }
}).configure({
  lowlight: ke,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function Bt({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: r
}) {
  const o = j(
    (i) => {
      r?.(i), i.stopPropagation();
    },
    [r]
  ), s = j((i) => {
    i.stopPropagation();
  }, []), a = j((i) => {
    i.stopPropagation();
  }, []);
  return mh(
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
function jh({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = V(""), s = q(null), a = q(null), [i, l] = V({ top: 0, left: 0 });
  J(() => {
    if (t) {
      const m = e.getAttributes("link").href || "";
      o(m);
      try {
        const { view: g } = e, { from: y } = g.state.selection, v = g.coordsAtPos(y), b = v.bottom + 8, k = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        l({ top: b, left: k });
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
  const u = j((m) => {
    if (m?.preventDefault(), r.trim()) {
      let g = r.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), c = j((m) => {
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
          /* @__PURE__ */ p(Sa, { className: "link-popover-icon", size: 16 }),
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
  return /* @__PURE__ */ p(Bt, { children: h });
}
function Vh({ editor: e, onEditLink: t }) {
  const [n, r] = V({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = q(null), s = q(null), a = j((k) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const M = k.getAttribute("href") || "", w = k.getBoundingClientRect(), S = w.bottom + 8, N = Math.max(16, Math.min(w.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: M,
          position: { top: S, left: N },
          linkElement: k
        });
      } catch (M) {
        console.warn("LinkHoverTooltip: Error showing tooltip", M);
      }
    }
  }, [e]), i = j(() => {
    s.current = setTimeout(() => {
      r((k) => ({ ...k, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = j(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  J(() => {
    if (!e || e.isDestroyed) return;
    const k = e.view.dom;
    if (!k) return;
    const M = (S) => {
      const x = S.target.closest("a");
      x && k.contains(x) && a(x);
    }, w = (S) => {
      const N = S.target, x = S.relatedTarget;
      if (N.closest("a")) {
        if (x && o.current?.contains(x))
          return;
        i();
      }
    };
    return k.addEventListener("mouseover", M), k.addEventListener("mouseout", w), () => {
      k.removeEventListener("mouseover", M), k.removeEventListener("mouseout", w), s.current && clearTimeout(s.current);
    };
  }, [e, a, i]), J(() => {
    if (!n.isVisible) return;
    const k = () => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, M = e.view.dom.closest(".editor-content-wrapper");
    return M?.addEventListener("scroll", k), window.addEventListener("scroll", k, !0), () => {
      M?.removeEventListener("scroll", k), window.removeEventListener("scroll", k, !0);
    };
  }, [n.isVisible, e]);
  const [u, c] = V(!1), d = j(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      c(!0), setTimeout(() => c(!1), 1500);
    });
  }, [n.url]), f = j(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), h = j(() => {
    if (n.linkElement) {
      const { view: k } = e, { doc: M } = k.state;
      let w = null, S = null;
      M.descendants((N, x) => {
        if (N.isText && N.marks.some((T) => T.type.name === "link")) {
          const T = k.nodeDOM(x);
          if (T && (T === n.linkElement || T.parentElement === n.linkElement))
            return w = x, S = x + N.nodeSize, !1;
        }
        return !0;
      }), w !== null && S !== null ? e.chain().focus().setTextSelection({ from: w, to: S }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((k) => ({ ...k, isVisible: !1 }));
  }, [e, n.linkElement]), m = j(() => {
    if (n.linkElement) {
      const { view: k } = e, { doc: M } = k.state;
      M.descendants((w, S) => {
        if (w.isText && w.marks.some((N) => N.type.name === "link")) {
          const N = k.nodeDOM(S);
          if (N && (N === n.linkElement || N.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: S, to: S + w.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((k) => ({ ...k, isVisible: !1 })), t();
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
              /* @__PURE__ */ p(Tp, { size: 13, className: "link-hover-tooltip-link-icon" }),
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
              children: /* @__PURE__ */ p(Mp, { size: 14 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: d,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: u ? /* @__PURE__ */ p(Jn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ p(er, { size: 14 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ p(Ep, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ p(Bt, { children: b });
}
const it = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ p(
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
), ji = () => /* @__PURE__ */ p("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), Vi = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Kh = Qn(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: a, executeCommand: i }) {
  const [l, u] = V(!1), c = q(null), d = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : a ? "h5" : "paragraph", f = Vi.find((m) => m.value === d)?.shortLabel || "P";
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
        children: Vi.map((m) => {
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
}), qh = Qn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const a = q(null), i = ac({
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
  }), [l, u] = V(!1), [c, d] = V(""), [f, h] = V(!1), [m, g] = V({ top: 0, left: 0 }), y = q(null), v = q(null), b = q(null), k = j(() => {
    if (c) {
      let T = c.trim();
      !/^https?:\/\//i.test(T) && !T.startsWith("mailto:") && (T = "https://" + T), t.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    u(!1), d("");
  }, [t, c]), M = (T) => {
    T.preventDefault(), T.stopPropagation();
    const E = t.getAttributes("link").href;
    d(E || ""), u(!0);
  }, w = j((T, E) => {
    T.preventDefault(), T.stopPropagation(), E();
  }, []);
  J(() => {
    if (!t || t.isDestroyed) return;
    const T = () => {
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
          const U = Z ? K - Z : K;
          B = Math.max(X, Math.min(U - L - X, B));
          let ee = G.top - F - 10 - te;
          ee < X && (ee = P.bottom + 10 - te), f ? g({ top: Math.max(X, ee), left: B }) : (b.current && clearTimeout(b.current), b.current = setTimeout(() => {
            g({ top: Math.max(X, ee), left: B }), h(!0);
          }, 50));
        } catch (E) {
          console.warn("FloatingToolbar: Error updating position", E);
        }
    };
    return t.on("selectionUpdate", T), () => {
      t.off("selectionUpdate", T), v.current && clearTimeout(v.current), b.current && clearTimeout(b.current);
    };
  }, [t, f]);
  const S = (T) => {
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
      onMouseDown: S,
      children: /* @__PURE__ */ A("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ p(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: c,
            onChange: (T) => d(T.target.value),
            onKeyDown: (T) => {
              T.key === "Enter" && (T.preventDefault(), k()), T.key === "Escape" && (u(!1), d(""));
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
              onMouseDown: (T) => {
                T.preventDefault(), k();
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
        left: m.left
      },
      onMouseDown: S,
      children: [
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBold().run()),
            isActive: i?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ p(Ta, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleItalic().run()),
            isActive: i?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ p(Ma, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleUnderline().run()),
            isActive: i?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ p(Ea, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleStrike().run()),
            isActive: i?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ p(Na, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleCode().run()),
            isActive: i?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ p(uc, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleHighlight().run()),
            isActive: i?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ p(dc, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: M,
            isActive: i?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ p(Da, { size: N })
          }
        ),
        /* @__PURE__ */ p(ji, {}),
        /* @__PURE__ */ p(
          Kh,
          {
            editor: t,
            isH1: i?.isH1 ?? !1,
            isH2: i?.isH2 ?? !1,
            isH3: i?.isH3 ?? !1,
            isH4: i?.isH4 ?? !1,
            isH5: i?.isH5 ?? !1,
            executeCommand: w
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBlockquote().run()),
            isActive: i?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ p(Ra, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBulletList().run()),
            isActive: i?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ p(Aa, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleOrderedList().run()),
            isActive: i?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ p(La, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleTaskList().run()),
            isActive: i?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ p(Pa, { size: N })
          }
        ),
        /* @__PURE__ */ p(
          it,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: i?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ p(Np, { size: N })
          }
        ),
        o && /* @__PURE__ */ A(ze, { children: [
          /* @__PURE__ */ p(ji, {}),
          /* @__PURE__ */ p(
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
              children: /* @__PURE__ */ p(Wo, { size: N })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ p(Bt, { onMouseDown: S, children: x });
}), eo = {
  info: { icon: xo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: pc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: fc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: Oa, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Ia, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function Gh({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = V(!1), [s, a] = V(!1), [i, l] = V(null), u = q(null), c = q(null), d = e.attrs.type || "info", f = eo[d] || eo.info, h = f.icon, m = j(() => {
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
    const b = (k) => {
      u.current && !u.current.contains(k.target) && c.current && !c.current.contains(k.target) && o(!1);
    };
    return document.addEventListener("mousedown", b), document.addEventListener("touchstart", b, { passive: !0 }), () => {
      document.removeEventListener("mousedown", b), document.removeEventListener("touchstart", b);
    };
  }, [r]), J(() => {
    if (!r) return;
    const b = () => o(!1);
    return window.addEventListener("scroll", b, !0), () => window.removeEventListener("scroll", b, !0);
  }, [r]);
  const g = j(() => {
    n.isEditable && (r || m(), o(!r));
  }, [n.isEditable, r, m]), y = (b) => {
    t({ type: b }), o(!1);
  }, v = j((b) => {
    b.stopPropagation(), a((k) => !k);
  }, []);
  return /* @__PURE__ */ A(Ir, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
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
              children: s ? /* @__PURE__ */ p(hc, { size: 16 }) : /* @__PURE__ */ p(en, { size: 16 })
            }
          ),
          r && n.isEditable && i && /* @__PURE__ */ p(Bt, { children: /* @__PURE__ */ p(
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
              children: Object.keys(eo).map((b) => {
                const k = eo[b], M = k.icon;
                return /* @__PURE__ */ A(
                  "button",
                  {
                    className: `callout-type-option ${b === d ? "active" : ""}`,
                    onClick: (w) => {
                      w.stopPropagation(), y(b);
                    },
                    onMouseDown: (w) => w.stopPropagation(),
                    style: { "--callout-option-color": k.color },
                    children: [
                      /* @__PURE__ */ p(M, { size: 16, style: { color: k.borderColor } }),
                      /* @__PURE__ */ p("span", { children: k.label })
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
    /* @__PURE__ */ p("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ p(Ca, {}) })
  ] });
}
const Xh = zo.create({
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
      Zn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return _o(Gh);
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
}), Zh = gh.extend({
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
        Zn(this.options.HTMLAttributes, e)
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
          Z.preventDefault(), Z.stopPropagation(), X(), f.style.display = "none", T = !1;
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
      const k = document.createElement("div");
      k.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, k.textContent = "Alignment", f.appendChild(k);
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
      ], S = [], N = (L) => {
        S.forEach((F) => {
          (F.getAttribute("data-align-value") || "left") === L ? (F.style.background = "oklch(1 0 0)", F.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", F.style.color = "oklch(0.25 0 0)", F.style.fontWeight = "600") : (F.style.background = "transparent", F.style.boxShadow = "none", F.style.color = "oklch(0.5 0 0)", F.style.fontWeight = "400");
        });
      };
      w.forEach(({ value: L, label: F, icon: X }) => {
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
              const { state: _, dispatch: B } = n.view, U = _.doc.nodeAt(te);
              if (U && U.type.name === "resizableImage") {
                const ee = _.tr.setNodeMarkup(te, void 0, {
                  ...U.attrs,
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
        }), S.push(K), M.appendChild(K);
      }), f.appendChild(M);
      const x = () => {
        const L = o.attrs.align || "left";
        N(L);
      };
      let T = !1;
      d.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), T)
          f.style.display = "none", T = !1;
        else {
          const F = d.getBoundingClientRect(), X = 200, K = f.closest('[role="dialog"]');
          let Z = 0, te = 0;
          if (K) {
            const be = K.getBoundingClientRect();
            Z = be.left, te = be.top;
          }
          let _ = F.bottom + 4 - te, B = F.right - X - Z;
          const U = window.innerHeight, ee = window.innerWidth, ge = 200;
          F.bottom + 4 + ge > U && (_ = F.top - ge - 4 - te), B + Z < 8 && (B = 8 - Z), B + X + Z > ee - 8 && (B = ee - X - 8 - Z), f.style.top = `${_}px`, f.style.left = `${B}px`, f.style.display = "flex", T = !0, x();
        }
      });
      const E = (L) => {
        !f.contains(L.target) && !d.contains(L.target) && (f.style.display = "none", T = !1);
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
        c.style.opacity = "0", D.style.opacity = "0", T || (d.style.opacity = "0");
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
        const U = s.closest('[role="dialog"]');
        U ? U.appendChild(F) : document.body.appendChild(F), requestAnimationFrame(() => {
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
function Qh(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Jh = {}, br = {};
function mn(e, t) {
  try {
    const r = (Jh[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in br ? br[r] : Ki(r, r.split(":"));
  } catch {
    if (e in br) return br[e];
    const n = e?.match(em);
    return n ? Ki(e, n.slice(1)) : NaN;
  }
}
const em = /([+-]\d\d):?(\d\d)?/;
function Ki(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return br[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class vt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(mn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Rc(this), ta(this)) : this.setTime(Date.now());
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
    const t = -mn(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), ta(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new vt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const qi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!qi.test(e)) return;
  const t = e.replace(qi, "$1UTC");
  vt.prototype[t] && (e.startsWith("get") ? vt.prototype[e] = function() {
    return this.internal[t]();
  } : (vt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), tm(this), +this;
  }, vt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), ta(this), +this;
  }));
});
function ta(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-mn(e.timeZone, e) * 60));
}
function tm(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Rc(e);
}
function Rc(e) {
  const t = mn(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), a = o - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const c = o > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, d = Math.round(-(mn(e.timeZone, e) * 60)) % 60;
  (d || c) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + c));
  const f = mn(e.timeZone, e), h = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, y = h !== n, v = g - l;
  if (y && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const b = mn(e.timeZone, e), k = b > 0 ? Math.floor(b) : Math.ceil(b), M = h - k;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
  }
}
class je extends vt {
  //#region static
  static tz(t, ...n) {
    return n.length ? new je(...n, t) : new je(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Qh(this.timeZone, this)})`;
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
    return new je(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new je(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ac = 6048e5, nm = 864e5, Gi = Symbol.for("constructDateFrom");
function Oe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Gi in e ? e[Gi](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Me(e, t) {
  return Oe(t || e, e);
}
function Lc(e, t, n) {
  const r = Me(e, n?.in);
  return isNaN(t) ? Oe(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Pc(e, t, n) {
  const r = Me(e, n?.in);
  if (isNaN(t)) return Oe(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Oe(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const a = s.getDate();
  return o >= a ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let rm = {};
function Or() {
  return rm;
}
function Kn(e, t) {
  const n = Or(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Me(e, t?.in), s = o.getDay(), a = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - a), o.setHours(0, 0, 0, 0), o;
}
function Mr(e, t) {
  return Kn(e, { ...t, weekStartsOn: 1 });
}
function Ic(e, t) {
  const n = Me(e, t?.in), r = n.getFullYear(), o = Oe(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Mr(o), a = Oe(n, 0);
  a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Mr(a);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function Xi(e) {
  const t = Me(e), n = new Date(
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
function tr(e, ...t) {
  const n = Oe.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Er(e, t) {
  const n = Me(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Oc(e, t, n) {
  const [r, o] = tr(
    n?.in,
    e,
    t
  ), s = Er(r), a = Er(o), i = +s - Xi(s), l = +a - Xi(a);
  return Math.round((i - l) / nm);
}
function om(e, t) {
  const n = Ic(e, t), r = Oe(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Mr(r);
}
function sm(e, t, n) {
  return Lc(e, t * 7, n);
}
function am(e, t, n) {
  return Pc(e, t * 12, n);
}
function im(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Oe.bind(null, o));
    const s = Me(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Oe(r, n || NaN);
}
function lm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Oe.bind(null, o));
    const s = Me(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Oe(r, n || NaN);
}
function cm(e, t, n) {
  const [r, o] = tr(
    n?.in,
    e,
    t
  );
  return +Er(r) == +Er(o);
}
function $c(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function um(e) {
  return !(!$c(e) && typeof e != "number" || isNaN(+Me(e)));
}
function dm(e, t, n) {
  const [r, o] = tr(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), a = r.getMonth() - o.getMonth();
  return s * 12 + a;
}
function fm(e, t) {
  const n = Me(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function _c(e, t) {
  const [n, r] = tr(e, t.start, t.end);
  return { start: n, end: r };
}
function pm(e, t) {
  const { start: n, end: r } = _c(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(Oe(n, a)), a.setMonth(a.getMonth() + i);
  return o ? l.reverse() : l;
}
function hm(e, t) {
  const n = Me(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function mm(e, t) {
  const n = Me(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Hc(e, t) {
  const n = Me(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function gm(e, t) {
  const { start: n, end: r } = _c(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(Oe(n, a)), a.setFullYear(a.getFullYear() + i);
  return o ? l.reverse() : l;
}
function zc(e, t) {
  const n = Or(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Me(e, t?.in), s = o.getDay(), a = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + a), o.setHours(23, 59, 59, 999), o;
}
function ym(e, t) {
  return zc(e, { ...t, weekStartsOn: 1 });
}
const bm = {
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
}, vm = (e, t, n) => {
  let r;
  const o = bm[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Ts(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const wm = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, km = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, xm = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Cm = {
  date: Ts({
    formats: wm,
    defaultWidth: "full"
  }),
  time: Ts({
    formats: km,
    defaultWidth: "full"
  }),
  dateTime: Ts({
    formats: xm,
    defaultWidth: "full"
  })
}, Sm = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Tm = (e, t, n, r) => Sm[e];
function fr(e) {
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
const Mm = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Em = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Nm = {
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
}, Dm = {
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
}, Rm = {
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
}, Am = {
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
}, Lm = (e, t) => {
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
}, Pm = {
  ordinalNumber: Lm,
  era: fr({
    values: Mm,
    defaultWidth: "wide"
  }),
  quarter: fr({
    values: Em,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: fr({
    values: Nm,
    defaultWidth: "wide"
  }),
  day: fr({
    values: Dm,
    defaultWidth: "wide"
  }),
  dayPeriod: fr({
    values: Rm,
    defaultWidth: "wide",
    formattingValues: Am,
    defaultFormattingWidth: "wide"
  })
};
function pr(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const a = s[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? Om(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      Im(i, (d) => d.test(a))
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
function Im(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Om(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function $m(e) {
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
const _m = /^(\d+)(th|st|nd|rd)?/i, Hm = /\d+/i, zm = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Bm = {
  any: [/^b/i, /^(a|c)/i]
}, Wm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Fm = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Um = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Ym = {
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
}, jm = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Vm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Km = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, qm = {
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
}, Gm = {
  ordinalNumber: $m({
    matchPattern: _m,
    parsePattern: Hm,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: pr({
    matchPatterns: zm,
    defaultMatchWidth: "wide",
    parsePatterns: Bm,
    defaultParseWidth: "any"
  }),
  quarter: pr({
    matchPatterns: Wm,
    defaultMatchWidth: "wide",
    parsePatterns: Fm,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: pr({
    matchPatterns: Um,
    defaultMatchWidth: "wide",
    parsePatterns: Ym,
    defaultParseWidth: "any"
  }),
  day: pr({
    matchPatterns: jm,
    defaultMatchWidth: "wide",
    parsePatterns: Vm,
    defaultParseWidth: "any"
  }),
  dayPeriod: pr({
    matchPatterns: Km,
    defaultMatchWidth: "any",
    parsePatterns: qm,
    defaultParseWidth: "any"
  })
}, Ya = {
  code: "en-US",
  formatDistance: vm,
  formatLong: Cm,
  formatRelative: Tm,
  localize: Pm,
  match: Gm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Xm(e, t) {
  const n = Me(e, t?.in);
  return Oc(n, Hc(n)) + 1;
}
function Bc(e, t) {
  const n = Me(e, t?.in), r = +Mr(n) - +om(n);
  return Math.round(r / Ac) + 1;
}
function Wc(e, t) {
  const n = Me(e, t?.in), r = n.getFullYear(), o = Or(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = Oe(t?.in || e, 0);
  a.setFullYear(r + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = Kn(a, t), l = Oe(t?.in || e, 0);
  l.setFullYear(r, 0, s), l.setHours(0, 0, 0, 0);
  const u = Kn(l, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function Zm(e, t) {
  const n = Or(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Wc(e, t), s = Oe(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Kn(s, t);
}
function Fc(e, t) {
  const n = Me(e, t?.in), r = +Kn(n, t) - +Zm(n, t);
  return Math.round(r / Ac) + 1;
}
function Se(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Gt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return Se(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : Se(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return Se(e.getDate(), t.length);
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
    return Se(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return Se(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return Se(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return Se(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return Se(o, t.length);
  }
}, Ln = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Zi = {
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
    const o = Wc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const a = s % 100;
      return Se(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : Se(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Ic(e);
    return Se(n, t.length);
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
    return Se(n, t.length);
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
        return Se(r, 2);
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
        return Se(r, 2);
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
        return Se(r + 1, 2);
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
    const o = Fc(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : Se(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Bc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Se(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Gt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Xm(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Se(r, t.length);
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
        return Se(s, 2);
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
        return Se(s, t.length);
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
        return Se(o, t.length);
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
    switch (r === 12 ? o = Ln.noon : r === 0 ? o = Ln.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Ln.evening : r >= 12 ? o = Ln.afternoon : r >= 4 ? o = Ln.morning : o = Ln.night, t) {
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
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Se(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Se(r, t.length);
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
        return Ji(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return fn(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return fn(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Ji(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return fn(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return fn(r, ":");
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
        return "GMT" + Qi(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + fn(r, ":");
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
        return "GMT" + Qi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + fn(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return Se(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return Se(+e, t.length);
  }
};
function Qi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + Se(s, 2);
}
function Ji(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + Se(Math.abs(e) / 60, 2) : fn(e, t);
}
function fn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Se(Math.trunc(r / 60), 2), s = Se(r % 60, 2);
  return n + o + t + s;
}
const el = (e, t) => {
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
}, Uc = (e, t) => {
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
}, Qm = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return el(e, t);
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
  return s.replace("{{date}}", el(r, t)).replace("{{time}}", Uc(o, t));
}, Jm = {
  p: Uc,
  P: Qm
}, eg = /^D+$/, tg = /^Y+$/, ng = ["D", "DD", "YY", "YYYY"];
function rg(e) {
  return eg.test(e);
}
function og(e) {
  return tg.test(e);
}
function sg(e, t, n) {
  const r = ag(e, t, n);
  if (console.warn(r), ng.includes(e)) throw new RangeError(r);
}
function ag(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const ig = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, lg = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, cg = /^'([^]*?)'?$/, ug = /''/g, dg = /[a-zA-Z]/;
function fg(e, t, n) {
  const r = Or(), o = n?.locale ?? r.locale ?? Ya, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = Me(e, n?.in);
  if (!um(i))
    throw new RangeError("Invalid time value");
  let l = t.match(lg).map((c) => {
    const d = c[0];
    if (d === "p" || d === "P") {
      const f = Jm[d];
      return f(c, o.formatLong);
    }
    return c;
  }).join("").match(ig).map((c) => {
    if (c === "''")
      return { isToken: !1, value: "'" };
    const d = c[0];
    if (d === "'")
      return { isToken: !1, value: pg(c) };
    if (Zi[d])
      return { isToken: !0, value: c };
    if (d.match(dg))
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
    (!n?.useAdditionalWeekYearTokens && og(d) || !n?.useAdditionalDayOfYearTokens && rg(d)) && sg(d, t, String(e));
    const f = Zi[d[0]];
    return f(i, d, o.localize, u);
  }).join("");
}
function pg(e) {
  const t = e.match(cg);
  return t ? t[1].replace(ug, "'") : e;
}
function hg(e, t) {
  const n = Me(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Oe(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function mg(e, t) {
  return Me(e, t?.in).getMonth();
}
function gg(e, t) {
  return Me(e, t?.in).getFullYear();
}
function yg(e, t) {
  return +Me(e) > +Me(t);
}
function bg(e, t) {
  return +Me(e) < +Me(t);
}
function vg(e, t, n) {
  const [r, o] = tr(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function wg(e, t, n) {
  const [r, o] = tr(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function kg(e, t, n) {
  const r = Me(e, n?.in), o = r.getFullYear(), s = r.getDate(), a = Oe(e, 0);
  a.setFullYear(o, t, 15), a.setHours(0, 0, 0, 0);
  const i = hg(a);
  return r.setMonth(t, Math.min(s, i)), r;
}
function xg(e, t, n) {
  const r = Me(e, n?.in);
  return isNaN(+r) ? Oe(e, NaN) : (r.setFullYear(t), r);
}
const tl = 5, Cg = 4;
function Sg(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, tl * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? tl : Cg;
}
function Yc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Tg(e, t) {
  const n = Yc(e, t), r = Sg(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? je.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new je(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Lc(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Pc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : sm(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : am(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Oc(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : dm(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : pm(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : gm(r), s = new Set(o.map((i) => this.getYear(i)));
      if (s.size === o.length)
        return o;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Tg(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : ym(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : fm(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : zc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : mm(r), this.format = (r, o, s) => {
      const a = this.overrides?.format ? this.overrides.format(r, o, this.options) : fg(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Bc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : mg(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : gg(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Fc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : yg(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : bg(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : $c(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : cm(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : vg(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : wg(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : im(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : lm(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : kg(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : xg(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Yc(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : Er(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Mr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : hm(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Kn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Hc(r), this.options = { locale: Ya, ...t }, this.overrides = n;
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
class jc {
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
class Mg {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Eg {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Ng(e) {
  return Q.createElement("button", { ...e });
}
function Dg(e) {
  return Q.createElement("span", { ...e });
}
function Rg(e) {
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
function Ag(e) {
  const { day: t, modifiers: n, ...r } = e;
  return Q.createElement("td", { ...r });
}
function Lg(e) {
  const { day: t, modifiers: n, ...r } = e, o = Q.useRef(null);
  return Q.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), Q.createElement("button", { ref: o, ...r });
}
var se;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(se || (se = {}));
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
function Pg(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, a = [o[se.Dropdown], n].join(" "), i = t?.find(({ value: l }) => l === s.value);
  return Q.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[se.DropdownRoot] },
    Q.createElement(r.Select, { className: a, ...s }, t?.map(({ value: l, label: u, disabled: c }) => Q.createElement(r.Option, { key: l, value: l, disabled: c }, u))),
    Q.createElement(
      "span",
      { className: o[se.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      Q.createElement(r.Chevron, { orientation: "down", size: 18, className: o[se.Chevron] })
    )
  );
}
function Ig(e) {
  return Q.createElement("div", { ...e });
}
function Og(e) {
  return Q.createElement("div", { ...e });
}
function $g(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return Q.createElement("div", { ...r }, e.children);
}
function _g(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return Q.createElement("div", { ...r });
}
function Hg(e) {
  return Q.createElement("table", { ...e });
}
function zg(e) {
  return Q.createElement("div", { ...e });
}
const Vc = lc(void 0);
function $r() {
  const e = cc(Vc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Bg(e) {
  const { components: t } = $r();
  return Q.createElement(t.Dropdown, { ...e });
}
function Wg(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: u } } = $r(), c = j((f) => {
    o && n?.(f);
  }, [o, n]), d = j((f) => {
    r && t?.(f);
  }, [r, t]);
  return Q.createElement(
    "nav",
    { ...s },
    Q.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[se.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: d },
      Q.createElement(a.Chevron, { disabled: r ? void 0 : !0, className: i[se.Chevron], orientation: "left" })
    ),
    Q.createElement(
      a.NextMonthButton,
      { type: "button", className: i[se.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": u(o), onClick: c },
      Q.createElement(a.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[se.Chevron] })
    )
  );
}
function Fg(e) {
  const { components: t } = $r();
  return Q.createElement(t.Button, { ...e });
}
function Ug(e) {
  return Q.createElement("option", { ...e });
}
function Yg(e) {
  const { components: t } = $r();
  return Q.createElement(t.Button, { ...e });
}
function jg(e) {
  const { rootRef: t, ...n } = e;
  return Q.createElement("div", { ...n, ref: t });
}
function Vg(e) {
  return Q.createElement("select", { ...e });
}
function Kg(e) {
  const { week: t, ...n } = e;
  return Q.createElement("tr", { ...n });
}
function qg(e) {
  return Q.createElement("th", { ...e });
}
function Gg(e) {
  return Q.createElement(
    "thead",
    { "aria-hidden": !0 },
    Q.createElement("tr", { ...e })
  );
}
function Xg(e) {
  const { week: t, ...n } = e;
  return Q.createElement("th", { ...n });
}
function Zg(e) {
  return Q.createElement("th", { ...e });
}
function Qg(e) {
  return Q.createElement("tbody", { ...e });
}
function Jg(e) {
  const { components: t } = $r();
  return Q.createElement(t.Dropdown, { ...e });
}
const ey = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Ng,
  CaptionLabel: Dg,
  Chevron: Rg,
  Day: Ag,
  DayButton: Lg,
  Dropdown: Pg,
  DropdownNav: Ig,
  Footer: Og,
  Month: $g,
  MonthCaption: _g,
  MonthGrid: Hg,
  Months: zg,
  MonthsDropdown: Bg,
  Nav: Wg,
  NextMonthButton: Fg,
  Option: Ug,
  PreviousMonthButton: Yg,
  Root: jg,
  Select: Vg,
  Week: Kg,
  WeekNumber: Xg,
  WeekNumberHeader: Zg,
  Weekday: qg,
  Weekdays: Gg,
  Weeks: Qg,
  YearsDropdown: Jg
}, Symbol.toStringTag, { value: "Module" }));
function It(e, t, n = !1, r = Ct) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = r;
  return o && s ? (a(s, o) < 0 && ([o, s] = [s, o]), a(t, o) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && o ? i(o, t) : !1;
}
function Kc(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function ja(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function qc(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Gc(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Xc(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Zc(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Ot(e, t, n = Ct) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: a } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Zc(i, n))
      return i.includes(e);
    if (ja(i))
      return It(i, e, !1, n);
    if (Xc(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Kc(i)) {
      const l = s(i.before, e), u = s(i.after, e), c = l > 0, d = u < 0;
      return a(i.before, i.after) ? d && c : c || d;
    }
    return qc(i) ? s(e, i.after) > 0 : Gc(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function ty(e, t, n, r, o) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: u, today: c } = t, { isSameDay: d, isSameMonth: f, startOfMonth: h, isBefore: m, endOfMonth: g, isAfter: y } = o, v = n && h(n), b = r && g(r), k = {
    [Re.focused]: [],
    [Re.outside]: [],
    [Re.disabled]: [],
    [Re.hidden]: [],
    [Re.today]: []
  }, M = {};
  for (const w of e) {
    const { date: S, displayMonth: N } = w, x = !!(N && !f(S, N)), T = !!(v && m(S, v)), E = !!(b && y(S, b)), D = !!(s && Ot(S, s, o)), R = !!(a && Ot(S, a, o)) || T || E || // Broadcast calendar will show outside days as default
    !u && !l && x || u && l === !1 && x, I = d(S, c ?? o.today());
    x && k.outside.push(w), D && k.disabled.push(w), R && k.hidden.push(w), I && k.today.push(w), i && Object.keys(i).forEach((O) => {
      const H = i?.[O];
      H && Ot(S, H, o) && (M[O] ? M[O].push(w) : M[O] = [w]);
    });
  }
  return (w) => {
    const S = {
      [Re.focused]: !1,
      [Re.disabled]: !1,
      [Re.hidden]: !1,
      [Re.outside]: !1,
      [Re.today]: !1
    }, N = {};
    for (const x in k) {
      const T = k[x];
      S[x] = T.some((E) => E === w);
    }
    for (const x in M)
      N[x] = M[x].some((T) => T === w);
    return {
      ...S,
      // custom modifiers should override all the previous ones
      ...N
    };
  };
}
function ny(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[Re[s]] ? o.push(t[Re[s]]) : t[ft[s]] && o.push(t[ft[s]]), o), [t[se.Day]]);
}
function ry(e) {
  return {
    ...ey,
    ...e
  };
}
function oy(e) {
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
function Va() {
  const e = {};
  for (const t in se)
    e[se[t]] = `rdp-${se[t]}`;
  for (const t in Re)
    e[Re[t]] = `rdp-${Re[t]}`;
  for (const t in ft)
    e[ft[t]] = `rdp-${ft[t]}`;
  for (const t in et)
    e[et[t]] = `rdp-${et[t]}`;
  return e;
}
function Qc(e, t, n) {
  return (n ?? new rt(t)).formatMonthYear(e);
}
const sy = Qc;
function ay(e, t, n) {
  return (n ?? new rt(t)).format(e, "d");
}
function iy(e, t = Ct) {
  return t.format(e, "LLLL");
}
function ly(e, t, n) {
  return (n ?? new rt(t)).format(e, "cccccc");
}
function cy(e, t = Ct) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function uy() {
  return "";
}
function Jc(e, t = Ct) {
  return t.format(e, "yyyy");
}
const dy = Jc, fy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Qc,
  formatDay: ay,
  formatMonthCaption: sy,
  formatMonthDropdown: iy,
  formatWeekNumber: cy,
  formatWeekNumberHeader: uy,
  formatWeekdayName: ly,
  formatYearCaption: dy,
  formatYearDropdown: Jc
}, Symbol.toStringTag, { value: "Module" }));
function py(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...fy,
    ...e
  };
}
function hy(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: u } = o;
  return l({
    start: a(e),
    end: i(e)
  }).map((f) => {
    const h = r.formatMonthDropdown(f, o), m = u(f), g = t && f < s(t) || n && f > s(n) || !1;
    return { value: m, label: h, disabled: g };
  });
}
function my(e, t = {}, n = {}) {
  let r = { ...t?.[se.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function gy(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(o, a);
    s.push(i);
  }
  return s;
}
function yy(e, t, n, r, o = !1) {
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
function eu(e, t, n, r) {
  let o = (r ?? new rt(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const by = eu;
function tu(e, t, n) {
  return (n ?? new rt(t)).formatMonthYear(e);
}
const vy = tu;
function wy(e, t, n, r) {
  let o = (r ?? new rt(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function ky(e) {
  return "Choose the Month";
}
function xy() {
  return "";
}
function Cy(e) {
  return "Go to the Next Month";
}
function Sy(e) {
  return "Go to the Previous Month";
}
function Ty(e, t, n) {
  return (n ?? new rt(t)).format(e, "cccc");
}
function My(e, t) {
  return `Week ${e}`;
}
function Ey(e) {
  return "Week Number";
}
function Ny(e) {
  return "Choose the Year";
}
const Dy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: vy,
  labelDay: by,
  labelDayButton: eu,
  labelGrid: tu,
  labelGridcell: wy,
  labelMonthDropdown: ky,
  labelNav: xy,
  labelNext: Cy,
  labelPrevious: Sy,
  labelWeekNumber: My,
  labelWeekNumberHeader: Ey,
  labelWeekday: Ty,
  labelYearDropdown: Ny
}, Symbol.toStringTag, { value: "Module" })), _r = (e) => e instanceof HTMLElement ? e : null, Ms = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Ry = (e) => _r(e.querySelector("[data-animated-month]")), Es = (e) => _r(e.querySelector("[data-animated-caption]")), Ns = (e) => _r(e.querySelector("[data-animated-weeks]")), Ay = (e) => _r(e.querySelector("[data-animated-nav]")), Ly = (e) => _r(e.querySelector("[data-animated-weekdays]"));
function Py(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const a = q(null), i = q(r), l = q(!1);
  Bo(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const c = s.isSameMonth(r[0].date, u[0].date), d = s.isAfter(r[0].date, u[0].date), f = d ? n[et.caption_after_enter] : n[et.caption_before_enter], h = d ? n[et.weeks_after_enter] : n[et.weeks_before_enter], m = a.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Ms(g).forEach((k) => {
      if (!(k instanceof HTMLElement))
        return;
      const M = Ry(k);
      M && k.contains(M) && k.removeChild(M);
      const w = Es(k);
      w && w.classList.remove(f);
      const S = Ns(k);
      S && S.classList.remove(h);
    }), a.current = g) : a.current = null, l.current || c || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = m instanceof HTMLElement ? Ms(m) : [], v = Ms(e.current);
    if (v?.every((b) => b instanceof HTMLElement) && y && y.every((b) => b instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const b = Ay(e.current);
      b && (b.style.zIndex = "1"), v.forEach((k, M) => {
        const w = y[M];
        if (!w)
          return;
        k.style.position = "relative", k.style.overflow = "hidden";
        const S = Es(k);
        S && S.classList.add(f);
        const N = Ns(k);
        N && N.classList.add(h);
        const x = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), S && S.classList.remove(f), N && N.classList.remove(h), k.style.position = "", k.style.overflow = "", k.contains(w) && k.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const T = Ly(w);
        T && (T.style.opacity = "0");
        const E = Es(w);
        E && (E.classList.add(d ? n[et.caption_before_exit] : n[et.caption_after_exit]), E.addEventListener("animationend", x));
        const D = Ns(w);
        D && D.classList.add(d ? n[et.weeks_before_exit] : n[et.weeks_after_exit]), k.insertBefore(w, k.firstChild);
      });
    }
  });
}
function Iy(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: c, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: h, endOfMonth: m, endOfWeek: g, isAfter: y, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: k } = r, M = l ? v(o, r) : a ? b(o) : k(o), w = l ? f(s) : a ? h(m(s)) : g(m(s)), S = c(w, M), N = d(s, o) + 1, x = [];
  for (let D = 0; D <= S; D++) {
    const R = u(M, D);
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
function Oy(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function $y(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let a = 0; a < o; a++) {
    const i = r.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function nl(e, t, n, r) {
  const { month: o, defaultMonth: s, today: a = r.today(), numberOfMonths: i = 1 } = e;
  let l = o || s || a;
  const { differenceInCalendarMonths: u, addMonths: c, startOfMonth: d } = r;
  if (n && u(n, l) < i - 1) {
    const f = -1 * (i - 1);
    l = c(n, f);
  }
  return t && u(l, t) < 0 && (l = t), d(l);
}
function _y(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: u, getWeek: c, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: h } = r, m = e.reduce((g, y) => {
    const v = n.broadcastCalendar ? d(y, r) : n.ISOWeek ? f(y) : h(y), b = n.broadcastCalendar ? s(y) : n.ISOWeek ? a(i(y)) : l(i(y)), k = t.filter((N) => N >= v && N <= b), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && k.length < M) {
      const N = t.filter((x) => {
        const T = M - k.length;
        return x > b && x <= o(b, T);
      });
      k.push(...N);
    }
    const w = k.reduce((N, x) => {
      const T = n.ISOWeek ? u(x) : c(x), E = N.find((R) => R.weekNumber === T), D = new jc(x, y, r);
      return E ? E.days.push(D) : N.push(new Eg(T, [D])), N;
    }, []), S = new Mg(y, w);
    return g.push(S), g;
  }, []);
  return n.reverseMonths ? m.reverse() : m;
}
function Hy(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: u, newDate: c, today: d } = t, { fromYear: f, toYear: h, fromMonth: m, toMonth: g } = e;
  !n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && g && (r = g), !r && h && (r = c(h, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : f ? n = c(f, 0, 1) : !n && y && (n = o(l(e.today ?? d(), -100))), r ? r = i(r) : h ? r = c(h, 11, 31) : !r && y && (r = u(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function zy(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? s : 1, c = a(e);
  if (!t)
    return i(c, u);
  if (!(l(t, e) < s))
    return i(c, u);
}
function By(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? s ?? 1 : 1, c = a(e);
  if (!t)
    return i(c, -u);
  if (!(l(c, t) <= 0))
    return i(c, -u);
}
function Wy(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Yo(e, t) {
  const [n, r] = V(e);
  return [t === void 0 ? n : t, r];
}
function Fy(e, t) {
  const [n, r] = Hy(e, t), { startOfMonth: o, endOfMonth: s } = t, a = nl(e, n, r, t), [i, l] = Yo(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  J(() => {
    const S = nl(e, n, r, t);
    l(S);
  }, [e.timeZone]);
  const u = $y(i, r, e, t), c = Iy(u, e.endMonth ? s(e.endMonth) : void 0, e, t), d = _y(u, c, e, t), f = Wy(d), h = Oy(d), m = By(i, n, e, t), g = zy(i, r, e, t), { disableNavigation: y, onMonthChange: v } = e, b = (S) => f.some((N) => N.days.some((x) => x.isEqualTo(S))), k = (S) => {
    if (y)
      return;
    let N = o(S);
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
    goToMonth: k,
    goToDay: (S) => {
      b(S) || k(S.date);
    }
  };
}
var yt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(yt || (yt = {}));
function rl(e) {
  return !e[Re.disabled] && !e[Re.hidden] && !e[Re.outside];
}
function Uy(e, t, n, r) {
  let o, s = -1;
  for (const a of e) {
    const i = t(a);
    rl(i) && (i[Re.focused] && s < yt.FocusedModifier ? (o = a, s = yt.FocusedModifier) : r?.isEqualTo(a) && s < yt.LastFocused ? (o = a, s = yt.LastFocused) : n(a.date) && s < yt.Selected ? (o = a, s = yt.Selected) : i[Re.today] && s < yt.Today && (o = a, s = yt.Today));
  }
  return o || (o = e.find((a) => rl(t(a)))), o;
}
function Yy(e, t, n, r, o, s, a) {
  const { ISOWeek: i, broadcastCalendar: l } = s, { addDays: u, addMonths: c, addWeeks: d, addYears: f, endOfBroadcastWeek: h, endOfISOWeek: m, endOfWeek: g, max: y, min: v, startOfBroadcastWeek: b, startOfISOWeek: k, startOfWeek: M } = a;
  let S = {
    day: u,
    week: d,
    month: c,
    year: f,
    startOfWeek: (N) => l ? b(N, a) : i ? k(N) : M(N),
    endOfWeek: (N) => l ? h(N) : i ? m(N) : g(N)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? S = y([r, S]) : t === "after" && o && (S = v([o, S])), S;
}
function nu(e, t, n, r, o, s, a, i = 0) {
  if (i > 365)
    return;
  const l = Yy(e, t, n.date, r, o, s, a), u = !!(s.disabled && Ot(l, s.disabled, a)), c = !!(s.hidden && Ot(l, s.hidden, a)), d = l, f = new jc(l, d, a);
  return !u && !c ? f : nu(e, t, f, r, o, s, a, i + 1);
}
function jy(e, t, n, r, o) {
  const { autoFocus: s } = e, [a, i] = V(), l = Uy(t.days, n, r || (() => !1), a), [u, c] = V(s ? l : void 0);
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
      const v = nu(g, y, u, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((k) => k.isEqualTo(v)) || (t.goToDay(v), c(v)));
    }
  };
}
function Vy(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = Yo(n, o ? n : void 0), i = o ? n : s, { isSameDay: l } = t, u = (h) => i?.some((m) => l(m, h)) ?? !1, { min: c, max: d } = e;
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
function Ky(e, t, n = 0, r = 0, o = !1, s = Ct) {
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
function qy(e, t, n = Ct) {
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
function ol(e, t, n = Ct) {
  return It(e, t.from, !1, n) || It(e, t.to, !1, n) || It(t, e.from, !1, n) || It(t, e.to, !1, n);
}
function Gy(e, t, n = Ct) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? It(e, i, !1, n) : Zc(i, n) ? i.some((l) => It(e, l, !1, n)) : ja(i) ? i.from && i.to ? ol(e, { from: i.from, to: i.to }, n) : !1 : Xc(i) ? qy(e, i.dayOfWeek, n) : Kc(i) ? n.isAfter(i.before, i.after) ? ol(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : Ot(e.from, i, n) || Ot(e.to, i, n) : qc(i) || Gc(i) ? Ot(e.from, i, n) || Ot(e.to, i, n) : !1))
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
function Xy(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: a } = e, [i, l] = Yo(o, a ? o : void 0), u = a ? o : i;
  return {
    selected: u,
    select: (f, h, m) => {
      const { min: g, max: y } = e, v = f ? Ky(f, u, g, y, s, t) : void 0;
      return r && n && v?.from && v.to && Gy({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), a || l(v), a?.(v, f, h, m), v;
    },
    isSelected: (f) => u && It(u, f, !1, t)
  };
}
function Zy(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = Yo(n, o ? n : void 0), i = o ? n : s, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, f, h) => {
      let m = d;
      return !r && i && i && l(d, i) && (m = void 0), o || a(m), o?.(m, d, f, h), m;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function Qy(e, t) {
  const n = Zy(e, t), r = Vy(e, t), o = Xy(e, t);
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
function Jy(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new je(t.today, t.timeZone)), t.month && (t.month = new je(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new je(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new je(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new je(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new je(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((pe) => new je(pe, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new je(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new je(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: a, classNames: i } = yn(() => {
    const pe = { ...Ya, ...t.locale };
    return {
      dateLib: new rt({
        locale: pe,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: ry(t.components),
      formatters: py(t.formatters),
      labels: { ...Dy, ...t.labels },
      locale: pe,
      classNames: { ...Va(), ...t.classNames }
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
  ]), { captionLayout: l, mode: u, navLayout: c, numberOfMonths: d = 1, onDayBlur: f, onDayClick: h, onDayFocus: m, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: v, onNextClick: b, onPrevClick: k, showWeekNumber: M, styles: w } = t, { formatCaption: S, formatDay: N, formatMonthDropdown: x, formatWeekNumber: T, formatWeekNumberHeader: E, formatWeekdayName: D, formatYearDropdown: R } = r, I = Fy(t, s), { days: O, months: H, navStart: W, navEnd: G, previousMonth: P, nextMonth: L, goToMonth: F } = I, X = ty(O, t, W, G, s), { isSelected: K, select: Z, selected: te } = Qy(t, s) ?? {}, { blur: _, focused: B, isFocusTarget: U, moveFocus: ee, setFocused: ge } = jy(t, I, X, K ?? (() => !1), s), { labelDayButton: be, labelGridcell: Ae, labelGrid: Be, labelMonthDropdown: ot, labelNav: Wt, labelPrevious: ir, labelNext: lr, labelWeekday: Yr, labelWeekNumber: jr, labelWeekNumberHeader: Vr, labelYearDropdown: Kr } = o, Sn = yn(() => gy(s, t.ISOWeek), [s, t.ISOWeek]), cr = u !== void 0 || h !== void 0, Tn = j(() => {
    P && (F(P), k?.(P));
  }, [P, F, k]), Mn = j(() => {
    L && (F(L), b?.(L));
  }, [F, L, b]), qr = j((pe, Ee) => (ce) => {
    ce.preventDefault(), ce.stopPropagation(), ge(pe), Z?.(pe.date, Ee, ce), h?.(pe.date, Ee, ce);
  }, [Z, h, ge]), as = j((pe, Ee) => (ce) => {
    ge(pe), m?.(pe.date, Ee, ce);
  }, [m, ge]), is = j((pe, Ee) => (ce) => {
    _(), f?.(pe.date, Ee, ce);
  }, [_, f]), ls = j((pe, Ee) => (ce) => {
    const he = {
      ArrowLeft: [
        ce.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        ce.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [ce.shiftKey ? "year" : "week", "after"],
      ArrowUp: [ce.shiftKey ? "year" : "week", "before"],
      PageUp: [ce.shiftKey ? "year" : "month", "before"],
      PageDown: [ce.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (he[ce.key]) {
      ce.preventDefault(), ce.stopPropagation();
      const [Le, ye] = he[ce.key];
      ee(Le, ye);
    }
    g?.(pe.date, Ee, ce);
  }, [ee, g, t.dir]), cs = j((pe, Ee) => (ce) => {
    y?.(pe.date, Ee, ce);
  }, [y]), Gr = j((pe, Ee) => (ce) => {
    v?.(pe.date, Ee, ce);
  }, [v]), us = j((pe) => (Ee) => {
    const ce = Number(Ee.target.value), he = s.setMonth(s.startOfMonth(pe), ce);
    F(he);
  }, [s, F]), Tt = j((pe) => (Ee) => {
    const ce = Number(Ee.target.value), he = s.setYear(s.startOfMonth(pe), ce);
    F(he);
  }, [s, F]), { className: En, style: Nn } = yn(() => ({
    className: [i[se.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[se.Root], ...t.style }
  }), [i, t.className, t.style, w]), ds = oy(t), st = q(null);
  Py(st, !!t.animate, {
    classNames: i,
    months: H,
    focused: B,
    dateLib: s
  });
  const Ft = {
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
    styles: w,
    labels: o,
    formatters: r
  };
  return Q.createElement(
    Vc.Provider,
    { value: Ft },
    Q.createElement(
      n.Root,
      { rootRef: t.animate ? st : void 0, className: En, style: Nn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...ds },
      Q.createElement(
        n.Months,
        { className: i[se.Months], style: w?.[se.Months] },
        !t.hideNavigation && !c && Q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[se.Nav], style: w?.[se.Nav], "aria-label": Wt(), onPreviousClick: Tn, onNextClick: Mn, previousMonth: P, nextMonth: L }),
        H.map((pe, Ee) => Q.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[se.Month],
            style: w?.[se.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: Ee,
            displayIndex: Ee,
            calendarMonth: pe
          },
          c === "around" && !t.hideNavigation && Ee === 0 && Q.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[se.PreviousMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": ir(P), onClick: Tn, "data-animated-button": t.animate ? "true" : void 0 },
            Q.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[se.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          Q.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[se.MonthCaption], style: w?.[se.MonthCaption], calendarMonth: pe, displayIndex: Ee }, l?.startsWith("dropdown") ? Q.createElement(
            n.DropdownNav,
            { className: i[se.Dropdowns], style: w?.[se.Dropdowns] },
            (() => {
              const ce = l === "dropdown" || l === "dropdown-months" ? Q.createElement(n.MonthsDropdown, { key: "month", className: i[se.MonthsDropdown], "aria-label": ot(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: us(pe.date), options: hy(pe.date, W, G, r, s), style: w?.[se.Dropdown], value: s.getMonth(pe.date) }) : Q.createElement("span", { key: "month" }, x(pe.date, s)), he = l === "dropdown" || l === "dropdown-years" ? Q.createElement(n.YearsDropdown, { key: "year", className: i[se.YearsDropdown], "aria-label": Kr(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Tt(pe.date), options: yy(W, G, r, s, !!t.reverseYears), style: w?.[se.Dropdown], value: s.getYear(pe.date) }) : Q.createElement("span", { key: "year" }, R(pe.date, s));
              return s.getMonthYearOrder() === "year-first" ? [he, ce] : [ce, he];
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
            } }, S(pe.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            Q.createElement(n.CaptionLabel, { className: i[se.CaptionLabel], role: "status", "aria-live": "polite" }, S(pe.date, s.options, s))
          )),
          c === "around" && !t.hideNavigation && Ee === d - 1 && Q.createElement(
            n.NextMonthButton,
            { type: "button", className: i[se.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": lr(L), onClick: Mn, "data-animated-button": t.animate ? "true" : void 0 },
            Q.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: i[se.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          Ee === d - 1 && c === "after" && !t.hideNavigation && Q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[se.Nav], style: w?.[se.Nav], "aria-label": Wt(), onPreviousClick: Tn, onNextClick: Mn, previousMonth: P, nextMonth: L }),
          Q.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": Be(pe.date, s.options, s) || void 0, className: i[se.MonthGrid], style: w?.[se.MonthGrid] },
            !t.hideWeekdays && Q.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[se.Weekdays], style: w?.[se.Weekdays] },
              M && Q.createElement(n.WeekNumberHeader, { "aria-label": Vr(s.options), className: i[se.WeekNumberHeader], style: w?.[se.WeekNumberHeader], scope: "col" }, E()),
              Sn.map((ce) => Q.createElement(n.Weekday, { "aria-label": Yr(ce, s.options, s), className: i[se.Weekday], key: String(ce), style: w?.[se.Weekday], scope: "col" }, D(ce, s.options, s)))
            ),
            Q.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[se.Weeks], style: w?.[se.Weeks] }, pe.weeks.map((ce) => Q.createElement(
              n.Week,
              { className: i[se.Week], key: ce.weekNumber, style: w?.[se.Week], week: ce },
              M && // biome-ignore lint/a11y/useSemanticElements: react component
              Q.createElement(n.WeekNumber, { week: ce, style: w?.[se.WeekNumber], "aria-label": jr(ce.weekNumber, {
                locale: a
              }), className: i[se.WeekNumber], scope: "row", role: "rowheader" }, T(ce.weekNumber, s)),
              ce.days.map((he) => {
                const { date: Le } = he, ye = X(he);
                if (ye[Re.focused] = !ye.hidden && !!B?.isEqualTo(he), ye[ft.selected] = K?.(Le) || ye.selected, ja(te)) {
                  const { from: We, to: Ut } = te;
                  ye[ft.range_start] = !!(We && Ut && s.isSameDay(Le, We)), ye[ft.range_end] = !!(We && Ut && s.isSameDay(Le, Ut)), ye[ft.range_middle] = It(te, Le, !0, s);
                }
                const fs = my(ye, w, t.modifiersStyles), Xr = ny(ye, i, t.modifiersClassNames), Dn = !cr && !ye.hidden ? Ae(Le, ye, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  Q.createElement(n.Day, { key: `${s.format(Le, "yyyy-MM-dd")}_${s.format(he.displayMonth, "yyyy-MM")}`, day: he, modifiers: ye, className: Xr.join(" "), style: fs, role: "gridcell", "aria-selected": ye.selected || void 0, "aria-label": Dn, "data-day": s.format(Le, "yyyy-MM-dd"), "data-month": he.outside ? s.format(Le, "yyyy-MM") : void 0, "data-selected": ye.selected || void 0, "data-disabled": ye.disabled || void 0, "data-hidden": ye.hidden || void 0, "data-outside": he.outside || void 0, "data-focused": ye.focused || void 0, "data-today": ye.today || void 0 }, !ye.hidden && cr ? Q.createElement(n.DayButton, { className: i[se.DayButton], style: w?.[se.DayButton], type: "button", day: he, modifiers: ye, disabled: ye.disabled || void 0, tabIndex: U(he) ? 0 : -1, "aria-label": be(Le, ye, s.options, s), onClick: qr(he, ye), onBlur: is(he, ye), onFocus: as(he, ye), onKeyDown: ls(he, ye), onMouseEnter: cs(he, ye), onMouseLeave: Gr(he, ye) }, N(Le, s.options, s)) : !ye.hidden && N(he.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      Q.createElement(n.Footer, { className: i[se.Footer], style: w?.[se.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function ru(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ru(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function ou() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ru(e)) && (r && (r += " "), r += t);
  return r;
}
const Ka = "-", eb = (e) => {
  const t = nb(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(Ka);
      return i[0] === "" && i.length !== 1 && i.shift(), su(i, t) || tb(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && r[a] ? [...l, ...r[a]] : l;
    }
  };
}, su = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? su(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Ka);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, sl = /^\[(.+)\]$/, tb = (e) => {
  if (sl.test(e)) {
    const t = sl.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, nb = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    na(n[o], r, o, t);
  return r;
}, na = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : al(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (rb(o)) {
        na(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      na(a, al(t, s), n, r);
    });
  });
}, al = (e, t) => {
  let n = e;
  return t.split(Ka).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, rb = (e) => e.isThemeGetter, ob = (e) => {
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
}, ra = "!", oa = ":", sb = oa.length, ab = (e) => {
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
        if (g === oa) {
          s.push(o.slice(l, m)), l = m + sb;
          continue;
        }
        if (g === "/") {
          u = m;
          continue;
        }
      }
      g === "[" ? a++ : g === "]" ? a-- : g === "(" ? i++ : g === ")" && i--;
    }
    const c = s.length === 0 ? o : o.substring(l), d = ib(c), f = d !== c, h = u && u > l ? u - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + oa, s = r;
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
}, ib = (e) => e.endsWith(ra) ? e.substring(0, e.length - 1) : e.startsWith(ra) ? e.substring(1) : e, lb = (e) => {
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
}, cb = (e) => ({
  cache: ob(e.cacheSize),
  parseClassName: ab(e),
  sortModifiers: lb(e),
  ...eb(e)
}), ub = /\s+/, db = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(ub);
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
    const b = s(f).join(":"), k = h ? b + ra : b, M = k + v;
    if (a.includes(M))
      continue;
    a.push(M);
    const w = o(v, y);
    for (let S = 0; S < w.length; ++S) {
      const N = w[S];
      a.push(k + N);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function fb() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = au(t)) && (r && (r += " "), r += n);
  return r;
}
const au = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = au(e[r])) && (n && (n += " "), n += t);
  return n;
};
function pb(e, ...t) {
  let n, r, o, s = a;
  function a(l) {
    const u = t.reduce((c, d) => d(c), e());
    return n = cb(u), r = n.cache.get, o = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const u = r(l);
    if (u)
      return u;
    const c = db(l, n);
    return o(l, c), c;
  }
  return function() {
    return s(fb.apply(null, arguments));
  };
}
const _e = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, iu = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, lu = /^\((?:(\w[\w-]*):)?(.+)\)$/i, hb = /^\d+\/\d+$/, mb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, gb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, yb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, bb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, vb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Pn = (e) => hb.test(e), me = (e) => !!e && !Number.isNaN(Number(e)), Xt = (e) => !!e && Number.isInteger(Number(e)), Ds = (e) => e.endsWith("%") && me(e.slice(0, -1)), Rt = (e) => mb.test(e), wb = () => !0, kb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  gb.test(e) && !yb.test(e)
), cu = () => !1, xb = (e) => bb.test(e), Cb = (e) => vb.test(e), Sb = (e) => !ne(e) && !re(e), Tb = (e) => nr(e, fu, cu), ne = (e) => iu.test(e), dn = (e) => nr(e, pu, kb), Rs = (e) => nr(e, Rb, me), il = (e) => nr(e, uu, cu), Mb = (e) => nr(e, du, Cb), to = (e) => nr(e, hu, xb), re = (e) => lu.test(e), hr = (e) => rr(e, pu), Eb = (e) => rr(e, Ab), ll = (e) => rr(e, uu), Nb = (e) => rr(e, fu), Db = (e) => rr(e, du), no = (e) => rr(e, hu, !0), nr = (e, t, n) => {
  const r = iu.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, rr = (e, t, n = !1) => {
  const r = lu.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, uu = (e) => e === "position" || e === "percentage", du = (e) => e === "image" || e === "url", fu = (e) => e === "length" || e === "size" || e === "bg-size", pu = (e) => e === "length", Rb = (e) => e === "number", Ab = (e) => e === "family-name", hu = (e) => e === "shadow", Lb = () => {
  const e = _e("color"), t = _e("font"), n = _e("text"), r = _e("font-weight"), o = _e("tracking"), s = _e("leading"), a = _e("breakpoint"), i = _e("container"), l = _e("spacing"), u = _e("radius"), c = _e("shadow"), d = _e("inset-shadow"), f = _e("text-shadow"), h = _e("drop-shadow"), m = _e("blur"), g = _e("perspective"), y = _e("aspect"), v = _e("ease"), b = _e("animate"), k = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], M = () => [
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
  ], w = () => [...M(), re, ne], S = () => ["auto", "hidden", "clip", "visible", "scroll"], N = () => ["auto", "contain", "none"], x = () => [re, ne, l], T = () => [Pn, "full", "auto", ...x()], E = () => [Xt, "none", "subgrid", re, ne], D = () => ["auto", {
    span: ["full", Xt, re, ne]
  }, Xt, re, ne], R = () => [Xt, "auto", re, ne], I = () => ["auto", "min", "max", "fr", re, ne], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...x()], G = () => [Pn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], P = () => [e, re, ne], L = () => [...M(), ll, il, {
    position: [re, ne]
  }], F = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], X = () => ["auto", "cover", "contain", Nb, Tb, {
    size: [re, ne]
  }], K = () => [Ds, hr, dn], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    re,
    ne
  ], te = () => ["", me, hr, dn], _ = () => ["solid", "dashed", "dotted", "double"], B = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], U = () => [me, Ds, ll, il], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    re,
    ne
  ], ge = () => ["none", me, re, ne], be = () => ["none", me, re, ne], Ae = () => [me, re, ne], Be = () => [Pn, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Rt],
      breakpoint: [Rt],
      color: [wb],
      container: [Rt],
      "drop-shadow": [Rt],
      ease: ["in", "out", "in-out"],
      font: [Sb],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Rt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Rt],
      shadow: [Rt],
      spacing: ["px", me],
      text: [Rt],
      "text-shadow": [Rt],
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
        aspect: ["auto", "square", Pn, ne, re, y]
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
        "break-after": k()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": k()
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
        overflow: S()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": S()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": S()
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
        basis: [Pn, "full", "auto", i, ...x()]
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
        flex: [me, Pn, "auto", "initial", "none", ne]
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
        text: ["base", n, hr, dn]
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
        font: [r, re, Rs]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ds, ne]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Eb, ne, t]
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
        "line-clamp": [me, "none", re, Rs]
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
        decoration: [me, "from-font", "auto", re, dn]
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
        }, Db, Mb]
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
        outline: ["", me, hr, dn]
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
          no,
          to
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
        "inset-shadow": ["none", d, no, to]
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
        "ring-offset": [me, dn]
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
        "text-shadow": ["none", f, no, to]
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
        "mask-linear-from": U()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": U()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": U()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": U()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": U()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": U()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": U()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": U()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": U()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": U()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": U()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": U()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": U()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": U()
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
        "mask-radial-from": U()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": U()
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
        "mask-conic": [me]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": U()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": U()
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
          no,
          to
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
        "perspective-origin": w()
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
        translate: Be()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Be()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Be()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Be()
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
        stroke: [me, hr, dn, Rs]
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
}, Pb = /* @__PURE__ */ pb(Lb);
function de(...e) {
  return Pb(ou(e));
}
function cl(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function jo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = cl(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : cl(e[o], null);
        }
      };
  };
}
function Ve(...e) {
  return C.useCallback(jo(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Nr(e) {
  const t = /* @__PURE__ */ Ob(e), n = C.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = C.Children.toArray(s), l = i.find(_b);
    if (l) {
      const u = l.props.children, c = i.map((d) => d === l ? C.Children.count(u) > 1 ? C.Children.only(null) : C.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ p(t, { ...a, ref: o, children: C.isValidElement(u) ? C.cloneElement(u, void 0, c) : null });
    }
    return /* @__PURE__ */ p(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Ib = /* @__PURE__ */ Nr("Slot");
// @__NO_SIDE_EFFECTS__
function Ob(e) {
  const t = C.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (C.isValidElement(o)) {
      const a = zb(o), i = Hb(s, o.props);
      return o.type !== C.Fragment && (i.ref = r ? jo(r, a) : a), C.cloneElement(o, i);
    }
    return C.Children.count(o) > 1 ? C.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var mu = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function $b(e) {
  const t = ({ children: n }) => /* @__PURE__ */ p(ze, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = mu, t;
}
function _b(e) {
  return C.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === mu;
}
function Hb(e, t) {
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
function zb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const ul = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, dl = ou, Bb = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return dl(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((u) => {
    const c = n?.[u], d = s?.[u];
    if (c === null) return null;
    const f = ul(c) || ul(d);
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
  return dl(e, a, l, n?.class, n?.className);
}, sa = Bb(
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
    r ? Ib : "button",
    {
      "data-slot": "button",
      className: de(sa({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function Wb({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const l = Va();
  return /* @__PURE__ */ p(
    Jy,
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
        formatMonthDropdown: (u) => u.toLocaleString("default", { month: "short" }),
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
          sa({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: de(
          sa({ variant: o }),
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
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
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
        Root: ({ className: u, rootRef: c, ...d }) => /* @__PURE__ */ p(
          "div",
          {
            "data-slot": "calendar",
            ref: c,
            className: de(u),
            ...d
          }
        ),
        Chevron: ({ className: u, orientation: c, ...d }) => c === "left" ? /* @__PURE__ */ p(Dp, { className: de("size-4", u), ...d }) : c === "right" ? /* @__PURE__ */ p(
          Rp,
          {
            className: de("size-4", u),
            ...d
          }
        ) : /* @__PURE__ */ p(Ap, { className: de("size-4", u), ...d }),
        DayButton: Fb,
        WeekNumber: ({ children: u, ...c }) => /* @__PURE__ */ p("td", { ...c, children: /* @__PURE__ */ p("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: u }) }),
        ...a
      },
      ...i
    }
  );
}
function Fb({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Va(), s = C.useRef(null);
  return C.useEffect(() => {
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
      className: de(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let Wn = null;
const gu = /* @__PURE__ */ new Map(), Ub = /* @__PURE__ */ new Map();
function yo() {
  if (!Wn) return;
  const e = Wn;
  Wn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Yb(e) {
  return Wn?.pillDate === e;
}
function jb({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = q(null), a = Vo(e);
  J(() => {
    const b = (k) => {
      k.key === "Escape" && (k.stopPropagation(), k.preventDefault(), o());
    };
    return document.addEventListener("keydown", b, !0), () => document.removeEventListener("keydown", b, !0);
  }, [o]), J(() => {
    const b = (M) => {
      s.current && !s.current.contains(M.target) && (M.target.closest(".date-pill") || o());
    }, k = setTimeout(() => {
      document.addEventListener("mousedown", b, !0);
    }, 50);
    return () => {
      clearTimeout(k), document.removeEventListener("mousedown", b, !0);
    };
  }, [o]);
  const i = j((b) => {
    b && r(Un(b)), o();
  }, [r, o]), l = j((b) => {
    const k = /* @__PURE__ */ new Date();
    k.setDate(k.getDate() + b), r(Un(k)), o();
  }, [r, o]), u = j(() => {
    const k = (/* @__PURE__ */ new Date()).getDay(), M = k === 0 ? 1 : 8 - k, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + M), r(Un(w)), o();
  }, [r, o]), c = /* @__PURE__ */ new Date(), d = c.toDateString(), f = new Date(c);
  f.setDate(f.getDate() + 1);
  const h = f.toDateString(), m = c.getDay(), g = m === 0 ? 1 : 8 - m, y = new Date(c);
  y.setDate(y.getDate() + g);
  const v = y.toDateString();
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
            Wb,
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
                className: de(
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
                className: de(
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
                className: de(
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
function Vb(e, t, n) {
  if (Yb(t)) {
    yo();
    return;
  }
  yo();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, a = 320, i = 420, l = 10, u = 16, c = s - r.bottom - l - u, d = r.top - l - u, f = c >= i ? "below" : d >= i ? "above" : c >= d ? "below" : "above";
  let h;
  f === "below" ? h = r.bottom + l : h = r.top - i - l;
  const m = r.left + r.width / 2;
  let g = m - a / 2;
  g + a > o - u && (g = o - a - u), g < u && (g = u);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    y.addEventListener(w, (S) => {
      S.stopPropagation();
    }, !1);
  });
  const b = yh(y);
  Wn = { container: y, root: b, pillDate: t };
  const k = () => {
    yo();
  }, M = (w) => {
    const S = gu.get(t);
    S && S(w);
  };
  b.render(
    /* @__PURE__ */ p(
      jb,
      {
        currentDate: t,
        theme: n,
        position: { top: h, left: g, direction: f, pillCenter: m },
        onSelectDate: M,
        onClose: k
      }
    )
  );
}
function Kb({ node: e, updateAttributes: t, selected: n }) {
  const r = q(null), o = e.attrs.date || Fn(), s = yu(o), a = qa(o), i = j(() => {
    if (!r.current) return "";
    const l = r.current.closest(".markdown-editor-container");
    if (l) {
      const c = l.getAttribute("data-theme");
      if (c) return c;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return J(() => (gu.set(o, (l) => {
    t({ date: l });
  }), Ub.set(o, i), () => {
  }), [o, t, i]), J(() => {
    const l = r.current;
    if (!l) return;
    const u = (c) => {
      c.preventDefault(), c.stopPropagation();
      const d = l.getAttribute("data-date") || Fn(), f = i();
      Vb(l, d, f);
    };
    return l.addEventListener("click", u), () => l.removeEventListener("click", u);
  }, [i]), J(() => {
    const l = r.current?.closest(".ProseMirror") || document, u = () => {
      Wn && yo();
    };
    return l.addEventListener("scroll", u, { passive: !0 }), () => {
      l.removeEventListener("scroll", u);
    };
  }, []), /* @__PURE__ */ p(Ir, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: r,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ p(mc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ p("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Vo(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function Fn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Sr(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function Un(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function yu(e) {
  const t = Vo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function qb(e) {
  return Vo(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function pn(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return Fn();
  if (n === "tomorrow") return Sr(1);
  if (n === "yesterday") return Sr(-1);
  if (n === "next monday") {
    const i = (/* @__PURE__ */ new Date()).getDay(), l = i === 0 ? 1 : 8 - i;
    return Sr(l);
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
      return Un(c);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const a = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return Un(a);
  }
  return null;
}
function qa(e) {
  const t = Vo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Gb = new qe("datePillPaste"), Xb = zo.create({
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
        default: Fn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = yu(n), o = qa(n);
    return [
      "span",
      Zn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return _o(Kb, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || Fn();
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
        d().deleteRange(c).insertDatePill(Fn()).run();
      }
    }), t = new Je({
      find: /@tomorrow\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(Sr(1)).run();
      }
    }), n = new Je({
      find: /@yesterday\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(Sr(-1)).run();
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
          d().deleteRange(c).insertDatePill(Un(y)).run();
        }
      }
    }), s = new Je({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: c, chain: d, match: f }) => {
        const h = pn(f[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), a = new Je({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: c, chain: d, match: f }) => {
        const h = pn(f[1]);
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
        const h = pn(f[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), u = new Je({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: c, chain: d, match: f }) => {
        const h = pn(f[1]);
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
      new Ke({
        key: Gb,
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
              if (pn(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: c } = t, { tr: d, schema: f } = c, h = [];
            let m = 0;
            const g = new RegExp(a.source, a.flags);
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const M = y[1], w = pn(M);
              if (w) {
                const S = o.slice(m, y.index);
                S && h.push(f.text(S)), h.push(e.create({ date: w })), m = y.index + y[0].length;
              }
            }
            const v = o.slice(m);
            if (v && h.push(f.text(v)), h.length === 0) return !1;
            const b = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, h)
            ), { $from: k } = c.selection;
            if (k.parent.type.name === "paragraph") {
              const M = d;
              let w = c.selection.from;
              for (const S of h)
                M.insert(w, S), w += S.nodeSize;
              M.delete(c.selection.from, c.selection.to), t.dispatch(M);
            } else
              d.replaceSelectionWith(b), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function Zb({ node: e, selected: t }) {
  const n = q(null), r = e.attrs.tag || "", o = j((s) => {
    s.preventDefault(), s.stopPropagation();
  }, []);
  return /* @__PURE__ */ p(Ir, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: n,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": r,
      onClick: o,
      children: [
        /* @__PURE__ */ p(Lp, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ p("span", { className: "tag-text", children: r })
      ]
    }
  ) });
}
function vr(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function bo(e) {
  return e.toLowerCase().trim();
}
const Qb = new qe("tagPillPaste"), Jb = zo.create({
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
      Zn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return _o(Zb, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = bo(e);
        return vr(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return [new Je({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = bo(r[1]);
        if (vr(o)) {
          const a = r[0].startsWith(" ") ? 1 : 0, i = t.from + a;
          n().deleteRange({ from: i, to: t.to }).insertTagPill(o).run();
        }
      }
    })];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new Ke({
        key: Qb,
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
              if (vr(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: c } = t, { tr: d, schema: f } = c, h = [];
            let m = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const k = bo(y[1]);
              if (vr(k)) {
                const M = y[0], w = M.startsWith(" ") || M.startsWith(`
`) ? 1 : 0, S = o.slice(m, y.index + w);
                S && h.push(f.text(S)), h.push(e.create({ tag: k })), m = y.index + M.length;
              }
            }
            const v = o.slice(m);
            if (v && h.push(f.text(v)), h.length === 0) return !1;
            const { $from: b } = c.selection;
            if (b.parent.type.name === "paragraph") {
              const k = d;
              let M = c.selection.from;
              for (const w of h)
                k.insert(M, w), M += w.nodeSize;
              k.delete(c.selection.from, c.selection.to), t.dispatch(k);
            } else {
              const k = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, h)
              );
              d.replaceSelectionWith(k), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function bu({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = V(""), [a, i] = V(""), [l, u] = V(""), [c, d] = V(!1), f = q(null), h = q(null);
  J(() => {
    e && (s(""), i(""), u(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), J(() => {
    if (!e) return;
    const b = (w) => {
      h.current && !h.current.contains(w.target) && t();
    }, k = (w) => {
      w.key === "Escape" && t();
    }, M = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return document.addEventListener("keydown", k), () => {
      clearTimeout(M), document.removeEventListener("mousedown", b), document.removeEventListener("keydown", k);
    };
  }, [e, t]);
  const m = (b) => {
    if (!b.trim())
      return u("Please enter an image URL"), !1;
    try {
      const k = new URL(b);
      if (!["http:", "https:", "data:"].includes(k.protocol))
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
            /* @__PURE__ */ p($a, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ p("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ p($t, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ p(Sa, { size: 12 }),
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
              /* @__PURE__ */ p(Fo, { size: 12 }),
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
const ev = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ p(Fo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ p(Pp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ p(Ip, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ p(Op, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ p($p, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ p(_p, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ p(Aa, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ p(La, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ p(Pa, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ p(Ra, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ p(gc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ p(Zs, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ p($a, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ p(yc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ p(xo, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ p(pc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ p(fc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ p(Oa, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ p(Ia, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ p(mc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ p(Sa, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], tv = 32, nv = 8, rv = 320, ov = 210, ro = 12;
function fl(e) {
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
function sv({ editor: e }) {
  const [t, n] = V(!1), [r, o] = V(""), [s, a] = V(0), [i, l] = V(null), [u, c] = V(!1), [d, f] = V({ top: 0, left: 0 }), [h, m] = V("below"), g = q(null), y = q(-1), v = q(!1);
  J(() => {
    v.current = t;
  }, [t]);
  const b = ev.filter((T) => {
    if (!r) return !0;
    const E = r.toLowerCase();
    return T.title.toLowerCase().includes(E) || T.keywords?.some((D) => D.includes(E));
  }), k = Math.min(
    b.length * tv + nv,
    rv
  );
  Bo(() => {
    if (!t || !i) return;
    const { top: T, bottom: E, left: D } = i, R = window.innerHeight, I = window.innerWidth, O = R - E - ro, H = T - ro;
    let W;
    if (O >= k ? W = "below" : H >= k ? W = "above" : W = O >= H ? "below" : "above", m(W), g.current) {
      const G = Math.max(
        ro,
        Math.min(D, I - ov - ro)
      ), P = W === "below" ? E + 4 : T - k - 4;
      g.current.style.top = `${P}px`, g.current.style.left = `${G}px`;
    }
  }, [t, i, k, b.length]);
  const M = j(() => {
    const { state: T } = e, { selection: E } = T, D = E.from, R = y.current;
    if (R >= 0 && R <= D)
      e.chain().focus().deleteRange({ from: R, to: D }).run();
    else {
      const { $from: I } = E, H = I.parent.textBetween(0, I.parentOffset, void 0, "￼").lastIndexOf("/");
      if (H !== -1) {
        const W = I.pos - (I.parentOffset - H);
        e.chain().focus().deleteRange({ from: W, to: I.pos }).run();
      }
    }
  }, [e]), w = j(() => {
    n(!1), o(""), a(0), y.current = -1, l(null);
  }, []), S = j((T) => {
    const E = b[T];
    if (E) {
      if (M(), E.isImageCommand) {
        const { state: D } = e, R = e.view.coordsAtPos(D.selection.from);
        f({
          top: R.bottom + 8,
          left: R.left
        }), c(!0);
      } else
        E.command(e);
      w();
    }
  }, [e, b, M, w]), N = j((T, E) => {
    e.chain().focus().setImage({ src: T, alt: E }).run();
  }, [e]);
  return J(() => {
    if (!e) return;
    const T = () => {
      if (v.current) return;
      const { state: E } = e, { selection: D } = E, { $from: R } = D;
      if (R.parentOffset === 0) return;
      const I = R.parent.textBetween(0, R.parentOffset, void 0, "￼");
      if (!I.endsWith("/")) return;
      const O = I.length > 1 ? I.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = R.pos - 1;
      const H = fl(e);
      H && (l(H), n(!0), o(""), a(0));
    };
    return e.on("update", T), () => {
      e.off("update", T);
    };
  }, [e]), J(() => {
    if (!e || !t) return;
    const T = e.view.dom, E = (D) => {
      v.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), a((R) => (R + 1) % b.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), a((R) => (R - 1 + b.length) % b.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), S(s)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), w()));
    };
    return T.addEventListener("keydown", E, !0), () => {
      T.removeEventListener("keydown", E, !0);
    };
  }, [e, t, s, b, S, w]), J(() => {
    if (!e || !t) return;
    const T = () => {
      if (!v.current || y.current < 0) return;
      const { state: E } = e, { selection: D } = E, R = D.from, I = y.current;
      if (R <= I) {
        w();
        return;
      }
      try {
        const O = E.doc.textBetween(I + 1, R, void 0, "￼");
        if (O.includes(`
`)) {
          w();
          return;
        }
        o(O), a(0);
        const H = fl(e);
        H && l(H);
      } catch {
        w();
      }
    };
    return e.on("update", T), e.on("selectionUpdate", T), () => {
      e.off("update", T), e.off("selectionUpdate", T);
    };
  }, [e, t, w]), J(() => {
    if (!t) return;
    const T = (E) => {
      g.current && !g.current.contains(E.target) && w();
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [t, w]), J(() => {
    t && b.length === 0 && r.length > 2 && w();
  }, [t, b.length, r, w]), J(() => {
    s >= b.length && a(Math.max(0, b.length - 1));
  }, [b.length, s]), J(() => {
    if (!t || !g.current) return;
    const T = g.current.querySelector(".slash-item.is-selected");
    T && T.scrollIntoView({ block: "nearest" });
  }, [t, s]), u ? /* @__PURE__ */ p(
    bu,
    {
      isOpen: u,
      onClose: () => c(!1),
      onInsert: N,
      position: d
    }
  ) : !t || b.length === 0 ? null : /* @__PURE__ */ p(Bt, { children: /* @__PURE__ */ p(
    "div",
    {
      ref: g,
      className: `slash-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: b.map((T, E) => /* @__PURE__ */ A(
        "div",
        {
          className: `slash-item ${E === s ? "is-selected" : ""}`,
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation(), S(E);
          },
          onMouseEnter: () => a(E),
          children: [
            /* @__PURE__ */ p("span", { className: "slash-icon", children: T.icon }),
            /* @__PURE__ */ p("span", { className: "slash-label", children: T.title })
          ]
        },
        T.title
      ))
    }
  ) });
}
const av = 340, iv = 36, lv = 8, cv = 240, oo = 8;
function pl(e) {
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
function uv({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = V(!1), [s, a] = V(""), [i, l] = V([]), [u, c] = V(0), [d, f] = V(null), [h, m] = V("below"), [g, y] = V(!1), v = q(!1), b = q(null), k = q(-1), M = q(null);
  J(() => {
    v.current = r;
  }, [r]);
  const w = j(() => {
    o(!1), a(""), l([]), c(0), k.current = -1;
  }, []), S = j((D) => {
    const R = k.current;
    if (R < 0) return;
    const { state: I } = e, O = I.selection.from;
    try {
      const H = I.tr.delete(R, O), W = I.schema.marks.wikiLink;
      if (W) {
        const G = W.create({ pageName: D }), P = I.schema.text(D, [G]);
        H.insert(R, P);
        const L = R + D.length;
        H.setSelection(Ho.create(H.doc, L)), H.removeStoredMark(W);
      } else
        H.insertText(`[[${D}]]`, R);
      e.view.dispatch(H), e.view.focus();
    } catch (H) {
      console.warn("WikiLinkAutocomplete: Error inserting link", H);
    }
    w();
  }, [e, w]);
  J(() => {
    if (!e) return;
    const D = () => {
      if (v.current) return;
      const { state: R } = e, { selection: I } = R, { $from: O } = I;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      k.current = O.pos - 2;
      const W = pl(e);
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
          I.preventDefault(), I.stopPropagation(), u < i.length ? S(i[u].title) : s.trim() && n ? (n(s.trim()), w()) : s.trim() && S(s.trim());
          return;
        }
        if (I.key === "Escape") {
          I.preventDefault(), w();
          return;
        }
        I.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: H } = O.selection;
          H.parent.textBetween(0, H.parentOffset, void 0, "￼").endsWith("]]") && w();
        }, 0);
      }
    };
    return D.addEventListener("keydown", R, !0), () => {
      D.removeEventListener("keydown", R, !0);
    };
  }, [e, r, i, u, s, S, w, n]), J(() => {
    if (!e || !r) return;
    const D = () => {
      const R = k.current;
      if (R < 0) {
        w();
        return;
      }
      const { state: I } = e, O = I.selection.from;
      if (O <= R) {
        w();
        return;
      }
      try {
        const H = I.doc.textBetween(R + 2, O, void 0, "￼");
        if (H.includes(`
`) || H.includes("]]")) {
          w();
          return;
        }
        a(H), c(0);
        const W = pl(e);
        W && f(W);
      } catch {
        w();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, r, w]), J(() => {
    if (r) {
      if (M.current && clearTimeout(M.current), !s.trim()) {
        y(!0), M.current = setTimeout(async () => {
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
      return y(!0), M.current = setTimeout(async () => {
        try {
          const D = await t(s.trim());
          l(D);
        } catch {
          l([]);
        }
        y(!1);
      }, 150), () => {
        M.current && clearTimeout(M.current);
      };
    }
  }, [r, s, t]), J(() => {
    if (!r) return;
    const D = (R) => {
      b.current && !b.current.contains(R.target) && w();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [r, w]), J(() => {
    if (!r || !b.current) return;
    const D = b.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [r, u]);
  const N = i.length + (s.trim() ? 1 : 0), x = Math.min(
    Math.max(N, 1) * iv + lv,
    cv
  );
  if (Bo(() => {
    if (!r || !d) return;
    const { top: D, bottom: R, left: I } = d, O = window.innerHeight, H = window.innerWidth, W = O - R - oo, G = D - oo;
    let P;
    if (W >= x ? P = "below" : G >= x ? P = "above" : P = W >= G ? "below" : "above", m(P), b.current) {
      const L = Math.max(
        oo,
        Math.min(I, H - av - oo)
      ), F = P === "below" ? R + 4 : D - x - 4;
      b.current.style.top = `${F}px`, b.current.style.left = `${L}px`;
    }
  }, [r, d, x, N]), !r) return null;
  const T = s.trim() && !i.some((D) => D.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ p(Bt, { children: /* @__PURE__ */ A(
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
              I.preventDefault(), S(D.title);
            },
            onMouseEnter: () => c(R),
            children: [
              /* @__PURE__ */ p("span", { className: "wikilink-icon", children: /* @__PURE__ */ p(_a, { size: 14 }) }),
              /* @__PURE__ */ p("span", { className: "wikilink-label", children: D.title }),
              /* @__PURE__ */ p("span", { className: "wikilink-type", children: D.type })
            ]
          },
          D.id
        )),
        T && /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item wikilink-create ${i.length === u ? "is-selected" : ""}`,
            onMouseDown: (D) => {
              D.preventDefault(), n ? (n(s.trim()), w()) : S(s.trim());
            },
            onMouseEnter: () => c(i.length),
            children: [
              /* @__PURE__ */ p("span", { className: "wikilink-icon", children: /* @__PURE__ */ p(Ha, { size: 14 }) }),
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
function fe(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function or(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = C.createContext(a), l = n.length;
    n = [...n, a];
    const u = (d) => {
      const { scope: f, children: h, ...m } = d, g = f?.[e]?.[l] || i, y = C.useMemo(() => m, Object.values(m));
      return /* @__PURE__ */ p(g.Provider, { value: y, children: h });
    };
    u.displayName = s + "Provider";
    function c(d, f) {
      const h = f?.[e]?.[l] || i, m = C.useContext(h);
      if (m) return m;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [u, c];
  }
  const o = () => {
    const s = n.map((a) => C.createContext(a));
    return function(i) {
      const l = i?.[e] || s;
      return C.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, dv(o, ...t)];
}
function dv(...e) {
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
      return C.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var tn = globalThis?.document ? C.useLayoutEffect : () => {
}, fv = C[" useInsertionEffect ".trim().toString()] || tn;
function Ga({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = pv({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const c = C.useRef(e !== void 0);
    C.useEffect(() => {
      const d = c.current;
      d !== i && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), c.current = i;
    }, [i, r]);
  }
  const u = C.useCallback(
    (c) => {
      if (i) {
        const d = hv(c) ? c(e) : c;
        d !== e && a.current?.(d);
      } else
        s(c);
    },
    [i, e, s, a]
  );
  return [l, u];
}
function pv({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = C.useState(e), o = C.useRef(n), s = C.useRef(t);
  return fv(() => {
    s.current = t;
  }, [t]), C.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function hv(e) {
  return typeof e == "function";
}
var mv = [
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
], Ue = mv.reduce((e, t) => {
  const n = /* @__PURE__ */ Nr(`Primitive.${t}`), r = C.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p(l, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function vu(e, t) {
  e && Dc.flushSync(() => e.dispatchEvent(t));
}
function wu(e) {
  const t = e + "CollectionProvider", [n, r] = or(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: y, children: v } = g, b = Q.useRef(null), k = Q.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ p(o, { scope: y, itemMap: k, collectionRef: b, children: v });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ Nr(i), u = Q.forwardRef(
    (g, y) => {
      const { scope: v, children: b } = g, k = s(i, v), M = Ve(y, k.collectionRef);
      return /* @__PURE__ */ p(l, { ref: M, children: b });
    }
  );
  u.displayName = i;
  const c = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ Nr(c), h = Q.forwardRef(
    (g, y) => {
      const { scope: v, children: b, ...k } = g, M = Q.useRef(null), w = Ve(y, M), S = s(c, v);
      return Q.useEffect(() => (S.itemMap.set(M, { ref: M, ...k }), () => void S.itemMap.delete(M))), /* @__PURE__ */ p(f, { [d]: "", ref: w, children: b });
    }
  );
  h.displayName = c;
  function m(g) {
    const y = s(e + "CollectionConsumer", g);
    return Q.useCallback(() => {
      const b = y.collectionRef.current;
      if (!b) return [];
      const k = Array.from(b.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (S, N) => k.indexOf(S.ref.current) - k.indexOf(N.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    m,
    r
  ];
}
var gv = C.createContext(void 0);
function ku(e) {
  const t = C.useContext(gv);
  return e || t || "ltr";
}
function _t(e) {
  const t = C.useRef(e);
  return C.useEffect(() => {
    t.current = e;
  }), C.useMemo(() => (...n) => t.current?.(...n), []);
}
function yv(e, t = globalThis?.document) {
  const n = _t(e);
  C.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var bv = "DismissableLayer", aa = "dismissableLayer.update", vv = "dismissableLayer.pointerDownOutside", wv = "dismissableLayer.focusOutside", hl, xu = C.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Xa = C.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, u = C.useContext(xu), [c, d] = C.useState(null), f = c?.ownerDocument ?? globalThis?.document, [, h] = C.useState({}), m = Ve(t, (N) => d(N)), g = Array.from(u.layers), [y] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(y), b = c ? g.indexOf(c) : -1, k = u.layersWithOutsidePointerEventsDisabled.size > 0, M = b >= v, w = Cv((N) => {
      const x = N.target, T = [...u.branches].some((E) => E.contains(x));
      !M || T || (o?.(N), a?.(N), N.defaultPrevented || i?.());
    }, f), S = Sv((N) => {
      const x = N.target;
      [...u.branches].some((E) => E.contains(x)) || (s?.(N), a?.(N), N.defaultPrevented || i?.());
    }, f);
    return yv((N) => {
      b === u.layers.size - 1 && (r?.(N), !N.defaultPrevented && i && (N.preventDefault(), i()));
    }, f), C.useEffect(() => {
      if (c)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (hl = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(c)), u.layers.add(c), ml(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = hl);
        };
    }, [c, f, n, u]), C.useEffect(() => () => {
      c && (u.layers.delete(c), u.layersWithOutsidePointerEventsDisabled.delete(c), ml());
    }, [c, u]), C.useEffect(() => {
      const N = () => h({});
      return document.addEventListener(aa, N), () => document.removeEventListener(aa, N);
    }, []), /* @__PURE__ */ p(
      Ue.div,
      {
        ...l,
        ref: m,
        style: {
          pointerEvents: k ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: fe(e.onFocusCapture, S.onFocusCapture),
        onBlurCapture: fe(e.onBlurCapture, S.onBlurCapture),
        onPointerDownCapture: fe(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
Xa.displayName = bv;
var kv = "DismissableLayerBranch", xv = C.forwardRef((e, t) => {
  const n = C.useContext(xu), r = C.useRef(null), o = Ve(t, r);
  return C.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ p(Ue.div, { ...e, ref: o });
});
xv.displayName = kv;
function Cv(e, t = globalThis?.document) {
  const n = _t(e), r = C.useRef(!1), o = C.useRef(() => {
  });
  return C.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          Cu(
            vv,
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
function Sv(e, t = globalThis?.document) {
  const n = _t(e), r = C.useRef(!1);
  return C.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Cu(wv, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function ml() {
  const e = new CustomEvent(aa);
  document.dispatchEvent(e);
}
function Cu(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? vu(o, s) : o.dispatchEvent(s);
}
var As = 0;
function Tv() {
  C.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? gl()), document.body.insertAdjacentElement("beforeend", e[1] ?? gl()), As++, () => {
      As === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), As--;
    };
  }, []);
}
function gl() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ls = "focusScope.autoFocusOnMount", Ps = "focusScope.autoFocusOnUnmount", yl = { bubbles: !1, cancelable: !0 }, Mv = "FocusScope", Su = C.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = C.useState(null), u = _t(o), c = _t(s), d = C.useRef(null), f = Ve(t, (g) => l(g)), h = C.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  C.useEffect(() => {
    if (r) {
      let g = function(k) {
        if (h.paused || !i) return;
        const M = k.target;
        i.contains(M) ? d.current = M : Qt(d.current, { select: !0 });
      }, y = function(k) {
        if (h.paused || !i) return;
        const M = k.relatedTarget;
        M !== null && (i.contains(M) || Qt(d.current, { select: !0 }));
      }, v = function(k) {
        if (document.activeElement === document.body)
          for (const w of k)
            w.removedNodes.length > 0 && Qt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const b = new MutationObserver(v);
      return i && b.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), b.disconnect();
      };
    }
  }, [r, i, h.paused]), C.useEffect(() => {
    if (i) {
      vl.add(h);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const v = new CustomEvent(Ls, yl);
        i.addEventListener(Ls, u), i.dispatchEvent(v), v.defaultPrevented || (Ev(Lv(Tu(i)), { select: !0 }), document.activeElement === g && Qt(i));
      }
      return () => {
        i.removeEventListener(Ls, u), setTimeout(() => {
          const v = new CustomEvent(Ps, yl);
          i.addEventListener(Ps, c), i.dispatchEvent(v), v.defaultPrevented || Qt(g ?? document.body, { select: !0 }), i.removeEventListener(Ps, c), vl.remove(h);
        }, 0);
      };
    }
  }, [i, u, c, h]);
  const m = C.useCallback(
    (g) => {
      if (!n && !r || h.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (y && v) {
        const b = g.currentTarget, [k, M] = Nv(b);
        k && M ? !g.shiftKey && v === M ? (g.preventDefault(), n && Qt(k, { select: !0 })) : g.shiftKey && v === k && (g.preventDefault(), n && Qt(M, { select: !0 })) : v === b && g.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ p(Ue.div, { tabIndex: -1, ...a, ref: f, onKeyDown: m });
});
Su.displayName = Mv;
function Ev(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Qt(r, { select: t }), document.activeElement !== n) return;
}
function Nv(e) {
  const t = Tu(e), n = bl(t, e), r = bl(t.reverse(), e);
  return [n, r];
}
function Tu(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function bl(e, t) {
  for (const n of e)
    if (!Dv(n, { upTo: t })) return n;
}
function Dv(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Rv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Qt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Rv(e) && t && e.select();
  }
}
var vl = Av();
function Av() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = wl(e, t), e.unshift(t);
    },
    remove(t) {
      e = wl(e, t), e[0]?.resume();
    }
  };
}
function wl(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Lv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Pv = C[" useId ".trim().toString()] || (() => {
}), Iv = 0;
function Co(e) {
  const [t, n] = C.useState(Pv());
  return tn(() => {
    n((r) => r ?? String(Iv++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Ov = ["top", "right", "bottom", "left"], nn = Math.min, tt = Math.max, So = Math.round, so = Math.floor, kt = (e) => ({
  x: e,
  y: e
}), $v = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, _v = {
  start: "end",
  end: "start"
};
function ia(e, t, n) {
  return tt(e, nn(t, n));
}
function Ht(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function zt(e) {
  return e.split("-")[0];
}
function sr(e) {
  return e.split("-")[1];
}
function Za(e) {
  return e === "x" ? "y" : "x";
}
function Qa(e) {
  return e === "y" ? "height" : "width";
}
const Hv = /* @__PURE__ */ new Set(["top", "bottom"]);
function wt(e) {
  return Hv.has(zt(e)) ? "y" : "x";
}
function Ja(e) {
  return Za(wt(e));
}
function zv(e, t, n) {
  n === void 0 && (n = !1);
  const r = sr(e), o = Ja(e), s = Qa(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = To(a)), [a, To(a)];
}
function Bv(e) {
  const t = To(e);
  return [la(e), t, la(t)];
}
function la(e) {
  return e.replace(/start|end/g, (t) => _v[t]);
}
const kl = ["left", "right"], xl = ["right", "left"], Wv = ["top", "bottom"], Fv = ["bottom", "top"];
function Uv(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? xl : kl : t ? kl : xl;
    case "left":
    case "right":
      return t ? Wv : Fv;
    default:
      return [];
  }
}
function Yv(e, t, n, r) {
  const o = sr(e);
  let s = Uv(zt(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(la)))), s;
}
function To(e) {
  return e.replace(/left|right|bottom|top/g, (t) => $v[t]);
}
function jv(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Mu(e) {
  return typeof e != "number" ? jv(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Mo(e) {
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
function Cl(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = wt(t), a = Ja(t), i = Qa(a), l = zt(t), u = s === "y", c = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
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
  switch (sr(t)) {
    case "start":
      h[a] -= f * (n && u ? -1 : 1);
      break;
    case "end":
      h[a] += f * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const Vv = async (e, t, n) => {
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
  } = Cl(u, r, l), f = r, h = {}, m = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: y,
      fn: v
    } = i[g], {
      x: b,
      y: k,
      data: M,
      reset: w
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
    c = b ?? c, d = k ?? d, h = {
      ...h,
      [y]: {
        ...h[y],
        ...M
      }
    }, w && m <= 50 && (m++, typeof w == "object" && (w.placement && (f = w.placement), w.rects && (u = w.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : w.rects), {
      x: c,
      y: d
    } = Cl(u, f, l)), g = -1);
  }
  return {
    x: c,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: h
  };
};
async function Dr(e, t) {
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
  } = Ht(t, e), m = Mu(h), y = i[f ? d === "floating" ? "reference" : "floating" : d], v = Mo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: l
  })), b = d === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, k = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), M = await (s.isElement == null ? void 0 : s.isElement(k)) ? await (s.getScale == null ? void 0 : s.getScale(k)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = Mo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: b,
    offsetParent: k,
    strategy: l
  }) : b);
  return {
    top: (v.top - w.top + m.top) / M.y,
    bottom: (w.bottom - v.bottom + m.bottom) / M.y,
    left: (v.left - w.left + m.left) / M.x,
    right: (w.right - v.right + m.right) / M.x
  };
}
const Kv = (e) => ({
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
    } = Ht(e, t) || {};
    if (u == null)
      return {};
    const d = Mu(c), f = {
      x: n,
      y: r
    }, h = Ja(o), m = Qa(h), g = await a.getDimensions(u), y = h === "y", v = y ? "top" : "left", b = y ? "bottom" : "right", k = y ? "clientHeight" : "clientWidth", M = s.reference[m] + s.reference[h] - f[h] - s.floating[m], w = f[h] - s.reference[h], S = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let N = S ? S[k] : 0;
    (!N || !await (a.isElement == null ? void 0 : a.isElement(S))) && (N = i.floating[k] || s.floating[m]);
    const x = M / 2 - w / 2, T = N / 2 - g[m] / 2 - 1, E = nn(d[v], T), D = nn(d[b], T), R = E, I = N - g[m] - D, O = N / 2 - g[m] / 2 + x, H = ia(R, O, I), W = !l.arrow && sr(o) != null && O !== H && s.reference[m] / 2 - (O < R ? E : D) - g[m] / 2 < 0, G = W ? O < R ? O - R : O - I : 0;
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
}), qv = function(e) {
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
      } = Ht(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = zt(o), b = wt(i), k = zt(i) === i, M = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), w = f || (k || !g ? [To(i)] : Bv(i)), S = m !== "none";
      !f && S && w.push(...Yv(i, g, m, M));
      const N = [i, ...w], x = await Dr(t, y), T = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (c && T.push(x[v]), d) {
        const O = zv(o, a, M);
        T.push(x[O[0]], x[O[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: T
      }], !T.every((O) => O <= 0)) {
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
                if (S) {
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
function Sl(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Tl(e) {
  return Ov.some((t) => e[t] >= 0);
}
const Gv = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Ht(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Dr(t, {
            ...o,
            elementContext: "reference"
          }), a = Sl(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Tl(a)
            }
          };
        }
        case "escaped": {
          const s = await Dr(t, {
            ...o,
            altBoundary: !0
          }), a = Sl(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Tl(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Eu = /* @__PURE__ */ new Set(["left", "top"]);
async function Xv(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = zt(n), i = sr(n), l = wt(n) === "y", u = Eu.has(a) ? -1 : 1, c = s && l ? -1 : 1, d = Ht(t, e);
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
const Zv = function(e) {
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
      } = t, l = await Xv(t, e);
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
}, Qv = function(e) {
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
      } = Ht(e, t), u = {
        x: n,
        y: r
      }, c = await Dr(t, l), d = wt(zt(o)), f = Za(d);
      let h = u[f], m = u[d];
      if (s) {
        const y = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", b = h + c[y], k = h - c[v];
        h = ia(b, h, k);
      }
      if (a) {
        const y = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", b = m + c[y], k = m - c[v];
        m = ia(b, m, k);
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
}, Jv = function(e) {
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
      } = Ht(e, t), c = {
        x: n,
        y: r
      }, d = wt(o), f = Za(d);
      let h = c[f], m = c[d];
      const g = Ht(i, t), y = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const k = f === "y" ? "height" : "width", M = s.reference[f] - s.floating[k] + y.mainAxis, w = s.reference[f] + s.reference[k] - y.mainAxis;
        h < M ? h = M : h > w && (h = w);
      }
      if (u) {
        var v, b;
        const k = f === "y" ? "width" : "height", M = Eu.has(zt(o)), w = s.reference[d] - s.floating[k] + (M && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (M ? 0 : y.crossAxis), S = s.reference[d] + s.reference[k] + (M ? 0 : ((b = a.offset) == null ? void 0 : b[d]) || 0) - (M ? y.crossAxis : 0);
        m < w ? m = w : m > S && (m = S);
      }
      return {
        [f]: h,
        [d]: m
      };
    }
  };
}, ew = function(e) {
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
      } = Ht(e, t), c = await Dr(t, u), d = zt(o), f = sr(o), h = wt(o) === "y", {
        width: m,
        height: g
      } = s.floating;
      let y, v;
      d === "top" || d === "bottom" ? (y = d, v = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, y = f === "end" ? "top" : "bottom");
      const b = g - c.top - c.bottom, k = m - c.left - c.right, M = nn(g - c[y], b), w = nn(m - c[v], k), S = !t.middlewareData.shift;
      let N = M, x = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = k), (r = t.middlewareData.shift) != null && r.enabled.y && (N = b), S && !f) {
        const E = tt(c.left, 0), D = tt(c.right, 0), R = tt(c.top, 0), I = tt(c.bottom, 0);
        h ? x = m - 2 * (E !== 0 || D !== 0 ? E + D : tt(c.left, c.right)) : N = g - 2 * (R !== 0 || I !== 0 ? R + I : tt(c.top, c.bottom));
      }
      await l({
        ...t,
        availableWidth: x,
        availableHeight: N
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
function Ko() {
  return typeof window < "u";
}
function ar(e) {
  return Nu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function nt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function St(e) {
  var t;
  return (t = (Nu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Nu(e) {
  return Ko() ? e instanceof Node || e instanceof nt(e).Node : !1;
}
function pt(e) {
  return Ko() ? e instanceof Element || e instanceof nt(e).Element : !1;
}
function xt(e) {
  return Ko() ? e instanceof HTMLElement || e instanceof nt(e).HTMLElement : !1;
}
function Ml(e) {
  return !Ko() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof nt(e).ShadowRoot;
}
const tw = /* @__PURE__ */ new Set(["inline", "contents"]);
function Hr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = ht(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !tw.has(o);
}
const nw = /* @__PURE__ */ new Set(["table", "td", "th"]);
function rw(e) {
  return nw.has(ar(e));
}
const ow = [":popover-open", ":modal"];
function qo(e) {
  return ow.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const sw = ["transform", "translate", "scale", "rotate", "perspective"], aw = ["transform", "translate", "scale", "rotate", "perspective", "filter"], iw = ["paint", "layout", "strict", "content"];
function ei(e) {
  const t = ti(), n = pt(e) ? ht(e) : e;
  return sw.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || aw.some((r) => (n.willChange || "").includes(r)) || iw.some((r) => (n.contain || "").includes(r));
}
function lw(e) {
  let t = rn(e);
  for (; xt(t) && !qn(t); ) {
    if (ei(t))
      return t;
    if (qo(t))
      return null;
    t = rn(t);
  }
  return null;
}
function ti() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const cw = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function qn(e) {
  return cw.has(ar(e));
}
function ht(e) {
  return nt(e).getComputedStyle(e);
}
function Go(e) {
  return pt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function rn(e) {
  if (ar(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Ml(e) && e.host || // Fallback.
    St(e)
  );
  return Ml(t) ? t.host : t;
}
function Du(e) {
  const t = rn(e);
  return qn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : xt(t) && Hr(t) ? t : Du(t);
}
function Rr(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Du(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = nt(o);
  if (s) {
    const i = ca(a);
    return t.concat(a, a.visualViewport || [], Hr(o) ? o : [], i && n ? Rr(i) : []);
  }
  return t.concat(o, Rr(o, [], n));
}
function ca(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ru(e) {
  const t = ht(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = xt(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = So(n) !== s || So(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function ni(e) {
  return pt(e) ? e : e.contextElement;
}
function Yn(e) {
  const t = ni(e);
  if (!xt(t))
    return kt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Ru(t);
  let a = (s ? So(n.width) : n.width) / r, i = (s ? So(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const uw = /* @__PURE__ */ kt(0);
function Au(e) {
  const t = nt(e);
  return !ti() || !t.visualViewport ? uw : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function dw(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== nt(e) ? !1 : t;
}
function bn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ni(e);
  let a = kt(1);
  t && (r ? pt(r) && (a = Yn(r)) : a = Yn(e));
  const i = dw(s, n, r) ? Au(s) : kt(0);
  let l = (o.left + i.x) / a.x, u = (o.top + i.y) / a.y, c = o.width / a.x, d = o.height / a.y;
  if (s) {
    const f = nt(s), h = r && pt(r) ? nt(r) : r;
    let m = f, g = ca(m);
    for (; g && r && h !== m; ) {
      const y = Yn(g), v = g.getBoundingClientRect(), b = ht(g), k = v.left + (g.clientLeft + parseFloat(b.paddingLeft)) * y.x, M = v.top + (g.clientTop + parseFloat(b.paddingTop)) * y.y;
      l *= y.x, u *= y.y, c *= y.x, d *= y.y, l += k, u += M, m = nt(g), g = ca(m);
    }
  }
  return Mo({
    width: c,
    height: d,
    x: l,
    y: u
  });
}
function Xo(e, t) {
  const n = Go(e).scrollLeft;
  return t ? t.left + n : bn(St(e)).left + n;
}
function Lu(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Xo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function fw(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = St(r), i = t ? qo(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = kt(1);
  const c = kt(0), d = xt(r);
  if ((d || !d && !s) && ((ar(r) !== "body" || Hr(a)) && (l = Go(r)), xt(r))) {
    const h = bn(r);
    u = Yn(r), c.x = h.x + r.clientLeft, c.y = h.y + r.clientTop;
  }
  const f = a && !d && !s ? Lu(a, l) : kt(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + c.x + f.x,
    y: n.y * u.y - l.scrollTop * u.y + c.y + f.y
  };
}
function pw(e) {
  return Array.from(e.getClientRects());
}
function hw(e) {
  const t = St(e), n = Go(e), r = e.ownerDocument.body, o = tt(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = tt(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Xo(e);
  const i = -n.scrollTop;
  return ht(r).direction === "rtl" && (a += tt(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
const El = 25;
function mw(e, t) {
  const n = nt(e), r = St(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, l = 0;
  if (o) {
    s = o.width, a = o.height;
    const c = ti();
    (!c || c && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const u = Xo(r);
  if (u <= 0) {
    const c = r.ownerDocument, d = c.body, f = getComputedStyle(d), h = c.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, m = Math.abs(r.clientWidth - d.clientWidth - h);
    m <= El && (s -= m);
  } else u <= El && (s += u);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const gw = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function yw(e, t) {
  const n = bn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = xt(e) ? Yn(e) : kt(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = o * s.x, u = r * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: u
  };
}
function Nl(e, t, n) {
  let r;
  if (t === "viewport")
    r = mw(e, n);
  else if (t === "document")
    r = hw(St(e));
  else if (pt(t))
    r = yw(t, n);
  else {
    const o = Au(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Mo(r);
}
function Pu(e, t) {
  const n = rn(e);
  return n === t || !pt(n) || qn(n) ? !1 : ht(n).position === "fixed" || Pu(n, t);
}
function bw(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Rr(e, [], !1).filter((i) => pt(i) && ar(i) !== "body"), o = null;
  const s = ht(e).position === "fixed";
  let a = s ? rn(e) : e;
  for (; pt(a) && !qn(a); ) {
    const i = ht(a), l = ei(a);
    !l && i.position === "fixed" && (o = null), (s ? !l && !o : !l && i.position === "static" && !!o && gw.has(o.position) || Hr(a) && !l && Pu(e, a)) ? r = r.filter((c) => c !== a) : o = i, a = rn(a);
  }
  return t.set(e, r), r;
}
function vw(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? qo(t) ? [] : bw(t, this._c) : [].concat(n), r], i = a[0], l = a.reduce((u, c) => {
    const d = Nl(t, c, o);
    return u.top = tt(d.top, u.top), u.right = nn(d.right, u.right), u.bottom = nn(d.bottom, u.bottom), u.left = tt(d.left, u.left), u;
  }, Nl(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function ww(e) {
  const {
    width: t,
    height: n
  } = Ru(e);
  return {
    width: t,
    height: n
  };
}
function kw(e, t, n) {
  const r = xt(t), o = St(t), s = n === "fixed", a = bn(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = kt(0);
  function u() {
    l.x = Xo(o);
  }
  if (r || !r && !s)
    if ((ar(t) !== "body" || Hr(o)) && (i = Go(t)), r) {
      const h = bn(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else o && u();
  s && !r && o && u();
  const c = o && !r && !s ? Lu(o, i) : kt(0), d = a.left + i.scrollLeft - l.x - c.x, f = a.top + i.scrollTop - l.y - c.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function Is(e) {
  return ht(e).position === "static";
}
function Dl(e, t) {
  if (!xt(e) || ht(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return St(e) === n && (n = n.ownerDocument.body), n;
}
function Iu(e, t) {
  const n = nt(e);
  if (qo(e))
    return n;
  if (!xt(e)) {
    let o = rn(e);
    for (; o && !qn(o); ) {
      if (pt(o) && !Is(o))
        return o;
      o = rn(o);
    }
    return n;
  }
  let r = Dl(e, t);
  for (; r && rw(r) && Is(r); )
    r = Dl(r, t);
  return r && qn(r) && Is(r) && !ei(r) ? n : r || lw(e) || n;
}
const xw = async function(e) {
  const t = this.getOffsetParent || Iu, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: kw(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Cw(e) {
  return ht(e).direction === "rtl";
}
const Sw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: fw,
  getDocumentElement: St,
  getClippingRect: vw,
  getOffsetParent: Iu,
  getElementRects: xw,
  getClientRects: pw,
  getDimensions: ww,
  getScale: Yn,
  isElement: pt,
  isRTL: Cw
};
function Ou(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Tw(e, t) {
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
    const m = so(d), g = so(o.clientWidth - (c + f)), y = so(o.clientHeight - (d + h)), v = so(c), k = {
      rootMargin: -m + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: tt(0, nn(1, l)) || 1
    };
    let M = !0;
    function w(S) {
      const N = S[0].intersectionRatio;
      if (N !== l) {
        if (!M)
          return a();
        N ? a(!1, N) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      N === 1 && !Ou(u, e.getBoundingClientRect()) && a(), M = !1;
    }
    try {
      n = new IntersectionObserver(w, {
        ...k,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(w, k);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function Mw(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = ni(e), c = o || s ? [...u ? Rr(u) : [], ...Rr(t)] : [];
  c.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = u && i ? Tw(u, n) : null;
  let f = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [b] = v;
    b && b.target === u && h && (h.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var k;
      (k = h) == null || k.observe(t);
    })), n();
  }), u && !l && h.observe(u), h.observe(t));
  let m, g = l ? bn(e) : null;
  l && y();
  function y() {
    const v = bn(e);
    g && !Ou(g, v) && n(), g = v, m = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    c.forEach((b) => {
      o && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), d?.(), (v = h) == null || v.disconnect(), h = null, l && cancelAnimationFrame(m);
  };
}
const Ew = Zv, Nw = Qv, Dw = qv, Rw = ew, Aw = Gv, Rl = Kv, Lw = Jv, Pw = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Sw,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Vv(e, t, {
    ...o,
    platform: s
  });
};
var Iw = typeof document < "u", Ow = function() {
}, vo = Iw ? Bo : Ow;
function Eo(e, t) {
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
        if (!Eo(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !Eo(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function $u(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Al(e, t) {
  const n = $u(e);
  return Math.round(t * n) / n;
}
function Os(e) {
  const t = C.useRef(e);
  return vo(() => {
    t.current = e;
  }), t;
}
function $w(e) {
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
  } = e, [c, d] = C.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, h] = C.useState(r);
  Eo(f, r) || h(r);
  const [m, g] = C.useState(null), [y, v] = C.useState(null), b = C.useCallback((P) => {
    P !== S.current && (S.current = P, g(P));
  }, []), k = C.useCallback((P) => {
    P !== N.current && (N.current = P, v(P));
  }, []), M = s || m, w = a || y, S = C.useRef(null), N = C.useRef(null), x = C.useRef(c), T = l != null, E = Os(l), D = Os(o), R = Os(u), I = C.useCallback(() => {
    if (!S.current || !N.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (P.platform = D.current), Pw(S.current, N.current, P).then((L) => {
      const F = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      O.current && !Eo(x.current, F) && (x.current = F, Dc.flushSync(() => {
        d(F);
      }));
    });
  }, [f, t, n, D, R]);
  vo(() => {
    u === !1 && x.current.isPositioned && (x.current.isPositioned = !1, d((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [u]);
  const O = C.useRef(!1);
  vo(() => (O.current = !0, () => {
    O.current = !1;
  }), []), vo(() => {
    if (M && (S.current = M), w && (N.current = w), M && w) {
      if (E.current)
        return E.current(M, w, I);
      I();
    }
  }, [M, w, I, E, T]);
  const H = C.useMemo(() => ({
    reference: S,
    floating: N,
    setReference: b,
    setFloating: k
  }), [b, k]), W = C.useMemo(() => ({
    reference: M,
    floating: w
  }), [M, w]), G = C.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return P;
    const L = Al(W.floating, c.x), F = Al(W.floating, c.y);
    return i ? {
      ...P,
      transform: "translate(" + L + "px, " + F + "px)",
      ...$u(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: F
    };
  }, [n, i, W.floating, c.x, c.y]);
  return C.useMemo(() => ({
    ...c,
    update: I,
    refs: H,
    elements: W,
    floatingStyles: G
  }), [c, I, H, W, G]);
}
const _w = (e) => {
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
      return r && t(r) ? r.current != null ? Rl({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Rl({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Hw = (e, t) => ({
  ...Ew(e),
  options: [e, t]
}), zw = (e, t) => ({
  ...Nw(e),
  options: [e, t]
}), Bw = (e, t) => ({
  ...Lw(e),
  options: [e, t]
}), Ww = (e, t) => ({
  ...Dw(e),
  options: [e, t]
}), Fw = (e, t) => ({
  ...Rw(e),
  options: [e, t]
}), Uw = (e, t) => ({
  ...Aw(e),
  options: [e, t]
}), Yw = (e, t) => ({
  ..._w(e),
  options: [e, t]
});
var jw = "Arrow", _u = C.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ p(
    Ue.svg,
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
_u.displayName = jw;
var Vw = _u;
function Kw(e) {
  const [t, n] = C.useState(void 0);
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
var ri = "Popper", [Hu, Zo] = or(ri), [qw, zu] = Hu(ri), Bu = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = C.useState(null);
  return /* @__PURE__ */ p(qw, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Bu.displayName = ri;
var Wu = "PopperAnchor", Fu = C.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = zu(Wu, n), a = C.useRef(null), i = Ve(t, a), l = C.useRef(null);
    return C.useEffect(() => {
      const u = l.current;
      l.current = r?.current || a.current, u !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ p(Ue.div, { ...o, ref: i });
  }
);
Fu.displayName = Wu;
var oi = "PopperContent", [Gw, Xw] = Hu(oi), Uu = C.forwardRef(
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
    } = e, y = zu(oi, n), [v, b] = C.useState(null), k = Ve(t, (U) => b(U)), [M, w] = C.useState(null), S = Kw(M), N = S?.width ?? 0, x = S?.height ?? 0, T = r + (s !== "center" ? "-" + s : ""), E = typeof c == "number" ? c : { top: 0, right: 0, bottom: 0, left: 0, ...c }, D = Array.isArray(u) ? u : [u], R = D.length > 0, I = {
      padding: E,
      boundary: D.filter(Qw),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: O, floatingStyles: H, placement: W, isPositioned: G, middlewareData: P } = $w({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: T,
      whileElementsMounted: (...U) => Mw(...U, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Hw({ mainAxis: o + x, alignmentAxis: a }),
        l && zw({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Bw() : void 0,
          ...I
        }),
        l && Ww({ ...I }),
        Fw({
          ...I,
          apply: ({ elements: U, rects: ee, availableWidth: ge, availableHeight: be }) => {
            const { width: Ae, height: Be } = ee.reference, ot = U.floating.style;
            ot.setProperty("--radix-popper-available-width", `${ge}px`), ot.setProperty("--radix-popper-available-height", `${be}px`), ot.setProperty("--radix-popper-anchor-width", `${Ae}px`), ot.setProperty("--radix-popper-anchor-height", `${Be}px`);
          }
        }),
        M && Yw({ element: M, padding: i }),
        Jw({ arrowWidth: N, arrowHeight: x }),
        f && Uw({ strategy: "referenceHidden", ...I })
      ]
    }), [L, F] = Vu(W), X = _t(m);
    tn(() => {
      G && X?.();
    }, [G, X]);
    const K = P.arrow?.x, Z = P.arrow?.y, te = P.arrow?.centerOffset !== 0, [_, B] = C.useState();
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
          Gw,
          {
            scope: n,
            placedSide: L,
            onArrowChange: w,
            arrowX: K,
            arrowY: Z,
            shouldHideArrow: te,
            children: /* @__PURE__ */ p(
              Ue.div,
              {
                "data-side": L,
                "data-align": F,
                ...g,
                ref: k,
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
Uu.displayName = oi;
var Yu = "PopperArrow", Zw = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ju = C.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Xw(Yu, r), a = Zw[s.placedSide];
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
          Vw,
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
ju.displayName = Yu;
function Qw(e) {
  return e !== null;
}
var Jw = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, a = o.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [u, c] = Vu(n), d = { start: "0%", center: "50%", end: "100%" }[c], f = (o.arrow?.x ?? 0) + i / 2, h = (o.arrow?.y ?? 0) + l / 2;
    let m = "", g = "";
    return u === "bottom" ? (m = a ? d : `${f}px`, g = `${-l}px`) : u === "top" ? (m = a ? d : `${f}px`, g = `${r.floating.height + l}px`) : u === "right" ? (m = `${-l}px`, g = a ? d : `${h}px`) : u === "left" && (m = `${r.floating.width + l}px`, g = a ? d : `${h}px`), { data: { x: m, y: g } };
  }
});
function Vu(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Ku = Bu, qu = Fu, Gu = Uu, Xu = ju, ek = "Portal", si = C.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = C.useState(!1);
  tn(() => s(!0), []);
  const a = n || o && globalThis?.document?.body;
  return a ? hh.createPortal(/* @__PURE__ */ p(Ue.div, { ...r, ref: t }), a) : null;
});
si.displayName = ek;
function tk(e, t) {
  return C.useReducer((n, r) => t[n][r] ?? n, e);
}
var wn = (e) => {
  const { present: t, children: n } = e, r = nk(t), o = typeof n == "function" ? n({ present: r.isPresent }) : C.Children.only(n), s = Ve(r.ref, rk(o));
  return typeof n == "function" || r.isPresent ? C.cloneElement(o, { ref: s }) : null;
};
wn.displayName = "Presence";
function nk(e) {
  const [t, n] = C.useState(), r = C.useRef(null), o = C.useRef(e), s = C.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = tk(a, {
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
  return C.useEffect(() => {
    const u = ao(r.current);
    s.current = i === "mounted" ? u : "none";
  }, [i]), tn(() => {
    const u = r.current, c = o.current;
    if (c !== e) {
      const f = s.current, h = ao(u);
      e ? l("MOUNT") : h === "none" || u?.display === "none" ? l("UNMOUNT") : l(c && f !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), tn(() => {
    if (t) {
      let u;
      const c = t.ownerDocument.defaultView ?? window, d = (h) => {
        const g = ao(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (l("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = c.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (h) => {
        h.target === t && (s.current = ao(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        c.clearTimeout(u), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: C.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function ao(e) {
  return e?.animationName || "none";
}
function rk(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var $s = "rovingFocusGroup.onEntryFocus", ok = { bubbles: !1, cancelable: !0 }, zr = "RovingFocusGroup", [ua, Zu, sk] = wu(zr), [ak, Qu] = or(
  zr,
  [sk]
), [ik, lk] = ak(zr), Ju = C.forwardRef(
  (e, t) => /* @__PURE__ */ p(ua.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(ua.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(ck, { ...e, ref: t }) }) })
);
Ju.displayName = zr;
var ck = C.forwardRef((e, t) => {
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
  } = e, f = C.useRef(null), h = Ve(t, f), m = ku(s), [g, y] = Ga({
    prop: a,
    defaultProp: i ?? null,
    onChange: l,
    caller: zr
  }), [v, b] = C.useState(!1), k = _t(u), M = Zu(n), w = C.useRef(!1), [S, N] = C.useState(0);
  return C.useEffect(() => {
    const x = f.current;
    if (x)
      return x.addEventListener($s, k), () => x.removeEventListener($s, k);
  }, [k]), /* @__PURE__ */ p(
    ik,
    {
      scope: n,
      orientation: r,
      dir: m,
      loop: o,
      currentTabStopId: g,
      onItemFocus: C.useCallback(
        (x) => y(x),
        [y]
      ),
      onItemShiftTab: C.useCallback(() => b(!0), []),
      onFocusableItemAdd: C.useCallback(
        () => N((x) => x + 1),
        []
      ),
      onFocusableItemRemove: C.useCallback(
        () => N((x) => x - 1),
        []
      ),
      children: /* @__PURE__ */ p(
        Ue.div,
        {
          tabIndex: v || S === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: fe(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: fe(e.onFocus, (x) => {
            const T = !w.current;
            if (x.target === x.currentTarget && T && !v) {
              const E = new CustomEvent($s, ok);
              if (x.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
                const D = M().filter((W) => W.focusable), R = D.find((W) => W.active), I = D.find((W) => W.id === g), H = [R, I, ...D].filter(
                  Boolean
                ).map((W) => W.ref.current);
                nd(H, c);
              }
            }
            w.current = !1;
          }),
          onBlur: fe(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), ed = "RovingFocusGroupItem", td = C.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, l = Co(), u = s || l, c = lk(ed, n), d = c.currentTabStopId === u, f = Zu(n), { onFocusableItemAdd: h, onFocusableItemRemove: m, currentTabStopId: g } = c;
    return C.useEffect(() => {
      if (r)
        return h(), () => m();
    }, [r, h, m]), /* @__PURE__ */ p(
      ua.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ p(
          Ue.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": c.orientation,
            ...i,
            ref: t,
            onMouseDown: fe(e.onMouseDown, (y) => {
              r ? c.onItemFocus(u) : y.preventDefault();
            }),
            onFocus: fe(e.onFocus, () => c.onItemFocus(u)),
            onKeyDown: fe(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                c.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const v = fk(y, c.orientation, c.dir);
              if (v !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let k = f().filter((M) => M.focusable).map((M) => M.ref.current);
                if (v === "last") k.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && k.reverse();
                  const M = k.indexOf(y.currentTarget);
                  k = c.loop ? pk(k, M + 1) : k.slice(M + 1);
                }
                setTimeout(() => nd(k));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: g != null }) : a
          }
        )
      }
    );
  }
);
td.displayName = ed;
var uk = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function dk(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function fk(e, t, n) {
  const r = dk(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return uk[r];
}
function nd(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function pk(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var hk = Ju, mk = td, gk = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, In = /* @__PURE__ */ new WeakMap(), io = /* @__PURE__ */ new WeakMap(), lo = {}, _s = 0, rd = function(e) {
  return e && (e.host || rd(e.parentNode));
}, yk = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = rd(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, bk = function(e, t, n, r) {
  var o = yk(t, Array.isArray(e) ? e : [e]);
  lo[n] || (lo[n] = /* @__PURE__ */ new WeakMap());
  var s = lo[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(o), u = function(d) {
    !d || i.has(d) || (i.add(d), u(d.parentNode));
  };
  o.forEach(u);
  var c = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        c(f);
      else
        try {
          var h = f.getAttribute(r), m = h !== null && h !== "false", g = (In.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          In.set(f, g), s.set(f, y), a.push(f), g === 1 && m && io.set(f, !0), y === 1 && f.setAttribute(n, "true"), m || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return c(t), i.clear(), _s++, function() {
    a.forEach(function(d) {
      var f = In.get(d) - 1, h = s.get(d) - 1;
      In.set(d, f), s.set(d, h), f || (io.has(d) || d.removeAttribute(r), io.delete(d)), h || d.removeAttribute(n);
    }), _s--, _s || (In = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new WeakMap(), io = /* @__PURE__ */ new WeakMap(), lo = {});
  };
}, vk = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = gk(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), bk(r, o, n, "aria-hidden")) : function() {
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
function od(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function wk(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var wo = "right-scroll-bar-position", ko = "width-before-scroll-bar", kk = "with-scroll-bars-hidden", xk = "--removed-body-scroll-bar-size";
function Hs(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ck(e, t) {
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
var Sk = typeof window < "u" ? C.useLayoutEffect : C.useEffect, Ll = /* @__PURE__ */ new WeakMap();
function Tk(e, t) {
  var n = Ck(null, function(r) {
    return e.forEach(function(o) {
      return Hs(o, r);
    });
  });
  return Sk(function() {
    var r = Ll.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || Hs(i, null);
      }), s.forEach(function(i) {
        o.has(i) || Hs(i, a);
      });
    }
    Ll.set(n, e);
  }, [e]), n;
}
function Mk(e) {
  return e;
}
function Ek(e, t) {
  t === void 0 && (t = Mk);
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
function Nk(e) {
  e === void 0 && (e = {});
  var t = Ek(null);
  return t.options = bt({ async: !0, ssr: !1 }, e), t;
}
var sd = function(e) {
  var t = e.sideCar, n = od(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return C.createElement(r, bt({}, n));
};
sd.isSideCarExport = !0;
function Dk(e, t) {
  return e.useMedium(t), sd;
}
var ad = Nk(), zs = function() {
}, Qo = C.forwardRef(function(e, t) {
  var n = C.useRef(null), r = C.useState({
    onScrollCapture: zs,
    onWheelCapture: zs,
    onTouchMoveCapture: zs
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, l = e.className, u = e.removeScrollBar, c = e.enabled, d = e.shards, f = e.sideCar, h = e.noRelative, m = e.noIsolation, g = e.inert, y = e.allowPinchZoom, v = e.as, b = v === void 0 ? "div" : v, k = e.gapMode, M = od(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, S = Tk([n, t]), N = bt(bt({}, M), o);
  return C.createElement(
    C.Fragment,
    null,
    c && C.createElement(w, { sideCar: ad, removeScrollBar: u, shards: d, noRelative: h, noIsolation: m, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: k }),
    a ? C.cloneElement(C.Children.only(i), bt(bt({}, N), { ref: S })) : C.createElement(b, bt({}, N, { className: l, ref: S }), i)
  );
});
Qo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Qo.classNames = {
  fullWidth: ko,
  zeroRight: wo
};
var Rk = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Ak() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Rk();
  return t && e.setAttribute("nonce", t), e;
}
function Lk(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Pk(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Ik = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Ak()) && (Lk(t, n), Pk(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Ok = function() {
  var e = Ik();
  return function(t, n) {
    C.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, id = function() {
  var e = Ok(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, $k = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Bs = function(e) {
  return parseInt(e || "", 10) || 0;
}, _k = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Bs(n), Bs(r), Bs(o)];
}, Hk = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return $k;
  var t = _k(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, zk = id(), jn = "data-scroll-locked", Bk = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(kk, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(jn, `] {
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
  
  .`).concat(wo, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(ko, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(wo, " .").concat(wo, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(ko, " .").concat(ko, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(jn, `] {
    `).concat(xk, ": ").concat(i, `px;
  }
`);
}, Pl = function() {
  var e = parseInt(document.body.getAttribute(jn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Wk = function() {
  C.useEffect(function() {
    return document.body.setAttribute(jn, (Pl() + 1).toString()), function() {
      var e = Pl() - 1;
      e <= 0 ? document.body.removeAttribute(jn) : document.body.setAttribute(jn, e.toString());
    };
  }, []);
}, Fk = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Wk();
  var s = C.useMemo(function() {
    return Hk(o);
  }, [o]);
  return C.createElement(zk, { styles: Bk(s, !t, o, n ? "" : "!important") });
}, da = !1;
if (typeof window < "u")
  try {
    var co = Object.defineProperty({}, "passive", {
      get: function() {
        return da = !0, !0;
      }
    });
    window.addEventListener("test", co, co), window.removeEventListener("test", co, co);
  } catch {
    da = !1;
  }
var On = da ? { passive: !1 } : !1, Uk = function(e) {
  return e.tagName === "TEXTAREA";
}, ld = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Uk(e) && n[t] === "visible")
  );
}, Yk = function(e) {
  return ld(e, "overflowY");
}, jk = function(e) {
  return ld(e, "overflowX");
}, Il = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = cd(e, r);
    if (o) {
      var s = ud(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Vk = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Kk = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, cd = function(e, t) {
  return e === "v" ? Yk(t) : jk(t);
}, ud = function(e, t) {
  return e === "v" ? Vk(t) : Kk(t);
}, qk = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Gk = function(e, t, n, r, o) {
  var s = qk(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, l = t.contains(i), u = !1, c = a > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var h = ud(e, i), m = h[0], g = h[1], y = h[2], v = g - y - s * m;
    (m || v) && cd(e, i) && (d += v, f += m);
    var b = i.parentNode;
    i = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (c && Math.abs(d) < 1 || !c && Math.abs(f) < 1) && (u = !0), u;
}, uo = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ol = function(e) {
  return [e.deltaX, e.deltaY];
}, $l = function(e) {
  return e && "current" in e ? e.current : e;
}, Xk = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Zk = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Qk = 0, $n = [];
function Jk(e) {
  var t = C.useRef([]), n = C.useRef([0, 0]), r = C.useRef(), o = C.useState(Qk++)[0], s = C.useState(id)[0], a = C.useRef(e);
  C.useEffect(function() {
    a.current = e;
  }, [e]), C.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = wk([e.lockRef.current], (e.shards || []).map($l), !0).filter(Boolean);
      return g.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = C.useCallback(function(g, y) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = uo(g), b = n.current, k = "deltaX" in g ? g.deltaX : b[0] - v[0], M = "deltaY" in g ? g.deltaY : b[1] - v[1], w, S = g.target, N = Math.abs(k) > Math.abs(M) ? "h" : "v";
    if ("touches" in g && N === "h" && S.type === "range")
      return !1;
    var x = Il(N, S);
    if (!x)
      return !0;
    if (x ? w = N : (w = N === "v" ? "h" : "v", x = Il(N, S)), !x)
      return !1;
    if (!r.current && "changedTouches" in g && (k || M) && (r.current = w), !w)
      return !0;
    var T = r.current || w;
    return Gk(T, y, g, T === "h" ? k : M);
  }, []), l = C.useCallback(function(g) {
    var y = g;
    if (!(!$n.length || $n[$n.length - 1] !== s)) {
      var v = "deltaY" in y ? Ol(y) : uo(y), b = t.current.filter(function(w) {
        return w.name === y.type && (w.target === y.target || y.target === w.shadowParent) && Xk(w.delta, v);
      })[0];
      if (b && b.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!b) {
        var k = (a.current.shards || []).map($l).filter(Boolean).filter(function(w) {
          return w.contains(y.target);
        }), M = k.length > 0 ? i(y, k[0]) : !a.current.noIsolation;
        M && y.cancelable && y.preventDefault();
      }
    }
  }, []), u = C.useCallback(function(g, y, v, b) {
    var k = { name: g, delta: y, target: v, should: b, shadowParent: ex(v) };
    t.current.push(k), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== k;
      });
    }, 1);
  }, []), c = C.useCallback(function(g) {
    n.current = uo(g), r.current = void 0;
  }, []), d = C.useCallback(function(g) {
    u(g.type, Ol(g), g.target, i(g, e.lockRef.current));
  }, []), f = C.useCallback(function(g) {
    u(g.type, uo(g), g.target, i(g, e.lockRef.current));
  }, []);
  C.useEffect(function() {
    return $n.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, On), document.addEventListener("touchmove", l, On), document.addEventListener("touchstart", c, On), function() {
      $n = $n.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", l, On), document.removeEventListener("touchmove", l, On), document.removeEventListener("touchstart", c, On);
    };
  }, []);
  var h = e.removeScrollBar, m = e.inert;
  return C.createElement(
    C.Fragment,
    null,
    m ? C.createElement(s, { styles: Zk(o) }) : null,
    h ? C.createElement(Fk, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function ex(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const tx = Dk(ad, Jk);
var dd = C.forwardRef(function(e, t) {
  return C.createElement(Qo, bt({}, e, { ref: t, sideCar: tx }));
});
dd.classNames = Qo.classNames;
var fa = ["Enter", " "], nx = ["ArrowDown", "PageUp", "Home"], fd = ["ArrowUp", "PageDown", "End"], rx = [...nx, ...fd], ox = {
  ltr: [...fa, "ArrowRight"],
  rtl: [...fa, "ArrowLeft"]
}, sx = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Br = "Menu", [Ar, ax, ix] = wu(Br), [kn, pd] = or(Br, [
  ix,
  Zo,
  Qu
]), Jo = Zo(), hd = Qu(), [lx, xn] = kn(Br), [cx, Wr] = kn(Br), md = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: a = !0 } = e, i = Jo(t), [l, u] = C.useState(null), c = C.useRef(!1), d = _t(s), f = ku(o);
  return C.useEffect(() => {
    const h = () => {
      c.current = !0, document.addEventListener("pointerdown", m, { capture: !0, once: !0 }), document.addEventListener("pointermove", m, { capture: !0, once: !0 });
    }, m = () => c.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", m, { capture: !0 }), document.removeEventListener("pointermove", m, { capture: !0 });
    };
  }, []), /* @__PURE__ */ p(Ku, { ...i, children: /* @__PURE__ */ p(
    lx,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: u,
      children: /* @__PURE__ */ p(
        cx,
        {
          scope: t,
          onClose: C.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: c,
          dir: f,
          modal: a,
          children: r
        }
      )
    }
  ) });
};
md.displayName = Br;
var ux = "MenuAnchor", ai = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Jo(n);
    return /* @__PURE__ */ p(qu, { ...o, ...r, ref: t });
  }
);
ai.displayName = ux;
var ii = "MenuPortal", [dx, gd] = kn(ii, {
  forceMount: void 0
}), yd = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = xn(ii, t);
  return /* @__PURE__ */ p(dx, { scope: t, forceMount: n, children: /* @__PURE__ */ p(wn, { present: n || s.open, children: /* @__PURE__ */ p(si, { asChild: !0, container: o, children: r }) }) });
};
yd.displayName = ii;
var ct = "MenuContent", [fx, li] = kn(ct), bd = C.forwardRef(
  (e, t) => {
    const n = gd(ct, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = xn(ct, e.__scopeMenu), a = Wr(ct, e.__scopeMenu);
    return /* @__PURE__ */ p(Ar.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ p(wn, { present: r || s.open, children: /* @__PURE__ */ p(Ar.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ p(px, { ...o, ref: t }) : /* @__PURE__ */ p(hx, { ...o, ref: t }) }) }) });
  }
), px = C.forwardRef(
  (e, t) => {
    const n = xn(ct, e.__scopeMenu), r = C.useRef(null), o = Ve(t, r);
    return C.useEffect(() => {
      const s = r.current;
      if (s) return vk(s);
    }, []), /* @__PURE__ */ p(
      ci,
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
), hx = C.forwardRef((e, t) => {
  const n = xn(ct, e.__scopeMenu);
  return /* @__PURE__ */ p(
    ci,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), mx = /* @__PURE__ */ Nr("MenuContent.ScrollLock"), ci = C.forwardRef(
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
    } = e, y = xn(ct, n), v = Wr(ct, n), b = Jo(n), k = hd(n), M = ax(n), [w, S] = C.useState(null), N = C.useRef(null), x = Ve(t, N, y.onContentChange), T = C.useRef(0), E = C.useRef(""), D = C.useRef(0), R = C.useRef(null), I = C.useRef("right"), O = C.useRef(0), H = m ? dd : C.Fragment, W = m ? { as: mx, allowPinchZoom: !0 } : void 0, G = (L) => {
      const F = E.current + L, X = M().filter((U) => !U.disabled), K = document.activeElement, Z = X.find((U) => U.ref.current === K)?.textValue, te = X.map((U) => U.textValue), _ = Ex(te, F, Z), B = X.find((U) => U.textValue === _)?.ref.current;
      (function U(ee) {
        E.current = ee, window.clearTimeout(T.current), ee !== "" && (T.current = window.setTimeout(() => U(""), 1e3));
      })(F), B && setTimeout(() => B.focus());
    };
    C.useEffect(() => () => window.clearTimeout(T.current), []), Tv();
    const P = C.useCallback((L) => I.current === R.current?.side && Dx(L, R.current?.area), []);
    return /* @__PURE__ */ p(
      fx,
      {
        scope: n,
        searchRef: E,
        onItemEnter: C.useCallback(
          (L) => {
            P(L) && L.preventDefault();
          },
          [P]
        ),
        onItemLeave: C.useCallback(
          (L) => {
            P(L) || (N.current?.focus(), S(null));
          },
          [P]
        ),
        onTriggerLeave: C.useCallback(
          (L) => {
            P(L) && L.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: D,
        onPointerGraceIntentChange: C.useCallback((L) => {
          R.current = L;
        }, []),
        children: /* @__PURE__ */ p(H, { ...W, children: /* @__PURE__ */ p(
          Su,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: fe(s, (L) => {
              L.preventDefault(), N.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ p(
              Xa,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: u,
                onPointerDownOutside: c,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: h,
                children: /* @__PURE__ */ p(
                  hk,
                  {
                    asChild: !0,
                    ...k,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: S,
                    onEntryFocus: fe(l, (L) => {
                      v.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ p(
                      Gu,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Id(y.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...b,
                        ...g,
                        ref: x,
                        style: { outline: "none", ...g.style },
                        onKeyDown: fe(g.onKeyDown, (L) => {
                          const X = L.target.closest("[data-radix-menu-content]") === L.currentTarget, K = L.ctrlKey || L.altKey || L.metaKey, Z = L.key.length === 1;
                          X && (L.key === "Tab" && L.preventDefault(), !K && Z && G(L.key));
                          const te = N.current;
                          if (L.target !== te || !rx.includes(L.key)) return;
                          L.preventDefault();
                          const B = M().filter((U) => !U.disabled).map((U) => U.ref.current);
                          fd.includes(L.key) && B.reverse(), Tx(B);
                        }),
                        onBlur: fe(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(T.current), E.current = "");
                        }),
                        onPointerMove: fe(
                          e.onPointerMove,
                          Lr((L) => {
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
bd.displayName = ct;
var gx = "MenuGroup", ui = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ p(Ue.div, { role: "group", ...r, ref: t });
  }
);
ui.displayName = gx;
var yx = "MenuLabel", vd = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ p(Ue.div, { ...r, ref: t });
  }
);
vd.displayName = yx;
var No = "MenuItem", _l = "menu.itemSelect", es = C.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = C.useRef(null), a = Wr(No, e.__scopeMenu), i = li(No, e.__scopeMenu), l = Ve(t, s), u = C.useRef(!1), c = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(_l, { bubbles: !0, cancelable: !0 });
        d.addEventListener(_l, (h) => r?.(h), { once: !0 }), vu(d, f), f.defaultPrevented ? u.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ p(
      wd,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: fe(e.onClick, c),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), u.current = !0;
        },
        onPointerUp: fe(e.onPointerUp, (d) => {
          u.current || d.currentTarget?.click();
        }),
        onKeyDown: fe(e.onKeyDown, (d) => {
          const f = i.searchRef.current !== "";
          n || f && d.key === " " || fa.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
es.displayName = No;
var wd = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, a = li(No, n), i = hd(n), l = C.useRef(null), u = Ve(t, l), [c, d] = C.useState(!1), [f, h] = C.useState("");
    return C.useEffect(() => {
      const m = l.current;
      m && h((m.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ p(
      Ar.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ p(mk, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ p(
          Ue.div,
          {
            role: "menuitem",
            "data-highlighted": c ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: u,
            onPointerMove: fe(
              e.onPointerMove,
              Lr((m) => {
                r ? a.onItemLeave(m) : (a.onItemEnter(m), m.defaultPrevented || m.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: fe(
              e.onPointerLeave,
              Lr((m) => a.onItemLeave(m))
            ),
            onFocus: fe(e.onFocus, () => d(!0)),
            onBlur: fe(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), bx = "MenuCheckboxItem", kd = C.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ p(Md, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ p(
      es,
      {
        role: "menuitemcheckbox",
        "aria-checked": Do(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": fi(n),
        onSelect: fe(
          o.onSelect,
          () => r?.(Do(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
kd.displayName = bx;
var xd = "MenuRadioGroup", [vx, wx] = kn(
  xd,
  { value: void 0, onValueChange: () => {
  } }
), Cd = C.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = _t(r);
    return /* @__PURE__ */ p(vx, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ p(ui, { ...o, ref: t }) });
  }
);
Cd.displayName = xd;
var Sd = "MenuRadioItem", Td = C.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = wx(Sd, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ p(Md, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ p(
      es,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": fi(s),
        onSelect: fe(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Td.displayName = Sd;
var di = "MenuItemIndicator", [Md, kx] = kn(
  di,
  { checked: !1 }
), Ed = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = kx(di, n);
    return /* @__PURE__ */ p(
      wn,
      {
        present: r || Do(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ p(
          Ue.span,
          {
            ...o,
            ref: t,
            "data-state": fi(s.checked)
          }
        )
      }
    );
  }
);
Ed.displayName = di;
var xx = "MenuSeparator", Nd = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ p(
      Ue.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Nd.displayName = xx;
var Cx = "MenuArrow", Dd = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Jo(n);
    return /* @__PURE__ */ p(Xu, { ...o, ...r, ref: t });
  }
);
Dd.displayName = Cx;
var Sx = "MenuSub", [RT, Rd] = kn(Sx), wr = "MenuSubTrigger", Ad = C.forwardRef(
  (e, t) => {
    const n = xn(wr, e.__scopeMenu), r = Wr(wr, e.__scopeMenu), o = Rd(wr, e.__scopeMenu), s = li(wr, e.__scopeMenu), a = C.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, u = { __scopeMenu: e.__scopeMenu }, c = C.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return C.useEffect(() => c, [c]), C.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [i, l]), /* @__PURE__ */ p(ai, { asChild: !0, ...u, children: /* @__PURE__ */ p(
      wd,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Id(n.open),
        ...e,
        ref: jo(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: fe(
          e.onPointerMove,
          Lr((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (s.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), c();
            }, 100));
          })
        ),
        onPointerLeave: fe(
          e.onPointerLeave,
          Lr((d) => {
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
        onKeyDown: fe(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && d.key === " " || ox[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Ad.displayName = wr;
var Ld = "MenuSubContent", Pd = C.forwardRef(
  (e, t) => {
    const n = gd(ct, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = xn(ct, e.__scopeMenu), a = Wr(ct, e.__scopeMenu), i = Rd(Ld, e.__scopeMenu), l = C.useRef(null), u = Ve(t, l);
    return /* @__PURE__ */ p(Ar.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ p(wn, { present: r || s.open, children: /* @__PURE__ */ p(Ar.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ p(
      ci,
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
        onFocusOutside: fe(e.onFocusOutside, (c) => {
          c.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: fe(e.onEscapeKeyDown, (c) => {
          a.onClose(), c.preventDefault();
        }),
        onKeyDown: fe(e.onKeyDown, (c) => {
          const d = c.currentTarget.contains(c.target), f = sx[a.dir].includes(c.key);
          d && f && (s.onOpenChange(!1), i.trigger?.focus(), c.preventDefault());
        })
      }
    ) }) }) });
  }
);
Pd.displayName = Ld;
function Id(e) {
  return e ? "open" : "closed";
}
function Do(e) {
  return e === "indeterminate";
}
function fi(e) {
  return Do(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Tx(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Mx(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Ex(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = Mx(e, Math.max(s, 0));
  o.length === 1 && (a = a.filter((u) => u !== n));
  const l = a.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Nx(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], u = i.x, c = i.y, d = l.x, f = l.y;
    c > r != f > r && n < (d - u) * (r - c) / (f - c) + u && (o = !o);
  }
  return o;
}
function Dx(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Nx(n, t);
}
function Lr(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Rx = md, Ax = ai, Lx = yd, Px = bd, Ix = ui, Ox = vd, $x = es, _x = kd, Hx = Cd, zx = Td, Bx = Ed, Wx = Nd, Fx = Dd, Ux = Ad, Yx = Pd, ts = "DropdownMenu", [jx] = or(
  ts,
  [pd]
), Ze = pd(), [Vx, Od] = jx(ts), $d = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, l = Ze(t), u = C.useRef(null), [c, d] = Ga({
    prop: o,
    defaultProp: s ?? !1,
    onChange: a,
    caller: ts
  });
  return /* @__PURE__ */ p(
    Vx,
    {
      scope: t,
      triggerId: Co(),
      triggerRef: u,
      contentId: Co(),
      open: c,
      onOpenChange: d,
      onOpenToggle: C.useCallback(() => d((f) => !f), [d]),
      modal: i,
      children: /* @__PURE__ */ p(Rx, { ...l, open: c, onOpenChange: d, dir: r, modal: i, children: n })
    }
  );
};
$d.displayName = ts;
var _d = "DropdownMenuTrigger", Hd = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = Od(_d, n), a = Ze(n);
    return /* @__PURE__ */ p(Ax, { asChild: !0, ...a, children: /* @__PURE__ */ p(
      Ue.button,
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
        ref: jo(t, s.triggerRef),
        onPointerDown: fe(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: fe(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Hd.displayName = _d;
var Kx = "DropdownMenuPortal", zd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ze(t);
  return /* @__PURE__ */ p(Lx, { ...r, ...n });
};
zd.displayName = Kx;
var Bd = "DropdownMenuContent", Wd = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Od(Bd, n), s = Ze(n), a = C.useRef(!1);
    return /* @__PURE__ */ p(
      Px,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: fe(e.onCloseAutoFocus, (i) => {
          a.current || o.triggerRef.current?.focus(), a.current = !1, i.preventDefault();
        }),
        onInteractOutside: fe(e.onInteractOutside, (i) => {
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
Wd.displayName = Bd;
var qx = "DropdownMenuGroup", Gx = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
    return /* @__PURE__ */ p(Ix, { ...o, ...r, ref: t });
  }
);
Gx.displayName = qx;
var Xx = "DropdownMenuLabel", Zx = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
    return /* @__PURE__ */ p(Ox, { ...o, ...r, ref: t });
  }
);
Zx.displayName = Xx;
var Qx = "DropdownMenuItem", Fd = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
    return /* @__PURE__ */ p($x, { ...o, ...r, ref: t });
  }
);
Fd.displayName = Qx;
var Jx = "DropdownMenuCheckboxItem", e0 = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
  return /* @__PURE__ */ p(_x, { ...o, ...r, ref: t });
});
e0.displayName = Jx;
var t0 = "DropdownMenuRadioGroup", n0 = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
  return /* @__PURE__ */ p(Hx, { ...o, ...r, ref: t });
});
n0.displayName = t0;
var r0 = "DropdownMenuRadioItem", o0 = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
  return /* @__PURE__ */ p(zx, { ...o, ...r, ref: t });
});
o0.displayName = r0;
var s0 = "DropdownMenuItemIndicator", a0 = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
  return /* @__PURE__ */ p(Bx, { ...o, ...r, ref: t });
});
a0.displayName = s0;
var i0 = "DropdownMenuSeparator", Ud = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
  return /* @__PURE__ */ p(Wx, { ...o, ...r, ref: t });
});
Ud.displayName = i0;
var l0 = "DropdownMenuArrow", c0 = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
    return /* @__PURE__ */ p(Fx, { ...o, ...r, ref: t });
  }
);
c0.displayName = l0;
var u0 = "DropdownMenuSubTrigger", d0 = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
  return /* @__PURE__ */ p(Ux, { ...o, ...r, ref: t });
});
d0.displayName = u0;
var f0 = "DropdownMenuSubContent", p0 = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ze(n);
  return /* @__PURE__ */ p(
    Yx,
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
p0.displayName = f0;
var h0 = $d, m0 = Hd, g0 = zd, y0 = Wd, b0 = Fd, v0 = Ud;
function Ws({
  ...e
}) {
  return /* @__PURE__ */ p(h0, { "data-slot": "dropdown-menu", ...e });
}
function Fs({
  ...e
}) {
  return /* @__PURE__ */ p(
    m0,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function Us({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ p(g0, { children: /* @__PURE__ */ p(
    y0,
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
  return /* @__PURE__ */ p(
    b0,
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
function Ys({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ p(
    v0,
    {
      "data-slot": "dropdown-menu-separator",
      className: de("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var w0 = Object.freeze({
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
}), k0 = "VisuallyHidden", Yd = C.forwardRef(
  (e, t) => /* @__PURE__ */ p(
    Ue.span,
    {
      ...e,
      ref: t,
      style: { ...w0, ...e.style }
    }
  )
);
Yd.displayName = k0;
var x0 = Yd, [ns] = or("Tooltip", [
  Zo
]), rs = Zo(), jd = "TooltipProvider", C0 = 700, pa = "tooltip.open", [S0, pi] = ns(jd), Vd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = C0,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, a = C.useRef(!0), i = C.useRef(!1), l = C.useRef(0);
  return C.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ p(
    S0,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: C.useCallback(() => {
        window.clearTimeout(l.current), a.current = !1;
      }, []),
      onClose: C.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => a.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: C.useCallback((u) => {
        i.current = u;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
Vd.displayName = jd;
var Pr = "Tooltip", [T0, Fr] = ns(Pr), Kd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, l = pi(Pr, e.__scopeTooltip), u = rs(t), [c, d] = C.useState(null), f = Co(), h = C.useRef(0), m = a ?? l.disableHoverableContent, g = i ?? l.delayDuration, y = C.useRef(!1), [v, b] = Ga({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (N) => {
      N ? (l.onOpen(), document.dispatchEvent(new CustomEvent(pa))) : l.onClose(), s?.(N);
    },
    caller: Pr
  }), k = C.useMemo(() => v ? y.current ? "delayed-open" : "instant-open" : "closed", [v]), M = C.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, y.current = !1, b(!0);
  }, [b]), w = C.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b(!1);
  }, [b]), S = C.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      y.current = !0, b(!0), h.current = 0;
    }, g);
  }, [g, b]);
  return C.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ p(Ku, { ...u, children: /* @__PURE__ */ p(
    T0,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: k,
      trigger: c,
      onTriggerChange: d,
      onTriggerEnter: C.useCallback(() => {
        l.isOpenDelayedRef.current ? S() : M();
      }, [l.isOpenDelayedRef, S, M]),
      onTriggerLeave: C.useCallback(() => {
        m ? w() : (window.clearTimeout(h.current), h.current = 0);
      }, [w, m]),
      onOpen: M,
      onClose: w,
      disableHoverableContent: m,
      children: n
    }
  ) });
};
Kd.displayName = Pr;
var ha = "TooltipTrigger", qd = C.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Fr(ha, n), s = pi(ha, n), a = rs(n), i = C.useRef(null), l = Ve(t, i, o.onTriggerChange), u = C.useRef(!1), c = C.useRef(!1), d = C.useCallback(() => u.current = !1, []);
    return C.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ p(qu, { asChild: !0, ...a, children: /* @__PURE__ */ p(
      Ue.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: fe(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !c.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: fe(e.onPointerLeave, () => {
          o.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: fe(e.onPointerDown, () => {
          o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: fe(e.onFocus, () => {
          u.current || o.onOpen();
        }),
        onBlur: fe(e.onBlur, o.onClose),
        onClick: fe(e.onClick, o.onClose)
      }
    ) });
  }
);
qd.displayName = ha;
var hi = "TooltipPortal", [M0, E0] = ns(hi, {
  forceMount: void 0
}), Gd = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = Fr(hi, t);
  return /* @__PURE__ */ p(M0, { scope: t, forceMount: n, children: /* @__PURE__ */ p(wn, { present: n || s.open, children: /* @__PURE__ */ p(si, { asChild: !0, container: o, children: r }) }) });
};
Gd.displayName = hi;
var Gn = "TooltipContent", Xd = C.forwardRef(
  (e, t) => {
    const n = E0(Gn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, a = Fr(Gn, e.__scopeTooltip);
    return /* @__PURE__ */ p(wn, { present: r || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ p(Zd, { side: o, ...s, ref: t }) : /* @__PURE__ */ p(N0, { side: o, ...s, ref: t }) });
  }
), N0 = C.forwardRef((e, t) => {
  const n = Fr(Gn, e.__scopeTooltip), r = pi(Gn, e.__scopeTooltip), o = C.useRef(null), s = Ve(t, o), [a, i] = C.useState(null), { trigger: l, onClose: u } = n, c = o.current, { onPointerInTransitChange: d } = r, f = C.useCallback(() => {
    i(null), d(!1);
  }, [d]), h = C.useCallback(
    (m, g) => {
      const y = m.currentTarget, v = { x: m.clientX, y: m.clientY }, b = L0(v, y.getBoundingClientRect()), k = P0(v, b), M = I0(g.getBoundingClientRect()), w = $0([...k, ...M]);
      i(w), d(!0);
    },
    [d]
  );
  return C.useEffect(() => () => f(), [f]), C.useEffect(() => {
    if (l && c) {
      const m = (y) => h(y, c), g = (y) => h(y, l);
      return l.addEventListener("pointerleave", m), c.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", m), c.removeEventListener("pointerleave", g);
      };
    }
  }, [l, c, h, f]), C.useEffect(() => {
    if (a) {
      const m = (g) => {
        const y = g.target, v = { x: g.clientX, y: g.clientY }, b = l?.contains(y) || c?.contains(y), k = !O0(v, a);
        b ? f() : k && (f(), u());
      };
      return document.addEventListener("pointermove", m), () => document.removeEventListener("pointermove", m);
    }
  }, [l, c, a, u, f]), /* @__PURE__ */ p(Zd, { ...e, ref: s });
}), [D0, R0] = ns(Pr, { isInside: !1 }), A0 = /* @__PURE__ */ $b("TooltipContent"), Zd = C.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, l = Fr(Gn, n), u = rs(n), { onClose: c } = l;
    return C.useEffect(() => (document.addEventListener(pa, c), () => document.removeEventListener(pa, c)), [c]), C.useEffect(() => {
      if (l.trigger) {
        const d = (f) => {
          f.target?.contains(l.trigger) && c();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, c]), /* @__PURE__ */ p(
      Xa,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ A(
          Gu,
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
              /* @__PURE__ */ p(A0, { children: r }),
              /* @__PURE__ */ p(D0, { scope: n, isInside: !0, children: /* @__PURE__ */ p(x0, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Xd.displayName = Gn;
var Qd = "TooltipArrow", Jd = C.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = rs(n);
    return R0(
      Qd,
      n
    ).isInside ? null : /* @__PURE__ */ p(Xu, { ...o, ...r, ref: t });
  }
);
Jd.displayName = Qd;
function L0(e, t) {
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
function P0(e, t, n = 5) {
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
function I0(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function O0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], u = i.x, c = i.y, d = l.x, f = l.y;
    c > r != f > r && n < (d - u) * (r - c) / (f - c) + u && (o = !o);
  }
  return o;
}
function $0(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), _0(t);
}
function _0(e) {
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
var H0 = Vd, z0 = Kd, B0 = qd, W0 = Gd, F0 = Xd, U0 = Jd;
function Y0({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ p(
    H0,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function ma({
  ...e
}) {
  return /* @__PURE__ */ p(Y0, { children: /* @__PURE__ */ p(z0, { "data-slot": "tooltip", ...e }) });
}
function ga({
  ...e
}) {
  return /* @__PURE__ */ p(B0, { "data-slot": "tooltip-trigger", ...e });
}
function ya({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ p(W0, { children: /* @__PURE__ */ A(
    F0,
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
        /* @__PURE__ */ p(U0, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const Ie = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ A(ma, { children: [
    /* @__PURE__ */ p(ga, { asChild: !0, children: s }),
    /* @__PURE__ */ p(ya, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, _n = () => /* @__PURE__ */ p("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), j0 = Qn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const l = q(null), [u, c] = V(!1), [d, f] = V(void 0), h = ac({
    editor: t,
    selector: ({ editor: S }) => ({
      canUndo: S.can().undo(),
      canRedo: S.can().redo(),
      isBold: S.isActive("bold"),
      isItalic: S.isActive("italic"),
      isUnderline: S.isActive("underline"),
      isStrike: S.isActive("strike"),
      isCode: S.isActive("code"),
      isHighlight: S.isActive("highlight"),
      isH1: S.isActive("heading", { level: 1 }),
      isH2: S.isActive("heading", { level: 2 }),
      isH3: S.isActive("heading", { level: 3 }),
      isH4: S.isActive("heading", { level: 4 }),
      isH5: S.isActive("heading", { level: 5 }),
      isBlockquote: S.isActive("blockquote"),
      isBulletList: S.isActive("bulletList"),
      isOrderedList: S.isActive("orderedList"),
      isTaskList: S.isActive("taskList"),
      isCodeBlock: S.isActive("codeBlock"),
      isLink: S.isActive("link")
    })
  }), m = j(() => {
    const { view: S } = t, { from: N } = S.state.selection, x = S.coordsAtPos(N);
    f({ top: x.bottom + 8, left: x.left }), c(!0);
  }, [t]), g = j((S, N) => {
    t.chain().focus().setImage({ src: S, alt: N }).run(), c(!1);
  }, [t]), y = j(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = j((S) => {
    t.chain().focus().insertCallout({ type: S }).run();
  }, [t]), b = q(/* @__PURE__ */ new Map()), k = q(/* @__PURE__ */ new Map()), M = j((S) => {
    const { doc: N, tr: x } = S.state;
    let T = !1;
    const E = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = S.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
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
      x.replaceWith(te, te + I.nodeSize, Z), T = !0;
    }
    T && (S.view.dispatch(x), requestAnimationFrame(() => {
      S.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
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
    const S = /* @__PURE__ */ new Map();
    t.state.doc.descendants((x, T) => (x.type.name === "taskItem" && S.set(T, x.attrs.checked === !0), !0)), k.current = S;
    const N = ({ transaction: x }) => {
      if (!x.docChanged) return;
      const T = /* @__PURE__ */ new Map();
      t.state.doc.descendants((R, I) => (R.type.name === "taskItem" && T.set(I, R.attrs.checked === !0), !0));
      const E = k.current;
      let D = !1;
      if (E.size > 0 && T.size > 0) {
        let R = 0, I = 0;
        E.forEach((O) => {
          O && R++;
        }), T.forEach((O) => {
          O && I++;
        }), R !== I && (D = !0);
      }
      k.current = T, D && setTimeout(() => {
        M(t);
      }, 150);
    };
    return t.on("transaction", N), () => {
      t.off("transaction", N);
    };
  }, [t, s, M]);
  const w = j(() => {
    M(t);
  }, [t, M]);
  return /* @__PURE__ */ A("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !h?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ p(Hp, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !h?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ p(zp, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(_n, {}),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: h?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ p(Ta, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: h?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ p(Ma, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: h?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ p(Ea, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: h?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ p(Na, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: h?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ p(uc, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: h?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ p(dc, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => r?.(),
        isActive: h?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ p(Da, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(_n, {}),
    /* @__PURE__ */ A(Ws, { children: [
      /* @__PURE__ */ p(Fs, { asChild: !0, children: /* @__PURE__ */ A(
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
      /* @__PURE__ */ A(Us, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ A(
          Pe,
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
          Pe,
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
          Pe,
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
          Pe,
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
          Pe,
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
          Pe,
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
    /* @__PURE__ */ p(_n, {}),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: h?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ p(Aa, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: h?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ p(La, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: h?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ p(Pa, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: h?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ p(Ra, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: h?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ p(gc, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ p(Bp, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ p(Wp, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(_n, {}),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ p(Zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: m,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ p($a, { size: 16 })
      }
    ),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ p(yc, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(Ws, { children: [
      /* @__PURE__ */ p(Fs, { asChild: !0, children: /* @__PURE__ */ p(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ p(xo, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ A(Us, { align: "start", children: [
        /* @__PURE__ */ A(Pe, { onClick: () => v("info"), children: [
          /* @__PURE__ */ p(xo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ A(Pe, { onClick: () => v("note"), children: [
          /* @__PURE__ */ p(Oa, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ A(Pe, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ p(Fp, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ A(Pe, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ p(Up, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ A(Pe, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ p(Ia, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ A(Ws, { children: [
      /* @__PURE__ */ p(Fs, { asChild: !0, children: /* @__PURE__ */ A(
        Jt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ p(Zs, { size: 16 }),
            /* @__PURE__ */ p("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(Us, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ p(_i, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ p(_i, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ p(zn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ p(Ys, {}),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ p(Hi, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ p(Hi, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ p(zn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ p(Ys, {}),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ p(zi, { size: 16, className: "mr-2" }),
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
              /* @__PURE__ */ p(zi, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ p(Ys, {}),
        /* @__PURE__ */ A(
          Pe,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ p(zn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ p(
      bu,
      {
        isOpen: u,
        onClose: () => c(!1),
        onInsert: g,
        position: d
      }
    ),
    /* @__PURE__ */ p(_n, {}),
    /* @__PURE__ */ p(
      Ie,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ p(Yp, { size: 16 })
      }
    ),
    a && /* @__PURE__ */ A(ze, { children: [
      /* @__PURE__ */ p(_n, {}),
      /* @__PURE__ */ A(ma, { children: [
        /* @__PURE__ */ p(ga, { asChild: !0, children: /* @__PURE__ */ p(
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
            children: /* @__PURE__ */ p(Wo, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ p(ya, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ A(ma, { children: [
      /* @__PURE__ */ p(ga, { asChild: !0, children: /* @__PURE__ */ A(
        Jt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ p(er, { size: 16 }),
            /* @__PURE__ */ p("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ p(ya, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function V0({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: l }) {
  const u = s === "markdown", [c, d] = V(""), [f, h] = V(""), [m, g] = V(!1), [y, v] = V(!1), [b, k] = V(!1), [M, w] = V(!1), [S, N] = V([]), [x, T] = V(0), [E, D] = V(null), [R, I] = V(!1), O = q(!1), H = q(null), W = q(null), G = q(!1);
  J(() => {
    t && o && o.trim() && d(o);
  }, [t, o, r]);
  const P = j(() => {
    if (!c || !e) {
      N([]), T(0), D(null);
      return;
    }
    const _ = [];
    let B;
    try {
      if (y)
        B = new RegExp(c, m ? "g" : "gi");
      else {
        let U = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        b && (U = `\\b${U}\\b`), B = new RegExp(U, m ? "g" : "gi");
      }
      D(null);
    } catch (U) {
      D(U.message), N([]);
      return;
    }
    if (u) {
      let U;
      for (; (U = B.exec(a)) !== null; )
        _.push({
          from: U.index,
          to: U.index + U[0].length,
          text: U[0]
        });
    } else {
      const { doc: U } = e.state;
      U.descendants((ee, ge) => {
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
    N(_), _.length > 0 && x >= _.length && T(0);
  }, [c, m, y, b, e, x, u, a]);
  J(() => {
    P();
  }, [P]), J(() => {
    u && l && (t && S.length > 0 ? l(S, x) : l([], 0));
  }, [u, t, S, x, l]), J(() => {
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
  }, [e, t, c, m, y, x, u, S, a]), J(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), I(!1)), O.current = !1);
  }, [t, e, l]), J(() => {
    if (S.length > 0 && x < S.length) {
      const _ = S[x];
      if (u) {
        const U = document.querySelector(".syntax-textarea");
        if (U && G.current) {
          const ee = parseInt(getComputedStyle(U).lineHeight) || 22, be = a.substring(0, _.from).split(`
`).length;
          U.scrollTop = Math.max(0, (be - 3) * ee);
        }
        G.current && (G.current = !1);
        return;
      }
      const B = e.view.domAtPos(_.from);
      B.node && B.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), G.current && (G.current = !1);
    }
  }, [x, S, e, u, a]), J(() => {
    t && H.current && (H.current.focus(), H.current.select());
  }, [t, r]);
  const L = j(() => {
    S.length !== 0 && (G.current = !0, T((_) => (_ + 1) % S.length));
  }, [S.length]), F = j(() => {
    S.length !== 0 && (G.current = !0, T((_) => (_ - 1 + S.length) % S.length));
  }, [S.length]), X = j(() => {
    if (S.length === 0 || x >= S.length) return;
    const _ = S[x];
    if (u && i) {
      const B = a.substring(0, _.from) + f + a.substring(_.to);
      i(B), setTimeout(P, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: _.from, to: _.to }).deleteSelection().insertContent(f).run(), setTimeout(P, 10);
  }, [S, x, f, e, P, u, a, i]), K = j(() => {
    if (S.length === 0) return;
    if (u && i) {
      const B = [...S].sort((ee, ge) => ge.from - ee.from);
      let U = a;
      B.forEach((ee) => {
        U = U.substring(0, ee.from) + f + U.substring(ee.to);
      }), i(U), setTimeout(P, 10);
      return;
    }
    const _ = [...S].sort((B, U) => U.from - B.from);
    e.chain().focus(), _.forEach((B) => {
      e.chain().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(P, 10);
  }, [S, f, e, P, u, a, i]), Z = j(() => {
    if (S.length === 0 || !c || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: c,
      caseSensitive: m,
      useRegex: y,
      wholeWord: b
    }) && (I(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [S, c, m, y, b, e, n]), te = j((_) => {
    _.key === "Enter" ? (_.preventDefault(), _.shiftKey ? F() : L(), H.current?.focus()) : _.key === "Escape" ? (_.preventDefault(), n()) : _.key === "h" && (_.ctrlKey || _.metaKey) ? (_.preventDefault(), w((B) => !B)) : _.key === "l" && (_.ctrlKey || _.metaKey) && _.shiftKey && (_.preventDefault(), Z());
  }, [L, F, n, Z]);
  return t ? /* @__PURE__ */ A(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: te,
      children: [
        /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ p(jp, { size: 14, className: "find-replace-icon" }),
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
          /* @__PURE__ */ p("span", { className: "find-replace-count", children: S.length > 0 ? `${x + 1} of ${S.length}` : c ? "No results" : "" }),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: F,
              disabled: S.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ p(Vp, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: L,
              disabled: S.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ p(en, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: Z,
              disabled: S.length === 0,
              className: `find-replace-btn ${R ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${S.length} matches`,
              children: /* @__PURE__ */ p(Kp, { size: 16 })
            }
          ),
          /* @__PURE__ */ p("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => g((_) => !_),
              className: `find-replace-btn ${m ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ p(qp, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => k((_) => !_),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ p(Gp, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => v((_) => !_),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ p(Xp, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => w((_) => !_),
              className: `find-replace-btn ${M ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ p(Qs, { size: 16 })
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ p($t, { size: 16 })
            }
          )
        ] }),
        M && /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ p(Qs, { size: 14, className: "find-replace-icon" }),
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
              disabled: S.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ A(
            "button",
            {
              onClick: K,
              disabled: S.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ p(Zp, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const K0 = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), At = K0 ? "⌘" : "Ctrl", q0 = ({ editor: e }) => {
  const [t, n] = V(!1), [r, o] = V(0), [s, a] = V(0), [i, l] = V(""), [u, c] = V(""), [d, f] = V(!1), [h, m] = V(!1);
  J(() => {
    if (!e) return;
    const N = () => {
      const T = e.storage.selectAllOccurrences;
      T ? (n(T.isActive), o(T.ranges.length), a(T.allMatches.length), l(T.searchTerm), c(T.typedBuffer), f(T.isTypingReplace), m(T.isIncremental)) : (n(!1), o(0), a(0));
    }, x = () => {
      N();
    };
    return e.on("transaction", x), N(), () => {
      e.off("transaction", x);
    };
  }, [e]);
  const g = j(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = j(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), v = j(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), b = j(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), k = j(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), M = j(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = j(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), S = j(() => {
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
      /* @__PURE__ */ p("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ A(ze, { children: [
        /* @__PURE__ */ p(Fo, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ p("span", { className: "select-all-action-bar-preview-old", children: i }),
        /* @__PURE__ */ p("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ p("span", { className: "select-all-action-bar-preview-new", children: u || "∅" })
      ] }) : /* @__PURE__ */ p(ze, { children: /* @__PURE__ */ A("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        i,
        '"'
      ] }) }) }),
      /* @__PURE__ */ p("div", { className: "select-all-action-bar-separator" }),
      h && r < s && /* @__PURE__ */ A(ze, { children: [
        /* @__PURE__ */ p(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${At}+D)`,
            children: /* @__PURE__ */ p(Ha, { size: 14 })
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            onClick: S,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${At}+Shift+L)`,
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
          title: `Bold all occurrences (${At}+B)`,
          children: /* @__PURE__ */ p(Ta, { size: 14 })
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${At}+I)`,
          children: /* @__PURE__ */ p(Ma, { size: 14 })
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${At}+U)`,
          children: /* @__PURE__ */ p(Ea, { size: 14 })
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ p(Na, { size: 14 })
        }
      ),
      /* @__PURE__ */ p("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: k,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ p(zn, { size: 14 })
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          onClick: M,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ p($t, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "select-all-action-bar-hint", children: h && r < s ? /* @__PURE__ */ A(ze, { children: [
      /* @__PURE__ */ A("kbd", { children: [
        At,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ A("kbd", { children: [
        At,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ p("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ A("kbd", { children: [
        At,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ A(ze, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ p("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ p("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ A("kbd", { children: [
        At,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, G0 = Qn(q0), fo = "-dismissed";
function X0(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Z0(e, t = {}) {
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
        const v = localStorage.getItem(n), b = localStorage.getItem(n + fo);
        if (v && !b) {
          let k = "";
          try {
            k = e.getHTML() || "";
          } catch {
            return;
          }
          v !== k && v.length > 50 && l((M) => ({ ...M, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, o]);
  const f = j(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const v = e.getHTML(), b = X0(v);
        if (b === d.current && v.length === c.current.length) {
          l((k) => ({ ...k, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        l((k) => ({ ...k, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), c.current = v, d.current = b, l((k) => ({
          ...k,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(v), setTimeout(() => {
          l((k) => k.status === "saved" ? { ...k, status: "idle" } : k);
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
  const h = j(() => {
    u.current && clearTimeout(u.current), f();
  }, [f]), m = j(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + fo), c.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (v) {
      console.warn("useAutoSave: Error clearing content", v);
    }
  }, [n]), g = j(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const v = localStorage.getItem(n);
      return v && e && !e.isDestroyed ? (l((b) => ({ ...b, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), c.current = v, localStorage.removeItem(n + fo), a?.(v);
          } catch (b) {
            console.warn("useAutoSave: Error setting content during recovery", b);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, a]), y = j(() => {
    try {
      localStorage.setItem(n + fo, "true"), l((v) => ({ ...v, hasRecoverableContent: !1 }));
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
const Q0 = 200;
function J0(e, t = {}) {
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
  }), i = q(null), l = q(""), u = j((c) => {
    const d = c.trim(), f = d.length > 0 ? d.split(/\s+/).filter((b) => b.length > 0).length : 0, h = d.replace(/\s/g, "").length, m = c.length;
    let g = 0, y = 0;
    r && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((b) => b.trim().length > 0).length : 0, y = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / Q0));
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
function e1({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ A(ze, { children: [
          /* @__PURE__ */ p(Qp, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ A("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ A(ze, { children: [
          /* @__PURE__ */ p(bc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ p("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ A(ze, { children: [
          /* @__PURE__ */ p(Jn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ p("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ A(ze, { children: [
          /* @__PURE__ */ p(Jp, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ p("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function t1({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ A(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ p(eh, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ p("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ p(za, { className: "w-4 h-4" }),
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
              children: /* @__PURE__ */ p($t, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
const n1 = /\[\[([^\[\]]+)\]\]$/, r1 = ic.create({
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
      Zn(
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
        find: n1,
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
}), Lt = {
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
}, o1 = ["info", "note", "prompt", "resources", "todo"];
function s1(e) {
  return e.length < 3 ? !1 : !!(Lt.header.test(e) || Lt.bold.test(e) || Lt.list.test(e) || Lt.taskList.test(e) || Lt.codeBlock.test(e) || Lt.callout.test(e) || Lt.highlight.test(e) || Lt.link.test(e) || Lt.table.test(e));
}
function a1(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function i1(e, t) {
  const { alt: n, align: r, width: o } = a1(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", a = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${a} /></figure>`;
}
function Ro(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Hl(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${Ro(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const a = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    a ? o.push(i1(a[1], a[2])) : o.push(`<p>${Ro(s.trim())}</p>`);
  }
  return o.join("");
}
function l1(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const a = o.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: r, text: a[1].trim() };
  const i = o.match(/^\d+\.\s+(.+)$/);
  return i ? { type: "ol", depth: r, text: i[2].trim() } : null;
}
function c1(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let a = "", i = o;
    const l = e[i]?.type || "ul", u = l === "task", c = u ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = u ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += c; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (u ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${Ro(f.text)}</p>` : a += `<li><p>${Ro(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
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
function zl(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return Hl(e);
  const r = e.split(/<br\s*\/?>/i).filter((i) => i.trim()), o = [];
  let s = [];
  const a = () => {
    s.length !== 0 && (o.push(c1(s)), s = []);
  };
  for (const i of r) {
    const l = l1(i);
    if (l) {
      if (s.length > 0) {
        const u = s[0].type;
        l.depth === 0 && l.type !== u && a();
      }
      s.push(l);
    } else
      a(), o.push(Hl(i.trim()));
  }
  return a(), o.join("");
}
function u1(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((i) => i.trim()).filter((i) => i.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let a = "<table><thead><tr>";
  for (const i of r)
    a += "<th>" + zl(i) + "</th>";
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
        a += "<td>" + zl(d) + "</td>";
      }
      a += "</tr>";
    }
  }
  return a += "</tbody></table>", a;
}
function d1(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (i) => {
    const l = i.split(`
`);
    if (l.length >= 2) {
      const u = l[1];
      if (/^\|?[\s\-:|]+\|?$/.test(u) && u.includes("-")) {
        const c = u1(i);
        if (c) {
          const d = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(c), d;
        }
      }
    }
    return i;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (i, l, u) => {
    let c = u.trim();
    c = c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), c = c.replace(/__([^_]+)__/g, "<strong>$1</strong>"), c = c.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), c = c.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), c = c.replace(/`([^`]+)`/g, "<code>$1</code>");
    const d = "info";
    c.startsWith("<") || (c = `<p>${c}</p>`);
    const f = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${d}" class="callout callout-${d}">${c}</div>`), f;
  }), o1.forEach((i) => {
    const l = new RegExp(`\`\`\`${i}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(l, (u, c) => {
      let d = c.trim();
      d = d.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), d = d.replace(/__([^_]+)__/g, "<strong>$1</strong>"), d = d.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), d = d.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), d = d.replace(/`([^`]+)`/g, "<code>$1</code>"), d.startsWith("<") || (d = `<p>${d}</p>`);
      const f = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${i}" class="callout callout-${i}">${d}</div>`), f;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (i, l, u) => {
    const c = l || "plaintext", d = u.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), f = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${c}">${d}</code></pre>`), f;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/^(#{1,6})\s+(.+)$/gm, (i, l, u) => {
    const c = l.length;
    return `<h${c}>${u}</h${c}>`;
  }), t = t.replace(/^(\s*)[-*]\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s+(?!\[)(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/^(\s*)\d+\.\s+(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/(<li data-type="taskItem"[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul data-type="taskList">$&</ul>'), t = t.replace(/(<li><p>[\s\S]*?<\/p><\/li>\n?)+/g, "<ul>$&</ul>"), t = t.replace(/^>\s+(.+)$/gm, "<blockquote><p>$1</p></blockquote>"), t = t.replace(/^[-*_]{3,}$/gm, "<hr>"), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (i, l, u) => {
    const c = l.split("|").map((g) => g.trim());
    let d = "", f = "left", h = null;
    c.length === 1 ? d = c[0] : c.length === 2 ? (d = c[0], /^\d+$/.test(c[1]) ? h = c[1] : ["left", "center", "right"].includes(c[1]) ? f = c[1] : d = l) : c.length === 3 ? (d = c[0], ["left", "center", "right"].includes(c[1]) && (f = c[1]), /^\d+$/.test(c[2]) && (h = c[2])) : d = l;
    const m = h ? ` width="${h}" style="width: ${h}px"` : "";
    return `<img src="${u.trim()}" alt="${d}" data-align="${f}"${m}>`;
  }), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((i) => {
    const l = i.trim();
    return l ? /^<[a-z]/.test(l) || /^<\//.test(l) || l.startsWith("MANUSTABLEPLACEHOLDER") || l.startsWith("MANUSCODEPLACEHOLDER") ? i : `<p>${l}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let i = 0; i < r.length; i++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${i}END`, r[i]);
  for (let i = 0; i < o.length; i++)
    t = t.replace(`MANUSCODEPLACEHOLDER${i}END`, o[i]);
  return t;
}
const f1 = mt.create({
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
        key: new qe("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const a = o.getData("text/plain");
            if (!a || !s1(a))
              return !1;
            n.preventDefault();
            const i = d1(a);
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
}), Bl = new qe("collapsibleHeading");
function Ao(e, t, n) {
  return `h${t}-${n}-${e.textContent.slice(0, 50)}`;
}
let Vn = null;
function js(e, t, n) {
  const r = [], o = [];
  e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const c = Ao(l, l.attrs.level, u);
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
      for (let f = l + 1; f < o.length; f++)
        if (o[f].level <= u.level) {
          d = o[f].pos;
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
      const c = Ao(l, l.attrs.level, u), d = t.collapsedHeadings.has(c), f = i(u);
      r.push(
        lt.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${d ? "is-collapsed" : "is-expanded"}${f ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": c,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const h = lt.widget(u + l.nodeSize - 1, () => {
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
          y.classList.remove("collapsed", "expanded"), y.classList.add(b ? "expanded" : "collapsed"), y.title = b ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(c) ? t.collapsedHeadings.delete(c) : t.collapsedHeadings.add(c), Vn && Vn.dispatch(Vn.state.tr.setMeta("collapsibleHeading", { toggled: c }));
        }), g.appendChild(y), g;
      }, { side: 1, key: `chevron-${c}` });
      r.push(h);
    } else l.isBlock && i(u) && r.push(
      lt.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Qe.create(e, r);
}
const p1 = mt.create({
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
        const s = Ao(o, o.attrs.level, e);
        return r.collapsedHeadings.has(s) ? r.collapsedHeadings.delete(s) : r.collapsedHeadings.add(s), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: s })), !0;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          o.type.name === "heading" && n.collapsedHeadings.add(Ao(o, o.attrs.level, s));
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ke({
        key: Bl,
        view(n) {
          return Vn = n, {
            update(r) {
              Vn = r;
            },
            destroy() {
              Vn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: js(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleHeading") || n.docChanged ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: js(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Bl.getState(n);
            return r?.decorations ? r.decorations : js(n.doc, e, t);
          }
        }
      })
    ];
  }
}), h1 = /\[([^\]]+)\]\(([^)]+)\)$/, m1 = /^(https?:\/\/|www\.)[^\s]+$/i, g1 = mt.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Je({
        find: h1,
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
        key: new qe("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!m1.test(s)) return !1;
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
}), y1 = ["info", "note", "prompt", "resources", "todo"], b1 = mt.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ke({
        key: new qe("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: a } = o, i = a.start();
            a.end();
            const l = s.textBetween(i, a.pos, ""), u = l.trim();
            for (const c of y1)
              if (u === `\`\`\`${c}`) {
                n.preventDefault();
                const d = r.tr, f = i + l.indexOf("```");
                d.delete(f, a.pos);
                const h = e.schema.nodes.callout, m = e.schema.nodes.paragraph;
                if (h && m) {
                  const g = m.create(), y = h.create({ type: c }, bh.from(g));
                  d.insert(f, y);
                  const v = d.doc.resolve(f + 2);
                  d.setSelection(Ho.near(v)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), po = new qe("searchHighlight"), v1 = mt.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(po, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(po, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ke({
        key: po,
        state: {
          init() {
            return Qe.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: l } = e, u = t.getMeta(po), c = t.docChanged;
            if (!s)
              return Qe.empty;
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
                    const v = g + y.index, b = g + y.index + y[0].length, k = f === l;
                    d.push(
                      lt.inline(v, b, {
                        class: k ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return Qe.empty;
            }
            return Qe.create(o.doc, d);
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
}), w1 = new qe("tabIndent");
function k1(e) {
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
const x1 = mt.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Ke({
        key: w1,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = k1(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Bi(s)(n, r)) {
                const l = o === "taskItem" ? "listItem" : "taskItem", u = n.schema.nodes[l];
                u && Bi(u)(n, r);
              }
            } else if (!Wi(s)(n, r)) {
              const l = o === "taskItem" ? "listItem" : "taskItem", u = n.schema.nodes[l];
              u && Wi(u)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), C1 = new qe("expandSelection");
function Vs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const S1 = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), T1 = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), M1 = "tableRow", E1 = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function N1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function D1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (E1.has(s.type.name)) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function R1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === M1) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function A1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (T1.has(s.type.name)) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function L1(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let i = r.depth; i >= 1; i--) {
    const l = r.node(i);
    S1.has(l.type.name) && (o = i);
  }
  if (o === -1) return null;
  const s = r.start(o), a = r.end(o);
  return s < t || a > n ? { from: s, to: a } : null;
}
function P1(e) {
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
function I1(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function O1(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function $1(e, t, n) {
  const r = [];
  let o = t, s = n;
  const a = (l) => l && (l.from < o || l.to > s) ? (r.push(l), o = l.from, s = l.to, !0) : !1;
  a(N1(e, o, s)), O1(e, t) && (a(D1(e, o, s)), a(R1(e, o, s))), a(L1(e, o, s)), a(A1(e, o, s));
  const i = P1(e);
  if (i.length > 0) {
    const l = I1(i, o, s);
    for (const u of l)
      a({ from: u.from, to: u.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const _1 = mt.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof lp || o === 0 && s === n.content.size)
          return !0;
        const i = $1(n, o, s);
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
      new Ke({
        key: C1,
        props: {
          handleClick() {
            return Vs(e), !1;
          },
          handleTextInput() {
            return Vs(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && Vs(e), !1;
          }
        }
      })
    ];
  }
}), H1 = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function z1(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (i) => i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const B1 = new qe("hexColorDecoration"), W1 = ic.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Ke({
        key: B1,
        state: {
          init(e, { doc: t }) {
            return Wl(t);
          },
          apply(e, t) {
            return e.docChanged ? Wl(e.doc) : t;
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
function Wl(e) {
  const t = [];
  return e.descendants((n, r) => {
    if (!n.isText) return;
    const o = n.text || "";
    let s;
    const a = new RegExp(H1.source, "g");
    for (; (s = a.exec(o)) !== null; ) {
      const i = r + s.index, l = i + s[0].length, u = s[0], c = z1(u);
      t.push(
        lt.inline(i, l, {
          class: "hex-color-swatch",
          style: `background-color: ${u}; color: ${c ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
        })
      );
    }
  }), Qe.create(e, t);
}
const Fe = new qe("selectAllOccurrences");
function Fl(e, t, n, r, o) {
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
  const n = Fe.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function F1(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function He(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const U1 = mt.create({
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
        const l = Fl(t.state.doc, o, s, a, i);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = a, this.storage.wholeWord = i, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Fe, { activate: !0 })), !0);
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
          const l = Fl(o.doc, i, !1, !1, !1);
          if (l.length === 0) return !1;
          const u = F1(l, s), c = l[u];
          return r.isActive = !0, r.ranges = [c], r.searchTerm = i, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = i.length, r.allMatches = l, r.nextMatchIndex = (u + 1) % l.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Fe, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Fe, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (He(this.storage), t && t(e.setMeta(Fe, { deactivate: !0 })), !0),
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
              this.storage.ranges = l, l.length === 0 && He(this.storage);
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
        return He(this.storage), !0;
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
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && He(this.storage);
            }
          } catch {
          }
        }, 10) : He(this.storage), !0;
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
        key: Fe,
        state: {
          init() {
            return Qe.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Fe);
            if (s?.deactivate || !e.isActive)
              return Qe.empty;
            if (s?.activate || s?.refresh) {
              const a = [];
              for (const i of e.ranges) {
                a.push(
                  lt.inline(i.from, i.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), a.push(
                  lt.widget(i.to, l, {
                    side: 1,
                    key: `cursor-${i.from}-${i.to}`
                  })
                );
              }
              return Qe.create(o.doc, a);
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
              He(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Fe, { deactivate: !0 }));
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
              He(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Fe, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), vh(t.state, t.dispatch), setTimeout(() => {
                  const s = Zt(t);
                  e.ranges = s, s.length === 0 && He(e);
                }, 10), !0;
              }
              He(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Fe, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, wh(t.state, t.dispatch), setTimeout(() => {
                  const s = Zt(t);
                  e.ranges = s, s.length === 0 && He(e);
                }, 10), !0;
              }
              He(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Fe, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Zt(t);
                if (r.length === 0) {
                  He(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(Fe, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((i, l) => l.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(o));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = Zt(t);
                  e.ranges = i, i.length === 0 && He(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((a, i) => i.from - a.from), { tr: o } = t.state;
                for (const a of r)
                  o.delete(a.from, a.to);
                t.dispatch(o), He(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Fe, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((a, i) => i.from - a.from), { tr: o } = t.state;
              for (const a of r)
                o.delete(a.from, a.to);
              t.dispatch(o), He(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Fe, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              He(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Fe, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              He(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Fe, { deactivate: !0 })), !1;
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
              He(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Fe, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const a = [...s].sort((l, u) => u.from - l.from), { tr: i } = t.state;
            for (const l of a)
              i.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const l = Zt(t);
              e.ranges = l, l.length === 0 && He(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function Y1() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function j1(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function V1(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", a = atob(r), i = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    i[l] = a.charCodeAt(l);
  return new File([i], t, { type: s });
}
function K1(e, t) {
  return t.includes(e.type);
}
function q1(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function G1(e, t, n) {
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
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", h = d ? void 0 : n, m = u.toDataURL(f, h), g = V1(m, e.name);
      r({ dataUrl: m, file: g, width: i, height: l });
    }, s.onerror = () => o(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function X1(e, t, n) {
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
async function Ul(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!K1(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = Y1();
  try {
    n.onUploadStart?.();
    let o, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const d = await G1(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = d.dataUrl, a = d.file, s = Math.min(d.width, 600);
    } else {
      o = await j1(e), a = e;
      const d = await q1(o);
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
      return console.warn("Image upload failed, removing placeholder:", d), X1(t, o, e.name), n.onUploadError?.(`Upload failed: ${d instanceof Error ? d.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function Yl(e) {
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
const Z1 = mt.create({
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
        key: new qe("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = Yl(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((a) => {
              Ul(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const a = r.dataTransfer;
            if (!a) return !1;
            const i = Yl(a);
            if (i.length === 0)
              return !1;
            r.preventDefault();
            const l = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (l) {
              const u = n.state.tr.setSelection(
                Ho.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(u);
            }
            return i.forEach((u) => {
              Ul(u, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function Q1({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = V(!1), [o, s] = V(0), a = j((c) => {
    c.preventDefault(), c.stopPropagation(), c.dataTransfer?.types.includes("Files") && (s((d) => d + 1), r(!0));
  }, []), i = j((c) => {
    c.preventDefault(), c.stopPropagation(), s((d) => {
      const f = d - 1;
      return f === 0 && r(!1), f;
    });
  }, []), l = j((c) => {
    c.preventDefault(), c.stopPropagation();
  }, []), u = j((c) => {
    c.preventDefault(), c.stopPropagation(), r(!1), s(0);
  }, []);
  return J(() => {
    if (!t || !e.current) return;
    const c = e.current;
    return c.addEventListener("dragenter", a), c.addEventListener("dragleave", i), c.addEventListener("dragover", l), c.addEventListener("drop", u), () => {
      c.removeEventListener("dragenter", a), c.removeEventListener("dragleave", i), c.removeEventListener("dragover", l), c.removeEventListener("drop", u);
    };
  }, [t, e, a, i, l, u]), n ? /* @__PURE__ */ p("div", { className: "image-drop-zone", children: /* @__PURE__ */ A("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ p("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ p(th, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ A("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ p("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ p("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function J1({
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
    let k = n.x - 160, M = n.y + 10;
    return k + 320 > window.innerWidth - 16 && (k = window.innerWidth - 320 - 16), k < 16 && (k = 16), M + 280 > window.innerHeight - 16 && (M = n.y - 280 - 10), M < 16 && (M = 16), { left: k, top: M };
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
              children: /* @__PURE__ */ p($t, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ A("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ A("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ A("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ p(Da, { className: "w-3.5 h-3.5" }),
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
              /* @__PURE__ */ p(Fo, { className: "w-3.5 h-3.5" }),
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
              children: /* @__PURE__ */ p(zn, { className: "w-4 h-4" })
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
                  /* @__PURE__ */ p(Jn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ p(Bt, { children: g });
}
function ho(e) {
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
      let k;
      for (b.regex.lastIndex = 0; (k = b.regex.exec(i)) !== null; )
        g.push({
          start: l + k.index,
          end: l + k.index + k[0].length,
          type: b.type,
          content: k[0]
        });
    }
    g.sort((b, k) => b.start - k.start);
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
function jl(e) {
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
function gn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function mo(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return gn(e);
  let o = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const u = s[l], c = a + u.length, d = t.filter((h) => h.start >= a && h.start < c);
      let f = a;
      for (const h of d)
        h.start > f && (o += gn(e.substring(f, h.start))), o += `<span class="${jl(h.type)}">${gn(h.content)}</span>`, f = h.end;
      f < c && (o += gn(e.substring(f, c))), l < s.length - 1 && (o += `
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
      h.start > f && (o += Ks(e, f, h.start, null, i)), o += Ks(e, h.start, h.end, jl(h.type), i), f = h.end;
    f < c && (o += Ks(e, f, c, null, i)), l < s.length - 1 && (o += `
`), a = c + 1;
  }
  return o;
}
function Ks(e, t, n, r, o) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = o.get(a);
    if (i) {
      const l = a;
      for (; a < n && o.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const u = gn(e.substring(l, a)), c = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${c}">${u}</mark></span>` : s += `<mark class="${c}">${u}</mark>`;
    } else {
      const l = a;
      for (; a < n && !o.has(a); )
        a++;
      const u = gn(e.substring(l, a));
      r ? s += `<span class="${r}">${u}</span>` : s += u;
    }
  }
  return s;
}
function eC({
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
    const x = ho(e);
    return mo(e, x, a, i);
  }), v = q(null), b = yn(() => {
    if (e.length <= h) {
      const x = ho(e), T = mo(e, x, a, i);
      return v.current && (clearTimeout(v.current), v.current = null), T;
    }
    return null;
  }, [e, a, i]);
  J(() => {
    if (e.length <= h) {
      const x = ho(e);
      y(mo(e, x, a, i));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const x = ho(e);
      y(mo(e, x, a, i)), v.current = null;
    }, m), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, a, i]);
  const k = b ?? g, M = j(() => {
    const x = u.current, T = c.current, E = d.current;
    if (x) {
      const D = E?.parentElement, R = D ? D.clientHeight : 200;
      x.style.height = "auto";
      const I = Math.max(x.scrollHeight, R, 200);
      x.style.height = `${I}px`, T && (T.style.height = `${I}px`);
    }
  }, []);
  J(() => {
    const x = u.current;
    if (!x) return;
    const T = (E) => {
      const D = x.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: R, scrollHeight: I, clientHeight: O } = D, H = R <= 0, W = R + O >= I - 1;
      (E.deltaY > 0 && !W || E.deltaY < 0 && !H) && (E.preventDefault(), D.scrollTop += E.deltaY);
    };
    return x.addEventListener("wheel", T, { passive: !1 }), () => x.removeEventListener("wheel", T);
  }, []);
  const w = j(() => {
  }, []);
  J(() => {
    M();
  }, [e, M]), J(() => {
    o && u.current && u.current.focus();
  }, [o]), J(() => {
    if (f.current && u.current) {
      const { start: x, end: T } = f.current;
      u.current.selectionStart = x, u.current.selectionEnd = T, f.current = null;
    }
  }, [e]);
  const S = j((x) => {
    const T = x.target;
    f.current = {
      start: T.selectionStart,
      end: T.selectionEnd
    }, t(T.value);
  }, [t]), N = j((x) => {
    const T = x.currentTarget, E = T.selectionStart, D = T.selectionEnd, R = T.value, I = E !== D;
    if (l) {
      if (x.key === "`" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), I) {
          const O = R.substring(E, D), H = R.substring(0, E) + "`" + O + "`" + R.substring(D);
          f.current = { start: E + 1, end: D + 1 }, t(H);
        } else if (R[E] === "`")
          f.current = { start: E + 1, end: E + 1 }, t(R), T.selectionStart = T.selectionEnd = E + 1;
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
        dangerouslySetInnerHTML: { __html: k || `<span class="md-placeholder">${gn(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ p(
      "textarea",
      {
        ref: u,
        value: e,
        onChange: S,
        onKeyDown: N,
        onScroll: w,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let Vl = 0, ba = 0, ef = 0;
function tC(e) {
  ba++, ef = e;
}
const nC = Qn(function({
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
        const T = performance.now() - x;
        tC(T);
      });
    };
    return r.on("transaction", N), () => {
      r.off("transaction", N);
    };
  }, [t, r]), J(() => {
    if (!t) return;
    let N = 0, x = performance.now(), T = 0;
    const E = (D) => {
      const R = D - u.current;
      if (u.current = D, l.current.push({ time: D, duration: R }), l.current.length > 120 && (l.current = l.current.slice(-120)), R > 16.67 && d.current++, N++, D - x >= 1e3) {
        T = N, N = 0, x = D;
        const I = l.current.slice(-60), O = I.length > 0 ? I.reduce((K, Z) => K + Z.duration, 0) / I.length : 0, H = I.length > 0 ? Math.max(...I.map((K) => K.duration)) : 0, W = performance.memory, G = W ? W.usedJSHeapSize / (1024 * 1024) : 0, P = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, F = Vl - f.current, X = ba - h.current;
        f.current = Vl, h.current = ba, i({
          fps: T,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(H * 100) / 100,
          memoryUsed: Math.round(G * 10) / 10,
          memoryTotal: Math.round(P),
          renderCount: F,
          transactionCount: X,
          lastTransactionTime: Math.round(ef * 100) / 100,
          domNodes: L,
          longFrames: d.current
        }), g((K) => [...K.slice(1), T]), v((K) => [...K.slice(1), O]), d.current = 0;
      }
      c.current = requestAnimationFrame(E);
    };
    return c.current = requestAnimationFrame(E), () => {
      cancelAnimationFrame(c.current);
    };
  }, [t]);
  const b = j(() => {
    n?.();
  }, [n]), k = j(() => {
    s((N) => !N);
  }, []);
  if (!t) return null;
  const M = (N) => N >= 55 ? "#4ade80" : N >= 30 ? "#fbbf24" : "#f87171", w = (N) => N <= 16.67 ? "#4ade80" : N <= 33.33 ? "#fbbf24" : "#f87171", S = (N, x, T) => {
    const R = N.map((I, O) => {
      const H = O / (N.length - 1) * 120, W = 24 - Math.min(I, x) / x * 24;
      return `${H},${W}`;
    }).join(" ");
    return /* @__PURE__ */ p("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ p(
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
        /* @__PURE__ */ p(nh, { size: 14 }),
        /* @__PURE__ */ p("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ p("button", { onClick: k, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ p(vc, { size: 12 }) : /* @__PURE__ */ p(wc, { size: 12 }) }),
        /* @__PURE__ */ p("button", { onClick: b, title: "Close profiler", children: /* @__PURE__ */ p($t, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ A("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ p("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ p("span", { className: "perf-value", style: { color: M(a.fps) }, children: a.fps })
        ] }),
        S(m, 70, M(a.fps))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ p("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ A("span", { className: "perf-value", style: { color: w(a.frameTime) }, children: [
            a.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ p("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ A("span", { className: "perf-value-sub", style: { color: w(a.frameTimeMax) }, children: [
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
        S(y, 50, w(a.frameTime))
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
class rC extends kp {
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
      return /* @__PURE__ */ p("div", { className: de("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ A("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ p("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ p(rh, { className: "w-6 h-6 text-destructive" }) }),
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
                /* @__PURE__ */ p(za, { className: "w-4 h-4" }),
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
                /* @__PURE__ */ p(zn, { className: "w-4 h-4" }),
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
                n ? /* @__PURE__ */ p(en, { className: "w-3 h-3" }) : /* @__PURE__ */ p(hc, { className: "w-3 h-3" }),
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
                  children: o ? /* @__PURE__ */ A(ze, { children: [
                    /* @__PURE__ */ p(oh, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ p("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ A(ze, { children: [
                    /* @__PURE__ */ p(er, { className: "w-3 h-3" }),
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
function oC({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function sC(e, t) {
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
function aC(e) {
  const [t, n] = xp(sC, { status: "idle" }), r = q(null), o = j(async (i, l, u, c, d) => {
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
  }, [e]), s = j(() => {
    r.current?.(), n({ type: "reset" });
  }, []), a = j(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: a };
}
const iC = {
  SpellCheck: ah,
  RefreshCw: sh,
  Minimize2: wc,
  Maximize2: vc,
  FileText: _a,
  MessageSquare: kc,
  Sparkles: Wo
};
function lC({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
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
  const h = j(() => {
    const v = d.length * 40 + (i ? 56 : 0) + 16, b = window.innerWidth, k = window.innerHeight;
    let M = o.top, w = o.left;
    return w + 260 > b - 8 && (w = b - 260 - 8), w < 8 && (w = 8), M + v > k - 8 && (M = o.top - v - 8), M < 8 && (M = 8), { top: M, left: w };
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
              /* @__PURE__ */ p(kc, { size: 14, className: "text-muted-foreground shrink-0" }),
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
              const v = y.icon ? iC[y.icon] : Wo;
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
  return /* @__PURE__ */ p(Bt, { onMouseDown: (y) => y.preventDefault(), children: g });
}
function cC({
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
      const w = new ResizeObserver((S) => {
        for (const N of S)
          d(N.contentRect.height);
      });
      return w.observe(a.current), () => w.disconnect();
    }
  }, []), J(() => {
    i.current && e.status === "streaming" && (i.current.scrollTop = i.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), J(() => {
    const w = (S) => {
      S.key === "Escape" && s();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [s]);
  const f = yn(() => {
    const x = window.innerWidth, T = window.innerHeight;
    let E = t.selectionCenterX - 380 / 2;
    E + 380 > x - 8 && (E = x - 380 - 8), E < 8 && (E = 8);
    const D = T - t.selectionBottom - 8, R = t.selectionTop - 8, I = c || 200;
    let O, H = !1;
    return D >= I || D >= R ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - I, H = !0), O < 8 && (O = 8), O + I > T - 8 && (O = T - I - 8), { top: O, left: E, placedAbove: H };
  }, [t, c]), h = e.status === "streaming" || e.status === "complete" ? e.result : "", m = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", y = e.status === "complete", v = e.status === "error", b = j(() => {
    navigator.clipboard.writeText(h), u(!0), setTimeout(() => u(!1), 1500);
  }, [h]);
  if (e.status === "idle") return null;
  const k = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", M = /* @__PURE__ */ p(
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
          ${k}
        `,
          children: [
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ A("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                g && /* @__PURE__ */ p(bc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ p("span", { className: "font-medium", children: v ? "Error" : m }),
                g && /* @__PURE__ */ p("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ p(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (w) => {
                    w.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ p($t, { size: 14, className: "text-muted-foreground" })
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
              (y || v) && /* @__PURE__ */ A(ze, { children: [
                y && /* @__PURE__ */ A(ze, { children: [
                  /* @__PURE__ */ p(
                    Hn,
                    {
                      icon: Qs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ p(
                    Hn,
                    {
                      icon: Ha,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ p(
                    Hn,
                    {
                      icon: l ? Jn : er,
                      label: l ? "Copied" : "Copy",
                      onClick: b
                    }
                  )
                ] }),
                /* @__PURE__ */ p(
                  Hn,
                  {
                    icon: za,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ p("div", { className: "flex-1" }),
                /* @__PURE__ */ p(
                  Hn,
                  {
                    icon: $t,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ A(ze, { children: [
                /* @__PURE__ */ p("div", { className: "flex-1" }),
                /* @__PURE__ */ p(
                  Hn,
                  {
                    icon: $t,
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
  return /* @__PURE__ */ p(Bt, { onMouseDown: (w) => w.preventDefault(), children: M });
}
function Hn({
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
const tf = "paragon-editor-toc-width", uC = 280, nf = 200, rf = 500;
function Kl() {
  try {
    const e = localStorage.getItem(tf);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= nf && t <= rf)
        return t;
    }
  } catch {
  }
  return uC;
}
function dC(e) {
  try {
    localStorage.setItem(tf, String(e));
  } catch {
  }
}
function fC(e, t, n) {
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
function pC(e) {
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
function ql(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const Gl = Qn(function({
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
  const [b, k] = V([]), [M, w] = V(null), [S, N] = V(n), [x, T] = V(/* @__PURE__ */ new Set()), [E, D] = V(() => {
    if (d) {
      const B = parseInt(d, 10);
      return isNaN(B) ? Kl() : B;
    }
    return Kl();
  }), R = q(null), I = q(null), O = q(!1), H = q(0), W = q(0);
  J(() => {
    N(n);
  }, [n]);
  const G = j((B) => {
    B.preventDefault(), B.stopPropagation(), O.current = !0, H.current = B.clientX, W.current = E, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [E]);
  J(() => {
    const B = (ee) => {
      if (!O.current) return;
      const ge = f === "right" ? H.current - ee.clientX : ee.clientX - H.current, be = Math.min(rf, Math.max(nf, W.current + ge));
      D(be);
    }, U = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((ee) => (dC(ee), ee)));
    };
    return document.addEventListener("mousemove", B), document.addEventListener("mouseup", U), () => {
      document.removeEventListener("mousemove", B), document.removeEventListener("mouseup", U);
    };
  }, [f]);
  const P = j(() => {
    if (!t || t.isDestroyed) return;
    const B = fC(t, s, a);
    k(B), M && !B.find((U) => U.id === M) && w(null);
  }, [t, s, a, M]);
  J(() => {
    if (!t) return;
    const B = () => {
      I.current && clearTimeout(I.current), I.current = setTimeout(() => P(), 300);
    };
    return P(), t.on("update", B), t.on("create", B), () => {
      t.off("update", B), t.off("create", B), I.current && clearTimeout(I.current);
    };
  }, [t, P]), J(() => {
    if (!t || !l || !S || b.length === 0) return;
    const B = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!B) return;
    const U = () => {
      const be = B.getBoundingClientRect();
      let Ae = null;
      for (let Be = b.length - 1; Be >= 0; Be--) {
        const ot = b[Be], Wt = ql(t, ot.pos);
        if (Wt && Wt.getBoundingClientRect().top - be.top <= h + 10) {
          Ae = ot.id;
          break;
        }
      }
      !Ae && b.length > 0 && (Ae = b[0].id), w(Ae);
    };
    let ee;
    const ge = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(U);
    };
    return B.addEventListener("scroll", ge, { passive: !0 }), U(), () => {
      B.removeEventListener("scroll", ge), cancelAnimationFrame(ee);
    };
  }, [t, b, l, S, h, v]);
  const L = j((B) => {
    if (!t || t.isDestroyed) return;
    const U = ql(t, B.pos);
    if (U) {
      const ee = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const ge = ee.getBoundingClientRect(), Ae = U.getBoundingClientRect().top - ge.top + ee.scrollTop;
        ee.scrollTo({ top: Ae - h, behavior: "smooth" });
      } else
        U.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(B.pos + 1);
    } catch {
    }
    w(B.id), m?.(B);
  }, [t, h, m, v]), F = j(() => {
    const B = !S;
    N(B), r?.(B);
  }, [S, r]), X = j((B) => {
    T((U) => {
      const ee = new Set(U);
      return ee.has(B) ? ee.delete(B) : ee.add(B), ee;
    });
  }, []), K = j((B, U, ee = 0) => {
    if (g)
      return g(B, U, () => L(B));
    const ge = (B.level - s) * 14, be = u && B.children && B.children.length > 0, Ae = x.has(B.id);
    return /* @__PURE__ */ p(
      "div",
      {
        className: `toc-item ${U ? "toc-item-active" : ""} toc-level-${B.level}`,
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
                  onClick: (Be) => {
                    Be.stopPropagation(), X(B.id);
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
  }, [g, L, u, s, i, x, X]), Z = j((B, U = 0) => B.map((ee) => {
    const ge = M === ee.id, be = x.has(ee.id), Ae = ee.children && ee.children.length > 0;
    return /* @__PURE__ */ A("div", { children: [
      K(ee, ge, U),
      Ae && !be && /* @__PURE__ */ p("div", { className: "toc-children", children: Z(ee.children, U + 1) })
    ] }, ee.id);
  }), [M, x, K]), te = j(() => b.map((B) => {
    const U = M === B.id;
    return K(B, U);
  }), [b, M, K]);
  if (!t) return null;
  const _ = u ? pC(b) : [];
  return /* @__PURE__ */ A(ze, { children: [
    y && /* @__PURE__ */ p(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: F,
        title: S ? "Hide Table of Contents" : "Show Table of Contents",
        children: S ? /* @__PURE__ */ p(ih, { size: 16 }) : /* @__PURE__ */ p(lh, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(
      "div",
      {
        ref: R,
        className: `toc-sidebar ${S ? "toc-visible" : "toc-hidden"} toc-${f} ${c}`,
        style: { width: S ? `${E}px` : "0px" },
        children: [
          S && /* @__PURE__ */ p(
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
function hC(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n)
      n.hasOwnProperty(r) && (e[r] = n[r]);
  }
  return e;
}
function va(e, t) {
  return Array(t + 1).join(e);
}
function of(e) {
  return e.replace(/^\n*/, "");
}
function sf(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function af(e) {
  return sf(of(e));
}
var mC = [
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
function mi(e) {
  return gi(e, mC);
}
var lf = [
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
function cf(e) {
  return gi(e, lf);
}
function gC(e) {
  return df(e, lf);
}
var uf = [
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
function yC(e) {
  return gi(e, uf);
}
function bC(e) {
  return df(e, uf);
}
function gi(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function df(e, t) {
  return e.getElementsByTagName && t.some(function(n) {
    return e.getElementsByTagName(n).length;
  });
}
var Ge = {};
Ge.paragraph = {
  filter: "p",
  replacement: function(e) {
    return `

` + e + `

`;
  }
};
Ge.lineBreak = {
  filter: "br",
  replacement: function(e, t, n) {
    return n.br + `
`;
  }
};
Ge.heading = {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: function(e, t, n) {
    var r = Number(t.nodeName.charAt(1));
    if (n.headingStyle === "setext" && r < 3) {
      var o = va(r === 1 ? "=" : "-", e.length);
      return `

` + e + `
` + o + `

`;
    } else
      return `

` + va("#", r) + " " + e + `

`;
  }
};
Ge.blockquote = {
  filter: "blockquote",
  replacement: function(e) {
    return e = af(e).replace(/^/gm, "> "), `

` + e + `

`;
  }
};
Ge.list = {
  filter: ["ul", "ol"],
  replacement: function(e, t) {
    var n = t.parentNode;
    return n.nodeName === "LI" && n.lastElementChild === t ? `
` + e : `

` + e + `

`;
  }
};
Ge.listItem = {
  filter: "li",
  replacement: function(e, t, n) {
    var r = n.bulletListMarker + "   ", o = t.parentNode;
    if (o.nodeName === "OL") {
      var s = o.getAttribute("start"), a = Array.prototype.indexOf.call(o.children, t);
      r = (s ? Number(s) + a : a + 1) + ".  ";
    }
    var i = /\n$/.test(e);
    return e = af(e) + (i ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(r.length)), r + e + (t.nextSibling ? `
` : "");
  }
};
Ge.indentedCodeBlock = {
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
Ge.fencedCodeBlock = {
  filter: function(e, t) {
    return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
  },
  replacement: function(e, t, n) {
    for (var r = t.firstChild.getAttribute("class") || "", o = (r.match(/language-(\S+)/) || [null, ""])[1], s = t.firstChild.textContent, a = n.fence.charAt(0), i = 3, l = new RegExp("^" + a + "{3,}", "gm"), u; u = l.exec(s); )
      u[0].length >= i && (i = u[0].length + 1);
    var c = va(a, i);
    return `

` + c + o + `
` + s.replace(/\n$/, "") + `
` + c + `

`;
  }
};
Ge.horizontalRule = {
  filter: "hr",
  replacement: function(e, t, n) {
    return `

` + n.hr + `

`;
  }
};
Ge.inlineLink = {
  filter: function(e, t) {
    return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t) {
    var n = t.getAttribute("href");
    n && (n = n.replace(/([()])/g, "\\$1"));
    var r = Lo(t.getAttribute("title"));
    return r && (r = ' "' + r.replace(/"/g, '\\"') + '"'), "[" + e + "](" + n + r + ")";
  }
};
Ge.referenceLink = {
  filter: function(e, t) {
    return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t, n) {
    var r = t.getAttribute("href"), o = Lo(t.getAttribute("title"));
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
Ge.emphasis = {
  filter: ["em", "i"],
  replacement: function(e, t, n) {
    return e.trim() ? n.emDelimiter + e + n.emDelimiter : "";
  }
};
Ge.strong = {
  filter: ["strong", "b"],
  replacement: function(e, t, n) {
    return e.trim() ? n.strongDelimiter + e + n.strongDelimiter : "";
  }
};
Ge.code = {
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
Ge.image = {
  filter: "img",
  replacement: function(e, t) {
    var n = Lo(t.getAttribute("alt")), r = t.getAttribute("src") || "", o = Lo(t.getAttribute("title")), s = o ? ' "' + o + '"' : "";
    return r ? "![" + n + "](" + r + s + ")" : "";
  }
};
function Lo(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function ff(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = {
    replacement: e.blankReplacement
  }, this.keepReplacement = e.keepReplacement, this.defaultRule = {
    replacement: e.defaultReplacement
  }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
ff.prototype = {
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
    return (t = qs(this.array, e, this.options)) || (t = qs(this._keep, e, this.options)) || (t = qs(this._remove, e, this.options)) ? t : this.defaultRule;
  },
  forEach: function(e) {
    for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
  }
};
function qs(e, t, n) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r];
    if (vC(o, t, n)) return o;
  }
}
function vC(e, t, n) {
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
function wC(e) {
  var t = e.element, n = e.isBlock, r = e.isVoid, o = e.isPre || function(d) {
    return d.nodeName === "PRE";
  };
  if (!(!t.firstChild || o(t))) {
    for (var s = null, a = !1, i = null, l = Xl(i, t, o); l !== t; ) {
      if (l.nodeType === 3 || l.nodeType === 4) {
        var u = l.data.replace(/[ \r\n\t]+/g, " ");
        if ((!s || / $/.test(s.data)) && !a && u[0] === " " && (u = u.substr(1)), !u) {
          l = Gs(l);
          continue;
        }
        l.data = u, s = l;
      } else if (l.nodeType === 1)
        n(l) || l.nodeName === "BR" ? (s && (s.data = s.data.replace(/ $/, "")), s = null, a = !1) : r(l) || o(l) ? (s = null, a = !0) : s && (a = !1);
      else {
        l = Gs(l);
        continue;
      }
      var c = Xl(i, l, o);
      i = l, l = c;
    }
    s && (s.data = s.data.replace(/ $/, ""), s.data || Gs(s));
  }
}
function Gs(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function Xl(e, t, n) {
  return e && e.parentNode === t || n(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var yi = typeof window < "u" ? window : {};
function kC() {
  var e = yi.DOMParser, t = !1;
  try {
    new e().parseFromString("", "text/html") && (t = !0);
  } catch {
  }
  return t;
}
function xC() {
  var e = function() {
  };
  return CC() ? e.prototype.parseFromString = function(t) {
    var n = new window.ActiveXObject("htmlfile");
    return n.designMode = "on", n.open(), n.write(t), n.close(), n;
  } : e.prototype.parseFromString = function(t) {
    var n = document.implementation.createHTMLDocument("");
    return n.open(), n.write(t), n.close(), n;
  }, e;
}
function CC() {
  var e = !1;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    yi.ActiveXObject && (e = !0);
  }
  return e;
}
var SC = kC() ? yi.DOMParser : xC();
function TC(e, t) {
  var n;
  if (typeof e == "string") {
    var r = MC().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + e + "</x-turndown>",
      "text/html"
    );
    n = r.getElementById("turndown-root");
  } else
    n = e.cloneNode(!0);
  return wC({
    element: n,
    isBlock: mi,
    isVoid: cf,
    isPre: t.preformattedCode ? EC : null
  }), n;
}
var Xs;
function MC() {
  return Xs = Xs || new SC(), Xs;
}
function EC(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function NC(e, t) {
  return e.isBlock = mi(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = DC(e), e.flankingWhitespace = RC(e, t), e;
}
function DC(e) {
  return !cf(e) && !yC(e) && /^\s*$/i.test(e.textContent) && !gC(e) && !bC(e);
}
function RC(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode)
    return { leading: "", trailing: "" };
  var n = AC(e.textContent);
  return n.leadingAscii && Zl("left", e, t) && (n.leading = n.leadingNonAscii), n.trailingAscii && Zl("right", e, t) && (n.trailing = n.trailingNonAscii), { leading: n.leading, trailing: n.trailing };
}
function AC(e) {
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
function Zl(e, t, n) {
  var r, o, s;
  return e === "left" ? (r = t.previousSibling, o = / $/) : (r = t.nextSibling, o = /^ /), r && (r.nodeType === 3 ? s = o.test(r.nodeValue) : n.preformattedCode && r.nodeName === "CODE" ? s = !1 : r.nodeType === 1 && !mi(r) && (s = o.test(r.textContent))), s;
}
var LC = Array.prototype.reduce, PC = [
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
function Po(e) {
  if (!(this instanceof Po)) return new Po(e);
  var t = {
    rules: Ge,
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
  this.options = hC({}, t, e), this.rules = new ff(this.options);
}
Po.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */
  turndown: function(e) {
    if (!$C(e))
      throw new TypeError(
        e + " is not a string, or an element/document/fragment node."
      );
    if (e === "") return "";
    var t = pf.call(this, new TC(e, this.options));
    return IC.call(this, t);
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
    return PC.reduce(function(t, n) {
      return t.replace(n[0], n[1]);
    }, e);
  }
};
function pf(e) {
  var t = this;
  return LC.call(e.childNodes, function(n, r) {
    r = new NC(r, t.options);
    var o = "";
    return r.nodeType === 3 ? o = r.isCode ? r.nodeValue : t.escape(r.nodeValue) : r.nodeType === 1 && (o = OC.call(t, r)), hf(n, o);
  }, "");
}
function IC(e) {
  var t = this;
  return this.rules.forEach(function(n) {
    typeof n.append == "function" && (e = hf(e, n.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function OC(e) {
  var t = this.rules.forNode(e), n = pf.call(this, e), r = e.flankingWhitespace;
  return (r.leading || r.trailing) && (n = n.trim()), r.leading + t.replacement(n, e, this.options) + r.trailing;
}
function hf(e, t) {
  var n = sf(e), r = of(t), o = Math.max(e.length - n.length, t.length - r.length), s = `

`.substring(0, o);
  return n + s + r;
}
function $C(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
var Ql = /highlight-(?:text|source)-([a-z0-9]+)/;
function _C(e) {
  e.addRule("highlightedCodeBlock", {
    filter: function(t) {
      var n = t.firstChild;
      return t.nodeName === "DIV" && Ql.test(t.className) && n && n.nodeName === "PRE";
    },
    replacement: function(t, n, r) {
      var o = n.className || "", s = (o.match(Ql) || [null, ""])[1];
      return `

` + r.fence + s + `
` + n.firstChild.textContent + `
` + r.fence + `

`;
    }
  });
}
function HC(e) {
  e.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: function(t) {
      return "~" + t + "~";
    }
  });
}
var zC = Array.prototype.indexOf, BC = Array.prototype.every, Xn = {};
Xn.tableCell = {
  filter: ["th", "td"],
  replacement: function(e, t) {
    return mf(e, t);
  }
};
Xn.tableRow = {
  filter: "tr",
  replacement: function(e, t) {
    var n = "", r = { left: ":--", right: "--:", center: ":-:" };
    if (bi(t))
      for (var o = 0; o < t.childNodes.length; o++) {
        var s = "---", a = (t.childNodes[o].getAttribute("align") || "").toLowerCase();
        a && (s = r[a] || s), n += mf(s, t.childNodes[o]);
      }
    return `
` + e + (n ? `
` + n : "");
  }
};
Xn.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function(e) {
    return e.nodeName === "TABLE" && bi(e.rows[0]);
  },
  replacement: function(e) {
    return e = e.replace(`

`, `
`), `

` + e + `

`;
  }
};
Xn.tableSection = {
  filter: ["thead", "tbody", "tfoot"],
  replacement: function(e) {
    return e;
  }
};
function bi(e) {
  var t = e.parentNode;
  return t.nodeName === "THEAD" || t.firstChild === e && (t.nodeName === "TABLE" || WC(t)) && BC.call(e.childNodes, function(n) {
    return n.nodeName === "TH";
  });
}
function WC(e) {
  var t = e.previousSibling;
  return e.nodeName === "TBODY" && (!t || t.nodeName === "THEAD" && /^\s*$/i.test(t.textContent));
}
function mf(e, t) {
  var n = zC.call(t.parentNode.childNodes, t), r = " ";
  return n === 0 && (r = "| "), r + e + " |";
}
function FC(e) {
  e.keep(function(n) {
    return n.nodeName === "TABLE" && !bi(n.rows[0]);
  });
  for (var t in Xn) e.addRule(t, Xn[t]);
}
function UC(e) {
  e.addRule("taskListItems", {
    filter: function(t) {
      return t.type === "checkbox" && t.parentNode.nodeName === "LI";
    },
    replacement: function(t, n) {
      return (n.checked ? "[x]" : "[ ]") + " ";
    }
  });
}
function YC(e) {
  e.use([
    _C,
    HC,
    FC,
    UC
  ]);
}
function jC() {
  return yn(() => {
    const e = new Po({
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
    e.use(YC), e.addRule("highlight", {
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
        return l ? `@${qb(l)}@` : a;
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
function vi() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var Cn = vi();
function gf(e) {
  Cn = e;
}
var Tr = { exec: () => null };
function we(e, t = "") {
  let n = typeof e == "string" ? e : e.source, r = { replace: (o, s) => {
    let a = typeof s == "string" ? s : s.source;
    return a = a.replace(Xe.caret, "$1"), n = n.replace(o, a), r;
  }, getRegex: () => new RegExp(n, t) };
  return r;
}
var VC = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), Xe = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`), htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i") }, KC = /^(?:[ \t]*(?:\n|$))+/, qC = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, GC = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ur = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, XC = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, wi = /(?:[*+-]|\d{1,9}[.)])/, yf = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, bf = we(yf).replace(/bull/g, wi).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), ZC = we(yf).replace(/bull/g, wi).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ki = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, QC = /^[^\n]+/, xi = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, JC = we(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", xi).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), eS = we(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, wi).getRegex(), os = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ci = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, tS = we("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ci).replace("tag", os).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), vf = we(ki).replace("hr", Ur).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", os).getRegex(), nS = we(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", vf).getRegex(), Si = { blockquote: nS, code: qC, def: JC, fences: GC, heading: XC, hr: Ur, html: tS, lheading: bf, list: eS, newline: KC, paragraph: vf, table: Tr, text: QC }, Jl = we("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ur).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", os).getRegex(), rS = { ...Si, lheading: ZC, table: Jl, paragraph: we(ki).replace("hr", Ur).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Jl).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", os).getRegex() }, oS = { ...Si, html: we(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ci).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Tr, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: we(ki).replace("hr", Ur).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", bf).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, sS = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, aS = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, wf = /^( {2,}|\\)\n(?!\s*$)/, iS = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ss = /[\p{P}\p{S}]/u, Ti = /[\s\p{P}\p{S}]/u, kf = /[^\s\p{P}\p{S}]/u, lS = we(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Ti).getRegex(), xf = /(?!~)[\p{P}\p{S}]/u, cS = /(?!~)[\s\p{P}\p{S}]/u, uS = /(?:[^\s\p{P}\p{S}]|~)/u, dS = we(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", VC ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Cf = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, fS = we(Cf, "u").replace(/punct/g, ss).getRegex(), pS = we(Cf, "u").replace(/punct/g, xf).getRegex(), Sf = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", hS = we(Sf, "gu").replace(/notPunctSpace/g, kf).replace(/punctSpace/g, Ti).replace(/punct/g, ss).getRegex(), mS = we(Sf, "gu").replace(/notPunctSpace/g, uS).replace(/punctSpace/g, cS).replace(/punct/g, xf).getRegex(), gS = we("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, kf).replace(/punctSpace/g, Ti).replace(/punct/g, ss).getRegex(), yS = we(/\\(punct)/, "gu").replace(/punct/g, ss).getRegex(), bS = we(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), vS = we(Ci).replace("(?:-->|$)", "-->").getRegex(), wS = we("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", vS).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Io = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, kS = we(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Io).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Tf = we(/^!?\[(label)\]\[(ref)\]/).replace("label", Io).replace("ref", xi).getRegex(), Mf = we(/^!?\[(ref)\](?:\[\])?/).replace("ref", xi).getRegex(), xS = we("reflink|nolink(?!\\()", "g").replace("reflink", Tf).replace("nolink", Mf).getRegex(), ec = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Mi = { _backpedal: Tr, anyPunctuation: yS, autolink: bS, blockSkip: dS, br: wf, code: aS, del: Tr, emStrongLDelim: fS, emStrongRDelimAst: hS, emStrongRDelimUnd: gS, escape: sS, link: kS, nolink: Mf, punctuation: lS, reflink: Tf, reflinkSearch: xS, tag: wS, text: iS, url: Tr }, CS = { ...Mi, link: we(/^!?\[(label)\]\((.*?)\)/).replace("label", Io).getRegex(), reflink: we(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Io).getRegex() }, wa = { ...Mi, emStrongRDelimAst: mS, emStrongLDelim: pS, url: we(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ec).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: we(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ec).getRegex() }, SS = { ...wa, br: we(wf).replace("{2,}", "*").getRegex(), text: we(wa.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, go = { normal: Si, gfm: rS, pedantic: oS }, mr = { normal: Mi, gfm: wa, breaks: SS, pedantic: CS }, TS = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, tc = (e) => TS[e];
function Pt(e, t) {
  if (t) {
    if (Xe.escapeTest.test(e)) return e.replace(Xe.escapeReplace, tc);
  } else if (Xe.escapeTestNoEncode.test(e)) return e.replace(Xe.escapeReplaceNoEncode, tc);
  return e;
}
function nc(e) {
  try {
    e = encodeURI(e).replace(Xe.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function rc(e, t) {
  let n = e.replace(Xe.findPipe, (s, a, i) => {
    let l = !1, u = a;
    for (; --u >= 0 && i[u] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), r = n.split(Xe.splitPipe), o = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !r.at(-1)?.trim() && r.pop(), t) if (r.length > t) r.splice(t);
  else for (; r.length < t; ) r.push("");
  for (; o < r.length; o++) r[o] = r[o].trim().replace(Xe.slashPipe, "|");
  return r;
}
function gr(e, t, n) {
  let r = e.length;
  if (r === 0) return "";
  let o = 0;
  for (; o < r && e.charAt(r - o - 1) === t; )
    o++;
  return e.slice(0, r - o);
}
function MS(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
  else if (e[r] === t[0]) n++;
  else if (e[r] === t[1] && (n--, n < 0)) return r;
  return n > 0 ? -2 : -1;
}
function oc(e, t, n, r, o) {
  let s = t.href, a = t.title || null, i = e[1].replace(o.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let l = { type: e[0].charAt(0) === "!" ? "image" : "link", raw: n, href: s, title: a, text: i, tokens: r.inlineTokens(i) };
  return r.state.inLink = !1, l;
}
function ES(e, t, n) {
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
var Oo = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || Cn;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : gr(n, `
`) };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], r = ES(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: r };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let r = gr(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: gr(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = gr(t[0], `
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
          let g = this.rules.other.nextBulletRegex(m), y = this.rules.other.hrRegex(m), v = this.rules.other.fencesBeginRegex(m), b = this.rules.other.headingBeginRegex(m), k = this.rules.other.htmlBeginRegex(m);
          for (; e; ) {
            let M = e.split(`
`, 1)[0], w;
            if (f = M, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), w = f) : w = f.replace(this.rules.other.tabCharGlobal, "    "), v.test(f) || b.test(f) || k.test(f) || g.test(f) || y.test(f)) break;
            if (w.search(this.rules.other.nonSpaceChar) >= m || !f.trim()) c += `
` + w.slice(m);
            else {
              if (h || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || v.test(d) || b.test(d) || y.test(d)) break;
              c += `
` + f;
            }
            !h && !f.trim() && (h = !0), u += M + `
`, e = e.substring(M.length + 1), d = w.slice(m);
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
    let n = rc(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), o = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let a of r) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
      for (let a = 0; a < n.length; a++) s.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: !0, align: s.align[a] });
      for (let a of o) s.rows.push(rc(a, s.header.length).map((i, l) => ({ text: i, tokens: this.lexer.inline(i), header: !1, align: s.align[l] })));
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
        let s = gr(n.slice(0, -1), "\\");
        if ((n.length - s.length) % 2 === 0) return;
      } else {
        let s = MS(t[2], "()");
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
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), oc(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
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
      return oc(n, o, n[0], this.lexer, this.rules);
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
}, ut = class ka {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || Cn, this.options.tokenizer = this.options.tokenizer || new Oo(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: Xe, block: go.normal, inline: mr.normal };
    this.options.pedantic ? (n.block = go.pedantic, n.inline = mr.pedantic) : this.options.gfm && (n.block = go.gfm, this.options.breaks ? n.inline = mr.breaks : n.inline = mr.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: go, inline: mr };
  }
  static lex(t, n) {
    return new ka(n).lex(t);
  }
  static lexInline(t, n) {
    return new ka(n).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(Xe.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], r = !1) {
    for (this.options.pedantic && (t = t.replace(Xe.tabCharGlobal, "    ").replace(Xe.spaceLine, "")); t; ) {
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
}, $o = class {
  options;
  parser;
  constructor(e) {
    this.options = e || Cn;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let r = (t || "").match(Xe.notSpaceStart)?.[0], o = e.replace(Xe.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + Pt(r) + '">' + (n ? o : Pt(o, !0)) + `</code></pre>
` : "<pre><code>" + (n ? o : Pt(o, !0)) + `</code></pre>
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
    return `<code>${Pt(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    let r = this.parser.parseInline(n), o = nc(e);
    if (o === null) return r;
    e = o;
    let s = '<a href="' + e + '"';
    return t && (s += ' title="' + Pt(t) + '"'), s += ">" + r + "</a>", s;
  }
  image({ href: e, title: t, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let o = nc(e);
    if (o === null) return Pt(n);
    e = o;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${Pt(t)}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Pt(e.text);
  }
}, Ei = class {
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
}, dt = class xa {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || Cn, this.options.renderer = this.options.renderer || new $o(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ei();
  }
  static parse(t, n) {
    return new xa(n).parse(t);
  }
  static parseInline(t, n) {
    return new xa(n).parseInline(t);
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
}, kr = class {
  options;
  block;
  constructor(e) {
    this.options = e || Cn;
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
}, NS = class {
  defaults = vi();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = dt;
  Renderer = $o;
  TextRenderer = Ei;
  Lexer = ut;
  Tokenizer = Oo;
  Hooks = kr;
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
        let o = this.defaults.renderer || new $o(this.defaults);
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
        let o = this.defaults.tokenizer || new Oo(this.defaults);
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
        let o = this.defaults.hooks || new kr();
        for (let s in n.hooks) {
          if (!(s in o)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let a = s, i = n.hooks[a], l = o[a];
          kr.passThroughHooks.has(s) ? o[a] = (u) => {
            if (this.defaults.async && kr.passThroughHooksRespectAsync.has(s)) return (async () => {
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
        let r = "<p>An error occurred:</p><pre>" + Pt(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
}, vn = new NS();
function xe(e, t) {
  return vn.parse(e, t);
}
xe.options = xe.setOptions = function(e) {
  return vn.setOptions(e), xe.defaults = vn.defaults, gf(xe.defaults), xe;
};
xe.getDefaults = vi;
xe.defaults = Cn;
xe.use = function(...e) {
  return vn.use(...e), xe.defaults = vn.defaults, gf(xe.defaults), xe;
};
xe.walkTokens = function(e, t) {
  return vn.walkTokens(e, t);
};
xe.parseInline = vn.parseInline;
xe.Parser = dt;
xe.parser = dt.parse;
xe.Renderer = $o;
xe.TextRenderer = Ei;
xe.Lexer = ut;
xe.lexer = ut.lex;
xe.Tokenizer = Oo;
xe.Hooks = kr;
xe.parse = xe;
xe.options;
xe.setOptions;
xe.use;
xe.walkTokens;
xe.parseInline;
dt.parse;
ut.lex;
function DS(e) {
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
        const v = Array.from(f.childNodes), b = [], k = [];
        if (v.forEach((M) => {
          if (M.nodeType === Node.ELEMENT_NODE) {
            const w = M;
            w.tagName === "UL" || w.tagName === "OL" || w.tagName === "P" ? k.push(M) : b.push(M);
          } else
            b.push(M);
        }), f.innerHTML = "", b.length > 0) {
          const M = n.createElement("p");
          b.forEach((w) => M.appendChild(w)), M.firstChild && M.firstChild.nodeType === Node.TEXT_NODE && (M.firstChild.textContent = (M.firstChild.textContent || "").replace(/^\s+/, "")), f.appendChild(M);
        }
        k.forEach((M) => f.appendChild(M));
      }
    }), u && !c && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
const RS = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, AT = Cp(function({
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
  onImageUploadComplete: k,
  onImageUploadError: M,
  onImageUpload: w,
  resolveImageSrc: S,
  showModeToggle: N = !0,
  // New props
  initialMode: x = "wysiwyg",
  onModeChange: T,
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
  maxHeight: U,
  spellCheck: ee = !0,
  headingLevels: ge = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: be = [1, 2, 3],
  // TOC props
  showTableOfContents: Ae = !1,
  tocVisible: Be = !0,
  onTocVisibilityChange: ot,
  tocTitle: Wt = "",
  tocMinLevel: ir = 1,
  tocMaxLevel: lr = 4,
  tocShowLevelIndicators: Yr = !1,
  tocHighlightActive: jr = !0,
  tocTreeView: Vr = !1,
  tocWidth: Kr = "240px",
  tocPosition: Sn = "right",
  tocScrollOffset: cr = 20,
  onTocItemClick: Tn,
  renderTocItem: Mn,
  tocShowToggleButton: qr = !0,
  // Raw markdown editor
  autoClosePairs: as = !0,
  // Performance profiler
  showPerformanceProfiler: is = !1,
  onPerformanceProfilerClose: ls,
  // Auto reorder checklist
  autoReorderChecklist: cs = !1,
  // Expand selection
  progressiveSelectAll: Gr = !1,
  // Error boundary
  onEditorError: us,
  // AI writing assistant
  aiActions: Tt,
  onAIAction: En,
  onAISetupRequired: Nn
}, ds) {
  const [st] = V(() => RS()), [Ft, pe] = V(x), [Ee, ce] = V(""), he = q(x), Le = q(""), ye = q(null), [fs, Xr] = V(0), Dn = !!(Tt && Tt.length > 0 && En), { state: We, executeAction: Ut, abort: Df, reset: Yt } = aC(En), [ps, hs] = V(null), [Rf, Af] = V({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), Lf = q(En);
  Lf.current = En;
  const Ni = q(Nn);
  Ni.current = Nn;
  const [Pf, If] = V([]), [Of, $f] = V(0), _f = j((z, Y) => {
    If(z), $f(Y);
  }, []), ms = q(b), gs = q(k), ys = q(M), bs = q(w), vs = q(S), Di = q(G), ws = q(P), ks = q(L);
  ms.current = b, gs.current = k, ys.current = M, bs.current = w, vs.current = S, Di.current = G, ws.current = P, ks.current = L;
  const Hf = yn(() => {
    const z = [
      Jf.configure({
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
      $h,
      _h,
      Bh,
      ep.configure({
        placeholder: s,
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
      mp,
      gp,
      yp,
      bp,
      g1,
      v1,
      U1,
      x1
    ];
    return _.tables || z.push(
      op.configure({
        resizable: !st,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      sp,
      Eh,
      Nh,
      Oh
    ), _.taskLists || z.push(
      Hh.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      zh.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), st || z.push(
      Fh.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), _.codeBlocks || z.push(Yh), _.callouts || z.push(Xh, b1), _.collapsibleHeadings || z.push(
      p1.configure({
        levels: be
      })
    ), _.images || z.push(
      Zh.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (Y) => {
          Qr({
            isOpen: !0,
            src: Y.src,
            alt: Y.alt,
            pos: Y.pos,
            position: { x: Y.rect.left + Y.rect.width / 2, y: Y.rect.bottom }
          });
        },
        resolveImageSrc: vs.current ? ((...Y) => vs.current(...Y)) : void 0
      }),
      Z1.configure({
        maxFileSize: v,
        onUploadStart: ms.current ? ((...Y) => ms.current(...Y)) : void 0,
        onUploadComplete: gs.current ? ((...Y) => gs.current(...Y)) : void 0,
        onUploadError: ys.current ? ((...Y) => ys.current(...Y)) : void 0,
        onImageUpload: bs.current ? ((Y, oe) => bs.current(Y, oe)) : void 0
      })
    ), _.datePills || z.push(
      Xb.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), _.tagPills || z.push(
      Jb.configure({
        HTMLAttributes: {
          class: "tag-pill"
        }
      })
    ), _.wikiLinks || z.push(
      r1.configure({
        onWikiLinkClick: (Y) => {
          console.log("WikiLink clicked:", Y), Di.current?.(Y);
        },
        validateLink: (Y) => ws.current ? ws.current(Y) : !0
      })
    ), Gr && z.push(_1), z.push(W1), _.markdownPaste || z.push(
      f1.configure({
        enableMarkdownPaste: !0
      })
    ), z;
  }, [s, st, v, ge, be, _, Gr]), Mt = q(null), on = q(n), sn = q(r), xs = q(o), ur = q(null);
  on.current = n, sn.current = r, xs.current = o;
  const $ = Zf({
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
    extensions: Hf,
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
          const ae = oe.target.closest("a");
          if (ae) {
            const ve = ae.getAttribute("href");
            if (ve && F(ve, oe) === !1)
              return oe.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: z }) => {
      Mt.current && clearTimeout(Mt.current), Mt.current = setTimeout(() => {
        if (z.isDestroyed) return;
        const Y = z.getHTML();
        (on.current || sn.current) && (on.current?.(Y), sn.current?.(Y));
      }, 150);
    },
    onFocus: () => {
      D?.();
    },
    onBlur: () => {
      if (Mt.current && (clearTimeout(Mt.current), Mt.current = null, $ && !$.isDestroyed)) {
        const z = $.getHTML();
        if ((on.current || sn.current) && (on.current?.(z), sn.current?.(z)), he.current === "wysiwyg" && ur.current) {
          const Y = ur.current.turndown(z);
          Le.current = Y, xs.current?.(Y);
        }
      }
      R?.();
    },
    onSelectionUpdate: ({ editor: z }) => {
      if (I) {
        const { from: Y, to: oe, empty: Ce } = z.state.selection;
        I({ from: Y, to: oe, empty: Ce });
      }
    }
  });
  J(() => () => {
    if (Mt.current && (clearTimeout(Mt.current), Mt.current = null, $ && !$.isDestroyed)) {
      const z = $.getHTML();
      if ((on.current || sn.current) && (on.current?.(z), sn.current?.(z)), he.current === "wysiwyg" && ur.current) {
        const Y = ur.current.turndown(z);
        Le.current = Y, xs.current?.(Y);
      }
    }
  }, []);
  const [Ri, Zr] = V(!1), [Rn, Qr] = V(null), [zf, Bf] = V(!1), Wf = X !== void 0 ? X : zf, jt = j((z) => {
    Bf(z), K?.(z);
  }, [K]), [Ff, Cs] = V(0), [Uf, Yf] = V(""), Et = Z0($, {
    storageKey: h,
    debounceMs: m,
    enabled: f,
    onSave: (z) => {
      H?.(z);
    },
    onRecover: (z) => {
      W?.(z);
    }
  }), Vt = jC();
  ur.current = Vt;
  const Ai = q(!1);
  J(() => {
    if (!Ai.current && x === "markdown" && $ && !$.isDestroyed && Vt) {
      const z = $.getHTML(), Y = Vt.turndown(z);
      ce(Y), Le.current = Y, Ai.current = !0;
    }
  }, [$, Vt, x]);
  const gt = j((z) => {
    if ($) {
      if (z === "markdown" && he.current === "wysiwyg") {
        const Y = $.getHTML(), oe = Vt.turndown(Y);
        ce(oe), Le.current = oe;
      } else if (z === "wysiwyg" && he.current === "markdown") {
        const Y = ["info", "note", "prompt", "resources", "todo"];
        let oe = Le.current;
        Y.forEach((le) => {
          const ie = new RegExp(`\`\`\`ad-${le}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          oe = oe.replace(ie, (Te, ue) => {
            const Ne = xe.parse(ue.trim(), { async: !1 });
            return `<div data-callout="" data-type="${le}" class="callout callout-${le}">${Ne}</div>`;
          });
        }), Y.forEach((le) => {
          const ie = new RegExp(`\`\`\`${le}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          oe = oe.replace(ie, (Te, ue) => {
            const Ne = xe.parse(ue.trim(), { async: !1 });
            return `<div data-callout="" data-type="${le}" class="callout callout-${le}">${Ne}</div>`;
          });
        }), oe = oe.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (le, ie, Te) => {
          const ue = ie.split("|").map((Nt) => Nt.trim());
          let Ne = "", Ye = "left", $e = null;
          ue.length === 1 ? Ne = ue[0] : ue.length === 2 ? (Ne = ue[0], /^\d+$/.test(ue[1]) ? $e = ue[1] : ["left", "center", "right"].includes(ue[1]) ? Ye = ue[1] : Ne = ie) : ue.length === 3 ? (Ne = ue[0], ["left", "center", "right"].includes(ue[1]) && (Ye = ue[1]), /^\d+$/.test(ue[2]) && ($e = ue[2])) : Ne = ie;
          const De = $e ? ` width="${$e}" style="width: ${$e}px"` : "", Kt = ` data-align="${Ye}"`;
          return `<img src="${Te.trim()}" alt="${Ne}"${Kt}${De} />`;
        }), oe = oe.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), oe = oe.replace(/@([^@\n]+)@/g, (le, ie) => {
          const Te = pn(ie);
          if (Te) {
            const ue = qa(Te);
            return `<span data-type="date-pill" data-date="${Te}" class="date-pill ${ue}"><span class="date-icon">📅</span><span class="date-text">${ie.trim()}</span></span>`;
          }
          return le;
        }), oe = oe.replace(new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"), (le, ie) => {
          const Te = bo(ie);
          return vr(Te) ? `<span data-type="tag-pill" data-tag="${Te}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${Te}</span></span>` : le;
        }), oe = oe.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((le, ie) => ie % 2 === 1 ? le : le.replace(/\[\[([^\[\]]+)\]\]/g, (Te, ue) => `<span data-wiki-link data-page-name="${ue.trim()}" class="wiki-link">${ue.trim()}</span>`)).join("");
        let ae = xe.parse(oe, { async: !1 });
        ae = DS(ae), ae = ae.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (le, ie) => ie.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (Te) => Te.replace(/<tr>([\s\S]*?)<\/tr>/gi, (ue, Ne) => `<tr>${Ne.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
        const ve = (le) => {
          let ie = le;
          return ie = ie.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), ie = ie.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), ie = ie.replace(/~~(.+?)~~/g, "<s>$1</s>"), ie = ie.replace(/`([^`]+)`/g, "<code>$1</code>"), ie = ie.replace(/==(.+?)==/g, "<mark>$1</mark>"), ie = ie.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), ie;
        }, at = (le) => {
          const ie = le.match(/data-align="([^"]*)"/), Te = ie ? ie[1] : "left";
          return `<figure class="image-resizer" style="${{
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          }[Te] || "margin-right: auto;"}">${le.trim()}</figure>`;
        }, ln = (le) => {
          if (/<img\s/i.test(le)) {
            const ie = /(<img\s[^>]*\/?>)/gi;
            return le.split(ie).filter((ue) => ue.trim()).map((ue) => /^<img\s/i.test(ue) ? at(ue) : ue.trim() ? `<p>${ve(ue.trim())}</p>` : "").join("");
          }
          if (/^!\[/.test(le)) {
            const ie = le.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (ie)
              return `<figure class="image-resizer" style="margin-right: auto;"><img src="${ie[2]}" alt="${ie[1]}" data-align="left" /></figure>`;
          }
          return `<p>${ve(le)}</p>`;
        }, cn = (le) => {
          const ie = le.match(/^( *)/), Te = ie ? ie[1].length : 0, ue = Math.floor(Te / 2), Ne = le.trimStart(), Ye = Ne.match(/^-\s*\[(x| )\]\s*(.*)$/);
          if (Ye)
            return { type: "task", depth: ue, text: Ye[2].trim(), checked: Ye[1] === "x" };
          const $e = Ne.match(/^-\s+(.+)$/);
          if ($e)
            return { type: "ul", depth: ue, text: $e[1].trim() };
          const De = Ne.match(/^(\d+)\.\s+(.+)$/);
          return De ? { type: "ol", depth: ue, text: De[2].trim(), index: parseInt(De[1], 10) } : null;
        }, An = (le) => {
          if (le.length === 0) return "";
          const ie = (Ne, Ye) => {
            let $e = "", De = Ne;
            const Kt = le[De]?.type || "ul", Nt = Kt === "task", qt = Nt ? '<ul data-type="taskList">' : `<${Kt === "ol" ? "ol" : "ul"}>`, dr = Nt ? "</ul>" : `</${Kt === "ol" ? "ol" : "ul"}>`;
            for ($e += qt; De < le.length && le[De].depth >= Ye; ) {
              const Dt = le[De];
              if (Dt.depth === Ye) {
                if (Nt ? $e += `<li data-type="taskItem" data-checked="${Dt.checked || !1}"><p>${ve(Dt.text)}</p>` : $e += `<li><p>${ve(Dt.text)}</p>`, De + 1 < le.length && le[De + 1].depth > Ye) {
                  const un = ie(De + 1, le[De + 1].depth);
                  $e += un.html, De = un.nextIdx;
                } else
                  De++;
                $e += "</li>";
              } else
                De++;
            }
            return $e += dr, { html: $e, nextIdx: De };
          }, Te = Math.min(...le.map((Ne) => Ne.depth));
          return ie(0, Te).html;
        };
        ae = ae.replace(
          /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
          (le, ie, Te, ue) => {
            const Ne = /<img\s/i.test(Te), Ye = /<br\s*\/?>/i.test(Te), $e = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(Te);
            if (!Ne && !Ye && !$e) return le;
            let De = Te.trim();
            De = De.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
            const Kt = De.split(/<br\s*\/?>/i).filter((Dt) => Dt.trim());
            if (Kt.length <= 1 && !$e)
              return Ne ? `${ie}${ln(De)}${ue}` : le;
            const Nt = [];
            let qt = [];
            const dr = () => {
              qt.length !== 0 && (Nt.push(An(qt)), qt = []);
            };
            for (const Dt of Kt) {
              const un = cn(Dt);
              if (un) {
                if (qt.length > 0) {
                  const Xf = qt[0].type;
                  un.depth === 0 && un.type !== Xf && dr();
                }
                qt.push(un);
              } else
                dr(), Nt.push(ln(Dt.trim()));
            }
            return dr(), `${ie}${Nt.join("")}${ue}`;
          }
        ), queueMicrotask(() => {
          $.isDestroyed || $.commands.setContent(ae);
        });
      }
      pe(z), he.current = z, T?.(z);
    }
  }, [$, Vt, T]), Li = j((z) => {
    ce(z), Le.current = z, o?.(z);
  }, [o]), an = J0($, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: c
  });
  Sp(ds, () => ({
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
    getMode: () => he.current,
    setMode: (z) => gt(z),
    toggleMode: () => {
      const z = he.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return gt(z), z;
    },
    getWordCount: () => ({
      words: an.words,
      characters: an.characters,
      charactersWithSpaces: an.charactersWithSpaces
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
    insertHorizontalRule: () => $?.commands.setHorizontalRule(),
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
      jt(!0), Cs((z) => z + 1);
    },
    closeFindReplace: () => jt(!1),
    save: () => Et.save(),
    clearSavedContent: () => Et.clear(),
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
          const Ce = Y.attrs.level, ae = Y.textContent.trim();
          ae && z.push({ id: `toc-heading-${oe}`, text: ae, level: Ce, pos: oe });
        }
      }), z;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (z) => {
      if (!(!$ || $.isDestroyed))
        try {
          const Y = $.state.doc.resolve(z), oe = $.view.nodeDOM(Y.before(Y.depth + 1));
          if (oe instanceof HTMLElement) {
            const Ce = $.view.dom.closest(".editor-content-wrapper");
            if (Ce) {
              const ae = Ce.getBoundingClientRect(), at = oe.getBoundingClientRect().top - ae.top + Ce.scrollTop;
              Ce.scrollTo({ top: at - 20, behavior: "smooth" });
            } else
              oe.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          $.commands.setTextSelection(z + 1);
        } catch {
        }
    }
  }), [$, Vt, gt, an, Et, jt]), J(() => {
    const z = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => he.current,
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
        const Y = he.current === "wysiwyg" ? "markdown" : "wysiwyg";
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
      isVisualMode: () => he.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => he.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => he.current === "markdown" ? Le.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (Y) => {
        const oe = (Ce) => {
          Y(Ce.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", oe), () => window.removeEventListener("paragon-editor-mode-change", oe);
      }
    };
    return window.__paragonEditorModeAPI = z, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [gt]), J(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: Ft } }));
  }, [Ft]), J(() => {
    if (!$ || $.isDestroyed) return;
    const z = (Y) => {
      if (!$.isDestroyed) {
        if ((Y.metaKey || Y.ctrlKey) && Y.key === "k") {
          Y.preventDefault(), Zr(!0);
          return;
        }
        if (!st && (Y.metaKey || Y.ctrlKey) && Y.key === "f") {
          if (Y.preventDefault(), $) {
            const { state: oe } = $, { from: Ce, to: ae } = oe.selection;
            if (Ce !== ae) {
              const ve = oe.doc.textBetween(Ce, ae, " ");
              ve.trim() && Yf(ve.trim());
            }
          }
          jt(!0), Cs((oe) => oe + 1);
          return;
        }
        if (!st && (Y.metaKey || Y.ctrlKey) && Y.key === "h") {
          Y.preventDefault(), jt(!0);
          return;
        }
        if (Y.key === " ")
          try {
            const { state: oe } = $, { selection: Ce } = oe, { $from: ae } = Ce, ve = ae.nodeBefore?.textContent || "";
            if (ve === "#####") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 5, to: ae.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (ve === "####") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 4, to: ae.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (ve === "###") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 3, to: ae.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (ve === "##") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 2, to: ae.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (ve === "#") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 1, to: ae.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (ve === "-" || ve === "*") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 1, to: ae.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(ve)) {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - ve.length, to: ae.pos }).toggleOrderedList().run();
              return;
            }
            const at = /^(-\s*)?\[([ x])?\]$/.exec(ve);
            if (at) {
              Y.preventDefault();
              const ln = at[2] === "x", cn = oe.schema.nodes.taskList, An = oe.schema.nodes.taskItem;
              if (cn && An) {
                const le = oe.tr, ie = ae.pos - ve.length, Te = ae.pos;
                le.delete(ie, Te);
                const Ne = le.doc.resolve(ie).blockRange();
                if (Ne) {
                  const Ye = [
                    { type: cn, attrs: {} },
                    { type: An, attrs: { checked: ln } }
                  ];
                  le.wrap(Ne, Ye), $.view.dispatch(le);
                  return;
                }
              }
              $.chain().focus().deleteRange({ from: ae.pos - ve.length, to: ae.pos }).toggleTaskList().run();
              return;
            }
            if (ve === ">") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 1, to: ae.pos }).toggleBlockquote().run();
              return;
            }
            if (ve === "```") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 3, to: ae.pos }).toggleCodeBlock().run();
              return;
            }
            if (ve === "---" || ve === "***") {
              Y.preventDefault(), $.chain().focus().deleteRange({ from: ae.pos - 3, to: ae.pos }).setHorizontalRule().run();
              return;
            }
          } catch (oe) {
            console.warn("Space shortcut error:", oe);
          }
      }
    };
    return document.addEventListener("keydown", z, !0), () => document.removeEventListener("keydown", z, !0);
  }, [$, st, jt]);
  const Pi = j((z, Y) => {
    if (!Dn) {
      Ni.current?.();
      return;
    }
    if (!$) return;
    let oe = { top: 0, left: 0 };
    if (Y) {
      const Ce = Y.getBoundingClientRect();
      oe = { top: Ce.bottom + 4, left: Ce.left };
    } else {
      const { from: Ce, to: ae } = $.state.selection, ve = $.view.coordsAtPos(Ce), at = $.view.coordsAtPos(ae);
      oe = { top: at.bottom + 8, left: (ve.left + at.left) / 2 };
    }
    hs({ scope: z, position: oe });
  }, [Dn, $]), jf = j((z, Y) => {
    if (!$ || !Tt) return;
    const oe = Tt.find((An) => An.id === z);
    if (!oe) return;
    const { from: Ce, to: ae } = $.state.selection, ve = Ce !== ae ? $.state.doc.textBetween(Ce, ae, `
`) : "", at = oe.scope === "document" || !ve ? $.getText() : ve, ln = $.view.coordsAtPos(Ce), cn = $.view.coordsAtPos(ae);
    Af({
      selectionTop: ln.top,
      selectionBottom: cn.bottom,
      selectionCenterX: (ln.left + cn.right) / 2
    }), hs(null), Ut(z, oe.label, at, { from: Ce, to: ae }, Y);
  }, [$, Tt, Ut]), Vf = j(() => {
    if (!$ || We.status !== "complete") return;
    const { selectionRange: z, result: Y } = We;
    $.chain().focus().setTextSelection(z).deleteSelection().insertContent(Y).run(), Yt();
  }, [$, We, Yt]), Kf = j(() => {
    if (!$ || We.status !== "complete") return;
    const { selectionRange: z, result: Y } = We;
    $.chain().focus().setTextSelection(z.to).insertContent(`
` + Y).run(), Yt();
  }, [$, We, Yt]), qf = j(() => {
    if (!(We.status !== "complete" && We.status !== "error"))
      if (We.status === "complete") {
        const { action: z, actionLabel: Y, inputText: oe, selectionRange: Ce } = We;
        Yt(), Ut(z, Y, oe, Ce);
      } else
        Yt();
  }, [We, Yt, Ut]);
  if (!$)
    return /* @__PURE__ */ p("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: /* @__PURE__ */ A("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ p("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ p("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const Ii = /* @__PURE__ */ p(
    j0,
    {
      editor: $,
      onOpenLinkPopover: () => Zr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        jt(!0), Cs((z) => z + 1);
      },
      disabledFeatures: _,
      autoReorderChecklist: cs,
      aiEnabled: Dn || !!Nn,
      onAISparklesClick: (z) => Pi("document", z)
    }
  ), Oi = /* @__PURE__ */ A("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ p(
      e1,
      {
        status: Et.status,
        lastSaved: Et.lastSaved
      }
    ),
    /* @__PURE__ */ p("div", { className: "word-count", children: /* @__PURE__ */ A("span", { children: [
      an.words,
      " words"
    ] }) })
  ] }), Gf = {
    minHeight: B,
    ...U && { maxHeight: U, overflowY: "auto" }
  };
  return /* @__PURE__ */ A("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: [
    f && g && Et.hasRecoverableContent && /* @__PURE__ */ p(
      t1,
      {
        onRecover: () => {
          Et.recover();
        },
        onDismiss: Et.dismissRecovery
      }
    ),
    u && /* @__PURE__ */ A("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z($, Ii) : Ii,
      N && /* @__PURE__ */ A("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ p(
          "button",
          {
            onClick: () => gt("wysiwyg"),
            className: `editor-mode-toggle-btn ${Ft === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ p(ch, {})
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            onClick: () => gt("markdown"),
            className: `editor-mode-toggle-btn ${Ft === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ p(_a, {})
          }
        )
      ] })
    ] }),
    !st && /* @__PURE__ */ p(
      V0,
      {
        editor: $,
        isOpen: Wf,
        onClose: () => jt(!1),
        focusTrigger: Ff,
        initialSearchQuery: Uf,
        editorMode: Ft,
        rawMarkdown: Ee,
        onRawMarkdownChange: Li,
        onMatchesChange: _f
      }
    ),
    /* @__PURE__ */ p(G0, { editor: $ }),
    /* @__PURE__ */ A("div", { className: `editor-main-area ${Ae ? "editor-with-toc" : ""}`, children: [
      Ae && Sn === "left" && /* @__PURE__ */ p(
        Gl,
        {
          editor: $,
          visible: Be,
          onVisibilityChange: ot,
          title: Wt,
          minLevel: ir,
          maxLevel: lr,
          showLevelIndicators: Yr,
          highlightActive: jr,
          treeView: Vr,
          width: Kr,
          position: Sn,
          scrollOffset: cr,
          onItemClick: Tn,
          renderItem: Mn,
          showToggleButton: qr,
          scrollContainerRef: ye
        }
      ),
      /* @__PURE__ */ A(
        rC,
        {
          resetKey: `${t}-${fs}`,
          onRetry: () => Xr((z) => z + 1),
          onClearContent: () => {
            $ && $.commands.clearContent(), n?.(""), r?.(""), o?.(""), Xr((z) => z + 1);
          },
          onError: us,
          children: [
            /* @__PURE__ */ p("div", { className: "editor-content-wrapper", ref: ye, style: Gf, children: Ft === "wysiwyg" ? /* @__PURE__ */ A(ze, { children: [
              /* @__PURE__ */ p(Qf, { editor: $, className: "editor-content" }),
              !_.images && !_.dragAndDrop && /* @__PURE__ */ p(Q1, { containerRef: ye, enabled: a }),
              !st && y && /* @__PURE__ */ p(qh, { editor: $, suppressWhenLinkPopoverOpen: Ri, aiEnabled: Dn || !!Nn, onAISparklesClick: (z) => Pi("selection", z) }),
              ps && Tt && /* @__PURE__ */ p(
                lC,
                {
                  actions: Tt,
                  scope: ps.scope,
                  position: ps.position,
                  onAction: jf,
                  onClose: () => hs(null)
                }
              ),
              We.status !== "idle" && /* @__PURE__ */ p(
                cC,
                {
                  state: We,
                  position: Rf,
                  onReplace: Vf,
                  onInsert: Kf,
                  onRetry: qf,
                  onDiscard: () => {
                    Df(), Yt();
                  }
                }
              ),
              !_.slashCommands && /* @__PURE__ */ p(sv, { editor: $, disabledFeatures: _ }),
              !_.wikiLinks && ks.current && /* @__PURE__ */ p(
                uv,
                {
                  editor: $,
                  onSearch: ks.current
                }
              ),
              /* @__PURE__ */ p(
                jh,
                {
                  editor: $,
                  isOpen: Ri,
                  onClose: () => Zr(!1)
                }
              ),
              !st && /* @__PURE__ */ p(
                Vh,
                {
                  editor: $,
                  onEditLink: () => Zr(!0)
                }
              ),
              !_.images && Rn?.isOpen && /* @__PURE__ */ p(
                J1,
                {
                  src: Rn.src,
                  alt: Rn.alt,
                  position: Rn.position,
                  onSave: (z, Y) => {
                    $.chain().focus().setNodeSelection(Rn.pos).updateAttributes("resizableImage", {
                      src: z,
                      alt: Y
                    }).run(), Qr(null);
                  },
                  onDelete: () => {
                    $.chain().focus().setNodeSelection(Rn.pos).deleteSelection().run(), Qr(null);
                  },
                  onClose: () => Qr(null)
                }
              )
            ] }) : /* @__PURE__ */ p(
              eC,
              {
                content: Ee,
                onChange: Li,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: Pf,
                currentMatchIndex: Of,
                autoClosePairs: as
              }
            ) }),
            /* @__PURE__ */ p(oC, { scrollContainerRef: ye })
          ]
        }
      ),
      Ae && Sn === "right" && /* @__PURE__ */ p(
        Gl,
        {
          editor: $,
          visible: Be,
          onVisibilityChange: ot,
          title: Wt,
          minLevel: ir,
          maxLevel: lr,
          showLevelIndicators: Yr,
          highlightActive: jr,
          treeView: Vr,
          width: Kr,
          position: Sn,
          scrollOffset: cr,
          onItemClick: Tn,
          renderItem: Mn,
          showToggleButton: qr,
          scrollContainerRef: ye
        }
      )
    ] }),
    c && (te ? te(
      { words: an.words, characters: an.characters },
      Et.status,
      Oi
    ) : Oi),
    /* @__PURE__ */ p(nC, { visible: is, onClose: ls, editor: $ })
  ] });
}), LT = zo.create({
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
      Zn(this.options.HTMLAttributes, t, {
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
}), Ef = {
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
}, AS = {
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
}, LS = {
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
}, PS = {
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
}, xr = {
  dark: Ef,
  light: AS,
  sepia: LS,
  nord: PS
};
function IS(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function PT(e, t, n, r) {
  const o = xr[e] || Ef;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const Nf = lc(null);
function IT({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = V(t), s = xr[r] || xr.dark, a = j((l) => {
    xr[l] && o(l);
  }, []);
  J(() => {
    n?.current && IS(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: r,
    setTheme: a,
    availableThemes: Object.keys(xr)
  };
  return /* @__PURE__ */ p(Nf.Provider, { value: i, children: e });
}
function OT() {
  const e = cc(Nf);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const sc = [
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
function $T({ node: e, updateAttributes: t }) {
  const [n, r] = V(!1), o = e.attrs.language || "plaintext";
  sc.find((a) => a.value === o)?.label;
  const s = j(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ A(Ir, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ p(
          "select",
          {
            value: o,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: sc.map(({ value: a, label: i }) => /* @__PURE__ */ p("option", { value: a, children: i }, a))
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
          children: n ? /* @__PURE__ */ p(Jn, { size: 14 }) : /* @__PURE__ */ p(er, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ p("pre", { className: "code-block-pre", children: /* @__PURE__ */ p("code", { children: /* @__PURE__ */ p(Ca, {}) }) })
  ] });
}
export {
  e1 as AutoSaveIndicator,
  LT as Callout,
  b1 as CalloutInputRule,
  $T as CodeBlockComponent,
  p1 as CollapsibleHeading,
  Fh as CollapsibleList,
  Xb as DatePill,
  IT as EditorThemeProvider,
  j0 as EditorToolbar,
  V0 as FindReplace,
  qh as FloatingToolbar,
  Q1 as ImageDropZone,
  Z1 as ImageUpload,
  AT as MarkdownEditor,
  g1 as MarkdownLinkInputRule,
  f1 as MarkdownPasteSafe,
  $h as MixedBulletList,
  Bh as MixedListItem,
  _h as MixedOrderedList,
  zh as MixedTaskItem,
  Hh as MixedTaskList,
  t1 as RecoveryBanner,
  Zh as ResizableImage,
  v1 as SearchHighlight,
  G0 as SelectAllActionBar,
  U1 as SelectAllOccurrences,
  sv as SlashCommands,
  x1 as TabIndent,
  Gl as TableOfContents,
  Jb as TagPill,
  r1 as WikiLinkSafe,
  IS as applyTheme,
  PT as createCustomTheme,
  Ef as darkTheme,
  qa as getDateVariant,
  vr as isValidTag,
  AS as lightTheme,
  ke as lowlight,
  PS as nordTheme,
  bo as normalizeTag,
  pn as parseDateFromMarkdown,
  LS as sepiaTheme,
  xr as themes,
  Z0 as useAutoSave,
  OT as useEditorTheme,
  J0 as useWordCount
};
//# sourceMappingURL=paragon.js.map
