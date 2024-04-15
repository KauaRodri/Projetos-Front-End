document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var productName = document.getElementById('productName').value;
    var productCode = document.getElementById('productCode').value;
    var height = document.getElementById('height').value;
    var width = document.getElementById('width').value;
    var depth = document.getElementById('depth').value;
    var comments = document.getElementById('comments').value;

    if (checkDuplicateProduct(productCode)) {
        alert('Este código de produto já foi cadastrado.');
        return;
    }

    var product = {
        name: productName,
        code: productCode,
        height: height,
        width: width,
        depth: depth,
        comments: comments
    };

    addProductToList(product);

    document.getElementById('productForm').reset();
});

function checkDuplicateProduct(code) {
    var productList = document.getElementById('productList').rows;
    for (var i = 0; i < productList.length; i++) {
        var productCode = productList[i].cells[1].innerText;
        if (productCode === code) {
            return true; 
        }
    }
    return false; 
}

function addProductToList(product) {
    var productList = document.getElementById('productList');

    var newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${product.name}</td>
        <td>${product.code}</td>
        <td>${product.height}</td>
        <td>${product.width}</td>
        <td>${product.depth}</td>
        <td>${product.comments}</td>
        <td>
            <button onclick="editProduct(this)">Editar</button>
            <button onclick="addComment(this)">Adicionar Comentário</button>
            <button onclick="deleteProduct(this)">Deletar</button>
        </td>
    `;

    productList.appendChild(newRow);
}

function editProduct(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");

    var rowIndex = row.rowIndex;

    document.getElementById('productName').value = cells[0].innerText;
    document.getElementById('productCode').value = cells[1].innerText;
    document.getElementById('height').value = cells[2].innerText;
    document.getElementById('width').value = cells[3].innerText;
    document.getElementById('depth').value = cells[4].innerText;
    document.getElementById('comments').value = cells[5].innerText;

    var submitButton = document.querySelector('#productForm button[type="submit"]');
    submitButton.textContent = "Salvar Edição";

    row.parentNode.removeChild(row);

    document.getElementById('productForm').onsubmit = function(event) {
        event.preventDefault();

        var productName = document.getElementById('productName').value;
        var productCode = document.getElementById('productCode').value;
        var height = document.getElementById('height').value;
        var width = document.getElementById('width').value;
        var depth = document.getElementById('depth').value;
        var comments = document.getElementById('comments').value;

        var product = {
            name: productName,
            code: productCode,
            height: height,
            width: width,
            depth: depth,
            comments: comments
        };

        updateProduct(rowIndex, product);

        document.getElementById('productForm').reset();

        submitButton.textContent = "Cadastrar Produto";

        document.getElementById('productForm').onsubmit = null;
    };
}

function updateProduct(rowIndex, product) {
    var productList = document.getElementById('productList');
    var row = productList.rows[rowIndex];
    var cells = row.cells;
    cells[0].innerText = product.name;
    cells[1].innerText = product.code;
    cells[2].innerText = product.height;
    cells[3].innerText = product.width;
    cells[4].innerText = product.depth;
    cells[5].innerText = product.comments;
}

function addComment(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");
    var currentComments = cells[5].innerText;
    var newComment = prompt("Digite o novo comentário:");

    if (newComment !== null) {
        if (currentComments !== "") {
            currentComments += "\n"; 
        }
        currentComments += newComment;
        cells[5].innerText = currentComments;
    }
}

function deleteProduct(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
