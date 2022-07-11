package routing

import (
	"benzin-radio/domain"
	"log"
	"time"
)

func GetCurrentSong() domain.ApiSong {
	var year, month, day = time.Now().UTC().Date()
	var beginning = time.Date(year, month, day, 0, 0, 0, 0, time.UTC).Unix()
	var now = time.Now().UTC().Unix()
	var difference = now - beginning
	var totalPlaylistLength = domain.GetTotalTime()
	var seekToPosition = uint32(difference % totalPlaylistLength)
	log.Default().Println(beginning, now, difference, seekToPosition, totalPlaylistLength)

	var currentPosition uint32 = 0
	var timestamp uint32 = 0
	var song domain.Song
	for _, currentSong := range domain.Songs {
		var songDuration = uint32(currentSong.Duration)
		if currentPosition+songDuration < seekToPosition {
			currentPosition += songDuration
		} else {
			song = currentSong
			timestamp = seekToPosition - currentPosition
			break
		}
	}
	log.Default().Println(song, timestamp)
	return domain.ApiSong{Song: song, Timestamp: int(timestamp)}
}
