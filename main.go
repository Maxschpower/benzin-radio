package main

import (
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
			c.File("./radio.html")
		} else {
			c.File("./" + path.Join(dir, file))
		}
	})

	r.GET("/songs", getSongs)
	port := os.Getenv("PORT")
	err := r.Run(":" + port)
	if err != nil {
		panic(err)
	}
}

func getSongs(ctx *gin.Context) {
	ctx.Writer.Header().Set("Content-Type", "application/json")
	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.IndentedJSON(http.StatusOK, Songs)
}
