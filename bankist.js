'use strict'

// document.querySelector('.allcontent').classList.remove('hide')
let allDeposit = []
let dat = Date().slice(4, 15).replaceAll(' ', '/')
let timer = ''

document.querySelector('.date').textContent = dat

setInterval(function () {
  document.querySelector('.time').textContent = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date())
}, 1000)


let countDownFucntion = function () {
  document.querySelector('.logoutime').textContent = ''
  let time = 600
  timer = setInterval(function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0)
    let sec = String(time % 60).padStart(2, 0)
    if (time > 1) {
      document.querySelector('.logoutime').textContent = `You will be logged out in ${min}: ${sec}`
    }
    else {
      document.querySelector('.allcontent').classList.add('hide')
      nameShowTextContent.textContent = `Log in to get started...`
      clearInterval(timer)
    }
    time = time - 1
  }, 1000)
}



document.addEventListener('keydown', function (ef) {
  if (ef.key == 'Escape') {
    document.location.reload('bankist.html')
  }
  else { }
})


let allUserObject = {
  tolu: {
    userName: 'tolu',
    fullName: 'Mumuney Tolulope',
    pin: 1111,
    transactions: [],
    summaryUIDepo: [],
    summaryUIWithdraw: [],
    sum: 0,
    withdrawals: [],
    deposits: []
  },
  eunice: {
    userName: 'eunice',
    fullName: 'Mumuney Eunice',
    pin: 1111,
    transactions: [],
    summaryUIDepo: [],
    summaryUIWithdraw: [],
    sum: 0,
    withdrawals: [],
    deposits: []
  },

  oyin: {
    userName: 'oyin',
    fullName: 'Mumuney Oyin',
    pin: 1111,
    transactions: [],
    summaryUIDepo: [],
    summaryUIWithdraw: [],
    sum: 0,
    withdrawals: [],
    deposits: []
  },

  kingsley: {
    userName: 'kingsley',
    fullName: 'Kingsley',
    pin: 1234,
    transactions: [],
    summaryUIDepo: [],
    summaryUIWithdraw: [],
    sum: 0,
    withdrawals: [],
    deposits: []
  },

  juliette: {
    userName: 'juliette',
    fullName: 'Juliette Nkem',
    pin: 5555,
    transactions: [],
    summaryUIDepo: [],
    summaryUIWithdraw: [],
    sum: 0,
    withdrawals: [],
    deposits: []
  }
}

if (!localStorage.getItem('allBankistData')) {
  localStorage.setItem('allBankistData', JSON.stringify(allUserObject))
}

let saveitemStorage = function () {
  localStorage.setItem('allBankistData', JSON.stringify(allUserObject))
}

let getItemStorage = function () {
  allUserObject = JSON.parse(localStorage.getItem('allBankistData'))
}

getItemStorage()


let loopTextcontent = function () {
  for (let loop = 0; loop <= this.transactions.length - 1; loop++) {

    if (!this.transactions[loop].startsWith('-')) {
      let strDepo = `<div class="eachtransactionDeposit">
<div
  style="width: 80px; height: 20px; border-style: none; background-color: rgb(129, 226, 105); opacity: 0.7; border-radius: 15px; padding-top: 5%;">

  <span
    style="font-size: x-small; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color: white;">
    ${loop + 1} DEPOSIT </span>

</div>
<div
  style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: x-small; margin-top: 5%;">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dat}
</div>
<div class='transacamt1'
  style="margin-left: 225%;font-size: small; margin-top: 5%; font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; ">
  &nbsp;$${this.transactions[loop]}</div>
<hr width="370px" style="border-color: rgb(255, 255, 255); opacity: 0.3; margin-top: -0.111111%;">
</div>`
      document.querySelector('.divcol1').insertAdjacentHTML('afterbegin', strDepo)
    }
    else {
      let strWithdraw = `<div class="eachtransactionWithdraw">
<div
  style="width: 80px; height: 20px; border-style: none; background-color: rgb(226, 90, 90); opacity: 0.7; border-radius: 15px; padding-top: 5.5%;">

  <span
    style="font-size: xx-small; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color: white;">
    ${loop + 1} WITHDRAWAL </span>

</div>
<div
  style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: x-small; margin-top: 5%;">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dat}
</div>
<div class='transacamt2'
  style="margin-left: 225%;font-size: small; margin-top: 5%; font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; ">
  -$${this.transactions[loop].replace('-', '')}</div>
<hr width="370px" style="border-color: rgb(255, 255, 255); opacity: 0.3; margin-top: -0.111111%;">
</div>`
      document.querySelector('.divcol1').insertAdjacentHTML('afterbegin', strWithdraw)
    }
  }
}

