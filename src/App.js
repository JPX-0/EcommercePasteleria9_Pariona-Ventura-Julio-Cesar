import './styles/css/App.css';
import Cart from './components/main/cart/Cart';
import CartContextProvider from './components/main/cart/CartContext';
import Error404 from './components/main/Error404';
import ItemDetailContainer from "./components/main/details/ItemDetailContainer"
import ItemListContainer from './components/main/items/ItemListContainer';
import NavBar from './components/header/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <CartContextProvider>
      <BrowserRouter>
        {/* header -- muestra el NavBar */}
        <header className="header">
          <NavBar/>
        </header>
        {/* main -- muestra el ItemListContainer, ItemDetailContainer, Cart y Error404 */}
        <main className="main">
          <Routes>
            <Route path="/" element={<ItemListContainer/>}/>
            <Route path="/category/:idCategory" element={<ItemListContainer/>}/>
            <Route path="/item/:idProduct" element={<ItemDetailContainer/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/*" element={<Error404/>}/>
          </Routes>
        </main>
        <footer></footer>
      </BrowserRouter>
    </CartContextProvider>
  )};
export default App;
