import { gql } from '@apollo/client';
import { TIMERECORD_FIELD } from './record_field';

export const TIME_START = gql`
    ${TIMERECORD_FIELD}
    mutation START_TIMERECORD($input: StartTimerecordInput) {
        startTimerecord(input: $input) {
          ...TIMERECORD_INFO
        }
    }
`