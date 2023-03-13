import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { cloneDeep } from "lodash";
import { useCallback, useContext, useEffect,useState } from "react";
import { AppContext } from "../../AppContext";
import { ID_TYPE_STUDENT_DEFAULT, semesterOptions } from "../../constants/common";
import { PERSON_CREATE, PERSON_UPDATE } from "../../graphql/mutations/person";
import { STUDENT_CREATE, STUDENT_UPDATE } from "../../graphql/mutations/student";
import { STUDENT_GET_BY_ID } from "../../graphql/queries/profile";
import { STUDY_PROGRAMS_GET } from "../../graphql/queries/studyProgram";
import { getFullMediaPath } from "../../helper/mediaHepler";
import { FieldLabel } from "../../lib/common/Labels";
import { Button } from "../../lib/controls/Button";
import { ImageControl } from "../../lib/controls/ImageControl";
import { SelectSimple } from "../../lib/controls/SelectSimple";
import { TextField } from "../../lib/controls/TextField";
import { ISelectOptions } from "../../models/common";
import { UploadFileEntityContainer } from "../../models/fileUpload";
import { IPersonEntity, Person } from "../../models/person";
import {IStudent, IStudentEntity, Student} from "../../models/student";
import { IStudyProgramEntity } from "../../models/studyProgram";

