var containerEl = document.createElement('div');
containerEl.className = 'container';
document.body.appendChild(containerEl);

var todoInputForm = document.createElement('form');
todoInputForm.className = 'col-6 m-auto mt-4 pt-4 pb-3 d-flex align-items-center';
todoInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let id = movies.length > 0 ? movies[movies.length-1].id+1: 0
    const newTodo = {
        id:id,
        year:movies.year,
        title:todoInput.value,
        isCompleted:false
    }
    movies.push(newTodo);
    todoInput.value = '';
    renderMovies(movies);
})

containerEl.appendChild(todoInputForm)

var todoInput = document.createElement('input');
todoInput.className = 'todo-input';
todoInput.placeholder = 'Movies name'
todoInput.className = 'form-control d-inline-block me-4'; 

var todoAddBtn = document.createElement('button');
todoAddBtn.type = 'submit';
todoAddBtn.className = 'btn btn-secondary col-2 ms-5';
todoAddBtn.textContent = 'Add';

todoInputForm.appendChild(todoInput);
todoInputForm.appendChild(todoAddBtn);

var todoListEl = document.createElement('div');
todoListEl.className = 'm-auto d-flex  todo-list-container'
containerEl.appendChild(todoListEl);

// var 

var sortType = 1; //Default o'sish tartibida sortlangsn;
var sortBy = 1; //Id bo'yicha sortlangan;

//Sort movies

var sortButtonsEl =document.createElement('div')
sortButtonsEl.className = 'm-auto col-6 mt-3';
containerEl.appendChild(sortButtonsEl);


const moviesOpts = [
    {value:1, text:'Sort by id'},
    {value:2, text:'Sort by title'},
    {value:3, text:'Sort by year'},
];

let sortBySelectEl = createSelectEl(moviesOpts);
sortButtonsEl.appendChild(sortBySelectEl);
sortBySelectEl.addEventListener('change', (e) => {
    sortBy = e.target.value - 0;
    console.log(e.target.value)
    sortAndRender(sortType, sortBy);
})

const optsGreaterOrLess = [
    {value:1, text:`O'sish`},
    {value:-1, text:`Kamayish`},
]

let typeSortSelectEl = createSelectEl(optsGreaterOrLess);
sortButtonsEl.appendChild(typeSortSelectEl);

typeSortSelectEl.addEventListener('change', (e) => {
    sortType = e.target.value - 0;
    sortAndRender(sortType, sortBy);
})

// function createTodoItem(movie) {
    // let todoContainer = document.createElement('div');
//     todoContainer.className = 'todo-item';

//     let todoCheckEl = document.createElement('input');
//     todoCheckEl.type = 'checkbox';
//     todoCheckEl.className = 'todo-item-check';
//     todoCheckEl.checked = movie.isCompleted;
//     todoContainer.appendChild(todoCheckEl);

//     todoCheckEl.addEventListener('change', () => {
//         movies = movies.map((value) => {
//             if(value.id === movie.id) {
//                 value.isCompleted = todoCheckEl.checked
//             }
//             return value
//         })
//         renderMovies(movies)
//         console.log(movies);
//     })  

//     let todoTitleEl = document.createElement('h4');
//     todoTitleEl.textContent = movie.title;
//     todoTitleEl.className = 'todo-item-title';
//     todoContainer.appendChild(todoTitleEl);

//     let todoDelEl = document.createElement('button');
//     todoDelEl.textContent = 'delete';
//     todoDelEl.className = 'todo-item-delete btn btn-danger';
//     todoContainer.appendChild(todoDelEl);

//     todoDelEl.addEventListener('click', () => {
//         movies = movies.filter(value => value.id !== movie.id)
//         renderMovies(movies);
//     })
//     return todoContainer
// }

function renderMovies(todosData){
    todoListEl.innerHTML = null
    if(todosData.length > 0){
        todosData.forEach((movie, index) => {
            let todoEl = createTodoItem(movie)
            todoListEl.appendChild(todoEl)
        })
    }else{
        todoListEl.textContent = "Todos not found";
    }
}

renderMovies(movies)