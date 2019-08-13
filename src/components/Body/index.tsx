import React, {PureComponent} from 'react';
import './body.css';
import SearchFlights from './SearchFlights';
import SelectFlights from './SelectFlights';

interface IState{
    flights: any;
}

export default class Body extends PureComponent<any, IState>{

    constructor(props: any){
        super(props);

        this.state = {flights: undefined};
    }

    listFlights= (response: any) =>{
        console.log(response);
        this.setState({flights: response.flights})
    }

    render(){
        return(
            <div className={'body'}>
                
                <SearchFlights listFlights={this.listFlights} />
                <SelectFlights flights={this.state.flights} />

            </div>
        );
    }
}