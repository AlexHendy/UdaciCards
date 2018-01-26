import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'UdaciCards:decks'

export function fetchDeckResults () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => formatResults(results))
}

function formatResults(results) {
    return results === null
    ? {}
    : JSON.parse(results)
}

export function fetchDeck (title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => 
    { 
        results ? JSON.parse(results)[title] : {} 
    })
}

export function createDeck ({ title }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function saveCardToDeck ({ question, answer, title }) {
    AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title].questions.push({question, answer})
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}