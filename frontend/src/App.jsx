import { selectedCourseSignal } from "./components/ui/SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "./components/ui/SelectMenu/SelectMenu";
import { NavMenu } from "./components/ui/NavMenu/NavMenu";
import { CodeCard } from "./components/ui/CodeCard/CodeCard";
import { SearchInput } from "./components/ui/NavMenu/SearchInput/SearchInput";
import { ResultListTable } from "./components/ui/ResultListTable/ResultListTable";
import Auth from "./components/forms/Auth/Auth";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";
import { UserProfile } from "./components/ui/User/UserProfile";
import { Navigate } from "react-router-dom";
import { NotFound } from "./components/ui/NotFound/NotFound";
import { UploadContent } from "./components/ui/User/UploadContent/UploadContent";

function App() {
  return (
    <>
      <NavMenu />
      <div className="flex mt-6 flex-col w-full h-auto items-center justify-center">
        <div className="flex px-6 mt-6 w-full flex-row flex-nowrap items-center justify-between max-w-[1536px]">
          <Routes>
            <Route path="/" element={<CodeCard />} />
            <Route path="/result" element={<ResultListTable />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
