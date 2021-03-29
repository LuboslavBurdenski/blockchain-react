import styles from './Blockchain.module.css';
import Block from './Block/Block';
import { useEffect, useState } from 'react';

function Blockchain(props) {
  const [valid, setValidation] = useState(true);

  useEffect(() => {
    console.log(props.data);
  }, [props.data]);
  
  return (
    <section className={styles.chain} >
      {props.data.map((e, i) =>
        <Block
          background={typeof valid === 'boolean' ? '#24bd87' : i >= valid[0] ? '#ff6183' : '#24bd87'}
          valid={valid}
          validation={setValidation}
          key={i}
          setBlocks={props.setBlocks}
          block={e} />
      )}
    </section>
  );
}

export default Blockchain;
