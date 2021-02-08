import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  function onClickHandler() {
    // Clear the order details
    resetOrder();

    // Send back to order page
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontsize: "25%" }}>
          As per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={onClickHandler}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
