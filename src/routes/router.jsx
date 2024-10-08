import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ErrorPage from "../components/common/ErrorPage";

// Lazy load the ProductList and ProductDetail components : EXPERIMENTAL
const lazyComponents = {
  ProductList: lazy(() => import("../features/products/ProductList")),
  ProductDetail: lazy(() => import("../features/products/ProductDetail")),
  CartPage: lazy(() => import("../features/cart/CartPage")),
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "products",
        element: (
            <lazyComponents.ProductList />
        ),
      },
      {
        path: "products/:id",
        element: (
            <lazyComponents.ProductDetail />
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
              <lazyComponents.CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/category/electronics",
        element: (
            <lazyComponents.ProductList category="electronics" />
        ),
      },
      {
        path: "products/category/jewelry",
        element: (
            <lazyComponents.ProductList category="jewelry" />
        ),
      },
      {
        path: "products/category/mens-clothing",
        element: (
            <lazyComponents.ProductList category="mens" />
        ),
      },
      {
        path: "products/category/womens-clothing",
        element: (
          <Suspense fallback={<div>Loading...</div>}> {/* EXPERIMENTAL */}
            <lazyComponents.ProductList category="womens" />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <LoginPage />,
      },
    ],
  },
]);
