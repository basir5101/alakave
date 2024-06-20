import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";
export default createMiddleware({
  localePrefix,
  locales,

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en)/:path*"],
};
