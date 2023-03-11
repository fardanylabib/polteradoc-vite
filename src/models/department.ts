import { ILecturerRelationResponseCollection } from "./lecturer"

export interface IDepartmentEntityResponse {
    data: IDepartmentEntity
}

export interface IDepartmentEntity{
    id: number
    attributes: IDepartment
}

export interface IDepartment {
    name: string
    lecturers: ILecturerRelationResponseCollection
}