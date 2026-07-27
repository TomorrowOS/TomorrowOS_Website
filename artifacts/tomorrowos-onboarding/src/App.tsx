import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { PrototypeProvider } from './components/PrototypeProvider';
import { WebsiteLayout } from './components/WebsiteLayout';
import Start from './pages/Start';
import GuideSupabase from './pages/GuideSupabase';
import GuideCloudinary from './pages/GuideCloudinary';
import GuideVercel from './pages/GuideVercel';
import GuideNeon from './pages/GuideNeon';
import GuideVercelBlob from './pages/GuideVercelBlob';
import SamsungTizenGuide from './pages/SamsungTizenGuide';
import ContentGuide from './pages/ContentGuide';
import Compatibility from './pages/Compatibility';
import MediaCompatibility from './pages/MediaCompatibility';
import PlatformGuides from './pages/PlatformGuides';
import NotFound from './pages/not-found';
import Home from './pages/Home';
import Quickstart from './pages/Quickstart';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CookieSettings from './pages/CookieSettings';

const queryClient = new QueryClient();

function Router() {
  return (
    <WebsiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quickstart" component={Quickstart} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/cookie-settings" component={CookieSettings} />
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
        <Route path="/compatibility/media" component={MediaCompatibility} />
        <Route path="/compatibility" component={Compatibility} />
        <Route component={NotFound} />
      </Switch>
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
