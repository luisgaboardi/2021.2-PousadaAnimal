import { RegisterHosting } from "./register-hosting"

export class RegisterPet{
  name: string;
  host: string | RegisterHosting;
  breed: string;
  gender: string;
  colour: string;
  age: number;
  weight: number
  medicalConditions: string;
  temperament: string
}
