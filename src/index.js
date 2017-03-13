$('#create-folder-btn').on('click', (e) => {
  e.preventDefault();
  const newFolder = $('#new-folder').val();
  displayFolder(newFolder);
})

const displayFolder = (folder) => {
  $('#folders').append(`<li class='folder'>${folder}</li>`)
}
