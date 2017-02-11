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

	user, err := util.GetCurrentBlockchainUser(stub)
	if err != nil {
		return errors.New("Error while getting user, reason" + err.Error())
	}

	project.CreatorID = user.UserID

	//marshall the trade so it can be stored in the chain.
	projectAsBytes, err := json.Marshal(project)
	if err != nil {
		return errors.New("Error in marshalling project" + err.Error())
	}

	//use the storeobject function to store the project
	util.StoreObjectInChain(stub, project.ProjectID, util.ProjecstIndexName, projectAsBytes)

	return nil
}

func GetProjects(stub shim.ChaincodeStubInterface) ([]entities.Project, error) {
	userCompany, err := util.GetCompanyByCertificate(stub)
	if err != nil {
		return []entities.Project{}, errors.New("Error while getting user company, reason: " + err.Error())
	}

	projectsIndex, err := util.GetIndex(stub, util.ProjecstIndexName)
	if err != nil {
		return []entities.Project{}, errors.New("Unable to retrieve thingsIndex, reason: " + err.Error())
	}

	projects := []entities.Project{}
	for _, projectID := range projectsIndex {
		projectAsBytes, err := stub.GetState(projectID)
		if err != nil {
			return []entities.Project{}, errors.New("Could not retrieve project for ID " + projectID + " reason: " + err.Error())
		}

		var project entities.Project
		err = json.Unmarshal(projectAsBytes, &project)
		if err != nil {
			return []entities.Project{}, errors.New("Error while unmarshalling projectAsBytes, reason: " + err.Error())
		}

		if project.Freelancer == userCompany.CompanyID || project.Client == userCompany.CompanyID {
			projects = append(projects, project)
		}
	}

	return projects, nil
}