let activeFolder;

const loadFolders = () => {
  fetch('/api/v1/folders', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(folders => displayFolders(folders));
}

$('document').ready(loadFolders);


const displayFolders = (folders) => {
  $('.folder').remove();
  folders.forEach(folder => {
    $('#folders').append(`
      <li class='folder' id=${folder.id}>${folder.name}</li>`
    )
  })
}

const displayURLS = (urls) => {
  $('.url-table-row').remove();
  urls.forEach(url => {
    $('#urls-table').append(
      `<tr class='url-table-row'><td>${url.shortURL}</td><td>${url.longURL}</td><td>${url.visitCount}</td><td>${url.dateCreated}</td></tr>`
    )
  })
}

const loadURLs = () => {
  fetch(`/api/v1/folders/${activeFolder}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(folder => console.log(folder));
}

$('#create-folder-btn').on('click', (e) => {
  e.preventDefault();
  const newFolder = $('#new-folder').val();
  addFolder(newFolder);
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
})

const addURL = (url) => {
  fetch(`/api/v1/folders/${activeFolder}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({ longURL: url })
  })
    .then(res => res.json())
    .then(folder => displayURLS(folder.urls));
}

$('#shorten-url-btn').on('click', (e) => {
  e.preventDefault()
  const url = $('#url-input').val();
  addURL(url)
  // loadURLs();
})
