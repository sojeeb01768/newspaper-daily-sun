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

loadNewsCategory();