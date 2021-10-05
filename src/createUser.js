"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const createUser = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const { username } = JSON.parse(event.body);
    
    if (typeof username !== "string") {
        return {
            statusCode: 400,
            body: JSON.stringify('Invalid username. username must be a string'),
        };
    }

    const id = v4();
    const createdAt = new Date().toISOString();

    const newUser = {
        id,
        username,
        createdAt
    }

    await dynamoDB.put({
        TableName: "UsersTable",
        Item: newUser
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newUser),
    };
};

module.exports = {
  handler: createUser
}
