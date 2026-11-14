# Architecture & Project Guidelines

This document outlines the architectural rules, directory structures, and design principles enforced across this project. All team members and contributors should adhere to these conventions to keep the codebase maintainable, scalable, and modular.

---

## SOLID Principles in Frontend Architecture

We apply the **SOLID** design principles tailored for a modern Next.js / React application:

### 1. Single Responsibility Principle (SRP)
- Each component, hook, or utility file must do **one thing and do it well**.
- Separate presentation (visual rendering) from business logic and side effects (extracted into custom hooks).
- Avoid monolithic components that manage data fetching, complex state, styling, and animations all at once.

### 2. Open / Closed Principle (OCP)
- Components and layouts should be **open for extension, but closed for modification**.
- Use props, compound components, or slot patterns (`children`, `renderProps`) to extend component behavior without having to alter their internal implementation.

### 3. Liskov Substitution Principle (LSP)
- Sub-components and variant components must adhere to their expected contracts and interfaces.
- Custom inputs, buttons, and display cards should extend standard HTML element interfaces (e.g., `React.ComponentPropsWithoutRef<"button">`) so that consumers can interchange them reliably.

### 4. Interface Segregation Principle (ISP)
- Components and hooks should not be forced to depend on props or interfaces they do not consume.
- Prefer focused, lightweight prop interfaces rather than passing huge aggregate domain objects to leaf components.

### 5. Dependency Inversion Principle (DIP)
- High-level sections and pages should depend on abstractions (interfaces, composable hooks, reusable slots), not hardcoded low-level implementation details.
- For example, high-level layouts receive dynamic content via `children` or slot props rather than coupling themselves directly to concrete internal child components.

---

## Directory Organization & Rules

The project enforces structured subfolder grouping based on **functionality** across four primary architectural layers:

```
personal-portfolio/
├── components/          # Standalone, reusable UI components grouped by feature/functionality
├── layouts/             # Reusable page/structural layouts grouped by functionality
├── sections/            # Composite groups of components serving as plug-and-play sections
├── hooks/               # Custom React hooks grouped by domain/functionality
├── app/                 # Next.js App Router (pages, route handlers, metadata only)
└── ...
```

---

### 1. `components/`
- **Purpose**: Stores generic, atomic, and reusable UI components.
- **Rule**: Must be organized into **subfolders based on functionality**.
- **Examples**:
  - `components/ui/` — Generic primitives (e.g., buttons, modals, badges, inputs).
  - `components/visual/` — Visual rendering elements (e.g., `LiquidCanvas.tsx`, `CanvasLoader.tsx`).
  - `components/navigation/` — Navbar items, breadcrumbs, link cards.
- **Guideline**: Components here should remain context-agnostic and should not make page-specific assumptions.

---

### 2. `layouts/`
- **Purpose**: Stores custom structural skeletons and layouts that define how content and visual layers are arranged.
- **Rule**: Must be organized into **subfolders based on functionality**.
- **Examples**:
  - `layouts/hero/` — Hero screen structures (e.g., `InteractiveHeroLayout.tsx` which layers background WebGL canvases beneath foreground text).
  - `layouts/container/` — Responsive page containers, centered content wrappers, split-screen panels.
  - `layouts/dashboard/` — Sidebar and header grid systems for admin or dashboard views.
- **Guideline**: Layouts should use slots (`children`, `background`, `sidebar`) to remain flexible and open for extension.

---

### 3. `sections/`
- **Purpose**: Groups multiple related components together into a single, cohesive, reusable block.
- **Rule**: Instead of importing and coordinating 5+ separate components in a page, group them into a single section folder with an `index.ts` barrel export.
- **Examples**:
  - `sections/hero/` — Combines the background canvas, loaders, and typography (`HeroInteractiveSection.tsx`).
  - `sections/projects/` — Combines project grids, filter tabs, and modal previews into a unified section.
  - `sections/contact/` — Combines contact form, validation, and social links.
- **Guideline**: Pages in `app/` should ideally be clean compositions of these sections (e.g., `<HeroInteractiveSection />`, `<ProjectsSection />`).

---

### 4. `hooks/`
- **Purpose**: Stores custom React hooks that encapsulate stateful logic, browser APIs, or animations.
- **Rule**: Must be organized into **subfolders based on functionality**.
- **Examples**:
  - `hooks/animation/` — Animation, physics, and canvas lifecycle hooks (e.g., `useWindowResize.ts`, `useLiquidSimulation.ts`).
  - `hooks/ui/` — UI interaction hooks (e.g., `useClickOutside.ts`, `useScrollPosition.ts`, `useMediaQuery.ts`).
  - `hooks/auth/` — Session handling, user state hooks.
- **Guideline**: Keep hooks pure and testable. Export clean TypeScript return types for each hook.

