import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsFillCheckCircleFill, BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { BsCircleFill } from 'react-icons/bs'
import { MdOutlineAddBox } from 'react-icons/md'
import { useParams } from 'react-router-dom'

const Home = () => {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)
  const [check, setCheck] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:8000/lists')
      .then((res) => {
        setLists(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const handleCheck = async (id) => {
    const todoItem = lists.find((todo) => todo._id === id)
    const payload = { done: !todoItem.done }

    try {
      await axios.patch(`http://localhost:8000/lists/${id}`, payload)
      const tempLists = [...lists]
      const listIndex = tempLists.findIndex((todo) => todo._id === todoItem._id)
      tempLists[listIndex].done = !todoItem.done
      setLists(tempLists)
    } catch (error) {
      console.error('handleCheck Error :: ', error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between item-center">
        <h1 className="text-3xl my-8">Your Todolists</h1>
        <Link to="/lists/create">
          <MdOutlineAddBox className="text-sky-800 text-4x1" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separated border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Content
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list, index) => (
              <tr key={list._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {list.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {list.content}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <div onClick={() => handleCheck(list._id)}>
                      {list.done ? <BsFillCheckCircleFill /> : <BsCircleFill />}
                    </div>
                    <Link to={`/lists/details/${list._id}`}>
                      <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link to={`/lists/edit/${list._id}`}>
                      <AiOutlineEdit className="text-2x1 text-yellow-800" />
                    </Link>
                    <Link to={`/lists/delete/${list._id}`}>
                      <MdOutlineDelete className="text-2x1 text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <span>Click <BsCircleFill /> to complete the task</span> <hr />
      <span>Click <MdOutlineAddBox className="text-sky-800 text-4x1" /> to add the task</span>
    </div>
  )
}

export default Home
