import { useState } from "react"

const AddTask = ({onAdd}) => {
    const [text,setText] = useState("")
    const [day,setDay] = useState("")
    const [finished,setFinished] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text){
            alert("please add task text")
        }
        else {
            onAdd({text,day,finished})
            setText("")
            setDay("")
            setFinished(false)
        }
    }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/>
        </div>

        <div className='form-control'>
            <label>Day & Time</label>
            <input type="date" placeholder='Add Date' value={day} onChange={(e) => setDay(e.target.value)} />
        </div>

        <div className='form-control form-control-check'>
            <label>Set Finished</label>
            <input type='checkbox'checked={finished} placeholder='Add Task' value={finished} onChange={(e) => setFinished(e.currentTarget.checked)}/>
        </div>

        <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
    
  ) 
}

export default AddTask