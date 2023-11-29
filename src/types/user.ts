/* eslint-disable semi */
export default interface User {
  _id: string;
  name: string;
  age: number;
  email: string;
  address: string;
  phone: string;
}

export type Records = User[];
export type RecordMap = Map<number, Records>;
