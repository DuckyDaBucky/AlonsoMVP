# Ai.lonso Dashboard - Component Architecture

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Main layout and page structure
│   │   ├── AilonsoDashboard.tsx    # Root dashboard component
│   │   ├── Header.tsx              # Logo, title, Monaco GP info
│   │   └── Footer.tsx              # Tagline
│   │
│   ├── fan-activity/       # Fan engagement tracking
│   │   ├── FanActivityCard.tsx     # Collapsible activity feed
│   │   └── FanActivityItem.tsx     # Individual activity entry
│   │
│   ├── telemetry/          # Race data visualization
│   │   ├── TelemetryCard.tsx       # Main telemetry container
│   │   ├── MonacoTrackVisual.tsx   # Animated circuit map
│   │   └── TeamStandings.tsx       # Constructor standings
│   │
│   ├── interactive/        # User engagement features
│   │   ├── TriviaCard.tsx          # Quiz component
│   │   ├── FanPollCard.tsx         # Live poll with bar charts
│   │   └── RewardProgressCard.tsx  # Tier progress & team stats
│   │
│   ├── chatbot/            # AI assistant interface
│   │   ├── ChatbotPanel.tsx        # Main chat container
│   │   ├── ChatMessage.tsx         # Individual message bubble
│   │   └── DriverStatsCard.tsx     # F1 car & Alonso stats
│   │
│   └── ui/                 # Reusable primitives
│       └── Card.tsx                # Glassmorphic card wrapper
│
├── hooks/                  # Custom React hooks
│   ├── useFanActivity.ts           # Auto-updating fan feed
│   └── useChat.ts                  # Chat state management
│
├── types/                  # TypeScript definitions
│   └── dashboard.ts                # All interfaces & types
│
└── data/                   # Constants and mock data
    └── constants.ts                # Colors, telemetry, standings

```

## 🎯 Design Principles

### 1. **Separation of Concerns**
Each component has a single, clear responsibility:
- Layout components handle structure
- Feature components manage domain logic
- UI components provide reusable primitives
- Hooks encapsulate stateful behavior
- Types centralize type definitions
- Data provides constants

### 2. **Composability**
Components are designed to be:
- Small and focused
- Reusable across contexts
- Easy to test in isolation
- Self-contained with clear props

### 3. **Type Safety**
- All components use TypeScript
- Interfaces defined in `/types`
- No implicit `any` types
- Props fully typed

### 4. **Performance**
- Custom hooks prevent prop drilling
- Memoization where appropriate
- Framer Motion for smooth animations
- Auto-cleanup of intervals/effects

## 🎨 Design System

### Colors
- **Primary**: `#00C39A` (Aston Martin teal)
- **Secondary**: `#00B0A9` (Cognizant blue-green)
- **Accent**: `#00E0FF` (Electric blue for telemetry)
- **Background**: `#000000` → `#050505` (AMOLED black gradient)
- **Cards**: `#0A0A0A` (Carbon black)

### Typography
- **Headings**: Lexend (bold, white 90%)
- **Body**: Inter (white 70-80%)
- **Accents**: Gradient from `#00C39A` to `#00B0A9`

### Card Styling
- Glassmorphic background: `bg-[#0A0A0A]`
- Double borders: `border-[#00B0A9]/20` + `inset border-[#00B0A9]/5`
- Garage glow: Animated teal underlight on hover
- Rounded corners: `rounded-xl`
- Backdrop blur for depth

## 🔧 Component Patterns

### Card Wrapper
```tsx
<Card delay={0.3}>
  {/* Your content */}
</Card>
```

### Collapsible Sections
```tsx
const [isExpanded, setIsExpanded] = useState(true);
// Use AnimatePresence for smooth transitions
```

### Custom Hooks
```tsx
const activities = useFanActivity(); // Auto-updates every 10s
const { messages, sendMessage } = useChat(); // Chat state
```

## 📝 Adding New Features

### 1. New Interactive Card
1. Create component in `/components/interactive/`
2. Import in `AilonsoDashboard.tsx`
3. Add to center column grid
4. Use `<Card>` wrapper for styling consistency

### 2. New Data Source
1. Add interface to `/types/dashboard.ts`
2. Add mock data to `/data/constants.ts`
3. Create custom hook in `/hooks/` if stateful
4. Import and use in component

### 3. New Animation
1. Use Framer Motion's `motion` components
2. Follow existing patterns for consistency
3. Keep duration reasonable (0.3-0.5s for micro-interactions)

## 🚀 Best Practices

1. **Props over Context** - Pass data explicitly for clarity
2. **Hooks for Reuse** - Extract repeated logic to custom hooks
3. **TypeScript Strict** - No `any`, all types defined
4. **Comments** - Each file has purpose comment at top
5. **Naming** - Descriptive, follows React conventions
6. **Styling** - Inline Tailwind, no CSS modules
7. **Performance** - Clean up effects, avoid unnecessary re-renders

## 🔄 State Flow

```
User Interaction
    ↓
Component State Change
    ↓
Optional: Custom Hook Update
    ↓
Optional: Callback to Parent (e.g., addBotMessage)
    ↓
Re-render with Animation
```

## 🎭 Animations

- **Entry**: `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`
- **Stagger**: Use `delay` prop with index multiplier
- **Infinite**: Underline pulse, racing line, typing dots
- **Layout**: `AnimatePresence` for mount/unmount
- **Transitions**: 0.3-0.5s for micro, 1-2s for ambient

## 📊 Data Flow

1. **Constants** → Defined in `/data/constants.ts`
2. **State** → Managed in components or custom hooks
3. **Props** → Passed down component tree
4. **Callbacks** → Passed up for parent updates

---

**Last Updated**: Refactored from monolithic component (850+ lines) to modular architecture (15+ focused components)

**Maintainability Score**: Production-grade, ready for team collaboration

