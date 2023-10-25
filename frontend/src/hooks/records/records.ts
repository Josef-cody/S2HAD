import { useQueryClient, useMutation } from 'react-query'
import axiosClient from '../axiosInstance'
import { toast } from "react-toastify";

//Create a record
const createNewRecord = async ( newdata:any ) => {
    return await axiosClient.post('daily-record',newdata).then((res) => {
        toast(res.data.msg);
    }).catch((e) => console.log(e))
}
export const CreateRecord = () => {
    const queryClient = useQueryClient();
    return useMutation(createNewRecord, {
        onSuccess: (data:any) => {
          queryClient.invalidateQueries("getMovieList");
          queryClient.setQueriesData< string | void | any>("getMovieList", (oldQueryData:any) => {
            return {
              ...oldQueryData,
              data: [...oldQueryData.data, data.data],
            };
          });
        },
      });
};
//get all records
export const getAllRecords = async () => {
    return await axiosClient.get('daily-record').catch((e) => console.log(e))
}

//update one record
const UpdateOneRecord = async (id:string) => {
    return await axiosClient.patch(`daily-record/${id}`).then((res) => {
        toast(res.data.msg);
    }).catch((e) => console.log(e))
}
export const UpdateRecord = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateOneRecord,{
        onSuccess: (data:any) => {
            queryClient.invalidateQueries("getAllRecords");
            queryClient.setQueriesData< string | void | any>("getAllRecords", (oldQueryData:any) => {
              return {
                ...oldQueryData,
                data: [...oldQueryData.data, data.data],
              };
            });
          },
    });
}

//Delete one record
const DeleteOne = async (id:string) => {
    return await axiosClient
        .delete(`daily-record/delete/${id}`)
        .catch((err) => console.log(err));
};
export const DeleteOneRecord = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries('getAllRecords')
        }
    })
}