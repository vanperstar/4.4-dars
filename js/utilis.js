function sortAndRender(sortType = 1, sortBy = 1) {
    movies = movies.sort((a, b) => {
        switch(sortBy) {
            case 1:
                return sortType * (a.id - b.id);
                case 2: return sortType * (a.title.charCodeAt() - b.title.charCodeAt());
                case 3: return sortType * ( a.year - b.year);
            default: return sortType *(a.id - b.id);
        }
    })
    renderMovies(movies);
}
// sortAndRender(sortType, sortBy);

// let sortByIsCompletedBtn = createButton('sort by isCompleted', () => {
//     movies.sort((a, b) => {
//         // return a.year - b.year;
//         return a.title.charCodeAt() - b.title.charCodeAt()
//     }) 
//     renderMovies(movies)
// })
// sortAndRender(sortType, sortBy);

function createButton(child, onClick = () => {} ) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-info';
    btn.textContent = child;
    btn.addEventListener('click', onClick) 
    return btn
}

function createSelectEl(moviesOpt=[]) {
    let selectEl = document.createElement('select');
    selectEl.className = 'form-select col-1';
    let option = document.createElement('option');
    option.textContent = '--Select--';
    option.selected = true;
    option.disabled = true;
    selectEl.appendChild(option);

    moviesOpt.forEach((value) => {
        let option = document.createElement('option');
        option.textContent = value.text;
        option.value = value.value;
        selectEl.appendChild(option);
    })
    return selectEl
}

function createTodoItem(movie) {
    let todoContainer = document.createElement('div');
    todoContainer.className = 'todo-item';

    let todoCheckEl = document.createElement('input');
    todoCheckEl.type = 'checkbox';
    todoCheckEl.className = 'todo-item-check';
    todoCheckEl.checked = movie.isCompleted;
    todoContainer.appendChild(todoCheckEl);

    todoCheckEl.addEventListener('change', () => {
        movies = movies.map(value => {
            if(value.id === movie.id) {
                value.isCompleted = todoCheckEl.checked
            }
            return value
        })
        renderMovies(movies)
    })  

    let todoTitleEl = document.createElement('h4');
    todoTitleEl.textContent = movie.title;
    todoTitleEl.className = 'todo-item-title';
    todoContainer.appendChild(todoTitleEl);

    let todoYear = document.createElement('h6');
    todoYear.textContent = movie.year;
    todoContainer.appendChild(todoYear);

    let todoImgEL = document.createElement('img');
    todoImgEL.src = movie.imageUrl;
    todoContainer.appendChild(todoImgEL);

    let todoDelEl = document.createElement('button');
    todoDelEl.textContent = 'delete';
    todoDelEl.className = 'todo-item-delete btn btn-danger';
    todoContainer.appendChild(todoDelEl);

    todoDelEl.addEventListener('click', () => {
        movies = movies.filter(value => value.id !== movie.id)
        renderMovies(movies);
    })
    return todoContainer
}

function renderMovies(todosData){
    todoListEl.innerHTML = null
    if(todosData.length > 0){
        todosData.forEach((movie, index) => {
            let todoEl = createTodoItem(movies)
            todoListEl.appendChild(todoEl)
        })
    }else{
        todoListEl.textContent = "Todos not found";
    }
}