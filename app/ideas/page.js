import SearchIdea from "@/Components/SearchIdea/SearchIdea";
import IdeaContainer from "@/Components/IdeaContainer/IdeaContainer";

export default async function Home({ searchParams }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || "";
  const category = resolvedParams?.category || "";

  return (
    <main className="container mx-auto py-10 px-4">
      <SearchIdea />
      <IdeaContainer query={query} category={category} />
    </main>
  );
}
