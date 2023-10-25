import { useQueryClient, useMutation } from 'react-query'
import axiosClient from '../axiosInstance'
import { toast } from "react-toastify";


//get user
export const getUser = async () => {
    return await axiosClient.get(`user`).catch((e) => console.log(e))
}

//update user
const UpdateOneUser = async (data:any) => {
    return await axiosClient.patch('users/update',data).then((res) => {
        toast(res.data.msg);
    }).catch((e) => console.log(e))
}
export const UpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateOneUser,{
        onSuccess: (data:any) => {
            queryClient.invalidateQueries("getUser");
            queryClient.setQueriesData("getUser", (oldQueryData:any) => {
              return {
                ...oldQueryData,
                data: [...oldQueryData.data, data.data],
              };
            });
          },
    });
}

//Delete user
const DeleteOne = async (id:string) => {
    return await axiosClient
        .delete(`users/delete/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteUser = () => {
    return useMutation(DeleteOne, {
        onSuccess: () => {
            toast('User deleted');
        }
    })
}




