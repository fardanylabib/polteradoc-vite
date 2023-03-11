export interface IUploadFile {
    name?: string
    alternativeText?: string
    caption?: string
    width?: number
    height?: number
    mime?: string
    size?: number
    url: string
    previewUrl: string
  }

export interface IUploadFileEntity{
    id: number
    attributes: IUploadFile
}
export interface IUploadFileEntityResponse {
    data: IUploadFileEntity
}

export const UploadedFile = ():IUploadFile =>({
    url:"",
    previewUrl:""
})