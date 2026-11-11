import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SearchBox from "@/components/SearchBox";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="shell py-20 md:py-28">
        <p className="text-[15px] font-semibold text-brass-deep">Page not found</p>
        <h1 className="display mt-2 max-w-2xl text-[40px] text-ink md:text-[56px]">This page has moved or the part is gone.</h1>
        <p className="mt-4 max-w-xl text-[17px] text-ink-3">Search for it again, or go back to the home page.</p>
        <div className="mt-8 max-w-xl">
          <SearchBox size="md" />
        </div>
        <Link href="/" className="mt-6 inline-block text-[15px] font-semibold text-brass-deep underline underline-offset-4">
          Back to the home page
        </Link>
      </main>
    </>
  );
}
