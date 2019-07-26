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
    if (document.getElementById('open-text').innerHTML === '收起') {
      openMonthList()
    }
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
  if (document.getElementById('open-text').innerHTML === '向下展开') {
    document.documentElement.scrollTop = document.body.scrollTop = document.getElementById('data-list').offsetTop - 40
    document.getElementById('month-items').style.maxHeight = window.innerHeight - 220 + 'px'
    document.getElementById('open-img').style.transform = 'rotate(180deg)'
    document.getElementById('open-text').innerHTML = '收起'
  } else {
    document.getElementById('month-items').style.maxHeight = '325px'
    document.getElementById('open-img').style.transform = 'rotate(0deg)'
    document.getElementById('open-text').innerHTML = '向下展开'
  }
}
function selectedCommunityId (id) {
  let arr = document.getElementsByClassName('community-list-nav-item')
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    if (index == id) {
      element.classList.add('selected')
    } else {
      element.classList.remove('selected')
    }
  }
  selectedCommunityMain(id)
}
function selectedCommunityMain (id) {
  let arr = document.getElementsByClassName('community-list-main')
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    if (index == id) {
      element.classList.add('selected')
    } else {
      element.classList.remove('selected')
    }
  }
  if (id == 0 || id == 1) {
    selectedCommunityListItem(document.getElementsByClassName('community-list-main-list-item-' + id)[0] , id)
  }
  if (id == 2) {
    closeSecond('2-1')
    closeSecond('2-2')
  }
  if (id == 3) {
    closeSecond('3-1')
    closeSecond('3-2')
  }
}
function selectedCommunityListItem (item, id) {
  let arr = document.getElementsByClassName('community-list-main-list-item-' + id)
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    if (item === element) {
      let obj = document.getElementById('community-list-main-media-' + id)
      if (index === 8 || index === 9) {
        obj.children[1].style.width = 600 / 4 * 3 + 'px'
      } else {
        obj.children[1].style.width = '100%'
      }
      element.classList.add('selected')
    } else {
      element.classList.remove('selected')
    }
  }
  let obj = document.getElementById('community-list-main-media-' + id)
  obj.children[0].innerHTML = item.children[0].alt
  if (id == 0 || id == 1) {
    obj.children[1].children[0].src = item.children[0].src.replace('small','normal')
    obj.children[1].children[1].href = item.children[0].src.replace('small','hd')
    obj.children[1].children[1].download = item.children[0].alt
  } else {
    obj.children[1].children[0].poster = item.children[0].src.replace('small','normal')
    obj.children[1].children[0].src = item.children[0].getAttribute('data')
  }
}
function goNotice () {
  window.open('https://dice1.zendesk.com/hc/en-us')
}
function openSecond (itemIndex, i, id) {
  let arr = document.getElementsByClassName('community-list-main-else-list-' + id.slice(0, 1))
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    element.style.display = 'none'
  }
  let array = document.getElementsByClassName('community-list-main-else-main-' + id.slice(0, 1))
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (index == i) {
      element.style.display = 'flex'
    } else {
      element.style.display = 'none'
    }
  }
  let item = document.getElementsByClassName('community-list-main-list-item-' + id)[itemIndex]
  selectedCommunityListItem(item, id)
}
function closeSecond (id) {
  let arr = document.getElementsByClassName('community-list-main-else-list-' + id.slice(0, 1))
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    element.style.display = 'block'
  }
  let array = document.getElementsByClassName('community-list-main-else-main-' + id.slice(0, 1))
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    element.style.display = 'none'
  }
  let arrs = document.getElementsByClassName('community-list-main-media-main-video')
  for (let index = 0; index < arrs.length; index++) {
    const element = arrs[index]
    element.children[0].src = ''
  }
}
function scrollCommunityListUp (id) {
  let obj = document.getElementById('community-list-main-list-' + id)
  if (obj.scrollTop > 0) {
    obj.scrollTop -= obj.offsetHeight
  }
}
function scrollCommunityListDown (id) {
  let obj = document.getElementById('community-list-main-list-' + id)
  if (obj.offsetHeight + obj.scrollTop < obj.scrollHeight) {
    obj.scrollTop += obj.offsetHeight
  }
}
function scrollCommunityListLeft (id) {
  let obj = document.getElementById('community-list-main-else-list-items-' + id)
  if (obj.scrollLeft > 0) {
    obj.scrollLeft -= obj.offsetWidth
  }
}
function scrollCommunityListRight (id) {
  let obj = document.getElementById('community-list-main-else-list-items-' + id)
  if (obj.offsetWidth + obj.scrollLeft < obj.scrollWidth) {
    obj.scrollLeft += obj.offsetWidth
  }
}
function goList (id) {
  window.location.href = window.location.href.split('html')[0].replace('index', 'list') + 'html?id=' + id
}
function goback () {
  window.location.href = window.location.href.split('html')[0].replace('list', 'index') + 'html'
}