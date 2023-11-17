import { DefaultLayout } from "./layouts/index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { PublicRoutes } from "./routes/routes";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <div>
          <AuthContextProvider>
            <Routes>
              {PublicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout route={route}>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
              <Route path="*" element={<Navigate to="/error" />} />
            </Routes>
          </AuthContextProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
