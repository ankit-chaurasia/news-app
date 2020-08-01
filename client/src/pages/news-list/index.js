import React, { useEffect, useState } from "react";
import { defaultCountry, initialState } from "../../constants/news";
import InfiniteList from "../../components/infinite-list";
import "./index.css";

const NewsList = () => {
  const [newsData, setNewsData] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const newsList = await fetch(`/api/news?country=${defaultCountry}`);
        const { response } = await newsList.json();
        const { totalResults, articles } = response;
        setNewsData({ totalResults, articles });
      } catch {
        setNewsData(initialState);
      }
    }
    fetchData();
  }, []);

  const rowRenderer = (newsItem) => {
    console.log("each item", newsItem);
    return "test";
  };

  const renderNewsList = () => {
    return (
      <div className="news-list-container ">
        <InfiniteList list={newsData.articles} rowCount={newsData.articles.length} rowRenderer={rowRenderer} />
      </div>
    );
  };

  return <div>{newsData && newsData.articles.length > 0 ? renderNewsList() : "No News"}</div>;
};

export default NewsList;
