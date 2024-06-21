import { redirect } from "next/navigation";

// import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import PageContent from "@/components/PageContent";
import Navbar2 from "@/components/common/Navbar2";
// import { useLocale } from "next-intl";
// import { Suspense } from "react";

export default async function SignInPage() {
  // const locale = useLocale();
  // if (await isUserAuthenticated()) redirect(`/${locale}/home_screen`);

  return (
    <div>
      <PageContent variant="sign-in" />
    </div>
  );
}
