// import { Link } from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

const tableColumns = ["Name", "Status", 'Last Activity', "Created By", "Date Created"];
const tableData = []
const tableOptions = {
    filterType: 'checkbox',
    tableBodyMaxHeight: '100%'
};

const getMuiTheme = () => createTheme({
    overrides:{

    }
})

function Tickets({ tickets, history}) {

    console.log(tickets)

    return (
        <div className="Tickets">
            <div className="container">
            {/* <MuiThemeProvider theme={getMuiTheme()}> */}
                <MUIDataTable
                    title={"All Tickets"}
                    data={tableData}
                    columns={tableColumns}
                    // options={tableOptions}
                />
            {/* </MuiThemeProvider> */}
            </div>
        </div>
    )
}

export default Tickets
