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
    photoID?: number
    companiesID?: number[]
    documentsID?: number[]
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

export const PersonEntityContainer = ():IPersonEntityResponse => ({
    data:{
        attributes:Person()
    }
});

export const Person = ():IPerson=> ({
    identity:"",
    idType:"",
    name:"",
    photo: {
        data: {
            attributes:{
                previewUrl:"",
                url:""
            }
        }
    },
    photoID:0
})