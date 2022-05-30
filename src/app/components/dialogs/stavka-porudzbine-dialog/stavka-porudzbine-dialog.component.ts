import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Artikl } from 'src/app/models/artikl';
import { StavkaPorudzbine } from 'src/app/models/stavkaPorudzbine';
import { ArtiklService } from 'src/app/services/artikl.service';
import { StavkaPorudzbineService } from 'src/app/services/stavka-porudzbine.service';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit, OnDestroy {

  flag!:number;
  artikli!: Artikl[];
  subscription!: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaPorudzbineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaPorudzbine,
    private stavkaPorudzbineService: StavkaPorudzbineService, 
    private artiklService: ArtiklService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.artiklService.getAllArtikls().subscribe(data =>{
        this.artikli = data;
    });
  }

  compareTo(a: any, b:any) {
    return a.id == b.id;
  }

  public add(): void {
    this.stavkaPorudzbineService.addStavkaPor(this.data).subscribe(() => {
      this.snackBar.open('Dodali ste novu stavku porudžbine!', 'OK', {duration: 2500});
    }, (error: Error) => {
      this.snackBar.open('Došlo je do greške', 'Zatvori', {duration:2500});
    }); 
  }

  public update(): void {
    this.stavkaPorudzbineService.updateStavkaPor(this.data).subscribe(() => {
      this.snackBar.open('Izmenili ste stavku porudžbine!', 'OK', {duration: 2500});
    }, (error: Error) => {
      this.snackBar.open('Došlo je do greške', 'Zatvori', {duration:2500});
    }); 

  }

  public delete(): void {
    this.stavkaPorudzbineService.deleteStavkaPor(this.data.id).subscribe(() => {
      this.snackBar.open('Obrisali ste stavku porudžbine!', 'OK', {duration: 2500});
    }, (error: Error) => {
      this.snackBar.open('Došlo je do greške', 'Zatvori', {duration:2500});
    }); 
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'OK', {duration:1000});
  }

}
