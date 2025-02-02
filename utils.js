export const listOperations = ["+", "-", "*", "/"]

export const checkOperationIsOk = (operation) => {
    const filteredChain = operation.filter(element => listOperations.includes(element) || !isNaN(Number(element)))
    return filteredChain.length === operation.length
}

export const isOperatorPreviousTerm = (operationLine) => {
    return listOperations.includes(operationLine[operationLine.length-1])
}