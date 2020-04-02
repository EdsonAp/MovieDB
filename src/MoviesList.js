import React, { Component } from "react";
import styled from "styled-components";
import Movie from "./Movie";


class MoviesList extends Component {
  state = {
    movies: [],
    pageNumber: 1,
  };

  
  clickHandler = (pageNumber) => {
    this.setState({pageNumber});
    this.fetchMoreMovies(pageNumber);
  };

  fetchMoreMovies = async (page) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=72fb3457014533b9c7a1d7d1bb1a9e3f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    const movies = await res.json();
    this.setState({
      movies: [...this.state.movies, ...movies.results]
    });
    console.log(this.state.movies);

  }
 
  componentDidMount() {
    try {
      const pageNumber = this.state;
      this.fetchMoreMovies(pageNumber);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    //destructuring
    const { pageNumber, movies } = this.state;
    return (
      <div>
        <MovieGrid>{movies.map(movie => 
          (<Movie key={movie.id} movie={movie}/>))}
        </MovieGrid>
        <button onClick={() => this.clickHandler(pageNumber + 1)}>MORE MOVIES</button>
      </div>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
