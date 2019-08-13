import React, {PureComponent} from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { IFlights, IFlightInformations } from '../../../interfaces/IFlights';
import './selectFlights.css';

interface IProps{
    flights: IFlights[];
}

interface IState {
    filter: string;
}

export default  class SelectFlight extends PureComponent<IProps, IState>{

    constructor(props: any){
        super(props);
        this.state = {filter: 'price'};
    }

    calculateFinalPrice(flights: IFlightInformations[]){
        const total = flights.reduce((final_value, voo) => {
            const t = final_value + voo.valor;
            return t;
        }, 0);

        return total.toFixed(2).replace('.', ',');
    }

    calculateFinalTime(flight: IFlights){

        const date_start: any = new Date(`${flight.voos[0].data_saida} ${flight.voos[0].saida}`);
        const date_arrive:any = new Date(`${flight.voos[flight.voos.length - 1].data_saida} ${flight.voos[flight.voos.length - 1].chegada}`);

        const dif_days = Math.abs(date_arrive.getDate() - date_start.getDate());
        const dif_hours = Math.abs(date_arrive.getHours() - date_start.getHours());
        const dif_minutes = Math.abs(date_arrive.getMinutes() - date_start.getMinutes());

        const final_value = (dif_days * 24 + dif_hours) + (dif_minutes/60);
        console.log(final_value);
        return final_value;

    }


    setFilter = (event: any) =>{
        const filter = event.target.value;

        this.setState({filter})
    }

    orderFlights = (a:IFlights, b:IFlights) => {
        const {filter} = this.state;
        if(filter === 'price'){
            if(this.calculateFinalPrice(a.voos) < this.calculateFinalPrice(b.voos)){
                return 1;
            }

            if(this.calculateFinalPrice(a.voos) > this.calculateFinalPrice(b.voos)){
                return -1;
            }
            return 0;
        }

        
        if(filter === 'time'){
            if(this.calculateFinalTime(a) < this.calculateFinalTime(b)){
                return -1;
            }
            
            if(this.calculateFinalTime(a) > this.calculateFinalTime(b)){
                return 1;
            }
            return 0;
        }
        return 0;
    }

    render(){
        const {filter} = this.state;

        if(!this.props.flights){
            return null;
        }

        if(this.props.flights.length === 0 ){
            return <div className='noFlights'>Sua pesquisa não retornou vôos disponíveis</div> 
        }

        return (
            <div className={'containerSelectFlights'}>
                <div className={'filter'}>
                    <FormControl className={'input'}>
                            <InputLabel>Filtrar</InputLabel>
                            <Select
                            value={filter}
                            onChange={this.setFilter}
                            className={''}
                            >
                            <MenuItem value='price'>
                                <div>Por Preço</div>
                            </MenuItem>
                            <MenuItem value='time'>
                                <div>Por Tempo</div>
                            </MenuItem>
                            </Select>
                        </FormControl>
                </div>
                {this.props.flights.sort(this.orderFlights).map((flight, index) => {
                    return(
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <div className={'flightSelect'}>
                                <div><b>De:</b> {flight.origem}</div>
                                <div><b>{flight.voos.length > 1 ? <div>Com Escala</div> : <div>Vôo Direto</div>}</b></div>
                                <div><b>Para:</b> {flight.destino}</div>
                                <div>R$ {this.calculateFinalPrice(flight.voos)}</div>
                            </div>
                            
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <div className={'flightsContent'}>
                               {flight.voos.map((f, index) => {
                                   return(
                                    <div className={'flightItem'} key={index}>
                                        <div className='flightInformation'>
                                            <div><b>Origem:</b> {f.origem}</div>
                                            <div><b>Saida:</b> {f.saida}</div>
                                        </div>
                                        <div className='flightInformation'>
                                            <div><b>Destino:</b> {f.destino}</div>
                                            <div><b>Chegada:</b> {f.chegada}</div>
                                        </div>
                                        <div className={'finalPrice'}><b>Valor:</b> R$ {f.valor.toFixed(2).replace('.', ',')}</div>
                                    </div>
                                   );
                               })}
                            </div>
                            </ExpansionPanelDetails>
                        
                        </ExpansionPanel>
                    );
                })}
            </div>
        );
    }
}