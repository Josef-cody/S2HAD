import { useQueryClient, useMutation } from 'react-query'
import axiosClient from '../axiosInstance'
import type { Value } from "react-multi-date-picker";


type paramsType = {
    typeOfRecord:string | undefined;
    genre?:string | undefined;
    dateStart?:Value | null | void;
    dateEnd?:Value | null | void;
}
//get All record after type
export const getAllRecordByType = async (typeOfRecord:string | undefined) => {
    return await axiosClient
    .get(`/daily-record-report/${typeOfRecord}`)
    .catch((e) => console.log(e))
}
//get Records ResultByTypeAndHour
export const getRecordsResultByTypeAndHour = async ({typeOfRecord,dateStart,dateEnd}:paramsType) => {
    return await axiosClient
    .get(`/daily-record-report-by-minute/${typeOfRecord}&${dateStart}&${dateEnd}`)
    .catch((e) => console.log(e))
}
//get Records ResultByTypeAndMinute
export const getRecordsResultByTypeAndMinute = async ({typeOfRecord,dateStart,dateEnd}:paramsType) => {
    return await axiosClient
    .get(`/daily-record-report-by-minute/${typeOfRecord}&${dateStart}&${dateEnd}`)
    .catch((e) => console.log(e))
}
//get Records ResultByTypeAndHour
export const getRecordsResultByGenreAndHour = async ({typeOfRecord,genre,dateStart,dateEnd}:paramsType) => {
    console.log(genre)
    return await axiosClient
    .get(`/daily-record-report-by-genre-hour/${typeOfRecord}&${genre}&${dateStart}&${dateEnd}`)
    .catch((e) => console.log(e))
}
//get Records ResultByTypeAndMinute
export const getRecordsResultByGenreAndMinute = async ({typeOfRecord,genre,dateStart,dateEnd}:paramsType) => {
    return await axiosClient
    .get(`/daily-record-report-by-genre-minute/${typeOfRecord}&${genre}&${dateStart}&${dateEnd}`)
    .catch((e) => console.log(e))
}

//Delete one movie from list
const DeleteOne = async (id:string | undefined) => {
    return await axiosClient
        .delete(`/daily-record/delete/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOneRecord = () => {
    return useMutation(DeleteOne)
}




