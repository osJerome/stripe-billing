import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout";
import SubscriptionTiers from "@/components/pages/subscription-tiers";
import ManageSubscription from "@/components/pages/manage-subscription";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SubscriptionTiers />} />
          <Route path="/manage" element={<ManageSubscription />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
