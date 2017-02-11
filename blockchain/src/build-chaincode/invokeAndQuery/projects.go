package invokeAndQuery

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"build-chaincode/entities"
	"encoding/json"
	"errors"
	"build-chaincode/util"
)

func CreateProject(stub shim.ChaincodeStubInterface, projectAsJson string) error {
	var project entities.Project
	err := json.Unmarshal([]byte(projectAsJson), &project)
	if err != nil {
		return errors.New("Error while unmarshalling trade, reason: " + err.Error())
	}

	// check if ProjectID exists, if not, the project cant be stored in the chaincode
	if project.ProjectID == "" {
		return errors.New("ProjectID is empty")
	}

	// check if current user belongs to either the freelancer or the client
	userCompany, err := util.GetCompanyByCertificate(stub)
	if err != nil {
		return errors.New("Error while getting user company, reason: " + err.Error())
	}

	if userCompany.CompanyID != project.Freelancer || userCompany.CompanyID != project.Client {
		return errors.New("Current user doesn't belong to either the client or freelancer company")
	}

	//marshall the trade so it can be stored in the chain.
	projectAsBytes, err := json.Marshal(project)
	if err != nil {
		return errors.New("Error in marshalling project" + err.Error())
	}

	//use the storeobject function to store the project
	util.StoreObjectInChain(stub, project.ProjectID, util.ProjecstIndexName, projectAsBytes)

	return nil
}