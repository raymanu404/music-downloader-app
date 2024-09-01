//in this script we take songs info from yt page by given an url link to desired playlist

import { artistListHandler } from "../helpers/helpers"
import puppeteer, { Browser, Page } from "puppeteer"
import { WINDOW_HEIGHT_CONST, WINDOW_WIDTH_CONST } from "../helpers/constants"

let browser: Browser | undefined
let page: Page | undefined

const playlistLinkUrl =
  "https://www.youtube.com/watch?v=utnmg39hcyk&list=PLAEfXHuNOsEZbiIkNKfRRq7lBkyOOQG5u&index=47"
const song = "Delta Heavy & Friction - Babylon (ft. YOU)"
const song2 = "Circadian - Energy In Motion"

const artistList = artistListHandler(song2)

const convertBtnElementId = `input[type="submit"][value="Convert"]`

const downloadBtnSelector = `a ::-p-text("Download")`
const convertAgainBtnSelector = `a ::-p-text("Convert next")`

const readYtMusicHandler = async (playlistLinkUrl: string) => {
  // Launch browser
  browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=${WINDOW_WIDTH_CONST},${WINDOW_HEIGHT_CONST}`],
  })
  page = await browser.newPage()
  const { width, height } = await page.evaluate(() => {
    return {
      width: window.screen.width,
      height: window.screen.height,
    }
  })

  await page.setViewport({
    width,
    height,
  })

  await page.goto(playlistLinkUrl)

  const selectDownloadBtn = await page.locator(downloadBtnSelector).waitHandle()

  console.log(selectDownloadBtn)
}

;(async () => {
  try {
    await readYtMusicHandler(playlistLinkUrl)
  } catch (err) {
    console.error("An error occurred while automating the browser:", err)
  } finally {
  }
})()
