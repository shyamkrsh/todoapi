import axios from 'axios';
import React, { useState } from 'react'

function AddTasks() {

    const [formData, setFormData] = useState({ title: '', description: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    let handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://api.freeapi.app/api/v1/todos`, formData).then(() => {
            setFormData({ title: '', description: '' });
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div onSubmit={handleSubmit} className='mt-5'>
            <form className='flex flex-col justify-center items-center gap-3'>
                <input type="text" name='title' required value={formData?.title} onChange={handleChange} placeholder='write task title' className="input input-bordered w-[80%] md:w-[50%]" />
                <input type="text" name='description' required value={formData?.description} onChange={handleChange} placeholder='Write you task here' className="input input-bordered w-[80%] md:w-[50%]" />
                <button type='submit' className="bg-blue-500 w-[50%] md:w-[10%] px-3 py-2 md:py-3 rounded-md text-white">Add new task</button>
            </form>
        </div>
    )
}

export default AddTasks