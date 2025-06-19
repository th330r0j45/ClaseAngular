import { Component, inject, signal } from '@angular/core';
import { Dog, DogService } from '../../services/dog.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { formErrors, getErrorMsg } from '../../services/errorMsgs';

@Component({
  selector: 'app-dog-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dog-form.component.html',
  styleUrl: './dog-form.component.css'
})
export class DogFormComponent {
  private service: DogService = inject(DogService);
  private build = inject(FormBuilder);
  private router = inject(Router);
  form = this.build.group({
    breed: ['', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern(/^[a-z,A-Z,\s]/)
    ]],
    description: ['', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^[a-z,A-Z,\s]/)
    ]],
    urlImage: [
      // '', 
      'http://www.test.com/image.jpg',
      [
        Validators.pattern(/^https?:\/\/[^\s]+?\.(png|jpg|jpeg)$/),
        Validators.required,
        Validators.maxLength(100)
      ]]
  });
  dogs = signal<Dog[]>([]);

  ngOnInit(): void {
    const id = this.router.routerState.snapshot.root.firstChild?.params['id'];
    if (id) {
      console.log('ID encontrado en la URL:', id);
      this.service.getDogs().pipe(take(1)).subscribe({
        next: dogs => {
          const dog = dogs.find(d => d.id === +id);
          if (dog) {
            this.form.patchValue({
              breed: dog.breed,
              description: dog.description,
              urlImage: dog.urlImage
            });
          }
        },
        error: err => console.error(err)
      });
    }
  }
  private loadDogs() {
    this.service.getDogs().subscribe({
      next: dogs => this.dogs.set(dogs),
      error: err => console.error(err)
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      let dog: Dog = {
        id: 0,
        breed: formValue.breed ?? '',
        description: formValue.description ?? '',
        urlImage: formValue.urlImage ?? ''
      };
      console.log(formValue);
      this.service.insertDog(dog).pipe(take(1)).subscribe({
        next: (data) => {
          console.log('Dog added successfully', data);
          this.router.navigate(['/dogs']);
        },
        error: (error) => {
          console.error('Error adding dog', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  errors(form: FormGroup, control: string) {
    return formErrors(form, control);
  }

  errorMsg(form: FormGroup, control: string) {
    return getErrorMsg(form, control);
  }

}


