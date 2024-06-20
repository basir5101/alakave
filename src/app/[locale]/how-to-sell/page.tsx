
import HowToSell from "@/components/cms/how-to-sell";
import Navbar from "@/components/common/Navbar";

import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/Footer"; // Assuming this is your custom footer

export default function AboutUsPage() {
  return (
    <>
       
        <Navbar />
    
   
      <HowToSell />
    
      
      <footer className="mt-8">
        <Footer />
      </footer>
    </>
  );
}