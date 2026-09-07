import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Translator } from "@/components/shared/translator";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <Translator/>
    </>
  );
}