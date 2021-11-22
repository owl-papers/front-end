import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      /*       display: "flex",
       */
    },
    appBar: {
      boxShadow: 'none',
      backgroundColor: '#fff',
      alignContent: 'right',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      /*       width: `calc(100% - ${drawerWidth}px)`,
       */ marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      color: '#173457',
      marginRight: theme.spacing(2)
    },
    icons: {
      color: '#173457'
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    },
    imageIcon: {
      height: '40px',
      width: 'auto'
    },
    BarIcons: {}
  })
);
