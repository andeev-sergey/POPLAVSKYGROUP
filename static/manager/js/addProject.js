// Драг и дроп

import * as master from './managerMaster.js'


let dragSrcEl = null;

function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    //console.log(e.target)
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if ((dragSrcEl != this) && (this.classList[0] == dragSrcEl.classList[0])) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    master.reRenderModalBtns()
    master.reRenderActionsBtns()
    items.forEach(function (item) {
        item.classList.remove('over');
    });
    roomsItems.forEach(function (item) {
        item.classList.remove('over');
    });
}
let items = document.querySelectorAll('.areas-grid .area:not(.add)');
export const setAreas = () => {
    items = document.querySelectorAll('.areas-grid .area:not(.add)');

    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}
setAreas()

let roomsItems = document.querySelectorAll('.rooms-grid .room:not(.add)');

export const setRooms = () => {
    roomsItems = document.querySelectorAll('.rooms-grid .room:not(.add)');
    roomsItems.forEach(function (item) {

        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}
setRooms()
/// Отрисовка превью проекта

// Отрисовка названия
if(document.querySelector('#projectTitle')) {
    document.querySelector('#projectTitle').addEventListener('keyup', (e) => document.querySelector('h1').innerHTML = e.target.value)

}
const saveBtn = document.getElementById('save')
if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
    if (e.preventDefault) {
        e.preventDefault();
    }
    const getAreas = (() => {
        return Array.from(document.querySelector('.areas-grid').querySelectorAll('.area:not(.add)')).map(el => ({
            'ruTitle': el.querySelector('p').innerHTML,
            'engTitle': el.querySelector('p').dataset.eng,
            'value': parseInt(el.querySelector('small').innerHTML.replace(/[^\d]/g, '')),
            'sort': el.querySelector('p').dataset.sort
        }))
    })()
    const getRooms = (() => {
        function dataURLtoFile(dataurl, filename) {
           let image =  new Image()
           image.src = dataurl  
           return image
        }
        return Array.from(document.querySelector('.rooms-grid').querySelectorAll('.room:not(.add)')).map(el => ({
            'ruTitle': el.querySelector('p.title').innerHTML,
            'engTitle': el.querySelector('p.title').dataset.eng,
            'ruText': el.querySelector('div.text').innerHTML,
            'engText': el.querySelector('div.text').dataset.eng,
            'img': el.querySelector('img').src,
            'sort': el.dataset.sort
        }))

    })()
    let previewImg = document.getElementById('previewOutput').src
    let category = document.querySelector('.category select option:checked').innerHTML
    let title = [
        document.getElementById('projectTitle').value,
        document.getElementById('projectTitle').parentNode.querySelector('input:not(#projectTitle)').value
    ]
    let plan = document.getElementById('planOutput').src
    let shortDescription = [
        document.querySelector('article.shortDescription').querySelectorAll('textarea')[0].value,
        document.querySelector('article.shortDescription').querySelectorAll('textarea')[1].value
    ]
    let description = [
        document.querySelector('article.description').querySelectorAll('textarea')[0].value,
        document.querySelector('article.description').querySelectorAll('textarea')[1].value
    ]

    let price = [
        document.querySelector('article.price').querySelectorAll('input')[0].value,
        document.querySelector('article.price').querySelectorAll('input')[1].value
    ]

    let year =
        document.getElementById('year').querySelector('option:checked').innerHTML


    let style = [
        document.querySelector('article.style').querySelectorAll('input')[0].value,
        document.querySelector('article.style').querySelectorAll('input')[1].value
    ]

    let location = [
        document.querySelector('article.location').querySelectorAll('input')[0].value,
        document.querySelector('article.location').querySelectorAll('input')[1].value
    ]
    let seo = document.querySelector('article.seo').querySelector('textarea').value
    let saveData = {
        'title': {
            'ru': title[0],
            'eng': title[1]
        },
        'preview': (previewImg.includes('manager/add-project')) ? null : previewImg,
        'plan': (plan.includes('manager/add-project')) ? null : plan,
        'category': category,
        'short_description': {
            'ru': shortDescription[0],
            'eng': shortDescription[1]
        },
        'description': {
            'ru': description[0],
            'eng': description[1]
        },
        'price': {
            'ru': price[0],
            'eng': price[1]
        },
        'year': year,
        'style': {
            'ru': style[0],
            'eng': style[1]
        },
        'location': {
            'ru': location[0],
            'eng': location[1]
        },
        'seo': seo,
        'rooms': getRooms,
        'areas': getAreas,

    }



    $.ajax({
        type: "POST",
        url: 'http://' + window.location.host.toString() + "/manager/add-project/post",
        data: {
            data: JSON.stringify(saveData),
            csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value
        },
        success: function (data) {
            alert(data)
        }
    });
})
}

// Отправка Запроса к бэку

export const addProject = () => {
    const getProjectData = () => {
        return 'data'
    }
}