import { Observable } from "rxjs";
import { Pet } from "./pet";
import { User } from "./user";

export class Hosting {
  owner: number;
  pet: number;
  start_date: Date;
  end_date: Date;
  cost: number;
  observation: string;
  approved: boolean;
}

export class GetHosting {
  id: string;
  pet: string;
  start_date: string;
  end_date: string;
  cost: number;
  observation: string;
  approved: boolean;
  owner: string;
}