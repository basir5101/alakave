import AboutUs from "@/components/cms/about-us";
import Legal from "@/components/cms/legal";
import Navbar from "@/components/common/Navbar";

import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/Footer"; // Assuming this is your custom footer

export default function LegalPage() {
  return (
    <>
      <Navbar />

      <Legal />
      {/* <Legal pageContent={{}} /> */}

      <footer>
        <Footer />
      </footer>
    </>
  );
}
