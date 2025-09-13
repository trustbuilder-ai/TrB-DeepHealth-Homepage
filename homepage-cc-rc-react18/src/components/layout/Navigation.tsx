import React, { useState, useRef, useCallback } from "react";
import {
  Brain,
  Sparkles,
  Target,
  BarChart3,
  Menu,
  X,
  WifiOff,
  Mail,
  User,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EnhancedDialog } from "@/components/ui/modal";
import {
  SettingsDropdown,
} from "@/components/features";
import { useModalClose } from "@/hooks/useModalClose";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

const navigationItems = [
  { label: "Features", id: "features", icon: Sparkles },
  { label: "Scenarios", id: "scenarios", icon: Target },
  { label: "Research", id: "conversations", icon: BarChart3 },
];

export const Navigation = () => {
  const { theme } = useTheme();
  const isOnline = useOnlineStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useModalClose(
    mobileMenuOpen,
    () => setMobileMenuOpen(false),
    mobileMenuTriggerRef,
  );

  const handleNewsletterSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;

      setIsSubmitting(true);

      // Simulate newsletter signup
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setEmail("");
      setNewsletterModalOpen(false);
      setIsSubmitting(false);

      // Could add a success notification here
      console.log("Newsletter signup successful for:", email);
    },
    [email],
  );

  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!loginEmail.trim() || !password.trim()) return;

      setIsLoggingIn(true);

      // Simulate login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setLoginEmail("");
      setPassword("");
      setLoginModalOpen(false);
      setIsLoggingIn(false);

      // Could add a success notification here
      console.log("Login successful for:", loginEmail);
    },
    [loginEmail, password],
  );

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const h1 = document.querySelector("h1");
    h1?.focus();
  }, []);

  return (
    <>
      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 text-sm">
          <WifiOff className="w-4 h-4 inline mr-2 icon-dynamic" />
          You're currently offline. Some features may not be available.
        </div>
      )}

      {/* Navigation */}
      <nav
        className={cn(
          "fixed w-full top-0 z-50 nav-glow border-b transition-colors",
          theme.isDark
            ? "bg-slate-950/80 border-slate-800"
            : "bg-white/80 border-slate-200",
          !isOnline && "top-10",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4 lg:gap-8">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg p-1"
                aria-label="Scroll to top of page"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center shadow-lg",
                    theme.primary,
                    theme.glow,
                  )}
                >
                  <Brain className="w-5 h-5 text-white icon-dynamic" />
                </div>
                <span className={cn("text-xl font-semibold", theme.text)}>
                  Astra Labs
                </span>
              </button>

              {/* Desktop Navigation */}
              <nav
                className="hidden md:flex items-center space-x-4 lg:space-x-8"
                role="navigation"
                aria-label="Main navigation"
              >
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      theme.isDark
                        ? "text-slate-400 focus-visible:ring-slate-400"
                        : "text-slate-600 focus-visible:ring-slate-600",
                    )}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <item.icon className="w-4 h-4 icon-dynamic" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <SettingsDropdown />

              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  theme={theme}
                  onClick={() => setLoginModalOpen(true)}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  theme={theme}
                  className={`bg-gradient-to-r ${theme.primary} text-white border-0`}
                  onClick={() => setNewsletterModalOpen(true)}
                >
                  <Mail className="w-4 h-4 mr-2 icon-dynamic" />
                  Newsletter
                </Button>
              </div>

              <button
                ref={mobileMenuTriggerRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={
                  mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
                }
                aria-expanded={mobileMenuOpen}
                className={cn(
                  "md:hidden p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  theme.isDark
                    ? "text-slate-400 focus-visible:ring-slate-400"
                    : "text-slate-600 focus-visible:ring-slate-600",
                )}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 icon-dynamic" />
                ) : (
                  <Menu className="w-5 h-5 icon-dynamic" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "md:hidden border-t backdrop-blur-xl",
              theme.isDark
                ? "bg-slate-950/95 border-slate-800"
                : "bg-white/95 border-slate-200",
            )}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  role="menuitem"
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-3 rounded-md text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    theme.isDark
                      ? "text-slate-400 focus-visible:ring-slate-400"
                      : "text-slate-600 focus-visible:ring-slate-600",
                  )}
                >
                  <item.icon className="w-5 h-5 icon-dynamic" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <Button
                  variant="ghost"
                  theme={theme}
                  className="w-full justify-start"
                  onClick={() => {
                    setLoginModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  theme={theme}
                  className={`w-full bg-gradient-to-r ${theme.primary} text-white border-0`}
                  onClick={() => {
                    setNewsletterModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Mail className="w-4 h-4 mr-2 icon-dynamic" />
                  Newsletter
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Newsletter Signup Modal */}
      <EnhancedDialog
        isOpen={newsletterModalOpen}
        onClose={() => setNewsletterModalOpen(false)}
        title="Get Newsletter"
        size="md"
        theme={theme}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className={`w-6 h-6 icon-dynamic ${theme.text}`} />
            <div>
              <h3 className={`font-semibold ${theme.text}`}>Stay Updated</h3>
              <p className={`text-sm ${theme.textSecondary}`}>
                Get the latest AI safety research and platform updates.
              </p>
            </div>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="newsletter-email"
                className={`block text-sm font-medium ${theme.text} mb-2`}
              >
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                theme={theme}
                className="w-full"
              />
            </div>

            <div className={`text-xs ${theme.textMuted}`}>
              By subscribing, you agree to receive updates about AI safety
              research, platform features, and mental health technology. You can
              unsubscribe at any time.
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewsletterModalOpen(false)}
                theme={theme}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                theme={theme}
                disabled={isSubmitting || !email.trim()}
                loading={isSubmitting}
                className={`flex-1 bg-gradient-to-r ${theme.primary} text-white border-0`}
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </EnhancedDialog>

      {/* Login Modal */}
      <EnhancedDialog
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title="Sign In"
        size="md"
        theme={theme}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className={`w-6 h-6 icon-dynamic ${theme.text}`} />
            <div>
              <h3 className={`font-semibold ${theme.text}`}>Welcome Back</h3>
              <p className={`text-sm ${theme.textSecondary}`}>
                Sign in to access your account and personalized settings.
              </p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className={`block text-sm font-medium ${theme.text} mb-2`}
              >
                Email address
              </label>
              <Input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                theme={theme}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className={`block text-sm font-medium ${theme.text} mb-2`}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.textMuted}`}
                />
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  theme={theme}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <div className={`text-xs ${theme.textMuted}`}>
              By signing in, you agree to our Terms of Service and Privacy
              Policy. Your data is protected with industry-standard encryption.
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLoginModalOpen(false)}
                theme={theme}
                disabled={isLoggingIn}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                theme={theme}
                disabled={isLoggingIn || !loginEmail.trim() || !password.trim()}
                loading={isLoggingIn}
                className={`flex-1 bg-gradient-to-r ${theme.primary} text-white border-0`}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </EnhancedDialog>
    </>
  );
};
