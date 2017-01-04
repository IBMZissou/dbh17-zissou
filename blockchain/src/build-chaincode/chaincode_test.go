package main

import (
	"testing"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"encoding/json"
	"build-chaincode/entities"
)

func Test_WillReturnThatUserIsUnauthenticatedWhenUserDoesNotExist(t *testing.T) {
	scc := new(SimpleChaincode)
	resultAsBytes, err := scc.Query(shim.NewMockStub("ex02", scc), "authenticateAsClient", []string{"john", "passw0rd"})

	if err != nil {
		t.Error(err.Error())
	}

	var result entities.ConsumerAuthenticationResult
	err = json.Unmarshal(resultAsBytes, &result)
	if err != nil {
		t.Error(err.Error())
	}

	if result.Authenticated {
		t.Error("User does not exist so should not be authenticated")
	}
}

func Test_WillReturnThatUserIsAuthenticatedWhenUserExists(t *testing.T) {
	scc := new(SimpleChaincode)
	stub := shim.NewMockStub("ex02", scc)
	user := entities.Client{
		Hash: "passwordHash",
		Username: "john",
	}
	stub.State[user.Username], _ = json.Marshal(user)
	resultAsBytes, err := scc.Query(stub, "authenticateAsClient", []string{user.Username, user.Hash})

	if err != nil {
		t.Error(err.Error())
	}

	var result entities.ConsumerAuthenticationResult
	err = json.Unmarshal(resultAsBytes, &result)
	if err != nil {
		t.Error(err.Error())
	}

	if !result.Authenticated {
		t.Error("User does exists so it should be authenticated")
	}
}