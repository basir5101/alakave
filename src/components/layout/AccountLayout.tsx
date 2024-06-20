import AccountSideNav from "../common/AccountSideNav";
import Navbar2 from "../common/Navbar2";
import Footer from "../Footer";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar2 />
      <div className="flex m-auto max-w-[1420px] pt-24 px-5 md:px-12 flex-col md:flex-row">
        <div className="w-full max-h-screen pt-3 top-0 flex-none md:w-72 md:border-r-2 pr-5">
          <AccountSideNav />
        </div>
        <div className="md:ml-10 w-full mb-8 ">{children}</div>
      </div>
      <Footer />
    </>
  );
}
