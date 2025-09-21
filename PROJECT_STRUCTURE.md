# Project Structure

This document provides an overview of the project's file organization and architecture.

## 📁 Root Directory

```
booking-clone/
├── .github/              # GitHub Actions workflows
├── components/           # React components
├── styles/              # Global CSS and styling
├── supabase/            # Backend functions and configuration
├── utils/               # Utility functions and helpers
├── App.tsx              # Main application component
├── package.json         # Project dependencies and scripts
├── README.md           # Project documentation
└── ...config files     # Various configuration files
```

## 🧩 Components Directory

```
components/
├── ui/                  # Reusable UI components (shadcn/ui)
│   ├── button.tsx       # Button component
│   ├── card.tsx         # Card component
│   ├── dialog.tsx       # Modal dialog
│   ├── input.tsx        # Form input
│   └── ...              # Other UI components
├── figma/               # Figma-specific components
│   └── ImageWithFallback.tsx
├── AdminPanel.tsx       # Admin dashboard
├── BookingManagement.tsx # User booking management
├── DealsOffers.tsx      # Deals and offers section
├── EmailVerificationModal.tsx # Email verification
├── FeaturedDestinations.tsx # Featured destinations
├── FeaturesSection.tsx  # Features showcase
├── Footer.tsx           # Site footer
├── Header.tsx           # Site header and navigation
├── HeroSection.tsx      # Hero banner
├── LoginModal.tsx       # Login form modal
├── PaymentPage.tsx      # Payment processing
├── PropertyDetails.tsx  # Property detail view
├── PropertyFilters.tsx  # Search filters
├── PropertyGrid.tsx     # Search results grid
├── RecentSearches.tsx   # Recent searches
├── RegisterModal.tsx    # Registration form
├── ReviewsSection.tsx   # Reviews and ratings
└── SearchForm.tsx       # Search form component
```

### Component Categories

#### 🎨 UI Components (`/ui`)
Base UI components following the shadcn/ui design system:
- **Primitive components**: Button, Input, Card, Dialog
- **Form components**: Checkbox, Radio, Select, Textarea
- **Layout components**: Separator, Tabs, Accordion
- **Data display**: Table, Badge, Progress, Chart
- **Navigation**: Breadcrumb, Pagination, Menu

#### 🖼️ Figma Components (`/figma`)
- **ImageWithFallback**: Image component with fallback handling

#### 📱 Application Components (Root level)
- **Layout**: Header, Footer, HeroSection
- **Authentication**: LoginModal, RegisterModal, EmailVerificationModal
- **Search**: SearchForm, PropertyFilters, PropertyGrid
- **Booking**: PaymentPage, BookingManagement, PropertyDetails
- **Content**: FeaturesSection, DealsOffers, RecentSearches
- **Admin**: AdminPanel (with tabs for overview, scraping, discounts)

## 🗄️ Backend Structure

```
supabase/
└── functions/
    └── server/
        ├── index.tsx        # Main server entry point
        └── kv_store.tsx     # Key-value store utilities
```

### Backend Architecture

#### 🔧 Core Server (`index.tsx`)
- **Framework**: Hono web framework
- **Runtime**: Deno Edge Runtime
- **Features**:
  - CORS configuration
  - Request logging
  - Authentication middleware
  - Rate limiting (planned)

#### 📊 API Endpoints

##### Authentication
- `POST /signup` - User registration

##### Booking & Payment
- `GET /bookings` - Get user bookings
- `POST /process-payment` - Process payments
- `POST /validate-discount` - Validate discount codes

##### Search Services
- `POST /search-flights` - Flight search
- `GET /flights/november-december` - Specific flight data

##### Admin Functions
- `GET /admin/discount-codes` - Get all discount codes
- `POST /admin/discount-codes` - Create discount code
- `PUT /admin/discount-codes/:id` - Update discount code
- `DELETE /admin/discount-codes/:id` - Delete discount code
- `GET /admin/scraping/status` - Get scraping status
- `PUT /admin/scraping/config` - Update scraping config
- `POST /admin/scraping/trigger/:service` - Trigger scraping
- `GET /admin/data/overview` - Get data overview
- `GET /admin/analytics` - Get analytics data

