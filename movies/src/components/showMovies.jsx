import React from "react";
import Like from "./common/like";

import { Link } from "react-router-dom";

const ShowMovies = (props) => {
  const { pageMovies, handleLike, handleDelete, onSort,user } = props;
  console.log(user);
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
          {user&&user.user.isAdmin&&<><th></th>
          <th></th></>}
        </tr>
      </thead>
      <tbody>
        {pageMovies.map((m) => (
          <tr key={m.id}>
            
              <td><Link to={`/movies/${m.id}`}>{m.title}</Link></td>
            
            <td>{m.genre.name}</td>
            <td>{m.numberInStock}</td>
            <td>{m.dailyRentalRate}</td>
           { user&&user.user.isAdmin&&<><td>
              <Like liked={m.liked} onClick={() => handleLike(m)} />
            </td>
            <td
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(m)}
            >
              Delete
            </td></>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowMovies;
