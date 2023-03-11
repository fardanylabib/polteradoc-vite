import { ICompanyEntityResponse } from "./company"
import { IDocumentEntityResponseCollection } from "./document"
import { IStudentRelationResponseCollection } from "./student"

export interface IProjectEntityResponseCollection {
    data: IProjectEntity[]
}

export interface IProjectEntityResponse {
    data: IProjectEntity
}
  
export interface IProjectEntity {
    id: number
    attributes: IProject
}

export interface IProject {
    company: ICompanyEntityResponse
    students: IStudentRelationResponseCollection
    step: EnumProjectStep
    documents: IDocumentEntityResponseCollection
}

export enum EnumProjectStep {
    PROPOSAL="PROPOSAL",
    OJT="OJT",
    REPORT="REPORT",
    PRESENTATION="PRESENTATION",
    REVISION="REVISION"
}