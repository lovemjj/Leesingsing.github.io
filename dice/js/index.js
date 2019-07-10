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
  if (fairJustObject.top < window.innerHeight + 100 && fairJustObject.bottom > 100) {
    document.getElementById('shield').style.top = '0'
    document.getElementById('shield').style.opacity = '1'
    document.getElementById('shield').style.transition = 'all 1s ease-in-out'
  } else {
    document.getElementById('shield').style.top = '-100px'
    document.getElementById('shield').style.opacity = '0'
    document.getElementById('shield').style.transition = 'none'
  }
  const profitObject = document.getElementById('profit').getBoundingClientRect()
  if (profitObject.top < window.innerHeight + 100 && profitObject.bottom > 100) {
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
  if (openObject.top < window.innerHeight + 100 && openObject.bottom > 100) {
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
  const distributedObject = document.getElementById('distributed').getBoundingClientRect()
  if (distributedObject.top < window.innerHeight + 100 && distributedObject.bottom > 100) {
    document.getElementById('distributed').style.opacity = '1'
    document.getElementById('distributed').style.transition = 'all 1.5s ease-in-out'
  } else {
    document.getElementById('distributed').style.opacity = '0'
    document.getElementById('distributed').style.transition = 'none'
  }
}
let dataId = ''
function dataOnmouseover (id) {
  document.getElementById('pie-chart').style.width = '260px'
  document.getElementById('pie-chart').style.height = '160px'
  document.getElementById('pie-chart').style.margin = '0 10px'
  document.getElementById('pie-chart').style.fontWeight = '400'
  document.getElementById('pie-chart').style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.2)'
  document.getElementById('pie-chart').style.paddingBottom = '25px'
  document.getElementById('day').style.width = '260px'
  document.getElementById('day').style.height = '160px'
  document.getElementById('day').style.margin = '0 10px'
  document.getElementById('day').style.fontWeight = '400'
  document.getElementById('day').style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.2)'
  document.getElementById('day').style.paddingBottom = '25px'
  document.getElementById('month').style.width = '260px'
  document.getElementById('month').style.height = '160px'
  document.getElementById('month').style.margin = '0 10px'
  document.getElementById('month').style.fontWeight = '400'
  document.getElementById('month').style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.2)'
  document.getElementById('month').style.paddingBottom = '25px'
  document.getElementById('pie-chart-main').style.opacity = '0.4'
  document.getElementById('day-main').style.opacity = '0.4'
  document.getElementById('month-main').style.opacity = '0.4'
  document.getElementById(id).style.width = '270px'
  document.getElementById(id).style.height = '180px'
  document.getElementById(id).style.margin = '0 5px'
  document.getElementById(id).style.fontWeight = '900'
  document.getElementById(id).style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.3)'
  document.getElementById(id).style.paddingBottom = '30px'
  document.getElementById(id + '-main').style.opacity = '1'
  if (dataId !== '') {
    document.getElementById(dataId).style.width = '270px'
    document.getElementById(dataId).style.height = '180px'
    document.getElementById(dataId).style.margin = '0 5px'
    document.getElementById(dataId).style.fontWeight = '900'
    document.getElementById(dataId).style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.3)'
    document.getElementById(dataId).style.paddingBottom = '30px'
    document.getElementById(dataId + '-main').style.opacity = '1'
  }
}
function dataOnmouseout (id) {
  document.getElementById('pie-chart').style.width = '260px'
  document.getElementById('pie-chart').style.height = '160px'
  document.getElementById('pie-chart').style.margin = '0 10px'
  document.getElementById('pie-chart').style.fontWeight = '400'
  document.getElementById('pie-chart').style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.2)'
  document.getElementById('pie-chart').style.paddingBottom = '25px'
  document.getElementById('day').style.width = '260px'
  document.getElementById('day').style.height = '160px'
  document.getElementById('day').style.margin = '0 10px'
  document.getElementById('day').style.fontWeight = '400'
  document.getElementById('day').style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.2)'
  document.getElementById('day').style.paddingBottom = '25px'
  document.getElementById('month').style.width = '260px'
  document.getElementById('month').style.height = '160px'
  document.getElementById('month').style.margin = '0 10px'
  document.getElementById('month').style.fontWeight = '400'
  document.getElementById('month').style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.2)'
  document.getElementById('month').style.paddingBottom = '25px'
  if (dataId === '') {
    document.getElementById('pie-chart-main').style.opacity = '1'
    document.getElementById('day-main').style.opacity = '1'
    document.getElementById('month-main').style.opacity = '1'
  } else {
    document.getElementById('pie-chart-main').style.opacity = '0.4'
    document.getElementById('day-main').style.opacity = '0.4'
    document.getElementById('month-main').style.opacity = '0.4'
    document.getElementById(dataId).style.width = '270px'
    document.getElementById(dataId).style.height = '180px'
    document.getElementById(dataId).style.margin = '0 5px'
    document.getElementById(dataId).style.fontWeight = '900'
    document.getElementById(dataId).style.boxShadow = '0px 14px 38px rgba(87, 111, 159, 0.3)'
    document.getElementById(dataId).style.paddingBottom = '30px'
    document.getElementById(dataId + '-main').style.opacity = '1'
  }
}
let pieChartId = 'pie-chart-0'
function selectData (id) {
  document.getElementById('data-list').style.display = 'block'
  document.getElementById('pie-chart-list').style.display = 'none'
  document.getElementById('day-list').style.display = 'none'
  document.getElementById('month-list').style.display = 'none'
  document.getElementById('pie-chart-nav-list').style.display = 'none'
  document.getElementById('day-nav-list').style.display = 'none'
  document.getElementById('month-nav-list').style.display = 'none'
  document.getElementById(id + '-list').style.display = 'block'
  document.getElementById(id + '-nav-list').style.display = 'flex'
  if (id === 'pie-chart') {
    selectPieChartId(pieChartId)
    document.getElementById('flag-list').style.display = 'block'
  }
  if (id === 'month') {
    document.getElementById('flag-list').style.display = 'block'
  }
  if (id === 'day') {
    document.getElementById('flag-list').style.display = 'none'
  }
  if (dataId === '') {
    setTimeout(() => {
      document.getElementById('data-list').style.maxHeight = '1200px'
    }, 50)
    setTimeout(() => {
      document.getElementById('data-list').style.overflow = 'visible'
    }, 350)
  }
  dataId = id
  if (document.getElementById('money-list').style.display === 'block') {
    pullMoneyList()
  }
  dataOnmouseout()
}
function closeDataList () {
  dataId = ''
  document.getElementById('data-list').style.overflow = 'hidden'
  document.getElementById('data-list').style.maxHeight = '0'
  document.getElementById('money-list').style.maxHeight = '0'
  document.getElementById('pull-up').style.display = 'block'
  document.getElementById('pull-down').style.display = 'none'
  setTimeout(() => {
    document.getElementById('pie-chart-list').style.display = 'none'
    document.getElementById('day-list').style.display = 'none'
    document.getElementById('month-list').style.display = 'none'
    document.getElementById('pie-chart-nav-list').style.display = 'none'
    document.getElementById('day-nav-list').style.display = 'none'
    document.getElementById('month-nav-list').style.display = 'none'
    document.getElementById('data-list').style.display = 'none'
    document.getElementById('money-list').style.display = 'none'
  }, 300)
  dataOnmouseout()
}
function selectPieChartId (id) {
  pieChartId = id
  document.getElementById('pie-chart-0').style.backgroundColor = '#ffffff'
  document.getElementById('pie-chart-0').style.color = '#40496b'
  document.getElementById('pie-chart-0').style.fontWeight = '400'
  document.getElementById('pie-chart-0-list').style.display = 'none'
  document.getElementById('pie-chart-1').style.backgroundColor = '#ffffff'
  document.getElementById('pie-chart-1').style.color = '#40496b'
  document.getElementById('pie-chart-1').style.fontWeight = '400'
  document.getElementById('pie-chart-1-list').style.display = 'none'
  document.getElementById('pie-chart-2').style.backgroundColor = '#ffffff'
  document.getElementById('pie-chart-2').style.color = '#40496b'
  document.getElementById('pie-chart-2').style.fontWeight = '400'
  document.getElementById('pie-chart-2-list').style.display = 'none'
  document.getElementById('pie-chart-3').style.backgroundColor = '#ffffff'
  document.getElementById('pie-chart-3').style.color = '#40496b'
  document.getElementById('pie-chart-3').style.fontWeight = '400'
  document.getElementById('pie-chart-3-list').style.display = 'none'
  document.getElementById(id).style.backgroundColor = '#4f4f7b'
  document.getElementById(id).style.color = '#ffffff'
  document.getElementById(id).style.fontWeight = '900'
  document.getElementById(id + '-list').style.display = 'block'
  
}
function pullMoneyList () {
  if (document.getElementById('money-list').style.display === 'none') {
    document.getElementById('money-list').style.display = 'block'
    document.getElementById('pull-up').style.display = 'none'
    document.getElementById('pull-down').style.display = 'block'
    setTimeout(() => {
      document.getElementById('money-list').style.maxHeight = '350px'
    }, 50)
  } else {
    document.getElementById('money-list').style.maxHeight = '0'
    document.getElementById('pull-down').style.display = 'none'
    document.getElementById('pull-up').style.display = 'block'
    setTimeout(() => {
      document.getElementById('money-list').style.display = 'none'
    }, 300)
  }
}
function selectMoney (name) {
  let arr = document.getElementsByClassName('money-name')
  for (var i = 0; i < arr.length; i++) {
    arr[i].innerHTML = name
  }
  document.getElementById('flag').src = './img/main/data/' + name.slice(0, 2) + '.png'
  pullMoneyList()
}
function openHelp (id) {
  document.getElementById(id).style.display = 'block'
}
function closeHelp (id) {
  document.getElementById(id).style.display = 'none'
}
function openMonthList () {
  if (document.getElementById('month-items').style.maxHeight === '1064px') {
    document.getElementById('month-items').style.maxHeight = '325px'
    document.getElementById('open-img').style.transform = 'rotate(0deg)'
    document.getElementById('open-text').innerHTML = '向下展开'
  } else {
    document.getElementById('month-items').style.maxHeight = '1064px'
    document.getElementById('open-img').style.transform = 'rotate(180deg)'
    document.getElementById('open-text').innerHTML = '收起'
  }
}