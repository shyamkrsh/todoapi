import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/layout/Navbar'
import AddTasks from './Components/AddTasks'
import TaskCard from './Components/TaskCard'
import Empty from './Components/Empty'
import axios from 'axios'

function App() {

  const [tasks, setTasks] = useState([]);
  const [isDoneShow, setIsDoneShow] = useState(false);

  useEffect(() => {
    axios.get(`https://api.freeapi.app/api/v1/todos`).then((res) => {
      setTasks(res?.data?.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [tasks])

  return (
    <>
      <Navbar />
      <AddTasks tasks={tasks} setTasks={setTasks} />
      <div className='flex items-center justify-center mt-2 gap-1'>
        <button className='bg-blue-500 px-2 py-1 rounded-md text-white' onClick={() => setIsDoneShow(false)}>To Do</button>
        <button className='bg-green-500 px-2 py-1 rounded-md text-white' onClick={() => setIsDoneShow(true)}>Done</button>
      </div>

      {/* here task */}

      <div className='h-[50vh] mt-5 overflow-x-hidden overflow-y-scroll relative'>

        <div className={isDoneShow ? 'hidden' : 'block'}>
          <div className={tasks?.some(task => !task.isComplete) ? "hidden" : 'block'}>
            <Empty />
          </div>

          {
            tasks?.map(task => (
              task?.isComplete ? "" : <TaskCard key={task?._id} task_id={task?._id} isComplete={task?.isComplete} title={task?.title} description={task?.description} />
            ))
          }
        </div>

        <div className={isDoneShow ? 'block' : 'hidden'}>
          <div className={tasks?.some(task => task.isComplete) ? "hidden" : 'block'}>
            <Empty />
          </div>
          {
            tasks?.map(task => (
              task?.isComplete ? <TaskCard key={task?._id} task_id={task?._id} isComplete={task?.isComplete} title={task?.title} description={task?.description} /> : ""
            ))
          }
        </div>
      </div>

    </>
  )
}

export default App
