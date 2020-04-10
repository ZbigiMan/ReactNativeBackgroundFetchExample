
import PushNotification from 'react-native-push-notification'
import BackgroundFetch from 'react-native-background-fetch'

import config from './config'

/* global fetch */

class BackgroundFetchService {
  configureNotifications () {
    PushNotification.configure({
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: false,
      requestPermissions: true
    })
  }

  async fetchTask (taskId) {
    console.log('BackgroundFetch Start', taskId)

    const data = await fetch(config.api.url)
      .then((response) => {
        return response.json()
      })
      .catch((error) => {
        console.error(error)
      })

    const article = data.articles[0]

    PushNotification.localNotification({
      title: article.source.name,
      message: article.title,
      playSound: true,
      soundName: 'default'
    })

    console.log('BackgroundFetch Finish', taskId)

    BackgroundFetch.finish(taskId)
  }

  async init () {
    this.configureNotifications()

    BackgroundFetch.registerHeadlessTask(this.fetchTask)

    BackgroundFetch.configure({
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true
    }, this.fetchTask,
    (error) => {
      console.log(error, '[js] RNBackgroundFetch failed to start')
    })

    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted')
          break
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied')
          break
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled')
          break
      }
    })
  }
}

export default new BackgroundFetchService()
