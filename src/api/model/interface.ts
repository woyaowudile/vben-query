export interface delCof {
  id?: string | string[];
  code?: string | string[];
  models?: string | string[];
}

export interface addCof {
  name: string;
  buy: object | string[] | null;
  code: string;
  type: string;
  dwm: string;
  remark?: string;
  level?: string;
}
