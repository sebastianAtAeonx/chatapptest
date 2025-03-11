import React from 'react';
import { Link } from 'react-router-dom';

function Card({ data }) {
  return (
    <div className="w-full md:w-3/12 h-[210px] group group-hover:scale-[102%] transition-all duration-300 will-change-transform">
      <div className="card glass">
        <div className="px-5 py-6">
          <h2 className="card-title">{data.name}</h2>
          <p>{data.description}</p>
          <div className="card-actions justify-end">
            <Link className="" to={data.route}>
              <button
                className="text-white btn capitalize tracking-wider bg-base-200 py-4 px-5 min-h-fit h-auto hover:bg-base-200/90
              outline-none border-none"
              >
                Launch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
