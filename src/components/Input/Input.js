import React from 'react'

const Input = props => {

    return (
        <React.Fragment>
            <input
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                autoComplete={props.autocomplete || 'off'}
                value={props.value}
                title={props.title}
                onChange={props.onChange}
                onClick={props.onClick}
                readOnly={props.readonly}
            />
            {props.children}
        </React.Fragment>

    )
}

export default Input