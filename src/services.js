
const LOCAL = 'PocketDictionary'


const readLocal = () => {
    return JSON.parse(localStorage.getItem(LOCAL))
}

const writeToLocal = (data) => {
    localStorage.setItem(LOCAL, JSON.stringify(data))
    return readLocal()
}

const addCardToLocal = (card) => {
    const curLocal = readLocal()
    let newLocal = {}
    if(curLocal.dictionary){
        newLocal = {...curLocal, dictionary: [...curLocal.dictionary, card]} 
    }else{
        newLocal = {...curLocal, dictionary: [card]} 
    }

    return writeToLocal(newLocal)
} 

const addListToLocal = (list) => {
    const curLocal = readLocal()
    let newLocal = {}
    if(curLocal.dictionary){
        const newList = list.filter(card => {
            const target = curLocal.dictionary.find((item) => ((item.id === card.id) && (item.userId === card.userId)))
            return !target
        })
        console.log(newList)
        newLocal = {...curLocal, dictionary: [...curLocal.dictionary, ...newList]} 
    }else{
        newLocal = {...curLocal, dictionary: [...list]} 
    }

    return writeToLocal(newLocal)
} 

const removeCardFromLocal = (cardId) => {
    const curLocal = readLocal()
    let newDictionary = curLocal.dictionary.filter(({id}) => id !== cardId)

    let newLocal = {...curLocal, dictionary: newDictionary}
    return writeToLocal(newLocal)
} 


const addUserToLocal = (user) => {
    const curLocal = readLocal()
    let newLocal = {}
    if(curLocal.users){
        newLocal = {...curLocal, users: [...curLocal.users, user]} 
    }else{
        newLocal = {...curLocal, users: [user]} 
    }

    return writeToLocal(newLocal)
} 


export default {
    readLocal, 
    writeToLocal, 
    addCardToLocal, 
    removeCardFromLocal, 
    addUserToLocal,
    addListToLocal
}