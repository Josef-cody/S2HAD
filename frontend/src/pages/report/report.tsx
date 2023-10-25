import { useState } from "react";
import {
  getAllRecordByType,
  // getRecordsResultByTypeAndHour,
  // getRecordsResultByTypeAndMinute,
  getRecordsResultByGenreAndHour,
  getRecordsResultByGenreAndMinute,
} from "../../hooks/report/report";
import { useQuery } from "react-query";
import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import { Col, Row, Container, Table } from "react-bootstrap";
import OffcanvasNavbar from "../../components/nav/navbar";
import { type } from "../../components/options";

function RecordReport() {
  const [dateStarT, setDateStarT] = useState<Value>(new Date());
  const [dateEnD, setDateEnD] = useState<Value>(new Date());
  const [chosenValue, setChosenValue] = useState("");
  const [chosenGenre, setChosenGenre] = useState("");
  let typeOfRecord = chosenValue;
  let genre = chosenGenre;
  const DateStart = () => {
    if (dateStarT) {
      // @ts-ignore
      const dateStart = new DateObject(dateStarT);
      return dateStart.format("YYYY-MM-DD");
    }
  };
  const dateStart = DateStart();
  const DateEnd = () => {
    if (dateEnD) {
      // @ts-ignore
      const dateStart = new DateObject(dateEnD);
      return dateStart.format("YYYY-MM-DD");
    }
  };
  const dateEnd = DateEnd();
  const { data: allRecord } = useQuery(["getAllRecords", typeOfRecord], () =>
    getAllRecordByType(typeOfRecord)
  );
  // const { data: RecordConverToHours } = useQuery(
  //   ["getRecordsByMinutes", typeOfRecord],
  //   () => getRecordsResultByTypeAndMinute({ typeOfRecord, dateStart, dateEnd })
  // );
  // const { data: RecordByHours } = useQuery(
  //   ["getRecordsResultByTypeAndHour", typeOfRecord],
  //   () => getRecordsResultByTypeAndHour({ typeOfRecord, dateStart, dateEnd })
  // );
  const { data: RecordByGenreAndHours } = useQuery(
    ["getRecordsResultByGenreAndHour", { typeOfRecord, genre,dateStart, dateEnd }],
    () => getRecordsResultByGenreAndHour({ typeOfRecord, genre,dateStart, dateEnd })
  );
  const { data: RecordByGenreAndMinute } = useQuery(
    ["getRecordsResultByGenreAndMinute", { typeOfRecord, genre,dateStart, dateEnd }],
    () => getRecordsResultByGenreAndMinute({ typeOfRecord, genre,dateStart, dateEnd })
  );

  const totalTime1 = RecordByGenreAndHours?.data[0]?.totalTime;
  const totalTime2 = RecordByGenreAndMinute?.data[0]?.convertedToHour;
  const totalTime = () =>{
    if (totalTime1 && totalTime2) {
      const total = totalTime1+totalTime2;
      return total.toFixed(1)
      }
    if (totalTime1 && !totalTime2) { return totalTime1.toFixed(1)}
    if (!totalTime1 && totalTime2) { return totalTime2.toFixed(1)}
  }
  const time = totalTime()
  const chosenIndex = type.findIndex((x) => x.type === chosenValue);

  return (
    <>
      <OffcanvasNavbar />
      <Container className="w-50 mt-5 home-form text-center">
        <div>
          <img src="/img/dailyRecord.png" />
        </div>
        <Row>
          <Col xs={6}>
            <div className="datePicker">
              <DatePicker
                placeholder="Choose the start date for report"
                value={dateStarT}
                onChange={setDateStarT}
              />
            </div>
          </Col>
          <Col xs={6}>
            <div className="datePicker">
              <DatePicker
                // minDate={new Date()}
                placeholder="Choose the end date for report"
                format="YYYY-MM-DD"
                value={dateEnD}
                onChange={setDateEnD}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div>
              <select
                onChange={(event) => {
                  setChosenValue(event.target.value);
                }}
                className="form-select mb-3 mt-3"
              >
                <option selected disabled>
                  Choose record type
                </option>
                {type?.map((chosenType, index) => {
                  return (
                    <option key={index} value={chosenType.type}>
                      {chosenType.type}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="mb-3">
              <select
                onChange={(event) => {
                  setChosenGenre(event.target.value);
                }}
                className="form-select"
              >
                <option value={""} selected>
                  Choose record genre
                </option>
                {type[chosenIndex]?.genre?.map((genre) => {
                  return <option>{genre.genre}</option>;
                })}
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <span>Total spent time on subject: {time} hours</span>
        </Row>
        <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Title</th>
          <th>Location</th>
          <th>Task</th>
          <th>Duration</th>
        </tr>
      </thead>
      {allRecord?.data?.map((item :any,index:number)=>{
        const date = new Date(item.dailyRecord.date);
        return <tbody>
        <tr>
          <td>{index}</td>
          <td>{ date.toDateString() }</td>
          <td>{item.dailyRecord.title}</td>
          <td>{item.dailyRecord.location}</td>
          <td>{item.dailyRecord.task}</td>
          <td>{item.dailyRecord.duration} {item.dailyRecord.unit}</td>
        </tr>
      </tbody>
      })}
    </Table>
      </Container>
    </>
  );
}

export default RecordReport;
