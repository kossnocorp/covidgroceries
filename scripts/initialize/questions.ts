import inquirer from 'inquirer'
import { readFile, readFileSync, writeFile } from 'mz/fs'
import { resolve } from 'path'
import config from '../../bun.config'
import chalk from 'chalk'

const rootPath = process.cwd()

const isPresent = (id: string) => id.trim() !== ''

type Answers = {
  name: string
  port: number
  stagingProjectId: string
  stagingWebAPIKey: string
  stagingAuthDomain: string
  production: boolean
  productionProjectId?: string
  productionWebAPIKey?: string
  productionAuthDomain?: string
}

const appNameQuestion = {
  type: 'input',
  name: 'name',
  message: 'Enter the app name (i.e. "Awesome List")',
  validate: isPresent
}

const portQuestion = {
  type: 'number',
  name: 'port',
  message: 'Enter development server port',
  default: 4000
}

const productionQuestion = {
  type: 'confirm',
  name: 'production',
  message: 'Do you want to setup prodution environment now?',
  default: false
}

function firebaseQuestions(env: 'production' | 'staging') {
  const when = env === 'staging' || ((answers: Answers) => answers.production)
  return [
    {
      type: 'input',
      name: `${env}ProjectId`,
      message: `Enter ${env} Firebase project id`,
      validate: isPresent,
      when
    },

    {
      type: 'input',
      name: `${env}WebAPIKey`,
      message: `Enter ${env} Firebase web API key`,
      validate: isPresent,
      when
    },

    {
      type: 'input',
      name: `${env}AuthDomain`,
      message: `Enter ${env} Firebase auth domain`,
      validate: isPresent,
      when
    },

    {
      type: 'input',
      name: `${env}KeyConfirm`,
      message: `Please download service account key as secrets/keys/${env}.json in the project directory and press enter.`,
      validate: (_value: string, answers: Answers) => {
        try {
          const content = JSON.parse(
            readFileSync(resolve(rootPath, `secrets/keys/${env}.json`), 'utf8')
          )
          return (
            content.project_id ===
            answers[
              env === 'production' ? 'productionProjectId' : 'stagingProjectId'
            ]
          )
        } catch (err) {
          return false
        }
      },
      when
    }
  ]
}

async function main() {
  console.log(
    `(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ Follow ${chalk.bold.underline(
      'git.io/fjjzc'
    )} for details about each setting`
  )
  const answers = await inquirer.prompt<Answers>(
    ([appNameQuestion, portQuestion] as any[]) // TODO: How to get rid of any[]?
      .concat(firebaseQuestions('staging'))
      .concat(productionQuestion)
      .concat(firebaseQuestions('production'))
  )

  await replaceInFiles({
    [resolve(rootPath, 'app/config/index.ts')]: {
      AIzaSyAcNX2sCAlEbZ7sPWuYvt5I2NXjNP_4hMw: answers.stagingWebAPIKey,
      'staging.firebun.dev': answers.stagingAuthDomain,

      AIzaSyA7kMGa_QFHrP7Cpt_KPtgKq97eyZ0wzcg:
        answers.productionWebAPIKey || answers.stagingWebAPIKey,
      'firebun.dev': answers.productionAuthDomain || answers.stagingAuthDomain
    },

    [resolve(rootPath, 'bun.config.ts')]: {
      [config.name]: answers.name,
      [config.projects.production]: answers.productionProjectId as string,
      [config.projects.staging]: answers.stagingProjectId as string,
      '4000': answers.port.toString()
    }
  })
}

main()

type Replace = { [oldString: string]: string }

async function replaceInFiles(replaces: { [fileName: string]: Replace }) {
  return Promise.all(
    Object.keys(replaces).map(filePath =>
      replaceInFile(filePath, replaces[filePath])
    )
  )
}

async function replaceInFile(
  filePath: string,
  replace: { [oldString: string]: string }
) {
  const oldContent = await readFile(filePath, 'utf8')
  const content = Object.keys(replace).reduce(
    (contentString, oldString) =>
      contentString.replace(new RegExp(oldString, 'g'), replace[oldString]),
    oldContent
  )
  return writeFile(filePath, content)
}
