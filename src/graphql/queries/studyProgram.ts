import { gql } from "@apollo/client";

export const STUDY_PROGRAMS_GET = gql`
    query StudyPrograms(
        $sort: [String] = ["name"]
    ) {
        studyPrograms(
            sort:$sort
        ) {
            data{
                id
                attributes{
                    name
                    department{
                        data{
                            id
                            attributes{
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;