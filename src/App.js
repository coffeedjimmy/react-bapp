import React, {useState} from 'react';
import logo from './logo.svg';
import QRCode from 'qrcode.react';
import {getBalance, readCount, setCount, setURI} from './api/UseCaver';
import * as KlipAPI from "./api/UseKlip";
import './App.css';


// 1. Smart contract 배포 및 주소파악
// 2. caver.js 이용해서 smart contract 연동하기
// 3. 가져온 smart contract 실행결과(데이터) 웹에 표현하기

// const CONTRACT_ADDR = '0xE9B5c97C0072AFBB35eC4584a3E1189daB5b8533';

function onPressButton(){
  console.log('Hi');
}
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
}

const DEFAULT_QR_CODE = 'DEFAULT';

function App() {

  var _input = "";

  const [balance, setBalance] = useState('0');
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  // const onPressButton2 = () => {
  //   setBalance('10');
  // }
  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  }

  const onClickSetCount = () => {
    KlipAPI.setCount(2000, setQrvalue);
  }

  const onClickSetDoubleCount = () => {
    KlipAPI.setDoubleCount(1000, setQrvalue);
  }

  const onClickSetURI = () => {
    // KlipAPI.mint
  }

  // const on

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <button title={'카운트변경'} onClick={()=>{setCount(100)}} /> */}
        <button onClick={()=>{
          // onPressButton2('15', setBalance);
          onClickGetAddress();
        }}>주소 가져오기</button>
        <br /><br /><br />
        <button onClick={()=>{
          // onPressButton2('15', setBalance);
          onClickSetCount();
        }}>카운트값 변경</button>
        <br /><br /><br />
        <button onClick={()=>{
          // onPressButton2('15', setBalance);
          onClickSetDoubleCount();
        }}>카운트값 2배 변경</button>
        <br /><br /><br />
        {/* <input onChange={(e)=>{
          _input=e.target.value;
        }
        } />
        <button onClick={()=>{
          onClickSetURI();
          // onPressButton2('15', setBalance);
          // onClickSetCount();
        }}>토큰 발급하기</button>

        <br /><br /><br /> */}
        <QRCode value={qrvalue} />
        <p>
          {balance}
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
