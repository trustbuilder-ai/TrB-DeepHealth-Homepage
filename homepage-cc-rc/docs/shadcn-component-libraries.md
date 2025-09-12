# Shadcn Component Libraries

## Stack: React + Vite + Tailwind + Radix UI

## Library Comparison

| Library    | Focus    | Components         | Install    | Cost  | React 19 |
| ---------- | -------- | ------------------ | ---------- | ----- | -------- |
| Origin UI  | General  | 300+ variants      | Copy-paste | Free  | Ready    |
| Kibo UI    | Business | Gantt/Kanban       | CLI        | Free  | Ready    |
| MVP Blocks | Landing  | Heroes/CTA         | Copy-paste | Free  | Ready    |
| Skiper/UI  | Premium  | 72+ animated       | CLI        | $129+ | Unknown  |
| Shsf UI    | Motion   | Micro-interactions | Beta       | Free  | Unknown  |
| TweakCN    | Themes   | Visual editor      | Web tool   | Free  | Ready    |

## Recommendations

- **General components**: Origin UI (300+ free variants)
- **Business features**: Kibo UI (Gantt charts, Kanban boards)
- **Landing pages**: MVP Blocks (animations included)
- **Theme editing**: TweakCN (visual CSS var editor)
- **Skip**: Skiper/UI (paid), Shsf UI (beta)

## Implementation

1. **Theme**: TweakCN → customize CSS vars
2. **Core**: Origin UI → copy components
3. **Advanced**: Kibo UI → `npx kibo-ui add [component]`

## Feasibility & Project Fit

**High Feasibility**: Origin UI, TweakCN (copy-paste, zero dependencies)  
**Medium**: Kibo UI (CLI, peer deps), MVP Blocks (Framer Motion)  
**Low**: Skiper/UI (paid, unknown React 19), Shsf UI (beta)

**Current Project**: Homepage with theming → **Origin UI + TweakCN** ideal fit  
**React 19**: Ready libraries only, use `--legacy-peer-deps` for conflicts

See [React 19 Best Practices](react19-best-practices.md) for full migration guide.

## Sources

- [Origin UI](https://originui.com/)
- [Kibo UI](https://www.kibo-ui.com/)
- [MVP Blocks](https://blocks.mvp-subha.me/)
- [Skiper/UI](https://skiper-ui.com/)
- [Shsf UI](https://www.shsfui.com/)
- [TweakCN](https://tweakcn.com/)
