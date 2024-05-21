class DOMTable {
    
    constructor(columns, rows){
        this._table = document.createElement('table');
        this._rows = rows;
        this._columns = columns;

        //loop que crea filas y columnas
        //este FOR itera y crea FILAS
        for(let i=0; i < rows; i++){
            let thisRow = document.createElement('tr');
        
            //este FOR itera y crea las COLUMNAS de cada FILA
            for(let j = 0; j < columns; j++){
                let thisColumn = document.createElement('td');
                thisRow.appendChild(thisColumn);
            }
            this._table.appendChild(thisRow);
        }
    }
    //Ni idea
    static cellsArray = Array.from(getTable.childNodes)

    getTable(){
        return this._table;
    }
    getRows(){
        return this._rows;
    }
    getColumns(){
        return this._columns;
    }

}