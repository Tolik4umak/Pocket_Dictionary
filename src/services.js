
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
        newLocal = {...curLocal, dictionary: [card, ...curLocal.dictionary]} 
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
        newLocal = {...curLocal, dictionary: [ ...newList, ...curLocal.dictionary]} 
    }else{
        newLocal = {...curLocal, dictionary: [...list]} 
    }

    return writeToLocal(newLocal)
} 

const removeCardFromLocal = (card) => {
    const curLocal = readLocal()
    let newDictionary = curLocal.dictionary.filter(({id, userId}) => !(userId === card.userId && id === card.id) )

    let newLocal = {...curLocal, dictionary: newDictionary}
    return writeToLocal(newLocal)
} 

const editCardInLocal = (curCard) => {
    const curLocal = readLocal()
    let newDictionary = curLocal.dictionary.map((card) => {
        if(card.id === curCard.id && card.userId === curCard.userId){
            return curCard
        }
        return card
    })

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

const refreshUserScoreLocal = (userId, score) => {
    const curLocal = readLocal()
    const newUsers = curLocal.users.map(user => {
        if(user.userId === userId){
            return {...user, userScore: score}
        }
        return user
    })

    let newLocal = {...curLocal, users: newUsers}
    return writeToLocal(newLocal)
}


export default {
    readLocal, 
    writeToLocal, 
    addCardToLocal, 
    removeCardFromLocal, 
    addUserToLocal,
    addListToLocal,
    editCardInLocal,
    refreshUserScoreLocal
}