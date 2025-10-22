export default () => {
  const targetButton = document.getElementById('highlight')
  const sidebar = document.querySelector('.sidebar')

  // window.addEventListener('click', () => {
  //   highlightAll()
  // })

  function highlightAll() {
    const allTargets = document.querySelectorAll(
      'button:not(#highlight), a:not(#highlight)'
    )

    allTargets.forEach(target => {
      if (window.getComputedStyle(target).position === 'absolute') {
        console.log(target, 'skipped one item')
      } else {
        target.style.position = 'relative'
      }

      const newSpan = document.createElement('span')
      const newSidebarItem = document.createElement('div')

      newSpan.classList.add('target-info')

      let elmWidth = Math.round(target.getBoundingClientRect().width)
      let elmHeight = Math.round(target.getBoundingClientRect().height)

      newSpan.textContent = elmWidth + 'x' + elmHeight

      if (elmWidth === 0) {
        console.log(target)
      }

      if ((elmWidth > 44) & (elmHeight > 44)) {
        target.style.outline = 'solid 1px green'
      } else {
        target.style.outline = 'solid 2px red'
      }

      target.appendChild(newSpan)
    })
  }
}