let logInFuction = function () {
  if (pinFieldValue.value == this.pin) {
    clearInterval(timer)
    countDownFucntion()
    totalBalanceTextContent.textContent = allUserObject[currentUser]['sum']

    document.querySelector('.divcol1').replaceChildren('')

    nameShowTextContent.textContent = `Good afternoon, ${this.fullName}...`
    document.querySelector('.allcontent').classList.remove('hide')
    userFieldValue.value = ''
    pinFieldValue.value = ''
    let sum3 = 0
    let sum4 = 0
    for (let loop = 0; loop <= this.withdrawals.length - 1; loop++) {
      sum3 = sum3 + Number(this.withdrawals[loop])
    }

    for (let loop = 0; loop <= this.deposits.length - 1; loop++) {
      sum4 = sum4 + Number(this.deposits[loop])
    }
    totalOutNumber.textContent = sum3
    totalInNumber.textContent = sum4
    loopTextcontent.call(allUserObject[currentUser])

    let int = this.deposits.map(function (el, ind) {
      return el * 1.2 / 100
    }).reduce(function (acc, el) {
      return acc + el
    }, 0)

    interest.textContent = `$${Math.trunc(int)}`

    document.querySelector('.img').style = 'opacity:1'
    saveitemStorage()
  }
  else {
    alert('Invalid Login Details...')
  }
}

let reuestLoan = function () {
  if (loanAmountValue.value && loanAmountValue.value <= 100000 && loanAmountValue.value > 0) {
    let result = Number(this.sum) + Number(loanAmountValue.value)
    this.sum = result
    totalBalanceTextContent.textContent = `${this.sum}`
    allUserObject[currentUser]['deposits'].push(Number(loanAmountValue.value))

    allUserObject[currentUser]['transactions'].push(String(loanAmountValue.value))

    let str = `<div class="eachtransactionDeposit">
    <div
      style="width: 80px; height: 20px; border-style: none; background-color: rgb(129, 226, 105); opacity: 0.7; border-radius: 15px; padding-top: 5%;">

      <span
        style="font-size: x-small; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color: white;">
        ${allUserObject[currentUser]['transactions'].indexOf(allUserObject[currentUser]['transactions'][allUserObject[currentUser]['transactions'].length - 1]) + 1} DEPOSIT </span>

    </div>
    <div
      style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: x-small; margin-top: 5%;">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dat}
    </div>
    <div class='transacamt1'
      style="margin-left: 225%;font-size: small; margin-top: 5%; font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; ">
      &nbsp;$${loanAmountValue.value}</div>
    <hr width="370px" style="border-color: rgb(255, 255, 255); opacity: 0.3; margin-top: -0.111111%;">
  </div>`

    document.querySelector('.divcol1').insertAdjacentHTML('afterbegin', str)


    loanAmountValue.value = ''
    clearInterval(timer)
    countDownFucntion()
    saveitemStorage()
  }
  else { alert('Invalid Input') }
}

let transfer = function (reciever, amount) {
  if (allUserObject[reciever]) {
    if (amount <= this.sum && amount > 0) {
      this.sum = this.sum - amount
      totalBalanceTextContent.textContent = `${this.sum}`
      allUserObject[reciever]['sum'] = allUserObject[reciever]['sum'] + Number(amount)
      allUserObject[reciever]['deposits'].push(amount)
      this.withdrawals.push(amount)

      this.transactions.push(String(-amount))

      allUserObject[reciever]['transactions'].push(String(amount))

      let str1 = `<div class="eachtransactionWithdraw">
      <div
        style="width: 80px; height: 20px; border-style: none; background-color: rgb(226, 90, 90); opacity: 0.7; border-radius: 15px; padding-top: 5.5%;">

        <span
          style="font-size: xx-small; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color: white;">
          ${this.transactions.indexOf(this.transactions.at(-1)) + 1} WITHDRAWAL </span>

      </div>
      <div
        style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: x-small; margin-top: 5%;">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dat}
      </div>
      <div class='transacamt2'
        style="margin-left: 225%;font-size: small; margin-top: 5%; font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; ">
        -$${amount}</div>
      <hr width="370px" style="border-color: rgb(255, 255, 255); opacity: 0.3; margin-top: -0.111111%;">
    </div>
`

      document.querySelector('.divcol1').insertAdjacentHTML('afterbegin', str1)
      clearInterval(timer)
      countDownFucntion()
      saveitemStorage()
    }
    else { alert('You do not have enough funds') }
  }
  else {
    alert('Invalid Reciever Username')
  }
}

let closeAcc = function () {
  if (this.pin == closeAccPinValue.value && closeAccUserValue.value == currentUser) {
    allUserObject[currentUser].pin = 'fjhgjtjahjfrnfjintkjhfhjfrffnrjgbeg;BAREBRGQEb vbbrfg'
    closeAccUserValue.value = ''
    closeAccPinValue.value = ''
    alert('Account Closed')
    document.querySelector('.allcontent').classList.add('hide')
    nameShowTextContent.textContent = `Log in to get started...`
    saveitemStorage()
  }
  else { alert('Invalid Pin or Username') }
}

