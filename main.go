package main

import (
	"benzin-radio/routing"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"path"
	"path/filepath"
)

func main() {
	r := gin.Default()
	r.NoRoute(func(c *gin.Context) {
		dir, file := path.Split(c.Request.RequestURI)
		ext := filepath.Ext(file)
		if file == "" || ext == "" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
			c.File("./radio.html")
		} else {
			c.File("./" + path.Join(dir, file))
		}
	})

	r.GET("/radio", getCurrentSong)
	port := os.Getenv("PORT")
	err := r.Run(":" + port)
	if err != nil {
		panic(err)
	}
}

func getCurrentSong(ctx *gin.Context) {
	var song = routing.GetCurrentSong()

	ctx.Writer.Header().Set("Content-Type", "application/json")
	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
	ctx.IndentedJSON(http.StatusOK, song)
}
