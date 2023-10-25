import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateUser } from '../../hooks/user/user'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from 'react-query';

function UserUpdate() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const logout = () => {
      localStorage.clear();
      navigate("/");
      queryClient.clear();
    };
    const {  mutate, isSuccess, isError, isLoading } = UpdateUser();
    const {
        register,
        handleSubmit,
    } = useForm();
    const onSubmit = (data:any) => {
        mutate(data)
    };
    useEffect(() => {
        if (isSuccess) {
            logout();
        } else if (isError) {
            toast("Something went wrong!")
        } else return;
    }, [isSuccess, isError]);
    if (isLoading) {
        return <div>{<h5>Loading</h5>}</div>;
    }
    return <>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-container">
                <div className="form-floating mb-5 mt-5">
                    <input
                        className="form-control"
                        type="text"
                        {...register("username")}
                    />
                    <label htmlFor="floatingInput">Username</label>
                </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5 mb-5">
                <button className="mainButton w-100" type="submit">
                    <span>Update</span>
                </button>
            </div>
        </form>
    </>
}
export default UserUpdate