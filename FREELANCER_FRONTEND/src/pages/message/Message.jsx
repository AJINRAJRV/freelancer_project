import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from 'react'
import './Message.scss'
import { Link ,useParams } from 'react-router-dom'
import newRequest from "../../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  console.log("Messages Data:", data);
  console.log("First Message:", data?.[0]);

// Calculate the other user's ID
const otherUserId = data?.[0]?.userId === currentUser._id 
  ? id.replace(currentUser._id, "") // Extract the other ID from the conversationId
  : data?.[0]?.userId;

// Fetch the other user's details
const { data: otherUser, isLoading: loadingUser } = useQuery({
  queryKey: ["user", otherUserId],
  queryFn: () =>
    otherUserId ? newRequest.get(`/users/${otherUserId}`).then((res) => res.data) : null,
  enabled: !!otherUserId,
});

// Determine name to show
const nameToShow = loadingUser 
  ? "Loading..." 
  : otherUser?.username || "Unknown";


  return (
    <div className='message'>
      <div className="container">
        <span className="breadcrumbs">
          {/* <Link to='/messages'>MESSAGES</Link> {'>'} JOHN DOE {'>'} */}
          <Link to='/messages'>MESSAGES</Link> {'>'} {nameToShow} {'>'}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
      //     <div className="messages">
      //     {data.map((m) => (
      //       <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
      //         <img
      //           src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
      //           alt=""
      //         />
      //         <p>{m.desc}</p>
      //       </div>
      //     ))}
      //   </div>
      // )}
      <div className="messages">
            {data.map((m) => {
              const isCurrentUser = m.userId === currentUser._id;
              const messageUser = isCurrentUser ? currentUser : otherUser;

              return (
                <div className={isCurrentUser ? "owner item" : "item"} key={m._id}>
                  <img
                    src={messageUser?.img || "/images/noavatar.jpg"}
                    alt={messageUser?.username || "User"}
                  />
                  <p>{m.desc}</p>
                </div>
              );
            })}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message