import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { UPLOAD } from "../../graphql/mutations/file";
import { STUDENT_GET_BY_ID } from "../../graphql/queries/profile";
import { getFullMediaPath } from "../../helper/mediaHepler";
import { ImageControl } from "../../lib/controls/ImageControl";
import { UploadedFile } from "../../models/fileUpload";
import {IStudent, IStudentEntity, Student} from "../../models/student";

export default function ProfileMahasiswa(){
    const {userAuth} = useContext(AppContext);
    const [uploadPhoto, {loading:uplLoading, data:uplData, error:uplError}] = useMutation(UPLOAD);
    const {data,loading,error} = useQuery(STUDENT_GET_BY_ID, {
        variables:{
            id: 1
        }
    });
    
    const formik = useFormik<IStudent>({
        initialValues:Student(),
        onSubmit: (_input) => {

        }
    });

    useEffect(()=>{
        const profile:IStudentEntity = data?.student?.data;
        if(profile){
            formik.setValues(profile.attributes);
        }
    },[data]);

    useEffect(()=>{
        if(uplData){
            const photo = UploadedFile();
            console.log(uplData);
        }
    },[uplData]);

    const {values}= formik;

    return(
        <div className="m-5">
            <div className="grid grid-cols-2 gap-5">
                <ImageControl image={getFullMediaPath(values.person?.data.attributes.photo?.data.attributes.url)} 
                    onUpload={(file:any)=>uploadPhoto({variables: {file}})}
                    loading={uplLoading}
                />
            </div>
        </div>
    )
}