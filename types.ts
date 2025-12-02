export interface DiscountData {
  code: string;
  percent: number;
}

export enum ProcessState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ContactInfo {
  address: string;
  phone1: string;
  phone2: string;
}