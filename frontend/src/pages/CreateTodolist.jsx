import React, {useState} from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateLists = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    

    const handleSaveLists = () => {
        const data = {
            title,
            content
        }
        setLoading(true)
        axios.post(`http://localhost:8000/lists`, data)
        .then(()=> {
            setLoading(false)
            enqueueSnackbar('Booked Created', { variant: 'success'})
            navigate('/')
        })
        .catch((error) => {
            console.log(error);
            enqueueSnackbar('Error', { variant: 'error'})
            setLoading(false);
          });
    }
    

  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3x1 my-4'>Create Todolist</h1>
        {loading ? <Spinner/> : ''}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
                <label className='text-xl mr-4 text-gray-500'>Title</label>
                <input 
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <div className="my-4">
                <label className='text-xl mr-4 text-gray-500'>Content</label>
                <input 
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleSaveLists}>
                Save
            </button>
        </div>
    </div>
  )
}

export default CreateLists