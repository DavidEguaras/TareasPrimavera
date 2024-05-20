function calcular(operacion, x, y) {
    switch (operacion) {
        case 'suma':
        return x + y;
        case 'resta':
        return x - y;
        case 'multiplicacion':
        return x * y;
        case 'division':
        return x / y;
        default:
        return NaN;
    }
}

const x = 5;

function duplicar(number){
    return calcular('suma',number, number);
}

const x2 = duplicar(x);

console.log(x2);