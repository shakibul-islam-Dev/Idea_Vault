import Sliders from "@/Components/Sliders/Sliders";
import TrendingIdea from "@/Components/TrendingIdea/TrendingIdea";

export const metadata = {
  title: "Home",
  description: "This is Home.",
};

export default function Home() {
  return (
    <>
      <main>
        <Sliders></Sliders>
        <TrendingIdea></TrendingIdea>
      </main>
    </>
  );
}
