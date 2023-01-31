import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes';
import Layout from './layout';
import './App.css';

function App() {
  return (
    <Layout>
      <RouterProvider router={routes} />
    </Layout>
  );
}

export default App;
