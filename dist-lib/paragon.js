import { jsx as m, jsxs as R, Fragment as Ee } from "react/jsx-runtime";
import { useEditorState as dc, NodeViewWrapper as Mn, ReactNodeViewRenderer as co, NodeViewContent as $s, useEditor as Lu, EditorContent as Iu } from "@tiptap/react";
import * as M from "react";
import Q, { useCallback as F, useState as j, useRef as V, useEffect as Z, memo as Dn, createContext as uc, useContext as fc, useLayoutEffect as lo, useMemo as Zt, Component as Pu, useReducer as Ou, forwardRef as _u, useImperativeHandle as $u } from "react";
import * as mc from "react-dom";
import Hu, { createPortal as Wu } from "react-dom";
import { Link2 as Hs, ExternalLink as zu, Pencil as Bu, Check as Nn, Copy as An, Unlink as Fu, ChevronDown as $t, Bold as Ws, Italic as zs, Underline as Bs, Strikethrough as Fs, Code as pc, Highlighter as hc, Link as Us, Quote as Ys, List as js, ListOrdered as Vs, CheckSquare as Ks, FileCode as Uu, Sparkles as uo, ChevronLeftIcon as Yu, ChevronRightIcon as ju, ChevronDownIcon as Vu, Calendar as gc, Hash as Ga, Image as Gs, X as Ct, Type as fo, Heading1 as Ku, Heading2 as Gu, Heading3 as qu, Heading4 as Xu, Heading5 as Zu, Code2 as yc, Table as ps, Minus as vc, Info as Xr, StickyNote as bc, MessageSquareText as wc, BookOpen as qs, ListTodo as Xs, FileText as Zs, Plus as Qs, Undo as Qu, Redo as Ju, IndentIncrease as ef, IndentDecrease as tf, PenLine as nf, Library as rf, Columns as qa, Trash2 as gn, Rows as Xa, ToggleLeft as Za, ArrowUpDown as of, Search as sf, ChevronUp as af, MousePointerClick as cf, CaseSensitive as lf, WholeWord as df, Regex as uf, Replace as hs, ReplaceAll as ff, Cloud as mf, Loader2 as xc, CloudOff as pf, AlertCircle as hf, RotateCcw as Js, ImagePlus as gf, Activity as yf, Maximize2 as kc, Minimize2 as Cc, AlertTriangle as vf, ChevronRight as Mc, CheckCircle2 as bf, MessageSquare as Sc, RefreshCw as wf, SpellCheck as xf, PanelRightClose as kf, PanelRightOpen as Cf, Eye as Mf } from "lucide-react";
import { Node as mo, InputRule as We, mergeAttributes as Rn, Extension as et, Mark as Tc } from "@tiptap/core";
import { PluginKey as Pe, Plugin as Oe, TextSelection as ct, AllSelection as Sf } from "@tiptap/pm/state";
import { createRoot as Tf } from "react-dom/client";
import Ef from "@tiptap/starter-kit";
import Df from "@tiptap/extension-placeholder";
import Nf from "@tiptap/extension-text-align";
import Af from "@tiptap/extension-highlight";
import Rf from "@tiptap/extension-link";
import { Table as Lf } from "@tiptap/extension-table";
import If from "@tiptap/extension-table-row";
import Pf from "@tiptap/extension-table-cell";
import Of from "@tiptap/extension-table-header";
import { DecorationSet as ze, Decoration as Ge } from "@tiptap/pm/view";
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
import Ec from "highlight.js/lib/languages/python";
import na from "highlight.js/lib/languages/xml";
import Gf from "highlight.js/lib/languages/css";
import qf from "highlight.js/lib/languages/json";
import po from "highlight.js/lib/languages/bash";
import Xf from "@tiptap/extension-image";
import { Fragment as Zf } from "@tiptap/pm/model";
import { liftListItem as Ja, sinkListItem as ei } from "@tiptap/pm/schema-list";
import { undo as Qf, redo as Jf } from "@tiptap/pm/history";
import em from "@tiptap/extension-horizontal-rule";
function Et({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: r
}) {
  const o = F(
    (a) => {
      r?.(a), a.stopPropagation();
    },
    [r]
  ), s = F((a) => {
    a.stopPropagation();
  }, []), i = F((a) => {
    a.stopPropagation();
  }, []);
  return Wu(
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
  const [r, o] = j(""), s = V(null), i = V(null), [a, c] = j({ top: 0, left: 0 });
  Z(() => {
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
  }, [t, e]), Z(() => {
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
  const l = F((h) => {
    if (h?.preventDefault(), r.trim()) {
      let g = r.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), d = F((h) => {
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
  return /* @__PURE__ */ m(Et, { children: p });
}
function nm({ editor: e, onEditLink: t }) {
  const [n, r] = j({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = V(null), s = V(null), i = F((x) => {
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
  }, [e]), a = F(() => {
    s.current = setTimeout(() => {
      r((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = F(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  Z(() => {
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
  }, [e, i, a]), Z(() => {
    if (!n.isVisible) return;
    const x = () => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, S = e.view.dom.closest(".editor-content-wrapper");
    return S?.addEventListener("scroll", x), window.addEventListener("scroll", x, !0), () => {
      S?.removeEventListener("scroll", x), window.removeEventListener("scroll", x, !0);
    };
  }, [n.isVisible, e]);
  const [l, d] = j(!1), u = F(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      d(!0), setTimeout(() => d(!1), 1500);
    });
  }, [n.url]), f = F(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = F(() => {
    if (n.linkElement) {
      const { view: x } = e, { doc: S } = x.state;
      let w = null, k = null;
      S.descendants((D, C) => {
        if (D.isText && D.marks.some((T) => T.type.name === "link")) {
          const T = x.nodeDOM(C);
          if (T && (T === n.linkElement || T.parentElement === n.linkElement))
            return w = C, k = C + D.nodeSize, !1;
        }
        return !0;
      }), w !== null && k !== null ? e.chain().focus().setTextSelection({ from: w, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((x) => ({ ...x, isVisible: !1 }));
  }, [e, n.linkElement]), h = F(() => {
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
              /* @__PURE__ */ m(zu, { size: 13, className: "link-hover-tooltip-link-icon" }),
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
              children: /* @__PURE__ */ m(Bu, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: u,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: l ? /* @__PURE__ */ m(Nn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ m(An, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(Fu, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ m(Et, { children: b });
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
], rm = Dn(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = j(!1), d = V(null), u = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = ni.find((h) => h.value === u)?.shortLabel || "P";
  Z(() => {
    if (!c) return;
    const h = (g) => {
      d.current && !d.current.contains(g.target) && l(!1);
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
  return /* @__PURE__ */ R("div", { ref: d, className: "relative flex-shrink-0", children: [
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
          ${u !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: f }),
          /* @__PURE__ */ m($t, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
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
          const g = h.value === u;
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
}), om = Dn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const i = V(null), a = dc({
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
  }), [c, l] = j(!1), [d, u] = j(""), [f, p] = j(!1), [h, g] = j({ top: 0, left: 0 }), y = V(null), v = V(null), b = V(null), x = F(() => {
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
  }, w = F((T, E) => {
    T.preventDefault(), T.stopPropagation(), E();
  }, []);
  Z(() => {
    if (!t || t.isDestroyed) return;
    const T = () => {
      if (!t.isDestroyed)
        try {
          const { selection: E } = t.state, { empty: N, from: A, to: P } = E, z = ("node" in E && E.node ? E.node : null)?.type?.name === "resizableImage";
          if (N || z || t.isActive("codeBlock")) {
            b.current && (clearTimeout(b.current), b.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              p(!1), l(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const G = t.view.coordsAtPos(A), I = t.view.coordsAtPos(P), L = y.current?.offsetWidth || 500, B = y.current?.offsetHeight || 40, q = 8, K = window.innerWidth;
          let X = 0, ee = 0;
          if (y.current) {
            const de = y.current.closest('[data-slot="dialog-content"]');
            if (de) {
              const fe = de.getBoundingClientRect();
              X = fe.left, ee = fe.top;
            }
          }
          let W = (G.left + I.left) / 2 - L / 2 - X;
          const Y = X ? K - X : K;
          W = Math.max(q, Math.min(Y - L - q, W));
          let J = G.top - B - 10 - ee;
          J < q && (J = I.bottom + 10 - ee), f ? g({ top: Math.max(q, J), left: W }) : (b.current && clearTimeout(b.current), b.current = setTimeout(() => {
            g({ top: Math.max(q, J), left: W }), p(!0);
          }, 50));
        } catch (E) {
          console.warn("FloatingToolbar: Error updating position", E);
        }
    };
    return t.on("selectionUpdate", T), () => {
      t.off("selectionUpdate", T), v.current && clearTimeout(v.current), b.current && clearTimeout(b.current);
    };
  }, [t, f]);
  const k = (T) => {
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
            value: d,
            onChange: (T) => u(T.target.value),
            onKeyDown: (T) => {
              T.key === "Enter" && (T.preventDefault(), x()), T.key === "Escape" && (l(!1), u(""));
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
                T.preventDefault(), x();
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
        top: h.top,
        left: h.left
      },
      onMouseDown: k,
      children: [
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBold().run()),
            isActive: a?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Ws, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleItalic().run()),
            isActive: a?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(zs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleUnderline().run()),
            isActive: a?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Bs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleStrike().run()),
            isActive: a?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Fs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleCode().run()),
            isActive: a?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(pc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleHighlight().run()),
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
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBlockquote().run()),
            isActive: a?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Ys, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleBulletList().run()),
            isActive: a?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(js, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleOrderedList().run()),
            isActive: a?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(Vs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleTaskList().run()),
            isActive: a?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(Ks, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ke,
          {
            onMouseDown: (T) => w(T, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: a?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(Uu, { size: D })
          }
        ),
        o && /* @__PURE__ */ R(Ee, { children: [
          /* @__PURE__ */ m(ti, {}),
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
              children: /* @__PURE__ */ m(uo, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(Et, { onMouseDown: k, children: C });
});
function sm(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const am = {}, Gn = {};
function Gt(e, t) {
  try {
    const r = (am[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in Gn ? Gn[r] : ri(r, r.split(":"));
  } catch {
    if (e in Gn) return Gn[e];
    const n = e?.match(im);
    return n ? ri(e, n.slice(1)) : NaN;
  }
}
const im = /([+-]\d\d):?(\d\d)?/;
function ri(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Gn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class at extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Gt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Dc(this), gs(this)) : this.setTime(Date.now());
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
    const t = -Gt(this.timeZone, this);
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
    return new at(+new Date(t), this.timeZone);
  }
  //#endregion
}
const oi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!oi.test(e)) return;
  const t = e.replace(oi, "$1UTC");
  at.prototype[t] && (e.startsWith("get") ? at.prototype[e] = function() {
    return this.internal[t]();
  } : (at.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), cm(this), +this;
  }, at.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), gs(this), +this;
  }));
});
function gs(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Gt(e.timeZone, e) * 60));
}
function cm(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Dc(e);
}
function Dc(e) {
  const t = Gt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const d = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, u = Math.round(-(Gt(e.timeZone, e) * 60)) % 60;
  (u || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + d));
  const f = Gt(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, v = g - c;
  if (y && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const b = Gt(e.timeZone, e), x = b > 0 ? Math.floor(b) : Math.ceil(b), S = p - x;
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
    return new Le(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Le(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Nc = 6048e5, lm = 864e5, si = Symbol.for("constructDateFrom");
function Me(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && si in e ? e[si](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ge(e, t) {
  return Me(t || e, e);
}
function Ac(e, t, n) {
  const r = ge(e, n?.in);
  return isNaN(t) ? Me(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Rc(e, t, n) {
  const r = ge(e, n?.in);
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
let dm = {};
function lr() {
  return dm;
}
function Sn(e, t) {
  const n = lr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ge(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function tr(e, t) {
  return Sn(e, { ...t, weekStartsOn: 1 });
}
function Lc(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = Me(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = tr(o), i = Me(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = tr(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function ai(e) {
  const t = ge(e), n = new Date(
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
function Ln(e, ...t) {
  const n = Me.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function nr(e, t) {
  const n = ge(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Ic(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  ), s = nr(r), i = nr(o), a = +s - ai(s), c = +i - ai(i);
  return Math.round((a - c) / lm);
}
function um(e, t) {
  const n = Lc(e, t), r = Me(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), tr(r);
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
    !r && typeof o == "object" && (r = Me.bind(null, o));
    const s = ge(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Me(r, n || NaN);
}
function hm(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Me.bind(null, o));
    const s = ge(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Me(r, n || NaN);
}
function gm(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  );
  return +nr(r) == +nr(o);
}
function Pc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ym(e) {
  return !(!Pc(e) && typeof e != "number" || isNaN(+ge(e)));
}
function vm(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function bm(e, t) {
  const n = ge(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Oc(e, t) {
  const [n, r] = Ln(e, t.start, t.end);
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
    c.push(Me(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function xm(e, t) {
  const n = ge(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function km(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function _c(e, t) {
  const n = ge(e, t?.in);
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
    c.push(Me(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function $c(e, t) {
  const n = lr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ge(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
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
}, Tm = (e, t, n) => {
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
const Em = {
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
    formats: Em,
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
function jn(e) {
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
  era: jn({
    values: Im,
    defaultWidth: "wide"
  }),
  quarter: jn({
    values: Pm,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: jn({
    values: Om,
    defaultWidth: "wide"
  }),
  day: jn({
    values: _m,
    defaultWidth: "wide"
  }),
  dayPeriod: jn({
    values: $m,
    defaultWidth: "wide",
    formattingValues: Hm,
    defaultFormattingWidth: "wide"
  })
};
function Vn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? Fm(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Bm(a, (u) => u.test(i))
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
  era: Vn({
    matchPatterns: Vm,
    defaultMatchWidth: "wide",
    parsePatterns: Km,
    defaultParseWidth: "any"
  }),
  quarter: Vn({
    matchPatterns: Gm,
    defaultMatchWidth: "wide",
    parsePatterns: qm,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Vn({
    matchPatterns: Xm,
    defaultMatchWidth: "wide",
    parsePatterns: Zm,
    defaultParseWidth: "any"
  }),
  day: Vn({
    matchPatterns: Qm,
    defaultMatchWidth: "wide",
    parsePatterns: Jm,
    defaultParseWidth: "any"
  }),
  dayPeriod: Vn({
    matchPatterns: ep,
    defaultMatchWidth: "any",
    parsePatterns: tp,
    defaultParseWidth: "any"
  })
}, ra = {
  code: "en-US",
  formatDistance: Tm,
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
  const n = ge(e, t?.in);
  return Ic(n, _c(n)) + 1;
}
function Hc(e, t) {
  const n = ge(e, t?.in), r = +tr(n) - +um(n);
  return Math.round(r / Nc) + 1;
}
function Wc(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = lr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Me(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = Sn(i, t), c = Me(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = Sn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function op(e, t) {
  const n = lr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Wc(e, t), s = Me(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), Sn(s, t);
}
function zc(e, t) {
  const n = ge(e, t?.in), r = +Sn(n, t) - +op(n, t);
  return Math.round(r / Nc) + 1;
}
function he(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Lt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return he(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : he(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return he(e.getDate(), t.length);
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
    return he(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return he(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return he(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return he(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return he(o, t.length);
  }
}, cn = {
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
    return Lt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Wc(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return he(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : he(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Lc(e);
    return he(n, t.length);
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
    return he(n, t.length);
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
        return he(r, 2);
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
        return he(r, 2);
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
        return Lt.M(e, t);
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
        return he(r + 1, 2);
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
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : he(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Hc(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : he(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Lt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = rp(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : he(r, t.length);
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
        return he(s, 2);
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
        return he(s, t.length);
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
        return he(o, t.length);
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
    switch (r === 12 ? o = cn.noon : r === 0 ? o = cn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = cn.evening : r >= 12 ? o = cn.afternoon : r >= 4 ? o = cn.morning : o = cn.night, t) {
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
    return Lt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Lt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : he(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : he(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Lt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Lt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Lt.S(e, t);
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
        return Vt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Vt(r, ":");
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
        return Vt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Vt(r, ":");
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
        return "GMT" + Vt(r, ":");
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
        return "GMT" + Vt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return he(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return he(+e, t.length);
  }
};
function ci(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + he(s, 2);
}
function li(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + he(Math.abs(e) / 60, 2) : Vt(e, t);
}
function Vt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = he(Math.trunc(r / 60), 2), s = he(r % 60, 2);
  return n + o + t + s;
}
const di = (e, t) => {
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
    return di(e, t);
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
  return s.replace("{{date}}", di(r, t)).replace("{{time}}", Bc(o, t));
}, ap = {
  p: Bc,
  P: sp
}, ip = /^D+$/, cp = /^Y+$/, lp = ["D", "DD", "YY", "YYYY"];
function dp(e) {
  return ip.test(e);
}
function up(e) {
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
  const r = lr(), o = n?.locale ?? r.locale ?? ra, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = ge(e, n?.in);
  if (!ym(a))
    throw new RangeError("Invalid time value");
  let c = t.match(hp).map((d) => {
    const u = d[0];
    if (u === "p" || u === "P") {
      const f = ap[u];
      return f(d, o.formatLong);
    }
    return d;
  }).join("").match(pp).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const u = d[0];
    if (u === "'")
      return { isToken: !1, value: wp(d) };
    if (ii[u])
      return { isToken: !0, value: d };
    if (u.match(vp))
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
    (!n?.useAdditionalWeekYearTokens && up(u) || !n?.useAdditionalDayOfYearTokens && dp(u)) && fp(u, t, String(e));
    const f = ii[u[0]];
    return f(a, u, o.localize, l);
  }).join("");
}
function wp(e) {
  const t = e.match(gp);
  return t ? t[1].replace(yp, "'") : e;
}
function xp(e, t) {
  const n = ge(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Me(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function kp(e, t) {
  return ge(e, t?.in).getMonth();
}
function Cp(e, t) {
  return ge(e, t?.in).getFullYear();
}
function Mp(e, t) {
  return +ge(e) > +ge(t);
}
function Sp(e, t) {
  return +ge(e) < +ge(t);
}
function Tp(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Ep(e, t, n) {
  const [r, o] = Ln(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Dp(e, t, n) {
  const r = ge(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Me(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = xp(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function Np(e, t, n) {
  const r = ge(e, n?.in);
  return isNaN(+r) ? Me(e, NaN) : (r.setFullYear(t), r);
}
const ui = 5, Ap = 4;
function Rp(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, ui * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? ui : Ap;
}
function Fc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Lp(e, t) {
  const n = Fc(e, t), r = Rp(e, t);
  return t.addDays(n, r * 7 - 1);
}
class je {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Le.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Le(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Ac(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Rc(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : fm(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : mm(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Ic(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : vm(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : wm(r), this.eachYearOfInterval = (r) => {
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
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Hc(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : kp(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : Cp(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : zc(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Mp(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Sp(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Pc(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : gm(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : Tp(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Ep(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : pm(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : hm(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : Dp(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : Np(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Fc(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : nr(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : tr(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : xm(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Sn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : _c(r), this.options = { locale: ra, ...t }, this.overrides = n;
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
    return t && je.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && je.yearFirstLocales.has(s))
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
je.yearFirstLocales = /* @__PURE__ */ new Set([
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
const ut = new je();
class Uc {
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
  return Q.createElement("button", { ...e });
}
function _p(e) {
  return Q.createElement("span", { ...e });
}
function $p(e) {
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
function Hp(e) {
  const { day: t, modifiers: n, ...r } = e;
  return Q.createElement("td", { ...r });
}
function Wp(e) {
  const { day: t, modifiers: n, ...r } = e, o = Q.useRef(null);
  return Q.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), Q.createElement("button", { ref: o, ...r });
}
var oe;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(oe || (oe = {}));
var be;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(be || (be = {}));
var Ze;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ze || (Ze = {}));
var Fe;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Fe || (Fe = {}));
function zp(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[oe.Dropdown], n].join(" "), a = t?.find(({ value: c }) => c === s.value);
  return Q.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[oe.DropdownRoot] },
    Q.createElement(r.Select, { className: i, ...s }, t?.map(({ value: c, label: l, disabled: d }) => Q.createElement(r.Option, { key: c, value: c, disabled: d }, l))),
    Q.createElement(
      "span",
      { className: o[oe.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      Q.createElement(r.Chevron, { orientation: "down", size: 18, className: o[oe.Chevron] })
    )
  );
}
function Bp(e) {
  return Q.createElement("div", { ...e });
}
function Fp(e) {
  return Q.createElement("div", { ...e });
}
function Up(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return Q.createElement("div", { ...r }, e.children);
}
function Yp(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return Q.createElement("div", { ...r });
}
function jp(e) {
  return Q.createElement("table", { ...e });
}
function Vp(e) {
  return Q.createElement("div", { ...e });
}
const Yc = uc(void 0);
function dr() {
  const e = fc(Yc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Kp(e) {
  const { components: t } = dr();
  return Q.createElement(t.Dropdown, { ...e });
}
function Gp(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = dr(), d = F((f) => {
    o && n?.(f);
  }, [o, n]), u = F((f) => {
    r && t?.(f);
  }, [r, t]);
  return Q.createElement(
    "nav",
    { ...s },
    Q.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[oe.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      Q.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[oe.Chevron], orientation: "left" })
    ),
    Q.createElement(
      i.NextMonthButton,
      { type: "button", className: a[oe.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      Q.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[oe.Chevron] })
    )
  );
}
function qp(e) {
  const { components: t } = dr();
  return Q.createElement(t.Button, { ...e });
}
function Xp(e) {
  return Q.createElement("option", { ...e });
}
function Zp(e) {
  const { components: t } = dr();
  return Q.createElement(t.Button, { ...e });
}
function Qp(e) {
  const { rootRef: t, ...n } = e;
  return Q.createElement("div", { ...n, ref: t });
}
function Jp(e) {
  return Q.createElement("select", { ...e });
}
function eh(e) {
  const { week: t, ...n } = e;
  return Q.createElement("tr", { ...n });
}
function th(e) {
  return Q.createElement("th", { ...e });
}
function nh(e) {
  return Q.createElement(
    "thead",
    { "aria-hidden": !0 },
    Q.createElement("tr", { ...e })
  );
}
function rh(e) {
  const { week: t, ...n } = e;
  return Q.createElement("th", { ...n });
}
function oh(e) {
  return Q.createElement("th", { ...e });
}
function sh(e) {
  return Q.createElement("tbody", { ...e });
}
function ah(e) {
  const { components: t } = dr();
  return Q.createElement(t.Dropdown, { ...e });
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
function wt(e, t, n = !1, r = ut) {
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
function xt(e, t, n = ut) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (qc(a, n))
      return a.includes(e);
    if (oa(a))
      return wt(a, e, !1, n);
    if (Gc(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (jc(a)) {
      const c = s(a.before, e), l = s(a.after, e), d = c > 0, u = l < 0;
      return i(a.before, a.after) ? u && d : d || u;
    }
    return Vc(a) ? s(e, a.after) > 0 : Kc(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function ch(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: d } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: h, endOfMonth: g, isAfter: y } = o, v = n && p(n), b = r && g(r), x = {
    [be.focused]: [],
    [be.outside]: [],
    [be.disabled]: [],
    [be.hidden]: [],
    [be.today]: []
  }, S = {};
  for (const w of e) {
    const { date: k, displayMonth: D } = w, C = !!(D && !f(k, D)), T = !!(v && h(k, v)), E = !!(b && y(k, b)), N = !!(s && xt(k, s, o)), A = !!(i && xt(k, i, o)) || T || E || // Broadcast calendar will show outside days as default
    !l && !c && C || l && c === !1 && C, P = u(k, d ?? o.today());
    C && x.outside.push(w), N && x.disabled.push(w), A && x.hidden.push(w), P && x.today.push(w), a && Object.keys(a).forEach((O) => {
      const _ = a?.[O];
      _ && xt(k, _, o) && (S[O] ? S[O].push(w) : S[O] = [w]);
    });
  }
  return (w) => {
    const k = {
      [be.focused]: !1,
      [be.disabled]: !1,
      [be.hidden]: !1,
      [be.outside]: !1,
      [be.today]: !1
    }, D = {};
    for (const C in x) {
      const T = x[C];
      k[C] = T.some((E) => E === w);
    }
    for (const C in S)
      D[C] = S[C].some((T) => T === w);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function lh(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[be[s]] ? o.push(t[be[s]]) : t[Ze[s]] && o.push(t[Ze[s]]), o), [t[oe.Day]]);
}
function dh(e) {
  return {
    ...ih,
    ...e
  };
}
function uh(e) {
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
  for (const t in oe)
    e[oe[t]] = `rdp-${oe[t]}`;
  for (const t in be)
    e[be[t]] = `rdp-${be[t]}`;
  for (const t in Ze)
    e[Ze[t]] = `rdp-${Ze[t]}`;
  for (const t in Fe)
    e[Fe[t]] = `rdp-${Fe[t]}`;
  return e;
}
function Xc(e, t, n) {
  return (n ?? new je(t)).formatMonthYear(e);
}
const fh = Xc;
function mh(e, t, n) {
  return (n ?? new je(t)).format(e, "d");
}
function ph(e, t = ut) {
  return t.format(e, "LLLL");
}
function hh(e, t, n) {
  return (n ?? new je(t)).format(e, "cccccc");
}
function gh(e, t = ut) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function yh() {
  return "";
}
function Zc(e, t = ut) {
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
  let r = { ...t?.[oe.Day] };
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
function Qc(e, t, n, r) {
  let o = (r ?? new je(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Sh = Qc;
function Jc(e, t, n) {
  return (n ?? new je(t)).formatMonthYear(e);
}
const Th = Jc;
function Eh(e, t, n, r) {
  let o = (r ?? new je(n)).format(e, "PPPP");
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
  return (n ?? new je(t)).format(e, "cccc");
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
  labelCaption: Th,
  labelDay: Sh,
  labelDayButton: Qc,
  labelGrid: Jc,
  labelGridcell: Eh,
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
  const i = V(null), a = V(r), c = V(!1);
  lo(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const d = s.isSameMonth(r[0].date, l[0].date), u = s.isAfter(r[0].date, l[0].date), f = u ? n[Fe.caption_after_enter] : n[Fe.caption_before_enter], p = u ? n[Fe.weeks_after_enter] : n[Fe.weeks_before_enter], h = i.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (jo(g).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const S = $h(x);
      S && x.contains(S) && x.removeChild(S);
      const w = Vo(x);
      w && w.classList.remove(f);
      const k = Ko(x);
      k && k.classList.remove(p);
    }), i.current = g) : i.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
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
        const T = Wh(w);
        T && (T.style.opacity = "0");
        const E = Vo(w);
        E && (E.classList.add(u ? n[Fe.caption_before_exit] : n[Fe.caption_after_exit]), E.addEventListener("animationend", C));
        const N = Ko(w);
        N && N.classList.add(u ? n[Fe.weeks_before_exit] : n[Fe.weeks_after_exit]), x.insertBefore(w, x.firstChild);
      });
    }
  });
}
function Bh(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: h, endOfWeek: g, isAfter: y, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: x } = r, S = c ? v(o, r) : i ? b(o) : x(o), w = c ? f(s) : i ? p(h(s)) : g(h(s)), k = d(w, S), D = u(s, o) + 1, C = [];
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
  const { differenceInCalendarMonths: l, addMonths: d, startOfMonth: u } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = d(n, f);
  }
  return t && l(c, t) < 0 && (c = t), u(c);
}
function Yh(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, h = e.reduce((g, y) => {
    const v = n.broadcastCalendar ? u(y, r) : n.ISOWeek ? f(y) : p(y), b = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), x = t.filter((D) => D >= v && D <= b), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < S) {
      const D = t.filter((C) => {
        const T = S - x.length;
        return C > b && C <= o(b, T);
      });
      x.push(...D);
    }
    const w = x.reduce((D, C) => {
      const T = n.ISOWeek ? l(C) : d(C), E = D.find((A) => A.weekNumber === T), N = new Uc(C, y, r);
      return E ? E.days.push(N) : D.push(new Pp(T, [N])), D;
    }, []), k = new Ip(y, w);
    return g.push(k), g;
  }, []);
  return n.reverseMonths ? h.reverse() : h;
}
function jh(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: d, today: u } = t, { fromYear: f, toYear: p, fromMonth: h, toMonth: g } = e;
  !n && h && (n = h), !n && f && (n = t.newDate(f, 0, 1)), !r && g && (r = g), !r && p && (r = d(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = d(f, 0, 1) : !n && y && (n = o(c(e.today ?? u(), -100))), r ? r = a(r) : p ? r = d(p, 11, 31) : !r && y && (r = l(e.today ?? u())), [
    n && s(n),
    r && s(r)
  ];
}
function Vh(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, d = i(e);
  if (!t)
    return a(d, l);
  if (!(c(t, e) < s))
    return a(d, l);
}
function Kh(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, d = i(e);
  if (!t)
    return a(d, -l);
  if (!(c(d, t) <= 0))
    return a(d, -l);
}
function Gh(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function ho(e, t) {
  const [n, r] = j(e);
  return [t === void 0 ? n : t, r];
}
function qh(e, t) {
  const [n, r] = jh(e, t), { startOfMonth: o, endOfMonth: s } = t, i = fi(e, n, r, t), [a, c] = ho(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Z(() => {
    const k = fi(e, n, r, t);
    c(k);
  }, [e.timeZone]);
  const l = Uh(a, r, e, t), d = Bh(l, e.endMonth ? s(e.endMonth) : void 0, e, t), u = Yh(l, d, e, t), f = Gh(u), p = Fh(u), h = Kh(a, n, e, t), g = Vh(a, r, e, t), { disableNavigation: y, onMonthChange: v } = e, b = (k) => f.some((D) => D.days.some((C) => C.isEqualTo(k))), x = (k) => {
    if (y)
      return;
    let D = o(k);
    n && D < o(n) && (D = o(n)), r && D > o(r) && (D = o(r)), c(D), v?.(D);
  };
  return {
    months: u,
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
var ot;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ot || (ot = {}));
function mi(e) {
  return !e[be.disabled] && !e[be.hidden] && !e[be.outside];
}
function Xh(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    mi(a) && (a[be.focused] && s < ot.FocusedModifier ? (o = i, s = ot.FocusedModifier) : r?.isEqualTo(i) && s < ot.LastFocused ? (o = i, s = ot.LastFocused) : n(i.date) && s < ot.Selected ? (o = i, s = ot.Selected) : a[be.today] && s < ot.Today && (o = i, s = ot.Today));
  }
  return o || (o = e.find((i) => mi(t(i)))), o;
}
function Zh(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: d, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: h, endOfWeek: g, max: y, min: v, startOfBroadcastWeek: b, startOfISOWeek: x, startOfWeek: S } = i;
  let k = {
    day: l,
    week: u,
    month: d,
    year: f,
    startOfWeek: (D) => c ? b(D, i) : a ? x(D) : S(D),
    endOfWeek: (D) => c ? p(D) : a ? h(D) : g(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = y([r, k]) : t === "after" && o && (k = v([o, k])), k;
}
function el(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = Zh(e, t, n.date, r, o, s, i), l = !!(s.disabled && xt(c, s.disabled, i)), d = !!(s.hidden && xt(c, s.hidden, i)), u = c, f = new Uc(c, u, i);
  return !l && !d ? f : el(e, t, f, r, o, s, i, a + 1);
}
function Qh(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = j(), c = Xh(t.days, n, r || (() => !1), i), [l, d] = j(s ? c : void 0);
  return {
    isFocusTarget: (g) => !!c?.isEqualTo(g),
    setFocused: d,
    focused: l,
    blur: () => {
      a(l), d(void 0);
    },
    moveFocus: (g, y) => {
      if (!l)
        return;
      const v = el(g, y, l, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(v)) || (t.goToDay(v), d(v)));
    }
  };
}
function Jh(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = ho(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((h) => c(h, p)) ?? !1, { min: d, max: u } = e;
  return {
    selected: a,
    select: (p, h, g) => {
      let y = [...a ?? []];
      if (l(p)) {
        if (a?.length === d || r && a?.length === 1)
          return;
        y = a?.filter((v) => !c(v, p));
      } else
        a?.length === u ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, h, g), y;
    },
    isSelected: l
  };
}
function eg(e, t, n = 0, r = 0, o = !1, s = ut) {
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
function tg(e, t, n = ut) {
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
function pi(e, t, n = ut) {
  return wt(e, t.from, !1, n) || wt(e, t.to, !1, n) || wt(t, e.from, !1, n) || wt(t, e.to, !1, n);
}
function ng(e, t, n = ut) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? wt(e, a, !1, n) : qc(a, n) ? a.some((c) => wt(e, c, !1, n)) : oa(a) ? a.from && a.to ? pi(e, { from: a.from, to: a.to }, n) : !1 : Gc(a) ? tg(e, a.dayOfWeek, n) : jc(a) ? n.isAfter(a.before, a.after) ? pi(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : xt(e.from, a, n) || xt(e.to, a, n) : Vc(a) || Kc(a) ? xt(e.from, a, n) || xt(e.to, a, n) : !1))
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
function rg(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = ho(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, h) => {
      const { min: g, max: y } = e, v = f ? eg(f, l, g, y, s, t) : void 0;
      return r && n && v?.from && v.to && ng({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), i || c(v), i?.(v, f, p, h), v;
    },
    isSelected: (f) => l && wt(l, f, !1, t)
  };
}
function og(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = ho(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (u, f, p) => {
      let h = u;
      return !r && a && a && c(u, a) && (h = void 0), o || i(h), o?.(h, u, f, p), h;
    },
    isSelected: (u) => a ? c(a, u) : !1
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
  }, t.today && (t.today = new Le(t.today, t.timeZone)), t.month && (t.month = new Le(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Le(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Le(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Le(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Le(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ae) => new Le(ae, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Le(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Le(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Zt(() => {
    const ae = { ...ra, ...t.locale };
    return {
      dateLib: new je({
        locale: ae,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: dh(t.components),
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
  ]), { captionLayout: c, mode: l, navLayout: d, numberOfMonths: u = 1, onDayBlur: f, onDayClick: p, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: v, onNextClick: b, onPrevClick: x, showWeekNumber: S, styles: w } = t, { formatCaption: k, formatDay: D, formatMonthDropdown: C, formatWeekNumber: T, formatWeekNumberHeader: E, formatWeekdayName: N, formatYearDropdown: A } = r, P = qh(t, s), { days: O, months: _, navStart: z, navEnd: G, previousMonth: I, nextMonth: L, goToMonth: B } = P, q = ch(O, t, z, G, s), { isSelected: K, select: X, selected: ee } = sg(t, s) ?? {}, { blur: $, focused: W, isFocusTarget: Y, moveFocus: J, setFocused: de } = Qh(t, P, q, K ?? (() => !1), s), { labelDayButton: fe, labelGridcell: xe, labelGrid: De, labelMonthDropdown: Ve, labelNav: Dt, labelPrevious: Hn, labelNext: Wn, labelWeekday: yr, labelWeekNumber: vr, labelWeekNumberHeader: br, labelYearDropdown: wr } = o, nn = Zt(() => Ch(s, t.ISOWeek), [s, t.ISOWeek]), zn = l !== void 0 || p !== void 0, rn = F(() => {
    I && (B(I), x?.(I));
  }, [I, B, x]), on = F(() => {
    L && (B(L), b?.(L));
  }, [B, L, b]), xr = F((ae, ye) => (se) => {
    se.preventDefault(), se.stopPropagation(), de(ae), X?.(ae.date, ye, se), p?.(ae.date, ye, se);
  }, [X, p, de]), No = F((ae, ye) => (se) => {
    de(ae), h?.(ae.date, ye, se);
  }, [h, de]), Ao = F((ae, ye) => (se) => {
    $(), f?.(ae.date, ye, se);
  }, [$, f]), Ro = F((ae, ye) => (se) => {
    const me = {
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
    if (me[se.key]) {
      se.preventDefault(), se.stopPropagation();
      const [_e, ue] = me[se.key];
      J(_e, ue);
    }
    g?.(ae.date, ye, se);
  }, [J, g, t.dir]), Lo = F((ae, ye) => (se) => {
    y?.(ae.date, ye, se);
  }, [y]), Io = F((ae, ye) => (se) => {
    v?.(ae.date, ye, se);
  }, [v]), kr = F((ae) => (ye) => {
    const se = Number(ye.target.value), me = s.setMonth(s.startOfMonth(ae), se);
    B(me);
  }, [s, B]), Po = F((ae) => (ye) => {
    const se = Number(ye.target.value), me = s.setYear(s.startOfMonth(ae), se);
    B(me);
  }, [s, B]), { className: Oo, style: Bn } = Zt(() => ({
    className: [a[oe.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[oe.Root], ...t.style }
  }), [a, t.className, t.style, w]), _o = uh(t), tt = V(null);
  zh(tt, !!t.animate, {
    classNames: a,
    months: _,
    focused: W,
    dateLib: s
  });
  const sn = {
    dayPickerProps: t,
    selected: ee,
    select: X,
    isSelected: K,
    months: _,
    nextMonth: L,
    previousMonth: I,
    goToMonth: B,
    getModifiers: q,
    components: n,
    classNames: a,
    styles: w,
    labels: o,
    formatters: r
  };
  return Q.createElement(
    Yc.Provider,
    { value: sn },
    Q.createElement(
      n.Root,
      { rootRef: t.animate ? tt : void 0, className: Oo, style: Bn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ..._o },
      Q.createElement(
        n.Months,
        { className: a[oe.Months], style: w?.[oe.Months] },
        !t.hideNavigation && !d && Q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: w?.[oe.Nav], "aria-label": Dt(), onPreviousClick: rn, onNextClick: on, previousMonth: I, nextMonth: L }),
        _.map((ae, ye) => Q.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[oe.Month],
            style: w?.[oe.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ye,
            displayIndex: ye,
            calendarMonth: ae
          },
          d === "around" && !t.hideNavigation && ye === 0 && Q.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[oe.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Hn(I), onClick: rn, "data-animated-button": t.animate ? "true" : void 0 },
            Q.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          Q.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[oe.MonthCaption], style: w?.[oe.MonthCaption], calendarMonth: ae, displayIndex: ye }, c?.startsWith("dropdown") ? Q.createElement(
            n.DropdownNav,
            { className: a[oe.Dropdowns], style: w?.[oe.Dropdowns] },
            (() => {
              const se = c === "dropdown" || c === "dropdown-months" ? Q.createElement(n.MonthsDropdown, { key: "month", className: a[oe.MonthsDropdown], "aria-label": Ve(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: kr(ae.date), options: xh(ae.date, z, G, r, s), style: w?.[oe.Dropdown], value: s.getMonth(ae.date) }) : Q.createElement("span", { key: "month" }, C(ae.date, s)), me = c === "dropdown" || c === "dropdown-years" ? Q.createElement(n.YearsDropdown, { key: "year", className: a[oe.YearsDropdown], "aria-label": wr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Po(ae.date), options: Mh(z, G, r, s, !!t.reverseYears), style: w?.[oe.Dropdown], value: s.getYear(ae.date) }) : Q.createElement("span", { key: "year" }, A(ae.date, s));
              return s.getMonthYearOrder() === "year-first" ? [me, se] : [se, me];
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
            } }, k(ae.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            Q.createElement(n.CaptionLabel, { className: a[oe.CaptionLabel], role: "status", "aria-live": "polite" }, k(ae.date, s.options, s))
          )),
          d === "around" && !t.hideNavigation && ye === u - 1 && Q.createElement(
            n.NextMonthButton,
            { type: "button", className: a[oe.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": Wn(L), onClick: on, "data-animated-button": t.animate ? "true" : void 0 },
            Q.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: a[oe.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ye === u - 1 && d === "after" && !t.hideNavigation && Q.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[oe.Nav], style: w?.[oe.Nav], "aria-label": Dt(), onPreviousClick: rn, onNextClick: on, previousMonth: I, nextMonth: L }),
          Q.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": De(ae.date, s.options, s) || void 0, className: a[oe.MonthGrid], style: w?.[oe.MonthGrid] },
            !t.hideWeekdays && Q.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[oe.Weekdays], style: w?.[oe.Weekdays] },
              S && Q.createElement(n.WeekNumberHeader, { "aria-label": br(s.options), className: a[oe.WeekNumberHeader], style: w?.[oe.WeekNumberHeader], scope: "col" }, E()),
              nn.map((se) => Q.createElement(n.Weekday, { "aria-label": yr(se, s.options, s), className: a[oe.Weekday], key: String(se), style: w?.[oe.Weekday], scope: "col" }, N(se, s.options, s)))
            ),
            Q.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[oe.Weeks], style: w?.[oe.Weeks] }, ae.weeks.map((se) => Q.createElement(
              n.Week,
              { className: a[oe.Week], key: se.weekNumber, style: w?.[oe.Week], week: se },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              Q.createElement(n.WeekNumber, { week: se, style: w?.[oe.WeekNumber], "aria-label": vr(se.weekNumber, {
                locale: i
              }), className: a[oe.WeekNumber], scope: "row", role: "rowheader" }, T(se.weekNumber, s)),
              se.days.map((me) => {
                const { date: _e } = me, ue = q(me);
                if (ue[be.focused] = !ue.hidden && !!W?.isEqualTo(me), ue[Ze.selected] = K?.(_e) || ue.selected, oa(ee)) {
                  const { from: pt, to: Un } = ee;
                  ue[Ze.range_start] = !!(pt && Un && s.isSameDay(_e, pt)), ue[Ze.range_end] = !!(pt && Un && s.isSameDay(_e, Un)), ue[Ze.range_middle] = wt(ee, _e, !0, s);
                }
                const Fn = kh(ue, w, t.modifiersStyles), He = lh(ue, a, t.modifiersClassNames), mt = !zn && !ue.hidden ? xe(_e, ue, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  Q.createElement(n.Day, { key: `${s.format(_e, "yyyy-MM-dd")}_${s.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: ue, className: He.join(" "), style: Fn, role: "gridcell", "aria-selected": ue.selected || void 0, "aria-label": mt, "data-day": s.format(_e, "yyyy-MM-dd"), "data-month": me.outside ? s.format(_e, "yyyy-MM") : void 0, "data-selected": ue.selected || void 0, "data-disabled": ue.disabled || void 0, "data-hidden": ue.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": ue.focused || void 0, "data-today": ue.today || void 0 }, !ue.hidden && zn ? Q.createElement(n.DayButton, { className: a[oe.DayButton], style: w?.[oe.DayButton], type: "button", day: me, modifiers: ue, disabled: ue.disabled || void 0, tabIndex: Y(me) ? 0 : -1, "aria-label": fe(_e, ue, s.options, s), onClick: xr(me, ue), onBlur: Ao(me, ue), onFocus: No(me, ue), onKeyDown: Ro(me, ue), onMouseEnter: Lo(me, ue), onMouseLeave: Io(me, ue) }, D(_e, s.options, s)) : !ue.hidden && D(me.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      Q.createElement(n.Footer, { className: a[oe.Footer], style: w?.[oe.Footer], role: "status", "aria-live": "polite" }, t.footer)
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
      if (dg(o)) {
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
}, dg = (e) => e.isThemeGetter, ug = (e) => {
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
    const d = s.length === 0 ? o : o.substring(c), u = pg(d), f = u !== d, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: u,
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
  cache: ug(e.cacheSize),
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
    const d = a[l], {
      isExternal: u,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: h,
      maybePostfixModifierPosition: g
    } = n(d);
    if (u) {
      c = d + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!g, v = r(y ? h.substring(0, g) : h);
    if (!v) {
      if (!y) {
        c = d + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (v = r(h), !v) {
        c = d + (c.length > 0 ? " " + c : c);
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
    c = d + (c.length > 0 ? " " + c : c);
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
    const l = t.reduce((d, u) => u(d), e());
    return n = gg(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const d = vg(c, n);
    return o(c, d), d;
  }
  return function() {
    return s(bg.apply(null, arguments));
  };
}
const Se = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, sl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, al = /^\((?:(\w[\w-]*):)?(.+)\)$/i, xg = /^\d+\/\d+$/, kg = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Cg = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Mg = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Sg = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Tg = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ln = (e) => xg.test(e), le = (e) => !!e && !Number.isNaN(Number(e)), It = (e) => !!e && Number.isInteger(Number(e)), Go = (e) => e.endsWith("%") && le(e.slice(0, -1)), yt = (e) => kg.test(e), Eg = () => !0, Dg = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Cg.test(e) && !Mg.test(e)
), il = () => !1, Ng = (e) => Sg.test(e), Ag = (e) => Tg.test(e), Rg = (e) => !te(e) && !ne(e), Lg = (e) => In(e, dl, il), te = (e) => sl.test(e), jt = (e) => In(e, ul, Dg), qo = (e) => In(e, $g, le), yi = (e) => In(e, cl, il), Ig = (e) => In(e, ll, Ag), Er = (e) => In(e, fl, Ng), ne = (e) => al.test(e), Kn = (e) => Pn(e, ul), Pg = (e) => Pn(e, Hg), vi = (e) => Pn(e, cl), Og = (e) => Pn(e, dl), _g = (e) => Pn(e, ll), Dr = (e) => Pn(e, fl, !0), In = (e, t, n) => {
  const r = sl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Pn = (e, t, n = !1) => {
  const r = al.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, cl = (e) => e === "position" || e === "percentage", ll = (e) => e === "image" || e === "url", dl = (e) => e === "length" || e === "size" || e === "bg-size", ul = (e) => e === "length", $g = (e) => e === "number", Hg = (e) => e === "family-name", fl = (e) => e === "shadow", Wg = () => {
  const e = Se("color"), t = Se("font"), n = Se("text"), r = Se("font-weight"), o = Se("tracking"), s = Se("leading"), i = Se("breakpoint"), a = Se("container"), c = Se("spacing"), l = Se("radius"), d = Se("shadow"), u = Se("inset-shadow"), f = Se("text-shadow"), p = Se("drop-shadow"), h = Se("blur"), g = Se("perspective"), y = Se("aspect"), v = Se("ease"), b = Se("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], w = () => [...S(), ne, te], k = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], C = () => [ne, te, c], T = () => [ln, "full", "auto", ...C()], E = () => [It, "none", "subgrid", ne, te], N = () => ["auto", {
    span: ["full", It, ne, te]
  }, It, ne, te], A = () => [It, "auto", ne, te], P = () => ["auto", "min", "max", "fr", ne, te], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], _ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], z = () => ["auto", ...C()], G = () => [ln, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], I = () => [e, ne, te], L = () => [...S(), vi, yi, {
    position: [ne, te]
  }], B = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], q = () => ["auto", "cover", "contain", Og, Lg, {
    size: [ne, te]
  }], K = () => [Go, Kn, jt], X = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    ne,
    te
  ], ee = () => ["", le, Kn, jt], $ = () => ["solid", "dashed", "dotted", "double"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => [le, Go, vi, yi], J = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    ne,
    te
  ], de = () => ["none", le, ne, te], fe = () => ["none", le, ne, te], xe = () => [le, ne, te], De = () => [ln, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [yt],
      breakpoint: [yt],
      color: [Eg],
      container: [yt],
      "drop-shadow": [yt],
      ease: ["in", "out", "in-out"],
      font: [Rg],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [yt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [yt],
      shadow: [yt],
      spacing: ["px", le],
      text: [yt],
      "text-shadow": [yt],
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
        aspect: ["auto", "square", ln, te, ne, y]
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
        columns: [le, te, ne, a]
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
        z: [It, "auto", ne, te]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ln, "full", "auto", a, ...C()]
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
        flex: [le, ln, "auto", "initial", "none", te]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", le, ne, te]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", le, ne, te]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [It, "first", "last", "none", ne, te]
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
        m: z()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: z()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: z()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: z()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: z()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: z()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: z()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: z()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: z()
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
            screen: [i]
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
        text: ["base", n, Kn, jt]
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
        font: [r, ne, qo]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Go, te]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Pg, te, t]
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
        "line-clamp": [le, "none", ne, qo]
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
        decoration: [le, "from-font", "auto", ne, jt]
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
        "underline-offset": [le, "auto", ne, te]
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
        bg: L()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: B()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: q()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, It, ne, te],
          radial: ["", ne, te],
          conic: [It, ne, te]
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
        rounded: X()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": X()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": X()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": X()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": X()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": X()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": X()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": X()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": X()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": X()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": X()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": X()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": X()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": X()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": X()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ee()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ee()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ee()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ee()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ee()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ee()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ee()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ee()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ee()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ee()
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
        "divide-y": ee()
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
        "outline-offset": [le, ne, te]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", le, Kn, jt]
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
          Dr,
          Er
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
        "inset-shadow": ["none", u, Dr, Er]
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
        ring: ee()
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
        "ring-offset": [le, jt]
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
        "inset-ring": ee()
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
        "text-shadow": ["none", f, Dr, Er]
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
        opacity: [le, ne, te]
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
        "mask-radial": [ne, te]
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
        mask: B()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: q()
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
        blur: J()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [le, ne, te]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [le, ne, te]
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
          Er
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
        grayscale: ["", le, ne, te]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [le, ne, te]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", le, ne, te]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [le, ne, te]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", le, ne, te]
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
        "backdrop-blur": J()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [le, ne, te]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [le, ne, te]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", le, ne, te]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [le, ne, te]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", le, ne, te]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [le, ne, te]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [le, ne, te]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", le, ne, te]
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
        duration: [le, "initial", ne, te]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", v, ne, te]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [le, ne, te]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, ne, te]
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
        perspective: [g, ne, te]
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
        rotate: de()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": de()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": de()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": de()
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
        skew: xe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": xe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": xe()
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
        fill: ["none", ...I()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [le, Kn, jt, qo]
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
function Ie(...e) {
  return M.useCallback(go(...e), e);
}
// @__NO_SIDE_EFFECTS__
function rr(e) {
  const t = /* @__PURE__ */ Fg(e), n = M.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = M.Children.toArray(s), c = a.find(Yg);
    if (c) {
      const l = c.props.children, d = a.map((u) => u === c ? M.Children.count(l) > 1 ? M.Children.only(null) : M.isValidElement(l) ? l.props.children : null : u);
      return /* @__PURE__ */ m(t, { ...i, ref: o, children: M.isValidElement(l) ? M.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Bg = /* @__PURE__ */ rr("Slot");
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
    const d = n?.[l], u = s?.[l];
    if (d === null) return null;
    const f = wi(d) || wi(u);
    return o[l][f];
  }), a = n && Object.entries(n).reduce((l, d) => {
    let [u, f] = d;
    return f === void 0 || (l[u] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, d) => {
    let { class: u, className: f, ...p } = d;
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
      u,
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
function _t({
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
        Root: ({ className: l, rootRef: d, ...u }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: ie(l),
            ...u
          }
        ),
        Chevron: ({ className: l, orientation: d, ...u }) => d === "left" ? /* @__PURE__ */ m(Yu, { className: ie("size-4", l), ...u }) : d === "right" ? /* @__PURE__ */ m(
          ju,
          {
            className: ie("size-4", l),
            ...u
          }
        ) : /* @__PURE__ */ m(Vu, { className: ie("size-4", l), ...u }),
        DayButton: qg,
        WeekNumber: ({ children: l, ...d }) => /* @__PURE__ */ m("td", { ...d, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
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
    _t,
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
let yn = null;
const pl = /* @__PURE__ */ new Map(), Xg = /* @__PURE__ */ new Map();
function jr() {
  if (!yn) return;
  const e = yn;
  yn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Zg(e) {
  return yn?.pillDate === e;
}
function Qg({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = V(null), i = yo(e);
  Z(() => {
    const b = (x) => {
      x.key === "Escape" && (x.stopPropagation(), x.preventDefault(), o());
    };
    return document.addEventListener("keydown", b, !0), () => document.removeEventListener("keydown", b, !0);
  }, [o]), Z(() => {
    const b = (S) => {
      s.current && !s.current.contains(S.target) && (S.target.closest(".date-pill") || o());
    }, x = setTimeout(() => {
      document.addEventListener("mousedown", b, !0);
    }, 50);
    return () => {
      clearTimeout(x), document.removeEventListener("mousedown", b, !0);
    };
  }, [o]);
  const a = F((b) => {
    b && r(bn(b)), o();
  }, [r, o]), c = F((b) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + b), r(bn(x)), o();
  }, [r, o]), l = F(() => {
    const x = (/* @__PURE__ */ new Date()).getDay(), S = x === 0 ? 1 : 8 - x, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + S), r(bn(w)), o();
  }, [r, o]), d = /* @__PURE__ */ new Date(), u = d.toDateString(), f = new Date(d);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), h = d.getDay(), g = h === 0 ? 1 : 8 - h, y = new Date(d);
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
              _t,
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
              _t,
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
              _t,
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
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, d = s - r.bottom - c - l, u = r.top - c - l, f = d >= a ? "below" : u >= a ? "above" : d >= u ? "below" : "above";
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
  const b = Tf(y);
  yn = { container: y, root: b, pillDate: t };
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
  const r = V(null), o = e.attrs.date || vn(), s = hl(o), i = ia(o), a = F(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const d = c.getAttribute("data-theme");
      if (d) return d;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return Z(() => (pl.set(o, (c) => {
    t({ date: c });
  }), Xg.set(o, a), () => {
  }), [o, t, a]), Z(() => {
    const c = r.current;
    if (!c) return;
    const l = (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = c.getAttribute("data-date") || vn(), f = a();
      Jg(c, u, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), Z(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      yn && jr();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ m(Mn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
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
function vn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Qn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function bn(e) {
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
function Kt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return vn();
  if (n === "tomorrow") return Qn(1);
  if (n === "yesterday") return Qn(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return Qn(c);
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
      return bn(d);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return bn(i);
  }
  return null;
}
function ia(e) {
  const t = yo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const ny = new Pe("datePillPaste"), ry = mo.create({
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
        default: vn(),
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
      Rn(this.options.HTMLAttributes, t, {
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
        const n = e || vn();
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
        u().deleteRange(d).insertDatePill(vn()).run();
      }
    }), t = new We({
      find: /@tomorrow\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Qn(1)).run();
      }
    }), n = new We({
      find: /@yesterday\s$/,
      handler: ({ range: d, chain: u }) => {
        u().deleteRange(d).insertDatePill(Qn(-1)).run();
      }
    }), r = new We({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: d, chain: u, match: f }) => {
        u().deleteRange(d).insertDatePill(f[1]).run();
      }
    }), o = new We({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: d, chain: u, match: f }) => {
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
          u().deleteRange(d).insertDatePill(bn(y)).run();
        }
      }
    }), s = new We({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Kt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), i = new We({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Kt(f[1]);
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
        const p = Kt(f[1]);
        p && u().deleteRange(d).insertDatePill(p).run();
      }
    }), l = new We({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: d, chain: u, match: f }) => {
        const p = Kt(f[1]);
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
      new Oe({
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
              if (Kt(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let h = 0;
            const g = new RegExp(i.source, i.flags);
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const S = y[1], w = Kt(S);
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
            ), { $from: x } = d.selection;
            if (x.parent.type.name === "paragraph") {
              const S = u;
              let w = d.selection.from;
              for (const k of p)
                S.insert(w, k), w += k.nodeSize;
              S.delete(d.selection.from, d.selection.to), t.dispatch(S);
            } else
              u.replaceSelectionWith(b), t.dispatch(u);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Xe = /* @__PURE__ */ new Map();
function oy({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = V(null), i = V(null), a = e.attrs.tag || "", c = V(!1), [l, d] = j(() => Xe.has(a)), [u, f] = j(() => Xe.get(a)?.value ?? a);
  Z(() => {
    l || f(a);
  }, [a, l]), Z(() => {
    if (l) {
      const b = Xe.get(a);
      Xe.set(a, {
        value: u,
        focusedAt: b?.focusedAt ?? Date.now()
      });
    }
  }, [l, u, a]);
  const p = F((b) => {
    if (c.current) return;
    c.current = !0;
    const x = b.trim().replace(/^#/, ""), S = Jn(x);
    if (Xe.delete(a), S && Xe.delete(S), !S || !hn(S))
      o();
    else if (S !== a) {
      const w = r();
      if (typeof w == "number" && n) {
        const { tr: k } = n.state, D = e.nodeSize;
        k.delete(w, w + D), k.insert(w, n.schema.nodes.tagPill.create({ tag: S })), n.view.dispatch(k);
      }
    } else
      Xe.delete(a);
    d(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), h = F(() => {
    n && !n.isEditable || (Xe.set(a, { value: a, focusedAt: Date.now() }), f(a), d(!0), c.current = !1);
  }, [n, a]);
  Z(() => {
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
  }, [l, n, r, h]), Z(() => {
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
  const g = F((b) => {
    b.key === "Enter" ? (b.preventDefault(), p(u)) : b.key === "Escape" && (b.preventDefault(), Xe.delete(a), d(!1), c.current = !0, n?.commands.focus());
  }, [p, u, a, n]), y = F(() => {
    const x = Xe.get(a)?.focusedAt ?? 0;
    Date.now() - x > 300 && p(u);
  }, [p, u, a]), v = F((b) => {
    f(b.target.value);
  }, []);
  return l ? /* @__PURE__ */ m(Mn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
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
            value: u,
            onChange: v,
            onKeyDown: g,
            onBlur: y,
            spellCheck: !1,
            autoComplete: "off"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ m(Mn, { as: "span", className: "inline", children: /* @__PURE__ */ R(
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
function hn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Jn(e) {
  return e.toLowerCase().trim();
}
const sy = new Pe("tagPillPaste"), ay = mo.create({
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
    return co(oy, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Jn(e);
        return hn(n) ? t.insertContent({
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
        const o = Jn(r[1]);
        if (hn(o)) {
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
      new Oe({
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
              if (hn(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: d } = t, { tr: u, schema: f } = d, p = [];
            let h = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const x = Jn(y[1]);
              if (hn(x)) {
                const S = y[0], w = S.startsWith(" ") || S.startsWith(`
`) ? 1 : 0, k = o.slice(h, y.index + w);
                k && p.push(f.text(k)), p.push(e.create({ tag: x })), h = y.index + S.length;
              }
            }
            const v = o.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const { $from: b } = d.selection;
            if (b.parent.type.name === "paragraph") {
              const x = u;
              let S = d.selection.from;
              for (const w of p)
                x.insert(S, w), S += w.nodeSize;
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
function gl({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = j(""), [i, a] = j(""), [c, l] = j(""), [d, u] = j(!1), f = V(null), p = V(null);
  Z(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), Z(() => {
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
    u(!0);
    const b = new window.Image();
    b.onload = () => {
      u(!1), n(o.trim(), i.trim()), t();
    }, b.onerror = () => {
      u(!1), n(o.trim(), i.trim()), t();
    }, setTimeout(() => {
      d && (u(!1), n(o.trim(), i.trim()), t());
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
              children: /* @__PURE__ */ m(Ct, { size: 16 })
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
const iy = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(fo, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(Ku, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(Gu, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(qu, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(Xu, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(Zu, { size: 16 }),
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
], cy = 32, ly = 8, dy = 320, uy = 210, Nr = 12;
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
  const [t, n] = j(!1), [r, o] = j(""), [s, i] = j(0), [a, c] = j(null), [l, d] = j(!1), [u, f] = j({ top: 0, left: 0 }), [p, h] = j("below"), g = V(null), y = V(-1), v = V(!1);
  Z(() => {
    v.current = t;
  }, [t]);
  const b = iy.filter((T) => {
    if (!r) return !0;
    const E = r.toLowerCase();
    return T.title.toLowerCase().includes(E) || T.keywords?.some((N) => N.includes(E));
  }), x = Math.min(
    b.length * cy + ly,
    dy
  );
  lo(() => {
    if (!t || !a) return;
    const { top: T, bottom: E, left: N } = a, A = window.innerHeight, P = window.innerWidth, O = A - E - Nr, _ = T - Nr;
    let z;
    if (O >= x ? z = "below" : _ >= x ? z = "above" : z = O >= _ ? "below" : "above", h(z), g.current) {
      const G = Math.max(
        Nr,
        Math.min(N, P - uy - Nr)
      ), I = z === "below" ? E + 4 : T - x - 4;
      g.current.style.top = `${I}px`, g.current.style.left = `${G}px`;
    }
  }, [t, a, x, b.length]);
  const S = F(() => {
    const { state: T } = e, { selection: E } = T, N = E.from, A = y.current;
    if (A >= 0 && A <= N)
      e.chain().focus().deleteRange({ from: A, to: N }).run();
    else {
      const { $from: P } = E, _ = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if (_ !== -1) {
        const z = P.pos - (P.parentOffset - _);
        e.chain().focus().deleteRange({ from: z, to: P.pos }).run();
      }
    }
  }, [e]), w = F(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), k = F((T) => {
    const E = b[T];
    if (E) {
      if (S(), E.isImageCommand) {
        const { state: N } = e, A = e.view.coordsAtPos(N.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), d(!0);
      } else
        E.command(e);
      w();
    }
  }, [e, b, S, w]), D = F((T, E) => {
    e.chain().focus().setImage({ src: T, alt: E }).run();
  }, [e]);
  return Z(() => {
    if (!e) return;
    const T = () => {
      if (v.current) return;
      const { state: E } = e, { selection: N } = E, { $from: A } = N;
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
    return e.on("update", T), () => {
      e.off("update", T);
    };
  }, [e]), Z(() => {
    if (!e || !t) return;
    const T = e.view.dom, E = (N) => {
      v.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A + 1) % b.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A - 1 + b.length) % b.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), k(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), w()));
    };
    return T.addEventListener("keydown", E, !0), () => {
      T.removeEventListener("keydown", E, !0);
    };
  }, [e, t, s, b, k, w]), Z(() => {
    if (!e || !t) return;
    const T = () => {
      if (!v.current || y.current < 0) return;
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
        const _ = ki(e);
        _ && c(_);
      } catch {
        w();
      }
    };
    return e.on("update", T), e.on("selectionUpdate", T), () => {
      e.off("update", T), e.off("selectionUpdate", T);
    };
  }, [e, t, w]), Z(() => {
    if (!t) return;
    const T = (E) => {
      g.current && !g.current.contains(E.target) && w();
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [t, w]), Z(() => {
    t && b.length === 0 && r.length > 2 && w();
  }, [t, b.length, r, w]), Z(() => {
    s >= b.length && i(Math.max(0, b.length - 1));
  }, [b.length, s]), Z(() => {
    if (!t || !g.current) return;
    const T = g.current.querySelector(".slash-item.is-selected");
    T && T.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ m(
    gl,
    {
      isOpen: l,
      onClose: () => d(!1),
      onInsert: D,
      position: u
    }
  ) : !t || b.length === 0 ? null : /* @__PURE__ */ m(Et, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: g,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: b.map((T, E) => /* @__PURE__ */ R(
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
  const [r, o] = j(!1), [s, i] = j(""), [a, c] = j([]), [l, d] = j(0), [u, f] = j(null), [p, h] = j("below"), [g, y] = j(!1), v = V(!1), b = V(null), x = V(-1), S = V(null);
  Z(() => {
    v.current = r;
  }, [r]);
  const w = F(() => {
    o(!1), i(""), c([]), d(0), x.current = -1;
  }, []), k = F((N) => {
    const A = x.current;
    if (A < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const _ = P.tr.delete(A, O), z = P.schema.marks.wikiLink;
      if (z) {
        const G = z.create({ pageName: N }), I = P.schema.text(N, [G]);
        _.insert(A, I);
        const L = A + N.length;
        _.setSelection(ct.create(_.doc, L)), _.removeStoredMark(z);
      } else
        _.insertText(`[[${N}]]`, A);
      e.view.dispatch(_), e.view.focus();
    } catch (_) {
      console.warn("WikiLinkAutocomplete: Error inserting link", _);
    }
    w();
  }, [e, w]);
  Z(() => {
    if (!e) return;
    const N = () => {
      if (v.current) return;
      const { state: A } = e, { selection: P } = A, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      x.current = O.pos - 2;
      const z = Ci(e);
      z && (f(z), o(!0), i(""), c([]), d(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), Z(() => {
    if (!e || !r) return;
    const N = e.view.dom, A = (P) => {
      if (v.current) {
        if (P.key === "ArrowDown") {
          P.preventDefault();
          const O = a.length + (s.trim() ? 1 : 0) - 1;
          d((_) => Math.min(_ + 1, O));
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
          const { state: O } = e, { $from: _ } = O.selection;
          _.parent.textBetween(0, _.parentOffset, void 0, "￼").endsWith("]]") && w();
        }, 0);
      }
    };
    return N.addEventListener("keydown", A, !0), () => {
      N.removeEventListener("keydown", A, !0);
    };
  }, [e, r, a, l, s, k, w, n]), Z(() => {
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
        i(_), d(0);
        const z = Ci(e);
        z && f(z);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, w]), Z(() => {
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
  }, [r, s, t]), Z(() => {
    if (!r) return;
    const N = (A) => {
      b.current && !b.current.contains(A.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, w]), Z(() => {
    if (!r || !b.current) return;
    const N = b.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const D = a.length + (s.trim() ? 1 : 0), C = Math.min(
    Math.max(D, 1) * py + hy,
    gy
  );
  if (lo(() => {
    if (!r || !u) return;
    const { top: N, bottom: A, left: P } = u, O = window.innerHeight, _ = window.innerWidth, z = O - A - Ar, G = N - Ar;
    let I;
    if (z >= C ? I = "below" : G >= C ? I = "above" : I = z >= G ? "below" : "above", h(I), b.current) {
      const L = Math.max(
        Ar,
        Math.min(P, _ - my - Ar)
      ), B = I === "below" ? A + 4 : N - C - 4;
      b.current.style.top = `${B}px`, b.current.style.left = `${L}px`;
    }
  }, [r, u, C, D]), !r) return null;
  const T = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(Et, { children: /* @__PURE__ */ R(
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
            onMouseEnter: () => d(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Zs, { size: 14 }) }),
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
              N.preventDefault(), n ? (n(s.trim()), w()) : k(s.trim());
            },
            onMouseEnter: () => d(a.length),
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
function On(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = M.createContext(i), c = n.length;
    n = [...n, i];
    const l = (u) => {
      const { scope: f, children: p, ...h } = u, g = f?.[e]?.[c] || a, y = M.useMemo(() => h, Object.values(h));
      return /* @__PURE__ */ m(g.Provider, { value: y, children: p });
    };
    l.displayName = s + "Provider";
    function d(u, f) {
      const p = f?.[e]?.[c] || a, h = M.useContext(p);
      if (h) return h;
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
        const u = c(s)[`__scope${l}`];
        return { ...a, ...u };
      }, {});
      return M.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Ht = globalThis?.document ? M.useLayoutEffect : () => {
}, by = M[" useInsertionEffect ".trim().toString()] || Ht;
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
        const u = xy(d) ? d(e) : d;
        u !== e && i.current?.(u);
      } else
        s(d);
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
], Re = ky.reduce((e, t) => {
  const n = /* @__PURE__ */ rr(`Primitive.${t}`), r = M.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function yl(e, t) {
  e && mc.flushSync(() => e.dispatchEvent(t));
}
function vl(e) {
  const t = e + "CollectionProvider", [n, r] = On(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: y, children: v } = g, b = Q.useRef(null), x = Q.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: y, itemMap: x, collectionRef: b, children: v });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ rr(a), l = Q.forwardRef(
    (g, y) => {
      const { scope: v, children: b } = g, x = s(a, v), S = Ie(y, x.collectionRef);
      return /* @__PURE__ */ m(c, { ref: S, children: b });
    }
  );
  l.displayName = a;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = /* @__PURE__ */ rr(d), p = Q.forwardRef(
    (g, y) => {
      const { scope: v, children: b, ...x } = g, S = Q.useRef(null), w = Ie(y, S), k = s(d, v);
      return Q.useEffect(() => (k.itemMap.set(S, { ref: S, ...x }), () => void k.itemMap.delete(S))), /* @__PURE__ */ m(f, { [u]: "", ref: w, children: b });
    }
  );
  p.displayName = d;
  function h(g) {
    const y = s(e + "CollectionConsumer", g);
    return Q.useCallback(() => {
      const b = y.collectionRef.current;
      if (!b) return [];
      const x = Array.from(b.querySelectorAll(`[${u}]`));
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
function Mt(e) {
  const t = M.useRef(e);
  return M.useEffect(() => {
    t.current = e;
  }), M.useMemo(() => (...n) => t.current?.(...n), []);
}
function My(e, t = globalThis?.document) {
  const n = Mt(e);
  M.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Sy = "DismissableLayer", xs = "dismissableLayer.update", Ty = "dismissableLayer.pointerDownOutside", Ey = "dismissableLayer.focusOutside", Mi, wl = M.createContext({
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
    } = e, l = M.useContext(wl), [d, u] = M.useState(null), f = d?.ownerDocument ?? globalThis?.document, [, p] = M.useState({}), h = Ie(t, (D) => u(D)), g = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(y), b = d ? g.indexOf(d) : -1, x = l.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= v, w = Ay((D) => {
      const C = D.target, T = [...l.branches].some((E) => E.contains(C));
      !S || T || (o?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f), k = Ry((D) => {
      const C = D.target;
      [...l.branches].some((E) => E.contains(C)) || (s?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f);
    return My((D) => {
      b === l.layers.size - 1 && (r?.(D), !D.defaultPrevented && a && (D.preventDefault(), a()));
    }, f), M.useEffect(() => {
      if (d)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Mi = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), Si(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Mi);
        };
    }, [d, f, n, l]), M.useEffect(() => () => {
      d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), Si());
    }, [d, l]), M.useEffect(() => {
      const D = () => p({});
      return document.addEventListener(xs, D), () => document.removeEventListener(xs, D);
    }, []), /* @__PURE__ */ m(
      Re.div,
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
  const n = M.useContext(wl), r = M.useRef(null), o = Ie(t, r);
  return M.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ m(Re.div, { ...e, ref: o });
});
Ny.displayName = Dy;
function Ay(e, t = globalThis?.document) {
  const n = Mt(e), r = M.useRef(!1), o = M.useRef(() => {
  });
  return M.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          xl(
            Ty,
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
  const n = Mt(e), r = M.useRef(!1);
  return M.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && xl(Ey, n, { originalEvent: s }, {
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
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ti()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ti()), Xo++, () => {
      Xo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Xo--;
    };
  }, []);
}
function Ti() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Zo = "focusScope.autoFocusOnMount", Qo = "focusScope.autoFocusOnUnmount", Ei = { bubbles: !1, cancelable: !0 }, Iy = "FocusScope", kl = M.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = M.useState(null), l = Mt(o), d = Mt(s), u = M.useRef(null), f = Ie(t, (g) => c(g)), p = M.useRef({
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
        a.contains(S) ? u.current = S : Ot(u.current, { select: !0 });
      }, y = function(x) {
        if (p.paused || !a) return;
        const S = x.relatedTarget;
        S !== null && (a.contains(S) || Ot(u.current, { select: !0 }));
      }, v = function(x) {
        if (document.activeElement === document.body)
          for (const w of x)
            w.removedNodes.length > 0 && Ot(a);
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
        const v = new CustomEvent(Zo, Ei);
        a.addEventListener(Zo, l), a.dispatchEvent(v), v.defaultPrevented || (Py(Wy(Cl(a)), { select: !0 }), document.activeElement === g && Ot(a));
      }
      return () => {
        a.removeEventListener(Zo, l), setTimeout(() => {
          const v = new CustomEvent(Qo, Ei);
          a.addEventListener(Qo, d), a.dispatchEvent(v), v.defaultPrevented || Ot(g ?? document.body, { select: !0 }), a.removeEventListener(Qo, d), Ni.remove(p);
        }, 0);
      };
    }
  }, [a, l, d, p]);
  const h = M.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (y && v) {
        const b = g.currentTarget, [x, S] = Oy(b);
        x && S ? !g.shiftKey && v === S ? (g.preventDefault(), n && Ot(x, { select: !0 })) : g.shiftKey && v === x && (g.preventDefault(), n && Ot(S, { select: !0 })) : v === b && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ m(Re.div, { tabIndex: -1, ...i, ref: f, onKeyDown: h });
});
kl.displayName = Iy;
function Py(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Ot(r, { select: t }), document.activeElement !== n) return;
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
function Ot(e, { select: t = !1 } = {}) {
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
  return Ht(() => {
    n((r) => r ?? String(By++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Fy = ["top", "right", "bottom", "left"], Wt = Math.min, Ue = Math.max, Qr = Math.round, Rr = Math.floor, lt = (e) => ({
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
  return Ue(e, Wt(t, n));
}
function St(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Tt(e) {
  return e.split("-")[0];
}
function _n(e) {
  return e.split("-")[1];
}
function da(e) {
  return e === "x" ? "y" : "x";
}
function ua(e) {
  return e === "y" ? "height" : "width";
}
const jy = /* @__PURE__ */ new Set(["top", "bottom"]);
function it(e) {
  return jy.has(Tt(e)) ? "y" : "x";
}
function fa(e) {
  return da(it(e));
}
function Vy(e, t, n) {
  n === void 0 && (n = !1);
  const r = _n(e), o = fa(e), s = ua(o);
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
  const o = _n(e);
  let s = Xy(Tt(e), n === "start", r);
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
  const s = it(t), i = fa(t), a = ua(i), c = Tt(t), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
  switch (_n(t)) {
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
    x: d,
    y: u
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
    d = b ?? d, u = x ?? u, p = {
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
      x: d,
      y: u
    } = Ii(l, f, c)), g = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function or(e, t) {
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
  } = St(t, e), h = Ml(p), y = a[f ? u === "floating" ? "reference" : "floating" : u], v = eo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: c
  })), b = u === "floating" ? {
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
      padding: d = 0
    } = St(e, t) || {};
    if (l == null)
      return {};
    const u = Ml(d), f = {
      x: n,
      y: r
    }, p = fa(o), h = ua(p), g = await i.getDimensions(l), y = p === "y", v = y ? "top" : "left", b = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", S = s.reference[h] + s.reference[p] - f[p] - s.floating[h], w = f[p] - s.reference[p], k = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let D = k ? k[x] : 0;
    (!D || !await (i.isElement == null ? void 0 : i.isElement(k))) && (D = a.floating[x] || s.floating[h]);
    const C = S / 2 - w / 2, T = D / 2 - g[h] / 2 - 1, E = Wt(u[v], T), N = Wt(u[b], T), A = E, P = D - g[h] - N, O = D / 2 - g[h] / 2 + C, _ = ks(A, O, P), z = !c.arrow && _n(o) != null && O !== _ && s.reference[h] / 2 - (O < A ? E : N) - g[h] / 2 < 0, G = z ? O < A ? O - A : O - P : 0;
    return {
      [p]: f[p] + G,
      data: {
        [p]: _,
        centerOffset: O - _ - G,
        ...z && {
          alignmentOffset: G
        }
      },
      reset: z
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
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: g = !0,
        ...y
      } = St(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = Tt(o), b = it(a), x = Tt(a) === a, S = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), w = f || (x || !g ? [Jr(a)] : Ky(a)), k = h !== "none";
      !f && k && w.push(...Zy(a, g, h, S));
      const D = [a, ...w], C = await or(t, y), T = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && T.push(C[v]), u) {
        const O = Vy(o, i, S);
        T.push(C[O[0]], C[O[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: T
      }], !T.every((O) => O <= 0)) {
        var N, A;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, _ = D[O];
        if (_ && (!(u === "alignment" ? b !== it(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        E.every((I) => it(I.placement) === b ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: E
            },
            reset: {
              placement: _
            }
          };
        let z = (A = E.filter((G) => G.overflows[0] <= 0).sort((G, I) => G.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!z)
          switch (p) {
            case "bestFit": {
              var P;
              const G = (P = E.filter((I) => {
                if (k) {
                  const L = it(I.placement);
                  return L === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((L) => L > 0).reduce((L, B) => L + B, 0)]).sort((I, L) => I[1] - L[1])[0]) == null ? void 0 : P[0];
              G && (z = G);
              break;
            }
            case "initialPlacement":
              z = a;
              break;
          }
        if (o !== z)
          return {
            reset: {
              placement: z
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
      } = St(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await or(t, {
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
          const s = await or(t, {
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
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Tt(n), a = _n(n), c = it(n) === "y", l = Sl.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = St(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: h
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return a && typeof h == "number" && (p = a === "end" ? h * -1 : h), c ? {
    x: p * d,
    y: f * l
  } : {
    x: f * l,
    y: p * d
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
      } = St(e, t), l = {
        x: n,
        y: r
      }, d = await or(t, c), u = it(Tt(o)), f = da(u);
      let p = l[f], h = l[u];
      if (s) {
        const y = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", b = p + d[y], x = p - d[v];
        p = ks(b, p, x);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", v = u === "y" ? "bottom" : "right", b = h + d[y], x = h - d[v];
        h = ks(b, h, x);
      }
      const g = a.fn({
        ...t,
        [f]: p,
        [u]: h
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [f]: s,
            [u]: i
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
      } = St(e, t), d = {
        x: n,
        y: r
      }, u = it(o), f = da(u);
      let p = d[f], h = d[u];
      const g = St(a, t), y = typeof g == "number" ? {
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
        const x = f === "y" ? "width" : "height", S = Sl.has(Tt(o)), w = s.reference[u] - s.floating[x] + (S && ((v = i.offset) == null ? void 0 : v[u]) || 0) + (S ? 0 : y.crossAxis), k = s.reference[u] + s.reference[x] + (S ? 0 : ((b = i.offset) == null ? void 0 : b[u]) || 0) - (S ? y.crossAxis : 0);
        h < w ? h = w : h > k && (h = k);
      }
      return {
        [f]: p,
        [u]: h
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
      } = St(e, t), d = await or(t, l), u = Tt(o), f = _n(o), p = it(o) === "y", {
        width: h,
        height: g
      } = s.floating;
      let y, v;
      u === "top" || u === "bottom" ? (y = u, v = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (v = u, y = f === "end" ? "top" : "bottom");
      const b = g - d.top - d.bottom, x = h - d.left - d.right, S = Wt(g - d[y], b), w = Wt(h - d[v], x), k = !t.middlewareData.shift;
      let D = S, C = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (C = x), (r = t.middlewareData.shift) != null && r.enabled.y && (D = b), k && !f) {
        const E = Ue(d.left, 0), N = Ue(d.right, 0), A = Ue(d.top, 0), P = Ue(d.bottom, 0);
        p ? C = h - 2 * (E !== 0 || N !== 0 ? E + N : Ue(d.left, d.right)) : D = g - 2 * (A !== 0 || P !== 0 ? A + P : Ue(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: C,
        availableHeight: D
      });
      const T = await i.getDimensions(a.floating);
      return h !== T.width || g !== T.height ? {
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
function $n(e) {
  return Tl(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ye(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ft(e) {
  var t;
  return (t = (Tl(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Tl(e) {
  return vo() ? e instanceof Node || e instanceof Ye(e).Node : !1;
}
function Qe(e) {
  return vo() ? e instanceof Element || e instanceof Ye(e).Element : !1;
}
function dt(e) {
  return vo() ? e instanceof HTMLElement || e instanceof Ye(e).HTMLElement : !1;
}
function _i(e) {
  return !vo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ye(e).ShadowRoot;
}
const cv = /* @__PURE__ */ new Set(["inline", "contents"]);
function fr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !cv.has(o);
}
const lv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function dv(e) {
  return lv.has($n(e));
}
const uv = [":popover-open", ":modal"];
function bo(e) {
  return uv.some((t) => {
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
  let t = zt(e);
  for (; dt(t) && !Tn(t); ) {
    if (ma(t))
      return t;
    if (bo(t))
      return null;
    t = zt(t);
  }
  return null;
}
function pa() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const gv = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Tn(e) {
  return gv.has($n(e));
}
function Je(e) {
  return Ye(e).getComputedStyle(e);
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
function zt(e) {
  if ($n(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    _i(e) && e.host || // Fallback.
    ft(e)
  );
  return _i(t) ? t.host : t;
}
function El(e) {
  const t = zt(e);
  return Tn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : dt(t) && fr(t) ? t : El(t);
}
function sr(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = El(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Ye(o);
  if (s) {
    const a = Ms(i);
    return t.concat(i, i.visualViewport || [], fr(o) ? o : [], a && n ? sr(a) : []);
  }
  return t.concat(o, sr(o, [], n));
}
function Ms(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Dl(e) {
  const t = Je(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = dt(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = Qr(n) !== s || Qr(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function ha(e) {
  return Qe(e) ? e : e.contextElement;
}
function wn(e) {
  const t = ha(e);
  if (!dt(t))
    return lt(1);
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
const yv = /* @__PURE__ */ lt(0);
function Nl(e) {
  const t = Ye(e);
  return !pa() || !t.visualViewport ? yv : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function vv(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ye(e) ? !1 : t;
}
function Qt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ha(e);
  let i = lt(1);
  t && (r ? Qe(r) && (i = wn(r)) : i = wn(e));
  const a = vv(s, n, r) ? Nl(s) : lt(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = Ye(s), p = r && Qe(r) ? Ye(r) : r;
    let h = f, g = Ms(h);
    for (; g && r && p !== h; ) {
      const y = wn(g), v = g.getBoundingClientRect(), b = Je(g), x = v.left + (g.clientLeft + parseFloat(b.paddingLeft)) * y.x, S = v.top + (g.clientTop + parseFloat(b.paddingTop)) * y.y;
      c *= y.x, l *= y.y, d *= y.x, u *= y.y, c += x, l += S, h = Ye(g), g = Ms(h);
    }
  }
  return eo({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function xo(e, t) {
  const n = wo(e).scrollLeft;
  return t ? t.left + n : Qt(ft(e)).left + n;
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
  const s = o === "fixed", i = ft(r), a = t ? bo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = lt(1);
  const d = lt(0), u = dt(r);
  if ((u || !u && !s) && (($n(r) !== "body" || fr(i)) && (c = wo(r)), dt(r))) {
    const p = Qt(r);
    l = wn(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? Al(i, c) : lt(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + f.y
  };
}
function wv(e) {
  return Array.from(e.getClientRects());
}
function xv(e) {
  const t = ft(e), n = wo(e), r = e.ownerDocument.body, o = Ue(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Ue(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + xo(e);
  const a = -n.scrollTop;
  return Je(r).direction === "rtl" && (i += Ue(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const $i = 25;
function kv(e, t) {
  const n = Ye(e), r = ft(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = pa();
    (!d || d && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = xo(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, h = Math.abs(r.clientWidth - u.clientWidth - p);
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
  const n = Qt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = dt(e) ? wn(e) : lt(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
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
    r = xv(ft(e));
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
  const n = zt(e);
  return n === t || !Qe(n) || Tn(n) ? !1 : Je(n).position === "fixed" || Rl(n, t);
}
function Sv(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = sr(e, [], !1).filter((a) => Qe(a) && $n(a) !== "body"), o = null;
  const s = Je(e).position === "fixed";
  let i = s ? zt(e) : e;
  for (; Qe(i) && !Tn(i); ) {
    const a = Je(i), c = ma(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && Cv.has(o.position) || fr(i) && !c && Rl(e, i)) ? r = r.filter((d) => d !== i) : o = a, i = zt(i);
  }
  return t.set(e, r), r;
}
function Tv(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? bo(t) ? [] : Sv(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, d) => {
    const u = Hi(t, d, o);
    return l.top = Ue(u.top, l.top), l.right = Wt(u.right, l.right), l.bottom = Wt(u.bottom, l.bottom), l.left = Ue(u.left, l.left), l;
  }, Hi(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Ev(e) {
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
  const r = dt(t), o = ft(t), s = n === "fixed", i = Qt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = lt(0);
  function l() {
    c.x = xo(o);
  }
  if (r || !r && !s)
    if (($n(t) !== "body" || fr(o)) && (a = wo(t)), r) {
      const p = Qt(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? Al(o, a) : lt(0), u = i.left + a.scrollLeft - c.x - d.x, f = i.top + a.scrollTop - c.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function Jo(e) {
  return Je(e).position === "static";
}
function Wi(e, t) {
  if (!dt(e) || Je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return ft(e) === n && (n = n.ownerDocument.body), n;
}
function Ll(e, t) {
  const n = Ye(e);
  if (bo(e))
    return n;
  if (!dt(e)) {
    let o = zt(e);
    for (; o && !Tn(o); ) {
      if (Qe(o) && !Jo(o))
        return o;
      o = zt(o);
    }
    return n;
  }
  let r = Wi(e, t);
  for (; r && dv(r) && Jo(r); )
    r = Wi(r, t);
  return r && Tn(r) && Jo(r) && !ma(r) ? n : r || hv(e) || n;
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
  getDocumentElement: ft,
  getClippingRect: Tv,
  getOffsetParent: Ll,
  getElementRects: Nv,
  getClientRects: wv,
  getDimensions: Ev,
  getScale: wn,
  isElement: Qe,
  isRTL: Av
};
function Il(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Lv(e, t) {
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
    const h = Rr(u), g = Rr(o.clientWidth - (d + f)), y = Rr(o.clientHeight - (u + p)), v = Rr(d), x = {
      rootMargin: -h + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: Ue(0, Wt(1, c)) || 1
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
  } = r, l = ha(e), d = o || s ? [...l ? sr(l) : [], ...sr(t)] : [];
  d.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const u = l && a ? Lv(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((v) => {
    let [b] = v;
    b && b.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = p) == null || x.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let h, g = c ? Qt(e) : null;
  c && y();
  function y() {
    const v = Qt(e);
    g && !Il(g, v) && n(), g = v, h = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    d.forEach((b) => {
      o && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), u?.(), (v = p) == null || v.disconnect(), p = null, c && cancelAnimationFrame(h);
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
  } = e, [d, u] = M.useState({
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
  }, []), S = s || h, w = i || y, k = M.useRef(null), D = M.useRef(null), C = M.useRef(d), T = c != null, E = es(c), N = es(o), A = es(l), P = M.useCallback(() => {
    if (!k.current || !D.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    N.current && (I.platform = N.current), zv(k.current, D.current, I).then((L) => {
      const B = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      O.current && !to(C.current, B) && (C.current = B, mc.flushSync(() => {
        u(B);
      }));
    });
  }, [f, t, n, N, A]);
  Vr(() => {
    l === !1 && C.current.isPositioned && (C.current.isPositioned = !1, u((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const O = M.useRef(!1);
  Vr(() => (O.current = !0, () => {
    O.current = !1;
  }), []), Vr(() => {
    if (S && (k.current = S), w && (D.current = w), S && w) {
      if (E.current)
        return E.current(S, w, P);
      P();
    }
  }, [S, w, P, E, T]);
  const _ = M.useMemo(() => ({
    reference: k,
    floating: D,
    setReference: b,
    setFloating: x
  }), [b, x]), z = M.useMemo(() => ({
    reference: S,
    floating: w
  }), [S, w]), G = M.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!z.floating)
      return I;
    const L = Bi(z.floating, d.x), B = Bi(z.floating, d.y);
    return a ? {
      ...I,
      transform: "translate(" + L + "px, " + B + "px)",
      ...Pl(z.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: B
    };
  }, [n, a, z.floating, d.x, d.y]);
  return M.useMemo(() => ({
    ...d,
    update: P,
    refs: _,
    elements: z,
    floatingStyles: G
  }), [d, P, _, z, G]);
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
Ol.displayName = Qv;
var Jv = Ol;
function eb(e) {
  const [t, n] = M.useState(void 0);
  return Ht(() => {
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
var ga = "Popper", [_l, ko] = On(ga), [tb, $l] = _l(ga), Hl = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = M.useState(null);
  return /* @__PURE__ */ m(tb, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Hl.displayName = ga;
var Wl = "PopperAnchor", zl = M.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = $l(Wl, n), i = M.useRef(null), a = Ie(t, i), c = M.useRef(null);
    return M.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ m(Re.div, { ...o, ref: a });
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
      collisionPadding: d = 0,
      sticky: u = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: h,
      ...g
    } = e, y = $l(ya, n), [v, b] = M.useState(null), x = Ie(t, (Y) => b(Y)), [S, w] = M.useState(null), k = eb(S), D = k?.width ?? 0, C = k?.height ?? 0, T = r + (s !== "center" ? "-" + s : ""), E = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, N = Array.isArray(l) ? l : [l], A = N.length > 0, P = {
      padding: E,
      boundary: N.filter(sb),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: O, floatingStyles: _, placement: z, isPositioned: G, middlewareData: I } = Uv({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: T,
      whileElementsMounted: (...Y) => Iv(...Y, {
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
          limiter: u === "partial" ? Kv() : void 0,
          ...P
        }),
        c && Gv({ ...P }),
        qv({
          ...P,
          apply: ({ elements: Y, rects: J, availableWidth: de, availableHeight: fe }) => {
            const { width: xe, height: De } = J.reference, Ve = Y.floating.style;
            Ve.setProperty("--radix-popper-available-width", `${de}px`), Ve.setProperty("--radix-popper-available-height", `${fe}px`), Ve.setProperty("--radix-popper-anchor-width", `${xe}px`), Ve.setProperty("--radix-popper-anchor-height", `${De}px`);
          }
        }),
        S && Zv({ element: S, padding: a }),
        ab({ arrowWidth: D, arrowHeight: C }),
        f && Xv({ strategy: "referenceHidden", ...P })
      ]
    }), [L, B] = Yl(z), q = Mt(h);
    Ht(() => {
      G && q?.();
    }, [G, q]);
    const K = I.arrow?.x, X = I.arrow?.y, ee = I.arrow?.centerOffset !== 0, [$, W] = M.useState();
    return Ht(() => {
      v && W(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ m(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ..._,
          transform: G ? _.transform : "translate(0, -200%)",
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
            arrowX: K,
            arrowY: X,
            shouldHideArrow: ee,
            children: /* @__PURE__ */ m(
              Re.div,
              {
                "data-side": L,
                "data-align": B,
                ...g,
                ref: x,
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
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, d] = Yl(n), u = { start: "0%", center: "50%", end: "100%" }[d], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let h = "", g = "";
    return l === "bottom" ? (h = i ? u : `${f}px`, g = `${-c}px`) : l === "top" ? (h = i ? u : `${f}px`, g = `${r.floating.height + c}px`) : l === "right" ? (h = `${-c}px`, g = i ? u : `${p}px`) : l === "left" && (h = `${r.floating.width + c}px`, g = i ? u : `${p}px`), { data: { x: h, y: g } };
  }
});
function Yl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var jl = Hl, Vl = zl, Kl = Bl, Gl = Ul, ib = "Portal", va = M.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = M.useState(!1);
  Ht(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? Hu.createPortal(/* @__PURE__ */ m(Re.div, { ...r, ref: t }), i) : null;
});
va.displayName = ib;
function cb(e, t) {
  return M.useReducer((n, r) => t[n][r] ?? n, e);
}
var Jt = (e) => {
  const { present: t, children: n } = e, r = lb(t), o = typeof n == "function" ? n({ present: r.isPresent }) : M.Children.only(n), s = Ie(r.ref, db(o));
  return typeof n == "function" || r.isPresent ? M.cloneElement(o, { ref: s }) : null;
};
Jt.displayName = "Presence";
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
  }, [a]), Ht(() => {
    const l = r.current, d = o.current;
    if (d !== e) {
      const f = s.current, p = Lr(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(d && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Ht(() => {
    if (t) {
      let l;
      const d = t.ownerDocument.defaultView ?? window, u = (p) => {
        const g = Lr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Lr(r.current));
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
function Lr(e) {
  return e?.animationName || "none";
}
function db(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ts = "rovingFocusGroup.onEntryFocus", ub = { bubbles: !1, cancelable: !0 }, mr = "RovingFocusGroup", [Ss, ql, fb] = vl(mr), [mb, Xl] = On(
  mr,
  [fb]
), [pb, hb] = mb(mr), Zl = M.forwardRef(
  (e, t) => /* @__PURE__ */ m(Ss.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(Ss.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(gb, { ...e, ref: t }) }) })
);
Zl.displayName = mr;
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
    preventScrollOnEntryFocus: d = !1,
    ...u
  } = e, f = M.useRef(null), p = Ie(t, f), h = bl(s), [g, y] = ca({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: mr
  }), [v, b] = M.useState(!1), x = Mt(l), S = ql(n), w = M.useRef(!1), [k, D] = M.useState(0);
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
        Re.div,
        {
          tabIndex: v || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: ce(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: ce(e.onFocus, (C) => {
            const T = !w.current;
            if (C.target === C.currentTarget && T && !v) {
              const E = new CustomEvent(ts, ub);
              if (C.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
                const N = S().filter((z) => z.focusable), A = N.find((z) => z.active), P = N.find((z) => z.id === g), _ = [A, P, ...N].filter(
                  Boolean
                ).map((z) => z.ref.current);
                ed(_, d);
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
    } = e, c = Zr(), l = s || c, d = hb(Ql, n), u = d.currentTabStopId === l, f = ql(n), { onFocusableItemAdd: p, onFocusableItemRemove: h, currentTabStopId: g } = d;
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
              const v = bb(y, d.orientation, d.dir);
              if (v !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let x = f().filter((S) => S.focusable).map((S) => S.ref.current);
                if (v === "last") x.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && x.reverse();
                  const S = x.indexOf(y.currentTarget);
                  x = d.loop ? wb(x, S + 1) : x.slice(S + 1);
                }
                setTimeout(() => ed(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: u, hasTabStop: g != null }) : i
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
function ed(e, t = !1) {
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
}, dn = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Pr = {}, ns = 0, td = function(e) {
  return e && (e.host || td(e.parentNode));
}, Mb = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = td(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Sb = function(e, t, n, r) {
  var o = Mb(t, Array.isArray(e) ? e : [e]);
  Pr[n] || (Pr[n] = /* @__PURE__ */ new WeakMap());
  var s = Pr[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(u) {
    !u || a.has(u) || (a.add(u), l(u.parentNode));
  };
  o.forEach(l);
  var d = function(u) {
    !u || c.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (a.has(f))
        d(f);
      else
        try {
          var p = f.getAttribute(r), h = p !== null && p !== "false", g = (dn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          dn.set(f, g), s.set(f, y), i.push(f), g === 1 && h && Ir.set(f, !0), y === 1 && f.setAttribute(n, "true"), h || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return d(t), a.clear(), ns++, function() {
    i.forEach(function(u) {
      var f = dn.get(u) - 1, p = s.get(u) - 1;
      dn.set(u, f), s.set(u, p), f || (Ir.has(u) || u.removeAttribute(r), Ir.delete(u)), p || u.removeAttribute(n);
    }), ns--, ns || (dn = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Pr = {});
  };
}, Tb = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Cb(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Sb(r, o, n, "aria-hidden")) : function() {
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
function nd(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Eb(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Kr = "right-scroll-bar-position", Gr = "width-before-scroll-bar", Db = "with-scroll-bars-hidden", Nb = "--removed-body-scroll-bar-size";
function rs(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ab(e, t) {
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
function Ob(e) {
  e === void 0 && (e = {});
  var t = Pb(null);
  return t.options = st({ async: !0, ssr: !1 }, e), t;
}
var rd = function(e) {
  var t = e.sideCar, n = nd(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return M.createElement(r, st({}, n));
};
rd.isSideCarExport = !0;
function _b(e, t) {
  return e.useMedium(t), rd;
}
var od = Ob(), os = function() {
}, Co = M.forwardRef(function(e, t) {
  var n = M.useRef(null), r = M.useState({
    onScrollCapture: os,
    onWheelCapture: os,
    onTouchMoveCapture: os
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, u = e.shards, f = e.sideCar, p = e.noRelative, h = e.noIsolation, g = e.inert, y = e.allowPinchZoom, v = e.as, b = v === void 0 ? "div" : v, x = e.gapMode, S = nd(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, k = Lb([n, t]), D = st(st({}, S), o);
  return M.createElement(
    M.Fragment,
    null,
    d && M.createElement(w, { sideCar: od, removeScrollBar: l, shards: u, noRelative: p, noIsolation: h, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: x }),
    i ? M.cloneElement(M.Children.only(a), st(st({}, D), { ref: k })) : M.createElement(b, st({}, D, { className: c, ref: k }), a)
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
}, sd = function() {
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
}, Vb = sd(), xn = "data-scroll-locked", Kb = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Db, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(xn, `] {
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
  
  body[`).concat(xn, `] {
    `).concat(Nb, ": ").concat(a, `px;
  }
`);
}, Ui = function() {
  var e = parseInt(document.body.getAttribute(xn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Gb = function() {
  M.useEffect(function() {
    return document.body.setAttribute(xn, (Ui() + 1).toString()), function() {
      var e = Ui() - 1;
      e <= 0 ? document.body.removeAttribute(xn) : document.body.setAttribute(xn, e.toString());
    };
  }, []);
}, qb = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Gb();
  var s = M.useMemo(function() {
    return jb(o);
  }, [o]);
  return M.createElement(Vb, { styles: Kb(s, !t, o, n ? "" : "!important") });
}, Ts = !1;
if (typeof window < "u")
  try {
    var Or = Object.defineProperty({}, "passive", {
      get: function() {
        return Ts = !0, !0;
      }
    });
    window.addEventListener("test", Or, Or), window.removeEventListener("test", Or, Or);
  } catch {
    Ts = !1;
  }
var un = Ts ? { passive: !1 } : !1, Xb = function(e) {
  return e.tagName === "TEXTAREA";
}, ad = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Xb(e) && n[t] === "visible")
  );
}, Zb = function(e) {
  return ad(e, "overflowY");
}, Qb = function(e) {
  return ad(e, "overflowX");
}, Yi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = id(e, r);
    if (o) {
      var s = cd(e, r), i = s[1], a = s[2];
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
}, id = function(e, t) {
  return e === "v" ? Zb(t) : Qb(t);
}, cd = function(e, t) {
  return e === "v" ? Jb(t) : ew(t);
}, tw = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, nw = function(e, t, n, r, o) {
  var s = tw(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, d = i > 0, u = 0, f = 0;
  do {
    if (!a)
      break;
    var p = cd(e, a), h = p[0], g = p[1], y = p[2], v = g - y - s * h;
    (h || v) && id(e, a) && (u += v, f += h);
    var b = a.parentNode;
    a = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(f) < 1) && (l = !0), l;
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
}, sw = 0, fn = [];
function aw(e) {
  var t = M.useRef([]), n = M.useRef([0, 0]), r = M.useRef(), o = M.useState(sw++)[0], s = M.useState(sd)[0], i = M.useRef(e);
  M.useEffect(function() {
    i.current = e;
  }, [e]), M.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Eb([e.lockRef.current], (e.shards || []).map(Vi), !0).filter(Boolean);
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
    var T = r.current || w;
    return nw(T, y, g, T === "h" ? x : S);
  }, []), c = M.useCallback(function(g) {
    var y = g;
    if (!(!fn.length || fn[fn.length - 1] !== s)) {
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
  }, []), d = M.useCallback(function(g) {
    n.current = _r(g), r.current = void 0;
  }, []), u = M.useCallback(function(g) {
    l(g.type, ji(g), g.target, a(g, e.lockRef.current));
  }, []), f = M.useCallback(function(g) {
    l(g.type, _r(g), g.target, a(g, e.lockRef.current));
  }, []);
  M.useEffect(function() {
    return fn.push(s), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, un), document.addEventListener("touchmove", c, un), document.addEventListener("touchstart", d, un), function() {
      fn = fn.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", c, un), document.removeEventListener("touchmove", c, un), document.removeEventListener("touchstart", d, un);
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
const cw = _b(od, aw);
var ld = M.forwardRef(function(e, t) {
  return M.createElement(Co, st({}, e, { ref: t, sideCar: cw }));
});
ld.classNames = Co.classNames;
var Es = ["Enter", " "], lw = ["ArrowDown", "PageUp", "Home"], dd = ["ArrowUp", "PageDown", "End"], dw = [...lw, ...dd], uw = {
  ltr: [...Es, "ArrowRight"],
  rtl: [...Es, "ArrowLeft"]
}, fw = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, pr = "Menu", [ar, mw, pw] = vl(pr), [en, ud] = On(pr, [
  pw,
  ko,
  Xl
]), Mo = ko(), fd = Xl(), [hw, tn] = en(pr), [gw, hr] = en(pr), md = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = Mo(t), [c, l] = M.useState(null), d = M.useRef(!1), u = Mt(s), f = bl(o);
  return M.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(jl, { ...a, children: /* @__PURE__ */ m(
    hw,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ m(
        gw,
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
md.displayName = pr;
var yw = "MenuAnchor", ba = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Mo(n);
    return /* @__PURE__ */ m(Vl, { ...o, ...r, ref: t });
  }
);
ba.displayName = yw;
var wa = "MenuPortal", [vw, pd] = en(wa, {
  forceMount: void 0
}), hd = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = tn(wa, t);
  return /* @__PURE__ */ m(vw, { scope: t, forceMount: n, children: /* @__PURE__ */ m(Jt, { present: n || s.open, children: /* @__PURE__ */ m(va, { asChild: !0, container: o, children: r }) }) });
};
hd.displayName = wa;
var qe = "MenuContent", [bw, xa] = en(qe), gd = M.forwardRef(
  (e, t) => {
    const n = pd(qe, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = tn(qe, e.__scopeMenu), i = hr(qe, e.__scopeMenu);
    return /* @__PURE__ */ m(ar.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(Jt, { present: r || s.open, children: /* @__PURE__ */ m(ar.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ m(ww, { ...o, ref: t }) : /* @__PURE__ */ m(xw, { ...o, ref: t }) }) }) });
  }
), ww = M.forwardRef(
  (e, t) => {
    const n = tn(qe, e.__scopeMenu), r = M.useRef(null), o = Ie(t, r);
    return M.useEffect(() => {
      const s = r.current;
      if (s) return Tb(s);
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
  const n = tn(qe, e.__scopeMenu);
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
}), kw = /* @__PURE__ */ rr("MenuContent.ScrollLock"), ka = M.forwardRef(
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
      disableOutsideScroll: h,
      ...g
    } = e, y = tn(qe, n), v = hr(qe, n), b = Mo(n), x = fd(n), S = mw(n), [w, k] = M.useState(null), D = M.useRef(null), C = Ie(t, D, y.onContentChange), T = M.useRef(0), E = M.useRef(""), N = M.useRef(0), A = M.useRef(null), P = M.useRef("right"), O = M.useRef(0), _ = h ? ld : M.Fragment, z = h ? { as: kw, allowPinchZoom: !0 } : void 0, G = (L) => {
      const B = E.current + L, q = S().filter((Y) => !Y.disabled), K = document.activeElement, X = q.find((Y) => Y.ref.current === K)?.textValue, ee = q.map((Y) => Y.textValue), $ = Pw(ee, B, X), W = q.find((Y) => Y.textValue === $)?.ref.current;
      (function Y(J) {
        E.current = J, window.clearTimeout(T.current), J !== "" && (T.current = window.setTimeout(() => Y(""), 1e3));
      })(B), W && setTimeout(() => W.focus());
    };
    M.useEffect(() => () => window.clearTimeout(T.current), []), Ly();
    const I = M.useCallback((L) => P.current === A.current?.side && _w(L, A.current?.area), []);
    return /* @__PURE__ */ m(
      bw,
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
        children: /* @__PURE__ */ m(_, { ...z, children: /* @__PURE__ */ m(
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
                onPointerDownOutside: d,
                onFocusOutside: u,
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
                        "data-state": Ld(y.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...b,
                        ...g,
                        ref: C,
                        style: { outline: "none", ...g.style },
                        onKeyDown: ce(g.onKeyDown, (L) => {
                          const q = L.target.closest("[data-radix-menu-content]") === L.currentTarget, K = L.ctrlKey || L.altKey || L.metaKey, X = L.key.length === 1;
                          q && (L.key === "Tab" && L.preventDefault(), !K && X && G(L.key));
                          const ee = D.current;
                          if (L.target !== ee || !dw.includes(L.key)) return;
                          L.preventDefault();
                          const W = S().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
                          dd.includes(L.key) && W.reverse(), Lw(W);
                        }),
                        onBlur: ce(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(T.current), E.current = "");
                        }),
                        onPointerMove: ce(
                          e.onPointerMove,
                          ir((L) => {
                            const B = L.target, q = O.current !== L.clientX;
                            if (L.currentTarget.contains(B) && q) {
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
gd.displayName = qe;
var Cw = "MenuGroup", Ca = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Re.div, { role: "group", ...r, ref: t });
  }
);
Ca.displayName = Cw;
var Mw = "MenuLabel", yd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Re.div, { ...r, ref: t });
  }
);
yd.displayName = Mw;
var no = "MenuItem", Ki = "menu.itemSelect", So = M.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = M.useRef(null), i = hr(no, e.__scopeMenu), a = xa(no, e.__scopeMenu), c = Ie(t, s), l = M.useRef(!1), d = () => {
      const u = s.current;
      if (!n && u) {
        const f = new CustomEvent(Ki, { bubbles: !0, cancelable: !0 });
        u.addEventListener(Ki, (p) => r?.(p), { once: !0 }), yl(u, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ m(
      vd,
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
          n || f && u.key === " " || Es.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
So.displayName = no;
var vd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = xa(no, n), a = fd(n), c = M.useRef(null), l = Ie(t, c), [d, u] = M.useState(!1), [f, p] = M.useState("");
    return M.useEffect(() => {
      const h = c.current;
      h && p((h.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ m(
      ar.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ m(kb, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ m(
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
              ir((h) => {
                r ? i.onItemLeave(h) : (i.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ce(
              e.onPointerLeave,
              ir((h) => i.onItemLeave(h))
            ),
            onFocus: ce(e.onFocus, () => u(!0)),
            onBlur: ce(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), Sw = "MenuCheckboxItem", bd = M.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(Md, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
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
bd.displayName = Sw;
var wd = "MenuRadioGroup", [Tw, Ew] = en(
  wd,
  { value: void 0, onValueChange: () => {
  } }
), xd = M.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = Mt(r);
    return /* @__PURE__ */ m(Tw, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ m(Ca, { ...o, ref: t }) });
  }
);
xd.displayName = wd;
var kd = "MenuRadioItem", Cd = M.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Ew(kd, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ m(Md, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ m(
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
Cd.displayName = kd;
var Ma = "MenuItemIndicator", [Md, Dw] = en(
  Ma,
  { checked: !1 }
), Sd = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = Dw(Ma, n);
    return /* @__PURE__ */ m(
      Jt,
      {
        present: r || ro(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ m(
          Re.span,
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
Sd.displayName = Ma;
var Nw = "MenuSeparator", Td = M.forwardRef(
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
Td.displayName = Nw;
var Aw = "MenuArrow", Ed = M.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Mo(n);
    return /* @__PURE__ */ m(Gl, { ...o, ...r, ref: t });
  }
);
Ed.displayName = Aw;
var Rw = "MenuSub", [sC, Dd] = en(Rw), qn = "MenuSubTrigger", Nd = M.forwardRef(
  (e, t) => {
    const n = tn(qn, e.__scopeMenu), r = hr(qn, e.__scopeMenu), o = Dd(qn, e.__scopeMenu), s = xa(qn, e.__scopeMenu), i = M.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, d = M.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return M.useEffect(() => d, [d]), M.useEffect(() => {
      const u = a.current;
      return () => {
        window.clearTimeout(u), c(null);
      };
    }, [a, c]), /* @__PURE__ */ m(ba, { asChild: !0, ...l, children: /* @__PURE__ */ m(
      vd,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Ld(n.open),
        ...e,
        ref: go(t, o.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ce(
          e.onPointerMove,
          ir((u) => {
            s.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: ce(
          e.onPointerLeave,
          ir((u) => {
            d();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, h = p === "right", g = h ? -5 : 5, y = f[h ? "left" : "right"], v = f[h ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: u.clientX + g, y: u.clientY },
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
              if (s.onTriggerLeave(u), u.defaultPrevented) return;
              s.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: ce(e.onKeyDown, (u) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && u.key === " " || uw[r.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Nd.displayName = qn;
var Ad = "MenuSubContent", Rd = M.forwardRef(
  (e, t) => {
    const n = pd(qe, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = tn(qe, e.__scopeMenu), i = hr(qe, e.__scopeMenu), a = Dd(Ad, e.__scopeMenu), c = M.useRef(null), l = Ie(t, c);
    return /* @__PURE__ */ m(ar.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(Jt, { present: r || s.open, children: /* @__PURE__ */ m(ar.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
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
          const u = d.currentTarget.contains(d.target), f = fw[i.dir].includes(d.key);
          u && f && (s.onOpenChange(!1), a.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
Rd.displayName = Ad;
function Ld(e) {
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
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
  }
  return o;
}
function _w(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Ow(n, t);
}
function ir(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var $w = md, Hw = ba, Ww = hd, zw = gd, Bw = Ca, Fw = yd, Uw = So, Yw = bd, jw = xd, Vw = Cd, Kw = Sd, Gw = Td, qw = Ed, Xw = Nd, Zw = Rd, To = "DropdownMenu", [Qw] = On(
  To,
  [ud]
), $e = ud(), [Jw, Id] = Qw(To), Pd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = $e(t), l = M.useRef(null), [d, u] = ca({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: To
  });
  return /* @__PURE__ */ m(
    Jw,
    {
      scope: t,
      triggerId: Zr(),
      triggerRef: l,
      contentId: Zr(),
      open: d,
      onOpenChange: u,
      onOpenToggle: M.useCallback(() => u((f) => !f), [u]),
      modal: a,
      children: /* @__PURE__ */ m($w, { ...c, open: d, onOpenChange: u, dir: r, modal: a, children: n })
    }
  );
};
Pd.displayName = To;
var Od = "DropdownMenuTrigger", _d = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = Id(Od, n), i = $e(n);
    return /* @__PURE__ */ m(Hw, { asChild: !0, ...i, children: /* @__PURE__ */ m(
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
_d.displayName = Od;
var e0 = "DropdownMenuPortal", $d = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = $e(t);
  return /* @__PURE__ */ m(Ww, { ...r, ...n });
};
$d.displayName = e0;
var Hd = "DropdownMenuContent", Wd = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Id(Hd, n), s = $e(n), i = M.useRef(!1);
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
Wd.displayName = Hd;
var t0 = "DropdownMenuGroup", n0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(Bw, { ...o, ...r, ref: t });
  }
);
n0.displayName = t0;
var r0 = "DropdownMenuLabel", o0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(Fw, { ...o, ...r, ref: t });
  }
);
o0.displayName = r0;
var s0 = "DropdownMenuItem", zd = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(Uw, { ...o, ...r, ref: t });
  }
);
zd.displayName = s0;
var a0 = "DropdownMenuCheckboxItem", i0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(Yw, { ...o, ...r, ref: t });
});
i0.displayName = a0;
var c0 = "DropdownMenuRadioGroup", l0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(jw, { ...o, ...r, ref: t });
});
l0.displayName = c0;
var d0 = "DropdownMenuRadioItem", u0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(Vw, { ...o, ...r, ref: t });
});
u0.displayName = d0;
var f0 = "DropdownMenuItemIndicator", m0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(Kw, { ...o, ...r, ref: t });
});
m0.displayName = f0;
var p0 = "DropdownMenuSeparator", Bd = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(Gw, { ...o, ...r, ref: t });
});
Bd.displayName = p0;
var h0 = "DropdownMenuArrow", g0 = M.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(qw, { ...o, ...r, ref: t });
  }
);
g0.displayName = h0;
var y0 = "DropdownMenuSubTrigger", v0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(Xw, { ...o, ...r, ref: t });
});
v0.displayName = y0;
var b0 = "DropdownMenuSubContent", w0 = M.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
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
var x0 = Pd, k0 = _d, C0 = $d, M0 = Wd, S0 = zd, T0 = Bd;
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
function ke({
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
    T0,
    {
      "data-slot": "dropdown-menu-separator",
      className: ie("bg-border -mx-1 my-1 h-px", e),
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
}), D0 = "VisuallyHidden", Fd = M.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    Re.span,
    {
      ...e,
      ref: t,
      style: { ...E0, ...e.style }
    }
  )
);
Fd.displayName = D0;
var N0 = Fd, [Eo] = On("Tooltip", [
  ko
]), Do = ko(), Ud = "TooltipProvider", A0 = 700, Ds = "tooltip.open", [R0, Ta] = Eo(Ud), Yd = (e) => {
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
Yd.displayName = Ud;
var cr = "Tooltip", [L0, gr] = Eo(cr), jd = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = Ta(cr, e.__scopeTooltip), l = Do(t), [d, u] = M.useState(null), f = Zr(), p = M.useRef(0), h = i ?? c.disableHoverableContent, g = a ?? c.delayDuration, y = M.useRef(!1), [v, b] = ca({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Ds))) : c.onClose(), s?.(D);
    },
    caller: cr
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
      trigger: d,
      onTriggerChange: u,
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
jd.displayName = cr;
var Ns = "TooltipTrigger", Vd = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = gr(Ns, n), s = Ta(Ns, n), i = Do(n), a = M.useRef(null), c = Ie(t, a, o.onTriggerChange), l = M.useRef(!1), d = M.useRef(!1), u = M.useCallback(() => l.current = !1, []);
    return M.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ m(Vl, { asChild: !0, ...i, children: /* @__PURE__ */ m(
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
Vd.displayName = Ns;
var Ea = "TooltipPortal", [I0, P0] = Eo(Ea, {
  forceMount: void 0
}), Kd = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = gr(Ea, t);
  return /* @__PURE__ */ m(I0, { scope: t, forceMount: n, children: /* @__PURE__ */ m(Jt, { present: n || s.open, children: /* @__PURE__ */ m(va, { asChild: !0, container: o, children: r }) }) });
};
Kd.displayName = Ea;
var En = "TooltipContent", Gd = M.forwardRef(
  (e, t) => {
    const n = P0(En, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = gr(En, e.__scopeTooltip);
    return /* @__PURE__ */ m(Jt, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ m(qd, { side: o, ...s, ref: t }) : /* @__PURE__ */ m(O0, { side: o, ...s, ref: t }) });
  }
), O0 = M.forwardRef((e, t) => {
  const n = gr(En, e.__scopeTooltip), r = Ta(En, e.__scopeTooltip), o = M.useRef(null), s = Ie(t, o), [i, a] = M.useState(null), { trigger: c, onClose: l } = n, d = o.current, { onPointerInTransitChange: u } = r, f = M.useCallback(() => {
    a(null), u(!1);
  }, [u]), p = M.useCallback(
    (h, g) => {
      const y = h.currentTarget, v = { x: h.clientX, y: h.clientY }, b = W0(v, y.getBoundingClientRect()), x = z0(v, b), S = B0(g.getBoundingClientRect()), w = U0([...x, ...S]);
      a(w), u(!0);
    },
    [u]
  );
  return M.useEffect(() => () => f(), [f]), M.useEffect(() => {
    if (c && d) {
      const h = (y) => p(y, d), g = (y) => p(y, c);
      return c.addEventListener("pointerleave", h), d.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", h), d.removeEventListener("pointerleave", g);
      };
    }
  }, [c, d, p, f]), M.useEffect(() => {
    if (i) {
      const h = (g) => {
        const y = g.target, v = { x: g.clientX, y: g.clientY }, b = c?.contains(y) || d?.contains(y), x = !F0(v, i);
        b ? f() : x && (f(), l());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [c, d, i, l, f]), /* @__PURE__ */ m(qd, { ...e, ref: s });
}), [_0, $0] = Eo(cr, { isInside: !1 }), H0 = /* @__PURE__ */ Ug("TooltipContent"), qd = M.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = gr(En, n), l = Do(n), { onClose: d } = c;
    return M.useEffect(() => (document.addEventListener(Ds, d), () => document.removeEventListener(Ds, d)), [d]), M.useEffect(() => {
      if (c.trigger) {
        const u = (f) => {
          f.target?.contains(c.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [c.trigger, d]), /* @__PURE__ */ m(
      la,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
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
Gd.displayName = En;
var Xd = "TooltipArrow", Zd = M.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Do(n);
    return $0(
      Xd,
      n
    ).isInside ? null : /* @__PURE__ */ m(Gl, { ...o, ...r, ref: t });
  }
);
Zd.displayName = Xd;
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
    const a = t[s], c = t[i], l = a.x, d = a.y, u = c.x, f = c.y;
    d > r != f > r && n < (u - l) * (r - d) / (f - d) + l && (o = !o);
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
var j0 = Yd, V0 = jd, K0 = Vd, G0 = Kd, q0 = Gd, X0 = Zd;
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
const Ce = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
}, mn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Q0 = Dn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = V(null), [l, d] = j(!1), [u, f] = j(void 0), p = dc({
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
  }), h = F(() => {
    const { view: k } = t, { from: D } = k.state.selection, C = k.coordsAtPos(D);
    f({ top: C.bottom + 8, left: C.left }), d(!0);
  }, [t]), g = F((k, D) => {
    t.chain().focus().setImage({ src: k, alt: D }).run(), d(!1);
  }, [t]), y = F(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = F((k) => {
    t.chain().focus().insertCallout({ type: k }).run();
  }, [t]), b = V(/* @__PURE__ */ new Map()), x = V(/* @__PURE__ */ new Map()), S = F((k) => {
    const { doc: D, tr: C } = k.state;
    let T = !1;
    const E = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    b.current.clear(), N.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((z) => {
        const G = z, I = (G.textContent || "").trim().substring(0, 50);
        b.current.set(`${O}-${I}`, G.getBoundingClientRect());
      });
    });
    const A = [];
    D.descendants((P, O, _, z) => {
      if (!E.has(P.type.name)) return !0;
      let G = !1;
      if (P.forEach((L) => {
        L.type.name === "taskItem" && (G = !0);
      }), !G) return !0;
      let I = 0;
      return D.nodesBetween(0, O, (L) => (E.has(L.type.name) && I++, !0)), A.push({ node: P, pos: O, depth: I }), !0;
    }), A.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of A) {
      const _ = [];
      let z = 0;
      P.forEach(($) => {
        _.push({
          node: $,
          isTask: $.type.name === "taskItem",
          checked: $.type.name === "taskItem" && $.attrs.checked === !0,
          originalIndex: z++
        });
      });
      const G = _.filter(($) => $.isTask && !$.checked), I = _.filter(($) => $.isTask && $.checked), L = [..._], B = _.map(($, W) => ({ index: W, isTask: $.isTask })).filter(($) => $.isTask).map(($) => $.index), q = [...G, ...I];
      if (B.forEach(($, W) => {
        L[$] = q[W];
      }), !L.some(($, W) => $.node !== _[W].node)) continue;
      const X = P.type.create(
        P.attrs,
        L.map(($) => $.node)
      ), ee = C.mapping.map(O);
      C.replaceWith(ee, ee + P.nodeSize, X), T = !0;
    }
    T && (k.view.dispatch(C), requestAnimationFrame(() => {
      k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const _ = O.querySelectorAll(":scope > li"), z = /* @__PURE__ */ new Map();
        b.current.forEach((G, I) => {
          const L = I.replace(/^\d+-/, "");
          z.set(L, G);
        }), _.forEach((G) => {
          const I = G, L = (I.textContent || "").trim().substring(0, 50), B = z.get(L);
          if (!B) return;
          const q = I.getBoundingClientRect(), K = B.top - q.top;
          if (Math.abs(K) < 2) return;
          I.style.transform = `translateY(${K}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
          const X = () => {
            I.style.transform = "", I.style.transition = "", I.style.zIndex = "", I.removeEventListener("transitionend", X);
          };
          I.addEventListener("transitionend", X), setTimeout(X, 400);
        });
      });
    }));
  }, []);
  Z(() => {
    if (!s || !t) return;
    const k = /* @__PURE__ */ new Map();
    t.state.doc.descendants((C, T) => (C.type.name === "taskItem" && k.set(T, C.attrs.checked === !0), !0)), x.current = k;
    const D = ({ transaction: C }) => {
      if (!C.docChanged) return;
      const T = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, P) => (A.type.name === "taskItem" && T.set(P, A.attrs.checked === !0), !0));
      const E = x.current;
      let N = !1;
      if (E.size > 0 && T.size > 0) {
        let A = 0, P = 0;
        E.forEach((O) => {
          O && A++;
        }), T.forEach((O) => {
          O && P++;
        }), A !== P && (N = !0);
      }
      x.current = T, N && setTimeout(() => {
        S(t);
      }, 150);
    };
    return t.on("transaction", D), () => {
      t.off("transaction", D);
    };
  }, [t, s, S]);
  const w = F(() => {
    S(t);
  }, [t, S]);
  return /* @__PURE__ */ R("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Qu, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Ju, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(mn, {}),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Ws, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Bs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Fs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(pc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(hc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(Us, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(mn, {}),
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
            /* @__PURE__ */ m($t, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ R(cs, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ R(
          ke,
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
          ke,
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
          ke,
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
          ke,
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
          ke,
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
          ke,
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
    /* @__PURE__ */ m(mn, {}),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(js, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(Vs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(Ks, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(yc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
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
      Ce,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(tf, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(mn, {}),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(ps, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: h,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(Gs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      Ce,
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
        /* @__PURE__ */ R(ke, { onClick: () => v("info"), children: [
          /* @__PURE__ */ m(Xr, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ R(ke, { onClick: () => v("note"), children: [
          /* @__PURE__ */ m(qs, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ R(ke, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ m(nf, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ R(ke, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ m(rf, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ R(ke, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ m(Xs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ R(as, { children: [
      /* @__PURE__ */ m(is, { asChild: !0, children: /* @__PURE__ */ R(
        _t,
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
          ke,
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
          ke,
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
          ke,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(gn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ m(ls, {}),
        /* @__PURE__ */ R(
          ke,
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
          ke,
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
          ke,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(gn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ m(ls, {}),
        /* @__PURE__ */ R(
          ke,
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
          ke,
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
          ke,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(gn, { size: 16, className: "mr-2" }),
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
        onClose: () => d(!1),
        onInsert: g,
        position: u
      }
    ),
    /* @__PURE__ */ m(mn, {}),
    /* @__PURE__ */ m(
      Ce,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(of, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ R(Ee, { children: [
      /* @__PURE__ */ m(mn, {}),
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
        _t,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(An, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ m(Ls, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function J0({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [d, u] = j(""), [f, p] = j(""), [h, g] = j(!1), [y, v] = j(!1), [b, x] = j(!1), [S, w] = j(!1), [k, D] = j([]), [C, T] = j(0), [E, N] = j(null), [A, P] = j(!1), O = V(!1), _ = V(null), z = V(null), G = V(!1);
  Z(() => {
    t && o && o.trim() && u(o);
  }, [t, o, r]);
  const I = F(() => {
    if (!d || !e) {
      D([]), T(0), N(null);
      return;
    }
    const $ = [];
    let W;
    try {
      if (y)
        W = new RegExp(d, h ? "g" : "gi");
      else {
        let Y = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        b && (Y = `\\b${Y}\\b`), W = new RegExp(Y, h ? "g" : "gi");
      }
      N(null);
    } catch (Y) {
      N(Y.message), D([]);
      return;
    }
    if (l) {
      let Y;
      for (; (Y = W.exec(i)) !== null; )
        $.push({
          from: Y.index,
          to: Y.index + Y[0].length,
          text: Y[0]
        });
    } else {
      const { doc: Y } = e.state;
      Y.descendants((J, de) => {
        if (J.isText && J.text) {
          let fe;
          for (; (fe = W.exec(J.text)) !== null; )
            $.push({
              from: de + fe.index,
              to: de + fe.index + fe[0].length,
              text: fe[0]
            });
        }
        return !0;
      });
    }
    D($), $.length > 0 && C >= $.length && T(0);
  }, [d, h, y, b, e, C, l, i]);
  Z(() => {
    I();
  }, [I]), Z(() => {
    l && c && (t && k.length > 0 ? c(k, C) : c([], 0));
  }, [l, t, k, C, c]), Z(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const $ = typeof e.commands.setSearchHighlight == "function";
    t && d && $ ? e.commands.setSearchHighlight({
      searchTerm: d,
      caseSensitive: h,
      useRegex: y,
      currentMatchIndex: C
    }) : $ && e.commands.clearSearchHighlight();
  }, [e, t, d, h, y, C, l, k, i]), Z(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), Z(() => {
    if (k.length > 0 && C < k.length) {
      const $ = k[C];
      if (l) {
        const Y = document.querySelector(".syntax-textarea");
        if (Y && G.current) {
          const J = parseInt(getComputedStyle(Y).lineHeight) || 22, fe = i.substring(0, $.from).split(`
`).length;
          Y.scrollTop = Math.max(0, (fe - 3) * J);
        }
        G.current && (G.current = !1);
        return;
      }
      const W = e.view.domAtPos($.from);
      W.node && W.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), G.current && (G.current = !1);
    }
  }, [C, k, e, l, i]), Z(() => {
    t && _.current && (_.current.focus(), _.current.select());
  }, [t, r]);
  const L = F(() => {
    k.length !== 0 && (G.current = !0, T(($) => ($ + 1) % k.length));
  }, [k.length]), B = F(() => {
    k.length !== 0 && (G.current = !0, T(($) => ($ - 1 + k.length) % k.length));
  }, [k.length]), q = F(() => {
    if (k.length === 0 || C >= k.length) return;
    const $ = k[C];
    if (l && a) {
      const W = i.substring(0, $.from) + f + i.substring($.to);
      a(W), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [k, C, f, e, I, l, i, a]), K = F(() => {
    if (k.length === 0) return;
    if (l && a) {
      const W = [...k].sort((J, de) => de.from - J.from);
      let Y = i;
      W.forEach((J) => {
        Y = Y.substring(0, J.from) + f + Y.substring(J.to);
      }), a(Y), setTimeout(I, 10);
      return;
    }
    const $ = [...k].sort((W, Y) => Y.from - W.from);
    e.chain().focus(), $.forEach((W) => {
      e.chain().setTextSelection({ from: W.from, to: W.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [k, f, e, I, l, i, a]), X = F(() => {
    if (k.length === 0 || !d || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: d,
      caseSensitive: h,
      useRegex: y,
      wholeWord: b
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [k, d, h, y, b, e, n]), ee = F(($) => {
    $.key === "Enter" ? ($.preventDefault(), $.shiftKey ? B() : L(), _.current?.focus()) : $.key === "Escape" ? ($.preventDefault(), n()) : $.key === "h" && ($.ctrlKey || $.metaKey) ? ($.preventDefault(), w((W) => !W)) : $.key === "l" && ($.ctrlKey || $.metaKey) && $.shiftKey && ($.preventDefault(), X());
  }, [L, B, n, X]);
  return t ? /* @__PURE__ */ R(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: ee,
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
              onClick: B,
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
              children: /* @__PURE__ */ m($t, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: X,
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
              children: /* @__PURE__ */ m(df, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => v(($) => !$),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(uf, { size: 16 })
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
              children: /* @__PURE__ */ m(Ct, { size: 16 })
            }
          )
        ] }),
        S && /* @__PURE__ */ R("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ R("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(hs, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: z,
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
              onClick: q,
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
const ex = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), vt = ex ? "⌘" : "Ctrl", tx = ({ editor: e }) => {
  const [t, n] = j(!1), [r, o] = j(0), [s, i] = j(0), [a, c] = j(""), [l, d] = j(""), [u, f] = j(!1), [p, h] = j(!1);
  Z(() => {
    if (!e) return;
    const D = () => {
      const T = e.storage.selectAllOccurrences;
      T ? (n(T.isActive), o(T.ranges.length), i(T.allMatches.length), c(T.searchTerm), d(T.typedBuffer), f(T.isTypingReplace), h(T.isIncremental)) : (n(!1), o(0), i(0));
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
  }, [e]), x = F(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), S = F(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = F(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), k = F(() => {
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
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: u ? /* @__PURE__ */ R(Ee, { children: [
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
            title: `Select next occurrence (${vt}+D)`,
            children: /* @__PURE__ */ m(Qs, { size: 14 })
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${vt}+Shift+L)`,
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
          title: `Bold all occurrences (${vt}+B)`,
          children: /* @__PURE__ */ m(Ws, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${vt}+I)`,
          children: /* @__PURE__ */ m(zs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${vt}+U)`,
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
          children: /* @__PURE__ */ m(gn, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: S,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(Ct, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ R(Ee, { children: [
      /* @__PURE__ */ R("kbd", { children: [
        vt,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ R("kbd", { children: [
        vt,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ R("kbd", { children: [
        vt,
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
        vt,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, nx = Dn(tx), $r = "-dismissed";
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
  } = t, [a, c] = j({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = V(null), d = V(""), u = V(0);
  Z(() => {
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
  const f = F(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const v = e.getHTML(), b = rx(v);
        if (b === u.current && v.length === d.current.length) {
          c((x) => ({ ...x, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        c((x) => ({ ...x, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), d.current = v, u.current = b, c((x) => ({
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
  Z(() => {
    if (!e || !o || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", v), () => {
      e.off("update", v), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, f]), Z(() => {
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
  const p = F(() => {
    l.current && clearTimeout(l.current), f();
  }, [f]), h = F(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + $r), d.current = "", c({
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
      return v && e && !e.isDestroyed ? (c((b) => ({ ...b, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), d.current = v, localStorage.removeItem(n + $r), i?.(v);
          } catch (b) {
            console.warn("useAutoSave: Error setting content during recovery", b);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, i]), y = F(() => {
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
  } = t, [s, i] = j({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), a = V(null), c = V(""), l = F((d) => {
    const u = d.trim(), f = u.length > 0 ? u.split(/\s+/).filter((b) => b.length > 0).length : 0, p = u.replace(/\s/g, "").length, h = d.length;
    let g = 0, y = 0;
    r && (g = u.length > 0 ? u.split(/\n\s*\n/).filter((b) => b.trim().length > 0).length : 0, y = u.length > 0 ? (u.match(/[.!?]+/g) || []).length : 0);
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
  return Z(() => {
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
function ix({ status: e, lastSaved: t, className: n = "" }) {
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
          /* @__PURE__ */ m(Nn, { className: "w-3.5 h-3.5 text-emerald-500" }),
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
function cx({ onRecover: e, onDismiss: t, className: n = "" }) {
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
              children: /* @__PURE__ */ m(Ct, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
function lx(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (i) => {
    Array.from(i.querySelectorAll("ul")).forEach(o);
    const c = Array.from(i.children).filter((f) => f.tagName === "LI");
    let l = !1, d = !1;
    const u = (f) => {
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
      u(f) ? l = !0 : d = !0;
    }), l && (c.forEach((f) => {
      const p = u(f);
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
                const C = k.getAttribute("data-align") || "left", T = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[C] || "margin-right: auto;";
                D.style.cssText = T, D.appendChild(k.cloneNode(!0)), x.push(D);
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
    }), l && !d && i.setAttribute("data-type", "taskList"));
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
      let d = 0;
      const u = l;
      for (; l < t.length && s(t[l]); )
        d++, l++;
      if (d > 0 && l < t.length) {
        const f = r(c), p = r(t[l]);
        if (f !== null && p !== null) {
          for (let h = u; h < l; h++)
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
function ux(e) {
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
          const h = u.getAttribute("data-align") || "left", g = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = g[h] || "margin-right: auto;", p.appendChild(u.cloneNode(!0)), l.push(p);
        } else if (f === "P")
          if (u.querySelectorAll("img").length === 0)
            l.push(d);
          else {
            const h = Array.from(u.childNodes), g = [];
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
function fx(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function qr(e, t, n) {
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
function oo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function mx(e) {
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
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? mx(r) : r.trim() ? `<p>${oo(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${oo(e)}</p>`;
}
function px(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function hx(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", d = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, u = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
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
    return i += u, { html: i, nextIdx: a };
  }, n = Math.min(...e.map((o) => o.depth));
  return t(0, n).html;
}
function gx(e) {
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
      const d = [];
      let u = [];
      const f = () => {
        u.length !== 0 && (d.push(hx(u)), u = []);
      };
      for (const p of l) {
        const h = px(p);
        if (h) {
          if (u.length > 0) {
            const g = u[0].type;
            h.depth === 0 && h.type !== g && f();
          }
          u.push(h);
        } else
          f(), d.push(Gi(p.trim()));
      }
      return f(), `${n}${d.join("")}${o}`;
    }
  );
}
function yx(e, t, n = {}) {
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
  const d = ["info", "note", "prompt", "resources", "todo"];
  return d.forEach((f) => {
    const p = new RegExp(`\`\`\`ad-${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(p, (h, g) => {
      const y = t(g.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${y}</div>`;
    });
  }), d.forEach((f) => {
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
function vx(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = lx(t), t = ux(t), t = fx(t), t = gx(t), t;
}
function bx(e, t, n = {}) {
  const r = yx(e, t, n), o = t(r);
  return vx(o);
}
function wx({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = j(!1), [o, s] = j(0), i = F((d) => {
    d.preventDefault(), d.stopPropagation(), d.dataTransfer?.types.includes("Files") && (s((u) => u + 1), r(!0));
  }, []), a = F((d) => {
    d.preventDefault(), d.stopPropagation(), s((u) => {
      const f = u - 1;
      return f === 0 && r(!1), f;
    });
  }, []), c = F((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []), l = F((d) => {
    d.preventDefault(), d.stopPropagation(), r(!1), s(0);
  }, []);
  return Z(() => {
    if (!t || !e.current) return;
    const d = e.current;
    return d.addEventListener("dragenter", i), d.addEventListener("dragleave", a), d.addEventListener("dragover", c), d.addEventListener("drop", l), () => {
      d.removeEventListener("dragenter", i), d.removeEventListener("dragleave", a), d.removeEventListener("dragover", c), d.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ R("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(gf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ R("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
function xx({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = j(e), [c, l] = j(t), d = V(null), u = V(null);
  Z(() => {
    u.current?.focus(), u.current?.select();
  }, []), Z(() => {
    const y = (b) => {
      d.current && !d.current.contains(b.target) && s();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [s]), Z(() => {
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
      ref: d,
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
              children: /* @__PURE__ */ m(Ct, { className: "w-4 h-4" })
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
              children: /* @__PURE__ */ m(gn, { className: "w-4 h-4" })
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
                  /* @__PURE__ */ m(Nn, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(Et, { children: g });
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
    const d = a.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (d) {
      const b = d[2].toLowerCase() === "x";
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
function qt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function Wr(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return qt(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], d = i + l.length, u = t.filter((p) => p.start >= i && p.start < d);
      let f = i;
      for (const p of u)
        p.start > f && (o += qt(e.substring(f, p.start))), o += `<span class="${qi(p.type)}">${qt(p.content)}</span>`, f = p.end;
      f < d && (o += qt(e.substring(f, d))), c < s.length - 1 && (o += `
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
      p.start > f && (o += ds(e, f, p.start, null, a)), o += ds(e, p.start, p.end, qi(p.type), a), f = p.end;
    f < d && (o += ds(e, f, d, null, a)), c < s.length - 1 && (o += `
`), i = d + 1;
  }
  return o;
}
function ds(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const c = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const l = qt(e.substring(c, i)), d = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${d}">${l}</mark></span>` : s += `<mark class="${d}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = qt(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function kx({
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
  const l = V(null), d = V(null), u = V(null), f = V(null), p = 5e3, h = 80, [g, y] = j(() => {
    const C = Hr(e);
    return Wr(e, C, i, a);
  }), v = V(null), b = Zt(() => {
    if (e.length <= p) {
      const C = Hr(e), T = Wr(e, C, i, a);
      return v.current && (clearTimeout(v.current), v.current = null), T;
    }
    return null;
  }, [e, i, a]);
  Z(() => {
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
  const x = b ?? g, S = F(() => {
    const C = l.current, T = d.current, E = u.current;
    if (C) {
      const N = E?.parentElement, A = N ? N.clientHeight : 200;
      C.style.height = "auto";
      const P = Math.max(C.scrollHeight, A, 200);
      C.style.height = `${P}px`, T && (T.style.height = `${P}px`);
    }
  }, []);
  Z(() => {
    const C = l.current;
    if (!C) return;
    const T = (E) => {
      const N = C.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: A, scrollHeight: P, clientHeight: O } = N, _ = A <= 0, z = A + O >= P - 1;
      (E.deltaY > 0 && !z || E.deltaY < 0 && !_) && (E.preventDefault(), N.scrollTop += E.deltaY);
    };
    return C.addEventListener("wheel", T, { passive: !1 }), () => C.removeEventListener("wheel", T);
  }, []);
  const w = F(() => {
  }, []);
  Z(() => {
    S();
  }, [e, S]), Z(() => {
    o && l.current && l.current.focus();
  }, [o]), Z(() => {
    if (f.current && l.current) {
      const { start: C, end: T } = f.current;
      l.current.selectionStart = C, l.current.selectionEnd = T, f.current = null;
    }
  }, [e]);
  const k = F((C) => {
    const T = C.target;
    f.current = {
      start: T.selectionStart,
      end: T.selectionEnd
    }, t(T.value);
  }, [t]), D = F((C) => {
    const T = C.currentTarget, E = T.selectionStart, N = T.selectionEnd, A = T.value, P = E !== N;
    if (c) {
      if (C.key === "`" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(E, N), _ = A.substring(0, E) + "`" + O + "`" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t(_);
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
          const z = A.substring(E, N), G = A.substring(0, E) + "*" + z + "*" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t(G);
          return;
        }
        if (A[E] === "*") {
          C.preventDefault(), f.current = { start: E + 1, end: E + 1 }, t(A.substring(0, E) + A.substring(E));
          return;
        }
        C.preventDefault();
        const _ = A.substring(0, E) + "**" + A.substring(N);
        f.current = { start: E + 1, end: E + 1 }, t(_);
        return;
      }
      if (C.key === "_" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const _ = A.substring(E, N), z = A.substring(0, E) + "_" + _ + "_" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t(z);
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
          const _ = A.substring(E, N), z = A.substring(0, E) + "~" + _ + "~" + A.substring(N);
          f.current = { start: E + 1, end: N + 1 }, t(z);
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
          const O = A.substring(E, N), _ = A.substring(0, E) + "[" + O + "]()" + A.substring(N);
          f.current = { start: N + 3, end: N + 3 }, t(_);
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
        const O = A[E - 1], _ = A[E], z = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [G, I] of z)
          if (O === G && _ === I) {
            C.preventDefault();
            const L = A.substring(0, E - 1) + A.substring(E + 1);
            f.current = { start: E - 1, end: E - 1 }, t(L);
            return;
          }
        if (O === "[" && A.substring(E, E + 3) === "]()") {
          C.preventDefault();
          const G = A.substring(0, E - 1) + A.substring(E + 3);
          f.current = { start: E - 1, end: E - 1 }, t(G);
          return;
        }
      }
    }
    if (C.key === "Tab")
      if (C.preventDefault(), C.shiftKey) {
        const O = A.substring(0, E), _ = A.substring(E, N), z = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), B = O.substring(I), q = (B + _).split(`
`), K = q.map(($) => $.startsWith("  ") ? $.substring(2) : $.startsWith("	") ? $.substring(1) : $), X = L + K.join(`
`) + z, ee = (B + _).length - K.join(`
`).length;
        f.current = {
          start: Math.max(I, E - (q[0].length - K[0].length)),
          end: N - ee
        }, t(X);
      } else if (E === N) {
        const O = A.substring(0, E) + "  " + A.substring(N);
        f.current = { start: E + 2, end: E + 2 }, t(O);
      } else {
        const O = A.substring(0, E), _ = A.substring(E, N), z = A.substring(N), I = O.lastIndexOf(`
`) + 1, L = O.substring(0, I), q = (O.substring(I) + _).split(`
`), K = q.map((ee) => "  " + ee), X = L + K.join(`
`) + z;
        f.current = {
          start: E + 2,
          end: N + q.length * 2
        }, t(X);
      }
  }, [t, c]);
  return /* @__PURE__ */ R("div", { ref: u, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: d,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: x || `<span class="md-placeholder">${qt(n)}</span>` },
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
let Xi = 0, Is = 0, Qd = 0;
function Cx(e) {
  Is++, Qd = e;
}
const Mx = Dn(function({
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
  }), c = V([]), l = V(performance.now()), d = V(0), u = V(0), f = V(0), p = V(0), [h, g] = j(new Array(60).fill(0)), [y, v] = j(new Array(60).fill(0));
  Z(() => {
    if (!t || !r) return;
    const D = () => {
      const C = performance.now();
      queueMicrotask(() => {
        const T = performance.now() - C;
        Cx(T);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), Z(() => {
    if (!t) return;
    let D = 0, C = performance.now(), T = 0;
    const E = (N) => {
      const A = N - l.current;
      if (l.current = N, c.current.push({ time: N, duration: A }), c.current.length > 120 && (c.current = c.current.slice(-120)), A > 16.67 && u.current++, D++, N - C >= 1e3) {
        T = D, D = 0, C = N;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((K, X) => K + X.duration, 0) / P.length : 0, _ = P.length > 0 ? Math.max(...P.map((K) => K.duration)) : 0, z = performance.memory, G = z ? z.usedJSHeapSize / (1024 * 1024) : 0, I = z ? z.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, B = Xi - f.current, q = Is - p.current;
        f.current = Xi, p.current = Is, a({
          fps: T,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(_ * 100) / 100,
          memoryUsed: Math.round(G * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: B,
          transactionCount: q,
          lastTransactionTime: Math.round(Qd * 100) / 100,
          domNodes: L,
          longFrames: u.current
        }), g((K) => [...K.slice(1), T]), v((K) => [...K.slice(1), O]), u.current = 0;
      }
      d.current = requestAnimationFrame(E);
    };
    return d.current = requestAnimationFrame(E), () => {
      cancelAnimationFrame(d.current);
    };
  }, [t]);
  const b = F(() => {
    n?.();
  }, [n]), x = F(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const S = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", w = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", k = (D, C, T) => {
    const A = D.map((P, O) => {
      const _ = O / (D.length - 1) * 120, z = 24 - Math.min(P, C) / C * 24;
      return `${_},${z}`;
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
        /* @__PURE__ */ m(yf, { size: 14 }),
        /* @__PURE__ */ m("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ R("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: x, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ m(kc, { size: 12 }) : /* @__PURE__ */ m(Cc, { size: 12 }) }),
        /* @__PURE__ */ m("button", { onClick: b, title: "Close profiler", children: /* @__PURE__ */ m(Ct, { size: 12 }) })
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
class Sx extends Pu {
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
            _t,
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
            _t,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(gn, { className: "w-4 h-4" }),
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
                n ? /* @__PURE__ */ m($t, { className: "w-3 h-3" }) : /* @__PURE__ */ m(Mc, { className: "w-3 h-3" }),
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
                    /* @__PURE__ */ m(An, { className: "w-3 h-3" }),
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
function Ex(e, t) {
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
function Dx(e) {
  const [t, n] = Ou(Ex, { status: "idle" }), r = V(null), o = F(async (a, c, l, d, u) => {
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
  }, [e]), s = F(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = F(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const Nx = {
  SpellCheck: xf,
  RefreshCw: wf,
  Minimize2: Cc,
  Maximize2: kc,
  FileText: Zs,
  MessageSquare: Sc,
  Sparkles: uo
};
function Ax({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = j(""), [a, c] = j(!1), l = V(null), d = V(null), u = e.filter((y) => y.scope === t || y.scope === "both");
  Z(() => {
    const y = (b) => {
      l.current && !l.current.contains(b.target) && r();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [r]), Z(() => {
    const y = (v) => {
      v.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), Z(() => {
    a && d.current && d.current.focus();
  }, [a]);
  const p = F(() => {
    const v = u.length * 40 + (a ? 56 : 0) + 16, b = window.innerWidth, x = window.innerHeight;
    let S = o.top, w = o.left;
    return w + 260 > b - 8 && (w = b - 260 - 8), w < 8 && (w = 8), S + v > x - 8 && (S = o.top - v - 8), S < 8 && (S = 8), { top: S, left: w };
  }, [o, u.length, a])(), h = () => {
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
                  ref: d,
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
            u.filter((y) => !y.showCustomPrompt).map((y) => {
              const v = y.icon ? Nx[y.icon] : uo;
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
  return /* @__PURE__ */ m(Et, { onMouseDown: (y) => y.preventDefault(), children: g });
}
function Rx({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = V(null), a = V(null), [c, l] = j(!1), [d, u] = j(0);
  Z(() => {
    if (i.current) {
      const w = new ResizeObserver((k) => {
        for (const D of k)
          u(D.contentRect.height);
      });
      return w.observe(i.current), () => w.disconnect();
    }
  }, []), Z(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), Z(() => {
    const w = (k) => {
      k.key === "Escape" && s();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [s]);
  const f = Zt(() => {
    const C = window.innerWidth, T = window.innerHeight;
    let E = t.selectionCenterX - 380 / 2;
    E + 380 > C - 8 && (E = C - 380 - 8), E < 8 && (E = 8);
    const N = T - t.selectionBottom - 8, A = t.selectionTop - 8, P = d || 200;
    let O, _ = !1;
    return N >= P || N >= A ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, _ = !0), O < 8 && (O = 8), O + P > T - 8 && (O = T - P - 8), { top: O, left: E, placedAbove: _ };
  }, [t, d]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", h = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", y = e.status === "complete", v = e.status === "error", b = F(() => {
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
                  children: /* @__PURE__ */ m(Ct, { size: 14, className: "text-muted-foreground" })
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
                    pn,
                    {
                      icon: hs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ m(
                    pn,
                    {
                      icon: Qs,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ m(
                    pn,
                    {
                      icon: c ? Nn : An,
                      label: c ? "Copied" : "Copy",
                      onClick: b
                    }
                  )
                ] }),
                /* @__PURE__ */ m(
                  pn,
                  {
                    icon: Js,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  pn,
                  {
                    icon: Ct,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ R(Ee, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  pn,
                  {
                    icon: Ct,
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
  return /* @__PURE__ */ m(Et, { onMouseDown: (w) => w.preventDefault(), children: S });
}
function pn({
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
const Jd = "paragon-editor-toc-width", Lx = 280, eu = 200, tu = 500;
function Zi() {
  try {
    const e = localStorage.getItem(Jd);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= eu && t <= tu)
        return t;
    }
  } catch {
  }
  return Lx;
}
function Ix(e) {
  try {
    localStorage.setItem(Jd, String(e));
  } catch {
  }
}
function Px(e, t, n) {
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
function Ox(e) {
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
const Ji = Dn(function({
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
  onItemClick: h,
  renderItem: g,
  showToggleButton: y = !0,
  scrollContainerRef: v
}) {
  const [b, x] = j([]), [S, w] = j(null), [k, D] = j(n), [C, T] = j(/* @__PURE__ */ new Set()), [E, N] = j(() => {
    if (u) {
      const W = parseInt(u, 10);
      return isNaN(W) ? Zi() : W;
    }
    return Zi();
  }), A = V(null), P = V(null), O = V(!1), _ = V(0), z = V(0);
  Z(() => {
    D(n);
  }, [n]);
  const G = F((W) => {
    W.preventDefault(), W.stopPropagation(), O.current = !0, _.current = W.clientX, z.current = E, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [E]);
  Z(() => {
    const W = (J) => {
      if (!O.current) return;
      const de = f === "right" ? _.current - J.clientX : J.clientX - _.current, fe = Math.min(tu, Math.max(eu, z.current + de));
      N(fe);
    }, Y = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((J) => (Ix(J), J)));
    };
    return document.addEventListener("mousemove", W), document.addEventListener("mouseup", Y), () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", Y);
    };
  }, [f]);
  const I = F(() => {
    if (!t || t.isDestroyed) return;
    const W = Px(t, s, i);
    x(W), S && !W.find((Y) => Y.id === S) && w(null);
  }, [t, s, i, S]);
  Z(() => {
    if (!t) return;
    const W = () => {
      P.current && clearTimeout(P.current), P.current = setTimeout(() => I(), 300);
    };
    return I(), t.on("update", W), t.on("create", W), () => {
      t.off("update", W), t.off("create", W), P.current && clearTimeout(P.current);
    };
  }, [t, I]), Z(() => {
    if (!t || !c || !k || b.length === 0) return;
    const W = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!W) return;
    const Y = () => {
      const fe = W.getBoundingClientRect();
      let xe = null;
      for (let De = b.length - 1; De >= 0; De--) {
        const Ve = b[De], Dt = Qi(t, Ve.pos);
        if (Dt && Dt.getBoundingClientRect().top - fe.top <= p + 10) {
          xe = Ve.id;
          break;
        }
      }
      !xe && b.length > 0 && (xe = b[0].id), w(xe);
    };
    let J;
    const de = () => {
      cancelAnimationFrame(J), J = requestAnimationFrame(Y);
    };
    return W.addEventListener("scroll", de, { passive: !0 }), Y(), () => {
      W.removeEventListener("scroll", de), cancelAnimationFrame(J);
    };
  }, [t, b, c, k, p, v]);
  const L = F((W) => {
    if (!t || t.isDestroyed) return;
    const Y = Qi(t, W.pos);
    if (Y) {
      const J = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (J) {
        const de = J.getBoundingClientRect(), xe = Y.getBoundingClientRect().top - de.top + J.scrollTop;
        J.scrollTo({ top: xe - p, behavior: "smooth" });
      } else
        Y.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(W.pos + 1);
    } catch {
    }
    w(W.id), h?.(W);
  }, [t, p, h, v]), B = F(() => {
    const W = !k;
    D(W), r?.(W);
  }, [k, r]), q = F((W) => {
    T((Y) => {
      const J = new Set(Y);
      return J.has(W) ? J.delete(W) : J.add(W), J;
    });
  }, []), K = F((W, Y, J = 0) => {
    if (g)
      return g(W, Y, () => L(W));
    const de = (W.level - s) * 14, fe = l && W.children && W.children.length > 0, xe = C.has(W.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${Y ? "toc-item-active" : ""} toc-level-${W.level}`,
        style: { paddingLeft: `${de + 10}px` },
        children: /* @__PURE__ */ R(
          "button",
          {
            className: "toc-item-button",
            onClick: () => L(W),
            title: W.text,
            children: [
              fe && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (De) => {
                    De.stopPropagation(), q(W.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: xe ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              a && /* @__PURE__ */ R("span", { className: "toc-level-indicator", children: [
                "H",
                W.level
              ] }),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: W.text })
            ]
          }
        )
      },
      W.id
    );
  }, [g, L, l, s, a, C, q]), X = F((W, Y = 0) => W.map((J) => {
    const de = S === J.id, fe = C.has(J.id), xe = J.children && J.children.length > 0;
    return /* @__PURE__ */ R("div", { children: [
      K(J, de, Y),
      xe && !fe && /* @__PURE__ */ m("div", { className: "toc-children", children: X(J.children, Y + 1) })
    ] }, J.id);
  }), [S, C, K]), ee = F(() => b.map((W) => {
    const Y = S === W.id;
    return K(W, Y);
  }), [b, S, K]);
  if (!t) return null;
  const $ = l ? Ox(b) : [];
  return /* @__PURE__ */ R(Ee, { children: [
    y && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: B,
        title: k ? "Hide Table of Contents" : "Show Table of Contents",
        children: k ? /* @__PURE__ */ m(kf, { size: 16 }) : /* @__PURE__ */ m(Cf, { size: 16 })
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
              onMouseDown: G
            }
          ),
          /* @__PURE__ */ R("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: b.length === 0 ? /* @__PURE__ */ R("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ m("div", { className: "toc-list", children: l ? X($) : ee() }) })
          ] })
        ]
      }
    )
  ] });
});
let kt = null, so = null;
async function nu() {
  if (kt) return kt;
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
      const d = l, u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = d.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = d.getAttribute("data-align") || "left", v = [p], b = y !== "left", x = g && g > 0;
      return (b || x) && v.push(b ? y : "left"), x && v.push(String(g)), `![${v.join(" | ")}](${u})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const d = l.querySelector("img");
      if (!d) return c;
      const u = d.getAttribute("src") || "", p = (d.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = d.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = d.getAttribute("data-align") || "left", v = [p], b = y !== "left", x = g && g > 0;
      (b || x) && v.push(b ? y : "left"), x && v.push(String(g));
      const S = `![${v.join(" | ")}](${u})`, w = l.parentNode;
      return w && w.nodeName === "LI" ? `
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
    const l = c.getAttribute("src") || "", u = (c.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = c.getAttribute("width"), p = f ? parseInt(f, 10) : null, h = c.getAttribute("data-align") || "left", g = [u], y = h !== "left", v = p && p > 0;
    return (y || v) && g.push(y ? h : "left"), v && g.push(String(p)), `![${g.join(" \\| ")}](${l})`;
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
      (g) => g.nodeType === Node.ELEMENT_NODE && g.nodeName === "LI"
    ), h = f === "OL" ? parseInt(c.getAttribute("start") || "1", 10) : 1;
    p.forEach((g, y) => {
      const v = g.getAttribute("data-type") === "taskItem", b = g.getAttribute("data-checked") === "true", x = s(g);
      v ? l.push(`${u}- [${b ? "x" : " "}] ${x}`) : f === "OL" ? l.push(`${u}${h + y}. ${x}`) : l.push(`${u}- ${x}`);
      const S = Array.from(g.childNodes).filter(
        (w) => w.nodeType === Node.ELEMENT_NODE && (w.nodeName === "UL" || w.nodeName === "OL")
      );
      for (const w of S)
        i(w, l, d + 1);
    });
  }
  function a(c) {
    const l = [];
    for (const d of Array.from(c.childNodes)) {
      if (d.nodeType !== Node.ELEMENT_NODE) {
        const h = (d.textContent || "").trim();
        h && l.push(h.replace(/\|/g, "\\|"));
        continue;
      }
      const u = d, f = u.nodeName;
      if (f === "UL" || f === "OL") {
        i(u, l, 0);
        continue;
      }
      if (f === "FIGURE") {
        const h = u.querySelector("img");
        h && l.push(r(h));
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
      u.forEach((g, y) => {
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
      const d = l.getAttribute("data-date");
      return d ? `@${ty(d)}@` : c;
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
  }), kt = n, n;
}
function _x() {
  !so && !kt && (so = nu().then((e) => (kt = e, e)));
}
function $x() {
  return _x(), {
    turndown(e) {
      return kt ? kt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return kt !== null;
    },
    async ready() {
      kt || (so ? await so : await nu());
    }
  };
}
function Hx() {
  const e = V(null);
  return e.current || (e.current = $x()), e.current;
}
function Wx(e, t, n) {
  Z(() => {
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
              const f = u[2] === "x", p = a.schema.nodes.taskList, h = a.schema.nodes.taskItem;
              if (p && h) {
                const g = a.tr, y = l.pos - d.length, v = l.pos;
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
              o.preventDefault(), qr(e, l.pos - 3, l.pos);
              return;
            }
            if (d === "—-") {
              o.preventDefault(), qr(e, l.pos - 2, l.pos);
              return;
            }
            if (d === "—") {
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
const zx = new Pe("tableCellMenu");
let ec = !1, zr = null;
function Bx() {
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
function Fx(e) {
  return Bx(), new Oe({
    key: zx,
    state: {
      init() {
        return ze.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && zr ? zr.map(t.mapping, t.doc) : (zr = Ux(o.doc, e), zr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Ux(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = Ge.widget(o + 1, (i) => {
        const a = document.createElement("div");
        a.className = "table-cell-menu-wrapper ProseMirror-widget", a.setAttribute("contenteditable", "false"), a.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const c = document.createElement("button");
        c.className = "table-cell-menu-btn", c.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', c.title = "Table options", c.type = "button";
        const l = document.documentElement.classList.contains("dark"), d = l ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", u = l ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", f = l ? "#999" : "#666", p = l ? "#2a2a2a" : "#f5f5f5";
        return c.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + d + ";border:1px solid " + u + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + f + ";pointer-events:auto;padding:0;", c.addEventListener("mouseenter", () => {
          c.style.opacity = "1", c.style.background = p, c.style.transform = "scale(1.05)";
        }), c.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), c.style.background = d, c.style.transform = "scale(1)";
        }), c.addEventListener("click", (h) => {
          h.preventDefault(), h.stopPropagation();
          const g = c.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), Yx(h, t, o, g);
        }), a.appendChild(c), a;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), ze.create(e, n);
}
function Yx(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const i = 170, a = 280;
  let c = Math.max(0, Math.min(r.top, window.innerHeight)), l = Math.max(0, Math.min(r.bottom, window.innerHeight)), d = Math.max(0, Math.min(r.left, window.innerWidth)), u = l + 4, f = d - i + r.width + 8;
  f + i > window.innerWidth - 12 && (f = window.innerWidth - i - 12), f < 12 && (f = 12), u + a > window.innerHeight - 12 && (u = c - a - 4), u < 12 && (u = 12), u + a > window.innerHeight - 12 && (u = window.innerHeight - a - 12);
  const p = document.documentElement.classList.contains("dark"), h = p ? "#1f1f1f" : "#ffffff", g = p ? "#3a3a3a" : "#e5e5e5", y = p ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + u + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + h + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + y + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
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
    { label: "Copy Table", icon: "copy", action: () => jx(t) }
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
      }), A.addEventListener("click", (z) => {
        z.preventDefault(), z.stopPropagation(), N.action && N.action(), s.remove();
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
function jx(e) {
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
const Vx = Pf.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Fx(this.editor)
    ];
  }
}), Kx = Of.extend({}), er = new Pe("tableSorting");
let Xt = null, Xn = null;
function Gx(e) {
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
function qx(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function Xx(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (h, g) => {
    if (h.type.name === "table" && g === t)
      return s = h, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Xt?.tablePos === t && Xt?.columnIndex === n && Xt?.direction === "asc" ? "desc" : "asc";
  Xt = { tablePos: t, columnIndex: n, direction: i }, Xn = null;
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
    tc(n, i), o.dispatch(r.tr.setMeta(er, { updated: !0 }));
    return;
  }
  const d = l.map((h) => {
    let g = "", y = 0;
    return h.node.forEach((v) => {
      y === n && (g = v.textContent || ""), y++;
    }), { ...h, sortValue: Gx(g) };
  }), u = d.map((h, g) => g);
  d.sort((h, g) => qx(h.sortValue, g.sortValue, i));
  const f = d.map((h, g) => l.indexOf(h));
  if (u.some((h, g) => h !== f[g])) {
    const h = [];
    c.forEach((v) => h.push(v.node)), d.forEach((v) => h.push(v.node));
    const g = s.type.create(s.attrs, h), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(er, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(er, { updated: !0 }));
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
function Zx(e, t, n, r) {
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
    d.preventDefault(), d.stopPropagation(), Xx(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function Qx(e) {
  return new Oe({
    key: er,
    state: {
      init() {
        return ze.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(er);
        return !t.docChanged && !s?.updated && Xn ? Xn.map(t.mapping, t.doc) : (Xn = Jx(o.doc, e), Xn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Jx(e, t) {
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
              d.forEach((x, S) => {
                x.type.name === "paragraph" && (p = f + 1 + S + x.nodeSize - 1);
              });
              const g = Xt?.tablePos === s && Xt?.columnIndex === c ? Xt.direction : null, y = c, v = s, b = Ge.widget(p, () => Zx(g, v, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(b);
            }
            l += d.nodeSize, c++;
          });
        }
      });
    }
  }), ze.create(e, n);
}
const ek = et.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Qx(this.editor)];
  }
});
function Da(e, t, n, r, o, s = {}) {
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
const tk = _f.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, d = t.schema.nodes.taskItem;
        let u = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === i || h.type === a || h.type === c) {
            u = h.type, f = s.before(p);
            break;
          }
        }
        if (u === i)
          return e.liftListItem("listItem");
        if (u === a || u === c) {
          if (!r) return !0;
          if (Da(n, f, i, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), nk = $f.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, d = t.schema.nodes.taskItem;
        let u = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === i || h.type === a || h.type === c) {
            u = h.type, f = s.before(p);
            break;
          }
        }
        if (u === c)
          return e.liftListItem("listItem");
        if (u === a || u === i) {
          if (!r) return !0;
          if (Da(n, f, c, l, d, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), rk = Wf.extend({
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
          r.setNodeMarkup(w, u, k.attrs);
          const D = r.doc.nodeAt(w);
          if (!D) return !1;
          const C = [];
          D.forEach((T, E) => {
            T.type === y && C.push(w + 1 + E);
          });
          for (let T = C.length - 1; T >= 0; T--) {
            const E = C[T], N = r.doc.nodeAt(E);
            N && N.type === y && r.setNodeMarkup(E, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const x = Qa(d, u);
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
        const S = Qa(d, h);
        if (S) {
          r.wrap(d, S);
          const { $from: w } = r.selection;
          let k = -1;
          for (let D = w.depth; D > 0; D--)
            if (w.node(D).type === h) {
              k = w.before(D);
              break;
            }
          return k >= 0 && Da(r, k, u, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), ok = zf.extend({
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
          const u = r.before(s), { tr: f } = n, p = n.schema.nodes.taskItem, h = n.schema.nodes.paragraph, g = p.create(
            { checked: !1 },
            h.create()
          );
          f.insert(u, g);
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
      new Oe({
        key: new Pe("taskItemInputRule"),
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
            const u = d[2] === "x", f = a.start() + (d.index || 0), p = r, h = i.tr;
            h.delete(f, p);
            const y = h.doc.resolve(f).blockRange();
            if (!y || !t || !e) return !1;
            const v = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: u } }
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
}), sk = Hf.extend({
  content: "paragraph block*"
}), nc = new Pe("collapsibleList");
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
function ak(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let kn = null;
function us(e, t, n) {
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
      const l = s + 1 + c.nodeSize - 1, d = Ge.widget(
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
          const h = document.createElement("button");
          return h.className = `collapsible-list-chevron ${a ? "collapsed" : "expanded"}`, h.setAttribute("data-list-item-id", i), h.setAttribute("contenteditable", "false"), h.setAttribute("tabindex", "-1"), h.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', h.title = a ? "Click to expand" : "Click to collapse", h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = h.classList.contains("collapsed");
            h.classList.remove("collapsed", "expanded"), h.classList.add(y ? "expanded" : "collapsed"), h.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), kn && kn.dispatch(
              kn.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), p.appendChild(h), p;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(d);
    }
    if (a && ak(o, s)) {
      let d = s + 1;
      o.forEach((u) => {
        ["bulletList", "orderedList", "taskList"].includes(u.type.name) && r.push(
          Ge.node(d, d + u.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), d += u.nodeSize;
      });
    }
    return !0;
  }), ze.create(e, r);
}
const ik = et.create({
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
      new Oe({
        key: nc,
        view(n) {
          return kn = n, {
            update(r) {
              kn = r;
            },
            destroy() {
              kn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: us(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: us(s.doc, e, t),
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
            return r?.decorations ? r.decorations : us(n.doc, e, t);
          }
        }
      })
    ];
  }
}), we = Kf();
we.register("javascript", ea);
we.register("js", ea);
we.register("jsx", ea);
we.register("typescript", ta);
we.register("ts", ta);
we.register("tsx", ta);
we.register("python", Ec);
we.register("py", Ec);
we.register("xml", na);
we.register("html", na);
we.register("svg", na);
we.register("css", Gf);
we.register("json", qf);
we.register("bash", po);
we.register("sh", po);
we.register("shell", po);
we.register("zsh", po);
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
async function ck(e) {
  if (we.registered(e)) return !0;
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
    we.register(e, r), Fr.add(e);
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
          i !== e && !we.registered(i) && (we.register(i, r), Fr.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Br.delete(e);
  }
}
function lk({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = j(!1), [s, i] = j(!1), [a, c] = j(!0), l = V(null), d = e.attrs.language || "plaintext";
  Z(() => {
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
  }, [s]), Z(() => {
    if (s && d !== "plaintext") {
      if (we.registered(d)) {
        c(!0);
        return;
      }
      _s[d] && (c(!1), ck(d).then((g) => {
        c(g);
      }));
    }
  }, [s, d]);
  const u = F(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (g) {
      console.error("Failed to copy:", g);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(_s)])).sort(), h = d === "plaintext" ? "Plain Text" : d.charAt(0).toUpperCase() + d.slice(1);
  return /* @__PURE__ */ R(Mn, { className: "code-block-wrapper", ref: l, children: [
    /* @__PURE__ */ R("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ R("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ R(
          "select",
          {
            value: d,
            onChange: (g) => t({ language: g.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ m("option", { value: "plaintext", children: "Plain Text" }),
              p.map((g) => /* @__PURE__ */ m("option", { value: g, children: g.charAt(0).toUpperCase() + g.slice(1) }, g))
            ]
          }
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: h }),
        /* @__PURE__ */ m($t, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: u,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ m(Nn, { size: 14 }) : /* @__PURE__ */ m(An, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !a ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m($s, { className: s && a ? `language-${d}` : "language-plaintext" }) })
  ] });
}
const dk = Vf.extend({
  addNodeView() {
    return co(lk);
  }
}).configure({
  lowlight: we,
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
function uk({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = j(!1), [s, i] = j(!1), [a, c] = j(null), l = V(null), d = V(null), u = e.attrs.type || "info", f = Ur[u] || Ur.info, p = f.icon, h = F(() => {
    if (d.current) {
      const b = d.current.getBoundingClientRect();
      c({
        top: b.bottom + 4,
        left: b.left
      });
    }
  }, []);
  Z(() => {
    if (!r) return;
    const b = (x) => {
      l.current && !l.current.contains(x.target) && d.current && !d.current.contains(x.target) && o(!1);
    };
    return document.addEventListener("mousedown", b), document.addEventListener("touchstart", b, { passive: !0 }), () => {
      document.removeEventListener("mousedown", b), document.removeEventListener("touchstart", b);
    };
  }, [r]), Z(() => {
    if (!r) return;
    const b = () => o(!1);
    return window.addEventListener("scroll", b, !0), () => window.removeEventListener("scroll", b, !0);
  }, [r]);
  const g = F(() => {
    n.isEditable && (r || h(), o(!r));
  }, [n.isEditable, r, h]), y = (b) => {
    t({ type: b }), o(!1);
  }, v = F((b) => {
    b.stopPropagation(), i((x) => !x);
  }, []);
  return /* @__PURE__ */ R(Mn, { className: `callout callout-${u}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": u, children: [
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
              ref: d,
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
                n.isEditable && /* @__PURE__ */ m($t, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(Mc, { size: 16 }) : /* @__PURE__ */ m($t, { size: 16 })
            }
          ),
          r && n.isEditable && a && /* @__PURE__ */ m(Et, { children: /* @__PURE__ */ m(
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
                    className: `callout-type-option ${b === u ? "active" : ""}`,
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
const fk = mo.create({
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
    return co(uk);
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
}), mk = Xf.extend({
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
        const B = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[L] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${B}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (L) => !(!L || L.startsWith("data:") || L.startsWith("blob:") || L.startsWith("http://") || L.startsWith("https://")), l = (L) => {
        c(L) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(L).then((B) => {
          a.src = B, a.style.opacity = "1";
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
      const p = (L, B, q) => {
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
        `, K.innerHTML = `${B}<span>${L}</span>`, K.addEventListener("mouseenter", () => {
          K.style.background = "oklch(0.95 0 0)";
        }), K.addEventListener("mouseleave", () => {
          K.style.background = "transparent";
        }), K.addEventListener("click", (X) => {
          X.preventDefault(), X.stopPropagation(), q(), f.style.display = "none", T = !1;
        }), K;
      }, h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", h, () => {
        const L = typeof r == "function" ? r() : null;
        if (L != null && e.onImageClick) {
          const B = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: L,
            rect: B
          });
        }
      })), f.appendChild(p("Copy image", g, async () => {
        const L = o.attrs.src;
        try {
          const q = await (await fetch(L)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [q.type]: q })
          ]);
        } catch {
          try {
            const B = new window.Image();
            B.crossOrigin = "anonymous", await new Promise((X, ee) => {
              B.onload = () => X(), B.onerror = () => ee(new Error("Image load failed")), B.src = L;
            });
            const q = document.createElement("canvas");
            q.width = B.naturalWidth, q.height = B.naturalHeight;
            const K = q.getContext("2d");
            if (K) {
              K.drawImage(B, 0, 0);
              const X = await new Promise(
                (ee) => q.toBlob(ee, "image/png")
              );
              X ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": X })
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
        const L = o.attrs.src, B = o.attrs.alt || "image", q = document.createElement("a");
        q.href = L, q.download = B, q.target = "_blank", q.rel = "noopener noreferrer", document.body.appendChild(q), q.click(), setTimeout(() => {
          document.body.removeChild(q);
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
        k.forEach((B) => {
          (B.getAttribute("data-align-value") || "left") === L ? (B.style.background = "oklch(1 0 0)", B.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", B.style.color = "oklch(0.25 0 0)", B.style.fontWeight = "600") : (B.style.background = "transparent", B.style.boxShadow = "none", B.style.color = "oklch(0.5 0 0)", B.style.fontWeight = "400");
        });
      };
      w.forEach(({ value: L, label: B, icon: q }) => {
        const K = document.createElement("button");
        K.setAttribute("type", "button"), K.setAttribute("data-align-value", L), K.setAttribute("title", `Align ${B.toLowerCase()}`), K.style.cssText = `
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
        `, K.innerHTML = `${q}<span>${B}</span>`, K.addEventListener("click", (X) => {
          X.preventDefault(), X.stopPropagation();
          const ee = typeof r == "function" ? r() : null;
          if (ee != null)
            try {
              const { state: $, dispatch: W } = n.view, Y = $.doc.nodeAt(ee);
              if (Y && Y.type.name === "resizableImage") {
                const J = $.tr.setNodeMarkup(ee, void 0, {
                  ...Y.attrs,
                  align: L
                });
                W(J);
              }
            } catch {
              n.chain().focus().setNodeSelection(ee).updateAttributes("resizableImage", {
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
          const B = u.getBoundingClientRect(), q = 200, K = f.closest('[role="dialog"]');
          let X = 0, ee = 0;
          if (K) {
            const fe = K.getBoundingClientRect();
            X = fe.left, ee = fe.top;
          }
          let $ = B.bottom + 4 - ee, W = B.right - q - X;
          const Y = window.innerHeight, J = window.innerWidth, de = 200;
          B.bottom + 4 + de > Y && ($ = B.top - de - 4 - ee), W + X < 8 && (W = 8 - X), W + q + X > J - 8 && (W = J - q - 8 - X), f.style.top = `${$}px`, f.style.left = `${W}px`, f.style.display = "flex", T = !0, C();
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
        const B = document.createElement("div");
        B.style.cssText = `
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
        const q = document.createElement("img");
        q.src = a.src, q.alt = a.alt || "", q.style.cssText = `
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
        const X = o.attrs.alt;
        let ee = null;
        X && X.trim() && (ee = document.createElement("div"), ee.style.cssText = `
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
          `, ee.textContent = X);
        const $ = () => {
          B.style.opacity = "0", q.style.transform = "scale(0.92)", setTimeout(() => B.remove(), 200);
        };
        B.addEventListener("click", (J) => {
          J.target === B && $();
        }), K.addEventListener("click", $);
        const W = (J) => {
          J.key === "Escape" && ($(), document.removeEventListener("keydown", W));
        };
        document.addEventListener("keydown", W), B.appendChild(q), B.appendChild(K), ee && B.appendChild(ee);
        const Y = s.closest('[role="dialog"]');
        Y ? Y.appendChild(B) : document.body.appendChild(B), requestAnimationFrame(() => {
          B.style.opacity = "1", q.style.transform = "scale(1)";
        });
      };
      N.addEventListener("click", P);
      let O, _;
      const z = (L) => {
        L.preventDefault(), O = L.clientX, _ = a.offsetWidth, document.addEventListener("mousemove", G), document.addEventListener("mouseup", I);
      }, G = (L) => {
        const B = L.clientX - O, q = Math.max(100, _ + B);
        a.style.width = `${q}px`;
      }, I = () => {
        document.removeEventListener("mousemove", G), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const L = typeof r == "function" ? r() : null, B = a.offsetWidth;
        if (L != null)
          try {
            const { state: q, dispatch: K } = n.view, X = q.doc.nodeAt(L);
            if (X && X.type.name === "resizableImage") {
              const ee = q.tr.setNodeMarkup(L, void 0, {
                ...X.attrs,
                width: B
              });
              K(ee);
            }
          } catch {
            n.chain().focus().setNodeSelection(L).updateAttributes("resizableImage", {
              width: B
            }).run();
          }
      };
      return d.addEventListener("mousedown", z), {
        dom: s,
        update: (L) => L.type.name !== "resizableImage" ? !1 : (o = L, l(L.attrs.src), a.alt = L.attrs.alt || "", L.attrs.width && (a.style.width = `${L.attrs.width}px`), i(L.attrs.align || "left"), !0),
        destroy: () => {
          d.removeEventListener("mousedown", z), N.removeEventListener("click", P), document.removeEventListener("click", E), f.remove();
        }
      };
    };
  }
}), pk = /\[\[([^\[\]]+)\]\]$/, hk = Tc.create({
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
        find: pk,
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
}), bt = {
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
}, gk = ["info", "note", "prompt", "resources", "todo"];
function yk(e) {
  return e.length < 3 ? !1 : !!(bt.header.test(e) || bt.bold.test(e) || bt.list.test(e) || bt.taskList.test(e) || bt.codeBlock.test(e) || bt.callout.test(e) || bt.highlight.test(e) || bt.link.test(e) || bt.table.test(e));
}
function vk(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function bk(e, t) {
  const { alt: n, align: r, width: o } = vk(e), s = {
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
    i ? o.push(bk(i[1], i[2])) : o.push(`<p>${ao(s.trim())}</p>`);
  }
  return o.join("");
}
function ru(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function ou(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", d = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, u = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += d; a < e.length && e[a].depth >= s; ) {
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
    s.length !== 0 && (o.push(ou(s)), s = []);
  };
  for (const a of r) {
    const c = ru(a);
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
function wk(e) {
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
function xk(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (u) => {
    const f = u.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const h = wk(u);
        if (h) {
          const g = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(h), g;
        }
      }
    }
    return u;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (u, f, p) => {
    let h = p.trim();
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), h = h.replace(/__([^_]+)__/g, "<strong>$1</strong>"), h = h.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), h = h.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
    const g = "info";
    h.startsWith("<") || (h = `<p>${h}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${h}</div>`), y;
  }), gk.forEach((u) => {
    const f = new RegExp(`\`\`\`${u}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (p, h) => {
      let g = h.trim();
      g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>"), g.startsWith("<") || (g = `<p>${g}</p>`);
      const y = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${u}" class="callout callout-${u}">${g}</div>`), y;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (u, f, p) => {
    const h = f || "plaintext", g = p.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${h}">${g}</code></pre>`), y;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), i = [];
  let a = [];
  const c = () => {
    a.length !== 0 && (i.push(ou(a)), a = []);
  };
  for (const u of s) {
    const f = ru(u);
    if (f) {
      if (a.length > 0) {
        const h = a[0].type, g = Math.min(...a.map((y) => y.depth));
        f.depth === g && f.type !== h && c();
      }
      a.push(f);
      continue;
    }
    c();
    let p = u;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (h, g, y) => {
      const v = g.length;
      return `<h${v}>${y}</h${v}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), i.push(p);
  }
  c(), t = i.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (u, f, p) => {
    const h = f.split("|").map((x) => x.trim());
    let g = "", y = "left", v = null;
    h.length === 1 ? g = h[0] : h.length === 2 ? (g = h[0], /^\d+$/.test(h[1]) ? v = h[1] : ["left", "center", "right"].includes(h[1]) ? y = h[1] : g = f) : h.length === 3 ? (g = h[0], ["left", "center", "right"].includes(h[1]) && (y = h[1]), /^\d+$/.test(h[2]) && (v = h[2])) : g = f;
    const b = v ? ` width="${v}" style="width: ${v}px"` : "";
    return `<img src="${p.trim()}" alt="${g}" data-align="${y}"${b}>`;
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
const kk = et.create({
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
      new Oe({
        key: new Pe("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !yk(i))
              return !1;
            n.preventDefault();
            const a = xk(i);
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
}), sc = new Pe("collapsibleHeading");
function Ck(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function io(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, Ck(i, a, l));
    }
  }), n;
}
let Cn = null;
function fs(e, t, n) {
  const r = [], o = io(e, n.levels), s = [];
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
        Ge.node(d, d + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": u,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const h = Ge.widget(d + l.nodeSize - 1, () => {
        const g = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${u}"]`);
        if (g) {
          g.classList.contains("collapsed") !== f && (g.classList.remove("collapsed", "expanded"), g.classList.add(f ? "collapsed" : "expanded"), g.title = f ? "Click to expand" : "Click to collapse");
          const x = g.parentElement;
          if (x) return x;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", u), v.setAttribute("data-heading-level", String(l.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = f ? "Click to expand" : "Click to collapse", v.addEventListener("click", (b) => {
          b.preventDefault(), b.stopPropagation();
          const x = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(x ? "expanded" : "collapsed"), v.title = x ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(u) ? t.collapsedHeadings.delete(u) : t.collapsedHeadings.add(u), Cn && Cn.dispatch(Cn.state.tr.setMeta("collapsibleHeading", { toggled: u }));
        }), y.appendChild(v), y;
      }, { side: 1, key: `chevron-${u}` });
      r.push(h);
    } else l.isBlock && c(d) && r.push(
      Ge.node(d, d + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), ze.create(e, r);
}
function Mk(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = io(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
const Sk = et.create({
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
      new Oe({
        key: sc,
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
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: fs(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const i = n.getMeta("collapsibleHeading");
            return i || n.docChanged ? (n.docChanged && !i && Mk(o.doc, s.doc, e, t.levels), {
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
}), Tk = /\[([^\]]+)\]\(([^)]+)\)$/, Ek = /^(https?:\/\/|www\.)[^\s]+$/i, Dk = et.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new We({
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
      new Oe({
        key: new Pe("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!Ek.test(s)) return !1;
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
}), Nk = ["info", "note", "prompt", "resources", "todo"], Ak = et.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Oe({
        key: new Pe("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const d of Nk)
              if (l === `\`\`\`${d}`) {
                n.preventDefault();
                const u = r.tr, f = a + c.indexOf("```");
                u.delete(f, i.pos);
                const p = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                if (p && h) {
                  const g = h.create(), y = p.create({ type: d }, Zf.from(g));
                  u.insert(f, y);
                  const v = u.doc.resolve(f + 2);
                  u.setSelection(ct.near(v)), t.dispatch(u);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Yr = new Pe("searchHighlight"), Rk = et.create({
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
      new Oe({
        key: Yr,
        state: {
          init() {
            return ze.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(Yr), d = t.docChanged;
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
                const h = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                p = new RegExp(h, i ? "g" : "gi");
              }
              o.doc.descendants((h, g) => {
                if (h.isText && h.text) {
                  let y;
                  for (; (y = p.exec(h.text)) !== null; ) {
                    const v = g + y.index, b = g + y.index + y[0].length, x = f === c;
                    u.push(
                      Ge.inline(v, b, {
                        class: x ? "search-highlight-current" : "search-highlight"
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
}), Lk = new Pe("tabIndent");
function Ik(e) {
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
const Pk = et.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Oe({
        key: Lk,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = Ik(n);
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
}), Ok = new Pe("expandSelection");
function ms(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const _k = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), $k = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), Hk = "tableRow", Wk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function zk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Bk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (Wk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Fk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === Hk) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Uk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if ($k.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Yk(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    _k.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function jk(e) {
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
function Vk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Kk(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Gk(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(zk(e, o, s)), Kk(e, t) && (i(Bk(e, o, s)), i(Fk(e, o, s))), i(Yk(e, o, s)), i(Uk(e, o, s));
  const a = jk(e);
  if (a.length > 0) {
    const c = Vk(a, o, s);
    for (const l of c)
      i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const qk = et.create({
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
        const a = Gk(n, o, s);
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
      new Oe({
        key: Ok,
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
}), Xk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Zk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Qk = new Pe("hexColorDecoration");
function su(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Xk.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, d = l + a[0].length;
      if (d >= t && l <= n) {
        const u = a[0], f = Zk(u);
        r.push(
          Ge.inline(l, d, {
            class: "hex-color-swatch",
            style: `background-color: ${u}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function Jk(e) {
  const t = su(e, 0, e.content.size);
  return ze.create(e, t);
}
const e1 = Tc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Oe({
        key: Qk,
        state: {
          init(e, { doc: t }) {
            return Jk(t);
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
              const i = su(e.doc, s.from, s.to);
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
}), Ae = new Pe("selectAllOccurrences");
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
function Pt(e, t) {
  const n = Ae.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function t1(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Te(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const n1 = et.create({
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
              const p = f.textContent, h = u.parentOffset;
              let g = h, y = h;
              for (; g > 0 && /\w/.test(p[g - 1]); ) g--;
              for (; y < p.length && /\w/.test(p[y]); ) y++;
              g < y && (a = p.slice(g, y));
            }
          }
          if (!a) return !1;
          const c = ac(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = t1(c, s), d = c[l];
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Te(this.storage), t && t(e.setMeta(Ae, { deactivate: !0 })), !0),
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
              const c = Pt(a, this.storage);
              this.storage.ranges = c, c.length === 0 && Te(this.storage);
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
        return Te(this.storage), !0;
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
              const s = Pt(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Te(this.storage);
            }
          } catch {
          }
        }, 10) : Te(this.storage), !0;
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
      new Oe({
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
              Te(e);
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
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), Qf(t.state, t.dispatch), setTimeout(() => {
                  const s = Pt(t);
                  e.ranges = s, s.length === 0 && Te(e);
                }, 10), !0;
              }
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, Jf(t.state, t.dispatch), setTimeout(() => {
                  const s = Pt(t);
                  e.ranges = s, s.length === 0 && Te(e);
                }, 10), !0;
              }
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Pt(t);
                if (r.length === 0) {
                  Te(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Ae, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Pt(t);
                  e.ranges = a, a.length === 0 && Te(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Te(e);
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
              t.dispatch(o), Te(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Ae, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Te(e);
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
            const s = Pt(t);
            if (s.length === 0) {
              Te(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Ae, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = Pt(t);
              e.ranges = c, c.length === 0 && Te(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function r1() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function o1(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function s1(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function a1(e, t) {
  return t.includes(e.type);
}
function i1(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function c1(e, t, n) {
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
      const u = e.type === "image/png" || e.type === "image/gif", f = u ? "image/png" : "image/jpeg", p = u ? void 0 : n, h = l.toDataURL(f, p), g = s1(h, e.name);
      r({ dataUrl: h, file: g, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function l1(e, t, n) {
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
  if (!a1(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = r1();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const u = await c1(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = u.dataUrl, i = u.file, s = Math.min(u.width, 600);
    } else {
      o = await o1(e), i = e;
      const u = await i1(o);
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
      return t.view.state.doc.descendants((p, h) => {
        if (f) return !1;
        if (p.type.name === "resizableImage" && p.attrs.src === o && p.attrs.alt === e.name) {
          try {
            const { state: g, dispatch: y } = t.view, v = g.doc.nodeAt(h);
            if (v) {
              const b = g.tr.setNodeMarkup(h, void 0, {
                ...v.attrs,
                src: u
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
        if (p.type.name === "resizableImage" && p.attrs.src === u) {
          const g = t.view.nodeDOM(h);
          if (g) {
            const y = g instanceof HTMLElement ? g : g.dom;
            y && y.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (u) {
      return console.warn("Image upload failed, removing placeholder:", u), l1(t, o, e.name), n.onUploadError?.(`Upload failed: ${u instanceof Error ? u.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
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
      new Oe({
        key: new Pe("imageUpload"),
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
                ct.near(n.state.doc.resolve(c.pos))
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
function u1({
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
  isLightweight: d,
  setImageEditState: u,
  callbackRefs: f
}) {
  return Zt(() => {
    const p = [
      Ef.configure({
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
      tk,
      nk,
      sk,
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
      ...d ? [] : [jf],
      Dk,
      Rk,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...d ? [] : [n1],
      Pk,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      em.extend({
        addInputRules() {
          const h = this.type;
          return [
            new We({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: g, range: y }) => {
                const { tr: v } = g, b = y.from, x = y.to;
                v.delete(b, x);
                const S = v.doc.resolve(b), w = h.create(), k = S.before(S.depth), D = S.after(S.depth);
                v.replaceWith(k, D, w);
                const C = k + w.nodeSize;
                if (C < v.doc.content.size) {
                  const T = v.doc.resolve(C);
                  T.nodeAfter && T.nodeAfter.isTextblock ? v.setSelection(ct.create(v.doc, C + 1)) : T.nodeAfter && v.setSelection(ct.near(v.doc.resolve(C)));
                } else {
                  const E = g.schema.nodes.paragraph.create();
                  v.insert(C, E), v.setSelection(ct.create(v.doc, C + 1));
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
      Vx,
      Kx,
      ...d ? [] : [ek]
    ), s.taskLists || p.push(
      rk.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      ok.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !t && !d && p.push(
      ik.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || p.push(dk), s.callouts || p.push(fk, Ak), a && !s.collapsibleHeadings && !d && p.push(
      Sk.configure({
        levels: o
      })
    ), s.images || p.push(
      mk.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (h) => {
          u({
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
      hk.configure({
        onWikiLinkClick: (h) => {
          console.log("WikiLink clicked:", h), f.onWikiLinkClick.current?.(h);
        },
        validateLink: (h) => f.validateWikiLink.current ? f.validateWikiLink.current(h) : !0
      })
    ), i && p.push(qk), l && !d && p.push(e1), s.markdownPaste || p.push(
      kk.configure({
        enableMarkdownPaste: !0
      })
    ), p;
  }, [e, t, n, r, o, s, i, a, c, l, d]);
}
const f1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, aC = _u(function({
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
  onModeChange: T,
  onReady: E,
  onFocus: N,
  onBlur: A,
  onSelectionChange: P,
  onDestroy: O,
  onSave: _,
  onRecover: z,
  onWikiLinkClick: G,
  validateWikiLink: I,
  onWikiLinkSearch: L,
  onLinkClick: B,
  findReplaceOpen: q,
  onFindReplaceChange: K,
  renderToolbar: X,
  renderFooter: ee,
  disabledFeatures: $ = {},
  minHeight: W = "200px",
  maxHeight: Y,
  spellCheck: J = !0,
  headingLevels: de = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: fe = [1, 2, 3],
  // TOC props
  showTableOfContents: xe = !1,
  tocVisible: De = !0,
  onTocVisibilityChange: Ve,
  tocTitle: Dt = "",
  tocMinLevel: Hn = 1,
  tocMaxLevel: Wn = 4,
  tocShowLevelIndicators: yr = !1,
  tocHighlightActive: vr = !0,
  tocTreeView: br = !1,
  tocWidth: wr = "240px",
  tocPosition: nn = "right",
  tocScrollOffset: zn = 20,
  onTocItemClick: rn,
  renderTocItem: on,
  tocShowToggleButton: xr = !0,
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
  enableTagAutoDetect: kr = !1,
  enableHexColorHighlight: Po = !1,
  enableCollapsibleHeadings: Oo = !1,
  // Performance mode
  performanceMode: Bn = "auto",
  // Error boundary
  onEditorError: _o,
  // AI writing assistant
  aiActions: tt,
  onAIAction: sn,
  onAISetupRequired: ae
}, ye) {
  const [se] = j(() => f1()), [me, _e] = j(C), [ue, Fn] = j(""), He = V(C), mt = V(""), pt = V(null), [Un, Na] = j(0), Cr = !!(tt && tt.length > 0 && sn), { state: Be, executeAction: Mr, abort: cu, reset: Nt } = Dx(sn), [$o, Ho] = j(null), [lu, du] = j({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), uu = V(sn);
  uu.current = sn;
  const Aa = V(ae);
  Aa.current = ae;
  const [fu, mu] = j([]), [pu, hu] = j(0), gu = F((U, re) => {
    mu(U), hu(re);
  }, []), Ra = V(b), La = V(x), Ia = V(S), Pa = V(w), Oa = V(k), _a = V(G), $a = V(I), Wo = V(L);
  Ra.current = b, La.current = x, Ia.current = S, Pa.current = w, Oa.current = k, _a.current = G, $a.current = I, Wo.current = L;
  const Ha = 2e3, [zo, yu] = j(() => Bn === "lightweight" ? !0 : Bn === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Ha : !1), Bo = V(0), Wa = V(zo);
  Wa.current = zo;
  const [an, Sr] = j(null), vu = u1({
    placeholder: s,
    isMobile: se,
    maxImageSize: v,
    headingLevels: de,
    collapsibleHeadingLevels: fe,
    disabledFeatures: $,
    progressiveSelectAll: Io,
    enableCollapsibleHeadings: Oo,
    enableTagAutoDetect: kr,
    enableHexColorHighlight: Po,
    isLightweight: zo,
    setImageEditState: Sr,
    callbackRefs: {
      onImageUploadStart: Ra,
      onImageUploadComplete: La,
      onImageUploadError: Ia,
      onImageUpload: Pa,
      resolveImageSrc: Oa,
      onWikiLinkClick: _a,
      validateWikiLink: $a
    }
  }), ht = V(null), Bt = V(n), Ft = V(r), Fo = V(o), Yn = V(null);
  Bt.current = n, Ft.current = r, Fo.current = o;
  const H = Lu({
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
    onCreate: ({ editor: U }) => {
      window.__tiptapEditor = U, E?.(U);
    },
    onDestroy: () => {
      O?.();
    },
    extensions: vu,
    content: t,
    editable: i,
    autofocus: a,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: J ? "true" : "false"
      },
      handleClick: (U, re, pe) => {
        if (B) {
          const Ne = pe.target.closest("a");
          if (Ne) {
            const rt = Ne.getAttribute("href");
            if (rt && B(rt, pe) === !1)
              return pe.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: U }) => {
      if (Bn === "auto" && (Bo.current++, Bo.current >= 50)) {
        Bo.current = 0;
        const pe = U.state.doc.content.childCount > Ha;
        pe !== Wa.current && yu(pe);
      }
      ht.current && clearTimeout(ht.current), ht.current = setTimeout(() => {
        if (U.isDestroyed) return;
        const re = U.getHTML();
        (Bt.current || Ft.current) && (Bt.current?.(re), Ft.current?.(re));
      }, 150);
    },
    onFocus: () => {
      N?.();
    },
    onBlur: () => {
      if (ht.current && (clearTimeout(ht.current), ht.current = null, H && !H.isDestroyed)) {
        const U = H.getHTML();
        if ((Bt.current || Ft.current) && (Bt.current?.(U), Ft.current?.(U)), He.current === "wysiwyg" && Yn.current) {
          const re = Yn.current.turndown(U);
          mt.current = re, Fo.current?.(re);
        }
      }
      A?.();
    },
    onSelectionUpdate: ({ editor: U }) => {
      if (P) {
        const { from: re, to: pe, empty: ve } = U.state.selection;
        P({ from: re, to: pe, empty: ve });
      }
    }
  });
  Z(() => () => {
    if (ht.current && (clearTimeout(ht.current), ht.current = null, H && !H.isDestroyed)) {
      const U = H.getHTML();
      if ((Bt.current || Ft.current) && (Bt.current?.(U), Ft.current?.(U)), He.current === "wysiwyg" && Yn.current) {
        const re = Yn.current.turndown(U);
        mt.current = re, Fo.current?.(re);
      }
    }
  }, []);
  const [za, Tr] = j(!1), [bu, wu] = j(!1), xu = q !== void 0 ? q : bu, At = F((U) => {
    wu(U), K?.(U);
  }, [K]), [ku, Uo] = j(0), [Cu, Mu] = j(""), gt = ox(H, {
    storageKey: p,
    debounceMs: h,
    enabled: f,
    onSave: (U) => {
      _?.(U);
    },
    onRecover: (U) => {
      z?.(U);
    }
  }), Rt = Hx();
  Yn.current = Rt;
  const Ba = V(!1);
  Z(() => {
    if (!Ba.current && C === "markdown" && H && !H.isDestroyed && Rt) {
      const U = H.getHTML(), re = Rt.turndown(U);
      Fn(re), mt.current = re, Ba.current = !0;
    }
  }, [H, Rt, C]);
  const nt = F(async (U) => {
    if (H) {
      if (U === "markdown" && He.current === "wysiwyg") {
        const re = H.getHTML(), pe = Rt.turndown(re);
        Fn(pe), mt.current = pe;
      } else if (U === "wysiwyg" && He.current === "markdown") {
        const { marked: re } = await import("./marked.esm-Tjr8Gfse.js"), pe = (rt) => re.parse(rt, { async: !1, breaks: !0 }), ve = {
          enableTagAutoDetect: kr,
          disableTagPills: !!$.tagPills,
          isValidTag: hn,
          normalizeTag: Jn,
          parseDateFromMarkdown: Kt,
          getDateVariant: ia
        }, Ne = bx(mt.current, pe, ve);
        queueMicrotask(() => {
          H.isDestroyed || H.commands.setContent(Ne);
        });
      }
      _e(U), He.current = U, T?.(U);
    }
  }, [H, Rt, T]), Fa = F((U) => {
    Fn(U), mt.current = U, o?.(U);
  }, [o]), Ut = ax(H, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: d
  });
  $u(ye, () => ({
    getEditor: () => H,
    getHTML: () => H?.getHTML() || "",
    getMarkdown: () => H ? Rt.turndown(H.getHTML()) : "",
    getText: () => H?.getText() || "",
    setContent: (U) => {
      H && !H.isDestroyed && queueMicrotask(() => {
        H.commands.setContent(U);
      });
    },
    clearContent: () => {
      H && !H.isDestroyed && H.commands.clearContent();
    },
    focus: (U) => {
      H && !H.isDestroyed && H.commands.focus(U);
    },
    blur: () => {
      H && !H.isDestroyed && H.commands.blur();
    },
    isEmpty: () => H?.isEmpty || !0,
    isFocused: () => H?.isFocused || !1,
    getMode: () => He.current,
    setMode: (U) => nt(U),
    toggleMode: () => {
      const U = He.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return nt(U), U;
    },
    getWordCount: () => ({
      words: Ut.words,
      characters: Ut.characters,
      charactersWithSpaces: Ut.charactersWithSpaces
    }),
    undo: () => H?.commands.undo(),
    redo: () => H?.commands.redo(),
    canUndo: () => H?.can().undo() || !1,
    canRedo: () => H?.can().redo() || !1,
    insertContent: (U) => H?.commands.insertContent(U),
    insertImage: (U, re = "") => H?.commands.setImage({ src: U, alt: re }),
    insertTable: (U = 3, re = 3) => H?.commands.insertTable({ rows: U, cols: re, withHeaderRow: !0 }),
    insertCodeBlock: (U) => {
      U ? H?.commands.setCodeBlock({ language: U }) : H?.commands.setCodeBlock();
    },
    insertCallout: (U = "info") => H?.commands.insertCallout?.({ type: U }),
    insertHorizontalRule: () => {
      H && qr(H, H.state.selection.from, H.state.selection.from);
    },
    toggleBold: () => H?.commands.toggleBold(),
    toggleItalic: () => H?.commands.toggleItalic(),
    toggleUnderline: () => H?.commands.toggleUnderline(),
    toggleStrike: () => H?.commands.toggleStrike(),
    toggleCode: () => H?.commands.toggleCode(),
    toggleHighlight: () => H?.commands.toggleHighlight(),
    setHeading: (U) => {
      U === 0 ? H?.commands.setParagraph() : H?.commands.setHeading({ level: U });
    },
    toggleBulletList: () => H?.commands.toggleBulletList(),
    toggleOrderedList: () => H?.commands.toggleOrderedList(),
    toggleTaskList: () => H?.commands.toggleTaskList(),
    toggleBlockquote: () => H?.commands.toggleBlockquote(),
    setLink: (U) => H?.commands.setLink({ href: U }),
    unsetLink: () => H?.commands.unsetLink(),
    openFindReplace: () => {
      At(!0), Uo((U) => U + 1);
    },
    closeFindReplace: () => At(!1),
    save: () => gt.save(),
    clearSavedContent: () => gt.clear(),
    getSelectedText: () => {
      if (!H) return "";
      const { from: U, to: re } = H.state.selection;
      return H.state.doc.textBetween(U, re, " ");
    },
    isEditable: () => H?.isEditable || !1,
    setEditable: (U) => H?.setEditable(U),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!H) return [];
      const U = [];
      return H.state.doc.descendants((re, pe) => {
        if (re.type.name === "heading") {
          const ve = re.attrs.level, Ne = re.textContent.trim();
          Ne && U.push({ id: `toc-heading-${pe}`, text: Ne, level: ve, pos: pe });
        }
      }), U;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (U) => {
      if (!(!H || H.isDestroyed))
        try {
          const re = H.state.doc.resolve(U), pe = H.view.nodeDOM(re.before(re.depth + 1));
          if (pe instanceof HTMLElement) {
            const ve = H.view.dom.closest(".editor-content-wrapper");
            if (ve) {
              const Ne = ve.getBoundingClientRect(), Yt = pe.getBoundingClientRect().top - Ne.top + ve.scrollTop;
              ve.scrollTo({ top: Yt - 20, behavior: "smooth" });
            } else
              pe.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          H.commands.setTextSelection(U + 1);
        } catch {
        }
    }
  }), [H, Rt, nt, Ut, gt, At]), Z(() => {
    const U = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => He.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (re) => {
        if (re !== "wysiwyg" && re !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        nt(re);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const re = He.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return nt(re), re;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        nt("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        nt("markdown");
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
      onModeChange: (re) => {
        const pe = (ve) => {
          re(ve.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", pe), () => window.removeEventListener("paragon-editor-mode-change", pe);
      }
    };
    return window.__paragonEditorModeAPI = U, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [nt]), Z(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: me } }));
  }, [me]);
  const Su = Zt(() => ({
    openLinkPopover: () => Tr(!0),
    openFindReplace: (U) => {
      U && Mu(U), At(!0), Uo((re) => re + 1);
    },
    openFindReplaceWithReplace: () => {
      At(!0);
    }
  }), [At]);
  Wx(H, se, Su);
  const Ua = F((U, re) => {
    if (!Cr) {
      Aa.current?.();
      return;
    }
    if (!H) return;
    let pe = { top: 0, left: 0 };
    if (re) {
      const ve = re.getBoundingClientRect();
      pe = { top: ve.bottom + 4, left: ve.left };
    } else {
      const { from: ve, to: Ne } = H.state.selection, rt = H.view.coordsAtPos(ve), Yt = H.view.coordsAtPos(Ne);
      pe = { top: Yt.bottom + 8, left: (rt.left + Yt.left) / 2 };
    }
    Ho({ scope: U, position: pe });
  }, [Cr, H]), Tu = F((U, re) => {
    if (!H || !tt) return;
    const pe = tt.find((Ru) => Ru.id === U);
    if (!pe) return;
    const { from: ve, to: Ne } = H.state.selection, rt = ve !== Ne ? H.state.doc.textBetween(ve, Ne, `
`) : "", Yt = pe.scope === "document" || !rt ? H.getText() : rt, Va = H.view.coordsAtPos(ve), Ka = H.view.coordsAtPos(Ne);
    du({
      selectionTop: Va.top,
      selectionBottom: Ka.bottom,
      selectionCenterX: (Va.left + Ka.right) / 2
    }), Ho(null), Mr(U, pe.label, Yt, { from: ve, to: Ne }, re);
  }, [H, tt, Mr]), Eu = F(() => {
    if (!H || Be.status !== "complete") return;
    const { selectionRange: U, result: re } = Be;
    H.chain().focus().setTextSelection(U).deleteSelection().insertContent(re).run(), Nt();
  }, [H, Be, Nt]), Du = F(() => {
    if (!H || Be.status !== "complete") return;
    const { selectionRange: U, result: re } = Be;
    H.chain().focus().setTextSelection(U.to).insertContent(`
` + re).run(), Nt();
  }, [H, Be, Nt]), Nu = F(() => {
    if (!(Be.status !== "complete" && Be.status !== "error"))
      if (Be.status === "complete") {
        const { action: U, actionLabel: re, inputText: pe, selectionRange: ve } = Be;
        Nt(), Mr(U, re, pe, ve);
      } else
        Nt();
  }, [Be, Nt, Mr]);
  if (!H)
    return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: /* @__PURE__ */ R("div", { className: "editor-loading", style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
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
      editor: H,
      onOpenLinkPopover: () => Tr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        At(!0), Uo((U) => U + 1);
      },
      disabledFeatures: $,
      autoReorderChecklist: Lo,
      aiEnabled: Cr || !!ae,
      onAISparklesClick: (U) => Ua("document", U)
    }
  ), ja = /* @__PURE__ */ R("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ m(
      ix,
      {
        status: gt.status,
        lastSaved: gt.lastSaved
      }
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ R("span", { children: [
      Ut.words,
      " words"
    ] }) })
  ] }), Au = {
    minHeight: W,
    ...Y && { maxHeight: Y, overflowY: "auto" }
  };
  return /* @__PURE__ */ R("div", { className: `markdown-editor-container ${c}`, "data-theme": u, children: [
    f && g && gt.hasRecoverableContent && /* @__PURE__ */ m(
      cx,
      {
        onRecover: () => {
          gt.recover();
        },
        onDismiss: gt.dismissRecovery
      }
    ),
    l && /* @__PURE__ */ R("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      X ? X(H, Ya) : Ya,
      D && /* @__PURE__ */ R("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => nt("wysiwyg"),
            className: `editor-mode-toggle-btn ${me === "wysiwyg" ? "active" : ""}`,
            title: "Visual Editor",
            children: /* @__PURE__ */ m(Mf, {})
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => nt("markdown"),
            className: `editor-mode-toggle-btn ${me === "markdown" ? "active" : ""}`,
            title: "Raw Markdown",
            children: /* @__PURE__ */ m(Zs, {})
          }
        )
      ] })
    ] }),
    !se && /* @__PURE__ */ m(
      J0,
      {
        editor: H,
        isOpen: xu,
        onClose: () => At(!1),
        focusTrigger: ku,
        initialSearchQuery: Cu,
        editorMode: me,
        rawMarkdown: ue,
        onRawMarkdownChange: Fa,
        onMatchesChange: gu
      }
    ),
    /* @__PURE__ */ m(nx, { editor: H }),
    /* @__PURE__ */ R("div", { className: `editor-main-area ${xe ? "editor-with-toc" : ""}`, children: [
      xe && nn === "left" && /* @__PURE__ */ m(
        Ji,
        {
          editor: H,
          visible: De,
          onVisibilityChange: Ve,
          title: Dt,
          minLevel: Hn,
          maxLevel: Wn,
          showLevelIndicators: yr,
          highlightActive: vr,
          treeView: br,
          width: wr,
          position: nn,
          scrollOffset: zn,
          onItemClick: rn,
          renderItem: on,
          showToggleButton: xr,
          scrollContainerRef: pt
        }
      ),
      /* @__PURE__ */ R(
        Sx,
        {
          resetKey: `${t}-${Un}`,
          onRetry: () => Na((U) => U + 1),
          onClearContent: () => {
            H && H.commands.clearContent(), n?.(""), r?.(""), o?.(""), Na((U) => U + 1);
          },
          onError: _o,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: pt, style: Au, children: me === "wysiwyg" ? /* @__PURE__ */ R(Ee, { children: [
              /* @__PURE__ */ m(Iu, { editor: H, className: "editor-content" }),
              !$.images && !$.dragAndDrop && /* @__PURE__ */ m(wx, { containerRef: pt, enabled: i }),
              !se && y && /* @__PURE__ */ m(om, { editor: H, suppressWhenLinkPopoverOpen: za, aiEnabled: Cr || !!ae, onAISparklesClick: (U) => Ua("selection", U) }),
              $o && tt && /* @__PURE__ */ m(
                Ax,
                {
                  actions: tt,
                  scope: $o.scope,
                  position: $o.position,
                  onAction: Tu,
                  onClose: () => Ho(null)
                }
              ),
              Be.status !== "idle" && /* @__PURE__ */ m(
                Rx,
                {
                  state: Be,
                  position: lu,
                  onReplace: Eu,
                  onInsert: Du,
                  onRetry: Nu,
                  onDiscard: () => {
                    cu(), Nt();
                  }
                }
              ),
              !$.slashCommands && /* @__PURE__ */ m(fy, { editor: H, disabledFeatures: $ }),
              !$.wikiLinks && Wo.current && /* @__PURE__ */ m(
                yy,
                {
                  editor: H,
                  onSearch: Wo.current
                }
              ),
              /* @__PURE__ */ m(
                tm,
                {
                  editor: H,
                  isOpen: za,
                  onClose: () => Tr(!1)
                }
              ),
              !se && /* @__PURE__ */ m(
                nm,
                {
                  editor: H,
                  onEditLink: () => Tr(!0)
                }
              ),
              !$.images && an?.isOpen && /* @__PURE__ */ m(
                xx,
                {
                  src: an.src,
                  alt: an.alt,
                  position: an.position,
                  onSave: (U, re) => {
                    H.chain().focus().setNodeSelection(an.pos).updateAttributes("resizableImage", {
                      src: U,
                      alt: re
                    }).run(), Sr(null);
                  },
                  onDelete: () => {
                    H.chain().focus().setNodeSelection(an.pos).deleteSelection().run(), Sr(null);
                  },
                  onClose: () => Sr(null)
                }
              )
            ] }) : /* @__PURE__ */ m(
              kx,
              {
                content: ue,
                onChange: Fa,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: fu,
                currentMatchIndex: pu,
                autoClosePairs: No
              }
            ) }),
            /* @__PURE__ */ m(Tx, { scrollContainerRef: pt })
          ]
        }
      ),
      xe && nn === "right" && /* @__PURE__ */ m(
        Ji,
        {
          editor: H,
          visible: De,
          onVisibilityChange: Ve,
          title: Dt,
          minLevel: Hn,
          maxLevel: Wn,
          showLevelIndicators: yr,
          highlightActive: vr,
          treeView: br,
          width: wr,
          position: nn,
          scrollOffset: zn,
          onItemClick: rn,
          renderItem: on,
          showToggleButton: xr,
          scrollContainerRef: pt
        }
      )
    ] }),
    d && (ee ? ee(
      { words: Ut.words, characters: Ut.characters },
      gt.status,
      ja
    ) : ja),
    /* @__PURE__ */ m(Mx, { visible: Ao, onClose: Ro, editor: H })
  ] });
}), iC = mo.create({
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
}), au = {
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
}, m1 = {
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
}, p1 = {
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
}, h1 = {
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
}, Zn = {
  dark: au,
  light: m1,
  sepia: p1,
  nord: h1
};
function g1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function cC(e, t, n, r) {
  const o = Zn[e] || au;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const iu = uc(null);
function lC({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = j(t), s = Zn[r] || Zn.dark, i = F((c) => {
    Zn[c] && o(c);
  }, []);
  Z(() => {
    n?.current && g1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(Zn)
  };
  return /* @__PURE__ */ m(iu.Provider, { value: a, children: e });
}
function dC() {
  const e = fc(iu);
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
function uC({ node: e, updateAttributes: t }) {
  const [n, r] = j(!1), o = e.attrs.language || "plaintext";
  lc.find((i) => i.value === o)?.label;
  const s = F(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ R(Mn, { className: "code-block-wrapper", children: [
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
        /* @__PURE__ */ m($t, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(Nn, { size: 14 }) : /* @__PURE__ */ m(An, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m($s, {}) }) })
  ] });
}
export {
  ix as AutoSaveIndicator,
  iC as Callout,
  Ak as CalloutInputRule,
  uC as CodeBlockComponent,
  Sk as CollapsibleHeading,
  ik as CollapsibleList,
  ry as DatePill,
  lC as EditorThemeProvider,
  Q0 as EditorToolbar,
  J0 as FindReplace,
  om as FloatingToolbar,
  wx as ImageDropZone,
  d1 as ImageUpload,
  aC as MarkdownEditor,
  Dk as MarkdownLinkInputRule,
  kk as MarkdownPasteSafe,
  tk as MixedBulletList,
  sk as MixedListItem,
  nk as MixedOrderedList,
  ok as MixedTaskItem,
  rk as MixedTaskList,
  cx as RecoveryBanner,
  mk as ResizableImage,
  Rk as SearchHighlight,
  nx as SelectAllActionBar,
  n1 as SelectAllOccurrences,
  fy as SlashCommands,
  Pk as TabIndent,
  Ji as TableOfContents,
  ay as TagPill,
  hk as WikiLinkSafe,
  g1 as applyTheme,
  cC as createCustomTheme,
  au as darkTheme,
  ia as getDateVariant,
  hn as isValidTag,
  m1 as lightTheme,
  ck as loadLanguageIfNeeded,
  we as lowlight,
  h1 as nordTheme,
  Jn as normalizeTag,
  Kt as parseDateFromMarkdown,
  p1 as sepiaTheme,
  Zn as themes,
  ox as useAutoSave,
  dC as useEditorTheme,
  ax as useWordCount
};
//# sourceMappingURL=paragon.js.map
