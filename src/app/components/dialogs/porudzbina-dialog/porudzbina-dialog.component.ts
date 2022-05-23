import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from 'src/app/models/porudzbina';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { ProudzbinaService } from 'src/app/services/proudzbina.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {

  flag!:number;
  subscription!:Subscription;
  dobavljaci!: Dobavljac[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Porudzbina,
    public dobavljacService: DobavljacService,
    public porudzbinaService: ProudzbinaService) { }

  ngOnInit(): void {
    this.dobavljacService.getAllDobavljacs().subscribe(dobavljaciIzBaze =>
      {
        this.dobavljaci = dobavljaciIzBaze;
      });
  }
  
  compareTo(a:any, b:any) {
    return a.id == b.id;
  }

  public add(): void {
    this.subscription = this.porudzbinaService.addPorudzbina(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodata porudžbina: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja nove porudžbine!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public update(): void {
    this.subscription = this.porudzbinaService.updatePorudzbina(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjena porudzbina: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene postojeće porudžbine!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public delete(): void {
    this.subscription = this.porudzbinaService.deletePorudzbina(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana porudžbina: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom brisanja postojeće porudžbine!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene.', 'Zatvori', {duration: 1000});
  }
}
