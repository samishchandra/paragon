import { jsxDEV as c, Fragment as Ae } from "react/jsx-dev-runtime";
import { ReactNodeViewRenderer as Mr, NodeViewWrapper as xo, NodeViewContent as Pr, useEditorState as zs, useEditor as Bc, EditorContent as zc } from "@tiptap/react";
import _c from "@tiptap/starter-kit";
import Hc from "@tiptap/extension-placeholder";
import Fc from "@tiptap/extension-text-align";
import Wc from "@tiptap/extension-highlight";
import Uc from "@tiptap/extension-link";
import { Table as Vc } from "@tiptap/extension-table";
import jc from "@tiptap/extension-table-row";
import Kc from "@tiptap/extension-table-cell";
import Gc from "@tiptap/extension-table-header";
import { PluginKey as Ye, Plugin as Ze, TextSelection as _s } from "@tiptap/pm/state";
import { DecorationSet as Te, Decoration as lt } from "@tiptap/pm/view";
import { Extension as Qe, Node as Lr, mergeAttributes as pn, InputRule as bt, Mark as qc } from "@tiptap/core";
import Xc from "@tiptap/extension-task-list";
import Yc from "@tiptap/extension-task-item";
import Zc from "@tiptap/extension-underline";
import Qc from "@tiptap/extension-subscript";
import Jc from "@tiptap/extension-superscript";
import eu from "@tiptap/extension-typography";
import tu from "@tiptap/extension-code-block-lowlight";
import { createLowlight as nu } from "lowlight";
import * as w from "react";
import ht, { useState as B, useRef as Y, useEffect as Q, useCallback as H, memo as bn, useLayoutEffect as ou, useMemo as lr, forwardRef as ru, useImperativeHandle as iu, createContext as su, useContext as au } from "react";
import { ChevronDown as yo, Check as Co, Copy as Ir, Link2 as Dr, ExternalLink as lu, Unlink as cu, Pilcrow as uu, Heading1 as qn, Heading2 as Or, Heading3 as $r, Bold as Xn, Italic as Yn, Underline as Zn, Strikethrough as Qn, Code as cr, Highlighter as ur, Link as Jn, Quote as eo, List as to, ListOrdered as no, CheckSquare as oo, FileCode as du, FileText as Ot, CheckCircle as ro, XCircle as mu, AlertTriangle as io, Info as Dt, Calendar as Hs, Image as so, X as Nt, Type as gn, Code2 as dr, Table as Vn, Minus as mr, AlertCircle as ao, ChevronRightIcon as fu, Undo as hu, Redo as pu, IndentIncrease as Pi, IndentDecrease as Li, ListIcon as bu, PlusCircle as gu, Columns as Ii, Trash2 as sn, Rows as Di, ToggleLeft as Oi, Palette as vu, Search as wu, ChevronUp as Nu, MousePointerClick as ku, CaseSensitive as xu, WholeWord as yu, Regex as Cu, Replace as $i, ReplaceAll as Tu, Plus as Eu, Cloud as Su, Loader2 as Ru, CloudOff as Au, RotateCcw as Mu, ImagePlus as Pu, Activity as Lu, Maximize2 as Iu, Minimize2 as Du, PanelRightClose as Ou, PanelRightOpen as $u, Eye as Bu } from "lucide-react";
import Br from "highlight.js/lib/languages/javascript";
import zr from "highlight.js/lib/languages/typescript";
import Fs from "highlight.js/lib/languages/python";
import _r from "highlight.js/lib/languages/xml";
import zu from "highlight.js/lib/languages/css";
import _u from "highlight.js/lib/languages/json";
import To from "highlight.js/lib/languages/bash";
import Hu from "highlight.js/lib/languages/sql";
import Fu from "highlight.js/lib/languages/java";
import Ws from "highlight.js/lib/languages/cpp";
import Us from "highlight.js/lib/languages/go";
import Vs from "highlight.js/lib/languages/rust";
import js from "highlight.js/lib/languages/markdown";
import Ks from "highlight.js/lib/languages/yaml";
import Gs from "highlight.js/lib/languages/diff";
import * as qs from "react-dom";
import Wu, { createPortal as Eo } from "react-dom";
import Uu from "@tiptap/extension-image";
import { jsx as R, Fragment as Vu, jsxs as ju } from "react/jsx-runtime";
import { Fragment as Ku } from "@tiptap/pm/model";
import { keymap as Gu } from "@tiptap/pm/keymap";
import { undo as qu, redo as Xu } from "@tiptap/pm/history";
const Yu = new Ye("tableCellMenu");
let Bi = !1, Ln = null;
function Zu() {
  Bi || (Bi = !0, document.addEventListener("mouseover", (e) => {
    const n = e.target.closest("td, th");
    if (n && n.closest(".ProseMirror")) {
      const o = n.querySelector(".table-cell-menu-btn");
      o && (o.style.opacity = "1");
    }
  }, !0), document.addEventListener("mouseout", (e) => {
    const t = e.target, n = e.relatedTarget, o = t.closest("td, th");
    if (o && o.closest(".ProseMirror")) {
      if (n && o.contains(n) || document.querySelector(".table-cell-menu-dropdown")) return;
      const i = o.querySelector(".table-cell-menu-btn");
      i && (i.style.opacity = "0.15");
    }
  }, !0));
}
function Qu(e) {
  return Zu(), new Ze({
    key: Yu,
    state: {
      init() {
        return Te.empty;
      },
      apply(t, n, o, r) {
        return !t.docChanged && Ln ? Ln.map(t.mapping, t.doc) : (Ln = Ju(r.doc, e), Ln);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Ju(e, t) {
  const n = [];
  return e.descendants((o, r) => {
    if (o.type.name === "tableCell" || o.type.name === "tableHeader") {
      const i = lt.widget(r + 1, (s) => {
        const a = document.createElement("div");
        a.className = "table-cell-menu-wrapper ProseMirror-widget", a.setAttribute("contenteditable", "false"), a.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const l = document.createElement("button");
        l.className = "table-cell-menu-btn", l.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', l.title = "Table options", l.type = "button";
        const u = document.documentElement.classList.contains("dark"), d = u ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", m = u ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", h = u ? "#999" : "#666", f = u ? "#2a2a2a" : "#f5f5f5";
        return l.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + d + ";border:1px solid " + m + ";border-radius:4px;cursor:pointer;opacity:0.15;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + h + ";pointer-events:auto;padding:0;", l.addEventListener("mouseenter", () => {
          l.style.opacity = "1", l.style.background = f, l.style.transform = "scale(1.05)";
        }), l.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), l.style.background = d, l.style.transform = "scale(1)";
        }), l.addEventListener("click", (p) => {
          p.preventDefault(), p.stopPropagation();
          const b = l.getBoundingClientRect();
          t.chain().focus().setTextSelection(r + 1).run(), ed(p, t, r, b);
        }), a.appendChild(l), a;
      }, { side: -1, key: "menu-" + r });
      n.push(i);
    }
  }), Te.create(e, n);
}
function ed(e, t, n, o) {
  const r = document.querySelector(".table-cell-menu-dropdown");
  r && r.remove();
  const i = document.createElement("div");
  i.className = "table-cell-menu-dropdown";
  const s = 170, a = 280;
  let l = Math.max(0, Math.min(o.top, window.innerHeight)), u = Math.max(0, Math.min(o.bottom, window.innerHeight)), d = Math.max(0, Math.min(o.left, window.innerWidth)), m = u + 4, h = d - s + o.width + 8;
  h + s > window.innerWidth - 12 && (h = window.innerWidth - s - 12), h < 12 && (h = 12), m + a > window.innerHeight - 12 && (m = l - a - 4), m < 12 && (m = 12), m + a > window.innerHeight - 12 && (m = window.innerHeight - a - 12);
  const f = document.documentElement.classList.contains("dark"), p = f ? "#1f1f1f" : "#ffffff", b = f ? "#3a3a3a" : "#e5e5e5", v = f ? "#e5e5e5" : "#333333";
  i.style.cssText = "position:fixed;top:" + m + "px;left:" + h + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + p + ";border:1px solid " + b + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + v + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const g = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n + 1).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n + 1).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n + 1).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n + 1).addRowAfter().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => td(t) }
  ], N = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
  }, x = f ? "#2a2a2a" : "#f5f5f5", y = f ? "#ff6b6b" : "#dc2626", k = f ? "#999999" : "#666666", S = f ? "#333333" : "#e5e5e5";
  g.forEach((L) => {
    if (L.label === "divider") {
      const O = document.createElement("div");
      O.style.cssText = "height:1px;background:" + S + ";margin:4px 0;", i.appendChild(O);
    } else {
      const O = document.createElement("button");
      O.type = "button";
      const V = L.destructive ? y : v;
      O.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + V + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const W = N[L.icon || ""] || "", U = L.destructive ? y : k;
      O.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + U + ';">' + W + '</span><span style="flex:1;white-space:nowrap;">' + L.label + "</span>", O.addEventListener("mouseenter", () => {
        O.style.background = L.destructive ? f ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : x;
      }), O.addEventListener("mouseleave", () => {
        O.style.background = "transparent";
      }), O.addEventListener("click", (K) => {
        K.preventDefault(), K.stopPropagation(), L.action && L.action(), i.remove();
      }), i.appendChild(O);
    }
  }), document.body.appendChild(i);
  const T = (L) => {
    const O = L.target;
    if (i.contains(O) || O.classList.contains("table-cell-menu-btn"))
      return;
    const V = O.closest('[role="dialog"]');
    V && V.contains(i) || (i.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", C));
  }, C = (L) => {
    L.key === "Escape" && (i.remove(), document.removeEventListener("mousedown", T), document.removeEventListener("keydown", C));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", T), document.addEventListener("keydown", C);
  }, 0);
}
function td(e) {
  const { state: t } = e, { selection: n } = t;
  let o = null;
  if (t.doc.descendants((r, i) => {
    if (r.type.name === "table" && i <= n.from && i + r.nodeSize >= n.to)
      return o = r, !1;
  }), o) {
    const r = (s) => {
      if (s.type.name === "table") return "<table>" + s.content.content.map(r).join("") + "</table>";
      if (s.type.name === "tableRow") return "<tr>" + s.content.content.map(r).join("") + "</tr>";
      if (s.type.name === "tableCell") {
        const a = s.attrs, l = a.colspan > 1 ? ' colspan="' + a.colspan + '"' : "", u = a.rowspan > 1 ? ' rowspan="' + a.rowspan + '"' : "";
        return "<td" + l + u + ">" + s.textContent + "</td>";
      }
      if (s.type.name === "tableHeader") {
        const a = s.attrs, l = a.colspan > 1 ? ' colspan="' + a.colspan + '"' : "", u = a.rowspan > 1 ? ' rowspan="' + a.rowspan + '"' : "";
        return "<th" + l + u + ">" + s.textContent + "</th>";
      }
      return s.textContent || "";
    }, i = r(o);
    navigator.clipboard.writeText(i).then(() => {
      const s = document.createElement("div");
      s.className = "tcm-toast", s.textContent = "Table copied to clipboard", s.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;", document.body.appendChild(s), setTimeout(() => s.remove(), 2e3);
    });
  }
}
const nd = Kc.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Qu(this.editor)
    ];
  }
}), od = Gc.extend({}), an = new Ye("tableSorting");
let gt = null, en = null;
function rd(e) {
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
function id(e, t, n) {
  let o = 0;
  return e.type === "number" && t.type === "number" ? o = e.value - t.value : e.type === "date" && t.type === "date" ? o = e.value.getTime() - t.value.getTime() : o = String(e.value).localeCompare(String(t.value)), n === "asc" ? o : -o;
}
function sd(e, t, n) {
  const { state: o, view: r } = e;
  let i = null;
  if (o.doc.nodesBetween(t, t + 1, (p, b) => {
    if (p.type.name === "table" && b === t)
      return i = p, !1;
  }), !i) {
    console.log("Table not found at position", t);
    return;
  }
  const s = gt?.tablePos === t && gt?.columnIndex === n && gt?.direction === "asc" ? "desc" : "asc";
  gt = { tablePos: t, columnIndex: n, direction: s }, en = null;
  const a = [];
  i.forEach((p) => {
    if (p.type.name === "tableRow") {
      let b = !1;
      p.forEach((v) => {
        v.type.name === "tableHeader" && (b = !0);
      }), a.push({ node: p, isHeader: b });
    }
  });
  const l = a.filter((p) => p.isHeader), u = a.filter((p) => !p.isHeader);
  if (u.length < 2) {
    zi(n, s), r.dispatch(o.tr.setMeta(an, { updated: !0 }));
    return;
  }
  const d = u.map((p) => {
    let b = "", v = 0;
    return p.node.forEach((g) => {
      v === n && (b = g.textContent || ""), v++;
    }), { ...p, sortValue: rd(b) };
  }), m = d.map((p, b) => b);
  d.sort((p, b) => id(p.sortValue, b.sortValue, s));
  const h = d.map((p, b) => u.indexOf(p));
  if (m.some((p, b) => p !== h[b])) {
    const p = [];
    l.forEach((g) => p.push(g.node)), d.forEach((g) => p.push(g.node));
    const b = i.type.create(i.attrs, p), { tr: v } = o;
    v.replaceWith(t, t + i.nodeSize, b), v.setMeta(an, { updated: !0 }), r.dispatch(v);
  } else
    r.dispatch(o.tr.setMeta(an, { updated: !0 }));
  zi(n, s);
}
function zi(e, t) {
  const n = document.querySelector(".table-sort-toast");
  n && n.remove();
  const o = document.createElement("div");
  o.className = "table-sort-toast";
  const r = t === "asc" ? "ascending" : "descending", i = t === "asc" ? "↑" : "↓";
  o.innerHTML = '<span style="margin-right:6px;">' + i + "</span> Sorted column " + (e + 1) + " " + r;
  const s = document.documentElement.classList.contains("dark");
  o.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:" + (s ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)") + ";color:" + (s ? "#e5e5e5" : "#333") + ";padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid " + (s ? "#3a3a3a" : "#e5e5e5") + ";animation:sortToastIn 0.2s ease;", document.body.appendChild(o), setTimeout(() => {
    o.style.animation = "sortToastOut 0.2s ease forwards", setTimeout(() => o.remove(), 200);
  }, 1500);
}
function ad(e, t, n, o) {
  const r = document.createElement("span");
  r.className = "table-sort-btn-inline", r.setAttribute("contenteditable", "false"), r.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const i = document.createElement("button");
  i.className = "table-sort-btn", i.setAttribute("contenteditable", "false"), i.type = "button";
  const s = document.documentElement.classList.contains("dark"), a = s ? "#60a5fa" : "#3b82f6", l = s ? "#666" : "#aaa", u = s ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return i.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? a : l) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", i.addEventListener("mouseenter", () => {
    i.style.background = u, i.style.opacity = "1", i.style.color = a;
  }), i.addEventListener("mouseleave", () => {
    i.style.background = "transparent", i.style.opacity = e ? "1" : "0.5", i.style.color = e ? a : l;
  }), i.addEventListener("click", (d) => {
    d.preventDefault(), d.stopPropagation(), sd(o, t, n);
  }), e === "asc" ? (i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', i.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', i.title = "Sorted descending - Click to sort ascending") : (i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', i.title = "Click to sort this column"), r.appendChild(i), r;
}
function ld(e) {
  return new Ze({
    key: an,
    state: {
      init() {
        return Te.empty;
      },
      apply(t, n, o, r) {
        const i = t.getMeta(an);
        return !t.docChanged && !i?.updated && en ? en.map(t.mapping, t.doc) : (en = cd(r.doc, e), en);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function cd(e, t) {
  const n = [];
  return e.descendants((o, r) => {
    if (o.type.name === "table") {
      const i = r;
      o.forEach((s, a) => {
        if (s.type.name === "tableRow") {
          let l = 0, u = 0;
          s.forEach((d, m) => {
            if (d.type.name === "tableHeader") {
              const h = r + 1 + a + 1 + u;
              let f = h + 1;
              d.forEach((x, y) => {
                x.type.name === "paragraph" && (f = h + 1 + y + x.nodeSize - 1);
              });
              const b = gt?.tablePos === i && gt?.columnIndex === l ? gt.direction : null, v = l, g = i, N = lt.widget(f, () => ad(b, g, v, t), { side: 1, key: "sort-" + i + "-" + v });
              n.push(N);
            }
            u += d.nodeSize, l++;
          });
        }
      });
    }
  }), Te.create(e, n);
}
const ud = Qe.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [ld(this.editor)];
  }
}), ie = nu();
ie.register("javascript", Br);
ie.register("js", Br);
ie.register("jsx", Br);
ie.register("typescript", zr);
ie.register("ts", zr);
ie.register("tsx", zr);
ie.register("python", Fs);
ie.register("py", Fs);
ie.register("xml", _r);
ie.register("html", _r);
ie.register("svg", _r);
ie.register("css", zu);
ie.register("json", _u);
ie.register("bash", To);
ie.register("sh", To);
ie.register("shell", To);
ie.register("zsh", To);
ie.register("sql", Hu);
ie.register("java", Fu);
ie.register("cpp", Ws);
ie.register("c", Ws);
ie.register("go", Us);
ie.register("golang", Us);
ie.register("rust", Vs);
ie.register("rs", Vs);
ie.register("markdown", js);
ie.register("md", js);
ie.register("yaml", Ks);
ie.register("yml", Ks);
ie.register("diff", Gs);
ie.register("patch", Gs);
function dd({ node: e, updateAttributes: t, extension: n }) {
  const [o, r] = B(!1), [i, s] = B(!1), a = Y(null);
  Q(() => {
    const h = a.current;
    if (!h || i) return;
    const f = new IntersectionObserver(
      (p) => {
        for (const b of p)
          b.isIntersecting && (s(!0), f.unobserve(h));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return f.observe(h), () => {
      f.disconnect();
    };
  }, [i]);
  const l = H(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), r(!0), setTimeout(() => r(!1), 2e3);
    } catch (h) {
      console.error("Failed to copy:", h);
    }
  }, [e.textContent]), u = n.options.lowlight?.listLanguages?.() || [], d = e.attrs.language || "plaintext", m = d === "plaintext" ? "Plain Text" : d.charAt(0).toUpperCase() + d.slice(1);
  return /* @__PURE__ */ c(xo, { className: "code-block-wrapper", ref: a, children: [
    /* @__PURE__ */ c("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ c("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ c(
          "select",
          {
            value: d,
            onChange: (h) => t({ language: h.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ c("option", { value: "plaintext", children: "Plain Text" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 152,
                columnNumber: 13
              }, this),
              u.map((h) => /* @__PURE__ */ c("option", { value: h, children: h.charAt(0).toUpperCase() + h.slice(1) }, h, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 154,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 147,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ c("span", { className: "code-block-language-label", children: m }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 159,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(yo, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 160,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          onClick: l,
          className: `code-block-copy-btn ${o ? "copied" : ""}`,
          title: o ? "Copied!" : "Copy code",
          children: o ? /* @__PURE__ */ c(Co, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 168,
            columnNumber: 21
          }, this) : /* @__PURE__ */ c(Ir, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 168,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 162,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 145,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c("pre", { className: `code-block-pre ${i ? "" : "code-block-deferred"}`, children: /* @__PURE__ */ c(Pr, { className: i ? `language-${d}` : "language-plaintext" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 175,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 174,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
    lineNumber: 143,
    columnNumber: 5
  }, this);
}
const md = tu.extend({
  addNodeView() {
    return Mr(dd);
  }
}).configure({
  lowlight: ie,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function fd({ editor: e, isOpen: t, onClose: n }) {
  const [o, r] = B(""), [i, s] = B({ top: 0, left: 0 }), a = Y(null), l = Y(null), u = H(() => {
    if (!(!e || e.isDestroyed))
      try {
        const { view: h } = e, { from: f } = h.state.selection, p = h.coordsAtPos(f), b = 320, v = 80, g = 8, N = window.innerWidth, x = window.innerHeight;
        let y = p.bottom + 8, k = p.left;
        y + v > x - g && (y = p.top - v - 8), k + b > N - g && (k = N - b - g), k < g && (k = g), y = Math.max(g, y), s({ top: y, left: k });
      } catch {
        s({
          top: window.innerHeight / 2 - 40,
          left: window.innerWidth / 2 - 160
        });
      }
  }, [e]);
  Q(() => {
    if (t) {
      const h = e.getAttributes("link").href || "";
      r(h), u(), setTimeout(() => {
        a.current?.focus(), a.current?.select();
      }, 50);
    }
  }, [t, e, u]), Q(() => {
    if (!t) return;
    const h = () => {
      requestAnimationFrame(u);
    };
    return window.addEventListener("scroll", h, !0), window.addEventListener("resize", h), () => {
      window.removeEventListener("scroll", h, !0), window.removeEventListener("resize", h);
    };
  }, [t, u]), Q(() => {
    if (!t) return;
    const h = (f) => {
      l.current && !l.current.contains(f.target) && n();
    };
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [t, n]);
  const d = H((h) => {
    if (h?.preventDefault(), o.trim()) {
      let f = o.trim();
      !/^https?:\/\//i.test(f) && !f.startsWith("mailto:") && (f = "https://" + f), e.chain().focus().extendMarkRange("link").setLink({ href: f }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [o, e, n]), m = H((h) => {
    h.key === "Escape" ? (h.preventDefault(), n()) : h.key === "Enter" && (h.preventDefault(), d());
  }, [n, d]);
  return t ? Eo(
    /* @__PURE__ */ c(
      "div",
      {
        ref: l,
        className: "link-popover",
        style: {
          position: "fixed",
          top: `${i.top}px`,
          left: `${i.left}px`,
          zIndex: 9999
        },
        children: /* @__PURE__ */ c("form", { onSubmit: d, className: "link-popover-form", children: [
          /* @__PURE__ */ c("div", { className: "link-popover-input-wrapper", children: [
            /* @__PURE__ */ c(Dr, { className: "link-popover-icon", size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
              lineNumber: 163,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ c(
              "input",
              {
                ref: a,
                type: "text",
                value: o,
                onChange: (h) => r(h.target.value),
                onKeyDown: m,
                placeholder: "Enter URL or paste link",
                className: "link-popover-input",
                autoComplete: "off",
                spellCheck: !1
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
                lineNumber: 164,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
            lineNumber: 162,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
            lineNumber: 176,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 161,
          columnNumber: 7
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
        lineNumber: 151,
        columnNumber: 5
      },
      this
    ),
    document.body
  ) : null;
}
function hd({ editor: e, onEditLink: t }) {
  const [n, o] = B({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), r = Y(null), i = Y(null), s = H((f) => {
    if (!(!e || e.isDestroyed)) {
      i.current && (clearTimeout(i.current), i.current = null);
      try {
        const p = f.getAttribute("href") || "", b = f.getBoundingClientRect(), v = 320, g = 40, N = 8, x = window.innerWidth, y = window.innerHeight;
        let k = b.bottom + 8, S = b.left;
        k + g > y - N && (k = b.top - g - 8), S + v > x - N && (S = x - v - N), S < N && (S = N), o({
          isVisible: !0,
          url: p,
          position: { top: k, left: S },
          linkElement: f
        });
      } catch (p) {
        console.warn("LinkHoverTooltip: Error showing tooltip", p);
      }
    }
  }, [e]), a = H(() => {
    i.current = setTimeout(() => {
      o((f) => ({ ...f, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = H(() => {
    i.current && (clearTimeout(i.current), i.current = null);
  }, []);
  Q(() => {
    if (!e || e.isDestroyed) return;
    const f = e.view.dom;
    if (!f) return;
    const p = (v) => {
      const N = v.target.closest("a");
      N && f.contains(N) && s(N);
    }, b = (v) => {
      const g = v.target, N = v.relatedTarget;
      if (g.closest("a")) {
        if (N && r.current?.contains(N))
          return;
        a();
      }
    };
    return f.addEventListener("mouseover", p), f.addEventListener("mouseout", b), () => {
      f.removeEventListener("mouseover", p), f.removeEventListener("mouseout", b), i.current && clearTimeout(i.current);
    };
  }, [e, s, a]);
  const u = H(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer"), o((f) => ({ ...f, isVisible: !1 }));
  }, [n.url]), d = H(() => {
    if (n.linkElement) {
      const { view: f } = e, { doc: p } = f.state;
      let b = null, v = null;
      p.descendants((g, N) => {
        if (g.isText && g.marks.some((x) => x.type.name === "link")) {
          const x = f.nodeDOM(N);
          if (x && (x === n.linkElement || x.parentElement === n.linkElement))
            return b = N, v = N + g.nodeSize, !1;
        }
        return !0;
      }), b !== null && v !== null ? e.chain().focus().setTextSelection({ from: b, to: v }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    o((f) => ({ ...f, isVisible: !1 }));
  }, [e, n.linkElement]), m = H(() => {
    if (n.linkElement) {
      const { view: f } = e, { doc: p } = f.state;
      p.descendants((b, v) => {
        if (b.isText && b.marks.some((g) => g.type.name === "link")) {
          const g = f.nodeDOM(v);
          if (g && (g === n.linkElement || g.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: v, to: v + b.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    o((f) => ({ ...f, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const h = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url;
  return Eo(
    /* @__PURE__ */ c(
      "div",
      {
        ref: r,
        className: "link-hover-tooltip",
        style: {
          position: "fixed",
          top: `${n.position.top}px`,
          left: `${n.position.left}px`,
          zIndex: 9999
        },
        onMouseEnter: l,
        onMouseLeave: a,
        children: /* @__PURE__ */ c("div", { className: "link-hover-tooltip-content", children: [
          /* @__PURE__ */ c(
            "button",
            {
              onClick: m,
              className: "link-hover-tooltip-edit",
              title: "Edit link",
              children: /* @__PURE__ */ c("span", { className: "link-hover-tooltip-url", children: h || "Edit link" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 223,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 218,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c("div", { className: "link-hover-tooltip-actions", children: [
            /* @__PURE__ */ c(
              "button",
              {
                onClick: u,
                className: "link-hover-tooltip-btn",
                title: "Open link",
                children: /* @__PURE__ */ c(lu, { size: 14 }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                  lineNumber: 231,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 226,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ c(
              "button",
              {
                onClick: d,
                className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
                title: "Remove link",
                children: /* @__PURE__ */ c(cu, { size: 14 }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                  lineNumber: 238,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 233,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
            lineNumber: 225,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
          lineNumber: 217,
          columnNumber: 7
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
        lineNumber: 205,
        columnNumber: 5
      },
      this
    ),
    document.body
  );
}
const ge = ({ onMouseDown: e, isActive: t, disabled: n, children: o, title: r }) => /* @__PURE__ */ c(
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
    lineNumber: 47,
    columnNumber: 3
  },
  void 0
), _i = () => /* @__PURE__ */ c("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
  lineNumber: 66,
  columnNumber: 3
}, void 0), pd = bn(function({ editor: t, className: n = "" }) {
  const o = zs({
    editor: t,
    selector: ({ editor: k }) => ({
      isBold: k.isActive("bold"),
      isItalic: k.isActive("italic"),
      isUnderline: k.isActive("underline"),
      isStrike: k.isActive("strike"),
      isCode: k.isActive("code"),
      isHighlight: k.isActive("highlight"),
      isLink: k.isActive("link"),
      isH1: k.isActive("heading", { level: 1 }),
      isH2: k.isActive("heading", { level: 2 }),
      isH3: k.isActive("heading", { level: 3 }),
      isBulletList: k.isActive("bulletList"),
      isOrderedList: k.isActive("orderedList"),
      isTaskList: k.isActive("taskList"),
      isBlockquote: k.isActive("blockquote"),
      isCodeBlock: k.isActive("codeBlock")
    })
  }), [r, i] = B(!1), [s, a] = B(""), [l, u] = B(!1), [d, m] = B({ top: 0, left: 0 }), h = Y(null), f = Y(null), p = Y(null), b = H(() => {
    if (s) {
      let k = s.trim();
      !/^https?:\/\//i.test(k) && !k.startsWith("mailto:") && (k = "https://" + k), t.chain().focus().extendMarkRange("link").setLink({ href: k }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    i(!1), a("");
  }, [t, s]), v = (k) => {
    k.preventDefault(), k.stopPropagation();
    const S = t.getAttributes("link").href;
    a(S || ""), i(!0);
  }, g = H((k, S) => {
    k.preventDefault(), k.stopPropagation(), S();
  }, []);
  Q(() => {
    if (!t || t.isDestroyed) return;
    const k = () => {
      if (!t.isDestroyed)
        try {
          const { selection: S } = t.state, { empty: T, from: C, to: L } = S, W = ("node" in S && S.node ? S.node : t.state.doc.nodeAt(C))?.type?.name === "resizableImage";
          if (T && !W || t.isActive("codeBlock")) {
            p.current && (clearTimeout(p.current), p.current = null), f.current && clearTimeout(f.current), f.current = setTimeout(() => {
              u(!1), i(!1);
            }, 150);
            return;
          }
          f.current && (clearTimeout(f.current), f.current = null);
          const U = t.view.coordsAtPos(C), K = t.view.coordsAtPos(L), J = h.current?.offsetWidth || 500, F = h.current?.offsetHeight || 40, G = 8, A = window.innerWidth;
          let E = (U.left + K.left) / 2 - J / 2;
          E = Math.max(G, Math.min(A - J - G, E));
          let D = U.top - F - 10;
          D < G && (D = K.bottom + 10), l ? m({ top: Math.max(G, D), left: E }) : (p.current && clearTimeout(p.current), p.current = setTimeout(() => {
            m({ top: Math.max(G, D), left: E }), u(!0);
          }, 50));
        } catch (S) {
          console.warn("FloatingToolbar: Error updating position", S);
        }
    };
    return t.on("selectionUpdate", k), () => {
      t.off("selectionUpdate", k), f.current && clearTimeout(f.current), p.current && clearTimeout(p.current);
    };
  }, [t, l]);
  const N = (k) => {
    f.current && (clearTimeout(f.current), f.current = null);
  };
  if (!l)
    return null;
  const x = 15, y = r ? /* @__PURE__ */ c(
    "div",
    {
      ref: h,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: d.top,
        left: d.left,
        zIndex: 9999
      },
      onMouseDown: N,
      children: /* @__PURE__ */ c("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ c(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: s,
            onChange: (k) => a(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), b()), k.key === "Escape" && (i(!1), a(""));
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
            lineNumber: 252,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ c("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ c(
            "button",
            {
              onMouseDown: (k) => {
                k.preventDefault(), b();
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
              lineNumber: 276,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onMouseDown: (k) => {
                k.preventDefault(), i(!1), a("");
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
              lineNumber: 289,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 275,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 251,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 240,
      columnNumber: 5
    },
    this
  ) : /* @__PURE__ */ c(
    "div",
    {
      ref: h,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: d.top,
        left: d.left,
        zIndex: 9999
      },
      onMouseDown: N,
      children: [
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().setParagraph().run()),
            isActive: !o?.isH1 && !o?.isH2 && !o?.isH3 && !o?.isBulletList && !o?.isOrderedList && !o?.isTaskList && !o?.isBlockquote && !o?.isCodeBlock,
            title: "Paragraph",
            children: /* @__PURE__ */ c(uu, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 324,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 319,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleHeading({ level: 1 }).run()),
            isActive: o?.isH1,
            title: "Heading 1",
            children: /* @__PURE__ */ c(qn, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 333,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 328,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleHeading({ level: 2 }).run()),
            isActive: o?.isH2,
            title: "Heading 2",
            children: /* @__PURE__ */ c(Or, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 340,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 335,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleHeading({ level: 3 }).run()),
            isActive: o?.isH3,
            title: "Heading 3",
            children: /* @__PURE__ */ c($r, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 347,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 342,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(_i, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 350,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleBold().run()),
            isActive: o?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ c(Xn, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 358,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 353,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleItalic().run()),
            isActive: o?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ c(Yn, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 365,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 360,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleUnderline().run()),
            isActive: o?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ c(Zn, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 372,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 367,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleStrike().run()),
            isActive: o?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ c(Qn, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 379,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 374,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleCode().run()),
            isActive: o?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ c(cr, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 386,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 381,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleHighlight().run()),
            isActive: o?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ c(ur, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 393,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 388,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: v,
            isActive: o?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ c(Jn, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 401,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 396,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(_i, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 404,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleBlockquote().run()),
            isActive: o?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ c(eo, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 412,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 407,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleBulletList().run()),
            isActive: o?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ c(to, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 419,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 414,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleOrderedList().run()),
            isActive: o?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ c(no, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 426,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 421,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleTaskList().run()),
            isActive: o?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ c(oo, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 433,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 428,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ c(
          ge,
          {
            onMouseDown: (k) => g(k, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: o?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ c(du, { size: x }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 440,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 435,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 307,
      columnNumber: 5
    },
    this
  );
  return Eo(y, document.body);
}), lo = {
  info: { icon: Dt, label: "Info", color: "var(--callout-info)" },
  warning: { icon: io, label: "Warning", color: "var(--callout-warning)" },
  error: { icon: mu, label: "Error", color: "var(--callout-error)" },
  success: { icon: ro, label: "Success", color: "var(--callout-success)" },
  note: { icon: Ot, label: "Note", color: "var(--callout-note)" }
};
function bd({
  buttonRef: e,
  type: t,
  onTypeChange: n,
  onClose: o,
  theme: r
}) {
  const i = Y(null), [s, a] = B(null), l = 185, u = H(() => {
    if (!e.current) return;
    const m = e.current.getBoundingClientRect(), f = window.innerHeight - m.bottom, p = m.top, b = f < l + 8 && p > l + 8;
    a({
      top: b ? m.top - l - 4 : m.bottom + 4,
      left: m.left,
      flipped: b
    });
  }, [e]);
  if (Q(() => {
    u();
    const m = () => u();
    return window.addEventListener("scroll", m, !0), window.addEventListener("resize", m), () => {
      window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    };
  }, [u]), Q(() => {
    const m = (h) => {
      i.current && !i.current.contains(h.target) && e.current && !e.current.contains(h.target) && o();
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [e, o]), Q(() => {
    const m = (h) => {
      h.key === "Escape" && o();
    };
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, [o]), !s) return null;
  const d = /* @__PURE__ */ c(
    "div",
    {
      ref: i,
      className: `callout-type-dropdown-portal ${r === "dark" ? "dark-theme" : "light-theme"}`,
      style: {
        position: "fixed",
        top: s.top,
        left: s.left,
        zIndex: 99999,
        maxHeight: l,
        overflowY: "auto"
      },
      children: Object.keys(lo).map((m) => {
        const h = lo[m], f = h.icon;
        return /* @__PURE__ */ c(
          "button",
          {
            className: `callout-type-option ${m === t ? "active" : ""}`,
            onClick: () => n(m),
            style: { "--callout-option-color": h.color },
            children: [
              /* @__PURE__ */ c(f, { size: 16, style: { color: h.color } }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 124,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ c("span", { children: h.label }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 125,
                columnNumber: 13
              }, this)
            ]
          },
          m,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 118,
            columnNumber: 11
          },
          this
        );
      })
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 102,
      columnNumber: 5
    },
    this
  );
  return Eo(d, document.body);
}
function gd({ node: e, updateAttributes: t, editor: n }) {
  const [o, r] = B(!1), i = Y(null), s = e.attrs.type || "info", a = lo[s] || lo.info, l = a.icon, [u, d] = B("light");
  Q(() => {
    const f = n.view.dom.closest("[data-theme]");
    f ? d(f.getAttribute("data-theme") || "light") : document.documentElement.classList.contains("dark") && d("dark");
  }, [n]);
  const m = H((f) => {
    t({ type: f }), r(!1);
  }, [t]), h = H(() => {
    r(!1);
  }, []);
  return /* @__PURE__ */ c(xo, { className: `callout callout-${s}`, "data-callout": "", "data-type": s, children: [
    /* @__PURE__ */ c("div", { className: "callout-icon-container", children: [
      /* @__PURE__ */ c(
        "button",
        {
          ref: i,
          className: "callout-icon-button",
          onClick: () => n.isEditable && r(!o),
          title: n.isEditable ? "Click to change callout type" : a.label,
          style: { color: a.color },
          contentEditable: !1,
          children: [
            /* @__PURE__ */ c(l, { size: 20 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 173,
              columnNumber: 11
            }, this),
            n.isEditable && /* @__PURE__ */ c(yo, { size: 12, className: "callout-chevron" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 174,
              columnNumber: 33
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
          lineNumber: 165,
          columnNumber: 9
        },
        this
      ),
      o && n.isEditable && /* @__PURE__ */ c(
        bd,
        {
          buttonRef: i,
          type: s,
          onTypeChange: m,
          onClose: h,
          theme: u
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
          lineNumber: 178,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 164,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c("div", { className: "callout-content", children: /* @__PURE__ */ c(Pr, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 188,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 187,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
    lineNumber: 163,
    columnNumber: 5
  }, this);
}
const vd = Lr.create({
  name: "callout",
  addOptions() {
    return {
      HTMLAttributes: {},
      types: ["info", "warning", "error", "success", "note"]
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
      pn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return Mr(gd);
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
}), wd = Uu.extend({
  name: "resizableImage",
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {},
      allowBase64: !0,
      onImageClick: void 0
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
        pn(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addNodeView() {
    return ({ node: e, editor: t, getPos: n }) => {
      const o = document.createElement("figure");
      o.classList.add("image-resizer");
      const r = (y) => {
        const k = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[y] || "margin-left: auto; margin-right: auto;";
        o.style.cssText = `display: block; position: relative; width: fit-content; ${k}`;
      };
      r(e.attrs.align || "left");
      const i = document.createElement("img");
      i.src = e.attrs.src, i.alt = e.attrs.alt || "", e.attrs.width && (i.style.width = `${e.attrs.width}px`);
      const s = document.createElement("div");
      s.classList.add("resize-handle"), s.style.cssText = `
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
      `, s.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(90deg);">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      `;
      const a = document.createElement("button");
      a.classList.add("image-menu-btn"), a.setAttribute("type", "button"), a.setAttribute("title", "Image options"), a.style.cssText = `
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
      `, a.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      `;
      const l = document.createElement("div");
      l.classList.add("image-menu-dropdown"), l.style.cssText = `
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
      `;
      const u = (y, k, S) => {
        const T = document.createElement("button");
        return T.setAttribute("type", "button"), T.style.cssText = `
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
        `, T.innerHTML = `${k}<span>${y}</span>`, T.addEventListener("mouseenter", () => {
          T.style.background = "oklch(0.95 0 0)";
        }), T.addEventListener("mouseleave", () => {
          T.style.background = "transparent";
        }), T.addEventListener("click", (C) => {
          C.preventDefault(), C.stopPropagation(), S(), l.style.display = "none";
        }), T;
      }, d = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', m = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
      l.appendChild(u("Edit", d, () => {
        const y = typeof n == "function" ? n() : null;
        if (y != null && this.options.onImageClick) {
          const k = i.getBoundingClientRect();
          this.options.onImageClick({
            src: e.attrs.src,
            alt: e.attrs.alt || "",
            pos: y,
            rect: k
          });
        }
      })), l.appendChild(u("Copy image", m, async () => {
        try {
          const k = await (await fetch(e.attrs.src)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [k.type]: k })
          ]);
        } catch {
          await navigator.clipboard.writeText(e.attrs.src);
        }
      })), l.appendChild(u("Save image", h, () => {
        const y = document.createElement("a");
        y.href = e.attrs.src, y.download = e.attrs.alt || "image", y.click();
      }));
      let f = !1;
      a.addEventListener("click", (y) => {
        if (y.preventDefault(), y.stopPropagation(), f)
          l.style.display = "none", f = !1;
        else {
          const k = a.getBoundingClientRect();
          l.style.top = `${k.bottom + 4}px`, l.style.left = `${k.right - 140}px`, l.style.display = "flex", f = !0;
        }
      });
      const p = (y) => {
        !l.contains(y.target) && !a.contains(y.target) && (l.style.display = "none", f = !1);
      };
      document.addEventListener("click", p), o.appendChild(i), o.appendChild(s), o.appendChild(a), document.body.appendChild(l), o.addEventListener("mouseenter", () => {
        s.style.opacity = "1", a.style.opacity = "1";
      }), o.addEventListener("mouseleave", () => {
        s.style.opacity = "0", f || (a.style.opacity = "0");
      }), a.addEventListener("mouseenter", () => {
        a.style.background = "oklch(0.95 0 0)";
      }), a.addEventListener("mouseleave", () => {
        a.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      let b, v;
      const g = (y) => {
        y.preventDefault(), b = y.clientX, v = i.offsetWidth, document.addEventListener("mousemove", N), document.addEventListener("mouseup", x);
      }, N = (y) => {
        const k = y.clientX - b, S = Math.max(100, v + k);
        i.style.width = `${S}px`;
      }, x = () => {
        document.removeEventListener("mousemove", N), document.removeEventListener("mouseup", x);
        const y = typeof n == "function" ? n() : null;
        y != null && t.chain().focus().updateAttributes("resizableImage", {
          width: i.offsetWidth
        }).run();
      };
      return s.addEventListener("mousedown", g), {
        dom: o,
        update: (y) => y.type.name !== "resizableImage" ? !1 : (i.src = y.attrs.src, i.alt = y.attrs.alt || "", y.attrs.width && (i.style.width = `${y.attrs.width}px`), r(y.attrs.align || "left"), !0),
        destroy: () => {
          s.removeEventListener("mousedown", g), document.removeEventListener("click", p), l.remove();
        }
      };
    };
  }
});
function Nd(e) {
  const t = new Date(e), n = /* @__PURE__ */ new Date(), o = new Date(n);
  o.setDate(o.getDate() + 1);
  const r = new Date(n);
  if (r.setDate(r.getDate() - 1), n.setHours(0, 0, 0, 0), o.setHours(0, 0, 0, 0), r.setHours(0, 0, 0, 0), t.setHours(0, 0, 0, 0), t.getTime() === n.getTime())
    return "Today";
  if (t.getTime() === o.getTime())
    return "Tomorrow";
  if (t.getTime() === r.getTime())
    return "Yesterday";
  const i = {
    month: "short",
    day: "numeric"
  };
  return t.getFullYear() !== n.getFullYear() && (i.year = "numeric"), t.toLocaleDateString("en-US", i);
}
function kd(e) {
  const t = new Date(e), n = /* @__PURE__ */ new Date(), o = new Date(n);
  return o.setDate(o.getDate() + 7), n.setHours(0, 0, 0, 0), t.setHours(0, 0, 0, 0), t.getTime() === n.getTime() ? "date-today" : t < n ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
function xd({ node: e, updateAttributes: t, selected: n }) {
  const [o, r] = B(!1), [i, s] = B({ top: 0, left: 0 }), a = Y(null), l = Y(null), u = Y(null), d = e.attrs.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0], m = Nd(d), h = kd(d), f = (v) => {
    if (v.preventDefault(), v.stopPropagation(), a.current) {
      const g = a.current.getBoundingClientRect();
      s({
        top: g.bottom + 8,
        left: g.left
      });
    }
    r(!0);
  }, p = (v) => {
    const g = v.target.value;
    g && (t({ date: g }), r(!1));
  }, b = (v) => {
    const g = /* @__PURE__ */ new Date();
    g.setDate(g.getDate() + v), t({ date: g.toISOString().split("T")[0] }), r(!1);
  };
  return Q(() => {
    const v = (N) => {
      l.current && !l.current.contains(N.target) && a.current && !a.current.contains(N.target) && r(!1);
    }, g = (N) => {
      N.key === "Escape" && r(!1);
    };
    return o && (document.addEventListener("mousedown", v), document.addEventListener("keydown", g), setTimeout(() => u.current?.focus(), 50)), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("keydown", g);
    };
  }, [o]), /* @__PURE__ */ c(xo, { as: "span", className: "inline", children: [
    /* @__PURE__ */ c(
      "span",
      {
        ref: a,
        onClick: f,
        className: `date-pill ${h} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
        contentEditable: !1,
        "data-type": "date-pill",
        "data-date": d,
        children: [
          /* @__PURE__ */ c(Hs, { size: 14, className: "date-icon" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 158,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c("span", { className: "date-text", children: m }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 159,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
        lineNumber: 150,
        columnNumber: 7
      },
      this
    ),
    o && /* @__PURE__ */ c(
      "div",
      {
        ref: l,
        className: "date-picker-popup",
        style: {
          position: "fixed",
          top: i.top,
          left: i.left,
          zIndex: 100
        },
        children: [
          /* @__PURE__ */ c("div", { className: "flex gap-1 mb-3", children: [
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                onClick: () => b(0),
                className: "quick-date-btn",
                children: "Today"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 175,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                onClick: () => b(1),
                className: "quick-date-btn",
                children: "Tomorrow"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 182,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                onClick: () => b(7),
                className: "quick-date-btn",
                children: "Next Week"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 189,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 174,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ c("div", { className: "relative", children: /* @__PURE__ */ c(
            "input",
            {
              ref: u,
              type: "date",
              value: d,
              onChange: p,
              className: "date-picker-input"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
              lineNumber: 200,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 199,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ c("div", { className: "mt-2 pt-2 border-t border-border", children: /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              onClick: () => {
                r(!1);
              },
              className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
              children: "Close"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
              lineNumber: 211,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 210,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
        lineNumber: 163,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
    lineNumber: 149,
    columnNumber: 5
  }, this);
}
function yd(e) {
  const t = new Date(e), n = /* @__PURE__ */ new Date(), o = new Date(n);
  o.setDate(o.getDate() + 1);
  const r = new Date(n);
  if (r.setDate(r.getDate() - 1), n.setHours(0, 0, 0, 0), o.setHours(0, 0, 0, 0), r.setHours(0, 0, 0, 0), t.setHours(0, 0, 0, 0), t.getTime() === n.getTime())
    return "Today";
  if (t.getTime() === o.getTime())
    return "Tomorrow";
  if (t.getTime() === r.getTime())
    return "Yesterday";
  const i = {
    month: "short",
    day: "numeric"
  };
  return t.getFullYear() !== n.getFullYear() && (i.year = "numeric"), t.toLocaleDateString("en-US", i);
}
function Cd(e) {
  const t = new Date(e), n = /* @__PURE__ */ new Date(), o = new Date(n);
  return o.setDate(o.getDate() + 7), n.setHours(0, 0, 0, 0), t.setHours(0, 0, 0, 0), t.getTime() === n.getTime() ? "date-today" : t < n ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Td = Lr.create({
  name: "datePill",
  group: "inline",
  inline: !0,
  atom: !0,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      date: {
        default: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({
          "data-date": e.date
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[data-type="date-pill"]'
      }
    ];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, o = yd(n), r = Cd(n);
    return [
      "span",
      pn(
        this.options.HTMLAttributes,
        t,
        {
          "data-type": "date-pill",
          class: `date-pill ${r}`.trim()
        }
      ),
      [
        "span",
        { class: "date-icon" },
        "📅"
      ],
      [
        "span",
        { class: "date-text" },
        o
      ]
    ];
  },
  // Use React component for interactive editing
  addNodeView() {
    return Mr(xd);
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
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
      // Type Ctrl+Shift+D to insert a date pill
      "Mod-Shift-d": () => this.editor.commands.insertDatePill()
    };
  },
  addInputRules() {
    const e = new bt({
      find: /@today\s$/,
      handler: ({ state: i, range: s, chain: a }) => {
        const l = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        a().deleteRange(s).insertDatePill(l).run();
      }
    }), t = new bt({
      find: /@tomorrow\s$/,
      handler: ({ state: i, range: s, chain: a }) => {
        const l = /* @__PURE__ */ new Date();
        l.setDate(l.getDate() + 1), a().deleteRange(s).insertDatePill(l.toISOString().split("T")[0]).run();
      }
    }), n = new bt({
      find: /@yesterday\s$/,
      handler: ({ state: i, range: s, chain: a }) => {
        const l = /* @__PURE__ */ new Date();
        l.setDate(l.getDate() - 1), a().deleteRange(s).insertDatePill(l.toISOString().split("T")[0]).run();
      }
    }), o = new bt({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ state: i, range: s, chain: a, match: l }) => {
        const u = l[1];
        a().deleteRange(s).insertDatePill(u).run();
      }
    }), r = new bt({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ state: i, range: s, chain: a, match: l }) => {
        const u = l[1], d = parseInt(l[2], 10), h = {
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
        }[u.toLowerCase()];
        if (h !== void 0) {
          const f = (/* @__PURE__ */ new Date()).getFullYear(), p = new Date(f, h, d);
          a().deleteRange(s).insertDatePill(p.toISOString().split("T")[0]).run();
        }
      }
    });
    return [e, t, n, o, r];
  }
});
function Ed({ isOpen: e, onClose: t, onInsert: n, position: o }) {
  const [r, i] = B(""), [s, a] = B(""), [l, u] = B(""), [d, m] = B(!1), h = Y(null), f = Y(null);
  Q(() => {
    e && (i(""), a(""), u(""), setTimeout(() => {
      h.current?.focus();
    }, 100));
  }, [e]), Q(() => {
    if (!e) return;
    const N = (y) => {
      f.current && !f.current.contains(y.target) && t();
    }, x = (y) => {
      y.key === "Escape" && t();
    };
    return document.addEventListener("mousedown", N), document.addEventListener("keydown", x), () => {
      document.removeEventListener("mousedown", N), document.removeEventListener("keydown", x);
    };
  }, [e, t]);
  const p = (N) => {
    if (!N.trim())
      return u("Please enter an image URL"), !1;
    try {
      const x = new URL(N);
      if (!["http:", "https:", "data:"].includes(x.protocol))
        return u("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return u("Please enter a valid URL"), !1;
    }
    return u(""), !0;
  }, b = async () => {
    if (!p(r)) return;
    m(!0);
    const N = new window.Image();
    N.onload = () => {
      m(!1), n(r.trim(), s.trim()), t();
    }, N.onerror = () => {
      m(!1), n(r.trim(), s.trim()), t();
    }, setTimeout(() => {
      d && (m(!1), n(r.trim(), s.trim()), t());
    }, 3e3), N.src = r.trim();
  }, v = (N) => {
    N.key === "Enter" && !N.shiftKey && (N.preventDefault(), b());
  };
  if (!e) return null;
  const g = o ? {
    top: o.top,
    left: Math.min(o.left, typeof window < "u" ? window.innerWidth - 340 : o.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ c(
    "div",
    {
      ref: f,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof g.top == "number", g.top),
        left: typeof g.left == "number" ? Math.max(8, g.left) : g.left,
        transform: o ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ c("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ c(so, { size: 16, className: "text-primary" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 143,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ c("span", { className: "font-medium text-sm", children: "Insert Image from URL" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 144,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 142,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ c(Nt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 151,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 146,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 141,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ c("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ c("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ c("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ c(Dr, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 160,
                columnNumber: 13
              }, this),
              "Image URL"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 159,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ c(
              "input",
              {
                ref: h,
                type: "url",
                value: r,
                onChange: (N) => {
                  i(N.target.value), l && u("");
                },
                onKeyDown: v,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 163,
                columnNumber: 11
              },
              this
            ),
            l && /* @__PURE__ */ c("span", { className: "image-url-dialog-error", children: l }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 176,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 158,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ c("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ c(gn, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 183,
                columnNumber: 13
              }, this),
              "Alt Text (optional)"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 182,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ c(
              "input",
              {
                type: "text",
                value: s,
                onChange: (N) => a(N.target.value),
                onKeyDown: v,
                placeholder: "Describe the image",
                className: "image-url-dialog-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 186,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 181,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c("div", { className: "image-url-dialog-actions", children: [
            /* @__PURE__ */ c(
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
                lineNumber: 198,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ c(
              "button",
              {
                onClick: b,
                disabled: d || !r.trim(),
                className: "image-url-dialog-btn image-url-dialog-btn-insert",
                children: d ? "Validating..." : "Insert Image"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 204,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 197,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 156,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
      lineNumber: 131,
      columnNumber: 5
    },
    this
  );
}
const Sd = [
  {
    title: "Paragraph",
    description: "Normal text",
    icon: /* @__PURE__ */ c(gn, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 62,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    description: "Large section heading",
    icon: /* @__PURE__ */ c(qn, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 69,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: /* @__PURE__ */ c(Or, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: /* @__PURE__ */ c($r, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list",
    icon: /* @__PURE__ */ c(to, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 90,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    description: "Create a numbered list",
    icon: /* @__PURE__ */ c(no, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 97,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    description: "Create a todo list with checkboxes",
    icon: /* @__PURE__ */ c(oo, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 104,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    description: "Add a blockquote",
    icon: /* @__PURE__ */ c(eo, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 111,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    description: "Add a code block with syntax highlighting",
    icon: /* @__PURE__ */ c(dr, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    description: "Insert a table",
    icon: /* @__PURE__ */ c(Vn, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 125,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  // Image command is handled separately with a dialog
  {
    title: "Image",
    description: "Insert an image from URL",
    icon: /* @__PURE__ */ c(so, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 133,
      columnNumber: 11
    }, void 0),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    description: "Add a horizontal rule",
    icon: /* @__PURE__ */ c(mr, { size: 18 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 144,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    description: "Add an info callout box",
    icon: /* @__PURE__ */ c(Dt, { size: 18, className: "text-blue-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 151,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Warning Callout",
    description: "Add a warning callout box",
    icon: /* @__PURE__ */ c(io, { size: 18, className: "text-yellow-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 158,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "warning" }).run(),
    keywords: ["caution", "alert"]
  },
  {
    title: "Error Callout",
    description: "Add an error callout box",
    icon: /* @__PURE__ */ c(ao, { size: 18, className: "text-red-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 165,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "error" }).run(),
    keywords: ["danger", "critical"]
  },
  {
    title: "Success Callout",
    description: "Add a success callout box",
    icon: /* @__PURE__ */ c(ro, { size: 18, className: "text-green-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 172,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "success" }).run(),
    keywords: ["done", "complete"]
  },
  {
    title: "Note Callout",
    description: "Add a note callout box",
    icon: /* @__PURE__ */ c(Ot, { size: 18, className: "text-purple-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 179,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Date",
    description: "Insert a date pill (today)",
    icon: /* @__PURE__ */ c(Hs, { size: 18, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 186,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    description: "Insert a [[page name]] link",
    icon: /* @__PURE__ */ c(Dr, { size: 18, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 193,
      columnNumber: 11
    }, void 0),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
];
function Rd({ editor: e }) {
  const [t, n] = B(!1), [o, r] = B(""), [i, s] = B(0), [a, l] = B({ top: 0, left: 0 }), [u, d] = B(!1), [m, h] = B({ top: 0, left: 0 }), f = Y(null), p = Sd.filter((N) => {
    const x = o.toLowerCase();
    return N.title.toLowerCase().includes(x) || N.description.toLowerCase().includes(x) || N.keywords?.some((y) => y.includes(x));
  }), b = H((N) => {
    const x = p[N];
    if (x) {
      const { state: y } = e, { selection: k } = y, { $from: S } = k, T = S.nodeBefore?.textContent || "", C = T.lastIndexOf("/");
      if (C !== -1) {
        const L = S.pos - (T.length - C);
        e.chain().focus().deleteRange({ from: L, to: S.pos }).run();
      }
      if (x.isImageCommand) {
        const L = e.view.coordsAtPos(S.pos);
        h({
          top: L.bottom + 8,
          left: L.left
        }), d(!0);
      } else
        x.command(e);
      n(!1), r(""), s(0);
    }
  }, [e, p]), v = H((N, x) => {
    e.chain().focus().setImage({ src: N, alt: x }).run();
  }, [e]);
  if (Q(() => {
    if (!e) return;
    const N = (y) => {
      if (!t) {
        if (y.key === "/") {
          const { state: k } = e, { selection: S } = k, { $from: T } = S, C = e.view.coordsAtPos(T.pos);
          l({
            top: C.bottom + 8,
            left: C.left
          }), setTimeout(() => {
            n(!0), r(""), s(0);
          }, 10);
        }
        return;
      }
      y.key === "ArrowDown" ? (y.preventDefault(), s((k) => (k + 1) % p.length)) : y.key === "ArrowUp" ? (y.preventDefault(), s((k) => (k - 1 + p.length) % p.length)) : y.key === "Enter" ? (y.preventDefault(), b(i)) : y.key === "Escape" ? (y.preventDefault(), n(!1), r("")) : y.key === "Backspace" ? o.length === 0 ? n(!1) : r((k) => k.slice(0, -1)) : y.key.length === 1 && !y.ctrlKey && !y.metaKey && (r((k) => k + y.key), s(0));
    }, x = (y) => {
      f.current && !f.current.contains(y.target) && (n(!1), r(""));
    };
    return document.addEventListener("keydown", N), document.addEventListener("click", x), () => {
      document.removeEventListener("keydown", N), document.removeEventListener("click", x);
    };
  }, [e, t, o, i, p, b]), Q(() => {
    i >= p.length && s(Math.max(0, p.length - 1));
  }, [p.length, i]), u)
    return /* @__PURE__ */ c(
      Ed,
      {
        isOpen: u,
        onClose: () => d(!1),
        onInsert: v,
        position: m
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
        lineNumber: 339,
        columnNumber: 7
      },
      this
    );
  if (!t || p.length === 0)
    return null;
  const g = {
    top: a.top,
    left: Math.min(a.left, typeof window < "u" ? window.innerWidth - 280 : a.left)
  };
  return /* @__PURE__ */ c(
    "div",
    {
      ref: f,
      className: "slash-command-menu fixed z-50 max-h-[60vh] overflow-y-auto",
      style: {
        top: g.top,
        left: Math.max(8, g.left)
      },
      children: [
        /* @__PURE__ */ c("div", { className: "text-xs text-muted-foreground px-3 py-2 border-b border-border", children: o ? `Searching: ${o}` : "Type to filter..." }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
          lineNumber: 367,
          columnNumber: 7
        }, this),
        p.map((N, x) => /* @__PURE__ */ c(
          "div",
          {
            className: `slash-command-item ${x === i ? "is-selected" : ""}`,
            onClick: () => b(x),
            onMouseEnter: () => s(x),
            onTouchStart: () => s(x),
            children: [
              /* @__PURE__ */ c("div", { className: "icon flex-shrink-0", children: N.icon }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
                lineNumber: 378,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ c("div", { className: "flex flex-col min-w-0", children: [
                /* @__PURE__ */ c("span", { className: "label truncate", children: N.title }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
                  lineNumber: 380,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ c("span", { className: "text-xs text-muted-foreground truncate", children: N.description }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
                  lineNumber: 381,
                  columnNumber: 13
                }, this)
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
                lineNumber: 379,
                columnNumber: 11
              }, this)
            ]
          },
          N.title,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
            lineNumber: 371,
            columnNumber: 9
          },
          this
        ))
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 359,
      columnNumber: 5
    },
    this
  );
}
function te(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Hi(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function So(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = Hi(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : Hi(e[r], null);
        }
      };
  };
}
function ve(...e) {
  return w.useCallback(So(...e), e);
}
function Ut(e, t = []) {
  let n = [];
  function o(i, s) {
    const a = w.createContext(s), l = n.length;
    n = [...n, s];
    const u = (m) => {
      const { scope: h, children: f, ...p } = m, b = h?.[e]?.[l] || a, v = w.useMemo(() => p, Object.values(p));
      return /* @__PURE__ */ R(b.Provider, { value: v, children: f });
    };
    u.displayName = i + "Provider";
    function d(m, h) {
      const f = h?.[e]?.[l] || a, p = w.useContext(f);
      if (p) return p;
      if (s !== void 0) return s;
      throw new Error(`\`${m}\` must be used within \`${i}\``);
    }
    return [u, d];
  }
  const r = () => {
    const i = n.map((s) => w.createContext(s));
    return function(a) {
      const l = a?.[e] || i;
      return w.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: l } }),
        [a, l]
      );
    };
  };
  return r.scopeName = e, [o, Ad(r, ...t)];
}
function Ad(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const s = o.reduce((a, { useScope: l, scopeName: u }) => {
        const m = l(i)[`__scope${u}`];
        return { ...a, ...m };
      }, {});
      return w.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var ct = globalThis?.document ? w.useLayoutEffect : () => {
}, Md = w[" useInsertionEffect ".trim().toString()] || ct;
function Ro({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, s] = Pd({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, l = a ? e : r;
  {
    const d = w.useRef(e !== void 0);
    w.useEffect(() => {
      const m = d.current;
      m !== a && console.warn(
        `${o} is changing from ${m ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = a;
    }, [a, o]);
  }
  const u = w.useCallback(
    (d) => {
      if (a) {
        const m = Ld(d) ? d(e) : d;
        m !== e && s.current?.(m);
      } else
        i(d);
    },
    [a, e, i, s]
  );
  return [l, u];
}
function Pd({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = w.useState(e), r = w.useRef(n), i = w.useRef(t);
  return Md(() => {
    i.current = t;
  }, [t]), w.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function Ld(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function cn(e) {
  const t = /* @__PURE__ */ Dd(e), n = w.forwardRef((o, r) => {
    const { children: i, ...s } = o, a = w.Children.toArray(i), l = a.find($d);
    if (l) {
      const u = l.props.children, d = a.map((m) => m === l ? w.Children.count(u) > 1 ? w.Children.only(null) : w.isValidElement(u) ? u.props.children : null : m);
      return /* @__PURE__ */ R(t, { ...s, ref: r, children: w.isValidElement(u) ? w.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ R(t, { ...s, ref: r, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Id = /* @__PURE__ */ cn("Slot");
// @__NO_SIDE_EFFECTS__
function Dd(e) {
  const t = w.forwardRef((n, o) => {
    const { children: r, ...i } = n;
    if (w.isValidElement(r)) {
      const s = zd(r), a = Bd(i, r.props);
      return r.type !== w.Fragment && (a.ref = o ? So(o, s) : s), w.cloneElement(r, a);
    }
    return w.Children.count(r) > 1 ? w.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Xs = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Od(e) {
  const t = ({ children: n }) => /* @__PURE__ */ R(Vu, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Xs, t;
}
function $d(e) {
  return w.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Xs;
}
function Bd(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...a) => {
      const l = i(...a);
      return r(...a), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function zd(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var _d = [
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
], be = _d.reduce((e, t) => {
  const n = /* @__PURE__ */ cn(`Primitive.${t}`), o = w.forwardRef((r, i) => {
    const { asChild: s, ...a } = r, l = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ R(l, { ...a, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Ys(e, t) {
  e && qs.flushSync(() => e.dispatchEvent(t));
}
function Zs(e) {
  const t = e + "CollectionProvider", [n, o] = Ut(t), [r, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (b) => {
    const { scope: v, children: g } = b, N = ht.useRef(null), x = ht.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ R(r, { scope: v, itemMap: x, collectionRef: N, children: g });
  };
  s.displayName = t;
  const a = e + "CollectionSlot", l = /* @__PURE__ */ cn(a), u = ht.forwardRef(
    (b, v) => {
      const { scope: g, children: N } = b, x = i(a, g), y = ve(v, x.collectionRef);
      return /* @__PURE__ */ R(l, { ref: y, children: N });
    }
  );
  u.displayName = a;
  const d = e + "CollectionItemSlot", m = "data-radix-collection-item", h = /* @__PURE__ */ cn(d), f = ht.forwardRef(
    (b, v) => {
      const { scope: g, children: N, ...x } = b, y = ht.useRef(null), k = ve(v, y), S = i(d, g);
      return ht.useEffect(() => (S.itemMap.set(y, { ref: y, ...x }), () => void S.itemMap.delete(y))), /* @__PURE__ */ R(h, { [m]: "", ref: k, children: N });
    }
  );
  f.displayName = d;
  function p(b) {
    const v = i(e + "CollectionConsumer", b);
    return ht.useCallback(() => {
      const N = v.collectionRef.current;
      if (!N) return [];
      const x = Array.from(N.querySelectorAll(`[${m}]`));
      return Array.from(v.itemMap.values()).sort(
        (S, T) => x.indexOf(S.ref.current) - x.indexOf(T.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [
    { Provider: s, Slot: u, ItemSlot: f },
    p,
    o
  ];
}
var Hd = w.createContext(void 0);
function Qs(e) {
  const t = w.useContext(Hd);
  return e || t || "ltr";
}
function _e(e) {
  const t = w.useRef(e);
  return w.useEffect(() => {
    t.current = e;
  }), w.useMemo(() => (...n) => t.current?.(...n), []);
}
function Fd(e, t = globalThis?.document) {
  const n = _e(e);
  w.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var Wd = "DismissableLayer", fr = "dismissableLayer.update", Ud = "dismissableLayer.pointerDownOutside", Vd = "dismissableLayer.focusOutside", Fi, Js = w.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Hr = w.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: i,
      onInteractOutside: s,
      onDismiss: a,
      ...l
    } = e, u = w.useContext(Js), [d, m] = w.useState(null), h = d?.ownerDocument ?? globalThis?.document, [, f] = w.useState({}), p = ve(t, (T) => m(T)), b = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), g = b.indexOf(v), N = d ? b.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, y = N >= g, k = Gd((T) => {
      const C = T.target, L = [...u.branches].some((O) => O.contains(C));
      !y || L || (r?.(T), s?.(T), T.defaultPrevented || a?.());
    }, h), S = qd((T) => {
      const C = T.target;
      [...u.branches].some((O) => O.contains(C)) || (i?.(T), s?.(T), T.defaultPrevented || a?.());
    }, h);
    return Fd((T) => {
      N === u.layers.size - 1 && (o?.(T), !T.defaultPrevented && a && (T.preventDefault(), a()));
    }, h), w.useEffect(() => {
      if (d)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Fi = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), Wi(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = Fi);
        };
    }, [d, h, n, u]), w.useEffect(() => () => {
      d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Wi());
    }, [d, u]), w.useEffect(() => {
      const T = () => f({});
      return document.addEventListener(fr, T), () => document.removeEventListener(fr, T);
    }, []), /* @__PURE__ */ R(
      be.div,
      {
        ...l,
        ref: p,
        style: {
          pointerEvents: x ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: te(e.onFocusCapture, S.onFocusCapture),
        onBlurCapture: te(e.onBlurCapture, S.onBlurCapture),
        onPointerDownCapture: te(
          e.onPointerDownCapture,
          k.onPointerDownCapture
        )
      }
    );
  }
);
Hr.displayName = Wd;
var jd = "DismissableLayerBranch", Kd = w.forwardRef((e, t) => {
  const n = w.useContext(Js), o = w.useRef(null), r = ve(t, o);
  return w.useEffect(() => {
    const i = o.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ R(be.div, { ...e, ref: r });
});
Kd.displayName = jd;
function Gd(e, t = globalThis?.document) {
  const n = _e(e), o = w.useRef(!1), r = w.useRef(() => {
  });
  return w.useEffect(() => {
    const i = (a) => {
      if (a.target && !o.current) {
        let l = function() {
          ea(
            Ud,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = l, t.addEventListener("click", r.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", r.current);
      o.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", i), t.removeEventListener("click", r.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => o.current = !0
  };
}
function qd(e, t = globalThis?.document) {
  const n = _e(e), o = w.useRef(!1);
  return w.useEffect(() => {
    const r = (i) => {
      i.target && !o.current && ea(Vd, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Wi() {
  const e = new CustomEvent(fr);
  document.dispatchEvent(e);
}
function ea(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Ys(r, i) : r.dispatchEvent(i);
}
var Ko = 0;
function Xd() {
  w.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ui()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ui()), Ko++, () => {
      Ko === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Ko--;
    };
  }, []);
}
function Ui() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Go = "focusScope.autoFocusOnMount", qo = "focusScope.autoFocusOnUnmount", Vi = { bubbles: !1, cancelable: !0 }, Yd = "FocusScope", ta = w.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: i,
    ...s
  } = e, [a, l] = w.useState(null), u = _e(r), d = _e(i), m = w.useRef(null), h = ve(t, (b) => l(b)), f = w.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  w.useEffect(() => {
    if (o) {
      let b = function(x) {
        if (f.paused || !a) return;
        const y = x.target;
        a.contains(y) ? m.current = y : at(m.current, { select: !0 });
      }, v = function(x) {
        if (f.paused || !a) return;
        const y = x.relatedTarget;
        y !== null && (a.contains(y) || at(m.current, { select: !0 }));
      }, g = function(x) {
        if (document.activeElement === document.body)
          for (const k of x)
            k.removedNodes.length > 0 && at(a);
      };
      document.addEventListener("focusin", b), document.addEventListener("focusout", v);
      const N = new MutationObserver(g);
      return a && N.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", b), document.removeEventListener("focusout", v), N.disconnect();
      };
    }
  }, [o, a, f.paused]), w.useEffect(() => {
    if (a) {
      Ki.add(f);
      const b = document.activeElement;
      if (!a.contains(b)) {
        const g = new CustomEvent(Go, Vi);
        a.addEventListener(Go, u), a.dispatchEvent(g), g.defaultPrevented || (Zd(nm(na(a)), { select: !0 }), document.activeElement === b && at(a));
      }
      return () => {
        a.removeEventListener(Go, u), setTimeout(() => {
          const g = new CustomEvent(qo, Vi);
          a.addEventListener(qo, d), a.dispatchEvent(g), g.defaultPrevented || at(b ?? document.body, { select: !0 }), a.removeEventListener(qo, d), Ki.remove(f);
        }, 0);
      };
    }
  }, [a, u, d, f]);
  const p = w.useCallback(
    (b) => {
      if (!n && !o || f.paused) return;
      const v = b.key === "Tab" && !b.altKey && !b.ctrlKey && !b.metaKey, g = document.activeElement;
      if (v && g) {
        const N = b.currentTarget, [x, y] = Qd(N);
        x && y ? !b.shiftKey && g === y ? (b.preventDefault(), n && at(x, { select: !0 })) : b.shiftKey && g === x && (b.preventDefault(), n && at(y, { select: !0 })) : g === N && b.preventDefault();
      }
    },
    [n, o, f.paused]
  );
  return /* @__PURE__ */ R(be.div, { tabIndex: -1, ...s, ref: h, onKeyDown: p });
});
ta.displayName = Yd;
function Zd(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (at(o, { select: t }), document.activeElement !== n) return;
}
function Qd(e) {
  const t = na(e), n = ji(t, e), o = ji(t.reverse(), e);
  return [n, o];
}
function na(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function ji(e, t) {
  for (const n of e)
    if (!Jd(n, { upTo: t })) return n;
}
function Jd(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function em(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function at(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && em(e) && t && e.select();
  }
}
var Ki = tm();
function tm() {
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
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function nm(e) {
  return e.filter((t) => t.tagName !== "A");
}
var om = w[" useId ".trim().toString()] || (() => {
}), rm = 0;
function _t(e) {
  const [t, n] = w.useState(om());
  return ct(() => {
    n((o) => o ?? String(rm++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const im = ["top", "right", "bottom", "left"], ut = Math.min, ye = Math.max, co = Math.round, In = Math.floor, ze = (e) => ({
  x: e,
  y: e
}), sm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, am = {
  start: "end",
  end: "start"
};
function hr(e, t, n) {
  return ye(e, ut(t, n));
}
function qe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Xe(e) {
  return e.split("-")[0];
}
function Vt(e) {
  return e.split("-")[1];
}
function Fr(e) {
  return e === "x" ? "y" : "x";
}
function Wr(e) {
  return e === "y" ? "height" : "width";
}
const lm = /* @__PURE__ */ new Set(["top", "bottom"]);
function Be(e) {
  return lm.has(Xe(e)) ? "y" : "x";
}
function Ur(e) {
  return Fr(Be(e));
}
function cm(e, t, n) {
  n === void 0 && (n = !1);
  const o = Vt(e), r = Ur(e), i = Wr(r);
  let s = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = uo(s)), [s, uo(s)];
}
function um(e) {
  const t = uo(e);
  return [pr(e), t, pr(t)];
}
function pr(e) {
  return e.replace(/start|end/g, (t) => am[t]);
}
const qi = ["left", "right"], Xi = ["right", "left"], dm = ["top", "bottom"], mm = ["bottom", "top"];
function fm(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Xi : qi : t ? qi : Xi;
    case "left":
    case "right":
      return t ? dm : mm;
    default:
      return [];
  }
}
function hm(e, t, n, o) {
  const r = Vt(e);
  let i = fm(Xe(e), n === "start", o);
  return r && (i = i.map((s) => s + "-" + r), t && (i = i.concat(i.map(pr)))), i;
}
function uo(e) {
  return e.replace(/left|right|bottom|top/g, (t) => sm[t]);
}
function pm(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function oa(e) {
  return typeof e != "number" ? pm(e) : {
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
function Yi(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const i = Be(t), s = Ur(t), a = Wr(s), l = Xe(t), u = i === "y", d = o.x + o.width / 2 - r.width / 2, m = o.y + o.height / 2 - r.height / 2, h = o[a] / 2 - r[a] / 2;
  let f;
  switch (l) {
    case "top":
      f = {
        x: d,
        y: o.y - r.height
      };
      break;
    case "bottom":
      f = {
        x: d,
        y: o.y + o.height
      };
      break;
    case "right":
      f = {
        x: o.x + o.width,
        y: m
      };
      break;
    case "left":
      f = {
        x: o.x - r.width,
        y: m
      };
      break;
    default:
      f = {
        x: o.x,
        y: o.y
      };
  }
  switch (Vt(t)) {
    case "start":
      f[s] -= h * (n && u ? -1 : 1);
      break;
    case "end":
      f[s] += h * (n && u ? -1 : 1);
      break;
  }
  return f;
}
const bm = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: s
  } = n, a = i.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: d,
    y: m
  } = Yi(u, o, l), h = o, f = {}, p = 0;
  for (let b = 0; b < a.length; b++) {
    const {
      name: v,
      fn: g
    } = a[b], {
      x: N,
      y: x,
      data: y,
      reset: k
    } = await g({
      x: d,
      y: m,
      initialPlacement: o,
      placement: h,
      strategy: r,
      middlewareData: f,
      rects: u,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = N ?? d, m = x ?? m, f = {
      ...f,
      [v]: {
        ...f[v],
        ...y
      }
    }, k && p <= 50 && (p++, typeof k == "object" && (k.placement && (h = k.placement), k.rects && (u = k.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : k.rects), {
      x: d,
      y: m
    } = Yi(u, h, l)), b = -1);
  }
  return {
    x: d,
    y: m,
    placement: h,
    strategy: r,
    middlewareData: f
  };
};
async function un(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: i,
    rects: s,
    elements: a,
    strategy: l
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: m = "floating",
    altBoundary: h = !1,
    padding: f = 0
  } = qe(t, e), p = oa(f), v = a[h ? m === "floating" ? "reference" : "floating" : m], g = mo(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(v))) == null || n ? v : v.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: u,
    rootBoundary: d,
    strategy: l
  })), N = m === "floating" ? {
    x: o,
    y: r,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, x = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), y = await (i.isElement == null ? void 0 : i.isElement(x)) ? await (i.getScale == null ? void 0 : i.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, k = mo(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: N,
    offsetParent: x,
    strategy: l
  }) : N);
  return {
    top: (g.top - k.top + p.top) / y.y,
    bottom: (k.bottom - g.bottom + p.bottom) / y.y,
    left: (g.left - k.left + p.left) / y.x,
    right: (k.right - g.right + p.right) / y.x
  };
}
const gm = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: i,
      platform: s,
      elements: a,
      middlewareData: l
    } = t, {
      element: u,
      padding: d = 0
    } = qe(e, t) || {};
    if (u == null)
      return {};
    const m = oa(d), h = {
      x: n,
      y: o
    }, f = Ur(r), p = Wr(f), b = await s.getDimensions(u), v = f === "y", g = v ? "top" : "left", N = v ? "bottom" : "right", x = v ? "clientHeight" : "clientWidth", y = i.reference[p] + i.reference[f] - h[f] - i.floating[p], k = h[f] - i.reference[f], S = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
    let T = S ? S[x] : 0;
    (!T || !await (s.isElement == null ? void 0 : s.isElement(S))) && (T = a.floating[x] || i.floating[p]);
    const C = y / 2 - k / 2, L = T / 2 - b[p] / 2 - 1, O = ut(m[g], L), V = ut(m[N], L), W = O, U = T - b[p] - V, K = T / 2 - b[p] / 2 + C, J = hr(W, K, U), F = !l.arrow && Vt(r) != null && K !== J && i.reference[p] / 2 - (K < W ? O : V) - b[p] / 2 < 0, G = F ? K < W ? K - W : K - U : 0;
    return {
      [f]: h[f] + G,
      data: {
        [f]: J,
        centerOffset: K - J - G,
        ...F && {
          alignmentOffset: G
        }
      },
      reset: F
    };
  }
}), vm = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: i,
        rects: s,
        initialPlacement: a,
        platform: l,
        elements: u
      } = t, {
        mainAxis: d = !0,
        crossAxis: m = !0,
        fallbackPlacements: h,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: b = !0,
        ...v
      } = qe(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const g = Xe(r), N = Be(a), x = Xe(a) === a, y = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), k = h || (x || !b ? [uo(a)] : um(a)), S = p !== "none";
      !h && S && k.push(...hm(a, b, p, y));
      const T = [a, ...k], C = await un(t, v), L = [];
      let O = ((o = i.flip) == null ? void 0 : o.overflows) || [];
      if (d && L.push(C[g]), m) {
        const K = cm(r, s, y);
        L.push(C[K[0]], C[K[1]]);
      }
      if (O = [...O, {
        placement: r,
        overflows: L
      }], !L.every((K) => K <= 0)) {
        var V, W;
        const K = (((V = i.flip) == null ? void 0 : V.index) || 0) + 1, J = T[K];
        if (J && (!(m === "alignment" ? N !== Be(J) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        O.every((A) => Be(A.placement) === N ? A.overflows[0] > 0 : !0)))
          return {
            data: {
              index: K,
              overflows: O
            },
            reset: {
              placement: J
            }
          };
        let F = (W = O.filter((G) => G.overflows[0] <= 0).sort((G, A) => G.overflows[1] - A.overflows[1])[0]) == null ? void 0 : W.placement;
        if (!F)
          switch (f) {
            case "bestFit": {
              var U;
              const G = (U = O.filter((A) => {
                if (S) {
                  const $ = Be(A.placement);
                  return $ === N || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  $ === "y";
                }
                return !0;
              }).map((A) => [A.placement, A.overflows.filter(($) => $ > 0).reduce(($, E) => $ + E, 0)]).sort((A, $) => A[1] - $[1])[0]) == null ? void 0 : U[0];
              G && (F = G);
              break;
            }
            case "initialPlacement":
              F = a;
              break;
          }
        if (r !== F)
          return {
            reset: {
              placement: F
            }
          };
      }
      return {};
    }
  };
};
function Zi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Qi(e) {
  return im.some((t) => e[t] >= 0);
}
const wm = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = qe(e, t);
      switch (o) {
        case "referenceHidden": {
          const i = await un(t, {
            ...r,
            elementContext: "reference"
          }), s = Zi(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Qi(s)
            }
          };
        }
        case "escaped": {
          const i = await un(t, {
            ...r,
            altBoundary: !0
          }), s = Zi(i, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Qi(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ra = /* @__PURE__ */ new Set(["left", "top"]);
async function Nm(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), s = Xe(n), a = Vt(n), l = Be(n) === "y", u = ra.has(s) ? -1 : 1, d = i && l ? -1 : 1, m = qe(t, e);
  let {
    mainAxis: h,
    crossAxis: f,
    alignmentAxis: p
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: m.mainAxis || 0,
    crossAxis: m.crossAxis || 0,
    alignmentAxis: m.alignmentAxis
  };
  return a && typeof p == "number" && (f = a === "end" ? p * -1 : p), l ? {
    x: f * d,
    y: h * u
  } : {
    x: h * u,
    y: f * d
  };
}
const km = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: i,
        placement: s,
        middlewareData: a
      } = t, l = await Nm(t, e);
      return s === ((n = a.offset) == null ? void 0 : n.placement) && (o = a.arrow) != null && o.alignmentOffset ? {} : {
        x: r + l.x,
        y: i + l.y,
        data: {
          ...l,
          placement: s
        }
      };
    }
  };
}, xm = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r
      } = t, {
        mainAxis: i = !0,
        crossAxis: s = !1,
        limiter: a = {
          fn: (v) => {
            let {
              x: g,
              y: N
            } = v;
            return {
              x: g,
              y: N
            };
          }
        },
        ...l
      } = qe(e, t), u = {
        x: n,
        y: o
      }, d = await un(t, l), m = Be(Xe(r)), h = Fr(m);
      let f = u[h], p = u[m];
      if (i) {
        const v = h === "y" ? "top" : "left", g = h === "y" ? "bottom" : "right", N = f + d[v], x = f - d[g];
        f = hr(N, f, x);
      }
      if (s) {
        const v = m === "y" ? "top" : "left", g = m === "y" ? "bottom" : "right", N = p + d[v], x = p - d[g];
        p = hr(N, p, x);
      }
      const b = a.fn({
        ...t,
        [h]: f,
        [m]: p
      });
      return {
        ...b,
        data: {
          x: b.x - n,
          y: b.y - o,
          enabled: {
            [h]: i,
            [m]: s
          }
        }
      };
    }
  };
}, ym = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: i,
        middlewareData: s
      } = t, {
        offset: a = 0,
        mainAxis: l = !0,
        crossAxis: u = !0
      } = qe(e, t), d = {
        x: n,
        y: o
      }, m = Be(r), h = Fr(m);
      let f = d[h], p = d[m];
      const b = qe(a, t), v = typeof b == "number" ? {
        mainAxis: b,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...b
      };
      if (l) {
        const x = h === "y" ? "height" : "width", y = i.reference[h] - i.floating[x] + v.mainAxis, k = i.reference[h] + i.reference[x] - v.mainAxis;
        f < y ? f = y : f > k && (f = k);
      }
      if (u) {
        var g, N;
        const x = h === "y" ? "width" : "height", y = ra.has(Xe(r)), k = i.reference[m] - i.floating[x] + (y && ((g = s.offset) == null ? void 0 : g[m]) || 0) + (y ? 0 : v.crossAxis), S = i.reference[m] + i.reference[x] + (y ? 0 : ((N = s.offset) == null ? void 0 : N[m]) || 0) - (y ? v.crossAxis : 0);
        p < k ? p = k : p > S && (p = S);
      }
      return {
        [h]: f,
        [m]: p
      };
    }
  };
}, Cm = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: i,
        platform: s,
        elements: a
      } = t, {
        apply: l = () => {
        },
        ...u
      } = qe(e, t), d = await un(t, u), m = Xe(r), h = Vt(r), f = Be(r) === "y", {
        width: p,
        height: b
      } = i.floating;
      let v, g;
      m === "top" || m === "bottom" ? (v = m, g = h === (await (s.isRTL == null ? void 0 : s.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (g = m, v = h === "end" ? "top" : "bottom");
      const N = b - d.top - d.bottom, x = p - d.left - d.right, y = ut(b - d[v], N), k = ut(p - d[g], x), S = !t.middlewareData.shift;
      let T = y, C = k;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (C = x), (o = t.middlewareData.shift) != null && o.enabled.y && (T = N), S && !h) {
        const O = ye(d.left, 0), V = ye(d.right, 0), W = ye(d.top, 0), U = ye(d.bottom, 0);
        f ? C = p - 2 * (O !== 0 || V !== 0 ? O + V : ye(d.left, d.right)) : T = b - 2 * (W !== 0 || U !== 0 ? W + U : ye(d.top, d.bottom));
      }
      await l({
        ...t,
        availableWidth: C,
        availableHeight: T
      });
      const L = await s.getDimensions(a.floating);
      return p !== L.width || b !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ao() {
  return typeof window < "u";
}
function jt(e) {
  return ia(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ce(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Fe(e) {
  var t;
  return (t = (ia(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ia(e) {
  return Ao() ? e instanceof Node || e instanceof Ce(e).Node : !1;
}
function Me(e) {
  return Ao() ? e instanceof Element || e instanceof Ce(e).Element : !1;
}
function He(e) {
  return Ao() ? e instanceof HTMLElement || e instanceof Ce(e).HTMLElement : !1;
}
function Ji(e) {
  return !Ao() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ce(e).ShadowRoot;
}
const Tm = /* @__PURE__ */ new Set(["inline", "contents"]);
function vn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Pe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !Tm.has(r);
}
const Em = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Sm(e) {
  return Em.has(jt(e));
}
const Rm = [":popover-open", ":modal"];
function Mo(e) {
  return Rm.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Am = ["transform", "translate", "scale", "rotate", "perspective"], Mm = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Pm = ["paint", "layout", "strict", "content"];
function Vr(e) {
  const t = jr(), n = Me(e) ? Pe(e) : e;
  return Am.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Mm.some((o) => (n.willChange || "").includes(o)) || Pm.some((o) => (n.contain || "").includes(o));
}
function Lm(e) {
  let t = dt(e);
  for (; He(t) && !Ht(t); ) {
    if (Vr(t))
      return t;
    if (Mo(t))
      return null;
    t = dt(t);
  }
  return null;
}
function jr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Im = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Ht(e) {
  return Im.has(jt(e));
}
function Pe(e) {
  return Ce(e).getComputedStyle(e);
}
function Po(e) {
  return Me(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function dt(e) {
  if (jt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Ji(e) && e.host || // Fallback.
    Fe(e)
  );
  return Ji(t) ? t.host : t;
}
function sa(e) {
  const t = dt(e);
  return Ht(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : He(t) && vn(t) ? t : sa(t);
}
function dn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = sa(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), s = Ce(r);
  if (i) {
    const a = br(s);
    return t.concat(s, s.visualViewport || [], vn(r) ? r : [], a && n ? dn(a) : []);
  }
  return t.concat(r, dn(r, [], n));
}
function br(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function aa(e) {
  const t = Pe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = He(e), i = r ? e.offsetWidth : n, s = r ? e.offsetHeight : o, a = co(n) !== i || co(o) !== s;
  return a && (n = i, o = s), {
    width: n,
    height: o,
    $: a
  };
}
function Kr(e) {
  return Me(e) ? e : e.contextElement;
}
function $t(e) {
  const t = Kr(e);
  if (!He(t))
    return ze(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: i
  } = aa(t);
  let s = (i ? co(n.width) : n.width) / o, a = (i ? co(n.height) : n.height) / r;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const Dm = /* @__PURE__ */ ze(0);
function la(e) {
  const t = Ce(e);
  return !jr() || !t.visualViewport ? Dm : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Om(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ce(e) ? !1 : t;
}
function vt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), i = Kr(e);
  let s = ze(1);
  t && (o ? Me(o) && (s = $t(o)) : s = $t(e));
  const a = Om(i, n, o) ? la(i) : ze(0);
  let l = (r.left + a.x) / s.x, u = (r.top + a.y) / s.y, d = r.width / s.x, m = r.height / s.y;
  if (i) {
    const h = Ce(i), f = o && Me(o) ? Ce(o) : o;
    let p = h, b = br(p);
    for (; b && o && f !== p; ) {
      const v = $t(b), g = b.getBoundingClientRect(), N = Pe(b), x = g.left + (b.clientLeft + parseFloat(N.paddingLeft)) * v.x, y = g.top + (b.clientTop + parseFloat(N.paddingTop)) * v.y;
      l *= v.x, u *= v.y, d *= v.x, m *= v.y, l += x, u += y, p = Ce(b), b = br(p);
    }
  }
  return mo({
    width: d,
    height: m,
    x: l,
    y: u
  });
}
function Lo(e, t) {
  const n = Po(e).scrollLeft;
  return t ? t.left + n : vt(Fe(e)).left + n;
}
function ca(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - Lo(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function $m(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const i = r === "fixed", s = Fe(o), a = t ? Mo(t.floating) : !1;
  if (o === s || a && i)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = ze(1);
  const d = ze(0), m = He(o);
  if ((m || !m && !i) && ((jt(o) !== "body" || vn(s)) && (l = Po(o)), He(o))) {
    const f = vt(o);
    u = $t(o), d.x = f.x + o.clientLeft, d.y = f.y + o.clientTop;
  }
  const h = s && !m && !i ? ca(s, l) : ze(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + d.x + h.x,
    y: n.y * u.y - l.scrollTop * u.y + d.y + h.y
  };
}
function Bm(e) {
  return Array.from(e.getClientRects());
}
function zm(e) {
  const t = Fe(e), n = Po(e), o = e.ownerDocument.body, r = ye(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), i = ye(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -n.scrollLeft + Lo(e);
  const a = -n.scrollTop;
  return Pe(o).direction === "rtl" && (s += ye(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: i,
    x: s,
    y: a
  };
}
const es = 25;
function _m(e, t) {
  const n = Ce(e), o = Fe(e), r = n.visualViewport;
  let i = o.clientWidth, s = o.clientHeight, a = 0, l = 0;
  if (r) {
    i = r.width, s = r.height;
    const d = jr();
    (!d || d && t === "fixed") && (a = r.offsetLeft, l = r.offsetTop);
  }
  const u = Lo(o);
  if (u <= 0) {
    const d = o.ownerDocument, m = d.body, h = getComputedStyle(m), f = d.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, p = Math.abs(o.clientWidth - m.clientWidth - f);
    p <= es && (i -= p);
  } else u <= es && (i += u);
  return {
    width: i,
    height: s,
    x: a,
    y: l
  };
}
const Hm = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Fm(e, t) {
  const n = vt(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, i = He(e) ? $t(e) : ze(1), s = e.clientWidth * i.x, a = e.clientHeight * i.y, l = r * i.x, u = o * i.y;
  return {
    width: s,
    height: a,
    x: l,
    y: u
  };
}
function ts(e, t, n) {
  let o;
  if (t === "viewport")
    o = _m(e, n);
  else if (t === "document")
    o = zm(Fe(e));
  else if (Me(t))
    o = Fm(t, n);
  else {
    const r = la(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return mo(o);
}
function ua(e, t) {
  const n = dt(e);
  return n === t || !Me(n) || Ht(n) ? !1 : Pe(n).position === "fixed" || ua(n, t);
}
function Wm(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = dn(e, [], !1).filter((a) => Me(a) && jt(a) !== "body"), r = null;
  const i = Pe(e).position === "fixed";
  let s = i ? dt(e) : e;
  for (; Me(s) && !Ht(s); ) {
    const a = Pe(s), l = Vr(s);
    !l && a.position === "fixed" && (r = null), (i ? !l && !r : !l && a.position === "static" && !!r && Hm.has(r.position) || vn(s) && !l && ua(e, s)) ? o = o.filter((d) => d !== s) : r = a, s = dt(s);
  }
  return t.set(e, o), o;
}
function Um(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const s = [...n === "clippingAncestors" ? Mo(t) ? [] : Wm(t, this._c) : [].concat(n), o], a = s[0], l = s.reduce((u, d) => {
    const m = ts(t, d, r);
    return u.top = ye(m.top, u.top), u.right = ut(m.right, u.right), u.bottom = ut(m.bottom, u.bottom), u.left = ye(m.left, u.left), u;
  }, ts(t, a, r));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Vm(e) {
  const {
    width: t,
    height: n
  } = aa(e);
  return {
    width: t,
    height: n
  };
}
function jm(e, t, n) {
  const o = He(t), r = Fe(t), i = n === "fixed", s = vt(e, !0, i, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ze(0);
  function u() {
    l.x = Lo(r);
  }
  if (o || !o && !i)
    if ((jt(t) !== "body" || vn(r)) && (a = Po(t)), o) {
      const f = vt(t, !0, i, t);
      l.x = f.x + t.clientLeft, l.y = f.y + t.clientTop;
    } else r && u();
  i && !o && r && u();
  const d = r && !o && !i ? ca(r, a) : ze(0), m = s.left + a.scrollLeft - l.x - d.x, h = s.top + a.scrollTop - l.y - d.y;
  return {
    x: m,
    y: h,
    width: s.width,
    height: s.height
  };
}
function Xo(e) {
  return Pe(e).position === "static";
}
function ns(e, t) {
  if (!He(e) || Pe(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Fe(e) === n && (n = n.ownerDocument.body), n;
}
function da(e, t) {
  const n = Ce(e);
  if (Mo(e))
    return n;
  if (!He(e)) {
    let r = dt(e);
    for (; r && !Ht(r); ) {
      if (Me(r) && !Xo(r))
        return r;
      r = dt(r);
    }
    return n;
  }
  let o = ns(e, t);
  for (; o && Sm(o) && Xo(o); )
    o = ns(o, t);
  return o && Ht(o) && Xo(o) && !Vr(o) ? n : o || Lm(e) || n;
}
const Km = async function(e) {
  const t = this.getOffsetParent || da, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: jm(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Gm(e) {
  return Pe(e).direction === "rtl";
}
const qm = {
  convertOffsetParentRelativeRectToViewportRelativeRect: $m,
  getDocumentElement: Fe,
  getClippingRect: Um,
  getOffsetParent: da,
  getElementRects: Km,
  getClientRects: Bm,
  getDimensions: Vm,
  getScale: $t,
  isElement: Me,
  isRTL: Gm
};
function ma(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Xm(e, t) {
  let n = null, o;
  const r = Fe(e);
  function i() {
    var a;
    clearTimeout(o), (a = n) == null || a.disconnect(), n = null;
  }
  function s(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), i();
    const u = e.getBoundingClientRect(), {
      left: d,
      top: m,
      width: h,
      height: f
    } = u;
    if (a || t(), !h || !f)
      return;
    const p = In(m), b = In(r.clientWidth - (d + h)), v = In(r.clientHeight - (m + f)), g = In(d), x = {
      rootMargin: -p + "px " + -b + "px " + -v + "px " + -g + "px",
      threshold: ye(0, ut(1, l)) || 1
    };
    let y = !0;
    function k(S) {
      const T = S[0].intersectionRatio;
      if (T !== l) {
        if (!y)
          return s();
        T ? s(!1, T) : o = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      T === 1 && !ma(u, e.getBoundingClientRect()) && s(), y = !1;
    }
    try {
      n = new IntersectionObserver(k, {
        ...x,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(k, x);
    }
    n.observe(e);
  }
  return s(!0), i;
}
function Ym(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, u = Kr(e), d = r || i ? [...u ? dn(u) : [], ...dn(t)] : [];
  d.forEach((g) => {
    r && g.addEventListener("scroll", n, {
      passive: !0
    }), i && g.addEventListener("resize", n);
  });
  const m = u && a ? Xm(u, n) : null;
  let h = -1, f = null;
  s && (f = new ResizeObserver((g) => {
    let [N] = g;
    N && N.target === u && f && (f.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var x;
      (x = f) == null || x.observe(t);
    })), n();
  }), u && !l && f.observe(u), f.observe(t));
  let p, b = l ? vt(e) : null;
  l && v();
  function v() {
    const g = vt(e);
    b && !ma(b, g) && n(), b = g, p = requestAnimationFrame(v);
  }
  return n(), () => {
    var g;
    d.forEach((N) => {
      r && N.removeEventListener("scroll", n), i && N.removeEventListener("resize", n);
    }), m?.(), (g = f) == null || g.disconnect(), f = null, l && cancelAnimationFrame(p);
  };
}
const Zm = km, Qm = xm, Jm = vm, ef = Cm, tf = wm, os = gm, nf = ym, of = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: qm,
    ...n
  }, i = {
    ...r.platform,
    _c: o
  };
  return bm(e, t, {
    ...r,
    platform: i
  });
};
var rf = typeof document < "u", sf = function() {
}, jn = rf ? ou : sf;
function fo(e, t) {
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
        if (!fo(e[o], t[o]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!{}.hasOwnProperty.call(t, r[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      const i = r[o];
      if (!(i === "_owner" && e.$$typeof) && !fo(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function fa(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function rs(e, t) {
  const n = fa(e);
  return Math.round(t * n) / n;
}
function Yo(e) {
  const t = w.useRef(e);
  return jn(() => {
    t.current = e;
  }), t;
}
function af(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: r,
    elements: {
      reference: i,
      floating: s
    } = {},
    transform: a = !0,
    whileElementsMounted: l,
    open: u
  } = e, [d, m] = w.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, f] = w.useState(o);
  fo(h, o) || f(o);
  const [p, b] = w.useState(null), [v, g] = w.useState(null), N = w.useCallback((A) => {
    A !== S.current && (S.current = A, b(A));
  }, []), x = w.useCallback((A) => {
    A !== T.current && (T.current = A, g(A));
  }, []), y = i || p, k = s || v, S = w.useRef(null), T = w.useRef(null), C = w.useRef(d), L = l != null, O = Yo(l), V = Yo(r), W = Yo(u), U = w.useCallback(() => {
    if (!S.current || !T.current)
      return;
    const A = {
      placement: t,
      strategy: n,
      middleware: h
    };
    V.current && (A.platform = V.current), of(S.current, T.current, A).then(($) => {
      const E = {
        ...$,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: W.current !== !1
      };
      K.current && !fo(C.current, E) && (C.current = E, qs.flushSync(() => {
        m(E);
      }));
    });
  }, [h, t, n, V, W]);
  jn(() => {
    u === !1 && C.current.isPositioned && (C.current.isPositioned = !1, m((A) => ({
      ...A,
      isPositioned: !1
    })));
  }, [u]);
  const K = w.useRef(!1);
  jn(() => (K.current = !0, () => {
    K.current = !1;
  }), []), jn(() => {
    if (y && (S.current = y), k && (T.current = k), y && k) {
      if (O.current)
        return O.current(y, k, U);
      U();
    }
  }, [y, k, U, O, L]);
  const J = w.useMemo(() => ({
    reference: S,
    floating: T,
    setReference: N,
    setFloating: x
  }), [N, x]), F = w.useMemo(() => ({
    reference: y,
    floating: k
  }), [y, k]), G = w.useMemo(() => {
    const A = {
      position: n,
      left: 0,
      top: 0
    };
    if (!F.floating)
      return A;
    const $ = rs(F.floating, d.x), E = rs(F.floating, d.y);
    return a ? {
      ...A,
      transform: "translate(" + $ + "px, " + E + "px)",
      ...fa(F.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: $,
      top: E
    };
  }, [n, a, F.floating, d.x, d.y]);
  return w.useMemo(() => ({
    ...d,
    update: U,
    refs: J,
    elements: F,
    floatingStyles: G
  }), [d, U, J, F, G]);
}
const lf = (e) => {
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
      return o && t(o) ? o.current != null ? os({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? os({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, cf = (e, t) => ({
  ...Zm(e),
  options: [e, t]
}), uf = (e, t) => ({
  ...Qm(e),
  options: [e, t]
}), df = (e, t) => ({
  ...nf(e),
  options: [e, t]
}), mf = (e, t) => ({
  ...Jm(e),
  options: [e, t]
}), ff = (e, t) => ({
  ...ef(e),
  options: [e, t]
}), hf = (e, t) => ({
  ...tf(e),
  options: [e, t]
}), pf = (e, t) => ({
  ...lf(e),
  options: [e, t]
});
var bf = "Arrow", ha = w.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...i } = e;
  return /* @__PURE__ */ R(
    be.svg,
    {
      ...i,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ R("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ha.displayName = bf;
var gf = ha;
function vf(e) {
  const [t, n] = w.useState(void 0);
  return ct(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const i = r[0];
        let s, a;
        if ("borderBoxSize" in i) {
          const l = i.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          s = u.inlineSize, a = u.blockSize;
        } else
          s = e.offsetWidth, a = e.offsetHeight;
        n({ width: s, height: a });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Gr = "Popper", [pa, Io] = Ut(Gr), [wf, ba] = pa(Gr), ga = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = w.useState(null);
  return /* @__PURE__ */ R(wf, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
ga.displayName = Gr;
var va = "PopperAnchor", wa = w.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, i = ba(va, n), s = w.useRef(null), a = ve(t, s), l = w.useRef(null);
    return w.useEffect(() => {
      const u = l.current;
      l.current = o?.current || s.current, u !== l.current && i.onAnchorChange(l.current);
    }), o ? null : /* @__PURE__ */ R(be.div, { ...r, ref: a });
  }
);
wa.displayName = va;
var qr = "PopperContent", [Nf, kf] = pa(qr), Na = w.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: i = "center",
      alignOffset: s = 0,
      arrowPadding: a = 0,
      avoidCollisions: l = !0,
      collisionBoundary: u = [],
      collisionPadding: d = 0,
      sticky: m = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: f = "optimized",
      onPlaced: p,
      ...b
    } = e, v = ba(qr, n), [g, N] = w.useState(null), x = ve(t, (X) => N(X)), [y, k] = w.useState(null), S = vf(y), T = S?.width ?? 0, C = S?.height ?? 0, L = o + (i !== "center" ? "-" + i : ""), O = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, V = Array.isArray(u) ? u : [u], W = V.length > 0, U = {
      padding: O,
      boundary: V.filter(yf),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: W
    }, { refs: K, floatingStyles: J, placement: F, isPositioned: G, middlewareData: A } = af({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: L,
      whileElementsMounted: (...X) => Ym(...X, {
        animationFrame: f === "always"
      }),
      elements: {
        reference: v.anchor
      },
      middleware: [
        cf({ mainAxis: r + C, alignmentAxis: s }),
        l && uf({
          mainAxis: !0,
          crossAxis: !1,
          limiter: m === "partial" ? df() : void 0,
          ...U
        }),
        l && mf({ ...U }),
        ff({
          ...U,
          apply: ({ elements: X, rects: xe, availableWidth: Le, availableHeight: Ie }) => {
            const { width: Je, height: We } = xe.reference, ft = X.floating.style;
            ft.setProperty("--radix-popper-available-width", `${Le}px`), ft.setProperty("--radix-popper-available-height", `${Ie}px`), ft.setProperty("--radix-popper-anchor-width", `${Je}px`), ft.setProperty("--radix-popper-anchor-height", `${We}px`);
          }
        }),
        y && pf({ element: y, padding: a }),
        Cf({ arrowWidth: T, arrowHeight: C }),
        h && hf({ strategy: "referenceHidden", ...U })
      ]
    }), [$, E] = ya(F), D = _e(p);
    ct(() => {
      G && D?.();
    }, [G, D]);
    const j = A.arrow?.x, q = A.arrow?.y, se = A.arrow?.centerOffset !== 0, [ue, de] = w.useState();
    return ct(() => {
      g && de(window.getComputedStyle(g).zIndex);
    }, [g]), /* @__PURE__ */ R(
      "div",
      {
        ref: K.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...J,
          transform: G ? J.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ue,
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
        children: /* @__PURE__ */ R(
          Nf,
          {
            scope: n,
            placedSide: $,
            onArrowChange: k,
            arrowX: j,
            arrowY: q,
            shouldHideArrow: se,
            children: /* @__PURE__ */ R(
              be.div,
              {
                "data-side": $,
                "data-align": E,
                ...b,
                ref: x,
                style: {
                  ...b.style,
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
Na.displayName = qr;
var ka = "PopperArrow", xf = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, xa = w.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, i = kf(ka, o), s = xf[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ R(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [s]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ R(
          gf,
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
xa.displayName = ka;
function yf(e) {
  return e !== null;
}
var Cf = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, s = r.arrow?.centerOffset !== 0, a = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [u, d] = ya(n), m = { start: "0%", center: "50%", end: "100%" }[d], h = (r.arrow?.x ?? 0) + a / 2, f = (r.arrow?.y ?? 0) + l / 2;
    let p = "", b = "";
    return u === "bottom" ? (p = s ? m : `${h}px`, b = `${-l}px`) : u === "top" ? (p = s ? m : `${h}px`, b = `${o.floating.height + l}px`) : u === "right" ? (p = `${-l}px`, b = s ? m : `${f}px`) : u === "left" && (p = `${o.floating.width + l}px`, b = s ? m : `${f}px`), { data: { x: p, y: b } };
  }
});
function ya(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Xr = ga, Ca = wa, Ta = Na, Ea = xa, Tf = "Portal", Yr = w.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, i] = w.useState(!1);
  ct(() => i(!0), []);
  const s = n || r && globalThis?.document?.body;
  return s ? Wu.createPortal(/* @__PURE__ */ R(be.div, { ...o, ref: t }), s) : null;
});
Yr.displayName = Tf;
function Ef(e, t) {
  return w.useReducer((n, o) => t[n][o] ?? n, e);
}
var kt = (e) => {
  const { present: t, children: n } = e, o = Sf(t), r = typeof n == "function" ? n({ present: o.isPresent }) : w.Children.only(n), i = ve(o.ref, Rf(r));
  return typeof n == "function" || o.isPresent ? w.cloneElement(r, { ref: i }) : null;
};
kt.displayName = "Presence";
function Sf(e) {
  const [t, n] = w.useState(), o = w.useRef(null), r = w.useRef(e), i = w.useRef("none"), s = e ? "mounted" : "unmounted", [a, l] = Ef(s, {
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
  return w.useEffect(() => {
    const u = Dn(o.current);
    i.current = a === "mounted" ? u : "none";
  }, [a]), ct(() => {
    const u = o.current, d = r.current;
    if (d !== e) {
      const h = i.current, f = Dn(u);
      e ? l("MOUNT") : f === "none" || u?.display === "none" ? l("UNMOUNT") : l(d && h !== f ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), ct(() => {
    if (t) {
      let u;
      const d = t.ownerDocument.defaultView ?? window, m = (f) => {
        const b = Dn(o.current).includes(CSS.escape(f.animationName));
        if (f.target === t && b && (l("ANIMATION_END"), !r.current)) {
          const v = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = v);
          });
        }
      }, h = (f) => {
        f.target === t && (i.current = Dn(o.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", m), t.addEventListener("animationend", m), () => {
        d.clearTimeout(u), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", m), t.removeEventListener("animationend", m);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: w.useCallback((u) => {
      o.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Dn(e) {
  return e?.animationName || "none";
}
function Rf(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Zo = "rovingFocusGroup.onEntryFocus", Af = { bubbles: !1, cancelable: !0 }, wn = "RovingFocusGroup", [gr, Sa, Mf] = Zs(wn), [Pf, Ra] = Ut(
  wn,
  [Mf]
), [Lf, If] = Pf(wn), Aa = w.forwardRef(
  (e, t) => /* @__PURE__ */ R(gr.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ R(gr.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ R(Df, { ...e, ref: t }) }) })
);
Aa.displayName = wn;
var Df = w.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: i,
    currentTabStopId: s,
    defaultCurrentTabStopId: a,
    onCurrentTabStopIdChange: l,
    onEntryFocus: u,
    preventScrollOnEntryFocus: d = !1,
    ...m
  } = e, h = w.useRef(null), f = ve(t, h), p = Qs(i), [b, v] = Ro({
    prop: s,
    defaultProp: a ?? null,
    onChange: l,
    caller: wn
  }), [g, N] = w.useState(!1), x = _e(u), y = Sa(n), k = w.useRef(!1), [S, T] = w.useState(0);
  return w.useEffect(() => {
    const C = h.current;
    if (C)
      return C.addEventListener(Zo, x), () => C.removeEventListener(Zo, x);
  }, [x]), /* @__PURE__ */ R(
    Lf,
    {
      scope: n,
      orientation: o,
      dir: p,
      loop: r,
      currentTabStopId: b,
      onItemFocus: w.useCallback(
        (C) => v(C),
        [v]
      ),
      onItemShiftTab: w.useCallback(() => N(!0), []),
      onFocusableItemAdd: w.useCallback(
        () => T((C) => C + 1),
        []
      ),
      onFocusableItemRemove: w.useCallback(
        () => T((C) => C - 1),
        []
      ),
      children: /* @__PURE__ */ R(
        be.div,
        {
          tabIndex: g || S === 0 ? -1 : 0,
          "data-orientation": o,
          ...m,
          ref: f,
          style: { outline: "none", ...e.style },
          onMouseDown: te(e.onMouseDown, () => {
            k.current = !0;
          }),
          onFocus: te(e.onFocus, (C) => {
            const L = !k.current;
            if (C.target === C.currentTarget && L && !g) {
              const O = new CustomEvent(Zo, Af);
              if (C.currentTarget.dispatchEvent(O), !O.defaultPrevented) {
                const V = y().filter((F) => F.focusable), W = V.find((F) => F.active), U = V.find((F) => F.id === b), J = [W, U, ...V].filter(
                  Boolean
                ).map((F) => F.ref.current);
                La(J, d);
              }
            }
            k.current = !1;
          }),
          onBlur: te(e.onBlur, () => N(!1))
        }
      )
    }
  );
}), Ma = "RovingFocusGroupItem", Pa = w.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: i,
      children: s,
      ...a
    } = e, l = _t(), u = i || l, d = If(Ma, n), m = d.currentTabStopId === u, h = Sa(n), { onFocusableItemAdd: f, onFocusableItemRemove: p, currentTabStopId: b } = d;
    return w.useEffect(() => {
      if (o)
        return f(), () => p();
    }, [o, f, p]), /* @__PURE__ */ R(
      gr.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ R(
          be.span,
          {
            tabIndex: m ? 0 : -1,
            "data-orientation": d.orientation,
            ...a,
            ref: t,
            onMouseDown: te(e.onMouseDown, (v) => {
              o ? d.onItemFocus(u) : v.preventDefault();
            }),
            onFocus: te(e.onFocus, () => d.onItemFocus(u)),
            onKeyDown: te(e.onKeyDown, (v) => {
              if (v.key === "Tab" && v.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (v.target !== v.currentTarget) return;
              const g = Bf(v, d.orientation, d.dir);
              if (g !== void 0) {
                if (v.metaKey || v.ctrlKey || v.altKey || v.shiftKey) return;
                v.preventDefault();
                let x = h().filter((y) => y.focusable).map((y) => y.ref.current);
                if (g === "last") x.reverse();
                else if (g === "prev" || g === "next") {
                  g === "prev" && x.reverse();
                  const y = x.indexOf(v.currentTarget);
                  x = d.loop ? zf(x, y + 1) : x.slice(y + 1);
                }
                setTimeout(() => La(x));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: m, hasTabStop: b != null }) : s
          }
        )
      }
    );
  }
);
Pa.displayName = Ma;
var Of = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function $f(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Bf(e, t, n) {
  const o = $f(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return Of[o];
}
function La(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function zf(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var _f = Aa, Hf = Pa, Ff = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Et = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap(), $n = {}, Qo = 0, Ia = function(e) {
  return e && (e.host || Ia(e.parentNode));
}, Wf = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Ia(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Uf = function(e, t, n, o) {
  var r = Wf(t, Array.isArray(e) ? e : [e]);
  $n[n] || ($n[n] = /* @__PURE__ */ new WeakMap());
  var i = $n[n], s = [], a = /* @__PURE__ */ new Set(), l = new Set(r), u = function(m) {
    !m || a.has(m) || (a.add(m), u(m.parentNode));
  };
  r.forEach(u);
  var d = function(m) {
    !m || l.has(m) || Array.prototype.forEach.call(m.children, function(h) {
      if (a.has(h))
        d(h);
      else
        try {
          var f = h.getAttribute(o), p = f !== null && f !== "false", b = (Et.get(h) || 0) + 1, v = (i.get(h) || 0) + 1;
          Et.set(h, b), i.set(h, v), s.push(h), b === 1 && p && On.set(h, !0), v === 1 && h.setAttribute(n, "true"), p || h.setAttribute(o, "true");
        } catch (g) {
          console.error("aria-hidden: cannot operate on ", h, g);
        }
    });
  };
  return d(t), a.clear(), Qo++, function() {
    s.forEach(function(m) {
      var h = Et.get(m) - 1, f = i.get(m) - 1;
      Et.set(m, h), i.set(m, f), h || (On.has(m) || m.removeAttribute(o), On.delete(m)), f || m.removeAttribute(n);
    }), Qo--, Qo || (Et = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap(), $n = {});
  };
}, Vf = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Ff(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Uf(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, $e = function() {
  return $e = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, $e.apply(this, arguments);
};
function Da(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function jf(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, i; o < r; o++)
    (i || !(o in t)) && (i || (i = Array.prototype.slice.call(t, 0, o)), i[o] = t[o]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var Kn = "right-scroll-bar-position", Gn = "width-before-scroll-bar", Kf = "with-scroll-bars-hidden", Gf = "--removed-body-scroll-bar-size";
function Jo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function qf(e, t) {
  var n = B(function() {
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
var Xf = typeof window < "u" ? w.useLayoutEffect : w.useEffect, is = /* @__PURE__ */ new WeakMap();
function Yf(e, t) {
  var n = qf(null, function(o) {
    return e.forEach(function(r) {
      return Jo(r, o);
    });
  });
  return Xf(function() {
    var o = is.get(n);
    if (o) {
      var r = new Set(o), i = new Set(e), s = n.current;
      r.forEach(function(a) {
        i.has(a) || Jo(a, null);
      }), i.forEach(function(a) {
        r.has(a) || Jo(a, s);
      });
    }
    is.set(n, e);
  }, [e]), n;
}
function Zf(e) {
  return e;
}
function Qf(e, t) {
  t === void 0 && (t = Zf);
  var n = [], o = !1, r = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(i) {
      var s = t(i, o);
      return n.push(s), function() {
        n = n.filter(function(a) {
          return a !== s;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (o = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(i);
      }
      n = {
        push: function(a) {
          return i(a);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(i) {
      o = !0;
      var s = [];
      if (n.length) {
        var a = n;
        n = [], a.forEach(i), s = n;
      }
      var l = function() {
        var d = s;
        s = [], d.forEach(i);
      }, u = function() {
        return Promise.resolve().then(l);
      };
      u(), n = {
        push: function(d) {
          s.push(d), u();
        },
        filter: function(d) {
          return s = s.filter(d), n;
        }
      };
    }
  };
  return r;
}
function Jf(e) {
  e === void 0 && (e = {});
  var t = Qf(null);
  return t.options = $e({ async: !0, ssr: !1 }, e), t;
}
var Oa = function(e) {
  var t = e.sideCar, n = Da(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return w.createElement(o, $e({}, n));
};
Oa.isSideCarExport = !0;
function eh(e, t) {
  return e.useMedium(t), Oa;
}
var $a = Jf(), er = function() {
}, Do = w.forwardRef(function(e, t) {
  var n = w.useRef(null), o = w.useState({
    onScrollCapture: er,
    onWheelCapture: er,
    onTouchMoveCapture: er
  }), r = o[0], i = o[1], s = e.forwardProps, a = e.children, l = e.className, u = e.removeScrollBar, d = e.enabled, m = e.shards, h = e.sideCar, f = e.noRelative, p = e.noIsolation, b = e.inert, v = e.allowPinchZoom, g = e.as, N = g === void 0 ? "div" : g, x = e.gapMode, y = Da(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), k = h, S = Yf([n, t]), T = $e($e({}, y), r);
  return w.createElement(
    w.Fragment,
    null,
    d && w.createElement(k, { sideCar: $a, removeScrollBar: u, shards: m, noRelative: f, noIsolation: p, inert: b, setCallbacks: i, allowPinchZoom: !!v, lockRef: n, gapMode: x }),
    s ? w.cloneElement(w.Children.only(a), $e($e({}, T), { ref: S })) : w.createElement(N, $e({}, T, { className: l, ref: S }), a)
  );
});
Do.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Do.classNames = {
  fullWidth: Gn,
  zeroRight: Kn
};
var th = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function nh() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = th();
  return t && e.setAttribute("nonce", t), e;
}
function oh(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function rh(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var ih = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = nh()) && (oh(t, n), rh(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, sh = function() {
  var e = ih();
  return function(t, n) {
    w.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Ba = function() {
  var e = sh(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, ah = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, tr = function(e) {
  return parseInt(e || "", 10) || 0;
}, lh = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [tr(n), tr(o), tr(r)];
}, ch = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return ah;
  var t = lh(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, uh = Ba(), Bt = "data-scroll-locked", dh = function(e, t, n, o) {
  var r = e.left, i = e.top, s = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Kf, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(a, "px ").concat(o, `;
  }
  body[`).concat(Bt, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(o, ";"),
    n === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(o, `;
    `),
    n === "padding" && "padding-right: ".concat(a, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Kn, ` {
    right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(Gn, ` {
    margin-right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(Kn, " .").concat(Kn, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(Gn, " .").concat(Gn, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(Bt, `] {
    `).concat(Gf, ": ").concat(a, `px;
  }
`);
}, ss = function() {
  var e = parseInt(document.body.getAttribute(Bt) || "0", 10);
  return isFinite(e) ? e : 0;
}, mh = function() {
  w.useEffect(function() {
    return document.body.setAttribute(Bt, (ss() + 1).toString()), function() {
      var e = ss() - 1;
      e <= 0 ? document.body.removeAttribute(Bt) : document.body.setAttribute(Bt, e.toString());
    };
  }, []);
}, fh = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  mh();
  var i = w.useMemo(function() {
    return ch(r);
  }, [r]);
  return w.createElement(uh, { styles: dh(i, !t, r, n ? "" : "!important") });
}, vr = !1;
if (typeof window < "u")
  try {
    var Bn = Object.defineProperty({}, "passive", {
      get: function() {
        return vr = !0, !0;
      }
    });
    window.addEventListener("test", Bn, Bn), window.removeEventListener("test", Bn, Bn);
  } catch {
    vr = !1;
  }
var St = vr ? { passive: !1 } : !1, hh = function(e) {
  return e.tagName === "TEXTAREA";
}, za = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !hh(e) && n[t] === "visible")
  );
}, ph = function(e) {
  return za(e, "overflowY");
}, bh = function(e) {
  return za(e, "overflowX");
}, as = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = _a(e, o);
    if (r) {
      var i = Ha(e, o), s = i[1], a = i[2];
      if (s > a)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, gh = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, vh = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, _a = function(e, t) {
  return e === "v" ? ph(t) : bh(t);
}, Ha = function(e, t) {
  return e === "v" ? gh(t) : vh(t);
}, wh = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Nh = function(e, t, n, o, r) {
  var i = wh(e, window.getComputedStyle(t).direction), s = i * o, a = n.target, l = t.contains(a), u = !1, d = s > 0, m = 0, h = 0;
  do {
    if (!a)
      break;
    var f = Ha(e, a), p = f[0], b = f[1], v = f[2], g = b - v - i * p;
    (p || g) && _a(e, a) && (m += g, h += p);
    var N = a.parentNode;
    a = N && N.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? N.host : N;
  } while (
    // portaled content
    !l && a !== document.body || // self content
    l && (t.contains(a) || t === a)
  );
  return (d && Math.abs(m) < 1 || !d && Math.abs(h) < 1) && (u = !0), u;
}, zn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ls = function(e) {
  return [e.deltaX, e.deltaY];
}, cs = function(e) {
  return e && "current" in e ? e.current : e;
}, kh = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, xh = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, yh = 0, Rt = [];
function Ch(e) {
  var t = w.useRef([]), n = w.useRef([0, 0]), o = w.useRef(), r = w.useState(yh++)[0], i = w.useState(Ba)[0], s = w.useRef(e);
  w.useEffect(function() {
    s.current = e;
  }, [e]), w.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var b = jf([e.lockRef.current], (e.shards || []).map(cs), !0).filter(Boolean);
      return b.forEach(function(v) {
        return v.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), b.forEach(function(v) {
          return v.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = w.useCallback(function(b, v) {
    if ("touches" in b && b.touches.length === 2 || b.type === "wheel" && b.ctrlKey)
      return !s.current.allowPinchZoom;
    var g = zn(b), N = n.current, x = "deltaX" in b ? b.deltaX : N[0] - g[0], y = "deltaY" in b ? b.deltaY : N[1] - g[1], k, S = b.target, T = Math.abs(x) > Math.abs(y) ? "h" : "v";
    if ("touches" in b && T === "h" && S.type === "range")
      return !1;
    var C = as(T, S);
    if (!C)
      return !0;
    if (C ? k = T : (k = T === "v" ? "h" : "v", C = as(T, S)), !C)
      return !1;
    if (!o.current && "changedTouches" in b && (x || y) && (o.current = k), !k)
      return !0;
    var L = o.current || k;
    return Nh(L, v, b, L === "h" ? x : y);
  }, []), l = w.useCallback(function(b) {
    var v = b;
    if (!(!Rt.length || Rt[Rt.length - 1] !== i)) {
      var g = "deltaY" in v ? ls(v) : zn(v), N = t.current.filter(function(k) {
        return k.name === v.type && (k.target === v.target || v.target === k.shadowParent) && kh(k.delta, g);
      })[0];
      if (N && N.should) {
        v.cancelable && v.preventDefault();
        return;
      }
      if (!N) {
        var x = (s.current.shards || []).map(cs).filter(Boolean).filter(function(k) {
          return k.contains(v.target);
        }), y = x.length > 0 ? a(v, x[0]) : !s.current.noIsolation;
        y && v.cancelable && v.preventDefault();
      }
    }
  }, []), u = w.useCallback(function(b, v, g, N) {
    var x = { name: b, delta: v, target: g, should: N, shadowParent: Th(g) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(y) {
        return y !== x;
      });
    }, 1);
  }, []), d = w.useCallback(function(b) {
    n.current = zn(b), o.current = void 0;
  }, []), m = w.useCallback(function(b) {
    u(b.type, ls(b), b.target, a(b, e.lockRef.current));
  }, []), h = w.useCallback(function(b) {
    u(b.type, zn(b), b.target, a(b, e.lockRef.current));
  }, []);
  w.useEffect(function() {
    return Rt.push(i), e.setCallbacks({
      onScrollCapture: m,
      onWheelCapture: m,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", l, St), document.addEventListener("touchmove", l, St), document.addEventListener("touchstart", d, St), function() {
      Rt = Rt.filter(function(b) {
        return b !== i;
      }), document.removeEventListener("wheel", l, St), document.removeEventListener("touchmove", l, St), document.removeEventListener("touchstart", d, St);
    };
  }, []);
  var f = e.removeScrollBar, p = e.inert;
  return w.createElement(
    w.Fragment,
    null,
    p ? w.createElement(i, { styles: xh(r) }) : null,
    f ? w.createElement(fh, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Th(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Eh = eh($a, Ch);
var Fa = w.forwardRef(function(e, t) {
  return w.createElement(Do, $e({}, e, { ref: t, sideCar: Eh }));
});
Fa.classNames = Do.classNames;
var wr = ["Enter", " "], Sh = ["ArrowDown", "PageUp", "Home"], Wa = ["ArrowUp", "PageDown", "End"], Rh = [...Sh, ...Wa], Ah = {
  ltr: [...wr, "ArrowRight"],
  rtl: [...wr, "ArrowLeft"]
}, Mh = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Nn = "Menu", [mn, Ph, Lh] = Zs(Nn), [xt, Ua] = Ut(Nn, [
  Lh,
  Io,
  Ra
]), kn = Io(), Va = Ra(), [ja, mt] = xt(Nn), [Ih, xn] = xt(Nn), Ka = (e) => {
  const { __scopeMenu: t, open: n = !1, children: o, dir: r, onOpenChange: i, modal: s = !0 } = e, a = kn(t), [l, u] = w.useState(null), d = w.useRef(!1), m = _e(i), h = Qs(r);
  return w.useEffect(() => {
    const f = () => {
      d.current = !0, document.addEventListener("pointerdown", p, { capture: !0, once: !0 }), document.addEventListener("pointermove", p, { capture: !0, once: !0 });
    }, p = () => d.current = !1;
    return document.addEventListener("keydown", f, { capture: !0 }), () => {
      document.removeEventListener("keydown", f, { capture: !0 }), document.removeEventListener("pointerdown", p, { capture: !0 }), document.removeEventListener("pointermove", p, { capture: !0 });
    };
  }, []), /* @__PURE__ */ R(Xr, { ...a, children: /* @__PURE__ */ R(
    ja,
    {
      scope: t,
      open: n,
      onOpenChange: m,
      content: l,
      onContentChange: u,
      children: /* @__PURE__ */ R(
        Ih,
        {
          scope: t,
          onClose: w.useCallback(() => m(!1), [m]),
          isUsingKeyboardRef: d,
          dir: h,
          modal: s,
          children: o
        }
      )
    }
  ) });
};
Ka.displayName = Nn;
var Dh = "MenuAnchor", Zr = w.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = kn(n);
    return /* @__PURE__ */ R(Ca, { ...r, ...o, ref: t });
  }
);
Zr.displayName = Dh;
var Qr = "MenuPortal", [Oh, Ga] = xt(Qr, {
  forceMount: void 0
}), qa = (e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, i = mt(Qr, t);
  return /* @__PURE__ */ R(Oh, { scope: t, forceMount: n, children: /* @__PURE__ */ R(kt, { present: n || i.open, children: /* @__PURE__ */ R(Yr, { asChild: !0, container: r, children: o }) }) });
};
qa.displayName = Qr;
var Ee = "MenuContent", [$h, Jr] = xt(Ee), Xa = w.forwardRef(
  (e, t) => {
    const n = Ga(Ee, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, i = mt(Ee, e.__scopeMenu), s = xn(Ee, e.__scopeMenu);
    return /* @__PURE__ */ R(mn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(kt, { present: o || i.open, children: /* @__PURE__ */ R(mn.Slot, { scope: e.__scopeMenu, children: s.modal ? /* @__PURE__ */ R(Bh, { ...r, ref: t }) : /* @__PURE__ */ R(zh, { ...r, ref: t }) }) }) });
  }
), Bh = w.forwardRef(
  (e, t) => {
    const n = mt(Ee, e.__scopeMenu), o = w.useRef(null), r = ve(t, o);
    return w.useEffect(() => {
      const i = o.current;
      if (i) return Vf(i);
    }, []), /* @__PURE__ */ R(
      ei,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: te(
          e.onFocusOutside,
          (i) => i.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), zh = w.forwardRef((e, t) => {
  const n = mt(Ee, e.__scopeMenu);
  return /* @__PURE__ */ R(
    ei,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), _h = /* @__PURE__ */ cn("MenuContent.ScrollLock"), ei = w.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: o = !1,
      trapFocus: r,
      onOpenAutoFocus: i,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: a,
      onEntryFocus: l,
      onEscapeKeyDown: u,
      onPointerDownOutside: d,
      onFocusOutside: m,
      onInteractOutside: h,
      onDismiss: f,
      disableOutsideScroll: p,
      ...b
    } = e, v = mt(Ee, n), g = xn(Ee, n), N = kn(n), x = Va(n), y = Ph(n), [k, S] = w.useState(null), T = w.useRef(null), C = ve(t, T, v.onContentChange), L = w.useRef(0), O = w.useRef(""), V = w.useRef(0), W = w.useRef(null), U = w.useRef("right"), K = w.useRef(0), J = p ? Fa : w.Fragment, F = p ? { as: _h, allowPinchZoom: !0 } : void 0, G = ($) => {
      const E = O.current + $, D = y().filter((X) => !X.disabled), j = document.activeElement, q = D.find((X) => X.ref.current === j)?.textValue, se = D.map((X) => X.textValue), ue = Zh(se, E, q), de = D.find((X) => X.textValue === ue)?.ref.current;
      (function X(xe) {
        O.current = xe, window.clearTimeout(L.current), xe !== "" && (L.current = window.setTimeout(() => X(""), 1e3));
      })(E), de && setTimeout(() => de.focus());
    };
    w.useEffect(() => () => window.clearTimeout(L.current), []), Xd();
    const A = w.useCallback(($) => U.current === W.current?.side && Jh($, W.current?.area), []);
    return /* @__PURE__ */ R(
      $h,
      {
        scope: n,
        searchRef: O,
        onItemEnter: w.useCallback(
          ($) => {
            A($) && $.preventDefault();
          },
          [A]
        ),
        onItemLeave: w.useCallback(
          ($) => {
            A($) || (T.current?.focus(), S(null));
          },
          [A]
        ),
        onTriggerLeave: w.useCallback(
          ($) => {
            A($) && $.preventDefault();
          },
          [A]
        ),
        pointerGraceTimerRef: V,
        onPointerGraceIntentChange: w.useCallback(($) => {
          W.current = $;
        }, []),
        children: /* @__PURE__ */ R(J, { ...F, children: /* @__PURE__ */ R(
          ta,
          {
            asChild: !0,
            trapped: r,
            onMountAutoFocus: te(i, ($) => {
              $.preventDefault(), T.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: s,
            children: /* @__PURE__ */ R(
              Hr,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: u,
                onPointerDownOutside: d,
                onFocusOutside: m,
                onInteractOutside: h,
                onDismiss: f,
                children: /* @__PURE__ */ R(
                  _f,
                  {
                    asChild: !0,
                    ...x,
                    dir: g.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: k,
                    onCurrentTabStopIdChange: S,
                    onEntryFocus: te(l, ($) => {
                      g.isUsingKeyboardRef.current || $.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ R(
                      Ta,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": ml(v.open),
                        "data-radix-menu-content": "",
                        dir: g.dir,
                        ...N,
                        ...b,
                        ref: C,
                        style: { outline: "none", ...b.style },
                        onKeyDown: te(b.onKeyDown, ($) => {
                          const D = $.target.closest("[data-radix-menu-content]") === $.currentTarget, j = $.ctrlKey || $.altKey || $.metaKey, q = $.key.length === 1;
                          D && ($.key === "Tab" && $.preventDefault(), !j && q && G($.key));
                          const se = T.current;
                          if ($.target !== se || !Rh.includes($.key)) return;
                          $.preventDefault();
                          const de = y().filter((X) => !X.disabled).map((X) => X.ref.current);
                          Wa.includes($.key) && de.reverse(), Xh(de);
                        }),
                        onBlur: te(e.onBlur, ($) => {
                          $.currentTarget.contains($.target) || (window.clearTimeout(L.current), O.current = "");
                        }),
                        onPointerMove: te(
                          e.onPointerMove,
                          fn(($) => {
                            const E = $.target, D = K.current !== $.clientX;
                            if ($.currentTarget.contains(E) && D) {
                              const j = $.clientX > K.current ? "right" : "left";
                              U.current = j, K.current = $.clientX;
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
Xa.displayName = Ee;
var Hh = "MenuGroup", ti = w.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ R(be.div, { role: "group", ...o, ref: t });
  }
);
ti.displayName = Hh;
var Fh = "MenuLabel", Ya = w.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ R(be.div, { ...o, ref: t });
  }
);
Ya.displayName = Fh;
var ho = "MenuItem", us = "menu.itemSelect", Oo = w.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e, i = w.useRef(null), s = xn(ho, e.__scopeMenu), a = Jr(ho, e.__scopeMenu), l = ve(t, i), u = w.useRef(!1), d = () => {
      const m = i.current;
      if (!n && m) {
        const h = new CustomEvent(us, { bubbles: !0, cancelable: !0 });
        m.addEventListener(us, (f) => o?.(f), { once: !0 }), Ys(m, h), h.defaultPrevented ? u.current = !1 : s.onClose();
      }
    };
    return /* @__PURE__ */ R(
      Za,
      {
        ...r,
        ref: l,
        disabled: n,
        onClick: te(e.onClick, d),
        onPointerDown: (m) => {
          e.onPointerDown?.(m), u.current = !0;
        },
        onPointerUp: te(e.onPointerUp, (m) => {
          u.current || m.currentTarget?.click();
        }),
        onKeyDown: te(e.onKeyDown, (m) => {
          const h = a.searchRef.current !== "";
          n || h && m.key === " " || wr.includes(m.key) && (m.currentTarget.click(), m.preventDefault());
        })
      }
    );
  }
);
Oo.displayName = ho;
var Za = w.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...i } = e, s = Jr(ho, n), a = Va(n), l = w.useRef(null), u = ve(t, l), [d, m] = w.useState(!1), [h, f] = w.useState("");
    return w.useEffect(() => {
      const p = l.current;
      p && f((p.textContent ?? "").trim());
    }, [i.children]), /* @__PURE__ */ R(
      mn.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: r ?? h,
        children: /* @__PURE__ */ R(Hf, { asChild: !0, ...a, focusable: !o, children: /* @__PURE__ */ R(
          be.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...i,
            ref: u,
            onPointerMove: te(
              e.onPointerMove,
              fn((p) => {
                o ? s.onItemLeave(p) : (s.onItemEnter(p), p.defaultPrevented || p.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: te(
              e.onPointerLeave,
              fn((p) => s.onItemLeave(p))
            ),
            onFocus: te(e.onFocus, () => m(!0)),
            onBlur: te(e.onBlur, () => m(!1))
          }
        ) })
      }
    );
  }
), Wh = "MenuCheckboxItem", Qa = w.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return /* @__PURE__ */ R(ol, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ R(
      Oo,
      {
        role: "menuitemcheckbox",
        "aria-checked": po(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": ri(n),
        onSelect: te(
          r.onSelect,
          () => o?.(po(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Qa.displayName = Wh;
var Ja = "MenuRadioGroup", [Uh, Vh] = xt(
  Ja,
  { value: void 0, onValueChange: () => {
  } }
), el = w.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: o, ...r } = e, i = _e(o);
    return /* @__PURE__ */ R(Uh, { scope: e.__scopeMenu, value: n, onValueChange: i, children: /* @__PURE__ */ R(ti, { ...r, ref: t }) });
  }
);
el.displayName = Ja;
var tl = "MenuRadioItem", nl = w.forwardRef(
  (e, t) => {
    const { value: n, ...o } = e, r = Vh(tl, e.__scopeMenu), i = n === r.value;
    return /* @__PURE__ */ R(ol, { scope: e.__scopeMenu, checked: i, children: /* @__PURE__ */ R(
      Oo,
      {
        role: "menuitemradio",
        "aria-checked": i,
        ...o,
        ref: t,
        "data-state": ri(i),
        onSelect: te(
          o.onSelect,
          () => r.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
nl.displayName = tl;
var ni = "MenuItemIndicator", [ol, jh] = xt(
  ni,
  { checked: !1 }
), rl = w.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e, i = jh(ni, n);
    return /* @__PURE__ */ R(
      kt,
      {
        present: o || po(i.checked) || i.checked === !0,
        children: /* @__PURE__ */ R(
          be.span,
          {
            ...r,
            ref: t,
            "data-state": ri(i.checked)
          }
        )
      }
    );
  }
);
rl.displayName = ni;
var Kh = "MenuSeparator", il = w.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ R(
      be.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: t
      }
    );
  }
);
il.displayName = Kh;
var Gh = "MenuArrow", sl = w.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = kn(n);
    return /* @__PURE__ */ R(Ea, { ...r, ...o, ref: t });
  }
);
sl.displayName = Gh;
var oi = "MenuSub", [qh, al] = xt(oi), ll = (e) => {
  const { __scopeMenu: t, children: n, open: o = !1, onOpenChange: r } = e, i = mt(oi, t), s = kn(t), [a, l] = w.useState(null), [u, d] = w.useState(null), m = _e(r);
  return w.useEffect(() => (i.open === !1 && m(!1), () => m(!1)), [i.open, m]), /* @__PURE__ */ R(Xr, { ...s, children: /* @__PURE__ */ R(
    ja,
    {
      scope: t,
      open: o,
      onOpenChange: m,
      content: u,
      onContentChange: d,
      children: /* @__PURE__ */ R(
        qh,
        {
          scope: t,
          contentId: _t(),
          triggerId: _t(),
          trigger: a,
          onTriggerChange: l,
          children: n
        }
      )
    }
  ) });
};
ll.displayName = oi;
var tn = "MenuSubTrigger", cl = w.forwardRef(
  (e, t) => {
    const n = mt(tn, e.__scopeMenu), o = xn(tn, e.__scopeMenu), r = al(tn, e.__scopeMenu), i = Jr(tn, e.__scopeMenu), s = w.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: l } = i, u = { __scopeMenu: e.__scopeMenu }, d = w.useCallback(() => {
      s.current && window.clearTimeout(s.current), s.current = null;
    }, []);
    return w.useEffect(() => d, [d]), w.useEffect(() => {
      const m = a.current;
      return () => {
        window.clearTimeout(m), l(null);
      };
    }, [a, l]), /* @__PURE__ */ R(Zr, { asChild: !0, ...u, children: /* @__PURE__ */ R(
      Za,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": r.contentId,
        "data-state": ml(n.open),
        ...e,
        ref: So(t, r.onTriggerChange),
        onClick: (m) => {
          e.onClick?.(m), !(e.disabled || m.defaultPrevented) && (m.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: te(
          e.onPointerMove,
          fn((m) => {
            i.onItemEnter(m), !m.defaultPrevented && !e.disabled && !n.open && !s.current && (i.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: te(
          e.onPointerLeave,
          fn((m) => {
            d();
            const h = n.content?.getBoundingClientRect();
            if (h) {
              const f = n.content?.dataset.side, p = f === "right", b = p ? -5 : 5, v = h[p ? "left" : "right"], g = h[p ? "right" : "left"];
              i.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: m.clientX + b, y: m.clientY },
                  { x: v, y: h.top },
                  { x: g, y: h.top },
                  { x: g, y: h.bottom },
                  { x: v, y: h.bottom }
                ],
                side: f
              }), window.clearTimeout(a.current), a.current = window.setTimeout(
                () => i.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (i.onTriggerLeave(m), m.defaultPrevented) return;
              i.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: te(e.onKeyDown, (m) => {
          const h = i.searchRef.current !== "";
          e.disabled || h && m.key === " " || Ah[o.dir].includes(m.key) && (n.onOpenChange(!0), n.content?.focus(), m.preventDefault());
        })
      }
    ) });
  }
);
cl.displayName = tn;
var ul = "MenuSubContent", dl = w.forwardRef(
  (e, t) => {
    const n = Ga(Ee, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, i = mt(Ee, e.__scopeMenu), s = xn(Ee, e.__scopeMenu), a = al(ul, e.__scopeMenu), l = w.useRef(null), u = ve(t, l);
    return /* @__PURE__ */ R(mn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(kt, { present: o || i.open, children: /* @__PURE__ */ R(mn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(
      ei,
      {
        id: a.contentId,
        "aria-labelledby": a.triggerId,
        ...r,
        ref: u,
        align: "start",
        side: s.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (d) => {
          s.isUsingKeyboardRef.current && l.current?.focus(), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: te(e.onFocusOutside, (d) => {
          d.target !== a.trigger && i.onOpenChange(!1);
        }),
        onEscapeKeyDown: te(e.onEscapeKeyDown, (d) => {
          s.onClose(), d.preventDefault();
        }),
        onKeyDown: te(e.onKeyDown, (d) => {
          const m = d.currentTarget.contains(d.target), h = Mh[s.dir].includes(d.key);
          m && h && (i.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
dl.displayName = ul;
function ml(e) {
  return e ? "open" : "closed";
}
function po(e) {
  return e === "indeterminate";
}
function ri(e) {
  return po(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Xh(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Yh(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function Zh(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let s = Yh(e, Math.max(i, 0));
  r.length === 1 && (s = s.filter((u) => u !== n));
  const l = s.find(
    (u) => u.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Qh(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const a = t[i], l = t[s], u = a.x, d = a.y, m = l.x, h = l.y;
    d > o != h > o && n < (m - u) * (o - d) / (h - d) + u && (r = !r);
  }
  return r;
}
function Jh(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Qh(n, t);
}
function fn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var ep = Ka, tp = Zr, np = qa, op = Xa, rp = ti, ip = Ya, sp = Oo, ap = Qa, lp = el, cp = nl, up = rl, dp = il, mp = sl, fp = ll, hp = cl, pp = dl, $o = "DropdownMenu", [bp] = Ut(
  $o,
  [Ua]
), we = Ua(), [gp, fl] = bp($o), hl = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: o,
    open: r,
    defaultOpen: i,
    onOpenChange: s,
    modal: a = !0
  } = e, l = we(t), u = w.useRef(null), [d, m] = Ro({
    prop: r,
    defaultProp: i ?? !1,
    onChange: s,
    caller: $o
  });
  return /* @__PURE__ */ R(
    gp,
    {
      scope: t,
      triggerId: _t(),
      triggerRef: u,
      contentId: _t(),
      open: d,
      onOpenChange: m,
      onOpenToggle: w.useCallback(() => m((h) => !h), [m]),
      modal: a,
      children: /* @__PURE__ */ R(ep, { ...l, open: d, onOpenChange: m, dir: o, modal: a, children: n })
    }
  );
};
hl.displayName = $o;
var pl = "DropdownMenuTrigger", bl = w.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e, i = fl(pl, n), s = we(n);
    return /* @__PURE__ */ R(tp, { asChild: !0, ...s, children: /* @__PURE__ */ R(
      be.button,
      {
        type: "button",
        id: i.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? i.contentId : void 0,
        "data-state": i.open ? "open" : "closed",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        ...r,
        ref: So(t, i.triggerRef),
        onPointerDown: te(e.onPointerDown, (a) => {
          !o && a.button === 0 && a.ctrlKey === !1 && (i.onOpenToggle(), i.open || a.preventDefault());
        }),
        onKeyDown: te(e.onKeyDown, (a) => {
          o || (["Enter", " "].includes(a.key) && i.onOpenToggle(), a.key === "ArrowDown" && i.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
bl.displayName = pl;
var vp = "DropdownMenuPortal", gl = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = we(t);
  return /* @__PURE__ */ R(np, { ...o, ...n });
};
gl.displayName = vp;
var vl = "DropdownMenuContent", wl = w.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = fl(vl, n), i = we(n), s = w.useRef(!1);
    return /* @__PURE__ */ R(
      op,
      {
        id: r.contentId,
        "aria-labelledby": r.triggerId,
        ...i,
        ...o,
        ref: t,
        onCloseAutoFocus: te(e.onCloseAutoFocus, (a) => {
          s.current || r.triggerRef.current?.focus(), s.current = !1, a.preventDefault();
        }),
        onInteractOutside: te(e.onInteractOutside, (a) => {
          const l = a.detail.originalEvent, u = l.button === 0 && l.ctrlKey === !0, d = l.button === 2 || u;
          (!r.modal || d) && (s.current = !0);
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
wl.displayName = vl;
var wp = "DropdownMenuGroup", Np = w.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
    return /* @__PURE__ */ R(rp, { ...r, ...o, ref: t });
  }
);
Np.displayName = wp;
var kp = "DropdownMenuLabel", xp = w.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
    return /* @__PURE__ */ R(ip, { ...r, ...o, ref: t });
  }
);
xp.displayName = kp;
var yp = "DropdownMenuItem", Nl = w.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
    return /* @__PURE__ */ R(sp, { ...r, ...o, ref: t });
  }
);
Nl.displayName = yp;
var Cp = "DropdownMenuCheckboxItem", Tp = w.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
  return /* @__PURE__ */ R(ap, { ...r, ...o, ref: t });
});
Tp.displayName = Cp;
var Ep = "DropdownMenuRadioGroup", Sp = w.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
  return /* @__PURE__ */ R(lp, { ...r, ...o, ref: t });
});
Sp.displayName = Ep;
var Rp = "DropdownMenuRadioItem", Ap = w.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
  return /* @__PURE__ */ R(cp, { ...r, ...o, ref: t });
});
Ap.displayName = Rp;
var Mp = "DropdownMenuItemIndicator", Pp = w.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
  return /* @__PURE__ */ R(up, { ...r, ...o, ref: t });
});
Pp.displayName = Mp;
var Lp = "DropdownMenuSeparator", kl = w.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
  return /* @__PURE__ */ R(dp, { ...r, ...o, ref: t });
});
kl.displayName = Lp;
var Ip = "DropdownMenuArrow", Dp = w.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
    return /* @__PURE__ */ R(mp, { ...r, ...o, ref: t });
  }
);
Dp.displayName = Ip;
var Op = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: o, onOpenChange: r, defaultOpen: i } = e, s = we(t), [a, l] = Ro({
    prop: o,
    defaultProp: i ?? !1,
    onChange: r,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ R(fp, { ...s, open: a, onOpenChange: l, children: n });
}, $p = "DropdownMenuSubTrigger", xl = w.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
  return /* @__PURE__ */ R(hp, { ...r, ...o, ref: t });
});
xl.displayName = $p;
var Bp = "DropdownMenuSubContent", yl = w.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = we(n);
  return /* @__PURE__ */ R(
    pp,
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
yl.displayName = Bp;
var zp = hl, _p = bl, Hp = gl, Fp = wl, Wp = Nl, Up = kl, Vp = Op, jp = xl, Kp = yl;
function Cl(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = Cl(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function Tl() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = Cl(e)) && (o && (o += " "), o += t);
  return o;
}
const ii = "-", Gp = (e) => {
  const t = Xp(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (s) => {
      const a = s.split(ii);
      return a[0] === "" && a.length !== 1 && a.shift(), El(a, t) || qp(s);
    },
    getConflictingClassGroupIds: (s, a) => {
      const l = n[s] || [];
      return a && o[s] ? [...l, ...o[s]] : l;
    }
  };
}, El = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? El(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const i = e.join(ii);
  return t.validators.find(({
    validator: s
  }) => s(i))?.classGroupId;
}, ds = /^\[(.+)\]$/, qp = (e) => {
  if (ds.test(e)) {
    const t = ds.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Xp = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in n)
    Nr(n[r], o, r, t);
  return o;
}, Nr = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const i = r === "" ? t : ms(t, r);
      i.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (Yp(r)) {
        Nr(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([i, s]) => {
      Nr(s, ms(t, i), n, o);
    });
  });
}, ms = (e, t) => {
  let n = e;
  return t.split(ii).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, Yp = (e) => e.isThemeGetter, Zp = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const r = (i, s) => {
    n.set(i, s), t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let s = n.get(i);
      if (s !== void 0)
        return s;
      if ((s = o.get(i)) !== void 0)
        return r(i, s), s;
    },
    set(i, s) {
      n.has(i) ? n.set(i, s) : r(i, s);
    }
  };
}, kr = "!", xr = ":", Qp = xr.length, Jp = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const i = [];
    let s = 0, a = 0, l = 0, u;
    for (let p = 0; p < r.length; p++) {
      let b = r[p];
      if (s === 0 && a === 0) {
        if (b === xr) {
          i.push(r.slice(l, p)), l = p + Qp;
          continue;
        }
        if (b === "/") {
          u = p;
          continue;
        }
      }
      b === "[" ? s++ : b === "]" ? s-- : b === "(" ? a++ : b === ")" && a--;
    }
    const d = i.length === 0 ? r : r.substring(l), m = eb(d), h = m !== d, f = u && u > l ? u - l : void 0;
    return {
      modifiers: i,
      hasImportantModifier: h,
      baseClassName: m,
      maybePostfixModifierPosition: f
    };
  };
  if (t) {
    const r = t + xr, i = o;
    o = (s) => s.startsWith(r) ? i(s.substring(r.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: s,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const r = o;
    o = (i) => n({
      className: i,
      parseClassName: r
    });
  }
  return o;
}, eb = (e) => e.endsWith(kr) ? e.substring(0, e.length - 1) : e.startsWith(kr) ? e.substring(1) : e, tb = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const r = [];
    let i = [];
    return o.forEach((s) => {
      s[0] === "[" || t[s] ? (r.push(...i.sort(), s), i = []) : i.push(s);
    }), r.push(...i.sort()), r;
  };
}, nb = (e) => ({
  cache: Zp(e.cacheSize),
  parseClassName: Jp(e),
  sortModifiers: tb(e),
  ...Gp(e)
}), ob = /\s+/, rb = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: i
  } = t, s = [], a = e.trim().split(ob);
  let l = "";
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const d = a[u], {
      isExternal: m,
      modifiers: h,
      hasImportantModifier: f,
      baseClassName: p,
      maybePostfixModifierPosition: b
    } = n(d);
    if (m) {
      l = d + (l.length > 0 ? " " + l : l);
      continue;
    }
    let v = !!b, g = o(v ? p.substring(0, b) : p);
    if (!g) {
      if (!v) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (g = o(p), !g) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      v = !1;
    }
    const N = i(h).join(":"), x = f ? N + kr : N, y = x + g;
    if (s.includes(y))
      continue;
    s.push(y);
    const k = r(g, v);
    for (let S = 0; S < k.length; ++S) {
      const T = k[S];
      s.push(x + T);
    }
    l = d + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function ib() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Sl(t)) && (o && (o += " "), o += n);
  return o;
}
const Sl = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = Sl(e[o])) && (n && (n += " "), n += t);
  return n;
};
function sb(e, ...t) {
  let n, o, r, i = s;
  function s(l) {
    const u = t.reduce((d, m) => m(d), e());
    return n = nb(u), o = n.cache.get, r = n.cache.set, i = a, a(l);
  }
  function a(l) {
    const u = o(l);
    if (u)
      return u;
    const d = rb(l, n);
    return r(l, d), d;
  }
  return function() {
    return i(ib.apply(null, arguments));
  };
}
const me = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Rl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Al = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ab = /^\d+\/\d+$/, lb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, cb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ub = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, db = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, mb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, At = (e) => ab.test(e), oe = (e) => !!e && !Number.isNaN(Number(e)), ot = (e) => !!e && Number.isInteger(Number(e)), nr = (e) => e.endsWith("%") && oe(e.slice(0, -1)), je = (e) => lb.test(e), fb = () => !0, hb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  cb.test(e) && !ub.test(e)
), Ml = () => !1, pb = (e) => db.test(e), bb = (e) => mb.test(e), gb = (e) => !z(e) && !_(e), vb = (e) => Kt(e, Il, Ml), z = (e) => Rl.test(e), pt = (e) => Kt(e, Dl, hb), or = (e) => Kt(e, yb, oe), fs = (e) => Kt(e, Pl, Ml), wb = (e) => Kt(e, Ll, bb), _n = (e) => Kt(e, Ol, pb), _ = (e) => Al.test(e), Yt = (e) => Gt(e, Dl), Nb = (e) => Gt(e, Cb), hs = (e) => Gt(e, Pl), kb = (e) => Gt(e, Il), xb = (e) => Gt(e, Ll), Hn = (e) => Gt(e, Ol, !0), Kt = (e, t, n) => {
  const o = Rl.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Gt = (e, t, n = !1) => {
  const o = Al.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, Pl = (e) => e === "position" || e === "percentage", Ll = (e) => e === "image" || e === "url", Il = (e) => e === "length" || e === "size" || e === "bg-size", Dl = (e) => e === "length", yb = (e) => e === "number", Cb = (e) => e === "family-name", Ol = (e) => e === "shadow", Tb = () => {
  const e = me("color"), t = me("font"), n = me("text"), o = me("font-weight"), r = me("tracking"), i = me("leading"), s = me("breakpoint"), a = me("container"), l = me("spacing"), u = me("radius"), d = me("shadow"), m = me("inset-shadow"), h = me("text-shadow"), f = me("drop-shadow"), p = me("blur"), b = me("perspective"), v = me("aspect"), g = me("ease"), N = me("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], y = () => [
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
  ], k = () => [...y(), _, z], S = () => ["auto", "hidden", "clip", "visible", "scroll"], T = () => ["auto", "contain", "none"], C = () => [_, z, l], L = () => [At, "full", "auto", ...C()], O = () => [ot, "none", "subgrid", _, z], V = () => ["auto", {
    span: ["full", ot, _, z]
  }, ot, _, z], W = () => [ot, "auto", _, z], U = () => ["auto", "min", "max", "fr", _, z], K = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], J = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], F = () => ["auto", ...C()], G = () => [At, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], A = () => [e, _, z], $ = () => [...y(), hs, fs, {
    position: [_, z]
  }], E = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], D = () => ["auto", "cover", "contain", kb, vb, {
    size: [_, z]
  }], j = () => [nr, Yt, pt], q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    _,
    z
  ], se = () => ["", oe, Yt, pt], ue = () => ["solid", "dashed", "dotted", "double"], de = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], X = () => [oe, nr, hs, fs], xe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    p,
    _,
    z
  ], Le = () => ["none", oe, _, z], Ie = () => ["none", oe, _, z], Je = () => [oe, _, z], We = () => [At, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [je],
      breakpoint: [je],
      color: [fb],
      container: [je],
      "drop-shadow": [je],
      ease: ["in", "out", "in-out"],
      font: [gb],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [je],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [je],
      shadow: [je],
      spacing: ["px", oe],
      text: [je],
      "text-shadow": [je],
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
        aspect: ["auto", "square", At, z, _, v]
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
        columns: [oe, z, _, a]
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
        object: k()
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
        overscroll: T()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": T()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": T()
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
        inset: L()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": L()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": L()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: L()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: L()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: L()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: L()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: L()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: L()
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
        z: [ot, "auto", _, z]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [At, "full", "auto", a, ...C()]
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
        flex: [oe, At, "auto", "initial", "none", z]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", oe, _, z]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", oe, _, z]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ot, "first", "last", "none", _, z]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": O()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: V()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": W()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": W()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": O()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: V()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": W()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": W()
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
        "auto-cols": U()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": U()
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
        justify: [...K(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...J(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...J()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...K()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...J(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...J(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": K()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...J(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...J()]
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
        m: F()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: F()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: F()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: F()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: F()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: F()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: F()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: F()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: F()
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
        size: G()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...G()]
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
          ...G()
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
            screen: [s]
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
        text: ["base", n, Yt, pt]
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
        font: [o, _, or]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", nr, z]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Nb, z, t]
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
        tracking: [r, _, z]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [oe, "none", _, or]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...C()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", _, z]
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
        list: ["disc", "decimal", "none", _, z]
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
        decoration: [...ue(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [oe, "from-font", "auto", _, pt]
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
        "underline-offset": [oe, "auto", _, z]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", _, z]
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
        content: ["none", _, z]
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
        bg: E()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: D()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ot, _, z],
          radial: ["", _, z],
          conic: [ot, _, z]
        }, xb, wb]
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
        from: j()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: j()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: j()
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
        rounded: q()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": q()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": q()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": q()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": q()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": q()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": q()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": q()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": q()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": q()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": q()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": q()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": q()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": q()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": q()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: se()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": se()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": se()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": se()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": se()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": se()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": se()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": se()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": se()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": se()
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
        "divide-y": se()
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
        border: [...ue(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ue(), "hidden", "none"]
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
        outline: [...ue(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [oe, _, z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", oe, Yt, pt]
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
          d,
          Hn,
          _n
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
        "inset-shadow": ["none", m, Hn, _n]
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
        ring: se()
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
        "ring-offset": [oe, pt]
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
        "inset-ring": se()
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
        "text-shadow": ["none", h, Hn, _n]
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
        opacity: [oe, _, z]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...de(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": de()
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
        "mask-linear": [oe]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": X()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": X()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": A()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": A()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": X()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": X()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": A()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": A()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": X()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": X()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": A()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": A()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": X()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": X()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": A()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": A()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": X()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": X()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": A()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": A()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": X()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": X()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": A()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": A()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": X()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": X()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": A()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": A()
      }],
      "mask-image-radial": [{
        "mask-radial": [_, z]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": X()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": X()
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
        "mask-radial-at": y()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [oe]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": X()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": X()
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
        mask: E()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: D()
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
        mask: ["none", _, z]
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
          _,
          z
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: xe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [oe, _, z]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [oe, _, z]
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
          f,
          Hn,
          _n
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
        grayscale: ["", oe, _, z]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [oe, _, z]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", oe, _, z]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [oe, _, z]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", oe, _, z]
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
          _,
          z
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": xe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [oe, _, z]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [oe, _, z]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", oe, _, z]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [oe, _, z]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", oe, _, z]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [oe, _, z]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [oe, _, z]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", oe, _, z]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", _, z]
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
        duration: [oe, "initial", _, z]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", g, _, z]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [oe, _, z]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", N, _, z]
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
        perspective: [b, _, z]
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
        rotate: Le()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Le()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Le()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Le()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Ie()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Ie()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Ie()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Ie()
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
        skew: Je()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Je()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Je()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [_, z, "", "none", "gpu", "cpu"]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", _, z]
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
        "will-change": ["auto", "scroll", "contents", "transform", _, z]
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
        stroke: [oe, Yt, pt, or]
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
}, Eb = /* @__PURE__ */ sb(Tb);
function yt(...e) {
  return Eb(Tl(e));
}
function Mt({
  ...e
}) {
  return /* @__PURE__ */ c(zp, { "data-slot": "dropdown-menu", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function Pt({
  ...e
}) {
  return /* @__PURE__ */ c(
    _p,
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
function Lt({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ c(Hp, { children: /* @__PURE__ */ c(
    Fp,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: yt(
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
function ee({
  className: e,
  inset: t,
  variant: n = "default",
  ...o
}) {
  return /* @__PURE__ */ c(
    Wp,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: yt(
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
function rt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ c(
    Up,
    {
      "data-slot": "dropdown-menu-separator",
      className: yt("bg-border -mx-1 my-1 h-px", e),
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
function ps({
  ...e
}) {
  return /* @__PURE__ */ c(Vp, { "data-slot": "dropdown-menu-sub", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 196,
    columnNumber: 10
  }, this);
}
function bs({
  className: e,
  inset: t,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ c(
    jp,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: yt(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ c(fu, { className: "ml-auto size-4" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
          lineNumber: 218,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 208,
      columnNumber: 5
    },
    this
  );
}
function gs({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ c(
    Kp,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: yt(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        e
      ),
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 228,
      columnNumber: 5
    },
    this
  );
}
const vs = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ws = Tl, Sb = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return ws(e, n?.class, n?.className);
  const { variants: r, defaultVariants: i } = t, s = Object.keys(r).map((u) => {
    const d = n?.[u], m = i?.[u];
    if (d === null) return null;
    const h = vs(d) || vs(m);
    return r[u][h];
  }), a = n && Object.entries(n).reduce((u, d) => {
    let [m, h] = d;
    return h === void 0 || (u[m] = h), u;
  }, {}), l = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((u, d) => {
    let { class: m, className: h, ...f } = d;
    return Object.entries(f).every((p) => {
      let [b, v] = p;
      return Array.isArray(v) ? v.includes({
        ...i,
        ...a
      }[b]) : {
        ...i,
        ...a
      }[b] === v;
    }) ? [
      ...u,
      m,
      h
    ] : u;
  }, []);
  return ws(e, s, l, n?.class, n?.className);
}, Rb = Sb(
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
function It({
  className: e,
  variant: t,
  size: n,
  asChild: o = !1,
  ...r
}) {
  return /* @__PURE__ */ c(
    o ? Id : "button",
    {
      "data-slot": "button",
      className: yt(Rb({ variant: t, size: n, className: e })),
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
var Ab = Object.freeze({
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
}), Mb = "VisuallyHidden", $l = w.forwardRef(
  (e, t) => /* @__PURE__ */ R(
    be.span,
    {
      ...e,
      ref: t,
      style: { ...Ab, ...e.style }
    }
  )
);
$l.displayName = Mb;
var Pb = $l, [Bo] = Ut("Tooltip", [
  Io
]), zo = Io(), Bl = "TooltipProvider", Lb = 700, yr = "tooltip.open", [Ib, si] = Bo(Bl), zl = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Lb,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: i
  } = e, s = w.useRef(!0), a = w.useRef(!1), l = w.useRef(0);
  return w.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ R(
    Ib,
    {
      scope: t,
      isOpenDelayedRef: s,
      delayDuration: n,
      onOpen: w.useCallback(() => {
        window.clearTimeout(l.current), s.current = !1;
      }, []),
      onClose: w.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => s.current = !0,
          o
        );
      }, [o]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: w.useCallback((u) => {
        a.current = u;
      }, []),
      disableHoverableContent: r,
      children: i
    }
  );
};
zl.displayName = Bl;
var hn = "Tooltip", [Db, yn] = Bo(hn), _l = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    disableHoverableContent: s,
    delayDuration: a
  } = e, l = si(hn, e.__scopeTooltip), u = zo(t), [d, m] = w.useState(null), h = _t(), f = w.useRef(0), p = s ?? l.disableHoverableContent, b = a ?? l.delayDuration, v = w.useRef(!1), [g, N] = Ro({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (T) => {
      T ? (l.onOpen(), document.dispatchEvent(new CustomEvent(yr))) : l.onClose(), i?.(T);
    },
    caller: hn
  }), x = w.useMemo(() => g ? v.current ? "delayed-open" : "instant-open" : "closed", [g]), y = w.useCallback(() => {
    window.clearTimeout(f.current), f.current = 0, v.current = !1, N(!0);
  }, [N]), k = w.useCallback(() => {
    window.clearTimeout(f.current), f.current = 0, N(!1);
  }, [N]), S = w.useCallback(() => {
    window.clearTimeout(f.current), f.current = window.setTimeout(() => {
      v.current = !0, N(!0), f.current = 0;
    }, b);
  }, [b, N]);
  return w.useEffect(() => () => {
    f.current && (window.clearTimeout(f.current), f.current = 0);
  }, []), /* @__PURE__ */ R(Xr, { ...u, children: /* @__PURE__ */ R(
    Db,
    {
      scope: t,
      contentId: h,
      open: g,
      stateAttribute: x,
      trigger: d,
      onTriggerChange: m,
      onTriggerEnter: w.useCallback(() => {
        l.isOpenDelayedRef.current ? S() : y();
      }, [l.isOpenDelayedRef, S, y]),
      onTriggerLeave: w.useCallback(() => {
        p ? k() : (window.clearTimeout(f.current), f.current = 0);
      }, [k, p]),
      onOpen: y,
      onClose: k,
      disableHoverableContent: p,
      children: n
    }
  ) });
};
_l.displayName = hn;
var Cr = "TooltipTrigger", Hl = w.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = yn(Cr, n), i = si(Cr, n), s = zo(n), a = w.useRef(null), l = ve(t, a, r.onTriggerChange), u = w.useRef(!1), d = w.useRef(!1), m = w.useCallback(() => u.current = !1, []);
    return w.useEffect(() => () => document.removeEventListener("pointerup", m), [m]), /* @__PURE__ */ R(Ca, { asChild: !0, ...s, children: /* @__PURE__ */ R(
      be.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: l,
        onPointerMove: te(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !d.current && !i.isPointerInTransitRef.current && (r.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: te(e.onPointerLeave, () => {
          r.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: te(e.onPointerDown, () => {
          r.open && r.onClose(), u.current = !0, document.addEventListener("pointerup", m, { once: !0 });
        }),
        onFocus: te(e.onFocus, () => {
          u.current || r.onOpen();
        }),
        onBlur: te(e.onBlur, r.onClose),
        onClick: te(e.onClick, r.onClose)
      }
    ) });
  }
);
Hl.displayName = Cr;
var ai = "TooltipPortal", [Ob, $b] = Bo(ai, {
  forceMount: void 0
}), Fl = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, i = yn(ai, t);
  return /* @__PURE__ */ R(Ob, { scope: t, forceMount: n, children: /* @__PURE__ */ R(kt, { present: n || i.open, children: /* @__PURE__ */ R(Yr, { asChild: !0, container: r, children: o }) }) });
};
Fl.displayName = ai;
var Ft = "TooltipContent", Wl = w.forwardRef(
  (e, t) => {
    const n = $b(Ft, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...i } = e, s = yn(Ft, e.__scopeTooltip);
    return /* @__PURE__ */ R(kt, { present: o || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ R(Ul, { side: r, ...i, ref: t }) : /* @__PURE__ */ R(Bb, { side: r, ...i, ref: t }) });
  }
), Bb = w.forwardRef((e, t) => {
  const n = yn(Ft, e.__scopeTooltip), o = si(Ft, e.__scopeTooltip), r = w.useRef(null), i = ve(t, r), [s, a] = w.useState(null), { trigger: l, onClose: u } = n, d = r.current, { onPointerInTransitChange: m } = o, h = w.useCallback(() => {
    a(null), m(!1);
  }, [m]), f = w.useCallback(
    (p, b) => {
      const v = p.currentTarget, g = { x: p.clientX, y: p.clientY }, N = Fb(g, v.getBoundingClientRect()), x = Wb(g, N), y = Ub(b.getBoundingClientRect()), k = jb([...x, ...y]);
      a(k), m(!0);
    },
    [m]
  );
  return w.useEffect(() => () => h(), [h]), w.useEffect(() => {
    if (l && d) {
      const p = (v) => f(v, d), b = (v) => f(v, l);
      return l.addEventListener("pointerleave", p), d.addEventListener("pointerleave", b), () => {
        l.removeEventListener("pointerleave", p), d.removeEventListener("pointerleave", b);
      };
    }
  }, [l, d, f, h]), w.useEffect(() => {
    if (s) {
      const p = (b) => {
        const v = b.target, g = { x: b.clientX, y: b.clientY }, N = l?.contains(v) || d?.contains(v), x = !Vb(g, s);
        N ? h() : x && (h(), u());
      };
      return document.addEventListener("pointermove", p), () => document.removeEventListener("pointermove", p);
    }
  }, [l, d, s, u, h]), /* @__PURE__ */ R(Ul, { ...e, ref: i });
}), [zb, _b] = Bo(hn, { isInside: !1 }), Hb = /* @__PURE__ */ Od("TooltipContent"), Ul = w.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: i,
      onPointerDownOutside: s,
      ...a
    } = e, l = yn(Ft, n), u = zo(n), { onClose: d } = l;
    return w.useEffect(() => (document.addEventListener(yr, d), () => document.removeEventListener(yr, d)), [d]), w.useEffect(() => {
      if (l.trigger) {
        const m = (h) => {
          h.target?.contains(l.trigger) && d();
        };
        return window.addEventListener("scroll", m, { capture: !0 }), () => window.removeEventListener("scroll", m, { capture: !0 });
      }
    }, [l.trigger, d]), /* @__PURE__ */ R(
      Hr,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        onFocusOutside: (m) => m.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ ju(
          Ta,
          {
            "data-state": l.stateAttribute,
            ...u,
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
              /* @__PURE__ */ R(Hb, { children: o }),
              /* @__PURE__ */ R(zb, { scope: n, isInside: !0, children: /* @__PURE__ */ R(Pb, { id: l.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
Wl.displayName = Ft;
var Vl = "TooltipArrow", jl = w.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = zo(n);
    return _b(
      Vl,
      n
    ).isInside ? null : /* @__PURE__ */ R(Ea, { ...r, ...o, ref: t });
  }
);
jl.displayName = Vl;
function Fb(e, t) {
  const n = Math.abs(t.top - e.y), o = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), i = Math.abs(t.left - e.x);
  switch (Math.min(n, o, r, i)) {
    case i:
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
function Wb(e, t, n = 5) {
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
function Ub(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function Vb(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const a = t[i], l = t[s], u = a.x, d = a.y, m = l.x, h = l.y;
    d > o != h > o && n < (m - u) * (o - d) / (h - d) + u && (r = !r);
  }
  return r;
}
function jb(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), Kb(t);
}
function Kb(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const i = t[t.length - 1], s = t[t.length - 2];
      if ((i.x - s.x) * (r.y - s.y) >= (i.y - s.y) * (r.x - s.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const i = n[n.length - 1], s = n[n.length - 2];
      if ((i.x - s.x) * (r.y - s.y) >= (i.y - s.y) * (r.x - s.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var Gb = zl, qb = _l, Xb = Hl, Yb = Fl, Zb = Wl, Qb = jl;
function Jb({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ c(
    Gb,
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
function Kl({
  ...e
}) {
  return /* @__PURE__ */ c(Jb, { children: /* @__PURE__ */ c(qb, { "data-slot": "tooltip", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function Gl({
  ...e
}) {
  return /* @__PURE__ */ c(Xb, { "data-slot": "tooltip-trigger", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
function ql({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ c(Yb, { children: /* @__PURE__ */ c(
    Zb,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: yt(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ c(Qb, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" }, void 0, !1, {
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
const fe = ({ onClick: e, isActive: t, disabled: n, children: o, tooltip: r }) => {
  const i = /* @__PURE__ */ c(
    "button",
    {
      onClick: e,
      disabled: n,
      className: `
        flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-md
        transition-all duration-100 ease-out touch-manipulation
        ${t ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        ${n ? "opacity-50 cursor-not-allowed" : ""}
      `,
      children: o
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 95,
      columnNumber: 5
    },
    void 0
  );
  return r ? /* @__PURE__ */ c(Kl, { children: [
    /* @__PURE__ */ c(Gl, { asChild: !0, children: i }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 115,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ c(ql, { side: "bottom", className: "text-xs hidden sm:block", children: r }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 116,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 114,
    columnNumber: 7
  }, void 0) : i;
}, Zt = () => /* @__PURE__ */ c("div", { className: "w-px h-6 bg-border mx-0.5 hidden sm:block" }, void 0, !1, {
  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
  lineNumber: 127,
  columnNumber: 3
}, void 0), eg = bn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: o, className: r = "" }) {
  const [i, s] = B(""), [a, l] = B(!1), u = zs({
    editor: t,
    selector: ({ editor: f }) => ({
      canUndo: f.can().undo(),
      canRedo: f.can().redo(),
      isBold: f.isActive("bold"),
      isItalic: f.isActive("italic"),
      isUnderline: f.isActive("underline"),
      isStrike: f.isActive("strike"),
      isCode: f.isActive("code"),
      isHighlight: f.isActive("highlight"),
      isH1: f.isActive("heading", { level: 1 }),
      isH2: f.isActive("heading", { level: 2 }),
      isH3: f.isActive("heading", { level: 3 }),
      isBlockquote: f.isActive("blockquote"),
      isBulletList: f.isActive("bulletList"),
      isOrderedList: f.isActive("orderedList"),
      isTaskList: f.isActive("taskList"),
      isCodeBlock: f.isActive("codeBlock"),
      isLink: f.isActive("link")
    })
  }), d = H(() => {
    i && (t.chain().focus().setImage({ src: i }).run(), s(""), l(!1));
  }, [t, i]), m = H(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), h = H((f) => {
    t.chain().focus().insertCallout({ type: f }).run();
  }, [t]);
  return /* @__PURE__ */ c("div", { className: `flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 border-b border-border bg-card/50 overflow-x-auto scrollbar-hide ${r}`, children: [
    /* @__PURE__ */ c(
      fe,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !u?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ c(hu, { size: 18, className: "sm:w-4 sm:h-4" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 183,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 178,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ c(
      fe,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !u?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ c(pu, { size: 18, className: "sm:w-4 sm:h-4" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 190,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 185,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ c(Zt, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 193,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c("div", { className: "hidden sm:flex items-center gap-0.5", children: [
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleBold().run(),
          isActive: u?.isBold,
          tooltip: "Bold (Ctrl+B)",
          children: /* @__PURE__ */ c(Xn, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 202,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 197,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleItalic().run(),
          isActive: u?.isItalic,
          tooltip: "Italic (Ctrl+I)",
          children: /* @__PURE__ */ c(Yn, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 209,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 204,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleUnderline().run(),
          isActive: u?.isUnderline,
          tooltip: "Underline (Ctrl+U)",
          children: /* @__PURE__ */ c(Zn, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 211,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleStrike().run(),
          isActive: u?.isStrike,
          tooltip: "Strikethrough",
          children: /* @__PURE__ */ c(Qn, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 223,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 218,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleCode().run(),
          isActive: u?.isCode,
          tooltip: "Inline Code (Ctrl+E)",
          children: /* @__PURE__ */ c(cr, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 230,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 225,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleHighlight().run(),
          isActive: u?.isHighlight,
          tooltip: "Highlight",
          children: /* @__PURE__ */ c(ur, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 237,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 232,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => o?.(),
          isActive: u?.isLink,
          tooltip: "Link (Ctrl+K)",
          children: /* @__PURE__ */ c(Jn, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 244,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 239,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 196,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c(Mt, { children: [
      /* @__PURE__ */ c(Pt, { asChild: !0, children: /* @__PURE__ */ c(It, { variant: "ghost", size: "sm", className: "h-9 w-9 p-0 sm:hidden", children: /* @__PURE__ */ c(gn, { size: 18 }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 252,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 251,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 250,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c(Lt, { align: "start", className: "w-48", children: [
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleBold().run(), children: [
          /* @__PURE__ */ c(Xn, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 257,
            columnNumber: 13
          }, this),
          " Bold"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 256,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleItalic().run(), children: [
          /* @__PURE__ */ c(Yn, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 260,
            columnNumber: 13
          }, this),
          " Italic"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 259,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleUnderline().run(), children: [
          /* @__PURE__ */ c(Zn, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 263,
            columnNumber: 13
          }, this),
          " Underline"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleStrike().run(), children: [
          /* @__PURE__ */ c(Qn, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 266,
            columnNumber: 13
          }, this),
          " Strikethrough"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 265,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleCode().run(), children: [
          /* @__PURE__ */ c(cr, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 269,
            columnNumber: 13
          }, this),
          " Inline Code"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 268,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleHighlight().run(), children: [
          /* @__PURE__ */ c(ur, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 272,
            columnNumber: 13
          }, this),
          " Highlight"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 271,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => o?.(), children: [
          /* @__PURE__ */ c(Jn, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 275,
            columnNumber: 13
          }, this),
          " Link"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 274,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 255,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 249,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c(Zt, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 280,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c(Mt, { children: [
      /* @__PURE__ */ c(Pt, { asChild: !0, children: /* @__PURE__ */ c(It, { variant: "ghost", size: "sm", className: "h-9 sm:h-8 px-1.5 sm:px-2 gap-1", children: [
        /* @__PURE__ */ c(qn, { size: 18, className: "sm:w-4 sm:h-4" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 286,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c("span", { className: "text-xs hidden sm:inline", children: "Heading" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 287,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 285,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 284,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c(Lt, { align: "start", children: [
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(), children: [
          /* @__PURE__ */ c(qn, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 292,
            columnNumber: 13
          }, this),
          " Heading 1"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 291,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(), children: [
          /* @__PURE__ */ c(Or, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 295,
            columnNumber: 13
          }, this),
          " Heading 2"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 294,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(), children: [
          /* @__PURE__ */ c($r, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 298,
            columnNumber: 13
          }, this),
          " Heading 3"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 297,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(rt, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 300,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().setParagraph().run(), children: [
          /* @__PURE__ */ c(Ot, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 302,
            columnNumber: 13
          }, this),
          " Paragraph"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 301,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 290,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 283,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c(Zt, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 307,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c("div", { className: "hidden md:flex items-center gap-0.5", children: [
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleBulletList().run(),
          isActive: u?.isBulletList,
          tooltip: "Bullet List",
          children: /* @__PURE__ */ c(to, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 316,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 311,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleOrderedList().run(),
          isActive: u?.isOrderedList,
          tooltip: "Numbered List",
          children: /* @__PURE__ */ c(no, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 323,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 318,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleTaskList().run(),
          isActive: u?.isTaskList,
          tooltip: "Task List",
          children: /* @__PURE__ */ c(oo, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 330,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 325,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleBlockquote().run(),
          isActive: u?.isBlockquote,
          tooltip: "Quote",
          children: /* @__PURE__ */ c(eo, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 337,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 332,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().toggleCodeBlock().run(),
          isActive: u?.isCodeBlock,
          tooltip: "Code Block",
          children: /* @__PURE__ */ c(dr, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 344,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 339,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(Zt, {}, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 346,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => {
            u?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (u?.isBulletList || u?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
          },
          disabled: !u?.isBulletList && !u?.isOrderedList && !u?.isTaskList,
          tooltip: "Indent (Tab)",
          children: /* @__PURE__ */ c(Pi, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 359,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 347,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => {
            u?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (u?.isBulletList || u?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
          },
          disabled: !u?.isBulletList && !u?.isOrderedList && !u?.isTaskList,
          tooltip: "Outdent (Shift+Tab)",
          children: /* @__PURE__ */ c(Li, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 373,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 361,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 310,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c(Mt, { children: [
      /* @__PURE__ */ c(Pt, { asChild: !0, children: /* @__PURE__ */ c(It, { variant: "ghost", size: "sm", className: "h-9 w-9 p-0 md:hidden", children: /* @__PURE__ */ c(bu, { size: 18 }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 381,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 380,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 379,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c(Lt, { align: "start", className: "w-48", children: [
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleBulletList().run(), children: [
          /* @__PURE__ */ c(to, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 386,
            columnNumber: 13
          }, this),
          " Bullet List"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 385,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleOrderedList().run(), children: [
          /* @__PURE__ */ c(no, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 389,
            columnNumber: 13
          }, this),
          " Numbered List"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 388,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleTaskList().run(), children: [
          /* @__PURE__ */ c(oo, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 392,
            columnNumber: 13
          }, this),
          " Task List"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 391,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleBlockquote().run(), children: [
          /* @__PURE__ */ c(eo, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 395,
            columnNumber: 13
          }, this),
          " Quote"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 394,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().toggleCodeBlock().run(), children: [
          /* @__PURE__ */ c(dr, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 398,
            columnNumber: 13
          }, this),
          " Code Block"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 397,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(rt, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 400,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => {
              u?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (u?.isBulletList || u?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
            },
            disabled: !u?.isBulletList && !u?.isOrderedList && !u?.isTaskList,
            children: [
              /* @__PURE__ */ c(Pi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 411,
                columnNumber: 13
              }, this),
              " Indent"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 401,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => {
              u?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (u?.isBulletList || u?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
            },
            disabled: !u?.isBulletList && !u?.isOrderedList && !u?.isTaskList,
            children: [
              /* @__PURE__ */ c(Li, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 423,
                columnNumber: 13
              }, this),
              " Outdent"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 413,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 384,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 378,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c(Zt, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 428,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c("div", { className: "hidden lg:flex items-center gap-0.5", children: [
      /* @__PURE__ */ c(
        fe,
        {
          onClick: m,
          tooltip: "Insert Table (3×3)",
          children: /* @__PURE__ */ c(Vn, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 437,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 433,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => l(!0),
          tooltip: "Insert Image",
          children: /* @__PURE__ */ c(so, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 443,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 439,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(
        fe,
        {
          onClick: () => t.chain().focus().setHorizontalRule().run(),
          tooltip: "Horizontal Rule",
          children: /* @__PURE__ */ c(mr, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 449,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 445,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c(Mt, { children: [
        /* @__PURE__ */ c(Pt, { asChild: !0, children: /* @__PURE__ */ c(
          "button",
          {
            className: "flex items-center justify-center w-8 h-8 rounded-md transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
            title: "Insert Callout",
            children: /* @__PURE__ */ c(Dt, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 458,
              columnNumber: 15
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 454,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 453,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(Lt, { align: "start", children: [
          /* @__PURE__ */ c(ee, { onClick: () => h("info"), children: [
            /* @__PURE__ */ c(Dt, { size: 16, className: "mr-2 text-blue-400" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 463,
              columnNumber: 15
            }, this),
            " Info"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 462,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c(ee, { onClick: () => h("warning"), children: [
            /* @__PURE__ */ c(io, { size: 16, className: "mr-2 text-yellow-400" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 466,
              columnNumber: 15
            }, this),
            " Warning"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 465,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c(ee, { onClick: () => h("error"), children: [
            /* @__PURE__ */ c(ao, { size: 16, className: "mr-2 text-red-400" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 469,
              columnNumber: 15
            }, this),
            " Error"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 468,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c(ee, { onClick: () => h("success"), children: [
            /* @__PURE__ */ c(ro, { size: 16, className: "mr-2 text-green-400" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 472,
              columnNumber: 15
            }, this),
            " Success"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 471,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c(ee, { onClick: () => h("note"), children: [
            /* @__PURE__ */ c(Ot, { size: 16, className: "mr-2 text-purple-400" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 475,
              columnNumber: 15
            }, this),
            " Note"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 474,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 461,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 452,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 432,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c(Mt, { children: [
      /* @__PURE__ */ c(Pt, { asChild: !0, children: /* @__PURE__ */ c(It, { variant: "ghost", size: "sm", className: "h-9 sm:h-8 px-1.5 sm:px-2 gap-1 lg:hidden", children: [
        /* @__PURE__ */ c(gu, { size: 18, className: "sm:w-4 sm:h-4" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 485,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c("span", { className: "text-xs hidden sm:inline", children: "Insert" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 486,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 484,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 483,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c(Lt, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ c(ee, { onClick: m, children: [
          /* @__PURE__ */ c(Vn, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 491,
            columnNumber: 13
          }, this),
          " Table (3×3)"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 490,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => l(!0), children: [
          /* @__PURE__ */ c(so, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 494,
            columnNumber: 13
          }, this),
          " Image"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 493,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().setHorizontalRule().run(), children: [
          /* @__PURE__ */ c(mr, { size: 16, className: "mr-2" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 497,
            columnNumber: 13
          }, this),
          " Horizontal Rule"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 496,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(rt, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 499,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c(ps, { children: [
          /* @__PURE__ */ c(bs, { children: [
            /* @__PURE__ */ c(Dt, { size: 16, className: "mr-2" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 502,
              columnNumber: 15
            }, this),
            " Callout"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 501,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c(gs, { children: [
            /* @__PURE__ */ c(ee, { onClick: () => h("info"), children: [
              /* @__PURE__ */ c(Dt, { size: 16, className: "mr-2 text-blue-400" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 506,
                columnNumber: 17
              }, this),
              " Info"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 505,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c(ee, { onClick: () => h("warning"), children: [
              /* @__PURE__ */ c(io, { size: 16, className: "mr-2 text-yellow-400" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 509,
                columnNumber: 17
              }, this),
              " Warning"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 508,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c(ee, { onClick: () => h("error"), children: [
              /* @__PURE__ */ c(ao, { size: 16, className: "mr-2 text-red-400" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 512,
                columnNumber: 17
              }, this),
              " Error"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 511,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c(ee, { onClick: () => h("success"), children: [
              /* @__PURE__ */ c(ro, { size: 16, className: "mr-2 text-green-400" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 515,
                columnNumber: 17
              }, this),
              " Success"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 514,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c(ee, { onClick: () => h("note"), children: [
              /* @__PURE__ */ c(Ot, { size: 16, className: "mr-2 text-purple-400" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 518,
                columnNumber: 17
              }, this),
              " Note"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 517,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 504,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 500,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 489,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 482,
      columnNumber: 7
    }, this),
    t.isActive("table") && /* @__PURE__ */ c(Mt, { children: [
      /* @__PURE__ */ c(Pt, { asChild: !0, children: /* @__PURE__ */ c(
        It,
        {
          variant: "ghost",
          size: "sm",
          className: "h-9 sm:h-8 px-1.5 sm:px-2 gap-1 bg-primary/10",
          children: [
            /* @__PURE__ */ c(Vn, { size: 18, className: "sm:w-4 sm:h-4" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 534,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c("span", { className: "text-xs hidden sm:inline", children: "Table" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 535,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 529,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 528,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c(Lt, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ c(Ii, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 543,
                columnNumber: 15
              }, this),
              " Add Column Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 539,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ c(Ii, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 549,
                columnNumber: 15
              }, this),
              " Add Column After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 545,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ c(sn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 555,
                columnNumber: 15
              }, this),
              " Delete Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 551,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ c(rt, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 557,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ c(Di, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 562,
                columnNumber: 15
              }, this),
              " Add Row Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 558,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ c(Di, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 568,
                columnNumber: 15
              }, this),
              " Add Row After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 564,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ c(sn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 574,
                columnNumber: 15
              }, this),
              " Delete Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 570,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ c(rt, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 576,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ c(Oi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 581,
                columnNumber: 15
              }, this),
              " Toggle Header Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 577,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ c(Oi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 587,
                columnNumber: 15
              }, this),
              " Toggle Header Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 583,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ c(rt, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 589,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c(ps, { children: [
          /* @__PURE__ */ c(bs, { children: [
            /* @__PURE__ */ c(vu, { size: 16, className: "mr-2" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 592,
              columnNumber: 17
            }, this),
            " Cell Background"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 591,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c(gs, { className: "w-48", children: [
            /* @__PURE__ */ c("div", { className: "p-2", children: [
              /* @__PURE__ */ c("div", { className: "text-xs text-muted-foreground mb-2", children: "Quick Colors" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 596,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ c("div", { className: "grid grid-cols-6 gap-1 mb-2", children: [
                { color: "#ef4444", name: "Red" },
                { color: "#f97316", name: "Orange" },
                { color: "#eab308", name: "Yellow" },
                { color: "#22c55e", name: "Green" },
                { color: "#3b82f6", name: "Blue" },
                { color: "#8b5cf6", name: "Purple" },
                { color: "#ec4899", name: "Pink" },
                { color: "#14b8a6", name: "Teal" },
                { color: "#6366f1", name: "Indigo" },
                { color: "#64748b", name: "Slate" },
                { color: "#1e293b", name: "Dark" },
                { color: "#f1f5f9", name: "Light" }
              ].map(({ color: f, name: p }) => /* @__PURE__ */ c(
                "button",
                {
                  onClick: () => t.chain().focus().setCellBackground(f).run(),
                  className: "w-6 h-6 rounded border border-border hover:scale-110 transition-transform touch-manipulation",
                  style: { backgroundColor: f },
                  title: p
                },
                f,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                  lineNumber: 612,
                  columnNumber: 23
                },
                this
              )) }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 597,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ c("div", { className: "text-xs text-muted-foreground mb-1", children: "Custom Color" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 621,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ c(
                "input",
                {
                  type: "color",
                  defaultValue: "#3b82f6",
                  onChange: (f) => t.chain().focus().setCellBackground(f.target.value).run(),
                  className: "w-full h-8 rounded cursor-pointer border border-border",
                  style: { backgroundColor: "transparent" }
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                  lineNumber: 622,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 595,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ c(rt, {}, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 630,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ c(ee, { onClick: () => t.chain().focus().unsetCellBackground().run(), children: [
              /* @__PURE__ */ c(Nt, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 632,
                columnNumber: 19
              }, this),
              " Remove Background"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 631,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 594,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 590,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c(rt, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 636,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c(
          ee,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ c(sn, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 642,
                columnNumber: 15
              }, this),
              " Delete Table"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 637,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 538,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 527,
      columnNumber: 9
    }, this),
    a && /* @__PURE__ */ c("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:relative sm:inset-auto sm:bg-transparent sm:p-0", children: /* @__PURE__ */ c("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-4 sm:p-0 bg-card sm:bg-secondary rounded-lg sm:rounded-md w-full max-w-sm sm:max-w-none sm:w-auto", children: [
      /* @__PURE__ */ c(
        "input",
        {
          type: "url",
          placeholder: "Image URL...",
          value: i,
          onChange: (f) => s(f.target.value),
          onKeyDown: (f) => {
            f.key === "Enter" && (f.preventDefault(), d()), f.key === "Escape" && (l(!1), s(""));
          },
          className: "bg-secondary sm:bg-transparent border sm:border-none rounded px-3 py-2 sm:py-0 outline-none text-sm w-full sm:w-40",
          autoFocus: !0
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 652,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ c("div", { className: "flex gap-2 sm:gap-1", children: [
        /* @__PURE__ */ c(
          "button",
          {
            onClick: d,
            className: "flex-1 sm:flex-none px-4 sm:px-2 py-2 sm:py-0.5 text-sm sm:text-xs bg-primary text-primary-foreground rounded",
            children: "Add"
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 671,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ c(
          "button",
          {
            onClick: () => {
              l(!1), s("");
            },
            className: "flex-1 sm:flex-none px-4 sm:px-2 py-2 sm:py-0.5 text-sm sm:text-xs text-muted-foreground bg-secondary sm:bg-transparent rounded",
            children: "Cancel"
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 677,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 670,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 651,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 650,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c("div", { className: "flex-1 min-w-2" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 692,
      columnNumber: 7
    }, this),
    n && /* @__PURE__ */ c(Kl, { children: [
      /* @__PURE__ */ c(Gl, { asChild: !0, children: /* @__PURE__ */ c(
        It,
        {
          variant: "ghost",
          size: "sm",
          className: "h-9 sm:h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ c(Ir, { size: 18, className: "sm:w-4 sm:h-4" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 704,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c("span", { className: "text-xs hidden md:inline", children: "Copy MD" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 705,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 698,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 697,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c(ql, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 708,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 696,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 176,
    columnNumber: 5
  }, this);
});
function tg({ editor: e, isOpen: t, onClose: n, focusTrigger: o = 0, initialSearchQuery: r }) {
  const [i, s] = B(""), [a, l] = B(""), [u, d] = B(!1), [m, h] = B(!1), [f, p] = B(!1), [b, v] = B(!1), [g, N] = B([]), [x, y] = B(0), [k, S] = B(null), [T, C] = B(!1), L = Y(!1), O = Y(null), V = Y(null), W = Y(!1);
  Q(() => {
    t && r && r.trim() && s(r);
  }, [t, r, o]);
  const U = H(() => {
    if (!i || !e) {
      N([]), y(0), S(null);
      return;
    }
    const { doc: E } = e.state, D = [];
    let j;
    try {
      if (m)
        j = new RegExp(i, u ? "g" : "gi");
      else {
        let q = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        f && (q = `\\b${q}\\b`), j = new RegExp(q, u ? "g" : "gi");
      }
      S(null);
    } catch (q) {
      S(q.message), N([]);
      return;
    }
    E.descendants((q, se) => {
      if (q.isText && q.text) {
        let ue;
        for (; (ue = j.exec(q.text)) !== null; )
          D.push({
            from: se + ue.index,
            to: se + ue.index + ue[0].length,
            text: ue[0]
          });
      }
      return !0;
    }), N(D), D.length > 0 && x >= D.length && y(0);
  }, [i, u, m, f, e, x]);
  Q(() => {
    U();
  }, [U]), Q(() => {
    if (!e) return;
    const E = typeof e.commands.setSearchHighlight == "function";
    t && i && E ? e.commands.setSearchHighlight({
      searchTerm: i,
      caseSensitive: u,
      useRegex: m,
      currentMatchIndex: x
    }) : E && e.commands.clearSearchHighlight();
  }, [e, t, i, u, m, x]), Q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), L.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), C(!1)), L.current = !1);
  }, [t, e]), Q(() => {
    if (g.length > 0 && x < g.length) {
      const E = g[x], D = e.view.domAtPos(E.from);
      D.node && D.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), W.current && (W.current = !1);
    }
  }, [x, g, e]), Q(() => {
    t && O.current && (O.current.focus(), O.current.select());
  }, [t, o]);
  const K = H(() => {
    g.length !== 0 && (W.current = !0, y((E) => (E + 1) % g.length));
  }, [g.length]), J = H(() => {
    g.length !== 0 && (W.current = !0, y((E) => (E - 1 + g.length) % g.length));
  }, [g.length]), F = H(() => {
    if (g.length === 0 || x >= g.length) return;
    const E = g[x];
    e.chain().focus().setTextSelection({ from: E.from, to: E.to }).deleteSelection().insertContent(a).run(), setTimeout(U, 10);
  }, [g, x, a, e, U]), G = H(() => {
    if (g.length === 0) return;
    const E = [...g].sort((D, j) => j.from - D.from);
    e.chain().focus(), E.forEach((D) => {
      e.chain().setTextSelection({ from: D.from, to: D.to }).deleteSelection().insertContent(a).run();
    }), setTimeout(U, 10);
  }, [g, a, e, U]), A = H(() => {
    if (g.length === 0 || !i || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: i,
      caseSensitive: u,
      useRegex: m,
      wholeWord: f
    }) && (C(!0), L.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [g, i, u, m, f, e, n]), $ = H((E) => {
    E.key === "Enter" ? (E.preventDefault(), E.shiftKey ? J() : K(), O.current?.focus()) : E.key === "Escape" ? (E.preventDefault(), n()) : E.key === "h" && (E.ctrlKey || E.metaKey) ? (E.preventDefault(), v((D) => !D)) : E.key === "l" && (E.ctrlKey || E.metaKey) && E.shiftKey && (E.preventDefault(), A());
  }, [K, J, n, A]);
  return t ? /* @__PURE__ */ c(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: $,
      children: [
        /* @__PURE__ */ c("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ c("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ c(wu, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 300,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ c(
              "input",
              {
                ref: O,
                type: "text",
                placeholder: "Find...",
                value: i,
                onChange: (E) => s(E.target.value),
                className: `find-replace-input ${k ? "has-error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 301,
                columnNumber: 11
              },
              this
            ),
            k && /* @__PURE__ */ c("span", { className: "find-replace-error", title: k, children: "!" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 310,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 299,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c("span", { className: "find-replace-count", children: g.length > 0 ? `${x + 1} of ${g.length}` : i ? "No results" : "" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 315,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: J,
              disabled: g.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ c(Nu, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 329,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 323,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: K,
              disabled: g.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ c(yo, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 337,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 331,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: A,
              disabled: g.length === 0,
              className: `find-replace-btn ${T ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${g.length} matches`,
              children: /* @__PURE__ */ c(ku, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 347,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 341,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c("div", { className: "find-replace-separator" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 351,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => d((E) => !E),
              className: `find-replace-btn ${u ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ c(xu, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 359,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 354,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => p((E) => !E),
              className: `find-replace-btn ${f ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ c(yu, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 366,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 361,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => h((E) => !E),
              className: `find-replace-btn ${m ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ c(Cu, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 373,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 368,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => v((E) => !E),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ c($i, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 382,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 377,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ c(Nt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 391,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 386,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
          lineNumber: 298,
          columnNumber: 7
        }, this),
        b && /* @__PURE__ */ c("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ c("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ c($i, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 399,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ c(
              "input",
              {
                ref: V,
                type: "text",
                placeholder: "Replace with...",
                value: a,
                onChange: (E) => l(E.target.value),
                className: "find-replace-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 400,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 398,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: F,
              disabled: g.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 410,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: G,
              disabled: g.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ c(Tu, { size: 14 }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                  lineNumber: 424,
                  columnNumber: 13
                }, this),
                "All"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 418,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
          lineNumber: 397,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
      lineNumber: 293,
      columnNumber: 5
    },
    this
  ) : null;
}
const ng = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), Ke = ng ? "⌘" : "Ctrl", og = ({ editor: e }) => {
  const [t, n] = B(!1), [o, r] = B(0), [i, s] = B(0), [a, l] = B(""), [u, d] = B(""), [m, h] = B(!1), [f, p] = B(!1);
  Q(() => {
    if (!e) return;
    const T = () => {
      const L = e.storage.selectAllOccurrences;
      L ? (n(L.isActive), r(L.ranges.length), s(L.allMatches.length), l(L.searchTerm), d(L.typedBuffer), h(L.isTypingReplace), p(L.isIncremental)) : (n(!1), r(0), s(0));
    }, C = () => {
      T();
    };
    return e.on("transaction", C), T(), () => {
      e.off("transaction", C);
    };
  }, [e]);
  const b = H(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), v = H(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), g = H(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), N = H(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), x = H(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), y = H(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), k = H(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), S = H(() => {
    a && (e.commands.selectAllOccurrences({
      searchTerm: a,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, a]);
  return !t || o === 0 ? null : /* @__PURE__ */ c("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ c("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ c("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ c("span", { className: "select-all-action-bar-count-number", children: f && i > 0 ? `${o}/${i}` : o }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ c("span", { className: "select-all-action-bar-count-label", children: "selected" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ c("div", { className: "select-all-action-bar-preview", children: m ? /* @__PURE__ */ c(Ae, { children: [
        /* @__PURE__ */ c(gn, { size: 12, className: "select-all-action-bar-preview-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ c("span", { className: "select-all-action-bar-preview-old", children: a }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ c("span", { className: "select-all-action-bar-preview-arrow", children: "→" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ c("span", { className: "select-all-action-bar-preview-new", children: u || "∅" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 144,
          columnNumber: 15
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 140,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ c(Ae, { children: /* @__PURE__ */ c("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
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
      /* @__PURE__ */ c("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, void 0),
      f && o < i && /* @__PURE__ */ c(Ae, { children: [
        /* @__PURE__ */ c(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${Ke}+D)`,
            children: /* @__PURE__ */ c(Eu, { size: 14 }, void 0, !1, {
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
        /* @__PURE__ */ c(
          "button",
          {
            onClick: S,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${Ke}+Shift+L)`,
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
        /* @__PURE__ */ c("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ c(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${Ke}+B)`,
          children: /* @__PURE__ */ c(Xn, { size: 14 }, void 0, !1, {
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
      /* @__PURE__ */ c(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${Ke}+I)`,
          children: /* @__PURE__ */ c(Yn, { size: 14 }, void 0, !1, {
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
      /* @__PURE__ */ c(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${Ke}+U)`,
          children: /* @__PURE__ */ c(Zn, { size: 14 }, void 0, !1, {
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
      /* @__PURE__ */ c(
        "button",
        {
          onClick: N,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ c(Qn, { size: 14 }, void 0, !1, {
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
      /* @__PURE__ */ c("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ c(
        "button",
        {
          onClick: x,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ c(sn, { size: 14 }, void 0, !1, {
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
      /* @__PURE__ */ c(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ c(Nt, { size: 14 }, void 0, !1, {
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
    /* @__PURE__ */ c("div", { className: "select-all-action-bar-hint", children: f && o < i ? /* @__PURE__ */ c(Ae, { children: [
      /* @__PURE__ */ c("kbd", { children: [
        Ke,
        "+D"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, void 0),
      " next · ",
      /* @__PURE__ */ c("kbd", { children: [
        Ke,
        "+Shift+L"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 42
      }, void 0),
      " all · Type to replace · ",
      /* @__PURE__ */ c("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 94
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ c("kbd", { children: [
        Ke,
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
    }, void 0) : /* @__PURE__ */ c(Ae, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ c("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 35
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ c("kbd", { children: "Backspace" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 60
      }, void 0),
      " to delete · ",
      /* @__PURE__ */ c("kbd", { children: [
        Ke,
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
}, rg = bn(og), Fn = "-dismissed";
function ig(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const o = e.charCodeAt(n);
    t = (t << 5) - t + o, t = t & t;
  }
  return t;
}
function sg(e, t = {}) {
  const {
    storageKey: n = "manus-editor-content",
    debounceMs: o = 1e3,
    enabled: r = !0,
    onSave: i,
    onRecover: s
  } = t, [a, l] = B({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), u = Y(null), d = Y(""), m = Y(0);
  Q(() => {
    if (r && !(!e || e.isDestroyed))
      try {
        const g = localStorage.getItem(n), N = localStorage.getItem(n + Fn);
        if (g && !N) {
          let x = "";
          try {
            x = e.getHTML() || "";
          } catch {
            return;
          }
          g !== x && g.length > 50 && l((y) => ({ ...y, hasRecoverableContent: !0 }));
        }
      } catch (g) {
        console.warn("useAutoSave: Error checking for recoverable content", g);
      }
  }, [e, n, r]);
  const h = H(() => {
    if (!(!e || !r || e.isDestroyed))
      try {
        const g = e.getHTML(), N = ig(g);
        if (N === m.current && g.length === d.current.length) {
          l((x) => ({ ...x, status: "saved" }));
          return;
        }
        if (g.length < 20)
          return;
        l((x) => ({ ...x, status: "saving" })), localStorage.setItem(n, g), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), d.current = g, m.current = N, l((x) => ({
          ...x,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), i?.(g), setTimeout(() => {
          l((x) => x.status === "saved" ? { ...x, status: "idle" } : x);
        }, 2e3);
      } catch (g) {
        console.error("useAutoSave: Error saving content", g), l((N) => ({
          ...N,
          status: "error",
          error: g instanceof Error ? g.message : "Failed to save"
        }));
      }
  }, [e, n, r, i]);
  Q(() => {
    if (!e || !r || e.isDestroyed) return;
    const g = () => {
      e.isDestroyed || (u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        h();
      }, o));
    };
    return e.on("update", g), () => {
      e.off("update", g), u.current && clearTimeout(u.current);
    };
  }, [e, o, r, h]), Q(() => {
    if (!e || !r || e.isDestroyed) return;
    const g = () => {
      if (!e.isDestroyed)
        try {
          const N = e.getHTML();
          N.length >= 20 && (localStorage.setItem(n, N), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()));
        } catch (N) {
          console.warn("useAutoSave: Error saving on unload", N);
        }
    };
    return window.addEventListener("beforeunload", g), () => {
      window.removeEventListener("beforeunload", g);
    };
  }, [e, n, r]);
  const f = H(() => {
    u.current && clearTimeout(u.current), h();
  }, [h]), p = H(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Fn), d.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (g) {
      console.warn("useAutoSave: Error clearing content", g);
    }
  }, [n]), b = H(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const g = localStorage.getItem(n);
      return g && e && !e.isDestroyed ? (l((N) => ({ ...N, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(g), d.current = g, localStorage.removeItem(n + Fn), s?.(g);
          } catch (N) {
            console.warn("useAutoSave: Error setting content during recovery", N);
          }
      }), g) : null;
    } catch (g) {
      return console.warn("useAutoSave: Error recovering content", g), null;
    }
  }, [e, n, s]), v = H(() => {
    try {
      localStorage.setItem(n + Fn, "true"), l((g) => ({ ...g, hasRecoverableContent: !1 }));
    } catch (g) {
      console.warn("useAutoSave: Error dismissing recovery", g);
    }
  }, [n]);
  return {
    ...a,
    save: f,
    clear: p,
    recover: b,
    dismissRecovery: v
  };
}
const ag = 200;
function lg(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: o = !1,
    enabled: r = !0
  } = t, [i, s] = B({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), a = Y(null), l = Y(""), u = H((d) => {
    const m = d.trim(), h = m.length > 0 ? m.split(/\s+/).filter((N) => N.length > 0).length : 0, f = m.replace(/\s/g, "").length, p = d.length;
    let b = 0, v = 0;
    o && (b = m.length > 0 ? m.split(/\n\s*\n/).filter((N) => N.trim().length > 0).length : 0, v = m.length > 0 ? (m.match(/[.!?]+/g) || []).length : 0);
    const g = Math.max(1, Math.ceil(h / ag));
    return {
      words: h,
      characters: f,
      charactersWithSpaces: p,
      paragraphs: b,
      sentences: v,
      readingTime: g,
      isCalculating: !1
    };
  }, [o]);
  return Q(() => {
    if (!e || !r) return;
    const d = () => {
      a.current && clearTimeout(a.current), s((m) => ({ ...m, isCalculating: !0 })), a.current = setTimeout(() => {
        try {
          const m = e.getText();
          if (m === l.current) {
            s((f) => ({ ...f, isCalculating: !1 }));
            return;
          }
          l.current = m;
          const h = u(m);
          s(h);
        } catch (m) {
          console.warn("useWordCount: Error calculating word count", m), s((h) => ({ ...h, isCalculating: !1 }));
        }
      }, n);
    };
    return d(), e.on("update", d), () => {
      e.off("update", d), a.current && clearTimeout(a.current);
    };
  }, [e, n, r, u]), i;
}
function cg({ status: e, lastSaved: t, className: n = "" }) {
  const o = (r) => {
    if (!r) return "";
    const s = (/* @__PURE__ */ new Date()).getTime() - r.getTime(), a = Math.floor(s / 1e3), l = Math.floor(a / 60), u = Math.floor(l / 60);
    return a < 10 ? "Just now" : a < 60 ? `${a}s ago` : l < 60 ? `${l}m ago` : u < 24 ? `${u}h ago` : r.toLocaleDateString();
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ c(Ae, { children: [
          /* @__PURE__ */ c(Su, { className: "w-3.5 h-3.5 text-muted-foreground" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 40,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ c("span", { className: "text-muted-foreground", children: [
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
        e === "saving" && /* @__PURE__ */ c(Ae, { children: [
          /* @__PURE__ */ c(Ru, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ c("span", { className: "text-cyan-500", children: "Saving..." }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 46,
          columnNumber: 9
        }, this),
        e === "saved" && /* @__PURE__ */ c(Ae, { children: [
          /* @__PURE__ */ c(Co, { className: "w-3.5 h-3.5 text-emerald-500" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 54,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ c("span", { className: "text-emerald-500", children: "Saved" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 55,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this),
        e === "error" && /* @__PURE__ */ c(Ae, { children: [
          /* @__PURE__ */ c(Au, { className: "w-3.5 h-3.5 text-red-500" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ c("span", { className: "text-red-500", children: "Save failed" }, void 0, !1, {
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
function ug({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ c(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ c("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ c(ao, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 22,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 23,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
          lineNumber: 21,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ c("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ c(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ c(Mu, { className: "w-4 h-4" }, void 0, !1, {
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
          /* @__PURE__ */ c(
            "button",
            {
              onClick: t,
              className: "recovery-banner-dismiss p-2 rounded-md transition-colors duration-150",
              title: "Dismiss",
              "aria-label": "Dismiss recovery banner",
              children: /* @__PURE__ */ c(Nt, { className: "w-5 h-5" }, void 0, !1, {
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
const dg = /\[\[([^\[\]]+)\]\]$/, mg = qc.create({
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
      pn(
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
    const e = this.type;
    return [
      new bt({
        find: dg,
        handler: ({ state: t, range: n, match: o }) => {
          try {
            const r = o[1];
            if (!r) return;
            const { tr: i } = t, s = n.from, a = n.to;
            i.delete(s, a);
            const l = e.create({ pageName: r }), u = t.schema.text(r, [l]);
            i.insert(s, u), this.editor.view.dispatch(i);
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
}), it = {
  header: /^#{1,6}\s+/m,
  bold: /\*\*[^*]+\*\*/,
  codeBlock: /```[\s\S]*?```/,
  list: /^\s*[-*]\s+/m,
  taskList: /^\s*[-*]\s*\[[ x]\]/im,
  link: /\[.+\]\(.+\)/,
  // Table pattern: header row with pipes, separator row with dashes, optional data rows
  // Allow headers and separators with or without trailing pipes
  table: /^\|[^\n]+\n\|[-:\s|]+/m,
  // Callout pattern: ```info, ```warning, ```error, ```success, ```note
  callout: /```(?:info|warning|error|success|note)\s*\n[\s\S]*?```/
}, Ns = ["info", "warning", "error", "success", "note"];
function fg(e) {
  return e.length < 3 ? !1 : !!(it.header.test(e) || it.bold.test(e) || it.list.test(e) || it.taskList.test(e) || it.codeBlock.test(e) || it.callout.test(e) || it.link.test(e) || it.table.test(e));
}
function hg(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const o = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (o.length === 0 || !t[1].includes("-")) return "";
  const i = t.slice(2);
  let s = "<table><thead><tr>";
  for (const a of o)
    s += "<th><p>" + a + "</p></th>";
  s += "</tr></thead><tbody>";
  for (const a of i) {
    if (!a.trim()) continue;
    const l = a.split("|"), u = [];
    for (let d = 0; d < l.length; d++) {
      const m = l[d].trim();
      d === 0 && m === "" && a.trim().startsWith("|") || d === l.length - 1 && m === "" && a.trim().endsWith("|") || u.push(m);
    }
    if (u.length !== 0) {
      s += "<tr>";
      for (let d = 0; d < o.length; d++) {
        const m = u[d] || "";
        s += "<td><p>" + m + "</p></td>";
      }
      s += "</tr>";
    }
  }
  return s += "</tbody></table>", s;
}
function pg(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, o = [];
  t = t.replace(n, (s) => {
    const a = s.split(`
`);
    if (a.length >= 2) {
      const l = a[1];
      if (/^\|?[\s\-:|]+\|?$/.test(l) && l.includes("-")) {
        const u = hg(s);
        if (u) {
          const d = `MANUSTABLEPLACEHOLDER${o.length}END`;
          return o.push(u), d;
        }
      }
    }
    return s;
  }), Ns.forEach((s) => {
    const a = new RegExp(`\`\`\`${s}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(a, (l, u) => {
      let d = u.trim();
      return d = d.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), d = d.replace(/__([^_]+)__/g, "<strong>$1</strong>"), d = d.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), d = d.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), d = d.replace(/`([^`]+)`/g, "<code>$1</code>"), d.startsWith("<") || (d = `<p>${d}</p>`), `<div data-callout="" data-type="${s}" class="callout callout-${s}">${d}</div>`;
    });
  }), t = t.replace(/```(\w*)\n([\s\S]*?)```/g, (s, a, l) => {
    if (Ns.includes(a))
      return `<div data-callout="" data-type="${a}" class="callout callout-${a}"><p>${l.trim()}</p></div>`;
    const u = a || "plaintext", d = l.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<pre><code class="language-${u}">${d}</code></pre>`;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/^(#{1,6})\s+(.+)$/gm, (s, a, l) => {
    const u = a.length;
    return `<h${u}>${l}</h${u}>`;
  }), t = t.replace(/^(\s*)[-*]\s*\[x\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="true"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s*\[\s*\]\s+(.+)$/gim, '$1<li data-type="taskItem" data-checked="false"><p>$2</p></li>'), t = t.replace(/^(\s*)[-*]\s+(?!\[)(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/^(\s*)\d+\.\s+(.+)$/gm, "$1<li><p>$2</p></li>"), t = t.replace(/(<li data-type="taskItem"[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul data-type="taskList">$&</ul>'), t = t.replace(/(<li><p>[\s\S]*?<\/p><\/li>\n?)+/g, "<ul>$&</ul>"), t = t.replace(/^>\s+(.+)$/gm, "<blockquote><p>$1</p></blockquote>"), t = t.replace(/^[-*_]{3,}$/gm, "<hr>"), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">'), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((s) => {
    const a = s.trim();
    return a ? /^<[a-z]/.test(a) || /^<\//.test(a) || a.startsWith("MANUSTABLEPLACEHOLDER") ? s : `<p>${a}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let s = 0; s < o.length; s++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${s}END`, o[s]);
  return t;
}
const bg = Qe.create({
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
      new Ze({
        key: new Ye("markdownPaste"),
        props: {
          handlePaste(t, n, o) {
            const r = n.clipboardData;
            if (!r) return !1;
            const i = r.getData("text/html");
            if (i && i.trim())
              return !1;
            const s = r.getData("text/plain");
            if (!s || !fg(s))
              return !1;
            n.preventDefault();
            const a = pg(s);
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
}), ks = new Ye("collapsibleHeading");
function bo(e, t, n) {
  return `h${t}-${n}-${e.textContent.slice(0, 50)}`;
}
let zt = null;
function rr(e, t, n) {
  const o = [], r = [];
  e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const d = bo(l, l.attrs.level, u);
      r.push({
        pos: u,
        level: l.attrs.level,
        id: d,
        isCollapsed: t.collapsedHeadings.has(d),
        nodeSize: l.nodeSize
      });
    }
  });
  const i = [];
  for (let l = 0; l < r.length; l++) {
    const u = r[l];
    if (u.isCollapsed) {
      const d = u.pos + u.nodeSize;
      let m = e.content.size;
      for (let h = l + 1; h < r.length; h++)
        if (r[h].level <= u.level) {
          m = r[h].pos;
          break;
        }
      d < m && i.push({ start: d, end: m });
    }
  }
  const s = [];
  for (const l of i)
    if (s.length === 0)
      s.push(l);
    else {
      const u = s[s.length - 1];
      l.start <= u.end ? u.end = Math.max(u.end, l.end) : s.push(l);
    }
  function a(l) {
    for (const u of s)
      if (l >= u.start && l < u.end) return !0;
    return !1;
  }
  return e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const d = bo(l, l.attrs.level, u), m = t.collapsedHeadings.has(d), h = a(u);
      o.push(
        lt.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${m ? "is-collapsed" : "is-expanded"}${h ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const f = lt.widget(u + l.nodeSize - 1, () => {
        const p = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (p) {
          p.classList.contains("collapsed") !== m && (p.classList.remove("collapsed", "expanded"), p.classList.add(m ? "collapsed" : "expanded"), p.title = m ? "Click to expand" : "Click to collapse");
          const N = p.parentElement;
          if (N) return N;
        }
        const b = document.createElement("span");
        b.className = "collapsible-heading-chevron-wrapper", b.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${m ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", d), v.setAttribute("data-heading-level", String(l.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = m ? "Click to expand" : "Click to collapse", v.addEventListener("click", (g) => {
          g.preventDefault(), g.stopPropagation();
          const N = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(N ? "expanded" : "collapsed"), v.title = N ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), zt && zt.dispatch(zt.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), b.appendChild(v), b;
      }, { side: 1, key: `chevron-${d}` });
      o.push(f);
    } else l.isBlock && a(u) && o.push(
      lt.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Te.create(e, o);
}
const gg = Qe.create({
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
        const i = bo(r, r.attrs.level, e);
        return o.collapsedHeadings.has(i) ? o.collapsedHeadings.delete(i) : o.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((r, i) => {
          r.type.name === "heading" && n.collapsedHeadings.add(bo(r, r.attrs.level, i));
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ze({
        key: ks,
        view(n) {
          return zt = n, {
            update(o) {
              zt = o;
            },
            destroy() {
              zt = null;
            }
          };
        },
        state: {
          init(n, o) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: rr(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, i) {
            return n.getMeta("collapsibleHeading") || n.docChanged ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: rr(i.doc, e, t),
              docVersion: o.docVersion + 1
            } : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = ks.getState(n);
            return o?.decorations ? o.decorations : rr(n.doc, e, t);
          }
        }
      })
    ];
  }
}), vg = /\[([^\]]+)\]\(([^)]+)\)$/, wg = /^(https?:\/\/|www\.)[^\s]+$/i, Ng = Qe.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new bt({
        find: vg,
        handler: ({ state: e, range: t, match: n, chain: o }) => {
          const r = n[1];
          let i = n[2];
          i && !i.startsWith("http://") && !i.startsWith("https://") && (i.startsWith("www."), i = "https://" + i), o().deleteRange(t).insertContent({
            type: "text",
            text: r,
            marks: [
              {
                type: "link",
                attrs: {
                  href: i,
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
      new Ze({
        key: new Ye("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain");
            if (!r) return !1;
            const i = r.trim();
            if (!wg.test(i)) return !1;
            const { state: s } = t, { selection: a } = s, { from: l, to: u, empty: d } = a;
            let m = i;
            if (!m.startsWith("http://") && !m.startsWith("https://") && (m.startsWith("www."), m = "https://" + m), !d && s.doc.textBetween(l, u))
              return e.chain().focus().extendMarkRange("link").setLink({ href: m }).run(), !0;
            const h = s.schema.marks.link.create({ href: m }), f = s.tr;
            return f.insertText(m, l, u), f.addMark(l, l + m.length, h), t.dispatch(f), !0;
          }
        }
      })
    ];
  }
}), kg = ["info", "warning", "error", "success", "note"], xg = Qe.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ze({
        key: new Ye("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: o } = t, { selection: r, doc: i } = o, { $from: s } = r, a = s.start();
            s.end();
            const l = i.textBetween(a, s.pos, ""), u = l.trim();
            for (const d of kg)
              if (u === `\`\`\`${d}`) {
                n.preventDefault();
                const m = o.tr, h = a + l.indexOf("```");
                m.delete(h, s.pos);
                const f = e.schema.nodes.callout, p = e.schema.nodes.paragraph;
                if (f && p) {
                  const b = p.create(), v = f.create({ type: d }, Ku.from(b));
                  m.insert(h, v);
                  const g = m.doc.resolve(h + 2);
                  m.setSelection(_s.near(g)), t.dispatch(m);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Wn = new Ye("searchHighlight"), yg = Qe.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: o }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, o && o(n.setMeta(Wn, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Wn, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ze({
        key: Wn,
        state: {
          init() {
            return Te.empty;
          },
          apply(t, n, o, r) {
            const { searchTerm: i, caseSensitive: s, useRegex: a, currentMatchIndex: l } = e, u = t.getMeta(Wn), d = t.docChanged;
            if (!i)
              return Te.empty;
            if (!d && !u)
              return n.map(t.mapping, r.doc);
            const m = [];
            let h = 0;
            try {
              let f;
              if (a)
                f = new RegExp(i, s ? "g" : "gi");
              else {
                const p = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                f = new RegExp(p, s ? "g" : "gi");
              }
              r.doc.descendants((p, b) => {
                if (p.isText && p.text) {
                  let v;
                  for (; (v = f.exec(p.text)) !== null; ) {
                    const g = b + v.index, N = b + v.index + v[0].length, x = h === l;
                    m.push(
                      lt.inline(g, N, {
                        class: x ? "search-highlight-current" : "search-highlight"
                      })
                    ), h++;
                  }
                }
                return !0;
              });
            } catch {
              return Te.empty;
            }
            return Te.create(r.doc, m);
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
}), Cg = Qe.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      Gu({
        Tab: (t, n) => {
          const { $from: o } = t.selection;
          let r = !1, i = !1;
          for (let s = o.depth; s >= 0; s--) {
            const a = o.node(s);
            if (a.type.name === "taskList") {
              r = !0, i = !0;
              break;
            }
            if (a.type.name === "bulletList" || a.type.name === "orderedList") {
              r = !0;
              break;
            }
          }
          return r && (i ? e.chain().focus().sinkListItem("taskItem").run() : e.chain().focus().sinkListItem("listItem").run()), !0;
        },
        "Shift-Tab": (t, n) => {
          const { $from: o } = t.selection;
          let r = !1, i = !1;
          for (let s = o.depth; s >= 0; s--) {
            const a = o.node(s);
            if (a.type.name === "taskList") {
              r = !0, i = !0;
              break;
            }
            if (a.type.name === "bulletList" || a.type.name === "orderedList") {
              r = !0;
              break;
            }
          }
          return r && (i ? e.chain().focus().liftListItem("taskItem").run() : e.chain().focus().liftListItem("listItem").run()), !0;
        }
      })
    ];
  }
}), pe = new Ye("selectAllOccurrences");
function xs(e, t, n, o, r) {
  const i = [];
  if (!t) return i;
  let s;
  try {
    if (o)
      s = new RegExp(t, n ? "g" : "gi");
    else {
      let a = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      r && (a = `\\b${a}\\b`), s = new RegExp(a, n ? "g" : "gi");
    }
  } catch {
    return i;
  }
  return e.descendants((a, l) => {
    if (a.isText && a.text) {
      let u;
      for (; (u = s.exec(a.text)) !== null; )
        i.push({
          from: l + u.index,
          to: l + u.index + u[0].length,
          text: u[0]
        });
    }
    return !0;
  }), i;
}
function st(e, t) {
  const n = pe.getState(e.state);
  if (!n) return [];
  const o = [];
  return n.find().forEach((r) => {
    if (r.from === r.to) return;
    const i = e.state.doc.textBetween(r.from, r.to, "");
    o.push({ from: r.from, to: r.to, text: i });
  }), o;
}
function Tg(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function he(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Eg = Qe.create({
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
          caseSensitive: i = !1,
          useRegex: s = !1,
          wholeWord: a = !1
        } = e;
        if (!r) return !1;
        const l = xs(t.state.doc, r, i, s, a);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = r, this.storage.caseSensitive = i, this.storage.useRegex = s, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = r.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], o && o(n.setMeta(pe, { activate: !0 })), !0);
      },
      /**
       * Select the next occurrence incrementally (Cmd+D behavior).
       * First call: selects the word under cursor or current selection.
       * Subsequent calls: add the next match to the selection.
       */
      selectNextOccurrence: () => ({ editor: e, tr: t, dispatch: n }) => {
        const o = this.storage;
        if (!o.isActive) {
          const { state: r } = e, { from: i, to: s } = r.selection;
          let a = "";
          if (i !== s)
            a = r.doc.textBetween(i, s, "");
          else {
            const m = r.doc.resolve(i), h = m.parent;
            if (h.isTextblock) {
              const f = h.textContent, p = m.parentOffset;
              let b = p, v = p;
              for (; b > 0 && /\w/.test(f[b - 1]); ) b--;
              for (; v < f.length && /\w/.test(f[v]); ) v++;
              b < v && (a = f.slice(b, v));
            }
          }
          if (!a) return !1;
          const l = xs(r.doc, a, !1, !1, !1);
          if (l.length === 0) return !1;
          const u = Tg(l, i), d = l[u];
          return o.isActive = !0, o.ranges = [d], o.searchTerm = a, o.caseSensitive = !1, o.useRegex = !1, o.wholeWord = !1, o.typedBuffer = "", o.isTypingReplace = !1, o.originalTermLength = a.length, o.allMatches = l, o.nextMatchIndex = (u + 1) % l.length, o.isIncremental = !0, o.undoStack = [], o.redoStack = [], n && n(t.setMeta(pe, { activate: !0 })), setTimeout(() => {
            try {
              const m = e.view.domAtPos(d.from);
              m.node && m.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0;
        }
        if (o.isIncremental && o.allMatches.length > 0) {
          const r = o.nextMatchIndex, i = o.allMatches[r];
          return o.ranges.some(
            (a) => a.from === i.from && a.to === i.to
          ) ? !1 : (o.ranges = [...o.ranges, i], o.nextMatchIndex = (r + 1) % o.allMatches.length, o.ranges.length >= o.allMatches.length && (o.isIncremental = !1), n && n(t.setMeta(pe, { activate: !0 })), setTimeout(() => {
            try {
              const a = e.view.domAtPos(i.from);
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (he(this.storage), t && t(e.setMeta(pe, { deactivate: !0 })), !0),
      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       * All changes are in a single transaction for proper undo/redo.
       */
      toggleMarkOnAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: o }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        const r = t.schema.marks[e];
        if (!r) return !1;
        const { ranges: i } = this.storage, s = i.every((a) => {
          let l = !0;
          return t.state.doc.nodesBetween(a.from, a.to, (u) => {
            u.isText && !r.isInSet(u.marks) && (l = !1);
          }), l;
        });
        if (o) {
          for (const a of i)
            s ? n.removeMark(a.from, a.to, r) : n.addMark(a.from, a.to, r.create());
          o(n);
        }
        return setTimeout(() => {
          try {
            const a = t.view;
            if (a) {
              const l = st(a, this.storage);
              this.storage.ranges = l, l.length === 0 && he(this.storage);
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
          const o = [...this.storage.ranges].sort((r, i) => i.from - r.from);
          for (const r of o)
            t.delete(r.from, r.to);
          n(t);
        }
        return he(this.storage), !0;
      },
      /**
       * Replace all selected occurrences with new text in a single transaction.
       */
      replaceAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: o }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        if (o) {
          const r = [...this.storage.ranges].sort((i, s) => s.from - i.from);
          for (const i of r)
            n.replaceWith(i.from, i.to, t.schema.text(e));
          o(n);
        }
        return e ? setTimeout(() => {
          try {
            const r = t.view;
            if (r) {
              const i = st(r, this.storage);
              this.storage.ranges = i, this.storage.searchTerm = e, i.length === 0 && he(this.storage);
            }
          } catch {
          }
        }, 10) : he(this.storage), !0;
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
      new Ze({
        key: pe,
        state: {
          init() {
            return Te.empty;
          },
          apply(t, n, o, r) {
            const i = t.getMeta(pe);
            if (i?.deactivate || !e.isActive)
              return Te.empty;
            if (i?.activate || i?.refresh) {
              const s = [];
              for (const a of e.ranges) {
                s.push(
                  lt.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), s.push(
                  lt.widget(a.to, l, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return Te.create(r.doc, s);
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
              he(e);
              const { tr: r } = t.state;
              t.dispatch(r.setMeta(pe, { deactivate: !0 }));
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
              he(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(pe, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const r = e.undoStack.pop();
                return e.typedBuffer = r, r === "" && (e.isTypingReplace = !1), qu(t.state, t.dispatch), setTimeout(() => {
                  const i = st(t);
                  e.ranges = i, i.length === 0 && he(e);
                }, 10), !0;
              }
              he(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(pe, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const r = e.redoStack.pop();
                return e.typedBuffer = r, e.isTypingReplace = !0, Xu(t.state, t.dispatch), setTimeout(() => {
                  const i = st(t);
                  e.ranges = i, i.length === 0 && he(e);
                }, 10), !0;
              }
              he(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(pe, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const o = st(t);
                if (o.length === 0) {
                  he(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(pe, { deactivate: !0 })), !0;
                }
                const r = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, i = [...o].sort((a, l) => l.from - a.from), { tr: s } = t.state;
                for (const a of i)
                  s.replaceWith(a.from, a.to, t.state.schema.text(r));
                t.dispatch(s), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = st(t);
                  e.ranges = a, a.length === 0 && he(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const o = [...e.ranges].sort((s, a) => a.from - s.from), { tr: r } = t.state;
                for (const s of o)
                  r.delete(s.from, s.to);
                t.dispatch(r), he(e);
                const { tr: i } = t.state;
                t.dispatch(i.setMeta(pe, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const o = [...e.ranges].sort((s, a) => a.from - s.from), { tr: r } = t.state;
              for (const s of o)
                r.delete(s.from, s.to);
              t.dispatch(r), he(e);
              const { tr: i } = t.state;
              return t.dispatch(i.setMeta(pe, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              he(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(pe, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              he(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(pe, { deactivate: !0 })), !1;
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
            const i = st(t);
            if (i.length === 0) {
              he(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(pe, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += r : (e.isTypingReplace = !0, e.typedBuffer = r);
            const s = [...i].sort((l, u) => u.from - l.from), { tr: a } = t.state;
            for (const l of s)
              a.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const l = st(t);
              e.ranges = l, l.length === 0 && he(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function Sg(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => {
      typeof o.result == "string" ? t(o.result) : n(new Error("Failed to read file"));
    }, o.onerror = () => n(new Error("Failed to read file")), o.readAsDataURL(e);
  });
}
function Rg(e, t) {
  return t.includes(e.type);
}
function Ag(e) {
  return new Promise((t) => {
    const n = new Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function Mg(e, t, n) {
  return new Promise((o, r) => {
    const i = new Image(), s = new FileReader();
    s.onload = (a) => {
      i.src = a.target?.result;
    }, s.onerror = () => r(new Error("Failed to read file")), i.onload = () => {
      let a = i.width, l = i.height;
      if (a > t) {
        const b = t / a;
        a = t, l = Math.round(l * b);
      }
      const u = document.createElement("canvas");
      u.width = a, u.height = l;
      const d = u.getContext("2d");
      if (!d) {
        r(new Error("Failed to get canvas context"));
        return;
      }
      d.imageSmoothingEnabled = !0, d.imageSmoothingQuality = "high", d.drawImage(i, 0, 0, a, l);
      const m = e.type === "image/png" || e.type === "image/gif", h = m ? "image/png" : "image/jpeg", f = m ? void 0 : n, p = u.toDataURL(h, f);
      o({ dataUrl: p, width: a, height: l });
    }, i.onerror = () => r(new Error("Failed to load image")), s.readAsDataURL(e);
  });
}
async function ys(e, t, n) {
  if (!Rg(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), r = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${r}MB. Maximum size: ${o}MB`), !1;
  }
  try {
    n.onUploadStart?.();
    let o, r;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const s = await Mg(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = s.dataUrl, r = Math.min(s.width, 600);
    } else {
      o = await Sg(e);
      const s = await Ag(o);
      r = Math.min(s.width, 600);
    }
    return t.chain().focus().setImage({
      src: o,
      alt: e.name,
      width: r
    }).run(), n.onUploadComplete?.(), !0;
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function Cs(e) {
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
const Pg = Qe.create({
  name: "imageUpload",
  addOptions() {
    return {
      maxFileSize: 5 * 1024 * 1024,
      // 5MB default
      allowedMimeTypes: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml"
      ],
      enableCompression: !0,
      // Enable compression by default
      maxCompressedWidth: 1200,
      // Max width for compressed images
      compressionQuality: 0.8,
      // JPEG quality (0-1)
      onUploadStart: void 0,
      onUploadComplete: void 0,
      onUploadError: void 0
    };
  },
  addProseMirrorPlugins() {
    const e = this.options, t = this.editor;
    return [
      new Ze({
        key: new Ye("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, o) {
            const r = o.clipboardData;
            if (!r) return !1;
            const i = Cs(r);
            return i.length === 0 ? !1 : (o.preventDefault(), i.forEach((s) => {
              ys(s, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, o, r, i) {
            if (i) return !1;
            const s = o.dataTransfer;
            if (!s) return !1;
            const a = Cs(s);
            if (a.length === 0)
              return !1;
            o.preventDefault();
            const l = n.posAtCoords({
              left: o.clientX,
              top: o.clientY
            });
            if (l) {
              const u = n.state.tr.setSelection(
                _s.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(u);
            }
            return a.forEach((u) => {
              ys(u, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function Lg({ containerRef: e, enabled: t = !0 }) {
  const [n, o] = B(!1), [r, i] = B(0), s = H((d) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer?.types.includes("Files") && (i((m) => m + 1), o(!0));
  }, []), a = H((d) => {
    d.preventDefault(), d.stopPropagation(), i((m) => {
      const h = m - 1;
      return h === 0 && o(!1), h;
    });
  }, []), l = H((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), u = H((d) => {
    d.preventDefault(), d.stopPropagation(), o(!1), i(0);
  }, []);
  return Q(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", s), d.addEventListener("dragleave", a), d.addEventListener("dragover", l), d.addEventListener("drop", u), () => {
      d.removeEventListener("dragenter", s), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", l), d.removeEventListener("drop", u);
    };
  }, [t, e, s, a, l, u]), n ? /* @__PURE__ */ c("div", { className: "image-drop-zone", children: /* @__PURE__ */ c("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ c("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ c(Pu, { className: "w-12 h-12" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 84,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ c("span", { className: "image-drop-zone-title", children: "Drop image here" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" }, void 0, !1, {
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
function Ig({
  src: e,
  alt: t,
  position: n,
  onSave: o,
  onDelete: r,
  onClose: i
}) {
  const [s, a] = B(e), [l, u] = B(t), d = Y(null), m = Y(null);
  Q(() => {
    m.current?.focus(), m.current?.select();
  }, []), Q(() => {
    const b = (g) => {
      d.current && !d.current.contains(g.target) && i();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", b);
    };
  }, [i]), Q(() => {
    const b = (v) => {
      v.key === "Escape" ? i() : v.key === "Enter" && (v.metaKey || v.ctrlKey) && h();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [s, l, i]);
  const h = () => {
    s.trim() && o(s.trim(), l.trim());
  }, p = (() => {
    let N = n.x, x = n.y + 10;
    return N + 320 > window.innerWidth - 16 && (N = window.innerWidth - 320 - 16), N < 16 && (N = 16), x + 200 > window.innerHeight - 16 && (x = n.y - 200 - 10), { left: N, top: x };
  })();
  return /* @__PURE__ */ c(
    "div",
    {
      ref: d,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: p.left,
        top: p.top,
        zIndex: 1e3
      },
      children: [
        /* @__PURE__ */ c("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ c("span", { className: "image-edit-popover-title", children: "Edit Image" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 135,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: i,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ c(Nt, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 141,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 136,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 134,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ c("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ c("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ c("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ c(Jn, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 150,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ c("span", { children: "Image URL" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 151,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 149,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ c(
              "input",
              {
                ref: m,
                type: "text",
                value: s,
                onChange: (b) => a(b.target.value),
                placeholder: "https://example.com/image.jpg",
                className: "image-edit-popover-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 153,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 148,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ c("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ c("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ c(gn, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 166,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ c("span", { children: "Alt Text" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 167,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 165,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ c(
              "input",
              {
                type: "text",
                value: l,
                onChange: (b) => u(b.target.value),
                placeholder: "Describe the image...",
                className: "image-edit-popover-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 169,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 164,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ c("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ c(
            "button",
            {
              onClick: r,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ c(sn, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 186,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 181,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ c("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ c(
              "button",
              {
                onClick: i,
                className: "image-edit-popover-btn image-edit-popover-btn-cancel",
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 189,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ c(
              "button",
              {
                onClick: h,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !s.trim(),
                children: [
                  /* @__PURE__ */ c(Co, { className: "w-4 h-4" }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                    lineNumber: 200,
                    columnNumber: 13
                  }, this),
                  "Save"
                ]
              },
              void 0,
              !0,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 195,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 188,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 180,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
      lineNumber: 123,
      columnNumber: 5
    },
    this
  );
}
function Dg(e) {
  const t = [], n = e.split(`
`);
  let o = 0, r = !1, i = "";
  for (let s = 0; s < n.length; s++) {
    const a = n[s], l = o;
    if (a.startsWith("```")) {
      r ? (r = !1, t.push({
        type: "code-block",
        content: a,
        start: l,
        end: l + a.length
      })) : (r = !0, i = a.slice(3).trim(), t.push({
        type: "code-block",
        content: "```",
        start: l,
        end: l + 3
      }), i && t.push({
        type: "code-block-lang",
        content: i,
        start: l + 3,
        end: l + 3 + i.length
      })), o += a.length + 1;
      continue;
    }
    if (r) {
      t.push({
        type: "code-block",
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    const u = a.match(/^(#{1,6})\s+(.*)$/);
    if (u) {
      const N = u[1].length;
      t.push({
        type: `heading${N}`,
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(a.trim())) {
      t.push({
        type: "horizontal-rule",
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    if (a.startsWith(">")) {
      t.push({
        type: "blockquote",
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    if (/^\|?[\s-:|]+\|?$/.test(a) && a.includes("-")) {
      t.push({
        type: "table-separator",
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    if (a.includes("|") && (a.startsWith("|") || a.trim().includes(" | "))) {
      t.push({
        type: "table-cell",
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    const d = a.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (d) {
      const N = d[2].toLowerCase() === "x";
      t.push({
        type: N ? "task-checked" : "task-list",
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    if (a.match(/^(\s*[-*+])\s+(.*)$/)) {
      t.push({
        type: "list-bullet",
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    if (a.match(/^(\s*\d+\.)\s+(.*)$/)) {
      t.push({
        type: "list-number",
        content: a,
        start: l,
        end: l + a.length
      }), o += a.length + 1;
      continue;
    }
    let f = 0;
    const p = [
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
    ], b = [];
    for (const N of p) {
      let x;
      for (N.regex.lastIndex = 0; (x = N.regex.exec(a)) !== null; )
        b.push({
          start: l + x.index,
          end: l + x.index + x[0].length,
          type: N.type,
          content: x[0]
        });
    }
    b.sort((N, x) => N.start - x.start);
    const v = [];
    let g = l;
    for (const N of b)
      N.start >= g && (v.push(N), g = N.end);
    for (const N of v)
      N.start > l + f && t.push({
        type: "text",
        content: a.substring(f, N.start - l),
        start: l + f,
        end: N.start
      }), t.push({
        type: N.type,
        content: N.content,
        start: N.start,
        end: N.end
      }), f = N.end - l;
    f < a.length && t.push({
      type: "text",
      content: a.substring(f),
      start: l + f,
      end: l + a.length
    }), v.length === 0 && a.length > 0 && t.push({
      type: "text",
      content: a,
      start: l,
      end: l + a.length
    }), o += a.length + 1;
  }
  return t;
}
function Og(e) {
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
    text: "md-text"
  }[e] || "md-text";
}
function nn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function $g(e, t) {
  if (t.length === 0)
    return nn(e);
  let n = "";
  const o = e.split(`
`);
  let r = 0;
  for (let i = 0; i < o.length; i++) {
    const s = o[i], a = r + s.length, l = t.filter((d) => d.start >= r && d.start < a);
    let u = r;
    for (const d of l)
      d.start > u && (n += nn(e.substring(u, d.start))), n += `<span class="${Og(d.type)}">${nn(d.content)}</span>`, u = d.end;
    u < a && (n += nn(e.substring(u, a))), i < o.length - 1 && (n += `
`), r = a + 1;
  }
  return n;
}
function Bg({
  content: e,
  onChange: t,
  placeholder: n = "Write your markdown here...",
  editable: o = !0,
  autofocus: r = !1,
  className: i = ""
}) {
  const s = Y(null), a = Y(null), l = Y(null), u = lr(() => {
    const f = Dg(e);
    return $g(e, f);
  }, [e]), d = H(() => {
    const f = s.current, p = a.current;
    if (f) {
      f.style.height = "auto";
      const b = Math.max(f.scrollHeight, 200);
      f.style.height = `${b}px`, p && (p.style.height = `${b}px`);
    }
  }, []), m = H(() => {
    const f = s.current, p = a.current;
    f && p && (p.scrollTop = f.scrollTop, p.scrollLeft = f.scrollLeft);
  }, []);
  Q(() => {
    d();
  }, [e, d]), Q(() => {
    r && s.current && s.current.focus();
  }, [r]);
  const h = H((f) => {
    if (f.key === "Tab") {
      f.preventDefault();
      const p = f.currentTarget, b = p.selectionStart, v = p.selectionEnd, g = p.value;
      if (f.shiftKey) {
        const N = g.substring(0, b), x = g.substring(b, v), y = g.substring(v), S = N.lastIndexOf(`
`) + 1, T = N.substring(0, S), C = N.substring(S), L = (C + x).split(`
`), O = L.map((W) => W.startsWith("  ") ? W.substring(2) : W.startsWith("	") ? W.substring(1) : W), V = T + O.join(`
`) + y;
        t(V), setTimeout(() => {
          const W = (C + x).length - O.join(`
`).length;
          p.selectionStart = Math.max(S, b - (L[0].length - O[0].length)), p.selectionEnd = v - W;
        }, 0);
      } else if (b === v) {
        const N = g.substring(0, b) + "  " + g.substring(v);
        t(N), setTimeout(() => {
          p.selectionStart = p.selectionEnd = b + 2;
        }, 0);
      } else {
        const N = g.substring(0, b), x = g.substring(b, v), y = g.substring(v), S = N.lastIndexOf(`
`) + 1, T = N.substring(0, S), L = (N.substring(S) + x).split(`
`), O = L.map((W) => "  " + W), V = T + O.join(`
`) + y;
        t(V), setTimeout(() => {
          p.selectionStart = b + 2, p.selectionEnd = v + L.length * 2;
        }, 0);
      }
    }
  }, [t]);
  return /* @__PURE__ */ c("div", { ref: l, className: `syntax-highlighted-editor ${i}`, children: [
    /* @__PURE__ */ c(
      "div",
      {
        ref: a,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: u || `<span class="md-placeholder">${nn(n)}</span>` },
        "aria-hidden": "true"
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 502,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ c(
      "textarea",
      {
        ref: s,
        value: e,
        onChange: (f) => t(f.target.value),
        onKeyDown: h,
        onScroll: m,
        placeholder: "",
        disabled: !o,
        className: "syntax-textarea",
        spellCheck: !1
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 508,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
    lineNumber: 501,
    columnNumber: 5
  }, this);
}
let Ts = 0, Tr = 0, Xl = 0;
function zg(e) {
  Tr++, Xl = e;
}
const _g = bn(function({
  visible: t,
  onClose: n,
  editor: o
}) {
  const [r, i] = B(!1), [s, a] = B({
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
  }), l = Y([]), u = Y(performance.now()), d = Y(0), m = Y(0), h = Y(0), f = Y(0), [p, b] = B(new Array(60).fill(0)), [v, g] = B(new Array(60).fill(0));
  Q(() => {
    if (!t || !o) return;
    const T = () => {
      const C = performance.now();
      queueMicrotask(() => {
        const L = performance.now() - C;
        zg(L);
      });
    };
    return o.on("transaction", T), () => {
      o.off("transaction", T);
    };
  }, [t, o]), Q(() => {
    if (!t) return;
    let T = 0, C = performance.now(), L = 0;
    const O = (V) => {
      const W = V - u.current;
      if (u.current = V, l.current.push({ time: V, duration: W }), l.current.length > 120 && (l.current = l.current.slice(-120)), W > 16.67 && m.current++, T++, V - C >= 1e3) {
        L = T, T = 0, C = V;
        const U = l.current.slice(-60), K = U.length > 0 ? U.reduce((j, q) => j + q.duration, 0) / U.length : 0, J = U.length > 0 ? Math.max(...U.map((j) => j.duration)) : 0, F = performance.memory, G = F ? F.usedJSHeapSize / (1024 * 1024) : 0, A = F ? F.jsHeapSizeLimit / (1024 * 1024) : 0, $ = document.querySelectorAll("*").length, E = Ts - h.current, D = Tr - f.current;
        h.current = Ts, f.current = Tr, a({
          fps: L,
          frameTime: Math.round(K * 100) / 100,
          frameTimeMax: Math.round(J * 100) / 100,
          memoryUsed: Math.round(G * 10) / 10,
          memoryTotal: Math.round(A),
          renderCount: E,
          transactionCount: D,
          lastTransactionTime: Math.round(Xl * 100) / 100,
          domNodes: $,
          longFrames: m.current
        }), b((j) => [...j.slice(1), L]), g((j) => [...j.slice(1), K]), m.current = 0;
      }
      d.current = requestAnimationFrame(O);
    };
    return d.current = requestAnimationFrame(O), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const N = H(() => {
    n?.();
  }, [n]), x = H(() => {
    i((T) => !T);
  }, []);
  if (!t) return null;
  const y = (T) => T >= 55 ? "#4ade80" : T >= 30 ? "#fbbf24" : "#f87171", k = (T) => T <= 16.67 ? "#4ade80" : T <= 33.33 ? "#fbbf24" : "#f87171", S = (T, C, L) => {
    const W = T.map((U, K) => {
      const J = K / (T.length - 1) * 120, F = 24 - Math.min(U, C) / C * 24;
      return `${J},${F}`;
    }).join(" ");
    return /* @__PURE__ */ c("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ c(
      "polyline",
      {
        points: W,
        fill: "none",
        stroke: L,
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
  return /* @__PURE__ */ c("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ c("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ c("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ c(Lu, { size: 14 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 241,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c("span", { children: "Performance" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 242,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ c("button", { onClick: x, title: r ? "Expand" : "Minimize", children: r ? /* @__PURE__ */ c(Iu, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 28
        }, this) : /* @__PURE__ */ c(Du, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 54
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 245,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c("button", { onClick: N, title: "Close profiler", children: /* @__PURE__ */ c(Nt, { size: 12 }, void 0, !1, {
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
    !r && /* @__PURE__ */ c("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ c("div", { className: "perf-section", children: [
        /* @__PURE__ */ c("div", { className: "perf-row", children: [
          /* @__PURE__ */ c("span", { className: "perf-label", children: "FPS" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 259,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value", style: { color: y(s.fps) }, children: s.fps }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 260,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        S(p, 70, y(s.fps))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 257,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c("div", { className: "perf-section", children: [
        /* @__PURE__ */ c("div", { className: "perf-row", children: [
          /* @__PURE__ */ c("span", { className: "perf-label", children: "Frame Time" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 270,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value", style: { color: k(s.frameTime) }, children: [
            s.frameTime,
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
        /* @__PURE__ */ c("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ c("span", { className: "perf-label-sub", children: "Max" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value-sub", style: { color: k(s.frameTimeMax) }, children: [
            s.frameTimeMax,
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
        /* @__PURE__ */ c("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ c("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 282,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value-sub", style: { color: s.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            s.longFrames,
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
        S(v, 50, k(s.frameTime))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 268,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c("div", { className: "perf-section", children: [
        /* @__PURE__ */ c("div", { className: "perf-row", children: [
          /* @__PURE__ */ c("span", { className: "perf-label", children: "Renders/s" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 293,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value", children: s.renderCount }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 294,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 292,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c("div", { className: "perf-row", children: [
          /* @__PURE__ */ c("span", { className: "perf-label", children: "Transactions/s" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 297,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value", children: s.transactionCount }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 298,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 296,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ c("span", { className: "perf-label-sub", children: "Last TX time" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 301,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value-sub", children: [
            s.lastTransactionTime,
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
      /* @__PURE__ */ c("div", { className: "perf-section", children: [
        /* @__PURE__ */ c("div", { className: "perf-row", children: [
          /* @__PURE__ */ c("span", { className: "perf-label", children: "DOM Nodes" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 309,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value", children: s.domNodes.toLocaleString() }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 310,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 308,
          columnNumber: 13
        }, this),
        s.memoryTotal > 0 && /* @__PURE__ */ c("div", { className: "perf-row", children: [
          /* @__PURE__ */ c("span", { className: "perf-label", children: "Memory" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c("span", { className: "perf-value", children: [
            s.memoryUsed,
            "MB / ",
            s.memoryTotal,
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
function Hg(e, t, n) {
  const o = [];
  return e.state.doc.descendants((i, s) => {
    if (i.type.name === "heading") {
      const a = i.attrs.level;
      if (a >= t && a <= n) {
        const l = i.textContent;
        l.trim() && o.push({ id: `toc-heading-${s}`, text: l.trim(), level: a, pos: s });
      }
    }
  }), o;
}
function Fg(e) {
  if (e.length === 0) return [];
  const t = [], n = [];
  for (const o of e) {
    const r = { ...o, children: [] };
    for (; n.length > 0 && n[n.length - 1].level >= o.level; )
      n.pop();
    if (n.length === 0)
      t.push(r);
    else {
      const i = n[n.length - 1].item;
      i.children || (i.children = []), i.children.push(r);
    }
    n.push({ item: r, level: o.level });
  }
  return t;
}
function Es(e, t) {
  try {
    const n = e.state.doc.resolve(t), o = e.view.nodeDOM(n.before(n.depth + 1));
    if (o instanceof HTMLElement) return o;
    const r = e.view.nodeDOM(t);
    if (r instanceof HTMLElement) return r;
  } catch {
  }
  return null;
}
const Ss = bn(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: o,
  title: r = "",
  minLevel: i = 1,
  maxLevel: s = 4,
  showLevelIndicators: a = !1,
  highlightActive: l = !0,
  treeView: u = !1,
  className: d = "",
  width: m = "220px",
  position: h = "right",
  scrollOffset: f = 20,
  onItemClick: p,
  renderItem: b,
  showToggleButton: v = !0,
  scrollContainerRef: g
}) {
  const [N, x] = B([]), [y, k] = B(null), [S, T] = B(n), [C, L] = B(/* @__PURE__ */ new Set()), O = Y(null), V = Y(null);
  Q(() => {
    T(n);
  }, [n]);
  const W = H(() => {
    if (!t || t.isDestroyed) return;
    const E = Hg(t, i, s);
    x(E), y && !E.find((D) => D.id === y) && k(null);
  }, [t, i, s, y]);
  Q(() => {
    if (!t) return;
    const E = () => {
      V.current && clearTimeout(V.current), V.current = setTimeout(() => W(), 300);
    };
    return W(), t.on("update", E), t.on("create", E), () => {
      t.off("update", E), t.off("create", E), V.current && clearTimeout(V.current);
    };
  }, [t, W]), Q(() => {
    if (!t || !l || !S || N.length === 0) return;
    const E = g?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!E) return;
    const D = () => {
      const se = E.getBoundingClientRect();
      let ue = null;
      for (let de = N.length - 1; de >= 0; de--) {
        const X = N[de], xe = Es(t, X.pos);
        if (xe && xe.getBoundingClientRect().top - se.top <= f + 10) {
          ue = X.id;
          break;
        }
      }
      !ue && N.length > 0 && (ue = N[0].id), k(ue);
    };
    let j;
    const q = () => {
      cancelAnimationFrame(j), j = requestAnimationFrame(D);
    };
    return E.addEventListener("scroll", q, { passive: !0 }), D(), () => {
      E.removeEventListener("scroll", q), cancelAnimationFrame(j);
    };
  }, [t, N, l, S, f, g]);
  const U = H((E) => {
    if (!t || t.isDestroyed) return;
    const D = Es(t, E.pos);
    if (D) {
      const j = g?.current || t.view.dom.closest(".editor-content-wrapper");
      if (j) {
        const q = j.getBoundingClientRect(), ue = D.getBoundingClientRect().top - q.top + j.scrollTop;
        j.scrollTo({ top: ue - f, behavior: "smooth" });
      } else
        D.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(E.pos + 1);
    } catch {
    }
    k(E.id), p?.(E);
  }, [t, f, p, g]), K = H(() => {
    const E = !S;
    T(E), o?.(E);
  }, [S, o]), J = H((E) => {
    L((D) => {
      const j = new Set(D);
      return j.has(E) ? j.delete(E) : j.add(E), j;
    });
  }, []), F = H((E, D, j = 0) => {
    if (b)
      return b(E, D, () => U(E));
    const q = (E.level - i) * 14, se = u && E.children && E.children.length > 0, ue = C.has(E.id);
    return /* @__PURE__ */ c(
      "div",
      {
        className: `toc-item ${D ? "toc-item-active" : ""} toc-level-${E.level}`,
        style: { paddingLeft: `${q + 10}px` },
        children: /* @__PURE__ */ c(
          "button",
          {
            className: "toc-item-button",
            onClick: () => U(E),
            title: E.text,
            children: [
              se && /* @__PURE__ */ c(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (de) => {
                    de.stopPropagation(), J(E.id);
                  },
                  children: /* @__PURE__ */ c("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: ue ? /* @__PURE__ */ c("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 257,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ c("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 258,
                    columnNumber: 21
                  }, this) }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 255,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 248,
                  columnNumber: 13
                },
                this
              ),
              a && /* @__PURE__ */ c("span", { className: "toc-level-indicator", children: [
                "H",
                E.level
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 264,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ c("span", { className: "toc-item-text", children: E.text }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 266,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 242,
            columnNumber: 9
          },
          this
        )
      },
      E.id,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 237,
        columnNumber: 7
      },
      this
    );
  }, [b, U, u, i, a, C, J]), G = H((E, D = 0) => E.map((j) => {
    const q = y === j.id, se = C.has(j.id), ue = j.children && j.children.length > 0;
    return /* @__PURE__ */ c("div", { children: [
      F(j, q, D),
      ue && !se && /* @__PURE__ */ c("div", { className: "toc-children", children: G(j.children, D + 1) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 281,
        columnNumber: 13
      }, this)
    ] }, j.id, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 278,
      columnNumber: 9
    }, this);
  }), [y, C, F]), A = H(() => N.map((E) => {
    const D = y === E.id;
    return F(E, D);
  }), [N, y, F]);
  if (!t) return null;
  const $ = u ? Fg(N) : [];
  return /* @__PURE__ */ c(Ae, { children: [
    v && /* @__PURE__ */ c(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${h}`,
        onClick: K,
        title: S ? "Hide Table of Contents" : "Show Table of Contents",
        children: S ? /* @__PURE__ */ c(Ou, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 310,
          columnNumber: 24
        }, this) : /* @__PURE__ */ c($u, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 310,
          columnNumber: 56
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 305,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ c(
      "div",
      {
        ref: O,
        className: `toc-sidebar ${S ? "toc-visible" : "toc-hidden"} toc-${h} ${d}`,
        style: { width: S ? m : "0px" },
        children: /* @__PURE__ */ c("div", { className: "toc-inner", children: [
          r && /* @__PURE__ */ c("div", { className: "toc-header", children: /* @__PURE__ */ c("span", { className: "toc-title", children: r }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 324,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 323,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c("div", { className: "toc-content", children: N.length === 0 ? /* @__PURE__ */ c("div", { className: "toc-empty", children: [
            /* @__PURE__ */ c("p", { children: "No headings yet" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 332,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ c("p", { className: "toc-empty-hint", children: "Add headings to see the outline." }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 333,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 331,
            columnNumber: 15
          }, this) : /* @__PURE__ */ c("div", { className: "toc-list", children: u ? G($) : A() }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 336,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 329,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 320,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 315,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
    lineNumber: 302,
    columnNumber: 5
  }, this);
});
function Wg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var o in n)
      n.hasOwnProperty(o) && (e[o] = n[o]);
  }
  return e;
}
function Er(e, t) {
  return Array(t + 1).join(e);
}
function Yl(e) {
  return e.replace(/^\n*/, "");
}
function Zl(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function Ql(e) {
  return Zl(Yl(e));
}
var Ug = [
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
function li(e) {
  return ci(e, Ug);
}
var Jl = [
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
function ec(e) {
  return ci(e, Jl);
}
function Vg(e) {
  return nc(e, Jl);
}
var tc = [
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
function jg(e) {
  return ci(e, tc);
}
function Kg(e) {
  return nc(e, tc);
}
function ci(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function nc(e, t) {
  return e.getElementsByTagName && t.some(function(n) {
    return e.getElementsByTagName(n).length;
  });
}
var Ne = {};
Ne.paragraph = {
  filter: "p",
  replacement: function(e) {
    return `

` + e + `

`;
  }
};
Ne.lineBreak = {
  filter: "br",
  replacement: function(e, t, n) {
    return n.br + `
`;
  }
};
Ne.heading = {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: function(e, t, n) {
    var o = Number(t.nodeName.charAt(1));
    if (n.headingStyle === "setext" && o < 3) {
      var r = Er(o === 1 ? "=" : "-", e.length);
      return `

` + e + `
` + r + `

`;
    } else
      return `

` + Er("#", o) + " " + e + `

`;
  }
};
Ne.blockquote = {
  filter: "blockquote",
  replacement: function(e) {
    return e = Ql(e).replace(/^/gm, "> "), `

` + e + `

`;
  }
};
Ne.list = {
  filter: ["ul", "ol"],
  replacement: function(e, t) {
    var n = t.parentNode;
    return n.nodeName === "LI" && n.lastElementChild === t ? `
` + e : `

` + e + `

`;
  }
};
Ne.listItem = {
  filter: "li",
  replacement: function(e, t, n) {
    var o = n.bulletListMarker + "   ", r = t.parentNode;
    if (r.nodeName === "OL") {
      var i = r.getAttribute("start"), s = Array.prototype.indexOf.call(r.children, t);
      o = (i ? Number(i) + s : s + 1) + ".  ";
    }
    var a = /\n$/.test(e);
    return e = Ql(e) + (a ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(o.length)), o + e + (t.nextSibling ? `
` : "");
  }
};
Ne.indentedCodeBlock = {
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
Ne.fencedCodeBlock = {
  filter: function(e, t) {
    return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
  },
  replacement: function(e, t, n) {
    for (var o = t.firstChild.getAttribute("class") || "", r = (o.match(/language-(\S+)/) || [null, ""])[1], i = t.firstChild.textContent, s = n.fence.charAt(0), a = 3, l = new RegExp("^" + s + "{3,}", "gm"), u; u = l.exec(i); )
      u[0].length >= a && (a = u[0].length + 1);
    var d = Er(s, a);
    return `

` + d + r + `
` + i.replace(/\n$/, "") + `
` + d + `

`;
  }
};
Ne.horizontalRule = {
  filter: "hr",
  replacement: function(e, t, n) {
    return `

` + n.hr + `

`;
  }
};
Ne.inlineLink = {
  filter: function(e, t) {
    return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t) {
    var n = t.getAttribute("href");
    n && (n = n.replace(/([()])/g, "\\$1"));
    var o = go(t.getAttribute("title"));
    return o && (o = ' "' + o.replace(/"/g, '\\"') + '"'), "[" + e + "](" + n + o + ")";
  }
};
Ne.referenceLink = {
  filter: function(e, t) {
    return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
  },
  replacement: function(e, t, n) {
    var o = t.getAttribute("href"), r = go(t.getAttribute("title"));
    r && (r = ' "' + r + '"');
    var i, s;
    switch (n.linkReferenceStyle) {
      case "collapsed":
        i = "[" + e + "][]", s = "[" + e + "]: " + o + r;
        break;
      case "shortcut":
        i = "[" + e + "]", s = "[" + e + "]: " + o + r;
        break;
      default:
        var a = this.references.length + 1;
        i = "[" + e + "][" + a + "]", s = "[" + a + "]: " + o + r;
    }
    return this.references.push(s), i;
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
Ne.emphasis = {
  filter: ["em", "i"],
  replacement: function(e, t, n) {
    return e.trim() ? n.emDelimiter + e + n.emDelimiter : "";
  }
};
Ne.strong = {
  filter: ["strong", "b"],
  replacement: function(e, t, n) {
    return e.trim() ? n.strongDelimiter + e + n.strongDelimiter : "";
  }
};
Ne.code = {
  filter: function(e) {
    var t = e.previousSibling || e.nextSibling, n = e.parentNode.nodeName === "PRE" && !t;
    return e.nodeName === "CODE" && !n;
  },
  replacement: function(e) {
    if (!e) return "";
    e = e.replace(/\r?\n|\r/g, " ");
    for (var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "", n = "`", o = e.match(/`+/gm) || []; o.indexOf(n) !== -1; ) n = n + "`";
    return n + t + e + t + n;
  }
};
Ne.image = {
  filter: "img",
  replacement: function(e, t) {
    var n = go(t.getAttribute("alt")), o = t.getAttribute("src") || "", r = go(t.getAttribute("title")), i = r ? ' "' + r + '"' : "";
    return o ? "![" + n + "](" + o + i + ")" : "";
  }
};
function go(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function oc(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = {
    replacement: e.blankReplacement
  }, this.keepReplacement = e.keepReplacement, this.defaultRule = {
    replacement: e.defaultReplacement
  }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
oc.prototype = {
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
    return (t = ir(this.array, e, this.options)) || (t = ir(this._keep, e, this.options)) || (t = ir(this._remove, e, this.options)) ? t : this.defaultRule;
  },
  forEach: function(e) {
    for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
  }
};
function ir(e, t, n) {
  for (var o = 0; o < e.length; o++) {
    var r = e[o];
    if (Gg(r, t, n)) return r;
  }
}
function Gg(e, t, n) {
  var o = e.filter;
  if (typeof o == "string") {
    if (o === t.nodeName.toLowerCase()) return !0;
  } else if (Array.isArray(o)) {
    if (o.indexOf(t.nodeName.toLowerCase()) > -1) return !0;
  } else if (typeof o == "function") {
    if (o.call(e, t, n)) return !0;
  } else
    throw new TypeError("`filter` needs to be a string, array, or function");
}
function qg(e) {
  var t = e.element, n = e.isBlock, o = e.isVoid, r = e.isPre || function(m) {
    return m.nodeName === "PRE";
  };
  if (!(!t.firstChild || r(t))) {
    for (var i = null, s = !1, a = null, l = Rs(a, t, r); l !== t; ) {
      if (l.nodeType === 3 || l.nodeType === 4) {
        var u = l.data.replace(/[ \r\n\t]+/g, " ");
        if ((!i || / $/.test(i.data)) && !s && u[0] === " " && (u = u.substr(1)), !u) {
          l = sr(l);
          continue;
        }
        l.data = u, i = l;
      } else if (l.nodeType === 1)
        n(l) || l.nodeName === "BR" ? (i && (i.data = i.data.replace(/ $/, "")), i = null, s = !1) : o(l) || r(l) ? (i = null, s = !0) : i && (s = !1);
      else {
        l = sr(l);
        continue;
      }
      var d = Rs(a, l, r);
      a = l, l = d;
    }
    i && (i.data = i.data.replace(/ $/, ""), i.data || sr(i));
  }
}
function sr(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function Rs(e, t, n) {
  return e && e.parentNode === t || n(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var ui = typeof window < "u" ? window : {};
function Xg() {
  var e = ui.DOMParser, t = !1;
  try {
    new e().parseFromString("", "text/html") && (t = !0);
  } catch {
  }
  return t;
}
function Yg() {
  var e = function() {
  };
  return Zg() ? e.prototype.parseFromString = function(t) {
    var n = new window.ActiveXObject("htmlfile");
    return n.designMode = "on", n.open(), n.write(t), n.close(), n;
  } : e.prototype.parseFromString = function(t) {
    var n = document.implementation.createHTMLDocument("");
    return n.open(), n.write(t), n.close(), n;
  }, e;
}
function Zg() {
  var e = !1;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    ui.ActiveXObject && (e = !0);
  }
  return e;
}
var Qg = Xg() ? ui.DOMParser : Yg();
function Jg(e, t) {
  var n;
  if (typeof e == "string") {
    var o = ev().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + e + "</x-turndown>",
      "text/html"
    );
    n = o.getElementById("turndown-root");
  } else
    n = e.cloneNode(!0);
  return qg({
    element: n,
    isBlock: li,
    isVoid: ec,
    isPre: t.preformattedCode ? tv : null
  }), n;
}
var ar;
function ev() {
  return ar = ar || new Qg(), ar;
}
function tv(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function nv(e, t) {
  return e.isBlock = li(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = ov(e), e.flankingWhitespace = rv(e, t), e;
}
function ov(e) {
  return !ec(e) && !jg(e) && /^\s*$/i.test(e.textContent) && !Vg(e) && !Kg(e);
}
function rv(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode)
    return { leading: "", trailing: "" };
  var n = iv(e.textContent);
  return n.leadingAscii && As("left", e, t) && (n.leading = n.leadingNonAscii), n.trailingAscii && As("right", e, t) && (n.trailing = n.trailingNonAscii), { leading: n.leading, trailing: n.trailing };
}
function iv(e) {
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
function As(e, t, n) {
  var o, r, i;
  return e === "left" ? (o = t.previousSibling, r = / $/) : (o = t.nextSibling, r = /^ /), o && (o.nodeType === 3 ? i = r.test(o.nodeValue) : n.preformattedCode && o.nodeName === "CODE" ? i = !1 : o.nodeType === 1 && !li(o) && (i = r.test(o.textContent))), i;
}
var sv = Array.prototype.reduce, av = [
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
    rules: Ne,
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
    blankReplacement: function(n, o) {
      return o.isBlock ? `

` : "";
    },
    keepReplacement: function(n, o) {
      return o.isBlock ? `

` + o.outerHTML + `

` : o.outerHTML;
    },
    defaultReplacement: function(n, o) {
      return o.isBlock ? `

` + n + `

` : n;
    }
  };
  this.options = Wg({}, t, e), this.rules = new oc(this.options);
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
    if (!uv(e))
      throw new TypeError(
        e + " is not a string, or an element/document/fragment node."
      );
    if (e === "") return "";
    var t = rc.call(this, new Jg(e, this.options));
    return lv.call(this, t);
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
    return av.reduce(function(t, n) {
      return t.replace(n[0], n[1]);
    }, e);
  }
};
function rc(e) {
  var t = this;
  return sv.call(e.childNodes, function(n, o) {
    o = new nv(o, t.options);
    var r = "";
    return o.nodeType === 3 ? r = o.isCode ? o.nodeValue : t.escape(o.nodeValue) : o.nodeType === 1 && (r = cv.call(t, o)), ic(n, r);
  }, "");
}
function lv(e) {
  var t = this;
  return this.rules.forEach(function(n) {
    typeof n.append == "function" && (e = ic(e, n.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function cv(e) {
  var t = this.rules.forNode(e), n = rc.call(this, e), o = e.flankingWhitespace;
  return (o.leading || o.trailing) && (n = n.trim()), o.leading + t.replacement(n, e, this.options) + o.trailing;
}
function ic(e, t) {
  var n = Zl(e), o = Yl(t), r = Math.max(e.length - n.length, t.length - o.length), i = `

`.substring(0, r);
  return n + i + o;
}
function uv(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
var Ms = /highlight-(?:text|source)-([a-z0-9]+)/;
function dv(e) {
  e.addRule("highlightedCodeBlock", {
    filter: function(t) {
      var n = t.firstChild;
      return t.nodeName === "DIV" && Ms.test(t.className) && n && n.nodeName === "PRE";
    },
    replacement: function(t, n, o) {
      var r = n.className || "", i = (r.match(Ms) || [null, ""])[1];
      return `

` + o.fence + i + `
` + n.firstChild.textContent + `
` + o.fence + `

`;
    }
  });
}
function mv(e) {
  e.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: function(t) {
      return "~" + t + "~";
    }
  });
}
var fv = Array.prototype.indexOf, hv = Array.prototype.every, Wt = {};
Wt.tableCell = {
  filter: ["th", "td"],
  replacement: function(e, t) {
    return sc(e, t);
  }
};
Wt.tableRow = {
  filter: "tr",
  replacement: function(e, t) {
    var n = "", o = { left: ":--", right: "--:", center: ":-:" };
    if (di(t))
      for (var r = 0; r < t.childNodes.length; r++) {
        var i = "---", s = (t.childNodes[r].getAttribute("align") || "").toLowerCase();
        s && (i = o[s] || i), n += sc(i, t.childNodes[r]);
      }
    return `
` + e + (n ? `
` + n : "");
  }
};
Wt.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function(e) {
    return e.nodeName === "TABLE" && di(e.rows[0]);
  },
  replacement: function(e) {
    return e = e.replace(`

`, `
`), `

` + e + `

`;
  }
};
Wt.tableSection = {
  filter: ["thead", "tbody", "tfoot"],
  replacement: function(e) {
    return e;
  }
};
function di(e) {
  var t = e.parentNode;
  return t.nodeName === "THEAD" || t.firstChild === e && (t.nodeName === "TABLE" || pv(t)) && hv.call(e.childNodes, function(n) {
    return n.nodeName === "TH";
  });
}
function pv(e) {
  var t = e.previousSibling;
  return e.nodeName === "TBODY" && (!t || t.nodeName === "THEAD" && /^\s*$/i.test(t.textContent));
}
function sc(e, t) {
  var n = fv.call(t.parentNode.childNodes, t), o = " ";
  return n === 0 && (o = "| "), o + e + " |";
}
function bv(e) {
  e.keep(function(n) {
    return n.nodeName === "TABLE" && !di(n.rows[0]);
  });
  for (var t in Wt) e.addRule(t, Wt[t]);
}
function gv(e) {
  e.addRule("taskListItems", {
    filter: function(t) {
      return t.type === "checkbox" && t.parentNode.nodeName === "LI";
    },
    replacement: function(t, n) {
      return (n.checked ? "[x]" : "[ ]") + " ";
    }
  });
}
function vv(e) {
  e.use([
    dv,
    mv,
    bv,
    gv
  ]);
}
function mi() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var Ct = mi();
function ac(e) {
  Ct = e;
}
var ln = { exec: () => null };
function re(e, t = "") {
  let n = typeof e == "string" ? e : e.source, o = { replace: (r, i) => {
    let s = typeof i == "string" ? i : i.source;
    return s = s.replace(ke.caret, "$1"), n = n.replace(r, s), o;
  }, getRegex: () => new RegExp(n, t) };
  return o;
}
var wv = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), ke = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`), htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i") }, Nv = /^(?:[ \t]*(?:\n|$))+/, kv = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, xv = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Cn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, yv = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, fi = /(?:[*+-]|\d{1,9}[.)])/, lc = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, cc = re(lc).replace(/bull/g, fi).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Cv = re(lc).replace(/bull/g, fi).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), hi = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Tv = /^[^\n]+/, pi = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Ev = re(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", pi).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Sv = re(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, fi).getRegex(), _o = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", bi = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Rv = re("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", bi).replace("tag", _o).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), uc = re(hi).replace("hr", Cn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _o).getRegex(), Av = re(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", uc).getRegex(), gi = { blockquote: Av, code: kv, def: Ev, fences: xv, heading: yv, hr: Cn, html: Rv, lheading: cc, list: Sv, newline: Nv, paragraph: uc, table: ln, text: Tv }, Ps = re("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Cn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _o).getRegex(), Mv = { ...gi, lheading: Cv, table: Ps, paragraph: re(hi).replace("hr", Cn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ps).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _o).getRegex() }, Pv = { ...gi, html: re(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", bi).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: ln, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: re(hi).replace("hr", Cn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", cc).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Lv = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Iv = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, dc = /^( {2,}|\\)\n(?!\s*$)/, Dv = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Ho = /[\p{P}\p{S}]/u, vi = /[\s\p{P}\p{S}]/u, mc = /[^\s\p{P}\p{S}]/u, Ov = re(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, vi).getRegex(), fc = /(?!~)[\p{P}\p{S}]/u, $v = /(?!~)[\s\p{P}\p{S}]/u, Bv = /(?:[^\s\p{P}\p{S}]|~)/u, zv = re(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", wv ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), hc = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, _v = re(hc, "u").replace(/punct/g, Ho).getRegex(), Hv = re(hc, "u").replace(/punct/g, fc).getRegex(), pc = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Fv = re(pc, "gu").replace(/notPunctSpace/g, mc).replace(/punctSpace/g, vi).replace(/punct/g, Ho).getRegex(), Wv = re(pc, "gu").replace(/notPunctSpace/g, Bv).replace(/punctSpace/g, $v).replace(/punct/g, fc).getRegex(), Uv = re("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, mc).replace(/punctSpace/g, vi).replace(/punct/g, Ho).getRegex(), Vv = re(/\\(punct)/, "gu").replace(/punct/g, Ho).getRegex(), jv = re(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Kv = re(bi).replace("(?:-->|$)", "-->").getRegex(), Gv = re("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Kv).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), wo = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, qv = re(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", wo).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), bc = re(/^!?\[(label)\]\[(ref)\]/).replace("label", wo).replace("ref", pi).getRegex(), gc = re(/^!?\[(ref)\](?:\[\])?/).replace("ref", pi).getRegex(), Xv = re("reflink|nolink(?!\\()", "g").replace("reflink", bc).replace("nolink", gc).getRegex(), Ls = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, wi = { _backpedal: ln, anyPunctuation: Vv, autolink: jv, blockSkip: zv, br: dc, code: Iv, del: ln, emStrongLDelim: _v, emStrongRDelimAst: Fv, emStrongRDelimUnd: Uv, escape: Lv, link: qv, nolink: gc, punctuation: Ov, reflink: bc, reflinkSearch: Xv, tag: Gv, text: Dv, url: ln }, Yv = { ...wi, link: re(/^!?\[(label)\]\((.*?)\)/).replace("label", wo).getRegex(), reflink: re(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", wo).getRegex() }, Sr = { ...wi, emStrongRDelimAst: Wv, emStrongLDelim: Hv, url: re(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Ls).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: re(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Ls).getRegex() }, Zv = { ...Sr, br: re(dc).replace("{2,}", "*").getRegex(), text: re(Sr.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Un = { normal: gi, gfm: Mv, pedantic: Pv }, Qt = { normal: wi, gfm: Sr, breaks: Zv, pedantic: Yv }, Qv = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Is = (e) => Qv[e];
function Ge(e, t) {
  if (t) {
    if (ke.escapeTest.test(e)) return e.replace(ke.escapeReplace, Is);
  } else if (ke.escapeTestNoEncode.test(e)) return e.replace(ke.escapeReplaceNoEncode, Is);
  return e;
}
function Ds(e) {
  try {
    e = encodeURI(e).replace(ke.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Os(e, t) {
  let n = e.replace(ke.findPipe, (i, s, a) => {
    let l = !1, u = s;
    for (; --u >= 0 && a[u] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), o = n.split(ke.splitPipe), r = 0;
  if (o[0].trim() || o.shift(), o.length > 0 && !o.at(-1)?.trim() && o.pop(), t) if (o.length > t) o.splice(t);
  else for (; o.length < t; ) o.push("");
  for (; r < o.length; r++) o[r] = o[r].trim().replace(ke.slashPipe, "|");
  return o;
}
function Jt(e, t, n) {
  let o = e.length;
  if (o === 0) return "";
  let r = 0;
  for (; r < o && e.charAt(o - r - 1) === t; )
    r++;
  return e.slice(0, o - r);
}
function Jv(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let o = 0; o < e.length; o++) if (e[o] === "\\") o++;
  else if (e[o] === t[0]) n++;
  else if (e[o] === t[1] && (n--, n < 0)) return o;
  return n > 0 ? -2 : -1;
}
function $s(e, t, n, o, r) {
  let i = t.href, s = t.title || null, a = e[1].replace(r.other.outputLinkReplace, "$1");
  o.state.inLink = !0;
  let l = { type: e[0].charAt(0) === "!" ? "image" : "link", raw: n, href: i, title: s, text: a, tokens: o.inlineTokens(a) };
  return o.state.inLink = !1, l;
}
function ew(e, t, n) {
  let o = e.match(n.other.indentCodeCompensation);
  if (o === null) return t;
  let r = o[1];
  return t.split(`
`).map((i) => {
    let s = i.match(n.other.beginningSpace);
    if (s === null) return i;
    let [a] = s;
    return a.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var No = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || Ct;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : Jt(n, `
`) };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], o = ew(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: o };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let o = Jt(n, "#");
        (this.options.pedantic || !o || this.rules.other.endingSpaceChar.test(o)) && (n = o.trim());
      }
      return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: Jt(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = Jt(t[0], `
`).split(`
`), o = "", r = "", i = [];
      for (; n.length > 0; ) {
        let s = !1, a = [], l;
        for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) a.push(n[l]), s = !0;
        else if (!s) a.push(n[l]);
        else break;
        n = n.slice(l);
        let u = a.join(`
`), d = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        o = o ? `${o}
${u}` : u, r = r ? `${r}
${d}` : d;
        let m = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(d, i, !0), this.lexer.state.top = m, n.length === 0) break;
        let h = i.at(-1);
        if (h?.type === "code") break;
        if (h?.type === "blockquote") {
          let f = h, p = f.raw + `
` + n.join(`
`), b = this.blockquote(p);
          i[i.length - 1] = b, o = o.substring(0, o.length - f.raw.length) + b.raw, r = r.substring(0, r.length - f.text.length) + b.text;
          break;
        } else if (h?.type === "list") {
          let f = h, p = f.raw + `
` + n.join(`
`), b = this.list(p);
          i[i.length - 1] = b, o = o.substring(0, o.length - h.raw.length) + b.raw, r = r.substring(0, r.length - f.raw.length) + b.raw, n = p.substring(i.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: o, tokens: i, text: r };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim(), o = n.length > 1, r = { type: "list", raw: "", ordered: o, start: o ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = o ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = o ? n : "[*+-]");
      let i = this.rules.other.listItemRegex(n), s = !1;
      for (; e; ) {
        let l = !1, u = "", d = "";
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e)) break;
        u = t[0], e = e.substring(u.length);
        let m = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (b) => " ".repeat(3 * b.length)), h = e.split(`
`, 1)[0], f = !m.trim(), p = 0;
        if (this.options.pedantic ? (p = 2, d = m.trimStart()) : f ? p = t[1].length + 1 : (p = t[2].search(this.rules.other.nonSpaceChar), p = p > 4 ? 1 : p, d = m.slice(p), p += t[1].length), f && this.rules.other.blankLine.test(h) && (u += h + `
`, e = e.substring(h.length + 1), l = !0), !l) {
          let b = this.rules.other.nextBulletRegex(p), v = this.rules.other.hrRegex(p), g = this.rules.other.fencesBeginRegex(p), N = this.rules.other.headingBeginRegex(p), x = this.rules.other.htmlBeginRegex(p);
          for (; e; ) {
            let y = e.split(`
`, 1)[0], k;
            if (h = y, this.options.pedantic ? (h = h.replace(this.rules.other.listReplaceNesting, "  "), k = h) : k = h.replace(this.rules.other.tabCharGlobal, "    "), g.test(h) || N.test(h) || x.test(h) || b.test(h) || v.test(h)) break;
            if (k.search(this.rules.other.nonSpaceChar) >= p || !h.trim()) d += `
` + k.slice(p);
            else {
              if (f || m.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || g.test(m) || N.test(m) || v.test(m)) break;
              d += `
` + h;
            }
            !f && !h.trim() && (f = !0), u += y + `
`, e = e.substring(y.length + 1), m = k.slice(p);
          }
        }
        r.loose || (s ? r.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (s = !0)), r.items.push({ type: "list_item", raw: u, task: !!this.options.gfm && this.rules.other.listIsTask.test(d), loose: !1, text: d, tokens: [] }), r.raw += u;
      }
      let a = r.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else return;
      r.raw = r.raw.trimEnd();
      for (let l of r.items) {
        if (this.lexer.state.top = !1, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
          if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
            l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let d = this.lexer.inlineQueue.length - 1; d >= 0; d--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)) {
              this.lexer.inlineQueue[d].src = this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let u = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (u) {
            let d = { type: "checkbox", raw: u[0] + " ", checked: u[0] !== "[ ]" };
            l.checked = d.checked, r.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = d.raw + l.tokens[0].raw, l.tokens[0].text = d.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(d)) : l.tokens.unshift({ type: "paragraph", raw: d.raw, text: d.raw, tokens: [d] }) : l.tokens.unshift(d);
          }
        }
        if (!r.loose) {
          let u = l.tokens.filter((m) => m.type === "space"), d = u.length > 0 && u.some((m) => this.rules.other.anyLine.test(m.raw));
          r.loose = d;
        }
      }
      if (r.loose) for (let l of r.items) {
        l.loose = !0;
        for (let u of l.tokens) u.type === "text" && (u.type = "paragraph");
      }
      return r;
    }
  }
  html(e) {
    let t = this.rules.block.html.exec(e);
    if (t) return { type: "html", block: !0, raw: t[0], pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: t[0] };
  }
  def(e) {
    let t = this.rules.block.def.exec(e);
    if (t) {
      let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), o = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return { type: "def", tag: n, raw: t[0], href: o, title: r };
    }
  }
  table(e) {
    let t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let n = Os(t[1]), o = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === o.length) {
      for (let s of o) this.rules.other.tableAlignRight.test(s) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(s) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(s) ? i.align.push("left") : i.align.push(null);
      for (let s = 0; s < n.length; s++) i.header.push({ text: n[s], tokens: this.lexer.inline(n[s]), header: !0, align: i.align[s] });
      for (let s of r) i.rows.push(Os(s, i.header.length).map((a, l) => ({ text: a, tokens: this.lexer.inline(a), header: !1, align: i.align[l] })));
      return i;
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
        let i = Jt(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0) return;
      } else {
        let i = Jv(t[2], "()");
        if (i === -2) return;
        if (i > -1) {
          let s = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
          t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, s).trim(), t[3] = "";
        }
      }
      let o = t[2], r = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(o);
        i && (o = i[1], r = i[3]);
      } else r = t[3] ? t[3].slice(1, -1) : "";
      return o = o.trim(), this.rules.other.startAngleBracket.test(o) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? o = o.slice(1) : o = o.slice(1, -1)), $s(t, { href: o && o.replace(this.rules.inline.anyPunctuation, "$1"), title: r && r.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      let o = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = t[o.toLowerCase()];
      if (!r) {
        let i = n[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return $s(n, r, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let o = this.rules.inline.emStrongLDelim.exec(e);
    if (!(!o || o[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(o[1] || o[2]) || !n || this.rules.inline.punctuation.exec(n))) {
      let r = [...o[0]].length - 1, i, s, a = r, l = 0, u = o[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (u.lastIndex = 0, t = t.slice(-1 * e.length + r); (o = u.exec(t)) != null; ) {
        if (i = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !i) continue;
        if (s = [...i].length, o[3] || o[4]) {
          a += s;
          continue;
        } else if ((o[5] || o[6]) && r % 3 && !((r + s) % 3)) {
          l += s;
          continue;
        }
        if (a -= s, a > 0) continue;
        s = Math.min(s, s + a + l);
        let d = [...o[0]][0].length, m = e.slice(0, r + o.index + d + s);
        if (Math.min(r, s) % 2) {
          let f = m.slice(1, -1);
          return { type: "em", raw: m, text: f, tokens: this.lexer.inlineTokens(f) };
        }
        let h = m.slice(2, -2);
        return { type: "strong", raw: m, text: h, tokens: this.lexer.inlineTokens(h) };
      }
    }
  }
  codespan(e) {
    let t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), o = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return o && r && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
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
      let n, o;
      return t[2] === "@" ? (n = t[1], o = "mailto:" + n) : (n = t[1], o = n), { type: "link", raw: t[0], text: n, href: o, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, o;
      if (t[2] === "@") n = t[0], o = "mailto:" + n;
      else {
        let r;
        do
          r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (r !== t[0]);
        n = t[0], t[1] === "www." ? o = "http://" + t[0] : o = t[0];
      }
      return { type: "link", raw: t[0], text: n, href: o, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(e) {
    let t = this.rules.inline.text.exec(e);
    if (t) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: t[0], escaped: n };
    }
  }
}, Se = class Rr {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || Ct, this.options.tokenizer = this.options.tokenizer || new No(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: ke, block: Un.normal, inline: Qt.normal };
    this.options.pedantic ? (n.block = Un.pedantic, n.inline = Qt.pedantic) : this.options.gfm && (n.block = Un.gfm, this.options.breaks ? n.inline = Qt.breaks : n.inline = Qt.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: Un, inline: Qt };
  }
  static lex(t, n) {
    return new Rr(n).lex(t);
  }
  static lexInline(t, n) {
    return new Rr(n).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(ke.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let o = this.inlineQueue[n];
      this.inlineTokens(o.src, o.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], o = !1) {
    for (this.options.pedantic && (t = t.replace(ke.tabCharGlobal, "    ").replace(ke.spaceLine, "")); t; ) {
      let r;
      if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, t, n)) ? (t = t.substring(r.raw.length), n.push(r), !0) : !1)) continue;
      if (r = this.tokenizer.space(t)) {
        t = t.substring(r.raw.length);
        let s = n.at(-1);
        r.raw.length === 1 && s !== void 0 ? s.raw += `
` : n.push(r);
        continue;
      }
      if (r = this.tokenizer.code(t)) {
        t = t.substring(r.raw.length);
        let s = n.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.at(-1).src = s.text) : n.push(r);
        continue;
      }
      if (r = this.tokenizer.fences(t)) {
        t = t.substring(r.raw.length), n.push(r);
        continue;
      }
      if (r = this.tokenizer.heading(t)) {
        t = t.substring(r.raw.length), n.push(r);
        continue;
      }
      if (r = this.tokenizer.hr(t)) {
        t = t.substring(r.raw.length), n.push(r);
        continue;
      }
      if (r = this.tokenizer.blockquote(t)) {
        t = t.substring(r.raw.length), n.push(r);
        continue;
      }
      if (r = this.tokenizer.list(t)) {
        t = t.substring(r.raw.length), n.push(r);
        continue;
      }
      if (r = this.tokenizer.html(t)) {
        t = t.substring(r.raw.length), n.push(r);
        continue;
      }
      if (r = this.tokenizer.def(t)) {
        t = t.substring(r.raw.length);
        let s = n.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, n.push(r));
        continue;
      }
      if (r = this.tokenizer.table(t)) {
        t = t.substring(r.raw.length), n.push(r);
        continue;
      }
      if (r = this.tokenizer.lheading(t)) {
        t = t.substring(r.raw.length), n.push(r);
        continue;
      }
      let i = t;
      if (this.options.extensions?.startBlock) {
        let s = 1 / 0, a = t.slice(1), l;
        this.options.extensions.startBlock.forEach((u) => {
          l = u.call({ lexer: this }, a), typeof l == "number" && l >= 0 && (s = Math.min(s, l));
        }), s < 1 / 0 && s >= 0 && (i = t.substring(0, s + 1));
      }
      if (this.state.top && (r = this.tokenizer.paragraph(i))) {
        let s = n.at(-1);
        o && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : n.push(r), o = i.length !== t.length, t = t.substring(r.raw.length);
        continue;
      }
      if (r = this.tokenizer.text(t)) {
        t = t.substring(r.raw.length);
        let s = n.at(-1);
        s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : n.push(r);
        continue;
      }
      if (t) {
        let s = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(s);
          break;
        } else throw new Error(s);
      }
    }
    return this.state.top = !0, n;
  }
  inline(t, n = []) {
    return this.inlineQueue.push({ src: t, tokens: n }), n;
  }
  inlineTokens(t, n = []) {
    let o = t, r = null;
    if (this.tokens.links) {
      let l = Object.keys(this.tokens.links);
      if (l.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null; ) l.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; ) o = o.slice(0, r.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i;
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; ) i = r[2] ? r[2].length : 0, o = o.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    o = this.options.hooks?.emStrongMask?.call({ lexer: this }, o) ?? o;
    let s = !1, a = "";
    for (; t; ) {
      s || (a = ""), s = !1;
      let l;
      if (this.options.extensions?.inline?.some((d) => (l = d.call({ lexer: this }, t, n)) ? (t = t.substring(l.raw.length), n.push(l), !0) : !1)) continue;
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
        let d = n.at(-1);
        l.type === "text" && d?.type === "text" ? (d.raw += l.raw, d.text += l.text) : n.push(l);
        continue;
      }
      if (l = this.tokenizer.emStrong(t, o, a)) {
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
        let d = 1 / 0, m = t.slice(1), h;
        this.options.extensions.startInline.forEach((f) => {
          h = f.call({ lexer: this }, m), typeof h == "number" && h >= 0 && (d = Math.min(d, h));
        }), d < 1 / 0 && d >= 0 && (u = t.substring(0, d + 1));
      }
      if (l = this.tokenizer.inlineText(u)) {
        t = t.substring(l.raw.length), l.raw.slice(-1) !== "_" && (a = l.raw.slice(-1)), s = !0;
        let d = n.at(-1);
        d?.type === "text" ? (d.raw += l.raw, d.text += l.text) : n.push(l);
        continue;
      }
      if (t) {
        let d = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(d);
          break;
        } else throw new Error(d);
      }
    }
    return n;
  }
}, ko = class {
  options;
  parser;
  constructor(e) {
    this.options = e || Ct;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let o = (t || "").match(ke.notSpaceStart)?.[0], r = e.replace(ke.endingNewline, "") + `
`;
    return o ? '<pre><code class="language-' + Ge(o) + '">' + (n ? r : Ge(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : Ge(r, !0)) + `</code></pre>
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
    let t = e.ordered, n = e.start, o = "";
    for (let s = 0; s < e.items.length; s++) {
      let a = e.items[s];
      o += this.listitem(a);
    }
    let r = t ? "ol" : "ul", i = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + r + i + `>
` + o + "</" + r + `>
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
    for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
    t += this.tablerow({ text: n });
    let o = "";
    for (let r = 0; r < e.rows.length; r++) {
      let i = e.rows[r];
      n = "";
      for (let s = 0; s < i.length; s++) n += this.tablecell(i[s]);
      o += this.tablerow({ text: n });
    }
    return o && (o = `<tbody>${o}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + o + `</table>
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
    return `<code>${Ge(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    let o = this.parser.parseInline(n), r = Ds(e);
    if (r === null) return o;
    e = r;
    let i = '<a href="' + e + '"';
    return t && (i += ' title="' + Ge(t) + '"'), i += ">" + o + "</a>", i;
  }
  image({ href: e, title: t, text: n, tokens: o }) {
    o && (n = this.parser.parseInline(o, this.parser.textRenderer));
    let r = Ds(e);
    if (r === null) return Ge(n);
    e = r;
    let i = `<img src="${e}" alt="${n}"`;
    return t && (i += ` title="${Ge(t)}"`), i += ">", i;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Ge(e.text);
  }
}, Ni = class {
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
}, Re = class Ar {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || Ct, this.options.renderer = this.options.renderer || new ko(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ni();
  }
  static parse(t, n) {
    return new Ar(n).parse(t);
  }
  static parseInline(t, n) {
    return new Ar(n).parseInline(t);
  }
  parse(t) {
    let n = "";
    for (let o = 0; o < t.length; o++) {
      let r = t[o];
      if (this.options.extensions?.renderers?.[r.type]) {
        let s = r, a = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(s.type)) {
          n += a || "";
          continue;
        }
      }
      let i = r;
      switch (i.type) {
        case "space": {
          n += this.renderer.space(i);
          break;
        }
        case "hr": {
          n += this.renderer.hr(i);
          break;
        }
        case "heading": {
          n += this.renderer.heading(i);
          break;
        }
        case "code": {
          n += this.renderer.code(i);
          break;
        }
        case "table": {
          n += this.renderer.table(i);
          break;
        }
        case "blockquote": {
          n += this.renderer.blockquote(i);
          break;
        }
        case "list": {
          n += this.renderer.list(i);
          break;
        }
        case "checkbox": {
          n += this.renderer.checkbox(i);
          break;
        }
        case "html": {
          n += this.renderer.html(i);
          break;
        }
        case "def": {
          n += this.renderer.def(i);
          break;
        }
        case "paragraph": {
          n += this.renderer.paragraph(i);
          break;
        }
        case "text": {
          n += this.renderer.text(i);
          break;
        }
        default: {
          let s = 'Token with "' + i.type + '" type was not found.';
          if (this.options.silent) return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return n;
  }
  parseInline(t, n = this.renderer) {
    let o = "";
    for (let r = 0; r < t.length; r++) {
      let i = t[r];
      if (this.options.extensions?.renderers?.[i.type]) {
        let a = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (a !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          o += a || "";
          continue;
        }
      }
      let s = i;
      switch (s.type) {
        case "escape": {
          o += n.text(s);
          break;
        }
        case "html": {
          o += n.html(s);
          break;
        }
        case "link": {
          o += n.link(s);
          break;
        }
        case "image": {
          o += n.image(s);
          break;
        }
        case "checkbox": {
          o += n.checkbox(s);
          break;
        }
        case "strong": {
          o += n.strong(s);
          break;
        }
        case "em": {
          o += n.em(s);
          break;
        }
        case "codespan": {
          o += n.codespan(s);
          break;
        }
        case "br": {
          o += n.br(s);
          break;
        }
        case "del": {
          o += n.del(s);
          break;
        }
        case "text": {
          o += n.text(s);
          break;
        }
        default: {
          let a = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return o;
  }
}, on = class {
  options;
  block;
  constructor(e) {
    this.options = e || Ct;
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
    return this.block ? Se.lex : Se.lexInline;
  }
  provideParser() {
    return this.block ? Re.parse : Re.parseInline;
  }
}, tw = class {
  defaults = mi();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = Re;
  Renderer = ko;
  TextRenderer = Ni;
  Lexer = Se;
  Tokenizer = No;
  Hooks = on;
  constructor(...e) {
    this.use(...e);
  }
  walkTokens(e, t) {
    let n = [];
    for (let o of e) switch (n = n.concat(t.call(this, o)), o.type) {
      case "table": {
        let r = o;
        for (let i of r.header) n = n.concat(this.walkTokens(i.tokens, t));
        for (let i of r.rows) for (let s of i) n = n.concat(this.walkTokens(s.tokens, t));
        break;
      }
      case "list": {
        let r = o;
        n = n.concat(this.walkTokens(r.items, t));
        break;
      }
      default: {
        let r = o;
        this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((i) => {
          let s = r[i].flat(1 / 0);
          n = n.concat(this.walkTokens(s, t));
        }) : r.tokens && (n = n.concat(this.walkTokens(r.tokens, t)));
      }
    }
    return n;
  }
  use(...e) {
    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      let o = { ...n };
      if (o.async = this.defaults.async || o.async || !1, n.extensions && (n.extensions.forEach((r) => {
        if (!r.name) throw new Error("extension name required");
        if ("renderer" in r) {
          let i = t.renderers[r.name];
          i ? t.renderers[r.name] = function(...s) {
            let a = r.renderer.apply(this, s);
            return a === !1 && (a = i.apply(this, s)), a;
          } : t.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let i = t[r.level];
          i ? i.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
      }), o.extensions = t), n.renderer) {
        let r = this.defaults.renderer || new ko(this.defaults);
        for (let i in n.renderer) {
          if (!(i in r)) throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i)) continue;
          let s = i, a = n.renderer[s], l = r[s];
          r[s] = (...u) => {
            let d = a.apply(r, u);
            return d === !1 && (d = l.apply(r, u)), d || "";
          };
        }
        o.renderer = r;
      }
      if (n.tokenizer) {
        let r = this.defaults.tokenizer || new No(this.defaults);
        for (let i in n.tokenizer) {
          if (!(i in r)) throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i)) continue;
          let s = i, a = n.tokenizer[s], l = r[s];
          r[s] = (...u) => {
            let d = a.apply(r, u);
            return d === !1 && (d = l.apply(r, u)), d;
          };
        }
        o.tokenizer = r;
      }
      if (n.hooks) {
        let r = this.defaults.hooks || new on();
        for (let i in n.hooks) {
          if (!(i in r)) throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i)) continue;
          let s = i, a = n.hooks[s], l = r[s];
          on.passThroughHooks.has(i) ? r[s] = (u) => {
            if (this.defaults.async && on.passThroughHooksRespectAsync.has(i)) return (async () => {
              let m = await a.call(r, u);
              return l.call(r, m);
            })();
            let d = a.call(r, u);
            return l.call(r, d);
          } : r[s] = (...u) => {
            if (this.defaults.async) return (async () => {
              let m = await a.apply(r, u);
              return m === !1 && (m = await l.apply(r, u)), m;
            })();
            let d = a.apply(r, u);
            return d === !1 && (d = l.apply(r, u)), d;
          };
        }
        o.hooks = r;
      }
      if (n.walkTokens) {
        let r = this.defaults.walkTokens, i = n.walkTokens;
        o.walkTokens = function(s) {
          let a = [];
          return a.push(i.call(this, s)), r && (a = a.concat(r.call(this, s))), a;
        };
      }
      this.defaults = { ...this.defaults, ...o };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return Se.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return Re.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (t, n) => {
      let o = { ...n }, r = { ...this.defaults, ...o }, i = this.onError(!!r.silent, !!r.async);
      if (this.defaults.async === !0 && o.async === !1) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof t > "u" || t === null) return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof t != "string") return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
      if (r.hooks && (r.hooks.options = r, r.hooks.block = e), r.async) return (async () => {
        let s = r.hooks ? await r.hooks.preprocess(t) : t, a = await (r.hooks ? await r.hooks.provideLexer() : e ? Se.lex : Se.lexInline)(s, r), l = r.hooks ? await r.hooks.processAllTokens(a) : a;
        r.walkTokens && await Promise.all(this.walkTokens(l, r.walkTokens));
        let u = await (r.hooks ? await r.hooks.provideParser() : e ? Re.parse : Re.parseInline)(l, r);
        return r.hooks ? await r.hooks.postprocess(u) : u;
      })().catch(i);
      try {
        r.hooks && (t = r.hooks.preprocess(t));
        let s = (r.hooks ? r.hooks.provideLexer() : e ? Se.lex : Se.lexInline)(t, r);
        r.hooks && (s = r.hooks.processAllTokens(s)), r.walkTokens && this.walkTokens(s, r.walkTokens);
        let a = (r.hooks ? r.hooks.provideParser() : e ? Re.parse : Re.parseInline)(s, r);
        return r.hooks && (a = r.hooks.postprocess(a)), a;
      } catch (s) {
        return i(s);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        let o = "<p>An error occurred:</p><pre>" + Ge(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(o) : o;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
}, wt = new tw();
function ce(e, t) {
  return wt.parse(e, t);
}
ce.options = ce.setOptions = function(e) {
  return wt.setOptions(e), ce.defaults = wt.defaults, ac(ce.defaults), ce;
};
ce.getDefaults = mi;
ce.defaults = Ct;
ce.use = function(...e) {
  return wt.use(...e), ce.defaults = wt.defaults, ac(ce.defaults), ce;
};
ce.walkTokens = function(e, t) {
  return wt.walkTokens(e, t);
};
ce.parseInline = wt.parseInline;
ce.Parser = Re;
ce.parser = Re.parse;
ce.Renderer = ko;
ce.TextRenderer = Ni;
ce.Lexer = Se;
ce.lexer = Se.lex;
ce.Tokenizer = No;
ce.Hooks = on;
ce.parse = ce;
ce.options;
ce.setOptions;
ce.use;
ce.walkTokens;
ce.parseInline;
Re.parse;
Se.lex;
const nw = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, Jw = ru(function({
  content: t = "",
  onChange: n,
  onHTMLChange: o,
  onMarkdownChange: r,
  placeholder: i = 'Start writing... Use "/" for commands',
  editable: s = !0,
  autofocus: a = !1,
  className: l = "",
  showToolbar: u = !0,
  showWordCount: d = !0,
  theme: m,
  autoSave: h = !0,
  autoSaveKey: f = "manus-editor-content",
  autoSaveDelay: p = 1e3,
  showRecoveryBanner: b = !0,
  showFloatingToolbar: v = !0,
  maxImageSize: g = 5 * 1024 * 1024,
  onImageUploadStart: N,
  onImageUploadComplete: x,
  onImageUploadError: y,
  showModeToggle: k = !0,
  // New props
  initialMode: S = "wysiwyg",
  onModeChange: T,
  onReady: C,
  onFocus: L,
  onBlur: O,
  onSelectionChange: V,
  onDestroy: W,
  onSave: U,
  onRecover: K,
  onWikiLinkClick: J,
  onLinkClick: F,
  findReplaceOpen: G,
  onFindReplaceChange: A,
  renderToolbar: $,
  renderFooter: E,
  disabledFeatures: D = {},
  minHeight: j = "200px",
  maxHeight: q,
  spellCheck: se = !0,
  headingLevels: ue = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: de = [1, 2, 3],
  // TOC props
  showTableOfContents: X = !1,
  tocVisible: xe = !0,
  onTocVisibilityChange: Le,
  tocTitle: Ie = "",
  tocMinLevel: Je = 1,
  tocMaxLevel: We = 4,
  tocShowLevelIndicators: ft = !1,
  tocHighlightActive: ki = !0,
  tocTreeView: xi = !1,
  tocWidth: yi = "240px",
  tocPosition: Tn = "right",
  tocScrollOffset: Ci = 20,
  onTocItemClick: Ti,
  renderTocItem: Ei,
  tocShowToggleButton: Si = !0,
  // Performance profiler
  showPerformanceProfiler: Nc = !1,
  onPerformanceProfilerClose: kc
}, xc) {
  const [Ue] = B(() => nw()), [qt, yc] = B(S), [Cc, Ri] = B(""), De = Y(S), En = Y(""), Sn = Y(null), Tc = lr(() => {
    const P = [
      _c.configure({
        heading: {
          levels: ue
        },
        codeBlock: !1,
        // We use CodeBlockLowlight instead
        dropcursor: {
          color: "var(--primary)",
          width: 2
        },
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
      Hc.configure({
        placeholder: i,
        emptyEditorClass: "is-editor-empty"
      }),
      Fc.configure({
        types: ["heading", "paragraph"]
      }),
      Wc.configure({
        multicolor: !0
      }),
      Uc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      Zc,
      Qc,
      Jc,
      eu,
      Ng,
      yg,
      Eg,
      Cg
    ];
    return D.tables || P.push(
      Vc.configure({
        resizable: !Ue,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      jc,
      nd,
      od,
      ud
    ), D.taskLists || P.push(
      Xc.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Yc.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), D.codeBlocks || P.push(md), D.callouts || P.push(vd, xg), D.collapsibleHeadings || P.push(
      gg.configure({
        levels: de
      })
    ), D.images || P.push(
      wd.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (I) => {
          An({
            isOpen: !0,
            src: I.src,
            alt: I.alt,
            pos: I.pos,
            position: { x: I.rect.left + I.rect.width / 2, y: I.rect.bottom }
          });
        }
      }),
      Pg.configure({
        maxFileSize: g,
        onUploadStart: N,
        onUploadComplete: x,
        onUploadError: y
      })
    ), !Ue && !D.datePills && P.push(
      Td.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), D.wikiLinks || P.push(
      mg.configure({
        onWikiLinkClick: (I) => {
          console.log("WikiLink clicked:", I), J?.(I);
        }
      })
    ), D.markdownPaste || P.push(
      bg.configure({
        enableMarkdownPaste: !0
      })
    ), P;
  }, [i, Ue, g, N, x, y, ue, de, D, J]), Xt = Y(null), Fo = Y(n), Wo = Y(o), Ec = Y(r);
  Fo.current = n, Wo.current = o, Ec.current = r;
  const M = Bc({
    /**
     * Performance: Render immediately without waiting for next tick
     */
    immediatelyRender: !0,
    /**
     * Performance: Prevent React re-renders on every ProseMirror transaction.
     * The editor DOM updates are handled by ProseMirror directly.
     * Only toolbar state and other React UI need selective re-renders via useEditorState.
     */
    shouldRerenderOnTransaction: !1,
    // @ts-ignore - Expose editor globally for debugging
    onCreate: ({ editor: P }) => {
      window.__tiptapEditor = P, C?.(P);
    },
    onDestroy: () => {
      W?.();
    },
    extensions: Tc,
    content: t,
    editable: s,
    autofocus: a,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: se ? "true" : "false"
      },
      handleClick: (P, I, ne) => {
        if (F) {
          const Z = ne.target.closest("a");
          if (Z) {
            const le = Z.getAttribute("href");
            if (le && F(le, ne) === !1)
              return ne.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: P }) => {
      Xt.current && clearTimeout(Xt.current), Xt.current = setTimeout(() => {
        if (!P.isDestroyed && (Fo.current || Wo.current)) {
          const I = P.getHTML();
          Fo.current?.(I), Wo.current?.(I);
        }
      }, 150);
    },
    onFocus: () => {
      L?.();
    },
    onBlur: () => {
      O?.();
    },
    onSelectionUpdate: ({ editor: P }) => {
      if (V) {
        const { from: I, to: ne, empty: ae } = P.state.selection;
        V({ from: I, to: ne, empty: ae });
      }
    }
  });
  Q(() => () => {
    Xt.current && clearTimeout(Xt.current);
  }, []);
  const [Sc, Rn] = B(!1), [Tt, An] = B(null), [Rc, Ac] = B(!1), Mc = G !== void 0 ? G : Rc, et = H((P) => {
    Ac(P), A?.(P);
  }, [A]), [Pc, Uo] = B(0), [Lc, Ic] = B(""), Ve = sg(M, {
    storageKey: f,
    debounceMs: p,
    enabled: h,
    onSave: (P) => {
      U?.(P);
    },
    onRecover: (P) => {
      K?.(P);
    }
  }), Mn = lr(() => {
    const P = new vo({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
      emDelimiter: "*",
      strongDelimiter: "**"
    });
    return P.use(vv), P.addRule("highlight", {
      filter: (I) => I.nodeName === "MARK",
      replacement: (I) => `==${I}==`
    }), P.addRule("resizableImage", {
      filter: "img",
      replacement: (I, ne) => {
        const ae = ne, Z = ae.getAttribute("src") || "", le = ae.getAttribute("alt") || "", nt = ae.getAttribute("width") || ae.style.width?.replace("px", "");
        return nt ? `<img src="${Z}" alt="${le}" width="${nt}" />` : `![${le}](${Z})`;
      }
    }), P.addRule("taskListItem", {
      filter: (I) => I.nodeName === "LI" && I.getAttribute("data-type") === "taskItem",
      replacement: (I, ne) => {
        const ae = ne.querySelector('input[type="checkbox"]');
        return `- [${ae?.hasAttribute("checked") || ae?.checked ? "x" : " "}] ${I.trim()}
`;
      }
    }), P.addRule("table", {
      filter: "table",
      replacement: function(I, ne) {
        const ae = ne, Z = Array.from(ae.querySelectorAll("tr"));
        if (Z.length === 0) return "";
        const le = [];
        return Z.forEach((nt, Vo) => {
          const Pn = Array.from(nt.querySelectorAll("th, td")), $c = Pn.map((jo) => (jo.textContent?.trim() || "").replace(/\|/g, "\\|"));
          if (le.push("| " + $c.join(" | ") + " |"), Vo === 0) {
            const jo = Pn.map(() => "---").join(" | ");
            le.push("| " + jo + " |");
          }
        }), `

` + le.join(`
`) + `

`;
      }
    }), P.addRule("tableCell", {
      filter: ["th", "td"],
      replacement: function(I) {
        return I;
      }
    }), P.addRule("callout", {
      filter: (I) => I.nodeName === "DIV" && I.hasAttribute("data-callout"),
      replacement: (I, ne) => {
        const ae = ne.getAttribute("data-type") || "info", Z = I.trim().replace(/\n{3,}/g, `

`);
        return `

\`\`\`${ae}
${Z}
\`\`\`

`;
      }
    }), P;
  }, []), Oe = H((P) => {
    if (M) {
      if (P === "markdown" && De.current === "wysiwyg") {
        const I = M.getHTML(), ne = Mn.turndown(I);
        Ri(ne), En.current = ne;
      } else if (P === "wysiwyg" && De.current === "markdown") {
        const I = ["info", "warning", "error", "success", "note"];
        let ne = En.current;
        I.forEach((Z) => {
          const le = new RegExp(`\`\`\`${Z}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
          ne = ne.replace(le, (nt, Vo) => {
            const Pn = ce.parse(Vo.trim(), { async: !1 });
            return `<div data-callout="" data-type="${Z}" class="callout callout-${Z}">${Pn}</div>`;
          });
        });
        const ae = ce.parse(ne, { async: !1 });
        queueMicrotask(() => {
          M.isDestroyed || M.commands.setContent(ae);
        });
      }
      yc(P), De.current = P, T?.(P);
    }
  }, [M, Mn, T]), Dc = H((P) => {
    Ri(P), En.current = P, r?.(P);
  }, [r]), tt = lg(M, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: d
  });
  if (iu(xc, () => ({
    getEditor: () => M,
    getHTML: () => M?.getHTML() || "",
    getMarkdown: () => M ? Mn.turndown(M.getHTML()) : "",
    getText: () => M?.getText() || "",
    setContent: (P) => {
      M && !M.isDestroyed && queueMicrotask(() => {
        M.commands.setContent(P);
      });
    },
    clearContent: () => {
      M && !M.isDestroyed && M.commands.clearContent();
    },
    focus: (P) => {
      M && !M.isDestroyed && M.commands.focus(P);
    },
    blur: () => {
      M && !M.isDestroyed && M.commands.blur();
    },
    isEmpty: () => M?.isEmpty || !0,
    isFocused: () => M?.isFocused || !1,
    getMode: () => De.current,
    setMode: (P) => Oe(P),
    toggleMode: () => {
      const P = De.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return Oe(P), P;
    },
    getWordCount: () => ({
      words: tt.words,
      characters: tt.characters,
      charactersWithSpaces: tt.charactersWithSpaces
    }),
    undo: () => M?.commands.undo(),
    redo: () => M?.commands.redo(),
    canUndo: () => M?.can().undo() || !1,
    canRedo: () => M?.can().redo() || !1,
    insertContent: (P) => M?.commands.insertContent(P),
    insertImage: (P, I = "") => M?.commands.setImage({ src: P, alt: I }),
    insertTable: (P = 3, I = 3) => M?.commands.insertTable({ rows: P, cols: I, withHeaderRow: !0 }),
    insertCodeBlock: (P) => {
      P ? M?.commands.setCodeBlock({ language: P }) : M?.commands.setCodeBlock();
    },
    insertCallout: (P = "info") => M?.commands.insertCallout?.({ type: P }),
    insertHorizontalRule: () => M?.commands.setHorizontalRule(),
    toggleBold: () => M?.commands.toggleBold(),
    toggleItalic: () => M?.commands.toggleItalic(),
    toggleUnderline: () => M?.commands.toggleUnderline(),
    toggleStrike: () => M?.commands.toggleStrike(),
    toggleCode: () => M?.commands.toggleCode(),
    toggleHighlight: () => M?.commands.toggleHighlight(),
    setHeading: (P) => {
      P === 0 ? M?.commands.setParagraph() : M?.commands.setHeading({ level: P });
    },
    toggleBulletList: () => M?.commands.toggleBulletList(),
    toggleOrderedList: () => M?.commands.toggleOrderedList(),
    toggleTaskList: () => M?.commands.toggleTaskList(),
    toggleBlockquote: () => M?.commands.toggleBlockquote(),
    setLink: (P) => M?.commands.setLink({ href: P }),
    unsetLink: () => M?.commands.unsetLink(),
    openFindReplace: () => {
      et(!0), Uo((P) => P + 1);
    },
    closeFindReplace: () => et(!1),
    save: () => Ve.save(),
    clearSavedContent: () => Ve.clear(),
    getSelectedText: () => {
      if (!M) return "";
      const { from: P, to: I } = M.state.selection;
      return M.state.doc.textBetween(P, I, " ");
    },
    isEditable: () => M?.isEditable || !1,
    setEditable: (P) => M?.setEditable(P),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!M) return [];
      const P = [];
      return M.state.doc.descendants((I, ne) => {
        if (I.type.name === "heading") {
          const ae = I.attrs.level, Z = I.textContent.trim();
          Z && P.push({ id: `toc-heading-${ne}`, text: Z, level: ae, pos: ne });
        }
      }), P;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (P) => {
      if (!(!M || M.isDestroyed))
        try {
          const I = M.state.doc.resolve(P), ne = M.view.nodeDOM(I.before(I.depth + 1));
          if (ne instanceof HTMLElement) {
            const ae = M.view.dom.closest(".editor-content-wrapper");
            if (ae) {
              const Z = ae.getBoundingClientRect(), nt = ne.getBoundingClientRect().top - Z.top + ae.scrollTop;
              ae.scrollTo({ top: nt - 20, behavior: "smooth" });
            } else
              ne.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          M.commands.setTextSelection(P + 1);
        } catch {
        }
    }
  }), [M, Mn, Oe, tt, Ve, et]), Q(() => {
    const P = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => De.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (I) => {
        if (I !== "wysiwyg" && I !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        Oe(I);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const I = De.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return Oe(I), I;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        Oe("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        Oe("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => De.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => De.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => De.current === "markdown" ? En.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (I) => {
        const ne = (ae) => {
          I(ae.detail.mode);
        };
        return window.addEventListener("manus-editor-mode-change", ne), () => window.removeEventListener("manus-editor-mode-change", ne);
      }
    };
    return window.__manusEditorModeAPI = P, console.log("Manus Editor Mode API exposed globally as window.__manusEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__manusEditorModeAPI;
    };
  }, [Oe]), Q(() => {
    window.dispatchEvent(new CustomEvent("manus-editor-mode-change", { detail: { mode: qt } }));
  }, [qt]), Q(() => {
    if (!M || M.isDestroyed) return;
    const P = (I) => {
      if (!M.isDestroyed) {
        if ((I.metaKey || I.ctrlKey) && I.key === "k") {
          I.preventDefault(), Rn(!0);
          return;
        }
        if (!Ue && (I.metaKey || I.ctrlKey) && I.key === "f") {
          if (I.preventDefault(), M) {
            const { state: ne } = M, { from: ae, to: Z } = ne.selection;
            if (ae !== Z) {
              const le = ne.doc.textBetween(ae, Z, " ");
              le.trim() && Ic(le.trim());
            }
          }
          et(!0), Uo((ne) => ne + 1);
          return;
        }
        if (!Ue && (I.metaKey || I.ctrlKey) && I.key === "h") {
          I.preventDefault(), et(!0);
          return;
        }
        if (I.key === " ")
          try {
            const { state: ne } = M, { selection: ae } = ne, { $from: Z } = ae, le = Z.nodeBefore?.textContent || "";
            if (le === "#") {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - 1, to: Z.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (le === "##") {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - 2, to: Z.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (le === "###") {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - 3, to: Z.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (le === "-" || le === "*") {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - 1, to: Z.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(le)) {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - le.length, to: Z.pos }).toggleOrderedList().run();
              return;
            }
            if (le === "[]" || le === "[ ]") {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - le.length, to: Z.pos }).toggleTaskList().run();
              return;
            }
            if (le === ">") {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - 1, to: Z.pos }).toggleBlockquote().run();
              return;
            }
            if (le === "```") {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - 3, to: Z.pos }).toggleCodeBlock().run();
              return;
            }
            if (le === "---" || le === "***") {
              I.preventDefault(), M.chain().focus().deleteRange({ from: Z.pos - 3, to: Z.pos }).setHorizontalRule().run();
              return;
            }
          } catch (ne) {
            console.warn("Space shortcut error:", ne);
          }
      }
    };
    return document.addEventListener("keydown", P, !0), () => document.removeEventListener("keydown", P, !0);
  }, [M, Ue, et]), !M)
    return /* @__PURE__ */ c("div", { className: `markdown-editor-container ${l}`, "data-theme": m, children: /* @__PURE__ */ c("div", { className: "editor-loading", children: "Loading editor..." }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1216,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1215,
      columnNumber: 7
    }, this);
  const Ai = /* @__PURE__ */ c(
    eg,
    {
      editor: M,
      onOpenLinkPopover: () => Rn(!0),
      className: "flex-1 border-b-0",
      onOpenFindReplace: () => {
        et(!0), Uo((P) => P + 1);
      },
      disabledFeatures: D
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1223,
      columnNumber: 5
    },
    this
  ), Mi = /* @__PURE__ */ c("div", { className: "editor-footer", children: [
    /* @__PURE__ */ c("div", { className: "word-count", children: [
      /* @__PURE__ */ c("span", { children: [
        tt.words,
        " words"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1239,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c("span", { children: [
        tt.characters,
        " characters"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1240,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1238,
      columnNumber: 7
    }, this),
    h && /* @__PURE__ */ c(
      cg,
      {
        status: Ve.status,
        lastSaved: Ve.lastSaved
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1243,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 1237,
    columnNumber: 5
  }, this), Oc = {
    minHeight: j,
    ...q && { maxHeight: q, overflowY: "auto" }
  };
  return /* @__PURE__ */ c("div", { className: `markdown-editor-container ${l}`, "data-theme": m, children: [
    h && b && Ve.hasRecoverableContent && /* @__PURE__ */ c(
      ug,
      {
        onRecover: () => {
          Ve.recover();
        },
        onDismiss: Ve.dismissRecovery
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1261,
        columnNumber: 9
      },
      this
    ),
    u && /* @__PURE__ */ c("div", { className: "flex items-center border-b border-border bg-card/50", children: [
      $ ? $(M, Ai) : Ai,
      k && /* @__PURE__ */ c("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ c(
          "button",
          {
            onClick: () => Oe("wysiwyg"),
            className: `editor-mode-toggle-btn ${qt === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ c(Bu, {}, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1280,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 1275,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ c(
          "button",
          {
            onClick: () => Oe("markdown"),
            className: `editor-mode-toggle-btn ${qt === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ c(Ot, {}, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1287,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 1282,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1274,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1271,
      columnNumber: 9
    }, this),
    !Ue && /* @__PURE__ */ c(
      tg,
      {
        editor: M,
        isOpen: Mc,
        onClose: () => et(!1),
        focusTrigger: Pc,
        initialSearchQuery: Lc
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1296,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ c(rg, { editor: M }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1306,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c("div", { className: `editor-main-area ${X ? "editor-with-toc" : ""}`, children: [
      X && Tn === "left" && /* @__PURE__ */ c(
        Ss,
        {
          editor: M,
          visible: xe,
          onVisibilityChange: Le,
          title: Ie,
          minLevel: Je,
          maxLevel: We,
          showLevelIndicators: ft,
          highlightActive: ki,
          treeView: xi,
          width: yi,
          position: Tn,
          scrollOffset: Ci,
          onItemClick: Ti,
          renderItem: Ei,
          showToggleButton: Si,
          scrollContainerRef: Sn
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1312,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ c("div", { className: "editor-content-wrapper", ref: Sn, style: Oc, children: qt === "wysiwyg" ? /* @__PURE__ */ c(Ae, { children: [
        /* @__PURE__ */ c(zc, { editor: M, className: "editor-content" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1334,
          columnNumber: 13
        }, this),
        !D.images && !D.dragAndDrop && /* @__PURE__ */ c(Lg, { containerRef: Sn, enabled: s }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1338,
          columnNumber: 15
        }, this),
        !Ue && v && /* @__PURE__ */ c(pd, { editor: M }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1344,
          columnNumber: 50
        }, this),
        !D.slashCommands && /* @__PURE__ */ c(Rd, { editor: M, disabledFeatures: D }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1347,
          columnNumber: 49
        }, this),
        /* @__PURE__ */ c(
          fd,
          {
            editor: M,
            isOpen: Sc,
            onClose: () => Rn(!1)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 1350,
            columnNumber: 13
          },
          this
        ),
        !Ue && /* @__PURE__ */ c(
          hd,
          {
            editor: M,
            onEditLink: () => Rn(!0)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 1358,
            columnNumber: 15
          },
          this
        ),
        !D.images && Tt?.isOpen && /* @__PURE__ */ c(
          Ig,
          {
            src: Tt.src,
            alt: Tt.alt,
            position: Tt.position,
            onSave: (P, I) => {
              M.chain().focus().setNodeSelection(Tt.pos).updateAttributes("resizableImage", {
                src: P,
                alt: I
              }).run(), An(null);
            },
            onDelete: () => {
              M.chain().focus().setNodeSelection(Tt.pos).deleteSelection().run(), An(null);
            },
            onClose: () => An(null)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
            lineNumber: 1366,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1333,
        columnNumber: 11
      }, this) : /* @__PURE__ */ c(
        Bg,
        {
          content: Cc,
          onChange: Dc,
          placeholder: "Write your markdown here...",
          editable: s,
          autofocus: !0
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1388,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1331,
        columnNumber: 7
      }, this),
      X && Tn === "right" && /* @__PURE__ */ c(
        Ss,
        {
          editor: M,
          visible: xe,
          onVisibilityChange: Le,
          title: Ie,
          minLevel: Je,
          maxLevel: We,
          showLevelIndicators: ft,
          highlightActive: ki,
          treeView: xi,
          width: yi,
          position: Tn,
          scrollOffset: Ci,
          onItemClick: Ti,
          renderItem: Ei,
          showToggleButton: Si,
          scrollContainerRef: Sn
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1399,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1309,
      columnNumber: 7
    }, this),
    d && (E ? E(
      { words: tt.words, characters: tt.characters },
      Ve.status,
      Mi
    ) : Mi),
    /* @__PURE__ */ c(_g, { visible: Nc, onClose: kc, editor: M }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1432,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 1258,
    columnNumber: 5
  }, this);
}), eN = Lr.create({
  name: "callout",
  addOptions() {
    return {
      HTMLAttributes: {},
      types: ["info", "warning", "error", "success", "note"]
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
      pn(this.options.HTMLAttributes, t, {
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
}), vc = {
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
}, ow = {
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
}, rw = {
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
}, iw = {
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
}, rn = {
  dark: vc,
  light: ow,
  sepia: rw,
  nord: iw
};
function sw(e, t) {
  Object.entries(t.variables).forEach(([n, o]) => {
    e.style.setProperty(n, o);
  });
}
function tN(e, t, n, o) {
  const r = rn[e] || vc;
  return {
    name: t,
    description: n,
    variables: {
      ...r.variables,
      ...o
    }
  };
}
const wc = su(null);
function nN({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [o, r] = B(t), i = rn[o] || rn.dark, s = H((l) => {
    rn[l] && r(l);
  }, []);
  Q(() => {
    n?.current && sw(n.current, i);
  }, [i, n]);
  const a = {
    theme: i,
    themeName: o,
    setTheme: s,
    availableThemes: Object.keys(rn)
  };
  return /* @__PURE__ */ c(wc.Provider, { value: a, children: e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ThemeProvider.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function oN() {
  const e = au(wc);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const Bs = [
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
function rN({ node: e, updateAttributes: t }) {
  const [n, o] = B(!1), r = e.attrs.language || "plaintext";
  Bs.find((s) => s.value === r)?.label;
  const i = H(() => {
    const s = e.textContent;
    navigator.clipboard.writeText(s).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ c(xo, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ c("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ c("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ c(
          "select",
          {
            value: r,
            onChange: (s) => t({ language: s.target.value }),
            className: "code-block-language-select",
            children: Bs.map(({ value: s, label: a }) => /* @__PURE__ */ c("option", { value: s, children: a }, s, !1, {
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
        /* @__PURE__ */ c(yo, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c(
        "button",
        {
          onClick: i,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ c(Co, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this) : /* @__PURE__ */ c(Ir, { size: 14 }, void 0, !1, {
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
    /* @__PURE__ */ c("pre", { className: "code-block-pre", children: /* @__PURE__ */ c("code", { children: /* @__PURE__ */ c(Pr, {}, void 0, !1, {
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
  cg as AutoSaveIndicator,
  eN as Callout,
  xg as CalloutInputRule,
  rN as CodeBlockComponent,
  gg as CollapsibleHeading,
  Td as DatePill,
  nN as EditorThemeProvider,
  eg as EditorToolbar,
  tg as FindReplace,
  pd as FloatingToolbar,
  Lg as ImageDropZone,
  Pg as ImageUpload,
  Jw as MarkdownEditor,
  Ng as MarkdownLinkInputRule,
  bg as MarkdownPasteSafe,
  ug as RecoveryBanner,
  wd as ResizableImage,
  yg as SearchHighlight,
  rg as SelectAllActionBar,
  Eg as SelectAllOccurrences,
  Rd as SlashCommands,
  Cg as TabIndent,
  Ss as TableOfContents,
  mg as WikiLinkSafe,
  sw as applyTheme,
  tN as createCustomTheme,
  vc as darkTheme,
  ow as lightTheme,
  ie as lowlight,
  iw as nordTheme,
  rw as sepiaTheme,
  rn as themes,
  sg as useAutoSave,
  oN as useEditorTheme,
  lg as useWordCount
};
//# sourceMappingURL=manus-editor.js.map
