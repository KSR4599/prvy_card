import React, {useState,useEffect,useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createBrowserHistory } from "history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PinterestIcon from '@material-ui/icons/Pinterest';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import "../styles.css";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SaveIcon from '@material-ui/icons/Save';
import VCard from 'vcard-creator'
import download from 'js-file-download'
import axios from 'axios';
import { Buffer } from 'buffer'

const history = createBrowserHistory({ forceRefresh: true });

const faces = [
    "http://i.pravatar.cc/300?img=1"
  ];

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      alignItems:'left'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    gg:{
        width:'100%'
    },
    App:{
        height:'100%',
    },
    card: {
      maxWidth: 700,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
    media: {
      paddingTop: "56.25%"
    },
    content: {
      textAlign: "left",
      padding: 10
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    avatar: {
      display: "inline-block",
      border: "10px solid white",
      "&:not(:first-of-type)": {
        marginLeft: -12
      },
      width:'100px',
      height:'100px'
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }));

  function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
      setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
  }

  export function MenuAppBar() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className={classes.root}>
       
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              PRVYCARD
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                 
                  <MenuItem onClick={()=>history.push("/login")}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
                }

export default function SignUp(props) {
  console.log(props);
  const classes = useStyles();
  const [FullName,SetFullName] = useState('');
  const [Bio,SetBio] = useState('');
  const [Phone,SetPhone] = useState('');
  const[Image,SetImage] = useState('');
  const [image, setImage] = useState({ preview: "", raw: "" });
  
  const [profile,setProfile] = useState('');
  const[isSending,setIsSending] = useState(false);
  const isMounted =useRef(true);

useEffect(() =>{
  getProfile(props.location.state.uname);
  return () =>{
    isMounted.current = false 
  }
  
},[])

  const [LinkedInState,SetLinkedInUName] = useMergeState({
    LinkedInUName: '',
    LinkedInDisable: true,
  });
  const [InstagramState,SetInstagramUName] = useMergeState({
    InstagramUName: '',
    InstagramDisable: true,
  });
  const [FacebookState,SetFacebookUName] = useMergeState({
    FacebookUName: '',
    FacebookDisable: true,
  });
  const [YoutubeState,SetYoutubeUName] = useMergeState({
    YoutubeUName: '',
    YoutubeDisable: true,
  });
  const [PinterestState,SetPinterestUName] = useMergeState({
    PinterestUName: '',
    PinterestDisable: true,
  });
  const [RedditState,SetRedditUName] = useMergeState({
    RedditUName: '',
    RedditDisable: true,
  });
  const [TwitterState,SetTwitterUName] = useMergeState({
    TwitterUName: '',
    TwitterDisable: true,
  });
  const [socialmedia, setSocialMedia] = React.useState('');
  const [contact,setContact] = React.useState('');
  const [showLinkedIn,setShowLinkedIn] = React.useState(false);
  const [showInstagram,setShowInstagram] = React.useState(false);
  const [showFacebook,setShowFacebook] = React.useState(false);
  const [showYoutube,setShowYoutube] = React.useState(false);
  const [showPinterest,setShowPinterest] = React.useState(false);
  const [showReddit,setShowReddit] = React.useState(false);
  const [showTwitter,setShowTwitter] = React.useState(false);
  
  const[CellPhone,setCellPhone] = React.useState('');
  const[HomePhone,setHomePhone] = React.useState('');


  const[showCellPhone,setShowCellPhone] = React.useState('');
  const[showHomePhone,setShowHomePhone] = React.useState('');
  const[Faxx,setShowFax] = useMergeState({
      showFax: false,
  faxValue: ''});

const[Emaill,setShowEmail] = useMergeState({
showEmail: false,
emailValue: ''});

const[Country,setCountry] = React.useState('');
const[Region,setRegion] = React.useState('');
const[Address,setAddress]=React.useState('');
const[loc,setloc] = useState('');

function getProfile(username){
let url = "http://localhost:8013/api1/get_profile/?username="+username;

  axios.get(url)
  .then(response => {
    console.log("The response status in get profile is " + response.status);
    console.log(response)
    
    SetFullName(response.data.firstname);
    
    SetBio(response.data.bio);
    setAddress(response.data.address);
    
    setCountry(response.data.contactSchema.country);
    setRegion(response.data.contactSchema.state);
    setHomePhone(response.data.contactSchema.home);
    if(response.data.contactSchema.cell != ""){
      setShowCellPhone(true);
      setCellPhone(response.data.contactSchema.cell);
    }
    if(response.data.contactSchema.home != ""){
      setShowHomePhone(true);
      setHomePhone(response.data.contactSchema.home);
    }
    if(response.data.contactSchema.email != ""){
      setShowEmail({showEmail:true,emailValue:response.data.email});;
    }
    if(response.data.contactSchema.fax != ""){
      setShowFax({showFax:true,faxValue:response.data.contactSchema.fax});;
    }
    if(response.data.socialSchema.linkedin != ""){
      SetLinkedInUName({
        LinkedInUName: response.data.socialSchema.linkedin,
        LinkedInDisable: false 
      });
      setShowLinkedIn(true);
    }
    if(response.data.socialSchema.instagram != ""){
      SetInstagramUName({
        InstagramUName: response.data.socialSchema.instagram,
        InstagramDisable: false 
      });
      setShowInstagram(true);
    }
    if(response.data.socialSchema.facebook != ""){
      SetFacebookUName({
        FacebookUName: response.data.socialSchema.facebook,
        FacebookDisable: false 
      });
      setShowFacebook(true);
    }
    if(response.data.socialSchema.youtube != ""){
      SetYoutubeUName({
        YoutubeUName: response.data.socialSchema.youtube,
        YoutubeDisable: false 
      });
      setShowYoutube(true);
    };
    if(response.data.socialSchema.twitter != ""){
      SetTwitterUName({
        TwitterUName: response.data.socialSchema.twitter,
        TwitterDisable: false 
      });
      setShowTwitter(true);
    };
    if(response.data.socialSchema.pinterest != ""){
      SetPinterestUName({
        PinterestUName: response.data.socialSchema.pinterest,
        PinterestDisable: false 
      });
      setShowPinterest(true);
    };
    if(response.data.socialSchema.reddit != ""){
      SetRedditUName({
        RedditUName: response.data.socialSchema.reddit,
        RedditDisable: false 
      });
      setShowReddit(true);
    }

     })
     
    

  .catch(error => {
    console.log("Error occured"+ error);

  });
};

  async function downloadVcardFile(username,FullName,HomePhone,CellPhone,Emaill,Faxx,
    LinkedInState,TwitterState,InstagramState,FacebookState,Country,Region,Address,Bio,
    Pinterest,Reddit,Youtube)
  {
   

    let imagelocationurl =
    "http://localhost:8013/api1/get_imagelocation/?username="+username
    
     let ll = await axios.get(imagelocationurl)
    /*.then(response => {
      console.log("The response status in display profile is from image location " + response.status);
      console.log(response.data);
      setloc(response.data);
    });*/

    

    let url = "http://localhost:8013/api1/get_vcard/?fullname="+FullName+"&username="+username+"&filelocation="+ll.data+"&home="+
    HomePhone+"&cell="+CellPhone+"&email="+Emaill+"&fax="+Faxx+"&linkedin="+LinkedInState+
    "&twitter="+TwitterState+"&instagram="+InstagramState+"&facebook="+FacebookState+"&country="+Country+"&region="+Region
    +"&address="+Address+"&bio="+Bio+"&reddit="+Reddit+"&pinterest="+Pinterest+"&Youtube="+
    Youtube;

   axios.get(url)
    .then(response => {
      console.log("The response status in display profile is " + response.status);
      console.log(response.data);
     download(response.data, 'file.vcf')
        });
        

    };

    let getprofileimageurl = "http://localhost:8013/api1/get_profileimage/?username="+props.location.state.uname
    
    return (

        <div>
            <MenuAppBar/>
            <Container component="main" maxWidth="sm" >
      <CssBaseline />
      <br/>
      <br/>
      
        <Grid container={true} justify="center" style = {{width:600}}>
      <Grid item={true} >
      <div className={classes.App}>
        <Card className={classes.card}>
        <Avatar className={classes.avatar} key={faces}  src={getprofileimageurl}/>
        <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
            {FullName}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"body2"}>
            {Bio}
          </Typography>
          <br/>
          <br/>
          {Address?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Address: {Address}
          </Typography>: null}
          <br/>
          {Country?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Country: {Country}
          </Typography>: null}
          <br/>
          {Region?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Region: {Region}
          </Typography>: null}
          <br/>
          <br/>
          {showCellPhone?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Cell Phone: {CellPhone}
          </Typography>: null}
          <br/>
          {showHomePhone?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Home Phone: {HomePhone}
          </Typography>: null}
          <br/>
          {Faxx.showFax?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Fax: {Faxx.faxValue}
          </Typography>: null}
          <br/>
          {Emaill.showEmail?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Email: {Emaill.emailValue}
          </Typography>: null}
          <br/>
          <br/>
          <IconButton aria-label="linkedIn" disabled={!showLinkedIn}>
             <LinkedInIcon /> 
           </IconButton>
           <IconButton aria-label="Instagram" disabled={!showInstagram}>
             <InstagramIcon /> 
           </IconButton>
           <IconButton aria-label="Facebook" disabled={!showFacebook}>
             <FacebookIcon /> 
           </IconButton>
           <IconButton aria-label="YouTube" disabled={!showYoutube}>
             <YouTubeIcon /> 
           </IconButton>
           <IconButton aria-label="Pinterest" disabled={!showPinterest}>
             <PinterestIcon /> 
           </IconButton>
           <IconButton aria-label="Reddit" disabled={!showReddit}>
             <RedditIcon /> 
           </IconButton>
           <IconButton aria-label="Twitter" disabled={!showTwitter}>
             <TwitterIcon /> 
           </IconButton>
          <Divider className={classes.divider} light />
          <Typography variant="overline" display="block" gutterBottom align='center'>
        PRVY CARD
      </Typography>
      <Typography variant="caption" display="block" gutterBottom align='center'>
        powered by PRVY CARD
      </Typography>
        </CardContent>
        </Card>
      </div>
      
          </Grid> 
         
          <Grid >
              <br/>
          <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={()=>downloadVcardFile(props.location.state.uname,FullName,HomePhone,CellPhone,Emaill.emailValue,Faxx.faxValue,
          LinkedInState.LinkedInUName,TwitterState.TwitterUName,InstagramState.InstagramUName,FacebookState.FacebookUName,Country,Region,Address,Bio,
          RedditState.RedditUName,PinterestState.PinterestUName,YoutubeState.YoutubeUName)}
      >
        Download Details
      </Button>
      </Grid> 
  </Grid>
  </Container>
  </div>
    );
  }