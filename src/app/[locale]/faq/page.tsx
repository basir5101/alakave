import FAQ from "@/components/cms/faq";

import Navbar from "@/components/common/Navbar";

import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/Footer"; // Assuming this is your custom footer

export default function FAQPage() {
  return (
    <>
      <Navbar />

      <FAQ />

      <footer>
        <Footer />
      </footer>
    </>
  );
}
