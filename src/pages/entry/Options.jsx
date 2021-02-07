import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

import ScoopOptions from "./ScoopOption";
import ToppingOption from "./ToppingOption";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // OptionType is "scoop" or "toppings"
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO: handler error
      });
  }, [optionType]);

  // TODO: replace "null" with ToppingOptions when available
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
