import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [transaction, setTransaction] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getTransactions();
  }, []);
  const getTransactions = async () => {
    const response = await axios.post(
      `https://jp-dev.cityremit.global/web-api/transaction-manager/v1/admin/dashboard/search`,
      {
        headers: {
          Authorization: `Bearer ${user && user[0].jwt_token}`,
        },
      }
    );
    if (response.data === 200) {
      setTransaction(response.data);
    }
  };
  return (
    <>
      <div className="container justify-content-center mt-3">
        <h3 className="text-center">Transaction</h3>
        {transaction && transaction.length > 0 ? (
          transaction.map((tran) => (
            <React.Fragment key={tran.id}>
              {/* here goes list of transaction */}
            </React.Fragment>
          ))
        ) : (
          <p className="text-center">No Transaction to Display</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
