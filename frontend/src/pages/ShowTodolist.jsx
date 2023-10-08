import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'

const ShowTodolist = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams()

    useEffect(()=> {
        setLoading(true)
        axios.get(`http://localhost:8000/lists/${id}`)
        .then((res) => {
        //   setLists(res.data);
        console.log(res)
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLists(false);
        });
    }, [])

  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3x1 my-4'>Show Todolist</h1>
        {loading ? (
            <Spinner/>
        ) : (
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>
                        Id
                    </span>
                    <span>{lists._id}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>
                        Title
                    </span>
                    <span>{lists.title}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>
                        Content
                    </span>
                    <span>{lists.content}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>
                        Create Time
                    </span>
                    <span>{new Date(lists.createdAt).toString()}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>
                        Last Update Time
                    </span>
                    <span>{new Date(lists.updatedAt).toString()}</span>
                </div>
            </div>
        )}
    </div>
  )
}

export default ShowTodolist