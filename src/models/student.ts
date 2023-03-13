import { IPersonEntityResponse } from "./person"
import { IProjectEntityResponseCollection } from "./project"
import { IStudyProgramEntityResponse } from "./studyProgram"
import { IUsersPermissionsEntityResponse } from "./user"

export interface IStudent{
    class: string
    year: string
    studyProgram?: IStudyProgramEntityResponse
    projects?: IProjectEntityResponseCollection
    user: IUsersPermissionsEntityResponse
    person: IPersonEntityResponse
    studyProgramID?: number
    projectsID?: number[]
    userID?: number
    personID?: number
}

export interface IStudentRelationResponseCollection {
    data: IStudentEntity[]
}

export interface IStudentEntityResponse {
    data: IStudentEntity
}

export interface IStudentEntity {
    id: number
    attributes: IStudent
}

export const Student = ():IStudent => ({
    class:"",
    year:"",
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
                idType:"NRP"
            }
        }
    }
})