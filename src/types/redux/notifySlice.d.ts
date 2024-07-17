export type typeMsg = success | error;

export interface IErrorData {
  errorDetail: unknown;
  message: string;
  status: string;
}

export interface IError {
  data: IErrorData;
  status: number;
}

export interface IData {
  data: unknown;
  message: string;
  status: string;
}

export interface IRequest {
  endpointName: string;
  error: IError;
  data: IData;
  requestId: string;
  nameApi: string;
  status: string;
}

export interface IMutationExecuted extends IRequest {}

export interface IQueryRejected extends IRequest {}

export interface ICombineRequests {
  executedMutation: IMutationExecuted | null;
  rejectedQuery: IQueryRejected | null;
}

export interface ISliceNotify {
  mutationsExecuted: IMutationExecuted[] | [];
  queriesRejected: IQueryRejected[] | [];
  message: string | null;
  type: typeMsg | null;
}
