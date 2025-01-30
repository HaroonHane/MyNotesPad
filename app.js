const mianContentWrapper = document.querySelector('.mian-content-wrapper')
const addNewPadBtn = document.querySelector('#AddNoteBtn')
const confirmationWrapper = document.querySelector('.confirmation-wrapper')
const delIcon = document.querySelector('#delIcon')
const deleteAllPadsBtn = document.querySelector('.deleteAllPadsBtn')

let count = 1
document.addEventListener('DOMContentLoaded', () => {
  let keys = Object.keys(localStorage)
  keys.forEach((key, index) => {
    const saveValue = localStorage.getItem(key)
    const temp = key.match(/\d+/g)
    let result = temp.reduce(function (accumulator, currentValue) {
      return (accumulator += currentValue)
    })
    count = Number(result)
    createDiv()
    const divs = document.querySelectorAll(`.user-content-wrapper`)
    divs[index].firstElementChild.value = saveValue
  })
})

addNewPadBtn.addEventListener('click', e => {
  createDiv()
})
function createDiv () {
  const userContentWrapper = document.createElement('div')
  userContentWrapper.classList.add('user-content-wrapper')
  userContentWrapper.setAttribute('id', `user-content-wrapper${count++}`)

  userContentWrapper.innerHTML = `
  <textarea
    name='user-content'
    class='user-content-field'
    cols='30'
    rows='10'
    placeholder='Note Here...'
  ></textarea>
  <button class='save-edit-btn' onClick = saveNote(this)>Save / Edit</button>
  <!--<button class='add-plus-btn' onClick=createDiv(this)>Add Sib</button> -->
  <button class='delete-btn' onClick = deleteDiv(this)>Delete</button>
  `
  mianContentWrapper.appendChild(userContentWrapper)

  // return userContentWrapper
}

let checkValue
let checkBox = false
function checkBoxValue (e) {
  checkBox = e.checked
  checkValue = e.checked
}
let nodeRefrence
function yesButtonClicked () {
  confirmationWrapper.style.display = 'none'
  if (checkValue) {
    if (checkBox && checkValue) {
      localStorage.removeItem(`${nodeRefrence.parentNode.getAttribute('id')}`)
      nodeRefrence.parentNode.remove()

      return (checkValue = true)
    } else {
      localStorage.removeItem(`${nodeRefrence.parentNode.getAttribute('id')}`)
      nodeRefrence.parentNode.remove()

      return (checkValue = false)
    }
    // const parentNode = e.parentNode.parentNode
  }
}

function noButtonClicked (nobtn) {
  confirmationWrapper.style.display = 'none'
  checkValue = false
}

function deleteDiv (e) {
  checkValue = true
  nodeRefrence = e
  if (!checkBox) {
    confirmationWrapper.style.display = 'flex'
  } else {
    yesButtonClicked()
  }
}

function saveNote (e) {
  let content = e.previousElementSibling.value
  localStorage.setItem(e.parentNode.getAttribute('id'), content)
}
function deleteAllPads (e) {
  // const checkBoxWrapper = document.querySelector('.checkbox-wrapper')
  // const confirmText = document.querySelector('#confirmText')
  // if (e.getAttribute('id') === 'deleteAllPadsBtn') {
  //   confirmText.textContent = `Are you sure to Delete All pads`
  //   checkBoxWrapper.style.display = 'none'
  //   confirmationWrapper.style.display = 'flex'
  // }
  const confirmation = confirm(' Alert!   Are You sure to Delete All Pads')
  if (confirmation) {
    // confirmText.textContent = `Alert! Are you sure to Delete.`
    // checkBoxWrapper.style.display = 'block'
    const AllDivs = document.querySelectorAll('.user-content-wrapper')
    if (AllDivs.length > 0) {
      AllDivs.forEach(div => {
        div.remove()
      })
      localStorage.clear()
    }
  }
}
