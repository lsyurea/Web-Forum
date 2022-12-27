const TextArea = props => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <textarea
                className={props.className}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                style={props.style}
            />
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    );
}

export default TextArea;