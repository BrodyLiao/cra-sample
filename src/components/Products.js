import { useContext } from "react";
import productsData from "../assets/productsData";
import { CartContext } from "../store";

export default function Products(){
    const[state,dispatch]=useContext(CartContext);
    return(            
        <div className='row row-cols-3 g-3'> {/* row-cols-3，排成三欄的樣式。g-3上下寬 */}
            {productsData.map((product)=>{   //* 用.map這個迴圈
                return(   // return版型的內容 
                <div className='col' key={product.id}>  {/* 加入key的屬性+id */}
                <div className='card'>
                    <img src={product.img} className='card-img-top' alt='...'/>  
                    {/* src={product.img}取代原先的網址 */}
                    <div className='card-body'>
                    <h6 className='card-title'>
                        {product.title} {/* product.title取代原先的文字標題 */}
                        <span className='float-end'>NT$ {product.price}</span> 
                        {/* product.price取代原先的金額 */}
                               {/* css的float，end是指右側，start是指左側 */}
                    </h6>
                    <button type='button' className='btn btn-outline-primary w-100'
                     onClick={()=>{
                        dispatch({
                            type:'ADD_TO_CART',
                            payload:{
                                ...product,
                                quantity:1
                            },
                        });
                    }}>
                        加入購物車</button> {/* outline外框線，滿寬w-100 */}
                    </div>
                </div>
                </div>
                ); 
            })} 
        </div>
    );
}