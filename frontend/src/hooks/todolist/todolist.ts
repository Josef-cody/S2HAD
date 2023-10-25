import { useQueryClient, useMutation } from 'react-query'
import axiosClient from '../axiosInstance'
import { toast } from "react-toastify";

//Create a task
const createNewTask = async (data:{} | undefined | any) => {
    return await axiosClient.post('todolist',data).then((res) => {
        toast(res.data.msg);
    }).catch((e) => console.log(e))
}
export const CreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation(createNewTask, {
        onSuccess: (data:any) => {
          queryClient.invalidateQueries("getTasks");
          queryClient.setQueriesData("getTasks", (oldQueryData:{} | undefined | any) => {
            return {
              ...oldQueryData,
              data: [...oldQueryData.data, data?.data],
            };
          });
        },
      });
};
//get tasks
export const getTasks = async () => {
    return await axiosClient.get('/todolist').catch((e) => console.log(e))
}
//get specific task
export const getTask = async (id:string) => {
    return await axiosClient.get(`/todolist/${id}`).catch((e) => console.log(e))
}

//update one task
const UpdateOneTask = async (status:any) => {
    return await axiosClient.patch(`todolist/update/${status[0]._id}`,status[0]).then((res) => {
        toast(res.data.msg);
    }).catch((e) => console.log(e))
}
export const UpdateUserTaskList = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateOneTask,{
        onSuccess: (data:any) => {
            queryClient.invalidateQueries("getTasks");
            queryClient.setQueriesData<string | void | any>("getTasks", (oldQueryData:any) => {
              return {
                ...oldQueryData,
                data: [...oldQueryData.data, data?.data],
              };
            });
          },
    });
}

//Delete one task from list
const DeleteOne = async (id:string) => {
    return await axiosClient
        .delete(`todolist/delete/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOneTask = () => {
    return useMutation(DeleteOne, {
        onSuccess: () => {
            toast('Task deleted');
        }
    })
}
//Delete all tasks
const DeleteList = async () => {
    return await axiosClient
        .delete(`todolist/delete`)
        .then(res=>toast(res.data.msg))
        .catch((err) => console.log(err));
};
export const DeleteTaskList = () => {
    return useMutation(DeleteList)
}



