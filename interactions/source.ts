const REPO = 'https://github.com/liamdebellada/smartString'
const RELEASE = 'https://github.com/liamdebellada/smartString/releases/latest'

const source = (reply: any) => reply({
  content: `hi :wave: \n> Repository: ${REPO}\n> Latest: ${RELEASE}`,
  ephemeral: true
})

export default source
