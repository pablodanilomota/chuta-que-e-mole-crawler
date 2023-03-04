import Axios from 'axios'
import * as cheerio from 'cheerio'
import { save as saveTeam } from './modules/team'
import { save as saveGame } from './modules/game'
import { save as saveStadium } from './modules/stadium'
import { save as saveChampionship } from './modules/championship'

import { RootObject } from './types'

function checarData(data) {
  return data instanceof Date && !isNaN(data.getTime())
}

;(async () => {
  const response = await Axios.get(
    'https://ge.globo.com/agenda/#/todos/04-03-2023'
  )
  const elements = cheerio.load(response.data)

  const scripts = elements("\\script[type='application/ld+json']").toArray()

  return Promise.all(
    scripts.map(async script => {
      //@ts-ignore
      const currentValue = JSON.parse(script.children[0].data) as RootObject

      const championshipName = currentValue.name

      const championshipInput = { name: championshipName }

      const { id: championshipId } = await saveChampionship(championshipInput)

      return Promise.all(
        currentValue.subEvent.map(async subEvent => {
          const {
            name,
            startDate: startDateString,
            location,
            homeTeam,
            awayTeam
          } = subEvent

          const eventType = name.split(',')[1]
          const startDate = checarData(new Date(startDateString))
            ? new Date(startDateString)
            : new Date()

          const stadiumInput = {
            name: location.name,
            address: location.address.addressRegion
          }

          const { id: stadiumId } = await saveStadium(stadiumInput)

          const { id: teamHomeId } = await saveTeam({
            name: homeTeam.name,
            shieldUrl: '..'
          })

          const { id: teamAwayId } = await saveTeam({
            name: awayTeam.name,
            shieldUrl: '..'
          })

          return saveGame({
            eventType,
            championshipId,
            stadiumId,
            startDate,
            teamAwayId,
            teamHomeId
          })
        })
      )
    })
  )
})()
