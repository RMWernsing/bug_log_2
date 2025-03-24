import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class BugsService {

  async getBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator')
    if (bug == null) {
      throw new BadRequest(`Invalid Bug ID: ${bugId}`)
    }
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }
}

export const bugsService = new BugsService()