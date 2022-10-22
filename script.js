let container = document.getElementById("container");
let api_key = `240c5ccb3ce3bf4f257d0acb12a7daff`;
let url = `https://gnews.io/api/v4/top-headlines?token=${api_key}`;
let timerId;
function debounce(func, delay) {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(function () {
        func();
    }, delay);
}

async function main() {
    try {
        let data = await searchInput();
        if (!data) {
            return false;
        }
        console.log(data)
        displayData(data.data);
    } catch (err) {
        console.log(err);
    }
}

async function searchInput(){
    let query = document.getElementById('SearchBox').value;

    let data = await axios.get(`https://gnews.io/api/v4/search?q=${query}&token=${api_key}`)

    return data;

}


async function getData(data) {

  try {

    let data = await axios({
      method: 'get',
      url: url,
      // responseType: 'stream'
    })
    console.log(data);
    displayData(data.data);
  } catch (err) {
    console.log(err);
  }
}
getData();

function displayData(data) {
  document.getElementById('container').innerText='';
  var arr = data.articles;
  arr.forEach(function (article) {

    let newsitems = document.createElement("div");

    let img = document.createElement("img");
    img.src = article.image;
    let title = document.createElement("h4");
    title.textContent = article.title;
    let author = document.createElement("p");
    author.textContent = article.author;

    newsitems.append(img, author, title);
    container.append(newsitems);
  });
}