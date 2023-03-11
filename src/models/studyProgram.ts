import { IDepartmentEntityResponse } from "./department"
import { ILecturerRelationResponseCollection } from "./lecturer"

export interface IStudyProgram{
    name: string
    department?: IDepartmentEntityResponse
    lecturers?: ILecturerRelationResponseCollection
}

export interface IStudyProgramEntityResponse {
    data: IStudyProgramEntity
}

export interface IStudyProgramEntity {
    id?: number
    attributes: IStudyProgram
}