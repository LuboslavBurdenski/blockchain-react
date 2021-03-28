import { useEffect } from 'react';
import styles from './Blockchain.module.css';

function Blockchain(props) {
  useEffect(() => {
    console.log(props.data);
  }, [props.data])
  return (
    <section className={styles.chain} >
      {props.data.map((e, i) =>
        <article className={styles.block}>
          <p>
            <label htmlFor='index'>index </label>
            <input id='index' value={e.index}></input>
          </p>
          <p>
            <label htmlFor='nonce'>nonce </label>
            <input id='nonce' value={e.nonce}></input>
          </p>
          <p>
            <label htmlFor='quantity'>quantity</label>
            <input id='quantity' value={e.data.quantity}></input>
          </p>
          <p>
            <label htmlFor='preceding'>preceding hash</label>
            <input id='preceding' disabled={true} value={e.precedingHash}></input>
          </p>
          <p>
            <label htmlFor='hash'>hash</label>
            <input id='hash' disabled={true} value={e.hash}></input>
          </p>
        </article>)}

    </section>
  );
}

export default Blockchain;
