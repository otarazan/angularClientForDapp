import { Component } from '@angular/core';
import Web3 from "web3";
const  ContractABI = require('./ContractABI.json');

declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularClient';

  web3:any;
  contract:any;
  no:number;
  yes:number;
  constructor() {

    this.web3 = new Web3(
      new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
    );

    this.contract= new this.web3.eth.Contract(
      ContractABI,
      "0x46A44bE0fEe55ce933a86Be9f7E18649d5f0D245"
    );

    this.getVotes();
  }

  getVotes(){
    this.contract.methods
    .getVotes()
    .call()
    .then(result=>{
      this.yes=result[0];
      this.no=result[1];
    });
  }

  async vote(vote){
    console.log(vote);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log(account);
      const gas = await this.contract.methods.vote(vote).estimateGas();
      const result = await this.contract.methods
        .vote(vote)
        .send({ from: account, gas });
      console.log(result);
      this.getVotes();
  }
  
}
