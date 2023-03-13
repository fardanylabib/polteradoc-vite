import { gql } from "@apollo/client";

export const STUDENT_CREATE = gql`
    mutation StudentCreate(
        $class: String
        $year: String
        $studyProgramID: ID
        $projectsID: [ID]
        $userID: ID
        $personID: ID
    ){
        createStudent(data:{
            class: $class
            year: $year
            studyProgram: $studyProgramID
            projects: $projectsID
            user: $userID
            person: $personID
        }){
            data{
                id
                attributes{
                    class
                    year
                    studyProgram{
                        data{
                            id
                            attributes{
                                name
                            }
                        }
                    }
                    person{
                        data{
                            id
                            attributes{
                                name
                                identity
                                idType
                                photo{
                                    data{
                                        id
                                        attributes{
                                            url
                                            previewUrl
                                        }
                                    }
                                }
                            }
                        }
                    }
                    user{
                        data{
                            id
                        }
                    }
                }
            }
        }
    }
`;


export const STUDENT_UPDATE = gql`
    mutation StudentUpdate(
        $id: ID!
        $class: String
        $year: String
        $studyProgramID: ID
        $projectsID: [ID]
        $userID: ID
        $personID: ID
    ){
        updateStudent(
            id: $id,
            data:{
                class: $class
                year: $year
                studyProgram: $studyProgramID
                projects: $projectsID
                user: $userID
                person: $personID
            }
        ){
            data{
                id
                attributes{
                    class
                    year
                    studyProgram{
                        data{
                            id
                            attributes{
                                name
                            }
                        }
                    }
                    person{
                        data{
                            id
                            attributes{
                                name
                                identity
                                idType
                                photo{
                                    data{
                                        id
                                        attributes{
                                            url
                                            previewUrl
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;