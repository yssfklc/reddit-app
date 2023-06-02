
import { useState } from 'react';
import {state} from '../state/state';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'



function Post(){
    const url='https://www.reddit.com/r/popular.json';

  const getData=()=>{
  const request=fetch(url).then(response=>{
      if(response.ok){
          return response.json
      }
      throw new Error ('Request Failed!');
  }, networkError => console.log(networkError.message)
  ).then(jsonResponse=>{
      console.log(jsonResponse)
  })
  }

  
const numberOfPeopleRated=12;
const [increment, setIncrement]=useState(0);

const handleIncrease=(e)=>{
    e.preventDefault();
setIncrement((prev)=>prev+1)
getData();
}
const handleDecrease=(e)=>{
    e.preventDefault();
    if(increment===0){
        return;
    }
setIncrement((prev)=>prev-1)
}

return (
    <div className="post-container">
        

        {
            state.map((item)=>{
               return  (<div className="post">
                <div className="post-reaction">
                    <a href='' onClick={handleIncrease}>
                        <FontAwesomeIcon icon={faArrowUp} className='post-reaction-arrow'/>
                    </a>   
                <p className='post-reaction-text'>{increment}</p>
                <a href='' onClick={handleDecrease}>
                    <FontAwesomeIcon icon={faArrowDown} className='post-reaction-arrow'/>
                </a>
                
                </div>
                <div className="post-element">
                    <h1 className='post-element-header'>{item.header}</h1>
                    <img className='post-element-image' src={item.imgUrl} />
                </div>
                
                </div>)
            })
        }
    </div>

)


}

export default Post;