import { Pet } from "./pet";
import { User } from "./user";

export class Hosting {
  id: string;
  owner: User | string;
  employee?: string | User;
  pet: string | Pet;
  start_date: string;
  end_date: string;
  cost: number;
  observations: string;
  approved: boolean;
}
