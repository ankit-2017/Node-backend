exports.wordsFormat = (data) => {
  return {
    word: data.word,
    phonetic: data.phonetics[0] || {},
    definitions: data.meanings[0]?.definitions[0] || {}
  }
}