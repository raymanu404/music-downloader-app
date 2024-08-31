import puppeteer, { Browser, Page } from "puppeteer"
import { WINDOW_HEIGHT_CONST, WINDOW_WIDTH_CONST } from "../helpers/constants"

let browser: Browser | undefined
let page: Page | undefined

const mp3YtWebsiteURL = "https://ytmp3s.nu/6ufl/"
const song = "Monrroe & Emily Makis - Never Too Old (Friction Remix)"

const remix = /|Remix|remix/g
const nameRegex = /[&(),]|ft/g
const DASH = "-"

const splitSong = song.split(DASH)
const nameList: string[][] = []
let result: string[] = []

splitSong.forEach((item, index) => {
  if (index === 0) {
    const result = item.split(nameRegex)
    nameList.push(result)
  }

  if (index === 1) {
    const name = item
      .split(nameRegex)
      .filter((x) => x !== "")
      .slice(1)

    // console.log(name)

    nameList.push(name)
  }
})

nameList.forEach((x) => {
  console.log(x)
})
// const downloadYtMusicHandler = async (ytMusicUrlToDownload: string) => {
//   // Launch browser
//   browser = await puppeteer.launch({
//     headless: false,
//     args: [`--window-size=${WINDOW_WIDTH_CONST},${WINDOW_HEIGHT_CONST}`],
//   })
//   page = await browser.newPage()
//   const { width, height } = await page.evaluate(() => {
//     return {
//       width: window.screen.width,
//       height: window.screen.height,
//     }
//   })

//   await page.setViewport({
//     width,
//     height,
//   })

//   await page.goto(mp3YtWebsiteURL)
//   await page.type(urlInputElementId, ytMusicUrlToDownload)

//   // Try using CSS selector to click the button
//   await page.click(convertBtnElementId)

//   const selectDownloadBtn = await page.locator(downloadBtnSelector).waitHandle()

//   selectDownloadBtn.click()

//   //close the new page that was opened
//   page.on("popup", async (popupPage) => {
//     if (popupPage) {
//       await popupPage.close()
//     }
//   })

//   //TODO: some delay to click on convertAgainBtn when this appears
//   const convertAgainBtn = await page
//     .locator(convertAgainBtnSelector)
//     .waitHandle()

//   convertAgainBtn.click()
