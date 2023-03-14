import { IDepartmentEntityResponse } from "./department"
import { IPersonEntityResponse } from "./person"
import { IStudyProgramEntityResponse } from "./studyProgram"
import { IUsersPermissionsEntityResponse } from "./user"

export interface ILecturer {
    position: EnumLecturerPosition
    department?: IDepartmentEntityResponse
    studyProgram?: IStudyProgramEntityResponse
    user: IUsersPermissionsEntityResponse
    person: IPersonEntityResponse
    studyProgramID?: number
    userID?: number
    personID?: number
}

export interface ILecturerRelationResponseCollection {
    data: ILecturerEntity[]
}

export interface ILecturerEntityResponse {
    data: ILecturerEntity
}

export interface ILecturerEntity{
    id: number
    attributes: ILecturer
}


export const Lecturer = ():ILecturer => ({
    position: EnumLecturerPosition.KOORDINATOR,
    user:{
        data:{
            attributes:{
                username:""
            }
        }
    },
    person:{
        data:{
            attributes:{
                name:"",
                identity:"",
                idType:""
            }
        }
    }
})

export enum EnumLecturerPosition {
    KETUA_JURUSAN="KETUA_JURUSAN",
    KETUA_PRODI="KETUA_PRODI",
    KOORDINATOR="KOORDINATOR"
}