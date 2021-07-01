import * as add from './addProject.js'
import * as edit from './editProject.js'
const CREATEAREAMODAL = 'modal-create-area'
const CHANGEAREAMODAL = 'modal-change-area'
const CREATEROOMMODAL = 'modal-create-room'
const CHANGEROOMMODAL = 'modal-change-room'
const CLOSEMODAL = 'close-modal'
const OPENREQUEST = 'open-request'

let workData = {
    target: null,
    inputs: []
}

let store = {
    'createArea': (data) => {
        const drowNewArea = (data) => {
            let area = document.createElement('div')
            area.classList.add('area')
            area.draggable = true
            area.innerHTML = `<p data-pk="new" data-eng="${data.engTitle}">${data.title}</p><small>${data.value} м²</small><a class="change modal-btn" data-action="${CHANGEAREAMODAL}" href="#">Изменить</a> <a class="change action-btn" data-action="removeArea" href="#">Удалить</a>`
            document.querySelectorAll('.areas .areas-grid')[0].prepend(area)
            add.setAreas()
            reRenderModalBtns()
            reRenderActionsBtns()
            edit.change.areas.changes.push(edit.changeItem(
                'createArea',
                {
                    name_ru: data.title,
                    name_eng: data.engTitle,
                    area_value: data.value
                }
            ))
            document.querySelectorAll('.areas .areas-grid .area').forEach((element, i) => {
                element.dataset.sort = i + 1
            });


        }

        let counter = 0
        data.inputs.forEach(el => {
            counter += (el.value) ? 1 : 0
            //console.log(el.dataset)
        })
        
        if (counter >= data.inputs.length) {
            //alert('Успешно!')
            drowNewArea({
                title: data.inputs[0].value,
                engTitle: data.inputs[1].value,
                value: data.inputs[2].value
            })
        } else {
            console.log({
                title: data.inputs[0].value,
                engTitle: data.inputs[1].value,
                value: data.inputs[2].value
            })
        }

        closeModalWithData()
    },
    'changeArea': (data) => {
        data.target.querySelector('p').innerHTML = data.inputs[0].value
        data.target.querySelector('small').innerHTML = data.inputs[2].value + ' м²'
        data.target.querySelector('p').dataset.eng = data.inputs[1].value
        edit.change.areas.changes.push(edit.changeItem(
            'changeArea',
            {
                pk: Number(data.target.querySelector('p').dataset.pk),
                name_ru: data.inputs[0].value,
                name_eng: data.inputs[1].value,
                area_value: data.inputs[2].value,
            }
        ))
        closeModalWithData()
    },
    'removeArea': (data, target) => {
        console.log(target)
        var isAdmin = confirm("Удалить комнату?")

        if ((!isNaN(Number(target.parentNode.querySelector('p').dataset.pk)))&&isAdmin) {
            edit.change.areas.changes.push(edit.changeItem(
                'removeArea',
                {
                    pk: Number(target.parentNode.querySelector('p').dataset.pk)
                }
            ))
        }
        target.parentNode.remove()

    },
    'createRoom': (data) => {
        const drowNewRoom = (data) => {
            let room = document.createElement('div')
            room.classList.add('room')
            room.draggable = true
            room.innerHTML = data.img.outerHTML + '<p class="title" data-pk="new"  data-eng="'+data.engTitle+'">' + data.title + '</p>' +
                '<div class="text" data-eng="'+ data.engText+'" >' + data.ruText +
                '</div>' +
                '<div class="controls"> \
                <a class="change modal-btn" data-action="modal-change-room" href="#">Изменить</a> \
                <a class="change action-btn" data-action="removeRoom" href="#">Удалить</a> \
            </div>'

            document.querySelectorAll('.rooms .rooms-grid')[0].prepend(room)
            room.querySelector('img').addEventListener('mouseover',()=> {
                room.querySelector('.text').classList.add('up')
            })
            room.querySelector('img').addEventListener('mouseleave',()=> {
                room.querySelector('.text').classList.remove('up')
            })
            add.setRooms()
            reRenderModalBtns()
            reRenderActionsBtns()
            document.querySelectorAll('.rooms-grid .room').forEach((element, i) => {
                element.dataset.sort = i + 1
            });
        }
        //console.log('New room validation')
        console.log(data.inputs)
        if (data.inputs.length >= 5) {
            console.log('ok')
            //console.log(data[4].parentNode.querySelector('img'))
            drowNewRoom({
                //imgFile: data[4].files[0],
                img: data.inputs[4].parentNode.querySelector('img'),
                title: data.inputs[0].value,
                engTitle: data.inputs[1].value,
                ruText: data.inputs[2].value,
                engText: data.inputs[3].value
            })
            edit.change.rooms.changes.push(edit.changeItem(
                'createRoom',
                {
                    img: data.inputs[4].parentNode.querySelector('img').src,
                    title: data.inputs[0].value,
                    engTitle: data.inputs[1].value,
                    ruText: data.inputs[2].value,
                    engText: data.inputs[3].value
                }
            ))
        }
        closeModalWithData()
    },
    'changeRoom': (data) => {
        function toDataURL(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }


        const drowOldRoom = (data) => {
            //console.log(data)
            let picture = workData.target.querySelector('img')
            workData.target.querySelector('p.title').innerHTML = data.title
            workData.target.querySelector('div.text').innerHTML = data.ruText
            workData.target.querySelector('p.title').dataset.eng = data.engTitle
            workData.target.querySelector('div.text').dataset.eng = data.engText
            picture.src = data.img

            add.setRooms()
            reRenderModalBtns()
            reRenderActionsBtns()
        }
        if (data.inputs.length == 6) {
            console.log('ok')
            drowOldRoom({
                img: data.inputs[5].img.src,
                title: workData.inputs[0].value,
                engTitle: workData.inputs[1].value,
                ruText: workData.inputs[2].value,
                engText: workData.inputs[3].value
            })
            edit.change.rooms.changes.push(edit.changeItem(
                'changeRoom',
                {
                    img: data.inputs[5].img.src,
                    title: workData.inputs[0].value,
                    engTitle: workData.inputs[1].value,
                    ruText: workData.inputs[2].value,
                    engText: workData.inputs[3].value,
                    pk: data.target.querySelector('p').dataset.pk
                }
            ))
        }
        closeModalWithData()
    },
    'removeRoom': (data, target) => {
        console.log(target)
        edit.change.rooms.changes.push(edit.changeItem(
            'removeRoom',
            {
                pk: target.parentNode.parentNode.querySelector('p').dataset.pk
            }
        ))
        var isAdmin = confirm("Удалить ракурс?")
        if (isAdmin) {
            target.parentNode.parentNode.remove()
        }
        document.querySelectorAll('.rooms-grid .room').forEach((element, i) => {
            element.dataset.sort = i + 1
        });
    },

}


