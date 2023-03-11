import { IUploadFileEntityResponse } from "./fileUpload"
import { IPersonEntityResponse, IPersonEntityResponseCollection } from "./person"
import { IProjectEntityResponse } from "./project"

export interface IDocumentEntityResponseCollection {
    data: IDocumentEntity[]
}

export interface IDocumentEntity{
    id: number
    attributes: IDocument
}

export interface IDocument {
    readers: IPersonEntityResponseCollection
    writers: IPersonEntityResponseCollection
    title: string
    project: IProjectEntityResponse
    approvedBy: IPersonEntityResponseCollection
    documentLogs: IDocLogEntityResponseCollection
    status: IDocStatusEntityResponse
    file: IUploadFileEntityResponse
}

export interface IDocStatusEntityResponse {
    data: DocStatusEntity
}

export interface IDocStatus {
    name: string
    description: string
}

export interface DocStatusEntity {
    id: number
    attributes: IDocStatus
}
  

export interface IDocLogEntityResponseCollection{
    data: IDocLogEntity[]
}

export interface IDocLogEntity {
    id: number
    attributes: IDocLog
}
 
export interface IDocLog {
    timestamp: number
    action: IDocActionEntityResponse
    by: IPersonEntityResponse
}

export interface IDocActionEntityResponse {
    data: IDocActionEntity
}

export interface IDocActionEntity {
    id: number
    attributes: IDocAction
}

export interface IDocAction {
    name: string
    description: string
}