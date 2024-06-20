
import HowiTWorks from "@/components/cms/how-it-works";
import Navbar from "@/components/common/Navbar";

import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/Footer"; // Assuming this is your custom footer

export default function AboutUsPage() {
  return (
    <>
       
        <Navbar />
    
   
      <HowiTWorks />
    
      
      <footer className="mt-8">
        <Footer />
      </footer>
    </>
  );
}