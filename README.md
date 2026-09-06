# OrbitX

A space-themed mining game and resource management dashboard built with React, TypeScript, and Vite. Experience strategic gameplay with real-time reactor management, faction warfare, and competitive ranking systems.

## Features

- **Dashboard** - Real-time mining statistics and reactor monitoring
- **Faction System** - Join factions, collaborate, and compete for dominance
- **Roadmap** - Track development goals and milestones
- **Task System** - Complete daily, social, and global tasks for rewards
- **Market** - Buy and sell mining equipment, skins, and battle passes
- **Events** - Participate in global events with limited-time rewards
- **Profile & Progression** - Track rank, XP, streaks, and achievements
- **Admin Dashboard** - Server-level statistics and user management

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Type check
npm run lint

# Format code
npm run format
```

### Production

```bash
# Build for production
npm build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

## Project Structure

```
src/
  components/      React components (Navigation, WalletModal, UI elements)
  views/          Page-level components (Dashboard, Factions, Profile, etc.)
  types.ts        TypeScript type definitions
  App.tsx         Main application component with routing
  main.tsx        React entry point
  index.css       Tailwind CSS configuration

public/           Static assets
index.html        HTML entry point
vite.config.ts    Vite build configuration
tsconfig.json     TypeScript compiler configuration
tailwind.config.ts Tailwind CSS configuration
```

## How It Works

The app uses **client-side state management** with React hooks (`useState`, `useEffect`) to simulate real-time mining operations. Key mechanics:

- **Mining System** - Reactor heat and stability affect mining efficiency
- **Energy System** - Energy drains during active mining and regenerates over time
- **Streak Mechanics** - Consecutive check-ins grant multipliers to earnings
- **Role-Based Access** - Users, managers, and admins have different dashboard views

The app includes an **Express backend** (for future API integration) and a **draggable wallet widget** using the Motion library.

## Architecture

### Frontend Stack
- **React 19** - UI framework with hooks
- **Vite 6** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Motion** - Smooth animations and drag interactions
- **Recharts** - Data visualization

### Styling
- Custom Tailwind theme with cyan/purple gradients
- Grid-based background with subtle scanlines
- Glassmorphic UI elements with backdrop blur
- Responsive mobile-first design

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React hooks patterns for state management
- Keep components small and focused
- Use Tailwind utility classes for styling

### Adding Features
1. Define types in `src/types.ts`
2. Create component in `src/components/` or view in `src/views/`
3. Update `App.tsx` routing if needed
4. Run `npm run lint` to check types

## Environment Variables

Currently supports:
- `DISABLE_HMR` - Disable Hot Module Replacement (set to "true" for AI Studio compatibility)

Future additions for backend integration:
- API endpoint configuration
- Authentication tokens
- Feature flags

## Performance Tips

- **Animations** - Motion library uses GPU acceleration
- **Rendering** - React 19 automatic batching reduces re-renders
- **Styling** - Tailwind CSS generates only used styles
- **Assets** - Vite's code splitting optimizes load times

## Future Roadmap

- [ ] Backend API integration for persistent data
- [ ] WebSocket support for real-time multiplayer events
- [ ] User authentication and profiles
- [ ] Payment/subscription system
- [ ] Mobile app with React Native
- [ ] Advanced analytics dashboard
- [ ] Community features (guilds, messaging)

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

Apache License 2.0 - See LICENSE file for details

## Support

For issues, questions, or suggestions, please open a GitHub issue.
