import { ICompanyEntityResponseCollection } from "./company"
import { IDocumentEntityResponseCollection } from "./document"
import { IUploadFileEntityResponse } from "./fileUpload"

export interface IPerson {
    name: string
    identity: string
    idType: string
    companies?: ICompanyEntityResponseCollection
    documents?: IDocumentEntityResponseCollection
    photo?: IUploadFileEntityResponse
}
  
export interface IPersonEntity {
    id?: number
    attributes: IPerson
}

export interface IPersonEntityResponse {
    data: IPersonEntity 
}
export interface IPersonEntityResponseCollection {
    data: IPersonEntity[] 
}