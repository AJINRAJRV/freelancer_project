import React  ,{ useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Gig.scss";

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser.js";



function Gig() {

  const currentUser = getCurrentUser();
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user",, userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });



  useEffect(() => {
    const carousel = document.querySelector(".carousel");
    const images = document.querySelectorAll(".carousel img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
  
    if (!carousel || images.length === 0 || !prevBtn || !nextBtn) return;
  
    let currentIndex = 1; // Start at the first cloned image
    const totalImages = images.length;
  
    let autoSlideInterval;
  
    const updateCarousel = () => {
      carousel.style.transition = "transform 0.5s ease";
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
  
    const startAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        handleNext();
      }, 3000);
    };
  
    const handleNext = () => {
      if (currentIndex >= totalImages - 1) return;
      currentIndex++;
      updateCarousel();
      startAutoSlide();
    };
  
    const handlePrev = () => {
      if (currentIndex <= 0) return;
      currentIndex--;
      updateCarousel();
      startAutoSlide();
    };
  
    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);
  
    carousel.addEventListener("transitionend", () => {
      if (images[currentIndex]?.id === "lastClone") {
        carousel.style.transition = "none";
        currentIndex = images.length - 2;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
      if (images[currentIndex]?.id === "firstClone") {
        carousel.style.transition = "none";
        currentIndex = 1;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    });
  
    // Start the initial auto-slide
    startAutoSlide();
  
    return () => {
      nextBtn.removeEventListener("click", handleNext);
      prevBtn.removeEventListener("click", handlePrev);
      clearInterval(autoSlideInterval);
    };
  }, [data?.images]);

  const category = data?.cat || "Unknown Category";
  

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
            gigSync {">"} {category} {">"} {data.title}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser?.img || "/images/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser?.username || "Unknown User"}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/images/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            <div className="slider">
              <div className="carousel">
                {data?.images?.length > 0 && (
                  <img
                    src={data.images[data.images.length - 1]}
                    alt="Last Clone"
                    id="lastClone"
                  />
                )}

                {data?.images?.map((img, index) => (
                  <img key={index} src={img} alt={`Slide ${index + 1}`} />
                ))}

                {data?.images?.length > 0 && (
                  <img src={data.images[0]} alt="First Clone" id="firstClone" />
                )}
              </div>
              <div className="prev">&#10094;</div>
              <div className="next">&#10095;</div>
            </div>


            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser?.img || "/images/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/images/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/images/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/images/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/images/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {console.log("Current User:", currentUser)}
            {!currentUser?.isSeller && (
              <Link to={currentUser ? `/pay/${id}` : "/login"}>
                <button>Continue</button>
              </Link>
            )}

            
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;