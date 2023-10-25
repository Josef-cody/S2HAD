import { useState } from "react";
import { CreateTask } from "../../hooks/todolist/todolist";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";
import { Col, Row, Modal } from "react-bootstrap";
import { type } from "../../components/options";
import ToDoListRecord from "../todolist/taskList";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// import { BarChartsSvinn } from "../../../components/BarCharts";

function Task() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [chosenValue, setChosenValue] = useState("Entertainment");
  const chosenIndex = type.findIndex((x) => x.type === chosenValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { mutate } = CreateTask();
  const onSubmit = (data: any) => {
    mutate(data);
    reset();
  };
  return (
    <>
      <div>
        <div className="appFrame">
          <button className="mainButton w-75 p-1" onClick={handleShow}>
            Create a new task
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>To do list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <img src="./img/Priority.png" />
            </div>
            <Controller
              control={control}
              name="deadline"
              rules={{ required: true }}
              render={({
                field: { onChange },
                formState: { errors },
              }) => (
                <>
                  {errors.date && (
                      <p className="error">Pick a date !</p>
                    )}
                  <div className="datePicker text-dark ms-5">
                    <DatePicker
                      minDate={new Date()}
                      placeholder="Choose dead line for task"
                      onChange={(date) => {
                        onChange(date);
                      }}
                    />
                  </div>
                </>
              )}
            />
            <Row>
              <Col xs={12}>
                {errors.kommun && (
                  <p className="ms-1 p-1 error fs-6" role="alert">
                    Choose a task type
                  </p>
                )}
                <div>
                  <label htmlFor="type"></label>
                  <select
                    {...register("type", {
                      required: true,
                      onChange(event) {
                        setChosenValue(event.target.value);
                      },
                    })}
                    className="form-select"
                  >
                    <option value={""} selected disabled>
                      Choose task type
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
                {errors.kommun && (
                  <p className="ms-1 p-1 error fs-6" role="alert">
                    Choose genre
                  </p>
                )}
                <div className="mb-3">
                  <label htmlFor="type"></label>
                  <select
                    {...register("genre", {
                      required: true,
                    })}
                    className="form-select"
                  >
                    <option value={""} selected disabled>
                      Choose task genre
                    </option>
                    {type[chosenIndex]?.genre?.map((genre) => {
                      return (
                        <>
                          <option>{genre.genre}</option>
                        </>
                      );
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
                    className="form-control mb-3 mt-2"
                    placeholder="Title of task"
                    {...register("title", {
                      required: true,
                      maxLength: 50,
                    })}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-3 mb-4">
              <Col xs={5}>
                <h6 className="ms-5 mt-1">Priority</h6>
              </Col>
              <Col xs={7}>
                <div className="star-rating ">
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field: { onChange, value } }) => (
                      <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                      >
                        <Rating onChange={onChange} selected={value} />
                      </Box>
                    )}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <div>
                  <textarea
                    rows={5}
                    className="form-control"
                    aria-label="With textarea"
                    placeholder="Task description"
                    {...register("task", {
                      maxLength: 300,
                    })}
                    aria-invalid={errors.task ? "true" : "false"}
                  ></textarea>
                </div>
              </Col>
            </Row>
            <button
              type="submit"
              className="mainButton w-100 mt-4 mb-3 p-1"
            >
              <span>Add to list</span>
            </button>
          </form>
          <ToDoListRecord />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Task;
