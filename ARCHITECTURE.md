# OrbitX Architecture

## Overview

OrbitX is a single-page application (SPA) built with React and Vite, featuring a space-themed mining game with real-time statistics, resource management, and social gameplay mechanics.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Browser (Client)                      │
├─────────────────────────────────────────────────────────┤
│  React App (SPA)                                        │
│  ├─ Views (Dashboard, Factions, Market, etc.)          │
│  ├─ Components (Navigation, Modals, UI)                │
│  ├─ State Management (React Hooks)                     │
│  └─ Animations (Motion.js)                             │
└─────────────────────────────────────────────────────────┘
         │
         │ Future: API Calls
         ↓
┌─────────────────────────────────────────────────────────┐
│          Express Backend (Optional)                     │
│  ├─ Authentication                                     │
│  ├─ Database (PostgreSQL, MongoDB)                     │
│  ├─ Real-time Events (WebSockets)                      │
│  └─ External Integrations                              │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
OrbitX/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Navigation.tsx     # Main navigation bar
│   │   ├── WalletModal.tsx    # Wallet modal overlay
│   │   └── ...               # Other UI components
│   │
│   ├── views/                # Full-page view components
│   │   ├── Dashboard.tsx      # Main dashboard with mining stats
│   │   ├── Factions.tsx       # Faction selection and info
│   │   ├── Market.tsx         # Equipment and items marketplace
│   │   ├── Profile.tsx        # User profile and settings
│   │   ├── Tasks.tsx          # Daily/global tasks
│   │   ├── Events.tsx         # Live events participation
│   │   ├── Roadmap.tsx        # Development roadmap
│   │   ├── Admin.tsx          # Admin dashboard
│   │   └── Login.tsx          # Authentication
│   │
│   ├── types.ts              # TypeScript interfaces and types
│   ├── App.tsx               # Root component with routing
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles & Tailwind imports
│
├── public/                   # Static assets
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── prettier.config.js        # Code formatting rules
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variable template
└── README.md                 # Project documentation
```

## State Management

### Current Approach: React Hooks
The app uses `useState` and `useEffect` hooks for state management:

```tsx
// User authentication state
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userRole, setUserRole] = useState<'user' | 'admin' | 'manager'>('user');

// Game state
const [stats, setStats] = useState<UserStats>({
  balance: 142.55,
  miningPower: 125,
  energy: 65,
  // ... other properties
});

// UI state
const [currentView, setCurrentView] = useState<ViewState>("dashboard");
const [isWalletOpen, setIsWalletOpen] = useState(false);
```

### Future: Redux or Zustand
For complex state management, consider:
- **Redux Toolkit** - Large apps with complex state
- **Zustand** - Lightweight state management
- **Jotai/Recoil** - Atom-based state

## Data Flow

```
User Action (click button) 
    ↓
Event Handler (onClick, onChange)
    ↓
State Update (setStats, setCurrentView)
    ↓
Component Re-render
    ↓
