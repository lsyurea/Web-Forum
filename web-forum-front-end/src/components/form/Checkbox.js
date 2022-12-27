const CheckBox = (props) => {
    return (
        <div className="form-check">
            <input
            id = {props.name}
            name = {props.name}
            type = "checkbox"
            checked = {props.checked}
            onChange = {props.onChange}
            className = "form-check-input"
            />
            <label htmlFor = {props.name} className = "form-check-label">

            </label>
        </div>
    )
}

export default CheckBox;