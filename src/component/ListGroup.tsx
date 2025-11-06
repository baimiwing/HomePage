import { MouseEvent, useState } from "react";

function ListGroup() {
  let items = ["New York", "San Francisco", "Tokyo", "London"];
  let selectedItem = 0;
  const handleClick = (event: MouseEvent) => {
    console.log(event);
    const arr = useState(-1);
    arr[0];
    arr[1];
  };
  return (
    <div>
      <h1>list</h1>
      {items.length === 0 && <p>no item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedItem === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              selectedItem = index;
              handleClick;
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;
