import {
  TAcademicSemesterNameCodeMapper,
  TMonths,
  TSemesterCode,
  TSemesterName,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const SemesterName: TSemesterName[] = ['Spring', 'Summer', 'Fall'];
export const SemesterCode: TSemesterCode[] = ['01', '02', '03'];

export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Spring: '01',
  Summer: '02',
  Fall: '03',
};
