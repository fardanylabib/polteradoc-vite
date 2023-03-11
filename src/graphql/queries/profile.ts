import { gql } from "@apollo/client";

export const LECTURER_GET_BY_ID = gql`
    query LecturerByID(
        $id: ID
    ) {
        lecturer(id: $id) {
            data{
                id
                attributes{
                    position
                    department
                    studyProgram{
                        data{
                            id
                            attributes{
                                name
                            }
                        }
                    }
                    user{
                        data{
                            id
                            attributes{
                                email
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

export const STUDENT_GET_BY_ID = gql`
    query StudentByID(
        $id: ID
    ) {
        student(id: $id) {
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
                    user{
                        data{
                            id
                            attributes{
                                email
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
