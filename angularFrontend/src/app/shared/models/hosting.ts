import { Pet } from "./pet";
import { User } from "./user";

export class Hosting {
  owner: number;
  pet: number;
  start_date: string;
  end_date: string;
  cost: number;
  observations: string;
  approved: boolean;
}

export class GetHosting {
  id: string;
  pet: Pet;
  start_date: string;
  end_date: string;
  cost: number;
  observations: string;
  approved: boolean;
  owner: User;
}
