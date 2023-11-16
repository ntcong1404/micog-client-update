import { DefaultLayout } from "./layouts/index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { PublicRoutes } from "./routes/routes";
import { AuthContextProvider } from "./context/AuthContext";
import PuffLoader from "react-spinners/PuffLoader";
import { useEffect } from "react";
import { useState } from "react";
import { logo } from "./assets";

function App() {
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);

  return (
    <>
      {!spinner ? (
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
      ) : (
        <div className="flex justify-center items-center h-screen w-full flex-col ">
          <PuffLoader color="gray" size={80} speedMultiplier={1.5} />
          <img src={logo} alt="" width="300" className="logo2 pt-4" />{" "}
        </div>
      )}
    </>
  );
}

export default App;
