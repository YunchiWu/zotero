import { readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const inject = ['skills']

const description = 'Use Zotero Desktop from DeepSeek Harness to search a local library, list items, collections and tags, export BibTeX, insert citations, read indexed attachment text, and import BibTeX/RIS records.'
const skillPath = fileURLToPath(new URL('./skills/zotero/SKILL.md', import.meta.url))

function readSkillBody() {
  const source = readFileSync(skillPath, 'utf8')
  const frontmatter = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  if (!frontmatter) {
    throw new Error(`Zotero skill is missing YAML frontmatter: ${skillPath}`)
  }
  return source.slice(frontmatter[0].length)
}

export function apply(ctx) {
  return ctx.skills.register({
    name: 'zotero',
    description,
    whenToUse: 'Use when the user mentions Zotero, citations, references.bib, BibTeX, the local Zotero API, localhost:23119, or adding references from a Zotero library.',
    content: readSkillBody(),
    path: skillPath,
    resourceBase: {
      kind: 'directory',
      path: dirname(skillPath),
    },
    source: 'bundled',
    invocation: {
      modelInvocable: true,
      userInvocable: true,
    },
  })
}
