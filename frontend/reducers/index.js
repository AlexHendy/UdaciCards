import { RECEIVE_DECKS, GET_DECK, ADD_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
    switch (action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                deckList: action.decks
            }
        case GET_DECK:
            return {
                ...state,
                deck: action.deck
            }
        case ADD_DECK:
            return {
                ...state,
                deckList: state.deckList 
                            ? {
                                ...state.deckList,
                                ...action.deck
                            }
                            : action.deck
            }
        case ADD_CARD: 
            return {
                ...state,
                deckList: {
                    ...state.deckList,
                    [action.title]: {
                        ...state.deckList[action.title],
                        questions: state.deckList[action.title].questions.push(action.card)
                    }
                }
            }
        default:
            return state
    }
}

export default decks