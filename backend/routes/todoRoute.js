import express from 'express'
import { List } from '../models/todoModel.js'

const router = express.Router()

//   create list
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).send({
        message: 'Send all requires fields: title, content',
      })
    }
    const newList = {
      title: req.body.title,
      content: req.body.content,
    }
    const list = await List.create(newList)

    return res.status(200).send(list)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})

// get all list from db
router.get('/', async (req, res) => {
  try {
    const lists = await List.find({})

    return res.status(200).json({
      count: lists.length,
      data: lists,
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})

// get all list from db by id
// we need id to serach in db
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const lists = await List.findById(id)

    return res.status(200).json(lists)
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: 'Send all requires fields: title, content',
      })
    }

    const { done } = req.body
    const { id } = req.params
    const result = await List.findByIdAndUpdate(id, { done })

    if (!result) {
      return res.status(404).json({ message: 'todoList not found' })
    }

    return res.status(200).send({ message: 'todoList Updated Successfully ' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})

// delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await List.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({ message: 'todoList not found' })
    }
    return res.status(200).send({ message: 'todoList Deleted Successfully ' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).send({
        message: 'Send all requires fields: title, content',
      })
    }

    const { id } = req.params
    // const { done } = req.params;
    console.log(id)
    const result = await List.findByIdAndUpdate(id, { done: true })
    if (!result) {
      return res.status(404).json({ message: 'todoList not found' })
    }
    return res.status(200).send({ message: 'todoList Updated Successfully ' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})

export default router
