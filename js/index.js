// category data load secsion

const loadNewsCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(response => response.json())
    .then(data => displayNewsCategory(data.data.news_category))
    .catch(error => console.log(error));

}
// category list display section

const displayNewsCategory = (catagories) => {

  // console.log(catagories);

  const categorydata = document.getElementById('category-list');

  catagories.forEach(category => {
    // console.log(category.category_name); 

    const list = document.createElement('div')
    list.innerHTML = `
    
        <button id="category-list"  onclick=" loadNews('${category.category_id}')" class="btn list-group list-group-item m-2  g-5 text-black-50 fs-5">${category.category_name}</button>
        `
    categorydata.appendChild(list)
  })

}



// load news section 

const loadNews = async (newsId) => {
  // loader on 




  loader(true);

  const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.data);
  }
  catch (error) {
    console.log(error)
  }

}

// display news section 



const displayNews = allNews => {








  // sorting 

  allNews.sort((x, y) => {
    return y.total_view - x.total_view
  });

  // Data found section 
  const foundData = document.getElementById('found-data');
  if (allNews.length !== 0) {

    foundData.innerHTML = `
    <h4 class= text-center>There are ${allNews.length} data In category</h4>
    `
  }
  else {
    foundData.innerHTML = `
    <h5 class="text-center"> No news found</h5>
    `
  }

  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ``;



  allNews.forEach(news => {



    const newsDiv = document.createElement('div');

    newsDiv.innerHTML = `
        <div class="card mb-3" style="max-width:100;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${news.image_url}" class="img-fluid rounded" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${news.title}</h5>
                      <p class="card-text">${news.details.slice(0, 300) + '...'}</p>
                      <div class="d-flex justify-content-between">
                         <div class="d-flex">
                         <img class="img-fluid rounded-5 me-2 " style="width:30px ; height:30px ;" src="${news.author.img}" alt="">
                         <p>${news.author.name ? news.author.name : 'no name'}</p>
                         </div>
                        <p><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : '0'} M</p>
                        <p>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        </p>
                       
                       <div>
                       <button onclick="showModal('${news.title}','${news.image_url}','${news.author.name}','${news.author.published_date}','${news.author.img}','${news.total_view}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                       <i class="fa-solid fa-arrow-right-long"></i>
                     </button>
                       </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
        `
    newsContainer.appendChild(newsDiv);

  })




  // loader off 

  loader(false);

}


loadNews();
loadNewsCategory();