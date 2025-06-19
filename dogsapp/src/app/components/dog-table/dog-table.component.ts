import { Component, inject, signal } from '@angular/core';
import { Dog, DogService } from '../../services/dog.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dog-table',
  imports: [
    // MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './dog-table.component.html',
  styleUrl: './dog-table.component.css'
})
export class DogTableComponent {
  private service: DogService = inject(DogService);
  private router: Router = inject(Router);
  dogs = signal<Dog[]>([]);

  ngOnInit(): void {
    this.loadDogs();
  }
  private loadDogs() {
    this.service.getDogs().subscribe({
      next: dogs => this.dogs.set(dogs),
      error: err => console.error(err)
    });
  }
  deleteDog(id: number) {
    this.service.deleteDog(id).subscribe(
      {
        next: () => this.loadDogs(),
        error: err => console.error(err)
      });
  }
  editDog(dog: Dog) {
    console.log('Editing dog', dog);
    this.router.navigate(['/edit-dog', dog.id]);
  }
}
