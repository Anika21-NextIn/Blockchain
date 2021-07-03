import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import './custom.css';
import Fir from '../abis/Fir.json'
import FirBoard from './Fir'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Fir.networks[networkId]
    if(networkData) {
      const fir = web3.eth.Contract(Fir.abi, networkData.address)
      this.setState({ fir })
      this.setState({ loading: false})
      console.log(fir)
    } else {
      window.alert('Fir contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
  }

  render() {
    return (
      <div className="container">
        <FirBoard fir={this.state.fir} account={this.state.account} />
      </div>
    );
  }
}

export default App;
