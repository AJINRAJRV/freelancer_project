import React from "react";
import { Link } from "react-router-dom";
import "./TermsofServices.scss";

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>
      <p>Last Updated: February 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to GigSync! These Terms of Service govern your use of our freelance platform. By using our services, you agree to these terms.</p>
      </section>

      <section>
        <h2>2. User Accounts</h2>
        <p>- Users must be at least 18 years old to register.<br />
           - You are responsible for maintaining the security of your account.<br />
           - Any fraudulent activity may lead to account suspension.</p>
      </section>

      <section>
        <h2>3. Payments & Transactions</h2>
        <p>- GigSync acts as an intermediary between freelancers and clients.<br />
           - Payments are securely processed, and refunds are subject to our refund policy.<br />
           - Users must comply with all tax and legal obligations.</p>
      </section>

      <section>
        <h2>4. Prohibited Activities</h2>
        <p>- No posting of illegal content.<br />
           - No harassment, discrimination, or spamming.<br />
           - Violation of these terms may lead to permanent suspension.</p>
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        <p>We provide our platform "as is" and are not responsible for disputes between freelancers and clients.</p>
      </section>

      <section>
        <h2>6. Changes to Terms</h2>
        <p>GigSync reserves the right to update these terms at any time. Continued use of the platform means you accept the latest version.</p>
      </section>

      <Link to="/" className="back-btn">Back to Home</Link>
    </div>
  );
};

export default TermsOfService;
