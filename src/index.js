$('#create-folder-btn').on('click', (e) => {
  e.preventDefault();
  const newFolder = $('#new-folder').val();
  displayFolder(newFolder);
})

const loadFolders = () => {
  fetch('/api/v1/folders', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(folders => displayFolders(folders));
}

$('document').ready(loadFolders);


const displayFolders = (folders) => {
  folders.forEach(folder => {
    $('#folders').append(`<li class='folder'>${folder.name}</li>`)
  })
}

// const createFolder = (folder) => {
//   fetch('http://localhost:3000/')
// }
