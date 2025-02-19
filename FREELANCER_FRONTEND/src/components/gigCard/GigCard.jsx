// import React from 'react'
// import './GigCard.scss'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query';
// import newRequest from '../../utils/newRequest.js';

// const GigCard = ({item}) => {

//     const { isLoading, error, data} = useQuery({
//         queryKey: [item.userId],
//         queryFn: () =>
//           newRequest.get(
//             `/users/${item.userId}`
//           )
//           .then((res) => {
//             return res.data;
//           }),
//       });

//   return (
//     <Link to={`/gig/${item._id}`} className='link'>
//         <div className='gigCard'>
//             <img src={item.cover} alt="" />
//             <div className="info">
//                 {isLoading ? (
//                     "Loading" 
//                 ): error ? (
//                     "Something went wrong!"
//                 ) : ( <div className="user">
//                     <img src={data.img || "/images/noavatar.jpg"} alt="" />
//                     <span>{data.username}</span>
//                 </div>
//             )}
//                 <p>{item.desc}</p>
//                 <div className="star">
//                     <img src="./images/star.png" alt="" />
//                     <span>{!isNaN(item.totalStars / item.starNumber) &&
//                      Math.round(item.totalStars / item.starNumber)}</span>
//                 </div>
//             </div>
//             <hr />
//             <div className="details">
//                 <img src="./images/heart.png" alt="" />
//                 <div className="price">
//                     <span>STARTING AT</span>
//                     <h2>
//                         ${item.price}
                        
//                     </h2>
//                 </div>
//             </div>
//         </div>
//     </Link>
//   );
// };

// export default GigCard

import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const GigCard = ({ item }) => {
  if (!item) return <div>Error: Gig data is missing</div>;

  console.log("Item:", item);
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover || "/images/default-cover.jpg"} alt="Gig Cover" />
        <div className="info">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            <span style={{ color: "red" }}>Error: {error.message}</span>
          ) : (
            <div className="user">
              <img src={data?.img || "/images/noavatar.jpg"} alt="User Avatar" />
              <span>{data?.username || "Unknown User"}</span>
            </div>
          )}
          <p>{item.desc || "No description available"}</p>
          <div className="star">
            <img src="/images/star.png" alt="Rating" />
            <span>
              {item.starNumber > 0
                ? Math.round(item.totalStars / item.starNumber)
                : "No ratings"}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="/images/heart.png" alt="Like" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price || "N/A"}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
