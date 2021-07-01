
const openRequest = 'open-request'
const closeModal = 'close-modal'

const modalNode = document.querySelector('.modal')
const overlay = document.querySelector('#overlay')
const modalTitle = modalNode.querySelector('h2')
const modalActionBtn = modalNode.querySelector('a.btn')


const modalR = (data) => {
    modalNode.classList.add('active')
    overlay.classList.add('active')
    let nodeBody = document.createElement('div')
    nodeBody.dataset.action = data.action
    nodeBody.classList.add('body')
    switch (data.action) {
        case openRequest:
            let title = 'Добавить площадь'
            let options = Array.from(data.target.querySelectorAll('span')).map(el=> el.innerHTML)
            let insertStatus = (data.target.dataset.status == 'true') ? ' <input type="checkbox" id="scales" name="scales">' : 'Обработан'
            let body = '<article>\
                    <label>Имя:</label>\
                    <span>'+options[0]+'</span>\
                 </article>\
                 <article>\
                        <label>Телефон:</label>\
                        <a href="tel:'+options[1]+'">'+options[1]+'</a>\
                 </article>\
                 <article>\
                        <label>e-mail:</label>\
                        <a href="'+options[2]+'">'+options[2]+'</a>\
                 </article>\
                 <article>\
                        <label>Отправлено:</label>\
                        <span>'+options[3]+'</span>\
                 </article>\
                 <article>\
                        <label>Заявка из:</label>\
                        <span>'+options[4]+'</span>\
                 </article>\
                 <article>\
                        <label>Статус обработки:</label>\
                        <span> \
                        ' + insertStatus + '\
                        </span>\
                 </article>\
                 '

            modalTitle.innerHTML = title
            // nodeBody.dataset.action = data.action
            nodeBody.innerHTML = body
            modalNode.append(nodeBody)
            modalActionBtn.innerHTML = 'Изменить'
            modalActionBtn.style.opacity = '.5'
            modalActionBtn.style.pointerEvents = 'none'
            document.getElementById('scales').addEventListener('change', () => {
                if (document.getElementById('scales').checked) {
                    modalActionBtn.dataset.action = 'changeRequestStatus'
                    modalActionBtn.style.opacity = '1'
                    modalActionBtn.style.pointerEvents = 'all'
                }
             })
            modalActionBtn.addEventListener('click',e => {
                const post = {
                    pk: data.target.dataset.pk,
                    value: (document.getElementById('scales').checked) ? 'True': ''
                }
                e.preventDefault()
                //console.log(post)
                $.ajax({
                    type: "POST",
                    url: 'http://' + window.location.host.toString() + "/manager/edit-request",
                    data: {
                        data: JSON.stringify(post),
                        csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value
                    },
                    success: function (data) {
                        console.log(data)
                        setTimeout(() => {
                            document.location.reload();
                        },500)
                    }
                });
            })
            break;
        case closeModal:
            modalNode.classList.remove('active')
            overlay.classList.remove('active')
            modalNode.querySelector('.body').remove()
        default:
            console.log('dont know')
            break;
    }

}
const filterBtns = document.querySelectorAll('.tabs .tab')
let requests = document.getElementById('requestTable').querySelectorAll('.request')

requests.forEach(r=> {
    r.style.display = (r.dataset.status == 'true' ) ? 'grid' : 'none'
    r.addEventListener('click',evt => {
       // console.log(evt.target)
        modalR({
            target: r,
            action: openRequest
        })
    })
})


filterBtns.forEach(el => {
    el.addEventListener('click', evt => {
        let type = evt.target.dataset.filter
        filterBtns.forEach(el => el.classList.remove('active'))
        el.classList.add('active')
        requests.forEach(r => {
            r.style.display = (r.dataset.status == type ) ? 'grid' : 'none'
        })
    })
})

overlay.addEventListener('click', () => {
    modalR({
        target: null,
        action: closeModal
    })
})