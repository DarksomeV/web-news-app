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


// по загрузке страницы получить все новости избранные
window.addEventListener("load", onLoad);

//Init elements
const newsContainer = document.querySelector('.news-container');
const logout = document.querySelector('.logout');

// All events
newsContainer.addEventListener("click", removeFavorite);
logout.addEventListener("click", onLogout);

function onLoad(e) {
    // получить избранные новости
    news.getFavoriteNews()
        .then(favoriteNews => {            
            favoriteNews.forEach((doc) => {
                console.log(`${doc.id}`);
                console.dir(doc.data());
                // выводим в разметку
                ui.addFavoriteNews(doc.data(), doc.id);
            });
        })
        .catch(err => {
            console.log(error);
        })
}

function removeFavorite(e) {
    if (e.target.classList.contains("remove-favorite")) {
        M.toast({html: 'Deleted from Favorite!'});
        news.removeFavoriteNews(e.target.dataset.id)
    .then(() => {
        e.target.closest('.card').remove();
    if (!newsContainer.innerText) ui.showInfo('No favorite news.');
    })
}
}

function onLogout() {
    auth.logout()
        .then(() => window.location = 'login-start.html')
        .catch(err => console.log(err));
}

