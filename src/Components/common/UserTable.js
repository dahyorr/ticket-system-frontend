import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
// import DetailLink from './DetailLink'
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

const getMuiTheme = () => createMuiTheme({
    overrides:{
        'MUIDataTable': {
            paper: {
                maxHeight: '100%'
            }
        },
    }
})

const tableColumns = [
    {
        name: "name",
        label: "Name",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "email",
        label: "Email",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "is_authorized",
        label: "Approved",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (
                value
                ? <BsFillCheckCircleFill style={{color: '#66bb6a'}}/>
                :<BsFillXCircleFill style={{color: '#f44336'}}/>
            )
        }
    },
    {
        name: "is_staff",
        label: "Admin",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value) => (
                value
                ? <BsFillCheckCircleFill style={{color: '#66bb6a'}}/>
                :<BsFillXCircleFill style={{color: '#f44336'}}/>
            )
        }
    },
];

const UserTable = ({data, title}) => {

    const tableOptions = {
        filterType: 'checkbox',
        selectableRows: 'none',
        tableBodyMaxHeight: '100%',
        textLabels: {
            body: {
                noMatch: "No Users Available to display"
            }
        },
        download: false,
        print: false,
        rowsPerPageOptions: [10, 15, 20],
    };

    return (
        <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title={title}
                data={data}
                columns={tableColumns}
                options={tableOptions}
            />
        </MuiThemeProvider>
    )
}

export default UserTable
