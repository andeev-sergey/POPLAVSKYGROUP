
console.log('sds')
let search = document.getElementById('search')
if (search) {
    search.addEventListener("keyup", (e)=> {
        //console.log(e.target.value)
        document.querySelectorAll('ul.projects-list li').forEach((el)=>{
           // el.style.display = 'none'
            el.style.transition = '.3s'
            el.style.opacity = '.5'
            el.style.transform = 'scale(1)'
            el.style.filter = ' blur(4px)'
            if (el.querySelector('h3').innerText.includes(e.target.value)){
                el.style.opacity = '1'
                el.style.filter = ' blur(0px)'
                el.style.transform = 'scale(1.03)'
            }
        })
    })
    let category = document.getElementById('category-filter')
    category.addEventListener('change', e => {
        document.querySelectorAll('ul.projects-list li').forEach((el)=>{
            // el.style.display = 'none'
            el.style.transition = '.3s'
            el.style.opacity = '.5'
            el.style.transform = 'scale(1)'
            el.style.filter = ' blur(4px)'
            if ((el.dataset.category == e.target.value)||(e.target.value == 0)) {
                el.style.opacity = '1'
                el.style.filter = ' blur(0px)'
                el.style.transform = 'scale(1.02)'
            }
        })
    })
    document.getElementById('visability').addEventListener('change', e => {

        if (e.target.checked) {
            document.querySelectorAll('ul.projects-list li').forEach(
                (el)=>{
                    // el.style.display = 'none'
                    el.style.transition = '.3s'
                    el.style.opacity = '.5'
                    el.style.transform = 'scale(1)'
                    el.style.filter = ' blur(4px)'
                    if (el.querySelector('span.display').classList.contains('true')) {
                        el.style.opacity = '1'
                        el.style.filter = ' blur(0px)'
                        el.style.transform = 'scale(1.02)'
                    }
                }
            )
        } else {
            document.querySelectorAll('ul.projects-list li').forEach(
                (el)=>{
                    el.style.opacity = '1'
                    el.style.filter = ' blur(0px)'
                    el.style.transform = 'scale(1)'
                }
            )
        }
    })
}