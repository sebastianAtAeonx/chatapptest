import React, { useState } from 'react';
import SearchBar from '../../components/core/ui/SearchBar';
import SearchResults from '../../components/core/ui/SearchResults';
import axios from 'axios';
import { apiURl } from '../../config';
import MainBoard from '../../components/core/ui/MainBoard';
import { MdOutlineClear } from 'react-icons/md';
import { Box, LinearProgress, Skeleton, Typography } from '@mui/material';
import SentimentAnalysisChart from '../../components/core/ui/SentimentAnalysisChart';
import toast, { Toaster } from 'react-hot-toast';

function SearchEngine() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('news');
  const [searchTypeRequiredError, setSearchTypeRequiredError] = useState(false);
  const [searching, setSearching] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const [isInitialPage, setIsInitialPage] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [articleLoading, setArticleLoading] = useState(false);
  const [viewFullText, setViewFullText] = useState(false);
  const [viewSummary, setViewSummary] = useState(false);
  const [fullText, setFullText] = useState(null);
  const [summary, setSummary] = useState(null);
  const [activeTab, setActiveTab] = useState('View Article');
  const [searchFrom, setSearchFrom] = useState('database');
  const [searchFromValue, setSearchFromValue] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [sentimentData, setSentimentData] = useState([]);
  const filters = ['today', 'last week', 'last month', 'last quarter', 'last year'];
  const [filteredNews, setFilteredNews] = useState(null);
  const [resArray, setResArray] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  function handleEventSource() {
    setSelectedFilter(null);
    setSentimentData([]);
    setViewSummary(false);
    setViewFullText(false);
    setResArray([]);
    setSelectedArticle(null);
    setFilteredNews(null);

    if (!query) {
      return toast.error('Please type your search query.');
    }
    if (!searchType) {
      return setSearchTypeRequiredError(true);
    }
    if (searchType === 'news') {
      setShowBtns(true);
    }
    setIsInitialPage(false);
    setSearching(true);
    const eventSource = new EventSource(
      `${apiURl}/get_url?query=${query}&type=${searchType}&search_from=${searchFrom}`,
    );

    eventSource.onmessage = function (event) {
      const newData = JSON.parse(event.data);
      if (newData.length === 0) {
        return setResArray([]);
      }
      setResArray((prevArray) => {
        const updatedArray = [...prevArray, newData];
        if (updatedArray.length === 1) {
          setSelectedArticle(newData);
          setSentimentData([newData.sentiment]);
        }
        return updatedArray;
      });
    };

    eventSource.onerror = function (event) {
      console.log('EventSource Closed or Failed:', event);
      eventSource.close();
      setSearching(false);
    };
  }

  const searchTypeChangeHandler = (event) => {
    setSearchTypeRequiredError(false);
    setSearchType(event.target.value);
  };
  const summarizeNewsArticle = async (url) => {
    setSummary(null);
    setSummaryLoading(true);

    const summarizeApiUrl = `${apiURl}/summarize`;
    const requestBody = { url };

    try {
      const response = await axios.post(summarizeApiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.data) {
        throw new Error('No data received from the API');
      }

      setSummary(response.data);
      setViewSummary(true);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  const getFullArticle = async (url) => {
    setArticleLoading(true);
    const articleApiUrl = `${apiURl}/content`;
    const requestBody = JSON.stringify({
      url,
    });

    try {
      const response = await fetch(articleApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.body) {
        throw new Error('ReadableStream not supported in this environment');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let fetchedResults = [];

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          const messages = chunk?.split('\n').filter(Boolean);
          fetchedResults.push(...messages); // Accumulate fetched messages
        }
      }

      // Convert fetchedResults to objects
      const objects = fetchedResults
        .map((item) => {
          try {
            // Remove "data: " prefix if present
            const jsonString = JSON.stringify(
              item.replace(/^data: /, '') ? item.substring(6) : item,
            );
            // Attempt to parse JSON
            const parsedObject = JSON.parse(jsonString);
            return parsedObject;
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return null; // Handle parsing error gracefully
          }
        })
        .filter((obj) => obj !== null);

      setViewFullText(true);
      setFullText(objects);
      // console.log(objects);
    } catch (error) {
      console.error('Fetch error:', error);
    }
    setArticleLoading(false);
  };

  const handleSearchFilter = (filter) => {
    if (filter == 'clear') {
      setSelectedArticle(resArray[0]);
      setSelectedFilter(null);
      setSentimentData([resArray[0]?.sentiment]);
      return setFilteredNews(null);
    }
    setViewFullText(false);
    setFullText(null);
    setViewSummary(null);
    setSelectedFilter(filter);
    setFilteredNews(resArray.filter((item) => item.possible_filter.includes(filter)));
    setSelectedArticle(resArray.filter((item) => item.possible_filter.includes(filter))[0]);
    const sentimentArray = [];
    resArray.filter((item) => {
      if (item.possible_filter.includes(filter)) {
        sentimentArray.push(item.sentiment);
        return true;
      }
      return false;
    });
    setSentimentData(sentimentArray);
  };

  const handleSearchFromChange = (event) => {
    const isChecked = event.target.checked;
    setSearchFromValue(isChecked);
    if (isChecked) {
      setSearchFrom('google');
    } else {
      setSearchFrom('database');
    }
  };
  const handleTabSwitch = (event) => {
    setActiveTab(event.target.innerText);
  };

  const parseContent = (item) => {
    try {
      return JSON.parse(item.replace(/'g/, '')).content;
    } catch (error) {
      return 'No Content Found';
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden p-2 bg-[#f1f7fe]">
      <div className="flex w-full items-center justify-start">
        <p className="newsX-logo h-full mt-4 tracking-wider font-bold ml-5 select-none text-4xl whitespace-nowrap">
          NewsX
        </p>
        <div className="flex w-full items-center justify-center mt-6 mb-2">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleEventSource}
            setResArray={setResArray}
          />
          <div className="relative">
            <div className="flex items-center justify-end gap-5 m-2 mt-3">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="radio-1"
                  value="news"
                  checked={searchType == 'news'}
                  required
                  onChange={searchTypeChangeHandler}
                  className="radio radio-info"
                />
                <p>News</p>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="radio-1"
                  value="social_media"
                  required
                  onChange={searchTypeChangeHandler}
                  className="radio radio-info"
                />
                <p>Social Media</p>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="radio-1"
                  value="browse"
                  required
                  onChange={searchTypeChangeHandler}
                  className="radio radio-info"
                />
                <p>Browse</p>
              </label>
            </div>
            {searchTypeRequiredError && (
              <p className="text-sm w-full text-center text-red-600 absolute">
                Search type is required *
              </p>
            )}
          </div>
          <div className="p-3 flex justify-center gap-2">
            <input
              type="checkbox"
              className="toggle toggle-info"
              checked={searchFromValue}
              onChange={handleSearchFromChange}
              defaultChecked={false}
            />
            <label>Google</label>
          </div>
        </div>
      </div>
      {resArray.length > 0 && (
        <div className="w-full flex justify-center items-center gap-5 mt-1 mb-4">
          {filters.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSearchFilter(item)}
              className={`${
                selectedFilter === item ? 'gadient-effect' : 'shadow-gradient'
              } capitalize py-1 px-3 rounded-full text-gray-800 duration-200 relative shadow-md`}
            >
              {item}
              {selectedFilter === item && (
                <div className="text-sm absolute -top-2 -right-3 text-white flex justify-center items-center w-[1.35rem] h-[1.35rem] bg-[#3f5e5ad1] rounded-full">
                  {filteredNews ? filteredNews.length : resArray.length}
                </div>
              )}
            </button>
          ))}
          {selectedFilter && (
            <button
              onClick={() => handleSearchFilter('clear')}
              className={`shadow-md flex items-center gap-1 active:bg-slate-300 bg-slate-200 capitalize py-1 px-3 rounded-full hover:brightness-105 text-gray-800 duration-200`}
            >
              clear <MdOutlineClear />
            </button>
          )}
        </div>
      )}
      {isInitialPage ? (
        <div className="w-10/12 mx-auto h-[calc(100vh-200px)] flex justify-center items-center">
          <div>
            <h1 className="text-3xl text-slate-700 font-semibold newsx-heading-1 tracking-wider">
              Revolutionizing <span className="underlined1 underline-clip1">News</span> Aggregation
              with <span className="underlined2 underline-clip2">AI</span>
            </h1>
            <p className="mt-8 px-6 text-lg text-slate-500 tracking-wide">
              Welcome to NewsX, your AI-powered news aggregator designed to deliver a 360-degree
              view of the world&apos;s news. Our innovative search engine brings you the latest
              headlines, in-depth stories, and diverse perspectives, all in one place. Stay informed
              with real-time updates and enjoy a seamless, personalized news experience. With NewsX,
              you&apos;ll never miss a story that matters.
            </p>
            <p className="tracking-wide text-xl font-semibold mt-6 text-right text-slate-600">
              Stay informed with NewsX – where AI meets news.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-full">
          <div className="w-4/12 h-full">
            <div className="flex flex-col h-full pr-2 mb-12 pb-12">
              {searching && (
                <div className="w-full mt-1">
                  <Box sx={{ width: '90%', margin: 'auto' }}>
                    <LinearProgress color="inherit" sx={{ height: '5px', borderRadius: '20px' }} />
                  </Box>
                </div>
              )}

              <SearchResults
                results={filteredNews ? filteredNews : resArray}
                setViewSummary={setViewSummary}
                setViewFullText={setViewFullText}
                setSelectedArticle={setSelectedArticle}
                searching={searching}
                setSentimentData={setSentimentData}
              />
              {resArray.length > 0 && (
                <div className="absolute bottom-0 text-right pr-6 font-semibold p-2 backdrop-blur-sm w-4/12">
                  Total: {filteredNews ? filteredNews.length : resArray.length}
                </div>
              )}
            </div>
          </div>
          <div className="chatview chatui-fontColor w-8/12 h-[calc(100vh-150px)] overflow-y-auto shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex-grow overflow-y-auto">
                <div className="flex flex-col gap-4 overflow-y-scroll">
                  <div className="flex justify-between p-1 rounded-full w-4/12 mt-6 mx-auto text-sm bg-gray-200">
                    <button
                      onClick={handleTabSwitch}
                      className={`${
                        activeTab === 'View Article'
                          ? 'bg-gradient-to-r from-[#0072e5]/60 to-[#d399fa]/90 text-white'
                          : 'bg-gray-200 text-gray-600'
                      } px-5 py-2 rounded-full transition-all duration-200`}
                    >
                      View Article
                    </button>
                    <button
                      onClick={handleTabSwitch}
                      className={`${
                        activeTab === 'Sentiment Analysis'
                          ? 'bg-gradient-to-r from-[#0072e5]/60 to-[#d399fa]/90 text-white'
                          : 'bg-gray-200 text-gray-600'
                      } px-5 py-2 rounded-full transition-all duration-200`}
                    >
                      Sentiment Analysis
                    </button>
                  </div>
                  {activeTab === 'Sentiment Analysis' ? (
                    <div className="p-2 h-full w-full">
                      <SentimentAnalysisChart
                        chartData={sentimentData}
                        dataLength={sentimentData.length}
                      />
                    </div>
                  ) : (
                    <div>
                      {resArray && (
                        <MainBoard
                          getFullArticle={getFullArticle}
                          summarizeNewsArticle={summarizeNewsArticle}
                          data={selectedArticle}
                          showBtns={showBtns}
                        />
                      )}

                      <div className="text-gray-700 w-10/12 my-12 mx-auto">
                        {summaryLoading ? (
                          <Box sx={{ width: 'full' }}>
                            <Typography variant="h4">
                              <Skeleton sx={{ bgcolor: '#B5C0D0' }} />
                            </Typography>
                            <Skeleton sx={{ bgcolor: '#B5C0D0' }} />
                            <Skeleton sx={{ bgcolor: '#B5C0D0' }} />
                            <Skeleton sx={{ bgcolor: '#B5C0D0' }} />
                            <Skeleton sx={{ bgcolor: '#B5C0D0' }} />
                            <Skeleton sx={{ bgcolor: '#B5C0D0' }} />
                            <Skeleton sx={{ bgcolor: '#B5C0D0' }} />
                          </Box>
                        ) : (
                          <div>
                            {viewSummary && (
                              <>
                                <h2 className="text-xl font-semibold">Summary:</h2>
                                {summary?.summary?.map((item, index) => (
                                  <p key={index}>{item}</p>
                                ))}
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="w-10/12 my-12 mx-auto text-gray-700">
                        {articleLoading ? (
                          <div>
                            <Box sx={{ width: 'full' }}>
                              <Typography variant="h4">
                                <Skeleton sx={{ bgcolor: '#B5C0D0' }} />
                              </Typography>
                              {[...Array(20)].map((_, index) => (
                                <Skeleton key={index} sx={{ bgcolor: '#B5C0D0' }} />
                              ))}
                            </Box>
                          </div>
                        ) : (
                          viewFullText && (
                            <div className="text-justify">
                              <h2 className="text-xl font-semibold mt-4">Article:</h2>
                              {fullText?.map((item, index) => (
                                <p key={index}>{parseContent(item)}</p>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default SearchEngine;
