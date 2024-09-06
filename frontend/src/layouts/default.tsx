import Header from "@/components/header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <div className="flex flex-row space-x-6 justify-start">
          <p className="mt-4">Made possible with</p>
          <a href="https://www.qai.ca">
            <img src="/qai.png" width="65" />
          </a>
          <a href="https://www.dwavesys.ca">
            <img src="/dwave.png" width="175" height="14" />
          </a>
        </div>
      </footer>
    </div>
  );
}
