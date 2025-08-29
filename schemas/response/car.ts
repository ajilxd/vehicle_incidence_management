import { Meta } from "./incident";

export type Car = {
  id: number;
  make: string;
  model: string;
  licensePlate: string;
};

export type CarResponse = {
  meta: Meta;
  data: Car[];
};
