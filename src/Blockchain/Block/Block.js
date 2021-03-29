import { useState } from 'react';
import styles from './Block.module.css';
import { demoCoin } from '../blockchainService';

function Block(props) {
    const [quantity, setQuantity] = useState(((props.block.data.quantity === undefined) ? '' : props.block.data.quantity))

    const handleChange = (e) => {
        setQuantity(Number(e.target.value));
        demoCoin.blockchain[props.block.blockIndex].data.quantity = Number(e.target.value);
        let check = demoCoin.checkChainValidity();

        if (Number(props.valid[0] > Number(check[0]))
            || (Number(props.valid[0]) < Number(check[0]))
            || (check && (typeof check === 'boolean'))
            || (check[1] && (typeof props.valid === 'boolean'))
        ) {
            props.validation(check);
        }
    }

    const mine = () => {
        let newlyMinedBlock = demoCoin.mine(props.block, props.block.blockIndex)
        const updateArray = (arr) => {
            arr.forEach((currBlock, i) => {
                if (i === props.block.blockIndex) { arr[i] = newlyMinedBlock }
            });
            return arr;
        }
        props.setBlocks(arr => [...updateArray(arr)]);
        props.validation(value => [value[0] + 1, value[1]]);
    }

    return <article style={{ background: props.background }} className={styles.block}>
        <p>
            <label htmlFor='blockIndex'>block</label>
            <input name='blockIndex' id='blockIndex' disabled={true} value={props.block.blockIndex}></input>
        </p>
        <p>
            <label htmlFor='nonce'>nonce</label>
            <input name='nonce' id='nonce' disabled={true} value={props.block.nonce}></input>
        </p>
        <p>
            <label htmlFor='quantity'>quantity</label>
            <input name='quantity' id='quantity' onChange={handleChange} value={quantity}></input>
        </p>
        <p>
            <label htmlFor='preceding'>preceding hash</label>
            <input id='preceding' disabled={true} value={props.block.precedingHash}></input>
        </p>
        <p>
            <label htmlFor='hash'>hash</label>
            <input id='hash' disabled={true} value={props.block.hash}></input>
        </p>

        <button
            disabled={props.block.blockIndex === 0}
            style={{
                background: props.block.blockIndex === 0 ? '#cfcfcf' : '#b34d63',
                cursor: props.block.blockIndex === 0 ? 'not-allowed' : 'pointer'
            }}
            className={styles.mine} onClick={mine} >
            mine</button>

    </article >
}

export default Block;