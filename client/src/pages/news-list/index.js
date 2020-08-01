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
    console.log("newsItem", newsItem);
    const { author, description, publishedAt, title, url, urlToImage } = newsItem;
    const date = new Date(publishedAt);
    const displayDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    return (
      <div className="news-item-row">
        <div className="news-image">
          <img src={urlToImage} alt={title}/>
        </div>
        <div className="news-content">
          <a className="news-title" href={url}>
            {title}
          </a>
          <div className="news-description">{description}</div>
          <div className="news-author">Author: {author}</div>
          <div className="published-at">Published at: {displayDate}</div>
        </div>
      </div>
    );
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
