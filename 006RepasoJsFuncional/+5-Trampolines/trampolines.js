// los trampolines son una tecnica que se utiliza en JS para saltarse el error de maximum call size exceeded en una funcion recursiva


const trampolin = fn => (...args) => {
    let result = fn(...args)
    while (typeof result === 'function'){
        result = result()
    }
    return result
}

const suma = (number, sum = 0) => {
    number === 0
     ? sum
     :suma(number - - 1, sum + number);
}

const tsuma = trampolin(suma)
const r = tsuma(10000);
console.log(r);