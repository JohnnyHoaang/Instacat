/**
 * Route for REST api calls
 * @author Kelsey Pereira Costa
 */
import express from "express"

const router = express.Router()

router.use(express.json())

// Returns all available posts
router.get("/posts", () => {

})

// Returns a single post based on an id
router.get("/post/:id", () => {
    
})

export default router