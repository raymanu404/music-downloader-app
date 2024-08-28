import puppeteer, { Browser, Page, ElementHandle } from "puppeteer"
import path from "path"

// Define variables with explicit types
let browser: Browser | undefined
let page: Page | undefined

const mp3YtWebsiteURL = "https://ytmp3s.nu/6ufl/"
const urlInputElementId = "#url"
// const ytMusicUrlToDownload = [
//   "https://youtu.be/oAeotgCHL3E?si=TtBeOgL40ZZp9Nwh",
//   "https://youtu.be/oAeotgCHL3E?si=JXJKfBrrq_uXinWD",
//   "https://youtu.be/U92pcsPsQpI?si=cvROlXNe9gFQZyZ1",
// ]
const ytMusicUrlToDownload1 = "https://youtu.be/oAeotgCHL3E?si=TtBeOgL40ZZp9Nwh"
const ytMusicUrlToDownload2 = "https://youtu.be/oAeotgCHL3E?si=JXJKfBrrq_uXinWD"
const ytMusicUrlToDownload3 = "https://youtu.be/U92pcsPsQpI?si=cvROlXNe9gFQZyZ1"

const convertBtnElementId = `input[type="submit"][value="Convert"]`
const WINDOW_WIDTH_CONST = `1919`
const WINDOW_HEIGHT_CONST = `1048`
const downloadBtnSelector = `a ::-p-text("Download")`
const convertAgainBtnSelector = `a ::-p-text("Convert next")`

const downloadYtMusicHandler = async (ytMusicUrlToDownload: string) => {
  // Launch browser

  //TODO: try to do in same browser tab page, just to wait for the elements to be on screen
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

  await page.goto(mp3YtWebsiteURL)
  await page.type(urlInputElementId, ytMusicUrlToDownload)

  // Try using CSS selector to click the button
  await page.click(convertBtnElementId)

  const selectDownloadBtn = await page.locator(downloadBtnSelector).waitHandle()

  selectDownloadBtn.click()

  //close the new page that was opened
  page.on("popup", async (popupPage) => {
    if (popupPage) {
      await popupPage.close()
    }
  })

  //TODO: some delay to click on convertAgainBtn when this appears
  const convertAgainBtn = await page
    .locator(convertAgainBtnSelector)
    .waitHandle()

  convertAgainBtn.click()
}

;(async () => {
  try {
    //TODO: download in specific file
    // const downloadPath = path.resolve(__dirname, "dnb")
    // console.log(downloadPath)

    //TODO: try to do with more files and add some delays between the actions if is needed
    await downloadYtMusicHandler(ytMusicUrlToDownload1)
    // await downloadYtMusicHandler(ytMusicUrlToDownload2)
    // await downloadYtMusicHandler(ytMusicUrlToDownload3)
    // ytMusicUrlToDownload.forEach((elem) => {
    //   setTimeout(async () => {
    //     if (page) {
    //       downloadYtMusicHandler(elem)
    //       console.log("starts another download after 3 seconds")
    //     }
    //   }, 3000)
    // })
  } catch (err) {
    console.error("An error occurred while automating the browser:", err)
  } finally {
  }
})()
