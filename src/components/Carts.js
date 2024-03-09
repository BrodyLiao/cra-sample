import { useContext } from "react";
import { CartContext } from "../store";


export default function Cart(){
    const[state,dispatch]=useContext(CartContext)
    
    return(<div className='bg-light p-3'>  {/* background 背景色。light淺色。padding內推距離 */}

    <table className='table align-middle'> {/* align-middle整列置中 */}
      <tbody> {/* table的固定結構，裡面會包著tbody */}
        {state.cartList.map((item)=>{
          return(        
          <tr key={item.id}>  {/* tr指的是每一列 */}
            <td>
              <button type='button' className="btn btn-sm" //btn-sm 縮小範圍
              onClick={
                ()=>{
                  dispatch({
                    type:'REMOVE_CART_ITEM',
                    payload:{
                      ...item,
                    }
                  })
                }
              }>x</button>
            </td>
            <td>
              <img src={item.img} className='table-image' alt=''/> {/* 品項網址改為{item.img} */}
            </td>
            <td>
              {item.title}  {/* 品項文字改為{item.title} */}
              <br/>
              <small className='text-muted'>NT {item.price}</small> {/* text-muted樣式淡一點 */}{/* 價格改為{item.price} */}
            </td>
            <td>
              <select name='' id='' className='form-select'
                value={item.quantity}
                onChange={(e) =>{
                  e.preventDefault();
                  const quantity = parseInt (e.target.value);
                  dispatch({
                    type:'CHANGE_CART_QUANTITY',
                    payload:{
                      ...item,
                      quantity,
                    },
                  });
                }}>
                {[...Array(20)].map((_,i)=> {
                  return(
                  <option value={i+1} key={i}>{i+1}</option>
                  )
                })}
              </select> 
            </td>
            <td className='text-end'>
              $NT {item.price * item.quantity} 
            </td> {/* 總價＝數量x價格 */}
          </tr> 
          );
          })}

      </tbody> 

      <tfoot> {/* 總金額的標籤 */}
        <tr>
          <td colSpan={5} className='text-end'> {/* colSpan整合。text-end文字對齊右側 */}
            總金額 NT ${state.total || 0}
          </td> 
        </tr>
      </tfoot>          

    </table>
  </div>)
}