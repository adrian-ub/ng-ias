import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@components/button';
import { HlmIconComponent, provideIcons } from '@components/icon';
import { HlmInputDirective } from '@components/input';

import { HlmLabelDirective } from '@components/label';
import { HlmSelectImports } from '@components/select';
import { HlmToasterComponent } from '@components/sonner';
import { CategoryModel } from '@domain/models/category/category.model';
import { IngredientModel } from '@domain/models/ingredient/ingredient.model';
import { CategoryUsecase } from '@domain/usecase/category.usecase';
import { IngredientUsecase } from '@domain/usecase/ingredient.usecase';
import { RecipeUsecase } from '@domain/usecase/recipe.usecase';
import { NgxControlErrorDirective } from '@infraestructure/helpers/control-error.directive';
import { ValidateUrl } from '@infraestructure/helpers/url.validator';
import { lucideTrash } from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { toast } from 'ngx-sonner';

@Component({
  standalone: true,
  selector: 'app-recipe-form',
  templateUrl: 'recipe-form.component.html',
  host: {
    class:
      'container border-border overflow-hidden rounded-lg border block p-2 sm:p-4 pb-16 mt-6',
  },
  providers: [provideIcons({ lucideTrash })],
  imports: [
    ReactiveFormsModule,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    BrnSelectImports,
    HlmSelectImports,
    HlmIconComponent,
    NgxControlErrorDirective,
    HlmToasterComponent,
  ],
})
export class RecipeFormComponent implements OnInit {
  private readonly categoriesUseCase = inject(CategoryUsecase);
  private readonly ingredientsUseCase = inject(IngredientUsecase);
  private readonly recipeUseCase = inject(RecipeUsecase);
  private readonly router = inject(Router);
  protected categories = signal<CategoryModel[]>([]);
  protected ingredients = signal<IngredientModel[]>([]);
  protected form = new FormGroup({
    categoryId: new FormControl(
      { value: '', disabled: false },
      { validators: [Validators.required], nonNullable: true }
    ),
    title: new FormControl(
      { value: '', disabled: false },
      { validators: [Validators.required], nonNullable: true }
    ),
    photoUrl: new FormControl(
      { value: '', disabled: false },
      { validators: [Validators.required, ValidateUrl], nonNullable: true }
    ),
    time: new FormControl(
      { value: '', disabled: false },
      { validators: [Validators.required], nonNullable: true }
    ),
    ingredients: new FormArray(
      [
        new FormGroup({
          ingredientId: new FormControl(
            { value: '', disabled: false },
            { validators: [Validators.required], nonNullable: true }
          ),
          amount: new FormControl(
            { value: '', disabled: false },
            { validators: [Validators.required], nonNullable: true }
          ),
        }),
      ],
      {
        validators: [Validators.required, Validators.minLength(1)],
      }
    ),
    description: new FormControl(
      { value: '', disabled: false },
      { validators: [Validators.required], nonNullable: true }
    ),
  });

  ngOnInit() {
    this.categoriesUseCase.getCategories().then(this.categories.set);
    this.ingredientsUseCase.getIngredients().then(this.ingredients.set);
  }

  newIngredient() {
    this.form.controls.ingredients.push(
      new FormGroup({
        ingredientId: new FormControl(),
        amount: new FormControl(),
      })
    );
  }

  deleteIngredient(ingredientIndex: number) {
    this.form.controls.ingredients.removeAt(ingredientIndex);
  }

  async createRecipe(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      toast.error('Completa los campos requeridos');
      return;
    }

    const value = this.form.getRawValue();
    try {
      await this.recipeUseCase.addRecipe({
        ...value,
        isFavorite: false,
        time: Number(value.time),
      });

      toast.success('Receta creada con éxito');
      this.router.navigate(['/']);
    } catch (error) {
      toast.error('Error al crear la receta');
    }
  }
}
