package entities

type DesignAssignmentsModelAgreement struct {
	Header                Header
	Entities              Entities
	Details               Details
	AssignmentDescription AssignmentDescription
	Signatures            Signatures
}

type Header struct {
	TaxEvaluationNumber string
	TaxEvaluationDate   int
	Title               string
	SubHeader           string
}

type Entities struct {
	Client     Client
	Freelancer Freelancer
}

type Client struct {
	Entity
	Representative     string
	RepresentativeRole string
}

type Freelancer struct {
	Entity
}

type Entity struct {
	Name           string
	City           string
	Street         string
	CityRegistered string
	KvkNumber      string
}

type Details struct {
	FieldOfExpertise string
	FreelancerSince  string
	JobRole          string
}

type AssignmentDescription struct {
	Deliverables string
}

type Signatures struct {
	ClientSignature     Signature
	FreelancerSignature Signature
}

type Signature struct {
	Timestamp int
	Hash      string
	UserID    string
}
