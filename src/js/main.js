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

const tabs = document.querySelectorAll('.tabs__item')

if (tabs.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault()

      tabs.forEach(i => i.classList.remove('active'))
      tab.classList.add('active')
    })
  })
}

const timer = document.querySelector('.timer')

const formatTimerNumber = value => {
  return value < 10 ? `0${value}` : value
}

if (timer) {
  const getTimeUntilNextDay = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const timeUntilNextDay = tomorrow - now

    const hours = Math.floor(timeUntilNextDay / (1000 * 60 * 60))
    const minutes = Math.floor(
      (timeUntilNextDay % (1000 * 60 * 60)) / (1000 * 60)
    )
    const seconds = Math.floor((timeUntilNextDay % (1000 * 60)) / 1000)

    return { hours, minutes, seconds }
  }

  const updateTimer = () => {
    const timer = getTimeUntilNextDay()

    const timerHour = document.querySelector('.timer__hour')
    const timerMinute = document.querySelector('.timer__minute')
    const timerSecond = document.querySelector('.timer__second')

    timerHour.textContent = formatTimerNumber(timer.hours)
    timerMinute.textContent = formatTimerNumber(timer.minutes)
    timerSecond.textContent = formatTimerNumber(timer.seconds)
  }

  setInterval(updateTimer, 1000)

  updateTimer()
}
