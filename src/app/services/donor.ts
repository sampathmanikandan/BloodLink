import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';

export interface Donor {
  id?: string;
  name: string;
  email: string;
  phone: string;
  blood_group: string;
  city: string;
  gender: string;
  available: boolean;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  registerDonor(donor: Donor): Observable<any> {
    return from(
      this.supabase
        .from('donors')
        .insert([donor])
        .select()
    );
  }

  searchDonors(bloodGroup?: string, city?: string): Observable<any> {
    let query = this.supabase
      .from('donors')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false });

    if (bloodGroup && bloodGroup !== '') {
      query = query.eq('blood_group', bloodGroup);
    }

    if (city && city !== '') {
      query = query.ilike('city', `%${city}%`);
    }

    return from(query);
  }

  getAllDonors(): Observable<any> {
    return from(
      this.supabase
        .from('donors')
        .select('*')
        .order('created_at', { ascending: false })
    );
  }
}
