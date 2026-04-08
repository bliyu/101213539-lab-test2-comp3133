import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Characterfilter } from '../characterfilter/characterfilter';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.model';
import { HouseColorPipe } from '../../pipes/house-color-pipe';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    Characterfilter,
    HouseColorPipe
  ],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css'
})
export class Characterlist implements OnInit {
  private hpService = inject(HarryPotterService);

  characters = signal<Character[]>([]);
  loading = signal(true);
  errorMessage = signal('');
  selectedHouse = signal('All');

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.hpService.getCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load characters.');
        this.loading.set(false);
      }
    });
  }

  onHouseChanged(house: string): void {
    this.selectedHouse.set(house);
    this.loading.set(true);
    this.errorMessage.set('');

    if (house === 'All') {
      this.loadCharacters();
      return;
    }

    if (house === 'No House') {
      this.hpService.getCharacters().subscribe({
        next: (data) => {
          this.characters.set(data.filter((c) => !c.house || c.house.trim() === ''));
          this.loading.set(false);
        },
        error: () => {
          this.errorMessage.set('Failed to filter characters.');
          this.loading.set(false);
        }
      });
      return;
    }

    this.hpService.getCharactersByHouse(house).subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to filter characters.');
        this.loading.set(false);
      }
    });
  }
}
