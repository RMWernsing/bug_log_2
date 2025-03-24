import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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

  async editBug(bugData, bugId) {
    const bugToUpdate = await this.getBugById(bugId)
    bugToUpdate.title = bugData.title ?? bugToUpdate.title
    bugToUpdate.description = bugData.description ?? bugToUpdate.description
    bugToUpdate.save()
    return bugToUpdate
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }

  async deleteBug(bugId, userInfo) {
    const bug = await this.getBugById(bugId)

    if (bug.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT DELETE THIS ${userInfo.nickname}`)
    }
    await bug.deleteOne()
    return `Your bug was deleted`
  }
}

export const bugsService = new BugsService()