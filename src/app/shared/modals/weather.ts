

    export interface Main {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    }

    export interface Weather {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

    export interface Clouds {
        all: number;
    }

    export interface Wind {
        speed: number;
        deg: number;
    }

    export interface Rain {
        pod: number;
    }

    export interface Sys {
        pod: string;
    }

    export interface List {
        dt: number;
        main: Main;
        weather: Weather[];
        clouds: Clouds;
        wind: Wind;
        rain: Rain;
        sys: Sys;
        dt_txt: string;
    }

    export interface Coord {
        lat: number;
        lon: number;
    }

    export interface City {
        name: string;
        coord: Coord;
        country: string;
    }

    export interface WeatherWrapper {
        cod: string;
        message: number;
        cnt: number;
        list: List[];
        city: City;
    }

    export interface CurrentWeather {
        coord: Coord;
        weather: Weather[];
        base: string;
        main: Main;
        visibility: number;
        wind: Wind;
        clouds: Clouds;
        dt: number;
        sys: Sys;
        id: number;
        name: string;
        cod: number;
    }

    export interface WeatherCoordinate {
        coord: Coord;
        sys: Sys;
        weather: Weather[];
        main: Main;
        wind: Wind;
        rain: Rain;
        clouds: Clouds;
        dt: number;
        id: number;
        name: string;
        cod: number;
    }
