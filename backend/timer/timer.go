package timer

import (
	"os"
	"strconv"
	"time"
)

func StartStreamingTimer() {
	filesDirectory := "./streaming/"
	ticker := time.NewTicker(10 * time.Second)
	iteration := 1

	go func() {
		for range ticker.C {
			file, err := os.OpenFile(filesDirectory+"segment.m3u8", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
			if err != nil {
				return
			}
			defer file.Close()

			content := "#EXTM3U\n"
			content += "#EXT-X-VERSION:3\n"
			content += "#EXT-X-TARGETDURATION:10\n"
			content += "#EXT-X-MEDIA-SEQUENCE:" + strconv.Itoa(iteration) + "\n"

			for currentIteration := iteration; currentIteration <= iteration+2; currentIteration++ {
				content += "#EXTINF:10.000000,\nsegment" + strconv.Itoa(currentIteration) + ".ts\n"
			}

			_, err = file.WriteString(content)
			if err != nil {
				return
			}

			iteration += 1
		}
	}()
}
