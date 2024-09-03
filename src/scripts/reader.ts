//in this script we take songs info from yt page by given an url link to desired playlist

import { artistListHandler } from "../helpers/helpers"
import puppeteer, {
  Browser,
  ElementHandle,
  Locator,
  Page,
  PageEvent,
} from "puppeteer"
import { WINDOW_HEIGHT_CONST, WINDOW_WIDTH_CONST } from "../helpers/constants"

let browser: Browser | undefined
let page: Page | undefined

const playlistLinkUrl =
  "https://www.youtube.com/watch?v=utnmg39hcyk&list=PLAEfXHuNOsEZbiIkNKfRRq7lBkyOOQG5u&index=47"
const song =
  "Technimatic - Looking For Diversion ft. Lucy Kitchen (Lenzman & Duskee Remix)"
const song2 = "Circadian - Energy In Motion"

const artistList = artistListHandler(song)

const convertBtnElementId = `input[type="submit"][value="Convert"]`

const linkUrlSelectorById = `a[id="wc-endpoint"]`
const RejectTermsBtnSelector = `button ::-p-text("Reject all")`
const videoSelector = `video.video-stream.html5-main-video`
const playlistContainerSelector = `div.playlist-items.style-scope.ytd-playlist-panel-renderer`
const aLinkSongURLSelector = `a.ytd-playlist-panel-video-renderer`

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

  //wait until terms and conds appear on screen
  //click on accept
  const rejectTermsBtn = page.locator(RejectTermsBtnSelector)
  rejectTermsBtn.click()

  await page.evaluate((selector) => {
    const mainVideoSelected = document.querySelector(
      selector
    ) as HTMLVideoElement
    if (mainVideoSelected) mainVideoSelected.pause()
  }, videoSelector)

  const playlistContainer = page.locator(playlistContainerSelector)._

  if (playlistContainer) {
    playlistContainer?.scrollIntoView({
      block: "end",
      behavior: "smooth",
      inline: "end",
    })
  }

  //take first songs
  const childrenOfPlaylist = playlistContainer
    ? Array.from(playlistContainer.children)
    : []

  const result = childrenOfPlaylist.map((child) => {
    // const aSongUrl = document.querySelector(
    //   aLinkSongURLSelector
    // ) as HTMLLinkElement
    // console.log(aSongUrl.href)
    // console.log(item.textContent)
    return {
      text: child.textContent,
      html: child.innerHTML,
      href: (child as HTMLAnchorElement).href || null, // Example for anchor tags
      src: (child as HTMLImageElement).src || null, // Example for images
    }
  })
  console.log(result)
  // const selectDownloadBtn = await page.locator(linkUrlSelectorById).waitHandle()

  // console.log(selectDownloadBtn)
}

;(async () => {
  try {
    await readYtMusicHandler(playlistLinkUrl)
  } catch (err) {
    console.error("An error occurred while automating the browser:", err)
  } finally {
  }
})()
