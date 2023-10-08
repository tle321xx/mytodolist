import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditTodolist = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()
    const { enqueueSnackbar } = useSnackbar()
    useEffect(()=> {
        setLoading(true)
        axios.get(`http://localhost:8000/lists/${id}`)
        .then((res) => {
            setTitle(res.data.title)
            setContent(res.data.content)
            setLoading(false);
          }).catch((error) => {
            setLoading(false);
            // alert('An error happened. Please Chack console');
            console.log(error);
          });
    },[])

    const handleEditList = () => {
        const data = {
            title,
            content
        }
        setLoading(true)
        axios.put(`http://localhost:8000/lists/${id}`, data)
        .then(()=> {
            setLoading(false)
            enqueueSnackbar('Booked Edited', { variant: 'success'})
            navigate('/')
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            enqueueSnackbar('Error', { variant: 'error'})
          });
    }

  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3x1 my-4'>Edit Todolist</h1>
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
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditList}>
                Save
            </button>
        </div>
    </div>
  )
}

export default EditTodolist