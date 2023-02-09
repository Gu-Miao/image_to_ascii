const qualityInput = document.getElementById('quality') as HTMLInputElement
const qualityValue = document.getElementById('quality-value') as HTMLSpanElement
const fileInput = document.getElementById('file') as HTMLInputElement
const pre = document.getElementById('preview') as HTMLPreElement

type Options = {
  quality?: number
}

qualityInput.addEventListener('input', handleQualityChange)
qualityInput.addEventListener('change', handleFileChange)

fileInput.addEventListener('change', handleFileChange)

function handleQualityChange() {
  qualityValue.innerHTML = qualityInput.value + '%'
}

async function handleFileChange() {
  const file = (fileInput.files as FileList)[0]
  const base64 = await readyAsBase64(file)
  const image = new Image()
  image.src = base64
  image.onload = () => {
    pre.innerHTML = getAscii(image, { quality: +qualityInput.value / 100 })
    console.log(1)
  }
}

function readyAsBase64(file: File): Promise<string> {
  return new Promise((reslove, reject) => {
    const reader = new FileReader()
    reader.onload = () => reslove(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function getAscii(image: HTMLImageElement, options: Options = {}) {
  const { quality = 1 } = options
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = image.width * quality
  canvas.height = image.height * quality

  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height)

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imgData.data

  const arr = ['M', 'B', 'O', 'I', '#', '?', '+', '}', ':', ',', '.', ' ']
  const lr = 255 / arr.length + 1
  const text: string[] = []

  for (let i = 0; i <= data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    const char = arr[Math.floor(avg / lr)]
    text.push(char)

    if (i % (canvas.width * 4) === 0 && i !== 0) {
      text.push('\n')
    }
  }

  canvas.remove()

  return text.join('')
}
