import React, { useEffect, useState, useRef } from "react";
import { defaultCountry, initialState } from "../../constants/news";
import InfiniteList from "../../components/infinite-list";
import "./index.css";

const NewsList = () => {
  const [newsData, setNewsData] = useState(initialState);
  const tableRef = useRef(null);
  const fetchNews = async (search = null) => {
    const url = search ? `/api/news/search?search=${search}` : `/api/news?country=${defaultCountry}`;
    try {
      const newsList = await fetch(url);
      const { totalResults, articles } = await newsList.json();
      setNewsData({ totalResults, articles });
    } catch {
      setNewsData(initialState);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (tableRef && tableRef.current) {
      tableRef.current.forceUpdateGrid();
    }
  }, [newsData]);

  const handleOnChange = (event) => {
    const { value } = event.target;
    if (value) {
      fetchNews(value);
    } else {
      fetchNews();
    }
  };

  const rowRenderer = (newsItem) => {
    const { author, description, publishedAt, title, url, urlToImage } = newsItem;
    const date = new Date(publishedAt);
    const displayDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    return (
      <div className="news-item-row">
        <div className="news-image">
          <img src={urlToImage} alt={title} />
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
        <InfiniteList list={newsData.articles} rowCount={newsData.articles.length} rowRenderer={rowRenderer} setRef={tableRef} />
      </div>
    );
  };

  return (
    <div>
      <div className="filter-key-keyword-container">
        <input type="text" placeholder="Filter by key words" className="filter-key-keyword" onChange={handleOnChange} />
      </div>
      {newsData && newsData.articles.length > 0 ? renderNewsList() : "No News"}
    </div>
  );
};

export default NewsList;