const closeModalWithData = () => {

    let data = {}
    data.action = CLOSEMODAL
    modal(data)
}

const modalNode = document.querySelector('.modal')
const overlay = document.querySelector('#overlay')
const modalTitle = modalNode.querySelector('h2')
const modalActionBtn = modalNode.querySelector('a.btn')

const reRenderModalBtns = () => {
    let modalBtns = document.querySelectorAll('.modal-btn')
    modalBtns.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
            let data = {}
            data.target = e.target
            data.action = e.target.dataset.action
            modal(data)
        })
    });
    return modalBtns
}

const reRenderActionsBtns = () => {
    let actionBtns = document.querySelectorAll('.action-btn')
    actionBtns.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
            let a = e.target.dataset.action.toString()
            store[a](workData, e.target)
        })
    });
    return actionBtns
}
const reRenderImgInputs = () => {

    let imgInputs = document.querySelectorAll('input[type=file]')
    imgInputs.forEach(el => {
        el.addEventListener('change', (el) => {

            let previewImg = el.target.files[0]
            let reader = new FileReader();
            let preview = el.target.parentNode.querySelector('img')
            reader.onloadend = function () {
                preview.src = reader.result;
            }
            if (previewImg) {
                reader.readAsDataURL(previewImg);
            } else {
                preview.src = "";
            }
        })
    });
}

