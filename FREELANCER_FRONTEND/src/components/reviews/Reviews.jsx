// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React from "react";
// import newRequest from "../../utils/newRequest";
// import Review from "../review/Review";
// import "./Reviews.scss";

// const Reviews = ({ gigId }) => {

//   const queryClient = useQueryClient()
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["reviews"],
//     queryFn: () =>
//       newRequest.get(`/reviews/${gigId}`).then((res) => {
//         return res.data;
//       }),
//   });

//   const { data: orders } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () => newRequest.get("/orders").then((res) => res.data),
//   });
  
//   const hasPurchasedGig = orders?.some((order) => order.gigId === gigId);
  

//   // const mutation = useMutation({
//   //   mutationFn: (review) => {
//   //     return newRequest.post("/reviews", review);
//   //   },
//   //   onSuccess:()=>{
//   //     queryClient.invalidateQueries(["reviews"])
//   //   }
//   // });

//   const mutation = useMutation({
//     mutationFn: (review) => {
//       return newRequest.post("/reviews", review, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Include token
//         },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["reviews"]);
//     },
//   });
  

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const desc = e.target[0].value;
//   //   const star = e.target[1].value;
//   //   mutation.mutate({ gigId, desc, star });
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const desc = e.target[0].value;
//     const star = e.target[1].value;
  
//     console.log("Submitting review for gig:", gigId); // ✅ Debugging log
  
//     mutation.mutate({ gigId, desc, star });
//   };
  

//   return (
//     <div className="reviews">
//       <h2>Reviews</h2>
//       {isLoading
//         ? "loading"
//         : error
//         ? "Something went wrong!"
//         : data.map((review) => <Review key={review._id} review={review} />)}
//       {hasPurchasedGig && (
//         <div className="add">
//           <h3>Add a review</h3>
//           <form action="" className="addForm" onSubmit={handleSubmit}>
//             <input type="text" placeholder="Write your opinion" />
//             <select name="" id="">
//               <option value={1}>1</option>
//               <option value={2}>2</option>
//               <option value={3}>3</option>
//               <option value={4}>4</option>
//               <option value={5}>5</option>
//             </select>
//             <button>Send</button>
//           </form>
//         </div>
//         )}

//     </div>
//   );
// };

// export default Reviews;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest.js";
import Review from "../review/Review";
import "./Reviews.scss";
import getCurrentUser from "../../utils/getCurrentUser";


const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState("");

  const user = getCurrentUser();


  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId], // ✅ Unique query key per gig
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });


  // ✅ Check if user has purchased this gig
  const hasPurchasedGig = orders?.some((order) => order.gigId === gigId);

  // ✅ Only allow buyers to see the "Add Review" form (sellers should NOT see it)
  const isBuyer = user && !user.isSeller; // ✅ Buyer if isSeller is false


  console.log("User:", user);
  console.log("Orders:", orders);
  console.log("isBuyer:", isBuyer);
  console.log("hasPurchasedGig:", hasPurchasedGig);


  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
      setErrorMessage(""); // ✅ Clear error message on success
    },
    onError: (err) => {
      if (err.response && err.response.status === 403) {
        setErrorMessage("You have already reviewed this gig.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;

    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>

      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : data.length > 0 ? (
        data.map((review) => <Review key={review._id} review={review} />)
      ) : (
        <p>No reviews yet.</p> // ✅ Show this when no reviews exist
      )}

      {errorMessage && <p className="error">{errorMessage}</p>}

      {hasPurchasedGig && isBuyer && (
        <div className="add">
          <h3>Add a review</h3>
          <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Write your opinion" required />
            <select required>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;





