function openVideo () {
  document.getElementById('video-pop').style.display = 'flex'
}
function closeVideo () {
  document.getElementById('video-pop').style.display = 'none'
}
function goTop () {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
}
function logoClick () {
  window.location.href = 'https://dice.one/'
}
function vipClick () {
  window.location.href = 'https://dice.one/vip'
}
function contactClick () {
  window.location.href = 'mailto:admin@dice.one'
}
function goinClick () {
  window.location.href = 'https://dice.one/'
}
function cooperationClick () {
  window.location.href = 'https://dice.one/partners'
}
function twClick () {
  window.location.href = 'https://twitter.com/dice1_en'
}
function flyClick () {
  window.location.href = 'https://t.me/dice1_en'
}
function emailClick () {
  window.location.href = 'mailto:admin@dice.one'
}
window.onscroll = function (ele) {
  const fairJustObject = document.getElementById('fair-just').getBoundingClientRect()
  if (fairJustObject.top < window.innerHeight && fairJustObject.bottom > 0) {
    document.getElementById('shield').style.top = '0'
    document.getElementById('shield').style.opacity = '1'
    document.getElementById('shield').style.transition = 'all 1s ease-in-out'
  } else {
    document.getElementById('shield').style.top = '-100px'
    document.getElementById('shield').style.opacity = '0'
    document.getElementById('shield').style.transition = 'none'
  }
  const profitObject = document.getElementById('profit').getBoundingClientRect()
  if (profitObject.top < window.innerHeight && profitObject.bottom > 0) {
    document.getElementById('money-left').style.top = '0'
    document.getElementById('money-left').style.opacity = '1'
    document.getElementById('money-left').style.transition = 'all 1s ease-in-out'
    document.getElementById('money-right').style.top = '338px'
    document.getElementById('money-right').style.opacity = '1'
    document.getElementById('money-right').style.transition = 'all 1s ease-in-out'
    document.getElementById('fifty').style.top = '72px'
    document.getElementById('fifty').style.opacity = '1'
    document.getElementById('fifty').style.transition = 'all 1s ease-in-out'
  } else {
    document.getElementById('money-left').style.top = '-100px'
    document.getElementById('money-left').style.opacity = '0'
    document.getElementById('money-left').style.transition = 'none'
    document.getElementById('money-right').style.top = '238px'
    document.getElementById('money-right').style.opacity = '0'
    document.getElementById('money-right').style.transition = 'none'
    document.getElementById('fifty').style.top = '-28px'
    document.getElementById('fifty').style.opacity = '0'
    document.getElementById('fifty').style.transition = 'none'
  }
  const openObject = document.getElementById('open').getBoundingClientRect()
  if (openObject.top < window.innerHeight && openObject.bottom > 0) {
    document.getElementById('sifter-left').style.top = '80px'
    document.getElementById('sifter-left').style.opacity = '1'
    document.getElementById('sifter-left').style.transition = 'all 1s ease-in-out'
    document.getElementById('sifter-right').style.top = '385px'
    document.getElementById('sifter-right').style.opacity = '1'
    document.getElementById('sifter-right').style.transition = 'all 1s ease-in-out'
    document.getElementById('seven').style.top = '310px'
    document.getElementById('seven').style.opacity = '1'
    document.getElementById('seven').style.transition = 'all 1s ease-in-out'
  } else {
    document.getElementById('sifter-left').style.top = '-20px'
    document.getElementById('sifter-left').style.opacity = '0'
    document.getElementById('sifter-left').style.transition = 'none'
    document.getElementById('sifter-right').style.top = '255px'
    document.getElementById('sifter-right').style.opacity = '0'
    document.getElementById('sifter-right').style.transition = 'none'
    document.getElementById('seven').style.top = '190px'
    document.getElementById('seven').style.opacity = '0'
    document.getElementById('seven').style.transition = 'none'
  }
}