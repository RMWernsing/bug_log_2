import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:bugId', this.getBugById)
      .put('/:bugId', this.editBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .delete('/:bugId', this.deleteBug)
  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async getBugs(request, response, next) {
    try {
      const bug = await bugsService.getBugs()
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bug = await bugsService.getBugById(bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async editBug(request, response, next) {
    try {
      const bugData = request.body
      const bugId = request.params.bugId
      const bug = await bugsService.editBug(bugData, bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const userInfo = request.userInfo
      bugData.creatorId = userInfo.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo
      const message = await bugsService.deleteBug(bugId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}