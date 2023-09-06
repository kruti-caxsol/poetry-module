import { BrowserRouter } from 'react-router-dom';
import './Styles/style.scss';
import { useEffect, useState } from 'react';

export default function Root(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual API endpoint you want to fetch from.
        const response = await fetch('https://poetrydb.org/title/Ozymandias/lines.json', {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(data)
  return (
    <BrowserRouter>
      <div className='custom-container'>
        <h1>Poetry</h1>
        <table>
          <tbody>
            {data.length > 0 ? (
              data && data.map((item, index) => (
                <p>{item.lines}</p>
              ))
            ) : (
              <tr>
                <td colSpan={2}>Loading data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </BrowserRouter>
  );
}
