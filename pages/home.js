const { ipcRenderer } = require('electron')

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