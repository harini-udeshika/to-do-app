import './Form.css';

const ToDoForm=()=>{
    return(
        <div className="form-container">
            <div className="title">Add New Todo</div>
            <form action="">
            <input type="text" placeholder="What needs to be done?" />
             <textarea placeholder="Add some details..." rows="4" />
            <button type="submit">Add Todo</button>
        </form>  
        </div>
      
    )
}

export default ToDoForm;