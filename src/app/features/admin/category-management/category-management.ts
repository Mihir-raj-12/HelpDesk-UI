import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { Category } from '../../../core/services/category';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './category-management.html',
  styleUrl: './category-management.scss',
})
export class CategoryManagement implements OnInit {

private categoryService = inject(Category);

  categories: any[] = [];
  isLoading = false;

  newCategoryName = '';
  isCreating = false;

  editingCategoryId: number | null = null;
  editedCategoryName = '';


  ngOnInit(): void {
  this.loadCategories();
  
  }

  loadCategories() : void {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.categories = response.data || [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.isLoading = false;
      }
    });
  }


  createCategory() : void {
    if(!this.newCategoryName.trim()) return;

    this.isCreating = true;
    this.categoryService.createCategory({name : this.newCategoryName.trim()}).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.newCategoryName = '';
          this.loadCategories();
        }
        else{
          console.error('Error :' + response.message); ;
        }
        this.isCreating = false;
      },
      error: (err) => {
        
        this.isCreating = false;
      }
    });
  }

  startEditing(category : any ) : void {
    this.editingCategoryId = category.id;
    this.editedCategoryName = category.name;
  }

  cancelEditing() : void {
    this.editingCategoryId = null;
    this.editedCategoryName = '';
  }

  saveEdit(): void {
    if(!this.editedCategoryName.trim() || !this.editingCategoryId) return;

    const payload = {
      id : this.editingCategoryId,
      name : this.editedCategoryName
    };

    this.categoryService.updateCategory(payload).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.editingCategoryId = null;
          this.loadCategories();
        }
        else{
          console.error('Error :' + response.message); ;
        }
      },
      error: (err) => {
        console.error('Error updating category:', err);
      }
    });
  } 
  
  deactivateCategory(id : number) : void {
    if(!confirm('Are you sure you want to deactivate this category?')) return;
    this.categoryService.deactivateCategory(id).subscribe({
      next: (response) => {
        if(response.isSuccess){ 
          this.loadCategories();
        }
        else{
          console.error('Error :' + response.message); ;
        }
      },
      error: (err) => {
        console.error('Error deactivating category:', err);
      }
    });
  }


}
