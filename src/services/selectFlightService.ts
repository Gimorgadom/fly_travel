import axios from 'axios';
import { IAirports } from '../interfaces/IAirports';

class SelectFlightService {

    getAirports = async () =>{
        const response = await axios.get('https://api-voadora.dev.tegra.com.br/flight/companies');
        const data: IAirports[] = response.data;
        return data;
    }

    loadFlight = async (data: any) => {
        
        const response = await axios.post('https://api-voadora.dev.tegra.com.br/flight', {
          from: data.from,
          to: data.to,
          date: data.date
        });

         return response.data;
    }

}

export const selectFlightService = new SelectFlightService();
