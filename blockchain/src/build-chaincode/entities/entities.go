package entities

type TestData struct {
	Users     []User     	`json:"users"`
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
	CompanyType	string	`json:"companyType"`
}

type Project struct {
	ProjectID	string	`json:"projectID"`
	ProjectName	string	`json:"projectName"`
	Freelancer	string	`json:"freelancer"`
	Client		string	`json:"client"`
	StartDate	int64	`json:"startDate"`
	EndDate		int64	`json:"endDate"`
	Budget		float64	`json:"budget"`
	PaymentType	string	`json:"paymentType"`
	PaymentTrigger	string	`json:"paymentTrigger"`
	PaymentComments	string	`json:"paymentComments"`
	BillingMethod	string	`json:"billingMethod"`
	Description	string	`json:"description"`
	Deliverables	string	`json:"deliverables"`
	JobRequirements	[]string `json:"jobRequirements"`
	Location	string	`json:"location"`
	HoursPerWeek	int	`json:"hoursPerWeek"`
	CreatorID	string	`json:"creatorID"`
	Status		string	`json:"status"`
	LastUpdated	int64	`json:"lastUpdated"`
	Signatures	Signatures
}

type Signatures struct {
	SignedByBothParties bool
	FreelancerSignature Signature
	ClientSignature     Signature
}

type Signature struct {
	Timestamp int64
	Hash      string
	UserID    string
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
