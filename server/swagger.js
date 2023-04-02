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
        summary: "Returns all cat posts searching by id",
        description: "Returns all cat posts searching by id containing information of each post",
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
        summary: "Returns all cat posts searching by hashtag",
        description: "Returns all cat posts containing similar hashtags",
        parameters: [
          {
            name: "hashtag",
            in: "path",
            description: "Hashtag that needs to be searched",
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
    "/api/search/{query}": {
      get: {
        summary: "Returns all cat posts with a search query",
        description: "Returns all cat posts corresponding to a search query. Query returns posts based on post's caption",
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
    "/api/adoption/all": {
      get: {
        summary: "Returns all adoption cat posts",
        description: "Returns all adoption cat posts in need of foster care",
        produces: [
          "application/json"
        ],
        responses: {
          200: {
            description: "Successful returned all posts",
            schema: {
              type: "array",
              items: {
                $ref: "#/models/Adoption"
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
    "edit/profile/update": {
      post: {
        summary: "Updates user profile information",
        description: "Updates the user profile information with given credentials",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            name: "email",
            in: "path",
            description: "Email of user provided to edit profile",
            required: true,
            type: "string"
          },
          {
            name: "username",
            in: "path",
            description: "Username of user provided to edit profile",
            required: true,
            type: "string"
          },
          {
            name: "userToken",
            in: "path",
            description: "User token generated on log in",
            required: true,
            type: "string"
          },
          
        ],
        responses: {
          201: {
            description: "successful operation",
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                },
              }
            }
          },
          403: {
            description: "Requester is not allowed to perform this action",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Forbidden access"
                },
              }
            }
          }
        }
      }
    },
    "add/post/upload": {
      post: {
        summary: "Uploads post to database",
        description: "Updates the database with new post consisted of caption and image. This will get called when user submits a post through the add post form",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            name: "file",
            in: "path",
            description: "File sent to the form",
            required: true,
            type: "string"
          },
          {
            name: "username",
            in: "path",
            description: "Username of user provided to add post",
            required: true,
            type: "string"
          },
          {
            name: "caption",
            in: "path",
            description: "Caption for new post",
            required: true,
            type: "string"
          },
          {
            name: "userToken",
            in: "path",
            description: "User token generated on log in",
            required: true,
            type: "string"
          },
          
        ],
        responses: {
          201: {
            description: "successful operation",
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                },
              }
            }
          },
          403: {
            description: "Requester is not allowed to perform this action",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Forbidden access"
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
      }
    },
    apiError: {
      type: "object",
      properties: {
        error: {
          type: "string",
          example: "data not found"
        },
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
    },
    Adoption: {
      type: "object",
      properties: {
        primary_photo_cropped: {
          type: "object",
          properties: {
            medium: {
              type: "string",
              example: "https://azure.com/medium-cat-pic.png"
            },
            large: {
              type: "string",
              example: "https://azure.com/large-cat-pic.png"
            },
            full: {
              "type": "string",
              example: "https://azure.com/full-cat-pic.png"
            }
          }
        },
        age: {
          type: "string",
          example: "5"
        },
        size: {
          type: "string",
          example: ""
        },
        coat: {
          type: "string",
          example: ""
        },
        status: {
          type: "string",
          example: ""
        },
        _id: {
          type: "string",
          example: "_0343afb21s"
        },
        id: {
          type: "string",
          example: "abc"
        },
        name: {
          type: "string",
          example: "Bee"
        },
        gender: {
          type: "string",
          example: "Female"
        },
        tags: {
          type: "array",
          items: {
            type: "string",
            example: "Affectionate"
          }
        },
        photos: {
          type: "array",
          items: {
            type: "object",
            properties: {
              small: {
                type: "string",
                example: "https://azure.com/small-cat-pic.png"
              },
              medium: {
                type: "string",
                example: "https://azure.com/medium-cat-pic.png"
              },
              large: {
                type: "string",
                example: "https://azure.com/large-cat-pic.png"
              },
              full: {
                type: "string",
                example: "https://azure.com/full-cat-pic.png"
              }
            }
          }
        }
      }

    },
  }

}