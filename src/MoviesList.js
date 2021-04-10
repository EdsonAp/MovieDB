import React from "react";
import styled from "styled-components";
import Movie from "./Movie";


const MoviesList = ({
  updatePageNumber,
  state: {
    movies,
    pageNumber,
  }
}) => (
  <React.Fragment>
    <MovieGrid>
      {movies.map(movie=> <Movie key={movies.id} movie={movie} />)}
    </MovieGrid>
    <Button type='button' onClick={() =>updatePageNumber(pageNumber + 1)}>MORE MOVIES</Button>
  </React.Fragment>
)

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  background: white;
  margin: 2rem auto;
  height: 3rem;
  box-shadow: 0 0 35px white;
  background: black;
  color: white;
  justify-content: center;
  width: 150px;
  cursor: pointer;
  outline: none;
  padding: 15px;
`;