import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DonorService, Donor } from '../../services/donor';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  searchForm: FormGroup;
  donors: Donor[] = [];
  isSearching = false;
  searchPerformed = false;

  constructor(
    private fb: FormBuilder,
    private donorService: DonorService
  ) {
    this.searchForm = this.fb.group({
      bloodGroup: [''],
      city: ['']
    });
  }

  ngOnInit() {
    this.loadAllDonors();
  }

  loadAllDonors() {
    this.isSearching = true;
    this.donorService.getAllDonors().subscribe({
      next: (response) => {
        this.isSearching = false;
        if (response.data) {
          this.donors = response.data;
        }
      },
      error: (error) => {
        this.isSearching = false;
        console.error('Error loading donors:', error);
      }
    });
  }

  onSearch() {
    this.isSearching = true;
    this.searchPerformed = true;
    const bloodGroup = this.searchForm.value.bloodGroup;
    const city = this.searchForm.value.city;

    this.donorService.searchDonors(bloodGroup, city).subscribe({
      next: (response) => {
        this.isSearching = false;
        if (response.data) {
          this.donors = response.data;
        } else {
          this.donors = [];
        }
      },
      error: (error) => {
        this.isSearching = false;
        console.error('Search error:', error);
        this.donors = [];
      }
    });
  }
}
