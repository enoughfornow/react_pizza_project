import axios from 'axios';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './FullPizza.module.scss'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://62f2550618493ca21f317d6b.mockapi.io/react_project/' + id,
        );
        setPizza(data);
      } catch (err) {
        alert('Error fetch');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Loading...'</>;
  }

  return (
    <div className={styles.container}>
      <img className={styles.pizza_img} src={pizza.imageUrl} />
      <div className={styles.container_wrapper}>
      <h2 className={styles.pizza_title}>{pizza.title}</h2>
      <p className={styles.pizza_desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. nisi voluptates dolor quod aut possimus incidunt optio?</p>
      <h4 className={styles.pizza_price}>{pizza.price} ₽</h4>
      <Link to="/react_pizza_project">
        <button className="button button--black">
          <span>Назад</span>
        </button>
      </Link>
      </div>
    </div>
  );
};

export default FullPizza;
