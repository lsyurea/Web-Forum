const Select = props => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <select
                className="form-select"
                id={props.name}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                style={props.style}
            >
                <option value="">{props.placeholder}</option>
                {props.options.map(option => {
                    return (
                        <option key={option} value={option}>{option.value}</option>)})}

            </select>
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    );
}

export default Select;