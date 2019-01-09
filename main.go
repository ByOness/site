package main

import (
	"log"
	"net/http"
	"os"

	"github.com/ByOne/keyforplay/api"
	"github.com/ByOne/keyforplay/db"
	"github.com/ByOne/keyforplay/roots"
)

func main() {

	db.Connect()
	defer db.Close()

	r := roots.Initialize()
	if r != nil {
		port := os.Getenv("PORT")

		http.Handle("/", r)
		if err := http.ListenAndServe(":"+port, nil); err != nil {
			log.Println(err)
		}
		api.SendTest()
		log.Println("Server start port: " + port)
	}
}
