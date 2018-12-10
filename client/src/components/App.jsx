import React from 'react';
import ReactDOM from 'react-dom';
import MovieList from './MovieList.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year:'',
      genre:'',
      results:[]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleGenreYearClick = this.handleGenreYearClick.bind(this);
    this.handleYearClick = this.handleYearClick.bind(this);
    this.handleGenreClick = this.handleGenreClick.bind(this);
    this.handleGenreYearSorted = this.handleGenreYearSorted.bind(this);
  }

  handleChange(e)  {
    e.preventDefault();
    var {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleGenreYearClick(e) {
    e.preventDefault();
    var year = this.state.year;
    var genre = this.state.genre;
    axios.get(`/movies?year=${year}&genre=${genre}`)
    .then((res) => {
      console.log('request success',res);
      this.setState({
        results: res.data.rows
      });
    })
    .catch((err) => {
      console.log('request failed',err);
    });

    this.setState({
      year:'',
      genre:''
    });
  }

  handleYearClick(e) {
    e.preventDefault();
    var year = this.state.year;
    axios.get(`/movies/year?year=${year}`)
    .then((res) => {
      console.log('request success',res);
      this.setState({
        results: res.data.rows
      });
    })
    .catch((err) => {
      console.log('request failed',err);
    });

    this.setState({
      year:'',
      genre:''
    });
  }

  handleGenreClick(e) {
    e.preventDefault();
    var genre = this.state.genre;
    axios.get(`/movies/genre?genre=${genre}`)
    .then((res) => {
      console.log('request success',res);
      this.setState({
        results: res.data.rows
      });
    })
    .catch((err) => {
      console.log('request failed',err);
    });

    this.setState({
      year:'',
      genre:''
    });
  }

  handleGenreYearSorted(e) {
    e.preventDefault();
    var year = this.state.year;
    var genre = this.state.genre;
    axios.get(`/movies/sorted?year=${year}&genre=${genre}`)
    .then((res) => {
      console.log('request success',res);
      this.setState({
        results: this.state.results.concat(res.data.rows)
      });
    })
    .catch((err) => {
      console.log('request failed',err);
    });

    this.setState({
      year:'',
      genre:''
    });
  }

  render() {
    return(
      <div>
        <h1>IMDB</h1>
        <input name="year" type="number" placeholder="Year" value={this.state.year} onChange={this.handleChange}></input>
        <input name="genre" type="text" placeholder="Genre" value={this.state.genre} onChange={this.handleChange}></input>
        <button onClick={this.handleGenreYearClick}>Get Those Movies!</button>
        <button onClick={this.handleGenreClick}>Get Those Movie by Genre!</button>
        <button onClick={this.handleYearClick}>Get Those Movies by Year!</button>
        <button onClick={this.handleGenreYearSorted}>Best to Worst Movies!</button>
        <div>{this.state.results.map((movies) => {
          return <MovieList movie={movies.primarytitle}/>
        })}</div>
      </div>
    )
  }
}