const modal = (data) => {
    workData = {
        target: null,
        inputs: []
    }
    modalNode.querySelectorAll('.body').forEach(el => el.remove())
    modalNode.classList.add('active')
    document.querySelector('body').classList.add('freeze')
    document.querySelector('html').classList.add('freeze')
    overlay.classList.add('active')
    let nodeBody = document.createElement('div')
    nodeBody.classList.add('body')
    let title, body
    switch (data.action) {
        case CREATEAREAMODAL:
            title = 'Добавить площадь'
            body = ' <article>\
                        <label></label>\
                        <span>RU</span>\
                        <span>ENG</span>\
                        </article>\
                        <article>\
                            <label>Название</label>\
                            <input data-name="ruTitle" type="text">\
                            <input data-name="engTitle" type="text">\
                        </article>\
                        <article>\
                            <label>Значение в м²:</label>\
                            <input data-name="value"type="number">\
                        </article>'

            modalTitle.innerHTML = title
            // nodeBody.dataset.action = data.action
            nodeBody.innerHTML = body
            modalNode.append(nodeBody)
            modalActionBtn.dataset.action = 'createArea'
            modalActionBtn.innerHTML = 'Создать'

            modalNode.querySelectorAll('article input').forEach((item) => {
                workData.inputs.push(item)
            })
            break;
        case CHANGEAREAMODAL:
            let ruTitle = data.target.parentNode.querySelector('p').innerHTML
            let engTitle = data.target.parentNode.querySelector('p').dataset.eng
            let value = Number(data.target.parentNode.querySelector('small').innerHTML.replace(/\D+/g, "")) //+"a4r t 4r43 43a b345b 123 cc gaeg4"
            title = 'Изменить площадь'
            body = ' <article>\
                        <label></label>\
                        <span>RU</span>\
                        <span>ENG</span>\
                        </article>\
                        <article>\
                            <label>Название</label>\
                            <input data-name="ruTitle" type="text" value="' + ruTitle + '">\
                            <input data-name="engTitle" type="text" value="' + engTitle + '">\
                        </article>\
                        <article>\
                            <label>Значение в м²:</label>\
                            <input data-name="value"type="number" value="' + value + '">\
                        </article>'

            modalTitle.innerHTML = title
            // nodeBody.dataset.action = data.action
            nodeBody.innerHTML = body
            modalNode.append(nodeBody)
            modalActionBtn.dataset.action = 'changeArea'
            modalActionBtn.innerHTML = 'Сохранить'
            workData = {
                target: data.target.parentNode,
                inputs: []
            }
            modalNode.querySelectorAll('article input').forEach((item) => {
                workData.inputs.push(item)
            })

            break;
        case CREATEROOMMODAL:
            title = 'Добавить комнату'
            body = ' <article>\
                        <label></label>\
                        <span>RU</span>\
                        <span>ENG</span>\
                        </article>\
                        <article>\
                            <label>Название</label>\
                            <input data-name="ruTitle" type="text">\
                            <input data-name="engTitle" type="text">\
                        </article>\
                        <article>\
                            <label>Описание</label>\
                            <textarea data-name="ruText" rows="7"></textarea>\
                            <textarea data-name="engText" rows="7"></textarea>\
                        </article>\
                        <article>\
                            <label>Изображение</label>\
                            <picture>\
                                <input type="file" name="room">\
                                <img src=""> \
                            </picture> \
                        </article>\
                       '
            modalTitle.innerHTML = title
            nodeBody.innerHTML = body
            modalNode.append(nodeBody)
            modalActionBtn.dataset.action = 'createRoom'
            modalActionBtn.innerHTML = 'Создать'
            reRenderImgInputs()

            modalNode.querySelectorAll('article input, article textarea').forEach((item) => {
                //console.log(item)
                workData.inputs.push(item)
            })
            break;
        case CHANGEROOMMODAL:
           // let ruTitle = 'Some'
           //console.log(data.target.parentNode.parentNode)
           let RoomRuTitle = data.target.parentNode.parentNode.querySelector('p.title').innerHTML
           let RoomEngTitle = data.target.parentNode.parentNode.querySelector('p.title').dataset.eng
           let RoomRuText = data.target.parentNode.parentNode.querySelector('div.text').innerHTML
           let RoomEngText = data.target.parentNode.parentNode.querySelector('div.text').dataset.eng
           let RoomImg = data.target.parentNode.parentNode.querySelector('img').src
            title = 'Изменить комнату'
            body = ' <article>\
                        <label></label>\
                        <span>RU</span>\
                        <span>ENG</span>\
                        </article>\
                        <article>\
                            <label>Название</label>\
                            <input data-name="ruTitle" type="text" value="'+RoomRuTitle+'">\
                            <input data-name="engTitle" type="text" value="'+RoomEngTitle+'">\
                        </article>\
                        <article>\
                            <label>Описание</label>\
                            <textarea data-name="ruText" rows="7">'+RoomRuText+'</textarea>\
                            <textarea data-name="engText" rows="7">'+RoomEngText+'</textarea>\
                        </article>\
                        <article>\
                            <label>Изображение</label>\
                            <picture>\
                                <input type="file" name="room">\
                                <img src="'+RoomImg+'"> \
                            </picture> \
                        </article>\
                       '
            modalTitle.innerHTML = title
            nodeBody.innerHTML = body
            modalNode.append(nodeBody)
            modalActionBtn.dataset.action = 'changeRoom'
            modalActionBtn.innerHTML = 'Изменить'
            reRenderImgInputs()
            workData.target = data.target.parentNode.parentNode
            modalNode.querySelectorAll('article input, article textarea').forEach((item) => {
                //console.log(item)
                workData.inputs.push(item)
            })
            workData.inputs.push(
                {
                    'img': modalNode.querySelector('article picture img')
                }
            )
            ///  console.log(modalNode.querySelector('article picture img').src.toString())
            //console.log(modalNode.querySelector('article picture img').src)

            break;
        case CLOSEMODAL:
            workData = {
                target: null,
                inputs: []
            }
            document.querySelector('body').classList.remove('freeze')
            document.querySelector('html').classList.remove('freeze')
            document.querySelector('.modal').classList.remove('active')
            document.getElementById('overlay').classList.remove('active')
            setTimeout(() => {
                modalNode.querySelectorAll('.body').forEach(el => el.remove())
                modalTitle.innerHTML = ''
            }, 500)
            break;

        default:
            alert('не заню')
            break;
    }
    return workData
}

document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape) {
        closeModalWithData()
    }
}
document.getElementById('overlay').addEventListener('click', () => {
    closeModalWithData()
})


reRenderActionsBtns()
reRenderModalBtns()
reRenderImgInputs()
export {
    modal,
    reRenderModalBtns,
    reRenderActionsBtns,
    reRenderImgInputs
}