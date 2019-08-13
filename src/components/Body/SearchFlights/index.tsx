import React, {PureComponent} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './searchFlights.css';
import { selectFlightService } from '../../../services/selectFlightService';
import { IAirports } from '../../../interfaces/IAirports';
import Button from '@material-ui/core/Button';

interface IState{
    listAirports: IAirports[];
    from?: string;
    to?: string;
    date?: string;
}

interface IProps{
    listFlights: any;
}

export default class SearchFlights extends PureComponent<IProps, IState>{

    constructor(props: any){
        super(props);

        this.state = {listAirports: [], date: '2019-02-16', from: 'BSB', to: 'PLU'};

    }

    selectFromAirports = (event: any) => {
        this.setState({from: event.target.value});
    }

    selectToAirports = (event: any) => {
        this.setState({to: event.target.value});
    }

    loadAirportList = async () => {
        const response: IAirports[] = await selectFlightService.getAirports();

        this.setState({listAirports: response});
    
    }

    componentDidMount(){
        this.loadAirportList();
    }
    
    selectDate = (event: any) => {
        this.setState({date: event.target.value});
        console.log(event.target.value);
    }

    searchFlight = async () => {
        const {from, to, date} = this.state;
        
        const data = {from, to, date};

        const flights = await selectFlightService.loadFlight(data);

        this.props.listFlights({flights});
    }

    render(){
        const {listAirports, from, to} = this.state;
    

        return(
            <div className={'container'}>
                                        
                <div className={'title'}>
                    Compre sua passagem por um preço melhor
                </div>
                <div className={'box-inputs'}>

                    <FormControl required className={'input'}>
                        <InputLabel htmlFor="age-required">De</InputLabel>
                        <Select
                        value={from || ''}
                        onChange={this.selectFromAirports}
                        name="age"
                        inputProps={{
                            id: 'age-required',
                        }}
                        className={''}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {listAirports.map((airport, index) => {
                            return(
                                <MenuItem key={index} value={airport.aeroporto}>{airport.nome}</MenuItem>
                            )
                        })}
                        </Select>
                    </FormControl>
                        
                    <FormControl required className={'input'}>
                        <InputLabel htmlFor="age-required">Para</InputLabel>
                        <Select
                        value={to || ''}
                        onChange={this.selectToAirports}
                        name="age"
                        inputProps={{
                            id: 'age-required',
                        }}
                        className={''}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {listAirports.map((airport, index) => {
                            return(
                                <MenuItem key={index} value={airport.aeroporto}>{airport.nome}</MenuItem>
                            )
                        })}
                        </Select>
                    </FormControl>

                    <input className={'date'}
                        type="date"
                        defaultValue= '2019-02-16'
                        min={'2019-02-10'}
                        max={'2019-02-18'}
                        onChange={this.selectDate}
                    />
                    <Button onClick={this.searchFlight}>Pesquisar </Button>
                </div>
            </div>
        
        )
    }
}