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
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e)  {
    e.preventDefault();
    var {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleClick(e) {
    e.preventDefault();
    var year = this.state.year;
    var genre = this.state.genre;
    axios.get(`/movies?year=${year}&genre=${genre}`)
    .then((res) => {
      console.log('request success',res);
      this.setState({
        results: res.data.rows[0]
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
        <button onClick={this.handleClick}>Get Those Movies!</button>
        <div>{this.state.results.map((movies) => {
          return <MovieList movie={movies}/>
        })}</div>
      </div>
    )
  }
}