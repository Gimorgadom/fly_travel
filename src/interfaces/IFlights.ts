export interface IFlights {
    date: string;
    destino: string;
    origem: string;
    voos: IFlightInformations[]
}

export interface IFlightInformations {
    chegada: string;
    data_saida: string;
    destino: string;
    origem: string;
    saida: string;
    valor: number;
    voo: string;
}