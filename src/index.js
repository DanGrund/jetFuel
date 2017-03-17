let activeFolder;
let currentURLs;

const loadFolders = () => {
  fetch('/api/v1/folders', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(folders => displayFolders(folders));
}

$('document').ready(loadFolders);

const duplicateFolderError = (input) => {
  if(input) {
    $('.duplicate-error').text('Folder already exists')
  } else {
    $('.duplicate-error').text('')
  }
}

const displayFolders = (folders) => {
  if(folders === 'dupe') {
    return duplicateFolderError(true);
  } else {
    duplicateFolderError(false);
  }
  $('.folder').remove();
  folders.forEach(folder => {
    $('#folders').append(`
      <li class='folder' id=${folder.id}>${folder.name}</li>`
    )
  })
}

const clearInput = (input) => {
  $(`${input}`).val('')
}

const displayURLs = (urls) => {
  $('.url-table-row').remove();
  urls.forEach(url => {
    const date = moment(parseInt(url.created_at)).format('lll')
    // const date = parseInt(url.created_at)
    $('#urls-table').append(
      `<tr class='url-table-row'><td><a href="${url.longURL}" class="short-url-link" id=${url.shortURL} target="_blank">localhost:3000/${url.shortURL}</a></td><td>${url.longURL}</td><td>${url.visitCount}</td><td>${date}</td></tr>`
    )
  })
}

const loadURLs = () => {
  fetch(`/api/v1/folders/${activeFolder}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(urls => {
      currentURLs = urls;
      displayURLs(currentURLs)
    });
}

$('#create-folder-btn').on('click', (e) => {
  e.preventDefault();
  const newFolder = $('#new-folder').val();
  addFolder(newFolder);
  clearInput('#new-folder')
})

const addFolder = (folder) => {
  fetch('/api/v1/folders', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      folder: folder
    })
  })
    .then(res => res.json())
    .then(folders => displayFolders(folders))
}

const toggleActive = (id) => {
  activeFolder = id;
  $(`.folder`).removeClass('active-folder')
  $(`#${activeFolder}`).addClass('active-folder')
}

$('#folders').on('click', '.folder', (e) => {
  const titleId = e.target.id;
  toggleActive(titleId);
  loadURLs()
})

const addURL = (url) => {
  const longURL = validateHTTP(url)
  fetch(`/api/v1/folders/${activeFolder}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ longURL })
  })
    .then(res => res.json())
    .then(urlData => {
      displayURLs(urlData);
    })
}

$('#shorten-url-btn').on('click', (e) => {
  e.preventDefault()
  const url = $('#url-input').val();
  addURL(url)
  clearInput('#url-input')
})

const sortUp = (attribute) => {
  newURLorder = currentURLs.sort((a,b)=>{return a[attribute] > b[attribute] })
  displayURLs(newURLorder)
}

const sortDown = (attribute) => {
  newURLorder = currentURLs.sort((a,b)=>{return a[attribute] < b[attribute] })
  displayURLs(newURLorder)
}


$('#visits').on('click', () => {
 if ($('#visits').hasClass('visits-up')) {
   sortUp('visitCount')
   $('#visits').toggleClass('visits-up')
 } else {
   sortDown('visitCount')
   $('#visits').toggleClass('visits-up')
 }
})

$('#date-created').on('click', () => {
 if ($('#date-created').hasClass('date-created-up')) {
   sortUp('created_at')
   $('#date-created').toggleClass('date-created-up')
 } else {
   sortDown('created_at')
   $('#date-created').toggleClass('date-created-up')
 }
})

$('#urls-table').on('click', '.short-url-link', (e) => {
  updateVisitCount(e.target.id)
})


const updateVisitCount = (urlID) => {
  fetch(`/${urlID}`, {
    method: 'PUT',
  })
}
