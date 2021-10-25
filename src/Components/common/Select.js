import Select from 'react-select'

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
            {...props}
        />
    )
}

export default CustomSelect
