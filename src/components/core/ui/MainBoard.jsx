import React from 'react';

function MainBoard({ getFullArticle, data, showBtns, summarizeNewsArticle }) {
  return (
    <div>
      <div className="w-10/12 h-full mt-8 mx-auto text-gray-700">
        <h2 className="uppercase font-semibold mb-1">{data?.source?.split('.').slice(-2, -1)}</h2>
        <h1 className="font-semibold text-2xl my-2 ">{data?.title}</h1>
        <p>{data?.description}</p>
        {showBtns && data && (
          <div className="flex items-center gap-4 mt-6">
            <button
              className="btn shadow-gradient2 bg-[#f3f3f6] hover:bg-slate-50 shadow-md"
              onClick={() => {
                getFullArticle(data?.url);
              }}
            >
              Read Article
            </button>
            <button
              className="btn shadow-gradient2 bg-[#f3f3f6] hover:bg-slate-50 shadow-md"
              onClick={() => summarizeNewsArticle(data.url)}
            >
              Summarize
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainBoard;
