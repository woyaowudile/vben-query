// import { defHttp } from '/@/utils/http/axios';
import { delCof, addCof } from './interface';
import axios from 'axios';
import { isProdMode } from '/@/utils/env';

const apiUrl = isProdMode() ? 'http://2211-112-111-24-66.ngrok.io' : 'http://localhost:3334';
enum Api {
  query = '/api/query',
  queryBefore = '/api/querybefore',
  queryTable = '/api/query/table',
  queryChart = '/api/query/chart',
  add = '/api/query/add',
  update = '/api/query/update',
  delete = '/api/query/delete',
  analysis = '/api/analysis',
}

export const getquery = async (data?: Recordable) => {
  const res: any = await axios.get<Recordable[]>(apiUrl + Api.query, { params: data });
  return res?.data?.result;
};
export const getanalysis = async (data?: Recordable) => {
  const res: any = await axios.get<Recordable[]>(apiUrl + Api.analysis, { params: data });
  return res?.data?.result;
};

export const getqueryBefore = async (data?: Recordable) => {
  const res: any = await axios.get<Recordable[]>(apiUrl + Api.queryBefore, { params: data });
  return res?.data?.result?.data;
};

export const getqueryTable = async (data?: Recordable) => {
  const res: any = await axios.get<Recordable[]>(apiUrl + Api.queryTable, { params: data });
  return res?.data?.result?.data;
};

export const getqueryChart = async (data?: Recordable) => {
  const res: any = await axios.post<Recordable[]>(apiUrl + Api.queryChart, data);
  return res?.data?.result;
};

export const getqueryInsert = async (data?: addCof[]) => {
  const res: any = await axios.post<Recordable[]>(apiUrl + Api.add, data);
  return res?.data?.result;
};

export const getqueryUpdate = async (data?: { level: string | number; id: number }) => {
  const res: any = await axios.put<Recordable[]>(apiUrl + Api.update, data);
  return res?.data?.result;
};

export const getqueryDelete = async (data?: delCof) => {
  const res: any = await axios.delete<Recordable[]>(apiUrl + Api.delete, { params: data });
  return res?.data?.result;
};
