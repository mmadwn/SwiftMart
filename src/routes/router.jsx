import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ErrorPage from "../components/common/ErrorPage";
import ProductList from "../features/products/ProductList";
import CartPage from "../features/cart/CartPage";

// Lazy load the ProductList and ProductDetail components : EXPERIMENTAL
const lazyComponents = {
  ProductDetail: lazy(() => import("../features/products/ProductDetail")),
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
            <ProductList />
        ),
      },
      {
        path: "products/:id",
        element: (
            <Suspense fallback={<div>Loading...</div>}> {/* EXPERIMENTAL */}
                <lazyComponents.ProductDetail />
            </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
              <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/category/electronics",
        element: (
            <ProductList category="electronics" />
        ),
      },
      {
        path: "products/category/jewelry",
        element: (
            <ProductList category="jewelry" />
        ),
      },
      {
        path: "products/category/mens-clothing",
        element: (
            <ProductList category="mens" />
        ),
      },
      {
        path: "products/category/womens-clothing",
        element: (
            <ProductList category="womens" />
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
