interface RouteConfig {
  path: string;
  component?: string;
  exact?: boolean;
  subRoutes?: RouteConfig[];
}

export default RouteConfig;
