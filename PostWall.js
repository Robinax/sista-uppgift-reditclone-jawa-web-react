import React,{ useState, useEffect} from 'react';
import {createPosts} from "./Service/Posts/PostServices"

function PostWall(props) {
const [posts, setPosts] = useState ([]);
const [title,setTitle] = useState ('');
const [text,setText] = useState ('');
const postsURL = 'http://localhost:8080/posts/all'
const createPostsURL = 'http://localhost:8080/posts/create'


async function getallPost(){
//setPosts(getallPost(postsURL))
await fetch('http://localhost:8080/posts/all',{
            method:"Get"
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data)
            });
        }

    useEffect(() => {
        getallPost();
    }, []);

    const createNewPosts = () =>{
        if (title === "" || text ==="") {
            alert("you need to insert something in title or text!")
        }else
        createPosts(createPostsURL,props.token,props.username,title,text)
        getallPost();
    }

if (props.logedin === false) {
return(
    <div>
        <div>
         <ul>
                {posts.map((posts, index) => {
                  
                    return (<li key={index}>
                        <div>By: {posts.username}</div>
                       Title: {posts.title} <br/> Description: {posts.text}
                    </li>);
                })}
            </ul>
            </div>
    </div>
)
}else
return(
<div>
 <div>
     <ul>
            {posts.map((posts, index) => {
                  if(posts.username === props.username){
                    return(
                        <li key={index}>
                            <div>By: {posts.username}</div>
                           Title: {posts.title} <br/> Description: {posts.text}
                           <button onClick={() => {
                        fetch('http://localhost:8080/posts/delete/' + posts.title, {
                            method: 'DELETE',
                            headers:{
                                "Content-Type":"application/json",
                                "username":posts.username
                            }
                            
                        }).then(response => {
                            getallPost();
                        });
                    }}>Delete</button>
                        </li>
                    )
                }
                return (<li key={index}>
                    <div>By: {posts.username}</div>
                   Title: {posts.title} <br/> Description: {posts.text}
                   
                  
                </li>);
            })}
     </ul>
 </div>
 <div>
     <div>
             <label>Title: </label>
             <input value={title} onChange={e => setTitle(e.target.value)}></input> <br/>
             <label>Text: </label>
             <input value={text} onChange={e => setText(e.target.value)}></input>
     </div>
     <button onClick={createNewPosts}>Create new posts here!</button>
 </div>
</div>
)

}

export default PostWall;

/* <button onClick={() => {
                            fetch('http://localhost:8080/posts/delete/{{postName}}' + posts.title, {
                                method: 'DELETE',
                                headers:{
                                    "Content-Type":"application/json",
                                    "username":posts.username
                                }
                                
                            }).then(response => {
                                getallPost();
                            });
                        }}>Ta Bort</button>*/