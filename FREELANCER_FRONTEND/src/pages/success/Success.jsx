import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import "./Success.scss";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    // <div>
    //   Payment successful. You are being redirected to the orders page. Please do
    //   not close the page
    // </div>
    <div className="success">
      <div className="message">
        <h2>Payment Successful 🎉</h2>
        <p>You are being redirected to your orders page. Please do not close this page.</p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Success;