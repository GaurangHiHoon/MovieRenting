import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const items = _.range(1, pagesCount + 1);

  if (pagesCount===1){
    return null
  }

  return (
    <nav>
      <ul className="pagination">
        {items.map((n1) => {
          return (
            <li
              className={
                props.current === n1 ? "page-item active" : "page-item"
              }
              key={n1}
            >
              <a className="page-link" onClick={() => onPageChange(n1)}>
                {n1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
