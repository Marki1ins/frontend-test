import { createRootRoute } from "@tanstack/react-router";

import Dashboard from "../layouts/Dashboard";

export const Route = createRootRoute({
  component: Dashboard,
});