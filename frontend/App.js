import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import DeckView from './components/DeckView'
import QuizView from './components/QuizView'
import { black, white } from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'
import ListDecks from './components/ListDecks'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  } 
}, {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? black : white,
      style:{
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : black 
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
})

const MainNavigator = StackNavigator({
  DeckList: {
    screen: Tabs,
  },
  Deck: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      },
    },
  },
  AddCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      },
    },
  },
  Quiz: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      },
    },
  }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar  backgroundColor={black} barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
