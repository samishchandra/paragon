import { jsx as m, jsxs as R, Fragment as Ee } from "react/jsx-runtime";
import { useEditorState as uc, NodeViewWrapper as kn, ReactNodeViewRenderer as co, NodeViewContent as $s, useEditor as Ld, EditorContent as Id } from "@tiptap/react";
import * as M from "react";
import X, { useCallback as B, useState as U, useRef as Y, useEffect as q, memo as En, createContext as dc, useContext as fc, useLayoutEffect as lo, useMemo as Gt, useImperativeHandle as Pd, Component as Od, useReducer as _d, forwardRef as $d } from "react";
import * as mc from "react-dom";
import Hd, { createPortal as Wd } from "react-dom";
import { Link2 as Hs, ExternalLink as zd, Pencil as Bd, Check as Tn, Copy as Dn, Unlink as Fd, ChevronDown as Pt, Bold as Ws, Italic as zs, Underline as Bs, Strikethrough as Fs, Code as pc, Highlighter as hc, Link as Us, Quote as Ys, List as js, ListOrdered as Vs, CheckSquare as Ks, FileCode as Ud, Sparkles as uo, ChevronLeftIcon as Yd, ChevronRightIcon as jd, ChevronDownIcon as Vd, Calendar as gc, Hash as Ga, Image as Gs, X as xt, Type as fo, Heading1 as Kd, Heading2 as Gd, Heading3 as qd, Heading4 as Xd, Heading5 as Zd, Code2 as yc, Table as ps, Minus as vc, Info as Xr, StickyNote as bc, MessageSquareText as wc, BookOpen as qs, ListTodo as Xs, FileText as Zs, Plus as Qs, Undo as Qd, Redo as Jd, IndentIncrease as ef, IndentDecrease as tf, PenLine as nf, Library as rf, Columns as qa, Trash2 as pn, Rows as Xa, ToggleLeft as Za, ArrowUpDown as of, Search as sf, ChevronUp as af, MousePointerClick as cf, CaseSensitive as lf, WholeWord as uf, Regex as df, Replace as hs, ReplaceAll as ff, Cloud as mf, Loader2 as xc, CloudOff as pf, AlertCircle as hf, RotateCcw as Js, ImagePlus as gf, Activity as yf, Maximize2 as kc, Minimize2 as Cc, AlertTriangle as vf, ChevronRight as Mc, CheckCircle2 as bf, MessageSquare as Sc, RefreshCw as wf, SpellCheck as xf, PanelRightClose as kf, PanelRightOpen as Cf, Eye as Mf } from "lucide-react";
import { Node as mo, InputRule as $e, mergeAttributes as Nn, Extension as et, Mark as Ec } from "@tiptap/core";
import { PluginKey as Ie, Plugin as Pe, TextSelection as at, AllSelection as Sf } from "@tiptap/pm/state";
import { createRoot as Ef } from "react-dom/client";
import Tf from "@tiptap/starter-kit";
import Df from "@tiptap/extension-placeholder";
import Nf from "@tiptap/extension-text-align";
import Af from "@tiptap/extension-highlight";
import Rf from "@tiptap/extension-link";
import { Table as Lf } from "@tiptap/extension-table";
import If from "@tiptap/extension-table-row";
import Pf from "@tiptap/extension-table-cell";
import Of from "@tiptap/extension-table-header";
import { DecorationSet as He, Decoration as Ge } from "@tiptap/pm/view";
import _f from "@tiptap/extension-bullet-list";
import $f from "@tiptap/extension-ordered-list";
import Hf from "@tiptap/extension-list-item";
import Wf from "@tiptap/extension-task-list";
import zf from "@tiptap/extension-task-item";
import { findWrapping as Qa, canJoin as Bf } from "@tiptap/pm/transform";
import Ff from "@tiptap/extension-underline";
import Uf from "@tiptap/extension-subscript";
import Yf from "@tiptap/extension-superscript";
import jf from "@tiptap/extension-typography";
import Vf from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Kf } from "lowlight";
import ea from "highlight.js/lib/languages/javascript";
import ta from "highlight.js/lib/languages/typescript";
import Tc from "highlight.js/lib/languages/python";
import na from "highlight.js/lib/languages/xml";
import Gf from "highlight.js/lib/languages/css";
import qf from "highlight.js/lib/languages/json";
import po from "highlight.js/lib/languages/bash";
import Xf from "@tiptap/extension-image";
import { Fragment as Zf } from "@tiptap/pm/model";
import { liftListItem as Ja, sinkListItem as ei } from "@tiptap/pm/schema-list";
import { undo as Qf, redo as Jf } from "@tiptap/pm/history";
import em from "@tiptap/extension-horizontal-rule";
function St({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: r
}) {
  const o = B(
    (a) => {
      r?.(a), a.stopPropagation();
    },
    [r]
  ), s = B((a) => {
    a.stopPropagation();
  }, []), i = B((a) => {
    a.stopPropagation();
  }, []);
  return Wd(
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
function tm({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = U(""), s = Y(null), i = Y(null), [a, c] = U({ top: 0, left: 0 });
  q(() => {
    if (t) {
      const h = e.getAttributes("link").href || "";
      o(h);
      try {
        const { view: g } = e, { from: y } = g.state.selection, v = g.coordsAtPos(y), b = v.bottom + 8, x = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        c({ top: b, left: x });
      } catch {
        c({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), q(() => {
    if (!t) return;
    const h = (b) => {
      i.current && !i.current.contains(b.target) && n();
    }, g = () => {
      n();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", h);
    }, 10), v = e.view.dom.closest(".editor-content-wrapper");
    return v?.addEventListener("scroll", g), () => {
      clearTimeout(y), document.removeEventListener("mousedown", h), v?.removeEventListener("scroll", g);
    };
  }, [t, n, e]);
  const l = B((h) => {
    if (h?.preventDefault(), r.trim()) {
      let g = r.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), u = B((h) => {
    h.key === "Escape" ? (h.preventDefault(), n()) : h.key === "Enter" && (h.preventDefault(), l());
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
          /* @__PURE__ */ m(Hs, { className: "link-popover-icon", size: 16 }),
          /* @__PURE__ */ m(
            "input",
            {
              ref: s,
              type: "text",
              value: r,
              onChange: (h) => o(h.target.value),
              onKeyDown: u,
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
  return /* @__PURE__ */ m(St, { children: p });
}
function nm({ editor: e, onEditLink: t }) {
  const [n, r] = U({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = Y(null), s = Y(null), i = B((x) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const S = x.getAttribute("href") || "", w = x.getBoundingClientRect(), k = w.bottom + 8, D = Math.max(16, Math.min(w.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: S,
          position: { top: k, left: D },
          linkElement: x
        });
      } catch (S) {
        console.warn("LinkHoverTooltip: Error showing tooltip", S);
      }
    }
  }, [e]), a = B(() => {
    s.current = setTimeout(() => {
      r((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = B(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  q(() => {
    if (!e || e.isDestroyed) return;
    const x = e.view.dom;
    if (!x) return;
    const S = (k) => {
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
    return x.addEventListener("mouseover", S), x.addEventListener("mouseout", w), () => {
      x.removeEventListener("mouseover", S), x.removeEventListener("mouseout", w), s.current && clearTimeout(s.current);
    };
  }, [e, i, a]), q(() => {
    if (!n.isVisible) return;
    const x = () => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, S = e.view.dom.closest(".editor-content-wrapper");
    return S?.addEventListener("scroll", x), window.addEventListener("scroll", x, !0), () => {
      S?.removeEventListener("scroll", x), window.removeEventListener("scroll", x, !0);
    };
  }, [n.isVisible, e]);
  const [l, u] = U(!1), d = B(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      u(!0), setTimeout(() => u(!1), 1500);
    });
  }, [n.url]), f = B(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = B(() => {
    if (n.linkElement) {
      const { view: x } = e, { doc: S } = x.state;
      let w = null, k = null;
      S.descendants((D, C) => {
        if (D.isText && D.marks.some((E) => E.type.name === "link")) {
          const E = x.nodeDOM(C);
          if (E && (E === n.linkElement || E.parentElement === n.linkElement))
            return w = C, k = C + D.nodeSize, !1;
        }
        return !0;
      }), w !== null && k !== null ? e.chain().focus().setTextSelection({ from: w, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((x) => ({ ...x, isVisible: !1 }));
  }, [e, n.linkElement]), h = B(() => {
    if (n.linkElement) {
      const { view: x } = e, { doc: S } = x.state;
      S.descendants((w, k) => {
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
  const g = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, v = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", b = /* @__PURE__ */ m(
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
              /* @__PURE__ */ m(zd, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: g || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ R("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ m(Bd, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: d,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: l ? /* @__PURE__ */ m(Tn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ m(Dn, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(Fd, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ m(St, { children: b });
}
const Ke = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ m(
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
), ti = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), ni = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], rm = En(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = U(!1), u = Y(null), d = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = ni.find((h) => h.value === d)?.shortLabel || "P";
  q(() => {
    if (!c) return;
    const h = (g) => {
      u.current && !u.current.contains(g.target) && l(!1);
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
  return /* @__PURE__ */ R("div", { ref: u, className: "relative flex-shrink-0", children: [
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
          ${d !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: f }),
          /* @__PURE__ */ m(Pt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
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
        children: ni.map((h) => {
          const g = h.value === d;
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
                /* @__PURE__ */ m("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: h.shortLabel }),
                /* @__PURE__ */ m("span", { children: h.label })
              ]
            },
            h.value
          );
        })
      }
    )
  ] });
}), om = En(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const i = Y(null), a = uc({
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
  }), [c, l] = U(!1), [u, d] = U(""), [f, p] = U(!1), [h, g] = U({ top: 0, left: 0 }), y = Y(null), v = Y(null), b = Y(null), x = B(() => {
    if (u) {
      let E = u.trim();
      !/^https?:\/\//i.test(E) && !E.startsWith("mailto:") && (E = "https://" + E), t.chain().focus().extendMarkRange("link").setLink({ href: E }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    l(!1), d("");
  }, [t, u]), S = (E) => {
    E.preventDefault(), E.stopPropagation();
    const T = t.getAttributes("link").href;
    d(T || ""), l(!0);
  }, w = B((E, T) => {
    E.preventDefault(), E.stopPropagation(), T();
  }, []);
  q(() => {
    if (!t || t.isDestroyed) return;
    const E = () => {
      if (!t.isDestroyed)
        try {
          const { selection: T } = t.state, { empty: N, from: A, to: P } = T, W = ("node" in T && T.node ? T.node : null)?.type?.name === "resizableImage";
          if (N || W || t.isActive("codeBlock")) {
            b.current && (clearTimeout(b.current), b.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              p(!1), l(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const V = t.view.coordsAtPos(A), I = t.view.coordsAtPos(P), L = y.current?.offsetWidth || 500, z = y.current?.offsetHeight || 40, K = 8, j = window.innerWidth;
          let G = 0, J = 0;
          if (y.current) {
            const ue = y.current.closest('[data-slot="dialog-content"]');
            if (ue) {
              const fe = ue.getBoundingClientRect();
              G = fe.left, J = fe.top;
            }
          }
          let H = (V.left + I.left) / 2 - L / 2 - G;
          const F = G ? j - G : j;
          H = Math.max(K, Math.min(F - L - K, H));
          let Z = V.top - z - 10 - J;
          Z < K && (Z = I.bottom + 10 - J), f ? g({ top: Math.max(K, Z), left: H }) : (b.current && clearTimeout(b.current), b.current = setTimeout(() => {
            g({ top: Math.max(K, Z), left: H }), p(!0);
          }, 50));
        } catch (T) {
          console.warn("FloatingToolbar: Error updating position", T);
        }
    };
    return t.on("selectionUpdate", E), () => {
      t.off("selectionUpdate", E), v.current && clearTimeout(v.current), b.current && clearTimeout(b.current);
    };
  }, [t, f]);
  const k = (E) => {
    v.current && (clearTimeout(v.current), v.current = null);
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
        top: h.top,
        left: h.left
      },
      onMouseDown: k,
      children: /* @__PURE__ */ R("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: u,
            onChange: (E) => d(E.target.value),
            onKeyDown: (E) => {
              E.key === "Enter" && (E.preventDefault(), x()), E.key === "Escape" && (l(!1), d(""));
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
              onMouseDown: (E) => {
                E.preventDefault(), x();
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
              onMouseDown: (E) => {
                E.preventDefault(), l(!1), d("");
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
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleBold().run()),
            isActive: a?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Ws, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleItalic().run()),
            isActive: a?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(zs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleUnderline().run()),
            isActive: a?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Bs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleStrike().run()),
            isActive: a?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Fs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleCode().run()),
            isActive: a?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(pc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleHighlight().run()),
            isActive: a?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(hc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: S,
            isActive: a?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(Us, { size: D })
          }
        ),
        /* @__PURE__ */ m(ti, {}),
        /* @__PURE__ */ m(
          rm,
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
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleBlockquote().run()),
            isActive: a?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Ys, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleBulletList().run()),
            isActive: a?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(js, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleOrderedList().run()),
            isActive: a?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(Vs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleTaskList().run()),
            isActive: a?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(Ks, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (E) => w(E, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: a?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(Ud, { size: D })
          }
        ),
        o && /* @__PURE__ */ R(Ee, { children: [
          /* @__PURE__ */ m(ti, {}),
          /* @__PURE__ */ m(
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
              children: /* @__PURE__ */ m(uo, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(St, { onMouseDown: k, children: C });
});
function sm(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const am = {}, Kn = {};
function jt(e, t) {
  try {
    const r = (am[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in Kn ? Kn[r] : ri(r, r.split(":"));
  } catch {
    if (e in Kn) return Kn[e];
    const n = e?.match(im);
    return n ? ri(e, n.slice(1)) : NaN;
  }
}
const im = /([+-]\d\d):?(\d\d)?/;
function ri(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Kn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class ot extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(jt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Dc(this), gs(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new ot(...n, t) : new ot(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new ot(+this, t);
  }
  getTimezoneOffset() {
    const t = -jt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), gs(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ot(+new Date(t), this.timeZone);
  }
  //#endregion
}
const oi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!oi.test(e)) return;
  const t = e.replace(oi, "$1UTC");
  ot.prototype[t] && (e.startsWith("get") ? ot.prototype[e] = function() {
    return this.internal[t]();
  } : (ot.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), cm(this), +this;
  }, ot.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), gs(this), +this;
  }));
});
function gs(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-jt(e.timeZone, e) * 60));
}
function cm(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Dc(e);
}
function Dc(e) {
  const t = jt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const u = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(jt(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = jt(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, v = g - c;
  if (y && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const b = jt(e.timeZone, e), x = b > 0 ? Math.floor(b) : Math.ceil(b), S = p - x;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class Re extends ot {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Re(...n, t) : new Re(Date.now(), t);
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
    return new Re(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Re(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Nc = 6048e5, lm = 864e5, si = Symbol.for("constructDateFrom");
function Ce(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && si in e ? e[si](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function he(e, t) {
  return Ce(t || e, e);
}
function Ac(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(t) ? Ce(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Rc(e, t, n) {
  const r = he(e, n?.in);
  if (isNaN(t)) return Ce(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Ce(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const i = s.getDate();
  return o >= i ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let um = {};
function cr() {
  return um;
}
function Cn(e, t) {
  const n = cr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function er(e, t) {
  return Cn(e, { ...t, weekStartsOn: 1 });
}
function Lc(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = Ce(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = er(o), i = Ce(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = er(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function ai(e) {
  const t = he(e), n = new Date(
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
function An(e, ...t) {
  const n = Ce.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function tr(e, t) {
  const n = he(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Ic(e, t, n) {
  const [r, o] = An(
    n?.in,
    e,
    t
  ), s = tr(r), i = tr(o), a = +s - ai(s), c = +i - ai(i);
  return Math.round((a - c) / lm);
}
function dm(e, t) {
  const n = Lc(e, t), r = Ce(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), er(r);
}
function fm(e, t, n) {
  return Ac(e, t * 7, n);
}
function mm(e, t, n) {
  return Rc(e, t * 12, n);
}
function pm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ce.bind(null, o));
    const s = he(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Ce(r, n || NaN);
}
function hm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ce.bind(null, o));
    const s = he(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Ce(r, n || NaN);
}
function gm(e, t, n) {
  const [r, o] = An(
    n?.in,
    e,
    t
  );
  return +tr(r) == +tr(o);
}
function Pc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ym(e) {
  return !(!Pc(e) && typeof e != "number" || isNaN(+he(e)));
}
function vm(e, t, n) {
  const [r, o] = An(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function bm(e, t) {
  const n = he(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Oc(e, t) {
  const [n, r] = An(e, t.start, t.end);
  return { start: n, end: r };
}
function wm(e, t) {
  const { start: n, end: r } = Oc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Ce(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function xm(e, t) {
  const n = he(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function km(e, t) {
  const n = he(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function _c(e, t) {
  const n = he(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Cm(e, t) {
  const { start: n, end: r } = Oc(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Ce(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function $c(e, t) {
  const n = cr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function Mm(e, t) {
  return $c(e, { ...t, weekStartsOn: 1 });
}
const Sm = {
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
}, Em = (e, t, n) => {
  let r;
  const o = Sm[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Yo(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Tm = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Dm = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Nm = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Am = {
  date: Yo({
    formats: Tm,
    defaultWidth: "full"
  }),
  time: Yo({
    formats: Dm,
    defaultWidth: "full"
  }),
  dateTime: Yo({
    formats: Nm,
    defaultWidth: "full"
  })
}, Rm = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Lm = (e, t, n, r) => Rm[e];
function Yn(e) {
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
const Im = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Pm = {
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
}, _m = {
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
}, $m = {
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
}, Wm = (e, t) => {
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
}, zm = {
  ordinalNumber: Wm,
  era: Yn({
    values: Im,
    defaultWidth: "wide"
  }),
  quarter: Yn({
    values: Pm,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Yn({
    values: Om,
    defaultWidth: "wide"
  }),
  day: Yn({
    values: _m,
    defaultWidth: "wide"
  }),
  dayPeriod: Yn({
    values: $m,
    defaultWidth: "wide",
    formattingValues: Hm,
    defaultFormattingWidth: "wide"
  })
};
function jn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? Fm(a, (d) => d.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Bm(a, (d) => d.test(i))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const u = t.slice(i.length);
    return { value: l, rest: u };
  };
}
function Bm(e, t) {
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
    let i = e.valueCallback ? e.valueCallback(s[0]) : s[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const a = t.slice(o.length);
    return { value: i, rest: a };
  };
}
const Ym = /^(\d+)(th|st|nd|rd)?/i, jm = /\d+/i, Vm = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Km = {
  any: [/^b/i, /^(a|c)/i]
}, Gm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, qm = {
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
}, ep = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, tp = {
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
}, np = {
  ordinalNumber: Um({
    matchPattern: Ym,
    parsePattern: jm,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: jn({
    matchPatterns: Vm,
    defaultMatchWidth: "wide",
    parsePatterns: Km,
    defaultParseWidth: "any"
  }),
  quarter: jn({
    matchPatterns: Gm,
    defaultMatchWidth: "wide",
    parsePatterns: qm,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: jn({
    matchPatterns: Xm,
    defaultMatchWidth: "wide",
    parsePatterns: Zm,
    defaultParseWidth: "any"
  }),
  day: jn({
    matchPatterns: Qm,
    defaultMatchWidth: "wide",
    parsePatterns: Jm,
    defaultParseWidth: "any"
  }),
  dayPeriod: jn({
    matchPatterns: ep,
    defaultMatchWidth: "any",
    parsePatterns: tp,
    defaultParseWidth: "any"
  })
}, ra = {
  code: "en-US",
  formatDistance: Em,
  formatLong: Am,
  formatRelative: Lm,
  localize: zm,
  match: np,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function rp(e, t) {
  const n = he(e, t?.in);
  return Ic(n, _c(n)) + 1;
}
function Hc(e, t) {
  const n = he(e, t?.in), r = +er(n) - +dm(n);
  return Math.round(r / Nc) + 1;
}
function Wc(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = cr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Ce(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = Cn(i, t), c = Ce(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = Cn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function op(e, t) {
  const n = cr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Wc(e, t), s = Ce(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Cn(s, t);
}
function zc(e, t) {
  const n = he(e, t?.in), r = +Cn(n, t) - +op(n, t);
  return Math.round(r / Nc) + 1;
}
function pe(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Nt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return pe(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : pe(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return pe(e.getDate(), t.length);
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
    return pe(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return pe(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return pe(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return pe(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return pe(o, t.length);
  }
}, sn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, ii = {
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
    return Nt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Wc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return pe(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : pe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Lc(e);
    return pe(n, t.length);
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
    return pe(n, t.length);
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
        return pe(r, 2);
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
        return pe(r, 2);
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
        return Nt.M(e, t);
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
        return pe(r + 1, 2);
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
    const o = zc(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : pe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Hc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : pe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Nt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = rp(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : pe(r, t.length);
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
        return pe(s, 2);
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
        return pe(s, t.length);
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
        return pe(o, t.length);
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
    switch (r === 12 ? o = sn.noon : r === 0 ? o = sn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = sn.evening : r >= 12 ? o = sn.afternoon : r >= 4 ? o = sn.morning : o = sn.night, t) {
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
    return Nt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Nt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : pe(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : pe(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Nt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Nt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Nt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return li(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Ut(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Ut(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return li(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Ut(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Ut(r, ":");
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
        return "GMT" + ci(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Ut(r, ":");
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
        return "GMT" + ci(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Ut(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return pe(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return pe(+e, t.length);
  }
};
function ci(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + pe(s, 2);
}
function li(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + pe(Math.abs(e) / 60, 2) : Ut(e, t);
}
function Ut(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = pe(Math.trunc(r / 60), 2), s = pe(r % 60, 2);
  return n + o + t + s;
}
const ui = (e, t) => {
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
}, Bc = (e, t) => {
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
}, sp = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return ui(e, t);
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
  return s.replace("{{date}}", ui(r, t)).replace("{{time}}", Bc(o, t));
}, ap = {
  p: Bc,
  P: sp
}, ip = /^D+$/, cp = /^Y+$/, lp = ["D", "DD", "YY", "YYYY"];
function up(e) {
  return ip.test(e);
}
function dp(e) {
  return cp.test(e);
}
function fp(e, t, n) {
  const r = mp(e, t, n);
  if (console.warn(r), lp.includes(e)) throw new RangeError(r);
}
function mp(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const pp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, hp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, gp = /^'([^]*?)'?$/, yp = /''/g, vp = /[a-zA-Z]/;
function bp(e, t, n) {
  const r = cr(), o = n?.locale ?? r.locale ?? ra, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = he(e, n?.in);
  if (!ym(a))
    throw new RangeError("Invalid time value");
  let c = t.match(hp).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = ap[d];
      return f(u, o.formatLong);
    }
    return u;
  }).join("").match(pp).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: wp(u) };
    if (ii[d])
      return { isToken: !0, value: u };
    if (d.match(vp))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: u };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(a, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: o
  };
  return c.map((u) => {
    if (!u.isToken) return u.value;
    const d = u.value;
    (!n?.useAdditionalWeekYearTokens && dp(d) || !n?.useAdditionalDayOfYearTokens && up(d)) && fp(d, t, String(e));
    const f = ii[d[0]];
    return f(a, d, o.localize, l);
  }).join("");
}
function wp(e) {
  const t = e.match(gp);
  return t ? t[1].replace(yp, "'") : e;
}
function xp(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Ce(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function kp(e, t) {
  return he(e, t?.in).getMonth();
}
function Cp(e, t) {
  return he(e, t?.in).getFullYear();
}
function Mp(e, t) {
  return +he(e) > +he(t);
}
function Sp(e, t) {
  return +he(e) < +he(t);
}
function Ep(e, t, n) {
  const [r, o] = An(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Tp(e, t, n) {
  const [r, o] = An(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Dp(e, t, n) {
  const r = he(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Ce(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = xp(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function Np(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(+r) ? Ce(e, NaN) : (r.setFullYear(t), r);
}
const di = 5, Ap = 4;
function Rp(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, di * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? di : Ap;
}
function Fc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Lp(e, t) {
  const n = Fc(e, t), r = Rp(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Ye {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Re.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Re(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Ac(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Rc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : fm(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : mm(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Ic(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : vm(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : wm(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Cm(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Lp(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Mm(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : bm(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : $c(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : km(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : bp(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Hc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : kp(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : Cp(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : zc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Mp(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Sp(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Pc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : gm(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : Ep(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Tp(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : pm(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : hm(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : Dp(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : Np(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Fc(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : tr(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : er(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : xm(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Cn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : _c(r), this.options = { locale: ra, ...t }, this.overrides = n;
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
    return t && Ye.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Ye.yearFirstLocales.has(s))
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
Ye.yearFirstLocales = /* @__PURE__ */ new Set([
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
const lt = new Ye();
class Uc {
  constructor(t, n, r = lt) {
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
class Ip {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Pp {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Op(e) {
  return X.createElement("button", { ...e });
}
function _p(e) {
  return X.createElement("span", { ...e });
}
function $p(e) {
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
function Hp(e) {
  const { day: t, modifiers: n, ...r } = e;
  return X.createElement("td", { ...r });
}
function Wp(e) {
  const { day: t, modifiers: n, ...r } = e, o = X.useRef(null);
  return X.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), X.createElement("button", { ref: o, ...r });
}
var ne;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(ne || (ne = {}));
var ve;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ve || (ve = {}));
var Ze;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ze || (Ze = {}));
var Be;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Be || (Be = {}));
function zp(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[ne.Dropdown], n].join(" "), a = t?.find(({ value: c }) => c === s.value);
  return X.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[ne.DropdownRoot] },
    X.createElement(r.Select, { className: i, ...s }, t?.map(({ value: c, label: l, disabled: u }) => X.createElement(r.Option, { key: c, value: c, disabled: u }, l))),
    X.createElement(
      "span",
      { className: o[ne.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      X.createElement(r.Chevron, { orientation: "down", size: 18, className: o[ne.Chevron] })
    )
  );
}
function Bp(e) {
  return X.createElement("div", { ...e });
}
function Fp(e) {
  return X.createElement("div", { ...e });
}
function Up(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r }, e.children);
}
function Yp(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r });
}
function jp(e) {
  return X.createElement("table", { ...e });
}
function Vp(e) {
  return X.createElement("div", { ...e });
}
const Yc = dc(void 0);
function lr() {
  const e = fc(Yc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Kp(e) {
  const { components: t } = lr();
  return X.createElement(t.Dropdown, { ...e });
}
function Gp(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = lr(), u = B((f) => {
    o && n?.(f);
  }, [o, n]), d = B((f) => {
    r && t?.(f);
  }, [r, t]);
  return X.createElement(
    "nav",
    { ...s },
    X.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[ne.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      X.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[ne.Chevron], orientation: "left" })
    ),
    X.createElement(
      i.NextMonthButton,
      { type: "button", className: a[ne.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: u },
      X.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[ne.Chevron] })
    )
  );
}
function qp(e) {
  const { components: t } = lr();
  return X.createElement(t.Button, { ...e });
}
function Xp(e) {
  return X.createElement("option", { ...e });
}
function Zp(e) {
  const { components: t } = lr();
  return X.createElement(t.Button, { ...e });
}
function Qp(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function Jp(e) {
  return X.createElement("select", { ...e });
}
function eh(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function th(e) {
  return X.createElement("th", { ...e });
}
function nh(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function rh(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function oh(e) {
  return X.createElement("th", { ...e });
}
function sh(e) {
  return X.createElement("tbody", { ...e });
}
function ah(e) {
  const { components: t } = lr();
  return X.createElement(t.Dropdown, { ...e });
}
const ih = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Op,
  CaptionLabel: _p,
  Chevron: $p,
  Day: Hp,
  DayButton: Wp,
  Dropdown: zp,
  DropdownNav: Bp,
  Footer: Fp,
  Month: Up,
  MonthCaption: Yp,
  MonthGrid: jp,
  Months: Vp,
  MonthsDropdown: Kp,
  Nav: Gp,
  NextMonthButton: qp,
  Option: Xp,
  PreviousMonthButton: Zp,
  Root: Qp,
  Select: Jp,
  Week: eh,
  WeekNumber: rh,
  WeekNumberHeader: oh,
  Weekday: th,
  Weekdays: nh,
  Weeks: sh,
  YearsDropdown: ah
}, Symbol.toStringTag, { value: "Module" }));
function vt(e, t, n = !1, r = lt) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function jc(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function oa(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Vc(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Kc(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Gc(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function qc(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function bt(e, t, n = lt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (qc(a, n))
      return a.includes(e);
    if (oa(a))
      return vt(a, e, !1, n);
    if (Gc(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (jc(a)) {
      const c = s(a.before, e), l = s(a.after, e), u = c > 0, d = l < 0;
      return i(a.before, a.after) ? d && u : u || d;
    }
    return Vc(a) ? s(e, a.after) > 0 : Kc(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function ch(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: h, endOfMonth: g, isAfter: y } = o, v = n && p(n), b = r && g(r), x = {
    [ve.focused]: [],
    [ve.outside]: [],
    [ve.disabled]: [],
    [ve.hidden]: [],
    [ve.today]: []
  }, S = {};
  for (const w of e) {
    const { date: k, displayMonth: D } = w, C = !!(D && !f(k, D)), E = !!(v && h(k, v)), T = !!(b && y(k, b)), N = !!(s && bt(k, s, o)), A = !!(i && bt(k, i, o)) || E || T || // Broadcast calendar will show outside days as default
    !l && !c && C || l && c === !1 && C, P = d(k, u ?? o.today());
    C && x.outside.push(w), N && x.disabled.push(w), A && x.hidden.push(w), P && x.today.push(w), a && Object.keys(a).forEach((O) => {
      const _ = a?.[O];
      _ && bt(k, _, o) && (S[O] ? S[O].push(w) : S[O] = [w]);
    });
  }
  return (w) => {
    const k = {
      [ve.focused]: !1,
      [ve.disabled]: !1,
      [ve.hidden]: !1,
      [ve.outside]: !1,
      [ve.today]: !1
    }, D = {};
    for (const C in x) {
      const E = x[C];
      k[C] = E.some((T) => T === w);
    }
    for (const C in S)
      D[C] = S[C].some((E) => E === w);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function lh(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ve[s]] ? o.push(t[ve[s]]) : t[Ze[s]] && o.push(t[Ze[s]]), o), [t[ne.Day]]);
}
function uh(e) {
  return {
    ...ih,
    ...e
  };
}
function dh(e) {
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
function sa() {
  const e = {};
  for (const t in ne)
    e[ne[t]] = `rdp-${ne[t]}`;
  for (const t in ve)
    e[ve[t]] = `rdp-${ve[t]}`;
  for (const t in Ze)
    e[Ze[t]] = `rdp-${Ze[t]}`;
  for (const t in Be)
    e[Be[t]] = `rdp-${Be[t]}`;
  return e;
}
function Xc(e, t, n) {
  return (n ?? new Ye(t)).formatMonthYear(e);
}
const fh = Xc;
function mh(e, t, n) {
  return (n ?? new Ye(t)).format(e, "d");
}
function ph(e, t = lt) {
  return t.format(e, "LLLL");
}
function hh(e, t, n) {
  return (n ?? new Ye(t)).format(e, "cccccc");
}
function gh(e, t = lt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function yh() {
  return "";
}
function Zc(e, t = lt) {
  return t.format(e, "yyyy");
}
const vh = Zc, bh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Xc,
  formatDay: mh,
  formatMonthCaption: fh,
  formatMonthDropdown: ph,
  formatWeekNumber: gh,
  formatWeekNumberHeader: yh,
  formatWeekdayName: hh,
  formatYearCaption: vh,
  formatYearDropdown: Zc
}, Symbol.toStringTag, { value: "Module" }));
function wh(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...bh,
    ...e
  };
}
function xh(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), h = l(f), g = t && f < s(t) || n && f > s(n) || !1;
    return { value: h, label: p, disabled: g };
  });
}
function kh(e, t = {}, n = {}) {
  let r = { ...t?.[ne.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function Ch(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function Mh(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: i, eachYearOfInterval: a, getYear: c } = r, l = s(e), u = i(t), d = a({ start: l, end: u });
  return o && d.reverse(), d.map((f) => {
    const p = n.formatYearDropdown(f, r);
    return {
      value: c(f),
      label: p,
      disabled: !1
    };
  });
}
function Qc(e, t, n, r) {
  let o = (r ?? new Ye(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Sh = Qc;
function Jc(e, t, n) {
  return (n ?? new Ye(t)).formatMonthYear(e);
}
const Eh = Jc;
function Th(e, t, n, r) {
  let o = (r ?? new Ye(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function Dh(e) {
  return "Choose the Month";
}
function Nh() {
  return "";
}
function Ah(e) {
  return "Go to the Next Month";
}
function Rh(e) {
  return "Go to the Previous Month";
}
function Lh(e, t, n) {
  return (n ?? new Ye(t)).format(e, "cccc");
}
function Ih(e, t) {
  return `Week ${e}`;
}
function Ph(e) {
  return "Week Number";
}
function Oh(e) {
  return "Choose the Year";
}
const _h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Eh,
  labelDay: Sh,
  labelDayButton: Qc,
  labelGrid: Jc,
  labelGridcell: Th,
  labelMonthDropdown: Dh,
  labelNav: Nh,
  labelNext: Ah,
  labelPrevious: Rh,
  labelWeekNumber: Ih,
  labelWeekNumberHeader: Ph,
  labelWeekday: Lh,
  labelYearDropdown: Oh
}, Symbol.toStringTag, { value: "Module" })), ur = (e) => e instanceof HTMLElement ? e : null, jo = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], $h = (e) => ur(e.querySelector("[data-animated-month]")), Vo = (e) => ur(e.querySelector("[data-animated-caption]")), Ko = (e) => ur(e.querySelector("[data-animated-weeks]")), Hh = (e) => ur(e.querySelector("[data-animated-nav]")), Wh = (e) => ur(e.querySelector("[data-animated-weekdays]"));
function zh(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = Y(null), a = Y(r), c = Y(!1);
  lo(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const u = s.isSameMonth(r[0].date, l[0].date), d = s.isAfter(r[0].date, l[0].date), f = d ? n[Be.caption_after_enter] : n[Be.caption_before_enter], p = d ? n[Be.weeks_after_enter] : n[Be.weeks_before_enter], h = i.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (jo(g).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const S = $h(x);
      S && x.contains(S) && x.removeChild(S);
      const w = Vo(x);
      w && w.classList.remove(f);
      const k = Ko(x);
      k && k.classList.remove(p);
    }), i.current = g) : i.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = h instanceof HTMLElement ? jo(h) : [], v = jo(e.current);
    if (v?.every((b) => b instanceof HTMLElement) && y && y.every((b) => b instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const b = Hh(e.current);
      b && (b.style.zIndex = "1"), v.forEach((x, S) => {
        const w = y[S];
        if (!w)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const k = Vo(x);
        k && k.classList.add(f);
        const D = Ko(x);
        D && D.classList.add(p);
        const C = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), k && k.classList.remove(f), D && D.classList.remove(p), x.style.position = "", x.style.overflow = "", x.contains(w) && x.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const E = Wh(w);
        E && (E.style.opacity = "0");
        const T = Vo(w);
        T && (T.classList.add(d ? n[Be.caption_before_exit] : n[Be.caption_after_exit]), T.addEventListener("animationend", C));
        const N = Ko(w);
        N && N.classList.add(d ? n[Be.weeks_before_exit] : n[Be.weeks_after_exit]), x.insertBefore(w, x.firstChild);
      });
    }
  });
}
function Bh(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: h, endOfWeek: g, isAfter: y, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: x } = r, S = c ? v(o, r) : i ? b(o) : x(o), w = c ? f(s) : i ? p(h(s)) : g(h(s)), k = u(w, S), D = d(s, o) + 1, C = [];
  for (let N = 0; N <= k; N++) {
    const A = l(S, N);
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
function Fh(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Uh(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function fi(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = u(n, f);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function Yh(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, h = e.reduce((g, y) => {
    const v = n.broadcastCalendar ? d(y, r) : n.ISOWeek ? f(y) : p(y), b = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), x = t.filter((D) => D >= v && D <= b), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < S) {
      const D = t.filter((C) => {
        const E = S - x.length;
        return C > b && C <= o(b, E);
      });
      x.push(...D);
    }
    const w = x.reduce((D, C) => {
      const E = n.ISOWeek ? l(C) : u(C), T = D.find((A) => A.weekNumber === E), N = new Uc(C, y, r);
      return T ? T.days.push(N) : D.push(new Pp(E, [N])), D;
    }, []), k = new Ip(y, w);
    return g.push(k), g;
  }, []);
  return n.reverseMonths ? h.reverse() : h;
}
function jh(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: h, toMonth: g } = e;
  !n && h && (n = h), !n && f && (n = t.newDate(f, 0, 1)), !r && g && (r = g), !r && p && (r = u(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = u(f, 0, 1) : !n && y && (n = o(c(e.today ?? d(), -100))), r ? r = a(r) : p ? r = u(p, 11, 31) : !r && y && (r = l(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function Vh(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, u = i(e);
  if (!t)
    return a(u, l);
  if (!(c(t, e) < s))
    return a(u, l);
}
function Kh(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, u = i(e);
  if (!t)
    return a(u, -l);
  if (!(c(u, t) <= 0))
    return a(u, -l);
}
function Gh(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function ho(e, t) {
  const [n, r] = U(e);
  return [t === void 0 ? n : t, r];
}
function qh(e, t) {
  const [n, r] = jh(e, t), { startOfMonth: o, endOfMonth: s } = t, i = fi(e, n, r, t), [a, c] = ho(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  q(() => {
    const k = fi(e, n, r, t);
    c(k);
  }, [e.timeZone]);
  const l = Uh(a, r, e, t), u = Bh(l, e.endMonth ? s(e.endMonth) : void 0, e, t), d = Yh(l, u, e, t), f = Gh(d), p = Fh(d), h = Kh(a, n, e, t), g = Vh(a, r, e, t), { disableNavigation: y, onMonthChange: v } = e, b = (k) => f.some((D) => D.days.some((C) => C.isEqualTo(k))), x = (k) => {
    if (y)
      return;
    let D = o(k);
    n && D < o(n) && (D = o(n)), r && D > o(r) && (D = o(r)), c(D), v?.(D);
  };
  return {
    months: d,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: h,
    nextMonth: g,
    goToMonth: x,
    goToDay: (k) => {
      b(k) || x(k.date);
    }
  };
}
var nt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(nt || (nt = {}));
function mi(e) {
  return !e[ve.disabled] && !e[ve.hidden] && !e[ve.outside];
}
function Xh(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    mi(a) && (a[ve.focused] && s < nt.FocusedModifier ? (o = i, s = nt.FocusedModifier) : r?.isEqualTo(i) && s < nt.LastFocused ? (o = i, s = nt.LastFocused) : n(i.date) && s < nt.Selected ? (o = i, s = nt.Selected) : a[ve.today] && s < nt.Today && (o = i, s = nt.Today));
  }
  return o || (o = e.find((i) => mi(t(i)))), o;
}
function Zh(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: h, endOfWeek: g, max: y, min: v, startOfBroadcastWeek: b, startOfISOWeek: x, startOfWeek: S } = i;
  let k = {
    day: l,
    week: d,
    month: u,
    year: f,
    startOfWeek: (D) => c ? b(D, i) : a ? x(D) : S(D),
    endOfWeek: (D) => c ? p(D) : a ? h(D) : g(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = y([r, k]) : t === "after" && o && (k = v([o, k])), k;
}
function el(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = Zh(e, t, n.date, r, o, s, i), l = !!(s.disabled && bt(c, s.disabled, i)), u = !!(s.hidden && bt(c, s.hidden, i)), d = c, f = new Uc(c, d, i);
  return !l && !u ? f : el(e, t, f, r, o, s, i, a + 1);
}
function Qh(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = U(), c = Xh(t.days, n, r || (() => !1), i), [l, u] = U(s ? c : void 0);
  return {
    isFocusTarget: (g) => !!c?.isEqualTo(g),
    setFocused: u,
    focused: l,
    blur: () => {
      a(l), u(void 0);
    },
    moveFocus: (g, y) => {
      if (!l)
        return;
      const v = el(g, y, l, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(v)) || (t.goToDay(v), u(v)));
    }
  };
}
function Jh(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = ho(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((h) => c(h, p)) ?? !1, { min: u, max: d } = e;
  return {
    selected: a,
    select: (p, h, g) => {
      let y = [...a ?? []];
      if (l(p)) {
        if (a?.length === u || r && a?.length === 1)
          return;
        y = a?.filter((v) => !c(v, p));
      } else
        a?.length === d ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, h, g), y;
    },
    isSelected: l
  };
}
function eg(e, t, n = 0, r = 0, o = !1, s = lt) {
  const { from: i, to: a } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = s;
  let d;
  if (!i && !a)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !a)
    c(i, e) ? n === 0 ? d = { from: i, to: e } : o ? d = { from: i, to: void 0 } : d = void 0 : u(e, i) ? d = { from: e, to: i } : d = { from: i, to: e };
  else if (i && a)
    if (c(i, e) && c(a, e))
      o ? d = { from: i, to: a } : d = void 0;
    else if (c(i, e))
      d = { from: i, to: n > 0 ? void 0 : e };
    else if (c(a, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, i))
      d = { from: e, to: a };
    else if (l(e, i))
      d = { from: i, to: e };
    else if (l(e, a))
      d = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const f = s.differenceInCalendarDays(d.to, d.from);
    r > 0 && f > r ? d = { from: e, to: void 0 } : n > 1 && f < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function tg(e, t, n = lt) {
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
function pi(e, t, n = lt) {
  return vt(e, t.from, !1, n) || vt(e, t.to, !1, n) || vt(t, e.from, !1, n) || vt(t, e.to, !1, n);
}
function ng(e, t, n = lt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? vt(e, a, !1, n) : qc(a, n) ? a.some((c) => vt(e, c, !1, n)) : oa(a) ? a.from && a.to ? pi(e, { from: a.from, to: a.to }, n) : !1 : Gc(a) ? tg(e, a.dayOfWeek, n) : jc(a) ? n.isAfter(a.before, a.after) ? pi(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : bt(e.from, a, n) || bt(e.to, a, n) : Vc(a) || Kc(a) ? bt(e.from, a, n) || bt(e.to, a, n) : !1))
    return !0;
  const i = r.filter((a) => typeof a == "function");
  if (i.length) {
    let a = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (i.some((u) => u(a)))
        return !0;
      a = n.addDays(a, 1);
    }
  }
  return !1;
}
function rg(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = ho(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, h) => {
      const { min: g, max: y } = e, v = f ? eg(f, l, g, y, s, t) : void 0;
      return r && n && v?.from && v.to && ng({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), i || c(v), i?.(v, f, p, h), v;
    },
    isSelected: (f) => l && vt(l, f, !1, t)
  };
}
function og(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = ho(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (d, f, p) => {
      let h = d;
      return !r && a && a && c(d, a) && (h = void 0), o || i(h), o?.(h, d, f, p), h;
    },
    isSelected: (d) => a ? c(a, d) : !1
  };
}
function sg(e, t) {
  const n = og(e, t), r = Jh(e, t), o = rg(e, t);
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
function ag(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Re(t.today, t.timeZone)), t.month && (t.month = new Re(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Re(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Re(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Re(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Re(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ae) => new Re(ae, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Re(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Re(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Gt(() => {
    const ae = { ...ra, ...t.locale };
    return {
      dateLib: new Ye({
        locale: ae,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: uh(t.components),
      formatters: wh(t.formatters),
      labels: { ..._h, ...t.labels },
      locale: ae,
      classNames: { ...sa(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: p, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: v, onNextClick: b, onPrevClick: x, showWeekNumber: S, styles: w } = t, { formatCaption: k, formatDay: D, formatMonthDropdown: C, formatWeekNumber: E, formatWeekNumberHeader: T, formatWeekdayName: N, formatYearDropdown: A } = r, P = qh(t, s), { days: O, months: _, navStart: W, navEnd: V, previousMonth: I, nextMonth: L, goToMonth: z } = P, K = ch(O, t, W, V, s), { isSelected: j, select: G, selected: J } = sg(t, s) ?? {}, { blur: $, focused: H, isFocusTarget: F, moveFocus: Z, setFocused: ue } = Qh(t, P, K, j ?? (() => !1), s), { labelDayButton: fe, labelGridcell: we, labelGrid: De, labelMonthDropdown: je, labelNav: Et, labelPrevious: _n, labelNext: $n, labelWeekday: gr, labelWeekNumber: yr, labelWeekNumberHeader: vr, labelYearDropdown: br } = o, Jt = Gt(() => Ch(s, t.ISOWeek), [s, t.ISOWeek]), Hn = l !== void 0 || p !== void 0, en = B(() => {
    I && (z(I), x?.(I));
  }, [I, z, x]), tn = B(() => {
    L && (z(L), b?.(L));
  }, [z, L, b]), wr = B((ae, ge) => (oe) => {
    oe.preventDefault(), oe.stopPropagation(), ue(ae), G?.(ae.date, ge, oe), p?.(ae.date, ge, oe);
  }, [G, p, ue]), No = B((ae, ge) => (oe) => {
    ue(ae), h?.(ae.date, ge, oe);
  }, [h, ue]), Ao = B((ae, ge) => (oe) => {
    $(), f?.(ae.date, ge, oe);
  }, [$, f]), Ro = B((ae, ge) => (oe) => {
    const me = {
      ArrowLeft: [
        oe.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        oe.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [oe.shiftKey ? "year" : "week", "after"],
      ArrowUp: [oe.shiftKey ? "year" : "week", "before"],
      PageUp: [oe.shiftKey ? "year" : "month", "before"],
      PageDown: [oe.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (me[oe.key]) {
      oe.preventDefault(), oe.stopPropagation();
      const [Oe, de] = me[oe.key];
      Z(Oe, de);
    }
    g?.(ae.date, ge, oe);
  }, [Z, g, t.dir]), Lo = B((ae, ge) => (oe) => {
    y?.(ae.date, ge, oe);
  }, [y]), Io = B((ae, ge) => (oe) => {
    v?.(ae.date, ge, oe);
  }, [v]), xr = B((ae) => (ge) => {
    const oe = Number(ge.target.value), me = s.setMonth(s.startOfMonth(ae), oe);
    z(me);
  }, [s, z]), Po = B((ae) => (ge) => {
    const oe = Number(ge.target.value), me = s.setYear(s.startOfMonth(ae), oe);
    z(me);
  }, [s, z]), { className: Oo, style: Wn } = Gt(() => ({
    className: [a[ne.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[ne.Root], ...t.style }
  }), [a, t.className, t.style, w]), _o = dh(t), tt = Y(null);
  zh(tt, !!t.animate, {
    classNames: a,
    months: _,
    focused: H,
    dateLib: s
  });
  const nn = {
    dayPickerProps: t,
    selected: J,
    select: G,
    isSelected: j,
    months: _,
    nextMonth: L,
    previousMonth: I,
    goToMonth: z,
    getModifiers: K,
    components: n,
    classNames: a,
    styles: w,
    labels: o,
    formatters: r
  };
  return X.createElement(
    Yc.Provider,
    { value: nn },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? tt : void 0, className: Oo, style: Wn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ..._o },
      X.createElement(
        n.Months,
        { className: a[ne.Months], style: w?.[ne.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[ne.Nav], style: w?.[ne.Nav], "aria-label": Et(), onPreviousClick: en, onNextClick: tn, previousMonth: I, nextMonth: L }),
        _.map((ae, ge) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[ne.Month],
            style: w?.[ne.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ge,
            displayIndex: ge,
            calendarMonth: ae
          },
          u === "around" && !t.hideNavigation && ge === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[ne.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": _n(I), onClick: en, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: a[ne.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[ne.MonthCaption], style: w?.[ne.MonthCaption], calendarMonth: ae, displayIndex: ge }, c?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: a[ne.Dropdowns], style: w?.[ne.Dropdowns] },
            (() => {
              const oe = c === "dropdown" || c === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: a[ne.MonthsDropdown], "aria-label": je(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: xr(ae.date), options: xh(ae.date, W, V, r, s), style: w?.[ne.Dropdown], value: s.getMonth(ae.date) }) : X.createElement("span", { key: "month" }, C(ae.date, s)), me = c === "dropdown" || c === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: a[ne.YearsDropdown], "aria-label": br(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Po(ae.date), options: Mh(W, V, r, s, !!t.reverseYears), style: w?.[ne.Dropdown], value: s.getYear(ae.date) }) : X.createElement("span", { key: "year" }, A(ae.date, s));
              return s.getMonthYearOrder() === "year-first" ? [me, oe] : [oe, me];
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
            } }, k(ae.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: a[ne.CaptionLabel], role: "status", "aria-live": "polite" }, k(ae.date, s.options, s))
          )),
          u === "around" && !t.hideNavigation && ge === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: a[ne.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": $n(L), onClick: tn, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: a[ne.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ge === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[ne.Nav], style: w?.[ne.Nav], "aria-label": Et(), onPreviousClick: en, onNextClick: tn, previousMonth: I, nextMonth: L }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": De(ae.date, s.options, s) || void 0, className: a[ne.MonthGrid], style: w?.[ne.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[ne.Weekdays], style: w?.[ne.Weekdays] },
              S && X.createElement(n.WeekNumberHeader, { "aria-label": vr(s.options), className: a[ne.WeekNumberHeader], style: w?.[ne.WeekNumberHeader], scope: "col" }, T()),
              Jt.map((oe) => X.createElement(n.Weekday, { "aria-label": gr(oe, s.options, s), className: a[ne.Weekday], key: String(oe), style: w?.[ne.Weekday], scope: "col" }, N(oe, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[ne.Weeks], style: w?.[ne.Weeks] }, ae.weeks.map((oe) => X.createElement(
              n.Week,
              { className: a[ne.Week], key: oe.weekNumber, style: w?.[ne.Week], week: oe },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: oe, style: w?.[ne.WeekNumber], "aria-label": yr(oe.weekNumber, {
                locale: i
              }), className: a[ne.WeekNumber], scope: "row", role: "rowheader" }, E(oe.weekNumber, s)),
              oe.days.map((me) => {
                const { date: Oe } = me, de = K(me);
                if (de[ve.focused] = !de.hidden && !!H?.isEqualTo(me), de[Ze.selected] = j?.(Oe) || de.selected, oa(J)) {
                  const { from: ft, to: Bn } = J;
                  de[Ze.range_start] = !!(ft && Bn && s.isSameDay(Oe, ft)), de[Ze.range_end] = !!(ft && Bn && s.isSameDay(Oe, Bn)), de[Ze.range_middle] = vt(J, Oe, !0, s);
                }
                const zn = kh(de, w, t.modifiersStyles), We = lh(de, a, t.modifiersClassNames), dt = !Hn && !de.hidden ? we(Oe, de, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Oe, "yyyy-MM-dd")}_${s.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: de, className: We.join(" "), style: zn, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": dt, "data-day": s.format(Oe, "yyyy-MM-dd"), "data-month": me.outside ? s.format(Oe, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && Hn ? X.createElement(n.DayButton, { className: a[ne.DayButton], style: w?.[ne.DayButton], type: "button", day: me, modifiers: de, disabled: de.disabled || void 0, tabIndex: F(me) ? 0 : -1, "aria-label": fe(Oe, de, s.options, s), onClick: wr(me, de), onBlur: Ao(me, de), onFocus: No(me, de), onKeyDown: Ro(me, de), onMouseEnter: Lo(me, de), onMouseLeave: Io(me, de) }, D(Oe, s.options, s)) : !de.hidden && D(me.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      X.createElement(n.Footer, { className: a[ne.Footer], style: w?.[ne.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function tl(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = tl(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function nl() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = tl(e)) && (r && (r += " "), r += t);
  return r;
}
const aa = "-", ig = (e) => {
  const t = lg(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(aa);
      return a[0] === "" && a.length !== 1 && a.shift(), rl(a, t) || cg(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, rl = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? rl(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(aa);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, hi = /^\[(.+)\]$/, cg = (e) => {
  if (hi.test(e)) {
    const t = hi.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, lg = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    ys(n[o], r, o, t);
  return r;
}, ys = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : gi(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (ug(o)) {
        ys(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      ys(i, gi(t, s), n, r);
    });
  });
}, gi = (e, t) => {
  let n = e;
  return t.split(aa).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, ug = (e) => e.isThemeGetter, dg = (e) => {
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
}, vs = "!", bs = ":", fg = bs.length, mg = (e) => {
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
        if (g === bs) {
          s.push(o.slice(c, h)), c = h + fg;
          continue;
        }
        if (g === "/") {
          l = h;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? a++ : g === ")" && a--;
    }
    const u = s.length === 0 ? o : o.substring(c), d = pg(u), f = d !== u, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + bs, s = r;
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
}, pg = (e) => e.endsWith(vs) ? e.substring(0, e.length - 1) : e.startsWith(vs) ? e.substring(1) : e, hg = (e) => {
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
}, gg = (e) => ({
  cache: dg(e.cacheSize),
  parseClassName: mg(e),
  sortModifiers: hg(e),
  ...ig(e)
}), yg = /\s+/, vg = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(yg);
  let c = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const u = a[l], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: h,
      maybePostfixModifierPosition: g
    } = n(u);
    if (d) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!g, v = r(y ? h.substring(0, g) : h);
    if (!v) {
      if (!y) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (v = r(h), !v) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      y = !1;
    }
    const b = s(f).join(":"), x = p ? b + vs : b, S = x + v;
    if (i.includes(S))
      continue;
    i.push(S);
    const w = o(v, y);
    for (let k = 0; k < w.length; ++k) {
      const D = w[k];
      i.push(x + D);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function bg() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = ol(t)) && (r && (r += " "), r += n);
  return r;
}
const ol = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = ol(e[r])) && (n && (n += " "), n += t);
  return n;
};
function wg(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = gg(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const u = vg(c, n);
    return o(c, u), u;
  }
  return function() {
    return s(bg.apply(null, arguments));
  };
}
const Me = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, sl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, al = /^\((?:(\w[\w-]*):)?(.+)\)$/i, xg = /^\d+\/\d+$/, kg = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Cg = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Mg = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Sg = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Eg = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, an = (e) => xg.test(e), le = (e) => !!e && !Number.isNaN(Number(e)), At = (e) => !!e && Number.isInteger(Number(e)), Go = (e) => e.endsWith("%") && le(e.slice(0, -1)), ht = (e) => kg.test(e), Tg = () => !0, Dg = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Cg.test(e) && !Mg.test(e)
), il = () => !1, Ng = (e) => Sg.test(e), Ag = (e) => Eg.test(e), Rg = (e) => !ee(e) && !te(e), Lg = (e) => Rn(e, ul, il), ee = (e) => sl.test(e), Ft = (e) => Rn(e, dl, Dg), qo = (e) => Rn(e, $g, le), yi = (e) => Rn(e, cl, il), Ig = (e) => Rn(e, ll, Ag), Tr = (e) => Rn(e, fl, Ng), te = (e) => al.test(e), Vn = (e) => Ln(e, dl), Pg = (e) => Ln(e, Hg), vi = (e) => Ln(e, cl), Og = (e) => Ln(e, ul), _g = (e) => Ln(e, ll), Dr = (e) => Ln(e, fl, !0), Rn = (e, t, n) => {
  const r = sl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Ln = (e, t, n = !1) => {
  const r = al.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, cl = (e) => e === "position" || e === "percentage", ll = (e) => e === "image" || e === "url", ul = (e) => e === "length" || e === "size" || e === "bg-size", dl = (e) => e === "length", $g = (e) => e === "number", Hg = (e) => e === "family-name", fl = (e) => e === "shadow", Wg = () => {
  const e = Me("color"), t = Me("font"), n = Me("text"), r = Me("font-weight"), o = Me("tracking"), s = Me("leading"), i = Me("breakpoint"), a = Me("container"), c = Me("spacing"), l = Me("radius"), u = Me("shadow"), d = Me("inset-shadow"), f = Me("text-shadow"), p = Me("drop-shadow"), h = Me("blur"), g = Me("perspective"), y = Me("aspect"), v = Me("ease"), b = Me("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], w = () => [...S(), te, ee], k = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], C = () => [te, ee, c], E = () => [an, "full", "auto", ...C()], T = () => [At, "none", "subgrid", te, ee], N = () => ["auto", {
    span: ["full", At, te, ee]
  }, At, te, ee], A = () => [At, "auto", te, ee], P = () => ["auto", "min", "max", "fr", te, ee], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], _ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...C()], V = () => [an, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], I = () => [e, te, ee], L = () => [...S(), vi, yi, {
    position: [te, ee]
  }], z = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], K = () => ["auto", "cover", "contain", Og, Lg, {
    size: [te, ee]
  }], j = () => [Go, Vn, Ft], G = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    te,
    ee
  ], J = () => ["", le, Vn, Ft], $ = () => ["solid", "dashed", "dotted", "double"], H = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => [le, Go, vi, yi], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    te,
    ee
  ], ue = () => ["none", le, te, ee], fe = () => ["none", le, te, ee], we = () => [le, te, ee], De = () => [an, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ht],
      breakpoint: [ht],
      color: [Tg],
      container: [ht],
      "drop-shadow": [ht],
      ease: ["in", "out", "in-out"],
      font: [Rg],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ht],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ht],
      shadow: [ht],
      spacing: ["px", le],
      text: [ht],
      "text-shadow": [ht],
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
        aspect: ["auto", "square", an, ee, te, y]
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
        columns: [le, ee, te, a]
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
        z: [At, "auto", te, ee]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [an, "full", "auto", a, ...C()]
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
        flex: [le, an, "auto", "initial", "none", ee]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", le, te, ee]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", le, te, ee]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [At, "first", "last", "none", te, ee]
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
        content: ["normal", ...O()]
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
        "place-content": O()
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
        size: V()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...V()]
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
          ...V()
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
          ...V()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...V()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...V()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...V()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Vn, Ft]
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
        font: [r, te, qo]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Go, ee]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Pg, ee, t]
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
        tracking: [o, te, ee]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [le, "none", te, qo]
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
        "list-image": ["none", te, ee]
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
        list: ["disc", "decimal", "none", te, ee]
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
        decoration: [le, "from-font", "auto", te, Ft]
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
        "underline-offset": [le, "auto", te, ee]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", te, ee]
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
        content: ["none", te, ee]
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
        bg: z()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: K()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, At, te, ee],
          radial: ["", te, ee],
          conic: [At, te, ee]
        }, _g, Ig]
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
        rounded: G()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": G()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": G()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": G()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": G()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": G()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": G()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": G()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": G()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": G()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": G()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": G()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": G()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": G()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": G()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: J()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": J()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": J()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": J()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": J()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": J()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": J()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": J()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": J()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": J()
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
        "divide-y": J()
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
        "outline-offset": [le, te, ee]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", le, Vn, Ft]
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
          u,
          Dr,
          Tr
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
        "inset-shadow": ["none", d, Dr, Tr]
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
        ring: J()
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
        "ring-offset": [le, Ft]
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
        "inset-ring": J()
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
        "text-shadow": ["none", f, Dr, Tr]
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
        opacity: [le, te, ee]
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
        "mask-linear": [le]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": F()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": F()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": F()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": F()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": F()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": F()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": F()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": F()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": F()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": F()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": F()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": F()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": F()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": F()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": I()
      }],
      "mask-image-radial": [{
        "mask-radial": [te, ee]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": F()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": F()
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
        "mask-conic-from": F()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": F()
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
        mask: z()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: K()
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
        mask: ["none", te, ee]
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
          te,
          ee
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Z()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [le, te, ee]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [le, te, ee]
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
          Dr,
          Tr
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
        grayscale: ["", le, te, ee]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [le, te, ee]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", le, te, ee]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [le, te, ee]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", le, te, ee]
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
          te,
          ee
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Z()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [le, te, ee]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [le, te, ee]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", le, te, ee]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [le, te, ee]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", le, te, ee]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [le, te, ee]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [le, te, ee]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", le, te, ee]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", te, ee]
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
        duration: [le, "initial", te, ee]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", v, te, ee]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [le, te, ee]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, te, ee]
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
        perspective: [g, te, ee]
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
        skew: we()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": we()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": we()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [te, ee, "", "none", "gpu", "cpu"]
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
        translate: De()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": De()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": De()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": De()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", te, ee]
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
        "will-change": ["auto", "scroll", "contents", "transform", te, ee]
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
        stroke: [le, Vn, Ft, qo]
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
}, zg = /* @__PURE__ */ wg(Wg);
function ie(...e) {
  return zg(nl(e));
}
function bi(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function go(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = bi(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : bi(e[o], null);
        }
      };
  };
}
function Le(...e) {
  return M.useCallback(go(...e), e);
}
// @__NO_SIDE_EFFECTS__
function nr(e) {
  const t = /* @__PURE__ */ Fg(e), n = M.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = M.Children.toArray(s), c = a.find(Yg);
    if (c) {
      const l = c.props.children, u = a.map((d) => d === c ? M.Children.count(l) > 1 ? M.Children.only(null) : M.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ m(t, { ...i, ref: o, children: M.isValidElement(l) ? M.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ m(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Bg = /* @__PURE__ */ nr("Slot");
// @__NO_SIDE_EFFECTS__
function Fg(e) {
  const t = M.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (M.isValidElement(o)) {
      const i = Vg(o), a = jg(s, o.props);
      return o.type !== M.Fragment && (a.ref = r ? go(r, i) : i), M.cloneElement(o, a);
    }
    return M.Children.count(o) > 1 ? M.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ml = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Ug(e) {
  const t = ({ children: n }) => /* @__PURE__ */ m(Ee, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = ml, t;
}
function Yg(e) {
  return M.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ml;
}
function jg(e, t) {
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
function Vg(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const wi = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, xi = nl, Kg = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return xi(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const u = n?.[l], d = s?.[l];
    if (u === null) return null;
    const f = wi(u) || wi(d);
    return o[l][f];
  }), a = n && Object.entries(n).reduce((l, u) => {
    let [d, f] = u;
    return f === void 0 || (l[d] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, u) => {
    let { class: d, className: f, ...p } = u;
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
      d,
      f
    ] : l;
  }, []);
  return xi(e, i, c, n?.class, n?.className);
}, ws = Kg(
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
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ m(
    r ? Bg : "button",
    {
      "data-slot": "button",
      className: ie(ws({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function Gg({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const c = sa();
  return /* @__PURE__ */ m(
    ag,
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
          ws({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: ie(
          ws({ variant: o }),
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
        Root: ({ className: l, rootRef: u, ...d }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: ie(l),
            ...d
          }
        ),
        Chevron: ({ className: l, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(Yd, { className: ie("size-4", l), ...d }) : u === "right" ? /* @__PURE__ */ m(
          jd,
          {
            className: ie("size-4", l),
            ...d
          }
        ) : /* @__PURE__ */ m(Vd, { className: ie("size-4", l), ...d }),
        DayButton: qg,
        WeekNumber: ({ children: l, ...u }) => /* @__PURE__ */ m("td", { ...u, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function qg({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = sa(), s = M.useRef(null);
  return M.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
    It,
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
let hn = null;
const pl = /* @__PURE__ */ new Map(), Xg = /* @__PURE__ */ new Map();
function jr() {
  if (!hn) return;
  const e = hn;
  hn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Zg(e) {
  return hn?.pillDate === e;
}
function Qg({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = Y(null), i = yo(e);
  q(() => {
    const b = (x) => {
      x.key === "Escape" && (x.stopPropagation(), x.preventDefault(), o());
    };
    return document.addEventListener("keydown", b, !0), () => document.removeEventListener("keydown", b, !0);
  }, [o]), q(() => {
    const b = (S) => {
      s.current && !s.current.contains(S.target) && (S.target.closest(".date-pill") || o());
    }, x = setTimeout(() => {
      document.addEventListener("mousedown", b, !0);
    }, 50);
    return () => {
      clearTimeout(x), document.removeEventListener("mousedown", b, !0);
    };
  }, [o]);
  const a = B((b) => {
    b && r(yn(b)), o();
  }, [r, o]), c = B((b) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + b), r(yn(x)), o();
  }, [r, o]), l = B(() => {
    const x = (/* @__PURE__ */ new Date()).getDay(), S = x === 0 ? 1 : 8 - x, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + S), r(yn(w)), o();
  }, [r, o]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), h = u.getDay(), g = h === 0 ? 1 : 8 - h, y = new Date(u);
  y.setDate(y.getDate() + g);
  const v = y.toDateString();
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
            Gg,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }),
          /* @__PURE__ */ R("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              It,
              {
                variant: "outline",
                size: "sm",
                className: ie(
                  "rounded-full text-xs",
                  i.toDateString() === d && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ m(
              It,
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
              It,
              {
                variant: "outline",
                size: "sm",
                className: ie(
                  "rounded-full text-xs",
                  i.toDateString() === v && "ring-2 ring-primary"
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
function Jg(e, t, n) {
  if (Zg(t)) {
    jr();
    return;
  }
  jr();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, u = s - r.bottom - c - l, d = r.top - c - l, f = u >= a ? "below" : d >= a ? "above" : u >= d ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + c : p = r.top - a - c;
  const h = r.left + r.width / 2;
  let g = h - i / 2;
  g + i > o - l && (g = o - i - l), g < l && (g = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    y.addEventListener(w, (k) => {
      k.stopPropagation();
    }, !1);
  });
  const b = Ef(y);
  hn = { container: y, root: b, pillDate: t };
  const x = () => {
    jr();
  }, S = (w) => {
    const k = pl.get(t);
    k && k(w);
  };
  b.render(
    /* @__PURE__ */ m(
      Qg,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: g, direction: f, pillCenter: h },
        onSelectDate: S,
        onClose: x
      }
    )
  );
}
function ey({ node: e, updateAttributes: t, selected: n }) {
  const r = Y(null), o = e.attrs.date || gn(), s = hl(o), i = ia(o), a = B(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const u = c.getAttribute("data-theme");
      if (u) return u;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return q(() => (pl.set(o, (c) => {
    t({ date: c });
  }), Xg.set(o, a), () => {
  }), [o, t, a]), q(() => {
    const c = r.current;
    if (!c) return;
    const l = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = c.getAttribute("data-date") || gn(), f = a();
      Jg(c, d, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), q(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      hn && jr();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ m(kn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ m(gc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ m("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function yo(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function gn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Zn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function yn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function hl(e) {
  const t = yo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function ty(e) {
  return yo(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Yt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return gn();
  if (n === "tomorrow") return Zn(1);
  if (n === "yesterday") return Zn(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return Zn(c);
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
      const c = parseInt(r[2], 10), l = r[3] ? parseInt(r[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), u = new Date(l, a, c);
      return yn(u);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return yn(i);
  }
  return null;
}
function ia(e) {
  const t = yo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const ny = new Ie("datePillPaste"), ry = mo.create({
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
        default: gn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = hl(n), o = ia(n);
    return [
      "span",
      Nn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return co(ey, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || gn();
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
    const e = new $e({
      find: /@today\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(gn()).run();
      }
    }), t = new $e({
      find: /@tomorrow\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Zn(1)).run();
      }
    }), n = new $e({
      find: /@yesterday\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Zn(-1)).run();
      }
    }), r = new $e({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), o = new $e({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
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
        }[f[1].toLowerCase()];
        if (h !== void 0) {
          const g = (/* @__PURE__ */ new Date()).getFullYear(), y = new Date(g, h, parseInt(f[2], 10));
          d().deleteRange(u).insertDatePill(yn(y)).run();
        }
      }
    }), s = new $e({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Yt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), i = new $e({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Yt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), a = new $e({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), c = new $e({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Yt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), l = new $e({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Yt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
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
        key: ny,
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
              if (Yt(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = new RegExp(i.source, i.flags);
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const S = y[1], w = Yt(S);
              if (w) {
                const k = o.slice(h, y.index);
                k && p.push(f.text(k)), p.push(e.create({ date: w })), h = y.index + y[0].length;
              }
            }
            const v = o.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const b = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: x } = u.selection;
            if (x.parent.type.name === "paragraph") {
              const S = d;
              let w = u.selection.from;
              for (const k of p)
                S.insert(w, k), w += k.nodeSize;
              S.delete(u.selection.from, u.selection.to), t.dispatch(S);
            } else
              d.replaceSelectionWith(b), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Xe = /* @__PURE__ */ new Map();
function oy({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = Y(null), i = Y(null), a = e.attrs.tag || "", c = Y(!1), [l, u] = U(() => Xe.has(a)), [d, f] = U(() => Xe.get(a)?.value ?? a);
  q(() => {
    l || f(a);
  }, [a, l]), q(() => {
    if (l) {
      const b = Xe.get(a);
      Xe.set(a, {
        value: d,
        focusedAt: b?.focusedAt ?? Date.now()
      });
    }
  }, [l, d, a]);
  const p = B((b) => {
    if (c.current) return;
    c.current = !0;
    const x = b.trim().replace(/^#/, ""), S = Qn(x);
    if (Xe.delete(a), S && Xe.delete(S), !S || !mn(S))
      o();
    else if (S !== a) {
      const w = r();
      if (typeof w == "number" && n) {
        const { tr: k } = n.state, D = e.nodeSize;
        k.delete(w, w + D), k.insert(w, n.schema.nodes.tagPill.create({ tag: S })), n.view.dispatch(k);
      }
    } else
      Xe.delete(a);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), h = B(() => {
    n && !n.isEditable || (Xe.set(a, { value: a, focusedAt: Date.now() }), f(a), u(!0), c.current = !1);
  }, [n, a]);
  q(() => {
    const b = s.current;
    if (!b || l) return;
    const x = (w) => {
      w.preventDefault(), w.stopPropagation(), h();
    }, S = (w) => {
      w.preventDefault(), w.stopPropagation();
    };
    return b.addEventListener("dblclick", x), b.addEventListener("click", S), () => {
      b.removeEventListener("dblclick", x), b.removeEventListener("click", S);
    };
  }, [l, n, r, h]), q(() => {
    if (l) {
      const b = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const x = Xe.get(a);
          x && (x.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(b);
    }
  }, [l, a]);
  const g = B((b) => {
    b.key === "Enter" ? (b.preventDefault(), p(d)) : b.key === "Escape" && (b.preventDefault(), Xe.delete(a), u(!1), c.current = !0, n?.commands.focus());
  }, [p, d, a, n]), y = B(() => {
    const x = Xe.get(a)?.focusedAt ?? 0;
    Date.now() - x > 300 && p(d);
  }, [p, d, a]), v = B((b) => {
    f(b.target.value);
  }, []);
  return l ? /* @__PURE__ */ m(kn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Ga, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m(
          "input",
          {
            ref: i,
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
  ) }) : /* @__PURE__ */ m(kn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Ga, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function mn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Qn(e) {
  return e.toLowerCase().trim();
}
const sy = new Ie("tagPillPaste"), ay = mo.create({
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
      Nn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return co(oy, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Qn(e);
        return mn(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new $e({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = Qn(r[1]);
        if (mn(o)) {
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
        key: sy,
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
              if (mn(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const x = Qn(y[1]);
              if (mn(x)) {
                const S = y[0], w = S.startsWith(" ") || S.startsWith(`
`) ? 1 : 0, k = o.slice(h, y.index + w);
                k && p.push(f.text(k)), p.push(e.create({ tag: x })), h = y.index + S.length;
              }
            }
            const v = o.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const { $from: b } = u.selection;
            if (b.parent.type.name === "paragraph") {
              const x = d;
              let S = u.selection.from;
              for (const w of p)
                x.insert(S, w), S += w.nodeSize;
              x.delete(u.selection.from, u.selection.to), t.dispatch(x);
            } else {
              const x = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
              );
              d.replaceSelectionWith(x), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
});
function gl({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = U(""), [i, a] = U(""), [c, l] = U(""), [u, d] = U(!1), f = Y(null), p = Y(null);
  q(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), q(() => {
    if (!e) return;
    const b = (w) => {
      p.current && !p.current.contains(w.target) && t();
    }, x = (w) => {
      w.key === "Escape" && t();
    }, S = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return document.addEventListener("keydown", x), () => {
      clearTimeout(S), document.removeEventListener("mousedown", b), document.removeEventListener("keydown", x);
    };
  }, [e, t]);
  const h = (b) => {
    if (!b.trim())
      return l("Please enter an image URL"), !1;
    try {
      const x = new URL(b);
      if (!["http:", "https:", "data:"].includes(x.protocol))
        return l("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return l("Please enter a valid URL"), !1;
    }
    return l(""), !0;
  }, g = async () => {
    if (!h(o)) return;
    d(!0);
    const b = new window.Image();
    b.onload = () => {
      d(!1), n(o.trim(), i.trim()), t();
    }, b.onerror = () => {
      d(!1), n(o.trim(), i.trim()), t();
    }, setTimeout(() => {
      u && (d(!1), n(o.trim(), i.trim()), t());
    }, 3e3), b.src = o.trim();
  }, y = (b) => {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), g());
  };
  if (!e) return null;
  const v = r ? {
    top: r.top,
    left: Math.min(r.left, typeof window < "u" ? window.innerWidth - 340 : r.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ R(
    "div",
    {
      ref: p,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof v.top == "number", v.top),
        left: typeof v.left == "number" ? Math.max(8, v.left) : v.left,
        transform: r ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ R("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ m(Gs, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(xt, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ R("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ R("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(Hs, { size: 12 }),
              "Image URL"
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: f,
                type: "url",
                value: o,
                onChange: (b) => {
                  s(b.target.value), c && l("");
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
              /* @__PURE__ */ m(fo, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: i,
                onChange: (b) => a(b.target.value),
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
                onClick: g,
                disabled: u || !o.trim(),
                className: "image-url-dialog-btn image-url-dialog-btn-insert",
                children: u ? "Validating..." : "Insert Image"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const iy = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(fo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(Kd, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(Gd, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(qd, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(Xd, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(Zd, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(js, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(Vs, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(Ks, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(Ys, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(yc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(ps, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(Gs, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ m(vc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(Xr, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(bc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(wc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(qs, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(Xs, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(gc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(Hs, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], cy = 32, ly = 8, uy = 320, dy = 210, Nr = 12;
function ki(e) {
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
function fy({ editor: e }) {
  const [t, n] = U(!1), [r, o] = U(""), [s, i] = U(0), [a, c] = U(null), [l, u] = U(!1), [d, f] = U({ top: 0, left: 0 }), [p, h] = U("below"), g = Y(null), y = Y(-1), v = Y(!1);
  q(() => {
    v.current = t;
  }, [t]);
  const b = iy.filter((E) => {
    if (!r) return !0;
    const T = r.toLowerCase();
    return E.title.toLowerCase().includes(T) || E.keywords?.some((N) => N.includes(T));
  }), x = Math.min(
    b.length * cy + ly,
    uy
  );
  lo(() => {
    if (!t || !a) return;
    const { top: E, bottom: T, left: N } = a, A = window.innerHeight, P = window.innerWidth, O = A - T - Nr, _ = E - Nr;
    let W;
    if (O >= x ? W = "below" : _ >= x ? W = "above" : W = O >= _ ? "below" : "above", h(W), g.current) {
      const V = Math.max(
        Nr,
        Math.min(N, P - dy - Nr)
      ), I = W === "below" ? T + 4 : E - x - 4;
      g.current.style.top = `${I}px`, g.current.style.left = `${V}px`;
    }
  }, [t, a, x, b.length]);
  const S = B(() => {
    const { state: E } = e, { selection: T } = E, N = T.from, A = y.current;
    if (A >= 0 && A <= N)
      e.chain().focus().deleteRange({ from: A, to: N }).run();
    else {
      const { $from: P } = T, _ = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if (_ !== -1) {
        const W = P.pos - (P.parentOffset - _);
        e.chain().focus().deleteRange({ from: W, to: P.pos }).run();
      }
    }
  }, [e]), w = B(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), k = B((E) => {
    const T = b[E];
    if (T) {
      if (S(), T.isImageCommand) {
        const { state: N } = e, A = e.view.coordsAtPos(N.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), u(!0);
      } else
        T.command(e);
      w();
    }
  }, [e, b, S, w]), D = B((E, T) => {
    e.chain().focus().setImage({ src: E, alt: T }).run();
  }, [e]);
  return q(() => {
    if (!e) return;
    const E = () => {
      if (v.current) return;
      const { state: T } = e, { selection: N } = T, { $from: A } = N;
      if (A.parentOffset === 0) return;
      const P = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = A.pos - 1;
      const _ = ki(e);
      _ && (c(_), n(!0), o(""), i(0));
    };
    return e.on("update", E), () => {
      e.off("update", E);
    };
  }, [e]), q(() => {
    if (!e || !t) return;
    const E = e.view.dom, T = (N) => {
      v.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A + 1) % b.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A - 1 + b.length) % b.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), k(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), w()));
    };
    return E.addEventListener("keydown", T, !0), () => {
      E.removeEventListener("keydown", T, !0);
    };
  }, [e, t, s, b, k, w]), q(() => {
    if (!e || !t) return;
    const E = () => {
      if (!v.current || y.current < 0) return;
      const { state: T } = e, { selection: N } = T, A = N.from, P = y.current;
      if (A <= P) {
        w();
        return;
      }
      try {
        const O = T.doc.textBetween(P + 1, A, void 0, "￼");
        if (O.includes(`
`)) {
          w();
          return;
        }
        o(O), i(0);
        const _ = ki(e);
        _ && c(_);
      } catch {
        w();
      }
    };
    return e.on("update", E), e.on("selectionUpdate", E), () => {
      e.off("update", E), e.off("selectionUpdate", E);
    };
  }, [e, t, w]), q(() => {
    if (!t) return;
    const E = (T) => {
      g.current && !g.current.contains(T.target) && w();
    };
    return document.addEventListener("mousedown", E), () => document.removeEventListener("mousedown", E);
  }, [t, w]), q(() => {
    t && b.length === 0 && r.length > 2 && w();
  }, [t, b.length, r, w]), q(() => {
    s >= b.length && i(Math.max(0, b.length - 1));
  }, [b.length, s]), q(() => {
    if (!t || !g.current) return;
    const E = g.current.querySelector(".slash-item.is-selected");
    E && E.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ m(
    gl,
    {
      isOpen: l,
      onClose: () => u(!1),
      onInsert: D,
      position: d
    }
  ) : !t || b.length === 0 ? null : /* @__PURE__ */ m(St, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: g,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: b.map((E, T) => /* @__PURE__ */ R(
        "div",
        {
          className: `slash-item ${T === s ? "is-selected" : ""}`,
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation(), k(T);
          },
          onMouseEnter: () => i(T),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: E.icon }),
            /* @__PURE__ */ m("span", { className: "slash-label", children: E.title })
          ]
        },
        E.title
      ))
    }
  ) });
}
const my = 340, py = 36, hy = 8, gy = 240, Ar = 8;
function Ci(e) {
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
function yy({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = U(!1), [s, i] = U(""), [a, c] = U([]), [l, u] = U(0), [d, f] = U(null), [p, h] = U("below"), [g, y] = U(!1), v = Y(!1), b = Y(null), x = Y(-1), S = Y(null);
  q(() => {
    v.current = r;
  }, [r]);
  const w = B(() => {
    o(!1), i(""), c([]), u(0), x.current = -1;
  }, []), k = B((N) => {
    const A = x.current;
    if (A < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const _ = P.tr.delete(A, O), W = P.schema.marks.wikiLink;
      if (W) {
        const V = W.create({ pageName: N }), I = P.schema.text(N, [V]);
        _.insert(A, I);
        const L = A + N.length;
        _.setSelection(at.create(_.doc, L)), _.removeStoredMark(W);
      } else
        _.insertText(`[[${N}]]`, A);
      e.view.dispatch(_), e.view.focus();
    } catch (_) {
      console.warn("WikiLinkAutocomplete: Error inserting link", _);
    }
    w();
  }, [e, w]);
  q(() => {
    if (!e) return;
    const N = () => {
      if (v.current) return;
      const { state: A } = e, { selection: P } = A, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      x.current = O.pos - 2;
      const W = Ci(e);
      W && (f(W), o(!0), i(""), c([]), u(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), q(() => {
    if (!e || !r) return;
    const N = e.view.dom, A = (P) => {
      if (v.current) {
        if (P.key === "ArrowDown") {
          P.preventDefault();
          const O = a.length + (s.trim() ? 1 : 0) - 1;
          u((_) => Math.min(_ + 1, O));
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), u((O) => Math.max(O - 1, 0));
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
          const { state: O } = e, { $from: _ } = O.selection;
          _.parent.textBetween(0, _.parentOffset, void 0, "￼").endsWith("]]") && w();
        }, 0);
      }
    };
    return N.addEventListener("keydown", A, !0), () => {
      N.removeEventListener("keydown", A, !0);
    };
  }, [e, r, a, l, s, k, w, n]), q(() => {
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
        const _ = P.doc.textBetween(A + 2, O, void 0, "￼");
        if (_.includes(`
`) || _.includes("]]")) {
          w();
          return;
        }
        i(_), u(0);
        const W = Ci(e);
        W && f(W);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, w]), q(() => {
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
  }, [r, s, t]), q(() => {
    if (!r) return;
    const N = (A) => {
      b.current && !b.current.contains(A.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, w]), q(() => {
    if (!r || !b.current) return;
    const N = b.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const D = a.length + (s.trim() ? 1 : 0), C = Math.min(
    Math.max(D, 1) * py + hy,
    gy
  );
  if (lo(() => {
    if (!r || !d) return;
    const { top: N, bottom: A, left: P } = d, O = window.innerHeight, _ = window.innerWidth, W = O - A - Ar, V = N - Ar;
    let I;
    if (W >= C ? I = "below" : V >= C ? I = "above" : I = W >= V ? "below" : "above", h(I), b.current) {
      const L = Math.max(
        Ar,
        Math.min(P, _ - my - Ar)
      ), z = I === "below" ? A + 4 : N - C - 4;
      b.current.style.top = `${z}px`, b.current.style.left = `${L}px`;
    }
  }, [r, d, C, D]), !r) return null;
  const E = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(St, { children: /* @__PURE__ */ R(
    "div",
    {
      ref: b,
      className: `wikilink-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: [
        g && a.length === 0 && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
        a.map((N, A) => /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item ${A === l ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), k(N.title);
            },
            onMouseEnter: () => u(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Zs, { size: 14 }) }),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        E && /* @__PURE__ */ R(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), w()) : k(s.trim());
            },
            onMouseEnter: () => u(a.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Qs, { size: 14 }) }),
              /* @__PURE__ */ R("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] })
            ]
          }
        ),
        !g && a.length === 0 && !s.trim() && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }) })
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
function In(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = M.createContext(i), c = n.length;
    n = [...n, i];
    const l = (d) => {
      const { scope: f, children: p, ...h } = d, g = f?.[e]?.[c] || a, y = M.useMemo(() => h, Object.values(h));
      return /* @__PURE__ */ m(g.Provider, { value: y, children: p });
    };
    l.displayName = s + "Provider";
    function u(d, f) {
      const p = f?.[e]?.[c] || a, h = M.useContext(p);
      if (h) return h;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [l, u];
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
  return o.scopeName = e, [r, vy(o, ...t)];
}
function vy(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const i = r.reduce((a, { useScope: c, scopeName: l }) => {
        const d = c(s)[`__scope${l}`];
        return { ...a, ...d };
      }, {});
      return M.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Ot = globalThis?.document ? M.useLayoutEffect : () => {
}, by = M[" useInsertionEffect ".trim().toString()] || Ot;
function ca({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = wy({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : o;
  {
    const u = M.useRef(e !== void 0);
    M.useEffect(() => {
      const d = u.current;
      d !== a && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = a;
    }, [a, r]);
  }
  const l = M.useCallback(
    (u) => {
      if (a) {
        const d = xy(u) ? u(e) : u;
        d !== e && i.current?.(d);
      } else
        s(u);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function wy({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = M.useState(e), o = M.useRef(n), s = M.useRef(t);
  return by(() => {
    s.current = t;
  }, [t]), M.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function xy(e) {
  return typeof e == "function";
}
var ky = [
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
], Ae = ky.reduce((e, t) => {
  const n = /* @__PURE__ */ nr(`Primitive.${t}`), r = M.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function yl(e, t) {
  e && mc.flushSync(() => e.dispatchEvent(t));
}
function vl(e) {
  const t = e + "CollectionProvider", [n, r] = In(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: y, children: v } = g, b = X.useRef(null), x = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: y, itemMap: x, collectionRef: b, children: v });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ nr(a), l = X.forwardRef(
    (g, y) => {
      const { scope: v, children: b } = g, x = s(a, v), S = Le(y, x.collectionRef);
      return /* @__PURE__ */ m(c, { ref: S, children: b });
    }
  );
  l.displayName = a;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ nr(u), p = X.forwardRef(
    (g, y) => {
      const { scope: v, children: b, ...x } = g, S = X.useRef(null), w = Le(y, S), k = s(u, v);
      return X.useEffect(() => (k.itemMap.set(S, { ref: S, ...x }), () => void k.itemMap.delete(S))), /* @__PURE__ */ m(f, { [d]: "", ref: w, children: b });
    }
  );
  p.displayName = u;
  function h(g) {
    const y = s(e + "CollectionConsumer", g);
    return X.useCallback(() => {
      const b = y.collectionRef.current;
      if (!b) return [];
      const x = Array.from(b.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (k, D) => x.indexOf(k.ref.current) - x.indexOf(D.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    h,
    r
  ];
}
var Cy = M.createContext(void 0);
function bl(e) {
  const t = M.useContext(Cy);
  return e || t || "ltr";
}
function kt(e) {
  const t = M.useRef(e);
  return M.useEffect(() => {
    t.current = e;
  }), M.useMemo(() => (...n) => t.current?.(...n), []);
}
function My(e, t = globalThis?.document) {
  const n = kt(e);
  M.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Sy = "DismissableLayer", xs = "dismissableLayer.update", Ey = "dismissableLayer.pointerDownOutside", Ty = "dismissableLayer.focusOutside", Mi, wl = M.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), la = M.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = M.useContext(wl), [u, d] = M.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, p] = M.useState({}), h = Le(t, (D) => d(D)), g = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(y), b = u ? g.indexOf(u) : -1, x = l.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= v, w = Ay((D) => {
      const C = D.target, E = [...l.branches].some((T) => T.contains(C));
      !S || E || (o?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f), k = Ry((D) => {
      const C = D.target;
      [...l.branches].some((T) => T.contains(C)) || (s?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f);
    return My((D) => {
      b === l.layers.size - 1 && (r?.(D), !D.defaultPrevented && a && (D.preventDefault(), a()));
    }, f), M.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Mi = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), Si(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Mi);
        };
    }, [u, f, n, l]), M.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), Si());
    }, [u, l]), M.useEffect(() => {
      const D = () => p({});
      return document.addEventListener(xs, D), () => document.removeEventListener(xs, D);
    }, []), /* @__PURE__ */ m(
      Ae.div,
      {
        ...c,
        ref: h,
        style: {
          pointerEvents: x ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ce(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: ce(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: ce(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
la.displayName = Sy;
var Dy = "DismissableLayerBranch", Ny = M.forwardRef((e, t) => {
  const n = M.useContext(wl), r = M.useRef(null), o = Le(t, r);
  return M.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ m(Ae.div, { ...e, ref: o });
});
Ny.displayName = Dy;
function Ay(e, t = globalThis?.document) {
  const n = kt(e), r = M.useRef(!1), o = M.useRef(() => {
  });
  return M.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          xl(
            Ey,
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
function Ry(e, t = globalThis?.document) {
  const n = kt(e), r = M.useRef(!1);
  return M.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && xl(Ty, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Si() {
  const e = new CustomEvent(xs);
  document.dispatchEvent(e);
}
function xl(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? yl(o, s) : o.dispatchEvent(s);
}
var Xo = 0;
function Ly() {
  M.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ei()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ei()), Xo++, () => {
      Xo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Xo--;
    };
  }, []);
}
function Ei() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Zo = "focusScope.autoFocusOnMount", Qo = "focusScope.autoFocusOnUnmount", Ti = { bubbles: !1, cancelable: !0 }, Iy = "FocusScope", kl = M.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = M.useState(null), l = kt(o), u = kt(s), d = M.useRef(null), f = Le(t, (g) => c(g)), p = M.useRef({
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
      let g = function(x) {
        if (p.paused || !a) return;
        const S = x.target;
        a.contains(S) ? d.current = S : Lt(d.current, { select: !0 });
      }, y = function(x) {
        if (p.paused || !a) return;
        const S = x.relatedTarget;
        S !== null && (a.contains(S) || Lt(d.current, { select: !0 }));
      }, v = function(x) {
        if (document.activeElement === document.body)
          for (const w of x)
            w.removedNodes.length > 0 && Lt(a);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const b = new MutationObserver(v);
      return a && b.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), b.disconnect();
      };
    }
  }, [r, a, p.paused]), M.useEffect(() => {
    if (a) {
      Ni.add(p);
      const g = document.activeElement;
      if (!a.contains(g)) {
        const v = new CustomEvent(Zo, Ti);
        a.addEventListener(Zo, l), a.dispatchEvent(v), v.defaultPrevented || (Py(Wy(Cl(a)), { select: !0 }), document.activeElement === g && Lt(a));
      }
      return () => {
        a.removeEventListener(Zo, l), setTimeout(() => {
          const v = new CustomEvent(Qo, Ti);
          a.addEventListener(Qo, u), a.dispatchEvent(v), v.defaultPrevented || Lt(g ?? document.body, { select: !0 }), a.removeEventListener(Qo, u), Ni.remove(p);
        }, 0);
      };
    }
  }, [a, l, u, p]);
  const h = M.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (y && v) {
        const b = g.currentTarget, [x, S] = Oy(b);
        x && S ? !g.shiftKey && v === S ? (g.preventDefault(), n && Lt(x, { select: !0 })) : g.shiftKey && v === x && (g.preventDefault(), n && Lt(S, { select: !0 })) : v === b && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ m(Ae.div, { tabIndex: -1, ...i, ref: f, onKeyDown: h });
});
kl.displayName = Iy;
function Py(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Lt(r, { select: t }), document.activeElement !== n) return;
}
function Oy(e) {
  const t = Cl(e), n = Di(t, e), r = Di(t.reverse(), e);
  return [n, r];
}
function Cl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Di(e, t) {
  for (const n of e)
    if (!_y(n, { upTo: t })) return n;
}
function _y(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function $y(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Lt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && $y(e) && t && e.select();
  }
}
var Ni = Hy();
function Hy() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Ai(e, t), e.unshift(t);
    },
    remove(t) {
      e = Ai(e, t), e[0]?.resume();
    }
  };
}
function Ai(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Wy(e) {
  return e.filter((t) => t.tagName !== "A");
}
var zy = M[" useId ".trim().toString()] || (() => {
}), By = 0;
function Zr(e) {
  const [t, n] = M.useState(zy());
  return Ot(() => {
    n((r) => r ?? String(By++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Fy = ["top", "right", "bottom", "left"], _t = Math.min, Fe = Math.max, Qr = Math.round, Rr = Math.floor, it = (e) => ({
  x: e,
  y: e
}), Uy = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Yy = {
  start: "end",
  end: "start"
};
function ks(e, t, n) {
  return Fe(e, _t(t, n));
}
function Ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Mt(e) {
  return e.split("-")[0];
}
function Pn(e) {
  return e.split("-")[1];
}
function ua(e) {
  return e === "x" ? "y" : "x";
}
function da(e) {
  return e === "y" ? "height" : "width";
}
const jy = /* @__PURE__ */ new Set(["top", "bottom"]);
function st(e) {
  return jy.has(Mt(e)) ? "y" : "x";
}
function fa(e) {
  return ua(st(e));
}
function Vy(e, t, n) {
  n === void 0 && (n = !1);
  const r = Pn(e), o = fa(e), s = da(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = Jr(i)), [i, Jr(i)];
}
function Ky(e) {
  const t = Jr(e);
  return [Cs(e), t, Cs(t)];
}
function Cs(e) {
  return e.replace(/start|end/g, (t) => Yy[t]);
}
const Ri = ["left", "right"], Li = ["right", "left"], Gy = ["top", "bottom"], qy = ["bottom", "top"];
function Xy(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Li : Ri : t ? Ri : Li;
    case "left":
    case "right":
      return t ? Gy : qy;
    default:
      return [];
  }
}
function Zy(e, t, n, r) {
  const o = Pn(e);
  let s = Xy(Mt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(Cs)))), s;
}
function Jr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Uy[t]);
}
function Qy(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ml(e) {
  return typeof e != "number" ? Qy(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function eo(e) {
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
function Ii(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = st(t), i = fa(t), a = da(i), c = Mt(t), l = s === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
  let p;
  switch (c) {
    case "top":
      p = {
        x: u,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (Pn(t)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const Jy = async (e, t, n) => {
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
    x: u,
    y: d
  } = Ii(l, r, c), f = r, p = {}, h = 0;
  for (let g = 0; g < a.length; g++) {
    const {
      name: y,
      fn: v
    } = a[g], {
      x: b,
      y: x,
      data: S,
      reset: w
    } = await v({
      x: u,
      y: d,
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
    u = b ?? u, d = x ?? d, p = {
      ...p,
      [y]: {
        ...p[y],
        ...S
      }
    }, w && h <= 50 && (h++, typeof w == "object" && (w.placement && (f = w.placement), w.rects && (l = w.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : w.rects), {
      x: u,
      y: d
    } = Ii(l, f, c)), g = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function rr(e, t) {
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
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = Ct(t, e), h = Ml(p), y = a[f ? d === "floating" ? "reference" : "floating" : d], v = eo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), b = d === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, x = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), S = await (s.isElement == null ? void 0 : s.isElement(x)) ? await (s.getScale == null ? void 0 : s.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = eo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: b,
    offsetParent: x,
    strategy: c
  }) : b);
  return {
    top: (v.top - w.top + h.top) / S.y,
    bottom: (w.bottom - v.bottom + h.bottom) / S.y,
    left: (v.left - w.left + h.left) / S.x,
    right: (w.right - v.right + h.right) / S.x
  };
}
const ev = (e) => ({
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
      padding: u = 0
    } = Ct(e, t) || {};
    if (l == null)
      return {};
    const d = Ml(u), f = {
      x: n,
      y: r
    }, p = fa(o), h = da(p), g = await i.getDimensions(l), y = p === "y", v = y ? "top" : "left", b = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", S = s.reference[h] + s.reference[p] - f[p] - s.floating[h], w = f[p] - s.reference[p], k = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let D = k ? k[x] : 0;
    (!D || !await (i.isElement == null ? void 0 : i.isElement(k))) && (D = a.floating[x] || s.floating[h]);
    const C = S / 2 - w / 2, E = D / 2 - g[h] / 2 - 1, T = _t(d[v], E), N = _t(d[b], E), A = T, P = D - g[h] - N, O = D / 2 - g[h] / 2 + C, _ = ks(A, O, P), W = !c.arrow && Pn(o) != null && O !== _ && s.reference[h] / 2 - (O < A ? T : N) - g[h] / 2 < 0, V = W ? O < A ? O - A : O - P : 0;
    return {
      [p]: f[p] + V,
      data: {
        [p]: _,
        centerOffset: O - _ - V,
        ...W && {
          alignmentOffset: V
        }
      },
      reset: W
    };
  }
}), tv = function(e) {
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
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: g = !0,
        ...y
      } = Ct(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = Mt(o), b = st(a), x = Mt(a) === a, S = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), w = f || (x || !g ? [Jr(a)] : Ky(a)), k = h !== "none";
      !f && k && w.push(...Zy(a, g, h, S));
      const D = [a, ...w], C = await rr(t, y), E = [];
      let T = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (u && E.push(C[v]), d) {
        const O = Vy(o, i, S);
        E.push(C[O[0]], C[O[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: E
      }], !E.every((O) => O <= 0)) {
        var N, A;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, _ = D[O];
        if (_ && (!(d === "alignment" ? b !== st(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((I) => st(I.placement) === b ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: T
            },
            reset: {
              placement: _
            }
          };
        let W = (A = T.filter((V) => V.overflows[0] <= 0).sort((V, I) => V.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!W)
          switch (p) {
            case "bestFit": {
              var P;
              const V = (P = T.filter((I) => {
                if (k) {
                  const L = st(I.placement);
                  return L === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((L) => L > 0).reduce((L, z) => L + z, 0)]).sort((I, L) => I[1] - L[1])[0]) == null ? void 0 : P[0];
              V && (W = V);
              break;
            }
            case "initialPlacement":
              W = a;
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
function Pi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Oi(e) {
  return Fy.some((t) => e[t] >= 0);
}
const nv = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Ct(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await rr(t, {
            ...o,
            elementContext: "reference"
          }), i = Pi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Oi(i)
            }
          };
        }
        case "escaped": {
          const s = await rr(t, {
            ...o,
            altBoundary: !0
          }), i = Pi(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Oi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Sl = /* @__PURE__ */ new Set(["left", "top"]);
async function rv(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Mt(n), a = Pn(n), c = st(n) === "y", l = Sl.has(i) ? -1 : 1, u = s && c ? -1 : 1, d = Ct(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: h
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return a && typeof h == "number" && (p = a === "end" ? h * -1 : h), c ? {
    x: p * u,
    y: f * l
  } : {
    x: f * l,
    y: p * u
  };
}
const ov = function(e) {
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
      } = t, c = await rv(t, e);
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
}, sv = function(e) {
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
              x: v,
              y: b
            } = y;
            return {
              x: v,
              y: b
            };
          }
        },
        ...c
      } = Ct(e, t), l = {
        x: n,
        y: r
      }, u = await rr(t, c), d = st(Mt(o)), f = ua(d);
      let p = l[f], h = l[d];
      if (s) {
        const y = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", b = p + u[y], x = p - u[v];
        p = ks(b, p, x);
      }
      if (i) {
        const y = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", b = h + u[y], x = h - u[v];
        h = ks(b, h, x);
      }
      const g = a.fn({
        ...t,
        [f]: p,
        [d]: h
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [f]: s,
            [d]: i
          }
        }
      };
    }
  };
}, av = function(e) {
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
      } = Ct(e, t), u = {
        x: n,
        y: r
      }, d = st(o), f = ua(d);
      let p = u[f], h = u[d];
      const g = Ct(a, t), y = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const x = f === "y" ? "height" : "width", S = s.reference[f] - s.floating[x] + y.mainAxis, w = s.reference[f] + s.reference[x] - y.mainAxis;
        p < S ? p = S : p > w && (p = w);
      }
      if (l) {
        var v, b;
        const x = f === "y" ? "width" : "height", S = Sl.has(Mt(o)), w = s.reference[d] - s.floating[x] + (S && ((v = i.offset) == null ? void 0 : v[d]) || 0) + (S ? 0 : y.crossAxis), k = s.reference[d] + s.reference[x] + (S ? 0 : ((b = i.offset) == null ? void 0 : b[d]) || 0) - (S ? y.crossAxis : 0);
        h < w ? h = w : h > k && (h = k);
      }
      return {
        [f]: p,
        [d]: h
      };
    }
  };
}, iv = function(e) {
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
      } = Ct(e, t), u = await rr(t, l), d = Mt(o), f = Pn(o), p = st(o) === "y", {
        width: h,
        height: g
      } = s.floating;
      let y, v;
      d === "top" || d === "bottom" ? (y = d, v = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (v = d, y = f === "end" ? "top" : "bottom");
      const b = g - u.top - u.bottom, x = h - u.left - u.right, S = _t(g - u[y], b), w = _t(h - u[v], x), k = !t.middlewareData.shift;
      let D = S, C = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (C = x), (r = t.middlewareData.shift) != null && r.enabled.y && (D = b), k && !f) {
        const T = Fe(u.left, 0), N = Fe(u.right, 0), A = Fe(u.top, 0), P = Fe(u.bottom, 0);
        p ? C = h - 2 * (T !== 0 || N !== 0 ? T + N : Fe(u.left, u.right)) : D = g - 2 * (A !== 0 || P !== 0 ? A + P : Fe(u.top, u.bottom));
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
function vo() {
  return typeof window < "u";
}
function On(e) {
  return El(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ue(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ut(e) {
  var t;
  return (t = (El(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function El(e) {
  return vo() ? e instanceof Node || e instanceof Ue(e).Node : !1;
}
function Qe(e) {
  return vo() ? e instanceof Element || e instanceof Ue(e).Element : !1;
}
function ct(e) {
  return vo() ? e instanceof HTMLElement || e instanceof Ue(e).HTMLElement : !1;
}
function _i(e) {
  return !vo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ue(e).ShadowRoot;
}
const cv = /* @__PURE__ */ new Set(["inline", "contents"]);
function dr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !cv.has(o);
}
const lv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function uv(e) {
  return lv.has(On(e));
}
const dv = [":popover-open", ":modal"];
function bo(e) {
  return dv.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const fv = ["transform", "translate", "scale", "rotate", "perspective"], mv = ["transform", "translate", "scale", "rotate", "perspective", "filter"], pv = ["paint", "layout", "strict", "content"];
function ma(e) {
  const t = pa(), n = Qe(e) ? Je(e) : e;
  return fv.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || mv.some((r) => (n.willChange || "").includes(r)) || pv.some((r) => (n.contain || "").includes(r));
}
function hv(e) {
  let t = $t(e);
  for (; ct(t) && !Mn(t); ) {
    if (ma(t))
      return t;
    if (bo(t))
      return null;
    t = $t(t);
  }
  return null;
}
function pa() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const gv = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Mn(e) {
  return gv.has(On(e));
}
function Je(e) {
  return Ue(e).getComputedStyle(e);
}
function wo(e) {
  return Qe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function $t(e) {
  if (On(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    _i(e) && e.host || // Fallback.
    ut(e)
  );
  return _i(t) ? t.host : t;
}
function Tl(e) {
  const t = $t(e);
  return Mn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ct(t) && dr(t) ? t : Tl(t);
}
function or(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Tl(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Ue(o);
  if (s) {
    const a = Ms(i);
    return t.concat(i, i.visualViewport || [], dr(o) ? o : [], a && n ? or(a) : []);
  }
  return t.concat(o, or(o, [], n));
}
function Ms(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Dl(e) {
  const t = Je(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ct(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = Qr(n) !== s || Qr(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function ha(e) {
  return Qe(e) ? e : e.contextElement;
}
function vn(e) {
  const t = ha(e);
  if (!ct(t))
    return it(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Dl(t);
  let i = (s ? Qr(n.width) : n.width) / r, a = (s ? Qr(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const yv = /* @__PURE__ */ it(0);
function Nl(e) {
  const t = Ue(e);
  return !pa() || !t.visualViewport ? yv : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function vv(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ue(e) ? !1 : t;
}
function qt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ha(e);
  let i = it(1);
  t && (r ? Qe(r) && (i = vn(r)) : i = vn(e));
  const a = vv(s, n, r) ? Nl(s) : it(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, u = o.width / i.x, d = o.height / i.y;
  if (s) {
    const f = Ue(s), p = r && Qe(r) ? Ue(r) : r;
    let h = f, g = Ms(h);
    for (; g && r && p !== h; ) {
      const y = vn(g), v = g.getBoundingClientRect(), b = Je(g), x = v.left + (g.clientLeft + parseFloat(b.paddingLeft)) * y.x, S = v.top + (g.clientTop + parseFloat(b.paddingTop)) * y.y;
      c *= y.x, l *= y.y, u *= y.x, d *= y.y, c += x, l += S, h = Ue(g), g = Ms(h);
    }
  }
  return eo({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function xo(e, t) {
  const n = wo(e).scrollLeft;
  return t ? t.left + n : qt(ut(e)).left + n;
}
function Al(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - xo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function bv(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = ut(r), a = t ? bo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = it(1);
  const u = it(0), d = ct(r);
  if ((d || !d && !s) && ((On(r) !== "body" || dr(i)) && (c = wo(r)), ct(r))) {
    const p = qt(r);
    l = vn(r), u.x = p.x + r.clientLeft, u.y = p.y + r.clientTop;
  }
  const f = i && !d && !s ? Al(i, c) : it(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function wv(e) {
  return Array.from(e.getClientRects());
}
function xv(e) {
  const t = ut(e), n = wo(e), r = e.ownerDocument.body, o = Fe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Fe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + xo(e);
  const a = -n.scrollTop;
  return Je(r).direction === "rtl" && (i += Fe(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const $i = 25;
function kv(e, t) {
  const n = Ue(e), r = ut(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const u = pa();
    (!u || u && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = xo(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, f = getComputedStyle(d), p = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, h = Math.abs(r.clientWidth - d.clientWidth - p);
    h <= $i && (s -= h);
  } else l <= $i && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const Cv = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Mv(e, t) {
  const n = qt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = ct(e) ? vn(e) : it(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function Hi(e, t, n) {
  let r;
  if (t === "viewport")
    r = kv(e, n);
  else if (t === "document")
    r = xv(ut(e));
  else if (Qe(t))
    r = Mv(t, n);
  else {
    const o = Nl(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return eo(r);
}
function Rl(e, t) {
  const n = $t(e);
  return n === t || !Qe(n) || Mn(n) ? !1 : Je(n).position === "fixed" || Rl(n, t);
}
function Sv(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = or(e, [], !1).filter((a) => Qe(a) && On(a) !== "body"), o = null;
  const s = Je(e).position === "fixed";
  let i = s ? $t(e) : e;
  for (; Qe(i) && !Mn(i); ) {
    const a = Je(i), c = ma(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && Cv.has(o.position) || dr(i) && !c && Rl(e, i)) ? r = r.filter((u) => u !== i) : o = a, i = $t(i);
  }
  return t.set(e, r), r;
}
function Ev(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? bo(t) ? [] : Sv(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, u) => {
    const d = Hi(t, u, o);
    return l.top = Fe(d.top, l.top), l.right = _t(d.right, l.right), l.bottom = _t(d.bottom, l.bottom), l.left = Fe(d.left, l.left), l;
  }, Hi(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Tv(e) {
  const {
    width: t,
    height: n
  } = Dl(e);
  return {
    width: t,
    height: n
  };
}
function Dv(e, t, n) {
  const r = ct(t), o = ut(t), s = n === "fixed", i = qt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = it(0);
  function l() {
    c.x = xo(o);
  }
  if (r || !r && !s)
    if ((On(t) !== "body" || dr(o)) && (a = wo(t)), r) {
      const p = qt(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const u = o && !r && !s ? Al(o, a) : it(0), d = i.left + a.scrollLeft - c.x - u.x, f = i.top + a.scrollTop - c.y - u.y;
  return {
    x: d,
    y: f,
    width: i.width,
    height: i.height
  };
}
function Jo(e) {
  return Je(e).position === "static";
}
function Wi(e, t) {
  if (!ct(e) || Je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return ut(e) === n && (n = n.ownerDocument.body), n;
}
function Ll(e, t) {
  const n = Ue(e);
  if (bo(e))
    return n;
  if (!ct(e)) {
    let o = $t(e);
    for (; o && !Mn(o); ) {
      if (Qe(o) && !Jo(o))
        return o;
      o = $t(o);
    }
    return n;
  }
  let r = Wi(e, t);
  for (; r && uv(r) && Jo(r); )
    r = Wi(r, t);
  return r && Mn(r) && Jo(r) && !ma(r) ? n : r || hv(e) || n;
}
const Nv = async function(e) {
  const t = this.getOffsetParent || Ll, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Dv(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Av(e) {
  return Je(e).direction === "rtl";
}
const Rv = {
  convertOffsetParentRelativeRectToViewportRelativeRect: bv,
  getDocumentElement: ut,
  getClippingRect: Ev,
  getOffsetParent: Ll,
  getElementRects: Nv,
  getClientRects: wv,
  getDimensions: Tv,
  getScale: vn,
  isElement: Qe,
  isRTL: Av
};
function Il(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Lv(e, t) {
  let n = null, r;
  const o = ut(e);
  function s() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), s();
    const l = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: f,
      height: p
    } = l;
    if (a || t(), !f || !p)
      return;
    const h = Rr(d), g = Rr(o.clientWidth - (u + f)), y = Rr(o.clientHeight - (d + p)), v = Rr(u), x = {
      rootMargin: -h + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: Fe(0, _t(1, c)) || 1
    };
    let S = !0;
    function w(k) {
      const D = k[0].intersectionRatio;
      if (D !== c) {
        if (!S)
          return i();
        D ? i(!1, D) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !Il(l, e.getBoundingClientRect()) && i(), S = !1;
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
function Iv(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = ha(e), u = o || s ? [...l ? or(l) : [], ...or(t)] : [];
  u.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = l && a ? Lv(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((v) => {
    let [b] = v;
    b && b.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = p) == null || x.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let h, g = c ? qt(e) : null;
  c && y();
  function y() {
    const v = qt(e);
    g && !Il(g, v) && n(), g = v, h = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    u.forEach((b) => {
      o && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), d?.(), (v = p) == null || v.disconnect(), p = null, c && cancelAnimationFrame(h);
  };
}
const Pv = ov, Ov = sv, _v = tv, $v = iv, Hv = nv, zi = ev, Wv = av, zv = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Rv,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Jy(e, t, {
    ...o,
    platform: s
  });
};
var Bv = typeof document < "u", Fv = function() {
}, Vr = Bv ? lo : Fv;
function to(e, t) {
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
        if (!to(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !to(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Pl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Bi(e, t) {
  const n = Pl(e);
  return Math.round(t * n) / n;
}
function es(e) {
  const t = M.useRef(e);
  return Vr(() => {
    t.current = e;
  }), t;
}
function Uv(e) {
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
  } = e, [u, d] = M.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = M.useState(r);
  to(f, r) || p(r);
  const [h, g] = M.useState(null), [y, v] = M.useState(null), b = M.useCallback((I) => {
    I !== k.current && (k.current = I, g(I));
  }, []), x = M.useCallback((I) => {
    I !== D.current && (D.current = I, v(I));
  }, []), S = s || h, w = i || y, k = M.useRef(null), D = M.useRef(null), C = M.useRef(u), E = c != null, T = es(c), N = es(o), A = es(l), P = M.useCallback(() => {
    if (!k.current || !D.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    N.current && (I.platform = N.current), zv(k.current, D.current, I).then((L) => {
      const z = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      O.current && !to(C.current, z) && (C.current = z, mc.flushSync(() => {
        d(z);
      }));
    });
  }, [f, t, n, N, A]);
  Vr(() => {
    l === !1 && C.current.isPositioned && (C.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const O = M.useRef(!1);
  Vr(() => (O.current = !0, () => {
    O.current = !1;
  }), []), Vr(() => {
    if (S && (k.current = S), w && (D.current = w), S && w) {
      if (T.current)
        return T.current(S, w, P);
      P();
    }
  }, [S, w, P, T, E]);
  const _ = M.useMemo(() => ({
    reference: k,
    floating: D,
    setReference: b,
    setFloating: x
  }), [b, x]), W = M.useMemo(() => ({
    reference: S,
    floating: w
  }), [S, w]), V = M.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return I;
    const L = Bi(W.floating, u.x), z = Bi(W.floating, u.y);
    return a ? {
      ...I,
      transform: "translate(" + L + "px, " + z + "px)",
      ...Pl(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: z
    };
  }, [n, a, W.floating, u.x, u.y]);
  return M.useMemo(() => ({
    ...u,
    update: P,
    refs: _,
    elements: W,
    floatingStyles: V
  }), [u, P, _, W, V]);
}
const Yv = (e) => {
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
      return r && t(r) ? r.current != null ? zi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? zi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, jv = (e, t) => ({
  ...Pv(e),
  options: [e, t]
}), Vv = (e, t) => ({
  ...Ov(e),
  options: [e, t]
}), Kv = (e, t) => ({
  ...Wv(e),
  options: [e, t]
}), Gv = (e, t) => ({
  ..._v(e),
  options: [e, t]
}), qv = (e, t) => ({
  ...$v(e),
  options: [e, t]
}), Xv = (e, t) => ({
  ...Hv(e),
  options: [e, t]
}), Zv = (e, t) => ({
  ...Yv(e),
  options: [e, t]
});
var Qv = "Arrow", Ol = M.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ m(
    Ae.svg,
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
Ol.displayName = Qv;
var Jv = Ol;
function eb(e) {
  const [t, n] = M.useState(void 0);
  return Ot(() => {
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
var ga = "Popper", [_l, ko] = In(ga), [tb, $l] = _l(ga), Hl = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = M.useState(null);
  return /* @__PURE__ */ m(tb, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Hl.displayName = ga;
var Wl = "PopperAnchor", zl = M.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = $l(Wl, n), i = M.useRef(null), a = Le(t, i), c = M.useRef(null);
    return M.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ m(Ae.div, { ...o, ref: a });
  }
);
zl.displayName = Wl;
var ya = "PopperContent", [nb, rb] = _l(ya), Bl = M.forwardRef(
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
      collisionPadding: u = 0,
      sticky: d = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: h,
      ...g
    } = e, y = $l(ya, n), [v, b] = M.useState(null), x = Le(t, (F) => b(F)), [S, w] = M.useState(null), k = eb(S), D = k?.width ?? 0, C = k?.height ?? 0, E = r + (s !== "center" ? "-" + s : ""), T = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, N = Array.isArray(l) ? l : [l], A = N.length > 0, P = {
      padding: T,
      boundary: N.filter(sb),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: O, floatingStyles: _, placement: W, isPositioned: V, middlewareData: I } = Uv({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: E,
      whileElementsMounted: (...F) => Iv(...F, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        jv({ mainAxis: o + C, alignmentAxis: i }),
        c && Vv({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Kv() : void 0,
          ...P
        }),
        c && Gv({ ...P }),
        qv({
          ...P,
          apply: ({ elements: F, rects: Z, availableWidth: ue, availableHeight: fe }) => {
            const { width: we, height: De } = Z.reference, je = F.floating.style;
            je.setProperty("--radix-popper-available-width", `${ue}px`), je.setProperty("--radix-popper-available-height", `${fe}px`), je.setProperty("--radix-popper-anchor-width", `${we}px`), je.setProperty("--radix-popper-anchor-height", `${De}px`);
          }
        }),
        S && Zv({ element: S, padding: a }),
        ab({ arrowWidth: D, arrowHeight: C }),
        f && Xv({ strategy: "referenceHidden", ...P })
      ]
    }), [L, z] = Yl(W), K = kt(h);
    Ot(() => {
      V && K?.();
    }, [V, K]);
    const j = I.arrow?.x, G = I.arrow?.y, J = I.arrow?.centerOffset !== 0, [$, H] = M.useState();
    return Ot(() => {
      v && H(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ m(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ..._,
          transform: V ? _.transform : "translate(0, -200%)",
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
          nb,
          {
            scope: n,
            placedSide: L,
            onArrowChange: w,
            arrowX: j,
            arrowY: G,
            shouldHideArrow: J,
            children: /* @__PURE__ */ m(
              Ae.div,
              {
                "data-side": L,
                "data-align": z,
                ...g,
                ref: x,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: V ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Bl.displayName = ya;
var Fl = "PopperArrow", ob = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ul = M.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = rb(Fl, r), i = ob[s.placedSide];
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
          Jv,
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
Ul.displayName = Fl;
function sb(e) {
  return e !== null;
}
var ab = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, u] = Yl(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let h = "", g = "";
    return l === "bottom" ? (h = i ? d : `${f}px`, g = `${-c}px`) : l === "top" ? (h = i ? d : `${f}px`, g = `${r.floating.height + c}px`) : l === "right" ? (h = `${-c}px`, g = i ? d : `${p}px`) : l === "left" && (h = `${r.floating.width + c}px`, g = i ? d : `${p}px`), { data: { x: h, y: g } };
  }
});
function Yl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var jl = Hl, Vl = zl, Kl = Bl, Gl = Ul, ib = "Portal", va = M.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = M.useState(!1);
  Ot(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? Hd.createPortal(/* @__PURE__ */ m(Ae.div, { ...r, ref: t }), i) : null;
});
va.displayName = ib;
function cb(e, t) {
  return M.useReducer((n, r) => t[n][r] ?? n, e);
}
var Xt = (e) => {
  const { present: t, children: n } = e, r = lb(t), o = typeof n == "function" ? n({ present: r.isPresent }) : M.Children.only(n), s = Le(r.ref, ub(o));
  return typeof n == "function" || r.isPresent ? M.cloneElement(o, { ref: s }) : null;
};
Xt.displayName = "Presence";
function lb(e) {
  const [t, n] = M.useState(), r = M.useRef(null), o = M.useRef(e), s = M.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = cb(i, {
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
    const l = Lr(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), Ot(() => {
    const l = r.current, u = o.current;
    if (u !== e) {
      const f = s.current, p = Lr(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(u && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Ot(() => {
    if (t) {
      let l;
      const u = t.ownerDocument.defaultView ?? window, d = (p) => {
        const g = Lr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Lr(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(l), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
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
function Lr(e) {
  return e?.animationName || "none";
}
function ub(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ts = "rovingFocusGroup.onEntryFocus", db = { bubbles: !1, cancelable: !0 }, fr = "RovingFocusGroup", [Ss, ql, fb] = vl(fr), [mb, Xl] = In(
  fr,
  [fb]
), [pb, hb] = mb(fr), Zl = M.forwardRef(
  (e, t) => /* @__PURE__ */ m(Ss.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(Ss.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(gb, { ...e, ref: t }) }) })
);
Zl.displayName = fr;
var gb = M.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: i,
    defaultCurrentTabStopId: a,
    onCurrentTabStopIdChange: c,
    onEntryFocus: l,
    preventScrollOnEntryFocus: u = !1,
    ...d
  } = e, f = M.useRef(null), p = Le(t, f), h = bl(s), [g, y] = ca({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: fr
  }), [v, b] = M.useState(!1), x = kt(l), S = ql(n), w = M.useRef(!1), [k, D] = M.useState(0);
  return M.useEffect(() => {
    const C = f.current;
    if (C)
      return C.addEventListener(ts, x), () => C.removeEventListener(ts, x);
  }, [x]), /* @__PURE__ */ m(
    pb,
    {
      scope: n,
      orientation: r,
      dir: h,
      loop: o,
      currentTabStopId: g,
      onItemFocus: M.useCallback(
        (C) => y(C),
        [y]
      ),
      onItemShiftTab: M.useCallback(() => b(!0), []),
      onFocusableItemAdd: M.useCallback(
        () => D((C) => C + 1),
        []
      ),
      onFocusableItemRemove: M.useCallback(
        () => D((C) => C - 1),
        []
      ),
      children: /* @__PURE__ */ m(
        Ae.div,
        {
          tabIndex: v || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: ce(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: ce(e.onFocus, (C) => {
            const E = !w.current;
            if (C.target === C.currentTarget && E && !v) {
              const T = new CustomEvent(ts, db);
              if (C.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const N = S().filter((W) => W.focusable), A = N.find((W) => W.active), P = N.find((W) => W.id === g), _ = [A, P, ...N].filter(
                  Boolean
                ).map((W) => W.ref.current);
                eu(_, u);
              }
            }
            w.current = !1;
          }),
          onBlur: ce(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), Ql = "RovingFocusGroupItem", Jl = M.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = Zr(), l = s || c, u = hb(Ql, n), d = u.currentTabStopId === l, f = ql(n), { onFocusableItemAdd: p, onFocusableItemRemove: h, currentTabStopId: g } = u;
    return M.useEffect(() => {
      if (r)
        return p(), () => h();
    }, [r, p, h]), /* @__PURE__ */ m(
      Ss.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ m(
          Ae.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...a,
            ref: t,
            onMouseDown: ce(e.onMouseDown, (y) => {
              r ? u.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: ce(e.onFocus, () => u.onItemFocus(l)),
            onKeyDown: ce(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const v = bb(y, u.orientation, u.dir);
              if (v !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let x = f().filter((S) => S.focusable).map((S) => S.ref.current);
                if (v === "last") x.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && x.reverse();
                  const S = x.indexOf(y.currentTarget);
                  x = u.loop ? wb(x, S + 1) : x.slice(S + 1);
                }
                setTimeout(() => eu(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: d, hasTabStop: g != null }) : i
          }
        )
      }
    );
  }
);
Jl.displayName = Ql;
var yb = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function vb(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function bb(e, t, n) {
  const r = vb(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return yb[r];
}
function eu(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function wb(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var xb = Zl, kb = Jl, Cb = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, cn = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Pr = {}, ns = 0, tu = function(e) {
  return e && (e.host || tu(e.parentNode));
}, Mb = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = tu(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Sb = function(e, t, n, r) {
  var o = Mb(t, Array.isArray(e) ? e : [e]);
  Pr[n] || (Pr[n] = /* @__PURE__ */ new WeakMap());
  var s = Pr[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(d) {
    !d || a.has(d) || (a.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (a.has(f))
        u(f);
      else
        try {
          var p = f.getAttribute(r), h = p !== null && p !== "false", g = (cn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          cn.set(f, g), s.set(f, y), i.push(f), g === 1 && h && Ir.set(f, !0), y === 1 && f.setAttribute(n, "true"), h || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return u(t), a.clear(), ns++, function() {
    i.forEach(function(d) {
      var f = cn.get(d) - 1, p = s.get(d) - 1;
      cn.set(d, f), s.set(d, p), f || (Ir.has(d) || d.removeAttribute(r), Ir.delete(d)), p || d.removeAttribute(n);
    }), ns--, ns || (cn = /* @__PURE__ */ new WeakMap(), cn = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Pr = {});
  };
}, Eb = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Cb(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Sb(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, rt = function() {
  return rt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, rt.apply(this, arguments);
};
function nu(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Tb(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Kr = "right-scroll-bar-position", Gr = "width-before-scroll-bar", Db = "with-scroll-bars-hidden", Nb = "--removed-body-scroll-bar-size";
function rs(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ab(e, t) {
  var n = U(function() {
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
var Rb = typeof window < "u" ? M.useLayoutEffect : M.useEffect, Fi = /* @__PURE__ */ new WeakMap();
function Lb(e, t) {
  var n = Ab(null, function(r) {
    return e.forEach(function(o) {
      return rs(o, r);
    });
  });
  return Rb(function() {
    var r = Fi.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || rs(a, null);
      }), s.forEach(function(a) {
        o.has(a) || rs(a, i);
      });
    }
    Fi.set(n, e);
  }, [e]), n;
}
function Ib(e) {
  return e;
}
function Pb(e, t) {
  t === void 0 && (t = Ib);
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
        var u = i;
        i = [], u.forEach(s);
      }, l = function() {
        return Promise.resolve().then(c);
      };
      l(), n = {
        push: function(u) {
          i.push(u), l();
        },
        filter: function(u) {
          return i = i.filter(u), n;
        }
      };
    }
  };
  return o;
}
function Ob(e) {
  e === void 0 && (e = {});
  var t = Pb(null);
  return t.options = rt({ async: !0, ssr: !1 }, e), t;
}
var ru = function(e) {
  var t = e.sideCar, n = nu(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return M.createElement(r, rt({}, n));
};
ru.isSideCarExport = !0;
function _b(e, t) {
  return e.useMedium(t), ru;
}
var ou = Ob(), os = function() {
}, Co = M.forwardRef(function(e, t) {
  var n = M.useRef(null), r = M.useState({
    onScrollCapture: os,
    onWheelCapture: os,
    onTouchMoveCapture: os
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, h = e.noIsolation, g = e.inert, y = e.allowPinchZoom, v = e.as, b = v === void 0 ? "div" : v, x = e.gapMode, S = nu(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, k = Lb([n, t]), D = rt(rt({}, S), o);
  return M.createElement(
    M.Fragment,
    null,
    u && M.createElement(w, { sideCar: ou, removeScrollBar: l, shards: d, noRelative: p, noIsolation: h, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: x }),
    i ? M.cloneElement(M.Children.only(a), rt(rt({}, D), { ref: k })) : M.createElement(b, rt({}, D, { className: c, ref: k }), a)
  );
});
Co.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Co.classNames = {
  fullWidth: Gr,
  zeroRight: Kr
};
var $b = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Hb() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = $b();
  return t && e.setAttribute("nonce", t), e;
}
function Wb(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function zb(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Bb = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Hb()) && (Wb(t, n), zb(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Fb = function() {
  var e = Bb();
  return function(t, n) {
    M.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, su = function() {
  var e = Fb(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Ub = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ss = function(e) {
  return parseInt(e || "", 10) || 0;
}, Yb = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ss(n), ss(r), ss(o)];
}, jb = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Ub;
  var t = Yb(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Vb = su(), bn = "data-scroll-locked", Kb = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Db, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(bn, `] {
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
  
  .`).concat(Kr, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Gr, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Kr, " .").concat(Kr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Gr, " .").concat(Gr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(bn, `] {
    `).concat(Nb, ": ").concat(a, `px;
  }
`);
}, Ui = function() {
  var e = parseInt(document.body.getAttribute(bn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Gb = function() {
  M.useEffect(function() {
    return document.body.setAttribute(bn, (Ui() + 1).toString()), function() {
      var e = Ui() - 1;
      e <= 0 ? document.body.removeAttribute(bn) : document.body.setAttribute(bn, e.toString());
    };
  }, []);
}, qb = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Gb();
  var s = M.useMemo(function() {
    return jb(o);
  }, [o]);
  return M.createElement(Vb, { styles: Kb(s, !t, o, n ? "" : "!important") });
}, Es = !1;
if (typeof window < "u")
  try {
    var Or = Object.defineProperty({}, "passive", {
      get: function() {
        return Es = !0, !0;
      }
    });
    window.addEventListener("test", Or, Or), window.removeEventListener("test", Or, Or);
  } catch {
    Es = !1;
  }
var ln = Es ? { passive: !1 } : !1, Xb = function(e) {
  return e.tagName === "TEXTAREA";
}, au = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Xb(e) && n[t] === "visible")
  );
}, Zb = function(e) {
  return au(e, "overflowY");
}, Qb = function(e) {
  return au(e, "overflowX");
}, Yi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = iu(e, r);
    if (o) {
      var s = cu(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Jb = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, ew = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, iu = function(e, t) {
  return e === "v" ? Zb(t) : Qb(t);
}, cu = function(e, t) {
  return e === "v" ? Jb(t) : ew(t);
}, tw = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, nw = function(e, t, n, r, o) {
  var s = tw(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, u = i > 0, d = 0, f = 0;
  do {
    if (!a)
      break;
    var p = cu(e, a), h = p[0], g = p[1], y = p[2], v = g - y - s * h;
    (h || v) && iu(e, a) && (d += v, f += h);
    var b = a.parentNode;
    a = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (l = !0), l;
}, _r = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ji = function(e) {
  return [e.deltaX, e.deltaY];
}, Vi = function(e) {
  return e && "current" in e ? e.current : e;
}, rw = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, ow = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, sw = 0, un = [];
function aw(e) {
  var t = M.useRef([]), n = M.useRef([0, 0]), r = M.useRef(), o = M.useState(sw++)[0], s = M.useState(su)[0], i = M.useRef(e);
  M.useEffect(function() {
    i.current = e;
  }, [e]), M.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Tb([e.lockRef.current], (e.shards || []).map(Vi), !0).filter(Boolean);
      return g.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = M.useCallback(function(g, y) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !i.current.allowPinchZoom;
    var v = _r(g), b = n.current, x = "deltaX" in g ? g.deltaX : b[0] - v[0], S = "deltaY" in g ? g.deltaY : b[1] - v[1], w, k = g.target, D = Math.abs(x) > Math.abs(S) ? "h" : "v";
    if ("touches" in g && D === "h" && k.type === "range")
      return !1;
    var C = Yi(D, k);
    if (!C)
      return !0;
    if (C ? w = D : (w = D === "v" ? "h" : "v", C = Yi(D, k)), !C)
      return !1;
    if (!r.current && "changedTouches" in g && (x || S) && (r.current = w), !w)
      return !0;
    var E = r.current || w;
    return nw(E, y, g, E === "h" ? x : S);
  }, []), c = M.useCallback(function(g) {
    var y = g;
    if (!(!un.length || un[un.length - 1] !== s)) {
      var v = "deltaY" in y ? ji(y) : _r(y), b = t.current.filter(function(w) {
        return w.name === y.type && (w.target === y.target || y.target === w.shadowParent) && rw(w.delta, v);
      })[0];
      if (b && b.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!b) {
        var x = (i.current.shards || []).map(Vi).filter(Boolean).filter(function(w) {
          return w.contains(y.target);
        }), S = x.length > 0 ? a(y, x[0]) : !i.current.noIsolation;
        S && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = M.useCallback(function(g, y, v, b) {
    var x = { name: g, delta: y, target: v, should: b, shadowParent: iw(v) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== x;
      });
    }, 1);
  }, []), u = M.useCallback(function(g) {
    n.current = _r(g), r.current = void 0;
  }, []), d = M.useCallback(function(g) {
    l(g.type, ji(g), g.target, a(g, e.lockRef.current));
  }, []), f = M.useCallback(function(g) {
    l(g.type, _r(g), g.target, a(g, e.lockRef.current));
  }, []);
  M.useEffect(function() {
    return un.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, ln), document.addEventListener("touchmove", c, ln), document.addEventListener("touchstart", u, ln), function() {
      un = un.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", c, ln), document.removeEventListener("touchmove", c, ln), document.removeEventListener("touchstart", u, ln);
    };
  }, []);
  var p = e.removeScrollBar, h = e.inert;
  return M.createElement(
    M.Fragment,
    null,
    h ? M.createElement(s, { styles: ow(o) }) : null,
    p ? M.createElement(qb, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function iw(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const cw = _b(ou, aw);
var lu = M.forwardRef(function(e, t) {
  return M.createElement(Co, rt({}, e, { ref: t, sideCar: cw }));
});
lu.classNames = Co.classNames;
var Ts = ["Enter", " "], lw = ["ArrowDown", "PageUp", "Home"], uu = ["ArrowUp", "PageDown", "End"], uw = [...lw, ...uu], dw = {
  ltr: [...Ts, "ArrowRight"],
  rtl: [...Ts, "ArrowLeft"]
}, fw = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, mr = "Menu", [sr, mw, pw] = vl(mr), [Zt, du] = In(mr, [
  pw,
  ko,
  Xl
]), Mo = ko(), fu = Xl(), [hw, Qt] = Zt(mr), [gw, pr] = Zt(mr), mu = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Mo(t), [c, l] = M.useState(null), u = M.useRef(!1), d = kt(s), f = bl(o);
  return M.useEffect(() => {
    const p = () => {
      u.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => u.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(jl, { ...a, children: /* @__PURE__ */ m(
    hw,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ m(
        gw,
        {
          scope: t,
          onClose: M.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: u,
          dir: f,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
mu.displayName = mr;
var yw = "MenuAnchor", ba = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Mo(n);
    return /* @__PURE__ */ m(Vl, { ...o, ...r, ref: t });
  }
);
ba.displayName = yw;
var wa = "MenuPortal", [vw, pu] = Zt(wa, {
  forceMount: void 0
}), hu = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = Qt(wa, t);
  return /* @__PURE__ */ m(vw, { scope: t, forceMount: n, children: /* @__PURE__ */ m(Xt, { present: n || s.open, children: /* @__PURE__ */ m(va, { asChild: !0, container: o, children: r }) }) });
};
hu.displayName = wa;
var qe = "MenuContent", [bw, xa] = Zt(qe), gu = M.forwardRef(
  (e, t) => {
    const n = pu(qe, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Qt(qe, e.__scopeMenu), i = pr(qe, e.__scopeMenu);
    return /* @__PURE__ */ m(sr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(Xt, { present: r || s.open, children: /* @__PURE__ */ m(sr.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ m(ww, { ...o, ref: t }) : /* @__PURE__ */ m(xw, { ...o, ref: t }) }) }) });
  }
), ww = M.forwardRef(
  (e, t) => {
    const n = Qt(qe, e.__scopeMenu), r = M.useRef(null), o = Le(t, r);
    return M.useEffect(() => {
      const s = r.current;
      if (s) return Eb(s);
    }, []), /* @__PURE__ */ m(
      ka,
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
), xw = M.forwardRef((e, t) => {
  const n = Qt(qe, e.__scopeMenu);
  return /* @__PURE__ */ m(
    ka,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), kw = /* @__PURE__ */ nr("MenuContent.ScrollLock"), ka = M.forwardRef(
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
      onPointerDownOutside: u,
      onFocusOutside: d,
      onInteractOutside: f,
      onDismiss: p,
      disableOutsideScroll: h,
      ...g
    } = e, y = Qt(qe, n), v = pr(qe, n), b = Mo(n), x = fu(n), S = mw(n), [w, k] = M.useState(null), D = M.useRef(null), C = Le(t, D, y.onContentChange), E = M.useRef(0), T = M.useRef(""), N = M.useRef(0), A = M.useRef(null), P = M.useRef("right"), O = M.useRef(0), _ = h ? lu : M.Fragment, W = h ? { as: kw, allowPinchZoom: !0 } : void 0, V = (L) => {
      const z = T.current + L, K = S().filter((F) => !F.disabled), j = document.activeElement, G = K.find((F) => F.ref.current === j)?.textValue, J = K.map((F) => F.textValue), $ = Pw(J, z, G), H = K.find((F) => F.textValue === $)?.ref.current;
      (function F(Z) {
        T.current = Z, window.clearTimeout(E.current), Z !== "" && (E.current = window.setTimeout(() => F(""), 1e3));
      })(z), H && setTimeout(() => H.focus());
    };
    M.useEffect(() => () => window.clearTimeout(E.current), []), Ly();
    const I = M.useCallback((L) => P.current === A.current?.side && _w(L, A.current?.area), []);
    return /* @__PURE__ */ m(
      bw,
      {
        scope: n,
        searchRef: T,
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
        children: /* @__PURE__ */ m(_, { ...W, children: /* @__PURE__ */ m(
          kl,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: ce(s, (L) => {
              L.preventDefault(), D.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ m(
              la,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ m(
                  xb,
                  {
                    asChild: !0,
                    ...x,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: k,
                    onEntryFocus: ce(c, (L) => {
                      v.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ m(
                      Kl,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Lu(y.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...b,
                        ...g,
                        ref: C,
                        style: { outline: "none", ...g.style },
                        onKeyDown: ce(g.onKeyDown, (L) => {
                          const K = L.target.closest("[data-radix-menu-content]") === L.currentTarget, j = L.ctrlKey || L.altKey || L.metaKey, G = L.key.length === 1;
                          K && (L.key === "Tab" && L.preventDefault(), !j && G && V(L.key));
                          const J = D.current;
                          if (L.target !== J || !uw.includes(L.key)) return;
                          L.preventDefault();
                          const H = S().filter((F) => !F.disabled).map((F) => F.ref.current);
                          uu.includes(L.key) && H.reverse(), Lw(H);
                        }),
                        onBlur: ce(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(E.current), T.current = "");
                        }),
                        onPointerMove: ce(
                          e.onPointerMove,
                          ar((L) => {
                            const z = L.target, K = O.current !== L.clientX;
                            if (L.currentTarget.contains(z) && K) {
                              const j = L.clientX > O.current ? "right" : "left";
                              P.current = j, O.current = L.clientX;
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
gu.displayName = qe;
var Cw = "MenuGroup", Ca = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Ae.div, { role: "group", ...r, ref: t });
  }
);
Ca.displayName = Cw;
var Mw = "MenuLabel", yu = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Ae.div, { ...r, ref: t });
  }
);
yu.displayName = Mw;
var no = "MenuItem", Ki = "menu.itemSelect", So = M.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = M.useRef(null), i = pr(no, e.__scopeMenu), a = xa(no, e.__scopeMenu), c = Le(t, s), l = M.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(Ki, { bubbles: !0, cancelable: !0 });
        d.addEventListener(Ki, (p) => r?.(p), { once: !0 }), yl(d, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ m(
      vu,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: ce(e.onClick, u),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), l.current = !0;
        },
        onPointerUp: ce(e.onPointerUp, (d) => {
          l.current || d.currentTarget?.click();
        }),
        onKeyDown: ce(e.onKeyDown, (d) => {
          const f = a.searchRef.current !== "";
          n || f && d.key === " " || Ts.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
So.displayName = no;
var vu = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = xa(no, n), a = fu(n), c = M.useRef(null), l = Le(t, c), [u, d] = M.useState(!1), [f, p] = M.useState("");
    return M.useEffect(() => {
      const h = c.current;
      h && p((h.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ m(
      sr.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ m(kb, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ m(
          Ae.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: ce(
              e.onPointerMove,
              ar((h) => {
                r ? i.onItemLeave(h) : (i.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ce(
              e.onPointerLeave,
              ar((h) => i.onItemLeave(h))
            ),
            onFocus: ce(e.onFocus, () => d(!0)),
            onBlur: ce(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), Sw = "MenuCheckboxItem", bu = M.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(Mu, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
      So,
      {
        role: "menuitemcheckbox",
        "aria-checked": ro(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": Sa(n),
        onSelect: ce(
          o.onSelect,
          () => r?.(ro(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
bu.displayName = Sw;
var wu = "MenuRadioGroup", [Ew, Tw] = Zt(
  wu,
  { value: void 0, onValueChange: () => {
  } }
), xu = M.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = kt(r);
    return /* @__PURE__ */ m(Ew, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ m(Ca, { ...o, ref: t }) });
  }
);
xu.displayName = wu;
var ku = "MenuRadioItem", Cu = M.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Tw(ku, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ m(Mu, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ m(
      So,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": Sa(s),
        onSelect: ce(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Cu.displayName = ku;
var Ma = "MenuItemIndicator", [Mu, Dw] = Zt(
  Ma,
  { checked: !1 }
), Su = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = Dw(Ma, n);
    return /* @__PURE__ */ m(
      Xt,
      {
        present: r || ro(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ m(
          Ae.span,
          {
            ...o,
            ref: t,
            "data-state": Sa(s.checked)
          }
        )
      }
    );
  }
);
Su.displayName = Ma;
var Nw = "MenuSeparator", Eu = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(
      Ae.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Eu.displayName = Nw;
var Aw = "MenuArrow", Tu = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Mo(n);
    return /* @__PURE__ */ m(Gl, { ...o, ...r, ref: t });
  }
);
Tu.displayName = Aw;
var Rw = "MenuSub", [aC, Du] = Zt(Rw), Gn = "MenuSubTrigger", Nu = M.forwardRef(
  (e, t) => {
    const n = Qt(Gn, e.__scopeMenu), r = pr(Gn, e.__scopeMenu), o = Du(Gn, e.__scopeMenu), s = xa(Gn, e.__scopeMenu), i = M.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, u = M.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return M.useEffect(() => u, [u]), M.useEffect(() => {
      const d = a.current;
      return () => {
        window.clearTimeout(d), c(null);
      };
    }, [a, c]), /* @__PURE__ */ m(ba, { asChild: !0, ...l, children: /* @__PURE__ */ m(
      vu,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Lu(n.open),
        ...e,
        ref: go(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ce(
          e.onPointerMove,
          ar((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: ce(
          e.onPointerLeave,
          ar((d) => {
            u();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, h = p === "right", g = h ? -5 : 5, y = f[h ? "left" : "right"], v = f[h ? "right" : "left"];
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
                side: p
              }), window.clearTimeout(a.current), a.current = window.setTimeout(
                () => s.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (s.onTriggerLeave(d), d.defaultPrevented) return;
              s.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: ce(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && d.key === " " || dw[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Nu.displayName = Gn;
var Au = "MenuSubContent", Ru = M.forwardRef(
  (e, t) => {
    const n = pu(qe, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Qt(qe, e.__scopeMenu), i = pr(qe, e.__scopeMenu), a = Du(Au, e.__scopeMenu), c = M.useRef(null), l = Le(t, c);
    return /* @__PURE__ */ m(sr.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(Xt, { present: r || s.open, children: /* @__PURE__ */ m(sr.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
      ka,
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
        onOpenAutoFocus: (u) => {
          i.isUsingKeyboardRef.current && c.current?.focus(), u.preventDefault();
        },
        onCloseAutoFocus: (u) => u.preventDefault(),
        onFocusOutside: ce(e.onFocusOutside, (u) => {
          u.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: ce(e.onEscapeKeyDown, (u) => {
          i.onClose(), u.preventDefault();
        }),
        onKeyDown: ce(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = fw[i.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), a.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
Ru.displayName = Au;
function Lu(e) {
  return e ? "open" : "closed";
}
function ro(e) {
  return e === "indeterminate";
}
function Sa(e) {
  return ro(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Lw(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Iw(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Pw(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = Iw(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Ow(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, u = a.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
  }
  return o;
}
function _w(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Ow(n, t);
}
function ar(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var $w = mu, Hw = ba, Ww = hu, zw = gu, Bw = Ca, Fw = yu, Uw = So, Yw = bu, jw = xu, Vw = Cu, Kw = Su, Gw = Eu, qw = Tu, Xw = Nu, Zw = Ru, Eo = "DropdownMenu", [Qw] = In(
  Eo,
  [du]
), _e = du(), [Jw, Iu] = Qw(Eo), Pu = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = _e(t), l = M.useRef(null), [u, d] = ca({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: Eo
  });
  return /* @__PURE__ */ m(
    Jw,
    {
      scope: t,
      triggerId: Zr(),
      triggerRef: l,
      contentId: Zr(),
      open: u,
      onOpenChange: d,
      onOpenToggle: M.useCallback(() => d((f) => !f), [d]),
      modal: a,
      children: /* @__PURE__ */ m($w, { ...c, open: u, onOpenChange: d, dir: r, modal: a, children: n })
    }
  );
};
Pu.displayName = Eo;
var Ou = "DropdownMenuTrigger", _u = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = Iu(Ou, n), i = _e(n);
    return /* @__PURE__ */ m(Hw, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Ae.button,
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
        ref: go(t, s.triggerRef),
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
_u.displayName = Ou;
var e0 = "DropdownMenuPortal", $u = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = _e(t);
  return /* @__PURE__ */ m(Ww, { ...r, ...n });
};
$u.displayName = e0;
var Hu = "DropdownMenuContent", Wu = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Iu(Hu, n), s = _e(n), i = M.useRef(!1);
    return /* @__PURE__ */ m(
      zw,
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
          const c = a.detail.originalEvent, l = c.button === 0 && c.ctrlKey === !0, u = c.button === 2 || l;
          (!o.modal || u) && (i.current = !0);
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
Wu.displayName = Hu;
var t0 = "DropdownMenuGroup", n0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
    return /* @__PURE__ */ m(Bw, { ...o, ...r, ref: t });
  }
);
n0.displayName = t0;
var r0 = "DropdownMenuLabel", o0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
    return /* @__PURE__ */ m(Fw, { ...o, ...r, ref: t });
  }
);
o0.displayName = r0;
var s0 = "DropdownMenuItem", zu = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
    return /* @__PURE__ */ m(Uw, { ...o, ...r, ref: t });
  }
);
zu.displayName = s0;
var a0 = "DropdownMenuCheckboxItem", i0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
  return /* @__PURE__ */ m(Yw, { ...o, ...r, ref: t });
});
i0.displayName = a0;
var c0 = "DropdownMenuRadioGroup", l0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
  return /* @__PURE__ */ m(jw, { ...o, ...r, ref: t });
});
l0.displayName = c0;
var u0 = "DropdownMenuRadioItem", d0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
  return /* @__PURE__ */ m(Vw, { ...o, ...r, ref: t });
});
d0.displayName = u0;
var f0 = "DropdownMenuItemIndicator", m0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
  return /* @__PURE__ */ m(Kw, { ...o, ...r, ref: t });
});
m0.displayName = f0;
var p0 = "DropdownMenuSeparator", Bu = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
  return /* @__PURE__ */ m(Gw, { ...o, ...r, ref: t });
});
Bu.displayName = p0;
var h0 = "DropdownMenuArrow", g0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
    return /* @__PURE__ */ m(qw, { ...o, ...r, ref: t });
  }
);
g0.displayName = h0;
var y0 = "DropdownMenuSubTrigger", v0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
  return /* @__PURE__ */ m(Xw, { ...o, ...r, ref: t });
});
v0.displayName = y0;
var b0 = "DropdownMenuSubContent", w0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = _e(n);
  return /* @__PURE__ */ m(
    Zw,
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
w0.displayName = b0;
var x0 = Pu, k0 = _u, C0 = $u, M0 = Wu, S0 = zu, E0 = Bu;
function as({
  ...e
}) {
  return /* @__PURE__ */ m(x0, { "data-slot": "dropdown-menu", ...e });
}
function is({
  ...e
}) {
  return /* @__PURE__ */ m(
    k0,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function cs({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(C0, { children: /* @__PURE__ */ m(
    M0,
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
function xe({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ m(
    S0,
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
function ls({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    E0,
    {
      "data-slot": "dropdown-menu-separator",
      className: ie("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
var T0 = Object.freeze({
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
}), D0 = "VisuallyHidden", Fu = M.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    Ae.span,
    {
      ...e,
      ref: t,
      style: { ...T0, ...e.style }
    }
  )
);
Fu.displayName = D0;
var N0 = Fu, [To] = In("Tooltip", [
  ko
]), Do = ko(), Uu = "TooltipProvider", A0 = 700, Ds = "tooltip.open", [R0, Ea] = To(Uu), Yu = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = A0,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = M.useRef(!0), a = M.useRef(!1), c = M.useRef(0);
  return M.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ m(
    R0,
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
Yu.displayName = Uu;
var ir = "Tooltip", [L0, hr] = To(ir), ju = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = Ea(ir, e.__scopeTooltip), l = Do(t), [u, d] = M.useState(null), f = Zr(), p = M.useRef(0), h = i ?? c.disableHoverableContent, g = a ?? c.delayDuration, y = M.useRef(!1), [v, b] = ca({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Ds))) : c.onClose(), s?.(D);
    },
    caller: ir
  }), x = M.useMemo(() => v ? y.current ? "delayed-open" : "instant-open" : "closed", [v]), S = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, b(!0);
  }, [b]), w = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, b(!1);
  }, [b]), k = M.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, b(!0), p.current = 0;
    }, g);
  }, [g, b]);
  return M.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ m(jl, { ...l, children: /* @__PURE__ */ m(
    L0,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: x,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: M.useCallback(() => {
        c.isOpenDelayedRef.current ? k() : S();
      }, [c.isOpenDelayedRef, k, S]),
      onTriggerLeave: M.useCallback(() => {
        h ? w() : (window.clearTimeout(p.current), p.current = 0);
      }, [w, h]),
      onOpen: S,
      onClose: w,
      disableHoverableContent: h,
      children: n
    }
  ) });
};
ju.displayName = ir;
var Ns = "TooltipTrigger", Vu = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = hr(Ns, n), s = Ea(Ns, n), i = Do(n), a = M.useRef(null), c = Le(t, a, o.onTriggerChange), l = M.useRef(!1), u = M.useRef(!1), d = M.useCallback(() => l.current = !1, []);
    return M.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ m(Vl, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Ae.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: ce(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: ce(e.onPointerLeave, () => {
          o.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: ce(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
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
Vu.displayName = Ns;
var Ta = "TooltipPortal", [I0, P0] = To(Ta, {
  forceMount: void 0
}), Ku = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = hr(Ta, t);
  return /* @__PURE__ */ m(I0, { scope: t, forceMount: n, children: /* @__PURE__ */ m(Xt, { present: n || s.open, children: /* @__PURE__ */ m(va, { asChild: !0, container: o, children: r }) }) });
};
Ku.displayName = Ta;
var Sn = "TooltipContent", Gu = M.forwardRef(
  (e, t) => {
    const n = P0(Sn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = hr(Sn, e.__scopeTooltip);
    return /* @__PURE__ */ m(Xt, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ m(qu, { side: o, ...s, ref: t }) : /* @__PURE__ */ m(O0, { side: o, ...s, ref: t }) });
  }
), O0 = M.forwardRef((e, t) => {
  const n = hr(Sn, e.__scopeTooltip), r = Ea(Sn, e.__scopeTooltip), o = M.useRef(null), s = Le(t, o), [i, a] = M.useState(null), { trigger: c, onClose: l } = n, u = o.current, { onPointerInTransitChange: d } = r, f = M.useCallback(() => {
    a(null), d(!1);
  }, [d]), p = M.useCallback(
    (h, g) => {
      const y = h.currentTarget, v = { x: h.clientX, y: h.clientY }, b = W0(v, y.getBoundingClientRect()), x = z0(v, b), S = B0(g.getBoundingClientRect()), w = U0([...x, ...S]);
      a(w), d(!0);
    },
    [d]
  );
  return M.useEffect(() => () => f(), [f]), M.useEffect(() => {
    if (c && u) {
      const h = (y) => p(y, u), g = (y) => p(y, c);
      return c.addEventListener("pointerleave", h), u.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", h), u.removeEventListener("pointerleave", g);
      };
    }
  }, [c, u, p, f]), M.useEffect(() => {
    if (i) {
      const h = (g) => {
        const y = g.target, v = { x: g.clientX, y: g.clientY }, b = c?.contains(y) || u?.contains(y), x = !F0(v, i);
        b ? f() : x && (f(), l());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [c, u, i, l, f]), /* @__PURE__ */ m(qu, { ...e, ref: s });
}), [_0, $0] = To(ir, { isInside: !1 }), H0 = /* @__PURE__ */ Ug("TooltipContent"), qu = M.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = hr(Sn, n), l = Do(n), { onClose: u } = c;
    return M.useEffect(() => (document.addEventListener(Ds, u), () => document.removeEventListener(Ds, u)), [u]), M.useEffect(() => {
      if (c.trigger) {
        const d = (f) => {
          f.target?.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ m(
      la,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ R(
          Kl,
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
              /* @__PURE__ */ m(H0, { children: r }),
              /* @__PURE__ */ m(_0, { scope: n, isInside: !0, children: /* @__PURE__ */ m(N0, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Gu.displayName = Sn;
var Xu = "TooltipArrow", Zu = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Do(n);
    return $0(
      Xu,
      n
    ).isInside ? null : /* @__PURE__ */ m(Gl, { ...o, ...r, ref: t });
  }
);
Zu.displayName = Xu;
function W0(e, t) {
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
function z0(e, t, n = 5) {
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
function B0(e) {
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
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, u = a.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
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
var j0 = Yu, V0 = ju, K0 = Vu, G0 = Ku, q0 = Gu, X0 = Zu;
function Z0({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    j0,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function As({
  ...e
}) {
  return /* @__PURE__ */ m(Z0, { children: /* @__PURE__ */ m(V0, { "data-slot": "tooltip", ...e }) });
}
function Rs({
  ...e
}) {
  return /* @__PURE__ */ m(K0, { "data-slot": "tooltip-trigger", ...e });
}
function Ls({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ m(G0, { children: /* @__PURE__ */ R(
    q0,
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
        /* @__PURE__ */ m(X0, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const ke = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ R(As, { children: [
    /* @__PURE__ */ m(Rs, { asChild: !0, children: s }),
    /* @__PURE__ */ m(Ls, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, dn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Q0 = En(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = Y(null), [l, u] = U(!1), [d, f] = U(void 0), p = uc({
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
  }), h = B(() => {
    const { view: k } = t, { from: D } = k.state.selection, C = k.coordsAtPos(D);
    f({ top: C.bottom + 8, left: C.left }), u(!0);
  }, [t]), g = B((k, D) => {
    t.chain().focus().setImage({ src: k, alt: D }).run(), u(!1);
  }, [t]), y = B(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = B((k) => {
    t.chain().focus().insertCallout({ type: k }).run();
  }, [t]), b = Y(/* @__PURE__ */ new Map()), x = Y(/* @__PURE__ */ new Map()), S = B((k) => {
    const { doc: D, tr: C } = k.state;
    let E = !1;
    const T = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    b.current.clear(), N.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((W) => {
        const V = W, I = (V.textContent || "").trim().substring(0, 50);
        b.current.set(`${O}-${I}`, V.getBoundingClientRect());
      });
    });
    const A = [];
    D.descendants((P, O, _, W) => {
      if (!T.has(P.type.name)) return !0;
      let V = !1;
      if (P.forEach((L) => {
        L.type.name === "taskItem" && (V = !0);
      }), !V) return !0;
      let I = 0;
      return D.nodesBetween(0, O, (L) => (T.has(L.type.name) && I++, !0)), A.push({ node: P, pos: O, depth: I }), !0;
    }), A.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of A) {
      const _ = [];
      let W = 0;
      P.forEach(($) => {
        _.push({
          node: $,
          isTask: $.type.name === "taskItem",
          checked: $.type.name === "taskItem" && $.attrs.checked === !0,
          originalIndex: W++
        });
      });
      const V = _.filter(($) => $.isTask && !$.checked), I = _.filter(($) => $.isTask && $.checked), L = [..._], z = _.map(($, H) => ({ index: H, isTask: $.isTask })).filter(($) => $.isTask).map(($) => $.index), K = [...V, ...I];
      if (z.forEach(($, H) => {
        L[$] = K[H];
      }), !L.some(($, H) => $.node !== _[H].node)) continue;
      const G = P.type.create(
        P.attrs,
        L.map(($) => $.node)
      ), J = C.mapping.map(O);
      C.replaceWith(J, J + P.nodeSize, G), E = !0;
    }
    E && (k.view.dispatch(C), requestAnimationFrame(() => {
      k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const _ = O.querySelectorAll(":scope > li"), W = /* @__PURE__ */ new Map();
        b.current.forEach((V, I) => {
          const L = I.replace(/^\d+-/, "");
          W.set(L, V);
        }), _.forEach((V) => {
          const I = V, L = (I.textContent || "").trim().substring(0, 50), z = W.get(L);
          if (!z) return;
          const K = I.getBoundingClientRect(), j = z.top - K.top;
          if (Math.abs(j) < 2) return;
          I.style.transform = `translateY(${j}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
          const G = () => {
            I.style.transform = "", I.style.transition = "", I.style.zIndex = "", I.removeEventListener("transitionend", G);
          };
          I.addEventListener("transitionend", G), setTimeout(G, 400);
        });
      });
    }));
  }, []);
  q(() => {
    if (!s || !t) return;
    const k = /* @__PURE__ */ new Map();
    t.state.doc.descendants((C, E) => (C.type.name === "taskItem" && k.set(E, C.attrs.checked === !0), !0)), x.current = k;
    const D = ({ transaction: C }) => {
      if (!C.docChanged) return;
      const E = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, P) => (A.type.name === "taskItem" && E.set(P, A.attrs.checked === !0), !0));
      const T = x.current;
      let N = !1;
      if (T.size > 0 && E.size > 0) {
        let A = 0, P = 0;
        T.forEach((O) => {
          O && A++;
        }), E.forEach((O) => {
          O && P++;
        }), A !== P && (N = !0);
      }
      x.current = E, N && setTimeout(() => {
        S(t);
      }, 150);
    };
    return t.on("transaction", D), () => {
      t.off("transaction", D);
    };
  }, [t, s, S]);
  const w = B(() => {
    S(t);
  }, [t, S]);
  return /* @__PURE__ */ R("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Qd, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Jd, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(dn, {}),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Ws, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Bs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Fs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(pc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(hc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(Us, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(dn, {}),
    /* @__PURE__ */ R(as, { children: [
      /* @__PURE__ */ m(is, { asChild: !0, children: /* @__PURE__ */ R(
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
            /* @__PURE__ */ m(Pt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(cs, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ R(
          xe,
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
          xe,
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
          xe,
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
          xe,
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
          xe,
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
          xe,
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
    /* @__PURE__ */ m(dn, {}),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(js, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(Vs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(Ks, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(yc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(ef, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(tf, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(dn, {}),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(ps, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: h,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(Gs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(vc, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(as, { children: [
      /* @__PURE__ */ m(is, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(Xr, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ R(cs, { align: "start", children: [
        /* @__PURE__ */ R(xe, { onClick: () => v("info"), children: [
          /* @__PURE__ */ m(Xr, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ R(xe, { onClick: () => v("note"), children: [
          /* @__PURE__ */ m(qs, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ R(xe, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ m(nf, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ R(xe, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ m(rf, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ R(xe, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ m(Xs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ R(as, { children: [
      /* @__PURE__ */ m(is, { asChild: !0, children: /* @__PURE__ */ R(
        It,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(ps, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(cs, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(qa, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(qa, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(pn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ m(ls, {}),
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(Xa, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(Xa, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(pn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ m(ls, {}),
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(Za, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(Za, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ m(ls, {}),
        /* @__PURE__ */ R(
          xe,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(pn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m(
      gl,
      {
        isOpen: l,
        onClose: () => u(!1),
        onInsert: g,
        position: d
      }
    ),
    /* @__PURE__ */ m(dn, {}),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(of, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ R(Ee, { children: [
      /* @__PURE__ */ m(dn, {}),
      /* @__PURE__ */ R(As, { children: [
        /* @__PURE__ */ m(Rs, { asChild: !0, children: /* @__PURE__ */ m(
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
            children: /* @__PURE__ */ m(uo, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ m(Ls, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ R(As, { children: [
      /* @__PURE__ */ m(Rs, { asChild: !0, children: /* @__PURE__ */ R(
        It,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Dn, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ m(Ls, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function J0({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [u, d] = U(""), [f, p] = U(""), [h, g] = U(!1), [y, v] = U(!1), [b, x] = U(!1), [S, w] = U(!1), [k, D] = U([]), [C, E] = U(0), [T, N] = U(null), [A, P] = U(!1), O = Y(!1), _ = Y(null), W = Y(null), V = Y(!1);
  q(() => {
    t && o && o.trim() && d(o);
  }, [t, o, r]);
  const I = B(() => {
    if (!u || !e) {
      D([]), E(0), N(null);
      return;
    }
    const $ = [];
    let H;
    try {
      if (y)
        H = new RegExp(u, h ? "g" : "gi");
      else {
        let F = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        b && (F = `\\b${F}\\b`), H = new RegExp(F, h ? "g" : "gi");
      }
      N(null);
    } catch (F) {
      N(F.message), D([]);
      return;
    }
    if (l) {
      let F;
      for (; (F = H.exec(i)) !== null; )
        $.push({
          from: F.index,
          to: F.index + F[0].length,
          text: F[0]
        });
    } else {
      const { doc: F } = e.state;
      F.descendants((Z, ue) => {
        if (Z.isText && Z.text) {
          let fe;
          for (; (fe = H.exec(Z.text)) !== null; )
            $.push({
              from: ue + fe.index,
              to: ue + fe.index + fe[0].length,
              text: fe[0]
            });
        }
        return !0;
      });
    }
    D($), $.length > 0 && C >= $.length && E(0);
  }, [u, h, y, b, e, C, l, i]);
  q(() => {
    I();
  }, [I]), q(() => {
    l && c && (t && k.length > 0 ? c(k, C) : c([], 0));
  }, [l, t, k, C, c]), q(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const $ = typeof e.commands.setSearchHighlight == "function";
    t && u && $ ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: h,
      useRegex: y,
      currentMatchIndex: C
    }) : $ && e.commands.clearSearchHighlight();
  }, [e, t, u, h, y, C, l, k, i]), q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), q(() => {
    if (k.length > 0 && C < k.length) {
      const $ = k[C];
      if (l) {
        const F = document.querySelector(".syntax-textarea");
        if (F && V.current) {
          const Z = parseInt(getComputedStyle(F).lineHeight) || 22, fe = i.substring(0, $.from).split(`
`).length;
          F.scrollTop = Math.max(0, (fe - 3) * Z);
        }
        V.current && (V.current = !1);
        return;
      }
      const H = e.view.domAtPos($.from);
      H.node && H.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), V.current && (V.current = !1);
    }
  }, [C, k, e, l, i]), q(() => {
    t && _.current && (_.current.focus(), _.current.select());
  }, [t, r]);
  const L = B(() => {
    k.length !== 0 && (V.current = !0, E(($) => ($ + 1) % k.length));
  }, [k.length]), z = B(() => {
    k.length !== 0 && (V.current = !0, E(($) => ($ - 1 + k.length) % k.length));
  }, [k.length]), K = B(() => {
    if (k.length === 0 || C >= k.length) return;
    const $ = k[C];
    if (l && a) {
      const H = i.substring(0, $.from) + f + i.substring($.to);
      a(H), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [k, C, f, e, I, l, i, a]), j = B(() => {
    if (k.length === 0) return;
    if (l && a) {
      const H = [...k].sort((Z, ue) => ue.from - Z.from);
      let F = i;
      H.forEach((Z) => {
        F = F.substring(0, Z.from) + f + F.substring(Z.to);
      }), a(F), setTimeout(I, 10);
      return;
    }
    const $ = [...k].sort((H, F) => F.from - H.from);
    e.chain().focus(), $.forEach((H) => {
      e.chain().setTextSelection({ from: H.from, to: H.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [k, f, e, I, l, i, a]), G = B(() => {
    if (k.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: h,
      useRegex: y,
      wholeWord: b
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [k, u, h, y, b, e, n]), J = B(($) => {
    $.key === "Enter" ? ($.preventDefault(), $.shiftKey ? z() : L(), _.current?.focus()) : $.key === "Escape" ? ($.preventDefault(), n()) : $.key === "h" && ($.ctrlKey || $.metaKey) ? ($.preventDefault(), w((H) => !H)) : $.key === "l" && ($.ctrlKey || $.metaKey) && $.shiftKey && ($.preventDefault(), G());
  }, [L, z, n, G]);
  return t ? /* @__PURE__ */ R(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: J,
      children: [
        /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(sf, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: _,
                type: "text",
                placeholder: "Find...",
                value: u,
                onChange: ($) => d($.target.value),
                className: `find-replace-input ${T ? "has-error" : ""}`
              }
            ),
            T && /* @__PURE__ */ m("span", { className: "find-replace-error", title: T, children: "!" })
          ] }),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: k.length > 0 ? `${C + 1} of ${k.length}` : u ? "No results" : "" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: z,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(af, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: L,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Pt, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: G,
              disabled: k.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${k.length} matches`,
              children: /* @__PURE__ */ m(cf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => g(($) => !$),
              className: `find-replace-btn ${h ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(lf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => x(($) => !$),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(uf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => v(($) => !$),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(df, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => w(($) => !$),
              className: `find-replace-btn ${S ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(hs, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ m(xt, { size: 16 })
            }
          )
        ] }),
        S && /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(hs, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: W,
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
              onClick: K,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ R(
            "button",
            {
              onClick: j,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(ff, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const ex = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), gt = ex ? "⌘" : "Ctrl", tx = ({ editor: e }) => {
  const [t, n] = U(!1), [r, o] = U(0), [s, i] = U(0), [a, c] = U(""), [l, u] = U(""), [d, f] = U(!1), [p, h] = U(!1);
  q(() => {
    if (!e) return;
    const D = () => {
      const E = e.storage.selectAllOccurrences;
      E ? (n(E.isActive), o(E.ranges.length), i(E.allMatches.length), c(E.searchTerm), u(E.typedBuffer), f(E.isTypingReplace), h(E.isIncremental)) : (n(!1), o(0), i(0));
    }, C = () => {
      D();
    };
    return e.on("transaction", C), D(), () => {
      e.off("transaction", C);
    };
  }, [e]);
  const g = B(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = B(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), v = B(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), b = B(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), x = B(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), S = B(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = B(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), k = B(() => {
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
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ R(Ee, { children: [
        /* @__PURE__ */ m(fo, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ m(Ee, { children: /* @__PURE__ */ R("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ R(Ee, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${gt}+D)`,
            children: /* @__PURE__ */ m(Qs, { size: 14 })
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${gt}+Shift+L)`,
            children: "All"
          }
        ),
        /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${gt}+B)`,
          children: /* @__PURE__ */ m(Ws, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${gt}+I)`,
          children: /* @__PURE__ */ m(zs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${gt}+U)`,
          children: /* @__PURE__ */ m(Bs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(Fs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: x,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(pn, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: S,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(xt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ R(Ee, { children: [
      /* @__PURE__ */ R("kbd", { children: [
        gt,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ R("kbd", { children: [
        gt,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ R("kbd", { children: [
        gt,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ R(Ee, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ R("kbd", { children: [
        gt,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, nx = En(tx), $r = "-dismissed";
function rx(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function ox(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, c] = U({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = Y(null), u = Y(""), d = Y(0);
  q(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const v = localStorage.getItem(n), b = localStorage.getItem(n + $r);
        if (v && !b) {
          let x = "";
          try {
            x = e.getHTML() || "";
          } catch {
            return;
          }
          v !== x && v.length > 50 && c((S) => ({ ...S, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, o]);
  const f = B(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const v = e.getHTML(), b = rx(v);
        if (b === d.current && v.length === u.current.length) {
          c((x) => ({ ...x, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        c((x) => ({ ...x, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = v, d.current = b, c((x) => ({
          ...x,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(v), setTimeout(() => {
          c((x) => x.status === "saved" ? { ...x, status: "idle" } : x);
        }, 2e3);
      } catch (v) {
        console.error("useAutoSave: Error saving content", v), c((b) => ({
          ...b,
          status: "error",
          error: v instanceof Error ? v.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  q(() => {
    if (!e || !o || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", v), () => {
      e.off("update", v), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, f]), q(() => {
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
  const p = B(() => {
    l.current && clearTimeout(l.current), f();
  }, [f]), h = B(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + $r), u.current = "", c({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (v) {
      console.warn("useAutoSave: Error clearing content", v);
    }
  }, [n]), g = B(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const v = localStorage.getItem(n);
      return v && e && !e.isDestroyed ? (c((b) => ({ ...b, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), u.current = v, localStorage.removeItem(n + $r), i?.(v);
          } catch (b) {
            console.warn("useAutoSave: Error setting content during recovery", b);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, i]), y = B(() => {
    try {
      localStorage.setItem(n + $r, "true"), c((v) => ({ ...v, hasRecoverableContent: !1 }));
    } catch (v) {
      console.warn("useAutoSave: Error dismissing recovery", v);
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
const sx = 200;
function ax(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: r = !1,
    enabled: o = !0
  } = t, [s, i] = U({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), a = Y(null), c = Y(""), l = B((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((b) => b.length > 0).length : 0, p = d.replace(/\s/g, "").length, h = u.length;
    let g = 0, y = 0;
    r && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((b) => b.trim().length > 0).length : 0, y = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / sx));
    return {
      words: f,
      characters: p,
      charactersWithSpaces: h,
      paragraphs: g,
      sentences: y,
      readingTime: v,
      isCalculating: !1
    };
  }, [r]);
  return q(() => {
    if (!e || !o) return;
    const u = () => {
      a.current && clearTimeout(a.current), i((d) => ({ ...d, isCalculating: !0 })), a.current = setTimeout(() => {
        try {
          const d = e.getText();
          if (d === c.current) {
            i((p) => ({ ...p, isCalculating: !1 }));
            return;
          }
          c.current = d;
          const f = l(d);
          i(f);
        } catch (d) {
          console.warn("useWordCount: Error calculating word count", d), i((f) => ({ ...f, isCalculating: !1 }));
        }
      }, n);
    };
    return u(), e.on("update", u), () => {
      e.off("update", u), a.current && clearTimeout(a.current);
    };
  }, [e, n, o, l]), s;
}
function qr(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), c = s.after(s.depth);
  o.replaceWith(a, c, i);
  const l = a + i.nodeSize;
  if (l < o.doc.content.size) {
    const u = o.doc.resolve(l);
    u.nodeAfter && u.nodeAfter.isTextblock ? o.setSelection(at.create(o.doc, l + 1)) : u.nodeAfter && o.setSelection(at.near(o.doc.resolve(l)));
  } else {
    const d = r.schema.nodes.paragraph.create();
    o.insert(l, d), o.setSelection(at.create(o.doc, l + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function ix(e, {
  editor: t,
  turndownService: n,
  editorModeRef: r,
  handleModeSwitch: o,
  wordCount: s,
  autoSaveState: i,
  setIsFindReplaceOpen: a,
  setFindReplaceFocusTrigger: c
}) {
  Pd(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? n.turndown(t.getHTML()) : "",
    getText: () => t?.getText() || "",
    setContent: (l) => {
      t && !t.isDestroyed && queueMicrotask(() => {
        t.commands.setContent(l);
      });
    },
    clearContent: () => {
      t && !t.isDestroyed && t.commands.clearContent();
    },
    focus: (l) => {
      t && !t.isDestroyed && t.commands.focus(l);
    },
    blur: () => {
      t && !t.isDestroyed && t.commands.blur();
    },
    isEmpty: () => t?.isEmpty || !0,
    isFocused: () => t?.isFocused || !1,
    getMode: () => r.current,
    setMode: (l) => o(l),
    toggleMode: () => {
      const l = r.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return o(l), l;
    },
    getWordCount: () => ({
      words: s.words,
      characters: s.characters,
      charactersWithSpaces: s.charactersWithSpaces
    }),
    undo: () => t?.commands.undo(),
    redo: () => t?.commands.redo(),
    canUndo: () => t?.can().undo() || !1,
    canRedo: () => t?.can().redo() || !1,
    insertContent: (l) => t?.commands.insertContent(l),
    insertImage: (l, u = "") => t?.commands.setImage({ src: l, alt: u }),
    insertTable: (l = 3, u = 3) => t?.commands.insertTable({ rows: l, cols: u, withHeaderRow: !0 }),
    insertCodeBlock: (l) => {
      l ? t?.commands.setCodeBlock({ language: l }) : t?.commands.setCodeBlock();
    },
    insertCallout: (l = "info") => t?.commands.insertCallout?.({ type: l }),
    insertHorizontalRule: () => {
      t && qr(t, t.state.selection.from, t.state.selection.from);
    },
    toggleBold: () => t?.commands.toggleBold(),
    toggleItalic: () => t?.commands.toggleItalic(),
    toggleUnderline: () => t?.commands.toggleUnderline(),
    toggleStrike: () => t?.commands.toggleStrike(),
    toggleCode: () => t?.commands.toggleCode(),
    toggleHighlight: () => t?.commands.toggleHighlight(),
    setHeading: (l) => {
      l === 0 ? t?.commands.setParagraph() : t?.commands.setHeading({ level: l });
    },
    toggleBulletList: () => t?.commands.toggleBulletList(),
    toggleOrderedList: () => t?.commands.toggleOrderedList(),
    toggleTaskList: () => t?.commands.toggleTaskList(),
    toggleBlockquote: () => t?.commands.toggleBlockquote(),
    setLink: (l) => t?.commands.setLink({ href: l }),
    unsetLink: () => t?.commands.unsetLink(),
    openFindReplace: () => {
      a(!0), c((l) => l + 1);
    },
    closeFindReplace: () => a(!1),
    save: () => i.save(),
    clearSavedContent: () => i.clear(),
    getSelectedText: () => {
      if (!t) return "";
      const { from: l, to: u } = t.state.selection;
      return t.state.doc.textBetween(l, u, " ");
    },
    isEditable: () => t?.isEditable || !1,
    setEditable: (l) => t?.setEditable(l),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!t) return [];
      const l = [];
      return t.state.doc.descendants((u, d) => {
        if (u.type.name === "heading") {
          const f = u.attrs.level, p = u.textContent.trim();
          p && l.push({ id: `toc-heading-${d}`, text: p, level: f, pos: d });
        }
      }), l;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (l) => {
      if (!(!t || t.isDestroyed))
        try {
          const u = t.state.doc.resolve(l), d = t.view.nodeDOM(u.before(u.depth + 1));
          if (d instanceof HTMLElement) {
            const f = t.view.dom.closest(".editor-content-wrapper");
            if (f) {
              const p = f.getBoundingClientRect(), g = d.getBoundingClientRect().top - p.top + f.scrollTop;
              f.scrollTo({ top: g - 20, behavior: "smooth" });
            } else
              d.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          t.commands.setTextSelection(l + 1);
        } catch {
        }
    }
  }), [t, n, o, s, i, a]);
}
function cx({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ R(Ee, { children: [
          /* @__PURE__ */ m(mf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ R("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ R(Ee, { children: [
          /* @__PURE__ */ m(xc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ R(Ee, { children: [
          /* @__PURE__ */ m(Tn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ R(Ee, { children: [
          /* @__PURE__ */ m(pf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function lx({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ R(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(hf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ R(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ m(Js, { className: "w-4 h-4" }),
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
              children: /* @__PURE__ */ m(xt, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
function ux(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (i) => {
    Array.from(i.querySelectorAll("ul")).forEach(o);
    const c = Array.from(i.children).filter((f) => f.tagName === "LI");
    let l = !1, u = !1;
    const d = (f) => {
      const p = f.querySelector(':scope > input[type="checkbox"]');
      if (p) return p;
      const h = f.querySelector(":scope > p");
      if (h) {
        const g = h.querySelector(':scope > input[type="checkbox"]');
        if (g) return g;
      }
      return null;
    };
    c.forEach((f) => {
      d(f) ? l = !0 : u = !0;
    }), l && (c.forEach((f) => {
      const p = d(f);
      if (p) {
        const h = p.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(h));
        const g = p.parentElement, y = g && g.tagName === "P" && g.parentElement === f;
        p.remove(), y && g.firstChild && g.firstChild.nodeType === Node.TEXT_NODE && (g.firstChild.textContent = (g.firstChild.textContent || "").replace(/^\s+/, ""));
        const v = Array.from(f.childNodes), b = [], x = [];
        v.forEach((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const k = w;
            if (k.tagName === "UL" || k.tagName === "OL" || k.tagName === "P")
              x.push(w);
            else if (k.tagName === "IMG" || k.tagName === "FIGURE")
              if (k.tagName === "IMG") {
                const D = n.createElement("figure");
                D.className = "image-resizer";
                const C = k.getAttribute("data-align") || "left", E = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[C] || "margin-right: auto;";
                D.style.cssText = E, D.appendChild(k.cloneNode(!0)), x.push(D);
              } else
                x.push(w);
            else
              b.push(w);
          } else
            b.push(w);
        });
        const S = x.filter((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const k = w;
            if (k.tagName === "P" && !k.textContent?.trim() && !k.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", b.length > 0) {
          const w = n.createElement("p");
          b.forEach((k) => w.appendChild(k)), w.firstChild && w.firstChild.nodeType === Node.TEXT_NODE && (w.firstChild.textContent = (w.firstChild.textContent || "").replace(/^\s+/, "")), (w.textContent?.trim() || w.querySelector("img, figure, code, br")) && f.appendChild(w);
        }
        S.forEach((w) => f.appendChild(w));
      }
    }), l && !u && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function dx(e) {
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
      let u = 0;
      const d = l;
      for (; l < t.length && s(t[l]); )
        u++, l++;
      if (u > 0 && l < t.length) {
        const f = r(c), p = r(t[l]);
        if (f !== null && p !== null) {
          for (let h = d; h < l; h++)
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
function fx(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = Array.from(r.querySelectorAll("li"));
  for (const s of o) {
    if (s.getAttribute("data-type") === "taskItem" || !s.querySelector(":scope > img, :scope > p > img, :scope > figure")) continue;
    const a = Array.from(s.childNodes), c = [], l = [];
    if (a.forEach((u) => {
      if (u.nodeType === Node.ELEMENT_NODE) {
        const d = u, f = d.tagName;
        if (f === "UL" || f === "OL")
          l.push(u);
        else if (f === "FIGURE")
          l.push(u);
        else if (f === "IMG") {
          const p = n.createElement("figure");
          p.className = "image-resizer";
          const h = d.getAttribute("data-align") || "left", g = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = g[h] || "margin-right: auto;", p.appendChild(d.cloneNode(!0)), l.push(p);
        } else if (f === "P")
          if (d.querySelectorAll("img").length === 0)
            l.push(u);
          else {
            const h = Array.from(d.childNodes), g = [];
            if (h.forEach((y) => {
              if (y.nodeType === Node.ELEMENT_NODE && y.tagName === "IMG") {
                if (g.length > 0) {
                  const w = n.createElement("p");
                  g.forEach((k) => w.appendChild(k.cloneNode(!0))), w.textContent?.trim() && l.push(w), g.length = 0;
                }
                const v = y, b = n.createElement("figure");
                b.className = "image-resizer";
                const x = v.getAttribute("data-align") || "left", S = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                b.style.cssText = S[x] || "margin-right: auto;", b.appendChild(v.cloneNode(!0)), l.push(b);
              } else
                g.push(y);
            }), g.length > 0) {
              const y = n.createElement("p");
              g.forEach((v) => y.appendChild(v.cloneNode(!0))), y.textContent?.trim() && l.push(y);
            }
          }
        else
          c.push(u);
      } else
        c.push(u);
    }), s.innerHTML = "", c.length > 0 && c.some((d) => (d.textContent || "").trim().length > 0)) {
      const d = n.createElement("p");
      c.forEach((f) => d.appendChild(f)), s.appendChild(d);
    }
    l.forEach((u) => s.appendChild(u));
  }
  return r.innerHTML;
}
function mx(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function oo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function px(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function Gi(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? px(r) : r.trim() ? `<p>${oo(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${oo(e)}</p>`;
}
function hx(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function gx(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += u; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${oo(f.text)}</p>` : i += `<li><p>${oo(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
          const p = t(a + 1, e[a + 1].depth);
          i += p.html, a = p.nextIdx;
        } else
          a++;
        i += "</li>";
      } else
        a++;
    }
    return i += d, { html: i, nextIdx: a };
  }, n = Math.min(...e.map((o) => o.depth));
  return t(0, n).html;
}
function yx(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let c = r.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (l.length <= 1 && !a)
        return s ? `${n}${Gi(c)}${o}` : t;
      const u = [];
      let d = [];
      const f = () => {
        d.length !== 0 && (u.push(gx(d)), d = []);
      };
      for (const p of l) {
        const h = hx(p);
        if (h) {
          if (d.length > 0) {
            const g = d[0].type;
            h.depth === 0 && h.type !== g && f();
          }
          d.push(h);
        } else
          f(), u.push(Gi(p.trim()));
      }
      return f(), `${n}${u.join("")}${o}`;
    }
  );
}
function vx(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: c
  } = n;
  let l = e;
  l = dx(l);
  const u = ["info", "note", "prompt", "resources", "todo"];
  return u.forEach((f) => {
    const p = new RegExp(`\`\`\`ad-${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(p, (h, g) => {
      const y = t(g.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${y}</div>`;
    });
  }), u.forEach((f) => {
    const p = new RegExp(`\`\`\`${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(p, (h, g) => {
      const y = t(g.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${y}</div>`;
    });
  }), l = l.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (f, p, h) => {
    const g = p.split("|").map((w) => w.trim());
    let y = "", v = "left", b = null;
    g.length === 1 ? y = g[0] : g.length === 2 ? (y = g[0], /^\d+$/.test(g[1]) ? b = g[1] : ["left", "center", "right"].includes(g[1]) ? v = g[1] : y = p) : g.length === 3 ? (y = g[0], ["left", "center", "right"].includes(g[1]) && (v = g[1]), /^\d+$/.test(g[2]) && (b = g[2])) : y = p;
    const x = b ? ` width="${b}" style="width: ${b}px"` : "", S = ` data-align="${v}"`;
    return `<img src="${h.trim()}" alt="${y}"${S}${x} />`;
  }), l = l.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), a && c && (l = l.replace(/@([^@\n]+)@/g, (f, p) => {
    const h = a(p);
    if (h) {
      const g = c(h);
      return `<span data-type="date-pill" data-date="${h}" class="date-pill ${g}"><span class="date-icon">📅</span><span class="date-text">${p.trim()}</span></span>`;
    }
    return f;
  })), r && !o && s && i && (l = l.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (f, p) => {
      const h = i(p);
      return s(h) ? `<span data-type="tag-pill" data-tag="${h}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${h}</span></span>` : f;
    }
  )), l = l.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((f, p) => p % 2 === 1 ? f : f.replace(/\[\[([^\[\]]+)\]\]/g, (h, g) => `<span data-wiki-link data-page-name="${g.trim()}" class="wiki-link">${g.trim()}</span>`)).join(""), l;
}
function bx(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = ux(t), t = fx(t), t = mx(t), t = yx(t), t;
}
function wx(e, t, n = {}) {
  const r = vx(e, t, n), o = t(r);
  return bx(o);
}
function xx({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = U(!1), [o, s] = U(0), i = B((u) => {
    u.preventDefault(), u.stopPropagation(), u.dataTransfer?.types.includes("Files") && (s((d) => d + 1), r(!0));
  }, []), a = B((u) => {
    u.preventDefault(), u.stopPropagation(), s((d) => {
      const f = d - 1;
      return f === 0 && r(!1), f;
    });
  }, []), c = B((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), l = B((u) => {
    u.preventDefault(), u.stopPropagation(), r(!1), s(0);
  }, []);
  return q(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", i), u.addEventListener("dragleave", a), u.addEventListener("dragover", c), u.addEventListener("drop", l), () => {
      u.removeEventListener("dragenter", i), u.removeEventListener("dragleave", a), u.removeEventListener("dragover", c), u.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ R("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(gf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ R("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function kx({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = U(e), [c, l] = U(t), u = Y(null), d = Y(null);
  q(() => {
    d.current?.focus(), d.current?.select();
  }, []), q(() => {
    const y = (b) => {
      u.current && !u.current.contains(b.target) && s();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [s]), q(() => {
    const y = (v) => {
      v.key === "Escape" ? s() : v.key === "Enter" && (v.metaKey || v.ctrlKey) && f();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i, c, s]);
  const f = () => {
    i.trim() && r(i.trim(), c.trim());
  }, h = (() => {
    let x = n.x - 160, S = n.y + 10;
    return x + 320 > window.innerWidth - 16 && (x = window.innerWidth - 320 - 16), x < 16 && (x = 16), S + 280 > window.innerHeight - 16 && (S = n.y - 280 - 10), S < 16 && (S = 16), { left: x, top: S };
  })(), g = /* @__PURE__ */ R(
    "div",
    {
      ref: u,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: h.left,
        top: h.top
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
              children: /* @__PURE__ */ m(xt, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ R("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ R("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ R("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(Us, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ m("span", { children: "Image URL" })
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: d,
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
              /* @__PURE__ */ m(fo, { className: "w-3.5 h-3.5" }),
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
              children: /* @__PURE__ */ m(pn, { className: "w-4 h-4" })
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
                  /* @__PURE__ */ m(Tn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(St, { children: g });
}
function Hr(e) {
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
      const b = l[1].length;
      t.push({
        type: `heading${b}`,
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
    const u = a.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (u) {
      const b = u[2].toLowerCase() === "x";
      t.push({
        type: b ? "task-checked" : "task-list",
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
    for (const b of h) {
      let x;
      for (b.regex.lastIndex = 0; (x = b.regex.exec(a)) !== null; )
        g.push({
          start: c + x.index,
          end: c + x.index + x[0].length,
          type: b.type,
          content: x[0]
        });
    }
    g.sort((b, x) => b.start - x.start);
    const y = [];
    let v = c;
    for (const b of g)
      b.start >= v && (y.push(b), v = b.end);
    for (const b of y)
      b.start > c + p && t.push({
        type: "text",
        content: a.substring(p, b.start - c),
        start: c + p,
        end: b.start
      }), t.push({
        type: b.type,
        content: b.content,
        start: b.start,
        end: b.end
      }), p = b.end - c;
    p < a.length && t.push({
      type: "text",
      content: a.substring(p),
      start: c + p,
      end: c + a.length
    }), r += a.length + 1;
  }
  return t;
}
function qi(e) {
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
function Vt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function Wr(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return Vt(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], u = i + l.length, d = t.filter((p) => p.start >= i && p.start < u);
      let f = i;
      for (const p of d)
        p.start > f && (o += Vt(e.substring(f, p.start))), o += `<span class="${qi(p.type)}">${Vt(p.content)}</span>`, f = p.end;
      f < u && (o += Vt(e.substring(f, u))), c < s.length - 1 && (o += `
`), i = u + 1;
    }
    return o;
  }
  const a = /* @__PURE__ */ new Map();
  n.forEach((c, l) => {
    for (let u = c.from; u < c.to; u++)
      a.set(u, { matchIdx: l, isCurrent: l === r });
  }), i = 0;
  for (let c = 0; c < s.length; c++) {
    const l = s[c], u = i + l.length, d = t.filter((p) => p.start >= i && p.start < u);
    let f = i;
    for (const p of d)
      p.start > f && (o += us(e, f, p.start, null, a)), o += us(e, p.start, p.end, qi(p.type), a), f = p.end;
    f < u && (o += us(e, f, u, null, a)), c < s.length - 1 && (o += `
`), i = u + 1;
  }
  return o;
}
function us(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const c = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const l = Vt(e.substring(c, i)), u = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${u}">${l}</mark></span>` : s += `<mark class="${u}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = Vt(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function Cx({
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
  const l = Y(null), u = Y(null), d = Y(null), f = Y(null), p = 5e3, h = 80, [g, y] = U(() => {
    const C = Hr(e);
    return Wr(e, C, i, a);
  }), v = Y(null), b = Gt(() => {
    if (e.length <= p) {
      const C = Hr(e), E = Wr(e, C, i, a);
      return v.current && (clearTimeout(v.current), v.current = null), E;
    }
    return null;
  }, [e, i, a]);
  q(() => {
    if (e.length <= p) {
      const C = Hr(e);
      y(Wr(e, C, i, a));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const C = Hr(e);
      y(Wr(e, C, i, a)), v.current = null;
    }, h), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, i, a]);
  const x = b ?? g, S = B(() => {
    const C = l.current, E = u.current, T = d.current;
    if (C) {
      const N = T?.parentElement, A = N ? N.clientHeight : 200;
      C.style.height = "auto";
      const P = Math.max(C.scrollHeight, A, 200);
      C.style.height = `${P}px`, E && (E.style.height = `${P}px`);
    }
  }, []);
  q(() => {
    const C = l.current;
    if (!C) return;
    const E = (T) => {
      const N = C.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: A, scrollHeight: P, clientHeight: O } = N, _ = A <= 0, W = A + O >= P - 1;
      (T.deltaY > 0 && !W || T.deltaY < 0 && !_) && (T.preventDefault(), N.scrollTop += T.deltaY);
    };
    return C.addEventListener("wheel", E, { passive: !1 }), () => C.removeEventListener("wheel", E);
  }, []);
  const w = B(() => {
  }, []);
  q(() => {
    S();
  }, [e, S]), q(() => {
    o && l.current && l.current.focus();
  }, [o]), q(() => {
    if (f.current && l.current) {
      const { start: C, end: E } = f.current;
      l.current.selectionStart = C, l.current.selectionEnd = E, f.current = null;
    }
  }, [e]);
  const k = B((C) => {
    const E = C.target;
    f.current = {
      start: E.selectionStart,
      end: E.selectionEnd
    }, t(E.value);
  }, [t]), D = B((C) => {
    const E = C.currentTarget, T = E.selectionStart, N = E.selectionEnd, A = E.value, P = T !== N;
    if (c) {
      if (C.key === "`" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(T, N), _ = A.substring(0, T) + "`" + O + "`" + A.substring(N);
          f.current = { start: T + 1, end: N + 1 }, t(_);
        } else if (A[T] === "`")
          f.current = { start: T + 1, end: T + 1 }, t(A), E.selectionStart = E.selectionEnd = T + 1;
        else {
          const O = A.substring(0, T) + "``" + A.substring(N);
          f.current = { start: T + 1, end: T + 1 }, t(O);
        }
        return;
      }
      if (C.key === "*" && !C.ctrlKey && !C.metaKey) {
        if (A[T - 1] === "*" && A[T], P) {
          C.preventDefault();
          const W = A.substring(T, N), V = A.substring(0, T) + "*" + W + "*" + A.substring(N);
          f.current = { start: T + 1, end: N + 1 }, t(V);
          return;
        }
        if (A[T] === "*") {
          C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const _ = A.substring(0, T) + "**" + A.substring(N);
        f.current = { start: T + 1, end: T + 1 }, t(_);
        return;
      }
      if (C.key === "_" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const _ = A.substring(T, N), W = A.substring(0, T) + "_" + _ + "_" + A.substring(N);
          f.current = { start: T + 1, end: N + 1 }, t(W);
          return;
        }
        if (A[T] === "_") {
          C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const O = A.substring(0, T) + "__" + A.substring(N);
        f.current = { start: T + 1, end: T + 1 }, t(O);
        return;
      }
      if (C.key === "~" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const _ = A.substring(T, N), W = A.substring(0, T) + "~" + _ + "~" + A.substring(N);
          f.current = { start: T + 1, end: N + 1 }, t(W);
          return;
        }
        if (A[T] === "~") {
          C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const O = A.substring(0, T) + "~~" + A.substring(N);
        f.current = { start: T + 1, end: T + 1 }, t(O);
        return;
      }
      if (C.key === "[" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(T, N), _ = A.substring(0, T) + "[" + O + "]()" + A.substring(N);
          f.current = { start: N + 3, end: N + 3 }, t(_);
        } else {
          const O = A.substring(0, T) + "[]()" + A.substring(N);
          f.current = { start: T + 1, end: T + 1 }, t(O);
        }
        return;
      }
      if (C.key === "]" && !C.ctrlKey && !C.metaKey && A[T] === "]") {
        C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
        return;
      }
      if (C.key === ")" && !C.ctrlKey && !C.metaKey && A[T] === ")") {
        C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
        return;
      }
      if (C.key === "Backspace" && !P && T > 0) {
        const O = A[T - 1], _ = A[T], W = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [V, I] of W)
          if (O === V && _ === I) {
            C.preventDefault();
            const L = A.substring(0, T - 1) + A.substring(T + 1);
            f.current = { start: T - 1, end: T - 1 }, t(L);
            return;
          }
        if (O === "[" && A.substring(T, T + 3) === "]()") {
          C.preventDefault();
          const V = A.substring(0, T - 1) + A.substring(T + 3);
          f.current = { start: T - 1, end: T - 1 }, t(V);
          return;
        }
      }
    }
    if (C.key === "Tab")
      if (C.preventDefault(), C.shiftKey) {
        const O = A.substring(0, T), _ = A.substring(T, N), W = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), z = O.substring(I), K = (z + _).split(`
`), j = K.map(($) => $.startsWith("  ") ? $.substring(2) : $.startsWith("	") ? $.substring(1) : $), G = L + j.join(`
`) + W, J = (z + _).length - j.join(`
`).length;
        f.current = {
          start: Math.max(I, T - (K[0].length - j[0].length)),
          end: N - J
        }, t(G);
      } else if (T === N) {
        const O = A.substring(0, T) + "  " + A.substring(N);
        f.current = { start: T + 2, end: T + 2 }, t(O);
      } else {
        const O = A.substring(0, T), _ = A.substring(T, N), W = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), K = (O.substring(I) + _).split(`
`), j = K.map((J) => "  " + J), G = L + j.join(`
`) + W;
        f.current = {
          start: T + 2,
          end: N + K.length * 2
        }, t(G);
      }
  }, [t, c]);
  return /* @__PURE__ */ R("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: x || `<span class="md-placeholder">${Vt(n)}</span>` },
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
let Xi = 0, Is = 0, Qu = 0;
function Mx(e) {
  Is++, Qu = e;
}
const Sx = En(function({
  visible: t,
  onClose: n,
  editor: r
}) {
  const [o, s] = U(!1), [i, a] = U({
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
  }), c = Y([]), l = Y(performance.now()), u = Y(0), d = Y(0), f = Y(0), p = Y(0), [h, g] = U(new Array(60).fill(0)), [y, v] = U(new Array(60).fill(0));
  q(() => {
    if (!t || !r) return;
    const D = () => {
      const C = performance.now();
      queueMicrotask(() => {
        const E = performance.now() - C;
        Mx(E);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), q(() => {
    if (!t) return;
    let D = 0, C = performance.now(), E = 0;
    const T = (N) => {
      const A = N - l.current;
      if (l.current = N, c.current.push({ time: N, duration: A }), c.current.length > 120 && (c.current = c.current.slice(-120)), A > 16.67 && d.current++, D++, N - C >= 1e3) {
        E = D, D = 0, C = N;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((j, G) => j + G.duration, 0) / P.length : 0, _ = P.length > 0 ? Math.max(...P.map((j) => j.duration)) : 0, W = performance.memory, V = W ? W.usedJSHeapSize / (1024 * 1024) : 0, I = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, z = Xi - f.current, K = Is - p.current;
        f.current = Xi, p.current = Is, a({
          fps: E,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(_ * 100) / 100,
          memoryUsed: Math.round(V * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: z,
          transactionCount: K,
          lastTransactionTime: Math.round(Qu * 100) / 100,
          domNodes: L,
          longFrames: d.current
        }), g((j) => [...j.slice(1), E]), v((j) => [...j.slice(1), O]), d.current = 0;
      }
      u.current = requestAnimationFrame(T);
    };
    return u.current = requestAnimationFrame(T), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const b = B(() => {
    n?.();
  }, [n]), x = B(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const S = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", w = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", k = (D, C, E) => {
    const A = D.map((P, O) => {
      const _ = O / (D.length - 1) * 120, W = 24 - Math.min(P, C) / C * 24;
      return `${_},${W}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
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
        /* @__PURE__ */ m(yf, { size: 14 }),
        /* @__PURE__ */ m("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: x, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ m(kc, { size: 12 }) : /* @__PURE__ */ m(Cc, { size: 12 }) }),
        /* @__PURE__ */ m("button", { onClick: b, title: "Close profiler", children: /* @__PURE__ */ m(xt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ R("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ R("div", { className: "perf-section", children: [
        /* @__PURE__ */ R("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: S(i.fps) }, children: i.fps })
        ] }),
        k(h, 70, S(i.fps))
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
class Ex extends Od {
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
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(vf, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ R("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ R("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ R(
            It,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(Js, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ R(
            It,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(pn, { className: "w-4 h-4" }),
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
                n ? /* @__PURE__ */ m(Pt, { className: "w-3 h-3" }) : /* @__PURE__ */ m(Mc, { className: "w-3 h-3" }),
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
                  children: o ? /* @__PURE__ */ R(Ee, { children: [
                    /* @__PURE__ */ m(bf, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ R(Ee, { children: [
                    /* @__PURE__ */ m(Dn, { className: "w-3 h-3" }),
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
function Tx({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function Dx(e, t) {
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
function Nx(e) {
  const [t, n] = _d(Dx, { status: "idle" }), r = Y(null), o = B(async (a, c, l, u, d) => {
    if (e) {
      n({
        type: "start-streaming",
        action: a,
        actionLabel: c,
        inputText: l,
        selectionRange: u
      });
      try {
        const f = e(a, l, d);
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
  }, [e]), s = B(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = B(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const Ax = {
  SpellCheck: xf,
  RefreshCw: wf,
  Minimize2: Cc,
  Maximize2: kc,
  FileText: Zs,
  MessageSquare: Sc,
  Sparkles: uo
};
function Rx({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = U(""), [a, c] = U(!1), l = Y(null), u = Y(null), d = e.filter((y) => y.scope === t || y.scope === "both");
  q(() => {
    const y = (b) => {
      l.current && !l.current.contains(b.target) && r();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [r]), q(() => {
    const y = (v) => {
      v.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), q(() => {
    a && u.current && u.current.focus();
  }, [a]);
  const p = B(() => {
    const v = d.length * 40 + (a ? 56 : 0) + 16, b = window.innerWidth, x = window.innerHeight;
    let S = o.top, w = o.left;
    return w + 260 > b - 8 && (w = b - 260 - 8), w < 8 && (w = 8), S + v > x - 8 && (S = o.top - v - 8), S < 8 && (S = 8), { top: S, left: w };
  }, [o, d.length, a])(), h = () => {
    s.trim() && (n("custom", s.trim()), i(""), c(!1));
  }, g = /* @__PURE__ */ m(
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
              /* @__PURE__ */ m(Sc, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ m(
                "input",
                {
                  ref: u,
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
            /* @__PURE__ */ m("div", { className: "h-px bg-border mx-2 my-0.5" }),
            d.filter((y) => !y.showCustomPrompt).map((y) => {
              const v = y.icon ? Ax[y.icon] : uo;
              return /* @__PURE__ */ R(
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
                    v && /* @__PURE__ */ m(v, { size: 15, className: "text-muted-foreground shrink-0" }),
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
  return /* @__PURE__ */ m(St, { onMouseDown: (y) => y.preventDefault(), children: g });
}
function Lx({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = Y(null), a = Y(null), [c, l] = U(!1), [u, d] = U(0);
  q(() => {
    if (i.current) {
      const w = new ResizeObserver((k) => {
        for (const D of k)
          d(D.contentRect.height);
      });
      return w.observe(i.current), () => w.disconnect();
    }
  }, []), q(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), q(() => {
    const w = (k) => {
      k.key === "Escape" && s();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [s]);
  const f = Gt(() => {
    const C = window.innerWidth, E = window.innerHeight;
    let T = t.selectionCenterX - 380 / 2;
    T + 380 > C - 8 && (T = C - 380 - 8), T < 8 && (T = 8);
    const N = E - t.selectionBottom - 8, A = t.selectionTop - 8, P = u || 200;
    let O, _ = !1;
    return N >= P || N >= A ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, _ = !0), O < 8 && (O = 8), O + P > E - 8 && (O = E - P - 8), { top: O, left: T, placedAbove: _ };
  }, [t, u]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", h = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", y = e.status === "complete", v = e.status === "error", b = B(() => {
    navigator.clipboard.writeText(p), l(!0), setTimeout(() => l(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const x = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", S = /* @__PURE__ */ m(
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
                g && /* @__PURE__ */ m(xc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ m("span", { className: "font-medium", children: v ? "Error" : h }),
                g && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (w) => {
                    w.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(xt, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ m(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: v ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ R("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  g && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ R("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || v) && /* @__PURE__ */ R(Ee, { children: [
                y && /* @__PURE__ */ R(Ee, { children: [
                  /* @__PURE__ */ m(
                    fn,
                    {
                      icon: hs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ m(
                    fn,
                    {
                      icon: Qs,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ m(
                    fn,
                    {
                      icon: c ? Tn : Dn,
                      label: c ? "Copied" : "Copy",
                      onClick: b
                    }
                  )
                ] }),
                /* @__PURE__ */ m(
                  fn,
                  {
                    icon: Js,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  fn,
                  {
                    icon: xt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ R(Ee, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  fn,
                  {
                    icon: xt,
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
  return /* @__PURE__ */ m(St, { onMouseDown: (w) => w.preventDefault(), children: S });
}
function fn({
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
const Ju = "paragon-editor-toc-width", Ix = 280, ed = 200, td = 500;
function Zi() {
  try {
    const e = localStorage.getItem(Ju);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= ed && t <= td)
        return t;
    }
  } catch {
  }
  return Ix;
}
function Px(e) {
  try {
    localStorage.setItem(Ju, String(e));
  } catch {
  }
}
function Ox(e, t, n) {
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
function _x(e) {
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
function Qi(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const Ji = En(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: r,
  title: o = "",
  minLevel: s = 1,
  maxLevel: i = 4,
  showLevelIndicators: a = !1,
  highlightActive: c = !0,
  treeView: l = !1,
  className: u = "",
  width: d,
  position: f = "right",
  scrollOffset: p = 20,
  onItemClick: h,
  renderItem: g,
  showToggleButton: y = !0,
  scrollContainerRef: v
}) {
  const [b, x] = U([]), [S, w] = U(null), [k, D] = U(n), [C, E] = U(/* @__PURE__ */ new Set()), [T, N] = U(() => {
    if (d) {
      const H = parseInt(d, 10);
      return isNaN(H) ? Zi() : H;
    }
    return Zi();
  }), A = Y(null), P = Y(null), O = Y(!1), _ = Y(0), W = Y(0);
  q(() => {
    D(n);
  }, [n]);
  const V = B((H) => {
    H.preventDefault(), H.stopPropagation(), O.current = !0, _.current = H.clientX, W.current = T, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [T]);
  q(() => {
    const H = (Z) => {
      if (!O.current) return;
      const ue = f === "right" ? _.current - Z.clientX : Z.clientX - _.current, fe = Math.min(td, Math.max(ed, W.current + ue));
      N(fe);
    }, F = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((Z) => (Px(Z), Z)));
    };
    return document.addEventListener("mousemove", H), document.addEventListener("mouseup", F), () => {
      document.removeEventListener("mousemove", H), document.removeEventListener("mouseup", F);
    };
  }, [f]);
  const I = B(() => {
    if (!t || t.isDestroyed) return;
    const H = Ox(t, s, i);
    x(H), S && !H.find((F) => F.id === S) && w(null);
  }, [t, s, i, S]);
  q(() => {
    if (!t) return;
    const H = () => {
      P.current && clearTimeout(P.current), P.current = setTimeout(() => I(), 300);
    };
    return I(), t.on("update", H), t.on("create", H), () => {
      t.off("update", H), t.off("create", H), P.current && clearTimeout(P.current);
    };
  }, [t, I]), q(() => {
    if (!t || !c || !k || b.length === 0) return;
    const H = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!H) return;
    const F = () => {
      const fe = H.getBoundingClientRect();
      let we = null;
      for (let De = b.length - 1; De >= 0; De--) {
        const je = b[De], Et = Qi(t, je.pos);
        if (Et && Et.getBoundingClientRect().top - fe.top <= p + 10) {
          we = je.id;
          break;
        }
      }
      !we && b.length > 0 && (we = b[0].id), w(we);
    };
    let Z;
    const ue = () => {
      cancelAnimationFrame(Z), Z = requestAnimationFrame(F);
    };
    return H.addEventListener("scroll", ue, { passive: !0 }), F(), () => {
      H.removeEventListener("scroll", ue), cancelAnimationFrame(Z);
    };
  }, [t, b, c, k, p, v]);
  const L = B((H) => {
    if (!t || t.isDestroyed) return;
    const F = Qi(t, H.pos);
    if (F) {
      const Z = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (Z) {
        const ue = Z.getBoundingClientRect(), we = F.getBoundingClientRect().top - ue.top + Z.scrollTop;
        Z.scrollTo({ top: we - p, behavior: "smooth" });
      } else
        F.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(H.pos + 1);
    } catch {
    }
    w(H.id), h?.(H);
  }, [t, p, h, v]), z = B(() => {
    const H = !k;
    D(H), r?.(H);
  }, [k, r]), K = B((H) => {
    E((F) => {
      const Z = new Set(F);
      return Z.has(H) ? Z.delete(H) : Z.add(H), Z;
    });
  }, []), j = B((H, F, Z = 0) => {
    if (g)
      return g(H, F, () => L(H));
    const ue = (H.level - s) * 14, fe = l && H.children && H.children.length > 0, we = C.has(H.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${F ? "toc-item-active" : ""} toc-level-${H.level}`,
        style: { paddingLeft: `${ue + 10}px` },
        children: /* @__PURE__ */ R(
          "button",
          {
            className: "toc-item-button",
            onClick: () => L(H),
            title: H.text,
            children: [
              fe && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (De) => {
                    De.stopPropagation(), K(H.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: we ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              a && /* @__PURE__ */ R("span", { className: "toc-level-indicator", children: [
                "H",
                H.level
              ] }),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: H.text })
            ]
          }
        )
      },
      H.id
    );
  }, [g, L, l, s, a, C, K]), G = B((H, F = 0) => H.map((Z) => {
    const ue = S === Z.id, fe = C.has(Z.id), we = Z.children && Z.children.length > 0;
    return /* @__PURE__ */ R("div", { children: [
      j(Z, ue, F),
      we && !fe && /* @__PURE__ */ m("div", { className: "toc-children", children: G(Z.children, F + 1) })
    ] }, Z.id);
  }), [S, C, j]), J = B(() => b.map((H) => {
    const F = S === H.id;
    return j(H, F);
  }), [b, S, j]);
  if (!t) return null;
  const $ = l ? _x(b) : [];
  return /* @__PURE__ */ R(Ee, { children: [
    y && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: z,
        title: k ? "Hide Table of Contents" : "Show Table of Contents",
        children: k ? /* @__PURE__ */ m(kf, { size: 16 }) : /* @__PURE__ */ m(Cf, { size: 16 })
      }
    ),
    /* @__PURE__ */ R(
      "div",
      {
        ref: A,
        className: `toc-sidebar ${k ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: k ? `${T}px` : "0px" },
        children: [
          k && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: V
            }
          ),
          /* @__PURE__ */ R("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: b.length === 0 ? /* @__PURE__ */ R("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ m("div", { className: "toc-list", children: l ? G($) : J() }) })
          ] })
        ]
      }
    )
  ] });
});
let wt = null, so = null;
async function nd() {
  if (wt) return wt;
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
      const u = l, d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = u.getAttribute("data-align") || "left", v = [p], b = y !== "left", x = g && g > 0;
      return (b || x) && v.push(b ? y : "left"), x && v.push(String(g)), `![${v.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const u = l.querySelector("img");
      if (!u) return c;
      const d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = u.getAttribute("data-align") || "left", v = [p], b = y !== "left", x = g && g > 0;
      (b || x) && v.push(b ? y : "left"), x && v.push(String(g));
      const S = `![${v.join(" | ")}](${d})`, w = l.parentNode;
      return w && w.nodeName === "LI" ? `
` + S + `
` : `

` + S + `

`;
    }
  }), n.addRule("taskListItem", {
    filter: (c) => c.nodeName === "LI" && c.getAttribute("data-type") === "taskItem",
    replacement: (c, l) => {
      const u = l, d = u.querySelector('input[type="checkbox"]'), f = d?.hasAttribute("checked") || d?.checked || u.getAttribute("data-checked") === "true";
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
    const l = c.getAttribute("src") || "", d = (c.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = c.getAttribute("width"), p = f ? parseInt(f, 10) : null, h = c.getAttribute("data-align") || "left", g = [d], y = h !== "left", v = p && p > 0;
    return (y || v) && g.push(y ? h : "left"), v && g.push(String(p)), `![${g.join(" \\| ")}](${l})`;
  }
  function o(c) {
    if (c.nodeType === Node.TEXT_NODE)
      return (c.textContent || "").replace(/\|/g, "\\|");
    if (c.nodeType === Node.ELEMENT_NODE) {
      const l = c;
      if (l.nodeName === "IMG") return r(l);
      if (l.nodeName === "BR") return "";
      let u = "";
      for (const d of Array.from(l.childNodes))
        u += o(d);
      if (l.nodeName === "STRONG" || l.nodeName === "B") return `**${u}**`;
      if (l.nodeName === "EM" || l.nodeName === "I") return `*${u}*`;
      if (l.nodeName === "S" || l.nodeName === "DEL") return `~~${u}~~`;
      if (l.nodeName === "CODE") return `\`${u}\``;
      if (l.nodeName === "MARK") return `==${u}==`;
      if (l.nodeName === "A") {
        const d = l.getAttribute("href") || "";
        return `[${u}](${d})`;
      }
      return u;
    }
    return "";
  }
  function s(c) {
    let l = "";
    for (const u of Array.from(c.childNodes))
      if (u.nodeType === Node.ELEMENT_NODE) {
        const d = u, f = d.nodeName;
        if (f === "UL" || f === "OL" || f === "LABEL" || f === "INPUT") continue;
        l += o(d);
      } else
        l += o(u);
    return l.trim();
  }
  function i(c, l, u = 0) {
    const d = "  ".repeat(u), f = c.nodeName, p = Array.from(c.childNodes).filter(
      (g) => g.nodeType === Node.ELEMENT_NODE && g.nodeName === "LI"
    ), h = f === "OL" ? parseInt(c.getAttribute("start") || "1", 10) : 1;
    p.forEach((g, y) => {
      const v = g.getAttribute("data-type") === "taskItem", b = g.getAttribute("data-checked") === "true", x = s(g);
      v ? l.push(`${d}- [${b ? "x" : " "}] ${x}`) : f === "OL" ? l.push(`${d}${h + y}. ${x}`) : l.push(`${d}- ${x}`);
      const S = Array.from(g.childNodes).filter(
        (w) => w.nodeType === Node.ELEMENT_NODE && (w.nodeName === "UL" || w.nodeName === "OL")
      );
      for (const w of S)
        i(w, l, u + 1);
    });
  }
  function a(c) {
    const l = [];
    for (const u of Array.from(c.childNodes)) {
      if (u.nodeType !== Node.ELEMENT_NODE) {
        const h = (u.textContent || "").trim();
        h && l.push(h.replace(/\|/g, "\\|"));
        continue;
      }
      const d = u, f = d.nodeName;
      if (f === "UL" || f === "OL") {
        i(d, l, 0);
        continue;
      }
      if (f === "FIGURE") {
        const h = d.querySelector("img");
        h && l.push(r(h));
        continue;
      }
      if (f === "IMG") {
        l.push(r(d));
        continue;
      }
      const p = o(d).trim();
      p && l.push(p);
    }
    return l.join(" <br> ") || "";
  }
  return n.addRule("table", {
    filter: "table",
    replacement: function(c, l) {
      const u = l, d = Array.from(u.querySelectorAll("tr"));
      if (d.length === 0) return "";
      const f = [];
      let p = !1;
      d.forEach((g, y) => {
        const v = Array.from(g.querySelectorAll("th, td")), b = v.map((x) => a(x));
        if (y > 0 && v.length > 0 && v[0].nodeName === "TH" && (p = !0), f.push("| " + b.join(" | ") + " |"), y === 0) {
          const x = v.map(() => "---").join(" | ");
          f.push("| " + x + " |");
        }
      });
      const h = p ? `
<!-- header-column -->` : "";
      return `

` + f.join(`
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
      const u = l.getAttribute("data-date");
      return u ? `@${ty(u)}@` : c;
    }
  }), n.addRule("tagPill", {
    filter: (c) => c.nodeName === "SPAN" && c.getAttribute("data-type") === "tag-pill",
    replacement: (c, l) => {
      const u = l.getAttribute("data-tag");
      return u ? `#${u}` : c;
    }
  }), n.addRule("wikiLink", {
    filter: (c) => c.nodeName === "SPAN" && c.hasAttribute("data-wiki-link"),
    replacement: (c, l) => {
      const u = l.getAttribute("data-page-name");
      return u ? `[[${u}]]` : c;
    }
  }), n.addRule("callout", {
    filter: (c) => c.nodeName === "DIV" && c.hasAttribute("data-callout"),
    replacement: (c, l) => {
      const u = l.getAttribute("data-type") || "info", d = c.trim().replace(/\n{3,}/g, `

`);
      return `

\`\`\`ad-${u}
${d}
\`\`\`

`;
    }
  }), n.addRule("listSeparation", {
    filter: (c) => c.nodeName === "UL" || c.nodeName === "OL",
    replacement: (c, l) => {
      const u = l.previousElementSibling, d = u && (u.nodeName === "UL" || u.nodeName === "OL");
      return `

` + c.trim() + `

`;
    }
  }), wt = n, n;
}
function $x() {
  !so && !wt && (so = nd().then((e) => (wt = e, e)));
}
function Hx() {
  return $x(), {
    turndown(e) {
      return wt ? wt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return wt !== null;
    },
    async ready() {
      wt || (so ? await so : await nd());
    }
  };
}
function Wx() {
  const e = Y(null);
  return e.current || (e.current = Hx()), e.current;
}
function zx(e, t, n) {
  q(() => {
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
            const u = a.doc.textBetween(c, l, " ");
            if (u.trim()) {
              n.openFindReplace(u.trim());
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
            const { state: a } = e, { selection: c } = a, { $from: l } = c, u = l.nodeBefore?.textContent || "";
            if (u === "#####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 5, to: l.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (u === "####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 4, to: l.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (u === "###") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (u === "##") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 2, to: l.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (u === "#") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (u === "-" || u === "*") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(u)) {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - u.length, to: l.pos }).toggleOrderedList().run();
              return;
            }
            const d = /^(-\s*)?\[([ x])?\]$/.exec(u);
            if (d) {
              o.preventDefault();
              const f = d[2] === "x", p = a.schema.nodes.taskList, h = a.schema.nodes.taskItem;
              if (p && h) {
                const g = a.tr, y = l.pos - u.length, v = l.pos;
                g.delete(y, v);
                const x = g.doc.resolve(y).blockRange();
                if (x) {
                  const S = [
                    { type: p, attrs: {} },
                    { type: h, attrs: { checked: f } }
                  ];
                  g.wrap(x, S), e.view.dispatch(g);
                  return;
                }
              }
              e.chain().focus().deleteRange({ from: l.pos - u.length, to: l.pos }).toggleTaskList().run();
              return;
            }
            if (u === ">") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBlockquote().run();
              return;
            }
            if (u === "```") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).toggleCodeBlock().run();
              return;
            }
            if (u === "---" || u === "***") {
              o.preventDefault(), qr(e, l.pos - 3, l.pos);
              return;
            }
            if (u === "—-") {
              o.preventDefault(), qr(e, l.pos - 2, l.pos);
              return;
            }
            if (u === "—") {
              o.preventDefault(), qr(e, l.pos - 1, l.pos);
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
const Bx = new Ie("tableCellMenu");
let ec = !1, zr = null;
function Fx() {
  ec || (ec = !0, document.addEventListener("mouseover", (e) => {
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
function Ux(e) {
  return Fx(), new Pe({
    key: Bx,
    state: {
      init() {
        return He.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && zr ? zr.map(t.mapping, t.doc) : (zr = Yx(o.doc, e), zr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Yx(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = Ge.widget(o + 1, (i) => {
        const a = document.createElement("div");
        a.className = "table-cell-menu-wrapper ProseMirror-widget", a.setAttribute("contenteditable", "false"), a.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const c = document.createElement("button");
        c.className = "table-cell-menu-btn", c.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', c.title = "Table options", c.type = "button";
        const l = document.documentElement.classList.contains("dark"), u = l ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", d = l ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", f = l ? "#999" : "#666", p = l ? "#2a2a2a" : "#f5f5f5";
        return c.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + u + ";border:1px solid " + d + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + f + ";pointer-events:auto;padding:0;", c.addEventListener("mouseenter", () => {
          c.style.opacity = "1", c.style.background = p, c.style.transform = "scale(1.05)";
        }), c.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), c.style.background = u, c.style.transform = "scale(1)";
        }), c.addEventListener("click", (h) => {
          h.preventDefault(), h.stopPropagation();
          const g = c.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), jx(h, t, o, g);
        }), a.appendChild(c), a;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), He.create(e, n);
}
function jx(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const i = 170, a = 280;
  let c = Math.max(0, Math.min(r.top, window.innerHeight)), l = Math.max(0, Math.min(r.bottom, window.innerHeight)), u = Math.max(0, Math.min(r.left, window.innerWidth)), d = l + 4, f = u - i + r.width + 8;
  f + i > window.innerWidth - 12 && (f = window.innerWidth - i - 12), f < 12 && (f = 12), d + a > window.innerHeight - 12 && (d = c - a - 4), d < 12 && (d = 12), d + a > window.innerHeight - 12 && (d = window.innerHeight - a - 12);
  const p = document.documentElement.classList.contains("dark"), h = p ? "#1f1f1f" : "#ffffff", g = p ? "#3a3a3a" : "#e5e5e5", y = p ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + d + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + h + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + y + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const v = t.state.doc.resolve(n);
  let b = !1;
  for (let N = v.depth; N >= 0; N--)
    if (v.node(N).type.name === "table") {
      v.node(N).firstChild?.firstChild?.type.name === "tableHeader" && (b = !0);
      break;
    }
  const x = [
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
    { label: "Copy Table", icon: "copy", action: () => Vx(t) }
  ], S = {
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
      const O = S[N.icon || ""] || "", _ = N.destructive ? k : D;
      A.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + _ + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + N.label + "</span>", A.addEventListener("mouseenter", () => {
        A.style.background = N.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : w;
      }), A.addEventListener("mouseleave", () => {
        A.style.background = "transparent";
      }), A.addEventListener("click", (W) => {
        W.preventDefault(), W.stopPropagation(), N.action && N.action(), s.remove();
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
function Vx(e) {
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
const Kx = Pf.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Ux(this.editor)
    ];
  }
}), Gx = Of.extend({}), Jn = new Ie("tableSorting");
let Kt = null, qn = null;
function qx(e) {
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
function Xx(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function Zx(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (h, g) => {
    if (h.type.name === "table" && g === t)
      return s = h, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Kt?.tablePos === t && Kt?.columnIndex === n && Kt?.direction === "asc" ? "desc" : "asc";
  Kt = { tablePos: t, columnIndex: n, direction: i }, qn = null;
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
    tc(n, i), o.dispatch(r.tr.setMeta(Jn, { updated: !0 }));
    return;
  }
  const u = l.map((h) => {
    let g = "", y = 0;
    return h.node.forEach((v) => {
      y === n && (g = v.textContent || ""), y++;
    }), { ...h, sortValue: qx(g) };
  }), d = u.map((h, g) => g);
  u.sort((h, g) => Xx(h.sortValue, g.sortValue, i));
  const f = u.map((h, g) => l.indexOf(h));
  if (d.some((h, g) => h !== f[g])) {
    const h = [];
    c.forEach((v) => h.push(v.node)), u.forEach((v) => h.push(v.node));
    const g = s.type.create(s.attrs, h), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(Jn, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Jn, { updated: !0 }));
  tc(n, i);
}
function tc(e, t) {
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
function Qx(e, t, n, r) {
  const o = document.createElement("span");
  o.className = "table-sort-btn-inline", o.setAttribute("contenteditable", "false"), o.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const s = document.createElement("button");
  s.className = "table-sort-btn", s.setAttribute("contenteditable", "false"), s.type = "button";
  const i = document.documentElement.classList.contains("dark"), a = i ? "#60a5fa" : "#3b82f6", c = i ? "#666" : "#aaa", l = i ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return s.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? a : c) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", s.addEventListener("mouseenter", () => {
    s.style.background = l, s.style.opacity = "1", s.style.color = a;
  }), s.addEventListener("mouseleave", () => {
    s.style.background = "transparent", s.style.opacity = e ? "1" : "0.5", s.style.color = e ? a : c;
  }), s.addEventListener("click", (u) => {
    u.preventDefault(), u.stopPropagation(), Zx(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function Jx(e) {
  return new Pe({
    key: Jn,
    state: {
      init() {
        return He.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Jn);
        return !t.docChanged && !s?.updated && qn ? qn.map(t.mapping, t.doc) : (qn = ek(o.doc, e), qn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function ek(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "table") {
      const s = o;
      r.forEach((i, a) => {
        if (i.type.name === "tableRow") {
          let c = 0, l = 0;
          i.forEach((u, d) => {
            if (u.type.name === "tableHeader") {
              const f = o + 1 + a + 1 + l;
              let p = f + 1;
              u.forEach((x, S) => {
                x.type.name === "paragraph" && (p = f + 1 + S + x.nodeSize - 1);
              });
              const g = Kt?.tablePos === s && Kt?.columnIndex === c ? Kt.direction : null, y = c, v = s, b = Ge.widget(p, () => Qx(g, v, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(b);
            }
            l += u.nodeSize, c++;
          });
        }
      });
    }
  }), He.create(e, n);
}
const tk = et.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Jx(this.editor)];
  }
});
function Da(e, t, n, r, o, s = {}) {
  const i = e.doc.nodeAt(t);
  if (!i) return !1;
  e.setNodeMarkup(t, n, i.attrs);
  const a = e.doc.nodeAt(t);
  if (!a) return !1;
  const c = [];
  a.forEach((l, u) => {
    l.type === o && c.push(t + 1 + u);
  });
  for (let l = c.length - 1; l >= 0; l--) {
    const u = c[l], d = e.doc.nodeAt(u);
    d && d.type === o && e.setNodeMarkup(u, r, s);
  }
  return !0;
}
const nk = _f.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === i || h.type === a || h.type === c) {
            d = h.type, f = s.before(p);
            break;
          }
        }
        if (d === i)
          return e.liftListItem("listItem");
        if (d === a || d === c) {
          if (!r) return !0;
          if (Da(n, f, i, l, u, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), rk = $f.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === i || h.type === a || h.type === c) {
            d = h.type, f = s.before(p);
            break;
          }
        }
        if (d === c)
          return e.liftListItem("listItem");
        if (d === a || d === i) {
          if (!r) return !0;
          if (Da(n, f, c, l, u, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), ok = Wf.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: c, $to: l } = a, u = c.blockRange(l);
        if (!u)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let w = c.depth; w > 0; w--)
          if (c.node(w).type === d) {
            p = !0, c.before(w);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const h = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let v = null, b = -1;
        for (let w = c.depth; w > 0; w--) {
          const k = c.node(w);
          if (k.type === h || k.type === g) {
            v = k, b = c.before(w);
            break;
          }
        }
        if (v) {
          if (!o) return !0;
          const w = b, k = r.doc.nodeAt(w);
          if (!k) return !1;
          r.setNodeMarkup(w, d, k.attrs);
          const D = r.doc.nodeAt(w);
          if (!D) return !1;
          const C = [];
          D.forEach((E, T) => {
            E.type === y && C.push(w + 1 + T);
          });
          for (let E = C.length - 1; E >= 0; E--) {
            const T = C[E], N = r.doc.nodeAt(T);
            N && N.type === y && r.setNodeMarkup(T, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const x = Qa(u, d);
        if (x) {
          r.wrap(u, x);
          const { $from: w } = r.selection;
          let k = -1;
          for (let D = w.depth; D > 0; D--)
            if (w.node(D).type === d) {
              k = w.before(D);
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
                N && N.type === y && r.setNodeMarkup(T, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const S = Qa(u, h);
        if (S) {
          r.wrap(u, S);
          const { $from: w } = r.selection;
          let k = -1;
          for (let D = w.depth; D > 0; D--)
            if (w.node(D).type === h) {
              k = w.before(D);
              break;
            }
          return k >= 0 && Da(r, k, d, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), sk = zf.extend({
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
        const i = r.node(s);
        if (!i.attrs.checked)
          return t.commands.splitListItem(this.name);
        const c = r.start(s), l = i.firstChild;
        if (!l || !l.isTextblock)
          return t.commands.splitListItem(this.name);
        if (r.pos - c <= 1) {
          const d = r.before(s), { tr: f } = n, p = n.schema.nodes.taskItem, h = n.schema.nodes.paragraph, g = p.create(
            { checked: !1 },
            h.create()
          );
          f.insert(d, g);
          const y = d + 1;
          return f.setSelection(at.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
        key: new Ie("taskItemInputRule"),
        props: {
          handleTextInput(n, r, o, s) {
            if (s !== " ") return !1;
            const { state: i } = n, a = i.doc.resolve(r), c = a.parent.textBetween(
              0,
              a.parentOffset,
              void 0,
              "￼"
            ), u = /^\s*(-\s*)?\[([( |x])?\]$/.exec(c);
            if (!u) return !1;
            const d = u[2] === "x", f = a.start() + (u.index || 0), p = r, h = i.tr;
            h.delete(f, p);
            const y = h.doc.resolve(f).blockRange();
            if (!y || !t || !e) return !1;
            const v = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (h.wrap(y, v), f > 1) {
              const b = h.doc.resolve(f - 1).nodeBefore;
              b && b.type === t && Bf(h.doc, f - 1) && h.join(f - 1);
            }
            return n.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), ak = Hf.extend({
  content: "paragraph block*"
}), nc = new Ie("collapsibleList");
function Ps(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function Os(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function ik(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let wn = null;
function ds(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !Os(o))
      return !0;
    const i = Ps(o, s), a = t.collapsedItems.has(i);
    r.push(
      Ge.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${a ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const c = o.firstChild;
    if (c && c.type.name === "paragraph") {
      const l = s + 1 + c.nodeSize - 1, u = Ge.widget(
        l,
        () => {
          const d = CSS.escape(i), f = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${d}"]`
          );
          if (f) {
            f.classList.contains("collapsed") !== a && (f.classList.remove("collapsed", "expanded"), f.classList.add(a ? "collapsed" : "expanded"), f.title = a ? "Click to expand" : "Click to collapse");
            const y = f.parentElement;
            if (y) return y;
          }
          const p = document.createElement("span");
          p.className = "collapsible-list-chevron-wrapper", p.setAttribute("contenteditable", "false");
          const h = document.createElement("button");
          return h.className = `collapsible-list-chevron ${a ? "collapsed" : "expanded"}`, h.setAttribute("data-list-item-id", i), h.setAttribute("contenteditable", "false"), h.setAttribute("tabindex", "-1"), h.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', h.title = a ? "Click to expand" : "Click to collapse", h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = h.classList.contains("collapsed");
            h.classList.remove("collapsed", "expanded"), h.classList.add(y ? "expanded" : "collapsed"), h.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), wn && wn.dispatch(
              wn.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), p.appendChild(h), p;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(u);
    }
    if (a && ik(o, s)) {
      let u = s + 1;
      o.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && r.push(
          Ge.node(u, u + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += d.nodeSize;
      });
    }
    return !0;
  }), He.create(e, r);
}
const ck = et.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !Os(o))
          return !1;
        const s = Ps(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && Os(o) && n.collapsedItems.add(Ps(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Pe({
        key: nc,
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
              decorations: ds(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: ds(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = nc.getState(n);
            return r?.decorations ? r.decorations : ds(n.doc, e, t);
          }
        }
      })
    ];
  }
}), be = Kf();
be.register("javascript", ea);
be.register("js", ea);
be.register("jsx", ea);
be.register("typescript", ta);
be.register("ts", ta);
be.register("tsx", ta);
be.register("python", Tc);
be.register("py", Tc);
be.register("xml", na);
be.register("html", na);
be.register("svg", na);
be.register("css", Gf);
be.register("json", qf);
be.register("bash", po);
be.register("sh", po);
be.register("shell", po);
be.register("zsh", po);
const _s = {
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
}, Br = /* @__PURE__ */ new Set(), Fr = /* @__PURE__ */ new Set();
async function lk(e) {
  if (be.registered(e)) return !0;
  const t = _s[e];
  if (!t) return !1;
  if (Fr.has(e)) return !0;
  if (Br.has(e))
    return new Promise((n) => {
      const r = () => {
        Fr.has(e) ? n(!0) : Br.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  Br.add(e);
  try {
    const r = (await t()).default;
    be.register(e, r), Fr.add(e);
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
          i !== e && !be.registered(i) && (be.register(i, r), Fr.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Br.delete(e);
  }
}
function uk({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = U(!1), [s, i] = U(!1), [a, c] = U(!0), l = Y(null), u = e.attrs.language || "plaintext";
  q(() => {
    const g = l.current;
    if (!g || s) return;
    const y = new IntersectionObserver(
      (v) => {
        for (const b of v)
          b.isIntersecting && (i(!0), y.unobserve(g));
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
  }, [s]), q(() => {
    if (s && u !== "plaintext") {
      if (be.registered(u)) {
        c(!0);
        return;
      }
      _s[u] && (c(!1), lk(u).then((g) => {
        c(g);
      }));
    }
  }, [s, u]);
  const d = B(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (g) {
      console.error("Failed to copy:", g);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(_s)])).sort(), h = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ R(kn, { className: "code-block-wrapper", ref: l, children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ R(
          "select",
          {
            value: u,
            onChange: (g) => t({ language: g.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ m("option", { value: "plaintext", children: "Plain Text" }),
              p.map((g) => /* @__PURE__ */ m("option", { value: g, children: g.charAt(0).toUpperCase() + g.slice(1) }, g))
            ]
          }
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: h }),
        /* @__PURE__ */ m(Pt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: d,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ m(Tn, { size: 14 }) : /* @__PURE__ */ m(Dn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !a ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m($s, { className: s && a ? `language-${u}` : "language-plaintext" }) })
  ] });
}
const dk = Vf.extend({
  addNodeView() {
    return co(uk);
  }
}).configure({
  lowlight: be,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
}), Ur = {
  info: { icon: Xr, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: bc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: wc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: qs, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Xs, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function fk({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = U(!1), [s, i] = U(!1), [a, c] = U(null), l = Y(null), u = Y(null), d = e.attrs.type || "info", f = Ur[d] || Ur.info, p = f.icon, h = B(() => {
    if (u.current) {
      const b = u.current.getBoundingClientRect();
      c({
        top: b.bottom + 4,
        left: b.left
      });
    }
  }, []);
  q(() => {
    if (!r) return;
    const b = (x) => {
      l.current && !l.current.contains(x.target) && u.current && !u.current.contains(x.target) && o(!1);
    };
    return document.addEventListener("mousedown", b), document.addEventListener("touchstart", b, { passive: !0 }), () => {
      document.removeEventListener("mousedown", b), document.removeEventListener("touchstart", b);
    };
  }, [r]), q(() => {
    if (!r) return;
    const b = () => o(!1);
    return window.addEventListener("scroll", b, !0), () => window.removeEventListener("scroll", b, !0);
  }, [r]);
  const g = B(() => {
    n.isEditable && (r || h(), o(!r));
  }, [n.isEditable, r, h]), y = (b) => {
    t({ type: b }), o(!1);
  }, v = B((b) => {
    b.stopPropagation(), i((x) => !x);
  }, []);
  return /* @__PURE__ */ R(kn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ R(
      "div",
      {
        className: "callout-header",
        contentEditable: !1,
        onClick: v,
        style: { cursor: "pointer" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ R(
            "button",
            {
              ref: u,
              className: "callout-header-button",
              onClick: (b) => {
                b.stopPropagation(), g();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor },
              contentEditable: !1,
              children: [
                /* @__PURE__ */ m(p, { size: 18 }),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }),
                n.isEditable && /* @__PURE__ */ m(Pt, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(Mc, { size: 16 }) : /* @__PURE__ */ m(Pt, { size: 16 })
            }
          ),
          r && n.isEditable && a && /* @__PURE__ */ m(St, { children: /* @__PURE__ */ m(
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
              children: Object.keys(Ur).map((b) => {
                const x = Ur[b], S = x.icon;
                return /* @__PURE__ */ R(
                  "button",
                  {
                    className: `callout-type-option ${b === d ? "active" : ""}`,
                    onClick: (w) => {
                      w.stopPropagation(), y(b);
                    },
                    onMouseDown: (w) => w.stopPropagation(),
                    style: { "--callout-option-color": x.color },
                    children: [
                      /* @__PURE__ */ m(S, { size: 16, style: { color: x.borderColor } }),
                      /* @__PURE__ */ m("span", { children: x.label })
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
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m($s, {}) })
  ] });
}
const mk = mo.create({
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
      Nn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return co(fk);
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
}), pk = Xf.extend({
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
        Nn(this.options.HTMLAttributes, e)
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
        const z = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[L] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${z}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (L) => !(!L || L.startsWith("data:") || L.startsWith("blob:") || L.startsWith("http://") || L.startsWith("https://")), l = (L) => {
        c(L) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(L).then((z) => {
          a.src = z, a.style.opacity = "1";
        }).catch(() => {
          a.src = L, a.style.opacity = "1";
        })) : a.src = L;
      };
      l(t.attrs.src);
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
      const p = (L, z, K) => {
        const j = document.createElement("button");
        return j.setAttribute("type", "button"), j.style.cssText = `
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
        `, j.innerHTML = `${z}<span>${L}</span>`, j.addEventListener("mouseenter", () => {
          j.style.background = "oklch(0.95 0 0)";
        }), j.addEventListener("mouseleave", () => {
          j.style.background = "transparent";
        }), j.addEventListener("click", (G) => {
          G.preventDefault(), G.stopPropagation(), K(), f.style.display = "none", E = !1;
        }), j;
      }, h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", h, () => {
        const L = typeof r == "function" ? r() : null;
        if (L != null && e.onImageClick) {
          const z = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: L,
            rect: z
          });
        }
      })), f.appendChild(p("Copy image", g, async () => {
        const L = o.attrs.src;
        try {
          const K = await (await fetch(L)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [K.type]: K })
          ]);
        } catch {
          try {
            const z = new window.Image();
            z.crossOrigin = "anonymous", await new Promise((G, J) => {
              z.onload = () => G(), z.onerror = () => J(new Error("Image load failed")), z.src = L;
            });
            const K = document.createElement("canvas");
            K.width = z.naturalWidth, K.height = z.naturalHeight;
            const j = K.getContext("2d");
            if (j) {
              j.drawImage(z, 0, 0);
              const G = await new Promise(
                (J) => K.toBlob(J, "image/png")
              );
              G ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": G })
              ]) : await navigator.clipboard.writeText(L);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(L);
            } catch {
            }
          }
        }
      })), f.appendChild(p("Copy URL", v, async () => {
        const L = o.attrs.src;
        try {
          await navigator.clipboard.writeText(L);
        } catch {
        }
      })), f.appendChild(p("Save image", y, () => {
        const L = o.attrs.src, z = o.attrs.alt || "image", K = document.createElement("a");
        K.href = L, K.download = z, K.target = "_blank", K.rel = "noopener noreferrer", document.body.appendChild(K), K.click(), setTimeout(() => {
          document.body.removeChild(K);
        }, 100);
      }));
      const b = document.createElement("div");
      b.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(b);
      const x = document.createElement("div");
      x.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, x.textContent = "Alignment", f.appendChild(x);
      const S = document.createElement("div");
      S.style.cssText = `
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
        k.forEach((z) => {
          (z.getAttribute("data-align-value") || "left") === L ? (z.style.background = "oklch(1 0 0)", z.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", z.style.color = "oklch(0.25 0 0)", z.style.fontWeight = "600") : (z.style.background = "transparent", z.style.boxShadow = "none", z.style.color = "oklch(0.5 0 0)", z.style.fontWeight = "400");
        });
      };
      w.forEach(({ value: L, label: z, icon: K }) => {
        const j = document.createElement("button");
        j.setAttribute("type", "button"), j.setAttribute("data-align-value", L), j.setAttribute("title", `Align ${z.toLowerCase()}`), j.style.cssText = `
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
        `, j.innerHTML = `${K}<span>${z}</span>`, j.addEventListener("click", (G) => {
          G.preventDefault(), G.stopPropagation();
          const J = typeof r == "function" ? r() : null;
          if (J != null)
            try {
              const { state: $, dispatch: H } = n.view, F = $.doc.nodeAt(J);
              if (F && F.type.name === "resizableImage") {
                const Z = $.tr.setNodeMarkup(J, void 0, {
                  ...F.attrs,
                  align: L
                });
                H(Z);
              }
            } catch {
              n.chain().focus().setNodeSelection(J).updateAttributes("resizableImage", {
                align: L
              }).run();
            }
          D(L);
        }), k.push(j), S.appendChild(j);
      }), f.appendChild(S);
      const C = () => {
        const L = o.attrs.align || "left";
        D(L);
      };
      let E = !1;
      d.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), E)
          f.style.display = "none", E = !1;
        else {
          const z = d.getBoundingClientRect(), K = 200, j = f.closest('[role="dialog"]');
          let G = 0, J = 0;
          if (j) {
            const fe = j.getBoundingClientRect();
            G = fe.left, J = fe.top;
          }
          let $ = z.bottom + 4 - J, H = z.right - K - G;
          const F = window.innerHeight, Z = window.innerWidth, ue = 200;
          z.bottom + 4 + ue > F && ($ = z.top - ue - 4 - J), H + G < 8 && (H = 8 - G), H + K + G > Z - 8 && (H = Z - K - 8 - G), f.style.top = `${$}px`, f.style.left = `${H}px`, f.style.display = "flex", E = !0, C();
        }
      });
      const T = (L) => {
        !f.contains(L.target) && !d.contains(L.target) && (f.style.display = "none", E = !1);
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
      }), s.appendChild(a), s.appendChild(N), s.appendChild(u), s.appendChild(d);
      const A = s.closest('[role="dialog"]');
      A ? A.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", N.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", N.style.opacity = "0", E || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const P = (L) => {
        L.preventDefault(), L.stopPropagation();
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
        const K = document.createElement("img");
        K.src = a.src, K.alt = a.alt || "", K.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const j = document.createElement("button");
        j.setAttribute("type", "button"), j.setAttribute("aria-label", "Close"), j.style.cssText = `
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
        `, j.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', j.addEventListener("mouseenter", () => {
          j.style.background = "rgba(255, 255, 255, 0.25)";
        }), j.addEventListener("mouseleave", () => {
          j.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const G = o.attrs.alt;
        let J = null;
        G && G.trim() && (J = document.createElement("div"), J.style.cssText = `
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
          `, J.textContent = G);
        const $ = () => {
          z.style.opacity = "0", K.style.transform = "scale(0.92)", setTimeout(() => z.remove(), 200);
        };
        z.addEventListener("click", (Z) => {
          Z.target === z && $();
        }), j.addEventListener("click", $);
        const H = (Z) => {
          Z.key === "Escape" && ($(), document.removeEventListener("keydown", H));
        };
        document.addEventListener("keydown", H), z.appendChild(K), z.appendChild(j), J && z.appendChild(J);
        const F = s.closest('[role="dialog"]');
        F ? F.appendChild(z) : document.body.appendChild(z), requestAnimationFrame(() => {
          z.style.opacity = "1", K.style.transform = "scale(1)";
        });
      };
      N.addEventListener("click", P);
      let O, _;
      const W = (L) => {
        L.preventDefault(), O = L.clientX, _ = a.offsetWidth, document.addEventListener("mousemove", V), document.addEventListener("mouseup", I);
      }, V = (L) => {
        const z = L.clientX - O, K = Math.max(100, _ + z);
        a.style.width = `${K}px`;
      }, I = () => {
        document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const L = typeof r == "function" ? r() : null, z = a.offsetWidth;
        if (L != null)
          try {
            const { state: K, dispatch: j } = n.view, G = K.doc.nodeAt(L);
            if (G && G.type.name === "resizableImage") {
              const J = K.tr.setNodeMarkup(L, void 0, {
                ...G.attrs,
                width: z
              });
              j(J);
            }
          } catch {
            n.chain().focus().setNodeSelection(L).updateAttributes("resizableImage", {
              width: z
            }).run();
          }
      };
      return u.addEventListener("mousedown", W), {
        dom: s,
        update: (L) => L.type.name !== "resizableImage" ? !1 : (o = L, l(L.attrs.src), a.alt = L.attrs.alt || "", L.attrs.width && (a.style.width = `${L.attrs.width}px`), i(L.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", W), N.removeEventListener("click", P), document.removeEventListener("click", T), f.remove();
        }
      };
    };
  }
}), hk = /\[\[([^\[\]]+)\]\]$/, gk = Ec.create({
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
      Nn(
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
      new $e({
        find: hk,
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
}), yt = {
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
}, yk = ["info", "note", "prompt", "resources", "todo"];
function vk(e) {
  return e.length < 3 ? !1 : !!(yt.header.test(e) || yt.bold.test(e) || yt.list.test(e) || yt.taskList.test(e) || yt.codeBlock.test(e) || yt.callout.test(e) || yt.highlight.test(e) || yt.link.test(e) || yt.table.test(e));
}
function bk(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function wk(e, t) {
  const { alt: n, align: r, width: o } = bk(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function ao(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function rc(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${ao(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(wk(i[1], i[2])) : o.push(`<p>${ao(s.trim())}</p>`);
  }
  return o.join("");
}
function rd(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function od(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += u; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${ao(f.text)}</p>` : i += `<li><p>${ao(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
          const p = t(a + 1, e[a + 1].depth);
          i += p.html, a = p.nextIdx;
        } else
          a++;
        i += "</li>";
      } else
        a++;
    }
    return i += d, { html: i, nextIdx: a };
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
    s.length !== 0 && (o.push(od(s)), s = []);
  };
  for (const a of r) {
    const c = rd(a);
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
function xk(e) {
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
    for (let u = 0; u < c.length; u++) {
      const d = c[u].trim();
      u === 0 && d === "" && a.trim().startsWith("|") || u === c.length - 1 && d === "" && a.trim().endsWith("|") || l.push(d);
    }
    if (l.length !== 0) {
      i += "<tr>";
      for (let u = 0; u < r.length; u++) {
        const d = l[u] || "";
        i += "<td>" + oc(d) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function kk(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const h = xk(d);
        if (h) {
          const g = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(h), g;
        }
      }
    }
    return d;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (d, f, p) => {
    let h = p.trim();
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), h = h.replace(/__([^_]+)__/g, "<strong>$1</strong>"), h = h.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), h = h.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
    const g = "info";
    h.startsWith("<") || (h = `<p>${h}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${h}</div>`), y;
  }), yk.forEach((d) => {
    const f = new RegExp(`\`\`\`${d}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (p, h) => {
      let g = h.trim();
      g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>"), g.startsWith("<") || (g = `<p>${g}</p>`);
      const y = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${d}" class="callout callout-${d}">${g}</div>`), y;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (d, f, p) => {
    const h = f || "plaintext", g = p.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${h}">${g}</code></pre>`), y;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), i = [];
  let a = [];
  const c = () => {
    a.length !== 0 && (i.push(od(a)), a = []);
  };
  for (const d of s) {
    const f = rd(d);
    if (f) {
      if (a.length > 0) {
        const h = a[0].type, g = Math.min(...a.map((y) => y.depth));
        f.depth === g && f.type !== h && c();
      }
      a.push(f);
      continue;
    }
    c();
    let p = d;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (h, g, y) => {
      const v = g.length;
      return `<h${v}>${y}</h${v}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), i.push(p);
  }
  c(), t = i.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, f, p) => {
    const h = f.split("|").map((x) => x.trim());
    let g = "", y = "left", v = null;
    h.length === 1 ? g = h[0] : h.length === 2 ? (g = h[0], /^\d+$/.test(h[1]) ? v = h[1] : ["left", "center", "right"].includes(h[1]) ? y = h[1] : g = f) : h.length === 3 ? (g = h[0], ["left", "center", "right"].includes(h[1]) && (y = h[1]), /^\d+$/.test(h[2]) && (v = h[2])) : g = f;
    const b = v ? ` width="${v}" style="width: ${v}px"` : "";
    return `<img src="${p.trim()}" alt="${g}" data-align="${y}"${b}>`;
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
const Ck = et.create({
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
        key: new Ie("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !vk(i))
              return !1;
            n.preventDefault();
            const a = kk(i);
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
}), sc = new Ie("collapsibleHeading");
function Mk(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function io(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, Mk(i, a, l));
    }
  }), n;
}
let xn = null;
function fs(e, t, n) {
  const r = [], o = io(e, n.levels), s = [];
  e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const d = o.get(u) ?? "";
      s.push({
        pos: u,
        level: l.attrs.level,
        id: d,
        isCollapsed: t.collapsedHeadings.has(d),
        nodeSize: l.nodeSize
      });
    }
  });
  const i = [];
  for (let l = 0; l < s.length; l++) {
    const u = s[l];
    if (u.isCollapsed) {
      const d = u.pos + u.nodeSize;
      let f = e.content.size;
      for (let p = l + 1; p < s.length; p++)
        if (s[p].level <= u.level) {
          f = s[p].pos;
          break;
        }
      d < f && i.push({ start: d, end: f });
    }
  }
  const a = [];
  for (const l of i)
    if (a.length === 0)
      a.push(l);
    else {
      const u = a[a.length - 1];
      l.start <= u.end ? u.end = Math.max(u.end, l.end) : a.push(l);
    }
  function c(l) {
    for (const u of a)
      if (l >= u.start && l < u.end) return !0;
    return !1;
  }
  return e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const d = o.get(u) ?? "", f = t.collapsedHeadings.has(d), p = c(u);
      r.push(
        Ge.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const h = Ge.widget(u + l.nodeSize - 1, () => {
        const g = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (g) {
          g.classList.contains("collapsed") !== f && (g.classList.remove("collapsed", "expanded"), g.classList.add(f ? "collapsed" : "expanded"), g.title = f ? "Click to expand" : "Click to collapse");
          const x = g.parentElement;
          if (x) return x;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", d), v.setAttribute("data-heading-level", String(l.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = f ? "Click to expand" : "Click to collapse", v.addEventListener("click", (b) => {
          b.preventDefault(), b.stopPropagation();
          const x = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(x ? "expanded" : "collapsed"), v.title = x ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), xn && xn.dispatch(xn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), y.appendChild(v), y;
      }, { side: 1, key: `chevron-${d}` });
      r.push(h);
    } else l.isBlock && c(u) && r.push(
      Ge.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), He.create(e, r);
}
function Sk(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = io(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
const Ek = et.create({
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
        const i = io(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return io(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Pe({
        key: sc,
        view(n) {
          return xn = n, {
            update(r) {
              xn = r;
            },
            destroy() {
              xn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: fs(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const i = n.getMeta("collapsibleHeading");
            return i || n.docChanged ? (n.docChanged && !i && Sk(o.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: fs(s.doc, e, t),
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
            return r?.decorations ? r.decorations : fs(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Tk = /\[([^\]]+)\]\(([^)]+)\)$/, Dk = /^(https?:\/\/|www\.)[^\s]+$/i, Nk = et.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new $e({
        find: Tk,
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
        key: new Ie("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!Dk.test(s)) return !1;
            const { state: i } = t, { selection: a } = i, { from: c, to: l, empty: u } = a;
            let d = s;
            if (!d.startsWith("http://") && !d.startsWith("https://") && (d.startsWith("www."), d = "https://" + d), !u && i.doc.textBetween(c, l))
              return e.chain().focus().extendMarkRange("link").setLink({ href: d }).run(), !0;
            const f = i.schema.marks.link.create({ href: d }), p = i.tr;
            return p.insertText(d, c, l), p.addMark(c, c + d.length, f), t.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), Ak = ["info", "note", "prompt", "resources", "todo"], Rk = et.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Pe({
        key: new Ie("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const u of Ak)
              if (l === `\`\`\`${u}`) {
                n.preventDefault();
                const d = r.tr, f = a + c.indexOf("```");
                d.delete(f, i.pos);
                const p = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                if (p && h) {
                  const g = h.create(), y = p.create({ type: u }, Zf.from(g));
                  d.insert(f, y);
                  const v = d.doc.resolve(f + 2);
                  d.setSelection(at.near(v)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Yr = new Ie("searchHighlight"), Lk = et.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Yr, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Yr, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Pe({
        key: Yr,
        state: {
          init() {
            return He.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(Yr), u = t.docChanged;
            if (!s)
              return He.empty;
            if (!u && !l)
              return n.map(t.mapping, o.doc);
            const d = [];
            let f = 0;
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
                    const v = g + y.index, b = g + y.index + y[0].length, x = f === c;
                    d.push(
                      Ge.inline(v, b, {
                        class: x ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return He.empty;
            }
            return He.create(o.doc, d);
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
}), Ik = new Ie("tabIndent");
function Pk(e) {
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
const Ok = et.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Pe({
        key: Ik,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = Pk(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Ja(s)(n, r)) {
                const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && Ja(l)(n, r);
              }
            } else if (!ei(s)(n, r)) {
              const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && ei(l)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), _k = new Ie("expandSelection");
function ms(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const $k = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), Hk = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), Wk = "tableRow", zk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function Bk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Fk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (zk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Uk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === Wk) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Yk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (Hk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function jk(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    $k.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function Vk(e) {
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
function Kk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Gk(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function qk(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(Bk(e, o, s)), Gk(e, t) && (i(Fk(e, o, s)), i(Uk(e, o, s))), i(jk(e, o, s)), i(Yk(e, o, s));
  const a = Vk(e);
  if (a.length > 0) {
    const c = Kk(a, o, s);
    for (const l of c)
      i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const Xk = et.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof Sf || o === 0 && s === n.content.size)
          return !0;
        const a = qk(n, o, s);
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
        key: _k,
        props: {
          handleClick() {
            return ms(e), !1;
          },
          handleTextInput() {
            return ms(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && ms(e), !1;
          }
        }
      })
    ];
  }
}), Zk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Qk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Jk = new Ie("hexColorDecoration");
function sd(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Zk.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, u = l + a[0].length;
      if (u >= t && l <= n) {
        const d = a[0], f = Qk(d);
        r.push(
          Ge.inline(l, u, {
            class: "hex-color-swatch",
            style: `background-color: ${d}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function e1(e) {
  const t = sd(e, 0, e.content.size);
  return He.create(e, t);
}
const t1 = Ec.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Pe({
        key: Jk,
        state: {
          init(e, { doc: t }) {
            return e1(t);
          },
          apply(e, t) {
            if (!e.docChanged)
              return t;
            let n = t.map(e.mapping, e.doc);
            const r = [];
            if (e.mapping.maps.forEach((s, i) => {
              s.forEach((a, c, l, u) => {
                const d = Math.max(0, l - 10), f = Math.min(e.doc.content.size, u + 10);
                r.push({ from: d, to: f });
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
              const i = sd(e.doc, s.from, s.to);
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
}), Ne = new Ie("selectAllOccurrences");
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
function Rt(e, t) {
  const n = Ne.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function n1(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Se(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const r1 = et.create({
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
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Ne, { activate: !0 })), !0);
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
            const d = o.doc.resolve(s), f = d.parent;
            if (f.isTextblock) {
              const p = f.textContent, h = d.parentOffset;
              let g = h, y = h;
              for (; g > 0 && /\w/.test(p[g - 1]); ) g--;
              for (; y < p.length && /\w/.test(p[y]); ) y++;
              g < y && (a = p.slice(g, y));
            }
          }
          if (!a) return !1;
          const c = ac(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = n1(c, s), u = c[l];
          return r.isActive = !0, r.ranges = [u], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = c, r.nextMatchIndex = (l + 1) % c.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Ne, { activate: !0 })), setTimeout(() => {
            try {
              const d = e.view.domAtPos(u.from);
              d.node && d.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0;
        }
        if (r.isIncremental && r.allMatches.length > 0) {
          const o = r.nextMatchIndex, s = r.allMatches[o];
          return r.ranges.some(
            (a) => a.from === s.from && a.to === s.to
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Ne, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Se(this.storage), t && t(e.setMeta(Ne, { deactivate: !0 })), !0),
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
              const c = Rt(a, this.storage);
              this.storage.ranges = c, c.length === 0 && Se(this.storage);
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
        return Se(this.storage), !0;
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
              const s = Rt(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Se(this.storage);
            }
          } catch {
          }
        }, 10) : Se(this.storage), !0;
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
        key: Ne,
        state: {
          init() {
            return He.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Ne);
            if (s?.deactivate || !e.isActive)
              return He.empty;
            if (s?.activate || s?.refresh) {
              const i = [];
              for (const a of e.ranges) {
                i.push(
                  Ge.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const c = document.createElement("span");
                c.className = "select-all-multi-cursor", c.setAttribute("aria-hidden", "true"), i.push(
                  Ge.widget(a.to, c, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return He.create(o.doc, i);
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
              Se(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Ne, { deactivate: !0 }));
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
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), Qf(t.state, t.dispatch), setTimeout(() => {
                  const s = Rt(t);
                  e.ranges = s, s.length === 0 && Se(e);
                }, 10), !0;
              }
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, Jf(t.state, t.dispatch), setTimeout(() => {
                  const s = Rt(t);
                  e.ranges = s, s.length === 0 && Se(e);
                }, 10), !0;
              }
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Rt(t);
                if (r.length === 0) {
                  Se(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Ne, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Rt(t);
                  e.ranges = a, a.length === 0 && Se(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Se(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Ne, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), Se(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Ne, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Se(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !1;
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
            const s = Rt(t);
            if (s.length === 0) {
              Se(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Ne, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = Rt(t);
              e.ranges = c, c.length === 0 && Se(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function o1() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function s1(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function a1(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function i1(e, t) {
  return t.includes(e.type);
}
function c1(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function l1(e, t, n) {
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
      const u = l.getContext("2d");
      if (!u) {
        o(new Error("Failed to get canvas context"));
        return;
      }
      u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high", u.drawImage(s, 0, 0, a, c);
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", p = d ? void 0 : n, h = l.toDataURL(f, p), g = a1(h, e.name);
      r({ dataUrl: h, file: g, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function u1(e, t, n) {
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
async function ic(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!i1(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = o1();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const d = await l1(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = d.dataUrl, i = d.file, s = Math.min(d.width, 600);
    } else {
      o = await s1(e), i = e;
      const d = await c1(o);
      s = Math.min(d.width, 600);
    }
    t.chain().focus().setImage({
      src: o,
      alt: e.name,
      width: s
    }).run();
    const { state: c } = t.view, l = c.selection.from - 1, u = c.doc.nodeAt(l);
    if (u && u.type.name === "resizableImage") {
      const d = t.view.nodeDOM(l);
      if (d) {
        const f = d instanceof HTMLElement ? d : d.dom;
        f && f.classList.add("image-uploading");
      }
    }
    try {
      const d = await n.onImageUpload(i, {
        fileName: e.name,
        mimeType: i.type,
        fileSize: i.size,
        uploadId: r
      });
      let f = !1;
      return t.view.state.doc.descendants((p, h) => {
        if (f) return !1;
        if (p.type.name === "resizableImage" && p.attrs.src === o && p.attrs.alt === e.name) {
          try {
            const { state: g, dispatch: y } = t.view, v = g.doc.nodeAt(h);
            if (v) {
              const b = g.tr.setNodeMarkup(h, void 0, {
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
      }), t.view.state.doc.descendants((p, h) => {
        if (p.type.name === "resizableImage" && p.attrs.src === d) {
          const g = t.view.nodeDOM(h);
          if (g) {
            const y = g instanceof HTMLElement ? g : g.dom;
            y && y.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (d) {
      return console.warn("Image upload failed, removing placeholder:", d), u1(t, o, e.name), n.onUploadError?.(`Upload failed: ${d instanceof Error ? d.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function cc(e) {
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
const d1 = et.create({
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
        key: new Ie("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = cc(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              ic(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = cc(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const c = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (c) {
              const l = n.state.tr.setSelection(
                at.near(n.state.doc.resolve(c.pos))
              );
              n.dispatch(l);
            }
            return a.forEach((l) => {
              ic(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function f1({
  placeholder: e,
  isMobile: t,
  maxImageSize: n,
  headingLevels: r,
  collapsibleHeadingLevels: o,
  disabledFeatures: s,
  progressiveSelectAll: i,
  enableCollapsibleHeadings: a,
  enableTagAutoDetect: c,
  enableHexColorHighlight: l,
  isLightweight: u,
  setImageEditState: d,
  callbackRefs: f
}) {
  return Gt(() => {
    const p = [
      Tf.configure({
        heading: {
          levels: r
        },
        codeBlock: !1,
        // We use CodeBlockWithFeatures instead
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
      nk,
      rk,
      ak,
      Df.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      Nf.configure({
        types: ["heading", "paragraph"]
      }),
      Af.configure({
        multicolor: !0
      }),
      Rf.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      Ff,
      Uf,
      Yf,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [jf],
      Nk,
      Lk,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [r1],
      Ok,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      em.extend({
        addInputRules() {
          const h = this.type;
          return [
            new $e({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: g, range: y }) => {
                const { tr: v } = g, b = y.from, x = y.to;
                v.delete(b, x);
                const S = v.doc.resolve(b), w = h.create(), k = S.before(S.depth), D = S.after(S.depth);
                v.replaceWith(k, D, w);
                const C = k + w.nodeSize;
                if (C < v.doc.content.size) {
                  const E = v.doc.resolve(C);
                  E.nodeAfter && E.nodeAfter.isTextblock ? v.setSelection(at.create(v.doc, C + 1)) : E.nodeAfter && v.setSelection(at.near(v.doc.resolve(C)));
                } else {
                  const T = g.schema.nodes.paragraph.create();
                  v.insert(C, T), v.setSelection(at.create(v.doc, C + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || p.push(
      Lf.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      If,
      Kx,
      Gx,
      ...u ? [] : [tk]
    ), s.taskLists || p.push(
      ok.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      sk.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !t && !u && p.push(
      ck.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || p.push(dk), s.callouts || p.push(mk, Rk), a && !s.collapsibleHeadings && !u && p.push(
      Ek.configure({
        levels: o
      })
    ), s.images || p.push(
      pk.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (h) => {
          d({
            isOpen: !0,
            src: h.src,
            alt: h.alt,
            pos: h.pos,
            position: { x: h.rect.left + h.rect.width / 2, y: h.rect.bottom }
          });
        },
        resolveImageSrc: f.resolveImageSrc.current ? ((...h) => f.resolveImageSrc.current(...h)) : void 0
      }),
      d1.configure({
        maxFileSize: n,
        onUploadStart: f.onImageUploadStart.current ? ((...h) => f.onImageUploadStart.current(...h)) : void 0,
        onUploadComplete: f.onImageUploadComplete.current ? ((...h) => f.onImageUploadComplete.current(...h)) : void 0,
        onUploadError: f.onImageUploadError.current ? ((...h) => f.onImageUploadError.current(...h)) : void 0,
        onImageUpload: f.onImageUpload.current ? ((h, g) => f.onImageUpload.current(h, g)) : void 0
      })
    ), s.datePills || p.push(
      ry.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || p.push(
      ay.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: c
      })
    ), s.wikiLinks || p.push(
      gk.configure({
        onWikiLinkClick: (h) => {
          console.log("WikiLink clicked:", h), f.onWikiLinkClick.current?.(h);
        },
        validateLink: (h) => f.validateWikiLink.current ? f.validateWikiLink.current(h) : !0
      })
    ), i && p.push(Xk), l && !u && p.push(t1), s.markdownPaste || p.push(
      Ck.configure({
        enableMarkdownPaste: !0
      })
    ), p;
  }, [e, t, n, r, o, s, i, a, c, l, u]);
}
const m1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, iC = $d(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  placeholder: s = 'Start writing... Use "/" for commands',
  editable: i = !0,
  autofocus: a = !1,
  className: c = "",
  showToolbar: l = !0,
  showWordCount: u = !0,
  theme: d,
  autoSave: f = !0,
  autoSaveKey: p = "paragon-editor-content",
  autoSaveDelay: h = 1e3,
  showRecoveryBanner: g = !0,
  showFloatingToolbar: y = !0,
  maxImageSize: v = 5 * 1024 * 1024,
  onImageUploadStart: b,
  onImageUploadComplete: x,
  onImageUploadError: S,
  onImageUpload: w,
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
  onSave: _,
  onRecover: W,
  onWikiLinkClick: V,
  validateWikiLink: I,
  onWikiLinkSearch: L,
  onLinkClick: z,
  findReplaceOpen: K,
  onFindReplaceChange: j,
  renderToolbar: G,
  renderFooter: J,
  disabledFeatures: $ = {},
  minHeight: H = "200px",
  maxHeight: F,
  spellCheck: Z = !0,
  headingLevels: ue = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: fe = [1, 2, 3],
  // TOC props
  showTableOfContents: we = !1,
  tocVisible: De = !0,
  onTocVisibilityChange: je,
  tocTitle: Et = "",
  tocMinLevel: _n = 1,
  tocMaxLevel: $n = 4,
  tocShowLevelIndicators: gr = !1,
  tocHighlightActive: yr = !0,
  tocTreeView: vr = !1,
  tocWidth: br = "240px",
  tocPosition: Jt = "right",
  tocScrollOffset: Hn = 20,
  onTocItemClick: en,
  renderTocItem: tn,
  tocShowToggleButton: wr = !0,
  // Raw markdown editor
  autoClosePairs: No = !0,
  // Performance profiler
  showPerformanceProfiler: Ao = !1,
  onPerformanceProfilerClose: Ro,
  // Auto reorder checklist
  autoReorderChecklist: Lo = !1,
  // Expand selection
  progressiveSelectAll: Io = !1,
  // Auto-detection toggles
  enableTagAutoDetect: xr = !1,
  enableHexColorHighlight: Po = !1,
  enableCollapsibleHeadings: Oo = !1,
  // Performance mode
  performanceMode: Wn = "auto",
  // Error boundary
  onEditorError: _o,
  // AI writing assistant
  aiActions: tt,
  onAIAction: nn,
  onAISetupRequired: ae
}, ge) {
  const [oe] = U(() => m1()), [me, Oe] = U(C), [de, zn] = U(""), We = Y(C), dt = Y(""), ft = Y(null), [Bn, Na] = U(0), kr = !!(tt && tt.length > 0 && nn), { state: ze, executeAction: Cr, abort: cd, reset: Tt } = Nx(nn), [$o, Ho] = U(null), [ld, ud] = U({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), dd = Y(nn);
  dd.current = nn;
  const Aa = Y(ae);
  Aa.current = ae;
  const [fd, md] = U([]), [pd, hd] = U(0), gd = B((Q, se) => {
    md(Q), hd(se);
  }, []), Ra = Y(b), La = Y(x), Ia = Y(S), Pa = Y(w), Oa = Y(k), _a = Y(V), $a = Y(I), Wo = Y(L);
  Ra.current = b, La.current = x, Ia.current = S, Pa.current = w, Oa.current = k, _a.current = V, $a.current = I, Wo.current = L;
  const Ha = 2e3, [zo, yd] = U(() => Wn === "lightweight" ? !0 : Wn === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Ha : !1), Bo = Y(0), Wa = Y(zo);
  Wa.current = zo;
  const [rn, Mr] = U(null), vd = f1({
    placeholder: s,
    isMobile: oe,
    maxImageSize: v,
    headingLevels: ue,
    collapsibleHeadingLevels: fe,
    disabledFeatures: $,
    progressiveSelectAll: Io,
    enableCollapsibleHeadings: Oo,
    enableTagAutoDetect: xr,
    enableHexColorHighlight: Po,
    isLightweight: zo,
    setImageEditState: Mr,
    callbackRefs: {
      onImageUploadStart: Ra,
      onImageUploadComplete: La,
      onImageUploadError: Ia,
      onImageUpload: Pa,
      resolveImageSrc: Oa,
      onWikiLinkClick: _a,
      validateWikiLink: $a
    }
  }), mt = Y(null), Ht = Y(n), Wt = Y(r), Fo = Y(o), Fn = Y(null);
  Ht.current = n, Wt.current = r, Fo.current = o;
  const re = Ld({
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
    onCreate: ({ editor: Q }) => {
      window.__tiptapEditor = Q, T?.(Q);
    },
    onDestroy: () => {
      O?.();
    },
    extensions: vd,
    content: t,
    editable: i,
    autofocus: a,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: Z ? "true" : "false"
      },
      handleClick: (Q, se, ye) => {
        if (z) {
          const Ve = ye.target.closest("a");
          if (Ve) {
            const pt = Ve.getAttribute("href");
            if (pt && z(pt, ye) === !1)
              return ye.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: Q }) => {
      if (Wn === "auto" && (Bo.current++, Bo.current >= 50)) {
        Bo.current = 0;
        const ye = Q.state.doc.content.childCount > Ha;
        ye !== Wa.current && yd(ye);
      }
      mt.current && clearTimeout(mt.current), mt.current = setTimeout(() => {
        if (Q.isDestroyed) return;
        const se = Q.getHTML();
        (Ht.current || Wt.current) && (Ht.current?.(se), Wt.current?.(se));
      }, 150);
    },
    onFocus: () => {
      N?.();
    },
    onBlur: () => {
      if (mt.current && (clearTimeout(mt.current), mt.current = null, re && !re.isDestroyed)) {
        const Q = re.getHTML();
        if ((Ht.current || Wt.current) && (Ht.current?.(Q), Wt.current?.(Q)), We.current === "wysiwyg" && Fn.current) {
          const se = Fn.current.turndown(Q);
          dt.current = se, Fo.current?.(se);
        }
      }
      A?.();
    },
    onSelectionUpdate: ({ editor: Q }) => {
      if (P) {
        const { from: se, to: ye, empty: Te } = Q.state.selection;
        P({ from: se, to: ye, empty: Te });
      }
    }
  });
  q(() => () => {
    if (mt.current && (clearTimeout(mt.current), mt.current = null, re && !re.isDestroyed)) {
      const Q = re.getHTML();
      if ((Ht.current || Wt.current) && (Ht.current?.(Q), Wt.current?.(Q)), We.current === "wysiwyg" && Fn.current) {
        const se = Fn.current.turndown(Q);
        dt.current = se, Fo.current?.(se);
      }
    }
  }, []);
  const [za, Sr] = U(!1), [bd, wd] = U(!1), xd = K !== void 0 ? K : bd, on = B((Q) => {
    wd(Q), j?.(Q);
  }, [j]), [kd, Uo] = U(0), [Cd, Md] = U(""), zt = ox(re, {
    storageKey: p,
    debounceMs: h,
    enabled: f,
    onSave: (Q) => {
      _?.(Q);
    },
    onRecover: (Q) => {
      W?.(Q);
    }
  }), Bt = Wx();
  Fn.current = Bt;
  const Ba = Y(!1);
  q(() => {
    if (!Ba.current && C === "markdown" && re && !re.isDestroyed && Bt) {
      const Q = re.getHTML(), se = Bt.turndown(Q);
      zn(se), dt.current = se, Ba.current = !0;
    }
  }, [re, Bt, C]);
  const Dt = B(async (Q) => {
    if (re) {
      if (Q === "markdown" && We.current === "wysiwyg") {
        const se = re.getHTML(), ye = Bt.turndown(se);
        zn(ye), dt.current = ye;
      } else if (Q === "wysiwyg" && We.current === "markdown") {
        const { marked: se } = await import("./marked.esm-Tjr8Gfse.js"), ye = (pt) => se.parse(pt, { async: !1, breaks: !0 }), Te = {
          enableTagAutoDetect: xr,
          disableTagPills: !!$.tagPills,
          isValidTag: mn,
          normalizeTag: Qn,
          parseDateFromMarkdown: Yt,
          getDateVariant: ia
        }, Ve = wx(dt.current, ye, Te);
        queueMicrotask(() => {
          re.isDestroyed || re.commands.setContent(Ve);
        });
      }
      Oe(Q), We.current = Q, E?.(Q);
    }
  }, [re, Bt, E]), Fa = B((Q) => {
    zn(Q), dt.current = Q, o?.(Q);
  }, [o]), Er = ax(re, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: u
  });
  ix(ge, {
    editor: re,
    turndownService: Bt,
    editorModeRef: We,
    handleModeSwitch: Dt,
    wordCount: Er,
    autoSaveState: zt,
    setIsFindReplaceOpen: on,
    setFindReplaceFocusTrigger: Uo
  }), q(() => {
    const Q = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => We.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (se) => {
        if (se !== "wysiwyg" && se !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        Dt(se);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const se = We.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return Dt(se), se;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        Dt("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        Dt("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => We.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => We.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => We.current === "markdown" ? dt.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (se) => {
        const ye = (Te) => {
          se(Te.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", ye), () => window.removeEventListener("paragon-editor-mode-change", ye);
      }
    };
    return window.__paragonEditorModeAPI = Q, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [Dt]), q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: me } }));
  }, [me]);
  const Sd = Gt(() => ({
    openLinkPopover: () => Sr(!0),
    openFindReplace: (Q) => {
      Q && Md(Q), on(!0), Uo((se) => se + 1);
    },
    openFindReplaceWithReplace: () => {
      on(!0);
    }
  }), [on]);
  zx(re, oe, Sd);
  const Ua = B((Q, se) => {
    if (!kr) {
      Aa.current?.();
      return;
    }
    if (!re) return;
    let ye = { top: 0, left: 0 };
    if (se) {
      const Te = se.getBoundingClientRect();
      ye = { top: Te.bottom + 4, left: Te.left };
    } else {
      const { from: Te, to: Ve } = re.state.selection, pt = re.view.coordsAtPos(Te), Un = re.view.coordsAtPos(Ve);
      ye = { top: Un.bottom + 8, left: (pt.left + Un.left) / 2 };
    }
    Ho({ scope: Q, position: ye });
  }, [kr, re]), Ed = B((Q, se) => {
    if (!re || !tt) return;
    const ye = tt.find((Rd) => Rd.id === Q);
    if (!ye) return;
    const { from: Te, to: Ve } = re.state.selection, pt = Te !== Ve ? re.state.doc.textBetween(Te, Ve, `
`) : "", Un = ye.scope === "document" || !pt ? re.getText() : pt, Va = re.view.coordsAtPos(Te), Ka = re.view.coordsAtPos(Ve);
    ud({
      selectionTop: Va.top,
      selectionBottom: Ka.bottom,
      selectionCenterX: (Va.left + Ka.right) / 2
    }), Ho(null), Cr(Q, ye.label, Un, { from: Te, to: Ve }, se);
  }, [re, tt, Cr]), Td = B(() => {
    if (!re || ze.status !== "complete") return;
    const { selectionRange: Q, result: se } = ze;
    re.chain().focus().setTextSelection(Q).deleteSelection().insertContent(se).run(), Tt();
  }, [re, ze, Tt]), Dd = B(() => {
    if (!re || ze.status !== "complete") return;
    const { selectionRange: Q, result: se } = ze;
    re.chain().focus().setTextSelection(Q.to).insertContent(`
` + se).run(), Tt();
  }, [re, ze, Tt]), Nd = B(() => {
    if (!(ze.status !== "complete" && ze.status !== "error"))
      if (ze.status === "complete") {
        const { action: Q, actionLabel: se, inputText: ye, selectionRange: Te } = ze;
        Tt(), Cr(Q, se, ye, Te);
      } else
        Tt();
  }, [ze, Tt, Cr]);
  if (!re)
    return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${c}`, "data-theme": d, children: /* @__PURE__ */ R("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "83%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "66%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "100%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } }),
      /* @__PURE__ */ m("div", { style: { height: "1rem", width: "75%", borderRadius: "0.25rem", background: "var(--color-muted, #e5e7eb)", opacity: 0.5, animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } })
    ] }) });
  const Ya = /* @__PURE__ */ m(
    Q0,
    {
      editor: re,
      onOpenLinkPopover: () => Sr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        on(!0), Uo((Q) => Q + 1);
      },
      disabledFeatures: $,
      autoReorderChecklist: Lo,
      aiEnabled: kr || !!ae,
      onAISparklesClick: (Q) => Ua("document", Q)
    }
  ), ja = /* @__PURE__ */ R("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ m(
      cx,
      {
        status: zt.status,
        lastSaved: zt.lastSaved
      }
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ R("span", { children: [
      Er.words,
      " words"
    ] }) })
  ] }), Ad = {
    minHeight: H,
    ...F && { maxHeight: F, overflowY: "auto" }
  };
  return /* @__PURE__ */ R("div", { className: `markdown-editor-container ${c}`, "data-theme": d, children: [
    f && g && zt.hasRecoverableContent && /* @__PURE__ */ m(
      lx,
      {
        onRecover: () => {
          zt.recover();
        },
        onDismiss: zt.dismissRecovery
      }
    ),
    l && /* @__PURE__ */ R("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      G ? G(re, Ya) : Ya,
      D && /* @__PURE__ */ R("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => Dt("wysiwyg"),
            className: `editor-mode-toggle-btn ${me === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ m(Mf, {})
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => Dt("markdown"),
            className: `editor-mode-toggle-btn ${me === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ m(Zs, {})
          }
        )
      ] })
    ] }),
    !oe && /* @__PURE__ */ m(
      J0,
      {
        editor: re,
        isOpen: xd,
        onClose: () => on(!1),
        focusTrigger: kd,
        initialSearchQuery: Cd,
        editorMode: me,
        rawMarkdown: de,
        onRawMarkdownChange: Fa,
        onMatchesChange: gd
      }
    ),
    /* @__PURE__ */ m(nx, { editor: re }),
    /* @__PURE__ */ R("div", { className: `editor-main-area ${we ? "editor-with-toc" : ""}`, children: [
      we && Jt === "left" && /* @__PURE__ */ m(
        Ji,
        {
          editor: re,
          visible: De,
          onVisibilityChange: je,
          title: Et,
          minLevel: _n,
          maxLevel: $n,
          showLevelIndicators: gr,
          highlightActive: yr,
          treeView: vr,
          width: br,
          position: Jt,
          scrollOffset: Hn,
          onItemClick: en,
          renderItem: tn,
          showToggleButton: wr,
          scrollContainerRef: ft
        }
      ),
      /* @__PURE__ */ R(
        Ex,
        {
          resetKey: `${t}-${Bn}`,
          onRetry: () => Na((Q) => Q + 1),
          onClearContent: () => {
            re && re.commands.clearContent(), n?.(""), r?.(""), o?.(""), Na((Q) => Q + 1);
          },
          onError: _o,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: ft, style: Ad, children: me === "wysiwyg" ? /* @__PURE__ */ R(Ee, { children: [
              /* @__PURE__ */ m(Id, { editor: re, className: "editor-content" }),
              !$.images && !$.dragAndDrop && /* @__PURE__ */ m(xx, { containerRef: ft, enabled: i }),
              !oe && y && /* @__PURE__ */ m(om, { editor: re, suppressWhenLinkPopoverOpen: za, aiEnabled: kr || !!ae, onAISparklesClick: (Q) => Ua("selection", Q) }),
              $o && tt && /* @__PURE__ */ m(
                Rx,
                {
                  actions: tt,
                  scope: $o.scope,
                  position: $o.position,
                  onAction: Ed,
                  onClose: () => Ho(null)
                }
              ),
              ze.status !== "idle" && /* @__PURE__ */ m(
                Lx,
                {
                  state: ze,
                  position: ld,
                  onReplace: Td,
                  onInsert: Dd,
                  onRetry: Nd,
                  onDiscard: () => {
                    cd(), Tt();
                  }
                }
              ),
              !$.slashCommands && /* @__PURE__ */ m(fy, { editor: re, disabledFeatures: $ }),
              !$.wikiLinks && Wo.current && /* @__PURE__ */ m(
                yy,
                {
                  editor: re,
                  onSearch: Wo.current
                }
              ),
              /* @__PURE__ */ m(
                tm,
                {
                  editor: re,
                  isOpen: za,
                  onClose: () => Sr(!1)
                }
              ),
              !oe && /* @__PURE__ */ m(
                nm,
                {
                  editor: re,
                  onEditLink: () => Sr(!0)
                }
              ),
              !$.images && rn?.isOpen && /* @__PURE__ */ m(
                kx,
                {
                  src: rn.src,
                  alt: rn.alt,
                  position: rn.position,
                  onSave: (Q, se) => {
                    re.chain().focus().setNodeSelection(rn.pos).updateAttributes("resizableImage", {
                      src: Q,
                      alt: se
                    }).run(), Mr(null);
                  },
                  onDelete: () => {
                    re.chain().focus().setNodeSelection(rn.pos).deleteSelection().run(), Mr(null);
                  },
                  onClose: () => Mr(null)
                }
              )
            ] }) : /* @__PURE__ */ m(
              Cx,
              {
                content: de,
                onChange: Fa,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: fd,
                currentMatchIndex: pd,
                autoClosePairs: No
              }
            ) }),
            /* @__PURE__ */ m(Tx, { scrollContainerRef: ft })
          ]
        }
      ),
      we && Jt === "right" && /* @__PURE__ */ m(
        Ji,
        {
          editor: re,
          visible: De,
          onVisibilityChange: je,
          title: Et,
          minLevel: _n,
          maxLevel: $n,
          showLevelIndicators: gr,
          highlightActive: yr,
          treeView: vr,
          width: br,
          position: Jt,
          scrollOffset: Hn,
          onItemClick: en,
          renderItem: tn,
          showToggleButton: wr,
          scrollContainerRef: ft
        }
      )
    ] }),
    u && (J ? J(
      { words: Er.words, characters: Er.characters },
      zt.status,
      ja
    ) : ja),
    /* @__PURE__ */ m(Sx, { visible: Ao, onClose: Ro, editor: re })
  ] });
}), cC = mo.create({
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
      Nn(this.options.HTMLAttributes, t, {
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
}), ad = {
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
}, p1 = {
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
}, h1 = {
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
}, g1 = {
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
}, Xn = {
  dark: ad,
  light: p1,
  sepia: h1,
  nord: g1
};
function y1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function lC(e, t, n, r) {
  const o = Xn[e] || ad;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const id = dc(null);
function uC({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = U(t), s = Xn[r] || Xn.dark, i = B((c) => {
    Xn[c] && o(c);
  }, []);
  q(() => {
    n?.current && y1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(Xn)
  };
  return /* @__PURE__ */ m(id.Provider, { value: a, children: e });
}
function dC() {
  const e = fc(id);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const lc = [
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
function fC({ node: e, updateAttributes: t }) {
  const [n, r] = U(!1), o = e.attrs.language || "plaintext";
  lc.find((i) => i.value === o)?.label;
  const s = B(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ R(kn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: lc.map(({ value: i, label: a }) => /* @__PURE__ */ m("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ m(Pt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(Tn, { size: 14 }) : /* @__PURE__ */ m(Dn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m($s, {}) }) })
  ] });
}
export {
  cx as AutoSaveIndicator,
  cC as Callout,
  Rk as CalloutInputRule,
  fC as CodeBlockComponent,
  Ek as CollapsibleHeading,
  ck as CollapsibleList,
  ry as DatePill,
  uC as EditorThemeProvider,
  Q0 as EditorToolbar,
  J0 as FindReplace,
  om as FloatingToolbar,
  xx as ImageDropZone,
  d1 as ImageUpload,
  iC as MarkdownEditor,
  Nk as MarkdownLinkInputRule,
  Ck as MarkdownPasteSafe,
  nk as MixedBulletList,
  ak as MixedListItem,
  rk as MixedOrderedList,
  sk as MixedTaskItem,
  ok as MixedTaskList,
  lx as RecoveryBanner,
  pk as ResizableImage,
  Lk as SearchHighlight,
  nx as SelectAllActionBar,
  r1 as SelectAllOccurrences,
  fy as SlashCommands,
  Ok as TabIndent,
  Ji as TableOfContents,
  ay as TagPill,
  gk as WikiLinkSafe,
  y1 as applyTheme,
  lC as createCustomTheme,
  ad as darkTheme,
  ia as getDateVariant,
  mn as isValidTag,
  p1 as lightTheme,
  lk as loadLanguageIfNeeded,
  be as lowlight,
  g1 as nordTheme,
  Qn as normalizeTag,
  Yt as parseDateFromMarkdown,
  h1 as sepiaTheme,
  Xn as themes,
  ox as useAutoSave,
  dC as useEditorTheme,
  ax as useWordCount
};
//# sourceMappingURL=paragon.js.map
