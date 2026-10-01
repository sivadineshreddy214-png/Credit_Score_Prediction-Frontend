export interface PromptSection {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  content: string;
}

export const DEV_PROMPTS: PromptSection[] = [
  {
    id: 'prompt-1',
    title: 'PROMPT 1: Architecture, Core Pages & Responsive UI Foundation',
    subtitle: 'Project setup, layout constitution, responsive navigation, footer, routing, and unauthenticated page modules',
    badge: 'Phase 1 · Foundation',
    content: `# PROMPT 1 — PROJECT SETUP, ARCHITECTURE, CORE PAGES & RESPONSIVE UI FOUNDATION

## Objective
Build the client-side single-page application (SPA) foundation for an enterprise Credit Score Intelligence and Machine Learning inference platform. In this phase, establish the application layout shell, design tokens, responsive navigation, persistent footer, view routing, reusable design system components, and all non-ML core pages (Home, About, Contact Us, Sign In UI, Sign Up UI).

---

## 1. Project Setup & Tech Stack
- **Framework**: React 19+ (Vite builder) with TypeScript strict mode enabled.
- **Styling**: Tailwind CSS v4 using modern utility syntax (\`@import "tailwindcss";\` in global CSS).
- **Icons**: \`lucide-react\` for semantic functional affordances.
- **Typography**: Domain-authentic sans-serif (\`Plus Jakarta Sans\`) paired with monospace tabular figures (\`JetBrains Mono\` / \`tabular-nums\`) for currency and numerical metrics.
- **State Management**: React state with custom hooks and persistent local storage synchronization for theme/session states.
- **Routing**: Lightweight client-side router or URL hash/state router supporting deep linking to views:
  - \`/\` -> Home Page
  - \`/about\` -> About & Methodology Page
  - \`/contact\` -> Contact & Support Page
  - \`/signin\` -> Sign In View (UI-only for this phase)
  - \`/signup\` -> Sign Up View (UI-only for this phase)
  - \`/predict\` -> Model Prediction Shell (Placeholder with spec notice for Phase 2)
  - \`/dashboard\` -> User Dashboard Shell (UI state preview)

---

## 2. Universal Layout & Top Bar Contract
Adhere strictly to the three-zone header contract without promotional capsules or secondary clutter:
1. **Brand Zone (Left)**: Single wordmark \`CreditScore.AI\` rendered in clean font styling. No subtitles or status capsules attached.
2. **Navigation Links (Center)**: Clean text navigation links with subtle underline/color hover transitions:
   - \`Home\`
   - \`Credit Predictor\` (Links to model page)
   - \`Dashboard\`
   - \`About\`
   - \`Contact\`
3. **Action Zone (Right)**:
   - \`Sign In\` text button
   - \`Get Started\` / \`Create Account\` primary button (\`px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors\`).
   - Mobile: Responsive hamburger toggle that reveals an accessible drawer menu with backdrop blur.

### Persistent Footer
- Four-column grid: Company overview, Product features, Legal & Compliance (FCRA / Model Fairness disclaimers), and Contact Channels.
- Single-line copyright notice: \`© 2026 CreditScore.AI Technologies. All rights reserved.\`
- Zero telemetry tickers or ornamental background engines.

---

## 3. Core Pages Specification

### Page A: Home Page (\`/\`)
- **Hero Section**:
  - High-impact balanced headline: *"Precision Credit Risk Scoring Powered by Gradient Machine Learning"*.
  - Subtitle (measure 65ch): Explain how 8 core financial variables map directly to multi-class creditworthiness classification with transparent probability distributions.
  - Dual CTAs: \`Run Credit Assessment\` (links to predictor) and \`View Model Architecture\`.
- **Value Proposition & Metrics Grid**:
  - 3 primary capability cards: Instant Multiclass Inference (<100ms), 8-Feature Granular Audit, and Transparent Probability Explanations.
  - Zero-pill metadata design: cleanly separated text indicators without pill containers.
- **Interactive Credit Vectors Showcase**:
  - Preview card showcasing the 8 financial vectors: Monthly In-hand Salary, Total EMI, Outstanding Debt, Credit Utilization, Delayed Payments, Monthly Balance, Credit Inquiries, and EMI-to-Income ratio.
- **Workflow & Process Section**:
  - 3-step sequence: 1. Input verified financials -> 2. Remote ML classifier inference -> 3. Actionable risk tier & probability breakdown.

### Page B: About Page (\`/about\`)
- **Model Training & Dataset Pedigree**:
  - Overview of the Kaggle Credit Score classification benchmark dataset.
  - Breakdown of class targets: \`Class 0: Poor\`, \`Class 1: Standard\`, \`Class 2: Good\`.
- **Ethical AI & Compliance Framework**:
  - Model fairness, lack of demographic bias, and strict adherence to explainable AI principles.
- **Technical Architecture Diagram**:
  - Client UI -> Secure REST Proxy -> FastAPI / Uvicorn Server on Render -> Trained Classifier -> JSON probabilities payload.

### Page C: Contact Us (\`/contact\`)
- **Support & Developer Inquiry Form**:
  - Fields: Full Name, Work Email, Subject Category (API Integration, Enterprise Licensing, Model Audit, General Support), and Message.
  - Accessible input validation with live character counters and real submit handlers.
  - Dedicated direct channels: Enterprise API team email, physical office address, and typical response SLA (<4 hours).

### Page D: Sign In UI (\`/signin\`)
- Clean, focused centered authentication card on neutral canvas.
- Single-click Google Sign-In button (UI ready for Phase 3 OAuth wiring).
- Email & password form fields with client-side regex email validation, password visibility toggle, and "Forgot password?" affordance.
- Link switching smoothly between Sign In and Sign Up views.

### Page E: Sign Up UI (\`/signup\`)
- Name, Email, Password, and Password Confirmation fields.
- Password strength indicator (length >= 8, mixed case, numbers).
- Terms of Service & Privacy Policy acceptance checkbox.
- Smooth transition to Sign In.

---

## 4. Reusable UI Components System
Build modular, decoupled TypeScript components in \`/src/components/ui/\`:
- \`Button\`: Variants (\`primary\`, \`secondary\`, \`outline\`, \`ghost\`), sizes (\`sm\`, \`md\`, \`lg\`), loading spinner state.
- \`InputField\`: Unified input component with label, helper text, error message, and prefix/suffix icons.
- \`Card\`: Single-elevation container with hairline borders (\`border-slate-200\`) and soft focus hover states.
- \`Modal\`: Accessible dialog with focus trap and keyboard ESC dismissal.
- \`Badge\`: Semantic status markers (e.g. Green for Good, Amber for Standard, Red for Poor) paired with text labels.

---

## 5. Phase 1 Boundaries
- **No external ML API calls**: The predictor route may display mock preview states or an informational banner stating ML integration is coming in Phase 2.
- **No Firebase SDK execution**: Sign in/sign up forms can store simulated credentials or state in \`localStorage\` to test UI flow before Phase 3 Firebase activation.`
  },
  {
    id: 'prompt-2',
    title: 'PROMPT 2: ML Model Pages + API Integration Specification',
    subtitle: 'Exact 8 training inputs, client controls, validation rules, Render REST endpoint, loading/error states, and probability UI',
    badge: 'Phase 2 · ML Integration',
    content: `# PROMPT 2 — ML MODEL PAGES + API INTEGRATION SPECIFICATION

## Objective
Implement the production-grade Machine Learning inference page and integration layer connecting the frontend directly to the deployed Credit Score Prediction REST backend on Render. Every input field, data type, validation constraint, and response payload must strictly match the trained model's inference schema.

---

## 1. Model & Backend Endpoint Specification

### Backend Base URL
\`https://credit-score-prediction-imjx.onrender.com\`

### Endpoint Details
- **Endpoint**: \`/predict\`
- **HTTP Method**: \`POST\`
- **Headers**:
  - \`Content-Type: application/json\`
  - \`Accept: application/json, */*\`

### Integration Flow Specification
\`\`\`
[User Financial Form]
        |
        v (Input Validation & Normalization)
[JSON Request Payload (8 Features)]
        |
        v POST https://credit-score-prediction-imjx.onrender.com/predict
[FastAPI / Uvicorn Server on Render]
        |
        v (Trained Classifier Inference)
[HTTP 200 JSON: prediction (0|1|2) + probabilities (0, 1, 2)]
        |
        v (Score Categorization & Confidence Mapping)
[Result UI: Risk Tier + Probabilities Bar Chart + Explanatory Factors]
\`\`\`

---

## 2. Model Input Features Inventory (Strictly Discovered from Training)

| # | Field Name in Payload | Display Label | Data Type | Input Control Type | Valid Range / Unit | Default Value | Description / Validation |
|---|-----------------------|---------------|-----------|-------------------|-------------------|---------------|--------------------------|
| 1 | \`Monthly_Inhand_Salary\` | Monthly In-hand Salary | \`float\` | Currency Input | 0 to 1,000,000 ($) | 4,500.00 | Net monthly take-home income after tax and deductions. Must be >= 0. |
| 2 | \`Total_EMI_per_month\` | Total Monthly EMI | \`float\` | Currency Input | 0 to 500,000 ($) | 320.00 | Sum of all existing active monthly loan installments. Must be >= 0. |
| 3 | \`Outstanding_Debt\` | Total Outstanding Debt | \`float\` | Currency Input | 0 to 2,000,000 ($) | 1,200.00 | Aggregate remaining unpaid balance across all loans/cards. |
| 4 | \`Credit_Utilization_Ratio\` | Credit Utilization Ratio | \`float\` | Percentage Slider + Input | 0.0% to 100.0% (%) | 28.50 | Percentage of total revolving credit line currently utilized. |
| 5 | \`Num_of_Delayed_Payment\` | Number of Delayed Payments | \`integer\` | Stepper / Number Input | 0 to 100 (count) | 2 | Count of monthly payments past due date over credit history. |
| 6 | \`Monthly_Balance\` | Monthly Balance | \`float\` | Currency Input | -50,000 to 500,000 ($) | 850.00 | Remaining surplus funds in bank account at month's end. Can be negative. |
| 7 | \`Num_Credit_Inquiries\` | Number of Credit Inquiries | \`integer\` | Stepper / Number Input | 0 to 50 (count) | 3 | Hard credit report checks initiated by lenders in the past 12 months. |
| 8 | \`EMI_to_Income\` | EMI to Income Ratio | \`float\` | Computed Float Input | 0.00 to 5.00 (ratio) | 0.0711 | Ratio of Monthly EMI to Monthly Salary (\`Total_EMI_per_month / Monthly_Inhand_Salary\`). Includes 1-click Auto-Sync button. |

*CRITICAL CONSTRAINT*: Do NOT add, rename, or invent any additional parameters. The backend FastAPI model will reject requests containing unknown fields or missing required keys with HTTP 422 Unprocessable Entity.

---

## 3. Request & Response Payload Format

### Request Body (JSON)
\`\`\`json
{
  "Monthly_Inhand_Salary": 4500.0,
  "Total_EMI_per_month": 320.0,
  "Outstanding_Debt": 1200.0,
  "Credit_Utilization_Ratio": 28.5,
  "Num_of_Delayed_Payment": 2,
  "Monthly_Balance": 850.0,
  "Num_Credit_Inquiries": 3,
  "EMI_to_Income": 0.0711
}
\`\`\`

### Successful Response Format (HTTP 200)
\`\`\`json
{
  "prediction": 1,
  "probabilities": {
    "0": 0.18,
    "1": 0.72,
    "2": 0.10
  }
}
\`\`\`

### Target Class Mapping
- \`"prediction": 0\` -> **Poor Credit Score** (High Risk / Subprime borrower profile)
- \`"prediction": 1\` -> **Standard Credit Score** (Moderate Risk / Fair/Prime borrower profile)
- \`"prediction": 2\` -> **Good Credit Score** (Low Risk / Super-prime borrower profile)

### Validation Error Format (HTTP 422)
\`\`\`json
{
  "detail": [
    {
      "loc": ["body", "Monthly_Inhand_Salary"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
\`\`\`

---

## 4. UI Implementation Specifications

### A. Predictor Form Layout
- Two-column responsive grid on desktop (\`grid-cols-1 lg:grid-cols-2\`) with clear sectioning:
  - **Left Column**: Income & Liquidity Inputs (\`Monthly_Inhand_Salary\`, \`Monthly_Balance\`, \`Total_EMI_per_month\`, \`EMI_to_Income\`).
  - **Right Column**: Credit Discipline & Debt Inputs (\`Outstanding_Debt\`, \`Credit_Utilization_Ratio\`, \`Num_of_Delayed_Payment\`, \`Num_Credit_Inquiries\`).
- **1-Click Quick Scenario Presets**: Provide rapid test profile buttons:
  - *"Prime Salaried"* (Salary $7,500, Debt $400, Utilization 14%, Delays 0 -> Good)
  - *"Average Household"* (Salary $4,200, Debt $2,100, Utilization 34%, Delays 3 -> Standard)
  - *"Subprime Distress"* (Salary $2,100, Debt $8,400, Utilization 88%, Delays 18 -> Poor)

### B. State Management & Lifecycle
- **Initial / Idle State**: Form rendered with valid defaults, primary submit button \`"Compute Credit Prediction"\`.
- **Loading State**:
  - Submit button shows animated spinner with label \`"Evaluating Model..."\`.
  - Input fields disabled to prevent duplicate submissions.
  - Cold-start notice: Render free instances spin down after inactivity; if request exceeds 5s, display friendly notice: *"Waking remote inference service (Render cold start may take 20-30s)..."*.
- **Success State**:
  - Smooth scroll or reveal of the **Prediction Results Card**:
    - **Header**: Primary Credit Tier Badge with semantic colors:
      - Class 2 (Good): \`bg-emerald-50 text-emerald-700 border-emerald-200\`
      - Class 1 (Standard): \`bg-blue-50 text-blue-700 border-blue-200\`
      - Class 0 (Poor): \`bg-rose-50 text-rose-700 border-rose-200\`
    - **Probability Distribution**: Visual horizontal progress bars displaying exact probability percentages for Poor, Standard, and Good tiers with tabular monospace numerals (\`font-mono tabular-nums\`).
    - **Confidence Score**: Highest probability percentage highlighted with confidence indicator.
    - **Key Driver Explanations**: Dynamic bullet points highlighting whether credit utilization, debt-to-income, or delayed payments contributed most heavily to the classification.
- **Error State**:
  - Network timeout or HTTP 500/422 errors caught gracefully.
  - Clear user-facing alert detailing whether it was a network connectivity failure, server timeout, or invalid parameter, with a \`"Retry Inference"\` button.`
  },
  {
    id: 'prompt-3',
    title: 'PROMPT 3: Firebase Authentication & Protected Route Access Control',
    subtitle: 'Email/password auth, Google Sign-In, session persistence, reactive state, protected routes, and profile management',
    badge: 'Phase 3 · Firebase Auth',
    content: `# PROMPT 3 — FIREBASE AUTHENTICATION & ACCESS CONTROL

## Objective
Configure production-grade Firebase Authentication for the Credit Score application. Enable Email/Password registration and login, Google Sign-In with OAuth popup, persistent session handling, reactive authentication state observation, protected dashboard/model route guards, redirect workflows, user profile display, and secure sign-out.

---

## 1. Firebase Configuration & Initialization

### Environment Variables (\`.env\`)
Configure standard client-side Firebase environment keys:
\`\`\`env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
\`\`\`

### Firebase SDK Setup (\`src/services/firebase.ts\`)
\`\`\`typescript
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  browserLocalPersistence, 
  setPersistence 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Enforce browser local persistence for durable sessions across tabs & browser restarts
setPersistence(auth, browserLocalPersistence).catch(console.error);
\`\`\`

---

## 2. Authentication Context & State Management (\`src/context/AuthContext.tsx\`)

Create a strongly-typed \`AuthContext\` wrapping the application root:
- **Exposed State**:
  - \`user: User | null\` (Firebase User object with uid, email, displayName, photoURL)
  - \`loading: boolean\` (True during initial auth resolution to prevent flash of unauthenticated screens)
  - \`error: string | null\` (Latest auth operation error message)
- **Exposed Actions**:
  - \`signUpWithEmail(email, password, displayName): Promise<void>\`
  - \`signInWithEmail(email, password): Promise<void>\`
  - \`signInWithGoogle(): Promise<void>\`
  - \`signOut(): Promise<void>\`
  - \`clearError(): void\`

### Reactive Observer Implementation
Subscribe to Firebase's \`onAuthStateChanged(auth, (user) => { ... })\` inside a \`useEffect\` hook to handle token refresh, session rehydration, and real-time logout events seamlessly.

---

## 3. Authentication Operations Specification

### A. Email/Password Sign Up
1. Validate inputs client-side:
   - Valid email format.
   - Password minimum 8 characters with at least one number and letter.
2. Call \`createUserWithEmailAndPassword(auth, email, password)\`.
3. Call \`updateProfile(userCredential.user, { displayName })\` to attach the user's full name.
4. On success: Automatically redirect user to \`/dashboard\`.

### B. Email/Password Sign In
1. Call \`signInWithEmailAndPassword(auth, email, password)\`.
2. Map Firebase error codes to human-readable error messages:
   - \`auth/user-not-found\` -> "No account found with this email."
   - \`auth/wrong-password\` -> "Incorrect password. Please try again."
   - \`auth/invalid-credential\` -> "Invalid email or password."
   - \`auth/too-many-requests\` -> "Too many failed attempts. Please try again later."
3. On success: Redirect to originally requested protected route or default \`/dashboard\`.

### C. Google Sign-In
1. Call \`signInWithPopup(auth, googleProvider)\`.
2. Handle popup closure gracefully (\`auth/popup-closed-by-user\`).
3. Extract \`displayName\`, \`email\`, and \`photoURL\` from Google credentials.
4. On success: Redirect to \`/dashboard\`.

### D. Logout
1. Call \`signOut(auth)\`.
2. Clear any cached user-specific evaluations or session states in local memory.
3. Redirect to \`/signin\` or Home page.

---

## 4. Protected Routes & Navigation Flow

### Protected Route Guard (\`src/components/ProtectedRoute.tsx\`)
Wrap restricted routes (\`/dashboard\`, \`/history\`, and optionally \`/predict\` when restricted to registered users):
- **While \`loading === true\`**: Render a sleek, non-blocking skeleton loader.
- **If \`!user\`**:
  - Store intended target URL (e.g. \`redirectUrl = location.pathname\`).
  - Redirect to \`/signin?redirect={targetUrl}\`.
  - Display informative toast: *"Please sign in to access your Credit Assessment Dashboard."*
- **If \`user\` is authenticated**: Render child components with full access.

### Route Access Matrix
| Route | Public Access | Authenticated Action |
|-------|---------------|----------------------|
| \`/\` (Home) | YES | Full access |
| \`/about\` | YES | Full access |
| \`/contact\` | YES | Full access |
| \`/signin\` | YES | If already logged in, redirect directly to \`/dashboard\` |
| \`/signup\` | YES | If already logged in, redirect directly to \`/dashboard\` |
| \`/predict\` | Configurable (Public or User-Only) | Full ML prediction with result saving |
| \`/dashboard\` | **NO (Protected)** | Displays user profile, saved credit history & score trends |

---

## 5. User Profile & Navbar Integration
- Replace Top Bar \`Sign In\` / \`Sign Up\` buttons with:
  - User avatar thumbnail (\`user.photoURL\` or initials circle).
  - User name / email dropdown menu containing:
    - User email display (read-only)
    - Link to \`Dashboard\`
    - Link to \`Credit Predictor\`
    - \`Sign Out\` action button with red hover state.`
  }
];
