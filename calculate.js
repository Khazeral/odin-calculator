export const add = (a,b) =>{
    return a + b
}

export const substract = (a,b) => {
    return a - b
}

export const multiply = (a,b) =>{
    return a * b
}

export const divide = (a,b) => {
    if(b === 0){
        throw new Error("Impossible to divide by 0")
    }
    return a / b
}