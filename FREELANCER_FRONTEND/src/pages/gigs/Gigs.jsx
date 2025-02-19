

import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const category = queryParams.get("cat") || ""; // Extract category from URL
  const searchQuery = queryParams.get("search")?.toLowerCase().replace(/\s+/g, ""); // Normalize search

  // Fetch gigs based on category, budget, and sorting

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", category, sort],
    queryFn: () =>
      newRequest
        .get(
          `/gigs?cat=${category}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => res.data),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    // refetch();
  }, [sort, category]); // Refetch data when category changes

  const apply = () => {
    refetch();
  };

  // Filter gigs based on search query
  const filteredGigs = data
    ? data.filter((gig) =>
        gig.title.toLowerCase().replace(/\s+/g, "").includes(searchQuery || "")
      )
    : [];


  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">gigSync {'>'} {category} {'>'}</span>
        <h1>{category || "All Gigs"}</h1>
        <p>Explore top-quality services in {category || "various categories"}</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="/images/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            "Loading"
          ) : error ? (
            "Something went wrong!"
          ) : filteredGigs.length > 0 ? (
            filteredGigs.map((gig) => <GigCard key={gig._id} item={gig} />)
          ) : (
            <p>No gigs found for this category</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;


