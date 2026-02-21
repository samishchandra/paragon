/**
 * AuthenticatedApp
 * 
 * Lazy-loaded shell for the authenticated portion of the app.
 * This component is only loaded after the user has signed in,
 * keeping the initial bundle (auth + login) lean.
 * 
 * Contains: ServerMomentumProvider, Router (Home + NotFound), Toaster, etc.
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { ServerMomentumProvider } from "./contexts/ServerMomentumContext";
import Home from "./pages/Home";
import { ToastContainer } from "./components/ToastContainer";

interface AuthenticatedAppProps {
  userId: string;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function AuthenticatedApp({ userId }: AuthenticatedAppProps) {
  return (
    <ServerMomentumProvider userId={userId}>
      <TooltipProvider>
        <Toaster position="bottom-center" />
        <ToastContainer />
        <Router />
      </TooltipProvider>
    </ServerMomentumProvider>
  );
}
