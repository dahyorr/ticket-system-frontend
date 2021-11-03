import Select from 'react-select'

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: !state.isFocused ? '1px solid #9a9a9a': '2px solid #f3be95',
        borderRadius: '10px',
        boxShadow: state.isFocused ? '0 0 0 1px #f3be95' : 'none',
        '&:hover': {
            borderColor: '#f3be95',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white': provided.color,
        backgroundColor: (state.isSelected ? '#f3be95'
            : state.isFocused ? 'hsl(26, 80%, 89%)'
            :provided.backgroundColor),
        fontSize: '0.95rem',
        padding: '4px 8px',
        '&:active': {
            backgroundColor: 'hsl(26, 80%, 89%)'
        }
    }),
    input: (provided, state) => ({
        ...provided,
        '& input': {
            height: '28px',
        }
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontSize: '0.95rem'
    }),
}

const CustomSelect = ({onChange, onBlur, value, name, options, error, ...props}) => {
    const handleChange = (option) => {
        onChange({ currentTarget: { value: option, name }});
    };

    const handleBlur = () => {
        onBlur({ target: {name }});
    };  

    return (
        <Select
            options={options}
            inputClassName={!!error ? 'input' : 'input error'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            styles={customStyles}
            {...props}
        />
    )
}

export default CustomSelect
