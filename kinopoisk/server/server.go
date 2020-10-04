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
	Login string `json:"login"`
	Email string `json:"email"`
	Password string `json:"password"`
}


var users = map[string]User{
	"AdmiralArkadiy": User{Login: "AdmiralArkadiy", Email: "chekryzhov2000@mail.ru", Password: "Arkadiy1"},
	"ErikDoter": User{Login: "ErikDoter", Email: "ErikDoter@mail.ru", Password: "commonbaby537"},
}

var ids = map[string]string{}

func main() {
	http.HandleFunc("/signup", signupPage)
	http.HandleFunc("/login", loginPage)
	http.HandleFunc("/me", isMe)
	http.HandleFunc("/whois", Whois)
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
	if l.Password == users[l.Login].Password && l.Password != ""{
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

func signupPage(w http.ResponseWriter, r *http.Request) {
	u := User{}
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if users[u.Login].Login != u.Login {
		users[u.Login] = u
		fmt.Println(users)
		http.Redirect(w, r, "/", http.StatusOK)
	} else {
		fmt.Println("hui")
		http.Redirect(w, r, "/signup", http.StatusBadRequest)
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
		user := users[login]
		u := &user
		result, _ := json.Marshal(u)
		w.Write(result)
	}
}

func Whois(w http.ResponseWriter, r *http.Request) {
	id, _ := r.Cookie("session_id")
	var login string
	if len(ids) == 0 {
		login = ""
	} else {
		login = ids[id.Value]
	}
	fmt.Println(login)
	if login == ""  {
		var u User
		u = User{"null", "null", "null"}
		result, _ := json.Marshal(&u)
		w.Write(result)
	} else {
		user := users[login]
		u := &user
		result, _ := json.Marshal(u)
		w.Write(result)
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
