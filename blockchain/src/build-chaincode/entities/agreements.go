package entities

type Agreement struct {

	Signatures            Signatures
}

type Signatures struct {
	FreelancerSignature Signature
	ClientSignature     Signature
}

type Signature struct {
	Timestamp int64
	Hash      string
	UserID    string
}