let sortbtn1 = function () {
  for (let loop = 0; loop <= this.transactions.length - 1; loop++) {
    if (this.transactions[loop].startsWith('-')) continue
    let strDepo1 = `<div class="eachtransactionDeposit">
<div
  style="width: 80px; height: 20px; border-style: none; background-color: rgb(129, 226, 105); opacity: 0.7; border-radius: 15px; padding-top: 5%;">

  <span
    style="font-size: x-small; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color: white;">
    ${loop + 1} DEPOSIT </span>

</div>
<div
  style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: x-small; margin-top: 5%;">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dat}
</div>
<div class='transacamt1'
  style="margin-left: 225%;font-size: small; margin-top: 5%; font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; ">
  &nbsp;$${this.transactions[loop]}</div>
<hr width="370px" style="border-color: rgb(255, 255, 255); opacity: 0.3; margin-top: -0.111111%;">
</div>`
    document.querySelector('.divcol1').insertAdjacentHTML('afterbegin', strDepo1)
  }
  clearInterval(timer)
  countDownFucntion()
  saveitemStorage()
}

let sortbtn2 = function () {
  for (let loop = 0; loop <= this.transactions.length - 1; loop++) {
    if (!this.transactions[loop].startsWith('-')) continue
    let strWithdraw1 = `<div class="eachtransactionWithdraw">
<div
style="width: 80px; height: 20px; border-style: none; background-color: rgb(226, 90, 90); opacity: 0.7; border-radius: 15px; padding-top: 5.5%;">

<span
  style="font-size: xx-small; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color: white;">
  ${loop + 1} WITHDRAWAL </span>

</div>
<div
style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: x-small; margin-top: 5%;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dat}
</div>
<div class='transacamt2'
style="margin-left: 225%;font-size: small; margin-top: 5%; font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; ">
-$${this.transactions[loop].replace('-', '')}</div>
<hr width="370px" style="border-color: rgb(255, 255, 255); opacity: 0.3; margin-top: -0.111111%;">
</div>`
    document.querySelector('.divcol1').insertAdjacentHTML('beforeend', strWithdraw1)
  }
  clearInterval(timer)
  countDownFucntion()
  saveitemStorage()
}

// let converttoEuro = function () {
//   document.querySelector('.totalbal').textContent = `€${Math.abs((this.sum) / 1.05)}`.slice(0, 2)
// }





let currentUser = ''
let allDepositNumber = document.querySelectorAll('.transacamt1')
let allWithdrawalNum = document.querySelectorAll('.transacamt2')
let loginGO = document.querySelector('.arrow')
let userFieldValue = document.querySelector('.user')
let pinFieldValue = document.querySelector('.pin')
let allContent = document.querySelector('.allcontent')
let nameShowTextContent = document.querySelector('.name')
let totalBalanceTextContent = document.querySelector('.totalbalval')
let loanAmountValue = document.querySelector('.requestloanamt')
let transferamountValue = document.querySelector('.trfmoneAmount')
let transferamountTotextContent = document.querySelector('.trfMoneyTo')
let trfGO = document.querySelector('.trfMonyGo')
let requestLoanGO = document.querySelector('.reQuestloanGo')
let closeAccGo = document.querySelector('.closeAccGo')
let sortGO = document.querySelector('.sort')
let closeAccUserValue = document.querySelector('.closeAccconfirmUser')
let closeAccPinValue = document.querySelector('.closeAccconfirmuPin')
let summaryContainerDiv = document.querySelector('.divcol1')
let totalInNumber = document.querySelector('.inNumber')
let totalOutNumber = document.querySelector('.outNumber')
let convert = document.querySelector('.convert')
let interest = document.querySelector('.interest')




loginGO.addEventListener('click', function () {
  if (allUserObject[userFieldValue.value]) {
    currentUser = userFieldValue.value
    logInFuction.call(allUserObject[userFieldValue.value])
    saveitemStorage()
  }
  else { alert('Invalid LogIn Details') }
})


requestLoanGO.addEventListener('click', function () {
  reuestLoan.call(allUserObject[currentUser])
  saveitemStorage()
})

trfGO.addEventListener('click', function () {
  if (transferamountTotextContent.value !== currentUser) {
    transfer.call(allUserObject[currentUser], transferamountTotextContent.value, transferamountValue.value)
    transferamountTotextContent.value = ''
    transferamountValue.value = ''
    saveitemStorage()
  }
  else { alert('Invalid Input') }
})

closeAccGo.addEventListener('click', function () {
  closeAcc.call(allUserObject[currentUser])
})

sortGO.addEventListener('click', function () {
  document.querySelector('.divcol1').replaceChildren('')
  sortbtn1.call(allUserObject[currentUser])
  sortbtn2.call(allUserObject[currentUser])
  saveitemStorage()
})

// convert.addEventListener('click', function () {
//   converttoEuro.call(allUserObject[currentUser])
// })





