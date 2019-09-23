interface RouteAttrs {
  [key: string]: string | boolean | undefined;
  path: string;
  exact?: boolean;
  component: string;
}

export default RouteAttrs;
