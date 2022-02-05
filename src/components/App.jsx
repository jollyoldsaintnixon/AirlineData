import '../styles/App.scss';
import Table from './Table'
import React from 'react';
import { ON_TIME, CANCELED, DIVERTED, DELAYED, AIRCRAFT_DELAY, 
  CARRIER, WEATHER, SECURITY, AIR_TRAFFIC_CONTROL } from "../helper";


class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      airlineData: null
    }
  }

  componentDidMount() {
    fetch("https://flare-code-exercise-data.s3.amazonaws.com/airlines.json")
    .then(response => response.json())
    .then(airlineData => this.setState({airlineData: airlineData}))
  }

  render() {
    return (
      <div className="App">
            <Table airlineData={this.state.airlineData} queryYear={2004} delayQuery={WEATHER} airports={["MDW", "ATL"]}/>
      </div>
    );
  }
}

export default App;
