import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useLocation } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const[active,setActive]=useState(false)
  const[open,setOpen]=useState(false)

  const {pathname} =useLocation()

  const isActive =()=>{
    window.scrollY >0 ? setActive(true) : setActive(false)
  }

  useEffect(()=>{
    window.addEventListener("scroll",isActive);

    return ()=>{
      window.removeEventListener("scroll",isActive);
    }
  },[])

  const currentUser=JSON.parse(localStorage.getItem("currentUser"));

  const navigate= useNavigate();

  const handleLogout = async ()=>{
    try {
      await newRequest.post("/auth/logout");
      localStorage.clear(); // Clears all localStorage items
      sessionStorage.clear(); // Clears sessionStorage
      // localStorage.removeItem("currentUser"); // Properly clear stored user
      // window.location.reload(); // Force state reset
      window.history.pushState(null, null, "/login");
      window.location.replace("/login"); // Ensure no back navigation

      //navigate("/");
    } catch (err) {
      console.log(err)
    }
  }

  

  return (
    <div className={active || pathname!=='/' ? 'navbar active' : 'navbar'}>
      <div className="container">
          <div className="logo">
            <Link to={'/'} className='link'>
            <span className='text'>gigSync</span>
            </Link>
            <span className='dot'>.</span>
          </div>
        <div className="links">
          {/* <span>gigSync Business</span> */}
          <Link to="/#gigSyncBusiness" className="link">gigSync Business</Link>

          <Link className="link" to="/gigs">Explore</Link>
          <Link className="link" to="/terms-of-service">Terms of Service</Link>
          {/* {!currentUser?.isSeller && <span>Become a Seller</span>} */}

          {currentUser ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src={currentUser.img || "/images/noavatar.jpg"}
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <>
              <Link to="/login" className='link'>Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !=='/' )&& (
        <>
          <hr/>
          <div className='menu'>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("Design")}`}>
            Graphics & Design
          </Link>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("Animation")}`}>
            Video & Animation
          </Link>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("Writing")}`}>
            Writing & Translation
          </Link>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("AI")}`}>
            AI Services
          </Link>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("Marketing")}`}>
            Digital Marketing
          </Link>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("Music")}`}>
            Music & Audio
          </Link>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("Programming")}`}>
            Programming & Tech
          </Link>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("Business")}`}>
            Business
          </Link>
          <Link className='link menuLink' to={`/gigs?cat=${encodeURIComponent("Gaming")}`}>
            Gaming
          </Link>
          </div>
          <hr/>
        </>
      )}
    </div>
  )
}

export default Navbar



