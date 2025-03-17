import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ReviewsPage from "./components/reviews/ReviewsPage";
import RequestsPage from "./components/requests/RequestsPage";
import SettingsPage from "./components/settings/SettingsPage";
import WidgetPage from "./components/widget/WidgetPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/widget" element={<WidgetPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
