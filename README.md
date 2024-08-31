# music-downloader-app

# In order to read all songs from a playlist we need to follow the next steps to read all music from from YT:

1. read all existing items from list ( which are the first 200~ songs / 800
2. after reading all first 200's songs, we need to make a click on last item from list in order to render the next segment from whole playlist
3. after clicking and render the next list, we need to wait 5s~ to render the next songs
4. we need to repeat the first 3 steps before until we got the last page from list.

# Aterwards, we should have the whole songs as already read before, we save them as a json file.

# After we have the json file, we need to develop a method that sort the names of artists from name of songs, we need to create some pattern to identify the name of artists from a song (we should omit dupplications of the artists), also we save in another json the list with names of artists

# After we have the last result with the nedeed list, we should provide a script to sort the songs from a list, based on the list of the aritsts. We check each song from a folder if the name of that artists of that song match with our list already calculated.

# ```OPTIONAL AS BONUS~~~

# We can have another script separately in order to download all the music via https://ytmp3s.nu/6ufl/

```

```
