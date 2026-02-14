import { jsxDEV as u, Fragment as Pe } from "react/jsx-dev-runtime";
import { ReactNodeViewRenderer as ko, NodeViewWrapper as xr, NodeViewContent as si, useEditorState as $l, useEditor as Tm, EditorContent as Em } from "@tiptap/react";
import Sm from "@tiptap/starter-kit";
import Mm from "@tiptap/extension-placeholder";
import Dm from "@tiptap/extension-text-align";
import Rm from "@tiptap/extension-highlight";
import Am from "@tiptap/extension-link";
import { Table as Pm } from "@tiptap/extension-table";
import Im from "@tiptap/extension-table-row";
import Lm from "@tiptap/extension-table-cell";
import Om from "@tiptap/extension-table-header";
import { PluginKey as Xe, Plugin as Qe, TextSelection as ii } from "@tiptap/pm/state";
import { DecorationSet as qe, Decoration as at } from "@tiptap/pm/view";
import { Extension as bt, Node as Co, mergeAttributes as _n, InputRule as je, Mark as _m } from "@tiptap/core";
import Bm from "@tiptap/extension-bullet-list";
import $m from "@tiptap/extension-ordered-list";
import Wm from "@tiptap/extension-list-item";
import zm from "@tiptap/extension-task-list";
import Hm from "@tiptap/extension-task-item";
import Fm from "@tiptap/extension-underline";
import Um from "@tiptap/extension-subscript";
import Ym from "@tiptap/extension-superscript";
import jm from "@tiptap/extension-typography";
import Vm from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Km } from "lowlight";
import * as C from "react";
import q, { useState as j, useRef as V, useEffect as G, useCallback as z, memo as Bn, createContext as Wl, useContext as zl, useLayoutEffect as To, useMemo as tn, Component as qm, useReducer as Gm, forwardRef as Zm, useImperativeHandle as Xm } from "react";
import { ChevronDown as Ht, Check as $n, Copy as Wn, Link2 as ai, ExternalLink as Qm, Pencil as Jm, Unlink as ef, Bold as li, Italic as ci, Underline as ui, Strikethrough as di, Code as Hl, Highlighter as Fl, Link as mi, Quote as fi, List as pi, ListOrdered as hi, CheckSquare as gi, FileCode as tf, Sparkles as Eo, ListTodo as bi, BookOpen as vi, MessageSquareText as Ul, StickyNote as Yl, Info as lo, ChevronRight as jl, ChevronLeftIcon as nf, ChevronRightIcon as rf, ChevronDownIcon as of, Calendar as Vl, Hash as sf, Image as Ni, X as Dt, Type as So, Heading1 as af, Heading2 as lf, Heading3 as cf, Code2 as Kl, Table as Is, Minus as ql, FileText as yi, Plus as xi, Undo as uf, Redo as df, IndentIncrease as mf, IndentDecrease as ff, PenLine as pf, Library as hf, Columns as ba, Trash2 as Cn, Rows as va, ToggleLeft as Na, ArrowUpDown as gf, Search as bf, ChevronUp as vf, MousePointerClick as Nf, CaseSensitive as yf, WholeWord as xf, Regex as wf, Replace as Ls, ReplaceAll as kf, Cloud as Cf, Loader2 as Gl, CloudOff as Tf, AlertCircle as Ef, RotateCcw as wi, ImagePlus as Sf, Activity as Mf, Maximize2 as Zl, Minimize2 as Xl, AlertTriangle as Df, CheckCircle2 as Rf, MessageSquare as Ql, RefreshCw as Af, SpellCheck as Pf, PanelRightClose as If, PanelRightOpen as Lf, Eye as Of } from "lucide-react";
import ki from "highlight.js/lib/languages/javascript";
import Ci from "highlight.js/lib/languages/typescript";
import Jl from "highlight.js/lib/languages/python";
import Ti from "highlight.js/lib/languages/xml";
import _f from "highlight.js/lib/languages/css";
import Bf from "highlight.js/lib/languages/json";
import Mo from "highlight.js/lib/languages/bash";
import $f from "highlight.js/lib/languages/sql";
import Wf from "highlight.js/lib/languages/java";
import ec from "highlight.js/lib/languages/cpp";
import tc from "highlight.js/lib/languages/go";
import nc from "highlight.js/lib/languages/rust";
import rc from "highlight.js/lib/languages/markdown";
import oc from "highlight.js/lib/languages/yaml";
import sc from "highlight.js/lib/languages/diff";
import * as ic from "react-dom";
import zf, { createPortal as jt } from "react-dom";
import Hf from "@tiptap/extension-image";
import { createRoot as Ff } from "react-dom/client";
import { jsx as W, Fragment as Uf, jsxs as Yf } from "react/jsx-runtime";
import { Fragment as jf } from "@tiptap/pm/model";
import { liftListItem as ya, sinkListItem as xa } from "@tiptap/pm/schema-list";
import { undo as Vf, redo as Kf } from "@tiptap/pm/history";
const qf = new Xe("tableCellMenu");
let wa = !1, zr = null;
function Gf() {
  wa || (wa = !0, document.addEventListener("mouseover", (e) => {
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
function Zf(e) {
  return Gf(), new Qe({
    key: qf,
    state: {
      init() {
        return qe.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && zr ? zr.map(t.mapping, t.doc) : (zr = Xf(o.doc, e), zr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Xf(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = at.widget(o + 1, (i) => {
        const a = document.createElement("div");
        a.className = "table-cell-menu-wrapper ProseMirror-widget", a.setAttribute("contenteditable", "false"), a.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const l = document.createElement("button");
        l.className = "table-cell-menu-btn", l.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', l.title = "Table options", l.type = "button";
        const d = document.documentElement.classList.contains("dark"), c = d ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", m = d ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", f = d ? "#999" : "#666", p = d ? "#2a2a2a" : "#f5f5f5";
        return l.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + c + ";border:1px solid " + m + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + f + ";pointer-events:auto;padding:0;", l.addEventListener("mouseenter", () => {
          l.style.opacity = "1", l.style.background = p, l.style.transform = "scale(1.05)";
        }), l.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), l.style.background = c, l.style.transform = "scale(1)";
        }), l.addEventListener("click", (b) => {
          b.preventDefault(), b.stopPropagation();
          const h = l.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), Qf(b, t, o, h);
        }), a.appendChild(l), a;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), qe.create(e, n);
}
function Qf(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const i = 170, a = 280;
  let l = Math.max(0, Math.min(r.top, window.innerHeight)), d = Math.max(0, Math.min(r.bottom, window.innerHeight)), c = Math.max(0, Math.min(r.left, window.innerWidth)), m = d + 4, f = c - i + r.width + 8;
  f + i > window.innerWidth - 12 && (f = window.innerWidth - i - 12), f < 12 && (f = 12), m + a > window.innerHeight - 12 && (m = l - a - 4), m < 12 && (m = 12), m + a > window.innerHeight - 12 && (m = window.innerHeight - a - 12);
  const p = document.documentElement.classList.contains("dark"), b = p ? "#1f1f1f" : "#ffffff", h = p ? "#3a3a3a" : "#e5e5e5", g = p ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + m + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + b + ";border:1px solid " + h + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + g + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const y = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n + 1).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n + 1).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n + 1).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n + 1).addRowAfter().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => Jf(t) }
  ], v = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
  }, x = p ? "#2a2a2a" : "#f5f5f5", M = p ? "#ff6b6b" : "#dc2626", w = p ? "#999999" : "#666666", T = p ? "#333333" : "#e5e5e5";
  y.forEach((N) => {
    if (N.label === "divider") {
      const E = document.createElement("div");
      E.style.cssText = "height:1px;background:" + T + ";margin:4px 0;", s.appendChild(E);
    } else {
      const E = document.createElement("button");
      E.type = "button";
      const S = N.destructive ? M : g;
      E.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + S + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const P = v[N.icon || ""] || "", R = N.destructive ? M : w;
      E.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + R + ';">' + P + '</span><span style="flex:1;white-space:nowrap;">' + N.label + "</span>", E.addEventListener("mouseenter", () => {
        E.style.background = N.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : x;
      }), E.addEventListener("mouseleave", () => {
        E.style.background = "transparent";
      }), E.addEventListener("click", (I) => {
        I.preventDefault(), I.stopPropagation(), N.action && N.action(), s.remove();
      }), s.appendChild(E);
    }
  }), document.body.appendChild(s);
  const k = (N) => {
    const E = N.target;
    if (s.contains(E) || E.classList.contains("table-cell-menu-btn"))
      return;
    const S = E.closest('[role="dialog"]');
    S && S.contains(s) || (s.remove(), document.removeEventListener("mousedown", k), document.removeEventListener("keydown", D));
  }, D = (N) => {
    N.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", k), document.removeEventListener("keydown", D));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", k), document.addEventListener("keydown", D);
  }, 0);
}
function Jf(e) {
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
        const a = i.attrs, l = a.colspan > 1 ? ' colspan="' + a.colspan + '"' : "", d = a.rowspan > 1 ? ' rowspan="' + a.rowspan + '"' : "";
        return "<td" + l + d + ">" + i.textContent + "</td>";
      }
      if (i.type.name === "tableHeader") {
        const a = i.attrs, l = a.colspan > 1 ? ' colspan="' + a.colspan + '"' : "", d = a.rowspan > 1 ? ' rowspan="' + a.rowspan + '"' : "";
        return "<th" + l + d + ">" + i.textContent + "</th>";
      }
      return i.textContent || "";
    }, s = o(r);
    navigator.clipboard.writeText(s).then(() => {
      const i = document.createElement("div");
      i.className = "tcm-toast", i.textContent = "Table copied to clipboard", i.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;", document.body.appendChild(i), setTimeout(() => i.remove(), 2e3);
    });
  }
}
const ep = Lm.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Zf(this.editor)
    ];
  }
}), tp = Om.extend({}), ur = new Xe("tableSorting");
let Qt = null, or = null;
function np(e) {
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
function rp(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function op(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (b, h) => {
    if (b.type.name === "table" && h === t)
      return s = b, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Qt?.tablePos === t && Qt?.columnIndex === n && Qt?.direction === "asc" ? "desc" : "asc";
  Qt = { tablePos: t, columnIndex: n, direction: i }, or = null;
  const a = [];
  s.forEach((b) => {
    if (b.type.name === "tableRow") {
      let h = !1;
      b.forEach((g) => {
        g.type.name === "tableHeader" && (h = !0);
      }), a.push({ node: b, isHeader: h });
    }
  });
  const l = a.filter((b) => b.isHeader), d = a.filter((b) => !b.isHeader);
  if (d.length < 2) {
    ka(n, i), o.dispatch(r.tr.setMeta(ur, { updated: !0 }));
    return;
  }
  const c = d.map((b) => {
    let h = "", g = 0;
    return b.node.forEach((y) => {
      g === n && (h = y.textContent || ""), g++;
    }), { ...b, sortValue: np(h) };
  }), m = c.map((b, h) => h);
  c.sort((b, h) => rp(b.sortValue, h.sortValue, i));
  const f = c.map((b, h) => d.indexOf(b));
  if (m.some((b, h) => b !== f[h])) {
    const b = [];
    l.forEach((y) => b.push(y.node)), c.forEach((y) => b.push(y.node));
    const h = s.type.create(s.attrs, b), { tr: g } = r;
    g.replaceWith(t, t + s.nodeSize, h), g.setMeta(ur, { updated: !0 }), o.dispatch(g);
  } else
    o.dispatch(r.tr.setMeta(ur, { updated: !0 }));
  ka(n, i);
}
function ka(e, t) {
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
function sp(e, t, n, r) {
  const o = document.createElement("span");
  o.className = "table-sort-btn-inline", o.setAttribute("contenteditable", "false"), o.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const s = document.createElement("button");
  s.className = "table-sort-btn", s.setAttribute("contenteditable", "false"), s.type = "button";
  const i = document.documentElement.classList.contains("dark"), a = i ? "#60a5fa" : "#3b82f6", l = i ? "#666" : "#aaa", d = i ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return s.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? a : l) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", s.addEventListener("mouseenter", () => {
    s.style.background = d, s.style.opacity = "1", s.style.color = a;
  }), s.addEventListener("mouseleave", () => {
    s.style.background = "transparent", s.style.opacity = e ? "1" : "0.5", s.style.color = e ? a : l;
  }), s.addEventListener("click", (c) => {
    c.preventDefault(), c.stopPropagation(), op(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function ip(e) {
  return new Qe({
    key: ur,
    state: {
      init() {
        return qe.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(ur);
        return !t.docChanged && !s?.updated && or ? or.map(t.mapping, t.doc) : (or = ap(o.doc, e), or);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function ap(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "table") {
      const s = o;
      r.forEach((i, a) => {
        if (i.type.name === "tableRow") {
          let l = 0, d = 0;
          i.forEach((c, m) => {
            if (c.type.name === "tableHeader") {
              const f = o + 1 + a + 1 + d;
              let p = f + 1;
              c.forEach((x, M) => {
                x.type.name === "paragraph" && (p = f + 1 + M + x.nodeSize - 1);
              });
              const h = Qt?.tablePos === s && Qt?.columnIndex === l ? Qt.direction : null, g = l, y = s, v = at.widget(p, () => sp(h, y, g, t), { side: 1, key: "sort-" + s + "-" + g });
              n.push(v);
            }
            d += c.nodeSize, l++;
          });
        }
      });
    }
  }), qe.create(e, n);
}
const lp = bt.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [ip(this.editor)];
  }
}), cp = Bm.extend({
  content: "(listItem | taskItem)+"
}), up = $m.extend({
  content: "(listItem | taskItem)+"
}), dp = zm.extend({
  content: "(taskItem | listItem)+"
}), mp = Hm.extend({
  content: "paragraph block*"
}), fp = Wm.extend({
  content: "paragraph block*"
}), Ca = new Xe("collapsibleList");
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
function pp(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let Tn = null;
function as(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !_s(o))
      return !0;
    const i = Os(o, s), a = t.collapsedItems.has(i);
    r.push(
      at.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${a ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const l = o.firstChild;
    if (l && l.type.name === "paragraph") {
      const d = s + 1 + l.nodeSize - 1, c = at.widget(
        d,
        () => {
          const m = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${i}"]`
          );
          if (m) {
            m.classList.contains("collapsed") !== a && (m.classList.remove("collapsed", "expanded"), m.classList.add(a ? "collapsed" : "expanded"), m.title = a ? "Click to expand" : "Click to collapse");
            const h = m.parentElement;
            if (h) return h;
          }
          const f = document.createElement("span");
          f.className = "collapsible-list-chevron-wrapper", f.setAttribute("contenteditable", "false");
          const p = document.createElement("button");
          return p.className = `collapsible-list-chevron ${a ? "collapsed" : "expanded"}`, p.setAttribute("data-list-item-id", i), p.setAttribute("contenteditable", "false"), p.setAttribute("tabindex", "-1"), p.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', p.title = a ? "Click to expand" : "Click to collapse", p.addEventListener("click", (b) => {
            b.preventDefault(), b.stopPropagation();
            const h = p.classList.contains("collapsed");
            p.classList.remove("collapsed", "expanded"), p.classList.add(h ? "expanded" : "collapsed"), p.title = h ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), Tn && Tn.dispatch(
              Tn.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), f.appendChild(p), f;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(c);
    }
    if (a && pp(o, s)) {
      let c = s + 1;
      o.forEach((m) => {
        ["bulletList", "orderedList", "taskList"].includes(m.type.name) && r.push(
          at.node(c, c + m.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), c += m.nodeSize;
      });
    }
    return !0;
  }), qe.create(e, r);
}
const hp = bt.create({
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
      new Qe({
        key: Ca,
        view(n) {
          return Tn = n, {
            update(r) {
              Tn = r;
            },
            destroy() {
              Tn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: as(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: as(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Ca.getState(n);
            return r?.decorations ? r.decorations : as(n.doc, e, t);
          }
        }
      })
    ];
  }
}), be = Km();
be.register("javascript", ki);
be.register("js", ki);
be.register("jsx", ki);
be.register("typescript", Ci);
be.register("ts", Ci);
be.register("tsx", Ci);
be.register("python", Jl);
be.register("py", Jl);
be.register("xml", Ti);
be.register("html", Ti);
be.register("svg", Ti);
be.register("css", _f);
be.register("json", Bf);
be.register("bash", Mo);
be.register("sh", Mo);
be.register("shell", Mo);
be.register("zsh", Mo);
be.register("sql", $f);
be.register("java", Wf);
be.register("cpp", ec);
be.register("c", ec);
be.register("go", tc);
be.register("golang", tc);
be.register("rust", nc);
be.register("rs", nc);
be.register("markdown", rc);
be.register("md", rc);
be.register("yaml", oc);
be.register("yml", oc);
be.register("diff", sc);
be.register("patch", sc);
function gp({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = j(!1), [s, i] = j(!1), a = V(null);
  G(() => {
    const f = a.current;
    if (!f || s) return;
    const p = new IntersectionObserver(
      (b) => {
        for (const h of b)
          h.isIntersecting && (i(!0), p.unobserve(f));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return p.observe(f), () => {
      p.disconnect();
    };
  }, [s]);
  const l = z(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (f) {
      console.error("Failed to copy:", f);
    }
  }, [e.textContent]), d = n.options.lowlight?.listLanguages?.() || [], c = e.attrs.language || "plaintext", m = c === "plaintext" ? "Plain Text" : c.charAt(0).toUpperCase() + c.slice(1);
  return /* @__PURE__ */ u(xr, { className: "code-block-wrapper", ref: a, children: [
    /* @__PURE__ */ u("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ u("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ u(
          "select",
          {
            value: c,
            onChange: (f) => t({ language: f.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ u("option", { value: "plaintext", children: "Plain Text" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 152,
                columnNumber: 13
              }, this),
              d.map((f) => /* @__PURE__ */ u("option", { value: f, children: f.charAt(0).toUpperCase() + f.slice(1) }, f, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 154,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 147,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ u("span", { className: "code-block-language-label", children: m }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 159,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u(Ht, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 160,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u(
        "button",
        {
          type: "button",
          onClick: l,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ u($n, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 168,
            columnNumber: 21
          }, this) : /* @__PURE__ */ u(Wn, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 168,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 162,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 145,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u("pre", { className: `code-block-pre ${s ? "" : "code-block-deferred"}`, children: /* @__PURE__ */ u(si, { className: s ? `language-${c}` : "language-plaintext" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 175,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 174,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
    lineNumber: 143,
    columnNumber: 5
  }, this);
}
const bp = Vm.extend({
  addNodeView() {
    return ko(gp);
  }
}).configure({
  lowlight: be,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function vp({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = j(""), s = V(null), i = V(null), [a, l] = j({ top: 0, left: 0 });
  G(() => {
    if (t) {
      const b = e.getAttributes("link").href || "";
      o(b);
      try {
        const { view: h } = e, { from: g } = h.state.selection, y = h.coordsAtPos(g), v = y.bottom + 8, x = Math.max(16, Math.min(y.left, window.innerWidth - 420));
        l({ top: v, left: x });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), G(() => {
    if (!t) return;
    const b = (v) => {
      i.current && !i.current.contains(v.target) && n();
    }, h = () => {
      n();
    }, g = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 10), y = e.view.dom.closest(".editor-content-wrapper");
    return y?.addEventListener("scroll", h), () => {
      clearTimeout(g), document.removeEventListener("mousedown", b), y?.removeEventListener("scroll", h);
    };
  }, [t, n, e]);
  const d = z((b) => {
    if (b?.preventDefault(), r.trim()) {
      let h = r.trim();
      !/^https?:\/\//i.test(h) && !h.startsWith("mailto:") && (h = "https://" + h), e.chain().focus().extendMarkRange("link").setLink({ href: h }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), c = z((b) => {
    b.key === "Escape" ? (b.preventDefault(), n()) : b.key === "Enter" && (b.preventDefault(), d());
  }, [n, d]);
  if (!t) return null;
  const f = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", p = /* @__PURE__ */ u(
    "div",
    {
      ref: i,
      className: "link-popover",
      "data-theme": f,
      style: {
        position: "fixed",
        top: `${a.top}px`,
        left: `${a.left}px`,
        zIndex: 9999
      },
      children: /* @__PURE__ */ u("form", { onSubmit: d, className: "link-popover-form", children: [
        /* @__PURE__ */ u("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ u(ai, { className: "link-popover-icon", size: 16 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/LinkPopover.tsx",
            lineNumber: 141,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u(
            "input",
            {
              ref: s,
              type: "text",
              value: r,
              onChange: (b) => o(b.target.value),
              onKeyDown: c,
              placeholder: "Enter URL or paste link",
              className: "link-popover-input",
              autoComplete: "off",
              spellCheck: !1
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/LinkPopover.tsx",
              lineNumber: 142,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 140,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ u("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 154,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/LinkPopover.tsx",
        lineNumber: 139,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/editor/LinkPopover.tsx",
      lineNumber: 128,
      columnNumber: 5
    },
    this
  );
  return jt(p, document.body);
}
function Np({ editor: e, onEditLink: t }) {
  const [n, r] = j({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = V(null), s = V(null), i = z((x) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const M = x.getAttribute("href") || "", w = x.getBoundingClientRect(), T = w.bottom + 8, k = Math.max(16, Math.min(w.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: M,
          position: { top: T, left: k },
          linkElement: x
        });
      } catch (M) {
        console.warn("LinkHoverTooltip: Error showing tooltip", M);
      }
    }
  }, [e]), a = z(() => {
    s.current = setTimeout(() => {
      r((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = z(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  G(() => {
    if (!e || e.isDestroyed) return;
    const x = e.view.dom;
    if (!x) return;
    const M = (T) => {
      const D = T.target.closest("a");
      D && x.contains(D) && i(D);
    }, w = (T) => {
      const k = T.target, D = T.relatedTarget;
      if (k.closest("a")) {
        if (D && o.current?.contains(D))
          return;
        a();
      }
    };
    return x.addEventListener("mouseover", M), x.addEventListener("mouseout", w), () => {
      x.removeEventListener("mouseover", M), x.removeEventListener("mouseout", w), s.current && clearTimeout(s.current);
    };
  }, [e, i, a]), G(() => {
    if (!n.isVisible) return;
    const x = () => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, M = e.view.dom.closest(".editor-content-wrapper");
    return M?.addEventListener("scroll", x), window.addEventListener("scroll", x, !0), () => {
      M?.removeEventListener("scroll", x), window.removeEventListener("scroll", x, !0);
    };
  }, [n.isVisible, e]);
  const [d, c] = j(!1), m = z(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      c(!0), setTimeout(() => c(!1), 1500);
    });
  }, [n.url]), f = z(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = z(() => {
    if (n.linkElement) {
      const { view: x } = e, { doc: M } = x.state;
      let w = null, T = null;
      M.descendants((k, D) => {
        if (k.isText && k.marks.some((N) => N.type.name === "link")) {
          const N = x.nodeDOM(D);
          if (N && (N === n.linkElement || N.parentElement === n.linkElement))
            return w = D, T = D + k.nodeSize, !1;
        }
        return !0;
      }), w !== null && T !== null ? e.chain().focus().setTextSelection({ from: w, to: T }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((x) => ({ ...x, isVisible: !1 }));
  }, [e, n.linkElement]), b = z(() => {
    if (n.linkElement) {
      const { view: x } = e, { doc: M } = x.state;
      M.descendants((w, T) => {
        if (w.isText && w.marks.some((k) => k.type.name === "link")) {
          const k = x.nodeDOM(T);
          if (k && (k === n.linkElement || k.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: T, to: T + w.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((x) => ({ ...x, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const h = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, y = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", v = /* @__PURE__ */ u(
    "div",
    {
      ref: o,
      className: "link-hover-tooltip",
      "data-theme": y,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`,
        zIndex: 9999
      },
      onMouseEnter: l,
      onMouseLeave: a,
      children: /* @__PURE__ */ u("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ u(
          "button",
          {
            onClick: f,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ u(Qm, { size: 13, className: "link-hover-tooltip-link-icon" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 248,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ u("span", { className: "link-hover-tooltip-url", children: h || "No URL" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 249,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
            lineNumber: 243,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ u("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ u(
            "button",
            {
              onClick: b,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ u(Jm, { size: 14 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 260,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 255,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: m,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: d ? /* @__PURE__ */ u($n, { size: 14, style: { color: "var(--primary)" } }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 269,
                columnNumber: 23
              }, this) : /* @__PURE__ */ u(Wn, { size: 14 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 269,
                columnNumber: 81
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 264,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ u(ef, { size: 14 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 278,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 273,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
          lineNumber: 253,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
        lineNumber: 241,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
      lineNumber: 228,
      columnNumber: 5
    },
    this
  );
  return jt(v, document.body);
}
const nt = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ u(
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
  },
  void 0,
  !1,
  {
    fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 50,
    columnNumber: 3
  },
  void 0
), Ta = () => /* @__PURE__ */ u("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }, void 0, !1, {
  fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
  lineNumber: 69,
  columnNumber: 3
}, void 0), Ea = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" }
], yp = Bn(function({ editor: t, isH1: n, isH2: r, isH3: o, executeCommand: s }) {
  const [i, a] = j(!1), l = V(null), d = n ? "h1" : r ? "h2" : o ? "h3" : "paragraph", c = Ea.find((f) => f.value === d)?.shortLabel || "P";
  G(() => {
    if (!i) return;
    const f = (p) => {
      l.current && !l.current.contains(p.target) && a(!1);
    };
    return document.addEventListener("mousedown", f), () => document.removeEventListener("mousedown", f);
  }, [i]);
  const m = (f, p) => {
    if (f.preventDefault(), f.stopPropagation(), p === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const b = parseInt(p.replace("h", ""));
      t.chain().focus().toggleHeading({ level: b }).run();
    }
    a(!1);
  };
  return /* @__PURE__ */ u("div", { ref: l, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ u(
      "button",
      {
        onMouseDown: (f) => {
          f.preventDefault(), f.stopPropagation(), a(!i);
        },
        title: "Text style",
        className: `
          flex items-center gap-1 h-7 px-2 rounded-md flex-shrink-0
          transition-all duration-100 ease-out touch-manipulation
          text-xs font-normal overflow-visible
          ${d !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ u("span", { className: "min-w-[18px] text-center", children: c }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 139,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u(Ht, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${i ? "rotate-180" : ""}` }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 140,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 122,
        columnNumber: 7
      },
      this
    ),
    i && /* @__PURE__ */ u(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: Ea.map((f) => {
          const p = f.value === d;
          return /* @__PURE__ */ u(
            "button",
            {
              onMouseDown: (b) => m(b, f.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${p ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ u("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: f.shortLabel }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 168,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ u("span", { children: f.label }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 169,
                  columnNumber: 17
                }, this)
              ]
            },
            f.value,
            !0,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 156,
              columnNumber: 15
            },
            this
          );
        })
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 144,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 121,
    columnNumber: 5
  }, this);
}), xp = Bn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const i = V(null), a = $l({
    editor: t,
    selector: ({ editor: N }) => ({
      isBold: N.isActive("bold"),
      isItalic: N.isActive("italic"),
      isUnderline: N.isActive("underline"),
      isStrike: N.isActive("strike"),
      isCode: N.isActive("code"),
      isHighlight: N.isActive("highlight"),
      isLink: N.isActive("link"),
      isH1: N.isActive("heading", { level: 1 }),
      isH2: N.isActive("heading", { level: 2 }),
      isH3: N.isActive("heading", { level: 3 }),
      isBulletList: N.isActive("bulletList"),
      isOrderedList: N.isActive("orderedList"),
      isTaskList: N.isActive("taskList"),
      isBlockquote: N.isActive("blockquote"),
      isCodeBlock: N.isActive("codeBlock")
    })
  }), [l, d] = j(!1), [c, m] = j(""), [f, p] = j(!1), [b, h] = j({ top: 0, left: 0 }), g = V(null), y = V(null), v = V(null), x = z(() => {
    if (c) {
      let N = c.trim();
      !/^https?:\/\//i.test(N) && !N.startsWith("mailto:") && (N = "https://" + N), t.chain().focus().extendMarkRange("link").setLink({ href: N }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    d(!1), m("");
  }, [t, c]), M = (N) => {
    N.preventDefault(), N.stopPropagation();
    const E = t.getAttributes("link").href;
    m(E || ""), d(!0);
  }, w = z((N, E) => {
    N.preventDefault(), N.stopPropagation(), E();
  }, []);
  G(() => {
    if (!t || t.isDestroyed) return;
    const N = () => {
      if (!t.isDestroyed)
        try {
          const { selection: E } = t.state, { empty: S, from: P, to: R } = E, H = ("node" in E && E.node ? E.node : t.state.doc.nodeAt(P))?.type?.name === "resizableImage";
          if (S && !H || t.isActive("codeBlock")) {
            v.current && (clearTimeout(v.current), v.current = null), y.current && clearTimeout(y.current), y.current = setTimeout(() => {
              p(!1), d(!1);
            }, 150);
            return;
          }
          y.current && (clearTimeout(y.current), y.current = null);
          const K = t.view.coordsAtPos(P), A = t.view.coordsAtPos(R), $ = g.current?.offsetWidth || 500, Q = g.current?.offsetHeight || 40, se = 8, ie = window.innerWidth;
          let oe = (K.left + A.left) / 2 - $ / 2;
          oe = Math.max(se, Math.min(ie - $ - se, oe));
          let O = K.top - Q - 10;
          O < se && (O = A.bottom + 10), f ? h({ top: Math.max(se, O), left: oe }) : (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
            h({ top: Math.max(se, O), left: oe }), p(!0);
          }, 50));
        } catch (E) {
          console.warn("FloatingToolbar: Error updating position", E);
        }
    };
    return t.on("selectionUpdate", N), () => {
      t.off("selectionUpdate", N), y.current && clearTimeout(y.current), v.current && clearTimeout(v.current);
    };
  }, [t, f]);
  const T = (N) => {
    y.current && (clearTimeout(y.current), y.current = null);
  };
  if (!f || r)
    return null;
  const k = 15, D = l ? /* @__PURE__ */ u(
    "div",
    {
      ref: g,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: b.top,
        left: b.left,
        zIndex: 9999
      },
      onMouseDown: T,
      children: /* @__PURE__ */ u("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ u(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: c,
            onChange: (N) => m(N.target.value),
            onKeyDown: (N) => {
              N.key === "Enter" && (N.preventDefault(), x()), N.key === "Escape" && (d(!1), m(""));
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
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 363,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ u("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ u(
            "button",
            {
              onMouseDown: (N) => {
                N.preventDefault(), x();
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
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 387,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onMouseDown: (N) => {
                N.preventDefault(), d(!1), m("");
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
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 400,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 386,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 362,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 351,
      columnNumber: 5
    },
    this
  ) : /* @__PURE__ */ u(
    "div",
    {
      ref: g,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: b.top,
        left: b.left,
        zIndex: 9999
      },
      onMouseDown: T,
      children: [
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleBold().run()),
            isActive: a?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ u(li, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 435,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 430,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleItalic().run()),
            isActive: a?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ u(ci, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 442,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 437,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleUnderline().run()),
            isActive: a?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ u(ui, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 449,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 444,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleStrike().run()),
            isActive: a?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ u(di, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 456,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 451,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleCode().run()),
            isActive: a?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ u(Hl, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 463,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 458,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleHighlight().run()),
            isActive: a?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ u(Fl, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 470,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 465,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: M,
            isActive: a?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ u(mi, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 478,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 473,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(Ta, {}, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 481,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ u(
          yp,
          {
            editor: t,
            isH1: a?.isH1 ?? !1,
            isH2: a?.isH2 ?? !1,
            isH3: a?.isH3 ?? !1,
            executeCommand: w
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 484,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleBlockquote().run()),
            isActive: a?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ u(fi, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 496,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 491,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleBulletList().run()),
            isActive: a?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ u(pi, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 503,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 498,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleOrderedList().run()),
            isActive: a?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ u(hi, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 510,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 505,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleTaskList().run()),
            isActive: a?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ u(gi, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 517,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 512,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u(
          nt,
          {
            onMouseDown: (N) => w(N, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: a?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ u(tf, { size: k }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 524,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 519,
            columnNumber: 7
          },
          this
        ),
        o && /* @__PURE__ */ u(Pe, { children: [
          /* @__PURE__ */ u(Ta, {}, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 530,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u(
            "button",
            {
              ref: i,
              onMouseDown: (N) => {
                N.preventDefault(), N.stopPropagation(), i.current && s?.(i.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ u(Eo, { size: k }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
                lineNumber: 548,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 531,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 529,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 418,
      columnNumber: 5
    },
    this
  );
  return jt(D, document.body);
}), Hr = {
  info: { icon: lo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: Yl, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: Ul, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: vi, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: bi, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function wp({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = j(!1), [s, i] = j(!1), [a, l] = j(null), d = V(null), c = V(null), m = e.attrs.type || "info", f = Hr[m] || Hr.info, p = f.icon, b = z(() => {
    if (c.current) {
      const v = c.current.getBoundingClientRect();
      l({
        top: v.bottom + 4,
        left: v.left
      });
    }
  }, []);
  G(() => {
    if (!r) return;
    const v = (x) => {
      d.current && !d.current.contains(x.target) && c.current && !c.current.contains(x.target) && o(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [r]), G(() => {
    if (!r) return;
    const v = () => o(!1);
    return window.addEventListener("scroll", v, !0), () => window.removeEventListener("scroll", v, !0);
  }, [r]);
  const h = z(() => {
    n.isEditable && (r || b(), o(!r));
  }, [n.isEditable, r, b]), g = (v) => {
    t({ type: v }), o(!1);
  }, y = z((v) => {
    v.stopPropagation(), i((x) => !x);
  }, []);
  return /* @__PURE__ */ u(xr, { className: `callout callout-${m}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": m, children: [
    /* @__PURE__ */ u("div", { className: "callout-header", contentEditable: !1, children: [
      /* @__PURE__ */ u(
        "button",
        {
          ref: c,
          className: "callout-header-button",
          onClick: h,
          title: n.isEditable ? "Click to change callout type" : f.label,
          style: { color: f.borderColor },
          contentEditable: !1,
          children: [
            /* @__PURE__ */ u(p, { size: 18 }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 117,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ u("span", { className: "callout-label", children: f.label }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 118,
              columnNumber: 11
            }, this),
            n.isEditable && /* @__PURE__ */ u(Ht, { size: 12, className: "callout-type-chevron" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 119,
              columnNumber: 33
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
          lineNumber: 109,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ u(
        "button",
        {
          className: "callout-collapse-toggle",
          onClick: y,
          title: s ? "Expand callout" : "Collapse callout",
          contentEditable: !1,
          style: { color: f.borderColor },
          children: s ? /* @__PURE__ */ u(jl, { size: 16 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 128,
            columnNumber: 24
          }, this) : /* @__PURE__ */ u(Ht, { size: 16 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 128,
            columnNumber: 53
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
          lineNumber: 121,
          columnNumber: 9
        },
        this
      ),
      r && n.isEditable && a && jt(
        /* @__PURE__ */ u(
          "div",
          {
            ref: d,
            className: "callout-type-dropdown",
            contentEditable: !1,
            style: {
              position: "fixed",
              top: a.top,
              left: a.left,
              zIndex: 9999
            },
            children: Object.keys(Hr).map((v) => {
              const x = Hr[v], M = x.icon;
              return /* @__PURE__ */ u(
                "button",
                {
                  className: `callout-type-option ${v === m ? "active" : ""}`,
                  onClick: () => g(v),
                  style: { "--callout-option-color": x.color },
                  children: [
                    /* @__PURE__ */ u(M, { size: 16, style: { color: x.borderColor } }, void 0, !1, {
                      fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                      lineNumber: 153,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ u("span", { children: x.label }, void 0, !1, {
                      fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                      lineNumber: 154,
                      columnNumber: 19
                    }, this)
                  ]
                },
                v,
                !0,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 147,
                  columnNumber: 17
                },
                this
              );
            })
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 132,
            columnNumber: 11
          },
          this
        ),
        document.body
      )
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 108,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ u(si, {}, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 165,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 164,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
    lineNumber: 106,
    columnNumber: 5
  }, this);
}
const kp = Co.create({
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
      _n(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return ko(wp);
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
}), Cp = Hf.extend({
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
        _n(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addNodeView() {
    const e = this.options;
    return ({ node: t, editor: n, getPos: r }) => {
      let o = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const i = (E) => {
        const S = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[E] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${S}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const l = (E) => !(!E || E.startsWith("data:") || E.startsWith("blob:") || E.startsWith("http://") || E.startsWith("https://")), d = (E) => {
        l(E) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(E).then((S) => {
          a.src = S, a.style.opacity = "1";
        }).catch(() => {
          a.src = E, a.style.opacity = "1";
        })) : a.src = E;
      };
      d(t.attrs.src);
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
      const m = document.createElement("button");
      m.classList.add("image-menu-btn"), m.setAttribute("type", "button"), m.setAttribute("title", "Image options"), m.style.cssText = `
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
      `, m.innerHTML = `
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
        min-width: 140px;
        padding: 4px;
        background: oklch(0.99 0 0);
        border: 1px solid oklch(0.9 0 0);
        border-radius: 8px;
        box-shadow: 0 4px 16px oklch(0 0 0 / 0.15);
        z-index: 9999;
        pointer-events: auto;
      `;
      const p = (E, S, P) => {
        const R = document.createElement("button");
        return R.setAttribute("type", "button"), R.style.cssText = `
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
        `, R.innerHTML = `${S}<span>${E}</span>`, R.addEventListener("mouseenter", () => {
          R.style.background = "oklch(0.95 0 0)";
        }), R.addEventListener("mouseleave", () => {
          R.style.background = "transparent";
        }), R.addEventListener("click", (I) => {
          I.preventDefault(), I.stopPropagation(), P(), f.style.display = "none", v = !1;
        }), R;
      }, b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", b, () => {
        const E = typeof r == "function" ? r() : null;
        if (E != null && e.onImageClick) {
          const S = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: E,
            rect: S
          });
        }
      })), f.appendChild(p("Copy image", h, async () => {
        const E = o.attrs.src;
        try {
          const P = await (await fetch(E)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [P.type]: P })
          ]);
        } catch {
          try {
            await navigator.clipboard.writeText(E);
          } catch {
          }
        }
      })), f.appendChild(p("Copy URL", y, async () => {
        const E = o.attrs.src;
        try {
          await navigator.clipboard.writeText(E);
        } catch {
        }
      })), f.appendChild(p("Save image", g, () => {
        const E = o.attrs.src, S = o.attrs.alt || "image", P = document.createElement("a");
        P.href = E, P.download = S, P.target = "_blank", P.rel = "noopener noreferrer", document.body.appendChild(P), P.click(), setTimeout(() => {
          document.body.removeChild(P);
        }, 100);
      }));
      let v = !1;
      m.addEventListener("click", (E) => {
        if (E.preventDefault(), E.stopPropagation(), v)
          f.style.display = "none", v = !1;
        else {
          const S = m.getBoundingClientRect();
          f.style.top = `${S.bottom + 4}px`, f.style.left = `${S.right - 140}px`, f.style.display = "flex", v = !0;
        }
      });
      const x = (E) => {
        !f.contains(E.target) && !m.contains(E.target) && (f.style.display = "none", v = !1);
      };
      document.addEventListener("click", x), s.appendChild(a), s.appendChild(c), s.appendChild(m);
      const M = s.closest('[role="dialog"]');
      M ? M.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        c.style.opacity = "1", m.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        c.style.opacity = "0", v || (m.style.opacity = "0");
      }), m.addEventListener("mouseenter", () => {
        m.style.background = "oklch(0.95 0 0)";
      }), m.addEventListener("mouseleave", () => {
        m.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      let w, T;
      const k = (E) => {
        E.preventDefault(), w = E.clientX, T = a.offsetWidth, document.addEventListener("mousemove", D), document.addEventListener("mouseup", N);
      }, D = (E) => {
        const S = E.clientX - w, P = Math.max(100, T + S);
        a.style.width = `${P}px`;
      }, N = () => {
        document.removeEventListener("mousemove", D), document.removeEventListener("mouseup", N);
        const E = typeof r == "function" ? r() : null, S = a.offsetWidth;
        if (E != null)
          try {
            const { state: P, dispatch: R } = n.view, I = P.doc.nodeAt(E);
            if (I && I.type.name === "resizableImage") {
              const B = P.tr.setNodeMarkup(E, void 0, {
                ...I.attrs,
                width: S
              });
              R(B);
            }
          } catch {
            n.chain().focus().setNodeSelection(E).updateAttributes("resizableImage", {
              width: S
            }).run();
          }
      };
      return c.addEventListener("mousedown", k), {
        dom: s,
        update: (E) => E.type.name !== "resizableImage" ? !1 : (o = E, d(E.attrs.src), a.alt = E.attrs.alt || "", E.attrs.width && (a.style.width = `${E.attrs.width}px`), i(E.attrs.align || "left"), !0),
        destroy: () => {
          c.removeEventListener("mousedown", k), document.removeEventListener("click", x), f.remove();
        }
      };
    };
  }
});
function Tp(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Ep = {}, sr = {};
function Jt(e, t) {
  try {
    const r = (Ep[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in sr ? sr[r] : Sa(r, r.split(":"));
  } catch {
    if (e in sr) return sr[e];
    const n = e?.match(Sp);
    return n ? Sa(e, n.slice(1)) : NaN;
  }
}
const Sp = /([+-]\d\d):?(\d\d)?/;
function Sa(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return sr[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class ft extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Jt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), ac(this), Bs(this)) : this.setTime(Date.now());
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
    const t = -Jt(this.timeZone, this);
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
const Ma = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ma.test(e)) return;
  const t = e.replace(Ma, "$1UTC");
  ft.prototype[t] && (e.startsWith("get") ? ft.prototype[e] = function() {
    return this.internal[t]();
  } : (ft.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Mp(this), +this;
  }, ft.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Bs(this), +this;
  }));
});
function Bs(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Jt(e.timeZone, e) * 60));
}
function Mp(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), ac(e);
}
function ac(e) {
  const t = Jt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const d = /* @__PURE__ */ new Date(+e);
  d.setUTCSeconds(0);
  const c = o > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, m = Math.round(-(Jt(e.timeZone, e) * 60)) % 60;
  (m || c) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + m), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + m + c));
  const f = Jt(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), h = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, g = p !== n, y = h - l;
  if (g && y) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + y);
    const v = Jt(e.timeZone, e), x = v > 0 ? Math.floor(v) : Math.ceil(v), M = p - x;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
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
    return `${t} GMT${n}${r}${o} (${Tp(this.timeZone, this)})`;
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
const lc = 6048e5, Dp = 864e5, Da = Symbol.for("constructDateFrom");
function Me(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Da in e ? e[Da](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ke(e, t) {
  return Me(t || e, e);
}
function cc(e, t, n) {
  const r = ke(e, n?.in);
  return isNaN(t) ? Me(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function uc(e, t, n) {
  const r = ke(e, n?.in);
  if (isNaN(t)) return Me(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Me(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const i = s.getDate();
  return o >= i ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let Rp = {};
function wr() {
  return Rp;
}
function Pn(e, t) {
  const n = wr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ke(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function fr(e, t) {
  return Pn(e, { ...t, weekStartsOn: 1 });
}
function dc(e, t) {
  const n = ke(e, t?.in), r = n.getFullYear(), o = Me(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = fr(o), i = Me(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = fr(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function Ra(e) {
  const t = ke(e), n = new Date(
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
function zn(e, ...t) {
  const n = Me.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function pr(e, t) {
  const n = ke(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function mc(e, t, n) {
  const [r, o] = zn(
    n?.in,
    e,
    t
  ), s = pr(r), i = pr(o), a = +s - Ra(s), l = +i - Ra(i);
  return Math.round((a - l) / Dp);
}
function Ap(e, t) {
  const n = dc(e, t), r = Me(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), fr(r);
}
function Pp(e, t, n) {
  return cc(e, t * 7, n);
}
function Ip(e, t, n) {
  return uc(e, t * 12, n);
}
function Lp(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Me.bind(null, o));
    const s = ke(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Me(r, n || NaN);
}
function Op(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Me.bind(null, o));
    const s = ke(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Me(r, n || NaN);
}
function _p(e, t, n) {
  const [r, o] = zn(
    n?.in,
    e,
    t
  );
  return +pr(r) == +pr(o);
}
function fc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Bp(e) {
  return !(!fc(e) && typeof e != "number" || isNaN(+ke(e)));
}
function $p(e, t, n) {
  const [r, o] = zn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function Wp(e, t) {
  const n = ke(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function pc(e, t) {
  const [n, r] = zn(e, t.start, t.end);
  return { start: n, end: r };
}
function zp(e, t) {
  const { start: n, end: r } = pc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const l = [];
  for (; +i <= s; )
    l.push(Me(n, i)), i.setMonth(i.getMonth() + a);
  return o ? l.reverse() : l;
}
function Hp(e, t) {
  const n = ke(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Fp(e, t) {
  const n = ke(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function hc(e, t) {
  const n = ke(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Up(e, t) {
  const { start: n, end: r } = pc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const l = [];
  for (; +i <= s; )
    l.push(Me(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? l.reverse() : l;
}
function gc(e, t) {
  const n = wr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ke(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function Yp(e, t) {
  return gc(e, { ...t, weekStartsOn: 1 });
}
const jp = {
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
}, Vp = (e, t, n) => {
  let r;
  const o = jp[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ls(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Kp = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, qp = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Gp = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Zp = {
  date: ls({
    formats: Kp,
    defaultWidth: "full"
  }),
  time: ls({
    formats: qp,
    defaultWidth: "full"
  }),
  dateTime: ls({
    formats: Gp,
    defaultWidth: "full"
  })
}, Xp = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Qp = (e, t, n, r) => Xp[e];
function Jn(e) {
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
const Jp = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, eh = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, th = {
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
}, nh = {
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
}, rh = {
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
}, oh = {
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
}, sh = (e, t) => {
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
}, ih = {
  ordinalNumber: sh,
  era: Jn({
    values: Jp,
    defaultWidth: "wide"
  }),
  quarter: Jn({
    values: eh,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Jn({
    values: th,
    defaultWidth: "wide"
  }),
  day: Jn({
    values: nh,
    defaultWidth: "wide"
  }),
  dayPeriod: Jn({
    values: rh,
    defaultWidth: "wide",
    formattingValues: oh,
    defaultFormattingWidth: "wide"
  })
};
function er(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(a) ? lh(a, (m) => m.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      ah(a, (m) => m.test(i))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(l) : l, d = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(d)
    ) : d;
    const c = t.slice(i.length);
    return { value: d, rest: c };
  };
}
function ah(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function lh(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function ch(e) {
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
const uh = /^(\d+)(th|st|nd|rd)?/i, dh = /\d+/i, mh = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, fh = {
  any: [/^b/i, /^(a|c)/i]
}, ph = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, hh = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, gh = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, bh = {
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
}, vh = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Nh = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, yh = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, xh = {
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
}, wh = {
  ordinalNumber: ch({
    matchPattern: uh,
    parsePattern: dh,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: er({
    matchPatterns: mh,
    defaultMatchWidth: "wide",
    parsePatterns: fh,
    defaultParseWidth: "any"
  }),
  quarter: er({
    matchPatterns: ph,
    defaultMatchWidth: "wide",
    parsePatterns: hh,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: er({
    matchPatterns: gh,
    defaultMatchWidth: "wide",
    parsePatterns: bh,
    defaultParseWidth: "any"
  }),
  day: er({
    matchPatterns: vh,
    defaultMatchWidth: "wide",
    parsePatterns: Nh,
    defaultParseWidth: "any"
  }),
  dayPeriod: er({
    matchPatterns: yh,
    defaultMatchWidth: "any",
    parsePatterns: xh,
    defaultParseWidth: "any"
  })
}, Ei = {
  code: "en-US",
  formatDistance: Vp,
  formatLong: Zp,
  formatRelative: Qp,
  localize: ih,
  match: wh,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function kh(e, t) {
  const n = ke(e, t?.in);
  return mc(n, hc(n)) + 1;
}
function bc(e, t) {
  const n = ke(e, t?.in), r = +fr(n) - +Ap(n);
  return Math.round(r / lc) + 1;
}
function vc(e, t) {
  const n = ke(e, t?.in), r = n.getFullYear(), o = wr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Me(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = Pn(i, t), l = Me(t?.in || e, 0);
  l.setFullYear(r, 0, s), l.setHours(0, 0, 0, 0);
  const d = Pn(l, t);
  return +n >= +a ? r + 1 : +n >= +d ? r : r - 1;
}
function Ch(e, t) {
  const n = wr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = vc(e, t), s = Me(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Pn(s, t);
}
function Nc(e, t) {
  const n = ke(e, t?.in), r = +Pn(n, t) - +Ch(n, t);
  return Math.round(r / lc) + 1;
}
function xe(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const _t = {
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
}, bn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Aa = {
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
    return _t.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = vc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return xe(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : xe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = dc(e);
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
        return _t.M(e, t);
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
    const r = bc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : xe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : _t.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = kh(e);
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
    return _t.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : _t.H(e, t);
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
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : _t.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : _t.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return _t.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Ia(r);
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
        return Ia(r);
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
        return "GMT" + Pa(r, ":");
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
        return "GMT" + Pa(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Zt(r, ":");
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
function Pa(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + xe(s, 2);
}
function Ia(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + xe(Math.abs(e) / 60, 2) : Zt(e, t);
}
function Zt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = xe(Math.trunc(r / 60), 2), s = xe(r % 60, 2);
  return n + o + t + s;
}
const La = (e, t) => {
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
}, yc = (e, t) => {
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
}, Th = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return La(e, t);
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
  return s.replace("{{date}}", La(r, t)).replace("{{time}}", yc(o, t));
}, Eh = {
  p: yc,
  P: Th
}, Sh = /^D+$/, Mh = /^Y+$/, Dh = ["D", "DD", "YY", "YYYY"];
function Rh(e) {
  return Sh.test(e);
}
function Ah(e) {
  return Mh.test(e);
}
function Ph(e, t, n) {
  const r = Ih(e, t, n);
  if (console.warn(r), Dh.includes(e)) throw new RangeError(r);
}
function Ih(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Lh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Oh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, _h = /^'([^]*?)'?$/, Bh = /''/g, $h = /[a-zA-Z]/;
function Wh(e, t, n) {
  const r = wr(), o = n?.locale ?? r.locale ?? Ei, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = ke(e, n?.in);
  if (!Bp(a))
    throw new RangeError("Invalid time value");
  let l = t.match(Oh).map((c) => {
    const m = c[0];
    if (m === "p" || m === "P") {
      const f = Eh[m];
      return f(c, o.formatLong);
    }
    return c;
  }).join("").match(Lh).map((c) => {
    if (c === "''")
      return { isToken: !1, value: "'" };
    const m = c[0];
    if (m === "'")
      return { isToken: !1, value: zh(c) };
    if (Aa[m])
      return { isToken: !0, value: c };
    if (m.match($h))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + m + "`"
      );
    return { isToken: !1, value: c };
  });
  o.localize.preprocessor && (l = o.localize.preprocessor(a, l));
  const d = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: o
  };
  return l.map((c) => {
    if (!c.isToken) return c.value;
    const m = c.value;
    (!n?.useAdditionalWeekYearTokens && Ah(m) || !n?.useAdditionalDayOfYearTokens && Rh(m)) && Ph(m, t, String(e));
    const f = Aa[m[0]];
    return f(a, m, o.localize, d);
  }).join("");
}
function zh(e) {
  const t = e.match(_h);
  return t ? t[1].replace(Bh, "'") : e;
}
function Hh(e, t) {
  const n = ke(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Me(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Fh(e, t) {
  return ke(e, t?.in).getMonth();
}
function Uh(e, t) {
  return ke(e, t?.in).getFullYear();
}
function Yh(e, t) {
  return +ke(e) > +ke(t);
}
function jh(e, t) {
  return +ke(e) < +ke(t);
}
function Vh(e, t, n) {
  const [r, o] = zn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Kh(e, t, n) {
  const [r, o] = zn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function qh(e, t, n) {
  const r = ke(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Me(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = Hh(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function Gh(e, t, n) {
  const r = ke(e, n?.in);
  return isNaN(+r) ? Me(e, NaN) : (r.setFullYear(t), r);
}
const Oa = 5, Zh = 4;
function Xh(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Oa * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Oa : Zh;
}
function xc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Qh(e, t) {
  const n = xc(e, t), r = Xh(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Ze {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Be.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Be(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : cc(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : uc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Pp(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : Ip(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : mc(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : $p(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : zp(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Up(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Qh(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Yp(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Wp(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : gc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Fp(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : Wh(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : bc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Fh(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : Uh(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Nc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Yh(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : jh(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : fc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : _p(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : Vh(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Kh(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Lp(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Op(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : qh(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : Gh(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : xc(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : pr(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : fr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Hp(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Pn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : hc(r), this.options = { locale: Ei, ...t }, this.overrides = n;
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
    return t && Ze.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Ze.yearFirstLocales.has(s))
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
Ze.yearFirstLocales = /* @__PURE__ */ new Set([
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
const vt = new Ze();
class wc {
  constructor(t, n, r = vt) {
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
class Jh {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class eg {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function tg(e) {
  return q.createElement("button", { ...e });
}
function ng(e) {
  return q.createElement("span", { ...e });
}
function rg(e) {
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
function og(e) {
  const { day: t, modifiers: n, ...r } = e;
  return q.createElement("td", { ...r });
}
function sg(e) {
  const { day: t, modifiers: n, ...r } = e, o = q.useRef(null);
  return q.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), q.createElement("button", { ref: o, ...r });
}
var J;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(J || (J = {}));
var Ce;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Ce || (Ce = {}));
var it;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(it || (it = {}));
var Ve;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Ve || (Ve = {}));
function ig(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[J.Dropdown], n].join(" "), a = t?.find(({ value: l }) => l === s.value);
  return q.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[J.DropdownRoot] },
    q.createElement(r.Select, { className: i, ...s }, t?.map(({ value: l, label: d, disabled: c }) => q.createElement(r.Option, { key: l, value: l, disabled: c }, d))),
    q.createElement(
      "span",
      { className: o[J.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      q.createElement(r.Chevron, { orientation: "down", size: 18, className: o[J.Chevron] })
    )
  );
}
function ag(e) {
  return q.createElement("div", { ...e });
}
function lg(e) {
  return q.createElement("div", { ...e });
}
function cg(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return q.createElement("div", { ...r }, e.children);
}
function ug(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return q.createElement("div", { ...r });
}
function dg(e) {
  return q.createElement("table", { ...e });
}
function mg(e) {
  return q.createElement("div", { ...e });
}
const kc = Wl(void 0);
function kr() {
  const e = zl(kc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function fg(e) {
  const { components: t } = kr();
  return q.createElement(t.Dropdown, { ...e });
}
function pg(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: l, labelNext: d } } = kr(), c = z((f) => {
    o && n?.(f);
  }, [o, n]), m = z((f) => {
    r && t?.(f);
  }, [r, t]);
  return q.createElement(
    "nav",
    { ...s },
    q.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[J.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: m },
      q.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[J.Chevron], orientation: "left" })
    ),
    q.createElement(
      i.NextMonthButton,
      { type: "button", className: a[J.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": d(o), onClick: c },
      q.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[J.Chevron] })
    )
  );
}
function hg(e) {
  const { components: t } = kr();
  return q.createElement(t.Button, { ...e });
}
function gg(e) {
  return q.createElement("option", { ...e });
}
function bg(e) {
  const { components: t } = kr();
  return q.createElement(t.Button, { ...e });
}
function vg(e) {
  const { rootRef: t, ...n } = e;
  return q.createElement("div", { ...n, ref: t });
}
function Ng(e) {
  return q.createElement("select", { ...e });
}
function yg(e) {
  const { week: t, ...n } = e;
  return q.createElement("tr", { ...n });
}
function xg(e) {
  return q.createElement("th", { ...e });
}
function wg(e) {
  return q.createElement(
    "thead",
    { "aria-hidden": !0 },
    q.createElement("tr", { ...e })
  );
}
function kg(e) {
  const { week: t, ...n } = e;
  return q.createElement("th", { ...n });
}
function Cg(e) {
  return q.createElement("th", { ...e });
}
function Tg(e) {
  return q.createElement("tbody", { ...e });
}
function Eg(e) {
  const { components: t } = kr();
  return q.createElement(t.Dropdown, { ...e });
}
const Sg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: tg,
  CaptionLabel: ng,
  Chevron: rg,
  Day: og,
  DayButton: sg,
  Dropdown: ig,
  DropdownNav: ag,
  Footer: lg,
  Month: cg,
  MonthCaption: ug,
  MonthGrid: dg,
  Months: mg,
  MonthsDropdown: fg,
  Nav: pg,
  NextMonthButton: hg,
  Option: gg,
  PreviousMonthButton: bg,
  Root: vg,
  Select: Ng,
  Week: yg,
  WeekNumber: kg,
  WeekNumberHeader: Cg,
  Weekday: xg,
  Weekdays: wg,
  Weeks: Tg,
  YearsDropdown: Eg
}, Symbol.toStringTag, { value: "Module" }));
function St(e, t, n = !1, r = vt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function Cc(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Si(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Tc(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Ec(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Sc(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Mc(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Mt(e, t, n = vt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (Mc(a, n))
      return a.includes(e);
    if (Si(a))
      return St(a, e, !1, n);
    if (Sc(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (Cc(a)) {
      const l = s(a.before, e), d = s(a.after, e), c = l > 0, m = d < 0;
      return i(a.before, a.after) ? m && c : c || m;
    }
    return Tc(a) ? s(e, a.after) > 0 : Ec(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function Mg(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: l, broadcastCalendar: d, today: c } = t, { isSameDay: m, isSameMonth: f, startOfMonth: p, isBefore: b, endOfMonth: h, isAfter: g } = o, y = n && p(n), v = r && h(r), x = {
    [Ce.focused]: [],
    [Ce.outside]: [],
    [Ce.disabled]: [],
    [Ce.hidden]: [],
    [Ce.today]: []
  }, M = {};
  for (const w of e) {
    const { date: T, displayMonth: k } = w, D = !!(k && !f(T, k)), N = !!(y && b(T, y)), E = !!(v && g(T, v)), S = !!(s && Mt(T, s, o)), P = !!(i && Mt(T, i, o)) || N || E || // Broadcast calendar will show outside days as default
    !d && !l && D || d && l === !1 && D, R = m(T, c ?? o.today());
    D && x.outside.push(w), S && x.disabled.push(w), P && x.hidden.push(w), R && x.today.push(w), a && Object.keys(a).forEach((I) => {
      const B = a?.[I];
      B && Mt(T, B, o) && (M[I] ? M[I].push(w) : M[I] = [w]);
    });
  }
  return (w) => {
    const T = {
      [Ce.focused]: !1,
      [Ce.disabled]: !1,
      [Ce.hidden]: !1,
      [Ce.outside]: !1,
      [Ce.today]: !1
    }, k = {};
    for (const D in x) {
      const N = x[D];
      T[D] = N.some((E) => E === w);
    }
    for (const D in M)
      k[D] = M[D].some((N) => N === w);
    return {
      ...T,
      // custom modifiers should override all the previous ones
      ...k
    };
  };
}
function Dg(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[Ce[s]] ? o.push(t[Ce[s]]) : t[it[s]] && o.push(t[it[s]]), o), [t[J.Day]]);
}
function Rg(e) {
  return {
    ...Sg,
    ...e
  };
}
function Ag(e) {
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
function Mi() {
  const e = {};
  for (const t in J)
    e[J[t]] = `rdp-${J[t]}`;
  for (const t in Ce)
    e[Ce[t]] = `rdp-${Ce[t]}`;
  for (const t in it)
    e[it[t]] = `rdp-${it[t]}`;
  for (const t in Ve)
    e[Ve[t]] = `rdp-${Ve[t]}`;
  return e;
}
function Dc(e, t, n) {
  return (n ?? new Ze(t)).formatMonthYear(e);
}
const Pg = Dc;
function Ig(e, t, n) {
  return (n ?? new Ze(t)).format(e, "d");
}
function Lg(e, t = vt) {
  return t.format(e, "LLLL");
}
function Og(e, t, n) {
  return (n ?? new Ze(t)).format(e, "cccccc");
}
function _g(e, t = vt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Bg() {
  return "";
}
function Rc(e, t = vt) {
  return t.format(e, "yyyy");
}
const $g = Rc, Wg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Dc,
  formatDay: Ig,
  formatMonthCaption: Pg,
  formatMonthDropdown: Lg,
  formatWeekNumber: _g,
  formatWeekNumberHeader: Bg,
  formatWeekdayName: Og,
  formatYearCaption: $g,
  formatYearDropdown: Rc
}, Symbol.toStringTag, { value: "Module" }));
function zg(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Wg,
    ...e
  };
}
function Hg(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: l, getMonth: d } = o;
  return l({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), b = d(f), h = t && f < s(t) || n && f > s(n) || !1;
    return { value: b, label: p, disabled: h };
  });
}
function Fg(e, t = {}, n = {}) {
  let r = { ...t?.[J.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function Ug(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function Yg(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: i, eachYearOfInterval: a, getYear: l } = r, d = s(e), c = i(t), m = a({ start: d, end: c });
  return o && m.reverse(), m.map((f) => {
    const p = n.formatYearDropdown(f, r);
    return {
      value: l(f),
      label: p,
      disabled: !1
    };
  });
}
function Ac(e, t, n, r) {
  let o = (r ?? new Ze(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const jg = Ac;
function Pc(e, t, n) {
  return (n ?? new Ze(t)).formatMonthYear(e);
}
const Vg = Pc;
function Kg(e, t, n, r) {
  let o = (r ?? new Ze(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function qg(e) {
  return "Choose the Month";
}
function Gg() {
  return "";
}
function Zg(e) {
  return "Go to the Next Month";
}
function Xg(e) {
  return "Go to the Previous Month";
}
function Qg(e, t, n) {
  return (n ?? new Ze(t)).format(e, "cccc");
}
function Jg(e, t) {
  return `Week ${e}`;
}
function eb(e) {
  return "Week Number";
}
function tb(e) {
  return "Choose the Year";
}
const nb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Vg,
  labelDay: jg,
  labelDayButton: Ac,
  labelGrid: Pc,
  labelGridcell: Kg,
  labelMonthDropdown: qg,
  labelNav: Gg,
  labelNext: Zg,
  labelPrevious: Xg,
  labelWeekNumber: Jg,
  labelWeekNumberHeader: eb,
  labelWeekday: Qg,
  labelYearDropdown: tb
}, Symbol.toStringTag, { value: "Module" })), Cr = (e) => e instanceof HTMLElement ? e : null, cs = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], rb = (e) => Cr(e.querySelector("[data-animated-month]")), us = (e) => Cr(e.querySelector("[data-animated-caption]")), ds = (e) => Cr(e.querySelector("[data-animated-weeks]")), ob = (e) => Cr(e.querySelector("[data-animated-nav]")), sb = (e) => Cr(e.querySelector("[data-animated-weekdays]"));
function ib(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = V(null), a = V(r), l = V(!1);
  To(() => {
    const d = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const c = s.isSameMonth(r[0].date, d[0].date), m = s.isAfter(r[0].date, d[0].date), f = m ? n[Ve.caption_after_enter] : n[Ve.caption_before_enter], p = m ? n[Ve.weeks_after_enter] : n[Ve.weeks_before_enter], b = i.current, h = e.current.cloneNode(!0);
    if (h instanceof HTMLElement ? (cs(h).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const M = rb(x);
      M && x.contains(M) && x.removeChild(M);
      const w = us(x);
      w && w.classList.remove(f);
      const T = ds(x);
      T && T.classList.remove(p);
    }), i.current = h) : i.current = null, l.current || c || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const g = b instanceof HTMLElement ? cs(b) : [], y = cs(e.current);
    if (y?.every((v) => v instanceof HTMLElement) && g && g.every((v) => v instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const v = ob(e.current);
      v && (v.style.zIndex = "1"), y.forEach((x, M) => {
        const w = g[M];
        if (!w)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const T = us(x);
        T && T.classList.add(f);
        const k = ds(x);
        k && k.classList.add(p);
        const D = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), T && T.classList.remove(f), k && k.classList.remove(p), x.style.position = "", x.style.overflow = "", x.contains(w) && x.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const N = sb(w);
        N && (N.style.opacity = "0");
        const E = us(w);
        E && (E.classList.add(m ? n[Ve.caption_before_exit] : n[Ve.caption_after_exit]), E.addEventListener("animationend", D));
        const S = ds(w);
        S && S.classList.add(m ? n[Ve.weeks_before_exit] : n[Ve.weeks_after_exit]), x.insertBefore(w, x.firstChild);
      });
    }
  });
}
function ab(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: c, differenceInCalendarMonths: m, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: b, endOfWeek: h, isAfter: g, startOfBroadcastWeek: y, startOfISOWeek: v, startOfWeek: x } = r, M = l ? y(o, r) : i ? v(o) : x(o), w = l ? f(s) : i ? p(b(s)) : h(b(s)), T = c(w, M), k = m(s, o) + 1, D = [];
  for (let S = 0; S <= T; S++) {
    const P = d(M, S);
    if (t && g(P, t))
      break;
    D.push(P);
  }
  const E = (l ? 35 : 42) * k;
  if (a && D.length < E) {
    const S = E - D.length;
    for (let P = 0; P < S; P++) {
      const R = d(D[D.length - 1], 1);
      D.push(R);
    }
  }
  return D;
}
function lb(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function cb(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function _a(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let l = o || s || i;
  const { differenceInCalendarMonths: d, addMonths: c, startOfMonth: m } = r;
  if (n && d(n, l) < a - 1) {
    const f = -1 * (a - 1);
    l = c(n, f);
  }
  return t && d(l, t) < 0 && (l = t), m(l);
}
function ub(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: l, getISOWeek: d, getWeek: c, startOfBroadcastWeek: m, startOfISOWeek: f, startOfWeek: p } = r, b = e.reduce((h, g) => {
    const y = n.broadcastCalendar ? m(g, r) : n.ISOWeek ? f(g) : p(g), v = n.broadcastCalendar ? s(g) : n.ISOWeek ? i(a(g)) : l(a(g)), x = t.filter((k) => k >= y && k <= v), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < M) {
      const k = t.filter((D) => {
        const N = M - x.length;
        return D > v && D <= o(v, N);
      });
      x.push(...k);
    }
    const w = x.reduce((k, D) => {
      const N = n.ISOWeek ? d(D) : c(D), E = k.find((P) => P.weekNumber === N), S = new wc(D, g, r);
      return E ? E.days.push(S) : k.push(new eg(N, [S])), k;
    }, []), T = new Jh(g, w);
    return h.push(T), h;
  }, []);
  return n.reverseMonths ? b.reverse() : b;
}
function db(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: l, endOfYear: d, newDate: c, today: m } = t, { fromYear: f, toYear: p, fromMonth: b, toMonth: h } = e;
  !n && b && (n = b), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = c(p, 11, 31));
  const g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = c(f, 0, 1) : !n && g && (n = o(l(e.today ?? m(), -100))), r ? r = a(r) : p ? r = c(p, 11, 31) : !r && g && (r = d(e.today ?? m())), [
    n && s(n),
    r && s(r)
  ];
}
function mb(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, d = o ? s : 1, c = i(e);
  if (!t)
    return a(c, d);
  if (!(l(t, e) < s))
    return a(c, d);
}
function fb(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, d = o ? s ?? 1 : 1, c = i(e);
  if (!t)
    return a(c, -d);
  if (!(l(c, t) <= 0))
    return a(c, -d);
}
function pb(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Do(e, t) {
  const [n, r] = j(e);
  return [t === void 0 ? n : t, r];
}
function hb(e, t) {
  const [n, r] = db(e, t), { startOfMonth: o, endOfMonth: s } = t, i = _a(e, n, r, t), [a, l] = Do(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  G(() => {
    const T = _a(e, n, r, t);
    l(T);
  }, [e.timeZone]);
  const d = cb(a, r, e, t), c = ab(d, e.endMonth ? s(e.endMonth) : void 0, e, t), m = ub(d, c, e, t), f = pb(m), p = lb(m), b = fb(a, n, e, t), h = mb(a, r, e, t), { disableNavigation: g, onMonthChange: y } = e, v = (T) => f.some((k) => k.days.some((D) => D.isEqualTo(T))), x = (T) => {
    if (g)
      return;
    let k = o(T);
    n && k < o(n) && (k = o(n)), r && k > o(r) && (k = o(r)), l(k), y?.(k);
  };
  return {
    months: m,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: b,
    nextMonth: h,
    goToMonth: x,
    goToDay: (T) => {
      v(T) || x(T.date);
    }
  };
}
var dt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(dt || (dt = {}));
function Ba(e) {
  return !e[Ce.disabled] && !e[Ce.hidden] && !e[Ce.outside];
}
function gb(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    Ba(a) && (a[Ce.focused] && s < dt.FocusedModifier ? (o = i, s = dt.FocusedModifier) : r?.isEqualTo(i) && s < dt.LastFocused ? (o = i, s = dt.LastFocused) : n(i.date) && s < dt.Selected ? (o = i, s = dt.Selected) : a[Ce.today] && s < dt.Today && (o = i, s = dt.Today));
  }
  return o || (o = e.find((i) => Ba(t(i)))), o;
}
function bb(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: l } = s, { addDays: d, addMonths: c, addWeeks: m, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: b, endOfWeek: h, max: g, min: y, startOfBroadcastWeek: v, startOfISOWeek: x, startOfWeek: M } = i;
  let T = {
    day: d,
    week: m,
    month: c,
    year: f,
    startOfWeek: (k) => l ? v(k, i) : a ? x(k) : M(k),
    endOfWeek: (k) => l ? p(k) : a ? b(k) : h(k)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? T = g([r, T]) : t === "after" && o && (T = y([o, T])), T;
}
function Ic(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const l = bb(e, t, n.date, r, o, s, i), d = !!(s.disabled && Mt(l, s.disabled, i)), c = !!(s.hidden && Mt(l, s.hidden, i)), m = l, f = new wc(l, m, i);
  return !d && !c ? f : Ic(e, t, f, r, o, s, i, a + 1);
}
function vb(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = j(), l = gb(t.days, n, r || (() => !1), i), [d, c] = j(s ? l : void 0);
  return {
    isFocusTarget: (h) => !!l?.isEqualTo(h),
    setFocused: c,
    focused: d,
    blur: () => {
      a(d), c(void 0);
    },
    moveFocus: (h, g) => {
      if (!d)
        return;
      const y = Ic(h, g, d, t.navStart, t.navEnd, e, o);
      y && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(y)) || (t.goToDay(y), c(y)));
    }
  };
}
function Nb(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Do(n, o ? n : void 0), a = o ? n : s, { isSameDay: l } = t, d = (p) => a?.some((b) => l(b, p)) ?? !1, { min: c, max: m } = e;
  return {
    selected: a,
    select: (p, b, h) => {
      let g = [...a ?? []];
      if (d(p)) {
        if (a?.length === c || r && a?.length === 1)
          return;
        g = a?.filter((y) => !l(y, p));
      } else
        a?.length === m ? g = [p] : g = [...g, p];
      return o || i(g), o?.(g, p, b, h), g;
    },
    isSelected: d
  };
}
function yb(e, t, n = 0, r = 0, o = !1, s = vt) {
  const { from: i, to: a } = t || {}, { isSameDay: l, isAfter: d, isBefore: c } = s;
  let m;
  if (!i && !a)
    m = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !a)
    l(i, e) ? n === 0 ? m = { from: i, to: e } : o ? m = { from: i, to: void 0 } : m = void 0 : c(e, i) ? m = { from: e, to: i } : m = { from: i, to: e };
  else if (i && a)
    if (l(i, e) && l(a, e))
      o ? m = { from: i, to: a } : m = void 0;
    else if (l(i, e))
      m = { from: i, to: n > 0 ? void 0 : e };
    else if (l(a, e))
      m = { from: e, to: n > 0 ? void 0 : e };
    else if (c(e, i))
      m = { from: e, to: a };
    else if (d(e, i))
      m = { from: i, to: e };
    else if (d(e, a))
      m = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (m?.from && m?.to) {
    const f = s.differenceInCalendarDays(m.to, m.from);
    r > 0 && f > r ? m = { from: e, to: void 0 } : n > 1 && f < n && (m = { from: e, to: void 0 });
  }
  return m;
}
function xb(e, t, n = vt) {
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
function $a(e, t, n = vt) {
  return St(e, t.from, !1, n) || St(e, t.to, !1, n) || St(t, e.from, !1, n) || St(t, e.to, !1, n);
}
function wb(e, t, n = vt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? St(e, a, !1, n) : Mc(a, n) ? a.some((l) => St(e, l, !1, n)) : Si(a) ? a.from && a.to ? $a(e, { from: a.from, to: a.to }, n) : !1 : Sc(a) ? xb(e, a.dayOfWeek, n) : Cc(a) ? n.isAfter(a.before, a.after) ? $a(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : Mt(e.from, a, n) || Mt(e.to, a, n) : Tc(a) || Ec(a) ? Mt(e.from, a, n) || Mt(e.to, a, n) : !1))
    return !0;
  const i = r.filter((a) => typeof a == "function");
  if (i.length) {
    let a = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let d = 0; d <= l; d++) {
      if (i.some((c) => c(a)))
        return !0;
      a = n.addDays(a, 1);
    }
  }
  return !1;
}
function kb(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, l] = Do(o, i ? o : void 0), d = i ? o : a;
  return {
    selected: d,
    select: (f, p, b) => {
      const { min: h, max: g } = e, y = f ? yb(f, d, h, g, s, t) : void 0;
      return r && n && y?.from && y.to && wb({ from: y.from, to: y.to }, n, t) && (y.from = f, y.to = void 0), i || l(y), i?.(y, f, p, b), y;
    },
    isSelected: (f) => d && St(d, f, !1, t)
  };
}
function Cb(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Do(n, o ? n : void 0), a = o ? n : s, { isSameDay: l } = t;
  return {
    selected: a,
    select: (m, f, p) => {
      let b = m;
      return !r && a && a && l(m, a) && (b = void 0), o || i(b), o?.(b, m, f, p), b;
    },
    isSelected: (m) => a ? l(a, m) : !1
  };
}
function Tb(e, t) {
  const n = Cb(e, t), r = Nb(e, t), o = kb(e, t);
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
function Eb(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Be(t.today, t.timeZone)), t.month && (t.month = new Be(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Be(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Be(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Be(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Be(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ce) => new Be(ce, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Be(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Be(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = tn(() => {
    const ce = { ...Ei, ...t.locale };
    return {
      dateLib: new Ze({
        locale: ce,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Rg(t.components),
      formatters: zg(t.formatters),
      labels: { ...nb, ...t.labels },
      locale: ce,
      classNames: { ...Mi(), ...t.classNames }
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
  ]), { captionLayout: l, mode: d, navLayout: c, numberOfMonths: m = 1, onDayBlur: f, onDayClick: p, onDayFocus: b, onDayKeyDown: h, onDayMouseEnter: g, onDayMouseLeave: y, onNextClick: v, onPrevClick: x, showWeekNumber: M, styles: w } = t, { formatCaption: T, formatDay: k, formatMonthDropdown: D, formatWeekNumber: N, formatWeekNumberHeader: E, formatWeekdayName: S, formatYearDropdown: P } = r, R = hb(t, s), { days: I, months: B, navStart: H, navEnd: K, previousMonth: A, nextMonth: $, goToMonth: Q } = R, se = Mg(I, t, H, K, s), { isSelected: ie, select: re, selected: oe } = Tb(t, s) ?? {}, { blur: O, focused: U, isFocusTarget: Y, moveFocus: te, setFocused: ve } = vb(t, R, se, ie ?? (() => !1), s), { labelDayButton: we, labelGridcell: Te, labelGrid: Ie, labelMonthDropdown: Je, labelNav: It, labelPrevious: Vn, labelNext: Kn, labelWeekday: Ar, labelWeekNumber: Pr, labelWeekNumberHeader: Ir, labelYearDropdown: Lr } = o, cn = tn(() => Ug(s, t.ISOWeek), [s, t.ISOWeek]), qn = d !== void 0 || p !== void 0, un = z(() => {
    A && (Q(A), x?.(A));
  }, [A, Q, x]), dn = z(() => {
    $ && (Q($), v?.($));
  }, [Q, $, v]), Or = z((ce, fe) => (ne) => {
    ne.preventDefault(), ne.stopPropagation(), ve(ce), re?.(ce.date, fe, ne), p?.(ce.date, fe, ne);
  }, [re, p, ve]), jo = z((ce, fe) => (ne) => {
    ve(ce), b?.(ce.date, fe, ne);
  }, [b, ve]), Vo = z((ce, fe) => (ne) => {
    O(), f?.(ce.date, fe, ne);
  }, [O, f]), Ko = z((ce, fe) => (ne) => {
    const he = {
      ArrowLeft: [
        ne.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        ne.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [ne.shiftKey ? "year" : "week", "after"],
      ArrowUp: [ne.shiftKey ? "year" : "week", "before"],
      PageUp: [ne.shiftKey ? "year" : "month", "before"],
      PageDown: [ne.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (he[ne.key]) {
      ne.preventDefault(), ne.stopPropagation();
      const [ze, pe] = he[ne.key];
      te(ze, pe);
    }
    h?.(ce.date, fe, ne);
  }, [te, h, t.dir]), qo = z((ce, fe) => (ne) => {
    g?.(ce.date, fe, ne);
  }, [g]), yt = z((ce, fe) => (ne) => {
    y?.(ce.date, fe, ne);
  }, [y]), mn = z((ce) => (fe) => {
    const ne = Number(fe.target.value), he = s.setMonth(s.startOfMonth(ce), ne);
    Q(he);
  }, [s, Q]), fn = z((ce) => (fe) => {
    const ne = Number(fe.target.value), he = s.setYear(s.startOfMonth(ce), ne);
    Q(he);
  }, [s, Q]), { className: Go, style: et } = tn(() => ({
    className: [a[J.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[J.Root], ...t.style }
  }), [a, t.className, t.style, w]), Lt = Ag(t), _r = V(null);
  ib(_r, !!t.animate, {
    classNames: a,
    months: B,
    focused: U,
    dateLib: s
  });
  const Br = {
    dayPickerProps: t,
    selected: oe,
    select: re,
    isSelected: ie,
    months: B,
    nextMonth: $,
    previousMonth: A,
    goToMonth: Q,
    getModifiers: se,
    components: n,
    classNames: a,
    styles: w,
    labels: o,
    formatters: r
  };
  return q.createElement(
    kc.Provider,
    { value: Br },
    q.createElement(
      n.Root,
      { rootRef: t.animate ? _r : void 0, className: Go, style: et, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Lt },
      q.createElement(
        n.Months,
        { className: a[J.Months], style: w?.[J.Months] },
        !t.hideNavigation && !c && q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[J.Nav], style: w?.[J.Nav], "aria-label": It(), onPreviousClick: un, onNextClick: dn, previousMonth: A, nextMonth: $ }),
        B.map((ce, fe) => q.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[J.Month],
            style: w?.[J.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: fe,
            displayIndex: fe,
            calendarMonth: ce
          },
          c === "around" && !t.hideNavigation && fe === 0 && q.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[J.PreviousMonthButton], tabIndex: A ? void 0 : -1, "aria-disabled": A ? void 0 : !0, "aria-label": Vn(A), onClick: un, "data-animated-button": t.animate ? "true" : void 0 },
            q.createElement(n.Chevron, { disabled: A ? void 0 : !0, className: a[J.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          q.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[J.MonthCaption], style: w?.[J.MonthCaption], calendarMonth: ce, displayIndex: fe }, l?.startsWith("dropdown") ? q.createElement(
            n.DropdownNav,
            { className: a[J.Dropdowns], style: w?.[J.Dropdowns] },
            (() => {
              const ne = l === "dropdown" || l === "dropdown-months" ? q.createElement(n.MonthsDropdown, { key: "month", className: a[J.MonthsDropdown], "aria-label": Je(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: mn(ce.date), options: Hg(ce.date, H, K, r, s), style: w?.[J.Dropdown], value: s.getMonth(ce.date) }) : q.createElement("span", { key: "month" }, D(ce.date, s)), he = l === "dropdown" || l === "dropdown-years" ? q.createElement(n.YearsDropdown, { key: "year", className: a[J.YearsDropdown], "aria-label": Lr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: fn(ce.date), options: Yg(H, K, r, s, !!t.reverseYears), style: w?.[J.Dropdown], value: s.getYear(ce.date) }) : q.createElement("span", { key: "year" }, P(ce.date, s));
              return s.getMonthYearOrder() === "year-first" ? [he, ne] : [ne, he];
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
            } }, T(ce.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            q.createElement(n.CaptionLabel, { className: a[J.CaptionLabel], role: "status", "aria-live": "polite" }, T(ce.date, s.options, s))
          )),
          c === "around" && !t.hideNavigation && fe === m - 1 && q.createElement(
            n.NextMonthButton,
            { type: "button", className: a[J.NextMonthButton], tabIndex: $ ? void 0 : -1, "aria-disabled": $ ? void 0 : !0, "aria-label": Kn($), onClick: dn, "data-animated-button": t.animate ? "true" : void 0 },
            q.createElement(n.Chevron, { disabled: $ ? void 0 : !0, className: a[J.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          fe === m - 1 && c === "after" && !t.hideNavigation && q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[J.Nav], style: w?.[J.Nav], "aria-label": It(), onPreviousClick: un, onNextClick: dn, previousMonth: A, nextMonth: $ }),
          q.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": Ie(ce.date, s.options, s) || void 0, className: a[J.MonthGrid], style: w?.[J.MonthGrid] },
            !t.hideWeekdays && q.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[J.Weekdays], style: w?.[J.Weekdays] },
              M && q.createElement(n.WeekNumberHeader, { "aria-label": Ir(s.options), className: a[J.WeekNumberHeader], style: w?.[J.WeekNumberHeader], scope: "col" }, E()),
              cn.map((ne) => q.createElement(n.Weekday, { "aria-label": Ar(ne, s.options, s), className: a[J.Weekday], key: String(ne), style: w?.[J.Weekday], scope: "col" }, S(ne, s.options, s)))
            ),
            q.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[J.Weeks], style: w?.[J.Weeks] }, ce.weeks.map((ne) => q.createElement(
              n.Week,
              { className: a[J.Week], key: ne.weekNumber, style: w?.[J.Week], week: ne },
              M && // biome-ignore lint/a11y/useSemanticElements: react component
              q.createElement(n.WeekNumber, { week: ne, style: w?.[J.WeekNumber], "aria-label": Pr(ne.weekNumber, {
                locale: i
              }), className: a[J.WeekNumber], scope: "row", role: "rowheader" }, N(ne.weekNumber, s)),
              ne.days.map((he) => {
                const { date: ze } = he, pe = se(he);
                if (pe[Ce.focused] = !pe.hidden && !!U?.isEqualTo(he), pe[it.selected] = ie?.(ze) || pe.selected, Si(oe)) {
                  const { from: Gn, to: tt } = oe;
                  pe[it.range_start] = !!(Gn && tt && s.isSameDay(ze, Gn)), pe[it.range_end] = !!(Gn && tt && s.isSameDay(ze, tt)), pe[it.range_middle] = St(oe, ze, !0, s);
                }
                const pn = Fg(pe, w, t.modifiersStyles), He = Dg(pe, a, t.modifiersClassNames), hn = !qn && !pe.hidden ? Te(ze, pe, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  q.createElement(n.Day, { key: `${s.format(ze, "yyyy-MM-dd")}_${s.format(he.displayMonth, "yyyy-MM")}`, day: he, modifiers: pe, className: He.join(" "), style: pn, role: "gridcell", "aria-selected": pe.selected || void 0, "aria-label": hn, "data-day": s.format(ze, "yyyy-MM-dd"), "data-month": he.outside ? s.format(ze, "yyyy-MM") : void 0, "data-selected": pe.selected || void 0, "data-disabled": pe.disabled || void 0, "data-hidden": pe.hidden || void 0, "data-outside": he.outside || void 0, "data-focused": pe.focused || void 0, "data-today": pe.today || void 0 }, !pe.hidden && qn ? q.createElement(n.DayButton, { className: a[J.DayButton], style: w?.[J.DayButton], type: "button", day: he, modifiers: pe, disabled: pe.disabled || void 0, tabIndex: Y(he) ? 0 : -1, "aria-label": we(ze, pe, s.options, s), onClick: Or(he, pe), onBlur: Vo(he, pe), onFocus: jo(he, pe), onKeyDown: Ko(he, pe), onMouseEnter: qo(he, pe), onMouseLeave: yt(he, pe) }, k(ze, s.options, s)) : !pe.hidden && k(he.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      q.createElement(n.Footer, { className: a[J.Footer], style: w?.[J.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Lc(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Lc(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Oc() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Lc(e)) && (r && (r += " "), r += t);
  return r;
}
const Di = "-", Sb = (e) => {
  const t = Db(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(Di);
      return a[0] === "" && a.length !== 1 && a.shift(), _c(a, t) || Mb(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const l = n[i] || [];
      return a && r[i] ? [...l, ...r[i]] : l;
    }
  };
}, _c = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? _c(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Di);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Wa = /^\[(.+)\]$/, Mb = (e) => {
  if (Wa.test(e)) {
    const t = Wa.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Db = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    $s(n[o], r, o, t);
  return r;
}, $s = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : za(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Rb(o)) {
        $s(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      $s(i, za(t, s), n, r);
    });
  });
}, za = (e, t) => {
  let n = e;
  return t.split(Di).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Rb = (e) => e.isThemeGetter, Ab = (e) => {
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
}, Ws = "!", zs = ":", Pb = zs.length, Ib = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let i = 0, a = 0, l = 0, d;
    for (let b = 0; b < o.length; b++) {
      let h = o[b];
      if (i === 0 && a === 0) {
        if (h === zs) {
          s.push(o.slice(l, b)), l = b + Pb;
          continue;
        }
        if (h === "/") {
          d = b;
          continue;
        }
      }
      h === "[" ? i++ : h === "]" ? i-- : h === "(" ? a++ : h === ")" && a--;
    }
    const c = s.length === 0 ? o : o.substring(l), m = Lb(c), f = m !== c, p = d && d > l ? d - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: m,
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
}, Lb = (e) => e.endsWith(Ws) ? e.substring(0, e.length - 1) : e.startsWith(Ws) ? e.substring(1) : e, Ob = (e) => {
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
}, _b = (e) => ({
  cache: Ab(e.cacheSize),
  parseClassName: Ib(e),
  sortModifiers: Ob(e),
  ...Sb(e)
}), Bb = /\s+/, $b = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(Bb);
  let l = "";
  for (let d = a.length - 1; d >= 0; d -= 1) {
    const c = a[d], {
      isExternal: m,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: b,
      maybePostfixModifierPosition: h
    } = n(c);
    if (m) {
      l = c + (l.length > 0 ? " " + l : l);
      continue;
    }
    let g = !!h, y = r(g ? b.substring(0, h) : b);
    if (!y) {
      if (!g) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (y = r(b), !y) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      g = !1;
    }
    const v = s(f).join(":"), x = p ? v + Ws : v, M = x + y;
    if (i.includes(M))
      continue;
    i.push(M);
    const w = o(y, g);
    for (let T = 0; T < w.length; ++T) {
      const k = w[T];
      i.push(x + k);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Wb() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Bc(t)) && (r && (r += " "), r += n);
  return r;
}
const Bc = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Bc(e[r])) && (n && (n += " "), n += t);
  return n;
};
function zb(e, ...t) {
  let n, r, o, s = i;
  function i(l) {
    const d = t.reduce((c, m) => m(c), e());
    return n = _b(d), r = n.cache.get, o = n.cache.set, s = a, a(l);
  }
  function a(l) {
    const d = r(l);
    if (d)
      return d;
    const c = $b(l, n);
    return o(l, c), c;
  }
  return function() {
    return s(Wb.apply(null, arguments));
  };
}
const De = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, $c = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Wc = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Hb = /^\d+\/\d+$/, Fb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ub = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Yb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, jb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Vb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, vn = (e) => Hb.test(e), me = (e) => !!e && !Number.isNaN(Number(e)), Bt = (e) => !!e && Number.isInteger(Number(e)), ms = (e) => e.endsWith("%") && me(e.slice(0, -1)), kt = (e) => Fb.test(e), Kb = () => !0, qb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ub.test(e) && !Yb.test(e)
), zc = () => !1, Gb = (e) => jb.test(e), Zb = (e) => Vb.test(e), Xb = (e) => !Z(e) && !X(e), Qb = (e) => Hn(e, Uc, zc), Z = (e) => $c.test(e), Gt = (e) => Hn(e, Yc, qb), fs = (e) => Hn(e, rv, me), Ha = (e) => Hn(e, Hc, zc), Jb = (e) => Hn(e, Fc, Zb), Fr = (e) => Hn(e, jc, Gb), X = (e) => Wc.test(e), tr = (e) => Fn(e, Yc), ev = (e) => Fn(e, ov), Fa = (e) => Fn(e, Hc), tv = (e) => Fn(e, Uc), nv = (e) => Fn(e, Fc), Ur = (e) => Fn(e, jc, !0), Hn = (e, t, n) => {
  const r = $c.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Fn = (e, t, n = !1) => {
  const r = Wc.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Hc = (e) => e === "position" || e === "percentage", Fc = (e) => e === "image" || e === "url", Uc = (e) => e === "length" || e === "size" || e === "bg-size", Yc = (e) => e === "length", rv = (e) => e === "number", ov = (e) => e === "family-name", jc = (e) => e === "shadow", sv = () => {
  const e = De("color"), t = De("font"), n = De("text"), r = De("font-weight"), o = De("tracking"), s = De("leading"), i = De("breakpoint"), a = De("container"), l = De("spacing"), d = De("radius"), c = De("shadow"), m = De("inset-shadow"), f = De("text-shadow"), p = De("drop-shadow"), b = De("blur"), h = De("perspective"), g = De("aspect"), y = De("ease"), v = De("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], M = () => [
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
  ], w = () => [...M(), X, Z], T = () => ["auto", "hidden", "clip", "visible", "scroll"], k = () => ["auto", "contain", "none"], D = () => [X, Z, l], N = () => [vn, "full", "auto", ...D()], E = () => [Bt, "none", "subgrid", X, Z], S = () => ["auto", {
    span: ["full", Bt, X, Z]
  }, Bt, X, Z], P = () => [Bt, "auto", X, Z], R = () => ["auto", "min", "max", "fr", X, Z], I = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], B = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], H = () => ["auto", ...D()], K = () => [vn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...D()], A = () => [e, X, Z], $ = () => [...M(), Fa, Ha, {
    position: [X, Z]
  }], Q = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], se = () => ["auto", "cover", "contain", tv, Qb, {
    size: [X, Z]
  }], ie = () => [ms, tr, Gt], re = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    X,
    Z
  ], oe = () => ["", me, tr, Gt], O = () => ["solid", "dashed", "dotted", "double"], U = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => [me, ms, Fa, Ha], te = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    b,
    X,
    Z
  ], ve = () => ["none", me, X, Z], we = () => ["none", me, X, Z], Te = () => [me, X, Z], Ie = () => [vn, "full", ...D()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [kt],
      breakpoint: [kt],
      color: [Kb],
      container: [kt],
      "drop-shadow": [kt],
      ease: ["in", "out", "in-out"],
      font: [Xb],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [kt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [kt],
      shadow: [kt],
      spacing: ["px", me],
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
        aspect: ["auto", "square", vn, Z, X, g]
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
        columns: [me, Z, X, a]
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
        overflow: T()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": T()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": T()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: k()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": k()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": k()
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
        inset: N()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": N()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": N()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: N()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: N()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: N()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: N()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: N()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: N()
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
        basis: [vn, "full", "auto", a, ...D()]
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
        flex: [me, vn, "auto", "initial", "none", Z]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", me, X, Z]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", me, X, Z]
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
        "grid-cols": E()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: S()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": P()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": P()
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
        row: S()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": P()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": P()
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
        "auto-cols": R()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": R()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: D()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": D()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": D()
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
        "justify-items": [...B(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...B()]
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
        items: [...B(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...B(), {
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
        "place-items": [...B(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...B()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: D()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: D()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: D()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: D()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: D()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: D()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: D()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: D()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: D()
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
        "space-x": D()
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
        "space-y": D()
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
        w: [a, "screen", ...K()]
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
          ...K()
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
        text: ["base", n, tr, Gt]
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
        font: [r, X, fs]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ms, Z]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ev, Z, t]
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
        "line-clamp": [me, "none", X, fs]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...D()
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
        placeholder: A()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: A()
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
        decoration: [...O(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [me, "from-font", "auto", X, Gt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: A()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [me, "auto", X, Z]
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
        indent: D()
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
        bg: $()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Q()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: se()
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
        }, nv, Jb]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: A()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ie()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ie()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ie()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: A()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: A()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: A()
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
        border: oe()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": oe()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": oe()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": oe()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": oe()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": oe()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": oe()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": oe()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": oe()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": oe()
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
        "divide-y": oe()
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
        border: [...O(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...O(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: A()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": A()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": A()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": A()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": A()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": A()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": A()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": A()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": A()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: A()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...O(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [me, X, Z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", me, tr, Gt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: A()
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
        shadow: A()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", m, Ur, Fr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": A()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: oe()
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
        ring: A()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [me, Gt]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": A()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": oe()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": A()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", f, Ur, Fr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": A()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [me, X, Z]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...U(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": U()
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
        "mask-linear-from": Y()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Y()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": A()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": A()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Y()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Y()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": A()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": A()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Y()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Y()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": A()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": A()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Y()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Y()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": A()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": A()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Y()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Y()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": A()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": A()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Y()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Y()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": A()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": A()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Y()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Y()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": A()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": A()
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
        "mask-radial-from": A()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": A()
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
        "mask-conic-from": Y()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Y()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": A()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": A()
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
        mask: $()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Q()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: se()
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
        blur: te()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [me, X, Z]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [me, X, Z]
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
          Ur,
          Fr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": A()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", me, X, Z]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [me, X, Z]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", me, X, Z]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [me, X, Z]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", me, X, Z]
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
        "backdrop-blur": te()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [me, X, Z]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [me, X, Z]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", me, X, Z]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [me, X, Z]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", me, X, Z]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [me, X, Z]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [me, X, Z]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", me, X, Z]
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
        "border-spacing": D()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": D()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": D()
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
        duration: [me, "initial", X, Z]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", y, X, Z]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [me, X, Z]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, X, Z]
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
        perspective: [h, X, Z]
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
        rotate: ve()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ve()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ve()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ve()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: we()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": we()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": we()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": we()
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
        skew: Te()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Te()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Te()
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
        translate: Ie()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Ie()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Ie()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Ie()
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
        accent: A()
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
        caret: A()
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
        "scroll-m": D()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": D()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": D()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": D()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": D()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": D()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": D()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": D()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": D()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": D()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": D()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": D()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": D()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": D()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": D()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": D()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": D()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": D()
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
        fill: ["none", ...A()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [me, tr, Gt, fs]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...A()]
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
}, iv = /* @__PURE__ */ zb(sv);
function le(...e) {
  return iv(Oc(e));
}
function Ua(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Ro(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Ua(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Ua(e[o], null);
        }
      };
  };
}
function $e(...e) {
  return C.useCallback(Ro(...e), e);
}
// @__NO_SIDE_EFFECTS__
function hr(e) {
  const t = /* @__PURE__ */ lv(e), n = C.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = C.Children.toArray(s), l = a.find(uv);
    if (l) {
      const d = l.props.children, c = a.map((m) => m === l ? C.Children.count(d) > 1 ? C.Children.only(null) : C.isValidElement(d) ? d.props.children : null : m);
      return /* @__PURE__ */ W(t, { ...i, ref: o, children: C.isValidElement(d) ? C.cloneElement(d, void 0, c) : null });
    }
    return /* @__PURE__ */ W(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var av = /* @__PURE__ */ hr("Slot");
// @__NO_SIDE_EFFECTS__
function lv(e) {
  const t = C.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (C.isValidElement(o)) {
      const i = mv(o), a = dv(s, o.props);
      return o.type !== C.Fragment && (a.ref = r ? Ro(r, i) : i), C.cloneElement(o, a);
    }
    return C.Children.count(o) > 1 ? C.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Vc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function cv(e) {
  const t = ({ children: n }) => /* @__PURE__ */ W(Uf, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Vc, t;
}
function uv(e) {
  return C.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Vc;
}
function dv(e, t) {
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
function mv(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const Ya = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ja = Oc, fv = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return ja(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((d) => {
    const c = n?.[d], m = s?.[d];
    if (c === null) return null;
    const f = Ya(c) || Ya(m);
    return o[d][f];
  }), a = n && Object.entries(n).reduce((d, c) => {
    let [m, f] = c;
    return f === void 0 || (d[m] = f), d;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((d, c) => {
    let { class: m, className: f, ...p } = c;
    return Object.entries(p).every((b) => {
      let [h, g] = b;
      return Array.isArray(g) ? g.includes({
        ...s,
        ...a
      }[h]) : {
        ...s,
        ...a
      }[h] === g;
    }) ? [
      ...d,
      m,
      f
    ] : d;
  }, []);
  return ja(e, i, l, n?.class, n?.className);
}, Hs = fv(
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
function zt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ u(
    r ? av : "button",
    {
      "data-slot": "button",
      className: le(Hs({ variant: t, size: n, className: e })),
      ...o
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/ui/button.tsx",
      lineNumber: 52,
      columnNumber: 5
    },
    this
  );
}
function pv({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const l = Mi();
  return /* @__PURE__ */ u(
    Eb,
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
        formatMonthDropdown: (d) => d.toLocaleString("default", { month: "short" }),
        ...s
      },
      classNames: {
        root: le("w-fit", l.root),
        months: le(
          "flex gap-4 flex-col md:flex-row relative",
          l.months
        ),
        month: le("flex flex-col w-full gap-4", l.month),
        nav: le(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          l.nav
        ),
        button_previous: le(
          Hs({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: le(
          Hs({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_next
        ),
        month_caption: le(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: le(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          l.dropdowns
        ),
        dropdown_root: le(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          l.dropdown_root
        ),
        dropdown: le(
          "absolute bg-popover inset-0 opacity-0",
          l.dropdown
        ),
        caption_label: le(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: le("flex", l.weekdays),
        weekday: le(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          l.weekday
        ),
        week: le("flex w-full mt-2", l.week),
        week_number_header: le(
          "select-none w-(--cell-size)",
          l.week_number_header
        ),
        week_number: le(
          "text-[0.8rem] select-none text-muted-foreground",
          l.week_number
        ),
        day: le(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          l.day
        ),
        range_start: le(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: le("rounded-none", l.range_middle),
        range_end: le("rounded-r-md bg-accent", l.range_end),
        today: le(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          l.today
        ),
        outside: le(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: le(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: le("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: d, rootRef: c, ...m }) => /* @__PURE__ */ u(
          "div",
          {
            "data-slot": "calendar",
            ref: c,
            className: le(d),
            ...m
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/ui/calendar.tsx",
            lineNumber: 128,
            columnNumber: 13
          },
          this
        ),
        Chevron: ({ className: d, orientation: c, ...m }) => c === "left" ? /* @__PURE__ */ u(nf, { className: le("size-4", d), ...m }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/ui/calendar.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this) : c === "right" ? /* @__PURE__ */ u(
          rf,
          {
            className: le("size-4", d),
            ...m
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/ui/calendar.tsx",
            lineNumber: 145,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ u(of, { className: le("size-4", d), ...m }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/ui/calendar.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this),
        DayButton: hv,
        WeekNumber: ({ children: d, ...c }) => /* @__PURE__ */ u("td", { ...c, children: /* @__PURE__ */ u("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: d }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/ui/calendar.tsx",
          lineNumber: 160,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/ui/calendar.tsx",
          lineNumber: 159,
          columnNumber: 13
        }, this),
        ...i
      },
      ...a
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/ui/calendar.tsx",
      lineNumber: 27,
      columnNumber: 5
    },
    this
  );
}
function hv({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Mi(), s = C.useRef(null);
  return C.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ u(
    zt,
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
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/ui/calendar.tsx",
      lineNumber: 187,
      columnNumber: 5
    },
    this
  );
}
let En = null;
const Kc = /* @__PURE__ */ new Map(), gv = /* @__PURE__ */ new Map();
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
function bv(e) {
  return En?.pillDate === e;
}
function vv({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = V(null), i = Ao(e);
  G(() => {
    const v = (x) => {
      x.key === "Escape" && (x.stopPropagation(), x.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), G(() => {
    const v = (M) => {
      s.current && !s.current.contains(M.target) && (M.target.closest(".date-pill") || o());
    }, x = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(x), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const a = z((v) => {
    v && r(Mn(v)), o();
  }, [r, o]), l = z((v) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + v), r(Mn(x)), o();
  }, [r, o]), d = z(() => {
    const x = (/* @__PURE__ */ new Date()).getDay(), M = x === 0 ? 1 : 8 - x, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + M), r(Mn(w)), o();
  }, [r, o]), c = /* @__PURE__ */ new Date(), m = c.toDateString(), f = new Date(c);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), b = c.getDay(), h = b === 0 ? 1 : 8 - b, g = new Date(c);
  g.setDate(g.getDate() + h);
  const y = g.toDateString();
  return /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
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
            fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 180,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ u("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ u("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ u("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ u(
            pv,
            {
              mode: "single",
              selected: i,
              onSelect: a
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
              lineNumber: 197,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 196,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u("div", { className: "border-t border-border" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 203,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ u(
              zt,
              {
                variant: "outline",
                size: "sm",
                className: le(
                  "rounded-full text-xs",
                  i.toDateString() === m && "ring-2 ring-primary"
                ),
                onClick: () => l(0),
                children: "Today"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 205,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ u(
              zt,
              {
                variant: "outline",
                size: "sm",
                className: le(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => l(1),
                children: "Tomorrow"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 216,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ u(
              zt,
              {
                variant: "outline",
                size: "sm",
                className: le(
                  "rounded-full text-xs",
                  i.toDateString() === y && "ring-2 ring-primary"
                ),
                onClick: d,
                children: "Next Monday"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 227,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 195,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 194,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 163,
      columnNumber: 5
    },
    this
  );
}
function Nv(e, t, n) {
  if (bv(t)) {
    ro();
    return;
  }
  ro();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, l = 10, d = 16, c = s - r.bottom - l - d, m = r.top - l - d, f = c >= a ? "below" : m >= a ? "above" : c >= m ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + l : p = r.top - a - l;
  const b = r.left + r.width / 2;
  let h = b - i / 2;
  h + i > o - d && (h = o - i - d), h < d && (h = d);
  const g = document.createElement("div");
  g.setAttribute("data-date-picker-standalone", t), g.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(g), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    g.addEventListener(w, (T) => {
      T.stopPropagation();
    }, !1);
  });
  const v = Ff(g);
  En = { container: g, root: v, pillDate: t };
  const x = () => {
    ro();
  }, M = (w) => {
    const T = Kc.get(t);
    T && T(w);
  };
  v.render(
    /* @__PURE__ */ u(
      vv,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: h, direction: f, pillCenter: b },
        onSelectDate: M,
        onClose: x
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
        lineNumber: 327,
        columnNumber: 5
      },
      this
    )
  );
}
function yv({ node: e, updateAttributes: t, selected: n }) {
  const r = V(null), o = e.attrs.date || Sn(), s = qc(o), i = Ri(o), a = z(() => {
    if (!r.current) return "";
    const l = r.current.closest(".markdown-editor-container");
    if (l) {
      const c = l.getAttribute("data-theme");
      if (c) return c;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return G(() => (Kc.set(o, (l) => {
    t({ date: l });
  }), gv.set(o, a), () => {
  }), [o, t, a]), G(() => {
    const l = r.current;
    if (!l) return;
    const d = (c) => {
      c.preventDefault(), c.stopPropagation();
      const m = l.getAttribute("data-date") || Sn(), f = a();
      Nv(l, m, f);
    };
    return l.addEventListener("click", d), () => l.removeEventListener("click", d);
  }, [a]), G(() => {
    const l = r.current?.closest(".ProseMirror") || document, d = () => {
      En && ro();
    };
    return l.addEventListener("scroll", d, { passive: !0 }), () => {
      l.removeEventListener("scroll", d);
    };
  }, []), /* @__PURE__ */ u(xr, { as: "span", className: "inline", children: /* @__PURE__ */ u(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ u(Vl, { size: 14, className: "date-icon" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 410,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ u("span", { className: "date-text", children: s }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 411,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 403,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/editor/DatePillComponent.tsx",
    lineNumber: 402,
    columnNumber: 5
  }, this);
}
function Ao(e) {
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
function dr(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function Mn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function qc(e) {
  const t = Ao(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  o.setDate(o.getDate() + 1);
  const s = new Date(r);
  s.setDate(s.getDate() - 1);
  const i = r.getDay(), a = i === 0 ? 1 : 8 - i, l = new Date(r);
  if (l.setDate(l.getDate() + a), t.getTime() === r.getTime()) return "Today";
  if (t.getTime() === o.getTime()) return "Tomorrow";
  if (t.getTime() === s.getTime()) return "Yesterday";
  if (t.getTime() === l.getTime()) return "Next Monday";
  const d = { month: "short", day: "numeric" };
  return t.getFullYear() !== r.getFullYear() && (d.year = "numeric"), t.toLocaleDateString("en-US", d);
}
function xv(e) {
  return Ao(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Xt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return Sn();
  if (n === "tomorrow") return dr(1);
  if (n === "yesterday") return dr(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), l = a === 0 ? 1 : 8 - a;
    return dr(l);
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
      const l = parseInt(r[2], 10), d = r[3] ? parseInt(r[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), c = new Date(d, a, l);
      return Mn(c);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return Mn(i);
  }
  return null;
}
function Ri(e) {
  const t = Ao(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const wv = new Xe("datePillPaste"), kv = Co.create({
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
    const n = e.attrs.date, r = qc(n), o = Ri(n);
    return [
      "span",
      _n(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return ko(yv, {
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
    const e = new je({
      find: /@today\s$/,
      handler: ({ range: c, chain: m }) => {
        m().deleteRange(c).insertDatePill(Sn()).run();
      }
    }), t = new je({
      find: /@tomorrow\s$/,
      handler: ({ range: c, chain: m }) => {
        m().deleteRange(c).insertDatePill(dr(1)).run();
      }
    }), n = new je({
      find: /@yesterday\s$/,
      handler: ({ range: c, chain: m }) => {
        m().deleteRange(c).insertDatePill(dr(-1)).run();
      }
    }), r = new je({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: c, chain: m, match: f }) => {
        m().deleteRange(c).insertDatePill(f[1]).run();
      }
    }), o = new je({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: c, chain: m, match: f }) => {
        const b = {
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
        if (b !== void 0) {
          const h = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(h, b, parseInt(f[2], 10));
          m().deleteRange(c).insertDatePill(Mn(g)).run();
        }
      }
    }), s = new je({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: c, chain: m, match: f }) => {
        const p = Xt(f[1]);
        p && m().deleteRange(c).insertDatePill(p).run();
      }
    }), i = new je({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: c, chain: m, match: f }) => {
        const p = Xt(f[1]);
        p && m().deleteRange(c).insertDatePill(p).run();
      }
    }), a = new je({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: c, chain: m, match: f }) => {
        m().deleteRange(c).insertDatePill(f[1]).run();
      }
    }), l = new je({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: c, chain: m, match: f }) => {
        const p = Xt(f[1]);
        p && m().deleteRange(c).insertDatePill(p).run();
      }
    }), d = new je({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: c, chain: m, match: f }) => {
        const p = Xt(f[1]);
        p && m().deleteRange(c).insertDatePill(p).run();
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
      d
    ];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new Qe({
        key: wv,
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain"), s = r.getData("text/html");
            if (s && s.includes('data-type="date-pill"')) return !1;
            const i = /@([^@\n]+)@/g;
            let a = !1, l;
            const d = new RegExp(i.source, i.flags);
            for (; (l = d.exec(o)) !== null; )
              if (Xt(l[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: c } = t, { tr: m, schema: f } = c, p = [];
            let b = 0;
            const h = new RegExp(i.source, i.flags);
            let g;
            for (; (g = h.exec(o)) !== null; ) {
              const M = g[1], w = Xt(M);
              if (w) {
                const T = o.slice(b, g.index);
                T && p.push(f.text(T)), p.push(e.create({ date: w })), b = g.index + g[0].length;
              }
            }
            const y = o.slice(b);
            if (y && p.push(f.text(y)), p.length === 0) return !1;
            const v = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: x } = c.selection;
            if (x.parent.type.name === "paragraph") {
              const M = m;
              let w = c.selection.from;
              for (const T of p)
                M.insert(w, T), w += T.nodeSize;
              M.delete(c.selection.from, c.selection.to), t.dispatch(M);
            } else
              m.replaceSelectionWith(v), t.dispatch(m);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function Cv({ node: e, selected: t }) {
  const n = V(null), r = e.attrs.tag || "", o = z((s) => {
    s.preventDefault(), s.stopPropagation();
  }, []);
  return /* @__PURE__ */ u(xr, { as: "span", className: "inline", children: /* @__PURE__ */ u(
    "span",
    {
      ref: n,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": r,
      onClick: o,
      children: [
        /* @__PURE__ */ u(sf, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 33,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ u("span", { className: "tag-text", children: r }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 34,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 25,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/editor/TagPillComponent.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
function ir(e) {
  return /[a-zA-Z]/.test(e) && /^[a-zA-Z0-9_-]+$/.test(e);
}
function oo(e) {
  return e.toLowerCase().trim();
}
const Tv = new Xe("tagPillPaste"), Ev = Co.create({
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
      _n(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return ko(Cv, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = oo(e);
        return ir(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return [new je({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = oo(r[1]);
        if (ir(o)) {
          const i = r[0].startsWith(" ") ? 1 : 0, a = t.from + i;
          n().deleteRange({ from: a, to: t.to }).insertTagPill(o).run();
        }
      }
    })];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new Qe({
        key: Tv,
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain"), s = r.getData("text/html");
            if (s && s.includes('data-type="tag-pill"')) return !1;
            const i = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let a = !1, l;
            const d = new RegExp(i.source, i.flags);
            for (; (l = d.exec(o)) !== null; )
              if (ir(l[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: c } = t, { tr: m, schema: f } = c, p = [];
            let b = 0;
            const h = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let g;
            for (; (g = h.exec(o)) !== null; ) {
              const x = oo(g[1]);
              if (ir(x)) {
                const M = g[0], w = M.startsWith(" ") || M.startsWith(`
`) ? 1 : 0, T = o.slice(b, g.index + w);
                T && p.push(f.text(T)), p.push(e.create({ tag: x })), b = g.index + M.length;
              }
            }
            const y = o.slice(b);
            if (y && p.push(f.text(y)), p.length === 0) return !1;
            const { $from: v } = c.selection;
            if (v.parent.type.name === "paragraph") {
              const x = m;
              let M = c.selection.from;
              for (const w of p)
                x.insert(M, w), M += w.nodeSize;
              x.delete(c.selection.from, c.selection.to), t.dispatch(x);
            } else {
              const x = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
              );
              m.replaceSelectionWith(x), t.dispatch(m);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function Gc({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = j(""), [i, a] = j(""), [l, d] = j(""), [c, m] = j(!1), f = V(null), p = V(null);
  G(() => {
    e && (s(""), a(""), d(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), G(() => {
    if (!e) return;
    const v = (w) => {
      p.current && !p.current.contains(w.target) && t();
    }, x = (w) => {
      w.key === "Escape" && t();
    }, M = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", x), () => {
      clearTimeout(M), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", x);
    };
  }, [e, t]);
  const b = (v) => {
    if (!v.trim())
      return d("Please enter an image URL"), !1;
    try {
      const x = new URL(v);
      if (!["http:", "https:", "data:"].includes(x.protocol))
        return d("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return d("Please enter a valid URL"), !1;
    }
    return d(""), !0;
  }, h = async () => {
    if (!b(o)) return;
    m(!0);
    const v = new window.Image();
    v.onload = () => {
      m(!1), n(o.trim(), i.trim()), t();
    }, v.onerror = () => {
      m(!1), n(o.trim(), i.trim()), t();
    }, setTimeout(() => {
      c && (m(!1), n(o.trim(), i.trim()), t());
    }, 3e3), v.src = o.trim();
  }, g = (v) => {
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), h());
  };
  if (!e) return null;
  const y = r ? {
    top: r.top,
    left: Math.min(r.left, typeof window < "u" ? window.innerWidth - 340 : r.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ u(
    "div",
    {
      ref: p,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof y.top == "number", y.top),
        left: typeof y.left == "number" ? Math.max(8, y.left) : y.left,
        transform: r ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ u("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ u("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ u(Ni, { size: 16, className: "text-primary" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 148,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ u("span", { className: "font-medium text-sm", children: "Insert Image from URL" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 149,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 147,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ u(Dt, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 156,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 151,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ u("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ u("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ u("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ u(ai, { size: 12 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 165,
                columnNumber: 13
              }, this),
              "Image URL"
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 164,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ u(
              "input",
              {
                ref: f,
                type: "url",
                value: o,
                onChange: (v) => {
                  s(v.target.value), l && d("");
                },
                onKeyDown: g,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 168,
                columnNumber: 11
              },
              this
            ),
            l && /* @__PURE__ */ u("span", { className: "image-url-dialog-error", children: l }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 181,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 163,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ u("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ u(So, { size: 12 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 188,
                columnNumber: 13
              }, this),
              "Alt Text (optional)"
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 187,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: i,
                onChange: (v) => a(v.target.value),
                onKeyDown: g,
                placeholder: "Describe the image",
                className: "image-url-dialog-input"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 191,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 186,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u("div", { className: "image-url-dialog-actions", children: [
            /* @__PURE__ */ u(
              "button",
              {
                onClick: t,
                className: "image-url-dialog-btn image-url-dialog-btn-cancel",
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 203,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: h,
                disabled: c || !o.trim(),
                className: "image-url-dialog-btn image-url-dialog-btn-insert",
                children: c ? "Validating..." : "Insert Image"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 209,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 202,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 161,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/ImageURLDialog.tsx",
      lineNumber: 136,
      columnNumber: 5
    },
    this
  );
}
const Sv = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ u(So, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 62,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ u(af, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 68,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ u(lf, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 74,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ u(cf, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 80,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ u(pi, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 86,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ u(hi, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 92,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ u(gi, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 98,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ u(fi, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 104,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ u(Kl, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 110,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ u(Is, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 116,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ u(Ni, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 122,
      columnNumber: 11
    }, void 0),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ u(ql, { size: 16 }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 129,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ u(lo, { size: 16, className: "text-blue-400" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 135,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ u(Yl, { size: 16, className: "text-purple-400" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 141,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ u(Ul, { size: 16, className: "text-amber-400" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 147,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ u(vi, { size: 16, className: "text-green-400" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 153,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ u(bi, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 159,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ u(Vl, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 165,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ u(ai, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 171,
      columnNumber: 11
    }, void 0),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Mv = 32, Dv = 8, Rv = 320, Av = 210, Yr = 12;
function Va(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const o = t.getRangeAt(0), s = o.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const i = document.createElement("span");
        i.textContent = "​", o.cloneRange().insertNode(i);
        const l = i.getBoundingClientRect(), d = { top: l.top, bottom: l.bottom, left: l.left };
        return i.parentNode?.removeChild(i), t.removeAllRanges(), t.addRange(o), d;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, r = e.view.coordsAtPos(n);
    return { top: r.top, bottom: r.bottom, left: r.left };
  } catch {
    return null;
  }
}
function Pv({ editor: e }) {
  const [t, n] = j(!1), [r, o] = j(""), [s, i] = j(0), [a, l] = j(null), [d, c] = j(!1), [m, f] = j({ top: 0, left: 0 }), [p, b] = j("below"), h = V(null), g = V(-1), y = V(!1);
  G(() => {
    y.current = t;
  }, [t]);
  const v = Sv.filter((N) => {
    if (!r) return !0;
    const E = r.toLowerCase();
    return N.title.toLowerCase().includes(E) || N.keywords?.some((S) => S.includes(E));
  }), x = Math.min(
    v.length * Mv + Dv,
    Rv
  );
  To(() => {
    if (!t || !a) return;
    const { top: N, bottom: E, left: S } = a, P = window.innerHeight, R = window.innerWidth, I = P - E - Yr, B = N - Yr;
    let H;
    if (I >= x ? H = "below" : B >= x ? H = "above" : H = I >= B ? "below" : "above", b(H), h.current) {
      const K = Math.max(
        Yr,
        Math.min(S, R - Av - Yr)
      ), A = H === "below" ? E + 4 : N - x - 4;
      h.current.style.top = `${A}px`, h.current.style.left = `${K}px`;
    }
  }, [t, a, x, v.length]);
  const M = z(() => {
    const { state: N } = e, { selection: E } = N, S = E.from, P = g.current;
    if (P >= 0 && P <= S)
      e.chain().focus().deleteRange({ from: P, to: S }).run();
    else {
      const { $from: R } = E, B = R.parent.textBetween(0, R.parentOffset, void 0, "￼").lastIndexOf("/");
      if (B !== -1) {
        const H = R.pos - (R.parentOffset - B);
        e.chain().focus().deleteRange({ from: H, to: R.pos }).run();
      }
    }
  }, [e]), w = z(() => {
    n(!1), o(""), i(0), g.current = -1, l(null);
  }, []), T = z((N) => {
    const E = v[N];
    if (E) {
      if (M(), E.isImageCommand) {
        const { state: S } = e, P = e.view.coordsAtPos(S.selection.from);
        f({
          top: P.bottom + 8,
          left: P.left
        }), c(!0);
      } else
        E.command(e);
      w();
    }
  }, [e, v, M, w]), k = z((N, E) => {
    e.chain().focus().setImage({ src: N, alt: E }).run();
  }, [e]);
  return G(() => {
    if (!e) return;
    const N = () => {
      if (y.current) return;
      const { state: E } = e, { selection: S } = E, { $from: P } = S;
      if (P.parentOffset === 0) return;
      const R = P.parent.textBetween(0, P.parentOffset, void 0, "￼");
      if (!R.endsWith("/")) return;
      const I = R.length > 1 ? R.slice(-2, -1) : "";
      if (I && I !== " " && I !== `
`) return;
      g.current = P.pos - 1;
      const B = Va(e);
      B && (l(B), n(!0), o(""), i(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), G(() => {
    if (!e || !t) return;
    const N = e.view.dom, E = (S) => {
      y.current && (S.key === "ArrowDown" ? (S.preventDefault(), S.stopPropagation(), i((P) => (P + 1) % v.length)) : S.key === "ArrowUp" ? (S.preventDefault(), S.stopPropagation(), i((P) => (P - 1 + v.length) % v.length)) : S.key === "Enter" ? (S.preventDefault(), S.stopPropagation(), T(s)) : S.key === "Escape" && (S.preventDefault(), S.stopPropagation(), w()));
    };
    return N.addEventListener("keydown", E, !0), () => {
      N.removeEventListener("keydown", E, !0);
    };
  }, [e, t, s, v, T, w]), G(() => {
    if (!e || !t) return;
    const N = () => {
      if (!y.current || g.current < 0) return;
      const { state: E } = e, { selection: S } = E, P = S.from, R = g.current;
      if (P <= R) {
        w();
        return;
      }
      try {
        const I = E.doc.textBetween(R + 1, P, void 0, "￼");
        if (I.includes(`
`)) {
          w();
          return;
        }
        o(I), i(0);
        const B = Va(e);
        B && l(B);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, t, w]), G(() => {
    if (!t) return;
    const N = (E) => {
      h.current && !h.current.contains(E.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [t, w]), G(() => {
    t && v.length === 0 && r.length > 2 && w();
  }, [t, v.length, r, w]), G(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), G(() => {
    if (!t || !h.current) return;
    const N = h.current.querySelector(".slash-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [t, s]), d ? /* @__PURE__ */ u(
    Gc,
    {
      isOpen: d,
      onClose: () => c(!1),
      onInsert: k,
      position: m
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 516,
      columnNumber: 7
    },
    this
  ) : !t || v.length === 0 ? null : jt(
    /* @__PURE__ */ u(
      "div",
      {
        ref: h,
        className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "auto"
        },
        children: v.map((N, E) => /* @__PURE__ */ u(
          "div",
          {
            className: `slash-item ${E === s ? "is-selected" : ""}`,
            onClick: (S) => {
              S.preventDefault(), S.stopPropagation(), T(E);
            },
            onMouseEnter: () => i(E),
            children: [
              /* @__PURE__ */ u("span", { className: "slash-icon", children: N.icon }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
                lineNumber: 556,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ u("span", { className: "slash-label", children: N.title }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
                lineNumber: 557,
                columnNumber: 11
              }, this)
            ]
          },
          N.title,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
            lineNumber: 546,
            columnNumber: 9
          },
          this
        ))
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/SlashCommands.tsx",
        lineNumber: 534,
        columnNumber: 5
      },
      this
    ),
    document.body
  );
}
const Iv = 340, Lv = 36, Ov = 8, _v = 240, jr = 8;
function Ka(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const o = t.getRangeAt(0), s = o.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const i = document.createElement("span");
        i.textContent = "​", o.cloneRange().insertNode(i);
        const l = i.getBoundingClientRect(), d = { top: l.top, bottom: l.bottom, left: l.left };
        return i.parentNode?.removeChild(i), t.removeAllRanges(), t.addRange(o), d;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, r = e.view.coordsAtPos(n);
    return { top: r.top, bottom: r.bottom, left: r.left };
  } catch {
    return null;
  }
}
function Bv({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = j(!1), [s, i] = j(""), [a, l] = j([]), [d, c] = j(0), [m, f] = j(null), [p, b] = j("below"), [h, g] = j(!1), y = V(!1), v = V(null), x = V(-1), M = V(null);
  G(() => {
    y.current = r;
  }, [r]);
  const w = z(() => {
    o(!1), i(""), l([]), c(0), x.current = -1;
  }, []), T = z((S) => {
    const P = x.current;
    if (P < 0) return;
    const { state: R } = e, I = R.selection.from;
    try {
      const B = R.tr.delete(P, I), H = R.schema.marks.wikiLink;
      if (H) {
        const K = H.create({ pageName: S }), A = R.schema.text(S, [K]);
        B.insert(P, A);
        const $ = P + S.length;
        B.setSelection(ii.create(B.doc, $)), B.removeStoredMark(H);
      } else
        B.insertText(`[[${S}]]`, P);
      e.view.dispatch(B), e.view.focus();
    } catch (B) {
      console.warn("WikiLinkAutocomplete: Error inserting link", B);
    }
    w();
  }, [e, w]);
  G(() => {
    if (!e) return;
    const S = () => {
      if (y.current) return;
      const { state: P } = e, { selection: R } = P, { $from: I } = R;
      if (I.parentOffset < 2 || !I.parent.textBetween(0, I.parentOffset, void 0, "￼").endsWith("[[")) return;
      x.current = I.pos - 2;
      const H = Ka(e);
      H && (f(H), o(!0), i(""), l([]), c(0));
    };
    return e.on("update", S), () => {
      e.off("update", S);
    };
  }, [e]), G(() => {
    if (!e || !r) return;
    const S = e.view.dom, P = (R) => {
      if (y.current) {
        if (R.key === "ArrowDown") {
          R.preventDefault();
          const I = a.length + (s.trim() ? 1 : 0) - 1;
          c((B) => Math.min(B + 1, I));
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), c((I) => Math.max(I - 1, 0));
          return;
        }
        if (R.key === "Enter" || R.key === "Tab") {
          R.preventDefault(), R.stopPropagation(), d < a.length ? T(a[d].title) : s.trim() && n ? (n(s.trim()), w()) : s.trim() && T(s.trim());
          return;
        }
        if (R.key === "Escape") {
          R.preventDefault(), w();
          return;
        }
        R.key === "]" && setTimeout(() => {
          const { state: I } = e, { $from: B } = I.selection;
          B.parent.textBetween(0, B.parentOffset, void 0, "￼").endsWith("]]") && w();
        }, 0);
      }
    };
    return S.addEventListener("keydown", P, !0), () => {
      S.removeEventListener("keydown", P, !0);
    };
  }, [e, r, a, d, s, T, w, n]), G(() => {
    if (!e || !r) return;
    const S = () => {
      const P = x.current;
      if (P < 0) {
        w();
        return;
      }
      const { state: R } = e, I = R.selection.from;
      if (I <= P) {
        w();
        return;
      }
      try {
        const B = R.doc.textBetween(P + 2, I, void 0, "￼");
        if (B.includes(`
`) || B.includes("]]")) {
          w();
          return;
        }
        i(B), c(0);
        const H = Ka(e);
        H && f(H);
      } catch {
        w();
      }
    };
    return e.on("update", S), e.on("selectionUpdate", S), () => {
      e.off("update", S), e.off("selectionUpdate", S);
    };
  }, [e, r, w]), G(() => {
    if (r) {
      if (M.current && clearTimeout(M.current), !s.trim()) {
        g(!0), M.current = setTimeout(async () => {
          try {
            const S = await t("");
            l(S);
          } catch {
            l([]);
          }
          g(!1);
        }, 100);
        return;
      }
      return g(!0), M.current = setTimeout(async () => {
        try {
          const S = await t(s.trim());
          l(S);
        } catch {
          l([]);
        }
        g(!1);
      }, 150), () => {
        M.current && clearTimeout(M.current);
      };
    }
  }, [r, s, t]), G(() => {
    if (!r) return;
    const S = (P) => {
      v.current && !v.current.contains(P.target) && w();
    };
    return document.addEventListener("mousedown", S), () => document.removeEventListener("mousedown", S);
  }, [r, w]), G(() => {
    if (!r || !v.current) return;
    const S = v.current.querySelector(".wikilink-item.is-selected");
    S && S.scrollIntoView({ block: "nearest" });
  }, [r, d]);
  const k = a.length + (s.trim() ? 1 : 0), D = Math.min(
    Math.max(k, 1) * Lv + Ov,
    _v
  );
  if (To(() => {
    if (!r || !m) return;
    const { top: S, bottom: P, left: R } = m, I = window.innerHeight, B = window.innerWidth, H = I - P - jr, K = S - jr;
    let A;
    if (H >= D ? A = "below" : K >= D ? A = "above" : A = H >= K ? "below" : "above", b(A), v.current) {
      const $ = Math.max(
        jr,
        Math.min(R, B - Iv - jr)
      ), Q = A === "below" ? P + 4 : S - D - 4;
      v.current.style.top = `${Q}px`, v.current.style.left = `${$}px`;
    }
  }, [r, m, D, k]), !r) return null;
  const N = s.trim() && !a.some((S) => S.title.toLowerCase() === s.trim().toLowerCase());
  return jt(
    /* @__PURE__ */ u(
      "div",
      {
        ref: v,
        className: `wikilink-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "auto"
        },
        children: [
          h && a.length === 0 && /* @__PURE__ */ u("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ u("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 367,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 366,
            columnNumber: 9
          }, this),
          a.map((S, P) => /* @__PURE__ */ u(
            "div",
            {
              className: `wikilink-item ${P === d ? "is-selected" : ""}`,
              onMouseDown: (R) => {
                R.preventDefault(), T(S.title);
              },
              onMouseEnter: () => c(P),
              children: [
                /* @__PURE__ */ u("span", { className: "wikilink-icon", children: /* @__PURE__ */ u(yi, { size: 14 }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                  lineNumber: 381,
                  columnNumber: 13
                }, this) }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                  lineNumber: 380,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ u("span", { className: "wikilink-label", children: S.title }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                  lineNumber: 383,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ u("span", { className: "wikilink-type", children: S.type }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                  lineNumber: 384,
                  columnNumber: 11
                }, this)
              ]
            },
            S.id,
            !0,
            {
              fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
              lineNumber: 371,
              columnNumber: 9
            },
            this
          )),
          N && /* @__PURE__ */ u(
            "div",
            {
              className: `wikilink-item wikilink-create ${a.length === d ? "is-selected" : ""}`,
              onMouseDown: (S) => {
                S.preventDefault(), n ? (n(s.trim()), w()) : T(s.trim());
              },
              onMouseEnter: () => c(a.length),
              children: [
                /* @__PURE__ */ u("span", { className: "wikilink-icon", children: /* @__PURE__ */ u(xi, { size: 14 }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                  lineNumber: 402,
                  columnNumber: 13
                }, this) }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                  lineNumber: 401,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ u("span", { className: "wikilink-label", children: [
                  "Create “",
                  s.trim(),
                  "”"
                ] }, void 0, !0, {
                  fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                  lineNumber: 404,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
              lineNumber: 388,
              columnNumber: 9
            },
            this
          ),
          !h && a.length === 0 && !s.trim() && /* @__PURE__ */ u("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ u("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 409,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 408,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/tmp/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
        lineNumber: 354,
        columnNumber: 5
      },
      this
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
function Un(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = C.createContext(i), l = n.length;
    n = [...n, i];
    const d = (m) => {
      const { scope: f, children: p, ...b } = m, h = f?.[e]?.[l] || a, g = C.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ W(h.Provider, { value: g, children: p });
    };
    d.displayName = s + "Provider";
    function c(m, f) {
      const p = f?.[e]?.[l] || a, b = C.useContext(p);
      if (b) return b;
      if (i !== void 0) return i;
      throw new Error(`\`${m}\` must be used within \`${s}\``);
    }
    return [d, c];
  }
  const o = () => {
    const s = n.map((i) => C.createContext(i));
    return function(a) {
      const l = a?.[e] || s;
      return C.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: l } }),
        [a, l]
      );
    };
  };
  return o.scopeName = e, [r, $v(o, ...t)];
}
function $v(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const i = r.reduce((a, { useScope: l, scopeName: d }) => {
        const m = l(s)[`__scope${d}`];
        return { ...a, ...m };
      }, {});
      return C.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Ft = globalThis?.document ? C.useLayoutEffect : () => {
}, Wv = C[" useInsertionEffect ".trim().toString()] || Ft;
function Ai({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = zv({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, l = a ? e : o;
  {
    const c = C.useRef(e !== void 0);
    C.useEffect(() => {
      const m = c.current;
      m !== a && console.warn(
        `${r} is changing from ${m ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), c.current = a;
    }, [a, r]);
  }
  const d = C.useCallback(
    (c) => {
      if (a) {
        const m = Hv(c) ? c(e) : c;
        m !== e && i.current?.(m);
      } else
        s(c);
    },
    [a, e, s, i]
  );
  return [l, d];
}
function zv({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = C.useState(e), o = C.useRef(n), s = C.useRef(t);
  return Wv(() => {
    s.current = t;
  }, [t]), C.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Hv(e) {
  return typeof e == "function";
}
var Fv = [
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
], Oe = Fv.reduce((e, t) => {
  const n = /* @__PURE__ */ hr(`Primitive.${t}`), r = C.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, l = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ W(l, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Zc(e, t) {
  e && ic.flushSync(() => e.dispatchEvent(t));
}
function Xc(e) {
  const t = e + "CollectionProvider", [n, r] = Un(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (h) => {
    const { scope: g, children: y } = h, v = q.useRef(null), x = q.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ W(o, { scope: g, itemMap: x, collectionRef: v, children: y });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", l = /* @__PURE__ */ hr(a), d = q.forwardRef(
    (h, g) => {
      const { scope: y, children: v } = h, x = s(a, y), M = $e(g, x.collectionRef);
      return /* @__PURE__ */ W(l, { ref: M, children: v });
    }
  );
  d.displayName = a;
  const c = e + "CollectionItemSlot", m = "data-radix-collection-item", f = /* @__PURE__ */ hr(c), p = q.forwardRef(
    (h, g) => {
      const { scope: y, children: v, ...x } = h, M = q.useRef(null), w = $e(g, M), T = s(c, y);
      return q.useEffect(() => (T.itemMap.set(M, { ref: M, ...x }), () => void T.itemMap.delete(M))), /* @__PURE__ */ W(f, { [m]: "", ref: w, children: v });
    }
  );
  p.displayName = c;
  function b(h) {
    const g = s(e + "CollectionConsumer", h);
    return q.useCallback(() => {
      const v = g.collectionRef.current;
      if (!v) return [];
      const x = Array.from(v.querySelectorAll(`[${m}]`));
      return Array.from(g.itemMap.values()).sort(
        (T, k) => x.indexOf(T.ref.current) - x.indexOf(k.ref.current)
      );
    }, [g.collectionRef, g.itemMap]);
  }
  return [
    { Provider: i, Slot: d, ItemSlot: p },
    b,
    r
  ];
}
var Uv = C.createContext(void 0);
function Qc(e) {
  const t = C.useContext(Uv);
  return e || t || "ltr";
}
function Rt(e) {
  const t = C.useRef(e);
  return C.useEffect(() => {
    t.current = e;
  }), C.useMemo(() => (...n) => t.current?.(...n), []);
}
function Yv(e, t = globalThis?.document) {
  const n = Rt(e);
  C.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var jv = "DismissableLayer", Fs = "dismissableLayer.update", Vv = "dismissableLayer.pointerDownOutside", Kv = "dismissableLayer.focusOutside", qa, Jc = C.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Pi = C.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...l
    } = e, d = C.useContext(Jc), [c, m] = C.useState(null), f = c?.ownerDocument ?? globalThis?.document, [, p] = C.useState({}), b = $e(t, (k) => m(k)), h = Array.from(d.layers), [g] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), y = h.indexOf(g), v = c ? h.indexOf(c) : -1, x = d.layersWithOutsidePointerEventsDisabled.size > 0, M = v >= y, w = Zv((k) => {
      const D = k.target, N = [...d.branches].some((E) => E.contains(D));
      !M || N || (o?.(k), i?.(k), k.defaultPrevented || a?.());
    }, f), T = Xv((k) => {
      const D = k.target;
      [...d.branches].some((E) => E.contains(D)) || (s?.(k), i?.(k), k.defaultPrevented || a?.());
    }, f);
    return Yv((k) => {
      v === d.layers.size - 1 && (r?.(k), !k.defaultPrevented && a && (k.preventDefault(), a()));
    }, f), C.useEffect(() => {
      if (c)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (qa = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(c)), d.layers.add(c), Ga(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = qa);
        };
    }, [c, f, n, d]), C.useEffect(() => () => {
      c && (d.layers.delete(c), d.layersWithOutsidePointerEventsDisabled.delete(c), Ga());
    }, [c, d]), C.useEffect(() => {
      const k = () => p({});
      return document.addEventListener(Fs, k), () => document.removeEventListener(Fs, k);
    }, []), /* @__PURE__ */ W(
      Oe.div,
      {
        ...l,
        ref: b,
        style: {
          pointerEvents: x ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: de(e.onFocusCapture, T.onFocusCapture),
        onBlurCapture: de(e.onBlurCapture, T.onBlurCapture),
        onPointerDownCapture: de(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
Pi.displayName = jv;
var qv = "DismissableLayerBranch", Gv = C.forwardRef((e, t) => {
  const n = C.useContext(Jc), r = C.useRef(null), o = $e(t, r);
  return C.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ W(Oe.div, { ...e, ref: o });
});
Gv.displayName = qv;
function Zv(e, t = globalThis?.document) {
  const n = Rt(e), r = C.useRef(!1), o = C.useRef(() => {
  });
  return C.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let l = function() {
          eu(
            Vv,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: a };
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
function Xv(e, t = globalThis?.document) {
  const n = Rt(e), r = C.useRef(!1);
  return C.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && eu(Kv, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ga() {
  const e = new CustomEvent(Fs);
  document.dispatchEvent(e);
}
function eu(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Zc(o, s) : o.dispatchEvent(s);
}
var ps = 0;
function Qv() {
  C.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Za()), document.body.insertAdjacentElement("beforeend", e[1] ?? Za()), ps++, () => {
      ps === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), ps--;
    };
  }, []);
}
function Za() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var hs = "focusScope.autoFocusOnMount", gs = "focusScope.autoFocusOnUnmount", Xa = { bubbles: !1, cancelable: !0 }, Jv = "FocusScope", tu = C.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, l] = C.useState(null), d = Rt(o), c = Rt(s), m = C.useRef(null), f = $e(t, (h) => l(h)), p = C.useRef({
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
      let h = function(x) {
        if (p.paused || !a) return;
        const M = x.target;
        a.contains(M) ? m.current = M : Wt(m.current, { select: !0 });
      }, g = function(x) {
        if (p.paused || !a) return;
        const M = x.relatedTarget;
        M !== null && (a.contains(M) || Wt(m.current, { select: !0 }));
      }, y = function(x) {
        if (document.activeElement === document.body)
          for (const w of x)
            w.removedNodes.length > 0 && Wt(a);
      };
      document.addEventListener("focusin", h), document.addEventListener("focusout", g);
      const v = new MutationObserver(y);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", h), document.removeEventListener("focusout", g), v.disconnect();
      };
    }
  }, [r, a, p.paused]), C.useEffect(() => {
    if (a) {
      Ja.add(p);
      const h = document.activeElement;
      if (!a.contains(h)) {
        const y = new CustomEvent(hs, Xa);
        a.addEventListener(hs, d), a.dispatchEvent(y), y.defaultPrevented || (e0(s0(nu(a)), { select: !0 }), document.activeElement === h && Wt(a));
      }
      return () => {
        a.removeEventListener(hs, d), setTimeout(() => {
          const y = new CustomEvent(gs, Xa);
          a.addEventListener(gs, c), a.dispatchEvent(y), y.defaultPrevented || Wt(h ?? document.body, { select: !0 }), a.removeEventListener(gs, c), Ja.remove(p);
        }, 0);
      };
    }
  }, [a, d, c, p]);
  const b = C.useCallback(
    (h) => {
      if (!n && !r || p.paused) return;
      const g = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey, y = document.activeElement;
      if (g && y) {
        const v = h.currentTarget, [x, M] = t0(v);
        x && M ? !h.shiftKey && y === M ? (h.preventDefault(), n && Wt(x, { select: !0 })) : h.shiftKey && y === x && (h.preventDefault(), n && Wt(M, { select: !0 })) : y === v && h.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ W(Oe.div, { tabIndex: -1, ...i, ref: f, onKeyDown: b });
});
tu.displayName = Jv;
function e0(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Wt(r, { select: t }), document.activeElement !== n) return;
}
function t0(e) {
  const t = nu(e), n = Qa(t, e), r = Qa(t.reverse(), e);
  return [n, r];
}
function nu(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Qa(e, t) {
  for (const n of e)
    if (!n0(n, { upTo: t })) return n;
}
function n0(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function r0(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Wt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && r0(e) && t && e.select();
  }
}
var Ja = o0();
function o0() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = el(e, t), e.unshift(t);
    },
    remove(t) {
      e = el(e, t), e[0]?.resume();
    }
  };
}
function el(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function s0(e) {
  return e.filter((t) => t.tagName !== "A");
}
var i0 = C[" useId ".trim().toString()] || (() => {
}), a0 = 0;
function co(e) {
  const [t, n] = C.useState(i0());
  return Ft(() => {
    n((r) => r ?? String(a0++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const l0 = ["top", "right", "bottom", "left"], Ut = Math.min, Ke = Math.max, uo = Math.round, Vr = Math.floor, ht = (e) => ({
  x: e,
  y: e
}), c0 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, u0 = {
  start: "end",
  end: "start"
};
function Us(e, t, n) {
  return Ke(e, Ut(t, n));
}
function At(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Pt(e) {
  return e.split("-")[0];
}
function Yn(e) {
  return e.split("-")[1];
}
function Ii(e) {
  return e === "x" ? "y" : "x";
}
function Li(e) {
  return e === "y" ? "height" : "width";
}
const d0 = /* @__PURE__ */ new Set(["top", "bottom"]);
function pt(e) {
  return d0.has(Pt(e)) ? "y" : "x";
}
function Oi(e) {
  return Ii(pt(e));
}
function m0(e, t, n) {
  n === void 0 && (n = !1);
  const r = Yn(e), o = Oi(e), s = Li(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = mo(i)), [i, mo(i)];
}
function f0(e) {
  const t = mo(e);
  return [Ys(e), t, Ys(t)];
}
function Ys(e) {
  return e.replace(/start|end/g, (t) => u0[t]);
}
const tl = ["left", "right"], nl = ["right", "left"], p0 = ["top", "bottom"], h0 = ["bottom", "top"];
function g0(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? nl : tl : t ? tl : nl;
    case "left":
    case "right":
      return t ? p0 : h0;
    default:
      return [];
  }
}
function b0(e, t, n, r) {
  const o = Yn(e);
  let s = g0(Pt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(Ys)))), s;
}
function mo(e) {
  return e.replace(/left|right|bottom|top/g, (t) => c0[t]);
}
function v0(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function ru(e) {
  return typeof e != "number" ? v0(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function fo(e) {
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
function rl(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = pt(t), i = Oi(t), a = Li(i), l = Pt(t), d = s === "y", c = r.x + r.width / 2 - o.width / 2, m = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: c,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: m
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: m
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (Yn(t)) {
    case "start":
      p[i] -= f * (n && d ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && d ? -1 : 1);
      break;
  }
  return p;
}
const N0 = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: i
  } = n, a = s.filter(Boolean), l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let d = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: c,
    y: m
  } = rl(d, r, l), f = r, p = {}, b = 0;
  for (let h = 0; h < a.length; h++) {
    const {
      name: g,
      fn: y
    } = a[h], {
      x: v,
      y: x,
      data: M,
      reset: w
    } = await y({
      x: c,
      y: m,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: p,
      rects: d,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = v ?? c, m = x ?? m, p = {
      ...p,
      [g]: {
        ...p[g],
        ...M
      }
    }, w && b <= 50 && (b++, typeof w == "object" && (w.placement && (f = w.placement), w.rects && (d = w.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : w.rects), {
      x: c,
      y: m
    } = rl(d, f, l)), h = -1);
  }
  return {
    x: c,
    y: m,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function gr(e, t) {
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
    boundary: d = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: m = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = At(t, e), b = ru(p), g = a[f ? m === "floating" ? "reference" : "floating" : m], y = fo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: d,
    rootBoundary: c,
    strategy: l
  })), v = m === "floating" ? {
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
  }, w = fo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: v,
    offsetParent: x,
    strategy: l
  }) : v);
  return {
    top: (y.top - w.top + b.top) / M.y,
    bottom: (w.bottom - y.bottom + b.bottom) / M.y,
    left: (y.left - w.left + b.left) / M.x,
    right: (w.right - y.right + b.right) / M.x
  };
}
const y0 = (e) => ({
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
      element: d,
      padding: c = 0
    } = At(e, t) || {};
    if (d == null)
      return {};
    const m = ru(c), f = {
      x: n,
      y: r
    }, p = Oi(o), b = Li(p), h = await i.getDimensions(d), g = p === "y", y = g ? "top" : "left", v = g ? "bottom" : "right", x = g ? "clientHeight" : "clientWidth", M = s.reference[b] + s.reference[p] - f[p] - s.floating[b], w = f[p] - s.reference[p], T = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d));
    let k = T ? T[x] : 0;
    (!k || !await (i.isElement == null ? void 0 : i.isElement(T))) && (k = a.floating[x] || s.floating[b]);
    const D = M / 2 - w / 2, N = k / 2 - h[b] / 2 - 1, E = Ut(m[y], N), S = Ut(m[v], N), P = E, R = k - h[b] - S, I = k / 2 - h[b] / 2 + D, B = Us(P, I, R), H = !l.arrow && Yn(o) != null && I !== B && s.reference[b] / 2 - (I < P ? E : S) - h[b] / 2 < 0, K = H ? I < P ? I - P : I - R : 0;
    return {
      [p]: f[p] + K,
      data: {
        [p]: B,
        centerOffset: I - B - K,
        ...H && {
          alignmentOffset: K
        }
      },
      reset: H
    };
  }
}), x0 = function(e) {
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
        elements: d
      } = t, {
        mainAxis: c = !0,
        crossAxis: m = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: h = !0,
        ...g
      } = At(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const y = Pt(o), v = pt(a), x = Pt(a) === a, M = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)), w = f || (x || !h ? [mo(a)] : f0(a)), T = b !== "none";
      !f && T && w.push(...b0(a, h, b, M));
      const k = [a, ...w], D = await gr(t, g), N = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (c && N.push(D[y]), m) {
        const I = m0(o, i, M);
        N.push(D[I[0]], D[I[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: N
      }], !N.every((I) => I <= 0)) {
        var S, P;
        const I = (((S = s.flip) == null ? void 0 : S.index) || 0) + 1, B = k[I];
        if (B && (!(m === "alignment" ? v !== pt(B) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        E.every((A) => pt(A.placement) === v ? A.overflows[0] > 0 : !0)))
          return {
            data: {
              index: I,
              overflows: E
            },
            reset: {
              placement: B
            }
          };
        let H = (P = E.filter((K) => K.overflows[0] <= 0).sort((K, A) => K.overflows[1] - A.overflows[1])[0]) == null ? void 0 : P.placement;
        if (!H)
          switch (p) {
            case "bestFit": {
              var R;
              const K = (R = E.filter((A) => {
                if (T) {
                  const $ = pt(A.placement);
                  return $ === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  $ === "y";
                }
                return !0;
              }).map((A) => [A.placement, A.overflows.filter(($) => $ > 0).reduce(($, Q) => $ + Q, 0)]).sort((A, $) => A[1] - $[1])[0]) == null ? void 0 : R[0];
              K && (H = K);
              break;
            }
            case "initialPlacement":
              H = a;
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
function ol(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function sl(e) {
  return l0.some((t) => e[t] >= 0);
}
const w0 = function(e) {
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
          }), i = ol(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: sl(i)
            }
          };
        }
        case "escaped": {
          const s = await gr(t, {
            ...o,
            altBoundary: !0
          }), i = ol(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: sl(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ou = /* @__PURE__ */ new Set(["left", "top"]);
async function k0(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Pt(n), a = Yn(n), l = pt(n) === "y", d = ou.has(i) ? -1 : 1, c = s && l ? -1 : 1, m = At(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: b
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: m.mainAxis || 0,
    crossAxis: m.crossAxis || 0,
    alignmentAxis: m.alignmentAxis
  };
  return a && typeof b == "number" && (p = a === "end" ? b * -1 : b), l ? {
    x: p * c,
    y: f * d
  } : {
    x: f * d,
    y: p * c
  };
}
const C0 = function(e) {
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
      } = t, l = await k0(t, e);
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
}, T0 = function(e) {
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
          fn: (g) => {
            let {
              x: y,
              y: v
            } = g;
            return {
              x: y,
              y: v
            };
          }
        },
        ...l
      } = At(e, t), d = {
        x: n,
        y: r
      }, c = await gr(t, l), m = pt(Pt(o)), f = Ii(m);
      let p = d[f], b = d[m];
      if (s) {
        const g = f === "y" ? "top" : "left", y = f === "y" ? "bottom" : "right", v = p + c[g], x = p - c[y];
        p = Us(v, p, x);
      }
      if (i) {
        const g = m === "y" ? "top" : "left", y = m === "y" ? "bottom" : "right", v = b + c[g], x = b - c[y];
        b = Us(v, b, x);
      }
      const h = a.fn({
        ...t,
        [f]: p,
        [m]: b
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - r,
          enabled: {
            [f]: s,
            [m]: i
          }
        }
      };
    }
  };
}, E0 = function(e) {
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
        crossAxis: d = !0
      } = At(e, t), c = {
        x: n,
        y: r
      }, m = pt(o), f = Ii(m);
      let p = c[f], b = c[m];
      const h = At(a, t), g = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (l) {
        const x = f === "y" ? "height" : "width", M = s.reference[f] - s.floating[x] + g.mainAxis, w = s.reference[f] + s.reference[x] - g.mainAxis;
        p < M ? p = M : p > w && (p = w);
      }
      if (d) {
        var y, v;
        const x = f === "y" ? "width" : "height", M = ou.has(Pt(o)), w = s.reference[m] - s.floating[x] + (M && ((y = i.offset) == null ? void 0 : y[m]) || 0) + (M ? 0 : g.crossAxis), T = s.reference[m] + s.reference[x] + (M ? 0 : ((v = i.offset) == null ? void 0 : v[m]) || 0) - (M ? g.crossAxis : 0);
        b < w ? b = w : b > T && (b = T);
      }
      return {
        [f]: p,
        [m]: b
      };
    }
  };
}, S0 = function(e) {
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
        ...d
      } = At(e, t), c = await gr(t, d), m = Pt(o), f = Yn(o), p = pt(o) === "y", {
        width: b,
        height: h
      } = s.floating;
      let g, y;
      m === "top" || m === "bottom" ? (g = m, y = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (y = m, g = f === "end" ? "top" : "bottom");
      const v = h - c.top - c.bottom, x = b - c.left - c.right, M = Ut(h - c[g], v), w = Ut(b - c[y], x), T = !t.middlewareData.shift;
      let k = M, D = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (D = x), (r = t.middlewareData.shift) != null && r.enabled.y && (k = v), T && !f) {
        const E = Ke(c.left, 0), S = Ke(c.right, 0), P = Ke(c.top, 0), R = Ke(c.bottom, 0);
        p ? D = b - 2 * (E !== 0 || S !== 0 ? E + S : Ke(c.left, c.right)) : k = h - 2 * (P !== 0 || R !== 0 ? P + R : Ke(c.top, c.bottom));
      }
      await l({
        ...t,
        availableWidth: D,
        availableHeight: k
      });
      const N = await i.getDimensions(a.floating);
      return b !== N.width || h !== N.height ? {
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
function jn(e) {
  return su(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ge(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Nt(e) {
  var t;
  return (t = (su(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function su(e) {
  return Po() ? e instanceof Node || e instanceof Ge(e).Node : !1;
}
function lt(e) {
  return Po() ? e instanceof Element || e instanceof Ge(e).Element : !1;
}
function gt(e) {
  return Po() ? e instanceof HTMLElement || e instanceof Ge(e).HTMLElement : !1;
}
function il(e) {
  return !Po() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ge(e).ShadowRoot;
}
const M0 = /* @__PURE__ */ new Set(["inline", "contents"]);
function Tr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = ct(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !M0.has(o);
}
const D0 = /* @__PURE__ */ new Set(["table", "td", "th"]);
function R0(e) {
  return D0.has(jn(e));
}
const A0 = [":popover-open", ":modal"];
function Io(e) {
  return A0.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const P0 = ["transform", "translate", "scale", "rotate", "perspective"], I0 = ["transform", "translate", "scale", "rotate", "perspective", "filter"], L0 = ["paint", "layout", "strict", "content"];
function _i(e) {
  const t = Bi(), n = lt(e) ? ct(e) : e;
  return P0.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || I0.some((r) => (n.willChange || "").includes(r)) || L0.some((r) => (n.contain || "").includes(r));
}
function O0(e) {
  let t = Yt(e);
  for (; gt(t) && !In(t); ) {
    if (_i(t))
      return t;
    if (Io(t))
      return null;
    t = Yt(t);
  }
  return null;
}
function Bi() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const _0 = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function In(e) {
  return _0.has(jn(e));
}
function ct(e) {
  return Ge(e).getComputedStyle(e);
}
function Lo(e) {
  return lt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Yt(e) {
  if (jn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    il(e) && e.host || // Fallback.
    Nt(e)
  );
  return il(t) ? t.host : t;
}
function iu(e) {
  const t = Yt(e);
  return In(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : gt(t) && Tr(t) ? t : iu(t);
}
function br(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = iu(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Ge(o);
  if (s) {
    const a = js(i);
    return t.concat(i, i.visualViewport || [], Tr(o) ? o : [], a && n ? br(a) : []);
  }
  return t.concat(o, br(o, [], n));
}
function js(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function au(e) {
  const t = ct(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = gt(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = uo(n) !== s || uo(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function $i(e) {
  return lt(e) ? e : e.contextElement;
}
function Dn(e) {
  const t = $i(e);
  if (!gt(t))
    return ht(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = au(t);
  let i = (s ? uo(n.width) : n.width) / r, a = (s ? uo(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const B0 = /* @__PURE__ */ ht(0);
function lu(e) {
  const t = Ge(e);
  return !Bi() || !t.visualViewport ? B0 : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function $0(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ge(e) ? !1 : t;
}
function nn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = $i(e);
  let i = ht(1);
  t && (r ? lt(r) && (i = Dn(r)) : i = Dn(e));
  const a = $0(s, n, r) ? lu(s) : ht(0);
  let l = (o.left + a.x) / i.x, d = (o.top + a.y) / i.y, c = o.width / i.x, m = o.height / i.y;
  if (s) {
    const f = Ge(s), p = r && lt(r) ? Ge(r) : r;
    let b = f, h = js(b);
    for (; h && r && p !== b; ) {
      const g = Dn(h), y = h.getBoundingClientRect(), v = ct(h), x = y.left + (h.clientLeft + parseFloat(v.paddingLeft)) * g.x, M = y.top + (h.clientTop + parseFloat(v.paddingTop)) * g.y;
      l *= g.x, d *= g.y, c *= g.x, m *= g.y, l += x, d += M, b = Ge(h), h = js(b);
    }
  }
  return fo({
    width: c,
    height: m,
    x: l,
    y: d
  });
}
function Oo(e, t) {
  const n = Lo(e).scrollLeft;
  return t ? t.left + n : nn(Nt(e)).left + n;
}
function cu(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Oo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function W0(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = Nt(r), a = t ? Io(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = ht(1);
  const c = ht(0), m = gt(r);
  if ((m || !m && !s) && ((jn(r) !== "body" || Tr(i)) && (l = Lo(r)), gt(r))) {
    const p = nn(r);
    d = Dn(r), c.x = p.x + r.clientLeft, c.y = p.y + r.clientTop;
  }
  const f = i && !m && !s ? cu(i, l) : ht(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - l.scrollLeft * d.x + c.x + f.x,
    y: n.y * d.y - l.scrollTop * d.y + c.y + f.y
  };
}
function z0(e) {
  return Array.from(e.getClientRects());
}
function H0(e) {
  const t = Nt(e), n = Lo(e), r = e.ownerDocument.body, o = Ke(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Ke(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Oo(e);
  const a = -n.scrollTop;
  return ct(r).direction === "rtl" && (i += Ke(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const al = 25;
function F0(e, t) {
  const n = Ge(e), r = Nt(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, l = 0;
  if (o) {
    s = o.width, i = o.height;
    const c = Bi();
    (!c || c && t === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  const d = Oo(r);
  if (d <= 0) {
    const c = r.ownerDocument, m = c.body, f = getComputedStyle(m), p = c.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, b = Math.abs(r.clientWidth - m.clientWidth - p);
    b <= al && (s -= b);
  } else d <= al && (s += d);
  return {
    width: s,
    height: i,
    x: a,
    y: l
  };
}
const U0 = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Y0(e, t) {
  const n = nn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = gt(e) ? Dn(e) : ht(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, l = o * s.x, d = r * s.y;
  return {
    width: i,
    height: a,
    x: l,
    y: d
  };
}
function ll(e, t, n) {
  let r;
  if (t === "viewport")
    r = F0(e, n);
  else if (t === "document")
    r = H0(Nt(e));
  else if (lt(t))
    r = Y0(t, n);
  else {
    const o = lu(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return fo(r);
}
function uu(e, t) {
  const n = Yt(e);
  return n === t || !lt(n) || In(n) ? !1 : ct(n).position === "fixed" || uu(n, t);
}
function j0(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = br(e, [], !1).filter((a) => lt(a) && jn(a) !== "body"), o = null;
  const s = ct(e).position === "fixed";
  let i = s ? Yt(e) : e;
  for (; lt(i) && !In(i); ) {
    const a = ct(i), l = _i(i);
    !l && a.position === "fixed" && (o = null), (s ? !l && !o : !l && a.position === "static" && !!o && U0.has(o.position) || Tr(i) && !l && uu(e, i)) ? r = r.filter((c) => c !== i) : o = a, i = Yt(i);
  }
  return t.set(e, r), r;
}
function V0(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? Io(t) ? [] : j0(t, this._c) : [].concat(n), r], a = i[0], l = i.reduce((d, c) => {
    const m = ll(t, c, o);
    return d.top = Ke(m.top, d.top), d.right = Ut(m.right, d.right), d.bottom = Ut(m.bottom, d.bottom), d.left = Ke(m.left, d.left), d;
  }, ll(t, a, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function K0(e) {
  const {
    width: t,
    height: n
  } = au(e);
  return {
    width: t,
    height: n
  };
}
function q0(e, t, n) {
  const r = gt(t), o = Nt(t), s = n === "fixed", i = nn(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ht(0);
  function d() {
    l.x = Oo(o);
  }
  if (r || !r && !s)
    if ((jn(t) !== "body" || Tr(o)) && (a = Lo(t)), r) {
      const p = nn(t, !0, s, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else o && d();
  s && !r && o && d();
  const c = o && !r && !s ? cu(o, a) : ht(0), m = i.left + a.scrollLeft - l.x - c.x, f = i.top + a.scrollTop - l.y - c.y;
  return {
    x: m,
    y: f,
    width: i.width,
    height: i.height
  };
}
function bs(e) {
  return ct(e).position === "static";
}
function cl(e, t) {
  if (!gt(e) || ct(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Nt(e) === n && (n = n.ownerDocument.body), n;
}
function du(e, t) {
  const n = Ge(e);
  if (Io(e))
    return n;
  if (!gt(e)) {
    let o = Yt(e);
    for (; o && !In(o); ) {
      if (lt(o) && !bs(o))
        return o;
      o = Yt(o);
    }
    return n;
  }
  let r = cl(e, t);
  for (; r && R0(r) && bs(r); )
    r = cl(r, t);
  return r && In(r) && bs(r) && !_i(r) ? n : r || O0(e) || n;
}
const G0 = async function(e) {
  const t = this.getOffsetParent || du, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: q0(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Z0(e) {
  return ct(e).direction === "rtl";
}
const X0 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: W0,
  getDocumentElement: Nt,
  getClippingRect: V0,
  getOffsetParent: du,
  getElementRects: G0,
  getClientRects: z0,
  getDimensions: K0,
  getScale: Dn,
  isElement: lt,
  isRTL: Z0
};
function mu(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Q0(e, t) {
  let n = null, r;
  const o = Nt(e);
  function s() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), s();
    const d = e.getBoundingClientRect(), {
      left: c,
      top: m,
      width: f,
      height: p
    } = d;
    if (a || t(), !f || !p)
      return;
    const b = Vr(m), h = Vr(o.clientWidth - (c + f)), g = Vr(o.clientHeight - (m + p)), y = Vr(c), x = {
      rootMargin: -b + "px " + -h + "px " + -g + "px " + -y + "px",
      threshold: Ke(0, Ut(1, l)) || 1
    };
    let M = !0;
    function w(T) {
      const k = T[0].intersectionRatio;
      if (k !== l) {
        if (!M)
          return i();
        k ? i(!1, k) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      k === 1 && !mu(d, e.getBoundingClientRect()) && i(), M = !1;
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
function J0(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, d = $i(e), c = o || s ? [...d ? br(d) : [], ...br(t)] : [];
  c.forEach((y) => {
    o && y.addEventListener("scroll", n, {
      passive: !0
    }), s && y.addEventListener("resize", n);
  });
  const m = d && a ? Q0(d, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((y) => {
    let [v] = y;
    v && v.target === d && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = p) == null || x.observe(t);
    })), n();
  }), d && !l && p.observe(d), p.observe(t));
  let b, h = l ? nn(e) : null;
  l && g();
  function g() {
    const y = nn(e);
    h && !mu(h, y) && n(), h = y, b = requestAnimationFrame(g);
  }
  return n(), () => {
    var y;
    c.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), m?.(), (y = p) == null || y.disconnect(), p = null, l && cancelAnimationFrame(b);
  };
}
const eN = C0, tN = T0, nN = x0, rN = S0, oN = w0, ul = y0, sN = E0, iN = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: X0,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return N0(e, t, {
    ...o,
    platform: s
  });
};
var aN = typeof document < "u", lN = function() {
}, so = aN ? To : lN;
function po(e, t) {
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
        if (!po(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !po(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function fu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function dl(e, t) {
  const n = fu(e);
  return Math.round(t * n) / n;
}
function vs(e) {
  const t = C.useRef(e);
  return so(() => {
    t.current = e;
  }), t;
}
function cN(e) {
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
    open: d
  } = e, [c, m] = C.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = C.useState(r);
  po(f, r) || p(r);
  const [b, h] = C.useState(null), [g, y] = C.useState(null), v = C.useCallback((A) => {
    A !== T.current && (T.current = A, h(A));
  }, []), x = C.useCallback((A) => {
    A !== k.current && (k.current = A, y(A));
  }, []), M = s || b, w = i || g, T = C.useRef(null), k = C.useRef(null), D = C.useRef(c), N = l != null, E = vs(l), S = vs(o), P = vs(d), R = C.useCallback(() => {
    if (!T.current || !k.current)
      return;
    const A = {
      placement: t,
      strategy: n,
      middleware: f
    };
    S.current && (A.platform = S.current), iN(T.current, k.current, A).then(($) => {
      const Q = {
        ...$,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: P.current !== !1
      };
      I.current && !po(D.current, Q) && (D.current = Q, ic.flushSync(() => {
        m(Q);
      }));
    });
  }, [f, t, n, S, P]);
  so(() => {
    d === !1 && D.current.isPositioned && (D.current.isPositioned = !1, m((A) => ({
      ...A,
      isPositioned: !1
    })));
  }, [d]);
  const I = C.useRef(!1);
  so(() => (I.current = !0, () => {
    I.current = !1;
  }), []), so(() => {
    if (M && (T.current = M), w && (k.current = w), M && w) {
      if (E.current)
        return E.current(M, w, R);
      R();
    }
  }, [M, w, R, E, N]);
  const B = C.useMemo(() => ({
    reference: T,
    floating: k,
    setReference: v,
    setFloating: x
  }), [v, x]), H = C.useMemo(() => ({
    reference: M,
    floating: w
  }), [M, w]), K = C.useMemo(() => {
    const A = {
      position: n,
      left: 0,
      top: 0
    };
    if (!H.floating)
      return A;
    const $ = dl(H.floating, c.x), Q = dl(H.floating, c.y);
    return a ? {
      ...A,
      transform: "translate(" + $ + "px, " + Q + "px)",
      ...fu(H.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: $,
      top: Q
    };
  }, [n, a, H.floating, c.x, c.y]);
  return C.useMemo(() => ({
    ...c,
    update: R,
    refs: B,
    elements: H,
    floatingStyles: K
  }), [c, R, B, H, K]);
}
const uN = (e) => {
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
      return r && t(r) ? r.current != null ? ul({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? ul({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, dN = (e, t) => ({
  ...eN(e),
  options: [e, t]
}), mN = (e, t) => ({
  ...tN(e),
  options: [e, t]
}), fN = (e, t) => ({
  ...sN(e),
  options: [e, t]
}), pN = (e, t) => ({
  ...nN(e),
  options: [e, t]
}), hN = (e, t) => ({
  ...rN(e),
  options: [e, t]
}), gN = (e, t) => ({
  ...oN(e),
  options: [e, t]
}), bN = (e, t) => ({
  ...uN(e),
  options: [e, t]
});
var vN = "Arrow", pu = C.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ W(
    Oe.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ W("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
pu.displayName = vN;
var NN = pu;
function yN(e) {
  const [t, n] = C.useState(void 0);
  return Ft(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let i, a;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, d = Array.isArray(l) ? l[0] : l;
          i = d.inlineSize, a = d.blockSize;
        } else
          i = e.offsetWidth, a = e.offsetHeight;
        n({ width: i, height: a });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Wi = "Popper", [hu, _o] = Un(Wi), [xN, gu] = hu(Wi), bu = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = C.useState(null);
  return /* @__PURE__ */ W(xN, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
bu.displayName = Wi;
var vu = "PopperAnchor", Nu = C.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = gu(vu, n), i = C.useRef(null), a = $e(t, i), l = C.useRef(null);
    return C.useEffect(() => {
      const d = l.current;
      l.current = r?.current || i.current, d !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ W(Oe.div, { ...o, ref: a });
  }
);
Nu.displayName = vu;
var zi = "PopperContent", [wN, kN] = hu(zi), yu = C.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: i = 0,
      arrowPadding: a = 0,
      avoidCollisions: l = !0,
      collisionBoundary: d = [],
      collisionPadding: c = 0,
      sticky: m = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: b,
      ...h
    } = e, g = gu(zi, n), [y, v] = C.useState(null), x = $e(t, (Y) => v(Y)), [M, w] = C.useState(null), T = yN(M), k = T?.width ?? 0, D = T?.height ?? 0, N = r + (s !== "center" ? "-" + s : ""), E = typeof c == "number" ? c : { top: 0, right: 0, bottom: 0, left: 0, ...c }, S = Array.isArray(d) ? d : [d], P = S.length > 0, R = {
      padding: E,
      boundary: S.filter(TN),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: P
    }, { refs: I, floatingStyles: B, placement: H, isPositioned: K, middlewareData: A } = cN({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: N,
      whileElementsMounted: (...Y) => J0(...Y, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        dN({ mainAxis: o + D, alignmentAxis: i }),
        l && mN({
          mainAxis: !0,
          crossAxis: !1,
          limiter: m === "partial" ? fN() : void 0,
          ...R
        }),
        l && pN({ ...R }),
        hN({
          ...R,
          apply: ({ elements: Y, rects: te, availableWidth: ve, availableHeight: we }) => {
            const { width: Te, height: Ie } = te.reference, Je = Y.floating.style;
            Je.setProperty("--radix-popper-available-width", `${ve}px`), Je.setProperty("--radix-popper-available-height", `${we}px`), Je.setProperty("--radix-popper-anchor-width", `${Te}px`), Je.setProperty("--radix-popper-anchor-height", `${Ie}px`);
          }
        }),
        M && bN({ element: M, padding: a }),
        EN({ arrowWidth: k, arrowHeight: D }),
        f && gN({ strategy: "referenceHidden", ...R })
      ]
    }), [$, Q] = ku(H), se = Rt(b);
    Ft(() => {
      K && se?.();
    }, [K, se]);
    const ie = A.arrow?.x, re = A.arrow?.y, oe = A.arrow?.centerOffset !== 0, [O, U] = C.useState();
    return Ft(() => {
      y && U(window.getComputedStyle(y).zIndex);
    }, [y]), /* @__PURE__ */ W(
      "div",
      {
        ref: I.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...B,
          transform: K ? B.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: O,
          "--radix-popper-transform-origin": [
            A.transformOrigin?.x,
            A.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...A.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ W(
          wN,
          {
            scope: n,
            placedSide: $,
            onArrowChange: w,
            arrowX: ie,
            arrowY: re,
            shouldHideArrow: oe,
            children: /* @__PURE__ */ W(
              Oe.div,
              {
                "data-side": $,
                "data-align": Q,
                ...h,
                ref: x,
                style: {
                  ...h.style,
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
yu.displayName = zi;
var xu = "PopperArrow", CN = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, wu = C.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = kN(xu, r), i = CN[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ W(
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
        children: /* @__PURE__ */ W(
          NN,
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
wu.displayName = xu;
function TN(e) {
  return e !== null;
}
var EN = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, l = i ? 0 : e.arrowHeight, [d, c] = ku(n), m = { start: "0%", center: "50%", end: "100%" }[c], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + l / 2;
    let b = "", h = "";
    return d === "bottom" ? (b = i ? m : `${f}px`, h = `${-l}px`) : d === "top" ? (b = i ? m : `${f}px`, h = `${r.floating.height + l}px`) : d === "right" ? (b = `${-l}px`, h = i ? m : `${p}px`) : d === "left" && (b = `${r.floating.width + l}px`, h = i ? m : `${p}px`), { data: { x: b, y: h } };
  }
});
function ku(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Cu = bu, Tu = Nu, Eu = yu, Su = wu, SN = "Portal", Hi = C.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = C.useState(!1);
  Ft(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? zf.createPortal(/* @__PURE__ */ W(Oe.div, { ...r, ref: t }), i) : null;
});
Hi.displayName = SN;
function MN(e, t) {
  return C.useReducer((n, r) => t[n][r] ?? n, e);
}
var on = (e) => {
  const { present: t, children: n } = e, r = DN(t), o = typeof n == "function" ? n({ present: r.isPresent }) : C.Children.only(n), s = $e(r.ref, RN(o));
  return typeof n == "function" || r.isPresent ? C.cloneElement(o, { ref: s }) : null;
};
on.displayName = "Presence";
function DN(e) {
  const [t, n] = C.useState(), r = C.useRef(null), o = C.useRef(e), s = C.useRef("none"), i = e ? "mounted" : "unmounted", [a, l] = MN(i, {
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
    const d = Kr(r.current);
    s.current = a === "mounted" ? d : "none";
  }, [a]), Ft(() => {
    const d = r.current, c = o.current;
    if (c !== e) {
      const f = s.current, p = Kr(d);
      e ? l("MOUNT") : p === "none" || d?.display === "none" ? l("UNMOUNT") : l(c && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), Ft(() => {
    if (t) {
      let d;
      const c = t.ownerDocument.defaultView ?? window, m = (p) => {
        const h = Kr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && h && (l("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = c.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Kr(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", m), t.addEventListener("animationend", m), () => {
        c.clearTimeout(d), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", m), t.removeEventListener("animationend", m);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: C.useCallback((d) => {
      r.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Kr(e) {
  return e?.animationName || "none";
}
function RN(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Ns = "rovingFocusGroup.onEntryFocus", AN = { bubbles: !1, cancelable: !0 }, Er = "RovingFocusGroup", [Vs, Mu, PN] = Xc(Er), [IN, Du] = Un(
  Er,
  [PN]
), [LN, ON] = IN(Er), Ru = C.forwardRef(
  (e, t) => /* @__PURE__ */ W(Vs.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ W(Vs.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ W(_N, { ...e, ref: t }) }) })
);
Ru.displayName = Er;
var _N = C.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: i,
    defaultCurrentTabStopId: a,
    onCurrentTabStopIdChange: l,
    onEntryFocus: d,
    preventScrollOnEntryFocus: c = !1,
    ...m
  } = e, f = C.useRef(null), p = $e(t, f), b = Qc(s), [h, g] = Ai({
    prop: i,
    defaultProp: a ?? null,
    onChange: l,
    caller: Er
  }), [y, v] = C.useState(!1), x = Rt(d), M = Mu(n), w = C.useRef(!1), [T, k] = C.useState(0);
  return C.useEffect(() => {
    const D = f.current;
    if (D)
      return D.addEventListener(Ns, x), () => D.removeEventListener(Ns, x);
  }, [x]), /* @__PURE__ */ W(
    LN,
    {
      scope: n,
      orientation: r,
      dir: b,
      loop: o,
      currentTabStopId: h,
      onItemFocus: C.useCallback(
        (D) => g(D),
        [g]
      ),
      onItemShiftTab: C.useCallback(() => v(!0), []),
      onFocusableItemAdd: C.useCallback(
        () => k((D) => D + 1),
        []
      ),
      onFocusableItemRemove: C.useCallback(
        () => k((D) => D - 1),
        []
      ),
      children: /* @__PURE__ */ W(
        Oe.div,
        {
          tabIndex: y || T === 0 ? -1 : 0,
          "data-orientation": r,
          ...m,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: de(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: de(e.onFocus, (D) => {
            const N = !w.current;
            if (D.target === D.currentTarget && N && !y) {
              const E = new CustomEvent(Ns, AN);
              if (D.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
                const S = M().filter((H) => H.focusable), P = S.find((H) => H.active), R = S.find((H) => H.id === h), B = [P, R, ...S].filter(
                  Boolean
                ).map((H) => H.ref.current);
                Iu(B, c);
              }
            }
            w.current = !1;
          }),
          onBlur: de(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), Au = "RovingFocusGroupItem", Pu = C.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, l = co(), d = s || l, c = ON(Au, n), m = c.currentTabStopId === d, f = Mu(n), { onFocusableItemAdd: p, onFocusableItemRemove: b, currentTabStopId: h } = c;
    return C.useEffect(() => {
      if (r)
        return p(), () => b();
    }, [r, p, b]), /* @__PURE__ */ W(
      Vs.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ W(
          Oe.span,
          {
            tabIndex: m ? 0 : -1,
            "data-orientation": c.orientation,
            ...a,
            ref: t,
            onMouseDown: de(e.onMouseDown, (g) => {
              r ? c.onItemFocus(d) : g.preventDefault();
            }),
            onFocus: de(e.onFocus, () => c.onItemFocus(d)),
            onKeyDown: de(e.onKeyDown, (g) => {
              if (g.key === "Tab" && g.shiftKey) {
                c.onItemShiftTab();
                return;
              }
              if (g.target !== g.currentTarget) return;
              const y = WN(g, c.orientation, c.dir);
              if (y !== void 0) {
                if (g.metaKey || g.ctrlKey || g.altKey || g.shiftKey) return;
                g.preventDefault();
                let x = f().filter((M) => M.focusable).map((M) => M.ref.current);
                if (y === "last") x.reverse();
                else if (y === "prev" || y === "next") {
                  y === "prev" && x.reverse();
                  const M = x.indexOf(g.currentTarget);
                  x = c.loop ? zN(x, M + 1) : x.slice(M + 1);
                }
                setTimeout(() => Iu(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: m, hasTabStop: h != null }) : i
          }
        )
      }
    );
  }
);
Pu.displayName = Au;
var BN = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function $N(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function WN(e, t, n) {
  const r = $N(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return BN[r];
}
function Iu(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function zN(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var HN = Ru, FN = Pu, UN = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Nn = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new WeakMap(), Gr = {}, ys = 0, Lu = function(e) {
  return e && (e.host || Lu(e.parentNode));
}, YN = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Lu(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, jN = function(e, t, n, r) {
  var o = YN(t, Array.isArray(e) ? e : [e]);
  Gr[n] || (Gr[n] = /* @__PURE__ */ new WeakMap());
  var s = Gr[n], i = [], a = /* @__PURE__ */ new Set(), l = new Set(o), d = function(m) {
    !m || a.has(m) || (a.add(m), d(m.parentNode));
  };
  o.forEach(d);
  var c = function(m) {
    !m || l.has(m) || Array.prototype.forEach.call(m.children, function(f) {
      if (a.has(f))
        c(f);
      else
        try {
          var p = f.getAttribute(r), b = p !== null && p !== "false", h = (Nn.get(f) || 0) + 1, g = (s.get(f) || 0) + 1;
          Nn.set(f, h), s.set(f, g), i.push(f), h === 1 && b && qr.set(f, !0), g === 1 && f.setAttribute(n, "true"), b || f.setAttribute(r, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", f, y);
        }
    });
  };
  return c(t), a.clear(), ys++, function() {
    i.forEach(function(m) {
      var f = Nn.get(m) - 1, p = s.get(m) - 1;
      Nn.set(m, f), s.set(m, p), f || (qr.has(m) || m.removeAttribute(r), qr.delete(m)), p || m.removeAttribute(n);
    }), ys--, ys || (Nn = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new WeakMap(), Gr = {});
  };
}, VN = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = UN(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), jN(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, mt = function() {
  return mt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, mt.apply(this, arguments);
};
function Ou(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function KN(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var io = "right-scroll-bar-position", ao = "width-before-scroll-bar", qN = "with-scroll-bars-hidden", GN = "--removed-body-scroll-bar-size";
function xs(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function ZN(e, t) {
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
var XN = typeof window < "u" ? C.useLayoutEffect : C.useEffect, ml = /* @__PURE__ */ new WeakMap();
function QN(e, t) {
  var n = ZN(null, function(r) {
    return e.forEach(function(o) {
      return xs(o, r);
    });
  });
  return XN(function() {
    var r = ml.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || xs(a, null);
      }), s.forEach(function(a) {
        o.has(a) || xs(a, i);
      });
    }
    ml.set(n, e);
  }, [e]), n;
}
function JN(e) {
  return e;
}
function ey(e, t) {
  t === void 0 && (t = JN);
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
        var c = i;
        i = [], c.forEach(s);
      }, d = function() {
        return Promise.resolve().then(l);
      };
      d(), n = {
        push: function(c) {
          i.push(c), d();
        },
        filter: function(c) {
          return i = i.filter(c), n;
        }
      };
    }
  };
  return o;
}
function ty(e) {
  e === void 0 && (e = {});
  var t = ey(null);
  return t.options = mt({ async: !0, ssr: !1 }, e), t;
}
var _u = function(e) {
  var t = e.sideCar, n = Ou(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return C.createElement(r, mt({}, n));
};
_u.isSideCarExport = !0;
function ny(e, t) {
  return e.useMedium(t), _u;
}
var Bu = ty(), ws = function() {
}, Bo = C.forwardRef(function(e, t) {
  var n = C.useRef(null), r = C.useState({
    onScrollCapture: ws,
    onWheelCapture: ws,
    onTouchMoveCapture: ws
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, l = e.className, d = e.removeScrollBar, c = e.enabled, m = e.shards, f = e.sideCar, p = e.noRelative, b = e.noIsolation, h = e.inert, g = e.allowPinchZoom, y = e.as, v = y === void 0 ? "div" : y, x = e.gapMode, M = Ou(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, T = QN([n, t]), k = mt(mt({}, M), o);
  return C.createElement(
    C.Fragment,
    null,
    c && C.createElement(w, { sideCar: Bu, removeScrollBar: d, shards: m, noRelative: p, noIsolation: b, inert: h, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: x }),
    i ? C.cloneElement(C.Children.only(a), mt(mt({}, k), { ref: T })) : C.createElement(v, mt({}, k, { className: l, ref: T }), a)
  );
});
Bo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Bo.classNames = {
  fullWidth: ao,
  zeroRight: io
};
var ry = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function oy() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = ry();
  return t && e.setAttribute("nonce", t), e;
}
function sy(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function iy(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var ay = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = oy()) && (sy(t, n), iy(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, ly = function() {
  var e = ay();
  return function(t, n) {
    C.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, $u = function() {
  var e = ly(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, cy = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ks = function(e) {
  return parseInt(e || "", 10) || 0;
}, uy = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ks(n), ks(r), ks(o)];
}, dy = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return cy;
  var t = uy(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, my = $u(), Rn = "data-scroll-locked", fy = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(qN, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(Rn, `] {
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
  
  .`).concat(io, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(ao, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(io, " .").concat(io, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(ao, " .").concat(ao, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Rn, `] {
    `).concat(GN, ": ").concat(a, `px;
  }
`);
}, fl = function() {
  var e = parseInt(document.body.getAttribute(Rn) || "0", 10);
  return isFinite(e) ? e : 0;
}, py = function() {
  C.useEffect(function() {
    return document.body.setAttribute(Rn, (fl() + 1).toString()), function() {
      var e = fl() - 1;
      e <= 0 ? document.body.removeAttribute(Rn) : document.body.setAttribute(Rn, e.toString());
    };
  }, []);
}, hy = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  py();
  var s = C.useMemo(function() {
    return dy(o);
  }, [o]);
  return C.createElement(my, { styles: fy(s, !t, o, n ? "" : "!important") });
}, Ks = !1;
if (typeof window < "u")
  try {
    var Zr = Object.defineProperty({}, "passive", {
      get: function() {
        return Ks = !0, !0;
      }
    });
    window.addEventListener("test", Zr, Zr), window.removeEventListener("test", Zr, Zr);
  } catch {
    Ks = !1;
  }
var yn = Ks ? { passive: !1 } : !1, gy = function(e) {
  return e.tagName === "TEXTAREA";
}, Wu = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !gy(e) && n[t] === "visible")
  );
}, by = function(e) {
  return Wu(e, "overflowY");
}, vy = function(e) {
  return Wu(e, "overflowX");
}, pl = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = zu(e, r);
    if (o) {
      var s = Hu(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Ny = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, yy = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, zu = function(e, t) {
  return e === "v" ? by(t) : vy(t);
}, Hu = function(e, t) {
  return e === "v" ? Ny(t) : yy(t);
}, xy = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, wy = function(e, t, n, r, o) {
  var s = xy(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, l = t.contains(a), d = !1, c = i > 0, m = 0, f = 0;
  do {
    if (!a)
      break;
    var p = Hu(e, a), b = p[0], h = p[1], g = p[2], y = h - g - s * b;
    (b || y) && zu(e, a) && (m += y, f += b);
    var v = a.parentNode;
    a = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !l && a !== document.body || // self content
    l && (t.contains(a) || t === a)
  );
  return (c && Math.abs(m) < 1 || !c && Math.abs(f) < 1) && (d = !0), d;
}, Xr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, hl = function(e) {
  return [e.deltaX, e.deltaY];
}, gl = function(e) {
  return e && "current" in e ? e.current : e;
}, ky = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Cy = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Ty = 0, xn = [];
function Ey(e) {
  var t = C.useRef([]), n = C.useRef([0, 0]), r = C.useRef(), o = C.useState(Ty++)[0], s = C.useState($u)[0], i = C.useRef(e);
  C.useEffect(function() {
    i.current = e;
  }, [e]), C.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var h = KN([e.lockRef.current], (e.shards || []).map(gl), !0).filter(Boolean);
      return h.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), h.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = C.useCallback(function(h, g) {
    if ("touches" in h && h.touches.length === 2 || h.type === "wheel" && h.ctrlKey)
      return !i.current.allowPinchZoom;
    var y = Xr(h), v = n.current, x = "deltaX" in h ? h.deltaX : v[0] - y[0], M = "deltaY" in h ? h.deltaY : v[1] - y[1], w, T = h.target, k = Math.abs(x) > Math.abs(M) ? "h" : "v";
    if ("touches" in h && k === "h" && T.type === "range")
      return !1;
    var D = pl(k, T);
    if (!D)
      return !0;
    if (D ? w = k : (w = k === "v" ? "h" : "v", D = pl(k, T)), !D)
      return !1;
    if (!r.current && "changedTouches" in h && (x || M) && (r.current = w), !w)
      return !0;
    var N = r.current || w;
    return wy(N, g, h, N === "h" ? x : M);
  }, []), l = C.useCallback(function(h) {
    var g = h;
    if (!(!xn.length || xn[xn.length - 1] !== s)) {
      var y = "deltaY" in g ? hl(g) : Xr(g), v = t.current.filter(function(w) {
        return w.name === g.type && (w.target === g.target || g.target === w.shadowParent) && ky(w.delta, y);
      })[0];
      if (v && v.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!v) {
        var x = (i.current.shards || []).map(gl).filter(Boolean).filter(function(w) {
          return w.contains(g.target);
        }), M = x.length > 0 ? a(g, x[0]) : !i.current.noIsolation;
        M && g.cancelable && g.preventDefault();
      }
    }
  }, []), d = C.useCallback(function(h, g, y, v) {
    var x = { name: h, delta: g, target: y, should: v, shadowParent: Sy(y) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== x;
      });
    }, 1);
  }, []), c = C.useCallback(function(h) {
    n.current = Xr(h), r.current = void 0;
  }, []), m = C.useCallback(function(h) {
    d(h.type, hl(h), h.target, a(h, e.lockRef.current));
  }, []), f = C.useCallback(function(h) {
    d(h.type, Xr(h), h.target, a(h, e.lockRef.current));
  }, []);
  C.useEffect(function() {
    return xn.push(s), e.setCallbacks({
      onScrollCapture: m,
      onWheelCapture: m,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, yn), document.addEventListener("touchmove", l, yn), document.addEventListener("touchstart", c, yn), function() {
      xn = xn.filter(function(h) {
        return h !== s;
      }), document.removeEventListener("wheel", l, yn), document.removeEventListener("touchmove", l, yn), document.removeEventListener("touchstart", c, yn);
    };
  }, []);
  var p = e.removeScrollBar, b = e.inert;
  return C.createElement(
    C.Fragment,
    null,
    b ? C.createElement(s, { styles: Cy(o) }) : null,
    p ? C.createElement(hy, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Sy(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const My = ny(Bu, Ey);
var Fu = C.forwardRef(function(e, t) {
  return C.createElement(Bo, mt({}, e, { ref: t, sideCar: My }));
});
Fu.classNames = Bo.classNames;
var qs = ["Enter", " "], Dy = ["ArrowDown", "PageUp", "Home"], Uu = ["ArrowUp", "PageDown", "End"], Ry = [...Dy, ...Uu], Ay = {
  ltr: [...qs, "ArrowRight"],
  rtl: [...qs, "ArrowLeft"]
}, Py = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Sr = "Menu", [vr, Iy, Ly] = Xc(Sr), [sn, Yu] = Un(Sr, [
  Ly,
  _o,
  Du
]), $o = _o(), ju = Du(), [Oy, an] = sn(Sr), [_y, Mr] = sn(Sr), Vu = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = $o(t), [l, d] = C.useState(null), c = C.useRef(!1), m = Rt(s), f = Qc(o);
  return C.useEffect(() => {
    const p = () => {
      c.current = !0, document.addEventListener("pointerdown", b, { capture: !0, once: !0 }), document.addEventListener("pointermove", b, { capture: !0, once: !0 });
    }, b = () => c.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", b, { capture: !0 }), document.removeEventListener("pointermove", b, { capture: !0 });
    };
  }, []), /* @__PURE__ */ W(Cu, { ...a, children: /* @__PURE__ */ W(
    Oy,
    {
      scope: t,
      open: n,
      onOpenChange: m,
      content: l,
      onContentChange: d,
      children: /* @__PURE__ */ W(
        _y,
        {
          scope: t,
          onClose: C.useCallback(() => m(!1), [m]),
          isUsingKeyboardRef: c,
          dir: f,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
Vu.displayName = Sr;
var By = "MenuAnchor", Fi = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = $o(n);
    return /* @__PURE__ */ W(Tu, { ...o, ...r, ref: t });
  }
);
Fi.displayName = By;
var Ui = "MenuPortal", [$y, Ku] = sn(Ui, {
  forceMount: void 0
}), qu = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = an(Ui, t);
  return /* @__PURE__ */ W($y, { scope: t, forceMount: n, children: /* @__PURE__ */ W(on, { present: n || s.open, children: /* @__PURE__ */ W(Hi, { asChild: !0, container: o, children: r }) }) });
};
qu.displayName = Ui;
var rt = "MenuContent", [Wy, Yi] = sn(rt), Gu = C.forwardRef(
  (e, t) => {
    const n = Ku(rt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = an(rt, e.__scopeMenu), i = Mr(rt, e.__scopeMenu);
    return /* @__PURE__ */ W(vr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ W(on, { present: r || s.open, children: /* @__PURE__ */ W(vr.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ W(zy, { ...o, ref: t }) : /* @__PURE__ */ W(Hy, { ...o, ref: t }) }) }) });
  }
), zy = C.forwardRef(
  (e, t) => {
    const n = an(rt, e.__scopeMenu), r = C.useRef(null), o = $e(t, r);
    return C.useEffect(() => {
      const s = r.current;
      if (s) return VN(s);
    }, []), /* @__PURE__ */ W(
      ji,
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
), Hy = C.forwardRef((e, t) => {
  const n = an(rt, e.__scopeMenu);
  return /* @__PURE__ */ W(
    ji,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Fy = /* @__PURE__ */ hr("MenuContent.ScrollLock"), ji = C.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: s,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: a,
      onEntryFocus: l,
      onEscapeKeyDown: d,
      onPointerDownOutside: c,
      onFocusOutside: m,
      onInteractOutside: f,
      onDismiss: p,
      disableOutsideScroll: b,
      ...h
    } = e, g = an(rt, n), y = Mr(rt, n), v = $o(n), x = ju(n), M = Iy(n), [w, T] = C.useState(null), k = C.useRef(null), D = $e(t, k, g.onContentChange), N = C.useRef(0), E = C.useRef(""), S = C.useRef(0), P = C.useRef(null), R = C.useRef("right"), I = C.useRef(0), B = b ? Fu : C.Fragment, H = b ? { as: Fy, allowPinchZoom: !0 } : void 0, K = ($) => {
      const Q = E.current + $, se = M().filter((Y) => !Y.disabled), ie = document.activeElement, re = se.find((Y) => Y.ref.current === ie)?.textValue, oe = se.map((Y) => Y.textValue), O = ex(oe, Q, re), U = se.find((Y) => Y.textValue === O)?.ref.current;
      (function Y(te) {
        E.current = te, window.clearTimeout(N.current), te !== "" && (N.current = window.setTimeout(() => Y(""), 1e3));
      })(Q), U && setTimeout(() => U.focus());
    };
    C.useEffect(() => () => window.clearTimeout(N.current), []), Qv();
    const A = C.useCallback(($) => R.current === P.current?.side && nx($, P.current?.area), []);
    return /* @__PURE__ */ W(
      Wy,
      {
        scope: n,
        searchRef: E,
        onItemEnter: C.useCallback(
          ($) => {
            A($) && $.preventDefault();
          },
          [A]
        ),
        onItemLeave: C.useCallback(
          ($) => {
            A($) || (k.current?.focus(), T(null));
          },
          [A]
        ),
        onTriggerLeave: C.useCallback(
          ($) => {
            A($) && $.preventDefault();
          },
          [A]
        ),
        pointerGraceTimerRef: S,
        onPointerGraceIntentChange: C.useCallback(($) => {
          P.current = $;
        }, []),
        children: /* @__PURE__ */ W(B, { ...H, children: /* @__PURE__ */ W(
          tu,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: de(s, ($) => {
              $.preventDefault(), k.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ W(
              Pi,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: d,
                onPointerDownOutside: c,
                onFocusOutside: m,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ W(
                  HN,
                  {
                    asChild: !0,
                    ...x,
                    dir: y.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: T,
                    onEntryFocus: de(l, ($) => {
                      y.isUsingKeyboardRef.current || $.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ W(
                      Eu,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": dd(g.open),
                        "data-radix-menu-content": "",
                        dir: y.dir,
                        ...v,
                        ...h,
                        ref: D,
                        style: { outline: "none", ...h.style },
                        onKeyDown: de(h.onKeyDown, ($) => {
                          const se = $.target.closest("[data-radix-menu-content]") === $.currentTarget, ie = $.ctrlKey || $.altKey || $.metaKey, re = $.key.length === 1;
                          se && ($.key === "Tab" && $.preventDefault(), !ie && re && K($.key));
                          const oe = k.current;
                          if ($.target !== oe || !Ry.includes($.key)) return;
                          $.preventDefault();
                          const U = M().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
                          Uu.includes($.key) && U.reverse(), Qy(U);
                        }),
                        onBlur: de(e.onBlur, ($) => {
                          $.currentTarget.contains($.target) || (window.clearTimeout(N.current), E.current = "");
                        }),
                        onPointerMove: de(
                          e.onPointerMove,
                          Nr(($) => {
                            const Q = $.target, se = I.current !== $.clientX;
                            if ($.currentTarget.contains(Q) && se) {
                              const ie = $.clientX > I.current ? "right" : "left";
                              R.current = ie, I.current = $.clientX;
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
Gu.displayName = rt;
var Uy = "MenuGroup", Vi = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ W(Oe.div, { role: "group", ...r, ref: t });
  }
);
Vi.displayName = Uy;
var Yy = "MenuLabel", Zu = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ W(Oe.div, { ...r, ref: t });
  }
);
Zu.displayName = Yy;
var ho = "MenuItem", bl = "menu.itemSelect", Wo = C.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = C.useRef(null), i = Mr(ho, e.__scopeMenu), a = Yi(ho, e.__scopeMenu), l = $e(t, s), d = C.useRef(!1), c = () => {
      const m = s.current;
      if (!n && m) {
        const f = new CustomEvent(bl, { bubbles: !0, cancelable: !0 });
        m.addEventListener(bl, (p) => r?.(p), { once: !0 }), Zc(m, f), f.defaultPrevented ? d.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ W(
      Xu,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: de(e.onClick, c),
        onPointerDown: (m) => {
          e.onPointerDown?.(m), d.current = !0;
        },
        onPointerUp: de(e.onPointerUp, (m) => {
          d.current || m.currentTarget?.click();
        }),
        onKeyDown: de(e.onKeyDown, (m) => {
          const f = a.searchRef.current !== "";
          n || f && m.key === " " || qs.includes(m.key) && (m.currentTarget.click(), m.preventDefault());
        })
      }
    );
  }
);
Wo.displayName = ho;
var Xu = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = Yi(ho, n), a = ju(n), l = C.useRef(null), d = $e(t, l), [c, m] = C.useState(!1), [f, p] = C.useState("");
    return C.useEffect(() => {
      const b = l.current;
      b && p((b.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ W(
      vr.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ W(FN, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ W(
          Oe.div,
          {
            role: "menuitem",
            "data-highlighted": c ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: d,
            onPointerMove: de(
              e.onPointerMove,
              Nr((b) => {
                r ? i.onItemLeave(b) : (i.onItemEnter(b), b.defaultPrevented || b.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: de(
              e.onPointerLeave,
              Nr((b) => i.onItemLeave(b))
            ),
            onFocus: de(e.onFocus, () => m(!0)),
            onBlur: de(e.onBlur, () => m(!1))
          }
        ) })
      }
    );
  }
), jy = "MenuCheckboxItem", Qu = C.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ W(rd, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ W(
      Wo,
      {
        role: "menuitemcheckbox",
        "aria-checked": go(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": qi(n),
        onSelect: de(
          o.onSelect,
          () => r?.(go(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Qu.displayName = jy;
var Ju = "MenuRadioGroup", [Vy, Ky] = sn(
  Ju,
  { value: void 0, onValueChange: () => {
  } }
), ed = C.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = Rt(r);
    return /* @__PURE__ */ W(Vy, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ W(Vi, { ...o, ref: t }) });
  }
);
ed.displayName = Ju;
var td = "MenuRadioItem", nd = C.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Ky(td, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ W(rd, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ W(
      Wo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": qi(s),
        onSelect: de(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
nd.displayName = td;
var Ki = "MenuItemIndicator", [rd, qy] = sn(
  Ki,
  { checked: !1 }
), od = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = qy(Ki, n);
    return /* @__PURE__ */ W(
      on,
      {
        present: r || go(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ W(
          Oe.span,
          {
            ...o,
            ref: t,
            "data-state": qi(s.checked)
          }
        )
      }
    );
  }
);
od.displayName = Ki;
var Gy = "MenuSeparator", sd = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ W(
      Oe.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
sd.displayName = Gy;
var Zy = "MenuArrow", id = C.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = $o(n);
    return /* @__PURE__ */ W(Su, { ...o, ...r, ref: t });
  }
);
id.displayName = Zy;
var Xy = "MenuSub", [PC, ad] = sn(Xy), ar = "MenuSubTrigger", ld = C.forwardRef(
  (e, t) => {
    const n = an(ar, e.__scopeMenu), r = Mr(ar, e.__scopeMenu), o = ad(ar, e.__scopeMenu), s = Yi(ar, e.__scopeMenu), i = C.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: l } = s, d = { __scopeMenu: e.__scopeMenu }, c = C.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return C.useEffect(() => c, [c]), C.useEffect(() => {
      const m = a.current;
      return () => {
        window.clearTimeout(m), l(null);
      };
    }, [a, l]), /* @__PURE__ */ W(Fi, { asChild: !0, ...d, children: /* @__PURE__ */ W(
      Xu,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": dd(n.open),
        ...e,
        ref: Ro(t, o.onTriggerChange),
        onClick: (m) => {
          e.onClick?.(m), !(e.disabled || m.defaultPrevented) && (m.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: de(
          e.onPointerMove,
          Nr((m) => {
            s.onItemEnter(m), !m.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), c();
            }, 100));
          })
        ),
        onPointerLeave: de(
          e.onPointerLeave,
          Nr((m) => {
            c();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, b = p === "right", h = b ? -5 : 5, g = f[b ? "left" : "right"], y = f[b ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: m.clientX + h, y: m.clientY },
                  { x: g, y: f.top },
                  { x: y, y: f.top },
                  { x: y, y: f.bottom },
                  { x: g, y: f.bottom }
                ],
                side: p
              }), window.clearTimeout(a.current), a.current = window.setTimeout(
                () => s.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (s.onTriggerLeave(m), m.defaultPrevented) return;
              s.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: de(e.onKeyDown, (m) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && m.key === " " || Ay[r.dir].includes(m.key) && (n.onOpenChange(!0), n.content?.focus(), m.preventDefault());
        })
      }
    ) });
  }
);
ld.displayName = ar;
var cd = "MenuSubContent", ud = C.forwardRef(
  (e, t) => {
    const n = Ku(rt, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = an(rt, e.__scopeMenu), i = Mr(rt, e.__scopeMenu), a = ad(cd, e.__scopeMenu), l = C.useRef(null), d = $e(t, l);
    return /* @__PURE__ */ W(vr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ W(on, { present: r || s.open, children: /* @__PURE__ */ W(vr.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ W(
      ji,
      {
        id: a.contentId,
        "aria-labelledby": a.triggerId,
        ...o,
        ref: d,
        align: "start",
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (c) => {
          i.isUsingKeyboardRef.current && l.current?.focus(), c.preventDefault();
        },
        onCloseAutoFocus: (c) => c.preventDefault(),
        onFocusOutside: de(e.onFocusOutside, (c) => {
          c.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: de(e.onEscapeKeyDown, (c) => {
          i.onClose(), c.preventDefault();
        }),
        onKeyDown: de(e.onKeyDown, (c) => {
          const m = c.currentTarget.contains(c.target), f = Py[i.dir].includes(c.key);
          m && f && (s.onOpenChange(!1), a.trigger?.focus(), c.preventDefault());
        })
      }
    ) }) }) });
  }
);
ud.displayName = cd;
function dd(e) {
  return e ? "open" : "closed";
}
function go(e) {
  return e === "indeterminate";
}
function qi(e) {
  return go(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Qy(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Jy(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function ex(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = Jy(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((d) => d !== n));
  const l = i.find(
    (d) => d.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function tx(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], l = t[i], d = a.x, c = a.y, m = l.x, f = l.y;
    c > r != f > r && n < (m - d) * (r - c) / (f - c) + d && (o = !o);
  }
  return o;
}
function nx(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return tx(n, t);
}
function Nr(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var rx = Vu, ox = Fi, sx = qu, ix = Gu, ax = Vi, lx = Zu, cx = Wo, ux = Qu, dx = ed, mx = nd, fx = od, px = sd, hx = id, gx = ld, bx = ud, zo = "DropdownMenu", [vx] = Un(
  zo,
  [Yu]
), Ue = Yu(), [Nx, md] = vx(zo), fd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, l = Ue(t), d = C.useRef(null), [c, m] = Ai({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: zo
  });
  return /* @__PURE__ */ W(
    Nx,
    {
      scope: t,
      triggerId: co(),
      triggerRef: d,
      contentId: co(),
      open: c,
      onOpenChange: m,
      onOpenToggle: C.useCallback(() => m((f) => !f), [m]),
      modal: a,
      children: /* @__PURE__ */ W(rx, { ...l, open: c, onOpenChange: m, dir: r, modal: a, children: n })
    }
  );
};
fd.displayName = zo;
var pd = "DropdownMenuTrigger", hd = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = md(pd, n), i = Ue(n);
    return /* @__PURE__ */ W(ox, { asChild: !0, ...i, children: /* @__PURE__ */ W(
      Oe.button,
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
hd.displayName = pd;
var yx = "DropdownMenuPortal", gd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ue(t);
  return /* @__PURE__ */ W(sx, { ...r, ...n });
};
gd.displayName = yx;
var bd = "DropdownMenuContent", vd = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = md(bd, n), s = Ue(n), i = C.useRef(!1);
    return /* @__PURE__ */ W(
      ix,
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
          const l = a.detail.originalEvent, d = l.button === 0 && l.ctrlKey === !0, c = l.button === 2 || d;
          (!o.modal || c) && (i.current = !0);
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
vd.displayName = bd;
var xx = "DropdownMenuGroup", wx = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
    return /* @__PURE__ */ W(ax, { ...o, ...r, ref: t });
  }
);
wx.displayName = xx;
var kx = "DropdownMenuLabel", Cx = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
    return /* @__PURE__ */ W(lx, { ...o, ...r, ref: t });
  }
);
Cx.displayName = kx;
var Tx = "DropdownMenuItem", Nd = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
    return /* @__PURE__ */ W(cx, { ...o, ...r, ref: t });
  }
);
Nd.displayName = Tx;
var Ex = "DropdownMenuCheckboxItem", Sx = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
  return /* @__PURE__ */ W(ux, { ...o, ...r, ref: t });
});
Sx.displayName = Ex;
var Mx = "DropdownMenuRadioGroup", Dx = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
  return /* @__PURE__ */ W(dx, { ...o, ...r, ref: t });
});
Dx.displayName = Mx;
var Rx = "DropdownMenuRadioItem", Ax = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
  return /* @__PURE__ */ W(mx, { ...o, ...r, ref: t });
});
Ax.displayName = Rx;
var Px = "DropdownMenuItemIndicator", Ix = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
  return /* @__PURE__ */ W(fx, { ...o, ...r, ref: t });
});
Ix.displayName = Px;
var Lx = "DropdownMenuSeparator", yd = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
  return /* @__PURE__ */ W(px, { ...o, ...r, ref: t });
});
yd.displayName = Lx;
var Ox = "DropdownMenuArrow", _x = C.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
    return /* @__PURE__ */ W(hx, { ...o, ...r, ref: t });
  }
);
_x.displayName = Ox;
var Bx = "DropdownMenuSubTrigger", $x = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
  return /* @__PURE__ */ W(gx, { ...o, ...r, ref: t });
});
$x.displayName = Bx;
var Wx = "DropdownMenuSubContent", zx = C.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ue(n);
  return /* @__PURE__ */ W(
    bx,
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
zx.displayName = Wx;
var Hx = fd, Fx = hd, Ux = gd, Yx = vd, jx = Nd, Vx = yd;
function Cs({
  ...e
}) {
  return /* @__PURE__ */ u(Hx, { "data-slot": "dropdown-menu", ...e }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function Ts({
  ...e
}) {
  return /* @__PURE__ */ u(
    Fx,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 25,
      columnNumber: 5
    },
    this
  );
}
function Es({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ u(Ux, { children: /* @__PURE__ */ u(
    Yx,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: le(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 39,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function Ae({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ u(
    jx,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: le(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 70,
      columnNumber: 5
    },
    this
  );
}
function Ss({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    Vx,
    {
      "data-slot": "dropdown-menu-separator",
      className: le("bg-border -mx-1 my-1 h-px", e),
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 169,
      columnNumber: 5
    },
    this
  );
}
var Kx = Object.freeze({
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
}), qx = "VisuallyHidden", xd = C.forwardRef(
  (e, t) => /* @__PURE__ */ W(
    Oe.span,
    {
      ...e,
      ref: t,
      style: { ...Kx, ...e.style }
    }
  )
);
xd.displayName = qx;
var Gx = xd, [Ho] = Un("Tooltip", [
  _o
]), Fo = _o(), wd = "TooltipProvider", Zx = 700, Gs = "tooltip.open", [Xx, Gi] = Ho(wd), kd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Zx,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = C.useRef(!0), a = C.useRef(!1), l = C.useRef(0);
  return C.useEffect(() => {
    const d = l.current;
    return () => window.clearTimeout(d);
  }, []), /* @__PURE__ */ W(
    Xx,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: n,
      onOpen: C.useCallback(() => {
        window.clearTimeout(l.current), i.current = !1;
      }, []),
      onClose: C.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => i.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: C.useCallback((d) => {
        a.current = d;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
kd.displayName = wd;
var yr = "Tooltip", [Qx, Dr] = Ho(yr), Cd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, l = Gi(yr, e.__scopeTooltip), d = Fo(t), [c, m] = C.useState(null), f = co(), p = C.useRef(0), b = i ?? l.disableHoverableContent, h = a ?? l.delayDuration, g = C.useRef(!1), [y, v] = Ai({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (k) => {
      k ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Gs))) : l.onClose(), s?.(k);
    },
    caller: yr
  }), x = C.useMemo(() => y ? g.current ? "delayed-open" : "instant-open" : "closed", [y]), M = C.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, g.current = !1, v(!0);
  }, [v]), w = C.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v(!1);
  }, [v]), T = C.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      g.current = !0, v(!0), p.current = 0;
    }, h);
  }, [h, v]);
  return C.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ W(Cu, { ...d, children: /* @__PURE__ */ W(
    Qx,
    {
      scope: t,
      contentId: f,
      open: y,
      stateAttribute: x,
      trigger: c,
      onTriggerChange: m,
      onTriggerEnter: C.useCallback(() => {
        l.isOpenDelayedRef.current ? T() : M();
      }, [l.isOpenDelayedRef, T, M]),
      onTriggerLeave: C.useCallback(() => {
        b ? w() : (window.clearTimeout(p.current), p.current = 0);
      }, [w, b]),
      onOpen: M,
      onClose: w,
      disableHoverableContent: b,
      children: n
    }
  ) });
};
Cd.displayName = yr;
var Zs = "TooltipTrigger", Td = C.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Dr(Zs, n), s = Gi(Zs, n), i = Fo(n), a = C.useRef(null), l = $e(t, a, o.onTriggerChange), d = C.useRef(!1), c = C.useRef(!1), m = C.useCallback(() => d.current = !1, []);
    return C.useEffect(() => () => document.removeEventListener("pointerup", m), [m]), /* @__PURE__ */ W(Tu, { asChild: !0, ...i, children: /* @__PURE__ */ W(
      Oe.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: de(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !c.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: de(e.onPointerLeave, () => {
          o.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: de(e.onPointerDown, () => {
          o.open && o.onClose(), d.current = !0, document.addEventListener("pointerup", m, { once: !0 });
        }),
        onFocus: de(e.onFocus, () => {
          d.current || o.onOpen();
        }),
        onBlur: de(e.onBlur, o.onClose),
        onClick: de(e.onClick, o.onClose)
      }
    ) });
  }
);
Td.displayName = Zs;
var Zi = "TooltipPortal", [Jx, ew] = Ho(Zi, {
  forceMount: void 0
}), Ed = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = Dr(Zi, t);
  return /* @__PURE__ */ W(Jx, { scope: t, forceMount: n, children: /* @__PURE__ */ W(on, { present: n || s.open, children: /* @__PURE__ */ W(Hi, { asChild: !0, container: o, children: r }) }) });
};
Ed.displayName = Zi;
var Ln = "TooltipContent", Sd = C.forwardRef(
  (e, t) => {
    const n = ew(Ln, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = Dr(Ln, e.__scopeTooltip);
    return /* @__PURE__ */ W(on, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ W(Md, { side: o, ...s, ref: t }) : /* @__PURE__ */ W(tw, { side: o, ...s, ref: t }) });
  }
), tw = C.forwardRef((e, t) => {
  const n = Dr(Ln, e.__scopeTooltip), r = Gi(Ln, e.__scopeTooltip), o = C.useRef(null), s = $e(t, o), [i, a] = C.useState(null), { trigger: l, onClose: d } = n, c = o.current, { onPointerInTransitChange: m } = r, f = C.useCallback(() => {
    a(null), m(!1);
  }, [m]), p = C.useCallback(
    (b, h) => {
      const g = b.currentTarget, y = { x: b.clientX, y: b.clientY }, v = sw(y, g.getBoundingClientRect()), x = iw(y, v), M = aw(h.getBoundingClientRect()), w = cw([...x, ...M]);
      a(w), m(!0);
    },
    [m]
  );
  return C.useEffect(() => () => f(), [f]), C.useEffect(() => {
    if (l && c) {
      const b = (g) => p(g, c), h = (g) => p(g, l);
      return l.addEventListener("pointerleave", b), c.addEventListener("pointerleave", h), () => {
        l.removeEventListener("pointerleave", b), c.removeEventListener("pointerleave", h);
      };
    }
  }, [l, c, p, f]), C.useEffect(() => {
    if (i) {
      const b = (h) => {
        const g = h.target, y = { x: h.clientX, y: h.clientY }, v = l?.contains(g) || c?.contains(g), x = !lw(y, i);
        v ? f() : x && (f(), d());
      };
      return document.addEventListener("pointermove", b), () => document.removeEventListener("pointermove", b);
    }
  }, [l, c, i, d, f]), /* @__PURE__ */ W(Md, { ...e, ref: s });
}), [nw, rw] = Ho(yr, { isInside: !1 }), ow = /* @__PURE__ */ cv("TooltipContent"), Md = C.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, l = Dr(Ln, n), d = Fo(n), { onClose: c } = l;
    return C.useEffect(() => (document.addEventListener(Gs, c), () => document.removeEventListener(Gs, c)), [c]), C.useEffect(() => {
      if (l.trigger) {
        const m = (f) => {
          f.target?.contains(l.trigger) && c();
        };
        return window.addEventListener("scroll", m, { capture: !0 }), () => window.removeEventListener("scroll", m, { capture: !0 });
      }
    }, [l.trigger, c]), /* @__PURE__ */ W(
      Pi,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (m) => m.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ Yf(
          Eu,
          {
            "data-state": l.stateAttribute,
            ...d,
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
              /* @__PURE__ */ W(ow, { children: r }),
              /* @__PURE__ */ W(nw, { scope: n, isInside: !0, children: /* @__PURE__ */ W(Gx, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Sd.displayName = Ln;
var Dd = "TooltipArrow", Rd = C.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Fo(n);
    return rw(
      Dd,
      n
    ).isInside ? null : /* @__PURE__ */ W(Su, { ...o, ...r, ref: t });
  }
);
Rd.displayName = Dd;
function sw(e, t) {
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
function iw(e, t, n = 5) {
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
function aw(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function lw(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], l = t[i], d = a.x, c = a.y, m = l.x, f = l.y;
    c > r != f > r && n < (m - d) * (r - c) / (f - c) + d && (o = !o);
  }
  return o;
}
function cw(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), uw(t);
}
function uw(e) {
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
var dw = kd, mw = Cd, fw = Td, pw = Ed, hw = Sd, gw = Rd;
function bw({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ u(
    dw,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/ui/tooltip.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}
function Xs({
  ...e
}) {
  return /* @__PURE__ */ u(bw, { children: /* @__PURE__ */ u(mw, { "data-slot": "tooltip", ...e }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/ui/tooltip.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/ui/tooltip.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function Qs({
  ...e
}) {
  return /* @__PURE__ */ u(fw, { "data-slot": "tooltip-trigger", ...e }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/ui/tooltip.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
function Js({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ u(pw, { children: /* @__PURE__ */ u(
    hw,
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
        /* @__PURE__ */ u(gw, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/ui/tooltip.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/ui/tooltip.tsx",
      lineNumber: 43,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/ui/tooltip.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
const Se = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
  const s = /* @__PURE__ */ u(
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
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 100,
      columnNumber: 5
    },
    void 0
  );
  return o ? /* @__PURE__ */ u(Xs, { children: [
    /* @__PURE__ */ u(Qs, { asChild: !0, children: s }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 120,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ u(Js, { side: "bottom", className: "text-xs", children: o }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 119,
    columnNumber: 7
  }, void 0) : s;
}, wn = () => /* @__PURE__ */ u("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }, void 0, !1, {
  fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
  lineNumber: 132,
  columnNumber: 3
}, void 0), vw = Bn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const l = V(null), [d, c] = j(!1), [m, f] = j(void 0), p = $l({
    editor: t,
    selector: ({ editor: T }) => ({
      canUndo: T.can().undo(),
      canRedo: T.can().redo(),
      isBold: T.isActive("bold"),
      isItalic: T.isActive("italic"),
      isUnderline: T.isActive("underline"),
      isStrike: T.isActive("strike"),
      isCode: T.isActive("code"),
      isHighlight: T.isActive("highlight"),
      isH1: T.isActive("heading", { level: 1 }),
      isH2: T.isActive("heading", { level: 2 }),
      isH3: T.isActive("heading", { level: 3 }),
      isBlockquote: T.isActive("blockquote"),
      isBulletList: T.isActive("bulletList"),
      isOrderedList: T.isActive("orderedList"),
      isTaskList: T.isActive("taskList"),
      isCodeBlock: T.isActive("codeBlock"),
      isLink: T.isActive("link")
    })
  }), b = z(() => {
    const { view: T } = t, { from: k } = T.state.selection, D = T.coordsAtPos(k);
    f({ top: D.bottom + 8, left: D.left }), c(!0);
  }, [t]), h = z((T, k) => {
    t.chain().focus().setImage({ src: T, alt: k }).run(), c(!1);
  }, [t]), g = z(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), y = z((T) => {
    t.chain().focus().insertCallout({ type: T }).run();
  }, [t]), v = V(/* @__PURE__ */ new Map()), x = V(/* @__PURE__ */ new Map()), M = z((T) => {
    const { doc: k, tr: D } = T.state;
    let N = !1;
    const E = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), S = T.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), S.forEach((R, I) => {
      R.querySelectorAll(":scope > li").forEach((H) => {
        const K = H, A = (K.textContent || "").trim().substring(0, 50);
        v.current.set(`${I}-${A}`, K.getBoundingClientRect());
      });
    });
    const P = [];
    k.descendants((R, I, B, H) => {
      if (!E.has(R.type.name)) return !0;
      let K = !1;
      if (R.forEach(($) => {
        $.type.name === "taskItem" && (K = !0);
      }), !K) return !0;
      let A = 0;
      return k.nodesBetween(0, I, ($) => (E.has($.type.name) && A++, !0)), P.push({ node: R, pos: I, depth: A }), !0;
    }), P.sort((R, I) => I.depth - R.depth);
    for (const { node: R, pos: I } of P) {
      const B = [];
      let H = 0;
      R.forEach((O) => {
        B.push({
          node: O,
          isTask: O.type.name === "taskItem",
          checked: O.type.name === "taskItem" && O.attrs.checked === !0,
          originalIndex: H++
        });
      });
      const K = B.filter((O) => O.isTask && !O.checked), A = B.filter((O) => O.isTask && O.checked), $ = [...B], Q = B.map((O, U) => ({ index: U, isTask: O.isTask })).filter((O) => O.isTask).map((O) => O.index), se = [...K, ...A];
      if (Q.forEach((O, U) => {
        $[O] = se[U];
      }), !$.some((O, U) => O.node !== B[U].node)) continue;
      const re = R.type.create(
        R.attrs,
        $.map((O) => O.node)
      ), oe = D.mapping.map(I);
      D.replaceWith(oe, oe + R.nodeSize, re), N = !0;
    }
    N && (T.view.dispatch(D), requestAnimationFrame(() => {
      T.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((I) => {
        const B = I.querySelectorAll(":scope > li"), H = /* @__PURE__ */ new Map();
        v.current.forEach((K, A) => {
          const $ = A.replace(/^\d+-/, "");
          H.set($, K);
        }), B.forEach((K) => {
          const A = K, $ = (A.textContent || "").trim().substring(0, 50), Q = H.get($);
          if (!Q) return;
          const se = A.getBoundingClientRect(), ie = Q.top - se.top;
          if (Math.abs(ie) < 2) return;
          A.style.transform = `translateY(${ie}px)`, A.style.transition = "none", A.style.zIndex = "1", A.offsetHeight, A.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", A.style.transform = "translateY(0)";
          const re = () => {
            A.style.transform = "", A.style.transition = "", A.style.zIndex = "", A.removeEventListener("transitionend", re);
          };
          A.addEventListener("transitionend", re), setTimeout(re, 400);
        });
      });
    }));
  }, []);
  G(() => {
    if (!s || !t) return;
    const T = /* @__PURE__ */ new Map();
    t.state.doc.descendants((D, N) => (D.type.name === "taskItem" && T.set(N, D.attrs.checked === !0), !0)), x.current = T;
    const k = ({ transaction: D }) => {
      if (!D.docChanged) return;
      const N = /* @__PURE__ */ new Map();
      t.state.doc.descendants((P, R) => (P.type.name === "taskItem" && N.set(R, P.attrs.checked === !0), !0));
      const E = x.current;
      let S = !1;
      if (E.size > 0 && N.size > 0) {
        let P = 0, R = 0;
        E.forEach((I) => {
          I && P++;
        }), N.forEach((I) => {
          I && R++;
        }), P !== R && (S = !0);
      }
      x.current = N, S && setTimeout(() => {
        M(t);
      }, 150);
    };
    return t.on("transaction", k), () => {
      t.off("transaction", k);
    };
  }, [t, s, M]);
  const w = z(() => {
    M(t);
  }, [t, M]);
  return /* @__PURE__ */ u("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide ${o}`, children: [
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ u(uf, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 382,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 377,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ u(df, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 389,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 384,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(wn, {}, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 392,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ u(li, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 400,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 395,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ u(ci, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 407,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 402,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ u(ui, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 414,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 409,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ u(di, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 421,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 416,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ u(Hl, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 428,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 423,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ u(Fl, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 435,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 430,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ u(mi, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 442,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 437,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(wn, {}, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 445,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u(Cs, { children: [
      /* @__PURE__ */ u(Ts, { asChild: !0, children: /* @__PURE__ */ u(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${p?.isH1 || p?.isH2 || p?.isH3 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ u("span", { className: "min-w-[18px] text-center", children: p?.isH1 ? "H1" : p?.isH2 ? "H2" : p?.isH3 ? "H3" : "P" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 461,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ u(Ht, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 464,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 450,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 449,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u(Es, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ u("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 472,
                columnNumber: 13
              }, this),
              "Paragraph"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 468,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ u("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 479,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ u("span", { className: "font-semibold", children: "Heading 1" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 480,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 475,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ u("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 486,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ u("span", { className: "font-semibold", children: "Heading 2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 487,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 482,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ u("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 493,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ u("span", { className: "font-semibold", children: "Heading 3" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 494,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 489,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 467,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 448,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u(wn, {}, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 499,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ u(pi, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 507,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 502,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ u(hi, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 514,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 509,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ u(gi, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 521,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 516,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ u(fi, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 528,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 523,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ u(Kl, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 535,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 530,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ u(mf, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 548,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 537,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ u(ff, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 561,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 550,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(wn, {}, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 564,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: g,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ u(Is, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 571,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 567,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: b,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ u(Ni, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 577,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 573,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ u(ql, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 583,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 579,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(Cs, { children: [
      /* @__PURE__ */ u(Ts, { asChild: !0, children: /* @__PURE__ */ u(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ u(lo, { size: 16 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 592,
            columnNumber: 13
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 588,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 587,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u(Es, { align: "start", children: [
        /* @__PURE__ */ u(Ae, { onClick: () => y("info"), children: [
          /* @__PURE__ */ u(lo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 597,
            columnNumber: 13
          }, this),
          " Info"
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 596,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u(Ae, { onClick: () => y("note"), children: [
          /* @__PURE__ */ u(vi, { size: 16, className: "mr-2", style: { color: "#FF8200" } }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 600,
            columnNumber: 13
          }, this),
          " Note"
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 599,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u(Ae, { onClick: () => y("prompt"), children: [
          /* @__PURE__ */ u(pf, { size: 16, className: "mr-2", style: { color: "#B244B3" } }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 603,
            columnNumber: 13
          }, this),
          " Prompt"
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 602,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u(Ae, { onClick: () => y("resources"), children: [
          /* @__PURE__ */ u(hf, { size: 16, className: "mr-2", style: { color: "#63B148" } }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 606,
            columnNumber: 13
          }, this),
          " Resources"
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 605,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u(Ae, { onClick: () => y("todo"), children: [
          /* @__PURE__ */ u(bi, { size: 16, className: "mr-2", style: { color: "#4479B3" } }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 609,
            columnNumber: 13
          }, this),
          " Todo"
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 608,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 595,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 586,
      columnNumber: 7
    }, this),
    t.isActive("table") && /* @__PURE__ */ u(Cs, { children: [
      /* @__PURE__ */ u(Ts, { asChild: !0, children: /* @__PURE__ */ u(
        zt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ u(Is, { size: 16 }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 623,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ u("span", { className: "text-xs hidden sm:inline", children: "Table" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 624,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 618,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 617,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u(Es, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ u(ba, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 632,
                columnNumber: 15
              }, this),
              " Add Column Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 628,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ u(ba, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 638,
                columnNumber: 15
              }, this),
              " Add Column After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 634,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ u(Cn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 644,
                columnNumber: 15
              }, this),
              " Delete Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 640,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ u(Ss, {}, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 646,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ u(va, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 651,
                columnNumber: 15
              }, this),
              " Add Row Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 647,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ u(va, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 657,
                columnNumber: 15
              }, this),
              " Add Row After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 653,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ u(Cn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 663,
                columnNumber: 15
              }, this),
              " Delete Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 659,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ u(Ss, {}, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 665,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ u(Na, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 670,
                columnNumber: 15
              }, this),
              " Toggle Header Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 666,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ u(Na, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 676,
                columnNumber: 15
              }, this),
              " Toggle Header Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 672,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ u(Ss, {}, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 679,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u(
          Ae,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ u(Cn, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 685,
                columnNumber: 15
              }, this),
              " Delete Table"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 680,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 627,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 616,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u(
      Gc,
      {
        isOpen: d,
        onClose: () => c(!1),
        onInsert: h,
        position: m
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 692,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(wn, {}, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 700,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u(
      Se,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ u(gf, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 705,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 701,
        columnNumber: 7
      },
      this
    ),
    i && /* @__PURE__ */ u(Pe, { children: [
      /* @__PURE__ */ u(wn, {}, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 711,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u(Xs, { children: [
        /* @__PURE__ */ u(Qs, { asChild: !0, children: /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(Eo, { size: 16 }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 728,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 714,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 713,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u(Js, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 731,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 712,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 710,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u("div", { className: "flex-1 min-w-2" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 739,
      columnNumber: 7
    }, this),
    n && /* @__PURE__ */ u(Xs, { children: [
      /* @__PURE__ */ u(Qs, { asChild: !0, children: /* @__PURE__ */ u(
        zt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ u(Wn, { size: 16 }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 751,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ u("span", { className: "text-xs hidden md:inline", children: "Copy MD" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 752,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 745,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 744,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u(Js, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 755,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 743,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 375,
    columnNumber: 5
  }, this);
});
function Nw({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: l }) {
  const d = s === "markdown", [c, m] = j(""), [f, p] = j(""), [b, h] = j(!1), [g, y] = j(!1), [v, x] = j(!1), [M, w] = j(!1), [T, k] = j([]), [D, N] = j(0), [E, S] = j(null), [P, R] = j(!1), I = V(!1), B = V(null), H = V(null), K = V(!1);
  G(() => {
    t && o && o.trim() && m(o);
  }, [t, o, r]);
  const A = z(() => {
    if (!c || !e) {
      k([]), N(0), S(null);
      return;
    }
    const O = [];
    let U;
    try {
      if (g)
        U = new RegExp(c, b ? "g" : "gi");
      else {
        let Y = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (Y = `\\b${Y}\\b`), U = new RegExp(Y, b ? "g" : "gi");
      }
      S(null);
    } catch (Y) {
      S(Y.message), k([]);
      return;
    }
    if (d) {
      let Y;
      for (; (Y = U.exec(i)) !== null; )
        O.push({
          from: Y.index,
          to: Y.index + Y[0].length,
          text: Y[0]
        });
    } else {
      const { doc: Y } = e.state;
      Y.descendants((te, ve) => {
        if (te.isText && te.text) {
          let we;
          for (; (we = U.exec(te.text)) !== null; )
            O.push({
              from: ve + we.index,
              to: ve + we.index + we[0].length,
              text: we[0]
            });
        }
        return !0;
      });
    }
    k(O), O.length > 0 && D >= O.length && N(0);
  }, [c, b, g, v, e, D, d, i]);
  G(() => {
    A();
  }, [A]), G(() => {
    d && l && (t && T.length > 0 ? l(T, D) : l([], 0));
  }, [d, t, T, D, l]), G(() => {
    if (!e) return;
    if (d) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const O = typeof e.commands.setSearchHighlight == "function";
    t && c && O ? e.commands.setSearchHighlight({
      searchTerm: c,
      caseSensitive: b,
      useRegex: g,
      currentMatchIndex: D
    }) : O && e.commands.clearSearchHighlight();
  }, [e, t, c, b, g, D, d, T, i]), G(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), I.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), R(!1)), I.current = !1);
  }, [t, e, l]), G(() => {
    if (T.length > 0 && D < T.length) {
      const O = T[D];
      if (d) {
        const Y = document.querySelector(".syntax-textarea");
        if (Y && K.current) {
          const te = parseInt(getComputedStyle(Y).lineHeight) || 22, we = i.substring(0, O.from).split(`
`).length;
          Y.scrollTop = Math.max(0, (we - 3) * te);
        }
        K.current && (K.current = !1);
        return;
      }
      const U = e.view.domAtPos(O.from);
      U.node && U.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), K.current && (K.current = !1);
    }
  }, [D, T, e, d, i]), G(() => {
    t && B.current && (B.current.focus(), B.current.select());
  }, [t, r]);
  const $ = z(() => {
    T.length !== 0 && (K.current = !0, N((O) => (O + 1) % T.length));
  }, [T.length]), Q = z(() => {
    T.length !== 0 && (K.current = !0, N((O) => (O - 1 + T.length) % T.length));
  }, [T.length]), se = z(() => {
    if (T.length === 0 || D >= T.length) return;
    const O = T[D];
    if (d && a) {
      const U = i.substring(0, O.from) + f + i.substring(O.to);
      a(U), setTimeout(A, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: O.from, to: O.to }).deleteSelection().insertContent(f).run(), setTimeout(A, 10);
  }, [T, D, f, e, A, d, i, a]), ie = z(() => {
    if (T.length === 0) return;
    if (d && a) {
      const U = [...T].sort((te, ve) => ve.from - te.from);
      let Y = i;
      U.forEach((te) => {
        Y = Y.substring(0, te.from) + f + Y.substring(te.to);
      }), a(Y), setTimeout(A, 10);
      return;
    }
    const O = [...T].sort((U, Y) => Y.from - U.from);
    e.chain().focus(), O.forEach((U) => {
      e.chain().setTextSelection({ from: U.from, to: U.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(A, 10);
  }, [T, f, e, A, d, i, a]), re = z(() => {
    if (T.length === 0 || !c || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: c,
      caseSensitive: b,
      useRegex: g,
      wholeWord: v
    }) && (R(!0), I.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [T, c, b, g, v, e, n]), oe = z((O) => {
    O.key === "Enter" ? (O.preventDefault(), O.shiftKey ? Q() : $(), B.current?.focus()) : O.key === "Escape" ? (O.preventDefault(), n()) : O.key === "h" && (O.ctrlKey || O.metaKey) ? (O.preventDefault(), w((U) => !U)) : O.key === "l" && (O.ctrlKey || O.metaKey) && O.shiftKey && (O.preventDefault(), re());
  }, [$, Q, n, re]);
  return t ? /* @__PURE__ */ u(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: oe,
      children: [
        /* @__PURE__ */ u("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ u("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ u(bf, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 381,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ u(
              "input",
              {
                ref: B,
                type: "text",
                placeholder: "Find...",
                value: c,
                onChange: (O) => m(O.target.value),
                className: `find-replace-input ${E ? "has-error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 382,
                columnNumber: 11
              },
              this
            ),
            E && /* @__PURE__ */ u("span", { className: "find-replace-error", title: E, children: "!" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 391,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
            lineNumber: 380,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u("span", { className: "find-replace-count", children: T.length > 0 ? `${D + 1} of ${T.length}` : c ? "No results" : "" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
            lineNumber: 396,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: Q,
              disabled: T.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ u(vf, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 410,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 404,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: $,
              disabled: T.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ u(Ht, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 418,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 412,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: re,
              disabled: T.length === 0,
              className: `find-replace-btn ${P ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${T.length} matches`,
              children: /* @__PURE__ */ u(Nf, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 428,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 422,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u("div", { className: "find-replace-separator" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
            lineNumber: 432,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: () => h((O) => !O),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ u(yf, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 440,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 435,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: () => x((O) => !O),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ u(xf, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 447,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 442,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: () => y((O) => !O),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ u(wf, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 454,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 449,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: () => w((O) => !O),
              className: `find-replace-btn ${M ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ u(Ls, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 463,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 458,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ u(Dt, { size: 16 }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 472,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 467,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
          lineNumber: 379,
          columnNumber: 7
        }, this),
        M && /* @__PURE__ */ u("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ u("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ u(Ls, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 480,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ u(
              "input",
              {
                ref: H,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (O) => p(O.target.value),
                className: "find-replace-input"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 481,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
            lineNumber: 479,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: se,
              disabled: T.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 491,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: ie,
              disabled: T.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ u(kf, { size: 14 }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
                  lineNumber: 505,
                  columnNumber: 13
                }, this),
                "All"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 499,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
          lineNumber: 478,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/FindReplace.tsx",
      lineNumber: 374,
      columnNumber: 5
    },
    this
  ) : null;
}
const yw = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), Ct = yw ? "⌘" : "Ctrl", xw = ({ editor: e }) => {
  const [t, n] = j(!1), [r, o] = j(0), [s, i] = j(0), [a, l] = j(""), [d, c] = j(""), [m, f] = j(!1), [p, b] = j(!1);
  G(() => {
    if (!e) return;
    const k = () => {
      const N = e.storage.selectAllOccurrences;
      N ? (n(N.isActive), o(N.ranges.length), i(N.allMatches.length), l(N.searchTerm), c(N.typedBuffer), f(N.isTypingReplace), b(N.isIncremental)) : (n(!1), o(0), i(0));
    }, D = () => {
      k();
    };
    return e.on("transaction", D), k(), () => {
      e.off("transaction", D);
    };
  }, [e]);
  const h = z(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), g = z(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), y = z(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = z(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), x = z(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), M = z(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = z(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), T = z(() => {
    a && (e.commands.selectAllOccurrences({
      searchTerm: a,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, a]);
  return !t || r === 0 ? null : /* @__PURE__ */ u("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ u("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ u("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ u("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ u("span", { className: "select-all-action-bar-count-label", children: "selected" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ u("div", { className: "select-all-action-bar-preview", children: m ? /* @__PURE__ */ u(Pe, { children: [
        /* @__PURE__ */ u(So, { size: 12, className: "select-all-action-bar-preview-icon" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ u("span", { className: "select-all-action-bar-preview-old", children: a }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ u("span", { className: "select-all-action-bar-preview-arrow", children: "→" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ u("span", { className: "select-all-action-bar-preview-new", children: d || "∅" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 144,
          columnNumber: 15
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 140,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ u(Pe, { children: /* @__PURE__ */ u("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 148,
        columnNumber: 15
      }, void 0) }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, void 0) }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ u("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, void 0),
      p && r < s && /* @__PURE__ */ u(Pe, { children: [
        /* @__PURE__ */ u(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${Ct}+D)`,
            children: /* @__PURE__ */ u(xi, { size: 14 }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, void 0)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 159,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: T,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${Ct}+Shift+L)`,
            children: "All"
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 166,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ u("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: h,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${Ct}+B)`,
          children: /* @__PURE__ */ u(li, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 183,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 178,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${Ct}+I)`,
          children: /* @__PURE__ */ u(ci, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 190,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 185,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${Ct}+U)`,
          children: /* @__PURE__ */ u(ui, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 197,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 192,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ u(di, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 199,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ u("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: x,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ u(Cn, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 211,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: M,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ u(Dt, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 225,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 220,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 128,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ u("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ u(Pe, { children: [
      /* @__PURE__ */ u("kbd", { children: [
        Ct,
        "+D"
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, void 0),
      " next · ",
      /* @__PURE__ */ u("kbd", { children: [
        Ct,
        "+Shift+L"
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 42
      }, void 0),
      " all · Type to replace · ",
      /* @__PURE__ */ u("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 94
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ u("kbd", { children: [
        Ct,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 119
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 232,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ u(Pe, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ u("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 35
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ u("kbd", { children: "Backspace" }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 60
      }, void 0),
      " to delete · ",
      /* @__PURE__ */ u("kbd", { children: [
        Ct,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 93
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 236,
      columnNumber: 11
    }, void 0) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/SelectAllActionBar.tsx",
    lineNumber: 127,
    columnNumber: 5
  }, void 0);
}, ww = Bn(xw), Qr = "-dismissed";
function kw(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Cw(e, t = {}) {
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
  }), d = V(null), c = V(""), m = V(0);
  G(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const y = localStorage.getItem(n), v = localStorage.getItem(n + Qr);
        if (y && !v) {
          let x = "";
          try {
            x = e.getHTML() || "";
          } catch {
            return;
          }
          y !== x && y.length > 50 && l((M) => ({ ...M, hasRecoverableContent: !0 }));
        }
      } catch (y) {
        console.warn("useAutoSave: Error checking for recoverable content", y);
      }
  }, [e, n, o]);
  const f = z(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const y = e.getHTML(), v = kw(y);
        if (v === m.current && y.length === c.current.length) {
          l((x) => ({ ...x, status: "saved" }));
          return;
        }
        if (y.length < 20)
          return;
        l((x) => ({ ...x, status: "saving" })), localStorage.setItem(n, y), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), c.current = y, m.current = v, l((x) => ({
          ...x,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(y), setTimeout(() => {
          l((x) => x.status === "saved" ? { ...x, status: "idle" } : x);
        }, 2e3);
      } catch (y) {
        console.error("useAutoSave: Error saving content", y), l((v) => ({
          ...v,
          status: "error",
          error: y instanceof Error ? y.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  G(() => {
    if (!e || !o || e.isDestroyed) return;
    const y = () => {
      e.isDestroyed || (d.current && clearTimeout(d.current), d.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", y), () => {
      e.off("update", y), d.current && clearTimeout(d.current);
    };
  }, [e, r, o, f]), G(() => {
    if (!e || !o || e.isDestroyed) return;
    const y = () => {
      if (!e.isDestroyed)
        try {
          const v = e.getHTML();
          v.length >= 20 && (localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()));
        } catch (v) {
          console.warn("useAutoSave: Error saving on unload", v);
        }
    };
    return window.addEventListener("beforeunload", y), () => {
      window.removeEventListener("beforeunload", y);
    };
  }, [e, n, o]);
  const p = z(() => {
    d.current && clearTimeout(d.current), f();
  }, [f]), b = z(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Qr), c.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (y) {
      console.warn("useAutoSave: Error clearing content", y);
    }
  }, [n]), h = z(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const y = localStorage.getItem(n);
      return y && e && !e.isDestroyed ? (l((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(y), c.current = y, localStorage.removeItem(n + Qr), i?.(y);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), y) : null;
    } catch (y) {
      return console.warn("useAutoSave: Error recovering content", y), null;
    }
  }, [e, n, i]), g = z(() => {
    try {
      localStorage.setItem(n + Qr, "true"), l((y) => ({ ...y, hasRecoverableContent: !1 }));
    } catch (y) {
      console.warn("useAutoSave: Error dismissing recovery", y);
    }
  }, [n]);
  return {
    ...a,
    save: p,
    clear: b,
    recover: h,
    dismissRecovery: g
  };
}
const Tw = 200;
function Ew(e, t = {}) {
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
  }), a = V(null), l = V(""), d = z((c) => {
    const m = c.trim(), f = m.length > 0 ? m.split(/\s+/).filter((v) => v.length > 0).length : 0, p = m.replace(/\s/g, "").length, b = c.length;
    let h = 0, g = 0;
    r && (h = m.length > 0 ? m.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, g = m.length > 0 ? (m.match(/[.!?]+/g) || []).length : 0);
    const y = Math.max(1, Math.ceil(f / Tw));
    return {
      words: f,
      characters: p,
      charactersWithSpaces: b,
      paragraphs: h,
      sentences: g,
      readingTime: y,
      isCalculating: !1
    };
  }, [r]);
  return G(() => {
    if (!e || !o) return;
    const c = () => {
      a.current && clearTimeout(a.current), i((m) => ({ ...m, isCalculating: !0 })), a.current = setTimeout(() => {
        try {
          const m = e.getText();
          if (m === l.current) {
            i((p) => ({ ...p, isCalculating: !1 }));
            return;
          }
          l.current = m;
          const f = d(m);
          i(f);
        } catch (m) {
          console.warn("useWordCount: Error calculating word count", m), i((f) => ({ ...f, isCalculating: !1 }));
        }
      }, n);
    };
    return c(), e.on("update", c), () => {
      e.off("update", c), a.current && clearTimeout(a.current);
    };
  }, [e, n, o, d]), s;
}
function Sw({ status: e, lastSaved: t, className: n = "" }) {
  const r = (o) => {
    if (!o) return "";
    const i = (/* @__PURE__ */ new Date()).getTime() - o.getTime(), a = Math.floor(i / 1e3), l = Math.floor(a / 60), d = Math.floor(l / 60);
    return a < 10 ? "Just now" : a < 60 ? `${a}s ago` : l < 60 ? `${l}m ago` : d < 24 ? `${d}h ago` : o.toLocaleDateString();
  };
  return /* @__PURE__ */ u(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ u(Pe, { children: [
          /* @__PURE__ */ u(Cf, { className: "w-3.5 h-3.5 text-muted-foreground" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 40,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 41,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        e === "saving" && /* @__PURE__ */ u(Pe, { children: [
          /* @__PURE__ */ u(Gl, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u("span", { className: "text-cyan-500", children: "Saving..." }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 46,
          columnNumber: 9
        }, this),
        e === "saved" && /* @__PURE__ */ u(Pe, { children: [
          /* @__PURE__ */ u($n, { className: "w-3.5 h-3.5 text-emerald-500" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 54,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u("span", { className: "text-emerald-500", children: "Saved" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 55,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this),
        e === "error" && /* @__PURE__ */ u(Pe, { children: [
          /* @__PURE__ */ u(Tf, { className: "w-3.5 h-3.5 text-red-500" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ u("span", { className: "text-red-500", children: "Save failed" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 62,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 60,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
}
function Mw({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ u("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ u(Ef, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 22,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 23,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
          lineNumber: 21,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ u("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ u(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ u(wi, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
                  lineNumber: 33,
                  columnNumber: 11
                }, this),
                "Recover"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
              lineNumber: 29,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: t,
              className: "recovery-banner-dismiss p-2 rounded-md transition-colors duration-150",
              title: "Dismiss",
              "aria-label": "Dismiss recovery banner",
              children: /* @__PURE__ */ u(Dt, { className: "w-5 h-5" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
                lineNumber: 43,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
              lineNumber: 37,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
          lineNumber: 28,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/RecoveryBanner.tsx",
      lineNumber: 18,
      columnNumber: 5
    },
    this
  );
}
const Dw = /\[\[([^\[\]]+)\]\]$/, Rw = _m.create({
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
      _n(
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
      new je({
        find: Dw,
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
}, vl = ["info", "note", "prompt", "resources", "todo"];
function Aw(e) {
  return e.length < 3 ? !1 : !!(Tt.header.test(e) || Tt.bold.test(e) || Tt.list.test(e) || Tt.taskList.test(e) || Tt.codeBlock.test(e) || Tt.callout.test(e) || Tt.highlight.test(e) || Tt.link.test(e) || Tt.table.test(e));
}
function Pw(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th><p>" + a + "</p></th>";
  i += "</tr></thead><tbody>";
  for (const a of s) {
    if (!a.trim()) continue;
    const l = a.split("|"), d = [];
    for (let c = 0; c < l.length; c++) {
      const m = l[c].trim();
      c === 0 && m === "" && a.trim().startsWith("|") || c === l.length - 1 && m === "" && a.trim().endsWith("|") || d.push(m);
    }
    if (d.length !== 0) {
      i += "<tr>";
      for (let c = 0; c < r.length; c++) {
        const m = d[c] || "";
        i += "<td><p>" + m + "</p></td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function Iw(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (i) => {
    const a = i.split(`
`);
    if (a.length >= 2) {
      const l = a[1];
      if (/^\|?[\s\-:|]+\|?$/.test(l) && l.includes("-")) {
        const d = Pw(i);
        if (d) {
          const c = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(d), c;
        }
      }
    }
    return i;
  }), vl.forEach((i) => {
    const a = new RegExp(`\`\`\`${i}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(a, (l, d) => {
      let c = d.trim();
      return c = c.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), c = c.replace(/__([^_]+)__/g, "<strong>$1</strong>"), c = c.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), c = c.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), c = c.replace(/`([^`]+)`/g, "<code>$1</code>"), c.startsWith("<") || (c = `<p>${c}</p>`), `<div data-callout="" data-type="${i}" class="callout callout-${i}">${c}</div>`;
    });
  }), t = t.replace(/```(\w*)\n([\s\S]*?)```/g, (i, a, l) => {
    if (vl.includes(a))
      return `<div data-callout="" data-type="${a}" class="callout callout-${a}"><p>${l.trim()}</p></div>`;
    const d = a || "plaintext", c = l.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<pre><code class="language-${d}">${c}</code></pre>`;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/^(#{1,6})\s+(.+)$/gm, (i, a, l) => {
    const d = a.length;
    return `<h${d}>${l}</h${d}>`;
  }), t = t.replace(/^(\s*)[-*]\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s+(?!\[)(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/^(\s*)\d+\.\s+(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/(<li data-type="taskItem"[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul data-type="taskList">$&</ul>'), t = t.replace(/(<li><p>[\s\S]*?<\/p><\/li>\n?)+/g, "<ul>$&</ul>"), t = t.replace(/^>\s+(.+)$/gm, "<blockquote><p>$1</p></blockquote>"), t = t.replace(/^[-*_]{3,}$/gm, "<hr>"), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*?)\s*\|\s*(\d+)\]\(([^)]+)\)/g, '<img src="$3" alt="$1" width="$2" style="width: $2px">'), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">'), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((i) => {
    const a = i.trim();
    return a ? /^<[a-z]/.test(a) || /^<\//.test(a) || a.startsWith("MANUSTABLEPLACEHOLDER") ? i : `<p>${a}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let i = 0; i < r.length; i++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${i}END`, r[i]);
  return t;
}
const Lw = bt.create({
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
      new Qe({
        key: new Xe("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !Aw(i))
              return !1;
            n.preventDefault();
            const a = Iw(i);
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
}), Nl = new Xe("collapsibleHeading");
function bo(e, t, n) {
  return `h${t}-${n}-${e.textContent.slice(0, 50)}`;
}
let An = null;
function Ms(e, t, n) {
  const r = [], o = [];
  e.descendants((l, d) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const c = bo(l, l.attrs.level, d);
      o.push({
        pos: d,
        level: l.attrs.level,
        id: c,
        isCollapsed: t.collapsedHeadings.has(c),
        nodeSize: l.nodeSize
      });
    }
  });
  const s = [];
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    if (d.isCollapsed) {
      const c = d.pos + d.nodeSize;
      let m = e.content.size;
      for (let f = l + 1; f < o.length; f++)
        if (o[f].level <= d.level) {
          m = o[f].pos;
          break;
        }
      c < m && s.push({ start: c, end: m });
    }
  }
  const i = [];
  for (const l of s)
    if (i.length === 0)
      i.push(l);
    else {
      const d = i[i.length - 1];
      l.start <= d.end ? d.end = Math.max(d.end, l.end) : i.push(l);
    }
  function a(l) {
    for (const d of i)
      if (l >= d.start && l < d.end) return !0;
    return !1;
  }
  return e.descendants((l, d) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const c = bo(l, l.attrs.level, d), m = t.collapsedHeadings.has(c), f = a(d);
      r.push(
        at.node(d, d + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${m ? "is-collapsed" : "is-expanded"}${f ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": c,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const p = at.widget(d + l.nodeSize - 1, () => {
        const b = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${c}"]`);
        if (b) {
          b.classList.contains("collapsed") !== m && (b.classList.remove("collapsed", "expanded"), b.classList.add(m ? "collapsed" : "expanded"), b.title = m ? "Click to expand" : "Click to collapse");
          const v = b.parentElement;
          if (v) return v;
        }
        const h = document.createElement("span");
        h.className = "collapsible-heading-chevron-wrapper", h.setAttribute("contenteditable", "false");
        const g = document.createElement("button");
        return g.className = `collapsible-heading-chevron ${m ? "collapsed" : "expanded"}`, g.setAttribute("data-heading-id", c), g.setAttribute("data-heading-level", String(l.attrs.level)), g.setAttribute("contenteditable", "false"), g.setAttribute("tabindex", "-1"), g.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', g.title = m ? "Click to expand" : "Click to collapse", g.addEventListener("click", (y) => {
          y.preventDefault(), y.stopPropagation();
          const v = g.classList.contains("collapsed");
          g.classList.remove("collapsed", "expanded"), g.classList.add(v ? "expanded" : "collapsed"), g.title = v ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(c) ? t.collapsedHeadings.delete(c) : t.collapsedHeadings.add(c), An && An.dispatch(An.state.tr.setMeta("collapsibleHeading", { toggled: c }));
        }), h.appendChild(g), h;
      }, { side: 1, key: `chevron-${c}` });
      r.push(p);
    } else l.isBlock && a(d) && r.push(
      at.node(d, d + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), qe.create(e, r);
}
const Ow = bt.create({
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
        const s = bo(o, o.attrs.level, e);
        return r.collapsedHeadings.has(s) ? r.collapsedHeadings.delete(s) : r.collapsedHeadings.add(s), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: s })), !0;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          o.type.name === "heading" && n.collapsedHeadings.add(bo(o, o.attrs.level, s));
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Qe({
        key: Nl,
        view(n) {
          return An = n, {
            update(r) {
              An = r;
            },
            destroy() {
              An = null;
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
            return n.getMeta("collapsibleHeading") || n.docChanged ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Ms(s.doc, e, t),
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
            return r?.decorations ? r.decorations : Ms(n.doc, e, t);
          }
        }
      })
    ];
  }
}), _w = /\[([^\]]+)\]\(([^)]+)\)$/, Bw = /^(https?:\/\/|www\.)[^\s]+$/i, $w = bt.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new je({
        find: _w,
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
      new Qe({
        key: new Xe("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!Bw.test(s)) return !1;
            const { state: i } = t, { selection: a } = i, { from: l, to: d, empty: c } = a;
            let m = s;
            if (!m.startsWith("http://") && !m.startsWith("https://") && (m.startsWith("www."), m = "https://" + m), !c && i.doc.textBetween(l, d))
              return e.chain().focus().extendMarkRange("link").setLink({ href: m }).run(), !0;
            const f = i.schema.marks.link.create({ href: m }), p = i.tr;
            return p.insertText(m, l, d), p.addMark(l, l + m.length, f), t.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), Ww = ["info", "note", "prompt", "resources", "todo"], zw = bt.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Qe({
        key: new Xe("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const l = s.textBetween(a, i.pos, ""), d = l.trim();
            for (const c of Ww)
              if (d === `\`\`\`${c}`) {
                n.preventDefault();
                const m = r.tr, f = a + l.indexOf("```");
                m.delete(f, i.pos);
                const p = e.schema.nodes.callout, b = e.schema.nodes.paragraph;
                if (p && b) {
                  const h = b.create(), g = p.create({ type: c }, jf.from(h));
                  m.insert(f, g);
                  const y = m.doc.resolve(f + 2);
                  m.setSelection(ii.near(y)), t.dispatch(m);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Jr = new Xe("searchHighlight"), Hw = bt.create({
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
      new Qe({
        key: Jr,
        state: {
          init() {
            return qe.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: l } = e, d = t.getMeta(Jr), c = t.docChanged;
            if (!s)
              return qe.empty;
            if (!c && !d)
              return n.map(t.mapping, o.doc);
            const m = [];
            let f = 0;
            try {
              let p;
              if (a)
                p = new RegExp(s, i ? "g" : "gi");
              else {
                const b = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                p = new RegExp(b, i ? "g" : "gi");
              }
              o.doc.descendants((b, h) => {
                if (b.isText && b.text) {
                  let g;
                  for (; (g = p.exec(b.text)) !== null; ) {
                    const y = h + g.index, v = h + g.index + g[0].length, x = f === l;
                    m.push(
                      at.inline(y, v, {
                        class: x ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return qe.empty;
            }
            return qe.create(o.doc, m);
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
}), Fw = new Xe("tabIndent");
function Uw(e) {
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
const Yw = bt.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Qe({
        key: Fw,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = Uw(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!ya(s)(n, r)) {
                const l = o === "taskItem" ? "listItem" : "taskItem", d = n.schema.nodes[l];
                d && ya(d)(n, r);
              }
            } else if (!xa(s)(n, r)) {
              const l = o === "taskItem" ? "listItem" : "taskItem", d = n.schema.nodes[l];
              d && xa(d)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), Le = new Xe("selectAllOccurrences");
function yl(e, t, n, r, o) {
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
      let d;
      for (; (d = i.exec(a.text)) !== null; )
        s.push({
          from: l + d.index,
          to: l + d.index + d[0].length,
          text: d[0]
        });
    }
    return !0;
  }), s;
}
function $t(e, t) {
  const n = Le.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function jw(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Re(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Vw = bt.create({
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
        const l = yl(t.state.doc, o, s, i, a);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Le, { activate: !0 })), !0);
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
            const m = o.doc.resolve(s), f = m.parent;
            if (f.isTextblock) {
              const p = f.textContent, b = m.parentOffset;
              let h = b, g = b;
              for (; h > 0 && /\w/.test(p[h - 1]); ) h--;
              for (; g < p.length && /\w/.test(p[g]); ) g++;
              h < g && (a = p.slice(h, g));
            }
          }
          if (!a) return !1;
          const l = yl(o.doc, a, !1, !1, !1);
          if (l.length === 0) return !1;
          const d = jw(l, s), c = l[d];
          return r.isActive = !0, r.ranges = [c], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = l, r.nextMatchIndex = (d + 1) % l.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Le, { activate: !0 })), setTimeout(() => {
            try {
              const m = e.view.domAtPos(c.from);
              m.node && m.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0;
        }
        if (r.isIncremental && r.allMatches.length > 0) {
          const o = r.nextMatchIndex, s = r.allMatches[o];
          return r.ranges.some(
            (a) => a.from === s.from && a.to === s.to
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Le, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Re(this.storage), t && t(e.setMeta(Le, { deactivate: !0 })), !0),
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
          return t.state.doc.nodesBetween(a.from, a.to, (d) => {
            d.isText && !o.isInSet(d.marks) && (l = !1);
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
              const l = $t(a, this.storage);
              this.storage.ranges = l, l.length === 0 && Re(this.storage);
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
        return Re(this.storage), !0;
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
              const s = $t(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Re(this.storage);
            }
          } catch {
          }
        }, 10) : Re(this.storage), !0;
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
      new Qe({
        key: Le,
        state: {
          init() {
            return qe.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Le);
            if (s?.deactivate || !e.isActive)
              return qe.empty;
            if (s?.activate || s?.refresh) {
              const i = [];
              for (const a of e.ranges) {
                i.push(
                  at.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), i.push(
                  at.widget(a.to, l, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return qe.create(o.doc, i);
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
              Re(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Le, { deactivate: !0 }));
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
              Re(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Le, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), Vf(t.state, t.dispatch), setTimeout(() => {
                  const s = $t(t);
                  e.ranges = s, s.length === 0 && Re(e);
                }, 10), !0;
              }
              Re(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Le, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, Kf(t.state, t.dispatch), setTimeout(() => {
                  const s = $t(t);
                  e.ranges = s, s.length === 0 && Re(e);
                }, 10), !0;
              }
              Re(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Le, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = $t(t);
                if (r.length === 0) {
                  Re(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Le, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, l) => l.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = $t(t);
                  e.ranges = a, a.length === 0 && Re(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Re(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Le, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), Re(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Le, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Re(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Le, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Re(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Le, { deactivate: !0 })), !1;
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
            const s = $t(t);
            if (s.length === 0) {
              Re(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Le, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((l, d) => d.from - l.from), { tr: a } = t.state;
            for (const l of i)
              a.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const l = $t(t);
              e.ranges = l, l.length === 0 && Re(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function Kw() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function qw(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function Gw(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let l = 0; l < i.length; l++)
    a[l] = i.charCodeAt(l);
  return new File([a], t, { type: s });
}
function Zw(e, t) {
  return t.includes(e.type);
}
function Xw(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function Qw(e, t, n) {
  return new Promise((r, o) => {
    const s = new window.Image(), i = new FileReader();
    i.onload = (a) => {
      s.src = a.target?.result;
    }, i.onerror = () => o(new Error("Failed to read file")), s.onload = () => {
      let a = s.width, l = s.height;
      if (a > t) {
        const g = t / a;
        a = t, l = Math.round(l * g);
      }
      const d = document.createElement("canvas");
      d.width = a, d.height = l;
      const c = d.getContext("2d");
      if (!c) {
        o(new Error("Failed to get canvas context"));
        return;
      }
      c.imageSmoothingEnabled = !0, c.imageSmoothingQuality = "high", c.drawImage(s, 0, 0, a, l);
      const m = e.type === "image/png" || e.type === "image/gif", f = m ? "image/png" : "image/jpeg", p = m ? void 0 : n, b = d.toDataURL(f, p), h = Gw(b, e.name);
      r({ dataUrl: b, file: h, width: a, height: l });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function Jw(e, t, n) {
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
async function xl(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!Zw(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = Kw();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const m = await Qw(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = m.dataUrl, i = m.file, s = Math.min(m.width, 600);
    } else {
      o = await qw(e), i = e;
      const m = await Xw(o);
      s = Math.min(m.width, 600);
    }
    t.chain().focus().setImage({
      src: o,
      alt: e.name,
      width: s
    }).run();
    const { state: l } = t.view, d = l.selection.from - 1, c = l.doc.nodeAt(d);
    if (c && c.type.name === "resizableImage") {
      const m = t.view.nodeDOM(d);
      if (m) {
        const f = m instanceof HTMLElement ? m : m.dom;
        f && f.classList.add("image-uploading");
      }
    }
    try {
      const m = await n.onImageUpload(i, {
        fileName: e.name,
        mimeType: i.type,
        fileSize: i.size,
        uploadId: r
      });
      let f = !1;
      return t.view.state.doc.descendants((p, b) => {
        if (f) return !1;
        if (p.type.name === "resizableImage" && p.attrs.src === o && p.attrs.alt === e.name) {
          try {
            const { state: h, dispatch: g } = t.view, y = h.doc.nodeAt(b);
            if (y) {
              const v = h.tr.setNodeMarkup(b, void 0, {
                ...y.attrs,
                src: m
              });
              g(v);
            }
          } catch (h) {
            console.warn("Failed to replace placeholder with uploaded reference:", h);
          }
          return f = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((p, b) => {
        if (p.type.name === "resizableImage" && p.attrs.src === m) {
          const h = t.view.nodeDOM(b);
          if (h) {
            const g = h instanceof HTMLElement ? h : h.dom;
            g && g.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (m) {
      return console.warn("Image upload failed, removing placeholder:", m), Jw(t, o, e.name), n.onUploadError?.(`Upload failed: ${m instanceof Error ? m.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function wl(e) {
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
const ek = bt.create({
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
      new Qe({
        key: new Xe("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = wl(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              xl(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = wl(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const l = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (l) {
              const d = n.state.tr.setSelection(
                ii.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(d);
            }
            return a.forEach((d) => {
              xl(d, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function tk({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = j(!1), [o, s] = j(0), i = z((c) => {
    c.preventDefault(), c.stopPropagation(), c.dataTransfer?.types.includes("Files") && (s((m) => m + 1), r(!0));
  }, []), a = z((c) => {
    c.preventDefault(), c.stopPropagation(), s((m) => {
      const f = m - 1;
      return f === 0 && r(!1), f;
    });
  }, []), l = z((c) => {
    c.preventDefault(), c.stopPropagation();
  }, []), d = z((c) => {
    c.preventDefault(), c.stopPropagation(), r(!1), s(0);
  }, []);
  return G(() => {
    if (!t || !e.current) return;
    const c = e.current;
    return c.addEventListener("dragenter", i), c.addEventListener("dragleave", a), c.addEventListener("dragover", l), c.addEventListener("drop", d), () => {
      c.removeEventListener("dragenter", i), c.removeEventListener("dragleave", a), c.removeEventListener("dragover", l), c.removeEventListener("drop", d);
    };
  }, [t, e, i, a, l, d]), n ? /* @__PURE__ */ u("div", { className: "image-drop-zone", children: /* @__PURE__ */ u("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ u("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ u(Sf, { className: "w-12 h-12" }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 84,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ u("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ u("span", { className: "image-drop-zone-title", children: "Drop image here" }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 82,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 81,
    columnNumber: 5
  }, this) : null;
}
function nk({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = j(e), [l, d] = j(t), c = V(null), m = V(null);
  G(() => {
    m.current?.focus(), m.current?.select();
  }, []), G(() => {
    const h = (y) => {
      c.current && !c.current.contains(y.target) && s();
    }, g = setTimeout(() => {
      document.addEventListener("mousedown", h);
    }, 100);
    return () => {
      clearTimeout(g), document.removeEventListener("mousedown", h);
    };
  }, [s]), G(() => {
    const h = (g) => {
      g.key === "Escape" ? s() : g.key === "Enter" && (g.metaKey || g.ctrlKey) && f();
    };
    return document.addEventListener("keydown", h), () => document.removeEventListener("keydown", h);
  }, [i, l, s]);
  const f = () => {
    i.trim() && r(i.trim(), l.trim());
  }, b = (() => {
    let v = n.x, x = n.y + 10;
    return v + 320 > window.innerWidth - 16 && (v = window.innerWidth - 320 - 16), v < 16 && (v = 16), x + 200 > window.innerHeight - 16 && (x = n.y - 200 - 10), { left: v, top: x };
  })();
  return /* @__PURE__ */ u(
    "div",
    {
      ref: c,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: b.left,
        top: b.top,
        zIndex: 1e3
      },
      children: [
        /* @__PURE__ */ u("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ u("span", { className: "image-edit-popover-title", children: "Edit Image" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 135,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ u(Dt, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 141,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 136,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 134,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ u("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ u("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ u("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ u(mi, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 150,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ u("span", { children: "Image URL" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 151,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 149,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ u(
              "input",
              {
                ref: m,
                type: "text",
                value: i,
                onChange: (h) => a(h.target.value),
                placeholder: "https://example.com/image.jpg",
                className: "image-edit-popover-input"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 153,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 148,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ u("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ u("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ u(So, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 166,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ u("span", { children: "Alt Text" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 167,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 165,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: l,
                onChange: (h) => d(h.target.value),
                placeholder: "Describe the image...",
                className: "image-edit-popover-input"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 169,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 164,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ u("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ u(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ u(Cn, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 186,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 181,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ u("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ u(
              "button",
              {
                onClick: s,
                className: "image-edit-popover-btn image-edit-popover-btn-cancel",
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 189,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: f,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !i.trim(),
                children: [
                  /* @__PURE__ */ u($n, { className: "w-4 h-4" }, void 0, !1, {
                    fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                    lineNumber: 200,
                    columnNumber: 13
                  }, this),
                  "Save"
                ]
              },
              void 0,
              !0,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 195,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 188,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 180,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/ImageEditPopover.tsx",
      lineNumber: 123,
      columnNumber: 5
    },
    this
  );
}
function eo(e) {
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
    const d = a.match(/^(#{1,6})\s+(.*)$/);
    if (d) {
      const v = d[1].length;
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
    const c = a.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (c) {
      const v = c[2].toLowerCase() === "x";
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
    const b = [
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
    for (const v of b) {
      let x;
      for (v.regex.lastIndex = 0; (x = v.regex.exec(a)) !== null; )
        h.push({
          start: l + x.index,
          end: l + x.index + x[0].length,
          type: v.type,
          content: x[0]
        });
    }
    h.sort((v, x) => v.start - x.start);
    const g = [];
    let y = l;
    for (const v of h)
      v.start >= y && (g.push(v), y = v.end);
    for (const v of g)
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
function kl(e) {
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
function en(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function to(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return en(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const d = s[l], c = i + d.length, m = t.filter((p) => p.start >= i && p.start < c);
      let f = i;
      for (const p of m)
        p.start > f && (o += en(e.substring(f, p.start))), o += `<span class="${kl(p.type)}">${en(p.content)}</span>`, f = p.end;
      f < c && (o += en(e.substring(f, c))), l < s.length - 1 && (o += `
`), i = c + 1;
    }
    return o;
  }
  const a = /* @__PURE__ */ new Map();
  n.forEach((l, d) => {
    for (let c = l.from; c < l.to; c++)
      a.set(c, { matchIdx: d, isCurrent: d === r });
  }), i = 0;
  for (let l = 0; l < s.length; l++) {
    const d = s[l], c = i + d.length, m = t.filter((p) => p.start >= i && p.start < c);
    let f = i;
    for (const p of m)
      p.start > f && (o += Ds(e, f, p.start, null, a)), o += Ds(e, p.start, p.end, kl(p.type), a), f = p.end;
    f < c && (o += Ds(e, f, c, null, a)), l < s.length - 1 && (o += `
`), i = c + 1;
  }
  return o;
}
function Ds(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const l = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const d = en(e.substring(l, i)), c = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${c}">${d}</mark></span>` : s += `<mark class="${c}">${d}</mark>`;
    } else {
      const l = i;
      for (; i < n && !o.has(i); )
        i++;
      const d = en(e.substring(l, i));
      r ? s += `<span class="${r}">${d}</span>` : s += d;
    }
  }
  return s;
}
function rk({
  content: e,
  onChange: t,
  placeholder: n = "Write your markdown here...",
  editable: r = !0,
  autofocus: o = !1,
  className: s = "",
  searchMatches: i,
  currentMatchIndex: a
}) {
  const l = V(null), d = V(null), c = V(null), m = V(null), f = 5e3, p = 80, [b, h] = j(() => {
    const k = eo(e);
    return to(e, k, i, a);
  }), g = V(null), y = tn(() => {
    if (e.length <= f) {
      const k = eo(e), D = to(e, k, i, a);
      return g.current && (clearTimeout(g.current), g.current = null), D;
    }
    return null;
  }, [e, i, a]);
  G(() => {
    if (e.length <= f) {
      const k = eo(e);
      h(to(e, k, i, a));
      return;
    }
    return g.current && clearTimeout(g.current), g.current = setTimeout(() => {
      const k = eo(e);
      h(to(e, k, i, a)), g.current = null;
    }, p), () => {
      g.current && clearTimeout(g.current);
    };
  }, [e, i, a]);
  const v = y ?? b, x = z(() => {
    const k = l.current, D = d.current, N = c.current;
    if (k) {
      const E = N?.parentElement, S = E ? E.clientHeight : 200;
      k.style.height = "auto";
      const P = Math.max(k.scrollHeight, S, 200);
      k.style.height = `${P}px`, D && (D.style.height = `${P}px`);
    }
  }, []);
  G(() => {
    const k = l.current;
    if (!k) return;
    const D = (N) => {
      const E = k.closest(".editor-content-wrapper");
      if (!E) return;
      const { scrollTop: S, scrollHeight: P, clientHeight: R } = E, I = S <= 0, B = S + R >= P - 1;
      (N.deltaY > 0 && !B || N.deltaY < 0 && !I) && (N.preventDefault(), E.scrollTop += N.deltaY);
    };
    return k.addEventListener("wheel", D, { passive: !1 }), () => k.removeEventListener("wheel", D);
  }, []);
  const M = z(() => {
  }, []);
  G(() => {
    x();
  }, [e, x]), G(() => {
    o && l.current && l.current.focus();
  }, [o]), G(() => {
    if (m.current && l.current) {
      const { start: k, end: D } = m.current;
      l.current.selectionStart = k, l.current.selectionEnd = D, m.current = null;
    }
  }, [e]);
  const w = z((k) => {
    const D = k.target;
    m.current = {
      start: D.selectionStart,
      end: D.selectionEnd
    }, t(D.value);
  }, [t]), T = z((k) => {
    const D = k.currentTarget, N = D.selectionStart, E = D.selectionEnd, S = D.value, P = N !== E;
    if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
      if (k.preventDefault(), P) {
        const R = S.substring(N, E), I = S.substring(0, N) + "`" + R + "`" + S.substring(E);
        m.current = { start: N + 1, end: E + 1 }, t(I);
      } else if (S[N] === "`")
        m.current = { start: N + 1, end: N + 1 }, t(S), D.selectionStart = D.selectionEnd = N + 1;
      else {
        const R = S.substring(0, N) + "``" + S.substring(E);
        m.current = { start: N + 1, end: N + 1 }, t(R);
      }
      return;
    }
    if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
      if (S[N - 1] === "*" && S[N], P) {
        k.preventDefault();
        const B = S.substring(N, E), H = S.substring(0, N) + "*" + B + "*" + S.substring(E);
        m.current = { start: N + 1, end: E + 1 }, t(H);
        return;
      }
      if (S[N] === "*") {
        k.preventDefault(), m.current = { start: N + 1, end: N + 1 }, t(S.substring(0, N) + S.substring(N));
        return;
      }
      k.preventDefault();
      const I = S.substring(0, N) + "**" + S.substring(E);
      m.current = { start: N + 1, end: N + 1 }, t(I);
      return;
    }
    if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
      if (P) {
        k.preventDefault();
        const I = S.substring(N, E), B = S.substring(0, N) + "_" + I + "_" + S.substring(E);
        m.current = { start: N + 1, end: E + 1 }, t(B);
        return;
      }
      if (S[N] === "_") {
        k.preventDefault(), m.current = { start: N + 1, end: N + 1 }, t(S.substring(0, N) + S.substring(N));
        return;
      }
      k.preventDefault();
      const R = S.substring(0, N) + "__" + S.substring(E);
      m.current = { start: N + 1, end: N + 1 }, t(R);
      return;
    }
    if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
      if (P) {
        k.preventDefault();
        const I = S.substring(N, E), B = S.substring(0, N) + "~" + I + "~" + S.substring(E);
        m.current = { start: N + 1, end: E + 1 }, t(B);
        return;
      }
      if (S[N] === "~") {
        k.preventDefault(), m.current = { start: N + 1, end: N + 1 }, t(S.substring(0, N) + S.substring(N));
        return;
      }
      k.preventDefault();
      const R = S.substring(0, N) + "~~" + S.substring(E);
      m.current = { start: N + 1, end: N + 1 }, t(R);
      return;
    }
    if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
      if (k.preventDefault(), P) {
        const R = S.substring(N, E), I = S.substring(0, N) + "[" + R + "]()" + S.substring(E);
        m.current = { start: E + 3, end: E + 3 }, t(I);
      } else {
        const R = S.substring(0, N) + "[]()" + S.substring(E);
        m.current = { start: N + 1, end: N + 1 }, t(R);
      }
      return;
    }
    if (k.key === "]" && !k.ctrlKey && !k.metaKey && S[N] === "]") {
      k.preventDefault(), m.current = { start: N + 1, end: N + 1 }, t(S.substring(0, N) + S.substring(N));
      return;
    }
    if (k.key === ")" && !k.ctrlKey && !k.metaKey && S[N] === ")") {
      k.preventDefault(), m.current = { start: N + 1, end: N + 1 }, t(S.substring(0, N) + S.substring(N));
      return;
    }
    if (k.key === "Backspace" && !P && N > 0) {
      const R = S[N - 1], I = S[N], B = [
        ["`", "`"],
        ["*", "*"],
        ["_", "_"],
        ["~", "~"],
        ["[", "]"]
      ];
      for (const [H, K] of B)
        if (R === H && I === K) {
          k.preventDefault();
          const A = S.substring(0, N - 1) + S.substring(N + 1);
          m.current = { start: N - 1, end: N - 1 }, t(A);
          return;
        }
      if (R === "[" && S.substring(N, N + 3) === "]()") {
        k.preventDefault();
        const H = S.substring(0, N - 1) + S.substring(N + 3);
        m.current = { start: N - 1, end: N - 1 }, t(H);
        return;
      }
    }
    if (k.key === "Tab")
      if (k.preventDefault(), k.shiftKey) {
        const R = S.substring(0, N), I = S.substring(N, E), B = S.substring(E), K = R.lastIndexOf(`
`) + 1, A = R.substring(0, K), $ = R.substring(K), Q = ($ + I).split(`
`), se = Q.map((oe) => oe.startsWith("  ") ? oe.substring(2) : oe.startsWith("	") ? oe.substring(1) : oe), ie = A + se.join(`
`) + B, re = ($ + I).length - se.join(`
`).length;
        m.current = {
          start: Math.max(K, N - (Q[0].length - se[0].length)),
          end: E - re
        }, t(ie);
      } else if (N === E) {
        const R = S.substring(0, N) + "  " + S.substring(E);
        m.current = { start: N + 2, end: N + 2 }, t(R);
      } else {
        const R = S.substring(0, N), I = S.substring(N, E), B = S.substring(E), K = R.lastIndexOf(`
`) + 1, A = R.substring(0, K), Q = (R.substring(K) + I).split(`
`), se = Q.map((re) => "  " + re), ie = A + se.join(`
`) + B;
        m.current = {
          start: N + 2,
          end: E + Q.length * 2
        }, t(ie);
      }
  }, [t]);
  return /* @__PURE__ */ u("div", { ref: c, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: d,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: v || `<span class="md-placeholder">${en(n)}</span>` },
        "aria-hidden": "true"
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 874,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ u(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: w,
        onKeyDown: T,
        onScroll: M,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 880,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
    lineNumber: 873,
    columnNumber: 5
  }, this);
}
let Cl = 0, ei = 0, Ad = 0;
function ok(e) {
  ei++, Ad = e;
}
const sk = Bn(function({
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
  }), l = V([]), d = V(performance.now()), c = V(0), m = V(0), f = V(0), p = V(0), [b, h] = j(new Array(60).fill(0)), [g, y] = j(new Array(60).fill(0));
  G(() => {
    if (!t || !r) return;
    const k = () => {
      const D = performance.now();
      queueMicrotask(() => {
        const N = performance.now() - D;
        ok(N);
      });
    };
    return r.on("transaction", k), () => {
      r.off("transaction", k);
    };
  }, [t, r]), G(() => {
    if (!t) return;
    let k = 0, D = performance.now(), N = 0;
    const E = (S) => {
      const P = S - d.current;
      if (d.current = S, l.current.push({ time: S, duration: P }), l.current.length > 120 && (l.current = l.current.slice(-120)), P > 16.67 && m.current++, k++, S - D >= 1e3) {
        N = k, k = 0, D = S;
        const R = l.current.slice(-60), I = R.length > 0 ? R.reduce((ie, re) => ie + re.duration, 0) / R.length : 0, B = R.length > 0 ? Math.max(...R.map((ie) => ie.duration)) : 0, H = performance.memory, K = H ? H.usedJSHeapSize / (1024 * 1024) : 0, A = H ? H.jsHeapSizeLimit / (1024 * 1024) : 0, $ = document.querySelectorAll("*").length, Q = Cl - f.current, se = ei - p.current;
        f.current = Cl, p.current = ei, a({
          fps: N,
          frameTime: Math.round(I * 100) / 100,
          frameTimeMax: Math.round(B * 100) / 100,
          memoryUsed: Math.round(K * 10) / 10,
          memoryTotal: Math.round(A),
          renderCount: Q,
          transactionCount: se,
          lastTransactionTime: Math.round(Ad * 100) / 100,
          domNodes: $,
          longFrames: m.current
        }), h((ie) => [...ie.slice(1), N]), y((ie) => [...ie.slice(1), I]), m.current = 0;
      }
      c.current = requestAnimationFrame(E);
    };
    return c.current = requestAnimationFrame(E), () => {
      cancelAnimationFrame(c.current);
    };
  }, [t]);
  const v = z(() => {
    n?.();
  }, [n]), x = z(() => {
    s((k) => !k);
  }, []);
  if (!t) return null;
  const M = (k) => k >= 55 ? "#4ade80" : k >= 30 ? "#fbbf24" : "#f87171", w = (k) => k <= 16.67 ? "#4ade80" : k <= 33.33 ? "#fbbf24" : "#f87171", T = (k, D, N) => {
    const P = k.map((R, I) => {
      const B = I / (k.length - 1) * 120, H = 24 - Math.min(R, D) / D * 24;
      return `${B},${H}`;
    }).join(" ");
    return /* @__PURE__ */ u("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ u(
      "polyline",
      {
        points: P,
        fill: "none",
        stroke: N,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 225,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 224,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ u("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ u("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ u("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ u(Mf, { size: 14 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 241,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u("span", { children: "Performance" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 242,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ u("button", { onClick: x, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ u(Zl, { size: 12 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 28
        }, this) : /* @__PURE__ */ u(Xl, { size: 12 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 54
        }, this) }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 245,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ u("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ u(Dt, { size: 12 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 249,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 248,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 244,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 239,
      columnNumber: 7
    }, this),
    !o && /* @__PURE__ */ u("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ u("div", { className: "perf-section", children: [
        /* @__PURE__ */ u("div", { className: "perf-row", children: [
          /* @__PURE__ */ u("span", { className: "perf-label", children: "FPS" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 259,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value", style: { color: M(i.fps) }, children: i.fps }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 260,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        T(b, 70, M(i.fps))
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 257,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("div", { className: "perf-section", children: [
        /* @__PURE__ */ u("div", { className: "perf-row", children: [
          /* @__PURE__ */ u("span", { className: "perf-label", children: "Frame Time" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 270,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value", style: { color: w(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 271,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 269,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ u("span", { className: "perf-label-sub", children: "Max" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value-sub", style: { color: w(i.frameTimeMax) }, children: [
            i.frameTimeMax,
            "ms"
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 277,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 275,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ u("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 282,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value-sub", style: { color: i.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            i.longFrames,
            "/s"
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 283,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, this),
        T(g, 50, w(i.frameTime))
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 268,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("div", { className: "perf-section", children: [
        /* @__PURE__ */ u("div", { className: "perf-row", children: [
          /* @__PURE__ */ u("span", { className: "perf-label", children: "Renders/s" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 293,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value", children: i.renderCount }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 294,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 292,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u("div", { className: "perf-row", children: [
          /* @__PURE__ */ u("span", { className: "perf-label", children: "Transactions/s" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 297,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value", children: i.transactionCount }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 298,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 296,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ u("span", { className: "perf-label-sub", children: "Last TX time" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 301,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 302,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 300,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 291,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("div", { className: "perf-section", children: [
        /* @__PURE__ */ u("div", { className: "perf-row", children: [
          /* @__PURE__ */ u("span", { className: "perf-label", children: "DOM Nodes" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 309,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value", children: i.domNodes.toLocaleString() }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 310,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 308,
          columnNumber: 13
        }, this),
        i.memoryTotal > 0 && /* @__PURE__ */ u("div", { className: "perf-row", children: [
          /* @__PURE__ */ u("span", { className: "perf-label", children: "Memory" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ u("span", { className: "perf-value", children: [
            i.memoryUsed,
            "MB / ",
            i.memoryTotal,
            "MB"
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 315,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 313,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 307,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 255,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/PerformanceProfiler.tsx",
    lineNumber: 237,
    columnNumber: 5
  }, this);
});
class ik extends qm {
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
      return /* @__PURE__ */ u("div", { className: le("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ u("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ u("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ u(Df, { className: "w-6 h-6 text-destructive" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 139,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ u("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 145,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ u("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 148,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 144,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ u("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ u(
            zt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ u(wi, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 164,
                  columnNumber: 17
                }, this),
                "Retry ",
                r > 0 && `(${r})`
              ]
            },
            void 0,
            !0,
            {
              fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 158,
              columnNumber: 15
            },
            this
          ),
          s && this.props.onClearContent && /* @__PURE__ */ u(
            zt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ u(Cn, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 176,
                  columnNumber: 19
                }, this),
                "Clear Content & Retry"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 170,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 156,
          columnNumber: 13
        }, this),
        t && /* @__PURE__ */ u("div", { className: "w-full max-w-xs", children: [
          /* @__PURE__ */ u(
            "button",
            {
              onClick: this.toggleDetails,
              className: le(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ u(Ht, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 193,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ u(jl, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 195,
                  columnNumber: 21
                }, this),
                "Error details"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 185,
              columnNumber: 17
            },
            this
          ),
          n && /* @__PURE__ */ u("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ u("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ u("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                lineNumber: 203,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ u(Pe, { children: [
                    /* @__PURE__ */ u(Rf, { className: "w-3 h-3 text-green-500" }, void 0, !1, {
                      fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 210,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ u("span", { className: "text-green-500", children: "Copied" }, void 0, !1, {
                      fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 211,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 209,
                    columnNumber: 27
                  }, this) : /* @__PURE__ */ u(Pe, { children: [
                    /* @__PURE__ */ u(Wn, { className: "w-3 h-3" }, void 0, !1, {
                      fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 215,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ u("span", { children: "Copy" }, void 0, !1, {
                      fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 216,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 214,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 204,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 202,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ u("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 221,
              columnNumber: 21
            }, this),
            t.stack && /* @__PURE__ */ u("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 225,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 201,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 184,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function ak({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function lk(e, t) {
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
function ck(e) {
  const [t, n] = Gm(lk, { status: "idle" }), r = V(null), o = z(async (a, l, d, c, m) => {
    if (e) {
      n({
        type: "start-streaming",
        action: a,
        actionLabel: l,
        inputText: d,
        selectionRange: c
      });
      try {
        const f = e(a, d, m);
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
const uk = {
  SpellCheck: Pf,
  RefreshCw: Af,
  Minimize2: Xl,
  Maximize2: Zl,
  FileText: yi,
  MessageSquare: Ql,
  Sparkles: Eo
};
function dk({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = j(""), [a, l] = j(!1), d = V(null), c = V(null), m = e.filter((g) => g.scope === t || g.scope === "both");
  G(() => {
    const g = (v) => {
      d.current && !d.current.contains(v.target) && r();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 50);
    return () => {
      clearTimeout(y), document.removeEventListener("mousedown", g);
    };
  }, [r]), G(() => {
    const g = (y) => {
      y.key === "Escape" && r();
    };
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [r]), G(() => {
    a && c.current && c.current.focus();
  }, [a]);
  const p = z(() => {
    const y = m.length * 40 + (a ? 56 : 0) + 16, v = window.innerWidth, x = window.innerHeight;
    let M = o.top, w = o.left;
    return w + 260 > v - 8 && (w = v - 260 - 8), w < 8 && (w = 8), M + y > x - 8 && (M = o.top - y - 8), M < 8 && (M = 8), { top: M, left: w };
  }, [o, m.length, a])(), b = () => {
    s.trim() && (n("custom", s.trim()), i(""), l(!1));
  }, h = /* @__PURE__ */ u(
    "div",
    {
      ref: d,
      className: "ai-dropdown-menu",
      style: {
        position: "fixed",
        top: p.top,
        left: p.left,
        zIndex: 1e4
      },
      onMouseDown: (g) => g.preventDefault(),
      children: /* @__PURE__ */ u(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-lg overflow-hidden
          w-[260px] py-1
          animate-in fade-in-0 zoom-in-95 duration-100
        `,
          children: [
            /* @__PURE__ */ u("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ u("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ u(Ql, { size: 14, className: "text-muted-foreground shrink-0" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
                lineNumber: 144,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ u(
                "input",
                {
                  ref: c,
                  type: "text",
                  placeholder: "Modify with prompt…",
                  value: s,
                  onChange: (g) => i(g.target.value),
                  onKeyDown: (g) => {
                    g.key === "Enter" && (g.preventDefault(), b()), g.stopPropagation();
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
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
                  lineNumber: 145,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 143,
              columnNumber: 11
            }, this) }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 142,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ u("div", { className: "h-px bg-border mx-2 my-0.5" }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 169,
              columnNumber: 9
            }, this),
            m.filter((g) => !g.showCustomPrompt).map((g) => {
              const y = g.icon ? uk[g.icon] : Eo;
              return /* @__PURE__ */ u(
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
                    y && /* @__PURE__ */ u(y, { size: 15, className: "text-muted-foreground shrink-0" }, void 0, !1, {
                      fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 189,
                      columnNumber: 35
                    }, this),
                    /* @__PURE__ */ u("span", { children: g.label }, void 0, !1, {
                      fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 190,
                      columnNumber: 17
                    }, this)
                  ]
                },
                g.id,
                !0,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
                  lineNumber: 177,
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
          fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
          lineNumber: 133,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
      lineNumber: 122,
      columnNumber: 5
    },
    this
  );
  return jt(h, document.body);
}
function mk({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = V(null), a = V(null), [l, d] = j(!1), [c, m] = j(0);
  G(() => {
    if (i.current) {
      const w = new ResizeObserver((T) => {
        for (const k of T)
          m(k.contentRect.height);
      });
      return w.observe(i.current), () => w.disconnect();
    }
  }, []), G(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), G(() => {
    const w = (T) => {
      T.key === "Escape" && s();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [s]);
  const f = tn(() => {
    const D = window.innerWidth, N = window.innerHeight;
    let E = t.selectionCenterX - 380 / 2;
    E + 380 > D - 8 && (E = D - 380 - 8), E < 8 && (E = 8);
    const S = N - t.selectionBottom - 8, P = t.selectionTop - 8, R = c || 200;
    let I, B = !1;
    return S >= R || S >= P ? I = t.selectionBottom + 8 : (I = t.selectionTop - 8 - R, B = !0), I < 8 && (I = 8), I + R > N - 8 && (I = N - R - 8), { top: I, left: E, placedAbove: B };
  }, [t, c]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", b = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", h = e.status === "streaming", g = e.status === "complete", y = e.status === "error", v = z(() => {
    navigator.clipboard.writeText(p), d(!0), setTimeout(() => d(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const x = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", M = /* @__PURE__ */ u(
    "div",
    {
      ref: i,
      className: "ai-result-popover",
      style: {
        position: "fixed",
        top: f.top,
        left: f.left,
        zIndex: 10001
      },
      onMouseDown: (w) => w.preventDefault(),
      children: /* @__PURE__ */ u(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-xl overflow-hidden
          w-[380px] max-w-[calc(100vw-16px)]
          ${x}
        `,
          children: [
            /* @__PURE__ */ u("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ u("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                h && /* @__PURE__ */ u(Gl, { size: 12, className: "animate-spin" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 175,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ u("span", { className: "font-medium", children: y ? "Error" : b }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 176,
                  columnNumber: 13
                }, this),
                h && /* @__PURE__ */ u("span", { className: "opacity-60", children: "Generating…" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 179,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 174,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ u(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (w) => {
                    w.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ u(Dt, { size: 14, className: "text-muted-foreground" }, void 0, !1, {
                    fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 186,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 181,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 173,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ u(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: y ? /* @__PURE__ */ u("div", { className: "text-destructive", children: e.message }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 196,
                  columnNumber: 13
                }, this) : /* @__PURE__ */ u("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  h && /* @__PURE__ */ u("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" }, void 0, !1, {
                    fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 203,
                    columnNumber: 17
                  }, this)
                ] }, void 0, !0, {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 200,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 191,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (g || y) && /* @__PURE__ */ u(Pe, { children: [
                g && /* @__PURE__ */ u(Pe, { children: [
                  /* @__PURE__ */ u(
                    kn,
                    {
                      icon: Ls,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 215,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ u(
                    kn,
                    {
                      icon: xi,
                      label: "Insert",
                      onClick: r
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 221,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ u(
                    kn,
                    {
                      icon: l ? $n : Wn,
                      label: l ? "Copied" : "Copy",
                      onClick: v
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 226,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 214,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ u(
                  kn,
                  {
                    icon: wi,
                    label: "Retry",
                    onClick: o
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 233,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ u("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 238,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ u(
                  kn,
                  {
                    icon: Dt,
                    label: "Discard",
                    onClick: s
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 239,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 212,
                columnNumber: 13
              }, this),
              h && /* @__PURE__ */ u(Pe, { children: [
                /* @__PURE__ */ u("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 248,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ u(
                  kn,
                  {
                    icon: Dt,
                    label: "Stop",
                    onClick: s
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 249,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 247,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 210,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 164,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 153,
      columnNumber: 5
    },
    this
  );
  return jt(M, document.body);
}
function kn({
  icon: e,
  label: t,
  onClick: n,
  primary: r = !1
}) {
  return /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(e, { size: 12 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 289,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ u("span", { children: t }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 290,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/tmp/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 278,
      columnNumber: 5
    },
    this
  );
}
const Pd = "paragon-editor-toc-width", fk = 280, Id = 200, Ld = 500;
function Tl() {
  try {
    const e = localStorage.getItem(Pd);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= Id && t <= Ld)
        return t;
    }
  } catch {
  }
  return fk;
}
function pk(e) {
  try {
    localStorage.setItem(Pd, String(e));
  } catch {
  }
}
function hk(e, t, n) {
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
function gk(e) {
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
function El(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const Sl = Bn(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: r,
  title: o = "",
  minLevel: s = 1,
  maxLevel: i = 4,
  showLevelIndicators: a = !1,
  highlightActive: l = !0,
  treeView: d = !1,
  className: c = "",
  width: m,
  position: f = "right",
  scrollOffset: p = 20,
  onItemClick: b,
  renderItem: h,
  showToggleButton: g = !0,
  scrollContainerRef: y
}) {
  const [v, x] = j([]), [M, w] = j(null), [T, k] = j(n), [D, N] = j(/* @__PURE__ */ new Set()), [E, S] = j(() => {
    if (m) {
      const U = parseInt(m, 10);
      return isNaN(U) ? Tl() : U;
    }
    return Tl();
  }), P = V(null), R = V(null), I = V(!1), B = V(0), H = V(0);
  G(() => {
    k(n);
  }, [n]);
  const K = z((U) => {
    U.preventDefault(), U.stopPropagation(), I.current = !0, B.current = U.clientX, H.current = E, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [E]);
  G(() => {
    const U = (te) => {
      if (!I.current) return;
      const ve = f === "right" ? B.current - te.clientX : te.clientX - B.current, we = Math.min(Ld, Math.max(Id, H.current + ve));
      S(we);
    }, Y = () => {
      I.current && (I.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", S((te) => (pk(te), te)));
    };
    return document.addEventListener("mousemove", U), document.addEventListener("mouseup", Y), () => {
      document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", Y);
    };
  }, [f]);
  const A = z(() => {
    if (!t || t.isDestroyed) return;
    const U = hk(t, s, i);
    x(U), M && !U.find((Y) => Y.id === M) && w(null);
  }, [t, s, i, M]);
  G(() => {
    if (!t) return;
    const U = () => {
      R.current && clearTimeout(R.current), R.current = setTimeout(() => A(), 300);
    };
    return A(), t.on("update", U), t.on("create", U), () => {
      t.off("update", U), t.off("create", U), R.current && clearTimeout(R.current);
    };
  }, [t, A]), G(() => {
    if (!t || !l || !T || v.length === 0) return;
    const U = y?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!U) return;
    const Y = () => {
      const we = U.getBoundingClientRect();
      let Te = null;
      for (let Ie = v.length - 1; Ie >= 0; Ie--) {
        const Je = v[Ie], It = El(t, Je.pos);
        if (It && It.getBoundingClientRect().top - we.top <= p + 10) {
          Te = Je.id;
          break;
        }
      }
      !Te && v.length > 0 && (Te = v[0].id), w(Te);
    };
    let te;
    const ve = () => {
      cancelAnimationFrame(te), te = requestAnimationFrame(Y);
    };
    return U.addEventListener("scroll", ve, { passive: !0 }), Y(), () => {
      U.removeEventListener("scroll", ve), cancelAnimationFrame(te);
    };
  }, [t, v, l, T, p, y]);
  const $ = z((U) => {
    if (!t || t.isDestroyed) return;
    const Y = El(t, U.pos);
    if (Y) {
      const te = y?.current || t.view.dom.closest(".editor-content-wrapper");
      if (te) {
        const ve = te.getBoundingClientRect(), Te = Y.getBoundingClientRect().top - ve.top + te.scrollTop;
        te.scrollTo({ top: Te - p, behavior: "smooth" });
      } else
        Y.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(U.pos + 1);
    } catch {
    }
    w(U.id), b?.(U);
  }, [t, p, b, y]), Q = z(() => {
    const U = !T;
    k(U), r?.(U);
  }, [T, r]), se = z((U) => {
    N((Y) => {
      const te = new Set(Y);
      return te.has(U) ? te.delete(U) : te.add(U), te;
    });
  }, []), ie = z((U, Y, te = 0) => {
    if (h)
      return h(U, Y, () => $(U));
    const ve = (U.level - s) * 14, we = d && U.children && U.children.length > 0, Te = D.has(U.id);
    return /* @__PURE__ */ u(
      "div",
      {
        className: `toc-item ${Y ? "toc-item-active" : ""} toc-level-${U.level}`,
        style: { paddingLeft: `${ve + 10}px` },
        children: /* @__PURE__ */ u(
          "button",
          {
            className: "toc-item-button",
            onClick: () => $(U),
            title: U.text,
            children: [
              we && /* @__PURE__ */ u(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Ie) => {
                    Ie.stopPropagation(), se(U.id);
                  },
                  children: /* @__PURE__ */ u("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: Te ? /* @__PURE__ */ u("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 340,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ u("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 341,
                    columnNumber: 21
                  }, this) }, void 0, !1, {
                    fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 338,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 331,
                  columnNumber: 13
                },
                this
              ),
              a && /* @__PURE__ */ u("span", { className: "toc-level-indicator", children: [
                "H",
                U.level
              ] }, void 0, !0, {
                fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 347,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ u("span", { className: "toc-item-text", children: U.text }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 349,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 325,
            columnNumber: 9
          },
          this
        )
      },
      U.id,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 320,
        columnNumber: 7
      },
      this
    );
  }, [h, $, d, s, a, D, se]), re = z((U, Y = 0) => U.map((te) => {
    const ve = M === te.id, we = D.has(te.id), Te = te.children && te.children.length > 0;
    return /* @__PURE__ */ u("div", { children: [
      ie(te, ve, Y),
      Te && !we && /* @__PURE__ */ u("div", { className: "toc-children", children: re(te.children, Y + 1) }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 364,
        columnNumber: 13
      }, this)
    ] }, te.id, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 361,
      columnNumber: 9
    }, this);
  }), [M, D, ie]), oe = z(() => v.map((U) => {
    const Y = M === U.id;
    return ie(U, Y);
  }), [v, M, ie]);
  if (!t) return null;
  const O = d ? gk(v) : [];
  return /* @__PURE__ */ u(Pe, { children: [
    g && /* @__PURE__ */ u(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: Q,
        title: T ? "Hide Table of Contents" : "Show Table of Contents",
        children: T ? /* @__PURE__ */ u(If, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 24
        }, this) : /* @__PURE__ */ u(Lf, { size: 16 }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 56
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 388,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ u(
      "div",
      {
        ref: P,
        className: `toc-sidebar ${T ? "toc-visible" : "toc-hidden"} toc-${f} ${c}`,
        style: { width: T ? `${E}px` : "0px" },
        children: [
          T && /* @__PURE__ */ u(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: K
            },
            void 0,
            !1,
            {
              fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 405,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ u("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ u("div", { className: "toc-header", children: /* @__PURE__ */ u("span", { className: "toc-title", children: o }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 415,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 414,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ u("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ u("div", { className: "toc-empty", children: [
              /* @__PURE__ */ u("p", { children: "No headings yet" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 423,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ u("p", { className: "toc-empty-hint", children: "Add headings to see the outline." }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 424,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 422,
              columnNumber: 15
            }, this) : /* @__PURE__ */ u("div", { className: "toc-list", children: d ? re(O) : oe() }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 427,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 420,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 411,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 398,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/TableOfContents.tsx",
    lineNumber: 385,
    columnNumber: 5
  }, this);
});
function bk(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n)
      n.hasOwnProperty(r) && (e[r] = n[r]);
  }
  return e;
}
function ti(e, t) {
  return Array(t + 1).join(e);
}
function Od(e) {
  return e.replace(/^\n*/, "");
}
function _d(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function Bd(e) {
  return _d(Od(e));
}
var vk = [
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
function Xi(e) {
  return Qi(e, vk);
}
var $d = [
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
function Wd(e) {
  return Qi(e, $d);
}
function Nk(e) {
  return Hd(e, $d);
}
var zd = [
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
function yk(e) {
  return Qi(e, zd);
}
function xk(e) {
  return Hd(e, zd);
}
function Qi(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function Hd(e, t) {
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
      var o = ti(r === 1 ? "=" : "-", e.length);
      return `

` + e + `
` + o + `

`;
    } else
      return `

` + ti("#", r) + " " + e + `

`;
  }
};
We.blockquote = {
  filter: "blockquote",
  replacement: function(e) {
    return e = Bd(e).replace(/^/gm, "> "), `

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
      var s = o.getAttribute("start"), i = Array.prototype.indexOf.call(o.children, t);
      r = (s ? Number(s) + i : i + 1) + ".  ";
    }
    var a = /\n$/.test(e);
    return e = Bd(e) + (a ? `
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
    for (var r = t.firstChild.getAttribute("class") || "", o = (r.match(/language-(\S+)/) || [null, ""])[1], s = t.firstChild.textContent, i = n.fence.charAt(0), a = 3, l = new RegExp("^" + i + "{3,}", "gm"), d; d = l.exec(s); )
      d[0].length >= a && (a = d[0].length + 1);
    var c = ti(i, a);
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
    var r = vo(t.getAttribute("title"));
    return r && (r = ' "' + r.replace(/"/g, '\\"') + '"'), "[" + e + "](" + n + r + ")";
  }
};
We.referenceLink = {
  filter: function(e, t) {
    return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t, n) {
    var r = t.getAttribute("href"), o = vo(t.getAttribute("title"));
    o && (o = ' "' + o + '"');
    var s, i;
    switch (n.linkReferenceStyle) {
      case "collapsed":
        s = "[" + e + "][]", i = "[" + e + "]: " + r + o;
        break;
      case "shortcut":
        s = "[" + e + "]", i = "[" + e + "]: " + r + o;
        break;
      default:
        var a = this.references.length + 1;
        s = "[" + e + "][" + a + "]", i = "[" + a + "]: " + r + o;
    }
    return this.references.push(i), s;
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
    var n = vo(t.getAttribute("alt")), r = t.getAttribute("src") || "", o = vo(t.getAttribute("title")), s = o ? ' "' + o + '"' : "";
    return r ? "![" + n + "](" + r + s + ")" : "";
  }
};
function vo(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function Fd(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = {
    replacement: e.blankReplacement
  }, this.keepReplacement = e.keepReplacement, this.defaultRule = {
    replacement: e.defaultReplacement
  }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
Fd.prototype = {
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
    return (t = Rs(this.array, e, this.options)) || (t = Rs(this._keep, e, this.options)) || (t = Rs(this._remove, e, this.options)) ? t : this.defaultRule;
  },
  forEach: function(e) {
    for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
  }
};
function Rs(e, t, n) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r];
    if (wk(o, t, n)) return o;
  }
}
function wk(e, t, n) {
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
function kk(e) {
  var t = e.element, n = e.isBlock, r = e.isVoid, o = e.isPre || function(m) {
    return m.nodeName === "PRE";
  };
  if (!(!t.firstChild || o(t))) {
    for (var s = null, i = !1, a = null, l = Ml(a, t, o); l !== t; ) {
      if (l.nodeType === 3 || l.nodeType === 4) {
        var d = l.data.replace(/[ \r\n\t]+/g, " ");
        if ((!s || / $/.test(s.data)) && !i && d[0] === " " && (d = d.substr(1)), !d) {
          l = As(l);
          continue;
        }
        l.data = d, s = l;
      } else if (l.nodeType === 1)
        n(l) || l.nodeName === "BR" ? (s && (s.data = s.data.replace(/ $/, "")), s = null, i = !1) : r(l) || o(l) ? (s = null, i = !0) : s && (i = !1);
      else {
        l = As(l);
        continue;
      }
      var c = Ml(a, l, o);
      a = l, l = c;
    }
    s && (s.data = s.data.replace(/ $/, ""), s.data || As(s));
  }
}
function As(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function Ml(e, t, n) {
  return e && e.parentNode === t || n(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var Ji = typeof window < "u" ? window : {};
function Ck() {
  var e = Ji.DOMParser, t = !1;
  try {
    new e().parseFromString("", "text/html") && (t = !0);
  } catch {
  }
  return t;
}
function Tk() {
  var e = function() {
  };
  return Ek() ? e.prototype.parseFromString = function(t) {
    var n = new window.ActiveXObject("htmlfile");
    return n.designMode = "on", n.open(), n.write(t), n.close(), n;
  } : e.prototype.parseFromString = function(t) {
    var n = document.implementation.createHTMLDocument("");
    return n.open(), n.write(t), n.close(), n;
  }, e;
}
function Ek() {
  var e = !1;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    Ji.ActiveXObject && (e = !0);
  }
  return e;
}
var Sk = Ck() ? Ji.DOMParser : Tk();
function Mk(e, t) {
  var n;
  if (typeof e == "string") {
    var r = Dk().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + e + "</x-turndown>",
      "text/html"
    );
    n = r.getElementById("turndown-root");
  } else
    n = e.cloneNode(!0);
  return kk({
    element: n,
    isBlock: Xi,
    isVoid: Wd,
    isPre: t.preformattedCode ? Rk : null
  }), n;
}
var Ps;
function Dk() {
  return Ps = Ps || new Sk(), Ps;
}
function Rk(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function Ak(e, t) {
  return e.isBlock = Xi(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = Pk(e), e.flankingWhitespace = Ik(e, t), e;
}
function Pk(e) {
  return !Wd(e) && !yk(e) && /^\s*$/i.test(e.textContent) && !Nk(e) && !xk(e);
}
function Ik(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode)
    return { leading: "", trailing: "" };
  var n = Lk(e.textContent);
  return n.leadingAscii && Dl("left", e, t) && (n.leading = n.leadingNonAscii), n.trailingAscii && Dl("right", e, t) && (n.trailing = n.trailingNonAscii), { leading: n.leading, trailing: n.trailing };
}
function Lk(e) {
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
function Dl(e, t, n) {
  var r, o, s;
  return e === "left" ? (r = t.previousSibling, o = / $/) : (r = t.nextSibling, o = /^ /), r && (r.nodeType === 3 ? s = o.test(r.nodeValue) : n.preformattedCode && r.nodeName === "CODE" ? s = !1 : r.nodeType === 1 && !Xi(r) && (s = o.test(r.textContent))), s;
}
var Ok = Array.prototype.reduce, _k = [
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
function No(e) {
  if (!(this instanceof No)) return new No(e);
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
  this.options = bk({}, t, e), this.rules = new Fd(this.options);
}
No.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */
  turndown: function(e) {
    if (!Wk(e))
      throw new TypeError(
        e + " is not a string, or an element/document/fragment node."
      );
    if (e === "") return "";
    var t = Ud.call(this, new Mk(e, this.options));
    return Bk.call(this, t);
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
    return _k.reduce(function(t, n) {
      return t.replace(n[0], n[1]);
    }, e);
  }
};
function Ud(e) {
  var t = this;
  return Ok.call(e.childNodes, function(n, r) {
    r = new Ak(r, t.options);
    var o = "";
    return r.nodeType === 3 ? o = r.isCode ? r.nodeValue : t.escape(r.nodeValue) : r.nodeType === 1 && (o = $k.call(t, r)), Yd(n, o);
  }, "");
}
function Bk(e) {
  var t = this;
  return this.rules.forEach(function(n) {
    typeof n.append == "function" && (e = Yd(e, n.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function $k(e) {
  var t = this.rules.forNode(e), n = Ud.call(this, e), r = e.flankingWhitespace;
  return (r.leading || r.trailing) && (n = n.trim()), r.leading + t.replacement(n, e, this.options) + r.trailing;
}
function Yd(e, t) {
  var n = _d(e), r = Od(t), o = Math.max(e.length - n.length, t.length - r.length), s = `

`.substring(0, o);
  return n + s + r;
}
function Wk(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
var Rl = /highlight-(?:text|source)-([a-z0-9]+)/;
function zk(e) {
  e.addRule("highlightedCodeBlock", {
    filter: function(t) {
      var n = t.firstChild;
      return t.nodeName === "DIV" && Rl.test(t.className) && n && n.nodeName === "PRE";
    },
    replacement: function(t, n, r) {
      var o = n.className || "", s = (o.match(Rl) || [null, ""])[1];
      return `

` + r.fence + s + `
` + n.firstChild.textContent + `
` + r.fence + `

`;
    }
  });
}
function Hk(e) {
  e.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: function(t) {
      return "~" + t + "~";
    }
  });
}
var Fk = Array.prototype.indexOf, Uk = Array.prototype.every, On = {};
On.tableCell = {
  filter: ["th", "td"],
  replacement: function(e, t) {
    return jd(e, t);
  }
};
On.tableRow = {
  filter: "tr",
  replacement: function(e, t) {
    var n = "", r = { left: ":--", right: "--:", center: ":-:" };
    if (ea(t))
      for (var o = 0; o < t.childNodes.length; o++) {
        var s = "---", i = (t.childNodes[o].getAttribute("align") || "").toLowerCase();
        i && (s = r[i] || s), n += jd(s, t.childNodes[o]);
      }
    return `
` + e + (n ? `
` + n : "");
  }
};
On.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function(e) {
    return e.nodeName === "TABLE" && ea(e.rows[0]);
  },
  replacement: function(e) {
    return e = e.replace(`

`, `
`), `

` + e + `

`;
  }
};
On.tableSection = {
  filter: ["thead", "tbody", "tfoot"],
  replacement: function(e) {
    return e;
  }
};
function ea(e) {
  var t = e.parentNode;
  return t.nodeName === "THEAD" || t.firstChild === e && (t.nodeName === "TABLE" || Yk(t)) && Uk.call(e.childNodes, function(n) {
    return n.nodeName === "TH";
  });
}
function Yk(e) {
  var t = e.previousSibling;
  return e.nodeName === "TBODY" && (!t || t.nodeName === "THEAD" && /^\s*$/i.test(t.textContent));
}
function jd(e, t) {
  var n = Fk.call(t.parentNode.childNodes, t), r = " ";
  return n === 0 && (r = "| "), r + e + " |";
}
function jk(e) {
  e.keep(function(n) {
    return n.nodeName === "TABLE" && !ea(n.rows[0]);
  });
  for (var t in On) e.addRule(t, On[t]);
}
function Vk(e) {
  e.addRule("taskListItems", {
    filter: function(t) {
      return t.type === "checkbox" && t.parentNode.nodeName === "LI";
    },
    replacement: function(t, n) {
      return (n.checked ? "[x]" : "[ ]") + " ";
    }
  });
}
function Kk(e) {
  e.use([
    zk,
    Hk,
    jk,
    Vk
  ]);
}
function qk() {
  return tn(() => {
    const e = new No({
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
    return e.use(Kk), e.addRule("highlight", {
      filter: (t) => t.nodeName === "MARK",
      replacement: (t) => `==${t}==`
    }), e.addRule("resizableImage", {
      filter: "img",
      replacement: (t, n) => {
        const r = n, o = r.getAttribute("src") || "", i = (r.getAttribute("alt") || "").replace(/\s*\|\s*\d+\s*$/, "").trim(), a = r.getAttribute("width"), l = a ? parseInt(a, 10) : null;
        return l && l > 0 ? `![${i}|${l}](${o})` : `![${i}](${o})`;
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
        return o.forEach((i, a) => {
          const l = Array.from(i.querySelectorAll("th, td")), d = l.map((c) => (c.textContent?.trim() || "").replace(/\|/g, "\\|"));
          if (s.push("| " + d.join(" | ") + " |"), a === 0) {
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
        return r ? `@${xv(r)}@` : t;
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
function ta() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var ln = ta();
function Vd(e) {
  ln = e;
}
var mr = { exec: () => null };
function ge(e, t = "") {
  let n = typeof e == "string" ? e : e.source, r = { replace: (o, s) => {
    let i = typeof s == "string" ? s : s.source;
    return i = i.replace(Fe.caret, "$1"), n = n.replace(o, i), r;
  }, getRegex: () => new RegExp(n, t) };
  return r;
}
var Gk = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), Fe = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`), htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i") }, Zk = /^(?:[ \t]*(?:\n|$))+/, Xk = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Qk = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Rr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Jk = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, na = /(?:[*+-]|\d{1,9}[.)])/, Kd = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, qd = ge(Kd).replace(/bull/g, na).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), e1 = ge(Kd).replace(/bull/g, na).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ra = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, t1 = /^[^\n]+/, oa = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, n1 = ge(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", oa).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), r1 = ge(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, na).getRegex(), Uo = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", sa = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, o1 = ge("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", sa).replace("tag", Uo).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Gd = ge(ra).replace("hr", Rr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Uo).getRegex(), s1 = ge(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Gd).getRegex(), ia = { blockquote: s1, code: Xk, def: n1, fences: Qk, heading: Jk, hr: Rr, html: o1, lheading: qd, list: r1, newline: Zk, paragraph: Gd, table: mr, text: t1 }, Al = ge("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Rr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Uo).getRegex(), i1 = { ...ia, lheading: e1, table: Al, paragraph: ge(ra).replace("hr", Rr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Al).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Uo).getRegex() }, a1 = { ...ia, html: ge(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", sa).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: mr, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: ge(ra).replace("hr", Rr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", qd).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, l1 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, c1 = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Zd = /^( {2,}|\\)\n(?!\s*$)/, u1 = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Yo = /[\p{P}\p{S}]/u, aa = /[\s\p{P}\p{S}]/u, Xd = /[^\s\p{P}\p{S}]/u, d1 = ge(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, aa).getRegex(), Qd = /(?!~)[\p{P}\p{S}]/u, m1 = /(?!~)[\s\p{P}\p{S}]/u, f1 = /(?:[^\s\p{P}\p{S}]|~)/u, p1 = ge(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Gk ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Jd = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, h1 = ge(Jd, "u").replace(/punct/g, Yo).getRegex(), g1 = ge(Jd, "u").replace(/punct/g, Qd).getRegex(), em = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", b1 = ge(em, "gu").replace(/notPunctSpace/g, Xd).replace(/punctSpace/g, aa).replace(/punct/g, Yo).getRegex(), v1 = ge(em, "gu").replace(/notPunctSpace/g, f1).replace(/punctSpace/g, m1).replace(/punct/g, Qd).getRegex(), N1 = ge("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Xd).replace(/punctSpace/g, aa).replace(/punct/g, Yo).getRegex(), y1 = ge(/\\(punct)/, "gu").replace(/punct/g, Yo).getRegex(), x1 = ge(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), w1 = ge(sa).replace("(?:-->|$)", "-->").getRegex(), k1 = ge("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", w1).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), yo = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, C1 = ge(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", yo).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), tm = ge(/^!?\[(label)\]\[(ref)\]/).replace("label", yo).replace("ref", oa).getRegex(), nm = ge(/^!?\[(ref)\](?:\[\])?/).replace("ref", oa).getRegex(), T1 = ge("reflink|nolink(?!\\()", "g").replace("reflink", tm).replace("nolink", nm).getRegex(), Pl = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, la = { _backpedal: mr, anyPunctuation: y1, autolink: x1, blockSkip: p1, br: Zd, code: c1, del: mr, emStrongLDelim: h1, emStrongRDelimAst: b1, emStrongRDelimUnd: N1, escape: l1, link: C1, nolink: nm, punctuation: d1, reflink: tm, reflinkSearch: T1, tag: k1, text: u1, url: mr }, E1 = { ...la, link: ge(/^!?\[(label)\]\((.*?)\)/).replace("label", yo).getRegex(), reflink: ge(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", yo).getRegex() }, ni = { ...la, emStrongRDelimAst: v1, emStrongLDelim: g1, url: ge(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Pl).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: ge(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Pl).getRegex() }, S1 = { ...ni, br: ge(Zd).replace("{2,}", "*").getRegex(), text: ge(ni.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, no = { normal: ia, gfm: i1, pedantic: a1 }, nr = { normal: la, gfm: ni, breaks: S1, pedantic: E1 }, M1 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Il = (e) => M1[e];
function Et(e, t) {
  if (t) {
    if (Fe.escapeTest.test(e)) return e.replace(Fe.escapeReplace, Il);
  } else if (Fe.escapeTestNoEncode.test(e)) return e.replace(Fe.escapeReplaceNoEncode, Il);
  return e;
}
function Ll(e) {
  try {
    e = encodeURI(e).replace(Fe.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Ol(e, t) {
  let n = e.replace(Fe.findPipe, (s, i, a) => {
    let l = !1, d = i;
    for (; --d >= 0 && a[d] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), r = n.split(Fe.splitPipe), o = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !r.at(-1)?.trim() && r.pop(), t) if (r.length > t) r.splice(t);
  else for (; r.length < t; ) r.push("");
  for (; o < r.length; o++) r[o] = r[o].trim().replace(Fe.slashPipe, "|");
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
function D1(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
  else if (e[r] === t[0]) n++;
  else if (e[r] === t[1] && (n--, n < 0)) return r;
  return n > 0 ? -2 : -1;
}
function _l(e, t, n, r, o) {
  let s = t.href, i = t.title || null, a = e[1].replace(o.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let l = { type: e[0].charAt(0) === "!" ? "image" : "link", raw: n, href: s, title: i, text: a, tokens: r.inlineTokens(a) };
  return r.state.inLink = !1, l;
}
function R1(e, t, n) {
  let r = e.match(n.other.indentCodeCompensation);
  if (r === null) return t;
  let o = r[1];
  return t.split(`
`).map((s) => {
    let i = s.match(n.other.beginningSpace);
    if (i === null) return s;
    let [a] = i;
    return a.length >= o.length ? s.slice(o.length) : s;
  }).join(`
`);
}
var xo = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || ln;
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
      let n = t[0], r = R1(n, t[3] || "", this.rules);
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
        let i = !1, a = [], l;
        for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) a.push(n[l]), i = !0;
        else if (!i) a.push(n[l]);
        else break;
        n = n.slice(l);
        let d = a.join(`
`), c = d.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${d}` : d, o = o ? `${o}
${c}` : c;
        let m = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, s, !0), this.lexer.state.top = m, n.length === 0) break;
        let f = s.at(-1);
        if (f?.type === "code") break;
        if (f?.type === "blockquote") {
          let p = f, b = p.raw + `
` + n.join(`
`), h = this.blockquote(b);
          s[s.length - 1] = h, r = r.substring(0, r.length - p.raw.length) + h.raw, o = o.substring(0, o.length - p.text.length) + h.text;
          break;
        } else if (f?.type === "list") {
          let p = f, b = p.raw + `
` + n.join(`
`), h = this.list(b);
          s[s.length - 1] = h, r = r.substring(0, r.length - f.raw.length) + h.raw, o = o.substring(0, o.length - p.raw.length) + h.raw, n = b.substring(s.at(-1).raw.length).split(`
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
      let s = this.rules.other.listItemRegex(n), i = !1;
      for (; e; ) {
        let l = !1, d = "", c = "";
        if (!(t = s.exec(e)) || this.rules.block.hr.test(e)) break;
        d = t[0], e = e.substring(d.length);
        let m = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (h) => " ".repeat(3 * h.length)), f = e.split(`
`, 1)[0], p = !m.trim(), b = 0;
        if (this.options.pedantic ? (b = 2, c = m.trimStart()) : p ? b = t[1].length + 1 : (b = t[2].search(this.rules.other.nonSpaceChar), b = b > 4 ? 1 : b, c = m.slice(b), b += t[1].length), p && this.rules.other.blankLine.test(f) && (d += f + `
`, e = e.substring(f.length + 1), l = !0), !l) {
          let h = this.rules.other.nextBulletRegex(b), g = this.rules.other.hrRegex(b), y = this.rules.other.fencesBeginRegex(b), v = this.rules.other.headingBeginRegex(b), x = this.rules.other.htmlBeginRegex(b);
          for (; e; ) {
            let M = e.split(`
`, 1)[0], w;
            if (f = M, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), w = f) : w = f.replace(this.rules.other.tabCharGlobal, "    "), y.test(f) || v.test(f) || x.test(f) || h.test(f) || g.test(f)) break;
            if (w.search(this.rules.other.nonSpaceChar) >= b || !f.trim()) c += `
` + w.slice(b);
            else {
              if (p || m.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || y.test(m) || v.test(m) || g.test(m)) break;
              c += `
` + f;
            }
            !p && !f.trim() && (p = !0), d += M + `
`, e = e.substring(M.length + 1), m = w.slice(b);
          }
        }
        o.loose || (i ? o.loose = !0 : this.rules.other.doubleBlankLine.test(d) && (i = !0)), o.items.push({ type: "list_item", raw: d, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: !1, text: c, tokens: [] }), o.raw += d;
      }
      let a = o.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
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
          let d = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (d) {
            let c = { type: "checkbox", raw: d[0] + " ", checked: d[0] !== "[ ]" };
            l.checked = c.checked, o.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c.raw + l.tokens[0].raw, l.tokens[0].text = c.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c)) : l.tokens.unshift({ type: "paragraph", raw: c.raw, text: c.raw, tokens: [c] }) : l.tokens.unshift(c);
          }
        }
        if (!o.loose) {
          let d = l.tokens.filter((m) => m.type === "space"), c = d.length > 0 && d.some((m) => this.rules.other.anyLine.test(m.raw));
          o.loose = c;
        }
      }
      if (o.loose) for (let l of o.items) {
        l.loose = !0;
        for (let d of l.tokens) d.type === "text" && (d.type = "paragraph");
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
    let n = Ol(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), o = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let i of r) this.rules.other.tableAlignRight.test(i) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(i) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(i) ? s.align.push("left") : s.align.push(null);
      for (let i = 0; i < n.length; i++) s.header.push({ text: n[i], tokens: this.lexer.inline(n[i]), header: !0, align: s.align[i] });
      for (let i of o) s.rows.push(Ol(i, s.header.length).map((a, l) => ({ text: a, tokens: this.lexer.inline(a), header: !1, align: s.align[l] })));
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
        let s = D1(t[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let i = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
          t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, i).trim(), t[3] = "";
        }
      }
      let r = t[2], o = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(r);
        s && (r = s[1], o = s[3]);
      } else o = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), _l(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
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
      return _l(n, o, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!(!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[2]) || !n || this.rules.inline.punctuation.exec(n))) {
      let o = [...r[0]].length - 1, s, i, a = o, l = 0, d = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (d.lastIndex = 0, t = t.slice(-1 * e.length + o); (r = d.exec(t)) != null; ) {
        if (s = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !s) continue;
        if (i = [...s].length, r[3] || r[4]) {
          a += i;
          continue;
        } else if ((r[5] || r[6]) && o % 3 && !((o + i) % 3)) {
          l += i;
          continue;
        }
        if (a -= i, a > 0) continue;
        i = Math.min(i, i + a + l);
        let c = [...r[0]][0].length, m = e.slice(0, o + r.index + c + i);
        if (Math.min(o, i) % 2) {
          let p = m.slice(1, -1);
          return { type: "em", raw: m, text: p, tokens: this.lexer.inlineTokens(p) };
        }
        let f = m.slice(2, -2);
        return { type: "strong", raw: m, text: f, tokens: this.lexer.inlineTokens(f) };
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
}, ot = class ri {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || ln, this.options.tokenizer = this.options.tokenizer || new xo(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: Fe, block: no.normal, inline: nr.normal };
    this.options.pedantic ? (n.block = no.pedantic, n.inline = nr.pedantic) : this.options.gfm && (n.block = no.gfm, this.options.breaks ? n.inline = nr.breaks : n.inline = nr.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: no, inline: nr };
  }
  static lex(t, n) {
    return new ri(n).lex(t);
  }
  static lexInline(t, n) {
    return new ri(n).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(Fe.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], r = !1) {
    for (this.options.pedantic && (t = t.replace(Fe.tabCharGlobal, "    ").replace(Fe.spaceLine, "")); t; ) {
      let o;
      if (this.options.extensions?.block?.some((i) => (o = i.call({ lexer: this }, t, n)) ? (t = t.substring(o.raw.length), n.push(o), !0) : !1)) continue;
      if (o = this.tokenizer.space(t)) {
        t = t.substring(o.raw.length);
        let i = n.at(-1);
        o.raw.length === 1 && i !== void 0 ? i.raw += `
` : n.push(o);
        continue;
      }
      if (o = this.tokenizer.code(t)) {
        t = t.substring(o.raw.length);
        let i = n.at(-1);
        i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + o.raw, i.text += `
` + o.text, this.inlineQueue.at(-1).src = i.text) : n.push(o);
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
        let i = n.at(-1);
        i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + o.raw, i.text += `
` + o.raw, this.inlineQueue.at(-1).src = i.text) : this.tokens.links[o.tag] || (this.tokens.links[o.tag] = { href: o.href, title: o.title }, n.push(o));
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
        let i = 1 / 0, a = t.slice(1), l;
        this.options.extensions.startBlock.forEach((d) => {
          l = d.call({ lexer: this }, a), typeof l == "number" && l >= 0 && (i = Math.min(i, l));
        }), i < 1 / 0 && i >= 0 && (s = t.substring(0, i + 1));
      }
      if (this.state.top && (o = this.tokenizer.paragraph(s))) {
        let i = n.at(-1);
        r && i?.type === "paragraph" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + o.raw, i.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : n.push(o), r = s.length !== t.length, t = t.substring(o.raw.length);
        continue;
      }
      if (o = this.tokenizer.text(t)) {
        t = t.substring(o.raw.length);
        let i = n.at(-1);
        i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + o.raw, i.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : n.push(o);
        continue;
      }
      if (t) {
        let i = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(i);
          break;
        } else throw new Error(i);
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
    let i = !1, a = "";
    for (; t; ) {
      i || (a = ""), i = !1;
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
      if (l = this.tokenizer.emStrong(t, r, a)) {
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
      let d = t;
      if (this.options.extensions?.startInline) {
        let c = 1 / 0, m = t.slice(1), f;
        this.options.extensions.startInline.forEach((p) => {
          f = p.call({ lexer: this }, m), typeof f == "number" && f >= 0 && (c = Math.min(c, f));
        }), c < 1 / 0 && c >= 0 && (d = t.substring(0, c + 1));
      }
      if (l = this.tokenizer.inlineText(d)) {
        t = t.substring(l.raw.length), l.raw.slice(-1) !== "_" && (a = l.raw.slice(-1)), i = !0;
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
}, wo = class {
  options;
  parser;
  constructor(e) {
    this.options = e || ln;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let r = (t || "").match(Fe.notSpaceStart)?.[0], o = e.replace(Fe.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + Et(r) + '">' + (n ? o : Et(o, !0)) + `</code></pre>
` : "<pre><code>" + (n ? o : Et(o, !0)) + `</code></pre>
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
    for (let i = 0; i < e.items.length; i++) {
      let a = e.items[i];
      r += this.listitem(a);
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
      for (let i = 0; i < s.length; i++) n += this.tablecell(s[i]);
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
    return `<code>${Et(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    let r = this.parser.parseInline(n), o = Ll(e);
    if (o === null) return r;
    e = o;
    let s = '<a href="' + e + '"';
    return t && (s += ' title="' + Et(t) + '"'), s += ">" + r + "</a>", s;
  }
  image({ href: e, title: t, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let o = Ll(e);
    if (o === null) return Et(n);
    e = o;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${Et(t)}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Et(e.text);
  }
}, ca = class {
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
}, st = class oi {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || ln, this.options.renderer = this.options.renderer || new wo(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new ca();
  }
  static parse(t, n) {
    return new oi(n).parse(t);
  }
  static parseInline(t, n) {
    return new oi(n).parseInline(t);
  }
  parse(t) {
    let n = "";
    for (let r = 0; r < t.length; r++) {
      let o = t[r];
      if (this.options.extensions?.renderers?.[o.type]) {
        let i = o, a = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(i.type)) {
          n += a || "";
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
          let i = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(i), "";
          throw new Error(i);
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
        let a = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (a !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          r += a || "";
          continue;
        }
      }
      let i = s;
      switch (i.type) {
        case "escape": {
          r += n.text(i);
          break;
        }
        case "html": {
          r += n.html(i);
          break;
        }
        case "link": {
          r += n.link(i);
          break;
        }
        case "image": {
          r += n.image(i);
          break;
        }
        case "checkbox": {
          r += n.checkbox(i);
          break;
        }
        case "strong": {
          r += n.strong(i);
          break;
        }
        case "em": {
          r += n.em(i);
          break;
        }
        case "codespan": {
          r += n.codespan(i);
          break;
        }
        case "br": {
          r += n.br(i);
          break;
        }
        case "del": {
          r += n.del(i);
          break;
        }
        case "text": {
          r += n.text(i);
          break;
        }
        default: {
          let a = 'Token with "' + i.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return r;
  }
}, lr = class {
  options;
  block;
  constructor(e) {
    this.options = e || ln;
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
}, A1 = class {
  defaults = ta();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = st;
  Renderer = wo;
  TextRenderer = ca;
  Lexer = ot;
  Tokenizer = xo;
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
        for (let s of o.rows) for (let i of s) n = n.concat(this.walkTokens(i.tokens, t));
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
          let i = o[s].flat(1 / 0);
          n = n.concat(this.walkTokens(i, t));
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
          s ? t.renderers[o.name] = function(...i) {
            let a = o.renderer.apply(this, i);
            return a === !1 && (a = s.apply(this, i)), a;
          } : t.renderers[o.name] = o.renderer;
        }
        if ("tokenizer" in o) {
          if (!o.level || o.level !== "block" && o.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s = t[o.level];
          s ? s.unshift(o.tokenizer) : t[o.level] = [o.tokenizer], o.start && (o.level === "block" ? t.startBlock ? t.startBlock.push(o.start) : t.startBlock = [o.start] : o.level === "inline" && (t.startInline ? t.startInline.push(o.start) : t.startInline = [o.start]));
        }
        "childTokens" in o && o.childTokens && (t.childTokens[o.name] = o.childTokens);
      }), r.extensions = t), n.renderer) {
        let o = this.defaults.renderer || new wo(this.defaults);
        for (let s in n.renderer) {
          if (!(s in o)) throw new Error(`renderer '${s}' does not exist`);
          if (["options", "parser"].includes(s)) continue;
          let i = s, a = n.renderer[i], l = o[i];
          o[i] = (...d) => {
            let c = a.apply(o, d);
            return c === !1 && (c = l.apply(o, d)), c || "";
          };
        }
        r.renderer = o;
      }
      if (n.tokenizer) {
        let o = this.defaults.tokenizer || new xo(this.defaults);
        for (let s in n.tokenizer) {
          if (!(s in o)) throw new Error(`tokenizer '${s}' does not exist`);
          if (["options", "rules", "lexer"].includes(s)) continue;
          let i = s, a = n.tokenizer[i], l = o[i];
          o[i] = (...d) => {
            let c = a.apply(o, d);
            return c === !1 && (c = l.apply(o, d)), c;
          };
        }
        r.tokenizer = o;
      }
      if (n.hooks) {
        let o = this.defaults.hooks || new lr();
        for (let s in n.hooks) {
          if (!(s in o)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let i = s, a = n.hooks[i], l = o[i];
          lr.passThroughHooks.has(s) ? o[i] = (d) => {
            if (this.defaults.async && lr.passThroughHooksRespectAsync.has(s)) return (async () => {
              let m = await a.call(o, d);
              return l.call(o, m);
            })();
            let c = a.call(o, d);
            return l.call(o, c);
          } : o[i] = (...d) => {
            if (this.defaults.async) return (async () => {
              let m = await a.apply(o, d);
              return m === !1 && (m = await l.apply(o, d)), m;
            })();
            let c = a.apply(o, d);
            return c === !1 && (c = l.apply(o, d)), c;
          };
        }
        r.hooks = o;
      }
      if (n.walkTokens) {
        let o = this.defaults.walkTokens, s = n.walkTokens;
        r.walkTokens = function(i) {
          let a = [];
          return a.push(s.call(this, i)), o && (a = a.concat(o.call(this, i))), a;
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
        let i = o.hooks ? await o.hooks.preprocess(t) : t, a = await (o.hooks ? await o.hooks.provideLexer() : e ? ot.lex : ot.lexInline)(i, o), l = o.hooks ? await o.hooks.processAllTokens(a) : a;
        o.walkTokens && await Promise.all(this.walkTokens(l, o.walkTokens));
        let d = await (o.hooks ? await o.hooks.provideParser() : e ? st.parse : st.parseInline)(l, o);
        return o.hooks ? await o.hooks.postprocess(d) : d;
      })().catch(s);
      try {
        o.hooks && (t = o.hooks.preprocess(t));
        let i = (o.hooks ? o.hooks.provideLexer() : e ? ot.lex : ot.lexInline)(t, o);
        o.hooks && (i = o.hooks.processAllTokens(i)), o.walkTokens && this.walkTokens(i, o.walkTokens);
        let a = (o.hooks ? o.hooks.provideParser() : e ? st.parse : st.parseInline)(i, o);
        return o.hooks && (a = o.hooks.postprocess(a)), a;
      } catch (i) {
        return s(i);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        let r = "<p>An error occurred:</p><pre>" + Et(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
}, rn = new A1();
function Ne(e, t) {
  return rn.parse(e, t);
}
Ne.options = Ne.setOptions = function(e) {
  return rn.setOptions(e), Ne.defaults = rn.defaults, Vd(Ne.defaults), Ne;
};
Ne.getDefaults = ta;
Ne.defaults = ln;
Ne.use = function(...e) {
  return rn.use(...e), Ne.defaults = rn.defaults, Vd(Ne.defaults), Ne;
};
Ne.walkTokens = function(e, t) {
  return rn.walkTokens(e, t);
};
Ne.parseInline = rn.parseInline;
Ne.Parser = st;
Ne.parser = st.parse;
Ne.Renderer = wo;
Ne.TextRenderer = ca;
Ne.Lexer = ot;
Ne.lexer = ot.lex;
Ne.Tokenizer = xo;
Ne.Hooks = lr;
Ne.parse = Ne;
Ne.options;
Ne.setOptions;
Ne.use;
Ne.walkTokens;
Ne.parseInline;
st.parse;
ot.lex;
const P1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, IC = Zm(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  placeholder: s = 'Start writing... Use "/" for commands',
  editable: i = !0,
  autofocus: a = !1,
  className: l = "",
  showToolbar: d = !0,
  showWordCount: c = !0,
  theme: m,
  autoSave: f = !0,
  autoSaveKey: p = "paragon-editor-content",
  autoSaveDelay: b = 1e3,
  showRecoveryBanner: h = !0,
  showFloatingToolbar: g = !0,
  maxImageSize: y = 5 * 1024 * 1024,
  onImageUploadStart: v,
  onImageUploadComplete: x,
  onImageUploadError: M,
  onImageUpload: w,
  resolveImageSrc: T,
  showModeToggle: k = !0,
  // New props
  initialMode: D = "wysiwyg",
  onModeChange: N,
  onReady: E,
  onFocus: S,
  onBlur: P,
  onSelectionChange: R,
  onDestroy: I,
  onSave: B,
  onRecover: H,
  onWikiLinkClick: K,
  validateWikiLink: A,
  onWikiLinkSearch: $,
  onLinkClick: Q,
  findReplaceOpen: se,
  onFindReplaceChange: ie,
  renderToolbar: re,
  renderFooter: oe,
  disabledFeatures: O = {},
  minHeight: U = "200px",
  maxHeight: Y,
  spellCheck: te = !0,
  headingLevels: ve = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: we = [1, 2, 3],
  // TOC props
  showTableOfContents: Te = !1,
  tocVisible: Ie = !0,
  onTocVisibilityChange: Je,
  tocTitle: It = "",
  tocMinLevel: Vn = 1,
  tocMaxLevel: Kn = 4,
  tocShowLevelIndicators: Ar = !1,
  tocHighlightActive: Pr = !0,
  tocTreeView: Ir = !1,
  tocWidth: Lr = "240px",
  tocPosition: cn = "right",
  tocScrollOffset: qn = 20,
  onTocItemClick: un,
  renderTocItem: dn,
  tocShowToggleButton: Or = !0,
  // Performance profiler
  showPerformanceProfiler: jo = !1,
  onPerformanceProfilerClose: Vo,
  // Auto reorder checklist
  autoReorderChecklist: Ko = !1,
  // Error boundary
  onEditorError: qo,
  // AI writing assistant
  aiActions: yt,
  onAIAction: mn,
  onAISetupRequired: fn
}, Go) {
  const [et] = j(() => P1()), [Lt, _r] = j(D), [Br, ce] = j(""), fe = V(D), ne = V(""), he = V(null), [ze, pe] = j(0), pn = !!(yt && yt.length > 0 && mn), { state: He, executeAction: hn, abort: Gn, reset: tt } = ck(mn), [Zo, Xo] = j(null), [sm, im] = j({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), am = V(mn);
  am.current = mn;
  const ua = V(fn);
  ua.current = fn;
  const [lm, cm] = j([]), [um, dm] = j(0), mm = z((_, F) => {
    cm(_), dm(F);
  }, []), Qo = V(v), Jo = V(x), es = V(M), ts = V(w), ns = V(T), da = V(K), rs = V(A), os = V($);
  Qo.current = v, Jo.current = x, es.current = M, ts.current = w, ns.current = T, da.current = K, rs.current = A, os.current = $;
  const fm = tn(() => {
    const _ = [
      Sm.configure({
        heading: {
          levels: ve
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
      cp,
      up,
      fp,
      Mm.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      Dm.configure({
        types: ["heading", "paragraph"]
      }),
      Rm.configure({
        multicolor: !0
      }),
      Am.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      Fm,
      Um,
      Ym,
      jm,
      $w,
      Hw,
      Vw,
      Yw
    ];
    return O.tables || _.push(
      Pm.configure({
        resizable: !et,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Im,
      ep,
      tp,
      lp
    ), O.taskLists || _.push(
      dp.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      mp.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), et || _.push(
      hp.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), O.codeBlocks || _.push(bp), O.callouts || _.push(kp, zw), O.collapsibleHeadings || _.push(
      Ow.configure({
        levels: we
      })
    ), O.images || _.push(
      Cp.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (F) => {
          Wr({
            isOpen: !0,
            src: F.src,
            alt: F.alt,
            pos: F.pos,
            position: { x: F.rect.left + F.rect.width / 2, y: F.rect.bottom }
          });
        },
        resolveImageSrc: ns.current ? ((...F) => ns.current(...F)) : void 0
      }),
      ek.configure({
        maxFileSize: y,
        onUploadStart: Qo.current ? ((...F) => Qo.current(...F)) : void 0,
        onUploadComplete: Jo.current ? ((...F) => Jo.current(...F)) : void 0,
        onUploadError: es.current ? ((...F) => es.current(...F)) : void 0,
        onImageUpload: ts.current ? ((F, ee) => ts.current(F, ee)) : void 0
      })
    ), !et && !O.datePills && _.push(
      kv.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), O.tagPills || _.push(
      Ev.configure({
        HTMLAttributes: {
          class: "tag-pill"
        }
      })
    ), O.wikiLinks || _.push(
      Rw.configure({
        onWikiLinkClick: (F) => {
          console.log("WikiLink clicked:", F), da.current?.(F);
        },
        validateLink: (F) => rs.current ? rs.current(F) : !0
      })
    ), O.markdownPaste || _.push(
      Lw.configure({
        enableMarkdownPaste: !0
      })
    ), _;
  }, [s, et, y, ve, we, O]), xt = V(null), Vt = V(n), Kt = V(r), ss = V(o), Zn = V(null);
  Vt.current = n, Kt.current = r, ss.current = o;
  const L = Tm({
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
    onCreate: ({ editor: _ }) => {
      window.__tiptapEditor = _, E?.(_);
    },
    onDestroy: () => {
      I?.();
    },
    extensions: fm,
    content: t,
    editable: i,
    autofocus: a,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: te ? "true" : "false"
      },
      handleClick: (_, F, ee) => {
        if (Q) {
          const ue = ee.target.closest("a");
          if (ue) {
            const ae = ue.getAttribute("href");
            if (ae && Q(ae, ee) === !1)
              return ee.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: _ }) => {
      xt.current && clearTimeout(xt.current), xt.current = setTimeout(() => {
        if (_.isDestroyed) return;
        const F = _.getHTML();
        (Vt.current || Kt.current) && (Vt.current?.(F), Kt.current?.(F));
      }, 150);
    },
    onFocus: () => {
      S?.();
    },
    onBlur: () => {
      if (xt.current && (clearTimeout(xt.current), xt.current = null, L && !L.isDestroyed)) {
        const _ = L.getHTML();
        if ((Vt.current || Kt.current) && (Vt.current?.(_), Kt.current?.(_)), fe.current === "wysiwyg" && Zn.current) {
          const F = Zn.current.turndown(_);
          ne.current = F, ss.current?.(F);
        }
      }
      P?.();
    },
    onSelectionUpdate: ({ editor: _ }) => {
      if (R) {
        const { from: F, to: ee, empty: ye } = _.state.selection;
        R({ from: F, to: ee, empty: ye });
      }
    }
  });
  G(() => () => {
    if (xt.current && (clearTimeout(xt.current), xt.current = null, L && !L.isDestroyed)) {
      const _ = L.getHTML();
      if ((Vt.current || Kt.current) && (Vt.current?.(_), Kt.current?.(_)), fe.current === "wysiwyg" && Zn.current) {
        const F = Zn.current.turndown(_);
        ne.current = F, ss.current?.(F);
      }
    }
  }, []);
  const [ma, $r] = j(!1), [gn, Wr] = j(null), [pm, hm] = j(!1), gm = se !== void 0 ? se : pm, Ot = z((_) => {
    hm(_), ie?.(_);
  }, [ie]), [bm, is] = j(0), [vm, Nm] = j(""), wt = Cw(L, {
    storageKey: p,
    debounceMs: b,
    enabled: f,
    onSave: (_) => {
      B?.(_);
    },
    onRecover: (_) => {
      H?.(_);
    }
  }), Xn = qk();
  Zn.current = Xn;
  const ut = z((_) => {
    if (L) {
      if (_ === "markdown" && fe.current === "wysiwyg") {
        const F = L.getHTML(), ee = Xn.turndown(F);
        ce(ee), ne.current = ee;
      } else if (_ === "wysiwyg" && fe.current === "markdown") {
        const F = ["info", "note", "prompt", "resources", "todo"];
        let ee = ne.current;
        F.forEach((ae) => {
          const Ee = new RegExp(`\`\`\`ad-${ae}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          ee = ee.replace(Ee, (_e, Ye) => {
            const Qn = Ne.parse(Ye.trim(), { async: !1 });
            return `<div data-callout="" data-type="${ae}" class="callout callout-${ae}">${Qn}</div>`;
          });
        }), F.forEach((ae) => {
          const Ee = new RegExp(`\`\`\`${ae}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          ee = ee.replace(Ee, (_e, Ye) => {
            const Qn = Ne.parse(Ye.trim(), { async: !1 });
            return `<div data-callout="" data-type="${ae}" class="callout callout-${ae}">${Qn}</div>`;
          });
        }), ee = ee.replace(/!\[([^\]]*?)\s*\|\s*(\d+)\]\(([^)]+)\)/g, (ae, Ee, _e, Ye) => `<img src="${Ye.trim()}" alt="${Ee.trim()}" width="${_e.trim()}" style="width: ${_e.trim()}px" />`), ee = ee.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), ee = ee.replace(/@([^@\n]+)@/g, (ae, Ee) => {
          const _e = Xt(Ee);
          if (_e) {
            const Ye = Ri(_e);
            return `<span data-type="date-pill" data-date="${_e}" class="date-pill ${Ye}"><span class="date-icon">📅</span><span class="date-text">${Ee.trim()}</span></span>`;
          }
          return ae;
        }), ee = ee.replace(new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"), (ae, Ee) => {
          const _e = oo(Ee);
          return ir(_e) ? `<span data-type="tag-pill" data-tag="${_e}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${_e}</span></span>` : ae;
        }), ee = ee.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((ae, Ee) => Ee % 2 === 1 ? ae : ae.replace(/\[\[([^\[\]]+)\]\]/g, (_e, Ye) => `<span data-wiki-link data-page-name="${Ye.trim()}" class="wiki-link">${Ye.trim()}</span>`)).join("");
        const ue = Ne.parse(ee, { async: !1 });
        queueMicrotask(() => {
          L.isDestroyed || L.commands.setContent(ue);
        });
      }
      _r(_), fe.current = _, N?.(_);
    }
  }, [L, Xn, N]), fa = z((_) => {
    ce(_), ne.current = _, o?.(_);
  }, [o]), qt = Ew(L, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: c
  });
  Xm(Go, () => ({
    getEditor: () => L,
    getHTML: () => L?.getHTML() || "",
    getMarkdown: () => L ? Xn.turndown(L.getHTML()) : "",
    getText: () => L?.getText() || "",
    setContent: (_) => {
      L && !L.isDestroyed && queueMicrotask(() => {
        L.commands.setContent(_);
      });
    },
    clearContent: () => {
      L && !L.isDestroyed && L.commands.clearContent();
    },
    focus: (_) => {
      L && !L.isDestroyed && L.commands.focus(_);
    },
    blur: () => {
      L && !L.isDestroyed && L.commands.blur();
    },
    isEmpty: () => L?.isEmpty || !0,
    isFocused: () => L?.isFocused || !1,
    getMode: () => fe.current,
    setMode: (_) => ut(_),
    toggleMode: () => {
      const _ = fe.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return ut(_), _;
    },
    getWordCount: () => ({
      words: qt.words,
      characters: qt.characters,
      charactersWithSpaces: qt.charactersWithSpaces
    }),
    undo: () => L?.commands.undo(),
    redo: () => L?.commands.redo(),
    canUndo: () => L?.can().undo() || !1,
    canRedo: () => L?.can().redo() || !1,
    insertContent: (_) => L?.commands.insertContent(_),
    insertImage: (_, F = "") => L?.commands.setImage({ src: _, alt: F }),
    insertTable: (_ = 3, F = 3) => L?.commands.insertTable({ rows: _, cols: F, withHeaderRow: !0 }),
    insertCodeBlock: (_) => {
      _ ? L?.commands.setCodeBlock({ language: _ }) : L?.commands.setCodeBlock();
    },
    insertCallout: (_ = "info") => L?.commands.insertCallout?.({ type: _ }),
    insertHorizontalRule: () => L?.commands.setHorizontalRule(),
    toggleBold: () => L?.commands.toggleBold(),
    toggleItalic: () => L?.commands.toggleItalic(),
    toggleUnderline: () => L?.commands.toggleUnderline(),
    toggleStrike: () => L?.commands.toggleStrike(),
    toggleCode: () => L?.commands.toggleCode(),
    toggleHighlight: () => L?.commands.toggleHighlight(),
    setHeading: (_) => {
      _ === 0 ? L?.commands.setParagraph() : L?.commands.setHeading({ level: _ });
    },
    toggleBulletList: () => L?.commands.toggleBulletList(),
    toggleOrderedList: () => L?.commands.toggleOrderedList(),
    toggleTaskList: () => L?.commands.toggleTaskList(),
    toggleBlockquote: () => L?.commands.toggleBlockquote(),
    setLink: (_) => L?.commands.setLink({ href: _ }),
    unsetLink: () => L?.commands.unsetLink(),
    openFindReplace: () => {
      Ot(!0), is((_) => _ + 1);
    },
    closeFindReplace: () => Ot(!1),
    save: () => wt.save(),
    clearSavedContent: () => wt.clear(),
    getSelectedText: () => {
      if (!L) return "";
      const { from: _, to: F } = L.state.selection;
      return L.state.doc.textBetween(_, F, " ");
    },
    isEditable: () => L?.isEditable || !1,
    setEditable: (_) => L?.setEditable(_),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!L) return [];
      const _ = [];
      return L.state.doc.descendants((F, ee) => {
        if (F.type.name === "heading") {
          const ye = F.attrs.level, ue = F.textContent.trim();
          ue && _.push({ id: `toc-heading-${ee}`, text: ue, level: ye, pos: ee });
        }
      }), _;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (_) => {
      if (!(!L || L.isDestroyed))
        try {
          const F = L.state.doc.resolve(_), ee = L.view.nodeDOM(F.before(F.depth + 1));
          if (ee instanceof HTMLElement) {
            const ye = L.view.dom.closest(".editor-content-wrapper");
            if (ye) {
              const ue = ye.getBoundingClientRect(), Ee = ee.getBoundingClientRect().top - ue.top + ye.scrollTop;
              ye.scrollTo({ top: Ee - 20, behavior: "smooth" });
            } else
              ee.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          L.commands.setTextSelection(_ + 1);
        } catch {
        }
    }
  }), [L, Xn, ut, qt, wt, Ot]), G(() => {
    const _ = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => fe.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (F) => {
        if (F !== "wysiwyg" && F !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        ut(F);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const F = fe.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return ut(F), F;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        ut("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        ut("markdown");
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
      getRawMarkdown: () => fe.current === "markdown" ? ne.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (F) => {
        const ee = (ye) => {
          F(ye.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", ee), () => window.removeEventListener("paragon-editor-mode-change", ee);
      }
    };
    return window.__paragonEditorModeAPI = _, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [ut]), G(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: Lt } }));
  }, [Lt]), G(() => {
    if (!L || L.isDestroyed) return;
    const _ = (F) => {
      if (!L.isDestroyed) {
        if ((F.metaKey || F.ctrlKey) && F.key === "k") {
          F.preventDefault(), $r(!0);
          return;
        }
        if (!et && (F.metaKey || F.ctrlKey) && F.key === "f") {
          if (F.preventDefault(), L) {
            const { state: ee } = L, { from: ye, to: ue } = ee.selection;
            if (ye !== ue) {
              const ae = ee.doc.textBetween(ye, ue, " ");
              ae.trim() && Nm(ae.trim());
            }
          }
          Ot(!0), is((ee) => ee + 1);
          return;
        }
        if (!et && (F.metaKey || F.ctrlKey) && F.key === "h") {
          F.preventDefault(), Ot(!0);
          return;
        }
        if (F.key === " ")
          try {
            const { state: ee } = L, { selection: ye } = ee, { $from: ue } = ye, ae = ue.nodeBefore?.textContent || "";
            if (ae === "#") {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - 1, to: ue.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (ae === "##") {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - 2, to: ue.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (ae === "###") {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - 3, to: ue.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (ae === "-" || ae === "*") {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - 1, to: ue.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(ae)) {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - ae.length, to: ue.pos }).toggleOrderedList().run();
              return;
            }
            if (ae === "[]" || ae === "[ ]") {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - ae.length, to: ue.pos }).toggleTaskList().run();
              return;
            }
            if (ae === ">") {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - 1, to: ue.pos }).toggleBlockquote().run();
              return;
            }
            if (ae === "```") {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - 3, to: ue.pos }).toggleCodeBlock().run();
              return;
            }
            if (ae === "---" || ae === "***") {
              F.preventDefault(), L.chain().focus().deleteRange({ from: ue.pos - 3, to: ue.pos }).setHorizontalRule().run();
              return;
            }
          } catch (ee) {
            console.warn("Space shortcut error:", ee);
          }
      }
    };
    return document.addEventListener("keydown", _, !0), () => document.removeEventListener("keydown", _, !0);
  }, [L, et, Ot]);
  const pa = z((_, F) => {
    if (!pn) {
      ua.current?.();
      return;
    }
    if (!L) return;
    let ee = { top: 0, left: 0 };
    if (F) {
      const ye = F.getBoundingClientRect();
      ee = { top: ye.bottom + 4, left: ye.left };
    } else {
      const { from: ye, to: ue } = L.state.selection, ae = L.view.coordsAtPos(ye), Ee = L.view.coordsAtPos(ue);
      ee = { top: Ee.bottom + 8, left: (ae.left + Ee.left) / 2 };
    }
    Xo({ scope: _, position: ee });
  }, [pn, L]), ym = z((_, F) => {
    if (!L || !yt) return;
    const ee = yt.find((Qn) => Qn.id === _);
    if (!ee) return;
    const { from: ye, to: ue } = L.state.selection, ae = ye !== ue ? L.state.doc.textBetween(ye, ue, `
`) : "", Ee = ee.scope === "document" || !ae ? L.getText() : ae, _e = L.view.coordsAtPos(ye), Ye = L.view.coordsAtPos(ue);
    im({
      selectionTop: _e.top,
      selectionBottom: Ye.bottom,
      selectionCenterX: (_e.left + Ye.right) / 2
    }), Xo(null), hn(_, ee.label, Ee, { from: ye, to: ue }, F);
  }, [L, yt, hn]), xm = z(() => {
    if (!L || He.status !== "complete") return;
    const { selectionRange: _, result: F } = He;
    L.chain().focus().setTextSelection(_).deleteSelection().insertContent(F).run(), tt();
  }, [L, He, tt]), wm = z(() => {
    if (!L || He.status !== "complete") return;
    const { selectionRange: _, result: F } = He;
    L.chain().focus().setTextSelection(_.to).insertContent(`
` + F).run(), tt();
  }, [L, He, tt]), km = z(() => {
    if (!(He.status !== "complete" && He.status !== "error"))
      if (He.status === "complete") {
        const { action: _, actionLabel: F, inputText: ee, selectionRange: ye } = He;
        tt(), hn(_, F, ee, ye);
      } else
        tt();
  }, [He, tt, hn]);
  if (!L)
    return /* @__PURE__ */ u("div", { className: `markdown-editor-container ${l}`, "data-theme": m, children: /* @__PURE__ */ u("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ u("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1454,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1455,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1456,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("div", { style: { height: "0.75rem" } }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1457,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1458,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ u("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }, void 0, !1, {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1459,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1453,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1452,
      columnNumber: 7
    }, this);
  const ha = /* @__PURE__ */ u(
    vw,
    {
      editor: L,
      onOpenLinkPopover: () => $r(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Ot(!0), is((_) => _ + 1);
      },
      disabledFeatures: O,
      autoReorderChecklist: Ko,
      aiEnabled: pn || !!fn,
      onAISparklesClick: (_) => pa("document", _)
    },
    void 0,
    !1,
    {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1467,
      columnNumber: 5
    },
    this
  ), ga = /* @__PURE__ */ u("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ u(
      Sw,
      {
        status: wt.status,
        lastSaved: wt.lastSaved
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1486,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ u("div", { className: "word-count", children: /* @__PURE__ */ u("span", { children: [
      qt.words,
      " words"
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1492,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1491,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 1484,
    columnNumber: 5
  }, this), Cm = {
    minHeight: U,
    ...Y && { maxHeight: Y, overflowY: "auto" }
  };
  return /* @__PURE__ */ u("div", { className: `markdown-editor-container ${l}`, "data-theme": m, children: [
    f && h && wt.hasRecoverableContent && /* @__PURE__ */ u(
      Mw,
      {
        onRecover: () => {
          wt.recover();
        },
        onDismiss: wt.dismissRecovery
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1507,
        columnNumber: 9
      },
      this
    ),
    d && /* @__PURE__ */ u("div", { className: "flex items-center bg-card/50", children: [
      re ? re(L, ha) : ha,
      k && /* @__PURE__ */ u("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ u(
          "button",
          {
            onClick: () => ut("wysiwyg"),
            className: `editor-mode-toggle-btn ${Lt === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ u(Of, {}, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1526,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 1521,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: () => ut("markdown"),
            className: `editor-mode-toggle-btn ${Lt === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ u(yi, {}, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1533,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 1528,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1520,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1517,
      columnNumber: 9
    }, this),
    !et && /* @__PURE__ */ u(
      Nw,
      {
        editor: L,
        isOpen: gm,
        onClose: () => Ot(!1),
        focusTrigger: bm,
        initialSearchQuery: vm,
        editorMode: Lt,
        rawMarkdown: Br,
        onRawMarkdownChange: fa,
        onMatchesChange: mm
      },
      void 0,
      !1,
      {
        fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1542,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ u(ww, { editor: L }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1556,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u("div", { className: `editor-main-area ${Te ? "editor-with-toc" : ""}`, children: [
      Te && cn === "left" && /* @__PURE__ */ u(
        Sl,
        {
          editor: L,
          visible: Ie,
          onVisibilityChange: Je,
          title: It,
          minLevel: Vn,
          maxLevel: Kn,
          showLevelIndicators: Ar,
          highlightActive: Pr,
          treeView: Ir,
          width: Lr,
          position: cn,
          scrollOffset: qn,
          onItemClick: un,
          renderItem: dn,
          showToggleButton: Or,
          scrollContainerRef: he
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1562,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ u(
        ik,
        {
          resetKey: `${t}-${ze}`,
          onRetry: () => pe((_) => _ + 1),
          onClearContent: () => {
            L && L.commands.clearContent(), n?.(""), r?.(""), o?.(""), pe((_) => _ + 1);
          },
          onError: qo,
          children: [
            /* @__PURE__ */ u("div", { className: "editor-content-wrapper", ref: he, style: Cm, children: Lt === "wysiwyg" ? /* @__PURE__ */ u(Pe, { children: [
              /* @__PURE__ */ u(Em, { editor: L, className: "editor-content" }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 1599,
                columnNumber: 13
              }, this),
              !O.images && !O.dragAndDrop && /* @__PURE__ */ u(tk, { containerRef: he, enabled: i }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 1603,
                columnNumber: 15
              }, this),
              !et && g && /* @__PURE__ */ u(xp, { editor: L, suppressWhenLinkPopoverOpen: ma, aiEnabled: pn || !!fn, onAISparklesClick: (_) => pa("selection", _) }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 1609,
                columnNumber: 50
              }, this),
              Zo && yt && /* @__PURE__ */ u(
                dk,
                {
                  actions: yt,
                  scope: Zo.scope,
                  position: Zo.position,
                  onAction: ym,
                  onClose: () => Xo(null)
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 1613,
                  columnNumber: 15
                },
                this
              ),
              He.status !== "idle" && /* @__PURE__ */ u(
                mk,
                {
                  state: He,
                  position: sm,
                  onReplace: xm,
                  onInsert: wm,
                  onRetry: km,
                  onDiscard: () => {
                    Gn(), tt();
                  }
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 1624,
                  columnNumber: 15
                },
                this
              ),
              !O.slashCommands && /* @__PURE__ */ u(Pv, { editor: L, disabledFeatures: O }, void 0, !1, {
                fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 1635,
                columnNumber: 49
              }, this),
              !O.wikiLinks && os.current && /* @__PURE__ */ u(
                Bv,
                {
                  editor: L,
                  onSearch: os.current
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 1639,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ u(
                vp,
                {
                  editor: L,
                  isOpen: ma,
                  onClose: () => $r(!1)
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 1646,
                  columnNumber: 13
                },
                this
              ),
              !et && /* @__PURE__ */ u(
                Np,
                {
                  editor: L,
                  onEditLink: () => $r(!0)
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 1654,
                  columnNumber: 15
                },
                this
              ),
              !O.images && gn?.isOpen && /* @__PURE__ */ u(
                nk,
                {
                  src: gn.src,
                  alt: gn.alt,
                  position: gn.position,
                  onSave: (_, F) => {
                    L.chain().focus().setNodeSelection(gn.pos).updateAttributes("resizableImage", {
                      src: _,
                      alt: F
                    }).run(), Wr(null);
                  },
                  onDelete: () => {
                    L.chain().focus().setNodeSelection(gn.pos).deleteSelection().run(), Wr(null);
                  },
                  onClose: () => Wr(null)
                },
                void 0,
                !1,
                {
                  fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 1662,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1598,
              columnNumber: 11
            }, this) : /* @__PURE__ */ u(
              rk,
              {
                content: Br,
                onChange: fa,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: lm,
                currentMatchIndex: um
              },
              void 0,
              !1,
              {
                fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 1684,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1596,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ u(ak, { scrollContainerRef: he }, void 0, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1695,
              columnNumber: 7
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1581,
          columnNumber: 7
        },
        this
      ),
      Te && cn === "right" && /* @__PURE__ */ u(
        Sl,
        {
          editor: L,
          visible: Ie,
          onVisibilityChange: Je,
          title: It,
          minLevel: Vn,
          maxLevel: Kn,
          showLevelIndicators: Ar,
          highlightActive: Pr,
          treeView: Ir,
          width: Lr,
          position: cn,
          scrollOffset: qn,
          onItemClick: un,
          renderItem: dn,
          showToggleButton: Or,
          scrollContainerRef: he
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1699,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1559,
      columnNumber: 7
    }, this),
    c && (oe ? oe(
      { words: qt.words, characters: qt.characters },
      wt.status,
      ga
    ) : ga),
    /* @__PURE__ */ u(sk, { visible: jo, onClose: Vo, editor: L }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1732,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 1504,
    columnNumber: 5
  }, this);
}), LC = Co.create({
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
      _n(this.options.HTMLAttributes, t, {
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
}), rm = {
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
}, I1 = {
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
}, L1 = {
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
}, O1 = {
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
  dark: rm,
  light: I1,
  sepia: L1,
  nord: O1
};
function _1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function OC(e, t, n, r) {
  const o = cr[e] || rm;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const om = Wl(null);
function _C({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = j(t), s = cr[r] || cr.dark, i = z((l) => {
    cr[l] && o(l);
  }, []);
  G(() => {
    n?.current && _1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(cr)
  };
  return /* @__PURE__ */ u(om.Provider, { value: a, children: e }, void 0, !1, {
    fileName: "/tmp/paragon/client/src/components/editor/ThemeProvider.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function BC() {
  const e = zl(om);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const Bl = [
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
function $C({ node: e, updateAttributes: t }) {
  const [n, r] = j(!1), o = e.attrs.language || "plaintext";
  Bl.find((i) => i.value === o)?.label;
  const s = z(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ u(xr, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ u("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ u("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ u(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: Bl.map(({ value: i, label: a }) => /* @__PURE__ */ u("option", { value: i, children: a }, i, !1, {
              fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
              lineNumber: 64,
              columnNumber: 15
            }, this))
          },
          void 0,
          !1,
          {
            fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 58,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ u(Ht, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ u($n, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this) : /* @__PURE__ */ u(Wn, { size: 14 }, void 0, !1, {
            fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 71,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ u("pre", { className: "code-block-pre", children: /* @__PURE__ */ u("code", { children: /* @__PURE__ */ u(si, {}, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/tmp/paragon/client/src/components/editor/CodeBlockComponent.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
export {
  Sw as AutoSaveIndicator,
  LC as Callout,
  zw as CalloutInputRule,
  $C as CodeBlockComponent,
  Ow as CollapsibleHeading,
  hp as CollapsibleList,
  kv as DatePill,
  _C as EditorThemeProvider,
  vw as EditorToolbar,
  Nw as FindReplace,
  xp as FloatingToolbar,
  tk as ImageDropZone,
  ek as ImageUpload,
  IC as MarkdownEditor,
  $w as MarkdownLinkInputRule,
  Lw as MarkdownPasteSafe,
  cp as MixedBulletList,
  fp as MixedListItem,
  up as MixedOrderedList,
  mp as MixedTaskItem,
  dp as MixedTaskList,
  Mw as RecoveryBanner,
  Cp as ResizableImage,
  Hw as SearchHighlight,
  ww as SelectAllActionBar,
  Vw as SelectAllOccurrences,
  Pv as SlashCommands,
  Yw as TabIndent,
  Sl as TableOfContents,
  Ev as TagPill,
  Rw as WikiLinkSafe,
  _1 as applyTheme,
  OC as createCustomTheme,
  rm as darkTheme,
  Ri as getDateVariant,
  ir as isValidTag,
  I1 as lightTheme,
  be as lowlight,
  O1 as nordTheme,
  oo as normalizeTag,
  Xt as parseDateFromMarkdown,
  L1 as sepiaTheme,
  cr as themes,
  Cw as useAutoSave,
  BC as useEditorTheme,
  Ew as useWordCount
};
//# sourceMappingURL=paragon.js.map
