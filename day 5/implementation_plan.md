# AI Smart Nutrition & Meal Planner - UI Redesign

The goal is to totally revamp the frontend of the application to look like a premium, modern SaaS product focused on health and fitness. This requires significantly enhancing the color scheme, layout, component architecture, and adding rich micro-interactions and animations.

## Proposed Changes

### Dependencies and Setup
- Install dependencies: `framer-motion`, `clsx`, `tailwind-merge` for animated and dynamic components.
- Update `tailwind.config.js` to include the requested color palette (Green `#22C55E`, Orange `#F97316`, Blue `#3B82F6`) and add gradient background utilities.

---
### Global Styles and Layout
#### [MODIFY] index.css
- Add glassmorphism utilities.
- Add base background textures or gradient definitions to support light/dark modes (soft pastel blends).
- Add custom scrollbar hiding/styling.

#### [MODIFY] Navbar.jsx
- Revamp the navigation bar to have a glassmorphic sticky top.
- Add active states for routes.
- Introduce hover effects with soft glow.

---
### Home & Landing Page
#### [MODIFY] Home.jsx
- Wrap the main hero in Framer Motion `<motion.div>` for fade-in and slide-up animations.
- Redesign the call-to-action button with a pulsing/glowing gradient and scaling hover interaction.
- Incorporate overlapping transparent circular divs with the theme colors (Green/Orange/Blue) to create an modern abstract blurred background.
- Build feature cards using `framer-motion` for stagger-in effects.

---
### Smart Input Form
#### [MODIFY] PlannerInput.jsx
- Convert boring dropdowns/radio buttons into a grid of selectable cards (e.g., Weight Loss, Muscle Gain).
- Use `framer-motion` to animate the selection state (scale up, border color change, drop shadow).
- Add skeleton states for loading when the user submits the form to generate the meal plan, rather than a generic spinner.
- Implement toast notification on success.

---
### Meal Plan Dashboard
#### [MODIFY] Dashboard.jsx
- Transform the meal cards into interactive elements where `onHover` scales the card slightly.
- Add mock food images or rich colorful placeholders alongside the text.
- Render nutrition analytics via Recharts with vibrant line/bar charts (Calories breakdown, Macronutrients).
- Add colorful nutrition tags for specific meal types (e.g. "Low Carb", "High Protein").
- Include a "Recipe Viewer" modal or slide-over with an ingredients checklist and beautiful headers.

---
### AI Chatbot Interface
#### [MODIFY] Chatbot.jsx
- Redesign the chat layout to resemble a modern messaging app (WhatsApp/iMessage).
- Give user messages a blue or green gradient bubble.
- Add typing animation indicator using framer motion when the "AI Nutritionist" is "thinking".
- Present suggested questions as clickable chips above the input area to guide user interaction.

## Open Questions

> [!WARNING]
> Please confirm if you would like me to use `shadcn-ui` primitives, or manually implement the required styling/components utilizing Tailwind CSS (which is generally faster to build bespoke colorful designs in this environment). The plan assumes I will manually build elegant tailwind+framer components to precisely hit your design criteria, while still importing Recharts and Framer Motion. 

## Verification Plan

### Automated Tests
- Build Step Check: Ensure `npm run build` passes with no ESLint/Vite errors.

### Manual Verification
- Launch both Frontend and Backend locally.
- Review visual layout on the Landing Page.
- Step through the flow: Input form -> Loading State -> Dashboard / Recipes -> Chatbot
- Verify Framer Motion animations trigger seamlessly.
