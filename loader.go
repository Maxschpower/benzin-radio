package main

import "net/http"

func LoadSong(url string) *http.Response {
	response, err := http.Get(url)

	defer response.Body.Close()

	if err != nil {
		panic(err)
	} else {
		return response
	}
}
