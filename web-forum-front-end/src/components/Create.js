function Create() {
    return (
    <div>
        <form>
            
            <div className='d-flex justify-content-center'>
                <div className="form-group col-md-6 mb-3 my-3">
                    <label for="username">Username:</label>
                    <input type="text" className="form-control" id="susername" />
                    <label for="password">Password:</label>
                    <input type="password" className="form-control" id="spassword" />
                    <label for="password">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirm-spassword" />
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" id="create">Create new User</button>
            </div>
    
        </form>
        
    </div>);
}

export default Create;