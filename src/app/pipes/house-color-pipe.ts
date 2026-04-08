import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'houseColor',
  standalone: true
})
export class HouseColorPipe implements PipeTransform {
  transform(house: string | null | undefined): string {
    switch ((house || '').toLowerCase()) {
      case 'gryffindor':
        return 'gryffindor';
      case 'slytherin':
        return 'slytherin';
      case 'ravenclaw':
        return 'ravenclaw';
      case 'hufflepuff':
        return 'hufflepuff';
      default:
        return 'no-house';
    }
  }
}
