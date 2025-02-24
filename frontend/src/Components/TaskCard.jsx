import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';

function TaskCard({ task_id, isComplete, title, description }) {

    const [formData, setFormData] = useState({ title, description });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    let handleTaskDelete = (id) => {
        axios.delete(`https://api.freeapi.app/api/v1/todos/${id}`).catch((err) => {
            console.log(err);
        })
    };

    let handleTaskDone = (id) => {
        axios.patch(`https://api.freeapi.app/api/v1/todos/toggle/status/${id}`, { isComplete: !isComplete },
        ).catch((err) => {
            console.log(err);
        })
    };

    let handleUpdate = (id) => {
        axios.patch(`https://api.freeapi.app/api/v1/todos/${id}`, formData).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='flex items-center justify-center gap-5 md:gap-10 mt-5 w-[90%] md:w-[75%] shadow-lg mx-auto rounded-md py-2 border'>
            <div>
                <input type="checkbox" checked={isComplete} className="checkbox checkbox-md" onChange={() => handleTaskDone(task_id)} />
            </div>
            <div className='w-[45%] md:w-[60%]'>
                <h1 className='text-xl font-semibold'>{title}</h1>
                <p>{description}</p>
            </div>
            <div className='flex items-center justify-center gap-3'>

                <button onClick={() => document.getElementById(`edit_modal_${task_id}`).showModal()}
                    className='bg-blue-500 hover:bg-blue-600 p-1 text-white text-2xl rounded-md'>
                    <BiEdit />
                </button>
                <dialog id={`edit_modal_${task_id}`} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit your task</h3>
                        <input type="text"
                            name='title'
                            value={formData?.title}
                            onChange={handleChange}
                            placeholder='Write your task here'
                            className="input input-bordered w-[80%] md:w-[50%] mt-3 block mx-auto"
                        />
                        <input type="text"
                            name='description'
                            value={formData?.description}
                            onChange={handleChange}
                            placeholder='Write your task here'
                            className="input input-bordered w-[80%] md:w-[50%] mt-3 block mx-auto"
                        />
                        <div className="modal-action flex gap-2">
                            <button className="btn" onClick={() => document.getElementById(`edit_modal_${task_id}`).close()}>
                                Cancel
                            </button>
                            <button className="btn" onClick={() => {
                                handleUpdate(task_id);
                                document.getElementById(`edit_modal_${task_id}`).close(); // Close modal after update
                            }}>
                                Ok
                            </button>
                        </div>
                    </div>
                </dialog>

                <button onClick={() => document.getElementById(`delete_modal_${task_id}`).showModal()} className='bg-red-500 hover:bg-red-600 p-1 text-white text-2xl rounded-md'><MdDeleteOutline /> </button>
                <dialog id={`delete_modal_${task_id}`} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Alert!</h3>
                        <p className="py-2">Are you sure you want to delete this task?</p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => document.getElementById(`delete_modal_${task_id}`).close()}>Cancel</button>
                            <button className="btn" onClick={(e) => {
                                e.preventDefault();
                                handleTaskDelete(task_id);
                                document.getElementById(`delete_modal_${task_id}`).close();
                            }}>
                                Ok
                            </button>
                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    )
}

export default TaskCard