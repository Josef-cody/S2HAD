import express from 'express';
import { 
    getAllRecords,
    getAllRecordByType,
    createRecord,
    getRecordById,
    deleteRecordById,
    updateRecordById,
    revalueField
} from '../controllers/protoModel_controller';
import { 
    getRecordsResultByTypeAndHour,
    getRecordsResultByTypeAndMinute,
    getRecordsResultByGenreAndMinute,
    getRecordsResultByGenreAndHour
} from '../controllers/report_controller';
import { verify,} from '../middlewares/auth';

export default (router: express.Router) => {
    router.get('/daily-record', verify, getAllRecords);
    router.get('/daily-record/:id', verify, getRecordById);
    router.get('/daily-record-report/:typeOfRecord', verify, getAllRecordByType);
    router.get('/daily-record-report-by-minute/:typeOfRecord&:dateStart&:dateEnd', verify, getRecordsResultByTypeAndMinute);
    router.get('/daily-record-report-by-hour/:typeOfRecord&:dateStart&:dateEnd', verify, getRecordsResultByTypeAndHour);
    router.get('/daily-record-report-by-genre-minute/:typeOfRecord&:genre&:dateStart&:dateEnd', verify, getRecordsResultByGenreAndMinute);
    router.get('/daily-record-report-by-genre-hour/:typeOfRecord&:genre&:dateStart&:dateEnd', verify, getRecordsResultByGenreAndHour);
    router.post('/daily-record', verify, createRecord);
    router.delete('/daily-record/delete/:id', verify, deleteRecordById);
    router.patch('/daily-record/update/:id', verify, updateRecordById);
    router.patch('/daily-record-revalue', verify, revalueField);
};