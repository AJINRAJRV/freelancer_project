import React, { useState } from "react";
import './Featured.scss'
import { Link, useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the perfect <i>freelance</i>  services for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="./images/search.png" alt="" />
                        <input 
                            type="text" 
                            placeholder='Try "building mobile app"'
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit}>Search</button>
                </div>
                <div className="popular">
                <Link to={`/gigs?cat=${encodeURIComponent("Web")}`}><button>Web Design</button></Link>
                <Link to={`/gigs?cat=${encodeURIComponent("Gaming")}`}><button>Gaming</button></Link>
                <Link to={`/gigs?cat=${encodeURIComponent("Design")}`}><button>Design</button></Link>
                <Link to={`/gigs?cat=${encodeURIComponent("AI")}`}><button>AI Services</button></Link>

                </div>
            </div>
            <div className="right">
                <img src="./images/man.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Featured