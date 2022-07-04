import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "../components/endpoints/Home";
import { Login } from "../components/endpoints/Login";
import { PostView } from "../components/endpoints/PostView";
import { RequireAuth } from "../components/RequireAuth";
import { Singin } from "../components/endpoints/Singin";
import { Layout } from "../components/ui/Layout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="p/:postId" element={<PostView />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
        <Route
          path="login"
          element={
            <RequireAuth required={false} redirect="/">
              <Login />
            </RequireAuth>
          }
        />
        <Route
          path="singin"
          element={
            <RequireAuth required={false} redirect="/">
              <Singin />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
