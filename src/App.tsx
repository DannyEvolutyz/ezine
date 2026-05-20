import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ComparisonPage from "./pages/ComparisonPage.tsx";
import AiChatFeaturePage from "./pages/AiChatFeaturePage.tsx";
import OnboardingLandingPage from "./pages/OnboardingLandingPage.tsx";
import UseCasePage from "./pages/UseCasePage.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/features/ai-chat" element={<AiChatFeaturePage />} />
          <Route path="/use-cases/hr-people-ops" element={<OnboardingLandingPage />} />
          <Route path="/use-cases/:slug" element={<UseCasePage />} />
          <Route path="/use-cases/onboarding" element={<OnboardingLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
