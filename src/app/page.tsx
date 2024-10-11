import HomePage from "./components/home/page";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
