import { useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Context as TicketContext } from '../../context/TicketContext';

const tableColumns = ["Name", "Status", 'Last Activity', "Created By", "Date Created"];
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

function Tickets({history}) {

    const {tickets, loading, fetchTickets} = useContext(TicketContext)
    useEffect(() => {

    }, [])

    console.log(tickets, loading)

    return (
        <div className="Tickets">
            <div className="container">
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"All Tickets"}
                    data={tickets}
                    columns={tableColumns}
                    options={tableOptions}
                />
            </MuiThemeProvider>
            </div>
        </div>
    )
}

export default Tickets
