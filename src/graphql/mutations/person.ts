import { gql } from "@apollo/client";

export const PERSON_CREATE = gql`
    mutation PersonCreate(
        $name: String
        $identity: String
        $idType: String
        $photoID: ID
    ){
        createPerson(data:{
            name: $name
            identity: $identity
            idType: $idType
            photo: $photoID
        }){
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
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const PERSON_UPDATE = gql`
    mutation PersonUpdate(
        $id:ID!
        $name: String
        $identity: String
        $idType: String
        $photoID: ID
    ){
        updatePerson(
            id: $id,
            data:{
                name: $name
                identity: $identity
                idType: $idType
                photo: $photoID
            }
        ){
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
                            }
                        }
                    }
                }
            }
        }
    }
`;