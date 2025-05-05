# System Patterns

## System Architecture
- Modular, atomic design for UI components (atoms, molecules, organisms, pages)
- Nuxt 3 for SSR, routing, and module system
- TypeScript for type safety and maintainability
- Pinia for state management
- VueUse for enhanced reactivity

## Key Technical Decisions
- Use of Composition API and <script setup lang="ts"> for all components
- Auto-imports for composables and utilities
- ShadcnUI and Unocss for UI and styling
- Server API endpoints for backend operations

## Design Patterns
- DRY and modular code organization
- Functional, declarative programming
- Composables for shared logic
- Dynamic imports and Suspense for async components

## Component Relationships
- Components organized by atomic design principles
- Shared state via composables and Pinia stores
- UI components consume composables for logic and state 
