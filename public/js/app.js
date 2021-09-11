console.log('client side app loaded..')



const weateherForm = document.querySelector('form')

const search = document.querySelector('input')
    
weateherForm.addEventListener('submit',(e) => {
    e.preventDefault()  
    const location = search.value

    const message1 = document.querySelector('#message1')
    const message2 = document.querySelector('#message2')
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?adress='+location).then((response) => {
    
    response.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error
            message2.textContent = ''
        } else {
            message1.textContent = data.location
            message2.textContent = data.forecast
        }

    })    
})
    
})