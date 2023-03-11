import { IPersonEntityResponseCollection } from "./person"
import { IProjectEntityResponseCollection } from "./project"

export interface ICompanyEntityResponseCollection{
    data: ICompanyEntity[]
}

export interface ICompanyEntityResponse{
    data: ICompanyEntity
}

export interface ICompanyEntity {
    id: number
    attributes: ICompany
}

export interface ICompany{
    name: string
    address: string
    people: IPersonEntityResponseCollection
    projects: IProjectEntityResponseCollection
}