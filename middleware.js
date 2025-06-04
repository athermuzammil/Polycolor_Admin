import { createI18nMiddleware } from "next-international/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "de"],
  defaultLocale: "de"
});

export function middleware(request) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/static/media/|favicon.ico).*)"],
};
  