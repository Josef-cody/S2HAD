import { useState } from "react";
import { useQuery } from "react-query";
import {
  getTasks,
  UpdateUserTaskList,
  DeleteOneTask,
} from "../../hooks/todolist/todolist";
// import Spinner from '../../../components/Spinner'
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function ToDoListRecord() {
  const [status, setStatus] = useState('64cf68429ec5af006ac9945b');

  // Using the fetching hook
  const { data, error, isLoading } = useQuery("getTasks", () => getTasks(), {
    refetchInterval: 1000,
  });
  //update one
  const { mutate: UpdateOne } = UpdateUserTaskList();
  const handelUpdateOne = () => {
     UpdateOne(status);}
  const handleToggle = async (id:any) => {
    const updatedSwitches = data?.data.map((task:any) =>
      task._id === id ? { ...task, status: !task.status } : task
    );
    setStatus(updatedSwitches);
    handelUpdateOne();
  };
  //delete one
  const { mutate: DeleteOne } = DeleteOneTask();
  const handelDeleteOne = (id:any) => {
    DeleteOne(id);
  };

  // Error and Loading states
  if (error) return <div>Something goes wrong</div>;
  if (isLoading) return <div>{/* <Spinner /> */}</div>;



  return (
    <>
      <Table striped bordered hover responsive variant='dark' className="mt-5 mb-5">
        <thead>
          <tr className="small">
            <th>Dead-line (mm-dd)</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        {data?.data?.map((task:any, index:number) => {
          return (
            <>
              <tbody key={index}>
                <tr>
                  <td>{task?.deadline.slice(5, 10)}</td>
                  <td>{task?.type}</td>
                  <td>{task?.genre}</td>
                  <td>{task?.title}</td>
                  <td>{task?.task}</td>
                  <td>{task?.priority}</td>
                  <td>
                    <Form>
                    <span className="me-2">{task?.status ? "Done" : "Later"}</span>
                      <Form.Switch // prettier-ignore
                        key={task?._id}
                        name={task?.title}
                        type="switch"
                        id={task?._id}
                        checked={task?.status}
                        onChange={()=>handleToggle(task?._id)}
                      />
                    </Form>
                  </td>
                  <td>
                    <span onClick={() => handelDeleteOne(task?._id)}>
                      <i className="fa-solid fa-trash-can cursor-pointer"></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </Table>
    </>
  );
}

export default ToDoListRecord;
