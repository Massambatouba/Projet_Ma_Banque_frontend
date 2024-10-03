import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Compte, Operation } from 'src/app/models/compte.model';
import { BanqueService } from 'src/app/services/banque.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  
  isFailed: Boolean = true;
  isSuccess: Boolean = false;
  compte!: Compte;
  operation: Operation = {
    codeCompte: '',
    typeOperation: '',
    montant: 0,
    codeCompte2: '',
    motif: ''
  };
  codeCompte: string = "";
  formGroup!: FormGroup;
  typeOperation!:FormControl;
  motif!: FormControl;
  montant!:FormControl;
  codeCompte2!:FormControl

  constructor(private sc: BanqueService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.codeCompte2 = fb.control("",Validators.required);
    this.typeOperation = fb.control("",Validators.required);
    this.motif = fb.control("",Validators.required);
    this.montant = fb.control(0, Validators.required)

    this.formGroup = fb.group({
      codeCompte2 : this.codeCompte2,
      typeOperation: this.typeOperation,
      motif: this.motif,
      montant: this.montant
    });

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.codeCompte = id;

    this.formGroup.get('typeOperation')?.valueChanges.subscribe(value => {
      if (value === 'virement') {
        this.formGroup.get('codeCompte2')?.setValidators([Validators.required]);
      } else {
        this.formGroup.get('codeCompte2')?.clearValidators();
      }
      this.formGroup.get('codeCompte2')?.updateValueAndValidity();
    });
    

  }

  getCompte(codeCompte: string): void {
    if (codeCompte) {
      this.sc.getCompteByCode(codeCompte).subscribe(
        (response) => {
          this.compte = response;
          console.log(response);
        },
        (error) => {
          console.log("Compte n'existe pas");
        }
      );
    }
  }
  onShowOperation(){

    if (this.formGroup.invalid) {
      console.error('Le formulaire n\'est pas valide');
      return;
    }
    const formValue: Operation = this.formGroup.value;
    this.operation.typeOperation= formValue["typeOperation"];
    //this.operation.numeroOperation = formValue["numeroOperation"];
    this.operation.montant = formValue["montant"];
    this.operation.codeCompte2 = formValue["codeCompte2"];
    this.operation.motif = formValue["motif"];
    this.operation.codeCompte = this.codeCompte;
    console.log("Données envoyées :", this.operation);

      this.sc.saveOperation(this.operation).subscribe({
        next: (response) => {
          this.isSuccess = true;
          console.log('Opération réussie', response);
        },  
        error: (error) => {
          console.log('Erreur lors de l\'enregistrement de l\'opération:', error);
          this.isFailed = true;
        }
    });
    
  }

  onSubmit(): void {
    this.getCompte(this.codeCompte);
  }
}
