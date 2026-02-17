import { jsxs as A, jsx as f, Fragment as Ie } from "react/jsx-runtime";
import { ReactNodeViewRenderer as To, NodeViewWrapper as xr, NodeViewContent as da, useEditorState as ql, useEditor as Hf, EditorContent as zf } from "@tiptap/react";
import Bf from "@tiptap/starter-kit";
import Wf from "@tiptap/extension-placeholder";
import Ff from "@tiptap/extension-text-align";
import Uf from "@tiptap/extension-highlight";
import Yf from "@tiptap/extension-link";
import { Table as jf } from "@tiptap/extension-table";
import Vf from "@tiptap/extension-table-row";
import Kf from "@tiptap/extension-table-cell";
import qf from "@tiptap/extension-table-header";
import { Plugin as je, PluginKey as Ve, TextSelection as fa, AllSelection as Gf } from "@tiptap/pm/state";
import { DecorationSet as Xe, Decoration as it } from "@tiptap/pm/view";
import { Extension as ut, Node as Mo, mergeAttributes as Bn, InputRule as qe, Mark as Zf } from "@tiptap/core";
import Xf from "@tiptap/extension-bullet-list";
import Qf from "@tiptap/extension-ordered-list";
import Jf from "@tiptap/extension-list-item";
import ep from "@tiptap/extension-task-list";
import tp from "@tiptap/extension-task-item";
import { findWrapping as Mi, canJoin as np } from "@tiptap/pm/transform";
import rp from "@tiptap/extension-underline";
import op from "@tiptap/extension-subscript";
import sp from "@tiptap/extension-superscript";
import ap from "@tiptap/extension-typography";
import ip from "@tiptap/extension-code-block-lowlight";
import { createLowlight as lp } from "lowlight";
import * as C from "react";
import X, { useState as V, useRef as K, useEffect as J, useCallback as Y, memo as Wn, createContext as Gl, useContext as Zl, useLayoutEffect as Eo, useMemo as an, Component as cp, useReducer as up, forwardRef as dp, useImperativeHandle as fp } from "react";
import { ChevronDown as Kt, Check as Fn, Copy as Un, Link2 as pa, ExternalLink as pp, Pencil as hp, Unlink as mp, Bold as ha, Italic as ma, Underline as ga, Strikethrough as ya, Code as Xl, Highlighter as Ql, Link as ba, Quote as va, List as wa, ListOrdered as ka, CheckSquare as xa, FileCode as gp, Sparkles as Do, ListTodo as Ca, BookOpen as Sa, MessageSquareText as Jl, StickyNote as ec, Info as uo, ChevronRight as tc, ChevronLeftIcon as yp, ChevronRightIcon as bp, ChevronDownIcon as vp, Calendar as nc, Hash as wp, Image as Ta, X as Nt, Type as No, Heading1 as kp, Heading2 as xp, Heading3 as Cp, Heading4 as Sp, Heading5 as Tp, Code2 as rc, Table as zs, Minus as oc, FileText as Ma, Plus as Ea, Undo as Mp, Redo as Ep, IndentIncrease as Dp, IndentDecrease as Np, PenLine as Rp, Library as Ap, Columns as Ei, Trash2 as Dn, Rows as Di, ToggleLeft as Ni, ArrowUpDown as Pp, Search as Lp, ChevronUp as Ip, MousePointerClick as Op, CaseSensitive as _p, WholeWord as $p, Regex as Hp, Replace as Bs, ReplaceAll as zp, Cloud as Bp, Loader2 as sc, CloudOff as Wp, AlertCircle as Fp, RotateCcw as Da, ImagePlus as Up, Activity as Yp, Maximize2 as ac, Minimize2 as ic, AlertTriangle as jp, CheckCircle2 as Vp, MessageSquare as lc, RefreshCw as Kp, SpellCheck as qp, PanelRightClose as Gp, PanelRightOpen as Zp, Eye as Xp } from "lucide-react";
import Na from "highlight.js/lib/languages/javascript";
import Ra from "highlight.js/lib/languages/typescript";
import cc from "highlight.js/lib/languages/python";
import Aa from "highlight.js/lib/languages/xml";
import Qp from "highlight.js/lib/languages/css";
import Jp from "highlight.js/lib/languages/json";
import Ro from "highlight.js/lib/languages/bash";
import eh from "highlight.js/lib/languages/sql";
import th from "highlight.js/lib/languages/java";
import uc from "highlight.js/lib/languages/cpp";
import dc from "highlight.js/lib/languages/go";
import fc from "highlight.js/lib/languages/rust";
import pc from "highlight.js/lib/languages/markdown";
import hc from "highlight.js/lib/languages/yaml";
import mc from "highlight.js/lib/languages/diff";
import * as gc from "react-dom";
import nh, { createPortal as rh } from "react-dom";
import oh from "@tiptap/extension-image";
import { createRoot as sh } from "react-dom/client";
import { Fragment as ah } from "@tiptap/pm/model";
import { liftListItem as Ri, sinkListItem as Ai } from "@tiptap/pm/schema-list";
import { undo as ih, redo as lh } from "@tiptap/pm/history";
const ch = new Ve("tableCellMenu");
let Pi = !1, Fr = null;
function uh() {
  Pi || (Pi = !0, document.addEventListener("mouseover", (e) => {
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
function dh(e) {
  return uh(), new je({
    key: ch,
    state: {
      init() {
        return Xe.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && Fr ? Fr.map(t.mapping, t.doc) : (Fr = fh(o.doc, e), Fr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function fh(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = it.widget(o + 1, (a) => {
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
          const y = l.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), ph(m, t, o, y);
        }), i.appendChild(l), i;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), Xe.create(e, n);
}
function ph(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const a = 170, i = 280;
  let l = Math.max(0, Math.min(r.top, window.innerHeight)), u = Math.max(0, Math.min(r.bottom, window.innerHeight)), c = Math.max(0, Math.min(r.left, window.innerWidth)), d = u + 4, p = c - a + r.width + 8;
  p + a > window.innerWidth - 12 && (p = window.innerWidth - a - 12), p < 12 && (p = 12), d + i > window.innerHeight - 12 && (d = l - i - 4), d < 12 && (d = 12), d + i > window.innerHeight - 12 && (d = window.innerHeight - i - 12);
  const h = document.documentElement.classList.contains("dark"), m = h ? "#1f1f1f" : "#ffffff", y = h ? "#3a3a3a" : "#e5e5e5", g = h ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + d + "px;left:" + p + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + m + ";border:1px solid " + y + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + g + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const b = t.state.doc.resolve(n);
  let v = !1;
  for (let N = b.depth; N >= 0; N--)
    if (b.node(N).type.name === "table") {
      b.node(N).firstChild?.firstChild?.type.name === "tableHeader" && (v = !0);
      break;
    }
  const k = [
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
    { label: "Copy Table", icon: "copy", action: () => hh(t) }
  ], M = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, w = h ? "#2a2a2a" : "#f5f5f5", S = h ? "#ff6b6b" : "#dc2626", D = h ? "#999999" : "#666666", x = h ? "#333333" : "#e5e5e5";
  k.forEach((N) => {
    if (N.label === "divider") {
      const R = document.createElement("div");
      R.style.cssText = "height:1px;background:" + x + ";margin:4px 0;", s.appendChild(R);
    } else {
      const R = document.createElement("button");
      R.type = "button";
      const I = N.destructive ? S : g;
      R.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + I + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const O = M[N.icon || ""] || "", H = N.destructive ? S : D;
      R.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + H + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + N.label + "</span>", R.addEventListener("mouseenter", () => {
        R.style.background = N.destructive ? h ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : w;
      }), R.addEventListener("mouseleave", () => {
        R.style.background = "transparent";
      }), R.addEventListener("click", (W) => {
        W.preventDefault(), W.stopPropagation(), N.action && N.action(), s.remove();
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
function hh(e) {
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
const mh = Kf.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      dh(this.editor)
    ];
  }
}), gh = qf.extend({}), dr = new Ve("tableSorting");
let rn = null, sr = null;
function yh(e) {
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
function bh(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function vh(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (m, y) => {
    if (m.type.name === "table" && y === t)
      return s = m, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = rn?.tablePos === t && rn?.columnIndex === n && rn?.direction === "asc" ? "desc" : "asc";
  rn = { tablePos: t, columnIndex: n, direction: a }, sr = null;
  const i = [];
  s.forEach((m) => {
    if (m.type.name === "tableRow") {
      let y = !1;
      m.forEach((g) => {
        g.type.name === "tableHeader" && (y = !0);
      }), i.push({ node: m, isHeader: y });
    }
  });
  const l = i.filter((m) => m.isHeader), u = i.filter((m) => !m.isHeader);
  if (u.length < 2) {
    Li(n, a), o.dispatch(r.tr.setMeta(dr, { updated: !0 }));
    return;
  }
  const c = u.map((m) => {
    let y = "", g = 0;
    return m.node.forEach((b) => {
      g === n && (y = b.textContent || ""), g++;
    }), { ...m, sortValue: yh(y) };
  }), d = c.map((m, y) => y);
  c.sort((m, y) => bh(m.sortValue, y.sortValue, a));
  const p = c.map((m, y) => u.indexOf(m));
  if (d.some((m, y) => m !== p[y])) {
    const m = [];
    l.forEach((b) => m.push(b.node)), c.forEach((b) => m.push(b.node));
    const y = s.type.create(s.attrs, m), { tr: g } = r;
    g.replaceWith(t, t + s.nodeSize, y), g.setMeta(dr, { updated: !0 }), o.dispatch(g);
  } else
    o.dispatch(r.tr.setMeta(dr, { updated: !0 }));
  Li(n, a);
}
function Li(e, t) {
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
function wh(e, t, n, r) {
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
    c.preventDefault(), c.stopPropagation(), vh(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function kh(e) {
  return new je({
    key: dr,
    state: {
      init() {
        return Xe.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(dr);
        return !t.docChanged && !s?.updated && sr ? sr.map(t.mapping, t.doc) : (sr = xh(o.doc, e), sr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function xh(e, t) {
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
              c.forEach((k, M) => {
                k.type.name === "paragraph" && (h = p + 1 + M + k.nodeSize - 1);
              });
              const y = rn?.tablePos === s && rn?.columnIndex === l ? rn.direction : null, g = l, b = s, v = it.widget(h, () => wh(y, b, g, t), { side: 1, key: "sort-" + s + "-" + g });
              n.push(v);
            }
            u += c.nodeSize, l++;
          });
        }
      });
    }
  }), Xe.create(e, n);
}
const Ch = ut.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [kh(this.editor)];
  }
});
function Pa(e, t, n, r, o, s = {}) {
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
const Sh = Xf.extend({
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
          if (Pa(n, p, a, u, c, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Th = Qf.extend({
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
          if (Pa(n, p, l, u, c, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Mh = ep.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: a }) => {
        const { selection: i } = n, { $from: l, $to: u } = i, c = l.blockRange(u);
        if (!c)
          return !1;
        const d = n.schema.nodes.taskList, p = n.schema.nodes.taskItem;
        let h = !1;
        for (let w = l.depth; w > 0; w--)
          if (l.node(w).type === d) {
            h = !0, l.before(w);
            break;
          }
        if (h)
          return t.liftListItem("taskItem");
        const m = n.schema.nodes.bulletList, y = n.schema.nodes.orderedList, g = n.schema.nodes.listItem;
        let b = null, v = -1;
        for (let w = l.depth; w > 0; w--) {
          const S = l.node(w);
          if (S.type === m || S.type === y) {
            b = S, v = l.before(w);
            break;
          }
        }
        if (b) {
          if (!o) return !0;
          const w = v, S = r.doc.nodeAt(w);
          if (!S) return !1;
          r.setNodeMarkup(w, d, S.attrs);
          const D = r.doc.nodeAt(w);
          if (!D) return !1;
          const x = [];
          D.forEach((T, E) => {
            T.type === g && x.push(w + 1 + E);
          });
          for (let T = x.length - 1; T >= 0; T--) {
            const E = x[T], N = r.doc.nodeAt(E);
            N && N.type === g && r.setNodeMarkup(E, p, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const k = Mi(c, d);
        if (k) {
          r.wrap(c, k);
          const { $from: w } = r.selection;
          let S = -1;
          for (let D = w.depth; D > 0; D--)
            if (w.node(D).type === d) {
              S = w.before(D);
              break;
            }
          if (S >= 0) {
            const D = r.doc.nodeAt(S);
            if (D) {
              const x = [];
              D.forEach((T, E) => {
                T.type === g && x.push(S + 1 + E);
              });
              for (let T = x.length - 1; T >= 0; T--) {
                const E = x[T], N = r.doc.nodeAt(E);
                N && N.type === g && r.setNodeMarkup(E, p, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const M = Mi(c, m);
        if (M) {
          r.wrap(c, M);
          const { $from: w } = r.selection;
          let S = -1;
          for (let D = w.depth; D > 0; D--)
            if (w.node(D).type === m) {
              S = w.before(D);
              break;
            }
          return S >= 0 && Pa(r, S, d, p, g, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Eh = tp.extend({
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
            const g = m.doc.resolve(p).blockRange();
            if (!g || !t || !e) return !1;
            const b = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (m.wrap(g, b), p > 1) {
              const v = m.doc.resolve(p - 1).nodeBefore;
              v && v.type === t && np(m.doc, p - 1) && m.join(p - 1);
            }
            return n.dispatch(m), !0;
          }
        }
      })
    ];
  }
}), Dh = Jf.extend({
  content: "paragraph block*"
}), Ii = new Ve("collapsibleList");
function Ws(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function Fs(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function Nh(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (r === -1 && (r = s), o = s + a.nodeSize), s += a.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let Nn = null;
function fs(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !Fs(o))
      return !0;
    const a = Ws(o, s), i = t.collapsedItems.has(a);
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
          const d = CSS.escape(a), p = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${d}"]`
          );
          if (p) {
            p.classList.contains("collapsed") !== i && (p.classList.remove("collapsed", "expanded"), p.classList.add(i ? "collapsed" : "expanded"), p.title = i ? "Click to expand" : "Click to collapse");
            const g = p.parentElement;
            if (g) return g;
          }
          const h = document.createElement("span");
          h.className = "collapsible-list-chevron-wrapper", h.setAttribute("contenteditable", "false");
          const m = document.createElement("button");
          return m.className = `collapsible-list-chevron ${i ? "collapsed" : "expanded"}`, m.setAttribute("data-list-item-id", a), m.setAttribute("contenteditable", "false"), m.setAttribute("tabindex", "-1"), m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', m.title = i ? "Click to expand" : "Click to collapse", m.addEventListener("click", (y) => {
            y.preventDefault(), y.stopPropagation();
            const g = m.classList.contains("collapsed");
            m.classList.remove("collapsed", "expanded"), m.classList.add(g ? "expanded" : "collapsed"), m.title = g ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), Nn && Nn.dispatch(
              Nn.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), h.appendChild(m), h;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      r.push(c);
    }
    if (i && Nh(o, s)) {
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
  }), Xe.create(e, r);
}
const Rh = ut.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !Fs(o))
          return !1;
        const s = Ws(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && Fs(o) && n.collapsedItems.add(Ws(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new je({
        key: Ii,
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
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: fs(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: fs(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Ii.getState(n);
            return r?.decorations ? r.decorations : fs(n.doc, e, t);
          }
        }
      })
    ];
  }
}), be = lp();
be.register("javascript", Na);
be.register("js", Na);
be.register("jsx", Na);
be.register("typescript", Ra);
be.register("ts", Ra);
be.register("tsx", Ra);
be.register("python", cc);
be.register("py", cc);
be.register("xml", Aa);
be.register("html", Aa);
be.register("svg", Aa);
be.register("css", Qp);
be.register("json", Jp);
be.register("bash", Ro);
be.register("sh", Ro);
be.register("shell", Ro);
be.register("zsh", Ro);
be.register("sql", eh);
be.register("java", th);
be.register("cpp", uc);
be.register("c", uc);
be.register("go", dc);
be.register("golang", dc);
be.register("rust", fc);
be.register("rs", fc);
be.register("markdown", pc);
be.register("md", pc);
be.register("yaml", hc);
be.register("yml", hc);
be.register("diff", mc);
be.register("patch", mc);
function Ah({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = V(!1), [s, a] = V(!1), i = K(null);
  J(() => {
    const p = i.current;
    if (!p || s) return;
    const h = new IntersectionObserver(
      (m) => {
        for (const y of m)
          y.isIntersecting && (a(!0), h.unobserve(p));
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
  const l = Y(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (p) {
      console.error("Failed to copy:", p);
    }
  }, [e.textContent]), u = n.options.lowlight?.listLanguages?.() || [], c = e.attrs.language || "plaintext", d = c === "plaintext" ? "Plain Text" : c.charAt(0).toUpperCase() + c.slice(1);
  return /* @__PURE__ */ A(xr, { className: "code-block-wrapper", ref: i, children: [
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
        /* @__PURE__ */ f(Kt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          onClick: l,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ f(Fn, { size: 14 }) : /* @__PURE__ */ f(Un, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("pre", { className: `code-block-pre ${s ? "" : "code-block-deferred"}`, children: /* @__PURE__ */ f(da, { className: s ? `language-${c}` : "language-plaintext" }) })
  ] });
}
const Ph = ip.extend({
  addNodeView() {
    return To(Ah);
  }
}).configure({
  lowlight: be,
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
    (i) => {
      r?.(i), i.stopPropagation();
    },
    [r]
  ), s = Y((i) => {
    i.stopPropagation();
  }, []), a = Y((i) => {
    i.stopPropagation();
  }, []);
  return rh(
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
        onClick: a,
        children: e
      }
    ),
    document.body
  );
}
function Lh({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = V(""), s = K(null), a = K(null), [i, l] = V({ top: 0, left: 0 });
  J(() => {
    if (t) {
      const m = e.getAttributes("link").href || "";
      o(m);
      try {
        const { view: y } = e, { from: g } = y.state.selection, b = y.coordsAtPos(g), v = b.bottom + 8, k = Math.max(16, Math.min(b.left, window.innerWidth - 420));
        l({ top: v, left: k });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), J(() => {
    if (!t) return;
    const m = (v) => {
      a.current && !a.current.contains(v.target) && n();
    }, y = () => {
      n();
    }, g = setTimeout(() => {
      document.addEventListener("mousedown", m);
    }, 10), b = e.view.dom.closest(".editor-content-wrapper");
    return b?.addEventListener("scroll", y), () => {
      clearTimeout(g), document.removeEventListener("mousedown", m), b?.removeEventListener("scroll", y);
    };
  }, [t, n, e]);
  const u = Y((m) => {
    if (m?.preventDefault(), r.trim()) {
      let y = r.trim();
      !/^https?:\/\//i.test(y) && !y.startsWith("mailto:") && (y = "https://" + y), e.chain().focus().extendMarkRange("link").setLink({ href: y }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), c = Y((m) => {
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
        left: `${i.left}px`
      },
      children: /* @__PURE__ */ A("form", { onSubmit: u, className: "link-popover-form", children: [
        /* @__PURE__ */ A("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ f(pa, { className: "link-popover-icon", size: 16 }),
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
  return /* @__PURE__ */ f(Lt, { children: h });
}
function Ih({ editor: e, onEditLink: t }) {
  const [n, r] = V({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = K(null), s = K(null), a = Y((k) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const M = k.getAttribute("href") || "", w = k.getBoundingClientRect(), S = w.bottom + 8, D = Math.max(16, Math.min(w.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: M,
          position: { top: S, left: D },
          linkElement: k
        });
      } catch (M) {
        console.warn("LinkHoverTooltip: Error showing tooltip", M);
      }
    }
  }, [e]), i = Y(() => {
    s.current = setTimeout(() => {
      r((k) => ({ ...k, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = Y(() => {
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
      const D = S.target, x = S.relatedTarget;
      if (D.closest("a")) {
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
  const [u, c] = V(!1), d = Y(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      c(!0), setTimeout(() => c(!1), 1500);
    });
  }, [n.url]), p = Y(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), h = Y(() => {
    if (n.linkElement) {
      const { view: k } = e, { doc: M } = k.state;
      let w = null, S = null;
      M.descendants((D, x) => {
        if (D.isText && D.marks.some((T) => T.type.name === "link")) {
          const T = k.nodeDOM(x);
          if (T && (T === n.linkElement || T.parentElement === n.linkElement))
            return w = x, S = x + D.nodeSize, !1;
        }
        return !0;
      }), w !== null && S !== null ? e.chain().focus().setTextSelection({ from: w, to: S }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((k) => ({ ...k, isVisible: !1 }));
  }, [e, n.linkElement]), m = Y(() => {
    if (n.linkElement) {
      const { view: k } = e, { doc: M } = k.state;
      M.descendants((w, S) => {
        if (w.isText && w.marks.some((D) => D.type.name === "link")) {
          const D = k.nodeDOM(S);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: S, to: S + w.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((k) => ({ ...k, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const y = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, b = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", v = /* @__PURE__ */ f(
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
              /* @__PURE__ */ f(pp, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ f("span", { className: "link-hover-tooltip-url", children: y || "No URL" })
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
              children: /* @__PURE__ */ f(hp, { size: 14 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: d,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: u ? /* @__PURE__ */ f(Fn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ f(Un, { size: 14 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ f(mp, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ f(Lt, { children: v });
}
const nt = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ f(
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
), Oi = () => /* @__PURE__ */ f("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), _i = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Oh = Wn(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: a, executeCommand: i }) {
  const [l, u] = V(!1), c = K(null), d = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : a ? "h5" : "paragraph", p = _i.find((m) => m.value === d)?.shortLabel || "P";
  J(() => {
    if (!l) return;
    const m = (y) => {
      c.current && !c.current.contains(y.target) && u(!1);
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [l]);
  const h = (m, y) => {
    if (m.preventDefault(), m.stopPropagation(), y === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const g = parseInt(y.replace("h", ""));
      t.chain().focus().toggleHeading({ level: g }).run();
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
          /* @__PURE__ */ f("span", { className: "min-w-[18px] text-center", children: p }),
          /* @__PURE__ */ f(Kt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` })
        ]
      }
    ),
    l && /* @__PURE__ */ f(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: _i.map((m) => {
          const y = m.value === d;
          return /* @__PURE__ */ A(
            "button",
            {
              onMouseDown: (g) => h(g, m.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${y ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ f("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: m.shortLabel }),
                /* @__PURE__ */ f("span", { children: m.label })
              ]
            },
            m.value
          );
        })
      }
    )
  ] });
}), _h = Wn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const a = K(null), i = ql({
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
  }), [l, u] = V(!1), [c, d] = V(""), [p, h] = V(!1), [m, y] = V({ top: 0, left: 0 }), g = K(null), b = K(null), v = K(null), k = Y(() => {
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
  }, w = Y((T, E) => {
    T.preventDefault(), T.stopPropagation(), E();
  }, []);
  J(() => {
    if (!t || t.isDestroyed) return;
    const T = () => {
      if (!t.isDestroyed)
        try {
          const { selection: E } = t.state, { empty: N, from: R, to: I } = E, W = ("node" in E && E.node ? E.node : null)?.type?.name === "resizableImage";
          if (N || W || t.isActive("codeBlock")) {
            v.current && (clearTimeout(v.current), v.current = null), b.current && clearTimeout(b.current), b.current = setTimeout(() => {
              h(!1), u(!1);
            }, 150);
            return;
          }
          b.current && (clearTimeout(b.current), b.current = null);
          const q = t.view.coordsAtPos(R), L = t.view.coordsAtPos(I), P = g.current?.offsetWidth || 500, j = g.current?.offsetHeight || 40, Z = 8, G = window.innerWidth;
          let Q = 0, re = 0;
          if (g.current) {
            const he = g.current.closest('[data-slot="dialog-content"]');
            if (he) {
              const ge = he.getBoundingClientRect();
              Q = ge.left, re = ge.top;
            }
          }
          let B = (q.left + L.left) / 2 - P / 2 - Q;
          const F = Q ? G - Q : G;
          B = Math.max(Z, Math.min(F - P - Z, B));
          let ee = q.top - j - 10 - re;
          ee < Z && (ee = L.bottom + 10 - re), p ? y({ top: Math.max(Z, ee), left: B }) : (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
            y({ top: Math.max(Z, ee), left: B }), h(!0);
          }, 50));
        } catch (E) {
          console.warn("FloatingToolbar: Error updating position", E);
        }
    };
    return t.on("selectionUpdate", T), () => {
      t.off("selectionUpdate", T), b.current && clearTimeout(b.current), v.current && clearTimeout(v.current);
    };
  }, [t, p]);
  const S = (T) => {
    b.current && (clearTimeout(b.current), b.current = null);
  };
  if (!p || r)
    return null;
  const D = 15, x = l ? /* @__PURE__ */ f(
    "div",
    {
      ref: g,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: m.top,
        left: m.left
      },
      onMouseDown: S,
      children: /* @__PURE__ */ A("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ f(
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
          /* @__PURE__ */ f(
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
      ref: g,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: m.top,
        left: m.left
      },
      onMouseDown: S,
      children: [
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBold().run()),
            isActive: i?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ f(ha, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleItalic().run()),
            isActive: i?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ f(ma, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleUnderline().run()),
            isActive: i?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ f(ga, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleStrike().run()),
            isActive: i?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ f(ya, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleCode().run()),
            isActive: i?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ f(Xl, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleHighlight().run()),
            isActive: i?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ f(Ql, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: M,
            isActive: i?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ f(ba, { size: D })
          }
        ),
        /* @__PURE__ */ f(Oi, {}),
        /* @__PURE__ */ f(
          Oh,
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
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBlockquote().run()),
            isActive: i?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ f(va, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBulletList().run()),
            isActive: i?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ f(wa, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleOrderedList().run()),
            isActive: i?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ f(ka, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleTaskList().run()),
            isActive: i?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ f(xa, { size: D })
          }
        ),
        /* @__PURE__ */ f(
          nt,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: i?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ f(gp, { size: D })
          }
        ),
        o && /* @__PURE__ */ A(Ie, { children: [
          /* @__PURE__ */ f(Oi, {}),
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
              children: /* @__PURE__ */ f(Do, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ f(Lt, { onMouseDown: S, children: x });
}), Ur = {
  info: { icon: uo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: ec, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: Jl, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: Sa, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Ca, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function $h({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = V(!1), [s, a] = V(!1), [i, l] = V(null), u = K(null), c = K(null), d = e.attrs.type || "info", p = Ur[d] || Ur.info, h = p.icon, m = Y(() => {
    if (c.current) {
      const v = c.current.getBoundingClientRect();
      l({
        top: v.bottom + 4,
        left: v.left
      });
    }
  }, []);
  J(() => {
    if (!r) return;
    const v = (k) => {
      u.current && !u.current.contains(k.target) && c.current && !c.current.contains(k.target) && o(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [r]), J(() => {
    if (!r) return;
    const v = () => o(!1);
    return window.addEventListener("scroll", v, !0), () => window.removeEventListener("scroll", v, !0);
  }, [r]);
  const y = Y(() => {
    n.isEditable && (r || m(), o(!r));
  }, [n.isEditable, r, m]), g = (v) => {
    t({ type: v }), o(!1);
  }, b = Y((v) => {
    v.stopPropagation(), a((k) => !k);
  }, []);
  return /* @__PURE__ */ A(xr, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
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
              ref: c,
              className: "callout-header-button",
              onClick: (v) => {
                v.stopPropagation(), y();
              },
              title: n.isEditable ? "Click to change callout type" : p.label,
              style: { color: p.borderColor },
              contentEditable: !1,
              children: [
                /* @__PURE__ */ f(h, { size: 18 }),
                /* @__PURE__ */ f("span", { className: "callout-label", children: p.label }),
                n.isEditable && /* @__PURE__ */ f(Kt, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ f(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: p.borderColor },
              children: s ? /* @__PURE__ */ f(tc, { size: 16 }) : /* @__PURE__ */ f(Kt, { size: 16 })
            }
          ),
          r && n.isEditable && i && /* @__PURE__ */ f(Lt, { children: /* @__PURE__ */ f(
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
              children: Object.keys(Ur).map((v) => {
                const k = Ur[v], M = k.icon;
                return /* @__PURE__ */ A(
                  "button",
                  {
                    className: `callout-type-option ${v === d ? "active" : ""}`,
                    onClick: (w) => {
                      w.stopPropagation(), g(v);
                    },
                    onMouseDown: (w) => w.stopPropagation(),
                    style: { "--callout-option-color": k.color },
                    children: [
                      /* @__PURE__ */ f(M, { size: 16, style: { color: k.borderColor } }),
                      /* @__PURE__ */ f("span", { children: k.label })
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
    /* @__PURE__ */ f("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ f(da, {}) })
  ] });
}
const Hh = Mo.create({
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
      Bn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return To($h);
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
}), zh = oh.extend({
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
        Bn(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addNodeView() {
    const e = this.options;
    return ({ node: t, editor: n, getPos: r }) => {
      let o = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const a = (P) => {
        const j = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[P] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${j}`;
      };
      a(t.attrs.align || "left");
      const i = document.createElement("img");
      i.alt = t.attrs.alt || "", t.attrs.width && (i.style.width = `${t.attrs.width}px`);
      const l = (P) => !(!P || P.startsWith("data:") || P.startsWith("blob:") || P.startsWith("http://") || P.startsWith("https://")), u = (P) => {
        l(P) && e.resolveImageSrc ? (i.style.opacity = "0.5", i.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(P).then((j) => {
          i.src = j, i.style.opacity = "1";
        }).catch(() => {
          i.src = P, i.style.opacity = "1";
        })) : i.src = P;
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
        min-width: 200px;
        padding: 4px;
        background: oklch(0.99 0 0);
        border: 1px solid oklch(0.9 0 0);
        border-radius: 8px;
        box-shadow: 0 4px 16px oklch(0 0 0 / 0.15);
        z-index: 9999;
        pointer-events: auto;
      `;
      const h = (P, j, Z) => {
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
        `, G.innerHTML = `${j}<span>${P}</span>`, G.addEventListener("mouseenter", () => {
          G.style.background = "oklch(0.95 0 0)";
        }), G.addEventListener("mouseleave", () => {
          G.style.background = "transparent";
        }), G.addEventListener("click", (Q) => {
          Q.preventDefault(), Q.stopPropagation(), Z(), p.style.display = "none", T = !1;
        }), G;
      }, m = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      p.appendChild(h("Edit", m, () => {
        const P = typeof r == "function" ? r() : null;
        if (P != null && e.onImageClick) {
          const j = i.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: P,
            rect: j
          });
        }
      })), p.appendChild(h("Copy image", y, async () => {
        const P = o.attrs.src;
        try {
          const Z = await (await fetch(P)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [Z.type]: Z })
          ]);
        } catch {
          try {
            await navigator.clipboard.writeText(P);
          } catch {
          }
        }
      })), p.appendChild(h("Copy URL", b, async () => {
        const P = o.attrs.src;
        try {
          await navigator.clipboard.writeText(P);
        } catch {
        }
      })), p.appendChild(h("Save image", g, () => {
        const P = o.attrs.src, j = o.attrs.alt || "image", Z = document.createElement("a");
        Z.href = P, Z.download = j, Z.target = "_blank", Z.rel = "noopener noreferrer", document.body.appendChild(Z), Z.click(), setTimeout(() => {
          document.body.removeChild(Z);
        }, 100);
      }));
      const v = document.createElement("div");
      v.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, p.appendChild(v);
      const k = document.createElement("div");
      k.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, k.textContent = "Alignment", p.appendChild(k);
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
      ], S = [], D = (P) => {
        S.forEach((j) => {
          (j.getAttribute("data-align-value") || "left") === P ? (j.style.background = "oklch(1 0 0)", j.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", j.style.color = "oklch(0.25 0 0)", j.style.fontWeight = "600") : (j.style.background = "transparent", j.style.boxShadow = "none", j.style.color = "oklch(0.5 0 0)", j.style.fontWeight = "400");
        });
      };
      w.forEach(({ value: P, label: j, icon: Z }) => {
        const G = document.createElement("button");
        G.setAttribute("type", "button"), G.setAttribute("data-align-value", P), G.setAttribute("title", `Align ${j.toLowerCase()}`), G.style.cssText = `
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
        `, G.innerHTML = `${Z}<span>${j}</span>`, G.addEventListener("click", (Q) => {
          Q.preventDefault(), Q.stopPropagation();
          const re = typeof r == "function" ? r() : null;
          if (re != null)
            try {
              const { state: $, dispatch: B } = n.view, F = $.doc.nodeAt(re);
              if (F && F.type.name === "resizableImage") {
                const ee = $.tr.setNodeMarkup(re, void 0, {
                  ...F.attrs,
                  align: P
                });
                B(ee);
              }
            } catch {
              n.chain().focus().setNodeSelection(re).updateAttributes("resizableImage", {
                align: P
              }).run();
            }
          D(P);
        }), S.push(G), M.appendChild(G);
      }), p.appendChild(M);
      const x = () => {
        const P = o.attrs.align || "left";
        D(P);
      };
      let T = !1;
      d.addEventListener("click", (P) => {
        if (P.preventDefault(), P.stopPropagation(), T)
          p.style.display = "none", T = !1;
        else {
          const j = d.getBoundingClientRect(), Z = 200, G = p.closest('[role="dialog"]');
          let Q = 0, re = 0;
          if (G) {
            const ge = G.getBoundingClientRect();
            Q = ge.left, re = ge.top;
          }
          let $ = j.bottom + 4 - re, B = j.right - Z - Q;
          const F = window.innerHeight, ee = window.innerWidth, he = 200;
          j.bottom + 4 + he > F && ($ = j.top - he - 4 - re), B + Q < 8 && (B = 8 - Q), B + Z + Q > ee - 8 && (B = ee - Z - 8 - Q), p.style.top = `${$}px`, p.style.left = `${B}px`, p.style.display = "flex", T = !0, x();
        }
      });
      const E = (P) => {
        !p.contains(P.target) && !d.contains(P.target) && (p.style.display = "none", T = !1);
      };
      document.addEventListener("click", E), s.appendChild(i), s.appendChild(c), s.appendChild(d);
      const N = s.closest('[role="dialog"]');
      N ? N.appendChild(p) : document.body.appendChild(p), s.addEventListener("mouseenter", () => {
        c.style.opacity = "1", d.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        c.style.opacity = "0", T || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      }), i.style.cursor = "zoom-in";
      let R = !1;
      const I = (P) => {
        if (R || T || d.contains(P.target) || c.contains(P.target)) return;
        P.preventDefault(), P.stopPropagation();
        const j = document.createElement("div");
        j.style.cssText = `
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
        const Z = document.createElement("img");
        Z.src = i.src, Z.alt = i.alt || "", Z.style.cssText = `
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
        const Q = o.attrs.alt;
        let re = null;
        Q && Q.trim() && (re = document.createElement("div"), re.style.cssText = `
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
          `, re.textContent = Q);
        const $ = () => {
          j.style.opacity = "0", Z.style.transform = "scale(0.92)", setTimeout(() => j.remove(), 200);
        };
        j.addEventListener("click", (ee) => {
          ee.target === j && $();
        }), G.addEventListener("click", $);
        const B = (ee) => {
          ee.key === "Escape" && ($(), document.removeEventListener("keydown", B));
        };
        document.addEventListener("keydown", B), j.appendChild(Z), j.appendChild(G), re && j.appendChild(re);
        const F = s.closest('[role="dialog"]');
        F ? F.appendChild(j) : document.body.appendChild(j), requestAnimationFrame(() => {
          j.style.opacity = "1", Z.style.transform = "scale(1)";
        });
      };
      i.addEventListener("click", I);
      let O, H;
      const W = (P) => {
        P.preventDefault(), R = !0, O = P.clientX, H = i.offsetWidth, document.addEventListener("mousemove", q), document.addEventListener("mouseup", L);
      }, q = (P) => {
        const j = P.clientX - O, Z = Math.max(100, H + j);
        i.style.width = `${Z}px`;
      }, L = () => {
        document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", L), setTimeout(() => {
          R = !1;
        }, 100);
        const P = typeof r == "function" ? r() : null, j = i.offsetWidth;
        if (P != null)
          try {
            const { state: Z, dispatch: G } = n.view, Q = Z.doc.nodeAt(P);
            if (Q && Q.type.name === "resizableImage") {
              const re = Z.tr.setNodeMarkup(P, void 0, {
                ...Q.attrs,
                width: j
              });
              G(re);
            }
          } catch {
            n.chain().focus().setNodeSelection(P).updateAttributes("resizableImage", {
              width: j
            }).run();
          }
      };
      return c.addEventListener("mousedown", W), {
        dom: s,
        update: (P) => P.type.name !== "resizableImage" ? !1 : (o = P, u(P.attrs.src), i.alt = P.attrs.alt || "", P.attrs.width && (i.style.width = `${P.attrs.width}px`), a(P.attrs.align || "left"), !0),
        destroy: () => {
          c.removeEventListener("mousedown", W), i.removeEventListener("click", I), document.removeEventListener("click", E), p.remove();
        }
      };
    };
  }
});
function Bh(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Wh = {}, ar = {};
function on(e, t) {
  try {
    const r = (Wh[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in ar ? ar[r] : $i(r, r.split(":"));
  } catch {
    if (e in ar) return ar[e];
    const n = e?.match(Fh);
    return n ? $i(e, n.slice(1)) : NaN;
  }
}
const Fh = /([+-]\d\d):?(\d\d)?/;
function $i(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return ar[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class ht extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(on(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), yc(this), Us(this)) : this.setTime(Date.now());
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
    const t = -on(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Us(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ht(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Hi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Hi.test(e)) return;
  const t = e.replace(Hi, "$1UTC");
  ht.prototype[t] && (e.startsWith("get") ? ht.prototype[e] = function() {
    return this.internal[t]();
  } : (ht.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Uh(this), +this;
  }, ht.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Us(this), +this;
  }));
});
function Us(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-on(e.timeZone, e) * 60));
}
function Uh(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), yc(e);
}
function yc(e) {
  const t = on(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), a = o - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const c = o > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, d = Math.round(-(on(e.timeZone, e) * 60)) % 60;
  (d || c) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + c));
  const p = on(e.timeZone, e), h = p > 0 ? Math.floor(p) : Math.ceil(p), y = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, g = h !== n, b = y - l;
  if (g && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const v = on(e.timeZone, e), k = v > 0 ? Math.floor(v) : Math.ceil(v), M = h - k;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
  }
}
class Be extends ht {
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
    return `${t} GMT${n}${r}${o} (${Bh(this.timeZone, this)})`;
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
const bc = 6048e5, Yh = 864e5, zi = Symbol.for("constructDateFrom");
function Ae(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && zi in e ? e[zi](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Ce(e, t) {
  return Ae(t || e, e);
}
function vc(e, t, n) {
  const r = Ce(e, n?.in);
  return isNaN(t) ? Ae(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function wc(e, t, n) {
  const r = Ce(e, n?.in);
  if (isNaN(t)) return Ae(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Ae(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const a = s.getDate();
  return o >= a ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let jh = {};
function Cr() {
  return jh;
}
function _n(e, t) {
  const n = Cr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Ce(e, t?.in), s = o.getDay(), a = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - a), o.setHours(0, 0, 0, 0), o;
}
function hr(e, t) {
  return _n(e, { ...t, weekStartsOn: 1 });
}
function kc(e, t) {
  const n = Ce(e, t?.in), r = n.getFullYear(), o = Ae(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = hr(o), a = Ae(n, 0);
  a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0);
  const i = hr(a);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function Bi(e) {
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
function Yn(e, ...t) {
  const n = Ae.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function mr(e, t) {
  const n = Ce(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function xc(e, t, n) {
  const [r, o] = Yn(
    n?.in,
    e,
    t
  ), s = mr(r), a = mr(o), i = +s - Bi(s), l = +a - Bi(a);
  return Math.round((i - l) / Yh);
}
function Vh(e, t) {
  const n = kc(e, t), r = Ae(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), hr(r);
}
function Kh(e, t, n) {
  return vc(e, t * 7, n);
}
function qh(e, t, n) {
  return wc(e, t * 12, n);
}
function Gh(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ae.bind(null, o));
    const s = Ce(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Ae(r, n || NaN);
}
function Zh(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ae.bind(null, o));
    const s = Ce(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Ae(r, n || NaN);
}
function Xh(e, t, n) {
  const [r, o] = Yn(
    n?.in,
    e,
    t
  );
  return +mr(r) == +mr(o);
}
function Cc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Qh(e) {
  return !(!Cc(e) && typeof e != "number" || isNaN(+Ce(e)));
}
function Jh(e, t, n) {
  const [r, o] = Yn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), a = r.getMonth() - o.getMonth();
  return s * 12 + a;
}
function em(e, t) {
  const n = Ce(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Sc(e, t) {
  const [n, r] = Yn(e, t.start, t.end);
  return { start: n, end: r };
}
function tm(e, t) {
  const { start: n, end: r } = Sc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(Ae(n, a)), a.setMonth(a.getMonth() + i);
  return o ? l.reverse() : l;
}
function nm(e, t) {
  const n = Ce(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function rm(e, t) {
  const n = Ce(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Tc(e, t) {
  const n = Ce(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function om(e, t) {
  const { start: n, end: r } = Sc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(Ae(n, a)), a.setFullYear(a.getFullYear() + i);
  return o ? l.reverse() : l;
}
function Mc(e, t) {
  const n = Cr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = Ce(e, t?.in), s = o.getDay(), a = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + a), o.setHours(23, 59, 59, 999), o;
}
function sm(e, t) {
  return Mc(e, { ...t, weekStartsOn: 1 });
}
const am = {
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
}, im = (e, t, n) => {
  let r;
  const o = am[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ps(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const lm = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, cm = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, um = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, dm = {
  date: ps({
    formats: lm,
    defaultWidth: "full"
  }),
  time: ps({
    formats: cm,
    defaultWidth: "full"
  }),
  dateTime: ps({
    formats: um,
    defaultWidth: "full"
  })
}, fm = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, pm = (e, t, n, r) => fm[e];
function er(e) {
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
const hm = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, mm = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, gm = {
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
}, ym = {
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
}, bm = {
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
}, vm = {
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
}, wm = (e, t) => {
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
}, km = {
  ordinalNumber: wm,
  era: er({
    values: hm,
    defaultWidth: "wide"
  }),
  quarter: er({
    values: mm,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: er({
    values: gm,
    defaultWidth: "wide"
  }),
  day: er({
    values: ym,
    defaultWidth: "wide"
  }),
  dayPeriod: er({
    values: bm,
    defaultWidth: "wide",
    formattingValues: vm,
    defaultFormattingWidth: "wide"
  })
};
function tr(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const a = s[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? Cm(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      xm(i, (d) => d.test(a))
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
function xm(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Cm(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Sm(e) {
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
const Tm = /^(\d+)(th|st|nd|rd)?/i, Mm = /\d+/i, Em = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Dm = {
  any: [/^b/i, /^(a|c)/i]
}, Nm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Rm = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Am = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Pm = {
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
}, Lm = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Im = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Om = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, _m = {
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
}, $m = {
  ordinalNumber: Sm({
    matchPattern: Tm,
    parsePattern: Mm,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: tr({
    matchPatterns: Em,
    defaultMatchWidth: "wide",
    parsePatterns: Dm,
    defaultParseWidth: "any"
  }),
  quarter: tr({
    matchPatterns: Nm,
    defaultMatchWidth: "wide",
    parsePatterns: Rm,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: tr({
    matchPatterns: Am,
    defaultMatchWidth: "wide",
    parsePatterns: Pm,
    defaultParseWidth: "any"
  }),
  day: tr({
    matchPatterns: Lm,
    defaultMatchWidth: "wide",
    parsePatterns: Im,
    defaultParseWidth: "any"
  }),
  dayPeriod: tr({
    matchPatterns: Om,
    defaultMatchWidth: "any",
    parsePatterns: _m,
    defaultParseWidth: "any"
  })
}, La = {
  code: "en-US",
  formatDistance: im,
  formatLong: dm,
  formatRelative: pm,
  localize: km,
  match: $m,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Hm(e, t) {
  const n = Ce(e, t?.in);
  return xc(n, Tc(n)) + 1;
}
function Ec(e, t) {
  const n = Ce(e, t?.in), r = +hr(n) - +Vh(n);
  return Math.round(r / bc) + 1;
}
function Dc(e, t) {
  const n = Ce(e, t?.in), r = n.getFullYear(), o = Cr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = Ae(t?.in || e, 0);
  a.setFullYear(r + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = _n(a, t), l = Ae(t?.in || e, 0);
  l.setFullYear(r, 0, s), l.setHours(0, 0, 0, 0);
  const u = _n(l, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function zm(e, t) {
  const n = Cr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Dc(e, t), s = Ae(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), _n(s, t);
}
function Nc(e, t) {
  const n = Ce(e, t?.in), r = +_n(n, t) - +zm(n, t);
  return Math.round(r / bc) + 1;
}
function xe(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Ft = {
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
}, kn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Wi = {
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
    return Ft.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Dc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const a = s % 100;
      return xe(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : xe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = kc(e);
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
        return Ft.M(e, t);
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
    const o = Nc(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : xe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Ec(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : xe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ft.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Hm(e);
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
    switch (r === 12 ? o = kn.noon : r === 0 ? o = kn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = kn.evening : r >= 12 ? o = kn.afternoon : r >= 4 ? o = kn.morning : o = kn.night, t) {
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
    return Ft.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Ft.H(e, t);
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
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ft.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ft.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Ft.S(e, t);
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
        return tn(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return tn(r, ":");
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
        return tn(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return tn(r, ":");
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
        return "GMT" + tn(r, ":");
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
        return "GMT" + tn(r, ":");
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
function Fi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + xe(s, 2);
}
function Ui(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + xe(Math.abs(e) / 60, 2) : tn(e, t);
}
function tn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = xe(Math.trunc(r / 60), 2), s = xe(r % 60, 2);
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
}, Rc = (e, t) => {
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
}, Bm = (e, t) => {
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
  return s.replace("{{date}}", Yi(r, t)).replace("{{time}}", Rc(o, t));
}, Wm = {
  p: Rc,
  P: Bm
}, Fm = /^D+$/, Um = /^Y+$/, Ym = ["D", "DD", "YY", "YYYY"];
function jm(e) {
  return Fm.test(e);
}
function Vm(e) {
  return Um.test(e);
}
function Km(e, t, n) {
  const r = qm(e, t, n);
  if (console.warn(r), Ym.includes(e)) throw new RangeError(r);
}
function qm(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Gm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Zm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Xm = /^'([^]*?)'?$/, Qm = /''/g, Jm = /[a-zA-Z]/;
function eg(e, t, n) {
  const r = Cr(), o = n?.locale ?? r.locale ?? La, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = Ce(e, n?.in);
  if (!Qh(i))
    throw new RangeError("Invalid time value");
  let l = t.match(Zm).map((c) => {
    const d = c[0];
    if (d === "p" || d === "P") {
      const p = Wm[d];
      return p(c, o.formatLong);
    }
    return c;
  }).join("").match(Gm).map((c) => {
    if (c === "''")
      return { isToken: !1, value: "'" };
    const d = c[0];
    if (d === "'")
      return { isToken: !1, value: tg(c) };
    if (Wi[d])
      return { isToken: !0, value: c };
    if (d.match(Jm))
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
    (!n?.useAdditionalWeekYearTokens && Vm(d) || !n?.useAdditionalDayOfYearTokens && jm(d)) && Km(d, t, String(e));
    const p = Wi[d[0]];
    return p(i, d, o.localize, u);
  }).join("");
}
function tg(e) {
  const t = e.match(Xm);
  return t ? t[1].replace(Qm, "'") : e;
}
function ng(e, t) {
  const n = Ce(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Ae(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function rg(e, t) {
  return Ce(e, t?.in).getMonth();
}
function og(e, t) {
  return Ce(e, t?.in).getFullYear();
}
function sg(e, t) {
  return +Ce(e) > +Ce(t);
}
function ag(e, t) {
  return +Ce(e) < +Ce(t);
}
function ig(e, t, n) {
  const [r, o] = Yn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function lg(e, t, n) {
  const [r, o] = Yn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function cg(e, t, n) {
  const r = Ce(e, n?.in), o = r.getFullYear(), s = r.getDate(), a = Ae(e, 0);
  a.setFullYear(o, t, 15), a.setHours(0, 0, 0, 0);
  const i = ng(a);
  return r.setMonth(t, Math.min(s, i)), r;
}
function ug(e, t, n) {
  const r = Ce(e, n?.in);
  return isNaN(+r) ? Ae(e, NaN) : (r.setFullYear(t), r);
}
const ji = 5, dg = 4;
function fg(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, ji * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? ji : dg;
}
function Ac(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function pg(e, t) {
  const n = Ac(e, t), r = fg(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Je {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Be.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Be(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : vc(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : wc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Kh(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : qh(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : xc(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Jh(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : tm(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : om(r), s = new Set(o.map((i) => this.getYear(i)));
      if (s.size === o.length)
        return o;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : pg(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : sm(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : em(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Mc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : rm(r), this.format = (r, o, s) => {
      const a = this.overrides?.format ? this.overrides.format(r, o, this.options) : eg(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Ec(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : rg(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : og(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Nc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : sg(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : ag(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Cc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Xh(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : ig(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : lg(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Gh(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Zh(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : cg(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : ug(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Ac(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : mr(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : hr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : nm(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : _n(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Tc(r), this.options = { locale: La, ...t }, this.overrides = n;
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
    return t && Je.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Je.yearFirstLocales.has(s))
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
Je.yearFirstLocales = /* @__PURE__ */ new Set([
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
const bt = new Je();
class Pc {
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
class hg {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class mg {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function gg(e) {
  return X.createElement("button", { ...e });
}
function yg(e) {
  return X.createElement("span", { ...e });
}
function bg(e) {
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
function vg(e) {
  const { day: t, modifiers: n, ...r } = e;
  return X.createElement("td", { ...r });
}
function wg(e) {
  const { day: t, modifiers: n, ...r } = e, o = X.useRef(null);
  return X.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), X.createElement("button", { ref: o, ...r });
}
var se;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(se || (se = {}));
var Me;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Me || (Me = {}));
var at;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(at || (at = {}));
var Ge;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Ge || (Ge = {}));
function kg(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, a = [o[se.Dropdown], n].join(" "), i = t?.find(({ value: l }) => l === s.value);
  return X.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[se.DropdownRoot] },
    X.createElement(r.Select, { className: a, ...s }, t?.map(({ value: l, label: u, disabled: c }) => X.createElement(r.Option, { key: l, value: l, disabled: c }, u))),
    X.createElement(
      "span",
      { className: o[se.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      X.createElement(r.Chevron, { orientation: "down", size: 18, className: o[se.Chevron] })
    )
  );
}
function xg(e) {
  return X.createElement("div", { ...e });
}
function Cg(e) {
  return X.createElement("div", { ...e });
}
function Sg(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r }, e.children);
}
function Tg(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r });
}
function Mg(e) {
  return X.createElement("table", { ...e });
}
function Eg(e) {
  return X.createElement("div", { ...e });
}
const Lc = Gl(void 0);
function Sr() {
  const e = Zl(Lc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Dg(e) {
  const { components: t } = Sr();
  return X.createElement(t.Dropdown, { ...e });
}
function Ng(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: u } } = Sr(), c = Y((p) => {
    o && n?.(p);
  }, [o, n]), d = Y((p) => {
    r && t?.(p);
  }, [r, t]);
  return X.createElement(
    "nav",
    { ...s },
    X.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[se.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: d },
      X.createElement(a.Chevron, { disabled: r ? void 0 : !0, className: i[se.Chevron], orientation: "left" })
    ),
    X.createElement(
      a.NextMonthButton,
      { type: "button", className: i[se.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": u(o), onClick: c },
      X.createElement(a.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[se.Chevron] })
    )
  );
}
function Rg(e) {
  const { components: t } = Sr();
  return X.createElement(t.Button, { ...e });
}
function Ag(e) {
  return X.createElement("option", { ...e });
}
function Pg(e) {
  const { components: t } = Sr();
  return X.createElement(t.Button, { ...e });
}
function Lg(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function Ig(e) {
  return X.createElement("select", { ...e });
}
function Og(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function _g(e) {
  return X.createElement("th", { ...e });
}
function $g(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function Hg(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function zg(e) {
  return X.createElement("th", { ...e });
}
function Bg(e) {
  return X.createElement("tbody", { ...e });
}
function Wg(e) {
  const { components: t } = Sr();
  return X.createElement(t.Dropdown, { ...e });
}
const Fg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: gg,
  CaptionLabel: yg,
  Chevron: bg,
  Day: vg,
  DayButton: wg,
  Dropdown: kg,
  DropdownNav: xg,
  Footer: Cg,
  Month: Sg,
  MonthCaption: Tg,
  MonthGrid: Mg,
  Months: Eg,
  MonthsDropdown: Dg,
  Nav: Ng,
  NextMonthButton: Rg,
  Option: Ag,
  PreviousMonthButton: Pg,
  Root: Lg,
  Select: Ig,
  Week: Og,
  WeekNumber: Hg,
  WeekNumberHeader: zg,
  Weekday: _g,
  Weekdays: $g,
  Weeks: Bg,
  YearsDropdown: Wg
}, Symbol.toStringTag, { value: "Module" }));
function Et(e, t, n = !1, r = bt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = r;
  return o && s ? (a(s, o) < 0 && ([o, s] = [s, o]), a(t, o) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && o ? i(o, t) : !1;
}
function Ic(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ia(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Oc(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function _c(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function $c(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Hc(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Dt(e, t, n = bt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: a } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Hc(i, n))
      return i.includes(e);
    if (Ia(i))
      return Et(i, e, !1, n);
    if ($c(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Ic(i)) {
      const l = s(i.before, e), u = s(i.after, e), c = l > 0, d = u < 0;
      return a(i.before, i.after) ? d && c : c || d;
    }
    return Oc(i) ? s(e, i.after) > 0 : _c(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Ug(e, t, n, r, o) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: u, today: c } = t, { isSameDay: d, isSameMonth: p, startOfMonth: h, isBefore: m, endOfMonth: y, isAfter: g } = o, b = n && h(n), v = r && y(r), k = {
    [Me.focused]: [],
    [Me.outside]: [],
    [Me.disabled]: [],
    [Me.hidden]: [],
    [Me.today]: []
  }, M = {};
  for (const w of e) {
    const { date: S, displayMonth: D } = w, x = !!(D && !p(S, D)), T = !!(b && m(S, b)), E = !!(v && g(S, v)), N = !!(s && Dt(S, s, o)), R = !!(a && Dt(S, a, o)) || T || E || // Broadcast calendar will show outside days as default
    !u && !l && x || u && l === !1 && x, I = d(S, c ?? o.today());
    x && k.outside.push(w), N && k.disabled.push(w), R && k.hidden.push(w), I && k.today.push(w), i && Object.keys(i).forEach((O) => {
      const H = i?.[O];
      H && Dt(S, H, o) && (M[O] ? M[O].push(w) : M[O] = [w]);
    });
  }
  return (w) => {
    const S = {
      [Me.focused]: !1,
      [Me.disabled]: !1,
      [Me.hidden]: !1,
      [Me.outside]: !1,
      [Me.today]: !1
    }, D = {};
    for (const x in k) {
      const T = k[x];
      S[x] = T.some((E) => E === w);
    }
    for (const x in M)
      D[x] = M[x].some((T) => T === w);
    return {
      ...S,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function Yg(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[Me[s]] ? o.push(t[Me[s]]) : t[at[s]] && o.push(t[at[s]]), o), [t[se.Day]]);
}
function jg(e) {
  return {
    ...Fg,
    ...e
  };
}
function Vg(e) {
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
function Oa() {
  const e = {};
  for (const t in se)
    e[se[t]] = `rdp-${se[t]}`;
  for (const t in Me)
    e[Me[t]] = `rdp-${Me[t]}`;
  for (const t in at)
    e[at[t]] = `rdp-${at[t]}`;
  for (const t in Ge)
    e[Ge[t]] = `rdp-${Ge[t]}`;
  return e;
}
function zc(e, t, n) {
  return (n ?? new Je(t)).formatMonthYear(e);
}
const Kg = zc;
function qg(e, t, n) {
  return (n ?? new Je(t)).format(e, "d");
}
function Gg(e, t = bt) {
  return t.format(e, "LLLL");
}
function Zg(e, t, n) {
  return (n ?? new Je(t)).format(e, "cccccc");
}
function Xg(e, t = bt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Qg() {
  return "";
}
function Bc(e, t = bt) {
  return t.format(e, "yyyy");
}
const Jg = Bc, ey = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: zc,
  formatDay: qg,
  formatMonthCaption: Kg,
  formatMonthDropdown: Gg,
  formatWeekNumber: Xg,
  formatWeekNumberHeader: Qg,
  formatWeekdayName: Zg,
  formatYearCaption: Jg,
  formatYearDropdown: Bc
}, Symbol.toStringTag, { value: "Module" }));
function ty(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...ey,
    ...e
  };
}
function ny(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: u } = o;
  return l({
    start: a(e),
    end: i(e)
  }).map((p) => {
    const h = r.formatMonthDropdown(p, o), m = u(p), y = t && p < s(t) || n && p > s(n) || !1;
    return { value: m, label: h, disabled: y };
  });
}
function ry(e, t = {}, n = {}) {
  let r = { ...t?.[se.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function oy(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(o, a);
    s.push(i);
  }
  return s;
}
function sy(e, t, n, r, o = !1) {
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
function Wc(e, t, n, r) {
  let o = (r ?? new Je(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const ay = Wc;
function Fc(e, t, n) {
  return (n ?? new Je(t)).formatMonthYear(e);
}
const iy = Fc;
function ly(e, t, n, r) {
  let o = (r ?? new Je(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function cy(e) {
  return "Choose the Month";
}
function uy() {
  return "";
}
function dy(e) {
  return "Go to the Next Month";
}
function fy(e) {
  return "Go to the Previous Month";
}
function py(e, t, n) {
  return (n ?? new Je(t)).format(e, "cccc");
}
function hy(e, t) {
  return `Week ${e}`;
}
function my(e) {
  return "Week Number";
}
function gy(e) {
  return "Choose the Year";
}
const yy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: iy,
  labelDay: ay,
  labelDayButton: Wc,
  labelGrid: Fc,
  labelGridcell: ly,
  labelMonthDropdown: cy,
  labelNav: uy,
  labelNext: dy,
  labelPrevious: fy,
  labelWeekNumber: hy,
  labelWeekNumberHeader: my,
  labelWeekday: py,
  labelYearDropdown: gy
}, Symbol.toStringTag, { value: "Module" })), Tr = (e) => e instanceof HTMLElement ? e : null, hs = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], by = (e) => Tr(e.querySelector("[data-animated-month]")), ms = (e) => Tr(e.querySelector("[data-animated-caption]")), gs = (e) => Tr(e.querySelector("[data-animated-weeks]")), vy = (e) => Tr(e.querySelector("[data-animated-nav]")), wy = (e) => Tr(e.querySelector("[data-animated-weekdays]"));
function ky(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const a = K(null), i = K(r), l = K(!1);
  Eo(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const c = s.isSameMonth(r[0].date, u[0].date), d = s.isAfter(r[0].date, u[0].date), p = d ? n[Ge.caption_after_enter] : n[Ge.caption_before_enter], h = d ? n[Ge.weeks_after_enter] : n[Ge.weeks_before_enter], m = a.current, y = e.current.cloneNode(!0);
    if (y instanceof HTMLElement ? (hs(y).forEach((k) => {
      if (!(k instanceof HTMLElement))
        return;
      const M = by(k);
      M && k.contains(M) && k.removeChild(M);
      const w = ms(k);
      w && w.classList.remove(p);
      const S = gs(k);
      S && S.classList.remove(h);
    }), a.current = y) : a.current = null, l.current || c || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const g = m instanceof HTMLElement ? hs(m) : [], b = hs(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && g && g.every((v) => v instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const v = vy(e.current);
      v && (v.style.zIndex = "1"), b.forEach((k, M) => {
        const w = g[M];
        if (!w)
          return;
        k.style.position = "relative", k.style.overflow = "hidden";
        const S = ms(k);
        S && S.classList.add(p);
        const D = gs(k);
        D && D.classList.add(h);
        const x = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), S && S.classList.remove(p), D && D.classList.remove(h), k.style.position = "", k.style.overflow = "", k.contains(w) && k.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const T = wy(w);
        T && (T.style.opacity = "0");
        const E = ms(w);
        E && (E.classList.add(d ? n[Ge.caption_before_exit] : n[Ge.caption_after_exit]), E.addEventListener("animationend", x));
        const N = gs(w);
        N && N.classList.add(d ? n[Ge.weeks_before_exit] : n[Ge.weeks_after_exit]), k.insertBefore(w, k.firstChild);
      });
    }
  });
}
function xy(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: c, differenceInCalendarMonths: d, endOfBroadcastWeek: p, endOfISOWeek: h, endOfMonth: m, endOfWeek: y, isAfter: g, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: k } = r, M = l ? b(o, r) : a ? v(o) : k(o), w = l ? p(s) : a ? h(m(s)) : y(m(s)), S = c(w, M), D = d(s, o) + 1, x = [];
  for (let N = 0; N <= S; N++) {
    const R = u(M, N);
    if (t && g(R, t))
      break;
    x.push(R);
  }
  const E = (l ? 35 : 42) * D;
  if (i && x.length < E) {
    const N = E - x.length;
    for (let R = 0; R < N; R++) {
      const I = u(x[x.length - 1], 1);
      x.push(I);
    }
  }
  return x;
}
function Cy(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Sy(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let a = 0; a < o; a++) {
    const i = r.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function Vi(e, t, n, r) {
  const { month: o, defaultMonth: s, today: a = r.today(), numberOfMonths: i = 1 } = e;
  let l = o || s || a;
  const { differenceInCalendarMonths: u, addMonths: c, startOfMonth: d } = r;
  if (n && u(n, l) < i - 1) {
    const p = -1 * (i - 1);
    l = c(n, p);
  }
  return t && u(l, t) < 0 && (l = t), d(l);
}
function Ty(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: u, getWeek: c, startOfBroadcastWeek: d, startOfISOWeek: p, startOfWeek: h } = r, m = e.reduce((y, g) => {
    const b = n.broadcastCalendar ? d(g, r) : n.ISOWeek ? p(g) : h(g), v = n.broadcastCalendar ? s(g) : n.ISOWeek ? a(i(g)) : l(i(g)), k = t.filter((D) => D >= b && D <= v), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && k.length < M) {
      const D = t.filter((x) => {
        const T = M - k.length;
        return x > v && x <= o(v, T);
      });
      k.push(...D);
    }
    const w = k.reduce((D, x) => {
      const T = n.ISOWeek ? u(x) : c(x), E = D.find((R) => R.weekNumber === T), N = new Pc(x, g, r);
      return E ? E.days.push(N) : D.push(new mg(T, [N])), D;
    }, []), S = new hg(g, w);
    return y.push(S), y;
  }, []);
  return n.reverseMonths ? m.reverse() : m;
}
function My(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: u, newDate: c, today: d } = t, { fromYear: p, toYear: h, fromMonth: m, toMonth: y } = e;
  !n && m && (n = m), !n && p && (n = t.newDate(p, 0, 1)), !r && y && (r = y), !r && h && (r = c(h, 11, 31));
  const g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : p ? n = c(p, 0, 1) : !n && g && (n = o(l(e.today ?? d(), -100))), r ? r = i(r) : h ? r = c(h, 11, 31) : !r && g && (r = u(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function Ey(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? s : 1, c = a(e);
  if (!t)
    return i(c, u);
  if (!(l(t, e) < s))
    return i(c, u);
}
function Dy(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? s ?? 1 : 1, c = a(e);
  if (!t)
    return i(c, -u);
  if (!(l(c, t) <= 0))
    return i(c, -u);
}
function Ny(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Ao(e, t) {
  const [n, r] = V(e);
  return [t === void 0 ? n : t, r];
}
function Ry(e, t) {
  const [n, r] = My(e, t), { startOfMonth: o, endOfMonth: s } = t, a = Vi(e, n, r, t), [i, l] = Ao(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  J(() => {
    const S = Vi(e, n, r, t);
    l(S);
  }, [e.timeZone]);
  const u = Sy(i, r, e, t), c = xy(u, e.endMonth ? s(e.endMonth) : void 0, e, t), d = Ty(u, c, e, t), p = Ny(d), h = Cy(d), m = Dy(i, n, e, t), y = Ey(i, r, e, t), { disableNavigation: g, onMonthChange: b } = e, v = (S) => p.some((D) => D.days.some((x) => x.isEqualTo(S))), k = (S) => {
    if (g)
      return;
    let D = o(S);
    n && D < o(n) && (D = o(n)), r && D > o(r) && (D = o(r)), l(D), b?.(D);
  };
  return {
    months: d,
    weeks: p,
    days: h,
    navStart: n,
    navEnd: r,
    previousMonth: m,
    nextMonth: y,
    goToMonth: k,
    goToDay: (S) => {
      v(S) || k(S.date);
    }
  };
}
var ft;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ft || (ft = {}));
function Ki(e) {
  return !e[Me.disabled] && !e[Me.hidden] && !e[Me.outside];
}
function Ay(e, t, n, r) {
  let o, s = -1;
  for (const a of e) {
    const i = t(a);
    Ki(i) && (i[Me.focused] && s < ft.FocusedModifier ? (o = a, s = ft.FocusedModifier) : r?.isEqualTo(a) && s < ft.LastFocused ? (o = a, s = ft.LastFocused) : n(a.date) && s < ft.Selected ? (o = a, s = ft.Selected) : i[Me.today] && s < ft.Today && (o = a, s = ft.Today));
  }
  return o || (o = e.find((a) => Ki(t(a)))), o;
}
function Py(e, t, n, r, o, s, a) {
  const { ISOWeek: i, broadcastCalendar: l } = s, { addDays: u, addMonths: c, addWeeks: d, addYears: p, endOfBroadcastWeek: h, endOfISOWeek: m, endOfWeek: y, max: g, min: b, startOfBroadcastWeek: v, startOfISOWeek: k, startOfWeek: M } = a;
  let S = {
    day: u,
    week: d,
    month: c,
    year: p,
    startOfWeek: (D) => l ? v(D, a) : i ? k(D) : M(D),
    endOfWeek: (D) => l ? h(D) : i ? m(D) : y(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? S = g([r, S]) : t === "after" && o && (S = b([o, S])), S;
}
function Uc(e, t, n, r, o, s, a, i = 0) {
  if (i > 365)
    return;
  const l = Py(e, t, n.date, r, o, s, a), u = !!(s.disabled && Dt(l, s.disabled, a)), c = !!(s.hidden && Dt(l, s.hidden, a)), d = l, p = new Pc(l, d, a);
  return !u && !c ? p : Uc(e, t, p, r, o, s, a, i + 1);
}
function Ly(e, t, n, r, o) {
  const { autoFocus: s } = e, [a, i] = V(), l = Ay(t.days, n, r || (() => !1), a), [u, c] = V(s ? l : void 0);
  return {
    isFocusTarget: (y) => !!l?.isEqualTo(y),
    setFocused: c,
    focused: u,
    blur: () => {
      i(u), c(void 0);
    },
    moveFocus: (y, g) => {
      if (!u)
        return;
      const b = Uc(y, g, u, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((k) => k.isEqualTo(b)) || (t.goToDay(b), c(b)));
    }
  };
}
function Iy(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = Ao(n, o ? n : void 0), i = o ? n : s, { isSameDay: l } = t, u = (h) => i?.some((m) => l(m, h)) ?? !1, { min: c, max: d } = e;
  return {
    selected: i,
    select: (h, m, y) => {
      let g = [...i ?? []];
      if (u(h)) {
        if (i?.length === c || r && i?.length === 1)
          return;
        g = i?.filter((b) => !l(b, h));
      } else
        i?.length === d ? g = [h] : g = [...g, h];
      return o || a(g), o?.(g, h, m, y), g;
    },
    isSelected: u
  };
}
function Oy(e, t, n = 0, r = 0, o = !1, s = bt) {
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
function _y(e, t, n = bt) {
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
function qi(e, t, n = bt) {
  return Et(e, t.from, !1, n) || Et(e, t.to, !1, n) || Et(t, e.from, !1, n) || Et(t, e.to, !1, n);
}
function $y(e, t, n = bt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Et(e, i, !1, n) : Hc(i, n) ? i.some((l) => Et(e, l, !1, n)) : Ia(i) ? i.from && i.to ? qi(e, { from: i.from, to: i.to }, n) : !1 : $c(i) ? _y(e, i.dayOfWeek, n) : Ic(i) ? n.isAfter(i.before, i.after) ? qi(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : Dt(e.from, i, n) || Dt(e.to, i, n) : Oc(i) || _c(i) ? Dt(e.from, i, n) || Dt(e.to, i, n) : !1))
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
function Hy(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: a } = e, [i, l] = Ao(o, a ? o : void 0), u = a ? o : i;
  return {
    selected: u,
    select: (p, h, m) => {
      const { min: y, max: g } = e, b = p ? Oy(p, u, y, g, s, t) : void 0;
      return r && n && b?.from && b.to && $y({ from: b.from, to: b.to }, n, t) && (b.from = p, b.to = void 0), a || l(b), a?.(b, p, h, m), b;
    },
    isSelected: (p) => u && Et(u, p, !1, t)
  };
}
function zy(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = Ao(n, o ? n : void 0), i = o ? n : s, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, p, h) => {
      let m = d;
      return !r && i && i && l(d, i) && (m = void 0), o || a(m), o?.(m, d, p, h), m;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function By(e, t) {
  const n = zy(e, t), r = Iy(e, t), o = Hy(e, t);
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
function Wy(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Be(t.today, t.timeZone)), t.month && (t.month = new Be(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Be(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Be(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Be(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Be(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((de) => new Be(de, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Be(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Be(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: a, classNames: i } = an(() => {
    const de = { ...La, ...t.locale };
    return {
      dateLib: new Je({
        locale: de,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: jg(t.components),
      formatters: ty(t.formatters),
      labels: { ...yy, ...t.labels },
      locale: de,
      classNames: { ...Oa(), ...t.classNames }
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
  ]), { captionLayout: l, mode: u, navLayout: c, numberOfMonths: d = 1, onDayBlur: p, onDayClick: h, onDayFocus: m, onDayKeyDown: y, onDayMouseEnter: g, onDayMouseLeave: b, onNextClick: v, onPrevClick: k, showWeekNumber: M, styles: w } = t, { formatCaption: S, formatDay: D, formatMonthDropdown: x, formatWeekNumber: T, formatWeekNumberHeader: E, formatWeekdayName: N, formatYearDropdown: R } = r, I = Ry(t, s), { days: O, months: H, navStart: W, navEnd: q, previousMonth: L, nextMonth: P, goToMonth: j } = I, Z = Ug(O, t, W, q, s), { isSelected: G, select: Q, selected: re } = By(t, s) ?? {}, { blur: $, focused: B, isFocusTarget: F, moveFocus: ee, setFocused: he } = Ly(t, I, Z, G ?? (() => !1), s), { labelDayButton: ge, labelGridcell: Ee, labelGrid: Oe, labelMonthDropdown: et, labelNav: It, labelPrevious: Zn, labelNext: Xn, labelWeekday: Pr, labelWeekNumber: Lr, labelWeekNumberHeader: Ir, labelYearDropdown: Or } = o, hn = an(() => oy(s, t.ISOWeek), [s, t.ISOWeek]), Qn = u !== void 0 || h !== void 0, mn = Y(() => {
    L && (j(L), k?.(L));
  }, [L, j, k]), gn = Y(() => {
    P && (j(P), v?.(P));
  }, [j, P, v]), _r = Y((de, Se) => (ie) => {
    ie.preventDefault(), ie.stopPropagation(), he(de), Q?.(de.date, Se, ie), h?.(de.date, Se, ie);
  }, [Q, h, he]), Ko = Y((de, Se) => (ie) => {
    he(de), m?.(de.date, Se, ie);
  }, [m, he]), qo = Y((de, Se) => (ie) => {
    $(), p?.(de.date, Se, ie);
  }, [$, p]), Go = Y((de, Se) => (ie) => {
    const fe = {
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
    if (fe[ie.key]) {
      ie.preventDefault(), ie.stopPropagation();
      const [De, me] = fe[ie.key];
      ee(De, me);
    }
    y?.(de.date, Se, ie);
  }, [ee, y, t.dir]), Zo = Y((de, Se) => (ie) => {
    g?.(de.date, Se, ie);
  }, [g]), $r = Y((de, Se) => (ie) => {
    b?.(de.date, Se, ie);
  }, [b]), Xo = Y((de) => (Se) => {
    const ie = Number(Se.target.value), fe = s.setMonth(s.startOfMonth(de), ie);
    j(fe);
  }, [s, j]), wt = Y((de) => (Se) => {
    const ie = Number(Se.target.value), fe = s.setYear(s.startOfMonth(de), ie);
    j(fe);
  }, [s, j]), { className: yn, style: bn } = an(() => ({
    className: [i[se.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[se.Root], ...t.style }
  }), [i, t.className, t.style, w]), Qo = Vg(t), tt = K(null);
  ky(tt, !!t.animate, {
    classNames: i,
    months: H,
    focused: B,
    dateLib: s
  });
  const Ot = {
    dayPickerProps: t,
    selected: re,
    select: Q,
    isSelected: G,
    months: H,
    nextMonth: P,
    previousMonth: L,
    goToMonth: j,
    getModifiers: Z,
    components: n,
    classNames: i,
    styles: w,
    labels: o,
    formatters: r
  };
  return X.createElement(
    Lc.Provider,
    { value: Ot },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? tt : void 0, className: yn, style: bn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Qo },
      X.createElement(
        n.Months,
        { className: i[se.Months], style: w?.[se.Months] },
        !t.hideNavigation && !c && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[se.Nav], style: w?.[se.Nav], "aria-label": It(), onPreviousClick: mn, onNextClick: gn, previousMonth: L, nextMonth: P }),
        H.map((de, Se) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[se.Month],
            style: w?.[se.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: Se,
            displayIndex: Se,
            calendarMonth: de
          },
          c === "around" && !t.hideNavigation && Se === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[se.PreviousMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": Zn(L), onClick: mn, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: i[se.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[se.MonthCaption], style: w?.[se.MonthCaption], calendarMonth: de, displayIndex: Se }, l?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: i[se.Dropdowns], style: w?.[se.Dropdowns] },
            (() => {
              const ie = l === "dropdown" || l === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: i[se.MonthsDropdown], "aria-label": et(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Xo(de.date), options: ny(de.date, W, q, r, s), style: w?.[se.Dropdown], value: s.getMonth(de.date) }) : X.createElement("span", { key: "month" }, x(de.date, s)), fe = l === "dropdown" || l === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: i[se.YearsDropdown], "aria-label": Or(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: wt(de.date), options: sy(W, q, r, s, !!t.reverseYears), style: w?.[se.Dropdown], value: s.getYear(de.date) }) : X.createElement("span", { key: "year" }, R(de.date, s));
              return s.getMonthYearOrder() === "year-first" ? [fe, ie] : [ie, fe];
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
            } }, S(de.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: i[se.CaptionLabel], role: "status", "aria-live": "polite" }, S(de.date, s.options, s))
          )),
          c === "around" && !t.hideNavigation && Se === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: i[se.NextMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": Xn(P), onClick: gn, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[se.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          Se === d - 1 && c === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[se.Nav], style: w?.[se.Nav], "aria-label": It(), onPreviousClick: mn, onNextClick: gn, previousMonth: L, nextMonth: P }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": Oe(de.date, s.options, s) || void 0, className: i[se.MonthGrid], style: w?.[se.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[se.Weekdays], style: w?.[se.Weekdays] },
              M && X.createElement(n.WeekNumberHeader, { "aria-label": Ir(s.options), className: i[se.WeekNumberHeader], style: w?.[se.WeekNumberHeader], scope: "col" }, E()),
              hn.map((ie) => X.createElement(n.Weekday, { "aria-label": Pr(ie, s.options, s), className: i[se.Weekday], key: String(ie), style: w?.[se.Weekday], scope: "col" }, N(ie, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[se.Weeks], style: w?.[se.Weeks] }, de.weeks.map((ie) => X.createElement(
              n.Week,
              { className: i[se.Week], key: ie.weekNumber, style: w?.[se.Week], week: ie },
              M && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: ie, style: w?.[se.WeekNumber], "aria-label": Lr(ie.weekNumber, {
                locale: a
              }), className: i[se.WeekNumber], scope: "row", role: "rowheader" }, T(ie.weekNumber, s)),
              ie.days.map((fe) => {
                const { date: De } = fe, me = Z(fe);
                if (me[Me.focused] = !me.hidden && !!B?.isEqualTo(fe), me[at.selected] = G?.(De) || me.selected, Ia(re)) {
                  const { from: _e, to: _t } = re;
                  me[at.range_start] = !!(_e && _t && s.isSameDay(De, _e)), me[at.range_end] = !!(_e && _t && s.isSameDay(De, _t)), me[at.range_middle] = Et(re, De, !0, s);
                }
                const Jo = ry(me, w, t.modifiersStyles), Hr = Yg(me, i, t.modifiersClassNames), vn = !Qn && !me.hidden ? Ee(De, me, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(De, "yyyy-MM-dd")}_${s.format(fe.displayMonth, "yyyy-MM")}`, day: fe, modifiers: me, className: Hr.join(" "), style: Jo, role: "gridcell", "aria-selected": me.selected || void 0, "aria-label": vn, "data-day": s.format(De, "yyyy-MM-dd"), "data-month": fe.outside ? s.format(De, "yyyy-MM") : void 0, "data-selected": me.selected || void 0, "data-disabled": me.disabled || void 0, "data-hidden": me.hidden || void 0, "data-outside": fe.outside || void 0, "data-focused": me.focused || void 0, "data-today": me.today || void 0 }, !me.hidden && Qn ? X.createElement(n.DayButton, { className: i[se.DayButton], style: w?.[se.DayButton], type: "button", day: fe, modifiers: me, disabled: me.disabled || void 0, tabIndex: F(fe) ? 0 : -1, "aria-label": ge(De, me, s.options, s), onClick: _r(fe, me), onBlur: qo(fe, me), onFocus: Ko(fe, me), onKeyDown: Go(fe, me), onMouseEnter: Zo(fe, me), onMouseLeave: $r(fe, me) }, D(De, s.options, s)) : !me.hidden && D(fe.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      X.createElement(n.Footer, { className: i[se.Footer], style: w?.[se.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Yc(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Yc(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function jc() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Yc(e)) && (r && (r += " "), r += t);
  return r;
}
const _a = "-", Fy = (e) => {
  const t = Yy(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(_a);
      return i[0] === "" && i.length !== 1 && i.shift(), Vc(i, t) || Uy(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && r[a] ? [...l, ...r[a]] : l;
    }
  };
}, Vc = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Vc(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(_a);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, Gi = /^\[(.+)\]$/, Uy = (e) => {
  if (Gi.test(e)) {
    const t = Gi.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
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
    Ys(n[o], r, o, t);
  return r;
}, Ys = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Zi(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (jy(o)) {
        Ys(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      Ys(a, Zi(t, s), n, r);
    });
  });
}, Zi = (e, t) => {
  let n = e;
  return t.split(_a).forEach((r) => {
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
}, js = "!", Vs = ":", Ky = Vs.length, qy = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let a = 0, i = 0, l = 0, u;
    for (let m = 0; m < o.length; m++) {
      let y = o[m];
      if (a === 0 && i === 0) {
        if (y === Vs) {
          s.push(o.slice(l, m)), l = m + Ky;
          continue;
        }
        if (y === "/") {
          u = m;
          continue;
        }
      }
      y === "[" ? a++ : y === "]" ? a-- : y === "(" ? i++ : y === ")" && i--;
    }
    const c = s.length === 0 ? o : o.substring(l), d = Gy(c), p = d !== c, h = u && u > l ? u - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: p,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + Vs, s = r;
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
}, Gy = (e) => e.endsWith(js) ? e.substring(0, e.length - 1) : e.startsWith(js) ? e.substring(1) : e, Zy = (e) => {
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
}, Xy = (e) => ({
  cache: Vy(e.cacheSize),
  parseClassName: qy(e),
  sortModifiers: Zy(e),
  ...Fy(e)
}), Qy = /\s+/, Jy = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(Qy);
  let l = "";
  for (let u = i.length - 1; u >= 0; u -= 1) {
    const c = i[u], {
      isExternal: d,
      modifiers: p,
      hasImportantModifier: h,
      baseClassName: m,
      maybePostfixModifierPosition: y
    } = n(c);
    if (d) {
      l = c + (l.length > 0 ? " " + l : l);
      continue;
    }
    let g = !!y, b = r(g ? m.substring(0, y) : m);
    if (!b) {
      if (!g) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (b = r(m), !b) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      g = !1;
    }
    const v = s(p).join(":"), k = h ? v + js : v, M = k + b;
    if (a.includes(M))
      continue;
    a.push(M);
    const w = o(b, g);
    for (let S = 0; S < w.length; ++S) {
      const D = w[S];
      a.push(k + D);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function eb() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Kc(t)) && (r && (r += " "), r += n);
  return r;
}
const Kc = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Kc(e[r])) && (n && (n += " "), n += t);
  return n;
};
function tb(e, ...t) {
  let n, r, o, s = a;
  function a(l) {
    const u = t.reduce((c, d) => d(c), e());
    return n = Xy(u), r = n.cache.get, o = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const u = r(l);
    if (u)
      return u;
    const c = Jy(l, n);
    return o(l, c), c;
  }
  return function() {
    return s(eb.apply(null, arguments));
  };
}
const Pe = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, qc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Gc = /^\((?:(\w[\w-]*):)?(.+)\)$/i, nb = /^\d+\/\d+$/, rb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ob = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, sb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ab = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ib = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, xn = (e) => nb.test(e), pe = (e) => !!e && !Number.isNaN(Number(e)), Ut = (e) => !!e && Number.isInteger(Number(e)), ys = (e) => e.endsWith("%") && pe(e.slice(0, -1)), Ct = (e) => rb.test(e), lb = () => !0, cb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ob.test(e) && !sb.test(e)
), Zc = () => !1, ub = (e) => ab.test(e), db = (e) => ib.test(e), fb = (e) => !te(e) && !ne(e), pb = (e) => jn(e, Jc, Zc), te = (e) => qc.test(e), en = (e) => jn(e, eu, cb), bs = (e) => jn(e, bb, pe), Xi = (e) => jn(e, Xc, Zc), hb = (e) => jn(e, Qc, db), Yr = (e) => jn(e, tu, ub), ne = (e) => Gc.test(e), nr = (e) => Vn(e, eu), mb = (e) => Vn(e, vb), Qi = (e) => Vn(e, Xc), gb = (e) => Vn(e, Jc), yb = (e) => Vn(e, Qc), jr = (e) => Vn(e, tu, !0), jn = (e, t, n) => {
  const r = qc.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Vn = (e, t, n = !1) => {
  const r = Gc.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Xc = (e) => e === "position" || e === "percentage", Qc = (e) => e === "image" || e === "url", Jc = (e) => e === "length" || e === "size" || e === "bg-size", eu = (e) => e === "length", bb = (e) => e === "number", vb = (e) => e === "family-name", tu = (e) => e === "shadow", wb = () => {
  const e = Pe("color"), t = Pe("font"), n = Pe("text"), r = Pe("font-weight"), o = Pe("tracking"), s = Pe("leading"), a = Pe("breakpoint"), i = Pe("container"), l = Pe("spacing"), u = Pe("radius"), c = Pe("shadow"), d = Pe("inset-shadow"), p = Pe("text-shadow"), h = Pe("drop-shadow"), m = Pe("blur"), y = Pe("perspective"), g = Pe("aspect"), b = Pe("ease"), v = Pe("animate"), k = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], M = () => [
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
  ], w = () => [...M(), ne, te], S = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], x = () => [ne, te, l], T = () => [xn, "full", "auto", ...x()], E = () => [Ut, "none", "subgrid", ne, te], N = () => ["auto", {
    span: ["full", Ut, ne, te]
  }, Ut, ne, te], R = () => [Ut, "auto", ne, te], I = () => ["auto", "min", "max", "fr", ne, te], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...x()], q = () => [xn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], L = () => [e, ne, te], P = () => [...M(), Qi, Xi, {
    position: [ne, te]
  }], j = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Z = () => ["auto", "cover", "contain", gb, pb, {
    size: [ne, te]
  }], G = () => [ys, nr, en], Q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    ne,
    te
  ], re = () => ["", pe, nr, en], $ = () => ["solid", "dashed", "dotted", "double"], B = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => [pe, ys, Qi, Xi], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    ne,
    te
  ], he = () => ["none", pe, ne, te], ge = () => ["none", pe, ne, te], Ee = () => [pe, ne, te], Oe = () => [xn, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ct],
      breakpoint: [Ct],
      color: [lb],
      container: [Ct],
      "drop-shadow": [Ct],
      ease: ["in", "out", "in-out"],
      font: [fb],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ct],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ct],
      shadow: [Ct],
      spacing: ["px", pe],
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
        aspect: ["auto", "square", xn, te, ne, g]
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
        columns: [pe, te, ne, i]
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
        z: [Ut, "auto", ne, te]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [xn, "full", "auto", i, ...x()]
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
        flex: [pe, xn, "auto", "initial", "none", te]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", pe, ne, te]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", pe, ne, te]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ut, "first", "last", "none", ne, te]
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
        text: ["base", n, nr, en]
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
        font: [r, ne, bs]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ys, te]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [mb, te, t]
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
        tracking: [o, ne, te]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [pe, "none", ne, bs]
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
        "list-image": ["none", ne, te]
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
        list: ["disc", "decimal", "none", ne, te]
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
        placeholder: L()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: L()
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
        decoration: [pe, "from-font", "auto", ne, en]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: L()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [pe, "auto", ne, te]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ne, te]
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
        content: ["none", ne, te]
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
        bg: j()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Z()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ut, ne, te],
          radial: ["", ne, te],
          conic: [Ut, ne, te]
        }, yb, hb]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: L()
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
        from: L()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: L()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: L()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: Q()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Q()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Q()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Q()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Q()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Q()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Q()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Q()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Q()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Q()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Q()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Q()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Q()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Q()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Q()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: re()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": re()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": re()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": re()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": re()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": re()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": re()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": re()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": re()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": re()
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
        "divide-y": re()
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
        border: L()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": L()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": L()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": L()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": L()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": L()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": L()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": L()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": L()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: L()
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
        "outline-offset": [pe, ne, te]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", pe, nr, en]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: L()
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
          jr,
          Yr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: L()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, jr, Yr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": L()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: re()
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
        ring: L()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [pe, en]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": L()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": re()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": L()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, jr, Yr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": L()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [pe, ne, te]
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
        "mask-linear": [pe]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": F()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": F()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": L()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": L()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": F()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": F()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": L()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": L()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": F()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": F()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": L()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": L()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": F()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": F()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": L()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": L()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": F()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": F()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": L()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": L()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": F()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": F()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": L()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": L()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": F()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": F()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": L()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": L()
      }],
      "mask-image-radial": [{
        "mask-radial": [ne, te]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": F()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": F()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": L()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": L()
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
        "mask-conic-from": F()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": F()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": L()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": L()
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
        mask: j()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Z()
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
        mask: ["none", ne, te]
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
          ne,
          te
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
        brightness: [pe, ne, te]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [pe, ne, te]
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
          jr,
          Yr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": L()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", pe, ne, te]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [pe, ne, te]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", pe, ne, te]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [pe, ne, te]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", pe, ne, te]
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
          ne,
          te
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
        "backdrop-brightness": [pe, ne, te]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [pe, ne, te]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", pe, ne, te]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [pe, ne, te]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", pe, ne, te]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [pe, ne, te]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [pe, ne, te]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", pe, ne, te]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ne, te]
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
        duration: [pe, "initial", ne, te]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", b, ne, te]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [pe, ne, te]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, ne, te]
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
        perspective: [y, ne, te]
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
        scale: ge()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ge()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ge()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ge()
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
        skew: Ee()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ee()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ee()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ne, te, "", "none", "gpu", "cpu"]
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
        accent: L()
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
        caret: L()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ne, te]
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
        "will-change": ["auto", "scroll", "contents", "transform", ne, te]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...L()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [pe, nr, en, bs]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...L()]
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
}, kb = /* @__PURE__ */ tb(wb);
function ce(...e) {
  return kb(jc(e));
}
function Ji(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Po(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Ji(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Ji(e[o], null);
        }
      };
  };
}
function We(...e) {
  return C.useCallback(Po(...e), e);
}
// @__NO_SIDE_EFFECTS__
function gr(e) {
  const t = /* @__PURE__ */ Cb(e), n = C.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = C.Children.toArray(s), l = i.find(Tb);
    if (l) {
      const u = l.props.children, c = i.map((d) => d === l ? C.Children.count(u) > 1 ? C.Children.only(null) : C.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ f(t, { ...a, ref: o, children: C.isValidElement(u) ? C.cloneElement(u, void 0, c) : null });
    }
    return /* @__PURE__ */ f(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var xb = /* @__PURE__ */ gr("Slot");
// @__NO_SIDE_EFFECTS__
function Cb(e) {
  const t = C.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (C.isValidElement(o)) {
      const a = Eb(o), i = Mb(s, o.props);
      return o.type !== C.Fragment && (i.ref = r ? Po(r, a) : a), C.cloneElement(o, i);
    }
    return C.Children.count(o) > 1 ? C.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var nu = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Sb(e) {
  const t = ({ children: n }) => /* @__PURE__ */ f(Ie, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = nu, t;
}
function Tb(e) {
  return C.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === nu;
}
function Mb(e, t) {
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
function Eb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const el = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, tl = jc, Db = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return tl(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((u) => {
    const c = n?.[u], d = s?.[u];
    if (c === null) return null;
    const p = el(c) || el(d);
    return o[u][p];
  }), i = n && Object.entries(n).reduce((u, c) => {
    let [d, p] = c;
    return p === void 0 || (u[d] = p), u;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
    let { class: d, className: p, ...h } = c;
    return Object.entries(h).every((m) => {
      let [y, g] = m;
      return Array.isArray(g) ? g.includes({
        ...s,
        ...i
      }[y]) : {
        ...s,
        ...i
      }[y] === g;
    }) ? [
      ...u,
      d,
      p
    ] : u;
  }, []);
  return tl(e, a, l, n?.class, n?.className);
}, Ks = Db(
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
function Vt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ f(
    r ? xb : "button",
    {
      "data-slot": "button",
      className: ce(Ks({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function Nb({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const l = Oa();
  return /* @__PURE__ */ f(
    Wy,
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
          Ks({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: ce(
          Ks({ variant: o }),
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
        Chevron: ({ className: u, orientation: c, ...d }) => c === "left" ? /* @__PURE__ */ f(yp, { className: ce("size-4", u), ...d }) : c === "right" ? /* @__PURE__ */ f(
          bp,
          {
            className: ce("size-4", u),
            ...d
          }
        ) : /* @__PURE__ */ f(vp, { className: ce("size-4", u), ...d }),
        DayButton: Rb,
        WeekNumber: ({ children: u, ...c }) => /* @__PURE__ */ f("td", { ...c, children: /* @__PURE__ */ f("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: u }) }),
        ...a
      },
      ...i
    }
  );
}
function Rb({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Oa(), s = C.useRef(null);
  return C.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ f(
    Vt,
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
let Rn = null;
const ru = /* @__PURE__ */ new Map(), Ab = /* @__PURE__ */ new Map();
function so() {
  if (!Rn) return;
  const e = Rn;
  Rn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Pb(e) {
  return Rn?.pillDate === e;
}
function Lb({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = K(null), a = Lo(e);
  J(() => {
    const v = (k) => {
      k.key === "Escape" && (k.stopPropagation(), k.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), J(() => {
    const v = (M) => {
      s.current && !s.current.contains(M.target) && (M.target.closest(".date-pill") || o());
    }, k = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(k), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const i = Y((v) => {
    v && r(Pn(v)), o();
  }, [r, o]), l = Y((v) => {
    const k = /* @__PURE__ */ new Date();
    k.setDate(k.getDate() + v), r(Pn(k)), o();
  }, [r, o]), u = Y(() => {
    const k = (/* @__PURE__ */ new Date()).getDay(), M = k === 0 ? 1 : 8 - k, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + M), r(Pn(w)), o();
  }, [r, o]), c = /* @__PURE__ */ new Date(), d = c.toDateString(), p = new Date(c);
  p.setDate(p.getDate() + 1);
  const h = p.toDateString(), m = c.getDay(), y = m === 0 ? 1 : 8 - m, g = new Date(c);
  g.setDate(g.getDate() + y);
  const b = g.toDateString();
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
            Nb,
            {
              mode: "single",
              selected: a,
              onSelect: i
            }
          ) }),
          /* @__PURE__ */ f("div", { className: "border-t border-border" }),
          /* @__PURE__ */ A("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ f(
              Vt,
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
              Vt,
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
              Vt,
              {
                variant: "outline",
                size: "sm",
                className: ce(
                  "rounded-full text-xs",
                  a.toDateString() === b && "ring-2 ring-primary"
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
function Ib(e, t, n) {
  if (Pb(t)) {
    so();
    return;
  }
  so();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, a = 320, i = 420, l = 10, u = 16, c = s - r.bottom - l - u, d = r.top - l - u, p = c >= i ? "below" : d >= i ? "above" : c >= d ? "below" : "above";
  let h;
  p === "below" ? h = r.bottom + l : h = r.top - i - l;
  const m = r.left + r.width / 2;
  let y = m - a / 2;
  y + a > o - u && (y = o - a - u), y < u && (y = u);
  const g = document.createElement("div");
  g.setAttribute("data-date-picker-standalone", t), g.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(g), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    g.addEventListener(w, (S) => {
      S.stopPropagation();
    }, !1);
  });
  const v = sh(g);
  Rn = { container: g, root: v, pillDate: t };
  const k = () => {
    so();
  }, M = (w) => {
    const S = ru.get(t);
    S && S(w);
  };
  v.render(
    /* @__PURE__ */ f(
      Lb,
      {
        currentDate: t,
        theme: n,
        position: { top: h, left: y, direction: p, pillCenter: m },
        onSelectDate: M,
        onClose: k
      }
    )
  );
}
function Ob({ node: e, updateAttributes: t, selected: n }) {
  const r = K(null), o = e.attrs.date || An(), s = ou(o), a = $a(o), i = Y(() => {
    if (!r.current) return "";
    const l = r.current.closest(".markdown-editor-container");
    if (l) {
      const c = l.getAttribute("data-theme");
      if (c) return c;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return J(() => (ru.set(o, (l) => {
    t({ date: l });
  }), Ab.set(o, i), () => {
  }), [o, t, i]), J(() => {
    const l = r.current;
    if (!l) return;
    const u = (c) => {
      c.preventDefault(), c.stopPropagation();
      const d = l.getAttribute("data-date") || An(), p = i();
      Ib(l, d, p);
    };
    return l.addEventListener("click", u), () => l.removeEventListener("click", u);
  }, [i]), J(() => {
    const l = r.current?.closest(".ProseMirror") || document, u = () => {
      Rn && so();
    };
    return l.addEventListener("scroll", u, { passive: !0 }), () => {
      l.removeEventListener("scroll", u);
    };
  }, []), /* @__PURE__ */ f(xr, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: r,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ f(nc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ f("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Lo(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function An() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function fr(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function Pn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function ou(e) {
  const t = Lo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function _b(e) {
  return Lo(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function nn(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return An();
  if (n === "tomorrow") return fr(1);
  if (n === "yesterday") return fr(-1);
  if (n === "next monday") {
    const i = (/* @__PURE__ */ new Date()).getDay(), l = i === 0 ? 1 : 8 - i;
    return fr(l);
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
      return Pn(c);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const a = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return Pn(a);
  }
  return null;
}
function $a(e) {
  const t = Lo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const $b = new Ve("datePillPaste"), Hb = Mo.create({
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
        default: An(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = ou(n), o = $a(n);
    return [
      "span",
      Bn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return To(Ob, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || An();
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
    const e = new qe({
      find: /@today\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(An()).run();
      }
    }), t = new qe({
      find: /@tomorrow\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(fr(1)).run();
      }
    }), n = new qe({
      find: /@yesterday\s$/,
      handler: ({ range: c, chain: d }) => {
        d().deleteRange(c).insertDatePill(fr(-1)).run();
      }
    }), r = new qe({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: c, chain: d, match: p }) => {
        d().deleteRange(c).insertDatePill(p[1]).run();
      }
    }), o = new qe({
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
          const y = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(y, m, parseInt(p[2], 10));
          d().deleteRange(c).insertDatePill(Pn(g)).run();
        }
      }
    }), s = new qe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: c, chain: d, match: p }) => {
        const h = nn(p[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), a = new qe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: c, chain: d, match: p }) => {
        const h = nn(p[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), i = new qe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: c, chain: d, match: p }) => {
        d().deleteRange(c).insertDatePill(p[1]).run();
      }
    }), l = new qe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: c, chain: d, match: p }) => {
        const h = nn(p[1]);
        h && d().deleteRange(c).insertDatePill(h).run();
      }
    }), u = new qe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: c, chain: d, match: p }) => {
        const h = nn(p[1]);
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
        key: $b,
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
              if (nn(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: c } = t, { tr: d, schema: p } = c, h = [];
            let m = 0;
            const y = new RegExp(a.source, a.flags);
            let g;
            for (; (g = y.exec(o)) !== null; ) {
              const M = g[1], w = nn(M);
              if (w) {
                const S = o.slice(m, g.index);
                S && h.push(p.text(S)), h.push(e.create({ date: w })), m = g.index + g[0].length;
              }
            }
            const b = o.slice(m);
            if (b && h.push(p.text(b)), h.length === 0) return !1;
            const v = p.nodes.doc.create(
              null,
              p.nodes.paragraph.create(null, h)
            ), { $from: k } = c.selection;
            if (k.parent.type.name === "paragraph") {
              const M = d;
              let w = c.selection.from;
              for (const S of h)
                M.insert(w, S), w += S.nodeSize;
              M.delete(c.selection.from, c.selection.to), t.dispatch(M);
            } else
              d.replaceSelectionWith(v), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function zb({ node: e, selected: t }) {
  const n = K(null), r = e.attrs.tag || "", o = Y((s) => {
    s.preventDefault(), s.stopPropagation();
  }, []);
  return /* @__PURE__ */ f(xr, { as: "span", className: "inline", children: /* @__PURE__ */ A(
    "span",
    {
      ref: n,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": r,
      onClick: o,
      children: [
        /* @__PURE__ */ f(wp, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ f("span", { className: "tag-text", children: r })
      ]
    }
  ) });
}
function ir(e) {
  return /[a-zA-Z]/.test(e) && /^[a-zA-Z0-9_-]+$/.test(e);
}
function ao(e) {
  return e.toLowerCase().trim();
}
const Bb = new Ve("tagPillPaste"), Wb = Mo.create({
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
      Bn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return To(zb, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = ao(e);
        return ir(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return [new qe({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = ao(r[1]);
        if (ir(o)) {
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
        key: Bb,
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
              if (ir(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: c } = t, { tr: d, schema: p } = c, h = [];
            let m = 0;
            const y = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let g;
            for (; (g = y.exec(o)) !== null; ) {
              const k = ao(g[1]);
              if (ir(k)) {
                const M = g[0], w = M.startsWith(" ") || M.startsWith(`
`) ? 1 : 0, S = o.slice(m, g.index + w);
                S && h.push(p.text(S)), h.push(e.create({ tag: k })), m = g.index + M.length;
              }
            }
            const b = o.slice(m);
            if (b && h.push(p.text(b)), h.length === 0) return !1;
            const { $from: v } = c.selection;
            if (v.parent.type.name === "paragraph") {
              const k = d;
              let M = c.selection.from;
              for (const w of h)
                k.insert(M, w), M += w.nodeSize;
              k.delete(c.selection.from, c.selection.to), t.dispatch(k);
            } else {
              const k = p.nodes.doc.create(
                null,
                p.nodes.paragraph.create(null, h)
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
function su({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = V(""), [a, i] = V(""), [l, u] = V(""), [c, d] = V(!1), p = K(null), h = K(null);
  J(() => {
    e && (s(""), i(""), u(""), setTimeout(() => {
      p.current?.focus();
    }, 100));
  }, [e]), J(() => {
    if (!e) return;
    const v = (w) => {
      h.current && !h.current.contains(w.target) && t();
    }, k = (w) => {
      w.key === "Escape" && t();
    }, M = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", k), () => {
      clearTimeout(M), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", k);
    };
  }, [e, t]);
  const m = (v) => {
    if (!v.trim())
      return u("Please enter an image URL"), !1;
    try {
      const k = new URL(v);
      if (!["http:", "https:", "data:"].includes(k.protocol))
        return u("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return u("Please enter a valid URL"), !1;
    }
    return u(""), !0;
  }, y = async () => {
    if (!m(o)) return;
    d(!0);
    const v = new window.Image();
    v.onload = () => {
      d(!1), n(o.trim(), a.trim()), t();
    }, v.onerror = () => {
      d(!1), n(o.trim(), a.trim()), t();
    }, setTimeout(() => {
      c && (d(!1), n(o.trim(), a.trim()), t());
    }, 3e3), v.src = o.trim();
  }, g = (v) => {
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), y());
  };
  if (!e) return null;
  const b = r ? {
    top: r.top,
    left: Math.min(r.left, typeof window < "u" ? window.innerWidth - 340 : r.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ A(
    "div",
    {
      ref: h,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof b.top == "number", b.top),
        left: typeof b.left == "number" ? Math.max(8, b.left) : b.left,
        transform: r ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ A("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ f(Ta, { size: 16, className: "text-primary" }),
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
              /* @__PURE__ */ f(pa, { size: 12 }),
              "Image URL"
            ] }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: p,
                type: "url",
                value: o,
                onChange: (v) => {
                  s(v.target.value), l && u("");
                },
                onKeyDown: g,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              }
            ),
            l && /* @__PURE__ */ f("span", { className: "image-url-dialog-error", children: l })
          ] }),
          /* @__PURE__ */ A("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ A("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ f(No, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ f(
              "input",
              {
                type: "text",
                value: a,
                onChange: (v) => i(v.target.value),
                onKeyDown: g,
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
                onClick: y,
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
const Fb = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ f(No, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ f(kp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ f(xp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ f(Cp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ f(Sp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ f(Tp, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ f(wa, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ f(ka, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ f(xa, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ f(va, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ f(rc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ f(zs, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ f(Ta, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ f(oc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ f(uo, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ f(ec, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ f(Jl, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ f(Sa, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ f(Ca, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ f(nc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ f(pa, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Ub = 32, Yb = 8, jb = 320, Vb = 210, Vr = 12;
function nl(e) {
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
function Kb({ editor: e }) {
  const [t, n] = V(!1), [r, o] = V(""), [s, a] = V(0), [i, l] = V(null), [u, c] = V(!1), [d, p] = V({ top: 0, left: 0 }), [h, m] = V("below"), y = K(null), g = K(-1), b = K(!1);
  J(() => {
    b.current = t;
  }, [t]);
  const v = Fb.filter((T) => {
    if (!r) return !0;
    const E = r.toLowerCase();
    return T.title.toLowerCase().includes(E) || T.keywords?.some((N) => N.includes(E));
  }), k = Math.min(
    v.length * Ub + Yb,
    jb
  );
  Eo(() => {
    if (!t || !i) return;
    const { top: T, bottom: E, left: N } = i, R = window.innerHeight, I = window.innerWidth, O = R - E - Vr, H = T - Vr;
    let W;
    if (O >= k ? W = "below" : H >= k ? W = "above" : W = O >= H ? "below" : "above", m(W), y.current) {
      const q = Math.max(
        Vr,
        Math.min(N, I - Vb - Vr)
      ), L = W === "below" ? E + 4 : T - k - 4;
      y.current.style.top = `${L}px`, y.current.style.left = `${q}px`;
    }
  }, [t, i, k, v.length]);
  const M = Y(() => {
    const { state: T } = e, { selection: E } = T, N = E.from, R = g.current;
    if (R >= 0 && R <= N)
      e.chain().focus().deleteRange({ from: R, to: N }).run();
    else {
      const { $from: I } = E, H = I.parent.textBetween(0, I.parentOffset, void 0, "￼").lastIndexOf("/");
      if (H !== -1) {
        const W = I.pos - (I.parentOffset - H);
        e.chain().focus().deleteRange({ from: W, to: I.pos }).run();
      }
    }
  }, [e]), w = Y(() => {
    n(!1), o(""), a(0), g.current = -1, l(null);
  }, []), S = Y((T) => {
    const E = v[T];
    if (E) {
      if (M(), E.isImageCommand) {
        const { state: N } = e, R = e.view.coordsAtPos(N.selection.from);
        p({
          top: R.bottom + 8,
          left: R.left
        }), c(!0);
      } else
        E.command(e);
      w();
    }
  }, [e, v, M, w]), D = Y((T, E) => {
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
      g.current = R.pos - 1;
      const H = nl(e);
      H && (l(H), n(!0), o(""), a(0));
    };
    return e.on("update", T), () => {
      e.off("update", T);
    };
  }, [e]), J(() => {
    if (!e || !t) return;
    const T = e.view.dom, E = (N) => {
      b.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), a((R) => (R + 1) % v.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), a((R) => (R - 1 + v.length) % v.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), S(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), w()));
    };
    return T.addEventListener("keydown", E, !0), () => {
      T.removeEventListener("keydown", E, !0);
    };
  }, [e, t, s, v, S, w]), J(() => {
    if (!e || !t) return;
    const T = () => {
      if (!b.current || g.current < 0) return;
      const { state: E } = e, { selection: N } = E, R = N.from, I = g.current;
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
        const H = nl(e);
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
      y.current && !y.current.contains(E.target) && w();
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [t, w]), J(() => {
    t && v.length === 0 && r.length > 2 && w();
  }, [t, v.length, r, w]), J(() => {
    s >= v.length && a(Math.max(0, v.length - 1));
  }, [v.length, s]), J(() => {
    if (!t || !y.current) return;
    const T = y.current.querySelector(".slash-item.is-selected");
    T && T.scrollIntoView({ block: "nearest" });
  }, [t, s]), u ? /* @__PURE__ */ f(
    su,
    {
      isOpen: u,
      onClose: () => c(!1),
      onInsert: D,
      position: d
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ f(Lt, { children: /* @__PURE__ */ f(
    "div",
    {
      ref: y,
      className: `slash-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
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
            N.preventDefault(), N.stopPropagation(), S(E);
          },
          onMouseEnter: () => a(E),
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
const qb = 340, Gb = 36, Zb = 8, Xb = 240, Kr = 8;
function rl(e) {
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
function Qb({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = V(!1), [s, a] = V(""), [i, l] = V([]), [u, c] = V(0), [d, p] = V(null), [h, m] = V("below"), [y, g] = V(!1), b = K(!1), v = K(null), k = K(-1), M = K(null);
  J(() => {
    b.current = r;
  }, [r]);
  const w = Y(() => {
    o(!1), a(""), l([]), c(0), k.current = -1;
  }, []), S = Y((N) => {
    const R = k.current;
    if (R < 0) return;
    const { state: I } = e, O = I.selection.from;
    try {
      const H = I.tr.delete(R, O), W = I.schema.marks.wikiLink;
      if (W) {
        const q = W.create({ pageName: N }), L = I.schema.text(N, [q]);
        H.insert(R, L);
        const P = R + N.length;
        H.setSelection(fa.create(H.doc, P)), H.removeStoredMark(W);
      } else
        H.insertText(`[[${N}]]`, R);
      e.view.dispatch(H), e.view.focus();
    } catch (H) {
      console.warn("WikiLinkAutocomplete: Error inserting link", H);
    }
    w();
  }, [e, w]);
  J(() => {
    if (!e) return;
    const N = () => {
      if (b.current) return;
      const { state: R } = e, { selection: I } = R, { $from: O } = I;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      k.current = O.pos - 2;
      const W = rl(e);
      W && (p(W), o(!0), a(""), l([]), c(0));
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
    return N.addEventListener("keydown", R, !0), () => {
      N.removeEventListener("keydown", R, !0);
    };
  }, [e, r, i, u, s, S, w, n]), J(() => {
    if (!e || !r) return;
    const N = () => {
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
        const W = rl(e);
        W && p(W);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, w]), J(() => {
    if (r) {
      if (M.current && clearTimeout(M.current), !s.trim()) {
        g(!0), M.current = setTimeout(async () => {
          try {
            const N = await t("");
            l(N);
          } catch {
            l([]);
          }
          g(!1);
        }, 100);
        return;
      }
      return g(!0), M.current = setTimeout(async () => {
        try {
          const N = await t(s.trim());
          l(N);
        } catch {
          l([]);
        }
        g(!1);
      }, 150), () => {
        M.current && clearTimeout(M.current);
      };
    }
  }, [r, s, t]), J(() => {
    if (!r) return;
    const N = (R) => {
      v.current && !v.current.contains(R.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, w]), J(() => {
    if (!r || !v.current) return;
    const N = v.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, u]);
  const D = i.length + (s.trim() ? 1 : 0), x = Math.min(
    Math.max(D, 1) * Gb + Zb,
    Xb
  );
  if (Eo(() => {
    if (!r || !d) return;
    const { top: N, bottom: R, left: I } = d, O = window.innerHeight, H = window.innerWidth, W = O - R - Kr, q = N - Kr;
    let L;
    if (W >= x ? L = "below" : q >= x ? L = "above" : L = W >= q ? "below" : "above", m(L), v.current) {
      const P = Math.max(
        Kr,
        Math.min(I, H - qb - Kr)
      ), j = L === "below" ? R + 4 : N - x - 4;
      v.current.style.top = `${j}px`, v.current.style.left = `${P}px`;
    }
  }, [r, d, x, D]), !r) return null;
  const T = s.trim() && !i.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ f(Lt, { children: /* @__PURE__ */ A(
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
        y && i.length === 0 && /* @__PURE__ */ f("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ f("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
        i.map((N, R) => /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item ${R === u ? "is-selected" : ""}`,
            onMouseDown: (I) => {
              I.preventDefault(), S(N.title);
            },
            onMouseEnter: () => c(R),
            children: [
              /* @__PURE__ */ f("span", { className: "wikilink-icon", children: /* @__PURE__ */ f(Ma, { size: 14 }) }),
              /* @__PURE__ */ f("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ f("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        T && /* @__PURE__ */ A(
          "div",
          {
            className: `wikilink-item wikilink-create ${i.length === u ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), w()) : S(s.trim());
            },
            onMouseEnter: () => c(i.length),
            children: [
              /* @__PURE__ */ f("span", { className: "wikilink-icon", children: /* @__PURE__ */ f(Ea, { size: 14 }) }),
              /* @__PURE__ */ A("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] })
            ]
          }
        ),
        !y && i.length === 0 && !s.trim() && /* @__PURE__ */ f("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ f("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }) })
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
function Kn(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = C.createContext(a), l = n.length;
    n = [...n, a];
    const u = (d) => {
      const { scope: p, children: h, ...m } = d, y = p?.[e]?.[l] || i, g = C.useMemo(() => m, Object.values(m));
      return /* @__PURE__ */ f(y.Provider, { value: g, children: h });
    };
    u.displayName = s + "Provider";
    function c(d, p) {
      const h = p?.[e]?.[l] || i, m = C.useContext(h);
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
  return o.scopeName = e, [r, Jb(o, ...t)];
}
function Jb(...e) {
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
var qt = globalThis?.document ? C.useLayoutEffect : () => {
}, ev = C[" useInsertionEffect ".trim().toString()] || qt;
function Ha({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = tv({
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
        const d = nv(c) ? c(e) : c;
        d !== e && a.current?.(d);
      } else
        s(c);
    },
    [i, e, s, a]
  );
  return [l, u];
}
function tv({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = C.useState(e), o = C.useRef(n), s = C.useRef(t);
  return ev(() => {
    s.current = t;
  }, [t]), C.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function nv(e) {
  return typeof e == "function";
}
var rv = [
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
], ze = rv.reduce((e, t) => {
  const n = /* @__PURE__ */ gr(`Primitive.${t}`), r = C.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ f(l, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function au(e, t) {
  e && gc.flushSync(() => e.dispatchEvent(t));
}
function iu(e) {
  const t = e + "CollectionProvider", [n, r] = Kn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (y) => {
    const { scope: g, children: b } = y, v = X.useRef(null), k = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ f(o, { scope: g, itemMap: k, collectionRef: v, children: b });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ gr(i), u = X.forwardRef(
    (y, g) => {
      const { scope: b, children: v } = y, k = s(i, b), M = We(g, k.collectionRef);
      return /* @__PURE__ */ f(l, { ref: M, children: v });
    }
  );
  u.displayName = i;
  const c = e + "CollectionItemSlot", d = "data-radix-collection-item", p = /* @__PURE__ */ gr(c), h = X.forwardRef(
    (y, g) => {
      const { scope: b, children: v, ...k } = y, M = X.useRef(null), w = We(g, M), S = s(c, b);
      return X.useEffect(() => (S.itemMap.set(M, { ref: M, ...k }), () => void S.itemMap.delete(M))), /* @__PURE__ */ f(p, { [d]: "", ref: w, children: v });
    }
  );
  h.displayName = c;
  function m(y) {
    const g = s(e + "CollectionConsumer", y);
    return X.useCallback(() => {
      const v = g.collectionRef.current;
      if (!v) return [];
      const k = Array.from(v.querySelectorAll(`[${d}]`));
      return Array.from(g.itemMap.values()).sort(
        (S, D) => k.indexOf(S.ref.current) - k.indexOf(D.ref.current)
      );
    }, [g.collectionRef, g.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    m,
    r
  ];
}
var ov = C.createContext(void 0);
function lu(e) {
  const t = C.useContext(ov);
  return e || t || "ltr";
}
function Rt(e) {
  const t = C.useRef(e);
  return C.useEffect(() => {
    t.current = e;
  }), C.useMemo(() => (...n) => t.current?.(...n), []);
}
function sv(e, t = globalThis?.document) {
  const n = Rt(e);
  C.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var av = "DismissableLayer", qs = "dismissableLayer.update", iv = "dismissableLayer.pointerDownOutside", lv = "dismissableLayer.focusOutside", ol, cu = C.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), za = C.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, u = C.useContext(cu), [c, d] = C.useState(null), p = c?.ownerDocument ?? globalThis?.document, [, h] = C.useState({}), m = We(t, (D) => d(D)), y = Array.from(u.layers), [g] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), b = y.indexOf(g), v = c ? y.indexOf(c) : -1, k = u.layersWithOutsidePointerEventsDisabled.size > 0, M = v >= b, w = dv((D) => {
      const x = D.target, T = [...u.branches].some((E) => E.contains(x));
      !M || T || (o?.(D), a?.(D), D.defaultPrevented || i?.());
    }, p), S = fv((D) => {
      const x = D.target;
      [...u.branches].some((E) => E.contains(x)) || (s?.(D), a?.(D), D.defaultPrevented || i?.());
    }, p);
    return sv((D) => {
      v === u.layers.size - 1 && (r?.(D), !D.defaultPrevented && i && (D.preventDefault(), i()));
    }, p), C.useEffect(() => {
      if (c)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (ol = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(c)), u.layers.add(c), sl(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = ol);
        };
    }, [c, p, n, u]), C.useEffect(() => () => {
      c && (u.layers.delete(c), u.layersWithOutsidePointerEventsDisabled.delete(c), sl());
    }, [c, u]), C.useEffect(() => {
      const D = () => h({});
      return document.addEventListener(qs, D), () => document.removeEventListener(qs, D);
    }, []), /* @__PURE__ */ f(
      ze.div,
      {
        ...l,
        ref: m,
        style: {
          pointerEvents: k ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ue(e.onFocusCapture, S.onFocusCapture),
        onBlurCapture: ue(e.onBlurCapture, S.onBlurCapture),
        onPointerDownCapture: ue(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
za.displayName = av;
var cv = "DismissableLayerBranch", uv = C.forwardRef((e, t) => {
  const n = C.useContext(cu), r = C.useRef(null), o = We(t, r);
  return C.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ f(ze.div, { ...e, ref: o });
});
uv.displayName = cv;
function dv(e, t = globalThis?.document) {
  const n = Rt(e), r = C.useRef(!1), o = C.useRef(() => {
  });
  return C.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          uu(
            iv,
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
function fv(e, t = globalThis?.document) {
  const n = Rt(e), r = C.useRef(!1);
  return C.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && uu(lv, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function sl() {
  const e = new CustomEvent(qs);
  document.dispatchEvent(e);
}
function uu(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? au(o, s) : o.dispatchEvent(s);
}
var vs = 0;
function pv() {
  C.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? al()), document.body.insertAdjacentElement("beforeend", e[1] ?? al()), vs++, () => {
      vs === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), vs--;
    };
  }, []);
}
function al() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ws = "focusScope.autoFocusOnMount", ks = "focusScope.autoFocusOnUnmount", il = { bubbles: !1, cancelable: !0 }, hv = "FocusScope", du = C.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = C.useState(null), u = Rt(o), c = Rt(s), d = C.useRef(null), p = We(t, (y) => l(y)), h = C.useRef({
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
      let y = function(k) {
        if (h.paused || !i) return;
        const M = k.target;
        i.contains(M) ? d.current = M : jt(d.current, { select: !0 });
      }, g = function(k) {
        if (h.paused || !i) return;
        const M = k.relatedTarget;
        M !== null && (i.contains(M) || jt(d.current, { select: !0 }));
      }, b = function(k) {
        if (document.activeElement === document.body)
          for (const w of k)
            w.removedNodes.length > 0 && jt(i);
      };
      document.addEventListener("focusin", y), document.addEventListener("focusout", g);
      const v = new MutationObserver(b);
      return i && v.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", y), document.removeEventListener("focusout", g), v.disconnect();
      };
    }
  }, [r, i, h.paused]), C.useEffect(() => {
    if (i) {
      cl.add(h);
      const y = document.activeElement;
      if (!i.contains(y)) {
        const b = new CustomEvent(ws, il);
        i.addEventListener(ws, u), i.dispatchEvent(b), b.defaultPrevented || (mv(wv(fu(i)), { select: !0 }), document.activeElement === y && jt(i));
      }
      return () => {
        i.removeEventListener(ws, u), setTimeout(() => {
          const b = new CustomEvent(ks, il);
          i.addEventListener(ks, c), i.dispatchEvent(b), b.defaultPrevented || jt(y ?? document.body, { select: !0 }), i.removeEventListener(ks, c), cl.remove(h);
        }, 0);
      };
    }
  }, [i, u, c, h]);
  const m = C.useCallback(
    (y) => {
      if (!n && !r || h.paused) return;
      const g = y.key === "Tab" && !y.altKey && !y.ctrlKey && !y.metaKey, b = document.activeElement;
      if (g && b) {
        const v = y.currentTarget, [k, M] = gv(v);
        k && M ? !y.shiftKey && b === M ? (y.preventDefault(), n && jt(k, { select: !0 })) : y.shiftKey && b === k && (y.preventDefault(), n && jt(M, { select: !0 })) : b === v && y.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ f(ze.div, { tabIndex: -1, ...a, ref: p, onKeyDown: m });
});
du.displayName = hv;
function mv(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (jt(r, { select: t }), document.activeElement !== n) return;
}
function gv(e) {
  const t = fu(e), n = ll(t, e), r = ll(t.reverse(), e);
  return [n, r];
}
function fu(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function ll(e, t) {
  for (const n of e)
    if (!yv(n, { upTo: t })) return n;
}
function yv(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function bv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function jt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && bv(e) && t && e.select();
  }
}
var cl = vv();
function vv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ul(e, t), e.unshift(t);
    },
    remove(t) {
      e = ul(e, t), e[0]?.resume();
    }
  };
}
function ul(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function wv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var kv = C[" useId ".trim().toString()] || (() => {
}), xv = 0;
function fo(e) {
  const [t, n] = C.useState(kv());
  return qt(() => {
    n((r) => r ?? String(xv++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Cv = ["top", "right", "bottom", "left"], Gt = Math.min, Ze = Math.max, po = Math.round, qr = Math.floor, gt = (e) => ({
  x: e,
  y: e
}), Sv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Tv = {
  start: "end",
  end: "start"
};
function Gs(e, t, n) {
  return Ze(e, Gt(t, n));
}
function At(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Pt(e) {
  return e.split("-")[0];
}
function qn(e) {
  return e.split("-")[1];
}
function Ba(e) {
  return e === "x" ? "y" : "x";
}
function Wa(e) {
  return e === "y" ? "height" : "width";
}
const Mv = /* @__PURE__ */ new Set(["top", "bottom"]);
function mt(e) {
  return Mv.has(Pt(e)) ? "y" : "x";
}
function Fa(e) {
  return Ba(mt(e));
}
function Ev(e, t, n) {
  n === void 0 && (n = !1);
  const r = qn(e), o = Fa(e), s = Wa(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = ho(a)), [a, ho(a)];
}
function Dv(e) {
  const t = ho(e);
  return [Zs(e), t, Zs(t)];
}
function Zs(e) {
  return e.replace(/start|end/g, (t) => Tv[t]);
}
const dl = ["left", "right"], fl = ["right", "left"], Nv = ["top", "bottom"], Rv = ["bottom", "top"];
function Av(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? fl : dl : t ? dl : fl;
    case "left":
    case "right":
      return t ? Nv : Rv;
    default:
      return [];
  }
}
function Pv(e, t, n, r) {
  const o = qn(e);
  let s = Av(Pt(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(Zs)))), s;
}
function ho(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Sv[t]);
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
function pu(e) {
  return typeof e != "number" ? Lv(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function mo(e) {
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
function pl(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = mt(t), a = Fa(t), i = Wa(a), l = Pt(t), u = s === "y", c = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, p = r[i] / 2 - o[i] / 2;
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
  switch (qn(t)) {
    case "start":
      h[a] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      h[a] += p * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const Iv = async (e, t, n) => {
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
  } = pl(u, r, l), p = r, h = {}, m = 0;
  for (let y = 0; y < i.length; y++) {
    const {
      name: g,
      fn: b
    } = i[y], {
      x: v,
      y: k,
      data: M,
      reset: w
    } = await b({
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
    c = v ?? c, d = k ?? d, h = {
      ...h,
      [g]: {
        ...h[g],
        ...M
      }
    }, w && m <= 50 && (m++, typeof w == "object" && (w.placement && (p = w.placement), w.rects && (u = w.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : w.rects), {
      x: c,
      y: d
    } = pl(u, p, l)), y = -1);
  }
  return {
    x: c,
    y: d,
    placement: p,
    strategy: o,
    middlewareData: h
  };
};
async function yr(e, t) {
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
  } = At(t, e), m = pu(h), g = i[p ? d === "floating" ? "reference" : "floating" : d], b = mo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: l
  })), v = d === "floating" ? {
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
  }, w = mo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: v,
    offsetParent: k,
    strategy: l
  }) : v);
  return {
    top: (b.top - w.top + m.top) / M.y,
    bottom: (w.bottom - b.bottom + m.bottom) / M.y,
    left: (b.left - w.left + m.left) / M.x,
    right: (w.right - b.right + m.right) / M.x
  };
}
const Ov = (e) => ({
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
    const d = pu(c), p = {
      x: n,
      y: r
    }, h = Fa(o), m = Wa(h), y = await a.getDimensions(u), g = h === "y", b = g ? "top" : "left", v = g ? "bottom" : "right", k = g ? "clientHeight" : "clientWidth", M = s.reference[m] + s.reference[h] - p[h] - s.floating[m], w = p[h] - s.reference[h], S = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let D = S ? S[k] : 0;
    (!D || !await (a.isElement == null ? void 0 : a.isElement(S))) && (D = i.floating[k] || s.floating[m]);
    const x = M / 2 - w / 2, T = D / 2 - y[m] / 2 - 1, E = Gt(d[b], T), N = Gt(d[v], T), R = E, I = D - y[m] - N, O = D / 2 - y[m] / 2 + x, H = Gs(R, O, I), W = !l.arrow && qn(o) != null && O !== H && s.reference[m] / 2 - (O < R ? E : N) - y[m] / 2 < 0, q = W ? O < R ? O - R : O - I : 0;
    return {
      [h]: p[h] + q,
      data: {
        [h]: H,
        centerOffset: O - H - q,
        ...W && {
          alignmentOffset: q
        }
      },
      reset: W
    };
  }
}), _v = function(e) {
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
        flipAlignment: y = !0,
        ...g
      } = At(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = Pt(o), v = mt(i), k = Pt(i) === i, M = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), w = p || (k || !y ? [ho(i)] : Dv(i)), S = m !== "none";
      !p && S && w.push(...Pv(i, y, m, M));
      const D = [i, ...w], x = await yr(t, g), T = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (c && T.push(x[b]), d) {
        const O = Ev(o, a, M);
        T.push(x[O[0]], x[O[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: T
      }], !T.every((O) => O <= 0)) {
        var N, R;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, H = D[O];
        if (H && (!(d === "alignment" ? v !== mt(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        E.every((L) => mt(L.placement) === v ? L.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: E
            },
            reset: {
              placement: H
            }
          };
        let W = (R = E.filter((q) => q.overflows[0] <= 0).sort((q, L) => q.overflows[1] - L.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!W)
          switch (h) {
            case "bestFit": {
              var I;
              const q = (I = E.filter((L) => {
                if (S) {
                  const P = mt(L.placement);
                  return P === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map((L) => [L.placement, L.overflows.filter((P) => P > 0).reduce((P, j) => P + j, 0)]).sort((L, P) => L[1] - P[1])[0]) == null ? void 0 : I[0];
              q && (W = q);
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
function hl(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ml(e) {
  return Cv.some((t) => e[t] >= 0);
}
const $v = function(e) {
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
          const s = await yr(t, {
            ...o,
            elementContext: "reference"
          }), a = hl(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: ml(a)
            }
          };
        }
        case "escaped": {
          const s = await yr(t, {
            ...o,
            altBoundary: !0
          }), a = hl(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: ml(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, hu = /* @__PURE__ */ new Set(["left", "top"]);
async function Hv(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Pt(n), i = qn(n), l = mt(n) === "y", u = hu.has(a) ? -1 : 1, c = s && l ? -1 : 1, d = At(t, e);
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
const zv = function(e) {
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
      } = t, l = await Hv(t, e);
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
}, Bv = function(e) {
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
          fn: (g) => {
            let {
              x: b,
              y: v
            } = g;
            return {
              x: b,
              y: v
            };
          }
        },
        ...l
      } = At(e, t), u = {
        x: n,
        y: r
      }, c = await yr(t, l), d = mt(Pt(o)), p = Ba(d);
      let h = u[p], m = u[d];
      if (s) {
        const g = p === "y" ? "top" : "left", b = p === "y" ? "bottom" : "right", v = h + c[g], k = h - c[b];
        h = Gs(v, h, k);
      }
      if (a) {
        const g = d === "y" ? "top" : "left", b = d === "y" ? "bottom" : "right", v = m + c[g], k = m - c[b];
        m = Gs(v, m, k);
      }
      const y = i.fn({
        ...t,
        [p]: h,
        [d]: m
      });
      return {
        ...y,
        data: {
          x: y.x - n,
          y: y.y - r,
          enabled: {
            [p]: s,
            [d]: a
          }
        }
      };
    }
  };
}, Wv = function(e) {
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
      }, d = mt(o), p = Ba(d);
      let h = c[p], m = c[d];
      const y = At(i, t), g = typeof y == "number" ? {
        mainAxis: y,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...y
      };
      if (l) {
        const k = p === "y" ? "height" : "width", M = s.reference[p] - s.floating[k] + g.mainAxis, w = s.reference[p] + s.reference[k] - g.mainAxis;
        h < M ? h = M : h > w && (h = w);
      }
      if (u) {
        var b, v;
        const k = p === "y" ? "width" : "height", M = hu.has(Pt(o)), w = s.reference[d] - s.floating[k] + (M && ((b = a.offset) == null ? void 0 : b[d]) || 0) + (M ? 0 : g.crossAxis), S = s.reference[d] + s.reference[k] + (M ? 0 : ((v = a.offset) == null ? void 0 : v[d]) || 0) - (M ? g.crossAxis : 0);
        m < w ? m = w : m > S && (m = S);
      }
      return {
        [p]: h,
        [d]: m
      };
    }
  };
}, Fv = function(e) {
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
      } = At(e, t), c = await yr(t, u), d = Pt(o), p = qn(o), h = mt(o) === "y", {
        width: m,
        height: y
      } = s.floating;
      let g, b;
      d === "top" || d === "bottom" ? (g = d, b = p === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (b = d, g = p === "end" ? "top" : "bottom");
      const v = y - c.top - c.bottom, k = m - c.left - c.right, M = Gt(y - c[g], v), w = Gt(m - c[b], k), S = !t.middlewareData.shift;
      let D = M, x = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = k), (r = t.middlewareData.shift) != null && r.enabled.y && (D = v), S && !p) {
        const E = Ze(c.left, 0), N = Ze(c.right, 0), R = Ze(c.top, 0), I = Ze(c.bottom, 0);
        h ? x = m - 2 * (E !== 0 || N !== 0 ? E + N : Ze(c.left, c.right)) : D = y - 2 * (R !== 0 || I !== 0 ? R + I : Ze(c.top, c.bottom));
      }
      await l({
        ...t,
        availableWidth: x,
        availableHeight: D
      });
      const T = await a.getDimensions(i.floating);
      return m !== T.width || y !== T.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Io() {
  return typeof window < "u";
}
function Gn(e) {
  return mu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Qe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function vt(e) {
  var t;
  return (t = (mu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function mu(e) {
  return Io() ? e instanceof Node || e instanceof Qe(e).Node : !1;
}
function lt(e) {
  return Io() ? e instanceof Element || e instanceof Qe(e).Element : !1;
}
function yt(e) {
  return Io() ? e instanceof HTMLElement || e instanceof Qe(e).HTMLElement : !1;
}
function gl(e) {
  return !Io() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Qe(e).ShadowRoot;
}
const Uv = /* @__PURE__ */ new Set(["inline", "contents"]);
function Mr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = ct(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Uv.has(o);
}
const Yv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function jv(e) {
  return Yv.has(Gn(e));
}
const Vv = [":popover-open", ":modal"];
function Oo(e) {
  return Vv.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Kv = ["transform", "translate", "scale", "rotate", "perspective"], qv = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Gv = ["paint", "layout", "strict", "content"];
function Ua(e) {
  const t = Ya(), n = lt(e) ? ct(e) : e;
  return Kv.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || qv.some((r) => (n.willChange || "").includes(r)) || Gv.some((r) => (n.contain || "").includes(r));
}
function Zv(e) {
  let t = Zt(e);
  for (; yt(t) && !$n(t); ) {
    if (Ua(t))
      return t;
    if (Oo(t))
      return null;
    t = Zt(t);
  }
  return null;
}
function Ya() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Xv = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function $n(e) {
  return Xv.has(Gn(e));
}
function ct(e) {
  return Qe(e).getComputedStyle(e);
}
function _o(e) {
  return lt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Zt(e) {
  if (Gn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    gl(e) && e.host || // Fallback.
    vt(e)
  );
  return gl(t) ? t.host : t;
}
function gu(e) {
  const t = Zt(e);
  return $n(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : yt(t) && Mr(t) ? t : gu(t);
}
function br(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = gu(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Qe(o);
  if (s) {
    const i = Xs(a);
    return t.concat(a, a.visualViewport || [], Mr(o) ? o : [], i && n ? br(i) : []);
  }
  return t.concat(o, br(o, [], n));
}
function Xs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function yu(e) {
  const t = ct(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = yt(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = po(n) !== s || po(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function ja(e) {
  return lt(e) ? e : e.contextElement;
}
function Ln(e) {
  const t = ja(e);
  if (!yt(t))
    return gt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = yu(t);
  let a = (s ? po(n.width) : n.width) / r, i = (s ? po(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const Qv = /* @__PURE__ */ gt(0);
function bu(e) {
  const t = Qe(e);
  return !Ya() || !t.visualViewport ? Qv : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Jv(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Qe(e) ? !1 : t;
}
function ln(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ja(e);
  let a = gt(1);
  t && (r ? lt(r) && (a = Ln(r)) : a = Ln(e));
  const i = Jv(s, n, r) ? bu(s) : gt(0);
  let l = (o.left + i.x) / a.x, u = (o.top + i.y) / a.y, c = o.width / a.x, d = o.height / a.y;
  if (s) {
    const p = Qe(s), h = r && lt(r) ? Qe(r) : r;
    let m = p, y = Xs(m);
    for (; y && r && h !== m; ) {
      const g = Ln(y), b = y.getBoundingClientRect(), v = ct(y), k = b.left + (y.clientLeft + parseFloat(v.paddingLeft)) * g.x, M = b.top + (y.clientTop + parseFloat(v.paddingTop)) * g.y;
      l *= g.x, u *= g.y, c *= g.x, d *= g.y, l += k, u += M, m = Qe(y), y = Xs(m);
    }
  }
  return mo({
    width: c,
    height: d,
    x: l,
    y: u
  });
}
function $o(e, t) {
  const n = _o(e).scrollLeft;
  return t ? t.left + n : ln(vt(e)).left + n;
}
function vu(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - $o(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function ew(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = vt(r), i = t ? Oo(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = gt(1);
  const c = gt(0), d = yt(r);
  if ((d || !d && !s) && ((Gn(r) !== "body" || Mr(a)) && (l = _o(r)), yt(r))) {
    const h = ln(r);
    u = Ln(r), c.x = h.x + r.clientLeft, c.y = h.y + r.clientTop;
  }
  const p = a && !d && !s ? vu(a, l) : gt(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + c.x + p.x,
    y: n.y * u.y - l.scrollTop * u.y + c.y + p.y
  };
}
function tw(e) {
  return Array.from(e.getClientRects());
}
function nw(e) {
  const t = vt(e), n = _o(e), r = e.ownerDocument.body, o = Ze(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Ze(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + $o(e);
  const i = -n.scrollTop;
  return ct(r).direction === "rtl" && (a += Ze(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
const yl = 25;
function rw(e, t) {
  const n = Qe(e), r = vt(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, l = 0;
  if (o) {
    s = o.width, a = o.height;
    const c = Ya();
    (!c || c && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const u = $o(r);
  if (u <= 0) {
    const c = r.ownerDocument, d = c.body, p = getComputedStyle(d), h = c.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, m = Math.abs(r.clientWidth - d.clientWidth - h);
    m <= yl && (s -= m);
  } else u <= yl && (s += u);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const ow = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function sw(e, t) {
  const n = ln(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = yt(e) ? Ln(e) : gt(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = o * s.x, u = r * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: u
  };
}
function bl(e, t, n) {
  let r;
  if (t === "viewport")
    r = rw(e, n);
  else if (t === "document")
    r = nw(vt(e));
  else if (lt(t))
    r = sw(t, n);
  else {
    const o = bu(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return mo(r);
}
function wu(e, t) {
  const n = Zt(e);
  return n === t || !lt(n) || $n(n) ? !1 : ct(n).position === "fixed" || wu(n, t);
}
function aw(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = br(e, [], !1).filter((i) => lt(i) && Gn(i) !== "body"), o = null;
  const s = ct(e).position === "fixed";
  let a = s ? Zt(e) : e;
  for (; lt(a) && !$n(a); ) {
    const i = ct(a), l = Ua(a);
    !l && i.position === "fixed" && (o = null), (s ? !l && !o : !l && i.position === "static" && !!o && ow.has(o.position) || Mr(a) && !l && wu(e, a)) ? r = r.filter((c) => c !== a) : o = i, a = Zt(a);
  }
  return t.set(e, r), r;
}
function iw(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? Oo(t) ? [] : aw(t, this._c) : [].concat(n), r], i = a[0], l = a.reduce((u, c) => {
    const d = bl(t, c, o);
    return u.top = Ze(d.top, u.top), u.right = Gt(d.right, u.right), u.bottom = Gt(d.bottom, u.bottom), u.left = Ze(d.left, u.left), u;
  }, bl(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function lw(e) {
  const {
    width: t,
    height: n
  } = yu(e);
  return {
    width: t,
    height: n
  };
}
function cw(e, t, n) {
  const r = yt(t), o = vt(t), s = n === "fixed", a = ln(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = gt(0);
  function u() {
    l.x = $o(o);
  }
  if (r || !r && !s)
    if ((Gn(t) !== "body" || Mr(o)) && (i = _o(t)), r) {
      const h = ln(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else o && u();
  s && !r && o && u();
  const c = o && !r && !s ? vu(o, i) : gt(0), d = a.left + i.scrollLeft - l.x - c.x, p = a.top + i.scrollTop - l.y - c.y;
  return {
    x: d,
    y: p,
    width: a.width,
    height: a.height
  };
}
function xs(e) {
  return ct(e).position === "static";
}
function vl(e, t) {
  if (!yt(e) || ct(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return vt(e) === n && (n = n.ownerDocument.body), n;
}
function ku(e, t) {
  const n = Qe(e);
  if (Oo(e))
    return n;
  if (!yt(e)) {
    let o = Zt(e);
    for (; o && !$n(o); ) {
      if (lt(o) && !xs(o))
        return o;
      o = Zt(o);
    }
    return n;
  }
  let r = vl(e, t);
  for (; r && jv(r) && xs(r); )
    r = vl(r, t);
  return r && $n(r) && xs(r) && !Ua(r) ? n : r || Zv(e) || n;
}
const uw = async function(e) {
  const t = this.getOffsetParent || ku, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: cw(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function dw(e) {
  return ct(e).direction === "rtl";
}
const fw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ew,
  getDocumentElement: vt,
  getClippingRect: iw,
  getOffsetParent: ku,
  getElementRects: uw,
  getClientRects: tw,
  getDimensions: lw,
  getScale: Ln,
  isElement: lt,
  isRTL: dw
};
function xu(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function pw(e, t) {
  let n = null, r;
  const o = vt(e);
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
    const m = qr(d), y = qr(o.clientWidth - (c + p)), g = qr(o.clientHeight - (d + h)), b = qr(c), k = {
      rootMargin: -m + "px " + -y + "px " + -g + "px " + -b + "px",
      threshold: Ze(0, Gt(1, l)) || 1
    };
    let M = !0;
    function w(S) {
      const D = S[0].intersectionRatio;
      if (D !== l) {
        if (!M)
          return a();
        D ? a(!1, D) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !xu(u, e.getBoundingClientRect()) && a(), M = !1;
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
function hw(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = ja(e), c = o || s ? [...u ? br(u) : [], ...br(t)] : [];
  c.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const d = u && i ? pw(u, n) : null;
  let p = -1, h = null;
  a && (h = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === u && h && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var k;
      (k = h) == null || k.observe(t);
    })), n();
  }), u && !l && h.observe(u), h.observe(t));
  let m, y = l ? ln(e) : null;
  l && g();
  function g() {
    const b = ln(e);
    y && !xu(y, b) && n(), y = b, m = requestAnimationFrame(g);
  }
  return n(), () => {
    var b;
    c.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), d?.(), (b = h) == null || b.disconnect(), h = null, l && cancelAnimationFrame(m);
  };
}
const mw = zv, gw = Bv, yw = _v, bw = Fv, vw = $v, wl = Ov, ww = Wv, kw = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: fw,
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
var xw = typeof document < "u", Cw = function() {
}, io = xw ? Eo : Cw;
function go(e, t) {
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
        if (!go(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !go(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Cu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function kl(e, t) {
  const n = Cu(e);
  return Math.round(t * n) / n;
}
function Cs(e) {
  const t = C.useRef(e);
  return io(() => {
    t.current = e;
  }), t;
}
function Sw(e) {
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
  }), [p, h] = C.useState(r);
  go(p, r) || h(r);
  const [m, y] = C.useState(null), [g, b] = C.useState(null), v = C.useCallback((L) => {
    L !== S.current && (S.current = L, y(L));
  }, []), k = C.useCallback((L) => {
    L !== D.current && (D.current = L, b(L));
  }, []), M = s || m, w = a || g, S = C.useRef(null), D = C.useRef(null), x = C.useRef(c), T = l != null, E = Cs(l), N = Cs(o), R = Cs(u), I = C.useCallback(() => {
    if (!S.current || !D.current)
      return;
    const L = {
      placement: t,
      strategy: n,
      middleware: p
    };
    N.current && (L.platform = N.current), kw(S.current, D.current, L).then((P) => {
      const j = {
        ...P,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      O.current && !go(x.current, j) && (x.current = j, gc.flushSync(() => {
        d(j);
      }));
    });
  }, [p, t, n, N, R]);
  io(() => {
    u === !1 && x.current.isPositioned && (x.current.isPositioned = !1, d((L) => ({
      ...L,
      isPositioned: !1
    })));
  }, [u]);
  const O = C.useRef(!1);
  io(() => (O.current = !0, () => {
    O.current = !1;
  }), []), io(() => {
    if (M && (S.current = M), w && (D.current = w), M && w) {
      if (E.current)
        return E.current(M, w, I);
      I();
    }
  }, [M, w, I, E, T]);
  const H = C.useMemo(() => ({
    reference: S,
    floating: D,
    setReference: v,
    setFloating: k
  }), [v, k]), W = C.useMemo(() => ({
    reference: M,
    floating: w
  }), [M, w]), q = C.useMemo(() => {
    const L = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return L;
    const P = kl(W.floating, c.x), j = kl(W.floating, c.y);
    return i ? {
      ...L,
      transform: "translate(" + P + "px, " + j + "px)",
      ...Cu(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: P,
      top: j
    };
  }, [n, i, W.floating, c.x, c.y]);
  return C.useMemo(() => ({
    ...c,
    update: I,
    refs: H,
    elements: W,
    floatingStyles: q
  }), [c, I, H, W, q]);
}
const Tw = (e) => {
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
      return r && t(r) ? r.current != null ? wl({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? wl({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Mw = (e, t) => ({
  ...mw(e),
  options: [e, t]
}), Ew = (e, t) => ({
  ...gw(e),
  options: [e, t]
}), Dw = (e, t) => ({
  ...ww(e),
  options: [e, t]
}), Nw = (e, t) => ({
  ...yw(e),
  options: [e, t]
}), Rw = (e, t) => ({
  ...bw(e),
  options: [e, t]
}), Aw = (e, t) => ({
  ...vw(e),
  options: [e, t]
}), Pw = (e, t) => ({
  ...Tw(e),
  options: [e, t]
});
var Lw = "Arrow", Su = C.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ f(
    ze.svg,
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
Su.displayName = Lw;
var Iw = Su;
function Ow(e) {
  const [t, n] = C.useState(void 0);
  return qt(() => {
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
var Va = "Popper", [Tu, Ho] = Kn(Va), [_w, Mu] = Tu(Va), Eu = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = C.useState(null);
  return /* @__PURE__ */ f(_w, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Eu.displayName = Va;
var Du = "PopperAnchor", Nu = C.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Mu(Du, n), a = C.useRef(null), i = We(t, a), l = C.useRef(null);
    return C.useEffect(() => {
      const u = l.current;
      l.current = r?.current || a.current, u !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ f(ze.div, { ...o, ref: i });
  }
);
Nu.displayName = Du;
var Ka = "PopperContent", [$w, Hw] = Tu(Ka), Ru = C.forwardRef(
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
      ...y
    } = e, g = Mu(Ka, n), [b, v] = C.useState(null), k = We(t, (F) => v(F)), [M, w] = C.useState(null), S = Ow(M), D = S?.width ?? 0, x = S?.height ?? 0, T = r + (s !== "center" ? "-" + s : ""), E = typeof c == "number" ? c : { top: 0, right: 0, bottom: 0, left: 0, ...c }, N = Array.isArray(u) ? u : [u], R = N.length > 0, I = {
      padding: E,
      boundary: N.filter(Bw),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: O, floatingStyles: H, placement: W, isPositioned: q, middlewareData: L } = Sw({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: T,
      whileElementsMounted: (...F) => hw(...F, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        Mw({ mainAxis: o + x, alignmentAxis: a }),
        l && Ew({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Dw() : void 0,
          ...I
        }),
        l && Nw({ ...I }),
        Rw({
          ...I,
          apply: ({ elements: F, rects: ee, availableWidth: he, availableHeight: ge }) => {
            const { width: Ee, height: Oe } = ee.reference, et = F.floating.style;
            et.setProperty("--radix-popper-available-width", `${he}px`), et.setProperty("--radix-popper-available-height", `${ge}px`), et.setProperty("--radix-popper-anchor-width", `${Ee}px`), et.setProperty("--radix-popper-anchor-height", `${Oe}px`);
          }
        }),
        M && Pw({ element: M, padding: i }),
        Ww({ arrowWidth: D, arrowHeight: x }),
        p && Aw({ strategy: "referenceHidden", ...I })
      ]
    }), [P, j] = Lu(W), Z = Rt(m);
    qt(() => {
      q && Z?.();
    }, [q, Z]);
    const G = L.arrow?.x, Q = L.arrow?.y, re = L.arrow?.centerOffset !== 0, [$, B] = C.useState();
    return qt(() => {
      b && B(window.getComputedStyle(b).zIndex);
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
            L.transformOrigin?.x,
            L.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...L.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ f(
          $w,
          {
            scope: n,
            placedSide: P,
            onArrowChange: w,
            arrowX: G,
            arrowY: Q,
            shouldHideArrow: re,
            children: /* @__PURE__ */ f(
              ze.div,
              {
                "data-side": P,
                "data-align": j,
                ...y,
                ref: k,
                style: {
                  ...y.style,
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
Ru.displayName = Ka;
var Au = "PopperArrow", zw = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Pu = C.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Hw(Au, r), a = zw[s.placedSide];
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
          Iw,
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
Pu.displayName = Au;
function Bw(e) {
  return e !== null;
}
var Ww = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, a = o.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [u, c] = Lu(n), d = { start: "0%", center: "50%", end: "100%" }[c], p = (o.arrow?.x ?? 0) + i / 2, h = (o.arrow?.y ?? 0) + l / 2;
    let m = "", y = "";
    return u === "bottom" ? (m = a ? d : `${p}px`, y = `${-l}px`) : u === "top" ? (m = a ? d : `${p}px`, y = `${r.floating.height + l}px`) : u === "right" ? (m = `${-l}px`, y = a ? d : `${h}px`) : u === "left" && (m = `${r.floating.width + l}px`, y = a ? d : `${h}px`), { data: { x: m, y } };
  }
});
function Lu(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Iu = Eu, Ou = Nu, _u = Ru, $u = Pu, Fw = "Portal", qa = C.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = C.useState(!1);
  qt(() => s(!0), []);
  const a = n || o && globalThis?.document?.body;
  return a ? nh.createPortal(/* @__PURE__ */ f(ze.div, { ...r, ref: t }), a) : null;
});
qa.displayName = Fw;
function Uw(e, t) {
  return C.useReducer((n, r) => t[n][r] ?? n, e);
}
var un = (e) => {
  const { present: t, children: n } = e, r = Yw(t), o = typeof n == "function" ? n({ present: r.isPresent }) : C.Children.only(n), s = We(r.ref, jw(o));
  return typeof n == "function" || r.isPresent ? C.cloneElement(o, { ref: s }) : null;
};
un.displayName = "Presence";
function Yw(e) {
  const [t, n] = C.useState(), r = C.useRef(null), o = C.useRef(e), s = C.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = Uw(a, {
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
    const u = Gr(r.current);
    s.current = i === "mounted" ? u : "none";
  }, [i]), qt(() => {
    const u = r.current, c = o.current;
    if (c !== e) {
      const p = s.current, h = Gr(u);
      e ? l("MOUNT") : h === "none" || u?.display === "none" ? l("UNMOUNT") : l(c && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), qt(() => {
    if (t) {
      let u;
      const c = t.ownerDocument.defaultView ?? window, d = (h) => {
        const y = Gr(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && y && (l("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = c.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, p = (h) => {
        h.target === t && (s.current = Gr(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        c.clearTimeout(u), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
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
function Gr(e) {
  return e?.animationName || "none";
}
function jw(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Ss = "rovingFocusGroup.onEntryFocus", Vw = { bubbles: !1, cancelable: !0 }, Er = "RovingFocusGroup", [Qs, Hu, Kw] = iu(Er), [qw, zu] = Kn(
  Er,
  [Kw]
), [Gw, Zw] = qw(Er), Bu = C.forwardRef(
  (e, t) => /* @__PURE__ */ f(Qs.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(Qs.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(Xw, { ...e, ref: t }) }) })
);
Bu.displayName = Er;
var Xw = C.forwardRef((e, t) => {
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
  } = e, p = C.useRef(null), h = We(t, p), m = lu(s), [y, g] = Ha({
    prop: a,
    defaultProp: i ?? null,
    onChange: l,
    caller: Er
  }), [b, v] = C.useState(!1), k = Rt(u), M = Hu(n), w = C.useRef(!1), [S, D] = C.useState(0);
  return C.useEffect(() => {
    const x = p.current;
    if (x)
      return x.addEventListener(Ss, k), () => x.removeEventListener(Ss, k);
  }, [k]), /* @__PURE__ */ f(
    Gw,
    {
      scope: n,
      orientation: r,
      dir: m,
      loop: o,
      currentTabStopId: y,
      onItemFocus: C.useCallback(
        (x) => g(x),
        [g]
      ),
      onItemShiftTab: C.useCallback(() => v(!0), []),
      onFocusableItemAdd: C.useCallback(
        () => D((x) => x + 1),
        []
      ),
      onFocusableItemRemove: C.useCallback(
        () => D((x) => x - 1),
        []
      ),
      children: /* @__PURE__ */ f(
        ze.div,
        {
          tabIndex: b || S === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: ue(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: ue(e.onFocus, (x) => {
            const T = !w.current;
            if (x.target === x.currentTarget && T && !b) {
              const E = new CustomEvent(Ss, Vw);
              if (x.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
                const N = M().filter((W) => W.focusable), R = N.find((W) => W.active), I = N.find((W) => W.id === y), H = [R, I, ...N].filter(
                  Boolean
                ).map((W) => W.ref.current);
                Uu(H, c);
              }
            }
            w.current = !1;
          }),
          onBlur: ue(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), Wu = "RovingFocusGroupItem", Fu = C.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, l = fo(), u = s || l, c = Zw(Wu, n), d = c.currentTabStopId === u, p = Hu(n), { onFocusableItemAdd: h, onFocusableItemRemove: m, currentTabStopId: y } = c;
    return C.useEffect(() => {
      if (r)
        return h(), () => m();
    }, [r, h, m]), /* @__PURE__ */ f(
      Qs.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ f(
          ze.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": c.orientation,
            ...i,
            ref: t,
            onMouseDown: ue(e.onMouseDown, (g) => {
              r ? c.onItemFocus(u) : g.preventDefault();
            }),
            onFocus: ue(e.onFocus, () => c.onItemFocus(u)),
            onKeyDown: ue(e.onKeyDown, (g) => {
              if (g.key === "Tab" && g.shiftKey) {
                c.onItemShiftTab();
                return;
              }
              if (g.target !== g.currentTarget) return;
              const b = ek(g, c.orientation, c.dir);
              if (b !== void 0) {
                if (g.metaKey || g.ctrlKey || g.altKey || g.shiftKey) return;
                g.preventDefault();
                let k = p().filter((M) => M.focusable).map((M) => M.ref.current);
                if (b === "last") k.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && k.reverse();
                  const M = k.indexOf(g.currentTarget);
                  k = c.loop ? tk(k, M + 1) : k.slice(M + 1);
                }
                setTimeout(() => Uu(k));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: y != null }) : a
          }
        )
      }
    );
  }
);
Fu.displayName = Wu;
var Qw = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Jw(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function ek(e, t, n) {
  const r = Jw(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Qw[r];
}
function Uu(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function tk(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var nk = Bu, rk = Fu, ok = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Cn = /* @__PURE__ */ new WeakMap(), Zr = /* @__PURE__ */ new WeakMap(), Xr = {}, Ts = 0, Yu = function(e) {
  return e && (e.host || Yu(e.parentNode));
}, sk = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Yu(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, ak = function(e, t, n, r) {
  var o = sk(t, Array.isArray(e) ? e : [e]);
  Xr[n] || (Xr[n] = /* @__PURE__ */ new WeakMap());
  var s = Xr[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(o), u = function(d) {
    !d || i.has(d) || (i.add(d), u(d.parentNode));
  };
  o.forEach(u);
  var c = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(p) {
      if (i.has(p))
        c(p);
      else
        try {
          var h = p.getAttribute(r), m = h !== null && h !== "false", y = (Cn.get(p) || 0) + 1, g = (s.get(p) || 0) + 1;
          Cn.set(p, y), s.set(p, g), a.push(p), y === 1 && m && Zr.set(p, !0), g === 1 && p.setAttribute(n, "true"), m || p.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", p, b);
        }
    });
  };
  return c(t), i.clear(), Ts++, function() {
    a.forEach(function(d) {
      var p = Cn.get(d) - 1, h = s.get(d) - 1;
      Cn.set(d, p), s.set(d, h), p || (Zr.has(d) || d.removeAttribute(r), Zr.delete(d)), h || d.removeAttribute(n);
    }), Ts--, Ts || (Cn = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap(), Zr = /* @__PURE__ */ new WeakMap(), Xr = {});
  };
}, ik = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = ok(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), ak(r, o, n, "aria-hidden")) : function() {
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
function ju(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function lk(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var lo = "right-scroll-bar-position", co = "width-before-scroll-bar", ck = "with-scroll-bars-hidden", uk = "--removed-body-scroll-bar-size";
function Ms(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function dk(e, t) {
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
var fk = typeof window < "u" ? C.useLayoutEffect : C.useEffect, xl = /* @__PURE__ */ new WeakMap();
function pk(e, t) {
  var n = dk(null, function(r) {
    return e.forEach(function(o) {
      return Ms(o, r);
    });
  });
  return fk(function() {
    var r = xl.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || Ms(i, null);
      }), s.forEach(function(i) {
        o.has(i) || Ms(i, a);
      });
    }
    xl.set(n, e);
  }, [e]), n;
}
function hk(e) {
  return e;
}
function mk(e, t) {
  t === void 0 && (t = hk);
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
function gk(e) {
  e === void 0 && (e = {});
  var t = mk(null);
  return t.options = pt({ async: !0, ssr: !1 }, e), t;
}
var Vu = function(e) {
  var t = e.sideCar, n = ju(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return C.createElement(r, pt({}, n));
};
Vu.isSideCarExport = !0;
function yk(e, t) {
  return e.useMedium(t), Vu;
}
var Ku = gk(), Es = function() {
}, zo = C.forwardRef(function(e, t) {
  var n = C.useRef(null), r = C.useState({
    onScrollCapture: Es,
    onWheelCapture: Es,
    onTouchMoveCapture: Es
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, l = e.className, u = e.removeScrollBar, c = e.enabled, d = e.shards, p = e.sideCar, h = e.noRelative, m = e.noIsolation, y = e.inert, g = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, k = e.gapMode, M = ju(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = p, S = pk([n, t]), D = pt(pt({}, M), o);
  return C.createElement(
    C.Fragment,
    null,
    c && C.createElement(w, { sideCar: Ku, removeScrollBar: u, shards: d, noRelative: h, noIsolation: m, inert: y, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: k }),
    a ? C.cloneElement(C.Children.only(i), pt(pt({}, D), { ref: S })) : C.createElement(v, pt({}, D, { className: l, ref: S }), i)
  );
});
zo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
zo.classNames = {
  fullWidth: co,
  zeroRight: lo
};
var bk = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function vk() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = bk();
  return t && e.setAttribute("nonce", t), e;
}
function wk(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function kk(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var xk = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = vk()) && (wk(t, n), kk(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Ck = function() {
  var e = xk();
  return function(t, n) {
    C.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, qu = function() {
  var e = Ck(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Sk = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ds = function(e) {
  return parseInt(e || "", 10) || 0;
}, Tk = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ds(n), Ds(r), Ds(o)];
}, Mk = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Sk;
  var t = Tk(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Ek = qu(), In = "data-scroll-locked", Dk = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(ck, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(In, `] {
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
  
  .`).concat(lo, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(co, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(lo, " .").concat(lo, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(co, " .").concat(co, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(In, `] {
    `).concat(uk, ": ").concat(i, `px;
  }
`);
}, Cl = function() {
  var e = parseInt(document.body.getAttribute(In) || "0", 10);
  return isFinite(e) ? e : 0;
}, Nk = function() {
  C.useEffect(function() {
    return document.body.setAttribute(In, (Cl() + 1).toString()), function() {
      var e = Cl() - 1;
      e <= 0 ? document.body.removeAttribute(In) : document.body.setAttribute(In, e.toString());
    };
  }, []);
}, Rk = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Nk();
  var s = C.useMemo(function() {
    return Mk(o);
  }, [o]);
  return C.createElement(Ek, { styles: Dk(s, !t, o, n ? "" : "!important") });
}, Js = !1;
if (typeof window < "u")
  try {
    var Qr = Object.defineProperty({}, "passive", {
      get: function() {
        return Js = !0, !0;
      }
    });
    window.addEventListener("test", Qr, Qr), window.removeEventListener("test", Qr, Qr);
  } catch {
    Js = !1;
  }
var Sn = Js ? { passive: !1 } : !1, Ak = function(e) {
  return e.tagName === "TEXTAREA";
}, Gu = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Ak(e) && n[t] === "visible")
  );
}, Pk = function(e) {
  return Gu(e, "overflowY");
}, Lk = function(e) {
  return Gu(e, "overflowX");
}, Sl = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Zu(e, r);
    if (o) {
      var s = Xu(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Ik = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Ok = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Zu = function(e, t) {
  return e === "v" ? Pk(t) : Lk(t);
}, Xu = function(e, t) {
  return e === "v" ? Ik(t) : Ok(t);
}, _k = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, $k = function(e, t, n, r, o) {
  var s = _k(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, l = t.contains(i), u = !1, c = a > 0, d = 0, p = 0;
  do {
    if (!i)
      break;
    var h = Xu(e, i), m = h[0], y = h[1], g = h[2], b = y - g - s * m;
    (m || b) && Zu(e, i) && (d += b, p += m);
    var v = i.parentNode;
    i = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (c && Math.abs(d) < 1 || !c && Math.abs(p) < 1) && (u = !0), u;
}, Jr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Tl = function(e) {
  return [e.deltaX, e.deltaY];
}, Ml = function(e) {
  return e && "current" in e ? e.current : e;
}, Hk = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, zk = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Bk = 0, Tn = [];
function Wk(e) {
  var t = C.useRef([]), n = C.useRef([0, 0]), r = C.useRef(), o = C.useState(Bk++)[0], s = C.useState(qu)[0], a = C.useRef(e);
  C.useEffect(function() {
    a.current = e;
  }, [e]), C.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var y = lk([e.lockRef.current], (e.shards || []).map(Ml), !0).filter(Boolean);
      return y.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), y.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = C.useCallback(function(y, g) {
    if ("touches" in y && y.touches.length === 2 || y.type === "wheel" && y.ctrlKey)
      return !a.current.allowPinchZoom;
    var b = Jr(y), v = n.current, k = "deltaX" in y ? y.deltaX : v[0] - b[0], M = "deltaY" in y ? y.deltaY : v[1] - b[1], w, S = y.target, D = Math.abs(k) > Math.abs(M) ? "h" : "v";
    if ("touches" in y && D === "h" && S.type === "range")
      return !1;
    var x = Sl(D, S);
    if (!x)
      return !0;
    if (x ? w = D : (w = D === "v" ? "h" : "v", x = Sl(D, S)), !x)
      return !1;
    if (!r.current && "changedTouches" in y && (k || M) && (r.current = w), !w)
      return !0;
    var T = r.current || w;
    return $k(T, g, y, T === "h" ? k : M);
  }, []), l = C.useCallback(function(y) {
    var g = y;
    if (!(!Tn.length || Tn[Tn.length - 1] !== s)) {
      var b = "deltaY" in g ? Tl(g) : Jr(g), v = t.current.filter(function(w) {
        return w.name === g.type && (w.target === g.target || g.target === w.shadowParent) && Hk(w.delta, b);
      })[0];
      if (v && v.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!v) {
        var k = (a.current.shards || []).map(Ml).filter(Boolean).filter(function(w) {
          return w.contains(g.target);
        }), M = k.length > 0 ? i(g, k[0]) : !a.current.noIsolation;
        M && g.cancelable && g.preventDefault();
      }
    }
  }, []), u = C.useCallback(function(y, g, b, v) {
    var k = { name: y, delta: g, target: b, should: v, shadowParent: Fk(b) };
    t.current.push(k), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== k;
      });
    }, 1);
  }, []), c = C.useCallback(function(y) {
    n.current = Jr(y), r.current = void 0;
  }, []), d = C.useCallback(function(y) {
    u(y.type, Tl(y), y.target, i(y, e.lockRef.current));
  }, []), p = C.useCallback(function(y) {
    u(y.type, Jr(y), y.target, i(y, e.lockRef.current));
  }, []);
  C.useEffect(function() {
    return Tn.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", l, Sn), document.addEventListener("touchmove", l, Sn), document.addEventListener("touchstart", c, Sn), function() {
      Tn = Tn.filter(function(y) {
        return y !== s;
      }), document.removeEventListener("wheel", l, Sn), document.removeEventListener("touchmove", l, Sn), document.removeEventListener("touchstart", c, Sn);
    };
  }, []);
  var h = e.removeScrollBar, m = e.inert;
  return C.createElement(
    C.Fragment,
    null,
    m ? C.createElement(s, { styles: zk(o) }) : null,
    h ? C.createElement(Rk, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Fk(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Uk = yk(Ku, Wk);
var Qu = C.forwardRef(function(e, t) {
  return C.createElement(zo, pt({}, e, { ref: t, sideCar: Uk }));
});
Qu.classNames = zo.classNames;
var ea = ["Enter", " "], Yk = ["ArrowDown", "PageUp", "Home"], Ju = ["ArrowUp", "PageDown", "End"], jk = [...Yk, ...Ju], Vk = {
  ltr: [...ea, "ArrowRight"],
  rtl: [...ea, "ArrowLeft"]
}, Kk = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Dr = "Menu", [vr, qk, Gk] = iu(Dr), [dn, ed] = Kn(Dr, [
  Gk,
  Ho,
  zu
]), Bo = Ho(), td = zu(), [Zk, fn] = dn(Dr), [Xk, Nr] = dn(Dr), nd = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: a = !0 } = e, i = Bo(t), [l, u] = C.useState(null), c = C.useRef(!1), d = Rt(s), p = lu(o);
  return C.useEffect(() => {
    const h = () => {
      c.current = !0, document.addEventListener("pointerdown", m, { capture: !0, once: !0 }), document.addEventListener("pointermove", m, { capture: !0, once: !0 });
    }, m = () => c.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", m, { capture: !0 }), document.removeEventListener("pointermove", m, { capture: !0 });
    };
  }, []), /* @__PURE__ */ f(Iu, { ...i, children: /* @__PURE__ */ f(
    Zk,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: u,
      children: /* @__PURE__ */ f(
        Xk,
        {
          scope: t,
          onClose: C.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: c,
          dir: p,
          modal: a,
          children: r
        }
      )
    }
  ) });
};
nd.displayName = Dr;
var Qk = "MenuAnchor", Ga = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Bo(n);
    return /* @__PURE__ */ f(Ou, { ...o, ...r, ref: t });
  }
);
Ga.displayName = Qk;
var Za = "MenuPortal", [Jk, rd] = dn(Za, {
  forceMount: void 0
}), od = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = fn(Za, t);
  return /* @__PURE__ */ f(Jk, { scope: t, forceMount: n, children: /* @__PURE__ */ f(un, { present: n || s.open, children: /* @__PURE__ */ f(qa, { asChild: !0, container: o, children: r }) }) });
};
od.displayName = Za;
var rt = "MenuContent", [ex, Xa] = dn(rt), sd = C.forwardRef(
  (e, t) => {
    const n = rd(rt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = fn(rt, e.__scopeMenu), a = Nr(rt, e.__scopeMenu);
    return /* @__PURE__ */ f(vr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(un, { present: r || s.open, children: /* @__PURE__ */ f(vr.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ f(tx, { ...o, ref: t }) : /* @__PURE__ */ f(nx, { ...o, ref: t }) }) }) });
  }
), tx = C.forwardRef(
  (e, t) => {
    const n = fn(rt, e.__scopeMenu), r = C.useRef(null), o = We(t, r);
    return C.useEffect(() => {
      const s = r.current;
      if (s) return ik(s);
    }, []), /* @__PURE__ */ f(
      Qa,
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
), nx = C.forwardRef((e, t) => {
  const n = fn(rt, e.__scopeMenu);
  return /* @__PURE__ */ f(
    Qa,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), rx = /* @__PURE__ */ gr("MenuContent.ScrollLock"), Qa = C.forwardRef(
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
      ...y
    } = e, g = fn(rt, n), b = Nr(rt, n), v = Bo(n), k = td(n), M = qk(n), [w, S] = C.useState(null), D = C.useRef(null), x = We(t, D, g.onContentChange), T = C.useRef(0), E = C.useRef(""), N = C.useRef(0), R = C.useRef(null), I = C.useRef("right"), O = C.useRef(0), H = m ? Qu : C.Fragment, W = m ? { as: rx, allowPinchZoom: !0 } : void 0, q = (P) => {
      const j = E.current + P, Z = M().filter((F) => !F.disabled), G = document.activeElement, Q = Z.find((F) => F.ref.current === G)?.textValue, re = Z.map((F) => F.textValue), $ = mx(re, j, Q), B = Z.find((F) => F.textValue === $)?.ref.current;
      (function F(ee) {
        E.current = ee, window.clearTimeout(T.current), ee !== "" && (T.current = window.setTimeout(() => F(""), 1e3));
      })(j), B && setTimeout(() => B.focus());
    };
    C.useEffect(() => () => window.clearTimeout(T.current), []), pv();
    const L = C.useCallback((P) => I.current === R.current?.side && yx(P, R.current?.area), []);
    return /* @__PURE__ */ f(
      ex,
      {
        scope: n,
        searchRef: E,
        onItemEnter: C.useCallback(
          (P) => {
            L(P) && P.preventDefault();
          },
          [L]
        ),
        onItemLeave: C.useCallback(
          (P) => {
            L(P) || (D.current?.focus(), S(null));
          },
          [L]
        ),
        onTriggerLeave: C.useCallback(
          (P) => {
            L(P) && P.preventDefault();
          },
          [L]
        ),
        pointerGraceTimerRef: N,
        onPointerGraceIntentChange: C.useCallback((P) => {
          R.current = P;
        }, []),
        children: /* @__PURE__ */ f(H, { ...W, children: /* @__PURE__ */ f(
          du,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: ue(s, (P) => {
              P.preventDefault(), D.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ f(
              za,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: u,
                onPointerDownOutside: c,
                onFocusOutside: d,
                onInteractOutside: p,
                onDismiss: h,
                children: /* @__PURE__ */ f(
                  nk,
                  {
                    asChild: !0,
                    ...k,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: S,
                    onEntryFocus: ue(l, (P) => {
                      b.isUsingKeyboardRef.current || P.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ f(
                      _u,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": kd(g.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...y,
                        ref: x,
                        style: { outline: "none", ...y.style },
                        onKeyDown: ue(y.onKeyDown, (P) => {
                          const Z = P.target.closest("[data-radix-menu-content]") === P.currentTarget, G = P.ctrlKey || P.altKey || P.metaKey, Q = P.key.length === 1;
                          Z && (P.key === "Tab" && P.preventDefault(), !G && Q && q(P.key));
                          const re = D.current;
                          if (P.target !== re || !jk.includes(P.key)) return;
                          P.preventDefault();
                          const B = M().filter((F) => !F.disabled).map((F) => F.ref.current);
                          Ju.includes(P.key) && B.reverse(), px(B);
                        }),
                        onBlur: ue(e.onBlur, (P) => {
                          P.currentTarget.contains(P.target) || (window.clearTimeout(T.current), E.current = "");
                        }),
                        onPointerMove: ue(
                          e.onPointerMove,
                          wr((P) => {
                            const j = P.target, Z = O.current !== P.clientX;
                            if (P.currentTarget.contains(j) && Z) {
                              const G = P.clientX > O.current ? "right" : "left";
                              I.current = G, O.current = P.clientX;
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
sd.displayName = rt;
var ox = "MenuGroup", Ja = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(ze.div, { role: "group", ...r, ref: t });
  }
);
Ja.displayName = ox;
var sx = "MenuLabel", ad = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(ze.div, { ...r, ref: t });
  }
);
ad.displayName = sx;
var yo = "MenuItem", El = "menu.itemSelect", Wo = C.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = C.useRef(null), a = Nr(yo, e.__scopeMenu), i = Xa(yo, e.__scopeMenu), l = We(t, s), u = C.useRef(!1), c = () => {
      const d = s.current;
      if (!n && d) {
        const p = new CustomEvent(El, { bubbles: !0, cancelable: !0 });
        d.addEventListener(El, (h) => r?.(h), { once: !0 }), au(d, p), p.defaultPrevented ? u.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ f(
      id,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: ue(e.onClick, c),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), u.current = !0;
        },
        onPointerUp: ue(e.onPointerUp, (d) => {
          u.current || d.currentTarget?.click();
        }),
        onKeyDown: ue(e.onKeyDown, (d) => {
          const p = i.searchRef.current !== "";
          n || p && d.key === " " || ea.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
Wo.displayName = yo;
var id = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, a = Xa(yo, n), i = td(n), l = C.useRef(null), u = We(t, l), [c, d] = C.useState(!1), [p, h] = C.useState("");
    return C.useEffect(() => {
      const m = l.current;
      m && h((m.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ f(
      vr.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: /* @__PURE__ */ f(rk, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ f(
          ze.div,
          {
            role: "menuitem",
            "data-highlighted": c ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: u,
            onPointerMove: ue(
              e.onPointerMove,
              wr((m) => {
                r ? a.onItemLeave(m) : (a.onItemEnter(m), m.defaultPrevented || m.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ue(
              e.onPointerLeave,
              wr((m) => a.onItemLeave(m))
            ),
            onFocus: ue(e.onFocus, () => d(!0)),
            onBlur: ue(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), ax = "MenuCheckboxItem", ld = C.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ f(pd, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ f(
      Wo,
      {
        role: "menuitemcheckbox",
        "aria-checked": bo(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ti(n),
        onSelect: ue(
          o.onSelect,
          () => r?.(bo(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
ld.displayName = ax;
var cd = "MenuRadioGroup", [ix, lx] = dn(
  cd,
  { value: void 0, onValueChange: () => {
  } }
), ud = C.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = Rt(r);
    return /* @__PURE__ */ f(ix, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ f(Ja, { ...o, ref: t }) });
  }
);
ud.displayName = cd;
var dd = "MenuRadioItem", fd = C.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = lx(dd, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ f(pd, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ f(
      Wo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": ti(s),
        onSelect: ue(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
fd.displayName = dd;
var ei = "MenuItemIndicator", [pd, cx] = dn(
  ei,
  { checked: !1 }
), hd = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = cx(ei, n);
    return /* @__PURE__ */ f(
      un,
      {
        present: r || bo(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ f(
          ze.span,
          {
            ...o,
            ref: t,
            "data-state": ti(s.checked)
          }
        )
      }
    );
  }
);
hd.displayName = ei;
var ux = "MenuSeparator", md = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(
      ze.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
md.displayName = ux;
var dx = "MenuArrow", gd = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Bo(n);
    return /* @__PURE__ */ f($u, { ...o, ...r, ref: t });
  }
);
gd.displayName = dx;
var fx = "MenuSub", [QS, yd] = dn(fx), lr = "MenuSubTrigger", bd = C.forwardRef(
  (e, t) => {
    const n = fn(lr, e.__scopeMenu), r = Nr(lr, e.__scopeMenu), o = yd(lr, e.__scopeMenu), s = Xa(lr, e.__scopeMenu), a = C.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, u = { __scopeMenu: e.__scopeMenu }, c = C.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return C.useEffect(() => c, [c]), C.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [i, l]), /* @__PURE__ */ f(Ga, { asChild: !0, ...u, children: /* @__PURE__ */ f(
      id,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": kd(n.open),
        ...e,
        ref: Po(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ue(
          e.onPointerMove,
          wr((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (s.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), c();
            }, 100));
          })
        ),
        onPointerLeave: ue(
          e.onPointerLeave,
          wr((d) => {
            c();
            const p = n.content?.getBoundingClientRect();
            if (p) {
              const h = n.content?.dataset.side, m = h === "right", y = m ? -5 : 5, g = p[m ? "left" : "right"], b = p[m ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + y, y: d.clientY },
                  { x: g, y: p.top },
                  { x: b, y: p.top },
                  { x: b, y: p.bottom },
                  { x: g, y: p.bottom }
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
        onKeyDown: ue(e.onKeyDown, (d) => {
          const p = s.searchRef.current !== "";
          e.disabled || p && d.key === " " || Vk[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
bd.displayName = lr;
var vd = "MenuSubContent", wd = C.forwardRef(
  (e, t) => {
    const n = rd(rt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = fn(rt, e.__scopeMenu), a = Nr(rt, e.__scopeMenu), i = yd(vd, e.__scopeMenu), l = C.useRef(null), u = We(t, l);
    return /* @__PURE__ */ f(vr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(un, { present: r || s.open, children: /* @__PURE__ */ f(vr.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(
      Qa,
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
        onFocusOutside: ue(e.onFocusOutside, (c) => {
          c.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: ue(e.onEscapeKeyDown, (c) => {
          a.onClose(), c.preventDefault();
        }),
        onKeyDown: ue(e.onKeyDown, (c) => {
          const d = c.currentTarget.contains(c.target), p = Kk[a.dir].includes(c.key);
          d && p && (s.onOpenChange(!1), i.trigger?.focus(), c.preventDefault());
        })
      }
    ) }) }) });
  }
);
wd.displayName = vd;
function kd(e) {
  return e ? "open" : "closed";
}
function bo(e) {
  return e === "indeterminate";
}
function ti(e) {
  return bo(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function px(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function hx(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function mx(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = hx(e, Math.max(s, 0));
  o.length === 1 && (a = a.filter((u) => u !== n));
  const l = a.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function gx(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], u = i.x, c = i.y, d = l.x, p = l.y;
    c > r != p > r && n < (d - u) * (r - c) / (p - c) + u && (o = !o);
  }
  return o;
}
function yx(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return gx(n, t);
}
function wr(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var bx = nd, vx = Ga, wx = od, kx = sd, xx = Ja, Cx = ad, Sx = Wo, Tx = ld, Mx = ud, Ex = fd, Dx = hd, Nx = md, Rx = gd, Ax = bd, Px = wd, Fo = "DropdownMenu", [Lx] = Kn(
  Fo,
  [ed]
), Ke = ed(), [Ix, xd] = Lx(Fo), Cd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, l = Ke(t), u = C.useRef(null), [c, d] = Ha({
    prop: o,
    defaultProp: s ?? !1,
    onChange: a,
    caller: Fo
  });
  return /* @__PURE__ */ f(
    Ix,
    {
      scope: t,
      triggerId: fo(),
      triggerRef: u,
      contentId: fo(),
      open: c,
      onOpenChange: d,
      onOpenToggle: C.useCallback(() => d((p) => !p), [d]),
      modal: i,
      children: /* @__PURE__ */ f(bx, { ...l, open: c, onOpenChange: d, dir: r, modal: i, children: n })
    }
  );
};
Cd.displayName = Fo;
var Sd = "DropdownMenuTrigger", Td = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = xd(Sd, n), a = Ke(n);
    return /* @__PURE__ */ f(vx, { asChild: !0, ...a, children: /* @__PURE__ */ f(
      ze.button,
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
        onPointerDown: ue(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: ue(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Td.displayName = Sd;
var Ox = "DropdownMenuPortal", Md = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ke(t);
  return /* @__PURE__ */ f(wx, { ...r, ...n });
};
Md.displayName = Ox;
var Ed = "DropdownMenuContent", Dd = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = xd(Ed, n), s = Ke(n), a = C.useRef(!1);
    return /* @__PURE__ */ f(
      kx,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: ue(e.onCloseAutoFocus, (i) => {
          a.current || o.triggerRef.current?.focus(), a.current = !1, i.preventDefault();
        }),
        onInteractOutside: ue(e.onInteractOutside, (i) => {
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
Dd.displayName = Ed;
var _x = "DropdownMenuGroup", $x = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
    return /* @__PURE__ */ f(xx, { ...o, ...r, ref: t });
  }
);
$x.displayName = _x;
var Hx = "DropdownMenuLabel", zx = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
    return /* @__PURE__ */ f(Cx, { ...o, ...r, ref: t });
  }
);
zx.displayName = Hx;
var Bx = "DropdownMenuItem", Nd = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
    return /* @__PURE__ */ f(Sx, { ...o, ...r, ref: t });
  }
);
Nd.displayName = Bx;
var Wx = "DropdownMenuCheckboxItem", Fx = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
  return /* @__PURE__ */ f(Tx, { ...o, ...r, ref: t });
});
Fx.displayName = Wx;
var Ux = "DropdownMenuRadioGroup", Yx = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
  return /* @__PURE__ */ f(Mx, { ...o, ...r, ref: t });
});
Yx.displayName = Ux;
var jx = "DropdownMenuRadioItem", Vx = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
  return /* @__PURE__ */ f(Ex, { ...o, ...r, ref: t });
});
Vx.displayName = jx;
var Kx = "DropdownMenuItemIndicator", qx = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
  return /* @__PURE__ */ f(Dx, { ...o, ...r, ref: t });
});
qx.displayName = Kx;
var Gx = "DropdownMenuSeparator", Rd = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
  return /* @__PURE__ */ f(Nx, { ...o, ...r, ref: t });
});
Rd.displayName = Gx;
var Zx = "DropdownMenuArrow", Xx = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
    return /* @__PURE__ */ f(Rx, { ...o, ...r, ref: t });
  }
);
Xx.displayName = Zx;
var Qx = "DropdownMenuSubTrigger", Jx = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
  return /* @__PURE__ */ f(Ax, { ...o, ...r, ref: t });
});
Jx.displayName = Qx;
var e0 = "DropdownMenuSubContent", t0 = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ke(n);
  return /* @__PURE__ */ f(
    Px,
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
t0.displayName = e0;
var n0 = Cd, r0 = Td, o0 = Md, s0 = Dd, a0 = Nd, i0 = Rd;
function Ns({
  ...e
}) {
  return /* @__PURE__ */ f(n0, { "data-slot": "dropdown-menu", ...e });
}
function Rs({
  ...e
}) {
  return /* @__PURE__ */ f(
    r0,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function As({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ f(o0, { children: /* @__PURE__ */ f(
    s0,
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
function Ne({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ f(
    a0,
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
function Ps({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    i0,
    {
      "data-slot": "dropdown-menu-separator",
      className: ce("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var l0 = Object.freeze({
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
}), c0 = "VisuallyHidden", Ad = C.forwardRef(
  (e, t) => /* @__PURE__ */ f(
    ze.span,
    {
      ...e,
      ref: t,
      style: { ...l0, ...e.style }
    }
  )
);
Ad.displayName = c0;
var u0 = Ad, [Uo] = Kn("Tooltip", [
  Ho
]), Yo = Ho(), Pd = "TooltipProvider", d0 = 700, ta = "tooltip.open", [f0, ni] = Uo(Pd), Ld = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = d0,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, a = C.useRef(!0), i = C.useRef(!1), l = C.useRef(0);
  return C.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ f(
    f0,
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
Ld.displayName = Pd;
var kr = "Tooltip", [p0, Rr] = Uo(kr), Id = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, l = ni(kr, e.__scopeTooltip), u = Yo(t), [c, d] = C.useState(null), p = fo(), h = C.useRef(0), m = a ?? l.disableHoverableContent, y = i ?? l.delayDuration, g = C.useRef(!1), [b, v] = Ha({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (l.onOpen(), document.dispatchEvent(new CustomEvent(ta))) : l.onClose(), s?.(D);
    },
    caller: kr
  }), k = C.useMemo(() => b ? g.current ? "delayed-open" : "instant-open" : "closed", [b]), M = C.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, g.current = !1, v(!0);
  }, [v]), w = C.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, v(!1);
  }, [v]), S = C.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      g.current = !0, v(!0), h.current = 0;
    }, y);
  }, [y, v]);
  return C.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ f(Iu, { ...u, children: /* @__PURE__ */ f(
    p0,
    {
      scope: t,
      contentId: p,
      open: b,
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
Id.displayName = kr;
var na = "TooltipTrigger", Od = C.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Rr(na, n), s = ni(na, n), a = Yo(n), i = C.useRef(null), l = We(t, i, o.onTriggerChange), u = C.useRef(!1), c = C.useRef(!1), d = C.useCallback(() => u.current = !1, []);
    return C.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ f(Ou, { asChild: !0, ...a, children: /* @__PURE__ */ f(
      ze.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: ue(e.onPointerMove, (p) => {
          p.pointerType !== "touch" && !c.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: ue(e.onPointerLeave, () => {
          o.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: ue(e.onPointerDown, () => {
          o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: ue(e.onFocus, () => {
          u.current || o.onOpen();
        }),
        onBlur: ue(e.onBlur, o.onClose),
        onClick: ue(e.onClick, o.onClose)
      }
    ) });
  }
);
Od.displayName = na;
var ri = "TooltipPortal", [h0, m0] = Uo(ri, {
  forceMount: void 0
}), _d = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = Rr(ri, t);
  return /* @__PURE__ */ f(h0, { scope: t, forceMount: n, children: /* @__PURE__ */ f(un, { present: n || s.open, children: /* @__PURE__ */ f(qa, { asChild: !0, container: o, children: r }) }) });
};
_d.displayName = ri;
var Hn = "TooltipContent", $d = C.forwardRef(
  (e, t) => {
    const n = m0(Hn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, a = Rr(Hn, e.__scopeTooltip);
    return /* @__PURE__ */ f(un, { present: r || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ f(Hd, { side: o, ...s, ref: t }) : /* @__PURE__ */ f(g0, { side: o, ...s, ref: t }) });
  }
), g0 = C.forwardRef((e, t) => {
  const n = Rr(Hn, e.__scopeTooltip), r = ni(Hn, e.__scopeTooltip), o = C.useRef(null), s = We(t, o), [a, i] = C.useState(null), { trigger: l, onClose: u } = n, c = o.current, { onPointerInTransitChange: d } = r, p = C.useCallback(() => {
    i(null), d(!1);
  }, [d]), h = C.useCallback(
    (m, y) => {
      const g = m.currentTarget, b = { x: m.clientX, y: m.clientY }, v = w0(b, g.getBoundingClientRect()), k = k0(b, v), M = x0(y.getBoundingClientRect()), w = S0([...k, ...M]);
      i(w), d(!0);
    },
    [d]
  );
  return C.useEffect(() => () => p(), [p]), C.useEffect(() => {
    if (l && c) {
      const m = (g) => h(g, c), y = (g) => h(g, l);
      return l.addEventListener("pointerleave", m), c.addEventListener("pointerleave", y), () => {
        l.removeEventListener("pointerleave", m), c.removeEventListener("pointerleave", y);
      };
    }
  }, [l, c, h, p]), C.useEffect(() => {
    if (a) {
      const m = (y) => {
        const g = y.target, b = { x: y.clientX, y: y.clientY }, v = l?.contains(g) || c?.contains(g), k = !C0(b, a);
        v ? p() : k && (p(), u());
      };
      return document.addEventListener("pointermove", m), () => document.removeEventListener("pointermove", m);
    }
  }, [l, c, a, u, p]), /* @__PURE__ */ f(Hd, { ...e, ref: s });
}), [y0, b0] = Uo(kr, { isInside: !1 }), v0 = /* @__PURE__ */ Sb("TooltipContent"), Hd = C.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, l = Rr(Hn, n), u = Yo(n), { onClose: c } = l;
    return C.useEffect(() => (document.addEventListener(ta, c), () => document.removeEventListener(ta, c)), [c]), C.useEffect(() => {
      if (l.trigger) {
        const d = (p) => {
          p.target?.contains(l.trigger) && c();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, c]), /* @__PURE__ */ f(
      za,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ A(
          _u,
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
              /* @__PURE__ */ f(v0, { children: r }),
              /* @__PURE__ */ f(y0, { scope: n, isInside: !0, children: /* @__PURE__ */ f(u0, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
$d.displayName = Hn;
var zd = "TooltipArrow", Bd = C.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Yo(n);
    return b0(
      zd,
      n
    ).isInside ? null : /* @__PURE__ */ f($u, { ...o, ...r, ref: t });
  }
);
Bd.displayName = zd;
function w0(e, t) {
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
function k0(e, t, n = 5) {
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
function x0(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function C0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], u = i.x, c = i.y, d = l.x, p = l.y;
    c > r != p > r && n < (d - u) * (r - c) / (p - c) + u && (o = !o);
  }
  return o;
}
function S0(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), T0(t);
}
function T0(e) {
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
var M0 = Ld, E0 = Id, D0 = Od, N0 = _d, R0 = $d, A0 = Bd;
function P0({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ f(
    M0,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function ra({
  ...e
}) {
  return /* @__PURE__ */ f(P0, { children: /* @__PURE__ */ f(E0, { "data-slot": "tooltip", ...e }) });
}
function oa({
  ...e
}) {
  return /* @__PURE__ */ f(D0, { "data-slot": "tooltip-trigger", ...e });
}
function sa({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ f(N0, { children: /* @__PURE__ */ A(
    R0,
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
        /* @__PURE__ */ f(A0, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const Re = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ A(ra, { children: [
    /* @__PURE__ */ f(oa, { asChild: !0, children: s }),
    /* @__PURE__ */ f(sa, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, Mn = () => /* @__PURE__ */ f("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), L0 = Wn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const l = K(null), [u, c] = V(!1), [d, p] = V(void 0), h = ql({
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
  }), m = Y(() => {
    const { view: S } = t, { from: D } = S.state.selection, x = S.coordsAtPos(D);
    p({ top: x.bottom + 8, left: x.left }), c(!0);
  }, [t]), y = Y((S, D) => {
    t.chain().focus().setImage({ src: S, alt: D }).run(), c(!1);
  }, [t]), g = Y(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = Y((S) => {
    t.chain().focus().insertCallout({ type: S }).run();
  }, [t]), v = K(/* @__PURE__ */ new Map()), k = K(/* @__PURE__ */ new Map()), M = Y((S) => {
    const { doc: D, tr: x } = S.state;
    let T = !1;
    const E = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = S.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), N.forEach((I, O) => {
      I.querySelectorAll(":scope > li").forEach((W) => {
        const q = W, L = (q.textContent || "").trim().substring(0, 50);
        v.current.set(`${O}-${L}`, q.getBoundingClientRect());
      });
    });
    const R = [];
    D.descendants((I, O, H, W) => {
      if (!E.has(I.type.name)) return !0;
      let q = !1;
      if (I.forEach((P) => {
        P.type.name === "taskItem" && (q = !0);
      }), !q) return !0;
      let L = 0;
      return D.nodesBetween(0, O, (P) => (E.has(P.type.name) && L++, !0)), R.push({ node: I, pos: O, depth: L }), !0;
    }), R.sort((I, O) => O.depth - I.depth);
    for (const { node: I, pos: O } of R) {
      const H = [];
      let W = 0;
      I.forEach(($) => {
        H.push({
          node: $,
          isTask: $.type.name === "taskItem",
          checked: $.type.name === "taskItem" && $.attrs.checked === !0,
          originalIndex: W++
        });
      });
      const q = H.filter(($) => $.isTask && !$.checked), L = H.filter(($) => $.isTask && $.checked), P = [...H], j = H.map(($, B) => ({ index: B, isTask: $.isTask })).filter(($) => $.isTask).map(($) => $.index), Z = [...q, ...L];
      if (j.forEach(($, B) => {
        P[$] = Z[B];
      }), !P.some(($, B) => $.node !== H[B].node)) continue;
      const Q = I.type.create(
        I.attrs,
        P.map(($) => $.node)
      ), re = x.mapping.map(O);
      x.replaceWith(re, re + I.nodeSize, Q), T = !0;
    }
    T && (S.view.dispatch(x), requestAnimationFrame(() => {
      S.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const H = O.querySelectorAll(":scope > li"), W = /* @__PURE__ */ new Map();
        v.current.forEach((q, L) => {
          const P = L.replace(/^\d+-/, "");
          W.set(P, q);
        }), H.forEach((q) => {
          const L = q, P = (L.textContent || "").trim().substring(0, 50), j = W.get(P);
          if (!j) return;
          const Z = L.getBoundingClientRect(), G = j.top - Z.top;
          if (Math.abs(G) < 2) return;
          L.style.transform = `translateY(${G}px)`, L.style.transition = "none", L.style.zIndex = "1", L.offsetHeight, L.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", L.style.transform = "translateY(0)";
          const Q = () => {
            L.style.transform = "", L.style.transition = "", L.style.zIndex = "", L.removeEventListener("transitionend", Q);
          };
          L.addEventListener("transitionend", Q), setTimeout(Q, 400);
        });
      });
    }));
  }, []);
  J(() => {
    if (!s || !t) return;
    const S = /* @__PURE__ */ new Map();
    t.state.doc.descendants((x, T) => (x.type.name === "taskItem" && S.set(T, x.attrs.checked === !0), !0)), k.current = S;
    const D = ({ transaction: x }) => {
      if (!x.docChanged) return;
      const T = /* @__PURE__ */ new Map();
      t.state.doc.descendants((R, I) => (R.type.name === "taskItem" && T.set(I, R.attrs.checked === !0), !0));
      const E = k.current;
      let N = !1;
      if (E.size > 0 && T.size > 0) {
        let R = 0, I = 0;
        E.forEach((O) => {
          O && R++;
        }), T.forEach((O) => {
          O && I++;
        }), R !== I && (N = !0);
      }
      k.current = T, N && setTimeout(() => {
        M(t);
      }, 150);
    };
    return t.on("transaction", D), () => {
      t.off("transaction", D);
    };
  }, [t, s, M]);
  const w = Y(() => {
    M(t);
  }, [t, M]);
  return /* @__PURE__ */ A("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !h?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ f(Mp, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !h?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ f(Ep, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Mn, {}),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: h?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ f(ha, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: h?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ f(ma, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: h?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ f(ga, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: h?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ f(ya, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: h?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ f(Xl, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: h?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ f(Ql, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => r?.(),
        isActive: h?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ f(ba, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Mn, {}),
    /* @__PURE__ */ A(Ns, { children: [
      /* @__PURE__ */ f(Rs, { asChild: !0, children: /* @__PURE__ */ A(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${h?.isH1 || h?.isH2 || h?.isH3 || h?.isH4 || h?.isH5 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ f("span", { className: "min-w-[18px] text-center", children: h?.isH1 ? "H1" : h?.isH2 ? "H2" : h?.isH3 ? "H3" : h?.isH4 ? "H4" : h?.isH5 ? "H5" : "P" }),
            /* @__PURE__ */ f(Kt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(As, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !h?.isH1 && !h?.isH2 && !h?.isH3 && !h?.isH4 && !h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ne,
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
          Ne,
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
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: h?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: h?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ f("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }),
              /* @__PURE__ */ f("span", { className: "font-semibold", children: "Heading 5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f(Mn, {}),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: h?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ f(wa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: h?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ f(ka, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: h?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ f(xa, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: h?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ f(va, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: h?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ f(rc, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ f(Dp, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ f(Np, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(Mn, {}),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: g,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ f(zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: m,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ f(Ta, { size: 16 })
      }
    ),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ f(oc, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(Ns, { children: [
      /* @__PURE__ */ f(Rs, { asChild: !0, children: /* @__PURE__ */ f(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ f(uo, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ A(As, { align: "start", children: [
        /* @__PURE__ */ A(Ne, { onClick: () => b("info"), children: [
          /* @__PURE__ */ f(uo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ A(Ne, { onClick: () => b("note"), children: [
          /* @__PURE__ */ f(Sa, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ A(Ne, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ f(Rp, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ A(Ne, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ f(Ap, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ A(Ne, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ f(Ca, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ A(Ns, { children: [
      /* @__PURE__ */ f(Rs, { asChild: !0, children: /* @__PURE__ */ A(
        Vt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ f(zs, { size: 16 }),
            /* @__PURE__ */ f("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ A(As, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ f(Ei, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ f(Ei, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ f(Dn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ f(Ps, {}),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ f(Di, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ f(Di, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ f(Dn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ f(Ps, {}),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ f(Ni, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ f(Ni, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ f(Ps, {}),
        /* @__PURE__ */ A(
          Ne,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ f(Dn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f(
      su,
      {
        isOpen: u,
        onClose: () => c(!1),
        onInsert: y,
        position: d
      }
    ),
    /* @__PURE__ */ f(Mn, {}),
    /* @__PURE__ */ f(
      Re,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ f(Pp, { size: 16 })
      }
    ),
    a && /* @__PURE__ */ A(Ie, { children: [
      /* @__PURE__ */ f(Mn, {}),
      /* @__PURE__ */ A(ra, { children: [
        /* @__PURE__ */ f(oa, { asChild: !0, children: /* @__PURE__ */ f(
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
            children: /* @__PURE__ */ f(Do, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ f(sa, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ A(ra, { children: [
      /* @__PURE__ */ f(oa, { asChild: !0, children: /* @__PURE__ */ A(
        Vt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ f(Un, { size: 16 }),
            /* @__PURE__ */ f("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ f(sa, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function I0({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: l }) {
  const u = s === "markdown", [c, d] = V(""), [p, h] = V(""), [m, y] = V(!1), [g, b] = V(!1), [v, k] = V(!1), [M, w] = V(!1), [S, D] = V([]), [x, T] = V(0), [E, N] = V(null), [R, I] = V(!1), O = K(!1), H = K(null), W = K(null), q = K(!1);
  J(() => {
    t && o && o.trim() && d(o);
  }, [t, o, r]);
  const L = Y(() => {
    if (!c || !e) {
      D([]), T(0), N(null);
      return;
    }
    const $ = [];
    let B;
    try {
      if (g)
        B = new RegExp(c, m ? "g" : "gi");
      else {
        let F = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (F = `\\b${F}\\b`), B = new RegExp(F, m ? "g" : "gi");
      }
      N(null);
    } catch (F) {
      N(F.message), D([]);
      return;
    }
    if (u) {
      let F;
      for (; (F = B.exec(a)) !== null; )
        $.push({
          from: F.index,
          to: F.index + F[0].length,
          text: F[0]
        });
    } else {
      const { doc: F } = e.state;
      F.descendants((ee, he) => {
        if (ee.isText && ee.text) {
          let ge;
          for (; (ge = B.exec(ee.text)) !== null; )
            $.push({
              from: he + ge.index,
              to: he + ge.index + ge[0].length,
              text: ge[0]
            });
        }
        return !0;
      });
    }
    D($), $.length > 0 && x >= $.length && T(0);
  }, [c, m, g, v, e, x, u, a]);
  J(() => {
    L();
  }, [L]), J(() => {
    u && l && (t && S.length > 0 ? l(S, x) : l([], 0));
  }, [u, t, S, x, l]), J(() => {
    if (!e) return;
    if (u) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const $ = typeof e.commands.setSearchHighlight == "function";
    t && c && $ ? e.commands.setSearchHighlight({
      searchTerm: c,
      caseSensitive: m,
      useRegex: g,
      currentMatchIndex: x
    }) : $ && e.commands.clearSearchHighlight();
  }, [e, t, c, m, g, x, u, S, a]), J(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), I(!1)), O.current = !1);
  }, [t, e, l]), J(() => {
    if (S.length > 0 && x < S.length) {
      const $ = S[x];
      if (u) {
        const F = document.querySelector(".syntax-textarea");
        if (F && q.current) {
          const ee = parseInt(getComputedStyle(F).lineHeight) || 22, ge = a.substring(0, $.from).split(`
`).length;
          F.scrollTop = Math.max(0, (ge - 3) * ee);
        }
        q.current && (q.current = !1);
        return;
      }
      const B = e.view.domAtPos($.from);
      B.node && B.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), q.current && (q.current = !1);
    }
  }, [x, S, e, u, a]), J(() => {
    t && H.current && (H.current.focus(), H.current.select());
  }, [t, r]);
  const P = Y(() => {
    S.length !== 0 && (q.current = !0, T(($) => ($ + 1) % S.length));
  }, [S.length]), j = Y(() => {
    S.length !== 0 && (q.current = !0, T(($) => ($ - 1 + S.length) % S.length));
  }, [S.length]), Z = Y(() => {
    if (S.length === 0 || x >= S.length) return;
    const $ = S[x];
    if (u && i) {
      const B = a.substring(0, $.from) + p + a.substring($.to);
      i(B), setTimeout(L, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(p).run(), setTimeout(L, 10);
  }, [S, x, p, e, L, u, a, i]), G = Y(() => {
    if (S.length === 0) return;
    if (u && i) {
      const B = [...S].sort((ee, he) => he.from - ee.from);
      let F = a;
      B.forEach((ee) => {
        F = F.substring(0, ee.from) + p + F.substring(ee.to);
      }), i(F), setTimeout(L, 10);
      return;
    }
    const $ = [...S].sort((B, F) => F.from - B.from);
    e.chain().focus(), $.forEach((B) => {
      e.chain().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(p).run();
    }), setTimeout(L, 10);
  }, [S, p, e, L, u, a, i]), Q = Y(() => {
    if (S.length === 0 || !c || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: c,
      caseSensitive: m,
      useRegex: g,
      wholeWord: v
    }) && (I(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [S, c, m, g, v, e, n]), re = Y(($) => {
    $.key === "Enter" ? ($.preventDefault(), $.shiftKey ? j() : P(), H.current?.focus()) : $.key === "Escape" ? ($.preventDefault(), n()) : $.key === "h" && ($.ctrlKey || $.metaKey) ? ($.preventDefault(), w((B) => !B)) : $.key === "l" && ($.ctrlKey || $.metaKey) && $.shiftKey && ($.preventDefault(), Q());
  }, [P, j, n, Q]);
  return t ? /* @__PURE__ */ A(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: re,
      children: [
        /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ f(Lp, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: H,
                type: "text",
                placeholder: "Find...",
                value: c,
                onChange: ($) => d($.target.value),
                className: `find-replace-input ${E ? "has-error" : ""}`
              }
            ),
            E && /* @__PURE__ */ f("span", { className: "find-replace-error", title: E, children: "!" })
          ] }),
          /* @__PURE__ */ f("span", { className: "find-replace-count", children: S.length > 0 ? `${x + 1} of ${S.length}` : c ? "No results" : "" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: j,
              disabled: S.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ f(Ip, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: P,
              disabled: S.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ f(Kt, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: Q,
              disabled: S.length === 0,
              className: `find-replace-btn ${R ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${S.length} matches`,
              children: /* @__PURE__ */ f(Op, { size: 16 })
            }
          ),
          /* @__PURE__ */ f("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => y(($) => !$),
              className: `find-replace-btn ${m ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ f(_p, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => k(($) => !$),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ f($p, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => b(($) => !$),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ f(Hp, { size: 16 })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => w(($) => !$),
              className: `find-replace-btn ${M ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ f(Bs, { size: 16 })
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
        M && /* @__PURE__ */ A("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ A("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ f(Bs, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ f(
              "input",
              {
                ref: W,
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
              onClick: Z,
              disabled: S.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ A(
            "button",
            {
              onClick: G,
              disabled: S.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ f(zp, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const O0 = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), St = O0 ? "⌘" : "Ctrl", _0 = ({ editor: e }) => {
  const [t, n] = V(!1), [r, o] = V(0), [s, a] = V(0), [i, l] = V(""), [u, c] = V(""), [d, p] = V(!1), [h, m] = V(!1);
  J(() => {
    if (!e) return;
    const D = () => {
      const T = e.storage.selectAllOccurrences;
      T ? (n(T.isActive), o(T.ranges.length), a(T.allMatches.length), l(T.searchTerm), c(T.typedBuffer), p(T.isTypingReplace), m(T.isIncremental)) : (n(!1), o(0), a(0));
    }, x = () => {
      D();
    };
    return e.on("transaction", x), D(), () => {
      e.off("transaction", x);
    };
  }, [e]);
  const y = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), g = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), b = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = Y(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), k = Y(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), M = Y(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = Y(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), S = Y(() => {
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
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ A(Ie, { children: [
        /* @__PURE__ */ f(No, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-old", children: i }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ f("span", { className: "select-all-action-bar-preview-new", children: u || "∅" })
      ] }) : /* @__PURE__ */ f(Ie, { children: /* @__PURE__ */ A("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        i,
        '"'
      ] }) }) }),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" }),
      h && r < s && /* @__PURE__ */ A(Ie, { children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${St}+D)`,
            children: /* @__PURE__ */ f(Ea, { size: 14 })
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: S,
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
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${St}+B)`,
          children: /* @__PURE__ */ f(ha, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${St}+I)`,
          children: /* @__PURE__ */ f(ma, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${St}+U)`,
          children: /* @__PURE__ */ f(ga, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ f(ya, { size: 14 })
        }
      ),
      /* @__PURE__ */ f("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: k,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ f(Dn, { size: 14 })
        }
      ),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: M,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ f(Nt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "select-all-action-bar-hint", children: h && r < s ? /* @__PURE__ */ A(Ie, { children: [
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
    ] }) : /* @__PURE__ */ A(Ie, { children: [
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
}, $0 = Wn(_0), eo = "-dismissed";
function H0(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function z0(e, t = {}) {
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
  }), u = K(null), c = K(""), d = K(0);
  J(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + eo);
        if (b && !v) {
          let k = "";
          try {
            k = e.getHTML() || "";
          } catch {
            return;
          }
          b !== k && b.length > 50 && l((M) => ({ ...M, hasRecoverableContent: !0 }));
        }
      } catch (b) {
        console.warn("useAutoSave: Error checking for recoverable content", b);
      }
  }, [e, n, o]);
  const p = Y(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const b = e.getHTML(), v = H0(b);
        if (v === d.current && b.length === c.current.length) {
          l((k) => ({ ...k, status: "saved" }));
          return;
        }
        if (b.length < 20)
          return;
        l((k) => ({ ...k, status: "saving" })), localStorage.setItem(n, b), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), c.current = b, d.current = v, l((k) => ({
          ...k,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(b), setTimeout(() => {
          l((k) => k.status === "saved" ? { ...k, status: "idle" } : k);
        }, 2e3);
      } catch (b) {
        console.error("useAutoSave: Error saving content", b), l((v) => ({
          ...v,
          status: "error",
          error: b instanceof Error ? b.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  J(() => {
    if (!e || !o || e.isDestroyed) return;
    const b = () => {
      e.isDestroyed || (u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        p();
      }, r));
    };
    return e.on("update", b), () => {
      e.off("update", b), u.current && clearTimeout(u.current);
    };
  }, [e, r, o, p]), J(() => {
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
  const h = Y(() => {
    u.current && clearTimeout(u.current), p();
  }, [p]), m = Y(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + eo), c.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (b) {
      console.warn("useAutoSave: Error clearing content", b);
    }
  }, [n]), y = Y(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const b = localStorage.getItem(n);
      return b && e && !e.isDestroyed ? (l((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(b), c.current = b, localStorage.removeItem(n + eo), a?.(b);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), b) : null;
    } catch (b) {
      return console.warn("useAutoSave: Error recovering content", b), null;
    }
  }, [e, n, a]), g = Y(() => {
    try {
      localStorage.setItem(n + eo, "true"), l((b) => ({ ...b, hasRecoverableContent: !1 }));
    } catch (b) {
      console.warn("useAutoSave: Error dismissing recovery", b);
    }
  }, [n]);
  return {
    ...i,
    save: h,
    clear: m,
    recover: y,
    dismissRecovery: g
  };
}
const B0 = 200;
function W0(e, t = {}) {
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
  }), i = K(null), l = K(""), u = Y((c) => {
    const d = c.trim(), p = d.length > 0 ? d.split(/\s+/).filter((v) => v.length > 0).length : 0, h = d.replace(/\s/g, "").length, m = c.length;
    let y = 0, g = 0;
    r && (y = d.length > 0 ? d.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, g = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const b = Math.max(1, Math.ceil(p / B0));
    return {
      words: p,
      characters: h,
      charactersWithSpaces: m,
      paragraphs: y,
      sentences: g,
      readingTime: b,
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
function F0({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ A(Ie, { children: [
          /* @__PURE__ */ f(Bp, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ A("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ A(Ie, { children: [
          /* @__PURE__ */ f(sc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ f("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ A(Ie, { children: [
          /* @__PURE__ */ f(Fn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ f("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ A(Ie, { children: [
          /* @__PURE__ */ f(Wp, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ f("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function U0({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ A(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ f(Fp, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ f("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ A(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ f(Da, { className: "w-4 h-4" }),
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
const Y0 = /\[\[([^\[\]]+)\]\]$/, j0 = Zf.create({
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
      Bn(
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
      new qe({
        find: Y0,
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
}, Dl = ["info", "note", "prompt", "resources", "todo"];
function V0(e) {
  return e.length < 3 ? !1 : !!(Tt.header.test(e) || Tt.bold.test(e) || Tt.list.test(e) || Tt.taskList.test(e) || Tt.codeBlock.test(e) || Tt.callout.test(e) || Tt.highlight.test(e) || Tt.link.test(e) || Tt.table.test(e));
}
function K0(e) {
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
function q0(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (a) => {
    const i = a.split(`
`);
    if (i.length >= 2) {
      const l = i[1];
      if (/^\|?[\s\-:|]+\|?$/.test(l) && l.includes("-")) {
        const u = K0(a);
        if (u) {
          const c = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(u), c;
        }
      }
    }
    return a;
  }), Dl.forEach((a) => {
    const i = new RegExp(`\`\`\`${a}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(i, (l, u) => {
      let c = u.trim();
      return c = c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), c = c.replace(/__([^_]+)__/g, "<strong>$1</strong>"), c = c.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), c = c.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), c = c.replace(/`([^`]+)`/g, "<code>$1</code>"), c.startsWith("<") || (c = `<p>${c}</p>`), `<div data-callout="" data-type="${a}" class="callout callout-${a}">${c}</div>`;
    });
  }), t = t.replace(/```(\w*)\n([\s\S]*?)```/g, (a, i, l) => {
    if (Dl.includes(i))
      return `<div data-callout="" data-type="${i}" class="callout callout-${i}"><p>${l.trim()}</p></div>`;
    const u = i || "plaintext", c = l.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<pre><code class="language-${u}">${c}</code></pre>`;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/^(#{1,6})\s+(.+)$/gm, (a, i, l) => {
    const u = i.length;
    return `<h${u}>${l}</h${u}>`;
  }), t = t.replace(/^(\s*)[-*]\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s+(?!\[)(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/^(\s*)\d+\.\s+(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/(<li data-type="taskItem"[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul data-type="taskList">$&</ul>'), t = t.replace(/(<li><p>[\s\S]*?<\/p><\/li>\n?)+/g, "<ul>$&</ul>"), t = t.replace(/^>\s+(.+)$/gm, "<blockquote><p>$1</p></blockquote>"), t = t.replace(/^[-*_]{3,}$/gm, "<hr>"), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (a, i, l) => {
    const u = i.split("|").map((m) => m.trim());
    let c = "", d = "left", p = null;
    u.length === 1 ? c = u[0] : u.length === 2 ? (c = u[0], /^\d+$/.test(u[1]) ? p = u[1] : ["left", "center", "right"].includes(u[1]) ? d = u[1] : c = i) : u.length === 3 ? (c = u[0], ["left", "center", "right"].includes(u[1]) && (d = u[1]), /^\d+$/.test(u[2]) && (p = u[2])) : c = i;
    const h = p ? ` width="${p}" style="width: ${p}px"` : "";
    return `<img src="${l.trim()}" alt="${c}" data-align="${d}"${h}>`;
  }), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((a) => {
    const i = a.trim();
    return i ? /^<[a-z]/.test(i) || /^<\//.test(i) || i.startsWith("MANUSTABLEPLACEHOLDER") ? a : `<p>${i}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let a = 0; a < r.length; a++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${a}END`, r[a]);
  return t;
}
const G0 = ut.create({
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
            if (!a || !V0(a))
              return !1;
            n.preventDefault();
            const i = q0(a);
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
}), Nl = new Ve("collapsibleHeading");
function vo(e, t, n) {
  return `h${t}-${n}-${e.textContent.slice(0, 50)}`;
}
let On = null;
function Ls(e, t, n) {
  const r = [], o = [];
  e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const c = vo(l, l.attrs.level, u);
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
      const c = vo(l, l.attrs.level, u), d = t.collapsedHeadings.has(c), p = i(u);
      r.push(
        it.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${d ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": c,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const h = it.widget(u + l.nodeSize - 1, () => {
        const m = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${c}"]`);
        if (m) {
          m.classList.contains("collapsed") !== d && (m.classList.remove("collapsed", "expanded"), m.classList.add(d ? "collapsed" : "expanded"), m.title = d ? "Click to expand" : "Click to collapse");
          const v = m.parentElement;
          if (v) return v;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const g = document.createElement("button");
        return g.className = `collapsible-heading-chevron ${d ? "collapsed" : "expanded"}`, g.setAttribute("data-heading-id", c), g.setAttribute("data-heading-level", String(l.attrs.level)), g.setAttribute("contenteditable", "false"), g.setAttribute("tabindex", "-1"), g.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', g.title = d ? "Click to expand" : "Click to collapse", g.addEventListener("click", (b) => {
          b.preventDefault(), b.stopPropagation();
          const v = g.classList.contains("collapsed");
          g.classList.remove("collapsed", "expanded"), g.classList.add(v ? "expanded" : "collapsed"), g.title = v ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(c) ? t.collapsedHeadings.delete(c) : t.collapsedHeadings.add(c), On && On.dispatch(On.state.tr.setMeta("collapsibleHeading", { toggled: c }));
        }), y.appendChild(g), y;
      }, { side: 1, key: `chevron-${c}` });
      r.push(h);
    } else l.isBlock && i(u) && r.push(
      it.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Xe.create(e, r);
}
const Z0 = ut.create({
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
        const s = vo(o, o.attrs.level, e);
        return r.collapsedHeadings.has(s) ? r.collapsedHeadings.delete(s) : r.collapsedHeadings.add(s), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: s })), !0;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          o.type.name === "heading" && n.collapsedHeadings.add(vo(o, o.attrs.level, s));
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new je({
        key: Nl,
        view(n) {
          return On = n, {
            update(r) {
              On = r;
            },
            destroy() {
              On = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: Ls(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleHeading") || n.docChanged ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Ls(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Nl.getState(n);
            return r?.decorations ? r.decorations : Ls(n.doc, e, t);
          }
        }
      })
    ];
  }
}), X0 = /\[([^\]]+)\]\(([^)]+)\)$/, Q0 = /^(https?:\/\/|www\.)[^\s]+$/i, J0 = ut.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new qe({
        find: X0,
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
            if (!Q0.test(s)) return !1;
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
}), e1 = ["info", "note", "prompt", "resources", "todo"], t1 = ut.create({
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
            for (const c of e1)
              if (u === `\`\`\`${c}`) {
                n.preventDefault();
                const d = r.tr, p = i + l.indexOf("```");
                d.delete(p, a.pos);
                const h = e.schema.nodes.callout, m = e.schema.nodes.paragraph;
                if (h && m) {
                  const y = m.create(), g = h.create({ type: c }, ah.from(y));
                  d.insert(p, g);
                  const b = d.doc.resolve(p + 2);
                  d.setSelection(fa.near(b)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), to = new Ve("searchHighlight"), n1 = ut.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(to, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(to, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new je({
        key: to,
        state: {
          init() {
            return Xe.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: l } = e, u = t.getMeta(to), c = t.docChanged;
            if (!s)
              return Xe.empty;
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
              o.doc.descendants((m, y) => {
                if (m.isText && m.text) {
                  let g;
                  for (; (g = h.exec(m.text)) !== null; ) {
                    const b = y + g.index, v = y + g.index + g[0].length, k = p === l;
                    d.push(
                      it.inline(b, v, {
                        class: k ? "search-highlight-current" : "search-highlight"
                      })
                    ), p++;
                  }
                }
                return !0;
              });
            } catch {
              return Xe.empty;
            }
            return Xe.create(o.doc, d);
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
}), r1 = new Ve("tabIndent");
function o1(e) {
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
const s1 = ut.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new je({
        key: r1,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = o1(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Ri(s)(n, r)) {
                const l = o === "taskItem" ? "listItem" : "taskItem", u = n.schema.nodes[l];
                u && Ri(u)(n, r);
              }
            } else if (!Ai(s)(n, r)) {
              const l = o === "taskItem" ? "listItem" : "taskItem", u = n.schema.nodes[l];
              u && Ai(u)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), a1 = new Ve("expandSelection");
function Is(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
function i1(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const a = r.start(o), i = r.end(o);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function l1(e, t, n) {
  const r = e.resolve(t), o = e.resolve(n), s = Math.max(r.depth, o.depth);
  for (let a = s; a >= 1; a--) {
    const i = Math.max(1, Math.min(a, r.depth)), l = Math.max(1, Math.min(a, o.depth));
    if (i > r.depth || l > o.depth) continue;
    const u = r.before(i), c = o.after(l);
    if (u < t || c > n)
      return { from: u, to: c };
  }
  return t > 0 || n < e.content.size ? { from: 0, to: e.content.size } : null;
}
const c1 = ut.create({
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
      "Mod-a": ({ editor: e }) => {
        const t = this.storage, { doc: n, selection: r } = e.state, { from: o, to: s } = r;
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof Gf || o === 0 && s === n.content.size)
          return !0;
        if (t.expansionDepth === 0) {
          const l = i1(n, o, s);
          if (l && (l.from < o || l.to > s))
            return t.lastExpandedFrom = l.from, t.lastExpandedTo = l.to, t.expansionDepth = 1, t.isExpanding = !0, e.commands.setTextSelection({
              from: l.from,
              to: l.to
            }), t.isExpanding = !1, !0;
        }
        const i = l1(n, o, s);
        return i ? (t.lastExpandedFrom = i.from, t.lastExpandedTo = i.to, t.expansionDepth++, t.isExpanding = !0, i.from === 0 && i.to === n.content.size ? e.commands.selectAll() : e.commands.setTextSelection({
          from: i.from,
          to: i.to
        }), t.isExpanding = !1, !0) : (t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size, t.expansionDepth++, t.isExpanding = !0, e.commands.selectAll(), t.isExpanding = !1, !0);
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new je({
        key: a1,
        props: {
          handleClick() {
            return Is(e), !1;
          },
          handleTextInput() {
            return Is(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && Is(e), !1;
          }
        }
      })
    ];
  }
}), He = new Ve("selectAllOccurrences");
function Rl(e, t, n, r, o) {
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
function Yt(e, t) {
  const n = He.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function u1(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Le(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const d1 = ut.create({
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
        const l = Rl(t.state.doc, o, s, a, i);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = a, this.storage.wholeWord = i, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(He, { activate: !0 })), !0);
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
              let y = m, g = m;
              for (; y > 0 && /\w/.test(h[y - 1]); ) y--;
              for (; g < h.length && /\w/.test(h[g]); ) g++;
              y < g && (i = h.slice(y, g));
            }
          }
          if (!i) return !1;
          const l = Rl(o.doc, i, !1, !1, !1);
          if (l.length === 0) return !1;
          const u = u1(l, s), c = l[u];
          return r.isActive = !0, r.ranges = [c], r.searchTerm = i, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = i.length, r.allMatches = l, r.nextMatchIndex = (u + 1) % l.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(He, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(He, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Le(this.storage), t && t(e.setMeta(He, { deactivate: !0 })), !0),
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
              const l = Yt(i, this.storage);
              this.storage.ranges = l, l.length === 0 && Le(this.storage);
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
        return Le(this.storage), !0;
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
              const s = Yt(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Le(this.storage);
            }
          } catch {
          }
        }, 10) : Le(this.storage), !0;
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
        key: He,
        state: {
          init() {
            return Xe.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(He);
            if (s?.deactivate || !e.isActive)
              return Xe.empty;
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
              return Xe.create(o.doc, a);
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
              Le(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(He, { deactivate: !0 }));
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
              Le(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(He, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), ih(t.state, t.dispatch), setTimeout(() => {
                  const s = Yt(t);
                  e.ranges = s, s.length === 0 && Le(e);
                }, 10), !0;
              }
              Le(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(He, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, lh(t.state, t.dispatch), setTimeout(() => {
                  const s = Yt(t);
                  e.ranges = s, s.length === 0 && Le(e);
                }, 10), !0;
              }
              Le(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(He, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Yt(t);
                if (r.length === 0) {
                  Le(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(He, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((i, l) => l.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(o));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = Yt(t);
                  e.ranges = i, i.length === 0 && Le(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((a, i) => i.from - a.from), { tr: o } = t.state;
                for (const a of r)
                  o.delete(a.from, a.to);
                t.dispatch(o), Le(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(He, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((a, i) => i.from - a.from), { tr: o } = t.state;
              for (const a of r)
                o.delete(a.from, a.to);
              t.dispatch(o), Le(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(He, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Le(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(He, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Le(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(He, { deactivate: !0 })), !1;
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
            const s = Yt(t);
            if (s.length === 0) {
              Le(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(He, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const a = [...s].sort((l, u) => u.from - l.from), { tr: i } = t.state;
            for (const l of a)
              i.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const l = Yt(t);
              e.ranges = l, l.length === 0 && Le(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function f1() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function p1(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function h1(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", a = atob(r), i = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    i[l] = a.charCodeAt(l);
  return new File([i], t, { type: s });
}
function m1(e, t) {
  return t.includes(e.type);
}
function g1(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function y1(e, t, n) {
  return new Promise((r, o) => {
    const s = new window.Image(), a = new FileReader();
    a.onload = (i) => {
      s.src = i.target?.result;
    }, a.onerror = () => o(new Error("Failed to read file")), s.onload = () => {
      let i = s.width, l = s.height;
      if (i > t) {
        const g = t / i;
        i = t, l = Math.round(l * g);
      }
      const u = document.createElement("canvas");
      u.width = i, u.height = l;
      const c = u.getContext("2d");
      if (!c) {
        o(new Error("Failed to get canvas context"));
        return;
      }
      c.imageSmoothingEnabled = !0, c.imageSmoothingQuality = "high", c.drawImage(s, 0, 0, i, l);
      const d = e.type === "image/png" || e.type === "image/gif", p = d ? "image/png" : "image/jpeg", h = d ? void 0 : n, m = u.toDataURL(p, h), y = h1(m, e.name);
      r({ dataUrl: m, file: y, width: i, height: l });
    }, s.onerror = () => o(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function b1(e, t, n) {
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
async function Al(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!m1(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = f1();
  try {
    n.onUploadStart?.();
    let o, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const d = await y1(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = d.dataUrl, a = d.file, s = Math.min(d.width, 600);
    } else {
      o = await p1(e), a = e;
      const d = await g1(o);
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
            const { state: y, dispatch: g } = t.view, b = y.doc.nodeAt(m);
            if (b) {
              const v = y.tr.setNodeMarkup(m, void 0, {
                ...b.attrs,
                src: d
              });
              g(v);
            }
          } catch (y) {
            console.warn("Failed to replace placeholder with uploaded reference:", y);
          }
          return p = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((h, m) => {
        if (h.type.name === "resizableImage" && h.attrs.src === d) {
          const y = t.view.nodeDOM(m);
          if (y) {
            const g = y instanceof HTMLElement ? y : y.dom;
            g && g.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (d) {
      return console.warn("Image upload failed, removing placeholder:", d), b1(t, o, e.name), n.onUploadError?.(`Upload failed: ${d instanceof Error ? d.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function Pl(e) {
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
const v1 = ut.create({
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
            const s = Pl(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((a) => {
              Al(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const a = r.dataTransfer;
            if (!a) return !1;
            const i = Pl(a);
            if (i.length === 0)
              return !1;
            r.preventDefault();
            const l = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (l) {
              const u = n.state.tr.setSelection(
                fa.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(u);
            }
            return i.forEach((u) => {
              Al(u, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function w1({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = V(!1), [o, s] = V(0), a = Y((c) => {
    c.preventDefault(), c.stopPropagation(), c.dataTransfer?.types.includes("Files") && (s((d) => d + 1), r(!0));
  }, []), i = Y((c) => {
    c.preventDefault(), c.stopPropagation(), s((d) => {
      const p = d - 1;
      return p === 0 && r(!1), p;
    });
  }, []), l = Y((c) => {
    c.preventDefault(), c.stopPropagation();
  }, []), u = Y((c) => {
    c.preventDefault(), c.stopPropagation(), r(!1), s(0);
  }, []);
  return J(() => {
    if (!t || !e.current) return;
    const c = e.current;
    return c.addEventListener("dragenter", a), c.addEventListener("dragleave", i), c.addEventListener("dragover", l), c.addEventListener("drop", u), () => {
      c.removeEventListener("dragenter", a), c.removeEventListener("dragleave", i), c.removeEventListener("dragover", l), c.removeEventListener("drop", u);
    };
  }, [t, e, a, i, l, u]), n ? /* @__PURE__ */ f("div", { className: "image-drop-zone", children: /* @__PURE__ */ A("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ f("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ f(Up, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ A("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ f("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ f("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function k1({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [a, i] = V(e), [l, u] = V(t), c = K(null), d = K(null);
  J(() => {
    d.current?.focus(), d.current?.select();
  }, []), J(() => {
    const g = (v) => {
      c.current && !c.current.contains(v.target) && s();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 100);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", g);
    };
  }, [s]), J(() => {
    const g = (b) => {
      b.key === "Escape" ? s() : b.key === "Enter" && (b.metaKey || b.ctrlKey) && p();
    };
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [a, l, s]);
  const p = () => {
    a.trim() && r(a.trim(), l.trim());
  }, m = (() => {
    let k = n.x - 160, M = n.y + 10;
    return k + 320 > window.innerWidth - 16 && (k = window.innerWidth - 320 - 16), k < 16 && (k = 16), M + 280 > window.innerHeight - 16 && (M = n.y - 280 - 10), M < 16 && (M = 16), { left: k, top: M };
  })(), y = /* @__PURE__ */ A(
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
              /* @__PURE__ */ f(ba, { className: "w-3.5 h-3.5" }),
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
              /* @__PURE__ */ f(No, { className: "w-3.5 h-3.5" }),
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
              children: /* @__PURE__ */ f(Dn, { className: "w-4 h-4" })
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
                  /* @__PURE__ */ f(Fn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ f(Lt, { children: y });
}
function no(e) {
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
      const v = u[1].length;
      t.push({
        type: `heading${v}`,
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
      const v = c[2].toLowerCase() === "x";
      t.push({
        type: v ? "task-checked" : "task-list",
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
    ], y = [];
    for (const v of m) {
      let k;
      for (v.regex.lastIndex = 0; (k = v.regex.exec(i)) !== null; )
        y.push({
          start: l + k.index,
          end: l + k.index + k[0].length,
          type: v.type,
          content: k[0]
        });
    }
    y.sort((v, k) => v.start - k.start);
    const g = [];
    let b = l;
    for (const v of y)
      v.start >= b && (g.push(v), b = v.end);
    for (const v of g)
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
    }), r += i.length + 1;
  }
  return t;
}
function Ll(e) {
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
function sn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function ro(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return sn(e);
  let o = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const u = s[l], c = a + u.length, d = t.filter((h) => h.start >= a && h.start < c);
      let p = a;
      for (const h of d)
        h.start > p && (o += sn(e.substring(p, h.start))), o += `<span class="${Ll(h.type)}">${sn(h.content)}</span>`, p = h.end;
      p < c && (o += sn(e.substring(p, c))), l < s.length - 1 && (o += `
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
      h.start > p && (o += Os(e, p, h.start, null, i)), o += Os(e, h.start, h.end, Ll(h.type), i), p = h.end;
    p < c && (o += Os(e, p, c, null, i)), l < s.length - 1 && (o += `
`), a = c + 1;
  }
  return o;
}
function Os(e, t, n, r, o) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = o.get(a);
    if (i) {
      const l = a;
      for (; a < n && o.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const u = sn(e.substring(l, a)), c = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${c}">${u}</mark></span>` : s += `<mark class="${c}">${u}</mark>`;
    } else {
      const l = a;
      for (; a < n && !o.has(a); )
        a++;
      const u = sn(e.substring(l, a));
      r ? s += `<span class="${r}">${u}</span>` : s += u;
    }
  }
  return s;
}
function x1({
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
  const u = K(null), c = K(null), d = K(null), p = K(null), h = 5e3, m = 80, [y, g] = V(() => {
    const x = no(e);
    return ro(e, x, a, i);
  }), b = K(null), v = an(() => {
    if (e.length <= h) {
      const x = no(e), T = ro(e, x, a, i);
      return b.current && (clearTimeout(b.current), b.current = null), T;
    }
    return null;
  }, [e, a, i]);
  J(() => {
    if (e.length <= h) {
      const x = no(e);
      g(ro(e, x, a, i));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const x = no(e);
      g(ro(e, x, a, i)), b.current = null;
    }, m), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, a, i]);
  const k = v ?? y, M = Y(() => {
    const x = u.current, T = c.current, E = d.current;
    if (x) {
      const N = E?.parentElement, R = N ? N.clientHeight : 200;
      x.style.height = "auto";
      const I = Math.max(x.scrollHeight, R, 200);
      x.style.height = `${I}px`, T && (T.style.height = `${I}px`);
    }
  }, []);
  J(() => {
    const x = u.current;
    if (!x) return;
    const T = (E) => {
      const N = x.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: R, scrollHeight: I, clientHeight: O } = N, H = R <= 0, W = R + O >= I - 1;
      (E.deltaY > 0 && !W || E.deltaY < 0 && !H) && (E.preventDefault(), N.scrollTop += E.deltaY);
    };
    return x.addEventListener("wheel", T, { passive: !1 }), () => x.removeEventListener("wheel", T);
  }, []);
  const w = Y(() => {
  }, []);
  J(() => {
    M();
  }, [e, M]), J(() => {
    o && u.current && u.current.focus();
  }, [o]), J(() => {
    if (p.current && u.current) {
      const { start: x, end: T } = p.current;
      u.current.selectionStart = x, u.current.selectionEnd = T, p.current = null;
    }
  }, [e]);
  const S = Y((x) => {
    const T = x.target;
    p.current = {
      start: T.selectionStart,
      end: T.selectionEnd
    }, t(T.value);
  }, [t]), D = Y((x) => {
    const T = x.currentTarget, E = T.selectionStart, N = T.selectionEnd, R = T.value, I = E !== N;
    if (l) {
      if (x.key === "`" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), I) {
          const O = R.substring(E, N), H = R.substring(0, E) + "`" + O + "`" + R.substring(N);
          p.current = { start: E + 1, end: N + 1 }, t(H);
        } else if (R[E] === "`")
          p.current = { start: E + 1, end: E + 1 }, t(R), T.selectionStart = T.selectionEnd = E + 1;
        else {
          const O = R.substring(0, E) + "``" + R.substring(N);
          p.current = { start: E + 1, end: E + 1 }, t(O);
        }
        return;
      }
      if (x.key === "*" && !x.ctrlKey && !x.metaKey) {
        if (R[E - 1] === "*" && R[E], I) {
          x.preventDefault();
          const W = R.substring(E, N), q = R.substring(0, E) + "*" + W + "*" + R.substring(N);
          p.current = { start: E + 1, end: N + 1 }, t(q);
          return;
        }
        if (R[E] === "*") {
          x.preventDefault(), p.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        x.preventDefault();
        const H = R.substring(0, E) + "**" + R.substring(N);
        p.current = { start: E + 1, end: E + 1 }, t(H);
        return;
      }
      if (x.key === "_" && !x.ctrlKey && !x.metaKey) {
        if (I) {
          x.preventDefault();
          const H = R.substring(E, N), W = R.substring(0, E) + "_" + H + "_" + R.substring(N);
          p.current = { start: E + 1, end: N + 1 }, t(W);
          return;
        }
        if (R[E] === "_") {
          x.preventDefault(), p.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        x.preventDefault();
        const O = R.substring(0, E) + "__" + R.substring(N);
        p.current = { start: E + 1, end: E + 1 }, t(O);
        return;
      }
      if (x.key === "~" && !x.ctrlKey && !x.metaKey) {
        if (I) {
          x.preventDefault();
          const H = R.substring(E, N), W = R.substring(0, E) + "~" + H + "~" + R.substring(N);
          p.current = { start: E + 1, end: N + 1 }, t(W);
          return;
        }
        if (R[E] === "~") {
          x.preventDefault(), p.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
          return;
        }
        x.preventDefault();
        const O = R.substring(0, E) + "~~" + R.substring(N);
        p.current = { start: E + 1, end: E + 1 }, t(O);
        return;
      }
      if (x.key === "[" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), I) {
          const O = R.substring(E, N), H = R.substring(0, E) + "[" + O + "]()" + R.substring(N);
          p.current = { start: N + 3, end: N + 3 }, t(H);
        } else {
          const O = R.substring(0, E) + "[]()" + R.substring(N);
          p.current = { start: E + 1, end: E + 1 }, t(O);
        }
        return;
      }
      if (x.key === "]" && !x.ctrlKey && !x.metaKey && R[E] === "]") {
        x.preventDefault(), p.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
        return;
      }
      if (x.key === ")" && !x.ctrlKey && !x.metaKey && R[E] === ")") {
        x.preventDefault(), p.current = { start: E + 1, end: E + 1 }, t(R.substring(0, E) + R.substring(E));
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
        for (const [q, L] of W)
          if (O === q && H === L) {
            x.preventDefault();
            const P = R.substring(0, E - 1) + R.substring(E + 1);
            p.current = { start: E - 1, end: E - 1 }, t(P);
            return;
          }
        if (O === "[" && R.substring(E, E + 3) === "]()") {
          x.preventDefault();
          const q = R.substring(0, E - 1) + R.substring(E + 3);
          p.current = { start: E - 1, end: E - 1 }, t(q);
          return;
        }
      }
    }
    if (x.key === "Tab")
      if (x.preventDefault(), x.shiftKey) {
        const O = R.substring(0, E), H = R.substring(E, N), W = R.substring(N), L = O.lastIndexOf(`
`) + 1, P = O.substring(0, L), j = O.substring(L), Z = (j + H).split(`
`), G = Z.map(($) => $.startsWith("  ") ? $.substring(2) : $.startsWith("	") ? $.substring(1) : $), Q = P + G.join(`
`) + W, re = (j + H).length - G.join(`
`).length;
        p.current = {
          start: Math.max(L, E - (Z[0].length - G[0].length)),
          end: N - re
        }, t(Q);
      } else if (E === N) {
        const O = R.substring(0, E) + "  " + R.substring(N);
        p.current = { start: E + 2, end: E + 2 }, t(O);
      } else {
        const O = R.substring(0, E), H = R.substring(E, N), W = R.substring(N), L = O.lastIndexOf(`
`) + 1, P = O.substring(0, L), Z = (O.substring(L) + H).split(`
`), G = Z.map((re) => "  " + re), Q = P + G.join(`
`) + W;
        p.current = {
          start: E + 2,
          end: N + Z.length * 2
        }, t(Q);
      }
  }, [t, l]);
  return /* @__PURE__ */ A("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ f(
      "div",
      {
        ref: c,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: k || `<span class="md-placeholder">${sn(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ f(
      "textarea",
      {
        ref: u,
        value: e,
        onChange: S,
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
let Il = 0, aa = 0, Wd = 0;
function C1(e) {
  aa++, Wd = e;
}
const S1 = Wn(function({
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
  }), l = K([]), u = K(performance.now()), c = K(0), d = K(0), p = K(0), h = K(0), [m, y] = V(new Array(60).fill(0)), [g, b] = V(new Array(60).fill(0));
  J(() => {
    if (!t || !r) return;
    const D = () => {
      const x = performance.now();
      queueMicrotask(() => {
        const T = performance.now() - x;
        C1(T);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), J(() => {
    if (!t) return;
    let D = 0, x = performance.now(), T = 0;
    const E = (N) => {
      const R = N - u.current;
      if (u.current = N, l.current.push({ time: N, duration: R }), l.current.length > 120 && (l.current = l.current.slice(-120)), R > 16.67 && d.current++, D++, N - x >= 1e3) {
        T = D, D = 0, x = N;
        const I = l.current.slice(-60), O = I.length > 0 ? I.reduce((G, Q) => G + Q.duration, 0) / I.length : 0, H = I.length > 0 ? Math.max(...I.map((G) => G.duration)) : 0, W = performance.memory, q = W ? W.usedJSHeapSize / (1024 * 1024) : 0, L = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, P = document.querySelectorAll("*").length, j = Il - p.current, Z = aa - h.current;
        p.current = Il, h.current = aa, i({
          fps: T,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(H * 100) / 100,
          memoryUsed: Math.round(q * 10) / 10,
          memoryTotal: Math.round(L),
          renderCount: j,
          transactionCount: Z,
          lastTransactionTime: Math.round(Wd * 100) / 100,
          domNodes: P,
          longFrames: d.current
        }), y((G) => [...G.slice(1), T]), b((G) => [...G.slice(1), O]), d.current = 0;
      }
      c.current = requestAnimationFrame(E);
    };
    return c.current = requestAnimationFrame(E), () => {
      cancelAnimationFrame(c.current);
    };
  }, [t]);
  const v = Y(() => {
    n?.();
  }, [n]), k = Y(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const M = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", w = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", S = (D, x, T) => {
    const R = D.map((I, O) => {
      const H = O / (D.length - 1) * 120, W = 24 - Math.min(I, x) / x * 24;
      return `${H},${W}`;
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
        /* @__PURE__ */ f(Yp, { size: 14 }),
        /* @__PURE__ */ f("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ f("button", { onClick: k, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ f(ac, { size: 12 }) : /* @__PURE__ */ f(ic, { size: 12 }) }),
        /* @__PURE__ */ f("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ f(Nt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ A("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ f("span", { className: "perf-value", style: { color: M(a.fps) }, children: a.fps })
        ] }),
        S(m, 70, M(a.fps))
      ] }),
      /* @__PURE__ */ A("div", { className: "perf-section", children: [
        /* @__PURE__ */ A("div", { className: "perf-row", children: [
          /* @__PURE__ */ f("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ A("span", { className: "perf-value", style: { color: w(a.frameTime) }, children: [
            a.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ f("span", { className: "perf-label-sub", children: "Max" }),
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
        S(g, 50, w(a.frameTime))
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
class T1 extends cp {
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
        /* @__PURE__ */ f("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ f(jp, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ A("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ f("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ f("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ A(
            Vt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ f(Da, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ A(
            Vt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ f(Dn, { className: "w-4 h-4" }),
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
                n ? /* @__PURE__ */ f(Kt, { className: "w-3 h-3" }) : /* @__PURE__ */ f(tc, { className: "w-3 h-3" }),
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
                  children: o ? /* @__PURE__ */ A(Ie, { children: [
                    /* @__PURE__ */ f(Vp, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ f("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ A(Ie, { children: [
                    /* @__PURE__ */ f(Un, { className: "w-3 h-3" }),
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
function M1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function E1(e, t) {
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
function D1(e) {
  const [t, n] = up(E1, { status: "idle" }), r = K(null), o = Y(async (i, l, u, c, d) => {
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
  }, [e]), s = Y(() => {
    r.current?.(), n({ type: "reset" });
  }, []), a = Y(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: a };
}
const N1 = {
  SpellCheck: qp,
  RefreshCw: Kp,
  Minimize2: ic,
  Maximize2: ac,
  FileText: Ma,
  MessageSquare: lc,
  Sparkles: Do
};
function R1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, a] = V(""), [i, l] = V(!1), u = K(null), c = K(null), d = e.filter((g) => g.scope === t || g.scope === "both");
  J(() => {
    const g = (v) => {
      u.current && !u.current.contains(v.target) && r();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 50);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", g);
    };
  }, [r]), J(() => {
    const g = (b) => {
      b.key === "Escape" && r();
    };
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [r]), J(() => {
    i && c.current && c.current.focus();
  }, [i]);
  const h = Y(() => {
    const b = d.length * 40 + (i ? 56 : 0) + 16, v = window.innerWidth, k = window.innerHeight;
    let M = o.top, w = o.left;
    return w + 260 > v - 8 && (w = v - 260 - 8), w < 8 && (w = 8), M + b > k - 8 && (M = o.top - b - 8), M < 8 && (M = 8), { top: M, left: w };
  }, [o, d.length, i])(), m = () => {
    s.trim() && (n("custom", s.trim()), a(""), l(!1));
  }, y = /* @__PURE__ */ f(
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
            /* @__PURE__ */ f("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ A("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ f(lc, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ f(
                "input",
                {
                  ref: c,
                  type: "text",
                  placeholder: "Modify with prompt…",
                  value: s,
                  onChange: (g) => a(g.target.value),
                  onKeyDown: (g) => {
                    g.key === "Enter" && (g.preventDefault(), m()), g.stopPropagation();
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
            d.filter((g) => !g.showCustomPrompt).map((g) => {
              const b = g.icon ? N1[g.icon] : Do;
              return /* @__PURE__ */ A(
                "button",
                {
                  className: `
                  flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left
                  hover:bg-secondary/80 transition-colors duration-75
                  text-foreground
                `,
                  onMouseDown: (v) => {
                    v.preventDefault(), n(g.id);
                  },
                  children: [
                    b && /* @__PURE__ */ f(b, { size: 15, className: "text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ f("span", { children: g.label })
                  ]
                },
                g.id
              );
            })
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ f(Lt, { onMouseDown: (g) => g.preventDefault(), children: y });
}
function A1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const a = K(null), i = K(null), [l, u] = V(!1), [c, d] = V(0);
  J(() => {
    if (a.current) {
      const w = new ResizeObserver((S) => {
        for (const D of S)
          d(D.contentRect.height);
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
  const p = an(() => {
    const x = window.innerWidth, T = window.innerHeight;
    let E = t.selectionCenterX - 380 / 2;
    E + 380 > x - 8 && (E = x - 380 - 8), E < 8 && (E = 8);
    const N = T - t.selectionBottom - 8, R = t.selectionTop - 8, I = c || 200;
    let O, H = !1;
    return N >= I || N >= R ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - I, H = !0), O < 8 && (O = 8), O + I > T - 8 && (O = T - I - 8), { top: O, left: E, placedAbove: H };
  }, [t, c]), h = e.status === "streaming" || e.status === "complete" ? e.result : "", m = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", y = e.status === "streaming", g = e.status === "complete", b = e.status === "error", v = Y(() => {
    navigator.clipboard.writeText(h), u(!0), setTimeout(() => u(!1), 1500);
  }, [h]);
  if (e.status === "idle") return null;
  const k = p.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", M = /* @__PURE__ */ f(
    "div",
    {
      ref: a,
      className: "ai-result-popover",
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
          rounded-lg shadow-xl overflow-hidden
          w-[380px] max-w-[calc(100vw-16px)]
          ${k}
        `,
          children: [
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ A("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                y && /* @__PURE__ */ f(sc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ f("span", { className: "font-medium", children: b ? "Error" : m }),
                y && /* @__PURE__ */ f("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ f(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (w) => {
                    w.preventDefault(), s();
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
                children: b ? /* @__PURE__ */ f("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ A("div", { className: "whitespace-pre-wrap", children: [
                  h,
                  y && /* @__PURE__ */ f("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ A("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (g || b) && /* @__PURE__ */ A(Ie, { children: [
                g && /* @__PURE__ */ A(Ie, { children: [
                  /* @__PURE__ */ f(
                    En,
                    {
                      icon: Bs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ f(
                    En,
                    {
                      icon: Ea,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ f(
                    En,
                    {
                      icon: l ? Fn : Un,
                      label: l ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ f(
                  En,
                  {
                    icon: Da,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ f("div", { className: "flex-1" }),
                /* @__PURE__ */ f(
                  En,
                  {
                    icon: Nt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              y && /* @__PURE__ */ A(Ie, { children: [
                /* @__PURE__ */ f("div", { className: "flex-1" }),
                /* @__PURE__ */ f(
                  En,
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
  return /* @__PURE__ */ f(Lt, { onMouseDown: (w) => w.preventDefault(), children: M });
}
function En({
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
const Fd = "paragon-editor-toc-width", P1 = 280, Ud = 200, Yd = 500;
function Ol() {
  try {
    const e = localStorage.getItem(Fd);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= Ud && t <= Yd)
        return t;
    }
  } catch {
  }
  return P1;
}
function L1(e) {
  try {
    localStorage.setItem(Fd, String(e));
  } catch {
  }
}
function I1(e, t, n) {
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
function O1(e) {
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
function _l(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const $l = Wn(function({
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
  renderItem: y,
  showToggleButton: g = !0,
  scrollContainerRef: b
}) {
  const [v, k] = V([]), [M, w] = V(null), [S, D] = V(n), [x, T] = V(/* @__PURE__ */ new Set()), [E, N] = V(() => {
    if (d) {
      const B = parseInt(d, 10);
      return isNaN(B) ? Ol() : B;
    }
    return Ol();
  }), R = K(null), I = K(null), O = K(!1), H = K(0), W = K(0);
  J(() => {
    D(n);
  }, [n]);
  const q = Y((B) => {
    B.preventDefault(), B.stopPropagation(), O.current = !0, H.current = B.clientX, W.current = E, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [E]);
  J(() => {
    const B = (ee) => {
      if (!O.current) return;
      const he = p === "right" ? H.current - ee.clientX : ee.clientX - H.current, ge = Math.min(Yd, Math.max(Ud, W.current + he));
      N(ge);
    }, F = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((ee) => (L1(ee), ee)));
    };
    return document.addEventListener("mousemove", B), document.addEventListener("mouseup", F), () => {
      document.removeEventListener("mousemove", B), document.removeEventListener("mouseup", F);
    };
  }, [p]);
  const L = Y(() => {
    if (!t || t.isDestroyed) return;
    const B = I1(t, s, a);
    k(B), M && !B.find((F) => F.id === M) && w(null);
  }, [t, s, a, M]);
  J(() => {
    if (!t) return;
    const B = () => {
      I.current && clearTimeout(I.current), I.current = setTimeout(() => L(), 300);
    };
    return L(), t.on("update", B), t.on("create", B), () => {
      t.off("update", B), t.off("create", B), I.current && clearTimeout(I.current);
    };
  }, [t, L]), J(() => {
    if (!t || !l || !S || v.length === 0) return;
    const B = b?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!B) return;
    const F = () => {
      const ge = B.getBoundingClientRect();
      let Ee = null;
      for (let Oe = v.length - 1; Oe >= 0; Oe--) {
        const et = v[Oe], It = _l(t, et.pos);
        if (It && It.getBoundingClientRect().top - ge.top <= h + 10) {
          Ee = et.id;
          break;
        }
      }
      !Ee && v.length > 0 && (Ee = v[0].id), w(Ee);
    };
    let ee;
    const he = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(F);
    };
    return B.addEventListener("scroll", he, { passive: !0 }), F(), () => {
      B.removeEventListener("scroll", he), cancelAnimationFrame(ee);
    };
  }, [t, v, l, S, h, b]);
  const P = Y((B) => {
    if (!t || t.isDestroyed) return;
    const F = _l(t, B.pos);
    if (F) {
      const ee = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const he = ee.getBoundingClientRect(), Ee = F.getBoundingClientRect().top - he.top + ee.scrollTop;
        ee.scrollTo({ top: Ee - h, behavior: "smooth" });
      } else
        F.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(B.pos + 1);
    } catch {
    }
    w(B.id), m?.(B);
  }, [t, h, m, b]), j = Y(() => {
    const B = !S;
    D(B), r?.(B);
  }, [S, r]), Z = Y((B) => {
    T((F) => {
      const ee = new Set(F);
      return ee.has(B) ? ee.delete(B) : ee.add(B), ee;
    });
  }, []), G = Y((B, F, ee = 0) => {
    if (y)
      return y(B, F, () => P(B));
    const he = (B.level - s) * 14, ge = u && B.children && B.children.length > 0, Ee = x.has(B.id);
    return /* @__PURE__ */ f(
      "div",
      {
        className: `toc-item ${F ? "toc-item-active" : ""} toc-level-${B.level}`,
        style: { paddingLeft: `${he + 10}px` },
        children: /* @__PURE__ */ A(
          "button",
          {
            className: "toc-item-button",
            onClick: () => P(B),
            title: B.text,
            children: [
              ge && /* @__PURE__ */ f(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Oe) => {
                    Oe.stopPropagation(), Z(B.id);
                  },
                  children: /* @__PURE__ */ f("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: Ee ? /* @__PURE__ */ f("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ f("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              i && /* @__PURE__ */ A("span", { className: "toc-level-indicator", children: [
                "H",
                B.level
              ] }),
              /* @__PURE__ */ f("span", { className: "toc-item-text", children: B.text })
            ]
          }
        )
      },
      B.id
    );
  }, [y, P, u, s, i, x, Z]), Q = Y((B, F = 0) => B.map((ee) => {
    const he = M === ee.id, ge = x.has(ee.id), Ee = ee.children && ee.children.length > 0;
    return /* @__PURE__ */ A("div", { children: [
      G(ee, he, F),
      Ee && !ge && /* @__PURE__ */ f("div", { className: "toc-children", children: Q(ee.children, F + 1) })
    ] }, ee.id);
  }), [M, x, G]), re = Y(() => v.map((B) => {
    const F = M === B.id;
    return G(B, F);
  }), [v, M, G]);
  if (!t) return null;
  const $ = u ? O1(v) : [];
  return /* @__PURE__ */ A(Ie, { children: [
    g && /* @__PURE__ */ f(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${p}`,
        onClick: j,
        title: S ? "Hide Table of Contents" : "Show Table of Contents",
        children: S ? /* @__PURE__ */ f(Gp, { size: 16 }) : /* @__PURE__ */ f(Zp, { size: 16 })
      }
    ),
    /* @__PURE__ */ A(
      "div",
      {
        ref: R,
        className: `toc-sidebar ${S ? "toc-visible" : "toc-hidden"} toc-${p} ${c}`,
        style: { width: S ? `${E}px` : "0px" },
        children: [
          S && /* @__PURE__ */ f(
            "div",
            {
              className: `toc-resize-handle toc-resize-${p}`,
              onMouseDown: q
            }
          ),
          /* @__PURE__ */ A("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ f("div", { className: "toc-header", children: /* @__PURE__ */ f("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ f("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ A("div", { className: "toc-empty", children: [
              /* @__PURE__ */ f("p", { children: "No headings yet" }),
              /* @__PURE__ */ f("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ f("div", { className: "toc-list", children: u ? Q($) : re() }) })
          ] })
        ]
      }
    )
  ] });
});
function _1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n)
      n.hasOwnProperty(r) && (e[r] = n[r]);
  }
  return e;
}
function ia(e, t) {
  return Array(t + 1).join(e);
}
function jd(e) {
  return e.replace(/^\n*/, "");
}
function Vd(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function Kd(e) {
  return Vd(jd(e));
}
var $1 = [
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
function oi(e) {
  return si(e, $1);
}
var qd = [
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
function Gd(e) {
  return si(e, qd);
}
function H1(e) {
  return Xd(e, qd);
}
var Zd = [
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
function z1(e) {
  return si(e, Zd);
}
function B1(e) {
  return Xd(e, Zd);
}
function si(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function Xd(e, t) {
  return e.getElementsByTagName && t.some(function(n) {
    return e.getElementsByTagName(n).length;
  });
}
var Fe = {};
Fe.paragraph = {
  filter: "p",
  replacement: function(e) {
    return `

` + e + `

`;
  }
};
Fe.lineBreak = {
  filter: "br",
  replacement: function(e, t, n) {
    return n.br + `
`;
  }
};
Fe.heading = {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: function(e, t, n) {
    var r = Number(t.nodeName.charAt(1));
    if (n.headingStyle === "setext" && r < 3) {
      var o = ia(r === 1 ? "=" : "-", e.length);
      return `

` + e + `
` + o + `

`;
    } else
      return `

` + ia("#", r) + " " + e + `

`;
  }
};
Fe.blockquote = {
  filter: "blockquote",
  replacement: function(e) {
    return e = Kd(e).replace(/^/gm, "> "), `

` + e + `

`;
  }
};
Fe.list = {
  filter: ["ul", "ol"],
  replacement: function(e, t) {
    var n = t.parentNode;
    return n.nodeName === "LI" && n.lastElementChild === t ? `
` + e : `

` + e + `

`;
  }
};
Fe.listItem = {
  filter: "li",
  replacement: function(e, t, n) {
    var r = n.bulletListMarker + "   ", o = t.parentNode;
    if (o.nodeName === "OL") {
      var s = o.getAttribute("start"), a = Array.prototype.indexOf.call(o.children, t);
      r = (s ? Number(s) + a : a + 1) + ".  ";
    }
    var i = /\n$/.test(e);
    return e = Kd(e) + (i ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(r.length)), r + e + (t.nextSibling ? `
` : "");
  }
};
Fe.indentedCodeBlock = {
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
Fe.fencedCodeBlock = {
  filter: function(e, t) {
    return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
  },
  replacement: function(e, t, n) {
    for (var r = t.firstChild.getAttribute("class") || "", o = (r.match(/language-(\S+)/) || [null, ""])[1], s = t.firstChild.textContent, a = n.fence.charAt(0), i = 3, l = new RegExp("^" + a + "{3,}", "gm"), u; u = l.exec(s); )
      u[0].length >= i && (i = u[0].length + 1);
    var c = ia(a, i);
    return `

` + c + o + `
` + s.replace(/\n$/, "") + `
` + c + `

`;
  }
};
Fe.horizontalRule = {
  filter: "hr",
  replacement: function(e, t, n) {
    return `

` + n.hr + `

`;
  }
};
Fe.inlineLink = {
  filter: function(e, t) {
    return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t) {
    var n = t.getAttribute("href");
    n && (n = n.replace(/([()])/g, "\\$1"));
    var r = wo(t.getAttribute("title"));
    return r && (r = ' "' + r.replace(/"/g, '\\"') + '"'), "[" + e + "](" + n + r + ")";
  }
};
Fe.referenceLink = {
  filter: function(e, t) {
    return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t, n) {
    var r = t.getAttribute("href"), o = wo(t.getAttribute("title"));
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
Fe.emphasis = {
  filter: ["em", "i"],
  replacement: function(e, t, n) {
    return e.trim() ? n.emDelimiter + e + n.emDelimiter : "";
  }
};
Fe.strong = {
  filter: ["strong", "b"],
  replacement: function(e, t, n) {
    return e.trim() ? n.strongDelimiter + e + n.strongDelimiter : "";
  }
};
Fe.code = {
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
Fe.image = {
  filter: "img",
  replacement: function(e, t) {
    var n = wo(t.getAttribute("alt")), r = t.getAttribute("src") || "", o = wo(t.getAttribute("title")), s = o ? ' "' + o + '"' : "";
    return r ? "![" + n + "](" + r + s + ")" : "";
  }
};
function wo(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function Qd(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = {
    replacement: e.blankReplacement
  }, this.keepReplacement = e.keepReplacement, this.defaultRule = {
    replacement: e.defaultReplacement
  }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
Qd.prototype = {
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
    return (t = _s(this.array, e, this.options)) || (t = _s(this._keep, e, this.options)) || (t = _s(this._remove, e, this.options)) ? t : this.defaultRule;
  },
  forEach: function(e) {
    for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
  }
};
function _s(e, t, n) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r];
    if (W1(o, t, n)) return o;
  }
}
function W1(e, t, n) {
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
function F1(e) {
  var t = e.element, n = e.isBlock, r = e.isVoid, o = e.isPre || function(d) {
    return d.nodeName === "PRE";
  };
  if (!(!t.firstChild || o(t))) {
    for (var s = null, a = !1, i = null, l = Hl(i, t, o); l !== t; ) {
      if (l.nodeType === 3 || l.nodeType === 4) {
        var u = l.data.replace(/[ \r\n\t]+/g, " ");
        if ((!s || / $/.test(s.data)) && !a && u[0] === " " && (u = u.substr(1)), !u) {
          l = $s(l);
          continue;
        }
        l.data = u, s = l;
      } else if (l.nodeType === 1)
        n(l) || l.nodeName === "BR" ? (s && (s.data = s.data.replace(/ $/, "")), s = null, a = !1) : r(l) || o(l) ? (s = null, a = !0) : s && (a = !1);
      else {
        l = $s(l);
        continue;
      }
      var c = Hl(i, l, o);
      i = l, l = c;
    }
    s && (s.data = s.data.replace(/ $/, ""), s.data || $s(s));
  }
}
function $s(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function Hl(e, t, n) {
  return e && e.parentNode === t || n(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var ai = typeof window < "u" ? window : {};
function U1() {
  var e = ai.DOMParser, t = !1;
  try {
    new e().parseFromString("", "text/html") && (t = !0);
  } catch {
  }
  return t;
}
function Y1() {
  var e = function() {
  };
  return j1() ? e.prototype.parseFromString = function(t) {
    var n = new window.ActiveXObject("htmlfile");
    return n.designMode = "on", n.open(), n.write(t), n.close(), n;
  } : e.prototype.parseFromString = function(t) {
    var n = document.implementation.createHTMLDocument("");
    return n.open(), n.write(t), n.close(), n;
  }, e;
}
function j1() {
  var e = !1;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    ai.ActiveXObject && (e = !0);
  }
  return e;
}
var V1 = U1() ? ai.DOMParser : Y1();
function K1(e, t) {
  var n;
  if (typeof e == "string") {
    var r = q1().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + e + "</x-turndown>",
      "text/html"
    );
    n = r.getElementById("turndown-root");
  } else
    n = e.cloneNode(!0);
  return F1({
    element: n,
    isBlock: oi,
    isVoid: Gd,
    isPre: t.preformattedCode ? G1 : null
  }), n;
}
var Hs;
function q1() {
  return Hs = Hs || new V1(), Hs;
}
function G1(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function Z1(e, t) {
  return e.isBlock = oi(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = X1(e), e.flankingWhitespace = Q1(e, t), e;
}
function X1(e) {
  return !Gd(e) && !z1(e) && /^\s*$/i.test(e.textContent) && !H1(e) && !B1(e);
}
function Q1(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode)
    return { leading: "", trailing: "" };
  var n = J1(e.textContent);
  return n.leadingAscii && zl("left", e, t) && (n.leading = n.leadingNonAscii), n.trailingAscii && zl("right", e, t) && (n.trailing = n.trailingNonAscii), { leading: n.leading, trailing: n.trailing };
}
function J1(e) {
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
function zl(e, t, n) {
  var r, o, s;
  return e === "left" ? (r = t.previousSibling, o = / $/) : (r = t.nextSibling, o = /^ /), r && (r.nodeType === 3 ? s = o.test(r.nodeValue) : n.preformattedCode && r.nodeName === "CODE" ? s = !1 : r.nodeType === 1 && !oi(r) && (s = o.test(r.textContent))), s;
}
var eC = Array.prototype.reduce, tC = [
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
function ko(e) {
  if (!(this instanceof ko)) return new ko(e);
  var t = {
    rules: Fe,
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
  this.options = _1({}, t, e), this.rules = new Qd(this.options);
}
ko.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */
  turndown: function(e) {
    if (!oC(e))
      throw new TypeError(
        e + " is not a string, or an element/document/fragment node."
      );
    if (e === "") return "";
    var t = Jd.call(this, new K1(e, this.options));
    return nC.call(this, t);
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
    return tC.reduce(function(t, n) {
      return t.replace(n[0], n[1]);
    }, e);
  }
};
function Jd(e) {
  var t = this;
  return eC.call(e.childNodes, function(n, r) {
    r = new Z1(r, t.options);
    var o = "";
    return r.nodeType === 3 ? o = r.isCode ? r.nodeValue : t.escape(r.nodeValue) : r.nodeType === 1 && (o = rC.call(t, r)), ef(n, o);
  }, "");
}
function nC(e) {
  var t = this;
  return this.rules.forEach(function(n) {
    typeof n.append == "function" && (e = ef(e, n.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function rC(e) {
  var t = this.rules.forNode(e), n = Jd.call(this, e), r = e.flankingWhitespace;
  return (r.leading || r.trailing) && (n = n.trim()), r.leading + t.replacement(n, e, this.options) + r.trailing;
}
function ef(e, t) {
  var n = Vd(e), r = jd(t), o = Math.max(e.length - n.length, t.length - r.length), s = `

`.substring(0, o);
  return n + s + r;
}
function oC(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
var Bl = /highlight-(?:text|source)-([a-z0-9]+)/;
function sC(e) {
  e.addRule("highlightedCodeBlock", {
    filter: function(t) {
      var n = t.firstChild;
      return t.nodeName === "DIV" && Bl.test(t.className) && n && n.nodeName === "PRE";
    },
    replacement: function(t, n, r) {
      var o = n.className || "", s = (o.match(Bl) || [null, ""])[1];
      return `

` + r.fence + s + `
` + n.firstChild.textContent + `
` + r.fence + `

`;
    }
  });
}
function aC(e) {
  e.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: function(t) {
      return "~" + t + "~";
    }
  });
}
var iC = Array.prototype.indexOf, lC = Array.prototype.every, zn = {};
zn.tableCell = {
  filter: ["th", "td"],
  replacement: function(e, t) {
    return tf(e, t);
  }
};
zn.tableRow = {
  filter: "tr",
  replacement: function(e, t) {
    var n = "", r = { left: ":--", right: "--:", center: ":-:" };
    if (ii(t))
      for (var o = 0; o < t.childNodes.length; o++) {
        var s = "---", a = (t.childNodes[o].getAttribute("align") || "").toLowerCase();
        a && (s = r[a] || s), n += tf(s, t.childNodes[o]);
      }
    return `
` + e + (n ? `
` + n : "");
  }
};
zn.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function(e) {
    return e.nodeName === "TABLE" && ii(e.rows[0]);
  },
  replacement: function(e) {
    return e = e.replace(`

`, `
`), `

` + e + `

`;
  }
};
zn.tableSection = {
  filter: ["thead", "tbody", "tfoot"],
  replacement: function(e) {
    return e;
  }
};
function ii(e) {
  var t = e.parentNode;
  return t.nodeName === "THEAD" || t.firstChild === e && (t.nodeName === "TABLE" || cC(t)) && lC.call(e.childNodes, function(n) {
    return n.nodeName === "TH";
  });
}
function cC(e) {
  var t = e.previousSibling;
  return e.nodeName === "TBODY" && (!t || t.nodeName === "THEAD" && /^\s*$/i.test(t.textContent));
}
function tf(e, t) {
  var n = iC.call(t.parentNode.childNodes, t), r = " ";
  return n === 0 && (r = "| "), r + e + " |";
}
function uC(e) {
  e.keep(function(n) {
    return n.nodeName === "TABLE" && !ii(n.rows[0]);
  });
  for (var t in zn) e.addRule(t, zn[t]);
}
function dC(e) {
  e.addRule("taskListItems", {
    filter: function(t) {
      return t.type === "checkbox" && t.parentNode.nodeName === "LI";
    },
    replacement: function(t, n) {
      return (n.checked ? "[x]" : "[ ]") + " ";
    }
  });
}
function fC(e) {
  e.use([
    sC,
    aC,
    uC,
    dC
  ]);
}
function pC() {
  return an(() => {
    const e = new ko({
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
    return e.use(fC), e.addRule("highlight", {
      filter: (t) => t.nodeName === "MARK",
      replacement: (t) => `==${t}==`
    }), e.addRule("resizableImage", {
      filter: "img",
      replacement: (t, n) => {
        const r = n, o = r.getAttribute("src") || "", a = (r.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), i = r.getAttribute("width"), l = i ? parseInt(i, 10) : null, u = r.getAttribute("data-align") || "left", c = [a], d = u !== "left", p = l && l > 0;
        return (d || p) && c.push(d ? u : "left"), p && c.push(String(l)), `![${c.join(" | ")}](${o})`;
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
        return r ? `@${_b(r)}@` : t;
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
function li() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var pn = li();
function nf(e) {
  pn = e;
}
var pr = { exec: () => null };
function ye(e, t = "") {
  let n = typeof e == "string" ? e : e.source, r = { replace: (o, s) => {
    let a = typeof s == "string" ? s : s.source;
    return a = a.replace(Ye.caret, "$1"), n = n.replace(o, a), r;
  }, getRegex: () => new RegExp(n, t) };
  return r;
}
var hC = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), Ye = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`), htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i") }, mC = /^(?:[ \t]*(?:\n|$))+/, gC = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, yC = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ar = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, bC = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ci = /(?:[*+-]|\d{1,9}[.)])/, rf = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, of = ye(rf).replace(/bull/g, ci).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), vC = ye(rf).replace(/bull/g, ci).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ui = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, wC = /^[^\n]+/, di = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, kC = ye(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", di).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), xC = ye(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ci).getRegex(), jo = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", fi = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, CC = ye("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", fi).replace("tag", jo).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), sf = ye(ui).replace("hr", Ar).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", jo).getRegex(), SC = ye(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", sf).getRegex(), pi = { blockquote: SC, code: gC, def: kC, fences: yC, heading: bC, hr: Ar, html: CC, lheading: of, list: xC, newline: mC, paragraph: sf, table: pr, text: wC }, Wl = ye("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ar).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", jo).getRegex(), TC = { ...pi, lheading: vC, table: Wl, paragraph: ye(ui).replace("hr", Ar).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Wl).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", jo).getRegex() }, MC = { ...pi, html: ye(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", fi).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: pr, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: ye(ui).replace("hr", Ar).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", of).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, EC = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, DC = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, af = /^( {2,}|\\)\n(?!\s*$)/, NC = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Vo = /[\p{P}\p{S}]/u, hi = /[\s\p{P}\p{S}]/u, lf = /[^\s\p{P}\p{S}]/u, RC = ye(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, hi).getRegex(), cf = /(?!~)[\p{P}\p{S}]/u, AC = /(?!~)[\s\p{P}\p{S}]/u, PC = /(?:[^\s\p{P}\p{S}]|~)/u, LC = ye(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", hC ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), uf = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, IC = ye(uf, "u").replace(/punct/g, Vo).getRegex(), OC = ye(uf, "u").replace(/punct/g, cf).getRegex(), df = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", _C = ye(df, "gu").replace(/notPunctSpace/g, lf).replace(/punctSpace/g, hi).replace(/punct/g, Vo).getRegex(), $C = ye(df, "gu").replace(/notPunctSpace/g, PC).replace(/punctSpace/g, AC).replace(/punct/g, cf).getRegex(), HC = ye("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, lf).replace(/punctSpace/g, hi).replace(/punct/g, Vo).getRegex(), zC = ye(/\\(punct)/, "gu").replace(/punct/g, Vo).getRegex(), BC = ye(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), WC = ye(fi).replace("(?:-->|$)", "-->").getRegex(), FC = ye("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", WC).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), xo = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, UC = ye(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", xo).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ff = ye(/^!?\[(label)\]\[(ref)\]/).replace("label", xo).replace("ref", di).getRegex(), pf = ye(/^!?\[(ref)\](?:\[\])?/).replace("ref", di).getRegex(), YC = ye("reflink|nolink(?!\\()", "g").replace("reflink", ff).replace("nolink", pf).getRegex(), Fl = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, mi = { _backpedal: pr, anyPunctuation: zC, autolink: BC, blockSkip: LC, br: af, code: DC, del: pr, emStrongLDelim: IC, emStrongRDelimAst: _C, emStrongRDelimUnd: HC, escape: EC, link: UC, nolink: pf, punctuation: RC, reflink: ff, reflinkSearch: YC, tag: FC, text: NC, url: pr }, jC = { ...mi, link: ye(/^!?\[(label)\]\((.*?)\)/).replace("label", xo).getRegex(), reflink: ye(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", xo).getRegex() }, la = { ...mi, emStrongRDelimAst: $C, emStrongLDelim: OC, url: ye(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Fl).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: ye(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Fl).getRegex() }, VC = { ...la, br: ye(af).replace("{2,}", "*").getRegex(), text: ye(la.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, oo = { normal: pi, gfm: TC, pedantic: MC }, rr = { normal: mi, gfm: la, breaks: VC, pedantic: jC }, KC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Ul = (e) => KC[e];
function Mt(e, t) {
  if (t) {
    if (Ye.escapeTest.test(e)) return e.replace(Ye.escapeReplace, Ul);
  } else if (Ye.escapeTestNoEncode.test(e)) return e.replace(Ye.escapeReplaceNoEncode, Ul);
  return e;
}
function Yl(e) {
  try {
    e = encodeURI(e).replace(Ye.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function jl(e, t) {
  let n = e.replace(Ye.findPipe, (s, a, i) => {
    let l = !1, u = a;
    for (; --u >= 0 && i[u] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), r = n.split(Ye.splitPipe), o = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !r.at(-1)?.trim() && r.pop(), t) if (r.length > t) r.splice(t);
  else for (; r.length < t; ) r.push("");
  for (; o < r.length; o++) r[o] = r[o].trim().replace(Ye.slashPipe, "|");
  return r;
}
function or(e, t, n) {
  let r = e.length;
  if (r === 0) return "";
  let o = 0;
  for (; o < r && e.charAt(r - o - 1) === t; )
    o++;
  return e.slice(0, r - o);
}
function qC(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
  else if (e[r] === t[0]) n++;
  else if (e[r] === t[1] && (n--, n < 0)) return r;
  return n > 0 ? -2 : -1;
}
function Vl(e, t, n, r, o) {
  let s = t.href, a = t.title || null, i = e[1].replace(o.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let l = { type: e[0].charAt(0) === "!" ? "image" : "link", raw: n, href: s, title: a, text: i, tokens: r.inlineTokens(i) };
  return r.state.inLink = !1, l;
}
function GC(e, t, n) {
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
var Co = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || pn;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : or(n, `
`) };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], r = GC(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: r };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let r = or(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: or(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = or(t[0], `
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
`), y = this.blockquote(m);
          s[s.length - 1] = y, r = r.substring(0, r.length - h.raw.length) + y.raw, o = o.substring(0, o.length - h.text.length) + y.text;
          break;
        } else if (p?.type === "list") {
          let h = p, m = h.raw + `
` + n.join(`
`), y = this.list(m);
          s[s.length - 1] = y, r = r.substring(0, r.length - p.raw.length) + y.raw, o = o.substring(0, o.length - h.raw.length) + y.raw, n = m.substring(s.at(-1).raw.length).split(`
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
`, 1)[0].replace(this.rules.other.listReplaceTabs, (y) => " ".repeat(3 * y.length)), p = e.split(`
`, 1)[0], h = !d.trim(), m = 0;
        if (this.options.pedantic ? (m = 2, c = d.trimStart()) : h ? m = t[1].length + 1 : (m = t[2].search(this.rules.other.nonSpaceChar), m = m > 4 ? 1 : m, c = d.slice(m), m += t[1].length), h && this.rules.other.blankLine.test(p) && (u += p + `
`, e = e.substring(p.length + 1), l = !0), !l) {
          let y = this.rules.other.nextBulletRegex(m), g = this.rules.other.hrRegex(m), b = this.rules.other.fencesBeginRegex(m), v = this.rules.other.headingBeginRegex(m), k = this.rules.other.htmlBeginRegex(m);
          for (; e; ) {
            let M = e.split(`
`, 1)[0], w;
            if (p = M, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), w = p) : w = p.replace(this.rules.other.tabCharGlobal, "    "), b.test(p) || v.test(p) || k.test(p) || y.test(p) || g.test(p)) break;
            if (w.search(this.rules.other.nonSpaceChar) >= m || !p.trim()) c += `
` + w.slice(m);
            else {
              if (h || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || b.test(d) || v.test(d) || g.test(d)) break;
              c += `
` + p;
            }
            !h && !p.trim() && (h = !0), u += M + `
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
    let n = jl(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), o = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let a of r) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
      for (let a = 0; a < n.length; a++) s.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: !0, align: s.align[a] });
      for (let a of o) s.rows.push(jl(a, s.header.length).map((i, l) => ({ text: i, tokens: this.lexer.inline(i), header: !1, align: s.align[l] })));
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
        let s = or(n.slice(0, -1), "\\");
        if ((n.length - s.length) % 2 === 0) return;
      } else {
        let s = qC(t[2], "()");
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
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), Vl(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
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
      return Vl(n, o, n[0], this.lexer, this.rules);
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
}, ot = class ca {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || pn, this.options.tokenizer = this.options.tokenizer || new Co(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: Ye, block: oo.normal, inline: rr.normal };
    this.options.pedantic ? (n.block = oo.pedantic, n.inline = rr.pedantic) : this.options.gfm && (n.block = oo.gfm, this.options.breaks ? n.inline = rr.breaks : n.inline = rr.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: oo, inline: rr };
  }
  static lex(t, n) {
    return new ca(n).lex(t);
  }
  static lexInline(t, n) {
    return new ca(n).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(Ye.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], r = !1) {
    for (this.options.pedantic && (t = t.replace(Ye.tabCharGlobal, "    ").replace(Ye.spaceLine, "")); t; ) {
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
}, So = class {
  options;
  parser;
  constructor(e) {
    this.options = e || pn;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let r = (t || "").match(Ye.notSpaceStart)?.[0], o = e.replace(Ye.endingNewline, "") + `
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
    let r = this.parser.parseInline(n), o = Yl(e);
    if (o === null) return r;
    e = o;
    let s = '<a href="' + e + '"';
    return t && (s += ' title="' + Mt(t) + '"'), s += ">" + r + "</a>", s;
  }
  image({ href: e, title: t, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let o = Yl(e);
    if (o === null) return Mt(n);
    e = o;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${Mt(t)}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Mt(e.text);
  }
}, gi = class {
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
}, st = class ua {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || pn, this.options.renderer = this.options.renderer || new So(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new gi();
  }
  static parse(t, n) {
    return new ua(n).parse(t);
  }
  static parseInline(t, n) {
    return new ua(n).parseInline(t);
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
}, cr = class {
  options;
  block;
  constructor(e) {
    this.options = e || pn;
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
    return this.block ? ot.lex : ot.lexInline;
  }
  provideParser() {
    return this.block ? st.parse : st.parseInline;
  }
}, ZC = class {
  defaults = li();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = st;
  Renderer = So;
  TextRenderer = gi;
  Lexer = ot;
  Tokenizer = Co;
  Hooks = cr;
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
        let o = this.defaults.renderer || new So(this.defaults);
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
        let o = this.defaults.tokenizer || new Co(this.defaults);
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
        let o = this.defaults.hooks || new cr();
        for (let s in n.hooks) {
          if (!(s in o)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let a = s, i = n.hooks[a], l = o[a];
          cr.passThroughHooks.has(s) ? o[a] = (u) => {
            if (this.defaults.async && cr.passThroughHooksRespectAsync.has(s)) return (async () => {
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
    return ot.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return st.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (t, n) => {
      let r = { ...n }, o = { ...this.defaults, ...r }, s = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && r.async === !1) return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof t > "u" || t === null) return s(new Error("marked(): input parameter is undefined or null"));
      if (typeof t != "string") return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
      if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
        let a = o.hooks ? await o.hooks.preprocess(t) : t, i = await (o.hooks ? await o.hooks.provideLexer() : e ? ot.lex : ot.lexInline)(a, o), l = o.hooks ? await o.hooks.processAllTokens(i) : i;
        o.walkTokens && await Promise.all(this.walkTokens(l, o.walkTokens));
        let u = await (o.hooks ? await o.hooks.provideParser() : e ? st.parse : st.parseInline)(l, o);
        return o.hooks ? await o.hooks.postprocess(u) : u;
      })().catch(s);
      try {
        o.hooks && (t = o.hooks.preprocess(t));
        let a = (o.hooks ? o.hooks.provideLexer() : e ? ot.lex : ot.lexInline)(t, o);
        o.hooks && (a = o.hooks.processAllTokens(a)), o.walkTokens && this.walkTokens(a, o.walkTokens);
        let i = (o.hooks ? o.hooks.provideParser() : e ? st.parse : st.parseInline)(a, o);
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
}, cn = new ZC();
function ve(e, t) {
  return cn.parse(e, t);
}
ve.options = ve.setOptions = function(e) {
  return cn.setOptions(e), ve.defaults = cn.defaults, nf(ve.defaults), ve;
};
ve.getDefaults = li;
ve.defaults = pn;
ve.use = function(...e) {
  return cn.use(...e), ve.defaults = cn.defaults, nf(ve.defaults), ve;
};
ve.walkTokens = function(e, t) {
  return cn.walkTokens(e, t);
};
ve.parseInline = cn.parseInline;
ve.Parser = st;
ve.parser = st.parse;
ve.Renderer = So;
ve.TextRenderer = gi;
ve.Lexer = ot;
ve.lexer = ot.lex;
ve.Tokenizer = Co;
ve.Hooks = cr;
ve.parse = ve;
ve.options;
ve.setOptions;
ve.use;
ve.walkTokens;
ve.parseInline;
st.parse;
ot.lex;
function XC(e) {
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
        const m = Array.from(d.childNodes), y = [], g = [];
        if (m.forEach((b) => {
          if (b.nodeType === Node.ELEMENT_NODE) {
            const v = b;
            v.tagName === "UL" || v.tagName === "OL" || v.tagName === "P" ? g.push(b) : y.push(b);
          } else
            y.push(b);
        }), d.innerHTML = "", y.length > 0) {
          const b = n.createElement("p");
          y.forEach((v) => b.appendChild(v)), b.firstChild && b.firstChild.nodeType === Node.TEXT_NODE && (b.firstChild.textContent = (b.firstChild.textContent || "").replace(/^\s+/, "")), d.appendChild(b);
        }
        g.forEach((b) => d.appendChild(b));
      }
    }), u && !c && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
const QC = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, JS = dp(function({
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
  showRecoveryBanner: y = !0,
  showFloatingToolbar: g = !0,
  maxImageSize: b = 5 * 1024 * 1024,
  onImageUploadStart: v,
  onImageUploadComplete: k,
  onImageUploadError: M,
  onImageUpload: w,
  resolveImageSrc: S,
  showModeToggle: D = !0,
  // New props
  initialMode: x = "wysiwyg",
  onModeChange: T,
  onReady: E,
  onFocus: N,
  onBlur: R,
  onSelectionChange: I,
  onDestroy: O,
  onSave: H,
  onRecover: W,
  onWikiLinkClick: q,
  validateWikiLink: L,
  onWikiLinkSearch: P,
  onLinkClick: j,
  findReplaceOpen: Z,
  onFindReplaceChange: G,
  renderToolbar: Q,
  renderFooter: re,
  disabledFeatures: $ = {},
  minHeight: B = "200px",
  maxHeight: F,
  spellCheck: ee = !0,
  headingLevels: he = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ge = [1, 2, 3],
  // TOC props
  showTableOfContents: Ee = !1,
  tocVisible: Oe = !0,
  onTocVisibilityChange: et,
  tocTitle: It = "",
  tocMinLevel: Zn = 1,
  tocMaxLevel: Xn = 4,
  tocShowLevelIndicators: Pr = !1,
  tocHighlightActive: Lr = !0,
  tocTreeView: Ir = !1,
  tocWidth: Or = "240px",
  tocPosition: hn = "right",
  tocScrollOffset: Qn = 20,
  onTocItemClick: mn,
  renderTocItem: gn,
  tocShowToggleButton: _r = !0,
  // Raw markdown editor
  autoClosePairs: Ko = !0,
  // Performance profiler
  showPerformanceProfiler: qo = !1,
  onPerformanceProfilerClose: Go,
  // Auto reorder checklist
  autoReorderChecklist: Zo = !1,
  // Expand selection
  progressiveSelectAll: $r = !1,
  // Error boundary
  onEditorError: Xo,
  // AI writing assistant
  aiActions: wt,
  onAIAction: yn,
  onAISetupRequired: bn
}, Qo) {
  const [tt] = V(() => QC()), [Ot, de] = V(x), [Se, ie] = V(""), fe = K(x), De = K(""), me = K(null), [Jo, Hr] = V(0), vn = !!(wt && wt.length > 0 && yn), { state: _e, executeAction: _t, abort: gf, reset: $t } = D1(yn), [es, ts] = V(null), [yf, bf] = V({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), vf = K(yn);
  vf.current = yn;
  const yi = K(bn);
  yi.current = bn;
  const [wf, kf] = V([]), [xf, Cf] = V(0), Sf = Y((z, U) => {
    kf(z), Cf(U);
  }, []), ns = K(v), rs = K(k), os = K(M), ss = K(w), as = K(S), bi = K(q), is = K(L), ls = K(P);
  ns.current = v, rs.current = k, os.current = M, ss.current = w, as.current = S, bi.current = q, is.current = L, ls.current = P;
  const Tf = an(() => {
    const z = [
      Bf.configure({
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
      Sh,
      Th,
      Dh,
      Wf.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      Ff.configure({
        types: ["heading", "paragraph"]
      }),
      Uf.configure({
        multicolor: !0
      }),
      Yf.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      rp,
      op,
      sp,
      ap,
      J0,
      n1,
      d1,
      s1
    ];
    return $.tables || z.push(
      jf.configure({
        resizable: !tt,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Vf,
      mh,
      gh,
      Ch
    ), $.taskLists || z.push(
      Mh.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Eh.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), tt || z.push(
      Rh.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), $.codeBlocks || z.push(Ph), $.callouts || z.push(Hh, t1), $.collapsibleHeadings || z.push(
      Z0.configure({
        levels: ge
      })
    ), $.images || z.push(
      zh.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (U) => {
          Br({
            isOpen: !0,
            src: U.src,
            alt: U.alt,
            pos: U.pos,
            position: { x: U.rect.left + U.rect.width / 2, y: U.rect.bottom }
          });
        },
        resolveImageSrc: as.current ? ((...U) => as.current(...U)) : void 0
      }),
      v1.configure({
        maxFileSize: b,
        onUploadStart: ns.current ? ((...U) => ns.current(...U)) : void 0,
        onUploadComplete: rs.current ? ((...U) => rs.current(...U)) : void 0,
        onUploadError: os.current ? ((...U) => os.current(...U)) : void 0,
        onImageUpload: ss.current ? ((U, oe) => ss.current(U, oe)) : void 0
      })
    ), $.datePills || z.push(
      Hb.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), $.tagPills || z.push(
      Wb.configure({
        HTMLAttributes: {
          class: "tag-pill"
        }
      })
    ), $.wikiLinks || z.push(
      j0.configure({
        onWikiLinkClick: (U) => {
          console.log("WikiLink clicked:", U), bi.current?.(U);
        },
        validateLink: (U) => is.current ? is.current(U) : !0
      })
    ), $r && z.push(c1), $.markdownPaste || z.push(
      G0.configure({
        enableMarkdownPaste: !0
      })
    ), z;
  }, [s, tt, b, he, ge, $, $r]), kt = K(null), Xt = K(n), Qt = K(r), cs = K(o), Jn = K(null);
  Xt.current = n, Qt.current = r, cs.current = o;
  const _ = Hf({
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
    extensions: Tf,
    content: t,
    editable: a,
    autofocus: i,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: ee ? "true" : "false"
      },
      handleClick: (z, U, oe) => {
        if (j) {
          const ae = oe.target.closest("a");
          if (ae) {
            const le = ae.getAttribute("href");
            if (le && j(le, oe) === !1)
              return oe.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: z }) => {
      kt.current && clearTimeout(kt.current), kt.current = setTimeout(() => {
        if (z.isDestroyed) return;
        const U = z.getHTML();
        (Xt.current || Qt.current) && (Xt.current?.(U), Qt.current?.(U));
      }, 150);
    },
    onFocus: () => {
      N?.();
    },
    onBlur: () => {
      if (kt.current && (clearTimeout(kt.current), kt.current = null, _ && !_.isDestroyed)) {
        const z = _.getHTML();
        if ((Xt.current || Qt.current) && (Xt.current?.(z), Qt.current?.(z)), fe.current === "wysiwyg" && Jn.current) {
          const U = Jn.current.turndown(z);
          De.current = U, cs.current?.(U);
        }
      }
      R?.();
    },
    onSelectionUpdate: ({ editor: z }) => {
      if (I) {
        const { from: U, to: oe, empty: we } = z.state.selection;
        I({ from: U, to: oe, empty: we });
      }
    }
  });
  J(() => () => {
    if (kt.current && (clearTimeout(kt.current), kt.current = null, _ && !_.isDestroyed)) {
      const z = _.getHTML();
      if ((Xt.current || Qt.current) && (Xt.current?.(z), Qt.current?.(z)), fe.current === "wysiwyg" && Jn.current) {
        const U = Jn.current.turndown(z);
        De.current = U, cs.current?.(U);
      }
    }
  }, []);
  const [vi, zr] = V(!1), [wn, Br] = V(null), [Mf, Ef] = V(!1), Df = Z !== void 0 ? Z : Mf, Ht = Y((z) => {
    Ef(z), G?.(z);
  }, [G]), [Nf, us] = V(0), [Rf, Af] = V(""), xt = z0(_, {
    storageKey: h,
    debounceMs: m,
    enabled: p,
    onSave: (z) => {
      H?.(z);
    },
    onRecover: (z) => {
      W?.(z);
    }
  }), zt = pC();
  Jn.current = zt;
  const wi = K(!1);
  J(() => {
    if (!wi.current && x === "markdown" && _ && !_.isDestroyed && zt) {
      const z = _.getHTML(), U = zt.turndown(z);
      ie(U), De.current = U, wi.current = !0;
    }
  }, [_, zt, x]);
  const dt = Y((z) => {
    if (_) {
      if (z === "markdown" && fe.current === "wysiwyg") {
        const U = _.getHTML(), oe = zt.turndown(U);
        ie(oe), De.current = oe;
      } else if (z === "wysiwyg" && fe.current === "markdown") {
        const U = ["info", "note", "prompt", "resources", "todo"];
        let oe = De.current;
        U.forEach((le) => {
          const Te = new RegExp(`\`\`\`ad-${le}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          oe = oe.replace(Te, ($e, ke) => {
            const Ue = ve.parse(ke.trim(), { async: !1 });
            return `<div data-callout="" data-type="${le}" class="callout callout-${le}">${Ue}</div>`;
          });
        }), U.forEach((le) => {
          const Te = new RegExp(`\`\`\`${le}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          oe = oe.replace(Te, ($e, ke) => {
            const Ue = ve.parse(ke.trim(), { async: !1 });
            return `<div data-callout="" data-type="${le}" class="callout callout-${le}">${Ue}</div>`;
          });
        }), oe = oe.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (le, Te, $e) => {
          const ke = Te.split("|").map((Wr) => Wr.trim());
          let Ue = "", Bt = "left", Wt = null;
          ke.length === 1 ? Ue = ke[0] : ke.length === 2 ? (Ue = ke[0], /^\d+$/.test(ke[1]) ? Wt = ke[1] : ["left", "center", "right"].includes(ke[1]) ? Bt = ke[1] : Ue = Te) : ke.length === 3 ? (Ue = ke[0], ["left", "center", "right"].includes(ke[1]) && (Bt = ke[1]), /^\d+$/.test(ke[2]) && (Wt = ke[2])) : Ue = Te;
          const ds = Wt ? ` width="${Wt}" style="width: ${Wt}px"` : "", Ti = ` data-align="${Bt}"`;
          return `<img src="${$e.trim()}" alt="${Ue}"${Ti}${ds} />`;
        }), oe = oe.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), oe = oe.replace(/@([^@\n]+)@/g, (le, Te) => {
          const $e = nn(Te);
          if ($e) {
            const ke = $a($e);
            return `<span data-type="date-pill" data-date="${$e}" class="date-pill ${ke}"><span class="date-icon">📅</span><span class="date-text">${Te.trim()}</span></span>`;
          }
          return le;
        }), oe = oe.replace(new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"), (le, Te) => {
          const $e = ao(Te);
          return ir($e) ? `<span data-type="tag-pill" data-tag="${$e}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${$e}</span></span>` : le;
        }), oe = oe.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((le, Te) => Te % 2 === 1 ? le : le.replace(/\[\[([^\[\]]+)\]\]/g, ($e, ke) => `<span data-wiki-link data-page-name="${ke.trim()}" class="wiki-link">${ke.trim()}</span>`)).join("");
        let ae = ve.parse(oe, { async: !1 });
        ae = XC(ae), queueMicrotask(() => {
          _.isDestroyed || _.commands.setContent(ae);
        });
      }
      de(z), fe.current = z, T?.(z);
    }
  }, [_, zt, T]), ki = Y((z) => {
    ie(z), De.current = z, o?.(z);
  }, [o]), Jt = W0(_, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: c
  });
  fp(Qo, () => ({
    getEditor: () => _,
    getHTML: () => _?.getHTML() || "",
    getMarkdown: () => _ ? zt.turndown(_.getHTML()) : "",
    getText: () => _?.getText() || "",
    setContent: (z) => {
      _ && !_.isDestroyed && queueMicrotask(() => {
        _.commands.setContent(z);
      });
    },
    clearContent: () => {
      _ && !_.isDestroyed && _.commands.clearContent();
    },
    focus: (z) => {
      _ && !_.isDestroyed && _.commands.focus(z);
    },
    blur: () => {
      _ && !_.isDestroyed && _.commands.blur();
    },
    isEmpty: () => _?.isEmpty || !0,
    isFocused: () => _?.isFocused || !1,
    getMode: () => fe.current,
    setMode: (z) => dt(z),
    toggleMode: () => {
      const z = fe.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return dt(z), z;
    },
    getWordCount: () => ({
      words: Jt.words,
      characters: Jt.characters,
      charactersWithSpaces: Jt.charactersWithSpaces
    }),
    undo: () => _?.commands.undo(),
    redo: () => _?.commands.redo(),
    canUndo: () => _?.can().undo() || !1,
    canRedo: () => _?.can().redo() || !1,
    insertContent: (z) => _?.commands.insertContent(z),
    insertImage: (z, U = "") => _?.commands.setImage({ src: z, alt: U }),
    insertTable: (z = 3, U = 3) => _?.commands.insertTable({ rows: z, cols: U, withHeaderRow: !0 }),
    insertCodeBlock: (z) => {
      z ? _?.commands.setCodeBlock({ language: z }) : _?.commands.setCodeBlock();
    },
    insertCallout: (z = "info") => _?.commands.insertCallout?.({ type: z }),
    insertHorizontalRule: () => _?.commands.setHorizontalRule(),
    toggleBold: () => _?.commands.toggleBold(),
    toggleItalic: () => _?.commands.toggleItalic(),
    toggleUnderline: () => _?.commands.toggleUnderline(),
    toggleStrike: () => _?.commands.toggleStrike(),
    toggleCode: () => _?.commands.toggleCode(),
    toggleHighlight: () => _?.commands.toggleHighlight(),
    setHeading: (z) => {
      z === 0 ? _?.commands.setParagraph() : _?.commands.setHeading({ level: z });
    },
    toggleBulletList: () => _?.commands.toggleBulletList(),
    toggleOrderedList: () => _?.commands.toggleOrderedList(),
    toggleTaskList: () => _?.commands.toggleTaskList(),
    toggleBlockquote: () => _?.commands.toggleBlockquote(),
    setLink: (z) => _?.commands.setLink({ href: z }),
    unsetLink: () => _?.commands.unsetLink(),
    openFindReplace: () => {
      Ht(!0), us((z) => z + 1);
    },
    closeFindReplace: () => Ht(!1),
    save: () => xt.save(),
    clearSavedContent: () => xt.clear(),
    getSelectedText: () => {
      if (!_) return "";
      const { from: z, to: U } = _.state.selection;
      return _.state.doc.textBetween(z, U, " ");
    },
    isEditable: () => _?.isEditable || !1,
    setEditable: (z) => _?.setEditable(z),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!_) return [];
      const z = [];
      return _.state.doc.descendants((U, oe) => {
        if (U.type.name === "heading") {
          const we = U.attrs.level, ae = U.textContent.trim();
          ae && z.push({ id: `toc-heading-${oe}`, text: ae, level: we, pos: oe });
        }
      }), z;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (z) => {
      if (!(!_ || _.isDestroyed))
        try {
          const U = _.state.doc.resolve(z), oe = _.view.nodeDOM(U.before(U.depth + 1));
          if (oe instanceof HTMLElement) {
            const we = _.view.dom.closest(".editor-content-wrapper");
            if (we) {
              const ae = we.getBoundingClientRect(), Te = oe.getBoundingClientRect().top - ae.top + we.scrollTop;
              we.scrollTo({ top: Te - 20, behavior: "smooth" });
            } else
              oe.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          _.commands.setTextSelection(z + 1);
        } catch {
        }
    }
  }), [_, zt, dt, Jt, xt, Ht]), J(() => {
    const z = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => fe.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (U) => {
        if (U !== "wysiwyg" && U !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        dt(U);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const U = fe.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return dt(U), U;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        dt("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        dt("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => fe.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => fe.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => fe.current === "markdown" ? De.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (U) => {
        const oe = (we) => {
          U(we.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", oe), () => window.removeEventListener("paragon-editor-mode-change", oe);
      }
    };
    return window.__paragonEditorModeAPI = z, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [dt]), J(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: Ot } }));
  }, [Ot]), J(() => {
    if (!_ || _.isDestroyed) return;
    const z = (U) => {
      if (!_.isDestroyed) {
        if ((U.metaKey || U.ctrlKey) && U.key === "k") {
          U.preventDefault(), zr(!0);
          return;
        }
        if (!tt && (U.metaKey || U.ctrlKey) && U.key === "f") {
          if (U.preventDefault(), _) {
            const { state: oe } = _, { from: we, to: ae } = oe.selection;
            if (we !== ae) {
              const le = oe.doc.textBetween(we, ae, " ");
              le.trim() && Af(le.trim());
            }
          }
          Ht(!0), us((oe) => oe + 1);
          return;
        }
        if (!tt && (U.metaKey || U.ctrlKey) && U.key === "h") {
          U.preventDefault(), Ht(!0);
          return;
        }
        if (U.key === " ")
          try {
            const { state: oe } = _, { selection: we } = oe, { $from: ae } = we, le = ae.nodeBefore?.textContent || "";
            if (le === "#####") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 5, to: ae.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (le === "####") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 4, to: ae.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (le === "###") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 3, to: ae.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (le === "##") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 2, to: ae.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (le === "#") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 1, to: ae.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (le === "-" || le === "*") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 1, to: ae.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(le)) {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - le.length, to: ae.pos }).toggleOrderedList().run();
              return;
            }
            const Te = /^(-\s*)?\[([ x])?\]$/.exec(le);
            if (Te) {
              U.preventDefault();
              const $e = Te[2] === "x", ke = oe.schema.nodes.taskList, Ue = oe.schema.nodes.taskItem;
              if (ke && Ue) {
                const Bt = oe.tr, Wt = ae.pos - le.length, ds = ae.pos;
                Bt.delete(Wt, ds);
                const Wr = Bt.doc.resolve(Wt).blockRange();
                if (Wr) {
                  const $f = [
                    { type: ke, attrs: {} },
                    { type: Ue, attrs: { checked: $e } }
                  ];
                  Bt.wrap(Wr, $f), _.view.dispatch(Bt);
                  return;
                }
              }
              _.chain().focus().deleteRange({ from: ae.pos - le.length, to: ae.pos }).toggleTaskList().run();
              return;
            }
            if (le === ">") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 1, to: ae.pos }).toggleBlockquote().run();
              return;
            }
            if (le === "```") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 3, to: ae.pos }).toggleCodeBlock().run();
              return;
            }
            if (le === "---" || le === "***") {
              U.preventDefault(), _.chain().focus().deleteRange({ from: ae.pos - 3, to: ae.pos }).setHorizontalRule().run();
              return;
            }
          } catch (oe) {
            console.warn("Space shortcut error:", oe);
          }
      }
    };
    return document.addEventListener("keydown", z, !0), () => document.removeEventListener("keydown", z, !0);
  }, [_, tt, Ht]);
  const xi = Y((z, U) => {
    if (!vn) {
      yi.current?.();
      return;
    }
    if (!_) return;
    let oe = { top: 0, left: 0 };
    if (U) {
      const we = U.getBoundingClientRect();
      oe = { top: we.bottom + 4, left: we.left };
    } else {
      const { from: we, to: ae } = _.state.selection, le = _.view.coordsAtPos(we), Te = _.view.coordsAtPos(ae);
      oe = { top: Te.bottom + 8, left: (le.left + Te.left) / 2 };
    }
    ts({ scope: z, position: oe });
  }, [vn, _]), Pf = Y((z, U) => {
    if (!_ || !wt) return;
    const oe = wt.find((Ue) => Ue.id === z);
    if (!oe) return;
    const { from: we, to: ae } = _.state.selection, le = we !== ae ? _.state.doc.textBetween(we, ae, `
`) : "", Te = oe.scope === "document" || !le ? _.getText() : le, $e = _.view.coordsAtPos(we), ke = _.view.coordsAtPos(ae);
    bf({
      selectionTop: $e.top,
      selectionBottom: ke.bottom,
      selectionCenterX: ($e.left + ke.right) / 2
    }), ts(null), _t(z, oe.label, Te, { from: we, to: ae }, U);
  }, [_, wt, _t]), Lf = Y(() => {
    if (!_ || _e.status !== "complete") return;
    const { selectionRange: z, result: U } = _e;
    _.chain().focus().setTextSelection(z).deleteSelection().insertContent(U).run(), $t();
  }, [_, _e, $t]), If = Y(() => {
    if (!_ || _e.status !== "complete") return;
    const { selectionRange: z, result: U } = _e;
    _.chain().focus().setTextSelection(z.to).insertContent(`
` + U).run(), $t();
  }, [_, _e, $t]), Of = Y(() => {
    if (!(_e.status !== "complete" && _e.status !== "error"))
      if (_e.status === "complete") {
        const { action: z, actionLabel: U, inputText: oe, selectionRange: we } = _e;
        $t(), _t(z, U, oe, we);
      } else
        $t();
  }, [_e, $t, _t]);
  if (!_)
    return /* @__PURE__ */ f("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: /* @__PURE__ */ A("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ f("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const Ci = /* @__PURE__ */ f(
    L0,
    {
      editor: _,
      onOpenLinkPopover: () => zr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Ht(!0), us((z) => z + 1);
      },
      disabledFeatures: $,
      autoReorderChecklist: Zo,
      aiEnabled: vn || !!bn,
      onAISparklesClick: (z) => xi("document", z)
    }
  ), Si = /* @__PURE__ */ A("div", { className: "editor-footer", children: [
    p && /* @__PURE__ */ f(
      F0,
      {
        status: xt.status,
        lastSaved: xt.lastSaved
      }
    ),
    /* @__PURE__ */ f("div", { className: "word-count", children: /* @__PURE__ */ A("span", { children: [
      Jt.words,
      " words"
    ] }) })
  ] }), _f = {
    minHeight: B,
    ...F && { maxHeight: F, overflowY: "auto" }
  };
  return /* @__PURE__ */ A("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: [
    p && y && xt.hasRecoverableContent && /* @__PURE__ */ f(
      U0,
      {
        onRecover: () => {
          xt.recover();
        },
        onDismiss: xt.dismissRecovery
      }
    ),
    u && /* @__PURE__ */ A("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Q ? Q(_, Ci) : Ci,
      D && /* @__PURE__ */ A("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => dt("wysiwyg"),
            className: `editor-mode-toggle-btn ${Ot === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ f(Xp, {})
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => dt("markdown"),
            className: `editor-mode-toggle-btn ${Ot === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ f(Ma, {})
          }
        )
      ] })
    ] }),
    !tt && /* @__PURE__ */ f(
      I0,
      {
        editor: _,
        isOpen: Df,
        onClose: () => Ht(!1),
        focusTrigger: Nf,
        initialSearchQuery: Rf,
        editorMode: Ot,
        rawMarkdown: Se,
        onRawMarkdownChange: ki,
        onMatchesChange: Sf
      }
    ),
    /* @__PURE__ */ f($0, { editor: _ }),
    /* @__PURE__ */ A("div", { className: `editor-main-area ${Ee ? "editor-with-toc" : ""}`, children: [
      Ee && hn === "left" && /* @__PURE__ */ f(
        $l,
        {
          editor: _,
          visible: Oe,
          onVisibilityChange: et,
          title: It,
          minLevel: Zn,
          maxLevel: Xn,
          showLevelIndicators: Pr,
          highlightActive: Lr,
          treeView: Ir,
          width: Or,
          position: hn,
          scrollOffset: Qn,
          onItemClick: mn,
          renderItem: gn,
          showToggleButton: _r,
          scrollContainerRef: me
        }
      ),
      /* @__PURE__ */ A(
        T1,
        {
          resetKey: `${t}-${Jo}`,
          onRetry: () => Hr((z) => z + 1),
          onClearContent: () => {
            _ && _.commands.clearContent(), n?.(""), r?.(""), o?.(""), Hr((z) => z + 1);
          },
          onError: Xo,
          children: [
            /* @__PURE__ */ f("div", { className: "editor-content-wrapper", ref: me, style: _f, children: Ot === "wysiwyg" ? /* @__PURE__ */ A(Ie, { children: [
              /* @__PURE__ */ f(zf, { editor: _, className: "editor-content" }),
              !$.images && !$.dragAndDrop && /* @__PURE__ */ f(w1, { containerRef: me, enabled: a }),
              !tt && g && /* @__PURE__ */ f(_h, { editor: _, suppressWhenLinkPopoverOpen: vi, aiEnabled: vn || !!bn, onAISparklesClick: (z) => xi("selection", z) }),
              es && wt && /* @__PURE__ */ f(
                R1,
                {
                  actions: wt,
                  scope: es.scope,
                  position: es.position,
                  onAction: Pf,
                  onClose: () => ts(null)
                }
              ),
              _e.status !== "idle" && /* @__PURE__ */ f(
                A1,
                {
                  state: _e,
                  position: yf,
                  onReplace: Lf,
                  onInsert: If,
                  onRetry: Of,
                  onDiscard: () => {
                    gf(), $t();
                  }
                }
              ),
              !$.slashCommands && /* @__PURE__ */ f(Kb, { editor: _, disabledFeatures: $ }),
              !$.wikiLinks && ls.current && /* @__PURE__ */ f(
                Qb,
                {
                  editor: _,
                  onSearch: ls.current
                }
              ),
              /* @__PURE__ */ f(
                Lh,
                {
                  editor: _,
                  isOpen: vi,
                  onClose: () => zr(!1)
                }
              ),
              !tt && /* @__PURE__ */ f(
                Ih,
                {
                  editor: _,
                  onEditLink: () => zr(!0)
                }
              ),
              !$.images && wn?.isOpen && /* @__PURE__ */ f(
                k1,
                {
                  src: wn.src,
                  alt: wn.alt,
                  position: wn.position,
                  onSave: (z, U) => {
                    _.chain().focus().setNodeSelection(wn.pos).updateAttributes("resizableImage", {
                      src: z,
                      alt: U
                    }).run(), Br(null);
                  },
                  onDelete: () => {
                    _.chain().focus().setNodeSelection(wn.pos).deleteSelection().run(), Br(null);
                  },
                  onClose: () => Br(null)
                }
              )
            ] }) : /* @__PURE__ */ f(
              x1,
              {
                content: Se,
                onChange: ki,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: wf,
                currentMatchIndex: xf,
                autoClosePairs: Ko
              }
            ) }),
            /* @__PURE__ */ f(M1, { scrollContainerRef: me })
          ]
        }
      ),
      Ee && hn === "right" && /* @__PURE__ */ f(
        $l,
        {
          editor: _,
          visible: Oe,
          onVisibilityChange: et,
          title: It,
          minLevel: Zn,
          maxLevel: Xn,
          showLevelIndicators: Pr,
          highlightActive: Lr,
          treeView: Ir,
          width: Or,
          position: hn,
          scrollOffset: Qn,
          onItemClick: mn,
          renderItem: gn,
          showToggleButton: _r,
          scrollContainerRef: me
        }
      )
    ] }),
    c && (re ? re(
      { words: Jt.words, characters: Jt.characters },
      xt.status,
      Si
    ) : Si),
    /* @__PURE__ */ f(S1, { visible: qo, onClose: Go, editor: _ })
  ] });
}), eT = Mo.create({
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
      Bn(this.options.HTMLAttributes, t, {
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
}), hf = {
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
}, JC = {
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
}, eS = {
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
}, tS = {
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
}, ur = {
  dark: hf,
  light: JC,
  sepia: eS,
  nord: tS
};
function nS(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function tT(e, t, n, r) {
  const o = ur[e] || hf;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const mf = Gl(null);
function nT({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = V(t), s = ur[r] || ur.dark, a = Y((l) => {
    ur[l] && o(l);
  }, []);
  J(() => {
    n?.current && nS(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: r,
    setTheme: a,
    availableThemes: Object.keys(ur)
  };
  return /* @__PURE__ */ f(mf.Provider, { value: i, children: e });
}
function rT() {
  const e = Zl(mf);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const Kl = [
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
function oT({ node: e, updateAttributes: t }) {
  const [n, r] = V(!1), o = e.attrs.language || "plaintext";
  Kl.find((a) => a.value === o)?.label;
  const s = Y(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ A(xr, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ A("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ A("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ f(
          "select",
          {
            value: o,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: Kl.map(({ value: a, label: i }) => /* @__PURE__ */ f("option", { value: a, children: i }, a))
          }
        ),
        /* @__PURE__ */ f(Kt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ f(Fn, { size: 14 }) : /* @__PURE__ */ f(Un, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ f("pre", { className: "code-block-pre", children: /* @__PURE__ */ f("code", { children: /* @__PURE__ */ f(da, {}) }) })
  ] });
}
export {
  F0 as AutoSaveIndicator,
  eT as Callout,
  t1 as CalloutInputRule,
  oT as CodeBlockComponent,
  Z0 as CollapsibleHeading,
  Rh as CollapsibleList,
  Hb as DatePill,
  nT as EditorThemeProvider,
  L0 as EditorToolbar,
  I0 as FindReplace,
  _h as FloatingToolbar,
  w1 as ImageDropZone,
  v1 as ImageUpload,
  JS as MarkdownEditor,
  J0 as MarkdownLinkInputRule,
  G0 as MarkdownPasteSafe,
  Sh as MixedBulletList,
  Dh as MixedListItem,
  Th as MixedOrderedList,
  Eh as MixedTaskItem,
  Mh as MixedTaskList,
  U0 as RecoveryBanner,
  zh as ResizableImage,
  n1 as SearchHighlight,
  $0 as SelectAllActionBar,
  d1 as SelectAllOccurrences,
  Kb as SlashCommands,
  s1 as TabIndent,
  $l as TableOfContents,
  Wb as TagPill,
  j0 as WikiLinkSafe,
  nS as applyTheme,
  tT as createCustomTheme,
  hf as darkTheme,
  $a as getDateVariant,
  ir as isValidTag,
  JC as lightTheme,
  be as lowlight,
  tS as nordTheme,
  ao as normalizeTag,
  nn as parseDateFromMarkdown,
  eS as sepiaTheme,
  ur as themes,
  z0 as useAutoSave,
  rT as useEditorTheme,
  W0 as useWordCount
};
//# sourceMappingURL=paragon.js.map
