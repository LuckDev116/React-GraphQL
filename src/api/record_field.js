import { gql } from '@apollo/client';

export const TIMERECORD_FIELD = gql`
    fragment TIMERECORD_INFO on Timerecord {
        id
        timespent
        startdate
        enddate
        running
        notes
        task{
            id
        }
        contact {
            id
            fullname
        }
    }
`;