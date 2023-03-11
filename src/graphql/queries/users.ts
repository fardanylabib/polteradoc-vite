import { gql } from "@apollo/client";

export const USER_PERMISSIONS_ME = gql`
    query UserByID(
        $id: ID
    ) {
        usersPermissionsUser(id: $id) {
            data{
                id
                attributes{
                    username
                    email
                    confirmed
                    blocked
                    role{
                        data{
                            attributes{
                                name
                            }
                        }
                    }
                    student{
                        data{
                            id
                            attributes{
                                person{
                                    data{
                                        id
                                        attributes{
                                            name
                                            identity
                                            idType
                                        }
                                    }
                                }
                            }
                        }
                    }
                    lecturer{
                        data{
                            id
                            attributes{
                                person{
                                    data{
                                        id
                                        attributes{
                                            name
                                            identity
                                            idType
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`