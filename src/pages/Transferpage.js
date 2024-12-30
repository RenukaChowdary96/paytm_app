import React, { useState } from "react";
import NormalHeader from "../components/normal-header";
import transferImage from "../images/TRANSFER PAGE.avif";

const TransferPage = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, amount }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };
  

  return (
    <div>
      <NormalHeader />
      <div className="transfer-container">
        <div className="transfer-left">
          <h1>The Most Reliable UPI Payment App in the Country.</h1>
          <p>
            With our app, <strong>Transfer Funds</strong> or <strong>Pay</strong> anyone
            without worry. Convenient with built-in safety features, easy access
            to account balance, and payment history.
          </p>
          <div className="transfer-form">
            <label>Recipient Phone Number:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient phone number"
            />

            <label>Enter Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount to transfer"
            />

            <button onClick={handleTransfer} className="transfer-btn">
              Transfer
            </button>
          </div>
        </div>

        <div className="transfer-right">
          <div className="illustration">
            <img
              src={transferImage}
              alt="UPI Payment Illustration"
              className="mobile-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
