import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'

const SIGNED_URL = 'https://api.meetup.com/ReactJS-Boston/events/238471436/rsvps?photo-host=public&sig_id=33956102&sig=87dd5c75fc1ca4b25a9bc1f781afe92c8e9408e8'

class App extends Component {
  state = {
    requesting: false,
    rsvps: null
  }

  handleGetRsvps = () => {
    this.setState({ requesting: true })
    $.ajax({
      dataType:'jsonp',
      method:'get',
      url: SIGNED_URL,
      success: (result) => {
        console.log('back with ' + result.data.length +' results');
        console.dir(result);
        this.setState({ requesting: false, rsvps: result })
      }
    });
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pluralsight ReactJS Meetup Raffle!!</h2>
        </div>
        <p className="App-intro">
          One lucky winner will get a year of Pluralsight for FREE!
        </p>
        <button onClick={this.handleGetRsvps}>Get RSVP list</button>
        <p>{this.state.requesting && 'Requesting rsvp list...'}</p>
        <p>{this.state.rsvps ? 'Got rsvps!' : 'No rsvps yet :('}</p>
      </div>
    );
  }
}

export default App;
