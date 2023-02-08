const pre = document.querySelector('pre') as HTMLPreElement
const canvas = document.querySelector('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

const img = new Image()
img.src = '/fighter_nenmaster_neo_buff.img/10.png'
img.onload = () => {
  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imgData.data

  console.log(imgData)

  // 1.浮点算法：Gray=R0.3+G0.59+B*0.11
  // 2.整数方法：Gray=(R30+G59+B*11)/100
  // 3.移位方法：Gray =(R76+G151+B*28)>>8;
  // 4.平均值法：Gray=（R+G+B）/3;
  // 5.仅取绿色：Gray=G；

  const arr = ['M', 'N', 'H', 'Q', '$', 'O', 'C', '?', '7', '>', '!', ':', '–', ';', '.']
  const text = []
  for (let i = 0; i <= data.length; i += 4) {
    const avg = (((data[i] + data[i + 1] + data[i + 2]) / 3) * data[i + 3]) / 255
    const char = arr[Math.floor(avg / 18)]
    text.push(char)

    if (i % (img.width * 4) === 0 && i !== 0) {
      text.push('\n')
    }
  }

  pre.innerHTML = text.join('')

  ctx.putImageData(imgData, 0, 0)
}
