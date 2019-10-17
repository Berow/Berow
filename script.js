
let buttonDay = document.getElementById('buttonDay');
let button5Day = document.getElementById('button5Day');
let tileAncestor = document.getElementById('tileAncestor');
let select = document.getElementById('city_select');
let city_id = 0;

function createCard(data) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + dd + '/' + yyyy;

    let tileParent = document.createElement('div');
    tileParent.classList.add('tile', 'is-12', 'is-parent');

    let tile = document.createElement('div');
    tile.classList.add('tile', 'is-child', 'box');

    let card = document.createElement('div');
    card.classList.add('card', 'is-small');

    let header = document.createElement('header');
    header.classList.add('card-header');

    let titleHeader = document.createElement('p');
    titleHeader.classList.add('card-header-title', 'is-centered', 'is-size-4');
    titleHeader.innerHTML = today + ' ' + data.name;

    let cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    let content = document.createElement('div');
    content.classList.add('content', 'has-text-centered');

    let temp = document.createElement('h2');
    temp.innerHTML = Math.round(data.main.temp - 273) + '&deg';

    let hr1 = document.createElement('hr');
    let hr2 = document.createElement('hr');
    let hr3 = document.createElement('hr');
    let hr4 = document.createElement('hr');

    let cloud = document.createElement('h2');
    cloud.textContent = data.weather[0]['description'];

    let icon = document.createElement('img');
    icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`);

    let pressure = document.createElement('h2');
    pressure.textContent = 'Давление: ' + data.main['pressure'];

    let humidity = document.createElement('h2');
    humidity.textContent = 'Влажность: ' + data.main['humidity'] + '%';

    tileAncestor.appendChild(tileParent);
    tileParent.appendChild(tile);
    tile.appendChild(card);
    card.appendChild(header);
    header.appendChild(titleHeader);
    card.appendChild(cardContent);
    cardContent.appendChild(content);
    content.appendChild(temp);
    content.appendChild(hr1);
    content.appendChild(cloud);
    content.appendChild(hr2);
    content.appendChild(icon);
    content.appendChild(hr3);
    content.appendChild(pressure);
    content.appendChild(hr4);
    content.appendChild(humidity);
}


function create5Card(data) {

    let count = 0;
    let dateCur = new Date();
    let dateNext = new Date()
    let time = '';

    let tileVertical = document.createElement('div');
    tileVertical.classList.add('tile', 'is-12', 'is-vertical');
    tileAncestor.appendChild(tileVertical);

    let tileBox1 = document.createElement('div');
    tileBox1.classList.add('tile', 'is-parent', 'is-vertical', 'box');
    tileVertical.appendChild(tileBox1);

    let tile = document.createElement('div');
    tile.classList.add('tile');
    tileBox1.appendChild(tile);

    for (let i = 0; i < 5; i++) {
        let tileBox2 = document.createElement('div');
        tileBox2.classList.add('tile', 'is-parent', 'is-vertical', 'box');
        tile.appendChild(tileBox2);

        for (let j = 0; j < 8; j++) {

            dateCur = data.list[count].dt_txt.slice(0, 10);
            dateNext = data.list[count + 1].dt_txt.slice(0, 10);
            time = data.list[count].dt_txt.slice(10, 16);

            if (j == 0) {

                let cardH = document.createElement('div');
                cardH.classList.add('card', 'box', 'has-background-grey-lighter');
                tileBox2.appendChild(cardH);

                let headerH = document.createElement('header');
                headerH.classList.add('card-header');
                cardH.appendChild(headerH);

                let titleHeaderH = document.createElement('p');
                titleHeaderH.classList.add('card-header-title', 'is-centered', 'is-size-3', 'has-text-danger');
                titleHeaderH.innerHTML = dateCur;
                headerH.appendChild(titleHeaderH);

            }

            let card = document.createElement('div');
            card.classList.add('card', 'box');
            tileBox2.appendChild(card);

            let header = document.createElement('header');
            header.classList.add('card-header');
            card.appendChild(header);

            let titleHeader = document.createElement('p');
            titleHeader.classList.add('card-header-title', 'is-centered', 'is-size-3', 'has-text-black-ter', 'is-family-code');
            titleHeader.innerHTML = time;
            header.appendChild(titleHeader);

            let cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            card.appendChild(cardContent);

            let content = document.createElement('div');
            content.classList.add('content', 'has-text-centered');
            cardContent.appendChild(content);

            let temp = document.createElement('h2');
            temp.innerHTML = Math.round(data.list[count].main.temp - 273) + '&deg';
            content.appendChild(temp);

            let hr1 = document.createElement('hr');
            content.appendChild(hr1);

            let cloud = document.createElement('h2');
            let condition = data.list[count].weather[0]['description'];          

            if (condition.length < 12) {
                condition += '<br> &nbsp';
            }

            cloud.innerHTML = condition;
            content.appendChild(cloud);

            let hr2 = document.createElement('hr');
            content.appendChild(hr2);

            let icon = document.createElement('img');
            icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[count].weather[0]['icon']}@2x.png`);
            content.appendChild(icon);

            if (dateCur != dateNext) {
                j = 8;
            }

            count++;
        }
    }
}


buttonDay.onclick = () => {
    city_id = select.options[select.selectedIndex].getAttribute('data_id');

    while (tileAncestor.firstChild) {
        tileAncestor.removeChild(tileAncestor.firstChild);
    }
    buttonDay.classList.add('is-loading');
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${city_id}&APPID=be3be6a75c756c0592803d5d8d6f3f3a`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            createCard(data);
            buttonDay.classList.remove('is-loading');
        })
        .catch(function () {

        })
}

button5Day.onclick = () => {
    city_id = select.options[select.selectedIndex].getAttribute('data_id');

    while (tileAncestor.firstChild) {
        tileAncestor.removeChild(tileAncestor.firstChild);
    }
    button5Day.classList.add('is-loading');
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&APPID=be3be6a75c756c0592803d5d8d6f3f3a`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            create5Card(data);
            button5Day.classList.remove('is-loading');
        })
        .catch(function () {

        })
}