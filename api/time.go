package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type result struct {
	Datetime string `json:"datetime"`
}

//Handler what
func Handler(w http.ResponseWriter, r *http.Request) {
	location, err := time.LoadLocation("America/Toronto")
	if err != nil {
		panic(err)
	}
	currentTime := time.Now().In(location)
	formatted := fmt.Sprintf("%04d-%02d-%02d %02d:%02d", currentTime.Year(), currentTime.Month(), currentTime.Day(), currentTime.Hour(), currentTime.Minute())

	resp, err := json.Marshal(&result{formatted})
	log.Println(resp)
	if err != nil {
		panic(err)
	}
	w.Write(resp)

}
