export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  id: string;
  email: string;

  constructor(){
    this.image = "";
    this.name = "";
    this.provider = "";
    this.id = "";
    this.email = "";
  }
}