// variables
const shoppingItems = document.querySelector('#items-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart')


// Listeners
handleListeners();

function handleListeners() {
    // when an item is added
    shoppingItems.addEventListener('click', buyItems)

    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeItem)

    //clear cart button
    clearCartBtn.addEventListener('click', clearCart)
    
    //Document ready
    document.addEventListener('DOMContentLoaded', getFromStorage);
}


// functions
function buyItems(e) {
    e.preventDefault();
    // use delegation to find the item that was added
    if(e.target.classList.contains('add-to-cart')) {
        //Read the item values 
        const item = e.target.parentElement

        // read the values
        getItemInfo(item)
    }
}
function getItemInfo(item) {
    //create an object for item data
    const itemInfo = {
        image: item.querySelector('img').src,
        title: item.querySelector('.title').textContent,
        price: item.querySelector('.price').textContent,
        id: item.querySelector('button').getAttribute('data-id')
    }
    // add into the shopping cart
    addToCart(itemInfo)
}

    // display the selected item into the shopping cart
function addToCart(item) {
    // create a table row
    const row = document.createElement('tr')

    // build the template
    row.innerHTML = `
        <tr>
            <td><img src="${item.image}" class="img-fluid"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>
                <a href="#" class="remove bg-danger text-light circle" data-id="${item.id}">x</a>
            </td>
        </tr>
    `;

    // add into shopping cart
    shoppingCartContent.appendChild(row);

    //add items into local storage
    saveIntoStorage(item);
}
//add items to the local storage

function saveIntoStorage(item) {
    let items = getItemsFromStorage();

    //add items into the array 
    items.push(item);
    //since storage saves string, we need to convert the json into string
    localStorage.setItem('items', JSON.stringify(items));
}

//Get contents from storage
function getItemsFromStorage() {
    let items;
    // if something exist get a value else create an empty array
    if(localStorage.getItem('items') === null ) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//Remove item from cart

function removeItem(e) {
    let item, itemId
    //remobe from the dom
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        item = e.target.parentElement.parentElement;
        itemId = item.querySelector('a').getAttribute('data-id')
    }
    //remove from the local storage
    removeItemLocalStorage(itemId)

}
//remove each item from local storage
    function removeItemLocalStorage(id) {
        //get the local storage data
        let itemsLS = getItemsFromStorage();

        //loop through the array and loop the index

        itemsLS.forEach(function(itemLS, index) {
            if(itemLS.id === id) {
                itemsLS.splice(index, 1)
            }
        })
        console.log(itemsLS)
        //add rest of the array
        localStorage.setItem('items', JSON.stringify(itemsLS))
    }



//Clear the shopping cart 

function clearCart() {
    shoppingCartContent.innerHTML = ''

    //clear from local storage
    clearLocalStorage();
}

//clear the local storage 
function clearLocalStorage() {
    localStorage.clear();
}

//loads when document is ready and print items into the shopping cart 

function getFromStorage() {
    let itemsLS = getItemsFromStorage();

    //Loop through the items are print into the cart

    itemsLS.forEach(function(item) {
        //create a tr 
        const row = document.createElement('tr');

        //Print the content
        row.innerHTML = `
            <tr>
                <td><img src="${item.image}" class="img-fluid"></td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>
                    <a class="remove bg-danger text-light" data-id="${item.id}">x</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row)
    
    })
}



// shopping Cart toggle

const toggle = document.querySelector('.dropdown-toggle');
      toggleMenu = document.querySelector('.dropdown-menu')  

toggle.addEventListener('click', handleToggle);

function handleToggle() {
    if(toggleMenu.style.display === 'block') {
        toggleMenu.style.display = 'none'
    } else {
        toggleMenu.style.display = 'block'
    }
    return;
}

//sticky navbar
const navbar = document.querySelector('.navbar')

window.onscroll = function scroll() {
    if(scrollY > 55) {
        navbar.classList.add('fixed-top')
    } else {
        navbar.classList.remove('fixed-top')
    }
}
