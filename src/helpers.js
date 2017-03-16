const validateHTTP = (url) => {
  if(!/^(f|ht)tps?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return url;
}


module.exports = validateHTTP
