export class Compte{
  codeCompte!:string;
  solde!:number;
  dateCreation!:Date;
  operations!:Operation[];
  client!:Client
}
export class Client{
  codeClient?: number;
  name!: string;
  email?: string
}

export class Operation{
  //numeroOperation?: number;
  typeOperation!:string;
  montant!:number;
  motif?:string;
  dateOperation?:Date;
  codeCompte!:string;
  codeCompte2?:string;
}

