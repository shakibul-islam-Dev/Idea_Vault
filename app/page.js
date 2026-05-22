import Sliders from "@/Components/Sliders/Sliders";
import TrendingIdea from "@/Components/TrendingIdea/TrendingIdea";

export const metadata = {
  title: "Home",
  description: "This is Home.",
};
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const res = await fetch(`${serverUrl}/api/idea`, { cache: "no-store" });
const data = await res.json();
export default function Home() {
  return (
    <>
      <main>
        <Sliders initialSlides={data.slice(0, 3)} />
        <TrendingIdea></TrendingIdea>
      </main>
    </>
  );
}
