import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import DetailLink from '../common/DetailLink'
import { generateStatusColor } from "../../utils";

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

const tableColumns = [
    {label: 'Ticket ID', name: 'id', options: {
        filter: false, 
        sort: true,
        customBodyRender: id => `#${id}` 
    } },
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
            customBodyRender: (value) => (
            <span 
                style={{color: generateStatusColor(value) }}
            >
                {value}
            </span>
            )
        }
    },
    {
        name: "priority",
        label: "Priority",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (
                <span 
                    style={{color: generateStatusColor(value) }}
                >
                    {value}
                </span>
                )
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
    {
        name: "created_date",
        label: "Date Created",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value) => new Date(value).toDateString()
        }
    },
    {label: ' ',name: 'id', options: {
        filter: false, 
        sort: false,
        customBodyRender: id => <DetailLink path={`/tickets/${id}`}/>, 
    } },
];

const TicketsTable = ({data, onRefresh, onAdd, title}) => {
    const classes = useStyles();

    const tableOptions = {
        filterType: 'checkbox',
        selectableRows: 'none',
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
                title={title}
                data={data}
                columns={tableColumns}
                options={tableOptions}
            />
        </MuiThemeProvider>
    )
}

export default TicketsTable
