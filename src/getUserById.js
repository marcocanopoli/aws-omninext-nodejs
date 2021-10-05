"use strict";

const AWS = require("aws-sdk");

const getUserById = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;

    let user;

    try {
      const result = await dynamoDB.get({
        TableName: "UsersTable",
        Key: { id }
      }).promise();
      user = result.Item;
    } catch (error) {
        console.error(error);
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify(user),
    };
};

module.exports = {
  handler: getUserById
}
