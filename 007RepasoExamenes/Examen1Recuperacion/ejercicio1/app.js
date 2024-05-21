const examenArticle = document.getElementById("examen");
const buttonExamen = document.createElement('button');
buttonExamen.innerHTML = "Cambiar";
examenArticle.appendChild(buttonExamen);

//a)
function createTable(columns, rows) {
    let thisTable = document.createElement('table');

    // Loop que crea filas y columnas
    for (let i = 0; i < rows; i++) {
        let thisRow = document.createElement('tr');

        // Loop que crea las columnas de cada fila
        for (let j = 0; j < columns; j++) {
            let thisColumn = document.createElement('td');
            thisRow.appendChild(thisColumn);
        }

        thisTable.appendChild(thisRow);
    }
    return thisTable;
}

//b)
let table1 = createTable(3, 2);
let table2 = createTable(8, 4);

// Agregar los elementos al artículo con id examen
examenArticle.appendChild(table1);
examenArticle.appendChild(table2);

//c)
buttonExamen.addEventListener('click', pressed);

function pressed() {
    let tablesArray = [table1, table2];
    tablesArray.forEach(table => {
        if (table.classList.contains('estrecha')) {
            table.classList.remove('estrecha');
            table.classList.add('ancha');
        } else {
            table.classList.remove('ancha');
            table.classList.add('estrecha');
        }
    });
}
