export type TMonths =
| "January"
| "February"
| "March"
| "April"
| "May"
| "June"
| "July"
| "August"
| "September"
| "October"
| "November"
| "December";

export type TSemesterName = 'Spring' | 'Summer' | 'Fall';
export type TSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
    semesterName: TSemesterName;
    semesterCode: TSemesterCode;
    year: string;
    startMonth: TMonths;
    endMonth: TMonths;
};

export type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
}