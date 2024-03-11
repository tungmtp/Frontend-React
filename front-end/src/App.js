import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "abc",
        element: <div>abc page</div>,
      },
    ],
  },
]);
function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading Page ....</div>}
    />
  );
}

export default App;
