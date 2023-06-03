
import { useState, useEffect } from 'react';
import {state} from '../state/state';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown,faPerson,faComment } from '@fortawesome/free-solid-svg-icons'




function Post(){
  const url='https://www.reddit.com/r/popular.json';
  const [children, setChildren]=useState([]);
  const [increment, setIncrement]=useState(0);

  const getData=()=>{
  const request=fetch(url).then(response=>{
      if(response.ok){
          return response.json();
      }
      throw new Error ('Request Failed!');
  }, networkError => console.log(networkError.message)
  ).then(jsonResponse=>{
        setChildren(jsonResponse.data.children)
  })
  }



const handleIncrease=(e)=>{
    e.preventDefault();
setIncrement((prev)=>prev+1)

}
const handleDecrease=(e)=>{
    e.preventDefault();
    if(increment===0){
        return;
    }
setIncrement((prev)=>prev-1)
}



useEffect(() => {
    getData()
    console.log(children)
  }, [])
    


return (
    <div className="post-container">

        {
            children.map((item)=>{
               return  (<div className="post">
                    <div className="post-reaction">
                        <a href='' >
                            <FontAwesomeIcon icon={faArrowUp} className='post-reaction-arrow'/>
                        </a>   
                    <p className='post-reaction-text'>{item.data.ups+item.data.downs}</p>
                    <a href='' >
                        <FontAwesomeIcon icon={faArrowDown} className='post-reaction-arrow'/>
                    </a>
                    
                    </div>
                    <div className="post-element">
                        <h1 className='post-element-header'>{item.data.title}</h1>
                        {item.data.thumbnail!='self'?<img className='post-element-image' src={item.data.thumbnail}/>:null}
                        <div className='post-element-data'>
                            <a href=''><FontAwesomeIcon icon={faPerson} style={{paddingRight:'3px'}}/>{item.data.author}  </a>
                            <a href=''><FontAwesomeIcon icon={faComment} style={{paddingRight: '3px'}}/>{item.data.num_comments}  </a>
                            <a href=''> {Math.floor((1685818874-item.data.created_utc)/(60*60))} hours</a>

                        </div>
                    </div> 
                </div>)
            })
        }
    </div>

)


}

export default Post;