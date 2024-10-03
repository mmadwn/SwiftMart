import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./features/auth/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load the ProductList and ProductDetail components
const lazyComponents = {
  ProductList: lazy(() => import("./features/products/ProductList")),
  ProductDetail: lazy(() => import("./features/products/ProductDetail")),
  CartPage: lazy(() => import("./features/cart/CartPage")),
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <lazyComponents.ProductList />
          </Suspense>
        ),
      },
      {
        path: "products/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <lazyComponents.ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <lazyComponents.CartPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "category/electronics",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <lazyComponents.ProductList category="electronics" />
          </Suspense>
        ),
      },
      {
        path: "category/jewelry",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <lazyComponents.ProductList category="jewelry" />
          </Suspense>
        ),
      },
      {
        path: "category/men's-clothing",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <lazyComponents.ProductList category="men's clothing" />
          </Suspense>
        ),
      },
      {
        path: "category/women's-clothing",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <lazyComponents.ProductList category="women's clothing" />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <LoginPage />,
      },
    ],
  },
]);
