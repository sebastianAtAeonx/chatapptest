// src/components/SearchResults.jsx
import React from 'react';

const SearchResults = ({
  results,
  setSelectedArticle,
  searching,
  setViewFullText,
  setViewSummary,
  setSentimentData,
}) => {
  return (
    <div className="mt-2 mb-20 px-5 py-2 overflow-y-scroll overflow-x-hidden relative">
      {results.length > 0
        ? results.map((result, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedArticle(result);
                setViewFullText(false);
                setViewSummary(false);
                setSentimentData([result.sentiment]);
              }}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
              className="p-4 my-2 mb-6 overflow-hidden rounded-xl shadow-md cursor-pointer duration-200 shadow-gradient h-[180px] group"
            >
              <div>
                <h2 className="uppercase text-[0.8rem] leading-4 w-fit px-2 py-1 mb-5 rounded-lg font-semibold bg-gradient-to-l from-[#0072e5]/40 to-[#d399fa]/70 group-hover:bg-gradient-to-r transition-[background] duration-1000">
                  {result?.source?.split('.').slice(-2, -1)}
                </h2>
                <a
                  className="font-thin text-sm italic text-[#9F8170]"
                  href={result?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {result?.url?.substring(0, 55)}...
                </a>
                <h2 className="text-lg mt-1 font-semibold">
                  {result?.title?.substring(0, 78)} {'  '}
                  {result?.title?.length > 78 && (
                    <span className="text-base italic font-medium underline text-gray-500">
                      Read More
                    </span>
                  )}
                </h2>
              </div>
            </div>
          ))
        : !searching && <p className="text-center">No Results Found</p>}
    </div>
  );
};

export default SearchResults;
