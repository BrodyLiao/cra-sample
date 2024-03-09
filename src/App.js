import {useReducer} from 'react'; // 匯入外部的React
import Navbar from './components/Navbar';  // 匯入自定義的Navbar
import Products from './components/Products'; // 匯入自定義的Products
import Cart from './components/Carts'; // 匯入自定義的Carts
import {CartContext} from './store'; 

function App () {

  const cartReducer = useReducer((state,action)=>{  //* 輸入useReducer的時候，會自動從Rect把方法取出來
    const cartList = [...state.cartList];
    // #1 先取得當前購物車目標品項的索引
    const index=cartList.findIndex((item)=>item.id === action.payload.id);
    console.log(index);
    console.log(action);

    switch(action.type){  //switch做判斷是做action的部分
        case'ADD_TO_CART':
          if(index === -1){
            //還未加入到購物車內
            cartList.push(action.payload);
          } else{
            //當前購物車的項目與加入的項目一致
            cartList[index].quantity += action.payload.quantity;
          }
        // *優化這段程式碼-這是第一次
        // const array = cartList.map((item) => {
        //     return item.quantity * item.price;
        //   });
        // const total = array.reduce((a,b)=>{  //a前一個值，b當前值
        //   return a+b;
        // },0)

        // *縮寫後變成這樣，-這是第二次
        // const total= cartList.map((item) => item.quantity * item.price) //組出上方的array
        //   .reduce((a,b) =>  a + b , 0 ); 把這段重構

        // *重構，-這是第三次
        // const total= calculateTotalPrice(cartList); 

        // *直接套用到case的total，這是第四次

        return{
          ...state,
          cartList,
          total:calculateTotalPrice(cartList),
        };
        case 'CHANGE_CART_QUANTITY':
          cartList[index].quantity = action.payload.quantity;
          
          return{
            ...state,
            cartList,
            total:calculateTotalPrice(cartList),
          };
          case 'REMOVE_CART_ITEM':
            cartList.splice(index,1);
            return{
              ...state,
              cartList,
              total:calculateTotalPrice(cartList),
            };
      default:   //預設的情況下，會回傳state的內容
        return state
    }
  },{   
    cartList:[],  //品項購物車-陣列
  })   
  
  return(
    <CartContext.Provider value={cartReducer}>  {/* 這個元件。取代div className='App' */}
      <Navbar></Navbar>  {/* 元件套用進來 */}
        
      <div className='container mt-4'>  {/* 上下間距1-5來做設定 */}
        {/* 外層隔線 */}
        <div className='row'>
          <div className='col-md-7'> {/* col指欄線，分割總和必須是12 */}
            <Products></Products> {/* 元件套用進來 */}
          </div>
          
          <div className='col-md-5'>
            <Cart></Cart>{/* 元件套用進來 */}
          </div> 
        </div>
      </div>
    </CartContext.Provider>
  );
}

function calculateTotalPrice(cartList) {
  return cartList.map((item) => item.quantity * item.price)
  .reduce((a, b) => a + b, 0);
}

export default App;
