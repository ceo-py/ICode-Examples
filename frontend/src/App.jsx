import { NavMenu } from "./components/ui/NavMenu/NavMenu";
import { CodeCard } from "./components/ui/CodeCard/CodeCard";
import { ResultListTable } from "./components/ui/ResultListTable/ResultListTable";
import Auth from "./components/forms/Auth/Auth";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";
import { UserProfile } from "./components/ui/User/UserProfile";
import { Navigate } from "react-router-dom";
import { NotFound } from "./components/ui/NotFound/NotFound";
import { UploadContent } from "./components/ui/User/UploadContent/UploadContent";
import Index from "./components/ui/Index/Index";
import { UserHomePage } from "./components/ui/User/UserHomePage/UserHomePage";
import { Footer } from "./components/ui/Footer/Footer";
import { EditTask } from "./components/ui/User/EditTask/EditTask";
import Password from "./components/forms/Recover/Account/Password";
import Account from "./components/forms/Recover/Account/Account";
import { MenuModuleResult } from "./components/ui/MenuModuleResult/MenuModuleResult";
import About from "./components/ui/About/About";
import { selectedThemeSignal } from "./components/ui/NavMenu/ThemeSwitch/ThemeSignal";

function App() {
  return (
    <div
      className={`${
        selectedThemeSignal.value === "dark" ? "dark" : "light"
      } theme-mode relative min-h-screen light text-foreground bg-background`}
    >
      <NavMenu />
      <div className="flex mt-6 flex-col w-full h-auto items-center justify-center">
        <div className="flex mb-12 w-full flex-row flex-wrap items-center justify-between max-w-[1536px]">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/result" element={<ResultListTable />} />
            <Route path="/menu" element={<MenuModuleResult />} />
            <Route path="/solution" element={<CodeCard />} />
            <Route path="/user" element={<UserHomePage />} />
            <Route
              path="/recover-account"
              element={
                <ProtectedRoute
                  authenticatedElement={<Navigate to="/" replace />}
                  unauthenticatedElement={<Account />}
                />
              }
            />
            <Route
              path="/recover"
              element={
                <ProtectedRoute
                  authenticatedElement={<Navigate to="/" replace />}
                  unauthenticatedElement={<Password />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  authenticatedElement={<Navigate to="/" replace />}
                  unauthenticatedElement={<Auth />}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  authenticatedElement={<UserProfile />}
                  unauthenticatedElement={<Navigate to="/" replace />}
                />
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute
                  authenticatedElement={<UploadContent />}
                  unauthenticatedElement={<Navigate to="/" replace />}
                />
              }
            />
            <Route
              path="/edit"
              element={
                <ProtectedRoute
                  authenticatedElement={<EditTask />}
                  unauthenticatedElement={<Navigate to="/" replace />}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
