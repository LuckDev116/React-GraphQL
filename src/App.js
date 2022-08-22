import './App.css';
import { TIME_GET_TASKS } from "./api/get_tasks"
import { TIME_START } from "./api/start_time"
import { TIME_STOP } from "./api/stop_time"
import { useQuery, useMutation } from "@apollo/client";
import { useState } from 'react'

export default function App() {
  const { loading, error, data } = useQuery(TIME_GET_TASKS);
  const [ startTimerecord ] = useMutation(TIME_START);
  const [ stopTimerecord ] = useMutation(TIME_STOP);
  const [ selectedTask, setSelectedTask ] = useState("")
  const [ buttonState, setButtonState ] = useState("true")
  

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
    
  const onButtonClick = () => {
    setButtonState(!buttonState)
    buttonState ?
    startTimerecord({ variables: { input: {
      "taskid": Number(selectedTask),
      "notes": "Example Notes1"
      }
     }}): stopTimerecord({ variables: { input: {
      "taskid": Number(selectedTask),
      "notes": "Example Notes1"
      }
     }})
  }

  const onTaskSelected = (e) => {
    setSelectedTask(e.target.value)
  }

  return (
    <div>
      <select name='Task' onChange={onTaskSelected} disabled={!buttonState}>
        {data.tasks.map((task) =>(
            <option key={task.id} value={task.id}>{task.name}</option>
          ))
        }
      </select>
      <button onClick={onButtonClick}>{buttonState ? "Start Timer Button" : "Stop Timer Button"}</button>
      {
        (
          <table>
            <thead>
              <tr>
                <td>notes</td>
                <td>TrackedBy</td>
                <td>Date</td>
                <td>TimeTicked</td>
              </tr>
            </thead>
            <tbody>
              {
                data.tasks.filter( item => item.id === selectedTask ).map((timerecords1)=> {
                  return timerecords1.timerecords.map(item => (
                    <tr key={item.id}>
                      <td>{item.notes}</td>
                      <td>{item.contact.fullname}</td>
                      <td>{item.startdate}</td>
                      <td>{item.enddate ?  item.enddate.toString() : "running"}</td>
                    </tr>
                  ))
                })
              }
            </tbody>
          </table> 
        )        
      }
    </div>
  );
}