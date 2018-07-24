class UI {
    constructor() {
        this.container = document.querySelector('.news-container .container .row');
        this.header = document.querySelector('header');
    }

  addNews(news, index) {
    const template = `
      <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                  <button data-index="${index}" class="waves-effect waves-light btn add-favorite">Add favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

    addFavoriteNews(news, id) {
    const template = `
      <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                  <button data-id="${id}" class="waves-effect waves-light red darken-1 btn remove-favorite">Revove favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }


    clearContainer() {
        if(this.container) {
            this.container.innerHTML = '';
        }
    }

  showLoader() {
    this.clearContainer();

    const template = `
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

  showInfo(msg) {
    this.clearContainer();

    const template = `
      <div class="card blue lighten-4">
        <div class="card-content">
            <p>${msg}</p>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

    showError(msg) {
        this.clearContainer();

        const template = `   
          <div class="container error-card">         
            <div class="card red lighten-1">
                <div class="card-content">
                    <span class="card-title">Error:</span>
                    <p>${msg}</p>
                </div>
            </div>
          </div>               
         `;

        this.header.insertAdjacentHTML("beforeend", template);
        setTimeout(function () {
            document.querySelector('.error-card').remove();
        }, 4000);
    }
}