interface NavigationRoutes {
  LOGIN: string;
  HOME: string;
  SIGNUP: string;
  REFRESH: string;
  LOGOUT: string;
  // PROFILE: string;
}

const NAVIGATION_ROUTES: NavigationRoutes = {
  LOGIN: "/login",
  HOME: "/",
  SIGNUP: "/signup",
  REFRESH: "/refresh",
  LOGOUT: "/logout",
  // MANAGE_TASKS: '/manage/products',
  // MANAGE_PRODUCT_DETAILS: '/manage/products',
};

const PAGE_TITLES: NavigationRoutes = {
  LOGIN: "Login",
  HOME: "Home",
  SIGNUP: "Signup",
  REFRESH: "Refresh",
  LOGOUT: "Logout",
};

// TODO: i can have icons for each route
export { PAGE_TITLES, NAVIGATION_ROUTES };
