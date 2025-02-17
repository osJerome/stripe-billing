import Layout from "@/components/layout";
import SubscriptionTiers from "@/components/pages/subscription-tiers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SubscriptionTiers />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