export default function ProfileMahasiswa(){
    const {userAuth, setUserWithExpiryDate} = useContext(AppContext);
    const [initialProfile,setInitialProfile] = useState<IStudentEntity>({
        id:0,
        attributes: Student()
    });
    
    const [getStudent, {data,loading,error}] = useLazyQuery(STUDENT_GET_BY_ID);
    const {data:prodiData,error:prodiError} = useQuery(STUDY_PROGRAMS_GET);
    const [createPerson, {loading:cpLoading, data:cpData}] = useMutation(PERSON_CREATE); 
    const [createStudent, {loading:csLoading, data:csData}] = useMutation(STUDENT_CREATE);
    const [updatePerson, {loading:upLoading, data:upData}] = useMutation(PERSON_UPDATE); 
    const [updateStudent, {loading:usLoading, data:usData}] = useMutation(STUDENT_UPDATE);
    
    const formik = useFormik<IStudent>({
        initialValues:Student(),
        onSubmit: (_input) => {
            if(_input.person.data.id){
                updatePerson({variables: {
                    id:_input.person.data.id,
                    ..._input.person.data.attributes
                }});
            }else{
                createPerson({variables: _input.person.data.attributes});
            }
        }
    });

    useEffect(()=>{
        if(userAuth.user?.student?.data){
            //mode edit
            getStudent({variables: {id:userAuth.user.student.data.id}});
        }
    },[])

    const updateStudentData = useCallback((studentData:any)=>{
        let profile:IStudentEntity = {id:0, attributes: Student()};
        if(studentData.student){
            profile = studentData.student.data
        }else if(studentData.createStudent){
            profile = studentData.createStudent.data
        }else if(studentData.updateStudent){
            profile = studentData.updateStudent.data
        }
        if(profile && profile.id){
            const studentData = cloneDeep(profile.attributes);
            if(studentData.studyProgram?.data){
                studentData.studyProgramID = studentData.studyProgram.data.id;
            }
            studentData.personID = studentData.person.data.id;
            studentData.userID = userAuth.user?.id;
            studentData.projectsID = studentData.projects?.data.map(p => p.id);
            formik.setValues(studentData);
            const newUserAuth:any = cloneDeep(userAuth);
            if(!(newUserAuth.user?.student?.data)){
                newUserAuth.user.student.data = {
                    attributes: studentData,
                    id: profile.id
                }
                setUserWithExpiryDate(newUserAuth);
            }
            setInitialProfile(profile);
        }
    },[userAuth]);

    useEffect(()=>{
        if(data){
            updateStudentData(data)
        }
    },[data]);

    useEffect(()=>{
        if(csData){
            updateStudentData(csData)
        }
    },[csData]);

    useEffect(()=>{
        if(usData){
            updateStudentData(usData)
        }
    },[usData]);

    useEffect(()=>{
        const updateStudentData = async () => {
            let personData:IPersonEntity = {id:0, attributes:Person()};
            if(cpData){
                personData = cpData.createPerson?.data;
            }else if(upData){
                personData = upData.updatePerson?.data;
            }
            if(personData.id){
                const fields = cloneDeep(formik.values);
                fields.personID = personData.id;
                fields.userID = userAuth.user?.id;
                if(!initialProfile.id){
                    createStudent({variables: fields});
                }else{
                    updateStudent({variables: {
                        id: initialProfile.id,
                        ...fields
                    }});
                }
                window.pushToast("Data mahasiswa berhasil diubah");
            }
        }
        updateStudentData();
    },[cpData, upData]);
    
    const onUploaded = useCallback(async ({url, id}:any) =>{
        const photo = UploadFileEntityContainer();
        photo.data.id = id;
        photo.data.attributes.url = url;
        //await formik.setFieldValue("person.data.attributes.photo", photo);
        const {values} = formik;
        if(!values.person.data.id){
            //create person with this photo
            const _person = Person();
            _person.photoID = id;
            _person.name = values.person.data.attributes.name;
            _person.idType = ID_TYPE_STUDENT_DEFAULT;
            _person.identity = values.person.data.attributes.identity;
            createPerson({variables:_person});
        }else{
            //update person with this photo
            const _person = cloneDeep(values.person.data.attributes);
            _person.photoID = id;
            updatePerson({variables:{id: values.person.data.id, ..._person}});
        }
    },[formik.values]);

    const {values}= formik;
    const prodiList:IStudyProgramEntity[] = (prodiData && prodiData.studyPrograms)? prodiData.studyPrograms.data : [];
    const prodiOptions: ISelectOptions[] = prodiList.map(p => ({label: `${p.attributes.name} - ${p.attributes.department?.data.attributes.name}`, value:p.id}));
    return(
        <form className="flex flex-col m-10" onSubmit={formik.handleSubmit}>
            <div className="flex flex-grow">
                <div className="flex w-full">
                    <div className="pr-5">
                        <ImageControl image={getFullMediaPath(values.person?.data.attributes.photo?.data.attributes.url)} 
                            onUploaded={onUploaded}
                            onError={(err:any)=>window.pushToast(err, "error")}
                            onRemove={()=>formik.setFieldValue("person.data.attributes.photo.data.attributes.url", "")}
                        />
                    </div>
                    <div className="flex-grow pl-5">
                        {/* Person Data */}
                        <div className="mb-5">
                            <FieldLabel label="Nama"/>
                            <TextField name="person.data.attributes.name" type="text" placeholder="Nama mahasiswa" onChange={formik.handleChange} value={values.person.data.attributes.name}/>
                        </div>
                        <div className="mb-5">
                            <FieldLabel label="NRP"/>
                            <TextField name="person.data.attributes.identity" type="text" placeholder="Nomor mahasiswa" onChange={formik.handleChange} value={values.person.data.attributes.identity}/>
                        </div>
                        <div className="mb-5">
                            <FieldLabel label="Program Studi"/>
                            <SelectSimple placeholder="Pilih program studi" onChange={(id:any)=>formik.setFieldValue("studyProgramID",id)} value={values.studyProgramID}
                                options={prodiOptions}
                            />
                        </div>
                        <div className="mb-5">
                            <FieldLabel label="Semester"/>
                            <SelectSimple placeholder="Semester berjalan" onChange={(val:any)=>formik.setFieldValue("year", val)} value={values.year}
                                options={semesterOptions}
                            />
                        </div>
                        <div className="mb-5">
                            <FieldLabel label="Kelas"/>
                            <SelectSimple placeholder="Kelas A/B" onChange={(val:any)=>formik.setFieldValue("class", val)} value={values.class}
                                options={[{label:"A", value:"A"},{label:"B", value:"B"},]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 ml-auto">
                <Button title="Simpan Data" type="submit" icon="CheckIcon"
                  loading={usLoading || upLoading || csLoading || cpLoading}
                />
            </div>
        </form>
    )
}