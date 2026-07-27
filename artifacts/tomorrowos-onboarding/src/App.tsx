import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { PrototypeProvider } from './components/PrototypeProvider';
import { SharedLayout } from './components/SharedLayout';
import Start from './pages/Start';
import GuideSupabase from './pages/GuideSupabase';
import GuideCloudinary from './pages/GuideCloudinary';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <SharedLayout>
      <Switch>
        <Route path="/start" component={Start} />
        <Route path="/guides/supabase" component={GuideSupabase} />
        <Route path="/guides/cloudinary" component={GuideCloudinary} />
        <Route path="/">
          <Start />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </SharedLayout>
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
