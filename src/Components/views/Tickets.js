// import { Link } from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const tableColumns = ["Name", "Status", 'Last Activity', "Created By", "Date Created"];
const tableData = [
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
        {name: 's'},
]
const tableOptions = {
    filterType: 'checkbox',
    tableBodyMaxHeight: '100%',
    textLabels: {
        body: {
            noMatch: "No Tickets Available Yet"
        }
    },
    download: false,
    print: false,
};

const getMuiTheme = () => createMuiTheme({
    overrides:{
        'MUIDataTable': {
            paper: {
                maxHeight: '100%'
            }
        },
    }
})

function Tickets({ tickets, history}) {

    console.log(tickets)

    return (
        <div className="Tickets">
            <div className="container">
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"All Tickets"}
                    data={tableData}
                    columns={tableColumns}
                    options={tableOptions}
                />
            </MuiThemeProvider>
            </div>
        </div>
    )
}

export default Tickets
