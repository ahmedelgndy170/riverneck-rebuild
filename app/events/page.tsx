import EventsPage from "@/components/EventsPage";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <EventsPage />
      <Footer />
    </main>
  );
}