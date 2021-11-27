//Добавление комментария
let comments = [];

document.getElementById('formSubmit').onclick = function () {
  let formName = document.getElementById('formName');
  let formMessage = document.getElementById('formMessage');

  let comment = {
    name: formName.value,
    message: formMessage.value,
    time: Math.floor(Date.now() / 1000)
  }

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('sending');
      let response = await fetch('comment.json', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.innerHTML = '';
        form.reset();
        form.classList.remove('sending');
      } else {
        alert("Ошибка!");
        form.classList.remove('sending');
      } 
    }else {
      alert('Заполните обязательные поля!');
    }
  }

  formName.value = '';
  formMessage.value = '';
  comments.push(comment);

  saveComments();
}

function saveComments() {
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  showComments();
}

function showComments() {
  document.getElementById('header_btn').onclick = function () {
    let commentsField = document.getElementById('header_field');
    let out = '';
    comments.forEach(function (item) {
      out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
      out += `<p class="alert alert-name">${item.name}</p>`;
      out += `<p class="alert alert-comment">${item.message}</p>`;
    });
  }
  commentsField.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
  let newDate = new Date(UNIX_timestamp * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let year = newDate.getFullYear();
  let month = months[newDate.getFullYear()];
  let date = newDate.getDate();
  let hour = newDate.getHours();
  let min = newDate.getMinutes();
  let sec = newDate.getSeconds();
  let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

/*

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
*/
