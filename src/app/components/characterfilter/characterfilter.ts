import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css'
})
export class Characterfilter {
  @Output() houseChanged = new EventEmitter<string>();

  selectedHouse = signal('All');
  houses = ['All', 'Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw', 'No House'];

  onHouseSelect(value: string) {
    this.selectedHouse.set(value);
    this.houseChanged.emit(value);
  }
}
