import Layout from "@/components/layout";
import Authentication from "./components/pages/authentication";
import SubscriptionTiers from "@/components/pages/subscription-tiers";
import SubscriptionManagement from "@/components/pages/subscription-management";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/subscription" element={<SubscriptionTiers />} />
          <Route path="/manage" element={<SubscriptionManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
