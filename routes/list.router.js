const router = require('express').Router()
const List = require('../modeles/List.Schema')

const Schema = List

// admin only
router.get('/', async (req, res, next) => {
    try {
        const lists = await Schema.find()
        res.status(200).json(lists)
    } catch (error) {
        next(error)
    }
})

router.get('/:listId', async (req, res, next) => {
    try {
        const { listId } = req.params
        const list = await Schema.findById(listId)
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const list = req.body
        const response = Schema.create(list)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})

router.put('/:listId', async (req, res, next) => {
    try {
        const { listId } = req.params
        const dataToModified = req.body
        const modifiedList = await Schema.findByIdAndUpdate(
            listId,
            dataToModified,
            { new: true }
        )
        res.status(200).json({message: "list modified !"})
    } catch (error) {
        next(error)
    }
})

router.delete('/:listId', async (req, res, next) => {
    try {
        const { listId } = req.params
    } catch (error) {
        next(error)
    }
})

module.exports = router
