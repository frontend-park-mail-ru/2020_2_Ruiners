package main

import (
    "encoding/json"
    "fmt"
	"html/template"
	"log"
	"net/http"
	"time"

	"github.com/lithammer/shortuuid"
)

type Login struct {
	Login string
	Password string
}

type User struct {
	login string
	email string
	password string
}

var users = map[string]User{
	"AdmiralArkadiy": User{login: "AdmiralArkadiy", email: "chekryzhov2000@mail.ru", password: "Arkadiy1"},
	"ErikDoter": User{login: "ErikDoter", email: "ErikDoter@mail.ru", password: "commonbaby537"},
}

var ids = map[string]string{}

func main() {
	http.HandleFunc("/login", loginPage)
	http.HandleFunc("/me", isMe)
	//http.HandleFunc("/logout", logoutPage)
	http.HandleFunc("/", mainPage)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("../public"))))
	fmt.Println("starting server at :3000")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func mainPage(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseGlob("../public/*.html"))
	err := tmpl.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func loginPage(w http.ResponseWriter, r *http.Request) {
	l := Login{}
	expiration := time.Now().Add(10 * time.Hour)
	err := json.NewDecoder(r.Body).Decode(&l)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if l.Password == users[l.Login].password {
		fmt.Println(l)
		var id = shortuuid.New()
		ids[id] = l.Login
		cookie := http.Cookie{
			Name:    "session_id",
			Value: id,
			Expires: expiration,
			HttpOnly: true,
		}

		http.SetCookie(w, &cookie)
		http.Redirect(w, r, "/", http.StatusOK)
	} else {
		fmt.Println("hui")
		http.Redirect(w, r, "/login", http.StatusBadRequest)
	}
}

func isMe(w http.ResponseWriter, r *http.Request) {
	id, _ := r.Cookie("session_id")
	login := ids[id.Value]
	fmt.Println(login)
	if login == ""  {
		fmt.Println("401")
		http.Redirect(w, r, "/login", 401)
	} else {
		fmt.Println("200")
		http.Redirect(w, r, "/profile", 200)
	}
}

/*func logoutPage(w http.ResponseWriter, r *http.Request)  {
	session, err := r.Cookie("session_id")
	if err == http.ErrNoCookie {
		http.Redirect(w, r, "/", http.StatusFound)
		return
	}

	session.Expires = time.Now().AddDate(0, 0, -1)
	http.SetCookie(w, session)

	http.Redirect(w, r, "/", http.StatusFound)
}*/
