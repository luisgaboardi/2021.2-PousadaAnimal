import { RegisterHosting } from "./register-hosting";

export class Pet {
    id: string;
    name: string;
    host: string | RegisterHosting | number;
    gender: string;
    breed: string;
    colour: string;
    age: number;
    weight: number;
    medical_conditions: string;
    temperament: string;
    is_hosted: boolean;
    owner: string;
}