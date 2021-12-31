import htmlToImage from 'node-html-to-image'

interface options {
  [key: string]: any
}

const bufferFromHtml = async (html: string, options: options): Promise<Buffer> => {
  const buffer = await htmlToImage({
    html,
    content: { ...options }
  })

  return (buffer as Buffer)
}

export default bufferFromHtml
