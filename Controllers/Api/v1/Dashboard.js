const { Client, BaseCollection } = require('porn-x')

const collection = new BaseCollection();
const client = new Client();


exports.getMedia = async (req, res) => {
    try {
        console.log(req.query)
        const queryString = req.query.param
        const result = await client.getImages(queryString || "Alison Tyler");
        const updatedResult = result.images.map((item, index) => ({ id: index, url: item }))
        const response = {
            images: updatedResult,
            title: result.title
        }
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({ data: [error.message], error: true, message: "Something went wrong" })

    }
}

exports.getVideos = async (req, res) => {
    try {
        console.log(req.query)
        const queryString = req.query.param
        const result = await client.getShortVideos(queryString || "Alison Tyler");
        console.log('result', result)
        const updatedResult = result?.map((item, index) => ({ id: index, url: item }))
        const response = {
            videos: updatedResult,
            title: req.query.param
        }
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({ data: [error.message], error: true, message: "Something went wrong" })

    }
}

exports.getModels = async (req, res) => {
    try {
        console.log(req.query)
        const queryString = req.query.param
        collection.getWallpaper("Alison tyler").then(data => {
            console.log('data', data)
        })
        // console.log('result', result)
        // const updatedResult = result?.map((item, index) => ({ id: index, url: item }))
        const response = {
            images: [],
            title: req.query.param
        }
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({ data: [error.message], error: true, message: "Something went wrong" })

    }
}