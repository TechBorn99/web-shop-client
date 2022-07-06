import moment, { Moment } from 'moment';

export enum DateFormatEnum {
  ISO8601 = 'yyyy-MM-DD',
  ReadableDate = 'DD. MMMM yyyy.',
  APIReadableDate = 'yyyy-MM-DDTHH:mm',
}

export const currentDate = moment();

export const getISODate = (date: string | Date | Moment) =>
  moment(date).format(DateFormatEnum.ISO8601);

export const convertToAPIReadableDate = (date: string | Date | Moment) =>
  moment(date).format(DateFormatEnum.APIReadableDate);

export const convertToReadableDate = (date: string | Date | Moment) =>
  moment(date).format(DateFormatEnum.ReadableDate);
