import React, { Component } from "react";

import { genreServices } from "./../services/genreServices";
import { getmovies, postMovies, updateMovie } from "../services/movieService";
import Input from "./common/input";


class MovieForm extends Component {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genre: [],
    errors: {},
  };

  componentDidMount = async () => {
    const genres = await genreServices();
    this.setState({ genre: genres.data });

    if (this.props.match.params.id === "new") return;
    console.log(this.props.match.params.id);
    const movies = await getmovies();
    const movie = movies.data.filter((m) => {
      return this.props.match.params.id == m.id;
    });
    const data = {
      title: movie[0].title,
      genreId: movie[0].genre.id,
      numberInStock: movie[0].numberInStock,
      dailyRentalRate: movie[0].dailyRentalRate,
    };
    console.log(data);
    this.setState({ data });
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(this.state.data);
    if(this.props.match.params.id === "new"){
        await postMovies(this.state.data);
        this.props.history.push("/movies")
    }else{
    
      await updateMovie(this.state.data.genreId,this.state.data);
      this.props.history.push("/movies")
    }

  };
  handleChange = (e) => {
    e.preventDefault();
    const data = { ...this.state.data };
    data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data });
  };
  render() {
    return (
      <>
        <form>
          <Input
            name="title"
            label="Movie Name"
            onChange={this.handleChange}
            value={this.state.data.title}
            type="text"
          />
          <Input
            name="numberInStock"
            label="Number In Stock"
            onChange={this.handleChange}
            value={this.state.data.numberInStock}
            type="text"
          />
          <Input
            name="dailyRentalRate"
            label="Daily Rental Rate"
            onChange={this.handleChange}
            value={this.state.data.dailyRentalRate}
            type="text"
          />
          Genres:
          <select
            value={this.state.data.genreId}
            id="genreId"
            className="form-control"
            onChange={this.handleChange}
          >
              <option value="" disabled>Select Genre</option>
            {this.state.genre.map((m) => {
              return <option value={m.id}>{m.name}</option>;
            })}
          </select>
          <button
            className="btn btn-primary mt-4"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default MovieForm;
