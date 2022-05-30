import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STAVKE_PORUDZBINE_URL, STAVKE_PORUDZBINE_ZAPORUDZBINU_URL } from '../app.constants';
import { StavkaPorudzbine } from '../models/stavkaPorudzbine';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaPorudzbinaID(idPorudzbine: number): Observable<any> {
    return this.httpClient.get(`${STAVKE_PORUDZBINE_ZAPORUDZBINU_URL}/${idPorudzbine}`);
  }

  public addStavkaPor(stavka : StavkaPorudzbine): Observable<any> {
    stavka.id = 150;
    return this.httpClient.post(`${STAVKE_PORUDZBINE_URL}`, stavka);
  }

  public updateStavkaPor(stavka : StavkaPorudzbine): Observable<any> {
    return this.httpClient.put(`${STAVKE_PORUDZBINE_URL}`, stavka);
  }

  public deleteStavkaPor(id : number): Observable<any> {
   return this.httpClient.delete(`${STAVKE_PORUDZBINE_URL}/${id}`);
  }
}
