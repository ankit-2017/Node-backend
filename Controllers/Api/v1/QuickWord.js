const { generate } = require('random-words')
const { wordsFormat } = require('../../Transformer/words')

exports.getWords = async (req, res) => {
  try {
    const level = req.query.level
    let options
    if (level === '1') {
      options = {
        exactly: 3,
        minLength: 3,
        maxLength: 6
      }
    } else if (level === '2') {
      options = {
        exactly: 4,
        minLength: 3,
        maxLength: 7
      }
    }
    const words = generate(options)
    let data = words.map(async word => {
      const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      const response = await result.json()
      if (response && response.length > 0) {
        return response[0]
      }
    })
    data = await Promise.all(data)
    data = data.map(item => item && wordsFormat(item))
    return res.status(200).json({ words, data })
  } catch (error) {
    return res.status(500).json({ data: [error.message], error: true, message: "Something went wrong" })
  }
}