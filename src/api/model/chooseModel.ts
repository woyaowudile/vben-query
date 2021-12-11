import { defHttp } from '/@/utils/http/axios';
import { delCof, addCof } from './interface';

enum Api {
  query = '/api/query',
  queryBefore = '/api/querybefore',
  queryTable = '/api/query/table',
  queryChart = '/api/query/chart',
  add = '/api/query/add',
  delete = '/api/query/delete',
}

export const getquery = (params?: Recordable) =>
  defHttp.get<Recordable[]>({ url: Api.query, params });

export const getqueryBefore = (params?: Recordable) =>
  defHttp.get<Recordable[]>({ url: Api.queryBefore, params });

export const getqueryTable = (params?: Recordable) =>
  defHttp.get<Recordable[]>({ url: Api.queryTable, params });

export const getqueryChart = (params?: Recordable) =>
  defHttp.post<Recordable[]>({ url: Api.queryChart, params });

export const getqueryInsert = (params?: addCof[]) =>
  defHttp.post<Recordable[]>({ url: Api.add, params });

export const getqueryDelete = (params?: delCof) =>
  defHttp.delete<Recordable[]>({ url: Api.delete, params });
