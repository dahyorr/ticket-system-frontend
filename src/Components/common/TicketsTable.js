import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    icon: {
        '&:hover': {
            color: '#3f51b5',
        },
    },
}) 

const getMuiTheme = () => createMuiTheme({
    overrides:{
        'MUIDataTable': {
            paper: {
                maxHeight: '100%'
            }
        },
    }
})

// const tableColumns = ["Title", "Status", 'Last Activity', "Created By", "Date Created"];
const tableColumns = [
    {
        name: "title",
        label: "Title",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "priority",
        label: "Priority",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "owner",
        label: "Created By",
        options: {
            filter: false,
            sort: true,
        }
    },
];

const TicketsTable = ({data, onRefresh, onAdd}) => {
    const classes = useStyles();

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
        rowsPerPageOptions: [10, 15, 20],
        customToolbar: () => (
        <>
            <IconButton 
                aria-label='Refresh tickets'
                onClick={onRefresh}
                className={classes.icon}
            >
                <RefreshIcon/>
            </IconButton>
    
            <IconButton
                aria-label='Add new ticket'
                onClick={onAdd}
                className={classes.icon}
            >
                <AddIcon/>
            </IconButton>
        </>
        )
    };

    return (
        <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title={"All Tickets"}
                data={data}
                columns={tableColumns}
                options={tableOptions}
            />
        </MuiThemeProvider>
    )
}

export default TicketsTable
