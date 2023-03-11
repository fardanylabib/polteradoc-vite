import { IDepartmentEntityResponse } from "./department"
import { IPersonEntityResponse } from "./person"
import { IStudyProgramEntityResponse } from "./studyProgram"
import { IUsersPermissionsEntityResponse } from "./user"

export interface ILecturerRelationResponseCollection {
    data: ILecturerEntity[]
}

export interface ILecturerEntityResponse {
    data: ILecturerEntity[]
}

export interface ILecturerEntity{
    id: number
    attributes: ILecturer
}

export interface ILecturer {
    position: EnumLecturerPosition
    department: IDepartmentEntityResponse
    studyProgram: IStudyProgramEntityResponse
    user: IUsersPermissionsEntityResponse
    person: IPersonEntityResponse
}

export enum EnumLecturerPosition {
    KETUA_JURUSAN="KETUA_JURUSAN",
    KETUA_PRODI="KETUA_PRODI",
    KOORDINATOR="KOORDINATOR"
}