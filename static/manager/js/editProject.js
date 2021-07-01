const sortAreas = () => {
    return Array.from(document.querySelectorAll('.areas .areas-grid .area:not(.add)'))
       .map((el, i)=> {
       return {
           pk: el.querySelector('p').dataset.pk,
           sort: i + 1,
       }
    })
}
const sortRooms = ()=> {
    return Array.from(document.querySelectorAll('.rooms-grid .room:not(.add)'))
        .map((el, i)=> {
            return {
                pk: el.querySelector('p').dataset.pk,
                sort: i + 1,
        }
    })
}


export const changeItem = (type, value) => {
    return {
        type: type,
        value: value
    }
}

export const change = {
    projectPk: null,
    changes: [],
    areas: {
        sorting: [],
        changes: []
    },
    rooms: {
        changes: [], // add, edit or remove
        sorting: sortRooms() // sorting
    },
}


let preview = document.getElementById('preview')
if (preview) {
    let plan = document.getElementById('plan')
    let year = document.getElementById('year')
    let category = document.querySelector('.category select')
    let fields = [
        //document.querySelector('.category select'), // категория
        document.getElementById('projectTitle'), //
        document.getElementById('projectTitle').parentNode.querySelector('input:not(#projectTitle)'),
        document.querySelector('article.shortDescription').querySelectorAll('textarea')[0],
        document.querySelector('article.shortDescription').querySelectorAll('textarea')[1],
        document.querySelector('article.description').querySelectorAll('textarea')[0],
        document.querySelector('article.description').querySelectorAll('textarea')[1],
        document.querySelector('article.price').querySelectorAll('input')[0],
        document.querySelector('article.price').querySelectorAll('input')[1],
        document.querySelector('article.style').querySelectorAll('input')[0],
        document.querySelector('article.style').querySelectorAll('input')[1],
        document.querySelector('article.location').querySelectorAll('input')[0],
        document.querySelector('article.location').querySelectorAll('input')[1],
        document.querySelector('article.seo').querySelector('textarea')
    ]


preview.addEventListener('change', () => {
    let a = false
    change.changes.forEach(i => {
        if (i.type == 'preview') {
            i.value = preview.parentNode.querySelector('img').src
            a = true
        }
    })
    if (!a){
        setTimeout(()=> {
            change.changes.push(changeItem(
                'preview',
                preview.parentNode.querySelector('img').src
            ))
        },50)
    }
})
plan.addEventListener('change', () => {
    let a = false
    change.changes.forEach(i => {
        if (i.type == 'plan') {
            i.value =  document.getElementById('planOutput').src
            a = true
        }
    })
    if (!a) {
        setTimeout(()=>{
            change.changes.push(changeItem(
                'plan',
                document.getElementById('planOutput').src
            ))
        },50)
    }

})
fields.forEach(el => {
    el.addEventListener("change", ()=> {
        let a = false
        change.changes.forEach(i => {
            if (i.type == el.dataset.change) {
                i.value = el.value
                a = true
            }
        })
        if (!a) {
            change.changes.push(changeItem(
                el.dataset.change,
                el.value
            ))
        }
    })
})

year.addEventListener("change", (e)=> {
    let a = false
    change.changes.forEach(i => {
        if (i.type == 'year') {
            i.value = e.target.value
            a = true
        }
    })
    if (!a) {
        change.changes.push(changeItem(
            'year',
            e.target.value
        ))
    }
})
category.addEventListener("change", (e)=> {

    let a = false
    change.changes.forEach(i => {
        if (i.type == 'category') {
            i.value = e.target.options[e.target.selectedIndex].innerHTML
            a = true
        }
    })
    if (!a) {
        change.changes.push(changeItem(
            'category',
            e.target.options[e.target.selectedIndex].innerHTML
        ))
    }
})
}

const editBtn = document.getElementById('edit')
    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.preventDefault()
            change.areas.sorting = sortAreas()
            change.rooms.sorting = sortRooms()
            console.log(change)
            change.projectPk = Number(document.getElementById('project').dataset.pk),
            $.ajax({
                type: "POST",
                url: 'http://' + window.location.host.toString() + "/manager/edit-project",
                data: {
                    data: JSON.stringify(change),
                    csrfmiddlewaretoken: document.querySelector('input[name=csrfmiddlewaretoken]').value
                },
                success: function (data) {
                    console.log(data)
                }
            });
        })
    }