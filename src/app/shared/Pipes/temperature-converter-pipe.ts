import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'tempConverter', pure: false})
 export class TemperatureConverterPipe implements PipeTransform {

      // Selected temperature unit
      // private unit: string;

      constructor() {

      }

      // Return temperature
      transform(value: number, unit: string): number {
        switch (unit) {
          case 'c':
            return this.kelvinToCelcius(value);
          case 'f':
            return this.kelvinToFahrenheit(value);
          default:
           return value;
        }
      }

      // Convert kelvin temp to fahrenheit
      kelvinToFahrenheit(value: number) {
         return 9 / 5 * (value - 273) + 32;
      }
      // Convert celsius temp to fahrenheit
      kelvinToCelcius(value: number) {
         return value - 273.15;
      }

    }
