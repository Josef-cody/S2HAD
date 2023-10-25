import { useState } from "react";
import { CreateRecord } from "../../hooks/records/records";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";
import { Col, Row, Form, InputGroup } from "react-bootstrap";
import { type } from "../../components/options";
// import { BarChartsSvinn } from "../../../components/BarCharts";

function Record() {
  const [chosenValue, setChosenValue] = useState("");
  const chosenIndex = type.findIndex((x) => x.type === chosenValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { mutate } = CreateRecord();
  const onSubmit = (data: any) => {
    mutate(data);
    reset();
  };

  return (
    <>
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img src="./img/dailyRecord.png" />
        </div>
        <Row>
          <Col xs={12}>
            <Controller
              control={control}
              name="date"
              rules={{ required: true }} //optional
              render={({
                field: { onChange, value },
                formState: { errors },
              }) => (
                <>
                  {errors.date && (
                    //if you want to show an error message
                    <p className="error">Pick a date !</p>
                  )}
                  <div className="datePicker">
                    <DatePicker
                      // minDate={new Date()}
                      placeholder="Choose the date for event"
                      value={value || ""}
                      onChange={(date) => {
                          onChange(date? date : "");
                      }}
                    />
                  </div>
                </>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {errors.type && (
              <p className="ms-1 p-1 error small" role="alert">
                Choose a type
              </p>
            )}
            <div>
              <select
                {...register("type", {
                  required: true,
                  onChange(event) {
                    setChosenValue(event.target.value);
                  },
                })}
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
            {errors.genre && (
              <p className="mt-1 p-1 error small" role="alert">
                Choose genre
              </p>
            )}
            <div className="mb-3">
              <select
                {...register("genre", {
                  required: true,
                })}
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
          <Col xs={12}>
            <div>
              <input
                key={1}
                type="text"
                className="form-control mb-3"
                placeholder="Title of record"
                {...register("title", {
                  required: true,
                  maxLength: 50,
                })}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="input-group">
              <input
                type="string"
                placeholder="Location?"
                className="form-control mb-3"
                {...register("location", {
                  required: true,
                })}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="How long it takes?"
                className="form-control mb-3"
                {...register("duration", {
                  required: true,
                })}
                aria-label="Recipient's username with two button addons"
              />
              {errors.unit && (
                <p className="mt-1 p-1 error small" role="alert">
                  Choose unit
                </p>
              )}
              <Form.Check
                className="ms-3"
                inline
                label="Hour"
                type="radio"
                value="hour"
                {...register("unit", {
                  required: true,
                })}
              />
              <Form.Check
                inline
                label="Min"
                type="radio"
                value="minute"
                {...register("unit", {
                  required: true,
                })}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <div>
              <textarea
                rows={5}
                className="form-control"
                aria-label="With textarea"
                placeholder="Record description"
                maxLength={600}
                {...register("task", {})}
                aria-invalid={errors.task ? "true" : "false"}
              ></textarea>
            </div>
          </Col>
        </Row>
        <button type="submit" className="mainButton w-50 mt-4 p-1">
          <span>Submit</span>
        </button>
      </form>
    </>
  );
}

export default Record;
