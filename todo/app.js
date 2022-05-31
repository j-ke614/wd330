var todoList = {
    todos: [],
    addTodo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
    },
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
    },
    deleteCompletedTodos: function() {
      for (var i = this.todos.length - 1; i >= 0; i--) {
        if (this.todos[i].completed === true) {
          this.deleteTodo(i);
        }
      }
    },
    updateTodo: function(newTodoText, position) {
      this.todos[position].todoText = newTodoText;
    },
    toggleCompleted: function(todo) {
      todo.completed = !todo.completed;
    },
    toggleAll: function() {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
      this.todos.forEach(function(todo) {
        if (todo.completed === true) {
          completedTodos++;
        }
      });
      if (completedTodos === totalTodos) {
        todoList.todos.forEach(function(todo) {
          todo.completed = false;
        });
      }
      else {
        todoList.todos.forEach(function(todo) {
          todo.completed = true;
        });
      }
    },
    updateLocalStorage: function() {
      localStorage.setItem('todos', JSON.stringify(todoList.todos));
    },
    getLocalStorage: function() {
      if (localStorage.getItem('todos') !== null) {
        todoList.todos = JSON.parse(localStorage.getItem('todos'));
      }
    }
  };
  
  var handlers = {
    addTodo: function() {
      var addTodoTextInput = document.getElementById('addTodoTextInput');
      if (/\S/.test(addTodoTextInput.value)) {
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
      }
    },
    deleteTodo: function(position) {
      todoList.deleteTodo(position);
      view.displayTodos();
    },
    deleteCompletedTodos: function() {
      todoList.deleteCompletedTodos();
      view.displayTodos();
    },
    updateTodo: function(newTodoText, position) {
      todoList.updateTodo(newTodoText, position);
      todoList.updateLocalStorage();
    },
    toggleCompleted: function(todo) {
      todoList.toggleCompleted(todo);
      view.displayTodos();
    },
    toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
    }
  };
  
  var view = {
    selectedFilter: 'showAllTodos',
    filteredTodos: [],
    displayTodos: function() {
      var todosUl = document.getElementById('todos');
     
      view.filterTodos();
      
      // Empty the list 
      todosUl.innerHTML = '';
      
      // Create todo elements
      view.filteredTodos.forEach(function(todo, position) {
        var todoLi = document.createElement('li');
        var checkbox = this.createCheckbox(todo);
        var todoLabel = this.createTodoLabel(todo);
        var deleteButton = this.createDeleteButton();
        
        todoLi.className = 'todo';
        
        todoLi.appendChild(checkbox);
        todoLi.appendChild(todoLabel);
        todoLi.appendChild(deleteButton);
        todosUl.appendChild(todoLi);
        
        // If todo is completed, show check 
        if (todo.completed === true) {
          checkbox.querySelector('input').checked = true;
          todoLabel.classList.add('todo-checked-text');
        }
        
        todo.elementReference = todoLi;
      }, this);
      this.checkTodosCompletion();
      todoList.updateLocalStorage();
    },
    filterTodos: function() {
      switch(view.selectedFilter) {
        case 'showAllTodos':
          view.filteredTodos = todoList.todos;
          break;
        case 'showUncompletedTodos':
          view.filteredTodos = todoList.todos.filter(function(todo) {
            return todo.completed == false;
          });
          break;
        case 'showCompletedTodos':
          view.filteredTodos = todoList.todos.filter(function(todo) {
            return todo.completed == true;
          });
          break;
      }
    },
    createCheckbox: function() {
  
      var checkboxMain = document.createElement('div');
      var checkbox = document.createElement('input');
      var checkboxState = document.createElement('div');
      var checkboxIcon = document.createElement('i');
      var checkboxLabel = document.createElement('label');
      
      checkboxMain.className = 'pretty p-icon p-round';
      checkboxState.className = 'state';
      checkboxIcon.className = 'icon mdi mdi-check mdi-18px';
      
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
  
      checkboxState.appendChild(checkboxIcon);
      checkboxState.appendChild(checkboxLabel);
      checkboxMain.appendChild(checkbox);
      checkboxMain.appendChild(checkboxState);
      return checkboxMain;
    },
    createTodoLabel: function(todo) {
      var todoLabel = document.createElement('label');
      todoLabel.textContent = todo.todoText;
      todoLabel.className = 'todo-text';
      todoLabel.contentEditable = true;
      return todoLabel;
    },
    createDeleteButton: function() {
      var deleteButton = document.createElement('button');
      deleteButton.textContent = '×';
      deleteButton.className = 'delete-button';
      return deleteButton;
    },
    checkTodosCompletion: function() {
      var totalTodos = todoList.todos.length;
      var completedTodos = 0;
      var toggleAllButton = document.getElementById('toggleAll');
      var deleteCompletedButton = document.getElementById('deleteCompletedButton');
      var todosLeftLabel = document.getElementById('todosLeft');
      
      todoList.todos.forEach(function(todo) {
        if (todo.completed === true) {
          completedTodos++;
        }
      });
      
      var uncompletedTodos = totalTodos - completedTodos;
      
      if (completedTodos === totalTodos && totalTodos > 0) {
        toggleAllButton.classList.add('toggle-all-checked');
      }
      else {
        toggleAllButton.classList.remove('toggle-all-checked');
      }

      switch(completedTodos) {
        case 0:
          deleteCompletedButton.style.display = 'none';
          break;
        default:
          deleteCompletedButton.style.display = 'initial';
          break;
      }

      switch(uncompletedTodos) {
        case 0:
          todosLeftLabel.textContent = '';
          break;
        default:
          todosLeftLabel.textContent = "Todos left: " + uncompletedTodos;
      }
    },

    getTodoElementIndex: function(todoElement) {
      var todo = todoList.todos.find(function(todo) {
        return todo.elementReference == todoElement;
      });
      return todoList.todos.indexOf(todo);
    },
    resizeTodos: function() {
      if (window.matchMedia('(max-device-width: 680px)').matches) {
        var hero = document.getElementById('hero');
        var todoAppWidth = document.getElementById('todoApp').offsetWidth;
        var todoTextWidth = todoAppWidth - 100 + 'px';
        hero.style.setProperty('--mobile-todo-text-width', todoTextWidth);
      }
    },
    setMobileHeroRows: function() {
      var hero = document.getElementById('hero');
      var windowHeight = window.innerHeight + 'px';
      hero.style.setProperty('--mobile-hero-height', windowHeight);
    },
    setUpEventListeners: function() {
      var addTodoTextInput = document.getElementById('addTodoTextInput');
      var todoMenu1 = document.getElementById('todoMenu1');
      var todosUl = document.getElementById('todos');
      var todoMenu2 = document.getElementById('todoMenu2');
      
      window.addEventListener('resize', function() {
        if (window.matchMedia('(max-device-width: 680px)').matches) {
          view.resizeTodos();
        }
      });
      
      todoMenu1.addEventListener('click', function(event) {
        var elementClicked = event.target;
        if (elementClicked.id === 'toggleAll') {
          handlers.toggleAll();
        }
      });
      
      addTodoTextInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          handlers.addTodo();
        }
      });
      
      todosUl.addEventListener('click', function(event) {
        var elementClicked = event.target;
        if (elementClicked.classList.contains('delete-button')) {
          var indexOfTodoElement = view.getTodoElementIndex(elementClicked.parentNode);
          handlers.deleteTodo(indexOfTodoElement);
        }
        else if (elementClicked.classList.contains('checkbox')) {
          var indexOfTodoElement = view.getTodoElementIndex(elementClicked.parentNode.parentNode);
          handlers.toggleCompleted(todoList.todos[indexOfTodoElement]);
        }
      });
      todosUl.addEventListener('keypress', function(event) {
        var elementClicked = event.target;
        if (event.key === 'Enter') {
          elementClicked.blur();
        }
      });
      todosUl.addEventListener('focusout', function(event) {
        var elementClicked = event.target;
        if (elementClicked.classList.contains('todo-text')) {
          var indexOfTodoElement = view.getTodoElementIndex(elementClicked.parentNode);
          handlers.updateTodo(elementClicked.textContent, indexOfTodoElement);
        }
      });
      todosUl.addEventListener('paste', function(event) {
        event.preventDefault();
        var text = event.clipboardData.getData('text/plain');
        document.execCommand('insertHTML', false, text);
      });
      todoMenu2.addEventListener('click', function(event) {
        var elementClicked = event.target;
        if (elementClicked.id === 'deleteCompletedButton') {
          handlers.deleteCompletedTodos();
        }
        else if (elementClicked.classList.contains('menu-2-button')) {
          var menu2ButtonElements = document.querySelectorAll('.menu-2-button');
          menu2ButtonElements.forEach(function(button) {
            button.classList.remove('active');
          });
          elementClicked.classList.add('active');
          view.selectedFilter = elementClicked.id;
          view.displayTodos();
        }
      });
    }
  };
  
  view.setUpEventListeners();
  todoList.getLocalStorage();
  view.setMobileHeroRows();
  view.displayTodos();
  view.resizeTodos();