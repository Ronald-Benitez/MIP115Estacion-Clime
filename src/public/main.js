// io('http://localhost:3000'); para server diferente al local
const socket = io() // para server local
const noteForm = document.querySelector('#noteForm')
const title = document.querySelector('#title')
const description = document.querySelector('#description')

noteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(title.value,description.value);
    socket.emit('client:newnote',
    {
        title:title.value,
        description:description.value
    }
    )
});