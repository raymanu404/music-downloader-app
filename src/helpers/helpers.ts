import { DASH, NAME_REGEX, REMIX_STRING, VIP_STRING } from "./constants"

const artistListHandler = (songName: string): string[] => {
  const nameList: string[][] = []
  const result: string[] = []

  const splitSong = songName.split(DASH)

  splitSong.forEach((item, index) => {
    if (index === 0) {
      //for first side, we just split the names
      const result = item.split(NAME_REGEX)
      nameList.push(result)
    }

    if (index === 1) {
      //for the right side of the list which includes the name of the song, we need to remove the first element from the list to omit it, we assume that the first element is the name song each time.
      const name = item
        .split(NAME_REGEX)
        .filter((x) => x !== "")
        .slice(1)

      nameList.push(name)
    }
  })

  nameList.forEach((x) => {
    //here we iterate through the list with both sides (left & right) of the song's fullName
    x.forEach((artist) => {
      //first get rid of remix word and filter by other regex
      const artistSplited = artist
        .split(REMIX_STRING)
        .filter((x) => x !== "")
        .filter((x) => x !== VIP_STRING)

      const names = artistSplited
        .flatMap((item) => item.split(" "))
        .filter((x) => x !== "")
        .filter((x) => x !== VIP_STRING)

      const finalResult = names.join(" ")
      result.push(finalResult)
    })
  })

  return result
}

export { artistListHandler }
