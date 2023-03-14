import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { cloneDeep } from "lodash";
import { useCallback, useContext, useEffect,useState } from "react";
import { AppContext } from "../../AppContext";
import { idOptions, managerPositions } from "../../constants/common";
import { LECTURER_CREATE, LECTURER_UPDATE } from "../../graphql/mutations/lecturer";
import { PERSON_CREATE, PERSON_UPDATE } from "../../graphql/mutations/person";
import { LECTURER_GET_BY_ID} from "../../graphql/queries/profile";
import { STUDY_PROGRAMS_GET } from "../../graphql/queries/studyProgram";
import { getFullMediaPath } from "../../helper/mediaHepler";
import { FieldLabel } from "../../lib/common/Labels";
import { Button } from "../../lib/controls/Button";
import { ImageControl } from "../../lib/controls/ImageControl";
import { SelectSimple } from "../../lib/controls/SelectSimple";
import { TextField } from "../../lib/controls/TextField";
import { ISelectOptions } from "../../models/common";
import { UploadFileEntityContainer } from "../../models/fileUpload";
import { ILecturer, ILecturerEntity, Lecturer } from "../../models/lecturer";
import { IPersonEntity, Person } from "../../models/person";
import { IStudyProgramEntity } from "../../models/studyProgram";

export default function ProfileManager(){
    const {userAuth, setUserWithExpiryDate} = useContext(AppContext);
    const [initialProfile,setInitialProfile] = useState<ILecturerEntity>({
        id:0,
        attributes: Lecturer()
    });
    
    const [getLecturer, {data,loading,error}] = useLazyQuery(LECTURER_GET_BY_ID);
    const {data:prodiData,error:prodiError} = useQuery(STUDY_PROGRAMS_GET);
    const [createPerson, {loading:cpLoading, data:cpData}] = useMutation(PERSON_CREATE); 
    const [createLecturer, {loading:clLoading, data:clData}] = useMutation(LECTURER_CREATE);
    const [updatePerson, {loading:upLoading, data:upData}] = useMutation(PERSON_UPDATE); 
    const [updateLecturer, {loading:ulLoading, data:ulData}] = useMutation(LECTURER_UPDATE);
    
    const formik = useFormik<ILecturer>({
        initialValues:Lecturer(),
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
        if(userAuth.user?.lecturer?.data){
            //mode edit
            getLecturer({variables: {id:userAuth.user.lecturer.data.id}});
        }
    },[])

    const updateLecturerData = useCallback((lecturerData:any)=>{
        let profile:ILecturerEntity = {id:0, attributes: Lecturer()};
        if(lecturerData.lecturer){
            profile = lecturerData.lecturer.data
        }else if(lecturerData.createLecturer){
            profile = lecturerData.createLecturer.data
        }else if(lecturerData.updateLecturer){
            profile = lecturerData.updateLecturer.data
        }
        if(profile && profile.id){
            const lecturerData = cloneDeep(profile.attributes);
            if(lecturerData.studyProgram?.data){
                lecturerData.studyProgramID = lecturerData.studyProgram.data.id;
            }
            lecturerData.personID = lecturerData.person.data.id;
            lecturerData.userID = userAuth.user?.id;
            formik.setValues(lecturerData);
            const newUserAuth:any = cloneDeep(userAuth);
            if(!(newUserAuth.user?.lecturer?.data)){
                newUserAuth.user.lecturer.data = {
                    attributes: lecturerData,
                    id: profile.id
                }
                setUserWithExpiryDate(newUserAuth);
            }
            setInitialProfile(profile);
        }
    },[userAuth]);

    useEffect(()=>{
        if(data){
            updateLecturerData(data)
        }
    },[data]);

    useEffect(()=>{
        if(clData){
            updateLecturerData(clData)
        }
    },[clData]);

    useEffect(()=>{
        if(ulData){
            updateLecturerData(ulData)
        }
    },[ulData]);

    useEffect(()=>{
        const updateLecturerData = async () => {
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
                    createLecturer({variables: fields});
                }else{
                    updateLecturer({variables: {
                        id: initialProfile.id,
                        ...fields
                    }});
                }
                window.pushToast("Data dosen/tendik berhasil diubah");
            }
        }
        updateLecturerData();
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
            _person.idType = values.person.data.attributes.idType;
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
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div className="mb-5">
                                <FieldLabel label="Nama Lengkap"/>
                                <TextField name="person.data.attributes.name" type="text" placeholder="Nama dosen / tenaga pendidik" onChange={formik.handleChange} value={values.person.data.attributes.name}/>
                            </div>
                            <div>
                                <FieldLabel label="Posisi"/>
                                <SelectSimple placeholder="Posisi dalam proyek/ojt" onChange={(val:any)=>formik.setFieldValue("position",val)} value={values.position}
                                    options={managerPositions}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div>
                                <FieldLabel label="Tipe Identitas"/>
                                <SelectSimple placeholder="Pilih tipe identitas" onChange={(id:any)=>formik.setFieldValue("person.data.attributes.idType",id)} value={values.person.data.attributes.idType}
                                    options={idOptions}
                                />
                            </div>
                            <div>
                                <FieldLabel label="No. Identitas"/>
                                <TextField name="person.data.attributes.identity" type="text" placeholder="NIP/NIDN/NIK/NUP" onChange={formik.handleChange} value={values.person.data.attributes.identity}/>
                            </div>
                        </div>
                        <div className="mb-5">
                            <FieldLabel label="Program Studi"/>
                            <SelectSimple placeholder="Pilih program studi" onChange={(id:any)=>formik.setFieldValue("studyProgramID",id)} value={values.studyProgramID}
                                options={prodiOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 ml-auto">
                <Button title="Simpan Data" type="submit" icon="CheckIcon"
                  loading={ulLoading || upLoading || clLoading || cpLoading}
                />
            </div>
        </form>
    )
}