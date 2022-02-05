import React from "react";
import { ON_TIME, CANCELED, DIVERTED, DELAYED, AIRCRAFT_DELAY, CARRIER, WEATHER, SECURITY, AIR_TRAFFIC_CONTROL } from "../helper";

export default class Table extends React.Component {
    constructor(props) {
        super(props)
        
    }
    
    makeAirportList() {
        const { airports } = this.props
        const rows = []
        for (let i=0;i<airports.length;i++) {
            const airport = airports[i]
            const airportList = <div className="airport-list data-list" key={i}>
                <div className="data-box airport-box">{airport}</div>
                {this.makeYearList(airport)}
            </div>
            rows.push(airportList)
        }
        return rows
    }

    makeYearList(airport="ATL") {
        const {airlineData, queryYear, delayQuery} = this.props
        const dataList = Array.apply(null, Array(12)).map(function () {}) // empty array, one for each month
        let sum = 0.0 // for computing avg
        let i=0 // for breaking out once the array is full and keys
        for (const id in airlineData) {
            if (i===12) break
            const datum = airlineData[id]
            const datumYear = datum["Time"]["Year"]
            if (datumYear < queryYear) continue // year first, because it is in order. could even get slick with binary search if necessary
            else if (datumYear > queryYear) break
            
            const datumAirport = datum["Airport"]["Code"]

            if (datumAirport === airport) {
                const totalFlights = datum["Statistics"]["Flights"]["Total"]
                const month = datum["Time"]["Month"] // int, not string
                let percent = 0
                switch (delayQuery) {
                    case CARRIER:
                        break
                    case AIRCRAFT_DELAY:
                        break
                    case WEATHER:
                        const weatherDelays = datum["Statistics"]["# of Delays"]["Weather"]
                        percent = (weatherDelays/totalFlights).toFixed(3)
                        dataList[month-1] = (<div className="month-box data-box" key={i}>
                        {percent}%</div>) // months start at 1
                        break
                    case SECURITY:
                        break
                    case AIR_TRAFFIC_CONTROL:
                        break
                    case DELAYED:
                        break
                    case DIVERTED:
                        break
                    case CANCELED:
                        break
                    case ON_TIME:
                        break
                }
                sum+=parseFloat(percent)
                i++
            } else continue // keep looking if not the right airline
        }

        dataList.push(<div className="month-box data-box" key={i}>{(sum/i).toFixed(3)}%</div>) // avg
        return dataList
    }

    render() {
        const airportList = this.makeAirportList()
        return (
            <div className="table">
                <div className="data-list header-list">
                    <div className="data-box header-box" id="blank-box"></div>
                    <div className="data-box header-box">Jan</div>
                    <div className="data-box header-box">Feb</div>
                    <div className="data-box header-box">Mar</div>
                    <div className="data-box header-box">Apr</div>
                    <div className="data-box header-box">May</div>
                    <div className="data-box header-box">Jun</div>
                    <div className="data-box header-box">Jul</div>
                    <div className="data-box header-box">Aug</div>
                    <div className="data-box header-box">Sep</div>
                    <div className="data-box header-box">Oct</div>
                    <div className="data-box header-box">Nov</div>
                    <div className="data-box header-box">Dec</div>
                    <div className="data-box header-box">Avg</div>
                </div>
                {airportList}
            </div>
        )
    }
}