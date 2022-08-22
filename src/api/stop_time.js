import { gql } from '@apollo/client';
import { TIMERECORD_FIELD } from './record_field';

export const TIME_STOP = gql`
    ${TIMERECORD_FIELD}
    mutation STOP_TIMERECORD($input: StartTimerecordInput) {
        stopTimerecord(input: $input) {
            ...TIMERECORD_INFO
        }
    }
`