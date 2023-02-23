import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from './routes/Chart';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Navigation from './routes/Navigation';
import Price from './routes/Price';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Coins />} />
          <Route path='/:coinId/' element={<Coin />}>
            <Route path={`price`} element={<Price />} />
            <Route path={`chart`} element={<Chart />} />
          </Route>
          <Route path='/coins' element={<Coins />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/* const navigate = useNavigate()
const onAboutClick = () =>{
  navigate("/about")
}

* <Outlet context={{nameOfMyUser: users[Number(userId)-1].name}}
! const ctx = useOutletContext()

*const [readSearchParams, setSearchParams] = useSearchParams()
<button onClick={onAboutClick}>About</button> */

/* const router = createBrowserRouter([
  {
    path:"/"
    element: <App/>,
    children:[{
      path:"",
      element: <Home/>,
    },
    {
      path: "about",
      element: <About/>
    },
    {
      path:"users/:userId",
      element:<User/> 
    }
  ],
  errorElement : <NotFound/>

  }
]) */
