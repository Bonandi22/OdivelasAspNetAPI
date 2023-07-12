import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.css']
})
export class CategoryComponent implements OnInit {

  categories!: Category[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.dataService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error) => {
        console.error('Erro ao obter categorias:', error);
      }
    );
  }
}
