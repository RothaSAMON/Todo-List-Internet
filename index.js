
// Create a "close" button and append it to each list item
function addCloseButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        var div = this.parentElement;
        div.remove(); // Use remove() instead of hide to delete the element
        saveList();
    }
}

// Load the list from localStorage
function loadList() {
    var savedList = localStorage.getItem('toDoList');
    if (savedList) {
        var listArray = JSON.parse(savedList);
        listArray.forEach(function(item) {
            var li = document.createElement("li");
            li.textContent = item.text;
            if (item.checked) {
                li.classList.add('checked');
            }
            document.getElementById('myUL').appendChild(li);
            addCloseButton(li);
            li.addEventListener('click', function(ev) {
                if (ev.target.tagName === 'LI') {
                    ev.target.classList.toggle('checked');
                    saveList();
                }
            }, false);
        });
    }
}

// Save the list to localStorage
function saveList() {
    var listItems = document.querySelectorAll('#myUL li');
    var listArray = [];
    listItems.forEach(function(item) {
        listArray.push({
            text: item.textContent.slice(0, -1),  // remove the close button text
            checked: item.classList.contains('checked')
        });
    });
    localStorage.setItem('toDoList', JSON.stringify(listArray));
}

// Add a new list item when clicking on the "Add" button or pressing Enter
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        console.log("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    addCloseButton(li);
    li.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            saveList();
        }
    }, false);
    saveList();
}

// Add event listener to input field to listen for Enter key
document.getElementById("myInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        newElement();
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', loadList);

