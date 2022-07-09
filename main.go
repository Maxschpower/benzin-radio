package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
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

	err := r.Run(":3000")
	if err != nil {
		panic(err)
	}
}

func getSongs(ctx *gin.Context) {
	ctx.IndentedJSON(http.StatusOK, Songs)
}
