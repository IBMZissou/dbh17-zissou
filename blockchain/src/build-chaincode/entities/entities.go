package entities

type TestData struct {
	Users     []User     	`json:"users"`
	Things    []Thing  	`json:"things"`
	Companies []Company  	`json:"companies"`
}

type TestDataElement interface {
	ID() string
}

type User struct {
	TestDataElement 	`json:"-"`
	UserID   	string 	`json:"userID"`
	FirstName 	string 	`json:"firstName"`
	LastName 	string 	`json:"lastName"`
	Salt     	string 	`json:"salt"`
	Hash     	string 	`json:"hash"`
	CompanyID	string	`json:"companyID"`
}

type Company struct {
	TestDataElement 	`json:"-"`
	CompanyID   	string 	`json:"companyID"`
	Name	 	string 	`json:"name"`
}

type Thing struct {
	TestDataElement    	`json:"-"`
	ThingID      	string 	`json:"thingID"`
	SomeProperty 	string 	`json:"someProperty"`
	UserID    	string 	`json:"userID"`
}

type UserAuthenticationResult struct {
	User        	User
	Authenticated 	bool
}

type Users struct {
	Users []User `json:"users"`
}

func (t *User) ID() string {
	return t.UserID
}

func (t *Thing) ID() string {
	return t.ThingID
}