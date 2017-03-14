const sortByAlpha = (array) => {
  return array.sort((a, b) => {
    return a.name > b.name
  })
}

module.exports = sortByAlpha;
