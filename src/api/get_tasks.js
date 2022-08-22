import { gql } from '@apollo/client';
import { TIMERECORD_FIELD } from './record_field';

export const TIME_GET_TASKS = gql`
    ${TIMERECORD_FIELD}
    query GET_TASKS {
        tasks(
          input: {
            limit: 10
            orderby: { name: asc }
            where: { 
                displaytype:{NEQ:heading},
                status: { EQ: active } }
          }
        ) {
          id
          name
          timerecords(input:{running:{IN:[true,false]}}) {
            ...TIMERECORD_INFO
          }
          taskTotalTimespent: timespent
        }
      }
`