DOM Update (browser paints)
```

### Real-Time Mining Simulation
```tsx
useEffect(() => {
  if (stats.energy > 0 && stats.reactorHeat < 100) {
    const interval = setInterval(() => {
      setStats(prev => {
        // Calculate heat, stability, mining rate
        // Update balance based on efficiency
        return { ...prev, updated_properties };
      });
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }
}, [stats.energy, stats.reactorHeat]);
```

## Core Game Mechanics

### Mining System
- **Mining Power** - Base earning rate
- **Efficiency** - Multiplier on mining power
- **Reactor Heat** - Increases during mining, affects stability
- **Reactor Stability** - Decreases if heat is too high, affects efficiency
- **Effective Rate** = (miningPower × efficiency × stability) / 3600

### Energy System
- Energy drains during mining (-0.2 per second)
- Energy regenerates when idle
- Max energy = 100 units
- Mining stops at 0 energy

### Progression
- **XP** - Earned from tasks and events
- **Rank** - Determined by XP level
- **Streak** - Consecutive check-ins grant multipliers
- **Trust Score** - User reputation metric
- **Prime Tier** - Subscription levels (basic, elite, mythic)

## UI/UX Design

### Theme
- **Color Scheme** - Dark slate background (slate-950) with cyan/purple accents
- **Typography** - Inter (UI), JetBrains Mono (code)
- **Effects** - Glassmorphism (backdrop blur), animated gradients, scanlines

### Components
- **Navigation** - Bottom-fixed navigation bar
- **Modals** - Draggable wallet widget, overlay modals
- **Cards** - Stat cards with gradient backgrounds
- **Charts** - Recharts for data visualization

## Performance Optimizations

### Current
- **Vite** - Instant HMR, optimized bundles
- **React 19** - Automatic batching, Suspense
- **Tailwind CSS** - Only generates used styles
- **Code Splitting** - Vendor chunks separated in build

### Recommended
- **Lazy Loading** - `React.lazy()` for views
- **Memoization** - `React.memo()` for expensive components
- **Image Optimization** - WebP, responsive sizes
- **Service Workers** - Offline support, caching

## Security Considerations

### Current
- Environment variables for sensitive config
- Client-side state (no backend yet)
- Type safety with TypeScript

### Future (With Backend)
- **Authentication** - JWT tokens, secure sessions
- **Authorization** - Role-based access control (RBAC)
- **Data Validation** - Input sanitization, type checking
- **CORS** - Restrict API access
- **Rate Limiting** - Prevent abuse
- **HTTPS** - Encrypted communication

## Testing Strategy

### Unit Tests
```tsx
// Test individual components and functions
describe('Dashboard', () => {
  it('should display mining stats', () => {
    // Test rendering
  });
  
  it('should update balance on mining', () => {
    // Test state updates
  });
});
```

### Integration Tests
```tsx
// Test component interactions
describe('Mining System', () => {
  it('should drain energy and increase heat', () => {
    // Test useEffect logic
  });
});
```

### E2E Tests
```bash
# Test entire user flows
npx cypress run
```

## Deployment

### Vercel/Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Environment Variables
```env
# Production
VITE_API_URL=https://api.orbitx.com
VITE_ENABLE_ANALYTICS=true
```

## Future Roadmap

### Phase 1: Backend Integration
- RESTful API for data persistence
- User authentication and profiles
- Real-time WebSocket events

### Phase 2: Social Features
- Guilds/Factions with shared vaults
- Player-to-player messaging
- Leaderboards and rankings

### Phase 3: Advanced Gameplay
- Dynamic economy (supply/demand)
- Seasonal events and battles
- Companion/drone system progression

### Phase 4: Monetization
- Premium subscription tiers
- In-app shop integration
- Battle pass system

## Dependencies Overview

| Dependency | Version | Purpose |
|-----------|---------|---------|
| react | ^19.0.1 | UI framework |
| vite | ^6.2.3 | Build tool & dev server |
| typescript | ~5.8.2 | Type safety |
| tailwindcss | ^4.1.14 | Utility-first CSS |
| motion | ^12.23.24 | Animations & gestures |
| recharts | ^3.8.1 | Data visualization |
| lucide-react | ^0.546.0 | Icon library |
| express | ^4.21.2 | Backend framework (optional) |

## Development Workflow

1. **Feature Branch** - Create from `main`
2. **Development** - `npm run dev`
3. **Type Check** - `npm run lint`
4. **Format** - `npm run format`
5. **Build Test** - `npm run build`
6. **Pull Request** - Create with description
7. **Review & Merge** - Deploy to production

## Troubleshooting

### HMR Issues
```bash
# Disable HMR for AI Studio
DISABLE_HMR=true npm run dev
```

### Type Errors
```bash
# Check all type errors
npm run type-check
```

### Build Failures
```bash
# Clean and rebuild
npm run clean && npm run build
```

---

**Last Updated:** 2026-09-06  
**Maintained By:** OrbitX Team
