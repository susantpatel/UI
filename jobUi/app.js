const gifButton = document.getElementsByClassName('button_gif')[0];
const modal = document.querySelector('.modal');
const span = document.querySelector('.close');
const gifbox = document.querySelector('.gifbox');
const gifBoxLoading = document.querySelector('.gifBoxLoading');
const userEntered = document.querySelector('.userEntered');
const gifInput = document.querySelector('.gifSearchInput');
const gifInputSearchbutton = document.querySelector('.gifinputsearchbutton');
const buttonEnter = document.querySelector('.button_enter');
const inputField = document.querySelector('#input-Field');

gifButton.addEventListener('click', () => {
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=MjHjK3nrUtrmZINvxAK2ZgNjRQpu6aVT&limit=25&rating=g`
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      gifBoxLoading.style.display = 'none';
      data.data.forEach((item) => {
        const img = document.createElement('img');
        img.src = `${item.images.fixed_height_small.url}`;
        img.classList.add('gifboximage');
        gifbox.appendChild(img);
        img.onclick = function () {
          gifbox.innerHTML = '';
          modal.style.display = 'none';
          userEntered.appendChild(img);
          window.scrollTo(0, document.body.scrollHeight);
          img.removeEventListener('click', null);
        };
      });
    });
});

gifInputSearchbutton.addEventListener('click', () => {
  gifbox.innerHTML = `<p class='gifBoxLoading'>fetching</p>`;
  const searchedTerm = gifInput.value;
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=MjHjK3nrUtrmZINvxAK2ZgNjRQpu6aVT&q=${searchedTerm}&limit=25&offset=0&rating=g&lang=en`
  )
    .then((data) => {
      gifInput.value = '';
      return data.json();
    })
    .then((data) => {
      gifbox.innerHTML = '';
      data.data.forEach((item) => {
        const img = document.createElement('img');
        img.src = `${item.images.fixed_height_small.url}`;
        img.classList.add('gifboximage');
        gifbox.appendChild(img);
        img.onclick = function () {
          modal.style.display = 'none';
          userEntered.appendChild(img);
          window.scrollTo(0, document.body.scrollHeight);
        };
      });
    });
});

buttonEnter.addEventListener('click', () => {
  const EnteredText = inputField.value;
  if (!EnteredText) {
    return;
  }
  const para = document.createElement('p');
  para.classList.add('paraText');
  para.innerHTML = `${EnteredText}`;
  userEntered.appendChild(para);
  inputField.value = '';
  window.scrollTo(0, document.body.scrollHeight);
});

inputField.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const EnteredText = inputField.value;
    if (!EnteredText) {
      return;
    }
    const para = document.createElement('p');
    para.classList.add('paraText');
    para.innerHTML = `${EnteredText}`;
    userEntered.appendChild(para);
    inputField.value = '';
    window.scrollTo(0, document.body.scrollHeight);
  }
});

span.onclick = function () {
  gifbox.innerHTML = '';
  modal.style.display = 'none';
};
window.onclick = function (event) {
  if (event.target == modal) {
    gifbox.innerHTML = '';
    modal.style.display = 'none';
  }
};
