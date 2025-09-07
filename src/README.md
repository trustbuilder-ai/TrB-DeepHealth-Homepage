# TrB-DeepHealth: LLM Mental Health Testing Platform

## 🎯 Purpose

**IMPORTANT**: This is NOT a mental health service. TrB-DeepHealth is a
comprehensive testing platform designed to evaluate whether Large Language
Models (LLMs) can be safely integrated into mental health products.

The platform serves developers, researchers, and healthcare organizations who
need to validate LLM safety and effectiveness before deploying AI in sensitive
mental health contexts.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Navigate to the src directory
cd src

# Install dependencies
npm install

# Start development server
npm run dev

# Or use the custom runner
node run.js dev
```

The development server will start at `http://localhost:3000`

### Available Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run test       # Run tests
npm run lint       # Run ESLint
```

## 🏗️ Architecture

### Project Structure

```text
src/
├── components/           # React components
│   ├── shared/          # Reusable components (Header, ThemeToggle, etc.)
│   ├── testing/         # Testing interface components
│   └── TestingPlatform.tsx
├── pages/               # Route pages
│   ├── Documentation.tsx
│   └── Dashboard.tsx
├── hooks/               # Custom React hooks
│   └── useSafetyDetection.ts
├── store/               # State management (Zustand)
│   └── themeStore.ts
├── styles/              # CSS and styling
│   └── globals.css
├── types/               # TypeScript definitions
│   ├── test.types.ts
│   └── scenario.types.ts
├── config/              # Configuration files
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
└── __tests__/           # Test files
```

### Key Features

#### 🛡️ Safety Testing Engine

- **Crisis Detection**: Identifies language patterns indicating self-harm or
  suicidal ideation
- **Medical Boundary Compliance**: Ensures LLMs don't provide medical
  diagnoses or treatment advice
- **Safety Scoring**: Numerical evaluation (0-100) of response safety and
  appropriateness

#### 📊 Test Scenarios

1. **Crisis Detection**: Multi-turn self-harm detection and intervention
2. **Medical Boundary**: Testing LLM adherence to medical advice limitations
3. **Emotional Support**: Validating appropriate empathy and emotional responses
4. **Harmful Advice**: Detecting and preventing potentially harmful guidance

#### 🎨 Theme System

- **Clinical Trust**: Professional medical interface theme
- **Warm Community**: Approachable, community-focused theme  
- **Dark Mode**: Dark professional interface
- Seamless theme switching with persistent preferences

## 🧪 Testing

### Running Tests

```bash
npm run test
# or
node run.js test
```

### Test Coverage

- Component rendering tests
- Safety detection algorithm validation
- Crisis response evaluation
- Medical boundary testing

## 🎨 Design System

### Colors (CSS Variables)

The platform uses CSS custom properties for theming:

- `--primary`: Primary brand color
- `--secondary`: Secondary brand color  
- `--accent`: Accent color for highlights
- `--destructive`: Error/warning color
- `--background`: Main background
- `--foreground`: Main text color
- `--card`: Card backgrounds
- `--border`: Border color
- `--muted`: Muted text/backgrounds

### Typography

- **Headers**: Montserrat (Clinical Trust) / Lato (Warm Community)
- **Body**: Open Sans
- **Mono**: Space Mono for code/data

## 🚨 Safety & Compliance

### Crisis Management

- **988 Integration**: Automatic display of crisis resources
- **Real-time Detection**: Immediate flagging of crisis language
- **Professional Escalation**: Clear pathways to human intervention

### Privacy & Security  

- **No PHI Storage**: Platform doesn't store personal health information
- **Testing Only**: Designed for evaluation, not treatment
- **Human Oversight**: Emphasizes need for professional supervision

### Regulatory Compliance

- HIPAA considerations documented
- Clear disclaimers about platform limitations
- Professional boundary maintenance

## 🔧 Development

### Configuration

- **Vite**: Fast development build tool
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Lightweight state management
- **React Router**: Client-side routing

### Code Quality

- ESLint for code linting
- TypeScript for type safety
- Component testing with Vitest
- Responsive design principles

## 📚 Documentation

### Available Routes

- `/` - Main testing interface
- `/docs` - Comprehensive documentation  
- `/dashboard` - Testing analytics and metrics

### API Structure (Future)

The platform is designed to support future API integration:

- `POST /api/test/run` - Execute LLM tests
- `GET /api/scenarios/list` - Retrieve test scenarios
- `POST /api/scenarios/custom` - Create custom scenarios
- `GET /api/results/:testId` - Get test results

## ⚠️ Important Disclaimers

1. **Not a Medical Service**: This platform is for testing purposes only
2. **Human Oversight Required**: Always include professional supervision in
   mental health AI
3. **Crisis Escalation**: High-risk situations must route to 988 Lifeline or
   emergency services  
4. **No PHI**: Do not process personal health information during testing
5. **Compliance Responsibility**: Users responsible for healthcare regulation
   compliance

## 🤝 Contributing

This platform is designed for mental health AI safety validation. When
contributing:

1. Prioritize user safety in all features
2. Maintain clear boundaries between testing and treatment
3. Follow established safety detection patterns
4. Test thoroughly, especially safety-critical features
5. Document any changes to safety algorithms

## 📄 License

This project is designed for mental health AI safety research and development.
Please ensure any use aligns with responsible AI development practices and
healthcare regulations.

---

## Emergency Resources

If you or someone you know needs immediate help:

- **Call or Text 988** - Suicide & Crisis Lifeline
- **Chat**: [988lifeline.org](https://988lifeline.org)
- **Emergency**: Call 911

### Testing LLMs for Safe Mental Health Product Development
