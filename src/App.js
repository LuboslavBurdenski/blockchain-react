import { useState } from 'react';
import styles from './App.module.css';
import Blockchain from './Blockchain/Blockchain';
import { demoCoin, CryptoBlock } from './Blockchain/blockchainService';

function App() {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [blocks, setBlocks] = useState([demoCoin.obtainLatestBlock()]);

  const handleChange = (e) => {
    e.target.name === 'sender' ? setSender(e.target.value) :
      e.target.name === 'recipient' ? setRecipient(e.target.value) :
        setQuantity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    demoCoin.addNewBlock(new CryptoBlock(new Date(), { sender, recipient, quantity: Number(quantity) }));
    let newElement = demoCoin.obtainLatestBlock();
    setBlocks(arr => [...arr, newElement]);
  }

  return (
    <section className="App">

      <form className={styles.appForm} onSubmit={handleSubmit}>
        <label htmlFor='sender'>sender</label>
        <input
          value={sender}
          onChange={handleChange}
          placeholder='Luboslav Burdenski'
          className={styles.blockInput}
          name='sender'
          id='sender' />
        <label htmlFor='recipient'>recipient</label>
        <input
          value={recipient}
          onChange={handleChange}
          placeholder='Ivan Ivanov'
          className={styles.blockInput}
          name='recipient'
          id='recipient' />
        <label htmlFor='recipient'>quantity</label>
        <input
          value={quantity}
          onChange={handleChange}
          placeholder='150.54'
          className={styles.blockInput}
          name='quantity'
          id='quantity' />
        <button className={styles.addBlock}>add block</button>
      </form>

      <Blockchain data={blocks} setBlocks={setBlocks}/>

    </section>
  );
}

export default App;
