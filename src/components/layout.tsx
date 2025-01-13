import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const title = "Offshorly";
  const navItems = [
    { label: "Tiers", to: "/" },
    { label: "Manage", to: "/manage" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} navItems={navItems}/>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer title={title} />
    </div>
  );
};

export default Layout;
