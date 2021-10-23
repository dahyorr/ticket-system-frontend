import Select from 'react-select'

const CustomSelect = ({onChange, onBlur, value, name, options, error, ...props}) => {
    console.log(onChange)
        const handleChange = (value, e) => {
            onChange(name,value);
        };

        const handleBlur = () => {
            onBlur(name, true);
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
