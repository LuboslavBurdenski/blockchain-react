import { useState } from 'react';
import './App.css';
import Blockchain from './Blockchain/Blockchain';
import { demoCoin, CryptoBlock } from './Blockchain/blockchainClass';

function App() {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [blocks, setBlocks] = useState([demoCoin.lastElement]);


  const handleChange = (e) => {
    e.target.name === 'sender' ? setSender(e.target.value) :
      e.target.name === 'recipient' ? setRecipient(e.target.value) :
        setQuantity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    demoCoin.addNewBlock(new CryptoBlock(new Date(), { sender, recipient, quantity }));
    let newElement = demoCoin.lastElement;
    setBlocks(arr => [...arr, newElement]);
  }

  return (
    <section className="App">
      <form className="App-form" onSubmit={e => { handleSubmit(e) }}>
        <label htmlFor='sender'>sender</label>
        <input
          value={sender}
          onChange={handleChange}
          placeholder='Luboslav Burdenski'
          className='Block-input'
          name='sender'
          id='sender' />
        <label htmlFor='recipient'>recipient</label>
        <input
          value={recipient}
          onChange={handleChange}
          placeholder='Georgi Spasov'
          className='Block-input'
          name='recipient'
          id='recipient' />
        <label htmlFor='recipient'>quantity</label>
        <input
          value={quantity}
          onChange={handleChange}
          placeholder='150.54'
          className='Block-input'
          name='quantity'
          id='quantity' />
        <button className='Add-block'>add block</button>
      </form>
      <button onClick={() => {
        console.log(demoCoin.checkChainValidity());
        demoCoin.blockchain[1].hash = 1;
        console.log(demoCoin.checkChainValidity());
      }}>check</button>
      <Blockchain data={blocks} />
    </section>
  );
}

export default App;
