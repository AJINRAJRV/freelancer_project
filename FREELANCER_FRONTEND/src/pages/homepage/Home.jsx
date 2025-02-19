import React, { useState } from "react";
import './Home.scss'


import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from '../../components/Slide/Slide';
import {cards, projects} from '../../data'
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const Home = () => {
    
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#gigSyncBusiness") {
            document.getElementById("gigSyncBusiness")?.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);
    return (
      <div className="home">
        <Featured/>
        <TrustedBy/>
        <Slide slidesToShow={5} arrowsScroll={true}>
          {cards.map((card) => (
            <CatCard key={card.id} card={card} />
          ))}
        </Slide>
    
        <div className="features">
          <div className="container">
            <div className="item">
              <h1>A whole world of freelance talent at your fingertips</h1>
              <div className="title">
                <img src="/images/check.png" alt="" />
                The best for every budget
              </div>
              <p>Find high-quality services at every price point.No hourly rates,
                just project-based pricing.
              </p>
              <div className="title">
                <img src="/images/check.png" alt="" />
                Quality work done quickly
              </div>
              <p>Find the right freelancer to begin working on your project within
              minutes.
              </p>
              <div className="title">
                <img src="/images/check.png" alt="" />
                Protected payments, every time
              </div>
              <p>Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
              </p>
              <div className="title">
                <img src="/images/check.png" alt="" />
                24/7 support
              </div>
              <p>Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
              </p>
            </div>
            <div className="item">
              <video src="/images/newVideo.mp4" controls></video>
            </div>
          </div>
        </div>

        <div className="explore">
          <div className="container">
            <h1>Explore the marketplace</h1>
            <div className="items">
              {[
                { title: "Graphics & Design", path: "Design", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg" },
                { title: "Digital Marketing", path: "Marketing", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg" },
                { title: "Writing & Translation", path: "Writing", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg" },
                { title: "Animation", path: "Animation", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg" },
                { title: "Music & Audio", path: "Music", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg" },
                { title: "Programming & Tech", path: "Programming", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg" },
                { title: "Business", path: "Business", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg" },
                { title: "Gaming", path: "Gaming", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg" },
                { title: "Data Science & Analytics", path: "Data", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg" },
                { title: "Video Editing", path: "Video", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg" },
              ].map((category, index) => (
                <Link key={index} to={`/gigs?cat=${encodeURIComponent(category.path)}`} className="item-link link">
                  <div className="item">
                    <img src={category.img} alt={category.title} />
                    <div className="line"></div>
                    <span>{category.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>


        <div id="gigSyncBusiness" className="features dark">
          <div className="container">
            <div className="item">
              <h1>gigSync <i>Business</i></h1>
              <h1>A business solution designed for <i>teams</i> </h1>
              <p>Upgrade to a curated experience packed with tools and benifits,
                dedicated to businesses
              </p>
              <div className="title">
                <img src="/images/check.png" alt="" />
                Connect to freelancers with proven business experience
              </div>
              <div className="title">
                <img src="/images/check.png" alt="" />
                Get matched with the perfect talent by a customer success manager
              </div>
              <div className="title">
                <img src="/images/check.png" alt="" />
                Manage teamwork and boost productivity with one powerful workspace
              </div>
              <button>Explore gigSync Business</button>
            </div>
            <div className="item">
              <img src="https://sg.fiverrcdn.com/press_release/1068/Press-Page%20-%201_press_image_1600171796.jpg" alt="" />
            </div>
          </div>
        </div>
        <Slide slidesToShow={4} arrowsScroll={1}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
        
      </div>
    );
  };
  
  export default Home;

  
