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
    $('#folders').append(`<li class='folder' id=${folder.id}>${folder.name}</li>`)
  })
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
  console.log(activeFolder);
}

$('#folders').on('click', '.folder', (e) => {
  const titleId = e.target.id;
  toggleActive(titleId)
})
