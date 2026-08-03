import { lazy, Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { PrototypeProvider } from './components/PrototypeProvider';
import { WebsiteLayout } from './components/WebsiteLayout';
// Homepage stays statically imported so the landing route renders immediately.
import Home from './pages/Home';

// Route-level code splitting: every other page loads on demand.
const Start = lazy(() => import('./pages/Start'));
const GuideSupabase = lazy(() => import('./pages/GuideSupabase'));
const GuideCloudinary = lazy(() => import('./pages/GuideCloudinary'));
const GuideVercel = lazy(() => import('./pages/GuideVercel'));
const GuideNeon = lazy(() => import('./pages/GuideNeon'));
const GuideVercelBlob = lazy(() => import('./pages/GuideVercelBlob'));
const SamsungTizenGuide = lazy(() => import('./pages/SamsungTizenGuide'));
const ContentGuide = lazy(() => import('./pages/ContentGuide'));
const Compatibility = lazy(() => import('./pages/Compatibility'));
const MediaCompatibility = lazy(() => import('./pages/MediaCompatibility'));
const PlatformGuides = lazy(() => import('./pages/PlatformGuides'));
const NotFound = lazy(() => import('./pages/not-found'));
const About = lazy(() => import('./pages/About'));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const CookieSettings = lazy(() => import('./pages/CookieSettings'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
// Learn section (Phase A shells): one lazy component serves every registered
// /learn route so Learn code stays out of the primary entry bundle.
const LearnRouteShell = lazy(() => import('./pages/learn/LearnRouteShell'));
const LearnIndex = lazy(() => import('./pages/learn/LearnIndex'));

const queryClient = new QueryClient();

/**
 * Scrolls to the top on every route change so navigating to a new page never
 * preserves the previous page's scroll position. Hash anchors keep their
 * native in-page scrolling behaviour.
 */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <WebsiteLayout>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[50vh]" aria-busy="true" />}>
      <Switch>
        <Route path="/" component={Home} />
        {/* Legacy URL: the quickstart page is now the homepage. */}
        <Route path="/quickstart" component={() => <Redirect to="/" replace />} />
        <Route path="/about" component={About} />
        <Route path="/github" component={() => <PlaceholderPage title="GitHub" />} />
        <Route path="/community" component={() => <PlaceholderPage title="Community" />} />
        <Route path="/license" component={() => <PlaceholderPage title="License" />} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/cookie-settings" component={CookieSettings} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route path="/start" component={Start} />
        <Route path="/start/guided" component={Start} />
        <Route path="/start/guided/replit" component={Start} />
        <Route path="/start/guided/vercel" component={Start} />
        <Route path="/start/terminal" component={Start} />
        <Route path="/connect/server-sdk" component={Start} />
        <Route path="/connect/api" component={Start} />
        <Route path="/guides/supabase" component={GuideSupabase} />
        <Route path="/guides/cloudinary" component={GuideCloudinary} />
        <Route path="/guides/vercel" component={GuideVercel} />
        <Route path="/guides/neon" component={GuideNeon} />
        <Route path="/guides/vercel-blob" component={GuideVercelBlob} />
        <Route path="/guides/content" component={ContentGuide} />
        <Route path="/guides/platforms/samsung-tizen/magicinfo" component={SamsungTizenGuide} />
        <Route path="/guides/platforms/samsung-tizen" component={SamsungTizenGuide} />
        <Route path="/guides/platforms" component={PlatformGuides} />
        {/* Learn (Phase A): registered, noindex, absent from navigation.
            Unknown /learn/* paths fall through to NotFound below. */}
        <Route path="/learn" component={LearnIndex} />
        <Route path="/learn/build-a-digital-signage-cms" component={LearnRouteShell} />
        <Route path="/learn/digital-signage-sdk" component={LearnRouteShell} />
        <Route path="/learn/digital-signage-api" component={LearnRouteShell} />
        <Route path="/learn/open-source-digital-signage" component={LearnRouteShell} />
        <Route path="/learn/self-hosted-digital-signage" component={LearnRouteShell} />
        <Route path="/learn/headless-digital-signage" component={LearnRouteShell} />
        <Route path="/learn/samsung-tizen-digital-signage-player" component={LearnRouteShell} />
        <Route path="/learn/brightsign-digital-signage-player" component={LearnRouteShell} />
        <Route path="/compatibility/media" component={MediaCompatibility} />
        <Route path="/compatibility" component={Compatibility} />
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </WebsiteLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrototypeProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
      </PrototypeProvider>
    </QueryClientProvider>
  );
}

export default App;
