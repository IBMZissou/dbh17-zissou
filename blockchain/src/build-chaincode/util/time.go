package util

import (
	"strconv"
	"fmt"
)

func StringToDate(stringToConvert string) int64 {
	dateAsInt, err := strconv.ParseInt(stringToConvert, 10, 64)
	if err != nil {
		fmt.Println("could not parse time, reason: " + err.Error())
		return 0
	}

	return dateAsInt
}