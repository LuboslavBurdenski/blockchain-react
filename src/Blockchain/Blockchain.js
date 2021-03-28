import styles from './Blockchain.module.css';
import Block from './Block/Block';

function Blockchain(props) {

  return (
    <section className={styles.chain} >
      {props.data.map((e, i) => <Block key={i}  {...e} />)}
    </section>
  );
}

export default Blockchain;
