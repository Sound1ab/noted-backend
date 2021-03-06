import {
  GithubUser,
  QueryReadGithubUserAccessTokenArgs,
} from '../resolvers-types'
import { JwtManager, UserManager } from '../services'
import { addCookie, encrypt } from '../utils'

import { ConfigurationManager } from '../services/configuration/ConfigurationManager'
import { IContext } from '../server'

const jwtManager = new JwtManager()

export const UserQueries = {
  async readGithubUserAccessToken(
    _: any,
    { code, state }: QueryReadGithubUserAccessTokenArgs,
    { context, ...rest }: IContext
  ): Promise<string> {
    const userManager = new UserManager(rest)

    const accessToken = await userManager.readGithubUserAccessToken(code, state)

    const owner = await userManager
      .initOctokitWithAccessToken(accessToken)
      .readUser()

    const { value, iv } = encrypt(accessToken)

    const jwt = jwtManager.createJwtWithToken(value, iv, owner).compact()

    const refreshToken = jwtManager.createRefreshToken()

    await jwtManager.addClient(refreshToken, value, iv)

    addCookie(context, 'refreshToken', refreshToken)

    return jwt
  },
  async readGithubUser(
    _0: any,
    _1: any,
    context: IContext
  ): Promise<GithubUser> {
    const userManager = new UserManager(context)

    const { id, login, ...rest } = await userManager.readUser()

    const configurationManager = new ConfigurationManager(login)

    const configuration = await configurationManager.readConfiguration()

    return { id, login, configuration, ...rest }
  },
}
