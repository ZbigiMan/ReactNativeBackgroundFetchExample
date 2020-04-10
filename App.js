import React, { Component } from 'react'
import { View, Text } from 'react-native'

import theme from './theme'
import backgroundFetchService from './backgroundFetchService'

class App extends Component {
  componentDidMount () {
    backgroundFetchService.init()
  }

  render () {
    return (
      <View style={theme.homeScreen.container}>
        <Text style={theme.homeScreen.text}>React Native Background Fetch Example</Text>
        <Text style={theme.homeScreen.text}>Fetch data from https://gnews.io/api/v3/top-news</Text>
        <Text style={theme.homeScreen.text}>and push notification</Text>
      </View>
    )
  }
}

export default App
