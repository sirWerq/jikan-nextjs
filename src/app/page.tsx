import HomePage from "./components/home/page";
import Navbar from "./components/navbar/page";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <HomePage />
    </div>
  );
}
