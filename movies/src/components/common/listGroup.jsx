import React from "react";

const ListGroup = (props) => {
  const { items, onItemSelect, selectedItem } = props;
  return (
    <>
      <ul className="list-group">
        {items.map((m) => (
          <li
          style={{cursor:"pointer"}} 
            key={m.id}
            onClick={() => onItemSelect(m)}
            className={
              selectedItem === m ? "list-group-item active" : "list-group-item"
            }
          >
            {m.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListGroup;
