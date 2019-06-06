import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import '../style/UserCard.css';


const useStyles = makeStyles(theme => ({
    card: {
        borderRadius: "0",
        display: 'flex',
        marginBottom: '10%',
        width: '90vw',
        height: '25vh',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '50vw',

    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'grid',
        gridTemplateColumns: "1fr 1fr 1fr",
        justifyItems: "center",
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    match: {
        backgroundColor: "#2ecc71",
        color: "white",
        border: "0px",
    },
    chat: {
        backgroundColor: "white",
        color: "#2ecc71",
        border: "1px solid white",
        border: "0px",
    },
    location: {
        fontSize: 12,
        marginLeft: "10%",
    },
    prefs: {
        
    },
    name:{
        textAlign: "center",
        fontSize: 30,
    }

}));


inject("generalStore")

function UserCard(props) {
    const classes = useStyles();
    const theme = useTheme();
    let user = props.user
    const haveMatched = useState(false);


    const matchUsers = async (props) => {
        let currentUser = props.generalStore.currentUser.email 
        let matchedUser = props.user.email

        let newConversation = {
            users: [currentUser, matchedUser],
            messages: [{
                author: "",
                text: "",
                time: null
            }]
        }

        await haveMatched(true)
        await props.generalStore.matchUsers(props.user.email)
        await props.generalStore.addConversation(newConversation, matchedUser)
    }



    return (
        <Card className={classes.card}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h4" variant="h5" className={classes.name}>
                        {user.firstName.toUpperCase()}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {user.interests.map((inter, i) =>
                            <span className="inter" key={i}>{inter.toUpperCase()}</span>)}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                {haveMatched ?
                    <Button variant="outlined" size="small" color="primary" onClick={matchUsers} className={classes.match}>Match</Button>:
                    <Button variant="outlined" size="small" color="primary" className={classes.chat}><Link to="/show-match">Chat</Link></Button>
                }
                    {user.location ?
                        <Typography className={classes.location}>
                            {user.location.name}
                        </Typography> :
                        null
                    }
                    <Typography className={classes.prefs}>
                        <div>{user.vegan ? "Vegan" : null}</div>
                        <div>{user.vegetarian ? "Vegetarian" : null}</div>
                        <div>{user.kosher ? "Kosher" : null}</div>
                    </Typography>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={user.profilePic}
                title="Live from space album cover"
            />
        </Card>
    );
}

export default UserCard;