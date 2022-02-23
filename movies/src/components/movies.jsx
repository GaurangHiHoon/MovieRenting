import React, { Component } from "react";
// import { getMovies } from "../services/fakeMovieService";
import "bootstrap/dist/css/bootstrap.css";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginating } from "./common/paginating";
import ListGroup from "./common/listGroup";
import { genreServices } from "../services/genreServices";
import ShowMovies from "./showMovies";
import { getmovies,deleteMovies } from "../services/movieService";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    genre: "",
    search: "",
  };

  async componentDidMount() {
    console.log("In Render");
    const result = await getmovies();

    const genres = await genreServices();
    const out = [{ id: "", name: "All" }, ...genres.data];
    this.setState({ movies: result.data, genres: out });
  }

  handleDelete = async (e) => {
   
   await deleteMovies(e.id); 
   window.location="/movies";
  };
  handleLike = (m) => {
    console.log("Like Clicked", m.title);
    const movies = [...this.state.movies];
    const index = movies.indexOf(m);
    // movies[index]={...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreselect = (value) => {
    console.log(value);
    this.setState({ genre: value, currentPage: 1 });
  };

  handleSort = (path) => {
    const data = _.orderBy(this.state.movies, path, "asc");
    console.log(data);
    this.setState({ movies: data });
  };

  handleSearch = (e) => {
    const data = e.currentTarget.value;
    this.setState({ search: data });
  };

  render() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;
    const filtered = !this.state.search
      ? this.state.genre && this.state.genre.id
        ? this.state.movies.filter(
            (m) => m.genre.name === this.state.genre.name
          )
        : this.state.movies
      : this.state.movies.filter(m=>m.title.toLowerCase().startsWith(this.state.search.toLowerCase()));
    const pageMovies = paginating(
      filtered,
      this.state.pageSize,
      this.state.currentPage
    );

    const user=this.props.user;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreselect}
            selectedItem={this.state.genre}
          />
        </div>
        <div className="col-9">
          {user&&<Link to="/movies/new" className="btn btn-primary m-2">
            New Movie
          </Link>}
          <p>Showing {pageMovies.length} movies on this page.</p>
           <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={this.handleSearch}
          />

          <ShowMovies
            pageMovies={pageMovies}
            handleLike={this.handleLike}
            handleDelete={this.handleDelete}
            onSort={this.handleSort}
            user={user}
          />
          <Pagination
            current={this.state.currentPage}
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
