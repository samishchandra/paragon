import { jsxs as R, jsx as m, Fragment as De } from "react/jsx-runtime";
import { ReactNodeViewRenderer as yo, NodeViewWrapper as En, NodeViewContent as Gs, useEditorState as mc, useEditor as _u, EditorContent as $u } from "@tiptap/react";
import Hu from "@tiptap/starter-kit";
import Wu from "@tiptap/extension-placeholder";
import zu from "@tiptap/extension-text-align";
import Bu from "@tiptap/extension-highlight";
import Fu from "@tiptap/extension-link";
import { Table as Uu } from "@tiptap/extension-table";
import Yu from "@tiptap/extension-table-row";
import ju from "@tiptap/extension-table-cell";
import Vu from "@tiptap/extension-table-header";
import { Plugin as Pe, PluginKey as Oe, TextSelection as ct, AllSelection as Ku } from "@tiptap/pm/state";
import { DecorationSet as ze, Decoration as qe } from "@tiptap/pm/view";
import { Extension as tt, Node as vo, mergeAttributes as Rn, InputRule as We, Mark as pc } from "@tiptap/core";
import Gu from "@tiptap/extension-bullet-list";
import qu from "@tiptap/extension-ordered-list";
import Xu from "@tiptap/extension-list-item";
import Zu from "@tiptap/extension-task-list";
import Qu from "@tiptap/extension-task-item";
import { findWrapping as Za, canJoin as Ju } from "@tiptap/pm/transform";
import ef from "@tiptap/extension-underline";
import tf from "@tiptap/extension-subscript";
import nf from "@tiptap/extension-superscript";
import rf from "@tiptap/extension-typography";
import of from "@tiptap/extension-code-block-lowlight";
import { createLowlight as sf } from "lowlight";
import * as M from "react";
import J, { useState as j, useRef as V, useEffect as Q, useCallback as U, memo as Ln, createContext as hc, useContext as gc, useLayoutEffect as bo, useMemo as Jt, Component as af, useReducer as cf, forwardRef as lf, useImperativeHandle as df } from "react";
import { ChevronDown as Wt, Check as In, Copy as Pn, Link2 as qs, ExternalLink as uf, Pencil as ff, Unlink as mf, Bold as Xs, Italic as Zs, Underline as Qs, Strikethrough as Js, Code as yc, Highlighter as vc, Link as ea, Quote as ta, List as na, ListOrdered as ra, CheckSquare as oa, FileCode as pf, Sparkles as wo, ListTodo as sa, BookOpen as aa, MessageSquareText as bc, StickyNote as wc, Info as oo, ChevronRight as xc, ChevronLeftIcon as hf, ChevronRightIcon as gf, ChevronDownIcon as yf, Calendar as kc, Hash as Qa, Image as ia, X as St, Type as xo, Heading1 as vf, Heading2 as bf, Heading3 as wf, Heading4 as xf, Heading5 as kf, Code2 as Cc, Table as Ss, Minus as Mc, FileText as ca, Plus as la, Undo as Cf, Redo as Mf, IndentIncrease as Sf, IndentDecrease as Tf, PenLine as Ef, Library as Df, Columns as Ja, Trash2 as bn, Rows as ei, ToggleLeft as ti, ArrowUpDown as Nf, Search as Af, ChevronUp as Rf, MousePointerClick as Lf, CaseSensitive as If, WholeWord as Pf, Regex as Of, Replace as Ts, ReplaceAll as _f, Cloud as $f, Loader2 as Sc, CloudOff as Hf, AlertCircle as Wf, RotateCcw as da, ImagePlus as zf, Activity as Bf, Maximize2 as Tc, Minimize2 as Ec, AlertTriangle as Ff, CheckCircle2 as Uf, MessageSquare as Dc, RefreshCw as Yf, SpellCheck as jf, PanelRightClose as Vf, PanelRightOpen as Kf, Eye as Gf } from "lucide-react";
import ua from "highlight.js/lib/languages/javascript";
import fa from "highlight.js/lib/languages/typescript";
import Nc from "highlight.js/lib/languages/python";
import ma from "highlight.js/lib/languages/xml";
import qf from "highlight.js/lib/languages/css";
import Xf from "highlight.js/lib/languages/json";
import ko from "highlight.js/lib/languages/bash";
import * as Ac from "react-dom";
import Zf, { createPortal as Qf } from "react-dom";
import Jf from "@tiptap/extension-image";
import { createRoot as em } from "react-dom/client";
import { Fragment as tm } from "@tiptap/pm/model";
import { liftListItem as ni, sinkListItem as ri } from "@tiptap/pm/schema-list";
import { undo as nm, redo as rm } from "@tiptap/pm/history";
import om from "@tiptap/extension-horizontal-rule";
const sm = new Oe("tableCellMenu");
let oi = !1, Or = null;
function am() {
  oi || (oi = !0, document.addEventListener("mouseover", (e) => {
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
function im(e) {
  return am(), new Pe({
    key: sm,
    state: {
      init() {
        return ze.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && Or ? Or.map(t.mapping, t.doc) : (Or = cm(o.doc, e), Or);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function cm(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = qe.widget(o + 1, (i) => {
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
          t.chain().focus().setTextSelection(o + 1).run(), lm(g, t, o, h);
        }), a.appendChild(c), a;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), ze.create(e, n);
}
function lm(e, t, n, r) {
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
    { label: "Copy Table", icon: "copy", action: () => dm(t) }
  ], S = {
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
      const O = S[N.icon || ""] || "", $ = N.destructive ? k : D;
      A.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + $ + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + N.label + "</span>", A.addEventListener("mouseenter", () => {
        A.style.background = N.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : x;
      }), A.addEventListener("mouseleave", () => {
        A.style.background = "transparent";
      }), A.addEventListener("click", (B) => {
        B.preventDefault(), B.stopPropagation(), N.action && N.action(), s.remove();
      }), s.appendChild(A);
    }
  }), document.body.appendChild(s);
  const T = (N) => {
    const A = N.target;
    if (s.contains(A) || A.classList.contains("table-cell-menu-btn"))
      return;
    const P = A.closest('[role="dialog"]');
    P && P.contains(s) || (s.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", E));
  }, E = (N) => {
    N.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", E));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", T), document.addEventListener("keydown", E);
  }, 0);
}
function dm(e) {
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
const um = ju.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      im(this.editor)
    ];
  }
}), fm = Vu.extend({}), nr = new Oe("tableSorting");
let Xt = null, Qn = null;
function mm(e) {
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
function pm(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function hm(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (g, h) => {
    if (g.type.name === "table" && h === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Xt?.tablePos === t && Xt?.columnIndex === n && Xt?.direction === "asc" ? "desc" : "asc";
  Xt = { tablePos: t, columnIndex: n, direction: i }, Qn = null;
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
    si(n, i), o.dispatch(r.tr.setMeta(nr, { updated: !0 }));
    return;
  }
  const d = l.map((g) => {
    let h = "", y = 0;
    return g.node.forEach((b) => {
      y === n && (h = b.textContent || ""), y++;
    }), { ...g, sortValue: mm(h) };
  }), u = d.map((g, h) => h);
  d.sort((g, h) => pm(g.sortValue, h.sortValue, i));
  const f = d.map((g, h) => l.indexOf(g));
  if (u.some((g, h) => g !== f[h])) {
    const g = [];
    c.forEach((b) => g.push(b.node)), d.forEach((b) => g.push(b.node));
    const h = s.type.create(s.attrs, g), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, h), y.setMeta(nr, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(nr, { updated: !0 }));
  si(n, i);
}
function si(e, t) {
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
function gm(e, t, n, r) {
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
    d.preventDefault(), d.stopPropagation(), hm(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function ym(e) {
  return new Pe({
    key: nr,
    state: {
      init() {
        return ze.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(nr);
        return !t.docChanged && !s?.updated && Qn ? Qn.map(t.mapping, t.doc) : (Qn = vm(o.doc, e), Qn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function vm(e, t) {
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
              d.forEach((w, S) => {
                w.type.name === "paragraph" && (p = f + 1 + S + w.nodeSize - 1);
              });
              const h = Xt?.tablePos === s && Xt?.columnIndex === c ? Xt.direction : null, y = c, b = s, v = qe.widget(p, () => gm(h, b, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(v);
            }
            l += d.nodeSize, c++;
          });
        }
      });
    }
  }), ze.create(e, n);
}
const bm = tt.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [ym(this.editor)];
  }
});
function pa(e, t, n, r, o, s = {}) {
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
const wm = Gu.extend({
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
          if (pa(n, f, i, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), xm = qu.extend({
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
          if (pa(n, f, c, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), km = Zu.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: c, $to: l } = a, d = c.blockRange(l);
        if (!d)
          return !1;
        const u = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let x = c.depth; x > 0; x--)
          if (c.node(x).type === u) {
            p = !0, c.before(x);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const g = n.schema.nodes.bulletList, h = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let b = null, v = -1;
        for (let x = c.depth; x > 0; x--) {
          const k = c.node(x);
          if (k.type === g || k.type === h) {
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
          D.forEach((T, E) => {
            T.type === y && C.push(x + 1 + E);
          });
          for (let T = C.length - 1; T >= 0; T--) {
            const E = C[T], N = r.doc.nodeAt(E);
            N && N.type === y && r.setNodeMarkup(E, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const w = Za(d, u);
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
              D.forEach((T, E) => {
                T.type === y && C.push(k + 1 + E);
              });
              for (let T = C.length - 1; T >= 0; T--) {
                const E = C[T], N = r.doc.nodeAt(E);
                N && N.type === y && r.setNodeMarkup(E, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const S = Za(d, g);
        if (S) {
          r.wrap(d, S);
          const { $from: x } = r.selection;
          let k = -1;
          for (let D = x.depth; D > 0; D--)
            if (x.node(D).type === g) {
              k = x.before(D);
              break;
            }
          return k >= 0 && pa(r, k, u, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Cm = Qu.extend({
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
          return f.setSelection(ct.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
      new Pe({
        key: new Oe("taskItemInputRule"),
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
              v && v.type === t && Ju(g.doc, f - 1) && g.join(f - 1);
            }
            return n.dispatch(g), !0;
          }
        }
      })
    ];
  }
}), Mm = Xu.extend({
  content: "paragraph block*"
}), ai = new Oe("collapsibleList");
function Es(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function Ds(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function Sm(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let wn = null;
function ts(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !Ds(o))
      return !0;
    const i = Es(o, s), a = t.collapsedItems.has(i);
    r.push(
      qe.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${a ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const c = o.firstChild;
    if (c && c.type.name === "paragraph") {
      const l = s + 1 + c.nodeSize - 1, d = qe.widget(
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
            g.classList.remove("collapsed", "expanded"), g.classList.add(y ? "expanded" : "collapsed"), g.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), wn && wn.dispatch(
              wn.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), p.appendChild(g), p;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(d);
    }
    if (a && Sm(o, s)) {
      let d = s + 1;
      o.forEach((u) => {
        ["bulletList", "orderedList", "taskList"].includes(u.type.name) && r.push(
          qe.node(d, d + u.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), d += u.nodeSize;
      });
    }
    return !0;
  }), ze.create(e, r);
}
const Tm = tt.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !Ds(o))
          return !1;
        const s = Es(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && Ds(o) && n.collapsedItems.add(Es(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Pe({
        key: ai,
        view(n) {
          return wn = n, {
            update(r) {
              wn = r;
            },
            destroy() {
              wn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: ts(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: ts(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = ai.getState(n);
            return r?.decorations ? r.decorations : ts(n.doc, e, t);
          }
        }
      })
    ];
  }
}), xe = sf();
xe.register("javascript", ua);
xe.register("js", ua);
xe.register("jsx", ua);
xe.register("typescript", fa);
xe.register("ts", fa);
xe.register("tsx", fa);
xe.register("python", Nc);
xe.register("py", Nc);
xe.register("xml", ma);
xe.register("html", ma);
xe.register("svg", ma);
xe.register("css", qf);
xe.register("json", Xf);
xe.register("bash", ko);
xe.register("sh", ko);
xe.register("shell", ko);
xe.register("zsh", ko);
const Ns = {
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
}, _r = /* @__PURE__ */ new Set(), $r = /* @__PURE__ */ new Set();
async function Em(e) {
  if (xe.registered(e)) return !0;
  const t = Ns[e];
  if (!t) return !1;
  if ($r.has(e)) return !0;
  if (_r.has(e))
    return new Promise((n) => {
      const r = () => {
        $r.has(e) ? n(!0) : _r.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  _r.add(e);
  try {
    const r = (await t()).default;
    xe.register(e, r), $r.add(e);
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
          i !== e && !xe.registered(i) && (xe.register(i, r), $r.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    _r.delete(e);
  }
}
function Dm({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = j(!1), [s, i] = j(!1), [a, c] = j(!0), l = V(null), d = e.attrs.language || "plaintext";
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
      if (xe.registered(d)) {
        c(!0);
        return;
      }
      Ns[d] && (c(!1), Em(d).then((h) => {
        c(h);
      }));
    }
  }, [s, d]);
  const u = U(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (h) {
      console.error("Failed to copy:", h);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(Ns)])).sort(), g = d === "plaintext" ? "Plain Text" : d.charAt(0).toUpperCase() + d.slice(1);
  return /* @__PURE__ */ R(En, { className: "code-block-wrapper", ref: l, children: [
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
        /* @__PURE__ */ m(Wt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: u,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ m(In, { size: 14 }) : /* @__PURE__ */ m(Pn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !a ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Gs, { className: s && a ? `language-${d}` : "language-plaintext" }) })
  ] });
}
const Nm = of.extend({
  addNodeView() {
    return yo(Dm);
  }
}).configure({
  lowlight: xe,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function Nt({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: r
}) {
  const o = U(
    (a) => {
      r?.(a), a.stopPropagation();
    },
    [r]
  ), s = U((a) => {
    a.stopPropagation();
  }, []), i = U((a) => {
    a.stopPropagation();
  }, []);
  return Qf(
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
function Am({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = j(""), s = V(null), i = V(null), [a, c] = j({ top: 0, left: 0 });
  Q(() => {
    if (t) {
      const g = e.getAttributes("link").href || "";
      o(g);
      try {
        const { view: h } = e, { from: y } = h.state.selection, b = h.coordsAtPos(y), v = b.bottom + 8, w = Math.max(16, Math.min(b.left, window.innerWidth - 420));
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
  const l = U((g) => {
    if (g?.preventDefault(), r.trim()) {
      let h = r.trim();
      !/^https?:\/\//i.test(h) && !h.startsWith("mailto:") && (h = "https://" + h), e.chain().focus().extendMarkRange("link").setLink({ href: h }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), d = U((g) => {
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
          /* @__PURE__ */ m(qs, { className: "link-popover-icon", size: 16 }),
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
  return /* @__PURE__ */ m(Nt, { children: p });
}
function Rm({ editor: e, onEditLink: t }) {
  const [n, r] = j({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = V(null), s = V(null), i = U((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const S = w.getAttribute("href") || "", x = w.getBoundingClientRect(), k = x.bottom + 8, D = Math.max(16, Math.min(x.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: S,
          position: { top: k, left: D },
          linkElement: w
        });
      } catch (S) {
        console.warn("LinkHoverTooltip: Error showing tooltip", S);
      }
    }
  }, [e]), a = U(() => {
    s.current = setTimeout(() => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = U(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  Q(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const S = (k) => {
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
    return w.addEventListener("mouseover", S), w.addEventListener("mouseout", x), () => {
      w.removeEventListener("mouseover", S), w.removeEventListener("mouseout", x), s.current && clearTimeout(s.current);
    };
  }, [e, i, a]), Q(() => {
    if (!n.isVisible) return;
    const w = () => {
      r((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, S = e.view.dom.closest(".editor-content-wrapper");
    return S?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      S?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e]);
  const [l, d] = j(!1), u = U(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      d(!0), setTimeout(() => d(!1), 1500);
    });
  }, [n.url]), f = U(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = U(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: S } = w.state;
      let x = null, k = null;
      S.descendants((D, C) => {
        if (D.isText && D.marks.some((T) => T.type.name === "link")) {
          const T = w.nodeDOM(C);
          if (T && (T === n.linkElement || T.parentElement === n.linkElement))
            return x = C, k = C + D.nodeSize, !1;
        }
        return !0;
      }), x !== null && k !== null ? e.chain().focus().setTextSelection({ from: x, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), g = U(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: S } = w.state;
      S.descendants((x, k) => {
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
              /* @__PURE__ */ m(uf, { size: 13, className: "link-hover-tooltip-link-icon" }),
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
              children: /* @__PURE__ */ m(ff, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: u,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: l ? /* @__PURE__ */ m(In, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ m(Pn, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(mf, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ m(Nt, { children: v });
}
const Ge = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ m(
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
), ii = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), ci = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Lm = Ln(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = j(!1), d = V(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = ci.find((g) => g.value === u)?.shortLabel || "P";
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
          /* @__PURE__ */ m(Wt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
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
        children: ci.map((g) => {
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
}), Im = Ln(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const i = V(null), a = mc({
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
  }), [c, l] = j(!1), [d, u] = j(""), [f, p] = j(!1), [g, h] = j({ top: 0, left: 0 }), y = V(null), b = V(null), v = V(null), w = U(() => {
    if (d) {
      let T = d.trim();
      !/^https?:\/\//i.test(T) && !T.startsWith("mailto:") && (T = "https://" + T), t.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    l(!1), u("");
  }, [t, d]), S = (T) => {
    T.preventDefault(), T.stopPropagation();
    const E = t.getAttributes("link").href;
    u(E || ""), l(!0);
  }, x = U((T, E) => {
    T.preventDefault(), T.stopPropagation(), E();
  }, []);
  Q(() => {
    if (!t || t.isDestroyed) return;
    const T = () => {
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
          const q = t.view.coordsAtPos(A), I = t.view.coordsAtPos(P), L = y.current?.offsetWidth || 500, F = y.current?.offsetHeight || 40, X = 8, K = window.innerWidth;
          let Z = 0, te = 0;
          if (y.current) {
            const ue = y.current.closest('[data-slot="dialog-content"]');
            if (ue) {
              const fe = ue.getBoundingClientRect();
              Z = fe.left, te = fe.top;
            }
          }
          let z = (q.left + I.left) / 2 - L / 2 - Z;
          const Y = Z ? K - Z : K;
          z = Math.max(X, Math.min(Y - L - X, z));
          let ee = q.top - F - 10 - te;
          ee < X && (ee = I.bottom + 10 - te), f ? h({ top: Math.max(X, ee), left: z }) : (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
            h({ top: Math.max(X, ee), left: z }), p(!0);
          }, 50));
        } catch (E) {
          console.warn("FloatingToolbar: Error updating position", E);
        }
    };
    return t.on("selectionUpdate", T), () => {
      t.off("selectionUpdate", T), b.current && clearTimeout(b.current), v.current && clearTimeout(v.current);
    };
  }, [t, f]);
  const k = (T) => {
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
        /* @__PURE__ */ R("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ m(
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
          /* @__PURE__ */ m(
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
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBold().run()),
            isActive: a?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Xs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleItalic().run()),
            isActive: a?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Zs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleUnderline().run()),
            isActive: a?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Qs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleStrike().run()),
            isActive: a?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Js, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleCode().run()),
            isActive: a?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(yc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleHighlight().run()),
            isActive: a?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(vc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: S,
            isActive: a?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(ea, { size: D })
          }
        ),
        /* @__PURE__ */ m(ii, {}),
        /* @__PURE__ */ m(
          Lm,
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
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBlockquote().run()),
            isActive: a?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(ta, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleBulletList().run()),
            isActive: a?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(na, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleOrderedList().run()),
            isActive: a?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(ra, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleTaskList().run()),
            isActive: a?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(oa, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ge,
          {
            onMouseDown: (T) => x(T, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: a?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(pf, { size: D })
          }
        ),
        o && /* @__PURE__ */ R(De, { children: [
          /* @__PURE__ */ m(ii, {}),
          /* @__PURE__ */ m(
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
              children: /* @__PURE__ */ m(wo, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: k, children: C });
}), Hr = {
  info: { icon: oo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: wc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: bc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: aa, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: sa, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function Pm({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = j(!1), [s, i] = j(!1), [a, c] = j(null), l = V(null), d = V(null), u = e.attrs.type || "info", f = Hr[u] || Hr.info, p = f.icon, g = U(() => {
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
  const h = U(() => {
    n.isEditable && (r || g(), o(!r));
  }, [n.isEditable, r, g]), y = (v) => {
    t({ type: v }), o(!1);
  }, b = U((v) => {
    v.stopPropagation(), i((w) => !w);
  }, []);
  return /* @__PURE__ */ R(En, { className: `callout callout-${u}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": u, children: [
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
                n.isEditable && /* @__PURE__ */ m(Wt, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(xc, { size: 16 }) : /* @__PURE__ */ m(Wt, { size: 16 })
            }
          ),
          r && n.isEditable && a && /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
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
              children: Object.keys(Hr).map((v) => {
                const w = Hr[v], S = w.icon;
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
                      /* @__PURE__ */ m(S, { size: 16, style: { color: w.borderColor } }),
                      /* @__PURE__ */ m("span", { children: w.label })
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
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Gs, {}) })
  ] });
}
const Om = vo.create({
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
      Rn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return yo(Pm);
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
}), _m = Jf.extend({
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
        Rn(this.options.HTMLAttributes, e)
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
        const F = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[L] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${F}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (L) => !(!L || L.startsWith("data:") || L.startsWith("blob:") || L.startsWith("http://") || L.startsWith("https://")), l = (L) => {
        c(L) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(L).then((F) => {
          a.src = F, a.style.opacity = "1";
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
      const p = (L, F, X) => {
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
      }, g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", g, () => {
        const L = typeof r == "function" ? r() : null;
        if (L != null && e.onImageClick) {
          const F = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: L,
            rect: F
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
      })), f.appendChild(p("Copy URL", b, async () => {
        const L = o.attrs.src;
        try {
          await navigator.clipboard.writeText(L);
        } catch {
        }
      })), f.appendChild(p("Save image", y, () => {
        const L = o.attrs.src, F = o.attrs.alt || "image", X = document.createElement("a");
        X.href = L, X.download = F, X.target = "_blank", X.rel = "noopener noreferrer", document.body.appendChild(X), X.click(), setTimeout(() => {
          document.body.removeChild(X);
        }, 100);
      }));
      const v = document.createElement("div");
      v.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(v);
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
        k.forEach((F) => {
          (F.getAttribute("data-align-value") || "left") === L ? (F.style.background = "oklch(1 0 0)", F.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", F.style.color = "oklch(0.25 0 0)", F.style.fontWeight = "600") : (F.style.background = "transparent", F.style.boxShadow = "none", F.style.color = "oklch(0.5 0 0)", F.style.fontWeight = "400");
        });
      };
      x.forEach(({ value: L, label: F, icon: X }) => {
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
              const { state: _, dispatch: z } = n.view, Y = _.doc.nodeAt(te);
              if (Y && Y.type.name === "resizableImage") {
                const ee = _.tr.setNodeMarkup(te, void 0, {
                  ...Y.attrs,
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
        }), k.push(K), S.appendChild(K);
      }), f.appendChild(S);
      const C = () => {
        const L = o.attrs.align || "left";
        D(L);
      };
      let T = !1;
      u.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), T)
          f.style.display = "none", T = !1;
        else {
          const F = u.getBoundingClientRect(), X = 200, K = f.closest('[role="dialog"]');
          let Z = 0, te = 0;
          if (K) {
            const fe = K.getBoundingClientRect();
            Z = fe.left, te = fe.top;
          }
          let _ = F.bottom + 4 - te, z = F.right - X - Z;
          const Y = window.innerHeight, ee = window.innerWidth, ue = 200;
          F.bottom + 4 + ue > Y && (_ = F.top - ue - 4 - te), z + Z < 8 && (z = 8 - Z), z + X + Z > ee - 8 && (z = ee - X - 8 - Z), f.style.top = `${_}px`, f.style.left = `${z}px`, f.style.display = "flex", T = !0, C();
        }
      });
      const E = (L) => {
        !f.contains(L.target) && !u.contains(L.target) && (f.style.display = "none", T = !1);
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
        d.style.opacity = "0", N.style.opacity = "0", T || (u.style.opacity = "0");
      }), u.addEventListener("mouseenter", () => {
        u.style.background = "oklch(0.95 0 0)";
      }), u.addEventListener("mouseleave", () => {
        u.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const P = (L) => {
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
        const z = (ee) => {
          ee.key === "Escape" && (_(), document.removeEventListener("keydown", z));
        };
        document.addEventListener("keydown", z), F.appendChild(X), F.appendChild(K), te && F.appendChild(te);
        const Y = s.closest('[role="dialog"]');
        Y ? Y.appendChild(F) : document.body.appendChild(F), requestAnimationFrame(() => {
          F.style.opacity = "1", X.style.transform = "scale(1)";
        });
      };
      N.addEventListener("click", P);
      let O, $;
      const B = (L) => {
        L.preventDefault(), O = L.clientX, $ = a.offsetWidth, document.addEventListener("mousemove", q), document.addEventListener("mouseup", I);
      }, q = (L) => {
        const F = L.clientX - O, X = Math.max(100, $ + F);
        a.style.width = `${X}px`;
      }, I = () => {
        document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const L = typeof r == "function" ? r() : null, F = a.offsetWidth;
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
function $m(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Hm = {}, Jn = {};
function Zt(e, t) {
  try {
    const r = (Hm[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in Jn ? Jn[r] : li(r, r.split(":"));
  } catch {
    if (e in Jn) return Jn[e];
    const n = e?.match(Wm);
    return n ? li(e, n.slice(1)) : NaN;
  }
}
const Wm = /([+-]\d\d):?(\d\d)?/;
function li(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Jn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class at extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Zt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Rc(this), As(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new at(...n, t) : new at(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new at(+this, t);
  }
  getTimezoneOffset() {
    const t = -Zt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), As(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new at(+new Date(t), this.timeZone);
  }
  //#endregion
}
const di = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!di.test(e)) return;
  const t = e.replace(di, "$1UTC");
  at.prototype[t] && (e.startsWith("get") ? at.prototype[e] = function() {
    return this.internal[t]();
  } : (at.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), zm(this), +this;
  }, at.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), As(this), +this;
  }));
});
function As(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Zt(e.timeZone, e) * 60));
}
function zm(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Rc(e);
}
function Rc(e) {
  const t = Zt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const d = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, u = Math.round(-(Zt(e.timeZone, e) * 60)) % 60;
  (u || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + d));
  const f = Zt(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), h = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, b = h - c;
  if (y && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const v = Zt(e.timeZone, e), w = v > 0 ? Math.floor(v) : Math.ceil(v), S = p - w;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class Le extends at {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Le(...n, t) : new Le(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${$m(this.timeZone, this)})`;
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
    return new Le(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Le(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Lc = 6048e5, Bm = 864e5, ui = Symbol.for("constructDateFrom");
function Se(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ui in e ? e[ui](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ve(e, t) {
  return Se(t || e, e);
}
function Ic(e, t, n) {
  const r = ve(e, n?.in);
  return isNaN(t) ? Se(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Pc(e, t, n) {
  const r = ve(e, n?.in);
  if (isNaN(t)) return Se(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Se(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const i = s.getDate();
  return o >= i ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let Fm = {};
function mr() {
  return Fm;
}
function Dn(e, t) {
  const n = mr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ve(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function sr(e, t) {
  return Dn(e, { ...t, weekStartsOn: 1 });
}
function Oc(e, t) {
  const n = ve(e, t?.in), r = n.getFullYear(), o = Se(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = sr(o), i = Se(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = sr(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function fi(e) {
  const t = ve(e), n = new Date(
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
function On(e, ...t) {
  const n = Se.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function ar(e, t) {
  const n = ve(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function _c(e, t, n) {
  const [r, o] = On(
    n?.in,
    e,
    t
  ), s = ar(r), i = ar(o), a = +s - fi(s), c = +i - fi(i);
  return Math.round((a - c) / Bm);
}
function Um(e, t) {
  const n = Oc(e, t), r = Se(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), sr(r);
}
function Ym(e, t, n) {
  return Ic(e, t * 7, n);
}
function jm(e, t, n) {
  return Pc(e, t * 12, n);
}
function Vm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Se.bind(null, o));
    const s = ve(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Se(r, n || NaN);
}
function Km(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Se.bind(null, o));
    const s = ve(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Se(r, n || NaN);
}
function Gm(e, t, n) {
  const [r, o] = On(
    n?.in,
    e,
    t
  );
  return +ar(r) == +ar(o);
}
function $c(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function qm(e) {
  return !(!$c(e) && typeof e != "number" || isNaN(+ve(e)));
}
function Xm(e, t, n) {
  const [r, o] = On(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function Zm(e, t) {
  const n = ve(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Hc(e, t) {
  const [n, r] = On(e, t.start, t.end);
  return { start: n, end: r };
}
function Qm(e, t) {
  const { start: n, end: r } = Hc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Se(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function Jm(e, t) {
  const n = ve(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function ep(e, t) {
  const n = ve(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Wc(e, t) {
  const n = ve(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function tp(e, t) {
  const { start: n, end: r } = Hc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Se(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function zc(e, t) {
  const n = mr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ve(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function np(e, t) {
  return zc(e, { ...t, weekStartsOn: 1 });
}
const rp = {
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
}, op = (e, t, n) => {
  let r;
  const o = rp[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ns(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const sp = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, ap = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, ip = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, cp = {
  date: ns({
    formats: sp,
    defaultWidth: "full"
  }),
  time: ns({
    formats: ap,
    defaultWidth: "full"
  }),
  dateTime: ns({
    formats: ip,
    defaultWidth: "full"
  })
}, lp = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, dp = (e, t, n, r) => lp[e];
function qn(e) {
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
const up = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, fp = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, mp = {
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
}, pp = {
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
}, hp = {
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
}, gp = {
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
}, yp = (e, t) => {
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
}, vp = {
  ordinalNumber: yp,
  era: qn({
    values: up,
    defaultWidth: "wide"
  }),
  quarter: qn({
    values: fp,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: qn({
    values: mp,
    defaultWidth: "wide"
  }),
  day: qn({
    values: pp,
    defaultWidth: "wide"
  }),
  dayPeriod: qn({
    values: hp,
    defaultWidth: "wide",
    formattingValues: gp,
    defaultFormattingWidth: "wide"
  })
};
function Xn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? wp(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      bp(a, (u) => u.test(i))
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
function bp(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function wp(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function xp(e) {
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
const kp = /^(\d+)(th|st|nd|rd)?/i, Cp = /\d+/i, Mp = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Sp = {
  any: [/^b/i, /^(a|c)/i]
}, Tp = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Ep = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Dp = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Np = {
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
}, Ap = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Rp = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Lp = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Ip = {
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
}, Pp = {
  ordinalNumber: xp({
    matchPattern: kp,
    parsePattern: Cp,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Xn({
    matchPatterns: Mp,
    defaultMatchWidth: "wide",
    parsePatterns: Sp,
    defaultParseWidth: "any"
  }),
  quarter: Xn({
    matchPatterns: Tp,
    defaultMatchWidth: "wide",
    parsePatterns: Ep,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Xn({
    matchPatterns: Dp,
    defaultMatchWidth: "wide",
    parsePatterns: Np,
    defaultParseWidth: "any"
  }),
  day: Xn({
    matchPatterns: Ap,
    defaultMatchWidth: "wide",
    parsePatterns: Rp,
    defaultParseWidth: "any"
  }),
  dayPeriod: Xn({
    matchPatterns: Lp,
    defaultMatchWidth: "any",
    parsePatterns: Ip,
    defaultParseWidth: "any"
  })
}, ha = {
  code: "en-US",
  formatDistance: op,
  formatLong: cp,
  formatRelative: dp,
  localize: vp,
  match: Pp,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Op(e, t) {
  const n = ve(e, t?.in);
  return _c(n, Wc(n)) + 1;
}
function Bc(e, t) {
  const n = ve(e, t?.in), r = +sr(n) - +Um(n);
  return Math.round(r / Lc) + 1;
}
function Fc(e, t) {
  const n = ve(e, t?.in), r = n.getFullYear(), o = mr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Se(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = Dn(i, t), c = Se(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = Dn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function _p(e, t) {
  const n = mr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Fc(e, t), s = Se(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Dn(s, t);
}
function Uc(e, t) {
  const n = ve(e, t?.in), r = +Dn(n, t) - +_p(n, t);
  return Math.round(r / Lc) + 1;
}
function ge(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Pt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return ge(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ge(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ge(e.getDate(), t.length);
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
    return ge(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ge(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ge(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ge(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return ge(o, t.length);
  }
}, un = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, mi = {
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
    return Pt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Fc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return ge(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : ge(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Oc(e);
    return ge(n, t.length);
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
    return ge(n, t.length);
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
        return ge(r, 2);
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
        return ge(r, 2);
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
        return Pt.M(e, t);
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
        return ge(r + 1, 2);
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
    const o = Uc(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ge(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Bc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ge(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Pt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Op(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : ge(r, t.length);
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
        return ge(s, 2);
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
        return ge(s, t.length);
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
        return ge(o, t.length);
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
    switch (r === 12 ? o = un.noon : r === 0 ? o = un.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = un.evening : r >= 12 ? o = un.afternoon : r >= 4 ? o = un.morning : o = un.night, t) {
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
    return Pt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Pt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : ge(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : ge(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Pt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Pt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Pt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return hi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Gt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Gt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return hi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Gt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Gt(r, ":");
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
        return "GMT" + pi(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Gt(r, ":");
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
        return "GMT" + pi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Gt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return ge(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ge(+e, t.length);
  }
};
function pi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + ge(s, 2);
}
function hi(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ge(Math.abs(e) / 60, 2) : Gt(e, t);
}
function Gt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ge(Math.trunc(r / 60), 2), s = ge(r % 60, 2);
  return n + o + t + s;
}
const gi = (e, t) => {
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
}, Yc = (e, t) => {
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
}, $p = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return gi(e, t);
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
  return s.replace("{{date}}", gi(r, t)).replace("{{time}}", Yc(o, t));
}, Hp = {
  p: Yc,
  P: $p
}, Wp = /^D+$/, zp = /^Y+$/, Bp = ["D", "DD", "YY", "YYYY"];
function Fp(e) {
  return Wp.test(e);
}
function Up(e) {
  return zp.test(e);
}
function Yp(e, t, n) {
  const r = jp(e, t, n);
  if (console.warn(r), Bp.includes(e)) throw new RangeError(r);
}
function jp(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Vp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Kp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Gp = /^'([^]*?)'?$/, qp = /''/g, Xp = /[a-zA-Z]/;
function Zp(e, t, n) {
  const r = mr(), o = n?.locale ?? r.locale ?? ha, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = ve(e, n?.in);
  if (!qm(a))
    throw new RangeError("Invalid time value");
  let c = t.match(Kp).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const f = Hp[u];
      return f(d, o.formatLong);
    }
    return d;
  }).join("").match(Vp).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: Qp(d) };
    if (mi[u])
      return { isToken: !0, value: d };
    if (u.match(Xp))
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
    (!n?.useAdditionalWeekYearTokens && Up(u) || !n?.useAdditionalDayOfYearTokens && Fp(u)) && Yp(u, t, String(e));
    const f = mi[u[0]];
    return f(a, u, o.localize, l);
  }).join("");
}
function Qp(e) {
  const t = e.match(Gp);
  return t ? t[1].replace(qp, "'") : e;
}
function Jp(e, t) {
  const n = ve(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Se(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function eh(e, t) {
  return ve(e, t?.in).getMonth();
}
function th(e, t) {
  return ve(e, t?.in).getFullYear();
}
function nh(e, t) {
  return +ve(e) > +ve(t);
}
function rh(e, t) {
  return +ve(e) < +ve(t);
}
function oh(e, t, n) {
  const [r, o] = On(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function sh(e, t, n) {
  const [r, o] = On(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function ah(e, t, n) {
  const r = ve(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Se(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = Jp(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function ih(e, t, n) {
  const r = ve(e, n?.in);
  return isNaN(+r) ? Se(e, NaN) : (r.setFullYear(t), r);
}
const yi = 5, ch = 4;
function lh(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, yi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? yi : ch;
}
function jc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function dh(e, t) {
  const n = jc(e, t), r = lh(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Ve {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Le.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Le(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Ic(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Pc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Ym(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : jm(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : _c(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Xm(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Qm(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : tp(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : dh(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : np(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Zm(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : zc(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : ep(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : Zp(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Bc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : eh(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : th(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Uc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : nh(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : rh(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : $c(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Gm(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : oh(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : sh(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Vm(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Km(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : ah(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : ih(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : jc(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : ar(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : sr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Jm(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Dn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Wc(r), this.options = { locale: ha, ...t }, this.overrides = n;
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
    return t && Ve.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Ve.yearFirstLocales.has(s))
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
Ve.yearFirstLocales = /* @__PURE__ */ new Set([
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
const ut = new Ve();
class Vc {
  constructor(t, n, r = ut) {
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
class uh {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class fh {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function mh(e) {
  return J.createElement("button", { ...e });
}
function ph(e) {
  return J.createElement("span", { ...e });
}
function hh(e) {
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
function gh(e) {
  const { day: t, modifiers: n, ...r } = e;
  return J.createElement("td", { ...r });
}
function yh(e) {
  const { day: t, modifiers: n, ...r } = e, o = J.useRef(null);
  return J.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), J.createElement("button", { ref: o, ...r });
}
var oe;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(oe || (oe = {}));
var we;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(we || (we = {}));
var Qe;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Qe || (Qe = {}));
var Ue;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Ue || (Ue = {}));
function vh(e) {
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
function bh(e) {
  return J.createElement("div", { ...e });
}
function wh(e) {
  return J.createElement("div", { ...e });
}
function xh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return J.createElement("div", { ...r }, e.children);
}
function kh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return J.createElement("div", { ...r });
}
function Ch(e) {
  return J.createElement("table", { ...e });
}
function Mh(e) {
  return J.createElement("div", { ...e });
}
const Kc = hc(void 0);
function pr() {
  const e = gc(Kc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Sh(e) {
  const { components: t } = pr();
  return J.createElement(t.Dropdown, { ...e });
}
function Th(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = pr(), d = U((f) => {
    o && n?.(f);
  }, [o, n]), u = U((f) => {
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
function Eh(e) {
  const { components: t } = pr();
  return J.createElement(t.Button, { ...e });
}
function Dh(e) {
  return J.createElement("option", { ...e });
}
function Nh(e) {
  const { components: t } = pr();
  return J.createElement(t.Button, { ...e });
}
function Ah(e) {
  const { rootRef: t, ...n } = e;
  return J.createElement("div", { ...n, ref: t });
}
function Rh(e) {
  return J.createElement("select", { ...e });
}
function Lh(e) {
  const { week: t, ...n } = e;
  return J.createElement("tr", { ...n });
}
function Ih(e) {
  return J.createElement("th", { ...e });
}
function Ph(e) {
  return J.createElement(
    "thead",
    { "aria-hidden": !0 },
    J.createElement("tr", { ...e })
  );
}
function Oh(e) {
  const { week: t, ...n } = e;
  return J.createElement("th", { ...n });
}
function _h(e) {
  return J.createElement("th", { ...e });
}
function $h(e) {
  return J.createElement("tbody", { ...e });
}
function Hh(e) {
  const { components: t } = pr();
  return J.createElement(t.Dropdown, { ...e });
}
const Wh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: mh,
  CaptionLabel: ph,
  Chevron: hh,
  Day: gh,
  DayButton: yh,
  Dropdown: vh,
  DropdownNav: bh,
  Footer: wh,
  Month: xh,
  MonthCaption: kh,
  MonthGrid: Ch,
  Months: Mh,
  MonthsDropdown: Sh,
  Nav: Th,
  NextMonthButton: Eh,
  Option: Dh,
  PreviousMonthButton: Nh,
  Root: Ah,
  Select: Rh,
  Week: Lh,
  WeekNumber: Oh,
  WeekNumberHeader: _h,
  Weekday: Ih,
  Weekdays: Ph,
  Weeks: $h,
  YearsDropdown: Hh
}, Symbol.toStringTag, { value: "Module" }));
function kt(e, t, n = !1, r = ut) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function Gc(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function ga(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function qc(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Xc(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Zc(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Qc(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Ct(e, t, n = ut) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (Qc(a, n))
      return a.includes(e);
    if (ga(a))
      return kt(a, e, !1, n);
    if (Zc(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (Gc(a)) {
      const c = s(a.before, e), l = s(a.after, e), d = c > 0, u = l < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return qc(a) ? s(e, a.after) > 0 : Xc(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function zh(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: d } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: g, endOfMonth: h, isAfter: y } = o, b = n && p(n), v = r && h(r), w = {
    [we.focused]: [],
    [we.outside]: [],
    [we.disabled]: [],
    [we.hidden]: [],
    [we.today]: []
  }, S = {};
  for (const x of e) {
    const { date: k, displayMonth: D } = x, C = !!(D && !f(k, D)), T = !!(b && g(k, b)), E = !!(v && y(k, v)), N = !!(s && Ct(k, s, o)), A = !!(i && Ct(k, i, o)) || T || E || // Broadcast calendar will show outside days as default
    !l && !c && C || l && c === !1 && C, P = u(k, d ?? o.today());
    C && w.outside.push(x), N && w.disabled.push(x), A && w.hidden.push(x), P && w.today.push(x), a && Object.keys(a).forEach((O) => {
      const $ = a?.[O];
      $ && Ct(k, $, o) && (S[O] ? S[O].push(x) : S[O] = [x]);
    });
  }
  return (x) => {
    const k = {
      [we.focused]: !1,
      [we.disabled]: !1,
      [we.hidden]: !1,
      [we.outside]: !1,
      [we.today]: !1
    }, D = {};
    for (const C in w) {
      const T = w[C];
      k[C] = T.some((E) => E === x);
    }
    for (const C in S)
      D[C] = S[C].some((T) => T === x);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function Bh(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[we[s]] ? o.push(t[we[s]]) : t[Qe[s]] && o.push(t[Qe[s]]), o), [t[oe.Day]]);
}
function Fh(e) {
  return {
    ...Wh,
    ...e
  };
}
function Uh(e) {
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
function ya() {
  const e = {};
  for (const t in oe)
    e[oe[t]] = `rdp-${oe[t]}`;
  for (const t in we)
    e[we[t]] = `rdp-${we[t]}`;
  for (const t in Qe)
    e[Qe[t]] = `rdp-${Qe[t]}`;
  for (const t in Ue)
    e[Ue[t]] = `rdp-${Ue[t]}`;
  return e;
}
function Jc(e, t, n) {
  return (n ?? new Ve(t)).formatMonthYear(e);
}
const Yh = Jc;
function jh(e, t, n) {
  return (n ?? new Ve(t)).format(e, "d");
}
function Vh(e, t = ut) {
  return t.format(e, "LLLL");
}
function Kh(e, t, n) {
  return (n ?? new Ve(t)).format(e, "cccccc");
}
function Gh(e, t = ut) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function qh() {
  return "";
}
function el(e, t = ut) {
  return t.format(e, "yyyy");
}
const Xh = el, Zh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Jc,
  formatDay: jh,
  formatMonthCaption: Yh,
  formatMonthDropdown: Vh,
  formatWeekNumber: Gh,
  formatWeekNumberHeader: qh,
  formatWeekdayName: Kh,
  formatYearCaption: Xh,
  formatYearDropdown: el
}, Symbol.toStringTag, { value: "Module" }));
function Qh(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Zh,
    ...e
  };
}
function Jh(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), g = l(f), h = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: p, disabled: h };
  });
}
function eg(e, t = {}, n = {}) {
  let r = { ...t?.[oe.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function tg(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function ng(e, t, n, r, o = !1) {
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
function tl(e, t, n, r) {
  let o = (r ?? new Ve(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const rg = tl;
function nl(e, t, n) {
  return (n ?? new Ve(t)).formatMonthYear(e);
}
const og = nl;
function sg(e, t, n, r) {
  let o = (r ?? new Ve(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function ag(e) {
  return "Choose the Month";
}
function ig() {
  return "";
}
function cg(e) {
  return "Go to the Next Month";
}
function lg(e) {
  return "Go to the Previous Month";
}
function dg(e, t, n) {
  return (n ?? new Ve(t)).format(e, "cccc");
}
function ug(e, t) {
  return `Week ${e}`;
}
function fg(e) {
  return "Week Number";
}
function mg(e) {
  return "Choose the Year";
}
const pg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: og,
  labelDay: rg,
  labelDayButton: tl,
  labelGrid: nl,
  labelGridcell: sg,
  labelMonthDropdown: ag,
  labelNav: ig,
  labelNext: cg,
  labelPrevious: lg,
  labelWeekNumber: ug,
  labelWeekNumberHeader: fg,
  labelWeekday: dg,
  labelYearDropdown: mg
}, Symbol.toStringTag, { value: "Module" })), hr = (e) => e instanceof HTMLElement ? e : null, rs = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], hg = (e) => hr(e.querySelector("[data-animated-month]")), os = (e) => hr(e.querySelector("[data-animated-caption]")), ss = (e) => hr(e.querySelector("[data-animated-weeks]")), gg = (e) => hr(e.querySelector("[data-animated-nav]")), yg = (e) => hr(e.querySelector("[data-animated-weekdays]"));
function vg(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = V(null), a = V(r), c = V(!1);
  bo(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const d = s.isSameMonth(r[0].date, l[0].date), u = s.isAfter(r[0].date, l[0].date), f = u ? n[Ue.caption_after_enter] : n[Ue.caption_before_enter], p = u ? n[Ue.weeks_after_enter] : n[Ue.weeks_before_enter], g = i.current, h = e.current.cloneNode(!0);
    if (h instanceof HTMLElement ? (rs(h).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const S = hg(w);
      S && w.contains(S) && w.removeChild(S);
      const x = os(w);
      x && x.classList.remove(f);
      const k = ss(w);
      k && k.classList.remove(p);
    }), i.current = h) : i.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = g instanceof HTMLElement ? rs(g) : [], b = rs(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && y && y.every((v) => v instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const v = gg(e.current);
      v && (v.style.zIndex = "1"), b.forEach((w, S) => {
        const x = y[S];
        if (!x)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const k = os(w);
        k && k.classList.add(f);
        const D = ss(w);
        D && D.classList.add(p);
        const C = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), k && k.classList.remove(f), D && D.classList.remove(p), w.style.position = "", w.style.overflow = "", w.contains(x) && w.removeChild(x);
        };
        x.style.pointerEvents = "none", x.style.position = "absolute", x.style.overflow = "hidden", x.setAttribute("aria-hidden", "true");
        const T = yg(x);
        T && (T.style.opacity = "0");
        const E = os(x);
        E && (E.classList.add(u ? n[Ue.caption_before_exit] : n[Ue.caption_after_exit]), E.addEventListener("animationend", C));
        const N = ss(x);
        N && N.classList.add(u ? n[Ue.weeks_before_exit] : n[Ue.weeks_after_exit]), w.insertBefore(x, w.firstChild);
      });
    }
  });
}
function bg(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: g, endOfWeek: h, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: w } = r, S = c ? b(o, r) : i ? v(o) : w(o), x = c ? f(s) : i ? p(g(s)) : h(g(s)), k = d(x, S), D = u(s, o) + 1, C = [];
  for (let N = 0; N <= k; N++) {
    const A = l(S, N);
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
function wg(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function xg(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function vi(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: d, startOfMonth: u } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = d(n, f);
  }
  return t && l(c, t) < 0 && (c = t), u(c);
}
function kg(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, g = e.reduce((h, y) => {
    const b = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? f(y) : p(y), v = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), w = t.filter((D) => D >= b && D <= v), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < S) {
      const D = t.filter((C) => {
        const T = S - w.length;
        return C > v && C <= o(v, T);
      });
      w.push(...D);
    }
    const x = w.reduce((D, C) => {
      const T = n.ISOWeek ? l(C) : d(C), E = D.find((A) => A.weekNumber === T), N = new Vc(C, y, r);
      return E ? E.days.push(N) : D.push(new fh(T, [N])), D;
    }, []), k = new uh(y, x);
    return h.push(k), h;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function Cg(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: d, today: u } = t, { fromYear: f, toYear: p, fromMonth: g, toMonth: h } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = d(f, 0, 1) : !n && y && (n = o(c(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = l(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function Mg(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, d = i(e);
  if (!t)
    return a(d, l);
  if (!(c(t, e) < s))
    return a(d, l);
}
function Sg(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -l);
  if (!(c(d, t) <= 0))
    return a(d, -l);
}
function Tg(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Co(e, t) {
  const [n, r] = j(e);
  return [t === void 0 ? n : t, r];
}
function Eg(e, t) {
  const [n, r] = Cg(e, t), { startOfMonth: o, endOfMonth: s } = t, i = vi(e, n, r, t), [a, c] = Co(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Q(() => {
    const k = vi(e, n, r, t);
    c(k);
  }, [e.timeZone]);
  const l = xg(a, r, e, t), d = bg(l, e.endMonth ? s(e.endMonth) : void 0, e, t), u = kg(l, d, e, t), f = Tg(u), p = wg(u), g = Sg(a, n, e, t), h = Mg(a, r, e, t), { disableNavigation: y, onMonthChange: b } = e, v = (k) => f.some((D) => D.days.some((C) => C.isEqualTo(k))), w = (k) => {
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
    goToMonth: w,
    goToDay: (k) => {
      v(k) || w(k.date);
    }
  };
}
var ot;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ot || (ot = {}));
function bi(e) {
  return !e[we.disabled] && !e[we.hidden] && !e[we.outside];
}
function Dg(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    bi(a) && (a[we.focused] && s < ot.FocusedModifier ? (o = i, s = ot.FocusedModifier) : r?.isEqualTo(i) && s < ot.LastFocused ? (o = i, s = ot.LastFocused) : n(i.date) && s < ot.Selected ? (o = i, s = ot.Selected) : a[we.today] && s < ot.Today && (o = i, s = ot.Today));
  }
  return o || (o = e.find((i) => bi(t(i)))), o;
}
function Ng(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: d, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: g, endOfWeek: h, max: y, min: b, startOfBroadcastWeek: v, startOfISOWeek: w, startOfWeek: S } = i;
  let k = {
    day: l,
    week: u,
    month: d,
    year: f,
    startOfWeek: (D) => c ? v(D, i) : a ? w(D) : S(D),
    endOfWeek: (D) => c ? p(D) : a ? g(D) : h(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = y([r, k]) : t === "after" && o && (k = b([o, k])), k;
}
function rl(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = Ng(e, t, n.date, r, o, s, i), l = !!(s.disabled && Ct(c, s.disabled, i)), d = !!(s.hidden && Ct(c, s.hidden, i)), u = c, f = new Vc(c, u, i);
  return !l && !d ? f : rl(e, t, f, r, o, s, i, a + 1);
}
function Ag(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = j(), c = Dg(t.days, n, r || (() => !1), i), [l, d] = j(s ? c : void 0);
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
      const b = rl(h, y, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(b)) || (t.goToDay(b), d(b)));
    }
  };
}
function Rg(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Co(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((g) => c(g, p)) ?? !1, { min: d, max: u } = e;
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
function Lg(e, t, n = 0, r = 0, o = !1, s = ut) {
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
function Ig(e, t, n = ut) {
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
function wi(e, t, n = ut) {
  return kt(e, t.from, !1, n) || kt(e, t.to, !1, n) || kt(t, e.from, !1, n) || kt(t, e.to, !1, n);
}
function Pg(e, t, n = ut) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? kt(e, a, !1, n) : Qc(a, n) ? a.some((c) => kt(e, c, !1, n)) : ga(a) ? a.from && a.to ? wi(e, { from: a.from, to: a.to }, n) : !1 : Zc(a) ? Ig(e, a.dayOfWeek, n) : Gc(a) ? n.isAfter(a.before, a.after) ? wi(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : Ct(e.from, a, n) || Ct(e.to, a, n) : qc(a) || Xc(a) ? Ct(e.from, a, n) || Ct(e.to, a, n) : !1))
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
function Og(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = Co(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, g) => {
      const { min: h, max: y } = e, b = f ? Lg(f, l, h, y, s, t) : void 0;
      return r && n && b?.from && b.to && Pg({ from: b.from, to: b.to }, n, t) && (b.from = f, b.to = void 0), i || c(b), i?.(b, f, p, g), b;
    },
    isSelected: (f) => l && kt(l, f, !1, t)
  };
}
function _g(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Co(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (u, f, p) => {
      let g = u;
      return !r && a && a && c(u, a) && (g = void 0), o || i(g), o?.(g, u, f, p), g;
    },
    isSelected: (u) => a ? c(a, u) : !1
  };
}
function $g(e, t) {
  const n = _g(e, t), r = Rg(e, t), o = Og(e, t);
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
function Hg(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Le(t.today, t.timeZone)), t.month && (t.month = new Le(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Le(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Le(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Le(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Le(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ae) => new Le(ae, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Le(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Le(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Jt(() => {
    const ae = { ...ha, ...t.locale };
    return {
      dateLib: new Ve({
        locale: ae,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Fh(t.components),
      formatters: Qh(t.formatters),
      labels: { ...pg, ...t.labels },
      locale: ae,
      classNames: { ...ya(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: d, numberOfMonths: u = 1, onDayBlur: f, onDayClick: p, onDayFocus: g, onDayKeyDown: h, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: v, onPrevClick: w, showWeekNumber: S, styles: x } = t, { formatCaption: k, formatDay: D, formatMonthDropdown: C, formatWeekNumber: T, formatWeekNumberHeader: E, formatWeekdayName: N, formatYearDropdown: A } = r, P = Eg(t, s), { days: O, months: $, navStart: B, navEnd: q, previousMonth: I, nextMonth: L, goToMonth: F } = P, X = zh(O, t, B, q, s), { isSelected: K, select: Z, selected: te } = $g(t, s) ?? {}, { blur: _, focused: z, isFocusTarget: Y, moveFocus: ee, setFocused: ue } = Ag(t, P, X, K ?? (() => !1), s), { labelDayButton: fe, labelGridcell: ke, labelGrid: Ne, labelMonthDropdown: Ke, labelNav: At, labelPrevious: Bn, labelNext: Fn, labelWeekday: xr, labelWeekNumber: kr, labelWeekNumberHeader: Cr, labelYearDropdown: Mr } = o, on = Jt(() => tg(s, t.ISOWeek), [s, t.ISOWeek]), Un = l !== void 0 || p !== void 0, sn = U(() => {
    I && (F(I), w?.(I));
  }, [I, F, w]), an = U(() => {
    L && (F(L), v?.(L));
  }, [F, L, v]), Sr = U((ae, be) => (se) => {
    se.preventDefault(), se.stopPropagation(), ue(ae), Z?.(ae.date, be, se), p?.(ae.date, be, se);
  }, [Z, p, ue]), $o = U((ae, be) => (se) => {
    ue(ae), g?.(ae.date, be, se);
  }, [g, ue]), Ho = U((ae, be) => (se) => {
    _(), f?.(ae.date, be, se);
  }, [_, f]), Wo = U((ae, be) => (se) => {
    const pe = {
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
    if (pe[se.key]) {
      se.preventDefault(), se.stopPropagation();
      const [_e, me] = pe[se.key];
      ee(_e, me);
    }
    h?.(ae.date, be, se);
  }, [ee, h, t.dir]), zo = U((ae, be) => (se) => {
    y?.(ae.date, be, se);
  }, [y]), Tr = U((ae, be) => (se) => {
    b?.(ae.date, be, se);
  }, [b]), Er = U((ae) => (be) => {
    const se = Number(be.target.value), pe = s.setMonth(s.startOfMonth(ae), se);
    F(pe);
  }, [s, F]), Bo = U((ae) => (be) => {
    const se = Number(be.target.value), pe = s.setYear(s.startOfMonth(ae), se);
    F(pe);
  }, [s, F]), { className: Dr, style: Yn } = Jt(() => ({
    className: [a[oe.Root], t.className].filter(Boolean).join(" "),
    style: { ...x?.[oe.Root], ...t.style }
  }), [a, t.className, t.style, x]), Fo = Uh(t), nt = V(null);
  vg(nt, !!t.animate, {
    classNames: a,
    months: $,
    focused: z,
    dateLib: s
  });
  const cn = {
    dayPickerProps: t,
    selected: te,
    select: Z,
    isSelected: K,
    months: $,
    nextMonth: L,
    previousMonth: I,
    goToMonth: F,
    getModifiers: X,
    components: n,
    classNames: a,
    styles: x,
    labels: o,
    formatters: r
  };
  return J.createElement(
    Kc.Provider,
    { value: cn },
    J.createElement(
      n.Root,
      { rootRef: t.animate ? nt : void 0, className: Dr, style: Yn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Fo },
      J.createElement(
        n.Months,
        { className: a[oe.Months], style: x?.[oe.Months] },
        !t.hideNavigation && !d && J.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: x?.[oe.Nav], "aria-label": At(), onPreviousClick: sn, onNextClick: an, previousMonth: I, nextMonth: L }),
        $.map((ae, be) => J.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[oe.Month],
            style: x?.[oe.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: be,
            displayIndex: be,
            calendarMonth: ae
          },
          d === "around" && !t.hideNavigation && be === 0 && J.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[oe.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Bn(I), onClick: sn, "data-animated-button": t.animate ? "true" : void 0 },
            J.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          J.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[oe.MonthCaption], style: x?.[oe.MonthCaption], calendarMonth: ae, displayIndex: be }, c?.startsWith("dropdown") ? J.createElement(
            n.DropdownNav,
            { className: a[oe.Dropdowns], style: x?.[oe.Dropdowns] },
            (() => {
              const se = c === "dropdown" || c === "dropdown-months" ? J.createElement(n.MonthsDropdown, { key: "month", className: a[oe.MonthsDropdown], "aria-label": Ke(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Er(ae.date), options: Jh(ae.date, B, q, r, s), style: x?.[oe.Dropdown], value: s.getMonth(ae.date) }) : J.createElement("span", { key: "month" }, C(ae.date, s)), pe = c === "dropdown" || c === "dropdown-years" ? J.createElement(n.YearsDropdown, { key: "year", className: a[oe.YearsDropdown], "aria-label": Mr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Bo(ae.date), options: ng(B, q, r, s, !!t.reverseYears), style: x?.[oe.Dropdown], value: s.getYear(ae.date) }) : J.createElement("span", { key: "year" }, A(ae.date, s));
              return s.getMonthYearOrder() === "year-first" ? [pe, se] : [se, pe];
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
            } }, k(ae.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            J.createElement(n.CaptionLabel, { className: a[oe.CaptionLabel], role: "status", "aria-live": "polite" }, k(ae.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && be === u - 1 && J.createElement(
            n.NextMonthButton,
            { type: "button", className: a[oe.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": Fn(L), onClick: an, "data-animated-button": t.animate ? "true" : void 0 },
            J.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          be === u - 1 && d === "after" && !t.hideNavigation && J.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: x?.[oe.Nav], "aria-label": At(), onPreviousClick: sn, onNextClick: an, previousMonth: I, nextMonth: L }),
          J.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": Ne(ae.date, s.options, s) || void 0, className: a[oe.MonthGrid], style: x?.[oe.MonthGrid] },
            !t.hideWeekdays && J.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[oe.Weekdays], style: x?.[oe.Weekdays] },
              S && J.createElement(n.WeekNumberHeader, { "aria-label": Cr(s.options), className: a[oe.WeekNumberHeader], style: x?.[oe.WeekNumberHeader], scope: "col" }, E()),
              on.map((se) => J.createElement(n.Weekday, { "aria-label": xr(se, s.options, s), className: a[oe.Weekday], key: String(se), style: x?.[oe.Weekday], scope: "col" }, N(se, s.options, s)))
            ),
            J.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[oe.Weeks], style: x?.[oe.Weeks] }, ae.weeks.map((se) => J.createElement(
              n.Week,
              { className: a[oe.Week], key: se.weekNumber, style: x?.[oe.Week], week: se },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              J.createElement(n.WeekNumber, { week: se, style: x?.[oe.WeekNumber], "aria-label": kr(se.weekNumber, {
                locale: i
              }), className: a[oe.WeekNumber], scope: "row", role: "rowheader" }, T(se.weekNumber, s)),
              se.days.map((pe) => {
                const { date: _e } = pe, me = X(pe);
                if (me[we.focused] = !me.hidden && !!z?.isEqualTo(pe), me[Qe.selected] = K?.(_e) || me.selected, ga(te)) {
                  const { from: pt, to: Vn } = te;
                  me[Qe.range_start] = !!(pt && Vn && s.isSameDay(_e, pt)), me[Qe.range_end] = !!(pt && Vn && s.isSameDay(_e, Vn)), me[Qe.range_middle] = kt(te, _e, !0, s);
                }
                const jn = eg(me, x, t.modifiersStyles), He = Bh(me, a, t.modifiersClassNames), mt = !Un && !me.hidden ? ke(_e, me, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  J.createElement(n.Day, { key: `${s.format(_e, "yyyy-MM-dd")}_${s.format(pe.displayMonth, "yyyy-MM")}`, day: pe, modifiers: me, className: He.join(" "), style: jn, role: "gridcell", "aria-selected": me.selected || void 0, "aria-label": mt, "data-day": s.format(_e, "yyyy-MM-dd"), "data-month": pe.outside ? s.format(_e, "yyyy-MM") : void 0, "data-selected": me.selected || void 0, "data-disabled": me.disabled || void 0, "data-hidden": me.hidden || void 0, "data-outside": pe.outside || void 0, "data-focused": me.focused || void 0, "data-today": me.today || void 0 }, !me.hidden && Un ? J.createElement(n.DayButton, { className: a[oe.DayButton], style: x?.[oe.DayButton], type: "button", day: pe, modifiers: me, disabled: me.disabled || void 0, tabIndex: Y(pe) ? 0 : -1, "aria-label": fe(_e, me, s.options, s), onClick: Sr(pe, me), onBlur: Ho(pe, me), onFocus: $o(pe, me), onKeyDown: Wo(pe, me), onMouseEnter: zo(pe, me), onMouseLeave: Tr(pe, me) }, D(_e, s.options, s)) : !me.hidden && D(pe.date, s.options, s))
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
function ol(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ol(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function sl() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ol(e)) && (r && (r += " "), r += t);
  return r;
}
const va = "-", Wg = (e) => {
  const t = Bg(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(va);
      return a[0] === "" && a.length !== 1 && a.shift(), al(a, t) || zg(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, al = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? al(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(va);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, xi = /^\[(.+)\]$/, zg = (e) => {
  if (xi.test(e)) {
    const t = xi.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Bg = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Rs(n[o], r, o, t);
  return r;
}, Rs = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : ki(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Fg(o)) {
        Rs(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Rs(i, ki(t, s), n, r);
    });
  });
}, ki = (e, t) => {
  let n = e;
  return t.split(va).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Fg = (e) => e.isThemeGetter, Ug = (e) => {
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
}, Ls = "!", Is = ":", Yg = Is.length, jg = (e) => {
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
        if (h === Is) {
          s.push(o.slice(c, g)), c = g + Yg;
          continue;
        }
        if (h === "/") {
          l = g;
          continue;
        }
      }
      h === "[" ? i++ : h === "]" ? i-- : h === "(" ? a++ : h === ")" && a--;
    }
    const d = s.length === 0 ? o : o.substring(c), u = Vg(d), f = u !== d, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: u,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + Is, s = r;
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
}, Vg = (e) => e.endsWith(Ls) ? e.substring(0, e.length - 1) : e.startsWith(Ls) ? e.substring(1) : e, Kg = (e) => {
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
}, Gg = (e) => ({
  cache: Ug(e.cacheSize),
  parseClassName: jg(e),
  sortModifiers: Kg(e),
  ...Wg(e)
}), qg = /\s+/, Xg = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(qg);
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
    const v = s(f).join(":"), w = p ? v + Ls : v, S = w + b;
    if (i.includes(S))
      continue;
    i.push(S);
    const x = o(b, y);
    for (let k = 0; k < x.length; ++k) {
      const D = x[k];
      i.push(w + D);
    }
    c = d + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Zg() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = il(t)) && (r && (r += " "), r += n);
  return r;
}
const il = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = il(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Qg(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((d, u) => u(d), e());
    return n = Gg(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const d = Xg(c, n);
    return o(c, d), d;
  }
  return function() {
    return s(Zg.apply(null, arguments));
  };
}
const Te = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, cl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ll = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Jg = /^\d+\/\d+$/, ey = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ty = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ny = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ry = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, oy = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, fn = (e) => Jg.test(e), le = (e) => !!e && !Number.isNaN(Number(e)), Ot = (e) => !!e && Number.isInteger(Number(e)), as = (e) => e.endsWith("%") && le(e.slice(0, -1)), bt = (e) => ey.test(e), sy = () => !0, ay = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ty.test(e) && !ny.test(e)
), dl = () => !1, iy = (e) => ry.test(e), cy = (e) => oy.test(e), ly = (e) => !ne(e) && !re(e), dy = (e) => _n(e, ml, dl), ne = (e) => cl.test(e), Kt = (e) => _n(e, pl, ay), is = (e) => _n(e, hy, le), Ci = (e) => _n(e, ul, dl), uy = (e) => _n(e, fl, cy), Wr = (e) => _n(e, hl, iy), re = (e) => ll.test(e), Zn = (e) => $n(e, pl), fy = (e) => $n(e, gy), Mi = (e) => $n(e, ul), my = (e) => $n(e, ml), py = (e) => $n(e, fl), zr = (e) => $n(e, hl, !0), _n = (e, t, n) => {
  const r = cl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, $n = (e, t, n = !1) => {
  const r = ll.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, ul = (e) => e === "position" || e === "percentage", fl = (e) => e === "image" || e === "url", ml = (e) => e === "length" || e === "size" || e === "bg-size", pl = (e) => e === "length", hy = (e) => e === "number", gy = (e) => e === "family-name", hl = (e) => e === "shadow", yy = () => {
  const e = Te("color"), t = Te("font"), n = Te("text"), r = Te("font-weight"), o = Te("tracking"), s = Te("leading"), i = Te("breakpoint"), a = Te("container"), c = Te("spacing"), l = Te("radius"), d = Te("shadow"), u = Te("inset-shadow"), f = Te("text-shadow"), p = Te("drop-shadow"), g = Te("blur"), h = Te("perspective"), y = Te("aspect"), b = Te("ease"), v = Te("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], x = () => [...S(), re, ne], k = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], C = () => [re, ne, c], T = () => [fn, "full", "auto", ...C()], E = () => [Ot, "none", "subgrid", re, ne], N = () => ["auto", {
    span: ["full", Ot, re, ne]
  }, Ot, re, ne], A = () => [Ot, "auto", re, ne], P = () => ["auto", "min", "max", "fr", re, ne], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], B = () => ["auto", ...C()], q = () => [fn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], I = () => [e, re, ne], L = () => [...S(), Mi, Ci, {
    position: [re, ne]
  }], F = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], X = () => ["auto", "cover", "contain", my, dy, {
    size: [re, ne]
  }], K = () => [as, Zn, Kt], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    re,
    ne
  ], te = () => ["", le, Zn, Kt], _ = () => ["solid", "dashed", "dotted", "double"], z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => [le, as, Mi, Ci], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    re,
    ne
  ], ue = () => ["none", le, re, ne], fe = () => ["none", le, re, ne], ke = () => [le, re, ne], Ne = () => [fn, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [bt],
      breakpoint: [bt],
      color: [sy],
      container: [bt],
      "drop-shadow": [bt],
      ease: ["in", "out", "in-out"],
      font: [ly],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [bt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [bt],
      shadow: [bt],
      spacing: ["px", le],
      text: [bt],
      "text-shadow": [bt],
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
        aspect: ["auto", "square", fn, ne, re, y]
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
        columns: [le, ne, re, a]
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
        z: [Ot, "auto", re, ne]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [fn, "full", "auto", a, ...C()]
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
        flex: [le, fn, "auto", "initial", "none", ne]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", le, re, ne]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", le, re, ne]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ot, "first", "last", "none", re, ne]
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
        text: ["base", n, Zn, Kt]
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
        font: [r, re, is]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", as, ne]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [fy, ne, t]
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
        "line-clamp": [le, "none", re, is]
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
        decoration: [..._(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [le, "from-font", "auto", re, Kt]
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
        "underline-offset": [le, "auto", re, ne]
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
          }, Ot, re, ne],
          radial: ["", re, ne],
          conic: [Ot, re, ne]
        }, py, uy]
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
        outline: [..._(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [le, re, ne]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", le, Zn, Kt]
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
          zr,
          Wr
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
        "inset-shadow": ["none", u, zr, Wr]
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
        "ring-offset": [le, Kt]
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
        "text-shadow": ["none", f, zr, Wr]
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
        opacity: [le, re, ne]
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
        "mask-linear": [le]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Y()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Y()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Y()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Y()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Y()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Y()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Y()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Y()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Y()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Y()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Y()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Y()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Y()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Y()
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
        "mask-radial-from": Y()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Y()
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
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [le]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Y()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Y()
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
        brightness: [le, re, ne]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [le, re, ne]
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
          zr,
          Wr
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
        grayscale: ["", le, re, ne]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [le, re, ne]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", le, re, ne]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [le, re, ne]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", le, re, ne]
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
        "backdrop-brightness": [le, re, ne]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [le, re, ne]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", le, re, ne]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [le, re, ne]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", le, re, ne]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [le, re, ne]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [le, re, ne]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", le, re, ne]
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
        duration: [le, "initial", re, ne]
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
        delay: [le, re, ne]
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
        "perspective-origin": x()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ue()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ue()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ue()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ue()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: fe()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": fe()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": fe()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": fe()
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
        skew: ke()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ke()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ke()
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
        translate: Ne()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Ne()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Ne()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Ne()
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
        stroke: [le, Zn, Kt, is]
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
}, vy = /* @__PURE__ */ Qg(yy);
function ie(...e) {
  return vy(sl(e));
}
function Si(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Mo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Si(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Si(e[o], null);
        }
      };
  };
}
function Ie(...e) {
  return M.useCallback(Mo(...e), e);
}
// @__NO_SIDE_EFFECTS__
function ir(e) {
  const t = /* @__PURE__ */ wy(e), n = M.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = M.Children.toArray(s), c = a.find(ky);
    if (c) {
      const l = c.props.children, d = a.map((u) => u === c ? M.Children.count(l) > 1 ? M.Children.only(null) : M.isValidElement(l) ? l.props.children : null : u);
      return /* @__PURE__ */ m(t, { ...i, ref: o, children: M.isValidElement(l) ? M.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var by = /* @__PURE__ */ ir("Slot");
// @__NO_SIDE_EFFECTS__
function wy(e) {
  const t = M.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (M.isValidElement(o)) {
      const i = My(o), a = Cy(s, o.props);
      return o.type !== M.Fragment && (a.ref = r ? Mo(r, i) : i), M.cloneElement(o, a);
    }
    return M.Children.count(o) > 1 ? M.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var gl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function xy(e) {
  const t = ({ children: n }) => /* @__PURE__ */ m(De, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = gl, t;
}
function ky(e) {
  return M.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === gl;
}
function Cy(e, t) {
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
function My(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const Ti = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ei = sl, Sy = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Ei(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const d = n?.[l], u = s?.[l];
    if (d === null) return null;
    const f = Ti(d) || Ti(u);
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
  return Ei(e, i, c, n?.class, n?.className);
}, Ps = Sy(
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
function Ht({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ m(
    r ? by : "button",
    {
      "data-slot": "button",
      className: ie(Ps({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function Ty({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const c = ya();
  return /* @__PURE__ */ m(
    Hg,
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
        formatMonthDropdown: (l) => l.toLocaleString("default", { month: "short" }),
        ...s
      },
      classNames: {
        root: ie("w-fit", c.root),
        months: ie(
          "flex gap-4 flex-col md:flex-row relative",
          c.months
        ),
        month: ie("flex flex-col w-full gap-4", c.month),
        nav: ie(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          c.nav
        ),
        button_previous: ie(
          Ps({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: ie(
          Ps({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_next
        ),
        month_caption: ie(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: ie(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          c.dropdowns
        ),
        dropdown_root: ie(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          c.dropdown_root
        ),
        dropdown: ie(
          "absolute bg-popover inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: ie(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: ie("flex", c.weekdays),
        weekday: ie(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          c.weekday
        ),
        week: ie("flex w-full mt-2", c.week),
        week_number_header: ie(
          "select-none w-(--cell-size)",
          c.week_number_header
        ),
        week_number: ie(
          "text-[0.8rem] select-none text-muted-foreground",
          c.week_number
        ),
        day: ie(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          c.day
        ),
        range_start: ie(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: ie("rounded-none", c.range_middle),
        range_end: ie("rounded-r-md bg-accent", c.range_end),
        today: ie(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: ie(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: ie(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: ie("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: l, rootRef: d, ...u }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: ie(l),
            ...u
          }
        ),
        Chevron: ({ className: l, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ m(hf, { className: ie("size-4", l), ...u }) : d === "right" ? /* @__PURE__ */ m(
          gf,
          {
            className: ie("size-4", l),
            ...u
          }
        ) : /* @__PURE__ */ m(yf, { className: ie("size-4", l), ...u }),
        DayButton: Ey,
        WeekNumber: ({ children: l, ...d }) => /* @__PURE__ */ m("td", { ...d, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function Ey({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = ya(), s = M.useRef(null);
  return M.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
    Ht,
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
let xn = null;
const yl = /* @__PURE__ */ new Map(), Dy = /* @__PURE__ */ new Map();
function Jr() {
  if (!xn) return;
  const e = xn;
  xn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Ny(e) {
  return xn?.pillDate === e;
}
function Ay({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = V(null), i = So(e);
  Q(() => {
    const v = (w) => {
      w.key === "Escape" && (w.stopPropagation(), w.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), Q(() => {
    const v = (S) => {
      s.current && !s.current.contains(S.target) && (S.target.closest(".date-pill") || o());
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const a = U((v) => {
    v && r(Cn(v)), o();
  }, [r, o]), c = U((v) => {
    const w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + v), r(Cn(w)), o();
  }, [r, o]), l = U(() => {
    const w = (/* @__PURE__ */ new Date()).getDay(), S = w === 0 ? 1 : 8 - w, x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + S), r(Cn(x)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), f = new Date(d);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), g = d.getDay(), h = g === 0 ? 1 : 8 - g, y = new Date(d);
  y.setDate(y.getDate() + h);
  const b = y.toDateString();
  return /* @__PURE__ */ R(
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
            Ty,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }),
          /* @__PURE__ */ R("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              Ht,
              {
                variant: "outline",
                size: "sm",
                className: ie(
                  "rounded-full text-xs",
                  i.toDateString() === u && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ m(
              Ht,
              {
                variant: "outline",
                size: "sm",
                className: ie(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => c(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ m(
              Ht,
              {
                variant: "outline",
                size: "sm",
                className: ie(
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
function Ry(e, t, n) {
  if (Ny(t)) {
    Jr();
    return;
  }
  Jr();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, d = s - r.bottom - c - l, u = r.top - c - l, f = d >= a ? "below" : u >= a ? "above" : d >= u ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + c : p = r.top - a - c;
  const g = r.left + r.width / 2;
  let h = g - i / 2;
  h + i > o - l && (h = o - i - l), h < l && (h = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((x) => {
    y.addEventListener(x, (k) => {
      k.stopPropagation();
    }, !1);
  });
  const v = em(y);
  xn = { container: y, root: v, pillDate: t };
  const w = () => {
    Jr();
  }, S = (x) => {
    const k = yl.get(t);
    k && k(x);
  };
  v.render(
    /* @__PURE__ */ m(
      Ay,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: h, direction: f, pillCenter: g },
        onSelectDate: S,
        onClose: w
      }
    )
  );
}
function Ly({ node: e, updateAttributes: t, selected: n }) {
  const r = V(null), o = e.attrs.date || kn(), s = vl(o), i = ba(o), a = U(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const d = c.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return Q(() => (yl.set(o, (c) => {
    t({ date: c });
  }), Dy.set(o, a), () => {
  }), [o, t, a]), Q(() => {
    const c = r.current;
    if (!c) return;
    const l = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = c.getAttribute("data-date") || kn(), f = a();
      Ry(c, u, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), Q(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      xn && Jr();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ m(En, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ m(kc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ m("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function So(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function kn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function rr(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function Cn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function vl(e) {
  const t = So(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function Iy(e) {
  return So(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function qt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return kn();
  if (n === "tomorrow") return rr(1);
  if (n === "yesterday") return rr(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return rr(c);
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
      return Cn(d);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return Cn(i);
  }
  return null;
}
function ba(e) {
  const t = So(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Py = new Oe("datePillPaste"), Oy = vo.create({
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
        default: kn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = vl(n), o = ba(n);
    return [
      "span",
      Rn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return yo(Ly, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || kn();
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
    const e = new We({
      find: /@today\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(kn()).run();
      }
    }), t = new We({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(rr(1)).run();
      }
    }), n = new We({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(rr(-1)).run();
      }
    }), r = new We({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), o = new We({
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
          u().deleteRange(d).insertDatePill(Cn(y)).run();
        }
      }
    }), s = new We({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = qt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), i = new We({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = qt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), a = new We({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), c = new We({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = qt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), l = new We({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = qt(f[1]);
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
      new Pe({
        key: Py,
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
              if (qt(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const h = new RegExp(i.source, i.flags);
            let y;
            for (; (y = h.exec(o)) !== null; ) {
              const S = y[1], x = qt(S);
              if (x) {
                const k = o.slice(g, y.index);
                k && p.push(f.text(k)), p.push(e.create({ date: x })), g = y.index + y[0].length;
              }
            }
            const b = o.slice(g);
            if (b && p.push(f.text(b)), p.length === 0) return !1;
            const v = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: w } = d.selection;
            if (w.parent.type.name === "paragraph") {
              const S = u;
              let x = d.selection.from;
              for (const k of p)
                S.insert(x, k), x += k.nodeSize;
              S.delete(d.selection.from, d.selection.to), t.dispatch(S);
            } else
              u.replaceSelectionWith(v), t.dispatch(u);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Ze = /* @__PURE__ */ new Map();
function _y({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = V(null), i = V(null), a = e.attrs.tag || "", c = V(!1), [l, d] = j(() => Ze.has(a)), [u, f] = j(() => Ze.get(a)?.value ?? a);
  Q(() => {
    l || f(a);
  }, [a, l]), Q(() => {
    if (l) {
      const v = Ze.get(a);
      Ze.set(a, {
        value: u,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [l, u, a]);
  const p = U((v) => {
    if (c.current) return;
    c.current = !0;
    const w = v.trim().replace(/^#/, ""), S = or(w);
    if (Ze.delete(a), S && Ze.delete(S), !S || !vn(S))
      o();
    else if (S !== a) {
      const x = r();
      if (typeof x == "number" && n) {
        const { tr: k } = n.state, D = e.nodeSize;
        k.delete(x, x + D), k.insert(x, n.schema.nodes.tagPill.create({ tag: S })), n.view.dispatch(k);
      }
    } else
      Ze.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), g = U(() => {
    n && !n.isEditable || (Ze.set(a, { value: a, focusedAt: Date.now() }), f(a), d(!0), c.current = !1);
  }, [n, a]);
  Q(() => {
    const v = s.current;
    if (!v || l) return;
    const w = (x) => {
      x.preventDefault(), x.stopPropagation(), g();
    }, S = (x) => {
      x.preventDefault(), x.stopPropagation();
    };
    return v.addEventListener("dblclick", w), v.addEventListener("click", S), () => {
      v.removeEventListener("dblclick", w), v.removeEventListener("click", S);
    };
  }, [l, n, r, g]), Q(() => {
    if (l) {
      const v = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const w = Ze.get(a);
          w && (w.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [l, a]);
  const h = U((v) => {
    v.key === "Enter" ? (v.preventDefault(), p(u)) : v.key === "Escape" && (v.preventDefault(), Ze.delete(a), d(!1), c.current = !0, n?.commands.focus());
  }, [p, u, a, n]), y = U(() => {
    const w = Ze.get(a)?.focusedAt ?? 0;
    Date.now() - w > 300 && p(u);
  }, [p, u, a]), b = U((v) => {
    f(v.target.value);
  }, []);
  return l ? /* @__PURE__ */ m(En, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Qa, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
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
  ) }) : /* @__PURE__ */ m(En, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Qa, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function vn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function or(e) {
  return e.toLowerCase().trim();
}
const $y = new Oe("tagPillPaste"), Hy = vo.create({
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
      Rn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return yo(_y, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = or(e);
        return vn(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new We({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = or(r[1]);
        if (vn(o)) {
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
      new Pe({
        key: $y,
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
              if (vn(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let g = 0;
            const h = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = h.exec(o)) !== null; ) {
              const w = or(y[1]);
              if (vn(w)) {
                const S = y[0], x = S.startsWith(" ") || S.startsWith(`
`) ? 1 : 0, k = o.slice(g, y.index + x);
                k && p.push(f.text(k)), p.push(e.create({ tag: w })), g = y.index + S.length;
              }
            }
            const b = o.slice(g);
            if (b && p.push(f.text(b)), p.length === 0) return !1;
            const { $from: v } = d.selection;
            if (v.parent.type.name === "paragraph") {
              const w = u;
              let S = d.selection.from;
              for (const x of p)
                w.insert(S, x), S += x.nodeSize;
              w.delete(d.selection.from, d.selection.to), t.dispatch(w);
            } else {
              const w = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
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
function bl({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = j(""), [i, a] = j(""), [c, l] = j(""), [d, u] = j(!1), f = V(null), p = V(null);
  Q(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), Q(() => {
    if (!e) return;
    const v = (x) => {
      p.current && !p.current.contains(x.target) && t();
    }, w = (x) => {
      x.key === "Escape" && t();
    }, S = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", w), () => {
      clearTimeout(S), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", w);
    };
  }, [e, t]);
  const g = (v) => {
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
            /* @__PURE__ */ m(ia, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(St, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ R("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ R("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(qs, { size: 12 }),
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
              /* @__PURE__ */ m(xo, { size: 12 }),
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
const Wy = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(xo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(vf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(bf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(wf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(xf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(kf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(na, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(ra, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(oa, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(ta, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(Cc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(Ss, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(ia, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ m(Mc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(oo, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(wc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(bc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(aa, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(sa, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(kc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(qs, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], zy = 32, By = 8, Fy = 320, Uy = 210, Br = 12;
function Di(e) {
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
function Yy({ editor: e }) {
  const [t, n] = j(!1), [r, o] = j(""), [s, i] = j(0), [a, c] = j(null), [l, d] = j(!1), [u, f] = j({ top: 0, left: 0 }), [p, g] = j("below"), h = V(null), y = V(-1), b = V(!1);
  Q(() => {
    b.current = t;
  }, [t]);
  const v = Wy.filter((T) => {
    if (!r) return !0;
    const E = r.toLowerCase();
    return T.title.toLowerCase().includes(E) || T.keywords?.some((N) => N.includes(E));
  }), w = Math.min(
    v.length * zy + By,
    Fy
  );
  bo(() => {
    if (!t || !a) return;
    const { top: T, bottom: E, left: N } = a, A = window.innerHeight, P = window.innerWidth, O = A - E - Br, $ = T - Br;
    let B;
    if (O >= w ? B = "below" : $ >= w ? B = "above" : B = O >= $ ? "below" : "above", g(B), h.current) {
      const q = Math.max(
        Br,
        Math.min(N, P - Uy - Br)
      ), I = B === "below" ? E + 4 : T - w - 4;
      h.current.style.top = `${I}px`, h.current.style.left = `${q}px`;
    }
  }, [t, a, w, v.length]);
  const S = U(() => {
    const { state: T } = e, { selection: E } = T, N = E.from, A = y.current;
    if (A >= 0 && A <= N)
      e.chain().focus().deleteRange({ from: A, to: N }).run();
    else {
      const { $from: P } = E, $ = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const B = P.pos - (P.parentOffset - $);
        e.chain().focus().deleteRange({ from: B, to: P.pos }).run();
      }
    }
  }, [e]), x = U(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), k = U((T) => {
    const E = v[T];
    if (E) {
      if (S(), E.isImageCommand) {
        const { state: N } = e, A = e.view.coordsAtPos(N.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), d(!0);
      } else
        E.command(e);
      x();
    }
  }, [e, v, S, x]), D = U((T, E) => {
    e.chain().focus().setImage({ src: T, alt: E }).run();
  }, [e]);
  return Q(() => {
    if (!e) return;
    const T = () => {
      if (b.current) return;
      const { state: E } = e, { selection: N } = E, { $from: A } = N;
      if (A.parentOffset === 0) return;
      const P = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = A.pos - 1;
      const $ = Di(e);
      $ && (c($), n(!0), o(""), i(0));
    };
    return e.on("update", T), () => {
      e.off("update", T);
    };
  }, [e]), Q(() => {
    if (!e || !t) return;
    const T = e.view.dom, E = (N) => {
      b.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A + 1) % v.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A - 1 + v.length) % v.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), k(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), x()));
    };
    return T.addEventListener("keydown", E, !0), () => {
      T.removeEventListener("keydown", E, !0);
    };
  }, [e, t, s, v, k, x]), Q(() => {
    if (!e || !t) return;
    const T = () => {
      if (!b.current || y.current < 0) return;
      const { state: E } = e, { selection: N } = E, A = N.from, P = y.current;
      if (A <= P) {
        x();
        return;
      }
      try {
        const O = E.doc.textBetween(P + 1, A, void 0, "￼");
        if (O.includes(`
`)) {
          x();
          return;
        }
        o(O), i(0);
        const $ = Di(e);
        $ && c($);
      } catch {
        x();
      }
    };
    return e.on("update", T), e.on("selectionUpdate", T), () => {
      e.off("update", T), e.off("selectionUpdate", T);
    };
  }, [e, t, x]), Q(() => {
    if (!t) return;
    const T = (E) => {
      h.current && !h.current.contains(E.target) && x();
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [t, x]), Q(() => {
    t && v.length === 0 && r.length > 2 && x();
  }, [t, v.length, r, x]), Q(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), Q(() => {
    if (!t || !h.current) return;
    const T = h.current.querySelector(".slash-item.is-selected");
    T && T.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ m(
    bl,
    {
      isOpen: l,
      onClose: () => d(!1),
      onInsert: D,
      position: u
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: h,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((T, E) => /* @__PURE__ */ R(
        "div",
        {
          className: `slash-item ${E === s ? "is-selected" : ""}`,
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation(), k(E);
          },
          onMouseEnter: () => i(E),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: T.icon }),
            /* @__PURE__ */ m("span", { className: "slash-label", children: T.title })
          ]
        },
        T.title
      ))
    }
  ) });
}
const jy = 340, Vy = 36, Ky = 8, Gy = 240, Fr = 8;
function Ni(e) {
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
function qy({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = j(!1), [s, i] = j(""), [a, c] = j([]), [l, d] = j(0), [u, f] = j(null), [p, g] = j("below"), [h, y] = j(!1), b = V(!1), v = V(null), w = V(-1), S = V(null);
  Q(() => {
    b.current = r;
  }, [r]);
  const x = U(() => {
    o(!1), i(""), c([]), d(0), w.current = -1;
  }, []), k = U((N) => {
    const A = w.current;
    if (A < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const $ = P.tr.delete(A, O), B = P.schema.marks.wikiLink;
      if (B) {
        const q = B.create({ pageName: N }), I = P.schema.text(N, [q]);
        $.insert(A, I);
        const L = A + N.length;
        $.setSelection(ct.create($.doc, L)), $.removeStoredMark(B);
      } else
        $.insertText(`[[${N}]]`, A);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
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
      const B = Ni(e);
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
          d(($) => Math.min($ + 1, O));
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
          const { state: O } = e, { $from: $ } = O.selection;
          $.parent.textBetween(0, $.parentOffset, void 0, "￼").endsWith("]]") && x();
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
        const $ = P.doc.textBetween(A + 2, O, void 0, "￼");
        if ($.includes(`
`) || $.includes("]]")) {
          x();
          return;
        }
        i($), d(0);
        const B = Ni(e);
        B && f(B);
      } catch {
        x();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, x]), Q(() => {
    if (r) {
      if (S.current && clearTimeout(S.current), !s.trim()) {
        y(!0), S.current = setTimeout(async () => {
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
      return y(!0), S.current = setTimeout(async () => {
        try {
          const N = await t(s.trim());
          c(N);
        } catch {
          c([]);
        }
        y(!1);
      }, 150), () => {
        S.current && clearTimeout(S.current);
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
    Math.max(D, 1) * Vy + Ky,
    Gy
  );
  if (bo(() => {
    if (!r || !u) return;
    const { top: N, bottom: A, left: P } = u, O = window.innerHeight, $ = window.innerWidth, B = O - A - Fr, q = N - Fr;
    let I;
    if (B >= C ? I = "below" : q >= C ? I = "above" : I = B >= q ? "below" : "above", g(I), v.current) {
      const L = Math.max(
        Fr,
        Math.min(P, $ - jy - Fr)
      ), F = I === "below" ? A + 4 : N - C - 4;
      v.current.style.top = `${F}px`, v.current.style.left = `${L}px`;
    }
  }, [r, u, C, D]), !r) return null;
  const T = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ R(
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
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(ca, { size: 14 }) }),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        T && /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), x()) : k(s.trim());
            },
            onMouseEnter: () => d(a.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(la, { size: 14 }) }),
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
function ce(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Hn(e, t = []) {
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
  return o.scopeName = e, [r, Xy(o, ...t)];
}
function Xy(...e) {
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
var zt = globalThis?.document ? M.useLayoutEffect : () => {
}, Zy = M[" useInsertionEffect ".trim().toString()] || zt;
function wa({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = Qy({
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
        const u = Jy(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function Qy({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = M.useState(e), o = M.useRef(n), s = M.useRef(t);
  return Zy(() => {
    s.current = t;
  }, [t]), M.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Jy(e) {
  return typeof e == "function";
}
var ev = [
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
], Re = ev.reduce((e, t) => {
  const n = /* @__PURE__ */ ir(`Primitive.${t}`), r = M.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function wl(e, t) {
  e && Ac.flushSync(() => e.dispatchEvent(t));
}
function xl(e) {
  const t = e + "CollectionProvider", [n, r] = Hn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (h) => {
    const { scope: y, children: b } = h, v = J.useRef(null), w = J.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: y, itemMap: w, collectionRef: v, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ ir(a), l = J.forwardRef(
    (h, y) => {
      const { scope: b, children: v } = h, w = s(a, b), S = Ie(y, w.collectionRef);
      return /* @__PURE__ */ m(c, { ref: S, children: v });
    }
  );
  l.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = /* @__PURE__ */ ir(d), p = J.forwardRef(
    (h, y) => {
      const { scope: b, children: v, ...w } = h, S = J.useRef(null), x = Ie(y, S), k = s(d, b);
      return J.useEffect(() => (k.itemMap.set(S, { ref: S, ...w }), () => void k.itemMap.delete(S))), /* @__PURE__ */ m(f, { [u]: "", ref: x, children: v });
    }
  );
  p.displayName = d;
  function g(h) {
    const y = s(e + "CollectionConsumer", h);
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
    g,
    r
  ];
}
var tv = M.createContext(void 0);
function kl(e) {
  const t = M.useContext(tv);
  return e || t || "ltr";
}
function Tt(e) {
  const t = M.useRef(e);
  return M.useEffect(() => {
    t.current = e;
  }), M.useMemo(() => (...n) => t.current?.(...n), []);
}
function nv(e, t = globalThis?.document) {
  const n = Tt(e);
  M.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var rv = "DismissableLayer", Os = "dismissableLayer.update", ov = "dismissableLayer.pointerDownOutside", sv = "dismissableLayer.focusOutside", Ai, Cl = M.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), xa = M.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = M.useContext(Cl), [d, u] = M.useState(null), f = d?.ownerDocument ?? globalThis?.document, [, p] = M.useState({}), g = Ie(t, (D) => u(D)), h = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = h.indexOf(y), v = d ? h.indexOf(d) : -1, w = l.layersWithOutsidePointerEventsDisabled.size > 0, S = v >= b, x = cv((D) => {
      const C = D.target, T = [...l.branches].some((E) => E.contains(C));
      !S || T || (o?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f), k = lv((D) => {
      const C = D.target;
      [...l.branches].some((E) => E.contains(C)) || (s?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f);
    return nv((D) => {
      v === l.layers.size - 1 && (r?.(D), !D.defaultPrevented && a && (D.preventDefault(), a()));
    }, f), M.useEffect(() => {
      if (d)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Ai = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), Ri(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Ai);
        };
    }, [d, f, n, l]), M.useEffect(() => () => {
      d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), Ri());
    }, [d, l]), M.useEffect(() => {
      const D = () => p({});
      return document.addEventListener(Os, D), () => document.removeEventListener(Os, D);
    }, []), /* @__PURE__ */ m(
      Re.div,
      {
        ...c,
        ref: g,
        style: {
          pointerEvents: w ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ce(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: ce(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: ce(
          e.onPointerDownCapture,
          x.onPointerDownCapture
        )
      }
    );
  }
);
xa.displayName = rv;
var av = "DismissableLayerBranch", iv = M.forwardRef((e, t) => {
  const n = M.useContext(Cl), r = M.useRef(null), o = Ie(t, r);
  return M.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ m(Re.div, { ...e, ref: o });
});
iv.displayName = av;
function cv(e, t = globalThis?.document) {
  const n = Tt(e), r = M.useRef(!1), o = M.useRef(() => {
  });
  return M.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          Ml(
            ov,
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
function lv(e, t = globalThis?.document) {
  const n = Tt(e), r = M.useRef(!1);
  return M.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Ml(sv, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ri() {
  const e = new CustomEvent(Os);
  document.dispatchEvent(e);
}
function Ml(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? wl(o, s) : o.dispatchEvent(s);
}
var cs = 0;
function dv() {
  M.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Li()), document.body.insertAdjacentElement("beforeend", e[1] ?? Li()), cs++, () => {
      cs === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), cs--;
    };
  }, []);
}
function Li() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ls = "focusScope.autoFocusOnMount", ds = "focusScope.autoFocusOnUnmount", Ii = { bubbles: !1, cancelable: !0 }, uv = "FocusScope", Sl = M.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = M.useState(null), l = Tt(o), d = Tt(s), u = M.useRef(null), f = Ie(t, (h) => c(h)), p = M.useRef({
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
      let h = function(w) {
        if (p.paused || !a) return;
        const S = w.target;
        a.contains(S) ? u.current = S : $t(u.current, { select: !0 });
      }, y = function(w) {
        if (p.paused || !a) return;
        const S = w.relatedTarget;
        S !== null && (a.contains(S) || $t(u.current, { select: !0 }));
      }, b = function(w) {
        if (document.activeElement === document.body)
          for (const x of w)
            x.removedNodes.length > 0 && $t(a);
      };
      document.addEventListener("focusin", h), document.addEventListener("focusout", y);
      const v = new MutationObserver(b);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", h), document.removeEventListener("focusout", y), v.disconnect();
      };
    }
  }, [r, a, p.paused]), M.useEffect(() => {
    if (a) {
      Oi.add(p);
      const h = document.activeElement;
      if (!a.contains(h)) {
        const b = new CustomEvent(ls, Ii);
        a.addEventListener(ls, l), a.dispatchEvent(b), b.defaultPrevented || (fv(yv(Tl(a)), { select: !0 }), document.activeElement === h && $t(a));
      }
      return () => {
        a.removeEventListener(ls, l), setTimeout(() => {
          const b = new CustomEvent(ds, Ii);
          a.addEventListener(ds, d), a.dispatchEvent(b), b.defaultPrevented || $t(h ?? document.body, { select: !0 }), a.removeEventListener(ds, d), Oi.remove(p);
        }, 0);
      };
    }
  }, [a, l, d, p]);
  const g = M.useCallback(
    (h) => {
      if (!n && !r || p.paused) return;
      const y = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey, b = document.activeElement;
      if (y && b) {
        const v = h.currentTarget, [w, S] = mv(v);
        w && S ? !h.shiftKey && b === S ? (h.preventDefault(), n && $t(w, { select: !0 })) : h.shiftKey && b === w && (h.preventDefault(), n && $t(S, { select: !0 })) : b === v && h.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ m(Re.div, { tabIndex: -1, ...i, ref: f, onKeyDown: g });
});
Sl.displayName = uv;
function fv(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ($t(r, { select: t }), document.activeElement !== n) return;
}
function mv(e) {
  const t = Tl(e), n = Pi(t, e), r = Pi(t.reverse(), e);
  return [n, r];
}
function Tl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Pi(e, t) {
  for (const n of e)
    if (!pv(n, { upTo: t })) return n;
}
function pv(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function hv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function $t(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && hv(e) && t && e.select();
  }
}
var Oi = gv();
function gv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = _i(e, t), e.unshift(t);
    },
    remove(t) {
      e = _i(e, t), e[0]?.resume();
    }
  };
}
function _i(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function yv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var vv = M[" useId ".trim().toString()] || (() => {
}), bv = 0;
function so(e) {
  const [t, n] = M.useState(vv());
  return zt(() => {
    n((r) => r ?? String(bv++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const wv = ["top", "right", "bottom", "left"], Bt = Math.min, Ye = Math.max, ao = Math.round, Ur = Math.floor, lt = (e) => ({
  x: e,
  y: e
}), xv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, kv = {
  start: "end",
  end: "start"
};
function _s(e, t, n) {
  return Ye(e, Bt(t, n));
}
function Et(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Dt(e) {
  return e.split("-")[0];
}
function Wn(e) {
  return e.split("-")[1];
}
function ka(e) {
  return e === "x" ? "y" : "x";
}
function Ca(e) {
  return e === "y" ? "height" : "width";
}
const Cv = /* @__PURE__ */ new Set(["top", "bottom"]);
function it(e) {
  return Cv.has(Dt(e)) ? "y" : "x";
}
function Ma(e) {
  return ka(it(e));
}
function Mv(e, t, n) {
  n === void 0 && (n = !1);
  const r = Wn(e), o = Ma(e), s = Ca(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = io(i)), [i, io(i)];
}
function Sv(e) {
  const t = io(e);
  return [$s(e), t, $s(t)];
}
function $s(e) {
  return e.replace(/start|end/g, (t) => kv[t]);
}
const $i = ["left", "right"], Hi = ["right", "left"], Tv = ["top", "bottom"], Ev = ["bottom", "top"];
function Dv(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Hi : $i : t ? $i : Hi;
    case "left":
    case "right":
      return t ? Tv : Ev;
    default:
      return [];
  }
}
function Nv(e, t, n, r) {
  const o = Wn(e);
  let s = Dv(Dt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map($s)))), s;
}
function io(e) {
  return e.replace(/left|right|bottom|top/g, (t) => xv[t]);
}
function Av(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function El(e) {
  return typeof e != "number" ? Av(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function co(e) {
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
function Wi(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = it(t), i = Ma(t), a = Ca(i), c = Dt(t), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
  switch (Wn(t)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const Rv = async (e, t, n) => {
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
  } = Wi(l, r, c), f = r, p = {}, g = 0;
  for (let h = 0; h < a.length; h++) {
    const {
      name: y,
      fn: b
    } = a[h], {
      x: v,
      y: w,
      data: S,
      reset: x
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
    d = v ?? d, u = w ?? u, p = {
      ...p,
      [y]: {
        ...p[y],
        ...S
      }
    }, x && g <= 50 && (g++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : x.rects), {
      x: d,
      y: u
    } = Wi(l, f, c)), h = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function cr(e, t) {
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
  } = Et(t, e), g = El(p), y = a[f ? u === "floating" ? "reference" : "floating" : u], b = co(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: c
  })), v = u === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), S = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = co(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: v,
    offsetParent: w,
    strategy: c
  }) : v);
  return {
    top: (b.top - x.top + g.top) / S.y,
    bottom: (x.bottom - b.bottom + g.bottom) / S.y,
    left: (b.left - x.left + g.left) / S.x,
    right: (x.right - b.right + g.right) / S.x
  };
}
const Lv = (e) => ({
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
    } = Et(e, t) || {};
    if (l == null)
      return {};
    const u = El(d), f = {
      x: n,
      y: r
    }, p = Ma(o), g = Ca(p), h = await i.getDimensions(l), y = p === "y", b = y ? "top" : "left", v = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", S = s.reference[g] + s.reference[p] - f[p] - s.floating[g], x = f[p] - s.reference[p], k = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let D = k ? k[w] : 0;
    (!D || !await (i.isElement == null ? void 0 : i.isElement(k))) && (D = a.floating[w] || s.floating[g]);
    const C = S / 2 - x / 2, T = D / 2 - h[g] / 2 - 1, E = Bt(u[b], T), N = Bt(u[v], T), A = E, P = D - h[g] - N, O = D / 2 - h[g] / 2 + C, $ = _s(A, O, P), B = !c.arrow && Wn(o) != null && O !== $ && s.reference[g] / 2 - (O < A ? E : N) - h[g] / 2 < 0, q = B ? O < A ? O - A : O - P : 0;
    return {
      [p]: f[p] + q,
      data: {
        [p]: $,
        centerOffset: O - $ - q,
        ...B && {
          alignmentOffset: q
        }
      },
      reset: B
    };
  }
}), Iv = function(e) {
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
      } = Et(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = Dt(o), v = it(a), w = Dt(a) === a, S = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), x = f || (w || !h ? [io(a)] : Sv(a)), k = g !== "none";
      !f && k && x.push(...Nv(a, h, g, S));
      const D = [a, ...x], C = await cr(t, y), T = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && T.push(C[b]), u) {
        const O = Mv(o, i, S);
        T.push(C[O[0]], C[O[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: T
      }], !T.every((O) => O <= 0)) {
        var N, A;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, $ = D[O];
        if ($ && (!(u === "alignment" ? v !== it($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        E.every((I) => it(I.placement) === v ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: E
            },
            reset: {
              placement: $
            }
          };
        let B = (A = E.filter((q) => q.overflows[0] <= 0).sort((q, I) => q.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!B)
          switch (p) {
            case "bestFit": {
              var P;
              const q = (P = E.filter((I) => {
                if (k) {
                  const L = it(I.placement);
                  return L === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((L) => L > 0).reduce((L, F) => L + F, 0)]).sort((I, L) => I[1] - L[1])[0]) == null ? void 0 : P[0];
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
function zi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Bi(e) {
  return wv.some((t) => e[t] >= 0);
}
const Pv = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Et(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await cr(t, {
            ...o,
            elementContext: "reference"
          }), i = zi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Bi(i)
            }
          };
        }
        case "escaped": {
          const s = await cr(t, {
            ...o,
            altBoundary: !0
          }), i = zi(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Bi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Dl = /* @__PURE__ */ new Set(["left", "top"]);
async function Ov(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Dt(n), a = Wn(n), c = it(n) === "y", l = Dl.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = Et(t, e);
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
const _v = function(e) {
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
      } = t, c = await Ov(t, e);
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
}, $v = function(e) {
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
      } = Et(e, t), l = {
        x: n,
        y: r
      }, d = await cr(t, c), u = it(Dt(o)), f = ka(u);
      let p = l[f], g = l[u];
      if (s) {
        const y = f === "y" ? "top" : "left", b = f === "y" ? "bottom" : "right", v = p + d[y], w = p - d[b];
        p = _s(v, p, w);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", b = u === "y" ? "bottom" : "right", v = g + d[y], w = g - d[b];
        g = _s(v, g, w);
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
}, Hv = function(e) {
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
      } = Et(e, t), d = {
        x: n,
        y: r
      }, u = it(o), f = ka(u);
      let p = d[f], g = d[u];
      const h = Et(a, t), y = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const w = f === "y" ? "height" : "width", S = s.reference[f] - s.floating[w] + y.mainAxis, x = s.reference[f] + s.reference[w] - y.mainAxis;
        p < S ? p = S : p > x && (p = x);
      }
      if (l) {
        var b, v;
        const w = f === "y" ? "width" : "height", S = Dl.has(Dt(o)), x = s.reference[u] - s.floating[w] + (S && ((b = i.offset) == null ? void 0 : b[u]) || 0) + (S ? 0 : y.crossAxis), k = s.reference[u] + s.reference[w] + (S ? 0 : ((v = i.offset) == null ? void 0 : v[u]) || 0) - (S ? y.crossAxis : 0);
        g < x ? g = x : g > k && (g = k);
      }
      return {
        [f]: p,
        [u]: g
      };
    }
  };
}, Wv = function(e) {
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
      } = Et(e, t), d = await cr(t, l), u = Dt(o), f = Wn(o), p = it(o) === "y", {
        width: g,
        height: h
      } = s.floating;
      let y, b;
      u === "top" || u === "bottom" ? (y = u, b = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = u, y = f === "end" ? "top" : "bottom");
      const v = h - d.top - d.bottom, w = g - d.left - d.right, S = Bt(h - d[y], v), x = Bt(g - d[b], w), k = !t.middlewareData.shift;
      let D = S, C = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (C = w), (r = t.middlewareData.shift) != null && r.enabled.y && (D = v), k && !f) {
        const E = Ye(d.left, 0), N = Ye(d.right, 0), A = Ye(d.top, 0), P = Ye(d.bottom, 0);
        p ? C = g - 2 * (E !== 0 || N !== 0 ? E + N : Ye(d.left, d.right)) : D = h - 2 * (A !== 0 || P !== 0 ? A + P : Ye(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: C,
        availableHeight: D
      });
      const T = await i.getDimensions(a.floating);
      return g !== T.width || h !== T.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function To() {
  return typeof window < "u";
}
function zn(e) {
  return Nl(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function je(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ft(e) {
  var t;
  return (t = (Nl(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Nl(e) {
  return To() ? e instanceof Node || e instanceof je(e).Node : !1;
}
function Je(e) {
  return To() ? e instanceof Element || e instanceof je(e).Element : !1;
}
function dt(e) {
  return To() ? e instanceof HTMLElement || e instanceof je(e).HTMLElement : !1;
}
function Fi(e) {
  return !To() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof je(e).ShadowRoot;
}
const zv = /* @__PURE__ */ new Set(["inline", "contents"]);
function gr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = et(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !zv.has(o);
}
const Bv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Fv(e) {
  return Bv.has(zn(e));
}
const Uv = [":popover-open", ":modal"];
function Eo(e) {
  return Uv.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Yv = ["transform", "translate", "scale", "rotate", "perspective"], jv = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Vv = ["paint", "layout", "strict", "content"];
function Sa(e) {
  const t = Ta(), n = Je(e) ? et(e) : e;
  return Yv.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || jv.some((r) => (n.willChange || "").includes(r)) || Vv.some((r) => (n.contain || "").includes(r));
}
function Kv(e) {
  let t = Ft(e);
  for (; dt(t) && !Nn(t); ) {
    if (Sa(t))
      return t;
    if (Eo(t))
      return null;
    t = Ft(t);
  }
  return null;
}
function Ta() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Gv = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Nn(e) {
  return Gv.has(zn(e));
}
function et(e) {
  return je(e).getComputedStyle(e);
}
function Do(e) {
  return Je(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Ft(e) {
  if (zn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Fi(e) && e.host || // Fallback.
    ft(e)
  );
  return Fi(t) ? t.host : t;
}
function Al(e) {
  const t = Ft(e);
  return Nn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : dt(t) && gr(t) ? t : Al(t);
}
function lr(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Al(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = je(o);
  if (s) {
    const a = Hs(i);
    return t.concat(i, i.visualViewport || [], gr(o) ? o : [], a && n ? lr(a) : []);
  }
  return t.concat(o, lr(o, [], n));
}
function Hs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Rl(e) {
  const t = et(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = dt(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = ao(n) !== s || ao(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function Ea(e) {
  return Je(e) ? e : e.contextElement;
}
function Mn(e) {
  const t = Ea(e);
  if (!dt(t))
    return lt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Rl(t);
  let i = (s ? ao(n.width) : n.width) / r, a = (s ? ao(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const qv = /* @__PURE__ */ lt(0);
function Ll(e) {
  const t = je(e);
  return !Ta() || !t.visualViewport ? qv : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Xv(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== je(e) ? !1 : t;
}
function en(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = Ea(e);
  let i = lt(1);
  t && (r ? Je(r) && (i = Mn(r)) : i = Mn(e));
  const a = Xv(s, n, r) ? Ll(s) : lt(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = je(s), p = r && Je(r) ? je(r) : r;
    let g = f, h = Hs(g);
    for (; h && r && p !== g; ) {
      const y = Mn(h), b = h.getBoundingClientRect(), v = et(h), w = b.left + (h.clientLeft + parseFloat(v.paddingLeft)) * y.x, S = b.top + (h.clientTop + parseFloat(v.paddingTop)) * y.y;
      c *= y.x, l *= y.y, d *= y.x, u *= y.y, c += w, l += S, g = je(h), h = Hs(g);
    }
  }
  return co({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function No(e, t) {
  const n = Do(e).scrollLeft;
  return t ? t.left + n : en(ft(e)).left + n;
}
function Il(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - No(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Zv(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = ft(r), a = t ? Eo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = lt(1);
  const d = lt(0), u = dt(r);
  if ((u || !u && !s) && ((zn(r) !== "body" || gr(i)) && (c = Do(r)), dt(r))) {
    const p = en(r);
    l = Mn(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? Il(i, c) : lt(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + f.y
  };
}
function Qv(e) {
  return Array.from(e.getClientRects());
}
function Jv(e) {
  const t = ft(e), n = Do(e), r = e.ownerDocument.body, o = Ye(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Ye(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + No(e);
  const a = -n.scrollTop;
  return et(r).direction === "rtl" && (i += Ye(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const Ui = 25;
function eb(e, t) {
  const n = je(e), r = ft(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = Ta();
    (!d || d && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = No(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(r.clientWidth - u.clientWidth - p);
    g <= Ui && (s -= g);
  } else l <= Ui && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const tb = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function nb(e, t) {
  const n = en(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = dt(e) ? Mn(e) : lt(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function Yi(e, t, n) {
  let r;
  if (t === "viewport")
    r = eb(e, n);
  else if (t === "document")
    r = Jv(ft(e));
  else if (Je(t))
    r = nb(t, n);
  else {
    const o = Ll(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return co(r);
}
function Pl(e, t) {
  const n = Ft(e);
  return n === t || !Je(n) || Nn(n) ? !1 : et(n).position === "fixed" || Pl(n, t);
}
function rb(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = lr(e, [], !1).filter((a) => Je(a) && zn(a) !== "body"), o = null;
  const s = et(e).position === "fixed";
  let i = s ? Ft(e) : e;
  for (; Je(i) && !Nn(i); ) {
    const a = et(i), c = Sa(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && tb.has(o.position) || gr(i) && !c && Pl(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = Ft(i);
  }
  return t.set(e, r), r;
}
function ob(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? Eo(t) ? [] : rb(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, d) => {
    const u = Yi(t, d, o);
    return l.top = Ye(u.top, l.top), l.right = Bt(u.right, l.right), l.bottom = Bt(u.bottom, l.bottom), l.left = Ye(u.left, l.left), l;
  }, Yi(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function sb(e) {
  const {
    width: t,
    height: n
  } = Rl(e);
  return {
    width: t,
    height: n
  };
}
function ab(e, t, n) {
  const r = dt(t), o = ft(t), s = n === "fixed", i = en(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = lt(0);
  function l() {
    c.x = No(o);
  }
  if (r || !r && !s)
    if ((zn(t) !== "body" || gr(o)) && (a = Do(t)), r) {
      const p = en(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? Il(o, a) : lt(0), u = i.left + a.scrollLeft - c.x - d.x, f = i.top + a.scrollTop - c.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function us(e) {
  return et(e).position === "static";
}
function ji(e, t) {
  if (!dt(e) || et(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return ft(e) === n && (n = n.ownerDocument.body), n;
}
function Ol(e, t) {
  const n = je(e);
  if (Eo(e))
    return n;
  if (!dt(e)) {
    let o = Ft(e);
    for (; o && !Nn(o); ) {
      if (Je(o) && !us(o))
        return o;
      o = Ft(o);
    }
    return n;
  }
  let r = ji(e, t);
  for (; r && Fv(r) && us(r); )
    r = ji(r, t);
  return r && Nn(r) && us(r) && !Sa(r) ? n : r || Kv(e) || n;
}
const ib = async function(e) {
  const t = this.getOffsetParent || Ol, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: ab(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function cb(e) {
  return et(e).direction === "rtl";
}
const lb = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Zv,
  getDocumentElement: ft,
  getClippingRect: ob,
  getOffsetParent: Ol,
  getElementRects: ib,
  getClientRects: Qv,
  getDimensions: sb,
  getScale: Mn,
  isElement: Je,
  isRTL: cb
};
function _l(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function db(e, t) {
  let n = null, r;
  const o = ft(e);
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
    const g = Ur(u), h = Ur(o.clientWidth - (d + f)), y = Ur(o.clientHeight - (u + p)), b = Ur(d), w = {
      rootMargin: -g + "px " + -h + "px " + -y + "px " + -b + "px",
      threshold: Ye(0, Bt(1, c)) || 1
    };
    let S = !0;
    function x(k) {
      const D = k[0].intersectionRatio;
      if (D !== c) {
        if (!S)
          return i();
        D ? i(!1, D) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !_l(l, e.getBoundingClientRect()) && i(), S = !1;
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
function ub(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Ea(e), d = o || s ? [...l ? lr(l) : [], ...lr(t)] : [];
  d.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const u = l && a ? db(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = p) == null || w.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let g, h = c ? en(e) : null;
  c && y();
  function y() {
    const b = en(e);
    h && !_l(h, b) && n(), h = b, g = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    d.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), u?.(), (b = p) == null || b.disconnect(), p = null, c && cancelAnimationFrame(g);
  };
}
const fb = _v, mb = $v, pb = Iv, hb = Wv, gb = Pv, Vi = Lv, yb = Hv, vb = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: lb,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Rv(e, t, {
    ...o,
    platform: s
  });
};
var bb = typeof document < "u", wb = function() {
}, eo = bb ? bo : wb;
function lo(e, t) {
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
        if (!lo(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !lo(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function $l(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ki(e, t) {
  const n = $l(e);
  return Math.round(t * n) / n;
}
function fs(e) {
  const t = M.useRef(e);
  return eo(() => {
    t.current = e;
  }), t;
}
function xb(e) {
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
  lo(f, r) || p(r);
  const [g, h] = M.useState(null), [y, b] = M.useState(null), v = M.useCallback((I) => {
    I !== k.current && (k.current = I, h(I));
  }, []), w = M.useCallback((I) => {
    I !== D.current && (D.current = I, b(I));
  }, []), S = s || g, x = i || y, k = M.useRef(null), D = M.useRef(null), C = M.useRef(d), T = c != null, E = fs(c), N = fs(o), A = fs(l), P = M.useCallback(() => {
    if (!k.current || !D.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    N.current && (I.platform = N.current), vb(k.current, D.current, I).then((L) => {
      const F = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      O.current && !lo(C.current, F) && (C.current = F, Ac.flushSync(() => {
        u(F);
      }));
    });
  }, [f, t, n, N, A]);
  eo(() => {
    l === !1 && C.current.isPositioned && (C.current.isPositioned = !1, u((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const O = M.useRef(!1);
  eo(() => (O.current = !0, () => {
    O.current = !1;
  }), []), eo(() => {
    if (S && (k.current = S), x && (D.current = x), S && x) {
      if (E.current)
        return E.current(S, x, P);
      P();
    }
  }, [S, x, P, E, T]);
  const $ = M.useMemo(() => ({
    reference: k,
    floating: D,
    setReference: v,
    setFloating: w
  }), [v, w]), B = M.useMemo(() => ({
    reference: S,
    floating: x
  }), [S, x]), q = M.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!B.floating)
      return I;
    const L = Ki(B.floating, d.x), F = Ki(B.floating, d.y);
    return a ? {
      ...I,
      transform: "translate(" + L + "px, " + F + "px)",
      ...$l(B.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: F
    };
  }, [n, a, B.floating, d.x, d.y]);
  return M.useMemo(() => ({
    ...d,
    update: P,
    refs: $,
    elements: B,
    floatingStyles: q
  }), [d, P, $, B, q]);
}
const kb = (e) => {
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
      return r && t(r) ? r.current != null ? Vi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Vi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Cb = (e, t) => ({
  ...fb(e),
  options: [e, t]
}), Mb = (e, t) => ({
  ...mb(e),
  options: [e, t]
}), Sb = (e, t) => ({
  ...yb(e),
  options: [e, t]
}), Tb = (e, t) => ({
  ...pb(e),
  options: [e, t]
}), Eb = (e, t) => ({
  ...hb(e),
  options: [e, t]
}), Db = (e, t) => ({
  ...gb(e),
  options: [e, t]
}), Nb = (e, t) => ({
  ...kb(e),
  options: [e, t]
});
var Ab = "Arrow", Hl = M.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ m(
    Re.svg,
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
Hl.displayName = Ab;
var Rb = Hl;
function Lb(e) {
  const [t, n] = M.useState(void 0);
  return zt(() => {
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
var Da = "Popper", [Wl, Ao] = Hn(Da), [Ib, zl] = Wl(Da), Bl = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = M.useState(null);
  return /* @__PURE__ */ m(Ib, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Bl.displayName = Da;
var Fl = "PopperAnchor", Ul = M.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = zl(Fl, n), i = M.useRef(null), a = Ie(t, i), c = M.useRef(null);
    return M.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ m(Re.div, { ...o, ref: a });
  }
);
Ul.displayName = Fl;
var Na = "PopperContent", [Pb, Ob] = Wl(Na), Yl = M.forwardRef(
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
    } = e, y = zl(Na, n), [b, v] = M.useState(null), w = Ie(t, (Y) => v(Y)), [S, x] = M.useState(null), k = Lb(S), D = k?.width ?? 0, C = k?.height ?? 0, T = r + (s !== "center" ? "-" + s : ""), E = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, N = Array.isArray(l) ? l : [l], A = N.length > 0, P = {
      padding: E,
      boundary: N.filter($b),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: O, floatingStyles: $, placement: B, isPositioned: q, middlewareData: I } = xb({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: T,
      whileElementsMounted: (...Y) => ub(...Y, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Cb({ mainAxis: o + C, alignmentAxis: i }),
        c && Mb({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? Sb() : void 0,
          ...P
        }),
        c && Tb({ ...P }),
        Eb({
          ...P,
          apply: ({ elements: Y, rects: ee, availableWidth: ue, availableHeight: fe }) => {
            const { width: ke, height: Ne } = ee.reference, Ke = Y.floating.style;
            Ke.setProperty("--radix-popper-available-width", `${ue}px`), Ke.setProperty("--radix-popper-available-height", `${fe}px`), Ke.setProperty("--radix-popper-anchor-width", `${ke}px`), Ke.setProperty("--radix-popper-anchor-height", `${Ne}px`);
          }
        }),
        S && Nb({ element: S, padding: a }),
        Hb({ arrowWidth: D, arrowHeight: C }),
        f && Db({ strategy: "referenceHidden", ...P })
      ]
    }), [L, F] = Kl(B), X = Tt(g);
    zt(() => {
      q && X?.();
    }, [q, X]);
    const K = I.arrow?.x, Z = I.arrow?.y, te = I.arrow?.centerOffset !== 0, [_, z] = M.useState();
    return zt(() => {
      b && z(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ m(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: q ? $.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: _,
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
          Pb,
          {
            scope: n,
            placedSide: L,
            onArrowChange: x,
            arrowX: K,
            arrowY: Z,
            shouldHideArrow: te,
            children: /* @__PURE__ */ m(
              Re.div,
              {
                "data-side": L,
                "data-align": F,
                ...h,
                ref: w,
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
Yl.displayName = Na;
var jl = "PopperArrow", _b = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Vl = M.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Ob(jl, r), i = _b[s.placedSide];
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
          Rb,
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
Vl.displayName = jl;
function $b(e) {
  return e !== null;
}
var Hb = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, d] = Kl(n), u = { start: "0%", center: "50%", end: "100%" }[d], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let g = "", h = "";
    return l === "bottom" ? (g = i ? u : `${f}px`, h = `${-c}px`) : l === "top" ? (g = i ? u : `${f}px`, h = `${r.floating.height + c}px`) : l === "right" ? (g = `${-c}px`, h = i ? u : `${p}px`) : l === "left" && (g = `${r.floating.width + c}px`, h = i ? u : `${p}px`), { data: { x: g, y: h } };
  }
});
function Kl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Gl = Bl, ql = Ul, Xl = Yl, Zl = Vl, Wb = "Portal", Aa = M.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = M.useState(!1);
  zt(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? Zf.createPortal(/* @__PURE__ */ m(Re.div, { ...r, ref: t }), i) : null;
});
Aa.displayName = Wb;
function zb(e, t) {
  return M.useReducer((n, r) => t[n][r] ?? n, e);
}
var tn = (e) => {
  const { present: t, children: n } = e, r = Bb(t), o = typeof n == "function" ? n({ present: r.isPresent }) : M.Children.only(n), s = Ie(r.ref, Fb(o));
  return typeof n == "function" || r.isPresent ? M.cloneElement(o, { ref: s }) : null;
};
tn.displayName = "Presence";
function Bb(e) {
  const [t, n] = M.useState(), r = M.useRef(null), o = M.useRef(e), s = M.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = zb(i, {
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
    const l = Yr(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), zt(() => {
    const l = r.current, d = o.current;
    if (d !== e) {
      const f = s.current, p = Yr(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(d && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), zt(() => {
    if (t) {
      let l;
      const d = t.ownerDocument.defaultView ?? window, u = (p) => {
        const h = Yr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && h && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Yr(r.current));
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
function Yr(e) {
  return e?.animationName || "none";
}
function Fb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ms = "rovingFocusGroup.onEntryFocus", Ub = { bubbles: !1, cancelable: !0 }, yr = "RovingFocusGroup", [Ws, Ql, Yb] = xl(yr), [jb, Jl] = Hn(
  yr,
  [Yb]
), [Vb, Kb] = jb(yr), ed = M.forwardRef(
  (e, t) => /* @__PURE__ */ m(Ws.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(Ws.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(Gb, { ...e, ref: t }) }) })
);
ed.displayName = yr;
var Gb = M.forwardRef((e, t) => {
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
  } = e, f = M.useRef(null), p = Ie(t, f), g = kl(s), [h, y] = wa({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: yr
  }), [b, v] = M.useState(!1), w = Tt(l), S = Ql(n), x = M.useRef(!1), [k, D] = M.useState(0);
  return M.useEffect(() => {
    const C = f.current;
    if (C)
      return C.addEventListener(ms, w), () => C.removeEventListener(ms, w);
  }, [w]), /* @__PURE__ */ m(
    Vb,
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
        Re.div,
        {
          tabIndex: b || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: ce(e.onMouseDown, () => {
            x.current = !0;
          }),
          onFocus: ce(e.onFocus, (C) => {
            const T = !x.current;
            if (C.target === C.currentTarget && T && !b) {
              const E = new CustomEvent(ms, Ub);
              if (C.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
                const N = S().filter((B) => B.focusable), A = N.find((B) => B.active), P = N.find((B) => B.id === h), $ = [A, P, ...N].filter(
                  Boolean
                ).map((B) => B.ref.current);
                rd($, d);
              }
            }
            x.current = !1;
          }),
          onBlur: ce(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), td = "RovingFocusGroupItem", nd = M.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = so(), l = s || c, d = Kb(td, n), u = d.currentTabStopId === l, f = Ql(n), { onFocusableItemAdd: p, onFocusableItemRemove: g, currentTabStopId: h } = d;
    return M.useEffect(() => {
      if (r)
        return p(), () => g();
    }, [r, p, g]), /* @__PURE__ */ m(
      Ws.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ m(
          Re.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...a,
            ref: t,
            onMouseDown: ce(e.onMouseDown, (y) => {
              r ? d.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: ce(e.onFocus, () => d.onItemFocus(l)),
            onKeyDown: ce(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const b = Zb(y, d.orientation, d.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = f().filter((S) => S.focusable).map((S) => S.ref.current);
                if (b === "last") w.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && w.reverse();
                  const S = w.indexOf(y.currentTarget);
                  w = d.loop ? Qb(w, S + 1) : w.slice(S + 1);
                }
                setTimeout(() => rd(w));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: h != null }) : i
          }
        )
      }
    );
  }
);
nd.displayName = td;
var qb = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Xb(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Zb(e, t, n) {
  const r = Xb(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return qb[r];
}
function rd(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Qb(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Jb = ed, ew = nd, tw = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, mn = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap(), Vr = {}, ps = 0, od = function(e) {
  return e && (e.host || od(e.parentNode));
}, nw = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = od(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, rw = function(e, t, n, r) {
  var o = nw(t, Array.isArray(e) ? e : [e]);
  Vr[n] || (Vr[n] = /* @__PURE__ */ new WeakMap());
  var s = Vr[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(u) {
    !u || a.has(u) || (a.add(u), l(u.parentNode));
  };
  o.forEach(l);
  var d = function(u) {
    !u || c.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (a.has(f))
        d(f);
      else
        try {
          var p = f.getAttribute(r), g = p !== null && p !== "false", h = (mn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          mn.set(f, h), s.set(f, y), i.push(f), h === 1 && g && jr.set(f, !0), y === 1 && f.setAttribute(n, "true"), g || f.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(t), a.clear(), ps++, function() {
    i.forEach(function(u) {
      var f = mn.get(u) - 1, p = s.get(u) - 1;
      mn.set(u, f), s.set(u, p), f || (jr.has(u) || u.removeAttribute(r), jr.delete(u)), p || u.removeAttribute(n);
    }), ps--, ps || (mn = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap(), Vr = {});
  };
}, ow = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = tw(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), rw(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, st = function() {
  return st = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, st.apply(this, arguments);
};
function sd(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function sw(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var to = "right-scroll-bar-position", no = "width-before-scroll-bar", aw = "with-scroll-bars-hidden", iw = "--removed-body-scroll-bar-size";
function hs(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function cw(e, t) {
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
var lw = typeof window < "u" ? M.useLayoutEffect : M.useEffect, Gi = /* @__PURE__ */ new WeakMap();
function dw(e, t) {
  var n = cw(null, function(r) {
    return e.forEach(function(o) {
      return hs(o, r);
    });
  });
  return lw(function() {
    var r = Gi.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || hs(a, null);
      }), s.forEach(function(a) {
        o.has(a) || hs(a, i);
      });
    }
    Gi.set(n, e);
  }, [e]), n;
}
function uw(e) {
  return e;
}
function fw(e, t) {
  t === void 0 && (t = uw);
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
function mw(e) {
  e === void 0 && (e = {});
  var t = fw(null);
  return t.options = st({ async: !0, ssr: !1 }, e), t;
}
var ad = function(e) {
  var t = e.sideCar, n = sd(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return M.createElement(r, st({}, n));
};
ad.isSideCarExport = !0;
function pw(e, t) {
  return e.useMedium(t), ad;
}
var id = mw(), gs = function() {
}, Ro = M.forwardRef(function(e, t) {
  var n = M.useRef(null), r = M.useState({
    onScrollCapture: gs,
    onWheelCapture: gs,
    onTouchMoveCapture: gs
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, u = e.shards, f = e.sideCar, p = e.noRelative, g = e.noIsolation, h = e.inert, y = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, w = e.gapMode, S = sd(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), x = f, k = dw([n, t]), D = st(st({}, S), o);
  return M.createElement(
    M.Fragment,
    null,
    d && M.createElement(x, { sideCar: id, removeScrollBar: l, shards: u, noRelative: p, noIsolation: g, inert: h, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    i ? M.cloneElement(M.Children.only(a), st(st({}, D), { ref: k })) : M.createElement(v, st({}, D, { className: c, ref: k }), a)
  );
});
Ro.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Ro.classNames = {
  fullWidth: no,
  zeroRight: to
};
var hw = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function gw() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = hw();
  return t && e.setAttribute("nonce", t), e;
}
function yw(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function vw(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var bw = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = gw()) && (yw(t, n), vw(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, ww = function() {
  var e = bw();
  return function(t, n) {
    M.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, cd = function() {
  var e = ww(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, xw = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ys = function(e) {
  return parseInt(e || "", 10) || 0;
}, kw = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ys(n), ys(r), ys(o)];
}, Cw = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return xw;
  var t = kw(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Mw = cd(), Sn = "data-scroll-locked", Sw = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(aw, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(Sn, `] {
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
  
  .`).concat(to, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(no, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(to, " .").concat(to, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(no, " .").concat(no, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Sn, `] {
    `).concat(iw, ": ").concat(a, `px;
  }
`);
}, qi = function() {
  var e = parseInt(document.body.getAttribute(Sn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Tw = function() {
  M.useEffect(function() {
    return document.body.setAttribute(Sn, (qi() + 1).toString()), function() {
      var e = qi() - 1;
      e <= 0 ? document.body.removeAttribute(Sn) : document.body.setAttribute(Sn, e.toString());
    };
  }, []);
}, Ew = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Tw();
  var s = M.useMemo(function() {
    return Cw(o);
  }, [o]);
  return M.createElement(Mw, { styles: Sw(s, !t, o, n ? "" : "!important") });
}, zs = !1;
if (typeof window < "u")
  try {
    var Kr = Object.defineProperty({}, "passive", {
      get: function() {
        return zs = !0, !0;
      }
    });
    window.addEventListener("test", Kr, Kr), window.removeEventListener("test", Kr, Kr);
  } catch {
    zs = !1;
  }
var pn = zs ? { passive: !1 } : !1, Dw = function(e) {
  return e.tagName === "TEXTAREA";
}, ld = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Dw(e) && n[t] === "visible")
  );
}, Nw = function(e) {
  return ld(e, "overflowY");
}, Aw = function(e) {
  return ld(e, "overflowX");
}, Xi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = dd(e, r);
    if (o) {
      var s = ud(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Rw = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Lw = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, dd = function(e, t) {
  return e === "v" ? Nw(t) : Aw(t);
}, ud = function(e, t) {
  return e === "v" ? Rw(t) : Lw(t);
}, Iw = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Pw = function(e, t, n, r, o) {
  var s = Iw(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, d = i > 0, u = 0, f = 0;
  do {
    if (!a)
      break;
    var p = ud(e, a), g = p[0], h = p[1], y = p[2], b = h - y - s * g;
    (g || b) && dd(e, a) && (u += b, f += g);
    var v = a.parentNode;
    a = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(f) < 1) && (l = !0), l;
}, Gr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Zi = function(e) {
  return [e.deltaX, e.deltaY];
}, Qi = function(e) {
  return e && "current" in e ? e.current : e;
}, Ow = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, _w = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, $w = 0, hn = [];
function Hw(e) {
  var t = M.useRef([]), n = M.useRef([0, 0]), r = M.useRef(), o = M.useState($w++)[0], s = M.useState(cd)[0], i = M.useRef(e);
  M.useEffect(function() {
    i.current = e;
  }, [e]), M.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var h = sw([e.lockRef.current], (e.shards || []).map(Qi), !0).filter(Boolean);
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
    var b = Gr(h), v = n.current, w = "deltaX" in h ? h.deltaX : v[0] - b[0], S = "deltaY" in h ? h.deltaY : v[1] - b[1], x, k = h.target, D = Math.abs(w) > Math.abs(S) ? "h" : "v";
    if ("touches" in h && D === "h" && k.type === "range")
      return !1;
    var C = Xi(D, k);
    if (!C)
      return !0;
    if (C ? x = D : (x = D === "v" ? "h" : "v", C = Xi(D, k)), !C)
      return !1;
    if (!r.current && "changedTouches" in h && (w || S) && (r.current = x), !x)
      return !0;
    var T = r.current || x;
    return Pw(T, y, h, T === "h" ? w : S);
  }, []), c = M.useCallback(function(h) {
    var y = h;
    if (!(!hn.length || hn[hn.length - 1] !== s)) {
      var b = "deltaY" in y ? Zi(y) : Gr(y), v = t.current.filter(function(x) {
        return x.name === y.type && (x.target === y.target || y.target === x.shadowParent) && Ow(x.delta, b);
      })[0];
      if (v && v.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!v) {
        var w = (i.current.shards || []).map(Qi).filter(Boolean).filter(function(x) {
          return x.contains(y.target);
        }), S = w.length > 0 ? a(y, w[0]) : !i.current.noIsolation;
        S && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = M.useCallback(function(h, y, b, v) {
    var w = { name: h, delta: y, target: b, should: v, shadowParent: Ww(b) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== w;
      });
    }, 1);
  }, []), d = M.useCallback(function(h) {
    n.current = Gr(h), r.current = void 0;
  }, []), u = M.useCallback(function(h) {
    l(h.type, Zi(h), h.target, a(h, e.lockRef.current));
  }, []), f = M.useCallback(function(h) {
    l(h.type, Gr(h), h.target, a(h, e.lockRef.current));
  }, []);
  M.useEffect(function() {
    return hn.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, pn), document.addEventListener("touchmove", c, pn), document.addEventListener("touchstart", d, pn), function() {
      hn = hn.filter(function(h) {
        return h !== s;
      }), document.removeEventListener("wheel", c, pn), document.removeEventListener("touchmove", c, pn), document.removeEventListener("touchstart", d, pn);
    };
  }, []);
  var p = e.removeScrollBar, g = e.inert;
  return M.createElement(
    M.Fragment,
    null,
    g ? M.createElement(s, { styles: _w(o) }) : null,
    p ? M.createElement(Ew, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Ww(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const zw = pw(id, Hw);
var fd = M.forwardRef(function(e, t) {
  return M.createElement(Ro, st({}, e, { ref: t, sideCar: zw }));
});
fd.classNames = Ro.classNames;
var Bs = ["Enter", " "], Bw = ["ArrowDown", "PageUp", "Home"], md = ["ArrowUp", "PageDown", "End"], Fw = [...Bw, ...md], Uw = {
  ltr: [...Bs, "ArrowRight"],
  rtl: [...Bs, "ArrowLeft"]
}, Yw = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, vr = "Menu", [dr, jw, Vw] = xl(vr), [nn, pd] = Hn(vr, [
  Vw,
  Ao,
  Jl
]), Lo = Ao(), hd = Jl(), [Kw, rn] = nn(vr), [Gw, br] = nn(vr), gd = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Lo(t), [c, l] = M.useState(null), d = M.useRef(!1), u = Tt(s), f = kl(o);
  return M.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(Gl, { ...a, children: /* @__PURE__ */ m(
    Kw,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ m(
        Gw,
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
gd.displayName = vr;
var qw = "MenuAnchor", Ra = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Lo(n);
    return /* @__PURE__ */ m(ql, { ...o, ...r, ref: t });
  }
);
Ra.displayName = qw;
var La = "MenuPortal", [Xw, yd] = nn(La, {
  forceMount: void 0
}), vd = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = rn(La, t);
  return /* @__PURE__ */ m(Xw, { scope: t, forceMount: n, children: /* @__PURE__ */ m(tn, { present: n || s.open, children: /* @__PURE__ */ m(Aa, { asChild: !0, container: o, children: r }) }) });
};
vd.displayName = La;
var Xe = "MenuContent", [Zw, Ia] = nn(Xe), bd = M.forwardRef(
  (e, t) => {
    const n = yd(Xe, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = rn(Xe, e.__scopeMenu), i = br(Xe, e.__scopeMenu);
    return /* @__PURE__ */ m(dr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(tn, { present: r || s.open, children: /* @__PURE__ */ m(dr.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ m(Qw, { ...o, ref: t }) : /* @__PURE__ */ m(Jw, { ...o, ref: t }) }) }) });
  }
), Qw = M.forwardRef(
  (e, t) => {
    const n = rn(Xe, e.__scopeMenu), r = M.useRef(null), o = Ie(t, r);
    return M.useEffect(() => {
      const s = r.current;
      if (s) return ow(s);
    }, []), /* @__PURE__ */ m(
      Pa,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: ce(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Jw = M.forwardRef((e, t) => {
  const n = rn(Xe, e.__scopeMenu);
  return /* @__PURE__ */ m(
    Pa,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), e0 = /* @__PURE__ */ ir("MenuContent.ScrollLock"), Pa = M.forwardRef(
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
    } = e, y = rn(Xe, n), b = br(Xe, n), v = Lo(n), w = hd(n), S = jw(n), [x, k] = M.useState(null), D = M.useRef(null), C = Ie(t, D, y.onContentChange), T = M.useRef(0), E = M.useRef(""), N = M.useRef(0), A = M.useRef(null), P = M.useRef("right"), O = M.useRef(0), $ = g ? fd : M.Fragment, B = g ? { as: e0, allowPinchZoom: !0 } : void 0, q = (L) => {
      const F = E.current + L, X = S().filter((Y) => !Y.disabled), K = document.activeElement, Z = X.find((Y) => Y.ref.current === K)?.textValue, te = X.map((Y) => Y.textValue), _ = f0(te, F, Z), z = X.find((Y) => Y.textValue === _)?.ref.current;
      (function Y(ee) {
        E.current = ee, window.clearTimeout(T.current), ee !== "" && (T.current = window.setTimeout(() => Y(""), 1e3));
      })(F), z && setTimeout(() => z.focus());
    };
    M.useEffect(() => () => window.clearTimeout(T.current), []), dv();
    const I = M.useCallback((L) => P.current === A.current?.side && p0(L, A.current?.area), []);
    return /* @__PURE__ */ m(
      Zw,
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
        children: /* @__PURE__ */ m($, { ...B, children: /* @__PURE__ */ m(
          Sl,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: ce(s, (L) => {
              L.preventDefault(), D.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ m(
              xa,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: d,
                onFocusOutside: u,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ m(
                  Jb,
                  {
                    asChild: !0,
                    ...w,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: x,
                    onCurrentTabStopIdChange: k,
                    onEntryFocus: ce(c, (L) => {
                      b.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ m(
                      Xl,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Od(y.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...h,
                        ref: C,
                        style: { outline: "none", ...h.style },
                        onKeyDown: ce(h.onKeyDown, (L) => {
                          const X = L.target.closest("[data-radix-menu-content]") === L.currentTarget, K = L.ctrlKey || L.altKey || L.metaKey, Z = L.key.length === 1;
                          X && (L.key === "Tab" && L.preventDefault(), !K && Z && q(L.key));
                          const te = D.current;
                          if (L.target !== te || !Fw.includes(L.key)) return;
                          L.preventDefault();
                          const z = S().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
                          md.includes(L.key) && z.reverse(), d0(z);
                        }),
                        onBlur: ce(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(T.current), E.current = "");
                        }),
                        onPointerMove: ce(
                          e.onPointerMove,
                          ur((L) => {
                            const F = L.target, X = O.current !== L.clientX;
                            if (L.currentTarget.contains(F) && X) {
                              const K = L.clientX > O.current ? "right" : "left";
                              P.current = K, O.current = L.clientX;
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
bd.displayName = Xe;
var t0 = "MenuGroup", Oa = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Re.div, { role: "group", ...r, ref: t });
  }
);
Oa.displayName = t0;
var n0 = "MenuLabel", wd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Re.div, { ...r, ref: t });
  }
);
wd.displayName = n0;
var uo = "MenuItem", Ji = "menu.itemSelect", Io = M.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = M.useRef(null), i = br(uo, e.__scopeMenu), a = Ia(uo, e.__scopeMenu), c = Ie(t, s), l = M.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const f = new CustomEvent(Ji, { bubbles: !0, cancelable: !0 });
        u.addEventListener(Ji, (p) => r?.(p), { once: !0 }), wl(u, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ m(
      xd,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: ce(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), l.current = !0;
        },
        onPointerUp: ce(e.onPointerUp, (u) => {
          l.current || u.currentTarget?.click();
        }),
        onKeyDown: ce(e.onKeyDown, (u) => {
          const f = a.searchRef.current !== "";
          n || f && u.key === " " || Bs.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
Io.displayName = uo;
var xd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = Ia(uo, n), a = hd(n), c = M.useRef(null), l = Ie(t, c), [d, u] = M.useState(!1), [f, p] = M.useState("");
    return M.useEffect(() => {
      const g = c.current;
      g && p((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ m(
      dr.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ m(ew, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ m(
          Re.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: ce(
              e.onPointerMove,
              ur((g) => {
                r ? i.onItemLeave(g) : (i.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ce(
              e.onPointerLeave,
              ur((g) => i.onItemLeave(g))
            ),
            onFocus: ce(e.onFocus, () => u(!0)),
            onBlur: ce(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), r0 = "MenuCheckboxItem", kd = M.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(Ed, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
      Io,
      {
        role: "menuitemcheckbox",
        "aria-checked": fo(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": $a(n),
        onSelect: ce(
          o.onSelect,
          () => r?.(fo(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
kd.displayName = r0;
var Cd = "MenuRadioGroup", [o0, s0] = nn(
  Cd,
  { value: void 0, onValueChange: () => {
  } }
), Md = M.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = Tt(r);
    return /* @__PURE__ */ m(o0, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ m(Oa, { ...o, ref: t }) });
  }
);
Md.displayName = Cd;
var Sd = "MenuRadioItem", Td = M.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = s0(Sd, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ m(Ed, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ m(
      Io,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": $a(s),
        onSelect: ce(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Td.displayName = Sd;
var _a = "MenuItemIndicator", [Ed, a0] = nn(
  _a,
  { checked: !1 }
), Dd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = a0(_a, n);
    return /* @__PURE__ */ m(
      tn,
      {
        present: r || fo(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ m(
          Re.span,
          {
            ...o,
            ref: t,
            "data-state": $a(s.checked)
          }
        )
      }
    );
  }
);
Dd.displayName = _a;
var i0 = "MenuSeparator", Nd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(
      Re.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Nd.displayName = i0;
var c0 = "MenuArrow", Ad = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Lo(n);
    return /* @__PURE__ */ m(Zl, { ...o, ...r, ref: t });
  }
);
Ad.displayName = c0;
var l0 = "MenuSub", [cC, Rd] = nn(l0), er = "MenuSubTrigger", Ld = M.forwardRef(
  (e, t) => {
    const n = rn(er, e.__scopeMenu), r = br(er, e.__scopeMenu), o = Rd(er, e.__scopeMenu), s = Ia(er, e.__scopeMenu), i = M.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, d = M.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return M.useEffect(() => d, [d]), M.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), c(null);
      };
    }, [a, c]), /* @__PURE__ */ m(Ra, { asChild: !0, ...l, children: /* @__PURE__ */ m(
      xd,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Od(n.open),
        ...e,
        ref: Mo(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ce(
          e.onPointerMove,
          ur((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: ce(
          e.onPointerLeave,
          ur((u) => {
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
        onKeyDown: ce(e.onKeyDown, (u) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && u.key === " " || Uw[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Ld.displayName = er;
var Id = "MenuSubContent", Pd = M.forwardRef(
  (e, t) => {
    const n = yd(Xe, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = rn(Xe, e.__scopeMenu), i = br(Xe, e.__scopeMenu), a = Rd(Id, e.__scopeMenu), c = M.useRef(null), l = Ie(t, c);
    return /* @__PURE__ */ m(dr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(tn, { present: r || s.open, children: /* @__PURE__ */ m(dr.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
      Pa,
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
        onFocusOutside: ce(e.onFocusOutside, (d) => {
          d.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: ce(e.onEscapeKeyDown, (d) => {
          i.onClose(), d.preventDefault();
        }),
        onKeyDown: ce(e.onKeyDown, (d) => {
          const u = d.currentTarget.contains(d.target), f = Yw[i.dir].includes(d.key);
          u && f && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
Pd.displayName = Id;
function Od(e) {
  return e ? "open" : "closed";
}
function fo(e) {
  return e === "indeterminate";
}
function $a(e) {
  return fo(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function d0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function u0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function f0(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = u0(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function m0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function p0(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return m0(n, t);
}
function ur(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var h0 = gd, g0 = Ra, y0 = vd, v0 = bd, b0 = Oa, w0 = wd, x0 = Io, k0 = kd, C0 = Md, M0 = Td, S0 = Dd, T0 = Nd, E0 = Ad, D0 = Ld, N0 = Pd, Po = "DropdownMenu", [A0] = Hn(
  Po,
  [pd]
), $e = pd(), [R0, _d] = A0(Po), $d = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = $e(t), l = M.useRef(null), [d, u] = wa({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: Po
  });
  return /* @__PURE__ */ m(
    R0,
    {
      scope: t,
      triggerId: so(),
      triggerRef: l,
      contentId: so(),
      open: d,
      onOpenChange: u,
      onOpenToggle: M.useCallback(() => u((f) => !f), [u]),
      modal: a,
      children: /* @__PURE__ */ m(h0, { ...c, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
$d.displayName = Po;
var Hd = "DropdownMenuTrigger", Wd = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = _d(Hd, n), i = $e(n);
    return /* @__PURE__ */ m(g0, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Re.button,
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
        ref: Mo(t, s.triggerRef),
        onPointerDown: ce(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: ce(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
Wd.displayName = Hd;
var L0 = "DropdownMenuPortal", zd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = $e(t);
  return /* @__PURE__ */ m(y0, { ...r, ...n });
};
zd.displayName = L0;
var Bd = "DropdownMenuContent", Fd = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = _d(Bd, n), s = $e(n), i = M.useRef(!1);
    return /* @__PURE__ */ m(
      v0,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: ce(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: ce(e.onInteractOutside, (a) => {
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
Fd.displayName = Bd;
var I0 = "DropdownMenuGroup", P0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(b0, { ...o, ...r, ref: t });
  }
);
P0.displayName = I0;
var O0 = "DropdownMenuLabel", _0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(w0, { ...o, ...r, ref: t });
  }
);
_0.displayName = O0;
var $0 = "DropdownMenuItem", Ud = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(x0, { ...o, ...r, ref: t });
  }
);
Ud.displayName = $0;
var H0 = "DropdownMenuCheckboxItem", W0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(k0, { ...o, ...r, ref: t });
});
W0.displayName = H0;
var z0 = "DropdownMenuRadioGroup", B0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(C0, { ...o, ...r, ref: t });
});
B0.displayName = z0;
var F0 = "DropdownMenuRadioItem", U0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(M0, { ...o, ...r, ref: t });
});
U0.displayName = F0;
var Y0 = "DropdownMenuItemIndicator", j0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(S0, { ...o, ...r, ref: t });
});
j0.displayName = Y0;
var V0 = "DropdownMenuSeparator", Yd = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(T0, { ...o, ...r, ref: t });
});
Yd.displayName = V0;
var K0 = "DropdownMenuArrow", G0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(E0, { ...o, ...r, ref: t });
  }
);
G0.displayName = K0;
var q0 = "DropdownMenuSubTrigger", X0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(D0, { ...o, ...r, ref: t });
});
X0.displayName = q0;
var Z0 = "DropdownMenuSubContent", Q0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(
    N0,
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
Q0.displayName = Z0;
var J0 = $d, ex = Wd, tx = zd, nx = Fd, rx = Ud, ox = Yd;
function vs({
  ...e
}) {
  return /* @__PURE__ */ m(J0, { "data-slot": "dropdown-menu", ...e });
}
function bs({
  ...e
}) {
  return /* @__PURE__ */ m(
    ex,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function ws({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(tx, { children: /* @__PURE__ */ m(
    nx,
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
function Ce({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ m(
    rx,
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
function xs({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    ox,
    {
      "data-slot": "dropdown-menu-separator",
      className: ie("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var sx = Object.freeze({
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
}), ax = "VisuallyHidden", jd = M.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    Re.span,
    {
      ...e,
      ref: t,
      style: { ...sx, ...e.style }
    }
  )
);
jd.displayName = ax;
var ix = jd, [Oo] = Hn("Tooltip", [
  Ao
]), _o = Ao(), Vd = "TooltipProvider", cx = 700, Fs = "tooltip.open", [lx, Ha] = Oo(Vd), Kd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = cx,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = M.useRef(!0), a = M.useRef(!1), c = M.useRef(0);
  return M.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ m(
    lx,
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
Kd.displayName = Vd;
var fr = "Tooltip", [dx, wr] = Oo(fr), Gd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = Ha(fr, e.__scopeTooltip), l = _o(t), [d, u] = M.useState(null), f = so(), p = M.useRef(0), g = i ?? c.disableHoverableContent, h = a ?? c.delayDuration, y = M.useRef(!1), [b, v] = wa({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Fs))) : c.onClose(), s?.(D);
    },
    caller: fr
  }), w = M.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), S = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, v(!0);
  }, [v]), x = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v(!1);
  }, [v]), k = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, v(!0), p.current = 0;
    }, h);
  }, [h, v]);
  return M.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ m(Gl, { ...l, children: /* @__PURE__ */ m(
    dx,
    {
      scope: t,
      contentId: f,
      open: b,
      stateAttribute: w,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: M.useCallback(() => {
        c.isOpenDelayedRef.current ? k() : S();
      }, [c.isOpenDelayedRef, k, S]),
      onTriggerLeave: M.useCallback(() => {
        g ? x() : (window.clearTimeout(p.current), p.current = 0);
      }, [x, g]),
      onOpen: S,
      onClose: x,
      disableHoverableContent: g,
      children: n
    }
  ) });
};
Gd.displayName = fr;
var Us = "TooltipTrigger", qd = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = wr(Us, n), s = Ha(Us, n), i = _o(n), a = M.useRef(null), c = Ie(t, a, o.onTriggerChange), l = M.useRef(!1), d = M.useRef(!1), u = M.useCallback(() => l.current = !1, []);
    return M.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ m(ql, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Re.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: ce(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: ce(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: ce(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", u, { once: !0 });
        }),
        onFocus: ce(e.onFocus, () => {
          l.current || o.onOpen();
        }),
        onBlur: ce(e.onBlur, o.onClose),
        onClick: ce(e.onClick, o.onClose)
      }
    ) });
  }
);
qd.displayName = Us;
var Wa = "TooltipPortal", [ux, fx] = Oo(Wa, {
  forceMount: void 0
}), Xd = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = wr(Wa, t);
  return /* @__PURE__ */ m(ux, { scope: t, forceMount: n, children: /* @__PURE__ */ m(tn, { present: n || s.open, children: /* @__PURE__ */ m(Aa, { asChild: !0, container: o, children: r }) }) });
};
Xd.displayName = Wa;
var An = "TooltipContent", Zd = M.forwardRef(
  (e, t) => {
    const n = fx(An, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = wr(An, e.__scopeTooltip);
    return /* @__PURE__ */ m(tn, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ m(Qd, { side: o, ...s, ref: t }) : /* @__PURE__ */ m(mx, { side: o, ...s, ref: t }) });
  }
), mx = M.forwardRef((e, t) => {
  const n = wr(An, e.__scopeTooltip), r = Ha(An, e.__scopeTooltip), o = M.useRef(null), s = Ie(t, o), [i, a] = M.useState(null), { trigger: c, onClose: l } = n, d = o.current, { onPointerInTransitChange: u } = r, f = M.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = M.useCallback(
    (g, h) => {
      const y = g.currentTarget, b = { x: g.clientX, y: g.clientY }, v = yx(b, y.getBoundingClientRect()), w = vx(b, v), S = bx(h.getBoundingClientRect()), x = xx([...w, ...S]);
      a(x), u(!0);
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
        const y = h.target, b = { x: h.clientX, y: h.clientY }, v = c?.contains(y) || d?.contains(y), w = !wx(b, i);
        v ? f() : w && (f(), l());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [c, d, i, l, f]), /* @__PURE__ */ m(Qd, { ...e, ref: s });
}), [px, hx] = Oo(fr, { isInside: !1 }), gx = /* @__PURE__ */ xy("TooltipContent"), Qd = M.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = wr(An, n), l = _o(n), { onClose: d } = c;
    return M.useEffect(() => (document.addEventListener(Fs, d), () => document.removeEventListener(Fs, d)), [d]), M.useEffect(() => {
      if (c.trigger) {
        const u = (f) => {
          f.target?.contains(c.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [c.trigger, d]), /* @__PURE__ */ m(
      xa,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ R(
          Xl,
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
              /* @__PURE__ */ m(gx, { children: r }),
              /* @__PURE__ */ m(px, { scope: n, isInside: !0, children: /* @__PURE__ */ m(ix, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Zd.displayName = An;
var Jd = "TooltipArrow", eu = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = _o(n);
    return hx(
      Jd,
      n
    ).isInside ? null : /* @__PURE__ */ m(Zl, { ...o, ...r, ref: t });
  }
);
eu.displayName = Jd;
function yx(e, t) {
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
function vx(e, t, n = 5) {
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
function bx(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function wx(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function xx(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), kx(t);
}
function kx(e) {
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
var Cx = Kd, Mx = Gd, Sx = qd, Tx = Xd, Ex = Zd, Dx = eu;
function Nx({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    Cx,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Ys({
  ...e
}) {
  return /* @__PURE__ */ m(Nx, { children: /* @__PURE__ */ m(Mx, { "data-slot": "tooltip", ...e }) });
}
function js({
  ...e
}) {
  return /* @__PURE__ */ m(Sx, { "data-slot": "tooltip-trigger", ...e });
}
function Vs({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ m(Tx, { children: /* @__PURE__ */ R(
    Ex,
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
        /* @__PURE__ */ m(Dx, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const Me = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ R(Ys, { children: [
    /* @__PURE__ */ m(js, { asChild: !0, children: s }),
    /* @__PURE__ */ m(Vs, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, gn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Ax = Ln(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = V(null), [l, d] = j(!1), [u, f] = j(void 0), p = mc({
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
  }), g = U(() => {
    const { view: k } = t, { from: D } = k.state.selection, C = k.coordsAtPos(D);
    f({ top: C.bottom + 8, left: C.left }), d(!0);
  }, [t]), h = U((k, D) => {
    t.chain().focus().setImage({ src: k, alt: D }).run(), d(!1);
  }, [t]), y = U(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = U((k) => {
    t.chain().focus().insertCallout({ type: k }).run();
  }, [t]), v = V(/* @__PURE__ */ new Map()), w = V(/* @__PURE__ */ new Map()), S = U((k) => {
    const { doc: D, tr: C } = k.state;
    let T = !1;
    const E = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), N.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((B) => {
        const q = B, I = (q.textContent || "").trim().substring(0, 50);
        v.current.set(`${O}-${I}`, q.getBoundingClientRect());
      });
    });
    const A = [];
    D.descendants((P, O, $, B) => {
      if (!E.has(P.type.name)) return !0;
      let q = !1;
      if (P.forEach((L) => {
        L.type.name === "taskItem" && (q = !0);
      }), !q) return !0;
      let I = 0;
      return D.nodesBetween(0, O, (L) => (E.has(L.type.name) && I++, !0)), A.push({ node: P, pos: O, depth: I }), !0;
    }), A.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of A) {
      const $ = [];
      let B = 0;
      P.forEach((_) => {
        $.push({
          node: _,
          isTask: _.type.name === "taskItem",
          checked: _.type.name === "taskItem" && _.attrs.checked === !0,
          originalIndex: B++
        });
      });
      const q = $.filter((_) => _.isTask && !_.checked), I = $.filter((_) => _.isTask && _.checked), L = [...$], F = $.map((_, z) => ({ index: z, isTask: _.isTask })).filter((_) => _.isTask).map((_) => _.index), X = [...q, ...I];
      if (F.forEach((_, z) => {
        L[_] = X[z];
      }), !L.some((_, z) => _.node !== $[z].node)) continue;
      const Z = P.type.create(
        P.attrs,
        L.map((_) => _.node)
      ), te = C.mapping.map(O);
      C.replaceWith(te, te + P.nodeSize, Z), T = !0;
    }
    T && (k.view.dispatch(C), requestAnimationFrame(() => {
      k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const $ = O.querySelectorAll(":scope > li"), B = /* @__PURE__ */ new Map();
        v.current.forEach((q, I) => {
          const L = I.replace(/^\d+-/, "");
          B.set(L, q);
        }), $.forEach((q) => {
          const I = q, L = (I.textContent || "").trim().substring(0, 50), F = B.get(L);
          if (!F) return;
          const X = I.getBoundingClientRect(), K = F.top - X.top;
          if (Math.abs(K) < 2) return;
          I.style.transform = `translateY(${K}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
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
    t.state.doc.descendants((C, T) => (C.type.name === "taskItem" && k.set(T, C.attrs.checked === !0), !0)), w.current = k;
    const D = ({ transaction: C }) => {
      if (!C.docChanged) return;
      const T = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, P) => (A.type.name === "taskItem" && T.set(P, A.attrs.checked === !0), !0));
      const E = w.current;
      let N = !1;
      if (E.size > 0 && T.size > 0) {
        let A = 0, P = 0;
        E.forEach((O) => {
          O && A++;
        }), T.forEach((O) => {
          O && P++;
        }), A !== P && (N = !0);
      }
      w.current = T, N && setTimeout(() => {
        S(t);
      }, 150);
    };
    return t.on("transaction", D), () => {
      t.off("transaction", D);
    };
  }, [t, s, S]);
  const x = U(() => {
    S(t);
  }, [t, S]);
  return /* @__PURE__ */ R("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Cf, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Mf, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(gn, {}),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Xs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Qs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Js, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(yc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(vc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(ea, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(gn, {}),
    /* @__PURE__ */ R(vs, { children: [
      /* @__PURE__ */ m(bs, { asChild: !0, children: /* @__PURE__ */ R(
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
            /* @__PURE__ */ m(Wt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(ws, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ R(
          Ce,
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
          Ce,
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
          Ce,
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
          Ce,
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
          Ce,
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
          Ce,
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
    /* @__PURE__ */ m(gn, {}),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(na, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(ra, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(oa, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(ta, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(Cc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Sf, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Tf, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(gn, {}),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(Ss, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(ia, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(Mc, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(vs, { children: [
      /* @__PURE__ */ m(bs, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(oo, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ R(ws, { align: "start", children: [
        /* @__PURE__ */ R(Ce, { onClick: () => b("info"), children: [
          /* @__PURE__ */ m(oo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ R(Ce, { onClick: () => b("note"), children: [
          /* @__PURE__ */ m(aa, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ R(Ce, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ m(Ef, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ R(Ce, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ m(Df, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ R(Ce, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ m(sa, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ R(vs, { children: [
      /* @__PURE__ */ m(bs, { asChild: !0, children: /* @__PURE__ */ R(
        Ht,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(Ss, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(ws, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Ja, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(Ja, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(bn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ m(xs, {}),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(ei, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(ei, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(bn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ m(xs, {}),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(ti, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(ti, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ m(xs, {}),
        /* @__PURE__ */ R(
          Ce,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(bn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m(
      bl,
      {
        isOpen: l,
        onClose: () => d(!1),
        onInsert: h,
        position: u
      }
    ),
    /* @__PURE__ */ m(gn, {}),
    /* @__PURE__ */ m(
      Me,
      {
        onClick: x,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(Nf, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ R(De, { children: [
      /* @__PURE__ */ m(gn, {}),
      /* @__PURE__ */ R(Ys, { children: [
        /* @__PURE__ */ m(js, { asChild: !0, children: /* @__PURE__ */ m(
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
            children: /* @__PURE__ */ m(wo, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ m(Vs, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ R(Ys, { children: [
      /* @__PURE__ */ m(js, { asChild: !0, children: /* @__PURE__ */ R(
        Ht,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Pn, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ m(Vs, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function Rx({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [d, u] = j(""), [f, p] = j(""), [g, h] = j(!1), [y, b] = j(!1), [v, w] = j(!1), [S, x] = j(!1), [k, D] = j([]), [C, T] = j(0), [E, N] = j(null), [A, P] = j(!1), O = V(!1), $ = V(null), B = V(null), q = V(!1);
  Q(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const I = U(() => {
    if (!d || !e) {
      D([]), T(0), N(null);
      return;
    }
    const _ = [];
    let z;
    try {
      if (y)
        z = new RegExp(d, g ? "g" : "gi");
      else {
        let Y = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (Y = `\\b${Y}\\b`), z = new RegExp(Y, g ? "g" : "gi");
      }
      N(null);
    } catch (Y) {
      N(Y.message), D([]);
      return;
    }
    if (l) {
      let Y;
      for (; (Y = z.exec(i)) !== null; )
        _.push({
          from: Y.index,
          to: Y.index + Y[0].length,
          text: Y[0]
        });
    } else {
      const { doc: Y } = e.state;
      Y.descendants((ee, ue) => {
        if (ee.isText && ee.text) {
          let fe;
          for (; (fe = z.exec(ee.text)) !== null; )
            _.push({
              from: ue + fe.index,
              to: ue + fe.index + fe[0].length,
              text: fe[0]
            });
        }
        return !0;
      });
    }
    D(_), _.length > 0 && C >= _.length && T(0);
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
    const _ = typeof e.commands.setSearchHighlight == "function";
    t && d && _ ? e.commands.setSearchHighlight({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      currentMatchIndex: C
    }) : _ && e.commands.clearSearchHighlight();
  }, [e, t, d, g, y, C, l, k, i]), Q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), Q(() => {
    if (k.length > 0 && C < k.length) {
      const _ = k[C];
      if (l) {
        const Y = document.querySelector(".syntax-textarea");
        if (Y && q.current) {
          const ee = parseInt(getComputedStyle(Y).lineHeight) || 22, fe = i.substring(0, _.from).split(`
`).length;
          Y.scrollTop = Math.max(0, (fe - 3) * ee);
        }
        q.current && (q.current = !1);
        return;
      }
      const z = e.view.domAtPos(_.from);
      z.node && z.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), q.current && (q.current = !1);
    }
  }, [C, k, e, l, i]), Q(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, r]);
  const L = U(() => {
    k.length !== 0 && (q.current = !0, T((_) => (_ + 1) % k.length));
  }, [k.length]), F = U(() => {
    k.length !== 0 && (q.current = !0, T((_) => (_ - 1 + k.length) % k.length));
  }, [k.length]), X = U(() => {
    if (k.length === 0 || C >= k.length) return;
    const _ = k[C];
    if (l && a) {
      const z = i.substring(0, _.from) + f + i.substring(_.to);
      a(z), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: _.from, to: _.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [k, C, f, e, I, l, i, a]), K = U(() => {
    if (k.length === 0) return;
    if (l && a) {
      const z = [...k].sort((ee, ue) => ue.from - ee.from);
      let Y = i;
      z.forEach((ee) => {
        Y = Y.substring(0, ee.from) + f + Y.substring(ee.to);
      }), a(Y), setTimeout(I, 10);
      return;
    }
    const _ = [...k].sort((z, Y) => Y.from - z.from);
    e.chain().focus(), _.forEach((z) => {
      e.chain().setTextSelection({ from: z.from, to: z.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [k, f, e, I, l, i, a]), Z = U(() => {
    if (k.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: g,
      useRegex: y,
      wholeWord: v
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [k, d, g, y, v, e, n]), te = U((_) => {
    _.key === "Enter" ? (_.preventDefault(), _.shiftKey ? F() : L(), $.current?.focus()) : _.key === "Escape" ? (_.preventDefault(), n()) : _.key === "h" && (_.ctrlKey || _.metaKey) ? (_.preventDefault(), x((z) => !z)) : _.key === "l" && (_.ctrlKey || _.metaKey) && _.shiftKey && (_.preventDefault(), Z());
  }, [L, F, n, Z]);
  return t ? /* @__PURE__ */ R(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: te,
      children: [
        /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Af, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: $,
                type: "text",
                placeholder: "Find...",
                value: d,
                onChange: (_) => u(_.target.value),
                className: `find-replace-input ${E ? "has-error" : ""}`
              }
            ),
            E && /* @__PURE__ */ m("span", { className: "find-replace-error", title: E, children: "!" })
          ] }),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: k.length > 0 ? `${C + 1} of ${k.length}` : d ? "No results" : "" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: F,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(Rf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: L,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Wt, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: Z,
              disabled: k.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${k.length} matches`,
              children: /* @__PURE__ */ m(Lf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => h((_) => !_),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(If, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => w((_) => !_),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(Pf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => b((_) => !_),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(Of, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => x((_) => !_),
              className: `find-replace-btn ${S ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(Ts, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ m(St, { size: 16 })
            }
          )
        ] }),
        S && /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Ts, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: B,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (_) => p(_.target.value),
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
              onClick: K,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(_f, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const Lx = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), wt = Lx ? "⌘" : "Ctrl", Ix = ({ editor: e }) => {
  const [t, n] = j(!1), [r, o] = j(0), [s, i] = j(0), [a, c] = j(""), [l, d] = j(""), [u, f] = j(!1), [p, g] = j(!1);
  Q(() => {
    if (!e) return;
    const D = () => {
      const T = e.storage.selectAllOccurrences;
      T ? (n(T.isActive), o(T.ranges.length), i(T.allMatches.length), c(T.searchTerm), d(T.typedBuffer), f(T.isTypingReplace), g(T.isIncremental)) : (n(!1), o(0), i(0));
    }, C = () => {
      D();
    };
    return e.on("transaction", C), D(), () => {
      e.off("transaction", C);
    };
  }, [e]);
  const h = U(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = U(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), b = U(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = U(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), w = U(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), S = U(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), x = U(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), k = U(() => {
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
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: u ? /* @__PURE__ */ R(De, { children: [
        /* @__PURE__ */ m(xo, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ m(De, { children: /* @__PURE__ */ R("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ R(De, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: x,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${wt}+D)`,
            children: /* @__PURE__ */ m(la, { size: 14 })
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${wt}+Shift+L)`,
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
          title: `Bold all occurrences (${wt}+B)`,
          children: /* @__PURE__ */ m(Xs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${wt}+I)`,
          children: /* @__PURE__ */ m(Zs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${wt}+U)`,
          children: /* @__PURE__ */ m(Qs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(Js, { size: 14 })
        }
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(bn, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: S,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(St, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ R(De, { children: [
      /* @__PURE__ */ R("kbd", { children: [
        wt,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ R("kbd", { children: [
        wt,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ R("kbd", { children: [
        wt,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ R(De, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ R("kbd", { children: [
        wt,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, Px = Ln(Ix), qr = "-dismissed";
function Ox(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function _x(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, c] = j({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = V(null), d = V(""), u = V(0);
  Q(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + qr);
        if (b && !v) {
          let w = "";
          try {
            w = e.getHTML() || "";
          } catch {
            return;
          }
          b !== w && b.length > 50 && c((S) => ({ ...S, hasRecoverableContent: !0 }));
        }
      } catch (b) {
        console.warn("useAutoSave: Error checking for recoverable content", b);
      }
  }, [e, n, o]);
  const f = U(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const b = e.getHTML(), v = Ox(b);
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
  const p = U(() => {
    l.current && clearTimeout(l.current), f();
  }, [f]), g = U(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + qr), d.current = "", c({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (b) {
      console.warn("useAutoSave: Error clearing content", b);
    }
  }, [n]), h = U(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const b = localStorage.getItem(n);
      return b && e && !e.isDestroyed ? (c((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(b), d.current = b, localStorage.removeItem(n + qr), i?.(b);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), b) : null;
    } catch (b) {
      return console.warn("useAutoSave: Error recovering content", b), null;
    }
  }, [e, n, i]), y = U(() => {
    try {
      localStorage.setItem(n + qr, "true"), c((b) => ({ ...b, hasRecoverableContent: !1 }));
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
const $x = 200;
function Hx(e, t = {}) {
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
  }), a = V(null), c = V(""), l = U((d) => {
    const u = d.trim(), f = u.length > 0 ? u.split(/\s+/).filter((v) => v.length > 0).length : 0, p = u.replace(/\s/g, "").length, g = d.length;
    let h = 0, y = 0;
    r && (h = u.length > 0 ? u.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, y = u.length > 0 ? (u.match(/[.!?]+/g) || []).length : 0);
    const b = Math.max(1, Math.ceil(f / $x));
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
function Wx({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ R(De, { children: [
          /* @__PURE__ */ m($f, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ R("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ R(De, { children: [
          /* @__PURE__ */ m(Sc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ R(De, { children: [
          /* @__PURE__ */ m(In, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ R(De, { children: [
          /* @__PURE__ */ m(Hf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function zx({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ R(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(Wf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ R(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ m(da, { className: "w-4 h-4" }),
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
              children: /* @__PURE__ */ m(St, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
const Bx = /\[\[([^\[\]]+)\]\]$/, Fx = pc.create({
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
      Rn(
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
      new We({
        find: Bx,
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
}), xt = {
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
}, Ux = ["info", "note", "prompt", "resources", "todo"];
function Yx(e) {
  return e.length < 3 ? !1 : !!(xt.header.test(e) || xt.bold.test(e) || xt.list.test(e) || xt.taskList.test(e) || xt.codeBlock.test(e) || xt.callout.test(e) || xt.highlight.test(e) || xt.link.test(e) || xt.table.test(e));
}
function jx(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function Vx(e, t) {
  const { alt: n, align: r, width: o } = jx(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function mo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function ec(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${mo(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(Vx(i[1], i[2])) : o.push(`<p>${mo(s.trim())}</p>`);
  }
  return o.join("");
}
function tu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function nu(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", d = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, u = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${mo(f.text)}</p>` : i += `<li><p>${mo(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function tc(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return ec(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(nu(s)), s = []);
  };
  for (const a of r) {
    const c = tu(a);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && i();
      }
      s.push(c);
    } else
      i(), o.push(ec(a.trim()));
  }
  return i(), o.join("");
}
function Kx(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + tc(a) + "</th>";
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
        i += "<td>" + tc(u) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function Gx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (u) => {
    const f = u.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const g = Kx(u);
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
  }), Ux.forEach((u) => {
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
    a.length !== 0 && (i.push(nu(a)), a = []);
  };
  for (const u of s) {
    const f = tu(u);
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
    const g = f.split("|").map((w) => w.trim());
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
const qx = tt.create({
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
      new Pe({
        key: new Oe("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !Yx(i))
              return !1;
            n.preventDefault();
            const a = Gx(i);
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
}), nc = new Oe("collapsibleHeading");
function Xx(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function po(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, Xx(i, a, l));
    }
  }), n;
}
let Tn = null;
function ks(e, t, n) {
  const r = [], o = po(e, n.levels), s = [];
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
        qe.node(d, d + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": u,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const g = qe.widget(d + l.nodeSize - 1, () => {
        const h = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${u}"]`);
        if (h) {
          h.classList.contains("collapsed") !== f && (h.classList.remove("collapsed", "expanded"), h.classList.add(f ? "collapsed" : "expanded"), h.title = f ? "Click to expand" : "Click to collapse");
          const w = h.parentElement;
          if (w) return w;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const b = document.createElement("button");
        return b.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, b.setAttribute("data-heading-id", u), b.setAttribute("data-heading-level", String(l.attrs.level)), b.setAttribute("contenteditable", "false"), b.setAttribute("tabindex", "-1"), b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', b.title = f ? "Click to expand" : "Click to collapse", b.addEventListener("click", (v) => {
          v.preventDefault(), v.stopPropagation();
          const w = b.classList.contains("collapsed");
          b.classList.remove("collapsed", "expanded"), b.classList.add(w ? "expanded" : "collapsed"), b.title = w ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(u) ? t.collapsedHeadings.delete(u) : t.collapsedHeadings.add(u), Tn && Tn.dispatch(Tn.state.tr.setMeta("collapsibleHeading", { toggled: u }));
        }), y.appendChild(b), y;
      }, { side: 1, key: `chevron-${u}` });
      r.push(g);
    } else l.isBlock && c(d) && r.push(
      qe.node(d, d + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), ze.create(e, r);
}
function Zx(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = po(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
const Qx = tt.create({
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
        const i = po(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return po(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Pe({
        key: nc,
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
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: ks(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const i = n.getMeta("collapsibleHeading");
            return i || n.docChanged ? (n.docChanged && !i && Zx(o.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: ks(s.doc, e, t),
              docVersion: r.docVersion + 1
            }) : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = nc.getState(n);
            return r?.decorations ? r.decorations : ks(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Jx = /\[([^\]]+)\]\(([^)]+)\)$/, ek = /^(https?:\/\/|www\.)[^\s]+$/i, tk = tt.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new We({
        find: Jx,
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
      new Pe({
        key: new Oe("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!ek.test(s)) return !1;
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
}), nk = ["info", "note", "prompt", "resources", "todo"], rk = tt.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Pe({
        key: new Oe("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const d of nk)
              if (l === `\`\`\`${d}`) {
                n.preventDefault();
                const u = r.tr, f = a + c.indexOf("```");
                u.delete(f, i.pos);
                const p = e.schema.nodes.callout, g = e.schema.nodes.paragraph;
                if (p && g) {
                  const h = g.create(), y = p.create({ type: d }, tm.from(h));
                  u.insert(f, y);
                  const b = u.doc.resolve(f + 2);
                  u.setSelection(ct.near(b)), t.dispatch(u);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Xr = new Oe("searchHighlight"), ok = tt.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Xr, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Xr, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Pe({
        key: Xr,
        state: {
          init() {
            return ze.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(Xr), d = t.docChanged;
            if (!s)
              return ze.empty;
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
                    const b = h + y.index, v = h + y.index + y[0].length, w = f === c;
                    u.push(
                      qe.inline(b, v, {
                        class: w ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return ze.empty;
            }
            return ze.create(o.doc, u);
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
}), sk = new Oe("tabIndent");
function ak(e) {
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
const ik = tt.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Pe({
        key: sk,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = ak(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!ni(s)(n, r)) {
                const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && ni(l)(n, r);
              }
            } else if (!ri(s)(n, r)) {
              const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && ri(l)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), ck = new Oe("expandSelection");
function Cs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const lk = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), dk = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), uk = "tableRow", fk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function mk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function pk(e, t, n) {
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
function hk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === uk) {
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
    if (dk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function yk(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    lk.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function vk(e) {
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
function bk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function wk(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function xk(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(mk(e, o, s)), wk(e, t) && (i(pk(e, o, s)), i(hk(e, o, s))), i(yk(e, o, s)), i(gk(e, o, s));
  const a = vk(e);
  if (a.length > 0) {
    const c = bk(a, o, s);
    for (const l of c)
      i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const kk = tt.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof Ku || o === 0 && s === n.content.size)
          return !0;
        const a = xk(n, o, s);
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
      new Pe({
        key: ck,
        props: {
          handleClick() {
            return Cs(e), !1;
          },
          handleTextInput() {
            return Cs(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && Cs(e), !1;
          }
        }
      })
    ];
  }
}), Ck = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Mk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Sk = new Oe("hexColorDecoration");
function ru(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Ck.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, d = l + a[0].length;
      if (d >= t && l <= n) {
        const u = a[0], f = Mk(u);
        r.push(
          qe.inline(l, d, {
            class: "hex-color-swatch",
            style: `background-color: ${u}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function Tk(e) {
  const t = ru(e, 0, e.content.size);
  return ze.create(e, t);
}
const Ek = pc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Pe({
        key: Sk,
        state: {
          init(e, { doc: t }) {
            return Tk(t);
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
              const i = ru(e.doc, s.from, s.to);
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
}), Ae = new Oe("selectAllOccurrences");
function rc(e, t, n, r, o) {
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
function _t(e, t) {
  const n = Ae.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function Dk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Ee(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Nk = tt.create({
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
        const c = rc(t.state.doc, o, s, i, a);
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Ae, { activate: !0 })), !0);
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
          const c = rc(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = Dk(c, s), d = c[l];
          return r.isActive = !0, r.ranges = [d], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = c, r.nextMatchIndex = (l + 1) % c.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Ae, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Ae, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Ee(this.storage), t && t(e.setMeta(Ae, { deactivate: !0 })), !0),
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
              const c = _t(a, this.storage);
              this.storage.ranges = c, c.length === 0 && Ee(this.storage);
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
        return Ee(this.storage), !0;
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
              const s = _t(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Ee(this.storage);
            }
          } catch {
          }
        }, 10) : Ee(this.storage), !0;
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
      new Pe({
        key: Ae,
        state: {
          init() {
            return ze.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Ae);
            if (s?.deactivate || !e.isActive)
              return ze.empty;
            if (s?.activate || s?.refresh) {
              const i = [];
              for (const a of e.ranges) {
                i.push(
                  qe.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const c = document.createElement("span");
                c.className = "select-all-multi-cursor", c.setAttribute("aria-hidden", "true"), i.push(
                  qe.widget(a.to, c, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return ze.create(o.doc, i);
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
              Ee(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Ae, { deactivate: !0 }));
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
              Ee(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), nm(t.state, t.dispatch), setTimeout(() => {
                  const s = _t(t);
                  e.ranges = s, s.length === 0 && Ee(e);
                }, 10), !0;
              }
              Ee(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, rm(t.state, t.dispatch), setTimeout(() => {
                  const s = _t(t);
                  e.ranges = s, s.length === 0 && Ee(e);
                }, 10), !0;
              }
              Ee(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = _t(t);
                if (r.length === 0) {
                  Ee(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Ae, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = _t(t);
                  e.ranges = a, a.length === 0 && Ee(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Ee(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Ae, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), Ee(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Ae, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Ee(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Ee(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
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
            const s = _t(t);
            if (s.length === 0) {
              Ee(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Ae, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = _t(t);
              e.ranges = c, c.length === 0 && Ee(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function Ak(e) {
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
        const b = Array.from(f.childNodes), v = [], w = [];
        b.forEach((x) => {
          if (x.nodeType === Node.ELEMENT_NODE) {
            const k = x;
            if (k.tagName === "UL" || k.tagName === "OL" || k.tagName === "P")
              w.push(x);
            else if (k.tagName === "IMG" || k.tagName === "FIGURE")
              if (k.tagName === "IMG") {
                const D = n.createElement("figure");
                D.className = "image-resizer";
                const C = k.getAttribute("data-align") || "left", T = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[C] || "margin-right: auto;";
                D.style.cssText = T, D.appendChild(k.cloneNode(!0)), w.push(D);
              } else
                w.push(x);
            else
              v.push(x);
          } else
            v.push(x);
        });
        const S = w.filter((x) => {
          if (x.nodeType === Node.ELEMENT_NODE) {
            const k = x;
            if (k.tagName === "P" && !k.textContent?.trim() && !k.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", v.length > 0) {
          const x = n.createElement("p");
          v.forEach((k) => x.appendChild(k)), x.firstChild && x.firstChild.nodeType === Node.TEXT_NODE && (x.firstChild.textContent = (x.firstChild.textContent || "").replace(/^\s+/, "")), (x.textContent?.trim() || x.querySelector("img, figure, code, br")) && f.appendChild(x);
        }
        S.forEach((x) => f.appendChild(x));
      }
    }), l && !d && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function Rk(e) {
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
function Lk(e) {
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
                  const x = n.createElement("p");
                  h.forEach((k) => x.appendChild(k.cloneNode(!0))), x.textContent?.trim() && l.push(x), h.length = 0;
                }
                const b = y, v = n.createElement("figure");
                v.className = "image-resizer";
                const w = b.getAttribute("data-align") || "left", S = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = S[w] || "margin-right: auto;", v.appendChild(b.cloneNode(!0)), l.push(v);
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
function Ik(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function ro(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), c = s.after(s.depth);
  o.replaceWith(a, c, i);
  const l = a + i.nodeSize;
  if (l < o.doc.content.size) {
    const d = o.doc.resolve(l);
    d.nodeAfter && d.nodeAfter.isTextblock ? o.setSelection(ct.create(o.doc, l + 1)) : d.nodeAfter && o.setSelection(ct.near(o.doc.resolve(l)));
  } else {
    const u = r.schema.nodes.paragraph.create();
    o.insert(l, u), o.setSelection(ct.create(o.doc, l + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function ho(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Pk(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function oc(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? Pk(r) : r.trim() ? `<p>${ho(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${ho(e)}</p>`;
}
function Ok(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function _k(e) {
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
function $k(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let c = r.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (l.length <= 1 && !a)
        return s ? `${n}${oc(c)}${o}` : t;
      const d = [];
      let u = [];
      const f = () => {
        u.length !== 0 && (d.push(_k(u)), u = []);
      };
      for (const p of l) {
        const g = Ok(p);
        if (g) {
          if (u.length > 0) {
            const h = u[0].type;
            g.depth === 0 && g.type !== h && f();
          }
          u.push(g);
        } else
          f(), d.push(oc(p.trim()));
      }
      return f(), `${n}${d.join("")}${o}`;
    }
  );
}
function Hk(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: c
  } = n;
  let l = e;
  l = Rk(l);
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
    const h = p.split("|").map((x) => x.trim());
    let y = "", b = "left", v = null;
    h.length === 1 ? y = h[0] : h.length === 2 ? (y = h[0], /^\d+$/.test(h[1]) ? v = h[1] : ["left", "center", "right"].includes(h[1]) ? b = h[1] : y = p) : h.length === 3 ? (y = h[0], ["left", "center", "right"].includes(h[1]) && (b = h[1]), /^\d+$/.test(h[2]) && (v = h[2])) : y = p;
    const w = v ? ` width="${v}" style="width: ${v}px"` : "", S = ` data-align="${b}"`;
    return `<img src="${g.trim()}" alt="${y}"${S}${w} />`;
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
function Wk(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = Ak(t), t = Lk(t), t = Ik(t), t = $k(t), t;
}
function zk(e, t, n = {}) {
  const r = Hk(e, t, n), o = t(r);
  return Wk(o);
}
function Bk() {
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
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
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
      const u = e.type === "image/png" || e.type === "image/gif", f = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, g = l.toDataURL(f, p), h = Uk(g, e.name);
      r({ dataUrl: g, file: h, width: a, height: c });
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
async function sc(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!Yk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = Bk();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const u = await Vk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = u.dataUrl, i = u.file, s = Math.min(u.width, 600);
    } else {
      o = await Fk(e), i = e;
      const u = await jk(o);
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
      return console.warn("Image upload failed, removing placeholder:", u), Kk(t, o, e.name), n.onUploadError?.(`Upload failed: ${u instanceof Error ? u.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function ac(e) {
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
const Gk = tt.create({
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
      new Pe({
        key: new Oe("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = ac(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              sc(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = ac(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const c = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (c) {
              const l = n.state.tr.setSelection(
                ct.near(n.state.doc.resolve(c.pos))
              );
              n.dispatch(l);
            }
            return a.forEach((l) => {
              sc(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function qk({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = j(!1), [o, s] = j(0), i = U((d) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer?.types.includes("Files") && (s((u) => u + 1), r(!0));
  }, []), a = U((d) => {
    d.preventDefault(), d.stopPropagation(), s((u) => {
      const f = u - 1;
      return f === 0 && r(!1), f;
    });
  }, []), c = U((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), l = U((d) => {
    d.preventDefault(), d.stopPropagation(), r(!1), s(0);
  }, []);
  return Q(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", i), d.addEventListener("dragleave", a), d.addEventListener("dragover", c), d.addEventListener("drop", l), () => {
      d.removeEventListener("dragenter", i), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", c), d.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ R("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(zf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ R("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function Xk({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = j(e), [c, l] = j(t), d = V(null), u = V(null);
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
    let w = n.x - 160, S = n.y + 10;
    return w + 320 > window.innerWidth - 16 && (w = window.innerWidth - 320 - 16), w < 16 && (w = 16), S + 280 > window.innerHeight - 16 && (S = n.y - 280 - 10), S < 16 && (S = 16), { left: w, top: S };
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
              children: /* @__PURE__ */ m(St, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ R("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ R("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(ea, { className: "w-3.5 h-3.5" }),
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
              /* @__PURE__ */ m(xo, { className: "w-3.5 h-3.5" }),
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
              children: /* @__PURE__ */ m(bn, { className: "w-4 h-4" })
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
                  /* @__PURE__ */ m(In, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(Nt, { children: h });
}
function Zr(e) {
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
      let w;
      for (v.regex.lastIndex = 0; (w = v.regex.exec(a)) !== null; )
        h.push({
          start: c + w.index,
          end: c + w.index + w[0].length,
          type: v.type,
          content: w[0]
        });
    }
    h.sort((v, w) => v.start - w.start);
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
function ic(e) {
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
function Qt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function Qr(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return Qt(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], d = i + l.length, u = t.filter((p) => p.start >= i && p.start < d);
      let f = i;
      for (const p of u)
        p.start > f && (o += Qt(e.substring(f, p.start))), o += `<span class="${ic(p.type)}">${Qt(p.content)}</span>`, f = p.end;
      f < d && (o += Qt(e.substring(f, d))), c < s.length - 1 && (o += `
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
      p.start > f && (o += Ms(e, f, p.start, null, a)), o += Ms(e, p.start, p.end, ic(p.type), a), f = p.end;
    f < d && (o += Ms(e, f, d, null, a)), c < s.length - 1 && (o += `
`), i = d + 1;
  }
  return o;
}
function Ms(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const c = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const l = Qt(e.substring(c, i)), d = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${d}">${l}</mark></span>` : s += `<mark class="${d}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = Qt(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function Zk({
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
  const l = V(null), d = V(null), u = V(null), f = V(null), p = 5e3, g = 80, [h, y] = j(() => {
    const C = Zr(e);
    return Qr(e, C, i, a);
  }), b = V(null), v = Jt(() => {
    if (e.length <= p) {
      const C = Zr(e), T = Qr(e, C, i, a);
      return b.current && (clearTimeout(b.current), b.current = null), T;
    }
    return null;
  }, [e, i, a]);
  Q(() => {
    if (e.length <= p) {
      const C = Zr(e);
      y(Qr(e, C, i, a));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const C = Zr(e);
      y(Qr(e, C, i, a)), b.current = null;
    }, g), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, i, a]);
  const w = v ?? h, S = U(() => {
    const C = l.current, T = d.current, E = u.current;
    if (C) {
      const N = E?.parentElement, A = N ? N.clientHeight : 200;
      C.style.height = "auto";
      const P = Math.max(C.scrollHeight, A, 200);
      C.style.height = `${P}px`, T && (T.style.height = `${P}px`);
    }
  }, []);
  Q(() => {
    const C = l.current;
    if (!C) return;
    const T = (E) => {
      const N = C.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: A, scrollHeight: P, clientHeight: O } = N, $ = A <= 0, B = A + O >= P - 1;
      (E.deltaY > 0 && !B || E.deltaY < 0 && !$) && (E.preventDefault(), N.scrollTop += E.deltaY);
    };
    return C.addEventListener("wheel", T, { passive: !1 }), () => C.removeEventListener("wheel", T);
  }, []);
  const x = U(() => {
  }, []);
  Q(() => {
    S();
  }, [e, S]), Q(() => {
    o && l.current && l.current.focus();
  }, [o]), Q(() => {
    if (f.current && l.current) {
      const { start: C, end: T } = f.current;
      l.current.selectionStart = C, l.current.selectionEnd = T, f.current = null;
    }
  }, [e]);
  const k = U((C) => {
    const T = C.target;
    f.current = {
      start: T.selectionStart,
      end: T.selectionEnd
    }, t(T.value);
  }, [t]), D = U((C) => {
    const T = C.currentTarget, E = T.selectionStart, N = T.selectionEnd, A = T.value, P = E !== N;
    if (c) {
      if (C.key === "`" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(E, N), $ = A.substring(0, E) + "`" + O + "`" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t($);
        } else if (A[E] === "`")
          f.current = { start: E + 1, end: E + 1 }, t(A), T.selectionStart = T.selectionEnd = E + 1;
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
        const $ = A.substring(0, E) + "**" + A.substring(N);
        f.current = { start: E + 1, end: E + 1 }, t($);
        return;
      }
      if (C.key === "_" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const $ = A.substring(E, N), B = A.substring(0, E) + "_" + $ + "_" + A.substring(N);
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
          const $ = A.substring(E, N), B = A.substring(0, E) + "~" + $ + "~" + A.substring(N);
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
          const O = A.substring(E, N), $ = A.substring(0, E) + "[" + O + "]()" + A.substring(N);
          f.current = { start: N + 3, end: N + 3 }, t($);
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
        const O = A[E - 1], $ = A[E], B = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [q, I] of B)
          if (O === q && $ === I) {
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
        const O = A.substring(0, E), $ = A.substring(E, N), B = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), F = O.substring(I), X = (F + $).split(`
`), K = X.map((_) => _.startsWith("  ") ? _.substring(2) : _.startsWith("	") ? _.substring(1) : _), Z = L + K.join(`
`) + B, te = (F + $).length - K.join(`
`).length;
        f.current = {
          start: Math.max(I, E - (X[0].length - K[0].length)),
          end: N - te
        }, t(Z);
      } else if (E === N) {
        const O = A.substring(0, E) + "  " + A.substring(N);
        f.current = { start: E + 2, end: E + 2 }, t(O);
      } else {
        const O = A.substring(0, E), $ = A.substring(E, N), B = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), X = (O.substring(I) + $).split(`
`), K = X.map((te) => "  " + te), Z = L + K.join(`
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
        dangerouslySetInnerHTML: { __html: w || `<span class="md-placeholder">${Qt(n)}</span>` },
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
        onScroll: x,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let cc = 0, Ks = 0, ou = 0;
function Qk(e) {
  Ks++, ou = e;
}
const Jk = Ln(function({
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
  }), c = V([]), l = V(performance.now()), d = V(0), u = V(0), f = V(0), p = V(0), [g, h] = j(new Array(60).fill(0)), [y, b] = j(new Array(60).fill(0));
  Q(() => {
    if (!t || !r) return;
    const D = () => {
      const C = performance.now();
      queueMicrotask(() => {
        const T = performance.now() - C;
        Qk(T);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), Q(() => {
    if (!t) return;
    let D = 0, C = performance.now(), T = 0;
    const E = (N) => {
      const A = N - l.current;
      if (l.current = N, c.current.push({ time: N, duration: A }), c.current.length > 120 && (c.current = c.current.slice(-120)), A > 16.67 && u.current++, D++, N - C >= 1e3) {
        T = D, D = 0, C = N;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((K, Z) => K + Z.duration, 0) / P.length : 0, $ = P.length > 0 ? Math.max(...P.map((K) => K.duration)) : 0, B = performance.memory, q = B ? B.usedJSHeapSize / (1024 * 1024) : 0, I = B ? B.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, F = cc - f.current, X = Ks - p.current;
        f.current = cc, p.current = Ks, a({
          fps: T,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(q * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: F,
          transactionCount: X,
          lastTransactionTime: Math.round(ou * 100) / 100,
          domNodes: L,
          longFrames: u.current
        }), h((K) => [...K.slice(1), T]), b((K) => [...K.slice(1), O]), u.current = 0;
      }
      d.current = requestAnimationFrame(E);
    };
    return d.current = requestAnimationFrame(E), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const v = U(() => {
    n?.();
  }, [n]), w = U(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const S = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", x = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", k = (D, C, T) => {
    const A = D.map((P, O) => {
      const $ = O / (D.length - 1) * 120, B = 24 - Math.min(P, C) / C * 24;
      return `${$},${B}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: A,
        fill: "none",
        stroke: T,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ R("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ R("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ R("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ m(Bf, { size: 14 }),
        /* @__PURE__ */ m("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: w, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ m(Tc, { size: 12 }) : /* @__PURE__ */ m(Ec, { size: 12 }) }),
        /* @__PURE__ */ m("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ m(St, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ R("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: S(i.fps) }, children: i.fps })
        ] }),
        k(g, 70, S(i.fps))
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ R("span", { className: "perf-value", style: { color: x(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ R("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Max" }),
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
class e1 extends af {
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
      return /* @__PURE__ */ m("div", { className: ie("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ R("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(Ff, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ R("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ R(
            Ht,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(da, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ R(
            Ht,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(bn, { className: "w-4 h-4" }),
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
              className: ie(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ m(Wt, { className: "w-3 h-3" }) : /* @__PURE__ */ m(xc, { className: "w-3 h-3" }),
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
                  children: o ? /* @__PURE__ */ R(De, { children: [
                    /* @__PURE__ */ m(Uf, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ R(De, { children: [
                    /* @__PURE__ */ m(Pn, { className: "w-3 h-3" }),
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
function t1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function n1(e, t) {
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
function r1(e) {
  const [t, n] = cf(n1, { status: "idle" }), r = V(null), o = U(async (a, c, l, d, u) => {
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
  }, [e]), s = U(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = U(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const o1 = {
  SpellCheck: jf,
  RefreshCw: Yf,
  Minimize2: Ec,
  Maximize2: Tc,
  FileText: ca,
  MessageSquare: Dc,
  Sparkles: wo
};
function s1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = j(""), [a, c] = j(!1), l = V(null), d = V(null), u = e.filter((y) => y.scope === t || y.scope === "both");
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
  const p = U(() => {
    const b = u.length * 40 + (a ? 56 : 0) + 16, v = window.innerWidth, w = window.innerHeight;
    let S = o.top, x = o.left;
    return x + 260 > v - 8 && (x = v - 260 - 8), x < 8 && (x = 8), S + b > w - 8 && (S = o.top - b - 8), S < 8 && (S = 8), { top: S, left: x };
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
              /* @__PURE__ */ m(Dc, { size: 14, className: "text-muted-foreground shrink-0" }),
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
              const b = y.icon ? o1[y.icon] : wo;
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
  return /* @__PURE__ */ m(Nt, { onMouseDown: (y) => y.preventDefault(), children: h });
}
function a1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = V(null), a = V(null), [c, l] = j(!1), [d, u] = j(0);
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
  const f = Jt(() => {
    const C = window.innerWidth, T = window.innerHeight;
    let E = t.selectionCenterX - 380 / 2;
    E + 380 > C - 8 && (E = C - 380 - 8), E < 8 && (E = 8);
    const N = T - t.selectionBottom - 8, A = t.selectionTop - 8, P = d || 200;
    let O, $ = !1;
    return N >= P || N >= A ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, $ = !0), O < 8 && (O = 8), O + P > T - 8 && (O = T - P - 8), { top: O, left: E, placedAbove: $ };
  }, [t, d]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", h = e.status === "streaming", y = e.status === "complete", b = e.status === "error", v = U(() => {
    navigator.clipboard.writeText(p), l(!0), setTimeout(() => l(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const w = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", S = /* @__PURE__ */ m(
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
          ${w}
        `,
          children: [
            /* @__PURE__ */ R("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ R("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                h && /* @__PURE__ */ m(Sc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ m("span", { className: "font-medium", children: b ? "Error" : g }),
                h && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (x) => {
                    x.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(St, { size: 14, className: "text-muted-foreground" })
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
              (y || b) && /* @__PURE__ */ R(De, { children: [
                y && /* @__PURE__ */ R(De, { children: [
                  /* @__PURE__ */ m(
                    yn,
                    {
                      icon: Ts,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ m(
                    yn,
                    {
                      icon: la,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ m(
                    yn,
                    {
                      icon: c ? In : Pn,
                      label: c ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ m(
                  yn,
                  {
                    icon: da,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  yn,
                  {
                    icon: St,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              h && /* @__PURE__ */ R(De, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  yn,
                  {
                    icon: St,
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
  return /* @__PURE__ */ m(Nt, { onMouseDown: (x) => x.preventDefault(), children: S });
}
function yn({
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
const su = "paragon-editor-toc-width", i1 = 280, au = 200, iu = 500;
function lc() {
  try {
    const e = localStorage.getItem(su);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= au && t <= iu)
        return t;
    }
  } catch {
  }
  return i1;
}
function c1(e) {
  try {
    localStorage.setItem(su, String(e));
  } catch {
  }
}
function l1(e, t, n) {
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
function d1(e) {
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
function dc(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const uc = Ln(function({
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
  const [v, w] = j([]), [S, x] = j(null), [k, D] = j(n), [C, T] = j(/* @__PURE__ */ new Set()), [E, N] = j(() => {
    if (u) {
      const z = parseInt(u, 10);
      return isNaN(z) ? lc() : z;
    }
    return lc();
  }), A = V(null), P = V(null), O = V(!1), $ = V(0), B = V(0);
  Q(() => {
    D(n);
  }, [n]);
  const q = U((z) => {
    z.preventDefault(), z.stopPropagation(), O.current = !0, $.current = z.clientX, B.current = E, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [E]);
  Q(() => {
    const z = (ee) => {
      if (!O.current) return;
      const ue = f === "right" ? $.current - ee.clientX : ee.clientX - $.current, fe = Math.min(iu, Math.max(au, B.current + ue));
      N(fe);
    }, Y = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((ee) => (c1(ee), ee)));
    };
    return document.addEventListener("mousemove", z), document.addEventListener("mouseup", Y), () => {
      document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", Y);
    };
  }, [f]);
  const I = U(() => {
    if (!t || t.isDestroyed) return;
    const z = l1(t, s, i);
    w(z), S && !z.find((Y) => Y.id === S) && x(null);
  }, [t, s, i, S]);
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
    const Y = () => {
      const fe = z.getBoundingClientRect();
      let ke = null;
      for (let Ne = v.length - 1; Ne >= 0; Ne--) {
        const Ke = v[Ne], At = dc(t, Ke.pos);
        if (At && At.getBoundingClientRect().top - fe.top <= p + 10) {
          ke = Ke.id;
          break;
        }
      }
      !ke && v.length > 0 && (ke = v[0].id), x(ke);
    };
    let ee;
    const ue = () => {
      cancelAnimationFrame(ee), ee = requestAnimationFrame(Y);
    };
    return z.addEventListener("scroll", ue, { passive: !0 }), Y(), () => {
      z.removeEventListener("scroll", ue), cancelAnimationFrame(ee);
    };
  }, [t, v, c, k, p, b]);
  const L = U((z) => {
    if (!t || t.isDestroyed) return;
    const Y = dc(t, z.pos);
    if (Y) {
      const ee = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ee) {
        const ue = ee.getBoundingClientRect(), ke = Y.getBoundingClientRect().top - ue.top + ee.scrollTop;
        ee.scrollTo({ top: ke - p, behavior: "smooth" });
      } else
        Y.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(z.pos + 1);
    } catch {
    }
    x(z.id), g?.(z);
  }, [t, p, g, b]), F = U(() => {
    const z = !k;
    D(z), r?.(z);
  }, [k, r]), X = U((z) => {
    T((Y) => {
      const ee = new Set(Y);
      return ee.has(z) ? ee.delete(z) : ee.add(z), ee;
    });
  }, []), K = U((z, Y, ee = 0) => {
    if (h)
      return h(z, Y, () => L(z));
    const ue = (z.level - s) * 14, fe = l && z.children && z.children.length > 0, ke = C.has(z.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${Y ? "toc-item-active" : ""} toc-level-${z.level}`,
        style: { paddingLeft: `${ue + 10}px` },
        children: /* @__PURE__ */ R(
          "button",
          {
            className: "toc-item-button",
            onClick: () => L(z),
            title: z.text,
            children: [
              fe && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Ne) => {
                    Ne.stopPropagation(), X(z.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: ke ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
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
  }, [h, L, l, s, a, C, X]), Z = U((z, Y = 0) => z.map((ee) => {
    const ue = S === ee.id, fe = C.has(ee.id), ke = ee.children && ee.children.length > 0;
    return /* @__PURE__ */ R("div", { children: [
      K(ee, ue, Y),
      ke && !fe && /* @__PURE__ */ m("div", { className: "toc-children", children: Z(ee.children, Y + 1) })
    ] }, ee.id);
  }), [S, C, K]), te = U(() => v.map((z) => {
    const Y = S === z.id;
    return K(z, Y);
  }), [v, S, K]);
  if (!t) return null;
  const _ = l ? d1(v) : [];
  return /* @__PURE__ */ R(De, { children: [
    y && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: F,
        title: k ? "Hide Table of Contents" : "Show Table of Contents",
        children: k ? /* @__PURE__ */ m(Vf, { size: 16 }) : /* @__PURE__ */ m(Kf, { size: 16 })
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
            ] }) : /* @__PURE__ */ m("div", { className: "toc-list", children: l ? Z(_) : te() }) })
          ] })
        ]
      }
    )
  ] });
});
let Mt = null, go = null;
async function cu() {
  if (Mt) return Mt;
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
      const d = l, u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), h = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", w = h && h > 0;
      return (v || w) && b.push(v ? y : "left"), w && b.push(String(h)), `![${b.join(" | ")}](${u})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const d = l.querySelector("img");
      if (!d) return c;
      const u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = d.getAttribute("width"), h = g ? parseInt(g, 10) : null, y = d.getAttribute("data-align") || "left", b = [p], v = y !== "left", w = h && h > 0;
      (v || w) && b.push(v ? y : "left"), w && b.push(String(h));
      const S = `![${b.join(" | ")}](${u})`, x = l.parentNode;
      return x && x.nodeName === "LI" ? `
` + S + `
` : `

` + S + `

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
      const b = h.getAttribute("data-type") === "taskItem", v = h.getAttribute("data-checked") === "true", w = s(h);
      b ? l.push(`${u}- [${v ? "x" : " "}] ${w}`) : f === "OL" ? l.push(`${u}${g + y}. ${w}`) : l.push(`${u}- ${w}`);
      const S = Array.from(h.childNodes).filter(
        (x) => x.nodeType === Node.ELEMENT_NODE && (x.nodeName === "UL" || x.nodeName === "OL")
      );
      for (const x of S)
        i(x, l, d + 1);
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
        const b = Array.from(h.querySelectorAll("th, td")), v = b.map((w) => a(w));
        if (y > 0 && b.length > 0 && b[0].nodeName === "TH" && (p = !0), f.push("| " + v.join(" | ") + " |"), y === 0) {
          const w = b.map(() => "---").join(" | ");
          f.push("| " + w + " |");
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
      return d ? `@${Iy(d)}@` : c;
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
  }), Mt = n, n;
}
function u1() {
  !go && !Mt && (go = cu().then((e) => (Mt = e, e)));
}
function f1() {
  return u1(), {
    turndown(e) {
      return Mt ? Mt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return Mt !== null;
    },
    async ready() {
      Mt || (go ? await go : await cu());
    }
  };
}
function m1() {
  const e = V(null);
  return e.current || (e.current = f1()), e.current;
}
function p1(e, t, n) {
  Q(() => {
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
          const { state: a } = e, { from: c, to: l } = a.selection;
          if (c !== l) {
            const d = a.doc.textBetween(c, l, " ");
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
            const { state: a } = e, { selection: c } = a, { $from: l } = c, d = l.nodeBefore?.textContent || "";
            if (d === "#####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 5, to: l.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (d === "####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 4, to: l.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (d === "###") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (d === "##") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 2, to: l.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (d === "#") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (d === "-" || d === "*") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(d)) {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - d.length, to: l.pos }).toggleOrderedList().run();
              return;
            }
            const u = /^(-\s*)?\[([ x])?\]$/.exec(d);
            if (u) {
              o.preventDefault();
              const f = u[2] === "x", p = a.schema.nodes.taskList, g = a.schema.nodes.taskItem;
              if (p && g) {
                const h = a.tr, y = l.pos - d.length, b = l.pos;
                h.delete(y, b);
                const w = h.doc.resolve(y).blockRange();
                if (w) {
                  const S = [
                    { type: p, attrs: {} },
                    { type: g, attrs: { checked: f } }
                  ];
                  h.wrap(w, S), e.view.dispatch(h);
                  return;
                }
              }
              e.chain().focus().deleteRange({ from: l.pos - d.length, to: l.pos }).toggleTaskList().run();
              return;
            }
            if (d === ">") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBlockquote().run();
              return;
            }
            if (d === "```") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).toggleCodeBlock().run();
              return;
            }
            if (d === "---" || d === "***") {
              o.preventDefault(), ro(e, l.pos - 3, l.pos);
              return;
            }
            if (d === "—-") {
              o.preventDefault(), ro(e, l.pos - 2, l.pos);
              return;
            }
            if (d === "—") {
              o.preventDefault(), ro(e, l.pos - 1, l.pos);
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
const h1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, lC = lf(function({
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
  onImageUploadComplete: w,
  onImageUploadError: S,
  onImageUpload: x,
  resolveImageSrc: k,
  showModeToggle: D = !0,
  // New props
  initialMode: C = "wysiwyg",
  onModeChange: T,
  onReady: E,
  onFocus: N,
  onBlur: A,
  onSelectionChange: P,
  onDestroy: O,
  onSave: $,
  onRecover: B,
  onWikiLinkClick: q,
  validateWikiLink: I,
  onWikiLinkSearch: L,
  onLinkClick: F,
  findReplaceOpen: X,
  onFindReplaceChange: K,
  renderToolbar: Z,
  renderFooter: te,
  disabledFeatures: _ = {},
  minHeight: z = "200px",
  maxHeight: Y,
  spellCheck: ee = !0,
  headingLevels: ue = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: fe = [1, 2, 3],
  // TOC props
  showTableOfContents: ke = !1,
  tocVisible: Ne = !0,
  onTocVisibilityChange: Ke,
  tocTitle: At = "",
  tocMinLevel: Bn = 1,
  tocMaxLevel: Fn = 4,
  tocShowLevelIndicators: xr = !1,
  tocHighlightActive: kr = !0,
  tocTreeView: Cr = !1,
  tocWidth: Mr = "240px",
  tocPosition: on = "right",
  tocScrollOffset: Un = 20,
  onTocItemClick: sn,
  renderTocItem: an,
  tocShowToggleButton: Sr = !0,
  // Raw markdown editor
  autoClosePairs: $o = !0,
  // Performance profiler
  showPerformanceProfiler: Ho = !1,
  onPerformanceProfilerClose: Wo,
  // Auto reorder checklist
  autoReorderChecklist: zo = !1,
  // Expand selection
  progressiveSelectAll: Tr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: Er = !1,
  enableHexColorHighlight: Bo = !1,
  enableCollapsibleHeadings: Dr = !1,
  // Performance mode
  performanceMode: Yn = "auto",
  // Error boundary
  onEditorError: Fo,
  // AI writing assistant
  aiActions: nt,
  onAIAction: cn,
  onAISetupRequired: ae
}, be) {
  const [se] = j(() => h1()), [pe, _e] = j(C), [me, jn] = j(""), He = V(C), mt = V(""), pt = V(null), [Vn, za] = j(0), Nr = !!(nt && nt.length > 0 && cn), { state: Be, executeAction: Ar, abort: uu, reset: Rt } = r1(cn), [Uo, Yo] = j(null), [fu, mu] = j({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), pu = V(cn);
  pu.current = cn;
  const Ba = V(ae);
  Ba.current = ae;
  const [hu, gu] = j([]), [yu, vu] = j(0), bu = U((H, G) => {
    gu(H), vu(G);
  }, []), jo = V(v), Vo = V(w), Ko = V(S), Go = V(x), qo = V(k), Fa = V(q), Xo = V(I), Zo = V(L);
  jo.current = v, Vo.current = w, Ko.current = S, Go.current = x, qo.current = k, Fa.current = q, Xo.current = I, Zo.current = L;
  const Ua = 2e3, [ht, wu] = j(() => Yn === "lightweight" ? !0 : Yn === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Ua : !1), Qo = V(0), Ya = V(ht);
  Ya.current = ht;
  const xu = Jt(() => {
    const H = [
      Hu.configure({
        heading: {
          levels: ue
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
      wm,
      xm,
      Mm,
      Wu.configure({
        placeholder: s,
        emptyEditorClass: "is-editor-empty"
      }),
      zu.configure({
        types: ["heading", "paragraph"]
      }),
      Bu.configure({
        multicolor: !0
      }),
      Fu.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      ef,
      tf,
      nf,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...ht ? [] : [rf],
      tk,
      ok,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...ht ? [] : [Nk],
      ik,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      om.extend({
        addInputRules() {
          const G = this.type;
          return [
            new We({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: de, range: ye }) => {
                const { tr: he } = de, Fe = ye.from, vt = ye.to;
                he.delete(Fe, vt);
                const Vt = he.doc.resolve(Fe), Gn = G.create(), Ir = Vt.before(Vt.depth), Pu = Vt.after(Vt.depth);
                he.replaceWith(Ir, Pu, Gn);
                const dn = Ir + Gn.nodeSize;
                if (dn < he.doc.content.size) {
                  const Pr = he.doc.resolve(dn);
                  Pr.nodeAfter && Pr.nodeAfter.isTextblock ? he.setSelection(ct.create(he.doc, dn + 1)) : Pr.nodeAfter && he.setSelection(ct.near(he.doc.resolve(dn)));
                } else {
                  const Ou = de.schema.nodes.paragraph.create();
                  he.insert(dn, Ou), he.setSelection(ct.create(he.doc, dn + 1));
                }
                he.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return _.tables || H.push(
      Uu.configure({
        resizable: !se,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Yu,
      um,
      fm,
      ...ht ? [] : [bm]
    ), _.taskLists || H.push(
      km.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Cm.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !se && !ht && H.push(
      Tm.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), _.codeBlocks || H.push(Nm), _.callouts || H.push(Om, rk), Dr && !_.collapsibleHeadings && !ht && H.push(
      Qx.configure({
        levels: fe
      })
    ), _.images || H.push(
      _m.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (G) => {
          Lr({
            isOpen: !0,
            src: G.src,
            alt: G.alt,
            pos: G.pos,
            position: { x: G.rect.left + G.rect.width / 2, y: G.rect.bottom }
          });
        },
        resolveImageSrc: qo.current ? ((...G) => qo.current(...G)) : void 0
      }),
      Gk.configure({
        maxFileSize: b,
        onUploadStart: jo.current ? ((...G) => jo.current(...G)) : void 0,
        onUploadComplete: Vo.current ? ((...G) => Vo.current(...G)) : void 0,
        onUploadError: Ko.current ? ((...G) => Ko.current(...G)) : void 0,
        onImageUpload: Go.current ? ((G, de) => Go.current(G, de)) : void 0
      })
    ), _.datePills || H.push(
      Oy.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), _.tagPills || H.push(
      Hy.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: Er
      })
    ), _.wikiLinks || H.push(
      Fx.configure({
        onWikiLinkClick: (G) => {
          console.log("WikiLink clicked:", G), Fa.current?.(G);
        },
        validateLink: (G) => Xo.current ? Xo.current(G) : !0
      })
    ), Tr && H.push(kk), Bo && !ht && H.push(Ek), _.markdownPaste || H.push(
      qx.configure({
        enableMarkdownPaste: !0
      })
    ), H;
  }, [s, se, b, ue, fe, _, Tr, Dr, ht]), gt = V(null), Ut = V(n), Yt = V(r), Jo = V(o), Kn = V(null);
  Ut.current = n, Yt.current = r, Jo.current = o;
  const W = _u({
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
    onCreate: ({ editor: H }) => {
      window.__tiptapEditor = H, E?.(H);
    },
    onDestroy: () => {
      O?.();
    },
    extensions: xu,
    content: t,
    editable: i,
    autofocus: a,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: ee ? "true" : "false"
      },
      handleClick: (H, G, de) => {
        if (F) {
          const he = de.target.closest("a");
          if (he) {
            const Fe = he.getAttribute("href");
            if (Fe && F(Fe, de) === !1)
              return de.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: H }) => {
      if (Yn === "auto" && (Qo.current++, Qo.current >= 50)) {
        Qo.current = 0;
        const de = H.state.doc.content.childCount > Ua;
        de !== Ya.current && wu(de);
      }
      gt.current && clearTimeout(gt.current), gt.current = setTimeout(() => {
        if (H.isDestroyed) return;
        const G = H.getHTML();
        (Ut.current || Yt.current) && (Ut.current?.(G), Yt.current?.(G));
      }, 150);
    },
    onFocus: () => {
      N?.();
    },
    onBlur: () => {
      if (gt.current && (clearTimeout(gt.current), gt.current = null, W && !W.isDestroyed)) {
        const H = W.getHTML();
        if ((Ut.current || Yt.current) && (Ut.current?.(H), Yt.current?.(H)), He.current === "wysiwyg" && Kn.current) {
          const G = Kn.current.turndown(H);
          mt.current = G, Jo.current?.(G);
        }
      }
      A?.();
    },
    onSelectionUpdate: ({ editor: H }) => {
      if (P) {
        const { from: G, to: de, empty: ye } = H.state.selection;
        P({ from: G, to: de, empty: ye });
      }
    }
  });
  Q(() => () => {
    if (gt.current && (clearTimeout(gt.current), gt.current = null, W && !W.isDestroyed)) {
      const H = W.getHTML();
      if ((Ut.current || Yt.current) && (Ut.current?.(H), Yt.current?.(H)), He.current === "wysiwyg" && Kn.current) {
        const G = Kn.current.turndown(H);
        mt.current = G, Jo.current?.(G);
      }
    }
  }, []);
  const [ja, Rr] = j(!1), [ln, Lr] = j(null), [ku, Cu] = j(!1), Mu = X !== void 0 ? X : ku, Lt = U((H) => {
    Cu(H), K?.(H);
  }, [K]), [Su, es] = j(0), [Tu, Eu] = j(""), yt = _x(W, {
    storageKey: p,
    debounceMs: g,
    enabled: f,
    onSave: (H) => {
      $?.(H);
    },
    onRecover: (H) => {
      B?.(H);
    }
  }), It = m1();
  Kn.current = It;
  const Va = V(!1);
  Q(() => {
    if (!Va.current && C === "markdown" && W && !W.isDestroyed && It) {
      const H = W.getHTML(), G = It.turndown(H);
      jn(G), mt.current = G, Va.current = !0;
    }
  }, [W, It, C]);
  const rt = U(async (H) => {
    if (W) {
      if (H === "markdown" && He.current === "wysiwyg") {
        const G = W.getHTML(), de = It.turndown(G);
        jn(de), mt.current = de;
      } else if (H === "wysiwyg" && He.current === "markdown") {
        const { marked: G } = await import("./marked.esm-Tjr8Gfse.js"), de = (Fe) => G.parse(Fe, { async: !1, breaks: !0 }), ye = {
          enableTagAutoDetect: Er,
          disableTagPills: !!_.tagPills,
          isValidTag: vn,
          normalizeTag: or,
          parseDateFromMarkdown: qt,
          getDateVariant: ba
        }, he = zk(mt.current, de, ye);
        queueMicrotask(() => {
          W.isDestroyed || W.commands.setContent(he);
        });
      }
      _e(H), He.current = H, T?.(H);
    }
  }, [W, It, T]), Ka = U((H) => {
    jn(H), mt.current = H, o?.(H);
  }, [o]), jt = Hx(W, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: d
  });
  df(be, () => ({
    getEditor: () => W,
    getHTML: () => W?.getHTML() || "",
    getMarkdown: () => W ? It.turndown(W.getHTML()) : "",
    getText: () => W?.getText() || "",
    setContent: (H) => {
      W && !W.isDestroyed && queueMicrotask(() => {
        W.commands.setContent(H);
      });
    },
    clearContent: () => {
      W && !W.isDestroyed && W.commands.clearContent();
    },
    focus: (H) => {
      W && !W.isDestroyed && W.commands.focus(H);
    },
    blur: () => {
      W && !W.isDestroyed && W.commands.blur();
    },
    isEmpty: () => W?.isEmpty || !0,
    isFocused: () => W?.isFocused || !1,
    getMode: () => He.current,
    setMode: (H) => rt(H),
    toggleMode: () => {
      const H = He.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return rt(H), H;
    },
    getWordCount: () => ({
      words: jt.words,
      characters: jt.characters,
      charactersWithSpaces: jt.charactersWithSpaces
    }),
    undo: () => W?.commands.undo(),
    redo: () => W?.commands.redo(),
    canUndo: () => W?.can().undo() || !1,
    canRedo: () => W?.can().redo() || !1,
    insertContent: (H) => W?.commands.insertContent(H),
    insertImage: (H, G = "") => W?.commands.setImage({ src: H, alt: G }),
    insertTable: (H = 3, G = 3) => W?.commands.insertTable({ rows: H, cols: G, withHeaderRow: !0 }),
    insertCodeBlock: (H) => {
      H ? W?.commands.setCodeBlock({ language: H }) : W?.commands.setCodeBlock();
    },
    insertCallout: (H = "info") => W?.commands.insertCallout?.({ type: H }),
    insertHorizontalRule: () => {
      W && ro(W, W.state.selection.from, W.state.selection.from);
    },
    toggleBold: () => W?.commands.toggleBold(),
    toggleItalic: () => W?.commands.toggleItalic(),
    toggleUnderline: () => W?.commands.toggleUnderline(),
    toggleStrike: () => W?.commands.toggleStrike(),
    toggleCode: () => W?.commands.toggleCode(),
    toggleHighlight: () => W?.commands.toggleHighlight(),
    setHeading: (H) => {
      H === 0 ? W?.commands.setParagraph() : W?.commands.setHeading({ level: H });
    },
    toggleBulletList: () => W?.commands.toggleBulletList(),
    toggleOrderedList: () => W?.commands.toggleOrderedList(),
    toggleTaskList: () => W?.commands.toggleTaskList(),
    toggleBlockquote: () => W?.commands.toggleBlockquote(),
    setLink: (H) => W?.commands.setLink({ href: H }),
    unsetLink: () => W?.commands.unsetLink(),
    openFindReplace: () => {
      Lt(!0), es((H) => H + 1);
    },
    closeFindReplace: () => Lt(!1),
    save: () => yt.save(),
    clearSavedContent: () => yt.clear(),
    getSelectedText: () => {
      if (!W) return "";
      const { from: H, to: G } = W.state.selection;
      return W.state.doc.textBetween(H, G, " ");
    },
    isEditable: () => W?.isEditable || !1,
    setEditable: (H) => W?.setEditable(H),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!W) return [];
      const H = [];
      return W.state.doc.descendants((G, de) => {
        if (G.type.name === "heading") {
          const ye = G.attrs.level, he = G.textContent.trim();
          he && H.push({ id: `toc-heading-${de}`, text: he, level: ye, pos: de });
        }
      }), H;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (H) => {
      if (!(!W || W.isDestroyed))
        try {
          const G = W.state.doc.resolve(H), de = W.view.nodeDOM(G.before(G.depth + 1));
          if (de instanceof HTMLElement) {
            const ye = W.view.dom.closest(".editor-content-wrapper");
            if (ye) {
              const he = ye.getBoundingClientRect(), vt = de.getBoundingClientRect().top - he.top + ye.scrollTop;
              ye.scrollTo({ top: vt - 20, behavior: "smooth" });
            } else
              de.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          W.commands.setTextSelection(H + 1);
        } catch {
        }
    }
  }), [W, It, rt, jt, yt, Lt]), Q(() => {
    const H = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => He.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (G) => {
        if (G !== "wysiwyg" && G !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        rt(G);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const G = He.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return rt(G), G;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        rt("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        rt("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => He.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => He.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => He.current === "markdown" ? mt.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (G) => {
        const de = (ye) => {
          G(ye.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", de), () => window.removeEventListener("paragon-editor-mode-change", de);
      }
    };
    return window.__paragonEditorModeAPI = H, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [rt]), Q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: pe } }));
  }, [pe]);
  const Du = Jt(() => ({
    openLinkPopover: () => Rr(!0),
    openFindReplace: (H) => {
      H && Eu(H), Lt(!0), es((G) => G + 1);
    },
    openFindReplaceWithReplace: () => {
      Lt(!0);
    }
  }), [Lt]);
  p1(W, se, Du);
  const Ga = U((H, G) => {
    if (!Nr) {
      Ba.current?.();
      return;
    }
    if (!W) return;
    let de = { top: 0, left: 0 };
    if (G) {
      const ye = G.getBoundingClientRect();
      de = { top: ye.bottom + 4, left: ye.left };
    } else {
      const { from: ye, to: he } = W.state.selection, Fe = W.view.coordsAtPos(ye), vt = W.view.coordsAtPos(he);
      de = { top: vt.bottom + 8, left: (Fe.left + vt.left) / 2 };
    }
    Yo({ scope: H, position: de });
  }, [Nr, W]), Nu = U((H, G) => {
    if (!W || !nt) return;
    const de = nt.find((Ir) => Ir.id === H);
    if (!de) return;
    const { from: ye, to: he } = W.state.selection, Fe = ye !== he ? W.state.doc.textBetween(ye, he, `
`) : "", vt = de.scope === "document" || !Fe ? W.getText() : Fe, Vt = W.view.coordsAtPos(ye), Gn = W.view.coordsAtPos(he);
    mu({
      selectionTop: Vt.top,
      selectionBottom: Gn.bottom,
      selectionCenterX: (Vt.left + Gn.right) / 2
    }), Yo(null), Ar(H, de.label, vt, { from: ye, to: he }, G);
  }, [W, nt, Ar]), Au = U(() => {
    if (!W || Be.status !== "complete") return;
    const { selectionRange: H, result: G } = Be;
    W.chain().focus().setTextSelection(H).deleteSelection().insertContent(G).run(), Rt();
  }, [W, Be, Rt]), Ru = U(() => {
    if (!W || Be.status !== "complete") return;
    const { selectionRange: H, result: G } = Be;
    W.chain().focus().setTextSelection(H.to).insertContent(`
` + G).run(), Rt();
  }, [W, Be, Rt]), Lu = U(() => {
    if (!(Be.status !== "complete" && Be.status !== "error"))
      if (Be.status === "complete") {
        const { action: H, actionLabel: G, inputText: de, selectionRange: ye } = Be;
        Rt(), Ar(H, G, de, ye);
      } else
        Rt();
  }, [Be, Rt, Ar]);
  if (!W)
    return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: /* @__PURE__ */ R("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const qa = /* @__PURE__ */ m(
    Ax,
    {
      editor: W,
      onOpenLinkPopover: () => Rr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Lt(!0), es((H) => H + 1);
      },
      disabledFeatures: _,
      autoReorderChecklist: zo,
      aiEnabled: Nr || !!ae,
      onAISparklesClick: (H) => Ga("document", H)
    }
  ), Xa = /* @__PURE__ */ R("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ m(
      Wx,
      {
        status: yt.status,
        lastSaved: yt.lastSaved
      }
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ R("span", { children: [
      jt.words,
      " words"
    ] }) })
  ] }), Iu = {
    minHeight: z,
    ...Y && { maxHeight: Y, overflowY: "auto" }
  };
  return /* @__PURE__ */ R("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: [
    f && h && yt.hasRecoverableContent && /* @__PURE__ */ m(
      zx,
      {
        onRecover: () => {
          yt.recover();
        },
        onDismiss: yt.dismissRecovery
      }
    ),
    l && /* @__PURE__ */ R("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z(W, qa) : qa,
      D && /* @__PURE__ */ R("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => rt("wysiwyg"),
            className: `editor-mode-toggle-btn ${pe === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ m(Gf, {})
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => rt("markdown"),
            className: `editor-mode-toggle-btn ${pe === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ m(ca, {})
          }
        )
      ] })
    ] }),
    !se && /* @__PURE__ */ m(
      Rx,
      {
        editor: W,
        isOpen: Mu,
        onClose: () => Lt(!1),
        focusTrigger: Su,
        initialSearchQuery: Tu,
        editorMode: pe,
        rawMarkdown: me,
        onRawMarkdownChange: Ka,
        onMatchesChange: bu
      }
    ),
    /* @__PURE__ */ m(Px, { editor: W }),
    /* @__PURE__ */ R("div", { className: `editor-main-area ${ke ? "editor-with-toc" : ""}`, children: [
      ke && on === "left" && /* @__PURE__ */ m(
        uc,
        {
          editor: W,
          visible: Ne,
          onVisibilityChange: Ke,
          title: At,
          minLevel: Bn,
          maxLevel: Fn,
          showLevelIndicators: xr,
          highlightActive: kr,
          treeView: Cr,
          width: Mr,
          position: on,
          scrollOffset: Un,
          onItemClick: sn,
          renderItem: an,
          showToggleButton: Sr,
          scrollContainerRef: pt
        }
      ),
      /* @__PURE__ */ R(
        e1,
        {
          resetKey: `${t}-${Vn}`,
          onRetry: () => za((H) => H + 1),
          onClearContent: () => {
            W && W.commands.clearContent(), n?.(""), r?.(""), o?.(""), za((H) => H + 1);
          },
          onError: Fo,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: pt, style: Iu, children: pe === "wysiwyg" ? /* @__PURE__ */ R(De, { children: [
              /* @__PURE__ */ m($u, { editor: W, className: "editor-content" }),
              !_.images && !_.dragAndDrop && /* @__PURE__ */ m(qk, { containerRef: pt, enabled: i }),
              !se && y && /* @__PURE__ */ m(Im, { editor: W, suppressWhenLinkPopoverOpen: ja, aiEnabled: Nr || !!ae, onAISparklesClick: (H) => Ga("selection", H) }),
              Uo && nt && /* @__PURE__ */ m(
                s1,
                {
                  actions: nt,
                  scope: Uo.scope,
                  position: Uo.position,
                  onAction: Nu,
                  onClose: () => Yo(null)
                }
              ),
              Be.status !== "idle" && /* @__PURE__ */ m(
                a1,
                {
                  state: Be,
                  position: fu,
                  onReplace: Au,
                  onInsert: Ru,
                  onRetry: Lu,
                  onDiscard: () => {
                    uu(), Rt();
                  }
                }
              ),
              !_.slashCommands && /* @__PURE__ */ m(Yy, { editor: W, disabledFeatures: _ }),
              !_.wikiLinks && Zo.current && /* @__PURE__ */ m(
                qy,
                {
                  editor: W,
                  onSearch: Zo.current
                }
              ),
              /* @__PURE__ */ m(
                Am,
                {
                  editor: W,
                  isOpen: ja,
                  onClose: () => Rr(!1)
                }
              ),
              !se && /* @__PURE__ */ m(
                Rm,
                {
                  editor: W,
                  onEditLink: () => Rr(!0)
                }
              ),
              !_.images && ln?.isOpen && /* @__PURE__ */ m(
                Xk,
                {
                  src: ln.src,
                  alt: ln.alt,
                  position: ln.position,
                  onSave: (H, G) => {
                    W.chain().focus().setNodeSelection(ln.pos).updateAttributes("resizableImage", {
                      src: H,
                      alt: G
                    }).run(), Lr(null);
                  },
                  onDelete: () => {
                    W.chain().focus().setNodeSelection(ln.pos).deleteSelection().run(), Lr(null);
                  },
                  onClose: () => Lr(null)
                }
              )
            ] }) : /* @__PURE__ */ m(
              Zk,
              {
                content: me,
                onChange: Ka,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: hu,
                currentMatchIndex: yu,
                autoClosePairs: $o
              }
            ) }),
            /* @__PURE__ */ m(t1, { scrollContainerRef: pt })
          ]
        }
      ),
      ke && on === "right" && /* @__PURE__ */ m(
        uc,
        {
          editor: W,
          visible: Ne,
          onVisibilityChange: Ke,
          title: At,
          minLevel: Bn,
          maxLevel: Fn,
          showLevelIndicators: xr,
          highlightActive: kr,
          treeView: Cr,
          width: Mr,
          position: on,
          scrollOffset: Un,
          onItemClick: sn,
          renderItem: an,
          showToggleButton: Sr,
          scrollContainerRef: pt
        }
      )
    ] }),
    d && (te ? te(
      { words: jt.words, characters: jt.characters },
      yt.status,
      Xa
    ) : Xa),
    /* @__PURE__ */ m(Jk, { visible: Ho, onClose: Wo, editor: W })
  ] });
}), dC = vo.create({
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
      Rn(this.options.HTMLAttributes, t, {
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
}), lu = {
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
}, tr = {
  dark: lu,
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
  const o = tr[e] || lu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const du = hc(null);
function fC({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = j(t), s = tr[r] || tr.dark, i = U((c) => {
    tr[c] && o(c);
  }, []);
  Q(() => {
    n?.current && b1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(tr)
  };
  return /* @__PURE__ */ m(du.Provider, { value: a, children: e });
}
function mC() {
  const e = gc(du);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const fc = [
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
  const [n, r] = j(!1), o = e.attrs.language || "plaintext";
  fc.find((i) => i.value === o)?.label;
  const s = U(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ R(En, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: fc.map(({ value: i, label: a }) => /* @__PURE__ */ m("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ m(Wt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(In, { size: 14 }) : /* @__PURE__ */ m(Pn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Gs, {}) }) })
  ] });
}
export {
  Wx as AutoSaveIndicator,
  dC as Callout,
  rk as CalloutInputRule,
  pC as CodeBlockComponent,
  Qx as CollapsibleHeading,
  Tm as CollapsibleList,
  Oy as DatePill,
  fC as EditorThemeProvider,
  Ax as EditorToolbar,
  Rx as FindReplace,
  Im as FloatingToolbar,
  qk as ImageDropZone,
  Gk as ImageUpload,
  lC as MarkdownEditor,
  tk as MarkdownLinkInputRule,
  qx as MarkdownPasteSafe,
  wm as MixedBulletList,
  Mm as MixedListItem,
  xm as MixedOrderedList,
  Cm as MixedTaskItem,
  km as MixedTaskList,
  zx as RecoveryBanner,
  _m as ResizableImage,
  ok as SearchHighlight,
  Px as SelectAllActionBar,
  Nk as SelectAllOccurrences,
  Yy as SlashCommands,
  ik as TabIndent,
  uc as TableOfContents,
  Hy as TagPill,
  Fx as WikiLinkSafe,
  b1 as applyTheme,
  uC as createCustomTheme,
  lu as darkTheme,
  ba as getDateVariant,
  vn as isValidTag,
  g1 as lightTheme,
  Em as loadLanguageIfNeeded,
  xe as lowlight,
  v1 as nordTheme,
  or as normalizeTag,
  qt as parseDateFromMarkdown,
  y1 as sepiaTheme,
  tr as themes,
  _x as useAutoSave,
  mC as useEditorTheme,
  Hx as useWordCount
};
//# sourceMappingURL=paragon.js.map
