import axios from 'axios';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--black">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
