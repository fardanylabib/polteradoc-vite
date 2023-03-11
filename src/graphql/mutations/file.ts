import { gql } from "@apollo/client";

export const UPLOAD = gql`
    mutation UploadFile(
        $file: Upload!
    ) {
        upload(file: $file) {
            data{
                id
                attributes{
                    name
                    mime
                    url
                    size
                }
            }
        }
    }
`;