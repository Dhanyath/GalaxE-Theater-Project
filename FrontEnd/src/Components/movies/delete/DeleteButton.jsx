import { Link } from 'react-router-dom';
// import './Login.css';
export default function DeleteButton(){
    return(
        <div>
            <Link to="/delete">
            <button className="delbtn">Delete</button>
            </Link>
        </div>
    )

}