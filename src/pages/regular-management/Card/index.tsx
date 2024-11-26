import { useContext } from 'react';
import { Context } from '../type';
import styles from './index.less';
type Props = {};

const index = (props: Props) => {
  const { CardList } = useContext(Context);

  return (
    <div className={styles.CardType}>
      {CardList?.map((item: string, index: number) => {
        return <p style={{ fontSize: index === 0 ? 16 : 12 }}>{item}</p>;
      })}
    </div>
  );
};

export default index;
