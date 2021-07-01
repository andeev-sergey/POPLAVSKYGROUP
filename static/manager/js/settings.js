document.getElementById('saveSettings').addEventListener('click', evt=> {
    evt.preventDefault()
    let data = Array.from(document.querySelectorAll('.cfg')).map(el=>{
        return {
            field: el.name,
            value: el.value
        }
    })
    $.ajax({
        type: "POST",
        url: 'http://' + window.location.host.toString() + "/manager/edit-settings",
        data: {
            data: JSON.stringify({fields: data}),
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