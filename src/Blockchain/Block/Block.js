import { useEffect, useState } from 'react';
import styles from './Block.module.css';
import { demoCoin } from '../blockchainClass';
function Block(props) {
    const [allValues, setAllValues] = useState({
        blockIndex: props.blockIndex,
        nonce: props.nonce,
        quantity: ((props.data.quantity === undefined) ? '' : props.data.quantity),
    });

    const handleChange = (e) => {
        setAllValues({ ...allValues, [e.target.name]: Number(e.target.value) });
        demoCoin.blockchain[props.blockIndex].data.quantity = Number(e.target.value);
    }

    useEffect(() => {
        if (typeof demoCoin.checkChainValidity() === Number) {

        }
    });

    return <article className={styles.block}>
        <p>
            <label htmlFor='blockIndex'>block</label>
            <input name='blockIndex' id='blockIndex' onChange={handleChange} value={allValues.blockIndex}></input>
        </p>
        <p>
            <label htmlFor='nonce'>nonce</label>
            <input name='nonce' id='nonce' onChange={handleChange} value={allValues.nonce}></input>
        </p>
        <p>
            <label htmlFor='quantity'>quantity</label>
            <input name='quantity' id='quantity' onChange={handleChange} value={allValues.quantity}></input>
        </p>
        <p>
            <label htmlFor='preceding'>preceding hash</label>
            <input id='preceding' disabled={true} value={props.precedingHash}></input>
        </p>
        <p>
            <label htmlFor='hash'>hash</label>
            <input id='hash' disabled={true} value={props.hash}></input>
        </p>
    </article>

}

export default Block;