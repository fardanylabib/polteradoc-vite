import { useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { ROLE_MAHASISWA, ROLE_MANAGER } from "../../constants/common";
import { LECTURER_GET_BY_ID, STUDENT_GET_BY_ID } from "../../graphql/queries/profile";
import { ImageControl } from "../../lib/controls/ImageControl";
import { IUsersPermissionsLoginInput, UsersPermissionsLoginInput } from "../../models/user";
import {IStudentEntity, Student} from "../../models/student";

export default function ProfileManager(){
    const {userAuth} = useContext(AppContext);
    const {data,loading,error} = useQuery(STUDENT_GET_BY_ID, {
        variables:{
            id: 1
        }
    });
    
    // const formik = useFormik<IUsersPermissionsLoginInput>({
    //     initialValues:Student(),
    //     onSubmit: (_input) => {

    //     }
    // });

    return(
        <div>
            Dosen
        </div>
    )
}