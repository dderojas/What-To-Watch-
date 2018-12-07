import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input:""
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
    axios.get('/test'+ this.state.input)
    .then((res) => {
      console.log('went to server');
    })
    .catch((err) => {
      console.log('failed',err);
    });

    this.setState({
      input:''
    });
  }

  render() {
    return(
      <div>
        <h1>IMDB</h1>
        <input name="input" type="text" value={this.state.input} onChange={this.handleChange}></input>
        <button onClick={this.handleClick}>Get Title</button>
      </div>
    )
  }
}