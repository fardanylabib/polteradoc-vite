import { IPersonEntityResponse } from "./person"
import { IProjectEntityResponseCollection } from "./project"
import { IStudyProgramEntityResponse } from "./studyProgram"
import { IUsersPermissionsEntityResponse } from "./user"

export interface IStudent{
    class: string
    year: string
    studyProgram: IStudyProgramEntityResponse
    projects?: IProjectEntityResponseCollection
    user: IUsersPermissionsEntityResponse
    person: IPersonEntityResponse
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
    studyProgram:{
        data:{
            id:-1,
            attributes:{
                name:""
            }
        }
    },
    user:{
        data:{
            atributes:{
                username:""
            }
        }
    },
    person:{
        data:{
            attributes:{
                name:"",
                identity:"",
                idType:""
            }
        }
    }
})