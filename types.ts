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

export type ServiceType = 'DENTAL' | 'FILLER' | 'LIFT';

export interface ServiceConfig {
  id: ServiceType;
  title: string;
  icon: any; // React component
  description: string;
  instruction: string;
}

export interface ContactInfo {
  address: string;
  phone1: string;
  phone2: string;
}