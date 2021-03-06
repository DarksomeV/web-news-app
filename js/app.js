// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "2e6dc33b3f184a6db04ec92b5013dad7";
//Init Auth
const auth = new Auth();
// // Init favorite news
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();



// Init elements
const select = document.getElementById("country");
const selectSources = document.getElementById("newsSource");
const selectCategory = document.getElementById("category");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const logout = document.querySelector('.logout');
const newsContainer = document.querySelector('.news-container');

// All events
select.addEventListener("change", onChangeCountryAndCategory);
selectCategory.addEventListener("change", onChangeCountryAndCategory);
selectSources.addEventListener("change", onChangeSources);
searchBtn.addEventListener("click", onSearch);
logout.addEventListener("click", onLogout);
newsContainer.addEventListener("click", addFavorite);
newsContainer.addEventListener("click", removeFavorite);

// Check auth state
firebase.auth().onAuthStateChanged(function (user) {
   if (!user) {
    window.location = 'login-start.html';
    }
});
// Event handlers

//через промисы
function onChangeCountryAndCategory(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`)
        .then(data => {
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            data.articles.forEach((news, index) => ui.addNews(news, index));
            // сохраняем новости в хранилище news-store
            newsStore.setNews(data.articles); 
        })
        .catch(err => {
            ui.showInfo(`Новости по стране ${select.value} ${select.value !== '' ? ' и по данной категории' : ''}  не найдены`);
        });
}



//через промисы
function onChangeSources(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранным источникам
    http.get(`https://newsapi.org/v2/top-headlines?sources=${selectSources.value}&apiKey=${apiKey}`)
        .then(data => {
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            data.articles.forEach((news, index) => ui.addNews(news, index));
            // сохраняем новости в хранилище news-store
            newsStore.setNews(data.articles); 
        })
        .catch(err => {
            // Выводим ошибку
            ui.showError(err);
        });
}


//через промисы
function onSearch(e) {
    // Делаем запрос на получение новостей по тому что введено в инпут

    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
        .then(data => {
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            data.articles.forEach((news, index) => ui.addNews(news, index));
            // сохраняем новости в хранилище news-store
            newsStore.setNews(data.articles); 
        })
        .catch(err => {
            ui.showError(err);
            ui.showInfo("По вашему запросу новостей не найдено!");
        });
}

function onLogout() {
    auth.logout()
        .then(() => window.location = 'login-start.html')
        .catch(err => console.log(err));
}

function addFavorite(e) {
  if (e.target.classList.contains("add-favorite")) {
    M.toast({html: 'Added to Favorite!'});
    const index = e.target.dataset.index;
    const oneNews = newsStore.getNews()[index];
    news.addFavoriteNews(oneNews)
      .then(data => {
        // вывести сообщение что новость добавлена успешно
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  }
}

function removeFavorite(e) {
    if (e.target.classList.contains("remove-favorite")) {
        M.toast({html: 'Deleted from Favorite!'});
        news.removeFavoriteNews(e.target.dataset.id)
    .then(() => {
        e.target.closest('.card').remove();
    // if (!newsContainer.innerText) ui.showInfo('Немає збережених новин.');
    })
}
}



// Отдельный запрос на получение ресурсов
// генерируем селект с ресурсами
// <option value="abc-news">Abc News</option>
// при выборе ресурса подгружаете новости с этим ресурсом
// возможность выбора новостей по категории и стране
// Если новостей нет по выбранной категоррии нужно вывести что "Новости по категории такой то по стране такойто не найдены"