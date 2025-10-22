const burger = document.querySelector('.ui .burger')

if (burger) {
  burger.addEventListener('click', e => {
    e.preventDefault()

    burger.classList.toggle('active')
  })
}

const headerBurger = document.querySelector('.header__burger')
const headerMenu = document.querySelector('.header__menu')

if (headerBurger && headerMenu) {
  headerBurger.addEventListener('click', e => {
    e.preventDefault()

    document.body.style.overflow = headerBurger.classList.contains('active')
      ? ''
      : 'hidden'

    headerBurger.classList.toggle('active')
    headerMenu.classList.toggle('active')
  })
}

console.log(document.querySelector('img'))

fetch(document.querySelector('img').src)
  .then(response => response.blob())
  .then(blob => {
    var fileSizeInBytes = blob.size
    var fileSizeInKB = fileSizeInBytes / 1024

    console.log('Размер изображения в килобайтах:', fileSizeInKB + ' KB')
  })
  .catch(error => {
    console.error('Произошла ошибка при загрузке изображения:', error)
  })

// if (window.location.pathname === '/ui.html') {
//   document.querySelectorAll('.ui__content').forEach((i, index) => {
//     i.style.display = index === 0 ? '' : 'none'
//   })
// }

document.querySelectorAll('.ui__aside a').forEach(i => {
  i.addEventListener('click', e => {
    if (e.target.getAttribute('href') === '#all') {
      document
        .querySelectorAll('.ui__content')
        .forEach(i => (i.style.display = ''))
    } else {
      document.querySelectorAll('.ui__content').forEach((i, index) => {
        i.style.display =
          i.getAttribute('id') === e.target.getAttribute('href').substring(1)
            ? ''
            : 'none'

        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 0)
      })
    }
  })
})

const calc = () => {
  const first = document.querySelector('#first').value
  const second = parseInt(document.querySelector('#second').value)

  document.querySelector('#three').textContent = `
mkdir dist
find src/${first} -type f -name "*.png" -exec sh -c '
for img; do
  relative_path=$(dirname "$img#src/")
  mkdir -p "dist/$relative_path"
  
  newname=$(basename "$img" .png)
  convert "$img" -resize ${second} "dist/${first}/$newname.avif"
  convert "$img" -resize ${second * 2} "dist/${first}/$newname-2x.avif"
  convert "$img" -resize ${second * 3} "dist/${first}/$newname-3x.avif"
  convert "$img" -resize ${second} "dist/${first}/$newname.jpg"
  convert "$img" -resize ${second * 2} "dist/${first}/$newname-2x.jpg"
  convert "$img" -resize ${second * 3} "dist/${first}/$newname-3x.jpg"
  convert "$img" -resize ${second} "dist/${first}/$newname.webp"
  convert "$img" -resize ${second * 2} "dist/${first}/$newname-2x.webp"
  convert "$img" -resize ${second * 3} "dist/${first}/$newname-3x.webp"
done
' sh {} +`
}

if (document.querySelector('#first')) {
  document.querySelector('#first').addEventListener('input', calc)
  document.querySelector('#second').addEventListener('input', calc)
}