#### 🗃️ Data Storage (`kv_store.tsx`)
Key-value storage for:
- **discount_codes**: Promotional discount codes
- **flight_data**: Flight information and pricing
- **hotels_data**: Hotel listings and availability
- **cars_data**: Car rental options
- **attractions_data**: Tourist attractions and tours
- **taxis_data**: Airport transfer services
- **scraping_config**: Scraping configuration and status
- **bookings_{userId}**: User-specific bookings

## 🎨 Styling Structure

```
styles/
└── globals.css          # Global styles and Tailwind configuration
```

### Styling Architecture

#### 🌈 Design System
- **Framework**: Tailwind CSS v4
- **Color Scheme**: Custom CSS variables for light/dark themes
- **Typography**: Responsive typography scale
- **Components**: Utility-first with component classes

#### 🎯 CSS Variables
```css
:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #030213;
  --secondary: oklch(0.95 0.0058 264.53);
  /* ... more variables */
}
```

## 🔧 Utilities Structure

```
utils/
└── supabase/
    ├── client.ts        # Supabase client singleton
    └── info.tsx         # Project configuration
```

### Utility Functions

#### 🔌 Supabase Integration
- **client.ts**: Centralized Supabase client to prevent multiple instances
- **info.tsx**: Project ID and API keys (auto-generated)

## 🚀 Configuration Files

### Package Management
- **package.json**: Dependencies, scripts, and project metadata
- **package-lock.json**: Lock file for exact dependency versions

### Build Configuration
- **vite.config.ts**: Vite build configuration (if present)
- **tsconfig.json**: TypeScript configuration (if present)

### Code Quality
- **.eslintrc**: ESLint configuration
- **.prettierrc**: Prettier formatting rules
- **tailwind.config.js**: Tailwind CSS configuration (if needed)

### Git & Deployment
- **.gitignore**: Files to ignore in version control
- **.github/workflows/**: GitHub Actions for CI/CD
- **vercel.json**: Vercel deployment configuration (if using Vercel)

## 📊 Data Flow

### Frontend Data Flow
```
User Input → SearchForm → API Call → Backend → Database → Response → UI Update
```

### Authentication Flow
```
User → LoginModal → Supabase Auth → Session → User State → Protected Routes
```

### Payment Flow
```
BookingSelection → PaymentPage → DiscountValidation → PaymentProcessing → Confirmation
```

### Admin Flow
```
AdminLogin → AdminPanel → AdminAPI → DataManagement → SystemControl
```

## 🔒 Security Architecture

### Frontend Security
- **Input Validation**: Client-side validation for better UX
- **XSS Prevention**: Proper escaping and sanitization
- **CSRF Protection**: Built into Supabase Auth

### Backend Security
- **Authentication**: JWT tokens via Supabase Auth
- **Authorization**: Role-based access control
- **Input Sanitization**: Server-side validation
- **Rate Limiting**: Protection against abuse

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Layout Strategy
- **Mobile-first**: Design starts with mobile layout
- **Progressive Enhancement**: Features added for larger screens
- **Flexible Grid**: CSS Grid and Flexbox for responsive layouts

## 🧪 Testing Structure (Planned)

```
tests/
├── components/          # Component tests
├── utils/              # Utility function tests
├── integration/        # Integration tests
└── e2e/               # End-to-end tests
```

## 🚀 Performance Considerations

### Frontend Optimization
- **Code Splitting**: Dynamic imports for route-based splitting
- **Image Optimization**: ImageWithFallback component
- **Bundle Optimization**: Tree shaking and minification

### Backend Optimization
- **Edge Functions**: Deployed close to users
- **Caching**: Built-in caching strategies
- **Database Optimization**: Efficient queries and indexing

---

**This structure provides a solid foundation for a scalable, maintainable travel booking platform.** 🏗️