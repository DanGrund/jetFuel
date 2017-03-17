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

const displayFolders = (folders) => {
  $('.folder').remove();
  folders.forEach(folder => {
    $('#folders').append(`
      <li class='folder' id=${folder.id}>${folder.name}</li>`
    )
  })
}

const folderMsg = () => {
  if(!activeFolder) {
    $('.folder-msg').text('<p>Please select a folder</p>')
  }
}

folderMsg();

const clearInput = (input) => {
  $(`${input}`).val('')
}

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

const displayURLs = (urls) => {
  $('.url-table-row').remove();
  urls.forEach(url => {
    const date = moment(parseInt(url.created_at)).format('lll')
    // const date = parseInt(url.created_at)
    $('#urls-table').append(
      `<tr class='url-table-row'>
        <td class='short-url'>
          <a href="${url.longURL}"
             class="short-url-link"
             id=${url.shortURL}
             target="_blank">
            localhost:3000/${url.shortURL}
          </a>
        </td>
        <td class='long-url'>${url.longURL}</td>
        <td class='visit-count'>${url.visitCount}</td>
        <td class='date'>${date}</td></tr>`
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
    body: JSON.stringify({ folder })
  })
    .then(res => res.json())
    .then(folders => displayFolders(folders))
}

const toggleActive = (id) => {
  activeFolder = id;
  $(`.folder`).removeClass('active-folder')
  $(`#${activeFolder}`).addClass('active-folder')
}

const toggleTableView = () => {
  if(activeFolder) {
    $('#urls-table').removeClass('hidden')
  } else {
    $('#urls-table').addClass('hidden')
  }
}

$('#folders').on('click', '.folder', (e) => {
  const titleId = e.target.id;
  toggleActive(titleId);
  loadURLs()
  enableURLBtn();
  toggleTableView();
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

$('#urls-table').on('click', '.short-url-link', (e) => {
  updateVisitCount(e.target.id)
})

const updateVisitCount = (urlID) => {
  fetch(`/${urlID}`, {
    method: 'PUT',
  })
}

const enableURLBtn = () => {
  console.log(activeFolder);
  const btn = $('#shorten-url-btn');
  if(activeFolder) {
    return btn.attr('disabled', false)
  } else {
    return btn.attr('disabled', true)
  }
}

const toggleFolderBtn = (e) => {
  const btn = $('#create-folder-btn');
  e.target.value ? btn.attr('disabled', false) : btn.attr('disabled', true);
}

$('#new-folder').on('keyup', (e) => {
  toggleFolderBtn(e);
})
