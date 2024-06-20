import Navbar from "@/components/common/Navbar";
import NavbarIntro from "@/components/common/NavbarIntro";
import Footer from "@/components/Footer";
import Masthead from "@/components/ui/animations/Masthead";
import { useTranslations } from "next-intl";

export default function Index() {
  return (
    <>
      <NavbarIntro />
      <Masthead />
      <Footer />
    </>
  );
}
