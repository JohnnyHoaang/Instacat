export default {
  swagger: "2.0",
  info: {
    description: "This is the official API of Instacat.",
    version: "1.0.0",
    title: "InstaCat API",
  },
  host: "localhost:8080",
  basePath: "/",
  paths: {
    "/api/cat/all": {
      get: {
        summary: "Returns all cat posts",
        description: "Returns all cat posts containing information of each post",
        produces: [
          "application/json"
        ],
        responses: {
          200: {
            description: "Successful returned all posts",
            schema: {
              type: "array",
              items: {
                $ref: "#/models/Post"
              }
            }
          },
          404: {
            description: "Data has not been found",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "data not found"
                },
              }
            }

          }
        }
      }
    },
    "/api/cat/id/{id}": {
      get: {
        summary: "Returns all cat posts",
        description: "Returns all cat posts containing information of each post",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Post id that needs to be searched",
            required: true,
            type: "string"
          }
        ],
        produces: [
          "application/json"
        ],
        responses: {
          200: {
            description: "Successful returned all posts",
            schema: {
              type: "array",
              items: {
                $ref: "#/models/Post"
              }
            }
          },
          404: {
            description: "Data has not been found",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "data not found"
                },
              }
            }

          }
        }
      }
    },
    "/api/hashtag/{hashtag}": {
      get: {
        summary: "Returns all cat posts",
        description: "Returns all cat posts containing information of each post",
        produces: [
          "application/json"
        ],
        responses: {
          200: {
            description: "Successful returned all posts",
            schema: {
              type: "array",
              items: {
                $ref: "#/models/Post"
              }
            }
          },
          404: {
            description: "Data has not been found",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "data not found"
                },
              }
            }

          }
        }
      }
    },
    "/api/search/{query}": {
      get: {
        summary: "Returns all cat posts",
        description: "Returns all cat posts containing information of each post",
        produces: [
          "application/json"
        ],
        responses: {
          200: {
            description: "Successful returned all posts",
            schema: {
              type: "array",
              items: {
                $ref: "#/models/Post"
              }
            }
          },
          404: {
            description: "Data has not been found",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "data not found"
                },
              }
            }

          }
        }
      }
    },
    todob: {
      delete: {
        summary: "Delete the task",
        description: "Delete the task",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "task id that needs to be deleted",
            required: true,
            type: "string"
          }
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse"
              }
            }
          },
          400: {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse"
            }
          }
        }
      }
    }
  },
  models: {
    Post: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "a1"
        },
        username: {
          type: "string",
          example: "cat"
        },
        image: {
          type: "string",
          example: "https://azure/cat-image.png"
        },
        caption: {
          type: "string",
          example: "This is a caption",
        },
        hashtags: {
          type: "array",
          items: {
            type: "string",
            example: ["#cat", "#interesting"]
          }
        },
        likes: {
          type: "number",
        },
        likers: {
          type: "array",
          items: {
            type: "string",
            example: ["Bob", "Alice"]
          }

        },
        comments: {
          type: "array",
          items: {
            type: "object",
            properties: {
              username: {
                type: "string",
                example: "Bob"
              },
              comment: {
                type: "string",
                example: "Bob commented"
              },
            }
          }
        },
        // comments: [{
        //   username: { type: "string" },
        //   comment: { type: "string" },
        // }],
      }
    },
    Task: {
      type: "object",
      properties: {
        task: {
          type: "string"
        },
        assignee: {
          type: "string"
        },
        status: {
          type: "string"
        }
      }
    },
    InvalidResponse: {
      type: "object",
      properties: {
        statusCode: {
          type: "string"
        },
        message: {
          type: "string"
        }
      }
    }
  }
}