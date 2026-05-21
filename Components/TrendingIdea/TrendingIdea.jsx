import React from "react";

const TrendingIdea = async () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${serverUrl}/api/idea`, {
    cache: "no-store",
  });
  const datas = await res.json();
  return (
    <div>
      <h1>Trending Ideas</h1>
    </div>
  );
};

export default TrendingIdea;
