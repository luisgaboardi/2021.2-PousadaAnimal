export class Hosting {
  owner: number;
  pet: number;
  start_date: Date;
  end_date: Date;
  cost: number;
  observations: string;
  approved: boolean;
}

export class GetHosting {
  id: string;
  pet: string;
  start_date: string;
  end_date: string;
  cost: number;
  observations: string;
  approved: boolean;
  owner: string;
}