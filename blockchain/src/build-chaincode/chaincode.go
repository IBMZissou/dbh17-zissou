package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"os"
	"build-chaincode/util"
	"build-chaincode/entities"
	"build-chaincode/invokeAndQuery"
)

var logger = shim.NewLogger("zissou")
//======================================================================================================================
//	 Structure Definitions
//======================================================================================================================
//	SimpleChaincode - A blank struct for use with Shim (An IBM Blockchain included go file used for get/put state
//					  and other IBM Blockchain functions)
//==============================================================================================================================
type Chaincode struct {
}

//======================================================================================================================
//	Invoke - Called on chaincode invoke. Takes a function name passed and calls that function. Passes the
//  		 initial arguments passed are passed on to the called function.
//======================================================================================================================

func (t *Chaincode) Invoke(stub shim.ChaincodeStubInterface, functionName string, args []string) ([]byte, error) {
	logger.Infof("Invoke is running " + functionName)

	if functionName == "init" {
		return t.Init(stub, "init", args)
	} else if functionName == "resetIndexes" {
		return nil, util.ResetIndexes(stub, logger)
	} else if functionName == "addUser" {
		return nil, t.addUser(stub, args[0], args[1])
	} else if functionName == "addTestdata" {
		return nil, t.addTestdata(stub, args[0])
	} else if functionName == "createProject" {
		err := invokeAndQuery.CreateProject(stub, args[0])
		if err != nil {
			return nil, err
		}

		timeStamp := util.StringToDate(args[2])
		err = invokeAndQuery.SignAgreement(stub, args[1], timeStamp)
		if err != nil {
			return nil, err
		}

		return nil, nil
	} else if functionName == "signAgreement" {
		projectID := args[0]
		timeStamp := util.StringToDate(args[1])

		err := invokeAndQuery.SignAgreement(stub, projectID, timeStamp)
		if err != nil {
			return nil, err
		}

		return nil, nil
	}

	return nil, errors.New("Received unknown invoke function name")
}

//======================================================================================================================
//	Query - Called on chaincode query. Takes a function name passed and calls that function. Passes the
//  		initial arguments passed are passed on to the called function.
//=================================================================================================================================
func (t *Chaincode) Query(stub shim.ChaincodeStubInterface, functionName string, args []string) ([]byte, error) {
	logger.Infof("Query is running " + functionName)

	result, err := t.GetQueryResult(stub, functionName, args)
	if err != nil {
		return nil, err
	}

	return json.Marshal(result)
}

func (t *Chaincode) GetQueryResult(stub shim.ChaincodeStubInterface, functionName string, args []string) (interface{}, error) {
	if functionName == "getUser" {
		user, err := util.GetUser(stub, args[0])
		if err != nil {
			return nil, err
		}

		return user, nil
	} else if functionName == "authenticateAsUser" {
		user, err := util.GetUser(stub, args[0])
		if err != nil {
			logger.Infof("User with id %v not found.", args[0])
		}

		return t.authenticateAsUser(stub, user, args[1]), nil
	} else if functionName == "getCompanyByCertificate" {
		company, err := util.GetCompanyByCertificate(stub)
		if err != nil {
			return nil, errors.New("could not retrieve company, reason: " + err.Error())
		}

		return company, nil
	} else if functionName == "getProjects" {
		userCompany, err := util.GetCompanyByCertificate(stub)
		if err != nil {
			return []entities.Project{}, errors.New("Error while getting user company, reason: " + err.Error())
		}

		if userCompany.CompanyType == "tax" {
			projects, err := invokeAndQuery.GetProjectsForTax(stub)
			if err != nil {
				return nil, errors.New("could not retrieve company, reason: " + err.Error())
			}
			return projects, nil
		} else {
			projects, err := invokeAndQuery.GetProjectsForCompanies(stub)
			if err != nil {
				return nil, errors.New("could not retrieve company, reason: " + err.Error())
			}
			return projects, nil
		}
	} else if functionName == "getProjectByID" {
		project, err := invokeAndQuery.GetProjectByID(stub, args[0])
		if err != nil {
			return nil, errors.New("could not retrieve project, reason: " + err.Error())
		}

		return project, nil
	}

	return nil, errors.New("Received unknown query function name")
}

//======================================================================================================================
//  Main - main - Starts up the chaincode
//======================================================================================================================

func main() {
	// LogDebug, LogInfo, LogNotice, LogWarning, LogError, LogCritical (Default: LogDebug)
	logger.SetLevel(shim.LogInfo)

	logLevel, _ := shim.LogLevel(os.Getenv("SHIM_LOGGING_LEVEL"))
	shim.SetLoggingLevel(logLevel)

	err := shim.Start(new(Chaincode))
	if err != nil {
		fmt.Printf("Error starting SimpleChaincode: %s", err)
	}
}

//======================================================================================================================
//  Init Function - Called when the user deploys the chaincode
//======================================================================================================================

func (t *Chaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	return nil, nil
}

//======================================================================================================================
//  Invoke Functions
//======================================================================================================================

func (t *Chaincode) addUser(stub shim.ChaincodeStubInterface, index string, userJSONObject string) error {
	id, err := util.WriteIDToBlockchainIndex(stub, util.UsersIndexName, index)
	if err != nil {
		return errors.New("Error creating new id for user " + index)
	}

	err = stub.PutState(string(id), []byte(userJSONObject))
	if err != nil {
		return errors.New("Error putting user data on ledger")
	}

	return nil
}

func (t *Chaincode) addTestdata(stub shim.ChaincodeStubInterface, testDataAsJson string) error {
	var testData entities.TestData
	err := json.Unmarshal([]byte(testDataAsJson), &testData)
	if err != nil {
		return errors.New("Error while unmarshalling testdata")
	}

	for _, user := range testData.Users {
		userAsBytes, err := json.Marshal(user);
		if err != nil {
			return errors.New("Error marshalling testUser, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, user.UserID, util.UsersIndexName, userAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}
	}

	for _, company := range testData.Companies {
		companyAsBytes, err := json.Marshal(company);
		if err != nil {
			return errors.New("Error marshalling company, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, company.CompanyID, util.CompaniesIndexName, companyAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}
	}

	for _, project := range testData.Projects {
		projectAsBytes, err := json.Marshal(project);
		if err != nil {
			return errors.New("Error marshalling project, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, project.ProjectID, util.ProjectsIndexName, projectAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}
	}

	return nil
}

//======================================================================================================================
//		Query Functions
//======================================================================================================================

func (t *Chaincode) authenticateAsUser(stub shim.ChaincodeStubInterface, user entities.User, passwordHash string) (entities.UserAuthenticationResult) {
	if user == (entities.User{}) {
		fmt.Println("User not found")
		return entities.UserAuthenticationResult{
			User: user,
			Authenticated: false,
		}
	}

	if user.Hash != passwordHash {
		fmt.Println("Hash does not match")
		return entities.UserAuthenticationResult{
			User: user,
			Authenticated: false,
		}
	}

	return entities.UserAuthenticationResult{
		User: user,
		Authenticated: true,
	}
}
