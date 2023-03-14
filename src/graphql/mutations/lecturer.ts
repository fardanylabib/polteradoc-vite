import { gql } from "@apollo/client";

export const LECTURER_CREATE = gql`
    mutation LecturerCreate(
        $position: ENUM_LECTURER_POSITION
        $studyProgramID: ID
        $userID: ID
        $personID: ID
    ){
        createLecturer(data:{
            position: $position
            studyProgram: $studyProgramID
            user: $userID
            person: $personID
        }){
            data{
                id
                attributes{
                    position
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


export const LECTURER_UPDATE = gql`
    mutation LecturerUpdate(
        $id: ID!
        $position: ENUM_LECTURER_POSITION
        $studyProgramID: ID
        $userID: ID
        $personID: ID
    ){
        updateLecturer(
            id: $id,
            data:{
                position: $position
                studyProgram: $studyProgramID
                user: $userID
                person: $personID
            }
        ){
            data{
                id
                attributes{
                    position
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