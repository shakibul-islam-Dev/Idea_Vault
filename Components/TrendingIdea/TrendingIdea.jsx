import React from "react";

const TrendingIdea = async () => {
  const res = await fetch("http://localhost:4000/api/idea", {
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
