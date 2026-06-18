Page → AuthForm → Config → Input Components → API Service

src/
│
├── components/
│   └── auth/
│       ├── AuthForm.tsx        // main reusable dynamic form
│       ├── AuthInput.tsx       // reusable input field
│       └── AuthWrapper.tsx     // common background/layout
│
├── pages/
│   └── auth/
│       ├── Login.tsx
│       ├── Signup.tsx
│       ├── ForgotPassword.tsx
│       └── ResetPassword.tsx
│
├── config/
│   └── authFormConfig.ts       // all field configs (VERY IMPORTANT)
│
├── hooks/
│   └── useAuthForm.ts          // optional custom hook for form logic
│
├── services/
│   └── authService.ts          // API calls (login, signup, etc.)
│
├── routes/
│   └── AppRoutes.tsx           // all routes
│
├── types/
│   └── auth.types.ts           // TypeScript types
│
├── utils/
│   └── validators.ts           // validation logic (optional)
│
├── store/ (optional if using Redux)
│   └── authSlice.ts
│
├── App.tsx
└── main.tsx