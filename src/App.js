import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MoviesList from "./MoviesList";
import MovieDetail from "./MovieDetail";

const URL ="https://api.themoviedb.org/3/discover/movie?api_key=72fb3457014533b9c7a1d7d1bb1a9e3f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=";
const Page = 1;

export default class App extends Component {
  state = {
    movies: [],
    pageNumber: Page,
    loading: true
  };

  componentDidMount() {
    const { pageNumber } = this.state;
    this.fetchMoreMovies(pageNumber);
  }

  fetchMoreMovies = async pg => {
    const { movies } = this.state;
    fetch(`${URL}${pg}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          movies: [...movies, ...res.results]
        });
      })
      .catch(error => this.setState({ loading: false }));
  };

  updatePageNumber = pageNumber => {
    this.setState({ pageNumber });
    this.fetchMoreMovies(pageNumber);
  };

  render() {
    return (
      <React.Fragment>
      <Router>
        <div className="App">
          <header className="App-header">
          <Link className='Link' to="/">
            {'EDSON\'S MOVIE DATABASE'}
          </Link>
          </header>
          <Switch>
            <Route exact path='/' render={props => (<MoviesList {...props} state={this.state} fetchMoreMovies={this.fetchMoreMovies} updatePageNumber={this.updatePageNumber} />)}/>
            <Route exact path='/:id' component={MovieDetail}/>
          </Switch>
        </div>
      </Router>
      </React.Fragment>

    );
  }
}
