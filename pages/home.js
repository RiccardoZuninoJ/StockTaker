const { ipcRenderer } = require('electron')

let button = document.getElementById('add')
let opened = 0

let goback = document.getElementById('goback')
goback.addEventListener('click', () => {
    ipcRenderer.send("goto", "index.html")
})

document.getElementById('opengithub').addEventListener("click", () => 
    ipcRenderer.send("openlink", "https://github.com/RiccardoZuninoJ")
)

button.addEventListener('click', () => {
    if(opened == 0)
    {
        let name = document.createElement('input')
        name.setAttribute("class", "form-control mb-2")
        name.setAttribute("placeholder", "Product name")
        name.setAttribute("id", "productName")
        name.setAttribute("type", "text")
        let description = document.createElement('textarea')
        description.setAttribute("class", "form-control mb-2")
        description.setAttribute("placeholder", "Product description")
        description.setAttribute("id", "productDescription")
        description.setAttribute("type", "text")
        let quantity = document.createElement('input')
        quantity.setAttribute("class", "form-control mb-2")
        quantity.setAttribute("id", "productQuantity")
        quantity.setAttribute("placeholder", "Quantity")
        quantity.setAttribute("type", "number")
        let price = document.createElement('input')
        price.setAttribute("class", "form-control mb-2")
        price.setAttribute("id", "productPrice")
        price.setAttribute("placeholder", "Price")
        price.setAttribute("type", "number")
        let button = document.createElement('button')
        button.setAttribute('class', 'btn btn-light')
        button.appendChild(document.createTextNode("Add this product"))
        button.setAttribute('onclick', "insert()")
        let div = document.createElement('div')
        div.append(name, description, quantity, price, button)
        document.getElementById("addProducts").appendChild(div)
        opened = 1
    }else
    {
        let div = document.getElementById('addProducts')
        div.removeChild(div.lastElementChild)
        opened = 0

    }
})
function save_quantity(id)
{
    let qty = document.getElementById('qty'+id).value
    con.query("UPDATE products SET quantity=" + qty + " WHERE product_id=" + id, (error, results, fields) => {
        if(error)
        {
            alert(error)
        }else
        {
            ipcRenderer.send("refresh")
        }
    })
}
function save_price(id)
{
    let qty = document.getElementById('pri'+id).value
    con.query("UPDATE products SET price=" + qty + " WHERE product_id=" + id, (error, results, fields) => {
        if(error)
        {
            alert(error)
        }else
        {
            ipcRenderer.send("refresh")
        }
    })
}
function insert()
{
    let name = document.getElementById('productName').value
    let description = document.getElementById('productDescription').value
    let quantity = document.getElementById('productQuantity').value
    let price = document.getElementById('productPrice').value

    if(name == "" || description == "" || quantity == "" || price == "")
    {
        alert("You must complete all the fields to add a product")
    }else
    {
        con.query("INSERT INTO products (name, description, quantity, price) VALUES ('" + name + "', '"
        + description + "', " + quantity + ", " + price + ")", (error, results, fields) => {
            if(error)
            {
                alert("Error " + error)
            }else
            {
                alert("Product added successfully!")
                ipcRenderer.send("refresh")
            }
        })
    }
}

function remove_product(id)
{
    ipcRenderer.send("remove", id);
}
ipcRenderer.on("remove_from_db", (event, data) => {
    con.query("DELETE FROM products WHERE product_id=" + data, (error, results, fields) => {
        if(error)
        {
            alert("Error " + error);
        }else
        {
            alert("Product removed successfully")
            ipcRenderer.send("refresh")
        }
    })
})

