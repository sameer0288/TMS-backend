const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB();
require("dotenv").config();

exports.handler = async (event) => {
  const taskData = JSON.parse(event.body);

  // Validate task data (example: ensure title is not empty)
  if (!taskData.title) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Title cannot be empty" }),
    };
  }

  // Save validated task data to DynamoDB
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      // Add DynamoDB attributes based on your data model
      // Example:
      title: { S: taskData.title },
      description: { S: taskData.description },
      dueDate: { S: taskData.dueDate },
    },
  };

  try {
    await dynamoDB.putItem(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task data validated and saved" }),
    };
  } catch (error) {
    console.error("Error saving task data to DynamoDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
